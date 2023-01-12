import React, { useState } from 'react';
import styled from '@emotion/styled';

import tasksData from './tasks';
import Modal from '../components/UI/Modal/Modal.js';
import NewTasksForm from '../components/Tasks/NewTasksForm.js';
import { useGroupScoreTable } from '../hooks/GroupScoreTableContext.js';
import { useTasks } from '../hooks/TasksContext.js';

const TaskListWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    font-size: 1.5rem;
    font-family: 'Roboto', sans-serif;
    tr {
        &:nth-of-type(odd) {
            background-color: #f5f5f5;
        }
        &:nth-of-type(even) {
            background-color: #f5f5f5;
        }
        &:hover {
            background-color: #39e991;
            cursor: pointer;
            td {
                color: #262833;
            }
        }
        td {
            padding: 10px;
            border: 1px solid #ccc;
            &:first-of-type {
                width: 15%;
            }
            &:last-of-type {
                width: 15%;
            }
        }
        th {
            text-align: left;
            padding: 10px;
            background-color: #67eeaa;
            color: #ffffff;
            border: 1px solid #ccc;
        }
    }
`;

const Select = styled.select`
    margin-left: 10px;
    font-size: 1.5rem;
`;

const Button = styled.button`
    margin-left: 10px;
    font-size: 1.5rem;
    background-color: #39e991;
    color: #ffffff;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #00ff62;
    }
`;

const DanceButton = styled.button`
    font-size: 2rem;
    border: none;
    border-radius: 5px;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #39e991;
    color: #ffffff;
    animation: 0.5s ease-in-out;
    margin-top: 2rem;

    &:hover {
        background-color: #67eeaa;
    }
`;
const TaskList = (props) => {
    const [taskList, setTaskList] = useState(tasksData);
    const [currentUser, setCurrentUser] = useState('');
    const [clickToAdd, setClickToAdd] = useState(false);
    const { usersInGroup } = useGroupScoreTable();
    const { tasks } = useTasks();
    console.log('Task page', tasks);
    const handleAddTask = (newTask) => {
        setClickToAdd(true);
        //setTaskList([...taskList, newTask]);
    };

    const handleAssignmentChange = (event, tasksData) => {
        const updatedTaskList = taskList.map((t) => {
            if (t === tasksData) {
                return {
                    ...t,
                    assignedTo: event.target.value,
                };
            }
            return t;
        });
        setTaskList(updatedTaskList);
    };

    const handleUnassign = (tasksData) => {
        const updatedTaskList = taskList.map((t) => {
            if (t === tasksData) {
                return {
                    ...t,
                    assignedTo: '',
                };
            }
            return t;
        });
        setTaskList(updatedTaskList);
    };

    const handleCurrentUserChange = (event) => {
        setCurrentUser(event.target.value);
    };

    const handleJoin = (tasksData) => {
        const updatedTaskList = taskList.map((t) => {
            if (t === tasksData) {
                return {
                    ...t,
                    assignedTo: currentUser,
                };
            }
            return t;
        });
        setTaskList(updatedTaskList);
    };

    return (
        <TaskListWrapper>
            <Table>
                <thead>
                    <tr>
                        <th>Task-Type</th>
                        <th>Title</th>
                        <th>Task-Location</th>
                        <th>Description</th>
                        <th>Assigned To</th>
                        <th>Task Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList.map((task, i) => (
                        <tr key={i}>
                            <td>{tasksData.description}</td>
                            <td></td>
                            <td>{tasksData.dueDate}</td>
                            <td></td>
                            <td>
                                <Select
                                    value={tasksData.assignedTo}
                                    onChange={(event) =>
                                        handleAssignmentChange(event, task)
                                    }
                                >
                                    <option value=''>Unassigned</option>
                                    <option value='Amiram'>Amiram</option>
                                    <option value='Sami'>Sami</option>
                                    <option value='Ben'>Ben</option>
                                </Select>
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                {' '}
                                {tasksData.assignedTo ? (
                                    <Button
                                        onClick={() => handleUnassign(task)}
                                    >
                                        Unassign
                                    </Button>
                                ) : (
                                    <Select
                                        value={currentUser}
                                        onChange={handleCurrentUserChange}
                                    >
                                        <option value=''>Select User</option>
                                        <option value='Amiram'>Amiram</option>
                                        <option value='Sami'>Sami</option>
                                        <option value='Ben'>Ben</option>
                                    </Select>
                                )}
                                {currentUser && !task.assignedTo ? (
                                    <Button
                                        onClick={() => handleJoin(tasksData)}
                                    >
                                        Join
                                    </Button>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DanceButton onClick={() => setClickToAdd(true)}>
                Add New Task
            </DanceButton>
            {clickToAdd && (
                <Modal onClose={() => setClickToAdd(false)}>
                    <NewTasksForm users={usersInGroup}></NewTasksForm>
                </Modal>
            )}
        </TaskListWrapper>
    );
};

export default TaskList;
