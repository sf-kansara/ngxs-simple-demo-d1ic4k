import { Component, OnChanges, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { BoardState } from '../core/board.state';
import { AddTask, RemoveTask } from '../core/board.action';
import { Task } from '../core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[];
  addTaskInt: any;
  removeTaskInt: any;

  @Select(BoardState.tasks)
  tasks$: Observable<Task[]>;

  destroy$ = new Subject<void>();

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      console.log('New Tasks');
      this.tasks = tasks;
    });
    this.addTaskInt = setInterval(() => {
      this.store.dispatch(new AddTask());
    }, 5000);
    this.removeTaskInt = setInterval(() => {
      this.store.dispatch(new RemoveTask(this.tasks[0].id));
    }, 6000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    clearInterval(this.addTaskInt);
    clearInterval(this.removeTaskInt);
  }
}
