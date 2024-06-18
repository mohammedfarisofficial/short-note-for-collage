import React, { useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

// Configure the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const App = () => {
  const [bits, setBits] = useState([{ title: "", content: "" }]); // Initial state with one grid item
  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (index, event) => {
    const newBits = [...bits];
    newBits[index] = {
      ...newBits[index],
      [event.target.name]: event.target.value,
    };
    setBits(newBits);
  };

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const generatePDF = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let pageCount = 1;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const pageWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const gridWidth = pageWidth / 3; // Width of each grid cell
      const gridHeight = pageHeight / 3; // Height of each grid cell

      // Scale content to fit within each grid cell
      const viewport = page.getViewport({ scale: 0.1 }); // Increase scale for higher quality
      const scale = Math.min(
        gridWidth / viewport.width,
        gridHeight / viewport.height
      );

      const scaledViewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;

      const imageData = canvas.toDataURL("image/jpeg", 1.0); // Convert canvas to JPEG image

      const col = (pageCount - 1) % 3; // Column index (0-2)
      const row = Math.floor((pageCount - 1) / 3); // Row index (0-2)
      const xPosition = col * gridWidth;
      const yPosition = row * gridHeight;

      doc.addImage(
        imageData,
        "JPEG",
        xPosition,
        yPosition,
        gridWidth,
        gridHeight
      );

      // Add page number in bottom-right corner
      doc.setFontSize(8);
      doc.text(
        pageNumber.toString(),
        xPosition + gridWidth - 10,
        yPosition + gridHeight - 5,
        { align: "right" }
      );

      if (pageCount % 9 === 0 && pageCount !== 0) {
        // Add a new page after every 9 grid items
        doc.addPage();
        pageCount = 0; // Reset pageCount to start a new page
      }

      pageCount++;
    }

    doc.save("gridPDF.pdf");
  };

  const addGrid = () => {
    setBits([...bits, { title: "", content: "" }]); // Add a new grid item with empty title and content
  };

  return (
    <div className="container">
      <h1>Create Your Bits</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <button type="button" onClick={generatePDF}>
            Generate Grid PDF
          </button>
        </div>
        {bits.map((bit, index) => (
          <div key={index} className="bit">
            <h3>Bit {index + 1}</h3>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={bit.title}
                onChange={(e) => handleChange(index, e)}
              />
            </label>
            <label>
              Content:
              <textarea
                name="content"
                value={bit.content}
                onChange={(e) => handleChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addGrid}>
          Add Grid
        </button>
      </form>
    </div>
  );
};

export default App;
