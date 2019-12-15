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

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function initialize() {
  installEventListeners();
  resize();
}