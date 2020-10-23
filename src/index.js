import './styles.css';

import { Todo, TodoList } from './classes';
import { createTodoOnHTML } from './js/components';

// Creates a ToDo list where to add ToDos.
export const todoList = new TodoList();

// Display all ToDos on the HTML.
todoList.todos.forEach( createTodoOnHTML );