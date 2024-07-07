import "./style.scss";

const Header = ({ text, subText, renderAction }) => {
  return (
    <div className="header-container">
      <div>
        <h4>{text}</h4>
        <p>{subText}</p>
      </div>
      {renderAction && renderAction}
    </div>
  );
};

export default Header;
