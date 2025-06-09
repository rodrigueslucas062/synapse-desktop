import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth';
import { auth } from '../../../utils/firebase';

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doPasswordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Nenhum usuário autenticado encontrado.');
  }

  return updatePassword(user, password);
};

export const doSendEmailVerification = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Nenhum usuário autenticado encontrado.');
  }

  return sendEmailVerification(user, {
    url: `${window.location.origin}/email-verification`,
  });
};
