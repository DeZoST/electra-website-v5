(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();function b(o){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o):o()}function L(){const o=document.createElement("header");o.className="header",o.innerHTML=`
        <a href="#home" class="logo">
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
    `,e=document.querySelector("main").querySelector("section:last-of-type");e?e.insertAdjacentHTML("beforeend",o):console.error("No sections found in main")}function h(o,t){const e=document.createElement("div");if(e.className="scroll-indicators",o==="home"){e.innerHTML=`
            <div class="indicator" data-target="#home"></div>
        `;for(let i=1;i<=t;i++)e.innerHTML+=`<div class="indicator" data-target="#featured-work-0${i}"></div>`;e.innerHTML+=`
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#staff"></div>
            <div class="indicator" data-target="#reps"></div>
        `}else if(o==="director"){for(let i=1;i<=t;i++)e.innerHTML+=`<div class="indicator" data-target="#featured-work-0${i}"></div>`;e.innerHTML+=`
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#others"></div>
        `}else console.error("Invalid page type specified for loadDotsIndicator");document.body.appendChild(e)}function y(o){const t=document.createElement("section");t.id=o==="first"?"home":"others",t.className=o==="last"?"home section":"home section container",t.innerHTML=`
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
    `;const e=document.querySelector("main");o==="first"?e.prepend(t):e.appendChild(t)}const f=o=>{const t=document.querySelector("main"),e=window.innerHeight;window.requestAnimationFrame(()=>{t.style.transform=`translateY(-${e*o}px)`})},S=(o,t)=>{let e=0,i=0;const a=r=>{e=r.touches[0].clientY},n=r=>{if(scrollDisabled)return;const s=r.changedTouches[0].clientY,d=e-s;d>100&&i<o.length-1?i++:d<-100&&i>0&&i--,t(i)};window.addEventListener("touchstart",a,{passive:!0}),window.addEventListener("touchend",n,{passive:!0})};let g=!1;const p=(o,t="Unknown")=>{g=o,console.log(`Scroll Disabled set to: ${g} by ${t}`)},k=o=>{let t=0,e=!1;const i=document.querySelectorAll(".indicator"),a=document.querySelectorAll(".nav__link a"),n=l=>{if(e||g){console.log(`Scroll prevented. isScrolling: ${e}, scrollDisabled: ${g}`);return}const c=l.deltaY;e=!0,c>0&&t<o.length-1?t++:c<0&&t>0&&t--,f(t),s(i[t]),setTimeout(()=>{e=!1},600)},r=(l,c)=>{let u;return function(...m){u||(l.apply(this,m),u=!0,setTimeout(()=>u=!1,c))}};window.addEventListener("wheel",r(n,600)),S(o,l=>{t=l,s(i[t])});function s(l){i.forEach(c=>{c.classList.remove("active")}),l&&l.classList.add("active")}const d=new IntersectionObserver(l=>{l.forEach(c=>{if(c.isIntersecting){const u=Array.from(o).indexOf(c.target);t=u,c.target.classList.add("section-visible"),console.log(`Section ${c.target.id} is now visible, index set to: ${t}`),s(document.querySelector(`.indicator[data-target="#${o[u].id}"]`))}else c.target.classList.remove("section-visible")})},{threshold:.7});o.forEach(l=>d.observe(l)),i.forEach(l=>{l.addEventListener("click",c=>{c.preventDefault();const u=l.getAttribute("data-target"),m=document.querySelector(u);m&&(t=Array.from(o).indexOf(m),f(t),s(l),console.log(`Navigated to section: ${u}, index updated to: ${t}`))})}),a.forEach(l=>{l.addEventListener("click",c=>{c.preventDefault();const u=l.getAttribute("href"),m=document.querySelector(u);m&&(t=Array.from(o).indexOf(m),f(t),s(i[t]),console.log(`Nav link clicked. Navigated to section: ${u}, index updated to: ${t}`))})})};function _(o,t){fetch(o).then(e=>e.json()).then(e=>{const i=document.body.getAttribute("data-type"),a=document.querySelector("#about"),n=e[t];if(!n){console.error("No projects found for this section:",t);return}n.forEach(s=>{const d=document.createElement("section");d.id=`${s.id}`,d.className="featured__project section container";const l=i==="home"?`<a class="featured__project__link" href="${s.details.link}">${s.details.linkText}</a>`:"";d.innerHTML=`
                    <div class="featured__project__container">
                        <h4 class="featured__project__text">Featured Projects</h4>
                        <div class="featured__project__wrapper">
                            <div class="featured__project__video" data-playback-id="${s.video.playbackId}">
                                <img class="featured__project__thumbnail" src="${s.video.thumbnail}" alt="${s.video.alt}" loading="lazy" />
                                
                            </div>
                            <div class="featured__project__details__container">
                                <img src="${s.details.icon}" alt="${s.details.iconAlt}" loading="eager" class="featured__project__svg" />
                                <div class="featured__project__details">
                                    <h2 class="featured__project__name">${s.details.name}</h2>
                                    <h4 class="featured__project__type">${s.details.type}</h4>
                                </div>
                                <div class="featured__project__details">
                                    <h3 class="featured__project__company">${s.details.company}</h3>
                                    <h3 class="featured__project__title">${s.details.title}</h3>
                                </div>
                                ${l}
                            </div>
                        </div>
                    </div>
                `,a.insertAdjacentElement("beforebegin",d)});const r=document.querySelectorAll("section");k(r)}).catch(e=>console.error("Error loading projects:",e))}function E(){const o=document.createElement("div");o.id="videoModal",o.className="modal",o.innerHTML=`
        <div class="modal-content"></div>
    `,document.body.appendChild(o);const t=document.querySelector(".container");let e;const i=n=>{p(!0,"Modal Open"),console.log("Modal opened, scroll disabled."),e&&e.remove(),setTimeout(()=>{e=document.createElement("mux-player"),e.id="muxPlayer",e.setAttribute("stream-type","on-demand"),e.setAttribute("accent-color","#ff4e00"),e.setAttribute("disable-cookies",""),e.setAttribute("autoplay",""),e.setAttribute("controls","");const r=n.dataset.playbackId;e.setAttribute("playback-id",r),o.querySelector(".modal-content").appendChild(e),e.addEventListener("loadeddata",()=>{e.play().catch(s=>{console.warn("Video playback failed:",s)})}),o.style.display="flex",t.classList.add("blur-background")},100)},a=()=>{p(!1,"Modal Close"),console.log("Modal closed, scroll enabled."),o.style.display="none",t.classList.remove("blur-background"),e&&typeof e.pause=="function"&&(e.pause(),setTimeout(()=>{e.remove(),e=null},100))};return window.onclick=n=>{n.target===o&&a()},document.addEventListener("click",n=>{const r=n.target.closest(".featured__project__video");r&&i(r)}),{openModal:i,closeModal:a}}const A=()=>{const o=document.getElementById("menu-toggle"),t=document.createElement("div");t.classList.add("mobile-menu"),t.style.display="none",t.innerHTML=`
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#home">Directors</a></li>
            <li class="mobile-menu__link"><a href="#about">About</a></li>
            <li class="mobile-menu__link"><a href="#reps">Contact</a></li>
        </ul>
    `,document.body.appendChild(t);const e=()=>{t.classList.remove("open"),t.style.display="none",p(!1,"Mobile Menu Close"),console.log("Mobile menu closed, scroll enabled.")},i=s=>{s.stopPropagation();const d=t.classList.toggle("open");p(d,"Mobile Menu Toggle"),console.log(`Mobile menu ${d?"opened":"closed"}, scroll disabled: ${d}`),d?t.style.display="flex":t.style.display="none"},a=()=>{window.innerWidth<=768?o.addEventListener("click",i):(o.removeEventListener("click",i),e())};a(),t.querySelector(".mobile-menu__close").addEventListener("click",e),t.querySelectorAll(".mobile-menu__link a").forEach(s=>{s.addEventListener("click",d=>{d.preventDefault();const l=s.getAttribute("href"),c=document.querySelector(l);if(c){const u=document.querySelectorAll("section"),m=Array.from(u).indexOf(c);f(m),console.log(`Mobile menu link clicked. Navigated to section: ${l}, index updated to: ${m}`),e()}})}),window.addEventListener("resize",a)};function x(){const o=document.querySelector(".director-video-overlay"),t={"Lorenzo De Guia":"gGoBWuRAWgcPXXlYHG84J2O015fSMFQDks01GAe00j01a0100","Anthony Garth":"v8DYXI02Kn4EpzYB7h28H18bWabA702t61RVZwtNt3O5c","Kailee McGee":"RqFtPFucL94VI5T00g51r2j5z0201YbnTDWm4KWyHwnwp4","Ben Weinstein":"009NxNz3Z302hc02WE7NTi02LZAY9FjQHlxg14vpbyPnyX00","Ze'ev Waismann":"GMWX1Z3aR9J01XycOHiRN3e3hAdg8ZqSR401jQqIQ402SI"},e={};return Object.entries(t).forEach(([i,a])=>{const n=document.createElement("mux-player");n.setAttribute("stream-type","on-demand"),n.setAttribute("autoplay","true"),n.setAttribute("muted","true"),n.setAttribute("loop","true"),n.setAttribute("disable-cookies","true"),n.setAttribute("playsinline","true"),n.setAttribute("playback-id",a),n.style.width="100%",n.style.height="100%",n.style.objectFit="cover",n.style.position="absolute",n.style.top="0",n.style.left="0",n.style.opacity="0",n.style.zIndex="-1",n.style.display="none",o.appendChild(n),e[i]=n}),e}function M(o){const t=document.querySelectorAll(".home__director a"),e=document.querySelector(".director-video-overlay");t.forEach(i=>{const a=i.textContent.trim(),n=o[a];if(!n)return;const r=()=>{n.style.display="block",e.style.opacity="1",e.style.zIndex="1",n.style.opacity="1",n.style.zIndex="1"},s=()=>{n.style.opacity="0",n.style.zIndex="-1",e.style.opacity="0",e.style.zIndex="-1"};i.addEventListener("mouseenter",r),i.addEventListener("mouseleave",s)})}function $(){const o=x();M(o)}b(()=>{document.body.style.visibility="visible",L();const o=document.body.getAttribute("data-type");if(o==="home")y("first"),_("data/featuredProjects.json","home"),$(),h("home",4);else if(o==="director"){y("last");const t=document.body.getAttribute("data-director");t?fetch("/electra-website-v5/data/directorProjects.json").then(e=>e.json()).then(e=>{const i=e[t];i&&i.length?(_("/electra-website-v5/data/directorProjects.json",t),h("director",i.length)):console.error("No projects found for this director")}).catch(e=>console.error("Error loading director projects:",e)):console.error("Director name not specified for director page")}E(),w(),A()});
