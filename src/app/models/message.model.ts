import { Column, Task } from '../core';

export type MessageType = 'Task_Added' | 'Column_Added';

export interface Message_Data {
  groupId: string;
}

export interface Task_AddData extends Message_Data {
  task: Task;
}

export interface Column_AddData extends Message_Data {
  column: Column;
}

export class Message {
  type: MessageType;
  data: Message_Data;
}
