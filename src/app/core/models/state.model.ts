import { Board } from './board.model';
import { Task } from './task.model';

export interface IBoardState {
  board: Board;
  tasks: Task[];
}
