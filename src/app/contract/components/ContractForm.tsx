"use client";

import React, { useState, useRef, useCallback } from "react";
import SignatureForm from "./SignatureForm";
import axios from "axios";

const personalInfo = {
  firstName: "John",
  lastName: "Doe",
  gender: "Male",
  middleName: "Smith",
  password: "****94",
  description: "Software Developer",
  username: "johndoe",
  about: "I am a software developer with over 5 years of experience.",
};

const ContractForm = () => {
  const [displaySignatureData, setDisplaySignatureData] = useState(false);
  console.log(
    "%c Line:20 🌽 displaySignatureData",
    "color:#b03734",
    displaySignatureData
  );
  const [pdf, setPdf] = useState("");
  const [signatureData, setSignatureData] = useState({
    fullName: "",
    signedDate: "",
  });

  const img = document?.createElement("img");
  const canvasDiv = document.getElementById("demo");
  console.log("%c Line:33 🌮 canvasDiv", "color:#ed9ec7", canvasDiv);
  const imgRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDisplaySignatureData = useCallback(() => {
    setDisplaySignatureData(!displaySignatureData);
  }, [displaySignatureData]);

  const downloadPDF = useCallback(
    (imgBase64: string) => {
      img.src = imgBase64;
      imgRef.current?.appendChild(img);
      // canvasDiv?.remove();
      canvasDiv?.removeChild(canvasDiv?.firstChild || null);
      handleDisplaySignatureData();

      if (pdfRef?.current) {
        console.log(
          "%c Line:42 🍢 pdfRef.current.outerHTML",
          "color:#465975",
          pdfRef.current.outerHTML
        );
        axios
          .post(
            "/api/files",
            {
              stringVersion: pdfRef?.current?.outerHTML,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((res) => {
            setPdf(res.data);
          });
      }
    },
    [pdfRef, canvasDiv, handleDisplaySignatureData, img]
  );

  const handleChangeSignatureData = (e) => {
    const newSignatureData = {
      fullName: e.target.value,
      signedDate: new Date().toLocaleDateString(),
    };

    setSignatureData(newSignatureData);
  };

  return (
    <div
      className="flex flex-col gap-1 items-start w-1/2 rounded-lg border border-slate-200 shadow-md p-10"
      ref={pdfRef}
      id="123"
    >
      <h1 className="text-3xl font-bold mb-4">PERSONAL INFORMATION</h1>
      <p>
        <strong>Job Title:</strong> {personalInfo.description}
      </p>
      <p>
        <strong>Username:</strong> {personalInfo.username}
      </p>
      <p>
        <strong>Password:</strong> {personalInfo.password}
      </p>
      <p>
        <strong>Gender:</strong> {personalInfo.gender}
      </p>
      <p>
        <strong>About:</strong> {personalInfo.about}
      </p>
      <p className="mb-10">
        <strong>Description: </strong>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      {/* Signature display with full name and signed date. */}
      <div ref={imgRef}></div>

      {displaySignatureData && (
        <span>{`${signatureData.fullName}, ${signatureData.signedDate}`}</span>
      )}

      {!displaySignatureData && (
        <div id="demo">
          <SignatureForm
            handleSignatureData={handleChangeSignatureData}
            handleDisplaySignatureData={handleDisplaySignatureData}
            downloadPdf={downloadPDF}
            signatureData={signatureData}
          />
        </div>
      )}

      {pdf && (
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => window.open(pdf, "_blank")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>

          <a href={pdf} download className="text-blue-500">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ContractForm;
