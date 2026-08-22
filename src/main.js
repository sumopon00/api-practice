const form = document.querySelector("form");
const inputName = document.querySelector("input");
const result = document.querySelector("#result");
const historyList = document.querySelector("#history-list");

const history = [];

const typeColors = {
  normal: "#AEAEAE",
  fire: "#F3AB72",
  water: "#7DC3F2",
  electric: "#E4D546",
  grass: "#A3C23F",
  ice: "#87E6F3",
  fighting: "#DE716D",
  poison: "#A47CC5",
  ground: "#C3A953",
  flying: "#74A6EB",
  psychic: "#DD85EE",
  bug: "#74C968",
  rock: "#F2C94E",
  ghost: "#746EAF",
  dragon: "#F08E64",
  dark: "#6D81CE",
  steel: "#838AA2",
  fairy: "#EC7F9A",
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pokemonName = inputName.value.toLowerCase();
  if (!pokemonName) {
    result.innerHTML = `<p>名前を入力してください</p>`
    return;
  };
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!response.ok) {
    result.innerHTML = `<p>ポケモンが見つかりませんでした</p>`;
    return;
  }
  const data = await response.json();

  const type = data.types.map((slot) => {
    return slot.type.name;
  });
  const image = data.sprites.front_default;

  let typeHtml = "";
  type.forEach((t) => {
    const color = typeColors[t];
    typeHtml += `<span style="background-color: ${color}">・${t}</span>`;
  });

  result.innerHTML = `
    <img src="${image}">
    ${typeHtml}  
  `;

  history.push({ name: pokemonName, type: type });
  const pokemonHistory = history.slice(-5);

  let historyHtml = "";
  pokemonHistory.forEach((p) => {
    let typeSpans = "";
    p.type.forEach((t) => {
      const color = typeColors[t];
      typeSpans += `<span style="background-color: ${color}">・${t}</span>`
    });
    historyHtml += `<li>
      <p>${p.name}</p>
      <p>${typeSpans}</p>
    </li>`;
  });

  historyList.innerHTML = `${historyHtml}`;
});