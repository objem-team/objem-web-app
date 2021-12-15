import React, { useState } from "react";
if (typeof window != "undefined") {
  var ReactQrReader = require("react-qr-reader");
}
const QrReader: React.VFC = () => {
  const [data, setData] = useState(null);

  const handleScan = (result: any) => {
    if (!result) return;
    console.log(result);
    setData(result);
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div>
      <ReactQrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </div>
  );
};
export default QrReader;
