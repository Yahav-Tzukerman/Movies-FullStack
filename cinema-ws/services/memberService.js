// services/memberService.js
const { validateMember } = require("../validations/memberValidation");
const memberRepository = require("../repositories/memberRepository");
const AppError = require("../exceptions/AppError");

const getAllMembers = async () => {
  const response = await memberRepository.getAllMembers();
  return response.data;
};

const createMember = async (memberData) => {
  const errors = validateMember(memberData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
  const response = await memberRepository.createMember(memberData);
  return response.data;
};

const updateMember = async (id, updateData) => {
  const errors = validateMember(updateData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
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
