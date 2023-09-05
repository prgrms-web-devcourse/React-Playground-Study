import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const App = (): JSX.Element => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)
  });

  return (
    <div>
      <Link to="/detail">detail</Link>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'An error has occurred: ' + error
      ) : (
        <div>
          {data.map((todo: { id: number; title: string }) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
