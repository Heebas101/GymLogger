import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WorkoutAPI from '../apis/WorkoutAPI';

const EditWorkout = () => {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [toUpdate, setToUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [exerciseToUpdate, setExerciseToUpdate] = useState('')

  useEffect(() => {
    WorkoutAPI.get(`/tables/${tableName}`)
      .then((response) => {
        const data = response.data;
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [tableName, tableData]);

  const deleteExercise = (id) => {
    WorkoutAPI.delete(`/tables/${tableName}/delete/${id}`)
      .then(() => {
        setTableData(tableData.filter(exercise => exercise.id !== id));
      })
      .catch(error => console.error('Error deleting exercise:', error));
  };

  const addFullExercise = () => {
    WorkoutAPI.post(`/create/${tableName}`, {
      exercise: exercise,
      sets: sets,
      reps: reps,
      weight: weight
    }).then(() => {
      setTableData([...tableData, {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight
      }]);
      setExercise("");
      setSets(0);
      setReps("");
      setWeight("");
    }).catch(error => {
      console.error('Error adding exercise:', error);
    });
  };

  const toggleUpdate = (id) => {
    setUpdateId(id);
    setToUpdate(true);
    console.log(updateId)
  };

  const editExercise = (id) => {
    WorkoutAPI.put(`/api/tables/${tableName}/edit/${id}`, {
      exercise: exercise,
      sets: sets,
      reps: reps,
      weight: weight
    }).then(() => {
      setTableData(tableData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            exercise: exercise,
            sets: sets,
            reps: reps,
            weight: weight
          };
        }
        return item;
      }));
      setExercise("");
      setSets(0);
      setReps("");
      setWeight("");
      setToUpdate(false);
      setUpdateId('');
    }).catch(error => {
      console.error('Error updating exercise:', error);
    });
  };

  return (
    <div className="bg-bgGray py-8 h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-Green font-bold text-center text-2xl mb-4">{tableName}</h2>
        <div className="overflow-x-auto sm:overflow-x-visible">
          <div className="flex flex-col">
            <div className="flex bg-Green text-darkGray font-bold text-center py-2 px-4 rounded-md mb-4">
              <div className="w-1/4 sm:w-1/5">Name</div>
              <div className="w-1/4 sm:w-1/5">Sets</div>
              <div className="w-1/4 sm:w-1/5">Reps</div>
              <div className="w-1/4 sm:w-1/5">Weight</div>
              <div className="w-1/4 sm:w-1/5">Action</div>
            </div>

            {tableData.map((exerciseMap) => 
              toUpdate && exerciseMap.id === updateId ? 
              ( 
                <div className="flex bg-darkGray text-white py-2 px-4 rounded-md mb-2" key={exerciseMap.id}>
                  <input type="text" placeholder={exerciseMap.Exercise} value={exercise} onChange={(event) => event.target.value !== "" ? setExercise(event.target.value):(setExercise(exerciseMap.Exercise))} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
                  <input type="number" placeholder={exerciseMap.Sets} value={sets} onChange={(event) => event.target.value !== "" ? setSets(event.target.value):(setSets(exerciseMap.sets))} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
                  <input type="text" placeholder={exerciseMap.Reps} value={reps} onChange={(event) => event.target.value !== "" ? setReps(event.target.value):(setReps(exerciseMap.reps))} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
                  <input type="text" placeholder={exerciseMap.Weight} value={weight} onChange={(event) => event.target.value !== "" ? setWeight(event.target.value):(setWeight(exerciseMap.Weight))} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
                  <div className="w-1/4 sm:w-1/5 flex justify-center">
                    <button onClick={() => editExercise(exerciseMap.id)} className="bg-Green text-white px-2 py-1 rounded-md hover:bg-green-600">Submit</button>
                  </div>
                </div>
                
              ) : (
                <div className="flex bg-darkGray text-lightGray text-center text-bold py-2 px-4n rounded-md mb-1" key={exercise.id}>
                  <div className="w-1/5 sm:w-1/10">{exerciseMap.Exercise}</div>
                  <div className="w-1/5 sm:w-1/10">{exerciseMap.Sets}</div>
                  <div className="w-1/5 sm:w-1/10">{exerciseMap.Reps}</div>
                  <div className="w-1/5 sm:w-1/10">{exerciseMap.Weight}</div>
                  <div className="w-1/4 sm:w-1/5 flex justify-center">
                    <button onClick={() => deleteExercise(exerciseMap.id)} className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-green-600">Delete</button>
                  </div>
                  <div className="w-1/4 sm:w-1/5 flex justify-center">
                    <button onClick={() => toggleUpdate(exerciseMap.id)} className="bg-Green text-white px-2 py-1 rounded-md hover:bg-green-600">Update</button>
                  </div>
                </div>
              )
            )}
            {toUpdate ? (null):
            (<div className="flex bg-darkGray text-white py-2 px-4 rounded-md mb-2">
            <input type="text" value={exercise} onChange={(event) => setExercise(event.target.value)} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
            <input type="number" value={sets} onChange={(event) => setSets(event.target.value)} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
            <input type="text" value={reps} onChange={(event) => setReps(event.target.value)} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
            <input type="text" value={weight} onChange={(event) => setWeight(event.target.value)} className="bg-lightGray w-1/4 text-darkGray mx-2 sm:w-1/5 px-2 py-1 rounded-md" />
            <div className="w-1/4 sm:w-1/5 flex justify-center">
              <button onClick={() => addFullExercise()} className="bg-Green text-white px-2 py-1 rounded-md hover:bg-green-600">Add Exercise</button>
            </div>
          </div>)
          }
            
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Link to="/" className="bg-Green text-white px-4 py-2 rounded-md hover:bg-green-600">Finish</Link>
      </div>
    </div>
  );
};

export default EditWorkout;


