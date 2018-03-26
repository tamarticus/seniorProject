    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
  'api-key': "5ed0d6f5d6b144f28712e3cbcfafc99b",
  'q': "Trump",
  'begin_date': "20180325",
  'fl': "snippet, headline"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  //headline
  var randomArticle = Math.floor((Math.random() * 9));
  var headline = result.response.docs[randomArticle].snippet;
  console.log(headline);
  //make parts of speech
  var partsOfSpeech = RiTa.getPosTags(headline);
  var puncIndex = [];
  var periodIndex = [];
  for(i=0;i<partsOfSpeech.length;i++){
    if (partsOfSpeech[i] == "." || partsOfSpeech[i] == "," || partsOfSpeech[i] == "\"" || partsOfSpeech[i] == "!" || partsOfSpeech[i] == "-" ||partsOfSpeech[i] == "&" ||partsOfSpeech[i] == ":" ||partsOfSpeech[i] == ";"){
      puncIndex.push(partsOfSpeech[i]);
    }
  }
  //$("body").append("<p1 hidden id=\"withPunc\">"+ puncIndex +"</p1>");
  var newHead1 = headline.split(" ");
  var newHead = newHead1.join(",").split(".").join(",").split("!").join(",").split("?").join(",").split(":").join(",").split(";").join(",").split("&").join(",").split("\(").join(",").split("\)").join(",").split("-").join(",").split(",");
//var newHead= newHead1;

    console.log("newHead" + newHead1);

  console.log(partsOfSpeech);
  var verbIndex;
  var nounIndex;
  var adjIndex;
  var verbType;
  var nounType;
  var adjType;

  //FIND FIRST VERB

  for(i = 0; i < partsOfSpeech.length; i++){

    if (partsOfSpeech[i] == "vb" || partsOfSpeech[i] == "vbd" || partsOfSpeech[i] == "vbg" || partsOfSpeech[i] == "vbn"|| partsOfSpeech[i] == "vbp"|| partsOfSpeech[i] == "vbz"){
      verbIndex = i;
      verbType = partsOfSpeech[i];
      i = partsOfSpeech.length;
    }
    }
    //FIND LAST NOUN
  for(i = 0; i < partsOfSpeech.length; i++){

    if (partsOfSpeech[i] == "nn" || partsOfSpeech[i] == "nns"){
      nounIndex = i;
      nounType = partsOfSpeech[i];
    }
    }
    //FIND ADJECTIVE
  for(i = 0; i < partsOfSpeech.length; i++){

    if (partsOfSpeech[i] == "jj" || partsOfSpeech[i] == "jjr" || partsOfSpeech[i] == "jjs"){
      adjIndex = i;
      adjType = partsOfSpeech[i];
    }
    }
var verbType1;
  if (verbType == "vbd"){
    verbType1 = "Verb (Past Tense):";
  }
  else if(verbType == "vb"){
    verbType1 = "Verb (Base Form):";
  }
  else if(verbType == "vbg"){
    verbType1 = "Verb (Ending in \"ing\"):";

  }
  else if(verbType == "vbn"){
    verbType1 = "Verb, Past Particible:";
  }
  else if(verbType == "vbp"){
    verbType1 = "Verb, non-3rd person singular present:";
  }
  else if(verbType == "vbz"){
    verbType1 = "Verb (Ending in \"s\"):";
  }

var adjType1;
if(adjType == "jj"){
  adjType1 = "Adjective:";
}
else if(adjType == "jjr"){
  adjType1 = "Adjective, comparative:";
}
else if(adjType == "jjs"){
  adjType1 = "Adjective, superlative:";
}
var nounType1;
if(nounType == "nn"){
  nounType1 = "Noun (singular):";
}
else if(nounType == "nns"){
  nounType1 = "Noun (plural):";
}
else if(nounType == "nnp"){
  nounType1 = "Noun (Proper sing.):";
}
else if(nounType == "nnps"){
  nounType1 = "Noun (Proper plural):";
}

  var indexList = [];
  var isVerb, isAdj, isNoun = 0;
  if(verbIndex != undefined){
    $("form").append("<span class=\"strikethrough\">"+verbType1+"</span> <input type=\"text\" name=\"verb\"><br><br>");
    isVerb = 1;
    indexList.push("VERBHERE");
    indexList.push(verbIndex);
  }
  if(nounIndex != undefined){
    $("form").append("<span class=\"strikethrough\">"+nounType1+"</span> <input type=\"text\" name=\"noun\"><br><br>");
    isNoun = 1;
    indexList.push("NOUNHERE");
    indexList.push(nounIndex);

  }
  if(adjIndex != undefined){
    $("form").append("<span class=\"strikethrough\">"+adjType1+"</span> <input type=\"text\" name=\"adjective\"><br><br><br>");
    isAdj = 1;
    indexList.push("ADJHERE");
    indexList.push(adjIndex);
    //https://stackoverflow.com/questions/14593415/how-to-strike-through-obliquely-with-css
  }

  console.log(indexList);
  deadWords = [];
  newHeadline = [];
for(i = 0; i < newHead.length; i++){
  for(n = 0; n < indexList.length; n++){
    if(i==indexList[n]){
      newHeadline.push(indexList[n-1]);
      n = indexList.length;
      deadWords.push(newHead[i]);
    }
    else if (i!=indexList[n] && n == indexList.length-1){
      newHeadline.push(newHead[i]);
      n = indexList.length;
    }
  }
}
$("body").append("<p1 hidden id=\"withPunc\">"+ deadWords +"</p1>");

$("body").append("<p hidden id=\"headline1\">" + newHeadline + "</p>");

$("form").append("<input type=\"button\" id=\"submit\" onclick=\"makeWords()\" value=\"Fake Your News\">");

}).fail(function(err) {

  throw err;

});

// var myStory = result.response.docs["0"].headline.main;
// var partsOfSpeech = RiTa.getPosTags(myStory);
// console.log(partsOfSpeech);
