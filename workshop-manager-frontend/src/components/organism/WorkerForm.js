import React, { useState } from 'react';
import { addWorker } from '../../services/workerService';

const WorkerForm = ({ onSave }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newWorker = { name, position };
            await addWorker(newWorker);
            onSave();
        } catch (error) {
            console.error("Error adding worker:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Position:
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

export default WorkerForm;
