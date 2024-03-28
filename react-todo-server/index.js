import express from 'express';
import fs from 'fs/promises';
import cors from 'cors'; // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes


const todosFilePath = 'todos.json';

let todos = [];

async function loadTodosFromFile() {
    try {
        const data = await fs.readFile(todosFilePath, 'utf8');
        todos = JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(todosFilePath, '[]');
            todos = [];
        } else {
            console.error('Error reading todos file:', error);
        }
    }
}


loadTodosFromFile();

async function saveTodosToFile() {
    try {
        await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2));
    } catch (error) {
        console.error('Error writing todos file:', error);
    }
}

app.get('/api/todos', (req, res) => {
    console.log('Received GET request to /api/todos');
    return res.send("JSON.parse(JSON.stringify(todos))");
});

app.post('/api/todos', (req, res) => {
    console.log('Received POST request to /api/todos');
    const { name, checked } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Task name is required' });
    }
    const newTodo = { id: todos.length + 1, name, checked };
    todos.push(newTodo);
    console.log('Added new todo:', newTodo);
    saveTodosToFile()
        .then(() => res.status(201).json(newTodo))
        .catch((error) => {
            console.error('Error saving todos to file:', error);
            res.status(500).json({ error: 'Failed to save todo' });
        });
});



app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    saveTodosToFile()
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.error('Error saving todos to file:', error);
            res.status(500).json({ error: 'Failed to delete todo' });
        });
});

app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.task = task;
    saveTodosToFile()
        .then(() => res.json(todo))
        .catch((error) => {
            console.error('Error saving todos to file:', error);
            res.status(500).json({ error: 'Failed to update todo' });
        });
});

app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
});
