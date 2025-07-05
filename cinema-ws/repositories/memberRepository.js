// repositories/memberRepository.js
const Member = require('../models/memberModel');

const getAllMembers = async () => {
  return await Member.find();
};

const createMember = async (memberData) => {
  const member = new Member(memberData);
  return await member.save();
};

const updateMember = async (id, updateData) => {
  return await Member.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMember = async (id) => {
  return await Member.findByIdAndDelete(id);
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember
};
