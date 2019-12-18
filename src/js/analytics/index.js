import * as commonAnalytics from "../common/analytics";
import * as modal from "../common/modal";
import * as utils from "../common/utils";

function addAnalytics() {
  $("#subscribe-modal .o-button-primary").on("click", function() {
    var productData = utils.getProductData();
    fbq('trackCustom', 'SubscribeIntent', {
      type: modal.getSubscribeModalType(),
      product_color: productData.color,
      product_gender: productData.gender,
      product_price: productData.price,
      product_size: productData.size
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'SubscribeModal_Subscribe', 'value': modal.getSubscribeModalType() });
  });

  $("#hero-shop-now-link").on("click", function() {
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'hero_shopnow',
      product_color: productData.color,
      product_gender: productData.gender
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Hero_ShopNow', 'value': 1 });
  });

  $("#story-know-more-link").on("click", function() {
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'story_knowmore',
      product_color: productData.color,
      product_gender: productData.gender
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Story_KnowMore', 'value': 1 });
  });

  $("#gender-picker-male").on("click", function() {
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'product_gender_male',
      product_color: productData.color,
      product_price: productData.price
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Gender', 'value': 'male' });
  });

  $("#gender-picker-female").on("click", function() {
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'product_gender_female',
      product_color: productData.color,
      product_price: productData.price
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Gender', 'value': 'female' });
  });

  $(".o-product-color-picker .o-button-circle").on("click", function(e) {
    var color = $(e.target).attr("data-color");
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'product_color_' + color,
      product_color: color,
      product_gender: productData.gender,
      product_price: productData.price,
      product_size: productData.size
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Color', 'value': color });
  });

  $(".o-product-size-picker .o-button-toggle").on("click", function(e) {
    var size = $(e.target).attr("data-size");
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'product_size_' + size,
      product_color: productData.color,
      product_gender: productData.gender,
      product_price: productData.price,
      product_size: size
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Size', 'value': size });
  });

  $("#sizing-chart-button").on("click", function(e) {
    var productData = utils.getProductData();
    fbq('track', 'ViewContent', {
      content_name: 'product_sizingchart',
      product_color: productData.color,
      product_gender: productData.gender,
      product_price: productData.price,
      product_size: productData.size
    });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_SizingChart', 'value': 1 });
  });

  $("#product-buy-button").on("click", function(e) {
    var productData = utils.getProductData();
    fbq('track', 'AddToCart', {
      value: Number(productData.price),
      currency: 'INR',
      content_name: productData.gender + "_" + productData.color + "_" + productData.size,
      product_color: productData.color,
      product_gender: productData.gender,
      product_price: productData.price,
      product_size: productData.size
    });
    
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Price', 'value': productData.price });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Gender', 'value': productData.gender });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Color', 'value': productData.color });
    gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'Product_Buy_Size', 'value': productData.size });
  });
}

export function initialize() {
  commonAnalytics.initialize();
  addAnalytics();
}