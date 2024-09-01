import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export async function loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
}