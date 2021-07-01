import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task, Column } from '../core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  tasks: Task[];
  @Input()
  columns: Column[];

  destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
  }
}
