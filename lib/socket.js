export const connectMetrics = (onMessage) => {
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/metrics`
  const ws = new WebSocket(wsUrl)

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)
    } catch {
      // ignore malformed frames
    }
  }

  ws.onerror = () => {
    // Do NOT auto-reconnect
    // Frontend remains passive by design
    console.warn("Metrics WebSocket error")
  }

  return ws
}
