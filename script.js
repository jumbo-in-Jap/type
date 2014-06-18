$(function() {

  // スタートを押すと
  $("#startBtn").click(function() {
    $(".firstarea").css("display", "none");
    $(".secondarea").css("display", "block");
  });

  // 決勝にする
  $(".title").click(function() {
    $(".title img").attr("src", "images/final.png");
    $("body").addClass('final');
  });
})