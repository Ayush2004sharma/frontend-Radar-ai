"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

const RadarContext = createContext(null);

const initialState = {
  token: null,

  // 🔥 full project object
  project: null, // { id, name, project_secret }

  // 🔥 full incident object
  incident: null, // { id, priority_score, reason, ... }

  filePath: null,
};

function radarReducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      localStorage.setItem("radar_token", action.payload);
      return { ...state, token: action.payload };

    case "SET_PROJECT": {
      const prevId = state.project?.id;
      const nextId = action.payload?.id;
      const reset = prevId && prevId !== nextId;

      localStorage.setItem(
        "radar_project",
        JSON.stringify(action.payload)
      );

      if (reset) {
        localStorage.removeItem("radar_incident");
        localStorage.removeItem("radar_file");
      }

      return {
        ...state,
        project: action.payload,
        incident: reset ? null : state.incident,
        filePath: null,
      };
    }

    case "SET_INCIDENT":
      localStorage.setItem(
        "radar_incident",
        JSON.stringify(action.payload)
      );
      return { ...state, incident: action.payload, filePath: null };

    case "SET_FILE_PATH":
      localStorage.setItem("radar_file", action.payload);
      return { ...state, filePath: action.payload };

    case "LOGOUT":
      localStorage.clear();
      return initialState;

    default:
      return state;
  }
}


export default function RadarProvider({ children }) {
  const [state, dispatch] = useReducer(radarReducer, initialState);

  // 🔄 hydrate token + project + incident ONCE
  useEffect(() => {
    const token = localStorage.getItem("radar_token");
    const project = localStorage.getItem("radar_project");
    const incident = localStorage.getItem("radar_incident");

    if (token) {
      dispatch({ type: "SET_TOKEN", payload: token });
    }

    if (project) {
      dispatch({
        type: "SET_PROJECT",
        payload: JSON.parse(project),
      });
    }

    if (incident) {
      dispatch({
        type: "SET_INCIDENT",
        payload: JSON.parse(incident),
      });
    }
  }, []);

  return (
    <RadarContext.Provider value={{ state, dispatch }}>
      {children}
    </RadarContext.Provider>
  );
}

export function useRadar() {
  return useContext(RadarContext);
}
