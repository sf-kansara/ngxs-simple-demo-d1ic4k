import { Action, NgxsOnInit, Selector, State, Store } from '@ngxs/store';
import { AddTask, RemoveTask } from './board.action';
import { uuid } from '../util';
import { IBoardState } from './models';

const defaults: IBoardState = {
  board: {
    id: uuid(),
    name: `Board - ${new Date().getTime()}`
  },
  tasks: [
    {
      id: uuid(),
      name: `Task - ${new Date().getTime()}`
    }
  ]
};

@State({
  name: 'BoardState',
  defaults: defaults
})
export class BoardState implements NgxsOnInit {
  constructor(private store: Store) {}

  ngxsOnInit() {
    console.log(this.store.snapshot());
  }

  @Selector()
  static tasks(state: IBoardState) {
    return state.tasks;
  }

  @Action(AddTask)
  addTask({ getState, patchState }) {
    const state: IBoardState = getState();

    patchState({
      tasks: [
        ...state.tasks,
        {
          id: uuid(),
          name: `Task - ${new Date().getTime()}`
        }
      ]
    });
  }

  @Action(RemoveTask)
  switchStatus({ getState, patchState }, { id }: RemoveTask) {
    const state: IBoardState = getState();
    const index = state.tasks.findIndex(task => task.id === id);
    if (index < 0) return;

    const tasks = [...state.tasks];
    tasks.splice(1, index);
    patchState({ tasks });
  }
}
