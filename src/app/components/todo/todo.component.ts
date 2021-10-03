import {Component, OnInit} from '@angular/core';
import {ThemingService} from '../../services/theming.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoModel} from '../../models/Todo.model';
import {FormGroup} from '@angular/forms';
import TodoType from '../../models/types/todo.type';
import {TasksService} from '../../services/tasks.service';
import {SnackbarService} from '../../services/snackbar.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public toDoLists: TodoModel[] = [];
  readonly todoType = TodoType;
  public statusOfTasks = TodoType.STATUS_ALL;


  constructor(private theming: ThemingService,
              private tasksService: TasksService,
              private snackbarService: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.getAllTasks();
  }


  getAllTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.toDoLists = tasks;

    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.setActiveTab();
    moveItemInArray(this.toDoLists, event.previousIndex, event.currentIndex);
  }


  addItemToList(toDoForm: FormGroup): void {
    this.setActiveTab();
    const toDoItem = new TodoModel({...toDoForm.value});
    this.toDoLists = [toDoItem, ...this.toDoLists];
    this.snackbarService.openSnackBar('Your task has been added.');
  }

  removeToDoFromList(toDo: TodoModel) {
    this.toDoLists = this.toDoLists.filter(item => item !== toDo);
    this.snackbarService.openSnackBar('Your task has been deleted.');

  }

  changePipeVariable(todoType: number): void {
    this.statusOfTasks = todoType;
  }

  clearAllCompleted(): void {
    this.setActiveTab();
    this.toDoLists = this.toDoLists.filter(item => !item.isCompleted);
    this.snackbarService.openSnackBar('Completed tasks were deleted.');
  }

  setActiveTab(): void {
    this.statusOfTasks = TodoType.STATUS_ALL;
  }


}
