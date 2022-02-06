import React, { useState } from "react";

if (typeof window != "undefined") {
  var ReactQrReader = require("react-qr-reader");
}
type QrReaderProps = {
  onRead: (_qrResult: string) => void;
};
const QrReader: React.VFC<QrReaderProps> = (props) => {
  const [data, setData] = useState(null);

  const handleScan = (result: any) => {
    if (!result) return;
    setData(result);
    if (!result.match(/^\d{1,3}(\.\d{1,3}){3}$/)) return;
    props.onRead(result);
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
        style={{ height: "100%" }}
      />
      <p hidden>{data}</p>
    </div>
  );
};
export default QrReader;
