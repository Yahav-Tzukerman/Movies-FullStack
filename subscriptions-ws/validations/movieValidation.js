// validations/movieValidation.js

const NAME_REGEX = /^[A-Za-z0-9\u0590-\u05FF\s:,'"!?-]{1,100}$/; // שם סרט: תווים מותרים, 1-100
const URL_REGEX = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;

function validateMovie({ name, genres, image, premiered }) {
  const errors = [];
  if (!name || !NAME_REGEX.test(name))
    errors.push(
      "Invalid movie name: 1-100 chars, Hebrew/English/numbers/punct."
    );
  if (
    !Array.isArray(genres) ||
    genres.length === 0 ||
    genres.some((g) => typeof g !== "string")
  )
    errors.push("Genres must be a non-empty array of strings");
  if (image && typeof image !== "string")
    errors.push("Image URL must be a string");
  if (
    premiered &&
    (typeof premiered !== "string" || isNaN(Date.parse(premiered)))
  )
    errors.push("Premiered date must be a valid ISO date string");
  return errors;
}

module.exports = { validateMovie, NAME_REGEX, URL_REGEX };
