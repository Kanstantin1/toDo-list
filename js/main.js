// найдем элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];
checkEmptyList()

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

// функции

function addTask(event) {
	//отменяем отправку формы
	event.preventDefault();

	// достаем текст задачи из инпута
	const taskText = taskInput.value;

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	//добавляем задачу в массив задач
	tasks.push(newTask);

	// формируем css класс для выполненных задач
	const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

	//формируем разметку для новой задачи 
	const taskHTML = `
	<li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class=${cssClass}>${newTask.text}</span>
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

	checkEmptyList()
}

function deleteTask(e) {
	// проверяем что клик был НЕ по кнопке удалить 
	if (e.target.dataset.action !== 'delete') {
		return
	}

	const parentNode = e.target.closest('.list-group-item');
	parentNode.remove()

	// определяем ID задачи
	const id = Number(parentNode.id);

	//найдем индекс задачи в массиве
	const index = tasks.findIndex((task) => task.id === id);

	// удаляем задачу из массива задач
	tasks.splice(index, 1);

	checkEmptyList()
}

function doneTask(event) {
	//проверка, что клик НЕ был по кнопке "задача выполнена"
	if (event.target.dataset.action !== 'done') {
		return
	}
	//проверка, что клик был по кнопке "задача выполнена"
	const parentNode = event.target.closest('.list-group-item');

	//определим ID задачи
	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);
	task.done = !task.done

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		<div class="empty-list__title">Список дел пуст</div>
	</li> `;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	} else if (tasks.length > 0) {
		const emptyListElement = document.querySelector('#emptyList');
		emptyList ? emptyList.remove() : null;
	}

}