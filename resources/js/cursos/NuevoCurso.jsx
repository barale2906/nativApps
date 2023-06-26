import axios from "axios";
import React, { useState } from "react";
import { urlCurso } from "../components/Url";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Nuevocurso(){
    const [nombre, setNombre]=useState("");
    const [horario, setHorario]=useState("");
    const [fechaInicio, setFechaInicio]=useState();
    const [fechaFin, setFechaFin]=useState();

    const navegar = useNavigate();
    const volver=()=>{
        navegar('/curso');
    }

    const crearCurso = async(e)=>{

        e.preventDefault()

        const formData = new FormData()

        formData.append('nombre', nombre)
        formData.append('horario', horario)
        formData.append('fechaInicio', fechaInicio)
        formData.append('fechaFin', fechaFin)

        await axios.post(urlCurso,formData)
        .then((res)=>{            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Haz creado el curso: <strong>${res.data.curso.nombre}</strong>`,
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
                        Crear Curso
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Nombre:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={nombre} onChange={(event)=>{setNombre(event.target.value)}} placeholder="Nombre del curso" aria-label="nombre"/>
                        </div>

                        <h5 className="card-title">Horario:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={horario} onChange={(event)=>{setHorario(event.target.value)}} placeholder="Horario del curso" aria-label="horario" />
                        </div>

                        <h5 className="card-title">Fecha de Inicio:</h5>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" aria-label="fechaInicio" value={fechaInicio} onChange={(event)=>{setFechaInicio(event.target.value)}} />
                        </div>

                        <h5 className="card-title">Fecha de Finalización:</h5>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" value={fechaFin} onChange={(event)=>{setFechaFin(event.target.value)}} aria-label="fechaFin" />
                        </div>

                        <button type="button" className="btn btn-info" onClick={(event)=>{crearCurso(event)}}>Crear</button>
                        
                    </div>
                </div>
            </div>
        </div>        
    )
}