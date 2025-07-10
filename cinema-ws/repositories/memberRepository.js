// repositories/memberRepository.js
const axios = require("axios");
const config = require("../config/config");

const baseUrl = config.subsWsUrl + "/members";

const getAllMembers = async () => {
  return await axios.get(baseUrl, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const createMember = async (memberData) => {
  return await axios.post(baseUrl, memberData, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const updateMember = async (id, updateData) => {
  return await axios.put(`${baseUrl}/${id}`, updateData, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const deleteMember = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
