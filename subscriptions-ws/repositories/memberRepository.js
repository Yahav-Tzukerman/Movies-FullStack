// repositories/memberRepository.js
const Member = require("../models/memberModel");

const getAllMembers = async () => {
  const members = await Member.aggregate([
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "memberId",
        as: "subscriptions",
      },
    },
    { $unwind: { path: "$subscriptions", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$subscriptions.movies", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "movies",
        localField: "subscriptions.movies.movieId",
        foreignField: "_id",
        as: "movieObj",
      },
    },
    { $unwind: { path: "$movieObj", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        email: { $first: "$email" },
        city: { $first: "$city" },
        movies: {
          $push: {
            $cond: [
              { $gt: ["$movieObj._id", null] },
              {
                movieId: "$movieObj._id",
                movieName: "$movieObj.name",
                date: "$subscriptions.movies.date",
              },
              "$$REMOVE"
            ]
          }
        },
      },
    },
    { $sort: { name: 1 } },
  ]);
  return members;
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
