import "./style.scss";

import useDimension from "../../hooks/useDimension";
import useDisclosure from "../../hooks/useDisclosure";

import { motion } from "framer-motion";
import NavbarItem from "../NavbarItem";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { width } = useDimension();

  return (
    <div className="navbar-container">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isOpen ? "20vw" : 0,
          opacity: isOpen ? 1 : 0,
          userSelect: "none",
        }}
        className="navbar-overlay"
      >
        <button onClick={onClose}>close</button>
        <div className="navbar-items-container">
          <h4>List of Universities</h4>
          <NavbarItem title="KTU" />
          <NavbarItem title="Calicut" />
          <NavbarItem title="MG" />
        </div>
      </motion.div>
      <p className="navbar-right">
        <div className="navbar-toggle" onClick={onOpen} />
        Blinko <span>( beta )</span>
      </p>
      <p className="navbar-version">v0.3</p>
    </div>
  );
};

export default Navbar;
