const apiUrl = "https://swapi.dev/api/people/";
const imageBaseUrl = "https://starwars-visualguide.com/assets/img/characters/";
const galleryContainer = document.getElementById('gallery-container');
const showCharactersBtn = document.getElementById('show-characters-btn');

showCharactersBtn.addEventListener('click', fetchAndRenderCharacters);

async function fetchAndRenderCharacters() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const characters = data.results;

    renderGallery(characters);
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(characters) {
  galleryContainer.innerHTML = '';

  characters.forEach((character) => {
    const characterElement = document.createElement('div');
    characterElement.classList.add('character');

    const image = document.createElement('img');
    image.src = `${imageBaseUrl}${getCharacterId(character.url)}.jpg`;

    const characterName = document.createElement('p');
    characterName.classList.add('character-name');
    characterName.textContent = character.name;

    characterElement.appendChild(image);
    characterElement.appendChild(characterName);

    galleryContainer.appendChild(characterElement);
  });
}

function getCharacterId(characterUrl) {
  const urlParts = characterUrl.split('/');
  return urlParts[urlParts.length - 2];
}
