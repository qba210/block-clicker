function S(){}function H(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function P(){return Object.create(null)}function p(t){t.forEach(B)}function I(t){return typeof t=="function"}function ut(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let g;function st(t,n){return g||(g=document.createElement("a")),g.href=n,t===g.href}function G(t){return Object.keys(t).length===0}function L(t,...n){if(t==null)return S;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ot(t){let n;return L(t,e=>n=e)(),n}function at(t,n,e){t.$$.on_destroy.push(L(n,e))}function ft(t,n,e,i){if(t){const r=O(t,n,e,i);return t[0](r)}}function O(t,n,e,i){return t[1]&&i?H(e.ctx.slice(),t[1](i(n))):e.ctx}function dt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=n.dirty[s]|r[s];return o}return n.dirty|r}return n.dirty}function _t(t,n,e,i,r,o){if(r){const c=O(n,e,i,o);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){return t==null?"":t}let v=!1;function J(){v=!0}function K(){v=!1}function Q(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function W(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<n.length;u++){const f=n[u];f.claim_order!==void 0&&l.push(f)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const u=n[l].claim_order,f=(r>0&&n[e[r]].claim_order<=u?r+1:Q(1,r,y=>n[e[y]].claim_order,u))-1;i[l]=e[f]+1;const a=f+1;e[a]=l,r=Math.max(a,r)}const o=[],c=[];let s=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(o.push(n[l-1]);s>=l;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);o.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<o.length&&c[l].claim_order>=o[u].claim_order;)u++;const f=u<o.length?o[u]:null;t.insertBefore(c[l],f)}}function R(t,n){if(v){for(W(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function pt(t,n,e){v&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode.removeChild(t)}function yt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function V(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function gt(){return j(" ")}function xt(){return j("")}function bt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function $t(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function X(t){return Array.from(t.childNodes)}function Y(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function T(t,n,e,i,r=!1){Y(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Z(t,n,e,i){return T(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function vt(t,n,e){return Z(t,n,e,V)}function tt(t,n){return T(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>j(n),!0)}function Et(t){return tt(t," ")}function wt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Nt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function nt(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}let m;function h(t){m=t}function C(){if(!m)throw new Error("Function called outside component initialization");return m}function At(t){C().$$.on_mount.push(t)}function St(t){C().$$.after_update.push(t)}function jt(){const t=C();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const o=nt(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}const _=[],q=[],b=[],w=[],D=Promise.resolve();let N=!1;function z(){N||(N=!0,D.then(F))}function Ct(){return z(),D}function A(t){b.push(t)}function kt(t){w.push(t)}const E=new Set;let x=0;function F(){const t=m;do{for(;x<_.length;){const n=_[x];x++,h(n),et(n.$$)}for(h(null),_.length=0,x=0;q.length;)q.pop()();for(let n=0;n<b.length;n+=1){const e=b[n];E.has(e)||(E.add(e),e())}b.length=0}while(_.length);for(;w.length;)w.pop()();N=!1,E.clear(),h(t)}function et(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(A)}}const $=new Set;let d;function Mt(){d={r:0,c:[],p:d}}function Pt(){d.r||p(d.c),d=d.p}function it(t,n){t&&t.i&&($.delete(t),t.i(n))}function qt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Bt(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function Lt(t){t&&t.c()}function Ot(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,on_mount:o,on_destroy:c,after_update:s}=t.$$;r&&r.m(n,e),i||A(()=>{const l=o.map(B).filter(I);c?c.push(...l):p(l),t.$$.on_mount=[]}),s.forEach(A)}function ct(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(_.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Tt(t,n,e,i,r,o,c,s=[-1]){const l=m;h(t);const u=t.$$={fragment:null,ctx:null,props:o,update:S,not_equal:r,bound:P(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(l?l.$$.context:[])),callbacks:P(),dirty:s,skip_bound:!1,root:n.target||l.$$.root};c&&c(u.root);let f=!1;if(u.ctx=e?e(t,n.props||{},(a,y,...k)=>{const M=k.length?k[0]:y;return u.ctx&&r(u.ctx[a],u.ctx[a]=M)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](M),f&&lt(t,a)),y}):[],u.update(),f=!0,p(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){J();const a=X(n.target);u.fragment&&u.fragment.l(a),a.forEach(U)}else u.fragment&&u.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),K(),F()}h(l)}class Dt{$destroy(){ct(this,1),this.$destroy=S}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!G(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{S as A,ft as B,_t as C,ht as D,dt as E,R as F,at as G,ot as H,st as I,bt as J,q as K,Bt as L,kt as M,jt as N,yt as O,mt as P,p as Q,Dt as S,gt as a,pt as b,Et as c,Pt as d,xt as e,it as f,Mt as g,U as h,Tt as i,St as j,V as k,vt as l,X as m,$t as n,At as o,Nt as p,j as q,tt as r,ut as s,qt as t,wt as u,Lt as v,Ot as w,rt as x,ct as y,Ct as z};