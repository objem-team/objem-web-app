import React, { useState } from "react";

if (typeof window != "undefined") {
  var ReactQrReader = require("react-qr-reader");
}
type CallBackFunc = (_qrResult: string) => void;
type Props = {
  callback: CallBackFunc;
};
const QrReader: React.VFC<Props> = (props) => {
  const [data, setData] = useState(null);

  const handleScan = (result: any) => {
    if (!result) return;
    setData(result);
    let Ip = result;
    console.log("Ip:" + Ip);
    if (!result.match(/^\d{1,3}(\.\d{1,3}){3}$/)) return;
    props.callback(result);
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
