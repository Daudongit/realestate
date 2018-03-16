@extends("admin.admin_app")

@section("content")
<div id="main">
	<div class="page-header">	 
		<h2>Inquiries</h2>
	</div>
	@if(Session::has('flash_message'))
        <div class="alert alert-success">
            <button type="button" class="close" data-dismiss="alert" 
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
            </button>
            {{ Session::get('flash_message') }}
        </div>
	@endif
    <div class="panel panel-default panel-shadow">
        <div class="panel-body"> 
            <table id="data-table" cellspacing="0" width="100%"
                    class="table table-striped table-hover dt-responsive">
                <thead>
    	            <tr>
    	                <th>Property Name</th>
    	                <th>Name</th>
    	                <th>Email</th>
    	                <th>Phone</th>
    	                <!-- <th>Message</th> -->  
    	                <th class="text-center width-100">Action</th>
    	            </tr>
                </thead>
                <tbody>
                @foreach($inquirieslist as $i => $inquiries)
             	   <tr>
                        <!-- <td>{{ $inquiries->property_id }}</td> -->
                        <td>{{ $inquiries->property->property_name}}</td>
                        <td>{{ $inquiries->name }}</td>
                        <td>{{ $inquiries->email }}</td>
                        <td>{{ $inquiries->phone }}</td>
                        <!-- <td>{{ $inquiries->message }}</td> -->
                        <td class="text-center">
                        	<a href="{{ url('admin/inquiries/delete/'.$inquiries->id) }}" 
                                class="btn btn-default btn-rounded">
                                <i class="md md-delete"></i>
                            </a>
                            <a href="javascript:show_message('<?php echo 'world';?>');" 
                                class="btn btn-default btn-rounded">
                                <i class="md md-info"></i>
                            </a>    
                        </td>
                    </tr>
                    <!-- <tr>
                        <td colspan="5" style="padding:15px 50px 0px;background:#f9f9f9;">{{ $inquiries->message }}</td>
                    </tr> -->
                @endforeach 
                </tbody>
            </table>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<div id="myModal" class="modal fade" tabindex="-1" 
     role="dialog"  style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                Hekko there
                <div class="message">
                    
                </div>
            </div>
        </div>    
    </div>    
</div>
<script type="text/javascript">
    function show_message(argument) {
        jQuery('#myModal .message').html(argument);
        jQuery('#myModal').modal('show');
    }
</script>
@endsection