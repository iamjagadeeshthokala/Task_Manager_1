
import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, MenuItem, Typography, List, ListItem, IconButton, Chip, Collapse
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['To Do', 'In Progress', 'Completed'];

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do'
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const getPriorityColor = (priority) => {
    return {
      High: 'error',
      Medium: 'warning',
      Low: 'success'
    }[priority];
  };

  const getStatusColor = (status) => {
    return {
      'To Do': 'default',
      'In Progress': 'primary',
      Completed: 'success'
    }[status];
  };

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setTaskForm({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
    setEditingTaskId(null);
  };

  const handleAddOrUpdate = () => {
    const { title, dueDate } = taskForm;
    if (!title || !dueDate) {
      alert('Title and Due Date are required.');
      return;
    }

    if (new Date(dueDate) < new Date()) {
      alert('Due date cannot be in the past.');
      return;
    }

    if (editingTaskId !== null) {
      const updated = tasks.map(task =>
        task.id === editingTaskId ? { ...task, ...taskForm } : task
      );
      setTasks(updated);
    } else {
      const newTask = {
        ...taskForm,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
    }

    resetForm();
  };

  const handleEdit = (task) => {
    setTaskForm(task);
    setEditingTaskId(task.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      const updated = tasks.filter(task => task.id !== id);
      setTasks(updated);
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Typography variant="h5" gutterBottom>Task Manager</Typography>

      <TextField
        fullWidth label="Title" name="title"
        value={taskForm.title} onChange={handleChange}
        margin="normal" required
      />
      <TextField
        fullWidth multiline rows={2} label="Description" name="description"
        value={taskForm.description} onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth type="date" name="dueDate"
        value={taskForm.dueDate} onChange={handleChange}
        margin="normal" InputLabelProps={{ shrink: true }} label="Due Date"
      />
      <TextField
        select fullWidth label="Priority" name="priority"
        value={taskForm.priority} onChange={handleChange}
        margin="normal"
      >
        {priorities.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>
      <TextField
        select fullWidth label="Status" name="status"
        value={taskForm.status} onChange={handleChange}
        margin="normal"
      >
        {statuses.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>
      <Button fullWidth variant="contained" onClick={handleAddOrUpdate}>
        {editingTaskId !== null ? 'Update Task' : 'Add Task'}
      </Button>

      <Box mt={4}>
        <Typography variant="h6">Tasks</Typography>
        <List>
          {tasks.map(task => (
            <ListItem
              key={task.id}
              sx={{ border: '1px solid #ccc', mb: 1, borderRadius: 1 }}
              secondaryAction={
                <>
                  <IconButton onClick={() => handleEdit(task)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(task.id)}><Delete /></IconButton>
                </>
              }
              onClick={() => handleToggleExpand(task.id)}
            >
              <Box width="100%">
                <Typography variant="subtitle1">{task.title}</Typography>
                <Chip size="small" label={task.status} color={getStatusColor(task.status)} />
                <Chip
                  size="small"
                  label={task.priority}
                  sx={{ ml: 1 }}
                  color={getPriorityColor(task.priority)}
                />
                <Typography variant="body2">Due: {task.dueDate}</Typography>
                <Collapse in={expandedTaskId === task.id}>
                  <Typography variant="body2" mt={1}><strong>Description:</strong> {task.description}</Typography>
                  <Typography variant="caption">Created: {new Date(task.createdAt).toLocaleString()}</Typography>
                </Collapse>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TaskManager;
