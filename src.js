// Load the image
var img = new Image();
img.src = "path/to/your/image.jpg";
img.onload = function() {
  // Create an off-screen canvas to draw the image
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get the pixel data from the canvas
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var pixels = imageData.data;

  // ASCII characters to use for the art
  var asciiChars = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

  // Build the ASCII art string
  var asciiArt = "";
  for (var i = 0; i < pixels.length; i += 4) {
    // Get the average brightness of the pixel
    var brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    // Map the brightness to an ASCII character
    var charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
    asciiArt += asciiChars[charIndex];
  }

  // Display the ASCII art in a div
  var asciiArtDiv = document.createElement("div");
  asciiArtDiv.style.fontFamily = "monospace";
  asciiArtDiv.style.whiteSpace = "pre";
  asciiArtDiv.textContent = asciiArt;
  document.body.appendChild(asciiArtDiv);
};

