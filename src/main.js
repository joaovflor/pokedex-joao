import './styles/main.scss';
import { fetchAllPokemon, fetchPokemonDetail } from './api/pokeapi.js';
import { getState, setState } from './state/store.js';
import { renderSearch } from './components/search.js';
import { renderGrid } from './components/card.js';
import { renderPagination } from './components/pagination.js';

async function render(scrollTop = false) {
  const { allPokemon, searchQuery, currentPage, pageSize } = getState();

  const grid = document.getElementById('pokemon-grid');

  let filtered = allPokemon;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((p) => p.name.includes(q));
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageSlice = filtered.slice(start, start + pageSize);

  const details = await Promise.all(pageSlice.map((p) => fetchPokemonDetail(p.name)));

  renderGrid(grid, details);
  renderPagination(document.getElementById('pagination-container'), safePage, totalPages, render);

  if (scrollTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

async function init() {
  renderSearch(document.getElementById('search-container'), render);

  const allPokemon = await fetchAllPokemon();

  setState({ allPokemon });

  await render();

  document.querySelector('.header__logo').style.opacity = '1';
}

init();
