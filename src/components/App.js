import {connect} from "react-redux";
import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from "../actions/users";
import UsersList from './UsersList'
import NewUserForm from "./NewUserForm";
import {useEffect} from "react";
import {Alert} from "reactstrap";

const App = ({users, getUsersRequest, createUserRequest, deleteUserRequest, usersError}) => {

    useEffect(() => {
        getUsersRequest();
    }, [getUsersRequest]);

    const handleSubmit = ({firstName, lastName}) => {
        createUserRequest({firstName, lastName})
    }

    const handleDeleteUserClick = (userId) => {
        deleteUserRequest(userId)
    }

    const handleCloseAlert = () => {
        usersError({
            error: ''
        })
    }

    return (
        <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
            <Alert color="danger" isOpen={!!users.error} toggle={handleCloseAlert}>{users.error}</Alert>
            <NewUserForm onSubmit={handleSubmit}/>
            <UsersList users={users.items} onDeleteUser={handleDeleteUserClick}/>
        </div>
    );
}

export default connect(({users}) => ({users}), {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    usersError
})(App);
