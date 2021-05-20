import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {useState} from "react";

const NewUserForm = ({onSubmit}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit({
            firstName: firstName,
            lastName: lastName
        })

        setFirstName('')
        setLastName('')
    }

    const handleFirstNameChanged = e => {
        setFirstName(e.target.value)
    }

    const handleLastNameChanged = e => {
        setLastName(e.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup style={{marginTop: "10px", marginBottom: "10px"}}>
                <Label>First Name</Label>
                <Input required placeholder="First name" onChange={handleFirstNameChanged} value={firstName}/>
            </FormGroup>
            <FormGroup style={{marginTop: "10px", marginBottom: "10px"}}>
                <Label>Last Name</Label>
                <Input required placeholder="Last name" onChange={handleLastNameChanged} value={lastName}/>
            </FormGroup>
            <FormGroup style={{marginTop: "10px", marginBottom: "10px"}}>
                <Button style={{width: '100%'}} block outline type="submit" color="primary">Create</Button>
            </FormGroup>
        </Form>

    )
};

export default NewUserForm;