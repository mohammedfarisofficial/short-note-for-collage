import { useState, useEffect } from "react";
// comp
import Modal from "../Modal";
import Button from "../Button";
import InputBox from "../InputBox";

const SaveAs = ({
  isOpen = true,
  onClose = () => {},
  deleteButtonLabel,
  onDeleteItem,
  itemBody,
  errorText,
  title = "Create Project",
  icon,
  isDeleting = false,
  actionButtonLabel,
  doc = null,
}) => {
  const brandName = "blinko";
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  const saveAsHandler = () => {
    if (fileName.length > 3) {
      doc.save(`${fileName}-${brandName}.pdf`);
      setFileName("");
      onClose();
    } else {
      alert("filename must be more than 3 characters!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2>{title}</h2>
      </Modal.Header>
      <Modal.Body>
        <InputBox
          value={fileName}
          label="Rename ( without .pdf )"
          placeholder="eg: note"
          setValue={setFileName}
          extention=".pdf"
        />
      </Modal.Body>
      <div className="model-footer">
        <Button variant="cancel" onClick={onClose}>
          {deleteButtonLabel}
        </Button>
        <Button
          variant="primary"
          label={actionButtonLabel}
          onClick={saveAsHandler}
        >
          {actionButtonLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default SaveAs;
