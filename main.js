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
          var icon = '<i class="fas fa-star"></i>';
          var iconEmpty = '<i class="far fa-star"></i>';
          var iconhtml = '';
          var iconhtmlEmpty = '';
          var numeroStelle = parseInt(data.results[i].vote_average / 2);
          if (data.results[i].original_language == "en") {
            var lingua = 'gb';
          } else {
            var lingua = data.results[i].original_language;
          }
          for (var z = 0; z <= numeroStelle -1; z++) {
            iconhtml = iconhtml  + icon;
          }
          for (var y = 0; y <= 4 - (numeroStelle); y++) {
            iconhtmlEmpty = iconhtmlEmpty  + iconEmpty;

          }
          var posterPath = data.results[i].poster_path;

          if (posterPath == null ) {
            var thumb = 'nopreview.png'
          } else {
            var thumb = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + data.results[i].poster_path;
          }
          console.log(thumb)
          var source = document.getElementById("cardTemplate").innerHTML;
          var template = Handlebars.compile(source);
          var context = {
            movieOrigTitle: data.results[i].original_title,
            movieTitle: data.results[i].title,
            lingua: lingua,
            voto: data.results[i].vote_average,
            stelle: iconhtml + iconhtmlEmpty,
            foto: thumb
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

   });   //fine ajax film

   $.ajax({
     url: 'https://api.themoviedb.org/3/search/tv',
     type: 'GET',
     data: {
       api_key: '32d3f80d6efc4febfeada2bd492caf35',
       query: $('#searchBox').val(),
       language: 'it',

     },
     success: function(data) {
       $('.display-serie').empty()

       for (var i = 0; i < data.results.length; i++) {
         // hendlebars template
         var icon = '<i class="fas fa-star"></i>';
         var iconEmpty = '<i class="far fa-star"></i>';
         var iconhtml = '';
         var iconhtmlEmpty = '';
         var numeroStelle = parseInt(data.results[i].vote_average / 2);
         if (data.results[i].original_language == "en") {
           var lingua = 'gb';
         } else {
           var lingua = data.results[i].original_language;
         }
         for (var z = 0; z <= numeroStelle -1; z++) {
           iconhtml = iconhtml  + icon;


         }
         for (var y = 0; y <= 4 - (numeroStelle); y++) {
           iconhtmlEmpty = iconhtmlEmpty  + iconEmpty;


         }
         var sourceSerie = document.getElementById("serieTemplate").innerHTML;
         var templateSerie = Handlebars.compile(sourceSerie);
         var contextSerie = {
           movieOrigTitle: data.results[i].original_name,
           movieTitle: data.results[i].name,
           lingua: lingua,
           voto: data.results[i].vote_average,
           stelle: iconhtml + iconhtmlEmpty,
           foto: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + data.results[i].backdrop_path
         };
         var htmlSerie = templateSerie(contextSerie);

         $('.display-serie').append(htmlSerie)
         // fine hendlebars template

       }
       $('#searchBox').val("");
       $('.movie-card').hover(function() {
         /* Stuff to do when the mouse enters the element */
         $(this).find('img').fadeOut('slow/400/fast')
         $(this).find('.ribbon').hide()

         $(this).find('.card-details').toggleClass('hidden');
       }, function() {
         $(this).find('img').show()
         $(this).find('.ribbon').show()
         $(this).find('.card-details').toggleClass('hidden');

       });

     },
     error: function() {
       alert('errore')
     }

  });




  });







});
