document.addEventListener('DOMContentLoaded', () => {
    const marvel = {
        render: (searchTerm = '') => {
            const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a269a761cd7be5188d40283fe285d774&hash=7069116fb5e1c733cff55d9f93da9b18&nameStartsWith=${searchTerm}`;
            const container = document.querySelector('#character-list');
            let contentHTML = '';

            fetch(urlAPI)
                .then(res => res.json())
                .then((json) => {
                    if (json.data.results.length === 0) {
                        contentHTML = `<p>No se encontraron personajes.</p>`;
                    } else {
                        for (const hero of json.data.results) {
                            let urlHero = hero.urls[0].url;
                            contentHTML += `
                                <div class="col-md-4 col-sm-6 card comic-card">
                                    <a href="${urlHero}" target="_blank">
                                        <h3 class="card-title">${hero.name}</h3>
                                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                                    </a>
                                </div>
                            `;
                        }
                    }
                    container.innerHTML = contentHTML;
                })
                .catch(error => {
                    console.error('Error al obtener los personajes:', error);
                    container.innerHTML = '<p>Error al cargar los personajes.</p>';
                });
        }
    };

   
    document.getElementById('search-btn').addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value;
        marvel.render(searchTerm);
    });
});


    