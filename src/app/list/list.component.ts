import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task, Column, Group } from '../core';
import { Column_AddData, Task_AddData } from '../models';
import { SharedMessageService } from '../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input()
  group: Group;
  @Input()
  tasks: Task[];
  @Input()
  columns: Column[];

  taskCount = 0;

  destroy$ = new Subject<void>();

  constructor(private readonly sharedMsgService: SharedMessageService) {}

  ngOnInit() {
    this.taskCount = this.tasks.length;
    this.listenMessage();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  listenMessage() {
    this.sharedMsgService.getMessage().subscribe((message) => {
      if (message.data.groupId === this.group.id) {
        if (message.type === 'Task_Added') {
          this.taskCount++;
          this.tasks.push((message.data as Task_AddData).task);
        } else if (message.type === 'Column_Added') {
          this.columns.push((message.data as Column_AddData).column);
          // Do nothing
        } else {
          // Do nothing
        }
      }
    });
  }
}
