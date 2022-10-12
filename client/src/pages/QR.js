import { useEffect, useState } from 'react';
import '../QR.css';
  
function QR() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("https://triviyaa.herokuapp.com/");
  const [size] = useState(600);
  const [bgColor] = useState("#BFC0C0");
  const [qrCode, setQrCode] = useState("");
  
  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode
 (`http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`);
  }, [word, size, bgColor]);
  
  // Updating the input word when user
  // click on the generate button
  function handleClick() {
    setWord(temp);
  }
  
  return (
    <div className="QR">
      <h1>Join our room on TRIVIYAA!</h1>
      <div className="input-box">
        <div className="gen">
          <input type="text" onChange={
            (e) => {setTemp(e.target.value)}}
            placeholder="Enter text to encode" />
          <button className="button" 
            onClick={handleClick}>
            Generate
          </button>
        </div>
      </div>
      <div className="output-box">
        <img src={qrCode} alt="" />
        <a href={qrCode} download="QRCode">
        </a>
      </div>
    </div>
  );
}
  
export default QR;
