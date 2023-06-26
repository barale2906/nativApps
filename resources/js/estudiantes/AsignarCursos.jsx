import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlAsignar, urlCurso, urlEstudiante } from "../components/Url";
import Swal from "sweetalert2";
import Paginacion from "../components/Paginacion";
export default function AsignarCursos(){
    const navegar = useNavigate();
    const volver=()=>{
        navegar('/estudiante');
    }
    const {id} = useParams();
    const [nombre, setNombre]=useState("");
    const [apellido, setApellido]=useState("");
    const [elegido, setElegido]=useState();
    const [cursos, setCursos]=useState([]);
    const [busca, setBusca] = useState()
    const [buscados, setBuscados] = useState()

    //parámetros de paginación productos
    const [itemsPerPage, setItemsPerPage]=useState(25);
    const [currentPage, setCurrentPage]=useState(1);
    const totalItems = elegido?.cursos.length; //Total de registros a paginar
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex-itemsPerPage;

    const ruta =urlEstudiante+"/"+id+"?included=cursos"
    

    const estudiante=async()=>{
        await axios.get(ruta)
        .then((res)=>{
            
            setElegido(res.data.data)
            setNombre(res.data.data.nombre)
            setApellido(res.data.data.apellido)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

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
        estudiante();
        cursoCarga();
    }, []) 

    // carga datos a buscar
    const handleChange=e=>{
        setBusca(e.target.value);
        filtrar(e.target.value)
    }

    // Carga productos enconstrados según parámetros
    const filtrar=(terminoBusqueda)=>{
        const resultadosBusqueda=cursos?.filter((elemento)=>{
            if(elemento.nombre?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            }
        });
        setBuscados(resultadosBusqueda);
    }

    const editarEstudiante = (e)=>{
        
        console.log("evento:",e)
        const existe=elegido?.cursos.filter((elemento)=>{
            if(elemento.id===e){
                return elemento;
            }
        });
        if(existe.length>0){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Ya esta siguiendo este curso`,
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            crearAsignacion(e)
        }

    }

    const crearAsignacion = async(e)=>{

        const date={
            "curso_id":e,
            "estudiante_id":id
        }
        
        await axios.post(urlAsignar,date)
        
        .then((res)=>{ 
            
            estudiante();
            cursoCarga();
            setBusca();
            setBuscados();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Haz hecho la asignación correctamente`,
                showConfirmButton: false,
                timer: 1500
            })

            
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    return(
        <div className="row">
            <div className="container text-center alert alert-primary col-sm-12 mt-4" role="alert">
                <div className="card">
                    <div className="card-header">
                        <h5>Asignar Cursos a: <strong>{nombre} {apellido}</strong>  esta en: <span className="badge bg-success">en {elegido?.cursos.length} cursos.</span></h5>
                        <button type="button" className="btn btn-info" onClick={()=>{volver()}}>volver</button>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-success" role="alert">
                            <h5>Buscar Curso</h5>
                            <input value={busca} autoFocus onChange={handleChange} type="text" placeholder='Buscar producto' className='form-control'/>                            
                            {
                                busca ?
                                    <table className="table table-info table-hover table-bordered table-responsive table-striped">
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
                                                buscados?.map((busco,key)=>(
                                                    <tr key={key}>
                                                        <td>{busco.nombre}</td>
                                                        <td>{busco.horario}</td>
                                                        <td>{busco.fechaInicio}</td>
                                                        <td>{busco.fechaFin}</td>
                                                        <td><button type="button" className="btn btn-success btn-xs" onClick={()=>{editarEstudiante(busco.id)}}>Asignar</button></td>                                        
                                                    </tr>
                                                )).slice(firstIndex,lastIndex)                                
                                            }
                                        </tbody>
                                    </table>
                                :<></>
                            }
                        </div> 
                        { elegido?.cursos.length ?
                            <>                        
                                <Paginacion 
                                    itemsPerPage={itemsPerPage} 
                                    setItemsPerPage={setItemsPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalItems={totalItems}
                                />
                                <table className="table table-info table-hover table-bordered table-responsive table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">NOMBRE</th>  
                                            <th scope="col">HORARIO</th>
                                            <th scope="col">INICIO</th>
                                            <th scope="col">FIN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            elegido?.cursos.map((curso,key)=>(
                                                <tr key={key}>
                                                    <td>{curso.nombre}</td>
                                                    <td>{curso.horario}</td>
                                                    <td>{curso.fechaInicio}</td>
                                                    <td>{curso.fechaFin}</td>                                        
                                                </tr>
                                            )).slice(firstIndex,lastIndex)                                
                                        }
                                    </tbody>
                                </table>                        
                            </>:<></>
                        }
                    </div>                                        
                </div>
            </div>
        </div>
    )
}