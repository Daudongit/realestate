<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $guarded = [];

    public function property()
	{
		$this->hasMany(properties::class);
	}
}
