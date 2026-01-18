import bcrypt from 'bcrypt';

const hashPassword = async () => {
  const password = 'mehdi2005';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Mot de passe hashé:', hashedPassword);
};
hashPassword();