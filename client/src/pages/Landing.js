
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
      
      <div class="container justify-content-center">
        
        <div class="row align-items-center justify-content-center">

          <div className="col-sm-6 align-items-center media">
            <h2>Quick Play</h2>
            <img className="col-sm-6" src={ quickplay } alt="Quick Play"></img>
          </div>

          <div className="col-sm-6 align-items-center media">
            <h2>Log-In</h2>
            <img className="col-sm-6" src={ loginpic } alt="Log-In"></img>
          </div>

        </div>

        <div class="row align-items-center justify-content-center">
          
          <div className="col-sm-6 align-items-center media">
            <h2>How to Play</h2>
            <img className="col-sm-4" src={ howtoplay } alt="How to Play"></img>
          </div>

          <div className="col-sm-6 align-items-center media">
            <h2>About Us</h2>
            <img className="col-sm-6" src={ about } alt="About Us"></img>
          </div>
        
        </div>
        
      </div>
    
    </div>
  );
}
  
export default Landing;