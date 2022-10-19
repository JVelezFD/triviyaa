import React, { useState } from 'react';

// Import the `useParams()` hook from React Router
import { useParams, useNavigate, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ROOM, ADD_QUESTION } from '../utils/mutations';
import { QUERY_SINGLE_QUESTION, QUERY_SINGLE_ROOM } from '../utils/queries';

const Room = () => {
  const history = useHistory();
  const [questions, setQuestions] =useState(['']);
  const [answers, setAnswers] =useState(['']);
  const [nickname, setNickname] = useState('');
  const [nameSet, setNameSet] = useState(false);
  const { roomCode } = useParams();
  // const [roomId, setRoomId] = useState();
  // const [hasStarted, setHasStarted] = useState();
//   const [questionCount, setQuestionCount] = useState(1);
  const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
    variables: { roomCode: roomCode },
  });
  

  //TODO: Query single user based on current user's ID. Return rooms. Check room ids for match to roomId. If match, set new variable "userIsHost" to true

  const room = data?.room || {};
  // const hasStarted = data?.room.hasStarted || false;


  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'nickname') {
      setNickname(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    setNameSet(true);
    history.push(`/room/${roomCode}`);
  }

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

  // const [updateRoom, { updateRoomerror }] = useMutation(UPDATE_ROOM, {
  //   update(cache, { data: { updateRoom } }) {
  //     try {
  //       const { rooms } = cache.readQuery({ query: QUERY_SINGLE_ROOM, variables: {roomCode: roomCode} });

  //       cache.writeQuery({
  //         query: QUERY_SINGLE_ROOM,
  //         data: { rooms: [updateRoom, ...rooms] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });

  const [updateRoom, { error }] = useMutation(UPDATE_ROOM);

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
    // setRoomId(data.room._id);
    // setHasStarted(data.room.hasStarted);
    try {
      const { roomData } = await updateRoom({
        variables: {
          _id: data.room._id,
          hasStarted: true
        }
      });
      console.log("questions", questions, roomData);
      
      for (let i = 0; i < questions.length; i++) {
        const { questionData } = await addQuestion(
          {
          variables: {
            roomId: data.room._id,
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
  if (data != null && !data.room.hasStarted /*TODO: Check if user is room creator*/) {
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
  } else if (!nameSet){
    return (
      <div>
        <form id="nickname">
          <input type='nickname' name='nickname' placeholder='nickname' className='form-control' onChange={handleInputChange} />
          <button className='btn btn-primary btn-lg btn-block' onClick={handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        You are in the game, {nickname}!
      </div>
    );
  }
  // Else if room not started ask player for nickname
  // Else return player view
};

export default Room;
