import axios from "axios";

export async function wakeServers() {
  try {
    const [cinemaRes, subsRes] = await Promise.all([
      axios.get("https://cinema-ws-sibl.onrender.com"),
      axios.get("https://movies-fullstack.onrender.com"),
    ]);
    return {
      cinema: cinemaRes.data || cinemaRes.statusText,
      subscriptions: subsRes.data || subsRes.statusText,
      error: null,
    };
  } catch (err) {
    return {
      cinema: null,
      subscriptions: null,
      error:
        err?.response?.data?.message ||
        err?.message ||
        "Failed to wake up servers. Please try again in a minute.",
    };
  }
}
