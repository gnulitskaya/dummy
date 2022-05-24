import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../shared/interfaces";
import {ID} from "@datorama/akita";

@Component({
  selector: 'app-todos',
  styleUrls: ['./todo-page.component.scss'],
  template: `
    <ul class='todo-list list'>
      <app-todo *ngFor="let todo of todos"
                (delete)="onDeleteClick($event)"
                [todo]="todo"
                (complete)="complete.emit($event)"
                (saveEditTodo)="save.emit($event)"
                (edit)="onEditClick($event)"
      ></app-todo>
    </ul>
  `,
})
export class TodosComponent {
  @Input() todos: Todo[] | null;
  @Output() complete = new EventEmitter<Todo>();
  @Output() save = new EventEmitter<Todo>();

  @Output() delete: EventEmitter<ID> = new EventEmitter<ID>();
  @Output() edit: EventEmitter<ID> = new EventEmitter<ID>();

  onDeleteClick(id: ID): void {
    this.delete.emit(id);
  }
  onEditClick(id: ID): void {
    this.edit.emit(id);
  }
}
