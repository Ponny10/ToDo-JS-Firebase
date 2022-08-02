
// Importaciones de métodos y funciones del archivo firebase.js
import { getToDos, addToDo, deleteToDo, getToDo, updateToDo } from './firebase.js';

// Contenedores del FrontEnd.
const formToDo = document.querySelector('#formToDo');
const tblBody = document.querySelector('#tblBody');
let statusUpdating = false;
let idGlobal = '';

// Evento que se ejecuta al inicializar la página.
window.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    // const qrySnapshot = await getToDos();
    getToDos((resolve) => {
        // Variable que almacenará el componente html a crear.
        let html = '';
        //Recorrer las tareas de la bd.
        resolve.forEach((data) => {
            const todo = data.data();
            html += `
                <tr>
                    <td>${todo.name}</td>
                    <td>
                        <div class="d-grid gap-2 d-md-block text-center">
                            <button type="button" class="btn btn-warning btn-sm btn-md btm-lg updated" data-id="${data.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger btn-sm btn-md btm-lg deleted" data-id="${data.id}">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        tblBody.innerHTML = html;
        const btnDeleted = tblBody.querySelectorAll('.deleted');
        btnDeleted.forEach((btn) => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteToDo(dataset.id);
            });
        });
        const btnUpdated = tblBody.querySelectorAll('.updated');
        btnUpdated.forEach((update) => {
            update.addEventListener('click', async(e) => {
                statusUpdating = true;
                console.log(statusUpdating);
                idGlobal = e.target.dataset.id;
                console.log(idGlobal);
                const data = await getToDo(e.target.dataset.id);
                const tarea = data.data();
                formToDo['newToDo'].value = tarea.name;
            });
        })
    });
});

// Método para guardar tareas en la db.
formToDo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = formToDo['newToDo'].value;
    const newTask = {
        name,
    };
    if (statusUpdating) {
        await updateToDo(idGlobal, newTask);
        statusUpdating = false;
    } else {
        addToDo(newTask);
    }
    formToDo.reset();
});