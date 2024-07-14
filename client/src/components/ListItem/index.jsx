import "./style.scss";
const ListItem = ({ name, path, ...props }) => {
  return (
    <div {...props} className="list-container">
      <h3>{name}</h3>
    </div>
  );
};

export default ListItem;
