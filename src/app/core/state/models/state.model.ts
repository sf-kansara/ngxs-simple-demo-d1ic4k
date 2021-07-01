import { Board } from './board.model';
import { Column } from './column.model';
import { Group } from './group.model';
import { Task } from './task.model';

export interface IBoardState {
  board: Board;
  tasks: Task[];
  groups: Group[];
  columns: Column[];
  colCounter: number;
  taskCounter: number;
}
