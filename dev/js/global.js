$(document).ready(function () {

  widthScreen = $(window).width();
  heightScreen = $(window).height();

  var blockInCenter = function (container, element) {
    var elementWidth = $(element).outerWidth(),
      elementHeight = $(element).outerHeight(),
      containerWidth = $(container).outerWidth(),
      containerHeight = $(container).outerHeight(),
      positionLeft = (containerWidth - elementWidth) / 2,
      positionTop = (containerHeight - elementHeight) / 2;

    //if (positionTop < 20) {
    //  positionTop = 20;
    //}
    $(element).css("left", positionLeft);

    $(element).css("top", positionTop);

  };

  // // Number fix
  // $("[name='num']").keypress(function (event) {
  //   var controlKeys = [8, 9, 13, 35, 36, 37, 39];
  //   // IE doesn't support indexOf
  //   var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
  //   // Some browsers just don't raise events for control keys. Easy.
  //   // e.g. Safari backspace.
  //   if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
  //     (49 <= event.which && event.which <= 57) || // Always 1 through 9
  //     (48 == event.which && $(this).attr("value")) || // No 0 first digit
  //     isControlKey) { // Opera assigns values for control keys.
  //     return;
  //   } else {
  //     event.preventDefault();
  //   }
  // });

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


  var androidAnimate = function () {
    var button = document.querySelectorAll('.anim');
    for (var i = 0; i < button.length; i++) {
      button[i].onmousedown = function (e) {

        var x = (e.offsetX == undefined) ? e.layerX : e.offsetX;
        var y = (e.offsetY == undefined) ? e.layerY : e.offsetY;
        var effect = document.createElement('div');
        effect.className = 'effect';
        effect.style.top = y + 'px';
        effect.style.left = x + 'px';
        e.srcElement.appendChild(effect);
        setTimeout(function () {
          e.srcElement.removeChild(effect);
        }, 1100);
      }
    }
  };

  // menu button
  $(".js-button-menu").click(function () {
    var menu = $(this).closest(".b-header").find(".b-nav");
    $(this).toggleClass("active");
    menu.slideToggle();
  });
  // menu button end

  // Popup
  var activePopupCenter = function () {
    var popupActive = $(".b-popup-overlay.active"),
        heightPop = popupActive.find(".b-popup").outerHeight(),
        screenHeight = $(window).height();
    if(heightPop>=screenHeight){
      popupActive.find(".b-popup").addClass("m-popup-scroll").css({
        "height": (screenHeight - 30)
      });
    }else{
      popupActive.find(".b-popup").removeClass("m-popup-scroll").css({
        "height": "auto"
      });
    }

    blockInCenter(window, popupActive);
  };

  var popup = function () {
    var popup = $(".b-popup-overlay");

    $("[data-button]").click(function () {
      var popupNum = $(this).data("button");
      $("[data-modal='" + popupNum + "']").addClass("active").animate({
        "opacity": 1
      }, 300);
      overlayOpen();
    });


    $("[data-button]").click(function (e) {
      e.preventDefault();
      activePopupCenter();
    });

    $(".b-close").click(function () {
      $(".b-popup-overlay").animate({
        "opacity": 0
      }, 300);
      setTimeout(function () {
        $(".b-popup-overlay.active").removeClass("active");
      }, 310);
      overlayClose();
    });

    $(".b-overlay").click(function () {
      $(".b-popup-overlay").animate({
        "opacity": 0
      }, 300);
      setTimeout(function () {
        $(".b-popup-overlay.active").removeClass("active");
      }, 310);
      overlayClose();
    })
  };
  // Popup end

  // Overlay
  var overlayOpen = function () {
    $(".b-overlay").addClass("active");
    $(".b-overlay").animate({
      "opacity": "1"
    }, 300);
  };

  var overlayClose = function () {

    $(".b-overlay").animate({
      "opacity": "0"
    }, 300);
    setTimeout(function () {
      $(".b-overlay").removeClass("active");
    }, 310);
  };
  // Overlay end

// popup end

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
    paginationClickable: true
  });

  var swiperGoods = new Swiper('.b-third-good-slider .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 0,
    nextButton: '.js-goods-next',
    prevButton: '.js-goods-prev',
  });

  androidAnimate();
  popup();
  // scrollFixed();


  $(window).resize(function () {
    var screenHeight = $(window).height(),
      screenWidth = $(window).width();

    popup();
    // firstScreen();
    activePopupCenter();

    if(screenWidth>= 768){
      var menu = $(".b-header .b-nav");
      $(".js-button-menu").removeClass("active");
      menu.show();
    }

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
