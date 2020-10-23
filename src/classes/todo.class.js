export class Todo {

  /**
   * Class that defines a ToDo.
   * @param { string } task 
   */
  constructor ( task ) {
    
    this.task      = task;
    
    this.id        = new Date().getTime();
    this.completed = false;
    this.created   = new Date(); 
  }

}