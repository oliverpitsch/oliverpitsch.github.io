
jQuery(document).ready(function($){

   // Set Feature Boxex Height to Max Feature Boxes Height
  var discipline_box = $('.discipline-box');

  if (discipline_box == undefined || discipline_box == null || discipline_box.length == 0){
    
  }
  else {
    var max_height = -1
    $.each(discipline_box, function( index, box ) {
      var box_heigth = $(box).height();
      if (box_heigth > max_height) {
        max_height = box_heigth;
      }
    });
    $(discipline_box).height(max_height);
  };

  var portfolio_image_wrapper = $('.portfolio-image');

  portfolio_image_wrapper.hover(function(e){
    var that = $(this);
    var desc = that.find('.description');
    desc.show();

  }, function(e){
    var that = $(this);
    var desc = that.find('.description');

    desc.hide();
  });

});
