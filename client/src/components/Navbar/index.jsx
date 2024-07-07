import "./style.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useDimension from "../../hooks/useDimension";
import useDisclosure from "../../hooks/useDisclosure";

import NavbarItem from "../NavbarItem";

import { universities } from "../../data/universities";
import { backIcon, burgerIcon } from "../../contants/icons";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isMobile } = useDimension();
  const navigate = useNavigate(0);

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
        <p onClick={() => navigate("/")}>
          Blinko <span>( beta )</span>
        </p>
      </div>
      <p className="navbar-version">v0.4</p>
    </div>
  );
};

export default Navbar;
