@extends("admin.admin_app")

@section("content")
<link rel="stylesheet" href="{{ URL::asset('admin_assets/jquery-ui/jquery-ui.css') }}">
<link rel="stylesheet" href="{{ URL::asset('admin_assets/css/gallery.css') }}">
<div id="main">
	<div class="page-header">
		
		<div class="pull-right">
			<a href="{{URL::to('admin/properties')}}" class="btn btn-primary">Property List <i class="fa fa-plus"></i></a>
		</div>
		<h2>Gallery</h2>
	</div>
     
	<div class="panel panel-default panel-shadow">
	    <div class="panel-body">
	        <div class="container">
	        	<form method="post" action="<?= URL::to('admin/gallery/save').'/'.$property->id;?>">
	        		<input type="hidden" name="property_id" id="property_id" value="<?= $property->id;?>">
	        		{{csrf_field()}}
	        		<div class="row">
	        			<div class="form-group">
				            <label class="col-md-1 control-label">{{$property->property_name}}</label>
				            <div class="col-md-10">
				                <!-- <?php $gallery //= (isset($_POST['gallery']))?$_POST['gallery']:$property->gallery;?> -->

				                <?php $gallery = $property->gallery;?>
				                <ul class="multiple-uploads">
				                    <?php foreach ($gallery as $item){ ?>
				                    <li class="gallery-img-list">
				                      <input type="hidden" name="gallery[]" value="<?= $item;?>" />
				                      <img src="<?= URL::asset('upload/gallery/').'/'.$item.'-b.jpg';?>" />
				                      <div class="remove-image" data-imgname="<?= $item;?>" onclick="removeUpload(this);">X</div>
				                    </li>
				                    <?php }?>
				                    <li class="add-image" id="dragandrophandler">+</li>
				                </ul> 
				                <ul id="removed-upload"></ul>      
				                <div class="clearfix"></div>
				                <span class="gallery-upload-instruction">
				                	NB: you can drag drop to reorder the gallery photos.
				            	</span>
				                <div class="clearfix clear-top-margin"></div>
				            </div>
				        </div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6 col-md-offset-2 text-center">
	        				<button type="submit" class="btn btn-primary">Save</button>
	        			</div>
	        		</div>
	        	</form>
	        </div> 
	    </div>
	    <div class="clearfix"></div>
	</div>
</div>
<script type="text/javascript">
	var	uploadURI = '<?= URL::to("/admin/gallery/upload/");?>',
		gallery_path  = '<?= URL::asset('upload/gallery/');?>';
</script>
<script src="{{ URL::asset('admin_assets/jquery-ui/jquery-ui.js') }}"></script>
<form id="uploader-form" action="" method="post" enctype="multipart/form-data" style="display:none">
    <input type="file" name="photoimg[]" id="photoimg" style="height:auto;" multiple>
</form>

<form id="featured-uploader-form" action="" method="post" enctype="multipart/form-data" style="display:none">
    <input type="file" name="photoimg" id="photoimg_featured" style="height:auto;" >
</form>

<div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">

    <div class="modal-dialog">

        <div class="modal-content">
            <div class="modal-body">
                <div class="progress span3 progress-bar-span">
                    <div class="bar"></div >
                    <div class="percent">0%</div >
                </div>
            </div>
        </div>    
    </div>    
</div>    


<style type="text/css">
.bar{
    background: none repeat scroll 0 0 #78a;
    border-radius: 3px;
    height: 17px;
}
</style>

<script type="text/javascript" src="{{ URL::asset('admin_assets/js/gallery.js')}}"></script>
@endsection