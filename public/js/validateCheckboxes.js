$(document).on('submit', function(e){
    (function($){
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var boxes_checked = 0
        var n = 0 // stores the date index (e.g. 3rd date, 5th date, etc)
        for (let i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                boxes_checked ++ 
            }
            if (((i+1) % 15) == 0) { //check each group of 15 checkboxes
                n++ 
                if (boxes_checked == 0) {
                    if(e.target.children[0].children[0].children[1].children[0].children[2*n-1].children[0].children[1].children[0].children[2].checked ){
                        // if the 'No' box is checked, do nothing
                    } else {
                        alert('You must select at least one time for each date you are available')
                        e.preventDefault()
                    }
                } else {
                    boxes_checked = 0
                }
            }
        }
    }(jQuery))
});