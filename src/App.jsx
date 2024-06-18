import React, { useState } from "react";
import jsPDF from "jspdf";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import "./App.css";

// Configure the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const App = () => {
  const [bits, setBits] = useState([{ title: "", content: "" }]); // Initial state with one grid item
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(""); // State to track progress

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const updateProgress = (message) => {
    setProgress(message);
  };

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      if (!pdfFile) {
        alert("Please select a PDF file.");
        return;
      }

      updateProgress("Reading the PDF file...");
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let pageCount = 1;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        updateProgress(`Processing page ${pageNumber} of ${pdf.numPages}...`);
        const page = await pdf.getPage(pageNumber);
        const pageWidth = 210; // A4 page width in mm
        const pageHeight = 297; // A4 page height in mm
        const gridWidth = pageWidth / 3; // Width of each grid cell
        const gridHeight = pageHeight / 3; // Height of each grid cell

        const viewport = page.getViewport({ scale: .1 }); // Increase scale for higher quality
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
        doc.setFontSize(3);
          doc.text(
            "_thefm",
            item.xPos + 10,
            item.yPos + gridHeight - 2,
            { align: "left" }
          );

        if (pageCount % 9 === 0 && pageCount !== 0) {
          // Add a new page after every 9 grid items
          doc.addPage();
          pageCount = 0; // Reset pageCount to start a new page
        }

        pageCount++;
      }

      updateProgress("Saving the PDF file...");
      doc.save("gridPDF.pdf");
      updateProgress("PDF generation completed.");
    } catch (error) {
      console.log(error);
      updateProgress("An error occurred during PDF generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDFDoubleSide = async () => {
    setIsLoading(true);
    try {
      if (!pdfFile) {
        alert("Please select a PDF file.");
        return;
      }

      updateProgress("Reading the PDF file...");
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const gridWidth = pageWidth / 3; // Width of each grid cell
      const gridHeight = pageHeight / 3; // Height of each grid cell

      let gridItemIndex = 0;

      while (gridItemIndex * 18 < pdf.numPages) {
        const renderDataPage1 = [];
        const renderDataPage2 = [];

        // Collect data for the first page
        for (let i = 0; i < 3; i++) {
          const index = gridItemIndex * 18 + 1 + i * 2;
          if (index <= pdf.numPages) {
            renderDataPage1.push({
              pageIndex: index,
              xPos: i * gridWidth,
              yPos: 0,
            });
          }
        }

        for (let i = 0; i < 3; i++) {
          const index = gridItemIndex * 18 + 7 + i * 2;
          if (index <= pdf.numPages) {
            renderDataPage1.push({
              pageIndex: index,
              xPos: i * gridWidth,
              yPos: gridHeight,
            });
          }
        }

        for (let i = 0; i < 3; i++) {
          const index = gridItemIndex * 18 + 13 + i * 2;
          if (index <= pdf.numPages) {
            renderDataPage1.push({
              pageIndex: index,
              xPos: i * gridWidth,
              yPos: 2 * gridHeight,
            });
          }
        }

        // Collect data for the second page
        for (let i = 2; i >= 0; i--) {
          const index = gridItemIndex * 18 + 2 + (2 - i) * 2;
          if (index <= pdf.numPages) {
            renderDataPage2.push({
              pageIndex: index,
              xPos: i * gridWidth,
              yPos: 0,
            });
          }
        }

        for (let i = 2; i >= 0; i--) {
          const index = gridItemIndex * 18 + 8 + (2 - i) * 2;
          if (index <= pdf.numPages) {
            renderDataPage2.push({
              pageIndex: index,
              xPos: i * gridWidth,
              yPos: gridHeight,
            });
          }
        }

        for (let i = 2; i >= 0; i--) {
          const index = gridItemIndex * 18 + 14 + (2 - i) * 2;
          if (index <= pdf.numPages) {
            renderDataPage2.push({
              pageIndex: index,
              xPos: i * gridWidth,
              yPos: 2 * gridHeight,
            });
          }
        }

        // Render the first page
        if (gridItemIndex > 0) {
          doc.addPage();
        }
        for (let item of renderDataPage1) {
          updateProgress(`Rendering page ${item.pageIndex} for first side...`);
          const page = await pdf.getPage(item.pageIndex);
          const viewport = page.getViewport({ scale: .1 });
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

          const imageData = canvas.toDataURL("image/jpeg", 1.0);
          doc.addImage(
            imageData,
            "JPEG",
            item.xPos,
            item.yPos,
            gridWidth,
            gridHeight
          );
          doc.setFontSize(8);
          doc.text(
            item.pageIndex.toString(),
            item.xPos + gridWidth - 10,
            item.yPos + gridHeight - 5,
            { align: "right" }
          );
          doc.setFontSize(3);
          doc.text(
            "_thefm",
            item.xPos + 10,
            item.yPos + gridHeight - 2,
            { align: "left" }
          );
        }

        // Render the second page
        doc.addPage();
        for (let item of renderDataPage2) {
          updateProgress(`Rendering page ${item.pageIndex} for second side...`);
          const page = await pdf.getPage(item.pageIndex);
          const viewport = page.getViewport({ scale: .1 });
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

          const imageData = canvas.toDataURL("image/jpeg", 1.0);
          doc.addImage(
            imageData,
            "JPEG",
            item.xPos,
            item.yPos,
            gridWidth,
            gridHeight
          );
          doc.setFontSize(8);
          doc.text(
            item.pageIndex.toString(),
            item.xPos + gridWidth - 10,
            item.yPos + gridHeight - 5,
            { align: "right" }
          );
          doc.setFontSize(3);
          doc.text(
            "_thefm",
            item.xPos + 10,
            item.yPos + gridHeight - 2,
            { align: "left" }
          );
        }

        // Move to the next set of grid items
        gridItemIndex++;
      }

      updateProgress("Saving the PDF file...");
      doc.save("doubleSidedGridPDF.pdf");
      updateProgress("PDF generation completed.");
    } catch (error) {
      console.log(error);
      updateProgress("An error occurred during PDF generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const addGrid = () => {
    setBits([...bits, { title: "", content: "" }]); // Add a new grid item with empty title and content
  };

  return (
    <div className="container">
      <h2>Short Note 🚀</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="inner-container">
          <input
            className="file-selector"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <button disabled={isLoading} type="button" onClick={generatePDF}>
            Generate PDF
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={generatePDFDoubleSide}
          >
            Generate PDF (Double Side)
          </button>
        </div>
      </form>
      <p>System Status: {isLoading ? `${progress}`: "Ready"}</p>
    </div>
  );
};

export default App;
