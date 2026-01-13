const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/* --------------------------------------------------
   INTERNAL REQUEST HELPER
-------------------------------------------------- */
async function request(url, options = {}, token) {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API Error");
  }

  return res.json();
}

/* --------------------------------------------------
   AUTH APIS
-------------------------------------------------- */
export const AuthAPI = {
  login(email, password) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  signup(email, password) {
    return request("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

/* --------------------------------------------------
   PROJECT APIS
-------------------------------------------------- */
export const ProjectAPI = {
  createProject(name, token) {
    return request(
      "/projects",
      {
        method: "POST",
        body: JSON.stringify({ name }),
      },
      token
    );
  },

  listProjects(token) {
    return request("/projects", { method: "GET" }, token);
  },
};

/* --------------------------------------------------
   INCIDENT APIS
-------------------------------------------------- */
export const IncidentAPI = {
  listActive(projectId, token) {
    return request(
      `/incidents?project_id=${projectId}`,
      { method: "GET" },
      token
    );
  },

  prioritizedFiles(incidentId, projectId, token) {
    return request(
      "/incidents/files/priority",
      {
        method: "POST",
        body: JSON.stringify({
          incident_id: incidentId,
          project_id: projectId,
        }),
      },
      token
    );
  },

  fixFile(incidentId, projectId, path, token) {
    return request(
      "/incidents/file/fix",
      {
        method: "POST",
        body: JSON.stringify({
          incident_id: incidentId,
          project_id: projectId,
          path,
        }),
      },
      token
    );
  },

  resolveIncident(incidentId, projectId, filePath, resolved, token) {
    return request(
      "/incidents/resolve",
      {
        method: "POST",
        body: JSON.stringify({
          incident_id: incidentId,
          project_id: projectId,
          file_path: filePath,
          resolved,
        }),
      },
      token
    );
  },
};

/* --------------------------------------------------
   METRICS APIS
-------------------------------------------------- */
export const MetricsAPI = {
  errorCounts(token) {
    return request("/metrics/errors", { method: "GET" }, token);
  },
};


/* --------------------------------------------------
   INCIDENT DIAGNOSIS API
-------------------------------------------------- */
export const DiagnoseAPI = {
  diagnoseIncident(projectId, incidentId, token) {
    return request(
      "/incidents/diagnose",
      {
        method: "POST",
        body: JSON.stringify({
          project_id: projectId,
          incident_id: incidentId,
        }),
      },
      token
    );
  },
};
