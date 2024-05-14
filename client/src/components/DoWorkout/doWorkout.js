import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faO } from '@fortawesome/free-solid-svg-icons';

const DoWorkout = () => {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/tables/${tableName}`)
      .then((response) => {
        setTableData(response.data.map(exercise => ({ ...exercise, ticked: false })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [tableName]);

  const handleTick = (id) => {
    setTableData(prevTableData => {
      return prevTableData.map((exercise) => {
        if (exercise.id === id) {
          return { ...exercise, ticked: !exercise.ticked };
        }
        return exercise;
      });
    });
  };

  return (
    <div className="bg-black py-8 w-full h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-Green text-center">{tableName}</h1>
        <div className="flex flex-col">
          <div className="flex bg-Green text-darkGray font-bold text-center py-2 px-4 rounded-md mb-4">
            <div className="w-1/5">Name</div>
            <div className="w-1/5">Sets</div>
            <div className="w-1/5">Reps</div>
            <div className="w-1/5">Weight</div>
            <div className="w-1/5">Completed</div>
          </div>
          {tableData.map((exercise) => (
            <div key={exercise.id} className={`flex ${exercise.ticked ? 'bg-darkGray border-Green border-2' : 'bg-darkGray'} text-lightGray text-center py-2 px-4 rounded-md mb-1`}>
              <div className="w-1/5">{exercise.Exercise}</div>
              <div className="w-1/5">{exercise.Sets}</div>
              <div className="w-1/5">{exercise.Reps}</div>
              <div className="w-1/5">{exercise.Weight}</div>
              <div className="w-1/5">
                <button onClick={() => handleTick(exercise.id)}>
                  {exercise.ticked ? <FontAwesomeIcon icon={faCircle} /> : <FontAwesomeIcon icon={faO} />} 
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link to="/" className="bg-Green text-lightGray px-4 py-2 rounded-md hover:bg-green-800">Finish</Link>
        </div>
      </div>
    </div>
  );
};

export default DoWorkout;
