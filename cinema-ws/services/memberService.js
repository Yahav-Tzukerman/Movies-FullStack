// services/memberService.js
const memberRepository = require("../repositories/memberRepository");

const getAllMembers = async () => {
  const response = await memberRepository.getAllMembers();
  return response.data;
};

const createMember = async (memberData) => {
  const response = await memberRepository.createMember(memberData);
  return response.data;
};

const updateMember = async (id, updateData) => {
  const response = await memberRepository.updateMember(id, updateData);
  return response.data;
};

const deleteMember = async (id) => {
  const response = await memberRepository.deleteMember(id);
  return response.data;
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
