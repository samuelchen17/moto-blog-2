// username validation
// implement display name?
// 3-16 characters,
// username: letters, numbers, underscores no spaces [a-z0-9_]
// displayname: [a-zA-Z0-9 _-]
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^(?=.{3,16}$)[a-z0-9_]+$/;
  return usernameRegex.test(username);
};
export const getUsernameValidationErrMsg = (): string => {
  return "Username must be 3-16 characters long and can only contain lowercase letters, numbers, and underscores.";
};

// email validation

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const getEmailValidationErrMsg = (): string => {
  return "Invalid email format";
};

// password validation implement
