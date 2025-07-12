// validations/subscriptionValidation.js

function validateSubscription({ memberId, movies }) {
  const errors = [];
  if (!memberId || typeof memberId !== "string")
    errors.push("memberId is required and must be a string");
  if (!Array.isArray(movies) || movies.length === 0)
    errors.push("At least one movie must be provided");
  else {
    movies.forEach((movie, i) => {
      if (!movie.movieId || typeof movie.movieId !== "string")
        errors.push(`movies[${i}].movieId is required and must be a string`);
      if (!movie.date || isNaN(Date.parse(movie.date)))
        errors.push(`movies[${i}].date must be a valid date string`);
    });
  }
  return errors;
}

module.exports = { validateSubscription };
