import { db } from "./firebase.server";
import { firestore } from 'firebase-admin';
import { saveFileToBucket } from './firestorage.server';

export async function addBook (book, userId) {
    const { title = '', author = '', short_description = '', description = ''} = book;

    // save to the firestore database without picture information
    const bookCollection = db.collection('books');
    const bookRef = await bookCollection.add({
        title,
        author,
        short_description,
        description,
        user_id: userId,
        likes: 0,
        created_at: firestore.Timestamp.now().seconds,
    })

    // save the pictures


    // update the doc in firebase database with the picture urls


    // return book id
}