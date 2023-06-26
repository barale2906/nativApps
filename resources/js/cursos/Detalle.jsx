import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Detalle({curso, key}){ 
    const navegar = useNavigate();
    const editarCurso=(id)=>{
        navegar('/curso/editar/'+id);
    }
    const borrarCurso=(curso)=>{
        navegar('/curso/borrar/'+curso.id);
    }
    
    return(
        <tr key={key}>
            <td>{curso.nombre}</td>
            <td>{curso.horario}</td>
            <td>{curso.fechaInicio}</td>
            <td>{curso.fechaFin}</td>
            <td>
                <button type="button" className="btn btn-warning" onClick={()=>{editarCurso(curso.id)}}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={()=>{borrarCurso(curso)}}>Eliminar</button>
            </td>
        </tr>
    )
}