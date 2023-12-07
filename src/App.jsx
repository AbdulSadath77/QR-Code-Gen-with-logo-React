import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QRCode } from "react-qrcode-logo";

function App() {
  const [inpVal, setInpVal] = useState("");

  const downloadCode = () => {
    const canvas = document.getElementById("QRCode_compoent_id");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png") // converting the canvas to png image url
        .replace("image/png", "image/octet-stream"); // converting the png to octet-stream, may be for the downloading perpose
      console.log(pngUrl);
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `your_name.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const copyQrCodeURL = () => {
    const canvas = document.getElementById("QRCode_compoent_id");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      navigator.clipboard.writeText(pngUrl);
    }
  };

  return (
    <>
      <h1 className="bg-blue-700 text-white text-2xl font-bold p-4 rounded-lg mt-4 mb-8">
        Realtime QR Code Generator
      </h1>
      <label htmlFor="inp" className="font-semibold text-xl text-start">
        Enter text / URL
      </label>
      <div className="flex flex-col gap-8">
        <input
          type="text"
          placeholder="Text / URL"
          className="border-2 border-blue-700 text-lg p-2 rounded-lg shadow-md"
          minLength={5}
          maxLength={100}
          onChange={(e) => setInpVal(e.target.value)}
        />
        <div className="self-center">
          <QRCode
            /*// value="https://github.com/gcoro/react-qrcode-logo"
            // YOU CAN ALSO DEFINE EACH EYE RADIUS LIKE THIS BY PASSING THE VALUES IN THE ARRAY
            // eyeRadius={[
            //   5, // top/left eye
            //   5, // top/right eye
            //   5, // bottom/left eye
            // ]}*/
            // bgColor=""
            value={inpVal} // here you should keep the link/value(string) for which you are generation promocode
            ecLevel="M" // error-correction-level of the QR code. This would be L,M,Q,H
            enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
            size={300} // the dimension of the QR code (number)
            quietZone={10} // quiteZone is a QR Code padding
            bgColor="#fff"
            fgColor="#00f"
            eyeRadius={10} // radius of the promocode eye
            logoImage={reactLogo} // URL of the logo you want to use, make sure it is a dynamic url {"URL goes here"}
            // logoImage={viteLogo} // URL of the logo you want to use, make sure it is a dynamic url {"URL goes here"}
            logoWidth={40}
            logoHeight={40}
            logoOpacity={1}
            logoOnLoad={() => {
              // this method is used to do some more stuff after loading the logo
              console.log("Logo loaded successfully!");
            }}
            // removeQrCodeBehindLogo={true} // occupies the bg white only upto the image area
            logoPadding={true} // background and border for the image/logo. values are true or false, setting true gives the white bg with border, by default it is false and bg transparent no and border
            logoPaddingStyle="circle" // radius are 2 types square and circle
            qrStyle="dots" // type of qr code, wether you want dotted ones or the square ones
            eyeColor="#00f"
            id="QRCode_compoent_id"
          />
        </div>
        {inpVal ? (
          <div className="flex flex-row flex-nowrap gap-2 self-center">
            <button
              type="button"
              onClick={() => downloadCode()}
              className="p-2 sm:p-4 bg-blue-700 text-white font-semibold rounded-lg active:scale-95"
            >
              Download QR Code
            </button>
            <button
              type="button"
              onClick={() => copyQrCodeURL()}
              className="p-2 sm:p-4 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg active:scale-95"
            >
              Copy QR Code URL
            </button>
          </div>
        ) : null}
      </div>
      <p className="read-the-docs mt-4 text-center">
        Edit the input field and generate your own QR code and download it.
      </p>
    </>
  );
}

export default App;
