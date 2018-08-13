

  //Spreadsheet link
//"https://spreadsheets.google.com/feeds/list/1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI/2/public/values?alt=json"
// ID of the Google Spreadsheet
var spreadsheetID = "1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI";

var topics = []; 
var globalHTML = [];
var mainUrl = "https://spreadsheets.google.com/feeds/list/1l2ZqkbAT-y8lbkHtlnINBz_kl2wYnqQ-arxhlI1JnuI/1/public/values?alt=json";

//for each element that is classed as 'pull-down', set its margin-top to the difference between its own height and the height of its parent
$('.pull-down').each(function() {
  var $this = $(this);
  $this.css('margin-top', $this.parent().height() - $this.height())
});

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
  var menuItem = '<p><div class="menuItem" style="margin-top: 15px"> <div class="row"><div class ="topic"> <div class="well" style="background-color: #CDAF8B !important;"> <div class="row"><h4 class="menu_index"> ('+ (index+1) +') </h4><div class="centre"><h4 class="topic_title">'+ topics[index].title +'</h4><div class="btnContainer"><button class="btn menuButton" id="btn-'+ index +'">  Learn More  </button></div></div></div></div><br></div></p>'
  $("#btnHome").hide();  
  $("#btnHomePhone").hide();  
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
    window.location = formatted+"index.html";
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
    $('#phoneTitle').html(topics[topic].title);
  }

  function setQuestions(topic, random){
    addQuestions(topic);
    if(random == "true"){randomQuestions(topic)}else{
      questions(topic);
    }
  }

  function randomQuestions(topic){
    var questionHTML = [];
    globalHTML = [];
    $(topics).each(function(index){
      if(index == topic){
        $(topics[index].questions).each(function(questionIndex){
          var dataItem = {"divQuestionId":topics[index].id +"|"+ questionIndex, "questionNumber":0, "question":topics[index].questions[questionIndex].country, "answer":topics[index].questions[questionIndex].city};
        questionHTML.push(dataItem);
        });
      }
  });
  var randomHTML = shuffle(questionHTML);
  var sortedHTML = [];
  $(randomHTML).each(function(index){
    randomHTML[index].questionNumber = index+1;
    var newItem = '<div class="questionList hvr-float"><div class="question" id="question:'+ randomHTML[index].divQuestionId +'"><div class="row"><div> <div class="well questionBox ripple" style="background-color: #CDAF8B !important;"> <div class="row"> <h4 class="pull-left answer_index"> ('+ randomHTML[index].questionNumber +') </h4> <i class="far fa-copy copy" id="copy:'+ randomHTML[index].divQuestionId +'"></i> <div class="container"> <h4 class="answer_question" id="question-'+ randomHTML[index].divQuestionId +'">' + randomHTML[index].question + '</h4><h4 class="answer_title"id="answer-'+ randomHTML[index].divQuestionId +'" hidden >' + randomHTML[index].answer + '</h4></div></div></div><br></div></div></div></div>';                 
    sortedHTML.push(newItem);
  });

  $('#phoneDynamicQuestions').html(sortedHTML);
  $('#dynamicQuestions').html(sortedHTML);
  globalHTML = sortedHTML;
  }

  function questions(topic){
    var questionHTML = [];
    globalHTML = [];
    $(topics).each(function(index){
    if(index == topic){
      $(topics[index].questions).each(function(questionIndex){
      var newItem = '<div class="questionList hvr-float"><div class="question" id="question:'+ topics[index].id +"|"+ questionIndex +'"><div class="row"><div> <div class="well questionBox ripple" style="background-color: #CDAF8B !important;"> <div class="row"> <h4 class="pull-left answer_index"> ('+ (questionIndex+1) +') </h4> <i class="far fa-copy copy" id="copy:'+ topics[index].id +"|"+ questionIndex +'"></i> <div class="container"> <h4 class="answer_question" id="question-'+ topics[index].id +"|"+ questionIndex +'">' + topics[index].questions[questionIndex].country + '</h4><h4 class="answer_title"id="answer-'+ topics[index].id +"|"+ questionIndex +'" hidden >' + topics[index].questions[questionIndex].city + '</h4></div></div></div><br></div></div></div></div>';
      questionHTML.push(newItem);
      });
    }
  });
  $('#phoneDynamicQuestions').html(questionHTML);
  $('#dynamicQuestions').html(questionHTML);
  globalHTML = questionHTML;
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


