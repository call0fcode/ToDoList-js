import { Todo } from './index';

export class TodoList {

  /**
   * Class that defines a list of ToDos.
   */
  constructor() {

    this.recoverFromLocalStorage();

  }


  /**
   * Adds a new ToDo passed as parameter to the "todos" array created by the
   * TodoList class' constructor.
   * @param {Todo} todo 
   */
  newTodo( todo ) {
    this.todos.push( todo );
    this.saveOnLocalStorage();
  }


  /**
   * Deletes the ToDo with the passed ID internally from the ToDos array created
   * by the TodoList class' constructor.
   * @param { number} id 
   */
  deleteTodo( id ) {

    this.todos = this.todos.filter( todo => todo.id != id );
    this.saveOnLocalStorage();

  }


  /**
   * Toggles the status of 'completed' for the element with the same ID as the
   * one passed as parameter.
   * @param { number } id 
   */
  toggleCompleted( id ) {

    for ( const todo of this.todos ) {

      if ( todo.id === id ) {

        todo.completed = !todo.completed;
        this.saveOnLocalStorage();
        break;

      }
    }  
  }

  
  /**
   * Deletes all completed ToDos internally from the ToDos array created by the
   * TodoList class' constructor.
   */
  deleteAllCompleted() {

    this.todos = this.todos.filter( todo => !todo.completed );
    this.saveOnLocalStorage();

  }


  /**
   * Saves on localStorage the current status of the ToDos array created by the
   * TodoList class' constructor.
   */
  saveOnLocalStorage() {

    localStorage.setItem('todos', JSON.stringify( this.todos ));

  }


  /**
   * Recovers the current status from localStorage. If there are previously
   * previously saved ToDos, they're charged, else, the internal ToDos list is
   * initialized to an empty string.
   */
  recoverFromLocalStorage() {

    this.todos = ( localStorage.getItem( 'todos' ) )
                   ? JSON.parse( localStorage.getItem( 'todos' ) )
                   : [];

  }

}