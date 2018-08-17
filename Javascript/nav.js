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

const fullText = "Question: " +  questionVal + "\n" + "Answer: " + answerVal;

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
});