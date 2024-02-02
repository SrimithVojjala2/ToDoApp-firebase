import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Auth, db } from "../../config/firebase.js";

export const EditValue = async (id, updateEditvalue) => {
  const ToDoListDataRef = collection(db, "ToDoData");
  const ToDOListUserDataRef = collection(
    doc(ToDoListDataRef, Auth.currentUser.uid),
    "ToDos"
  );
  const updateToDo = doc(ToDOListUserDataRef, id);
  try{
  await updateDoc(updateToDo, { description: updateEditvalue });
  }catch(err){
    console.error(err.message);
  }
};

export const updateProgress = async (id, updateValue) => {
  const ToDoListDataRef = collection(db, "ToDoData");
  const ToDOListUserDataRef = collection(
    doc(ToDoListDataRef, Auth.currentUser.uid),
    "ToDos"
  );
  const updateToDo = doc(ToDOListUserDataRef, id);
  try{
  await updateDoc(updateToDo, { progress: updateValue });
  }catch(err){
    console.error(err.message);
  }
};



export const updateCheckBox = async (id, value) => {
  const ToDoListDataRef = collection(db, "ToDoData");
  const ToDOListUserDataRef = collection(
    doc(ToDoListDataRef, Auth.currentUser.uid),
    "ToDos"
  );
  const updateToDo = doc(ToDOListUserDataRef, id);
  try {
    await updateDoc(updateToDo, { completed: value });
  } catch (err) {
    console.error(err.message);
  }
};

export const UpdateAllcheckbox = async (value) => {
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
      await updateDoc(updateToDo, { completed: value });
    });
  } catch (err) {
    console.error(err.message);
  }
};
