import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import WorkoutAPI from '../../apis/WorkoutAPI';

const AllWorkouts = () => {
  const [tableNames, setTableNames] = useState([]);

  useEffect(() => {
    getTableNames();
  }, []);

  const getTableNames = () => {
    WorkoutAPI.get('/tables')
      .then((response) => {
        setTableNames(response.data);
      })
      .catch((error) => {
        console.error('Error fetching table names:', error);
      });
  };

  return (
    <div className="bg-black py-8 w-full h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-Green text-center">My WORKOUTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tableNames.map((table, index) => (
            <div key={index} className="bg-darkGray p-4 shadow-md rounded-md">
              {/* Use Link component to navigate to the table page */}
              <Link to={`/table/${table}`} key={index} className="block text-xl text-center text-lightGray hover:text-black">
                {table}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllWorkouts;
