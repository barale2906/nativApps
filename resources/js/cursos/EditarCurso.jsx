import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlCurso } from "../components/Url";
import Swal from "sweetalert2";
export default function EditarCurso(){
    const navegar = useNavigate();
    const volver=()=>{
        navegar('/curso');
    }
    const {id} = useParams();
    const [nombre, setNombre]=useState("");
    const [horario, setHorario]=useState("");
    const [fechaInicio, setFechaInicio]=useState();
    const [fechaFin, setFechaFin]=useState();
    const ruta =urlCurso+"/"+id
    const rutaupdate =urlCurso+"a/"+id

    const curso=async()=>{
        await axios.get(ruta)
        .then((res)=>{
            
            const{nombre,horario,fechaInicio,fechaFin}=res.data.curso
            setNombre(nombre)
            setHorario(horario)
            setFechaInicio(fechaInicio)
            setFechaFin(fechaFin)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        curso();
    }, []) 

    const editarCurso = async(e)=>{

        e.preventDefault()

        const formData = new FormData()

        formData.append('nombre', nombre)
        formData.append('horario', horario)
        formData.append('fechaInicio', fechaInicio)
        formData.append('fechaFin', fechaFin)

        await axios.post(rutaupdate,formData)
        
        .then((res)=>{ 
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Haz actualizado el curso: <strong>${res.data.curso.nombre}</strong>`,
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
                        Editar Curso
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

                        <button type="button" className="btn btn-warning" onClick={(event)=>{editarCurso(event)}}>Editar</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}