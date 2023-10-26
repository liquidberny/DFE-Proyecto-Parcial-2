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

function APIToTask(data) {
    return new Task(
      data.id,
      data.title,
      data.description,
      data.completed,
      data.priority,
      data.tag,
      new Date(data.dueDate),
    );
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
      <td>
        <button class="btn-update" data-task-id="${task.id}">Update</button>
      </td>
    `;

    tablaBody.appendChild(row);

  });

  initDeleteTaskButtonHandler();
  initUpdateTaskButtonHandler();
}

function displayTaskModal(task){
  const id = document.getElementById("update-task-id");
  const taskTitleField = document.getElementById("update-task-title-field");
  const descriptionField = document.getElementById("update-description-field");
  const completedField = document.getElementById("update-completed-field");
  const priorityField = document.getElementById("update-priority-field");
  const tagField = document.getElementById("update-tag-field");
  const dueDateField = document.getElementById("update-due-date-field");

  // Llenar los campos con los valores del objeto task
  id.value=task.id;
  taskTitleField.value = task.title;
  descriptionField.value = task.description;
  completedField.value = task.completed.toString();
  priorityField.value = task.priority.toLowerCase();
  tagField.value = task.tag;
  
  // Formatear la fecha en el campo "due date"
  const dueDate = new Date(task.dueDate);
  const formattedDueDate = dueDate.toISOString().substring(0, 10);
  dueDateField.value = formattedDueDate;

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

//#region 3 botones para agregar, eliminar y actualizar

function initAddTaskButtonsHandler() {

  document.getElementById('addTask').addEventListener('click', () => {
    openAddTaskModal()
  });

  document.getElementById('modal-background').addEventListener('click', () => {
    closeAddTaskModal();
    closeUpdateTaskModal();
  });

  document.getElementById('task-form').addEventListener('submit', event => {
    event.preventDefault();
    processSubmitTask();
  });
  document.getElementById('update-task-form').addEventListener('submit', event => {
    event.preventDefault();
    processUpdateTask();
  });

}

function openAddTaskModal() {

  document.getElementById('task-form').reset();
  document.getElementById('modal-background').style.display = 'block';
  document.getElementById('modal').style.display = 'block';

}

function openUpdateTaskModal(taskId) {
  getTaskData(taskId);

  document.getElementById('task-form').reset();
  document.getElementById('modal-background').style.display = 'block';
  document.getElementById('modal-update').style.display = 'block';
}


function closeAddTaskModal() {
  document.getElementById('task-form').reset();
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}

function closeUpdateTaskModal() {
  document.getElementById('update-task-form').reset();
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal-update').style.display = 'none';
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
  function processUpdateTask() {
    const id = document.getElementById('update-task-id').value
    const title = document.getElementById('update-task-title-field').value;
    const description = document.getElementById('update-description-field').value;
    const completed = document.getElementById('update-completed-field').value;
    const priority = document.getElementById('update-priority-field').value;
    const tag = document.getElementById('update-tag-field').value;
    const dueDate = document.getElementById('update-due-date-field').value;
  
    const taskToSave = new Task(
      id,
      title,
      description,
      completed,
      priority,
      tag,
      dueDate
    );
  
      updateTask(taskToSave);
  
    } 

function initDeleteTaskButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const taskId = button.getAttribute('data-task-id'); // Obtenemos el ID de la venta
      deleteTask(taskId); // Llamamos a la función para eleminar la venta

    });

  });

}

function initUpdateTaskButtonHandler() {

  document.querySelectorAll('.btn-update').forEach(button => {

    button.addEventListener('click', () => {

      const taskId = button.getAttribute('data-task-id'); // Obtenemos el ID de la venta
      openUpdateTaskModal(taskId);

    });

  });

}


//region 4 consumo de la API

function getTasksData() {
  fetchAPI(`${apiURL}/users/219204833/tasks`, 'GET')
    .then(data => {
      const tasksList = mapAPIToTasks(data);
      displayTasksView(tasksList);
    });

}

function getTaskData(taskId) {
  fetchAPI(`${apiURL}/users/219204833/tasks/${taskId}`, 'GET')
    .then(data => {
      const task = APIToTask(data);
      displayTaskModal(task);
    });

}
function deleteTask(taskId) {

  const confirm = window.confirm(`¿Are you sure you want to delete task: ${taskId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/users/219204833/tasks/${taskId}`, 'DELETE')
      .then(() => {
        getTasksData();
        window.alert("Task eliminated.");
      });

  }
}

function createTask(task) {

  fetchAPI(`${apiURL}/users/219204833/tasks`, 'POST', task)
    .then(task => {
      closeAddTaskModal();
      getTasksData();
      window.alert(`Venta ${task.id} creada correctamente.`);
    });

}

function updateTask(task) {

  fetchAPI(`${apiURL}/users/219204833/tasks/${task.id}`, 'PUT', task)
    .then(task => {
      closeUpdateTaskModal();
      getTasksData();
      window.alert(`Venta ${task.id} actualizada correctamente.`);
    });

}
//#endregion

//#region 5 funcionalidad

initAddTaskButtonsHandler();

getTasksData();

//#endregion
