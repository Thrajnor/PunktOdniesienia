
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

var answers = []

function searchAndShowImages(term) {
  unsplash.search.photos(term, 1, 15)
    .then(toJson)
    .then(json => {
      $('.output').empty()
      // Display results
      $.each(json.results, function (i, result) {
        var regular = result.urls.regular

        // create image
        if ($.inArray(regular, answers) > -1) {
          // with clicked class
          $('.output').append('<span class="col-4 crop"><img class="img-fluid clicked rounded images" src=' + regular + '></span>')
        } else {
          // without clicked class
          $('.output').append('<span class="col-4 crop"><img class="img-fluid rounded images" src=' + regular + '></span>')
        }
      })

      // add reactivnes to images
      animateImages($('.images'))
    });
}

function animateImages(image) {
  image.on('click', function () {
    // toggle class clicked to each image
    $(this).toggleClass('clicked')
    // check if img is already clicked
    var isClicked = $.inArray(this.src, answers)

    if (isClicked === -1) {
      // add clicked image to array
      answers.push(this.src)
      // render images
      renderAnswers()
    } else {
      // remove form array
      answers.splice(isClicked, 1);
      // render answers without image that was clicked
      renderAnswers()
    }
  })
}
function renderAnswers() {
  $('.answers').empty()
  $.each(answers, function (index, answer) {
    $('.answers').append('<span class="col-6 crop"><img class="img-fluid clicked rounded answer" src=' + answer + '></span>')
  })
  animateImages($('.answer'))
}

function searchHandler() {
  $('.search-btn').on('click', function (event) {
    const term = $('.search').find('input[id="term"]').val()

    // search, show images and add reactivnes to them
    searchAndShowImages(term)

    return false
  })
  $('.search').find('input[id="term"]').on('keypress', function (event) {
    if (event.which == 13) {
      event.preventDefault()
      const term = $('.search').find('input[id="term"]').val()

      // search, show images and add reactivnes to them
      searchAndShowImages(term)

      return false
    }
  })

}

function dateHandler() {
  var d = new Date()
  $('.date').empty()
  $('.date').append(d.getFullYear())
}

function mainSearchButtonFunctions() {
  // give search button life
  searchHandler()

  // add changing date!
  dateHandler()
}


mainSearchButtonFunctions()
