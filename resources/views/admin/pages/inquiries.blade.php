
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
            <table id="data-table-inquiry" cellspacing="0" width="100%"
                    class="table table-striped table-hover dt-responsive">
                <thead>
    	            <tr>
    	                <th>Property Name</th>
    	                <th>Name</th>
    	                <th>Email</th>
    	                <th>Phone</th>
    	                <th style="display: none;">Message</th>  
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
                        <td style="display: none;">{{ $inquiries->message }}</td>
                        <td class="text-center">
                        	<a href="javascript:confirm_delete('{{ url('admin/inquiries/delete/'.$inquiries->id) }}');" 
                                class="btn btn-default btn-rounded">
                                <i class="md md-delete"></i>
                            </a>    
                        </td>
                    </tr>
                @endforeach 
                </tbody>
            </table>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<script type="text/javascript">
	var datails_open = '{{URL::asset("admin_assets/image/details_open.png")}}',
		datails_close = '{{URL::asset("admin_assets/image/details_close.png")}}';
</script>
<script type="text/javascript" 
		src="{{URL::asset('admin_assets/js/jquery.dcjqaccordion.2.7.min.js')}}">
</script>
<script type="text/javascript" src="{{URL::asset('admin_assets/js/inquiry.js')}}">
     
  </script>
@endsection
