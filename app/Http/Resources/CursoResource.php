<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EstudianteResource;

class CursoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'nombre'=>$this->nombre,
            'horario'=>$this->horario,
            'fechaInicio'=>$this->fechaInicio,
            'fechaFin'=>$this->fechaFin,
            'estudiantes' => EstudianteResource::collection($this->whenLoaded('estudiantes'))
        ];
    }
}
