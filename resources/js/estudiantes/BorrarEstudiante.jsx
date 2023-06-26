import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { urlEstudiante } from "../components/Url";
export default function BorrarEstudiante(){
    const {id} = useParams();
    const [nombre, setNombre]=useState("");
    const ruta =urlEstudiante+"/"+id
    const navegar = useNavigate();
    const volver=()=>{
        navegar('/estudiante');
    }

    const estudiante=async()=>{
        await axios.get(ruta)
        .then((res)=>{
            
            const{nombre}=res.data.estudiante
            setNombre(nombre)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        estudiante();
    }, [])

    const borrarEstudiante=()=>{
        //const ruta =urlEstudiante+"a/"+id
        
        Swal.fire({
            title: '¿Estas Seguro(a)?',
            text: `¿Quieres eliminar: ${nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, estoy seguro!'
        }).then((result) => {
            if (result.isConfirmed) {
        
            //axios.get(rutad).then((response) =>{
            axios.delete(ruta).then((response) =>{    
                if(response.status ===200){
                    volver()
                    Swal.fire(
                        '¡ELIMINO EL ESTUDIANTE!',
                        'Ha sido eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        '¡Error!',
                        'Hubo un problema al modificar la información',
                        'error'
                    )
                }
            })
            }
        })
    }

    useEffect(()=>{
        borrarEstudiante();
    }, [nombre])

    return(
        <></>
    )
}