const axios = require('axios');
const memberService = require('./memberService');
const movieService = require('./movieService');

const cleanString = (str, min = 2, max = 40) => {
  if (!str || typeof str !== "string") return "Unknown";
  const trimmed = str.trim();
  if (trimmed.length < min) return "Unknown";
  if (trimmed.length > max) return trimmed.slice(0, max);
  return trimmed;
};

const cleanEmail = (email) => {
  if (!email || typeof email !== "string" || !email.includes("@")) return "unknown@email.com";
  return email.trim().toLowerCase();
};

const cleanGenres = (genres) => {
  if (!Array.isArray(genres) || genres.length === 0) return ["Unknown"];
  return genres.map((g) => g || "Unknown");
};

const cleanDate = (date) => {
  if (!date || isNaN(Date.parse(date))) return "2000-01-01";
  return date;
};

const cleanImage = (img) => img || "https://via.placeholder.com/150x220?text=No+Image";

const initMembers = async () => {
  const existingMembers = await memberService.getAllMembers();
  if (existingMembers.length === 0) {
    console.log('⏬ Fetching members from external API...');
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    for (const user of data) {
      try {
        await memberService.createMember({
          name: cleanString(user.name),
          email: cleanEmail(user.email),
          city: cleanString(user.address?.city)
        });
      } catch (e) {
        console.error("❌ Failed to create member:", user.name, "-", e.message);
        continue;
      }
    }
    console.log('✅ Members initialized');
  } else {
    console.log('✅ Members already initialized');
  }
};

const initMovies = async () => {
  const existingMovies = await movieService.getAllMovies();
  if (existingMovies.length === 0) {
    console.log('⏬ Fetching movies from external API...');
    const { data } = await axios.get('https://api.tvmaze.com/shows');

    for (const show of data) {
      try {
        await movieService.createMovie({
          name: cleanString(show.name, 1, 100),
          genres: cleanGenres(show.genres),
          image: cleanImage(show.image?.medium),
          premiered: cleanDate(show.premiered)
        });
      } catch (e) {
        console.error("❌ Failed to create movie:", show.name, "-", e.message);
        continue;
      }
    }
    console.log('✅ Movies initialized');
  } else {
    console.log('✅ Movies already initialized');
  }
};

const initData = async () => {
  await initMembers();
  await initMovies();
};

module.exports = { initData };
