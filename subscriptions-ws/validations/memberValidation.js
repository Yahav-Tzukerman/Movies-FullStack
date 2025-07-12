// validations/memberValidation.js

const NAME_REGEX = /^[A-Za-z\u0590-\u05FF\s'-]{2,40}$/; // אותיות בעברית/אנגלית, רווחים, גרשיים, 2-40
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateMember({ name, email, city }) {
  const errors = [];
  if (!name || !NAME_REGEX.test(name))
    errors.push("Invalid name: 2-40 letters, spaces, ', - (Hebrew/English)");
  if (!email || !EMAIL_REGEX.test(email)) errors.push("Invalid email format");
  if (!city || !NAME_REGEX.test(city))
    errors.push("Invalid city: 2-40 letters, spaces, ', - (Hebrew/English)");
  return errors;
}

module.exports = { validateMember, NAME_REGEX, EMAIL_REGEX };
