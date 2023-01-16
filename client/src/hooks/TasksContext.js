import { createContext, useContext, useState, useEffect } from 'react';
import { clientAPI } from '../api/api.js';
import { useAuth } from './Auth.js';
import { useUserGrandParents } from './GrandParentsGroupContext.js';

const TaskContext = createContext({
    tasks: [],
    createNewTask: () => {},
    deleteTask: () => {},
    updateTask: () => {},
});

export const useTasks = () => useContext(TaskContext);
export function TaskProvider({ children }) {
    const { loggedUser, token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const { myGroup } = useUserGrandParents();
    console.log('myGroupIn context', myGroup);
    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const { data } = await clientAPI(
                    `/users/me/grandparents/${myGroup._id}/tasks`,
                    {
                        method: 'GET',
                        token,
                    }
                );
                console.log('data', data.data);
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

    const deleteTask = async (taskID) => {
        try {
            const { data } = await clientAPI(
                `/users/admin/grandparents/tasks/${taskID}`,
                {
                    method: 'Delete',
                    token,
                }
            );
            setTasks((prev) => {
                let newTasks = prev.filter((task) => task._id !== taskID);
                return newTasks;
            });
            console.log('tasks', tasks);
        } catch (err) {
            throw err;
        }
    };

    const updateTask = async (task) => {
        try {
            const { data } = await clientAPI(
                `/users/admin/grandparents/tasks/:id`,
                {
                    method: 'Patch',
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
        deleteTask,
        updateTask,
    };

    return (
        <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
    );
}
