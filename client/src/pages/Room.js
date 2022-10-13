import React, { useState } from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_ROOM } from '../utils/queries';

const Room = () => {
  const { roomCode } = useParams();
//   const [questionCount, setQuestionCount] = useState(1);
  const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
    variables: { roomCode: roomCode },
  });

  const room = data?.room || {};

  const addQuestionField = () => {
    
    let container = document.querySelector("#questions-container");
    if(container) {
        // setQuestionCount(questionCount + 1); //Starts at 0 for some reason?
        let questionCount = document.getElementsByClassName("question-row").length;

        let newDiv = document.createElement("div");
        let newCol1 = document.createElement("div");
        let newCol2 = document.createElement("div");

        let newTextArea = document.createElement("textarea");
        let newInput = document.createElement("input");

        newDiv.setAttribute('class', 'row p-2 question-row');
        newCol1.setAttribute('class', 'col-6 col-md text-center');
        newCol2.setAttribute('class', 'col-6 col-md text-center');

        newTextArea.setAttribute('class', 'form-control');
        newTextArea.setAttribute('name', `question${questionCount}`);
        newTextArea.setAttribute('placeholder', 'Question');

        newInput.setAttribute('class', 'form-control');
        newInput.setAttribute('name', `answer${questionCount}`);
        newInput.setAttribute('placeholder', 'Answer');

        newCol1.appendChild(newTextArea);
        newCol2.appendChild(newInput);
        newDiv.appendChild(newCol1);
        newDiv.appendChild(newCol2);
        container.appendChild(newDiv);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
        <h3 className="card-header bg-dark text-light p-2 m-0">
        {room.roomTitle} <br />
        <span style={{ fontSize: '1rem' }}>
            {room.hostName} made this room on {room.createdAt}
        </span>
        </h3>
        <div id="questions-container" className="bg-light py-4 container">
            <div className='row p-2'>
                <div className="col-6 col-md text-center">
                    <a href="#add" onClick={() => addQuestionField()}>Add a question</a>
                </div>
            </div>
            <div className="row p-2 question-row">
                <div className="col-6 col-md text-center">
                    <textarea className="form-control" name="question0" placeholder="Question"></textarea>
                </div>
                <div className="col-6 col-md text-center">
                    <input className="form-control" name="answer0" placeholder="Answer"/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Room;
