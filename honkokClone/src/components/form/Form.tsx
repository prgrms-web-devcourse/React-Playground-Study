import Button from '../button/Button';

const Form = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('제출!!');
      }}
    >
      <input className="border-2" data-testid="email" type="email" />
      <input className="border-2" data-testid="password" type="password" />

      <button data-testid="button">제출</button>
    </form>
  );
};

export default Form;
