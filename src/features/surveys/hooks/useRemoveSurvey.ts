import { deleteDoc, doc, getDocs, query, collection } from 'firebase/firestore';
import { db } from 'firebaseConfiguration';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useRemoveSurvey = () => {
  const [isRemoving, setIsRemoving] = useState(false);

  const deleteSurvey =
    (id: string, closeDeleteModal: () => void, cb?: () => void) => async () => {
      setIsRemoving(true);
      try {
        await deleteDoc(doc(db, 'surveys', id));

        const answersCollection = await getDocs(
          query(collection(db, 'surveys', id, 'answers'))
        );

        answersCollection.forEach(async (answer) => {
          await deleteDoc(answer.ref);
        });

        toast.success('Survey deleted');
      } catch (error) {
        toast.error('Error deleting survey');
      } finally {
        setIsRemoving(false);
        closeDeleteModal();
        if (cb) cb();
      }
    };

  return {
    deleteSurvey,
    isRemoving,
  };
};
