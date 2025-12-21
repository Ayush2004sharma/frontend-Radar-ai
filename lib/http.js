import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
})

/**
 * Global response interceptor
 * - Does NOT retry
 * - Does NOT modify backend responses
 * - Only normalizes network errors
 */
api.interceptors.response.use(
  response => response,
  error => {
    // Backend unreachable / CORS / network error
    if (!error.response) {
      return Promise.resolve({
        data: {
          status: "failed",
          reason: "Backend is unreachable",
        },
      })
    }

    // Backend responded with error payload
    return Promise.resolve({
      data: error.response.data,
    })
  }
)

export default api
