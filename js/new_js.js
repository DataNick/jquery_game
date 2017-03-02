function init(eject) {
  var candidates = [];

  function makeURL(){
    var ran_cat = Math.floor(Math.random() * (27915 - 1) + 1),
        cat = "http://www.trivialbuzz.com/api/v1/categories/" + ran_cat + ".json"
    return cat
    // TODO: ensure non-repeating categories
  }

  function storeCategory(category) {

    if (candidates.length < 5) {
      candidates.push(category);
      // console.log(candidates.length, candidates);
      getQuestions()
    } else {
      eject(returnQuestions(candidates));
    }
  }

  function normalizeCategory(category){
    console.log(category);
    // var q = [];
    // while(q.length < 5) {
    //   var random = Math.floor(Math.random() * (category.questions_count));
    //   q.includes(random)? null : q.push(random);
    // }
    var selected = [];
    while(selected.length < 5){
      var random = Math.floor(Math.random() * (category.questions_count));
      selected.includes(category.questions[random])? null : selected.push(category.questions[random]);
    }
    console.log(selected)
    storeCategory(category);
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
};


init(function (stuff) {

})
