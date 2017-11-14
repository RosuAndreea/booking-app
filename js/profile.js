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
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // },
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
})();