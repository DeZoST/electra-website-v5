(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();function L(t){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}function k(){const t=document.createElement("header");t.className="header",t.role="banner",t.ariaLabel="Header",t.innerHTML=`
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
    `,document.body.insertAdjacentElement("afterbegin",t)}function g(){const t=`
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
    `,o=document.querySelector("main").querySelector("section:last-of-type");o?o.insertAdjacentHTML("beforeend",t):console.error("No sections found in main")}function I(t,e){fetch("/electra-website-v5/data/directorsData.json").then(o=>{if(!o.ok)throw new Error("Erreur lors du chargement des informations du directeur");return o.json()}).then(o=>{const n=o.directors[t];if(!n){console.error("Directeur non trouvé :",t);return}const a=document.createElement("section");a.className="director__section",a.id="#about",a.innerHTML=`
                <div class="director__content">
                    <h4 class="director__role">DIRECTOR</h4>
                    <h1 class="director__name">${n.name}</h1>
                    <p class="director__description">${n.description}</p>
                    <a href="/electra-website-v5/index.html#reps" class="director__contact">Contact Us</a>
                </div>
                <div class="director__photo">
                    <img src="${n.photo}" alt="${n.name}" />
                </div>
            `;const r=document.querySelector("main");r&&r.appendChild(a),e&&typeof e=="function"&&e()}).catch(o=>{console.error("Erreur lors du chargement des données du directeur :",o)})}function v(t,e){if(document.querySelector(".scroll-indicators")){console.error("Les indicators existent déjà. Aucune action requise.");return}const n=document.createElement("div");n.className="scroll-indicators",n.setAttribute("role","navigation"),n.setAttribute("aria-label","Scroll indicators for sections"),t==="home"?(n.innerHTML=`
            <div class="indicator" data-target="#home" aria-label="Scroll to Home Section" role="button" tabindex="0"></div>
        `,document.querySelectorAll("[id^='featured-work-0']").forEach((r,c)=>{n.innerHTML+=`
                <div class="indicator" data-target="#${r.id}" aria-label="Scroll to Featured Work Section ${c+1}" role="button" tabindex="0"></div>
            `}),n.innerHTML+=`
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#staff" aria-label="Scroll to Staff Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#reps" aria-label="Scroll to Reps Section" role="button" tabindex="0"></div>
        `):t==="director"?(document.querySelectorAll("[id^='featured-work-0']").forEach((r,c)=>{n.innerHTML+=`
                <div class="indicator" data-target="#${r.id}" aria-label="Scroll to Featured Work Section ${c+1}" role="button" tabindex="0"></div>
            `}),n.innerHTML+=`
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#others" aria-label="Scroll to Others Section" role="button" tabindex="0"></div>
        `):console.error("Invalid page type specified for loadDotsIndicator"),document.body.appendChild(n),typeof e=="function"&&e()}function S(t){const e=document.createElement("section");e.id=t==="first"?"home":"others",e.className=t==="last"?"home section":"home section container",e.innerHTML=`
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
    `;const o=document.querySelector("main");t==="first"?o.prepend(e):o.appendChild(e)}function A(t,e,o){fetch(t).then(n=>{if(!n.ok)throw new Error("Erreur réseau lors du chargement des projets");return n.json()}).then(n=>{const a=document.body.getAttribute("data-type"),r=document.querySelector(".home"),c=document.querySelector("main"),l=n[e];if(!l){console.error("Aucun projet trouvé pour cette section:",e);return}const f=e;let b=r;l.forEach(d=>{const h=document.createElement("section");h.id=`${d.id}`,h.className="featured__project section container";const p=a==="home"?`<a class="featured__project__link" href="${d.details.link}">${d.details.linkText}</a>`:"",i=d.details.title?`<h3 class="featured__project__title">${d.details.title}</h3>`:"",s=a==="director"?`
                        <h5 class='featured__project__role'>Director</h5>
                        <h4 class='featured__project__director-name'>${f}</h4>
                    `:"<h4 class='featured__project__text'>Featured Projects</h4>";h.innerHTML=`
                    <div class="featured__project__container">
                        ${s}
                        <div class="featured__project__wrapper">
                            <div class="featured__project__video" data-playback-id="${d.video.playbackId}">
                                <img class="featured__project__thumbnail" src="${d.video.thumbnail}" alt="${d.video.alt}" loading="lazy" />
                            </div>
                            <div class="featured__project__details__container">
                                <img src="${d.details.icon}" alt="${d.details.iconAlt}" loading="eager" class="featured__project__svg" />
                                <div class="featured__project__details">
                                    <h2 class="featured__project__name">${d.details.name}</h2>
                                    <h4 class="featured__project__type">${d.details.type}</h4>
                                </div>
                                <div class="featured__project__details">
                                    <h3 class="featured__project__title">${d.details.company}</h3>
                                    ${i}
                                </div>
                                ${p}
                            </div>
                        </div>
                        <lord-icon class="scroll-down-line" src="https://cdn.lordicon.com/ksmzzfxc.json" trigger="loop" stroke="bold" state="loop-slide" colors="primary:#ff4e00,secondary:#ef9622"></lord-icon>
                    </div>
                `,a==="home"&&r&&c?(b.insertAdjacentElement("afterend",h),b=h):c&&c.appendChild(h)}),o&&o()}).catch(n=>console.error("Erreur lors du chargement des projets :",n))}const y=t=>{const e=document.querySelector("main"),o=window.innerHeight;window.requestAnimationFrame(()=>{e.style.transform=`translateY(-${o*t}px)`})},j=(t,e)=>{let o=0,n=0;const a=c=>{o=c.touches[0].clientY},r=c=>{if(scrollDisabled)return;const l=c.changedTouches[0].clientY,f=o-l;f>100&&n<t.length-1?n++:f<-100&&n>0&&n--,e(n)};window.addEventListener("touchstart",a,{passive:!0}),window.addEventListener("touchend",r,{passive:!0})};let E=!1;const _=t=>{E=t},w=t=>{let e=0,o=!1;const n=document.querySelectorAll(".indicator"),a=document.querySelectorAll(".nav__link a"),r=document.getElementById("scrollFeedback");function c(i){r&&(r.textContent=`Scrolled to ${i} section`)}function l(){const i=n[e];if(n.forEach(s=>{s.classList.remove("active"),s.setAttribute("aria-current","false")}),i){i.classList.add("active"),i.setAttribute("aria-current","true");const s=i.getAttribute("data-target"),u=document.querySelector(s);if(u){const m=u.getAttribute("aria-label")||u.id;c(m)}}}function f(i){const s=i.getAttribute("data-target"),u=document.querySelector(s);if(u){const m=Array.from(t).indexOf(u);m!==-1&&(e=m,y(e),l(),i.focus())}}n.forEach(i=>{i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.addEventListener("click",s=>{s.preventDefault(),f(i)}),i.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),f(i))})});const b=i=>{if(o||E)return;const s=i.deltaY;o=!0,s>0&&e<t.length-1?e++:s<0&&e>0&&e--,y(e),l(),window.requestAnimationFrame(()=>{setTimeout(()=>{o=!1},600)})},d=(i,s)=>{let u;return function(...m){u||(i.apply(this,m),u=!0,setTimeout(()=>u=!1,s))}};window.addEventListener("wheel",d(b,600)),j(t,i=>{e=i,l()});const h=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting?(e=Array.from(t).indexOf(s.target),s.target.classList.add("section-visible"),l()):s.target.classList.remove("section-visible")})},{threshold:.8});t.forEach(i=>h.observe(i)),a.forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const u=i.getAttribute("href"),m=document.querySelector(u);m&&(e=Array.from(t).indexOf(m),y(e),l())})}),document.addEventListener("keydown",i=>{i.key==="Tab"&&(i.preventDefault(),p()),i.key==="ArrowDown"&&e<t.length-1?(e++,y(e),l()):i.key==="ArrowUp"&&e>0&&(e--,y(e),l())});function p(){const i=[...document.querySelectorAll(".indicator"),...document.querySelectorAll(".nav__link a"),...t],s=document.activeElement;let u=i.indexOf(s)+1;u>=i.length&&(u=0);const m=i[u];m.focus(),m.tagName==="SECTION"&&(e=Array.from(t).indexOf(m),y(e),l())}};function q(){const t=document.createElement("div");t.id="videoModal",t.className="modal",t.innerHTML=`
        <div class="modal-content"></div>
    `,document.body.appendChild(t);const e=document.querySelector(".container");let o;const n=r=>{_(!0),o&&o.remove(),setTimeout(()=>{o=document.createElement("mux-player"),o.id="muxPlayer",o.setAttribute("stream-type","on-demand"),o.setAttribute("accent-color","#ff4e00"),o.setAttribute("disable-cookies",""),o.setAttribute("autoplay",""),o.setAttribute("controls",""),o.setAttribute("no-analytics","true");const c=r.dataset.playbackId;o.setAttribute("playback-id",c),t.querySelector(".modal-content").appendChild(o),t.style.display="flex",e.classList.add("blur-background"),document.body.setAttribute("aria-hidden","true"),t.setAttribute("aria-hidden","false"),o.focus(),o.addEventListener("loadeddata",()=>{o.play().catch(l=>{console.warn("Video playback failed:",l)})})},100)},a=()=>{_(!1),t.style.display="none",e.classList.remove("blur-background"),document.body.removeAttribute("aria-hidden"),t.setAttribute("aria-hidden","true"),document.querySelector(".featured__project__video").focus(),o&&typeof o.pause=="function"&&(o.pause(),setTimeout(()=>{o.remove(),o=null},100))};return window.onclick=r=>{r.target===t&&a()},document.addEventListener("click",r=>{const c=r.target.closest(".featured__project__video");c&&n(c)}),{openModal:n,closeModal:a}}const M=()=>{const t=document.getElementById("menu-toggle"),e=document.createElement("div");e.classList.add("mobile-menu"),e.style.display="none",e.innerHTML=`
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#home">Directors</a></li>
            <li class="mobile-menu__link"><a href="#about">About</a></li>
            <li class="mobile-menu__link"><a href="#reps">Contact</a></li>
        </ul>
    `,document.body.appendChild(e);const o=()=>{e.classList.remove("open"),e.style.display="none",_(!1)},n=l=>{l.stopPropagation();const f=e.classList.toggle("open");_(f),f?(e.style.display="flex",t.ariaExpanded="true",e.ariaHidden="false",e.querySelector("a").focus()):(e.style.display="none",t.ariaExpanded="false",e.ariaHidden="true",t.focus())},a=()=>{window.innerWidth<=768?t.addEventListener("click",n):(t.removeEventListener("click",n),o())};a(),e.querySelector(".mobile-menu__close").addEventListener("click",o),e.querySelectorAll(".mobile-menu__link a").forEach(l=>{l.addEventListener("click",f=>{f.preventDefault();const b=l.getAttribute("href"),d=document.querySelector(b);if(d){const h=document.querySelectorAll("section"),p=Array.from(h).indexOf(d);y(p),o()}})}),window.addEventListener("resize",a)};function T(){const t=document.querySelector(".director-video-overlay"),e={"Lorenzo De Guia":"gGoBWuRAWgcPXXlYHG84J2O015fSMFQDks01GAe00j01a0100","Anthony Garth":"v8DYXI02Kn4EpzYB7h28H18bWabA702t61RVZwtNt3O5c","Kailee McGee":"RqFtPFucL94VI5T00g51r2j5z0201YbnTDWm4KWyHwnwp4","Ben Weinstein":"009NxNz3Z302hc02WE7NTi02LZAY9FjQHlxg14vpbyPnyX00","Ze'ev Waismann":"GMWX1Z3aR9J01XycOHiRN3e3hAdg8ZqSR401jQqIQ402SI"},o={};return Object.entries(e).forEach(([n,a])=>{const r=document.createElement("mux-player");r.setAttribute("stream-type","on-demand"),r.setAttribute("autoplay","true"),r.setAttribute("muted","true"),r.setAttribute("loop","true"),r.setAttribute("disable-cookies","true"),r.setAttribute("playsinline","true"),r.setAttribute("playback-id",a),r.setAttribute("no-analytics","true"),r.style.width="100%",r.style.height="100%",r.style.objectFit="cover",r.style.position="absolute",r.style.top="0",r.style.left="0",r.style.opacity="0",r.style.zIndex="-1",r.style.display="none",t.appendChild(r),o[n]=r}),o}function H(t){const e=document.querySelectorAll(".home__director a"),o=document.querySelector(".director-video-overlay");e.forEach(n=>{const a=n.textContent.trim(),r=t[a];if(!r)return;const c=()=>{r.style.display="block",o.style.opacity="1",o.style.zIndex="1",r.style.opacity="1",r.style.zIndex="1"},l=()=>{r.style.opacity="0",r.style.zIndex="-1",o.style.opacity="0",o.style.zIndex="-1"};n.addEventListener("mouseenter",c),n.addEventListener("mouseleave",l)})}function D(){const t=T();H(t)}L(()=>{document.body.style.visibility="visible",k();const t=document.body.getAttribute("data-type"),e=window.location.hash;let o=null;if(t==="home")S("first"),A("data/featuredProjects.json","home",()=>{const n=document.querySelectorAll("section");if(e){const a=document.querySelector(e);a&&(o=Array.from(n).indexOf(a))}v("home",()=>{w(n),o!==null&&y(o),g()})}),D();else if(t==="director"){const n=document.body.getAttribute("data-director");n?fetch("/electra-website-v5/data/directorProjects.json").then(a=>a.json()).then(a=>{const r=a[n];r&&r.length?A("/electra-website-v5/data/directorProjects.json",n,()=>{I(n,()=>{S("last");const c=document.querySelectorAll("section");v("director",()=>{w(c),g()})})}):console.error("No projects found for this director")}).catch(a=>console.error("Error loading director projects:",a)):console.error("Director name not specified for director page")}q(),M()});
