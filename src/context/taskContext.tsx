import React, { createContext, useReducer, ReactNode } from "react";

interface TaskState {
  tasks: Task[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: TaskState = {
  tasks: [],
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
