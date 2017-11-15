(function () {
    var $card = $('.row');

    function addTemplate(item) {
        $card.append('<div class="col-md-3"><div class="card">'
            +'<div class="view overlay hm-white-slight">'
            +'<img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg" class="img-fluid" alt="">'
            +'<a><div class="mask"></div></a></div>'
            +'<div class="card-body">'
            +'<h4 class="card-title">' + item.name + '</h4>'
            +'<p class="card-text">' + item.details + '...</p>'
            +'<a href="#" class="black-text d-flex flex-row-reverse hvr-pulse">'
            +'<button class="waves-effect p-2">Book Now <i class="fa fa-chevron-right"></i></button>'
            +'</a></div></div></div>'
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
            $.each(companies, function (i, item){
                addTemplate(item);
            });
        },
        error: function (err){
            console.log('Err ', err);
            //alert('Error loading services');
        }

    });
})();