import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { readable } from "svelte/store";

export default readable({ isActive: false, isLoggedIn: false , userId: ''}, (set) => {
    
})