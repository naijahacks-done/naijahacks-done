$("#image").on("change", e => {
  let file = e.target.files[0];
  var fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  // Display file URL only
  fileReader.onload = e => {
    console.log(e.target.result);
    $(".image-frame").css("background-image", `url(${e.target.result})`);
  };
  // Display file Properties
});
