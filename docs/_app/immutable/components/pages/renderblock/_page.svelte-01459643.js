import{S as V,i as q,s as P,k as h,a as D,l as _,m as I,h as b,c as E,n as e,I as m,b as S,F as d,A as M,o as T,K as U}from"../../../chunks/index-67b12788.js";import{b as R,B as w}from"../../../chunks/blockUtil-d6cb8bec.js";function A(g){let s,c,t,p,v,i,l,n,f,o,a,k;return{c(){s=h("div"),c=h("div"),t=h("img"),v=D(),i=h("div"),l=h("img"),f=D(),o=h("div"),a=h("img"),this.h()},l(u){s=_(u,"DIV",{id:!0});var r=I(s);c=_(r,"DIV",{class:!0});var G=I(c);t=_(G,"IMG",{alt:!0,draggable:!0,src:!0,class:!0}),G.forEach(b),v=E(r),i=_(r,"DIV",{class:!0});var B=I(i);l=_(B,"IMG",{alt:!0,draggable:!0,src:!0,class:!0}),B.forEach(b),f=E(r),o=_(r,"DIV",{class:!0});var y=I(o);a=_(y,"IMG",{alt:!0,draggable:!0,src:!0,class:!0}),y.forEach(b),r.forEach(b),this.h()},h(){e(t,"alt",""),e(t,"draggable","false"),m(t.src,p=g[1])||e(t,"src",p),e(t,"class","svelte-1h4uipw"),e(c,"class","right svelte-1h4uipw"),e(l,"alt",""),e(l,"draggable","false"),m(l.src,n=g[0])||e(l,"src",n),e(l,"class","svelte-1h4uipw"),e(i,"class","left svelte-1h4uipw"),e(a,"alt",""),e(a,"draggable","false"),m(a.src,k=g[2])||e(a,"src",k),e(a,"class","svelte-1h4uipw"),e(o,"class","top svelte-1h4uipw"),e(s,"id","block-render")},m(u,r){S(u,s,r),d(s,c),d(c,t),d(s,v),d(s,i),d(i,l),d(s,f),d(s,o),d(o,a),g[4](s)},p(u,[r]){r&2&&!m(t.src,p=u[1])&&e(t,"src",p),r&1&&!m(l.src,n=u[0])&&e(l,"src",n),r&4&&!m(a.src,k=u[2])&&e(a,"src",k)},i:M,o:M,d(u){u&&b(s),g[4](null)}}}function C(g,s,c){let t="",p="",v="",i;T(async()=>{let n=new URLSearchParams(location.search),f=R.find(o=>{var a;return o.namespace===((a=n.get("namespace"))!=null?a:"_null")});c(0,t=w.GetBlockTexture(f,"left")),c(1,p=w.GetBlockTexture(f,"right")),c(2,v=w.GetBlockTexture(f,"top"))});function l(n){U[n?"unshift":"push"](()=>{i=n,c(3,i)})}return[t,p,v,i,l]}class L extends V{constructor(s){super(),q(this,s,C,A,P,{})}}export{L as default};
