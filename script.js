async function fetchRoms() {
  try {
    const response = await fetch('roms.json');
    return await response.json();
  } catch (error) {
    console.error('Error fetching ROMs:', error);
    return [];
  }
}

function displayRoms(roms) {
  const fileList = document.getElementById('fileList');
  roms.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  roms.forEach(rom => {
    const romItem = document.createElement('div');
    romItem.classList.add('fileItem');

    const romImage = document.createElement('img');
    romImage.src = rom.image;
    romImage.alt = rom.name;
    romItem.appendChild(romImage);

    const romName = document.createElement('p');
    romName.textContent = rom.name;
    romItem.appendChild(romName);

    const lastUpdated = document.createElement('p');
    lastUpdated.textContent = `Last Updated: ${rom.lastUpdated}`;
    romItem.appendChild(lastUpdated);

    fileList.appendChild(romItem);
  });
}

function adjustColors(backgroundImageUrl) {
  const colorThief = new window.ColorThief();
  const img = new Image();
  img.src = backgroundImageUrl;

  img.onload = function () {
    const dominantColor = colorThief.getColor(img);

    document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
      button.style.color = '#fff';
    });

    const contentText = document.querySelectorAll('#content, .fileItem p');
    contentText.forEach(textElement => {
      textElement.style.color = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
    });
  };
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const roms = await fetchRoms();
    displayRoms(roms);
    adjustColors('Background.jpg');
  } catch (error) {
    console.error('Error on DOMContentLoaded:', error);
  }
});
