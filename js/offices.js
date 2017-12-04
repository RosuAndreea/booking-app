(function (){
    var $officeData = $('tbody');
    var $offices = $('.offices-data');
    var $offName = $('#add-off-name');
    var $offEmail = $('#add-off-email');
    var $offAddress = $('#add-off-address');
    var $offPhone = $('#add-off-phone');
    var $selectAnOffice = $('.list-group');
    var $detailsWrapper = $('.office-details');
    var $companyData = $('.booking-summary');
    var ApiUrl = window.ApiUrl;
    
    //Render the booking details
    $('#select-comp').delegate('#selectOff','click', function() {
        $companyData.append(
          '<div class="company-booking">'
          +'<span class = "comp-left-side">Company name: </span>'
          +'<span class = "comp-right-side">'+ myStore.companyName + "</span>"
          +'<span class = "comp-left-side">Details: </span>'
          +'<span class = "comp-right-side">' + myStore.companyDetails + "</span>"
          +'</div>'
        );
    });

    // Take the offices for the booking select office
    function renderOffices (office){
        $selectAnOffice.append(
            '<a class="list-group-item" onclick="selectOffice(\''+ office.id +  '\',\'' + office.officeEmail + '\',\'' + office.officeAddress +  '\',\'' + office.officePhone +'\')">' + office.officeName + '</a>'   
        );
    }
    // Take the details about the selected office for the booking select office
    function showOfficeDetails (id, email, address, phone) {
        $detailsWrapper.empty();
        $detailsWrapper.append(
            '<p class = "company-detail">Email:</p>'
            +'<p>' + email + '</p>'
            +'<p class = "company-detail">Phone:</p>'
            +'<p>' + phone + '</p>'
            +'<p class = "company-detail">Address:</p>'
            +'<p>' + address + '</p>'
            +'<button id="selectServ" onclick="selectTheService(' + id + ')">Next</button>'
        );
    }

    window.selectOffice = function(officeId, officeEmail, officeAddress, officePhone) {
        window.myStore.officeId = officeId;
        window.myStore.officeEmail = officeEmail;
        window.myStore.officeAddress = officeAddress;
        window.myStore.officePhone = officePhone;
        showOfficeDetails(officeId, officeEmail, officeAddress, officePhone);
    };

    window.selectTheService = function (id) {
        window.getServices(id);
    }
 
 // take the data from db/offices
    window.getOffices = function(companyId){
        $.ajax({
            type: "GET",
            url: ApiUrl + 'offices?companyId=' + companyId,
            success: function (offices){
                console.log('offices ', offices)
                $.each(offices, function (i, office){
                   renderOffices(office);
                   addOffice(office);
                });
            },
            error: function (err){
                console.log('Err ', err);
                 //alert('Error loading offices');
            }
        });
    }
 


    // ------------------- Profile-admin----------------------
    
    function addOffice (office) {
        $officeData.append(
            '<tr class="offices-data" data-id="{{id}}">'
            +'<td class = "count"></td>' 
            +'<td><span class="noedit off-name">' + office.officeName + '</span><input class="edit-input off-name"/></td>' 
            +'<td><span class="noedit email">' + office.officeEmail + '</span><input class="edit-input email"/></td>'
            +'<td><span class="noedit address">' + office.officeAddress + '</span><input class="edit-input address"/></td>'
            +'<td><span class="noedit phone">' + office.officePhone + '</span><input class="edit-input phone"/></td>'
            +'<td><span class="noedit view"><a href="services.html"><button class="more">View more</button></a></td>'
            +'<td><i class="fa fa-pencil edit noedit edit-off" aria-hiddesn="true"></i>'
            +'<i class="fa fa-trash edit remove-off" aria-hidden="true"></i>'
            +'<i class="fa fa-floppy-o edit-input edit save-off" aria-hidden="true"></i>'
            +'<i class="fa fa-times edit-input edit remove-edit" aria-hidden="true"></i></td>'
            +'</tr>'
        );
    }

 // add offices
    $('.add-btn').on('click',function (){
        var offices = {
            officeName: $offName.val(),
            officeEmail: $offEmail.val(),
            officeAddress: $offAddress.val(),
            officePhone: $offPhone.val()
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
            url: ApiUrl + 'offices/' + $tr.attr('data-id'),
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