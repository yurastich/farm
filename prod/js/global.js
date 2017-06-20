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

  var firstScreen = function () {
    var header = $(".b-header").outerHeight(),
      heightScreen = $(window).height(),
      heightFirstFooter = $(".b-first-footer").outerHeight(),
      cont = heightScreen - header - heightFirstFooter;
    if (heightScreen >= 600) {
      $(".e-first-container").css("height", cont);
    } else {
      $(".e-first-container").css("height", 431);
    }

  };

  var firstSlider = new Swiper('.b-first-slider-swiper', {
    nextButton: '.js-first-slider-next',
    prevButton: '.js-first-slider-prev',
    effect: 'fade',
    keyboardControl: "true",
    loop: true
  });

// todo Iphone Slider
  // autoplay for iphone
  var isPaused = false;
  var t = window.setInterval(function() {
    if(!isPaused) {
      iphoneSlider.slideNext();
    }
  }, 3000);
  var iphoneIs = $("div").is(".b-advantages");
  if(!iphoneIs){
    isPaused = true;
  }
  // autoplay for iphone


  var changeScreenShot = function (index) {
    if(index === 7){
      index = 1;
    }

    var items = $(".b-advantages-list .e-advantages-item[data-index="+index+"]"),
      textBlock = $(".b-advantages-text-block");
    textBlock.removeClass("active");
    items.find(".b-advantages-text-block").addClass("active");
  };

  var iphoneSlider = new Swiper('.e-iphone-slider-container.swiper-container', {
    effect: 'fade',
    loop: true,
    speed: 500,
    onTransitionStart: function(swiper){
      changeScreenShot(swiper.activeIndex);
    }
  });


  $(".b-advantages-list .e-advantages-item").click(function () {
    var itemIndex = $(this).data("index");
    changeScreenShot(itemIndex);
    iphoneSlider.slideTo(itemIndex);
  });

  $(".e-advantages-flex-container").hover(function () {
    iphoneSlider.stopAutoplay();
    isPaused = true;
  },function () {
    iphoneSlider.startAutoplay();
    isPaused = false;
  });

// todo END Iphone Slider

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
      newText = $(this).text();

    par.removeClass("active");
    item.removeClass("active");
    $(this).addClass("active");
    $(this).closest(".b-select-container").find(".e-select-title").text(newText);
  });

  $(".b-scroll-bar").mCustomScrollbar({
    axis:"y"
  });

// todo END Select

// todo Sidebar
  $(".b-arrow-sidebar").click(function () {
    var openElem = $(this).closest(".b-sidebar").find("div"),
        hasActive = $(this).hasClass("active"),
        icons = $(".b-sidebar-menu .e-sidebar-item"),
        lengthIcons = icons.length,
        menu = $(".e-sidebar-menu-container");
    if(!hasActive){
      $(".b-sidebar-menu-easy-list").addClass("active");
      $(this).addClass("active");
      menu.slideDown();
      // jump icons
      var i = lengthIcons , ended = 0;
      function iconsAnim() {
        icons.eq(i).addClass("m-sidebar-item-jump m-sidebar-item-light m-sidebar-item-visible");
        i--;
        if( i >= ended ){
          setTimeout( iconsAnim, 200)
        }else{
          setTimeout( function () {
            icons.removeClass("m-sidebar-item-jump m-sidebar-item-light");
          }, 2000)
        }
      }
      // end jump icons
      iconsAnim();
    }else{
      $(this).removeClass("active");
      $(".b-sidebar-menu-easy-list").removeClass("active");
      menu.slideUp();
      icons.removeClass("m-sidebar-item-jump m-sidebar-item-light m-sidebar-item-visible");

    }

  });

  $(".e-sidebar-item").hover(function () {
    $(this).css("z-index", 2);
    $(this).next(".e-sidebar-item").css("z-index", 1);
  }, function () {
    $(this).next(".e-sidebar-item").css("z-index", 1);
  });
// todo END Sidebar

// todo Right panel
  $(".b-button-right-panel, .js-button-right-panel").click(function () {
    var panel = $(".b-right-panel"),
        active = panel.hasClass("active"),
        buttons = $(".b-button-right-panel, .js-button-right-panel");

    if(!active){
      panel.addClass("active");
      buttons.addClass("active");
    }else{
      panel.removeClass("active");
      buttons.removeClass("active");
    }
  });
// todo END Right panel

// todo Open Content
  var openContent = function (button) {
    var button = $(button),
        containerGlobal = button.closest(".js-openContentGlobal"),
        container = containerGlobal.find(".js-openContentContainer"),
        content = containerGlobal.find(".js-openContentContent"),
        containerHeight = container.outerHeight(),
        newHeight = content.outerHeight(),
        savedHeight = container.attr("savedheight"),
        active = button.hasClass("active");


    if(!active){
      container.attr("savedheight", containerHeight);

      container.animate({
        "height": newHeight
      }, 300);
      button.addClass("active");
    }else{
      container.animate({
        "height": savedHeight
      }, 300);
      button.removeClass("active");
    }
  };

  $(".js-openContentButton").click(function (e) {
    e.preventDefault();
    openContent(this);
  });

// todo END Open Content

  var peopleCompany = new Swiper('.e-people-slider-container', {
    slidesPerView: 6,
    centeredSlides: false,
    spaceBetween: 5
  });

  // todo Universal Trigger Active
  $(".js-active").click(function () {
    var active = $(this).hasClass("active");
    if(!active){
      $(this).addClass("active");
    }else{
      $(this).removeClass("active");
    }
  });
  // todo END Universal Trigger Active

  // b-info-search list on right panel
  $(".e-info-search-header").click(function () {
    var active = $(this).hasClass("active"),
        list = $(this).closest(".e-info-search-item").find(".b-info-detail-search-list"),
        lists = $(".b-info-detail-search-list"),
        allHeader = $(".e-info-search-header");
    if(!active){
      allHeader.removeClass("active")
      $(this).addClass("active");
      lists.slideUp();
      list.slideDown();
    }else{
      $(this).removeClass("active");
      lists.slideUp();
      allHeader.removeClass("active")
    }
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
