export type MessageType = '' | '';

export interface MessageMeta {
  groupId: string;
}

export interface TaskAddMeta extends MessageMeta {
  taskId: string;
}

export interface TaskDeleteMeta extends MessageMeta {
  taskId: string;
}

export interface ColumnAddMeta extends MessageMeta {
  groupId: string;
}

export class Message {
  messageType: MessageType;
  messageMeta: MessageMeta;
}