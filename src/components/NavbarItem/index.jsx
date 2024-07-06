import "./style.scss";
import { useEffect } from "react";
import useDisclosure from "../../hooks/useDisclosure";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NavbarItem = ({ title, isPanelActive, courses, logo, closePanel }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();
  // default expand for ktu
  useEffect(() => {
    if (!title) {
      return;
    }
    if (title === "KTU") {
      onOpen();
    }
  }, [isPanelActive]);

  // close all
  useEffect(() => {
    if (!isPanelActive) {
      onClose();
    }
  }, [isPanelActive]);

  // navlink hander

  const handleNavigate = (course) => {
    closePanel();
    navigate("/streams", {
      state: {
        course,
      },
      replace: true,
    });
  };

  return (
    <div className="navbar-item-container">
      <motion.div
        animate={{
          backgroundColor: isOpen ? "#222329" : "#ffffff00",
          opacity: isPanelActive ? 1 : 0,
        }}
        className="navbar-item-title"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        <img src={logo} />
        <p>{title}</p>
      </motion.div>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="navbar-items-child-container"
      >
        {courses?.map((item, index) => (
          <motion.div
            className="navbar-item-child"
            onClick={() => handleNavigate(item?.course)}
            key={index}
          >
            <motion.p
              animate={{ opacity: isOpen ? 0.7 : 0 }}
              whileHover={{ opacity: 1 }}
            >
              {item?.course}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NavbarItem;
