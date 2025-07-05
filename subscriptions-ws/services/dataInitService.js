// services/dataInitService.js
const axios = require('axios');
const memberService = require('./memberService');
const movieService = require('./movieService');

const initMembers = async () => {
  const existingMembers = await memberService.getAllMembers();
  if (existingMembers.length === 0) {
    console.log('⏬ Fetching members from external API...');
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    for (const user of data) {
      await memberService.createMember({
        name: user.name,
        email: user.email,
        city: user.address.city
      });
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
      await movieService.createMovie({
        name: show.name,
        genres: show.genres,
        image: show.image?.medium,
        premiered: show.premiered
      });
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
