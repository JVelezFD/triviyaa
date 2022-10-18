import React, { useState } from 'react';

// Import the `useParams()` hook from React Router
import { useParams, useNavigate, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ROOM, ADD_QUESTION } from '../utils/mutations';
import { QUERY_SINGLE_QUESTION, QUERY_SINGLE_ROOM } from '../utils/queries';

const Room = () => {
  const history = useHistory();

  const { roomCode } = useParams();
  const { roomId } = useParams();
  const { hasStarted } = useParams();
//   const [questionCount, setQuestionCount] = useState(1);
  const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
    variables: { roomCode: roomCode, _id: roomId, hasStarted: hasStarted },
  });

  //TODO: Query single user based on current user's ID. Return rooms. Check room ids for match to roomId. If match, set new variable "userIsHost" to true

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

        newTextArea.setAttribute('class', 'form-control form-question');
        newTextArea.setAttribute('name', `question${questionCount}`);
        newTextArea.setAttribute('placeholder', 'Question');

        newInput.setAttribute('class', 'form-control form-answer');
        newInput.setAttribute('name', `answer${questionCount}`);
        newInput.setAttribute('placeholder', 'Answer');

        newCol1.appendChild(newTextArea);
        newCol2.appendChild(newInput);
        newDiv.appendChild(newCol1);
        newDiv.appendChild(newCol2);
        container.appendChild(newDiv);
    }
  }

  const [updateRoom, { updateRoomerror }] = useMutation(UPDATE_ROOM, {
    update(cache, { data: { updateRoom } }) {
      try {
        const { rooms } = cache.readQuery({ query: QUERY_SINGLE_ROOM });

        cache.writeQuery({
          query: QUERY_SINGLE_ROOM,
          data: { rooms: [...rooms, updateRoom ] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [addQuestion, { addQuestionError }] = useMutation(ADD_QUESTION, {
    update(cache, { data: { addQuestion } }) {
      try {
        const { questions } = cache.readQuery({ query: QUERY_SINGLE_QUESTION });

        cache.writeQuery({
          query: QUERY_SINGLE_QUESTION,
          data: { questions: [addQuestion, ...questions] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const start = async () => {
    let questions = document.getElementsByClassName("form-question");
    let answers = document.getElementsByClassName("form-answer");
console.log(room._id)
    try {
      const { roomData } = await updateRoom({
        variables: {
          updateRoomId: room._id,
          hasStarted: true
        }
      });
      //console.log(roomData);
      for (let i = 0; i < questions.length; i++) {
        const { questionData } = await addQuestion(
          {
          variables: {
            roomId: room._Id,
            questionText: questions[i].value,
            correctAnswerText: answers[i].value
          }
        }) ;
      }
    
      history.push(`/room/${roomCode}`);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  // If room not started and user is creator of room, return:
  if (!hasStarted /*TODO: Check if user is room creator*/) {
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
                  <div className="col-6 col-md text-center">
                      <a href="#start" onClick={() => start()}>Start room</a>
                  </div>
              </div>
              <div className="row p-2 question-row">
                  <div className="col-6 col-md text-center">
                      <textarea className="form-control form-question" name="question0" placeholder="Question"></textarea>
                  </div>
                  <div className="col-6 col-md text-center">
                      <input className="form-control form-answer" name="answer0" placeholder="Answer"/>
                  </div>
              </div>
          </div>
      </div>
    );
  }
  // Else if room not started ask player for nickname
  // Else return player view
};

export default Room;
