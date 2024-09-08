import { auth } from "$lib/firebase/firebase.server";
import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    const protectedRoutes = ['/add', '/edit','/profile'];
    const guessRoutes = 
    const response = await resolve(event);
    return response;
}