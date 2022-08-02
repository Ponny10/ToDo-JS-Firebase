import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOuactmBeZ711CeXXUDucALYWLnf5lnQQ",
    authDomain: "todo-31cae.firebaseapp.com",
    projectId: "todo-31cae",
    storageBucket: "todo-31cae.appspot.com",
    messagingSenderId: "1004432032715",
    appId: "1:1004432032715:web:8d71f17a6f41e16a0eac4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Librería para consumir consultas a Firebase.
const db = getFirestore(app);


/* Métodos funcionales propios del sitio. */

// Método para leer datos de la bd.
export const getToDos = async(resolve) => await onSnapshot(collection(db, 'todos'), resolve);

// Método para agregar datos a la bd.
export const addToDo = (data) => addDoc(collection(db,'todos'), data);

// Generar un ID automático para agregar a la tarea a crear.
export const createID = async() => {
    const uid = await doc(collection(db, 'todos')).id;
    return uid;
}

// Eliminar una tarea.
export const deleteToDo = async(id) => {
    console.log('RECIVIENDO ID ' + id);
    return deleteDoc(doc(db, "todos", id)).then(() => {
        Swal.fire('Eliminado', 'Se elimino correctamenta la tarea', 'success');
    }).catch((error) => Swal.fire('Error', error, 'error'));
};

export const getToDo = async (id) => await getDoc(doc(db, 'todos', id));

export const updateToDo = async(id, data) => await updateDoc(doc(db, 'todos', id), data).then(() => {
    Swal.fire('Tarea actualizada', 'Se actualizó correctamenta la tarea', 'success');
}).catch((error) => Swal.fire('Error', error, 'error'));