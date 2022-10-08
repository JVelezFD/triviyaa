import React from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_ROOM } from '../utils/queries';

const SingleRoom = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { roomId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
    // Pass the `roomId` URL parameter into query to retrieve this thought's data
    variables: { roomId: roomId },
  });

  const room = data?.room || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {room.roomDesc} <br />
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
          {room.roomText}
        </blockquote>
      </div>
    </div>
  );
};

export default SingleRoom;
