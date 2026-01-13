"use client";

import { useEffect, useState } from "react";
import Sidebar from "./sidebar/SideBar";
import { useRadar } from "../context/RadarContext";
import { ProjectAPI } from "../lib/api";

export default function SidebarContainer({ closeSidebar }) {
  const { state, dispatch } = useRadar();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);

  /* ---------- load projects ---------- */
  useEffect(() => {
    if (!state.token) return;

    setLoading(true);

    ProjectAPI.listProjects(state.token)
      .then(setProjects)
      .finally(() => setLoading(false));
  }, [state.token]);

  /* ---------- websocket ---------- */
  useEffect(() => {
    if (!state.token) return;

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_URL.replace("http", "ws")}/ws/metrics`
    );

    ws.onopen = () => setWsConnected(true);
    ws.onclose = () => setWsConnected(false);
    ws.onerror = () => setWsConnected(false);

    return () => ws.close();
  }, [state.token]);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    closeSidebar?.(); // 👈 close on mobile
  }

  return (
    <Sidebar
      projects={projects}
      loading={loading}
      userName="Ayush"
      wsConnected={wsConnected}
      onLogout={handleLogout}
      onNavigate={closeSidebar} // 👈 NEW
    />
  );
}
