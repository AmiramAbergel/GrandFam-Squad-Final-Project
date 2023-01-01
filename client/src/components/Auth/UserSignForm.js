import { useState } from 'react';

const UserSignForm = (props) => {
    return (
        <>
            <div>
                <label className='form__label' htmlFor='password-confirm'>
                    Confirm password
                </label>
                <input
                    onChange={props.onChange}
                    className='form__input'
                    id='confirmPassword'
                    type='password'
                    placeholder='••••••••'
                    required='required'
                    minLength={8}
                />
            </div>
            <div>
                <label className='form__label' htmlFor='password-confirm'>
                    name
                </label>
                <input
                    onChange={props.onChange}
                    className='form__input'
                    id='name'
                    type='name'
                    placeholder='Your first name'
                    required='required'
                    minLength={8}
                />
            </div>
            <div>
                <label className='form__label' htmlFor='password-confirm'>
                    lastName
                </label>
                <input
                    onChange={props.onChange}
                    className='form__input'
                    id='lastName'
                    type='lastName'
                    placeholder='Your last name'
                    required='required'
                    minLength={8}
                />
            </div>
        </>
    );
};

export default UserSignForm;
