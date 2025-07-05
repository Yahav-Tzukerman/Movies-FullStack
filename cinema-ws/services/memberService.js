// services/memberService.js
const memberRepository = require('../repositories/memberRepository');

const getAllMembers = async () => {
  return await memberRepository.getAllMembers();
};

const createMember = async (memberData) => {
  return await memberRepository.createMember(memberData);
};

const updateMember = async (id, updateData) => {
  return await memberRepository.updateMember(id, updateData);
};

const deleteMember = async (id) => {
  return await memberRepository.deleteMember(id);
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember
};
