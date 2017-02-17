function getData() {
  console.log('Loaded and ready.');
  var random = Math.floor(Math.random() *(2163 - 1)+1)
  var url = 'http://www.trivialbuzz.com/api/v1/questions.json?page=' + random;
  var cat_url = 'http://www.trivialbuzz.com/api/v1/categories/';
  var categories = [];
  var questions = [];
  var answers = []
  var ids = [];


  // var data = {cat1: data1, cat2: data2, cat3: data3, cat4: data4, cat5: data5, cat6: data6}



  $.getJSON(url, function(json){

    json = json.questions
    console.log(json[0]['category'])
    json.forEach(function(val){
      questions.push(val['body']);
      answers.push(val['response'])
      categories.push(val['category']['name'])
      ids.push(val['category']['id'])
    })

    cat = $.unique(categories.slice(0,6))
    ids = $.unique(ids.slice(0,6))
    questions = $.unique(questions.slice(0,36))
    var array = []
    // getCategoryQuestions(ids)
    console.log(cat)
    console.log(ids)
    // console.log(questions)
    console.log(questions)
    questions.forEach(function(q){
      var count = 1
      var num = 0
      for (var i=0; i < questions.length; i++){
        $('#row' + count).data({'question': questions[i], 'answer': answers[num]})
        count++
        num++
      }
    })
    $('#index').append('<ol></ol>')
    for (var i in cat){
      var li = '<li>';
      $('ol').append(li.concat(cat[i].toUpperCase()))
    }

    cat.forEach(function(el){
      var count = 0
      var header = 1
      for (var i=0; i <= cat.length; i++ ) {
        $('#header' + header).html(cat[i].toUpperCase());
        $('#header' + header).attr('key', ids[i])
        $('#header' + header).data('category', ids[i])
        header++;
        count++;
      }
    })
  })

}
//


// function getCategoryQuestions(ids){
//   var total_questions = []
//   var question_list = [];
//   ids.forEach(function(id){
//     function makeURL(id){
//       return 'http://www.trivialbuzz.com/api/v1/categories/' + id + '.json'
//     };
//     $.getJSON(makeURL(id), function(data){
//       data = data['category']['questions']
//       data.forEach(function(val){
//         // console.log(val['body'])
//         array.push(val['body'])
//       })
//       // array.push(question_list.slice(0,5))
//       question_list = [];
//       // console.log(total_questions)
//     });

//   });
//   console.log(array)
//   return array
// }


$(document).ready(function(){

  getData();


})