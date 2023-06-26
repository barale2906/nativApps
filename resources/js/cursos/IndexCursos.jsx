import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Detalle from './Detalle';
import Paginacion from '../components/Paginacion';
import { urlCurso } from '../components/Url';
import { useNavigate } from 'react-router-dom';


export default function IndexCursos(){
    const [cursos, setCursos]=useState([]);
    const navegar = useNavigate();
    const crearCurso=()=>{
        navegar('/curso/nuevo');
    }

    //parámetros de paginación productos
    const [itemsPerPage, setItemsPerPage]=useState(25);
    const [currentPage, setCurrentPage]=useState(1);
    const totalItems = cursos?.length; //Total de registros a paginar
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex-itemsPerPage;   
    const cursoCarga = async () => {
        await axios.get(urlCurso)
        .then((res)=>{            
            setCursos(res.data.data);                   
        })
        .catch((error)=>{
            console.log(error)
        })
    };
    useEffect(()=>{
        cursoCarga();
    }, [])    

    if(cursos)
    return(
        <>
            <div className="row">
                <div className="container text-center col-sm-12">
                    <div className="row">
                        <div className='col-sm-10'>
                            <h3>Total de cursos: <small>{cursos?.length} registros encontrados</small></h3>
                        </div>
                        <div className='col-sm-2'>
                            <button type="button" className="btn btn-info" onClick={()=>crearCurso()} >
                                Crear Curso
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
                                <th scope="col">HORARIO</th>
                                <th scope="col">INICIO</th>
                                <th scope="col">FIN</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cursos.map((curso,key)=>(
                                    <Detalle curso={curso} key={key}/>
                                )).slice(firstIndex,lastIndex)                                
                            }
                        </tbody>
                    </table>

                </div>
            </div>                                    
        </>
    )
}