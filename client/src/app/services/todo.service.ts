import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TodoService{
    constructor(public _http:Http){

    }

    getTodos(){
        return this._http.get('http://localhost:3012/api/v1/todos');
    }


    saveTodo(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Methods", "POST, GET, DELETE");
        headers.append("Access-Control-Max-Age", "3600");
        headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Client-Offset");


        return this._http.post('http://localhost:3012/api/v1/todo',JSON.stringify(todo),{headers: headers})
        .map(res => res.json());
    }
    

    updateTodo(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this._http.put('http://localhost:3012/api/v1/todo/'+todo._id,JSON.stringify(todo),{headers: headers});
    }
    
}