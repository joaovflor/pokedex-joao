const state = {
  allPokemon: [],
  searchQuery: '',
  activeType: '',
  currentPage: 1,
  pageSize: 18,
};

export function getState() {
  return { ...state };
}

export function setState(partial) {
  Object.assign(state, partial);
}
