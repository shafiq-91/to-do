document.getElementById('addButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        const currentDate = new Date().toLocaleDateString(); // Get current date

        li.className = "flex justify-between items-center p-2 border-b border-gray-200";
        li.innerHTML = `
            <span class="task flex-grow">
                ${taskText} <span class="text-gray-400 text-sm">(${currentDate})</span>
            </span>
            <div>
                <button class="complete-button text-blue-500 hover:text-blue-700">✔</button>
                <button class="delete-button text-red-500 hover:text-red-700 ml-2">✖</button>
            </div>
        `;

        // Complete task functionality
        li.querySelector('.complete-button').addEventListener('click', function() {
            li.querySelector('.task').classList.toggle('line-through');
            li.querySelector('.complete-button').disabled = true; // Disable button after completing
        });

        // Delete task functionality
        li.querySelector('.delete-button').addEventListener('click', function() {
            taskList.removeChild(li);
        });

        taskList.appendChild(li);
        taskInput.value = '';
    }
});
