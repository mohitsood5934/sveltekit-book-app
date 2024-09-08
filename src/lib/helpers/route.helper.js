import { goto } from "$app/navigation";
import { setUser } from "$lib/firebase/database.client";

export async function afterLogin(url, userId) {
    const route = url.searchParams.get('redirect') || '/';
    setUser(userId);
    await goto(route);
}