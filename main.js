$(document).ready(function() {

  $('#searchBoxBtn').click(function() {
    /* Act on the event */

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      type: 'GET',
      data: {
        api_key: '32d3f80d6efc4febfeada2bd492caf35',
        query: $('#searchBox').val(),

      },
      success: function(data) {
        for (var i = 0; i < data.results.length; i++) {
          // hendlebars template
          var icon = '<i class="fas fa-star"></i>'
          var numeroStelle = parseInt(data.results[i].vote_average / 2);
          var source = document.getElementById("cardTemplate").innerHTML;
          var template = Handlebars.compile(source);
          var context = {
            movieOrigTitle: data.results[i].original_title,
            movieTitle: data.results[i].title,
            lingua: data.results[i].original_language,
            voto: data.results[i].vote_average,
            stelle: numeroStelle
          };
          var html = template(context);
          $('.display-result').append(html)
          // fine hendlebars templat

        }
      },
      error: function() {
        alert('errore')
      }

    });

  });







});
