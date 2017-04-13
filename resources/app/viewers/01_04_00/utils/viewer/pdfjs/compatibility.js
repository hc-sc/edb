/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals VBArray, PDFJS */
"use strict";
// Initializing PDFJS global object here, it case if we need to change/disable
// some PDF.js features, e.g. range requests
"undefined"==typeof PDFJS&&(("undefined"!=typeof window?window:this).PDFJS={}),
// Checking if the typed arrays are supported
// Support: iOS<6.0 (subarray), IE<10, Android<4.0
function(){function a(a,b){return new c(this.slice(a,b))}function b(a,b){arguments.length<2&&(b=0);for(var c=0,d=a.length;d>c;++c,++b)this[b]=255&a[c]}function c(c){var d,e,f;if("number"==typeof c)for(d=[],e=0;c>e;++e)d[e]=0;else if("slice"in c)d=c.slice(0);else for(d=[],e=0,f=c.length;f>e;++e)d[e]=c[e];return d.subarray=a,d.buffer=d,d.byteLength=d.length,d.set=b,"object"==typeof c&&c.buffer&&(d.buffer=c.buffer),d}
// Support: iOS<6.0
// Support: Android<4.1
// we don't need support for set, byteLength for 32-bit array
// so we can use the TypedArray as well
return"undefined"!=typeof Uint8Array?("undefined"==typeof Uint8Array.prototype.subarray&&(Uint8Array.prototype.subarray=function(a,b){return new Uint8Array(this.slice(a,b))},Float32Array.prototype.subarray=function(a,b){return new Float32Array(this.slice(a,b))}),void("undefined"==typeof Float64Array&&(window.Float64Array=Float32Array))):(window.Uint8Array=c,window.Int8Array=c,window.Uint32Array=c,window.Int32Array=c,window.Uint16Array=c,window.Float32Array=c,void(window.Float64Array=c))}(),
// URL = URL || webkitURL
// Support: Safari<7, Android 4.2+
function(){window.URL||(window.URL=window.webkitURL)}(),
// Object.defineProperty()?
// Support: Android<4.0, Safari<5.1
function(){if("undefined"!=typeof Object.defineProperty){var a=!0;try{
// some browsers (e.g. safari) cannot use defineProperty() on DOM objects
// and thus the native version is not sufficient
Object.defineProperty(new Image,"id",{value:"test"});
// ... another test for android gb browser for non-DOM objects
var b=function(){};b.prototype={get id(){}},Object.defineProperty(new b,"id",{value:"",configurable:!0,enumerable:!0,writable:!1})}catch(c){a=!1}if(a)return}Object.defineProperty=function(a,b,c){delete a[b],"get"in c&&a.__defineGetter__(b,c.get),"set"in c&&a.__defineSetter__(b,c.set),"value"in c&&(a.__defineSetter__(b,function(a){return this.__defineGetter__(b,function(){return a}),a}),a[b]=c.value)}}(),
// No XMLHttpRequest#response?
// Support: IE<11, Android <4.0
function(){var a=XMLHttpRequest.prototype,b=new XMLHttpRequest;
// IE10 might have response, but not overrideMimeType
// Support: IE10
// The worker will be using XHR, so we can save time and disable worker.
// Support: IE9
return"overrideMimeType"in b||Object.defineProperty(a,"overrideMimeType",{value:function(a){}}),"responseType"in b?void 0:(PDFJS.disableWorker=!0,Object.defineProperty(a,"responseType",{get:function(){return this._responseType||"text"},set:function(a){"text"!==a&&"arraybuffer"!==a||(this._responseType=a,"arraybuffer"===a&&"function"==typeof this.overrideMimeType&&this.overrideMimeType("text/plain; charset=x-user-defined"))}}),"undefined"!=typeof VBArray?void Object.defineProperty(a,"response",{get:function(){return"arraybuffer"===this.responseType?new Uint8Array(new VBArray(this.responseBody).toArray()):this.responseText}}):void Object.defineProperty(a,"response",{get:function(){if("arraybuffer"!==this.responseType)return this.responseText;var a,b=this.responseText,c=b.length,d=new Uint8Array(c);for(a=0;c>a;++a)d[a]=255&b.charCodeAt(a);return d.buffer}}))}(),
// window.btoa (base64 encode function) ?
// Support: IE<10
function(){if(!("btoa"in window)){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";window.btoa=function(b){var c,d,e="";for(c=0,d=b.length;d>c;c+=3){var f=255&b.charCodeAt(c),g=255&b.charCodeAt(c+1),h=255&b.charCodeAt(c+2),i=f>>2,j=(3&f)<<4|g>>4,k=d>c+1?(15&g)<<2|h>>6:64,l=d>c+2?63&h:64;e+=a.charAt(i)+a.charAt(j)+a.charAt(k)+a.charAt(l)}return e}}}(),
// window.atob (base64 encode function)?
// Support: IE<10
function(){if(!("atob"in window)){
// https://github.com/davidchambers/Base64.js
var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";window.atob=function(b){if(b=b.replace(/=+$/,""),b.length%4===1)throw new Error("bad atob input");for(
// initialize result and counters
var c,d,e=0,f=0,g="";
// get next character
d=b.charAt(f++);~d&&(c=e%4?64*c+d:d,e++%4)?g+=String.fromCharCode(255&c>>(-2*e&6)):0)
// try to find character in table (0-63, not found => -1)
d=a.indexOf(d);return g}}}(),
// Function.prototype.bind?
// Support: Android<4.0, iOS<6.0
function(){"undefined"==typeof Function.prototype.bind&&(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice.call(arguments,1),d=function(){var d=c.concat(Array.prototype.slice.call(arguments));return b.apply(a,d)};return d})}(),
// HTMLElement dataset property
// Support: IE<11, Safari<5.1, Android<4.0
function(){var a=document.createElement("div");"dataset"in a||Object.defineProperty(HTMLElement.prototype,"dataset",{get:function(){if(this._dataset)return this._dataset;for(var a={},b=0,c=this.attributes.length;c>b;b++){var d=this.attributes[b];if("data-"===d.name.substring(0,5)){var e=d.name.substring(5).replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()});a[e]=d.value}}return Object.defineProperty(this,"_dataset",{value:a,writable:!1,enumerable:!1}),a},enumerable:!0})}(),
// HTMLElement classList property
// Support: IE<10, Android<4.0, iOS<5.0
function(){function a(a,b,c,d){var e=a.className||"",f=e.split(/\s+/g);""===f[0]&&f.shift();var g=f.indexOf(b);return 0>g&&c&&f.push(b),g>=0&&d&&f.splice(g,1),a.className=f.join(" "),g>=0}var b=document.createElement("div");if(!("classList"in b)){var c={add:function(b){a(this.element,b,!0,!1)},contains:function(b){return a(this.element,b,!1,!1)},remove:function(b){a(this.element,b,!1,!0)},toggle:function(b){a(this.element,b,!0,!0)}};Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){if(this._classList)return this._classList;var a=Object.create(c,{element:{value:this,writable:!1,enumerable:!0}});return Object.defineProperty(this,"_classList",{value:a,writable:!1,enumerable:!1}),a},enumerable:!0})}}(),
// Check console compatibility
// In older IE versions the console object is not available
// unless console is open.
// Support: IE<10
function(){"console"in window?"bind"in console.log||(
// native functions in IE9 might not have bind
console.log=function(a){return function(b){return a(b)}}(console.log),console.error=function(a){return function(b){return a(b)}}(console.error),console.warn=function(a){return function(b){return a(b)}}(console.warn)):window.console={log:function(){},error:function(){},warn:function(){}}}(),
// Check onclick compatibility in Opera
// Support: Opera<15
function(){
// workaround for reported Opera bug DSK-354448:
// onclick fires on disabled buttons with opaque content
function a(a){b(a.target)&&a.stopPropagation()}function b(a){return a.disabled||a.parentNode&&b(a.parentNode)}-1!==navigator.userAgent.indexOf("Opera")&&
// use browser detection since we cannot feature-check this bug
document.addEventListener("click",a,!0)}(),
// Checks if possible to use URL.createObjectURL()
// Support: IE
function(){navigator.userAgent.indexOf("Trident")>=0&&(PDFJS.disableCreateObjectURL=!0)}(),
// Checks if navigator.language is supported
function(){"language"in navigator||(PDFJS.locale=navigator.userLanguage||"en-US")}(),function(){
// Safari has issues with cached range requests see:
// https://github.com/mozilla/pdf.js/issues/3260
// Last tested with version 6.0.4.
// Support: Safari 6.0+
var a=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,b=/Android\s[0-2][^\d]/,c=b.test(navigator.userAgent),d=/Chrome\/(39|40)\./.test(navigator.userAgent);(a||c||d)&&(PDFJS.disableRange=!0,PDFJS.disableStream=!0)}(),
// Check if the browser supports manipulation of the history.
// Support: IE<10, Android<4.2
function(){(!history.pushState||navigator.userAgent.indexOf("Android 2.")>=0)&&(PDFJS.disableHistory=!0)}(),
// Support: IE<11, Chrome<21, Android<4.4, Safari<6
function(){
// IE < 11 will use window.CanvasPixelArray which lacks set function.
if(window.CanvasPixelArray)"function"!=typeof window.CanvasPixelArray.prototype.set&&(window.CanvasPixelArray.prototype.set=function(a){for(var b=0,c=this.length;c>b;b++)this[b]=a[b]});else{
// Old Chrome and Android use an inaccessible CanvasPixelArray prototype.
// Because we cannot feature detect it, we rely on user agent parsing.
var a,b=!1;if(navigator.userAgent.indexOf("Chrom")>=0?(a=navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./),b=a&&parseInt(a[2])<21):navigator.userAgent.indexOf("Android")>=0?
// Android < 4.4 lacks the set function.
// Android >= 4.4 will contain Chrome in the user agent,
// thus pass the Chrome check above and not reach this block.
b=/Android\s[0-4][^\d]/g.test(navigator.userAgent):navigator.userAgent.indexOf("Safari")>=0&&(a=navigator.userAgent.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//),b=a&&parseInt(a[1])<6),b){var c=window.CanvasRenderingContext2D.prototype,d=c.createImageData;c.createImageData=function(a,b){var c=d.call(this,a,b);return c.data.set=function(a){for(var b=0,c=this.length;c>b;b++)this[b]=a[b]},c},
// this closure will be kept referenced, so clear its vars
c=null}}}(),
// Support: IE<10, Android<4.0, iOS
function(){function a(a){window.setTimeout(a,20)}var b=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);
// requestAnimationFrame on iOS is broken, replacing with fake one.
return b?void(window.requestAnimationFrame=a):void("requestAnimationFrame"in window||(window.requestAnimationFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||a))}(),function(){var a=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),b=/Android/g.test(navigator.userAgent);(a||b)&&(
// 5MP
PDFJS.maxCanvasPixels=5242880)}(),
// Disable fullscreen support for certain problematic configurations.
// Support: IE11+ (when embedded).
function(){var a=navigator.userAgent.indexOf("Trident")>=0&&window.parent!==window;a&&(PDFJS.disableFullscreen=!0)}(),
// Provides document.currentScript support
// Support: IE, Chrome<29.
function(){"currentScript"in document||Object.defineProperty(document,"currentScript",{get:function(){var a=document.getElementsByTagName("script");return a[a.length-1]},enumerable:!0,configurable:!0})}();