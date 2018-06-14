function resizeDataUri(datas, wantedWidth, wantedHeight, callback) {
  // We create an image to receive the Data URI
  var img = document.createElement("img");

  // When the event "onload" is triggered we can resize the image.
  img.onload = function() {
    // We create a canvas and get its context.
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // We set the dimensions at the wanted size.
    canvas.width = wantedWidth;
    canvas.height = wantedHeight;

    // We resize the image with the canvas method drawImage();
    ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

    var dataURI = canvas.toDataURL();
    callback(dataURI);
  };
  // We put the Data URI in the image's src attribute
  img.src = datas;
}

// returns base64 encoding of image
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export { resizeDataUri, getBase64 };
