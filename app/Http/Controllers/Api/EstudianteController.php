<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Estudiante;
use App\Http\Resources\EstudianteResource;
use Illuminate\Support\Facades\DB;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estudiantes =  Estudiante::orderBy('id','Desc')->get();

        return EstudianteResource::collection($estudiantes);   
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'        => 'required',
            'apellido'       => 'required',
            'edad'   => 'required',
            'email'      => 'required',      
        ]);

        $estudiante = Estudiante::create($request->all());
        return EstudianteResource::make($estudiante);
            
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $estudiante=Estudiante::included()->findOrFail($id);
        return EstudianteResource::make($estudiante);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $estudiante=Estudiante::find($id);

        $request->validate([
            'nombre'    => 'required|max:255',
            'apellido'  => 'required|max:255',
            'edad'      => 'required',
            'email'     => 'required|max:255|unique:estudiantes,email,'. $estudiante->id,      
        ]);

        
        $estudiante->update($request->all());

        return EstudianteResource::make($estudiante);
    }

    /**
    * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $estudiante=Estudiante::find($id);
        $estudiante->delete($id);

        return EstudianteResource::make($estudiante);
    }

    public function asignar(Request $request)
    {
        DB::table('curso_estudiante')->insert([
            'curso_id'=>$request->curso_id,
            'estudiante_id'=>$request->estudiante_id,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
    }
}
