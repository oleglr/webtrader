function filterRestrictedSymbols(t){return t.filter(function(t){return!/^(BOOM|CRASH|STP).+/i.test(t.symbol)})}function isTick(t){return-1!==t.indexOf("t")}function isDotType(t){return"dot"===t}function isLineDotType(t){return"linedot"===t}function convertToTimeperiodObject(t){return{intValue:function(){return parseInt(t.toLowerCase().replace("t","").replace("h","").replace("d","").trim())},suffix:function(){return t.toLowerCase().replace(""+this.intValue(),"").trim().charAt(0)},timeInMillis:function(){var t=this;return{t:function(){return 0},m:function(){return 60*t.intValue()*1e3},h:function(){return 60*t.intValue()*60*1e3},d:function(){return 24*t.intValue()*60*60*1e3}}[this.suffix()]()||0},timeInSeconds:function(){return this.timeInMillis()/1e3},humanReadableString:function(){return this.intValue()+" "+{t:"tick",m:"minute(s)",h:"hour(s)",d:"day(s)"}[this.suffix()]}}}function isDataTypeClosePriceOnly(t){return!("candlestick"===t||"ohlc"===t)}function isSmallView(){var t=!1;return window.Modernizr&&(window.Modernizr.mq("all and (max-width: 600px)")||window.Modernizr.mq("all and (max-device-width: 600px)"))&&(t=!0),t}function epochToString(t,e){var n=e&&e.utc?"getUTC":"get",r=new Date(1e3*t);return r[n+"FullYear"]()+"-"+("00"+(r[n+"Month"]()+1)).slice(-2)+"-"+("00"+r[n+"Date"]()).slice(-2)+" "+("00"+r[n+"Hours"]()).slice(-2)+":"+("00"+r[n+"Minutes"]()).slice(-2)+":"+("00"+r[n+"Seconds"]()).slice(-2)}function yearMonthDayToEpoch(t,e){var n=t.split("-"),r=+n[0],i=+n[1],o=+n[2];return e&&e.utc?Date.UTC(r,i-1,o)/1e3:new Date(r,i-1,o).getTime()/1e3}function formatPrice(t,e){if(e=(e||"").toLowerCase().trim(),!1==!!Number(t)&&0!==Number(t))return e?"<span class='symbols "+e+"'>"+t+"</span>":t;var n=t<0?"-":"";t=t&&Math.abs(t);var r=((local_storage.get("currencies_config")||{})[(e||"").toUpperCase()]||{}).fractional_digits||2,i=(window.local_storage.get("i18n")||{value:"en"}).value;return t=new Intl.NumberFormat(i.replace("_","-"),{style:"decimal",minimumFractionDigits:r}).format(t),e&&(t=n+$("<span>",{class:"symbols "+e,text:t})[0].outerHTML),t}function addComma(t,e,n){var r=String(t||0).replace(/,/g,"");return void 0!==e&&(r=(+r).toFixed(e)),n&&(r=parseFloat(+r)),r.toString().replace(/(^|[^\w.])(\d{4,})/g,function(t,e,n){return e+n.replace(/\d(?=(?:\d\d\d)+(?!\d))/g,"$&,")})}function getSymbolPipValue(e){var t=4,n=local_storage.get("active_symbols").find(function(t){return t.symbol===e});if(n){var r=n.pip.toString();t=r.substring(r.indexOf(".")+1).length}return t}function sortAlphaNum(a){"use strict";var u=/[^a-zA-Z]/g,l=/[^0-9]/g;return function(t,e){var n=t[a].replace(u,""),r=e[a].replace(u,"");if(n!==r)return r<n?1:-1;var i=parseInt(t[a].replace(l,""),10),o=parseInt(e[a].replace(l,""),10);return i===o?0:o<i?1:-1}}function toFixed(t,e){return $.isNumeric(t)&&(t=Math.round(t*Math.pow(10,e))/Math.pow(10,e)),t}function uuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})}function setLongTimeout(t,e,n){var r;2147483647<e?(r=setTimeout(function(){setLongTimeout(t,e-2147483647,n)},2147483647),n(r)):(r=setTimeout(t,e),n&&n(r))}String.prototype.replaceAll=function(t,e){return this.split(t).join(e)},String.prototype.format=function(){var n=arguments;return this.replace(/{(\d+)}/g,function(t,e){return void 0!==n[e]?n[e]:t})},"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(t){return 0===this.lastIndexOf(t,0)},String.prototype.endsWith=function(t){return-1!==this.indexOf(t,this.length-t.length)}),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||(Array.prototype.includes=function(t){"use strict";if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");var e=Object(this),n=parseInt(e.length,10)||0;if(0===n)return!1;var r,i,o=parseInt(arguments[1],10)||0;for(0<=o?r=o:(r=n+o)<0&&(r=0);r<n;){if(t===(i=e[r])||t!=t&&i!=i)return!0;r++}return!1});var is_beta=function(){var t=-1!==window.location.href.indexOf("/beta")||-1!==window.location.href.indexOf("localhost");return function(){return t}}(),local_storage={get:function(t){t="_webtrader_"+t+(is_beta()?"_beta":"_live");var e=localStorage.getItem(t);return e&&JSON.parse(e)},set:function(t,e){return t="_webtrader_"+t+(is_beta()?"_beta":"_live"),localStorage.setItem(t,JSON.stringify(e))},remove:function(t){return t="_webtrader_"+t+(is_beta()?"_beta":"_live"),localStorage.removeItem(t)}};function getSupportedLanguages(){return[{value:"en",name:"English"},{value:"de",name:"Deutsch"},{value:"es",name:"Español"},{value:"fr",name:"Français"},{value:"it",name:"Italiano"},{value:"pl",name:"Polish"},{value:"pt",name:"Português"},{value:"ru",name:"Русский"},{value:"th",name:"Thai"},{value:"vi",name:"Tiếng Việt"},{value:"zh_cn",name:"简体中文"},{value:"zh_tw",name:"繁體中文"}]}function isLangSupported(e){if(!e)return!1;var t=getSupportedLanguages(),n=!1;return t.map(function(t){t.value===e&&(n=!0)}),"ach"===e&&is_beta()&&(n=!0),n}function setLanguage(t){if(!t)return!1;isLangSupported(t=t.trim().toLowerCase())?local_storage.set("i18n",{value:t}):local_storage.set("i18n",{value:"en"})}function clearUrlQuerystring(t){if(t){var e=new URL(t);e.search="",window.history.pushState({path:e.href},"",e.href)}}function loginids(){return local_storage.get("authorize").account_list.map(function(t){return{id:t.loginid,is_real:0==t.is_virtual,is_disabled:1==t.is_disabled,is_mf:/MF/gi.test(t.loginid),is_mlt:/MLT/gi.test(t.loginid),is_mx:/MX/gi.test(t.loginid),is_cr:/CR/gi.test(t.loginid)}})}function oAuthLoginIds(){var e=local_storage.get("currencies_config")||{};return(local_storage.get("oauth")||[]).map(function(t){return{id:t.id,is_real:!t.is_virtual,is_disabled:!1,is_mf:/MF/gi.test(t.id),is_mlt:/MLT/gi.test(t.id),is_mx:/MX/gi.test(t.id),is_cr:/CR/gi.test(t.id),currency:t.currency,type:e[t.currency]?e[t.currency].type:""}})}function setupi18nTranslation(i){var t=Object.keys(i).filter(function(t){return""!==t&&" "!==t}),e=(t=t.sort(function(t,e){return e.length-t.length})).map(function(t){return t.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")});e[0]=/[\?\.]$/.test(e[0])?e[0]+"|":e[0]+"\\b|";function n(t,e,n,r){return i[e]&&i[e][1]||e}var r=new RegExp("\\b("+e.reduce(function(t,e){return/[\?\.]$/.test(e)?t+e+"|":t+e+"\\b|"})+")","g");function o(t){if(!t.className||!t.className.includes("no-translation")){var e,n=t.childNodes?t.childNodes:t,r=n.length;for(e=0;e<r;e++)3==n[e].nodeType&&n[e].textContent&&(n[e].textContent=n[e].textContent.i18n()),1==n[e].nodeType&&(n[e].getAttribute("data-balloon")&&n[e].setAttribute("data-balloon",n[e].getAttribute("data-balloon").i18n()),o(n[e]))}}String.prototype.i18n=function(){return this.replace(r,n)},$.fn.i18n=function(){return o(this),this},o(document.body)}function getAppURL(){return window.location.href.split("/v")[0]}function downloadFileInBrowser(t,e,n){var r=new Blob([n],{type:e});if(navigator.msSaveBlob)navigator.msSaveBlob(r,t);else{var i=document.createElement("a");if(void 0!==i.download){var o=URL.createObjectURL(r);i.setAttribute("href",o),i.setAttribute("download",t),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)}}}function guessDigits(t){var r=0;return(t||[]).forEach(function(t){var e=(t+"").split(".")||[];if(1<e.length){var n=e[1].length;r<n&&(r=n)}}),r||4}function getCurrencyDetail(t,e){var n=(e||local_storage.get("currency")||"").toUpperCase();return((local_storage.get("currencies_config")||{})[n]||{})[t]}var currencyFractionalDigits=function(){return getCurrencyDetail("fractional_digits")},isCryptoCurrency=function(t){return"crypto"===getCurrencyDetail("type",t)};function isVirtual(){return!!(local_storage.get("authorize")||"").is_virtual}function getBinaryUrl(t){var e=new URL(window.location.href).hostname,n=(local_storage.get("i18n")||{value:"en"}).value;return"https://binary"+(e.includes("binary.me")?".me":".com")+"/"+n+"/"+t}