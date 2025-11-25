import React, { useContext, useEffect } from 'react';
import { userContext } from '../context/ContextProvider';

function UserDashboard() {
  const { user } = useContext(userContext);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">
        Welcome, <span className='text-blue-600'>{user?.email || 'Suraj'}</span>
      </h1>
      
    </div>
  );
}

export default UserDashboard;




