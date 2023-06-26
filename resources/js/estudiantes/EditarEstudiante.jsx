import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlEstudiante } from "../components/Url";
import Swal from "sweetalert2";
export default function EditarEstudiante(){
    const navegar = useNavigate();
    const volver=()=>{
        navegar('/estudiante');
    }
    const {id} = useParams();
    const [nombre, setNombre]=useState("");
    const [apellido, setApellido]=useState("");
    const [edad, setEdad]=useState("");
    const [email, setEmail]=useState("");

    const ruta =urlEstudiante+"/"+id
    const rutaupdate =urlEstudiante+"a/"+id

    const estudiante=async()=>{
        await axios.get(ruta)
        .then((res)=>{
            
            const{nombre,apellido,edad,email}=res.data.data
            setNombre(nombre)
            setApellido(apellido)
            setEdad(edad)
            setEmail(email)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        estudiante();
    }, []) 

    const editarEstudiante = async(e)=>{

        e.preventDefault()        

        const formData = new FormData()

        formData.append('nombre', nombre)
        formData.append('apellido', apellido)
        formData.append('edad', edad)
        formData.append('email', email)

        await axios.post(rutaupdate,formData)
        //await axios.put(ruta,formData, { headers: { 'Content-Type': 'multipart/x-www-form-urlencoder' } })
        
        .then((res)=>{ 
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Haz actualizado el Estudiante: <strong>${res.data.data.nombre}</strong>`,
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
                        Editar Estudiante
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

                        <button type="button" className="btn btn-warning" onClick={(event)=>{editarEstudiante(event)}}>Editar</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}