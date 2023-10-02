"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!input)
        return; //o mesmo que input===null
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert('Local precisa ter pelo menos 3 letras ');
        return;
    }
    const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=3b240899ed0a1686421b2d02eae95f3f&lang=pt_br&units=metric`);
    const dados = yield resposta.json();
    console.log(dados);
    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        temp_min: Math.round(dados.main.temp_min),
        temp_max: Math.round(dados.main.temp_max),
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };
    sectionInfos === null || sectionInfos === void 0 ? void 0 : sectionInfos.innerHTML = ` 
      <div class="tempo-dados">
        <h2>${infos.local}</h2>
        <span>${infos.temperatura}°C</span>
      </div>

     <img src="${infos.icone}" alt="Icone tempo"> `;
    sectionminmax === null || sectionminmax === void 0 ? void 0 : sectionminmax.innerHTML = `
     <span id="min" class="text-perso">Min : ${infos.temp_min}</span>
    <span id="max" class="text-perso">Max : ${infos.temp_max}</span>`;
}));
