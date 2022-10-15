
import { useState } from 'react';
import '../index.css';
import quickplay from '../ourpics/QuickPlayPic.png';
import logninpic from '../ourpics/LogInPic.png';
import howtoplay from '../ourpics/HowToPlayPic.png';
 
 
 
 // Tell Webpack this JS file uses this image

function Landing() {
  const [size] = useState(600);
  const [bgColor] = useState("#BFC0C0");
  
  return (
    <div className="Landing">
      <h1 className= "text-primary">Welcome to Trivyaa : The biggest innovation in trivia since breweries became cool</h1>

      <div className="Container">
        <div className="Row1">
          <div className="media">
            <img className="card1 col-sm" src={ quickplay } alt="Quick Play"></img>
          </div>
          {/* <div className="card2 col-sm" src="../../client/public/LogInPic.png"></div>
        </div> */}
        </div>
        {/* <div className="Row2">
          <div className="card3" class="col-sm" src="client/public/HowToPlayPic.png"></div>
          <div className="card4" class="col-sm" src="client/public/AboutUsPic.png"></div>
        </div> */}
      
      </div>

    </div>
  );
}
  
export default Landing;