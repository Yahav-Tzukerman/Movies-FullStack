import axios from "axios";
const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const MEMBERS = `${API}/members`;

class MembersService {
  getAllMembers(token) {
    return axios.get(MEMBERS, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createMember(member, token) {
    return axios.post(MEMBERS, member, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateMember(id, member, token) {
    return axios.put(`${MEMBERS}/${id}`, member, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteMember(id, token) {
    return axios.delete(`${MEMBERS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new MembersService();
