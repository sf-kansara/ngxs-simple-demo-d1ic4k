export class AddTask {
  static readonly type = '[Board] Add Task';
}

export class RemoveTask {
  static readonly type = '[Board] Remove Task';

  constructor(public id: string) {}
}
