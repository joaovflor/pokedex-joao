(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();const g="https://pokeapi.co/api/v2",l=new Map;async function b(){const e=await fetch(`${g}/pokemon?limit=10000&offset=0`);if(!e.ok)throw new Error("Falha ao buscar lista de Pokémon");return(await e.json()).results}async function v(e){if(l.has(e))return l.get(e);const t=await fetch(`${g}/pokemon/${e}`);if(!t.ok)throw new Error(`Falha ao buscar ${e}`);const i=await t.json();return l.set(e,i),i}const m={allPokemon:[],searchQuery:"",activeType:"",currentPage:1,pageSize:18};function w(){return{...m}}function u(e){Object.assign(m,e)}function C(e,t){let i;return(...o)=>{clearTimeout(i),i=setTimeout(()=>e(...o),t)}}function P(e,t){e.innerHTML=`
    <label class="search" for="search-input">
      <input
        id="search-input"
        class="search__input"
        type="search"
        placeholder="Faça uma busca pelo nome do pokémon"
        autocomplete="off"
        aria-label="Buscar Pokémon por nome"
      />
      <svg class="search__icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#49454F"/>
    </svg>

    </label>
  `;const i=e.querySelector("#search-input"),o=C(a=>{u({searchQuery:a.trim(),currentPage:1}),t()},350);i.addEventListener("input",a=>o(a.target.value))}const $={normal:"Normal",fire:"Fogo",water:"Água",electric:"Elétrico",grass:"Planta",ice:"Gelo",fighting:"Lutador",poison:"Veneno",ground:"Terra",flying:"Voador",psychic:"Psíquico",bug:"Inseto",rock:"Pedra",ghost:"Fantasma",dragon:"Dragão",dark:"Sombrio",steel:"Aço",fairy:"Fada"};function k(e){return`#${String(e).padStart(3,"0")}`}function L(e){var t;return((t=e.types[0])==null?void 0:t.type.name)??"normal"}function x(e){var t,i,o,a,n,r,s;return((o=(i=(t=e.sprites)==null?void 0:t.other)==null?void 0:i["official-artwork"])==null?void 0:o.front_default)||((a=e.sprites)==null?void 0:a.front_default)||((s=(r=(n=e.sprites)==null?void 0:n.other)==null?void 0:r["official-image"])==null?void 0:s.front_default)||"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%2349454F' stroke-width='1' fill='none'/%3E%3Ccircle cx='12' cy='12' r='3' fill='%2349454F'/%3E%3Cline x1='2' y1='12' x2='22' y2='12' stroke='%2349454F' stroke-width='1'/%3E%3C/svg%3E"}function E(e){const t=L(e),i=x(e),o=e.types.map(a=>`<span class="type-badge type-badge--${a.type.name}">${$[a.type.name]??a.type.name}</span>`).join("");return`
    <div class="pokemon-card pokemon-card--${t}" tabindex="0" role="listitem">
      <div class="pokemon-card__header">
        <div class="pokemon-card__types">${o}</div>
        <span class="pokemon-card__number">${k(e.id)}</span>
      </div>
      <div class="pokemon-card__image-wrapper">
        <img
          class="pokemon-card__image"
          src="${i??PLACEHOLDER_SVG}"
          alt="${e.name}"
          width="110"
          height="110"
        />
      </div>
      <h2 class="pokemon-card__name">${e.name}</h2>
    </div>
  `}function S(e,t){if(t.length===0){e.innerHTML=`
      <div class="no-results">
        <p class="no-results__title">Nenhum Pokémon encontrado</p>
        <p class="no-results__hint">Tente outro nome ou tipo.</p>
      </div>
    `;return}e.innerHTML=t.map(E).join("")}function T(e,t){return t<=5?Array.from({length:t},(i,o)=>o+1):e<=3?[1,2,3,"...",t]:e>=t-2?[1,"...",t-2,t-1,t]:[1,"...",e-1,e,e+1,"...",t]}function M(e,t,i,o){if(i<=1){e.innerHTML="",e.onclick=null;return}const a=T(t,i);e.innerHTML=`
    <nav class="pagination" aria-label="Paginação de Pokémon">
      <button
        class="pagination__btn pagination__btn--prev"
        data-action="prev"
        ${t===1?"disabled":""}
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <div class="pagination__pages">
        ${a.map(n=>n==="..."?'<span class="pagination__ellipsis" aria-hidden="true">…</span>':`<button
                  class="pagination__page${n===t?" pagination__page--active":""}"
                  data-page="${n}"
                  aria-label="Página ${n}"
                  ${n===t?'aria-current="page"':""}
                >${n}</button>`).join("")}
      </div>

      <button
        class="pagination__btn pagination__btn--next"
        data-action="next"
        ${t===i?"disabled":""}
        aria-label="Próxima página"
      >
        Próximo →
      </button>
    </nav>
  `,e.onclick=n=>{const r=n.target.closest("button:not([disabled])");if(!r)return;let s=t;r.dataset.action==="prev"?s=t-1:r.dataset.action==="next"?s=t+1:r.dataset.page&&(s=parseInt(r.dataset.page,10)),s!==t&&(u({currentPage:s}),o(!0))}}async function d(e=!1){const{allPokemon:t,searchQuery:i,currentPage:o,pageSize:a}=w(),n=document.getElementById("pokemon-grid");let r=t;if(i){const c=i.toLowerCase();r=r.filter(_=>_.name.includes(c))}const s=Math.max(1,Math.ceil(r.length/a)),p=Math.min(o,s),f=(p-1)*a,h=r.slice(f,f+a),y=await Promise.all(h.map(c=>v(c.name)));S(n,y),M(document.getElementById("pagination-container"),p,s,d),e&&window.scrollTo({top:0,behavior:"smooth"})}async function F(){P(document.getElementById("search-container"),d);const e=await b();u({allPokemon:e}),await d(),document.querySelector(".header__logo").style.opacity="1"}F();
