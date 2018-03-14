
jQuery(document).ready(function(){
    var feature_img_progress = 0;
    var pre_loader;
    var post_loader;

    jQuery('#photoimg').change(function(){
        var files = $("#photoimg")[0].files;
        handleFileUpload(files,$("#dragandrophandler"));
    });
});


function sendFileToServer(formData,status,feature_img_progress)
{
    var property_id = jQuery('#property_id').val(),
        uploadURL = uploadURI+'/'+property_id,
        extraData ={}; //Extra Data.
    var jqXHR=$.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = (position / total * 100);
                            //console.log(percent);
                            //alert(percent);
                            var percentVal = percent+'%';
                            jQuery('#myModal .bar').width(percentVal);
                            jQuery('#myModal .percent').html(percentVal); 
                        }
                        //status.setProgress(percent);
                    }, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        beforeSend: function() {
            jQuery('#myModal').modal('show');
            var percentVal = '0%';
            jQuery('#myModal .bar').width(percentVal);
            jQuery('#myModal .percent').html(percentVal);   
        },
        success: function(data){
         
            var percentVal = '100%';
            jQuery('#myModal .bar').width(percentVal);
            jQuery('#myModal .percent').html(percentVal);

            //var response = jQuery.parseJSON(data);
            var response = data;
            if(response.error==0)
            {
                 
                 var target = jQuery('#photoimg').attr('target'),
                     input  = jQuery('#photoimg').attr('input'),

                    image_url = gallery_path+'/'+response.name+'-b.jpg',
                    html = '<li style="margin:10px 10px 0 0;overflow:hidden">'+
                    '<input type="hidden" name="'+input+'[]" value="'+response.name+'" />'+
                    '<image src="'+image_url+'" style="height:100%"/>'+
                    '<div style="clear:both"></div>'+
                    '<div class="remove-image" data-imgname="'+response.name+'" onclick="removeUpload(this);">X</div>'+
                    '</li>';
                jQuery( target ).prepend(html);
                jQuery(target+'-input').val 
            }

            jQuery('#myModal').modal('hide');
        
            //alert('end upload');
        },
        error:function(err)
        {
            console.log(err.responseText);
            alert(err.responseText);
        }

    });
 
    //status.setAbort(jqXHR);
}
 

function handleFileUpload(files,obj)
{
   for (var i = 0; i < files.length; i++)
   {    var token = document.head.querySelector('meta[name="csrf-token"]');
        var fd = new FormData();
        fd.append('_token', token.content);
        fd.append('photoimg', files[i]);
        var feature_img_progress = 0;
        sendFileToServer(fd,status,feature_img_progress);
 
   }
}

jQuery(document).ready(function(){
    
    jQuery('#photoimg').attr('target','.multiple-uploads');
    jQuery('#photoimg').attr('input','gallery');
    var obj = $("#dragandrophandler");
    obj.on('dragenter', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '2px solid #0B85A1');
    });

    obj.on('dragover', function (e)
    {
         e.stopPropagation();
         e.preventDefault();
    });

    obj.on('drop', function (e)
    {
     
         $(this).css('border', '2px dotted #0B85A1');
         e.preventDefault();
         var files = e.originalEvent.dataTransfer.files;
         //console.log(files);
         //We need to send dropped files to Server
         handleFileUpload(files,obj);
    });

    $(document).on('dragenter', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
    });

    $(document).on('dragover', function (e)
    {
      e.stopPropagation();
      e.preventDefault();
      obj.css('border', '2px dotted #0B85A1');
    });
    
    $(document).on('drop', function (e)
    {
        e.stopPropagation();
        e.preventDefault();
    });

    jQuery('.multiple-uploads > .add-image').click(function(){
        jQuery('#photoimg').attr('target','.multiple-uploads');
        jQuery('#photoimg').attr('input','gallery');
        jQuery('#photoimg').click();
    });

    jQuery( ".multiple-uploads" ).sortable();
});

function removeUpload(item){
    var imgname=jQuery(item).attr('data-imgname'),
        input = '<li style="overflow:hidden">'+
                    '<input type="hidden" name="removed_uploads[]" value="'+imgname+'" />'+
                    '</li>';
    jQuery('#removed-upload').prepend(input);
    jQuery(item).parent().remove();
}

