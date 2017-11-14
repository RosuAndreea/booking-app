(function (){
    var $officeData = $('tbody');
    var $offices = $('.offices-data');
    var $offName = $('#add-off-name');
    var $offEmail = $('#add-off-email');
    var $offAddress = $('#add-off-address');
    var $offPhone = $('#add-off-phone');
    var ApiUrl = window.ApiUrl;
 
 
    function addOffice (office) {
        $officeData.append('<tr class="offices-data" data-id="{{id}}">'
                        +'<td><span>' + office.id + '</span></td>' 
                        +'<td><span class="noedit off-name">' + office.officeName + '</span><input class="edit-input off-name"/></td>' 
                        +'<td><span class="noedit email">' + office.officeEmail + '</span><input class="edit-input email"/></td>'
                        +'<td><span class="noedit address">' + office.officeAddress + '</span><input class="edit-input address"/></td>'
                        +'<td><span class="noedit phone">' + office.officePhone + '</span><input class="edit-input phone"/></td>'
                        +'<td><span class="noedit view"><a href="services.html"><button class="more">View more</button></a></td>'
                        +'<td><i class="fa fa-pencil edit noedit edit-off" aria-hiddesn="true"></i>'
                        +'<i class="fa fa-trash edit remove-off" aria-hidden="true" data-id="{{id}}"></i>'
                        +'<i class="fa fa-floppy-o edit-input edit save-off" aria-hidden="true"></i>'
                        +'<i class="fa fa-times edit-input edit remove-edit" aria-hidden="true"></i></td>'
                        +'</tr>'
         );
    }
 
 // take the data from db/offices
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
             //alert('Error loading offices');
         }
 
     });
 
 // add offices
     $('.add-btn').on('click',function (){
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
                 alert('You create a new office with success!');
             },
             error: function () {
                 alert('Error saving the office');
             }
         });
     });
 
 
 //    delete offices
     $officeData.delegate('.remove-off','click', function(){
         var $tr = $(this).closest('.office-data');
         var self = this;
         console.log('fer');
 
         $.ajax({
             type: 'DELETE',
             url: ApiUrl + 'offices' + $(this).attr('data-id'),
             success: function (){
                 $(self);
                 $tr.fadeOut(300, function(){
                     $(this).remove();
                 });
             }
         });
 
     });   
     
     // edit office
     $officeData.delegate('.edit-off','click', function(){
         var $tr = $(this).closest('.offices-data');
         $tr.find('input.off-name').val( $tr.find('span.off-name').html() );
         $tr.find('input.off-email').val( $tr.find('span.off-email').html() );
         $tr.find('input.off-address').val( $tr.find('span.off-address').html() );
         $tr.find('input.off-phone').val( $tr.find('span.off-phone').html() );
         $tr.addClass('edit-input');
         console.log('hi');
         
     });   
      
     // remove edit
     $officeData.delegate('.remove-edit','click', function(){
         $(this).closest('.offices-data').removeClass('edit-input');
     });  
 
     // save edit
     $officeData.delegate('.save-off', 'click', function () {
         var $tr = $(this).closest('.offices-data');
         var offices = {
             officeName: $tr.find('input.off-name').val(),
             officeEmail: $tr.find('input.off-email').val(),
             officeAddress: $tr.find('input.off-address').val(),
             officePhone: $tr.find('input.off-phone').val()
         };
         $.ajax({
             type: "PUT",
             url: ApiUrl + 'offices' + $tr.attr('data-id'),
             data: offices,
             success: function (newOffice) {
                 $tr.find('span.off-name').html(office.officeName);
                 $tr.find('span.email').html(office.officeEmail);
                 $tr.find('span.address').html(office.officeAddress);
                 $tr.find('span.phone').html(office.officePhone);
                 $tr.removeClass('edit-input');
                 alert('You create a new office with success!');
             },
             error: function () {
                 alert('Error updating office');
             }
         });
     });
})();