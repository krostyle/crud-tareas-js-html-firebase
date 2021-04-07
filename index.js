const db = firebase.firestore();

const taskForm = document.getElementById('task-form');

const guardarTarea = (title, description) =>
    db.collection('Tareas').doc().set({
        title,
        description
    });

const getTarea = () => db.collection('Tareas').get();
window.addEventListener('DOMContentLoaded', async(e) => {
    const tareas = await getTarea();
    console.log(tareas);
})

taskForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    await guardarTarea(title.value, description.value);
    taskForm.reset();
    title.focus();

})