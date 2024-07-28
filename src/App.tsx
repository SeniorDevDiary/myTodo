import { useState } from "react";

import { TaskProvider } from "./context/taskContext";
import { TaskList } from "./components/tasks/TaskList";
import { SubTaskList } from "./components/tasks/SubTaskList";

export const App = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <TaskProvider>
      <div className="app">
        <div className="task-list-container">
          <TaskList setSelectedTaskId={setSelectedTaskId} />
        </div>
        <div className="subtask-list-container">
          {selectedTaskId ? (
            <SubTaskList taskId={selectedTaskId} />
          ) : (
            <div>Select a task to view subtasks</div>
          )}
        </div>
      </div>
    </TaskProvider>
  );
};
