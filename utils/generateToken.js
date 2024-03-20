import JWT from "jsonwebtoken";

const generateToken = async (id) => {
  return await JWT.sign({ id }, process.env.JWTSECRET, { expiresIn: "240hrs" });
};

export default generateToken;
