import React, { useState } from 'react';
import styled from '@emotion/styled';
import Modal from '../components/UI/Modal/Modal.js';
import NewTasksForm from '../components/Tasks/NewTasksForm.js';
import { useGroupScoreTable } from '../hooks/GroupScoreTableContext.js';
import { useTasks } from '../hooks/TasksContext.js';
import Select from 'react-select';

const TaskListWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    tr {
        &:nth-of-type(odd) {
            background-color: #f5f5f5;
        }
        &:nth-of-type(even) {
            background-color: #f5f5f5;
        }
        &:hover {
            cursor: pointer;
            td {
                color: #262833;
            }
        }
        td {
            padding: 12px;
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
            padding: 12px;
            background-color: #67eeaa;
            color: #ffffff;
            border: 1px solid #ccc;
        }
    }
`;

const SelectField = styled.select`
    margin-left: 10px;
    font-size: 1.5rem;
`;

const Button = styled.button`
    margin: 8px;
    font-size: 1.5rem;
    padding: 3px 20px;
    border-radius: 18px;
    background-color: #39e991;
    color: #ffffff;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #08381b;
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
const TaskList = () => {
    const { tasks, deleteTask } = useTasks();
    const [taskList, setTaskList] = useState(tasks);
    const [currentUser, setCurrentUser] = useState('');
    const [clickToAdd, setClickToAdd] = useState(false);
    const { usersInGroup } = useGroupScoreTable();

    console.log('Task page', taskList);
    const handleAddTask = (newTask) => {
        setClickToAdd(true);
        //setTaskList([...taskList, newTask]);
    };

    const membersOptions = (users) => {
        const res = [{ value: '', label: 'Select Member' }];
        users.map((user) =>
            res.push({ value: user.name, label: user.name, id: user._id })
        );
        return res;
    };

    const deleteTaskHandler = (tasksData) => {
        console.log(tasksData);
        deleteTask(tasksData._id);
    };
    const updateTaskHandler = (tasksData) => {};

    const handleAssignmentChange = (event) => {
        console.log(event);
    };
    const handleUnassign = (tasksData) => {
        const updatedTaskList = taskList.map((t) => {
            if (t === tasksData) {
                return {
                    ...t,
                    familyMemberAssigned: '',
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
                    familyMemberAssigned: currentUser,
                };
            }
            return t;
        });
        setTaskList(updatedTaskList);
    };
    console.log('taskList!!!', taskList);
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
                            <td>{task.taskType}</td>
                            <td>{task.taskName}</td>
                            <td>{task.taskLocation}</td>
                            <td>{task.description}</td>
                            <td>
                                <Select
                                    name={task._id}
                                    options={membersOptions(usersInGroup)}
                                    onChange={(e, value) => {
                                        setTaskList(
                                            taskList.map((t) => {
                                                if (t._id === task._id) {
                                                    return {
                                                        ...t,
                                                        familyMemberAssigned: {
                                                            _id: value.name,
                                                            nickname: e.value,
                                                        },
                                                    };
                                                }
                                                return t;
                                            })
                                        );
                                        setCurrentUser(e.value);
                                    }}
                                />
                            </td>
                            <td>
                                {task.familyMemberAssigned?.nickname ? (
                                    <Button>In progress...</Button>
                                ) : (
                                    <Button>Waiting !</Button>
                                )}
                            </td>
                            <td>{task.taskTime}</td>
                            <td>
                                <Button onClick={() => deleteTaskHandler(task)}>
                                    Delete Task
                                </Button>
                                <Button onClick={() => updateTaskHandler(task)}>
                                    Edit Task
                                </Button>
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
