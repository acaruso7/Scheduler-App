(function($){
    $(document).ready(function() {
        let t = $("#datesContainer").children.length;
        document.getElementById("datesContainer").addEventListener('click', function(e){
            let tof = e.target;
            if(tof.value=="no"){
                e.target.parentNode.parentNode.parentNode.parentNode.children[1].setAttribute("style","display:none");
            }
            if(tof.value=="yes"){
                e.target.parentNode.parentNode.parentNode.parentNode.children[1].removeAttribute("style","display:none");
            }
        }, true);
    })
}(jQuery));