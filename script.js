        const marvel ={
        render:()=>{
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a269a761cd7be5188d40283fe285d774&hash=7069116fb5e1c733cff55d9f93da9b18';
        const container = document.querySelector('#character-list');
        let contentHTML = '';
        fetch(urlAPI)
        .then(res => res.json()) 
        .then((json) =>{
            for (const hero of json.data.results){
                let urlHero = hero.urls[0].url;
                 contentHTML+= `
                 <div class="col-md-4 col-sm-6 card comic-card ">
                    <a href="${urlHero}" target="_blank">
                        <h3 class="card-title">${hero.name}</h3>
                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}"  alt="${hero.name}" 
                        class="img-thumbnail">
                    </a>
                    
                    </div>
                  </div>
            `;
            }
            container.innerHTML=contentHTML;
        }) 
    }

    };
    marvel.render();

    