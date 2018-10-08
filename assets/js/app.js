
// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
var $ = require('jquery');

// =========================== unsplash image api
// ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "9f52ee6419935d2488a87ee634101b93389613442f65a47ea9c268cdcab289b7",
  secret: "2597057c816eb6843aef8a492182d1d391f2768a48aa7a454496e45327855476",
  callbackUrl: "Default callback URL"
});

var allAnswers = {}

function searchAndShowImages(term, slide, answers) {
  unsplash.search.photos(term, 1, 15)
    .then(toJson)
    .then(json => {
      slide.find('div.output').empty()
      // Display results
      $.each(json.results, function (i, result) {
        var regular = result.urls.regular

        // create image
        if ($.inArray(regular, answers) > -1) {
          // with clicked class
          slide.find('div.output').append('<span class="col-6 col-md-4 crop"><img class="img-fluid clicked rounded images" src=' + regular + '></span>')
        } else {
          // without clicked class
          slide.find('div.output').append('<span class="col-6 col-md-4 crop"><img class="img-fluid rounded images" src=' + regular + '></span>')
        }
      })

      // add reactivnes to images
      animateImages(slide, slide, answers)
    });
}

function animateImages(slide, images, answers) {
  images.find('img.images').on('click', function () {
    // toggle class clicked to each image
    // check if img is already clicked
    var isClicked = $.inArray(this.src, answers)

    if (isClicked === -1 && answers.length < 4) {
      $(this).toggleClass('clicked')
      // add clicked image to array
      answers.push(this.src)
      // render images
      renderAnswers(slide, answers)
    } else if (isClicked > -1) {
      if ($(this).hasClass('clicked')) {
        $(this).toggleClass('clicked')
      }
      // remove form array
      answers.splice(isClicked, 1);
      // render answers without image that was clicked
      renderAnswers(slide, answers)
    }
  })
}

function renderAnswers(slide, answers) {
  slide.find('div.answers').empty()
  $.each(answers, function (index, answer) {
    slide.find('div.answers').append('<span class="col-6 crop"><img class="img-fluid clicked rounded answer images" src=' + answer + '></span>')
  })
  for (var i = 0; i < 4 - answers.length; i++) {
    slide.find('div.answers').append('<span class="col-6 crop"><img class="img-fluid roundedBorder" src="http://www.theemailcompany.com/wp-content/uploads/2016/02/no-image-placeholder-big-300x200.jpg"></span>')
  }
  animateImages(slide, slide.find('div.answers'), answers)
}

function searchHandler() {

  $('.slide').on('focusin', function () {
    var slide = $(this)
    allAnswers['answers' + slide[0].id] = []
    var answers = allAnswers['answers' + slide[0].id]
    slide.find('button.search-btn').on('click', function (event) {
      const term = slide.find('input[id="term"]').val()

      // search, show images and add reactivnes to them
      searchAndShowImages(term, slide, answers)

      return false
    })
    slide.find('input[id="term"]').on('keypress', function (event) {
      if (event.which == 13) {
        event.preventDefault()
        const term = slide.find('input[id="term"]').val()

        // search, show images and add reactivnes to them
        searchAndShowImages(term, slide, answers)

        return false
      }
    })
  })
}

function slideNewQuestionHandler() {
  var position = 0
  $('.question-select').click(function () {
    var index = $(this)[0].textContent - 1
    $('.slidesContainer').animate({
      left: index * -100 + '%'
    }, 500)
    position = index
  });
}

function dateHandler() {
  var d = new Date()
  $('.date').empty()
  $('.date').append(d.getFullYear())
}

function mainSearchButtonFunctions() {
  // give search button life
  searchHandler()

  // give Slides life
  slideNewQuestionHandler()

  // add changing date!
  dateHandler()
}


mainSearchButtonFunctions()
