import React from "react";
import "../App.css"
import { BrowserRouter as Switch, Route } from "react-router-dom";
import CreateGame from "../components/features/game/CreateGame";
import Question from "../components/features/questions/Question";
import Answers from "../components/features/questions/Answers";

// function HomePage() {
//   return (
//     <Link to="/create">
//       <Button variant="primary">Primary</Button>
//     </Link>
//   );
// }

function GameRoom() {
  return (
    <div>
      <Switch>
        <Route exact path="/gameroom" component={CreateGame} />
        {/* <Route exact path="/create" component={CreateGame} /> */}
        <Route path="gameroom/game/question/:id" component={Question} />
        <Route path="gameroom/game/answers/:id" component={Answers} />
      </Switch>
    </div>
  );
}

export default GameRoom;