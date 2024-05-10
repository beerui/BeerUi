import{S as ce,i as fe,d as oe,s as ue,n as f,a as g,x as A,C as J,I as me,p as u,j as t,c as D,q as h,y as N,D as Q,r,w as m,L as o,b as P,E as Z,M as ee,G as de,h as te,f as se,F as ae,N as _e,v as pe,O as ve}from"../chunks/index.21613952.js";import{B as ie}from"../chunks/BeIcon.48a73047.js";import{s as re}from"../chunks/notice.3b3d46d2.js";import{C as ne}from"../chunks/Clipboard.befa825b.js";import{L as le}from"../chunks/LayoutFooter.91d637cf.js";const d="src/routes/+page.svelte";function M(b){let s,p,I,_,$,R,l,S,a,c,y,v,V,q,w,i,x,C,k,U,E,X,H,O;k=new ie({props:{name:"file-copy",width:"18",height:"18"},$$inline:!0}),E=new le({props:{isWhite:!0},$$inline:!0});const T={c:function(){s=f("meta"),p=f("meta"),I=g(),_=f("h2"),$=A("What's BeerUi?"),R=g(),l=f("h3"),S=A("A Svelte UI Components"),a=g(),c=f("div"),y=f("div"),v=f("a"),V=A("Start Now"),q=g(),w=f("div"),i=f("div"),x=A(`npm i @brewer/beerui
			`),C=f("div"),J(k.$$.fragment),U=g(),J(E.$$.fragment),this.h()},l:function(e){const n=me("svelte-q7i1qr",document.head);s=u(n,"META",{name:!0,content:!0}),p=u(n,"META",{name:!0,content:!0}),n.forEach(t),I=D(e),_=u(e,"H2",{class:!0});var W=h(_);$=N(W,"What's BeerUi?"),W.forEach(t),R=D(e),l=u(e,"H3",{class:!0});var j=h(l);S=N(j,"A Svelte UI Components"),j.forEach(t),a=D(e),c=u(e,"DIV",{class:!0});var Y=h(c);y=u(Y,"DIV",{class:!0});var F=h(y);v=u(F,"A",{href:!0,class:!0});var G=h(v);V=N(G,"Start Now"),G.forEach(t),F.forEach(t),q=D(Y),w=u(Y,"DIV",{class:!0});var K=h(w);i=u(K,"DIV",{class:!0,title:!0});var L=h(i);x=N(L,`npm i @brewer/beerui
			`),C=u(L,"DIV",{class:!0});var z=h(C);Q(k.$$.fragment,z),z.forEach(t),L.forEach(t),K.forEach(t),Y.forEach(t),U=D(e),Q(E.$$.fragment,e),this.h()},h:function(){document.title="BeerUi 官方文档 - 基于 svelte 的 PC端 组件库",r(s,"name","description"),r(s,"content","BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component"),m(s,d,16,1,490),r(p,"name","keywords"),r(p,"content","beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit"),m(p,d,17,1,588),r(_,"class","title s-y_bCXRrkrYfP"),m(_,d,19,0,711),r(l,"class","desc s-y_bCXRrkrYfP"),m(l,d,20,0,749),r(v,"href","/components/icons"),r(v,"class","s-y_bCXRrkrYfP"),m(v,d,23,2,845),r(y,"class","start-btn s-y_bCXRrkrYfP"),m(y,d,22,1,819),r(C,"class","icon s-y_bCXRrkrYfP"),m(C,d,28,3,1065),r(i,"class","code s-y_bCXRrkrYfP"),r(i,"title","Copy Code To Clipboard"),m(i,d,26,2,920),r(w,"class","content s-y_bCXRrkrYfP"),m(w,d,25,1,896),r(c,"class","m-content"),m(c,d,21,0,794)},m:function(e,n){o(document.head,s),o(document.head,p),P(e,I,n),P(e,_,n),o(_,$),P(e,R,n),P(e,l,n),o(l,S),P(e,a,n),P(e,c,n),o(c,y),o(y,v),o(v,V),o(c,q),o(c,w),o(w,i),o(i,x),o(i,C),Z(k,C,null),P(e,U,n),Z(E,e,n),X=!0,H||(O=[ee(i,"click",b[2],!1,!1,!1),ee(i,"keydown",b[1],!1,!1,!1)],H=!0)},p:de,i:function(e){X||(te(k.$$.fragment,e),te(E.$$.fragment,e),X=!0)},o:function(e){se(k.$$.fragment,e),se(E.$$.fragment,e),X=!1},d:function(e){t(s),t(p),e&&t(I),e&&t(_),e&&t(R),e&&t(l),e&&t(a),e&&t(c),ae(k),e&&t(U),ae(E,e),H=!1,_e(O)}};return oe("SvelteRegisterBlock",{block:T,id:M.name,type:"component",source:"",ctx:b}),T}function he(b,s,p){let{$$slots:I={},$$scope:_}=s;pe("Page",I,[]);const $=a=>{re({toast:!0,message:"已复制代码"+a,type:"success"}),ne(a)},R=[];Object.keys(s).forEach(a=>{!~R.indexOf(a)&&a.slice(0,2)!=="$$"&&a!=="slot"&&console.warn(`<Page> was created with unknown prop '${a}'`)});function l(a){ve.call(this,b,a)}const S=()=>$("npm i @brewer/beerui");return b.$capture_state=()=>({BeIcon:ie,showNotice:re,Clipboard:ne,LayoutFooter:le,ClipboardHandle:$}),[$,l,S]}class ke extends ce{constructor(s){super(s),fe(this,s,he,M,ue,{}),oe("SvelteRegisterComponent",{component:this,tagName:"Page",options:s,id:M.name})}}export{ke as default};