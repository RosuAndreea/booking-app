(function (){
    var ApiUrl = window.ApiUrl;
    $detailSide = $('.details-side');

    function profileDetails(companies) {
        $detailSide.append('<p class="company-detail">Company Name: </p>'
                            +'<span class="noedit comp-name">' + companies.name + '</span><input class="edit-input comp-name"/>'
                            +'<p class="company-detail">Email: </p>'
                            +'<span class="noedit comp-email">' + companies.email + '</span><input class="edit-input comp-email"/>'
                            +'<p class="company-detail">Password: </p>'
                            +'<span class="noedit comp-password">' + companies.password + '</span><input class="edit-input comp-password"/>'
                            +"<p class='company-detail'>Address: </p>"
                            +'<span class="noedit comp-address">' + companies.address + '</span><input class="edit-input comp-address"/>'
                            +"<p class='company-detail'>Phone: </p>"
                            +'<span class="noedit comp-phone">' + companies.phone + '</span><input class="edit-input comp-phone"/>'
                            +"<p class='company-detail'>Details: </p>"
                            +'<span class="noedit comp-details">' + companies.details + '</span><input class="edit-input comp-details"/>'
                            +'<button class="edit-profile hvr-radial-in edit noedit">Edit profile</button>'
                            +'<i class="fa fa-floppy-o edit-input edit save-edit" aria-hidden="true"></i>'
                            +'<i class="fa fa-times edit-input edit remove-edit" data-id="{{id}}" aria-hidden="true"></i></td>'
        );
    }

    $.ajax({
        type: "GET",
        url: ApiUrl + 'companies/' + localStorage.companyId,
        success: function (companies){
            console.log('companies ', companies)
            profileDetails(companies);
            
        },
        error: function (err){
            console.log('Err ', err);
            //alert('Error loading services');
        }

    });

    // Upload profile images
    function filePreview(input){
        if(input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e) {
               $('.upload-side + .img').remove();
               $('.upload-side').html('<img src="' + e.target.result +'" class="company-logo upload-images"/>' ); 
            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    $('#file').change(function() {
        filePreview(this);
    });

    // Edit Profile
    $detailSide.delegate('.edit-profile', 'click', function () {
        var $div = $(this).closest('.details-side');
        $div.find('input.comp-name').val( $div.find('span.comp-name').html() );
        $div.find('input.comp-email').val( $div.find('span.comp-email').html() );
        $div.find('input.comp-password').val( $div.find('span.comp-password').html() );
        $div.find('input.comp-address').val( $div.find('span.comp-address').html() );
        $div.find('input.comp-phone').val( $div.find('span.comp-phone').html() );
        $div.find('input.comp-details').val( $div.find('span.comp-details').html() );
        $div.addClass('edit-input');
    });

    $detailSide.delegate('.remove-edit', 'click', function () {
        $(this).closest('.details-side').removeClass('edit-input');
    });

    $detailSide.delegate('.save-edit', 'click', function() {
        var $div = $(this).closest('.details-side');
        var companies = {
           name: $div.find('input.comp-name').val(),
           email: $div.find('input.comp-email').val(),
           password: $div.find('input.comp-password').val(),
           address: $div.find('input.comp-address').val(),
           phone: $div.find('input.comp-phone').val(),
           details: $div.find('input.comp-details').val()
        }; 

        $.ajax({
            type: "PUT",
            url: ApiUrl + 'companies?id=1',
            data: companies,
            success: function(){
                $div.find('span.comp-name').html(companies.name);
                $div.find('span.comp-email').html(companies.email);
                $div.find('span.comp-password').html(companies.password);
                $div.find('span.comp-address').html(companies.address);
                $div.find('span.comp-phone').html(companies.phone);
                $div.find('span.comp-details').html(companies.details);
            },
            error: function (err){
                console.log('Err ', err);
                //alert('Error loading services');
            }
        });
    });
        
})();