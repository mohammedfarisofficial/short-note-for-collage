"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/web/pdf_viewer.css";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// pdfjs.GlobalWorkerOptions.workerSrc="https://unpkg.com/pdfjs-dist@4.4.168/legacy/build/pdf.worker.min.mjs"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DropBox from "@/components/ui/drop-box";

const Home = () => {
  const [bits, setBits] = useState([{ title: "", content: "" }]);
  const [pdfFile, setPdfFile] = useState(null);
  const [finalDoc, setFinalDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const updateProgress = (message) => {
    setProgress(message);
  };

  const generatePDF = async () => {
    // ReactGA.event({
    //   category: "Button-Click",
    //   action: "Generate PDF",
    // });
    setIsLoading(true);
    try {
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
        if (pageNumber > 1 && pageNumber % 9 === 1) {
          doc.addPage();
        }

        const page = await pdf.getPage(pageNumber);
        const pageWidth = 210;
        const pageHeight = 297;
        const gridWidth = pageWidth / 3;
        const gridHeight = pageHeight / 3;

        const viewport = page.getViewport({ scale: 0.1 });
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

        const col = ((pageCount - 1) % 9) % 3;
        const row = Math.floor(((pageCount - 1) % 9) / 3);
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

        if (col < 2) {
          doc.setLineWidth(0.2);
          doc.line(
            xPosition + gridWidth,
            yPosition,
            xPosition + gridWidth,
            yPosition + gridHeight
          );
        }
        if (row < 2) {
          doc.setLineWidth(0.2);
          doc.line(
            xPosition,
            yPosition + gridHeight,
            xPosition + gridWidth,
            yPosition + gridHeight
          );
        }

        doc.setFontSize(8);
        doc.text(
          pageNumber.toString(),
          xPosition + gridWidth - 10,
          yPosition + gridHeight - 5,
          { align: "right" }
        );
        doc.setFontSize(3);
        doc.text("www.blinko.one", xPosition + 10, yPosition + gridHeight - 2, {
          align: "left",
        });

        pageCount++;

        const progressMessage = `Rendering page ${pageNumber} of ${pdf.numPages}`;
        updateProgress(progressMessage);
      }

      setFinalDoc(doc);
      console.log(finalDoc);
      doc.save(`test.pdf`);
    } catch (error) {
      console.log(error);
      updateProgress("An error occurred during PDF generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDFDoubleSide = async () => {
    // ReactGA.event({
    //   category: "Button-Click",
    //   action: "Generate PDF Double",
    // });
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

      const pageWidth = 210;
      const pageHeight = 297;
      const gridWidth = pageWidth / 3;
      const gridHeight = pageHeight / 3;

      let gridItemIndex = 0;

      while (gridItemIndex * 18 < pdf.numPages) {
        const renderDataPage1 = [];
        const renderDataPage2 = [];

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

        if (gridItemIndex > 0) {
          doc.addPage();
        }
        for (let item of renderDataPage1) {
          updateProgress(`Rendering page ${item.pageIndex} for first side...`);
          const page = await pdf.getPage(item.pageIndex);
          const viewport = page.getViewport({ scale: 0.1 });
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

          if (item.xPos !== 0) {
            doc.setLineWidth(0.2);
            doc.line(item.xPos, item.yPos, item.xPos, item.yPos + gridHeight);
          }
          if (item.yPos !== 2 * gridHeight) {
            doc.setLineWidth(0.2);
            doc.line(
              item.xPos,
              item.yPos + gridHeight,
              item.xPos + gridWidth,
              item.yPos + gridHeight
            );
          }

          doc.setFontSize(8);
          doc.text(
            item.pageIndex.toString(),
            item.xPos + gridWidth - 10,
            item.yPos + gridHeight - 5,
            { align: "right" }
          );
          doc.setFontSize(3);
          doc.text(
            "www.blinko.one",
            item.xPos + 10,
            item.yPos + gridHeight - 2,
            {
              align: "left",
            }
          );
        }

        doc.addPage();
        for (let item of renderDataPage2) {
          updateProgress(`Rendering page ${item.pageIndex} for second side...`);
          const page = await pdf.getPage(item.pageIndex);
          const viewport = page.getViewport({ scale: 0.1 });
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

          if (item.xPos !== 0) {
            doc.setLineWidth(0.2);
            doc.line(item.xPos, item.yPos, item.xPos, item.yPos + gridHeight);
          }
          if (item.yPos !== 2 * gridHeight) {
            doc.setLineWidth(0.2);
            doc.line(
              item.xPos,
              item.yPos + gridHeight,
              item.xPos + gridWidth,
              item.yPos + gridHeight
            );
          }

          doc.setFontSize(8);
          doc.text(
            item.pageIndex.toString(),
            item.xPos + gridWidth - 10,
            item.yPos + gridHeight - 5,
            { align: "right" }
          );
          doc.setFontSize(3);
          doc.text(
            "www.blinko.one",
            item.xPos + 10,
            item.yPos + gridHeight - 2,
            {
              align: "left",
            }
          );
        }
        gridItemIndex++;
      }

      setFinalDoc(doc);
      console.log(finalDoc);
      doc.save(`test.pdf`);
      // onOpen();
      // setPdfFile(null);
      updateProgress("PDF generation completed.");
    } catch (error) {
      console.log(error);
      updateProgress("An error occurred during PDF generation.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-[100vh] px-20 flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>
            Upload your PDF to quickly generate concise notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropBox file={pdfFile} setFile={setPdfFile} />
        </CardContent>
        <CardFooter className="flex justify-center gap-[15px]">
          <Button variant="secondary" onClick={generatePDF}>
            Generate single
          </Button>
          <Button variant="secondary" onClick={generatePDFDoubleSide}>
            Generate double
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
