(function(){var window=this;var f=this,h=function(b){return"string"==typeof b},l=function(){},p=function(b){var a=typeof b;if("object"==a)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return a;var c=Object.prototype.toString.call(b);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==a&&"undefined"==typeof b.call)return"object";return a};var aa=function(b,a){for(var c=b.length,e=h(b)?b.split(""):b,d=0;d<c;d++)d in e&&a.call(void 0,e[d],d,b)},ba=function(b){return Array.prototype.concat.apply([],arguments)};var x=function(){this.a="";this.b=u};x.prototype.m=!0;x.prototype.g=function(){return this.a};var y=function(b){return b instanceof x&&b.constructor===x&&b.b===u?b.a:"type_error:TrustedResourceUrl"},u={};var A=function(){this.h="";this.v=z};A.prototype.m=!0;A.prototype.g=function(){return this.h};var ca=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,z={},B=function(b){var a=new A;a.h=b;return a};B("about:blank");var C;a:{var D=f.navigator;if(D){var E=D.userAgent;if(E){C=E;break a}}C=""};var da=function(b){var a=!1,c;return function(){a||(c=b(),a=!0);return c}};var fa=function(b){ea();var a=new x;a.a=b;return a},ea=l;var F=function(b){F[" "](b);return b};F[" "]=l;var ha=/^[\w+/_-]+[=]{0,2}$/;var ia=function(){if(!f.crypto)return Math.random();try{var b=new Uint32Array(1);f.crypto.getRandomValues(b);return b[0]/65536/65536}catch(a){return Math.random()}},ja=da(function(){return-1!=C.indexOf("Google Web Preview")||1E-4>Math.random()}),ka=function(){try{a:{var b=f.document.querySelector("script[nonce]");if(b){var a=b.nonce||b.getAttribute("nonce");if(a&&ha.test(a)){var c=a;break a}}c=void 0}return c}catch(e){}};var G=function(){return f.googletag||(f.googletag={})};var H={1:"pagead2.googlesyndication.com",2:"pubads.g.doubleclick.net",3:"securepubads.g.doubleclick.net",173:"pubads.g.doubleclick.net",174:"securepubads.g.doubleclick.net",7:.02,13:1500,23:.001,24:200,27:.01,29:.01,33:"pagead2.googlesyndication.com",37:.01,38:.001,47:0,53:"",58:1,65:.01,66:1E-5,67:0,68:0,69:1,71:.05,162:0,163:"",76:"",77:.001,78:0,81:.001,83:0,85:0,89:1,90:0,91:0,96:1,99:.01,103:.01,104:"/pagead/js/rum.js",105:0,106:"1-0-17",107:"1-0-17",113:1,114:1,115:0,116:0,117:1,118:1,120:1,124:1,208:.05,169:0,207:.01,125:0,127:0,129:.05,131:"",156:0,133:0,134:.01,135:.1,137:.01,167:1,138:"",143:.005,168:1E-4,144:.001,187:.01,141:1,157:.95,158:.001,150:"",153:.95,179:.01,170:!1,211:!1,183:0,196:.001,197:.001,152:[],171:.5,172:null,175:"21061661,21061662,21061663,21061664,21061665,21061666,21061667,21061668,22316437,22316438",178:.05,182:1E3,188:0,189:.01,191:1512514930353,192:21510956201635,190:0xa781a7496a3,194:.95,199:0,180:null,209:[],210:{},195:.5,198:1,200:.25,201:0,202:"",203:.01,206:0,216:.01,213:.95,214:.05,215:0,217:0};H[6]=function(b,a){try{for(var c=null;c!=b;c=b,b=b.parent)switch(b.location.protocol){case "https:":return!0;case "file:":return!!a;case "http:":return!1}}catch(e){}return!0}(window);H[49]=(new Date).getTime();H[36]=/^true$/.test("false");H[46]=/^true$/.test("false");H[148]=/^true$/.test("false");var I;a:{if(/^(-?[0-9.]{1,30})$/.test("{{MOD}}")){var la=Number("{{MOD}}");if(!isNaN(la)){I=la;break a}}I=-1}H[204]=I;H[205]=.01;var J=function(){var b={},a;for(a in H)b[a]=H[a];this.a=b};J.prototype.get=function(b){return this.a[b]};J.prototype.set=function(b,a){this.a[b]=a};J.b=void 0;J.a=function(){return J.b?J.b:J.b=new J};var ma=["21060621","21061773","21061774"],na=["21061212","21061213","21061214","21061277"],oa=J.a().a,pa=G(),qa=pa._vars_,K;for(K in qa)oa[K]=qa[K];pa._vars_=oa;var ra=function(){return"189"},sa=G();sa.hasOwnProperty("getVersion")||(sa.getVersion=ra);var ta=function(b,a){var c=void 0===c?{}:c;this.error=b;this.context=a.context;this.line=a.line||-1;this.msg=a.message||"";this.file=a.file||"";this.id=a.id||"jserror";this.meta=c};var L=null;var ua=da(function(){var b=f.navigator&&f.navigator.userAgent||"";b=b.toLowerCase();return-1!=b.indexOf("firefox/")||-1!=b.indexOf("chrome/")||-1!=b.indexOf("opr/")}),M=function(b,a,c){var e="script";e=void 0===e?"":e;var d=b.createElement("link");d.rel="preload";a instanceof x?a=y(a):a instanceof A?a=a instanceof A&&a.constructor===A&&a.v===z?a.h:"type_error:SafeUrl":(a instanceof A||(a=a.m?a.g():String(a),ca.test(a)||(a="about:invalid#zClosurez"),a=B(a)),a=a.g());d.href=a;e&&(d.as=e);c&&(d.nonce=c);if(b=b.getElementsByTagName("head")[0])try{b.appendChild(d)}catch(k){}};var va=/^\.google\.(com?\.)?[a-z]{2,3}$/,wa=/\.(cn|com\.bi|do|sl|ba|by|ma)$/,N=function(b){return va.test(b)&&!wa.test(b)},xa=function(b){return b.replace(/[\W]/g,function(b){return"&#"+b.charCodeAt()+";"})},O=f,ya=function(b,a){b="https://"+("adservice"+a+"/adsid/integrator."+b);a=["domain="+encodeURIComponent(f.location.hostname)];P[3]>=+new Date&&a.push("adsid="+encodeURIComponent(P[1]));return b+"?"+a.join("&")},P,Q,R=function(){O=f;P=O.googleToken=O.googleToken||{};var b=+new Date;P[1]&&P[3]>b&&0<P[2]||(P[1]="",P[2]=-1,P[3]=-1,P[4]="",P[6]="");Q=O.googleIMState=O.googleIMState||{};N(Q[1])||(Q[1]=".google.com");"array"==p(Q[5])||(Q[5]=[]);"boolean"==typeof Q[6]||(Q[6]=!1);"array"==p(Q[7])||(Q[7]=[]);"number"==typeof Q[8]||(Q[8]=0)},za=function(b){try{b()}catch(a){f.setTimeout(function(){throw a;},0)}},Ba=function(b){"complete"==f.document.readyState||"loaded"==f.document.readyState||f.document.currentScript&&f.document.currentScript.async?Aa(3):b()},Ca=0,S={c:function(){return 0<Q[8]},i:function(){Q[8]++},o:function(){0<Q[8]&&Q[8]--},s:function(){Q[8]=0},f:function(){},u:function(){return!1},l:function(){return Q[5]},j:za},T={c:function(){return Q[6]},i:function(){Q[6]=!0},o:function(){Q[6]=!1},s:function(){Q[6]=!1},f:function(){},u:function(){return".google.com"!=Q[1]&&2<++Ca},l:function(){return Q[7]},j:function(b){Ba(function(){za(b)})}},Aa=function(b){if(1E-5>Math.random()){f.google_image_requests||(f.google_image_requests=[]);var a=f.document.createElement("img");a.src="https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err="+b;f.google_image_requests.push(a)}};S.f=function(){if(!S.c()){var b=f.document,a=function(a){var c=ya("js",a),d=ka();M(b,c,d);a=b.createElement("script");a.type="text/javascript";d&&(a.nonce=d);a.onerror=function(){return f.processGoogleToken({},2)};c=fa(c);a.src=y(c);try{(b.head||b.body||b.documentElement).appendChild(a),S.i()}catch(m){}},c=Q[1];a(c);".google.com"!=c&&a(".google.com");a={};var e=(a.newToken="FBT",a);f.setTimeout(function(){return f.processGoogleToken(e,1)},1E3)}};T.f=function(){if(!T.c()){var b=f.document,a=ya("sync.js",Q[1]);M(b,a);a=xa(a);var c=F("script"),e="",d=ka();d&&(e='nonce="'+xa(d)+'"');var k="<"+c+' src="'+a+'" '+e+"></"+c+">"+("<"+c+" "+e+'>processGoogleTokenSync({"newToken":"FBS"},5);</'+c+">");Ba(function(){b.write(k);T.i()})}};var Da=function(b){R();P[3]>=+new Date&&P[2]>=+new Date||b.f()},Fa=function(){f.processGoogleToken=f.processGoogleToken||function(b,a){return Ea(S,b,a)};Da(S)},Ga=function(){f.processGoogleTokenSync=f.processGoogleTokenSync||function(b,a){return Ea(T,b,a)};Da(T)},Ea=function(b,a,c){a=void 0===a?{}:a;c=void 0===c?0:c;var e=a.newToken||"",d="NT"==e,k=parseInt(a.freshLifetimeSecs||"",10),g=parseInt(a.validLifetimeSecs||"",10);d&&!g&&(g=3600);var m=a["1p_jar"]||"";a=a.pucrd||"";R();1==c?b.s():b.o();if(!e&&b.u())N(".google.com")&&(Q[1]=".google.com"),b.f();else{var n=O.googleToken=O.googleToken||{},r=0==c&&e&&h(e)&&!d&&"number"==typeof k&&0<k&&"number"==typeof g&&0<g&&h(m);d=d&&!b.c()&&(!(P[3]>=+new Date)||"NT"==P[1]);var v=!(P[3]>=+new Date)&&0!=c;if(r||d||v)d=+new Date,k=d+1E3*k,g=d+1E3*g,Aa(c),n[5]=c,n[1]=e,n[2]=k,n[3]=g,n[4]=m,n[6]=a,R();if(r||!b.c()){c=b.l();for(e=0;e<c.length;e++)b.j(c[e]);c.length=0}}};var Ha=function(){this.a=null},Ia=function(b,a){b.a=a};Ha.prototype.b=function(b,a,c,e,d){if(Math.random()>(void 0===c?.01:c))return!1;a.error&&a.meta&&a.id||(a=new ta(a,{context:b,id:void 0===d?"gpt_exception":d}));if(e||this.a)a.meta={},this.a&&this.a(a.meta),e&&e(a.meta);f.google_js_errors=f.google_js_errors||[];f.google_js_errors.push(a);f.error_rep_loaded||(a=f.document,b=a.createElement("script"),c=fa(f.location.protocol+"//pagead2.googlesyndication.com/pagead/js/err_rep.js"),b.src=y(c),(a=a.getElementsByTagName("script")[0])&&a.parentNode&&a.parentNode.insertBefore(b,a),f.error_rep_loaded=!0);return!1};var Ja=function(b,a){var c=void 0===c?b.b:c;try{a()}catch(e){if(!c.call(b,420,e,.01,void 0,"gpt_exception"))throw e;}};var Ka=function(b){if(!b.google_ltobserver){var a=new b.PerformanceObserver(function(a){var c=b.google_lt_queue=b.google_lt_queue||[];aa(a.getEntries(),function(b){return c.push(b)})});a.observe({entryTypes:["longtask"]});b.google_ltobserver=a}};var La=[[[2,null,null,[]]]];var Ma={3:[[10,[[21060132],[21060133,[[2,null,null,[1]]]]]],[10,[[21061712],[21061713]]]]};F("partner.googleadservices.com");var U=F("www.googletagservices.com"),V=!1,W=!1,X="",Y="",Na=J.a().get(46)&&!J.a().get(6);X=Na?"http:":"https:";Y=J.a().get(Na?2:3);var Oa=function(b){if(b=b.scripts)for(var a=0;a<b.length;a++){var c=b[a];if(-1<c.src.indexOf(U+"/tag/js/gpt"))return c}return null},Z=function(b,a){if(null===L){L="";try{var c="";try{c=f.top.location.hash}catch(d){c=f.location.hash}if(c){var e=c.match(/\bdeid=([\d,]+)/);L=e?e[1]:""}}catch(d){}}if(c=(c=L)&&c.match(new RegExp("\\b("+b.join("|")+")\\b")))b=c[0];else if(a)a:{a=b.length*a;if(!ja()&&(c=Math.random(),c<a)){c=ia();b=b[Math.floor(c*b.length)];break a}b=null}else b=null;return b};(function(b){var a=new Ha;Ia(a,function(b){b.methodId=420});Ja(a,function(){var a=b,e=G(),d=e.fifWin||window;a=a||d.document;var k=[],g=G();g.hasOwnProperty("cmd")||(g.cmd=k);if(e.evalScripts)e.evalScripts();else{k=J.a();(g=Z(na,k.get(178)))&&k.get(152).push(g);switch(g){case "21061213":W=!0;break;case "21061214":V=!0;break;case "21061277":V=W=!0}k=J.a().get(138)||Z(ma,J.a().get(137))||Z(["21061149"],J.a().get(167));g=a;var m=Z(["21061590","21061591"],.001),n=J.a();n.set(209,La);n.set(210,Ma);m&&("21061591"==m?(n.set(173,U),n.set(174,U)):n.set(163,m),n.get(152).push(m));-1!=C.indexOf("Mobile")||J.a().set(194,0);if(m=n.get(150))R(),N(m)&&(Q[1]=m);k&&n.set(138,k);n.set(172,g.currentScript||Oa(g));d.PerformanceObserver&&d.PerformanceLongTaskTiming&&Ka(d);g=d;g=void 0===g?f:g;if(g=(g=g.performance)&&g.now?g.now():null)g={label:"1",type:9,value:g},d=d.google_js_reporting_queue=d.google_js_reporting_queue||[],1024>d.length&&d.push(g);d=J.a();if(g=d.get(76))var r=g;else{m=["188","189"];g=m[0]||"189";n="";if(d.get(131))r="189";else if(1<m.length){var v=["21061789","21061790"],t=[""];if(1>=t.length||v.length!=t.length)t=[];var w=Z(ba(v,t),.1);if(w){d.set(53,w);b:if(h(t))var q=h(w)&&1==w.length?t.indexOf(w,0):-1;else{for(q=0;q<t.length;q++)if(q in t&&t[q]===w)break b;q=-1}q=0<=q;d.set(170,q);q&&(v=t);t=v[0];if(w!=t)for(q=1;q<v.length;++q)if(w==v[q]){r=m[q];break}if(w==t||parseInt(r,10)<parseInt(g,10))m=m[v.length-1],n="?v="+m,d.set(163,m)}}g=X+"//"+Y+"/gpt/pubads_impl_"+(r||g)+".js"+n;J.a().set(76,g);r=g}d=a.currentScript;if(!("complete"==a.readyState||"loaded"==a.readyState||d&&d.async)){d="gpt-impl-"+Math.random();try{g='<script id="'+d+'" src="'+r+'">\x3c/script>',V&&ua()&&(g+='<link rel="preconnect" href="'+X+"//"+Y+'">'),a.write(g)}catch(Pa){}a.getElementById(d)&&(e._loadStarted_=!0,"21061773"!=k&&"21061149"!=k||Ga())}e._loadStarted_||("21061773"!=k&&"21061149"!=k||Fa(),W&&M(a,r),k=a.createElement("script"),k.src=r,k.async=!0,r=a.head||a.body||a.documentElement,r.appendChild(k),V&&ua()&&(a=a.createElement("link"),a.rel="preconnect",a.href=X+"//"+Y,r.appendChild(a)),e._loadStarted_=!0)}})})();}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)
