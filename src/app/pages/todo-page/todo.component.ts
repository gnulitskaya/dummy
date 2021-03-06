import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import {Todo} from "../../shared/interfaces";
import {ID} from "@datorama/akita";
import {FormControl, FormGroup} from "@angular/forms";
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  styleUrls: ['./todo-page.component.scss'],
  template: `
    <form [formGroup]="todoForm">
      <mat-card>
    <li class="list__item">
      <div class='list__item-box'>
        <mat-checkbox class="list__checkbox" [formControl]="checkbox"></mat-checkbox>
        <ng-container *ngIf="selectedEdit !== todo.id; else editText">
          <span>{{todo.title}}</span>
        </ng-container>
        <ng-template #editText>
        <mat-form-field appearance="legacy">
          <mat-label>Edit</mat-label>
          <input matInput placeholder="Edit todo" formControlName="title" #title (keydown.enter)="onSaveClick(title.value)">
        </mat-form-field>
        </ng-template>
      </div>

      <div class='list__item-box'>
        <button (click)="onEditClick(todo.id)" mat-fab color="primary" aria-label="Example icon button with a delete icon" class='list__edit'>
          <mat-icon>edit</mat-icon>
        </button>

        <button mat-fab color="warn" aria-label="Example icon button with a delete icon" (click)="onDeleteClick(todo.id)" class='list__remove'>
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </li>
      </mat-card>
    </form>
  `,
})
export class TodoComponent implements OnInit{

  // @ViewChild('titleEdit') titleEditElement: ElementRef<HTMLInputElement>;

  @Input() todo: Todo;

  @Output() delete : EventEmitter<string>  = new EventEmitter<string>();
  @Output() complete : EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() saveEditTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  checkbox: FormControl;

  selectedEdit: ID | null = null;

  onDeleteClick(id: string) {
    this.delete.emit(id);
  }
  onSaveClick(title: string) {
    this.saveEditTodo.emit({ ...this.todo, title });
  }
  onEditClick(id: string) {
    this.edit.emit(id);
    this.selectedEdit = id;
  }

  todoForm!: FormGroup;

  ngOnInit(): void {
    this.checkbox = new FormControl(this.todo.completed);

    this.todoForm = new FormGroup({
      title: new FormControl(this.todo.title),
    })

    this.checkbox.valueChanges.subscribe((completed: boolean) => {
      this.complete.emit({ ...this.todo, completed });
    });

    // this.todoForm.controls['title'].valueChanges
    // .pipe(
    //   debounceTime(2000),
    //   map((title: string) => {
    //   this.saveEditTodo.emit({ ...this.todo, title });
    // })
    // )
    // .subscribe();
  }

  // onEnter(): void {
  //   this.saveEditTodo.emit();
  // }

  // ngAfterViewInit(): void {
  //   this.titleEditElement.nativeElement.focus();
  // }


}
