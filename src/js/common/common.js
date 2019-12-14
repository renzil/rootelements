function resize() {
  var hsquares = $(".h-square");
  for (var i = 0; i < hsquares.length; ++i) {
    $(hsquares[i]).css({height: $(hsquares[i]).width() + "px"});
  }
}

function onScroll() {
  // tbd - make sure this is not getting called too many times
  var h =  document.documentElement,
      b =  document.body,
      st =  'scrollTop',
      sh =  'scrollHeight';

  var percent = parseInt ( (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
  if (percent == 25)
  {
      gtag('event', 'scroll_change', { 'event_category': 'scroll', 'event_label': 'depth_percentage', 'value': 25 });
  }
  else if (percent == 50)
  {
      gtag('event', 'scroll_change', { 'event_category': 'scroll', 'event_label': 'depth_percentage', 'value': 50 });
  }
  else if (percent == 75)
  {
      gtag('event', 'scroll_change', { 'event_category': 'scroll', 'event_label': 'depth_percentage', 'value': 75 });
  }
  else if (percent == 90)
  {
      gtag('event', 'scroll_change', { 'event_category': 'scroll', 'event_label': 'depth_percentage', 'value': 90 });
  }
}

function installEventListeners() {
  $("body").on("keyup", function(e) {
    if (e.which === 9) /* tab */ {
      document.documentElement.classList.remove('no-focus-outline');
    }
  });

  $(document).scroll(function() {
    onScroll();
  });

  $(window).on("resize", function() {
    resize();
  });
}

export function initialize() {
  installEventListeners();
  resize();
}