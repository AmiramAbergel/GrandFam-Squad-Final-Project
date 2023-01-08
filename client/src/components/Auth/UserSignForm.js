import styled from '@emotion/styled';

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-size: 1.5rem;
    color: #3c3f50;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 0.5rem;
    width: 80%;
    max-width: 500px;
    padding: 0.5rem 1rem;

    &:focus {
        outline: none;
        border-color: #39e991;
    }

    &::placeholder {
        color: #67eeaa;
    }
`;
const UserSignForm = (props) => {
    return (
        <>
            <FormGroup>
                <Label className='form__label' htmlFor='password-confirm'>
                    Confirm password
                </Label>
                <Input
                    onChange={props.onChange}
                    className='form__input'
                    id='passwordConfirm'
                    type='password'
                    placeholder='••••••••'
                    required='required'
                    minLength={8}
                />
            </FormGroup>
            <FormGroup>
                <Label className='form__label' htmlFor='Name'>
                    First Name
                </Label>
                <Input
                    onChange={props.onChange}
                    className='form__input'
                    id='name'
                    type='name'
                    placeholder='Your first name'
                    required='required'
                />
            </FormGroup>
            <FormGroup>
                <Label className='form__label' htmlFor='lastName'>
                    Last Name
                </Label>
                <Input
                    onChange={props.onChange}
                    className='form__input'
                    id='lastName'
                    type='lastName'
                    placeholder='Your last name'
                    required='required'
                />
            </FormGroup>
            <FormGroup>
                <Label className='form__label' htmlFor='age'>
                    Age
                </Label>
                <Input
                    onChange={props.onChange}
                    className='form__input'
                    id='age'
                    type='number'
                    placeholder='Your age'
                    required='required'
                />
            </FormGroup>
            <FormGroup>
                <Label className='form__label' htmlFor='address'>
                    Address
                </Label>
                <Input
                    onChange={props.onChange}
                    className='form__input'
                    id='address'
                    type='text'
                    placeholder='Your address'
                    required='required'
                />
            </FormGroup>
            <FormGroup>
                <Label className='form__label' htmlFor='phone'>
                    Phone
                </Label>
                <Input
                    onChange={props.onChange}
                    className='form__input'
                    id='phone'
                    type='text'
                    placeholder='Your phone number'
                    required='required'
                />
            </FormGroup>
        </>
    );
};

export default UserSignForm;
