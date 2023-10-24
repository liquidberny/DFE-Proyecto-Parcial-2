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
      <td>${formatDate(task.saleDate)}</td>
      <td>
        <button class="btn-delete" data-task-id="${task.id}">Delete</button>
      </td>
    `;

    tablaBody.appendChild(row);

  });

  initDeleteSaleButtonHandler();
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

//region 3 consumo de la API

function getTaskData() {

  fetchAPI(`${apiURL}/users/219204833`, 'GET')
    .then(data => {
      const tasksList = mapAPIToTasks(data);
      displayTasksView(tasksList);
    });

}

//#region 4 funcionalidad


getTaskData();

//#endregion
