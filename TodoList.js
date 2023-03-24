let listTodo = document.querySelector('.content__body')
let addTodo = document.querySelector('.addTodo')
let inputTodo = document.querySelector('.inputTodo')
let editTodosDes = document.querySelector('.editTodosDes')
let buttonEdit = document.querySelector('.buttonEdit')
let remove_last_todo = document.querySelector('.remove_last_todo')
let buttonUp = document.querySelector('.buttonUp')

class TodoListService {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    }

    add(inputValue, tasks) {
        let task = { name: inputValue }
        if (tasks == []) {
            return false
        } else {
            tasks.push(task)
        }
        this.updateStore(tasks)
        inputValue = ''
        this.render(tasks)
    }

    get() {
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
    }

    updateStore(task) {
        localStorage.setItem('tasks', JSON.stringify(task))
    }

    render(tasks = []) {
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

    removeLastItem(tasks) {
        tasks.pop()
        this.updateStore(tasks)
        this.render(tasks)
    }

    editTodoList(value) {
        let taskId = buttonEdit.getAttribute('id')
        let tasks = this.get()
        let task = { name: value }
        if (taskId == 0 || taskId) {
            tasks[taskId] = task
            buttonEdit.removeAttribute('id')
        } else {
            alert("Please select the job you want to edit first!")
            editTodosDes.value = ''
            return false
        }
        this.updateStore(tasks)
        this.render(tasks)
    }

    removeItemById(tasks, id) {
        tasks.splice(id, 1)
        this.updateStore(tasks)
        this.render(tasks)
    }

    handlePressUpTodo(id, tasks) {
        if (id == 0) {
            return false
        } else {
            const element = tasks.splice(id, 1)
            tasks.splice(id - 1, 0, ...element)
            this.updateStore(tasks)
            this.render(tasks)
        }
    }

    handlePressDownTodo(id, tasks) {
        if (id == tasks.length) {
            return false
        } else {
            const element = tasks.splice(id, 1)
            tasks.splice(id + 1, 0, ...element)
            this.updateStore(tasks)
            this.render(tasks)
        }
    }
}

