import React from 'react';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { useAuth0 } from "@auth0/auth0-react";

import RoomForm from '../components/RoomForm';

import { QUERY_ROOMS } from '../utils/queries';

 const CreateRoom = () => {
 const [message, setMessage] = useState("");
 const serverUrl = process.env.REACT_APP_SERVER_URL;

const { getAccessTokenSilently } = useAuth0();

const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}/createroom`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
     );

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
 
  const { loading, data } = useQuery(QUERY_ROOMS);
  const rooms = data?.rooms || [];
 

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <RoomForm />
        </div>
        {/* <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // <ThoughtList
            //   thoughts={rooms}
            //   title="Some Feed for Thought(s)..."
            // />
          )}
        </div> */}
      </div>
    </main>
  );
};


export default CreateRoom;
