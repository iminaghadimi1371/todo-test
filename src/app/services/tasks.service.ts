import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TodoModel} from '../models/Todo.model';
import {map} from 'rxjs/operators';

interface TaskInterface {
  title: string,
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  public getTasks(): Observable<TodoModel[]> {
    return this.http.get<TaskInterface[]>("./assets/fake-data/tasks.json").pipe(
      map(tasks => {
        const allTasks = [];
        tasks.forEach(task => {
          allTasks.push(new TodoModel({...task}))
        });
        return allTasks;

      })
    );
  }
}
