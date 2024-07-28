// src/components/SubTaskList.tsx
import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/taskContext";

interface SubTaskListProps {
  taskId: string;
}

export const SubTaskList: React.FC<SubTaskListProps> = ({ taskId }) => {
  const { state, dispatch } = useContext(TaskContext);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");

  const task = state.tasks.find((task) => task.id === taskId);

  if (!task) return null;

  const handleAddSubTask = () => {
    if (newSubTaskTitle) {
      const updatedTask = {
        ...task,
        subtasks: [
          ...task.subtasks,
          { id: Date.now().toString(), title: newSubTaskTitle, subtasks: [] },
        ],
      };
      dispatch({ type: "EDIT_TASK", payload: updatedTask });
      setNewSubTaskTitle("");
    }
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    const updatedTask = {
      ...task,
      subtasks: task.subtasks.filter((subtask) => subtask.id !== subTaskId),
    };
    dispatch({ type: "EDIT_TASK", payload: updatedTask });
  };

  return (
    <div className="subtask-list">
      <h3>{task.title}</h3>
      <input
        type="text"
        value={newSubTaskTitle}
        onChange={(e) => setNewSubTaskTitle(e.target.value)}
        placeholder="Add new subtask"
      />
      <button onClick={handleAddSubTask}>Add SubTask</button>
      <ul>
        {task.subtasks.map((subtask) => (
          <li key={subtask.id}>
            {subtask.title}
            <button onClick={() => handleDeleteSubTask(subtask.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
