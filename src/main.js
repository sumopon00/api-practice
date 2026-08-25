const form = document.querySelector("form");
const inputName = document.querySelector("input");
const result = document.querySelector("#result");
const historyList = document.querySelector("#history-list");

const history = [];

const typeColors = {
  normal: { bg: "#AEAEAE", text: "#1a1a1a" },
  fire: { bg: "#F3AB72", text: "#1a1a1a" },
  water: { bg: "#7DC3F2", text: "#1a1a1a" },
  electric: { bg: "#E4D546", text: "#1a1a1a" },
  grass: { bg: "#A3C23F", text: "#1a1a1a" },
  ice: { bg: "#87E6F3", text: "#1a1a1a" },
  fighting: { bg: "#DE716D", text: "#1a1a1a" },
  poison: { bg: "#A47CC5", text: "#f0f0f0" },
  ground: { bg: "#C3A953", text: "#1a1a1a" },
  flying: { bg: "#74A6EB", text: "#1a1a1a" },
  psychic: { bg: "#DD85EE", text: "#1a1a1a" },
  bug: { bg: "#74C968", text: "#1a1a1a" },
  rock: { bg: "#F2C94E", text: "#1a1a1a" },
  ghost: { bg: "#746EAF", text: "#f0f0f0" },
  dragon: { bg: "#F08E64", text: "#1a1a1a" },
  dark: { bg: "#6D81CE", text: "#f0f0f0" },
  steel: { bg: "#838AA2", text: "#1a1a1a" },
  fairy: { bg: "#EC7F9A", text: "#1a1a1a" },
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
    result.innerHTML = `
      <p>ポケモンが見つかりませんでした</p>
      <p>＊フォルム(見た目)違いがあるポケモンは、名前の後ろに追加の情報が必要になる場合があります</p>
    `;
    return;
  }
  const data = await response.json();
  const id = data.id;
  const name = data.name;
  const type = data.types.map((slot) => {
    return slot.type.name;
  });
  const image = data.sprites.front_default;

  let typeHtml = "";
  type.forEach((t) => {
    const bgColor = typeColors[t].bg;
    const textColor = typeColors[t].text;
    typeHtml += `<span style="background-color: ${bgColor}; color: ${textColor}">${t}</span>`;
  });

  result.innerHTML = `
    <p>name: ${name}</p>
    <img src="${image}">
    <p>id: #${id}</p>
    <p>type: ${typeHtml}</p>  
  `;

  history.push({ image: image, name: pokemonName, type: type });
  const pokemonHistory = history.slice(-5);

  let historyHtml = "";
  pokemonHistory.forEach((p) => {
    let typeSpans = "";
    p.type.forEach((t) => {
      const bgColor = typeColors[t].bg;
      const textColor = typeColors[t].text;
      typeSpans += `<span style="background-color: ${bgColor}; color: ${textColor}">${t}</span>`
    });
    historyHtml += `<li>
      <img src="${p.image}">
      <span>${p.name}</span>
      <span>${typeSpans}</span>
    </li>`;
  });

  historyList.innerHTML = `${historyHtml}`;

  inputName.value = "";
  console.log(data);
});