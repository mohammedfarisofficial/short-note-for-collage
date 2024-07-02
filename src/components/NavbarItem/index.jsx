import useDisclosure from "../../hooks/useDisclosure";
import { motion } from "framer-motion";
import "./style.scss";

const NavbarItem = ({ title }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const children = [
    { id: "01", title: "sub " },
    { id: "01", title: "sub 1" },
    { id: "01", title: "sub 1" },
    { id: "01", title: "sub 1" },
  ];
  return (
    <motion.div
      animate={{ backgroundColor: isOpen ? "#0000ff25" : "transparent" }}
      className="navbar-item-container"
      onClick={() => (isOpen ? onClose() : onOpen())}
    >
      <motion.div
        animate={{ backgroundColor: isOpen ? "#892eff" : "transparent" }}
        className="navbar-item-title"
      >
        {title}
      </motion.div>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="navbar-items-child-container"
      >
        {children?.map((item) => (
          <motion.div className="navbar-item-child">
            <motion.p
              animate={{ opacity: isOpen ? 1 : 0 }}
              whileHover={{ color: "#892eff" }}
            >
              {item.title}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NavbarItem;
