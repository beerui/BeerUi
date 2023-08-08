import{S as G,i as y,s as I,d as x,Q as P,v as S,a3 as _,l as w,a7 as C,t as g,n as j,p as H,q as D,j as E,r as f,w as R,b as q,R as F,T as O,U as V,h as N,f as Q}from"./index.21613952.js";class L{constructor(e){this.optionList=[],this.subscribe=[],this.optionList=e.checked,this.dispatch=e.dispatch,this.subscribe=e.subscribe||[]}setCheckedList(e){if(e.length===0){this.clearList();return}this.optionList=[...new Set([...this.optionList,...e])],this.publishHandle()}setChecked(e){this.isChecked(e)?this.deleteChecked(e):this.optionList.push(e),this.publishHandle()}isChecked(e){return this.optionList.some(c=>c===e)}deleteChecked(e){const c=this.optionList.findIndex(a=>e===a);this.optionList.splice(c,1)}publishHandle(){this.subscribe.forEach(e=>e(this.optionList)),this.dispatch("change",this.optionList)}clearList(){this.optionList=[],this.publishHandle()}}const T="src/lib/be-checkbox/BeCheckboxGroup.svelte";function k(o){let e,c,a;const h=o[5].default,i=P(h,o,o[4],null),r={c:function(){e=j("div"),i&&i.c(),this.h()},l:function(s){e=H(s,"DIV",{role:!0,"aria-label":!0,class:!0});var l=D(e);i&&i.l(l),l.forEach(E),this.h()},h:function(){f(e,"role","group"),f(e,"aria-label","checkbox-group"),f(e,"class",c="be-checkbox-group "+o[0]),R(e,T,35,0,1010)},m:function(s,l){q(s,e,l),i&&i.m(e,null),a=!0},p:function(s,[l]){i&&i.p&&(!a||l&16)&&F(i,h,s,s[4],a?V(h,s[4],l,null):O(s[4]),null),(!a||l&1&&c!==(c="be-checkbox-group "+s[0]))&&f(e,"class",c)},i:function(s){a||(N(i,s),a=!0)},o:function(s){Q(i,s),a=!1},d:function(s){s&&E(e),i&&i.d(s)}};return x("SvelteRegisterBlock",{block:r,id:k.name,type:"component",source:"",ctx:o}),r}function U(o,e,c){let{$$slots:a={},$$scope:h}=e;S("BeCheckboxGroup",a,["default"]);const i=_();let{checked:r=[]}=e,{validateEvent:n=!0}=e;const s=new L({checked:r,dispatch:i});w("checkStore",s);const l=t=>{s.setCheckedList(t)},v=()=>c(1,r=s.optionList);s.subscribe.push(v);let{class:d=""}=e;const u=C("BeFormItem");let p="",b=!1;u&&u.propWatch.subscribe(t=>p=t);const m=t=>{u&&p&&b&&n&&u.FormItemEventCallback({type:"change",value:[t]})};g().then(()=>{b=!0});const B=["checked","validateEvent","class"];return Object.keys(e).forEach(t=>{!~B.indexOf(t)&&t.slice(0,2)!=="$$"&&t!=="slot"&&console.warn(`<BeCheckboxGroup> was created with unknown prop '${t}'`)}),o.$$set=t=>{"checked"in t&&c(1,r=t.checked),"validateEvent"in t&&c(2,n=t.validateEvent),"class"in t&&c(0,d=t.class),"$$scope"in t&&c(4,h=t.$$scope)},o.$capture_state=()=>({createEventDispatcher:_,getContext:C,setContext:w,tick:g,CheckStore:L,dispatch:i,checked:r,validateEvent:n,store:s,setCheckedList:l,subscribeHandle:v,_class:d,ctx:u,prop:p,isInit:b,watchValue:m}),o.$inject_state=t=>{"checked"in t&&c(1,r=t.checked),"validateEvent"in t&&c(2,n=t.validateEvent),"_class"in t&&c(0,d=t._class),"prop"in t&&(p=t.prop),"isInit"in t&&(b=t.isInit)},e&&"$$inject"in e&&o.$inject_state(e.$$inject),o.$$.update=()=>{o.$$.dirty&2&&r&&l(r),o.$$.dirty&2&&m(r)},[d,r,n,l,h,a]}class z extends G{constructor(e){super(e),y(this,e,U,k,I,{checked:1,validateEvent:2,setCheckedList:3,class:0}),x("SvelteRegisterComponent",{component:this,tagName:"BeCheckboxGroup",options:e,id:k.name})}get checked(){throw new Error("<BeCheckboxGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set checked(e){throw new Error("<BeCheckboxGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get validateEvent(){throw new Error("<BeCheckboxGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set validateEvent(e){throw new Error("<BeCheckboxGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get setCheckedList(){return this.$$.ctx[3]}set setCheckedList(e){throw new Error("<BeCheckboxGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get class(){throw new Error("<BeCheckboxGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set class(e){throw new Error("<BeCheckboxGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}}export{z as B};
