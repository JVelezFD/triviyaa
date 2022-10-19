
import { useState } from 'react';
import '../index.css';
import quickplay from '../ourpics/QuickPlayPic.png';
import create from '../ourpics/HowToCreate.png';
import quick from '../ourpics/HowToQuickPlay.png';
import register from '../ourpics/HowToRegister.png';

 // Tell Webpack this JS file uses this image

function HowTo() {
  const [size] = useState(600);
  const [bgColor] = useState("#BFC0C0");
  
  return (
    <div className="HowTo justify-content-center align-items-center">
      <h1 className= "text-primary text-center">How to Play</h1>
      <img className="col-sm-2 mx-auto d-block" src={ quickplay } alt="Quick Play"></img>
      
      <div class="container d-flex justify-content-center">
        
        <div class="row d-flex justify-content-center">

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <ul>
              <li>* QUICK JOIN A GAME *</li>
              --------------
              <li>• Scan a QR code to jump directly into the action</li>
              <li>• Answer the Question to the best of your ability</li>
              <li>• See how you stacked up to everyone else in the room!</li>
            </ul>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ quick } alt="Register an Account"></img>
          </div>

        </div>

        <div class="row d-flex justify-content-center">

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <ul>
              <li>* REGISTER A NEW ACCOUNT *</li>
              --------------
              <li>Utilize the power of Single Sign On</li>
              <li>Or simply register with and email and password</li>
            </ul>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ register } alt="Create a Room"></img>
          </div>

        </div>

        <div class="row d-flex justify-content-center">

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <ul>
              <li>* CREATE A ROOM *</li>
              --------------
              <li>• To create a room you must be a registered user</li>
              <li>• Once logged in just click "create room"</li>
              <li>• Fill our the questions and answers form</li>
              <li>• Then share your room for anyone to join!</li>
            </ul>
          </div>

          <div className="col-sm-6 flex-column text-center p-2 justify-content-center">
            <img className="col-sm-6 mx-auto d-block" src={ create } alt="Quick Join a Game"></img>
          </div>

        </div>
        
      </div>
    
    </div>
  );
}
  
export default HowTo;