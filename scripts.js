const projectName = "random-darksouls-item-description";

const BASE_REQUEST =
  "https://gist.githubusercontent.com/Aldamsito/b927945a14f13280cf45bfae0ca02532/raw/86529c22f8b41c038ce230b40d112af000918de1/BasePhrases";
const FILL_REQUEST =
  "https://gist.githubusercontent.com/Aldamsito/b927945a14f13280cf45bfae0ca02532/raw/86529c22f8b41c038ce230b40d112af000918de1/FillPhrases";

let baseData, fillData;

var currentBase = "",
  currentFill = "";

function getData() {
  $.ajax({
    type: "GET",
    url: BASE_REQUEST,
    success: function (data) {
      baseData = data.split("\n");
      console.log("basedata");
      console.log(baseData);
    },
    error: () => {
      console.log("Error: BASE NOT FOUND");
    }
  });

  return $.ajax({
    type: "GET",
    url: FILL_REQUEST,
    success: function (data) {
      fillData = data.split("\n");
      console.log("filldata");
      console.log(fillData);
    },
    error: () => {
      console.log("Error: FILL NOT FOUND");
    }
  });
}

function getRandom(dataItem) {
  return dataItem[Math.floor(Math.random() * dataItem.length)];
}

function getMessage() {
  let randomBase = getRandom(baseData);
  let randomFill = getRandom(fillData);

  let index = randomBase.indexOf("*");

  let message = randomBase;
  if (index != -1) {
    if (index > 2) randomFill = randomFill.toLowerCase();

    message =
      randomBase.substring(0, index) +
      randomFill +
      randomBase.substring(index).replace(/\*/g, "");
  }

  console.log(message + " = " + randomBase + " + " + randomFill);

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=darksoulsmessages&related=freecodecamp&text=" +
      encodeURIComponent('"' + message + '" ')
  );

  $("#text").hide().html(message).fadeIn();
}

$(document).ready(function () {
  getData().then(() => {
    getMessage();
  });

  $("#new-quote").on("click", getMessage);
});
