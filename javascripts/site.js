$( document ).ready(function(){
  // var swiper = new Swiper('.swiper-container', {
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });
  var replaceWithCorrectAge = function(){
    var currentAgeSpan = $('.about-me--text').find('span.age');
    dob = new Date("1983-08-05");
    var today = new Date();
    var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    currentAgeSpan.text(age);
  }
  replaceWithCorrectAge();
});