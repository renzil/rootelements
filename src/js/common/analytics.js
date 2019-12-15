var maxScrollPercent = 0;
function onDocumentScroll() {
  // tbd - make sure this is not getting called too many times
  var h =  document.documentElement,
      b =  document.body,
      st =  'scrollTop',
      sh =  'scrollHeight';

  var percent = parseInt ( (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
  var scroll_depths = [25, 50, 75, 90];
  $.each(scroll_depths, function(index, value) {
    if (percent >= value && maxScrollPercent < value) {
      maxScrollPercent = value;
      gtag('event', 'scroll_change', { 'event_category': 'scroll', 'event_label': 'depth_percentage', 'value': value });
    }
  });
}

function addAnalytics() {
  $(document).scroll(function() {
    onDocumentScroll();
  });

  // Header
  $(".o-header-link[href=\"#\"], .o-header-link[href=\"/\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Header_Logo', 'value': 1 });
  });
  $(".o-header-link[href=\"#story\"], .o-header-link[href=\"/#story\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Header_Story', 'value': 1 });
  });
  $(".o-header-link[href=\"#shop\"], .o-header-link[href=\"/#shop\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Header_Shop', 'value': 1 });
  });
  $(".o-header-link[href=\"#cart\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Header_Cart', 'value': 1 });
  });

  // Footer
  $(".o-content-footernav-site a[data-type=\"home\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Footer_Home', 'value': 1 });
  });
  $(".o-content-footernav-site a[data-type=\"contact\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Footer_Contact', 'value': 1 });
  });
  $(".o-content-footernav-site a[data-type=\"privacy\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Footer_Privacy', 'value': 1 });
  });
  $(".o-content-footernav-site a[data-type=\"terms\"]").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Footer_Terms', 'value': 1 });
  });
}

export function initialize() {
  addAnalytics();  
}