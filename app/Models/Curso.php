<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ApiTrait;

class Curso extends Model
{
    use HasFactory, ApiTrait;

    protected $fillable = [
        'nombre',
        'horario',
        'fechaInicio',
        'fechaFin',
    ];

    protected $allowIncluded = ['estudiantes'];

    //Relación muchos a muchos
    public function estudiantes() 
    {
        return $this->belongsToMany(Estudiante::class);
    }
}