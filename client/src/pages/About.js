
import { useState } from 'react';
import '../index.css';
import quickplay from '../ourpics/QuickPlayPic.png';
import jesus from '../ourpics/JesusPic.png';
import connor from '../ourpics/ConnorPic.png';
import jared from '../ourpics/JaredPic.png';
import richard from '../ourpics/RichardPic.png';
import adam from '../ourpics/AdamPic.png';

 // Tell Webpack this JS file uses this image

function About() {
  const [size] = useState(600);
  const [bgColor] = useState("#BFC0C0");
  
  return (
    <div className="About justify-content-center align-items-center">
      <h1 className= "text-primary text-center">Meet the Team</h1>
      <img className="col-sm-2 mx-auto d-block" src={ quickplay } alt="Quick Play"></img>
      
      <div class="container d-flex justify-content-center">
        
        <div class="row d-flex justify-content-center">

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ jesus } alt="Jesus Velez"></img>
            <ul>
              <li>Name: Jesus Velez</li>
              <li>Age: 62</li>
              <li>Hobbies: Martial Arts, Gaming</li>
            </ul>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ connor } alt="Connor Breslin"></img>
            <ul>
              <li>Name: Connor Breslin</li>
              <li>Age: 24</li>
              <li>Hobbies: LOL and Wrestling Gators</li>
            </ul>
          </div>

        </div>

        <div class="row align-items-center justify-content-center">
          
          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ jared } alt="Jared Daniel"></img>
            <ul>
              <li>Name: Jared Daniel</li>
              <li>Age: 27</li>
              <li>Hobbies: Coding</li>
            </ul>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ richard } alt="Richard Tran"></img>
            <ul>
              <li>Name: Richard Tran</li>
              <li>Age: 32</li>
              <li>Hobbies: Disc Golf</li>
            </ul>
          </div>
        
        </div>

        <div class="row align-items-center justify-content-center">
          
          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ adam } alt="Adam Martin"></img>
            <ul>
              <li>Name: Adam Martin</li>
              <li>Age: 31</li>
              <li>Hobbies: PC Building, Whiskey Tasting</li>
            </ul>
          </div>
        
        </div>
        
      </div>
    
    </div>
  );
}
  
export default About;