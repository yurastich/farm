$(document).ready(function () {

  widthScreen = $(window).width();
  heightScreen = $(window).height();


  // Link anchor
  $(function () {
    $('a[href^="#"]').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1500, 'swing');
      event.preventDefault();
    });
  });


// todo Select
  $(".js-click-sl, .b-select-container .e-select-top").click(function(){
    var par = $(this).closest(".b-select-container, .js-par-sl"),
      dropPanel = par.find(".e-select-drop-panel, .js-sel-sl"),
      z = $(this).closest(".js-z"),
      active = par.hasClass("active");

    $(".b-select-container, .js-par-sl").removeClass("active");
    $(".js-z").removeClass("z-index");

    if(active == true){
      par.removeClass("active");
      z.removeClass("z-index");
    }else{
      par.addClass("active");
      z.addClass("z-index");
    }
  });

  $(".js-sel-el, .b-select-drop .e-select-drop-item").click(function(){
    var par = $(this).closest(".b-select-container, .js-par-sl"),
      dropPanel = par.find(".e-select-drop-panel, .js-sel-sl"),
      item = $(this).closest(".b-select-drop, .js-sel-sl").find(".e-select-drop-item, .js-sel-el"),
      newTextContent = $(this).find(".e-select-text"),
      newText = $(this).find(".e-select-text")[0].outerHTML;

    par.removeClass("active");
    item.removeClass("active");
    $(this).addClass("active");
    $(this).closest(".b-select-container").find(".e-select-title .e-select-text").replaceWith(newText);
  });

  // $(".b-scroll-bar").mCustomScrollbar({
  //   axis:"y"
  // });

// todo END Select

  var swiper = new Swiper('.e-first-container.swiper-container', {
    pagination: '.e-first-container .swiper-pagination',
    paginationClickable: true,
    keyboardControl: true
  });

  var swiperGoods = new Swiper('.b-third-good-slider .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 0,
    keyboardControl: true,
    nextButton: '.js-goods-next',
    prevButton: '.js-goods-prev',
    breakpoints: {
      1000: {
        slidesPerView: 3,
        // slidesPerView: 4,
        // spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }

  });

  // menu button
  $(".js-button-menu").click(function () {
    var menu = $(this).closest(".b-header").find(".e-header-left");
    $(this).toggleClass("active");
    menu.slideToggle();
  });
  var menu = function(){
    var width = $(window).width();

    if(width>1000){
      $(".js-button-menu").removeClass("active");
      $(".e-header-left").removeClass("active");
    }

  }; // resize and load
  // menu button end

  androidAnimate();
  popup();
  menu();
  // scrollFixed();


  $(window).resize(function () {
    var screenHeight = $(window).height(),
      screenWidth = $(window).width();

    popup();
    menu();
    activePopupCenter();
    //
    // if(screenWidth>= 768){
    //   var menu = $(".b-header .e-header-left");
    //   $(".js-button-menu").removeClass("active");
    //   menu.show();
    // }

  });

  // Textarea
  $('textarea').keyup(function (e) {
    var rows = $(this).val().split("\n"),
        jsRows = $(this).attr("data-js-rows");
    if(rows.length>jsRows){
      $(this).prop('rows', rows.length);
    }else{
      $(this).prop('rows', jsRows);
    }
  });
  // END Textarea

  // Validate
  $("input[name=tel]").mask("(999) 999-99-99");
  // END Validate

  $(window).load(function () {
    // firstScreen();

  });


  $(window).scroll(function () {
    var scr = $(window).scrollTop(),
      screenHeight = $(window).height(),
      screenWidth = $(window).width();
    // scrollFixed();
  });


});
