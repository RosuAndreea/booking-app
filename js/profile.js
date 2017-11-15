(function (){
    var ApiUrl = window.ApiUrl;
    $detailSide = $('.details-side');

    function profileDetails(data) {
        $detailSide.append('<p class="company-detail">Company Name: </p>'
                            +'<span class="noedit comp-name">' + data.name + '</span><input class="edit-input comp-name"/>'
                            +'<p class="company-detail">Email: </p>'
                            +'<span class="noedit comp-email">' + data.email + '</span><input class="edit-input comp-email"/>'
                            +'<p class="company-detail">Password: </p>'
                            +'<span class="noedit comp-password">' + data.password + '</span><input class="edit-input comp-password"/>'
                            +"<p class='company-detail'>Address: </p>"
                            +'<span class="noedit comp-address">' + data.address + '</span><input class="edit-input comp-address"/>'
                            +"<p class='company-detail'>Phone: </p>"
                            +'<span class="noedit comp-phone">' + data.phone + '</span><input class="edit-input comp-phonel"/>'
                            +"<p class='company-detail'>Details: </p>"
                            +'<span class="noedit comp-details">' + data.details + '</span><input class="edit-input comp-details"/>'
                            +'<button class="edit-profile hvr-radial-in">Edit profile</button>'
        );
    }

    $.ajax({
        type: "GET",
        url: ApiUrl + 'companies',
        success: function (companies){
            console.log('companies ', companies)
            $.each(companies, function (i, companies){
                profileDetails(companies);
            });
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
    $('.edit-profile').on('click', function () {
        var $div = $(this).closest('.details-side');
        $div.find('input.comp-name').val( $div.find('span.comp-name').html() );
        $div.find('input.comp-email').val( $div.find('span.comp-email').html() );
        $div.find('input.comp-password').val( $div.find('span.comp-password').html() );
        $div.addClass('edit-input');
    });
        
})();