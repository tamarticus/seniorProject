function myWholeJS(id){
$("h2").html("");
$("h3").html("");
  $("#opening").hide();

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
  'api-key': "5ed0d6f5d6b144f28712e3cbcfafc99b",
  'q': id,
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
  var headlineSplit = "";
  for(i=1;i<headline.length+1;i++){
    if(headline[i] == ","||headline[i] =="?"||headline[i] =="\""||headline[i] =="!"||headline[i] =="."||headline[i] ==":"||headline[i] ==";"||headline[i] =="\'"||headline[i] =="&"||headline[i] =="\("||headline[i] =="\)"||headline[i] ==","){
    headlineSplit += headline[i-1];
    headlineSplit += " ";
    console.log("punc true");
    console.log("OH"+headline[i]);
    }
    else{
      headlineSplit += headline[i-1];

    }
  }
  newHead = headlineSplit.split(" ");
  var partsOfSpeech = RiTa.getPosTags(newHead);
  console.log("SOL:"+ newHead);

  console.log("SPLIT", headlineSplit);



//  var partsOfSpeech = RiTa.getPosTags(headline);
  console.log("headline:"+headline);
  var puncIndex = [];
  var whereIndex = [];

  // for(i=0;i<partsOfSpeech.length;i++){
  //   // if (partsOfSpeech[i] == "." || partsOfSpeech[i] == "," || partsOfSpeech[i] == "\"" || partsOfSpeech[i] == "!" || partsOfSpeech[i] == "-" ||partsOfSpeech[i] == "&" ||partsOfSpeech[i] == ":" ||partsOfSpeech[i] == ";"){
  //   //   puncIndex.push(partsOfSpeech[i]);
  //   // }
  //   code = partsOfSpeech[i].charCodeAt(0);
  //   if((code > 47 && code < 58) || (code>64 && code < 91) || (code>96 && code < 123)){
  //     var nothing = 0;
  //   }
  //   else{
  //     puncIndex.push(partsOfSpeech[i]);
  //     whereIndex.push(i);
  //   }
  // // }
  // console.log("punc"+puncIndex+whereIndex);
  // //$("body").append("<p1 hidden id=\"withPunc\">"+ puncIndex +"</p1>");

//   var newHead1 = headline.split(" ");
//   console.log("HEADLINEHERE"+newHead1);
//   var newHead = newHead1.join(",").split(".").join(",").split("!").join(",").split("?").join(",").split(":").join(",").split(";").join(",").split("&").join(",").split("\(").join(",").split("\)").join(",").split("-").join(",").split(",");
// //var newHead= newHead1;

  //  console.log("newHead" + newHead1);

  console.log(partsOfSpeech);
  var verbIndex;
  var nounIndex;
  var adjIndex;
  var verbType;
  var nounType;
  var adjType;

  //FIND FIRST VERB

  for(i = 0; i < partsOfSpeech.length; i++){

    if ((partsOfSpeech[i] == "vb"||partsOfSpeech[i] == "vbd"||partsOfSpeech[i] == "vbg"||partsOfSpeech[i] =="vbn"||partsOfSpeech[i] =="vbp"||partsOfSpeech[i] =="vbz")&&(newHead[i]!="had"&&newHead[i]!="has"&&newHead[i]!="have"&&newHead[i]!="been"&&newHead[i]!="be"&&newHead[i]!="said"&&newHead[i]!="reports"&&newHead[i]!="reported"&&newHead[i]!="are"&&newHead[i]!="is"&&newHead[i]!="were"&&newHead[i]!="was")){
      verbIndex = i;
      console.log("what is this doing: "+newHead[i]);
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
    verbType1 = "Verb (Past Tense):";
  }
  else if(verbType == "vbp"){
    verbType1 = "Verb (Base Form):";
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
  nounType1 = "Noun (Proper singular):";
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
console.log("WHATTT", newHeadline);
$("body").append("<p1 hidden id=\"withPunc\">"+ deadWords +"</p1>");
$("body").append("<p3 hidden id=\"punctuation\">"+ puncIndex +"</p3>");
$("body").append("<p4 hidden id=\"punctuationWhere\">"+ whereIndex +"</p4>");
$("body").append("<p hidden id=\"headline1\">" + newHeadline + "</p>");

$("form").append("<input type=\"button\"class=\"w3-button w3-white w3-border w3-border-red w3-round-large\" id=\"submit\" onclick=\"makeWords()\" value=\"Fake Your News\">");

}).fail(function(err) {

  throw err;

});
return 0;
}
// var myStory = result.response.docs["0"].headline.main;
// var partsOfSpeech = RiTa.getPosTags(myStory);
// console.log(partsOfSpeech);
