document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const characterList = document.getElementById('character-list');

    const urlAPI='https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a269a761cd7be5188d40283fe285d774&hash=7069116fb5e1c733cff55d9f93da9b18';
   
    fetch(urlAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de personajes');
            }
            return response.json();
        })
        .then(data => {
            renderCharacterList(data.data.results);
        })
        .catch(error => {
            characterList.innerHTML = `<p>${error.message}</p>`;
            console.error('Error:', error);
        });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            fetch(urlAPI)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la búsqueda de personajes');
                    }
                    return response.json();
                })
                .then(data => {
                    characterList.innerHTML = '';
                    if (data.data.results.length > 0) {
                        renderCharacterList(data.data.results);
                    } else {
                        characterList.innerHTML = '<p>No se encontraron personajes.</p>';
                    }
                })
                .catch(error => {
                    characterList.innerHTML = `<p>${error.message}</p>`;
                    console.error('Error:', error);
                });
        }
    });

    function renderCharacterList(characters) {
        characterList.innerHTML = '';
        characters.forEach(character => {
            characterList.innerHTML += `
                <div class="col-md-4 col-sm-6">
                    <div class="character card comic-card">
                        <h3 class="card-title">${character.name}</h3>
                        <img src="${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}" />
                    </div>
                </div>
            `;
        });
    }
    

    function md5(string) {
        return CryptoJS.MD5(string).toString(); 
    }
});

