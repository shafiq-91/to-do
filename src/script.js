let todoId = 1;

        const form = document.getElementById('todo-form');
        const taskInput = document.getElementById('task-input');
        const priorityInput = document.getElementById('priority-input');
        const todoList = document.getElementById('todo-list');

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
                        <button class="text-blue-500 hover:text-blue-700" onclick="editTask(${todoId})">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700" onclick="removeTask(${todoId})">
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
            if (statusCell.innerText === "Pending") {
                statusCell.innerText = "Completed";
            } else {
                statusCell.innerText = "Pending";
            }
        }

        function editTask(id) {
            const row = document.querySelector(`tr:nth-child(${id})`);
            const taskCell = row.children[1];
            const priorityCell = row.children[4];

            const newTask = prompt("Edit task:", taskCell.innerText);
            const newPriority = prompt("Edit priority (Low, Medium, High):", priorityCell.innerText);

            if (newTask) taskCell.innerText = newTask;
            if (newPriority) priorityCell.innerText = newPriority;
        }

        function removeTask(id) {
            const row = document.querySelector(`tr:nth-child(${id})`);
            todoList.removeChild(row);
        }