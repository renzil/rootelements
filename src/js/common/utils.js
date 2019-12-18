export function getProductData() {
  var price = $("#product-buy-button").attr("data-price");
  var gender = $(".o-product-gender-picker .o-button-toggle-text--selected").attr("data-gender");
  var color = $(".o-product-color-picker .o-button-circle--selected").attr("data-color");
  var size = $(".o-product-size-picker .o-button-toggle--selected").attr("data-size");

  return {
    price: price,
    gender: gender,
    color: color,
    size: size
  };
}