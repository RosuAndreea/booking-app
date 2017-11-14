(function (){
    var $officeData = $('tbody');
    var $offices = $('.offices-data');
    var $offName = $('#add-off-name');
    var $offEmail = $('#add-off-email');
    var $offAddress = $('#add-off-address');
    var $offPhone = $('#add-off-phone');
    var ApiUrl = window.ApiUrl;
 
 
    function addOffice (office) {
        $offices.append('<td><span>' + office.id + '</span></td>' 
                        +'<td><span class="noedit off-name">' + office.officeName + '</span><input class="edit-input off-name"/></td>' 
                        +'<td><span class="noedit email">' + office.officeEmail + '</span><input class="edit-input email"/></td>'
                        +'<td><span class="noedit address">' + office.officeAddress + '</span><input class="edit-input address"/></td>'
                        +'<td><span class="noedit phone">' + office.officePhone + '</span><input class="edit-input phone"/></td>'
                        +'<td><span class="noedit view"><a href="services.html"><button class="more">View more</button></a></td><td>'
                        +'<td><i class="fa fa-pencil edit noedit edit-off" aria-hiddesn="true"></i>'
                        +'<i class="fa fa-trash edit remove-off" aria-hidden="true" data-id="{{id}}"></i>'
                        +'<i class="fa fa-floppy-o edit-input edit save-off" aria-hidden="true"></i>'
                        +'<i class="fa fa-times edit-input edit remove-edit" aria-hidden="true"></i>'
         );
    }
 
 // take the data from db/services
     $.ajax({
         type: "GET",
         url: ApiUrl + 'offices',
         // headers: {
         //     "Access-Control-Allow-Origin": "*"
         // },
         success: function (offices){
             console.log('offices ', offices)
             $.each(offices, function (i, office){
                 addOffice(office);
             });
         },
         error: function (err){
             console.log('Err ', err);
             //alert('Error loading services');
         }
 
     });
 
 // add service
     $('.add').on('click',function (){
         var offices = {
             officeName: $offName.val(),
             officeEmail: $offEmail.val(),
             officeAddress: $offAddress.val(),
             officePhone: $offPhone.val(),

         };
 
         $.ajax({
             type: "POST",
             url: ApiUrl + 'offices',
             data: offices,
             success: function (newOffice) {
                 addOffice(newOffice);
                 alert('You create a new service with success!');
             },
             error: function () {
                 alert('Error saving the service');
             }
         });
     });
 
 
 //    delete services
     $offices.delegate('.remove-off','click', function(){
         var $td = $(this).closest('.office-data');
         var self = this;
         console.log('fer');
 
         $.ajax({
             type: 'DELETE',
             url: ApiUrl + 'offices' + $(this).attr('data-id'),
             success: function (){
                 $(self);
                 $td.fadeOut(300, function(){
                     $(this).remove();
                 });
             }
         });
 
     });   
     
     // edit services
     $offices.delegate('.edit-off','click', function(){
         var $td = $(this).closest('.offices-data');
         $td.find('input.off-name').val( $td.find('span.off-name').html() );
         $td.find('input.off-email').val( $td.find('span.off-email').html() );
         $td.find('input.off-address').val( $td.find('span.off-address').html() );
         $td.find('input.off-phone').val( $td.find('span.off-phone').html() );
         $td.addClass('edit-input');
         console.log('hi');
         
     });   
      
     // remove edit
     $offices.delegate('.remove-edit','click', function(){
         $(this).closest('.offices-data').removeClass('edit-input');
     });  
 
     // save edit
     $offices.delegate('.save-off', 'click', function () {
         var $td = $(this).closest('.offices-data');
         var offices = {
             officeName: $td.find('input.off-name').val(),
             officeEmail: $td.find('input.off-email').val(),
             officeAddress: $td.find('input.off-address').val(),
             officePhone: $td.find('input.off-phone').val()
         };
         $.ajax({
             type: "PUT",
             url: ApiUrl + 'offices' + $td.attr('data-id'),
             data: offices,
             success: function (newOffice) {
                 $td.find('span.off-name').html(office.officeName);
                 $td.find('span.email').html(office.officeEmail);
                 $td.find('span.address').html(office.officeAddress);
                 $td.find('span.phone').html(office.officePhone);
                 $td.removeClass('edit-input');
                 alert('You create a new service with success!');
             },
             error: function () {
                 alert('Error updating service');
             }
         });
     });
})();