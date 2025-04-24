import * as userRepo from "../repositories/user.repo.js";

export const registerUser = async ({ full_name, email, password, phoneNumber, address, birthDate }) => {
  const existing = await userRepo.findUserByEmail(email);
  if (existing) throw new Error("Email already exists");
  return await userRepo.createUser({ 
    fullName: full_name, 
    email, 
    phoneNumber, 
    address, 
    birthDate 
  });
};
