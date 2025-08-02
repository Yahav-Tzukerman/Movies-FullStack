import axios from "axios";
const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const MEMBERS = `${API}/members`;

class MembersService {
  getAllMembers() {
    return axios.get(MEMBERS);
  }

  createMember(member) {
    return axios.post(MEMBERS, member);
  }

  updateMember(id, member) {
    return axios.put(`${MEMBERS}/${id}`, member);
  }

  deleteMember(id) {
    return axios.delete(`${MEMBERS}/${id}`);
  }
}

export default new MembersService();
