<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Controllers\Controller;

use App\Properties;

use App\Helpers\ImageProcessing;

class GalleryController extends Controller
{   
    public function __construct()
    {
        $this->middleware('auth');       
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Properties $property)
    {   
        //return $property->gallery;
        return view('admin.pages.gallery',compact('property'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,ImageProcessing $imgprocess,Properties $property)
    {
        //$imgprocess->reset($property->gallery);

        $imgprocess->reset($request->removed_uploads);

        if(!is_null($request->gallery))
        {
            $property->gallery = $request->gallery;
        }
        else
        {
            $property->gallery = [];
        }

        $property->save();

        return redirect('/admin/properties');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,ImageProcessing $imgprocess,Properties $property)
    {
        //$imgprocess->reset($property->gallery);
        
        if($request->hasFile('photoimg'))
        {
            $imgUrl=$imgprocess->process($request->file('photoimg'),$property->property_name);

            return ['name'=>$imgUrl,'error'=>0];   
        }
        
        return ['error'=>'err occur','name'=>''];
        //return 'Hello ';
    }
}
