/******************* THIS FILE IS FOR CLIENT-SIDE LOGICS *********************/

// if MOBILE VIEW do this
if (window.screen.width <= "768") {
  $("#con_icon").show();
  $("#cat_icon").show();

  // hide break statement for MOBILE VIEW
  $(".all-wrapper #break").hide();
} else {
  $("#con_icon").hide();
  $("#cat_icon").hide();
}
var category = $(".logged-user-name").text();
UpperCase(name);

var name = $(".logged-user-role").text();
UpperCase(username);

function UpperCase(name) {
  var category = name.replace(name.charAt(0), name.charAt(0).toUpperCase());

  return Username;
}
