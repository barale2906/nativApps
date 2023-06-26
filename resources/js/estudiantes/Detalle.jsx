import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Detalle({estudiante, key}){ 
    const navegar = useNavigate();
    const editarestudiante=(id)=>{
        navegar('/estudiante/editar/'+id);
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
                <button type="button" className="btn btn-warning" onClick={()=>{editarestudiante(estudiante.id)}}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={()=>{borrarestudiante(estudiante)}}>Eliminar</button>
            </td>
        </tr>
    )
}