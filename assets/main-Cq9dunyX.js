(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();function b(o){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o):o()}function L(){const o=document.createElement("header");o.className="header",o.innerHTML=`
        <a href="/electra-website-v5/" class="logo">
            <img src="/electra-website-v5/assets/images/Electra_Orange.webp" alt="Electra Logo" loading="lazy" />
        </a>
        <nav class="nav-menu">
            <ul class="nav__links">
                <li class="nav__link"><a href="#home">Directors</a></li>
                <li class="nav__link"><a href="#about">About</a></li>
                <li class="nav__link"><a href="#reps">Contact</a></li>
            </ul>
            <button id="menu-toggle" aria-label="Open main menu" class="menu-toggle">
                <img src="/electra-website-v5/assets/images/Bolt_Star_Orange.webp" alt="Main Navigation Menu" loading="lazy" />
            </button>
        </nav>
    `,document.body.insertAdjacentElement("afterbegin",o)}function w(){const o=`
        <footer class="footer">
            <img class="footer__logo" src="/electra-website-v5/assets/images/Electra_White.webp" alt="Electra Logo" loading="lazy" />
            <ul class="footer_socials_wrapper">
                <li><a class="footer_social" target="_blank" href="https://www.instagram.com/electrafilmworks/" aria-label="Instagram">
                    <img src="/electra-website-v5/assets/images/instagram_logo_white.webp" alt="Instagram Logo" loading="lazy" />
                </a></li>
                <li><a class="footer_social" target="_blank" href="https://www.linkedin.com/in/electra-filmworks-984b242a4/" aria-label="LinkedIn">
                    <img src="/electra-website-v5/assets/images/linkedin_logo_white.webp" alt="LinkedIn Logo" loading="lazy" />
                </a></li>
            </ul>
            <div class="footer__pattern"></div>
        </footer>
    `,e=document.querySelector("main").querySelector("section:last-of-type");e?e.insertAdjacentHTML("beforeend",o):console.error("No sections found in main")}function y(o,t){const e=document.createElement("div");if(e.className="scroll-indicators",o==="home"){e.innerHTML=`
            <div class="indicator" data-target="#home"></div>
        `;for(let a=1;a<=t;a++)e.innerHTML+=`<div class="indicator" data-target="#featured-work-0${a}"></div>`;e.innerHTML+=`
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#staff"></div>
            <div class="indicator" data-target="#reps"></div>
        `}else if(o==="director"){for(let a=1;a<=t;a++)e.innerHTML+=`<div class="indicator" data-target="#featured-work-0${a}"></div>`;e.innerHTML+=`
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#others"></div>
        `}else console.error("Invalid page type specified for loadDotsIndicator");document.body.appendChild(e)}function p(o){const t=document.createElement("section");t.id=o==="first"?"home":"others",t.className=o==="last"?"home section":"home section container",t.innerHTML=`
        <nav class="home__container">
            <h1 class="home__title">Directors</h1>
            <ul class="home__directors">
                <li class="home__director"><a href="pages/lorenzo/index.html">Lorenzo De Guia</a></li>
                <li class="home__director"><a href="pages/anthony/index.html">Anthony Garth</a></li>
                <li class="home__director"><a href="pages/kailee/index.html">Kailee McGee</a></li>
                <li class="home__director"><a href="pages/ben/index.html">Ben Weinstein</a></li>
                <li class="home__director"><a href="pages/zeev/index.html">Ze'ev Waismann</a></li>
            </ul>
        </nav>
        <lord-icon class="scroll-down-line" src="https://cdn.lordicon.com/ksmzzfxc.json" trigger="loop" stroke="bold" state="loop-slide" colors="primary:#ff4e00,secondary:#ef9622"></lord-icon>
    `;const e=document.querySelector("main");o==="first"?e.prepend(t):e.appendChild(t)}const f=o=>{const t=document.querySelector("main"),e=window.innerHeight;window.requestAnimationFrame(()=>{t.style.transform=`translateY(-${e*o}px)`})},E=(o,t)=>{let e=0,a=0;const i=c=>{e=c.touches[0].clientY},n=c=>{if(scrollDisabled)return;const r=c.changedTouches[0].clientY,d=e-r;d>100&&a<o.length-1?a++:d<-100&&a>0&&a--,t(a)};window.addEventListener("touchstart",i,{passive:!0}),window.addEventListener("touchend",n,{passive:!0})};let _=!1;const h=o=>{_=o},A=o=>{let t=0,e=!1;const a=document.querySelectorAll(".indicator"),i=document.querySelectorAll(".nav__link a"),n=s=>{if(e||_)return;const l=s.deltaY;e=!0,l>0&&t<o.length-1?t++:l<0&&t>0&&t--,f(t),r(a[t]),setTimeout(()=>{e=!1},600)},c=(s,l)=>{let u;return function(...m){u||(s.apply(this,m),u=!0,setTimeout(()=>u=!1,l))}};window.addEventListener("wheel",c(n,600)),E(o,s=>{t=s,r(a[t])});function r(s){a.forEach(l=>{l.classList.remove("active")}),s&&s.classList.add("active")}const d=new IntersectionObserver(s=>{s.forEach(l=>{if(l.isIntersecting){const u=Array.from(o).indexOf(l.target);t=u,l.target.classList.add("section-visible"),r(document.querySelector(`.indicator[data-target="#${o[u].id}"]`))}else l.target.classList.remove("section-visible")})},{threshold:.7});o.forEach(s=>d.observe(s)),a.forEach(s=>{s.addEventListener("click",l=>{l.preventDefault();const u=s.getAttribute("data-target"),m=document.querySelector(u);m&&(t=Array.from(o).indexOf(m),f(t),r(s))})}),i.forEach(s=>{s.addEventListener("click",l=>{l.preventDefault();const u=s.getAttribute("href"),m=document.querySelector(u);m&&(t=Array.from(o).indexOf(m),f(t),r(a[t]))})})};function g(o,t){fetch(o).then(e=>e.json()).then(e=>{const a=document.body.getAttribute("data-type"),i=document.querySelector("#about"),n=e[t];if(!n){console.error("No projects found for this section:",t);return}n.forEach(r=>{const d=document.createElement("section");d.id=`${r.id}`,d.className="featured__project section container";const s=a==="home"?`<a class="featured__project__link" href="${r.details.link}">${r.details.linkText}</a>`:"",l=r.details.title?`<h3 class="featured__project__title">${r.details.title}</h3>`:"";d.innerHTML=`
                    <div class="featured__project__container">
                        <h4 class="featured__project__text">Featured Projects</h4>
                        <div class="featured__project__wrapper">
                            <div class="featured__project__video" data-playback-id="${r.video.playbackId}">
                                <img class="featured__project__thumbnail" src="${r.video.thumbnail}" alt="${r.video.alt}" loading="lazy" />
                                
                            </div>
                            <div class="featured__project__details__container">
                                <img src="${r.details.icon}" alt="${r.details.iconAlt}" loading="eager" class="featured__project__svg" />
                                <div class="featured__project__details">
                                    <h2 class="featured__project__name">${r.details.name}</h2>
                                    <h4 class="featured__project__type">${r.details.type}</h4>
                                </div>
                                <div class="featured__project__details">
                                    <h3 class="featured__project__title">${r.details.company}</h3>
                                    ${l}
                                </div>
                                ${s}
                            </div>
                        </div>
                    </div>
                `,i.insertAdjacentElement("beforebegin",d)});const c=document.querySelectorAll("section");A(c)}).catch(e=>console.error("Error loading projects:",e))}function S(){const o=document.createElement("div");o.id="videoModal",o.className="modal",o.innerHTML=`
        <div class="modal-content"></div>
    `,document.body.appendChild(o);const t=document.querySelector(".container");let e;const a=n=>{h(!0),e&&e.remove(),setTimeout(()=>{e=document.createElement("mux-player"),e.id="muxPlayer",e.setAttribute("stream-type","on-demand"),e.setAttribute("accent-color","#ff4e00"),e.setAttribute("disable-cookies",""),e.setAttribute("autoplay",""),e.setAttribute("controls","");const c=n.dataset.playbackId;e.setAttribute("playback-id",c),o.querySelector(".modal-content").appendChild(e),e.addEventListener("loadeddata",()=>{e.play().catch(r=>{console.warn("Video playback failed:",r)})}),o.style.display="flex",t.classList.add("blur-background")},100)},i=()=>{h(!1),o.style.display="none",t.classList.remove("blur-background"),e&&typeof e.pause=="function"&&(e.pause(),setTimeout(()=>{e.remove(),e=null},100))};return window.onclick=n=>{n.target===o&&i()},document.addEventListener("click",n=>{const c=n.target.closest(".featured__project__video");c&&a(c)}),{openModal:a,closeModal:i}}const k=()=>{const o=document.getElementById("menu-toggle"),t=document.createElement("div");t.classList.add("mobile-menu"),t.style.display="none",t.innerHTML=`
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#home">Directors</a></li>
            <li class="mobile-menu__link"><a href="#about">About</a></li>
            <li class="mobile-menu__link"><a href="#reps">Contact</a></li>
        </ul>
    `,document.body.appendChild(t);const e=()=>{t.classList.remove("open"),t.style.display="none",h(!1)},a=r=>{r.stopPropagation();const d=t.classList.toggle("open");h(d),d?t.style.display="flex":t.style.display="none"},i=()=>{window.innerWidth<=768?o.addEventListener("click",a):(o.removeEventListener("click",a),e())};i(),t.querySelector(".mobile-menu__close").addEventListener("click",e),t.querySelectorAll(".mobile-menu__link a").forEach(r=>{r.addEventListener("click",d=>{d.preventDefault();const s=r.getAttribute("href"),l=document.querySelector(s);if(l){const u=document.querySelectorAll("section"),m=Array.from(u).indexOf(l);f(m),e()}})}),window.addEventListener("resize",i)};function x(){const o=document.querySelector(".director-video-overlay"),t={"Lorenzo De Guia":"gGoBWuRAWgcPXXlYHG84J2O015fSMFQDks01GAe00j01a0100","Anthony Garth":"v8DYXI02Kn4EpzYB7h28H18bWabA702t61RVZwtNt3O5c","Kailee McGee":"RqFtPFucL94VI5T00g51r2j5z0201YbnTDWm4KWyHwnwp4","Ben Weinstein":"009NxNz3Z302hc02WE7NTi02LZAY9FjQHlxg14vpbyPnyX00","Ze'ev Waismann":"GMWX1Z3aR9J01XycOHiRN3e3hAdg8ZqSR401jQqIQ402SI"},e={};return Object.entries(t).forEach(([a,i])=>{const n=document.createElement("mux-player");n.setAttribute("stream-type","on-demand"),n.setAttribute("autoplay","true"),n.setAttribute("muted","true"),n.setAttribute("loop","true"),n.setAttribute("disable-cookies","true"),n.setAttribute("playsinline","true"),n.setAttribute("playback-id",i),n.style.width="100%",n.style.height="100%",n.style.objectFit="cover",n.style.position="absolute",n.style.top="0",n.style.left="0",n.style.opacity="0",n.style.zIndex="-1",n.style.display="none",o.appendChild(n),e[a]=n}),e}function M(o){const t=document.querySelectorAll(".home__director a"),e=document.querySelector(".director-video-overlay");t.forEach(a=>{const i=a.textContent.trim(),n=o[i];if(!n)return;const c=()=>{n.style.display="block",e.style.opacity="1",e.style.zIndex="1",n.style.opacity="1",n.style.zIndex="1"},r=()=>{n.style.opacity="0",n.style.zIndex="-1",e.style.opacity="0",e.style.zIndex="-1"};a.addEventListener("mouseenter",c),a.addEventListener("mouseleave",r)})}function I(){const o=x();M(o)}b(()=>{document.body.style.visibility="visible",L();const o=document.body.getAttribute("data-type");if(o==="home")p("first"),g("data/featuredProjects.json","home"),I(),y("home",4);else if(o==="director"){p("last");const t=document.body.getAttribute("data-director");t?fetch("/electra-website-v5/data/directorProjects.json").then(e=>e.json()).then(e=>{const a=e[t];a&&a.length?(g("/electra-website-v5/data/directorProjects.json",t),y("director",a.length)):console.error("No projects found for this director")}).catch(e=>console.error("Error loading director projects:",e)):console.error("Director name not specified for director page")}S(),w(),k()});
