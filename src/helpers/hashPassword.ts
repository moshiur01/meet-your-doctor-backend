import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));

  return hash;
};

export default hashPassword;
