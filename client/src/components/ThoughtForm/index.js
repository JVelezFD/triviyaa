import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ROOM } from '../../utils/mutations';
import { QUERY_SINGLE_ROOM } from '../../utils/queries';

const userId = "63458ad216a4e4e5d181a95a";

const RoomForm = () => {
  // const [formState, setFormState] = useState({
  //   roomText: '',
  //   roomTitle: '',
  //   roomDesc: '',
  //   roomOptions: ''
  // });
  const [roomText, setRoomText] = useState('');
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDesc, setRoomDesc] = useState('');
  const [roomOptions, setRoomOptions] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addRoom, { error }] = useMutation(ADD_ROOM, {
    update(cache, { data: { addRoom } }) {
      try {
        const { rooms } = cache.readQuery({ query: QUERY_SINGLE_ROOM });

        cache.writeQuery({
          query: QUERY_SINGLE_ROOM,
          data: { rooms: [addRoom, ...rooms] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRoom({
        // variables: { ...formState },
        variables: {
          userId,
          roomText,
          roomTitle,
          roomDesc,
          roomOptions
        }
      });

      // setFormState({
      //   roomText: '',
      //   roomTitle: '',
      //   roomDesc: '',
      //   roomOptions: ''
      // });
      setRoomText('');
      setRoomTitle('');
      setRoomDesc('');
      setRoomOptions('');

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomText' && value.length <= 280) {
      // setFormState({ ...formState, [name]: value });
      setRoomText(value);
      setCharacterCount(value.length);
    } else if (name === 'roomTitle') {
      // setFormState({ ...formState, [name]: value });
      setRoomTitle(value);
    } else if (name === 'roomDesc') {
      setRoomDesc(value);
    } else if (name === 'roomOptions') {
      setRoomOptions(value);
    }
  };

  return (
    <div>
      <h3>Host your own Trivia Night!</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Create a room below
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <textarea
            name="roomText"
            placeholder="Name your Trivia Room"
            value={roomText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="roomTitle"
            placeholder="Provide a Host Name"
            value={roomTitle}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Room
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default RoomForm;
