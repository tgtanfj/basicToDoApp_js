let listTodo = document.querySelector('.content__body')
let addTodo = document.querySelector('.addTodo')
let inputTodo = document.querySelector('.inputTodo')
let editTodosDes = document.querySelector('.editTodosDes')
let buttonEdit = document.querySelector('.buttonEdit')
let remove_last_todo = document.querySelector('.remove_last_todo')
let buttonUp = document.querySelector('.buttonUp')

class TodoListService {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || ''
    }

    add(inputValue) {
      this.tasks.push(inputValue)
      this.updateStore()
      this.render()
    }

    get() {
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : ''
    }
    
    updateStore(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    render() {
        let content = '<ul>'
        this.tasks.forEach((task, index) => {
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

}

