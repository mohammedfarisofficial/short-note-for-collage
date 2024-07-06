import "./style.scss";

const Header = ({ text, subText }) => {
  return (
    <div className="header-container">
      <h4>{text}</h4>
      <p>{subText}</p>
    </div>
  );
};

export default Header;
