import './App.css';

import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import AddWorkout from './pages/AddWorkout';
import AllWorkouts from './pages/AllWorkoutsPage';
import WorkOutTablePage from './pages/WorkOutTablePage';
import DoWorkoutePage from './pages/DoWorkoutPage';
import EditWorkoutePage from './pages/EditWorkoutPage';



 function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<AllWorkouts/>}/>
          <Route path="/table/:tableName" element={<WorkOutTablePage/>} />
          <Route path="/table/doWorkout/:tableName" element={<DoWorkoutePage/>} />
          <Route path="/table/editWorkout/:tableName" element={<EditWorkoutePage/>} />
          <Route path="/addWorkout" element={<AddWorkout/>} />

          
        </Routes>
      </BrowserRouter>
        

    </div>
  );
}

export default App; 

