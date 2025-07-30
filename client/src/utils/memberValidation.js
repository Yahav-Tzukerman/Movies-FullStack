const NAME_REGEX = /^[A-Za-z\u0590-\u05FF\s]{2,30}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/; // פורמט תקין של אימייל
const CITY_REGEX = /^[A-Za-z\u0590-\u05FF\s]{2,50}$/; // אותיות בלבד (עברית/אנגלית), 2-50 תווים

export function validateName(name) {
  if (!name || !NAME_REGEX.test(name)) {
    return ["Invalid name: 2-30 chars, letters only (Hebrew/English)"];
  }
  return [];
}

export function validateEmail(email) {
  if (!email || !EMAIL_REGEX.test(email)) {
    return ["Invalid email format"];
  }
  return [];
}

export function validateCity(permissions) {
  if (!permissions || !CITY_REGEX.test(permissions)) {
    return ["Invalid city: 2-50 chars, letters only (Hebrew/English)"];
  }
  return [];
}

export function validateMember(input) {
  let errors = [];
  errors.push(...validateName(input.name));
  errors.push(...validateEmail(input.email));
  errors.push(...validateCity(input.city));

  if (errors.length > 0) {
    return errors;
  }
  return [];
}
