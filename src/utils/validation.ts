// src/utils/validation.ts

// Validate that name is at least 3 characters
export const validateName = (name: string): boolean => {
    return name.length >= 3;
  };
  
  // Validate that email is in a valid email format
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Validate that age is a valid number
  export const validateAge = (age: string): boolean => {
    return !age || !isNaN(Number(age)); // Optional field, but if provided, must be a number
  };
  