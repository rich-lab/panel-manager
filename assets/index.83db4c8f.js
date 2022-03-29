var I=Object.defineProperty,P=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var R=(a,s,n)=>s in a?I(a,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[s]=n,k=(a,s)=>{for(var n in s||(s={}))z.call(s,n)&&R(a,n,s[n]);if(A)for(var n of A(s))T.call(s,n)&&R(a,n,s[n]);return a},w=(a,s)=>P(a,_(s));var v=(a,s)=>{var n={};for(var t in a)z.call(a,t)&&s.indexOf(t)<0&&(n[t]=a[t]);if(a!=null&&A)for(var t of A(a))s.indexOf(t)<0&&T.call(a,t)&&(n[t]=a[t]);return n};import{R as p,a as $,b as M}from"./vendor.cb2082f2.js";const N=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}};N();const O=`<h1>A demo of <code>panel-manager</code></h1>
<p><code>panel-manager</code> is React Component build for manage your panels. <code>re-resizable</code> is under the hood.</p>
<h2>Feature</h2>
<ul>
<li>create panels declartive</li>
<li>auto generate border</li>
<li>memorize panel size</li>
</ul>
<h2>Install</h2>
<pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> panel-manager --save
</code></pre>
<pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> <span class="token function">add</span> panel-manager
</code></pre>
<h2>Usage</h2>
<h3>1. Imagine your panels prototyping</h3>
<p>You can draw your panel prototyping on the paper first, our just imagine it in your head.</p>
<details>
  <summary>demonstrate for prototyping image</summary>
  <image alt="first step" src="https://gw.alipayobjects.com/mdn/rms_24f06c/afts/img/A*7BdxQoZFjwcAAAAAAAAAAAAAARQnAQ">
  </image>
</details>
<h3>2. Named them like <em>T(top)</em>, <em>L(left)</em>, <em>B(bottom)</em>, <em>R(right)</em></h3>
<p><strong>\u26A0\uFE0F\uFE0F Important Note</strong>: Because of the print order: Left, Right, Top, Bottom. You should always make L(R) first.It means you should split panels in the horizontal direction,and then in the vertical direction.</p>
<details>
  <summary>demonstrate for name panel</summary>
  <image alt="second step" src="https://gw.alipayobjects.com/mdn/rms_24f06c/afts/img/A*npNYTLsE54UAAAAAAAAAAAAAARQnAQ">
  </image>
</details>
<h3>3. Nest name</h3>
<p>If panels are nest, Named them like <em>TL(top left)</em>, <em>TLB(top left bottom, means the panel at the top left counter)</em>
remember the <em>T</em> and <em>L</em>  alway at the front of the name.</p>
<details>
  <summary>demonstrate for name nest panels</summary>
  <image alt="third step" src="https://gw.alipayobjects.com/mdn/rms_24f06c/afts/img/A*xaaSQbZuEG4AAAAAAAAAAAAAARQnAQ">
  </image>
</details>
<h3>4. create config</h3>
<p>In this example, we make <strong>R</strong>, <strong>RT</strong> and <strong>LTT</strong> as a <code>&lt;Resizable /&gt;</code> component.</p>
<pre class="language-tsx"><code class="language-tsx"><span class="token comment">// panel-config.ts</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> IPanelConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'panel-manager'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> config<span class="token operator">:</span> IPanelConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">LTT</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    component<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">I'm LTT panel!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
    resizable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// make LTT resizable,</span>
    <span class="token comment">// same as Resizable props, </span>
    <span class="token comment">// but panel-manage default set enable and size(if you enable cache prop)</span>
    resizeConfig<span class="token operator">:</span> <span class="token punctuation">{</span> 
      defaultSize<span class="token operator">:</span> <span class="token punctuation">{</span>
        height<span class="token operator">:</span> <span class="token string">'100px'</span><span class="token punctuation">,</span>
        width<span class="token operator">:</span> <span class="token string">'auto'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token constant">R</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// in this example, R panel handles RT and RB panel, and R doesn't have other content</span>
    <span class="token comment">// so we shouldn't set component field.</span>
    resizable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// make R resizable,</span>
    resizeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
      defaultSize<span class="token operator">:</span> <span class="token punctuation">{</span>
        height<span class="token operator">:</span> <span class="token string">'100%'</span><span class="token punctuation">,</span>
        width<span class="token operator">:</span> <span class="token string">'700px'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token constant">RT</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    component<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">I'm RT panel!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
    resizable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    resizableConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
      defaultSize<span class="token operator">:</span> <span class="token punctuation">{</span>
        height<span class="token operator">:</span> <span class="token string">'100px'</span><span class="token punctuation">,</span>
        width<span class="token operator">:</span> <span class="token string">'auto'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// other un-resizable panel content</span>
  <span class="token constant">LTR</span><span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">I'm LTR panel!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
  <span class="token constant">RB</span><span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">I'm RB panel!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
  <span class="token constant">LB</span><span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">I'm LB panel!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> 

<span class="token keyword">export</span> <span class="token keyword">default</span> config<span class="token punctuation">;</span>
</code></pre>
<h3>5. use the config</h3>
<pre class="language-tsx"><code class="language-tsx"><span class="token comment">// App.tsx</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PanelManager <span class="token keyword">from</span> <span class="token string">'panel-manager'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> panelConfig <span class="token keyword">from</span> <span class="token string">'./panel-config'</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Note that you MUST set PanelManger's Parent Component size.</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> height<span class="token operator">:</span> <span class="token string">'100vh'</span><span class="token punctuation">,</span> width<span class="token operator">:</span> <span class="token string">'100vw'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">PanelManager</span></span> <span class="token attr-name">panelConfig</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>config<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre>
<h2>Motivation</h2>
<p>When i was building an online editor, i tried to use the npm package <code>re-resizable</code> to create my panels. Like menu, hierarchy, toolbar, etc.
But when the scene becomes complex, it's hard to manage and code when you should create more <code>Resizable</code> component to handle every panel.
So i create this component which gives you an easy way to manage these panels.</p>
`;const L={R:"left",L:"right",T:"bottom",B:"top"},j={width:"100%",height:"100%"},b="PANEL_MANAGER_CACHE_SIZE",H=(a,s,n)=>{if(a==="L"||a==="R"){const t=s.indexOf("T"),e=s.indexOf("B");if(t>-1)throw new Error(`Parse panel faild. The ${n+a} panel is contradict with panel ${n}T.`);if(e>-1)throw new Error(`Parse panel faild. The ${n+a} panel is contradict with panel ${n}B.`)}if(a==="T"||a==="B"){const t=s.indexOf("L"),e=s.indexOf("R");if(t>-1)throw new Error(`Parse panel faild. The ${n+a} panel is contradict with panel ${n}L.`);if(e>-1)throw new Error(`Parse panel faild. The ${n+a} panel is contradict with panel ${n}R.`)}},Q=a=>a.join("")==="BT"?["T","B"]:a.join("")==="RL"?["L","R"]:a,W=(a,s,n)=>{if(n.disableCache||!localStorage.getItem(n.name||b))return a;try{const e=JSON.parse(localStorage.getItem(n.name||b))[s];return k(k({},a),e)}catch{return a}},F=({panelPos:a,direction:s,cb:n,cacheKey:t})=>(e,o,l)=>{const d=l.getBoundingClientRect()[s],m={[a]:{[s]:`${d}px`}},c=JSON.parse(localStorage.getItem(t||b)),i=k(k({},c),m);localStorage.setItem(t||b,JSON.stringify(i)),n&&n()},D=(a,s={})=>function n(t,e=""){var u,d;if(!t)return null;let o=Object.keys(t);o=Q(o);const l=[];for(let m=0;m<o.length;m+=1){const c=o[m],i=`${e}${c}`,f={"data-panel-name":i,"data-panel-type":c,"data-panel-resizable":!1},x=a[`${i}T`]||a[`${i}B`];H(c,o,e);const r=a[i];let h=null;if(!r)h=p.createElement("div",k({style:x?{flexDirection:"column"}:{},key:`rootPanel-${i}`},f),n(t[c],e+c));else if(p.isValidElement(r))h=p.createElement("div",k({className:"panel-content-container",key:`rootPanel-${i}`},f),r,n(t[c],e+c));else if(r)if(r.resizable){const S={[L[c]]:!0},B={[L[c]]:`panelManager${c}Handler`};f["data-panel-resizable"]=!0;const C=y=>y==="L"||y==="R"?"width":y==="T"||y==="B"?"height":"";h=p.createElement($,w(k(w(k({},f),{handleClasses:B}),r.resizeConfig),{defaultSize:W((u=r.resizeConfig)==null?void 0:u.defaultSize,i,s),enable:S,key:`rootPanel-${i}`,style:x?{flexDirection:"column"}:{},onResizeStop:F({panelPos:i,direction:C(c),cb:(d=r.resizeConfig)==null?void 0:d.onResizeStop,cacheKey:s.name}),className:`${s.autoBorder?"resizable-default-border":""}`}),r.component&&p.createElement("div",{className:"panel-content-container"},r.component),n(t[c],e+c))}else h=p.createElement("div",{style:x?{flexDirection:"column"}:{},key:`rootPanel-${i}`,id:i,"data-panel-type":c,"data-panel-resizable":!1},r.component&&p.createElement("div",{className:"panel-content-container"},r.component),n(t[c],e+c));l.push(h)}return l},E=(a,s)=>{let n=Object.keys(a);const t={};n=n.sort((l,u)=>l.length>u.length?1:l.length<u.length?-1:0),n.forEach(l=>{let u=t;for(let d=0;d<l.length;d+=1){const m=l[d];u[m]||(u[m]={}),u=u[m]}});const e=D(a,s);return console.log("panelTree",t),e(t,"")};class G extends p.PureComponent{constructor(s){super(s);const o=this.props,{panelConfig:n}=o,t=v(o,["panelConfig"]),e=E(n,t);this.state={panels:e}}UNSAFE_componentWillReceiveProps(s){const n=E(s.panelConfig,s);this.setState({panels:n})}render(){const{children:s,rootSize:n}=this.props,{panels:t}=this.state;if(!t)return null;let e="row";return t[0].props["data-panel-type"]==="T"&&(e="column"),p.createElement(p.Fragment,null,s,p.createElement("div",{style:w(k(k({},j),n||{}),{display:"flex",flexDirection:e})},t))}}const g={LTL:{width:"420px",height:"auto",minWidth:"380px"},R:{width:"600px",height:"auto"},LB:{width:"auto",height:"300px",maxHeight:"600px"}},U={R:{component:p.createElement("div",{className:"markdown-body"},p.createElement("div",{dangerouslySetInnerHTML:{__html:O},style:{padding:"0 10px",width:"100%"}})),resizable:!0,resizeConfig:{defaultSize:g.R,minWidth:g.R.width}},LB:{component:p.createElement("div",{className:"example-panel-content name-content"},p.createElement("span",null,"LB")),resizable:!0,resizeConfig:{defaultSize:g.LB,minHeight:g.LB.height,maxHeight:g.LB.maxHeight}},LTL:{component:p.createElement("div",{className:"example-panel-content name-content"},"Panel"),resizable:!0,resizeConfig:{defaultSize:g.LTL,maxWidth:g.LTL.width,minWidth:g.LTL.minWidth}},LTR:p.createElement("div",{className:"example-panel-content linear-wipe name-content"},"Manager")};M.render(p.createElement(p.StrictMode,null,p.createElement("div",{style:{height:"100vh",width:"100vw"}},p.createElement(G,{panelConfig:U,disableCache:!0,autoBorder:!0}))),document.getElementById("root"));
