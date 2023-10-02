const form = document.querySelector('#seach-form > form');
const input : HTMLInputElement | null = document.querySelector('#input-localizacao')
const sectionInfos = document.querySelector('#tempo-info')
const sectionminmax = document.querySelector('#section-min-max');
const bodyback = document.querySelector('#body')

form?.addEventListener('submit' , async (e) => { 
   e.preventDefault();

   if (!input) return //o mesmo que input===null
   const localizacao =input.value
    if (localizacao.length <3) { 
        alert('Local precisa ter pelo menos 3 letras ')
        return;
    }

    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=3b240899ed0a1686421b2d02eae95f3f&lang=pt_br&units=metric`);

    const dados = await resposta.json();
    console.log(dados)

    const infos = { 
        temperatura:Math.round(dados.main.temp), 
        local : dados.name ,  //nome da cidade ou local 
        temp_min : Math.round(dados.main.temp_min),
        temp_max : Math.round(dados.main.temp_max),
        icone : `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionInfos?.innerHTML = ` 
      <div class="tempo-dados">
        <h2>${infos.local}</h2>
        <span>${infos.temperatura}°C</span>
      </div>

     <img src="${infos.icone}" alt="Icone tempo">  `; 

    sectionminmax?.innerHTML = `
     <div id="section-min-max">
       <span id="min" class="text-perso">Min : ${infos.temp_min}</span>
           <span id="max" class="text-perso">Max : ${infos.temp_max}</span>
     </div>` ;

    if (infos.temperatura <=10) { 
      bodyback?.classList.add('gelo'); 
      bodyback?.classList.remove('sol');
      bodyback?.classList.remove('chuva');
      bodyback?.classList.remove('temp_comum');
    }
    if (infos.temperatura >10 && infos.temperatura <=15) { 
      bodyback?.classList.add('chuva'); 
      bodyback?.classList.remove('sol');
      bodyback?.classList.remove('gelo');
      bodyback?.classList.remove('temp_comum');

    }
    if (infos.temperatura >16 && infos.temperatura <=20){ 
      bodyback?.classList.add('temp_comum'); 
      bodyback?.classList.remove('chuva');
      bodyback?.classList.remove('gelo');
      bodyback?.classList.remove('sol');
    }
    if(infos.temperatura >20) { 
      bodyback?.classList.add('sol'); 
      bodyback?.classList.remove('chuva');
      bodyback?.classList.remove('gelo');
      bodyback?.classList.remove('temp_comum');
    }


});