import { Todo } from "../classes";
import{todoList} from "../index"

//references html
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnDelete = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilter = document.querySelectorAll('.filter')

export const createTodoHTML = (todo) =>{

    const htmlTodo = `
     <li class="${  (todo.complete) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.complete) ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
     </li>`;

     const div = document.createElement('div');
     div.innerHTML = htmlTodo;

     divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

//event
txtInput.addEventListener('keyup' , (e) => {
   if (e.keyCode === 13 && txtInput.value.length > 0) {
    
    const newTodo = new Todo(txtInput.value)  
    todoList.newTodo(newTodo);   
    createTodoHTML(newTodo);
    txtInput.value = '';
    
   }
});

divTodoList.addEventListener('click', (e) => {

    const nameElement = e.target.localName;
    const todoElement = e.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

  if (nameElement.includes('input')) {
      todoList.checkCompleted(todoId);
      todoElement.classList.toggle('completed');
    //   
  }else if (nameElement.includes('button')) {
      todoList.deleteTodo(todoId);
      divTodoList.removeChild(todoElement);
  }

});

btnDelete.addEventListener('click', () => {
    todoList.clearCompleted();

    for (let i = divTodoList.children.length-1; i >=0 ; i--) {
        
        const element = divTodoList.children[i]
        
        if(element.classList.contains('completed')){
            divTodoList.removeChild(element)
        }      
    }
});

ulFilters.addEventListener('click',(e)=> {

    const filter = e.target.text;
    if (!filter) {return;}

    anchorFilter.forEach(elem => elem.classList.remove('selected'))
    e.target.classList.add('selected');

    
    for(const element of divTodoList.children){
    
        element.classList.remove('hidden')
        const completed = element.classList.contains('completed');

        switch (filter) {

            case 'Active':
               if (completed) {
                   element.classList.add('hidden')
               }
               break;

            case 'Completed':
               if (!completed) {
                    element.classList.add('hidden')
                }
                break;   

             default:
                break;
        }
    }
});



