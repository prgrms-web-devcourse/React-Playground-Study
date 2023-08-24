import express from 'express';
import { getTodoItems } from './components.js';
import fs from 'fs';
const app = express();

const todos = [
  {
    id: 1,
    title: 'todo 1',
    content: 'todo 1',
  },
  {
    id: 2,
    title: 'todo 2',
    content: 'todo 2',
  },
  {
    id: 3,
    title: 'todo 3',
    content: 'todo 3',
  },
];

app.get('/components.js', (request, response) => {
  response.setHeader('Content-Type', 'text/javascript');
  response.send(fs.readFileSync('./components.js', 'UTF-8'));
});

app.get('/', (request, response) => {
  response.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      ${getTodoItems(todos)}
    </div>
    
    <script type="module">
      import { getTodoItems } from './components.js';
      const todos = ${JSON.stringify(todos)};
      console.log('CSR part');
      const appEl = document.querySelector('#app');
      appEl.innerHTML = getTodoItems(todos);
      const todoEl = document.querySelector('.todoItem');

      todoEl.addEventListener('click', (e) => {
        alert('click');
      });
    </script>
  </body>
  </html>`);
});

app.listen(3000);
