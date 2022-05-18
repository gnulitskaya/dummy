import { takeUntil } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { Todo, TodoQuery } from './state/todo.store';
import { Observable, Subject } from 'rxjs';
import { TodoService } from './state/todo.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  // displayedColumns: string[] = ['position', 'status', 'name', 'delete', 'edit'];
  // dataSource = new MatTableDataSource<Todo>();

  // active$?: Observable<ID>;

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  todos$: Observable<Todo[]> = this.todoQuery.todos$.pipe(takeUntil(this._destroy$));

  constructor(private todoService: TodoService, private todoQuery: TodoQuery) { }

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    checkbox: new FormControl(false)
  })

  ngOnInit() {
    // this.active$ = this.todoQuery.selectActiveId();

    this.form.get('checkbox')?.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe((todo: Todo) => {
      this.todoService.updateStatus(todo);
    })

    // this.todoQuery.selectAll().pipe(
    //   takeUntil(this._destroy$)
    // ).subscribe(v => {
    //   this.dataSource.data = v as Todo[];
    // });

  }

  add(input: string) {
    //when the given input is non-blank
    input = input.trim();
    if (!input) { return; }
      this.todoService.addTodo(input);
      this.form.get('title')?.reset();
  }

  update(todo: Todo) {
    this.todoService.updateStatus(todo);
  }

  delete(id: ID) {
    this.todoService.removeTodo(id);
  }

  // setActive(id: ID) {
  //   this.todoService.setActive(id);
  // }

  // edit(id: number){
  //   this.isEditTodo = true;
  //   this.todoService.editText(id);
  // }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete();
  }

}
