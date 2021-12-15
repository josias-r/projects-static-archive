var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var startText = document.querySelector(".start > span");
  startText.innerHTML = "Loading...";
});
window.addEventListener("load", function () {
  document.body.classList.remove("loading");
  var startText = document.querySelector(".start > span");
  startText.innerHTML = "Spiel starten.";
  var welcome = document.querySelector(".welcome");
  var start = document.querySelector(".welcome .start");
  var vid = document.querySelector(".video video");
  start.addEventListener("click", function () {
    if (vid.canPlayType("video/webm") || vid.canPlayType("video/mp4")) {
      vid.play();
      welcome.classList.add("loading");
      setTimeout(function () {
        welcome.classList.add("hidden");
      }, 1000);
    } else {
      alert("Sorry, dieser Browser unterstützt das Videoformat nicht.");
    }
    document.querySelector(".cursor").classList.remove("hand");
  });

  var legend = document.querySelector(".legend");
  var legendBtn = document.querySelector(".legend-btn");
  var legendCArea = legend.querySelector(".legend .close-area");
  var legendAlert = legendBtn.querySelector(".alert");
  legendBtn.addEventListener("click", function () {
    legend.classList.toggle("active");
    legendBtn.classList.toggle("active");
    legendAlert.classList.remove("active");
    var entries = legend.querySelectorAll("div[data-item-name].active");
    forEach(entries, function (i, el) {
      el.classList.remove("active");
    });
  });
  legendCArea.addEventListener("click", function (e) {
    legend.classList.toggle("active");
    legendBtn.classList.toggle("active");
  });

  var itemCount = 0;
  mapItems = document.querySelectorAll(".map > div");
  forEach(mapItems, function (i, el) {
    itemCount++;
    var itemName = el.getAttribute("data-item-name");
    var itemNameCleared = itemName
      .replace(/\u00e4/g, "ae")
      .replace(/\u00fc/g, "ue")
      .replace(/\u00f6/g, "oe");
    var itemIMG =
      "./assets/images/legend/" + itemNameCleared.replace(/ /g, "-") + ".svg";
    var itemCont = legend.querySelector(".center");
    var newDiv = document.createElement("DIV");
    var newIMG = document.createElement("IMG");
    var newP = document.createElement("P");
    var storyP = el.querySelector(".story");

    newIMG.setAttribute("src", itemIMG);
    newP.innerHTML = itemName;
    newDiv.setAttribute("data-item-name", itemName);
    newDiv.appendChild(newIMG);
    newDiv.appendChild(newP);
    newDiv.appendChild(storyP);
    itemCont.appendChild(newDiv);

    newDiv.addEventListener("click", function () {
      newDiv.classList.toggle("active");
    });
  });
  mapItemsPaths = document.querySelectorAll(
    ".map > div svg path, .map > div svg circle, .map > div svg rect"
  );
  forEach(mapItemsPaths, function (i, el) {
    el.addEventListener("mouseup", function () {
      if (isDragging < 5) {
        itemCount--;
        var elName = el
          .closest("div[data-item-name]")
          .getAttribute("data-item-name");
        if (!el.closest("div[data-item-name]").classList.contains("found")) {
          var foundItems = document.querySelectorAll(
            'div[data-item-name="' + elName + '"]'
          );
          forEach(foundItems, function (i, el) {
            el.classList.add("found");
          });
          legendAlert.querySelector("span").innerHTML = elName;
          legendAlert.classList.remove("active");
          setTimeout(function () {
            legendAlert.classList.add("active");
          }, 1);
        }
      }
      if (itemCount === 0) {
        legend.classList.add("active");
        legendBtn.classList.add("active");
        legendAlert.innerHTML =
          "Du hast alles gefunden, <span>lies dir die Geschichten durch!</span> Die SBW Neue Medien wünscht Ihnen frohe Ostern.";
        legendAlert.classList.remove("active");
        setTimeout(function () {
          legendAlert.classList.add("active");
        }, 1);
      }
    });
  });

  var isDragging = 0;

  var dragScroll = function (e) {
    // e.preventDefault();

    preMousePos.x = mousePos.x;
    preMousePos.y = mousePos.y;
    mousePos.x = e.clientX || e.touches[0].clientX;
    mousePos.y = e.clientY || e.touches[0].clientY;
    if (!newTrigger) {
      vidCont.scrollTop += preMousePos.y - mousePos.y;
      vidCont.scrollLeft += preMousePos.x - mousePos.x;
    }
    newTrigger = false;
    isDragging++;
  };

  var vidCont = document.querySelector(".vid-container");
  vidCont.scrollLeft = (vid.offsetWidth - window.innerWidth) / 2;
  var mousePos = { x: -1, y: -1 };
  var preMousePos = { x: -1, y: -1 };
  var newTrigger = true;
  //Basket
  document.querySelector(".video").addEventListener(
    "mouseenter",
    function (e) {
      document.querySelector(".cursor").classList.remove("hand");
    },
    false
  );

  document.querySelector(".video").addEventListener(
    "mouseleave",
    function (e) {
      document.querySelector(".cursor").classList.add("hand");
    },
    false
  );

  //Mouse
  vidCont.addEventListener(
    "mousedown",
    function () {
      vidCont.addEventListener("mousemove", dragScroll, false);
    },
    false
  );

  vidCont.addEventListener("mouseup", function () {
    vidCont.removeEventListener("mousemove", dragScroll, false);
    isDragging = 0;
    newTrigger = true;
  });
  document.addEventListener("mouseleave", function () {
    vidCont.removeEventListener("mousemove", dragScroll, false);
    newTrigger = true;
  });

  // Touch
  vidCont.addEventListener(
    "touchstart",
    function (e) {
      vidCont.addEventListener("touchmove", dragScroll, false);
    },
    false
  );

  vidCont.addEventListener("touchend", function (e) {
    vidCont.removeEventListener("touchmove", dragScroll, false);
    isDragging = 0;
    newTrigger = true;
  });

  var muteBtn = document.querySelector(".audio > .mute");
  var unmuteBtn = document.querySelector(".audio > .play");
  var audioBtns = document.querySelector(".audio");
  muteBtn.addEventListener("click", function (e) {
    document.getElementById("bg-soundfx").pause();
    audioBtns.classList.toggle("playing");
  });
  unmuteBtn.addEventListener("click", function (e) {
    document.getElementById("bg-soundfx").play();
    audioBtns.classList.toggle("playing");
  });

  var slider = document.querySelector('.slider input[type="range"]');
  slider.addEventListener("input", function (e) {
    vid.style.width = slider.value + "%";
    document.querySelector(".vid-container .map").style.width =
      slider.value + "%";
  });
  slider.addEventListener("change", function (e) {
    vid.style.width = slider.value + "%";
    document.querySelector(".vid-container .map").style.width =
      slider.value + "%";
  });
});
