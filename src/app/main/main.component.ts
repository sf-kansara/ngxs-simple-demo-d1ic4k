import { Component, OnChanges, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { BoardState, Column, Group } from '../core';
import { AddTask, RemoveTask } from '../core';
import { Task } from '../core';
import {takeWhile} from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  groups: Group[];
  columns: Column[];
  tasks: Task[];

  addTaskInt: any;
  removeTaskInt: any;
  addColumnInt: any;
  removeColumnInt: any;

  @Select(BoardState.groups)
  groups$: Observable<Group[]>;
  @Select(BoardState.columns)
  columns$: Observable<Column[]>;
  @Select(BoardState.tasks)
  tasks$: Observable<Task[]>;

  destroy$ = new Subject<void>();

  groupTasks: { [groupId: string]: Task[] } = {};
  groupColumns: { [groupId: string]: Column[] } = {};

  constructor(private store: Store) {}

  ngOnInit() {
    combineLatest([this.groups$, this.columns$, this.tasks$])
      // .pipe(takeWhile((e) => !e.every((v) => !!v), true))
      .subscribe(([groups, columns, tasks]) => {
        console.log('Initing data');
        this.groups = groups;
        this.columns = columns;
        this.tasks = tasks;
        this.groupTasks = {};
        this.groupColumns = {};
        this.groups.forEach((group) => {
          this.groupColumns[group.id] = [];
          this.groupTasks[group.id] = [];
        });
        this.columns.forEach((column) => {
          this.groupColumns[column.groupId].push(column);
        });
        this.tasks.forEach((task) => {
          this.groupTasks[task.groupId].push(task);
        });
      });
    this.addTaskInt = setInterval(() => {
      this.store.dispatch(new AddTask(this.groups[0].id));
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
