const TITLE_REGEX = /^[A-Za-z0-9\s]{2,100}$/;
const IMAGE_URL_REGEX = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;
const PREMIERED_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd format

export const GENERES = [
  "Drama",
  "Comedy",
  "Action",
  "Science-Fiction",
  "Romance",
  "Crime",
  "Thriller",
  "Adventure",
  "Horror",
  "Fantasy",
  "Family",
  "Animation",
  "Mystery",
  "History",
  "Music",
  "Documentary",
  "War",
  "Western",
  "Supernatural",
  "Other",
];

export function validateName(title) {
  if (!title || !TITLE_REGEX.test(title)) {
    return ["Invalid title: 2-100 chars, letters and numbers only"];
  }
  return [];
}

export function validateImageUrl(imageUrl) {
  if (!imageUrl || !IMAGE_URL_REGEX.test(imageUrl)) {
    return [
      "Invalid image URL: must be a valid image link (png, jpg, jpeg, gif, webp)",
    ];
  }
  return [];
}

export function validatePremieredDate(premiered) {
  if (!premiered || !PREMIERED_DATE_REGEX.test(premiered)) {
    return ["Invalid premiered date: must be in DD/MM/YYYY format"];
  }
  return [];
}

export function validateGenres(genres) {
  if (!Array.isArray(genres) || genres.length === 0) {
    return ["At least one genre is required"];
  }
  const invalid = genres.filter((g) => !GENERES.includes(g));
  if (invalid.length > 0) {
    return [`Invalid genres: ${invalid.join(", ")}`];
  }
  return [];
}

export function validateMovieFull(input) {
  let errors = [];
  errors.push(...validateName(input.name));
  errors.push(...validateImageUrl(input.image));
  errors.push(...validatePremieredDate(input.premiered));
  errors.push(...validateGenres(input.genres));

  if (errors.length > 0) {
    return errors;
  }
  return [];
}
