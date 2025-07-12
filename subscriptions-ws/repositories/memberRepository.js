// repositories/memberRepository.js
const Member = require("../models/memberModel");

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

const getMemberById = async (id) => {
  return await Member.findById(id);
};

const getMemberByEmail = async (email) => {
  return await Member.findOne({ email });
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
  getMemberById,
  getMemberByEmail,
};
