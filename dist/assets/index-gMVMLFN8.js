(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const d="https://pokeapi.co/api/v2",f=new Map,m=new Map;async function L(){const e=await fetch(`${d}/pokemon?limit=10000&offset=0`);if(!e.ok)throw new Error("Falha ao buscar lista de Pokémon");return(await e.json()).results}async function M(){const e=await fetch(`${d}/type`);if(!e.ok)throw new Error("Falha ao buscar tipos");return(await e.json()).results.filter(r=>!["unknown","shadow"].includes(r.name))}async function S(e){if(f.has(e))return f.get(e);const t=await fetch(`${d}/pokemon/${e}`);if(!t.ok)throw new Error(`Falha ao buscar ${e}`);const r=await t.json();return f.set(e,r),r}async function B(e){if(m.has(e))return m.get(e);const t=await fetch(`${d}/type/${e}`);if(!t.ok)throw new Error(`Falha ao buscar tipo ${e}`);const a=(await t.json()).pokemon.map(n=>n.pokemon.name);return m.set(e,a),a}const b={allPokemon:[],searchQuery:"",activeType:"",currentPage:1,pageSize:20};function w(){return{...b}}function p(e){Object.assign(b,e)}function x(e,t){let r;return(...a)=>{clearTimeout(r),r=setTimeout(()=>e(...a),t)}}function C(e){e.innerHTML=`
    <label class="search" for="search-input">
      <svg class="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        id="search-input"
        class="search__input"
        type="search"
        placeholder="Buscar por nome..."
        autocomplete="off"
        aria-label="Buscar Pokémon por nome"
      />
    </label>
  `;const t=e.querySelector("#search-input"),r=x(a=>{p({searchQuery:a.trim(),currentPage:1}),document.dispatchEvent(new CustomEvent("pokedex:update"))},350);t.addEventListener("input",a=>r(a.target.value))}function I(e,t){const r=t.map(a=>`
      <button class="type-filter type-filter--${a.name}" data-type="${a.name}" aria-pressed="false">
        ${a.name}
      </button>
    `).join("");e.innerHTML=`
    <div class="filters" role="group" aria-label="Filtrar por tipo">
      <button class="type-filter type-filter--all type-filter--active" data-type="" aria-pressed="true">
        Todos
      </button>
      ${r}
    </div>
  `,e.onclick=a=>{const n=a.target.closest(".type-filter");if(!n)return;const{activeType:s}=w(),o=n.dataset.type;o!==s&&(e.querySelectorAll(".type-filter").forEach(c=>{c.classList.remove("type-filter--active"),c.setAttribute("aria-pressed","false")}),n.classList.add("type-filter--active"),n.setAttribute("aria-pressed","true"),p({activeType:o,currentPage:1}),document.dispatchEvent(new CustomEvent("pokedex:update")))}}function j(e){return`#${String(e).padStart(3,"0")}`}function A(e){var t;return((t=e.types[0])==null?void 0:t.type.name)??"normal"}function H(e){var t,r,a,n;return((a=(r=(t=e.sprites)==null?void 0:t.other)==null?void 0:r["official-artwork"])==null?void 0:a.front_default)||((n=e.sprites)==null?void 0:n.front_default)||""}function F(e){const t=A(e),r=H(e),a=e.types.map(n=>`<span class="type-badge type-badge--${n.type.name}">${n.type.name}</span>`).join("");return`
    <article class="pokemon-card pokemon-card--${t}" tabindex="0" role="listitem">
      <span class="pokemon-card__number">${j(e.id)}</span>
      <div class="pokemon-card__image-wrapper">
        <img
          class="pokemon-card__image"
          src="${r}"
          alt="${e.name}"
          loading="lazy"
          width="110"
          height="110"
        />
      </div>
      <h2 class="pokemon-card__name">${e.name}</h2>
      <div class="pokemon-card__types">${a}</div>
    </article>
  `}function O(){return`
    <article class="pokemon-card pokemon-card--skeleton" aria-hidden="true">
      <span class="skeleton skeleton--id"></span>
      <div class="pokemon-card__image-wrapper">
        <div class="skeleton skeleton--circle"></div>
      </div>
      <span class="skeleton skeleton--name"></span>
      <div class="pokemon-card__types">
        <span class="skeleton skeleton--badge"></span>
      </div>
    </article>
  `}function q(e,t){if(t.length===0){e.innerHTML=`
      <div class="no-results">
        <p class="no-results__title">Nenhum Pokémon encontrado</p>
        <p class="no-results__hint">Tente outro nome ou tipo.</p>
      </div>
    `;return}e.innerHTML=t.map(F).join("")}function _(e,t){e.innerHTML=Array.from({length:t},O).join("")}function z(e,t){return t<=9?Array.from({length:t},(r,a)=>a+1):e<=5?[1,2,3,4,5,6,7,"...",t]:e>=t-4?[1,"...",t-6,t-5,t-4,t-3,t-2,t-1,t]:[1,"...",e-2,e-1,e,e+1,e+2,"...",t]}function Q(e,t,r){if(r<=1){e.innerHTML="",e.onclick=null;return}const a=z(t,r);e.innerHTML=`
    <nav class="pagination" aria-label="Paginação de Pokémon">
      <button
        class="pagination__btn"
        data-action="prev"
        ${t===1?"disabled":""}
        aria-label="Página anterior"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
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
        class="pagination__btn"
        data-action="next"
        ${t===r?"disabled":""}
        aria-label="Próxima página"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  `,e.onclick=n=>{const s=n.target.closest("button:not([disabled])");if(!s)return;let o=t;s.dataset.action==="prev"?o=t-1:s.dataset.action==="next"?o=t+1:s.dataset.page&&(o=parseInt(s.dataset.page,10)),o!==t&&(p({currentPage:o}),document.dispatchEvent(new CustomEvent("pokedex:update",{detail:{scrollTop:!0}})))}}let h=0;async function k(e=!1){const t=++h,{allPokemon:r,searchQuery:a,activeType:n,currentPage:s,pageSize:o}=w(),c=document.getElementById("pokemon-grid");_(c,o);let i=r;if(a){const l=a.toLowerCase();i=i.filter(u=>u.name.includes(l))}if(n){const l=await B(n);if(t!==h)return;const u=new Set(l);i=i.filter(E=>u.has(E.name))}const g=Math.max(1,Math.ceil(i.length/o)),y=Math.min(s,g),v=(y-1)*o,$=i.slice(v,v+o),T=document.getElementById("results-info");T.textContent=`${i.length} Pokémon encontrado${i.length!==1?"s":""}`;const P=await Promise.all($.map(l=>S(l.name)));t===h&&(q(c,P),Q(document.getElementById("pagination-container"),y,g),e&&window.scrollTo({top:0,behavior:"smooth"}))}async function N(){C(document.getElementById("search-container")),_(document.getElementById("pokemon-grid"),20);const[e,t]=await Promise.all([M(),L()]);I(document.getElementById("filters-container"),e),p({allPokemon:t}),document.addEventListener("pokedex:update",r=>{var a;return k((a=r.detail)==null?void 0:a.scrollTop)}),k()}N();
