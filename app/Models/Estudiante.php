<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'edad',
        'email',
    ];

    //Relación muchos a muchos
    public function cursos() : BelongsToMany
    {
        return $this->belongsToMany(Curso::class);
    }

}
