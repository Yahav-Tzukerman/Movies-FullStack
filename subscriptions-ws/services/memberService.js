// services/memberService.js
const { validateMember } = require("../validations/memberValidation");
const memberRepository = require("../repositories/memberRepository");
const AppError = require("../exceptions/AppError");

const getAllMembers = async () => {
  return await memberRepository.getAllMembers();
};

const createMember = async (memberData) => {
  const errors = validateMember(memberData);
  if (errors.length) throw new AppError("Validation error", 400, errors);

  const existingMember = await memberRepository.getMemberByEmail(
    memberData.email
  );
  if (existingMember)
    throw new AppError(
      `Member with email ${memberData.email} already exists`,
      400
    );

  return await memberRepository.createMember(memberData);
};

const updateMember = async (id, updateData) => {
  const errors = validateMember(updateData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
  if (updateData.email) {
    const existingMember = await memberRepository.getMemberByEmail(
      updateData.email
    );
    if (existingMember && existingMember._id.toString() !== id)
      throw new AppError(
        `Member with email ${updateData.email} already exists`,
        400
      );
  }
  return await memberRepository.updateMember(id, updateData);
};

const deleteMember = async (id) => {
  if (!id) throw new AppError("Member ID is required for deletion", 400);
  const member = await memberRepository.getMemberById(id);
  if (!member) throw new AppError(`Member with ID ${id} not found`, 404);
  return await memberRepository.deleteMember(id);
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
