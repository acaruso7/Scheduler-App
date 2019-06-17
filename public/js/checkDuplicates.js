$(document).on('submit', function(e){
    let arr = []
    $("input").each(function(){
        var value = $(this).val();
        if (arr.indexOf(value.toLowerCase()) == -1)
            arr.push(value.toLowerCase());
        else {
            alert('Cannot enter duplicate emails or dates')
            e.preventDefault()
        }
    });
});