import { Action, NgxsOnInit, Selector, State, Store } from '@ngxs/store';
import { AddColumn, AddTask, RemoveColumn, RemoveTask } from './board.action';
import { uuid } from '../../util';
import { Board, Column, Group, IBoardState, Task } from './models';
import { Injectable } from '@angular/core';

const board: Board = {
  id: uuid(),
  name: `Board - ${new Date().getTime()}`,
};

const groups: Group[] = [
  {
    id: uuid(),
    boardId: board.id,
    name: `Group - 1`,
  },
  {
    id: uuid(),
    boardId: board.id,
    name: `Group - 2`,
  },
];

const columns: Column[] = [
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[0].id,
    name: `Column - 1`,
  },
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[0].id,
    name: `Column - 2`,
  },
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[1].id,
    name: `Column - 3`,
  },
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[1].id,
    name: `Column - 4`,
  },
];

const tasks: Task[] = [
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[0].id,
    name: `Task - 1`,
    fieldValues: {
      [columns[0].id]: `Task - 1 | ${columns[0].name}`,
      [columns[1].id]: `Task - 1 | ${columns[1].name}`,
    }
  },
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[0].id,
    name: `Task - 2`,
    fieldValues: {
      [columns[0].id]: `Task - 2 | ${columns[0].name}`,
      [columns[1].id]: `Task - 2 | ${columns[1].name}`,
    }
  },
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[1].id,
    name: `Task - 3`,
    fieldValues: {
      [columns[2].id]: `Task - 3 | ${columns[2].name}`,
      [columns[3].id]: `Task - 3 | ${columns[3].name}`,
    }
  },
  {
    id: uuid(),
    boardId: board.id,
    groupId: groups[1].id,
    name: `Task - 4`,
    fieldValues: {
      [columns[2].id]: `Task - 4 | ${columns[2].name}`,
      [columns[3].id]: `Task - 4 | ${columns[3].name}`,
    }
  },
];

const defaults: IBoardState = {
  board,
  tasks,
  groups,
  columns,
  colCounter: columns.length,
  taskCounter: 0,
};

@Injectable()
@State({
  name: 'BoardState',
  defaults: defaults,
})
export class BoardState implements NgxsOnInit {
  constructor(private store: Store) {}

  ngxsOnInit() {}

  @Selector()
  static tasks(state: IBoardState) {
    return state.tasks;
  }

  @Selector()
  static groups(state: IBoardState) {
    return state.groups;
  }

  @Selector()
  static columns(state: IBoardState) {
    return state.columns;
  }

  @Action(AddTask)
  addTask({ getState, patchState }, { groupId }: AddTask) {
    const state: IBoardState = getState();
    const sCols = [...state.columns.filter((col) => col.groupId === groupId)];
    const sTasks = [...state.tasks];
    const task: Task = {
      boardId: state.board.id,
      groupId,
      id: uuid(),
      name: `Tasks - ${state.taskCounter + 1}`,
      fieldValues: {},
    };
    for (const c of sCols) {
      task.fieldValues[c.id] = `${task.name} | ${c.name}`;
    }
    sTasks.push(task);
    patchState({
      tasks: sTasks,
      taskCounter: state.taskCounter + 1,
    });
  }

  @Action(RemoveTask)
  removeTask({ getState, patchState }, { id }: RemoveTask) {
    const state: IBoardState = getState();
    const index = state.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;

    const sTasks = [...state.tasks];
    sTasks.splice(index, 1);
    patchState({ tasks: sTasks });
  }

  @Action(RemoveColumn)
  removeColumn({ getState, patchState }, { id }: RemoveColumn) {
    const state: IBoardState = getState();
    const index = state.columns.findIndex((col) => col.id === id);
    if (index < 0) return;

    const sCols = [...state.columns];
    const sGroup = state.groups.find((g) => g.id === sCols[index].groupId);
    const sTasks = [...state.tasks];
    for (const t of sTasks) {
      if(sTasks[index].groupId === sGroup.id) {
        delete t.fieldValues[sCols[index].id];
      }
    }
    sCols.splice(index, 1);
    patchState({
      columns: sCols,
      tasks: sTasks,
    });
  }

  @Action(AddColumn)
  addColumn({ getState, patchState }, { groupId }: AddColumn) {
    const state: IBoardState = getState();
    const sCols = [...state.columns];
    const sTasks = [...state.tasks];
    const column: Column = {
      boardId: state.board.id,
      groupId,
      id: uuid(),
      name: `Columns - ${state.colCounter + 1}`,
    };
    for (const t of sTasks) {
      if (t.groupId === groupId) {
        t.fieldValues[column.id] = `${t.name} | ${column.name}`;
      }
    }
    sCols.push(column);
    patchState({
      colCounter: state.colCounter + 1,
      columns: sCols,
      tasks: sTasks,
    });
  }
}
