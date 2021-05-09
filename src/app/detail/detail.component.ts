import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../core/models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input()
  task: Task;

  constructor() {}

  ngOnInit() {}
}
