const BASE = 'https://pokeapi.co/api/v2';
const detailCache = new Map();

export async function fetchAllPokemon() {
  const res = await fetch(`${BASE}/pokemon?limit=10000&offset=0`);
  if (!res.ok) throw new Error('Falha ao buscar lista de Pokémon');
  const data = await res.json();
  return data.results;
}

export async function fetchPokemonDetail(name) {
  if (detailCache.has(name)) return detailCache.get(name);
  const res = await fetch(`${BASE}/pokemon/${name}`);
  if (!res.ok) throw new Error(`Falha ao buscar ${name}`);
  const data = await res.json();
  detailCache.set(name, data);
  return data;
}
