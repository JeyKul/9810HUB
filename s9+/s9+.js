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
  
  async function fetchFileList(folderPath) {
    try {
      const response = await fetch(folderPath);
      if (!response.ok) {
        throw new Error(`Error fetching file list: ${response.statusText}`);
      }
      const fileListText = await response.text();
  
      // Extract JSON file links from HTML
      const jsonFileLinks = Array.from(
        fileListText.matchAll(/<a href="([^"]+\.json)">/g),
        match => match[1]
      );
  
      console.log('JSON Files:', jsonFileLinks);
  
      return jsonFileLinks;
    } catch (error) {
      console.error('Error fetching file list:', error);
      return [];
    }
  }
  
  // Function to load ROMs
  async function loadROMs() {
    const romsContainer = document.querySelector('.roms');
  
    // Clear existing content
    romsContainer.innerHTML = '';
  
    try {
        const romFiles = await fetchFileList('./roms', '.json');
        console.log('ROM Files:', romFiles);
        
        // Load ROM data for each file
        for (const romFileName of romFiles) {
          // Fetch ROM file data
          const romResponse = await fetch(`./roms/${romFileName}`);
          if (!romResponse.ok) {
            console.error(`Error loading ROM file (${romFileName}): ${romResponse.statusText}`);
            continue;
          }
        
          const romData = await romResponse.json();
  
        const romBox = document.createElement('div');
        romBox.classList.add('rom-box');
  
        const romHeaderPhoto = document.createElement('img');
        romHeaderPhoto.src = romData.headerPhoto;
        romHeaderPhoto.alt = romData.name;
  
        const romName = document.createElement('h3');
        romName.textContent = romData.name;
  
        const romDescription = document.createElement('p');
        romDescription.textContent = romData.description;
  
        const romButtons = document.createElement('div');
        romData.buttons.forEach(button => {
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
      }
    } catch (error) {
      console.error('Error loading ROMs:', error);
    }
  }
  
  // Function to fetch the list of ROMs
  async function fetchROMsList() {
    try {
      const response = await fetch('./roms/roms.json');
      if (!response.ok) {
        throw new Error(`Error fetching ROMs list: ${response.statusText}`);
      }
      const romsList = await response.json();
      return romsList;
    } catch (error) {
      console.error('Error fetching ROMs list:', error);
      return [];
    }
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
  
    // Load ROMs data
    loadROMs(); // Change this line to use the correct function name
  });
  