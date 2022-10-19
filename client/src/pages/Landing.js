
import { useState } from 'react';
import '../index.css';
import quickplay from '../ourpics/QuickPlayPic.png';
import loginpic from '../ourpics/LogInPic.jpeg';
import howtoplay from '../ourpics/HowToPlayPic.jpeg';
import about from '../ourpics/AboutUsPic.png';

 // Tell Webpack this JS file uses this image

function Landing() {
  const [size] = useState(600);
  const [bgColor] = useState("#BFC0C0");
  
  return (
    <div className="Landing">
      <h1 className= "text-primary">Welcome to Trivyaa : The biggest innovation in trivia since breweries became cool</h1>
      
      <div class="container d-flex justify-content-center">
        
        <div class="row d-flex justify-content-center">

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <a href = "http://localhost:3000/qr">Quick Play</a>
            <img className="col-sm-6 mx-auto d-block" src={ quickplay } alt="Quick Play"></img>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <a href = "http://localhost:3000/landing">Log-In</a>
            <img className="col-sm-6 mx-auto d-block" src={ loginpic } alt="Log-In"></img>
          </div>

        </div>

        <div class="row align-items-center justify-content-center">
          
          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <a href = "http://localhost:3000/howto">How to Play</a>
            <img className="col-sm-4 mx-auto d-block" src={ howtoplay } alt="How to Play"></img>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <a href = "http://localhost:3000/about">About Us</a>
            <img className="col-sm-6 mx-auto d-block" src={ about } alt="About Us"></img>
          </div>
        
        </div>
        
      </div>
    
    </div>
  );
}
  
export default Landing;