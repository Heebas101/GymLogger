import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditWorkout from '../../EditWorkout/EditWorkout';
import WorkoutAPI from '../../apis/WorkoutAPI';

const NewTable = () => {
    const [tableName, setTableName] = useState("");
    const [tableCreated, setTableCreated] = useState(false);

    const addTable = () => {
        return new Promise((resolve, reject) => {
            WorkoutAPI.post(`/newWorkout/${tableName}`, {
                tableName: tableName
            })
            .then(response => {
                console.log('Table created successfully');
                setTableCreated(true);
                resolve(); // Resolve the promise when table creation is successful
            })
            .catch(error => {
                console.error('Error creating table:', error);
                reject(error); // Reject the promise if there's an error
            });
        });
    };

    const handleCreateWorkout = () => {
        addTable().then(() => {
            // Redirect to the specified link after table creation
            window.location.href = `/table/editWorkout/${tableName}`;
        }).catch(error => {
            console.error('Failed to create table:', error);
        });
    };

    return (
        <div className="bg-black text-gray-100 h-screen flex justify-center items-center">
            {!tableCreated && (
                <div className="mx-auto lg:flex lg:items-center lg:justify-center">
                    <div className="lg:flex lg:items-center">
                        <label className="mx-2 lg:mr-2">Add Workout</label>
                        <input className="bg-lightGray rounded-md mb-2 lg:mb-0 lg:mr-2" type="text" value={tableName} onChange={(event) => setTableName(event.target.value)}/>
                    </div>
                    <button className="mx-2 bg-Green text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={handleCreateWorkout}>Create Workout</button>
                </div>
            )}
        </div>
    );
};

export default NewTable;

