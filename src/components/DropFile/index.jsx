import { useEffect } from "react";
import fileUploadIcon from "../../assets/upload/file-upload.png";
import fileIcon from "../../assets/upload/file.png";
import removeIcon from "../../assets/remove/trash.png";
import "./style.scss";

const DropFile = ({ file, setFile }) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const removeFileHandler = () => {
    setFile(null);
  };
  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className={`dropfile-container ${file && "active"}`}>
      {file ? (
        <>
          <div onClick={removeFileHandler} className="dropfile-remove">
            <img className="dropfile-remove-icon" src={removeIcon} alt="" />
          </div>
          <img className="dropfile-upload-icon" src={fileIcon} alt="" />
          <p>{file?.name}</p>
          <p>Size : {(file?.size / 1024).toFixed(2).toString()}KB</p>
        </>
      ) : (
        <>
          <img className="dropfile-upload-icon" src={fileUploadIcon} alt="" />
          <p>
            Drag & Drop or <span>Choose file</span> to upload
          </p>
          <p>Maximum size : 25MB</p>
          <input
            accept="application/pdf"
            type="file"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default DropFile;
