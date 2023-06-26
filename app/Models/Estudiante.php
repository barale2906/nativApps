<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ApiTrait;

class Estudiante extends Model
{
    use HasFactory, ApiTrait;

    protected $fillable = [
        'nombre',
        'apellido',
        'edad',
        'email',
    ];

    protected $allowIncluded = ['cursos'];

    //Relación muchos a muchos
    public function cursos()
    {
        return $this->belongsToMany(Curso::class);
    }

}
