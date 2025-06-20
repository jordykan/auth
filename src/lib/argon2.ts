import { hash, verify, type Options } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string) => {
  const result = await hash(password, opts);
  return result;
};

export const verifyPassword = async (data: {
  password: string;
  hash: string;
}) => {
  const { password, hash } = data;
  const result = await verify(hash, password, opts);
  return result;
};
