import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import {
  AddColumn,
  BoardState,
  Column,
  Group,
  AddTask,
  RemoveTask,
  Task,
  MessageService,
  TaskAddData,
  ColumnAddData,
} from '../core';
import { Column_AddData, Task_AddData } from '../models';
import { SharedMessageService } from '../services';
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
  selectedGroupId: string;

  constructor(
    private store: Store,
    private readonly msgService: MessageService,
    private readonly sharedMsgService: SharedMessageService
  ) {}

  ngOnInit() {
    this.listenMessage();
    combineLatest([this.groups$, this.columns$, this.tasks$])
      .pipe(takeWhile((e) => !e.every((v) => !!v), true))
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
        if (!this.selectedGroupId) {
          this.selectedGroupId = this.groups[0].id;
        }
        this.columns.forEach((column) => {
          this.groupColumns[column.groupId].push(column);
        });
        this.tasks.forEach((task) => {
          this.groupTasks[task.groupId].push(task);
        });
        // this.autoEvents();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.clearEvents();
  }

  listenMessage() {
    this.msgService.getMessage().subscribe((message) => {
      if (message.type === 'TaskAdded') {
        this.handleTaskAddition((message.data as TaskAddData).task.id);
      } else if (message.type === 'ColumnAdded') {
        this.handleColumnAddition((message.data as ColumnAddData).column.id);
      } else {
        // Do nothing
      }
    });
  }

  addTask() {
    this.store.dispatch(new AddTask(this.selectedGroupId));
  }

  addColumn() {
    this.store.dispatch(new AddColumn(this.selectedGroupId));
  }

  handleTaskAddition(taskId: string) {
    this.tasks$.pipe(take(1)).subscribe((tasks) => {
      const task = tasks.find((t) => t.id === taskId);
      this.sharedMsgService.sendMessage({
        type: 'Task_Added',
        data: { groupId: task.groupId, task } as Task_AddData,
      });
    });
  }

  handleColumnAddition(columnId: string) {
    this.columns$.pipe(take(1)).subscribe((columns) => {
      const column = columns.find((t) => t.id === columnId);
      this.sharedMsgService.sendMessage({
        type: 'Column_Added',
        data: { groupId: column.groupId, column } as Column_AddData,
      });
    });
  }

  autoEvents() {
    // this.clearEvents();
    this.addTaskInt = setTimeout(() => {
      this.store.dispatch(new AddTask(this.selectedGroupId));
    }, 5000);
    this.removeTaskInt = setTimeout(() => {
      this.store.dispatch(
        new RemoveTask(
          this.tasks.find((t) => t.groupId === this.selectedGroupId).id
        )
      );
    }, 6000);
  }

  clearEvents() {
    if (this.addTaskInt) {
      clearInterval(this.addTaskInt);
    }
    if (this.addColumnInt) {
      clearInterval(this.addColumnInt);
    }
  }
}
