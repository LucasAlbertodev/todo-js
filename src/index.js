import './styles.css';

import {Todo, TodoList} from './classes';
import {createTodoHTML} from './js/componentes'

export const todoList = new TodoList();

todoList.todos.forEach(todo => createTodoHTML(todo)); 

console.log('todos', todoList.todos)