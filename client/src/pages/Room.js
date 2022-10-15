import React from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_ROOM } from '../utils/queries';

const Room = () => {
  const { roomCode } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
    variables: { roomCode: roomCode },
  });

  const room = data?.room || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
        <h3 className="card-header bg-dark text-light p-2 m-0">
        {room.hostName} <br />
        <span style={{ fontSize: '1rem' }}>
            made this room on {room.createdAt}
        </span>
        </h3>
        <div className="bg-light py-4">
            <blockquote
                className="p-4"
                style={{
                fontSize: '1.5rem',
                fontStyle: 'italic',
                border: '2px dotted #1a1a1a',
                lineHeight: '1.5',
                }}
            >
                {room.roomTitle}
            </blockquote>
        </div>
    </div>
  );
};

export default Room;
