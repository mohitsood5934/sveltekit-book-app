import { auth } from "$lib/firebase/firebase.server";
import { redirect } from "@sveltejs/kit";


import { redirect } from '@sveltejs/kit'; // Make sure this import exists if `redirect` is from SvelteKit

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const protectedRoutes = ["/add", "/edit", "/profile"];
  const guestRoutes = ["/login", "/signup", "/forgot-password"];

  const token = event.cookies.get('jwt') || event.request.headers.get('authorization')?.split('Bearer ')[1] || null;

  try {
    event.locals.user = await getFirebaseUser(token);
  } catch (error) {
    event.locals.user = null;
  }

  const user = event.locals.user;
  const url = event.url;

  if (url.pathname !== "/") {
    if (!user && protectedRoutes.some((u) => url.pathname.startsWith(u))) {
      throw redirect(302, `/login?redirect=${url.pathname}`);
    }
    if (user && guestRoutes.some((u) => url.pathname.startsWith(u))) {
      throw redirect(302, "/");
    }
  }

  const response = await resolve(event);

  return response;
}

async function getFirebaseUser(token) {
  if (!token) {
    return null;
  }
  try {
    const decodedToken = await auth.verifyIdToken(token, true);
    const user = await auth.getUser(decodedToken.uid);
    return {
      id: user.uid,
      email: user.email,
    };
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return null;
  }
}


