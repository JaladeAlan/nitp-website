export const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhoneValid = (phone) =>
  /^(\+234|0)[789][01]\d{8}$/.test(phone);

export const isRequired = (value) => value.trim() !== "";
