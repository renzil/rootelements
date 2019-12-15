import * as commonAnalytics from "../common/analytics";
import * as modal from "../common/modal";

function addAnalytics() {
  $("#subscribe-modal .o-button-primary").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'SubscribeModal_Subscribe', 'value': modal.getSubscribeModalType() });
  });

  $("#hero-shop-now-link").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Hero_ShopNow', 'value': 1 });
  });

  $("#story-know-more-link").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Story_KnowMore', 'value': 1 });
  });

  $("#gender-picker-male").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Gender', 'value': 'male' });
  });

  $("#gender-picker-female").on("click", function() {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Gender', 'value': 'female' });
  });

  $(".o-product-color-picker .o-button-circle").on("click", function(e) {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Color', 'value': $(e.target).attr("data-color") });
  });

  $(".o-product-size-picker .o-button-toggle").on("click", function(e) {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Size', 'value': $(e.target).attr("data-size") });
  });

  $("#sizing-chart-button").on("click", function(e) {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_SizingChart', 'value': 1 });
  });

  $("#product-buy-button").on("click", function(e) {
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Price', 'value': $("#product-buy-button").attr("data-price") });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Gender', 'value': $(".o-product-gender-picker .o-button-toggle-text--selected").attr("data-gender") });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Color', 'value': $(".o-product-color-picker .o-button-circle--selected").attr("data-color") });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Size', 'value': $(".o-product-size-picker .o-button-toggle--selected").attr("data-size") });
  });
}

export function initialize() {
  commonAnalytics.initialize();
  addAnalytics();
}