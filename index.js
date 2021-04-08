const db = firebase.firestore();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tareas-container');

let editStatus = false;
let id = '';

const guardarTarea = (title, description) =>
    db.collection('Tareas').doc().set({
        title,
        description
    });

const updateTarea = (id, tareaActualizada) => db.collection('Tareas').doc(id).update(tareaActualizada);

const deleteTarea = id => db.collection('Tareas').doc(id).delete();

const getTareas = () => db.collection('Tareas').get();
const onGetTarea = (callback) => db.collection('Tareas').onSnapshot(callback);

const getTarea = (id) => db.collection('Tareas').doc(id).get();

window.addEventListener('DOMContentLoaded', async(e) => {
    const tareas = await getTarea();
    onGetTarea((tareas) => {
        taskContainer.innerHTML = '';
        tareas.forEach(doc => {
            console.log(doc.data());
            const tarea = doc.data();
            tarea.id = doc.id;
            taskContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
                <h5>${tarea.title}</h5>
                <p>${tarea.description}</p>
                <div>
                    <button class="btn btn-primary mt-2 btn-edit" data-id="${tarea.id}">Editar</button>
                    <button class="btn btn-danger mt-2 btn-delete" data-id="${tarea.id}">Eliminar</button>
                </div>
            </div>`;
            const btnsDelete = document.querySelectorAll('.btn-delete')
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async(e) => {
                    await deleteTarea(e.target.dataset.id);
                })
            })

            const btnsEdit = document.querySelectorAll('.btn-edit')
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async(e) => {
                    const doc = await getTarea(e.target.dataset.id)
                    const tarea = doc.data();
                    editStatus = true;
                    id = doc.id;
                    taskForm['task-title'].value = tarea.title;
                    taskForm['task-description'].value = tarea.description;
                    taskForm['btn-task-form'].innerText = 'Actualizar'
                })
            })

        })
    })

})

taskForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    if (!editStatus) {
        await guardarTarea(title.value, description.value);
    } else {
        await updateTarea(id, {
            title: title.value,
            description: description.value
        })
        editStatus = false;
        taskForm['btn-task-form'].innerText = 'Guardar'
    }

    getTareas();
    taskForm.reset();
    title.focus();

})