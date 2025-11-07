const express = require('express');
const Task = require('../models/models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const docs = await Task.find().exec();
        return res.json(docs);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        const doc = await task.save();
        return res.status(201).json(doc);
    } catch (err) {
        console.error('Error creating task:', err);
        return res.status(500).json({ error: 'Failed to create task' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const doc = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!doc) return res.status(404).json({ error: 'Task not found' });
        return res.json(doc);
    } catch (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Failed to update task' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const doc = await Task.findByIdAndDelete(req.params.id).exec();
        if (!doc) return res.status(404).json({ error: 'Task not found' });
        return res.json(doc);
    } catch (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Additional helper route to list all tasks (useful for verification)
router.get('/all', async (req, res) => {
    try {
        const tasks = await Task.find().exec();
        console.log(`Returned ${tasks.length} tasks`);
        return res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

module.exports = router;