import React from 'react';

export default function Detalle({curso, key}){     

    
    return(
        <tr key={key}>
            <td>{curso.nombre}</td>
            <td>{curso.horario}</td>
            <td>{curso.fechaInicio}</td>
            <td>{curso.fechaFin}</td>
            <td></td>
        </tr>
    )
}