import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { socket } from './socket';

import Home from './pages/Home';
import Display from './pages/Display';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Ref from './pages/Ref';
import Test from './pages/Test';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [ip, setIp] = useState(null);
  const [rating, setRating] = useState(null);
  const [settings, setSettings] = useState(null);
  const [competitionData, setCompetitionData] = useState(null);

  const location = useLocation();

  useEffect(() => {
    console.log('Location: ', location);
    isConnected && socket.emit('users', { user: location?.pathname });
  }, [location, isConnected]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function getIp(value) {
      setIp(value);
    }

    function getRating(value) {
      setRating(value);
    }

    function getSettings(value) {
      setSettings(value);
    }

    function getCompetitionData(value) {
      setCompetitionData(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('ip', getIp);
    socket.on('rating', getRating);
    socket.on('settings', getSettings);
    socket.on('competitionData', getCompetitionData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('ip', getIp);
      socket.off('rating', getRating);
      socket.off('settings', getSettings);
      socket.off('competitionData', getCompetitionData);
    };
  }, []);

  return (
    <div className='min-h-screen bg-gray-200'>
      <Navbar location={location} settings={settings} />
      <Routes>
        <Route path='/' element={<Home ip={ip} isConnected={isConnected} />} />
        <Route
          path='/display'
          element={
            <Display isConnected={isConnected} rating={rating} ip={ip} />
          }
        />
        <Route
          path='/settings'
          element={<Settings ip={ip} settings={settings} />}
        />
        <Route
          path='/dashboard'
          element={
            <Dashboard ip={ip} isConnected={isConnected} rating={rating} />
          }
        />
        <Route
          path='/ref'
          element={
            <Ref
              ip={ip}
              isConnected={isConnected}
              rating={rating}
              id={socket.id}
            />
          }
        />
        <Route
          path='/test'
          element={<Test competitionData={competitionData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
