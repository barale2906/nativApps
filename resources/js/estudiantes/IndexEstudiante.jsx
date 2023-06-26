import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Detalle from './Detalle';
import Paginacion from '../components/Paginacion';
import { urlEstudiante } from '../components/Url';
import { useNavigate } from 'react-router-dom';


export default function IndexEstudiantes(){
    const [estudiantes, setEstudiantes]=useState([]);
    const navegar = useNavigate();
    const crearEstudiante=()=>{
        navegar('/estudiante/nuevo');
    }

    //parámetros de paginación productos
    const [itemsPerPage, setItemsPerPage]=useState(25);
    const [currentPage, setCurrentPage]=useState(1);
    const totalItems = estudiantes?.length; //Total de registros a paginar
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex-itemsPerPage;   
    const EstudianteCarga = async () => {
        await axios.get(urlEstudiante)
        .then((res)=>{            
            setEstudiantes(res.data.estudiantes);                   
        })
        .catch((error)=>{
            console.log(error)
        })
    };
    useEffect(()=>{
        EstudianteCarga();
    }, [])    

    if(estudiantes)
    return(
        <>
            <div className="row">
                <div className="container text-center col-sm-12">
                    <div className="row">
                        <div className='col-sm-10'>
                            <h3>Total de estudiantes: <small>{estudiantes?.length} registros encontrados</small></h3>
                        </div>
                        <div className='col-sm-2'>
                            <button type="button" className="btn btn-info" onClick={()=>crearEstudiante()} >
                                Crear Estudiante
                            </button>                                                         
                        </div> 
                    </div>
                    <Paginacion 
                        itemsPerPage={itemsPerPage} 
                        setItemsPerPage={setItemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={totalItems}
                    />
                    <table className="table table-success table-hover table-bordered table-responsive table-striped">
                        <thead>
                            <tr>
                                <th scope="col">NOMBRE</th>  
                                <th scope="col">APELLIDO</th>
                                <th scope="col">EDAD</th>
                                <th scope="col">CORREO ELECTRÓNICO</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiantes.map((estudiante,key)=>(
                                    <Detalle estudiante={estudiante} key={key}/>
                                )).slice(firstIndex,lastIndex)                                
                            }
                        </tbody>
                    </table>

                </div>
            </div>                                    
        </>
    )
}