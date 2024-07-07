import "./style.scss";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className="button-container">
      {children}
    </button>
  );
};

export default Button;
