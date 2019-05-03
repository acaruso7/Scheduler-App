$(document).on('submit', function(e){
    let arr = []
    $("input").each(function(){
        var value = $(this).val();
        if (arr.indexOf(value) == -1)
            arr.push(value);
        else {
            alert('Cannot enter duplicate emails or dates')
            e.preventDefault()
        }
    });
});