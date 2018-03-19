<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Properties extends Model
{
    protected $table = 'properties';

    protected $fillable = ['user_id','property_name','property_type','property_purpose','sale_price','rent_price','address','map_latitude','map_longitude','bathrooms','bedrooms','area','description','featured_image'];
 
	//protected $casts = ['gallery'=>'array'];

    public function getGalleryAttribute($gallery)
    {   

    	if($gallery=='')
    	{
    		return []; 
    	}

    	return json_decode($gallery);
    }

    public function setGalleryAttribute($gallery)
    {
        $this->attributes['gallery'] = json_encode($gallery);
    }
}
