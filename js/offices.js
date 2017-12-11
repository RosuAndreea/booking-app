(function (){
    var $officeData = $('tbody');
    var $offices = $('.offices-data');
    var $offName = $('#add-off-name');
    var $offEmail = $('#add-off-email');
    var $offAddress = $('#add-off-address');
    var $offPhone = $('#add-off-phone');
    var $selectAnOffice = $('.list-group');
    var $detailsWrapper = $('.office-details');
    var $companyData = $('.booking-office');
    var ApiUrl = window.ApiUrl;
    
    //Render the booking details
    $('#select-comp').delegate('#selectOff','click', function() {
        $companyData.append(
          '<div class="company-booking">'
          +'<span class = "serv-book-left">Company name: </span>'
          +'<span class = "serv-book-right">'+ myStore.companyName + "</span>"
          +'<span class = "serv-book-left">Details: </span>'
          +'<span class = "serv-book-right">' + myStore.companyDetails + "</span>"
          +'</div>'
        );
    });

    // Take the offices for the booking select office
    function renderOffices (office){
        $selectAnOffice.append(
            '<a class="list-group-item" onclick="selectOffice(\''+ office.id +  '\',\'' + office.officeEmail + '\',\'' + office.officeAddress +  '\',\'' + office.officePhone + '\',\'' + office.officeName +'\')">' + office.officeName + '</a>'   
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

    window.selectOffice = function(officeId, officeEmail, officeAddress, officePhone,officeName) {
        window.myStore.officeId = officeId;
        window.myStore.officeEmail = officeEmail;
        window.myStore.officeAddress = officeAddress;
        window.myStore.officePhone = officePhone;
        window.myStore.officeName = officeName;
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
            '<tr class="offices-data">'
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
    $.ajax({
        type: "GET",
        url: ApiUrl + 'offices?companyId=' + localStorage.companyId,
        success: function (offices){
            console.log('offices ', offices)
            $.each(offices, function (i, office){
               addOffice(office);
               localStorage.setItem('officeId',office.id);
            });
            
        },
        error: function (err){
            console.log('Err ', err);
            //alert('Error loading services');
        }

    });

 // add offices
    $('.add-btn').on('click',function (){
        var offices = {
            officeName: $offName.val(),
            officeEmail: $offEmail.val(),
            officeAddress: $offAddress.val(),
            officePhone: $offPhone.val(),
            companyId: localStorage.companyId
        };

        $.ajax({
            type: "POST",
            url: ApiUrl + 'offices?companyId=' + localStorage.companyId,
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
        var $tr = $(this).closest('.offices-data');
        var self = this;
 
        $.ajax({
            type: 'DELETE',
            url: ApiUrl + 'offices/',
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
        $tr.find('input.email').val( $tr.find('span.email').html() );
        $tr.find('input.address').val( $tr.find('span.address').html() );
        $tr.find('input.phone').val( $tr.find('span.phone').html() );
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
            officeEmail: $tr.find('input.email').val(),
            officeAddress: $tr.find('input.address').val(),
            officePhone: $tr.find('input.phone').val()
        };
        $.ajax({
            type: "PUT",
            url: ApiUrl + 'offices/',
            data: offices,
            success: function () {
                $tr.find('span.off-name').html(offices.officeName);
                $tr.find('span.email').html(offices.officeEmail);
                $tr.find('span.address').html(offices.officeAddress);
                $tr.find('span.phone').html(offices.officePhone);
            },
            error: function (err) {
                console.log('Err ', err);
                alert('Error updating office');
            }
        });
        $tr.removeClass('edit-input');
    });
})();