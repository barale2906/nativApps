import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlAsignar, urlCurso, urlEstudiante} from "../components/Url";
import Swal from "sweetalert2";
import Paginacion from "../components/Paginacion";
export default function AsignarEstudiante(){
    const navegar = useNavigate();
    const volver=()=>{
        navegar('/estudiante');
    }
    const {id} = useParams();
    const [nombre, setNombre]=useState("");
    const [elegido, setElegido]=useState();
    const [estudiantes, setEstudiantes]=useState([]);
    const [busca, setBusca] = useState()
    const [buscados, setBuscados] = useState()

    //parámetros de paginación productos
    const [itemsPerPage, setItemsPerPage]=useState(25);
    const [currentPage, setCurrentPage]=useState(1);
    const totalItems = elegido?.estudiantes.length; //Total de registros a paginar
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex-itemsPerPage;

    const ruta =urlCurso+"/"+id+"?included=estudiantes"
    

    const curso=async()=>{
        await axios.get(ruta)
        .then((res)=>{
            
            setElegido(res.data.data)
            setNombre(res.data.data.nombre)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const estudianteCarga = async () => {
        await axios.get(urlEstudiante)
        .then((res)=>{            
            setEstudiantes(res.data.data);                   
        })
        .catch((error)=>{
            console.log(error)
        })
    }; 

    useEffect(()=>{
        curso();
        estudianteCarga();
    }, []) 

    // carga datos a buscar
    const handleChange=e=>{
        setBusca(e.target.value);
        filtrar(e.target.value)
    }

    // Buscar estudiante segun nombre
    const filtrar=(terminoBusqueda)=>{
        const resultadosBusqueda=estudiantes?.filter((elemento)=>{
            if(elemento.nombre?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            }
        });
        setBuscados(resultadosBusqueda);
    }

    const editarEstudiante = (e)=>{
        
        console.log("evento:",e)
        const existe=elegido?.estudiantes.filter((elemento)=>{
            if(elemento.id===e){
                return elemento;
            }
        });
        if(existe.length>0){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Ya tiene este estudiante`,
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            crearAsignacion(e)
        }

    }

    const crearAsignacion = async(e)=>{

        const date={
            "curso_id":id,
            "estudiante_id":e
        }
        
        await axios.post(urlAsignar,date)
        
        .then((res)=>{ 
            
            curso();
            estudianteCarga();
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
                        <h5>Asignar Estudiantes a: <strong>{nombre}</strong>  tiene: <span className="badge bg-success"> {elegido?.estudiantes.length} estudiantes.</span></h5>
                        <button type="button" className="btn btn-info" onClick={()=>{volver()}}>volver</button>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-success" role="alert">
                            <h5>Buscar Estudiante</h5>
                            <input value={busca} autoFocus onChange={handleChange} type="text" placeholder='Buscar producto' className='form-control'/>                            
                            {
                                busca ?
                                    <table className="table table-info table-hover table-bordered table-responsive table-striped">
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
                                                buscados?.map((busco,key)=>(
                                                    <tr key={key}>
                                                        <td>{busco.nombre}</td>
                                                        <td>{busco.apellido}</td>
                                                        <td>{busco.edad}</td>
                                                        <td>{busco.email}</td>
                                                        <td><button type="button" className="btn btn-success btn-xs" onClick={()=>{editarEstudiante(busco.id)}}>Asignar</button></td>                                        
                                                    </tr>
                                                )).slice(firstIndex,lastIndex)                                
                                            }
                                        </tbody>
                                    </table>
                                :<></>
                            }
                        </div> 
                        { elegido?.estudiantes.length ?
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
                                            <th scope="col">APELLIDO</th>
                                            <th scope="col">EDAD</th>
                                            <th scope="col">CORREO ELECTRÓNICO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            elegido?.estudiantes.map((estudiante,key)=>(
                                                <tr key={key}>
                                                    <td>{estudiante.nombre}</td>
                                                    <td>{estudiante.apellido}</td>
                                                    <td>{estudiante.edad}</td>
                                                    <td>{estudiante.email}</td>                                  
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