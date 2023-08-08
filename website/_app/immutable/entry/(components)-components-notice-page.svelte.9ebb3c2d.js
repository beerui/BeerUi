import{S as es,i as os,d as Y,s as ns,a8 as zc,n as l,a as u,x as d,C as O,I as ls,p as r,j as o,c as $,q as a,y as f,D as V,r as Dt,w as c,L as t,b as F,E as L,h as R,f as A,F as j,v as rs,A as cs,g as ss,ab as as,u as ge,G as tn}from"../chunks/index.21613952.js";import{B as et}from"../chunks/BeButton.f53a9660.js";import"../chunks/beerui.dfc24136.js";import"../chunks/loading.6fc7a1f8.js";import{B as en}from"../chunks/BeIcon.5c59230e.js";import{s as ve,c as Sc,a as Ac}from"../chunks/notice.3b3d46d2.js";import{D as lr}from"../chunks/DemoBlock.d66327e5.js";const s="src/routes/(components)/components/notice/+page.svelte";function Pc(p,n,i){const h=p.slice();return h[21]=n[i],h[23]=i,h}function Vc(p){let n;const i={c:function(){n=d("点击弹出消息")},l:function(e){n=f(e,"点击弹出消息")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:Vc.name,type:"slot",source:"(212:4) <BeButton size='normal' type='default' on:click={openInfo}>",ctx:p}),i}function Lc(p){let n;const i={c:function(){n=d("右上角")},l:function(e){n=f(e,"右上角")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:Lc.name,type:"slot",source:"(217:5) <BeButton size='normal' type='default' on:click={() =>openPosInfo('top-right')}>",ctx:p}),i}function jc(p){let n;const i={c:function(){n=d("右下角")},l:function(e){n=f(e,"右下角")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:jc.name,type:"slot",source:"(218:5) <BeButton size='normal' type='default' on:click={() =>openPosInfo('bottom-right')}>",ctx:p}),i}function Fc(p){let n;const i={c:function(){n=d("左上角")},l:function(e){n=f(e,"左上角")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:Fc.name,type:"slot",source:"(219:5) <BeButton size='normal' type='default' on:click={() =>openPosInfo('top-left')}>",ctx:p}),i}function Uc(p){let n;const i={c:function(){n=d("左下角")},l:function(e){n=f(e,"左下角")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:Uc.name,type:"slot",source:"(220:5) <BeButton size='normal' type='default' on:click={() =>openPosInfo('bottom-left')}>",ctx:p}),i}function qc(p){let n;const i={c:function(){n=d("自定义颜色")},l:function(e){n=f(e,"自定义颜色")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:qc.name,type:"slot",source:"(225:5) <BeButton size='normal' type='default' on:click={openColorNotice}>",ctx:p}),i}function Mc(p){let n;const i={c:function(){n=d("弹出")},l:function(e){n=f(e,"弹出")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:Mc.name,type:"slot",source:"(231:5) <BeButton size='normal' type='default' on:click={openNotice}>",ctx:p}),i}function Yc(p){let n;const i={c:function(){n=d("关闭所有")},l:function(e){n=f(e,"关闭所有")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:Yc.name,type:"slot",source:"(232:5) <BeButton size='normal' type='default' on:click={closeAll}>",ctx:p}),i}function Gc(p){let n,i,h;const e={c:function(){n=d("关闭第"),i=d(p[23]),h=d("个")},l:function(_){n=f(_,"关闭第"),i=f(_,p[23]),h=f(_,"个")},m:function(_,y){F(_,n,y),F(_,i,y),F(_,h,y)},p:tn,d:function(_){_&&o(n),_&&o(i),_&&o(h)}};return Y("SvelteRegisterBlock",{block:e,id:Gc.name,type:"slot",source:"(237:6) <BeButton size='normal' type='default' on:click={() => closeOne(item, index)}>",ctx:p}),e}function rr(p){let n,i;function h(){return p[14](p[21],p[23])}n=new et({props:{size:"normal",type:"default",$$slots:{default:[Gc]},$$scope:{ctx:p}},$$inline:!0}),n.$on("click",h);const e={c:function(){O(n.$$.fragment)},l:function(_){V(n.$$.fragment,_)},m:function(_,y){L(n,_,y),i=!0},p:function(_,y){p=_;const g={};y&16777216&&(g.$$scope={dirty:y,ctx:p}),n.$set(g)},i:function(_){i||(R(n.$$.fragment,_),i=!0)},o:function(_){A(n.$$.fragment,_),i=!1},d:function(_){j(n,_)}};return Y("SvelteRegisterBlock",{block:e,id:rr.name,type:"each",source:"(236:5) {#each notices as item, index}",ctx:p}),e}function Kc(p){let n,i,h,e,m,_,y,g,v,E,N,w,C,U,z,Nt,ot,wt,Ct,se,It,G,nt,Rt,lt,ae,k,K,P,Ee,Ot,W,be,Z,ke,Vt,Lt,ye,jt,Ft,Te,Be,vt,gt,De,Ut,zt,Ne,rt,we,qt,Et,Ce,Mt,At,Ie,bt,Re,ze,ct,J,Se,x,Ae,he,kt,Pt,Ht;h=new et({props:{size:"normal",type:"default",$$slots:{default:[Vc]},$$scope:{ctx:p}},$$inline:!0}),h.$on("click",p[1]),nt=new et({props:{size:"normal",type:"default",$$slots:{default:[Lc]},$$scope:{ctx:p}},$$inline:!0}),nt.$on("click",p[10]),lt=new et({props:{size:"normal",type:"default",$$slots:{default:[jc]},$$scope:{ctx:p}},$$inline:!0}),lt.$on("click",p[11]),k=new et({props:{size:"normal",type:"default",$$slots:{default:[Fc]},$$scope:{ctx:p}},$$inline:!0}),k.$on("click",p[12]),P=new et({props:{size:"normal",type:"default",$$slots:{default:[Uc]},$$scope:{ctx:p}},$$inline:!0}),P.$on("click",p[13]),gt=new et({props:{size:"normal",type:"default",$$slots:{default:[qc]},$$scope:{ctx:p}},$$inline:!0}),gt.$on("click",p[3]),J=new et({props:{size:"normal",type:"default",$$slots:{default:[Mc]},$$scope:{ctx:p}},$$inline:!0}),J.$on("click",p[4]),x=new et({props:{size:"normal",type:"default",$$slots:{default:[Yc]},$$scope:{ctx:p}},$$inline:!0}),x.$on("click",p[6]);let yt=p[0];zc(yt);let I=[];for(let Q=0;Q<yt.length;Q+=1)I[Q]=rr(Pc(p,yt,Q));const pe=Q=>A(I[Q],1,1,()=>{I[Q]=null}),Ve={c:function(){n=l("div"),i=l("div"),O(h.$$.fragment),e=u(),m=l("hr"),_=u(),y=l("h3"),g=d("指定位置"),v=u(),E=l("p"),N=d("默认为"),w=l("code"),C=d("top-right"),U=d("可选择"),z=l("code"),Nt=d("bottom-right"),ot=l("code"),wt=d("top-left"),Ct=l("code"),se=d("bottom-left"),It=u(),G=l("div"),O(nt.$$.fragment),Rt=u(),O(lt.$$.fragment),ae=u(),O(k.$$.fragment),K=u(),O(P.$$.fragment),Ee=u(),Ot=l("h3"),W=d("自定义颜色"),be=u(),Z=l("p"),ke=d("添加参数"),Vt=l("code"),Lt=d("titleColor"),ye=d("可修改标题颜色,添加"),jt=l("code"),Ft=d("messageColor"),Te=d("可修改信息颜色"),Be=u(),vt=l("div"),O(gt.$$.fragment),De=u(),Ut=l("h3"),zt=d("手动关闭"),Ne=u(),rt=l("p"),we=d("根据"),qt=l("code"),Et=d("showNotice"),Ce=d("指定关闭一个notice"),Mt=u(),At=l("p"),Ie=d("如果要一次性关闭所有可使用"),bt=l("code"),Re=d("closeAll"),ze=u(),ct=l("div"),O(J.$$.fragment),Se=u(),O(x.$$.fragment),Ae=u(),he=l("hr"),kt=u(),Pt=l("div");for(let b=0;b<I.length;b+=1)I[b].c();this.h()},l:function(b){n=r(b,"DIV",{slot:!0});var T=a(n);i=r(T,"DIV",{class:!0});var D=a(i);V(h.$$.fragment,D),e=$(D),m=r(D,"HR",{}),_=$(D),y=r(D,"H3",{});var Tt=a(y);g=f(Tt,"指定位置"),Tt.forEach(o),v=$(D),E=r(D,"P",{});var it=a(E);N=f(it,"默认为"),w=r(it,"CODE",{});var ie=a(w);C=f(ie,"top-right"),ie.forEach(o),U=f(it,"可选择"),z=r(it,"CODE",{});var st=a(z);Nt=f(st,"bottom-right"),st.forEach(o),ot=r(it,"CODE",{});var St=a(ot);wt=f(St,"top-left"),St.forEach(o),Ct=r(it,"CODE",{});var q=a(Ct);se=f(q,"bottom-left"),q.forEach(o),it.forEach(o),It=$(D),G=r(D,"DIV",{class:!0});var X=a(G);V(nt.$$.fragment,X),Rt=$(X),V(lt.$$.fragment,X),ae=$(X),V(k.$$.fragment,X),K=$(X),V(P.$$.fragment,X),X.forEach(o),Ee=$(D),Ot=r(D,"H3",{});var H=a(Ot);W=f(H,"自定义颜色"),H.forEach(o),be=$(D),Z=r(D,"P",{});var Bt=a(Z);ke=f(Bt,"添加参数"),Vt=r(Bt,"CODE",{});var de=a(Vt);Lt=f(de,"titleColor"),de.forEach(o),ye=f(Bt,"可修改标题颜色,添加"),jt=r(Bt,"CODE",{});var Le=a(jt);Ft=f(Le,"messageColor"),Le.forEach(o),Te=f(Bt,"可修改信息颜色"),Bt.forEach(o),Be=$(D),vt=r(D,"DIV",{});var je=a(vt);V(gt.$$.fragment,je),je.forEach(o),De=$(D),Ut=r(D,"H3",{});var fe=a(Ut);zt=f(fe,"手动关闭"),fe.forEach(o),Ne=$(D),rt=r(D,"P",{});var me=a(rt);we=f(me,"根据"),qt=r(me,"CODE",{});var Fe=a(qt);Et=f(Fe,"showNotice"),Fe.forEach(o),Ce=f(me,"指定关闭一个notice"),me.forEach(o),Mt=$(D),At=r(D,"P",{});var Yt=a(At);Ie=f(Yt,"如果要一次性关闭所有可使用"),bt=r(Yt,"CODE",{});var Ue=a(bt);Re=f(Ue,"closeAll"),Ue.forEach(o),Yt.forEach(o),ze=$(D),ct=r(D,"DIV",{});var _e=a(ct);V(J.$$.fragment,_e),Se=$(_e),V(x.$$.fragment,_e),_e.forEach(o),Ae=$(D),he=r(D,"HR",{}),kt=$(D),Pt=r(D,"DIV",{});var ue=a(Pt);for(let Pe=0;Pe<I.length;Pe+=1)I[Pe].l(ue);ue.forEach(o),D.forEach(o),T.forEach(o),this.h()},h:function(){c(m,s,212,4,4658),c(y,s,213,4,4667),c(w,s,214,10,4691),c(z,s,214,35,4716),c(ot,s,214,60,4741),c(Ct,s,214,81,4762),c(E,s,214,4,4685),Dt(G,"class","demo-notice"),c(G,s,215,4,4795),c(Ot,s,221,4,5240),c(Vt,s,222,11,5266),c(jt,s,222,44,5299),c(Z,s,222,4,5259),c(vt,s,223,4,5340),c(Ut,s,226,4,5449),c(qt,s,227,9,5472),c(rt,s,227,4,5467),c(bt,s,228,20,5532),c(At,s,228,4,5516),c(ct,s,229,4,5562),c(he,s,233,4,5743),c(Pt,s,234,4,5752),Dt(i,"class","demo-list"),c(i,s,210,3,4549),Dt(n,"slot","source"),c(n,s,209,2,4526)},m:function(b,T){F(b,n,T),t(n,i),L(h,i,null),t(i,e),t(i,m),t(i,_),t(i,y),t(y,g),t(i,v),t(i,E),t(E,N),t(E,w),t(w,C),t(E,U),t(E,z),t(z,Nt),t(E,ot),t(ot,wt),t(E,Ct),t(Ct,se),t(i,It),t(i,G),L(nt,G,null),t(G,Rt),L(lt,G,null),t(G,ae),L(k,G,null),t(G,K),L(P,G,null),t(i,Ee),t(i,Ot),t(Ot,W),t(i,be),t(i,Z),t(Z,ke),t(Z,Vt),t(Vt,Lt),t(Z,ye),t(Z,jt),t(jt,Ft),t(Z,Te),t(i,Be),t(i,vt),L(gt,vt,null),t(i,De),t(i,Ut),t(Ut,zt),t(i,Ne),t(i,rt),t(rt,we),t(rt,qt),t(qt,Et),t(rt,Ce),t(i,Mt),t(i,At),t(At,Ie),t(At,bt),t(bt,Re),t(i,ze),t(i,ct),L(J,ct,null),t(ct,Se),L(x,ct,null),t(i,Ae),t(i,he),t(i,kt),t(i,Pt);for(let D=0;D<I.length;D+=1)I[D].m(Pt,null);Ht=!0},p:function(b,T){const D={};T&16777216&&(D.$$scope={dirty:T,ctx:b}),h.$set(D);const Tt={};T&16777216&&(Tt.$$scope={dirty:T,ctx:b}),nt.$set(Tt);const it={};T&16777216&&(it.$$scope={dirty:T,ctx:b}),lt.$set(it);const ie={};T&16777216&&(ie.$$scope={dirty:T,ctx:b}),k.$set(ie);const st={};T&16777216&&(st.$$scope={dirty:T,ctx:b}),P.$set(st);const St={};T&16777216&&(St.$$scope={dirty:T,ctx:b}),gt.$set(St);const q={};T&16777216&&(q.$$scope={dirty:T,ctx:b}),J.$set(q);const X={};if(T&16777216&&(X.$$scope={dirty:T,ctx:b}),x.$set(X),T&33){yt=b[0],zc(yt);let H;for(H=0;H<yt.length;H+=1){const Bt=Pc(b,yt,H);I[H]?(I[H].p(Bt,T),R(I[H],1)):(I[H]=rr(Bt),I[H].c(),R(I[H],1),I[H].m(Pt,null))}for(cs(),H=yt.length;H<I.length;H+=1)pe(H);ss()}},i:function(b){if(!Ht){R(h.$$.fragment,b),R(nt.$$.fragment,b),R(lt.$$.fragment,b),R(k.$$.fragment,b),R(P.$$.fragment,b),R(gt.$$.fragment,b),R(J.$$.fragment,b),R(x.$$.fragment,b);for(let T=0;T<yt.length;T+=1)R(I[T]);Ht=!0}},o:function(b){A(h.$$.fragment,b),A(nt.$$.fragment,b),A(lt.$$.fragment,b),A(k.$$.fragment,b),A(P.$$.fragment,b),A(gt.$$.fragment,b),A(J.$$.fragment,b),A(x.$$.fragment,b),I=I.filter(Boolean);for(let T=0;T<I.length;T+=1)A(I[T]);Ht=!1},d:function(b){b&&o(n),j(h),j(nt),j(lt),j(k),j(P),j(gt),j(J),j(x),as(I,b)}};return Y("SvelteRegisterBlock",{block:Ve,id:Kc.name,type:"slot",source:"(210:2) ",ctx:p}),Ve}function Jc(p){let n,i,h,e,m,_;i=new en({props:{name:"check-circle-filled",color:"#67c23a"},$$inline:!0});const y={c:function(){n=l("div"),O(i.$$.fragment),h=u(),e=l("span"),m=d("成功"),this.h()},l:function(v){n=r(v,"DIV",{style:!0});var E=a(n);V(i.$$.fragment,E),h=$(E),e=r(E,"SPAN",{style:!0});var N=a(e);m=f(N,"成功"),N.forEach(o),E.forEach(o),this.h()},h:function(){ge(e,"padding-left","5px"),c(e,s,283,59,7418),ge(n,"display","flex"),c(n,s,282,4,7331)},m:function(v,E){F(v,n,E),L(i,n,null),t(n,h),t(n,e),t(e,m),_=!0},p:tn,i:function(v){_||(R(i.$$.fragment,v),_=!0)},o:function(v){A(i.$$.fragment,v),_=!1},d:function(v){v&&o(n),j(i)}};return Y("SvelteRegisterBlock",{block:y,id:Jc.name,type:"slot",source:"(282:3) <BeButton size='normal' type='default' on:click={() => openTypeNotice('success', true)}>",ctx:p}),y}function Qc(p){let n,i,h,e,m,_;i=new en({props:{name:"error-circle-filled",color:"#e6a23c"},$$inline:!0});const y={c:function(){n=l("div"),O(i.$$.fragment),h=u(),e=l("span"),m=d("警告"),this.h()},l:function(v){n=r(v,"DIV",{style:!0});var E=a(n);V(i.$$.fragment,E),h=$(E),e=r(E,"SPAN",{style:!0});var N=a(e);m=f(N,"警告"),N.forEach(o),E.forEach(o),this.h()},h:function(){ge(e,"padding-left","5px"),c(e,s,288,59,7664),ge(n,"display","flex"),c(n,s,287,4,7577)},m:function(v,E){F(v,n,E),L(i,n,null),t(n,h),t(n,e),t(e,m),_=!0},p:tn,i:function(v){_||(R(i.$$.fragment,v),_=!0)},o:function(v){A(i.$$.fragment,v),_=!1},d:function(v){v&&o(n),j(i)}};return Y("SvelteRegisterBlock",{block:y,id:Qc.name,type:"slot",source:"(287:3) <BeButton size='normal' type='default' on:click={() => openTypeNotice('warning')}>",ctx:p}),y}function Wc(p){let n,i,h,e,m,_;i=new en({props:{name:"info-circle-filled",color:"#909399"},$$inline:!0});const y={c:function(){n=l("div"),O(i.$$.fragment),h=u(),e=l("span"),m=d("消息"),this.h()},l:function(v){n=r(v,"DIV",{style:!0});var E=a(n);V(i.$$.fragment,E),h=$(E),e=r(E,"SPAN",{style:!0});var N=a(e);m=f(N,"消息"),N.forEach(o),E.forEach(o),this.h()},h:function(){ge(e,"padding-left","5px"),c(e,s,293,58,7906),ge(n,"display","flex"),c(n,s,292,4,7820)},m:function(v,E){F(v,n,E),L(i,n,null),t(n,h),t(n,e),t(e,m),_=!0},p:tn,i:function(v){_||(R(i.$$.fragment,v),_=!0)},o:function(v){A(i.$$.fragment,v),_=!1},d:function(v){v&&o(n),j(i)}};return Y("SvelteRegisterBlock",{block:y,id:Wc.name,type:"slot",source:"(292:3) <BeButton size='normal' type='default' on:click={() => openTypeNotice('info')}>",ctx:p}),y}function Xc(p){let n,i,h,e,m,_;i=new en({props:{name:"close-circle-filled",color:"#f56c6c"},$$inline:!0});const y={c:function(){n=l("div"),O(i.$$.fragment),h=u(),e=l("span"),m=d("错误"),this.h()},l:function(v){n=r(v,"DIV",{style:!0});var E=a(n);V(i.$$.fragment,E),h=$(E),e=r(E,"SPAN",{style:!0});var N=a(e);m=f(N,"错误"),N.forEach(o),E.forEach(o),this.h()},h:function(){ge(e,"padding-left","5px"),c(e,s,298,59,8150),ge(n,"display","flex"),c(n,s,297,4,8063)},m:function(v,E){F(v,n,E),L(i,n,null),t(n,h),t(n,e),t(e,m),_=!0},p:tn,i:function(v){_||(R(i.$$.fragment,v),_=!0)},o:function(v){A(i.$$.fragment,v),_=!1},d:function(v){v&&o(n),j(i)}};return Y("SvelteRegisterBlock",{block:y,id:Xc.name,type:"slot",source:"(297:3) <BeButton size='normal' type='default' on:click={() => openTypeNotice('error')}>",ctx:p}),y}function Zc(p){let n,i,h,e,m,_,y,g,v;i=new et({props:{size:"normal",type:"default",$$slots:{default:[Jc]},$$scope:{ctx:p}},$$inline:!0}),i.$on("click",p[15]),e=new et({props:{size:"normal",type:"default",$$slots:{default:[Qc]},$$scope:{ctx:p}},$$inline:!0}),e.$on("click",p[16]),_=new et({props:{size:"normal",type:"default",$$slots:{default:[Wc]},$$scope:{ctx:p}},$$inline:!0}),_.$on("click",p[17]),g=new et({props:{size:"normal",type:"default",$$slots:{default:[Xc]},$$scope:{ctx:p}},$$inline:!0}),g.$on("click",p[18]);const E={c:function(){n=l("div"),O(i.$$.fragment),h=u(),O(e.$$.fragment),m=u(),O(_.$$.fragment),y=u(),O(g.$$.fragment),this.h()},l:function(w){n=r(w,"DIV",{slot:!0});var C=a(n);V(i.$$.fragment,C),h=$(C),V(e.$$.fragment,C),m=$(C),V(_.$$.fragment,C),y=$(C),V(g.$$.fragment,C),C.forEach(o),this.h()},h:function(){Dt(n,"slot","source"),c(n,s,280,2,7215)},m:function(w,C){F(w,n,C),L(i,n,null),t(n,h),L(e,n,null),t(n,m),L(_,n,null),t(n,y),L(g,n,null),v=!0},p:function(w,C){const U={};C&16777216&&(U.$$scope={dirty:C,ctx:w}),i.$set(U);const z={};C&16777216&&(z.$$scope={dirty:C,ctx:w}),e.$set(z);const Nt={};C&16777216&&(Nt.$$scope={dirty:C,ctx:w}),_.$set(Nt);const ot={};C&16777216&&(ot.$$scope={dirty:C,ctx:w}),g.$set(ot)},i:function(w){v||(R(i.$$.fragment,w),R(e.$$.fragment,w),R(_.$$.fragment,w),R(g.$$.fragment,w),v=!0)},o:function(w){A(i.$$.fragment,w),A(e.$$.fragment,w),A(_.$$.fragment,w),A(g.$$.fragment,w),v=!1},d:function(w){w&&o(n),j(i),j(e),j(_),j(g)}};return Y("SvelteRegisterBlock",{block:E,id:Zc.name,type:"slot",source:"(281:2) ",ctx:p}),E}function xc(p){let n;const i={c:function(){n=d("弹出")},l:function(e){n=f(e,"弹出")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:xc.name,type:"slot",source:"(308:2) <BeButton size='normal' type='default' on:click={openNotice1}>",ctx:p}),i}function ts(p){let n;const i={c:function(){n=d("弹出")},l:function(e){n=f(e,"弹出")},m:function(e,m){F(e,n,m)},d:function(e){e&&o(n)}};return Y("SvelteRegisterBlock",{block:i,id:ts.name,type:"slot",source:"(314:2) <BeButton size='normal' type='default' on:click={openNotice2}>",ctx:p}),i}function cr(p){let n,i,h,e,m,_,y,g,v,E,N,w,C,U,z,Nt,ot,wt,Ct,se,It,G,nt,Rt,lt,ae,k,K,P,Ee,Ot,W,be,Z,ke,Vt,Lt,ye,jt,Ft,Te,Be,vt,gt,De,Ut,zt,Ne,rt,we,qt,Et,Ce,Mt,At,Ie,bt,Re,ze,ct,J,Se,x,Ae,he,kt,Pt,Ht,yt,I,pe,Ve,Q,b,T,D,Tt,it,ie,st,St,q,X,H,Bt,de,Le,je,fe,me,Fe,Yt,Ue,_e,ue,Pe,rn,M,dt,qe,cn,sn,Me,an,dn,Ye,fn,un,Ge,$n,hn,Ke,pn,mn,ft,Je,_n,vn,Qe,gn,En,We,bn,kn,Xe,yn,Tn,Ze,Bn,Dn,ut,xe,Nn,wn,to,Cn,In,eo,Rn,zn,oo,Sn,An,no,Pn,Hn,$t,lo,On,Vn,ro,Ln,jn,co,Fn,Un,so,qn,Mn,ao,Yn,Gn,ht,io,Kn,Jn,fo,Qn,Wn,uo,Xn,Zn,$o,xn,tl,ho,el,ol,pt,po,nl,ll,mo,rl,cl,_o,sl,al,vo,il,dl,go,fl,ul,mt,Eo,$l,hl,bo,pl,ml,ko,_l,vl,yo,gl,El,To,bl,kl,_t,Bo,yl,Tl,Do,Bl,Dl,No,Nl,wl,wo,Cl,Il,Co,Rl,zl,He,Sl,Al,$e,Io,Gt,Ro,Pl,Hl,zo,Ol,Vl,So,Ll,jl,Kt,Jt,Ao,Fl,Ul,Po,ql,Ml,Ho,Yl,Gl,Qt,Oo,Kl,Jl,Vo,Ql,Wl,Lo,Xl,Zl,Wt,jo,xl,tr,Fo,er,or,Uo,nr,on;k=new lr({props:{js:`
import { showNotice, closeALlNotice, closeNotice } from '@brewer/beerui';
let noticeInstance;
function openInfo(): void {
	// 如需手动关闭需要接收返回的id 调用closeNotice(id) 指定去关闭
	noticeInstance = showNotice({
		title: '相思',
		message: '红豆生南国，春来发几枝',
		duration: 3000
	});
}

function openPosInfo(position: string): void {
	let title: string = '提示';
	let message: string = '这是信息';
	if (position === 'top-right') {
		title = '提示';
		message = '两情若是久长时，又岂在朝朝暮暮。';
	} else if (position === 'top-left') {
		title = '江行寄远';
		message = '思君不可得，愁见江水碧。';
	} else if (position === 'bottom-right') {
		title = '长恨歌';
		message = '后宫佳丽三千人，三千宠爱在一身。';
	} else if (position === 'bottom-left') {
		title = '长恨歌';
		message = '在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。';
	}
	showNotice({
		title,
		message,
		position,
		duration: 3000
	});
}

function openColorNotice() {
	showNotice({
		title: '上邪',
		message: '山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。',
		duration: 3000,
		titleColor: '#2b9939',
		messageColor: '#7376f0'
	});
}


function openNotice() {
	showNotice({
		title: '滕王阁序',
		message: '落霞与孤鹜齐飞,秋水共长天一色',
		duration: 0
	});
}

function closeOne() {
	closeNotice(noticeInstance);
}

function closeAll() {
	closeALlNotice();
}

function openNotice1() {
	showNotice({
		title: '三五七言',
		message: '入我相思门',
		duration: 3000,
		onClose: onClose
	});
}

function onClose() {
	alert('知我相思苦');
}

function openNotice2() {
	showNotice({
		title: '木兰花·拟古决绝词柬友',
		message: '人生若只如初见，何事秋风悲画扇。',
		duration: 0,
		onClick: onClick
	});
}

function onClick() {
	alert('你好Beer UI');
}

`,$$slots:{source:[Kc]},$$scope:{ctx:p}},$$inline:!0}),zt=new lr({props:{js:`
const openTypeNotice = (type, toast) => {
	showNotice({
		title: '提示',
		toast: toast,
		message: type,
		duration: 3000,
		type
	});
}
	`,code:`
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('success', true)}>
		<div style='display: flex'>
			<BeIcon name='check-circle-filled' color='#67c23a' /> <span style='padding-left: 5px;'>成功</span>
		</div>
	</BeButton>
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('warning')}>
		<div style='display: flex'>
			<BeIcon name='error-circle-filled' color='#e6a23c' /> <span style='padding-left: 5px;'>警告</span>
		</div>
	</BeButton>
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('info')}>
		<div style='display: flex'>
			<BeIcon name='info-circle-filled' color='#909399' /> <span style='padding-left: 5px;'>消息</span>
		</div>
	</BeButton>
	<BeButton size='normal' type='default' on:click={() => openTypeNotice('error')}>
		<div style='display: flex'>
			<BeIcon name='close-circle-filled' color='#f56c6c' /> <span style='padding-left: 5px;'>错误</span>
		</div>
	</BeButton>`,$$slots:{source:[Zc]},$$scope:{ctx:p}},$$inline:!0}),J=new et({props:{size:"normal",type:"default",$$slots:{default:[xc]},$$scope:{ctx:p}},$$inline:!0}),J.$on("click",p[7]),T=new et({props:{size:"normal",type:"default",$$slots:{default:[ts]},$$scope:{ctx:p}},$$inline:!0}),T.$on("click",p[8]);const sr={c:function(){n=l("meta"),i=l("meta"),h=u(),e=l("div"),m=l("h2"),_=d("Notice 通知"),y=u(),g=l("p"),v=d("显示全局的通知提醒消息"),E=u(),N=l("h3"),w=d("基本用法"),C=u(),U=l("ol"),z=l("li"),Nt=d("showNotice(options) 显示消息弹框"),ot=u(),wt=l("li"),Ct=d("closeALlNotice 关闭所有消息弹框"),se=u(),It=l("li"),G=d("closeNotice(id, cb) 关闭单个消息弹框"),nt=u(),Rt=l("h4"),lt=d("options"),ae=u(),O(k.$$.fragment),K=u(),P=l("h3"),Ee=d("带有倾向性"),Ot=u(),W=l("p"),be=d("带有 icon，常用来显示「成功 "),Z=l("span"),ke=d("success"),Vt=d("、警告 "),Lt=l("span"),ye=d("warning"),jt=d("、消息 "),Ft=l("span"),Te=d("info"),Be=d("、错误 "),vt=l("span"),gt=d("error"),De=d("」类的系统消息"),Ut=u(),O(zt.$$.fragment),Ne=u(),rt=l("h3"),we=d("监听notice关闭"),qt=u(),Et=l("p"),Ce=d("添加参数"),Mt=l("code"),At=d("onClose"),Ie=d("类型为"),bt=l("code"),Re=d("Function"),ze=u(),ct=l("div"),O(J.$$.fragment),Se=u(),x=l("h3"),Ae=d("点击事件"),he=u(),kt=l("p"),Pt=d("添加参数"),Ht=l("code"),yt=d("onClick"),I=d("类型为"),pe=l("code"),Ve=d("Function"),Q=u(),b=l("div"),O(T.$$.fragment),D=u(),Tt=l("h3"),it=d("Attributes"),ie=u(),st=l("table"),St=l("thead"),q=l("tr"),X=l("th"),H=d("参数"),Bt=u(),de=l("th"),Le=d("说明"),je=u(),fe=l("th"),me=d("类型"),Fe=u(),Yt=l("th"),Ue=d("可选值"),_e=u(),ue=l("th"),Pe=d("默认值"),rn=u(),M=l("tbody"),dt=l("tr"),qe=l("td"),cn=d("type"),sn=u(),Me=l("td"),an=d("消息类型，用于显示图标"),dn=u(),Ye=l("td"),fn=d("string"),un=u(),Ge=l("td"),$n=d("success / info / warning / error"),hn=u(),Ke=l("td"),pn=d("''"),mn=u(),ft=l("tr"),Je=l("td"),_n=d("title"),vn=u(),Qe=l("td"),gn=d("标题"),En=u(),We=l("td"),bn=d("string"),kn=u(),Xe=l("td"),yn=d("-"),Tn=u(),Ze=l("td"),Bn=d("提示"),Dn=u(),ut=l("tr"),xe=l("td"),Nn=d("message"),wn=u(),to=l("td"),Cn=d("消息正文内容"),In=u(),eo=l("td"),Rn=d("string"),zn=u(),oo=l("td"),Sn=d("-"),An=u(),no=l("td"),Pn=d("''"),Hn=u(),$t=l("tr"),lo=l("td"),On=d("duration"),Vn=u(),ro=l("td"),Ln=d("持续时间"),jn=u(),co=l("td"),Fn=d("number"),Un=u(),so=l("td"),qn=d("-"),Mn=u(),ao=l("td"),Yn=d("3000(ms)"),Gn=u(),ht=l("tr"),io=l("td"),Kn=d("position"),Jn=u(),fo=l("td"),Qn=d("位置"),Wn=u(),uo=l("td"),Xn=d("string"),Zn=u(),$o=l("td"),xn=d("top-right/top-left/bottom-right/bottom-left"),tl=u(),ho=l("td"),el=d("top-right"),ol=u(),pt=l("tr"),po=l("td"),nl=d("titleColor"),ll=u(),mo=l("td"),rl=d("标题颜色"),cl=u(),_o=l("td"),sl=d("string"),al=u(),vo=l("td"),il=d("-"),dl=u(),go=l("td"),fl=d("-"),ul=u(),mt=l("tr"),Eo=l("td"),$l=d("messageColor"),hl=u(),bo=l("td"),pl=d("信息颜色"),ml=u(),ko=l("td"),_l=d("string"),vl=u(),yo=l("td"),gl=d("-"),El=u(),To=l("td"),bl=d("-"),kl=u(),_t=l("tr"),Bo=l("td"),yl=d("toast"),Tl=u(),Do=l("td"),Bl=d("是否居中显示 只展示message内容"),Dl=u(),No=l("td"),Nl=d("boolean"),wl=u(),wo=l("td"),Cl=d("true/false"),Il=u(),Co=l("td"),Rl=d("false"),zl=u(),He=l("h3"),Sl=d("Events"),Al=u(),$e=l("table"),Io=l("thead"),Gt=l("tr"),Ro=l("th"),Pl=d("事件名称"),Hl=u(),zo=l("th"),Ol=d("说明"),Vl=u(),So=l("th"),Ll=d("回调参数"),jl=u(),Kt=l("tbody"),Jt=l("tr"),Ao=l("td"),Fl=d("close"),Ul=u(),Po=l("td"),ql=d("关闭的回调"),Ml=u(),Ho=l("td"),Yl=d("示例ID"),Gl=u(),Qt=l("tr"),Oo=l("td"),Kl=d("closeAll"),Jl=u(),Vo=l("td"),Ql=d("关闭所有"),Wl=u(),Lo=l("td"),Xl=d("-"),Zl=u(),Wt=l("tr"),jo=l("td"),xl=d("onClick"),tr=u(),Fo=l("td"),er=d("点击关闭触发"),or=u(),Uo=l("td"),nr=d("''"),this.h()},l:function(S){const at=ls("svelte-pla605",document.head);n=r(at,"META",{name:!0,content:!0}),i=r(at,"META",{name:!0,content:!0}),at.forEach(o),h=$(S),e=r(S,"DIV",{class:!0});var B=a(e);m=r(B,"H2",{});var Qo=a(m);_=f(Qo,"Notice 通知"),Qo.forEach(o),y=$(B),g=r(B,"P",{});var Wo=a(g);v=f(Wo,"显示全局的通知提醒消息"),Wo.forEach(o),E=$(B),N=r(B,"H3",{});var Xo=a(N);w=f(Xo,"基本用法"),Xo.forEach(o),C=$(B),U=r(B,"OL",{});var qo=a(U);z=r(qo,"LI",{});var ar=a(z);Nt=f(ar,"showNotice(options) 显示消息弹框"),ar.forEach(o),ot=$(qo),wt=r(qo,"LI",{});var ir=a(wt);Ct=f(ir,"closeALlNotice 关闭所有消息弹框"),ir.forEach(o),se=$(qo),It=r(qo,"LI",{});var dr=a(It);G=f(dr,"closeNotice(id, cb) 关闭单个消息弹框"),dr.forEach(o),qo.forEach(o),nt=$(B),Rt=r(B,"H4",{});var fr=a(Rt);lt=f(fr,"options"),fr.forEach(o),ae=$(B),V(k.$$.fragment,B),K=$(B),P=r(B,"H3",{});var ur=a(P);Ee=f(ur,"带有倾向性"),ur.forEach(o),Ot=$(B),W=r(B,"P",{});var Xt=a(W);be=f(Xt,"带有 icon，常用来显示「成功 "),Z=r(Xt,"SPAN",{});var $r=a(Z);ke=f($r,"success"),$r.forEach(o),Vt=f(Xt,"、警告 "),Lt=r(Xt,"SPAN",{});var hr=a(Lt);ye=f(hr,"warning"),hr.forEach(o),jt=f(Xt,"、消息 "),Ft=r(Xt,"SPAN",{});var pr=a(Ft);Te=f(pr,"info"),pr.forEach(o),Be=f(Xt,"、错误 "),vt=r(Xt,"SPAN",{});var mr=a(vt);gt=f(mr,"error"),mr.forEach(o),De=f(Xt,"」类的系统消息"),Xt.forEach(o),Ut=$(B),V(zt.$$.fragment,B),Ne=$(B),rt=r(B,"H3",{});var _r=a(rt);we=f(_r,"监听notice关闭"),_r.forEach(o),qt=$(B),Et=r(B,"P",{});var Zo=a(Et);Ce=f(Zo,"添加参数"),Mt=r(Zo,"CODE",{});var vr=a(Mt);At=f(vr,"onClose"),vr.forEach(o),Ie=f(Zo,"类型为"),bt=r(Zo,"CODE",{});var gr=a(bt);Re=f(gr,"Function"),gr.forEach(o),Zo.forEach(o),ze=$(B),ct=r(B,"DIV",{});var Er=a(ct);V(J.$$.fragment,Er),Er.forEach(o),Se=$(B),x=r(B,"H3",{});var br=a(x);Ae=f(br,"点击事件"),br.forEach(o),he=$(B),kt=r(B,"P",{});var xo=a(kt);Pt=f(xo,"添加参数"),Ht=r(xo,"CODE",{});var kr=a(Ht);yt=f(kr,"onClick"),kr.forEach(o),I=f(xo,"类型为"),pe=r(xo,"CODE",{});var yr=a(pe);Ve=f(yr,"Function"),yr.forEach(o),xo.forEach(o),Q=$(B),b=r(B,"DIV",{});var Tr=a(b);V(T.$$.fragment,Tr),Tr.forEach(o),D=$(B),Tt=r(B,"H3",{class:!0});var Br=a(Tt);it=f(Br,"Attributes"),Br.forEach(o),ie=$(B),st=r(B,"TABLE",{class:!0});var nn=a(st);St=r(nn,"THEAD",{});var Dr=a(St);q=r(Dr,"TR",{});var Zt=a(q);X=r(Zt,"TH",{});var Nr=a(X);H=f(Nr,"参数"),Nr.forEach(o),Bt=$(Zt),de=r(Zt,"TH",{});var wr=a(de);Le=f(wr,"说明"),wr.forEach(o),je=$(Zt),fe=r(Zt,"TH",{});var Cr=a(fe);me=f(Cr,"类型"),Cr.forEach(o),Fe=$(Zt),Yt=r(Zt,"TH",{});var Ir=a(Yt);Ue=f(Ir,"可选值"),Ir.forEach(o),_e=$(Zt),ue=r(Zt,"TH",{});var Rr=a(ue);Pe=f(Rr,"默认值"),Rr.forEach(o),Zt.forEach(o),Dr.forEach(o),rn=$(nn),M=r(nn,"TBODY",{});var tt=a(M);dt=r(tt,"TR",{});var xt=a(dt);qe=r(xt,"TD",{});var zr=a(qe);cn=f(zr,"type"),zr.forEach(o),sn=$(xt),Me=r(xt,"TD",{});var Sr=a(Me);an=f(Sr,"消息类型，用于显示图标"),Sr.forEach(o),dn=$(xt),Ye=r(xt,"TD",{});var Ar=a(Ye);fn=f(Ar,"string"),Ar.forEach(o),un=$(xt),Ge=r(xt,"TD",{});var Pr=a(Ge);$n=f(Pr,"success / info / warning / error"),Pr.forEach(o),hn=$(xt),Ke=r(xt,"TD",{});var Hr=a(Ke);pn=f(Hr,"''"),Hr.forEach(o),xt.forEach(o),mn=$(tt),ft=r(tt,"TR",{});var te=a(ft);Je=r(te,"TD",{});var Or=a(Je);_n=f(Or,"title"),Or.forEach(o),vn=$(te),Qe=r(te,"TD",{});var Vr=a(Qe);gn=f(Vr,"标题"),Vr.forEach(o),En=$(te),We=r(te,"TD",{});var Lr=a(We);bn=f(Lr,"string"),Lr.forEach(o),kn=$(te),Xe=r(te,"TD",{});var jr=a(Xe);yn=f(jr,"-"),jr.forEach(o),Tn=$(te),Ze=r(te,"TD",{});var Fr=a(Ze);Bn=f(Fr,"提示"),Fr.forEach(o),te.forEach(o),Dn=$(tt),ut=r(tt,"TR",{});var ee=a(ut);xe=r(ee,"TD",{});var Ur=a(xe);Nn=f(Ur,"message"),Ur.forEach(o),wn=$(ee),to=r(ee,"TD",{});var qr=a(to);Cn=f(qr,"消息正文内容"),qr.forEach(o),In=$(ee),eo=r(ee,"TD",{});var Mr=a(eo);Rn=f(Mr,"string"),Mr.forEach(o),zn=$(ee),oo=r(ee,"TD",{});var Yr=a(oo);Sn=f(Yr,"-"),Yr.forEach(o),An=$(ee),no=r(ee,"TD",{});var Gr=a(no);Pn=f(Gr,"''"),Gr.forEach(o),ee.forEach(o),Hn=$(tt),$t=r(tt,"TR",{});var oe=a($t);lo=r(oe,"TD",{});var Kr=a(lo);On=f(Kr,"duration"),Kr.forEach(o),Vn=$(oe),ro=r(oe,"TD",{});var Jr=a(ro);Ln=f(Jr,"持续时间"),Jr.forEach(o),jn=$(oe),co=r(oe,"TD",{});var Qr=a(co);Fn=f(Qr,"number"),Qr.forEach(o),Un=$(oe),so=r(oe,"TD",{});var Wr=a(so);qn=f(Wr,"-"),Wr.forEach(o),Mn=$(oe),ao=r(oe,"TD",{});var Xr=a(ao);Yn=f(Xr,"3000(ms)"),Xr.forEach(o),oe.forEach(o),Gn=$(tt),ht=r(tt,"TR",{});var ne=a(ht);io=r(ne,"TD",{});var Zr=a(io);Kn=f(Zr,"position"),Zr.forEach(o),Jn=$(ne),fo=r(ne,"TD",{});var xr=a(fo);Qn=f(xr,"位置"),xr.forEach(o),Wn=$(ne),uo=r(ne,"TD",{});var tc=a(uo);Xn=f(tc,"string"),tc.forEach(o),Zn=$(ne),$o=r(ne,"TD",{});var ec=a($o);xn=f(ec,"top-right/top-left/bottom-right/bottom-left"),ec.forEach(o),tl=$(ne),ho=r(ne,"TD",{});var oc=a(ho);el=f(oc,"top-right"),oc.forEach(o),ne.forEach(o),ol=$(tt),pt=r(tt,"TR",{});var le=a(pt);po=r(le,"TD",{});var nc=a(po);nl=f(nc,"titleColor"),nc.forEach(o),ll=$(le),mo=r(le,"TD",{});var lc=a(mo);rl=f(lc,"标题颜色"),lc.forEach(o),cl=$(le),_o=r(le,"TD",{});var rc=a(_o);sl=f(rc,"string"),rc.forEach(o),al=$(le),vo=r(le,"TD",{});var cc=a(vo);il=f(cc,"-"),cc.forEach(o),dl=$(le),go=r(le,"TD",{});var sc=a(go);fl=f(sc,"-"),sc.forEach(o),le.forEach(o),ul=$(tt),mt=r(tt,"TR",{});var re=a(mt);Eo=r(re,"TD",{});var ac=a(Eo);$l=f(ac,"messageColor"),ac.forEach(o),hl=$(re),bo=r(re,"TD",{});var ic=a(bo);pl=f(ic,"信息颜色"),ic.forEach(o),ml=$(re),ko=r(re,"TD",{});var dc=a(ko);_l=f(dc,"string"),dc.forEach(o),vl=$(re),yo=r(re,"TD",{});var fc=a(yo);gl=f(fc,"-"),fc.forEach(o),El=$(re),To=r(re,"TD",{});var uc=a(To);bl=f(uc,"-"),uc.forEach(o),re.forEach(o),kl=$(tt),_t=r(tt,"TR",{});var ce=a(_t);Bo=r(ce,"TD",{});var $c=a(Bo);yl=f($c,"toast"),$c.forEach(o),Tl=$(ce),Do=r(ce,"TD",{});var hc=a(Do);Bl=f(hc,"是否居中显示 只展示message内容"),hc.forEach(o),Dl=$(ce),No=r(ce,"TD",{});var pc=a(No);Nl=f(pc,"boolean"),pc.forEach(o),wl=$(ce),wo=r(ce,"TD",{});var mc=a(wo);Cl=f(mc,"true/false"),mc.forEach(o),Il=$(ce),Co=r(ce,"TD",{});var _c=a(Co);Rl=f(_c,"false"),_c.forEach(o),ce.forEach(o),tt.forEach(o),nn.forEach(o),zl=$(B),He=r(B,"H3",{class:!0});var vc=a(He);Sl=f(vc,"Events"),vc.forEach(o),Al=$(B),$e=r(B,"TABLE",{class:!0});var ln=a($e);Io=r(ln,"THEAD",{});var gc=a(Io);Gt=r(gc,"TR",{});var Mo=a(Gt);Ro=r(Mo,"TH",{});var Ec=a(Ro);Pl=f(Ec,"事件名称"),Ec.forEach(o),Hl=$(Mo),zo=r(Mo,"TH",{});var bc=a(zo);Ol=f(bc,"说明"),bc.forEach(o),Vl=$(Mo),So=r(Mo,"TH",{});var kc=a(So);Ll=f(kc,"回调参数"),kc.forEach(o),Mo.forEach(o),gc.forEach(o),jl=$(ln),Kt=r(ln,"TBODY",{});var Yo=a(Kt);Jt=r(Yo,"TR",{});var Go=a(Jt);Ao=r(Go,"TD",{});var yc=a(Ao);Fl=f(yc,"close"),yc.forEach(o),Ul=$(Go),Po=r(Go,"TD",{});var Tc=a(Po);ql=f(Tc,"关闭的回调"),Tc.forEach(o),Ml=$(Go),Ho=r(Go,"TD",{});var Bc=a(Ho);Yl=f(Bc,"示例ID"),Bc.forEach(o),Go.forEach(o),Gl=$(Yo),Qt=r(Yo,"TR",{});var Ko=a(Qt);Oo=r(Ko,"TD",{});var Dc=a(Oo);Kl=f(Dc,"closeAll"),Dc.forEach(o),Jl=$(Ko),Vo=r(Ko,"TD",{});var Nc=a(Vo);Ql=f(Nc,"关闭所有"),Nc.forEach(o),Wl=$(Ko),Lo=r(Ko,"TD",{});var wc=a(Lo);Xl=f(wc,"-"),wc.forEach(o),Ko.forEach(o),Zl=$(Yo),Wt=r(Yo,"TR",{});var Jo=a(Wt);jo=r(Jo,"TD",{});var Cc=a(jo);xl=f(Cc,"onClick"),Cc.forEach(o),tr=$(Jo),Fo=r(Jo,"TD",{});var Ic=a(Fo);er=f(Ic,"点击关闭触发"),Ic.forEach(o),or=$(Jo),Uo=r(Jo,"TD",{});var Rc=a(Uo);nr=f(Rc,"''"),Rc.forEach(o),Jo.forEach(o),Yo.forEach(o),ln.forEach(o),B.forEach(o),this.h()},h:function(){document.title="Notice 通知 组件文档 BeerUi-官方文档",Dt(n,"name","description"),Dt(n,"content","BeerUi, 基于 svelte 的 PC端 组件库，base on svelte 3.0 web component"),c(n,s,106,1,2488),Dt(i,"name","keywords"),Dt(i,"content","Notice 通知, beerui组件文档,beerui,beerui文档,beerui官网, BeerUi,@brewer/beerui,svelte,component,svelteKit"),c(i,s,107,1,2586),c(m,s,110,1,2769),c(g,s,111,1,2789),c(N,s,112,1,2809),c(z,s,114,2,2831),c(wt,s,115,2,2869),c(It,s,116,2,2904),c(U,s,113,1,2824),c(Rt,s,118,1,2950),c(P,s,244,1,5961),c(Z,s,245,21,5997),c(Lt,s,245,45,6021),c(Ft,s,245,69,6045),c(vt,s,245,90,6066),c(W,s,245,1,5977),c(rt,s,304,1,8244),c(Mt,s,305,8,8272),c(bt,s,305,31,8295),c(Et,s,305,1,8265),c(ct,s,306,1,8322),c(x,s,310,1,8416),c(Ht,s,311,8,8438),c(pe,s,311,31,8461),c(kt,s,311,1,8431),c(b,s,312,1,8488),Dt(Tt,"class","demo-table-title"),c(Tt,s,315,1,8581),c(X,s,320,3,8675),c(de,s,321,3,8690),c(fe,s,322,3,8705),c(Yt,s,323,3,8720),c(ue,s,324,3,8736),c(q,s,319,2,8667),c(St,s,318,2,8657),c(qe,s,329,4,8790),c(Me,s,330,4,8808),c(Ye,s,331,4,8833),c(Ge,s,332,4,8853),c(Ke,s,333,4,8899),c(dt,s,328,3,8781),c(Je,s,336,4,8932),c(Qe,s,337,4,8951),c(We,s,338,4,8967),c(Xe,s,339,4,8987),c(Ze,s,340,4,9002),c(ft,s,335,3,8923),c(xe,s,343,4,9035),c(to,s,344,4,9056),c(eo,s,345,4,9076),c(oo,s,346,4,9096),c(no,s,347,4,9111),c(ut,s,342,3,9026),c(lo,s,350,4,9144),c(ro,s,351,4,9166),c(co,s,352,4,9184),c(so,s,353,4,9204),c(ao,s,354,4,9219),c($t,s,349,3,9135),c(io,s,357,4,9258),c(fo,s,358,4,9280),c(uo,s,359,4,9296),c($o,s,360,4,9316),c(ho,s,361,4,9373),c(ht,s,356,3,9249),c(po,s,364,4,9413),c(mo,s,365,4,9437),c(_o,s,366,4,9455),c(vo,s,367,4,9475),c(go,s,368,4,9490),c(pt,s,363,3,9404),c(Eo,s,371,4,9522),c(bo,s,372,4,9548),c(ko,s,373,4,9566),c(yo,s,374,4,9586),c(To,s,375,4,9601),c(mt,s,370,3,9513),c(Bo,s,378,4,9633),c(Do,s,379,4,9652),c(No,s,380,4,9685),c(wo,s,381,4,9706),c(Co,s,382,4,9730),c(_t,s,377,3,9624),c(M,s,327,2,8770),Dt(st,"class","demo-table"),c(st,s,317,1,8628),Dt(He,"class","demo-table-title"),c(He,s,386,1,9776),c(Ro,s,390,3,9865),c(zo,s,391,3,9882),c(So,s,392,3,9897),c(Gt,s,389,2,9857),c(Io,s,388,2,9847),c(Ao,s,397,4,9952),c(Po,s,398,4,9971),c(Ho,s,399,4,9990),c(Jt,s,396,3,9943),c(Oo,s,402,4,10025),c(Vo,s,403,4,10047),c(Lo,s,404,4,10065),c(Qt,s,401,3,10016),c(jo,s,407,4,10097),c(Fo,s,408,4,10118),c(Uo,s,409,4,10138),c(Wt,s,406,3,10088),c(Kt,s,395,2,9932),Dt($e,"class","demo-table"),c($e,s,387,1,9818),Dt(e,"class","page-container content"),c(e,s,109,0,2731)},m:function(S,at){t(document.head,n),t(document.head,i),F(S,h,at),F(S,e,at),t(e,m),t(m,_),t(e,y),t(e,g),t(g,v),t(e,E),t(e,N),t(N,w),t(e,C),t(e,U),t(U,z),t(z,Nt),t(U,ot),t(U,wt),t(wt,Ct),t(U,se),t(U,It),t(It,G),t(e,nt),t(e,Rt),t(Rt,lt),t(e,ae),L(k,e,null),t(e,K),t(e,P),t(P,Ee),t(e,Ot),t(e,W),t(W,be),t(W,Z),t(Z,ke),t(W,Vt),t(W,Lt),t(Lt,ye),t(W,jt),t(W,Ft),t(Ft,Te),t(W,Be),t(W,vt),t(vt,gt),t(W,De),t(e,Ut),L(zt,e,null),t(e,Ne),t(e,rt),t(rt,we),t(e,qt),t(e,Et),t(Et,Ce),t(Et,Mt),t(Mt,At),t(Et,Ie),t(Et,bt),t(bt,Re),t(e,ze),t(e,ct),L(J,ct,null),t(e,Se),t(e,x),t(x,Ae),t(e,he),t(e,kt),t(kt,Pt),t(kt,Ht),t(Ht,yt),t(kt,I),t(kt,pe),t(pe,Ve),t(e,Q),t(e,b),L(T,b,null),t(e,D),t(e,Tt),t(Tt,it),t(e,ie),t(e,st),t(st,St),t(St,q),t(q,X),t(X,H),t(q,Bt),t(q,de),t(de,Le),t(q,je),t(q,fe),t(fe,me),t(q,Fe),t(q,Yt),t(Yt,Ue),t(q,_e),t(q,ue),t(ue,Pe),t(st,rn),t(st,M),t(M,dt),t(dt,qe),t(qe,cn),t(dt,sn),t(dt,Me),t(Me,an),t(dt,dn),t(dt,Ye),t(Ye,fn),t(dt,un),t(dt,Ge),t(Ge,$n),t(dt,hn),t(dt,Ke),t(Ke,pn),t(M,mn),t(M,ft),t(ft,Je),t(Je,_n),t(ft,vn),t(ft,Qe),t(Qe,gn),t(ft,En),t(ft,We),t(We,bn),t(ft,kn),t(ft,Xe),t(Xe,yn),t(ft,Tn),t(ft,Ze),t(Ze,Bn),t(M,Dn),t(M,ut),t(ut,xe),t(xe,Nn),t(ut,wn),t(ut,to),t(to,Cn),t(ut,In),t(ut,eo),t(eo,Rn),t(ut,zn),t(ut,oo),t(oo,Sn),t(ut,An),t(ut,no),t(no,Pn),t(M,Hn),t(M,$t),t($t,lo),t(lo,On),t($t,Vn),t($t,ro),t(ro,Ln),t($t,jn),t($t,co),t(co,Fn),t($t,Un),t($t,so),t(so,qn),t($t,Mn),t($t,ao),t(ao,Yn),t(M,Gn),t(M,ht),t(ht,io),t(io,Kn),t(ht,Jn),t(ht,fo),t(fo,Qn),t(ht,Wn),t(ht,uo),t(uo,Xn),t(ht,Zn),t(ht,$o),t($o,xn),t(ht,tl),t(ht,ho),t(ho,el),t(M,ol),t(M,pt),t(pt,po),t(po,nl),t(pt,ll),t(pt,mo),t(mo,rl),t(pt,cl),t(pt,_o),t(_o,sl),t(pt,al),t(pt,vo),t(vo,il),t(pt,dl),t(pt,go),t(go,fl),t(M,ul),t(M,mt),t(mt,Eo),t(Eo,$l),t(mt,hl),t(mt,bo),t(bo,pl),t(mt,ml),t(mt,ko),t(ko,_l),t(mt,vl),t(mt,yo),t(yo,gl),t(mt,El),t(mt,To),t(To,bl),t(M,kl),t(M,_t),t(_t,Bo),t(Bo,yl),t(_t,Tl),t(_t,Do),t(Do,Bl),t(_t,Dl),t(_t,No),t(No,Nl),t(_t,wl),t(_t,wo),t(wo,Cl),t(_t,Il),t(_t,Co),t(Co,Rl),t(e,zl),t(e,He),t(He,Sl),t(e,Al),t(e,$e),t($e,Io),t(Io,Gt),t(Gt,Ro),t(Ro,Pl),t(Gt,Hl),t(Gt,zo),t(zo,Ol),t(Gt,Vl),t(Gt,So),t(So,Ll),t($e,jl),t($e,Kt),t(Kt,Jt),t(Jt,Ao),t(Ao,Fl),t(Jt,Ul),t(Jt,Po),t(Po,ql),t(Jt,Ml),t(Jt,Ho),t(Ho,Yl),t(Kt,Gl),t(Kt,Qt),t(Qt,Oo),t(Oo,Kl),t(Qt,Jl),t(Qt,Vo),t(Vo,Ql),t(Qt,Wl),t(Qt,Lo),t(Lo,Xl),t(Kt,Zl),t(Kt,Wt),t(Wt,jo),t(jo,xl),t(Wt,tr),t(Wt,Fo),t(Fo,er),t(Wt,or),t(Wt,Uo),t(Uo,nr),on=!0},p:function(S,[at]){const B={};at&16777217&&(B.$$scope={dirty:at,ctx:S}),k.$set(B);const Qo={};at&16777216&&(Qo.$$scope={dirty:at,ctx:S}),zt.$set(Qo);const Wo={};at&16777216&&(Wo.$$scope={dirty:at,ctx:S}),J.$set(Wo);const Xo={};at&16777216&&(Xo.$$scope={dirty:at,ctx:S}),T.$set(Xo)},i:function(S){on||(R(k.$$.fragment,S),R(zt.$$.fragment,S),R(J.$$.fragment,S),R(T.$$.fragment,S),on=!0)},o:function(S){A(k.$$.fragment,S),A(zt.$$.fragment,S),A(J.$$.fragment,S),A(T.$$.fragment,S),on=!1},d:function(S){o(n),o(i),S&&o(h),S&&o(e),j(k),j(zt),j(J),j(T)}};return Y("SvelteRegisterBlock",{block:sr,id:cr.name,type:"component",source:"",ctx:p}),sr}function Hc(){alert("知我相思苦")}function Oc(){alert("你好Beer UI")}function is(p,n,i){let{$$slots:h={},$$scope:e}=n;rs("Page",h,[]);let m;function _(){m=ve({title:"相思",message:"红豆生南国，春来发几枝",duration:3e3})}function y(k){let K="提示",P="这是信息";k==="top-right"?(K="提示",P="两情若是久长时，又岂在朝朝暮暮。"):k==="top-left"?(K="江行寄远",P="思君不可得，愁见江水碧。"):k==="bottom-right"?(K="长恨歌",P="后宫佳丽三千人，三千宠爱在一身。"):k==="bottom-left"&&(K="长恨歌",P="在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。"),ve({title:K,message:P,position:k,duration:3e3})}function g(){ve({title:"上邪",message:"山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。",duration:3e3,titleColor:"#2b9939",messageColor:"#7376f0"})}let v=[];function E(){const k=ve({title:"滕王阁序",message:"落霞与孤鹜齐飞,秋水共长天一色",duration:0});v.push(k),i(0,v)}function N(k,K){Ac(k),v.splice(K,1),i(0,v)}function w(){Sc()}function C(){ve({title:"三五七言",message:"入我相思门",duration:3e3,onClose:Hc})}function U(){ve({title:"木兰花·拟古决绝词柬友",message:"人生若只如初见，何事秋风悲画扇。",duration:0,onClick:Oc})}const z=(k,K)=>{ve({title:"提示",toast:K,message:k,duration:3e4,type:k})},Nt={success:{name:"check-circle-filled",color:"#67c23a"},warning:{name:"error-circle-filled",color:"#e6a23c"},info:{name:"info-circle-filled",color:"#909399"},error:{name:"close-circle-filled",color:"#f56c6c"}},ot=[];Object.keys(n).forEach(k=>{!~ot.indexOf(k)&&k.slice(0,2)!=="$$"&&k!=="slot"&&console.warn(`<Page> was created with unknown prop '${k}'`)});const wt=()=>y("top-right"),Ct=()=>y("bottom-right"),se=()=>y("top-left"),It=()=>y("bottom-left"),G=(k,K)=>N(k,K),nt=()=>z("success",!0),Rt=()=>z("warning"),lt=()=>z("info"),ae=()=>z("error");return p.$capture_state=()=>({BeButton:et,BeIcon:en,DemoBlock:lr,showNotice:ve,closeALlNotice:Sc,closeNotice:Ac,noticeInstance:m,openInfo:_,openPosInfo:y,openColorNotice:g,notices:v,openNotice:E,closeOne:N,closeAll:w,openNotice1:C,onClose:Hc,openNotice2:U,onClick:Oc,openTypeNotice:z,types:Nt}),p.$inject_state=k=>{"noticeInstance"in k&&(m=k.noticeInstance),"notices"in k&&i(0,v=k.notices)},n&&"$$inject"in n&&p.$inject_state(n.$$inject),[v,_,y,g,E,N,w,C,U,z,wt,Ct,se,It,G,nt,Rt,lt,ae]}class _s extends es{constructor(n){super(n),os(this,n,is,cr,ns,{}),Y("SvelteRegisterComponent",{component:this,tagName:"Page",options:n,id:cr.name})}}export{_s as default};
