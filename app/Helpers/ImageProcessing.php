<?php

namespace App\Helpers;

use App\Properties;

use Intervention\Image\Facades\Image; 

class ImageProcessing  
{	
	private $tmpFilePath = 'upload/gallery/';

	public function process($image,$name)
	{
		if($image){

            $hardPath =  str_slug($name, '-').'-'.md5(rand(0,99999));
			
            $img = Image::make($image);

            $img->fit(640, 425)->save($this->tmpFilePath.$hardPath.'-b.jpg');
			 
            return $hardPath;      
        }
	}

	public function reset($names)
	{	
		if(!is_array($names))
		{	
			$names=array($names);
		}

		foreach ($names as $name)
		{
			\File::delete(public_path() .'/'.$this->tmpFilePath.$name.'-b.jpg');
		}
		
		return $this;
	}
}
