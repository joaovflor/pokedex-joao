import { setState } from '../state/store.js';

function getPageNumbers(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '...', total];
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function renderPagination(container, currentPage, totalPages, onPageChange) {
  if (totalPages <= 1) {
    container.innerHTML = '';
    container.onclick = null;
    return;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  container.innerHTML = `
    <nav class="pagination" aria-label="Paginação de Pokémon">
      <button
        class="pagination__btn pagination__btn--prev"
        data-action="prev"
        ${currentPage === 1 ? 'disabled' : ''}
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <div class="pagination__pages">
        ${pages
          .map((p) =>
            p === '...'
              ? `<span class="pagination__ellipsis" aria-hidden="true">…</span>`
              : `<button
                  class="pagination__page${p === currentPage ? ' pagination__page--active' : ''}"
                  data-page="${p}"
                  aria-label="Página ${p}"
                  ${p === currentPage ? 'aria-current="page"' : ''}
                >${p}</button>`
          )
          .join('')}
      </div>

      <button
        class="pagination__btn pagination__btn--next"
        data-action="next"
        ${currentPage === totalPages ? 'disabled' : ''}
        aria-label="Próxima página"
      >
        Próximo →
      </button>
    </nav>
  `;

  container.onclick = (e) => {
    const btn = e.target.closest('button:not([disabled])');
    if (!btn) return;

    let newPage = currentPage;
    if (btn.dataset.action === 'prev') newPage = currentPage - 1;
    else if (btn.dataset.action === 'next') newPage = currentPage + 1;
    else if (btn.dataset.page) newPage = parseInt(btn.dataset.page, 10);

    if (newPage !== currentPage) {
      setState({ currentPage: newPage });
      onPageChange(true);
    }
  };
}
