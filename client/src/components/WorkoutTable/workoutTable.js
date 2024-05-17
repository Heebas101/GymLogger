import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WorkoutAPI from '../../apis/WorkoutAPI';

const WorkoutTable = () => {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    WorkoutAPI.get(`/tables/${tableName}`)
      .then((response) => {
        const data = response.data;
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [tableName]);

  return (
    <div className="bg-black py-8 w-full h-screen">
       <div className="container mx-auto px-4">
        <h2 className="text-Green font-bold text-center text-2xl mb-4">{tableName}</h2>
        <div className="overflow-x-auto sm:overflow-x-visible">
          <div className="flex flex-col">
            <div className="flex bg-Green text-darkGray font-bold text-center py-2 px-4 rounded-md  mb-4">
              <div className="w-1/4 sm:w-1/8">Name</div>
              <div className="w-1/4 sm:w-1/8">Sets</div>
              <div className="w-1/4 sm:w-1/8">Reps</div>
              <div className="w-1/4 sm:w-1/8">Weight</div>
            </div>
            {tableData.map((exerciseMap) => (
              <div key={exerciseMap.id} className="flex bg-darkGray text-lightGray text-center text-bold py-2 px-4n rounded-md  mb-1">
                <div className="w-1/4 sm:w-1/8">{exerciseMap.Exercise}</div>
                <div className="w-1/4 sm:w-1/8">{exerciseMap.Sets}</div>
                <div className="w-1/4 sm:w-1/8">{exerciseMap.Reps}</div>
                <div className="w-1/4 sm:w-1/8">{exerciseMap.Weight}</div>
              </div>
            ))}
          </div>
        </div>
      </div >
        <div className="mt-4 flex justify-center">
          <Link to={`/table/doWorkout/${tableName}`} className="mr-4 bg-Green text-lightGray px-4 py-2 rounded-md hover:bg-green-800">Begin Workout</Link>
          <Link to={`/table/editWorkout/${tableName}`} className="bg-Green text-lightGray px-4 py-2 rounded-md hover:bg-green-800">Edit Workout</Link>
        </div>
      </div>
  );
};

export default WorkoutTable;

