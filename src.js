const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("change", async (event) => {
  const image = new Image();
  image.src = URL.createObjectURL(event.target.files[0]);
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, image.width, image.height);
  const pixels = imageData.data;

  const ASCII_CHARS = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."];
  const ASCII_PALETTE = [];
  for (let i = 0; i < 256; i++) {
    const charIndex = Math.floor((i / 255) * ASCII_CHARS.length);
    ASCII_PALETTE[i] = ASCII_CHARS[charIndex];
  }

  const getBrightness = (x, y) => {
    const i = (y * image.width + x) * 4;
    return (
      0.34 * pixels[i] +
      0.5 * pixels[i + 1] +
      0.16 * pixels[i + 2]
    );
  };

  const getASCII = (x, y) => {
    const brightness = getBrightness(x, y);
    const charIndex = Math.floor((brightness / 255) * ASCII_CHARS.length);
    return ASCII_CHARS[charIndex];
  };

  let result = "";
  for (let y = 0; y < image.height; y += 6) {
    for (let x = 0; x < image.width; x += 4) {
      result += getASCII(x, y);
    }
    result += "\n";
  }

  output.textContent = result;
});

