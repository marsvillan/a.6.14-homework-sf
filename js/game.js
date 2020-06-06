const numDivs = 36;
const maxHits = 10;

let hits = 0;
let hitsMiss = 0;
let firstHitTime = 0;

function round() {
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(hits + 1);

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('#game-fields').addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  let totalPoints = hits + hitsMiss;
  $("#total-fails").text(" " + totalPoints);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).text("");
    round();
  } else {
    $(event.target).addClass("miss");
    hitsMiss = hitsMiss - 1;
  };
}

function init() {
  round();
  $(".game-field").click(handleClick);

  $("#start-game").click(function(){
    firstHitTime = getTimestamp();
    $("#game-fields").removeClass('d-none');
    $("#start-game").hide();
  
    $("#button-reload").removeClass('d-none');
  });

  $("#button-reload").click(function() {
    location.reload();
  });

}

$(document).ready(init);
