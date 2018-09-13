/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

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


$('.search').on('submit', function (event) {
  const term = $('.search').find('input[name="term"]').val()

  unsplash.search.photos(term, 1, 15)
    .then(toJson)
    .then(json => {
      $('.output').empty()
      $.each(json.results, function (i, result) {
        var regular = result.urls.regular
        $('.output').append('<span class="col-4 crop"><img class="img-fluid rounded img-thumbnail" src=' + regular + '></span>')
      })
    });
  return false
})
