import Loading from "@/components/ui/loading";
import React from "react";

function loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loading />
    </div>
  );
}

export default loading;
