<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CursoResource;

class EstudianteResource extends JsonResource
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
            'apellido'=>$this->apellido,
            'edad'=>$this->edad,
            'email'=>$this->email,
            'cursos' => CursoResource::collection($this->whenLoaded('cursos'))
        ];
    }
}
