let listTodo = document.querySelector('.content__body')
let addTodo = document.querySelector('.addTodo')
let inputTodo = document.querySelector('.inputTodo')
let editTodosDes = document.querySelector('.editTodosDes')
let buttonEdit = document.querySelector('.buttonEdit')
let remove_last_todo = document.querySelector('.remove_last_todo')
let buttonUp = document.querySelector('.buttonUp')

let tasks = getTaskFromLocalStorage()
renderTasks(tasks)

// Enter press handle

inputTodo.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        if (!inputTodo.value) {
            alert("Vui lòng nhập tên công việc")
            return false
        }
        let tasks = getTaskFromLocalStorage()
        let task = { name: inputTodo.value }
        tasks.push(task)
        inputTodo.value = ''
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(tasks)
    }
})

// Add

addTodo.addEventListener('click', function () {
    if (!inputTodo.value) {
        alert("Vui lòng nhập tên công việc")
        return false
    }

    let tasks = getTaskFromLocalStorage()
    let task = { name: inputTodo.value }
    tasks.push(task)
    inputTodo.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)
})

// Edit

buttonEdit.addEventListener('click', function () {
    if (!editTodosDes.value) {
        alert("Vui lòng nhập tên công việc")
        return false
    }
    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let task = { name: editTodosDes.value }
    if (taskId == 0 || taskId) {
        tasks[taskId] = task
        this.removeAttribute('id')
    } else {
        alert("Please select the job you want to edit first!")
        editTodosDes.value = ''
        return false
    }
    editTodosDes.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)
})

// Remove last todo

remove_last_todo.addEventListener('click', function () {
    let tasks = getTaskFromLocalStorage()
    tasks.pop()
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)
})

// Render todolist

function renderTasks(tasks = []) {
    let content = '<ul>'
    tasks.forEach((task, index) => {
        content += `
        <li>
            <div>${task.name}</div>
            <div>
                <button class="secondary__color buttonUp" onClick="upTodo(${index})">Up</button>
                <button class="primary__color"  onClick="downTodo(${index})">Down</button>
                <button class="primary__color" onClick="editTask(${index})">Edit</button>
                <button class="remove__color" onClick="deleteTask(${index})">Remove</button>
            </div>
        </li>
        `
    })
    content += '</ul>'
    listTodo.innerHTML = content
}

// Edit

function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if (tasks.length > 0) {
        editTodosDes.value = tasks[id].name
        buttonEdit.setAttribute('id', id)
    }
    editTodosDes.focus()
}

// Press up handle

function upTodo(id) {
    let tasks = getTaskFromLocalStorage()
    console.log('cehck id: ', id)
    if (id == 0) {
        return false
    } else {
        const element = tasks.splice(id, 1)
        tasks.splice(id - 1, 0, ...element)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}

// Press down handle

function downTodo(id) {
    let tasks = getTaskFromLocalStorage()
    if (id == tasks.length) {
        return false
    } else {
        const element = tasks.splice(id, 1)
        tasks.splice(id + 1, 0, ...element)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}

// Delete todo by id

function deleteTask(id) {
    let tasks = getTaskFromLocalStorage()
    tasks.splice(id, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(getTaskFromLocalStorage())
}

// Get all todolist from localstorage

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}

// hide or show todolist

function buttonHideTodoList() {
    listTodo.classList.toggle('hide')
}