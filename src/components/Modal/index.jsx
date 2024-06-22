// src/components/Modal.js
import React from "react";
import "./style.scss";

const Modal = ({ children, footer = <></>, isOpen, onClose }) => {
  return (
    <div className={`modal-overlay ${isOpen ? "modal-show" : "modal-hide"}`}>
      <div className="modal-content">
        <div className="modal-body">{children}</div>
        {footer}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

const Header = ({ children }) => {
  return <div className="modal-header">{children}</div>;
};

const Body = ({ children }) => {
  return <div className="modal-body-content">{children}</div>;
};

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
