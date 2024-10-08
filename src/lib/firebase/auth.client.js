import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export async function loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
}

export async function logout() {
  await signOut(getAuth());
  await fetch('/logout');
}

export async function registerWithEmailAndPassword(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  return userCredential.user;
}

export async function loginWithEmailAndPassword(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  return userCredential.user;
}

export async function mailResetPasswordEmail(email) {
  await sendPasswordResetEmail(getAuth(), email);
}

export async function sendJWTToken(jwttoken, email) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return;
  }
  const token = await user.getIdToken(true);
  await fetch("/token", {
    method: "POST",
    body: JSON.stringify({ token, email: user.email }),
  });
}
