

  //Spreadsheet link
//"https://spreadsheets.google.com/feeds/list/1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI/2/public/values?alt=json"
// ID of the Google Spreadsheet
var spreadsheetID = "1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI";

var topics = []; 
var mainUrl = "https://spreadsheets.google.com/feeds/list/1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI/1/public/values?alt=json";

$(".home").click(()=>{
    location.reload();
});

var shuffled = false;
$(".shuffle").change(function() {
    if(this.checked){
        shuffled = true;
    }else{
        shuffled = false;
    }
});

$.ajax({
    url: mainUrl,
    dataType: 'json',
    async: false,
    success: function(data) {

    var entry = data.feed.entry;
    $(entry).each(function(index){
        if(index !== 0){
        topics.push({"id":index,"title":entry[index].title.$t,"link":"https://spreadsheets.google.com/feeds/list/1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI/" + (index + 1) + "/public/values?alt=json", "questions":[]});  
        }
        //make sure this matches your column labels when you change the source sheet
    });
}
});
if( !window.location.href.includes("question")){

var menuHTML     = [];
$(topics).each(function(index){
  var menuItem = '<p><div class="menuItem" style="margin-top: 15px">'
  + ' <div class="row"><div class ="topic">'
  + ' <div class="well" style="background-color: #CDAF8B !important;">'
  + ' <div class="row"><div class="col-md-6" ></div>'
  + '<div class="container"><h4 class="topic_title">'
  + topics[index].title 
  + '</h4><button class="btn btn-primary pull-right menuButton" id="btn-'
  + index 
  + '">Show Quiz</button></div></div></div><br></div></p>'
  $("#btnHome").hide();  
  menuHTML.push(menuItem);
});
$('#dynamicMenu').html(menuHTML);



$(".menuButton").click(function() {
  var id = this.id;
  var formatted = id.replace(/\D/g,'');
  if(shuffled){
    randomQuestions(formatted);
  }else{
    questions(formatted);
  }
});

function questions(topic){
loadQuestions(topic, false);
}


function randomQuestions(topic){
  loadQuestions(topic, true);
}

function loadQuestions(topic, random){
  var location = window.location.href;
  var the_arr = location.split('/');
  the_arr.pop();
  var formatted = (the_arr.join('/')+"/");
  window.location = formatted+"questions.html?topic="+topic+"&random="+random;
}

// --- Questions Page ---

}else{

  $(".home").click(()=>{
    var location = window.location.href;
    var the_arr = location.split('/');
    the_arr.pop();
    var formatted = (the_arr.join('/')+"/");
    window.location = formatted+"index.html"; //open_questions
  });

  var topic  = getUrlParameter('topic');
  var random = getUrlParameter('random');
  setTitle(topic);
  setQuestions(topic,random);

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

  function setTitle(topic){
    $('#title').html(topics[topic].title);
  }

  function setQuestions(topic, random){
    addQuestions(topic);
    if(random == "true"){randomQuestions(topic)}else{
      questions(topic);
    }
  }

  function randomQuestions(topic){
    var questionHTML = [];
    $(topics).each(function(index){
      if(index == topic){
        $(topics[index].questions).each(function(questionIndex){
          var newItem = '<div class="questionList"><div class="question" id="question:'+ topics[index].id +"|"+ questionIndex +'"><div class="row"><div> <div class="well questionBox ripple" style="background-color: #CDAF8B !important;"> <div class="row"><div class="container" style="margin-left: 32%;"> <h4 class="topic_title">' + topics[index].questions[questionIndex].country + '</h4><h4 class="answer_title"id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden >' + topics[index].questions[questionIndex].city + '</h4></div></div></div><br></div></div></div></div><br id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden><br id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden><br id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden>'  ;
        questionHTML.push(newItem);
        });
      }
  });
  var randomHTML = shuffle(questionHTML);
  $('#dynamicQuestions').html(randomHTML);
  }

  function questions(topic){
    var questionHTML = [];
    $(topics).each(function(index){
    if(index == topic){
      $(topics[index].questions).each(function(questionIndex){
      var newItem = '<div class="questionList"><div class="question" id="question:'+ topics[index].id +"|"+ questionIndex +'"><div class="row"><div> <div class="well questionBox ripple" style="background-color: #CDAF8B !important;"> <div class="row"><div class="container" style="margin-left: 32%;"> <h4 class="topic_title">' + topics[index].questions[questionIndex].country + '</h4><h4 class="answer_title"id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden >' + topics[index].questions[questionIndex].city + '</h4></div></div></div><br></div></div></div></div><br id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden><br id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden><br id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden>'  ;
      questionHTML.push(newItem);
      });
    }
  });
  $('#dynamicQuestions').html(questionHTML);
  }

  function addQuestions(topic){
        $.ajax({
            url: topics[topic].link,
            dataType: 'json',
            async: false,
            success: function(data) {
              var entry = data.feed.entry;
              $(entry).each(function(entryIndex){
                topics[topic].questions.push({"country":entry[entryIndex].gsx$question.$t, "city":entry[entryIndex].gsx$answer.$t});
              });
            }
          });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

}


