import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import { Auth, db } from "../../config/firebase";

export const DeleteToDo = async (id) => {
  const ToDoListDataRef = collection(db, "ToDoData");
  const ToDOListUserDataRef = collection(
    doc(ToDoListDataRef, Auth.currentUser.uid),
    "ToDos"
  );
  const ToDoDelete = doc(ToDOListUserDataRef, id);

  try {
    await deleteDoc(ToDoDelete);
  } catch (err) {
    alert(err.message);
  }
};

export const DeleteAll = async () => {
  const ToDoListDataRef = collection(db, "ToDoData");
  const ToDOListUserDataRef = collection(
    doc(ToDoListDataRef, Auth.currentUser.uid),
    "ToDos"
  );
  const newData = [];
  try {
    await getDocs(ToDOListUserDataRef).then((response) => {
      response.docs.map((doc) => {
        newData.push({ ...doc.data(), id: doc.id });
      });
    });
    newData.map(async (data) => {
      const updateToDo = doc(ToDOListUserDataRef, data.id);
      await deleteDoc(updateToDo);
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const DeleteSelected = async () => {
  const ToDoListDataRef = collection(db, "ToDoData");
  const ToDOListUserDataRef = collection(
    doc(ToDoListDataRef, Auth.currentUser.uid),
    "ToDos"
  );
  const newData = [];
  try {
    await getDocs(ToDOListUserDataRef).then((response) => {
      response.docs.map((doc) => {
        if (doc.data().completed === true) {
          newData.push({ ...doc.data(), id: doc.id });
        }
      });
    });
    newData.map(async (data) => {
      const updateToDo = doc(ToDOListUserDataRef, data.id);
      await deleteDoc(updateToDo);
    });
  } catch (err) {
    console.error(err.message);
  }
};
