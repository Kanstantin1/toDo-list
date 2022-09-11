// найдем элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

// функции

function addTask(event) {
	//отменяем отправку формы
	event.preventDefault();

	// достаем текст задачи из инпута
	const taskText = taskInput.value;

	//формируем разметку для новой задачи 
	const taskHTML = `
	<li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

	// добавим задачу на страницу
	tasksList.insertAdjacentHTML('beforeend', taskHTML);

	//очищаем форму для ввода и возвращаем на него фокус
	taskInput.value = "";
	taskInput.focus();


	// если есть задачи, то скроем список пуст
	if (tasksList.children.length > 1) {
		emptyList.classList.add('none')
	}
}

function deleteTask(e) {
	// проверяем что клик был НЕ по кнопке удалить 
	if (e.target.dataset.action !== 'delete') {
		return
	}

	const parentNode = e.target.closest('.list-group-item');
	parentNode.remove()

	// если удалили задачи, то вернем список пуст
	if (tasksList.children.length === 1) {
		emptyList.classList.remove('none')
	}
}

function doneTask(event) {
	//проверка, что клик НЕ был по кнопке "задача выполнена"
	if (event.target.dataset.action !== 'done') {
		return
	}
	//проверка, что клик был по кнопке "задача выполнена"
	const parentNode = event.target.closest('.list-group-item');
	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}
