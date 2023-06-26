import axios from "axios";
import React, { useState } from "react";
import { urlEstudiante } from "../components/Url";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function NuevoEstudiante(){
    const [nombre, setNombre]=useState("");
    const [apellido, setApellido]=useState("");
    const [edad, setEdad]=useState("");
    const [email, setEmail]=useState("");

    const navegar = useNavigate();
    const volver=()=>{
        navegar('/estudiante');
    }

    const crearEstudiante = async(e)=>{

        e.preventDefault()

        const formData = new FormData()

        formData.append('nombre', nombre)
        formData.append('apellido', apellido)
        formData.append('edad', edad)
        formData.append('email', email)
        
        await axios.post(urlEstudiante,formData)
        
        .then((res)=>{            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Haz creado el Estudiante: <strong>${res.data.estudiante.nombre}</strong>`,
                showConfirmButton: false,
                timer: 1500
            })

            volver()
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    return(
        <div className="row">
            <div className="container text-center alert alert-primary col-sm-6 mt-4" role="alert">
                <div className="card">
                    <div className="card-header">
                        Crear Estudiante
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Nombre:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={nombre} onChange={(event)=>{setNombre(event.target.value)}} placeholder="Nombre del Estudiante" aria-label="nombre"/>
                        </div>

                        <h5 className="card-title">Apellido:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={apellido} onChange={(event)=>{setApellido(event.target.value)}} placeholder="Apellido del Estudiante" aria-label="apellido" />
                        </div>

                        <h5 className="card-title">Edad:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" aria-label="edad" value={edad} onChange={(event)=>{setEdad(event.target.value)}} />
                        </div>

                        <h5 className="card-title">Correo Electrónico:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={email} onChange={(event)=>{setEmail(event.target.value)}} aria-label="email" />
                        </div>

                        <button type="button" className="btn btn-info" onClick={(event)=>{crearEstudiante(event)}}>Crear</button>
                        
                    </div>
                </div>
            </div>
        </div>        
    )
}