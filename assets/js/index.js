$("#update_user").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n,i) {
        data[n['name']] = n['value']
    })
    let searchParams = new URLSearchParams(window.location.search); 
    let id = searchParams.get('id')

    var request = {
        "url": `http://localhost:3000/api/users/${id}`,
        "method": "PUT",
        "data": data
    }

    if(confirm("Do you really want to update this record?")){
        $.ajax(request).done(function (response) {
            location.replace('/');
        })
    }
})

if(window.location.pathname=="/"){
    $ondelete=$(".table tbody td a.delete")
    $ondelete.click(function(){
        var id=$(this).attr("data-id");
        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }
        if(confirm("Do you really wan to delete this record?")){
            $.ajax(request).done(function (response) {
                location.reload();
            })
        }
    })
}    
    


