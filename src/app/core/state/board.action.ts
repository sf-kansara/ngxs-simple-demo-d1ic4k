// Column

export class AddColumn {
  static readonly type = '[Board] Add Column';

  constructor(public groupId: string) {}
}

export class RemoveColumn {
  static readonly type = '[Board] Remove Column';

  constructor(public id: string) {}
}

// Column

// Task

export class AddTask {
  static readonly type = '[Board] Add Task';

  constructor(public groupId: string) {}
}

export class RemoveTask {
  static readonly type = '[Board] Remove Task';

  constructor(public id: string) {}
}

// Task
