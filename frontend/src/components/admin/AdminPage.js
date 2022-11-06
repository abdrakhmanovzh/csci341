import React, {useState ,useEffect} from 'react'
import jwt_decode from "jwt-decode"; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

const AdminPage = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [addFormData, setAddFormData] = useState({
        email: '',
        password:'',
        role: ''
    });

    const [editUserId, setEditUserId] = useState(null); 
    const [editFormData, setEditFormData] = useState({
        email: '',
        password:'',
        role: ''
    });

    const history = useNavigate();

    useEffect(() => {
        refreshToken(); 
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);

            if(decoded.role !== "admin" ) {
                history("/admin_role");
            }
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    const handleAddFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        
        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            id: nanoid(),
            email: addFormData.email,
            password: addFormData.password,
            role: addFormData.role
        }

        const newUsers = [...users, newUser];
        setUsers(newUsers);

        try {
            await axiosJWT.post('http://localhost:5000/users', {
                id: newUser.id,
                email: newUser.email,
                password: newUser.password,
                role: newUser.role
            });
            history("/admin");
        } catch (error) {
            console.log(error);
            history("/admin");
        }
    }

    const handleEditClick = (e, user) => {
        e.preventDefault();
        setEditUserId(user.id);
        
        const formValues = {
            email: user.email,
            password: user.password,
            role: user.role
        }

        setEditFormData(formValues);
    }

    const handleEditFormChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit =  async (e) => {
        e.preventDefault();
        
        const editedUser = {
            id: editUserId,
            email: editFormData.email,
            password: editFormData.password,
            role: editFormData.role,
        }

        const newUsers = [...users];
        const index = users.findIndex((user) => user.id === editUserId);

        newUsers[index] = editedUser;

        setUsers(newUsers);
        setEditUserId(null);

        try {
            await axiosJWT.put('http://localhost:5000/users', {
                id: editUserId,
                email: editedUser.email,
                password: editedUser.password,
                role: editedUser.role
            });
            history("/admin");
        } catch (error) {
            console.log(error);
            history("/admin");
        }
    }
    
    const handleCancelClick = () => {
        setEditUserId(null);
    }

    const handleDeleteClick = async (userId) => {
        const newUsers = [...users];

        const index = users.findIndex((user) => user.id === userId);

        newUsers.splice(index, 1);

        setUsers(newUsers);

        try {
            await axiosJWT.delete('http://localhost:5000/users/' + userId);
            history("/admin");
        } catch (error) {
            console.log(error);
            history("/admin");
        }
    }
  
    return (
        <div className="container mt-5">
            <h1>Welcome Back Admin</h1>
            <form onSubmit={handleEditFormSubmit}>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead> 
                    <tbody>
                        { users.map( (user, index) => (
                            <>
                                {editUserId === user.id ? <EditableRow editFormData = {editFormData} handleEditFormChange = {handleEditFormChange} handleCancelClick={handleCancelClick}/> : <ReadOnlyRow user={user} index={index} handleEditClick = {handleEditClick} handleDeleteClick={handleDeleteClick}/> }
                            </>
                        ))}
                    </tbody>
                </table>
            </form>

            <h2>Add a User</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type='text' name='email' required='required' placeholder='email' onChange={handleAddFormChange}/>
                <input type='text' name='password' required='required' placeholder='password' onChange={handleAddFormChange}/>
                <input type='text' name='role' required='required' placeholder='role' onChange={handleAddFormChange}/>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AdminPage