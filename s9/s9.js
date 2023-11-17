// Function to load specifications
function loadSpecifications(specs) {
    const specsList = document.querySelector('.specs ul');
  
    // Clear existing content
    specsList.innerHTML = '';
  
    specs.forEach(spec => {
      const li = document.createElement('li');
      li.textContent = `${spec.name}: ${spec.value}`;
      specsList.appendChild(li);
    });
  }
  
  // Function to load ROMs
  function loadROMs(roms) {
    const romsContainer = document.querySelector('.roms');
  
    // Clear existing content
    romsContainer.innerHTML = '';
  
    roms.forEach(rom => {
      const romBox = document.createElement('div');
      romBox.classList.add('rom-box');
  
  
      const romHeaderPhoto = document.createElement('img');
      romHeaderPhoto.src = rom.headerPhoto;
      romHeaderPhoto.alt = rom.name;
  
      const romName = document.createElement('h3');
      romName.textContent = rom.name;
  
      const romDescription = document.createElement('p');
      romDescription.textContent = rom.description;
  
      const romButtons = document.createElement('div');
      rom.buttons.forEach(button => {
        const buttonElement = document.createElement('a');
        buttonElement.href = button.link;
        buttonElement.textContent = button.text;
        buttonElement.classList.add('rom-button');
        romButtons.appendChild(buttonElement);
      });
  
      romBox.appendChild(romHeaderPhoto);
      romBox.appendChild(romName);
      romBox.appendChild(romDescription);
      romBox.appendChild(romButtons);
  
      romsContainer.appendChild(romBox);
    });
  }
  
  // Load specifications and ROMs when the page is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Fetch specifications data
    fetch('./specs.json')
      .then(response => response.json())
      .then(specificationsData => {
        loadSpecifications(specificationsData);
      })
      .catch(error => console.error('Error loading specifications:', error));
  
    // Fetch ROMs data
    fetch('./roms.json')
      .then(response => response.json())
      .then(romsData => {
        loadROMs(romsData);
      })
      .catch(error => console.error('Error loading ROMs:', error));
  });
  