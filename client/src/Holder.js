function App() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [showExercises, setShowExercises] = useState(false); 
  const [tableName, setTableName] = useState(""); 


  useEffect(() => {
    if (showExercises) { // Fetch exercises only if showExercises is true
      getExercises();
    }
  }, [showExercises]); // Fetch exercises when showExercises state changes

  const getExercises = () => {
    Axios.get('http://localhost:3001/exercises')
      .then((response) => setExerciseList(response.data))
      .catch(error => console.error('Error fetching exercises:', error));
  };

  const deleteExercise = (id) => {
    Axios.delete(`http://localhost:3001/exercise/${id}`)
      .then(() => {
        // Remove the deleted exercise from the exerciseList state
        setExerciseList(exerciseList.filter(exercise => exercise.id !== id));
      })
      .catch(error => console.error('Error deleting exercise:', error));
  };

  const addFullExercise = () => {
    Axios.post('http://localhost:3001/create', {
      exercise: exercise,
      sets: sets,
      reps: reps,
      weight: weight
    }).then(() => {
      // Update the exerciseList state with the new exercise object
      setExerciseList([...exerciseList, {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight
      }]);
      // Clear input fields after adding exercise
      setExercise("");
      setSets(0);
      setReps("");
      setWeight("");
    }).catch(error => {
      console.error('Error adding exercise:', error);
    });
  };

  const newTable = () =>{
    Axios.post('http://localhost:3001/createTable', {
      tableName: tableName,
    }).then(() => {
      setTableName('')
    }).catch(error => {
      console.error('Error adding exercise:', error);
    });
    
  };



  return (
    <div className="App">
      <div className="information">
        <label>Add Workout</label>
        <input type="text" value={tableName} onChange={(event) => setTableName(event.target.value)}/>
        <button onClick={newTable}>
          AddExercise
        </button>
        <label>Exercise:</label>
        <input type="text" value={exercise} onChange={(event) => setExercise(event.target.value)} />
        <label>No. of Sets:</label>
        <input type="number" value={sets} onChange={(event) => setSets(event.target.value)} />
        <label>Rep Break Down:</label>
        <input type="text" value={reps} onChange={(event) => setReps(event.target.value)} />
        <label>Weight Breakdown</label>
        <input type="text" value={weight} onChange={(event) => setWeight(event.target.value)} />
        <button onClick={addFullExercise}>Add Exercise</button>
      </div>

      <div className="exercises">
        <button onClick={() => setShowExercises(!showExercises)}>
          {showExercises ? 'Hide Exercises' : 'Show Exercises'}
        </button>
        {showExercises && ( // Render exercise table only if showExercises is true
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exerciseList.map(exercise => (
                <tr key={exercise.id}>
                  <td>{exercise.name}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.reps}</td>
                  <td>{exercise.weight}</td>
                  <td>
                    <button onClick={() => deleteExercise(exercise.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
