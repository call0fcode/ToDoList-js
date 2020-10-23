import { Todo } from '../classes';
import { todoList } from '../index';

// HTML References
const ulTodoList      = document.querySelector( '.todo-list' );
const txtInput        = document.querySelector( '.new-todo' );
const clearAllBtn     = document.querySelector( '.clear-completed' );
const anchorFilters   = document.querySelectorAll( '.filter' );


/**
 * Displays a ToDo passed as paramater on the HTML.
 * @param { Todo } todo 
 */
export const createTodoOnHTML = ( todo ) => {

  const htmlTodo = `
  <li class="${ ( todo.completed ) ? 'completed' : '' }" data-id="${ todo.id }">
      <div class="view">
          <input class="toggle" type="checkbox" ${ ( todo.completed ) ? 'checked' : '' }>
          <label>${ todo.task }</label>
          <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
  </li>`;

  const div = document.createElement( 'div' );
  div.innerHTML = htmlTodo;
  ulTodoList.append( div.firstElementChild );

  return div.firstElementChild;
}



// Events

// If pressed enter: it takes the input value, creates a new ToDo from it, adds
// it to the list of ToDos internally, displays it on the HTML and lastly clears
// the input field.
txtInput.addEventListener( 'keyup', ( event ) => {

  if ( event.keyCode === 13 && txtInput.value.trim().length ) {
    
    const newTodo = new Todo( txtInput.value );
    todoList.newTodo( newTodo );
    createTodoOnHTML( newTodo );
    txtInput.value = '';

    console.log(todoList);
  }

});

// Actions to perform when clicked on checkbox or delete button for each ToDo.
ulTodoList.addEventListener( 'click', ( event ) => {

  const elementName = event.target.localName; // input, label or button
  const todoElement = event.target.closest('li');
  const todoID      = +todoElement.getAttribute('data-id');
  
  if ( elementName === 'input' ) {

    todoList.toggleCompleted( todoID );
    todoElement.classList.toggle('completed');

  } else if ( elementName === 'button' ) {

    todoList.deleteTodo( todoID );
    ulTodoList.removeChild( todoElement );

  }

});

// Clear al completed ToDos when clicked on "Clear completed" button.
clearAllBtn.addEventListener( 'click', () => {

  todoList.deleteAllCompleted();

  for ( let i = ulTodoList.children.length - 1; i >= 0; i-- ) {

    const todo = ulTodoList.children[i];

    if ( todo.classList.contains('completed') ) {

      ulTodoList.removeChild( todo );

    }
  }

});

// Actions to perform when clicked on a filter button.
anchorFilters.forEach( anchor => {

  anchor.addEventListener( 'click', ( event ) => {

    anchorFilters.forEach( anchor => {

      anchor.classList.remove( 'selected' );

    });

    event.target.classList.add( 'selected' );

    const filter = event.target.text;

    for ( const todo of ulTodoList.children ) {
      
      todo.classList.remove( 'hidden' );
      const isCompleted = todo.classList.contains( 'completed' );

      switch ( filter ) {

        case 'Not completed':
          if ( isCompleted ) {
            todo.classList.add( 'hidden' );
          }
        break

        case 'Completed':
          if ( !isCompleted ) {
            todo.classList.add( 'hidden' );
          }
        break
  
      }

    }

  });

});