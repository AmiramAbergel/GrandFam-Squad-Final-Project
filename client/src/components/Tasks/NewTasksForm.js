import { useState } from 'react';
import { useUserGrandParents } from '../../hooks/GrandParentsGroupContext.js';
import { useTasks } from '../../hooks/TasksContext.js';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import styled from '@emotion/styled';

const LabelStyles = styled.label`
    font-size: 1.5rem;
    color: white;
    padding: 0.5rem;
    width: 97%;
`;

const InputStyles = styled.input`
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    width: 97%;
`;

const SelectStyles = styled.select`
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    width: 97%;
`;

const Button = styled.button`
    margin: 50px 230px;
    font-size: 3rem;
    background-color: #39e991;
    color: #ffffff;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #00ff62;
    }
`;

const NewTasksForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { createNewTask } = useTasks();
    const { myGroup } = useUserGrandParents();
    const [taskDate, setTaskDate] = useState(new Date());
    const [form, setForm] = useState({
        grandParentAssigned: myGroup._id,
        taskType: '',
        taskName: '',
        taskTime: taskDate,
        taskColor: '',
        taskLocation: '',
        description: '',
        status: '',
        familyMemberAssigned: '',
    });

    const taskTypeOptions = [
        { value: 'task', label: 'Task' },
        { value: 'event', label: 'Event' },
        { value: 'appointment', label: 'Appointment' },
    ];

    const taskStatusOptions = [
        { value: 'true', label: 'Complete' },
        { value: 'false', label: 'Pending...' },
    ];

    const taskColorsOptions = [
        { value: 'blue', label: 'Blue' },
        { value: 'red', label: 'Red' },
        { value: 'yellow', label: 'Yellow' },
    ];

    const changeHandler = (event) => {
        console.log(event.target.value);
        setForm((prev) => ({
            ...prev,
            familyMemberAssigned: event.target.value,
        }));
    };
    const submitTaskHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            createNewTask(form);
        } catch (err) {
            console.log('Invalid email or password');
            console.log(err);
        }
        setIsLoading(false);
    };

    const p = (e) => {
        console.log(e);
        setForm((prev) => ({
            ...prev,
            taskType: e.value,
        }));
    };
    return (
        <form onSubmit={submitTaskHandler}>
            <div>
                <LabelStyles htmlFor='grandParentAssigned'>
                    Grand Parents ID
                </LabelStyles>
                <InputStyles
                    type='text'
                    id='grandParentAssigned'
                    value={form.grandParentAssigned}
                    disabled={true}
                />
            </div>
            <div>
                <LabelStyles htmlFor='taskType'>Task Type</LabelStyles>
                <Select onChange={p} options={taskTypeOptions} />
            </div>
            <div>
                <LabelStyles htmlFor='taskName'>Task Name</LabelStyles>
                <InputStyles
                    type='text'
                    id='taskName'
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            taskName: e.target.value,
                        }))
                    }
                />
            </div>
            <div>
                <LabelStyles htmlFor='taskTime'>Task Time</LabelStyles>
                <DatePicker
                    selected={taskDate}
                    onChange={(date) => setTaskDate(date)}
                />
            </div>
            <div>
                <LabelStyles htmlFor='taskColor'>Task Color</LabelStyles>
                <Select
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, taskColor: e.value }))
                    }
                    options={taskColorsOptions}
                />
            </div>
            <div>
                <LabelStyles htmlFor='taskLocation'>Task Location</LabelStyles>
                <InputStyles
                    type='text'
                    id='taskLocation'
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            taskLocation: e.target.value,
                        }))
                    }
                />
            </div>
            <div>
                <LabelStyles htmlFor='description'>Description</LabelStyles>
                <InputStyles
                    type='text'
                    id='description'
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
            </div>
            <div>
                <LabelStyles htmlFor='status'>Status</LabelStyles>
                <Select
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, status: e.value }))
                    }
                    options={taskStatusOptions}
                />
            </div>
            <div>
                <LabelStyles htmlFor='familyMemberAssigned'>
                    Family Member Assigned
                </LabelStyles>
                <SelectStyles onChange={changeHandler}>
                    <option value=''>--Please choose an option--</option>
                    {props.users.map((user) => (
                        <option key={user._id} uid={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </SelectStyles>
            </div>
            <Button type='submit' disabled={isLoading}>
                Submit
            </Button>
        </form>
    );
};

export default NewTasksForm;
