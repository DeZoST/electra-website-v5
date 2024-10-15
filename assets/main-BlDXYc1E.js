(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();function A(o){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o):o()}function L(){const o=document.createElement("header");o.className="header",o.role="banner",o.ariaLabel="Header",o.innerHTML=`
        <a href="/electra-website-v5/" class="logo">
            <img src="/electra-website-v5/assets/images/Electra_Orange.webp" alt="Electra Logo" loading="lazy" />
        </a>
        <nav class="nav-menu" aria-label="Main Navigation Menu">
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
        <footer class="footer" role="contentinfo" aria-label="Footer">
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
    `,e=document.querySelector("main").querySelector("section:last-of-type");e?e.insertAdjacentHTML("beforeend",o):console.error("No sections found in main")}function g(o,t){const e=document.createElement("div");if(e.className="scroll-indicators",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Scroll indicators for sections"),o==="home"){e.innerHTML=`
            <div class="indicator" data-target="#home" aria-label="Scroll to Home Section" role="button" tabindex="0"></div>
        `;for(let n=1;n<=t;n++)e.innerHTML+=`
                <div class="indicator" data-target="#featured-work-0${n}" aria-label="Scroll to Featured Work Section ${n}" role="button" tabindex="0"></div>
            `;e.innerHTML+=`
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#staff" aria-label="Scroll to Staff Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#reps" aria-label="Scroll to Reps Section" role="button" tabindex="0"></div>
        `}else if(o==="director"){for(let n=1;n<=t;n++)e.innerHTML+=`
                <div class="indicator" data-target="#featured-work-0${n}" aria-label="Scroll to Featured Work Section ${n}" role="button" tabindex="0"></div>
            `;e.innerHTML+=`
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#others" aria-label="Scroll to Others Section" role="button" tabindex="0"></div>
        `}else console.error("Invalid page type specified for loadDotsIndicator");document.body.appendChild(e)}function _(o){const t=document.createElement("section");t.id=o==="first"?"home":"others",t.className=o==="last"?"home section":"home section container",t.innerHTML=`
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
    `;const e=document.querySelector("main");o==="first"?e.prepend(t):e.appendChild(t)}const h=o=>{const t=document.querySelector("main"),e=window.innerHeight;window.requestAnimationFrame(()=>{t.style.transform=`translateY(-${e*o}px)`})},E=(o,t)=>{let e=0,n=0;const i=c=>{e=c.touches[0].clientY},a=c=>{if(scrollDisabled)return;const l=c.changedTouches[0].clientY,u=e-l;u>100&&n<o.length-1?n++:u<-100&&n>0&&n--,t(n)};window.addEventListener("touchstart",i,{passive:!0}),window.addEventListener("touchend",a,{passive:!0})};let S=!1;const p=o=>{S=o},k=o=>{let t=0,e=!1;const n=document.querySelectorAll(".indicator"),i=document.querySelectorAll(".nav__link a"),a=document.getElementById("scrollFeedback");function c(r){a.textContent=`Scrolled to ${r} section`}function l(r){if(n.forEach(s=>{s.classList.remove("active"),s.setAttribute("aria-current","false")}),r){r.classList.add("active"),r.setAttribute("aria-current","true");const s=r.getAttribute("data-target"),d=document.querySelector(s);if(d){const m=d.getAttribute("aria-label")||d.id;c(m)}}}const u=r=>{if(e||S)return;const s=r.deltaY;e=!0,s>0&&t<o.length-1?t++:s<0&&t>0&&t--,h(t),l(n[t]),window.requestAnimationFrame(()=>{setTimeout(()=>{e=!1},600)})},b=(r,s)=>{let d;return function(...m){d||(r.apply(this,m),d=!0,setTimeout(()=>d=!1,s))}};window.addEventListener("wheel",b(u,600)),E(o,r=>{t=r,l(n[t])});const f=new IntersectionObserver(r=>{r.forEach(s=>{if(s.isIntersecting){const d=Array.from(o).indexOf(s.target);t=d,s.target.classList.add("section-visible"),l(n[d])}else s.target.classList.remove("section-visible")})},{threshold:.7});o.forEach(r=>f.observe(r)),n.forEach(r=>{r.setAttribute("role","button"),r.setAttribute("tabindex","0"),r.addEventListener("click",s=>{s.preventDefault(),y(r)}),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),y(r))})});function y(r){const s=r.getAttribute("data-target"),d=document.querySelector(s);d&&(t=Array.from(o).indexOf(d),h(t),l(r))}i.forEach(r=>{r.addEventListener("click",s=>{s.preventDefault();const d=r.getAttribute("href"),m=document.querySelector(d);m&&(t=Array.from(o).indexOf(m),h(t),l(n[t]))})})};function v(o,t){fetch(o).then(e=>e.json()).then(e=>{const n=document.body.getAttribute("data-type"),i=document.querySelector("#about"),a=e[t];if(!a){console.error("No projects found for this section:",t);return}a.forEach(l=>{const u=document.createElement("section");u.id=`${l.id}`,u.className="featured__project section container";const b=n==="home"?`<a class="featured__project__link" href="${l.details.link}">${l.details.linkText}</a>`:"",f=l.details.title?`<h3 class="featured__project__title">${l.details.title}</h3>`:"";u.innerHTML=`
                    <div class="featured__project__container">
                        <h4 class="featured__project__text">Featured Projects</h4>
                        <div class="featured__project__wrapper">
                            <div class="featured__project__video" data-playback-id="${l.video.playbackId}">
                                <img class="featured__project__thumbnail" src="${l.video.thumbnail}" alt="${l.video.alt}" loading="lazy" />
                                
                            </div>
                            <div class="featured__project__details__container">
                                <img src="${l.details.icon}" alt="${l.details.iconAlt}" loading="eager" class="featured__project__svg" />
                                <div class="featured__project__details">
                                    <h2 class="featured__project__name">${l.details.name}</h2>
                                    <h4 class="featured__project__type">${l.details.type}</h4>
                                </div>
                                <div class="featured__project__details">
                                    <h3 class="featured__project__title">${l.details.company}</h3>
                                    ${f}
                                </div>
                                ${b}
                            </div>
                        </div>
                    </div>
                `,i.insertAdjacentElement("beforebegin",u)});const c=document.querySelectorAll("section");k(c)}).catch(e=>console.error("Error loading projects:",e))}function x(){const o=document.createElement("div");o.id="videoModal",o.className="modal",o.innerHTML=`
        <div class="modal-content"></div>
    `,document.body.appendChild(o);const t=document.querySelector(".container");let e;const n=a=>{p(!0),e&&e.remove(),setTimeout(()=>{e=document.createElement("mux-player"),e.id="muxPlayer",e.setAttribute("stream-type","on-demand"),e.setAttribute("accent-color","#ff4e00"),e.setAttribute("disable-cookies",""),e.setAttribute("autoplay",""),e.setAttribute("controls","");const c=a.dataset.playbackId;e.setAttribute("playback-id",c),o.querySelector(".modal-content").appendChild(e),o.style.display="flex",t.classList.add("blur-background"),document.body.setAttribute("aria-hidden","true"),o.setAttribute("aria-hidden","false"),e.focus(),e.addEventListener("loadeddata",()=>{e.play().catch(l=>{console.warn("Video playback failed:",l)})})},100)},i=()=>{p(!1),o.style.display="none",t.classList.remove("blur-background"),document.body.removeAttribute("aria-hidden"),o.setAttribute("aria-hidden","true"),document.querySelector(".featured__project__video").focus(),e&&typeof e.pause=="function"&&(e.pause(),setTimeout(()=>{e.remove(),e=null},100))};return window.onclick=a=>{a.target===o&&i()},document.addEventListener("click",a=>{const c=a.target.closest(".featured__project__video");c&&n(c)}),{openModal:n,closeModal:i}}const M=()=>{const o=document.getElementById("menu-toggle"),t=document.createElement("div");t.classList.add("mobile-menu"),t.style.display="none",t.innerHTML=`
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#home">Directors</a></li>
            <li class="mobile-menu__link"><a href="#about">About</a></li>
            <li class="mobile-menu__link"><a href="#reps">Contact</a></li>
        </ul>
    `,document.body.appendChild(t);const e=()=>{t.classList.remove("open"),t.style.display="none",p(!1)},n=l=>{l.stopPropagation();const u=t.classList.toggle("open");p(u),u?(t.style.display="flex",o.ariaExpanded="true",t.ariaHidden="false",t.querySelector("a").focus()):(t.style.display="none",o.ariaExpanded="false",t.ariaHidden="true",o.focus())},i=()=>{window.innerWidth<=768?o.addEventListener("click",n):(o.removeEventListener("click",n),e())};i(),t.querySelector(".mobile-menu__close").addEventListener("click",e),t.querySelectorAll(".mobile-menu__link a").forEach(l=>{l.addEventListener("click",u=>{u.preventDefault();const b=l.getAttribute("href"),f=document.querySelector(b);if(f){const y=document.querySelectorAll("section"),r=Array.from(y).indexOf(f);h(r),e()}})}),window.addEventListener("resize",i)};function j(){const o=document.querySelector(".director-video-overlay"),t={"Lorenzo De Guia":"gGoBWuRAWgcPXXlYHG84J2O015fSMFQDks01GAe00j01a0100","Anthony Garth":"v8DYXI02Kn4EpzYB7h28H18bWabA702t61RVZwtNt3O5c","Kailee McGee":"RqFtPFucL94VI5T00g51r2j5z0201YbnTDWm4KWyHwnwp4","Ben Weinstein":"009NxNz3Z302hc02WE7NTi02LZAY9FjQHlxg14vpbyPnyX00","Ze'ev Waismann":"GMWX1Z3aR9J01XycOHiRN3e3hAdg8ZqSR401jQqIQ402SI"},e={};return Object.entries(t).forEach(([n,i])=>{const a=document.createElement("mux-player");a.setAttribute("stream-type","on-demand"),a.setAttribute("autoplay","true"),a.setAttribute("muted","true"),a.setAttribute("loop","true"),a.setAttribute("disable-cookies","true"),a.setAttribute("playsinline","true"),a.setAttribute("playback-id",i),a.style.width="100%",a.style.height="100%",a.style.objectFit="cover",a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.opacity="0",a.style.zIndex="-1",a.style.display="none",o.appendChild(a),e[n]=a}),e}function H(o){const t=document.querySelectorAll(".home__director a"),e=document.querySelector(".director-video-overlay");t.forEach(n=>{const i=n.textContent.trim(),a=o[i];if(!a)return;const c=()=>{a.style.display="block",e.style.opacity="1",e.style.zIndex="1",a.style.opacity="1",a.style.zIndex="1"},l=()=>{a.style.opacity="0",a.style.zIndex="-1",e.style.opacity="0",e.style.zIndex="-1"};n.addEventListener("mouseenter",c),n.addEventListener("mouseleave",l)})}function I(){const o=j();H(o)}A(()=>{document.body.style.visibility="visible",L();const o=document.body.getAttribute("data-type");if(o==="home")_("first"),v("data/featuredProjects.json","home"),I(),g("home",4);else if(o==="director"){_("last");const t=document.body.getAttribute("data-director");t?fetch("/electra-website-v5/data/directorProjects.json").then(e=>e.json()).then(e=>{const n=e[t];n&&n.length?(v("/electra-website-v5/data/directorProjects.json",t),g("director",n.length)):console.error("No projects found for this director")}).catch(e=>console.error("Error loading director projects:",e)):console.error("Director name not specified for director page")}x(),w(),M()});
