import "./style.scss";
import { useEffect } from "react";

import useDimension from "../../hooks/useDimension";
import useDisclosure from "../../hooks/useDisclosure";

import { motion } from "framer-motion";
import NavbarItem from "../NavbarItem";
import { backIcon, burgerIcon } from "../../contants/icons";
import { universities } from "../../data/universities";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isMobile } = useDimension();

  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);

  return (
    <div className="navbar-container">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isOpen ? (isMobile ? "80vw" : "20vw") : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="navbar-overlay"
      >
        <div className="navbar-close-container">
          <motion.div
            initial={{ opacity: 0, display: "none" }}
            animate={{
              opacity: isOpen ? 1 : 0,
              display: isOpen ? "flex" : "none",
            }}
            onClick={onClose}
            className="navbar-close"
          >
            <img src={backIcon} />
          </motion.div>
        </div>
        <motion.div
          transition={{ duration: isOpen ? 0.9 : 0.1, delay: isOpen ? 0.2 : 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="navbar-items-container"
        >
          <motion.p>List of Universities</motion.p>
          <motion.div>
            {universities?.map((university, index) => (
              <NavbarItem
                key={index}
                isPanelActive={isOpen}
                closePanel={onClose}
                title={university.university}
                {...university}
              />
            ))}
          </motion.div>
        </motion.div>
        <div className="navbar-bottom-space" />
      </motion.div>
      <div className="navbar-right">
        <div className="navbar-toggle" onClick={onOpen}>
          <img src={burgerIcon} alt="" />
        </div>
        Blinko <span>( beta )</span>
      </div>
      <p className="navbar-version">v0.4</p>
    </div>
  );
};

export default Navbar;
