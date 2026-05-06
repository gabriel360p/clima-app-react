import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./style.css";

function Home() {

  //chave da api
  const apiKey = "6c77dbad592cbe84a94491860fd3b689";

  //Minhas variáveis de estado para armazenar os dados da API
  const [clima, setClima] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [vento, setVento] = useState(null);
  const [temp, setTemp] = useState(null);
  const [descricao, setDescricao] = useState(null);//quando está null, quer dizer que eu não sei oq ele vai receber
  const [dataTemp, setDataTemp] = useState([]);//quando coloco parênteses significa que esse estado vai receber uma array
  
  //capturando os dados do meu input
  const inputCity = useRef();

  //minha função que faz requisição para a API e busca os dados do clima
  async function searchClima() {

    //se nenhum dado for inserido ele automaticamente vai procurar por SP
    if (
      //dando um valor padrão para o input, caso o usuário não digite nada
      inputCity.current.value == "" ||
      inputCity.current.value === undefined
    ) {
      inputCity.current.value = "Sao Paulo";
    }

    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.current.value}&appid=${apiKey}&units=metric&lang=pt_br`,
      );

      console.log(data);

      //definindo os meus estados com os dados da API
      setDescricao(data.data.weather[0].description);
      setCidade(data.data.name);
      setTemp(Math.round(data.data.main.temp));
      setUmidade(data.data.main.humidity);
      setVento(data.data.wind.speed);

    } catch (error) {
      alert("Erro ao buscar clima");
      console.log(error);
    }
  }

  //Usando o useEffect para buscar o clima da cidade padrão quando a página for carregada
  useEffect(() => {
    searchClima();
  }, []);

  return (
    <div className="app">
      <header>
        <h1> React Clima 🌤️</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Digite uma cidade..."
            ref={inputCity}
            id="cityInput"
          />
          <button onClick={searchClima}>Buscar</button>
        </div>
      </header>

      <main id="weatherContainer">
        <h2 id="cityName">{cidade}</h2>

        <div className="weather-info">
          <div className="temp" id="temperature">
            {temp}°C
          </div>
          <div className="description" id="description">
            {descricao}
          </div>
        </div>

        <div className="details">
          <div>
            <span>💧 Umidade</span>
            <p id="humidity">{umidade}%</p>
          </div>

          <div>
            <span>🌬️ Vento</span>
            <p id="wind">{vento} km/h</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
