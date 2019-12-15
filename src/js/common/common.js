function resize() {
  var hsquares = $(".h-square");
  for (var i = 0; i < hsquares.length; ++i) {
    $(hsquares[i]).css({height: $(hsquares[i]).width() + "px"});
  }
}

function installEventListeners() {
  $("body").on("keyup", function(e) {
    if (e.which === 9) /* tab */ {
      document.documentElement.classList.remove('no-focus-outline');
    }
  });

  $(window).on("resize", function() {
    resize();
  });
}

export function initialize() {
  installEventListeners();
  resize();
}