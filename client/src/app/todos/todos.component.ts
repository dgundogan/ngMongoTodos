import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import 'rxjs/add/operator/map';

import { Todo } from '../model/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private _todoService:TodoService) { 

  }
 
  ngOnInit() {
    this.todos = [];
    this._todoService.getTodos().map(res => res.json()).subscribe(todos => this.todos = todos);
   
  }

  addTodo($event, todoText){
    if($event.which == 1){
      var result;
      var newTodo = {
        text: todoText.value,
        isCompleted: false
      };

      result = this._todoService.saveTodo(newTodo);
      result.subscribe(x=>{
          this.todos.push(newTodo)
          todoText.value='';
      });

    }
  }

  updateStatus(todo){
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };

        this._todoService.updateTodo(_todo)
        .map(res => res.json())
        .subscribe(data=>{
          todo.isCompleted = !todo.isCompleted;
        });

  }

}
