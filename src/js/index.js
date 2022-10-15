import * as common from "./common/common";
import * as modal from "./common/modal";
import * as analytics from "./analytics/index";
import * as utils from "./common/utils";

var DEFAULT_MALE_COLOR = "blue";
var DEFAULT_FEMALE_COLOR = "black";
var DEFAULT_GENDER = "male";
var DEFAULT_SIZE = "m";

var g_productGender = DEFAULT_GENDER;
var g_productColor = DEFAULT_MALE_COLOR;
var g_productSize = DEFAULT_SIZE;
var g_productName_map = new Object();
g_productName_map["blue"] = "Icy Blue";
g_productName_map["black"] = "Space Gray";
g_productName_map["green"] = "Jungle Green";
g_productName_map["red"] = "Coral Red";
g_productName_map["yellow"] = "Tuscan Yellow";

var g_sizing_chart = {
  "male": [
    ["XS", "34-36", "25.5"],
    ["S", "36-38", "26"],
    ["M", "38-40", "27"],
    ["L", "40-42", "28"],
    ["XL", "42-44", "29"],
    ["2XL", "44-47", "30"]
  ],
  "female": [
    ["XS", "30-32", "23"],
    ["S", "32-34", "23.5"],
    ["M", "34-36", "24"],
    ["L", "36-38", "24.5"],
    ["XL", "38-40", "25"],
    ["2XL", "40-42", "25.5"]
  ]
};

function getImageUrl(key) {
  return key;
}

function changeLandingHeroImage(gender, color) {
  if (!color) {
    color = (gender === "male") ? DEFAULT_MALE_COLOR : DEFAULT_FEMALE_COLOR;
  }
  
  $("#landing-hero-image").attr("src", getImageUrl("./assets/images/landing-hero-"+gender+"-"+color+".png"));
}

function onColorChange(newProductColor) {
  $(".o-button-circle").each(function(index, button) {
    $(this).removeClass("o-button-circle--selected");
  });
  $("#product-details-image").removeClass("s-background-product-details-"+g_productGender+"-"+g_productColor);

  $("#product-details-title").text(g_productName_map[newProductColor]);
  $("#color-picker-"+newProductColor).addClass("o-button-circle--selected");
  $("#product-details-image").addClass("s-background-product-details-"+g_productGender+"-"+newProductColor);
  $("#product-hero-image").css('background-image', 'url(' + getImageUrl("./assets/images/product-hero-"+g_productGender+"-"+newProductColor+".jpg") + ')');
  g_productColor = newProductColor;
  changeLandingHeroImage(g_productGender, newProductColor);
}

function loadSizingChart(gender) {
  $("#sizing-chart-modal h2").text(gender === "male" ? "Men's Sizing Chart" : "Women's Sizing Chart");
  var sizing_chart_table = $("#sizing-chart-modal table");
  sizing_chart_table.empty();
  sizing_chart_table.append($("<tr></tr>").append($("<th></th>"), $("<th>Chest</th>"), $("<th>Length</th>")));
  var size_array = g_sizing_chart[gender];
  for (var size_array_index = 0; size_array_index < size_array.length; ++size_array_index) { 
    var size_array_tuple = size_array[size_array_index];
    sizing_chart_table.append($("<tr></tr>").append($("<td></td>").text(size_array_tuple[0]), $("<td></td>").text(size_array_tuple[1]), $("<td></td>").text(size_array_tuple[2])));
  }
}

function onGenderChange(newProductGender) {
  $(".o-product-gender-picker .o-button-toggle-text").each(function(index, button) {
    $(this).removeClass("o-button-toggle-text--selected");
  });
  $(".o-button-circle").each(function(index, button) {
    $(this).removeClass("o-button-circle--selected");
    var buttonColor = $(this).attr("id").substring("color-picker-".length);
    if (newProductGender === "male" && ["black", "blue", "green"].indexOf(buttonColor) !== -1) {
      $(this).show();
    } else if (newProductGender === "female" && ["red", "blue", "black", "yellow"].indexOf(buttonColor) !== -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $("#product-details-image").removeClass("s-background-product-details-"+g_productGender+"-"+g_productColor);

  $("#gender-picker-"+newProductGender).addClass("o-button-toggle-text--selected");
  $("#product-details-image").addClass("s-background-product-details-"+newProductGender+"-"+g_productColor);
  $("#product-hero-image").css('background-image', 'url(' + getImageUrl("./assets/images/product-hero-"+newProductGender+"-"+g_productColor+".jpg") + ')');
  g_productGender = newProductGender;
  loadSizingChart(newProductGender);
  changeLandingHeroImage(newProductGender);
}

function onSizeChange(newProductSize) {
  $(".o-product-size-picker .o-button-toggle").each(function(index, button) {
    $(this).removeClass("o-button-toggle--selected");
  });

  $("#size-picker-"+newProductSize).addClass("o-button-toggle--selected");
  g_productSize = newProductSize;
}

function onSubscribeClick() {
  var productData = utils.getProductData();
  var subscriptionType = modal.getSubscribeModalType();
  var responseText = $("#subscribe-modal .o-subscribe-modal-status");
  responseText.text("Loading ...");
  gtag('event', 'click_internal', { 'event_category': 'click', 'event_label': 'subscribe', 'value': 1 });
  $.ajax({
      url: "https://t5us8k2b25.execute-api.us-east-1.amazonaws.com/prod/plasteeSubscribe",
      data: {
          email: $("#subscribe-modal input").val(),
          gender: g_productGender === "male" ? "Men" : "Women"
      },
      success: function(result) {
          console.log(result);
          if (result.status === "subscribed") {
            responseText.text("You have been succesfully subscribed.");
            fbq('trackCustom', 'SubscribeResponse', {
              response: "success"
            });
            fbq('track', 'CompleteRegistration', {
              value: Number(productData.price),
              currency: 'INR',
              subscriptionType: subscriptionType,
              product_color: productData.color,
              product_gender: productData.gender,
              product_price: productData.price,
              product_size: productData.size
            });
            gtag('event', 'response_subscribe', { 'event_category': 'response', 'event_label': 'success', 'value': 1 });
          } else if (result.title === "Member Exists") {
            responseText.text("You have been succesfully subscribed.");
            fbq('trackCustom', 'SubscribeResponse', {
              response: "member_exists"
            });
            gtag('event', 'response_subscribe', { 'event_category': 'response', 'event_label': 'member_exists', 'value': 1 });
          } else if (result.title === "Invalid Resource") {
            responseText.text("Please check you email id and try again.");
            fbq('trackCustom', 'SubscribeResponse', {
              response: "invalid_email"
            });
            gtag('event', 'response_subscribe', { 'event_category': 'response', 'event_label': 'invalid_email', 'value': 1 });
          } else {
            responseText.text("Please check you email id and try again.");
            fbq('trackCustom', 'SubscribeResponse', {
              response: "unknown_error"
            });
            gtag('event', 'response_subscribe', { 'event_category': 'response', 'event_label': 'unknown_error', 'value': 1 });
          }
      }
  });
}

function showSubscribeModal(title, message) {
  $("#subscribe-modal .o-subscribe-modal-title").text(title);
  $("#subscribe-modal .o-subscribe-modal-message").text(message);
  $("#subscribe-modal").parent().show();
  $("body").addClass("modal-open");
}

function installEventListeners() {
  $(".o-product-color-picker .o-button-circle").on("click", function(event) {
    var newProductColor = event.currentTarget.id.substring("color-picker-".length);
    onColorChange(newProductColor);
  });

  $(".o-product-gender-picker .o-button-toggle-text").on("click", function(event) {
    var newProductGender = event.currentTarget.id.substring("gender-picker-".length);
    onGenderChange(newProductGender);
    onColorChange(newProductGender === "male" ? DEFAULT_MALE_COLOR : DEFAULT_FEMALE_COLOR);
  });

  $(".o-product-size-picker .o-button-toggle").on("click", function(event) {
    var newProductSize = event.currentTarget.id.substring("size-picker-".length);
    onSizeChange(newProductSize);
  });

  $("#sizing-chart-button").on("click", function(event) {
    $("#sizing-chart-modal").parent().show();
    $("body").addClass("modal-open");
  });

  $("#product-buy-button").on("click", function(event) {
    showSubscribeModal("New tees on the way!", "All of our products are currently out of stock. You can drop us your email and we will let you know once they become available.");
    modal.setSubscribeModalType("product");
  });

  $("#story-know-more-link").on("click", function(event) {
    showSubscribeModal("Follow us", "Every T-shirt purchased goes towards cleaning up our cities. Subscribe to our newsletter to learn about our environmental initiatives.");
    modal.setSubscribeModalType("story");
    event.preventDefault();
  });

  $("#subscribe-modal input").keypress(function (e) {
    if(e.which === 13) { // the enter key code
      onSubscribeClick();
      $(':focus').blur();
      return false;  
    }
  });

  $("#subscribe-modal button").on("click", function(event) {
    onSubscribeClick();
  });
}

function updatePrice(price) {
  $("#product-buy-button").attr("data-price", price);
  $("#product-buy-button").text("ADD FOR ₹" + price);
}

function setupCampaign() {
  var campaignConfig = common.getParameterByName("utm_content") || "m_ib_1500";
  var config = campaignConfig.indexOf("_") !== -1 ? campaignConfig.split("_") : campaignConfig;
  var gender = g_productGender;
  if (config.length >= 1) {
    gender = config[0] === "f" ? "female" : "male";
    onGenderChange(gender);
  }
  
  var color = gender === "male" ? DEFAULT_MALE_COLOR : DEFAULT_FEMALE_COLOR;
  if (config.length >= 2) {
    switch (config[1]) {
    case "sg": color = "black"; break;
    case "ib": color = "blue"; break;
    case "jg": color = "green"; break;
    case "cr": color = "red"; break;
    case "ty": color = "yellow"; break;
    }
  }
  onColorChange(color);

  if (config.length >= 3) {
    updatePrice(config[2]);
  }
}

function initialize() {
  common.initialize();
  modal.initialize();
  analytics.initialize();
  installEventListeners();
  setupCampaign();
}

initialize();