import { useState } from 'react';
import { useUserGrandParents } from '../../hooks/GrandParentsGroupContext.js';
import { useTasks } from '../../hooks/TasksContext.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
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
                <label htmlFor='grandParentAssigned'>Grand Parents ID</label>
                <input
                    type='text'
                    id='grandParentAssigned'
                    value={form.grandParentAssigned}
                    disabled={true}
                />
            </div>
            <div>
                <label htmlFor='taskType'>Task Type</label>
                <Select onChange={p} options={taskTypeOptions} />
            </div>
            <div>
                <label htmlFor='taskName'>Task Name</label>
                <input
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
                <label htmlFor='taskTime'>Task Time</label>
                <DatePicker
                    selected={taskDate}
                    onChange={(date) => setTaskDate(date)}
                />
            </div>
            <div>
                <label htmlFor='taskColor'>Task Color</label>

                <input
                    type='text'
                    id='taskColor'
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            taskColor: e.target.value,
                        }))
                    }
                />
            </div>
            <div>
                <label htmlFor='taskLocation'>Task Location</label>

                <input
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
                <label htmlFor='description'>Description</label>

                <input
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
                <label htmlFor='status'>Status</label>
                <Select
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, status: e.value }))
                    }
                    options={taskStatusOptions}
                />
            </div>
            <div>
                <label htmlFor='familyMemberAssigned'>
                    Family Member Assigned
                </label>
                <select onChange={changeHandler}>
                    <option value=''>--Please choose an option--</option>
                    {props.users.map((user) => (
                        <option key={user._id} uid={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type='submit' disabled={isLoading}>
                Submit
            </button>
        </form>
    );
};

export default NewTasksForm;
