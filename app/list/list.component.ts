import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Subject } from 'rxjs';
import { BoardState } from '../core/board.state';
import { Task } from '../core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Select(BoardState.tasks)
  tasks$: Task[];

  destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit() {
    console.log(this.tasks$);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
