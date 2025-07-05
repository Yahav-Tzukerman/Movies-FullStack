// controllers/memberController.js
const memberService = require("../services/memberService");

const getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMember = async (req, res) => {
  try {
    const member = await memberService.createMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const updatedMember = await memberService.updateMember(
      req.params.id,
      req.body
    );
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    await memberService.deleteMember(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllMembers, createMember, updateMember, deleteMember };
