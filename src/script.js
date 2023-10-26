//#region 1 Data Models
//Modelo Task
class Task {
  constructor(id, title, description, completed, priority, tag, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.tag = tag;
    this.dueDate = dueDate;
  }
}

function mapAPIToTasks(data) {
  return data.map(item => {
    return new Task(
      item.id,
      item.title,
      item.description,
      item.completed,
      item.priority,
      item.tag,
      new Date(item.dueDate),
    );
  });
}

//#endregion

//#region 2 Tasks (view)  

function displayTasksView(tasks) {

  clearTable();

  showLoadingMessage();

  if (tasks.length === 0) {

    showNotFoundMessage();

  } else {

    hideMessage();

    displayTasksTable(tasks);
  }

}

function displayClearTasksView() {
  clearTable();

  showInitialMessage();
}

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displayTasksTable(tasks) {

  const tablaBody = document.getElementById('data-table-body');

  tasks.forEach(task => {

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.completed}</td>
      <td>${task.priority}</td>
      <td>${task.tag}</td>
      <td>${formatDate(task.dueDate)}</td>
      <td>
        <button class="btn-delete" data-task-id="${task.id}">Delete</button>
      </td>
    `;

    tablaBody.appendChild(row);

  });

  initDeleteTaskButtonHandler();
}

// Funcion que limpia la tabla
function clearTable() {
  const tableBody = document.getElementById('data-table-body');

  tableBody.innerHTML = '';
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'Cargando...';

  message.style.display = 'block';
}

// Funcion que muestra mensaje de carga
function showInitialMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se ha realizado una consulta de ventas.';

  message.style.display = 'block';
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';

  message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById('message');
  
  message.style.display = 'none';
}

//#endregion

//#region 3 boyones para agregar y eliminar

function initAddTaskButtonsHandler() {

  document.getElementById('addTask').addEventListener('click', () => {
    openAddTaskModal()
  });

  document.getElementById('modal-background').addEventListener('click', () => {
    closeAddTaskModal();
  });

  document.getElementById('task-form').addEventListener('submit', event => {
    event.preventDefault();
    processSubmitTask();
  });

}

function openAddTaskModal() {
  document.getElementById('task-form').reset();
  document.getElementById('modal-background').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}


function closeAddTaskModal() {
  document.getElementById('task-form').reset();
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}

function processSubmitTask() {
  const title = document.getElementById('task-title-field').value;
  const description = document.getElementById('description-field').value;
  const completed = document.getElementById('completed-field').value;
  const priority = document.getElementById('priority-field').value;
  const tag = document.getElementById('tag-field').value;
  const dueDate = document.getElementById('due-date-field').value;

  const taskToSave = new Task(
    null,
    title,
    description,
    completed,
    priority,
    tag,
    dueDate
  );

  createTask(taskToSave);
}

function initDeleteTaskButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const taskId = button.getAttribute('data-task-id'); // Obtenemos el ID de la venta
      deleteTask(taskId); // Llamamos a la función para eleminar la venta

    });

  });

}

//region 4 consumo de la API

function getTaskData() {

  fetchAPI(`${apiURL}/users/219204833/tasks`, 'GET')
    .then(data => {
      const tasksList = mapAPIToTasks(data);
      displayTasksView(tasksList);
    });

}

function deleteTask(taskId) {

  const confirm = window.confirm(`¿Are you sure you want to delete task: ${taskId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/users/219204833/tasks/${taskId}`, 'DELETE')
      .then(() => {
        getTaskData();
        window.alert("Task eliminated.");
      });

  }
}

function createTask(task) {

  fetchAPI(`${apiURL}/users/219204833/tasks`, 'POST', task)
    .then(task => {
      closeAddTaskModal();
      getTaskData();
      window.alert(`Venta ${task.id} creada correctamente.`);
    });

}
//#endregion
//#endregion

//#region 5 funcionalidad

initAddTaskButtonsHandler();

getTaskData();

//#endregion
