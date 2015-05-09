(function($, undefined){

  $(document).ready(function(){
    var changeHash = function changeHash(hash){
      var rating = hash.slice(1)
      var $restaurants = $('.restaurant[data-rating]');

      if (rating === 'all'){
        $restaurants.show();
      }
      else {
        $restaurants
          .hide()
          .filter('[data-rating="' + rating + '"]')
            .show();
      }

      $('.list-group-item')
        .removeClass('active')
        .filter('[data-rating="' + rating +  '"]')
          .addClass('active');

    };

    $('.list-group-item').on('click', function(){
      var $el = $(this);
      var hash = $el.attr('href')

      changeHash(hash);
    });

    changeHash(window.location.hash);
  });

})(jQuery);
