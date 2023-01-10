import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';

const TaskContext = createContext({
    tasks: [],
    createNewTask: () => {},
});

export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
    const { loggedUser, token } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const { data } = await clientAPI(`/users/me/grandparents`, {
                    method: 'GET',
                    token,
                });

                setTasks(data.data);
            } catch (err) {
                throw err;
            }
        };

        if (loggedUser?._id && loggedUser['myGrandparentsGroups'].length > 0) {
            console.log('loggedUser', loggedUser);
            getAllTasks();
        } else {
            setTasks([]);
        }
    }, [loggedUser, token]);

    const createNewTask = async (task) => {
        try {
            console.log('task', task);
            const { data } = await clientAPI(
                `/users/admin/grandparents/tasks`,
                {
                    method: 'POST',
                    token,
                    data: task,
                }
            );
            console.log(data.data);
            setTasks((prev) => [...prev, data.data]);
        } catch (err) {
            throw err;
        }
    };

    const values = {
        tasks,
        createNewTask,
    };

    return (
        <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
    );
}
