function init(eject) {
  var candidates = [];

  function makeURL(){
    var ran_cat = Math.floor(Math.random() * (27915 - 1) + 1),
        cat = "http://www.trivialbuzz.com/api/v1/categories/" + ran_cat + ".json"
    return cat
    // TODO: ensure non-repeating categories
  }

  function storeCategory(category, selected) {

    if (candidates.length < 7) {
      candidates.push([category.name, selected]);
      // console.log(candidates.length, candidates);
      getQuestions()
    } else {
      eject(returnQuestions(candidates));
    }
  }

  function normalizeCategory(category){
    // console.log(category);
    var selected = [];
    while(selected.length < 5){
      var random = Math.floor(Math.random() * (category.questions_count));
      selected.includes(category.questions[random]) ? false : selected.push(category.questions[random]);
    }
    // console.log(selected, category)
    storeCategory(category, selected);
  }

  function validateQuestionsLength(questions){
    //console.log(questions.category, questions.category.questions_count)
    questions.category.questions_count < 5 ? getQuestions() : normalizeCategory(questions.category);
  }

  function getQuestions(categories_url) {
    categories_url = categories_url || makeURL();
    $.getJSON(categories_url, validateQuestionsLength);
  }

  getQuestions()
}

function returnQuestions(data) {
  return data;
  // console.log(data)
};


init(function (stuff) {
  // for (var i = 0; i < stuff.length; i++){
  //   $('#header' + i).html(stuff[i].name.toUpperCase());
  //   for (var j = 1; j < stuff[i].questions.length; j++){
  //     $('#row' + j).data({'question': stuff[i].questions[j]})
  //     // $('#row' + count).data({'question': questions[i], 'answer': answers[num]})
  //     // console.log(stuff[j])
  //   }
  // }
  console.log(stuff[0])
})
