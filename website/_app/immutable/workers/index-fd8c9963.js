(function(){"use strict";self.window=self;let a;const c=new Promise(s=>{a=s});self.addEventListener("message",async s=>{switch(s.data.type){case"init":try{importScripts(`${s.data.svelteUrl}/compiler.js`)}catch{await import(`${s.data.svelteUrl}/compiler.js`)}a();break;case"compile":await c,postMessage(o(s.data));break}});const r={dev:!1,css:!1};function o({id:s,source:l,options:i,return_ast:n}){try{const{js:t,css:e,ast:m}=svelte.compile(l,Object.assign({},r,i));return{id:s,result:{js:t.code,css:e.code||"/* Add a <style> tag to see compiled CSS */",ast:n?m:null}}}catch(t){let e=`/* Error compiling component

${t.message}`;return t.frame&&(e+=`
${t.frame}`),e+=`

*/`,{id:s,result:{js:e,css:e}}}}})();
