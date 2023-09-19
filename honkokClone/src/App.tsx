/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useToast } from './components/toast/ToastProvider';

const App = (): JSX.Element => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)
  });

  const { addToast } = useToast();

  return (
    <div>
      <div>
        <h2 className="text-teal-500">토스트 만들기</h2>
        <button onClick={() => addToast({ content: '토스트입니다.' })}>
          토스트 추가
        </button>
      </div>

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
