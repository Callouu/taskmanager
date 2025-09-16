import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [] // chaque tâche : { id, title, description, columnId }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, ...changes } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) Object.assign(task, changes);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    }
  }
});

export const { addTask, removeTask, updateTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
