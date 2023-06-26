<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;
use App\Http\Resources\CursoResource;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cursos =  Curso::orderBy('id','Desc')->get();

        return CursoResource::collection($cursos);   
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'        => 'required',
            'horario'       => 'required',
            'fechaInicio'   => 'required',
            'fechaFin'      => 'required',      
        ]);

        $curso = Curso::create($request->all());
        return CursoResource::make($curso);
            
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $curso=Curso::included()->findOrFail($id);
        return CursoResource::make($curso);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $curso=Curso::find($id);

        $request->validate([
            'nombre'        => 'required',
            'horario'       => 'required',
            'fechaInicio'   => 'required',
            'fechaFin'      => 'required',      
        ]);

        
        $curso->update($request->all());

        return CursoResource::make($curso);
    }

    /**
    * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $curso=Curso::find($id);
        $curso->delete($id);

        return CursoResource::make($curso);
    }
}
