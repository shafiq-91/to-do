let todoId = 1;
let currentEditId = null;
let taskToDeleteId = null;

const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');
const todoList = document.getElementById('todo-list');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const editPriorityInput = document.getElementById('edit-priority-input');
const saveBtn = document.getElementById('save-btn');
const closeBtn = document.getElementById('close-btn');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }); // Format: "09 Oct 2024"
    const taskPriority = priorityInput.value;

    if (taskText) {
        const tr = document.createElement('tr');
        tr.className = 'border border-gray-300';
        tr.innerHTML = `
                    <td class="border border-gray-300 p-2 text-center">${todoId}</td>
                    <td class="border border-gray-300 p-2">${taskText}</td>
                    <td class="border border-gray-300 p-2 text-center">${taskDate}</td>
                    <td class="border border-gray-300 p-2 text-center" id="status-${todoId}">Pending</td>
                    <td class="border border-gray-300 p-2 text-center">${taskPriority}</td>
                    <td class="border border-gray-300 p-2 text-center">
                        <button class="text-green-500 hover:text-green-700" onclick="completeTask(${todoId})">
                            <i class='bx bx-check'></i>
                        </button>
                        <button class="text-blue-500 hover:text-blue-700" onclick="openEditModal(${todoId})">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700" onclick="openDeleteModal(${todoId})">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                `;
        todoList.appendChild(tr);
        todoId++;
        taskInput.value = '';
        priorityInput.value = 'Low'; // Reset priority input
    }
});

function completeTask(id) {
    const statusCell = document.getElementById(`status-${id}`);
    statusCell.innerText = statusCell.innerText === "Pending" ? "Completed" : "Pending";
}

function openEditModal(id) {
    const row = Array.from(todoList.children).find(row => row.cells[0].innerText == id);
    if (row) {
        currentEditId = id;
        editTaskInput.value = row.cells[1].innerText;
        editPriorityInput.value = row.cells[4].innerText;
        editModal.classList.remove('hidden'); // Show the modal
    }
}

saveBtn.addEventListener('click', () => {
    const row = Array.from(todoList.children).find(row => row.cells[0].innerText == currentEditId);
    if (row) {
        row.cells[1].innerText = editTaskInput.value;
        row.cells[4].innerText = editPriorityInput.value;
        editModal.classList.add('hidden'); // Hide the modal
    }
});

closeBtn.addEventListener('click', () => {
    editModal.classList.add('hidden'); // Hide the modal
});

function openDeleteModal(id) {
    taskToDeleteId = id;
    deleteModal.classList.remove('hidden'); // Show delete confirmation modal
}

confirmDeleteBtn.addEventListener('click', () => {
    removeTask(taskToDeleteId);
    deleteModal.classList.add('hidden'); // Hide the modal
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.add('hidden'); // Hide the modal
});

function removeTask(id) {
    const row = Array.from(todoList.children).find(row => row.cells[0].innerText == id);
    if (row) {
        todoList.removeChild(row);
    }
}