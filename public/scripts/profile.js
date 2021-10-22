console.log("hello");

$(document).ready(function () {
  console.log("HELLO");
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() - 200 > 0) {
        $('#to-top').stop().slideDown('fast');
      } else {
        $('#to-top').stop().slideUp('fast');
      }
    });
  });
  $("#to-top").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 200);
  });

  $("#favorites").on("click", function () {
    $("#slider").slideUp('slow');
    $("#slider").slideDown('slow');
  });
  $("#mine").on("click", function () {
    $("#slider").slideToggle('slow');
  });
  $("#contributions").on("click", function () {
    $("#slider").slideUp('slow');
    $("#slider").slideDown('slow');
  });
  //DOCUMENT.READY
});
