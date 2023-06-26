import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { urlCurso } from "../components/Url";
export default function BorrarCurso(){
    const {id} = useParams();
    const [nombre, setNombre]=useState("");
    const ruta =urlCurso+"/"+id
    const navegar = useNavigate();
    const volver=()=>{
        navegar('/curso');
    }

    const curso=async()=>{
        await axios.get(ruta)
        .then((res)=>{
            
            const{nombre}=res.data.curso
            setNombre(nombre)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        curso();
    }, [])

    const borrarCurso=()=>{
        const rutad =urlCurso+"a/"+id
        
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
        
            axios.get(rutad).then((response) =>{
                if(response.status ===200){
                    volver()
                    Swal.fire(
                        '¡ELIMINO EL CURSO!',
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
        borrarCurso();
    }, [nombre])

    return(
        <></>
    )
}