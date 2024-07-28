// src/components/TaskList.tsx
import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskContext } from "../../context/taskContext";

interface TaskListProps {
  setSelectedTaskId: (taskId: string | null) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ setSelectedTaskId }) => {
  const { state, dispatch } = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle) {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: Date.now().toString(),
          title: newTaskTitle,
          subtasks: [],
        },
      });
      setNewTaskTitle("");
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
    setSelectedTaskId(null); // Clear selected task if deleted
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(state.tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: "SET_TASKS", payload: items });
  };

  return (
    <div className="task-list">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {state.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleTaskClick(task.id)}
                      style={{
                        cursor: "pointer",
                        marginBottom: "8px",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {task.title}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
