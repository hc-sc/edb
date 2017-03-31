/**
 * Copyright (c) 2011-2013 Fabien Cazenave, Mozilla.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
/*
  Additional modifications for PDF.js project:
    - Disables language initialization on page loading;
    - Removes consoleWarn and consoleLog and use console.log/warn directly.
    - Removes window._ assignment.
    - Remove compatibility code for OldIE.
*/
/*jshint browser: true, devel: true, es5: true, globalstrict: true */
"use strict";document.webL10n=function(a,b,c){// read-only
/**
   * DOM helpers for the so-called "HTML API".
   *
   * These functions are written for modern browsers. For old versions of IE,
   * they're overridden in the 'startup' section at the end of this file.
   */
function d(){return b.querySelectorAll('link[type="application/l10n"]')}function e(){var a=b.querySelector('script[type="application/l10n"]');
// TODO: support multiple and external JSON dictionaries
return a?JSON.parse(a.innerHTML):null}function f(a){return a?a.querySelectorAll("*[data-l10n-id]"):[]}function g(a){if(!a)return{};var b=a.getAttribute("data-l10n-id"),c=a.getAttribute("data-l10n-args"),d={};if(c)try{d=JSON.parse(c)}catch(e){console.warn("could not parse arguments for #"+b)}return{id:b,args:d}}function h(a){var c=b.createEvent("Event");c.initEvent("localized",!0,!1),c.language=a,b.dispatchEvent(c)}function i(a,b,c){b=b||function(a){},c=c||function(){console.warn(a+" not found.")};var d=new XMLHttpRequest;d.open("GET",a,z),d.overrideMimeType&&d.overrideMimeType("text/plain; charset=utf-8"),d.onreadystatechange=function(){4==d.readyState&&(200==d.status||0===d.status?b(d.responseText):c())},d.onerror=c,d.ontimeout=c;
// in Firefox OS with the app:// protocol, trying to XHR a non-existing
// URL will raise an exception here -- hence this ugly try...catch.
try{d.send(null)}catch(e){c()}}/**
   * l10n resource parser:
   *  - reads (async XHR) the l10n resource matching `lang';
   *  - imports linked resources (synchronously) when specified;
   *  - parses the text data (fills `gL10nData' and `gTextData');
   *  - triggers success/failure callbacks when done.
   *
   * @param {string} href
   *    URL of the l10n resource to parse.
   *
   * @param {string} lang
   *    locale (language) to parse. Must be a lowercase string.
   *
   * @param {Function} successCallback
   *    triggered when the l10n resource has been successully parsed.
   *
   * @param {Function} failureCallback
   *    triggered when the an error has occured.
   *
   * @return {void}
   *    uses the following global variables: gL10nData, gTextData, gTextProp.
   */
function j(a,b,c,d){
// handle escaped characters (backslashes) in a string
function e(a){return a.lastIndexOf("\\")<0?a:a.replace(/\\\\/g,"\\").replace(/\\n/g,"\n").replace(/\\r/g,"\r").replace(/\\t/g,"	").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\{/g,"{").replace(/\\}/g,"}").replace(/\\"/g,'"').replace(/\\'/g,"'")}
// parse *.properties text data into an l10n dictionary
// If gAsyncResourceLoading is false, then the callback will be called
// synchronously. Otherwise it is called asynchronously.
function f(a,c){// TODO: escape EOLs with '\'
// parse the *.properties file into an associative array
function d(a,c,d){function i(){
// Use infinite loop instead of recursion to avoid reaching the
// maximum recursion limit for content with many lines.
for(;;){if(!o.length)return void d();var a=o.shift();
// comment or blank line?
if(!k.test(a)){
// the extended syntax supports [lang] sections and @import rules
if(c){if(s=l.exec(a)){// section start?
// RFC 4646, section 4.4, "All comparisons MUST be performed
// in a case-insensitive manner."
p=s[1].toLowerCase(),r="*"!==p&&p!==b&&p!==q;continue}if(r)continue;if(s=m.exec(a))// @import rule?
return void f(g+s[1],i)}
// key-value pair
var j=a.match(n);j&&3==j.length&&(h[j[1]]=e(j[2]))}}}var o=a.replace(j,"").split(/[\r\n]+/),p="*",q=b.split("-",1)[0],r=!1,s="";i()}
// import another *.properties file
function f(a,b){i(a,function(a){d(a,!1,b)},null)}var h={},j=/^\s*|\s*$/,k=/^\s*#|^\s*$/,l=/^\s*\[(.*)\]\s*$/,m=/^\s*@import\s+url\((.*)\)\s*$/i,n=/^([^=\s]*)\s*=\s*(.+)$/;
// fill the dictionary
d(a,!0,function(){c(h)})}var g=a.replace(/[^\/]*$/,"")||"./";
// load and parse l10n data (warning: global variables are used here)
i(a,function(a){u+=a,f(a,function(a){for(var b in a){var d,e,f=b.lastIndexOf(".");f>0?(d=b.substring(0,f),e=b.substr(f+1)):(d=b,e=v),t[d]||(t[d]={}),t[d][e]=a[b]}c&&c()})},d)}
// load and parse all resources for the specified locale
function k(a,b){
// load all resource files
function c(a){var b=a.href;
// Note: If |gAsyncResourceLoading| is false, then the following callbacks
// are synchronously called.
this.load=function(a,c){j(b,a,c,function(){console.warn(b+" not found."),
// lang not found, used default resource instead
console.warn('"'+a+'" resource not found'),w="",c()})}}
// RFC 4646, section 2.1 states that language tags have to be treated as
// case-insensitive. Convert to lowercase for case-insensitive comparisons.
a&&(a=a.toLowerCase()),b=b||function(){},l(),w=a;
// check all <link type="application/l10n" href="..." /> nodes
// and load the resource files
var f=d(),g=f.length;if(0===g){
// we might have a pre-compiled dictionary instead
var i=e();if(i&&i.locales&&i.default_locale){if(console.log("using the embedded JSON directory, early way out"),t=i.locales[a],!t){var k=i.default_locale.toLowerCase();for(var m in i.locales){if(m=m.toLowerCase(),m===a){t=i.locales[a];break}m===k&&(t=i.locales[k])}}b()}else console.log("no resource to load, early way out");return
// early way out
h(a),void(y="complete")}
// start the callback when all resources are loaded
var n=null,o=0;n=function(){o++,o>=g&&(b(),h(a),y="complete")};for(var p=0;g>p;p++){var q=new c(f[p]);q.load(a,n)}}
// clear all l10n data
function l(){t={},u="",w=""}/**
   * Get rules for plural forms (shared with JetPack), see:
   * http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
   * https://github.com/mozilla/addon-sdk/blob/master/python-lib/plural-rules-generator.p
   *
   * @param {string} lang
   *    locale (language) used.
   *
   * @return {Function}
   *    returns a function that gives the plural form name for a given integer:
   *       var fun = getPluralRules('en');
   *       fun(1)    -> 'one'
   *       fun(0)    -> 'other'
   *       fun(1000) -> 'other'.
   */
function m(a){
// utility functions for plural rules methods
function b(a,b){return-1!==b.indexOf(a)}function c(a,b,c){return a>=b&&c>=a}var d={af:3,ak:4,am:4,ar:1,asa:3,az:0,be:11,bem:3,bez:3,bg:3,bh:4,bm:0,bn:3,bo:0,br:20,brx:3,bs:11,ca:3,cgg:3,chr:3,cs:12,cy:17,da:3,de:3,dv:3,dz:0,ee:3,el:3,en:3,eo:3,es:3,et:3,eu:3,fa:0,ff:5,fi:3,fil:4,fo:3,fr:5,fur:3,fy:3,ga:8,gd:24,gl:3,gsw:3,gu:3,guw:4,gv:23,ha:3,haw:3,he:2,hi:4,hr:11,hu:0,id:0,ig:0,ii:0,is:3,it:3,iu:7,ja:0,jmc:3,jv:0,ka:0,kab:5,kaj:3,kcg:3,kde:0,kea:0,kk:3,kl:3,km:0,kn:0,ko:0,ksb:3,ksh:21,ku:3,kw:7,lag:18,lb:3,lg:3,ln:4,lo:0,lt:10,lv:6,mas:3,mg:4,mk:16,ml:3,mn:3,mo:9,mr:3,ms:0,mt:15,my:0,nah:3,naq:7,nb:3,nd:3,ne:3,nl:3,nn:3,no:3,nr:3,nso:4,ny:3,nyn:3,om:3,or:3,pa:3,pap:3,pl:13,ps:3,pt:3,rm:3,ro:9,rof:3,ru:11,rwk:3,sah:0,saq:3,se:7,seh:3,ses:0,sg:0,sh:11,shi:19,sk:12,sl:14,sma:7,smi:7,smj:7,smn:7,sms:7,sn:3,so:3,sq:3,sr:11,ss:3,ssy:3,st:3,sv:3,sw:3,syr:3,ta:3,te:3,teo:3,th:0,ti:4,tig:3,tk:3,tl:4,tn:3,to:0,tr:0,ts:3,tzm:22,uk:11,ur:3,ve:3,vi:0,vun:3,wa:4,wae:3,wo:0,xh:3,xog:3,yo:0,zh:0,zu:3},e={0:function(a){return"other"},1:function(a){return c(a%100,3,10)?"few":0===a?"zero":c(a%100,11,99)?"many":2==a?"two":1==a?"one":"other"},2:function(a){return 0!==a&&a%10===0?"many":2==a?"two":1==a?"one":"other"},3:function(a){return 1==a?"one":"other"},4:function(a){return c(a,0,1)?"one":"other"},5:function(a){return c(a,0,2)&&2!=a?"one":"other"},6:function(a){return 0===a?"zero":a%10==1&&a%100!=11?"one":"other"},7:function(a){return 2==a?"two":1==a?"one":"other"},8:function(a){return c(a,3,6)?"few":c(a,7,10)?"many":2==a?"two":1==a?"one":"other"},9:function(a){return 0===a||1!=a&&c(a%100,1,19)?"few":1==a?"one":"other"},10:function(a){return c(a%10,2,9)&&!c(a%100,11,19)?"few":a%10!=1||c(a%100,11,19)?"other":"one"},11:function(a){return c(a%10,2,4)&&!c(a%100,12,14)?"few":a%10===0||c(a%10,5,9)||c(a%100,11,14)?"many":a%10==1&&a%100!=11?"one":"other"},12:function(a){return c(a,2,4)?"few":1==a?"one":"other"},13:function(a){return c(a%10,2,4)&&!c(a%100,12,14)?"few":1!=a&&c(a%10,0,1)||c(a%10,5,9)||c(a%100,12,14)?"many":1==a?"one":"other"},14:function(a){return c(a%100,3,4)?"few":a%100==2?"two":a%100==1?"one":"other"},15:function(a){return 0===a||c(a%100,2,10)?"few":c(a%100,11,19)?"many":1==a?"one":"other"},16:function(a){return a%10==1&&11!=a?"one":"other"},17:function(a){return 3==a?"few":0===a?"zero":6==a?"many":2==a?"two":1==a?"one":"other"},18:function(a){return 0===a?"zero":c(a,0,2)&&0!==a&&2!=a?"one":"other"},19:function(a){return c(a,2,10)?"few":c(a,0,1)?"one":"other"},20:function(a){return!c(a%10,3,4)&&a%10!=9||c(a%100,10,19)||c(a%100,70,79)||c(a%100,90,99)?a%1e6===0&&0!==a?"many":a%10!=2||b(a%100,[12,72,92])?a%10!=1||b(a%100,[11,71,91])?"other":"one":"two":"few"},21:function(a){return 0===a?"zero":1==a?"one":"other"},22:function(a){return c(a,0,1)||c(a,11,99)?"one":"other"},23:function(a){return c(a%10,1,2)||a%20===0?"one":"other"},24:function(a){return c(a,3,10)||c(a,13,19)?"few":b(a,[2,12])?"two":b(a,[1,11])?"one":"other"}},f=d[a.replace(/-.*$/,"")];return f in e?e[f]:(console.warn("plural form unknown for ["+a+"]"),function(){return"other"})}/**
   * l10n dictionary functions
   */
// fetch an l10n object, warn if not found, apply `args' if possible
function n(a,b,c){var d=t[a];if(!d){if(console.warn("#"+a+" is undefined."),!c)return null;d=c}/** This is where l10n expressions should be processed.
      * The plan is to support C-style expressions from the l20n project;
      * until then, only two kinds of simple expressions are supported:
      *   {[ index ]} and {{ arguments }}.
      */
var e={};for(var f in d){var g=d[f];g=o(g,b,a,f),g=p(g,b,a),e[f]=g}return e}
// replace {[macros]} with their values
function o(a,b,c,d){var e=/\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/,f=e.exec(a);if(!f||!f.length)return a;
// an index/macro has been found
// Note: at the moment, only one parameter is supported
var g,h=f[1],i=f[2];
// there's no macro parser yet: it has to be defined in gMacros
if(b&&i in b?g=b[i]:i in t&&(g=t[i]),h in x){var j=x[h];a=j(a,g,c,d)}return a}
// replace {{arguments}} with their values
function p(a,b,c){var d=/\{\{\s*(.+?)\s*\}\}/g;return a.replace(d,function(a,d){return b&&d in b?b[d]:d in t?t[d]:(console.log("argument {{"+d+"}} for #"+c+" is undefined."),a)})}
// translate an HTML element
function q(a){var c=g(a);if(c.id){
// get the related l10n object
var d=n(c.id,c.args);if(!d)return void console.warn("#"+c.id+" is undefined.");
// translate element (TODO: security checks?)
if(d[v]){// XXX
if(0===r(a))a[v]=d[v];else{for(var e=a.childNodes,f=!1,h=0,i=e.length;i>h;h++)3===e[h].nodeType&&/\S/.test(e[h].nodeValue)&&(f?e[h].nodeValue="":(e[h].nodeValue=d[v],f=!0));
// if no (non-empty) textNode is found, insert a textNode before the
// first element child.
if(!f){var j=b.createTextNode(d[v]);a.insertBefore(j,a.firstChild)}}delete d[v]}for(var k in d)a[k]=d[k]}}
// webkit browsers don't currently support 'children' on SVG elements...
function r(a){if(a.children)return a.children.length;if("undefined"!=typeof a.childElementCount)return a.childElementCount;for(var b=0,c=0;c<a.childNodes.length;c++)b+=1===a.nodeType?1:0;return b}
// translate an HTML subtree
function s(a){a=a||b.documentElement;for(var c=f(a),d=c.length,e=0;d>e;e++)q(c[e]);
// translate element itself if necessary
q(a)}var t={},u="",v="textContent",w="",x={},y="loading",z=!0;
// pre-defined 'plural' macro
return x.plural=function(a,b,c,d){var e=parseFloat(b);if(isNaN(e))return a;
// TODO: support other properties (l20n still doesn't...)
if(d!=v)return a;
// initialize _pluralRules
x._pluralRules||(x._pluralRules=m(w));var f="["+x._pluralRules(e)+"]";
// try to find a [zero|one|two] key if it's defined
return 0===e&&c+"[zero]"in t?a=t[c+"[zero]"][d]:1==e&&c+"[one]"in t?a=t[c+"[one]"][d]:2==e&&c+"[two]"in t?a=t[c+"[two]"][d]:c+f in t?a=t[c+f][d]:c+"[other]"in t&&(a=t[c+"[other]"][d]),a},{
// get a localized string
get:function(a,b,c){var d=a.lastIndexOf("."),e=v;d>0&&(e=a.substr(d+1),a=a.substring(0,d));var f;c&&(f={},f[e]=c);var g=n(a,b,f);return g&&e in g?g[e]:"{{"+a+"}}"},
// debug
getData:function(){return t},getText:function(){return u},
// get|set the document language
getLanguage:function(){return w},setLanguage:function(a,b){k(a,function(){b&&b(),s()})},
// get the direction (ltr|rtl) of the current language
getDirection:function(){
// http://www.w3.org/International/questions/qa-scripts
// Arabic, Hebrew, Farsi, Pashto, Urdu
var a=["ar","he","fa","ps","ur"],b=w.split("-",1)[0];return a.indexOf(b)>=0?"rtl":"ltr"},
// translate an element or document fragment
translate:s,
// this can be used to prevent race conditions
getReadyState:function(){return y},ready:function(c){c&&("complete"==y||"interactive"==y?a.setTimeout(function(){c()}):b.addEventListener&&b.addEventListener("localized",function d(){b.removeEventListener("localized",d),c()}))}}}(window,document);