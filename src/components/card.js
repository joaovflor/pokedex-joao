const tiposPT = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico',
  grass: 'Planta', ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno',
  ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio',
  steel: 'Aço', fairy: 'Fada',
};

function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

function getPrimaryType(pokemon) {
  return pokemon.types[0]?.type.name ?? 'normal';
}

function getSprite(pokemon) {
  return (
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default || pokemon.sprites?.other?.['official-image']?.front_default ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%2349454F' stroke-width='1' fill='none'/%3E%3Ccircle cx='12' cy='12' r='3' fill='%2349454F'/%3E%3Cline x1='2' y1='12' x2='22' y2='12' stroke='%2349454F' stroke-width='1'/%3E%3C/svg%3E"
  );
}

function createCardHTML(pokemon) {
  const primaryType = getPrimaryType(pokemon);
  const sprite = getSprite(pokemon);
  const typeBadges = pokemon.types
    .map((t) => `<span class="type-badge type-badge--${t.type.name}">${tiposPT[t.type.name] ?? t.type.name}</span>`)
    .join('');

  return `
    <div class="pokemon-card pokemon-card--${primaryType}" tabindex="0" role="listitem">
      <div class="pokemon-card__header">
        <div class="pokemon-card__types">${typeBadges}</div>
        <span class="pokemon-card__number">${formatId(pokemon.id)}</span>
      </div>
      <div class="pokemon-card__image-wrapper">
        <img
          class="pokemon-card__image"
          src="${sprite ?? PLACEHOLDER_SVG}"
          alt="${pokemon.name}"
          width="110"
          height="110"
        />
      </div>
      <h2 class="pokemon-card__name">${pokemon.name}</h2>
    </div>
  `;
}

export function renderGrid(container, pokemonList) {
  if (pokemonList.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p class="no-results__title">Nenhum Pokémon encontrado</p>
        <p class="no-results__hint">Tente outro nome ou tipo.</p>
      </div>
    `;
    return;
  }
  container.innerHTML = pokemonList.map(createCardHTML).join('');
}
