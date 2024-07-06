import { useEffect } from "react";
import useDisclosure from "../../hooks/useDisclosure";
import { motion } from "framer-motion";
import "./style.scss";
import { ktuLogo } from "../../contants/logos";

const NavbarItem = ({ title, isPanelActive, courses, logo }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  // default expand for ktu
  useEffect(() => {
    if (!title) {
      return;
    }
    if (title === "KTU") {
      onOpen();
    }
  }, [isPanelActive]);

  useEffect(() => {
    if (!isPanelActive) {
      onClose();
    }
  }, [isPanelActive]);

  return (
    <motion.div className="navbar-item-container">
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
        {courses?.map((item) => (
          <motion.div className="navbar-item-child">
            <motion.p
              animate={{ opacity: isOpen ? 0.7 : 0 }}
              whileHover={{ opacity: 1 }}
            >
              {item?.subject}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NavbarItem;
