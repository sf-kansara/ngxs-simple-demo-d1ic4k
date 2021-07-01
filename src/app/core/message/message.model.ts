import { Column, Task } from '../state';

export type MessageType = 'TaskAdded' | 'ColumnAdded';

export interface MessageData {
  // Empty
}

export interface TaskAddData extends MessageData {
  task: Task;
}

export interface ColumnAddData extends MessageData {
  column: Column;
}

export class Message {
  type: MessageType;
  data: MessageData;
}
