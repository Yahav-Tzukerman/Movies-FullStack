import axios from "axios";
const MEMBERS = `http://localhost:8000/api/members`;

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
