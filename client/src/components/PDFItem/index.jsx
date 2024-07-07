import "./style.scss";
import { useNavigate } from "react-router-dom";
import useDimension from "../../hooks/useDimension";
import { pdfIcon } from "../../contants/icons";
import { truncateString } from "../../utils/string/truncateString";

const PDFItem = () => {
  const { isMobile } = useDimension();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/notes/123");
  };
  const pdfName = "namfkjadsflkasdjf.pdf";
  return (
    <div
      onClick={handleNavigate}
      className={`pdfitem-container ${isMobile && "is-mobile"}`}
    >
      <div className="pdfitem-body">
        <img src={pdfIcon} alt="" />
      </div>
      <div className={`pdfitem-info ${isMobile && "pdfitem-info-mobile"}`}>
        <img src={pdfIcon} alt="" />
        <div>
          <p>{truncateString(pdfName, 30)}</p>
        </div>
      </div>
    </div>
  );
};

export default PDFItem;
