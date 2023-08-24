export const getTodoItems = (todos) => {
  console.log('component');
  return `<div>hihihi</div>
    <ul>
    ${todos.map((todo) => `<li class="todoItem">${todo.title}</li>`).join('')}
    </ul>`;
};
