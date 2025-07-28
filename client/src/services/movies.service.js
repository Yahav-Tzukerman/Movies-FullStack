import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const MOVIES = `${API}/movies`;

class MoviesService {
  getAllMovies(token) {
    return axios.get(MOVIES, { headers: { Authorization: `Bearer ${token}` } });
  }

  createMovie(movie, token) {
    return axios.post(MOVIES, movie, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateMovie(id, movie, token) {
    return axios.put(`${MOVIES}/${id}`, movie, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteMovie(id, token) {
    return axios.delete(`${MOVIES}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new MoviesService();
