import React from "react";
import ContractForm from "./components/ContractForm";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ContractForm />
    </div>
  );
};

export default page;
