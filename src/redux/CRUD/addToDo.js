import { Auth, db } from "../../config/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export const addToDo = async (taskValue, userId) => {
  if (taskValue.trim() !== "") {
    const userDocRef = doc(collection(db, "ToDoData"), userId);
    const userDataCollectionRef = collection(userDocRef, "ToDos");
    try {
      // eslint-disable-next-line no-unused-vars
      const newUserDataDocRef = await addDoc(userDataCollectionRef        , {
        description: taskValue,
        completed: false,  
        progress: "Not yet",
      });
      document.getElementById("taskValue").value = "";
      return false;
    } catch (err) {
      alert(console.error(err.message));
    }
  } else {
    alert("please enter task details");
  }
};

// eslint-disable-next-line no-unused-vars
export const ChangeToDoList = async (ToDos,) => {
  const userDocRef = doc(collection(db, "ToDoData"), Auth.currentUser.uid);
  const userDataCollectionRef = collection(userDocRef, "ToDos");
  try{
    await setDoc(userDataCollectionRef,{})
  }catch(err){
    console.error(err.message);
  }
};
