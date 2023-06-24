<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'horario',
        'fechaInicio',
        'fechaFin',
    ];

    //Relación muchos a muchos
    public function estudiantes() : BelongsToMany
    {
        return $this->belongsToMany(Estudiante::class);
    }
}