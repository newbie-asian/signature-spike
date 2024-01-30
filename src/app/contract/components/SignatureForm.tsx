"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

type Props = {
  handleSignatureData: (e: any, key: number) => void;
  handleDisplaySignatureData: () => void;
  downloadPdf: (imgBase64: string) => void;
  signatureData: any;
  ckey: number;
};

const SignatureForm = (props: Props) => {
  const { downloadPdf, handleSignatureData, signatureData, ckey } = props;
  console.log("%c Line:15 🥝 signatureData", "color:#93c0a4", {
    signatureData,
    key: ckey,
  });
  const sigCanvas = useRef(null);
  console.log("%c Line:21 🥚 sigCanvas", "color:#e41a6a", sigCanvas);

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas?.current?.clear();
    }
  };

  return (
    <div id="demo" className="flex flex-col gap-2">
      <div className="bg-slate-200">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 350, height: 70 }}
          ref={sigCanvas}
        />
      </div>
      <div>
        <input
          className="border border-slate-200 rounded-md p-2 w-full"
          type="text"
          placeholder="Full Name"
          value={signatureData?.fullName}
          onChange={(e) => {
            console.log("%c Line:40 🥒 e", "color:#e41a6a", e);
            handleSignatureData(e.target.value, ckey);
          }}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <button
          onClick={clear}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md flex-1"
        >
          Clear
        </button>
        <button
          onClick={() => {
            downloadPdf(
              sigCanvas?.current?.getTrimmedCanvas().toDataURL("image/png")
            );
          }}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-md flex-1"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SignatureForm;
