$(document).ready(()=>{

$(".question").click(function() {
        var id = this.id;
        var formatted = "answer-"+id.replace(/[^0-9|.,]/g, '');
    
        if($("*[id='"+ formatted +"']").is(":visible")){
            $("*[id='"+ formatted +"']").prop('hidden', true);
        }else{
            $("*[id='"+ formatted +"']").removeAttr('hidden');
        }
 });

 
    
    // Button Euro Capitals
$("#btnec").click(()=>{
    if(shuffled){ window.location.replace("./random_euro_capitals.html");}else{
    window.location.replace("./euro_capitals.html");
    }
});
    
// Button Asia Capitals
$("#btnac").click(()=>{
    if(shuffled){  window.location.replace("./random_asia_capitals.html");}else{
    window.location.replace("./asia_capitals.html");
    }
});
    
// Button Euro Languages
$("#btnel").click(()=>{
    if(shuffled){  window.location.replace("./random_euro_languages.html");}else{
window.location.replace("./euro_languages.html");
    }
});



});