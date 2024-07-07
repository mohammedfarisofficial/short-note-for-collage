import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hash = async (value) => {
  const salt = await bcrypt.genSalt();
  const hashedValue = await bcrypt.hash(value, salt);
  return hashedValue;
};

export const compare = async (value1, value2) => {
  const isMatch = await bcrypt.compare(value1, value2);
  return isMatch;
};

export const sign = async (data) => {
  const token = await jwt.sign({ data }, process.env.JWT_SECRET);
  return token;
};
