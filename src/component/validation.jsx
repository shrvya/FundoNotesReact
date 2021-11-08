export const validfirstname = new RegExp("^[A-Z][a-zA-Z]{2,}");
export const validlastname = new RegExp("^[A-Z][a-zA-Z]{2,}");
export const validEmail = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
);
export const validPassword = new RegExp("^[a-zA-Z0-9@#$%^&*()!~]{8,}$");
