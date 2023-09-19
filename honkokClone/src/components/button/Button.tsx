interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="m-20 bg-teal-400 text-indigo-600">
      {children}
    </button>
  );
};

export default Button;
