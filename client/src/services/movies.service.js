import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const MOVIES = `${API}/movies`;

class MoviesService {
  getAllMovies() {
    return axios.get(MOVIES);
  }

  createMovie(movie) {
    return axios.post(MOVIES, movie);
  }

  updateMovie(id, movie) {
    return axios.put(`${MOVIES}/${id}`, movie);
  }

  deleteMovie(id) {
    return axios.delete(`${MOVIES}/${id}`);
  }
}

export default new MoviesService();
