import React, { useState } from "react";
import jsPDF from "jspdf";
import { PDFDocument, rgb } from "pdf-lib";
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

  // const generatePDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "p",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   const gridWidth = pageWidth / 3;
  //   const gridHeight = pageHeight / 3;
  //   let pageCount = 1;

  //   bits.forEach((bit, index) => {
  //     const col = index % 3;
  //     const row = Math.floor(index / 3);
  //     const xPosition = col * gridWidth;
  //     const yPosition = row * gridHeight;

  //     doc.setFontSize(12);
  //     doc.text(bit.title, xPosition + 10, yPosition + 10);
  //     doc.setFontSize(10);
  //     doc.text(bit.content, xPosition + 10, yPosition + 20, {
  //       maxWidth: gridWidth - 20,
  //     });

  //     // Draw grid lines for each grid item
  //     doc.setDrawColor(0); // Set color to black
  //     doc.setLineWidth(0.1); // Set line width
  //     doc.rect(xPosition, yPosition, gridWidth, gridHeight);

  //     if ((index + 1) % 9 === 0 && index !== 0) {
  //       // Add a new page after every 9 grid items
  //       doc.addPage();
  //       pageCount++;

  //       // Redraw grid lines for the new page
  //       for (let i = 0; i < 3; i++) {
  //         for (let j = 0; j < 3; j++) {
  //           const newX = j * gridWidth;
  //           const newY = i * gridHeight;
  //           doc.rect(newX, newY, gridWidth, gridHeight);
  //         }
  //       }
  //     }
  //   });

  //   // Save the PDF with a meaningful name
  //   doc.save(`bits_${pageCount}.pdf`);
  // };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const gridWidth = pageWidth / 3;
    const gridHeight = pageHeight / 3;
    let pageCount = 1;

    bits.forEach((bit, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const xPosition = col * gridWidth;
      const yPosition = row * gridHeight;

      // Adjust font size dynamically based on content length
      let fontSize = calculateFontSize(
        bit.content,
        gridWidth - 20,
        gridHeight - 30
      );
      doc.setFontSize(fontSize);

      // Split text into lines that fit within the grid cell
      const lines = doc.splitTextToSize(bit.content, gridWidth - 20);

      // Calculate total height required for the lines
      const totalHeight =
        (lines.length * fontSize * doc.getLineHeight()) /
        doc.internal.scaleFactor;

      // Adjust yPosition to center vertically if content height is less than gridHeight
      const remainingHeight = gridHeight - totalHeight;
      const startY = yPosition + remainingHeight / 2;

      // Output each line of text
      lines.forEach((line, lineIndex) => {
        doc.text(
          line,
          xPosition + 10,
          startY +
            (lineIndex * fontSize * doc.getLineHeight()) /
              doc.internal.scaleFactor
        );
      });

      // Draw grid lines for each grid item
      doc.setDrawColor(0);
      doc.setLineWidth(0.1);
      doc.rect(xPosition, yPosition, gridWidth, gridHeight);

      if ((index + 1) % 9 === 0 && index !== 0) {
        // Add a new page after every 9 grid items
        doc.addPage();
        pageCount++;
      }
    });

    doc.save(`bits_${pageCount}.pdf`);
  };

  // Function to calculate font size based on content length and grid cell dimensions
  const calculateFontSize = (content, maxWidth, maxHeight) => {
    const doc = new jsPDF();
    let fontSize = 10;
    let lines = doc.splitTextToSize(content, maxWidth);

    // Calculate required height for the text
    const totalHeight =
      (lines.length * fontSize * doc.getLineHeight()) /
      doc.internal.scaleFactor;

    // Increase font size until text fits within maxHeight
    while (totalHeight > maxHeight) {
      fontSize--;
      const lines = doc.splitTextToSize(content, maxWidth);
      totalHeight =
        (lines.length * fontSize * doc.getLineHeight()) /
        doc.internal.scaleFactor;
    }

    return fontSize;
  };
  // const convertPdfToGrid = async () => {
  //   if (pdfFile) {
  //     const arrayBuffer = await pdfFile.arrayBuffer();
  //     const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  //     const pdf = await loadingTask.promise;
  //     const numPages = pdf.numPages;
  //     const gridSize = 9;
  //     const newBits = [];

  //     for (let i = 0; i < numPages; i += gridSize) {
  //       const gridPages = [];
  //       for (let j = i; j < i + gridSize; j++) {
  //         if (j < numPages) {
  //           const page = await pdf.getPage(j + 1);
  //           const textContent = await page.getTextContent();
  //           const text = textContent.items.map((item) => item.str).join("");
  //           gridPages.push(text);
  //         }
  //       }

  //       for (let k = 0; k < gridSize; k++) {
  //         newBits.push({
  //           title: `Page ${i + k + 1}`,
  //           content: gridPages[k] || "",
  //         });
  //       }
  //     }

  //     setBits(newBits);
  //   }
  // };
  const convertPdfToGrid = async () => {
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
      const scale = Math.min(gridWidth / viewport.width, gridHeight / viewport.height);

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

      doc.addImage(imageData, "JPEG", xPosition, yPosition, gridWidth, gridHeight);

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
    <div>
      <h1>Create Your Bits</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <button type="button" onClick={convertPdfToGrid}>
            Convert PDF to 9-Grid Format
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
        <button type="button" onClick={generatePDF}>
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default App;
