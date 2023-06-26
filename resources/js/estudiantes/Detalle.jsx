import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Detalle({estudiante, key}){ 
    const navegar = useNavigate();
    const editarestudiante=(id)=>{
        navegar('/estudiante/editar/'+id);
    }
    const asignarCursos=(id)=>{
        navegar('/estudiante/asignar/'+id);
    }
    const borrarestudiante=(estudiante)=>{
        navegar('/estudiante/borrar/'+estudiante.id);
    }
    
    return(
        <tr key={key}>
            <td>{estudiante.nombre}</td>
            <td>{estudiante.apellido}</td>
            <td>{estudiante.edad}</td>
            <td>{estudiante.email}</td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-warning btn-xs" onClick={()=>{editarestudiante(estudiante.id)}}>Editar</button>
                    <button type="button" className="btn btn-danger btn-xs" onClick={()=>{borrarestudiante(estudiante)}}>Eliminar</button>
                    <button type="button" className="btn btn-success btn-xs" onClick={()=>{asignarCursos(estudiante.id)}}>Asignar Cursos</button>
                </div>                
            </td>
        </tr>
    )
}