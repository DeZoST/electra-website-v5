(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();function b(t){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}function k(){const t=document.createElement("header");t.className="header",t.innerHTML=`
        <a href="#home" class="logo">
            <img src="assets/images/Electra_Orange.webp" alt="Electra Logo" loading="lazy" />
        </a>
        <nav class="nav-menu">
            <ul class="nav__links">
                <li class="nav__link"><a href="#home">Directors</a></li>
                <li class="nav__link"><a href="#about">About</a></li>
                <li class="nav__link"><a href="#reps">Contact</a></li>
            </ul>
            <button id="menu-toggle" aria-label="Open main menu" class="menu-toggle">
                <img src="assets/images/Bolt_Star_Orange.webp" alt="Main Navigation Menu" loading="lazy" />
            </button>
        </nav>
    `,document.body.insertAdjacentElement("afterbegin",t)}function w(){const t=`
        <footer class="footer">
            <img class="footer__logo" src="assets/images/Electra_White.webp" alt="Electra Logo" loading="lazy" />
            <ul class="footer_socials_wrapper">
                <li><a class="footer_social" target="_blank" href="https://www.instagram.com/electrafilmworks/" aria-label="Instagram">
                    <img src="assets/images/instagram_logo_white.webp" alt="Instagram Logo" loading="lazy" />
                </a></li>
                <li><a class="footer_social" target="_blank" href="https://www.linkedin.com/in/electra-filmworks-984b242a4/" aria-label="LinkedIn">
                    <img src="assets/images/linkedin_logo_white.webp" alt="LinkedIn Logo" loading="lazy" />
                </a></li>
            </ul>
            <div class="footer__pattern"></div>
        </footer>
    `,o=document.querySelector("main").querySelector("section:last-of-type");o?o.insertAdjacentHTML("beforeend",t):console.error("No sections found in main")}function y(t){const e=document.createElement("div");e.className="scroll-indicators",t==="home"?e.innerHTML=`
            <div class="indicator" data-target="#home"></div>
            <div class="indicator" data-target="#featured-work-01"></div>
            <div class="indicator" data-target="#featured-work-02"></div>
            <div class="indicator" data-target="#featured-work-03"></div>
            <div class="indicator" data-target="#featured-work-04"></div>
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#staff"></div>
            <div class="indicator" data-target="#reps"></div>
        `:t==="director"?e.innerHTML=`
            <div class="indicator" data-target="#featured-work-01"></div>
            <div class="indicator" data-target="#featured-work-02"></div>
            <div class="indicator" data-target="#featured-work-03"></div>
            <div class="indicator" data-target="#featured-work-04"></div>
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#others"></div>
        `:console.error("Invalid page type specified for loadDotsIndicator"),document.body.appendChild(e)}function h(t){const e=document.createElement("section");e.id=t==="first"?"home":"others",e.className=t==="last"?"home section":"home section container",e.innerHTML=`
        <nav class="home__container">
            <h1 class="home__title">Directors</h1>
            <ul class="home__directors">
                <li class="home__director"><a href="public/pages/lorenzo/index.html">Lorenzo De Guia</a></li>
                <li class="home__director"><a href="public/pages/anthony/index.html">Anthony Garth</a></li>
                <li class="home__director"><a href="public/pages/kailee/index.html">Kailee McGee</a></li>
                <li class="home__director"><a href="public/pages/ben/index.html">Ben Weinstein</a></li>
                <li class="home__director"><a href="public/pages/zeev/index.html">Ze'ev Waismann</a></li>
            </ul>
        </nav>
        <lord-icon class="scroll-down-line" src="https://cdn.lordicon.com/ksmzzfxc.json" trigger="loop" stroke="bold" state="loop-slide" colors="primary:#ff4e00,secondary:#ef9622"></lord-icon>
    `;const o=document.querySelector("main");t==="first"?o.prepend(e):o.appendChild(e)}const f=t=>{const e=document.querySelector("main"),o=window.innerHeight;window.requestAnimationFrame(()=>{e.style.transform=`translateY(-${o*t}px)`})},L=(t,e)=>{let o=0,n=0;const i=r=>{o=r.touches[0].clientY},a=r=>{if(scrollDisabled)return;const s=r.changedTouches[0].clientY,d=o-s;d>100&&n<t.length-1?n++:d<-100&&n>0&&n--,e(n)};window.addEventListener("touchstart",i,{passive:!0}),window.addEventListener("touchend",a,{passive:!0})};let g=!1;const p=(t,e="Unknown")=>{g=t,console.log(`Scroll Disabled set to: ${g} by ${e}`)},S=t=>{let e=0,o=!1;const n=document.querySelectorAll(".indicator"),i=document.querySelectorAll(".nav__link a"),a=l=>{if(o||g){console.log(`Scroll prevented. isScrolling: ${o}, scrollDisabled: ${g}`);return}const c=l.deltaY;o=!0,c>0&&e<t.length-1?e++:c<0&&e>0&&e--,f(e),s(n[e]),setTimeout(()=>{o=!1},600)},r=(l,c)=>{let u;return function(...m){u||(l.apply(this,m),u=!0,setTimeout(()=>u=!1,c))}};window.addEventListener("wheel",r(a,600)),L(t,l=>{e=l,s(n[e])});function s(l){n.forEach(c=>{c.classList.remove("active")}),l&&l.classList.add("active")}const d=new IntersectionObserver(l=>{l.forEach(c=>{if(c.isIntersecting){const u=Array.from(t).indexOf(c.target);e=u,c.target.classList.add("section-visible"),console.log(`Section ${c.target.id} is now visible, index set to: ${e}`),s(document.querySelector(`.indicator[data-target="#${t[u].id}"]`))}else c.target.classList.remove("section-visible")})},{threshold:.7});t.forEach(l=>d.observe(l)),n.forEach(l=>{l.addEventListener("click",c=>{c.preventDefault();const u=l.getAttribute("data-target"),m=document.querySelector(u);m&&(e=Array.from(t).indexOf(m),f(e),s(l),console.log(`Navigated to section: ${u}, index updated to: ${e}`))})}),i.forEach(l=>{l.addEventListener("click",c=>{c.preventDefault();const u=l.getAttribute("href"),m=document.querySelector(u);m&&(e=Array.from(t).indexOf(m),f(e),s(n[e]),console.log(`Nav link clicked. Navigated to section: ${u}, index updated to: ${e}`))})})};function v(t,e){fetch(t).then(o=>o.json()).then(o=>{const n=document.body.getAttribute("data-type"),i=document.querySelector("#about"),a=o[e];if(!a){console.error("No projects found for this section:",e);return}a.forEach(s=>{const d=document.createElement("section");d.id=`${s.id}`,d.className="featured__project section container";const l=n==="home"?`<a class="featured__project__link" href="${s.details.link}">${s.details.linkText}</a>`:"";d.innerHTML=`
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
                `,i.insertAdjacentElement("beforebegin",d)});const r=document.querySelectorAll("section");S(r)}).catch(o=>console.error("Error loading projects:",o))}function A(){const t=document.createElement("div");t.id="videoModal",t.className="modal",t.innerHTML=`
        <div class="modal-content"></div>
    `,document.body.appendChild(t);const e=document.querySelector(".container");let o=document.getElementById("muxPlayer");const n=a=>{p(!0,"Modal Open"),console.log("Modal opened, scroll disabled."),o&&o.remove(),setTimeout(()=>{o=document.createElement("mux-player"),o.id="muxPlayer",o.setAttribute("stream-type","on-demand"),o.setAttribute("accent-color","#ff4e00"),o.setAttribute("disable-cookies",""),o.setAttribute("autoplay",""),o.setAttribute("controls",""),t.querySelector(".modal-content").appendChild(o),requestAnimationFrame(()=>{const r=a.dataset.playbackId;o.setAttribute("playback-id",r)}),o.addEventListener("loadeddata",()=>{o.play().catch(r=>{console.warn("Video playback failed:",r)})}),t.style.display="flex",e.classList.add("blur-background")},100)},i=()=>{p(!1,"Modal Close"),console.log("Modal closed, scroll enabled."),t.style.display="none",e.classList.remove("blur-background"),o&&(o.pause(),setTimeout(()=>{o.remove()},100))};return window.onclick=a=>{a.target===t&&i()},document.addEventListener("click",a=>{const r=a.target.closest(".featured__project__video");r&&n(r)}),{openModal:n,closeModal:i}}function E(){const t=document.querySelector(".director-video-overlay"),e={"Lorenzo De Guia":"gGoBWuRAWgcPXXlYHG84J2O015fSMFQDks01GAe00j01a0100","Anthony Garth":"v8DYXI02Kn4EpzYB7h28H18bWabA702t61RVZwtNt3O5c","Kailee McGee":"RqFtPFucL94VI5T00g51r2j5z0201YbnTDWm4KWyHwnwp4","Ben Weinstein":"009NxNz3Z302hc02WE7NTi02LZAY9FjQHlxg14vpbyPnyX00","Ze'ev Waismann":"GMWX1Z3aR9J01XycOHiRN3e3hAdg8ZqSR401jQqIQ402SI"},o={};return Object.entries(e).forEach(([n,i])=>{const a=document.createElement("mux-player");a.setAttribute("stream-type","on-demand"),a.setAttribute("autoplay","true"),a.setAttribute("muted","true"),a.setAttribute("loop","true"),a.setAttribute("disable-cookies","true"),a.setAttribute("playsinline","true"),a.setAttribute("playback-id",i),a.style.width="100%",a.style.height="100%",a.style.objectFit="cover",a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.opacity="0",a.style.zIndex="-1",a.style.display="none",t.appendChild(a),o[n]=a}),o}function x(t){const e=document.querySelectorAll(".home__director a"),o=document.querySelector(".director-video-overlay");e.forEach(n=>{const i=n.textContent.trim(),a=t[i];if(!a)return;const r=()=>{a.style.display="block",o.style.opacity="1",o.style.zIndex="1",a.style.opacity="1",a.style.zIndex="1"},s=()=>{a.style.opacity="0",a.style.zIndex="-1",o.style.opacity="0",o.style.zIndex="-1"};n.addEventListener("mouseenter",r),n.addEventListener("mouseleave",s)})}function M(){const t=E();x(t)}const I=()=>{const t=document.getElementById("menu-toggle"),e=document.createElement("div");e.classList.add("mobile-menu"),e.style.display="none",e.innerHTML=`
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#home">Directors</a></li>
            <li class="mobile-menu__link"><a href="#about">About</a></li>
            <li class="mobile-menu__link"><a href="#reps">Contact</a></li>
        </ul>
    `,document.body.appendChild(e);const o=()=>{e.classList.remove("open"),e.style.display="none",p(!1,"Mobile Menu Close"),console.log("Mobile menu closed, scroll enabled.")},n=s=>{s.stopPropagation();const d=e.classList.toggle("open");p(d,"Mobile Menu Toggle"),console.log(`Mobile menu ${d?"opened":"closed"}, scroll disabled: ${d}`),d?e.style.display="flex":e.style.display="none"},i=()=>{window.innerWidth<=768?t.addEventListener("click",n):(t.removeEventListener("click",n),o())};i(),e.querySelector(".mobile-menu__close").addEventListener("click",o),e.querySelectorAll(".mobile-menu__link a").forEach(s=>{s.addEventListener("click",d=>{d.preventDefault();const l=s.getAttribute("href"),c=document.querySelector(l);if(c){const u=document.querySelectorAll("section"),m=Array.from(u).indexOf(c);f(m),console.log(`Mobile menu link clicked. Navigated to section: ${l}, index updated to: ${m}`),o()}})}),window.addEventListener("resize",i)};b(()=>{document.body.style.visibility="visible",k();const t=document.body.getAttribute("data-type");if(t==="home")h("first"),v("data/featuredProjects.json","home"),M(),y("home");else if(t==="director"){h("last");const e=document.body.getAttribute("data-director");e?v("data/directorProjects.json",e):console.error("Director name not specified for director page"),y("director")}A(),w(),I()});
