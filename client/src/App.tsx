import { useState, useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Display from "../pages/Display";
import Countdown from "../pages/Countdown";
import Attempt from "../pages/Attempt";
import Settings from "../pages/Settings";
import Ref from "../pages/Ref";
import Login from "../pages/Login";

import type {
  RatingObject,
  SettingsObject,
  BreakTimerObject,
} from "../types/types";

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
  const [breakTimer, setBreakTimer] = useState<BreakTimerObject>(null);
  const [competitionData, setCompetitionData] = useState<CompData[]>([]);

  const location = useLocation();

  useEffect(() => {
    console.log("Socket: ", socket);
    console.log("Connected: ", isConnected);
  }, [socket.connected]);

  useEffect(() => {
    console.log("Läuft");
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

    function getBreakData(value: BreakTimerObject): void {
      setBreakTimer(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("ip", getIp);
    socket.on("rating", getRating);
    socket.on("settings", getSettings);
    socket.on("intervall", getCompetitionData);
    socket.on("breaktimer", getBreakData);
    console.log("UE Läuft");

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ip", getIp);
      socket.off("rating", getRating);
      socket.off("settings", getSettings);
      socket.off("intervall", getCompetitionData);
      socket.off("breaktimer", getBreakData);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar location={location} settings={settings} />
      <Routes>
        <Route index element={<Home ip={ip} isConnected={isConnected} />} />
        <Route
          path="/display"
          element={
            <Display
              isConnected={isConnected}
              rating={rating}
              ip={ip}
              settings={settings}
              competitionData={competitionData}
              breakTimer={breakTimer}
            />
          }
        />
        <Route
          path="/countdown"
          element={
            <Countdown
              settings={settings}
              isConnected={isConnected}
              rating={rating}
              breakTimer={breakTimer}
            />
          }
        />
        <Route
          path="/versuch"
          element={
            <Attempt
              settings={settings}
              rating={rating}
              competitionData={competitionData}
              breakTimer={breakTimer}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings ip={ip} settings={settings} breakTimer={breakTimer} />
          }
        />

        <Route
          path="/ref"
          element={
            <Ref
              rating={rating}
              isConnected={isConnected}
              settings={settings}
            />
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
