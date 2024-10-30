// username validation
// implement display name?
// 3-16 characters,
// username: letters, numbers, underscores no spaces [a-z0-9_]
// displayname: [a-zA-Z0-9 _-]
// implement must start with lowercase char
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
  return "Please enter a valid email address in the format: example@domain.com.";
};

// password validation implement
export const validatePassword = (password: string): boolean => {
  // Typical password validation criteria
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const getPasswordValidationErrMsg = (): string => {
  return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, one special character and no spaces.";
};
