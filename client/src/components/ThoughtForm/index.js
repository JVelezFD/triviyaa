import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ROOM } from '../../utils/mutations';
import { QUERY_SINGLE_ROOM } from '../../utils/queries';

const RoomForm = () => {
  const [formState, setFormState] = useState({
    roomText: '',
    roomTitle: '',
    roomDesc: '',
    roomOptions: ''
  });
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
        variables: { ...formState },
      });

      setFormState({
        roomText: '',
        roomTitle: '',
        roomDesc: '',
        roomOptions: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomText' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'roomText') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <textarea
            name="roomText"
            placeholder="Here's a new thought..."
            value={formState.roomText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="roomTitle"
            placeholder="Add your name to get credit for the thought..."
            value={formState.roomTitle}
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
