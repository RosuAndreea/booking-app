(function (){
    var ApiUrl = window.ApiUrl;
    $detailSide = $('.details-side');

    function profileDetails(data) {
        $detailSide.append('<h1 class="company-details">Company Profile</h1>'
                            +'<p class="company-detail">Company Name: </p>'
                            +'<p>' + data.name + '</p>'
                            +'<p class="company-detail">Email: </p>'
                            +'<p>' + data.email + '</p>'
                            +'<p class="company-detail">Password: </p>'
                            +'<p>' + data.password + '</p>'
                            +"<p class='company-detail'>Address: </p>"
                            +"<p>" + data.address + '</p>'
                            +"<p class='company-detail'>Phone: </p>"
                            +'<p>' + data.phone + '</p>'
                            +"<p class='company-detail'>Details: </p>"
                            +'<p>' + data.details + '</p>'
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
        
})();