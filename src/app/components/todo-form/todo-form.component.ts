import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  public toDoForm: FormGroup;
  @Output('toDoForm') toDoFormValues = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initToDoForm();
  }

  // ----------------------------- Begin: Setting up the form  ----------------------------------- //

  initToDoForm(): void {
    this.toDoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      isCompleted: [false],
    });
  }

  // ----------------------------- End: Setting up the form  ----------------------------------- //
  addItemToList() {
    if (this.toDoForm.invalid) return;
    this.toDoFormValues.emit(this.toDoForm);
    this.toDoForm.reset();
  }


}
