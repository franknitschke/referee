import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { socket } from './socket';

import Home from './pages/Home';
import Display from './pages/Display';
import Countdown from './pages/Countdown';
import Attempt from './pages/Attempt';
import Settings from './pages/Settings';
import Ref from './pages/Ref';
import Login from './pages/Login';

type CompData = {
  weight: string;
  discipline: string;
  attempt: string;
  competitionAthlete: {
    firstName: string;
    lastName: string;
    team: string;
    bodyWeightCategory: {
      name: string;
    };
    club: {
      name: string;
    };
    ageCategory: {
      name: string;
    };
  };
};

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [ip, setIp] = useState<string | null>(null);
  const [rating, setRating] = useState<RatingObject>(null);
  const [settings, setSettings] = useState<SettingsObject>(null);
  const [competitionData, setCompetitionData] = useState<CompData[]>([]);

  const location = useLocation();

  useEffect(() => {
    isConnected && socket.emit('users', { user: location?.pathname });
  }, [location, isConnected]);

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true);
    }

    function onDisconnect(): void {
      setIsConnected(false);
    }

    function getIp(value: string): void {
      setIp(value);
    }

    function getRating(value: RatingObject): void {
      setRating(value);
    }

    function getSettings(value: SettingsObject): void {
      setSettings(value);
    }

    function getCompetitionData(value: CompData[]): void {
      setCompetitionData(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('ip', getIp);
    socket.on('rating', getRating);
    socket.on('settings', getSettings);
    socket.on('intervall', getCompetitionData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('ip', getIp);
      socket.off('rating', getRating);
      socket.off('settings', getSettings);
      socket.on('intervall', getCompetitionData);
    };
  }, []);

  return (
    <div className='min-h-screen bg-gray-200'>
      <Navbar location={location} settings={settings} />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              ip={ip}
              isConnected={isConnected}
              compData={competitionData}
            />
          }
        />
        <Route
          path='/display'
          element={
            <Display
              isConnected={isConnected}
              rating={rating}
              ip={ip}
              settings={settings}
              competitionData={competitionData}
            />
          }
        />
        <Route
          path='/countdown'
          element={<Countdown isConnected={isConnected} rating={rating} />}
        />
        <Route
          path='/versuch'
          element={
            <Attempt rating={rating} competitionData={competitionData} />
          }
        />
        <Route
          path='/settings'
          element={<Settings ip={ip} settings={settings} />}
        />

        <Route
          path='/ref'
          element={
            <Ref
              rating={rating}
              isConnected={isConnected}
              settings={settings}
            />
          }
        />

        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
