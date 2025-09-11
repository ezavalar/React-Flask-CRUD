import React, {useState, useEffect} from 'react';

const API= process.env.REACT_APP_API;

export const Users = () => {
    //UseState para los datos del formulario
    const[nombre, setName]= useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    
    const [users, setUsers]= useState([]);
    
    //Alta de usuarios
    const handleSubmit = async (e) => {
        e.preventDefault(); //Evita que se recargue la pagina
        
        //Peticion POST de la API
        const res= await fetch(`${API}/users`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json" //Tipo de dato que se envia
            },
            body: JSON.stringify({ //Se debe de convertir el objeto a cadena
                nombre, //Abreviatura de nombre: nombre
                email, //Abreviatura de email: email
                password //Abreviatura de password: password
            })
        });

        //Transformamos la respuesta a JSON y refrescamos la lista de usuarios
        await res.json();
        getUsers();
    }

    //Listado de usuarios
    const getUsers = async () => {
        //Por defecto fetch hace peticiones GET
        const res= await fetch(`${API}/users`);
        const data= await res.json();
        setUsers(data);
    }

    //UseEffect para que se ejecute getUsers cuando el componente es renderizado
    useEffect(() => {
        getUsers();
    }, []);

    //Borra usuarios
    const deleteUser= async (id)=>{
       const res= await fetch(`${API}/users/${id}`, {
            method: "DELETE"
        });
        await res.json();
        await getUsers() //Refresca la lista de usuarios
    }

    //Actualiza usuarios
    const updateUser= (id)=>{
        console.log(id);
    }
    return (
        <div className="row mt-4">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="mb-3">
                        <input 
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={nombre}
                            className="form-control"
                            placeholder="Ingrese su nombre"
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="Ingrese su email"
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <button className="btn btn-primary w-100">
                        Guardar Datos
                    </button>
                </form> 
            </div>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user=>(
                                <tr key={user._id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button 
                                            className="btn btn-secondary btn-sm btn-block"
                                            onClick= {()=> updateUser(user._id)}
                                        >
                                            Actualizar
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick= {()=> deleteUser(user._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                        
                </table>
            </div>
        </div>    
    )
}