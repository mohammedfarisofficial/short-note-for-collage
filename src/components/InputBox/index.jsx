import "./style.scss";
const InputBox = ({
  size = "full",
  label = "label",
  placeholder = "placeholder",
  error = "",
  value,
  setValue,
  extention = "",
  ...props
}) => {
  return (
    <div className="input-container">
      <p className="input-label">{label}</p>
      {/* <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: size === "half" ? "50%" : "100%" }}
        placeholder={placeholder}
        {...props}
      /> */}
      <div className="input-wrapper">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: size === "half" ? "50%" : "100%" }}
          placeholder={placeholder}
          {...props}
        />
        <div className="input-extension">
          <p>{extention}</p>
        </div>
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

export default InputBox;
