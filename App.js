import React, { useState } from 'react';

const ImageToAsciiConverter = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [asciiText, setAsciiText] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setAsciiText(createAsciiText(e.target.result));
    };
    reader.readAsDataURL(file);
  };

  const createAsciiText = (imageSrc) => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const asciiChars = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const brightness = Math.round((r + g + b) / 3);
        const asciiChar = getAsciiChar(brightness);
        asciiChars.push(asciiChar);
      }
      const asciiText = createAsciiLines(asciiChars, img.width);
      setAsciiText(asciiText);
    };
  };

  const getAsciiChar = (brightness) => {
    const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];
    const range = 255 / asciiChars.length;
    const index = Math.floor(brightness / range);
    return asciiChars[index];
  };

  const createAsciiLines = (asciiChars, width) => {
    let asciiText = '';
    for (let i = 0; i < asciiChars.length; i += width) {
      const asciiLine = asciiChars.slice(i, i + width).join('');
      asciiText += asciiLine + '\n';
    }
    return asciiText;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="text-center mb-3">Image to ASCII Art Converter</h3>
          <div className="form-group">
            <label htmlFor="imageInput">Select an image:</label>
            <input type="file" className="form-control-file" id="imageInput" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          {imageSrc && (
            <div className="text-center">
              <h5>Original Image</h5>
              <img src={imageSrc} alt="Original" className="img-fluid" />
            </div>
          )}
        </div>
        <div className="col-md-6">
          {asciiText && (
            <div className="text-center">
              <h5>ASCII Art Output</h5>
              <div className="ascii-box">{asciiText}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToAsciiConverter;
