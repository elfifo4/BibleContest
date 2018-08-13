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

$(".copy").click(function() {
var formatted  = this.id.replace(/[^0-9|.,]/g, '');

const answerID    = "answer-"+formatted;
const answerVal   = $("*[id='"+ answerID +"']").first().text();

if(!$("*[id='"+ answerID +"']").is(":visible")){
    $("*[id='"+ answerID +"']").prop('hidden', false);
}else{
    $("*[id='"+ answerID +"']").prop('hidden', true);
}

const questionID  = "question-"+formatted;
const questionVal =  $("*[id='"+ questionID +"']").first().text();

const fullText = "Question:" +  questionVal + " " + "Answer:" + answerVal;

copyToClipboard(fullText);

function copyToClipboard(text){
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    ShowMessage();
}
});

function ShowMessage() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

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