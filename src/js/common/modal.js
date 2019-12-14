var isMouseDownOnModalWrapper = false;

function hideAll() {
  $(".o-modal-wrapper").each(function(index, button) {
    $(this).hide();
  });
  $("body").removeClass("modal-open");
}

function installEventListeners() {
  $("body").on("keyup", function(e) {
    if ($("body").hasClass("modal-open") && e.which === 27) {
      hideAll();
    }
  });

  $(".o-modal-wrapper").on("mousedown", function(e) {
    if ($("body").hasClass("modal-open")) {
      if ($(e.target).hasClass("o-modal-wrapper")) {
        isMouseDownOnModalWrapper = true;
      }
    }
  });

  $(".o-modal-wrapper").on("click", function(e) {
    if ($("body").hasClass("modal-open")) {
      if ($(this).hasClass("o-modal-variant-clickout")) {
        if ($(e.target).hasClass("o-modal-wrapper") && isMouseDownOnModalWrapper === true) {
          hideAll();
        }
      } else {
        hideAll();
      }
    }
    isMouseDownOnModalWrapper = false;
  });
}

export function initialize() {
  installEventListeners();
  hideAll();
}