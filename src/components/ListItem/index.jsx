import "./style.scss";
import { Link } from "react-router-dom";
const ListItem = ({ stream }) => {
  return (
    <Link className="list-container">
      <h3>{stream}</h3>
    </Link>
  );
};

export default ListItem;
