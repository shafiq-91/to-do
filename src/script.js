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
const statusFilter = document.getElementById('status-filter');
const priorityFilter = document.getElementById('priority-filter');

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
        addTaskToTable(todoId, taskText, taskDate, taskPriority);
        todoId++;
        taskInput.value = '';
        priorityInput.value = 'Low'; // Reset priority input
    }
});

function addTaskToTable(id, text, date, priority) {
    const tr = document.createElement('tr');
    tr.className = 'border border-gray-300';
    tr.setAttribute('data-status', 'Pending'); // Set default status
    tr.innerHTML = `
                <td class="border border-gray-300 p-2 text-center">${id}</td>
                <td class="border border-gray-300 p-2">${text}</td>
                <td class="border border-gray-300 p-2 text-center">${date}</td>
                <td class="border border-gray-300 p-2 text-center" id="status-${id}">Pending</td>
                <td class="border border-gray-300 p-2 text-center">${priority}</td>
                <td class="border border-gray-300 p-2 text-center">
                    <button class="text-green-500 hover:text-green-700" onclick="completeTask(${id})">
                        <i class='bx bx-check'></i>
                    </button>
                    <button class="text-blue-500 hover:text-blue-700" onclick="openEditModal(${id})">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700" onclick="openDeleteModal(${id})">
                        <i class='bx bx-trash'></i>
                    </button>
                </td>
            `;
    todoList.appendChild(tr);
    filterTasks();
}

function completeTask(id) {
    const statusCell = document.getElementById(`status-${id}`);
    const row = document.querySelector(`tr[data-status="${statusCell.innerText}"]`);
    if (row) {
        const newStatus = statusCell.innerText === "Pending" ? "Completed" : "Pending";
        statusCell.innerText = newStatus;
        row.setAttribute('data-status', newStatus); // Update row status
        filterTasks(); // Re-filter the tasks after completion
    }
}

function openEditModal(id) {
    currentEditId = id;
    const row = document.querySelector(`tr[data-status="Pending"]`) || document.querySelector(`tr[data-status="Completed"]`);
    if (row) {
        const taskText = row.cells[1].innerText;
        const taskPriority = row.cells[4].innerText;
        editTaskInput.value = taskText;
        editPriorityInput.value = taskPriority;
        editModal.classList.remove('hidden');
    }
}

saveBtn.addEventListener('click', () => {
    const updatedText = editTaskInput.value.trim();
    const updatedPriority = editPriorityInput.value;

    if (updatedText && currentEditId) {
        const row = document.querySelector(`tr[data-status="Pending"]`) || document.querySelector(`tr[data-status="Completed"]`);
        if (row) {
            row.cells[1].innerText = updatedText;
            row.cells[4].innerText = updatedPriority;
        }
        closeEditModal();
    }
});

closeBtn.addEventListener('click', closeEditModal);
function closeEditModal() {
    editModal.classList.add('hidden');
    currentEditId = null;
}

function openDeleteModal(id) {
    taskToDeleteId = id;
    deleteModal.classList.remove('hidden');
}

confirmDeleteBtn.addEventListener('click', () => {
    const row = document.querySelector(`tr[data-status="Pending"]`) || document.querySelector(`tr[data-status="Completed"]`);
    if (row) {
        row.remove();
    }
    closeDeleteModal();
});

cancelDeleteBtn.addEventListener('click', closeDeleteModal);
function closeDeleteModal() {
    deleteModal.classList.add('hidden');
    taskToDeleteId = null;
}

// Filtering tasks based on status and priority
statusFilter.addEventListener('change', filterTasks);
priorityFilter.addEventListener('change', filterTasks);

function filterTasks() {
    const statusValue = statusFilter.value;
    const priorityValue = priorityFilter.value;

    const rows = todoList.querySelectorAll('tr');
    rows.forEach(row => {
        const status = row.getAttribute('data-status');
        const priority = row.cells[4].innerText;

        const showByStatus = (statusValue === "All" || status === statusValue);
        const showByPriority = (priorityValue === "All" || priority === priorityValue);

        if (showByStatus && showByPriority) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
}