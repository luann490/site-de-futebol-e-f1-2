// Substitua com suas chaves de API
const apiKeyFutebol = 'SUA_API_KEY_FUTEBOL';
const apiKeyF1 = 'SUA_API_KEY_F1';

const tabelaBody = document.querySelector('#tabela-futebol');
const jogosFuturos = document.getElementById('futebol-resultados');
const f1Calendario = document.getElementById('f1-proximas');

async function carregarTabela() {
  tabelaBody.innerHTML = '';
  const url = 'https://api.api-futebol.com.br/v1/classificacao/2';
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKeyFutebol}`
    }
  };
  const res = await fetch(url, options);
  const data = await res.json();

  data.forEach(time => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${time.time}</td>
      <td>${time.pontos}</td>
      <td>${time.vitorias}</td>
      <td>${time.empates}</td>
      <td>${time.derrotas}</td>
      <td>${time.saldo_gols}</td>
    `;
    tabelaBody.appendChild(tr);
  });
}

async function carregarJogosFuturos() {
  jogosFuturos.innerHTML = '';
  const url = 'https://api.api-futebol.com.br/v1/jogos/futuros';
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKeyFutebol}`
    }
  };
  const res = await fetch(url, options);
  const data = await res.json();

  data.forEach(jogo => {
    const li = document.createElement('li');
    li.textContent = `${jogo.time_casa} vs ${jogo.time_visitante} - ${jogo.data}`;
    jogosFuturos.appendChild(li);
  });
}

async function carregarCalendarioF1() {
  f1Calendario.innerHTML = '';
  const url = 'https://ergast.com/api/f1/2025.json';
  const res = await fetch(url);
  const data = await res.json();
  const races = data.MRData.RaceTable.Races;

  races.forEach(race => {
    const li = document.createElement('li');
    li.textContent = `${race.raceName} - ${race.date}`;
    f1Calendario.appendChild(li);
  });
}

// Inicializar
carregarTabela();
carregarJogosFuturos();
carregarCalendarioF1();
