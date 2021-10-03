import {Pipe, PipeTransform} from '@angular/core';
import {TodoModel} from '../models/Todo.model';
import TodoType from '../models/types/todo.type';

@Pipe({
  name: 'toDoActivity'
})
export class ToDoActivityPipe implements PipeTransform {
  transform(toDoList: TodoModel[], status: number): TodoModel[] {
    if (status === TodoType.STATUS_ACTIVE) {
      return toDoList.filter(item => !item.isCompleted);
    }
    if (status === TodoType.STATUS_COMPLETED) {
      return toDoList.filter(item => item.isCompleted);
    }
    return toDoList;

  }

}
