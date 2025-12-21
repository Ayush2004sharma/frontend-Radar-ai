import api from "./http"

/**
 * POST /diagnose
 */
export const diagnose = ({ project_id, project_secret, service }) =>
  api
    .post("/diagnose", { project_id, project_secret, service })
    .then(r => r.data)

/**
 * POST /diagnose/files
 */
export const diagnoseFiles = ({ project_id, project_secret, service }) =>
  api
    .post("/diagnose/files", { project_id, project_secret, service })
    .then(r => r.data)

/**
 * POST /project/file
 */
export const readFile = path =>
  api.post("/project/file", { path }).then(r => r.data)

/**
 * POST /diagnose/file/fix
 */
export const fixFile = ({ project_id, project_secret, service, path }) =>
  api
    .post("/diagnose/file/fix", { project_id, project_secret, service, path })
    .then(r => r.data)

/**
 * GET /metrics/errors
 */
export const getErrorMetrics = () =>
  api.get("/metrics/errors").then(r => r.data)
