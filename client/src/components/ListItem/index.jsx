import "./style.scss";
import { Link } from "react-router-dom";
const ListItem = ({ title, path }) => {
  return (
    <Link to={path} className="list-container">
      <h3>{title}</h3>
    </Link>
  );
};

export default ListItem;
