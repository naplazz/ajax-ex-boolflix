$(document).ready(function() {

  $('#searchBoxBtn').click(function() {
    /* Act on the event */

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      type: 'GET',
      data: {
        api_key: '32d3f80d6efc4febfeada2bd492caf35',
        query: $('#searchBox').val(),
        language: 'it',

      },
      success: function(data) {
        $('.display-result').empty()
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
            stelle: numeroStelle,
            foto: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + data.results[i].backdrop_path
          };
          var html = template(context);
          $('.display-result').append(html)
          // fine hendlebars template

        }
        $('#searchBox').val("")

      },
      error: function() {
        alert('errore')
      }

    });

  });







});
