import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import db from '../../../firebase-config';

const getUsers = async () => {
  const usersCollectionReference = collection(db, 'users');
  const data = await getDocs(usersCollectionReference);

  return data.docs.map((document) => ({ ...document.data(), id: document.id }));
};

const getPosts = async () => {
  const userPostsCollectionReference = collection(db, 'posts');
  const data = await getDocs(userPostsCollectionReference);

  return data.docs.map((document) => ({ ...document.data(), id: document.id }));
};

const setBlockUser = async (isBlocked, id) => {
  const userDoc = doc(db, 'users', id);
  if (!isBlocked) {
    const blockingUser = { blocked: true };
    await updateDoc(userDoc, blockingUser);
  } else if (isBlocked) {
    const blockingUser = { blocked: false };
    await updateDoc(userDoc, blockingUser);
  }
};

export { getUsers, getPosts, setBlockUser };
