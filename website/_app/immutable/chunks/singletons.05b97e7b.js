import{w as f}from"./index.88f9aa6d.js";var g;const k=((g=globalThis.__sveltekit_1n8wl93)==null?void 0:g.base)??"";var h;(h=globalThis.__sveltekit_1n8wl93)==null||h.assets;const R="sveltekit:snapshot",y="sveltekit:scroll",I="sveltekit:index",c={tap:1,hover:2,viewport:3,eager:4,off:-1};function x(t){let e=t.baseURI;if(!e){const n=t.getElementsByTagName("base");e=n.length?n[0].href:t.URL}return e}function O(){return{x:pageXOffset,y:pageYOffset}}const d=new WeakSet,p={"preload-code":["","off","tap","hover","viewport","eager"],"preload-data":["","off","tap","hover"],noscroll:["","off"],reload:["","off"]};function a(t,e){const n=t.getAttribute(`data-sveltekit-${e}`);return w(t,e,n),n}function w(t,e,n){n!==null&&!d.has(t)&&!p[e].includes(n)&&(console.error(`Unexpected value for ${e} — should be one of ${p[e].map(o=>JSON.stringify(o)).join(", ")}`,t),d.add(t))}const _={...c,"":c.hover};function v(t){let e=t.assignedSlot??t.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function T(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=v(t)}}function U(t,e){let n;try{n=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const o=t instanceof SVGAElement?t.target.baseVal:t.target,l=!n||!!o||S(n,e)||(t.getAttribute("rel")||"").split(/\s+/).includes("external")||t.hasAttribute("download");return{url:n,external:l,target:o}}function N(t){let e=null,n=null,o=null,l=null,s=t;for(;s&&s!==document.documentElement;)n===null&&(n=a(s,"preload-code")),o===null&&(o=a(s,"preload-data")),e===null&&(e=a(s,"noscroll")),l===null&&(l=a(s,"reload")),s=v(s);return{preload_code:_[n??"off"],preload_data:_[o??"off"],noscroll:e==="off"?!1:e===""?!0:null,reload:l==="off"?!1:l===""?!0:null}}function b(t){const e=f(t);let n=!0;function o(){n=!0,e.update(r=>r)}function l(r){n=!1,e.set(r)}function s(r){let i;return e.subscribe(u=>{(i===void 0||n&&u!==i)&&r(i=u)})}return{notify:o,set:l,subscribe:s}}function E(){const{set:t,subscribe:e}=f(!1);async function n(){return!1}return{subscribe:e,check:n}}function S(t,e){return t.origin!==location.origin||!t.pathname.startsWith(e)}function L(t){t.client}const P={url:b({}),page:b({}),navigating:f(null),updated:E()};export{I,c as P,y as S,R as a,U as b,N as c,O as d,k as e,T as f,x as g,L as h,S as i,P as s};