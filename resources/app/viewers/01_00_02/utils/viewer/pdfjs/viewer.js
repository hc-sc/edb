/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
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
/* globals PDFJS, PDFBug, FirefoxCom, Stats, Cache, ProgressBar,
           DownloadManager, getFileName, scrollIntoView, getPDFFileNameFromURL,
           PDFHistory, Preferences, SidebarView, ViewHistory, Stats,
           PDFThumbnailViewer, URL, noContextMenuHandler, SecondaryToolbar,
           PasswordPrompt, PresentationMode, HandTool, Promise,
           DocumentProperties, PDFOutlineView, PDFAttachmentView,
           OverlayManager, PDFFindController, PDFFindBar, getVisibleElements,
           watchScroll, PDFViewer, PDFRenderingQueue, PresentationModeState,
           RenderingStates, DEFAULT_SCALE, UNKNOWN_SCALE,
           IGNORE_CURRENT_POSITION_ON_ZOOM: true */
"use strict";function getFileName(a){var b=a.indexOf("#"),c=a.indexOf("?"),d=Math.min(b>0?b:a.length,c>0?c:a.length);return a.substring(a.lastIndexOf("/",d)+1,d)}/**
 * Returns scale factor for the canvas. It makes sense for the HiDPI displays.
 * @return {Object} The object with horizontal (sx) and vertical (sy)
                    scales. The scaled property is set to false if scaling is
                    not required, true otherwise.
 */
function getOutputScale(a){var b=window.devicePixelRatio||1,c=a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||a.backingStorePixelRatio||1,d=b/c;return{sx:d,sy:d,scaled:1!==d}}/**
 * Scrolls specified element into view of its parent.
 * element {Object} The element to be visible.
 * spot {Object} An object with optional top and left properties,
 *               specifying the offset from the top left edge.
 */
function scrollIntoView(a,b){
// Assuming offsetParent is available (it's not available when viewer is in
// hidden iframe or object). We have to scroll: if the offsetParent is not set
// producing the error. See also animationStartedClosure.
var c=a.offsetParent,d=a.offsetTop+a.clientTop,e=a.offsetLeft+a.clientLeft;if(!c)return void console.error("offsetParent is not set -- cannot scroll");for(;c.clientHeight===c.scrollHeight;)if(c.dataset._scaleY&&(d/=c.dataset._scaleY,e/=c.dataset._scaleX),d+=c.offsetTop,e+=c.offsetLeft,c=c.offsetParent,!c)return;b&&(void 0!==b.top&&(d+=b.top),void 0!==b.left&&(e+=b.left,c.scrollLeft=e)),c.scrollTop=d}/**
 * Helper function to start monitoring the scroll event and converting them into
 * PDF.js friendly one: with scroll debounce and scroll direction.
 */
function watchScroll(a,b){var c=function(c){e||(
// schedule an invocation of scroll for next animation frame.
e=window.requestAnimationFrame(function(){e=null;var c=a.scrollTop,f=d.lastY;c!==f&&(d.down=c>f),d.lastY=c,b(d)}))},d={down:!0,lastY:a.scrollTop,_eventHandler:c},e=null;return a.addEventListener("scroll",c,!0),d}/**
 * Use binary search to find the index of the first item in a given array which
 * passes a given condition. The items are expected to be sorted in the sense
 * that if the condition is true for one item in the array, then it is also true
 * for all following items.
 *
 * @returns {Number} Index of the first array element to pass the test,
 *                   or |items.length| if no such element exists.
 */
function binarySearchFirstItem(a,b){var c=0,d=a.length-1;if(0===a.length||!b(a[d]))return a.length;if(b(a[c]))return c;for(;d>c;){var e=c+d>>1,f=a[e];b(f)?d=e:c=e+1}return c}/**
 * Generic helper to find out what elements are visible within a scroll pane.
 */
function getVisibleElements(a,b,c){function d(a){var b=a.div,c=b.offsetTop+b.clientTop+b.clientHeight;return c>m}for(var e,f,g,h,i,j,k,l,m=a.scrollTop,n=m+a.clientHeight,o=a.scrollLeft,p=o+a.clientWidth,q=[],r=0===b.length?0:binarySearchFirstItem(b,d),s=r,t=b.length;t>s&&(e=b[s],f=e.div,g=f.offsetTop+f.clientTop,h=f.clientHeight,!(g>n));s++)k=f.offsetLeft+f.clientLeft,l=f.clientWidth,o>k+l||k>p||(i=Math.max(0,m-g)+Math.max(0,g+h-n),j=100*(h-i)/h|0,q.push({id:e.id,x:k,y:g,view:e,percent:j}));var u=q[0],v=q[q.length-1];return c&&q.sort(function(a,b){var c=a.percent-b.percent;return Math.abs(c)>.001?-c:a.id-b.id}),{first:u,last:v,views:q}}/**
 * Event handler to suppress context menu.
 */
function noContextMenuHandler(a){a.preventDefault()}/**
 * Returns the filename or guessed filename from the url (see issue 3455).
 * url {String} The original PDF location.
 * @return {String} Guessed PDF file name.
 */
function getPDFFileNameFromURL(a){var b=/^(?:([^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/,c=/[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i,d=b.exec(a),e=c.exec(d[1])||c.exec(d[2])||c.exec(d[3]);if(e&&(e=e[0],-1!==e.indexOf("%")))
// URL-encoded %2Fpath%2Fto%2Ffile.pdf should be file.pdf
try{e=c.exec(decodeURIComponent(e))[0]}catch(f){}return e||"document.pdf"}function isAllWhitespace(a){return!NonWhitespaceRegexp.test(a)}/**
 * @constructor
 * @implements IPDFTextLayerFactory
 */
function DefaultTextLayerFactory(){}/**
 * @constructor
 * @implements IPDFAnnotationsLayerFactory
 */
function DefaultAnnotationsLayerFactory(){}// obsolete name, using it as an alias
function webViewerLoad(a){PDFViewerApplication.initialize().then(webViewerInitialized)}function webViewerInitialized(){var a=document.location.search.substring(1),b=PDFViewerApplication.parseQueryString(a),c="file"in b?b.file:DEFAULT_URL,d=document.createElement("input");d.id="fileInput",d.className="fileInput",d.setAttribute("type","file"),d.oncontextmenu=noContextMenuHandler,document.body.appendChild(d),window.File&&window.FileReader&&window.FileList&&window.Blob?document.getElementById("fileInput").value=null:document.getElementById("openFile").setAttribute("hidden","true");var e=PDFJS.locale||navigator.language;if(PDFViewerApplication.preferencePdfBugEnabled){
// Special debugging flags in the hash section of the URL.
var f=document.location.hash.substring(1),g=PDFViewerApplication.parseQueryString(f);if("disableworker"in g&&(PDFJS.disableWorker="true"===g.disableworker),"disablerange"in g&&(PDFJS.disableRange="true"===g.disablerange),"disablestream"in g&&(PDFJS.disableStream="true"===g.disablestream),"disableautofetch"in g&&(PDFJS.disableAutoFetch="true"===g.disableautofetch),"disablefontface"in g&&(PDFJS.disableFontFace="true"===g.disablefontface),"disablehistory"in g&&(PDFJS.disableHistory="true"===g.disablehistory),"webgl"in g&&(PDFJS.disableWebGL="true"!==g.webgl),"useonlycsszoom"in g&&(PDFJS.useOnlyCssZoom="true"===g.useonlycsszoom),"verbosity"in g&&(PDFJS.verbosity=0|g.verbosity),"ignorecurrentpositiononzoom"in g&&(IGNORE_CURRENT_POSITION_ON_ZOOM="true"===g.ignorecurrentpositiononzoom),"locale"in g&&(e=g.locale),"textlayer"in g)switch(g.textlayer){case"off":PDFJS.disableTextLayer=!0;break;case"visible":case"shadow":case"hover":var h=document.getElementById("viewer");h.classList.add("textLayer-"+g.textlayer)}if("pdfbug"in g){PDFJS.pdfBug=!0;var i=g.pdfbug,j=i.split(",");PDFBug.enable(j),PDFBug.init()}}mozL10n.setLanguage(e),PDFViewerApplication.supportsPrinting||(document.getElementById("print").classList.add("hidden"),document.getElementById("secondaryPrint").classList.add("hidden")),PDFViewerApplication.supportsFullscreen||(document.getElementById("presentationMode").classList.add("hidden"),document.getElementById("secondaryPresentationMode").classList.add("hidden")),PDFViewerApplication.supportsIntegratedFind&&document.getElementById("viewFind").classList.add("hidden"),
// Listen for unsupported features to trigger the fallback UI.
PDFJS.UnsupportedManager.listen(PDFViewerApplication.fallback.bind(PDFViewerApplication)),
// Suppress context menus for some controls
document.getElementById("scaleSelect").oncontextmenu=noContextMenuHandler;var k=document.getElementById("mainContainer"),l=document.getElementById("outerContainer");if(k.addEventListener("transitionend",function(a){if(a.target===k){var b=document.createEvent("UIEvents");b.initUIEvent("resize",!1,!1,window,0),window.dispatchEvent(b),l.classList.remove("sidebarMoving")}},!0),document.getElementById("sidebarToggle").addEventListener("click",function(){this.classList.toggle("toggled"),l.classList.add("sidebarMoving"),l.classList.toggle("sidebarOpen"),PDFViewerApplication.sidebarOpen=l.classList.contains("sidebarOpen"),PDFViewerApplication.sidebarOpen&&PDFViewerApplication.refreshThumbnailViewer(),PDFViewerApplication.forceRendering()}),document.getElementById("viewThumbnail").addEventListener("click",function(){PDFViewerApplication.switchSidebarView("thumbs")}),document.getElementById("viewOutline").addEventListener("click",function(){PDFViewerApplication.switchSidebarView("outline")}),document.getElementById("viewAttachments").addEventListener("click",function(){PDFViewerApplication.switchSidebarView("attachments")}),document.getElementById("previous").addEventListener("click",function(){PDFViewerApplication.page--}),document.getElementById("next").addEventListener("click",function(){PDFViewerApplication.page++}),document.getElementById("zoomIn").addEventListener("click",function(){PDFViewerApplication.zoomIn()}),document.getElementById("zoomOut").addEventListener("click",function(){PDFViewerApplication.zoomOut()}),document.getElementById("pageNumber").addEventListener("click",function(){this.select()}),document.getElementById("pageNumber").addEventListener("change",function(){
// Handle the user inputting a floating point number.
PDFViewerApplication.page=0|this.value,this.value!==(0|this.value).toString()&&(this.value=PDFViewerApplication.page)}),document.getElementById("scaleSelect").addEventListener("change",function(){PDFViewerApplication.setScale(this.value,!1)}),document.getElementById("presentationMode").addEventListener("click",SecondaryToolbar.presentationModeClick.bind(SecondaryToolbar)),document.getElementById("print").addEventListener("click",SecondaryToolbar.printClick.bind(SecondaryToolbar)),document.getElementById("download").addEventListener("click",SecondaryToolbar.downloadClick.bind(SecondaryToolbar)),c&&0===c.lastIndexOf("file:",0)){
// file:-scheme. Load the contents in the main thread because QtWebKit
// cannot load file:-URLs in a Web Worker. file:-URLs are usually loaded
// very quickly, so there is no need to set up progress event listeners.
PDFViewerApplication.setTitleUsingUrl(c);var m=new XMLHttpRequest;m.onload=function(){PDFViewerApplication.open(new Uint8Array(m.response),0)};try{m.open("GET",c),m.responseType="arraybuffer",m.send()}catch(n){PDFViewerApplication.error(mozL10n.get("loading_error",null,"An error occurred while loading the PDF."),n)}}else c&&PDFViewerApplication.open(c,0)}function updateViewarea(){PDFViewerApplication.initialized&&PDFViewerApplication.pdfViewer.update()}function selectScaleOption(a){for(var b=document.getElementById("scaleSelect").options,c=!1,d=0;d<b.length;d++){var e=b[d];e.value===a?(e.selected=!0,c=!0):e.selected=!1}return c}function handleMouseWheel(a){var b=40,c="DOMMouseScroll"===a.type?-a.detail:a.wheelDelta/b,d=0>c?"zoomOut":"zoomIn";PresentationMode.active?(a.preventDefault(),PDFViewerApplication.mouseScroll(c*b)):a.ctrlKey&&(// Only zoom the pages, not the entire viewer
a.preventDefault(),PDFViewerApplication[d](Math.abs(c)))}var DEFAULT_URL="",DEFAULT_SCALE_DELTA=1.1,MIN_SCALE=.25,MAX_SCALE=10,VIEW_HISTORY_MEMORY=20,SCALE_SELECT_CONTAINER_PADDING=8,SCALE_SELECT_PADDING=22,PAGE_NUMBER_LOADING_INDICATOR="visiblePageIsLoading",DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT=5e3;PDFJS.imageResourcesPath="./images/",PDFJS.workerSrc="pdf.worker.js",PDFJS.cMapUrl="/cmaps/",PDFJS.cMapPacked=!0;var mozL10n=document.mozL10n||document.webL10n,CSS_UNITS=96/72,DEFAULT_SCALE="page-width",UNKNOWN_SCALE=0,MAX_AUTO_SCALE=1.25,SCROLLBAR_PADDING=40,VERTICAL_PADDING=5,CustomStyle=function(){function a(){}
// As noted on: http://www.zachstronaut.com/posts/2009/02/17/
//              animate-css-transforms-firefox-webkit.html
// in some versions of IE9 it is critical that ms appear in this list
// before Moz
var b=["ms","Moz","Webkit","O"],c={};return a.getProp=function(a,d){
// check cache only when no element is given
if(1===arguments.length&&"string"==typeof c[a])return c[a];d=d||document.documentElement;var e,f,g=d.style;
// test standard property first
if("string"==typeof g[a])return c[a]=a;
// capitalize
f=a.charAt(0).toUpperCase()+a.slice(1);
// test vendor specific properties
for(var h=0,i=b.length;i>h;h++)if(e=b[h]+f,"string"==typeof g[e])return c[a]=e;
//if all fails then set to undefined
return c[a]="undefined"},a.setProp=function(a,b,c){var d=this.getProp(a);"undefined"!==d&&(b.style[d]=c)},a}(),ProgressBar=function(){function a(a,b,c){return Math.min(Math.max(a,b),c)}function b(a,b){this.visible=!0,
// Fetch the sub-elements for later.
this.div=document.querySelector(a+" .progress"),
// Get the loading bar element, so it can be resized to fit the viewer.
this.bar=this.div.parentNode,
// Get options, with sensible defaults.
this.height=b.height||100,this.width=b.width||100,this.units=b.units||"%",
// Initialize heights.
this.div.style.height=this.height+this.units,this.percent=0}return b.prototype={updateBar:function(){if(this._indeterminate)return this.div.classList.add("indeterminate"),void(this.div.style.width=this.width+this.units);this.div.classList.remove("indeterminate");var a=this.width*this._percent/100;this.div.style.width=a+this.units},get percent(){return this._percent},set percent(b){this._indeterminate=isNaN(b),this._percent=a(b,0,100),this.updateBar()},setWidth:function(a){if(a){var b=a.parentNode,c=b.offsetWidth-a.offsetWidth;c>0&&this.bar.setAttribute("style","width: calc(100% - "+c+"px);")}},hide:function(){this.visible&&(this.visible=!1,this.bar.classList.add("hidden"),document.body.classList.remove("loadingInProgress"))},show:function(){this.visible||(this.visible=!0,document.body.classList.add("loadingInProgress"),this.bar.classList.remove("hidden"))}},b}(),DEFAULT_PREFERENCES={showPreviousViewOnLoad:!0,defaultZoomValue:"",sidebarViewOnLoad:0,enableHandToolOnLoad:!1,enableWebGL:!1,pdfBugEnabled:!1,disableRange:!1,disableStream:!1,disableAutoFetch:!1,disableFontFace:!1,disableTextLayer:!1,useOnlyCssZoom:!1},SidebarView={NONE:0,THUMBS:1,OUTLINE:2,ATTACHMENTS:3},Preferences={prefs:Object.create(DEFAULT_PREFERENCES),isInitializedPromiseResolved:!1,initializedPromise:null,/**
   * Initialize and fetch the current preference values from storage.
   * @return {Promise} A promise that is resolved when the preferences
   *                   have been initialized.
   */
initialize:function(){return this.initializedPromise=this._readFromStorage(DEFAULT_PREFERENCES).then(function(a){this.isInitializedPromiseResolved=!0,a&&(this.prefs=a)}.bind(this))},/**
   * Stub function for writing preferences to storage.
   * NOTE: This should be overridden by a build-specific function defined below.
   * @param {Object} prefObj The preferences that should be written to storage.
   * @return {Promise} A promise that is resolved when the preference values
   *                   have been written.
   */
_writeToStorage:function(a){return Promise.resolve()},/**
   * Stub function for reading preferences from storage.
   * NOTE: This should be overridden by a build-specific function defined below.
   * @param {Object} prefObj The preferences that should be read from storage.
   * @return {Promise} A promise that is resolved with an {Object} containing
   *                   the preferences that have been read.
   */
_readFromStorage:function(a){return Promise.resolve()},/**
   * Reset the preferences to their default values and update storage.
   * @return {Promise} A promise that is resolved when the preference values
   *                   have been reset.
   */
reset:function(){return this.initializedPromise.then(function(){return this.prefs=Object.create(DEFAULT_PREFERENCES),this._writeToStorage(DEFAULT_PREFERENCES)}.bind(this))},/**
   * Replace the current preference values with the ones from storage.
   * @return {Promise} A promise that is resolved when the preference values
   *                   have been updated.
   */
reload:function(){return this.initializedPromise.then(function(){this._readFromStorage(DEFAULT_PREFERENCES).then(function(a){a&&(this.prefs=a)}.bind(this))}.bind(this))},/**
   * Set the value of a preference.
   * @param {string} name The name of the preference that should be changed.
   * @param {boolean|number|string} value The new value of the preference.
   * @return {Promise} A promise that is resolved when the value has been set,
   *                   provided that the preference exists and the types match.
   */
set:function(a,b){return this.initializedPromise.then(function(){if(void 0===DEFAULT_PREFERENCES[a])throw new Error("preferencesSet: '"+a+"' is undefined.");if(void 0===b)throw new Error("preferencesSet: no value is specified.");var c=typeof b,d=typeof DEFAULT_PREFERENCES[a];if(c!==d){if("number"!==c||"string"!==d)throw new Error("Preferences_set: '"+b+"' is a \""+c+'", expected "'+d+'".');b=b.toString()}else if("number"===c&&(0|b)!==b)throw new Error("Preferences_set: '"+b+'\' must be an "integer".');return this.prefs[a]=b,this._writeToStorage(this.prefs)}.bind(this))},/**
   * Get the value of a preference.
   * @param {string} name The name of the preference whose value is requested.
   * @return {Promise} A promise that is resolved with a {boolean|number|string}
   *                   containing the value of the preference.
   */
get:function(a){return this.initializedPromise.then(function(){var b=DEFAULT_PREFERENCES[a];if(void 0===b)throw new Error("preferencesGet: '"+a+"' is undefined.");var c=this.prefs[a];return void 0!==c?c:b}.bind(this))}};Preferences._writeToStorage=function(a){return new Promise(function(b){localStorage.setItem("pdfjs.preferences",JSON.stringify(a)),b()})},Preferences._readFromStorage=function(a){return new Promise(function(a){var b=JSON.parse(localStorage.getItem("pdfjs.preferences"));a(b)})},function(){function a(a){var b=document.createEvent("CustomEvent");b.initCustomEvent(a,!1,!1,"custom"),window.dispatchEvent(b)}function b(){if(e)if(d(),++f<e.length){var a=e[f];"function"==typeof a.mozPrintCallback?a.mozPrintCallback({context:a.getContext("2d"),abort:c,done:b}):b()}else d(),g.call(window),setTimeout(c,20)}function c(){e&&(e=null,d(),a("afterprint"))}function d(){var a=document.getElementById("mozPrintCallback-shim");if(e){var b=Math.round(100*f/e.length),d=a.querySelector("progress"),g=a.querySelector(".relative-progress");d.value=b,g.textContent=b+"%",a.removeAttribute("hidden"),a.onclick=c}else a.setAttribute("hidden","")}if(!("mozPrintCallback"in document.createElement("canvas"))){
// Cause positive result on feature-detection:
HTMLCanvasElement.prototype.mozPrintCallback=void 0;var e,f,g=window.print;window.print=function(){if(e)return void console.warn("Ignored window.print() because of a pending print job.");try{a("beforeprint")}finally{e=document.querySelectorAll("canvas"),f=-1,b()}};var h=!!document.attachEvent;if(window.addEventListener("keydown",function(a){
// Intercept Cmd/Ctrl + P in all browsers.
// Also intercept Cmd/Ctrl + Shift + P in Chrome and Opera
if(80===a.keyCode&&(a.ctrlKey||a.metaKey)&&!a.altKey&&(!a.shiftKey||window.chrome||window.opera)){if(window.print(),h)
// Only attachEvent can cancel Ctrl + P dialog in IE <=10
// attachEvent is gone in IE11, so the dialog will re-appear in IE11.
return;return a.preventDefault(),void(a.stopImmediatePropagation?a.stopImmediatePropagation():a.stopPropagation())}27===a.keyCode&&e&&// Esc
c()},!0),h&&document.attachEvent("onkeydown",function(a){return a=a||window.event,80===a.keyCode&&a.ctrlKey?(a.keyCode=0,!1):void 0}),"onbeforeprint"in window){
// Do not propagate before/afterprint events when they are not triggered
// from within this polyfill. (FF/IE).
var i=function(a){"custom"!==a.detail&&a.stopImmediatePropagation&&a.stopImmediatePropagation()};window.addEventListener("beforeprint",i,!1),window.addEventListener("afterprint",i,!1)}}}();var DownloadManager=function(){function a(a,b){var c=document.createElement("a");if(c.click)
// Use a.click() if available. Otherwise, Chrome might show
// "Unsafe JavaScript attempt to initiate a navigation change
//  for frame with URL" and not open the PDF at all.
// Supported by (not mentioned = untested):
// - Firefox 6 - 19 (4- does not support a.click, 5 ignores a.click)
// - Chrome 19 - 26 (18- does not support a.click)
// - Opera 9 - 12.15
// - Internet Explorer 6 - 10
// - Safari 6 (5.1- does not support a.click)
c.href=a,c.target="_parent",
// Use a.download if available. This increases the likelihood that
// the file is downloaded instead of opened by another PDF plugin.
"download"in c&&(c.download=b),
// <a> must be in the document for IE and recent Firefox versions.
// (otherwise .click() is ignored)
(document.body||document.documentElement).appendChild(c),c.click(),c.parentNode.removeChild(c);else{if(window.top===window&&a.split("#")[0]===window.location.href.split("#")[0]){
// If _parent == self, then opening an identical URL with different
// location hash will only cause a navigation, not a download.
var d=-1===a.indexOf("?")?"?":"&";a=a.replace(/#|$/,d+"$&")}window.open(a,"_parent")}}function b(){}return b.prototype={downloadUrl:function(b,c){PDFJS.isValidUrl(b,!0)&&a(b+"#pdfjs.action=download",c)},downloadData:function(b,c,d){if(navigator.msSaveBlob)// IE10 and above
return navigator.msSaveBlob(new Blob([b],{type:d}),c);var e=PDFJS.createObjectURL(b,d);a(e,c)},download:function(b,c,d){if(!URL)
// URL.createObjectURL is not supported
return void this.downloadUrl(c,d);if(navigator.msSaveBlob)
// IE10 / IE11
return void(navigator.msSaveBlob(b,d)||this.downloadUrl(c,d));var e=URL.createObjectURL(b);a(e,d)}},b}(),ViewHistory=function(){function a(a){this.fingerprint=a,this.isInitializedPromiseResolved=!1,this.initializedPromise=this._readFromStorage().then(function(a){this.isInitializedPromiseResolved=!0;var b=JSON.parse(a||"{}");"files"in b||(b.files=[]),b.files.length>=VIEW_HISTORY_MEMORY&&b.files.shift();for(var c,d=0,e=b.files.length;e>d;d++){var f=b.files[d];if(f.fingerprint===this.fingerprint){c=d;break}}"number"!=typeof c&&(c=b.files.push({fingerprint:this.fingerprint})-1),this.file=b.files[c],this.database=b}.bind(this))}return a.prototype={_writeToStorage:function(){return new Promise(function(a){var b=JSON.stringify(this.database);localStorage.setItem("database",b),a()}.bind(this))},_readFromStorage:function(){return new Promise(function(a){a(localStorage.getItem("database"))})},set:function(a,b){return this.isInitializedPromiseResolved?(this.file[a]=b,this._writeToStorage()):void 0},setMultiple:function(a){if(this.isInitializedPromiseResolved){for(var b in a)this.file[b]=a[b];return this._writeToStorage()}},get:function(a,b){return this.isInitializedPromiseResolved?this.file[a]||b:b}},a}(),PDFFindBar=function(){function a(a){if(this.opened=!1,this.bar=a.bar||null,this.toggleButton=a.toggleButton||null,this.findField=a.findField||null,this.highlightAll=a.highlightAllCheckbox||null,this.caseSensitive=a.caseSensitiveCheckbox||null,this.findMsg=a.findMsg||null,this.findStatusIcon=a.findStatusIcon||null,this.findPreviousButton=a.findPreviousButton||null,this.findNextButton=a.findNextButton||null,this.findController=a.findController||null,null===this.findController)throw new Error("PDFFindBar cannot be used without a PDFFindController instance.");
// Add event listeners to the DOM elements.
var b=this;this.toggleButton.addEventListener("click",function(){b.toggle()}),this.findField.addEventListener("input",function(){b.dispatchEvent("")}),this.bar.addEventListener("keydown",function(a){switch(a.keyCode){case 13:// Enter
a.target===b.findField&&b.dispatchEvent("again",a.shiftKey);break;case 27:// Escape
b.close()}}),this.findPreviousButton.addEventListener("click",function(){b.dispatchEvent("again",!0)}),this.findNextButton.addEventListener("click",function(){b.dispatchEvent("again",!1)}),this.highlightAll.addEventListener("click",function(){b.dispatchEvent("highlightallchange")}),this.caseSensitive.addEventListener("click",function(){b.dispatchEvent("casesensitivitychange")})}return a.prototype={dispatchEvent:function(a,b){var c=document.createEvent("CustomEvent");return c.initCustomEvent("find"+a,!0,!0,{query:this.findField.value,caseSensitive:this.caseSensitive.checked,highlightAll:this.highlightAll.checked,findPrevious:b}),window.dispatchEvent(c)},updateUIState:function(a,b){var c=!1,d="",e="";switch(a){case FindStates.FIND_FOUND:break;case FindStates.FIND_PENDING:e="pending";break;case FindStates.FIND_NOTFOUND:d=mozL10n.get("find_not_found",null,"Phrase not found"),c=!0;break;case FindStates.FIND_WRAPPED:d=b?mozL10n.get("find_reached_top",null,"Reached top of document, continued from bottom"):mozL10n.get("find_reached_bottom",null,"Reached end of document, continued from top")}c?this.findField.classList.add("notFound"):this.findField.classList.remove("notFound"),this.findField.setAttribute("data-status",e),this.findMsg.textContent=d},open:function(){this.opened||(this.opened=!0,this.toggleButton.classList.add("toggled"),this.bar.classList.remove("hidden")),this.findField.select(),this.findField.focus()},close:function(){this.opened&&(this.opened=!1,this.toggleButton.classList.remove("toggled"),this.bar.classList.add("hidden"),this.findController.active=!1)},toggle:function(){this.opened?this.close():this.open()}},a}(),FindStates={FIND_FOUND:0,FIND_NOTFOUND:1,FIND_WRAPPED:2,FIND_PENDING:3},FIND_SCROLL_OFFSET_TOP=-50,FIND_SCROLL_OFFSET_LEFT=-400,PDFFindController=function(){function a(a){this.startedTextExtraction=!1,this.extractTextPromises=[],this.pendingFindMatches={},this.active=!1,// If active, find results will be highlighted.
this.pageContents=[],// Stores the text for each page.
this.pageMatches=[],this.selected={// Currently selected match.
pageIdx:-1,matchIdx:-1},this.offset={// Where the find algorithm currently is in the document.
pageIdx:null,matchIdx:null},this.pagesToSearch=null,this.resumePageIdx=null,this.state=null,this.dirtyMatch=!1,this.findTimeout=null,this.pdfViewer=a.pdfViewer||null,this.integratedFind=a.integratedFind||!1,this.charactersToNormalize={"‘":"'",// Left single quotation mark
"’":"'",// Right single quotation mark
"‚":"'",// Single low-9 quotation mark
"‛":"'",// Single high-reversed-9 quotation mark
"“":'"',// Left double quotation mark
"”":'"',// Right double quotation mark
"„":'"',// Double low-9 quotation mark
"‟":'"',// Double high-reversed-9 quotation mark
"¼":"1/4",// Vulgar fraction one quarter
"½":"1/2",// Vulgar fraction one half
"¾":"3/4",// Vulgar fraction three quarters
" ":" "},this.findBar=a.findBar||null;
// Compile the regular expression for text normalization once
var b=Object.keys(this.charactersToNormalize).join("");this.normalizationRegex=new RegExp("["+b+"]","g");var c=["find","findagain","findhighlightallchange","findcasesensitivitychange"];this.firstPagePromise=new Promise(function(a){this.resolveFirstPage=a}.bind(this)),this.handleEvent=this.handleEvent.bind(this);for(var d=0,e=c.length;e>d;d++)window.addEventListener(c[d],this.handleEvent)}return a.prototype={setFindBar:function(a){this.findBar=a},reset:function(){this.startedTextExtraction=!1,this.extractTextPromises=[],this.active=!1},normalize:function(a){var b=this;return a.replace(this.normalizationRegex,function(a){return b.charactersToNormalize[a]})},calcFindMatch:function(a){var b=this.normalize(this.pageContents[a]),c=this.normalize(this.state.query),d=this.state.caseSensitive,e=c.length;if(0!==e){d||(b=b.toLowerCase(),c=c.toLowerCase());for(var f=[],g=-e;;){if(g=b.indexOf(c,g+e),-1===g)break;f.push(g)}this.pageMatches[a]=f,this.updatePage(a),this.resumePageIdx===a&&(this.resumePageIdx=null,this.nextPageMatch())}},extractText:function(){function a(c){e.pdfViewer.getPageTextContent(c).then(function(d){for(var f=d.items,g=[],h=0,i=f.length;i>h;h++)g.push(f[h].str);
// Store the pageContent as a string.
e.pageContents.push(g.join("")),b[c](c),c+1<e.pdfViewer.pagesCount&&a(c+1)})}if(!this.startedTextExtraction){this.startedTextExtraction=!0,this.pageContents=[];for(var b=[],c=this.pdfViewer.pagesCount,d=0;c>d;d++)this.extractTextPromises.push(new Promise(function(a){b.push(a)}));var e=this;a(0)}},handleEvent:function(a){(null===this.state||"findagain"!==a.type)&&(this.dirtyMatch=!0),this.state=a.detail,this.updateUIState(FindStates.FIND_PENDING),this.firstPagePromise.then(function(){this.extractText(),clearTimeout(this.findTimeout),"find"===a.type?
// Only trigger the find action after 250ms of silence.
this.findTimeout=setTimeout(this.nextMatch.bind(this),250):this.nextMatch()}.bind(this))},updatePage:function(a){this.selected.pageIdx===a&&
// If the page is selected, scroll the page into view, which triggers
// rendering the page, which adds the textLayer. Once the textLayer is
// build, it will scroll onto the selected match.
this.pdfViewer.scrollPageIntoView(a+1);var b=this.pdfViewer.getPageView(a);b.textLayer&&b.textLayer.updateMatches()},nextMatch:function(){var a=this.state.findPrevious,b=this.pdfViewer.currentPageNumber-1,c=this.pdfViewer.pagesCount;if(this.active=!0,this.dirtyMatch){
// Need to recalculate the matches, reset everything.
this.dirtyMatch=!1,this.selected.pageIdx=this.selected.matchIdx=-1,this.offset.pageIdx=b,this.offset.matchIdx=null,this.hadMatch=!1,this.resumePageIdx=null,this.pageMatches=[];for(var d=this,e=0;c>e;e++)
// Wipe out any previous highlighted matches.
this.updatePage(e),
// As soon as the text is extracted start finding the matches.
e in this.pendingFindMatches||(this.pendingFindMatches[e]=!0,this.extractTextPromises[e].then(function(a){delete d.pendingFindMatches[a],d.calcFindMatch(a)}))}
// If there's no query there's no point in searching.
if(""===this.state.query)return void this.updateUIState(FindStates.FIND_FOUND);
// If we're waiting on a page, we return since we can't do anything else.
if(!this.resumePageIdx){var f=this.offset;
// If there's already a matchIdx that means we are iterating through a
// page's matches.
if(
// Keep track of how many pages we should maximally iterate through.
this.pagesToSearch=c,null!==f.matchIdx){var g=this.pageMatches[f.pageIdx].length;if(!a&&f.matchIdx+1<g||a&&f.matchIdx>0)
// The simple case; we just have advance the matchIdx to select
// the next match on the page.
return this.hadMatch=!0,f.matchIdx=a?f.matchIdx-1:f.matchIdx+1,void this.updateMatch(!0);
// We went beyond the current page's matches, so we advance to
// the next page.
this.advanceOffsetPage(a)}
// Start searching through the page.
this.nextPageMatch()}},matchesReady:function(a){var b=this.offset,c=a.length,d=this.state.findPrevious;
// There were matches for the page, so initialize the matchIdx.
// No matches, so attempt to search the next page.
// No point in wrapping again, there were no matches.
return c?(this.hadMatch=!0,b.matchIdx=d?c-1:0,this.updateMatch(!0),!0):(this.advanceOffsetPage(d),b.wrapped&&(b.matchIdx=null,this.pagesToSearch<0)?(this.updateMatch(!1),!0):!1)},/**
     * The method is called back from the text layer when match presentation
     * is updated.
     * @param {number} pageIndex - page index.
     * @param {number} index - match index.
     * @param {Array} elements - text layer div elements array.
     * @param {number} beginIdx - start index of the div array for the match.
     * @param {number} endIdx - end index of the div array for the match.
     */
updateMatchPosition:function(a,b,c,d,e){this.selected.matchIdx===b&&this.selected.pageIdx===a&&scrollIntoView(c[d],{top:FIND_SCROLL_OFFSET_TOP,left:FIND_SCROLL_OFFSET_LEFT})},nextPageMatch:function(){null!==this.resumePageIdx&&console.error("There can only be one pending page.");do{var a=this.offset.pageIdx,b=this.pageMatches[a];if(!b){
// The matches don't exist yet for processing by "matchesReady",
// so set a resume point for when they do exist.
this.resumePageIdx=a;break}}while(!this.matchesReady(b))},advanceOffsetPage:function(a){var b=this.offset,c=this.extractTextPromises.length;b.pageIdx=a?b.pageIdx-1:b.pageIdx+1,b.matchIdx=null,this.pagesToSearch--,(b.pageIdx>=c||b.pageIdx<0)&&(b.pageIdx=a?c-1:0,b.wrapped=!0)},updateMatch:function(a){var b=FindStates.FIND_NOTFOUND,c=this.offset.wrapped;if(this.offset.wrapped=!1,a){var d=this.selected.pageIdx;this.selected.pageIdx=this.offset.pageIdx,this.selected.matchIdx=this.offset.matchIdx,b=c?FindStates.FIND_WRAPPED:FindStates.FIND_FOUND,
// Update the currently selected page to wipe out any selected matches.
-1!==d&&d!==this.selected.pageIdx&&this.updatePage(d)}this.updateUIState(b,this.state.findPrevious),-1!==this.selected.pageIdx&&this.updatePage(this.selected.pageIdx)},updateUIState:function(a,b){if(this.integratedFind)return void FirefoxCom.request("updateFindControlState",{result:a,findPrevious:b});if(null===this.findBar)throw new Error("PDFFindController is not initialized with a PDFFindBar instance.");this.findBar.updateUIState(a,b)}},a}(),PDFHistory={initialized:!1,initialDestination:null,/**
   * @param {string} fingerprint
   * @param {IPDFLinkService} linkService
   */
initialize:function(a,b){function c(){var a=e._getPreviousParams(null,!0);if(a){var b=!e.current.dest&&e.current.hash!==e.previousHash;e._pushToHistory(a,!1,b),e._updatePreviousBookmark()}
// Remove the event listener when navigating away from the document,
// since 'beforeunload' prevents Firefox from caching the document.
window.removeEventListener("beforeunload",c,!1)}this.initialized=!0,this.reInitialized=!1,this.allowHashChange=!0,this.historyUnlocked=!0,this.previousHash=window.location.hash.substring(1),this.currentBookmark="",this.currentPage=0,this.updatePreviousBookmark=!1,this.previousBookmark="",this.previousPage=0,this.nextHashParam="",this.fingerprint=a,this.linkService=b,this.currentUid=this.uid=0,this.current={};var d=window.history.state;this._isStateObjectDefined(d)?(
// This corresponds to navigating back to the document
// from another page in the browser history.
d.target.dest?this.initialDestination=d.target.dest:b.setHash(d.target.hash),this.currentUid=d.uid,this.uid=d.uid+1,this.current=d.target):(
// This corresponds to the loading of a new document.
d&&d.fingerprint&&this.fingerprint!==d.fingerprint&&(
// Reinitialize the browsing history when a new document
// is opened in the web viewer.
this.reInitialized=!0),this._pushOrReplaceState({fingerprint:this.fingerprint},!0));var e=this;window.addEventListener("popstate",function(a){if(a.preventDefault(),a.stopPropagation(),e.historyUnlocked)if(a.state)
// Move back/forward in the history.
e._goTo(a.state);else{
// If the history is empty when the hash changes,
// update the previous entry in the browser history.
if(
// Handle the user modifying the hash of a loaded document.
e.previousHash=window.location.hash.substring(1),0===e.uid){var b=e.previousHash&&e.currentBookmark&&e.previousHash!==e.currentBookmark?{hash:e.currentBookmark,page:e.currentPage}:{page:1};e.historyUnlocked=!1,e.allowHashChange=!1,window.history.back(),e._pushToHistory(b,!1,!0),window.history.forward(),e.historyUnlocked=!0}e._pushToHistory({hash:e.previousHash},!1,!0),e._updatePreviousBookmark()}},!1),window.addEventListener("beforeunload",c,!1),window.addEventListener("pageshow",function(a){
// If the entire viewer (including the PDF file) is cached in the browser,
// we need to reattach the 'beforeunload' event listener since
// the 'DOMContentLoaded' event is not fired on 'pageshow'.
window.addEventListener("beforeunload",c,!1)},!1)},_isStateObjectDefined:function(a){return a&&a.uid>=0&&a.fingerprint&&this.fingerprint===a.fingerprint&&a.target&&a.target.hash?!0:!1},_pushOrReplaceState:function(a,b){b?window.history.replaceState(a,"",document.URL):window.history.pushState(a,"",document.URL)},get isHashChangeUnlocked(){if(!this.initialized)return!0;
// If the current hash changes when moving back/forward in the history,
// this will trigger a 'popstate' event *as well* as a 'hashchange' event.
// Since the hash generally won't correspond to the exact the position
// stored in the history's state object, triggering the 'hashchange' event
// can thus corrupt the browser history.
//
// When the hash changes during a 'popstate' event, we *only* prevent the
// first 'hashchange' event and immediately reset allowHashChange.
// If it is not reset, the user would not be able to change the hash.
var a=this.allowHashChange;return this.allowHashChange=!0,a},_updatePreviousBookmark:function(){this.updatePreviousBookmark&&this.currentBookmark&&this.currentPage&&(this.previousBookmark=this.currentBookmark,this.previousPage=this.currentPage,this.updatePreviousBookmark=!1)},updateCurrentBookmark:function(a,b){this.initialized&&(this.currentBookmark=a.substring(1),this.currentPage=0|b,this._updatePreviousBookmark())},updateNextHashParam:function(a){this.initialized&&(this.nextHashParam=a)},push:function(a,b){if(this.initialized&&this.historyUnlocked){if(a.dest&&!a.hash&&(a.hash=this.current.hash&&this.current.dest&&this.current.dest===a.dest?this.current.hash:this.linkService.getDestinationHash(a.dest).split("#")[1]),a.page&&(a.page|=0),b){var c=window.history.state.target;
// Invoked when the user specifies an initial bookmark,
// thus setting initialBookmark, when the document is loaded.
// If the current document is reloaded,
// avoid creating duplicate entries in the history.
return c||(this._pushToHistory(a,!1),this.previousHash=window.location.hash.substring(1)),this.updatePreviousBookmark=this.nextHashParam?!1:!0,void(c&&this._updatePreviousBookmark())}if(this.nextHashParam){if(this.nextHashParam===a.hash)return this.nextHashParam=null,void(this.updatePreviousBookmark=!0);this.nextHashParam=null}a.hash?this.current.hash?this.current.hash!==a.hash?this._pushToHistory(a,!0):(!this.current.page&&a.page&&this._pushToHistory(a,!1,!0),this.updatePreviousBookmark=!0):this._pushToHistory(a,!0):this.current.page&&a.page&&this.current.page!==a.page&&this._pushToHistory(a,!0)}},_getPreviousParams:function(a,b){if(!this.currentBookmark||!this.currentPage)return null;if(this.updatePreviousBookmark&&(this.updatePreviousBookmark=!1),this.uid>0&&(!this.previousBookmark||!this.previousPage))
// Prevent the history from getting stuck in the current state,
// effectively preventing the user from going back/forward in the history.
//
// This happens if the current position in the document didn't change when
// the history was previously updated. The reasons for this are either:
// 1. The current zoom value is such that the document does not need to,
//    or cannot, be scrolled to display the destination.
// 2. The previous destination is broken, and doesn't actally point to a
//    position within the document.
//    (This is either due to a bad PDF generator, or the user making a
//     mistake when entering a destination in the hash parameters.)
return null;if(!this.current.dest&&!a||b){if(this.previousBookmark===this.currentBookmark)return null}else{if(!this.current.page&&!a)return null;if(this.previousPage===this.currentPage)return null}var c={hash:this.currentBookmark,page:this.currentPage};return PresentationMode.active&&(c.hash=null),c},_stateObj:function(a){return{fingerprint:this.fingerprint,uid:this.uid,target:a}},_pushToHistory:function(a,b,c){if(this.initialized){if(!a.hash&&a.page&&(a.hash="page="+a.page),b&&!c){var d=this._getPreviousParams();if(d){var e=!this.current.dest&&this.current.hash!==this.previousHash;this._pushToHistory(d,!1,e)}}this._pushOrReplaceState(this._stateObj(a),c||0===this.uid),this.currentUid=this.uid++,this.current=a,this.updatePreviousBookmark=!0}},_goTo:function(a){if(this.initialized&&this.historyUnlocked&&this._isStateObjectDefined(a)){if(!this.reInitialized&&a.uid<this.currentUid){var b=this._getPreviousParams(!0);if(b)return this._pushToHistory(this.current,!1),this._pushToHistory(b,!1),this.currentUid=a.uid,void window.history.back()}this.historyUnlocked=!1,a.target.dest?this.linkService.navigateTo(a.target.dest):this.linkService.setHash(a.target.hash),this.currentUid=a.uid,a.uid>this.uid&&(this.uid=a.uid),this.current=a.target,this.updatePreviousBookmark=!0;var c=window.location.hash.substring(1);this.previousHash!==c&&(this.allowHashChange=!1),this.previousHash=c,this.historyUnlocked=!0}},back:function(){this.go(-1)},forward:function(){this.go(1)},go:function(a){if(this.initialized&&this.historyUnlocked){var b=window.history.state;-1===a&&b&&b.uid>0?window.history.back():1===a&&b&&b.uid<this.uid-1&&window.history.forward()}}},SecondaryToolbar={opened:!1,previousContainerHeight:null,newContainerHeight:null,initialize:function(a){this.toolbar=a.toolbar,this.presentationMode=a.presentationMode,this.documentProperties=a.documentProperties,this.buttonContainer=this.toolbar.firstElementChild,
// Define the toolbar buttons.
this.toggleButton=a.toggleButton,this.presentationModeButton=a.presentationModeButton,this.openFile=a.openFile,this.print=a.print,this.download=a.download,this.viewBookmark=a.viewBookmark,this.firstPage=a.firstPage,this.lastPage=a.lastPage,this.pageRotateCw=a.pageRotateCw,this.pageRotateCcw=a.pageRotateCcw,this.documentPropertiesButton=a.documentPropertiesButton;
// Attach the event listeners.
var b=[
// Button to toggle the visibility of the secondary toolbar:
{element:this.toggleButton,handler:this.toggle},
// All items within the secondary toolbar
// (except for toggleHandTool, hand_tool.js is responsible for it):
{element:this.presentationModeButton,handler:this.presentationModeClick},{element:this.openFile,handler:this.openFileClick},{element:this.print,handler:this.printClick},{element:this.download,handler:this.downloadClick},{element:this.viewBookmark,handler:this.viewBookmarkClick},{element:this.firstPage,handler:this.firstPageClick},{element:this.lastPage,handler:this.lastPageClick},{element:this.pageRotateCw,handler:this.pageRotateCwClick},{element:this.pageRotateCcw,handler:this.pageRotateCcwClick},{element:this.documentPropertiesButton,handler:this.documentPropertiesClick}];for(var c in b){var d=b[c].element;d&&d.addEventListener("click",b[c].handler.bind(this))}},
// Event handling functions.
presentationModeClick:function(a){this.presentationMode.request(),this.close()},openFileClick:function(a){document.getElementById("fileInput").click(),this.close()},printClick:function(a){window.print(),this.close()},downloadClick:function(a){PDFViewerApplication.download(),this.close()},viewBookmarkClick:function(a){this.close()},firstPageClick:function(a){PDFViewerApplication.page=1,this.close()},lastPageClick:function(a){PDFViewerApplication.pdfDocument&&(PDFViewerApplication.page=PDFViewerApplication.pagesCount),this.close()},pageRotateCwClick:function(a){PDFViewerApplication.rotatePages(90)},pageRotateCcwClick:function(a){PDFViewerApplication.rotatePages(-90)},documentPropertiesClick:function(a){this.documentProperties.open(),this.close()},
// Misc. functions for interacting with the toolbar.
setMaxHeight:function(a){a&&this.buttonContainer&&(this.newContainerHeight=a.clientHeight,this.previousContainerHeight!==this.newContainerHeight&&(this.buttonContainer.setAttribute("style","max-height: "+(this.newContainerHeight-SCROLLBAR_PADDING)+"px;"),this.previousContainerHeight=this.newContainerHeight))},open:function(){this.opened||(this.opened=!0,this.toggleButton.classList.add("toggled"),this.toolbar.classList.remove("hidden"))},close:function(a){this.opened&&(!a||this.toolbar.contains(a))&&(this.opened=!1,this.toolbar.classList.add("hidden"),this.toggleButton.classList.remove("toggled"))},toggle:function(){this.opened?this.close():this.open()}},DELAY_BEFORE_HIDING_CONTROLS=3e3,SELECTOR="presentationControls",DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS=1e3,PresentationMode={active:!1,args:null,contextMenuOpen:!1,prevCoords:{x:null,y:null},initialize:function(a){this.container=a.container,this.secondaryToolbar=a.secondaryToolbar,this.viewer=this.container.firstElementChild,this.firstPage=a.firstPage,this.lastPage=a.lastPage,this.pageRotateCw=a.pageRotateCw,this.pageRotateCcw=a.pageRotateCcw,this.firstPage.addEventListener("click",function(){this.contextMenuOpen=!1,this.secondaryToolbar.firstPageClick()}.bind(this)),this.lastPage.addEventListener("click",function(){this.contextMenuOpen=!1,this.secondaryToolbar.lastPageClick()}.bind(this)),this.pageRotateCw.addEventListener("click",function(){this.contextMenuOpen=!1,this.secondaryToolbar.pageRotateCwClick()}.bind(this)),this.pageRotateCcw.addEventListener("click",function(){this.contextMenuOpen=!1,this.secondaryToolbar.pageRotateCcwClick()}.bind(this))},get isFullscreen(){return document.fullscreenElement||document.mozFullScreen||document.webkitIsFullScreen||document.msFullscreenElement},/**
   * Initialize a timeout that is used to specify switchInProgress when the
   * browser transitions to fullscreen mode. Since resize events are triggered
   * multiple times during the switch to fullscreen mode, this is necessary in
   * order to prevent the page from being scrolled partially, or completely,
   * out of view when Presentation Mode is enabled.
   * Note: This is only an issue at certain zoom levels, e.g. 'page-width'.
   */
_setSwitchInProgress:function(){this.switchInProgress&&clearTimeout(this.switchInProgress),this.switchInProgress=setTimeout(function(){delete this.switchInProgress,this._notifyStateChange()}.bind(this),DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS)},_resetSwitchInProgress:function(){this.switchInProgress&&(clearTimeout(this.switchInProgress),delete this.switchInProgress)},request:function(){if(!PDFViewerApplication.supportsFullscreen||this.isFullscreen||!this.viewer.hasChildNodes())return!1;if(this._setSwitchInProgress(),this._notifyStateChange(),this.container.requestFullscreen)this.container.requestFullscreen();else if(this.container.mozRequestFullScreen)this.container.mozRequestFullScreen();else if(this.container.webkitRequestFullscreen)this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);else{if(!this.container.msRequestFullscreen)return!1;this.container.msRequestFullscreen()}return this.args={page:PDFViewerApplication.page,previousScale:PDFViewerApplication.currentScaleValue},!0},_notifyStateChange:function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("presentationmodechanged",!0,!0,{active:PresentationMode.active,switchInProgress:!!PresentationMode.switchInProgress}),window.dispatchEvent(a)},enter:function(){this.active=!0,this._resetSwitchInProgress(),this._notifyStateChange(),
// Ensure that the correct page is scrolled into view when entering
// Presentation Mode, by waiting until fullscreen mode in enabled.
// Note: This is only necessary in non-Mozilla browsers.
setTimeout(function(){PDFViewerApplication.page=this.args.page,PDFViewerApplication.setScale("page-fit",!0)}.bind(this),0),window.addEventListener("mousemove",this.mouseMove,!1),window.addEventListener("mousedown",this.mouseDown,!1),window.addEventListener("contextmenu",this.contextMenu,!1),this.showControls(),HandTool.enterPresentationMode(),this.contextMenuOpen=!1,this.container.setAttribute("contextmenu","viewerContextMenu"),
// Text selection is disabled in Presentation Mode, thus it's not possible
// for the user to deselect text that is selected (e.g. with "Select all")
// when entering Presentation Mode, hence we remove any active selection.
window.getSelection().removeAllRanges()},exit:function(){var a=PDFViewerApplication.page;
// Ensure that the correct page is scrolled into view when exiting
// Presentation Mode, by waiting until fullscreen mode is disabled.
// Note: This is only necessary in non-Mozilla browsers.
setTimeout(function(){this.active=!1,this._notifyStateChange(),PDFViewerApplication.setScale(this.args.previousScale,!0),PDFViewerApplication.page=a,this.args=null}.bind(this),0),window.removeEventListener("mousemove",this.mouseMove,!1),window.removeEventListener("mousedown",this.mouseDown,!1),window.removeEventListener("contextmenu",this.contextMenu,!1),this.hideControls(),PDFViewerApplication.clearMouseScrollState(),HandTool.exitPresentationMode(),this.container.removeAttribute("contextmenu"),this.contextMenuOpen=!1,
// Ensure that the thumbnail of the current page is visible
// when exiting presentation mode.
scrollIntoView(document.getElementById("thumbnailContainer"+a))},showControls:function(){this.controlsTimeout?clearTimeout(this.controlsTimeout):this.container.classList.add(SELECTOR),this.controlsTimeout=setTimeout(function(){this.container.classList.remove(SELECTOR),delete this.controlsTimeout}.bind(this),DELAY_BEFORE_HIDING_CONTROLS)},hideControls:function(){this.controlsTimeout&&(this.container.classList.remove(SELECTOR),clearTimeout(this.controlsTimeout),delete this.controlsTimeout)},mouseMove:function(a){
// Workaround for a bug in WebKit browsers that causes the 'mousemove' event
// to be fired when the cursor is changed. For details, see:
// http://code.google.com/p/chromium/issues/detail?id=103041.
var b={x:a.clientX,y:a.clientY},c=PresentationMode.prevCoords;PresentationMode.prevCoords=b,(b.x!==c.x||b.y!==c.y)&&PresentationMode.showControls()},mouseDown:function(a){var b=PresentationMode;if(b.contextMenuOpen)return b.contextMenuOpen=!1,void a.preventDefault();if(0===a.button){
// Enable clicking of links in presentation mode. Please note:
// Only links pointing to destinations in the current PDF document work.
var c=a.target.href&&a.target.classList.contains("internalLink");c||(
// Unless an internal link was clicked, advance one page.
a.preventDefault(),PDFViewerApplication.page+=a.shiftKey?-1:1)}},contextMenu:function(a){PresentationMode.contextMenuOpen=!0}};!function(){function a(a){PresentationMode.isFullscreen?PresentationMode.enter():PresentationMode.exit()}window.addEventListener("fullscreenchange",a,!1),window.addEventListener("mozfullscreenchange",a,!1),window.addEventListener("webkitfullscreenchange",a,!1),window.addEventListener("MSFullscreenChange",a,!1)}();var GrabToPan=function(){/**
   * Construct a GrabToPan instance for a given HTML element.
   * @param options.element {Element}
   * @param options.ignoreTarget {function} optional. See `ignoreTarget(node)`
   * @param options.onActiveChanged {function(boolean)} optional. Called
   *  when grab-to-pan is (de)activated. The first argument is a boolean that
   *  shows whether grab-to-pan is activated.
   */
function a(a){this.element=a.element,this.document=a.element.ownerDocument,"function"==typeof a.ignoreTarget&&(this.ignoreTarget=a.ignoreTarget),this.onActiveChanged=a.onActiveChanged,
// Bind the contexts to ensure that `this` always points to
// the GrabToPan instance.
this.activate=this.activate.bind(this),this.deactivate=this.deactivate.bind(this),this.toggle=this.toggle.bind(this),this._onmousedown=this._onmousedown.bind(this),this._onmousemove=this._onmousemove.bind(this),this._endPan=this._endPan.bind(this);
// This overlay will be inserted in the document when the mouse moves during
// a grab operation, to ensure that the cursor has the desired appearance.
var b=this.overlay=document.createElement("div");b.className="grab-to-pan-grabbing"}/**
   * Whether the left mouse is not pressed.
   * @param event {MouseEvent}
   * @return {boolean} True if the left mouse button is not pressed.
   *                   False if unsure or if the left mouse button is pressed.
   */
function b(a){return"buttons"in a&&d?!(1|a.buttons):f||g?0===a.which:void 0}a.prototype={/**
     * Class name of element which can be grabbed
     */
CSS_CLASS_GRAB:"grab-to-pan-grab",/**
     * Bind a mousedown event to the element to enable grab-detection.
     */
activate:function(){this.active||(this.active=!0,this.element.addEventListener("mousedown",this._onmousedown,!0),this.element.classList.add(this.CSS_CLASS_GRAB),this.onActiveChanged&&this.onActiveChanged(!0))},/**
     * Removes all events. Any pending pan session is immediately stopped.
     */
deactivate:function(){this.active&&(this.active=!1,this.element.removeEventListener("mousedown",this._onmousedown,!0),this._endPan(),this.element.classList.remove(this.CSS_CLASS_GRAB),this.onActiveChanged&&this.onActiveChanged(!1))},toggle:function(){this.active?this.deactivate():this.activate()},/**
     * Whether to not pan if the target element is clicked.
     * Override this method to change the default behaviour.
     *
     * @param node {Element} The target of the event
     * @return {boolean} Whether to not react to the click event.
     */
ignoreTarget:function(a){
// Use matchesSelector to check whether the clicked element
// is (a child of) an input element / link
return a[c]("a[href], a[href] *, input, textarea, button, button *, select, option")},/**
     * @private
     */
_onmousedown:function(a){if(0===a.button&&!this.ignoreTarget(a.target)){if(a.originalTarget)try{/* jshint expr:true */
a.originalTarget.tagName}catch(b){
// Mozilla-specific: element is a scrollbar (XUL element)
return}this.scrollLeftStart=this.element.scrollLeft,this.scrollTopStart=this.element.scrollTop,this.clientXStart=a.clientX,this.clientYStart=a.clientY,this.document.addEventListener("mousemove",this._onmousemove,!0),this.document.addEventListener("mouseup",this._endPan,!0),
// When a scroll event occurs before a mousemove, assume that the user
// dragged a scrollbar (necessary for Opera Presto, Safari and IE)
// (not needed for Chrome/Firefox)
this.element.addEventListener("scroll",this._endPan,!0),a.preventDefault(),a.stopPropagation(),this.document.documentElement.classList.add(this.CSS_CLASS_GRABBING);var c=document.activeElement;c&&!c.contains(a.target)&&c.blur()}},/**
     * @private
     */
_onmousemove:function(a){if(this.element.removeEventListener("scroll",this._endPan,!0),b(a))return void this._endPan();var c=a.clientX-this.clientXStart,d=a.clientY-this.clientYStart;this.element.scrollTop=this.scrollTopStart-d,this.element.scrollLeft=this.scrollLeftStart-c,this.overlay.parentNode||document.body.appendChild(this.overlay)},/**
     * @private
     */
_endPan:function(){this.element.removeEventListener("scroll",this._endPan,!0),this.document.removeEventListener("mousemove",this._onmousemove,!0),this.document.removeEventListener("mouseup",this._endPan,!0),this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)}};
// Get the correct (vendor-prefixed) name of the matches method.
var c;["webkitM","mozM","msM","oM","m"].some(function(a){var b=a+"atches";return b in document.documentElement&&(c=b),b+="Selector",b in document.documentElement&&(c=b),c});
// Browser sniffing because it's impossible to feature-detect
// whether event.which for onmousemove is reliable
var d=!document.documentMode||document.documentMode>9,e=window.chrome,f=e&&(e.webstore||e.app),g=/Apple/.test(navigator.vendor)&&/Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);return a}(),HandTool={initialize:function(a){var b=a.toggleHandTool;this.handTool=new GrabToPan({element:a.container,onActiveChanged:function(a){b&&(a?(b.title=mozL10n.get("hand_tool_disable.title",null,"Disable hand tool"),b.firstElementChild.textContent=mozL10n.get("hand_tool_disable_label",null,"Disable hand tool")):(b.title=mozL10n.get("hand_tool_enable.title",null,"Enable hand tool"),b.firstElementChild.textContent=mozL10n.get("hand_tool_enable_label",null,"Enable hand tool")))}}),b&&(b.addEventListener("click",this.toggle.bind(this),!1),window.addEventListener("localized",function(a){Preferences.get("enableHandToolOnLoad").then(function(a){a&&this.handTool.activate()}.bind(this),function(a){})}.bind(this)))},toggle:function(){this.handTool.toggle(),SecondaryToolbar.close()},enterPresentationMode:function(){this.handTool.active&&(this.wasActive=!0,this.handTool.deactivate())},exitPresentationMode:function(){this.wasActive&&(this.wasActive=null,this.handTool.activate())}},OverlayManager={overlays:{},active:null,/**
   * @param {string} name The name of the overlay that is registered. This must
   *                 be equal to the ID of the overlay's DOM element.
   * @param {function} callerCloseMethod (optional) The method that, if present,
   *                   will call OverlayManager.close from the Object
   *                   registering the overlay. Access to this method is
   *                   necessary in order to run cleanup code when e.g.
   *                   the overlay is force closed. The default is null.
   * @param {boolean} canForceClose (optional) Indicates if opening the overlay
   *                  will close an active overlay. The default is false.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    registered.
   */
register:function(a,b,c){return new Promise(function(d){var e,f;if(!(a&&(e=document.getElementById(a))&&(f=e.parentNode)))throw new Error("Not enough parameters.");if(this.overlays[a])throw new Error("The overlay is already registered.");this.overlays[a]={element:e,container:f,callerCloseMethod:b||null,canForceClose:c||!1},d()}.bind(this))},/**
   * @param {string} name The name of the overlay that is unregistered.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    unregistered.
   */
unregister:function(a){return new Promise(function(b){if(!this.overlays[a])throw new Error("The overlay does not exist.");if(this.active===a)throw new Error("The overlay cannot be removed while it is active.");delete this.overlays[a],b()}.bind(this))},/**
   * @param {string} name The name of the overlay that should be opened.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    opened.
   */
open:function(a){return new Promise(function(b){if(!this.overlays[a])throw new Error("The overlay does not exist.");if(this.active){if(!this.overlays[a].canForceClose)throw new Error(this.active===a?"The overlay is already active.":"Another overlay is currently active.");this._closeThroughCaller()}this.active=a,this.overlays[this.active].element.classList.remove("hidden"),this.overlays[this.active].container.classList.remove("hidden"),window.addEventListener("keydown",this._keyDown),b()}.bind(this))},/**
   * @param {string} name The name of the overlay that should be closed.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    closed.
   */
close:function(a){return new Promise(function(b){if(!this.overlays[a])throw new Error("The overlay does not exist.");if(!this.active)throw new Error("The overlay is currently not active.");if(this.active!==a)throw new Error("Another overlay is currently active.");this.overlays[this.active].container.classList.add("hidden"),this.overlays[this.active].element.classList.add("hidden"),this.active=null,window.removeEventListener("keydown",this._keyDown),b()}.bind(this))},/**
   * @private
   */
_keyDown:function(a){var b=OverlayManager;b.active&&27===a.keyCode&&(// Esc key.
b._closeThroughCaller(),a.preventDefault())},/**
   * @private
   */
_closeThroughCaller:function(){this.overlays[this.active].callerCloseMethod&&this.overlays[this.active].callerCloseMethod(),this.active&&this.close(this.active)}},PasswordPrompt={overlayName:null,updatePassword:null,reason:null,passwordField:null,passwordText:null,passwordSubmit:null,passwordCancel:null,initialize:function(a){this.overlayName=a.overlayName,this.passwordField=a.passwordField,this.passwordText=a.passwordText,this.passwordSubmit=a.passwordSubmit,this.passwordCancel=a.passwordCancel,
// Attach the event listeners.
this.passwordSubmit.addEventListener("click",this.verifyPassword.bind(this)),this.passwordCancel.addEventListener("click",this.close.bind(this)),this.passwordField.addEventListener("keydown",function(a){13===a.keyCode&&// Enter key
this.verifyPassword()}.bind(this)),OverlayManager.register(this.overlayName,this.close.bind(this),!0)},open:function(){OverlayManager.open(this.overlayName).then(function(){this.passwordField.focus();var a=mozL10n.get("password_label",null,"Enter the password to open this PDF file.");this.reason===PDFJS.PasswordResponses.INCORRECT_PASSWORD&&(a=mozL10n.get("password_invalid",null,"Invalid password. Please try again.")),this.passwordText.textContent=a}.bind(this))},close:function(){OverlayManager.close(this.overlayName).then(function(){this.passwordField.value=""}.bind(this))},verifyPassword:function(){var a=this.passwordField.value;return a&&a.length>0?(this.close(),this.updatePassword(a)):void 0}},DocumentProperties={overlayName:null,rawFileSize:0,
// Document property fields (in the viewer).
fileNameField:null,fileSizeField:null,titleField:null,authorField:null,subjectField:null,keywordsField:null,creationDateField:null,modificationDateField:null,creatorField:null,producerField:null,versionField:null,pageCountField:null,url:null,pdfDocument:null,initialize:function(a){this.overlayName=a.overlayName,
// Set the document property fields.
this.fileNameField=a.fileNameField,this.fileSizeField=a.fileSizeField,this.titleField=a.titleField,this.authorField=a.authorField,this.subjectField=a.subjectField,this.keywordsField=a.keywordsField,this.creationDateField=a.creationDateField,this.modificationDateField=a.modificationDateField,this.creatorField=a.creatorField,this.producerField=a.producerField,this.versionField=a.versionField,this.pageCountField=a.pageCountField,
// Bind the event listener for the Close button.
a.closeButton&&a.closeButton.addEventListener("click",this.close.bind(this)),this.dataAvailablePromise=new Promise(function(a){this.resolveDataAvailable=a}.bind(this)),OverlayManager.register(this.overlayName,this.close.bind(this))},getProperties:function(){OverlayManager.active&&(
// Get the file size (if it hasn't already been set).
this.pdfDocument.getDownloadInfo().then(function(a){a.length!==this.rawFileSize&&(this.setFileSize(a.length),this.updateUI(this.fileSizeField,this.parseFileSize()))}.bind(this)),
// Get the document properties.
this.pdfDocument.getMetadata().then(function(a){var b=[{field:this.fileNameField,content:getPDFFileNameFromURL(this.url)},{field:this.fileSizeField,content:this.parseFileSize()},{field:this.titleField,content:a.info.Title},{field:this.authorField,content:a.info.Author},{field:this.subjectField,content:a.info.Subject},{field:this.keywordsField,content:a.info.Keywords},{field:this.creationDateField,content:this.parseDate(a.info.CreationDate)},{field:this.modificationDateField,content:this.parseDate(a.info.ModDate)},{field:this.creatorField,content:a.info.Creator},{field:this.producerField,content:a.info.Producer},{field:this.versionField,content:a.info.PDFFormatVersion},{field:this.pageCountField,content:this.pdfDocument.numPages}];
// Show the properties in the dialog.
for(var c in b){var d=b[c];this.updateUI(d.field,d.content)}}.bind(this)))},updateUI:function(a,b){a&&void 0!==b&&""!==b&&(a.textContent=b)},setFileSize:function(a){a>0&&(this.rawFileSize=a)},parseFileSize:function(){var a=this.rawFileSize,b=a/1024;return b?1024>b?mozL10n.get("document_properties_kb",{size_kb:(+b.toPrecision(3)).toLocaleString(),size_b:a.toLocaleString()},"{{size_kb}} KB ({{size_b}} bytes)"):mozL10n.get("document_properties_mb",{size_mb:(+(b/1024).toPrecision(3)).toLocaleString(),size_b:a.toLocaleString()},"{{size_mb}} MB ({{size_b}} bytes)"):void 0},open:function(){Promise.all([OverlayManager.open(this.overlayName),this.dataAvailablePromise]).then(function(){this.getProperties()}.bind(this))},close:function(){OverlayManager.close(this.overlayName)},parseDate:function(a){
// This is implemented according to the PDF specification (see
// http://www.gnupdf.org/Date for an overview), but note that
// Adobe Reader doesn't handle changing the date to universal time
// and doesn't use the user's time zone (they're effectively ignoring
// the HH' and mm' parts of the date string).
var b=a;if(void 0===b)return"";
// Remove the D: prefix if it is available.
"D:"===b.substring(0,2)&&(b=b.substring(2));
// Get all elements from the PDF date string.
// JavaScript's Date object expects the month to be between
// 0 and 11 instead of 1 and 12, so we're correcting for this.
var c=parseInt(b.substring(0,4),10),d=parseInt(b.substring(4,6),10)-1,e=parseInt(b.substring(6,8),10),f=parseInt(b.substring(8,10),10),g=parseInt(b.substring(10,12),10),h=parseInt(b.substring(12,14),10),i=b.substring(14,15),j=parseInt(b.substring(15,17),10),k=parseInt(b.substring(18,20),10);
// As per spec, utRel = 'Z' means equal to universal time.
// The other cases ('-' and '+') have to be handled here.
"-"===i?(f+=j,g+=k):"+"===i&&(f-=j,g-=k);
// Return the new date format from the user's locale.
var l=new Date(Date.UTC(c,d,e,f,g,h)),m=l.toLocaleDateString(),n=l.toLocaleTimeString();return mozL10n.get("document_properties_date_string",{date:m,time:n},"{{date}}, {{time}}")}},PresentationModeState={UNKNOWN:0,NORMAL:1,CHANGING:2,FULLSCREEN:3},IGNORE_CURRENT_POSITION_ON_ZOOM=!1,DEFAULT_CACHE_SIZE=10,CLEANUP_TIMEOUT=3e4,RenderingStates={INITIAL:0,RUNNING:1,PAUSED:2,FINISHED:3},PDFRenderingQueue=function(){/**
   * @constructs
   */
function a(){this.pdfViewer=null,this.pdfThumbnailViewer=null,this.onIdle=null,this.highestPriorityPage=null,this.idleTimeout=null,this.printing=!1,this.isThumbnailViewEnabled=!1}/** @lends PDFRenderingQueue.prototype */
return a.prototype={/**
     * @param {PDFViewer} pdfViewer
     */
setViewer:function(a){this.pdfViewer=a},/**
     * @param {PDFThumbnailViewer} pdfThumbnailViewer
     */
setThumbnailViewer:function(a){this.pdfThumbnailViewer=a},/**
     * @param {IRenderableView} view
     * @returns {boolean}
     */
isHighestPriority:function(a){return this.highestPriorityPage===a.renderingId},renderHighestPriority:function(a){this.idleTimeout&&(clearTimeout(this.idleTimeout),this.idleTimeout=null),
// Pages have a higher priority than thumbnails, so check them first.
this.pdfViewer.forceRendering(a)||this.pdfThumbnailViewer&&this.isThumbnailViewEnabled&&this.pdfThumbnailViewer.forceRendering()||this.printing||this.onIdle&&(this.idleTimeout=setTimeout(this.onIdle.bind(this),CLEANUP_TIMEOUT))},getHighestPriority:function(a,b,c){
// The state has changed figure out which page has the highest priority to
// render next (if any).
// Priority:
// 1 visible pages
// 2 if last scrolled down page after the visible pages
// 2 if last scrolled up page before the visible pages
var d=a.views,e=d.length;if(0===e)return!1;for(var f=0;e>f;++f){var g=d[f].view;if(!this.isViewFinished(g))return g}
// All the visible views have rendered, try to render next/previous pages.
if(c){var h=a.last.id;
// ID's start at 1 so no need to add 1.
if(b[h]&&!this.isViewFinished(b[h]))return b[h]}else{var i=a.first.id-2;if(b[i]&&!this.isViewFinished(b[i]))return b[i]}
// Everything that needs to be rendered has been.
return null},/**
     * @param {IRenderableView} view
     * @returns {boolean}
     */
isViewFinished:function(a){return a.renderingState===RenderingStates.FINISHED},/**
     * Render a page or thumbnail view. This calls the appropriate function
     * based on the views state. If the view is already rendered it will return
     * false.
     * @param {IRenderableView} view
     */
renderView:function(a){var b=a.renderingState;switch(b){case RenderingStates.FINISHED:return!1;case RenderingStates.PAUSED:this.highestPriorityPage=a.renderingId,a.resume();break;case RenderingStates.RUNNING:this.highestPriorityPage=a.renderingId;break;case RenderingStates.INITIAL:this.highestPriorityPage=a.renderingId;var c=function(){this.renderHighestPriority()}.bind(this);a.draw().then(c,c)}return!0}},a}(),TEXT_LAYER_RENDER_DELAY=200,PDFPageView=function(){/**
   * @constructs PDFPageView
   * @param {PDFPageViewOptions} options
   */
function a(a){var b=a.container,c=a.id,d=a.scale,e=a.defaultViewport,f=a.renderingQueue,g=a.textLayerFactory,h=a.annotationsLayerFactory;this.id=c,this.renderingId="page"+c,this.rotation=0,this.scale=d||1,this.viewport=e,this.pdfPageRotate=e.rotation,this.hasRestrictedScaling=!1,this.renderingQueue=f,this.textLayerFactory=g,this.annotationsLayerFactory=h,this.renderingState=RenderingStates.INITIAL,this.resume=null,this.onBeforeDraw=null,this.onAfterDraw=null,this.textLayer=null,this.zoomLayer=null,this.annotationLayer=null;var i=document.createElement("div");i.id="pageContainer"+this.id,i.className="page",i.style.width=Math.floor(this.viewport.width)+"px",i.style.height=Math.floor(this.viewport.height)+"px",this.div=i,b.appendChild(i)}return a.prototype={setPdfPage:function(a){this.pdfPage=a,this.pdfPageRotate=a.rotate;var b=(this.rotation+this.pdfPageRotate)%360;this.viewport=a.getViewport(this.scale*CSS_UNITS,b),this.stats=a.stats,this.reset()},destroy:function(){this.zoomLayer=null,this.reset(),this.pdfPage&&this.pdfPage.destroy()},reset:function(a){this.renderTask&&this.renderTask.cancel(),this.resume=null,this.renderingState=RenderingStates.INITIAL;var b=this.div;b.style.width=Math.floor(this.viewport.width)+"px",b.style.height=Math.floor(this.viewport.height)+"px";for(var c=b.childNodes,d=this.zoomLayer||null,e=a&&this.annotationLayer&&this.annotationLayer.div||null,f=c.length-1;f>=0;f--){var g=c[f];d!==g&&e!==g&&b.removeChild(g)}b.removeAttribute("data-loaded"),a?this.annotationLayer&&
// Hide annotationLayer until all elements are resized
// so they are not displayed on the already-resized page
this.annotationLayer.hide():this.annotationLayer=null,this.canvas&&(
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
this.canvas.width=0,this.canvas.height=0,delete this.canvas),this.loadingIconDiv=document.createElement("div"),this.loadingIconDiv.className="loadingIcon",b.appendChild(this.loadingIconDiv)},update:function(a,b){this.scale=a||this.scale,"undefined"!=typeof b&&(this.rotation=b);var c=(this.rotation+this.pdfPageRotate)%360;this.viewport=this.viewport.clone({scale:this.scale*CSS_UNITS,rotation:c});var d=!1;if(this.canvas&&PDFJS.maxCanvasPixels>0){var e=this.canvas.getContext("2d"),f=getOutputScale(e),g=this.viewport.width*this.viewport.height;Math.sqrt(PDFJS.maxCanvasPixels/g);(Math.floor(this.viewport.width)*f.sx|0)*(Math.floor(this.viewport.height)*f.sy|0)>PDFJS.maxCanvasPixels&&(d=!0)}return this.canvas&&(PDFJS.useOnlyCssZoom||this.hasRestrictedScaling&&d)?void this.cssTransform(this.canvas,!0):(this.canvas&&!this.zoomLayer&&(this.zoomLayer=this.canvas.parentNode,this.zoomLayer.style.position="absolute"),this.zoomLayer&&this.cssTransform(this.zoomLayer.firstChild),void this.reset(!0))},/**
     * Called when moved in the parent's container.
     */
updatePosition:function(){this.textLayer&&this.textLayer.render(TEXT_LAYER_RENDER_DELAY)},cssTransform:function(a,b){
// Scale canvas, canvas wrapper, and page container.
var c=this.viewport.width,d=this.viewport.height,e=this.div;a.style.width=a.parentNode.style.width=e.style.width=Math.floor(c)+"px",a.style.height=a.parentNode.style.height=e.style.height=Math.floor(d)+"px";
// The canvas may have been originally rotated, rotate relative to that.
var f=this.viewport.rotation-a._viewport.rotation,g=Math.abs(f),h=1,i=1;(90===g||270===g)&&(
// Scale x and y because of the rotation.
h=d/c,i=c/d);var j="rotate("+f+"deg) scale("+h+","+i+")";if(CustomStyle.setProp("transform",a,j),this.textLayer){
// Rotating the text layer is more complicated since the divs inside the
// the text layer are rotated.
// TODO: This could probably be simplified by drawing the text layer in
// one orientation then rotating overall.
var k=this.textLayer.viewport,l=this.viewport.rotation-k.rotation,m=Math.abs(l),n=c/k.width;(90===m||270===m)&&(n=c/k.height);var o,p,q=this.textLayer.textLayerDiv;switch(m){case 0:o=p=0;break;case 90:o=0,p="-"+q.style.height;break;case 180:o="-"+q.style.width,p="-"+q.style.height;break;case 270:o="-"+q.style.width,p=0;break;default:console.error("Bad rotation value.")}CustomStyle.setProp("transform",q,"rotate("+m+"deg) scale("+n+", "+n+") translate("+o+", "+p+")"),CustomStyle.setProp("transformOrigin",q,"0% 0%")}b&&this.annotationLayer&&this.annotationLayer.setupAnnotations(this.viewport)},get width(){return this.viewport.width},get height(){return this.viewport.height},getPagePoint:function(a,b){return this.viewport.convertToPdfPoint(a,b)},draw:function(){function a(a){if(
// The renderTask may have been replaced by a new one, so only remove
// the reference to the renderTask if it matches the one that is
// triggering this callback.
t===q.renderTask&&(q.renderTask=null),"cancelled"===a)return void o(a);q.renderingState=RenderingStates.FINISHED,q.loadingIconDiv&&(d.removeChild(q.loadingIconDiv),delete q.loadingIconDiv),q.zoomLayer&&(d.removeChild(q.zoomLayer),q.zoomLayer=null),q.error=a,q.stats=b.stats,q.onAfterDraw&&q.onAfterDraw();var c=document.createEvent("CustomEvent");c.initCustomEvent("pagerendered",!0,!0,{pageNumber:q.id}),d.dispatchEvent(c);
// This custom event is deprecated, and will be removed in the future,
// please use the |pagerendered| event instead.
var e=document.createEvent("CustomEvent");e.initCustomEvent("pagerender",!0,!0,{pageNumber:b.pageNumber}),d.dispatchEvent(e),a?o(a):n(void 0)}this.renderingState!==RenderingStates.INITIAL&&console.error("Must be in new state before drawing"),this.renderingState=RenderingStates.RUNNING;var b=this.pdfPage,c=this.viewport,d=this.div,e=document.createElement("div");e.style.width=d.style.width,e.style.height=d.style.height,e.classList.add("canvasWrapper");var f=document.createElement("canvas");f.id="page"+this.id,e.appendChild(f),this.annotationLayer?
// annotationLayer needs to stay on top
d.insertBefore(e,this.annotationLayer.div):d.appendChild(e),this.canvas=f;var g=f.getContext("2d"),h=getOutputScale(g);if(PDFJS.useOnlyCssZoom){var i=c.clone({scale:CSS_UNITS});
// Use a scale that will make the canvas be the original intended size
// of the page.
h.sx*=i.width/c.width,h.sy*=i.height/c.height,h.scaled=!0}if(PDFJS.maxCanvasPixels>0){var j=c.width*c.height,k=Math.sqrt(PDFJS.maxCanvasPixels/j);h.sx>k||h.sy>k?(h.sx=k,h.sy=k,h.scaled=!0,this.hasRestrictedScaling=!0):this.hasRestrictedScaling=!1}f.width=Math.floor(c.width)*h.sx|0,f.height=Math.floor(c.height)*h.sy|0,f.style.width=Math.floor(c.width)+"px",f.style.height=Math.floor(c.height)+"px",
// Add the viewport so it's known what it was originally drawn with.
f._viewport=c;var l=null,m=null;this.textLayerFactory&&(l=document.createElement("div"),l.className="textLayer",l.style.width=f.style.width,l.style.height=f.style.height,this.annotationLayer?
// annotationLayer needs to stay on top
d.insertBefore(l,this.annotationLayer.div):d.appendChild(l),m=this.textLayerFactory.createTextLayerBuilder(l,this.id-1,this.viewport)),this.textLayer=m,
// TODO(mack): use data attributes to store these
g._scaleX=h.sx,g._scaleY=h.sy,h.scaled&&g.scale(h.sx,h.sy);var n,o,p=new Promise(function(a,b){n=a,o=b}),q=this,r=null;this.renderingQueue&&(r=function(a){return q.renderingQueue.isHighestPriority(q)?void a():(q.renderingState=RenderingStates.PAUSED,void(q.resume=function(){q.renderingState=RenderingStates.RUNNING,a()}))});var s={canvasContext:g,viewport:this.viewport,
// intent: 'default', // === 'display'
continueCallback:r},t=this.renderTask=this.pdfPage.render(s);return this.renderTask.promise.then(function(){a(null),m&&q.pdfPage.getTextContent().then(function(a){m.setTextContent(a),m.render(TEXT_LAYER_RENDER_DELAY)})},function(b){a(b)}),this.annotationsLayerFactory&&(this.annotationLayer||(this.annotationLayer=this.annotationsLayerFactory.createAnnotationsLayerBuilder(d,this.pdfPage)),this.annotationLayer.setupAnnotations(this.viewport)),d.setAttribute("data-loaded",!0),q.onBeforeDraw&&q.onBeforeDraw(),p},beforePrint:function(){var a=this.pdfPage,b=a.getViewport(1),c=2,d=document.createElement("canvas");d.width=Math.floor(b.width)*c,d.height=Math.floor(b.height)*c,d.style.width=c*b.width+"pt",d.style.height=c*b.height+"pt";var e="scale("+1/c+", "+1/c+")";CustomStyle.setProp("transform",d,e),CustomStyle.setProp("transformOrigin",d,"0% 0%");var f=document.getElementById("printContainer"),g=document.createElement("div");g.style.width=b.width+"pt",g.style.height=b.height+"pt",g.appendChild(d),f.appendChild(g),d.mozPrintCallback=function(e){var f=e.context;f.save(),f.fillStyle="rgb(255, 255, 255)",f.fillRect(0,0,d.width,d.height),f.restore(),f.scale(c,c);var g={canvasContext:f,viewport:b,intent:"print"};a.render(g).promise.then(function(){
// Tell the printEngine that rendering this canvas/page has finished.
e.done()},function(a){console.error(a),
// Tell the printEngine that rendering this canvas/page has failed.
// This will make the print proces stop.
"abort"in e?e.abort():e.done()})}}},a}(),MAX_TEXT_DIVS_TO_RENDER=1e5,NonWhitespaceRegexp=/\S/,TextLayerBuilder=function(){function a(a){this.textLayerDiv=a.textLayerDiv,this.renderingDone=!1,this.divContentDone=!1,this.pageIdx=a.pageIndex,this.pageNumber=this.pageIdx+1,this.matches=[],this.viewport=a.viewport,this.textDivs=[],this.findController=a.findController||null}return a.prototype={_finishRendering:function(){this.renderingDone=!0;var a=document.createEvent("CustomEvent");a.initCustomEvent("textlayerrendered",!0,!0,{pageNumber:this.pageNumber}),this.textLayerDiv.dispatchEvent(a)},renderLayer:function(){var a=document.createDocumentFragment(),b=this.textDivs,c=b.length,d=document.createElement("canvas"),e=d.getContext("2d");
// No point in rendering many divs as it would make the browser
// unusable even after the divs are rendered.
if(c>MAX_TEXT_DIVS_TO_RENDER)return void this._finishRendering();for(var f,g,h=0;c>h;h++){var i=b[h];if(void 0===i.dataset.isWhitespace){var j=i.style.fontSize,k=i.style.fontFamily;
// Only build font string and set to context if different from last.
(j!==f||k!==g)&&(e.font=j+" "+k,f=j,g=k);var l=e.measureText(i.textContent).width;if(l>0){a.appendChild(i);var m;if(void 0!==i.dataset.canvasWidth){
// Dataset values come of type string.
var n=i.dataset.canvasWidth/l;m="scaleX("+n+")"}else m="";var o=i.dataset.angle;o&&(m="rotate("+o+"deg) "+m),m&&CustomStyle.setProp("transform",i,m)}}}this.textLayerDiv.appendChild(a),this._finishRendering(),this.updateMatches()},/**
     * Renders the text layer.
     * @param {number} timeout (optional) if specified, the rendering waits
     *   for specified amount of ms.
     */
render:function(a){if(this.divContentDone&&!this.renderingDone)if(this.renderTimer&&(clearTimeout(this.renderTimer),this.renderTimer=null),a){// Schedule
var b=this;this.renderTimer=setTimeout(function(){b.renderLayer(),b.renderTimer=null},a)}else// Render right away
this.renderLayer()},appendText:function(a,b){var c=b[a.fontName],d=document.createElement("div");if(this.textDivs.push(d),isAllWhitespace(a.str))return void(d.dataset.isWhitespace=!0);var e=PDFJS.Util.transform(this.viewport.transform,a.transform),f=Math.atan2(e[1],e[0]);c.vertical&&(f+=Math.PI/2);var g=Math.sqrt(e[2]*e[2]+e[3]*e[3]),h=g;c.ascent?h=c.ascent*h:c.descent&&(h=(1+c.descent)*h);var i,j;0===f?(i=e[4],j=e[5]-h):(i=e[4]+h*Math.sin(f),j=e[5]-h*Math.cos(f)),d.style.left=i+"px",d.style.top=j+"px",d.style.fontSize=g+"px",d.style.fontFamily=c.fontFamily,d.textContent=a.str,
// |fontName| is only used by the Font Inspector. This test will succeed
// when e.g. the Font Inspector is off but the Stepper is on, but it's
// not worth the effort to do a more accurate test.
PDFJS.pdfBug&&(d.dataset.fontName=a.fontName),
// Storing into dataset will convert number into string.
0!==f&&(d.dataset.angle=f*(180/Math.PI)),
// We don't bother scaling single-char text divs, because it has very
// little effect on text highlighting. This makes scrolling on docs with
// lots of such divs a lot faster.
d.textContent.length>1&&(c.vertical?d.dataset.canvasWidth=a.height*this.viewport.scale:d.dataset.canvasWidth=a.width*this.viewport.scale)},setTextContent:function(a){this.textContent=a;for(var b=a.items,c=0,d=b.length;d>c;c++)this.appendText(b[c],a.styles);this.divContentDone=!0},convertMatches:function(a){for(var b=0,c=0,d=this.textContent.items,e=d.length-1,f=null===this.findController?0:this.findController.state.query.length,g=[],h=0,i=a.length;i>h;h++){
// Loop over the divIdxs.
for(
// Calculate the start position.
var j=a[h];b!==e&&j>=c+d[b].str.length;)c+=d[b].str.length,b++;b===d.length&&console.error("Could not find a matching mapping");var k={begin:{divIdx:b,offset:j-c}};
// Somewhat the same array as above, but use > instead of >= to get
// the end position right.
for(
// Calculate the end position.
j+=f;b!==e&&j>c+d[b].str.length;)c+=d[b].str.length,b++;k.end={divIdx:b,offset:j-c},g.push(k)}return g},renderMatches:function(a){function b(a,b){var d=a.divIdx;e[d].textContent="",c(d,0,a.offset,b)}function c(a,b,c,f){var g=e[a],h=d[a].str.substring(b,c),i=document.createTextNode(h);if(f){var j=document.createElement("span");return j.className=f,j.appendChild(i),void g.appendChild(j)}g.appendChild(i)}
// Early exit if there is nothing to render.
if(0!==a.length){var d=this.textContent.items,e=this.textDivs,f=null,g=this.pageIdx,h=null===this.findController?!1:g===this.findController.selected.pageIdx,i=null===this.findController?-1:this.findController.selected.matchIdx,j=null===this.findController?!1:this.findController.state.highlightAll,k={divIdx:-1,offset:void 0},l=i,m=l+1;if(j)l=0,m=a.length;else if(!h)
// Not highlighting all and this isn't the selected page, so do nothing.
return;for(var n=l;m>n;n++){var o=a[n],p=o.begin,q=o.end,r=h&&n===i,s=r?" selected":"";if(this.findController&&this.findController.updateMatchPosition(g,n,e,p.divIdx,q.divIdx),
// Match inside new div.
f&&p.divIdx===f.divIdx?c(f.divIdx,f.offset,p.offset):(
// If there was a previous div, then add the text at the end.
null!==f&&c(f.divIdx,f.offset,k.offset),
// Clear the divs and set the content until the starting point.
b(p)),p.divIdx===q.divIdx)c(p.divIdx,p.offset,q.offset,"highlight"+s);else{c(p.divIdx,p.offset,k.offset,"highlight begin"+s);for(var t=p.divIdx+1,u=q.divIdx;u>t;t++)e[t].className="highlight middle"+s;b(q,"highlight end"+s)}f=q}f&&c(f.divIdx,f.offset,k.offset)}},updateMatches:function(){
// Only show matches when all rendering is done.
if(this.renderingDone){
// Clear all current matches.
for(var a=this.matches,b=this.textDivs,c=this.textContent.items,d=-1,e=0,f=a.length;f>e;e++){for(var g=a[e],h=Math.max(d,g.begin.divIdx),i=h,j=g.end.divIdx;j>=i;i++){var k=b[i];k.textContent=c[i].str,k.className=""}d=g.end.divIdx+1}null!==this.findController&&this.findController.active&&(
// Convert the matches on the page controller into the match format
// used for the textLayer.
this.matches=this.convertMatches(null===this.findController?[]:this.findController.pageMatches[this.pageIdx]||[]),this.renderMatches(this.matches))}}},a}();DefaultTextLayerFactory.prototype={/**
   * @param {HTMLDivElement} textLayerDiv
   * @param {number} pageIndex
   * @param {PageViewport} viewport
   * @returns {TextLayerBuilder}
   */
createTextLayerBuilder:function(a,b,c){return new TextLayerBuilder({textLayerDiv:a,pageIndex:b,viewport:c})}};/**
 * @typedef {Object} AnnotationsLayerBuilderOptions
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPage} pdfPage
 * @property {IPDFLinkService} linkService
 */
/**
 * @class
 */
var AnnotationsLayerBuilder=function(){/**
   * @param {AnnotationsLayerBuilderOptions} options
   * @constructs AnnotationsLayerBuilder
   */
function a(a){this.pageDiv=a.pageDiv,this.pdfPage=a.pdfPage,this.linkService=a.linkService,this.div=null}/** @lends AnnotationsLayerBuilder.prototype */
return a.prototype={/**
     * @param {PageViewport} viewport
     */
setupAnnotations:function(a){function b(a,b){a.href=d.getDestinationHash(b),a.onclick=function(){return b&&d.navigateTo(b),!1},b&&(a.className="internalLink")}function c(a,b){a.href=d.getAnchorUrl(""),a.onclick=function(){return d.executeNamedAction(b),!1},a.className="internalLink"}var d=this.linkService,e=this.pdfPage,f=this;e.getAnnotations().then(function(d){a=a.clone({dontFlip:!0});var g,h,i,j,k=a.transform,l="matrix("+k.join(",")+")";if(f.div){
// If an annotationLayer already exists, refresh its children's
// transformation matrices
for(i=0,j=d.length;j>i;i++)g=d[i],h=f.div.querySelector('[data-annotation-id="'+g.id+'"]'),h&&CustomStyle.setProp("transform",h,l);
// See PDFPageView.reset()
f.div.removeAttribute("hidden")}else for(i=0,j=d.length;j>i;i++)if(g=d[i],g&&g.hasHtml){h=PDFJS.AnnotationUtils.getHtmlElement(g,e.commonObjs),h.setAttribute("data-annotation-id",g.id),"undefined"!=typeof mozL10n&&mozL10n.translate(h);var m=g.rect,n=e.view;m=PDFJS.Util.normalizeRect([m[0],n[3]-m[1]+n[1],m[2],n[3]-m[3]+n[1]]),h.style.left=m[0]+"px",h.style.top=m[1]+"px",h.style.position="absolute",CustomStyle.setProp("transform",h,l);var o=-m[0]+"px "+-m[1]+"px";if(CustomStyle.setProp("transformOrigin",h,o),"Link"===g.subtype&&!g.url){var p=h.getElementsByTagName("a")[0];p&&(g.action?c(p,g.action):b(p,"dest"in g?g.dest:null))}if(!f.div){var q=document.createElement("div");q.className="annotationLayer",f.pageDiv.appendChild(q),f.div=q}f.div.appendChild(h)}})},hide:function(){this.div&&this.div.setAttribute("hidden","true")}},a}();DefaultAnnotationsLayerFactory.prototype={/**
   * @param {HTMLDivElement} pageDiv
   * @param {PDFPage} pdfPage
   * @returns {AnnotationsLayerBuilder}
   */
createAnnotationsLayerBuilder:function(a,b){return new AnnotationsLayerBuilder({pageDiv:a,pdfPage:b})}};/**
 * @typedef {Object} PDFViewerOptions
 * @property {HTMLDivElement} container - The container for the viewer element.
 * @property {HTMLDivElement} viewer - (optional) The viewer element.
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 * @property {PDFRenderingQueue} renderingQueue - (optional) The rendering
 *   queue object.
 */
/**
 * Simple viewer control to display PDF content/pages.
 * @class
 * @implements {IRenderableView}
 */
var PDFViewer=function(){function a(a){var b=[];this.push=function(c){var d=b.indexOf(c);d>=0&&b.splice(d,1),b.push(c),b.length>a&&b.shift().destroy()},this.resize=function(c){for(a=c;b.length>a;)b.shift().destroy()}}/**
   * @constructs PDFViewer
   * @param {PDFViewerOptions} options
   */
function b(a){this.container=a.container,this.viewer=a.viewer||a.container.firstElementChild,this.linkService=a.linkService||new SimpleLinkService(this),this.defaultRenderingQueue=!a.renderingQueue,this.defaultRenderingQueue?(
// Custom rendering queue is not specified, using default one
this.renderingQueue=new PDFRenderingQueue,this.renderingQueue.setViewer(this)):this.renderingQueue=a.renderingQueue,this.scroll=watchScroll(this.container,this._scrollUpdate.bind(this)),this.updateInProgress=!1,this.presentationModeState=PresentationModeState.UNKNOWN,this._resetView()}/** @lends PDFViewer.prototype */
return b.prototype={get pagesCount(){return this.pages.length},getPageView:function(a){return this.pages[a]},get currentPageNumber(){return this._currentPageNumber},set currentPageNumber(a){if(!this.pdfDocument)return void(this._currentPageNumber=a);var b=document.createEvent("UIEvents");return b.initUIEvent("pagechange",!0,!0,window,0),b.updateInProgress=this.updateInProgress,a>0&&a<=this.pagesCount?(b.previousPageNumber=this._currentPageNumber,this._currentPageNumber=a,b.pageNumber=a,void this.container.dispatchEvent(b)):(b.pageNumber=this._currentPageNumber,b.previousPageNumber=a,void this.container.dispatchEvent(b))},/**
     * @returns {number}
     */
get currentScale(){return this._currentScale},/**
     * @param {number} val - Scale of the pages in percents.
     */
set currentScale(a){if(isNaN(a))throw new Error("Invalid numeric scale");return this.pdfDocument?void this._setScale(a,!1):(this._currentScale=a,void(this._currentScaleValue=a.toString()))},/**
     * @returns {string}
     */
get currentScaleValue(){return this._currentScaleValue},/**
     * @param val - The scale of the pages (in percent or predefined value).
     */
set currentScaleValue(a){return this.pdfDocument?void this._setScale(a,!1):(this._currentScale=isNaN(a)?UNKNOWN_SCALE:a,void(this._currentScaleValue=a))},/**
     * @returns {number}
     */
get pagesRotation(){return this._pagesRotation},/**
     * @param {number} rotation - The rotation of the pages (0, 90, 180, 270).
     */
set pagesRotation(a){this._pagesRotation=a;for(var b=0,c=this.pages.length;c>b;b++){var d=this.pages[b];d.update(d.scale,a)}this._setScale(this._currentScaleValue,!0)},/**
     * @param pdfDocument {PDFDocument}
     */
setDocument:function(a){if(this.pdfDocument&&this._resetView(),this.pdfDocument=a,a){var b,c=a.numPages,d=this.pagesRefMap={},e=this,f=new Promise(function(a){b=a});this.pagesPromise=f,f.then(function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("pagesloaded",!0,!0,{pagesCount:c}),e.container.dispatchEvent(a)});var g=!1,h=null,i=new Promise(function(a){h=a});this.onePageRendered=i;var j=function(a){a.onBeforeDraw=function(){
// Add the page to the buffer at the start of drawing. That way it can
// be evicted from the buffer and destroyed even if we pause its
// rendering.
e._buffer.push(this)},
// when page is painted, using the image as thumbnail base
a.onAfterDraw=function(){g||(g=!0,h())}},k=a.getPage(1);
// Fetch a single page so we can get a viewport that will be the default
// viewport for all pages
return this.firstPagePromise=k,k.then(function(f){for(var g=this._currentScale||1,h=f.getViewport(g*CSS_UNITS),k=1;c>=k;++k){var l=null;PDFJS.disableTextLayer||(l=this);var m=new PDFPageView({container:this.viewer,id:k,scale:g,defaultViewport:h.clone(),renderingQueue:this.renderingQueue,textLayerFactory:l,annotationsLayerFactory:this});j(m),this.pages.push(m)}
// Fetch all the pages since the viewport is needed before printing
// starts to create the correct size canvas. Wait until one page is
// rendered so we don't tie up too many resources early on.
i.then(function(){if(PDFJS.disableAutoFetch)
// XXX: Printing is semi-broken with auto fetch disabled.
b();else for(var f=c,g=1;c>=g;++g)a.getPage(g).then(function(a,c){var g=e.pages[a-1];g.pdfPage||g.setPdfPage(c);var h=c.ref.num+" "+c.ref.gen+" R";d[h]=a,f--,f||b()}.bind(null,g))});var n=document.createEvent("CustomEvent");n.initCustomEvent("pagesinit",!0,!0,null),e.container.dispatchEvent(n),this.defaultRenderingQueue&&this.update(),this.findController&&this.findController.resolveFirstPage()}.bind(this))}},_resetView:function(){this.pages=[],this._currentPageNumber=1,this._currentScale=UNKNOWN_SCALE,this._currentScaleValue=null,this._buffer=new a(DEFAULT_CACHE_SIZE),this.location=null,this._pagesRotation=0,this._pagesRequests=[];for(var b=this.viewer;b.hasChildNodes();)b.removeChild(b.lastChild)},_scrollUpdate:function(){if(0!==this.pagesCount){this.update();for(var a=0,b=this.pages.length;b>a;a++)this.pages[a].updatePosition()}},_setScaleDispatchEvent:function(a,b,c){var d=document.createEvent("UIEvents");d.initUIEvent("scalechange",!0,!0,window,0),d.scale=a,c&&(d.presetValue=b),this.container.dispatchEvent(d)},_setScaleUpdatePages:function(a,b,c,d){if(this._currentScaleValue=b,a===this._currentScale)return void(d&&this._setScaleDispatchEvent(a,b,!0));for(var e=0,f=this.pages.length;f>e;e++)this.pages[e].update(a);if(this._currentScale=a,!c){var g,h=this._currentPageNumber,i=this.presentationModeState===PresentationModeState.CHANGING||this.presentationModeState===PresentationModeState.FULLSCREEN;!this.location||i||IGNORE_CURRENT_POSITION_ON_ZOOM||(h=this.location.pageNumber,g=[null,{name:"XYZ"},this.location.left,this.location.top,null]),this.scrollPageIntoView(h,g)}this._setScaleDispatchEvent(a,b,d)},_setScale:function(a,b){if("custom"!==a){var c=parseFloat(a);if(c>0)this._setScaleUpdatePages(c,a,b,!1);else{var d=this.pages[this._currentPageNumber-1];if(!d)return;var e=this.presentationModeState===PresentationModeState.FULLSCREEN,f=e?0:VERTICAL_PADDING,g=this.container.clientWidth/d.width*d.scale,h=(this.container.clientHeight-f)/d.height*d.scale;switch(a){case"page-actual":c=1;break;case"page-width":c=g;break;case"page-height":c=h;break;case"page-fit":c=Math.min(g,h);break;case"auto":var i=d.width>d.height,j=i?Math.min(h,g):g;c=Math.min(MAX_AUTO_SCALE,j);break;default:return void console.error("pdfViewSetScale: '"+a+"' is an unknown zoom value.")}this._setScaleUpdatePages(c,a,b,!0)}}},/**
     * Scrolls page into view.
     * @param {number} pageNumber
     * @param {Array} dest - (optional) original PDF destination array:
     *   <page-ref> </XYZ|FitXXX> <args..>
     */
scrollPageIntoView:function(a,b){var c=this.pages[a-1];if(this.presentationModeState===PresentationModeState.FULLSCREEN){if(this.linkService.page!==c.id)
// Avoid breaking getVisiblePages in presentation mode.
return void(this.linkService.page=c.id);b=null,
// Fixes the case when PDF has different page sizes.
this._setScale(this.currentScaleValue,!0)}if(!b)return void scrollIntoView(c.div);var d,e,f=0,g=0,h=0,i=0,j=c.rotation%180===0?!1:!0,k=(j?c.height:c.width)/c.scale/CSS_UNITS,l=(j?c.width:c.height)/c.scale/CSS_UNITS,m=0;switch(b[1].name){case"XYZ":f=b[2],g=b[3],m=b[4],
// If x and/or y coordinates are not supplied, default to
// _top_ left of the page (not the obvious bottom left,
// since aligning the bottom of the intended page with the
// top of the window is rarely helpful).
f=null!==f?f:0,g=null!==g?g:l;break;case"Fit":case"FitB":m="page-fit";break;case"FitH":case"FitBH":g=b[2],m="page-width";break;case"FitV":case"FitBV":f=b[2],h=k,i=l,m="page-height";break;case"FitR":f=b[2],g=b[3],h=b[4]-f,i=b[5]-g;var n=this.container;d=(n.clientWidth-SCROLLBAR_PADDING)/h/CSS_UNITS,e=(n.clientHeight-SCROLLBAR_PADDING)/i/CSS_UNITS,m=Math.min(Math.abs(d),Math.abs(e));break;default:return}if(m&&m!==this.currentScale?this.currentScaleValue=m:this.currentScale===UNKNOWN_SCALE&&(this.currentScaleValue=DEFAULT_SCALE),"page-fit"===m&&!b[4])return void scrollIntoView(c.div);var o=[c.viewport.convertToViewportPoint(f,g),c.viewport.convertToViewportPoint(f+h,g+i)],p=Math.min(o[0][0],o[1][0]),q=Math.min(o[0][1],o[1][1]);scrollIntoView(c.div,{left:p,top:q})},_updateLocation:function(a){var b=this._currentScale,c=this._currentScaleValue,d=parseFloat(c)===b?Math.round(1e4*b)/100:c,e=a.id,f="#page="+e;f+="&zoom="+d;var g=this.pages[e-1],h=this.container,i=g.getPagePoint(h.scrollLeft-a.x,h.scrollTop-a.y),j=Math.round(i[0]),k=Math.round(i[1]);f+=","+j+","+k,this.location={pageNumber:e,scale:d,top:k,left:j,pdfOpenParams:f}},update:function(){var a=this._getVisiblePages(),b=a.views;if(0!==b.length){this.updateInProgress=!0;var c=Math.max(DEFAULT_CACHE_SIZE,2*b.length+1);this._buffer.resize(c),this.renderingQueue.renderHighestPriority(a);for(var d=this.currentPageNumber,e=a.first,f=0,g=b.length,h=!1;g>f;++f){var i=b[f];if(i.percent<100)break;if(i.id===d){h=!0;break}}h||(d=b[0].id),this.presentationModeState!==PresentationModeState.FULLSCREEN&&(this.currentPageNumber=d),this._updateLocation(e),this.updateInProgress=!1;var j=document.createEvent("UIEvents");j.initUIEvent("updateviewarea",!0,!0,window,0),this.container.dispatchEvent(j)}},containsElement:function(a){return this.container.contains(a)},focus:function(){this.container.focus()},blur:function(){this.container.blur()},get isHorizontalScrollbarEnabled(){return this.presentationModeState===PresentationModeState.FULLSCREEN?!1:this.container.scrollWidth>this.container.clientWidth},_getVisiblePages:function(){if(this.presentationModeState!==PresentationModeState.FULLSCREEN)return getVisibleElements(this.container,this.pages,!0);
// The algorithm in getVisibleElements doesn't work in all browsers and
// configurations when presentation mode is active.
var a=[],b=this.pages[this._currentPageNumber-1];return a.push({id:b.id,view:b}),{first:b,last:b,views:a}},cleanup:function(){for(var a=0,b=this.pages.length;b>a;a++)this.pages[a]&&this.pages[a].renderingState!==RenderingStates.FINISHED&&this.pages[a].reset()},/**
     * @param {PDFPageView} pageView
     * @returns {PDFPage}
     * @private
     */
_ensurePdfPageLoaded:function(a){if(a.pdfPage)return Promise.resolve(a.pdfPage);var b=a.id;if(this._pagesRequests[b])return this._pagesRequests[b];var c=this.pdfDocument.getPage(b).then(function(c){return a.setPdfPage(c),this._pagesRequests[b]=null,c}.bind(this));return this._pagesRequests[b]=c,c},forceRendering:function(a){var b=a||this._getVisiblePages(),c=this.renderingQueue.getHighestPriority(b,this.pages,this.scroll.down);return c?(this._ensurePdfPageLoaded(c).then(function(){this.renderingQueue.renderView(c)}.bind(this)),!0):!1},getPageTextContent:function(a){return this.pdfDocument.getPage(a+1).then(function(a){return a.getTextContent()})},/**
     * @param {HTMLDivElement} textLayerDiv
     * @param {number} pageIndex
     * @param {PageViewport} viewport
     * @returns {TextLayerBuilder}
     */
createTextLayerBuilder:function(a,b,c){var d=this.presentationModeState===PresentationModeState.FULLSCREEN;return new TextLayerBuilder({textLayerDiv:a,pageIndex:b,viewport:c,findController:d?null:this.findController})},/**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @returns {AnnotationsLayerBuilder}
     */
createAnnotationsLayerBuilder:function(a,b){return new AnnotationsLayerBuilder({pageDiv:a,pdfPage:b,linkService:this.linkService})},setFindController:function(a){this.findController=a}},b}(),SimpleLinkService=function(){function a(a){this.pdfViewer=a}return a.prototype={/**
     * @returns {number}
     */
get page(){return this.pdfViewer.currentPageNumber},/**
     * @param {number} value
     */
set page(a){this.pdfViewer.currentPageNumber=a},/**
     * @param dest - The PDF destination object.
     */
navigateTo:function(a){},/**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
getDestinationHash:function(a){return"#"},/**
     * @param hash - The PDF parameters/hash.
     * @returns {string} The hyperlink to the PDF object.
     */
getAnchorUrl:function(a){return"#"},/**
     * @param {string} hash
     */
setHash:function(a){},/**
     * @param {string} action
     */
executeNamedAction:function(a){}},a}(),THUMBNAIL_SCROLL_MARGIN=-19,THUMBNAIL_WIDTH=98,THUMBNAIL_CANVAS_BORDER_WIDTH=1,PDFThumbnailView=function(){function a(a,c){var d=b.tempImageCache;d||(d=document.createElement("canvas"),b.tempImageCache=d),d.width=a,d.height=c;
// Since this is a temporary canvas, we need to fill the canvas with a white
// background ourselves. |_getPageDrawContext| uses CSS rules for this.
var e=d.getContext("2d");return e.save(),e.fillStyle="rgb(255, 255, 255)",e.fillRect(0,0,a,c),e.restore(),d}/**
   * @constructs PDFThumbnailView
   * @param {PDFThumbnailViewOptions} options
   */
function b(a){var b=a.container,c=a.id,d=a.defaultViewport,e=a.linkService,f=a.renderingQueue;this.id=c,this.renderingId="thumbnail"+c,this.pdfPage=null,this.rotation=0,this.viewport=d,this.pdfPageRotate=d.rotation,this.linkService=e,this.renderingQueue=f,this.hasImage=!1,this.resume=null,this.renderingState=RenderingStates.INITIAL,this.pageWidth=this.viewport.width,this.pageHeight=this.viewport.height,this.pageRatio=this.pageWidth/this.pageHeight,this.canvasWidth=THUMBNAIL_WIDTH,this.canvasHeight=this.canvasWidth/this.pageRatio|0,this.scale=this.canvasWidth/this.pageWidth;var g=document.createElement("a");g.href=e.getAnchorUrl("#page="+c),g.title=mozL10n.get("thumb_page_title",{page:c},"Page {{page}}"),g.onclick=function(){return e.page=c,!1};var h=document.createElement("div");h.id="thumbnailContainer"+c,h.className="thumbnail",this.div=h,1===c&&
// Highlight the thumbnail of the first page when no page number is
// specified (or exists in cache) when the document is loaded.
h.classList.add("selected");var i=document.createElement("div");i.className="thumbnailSelectionRing";var j=2*THUMBNAIL_CANVAS_BORDER_WIDTH;i.style.width=this.canvasWidth+j+"px",i.style.height=this.canvasHeight+j+"px",this.ring=i,h.appendChild(i),g.appendChild(h),b.appendChild(g)}return b.prototype={setPdfPage:function(a){this.pdfPage=a,this.pdfPageRotate=a.rotate;var b=(this.rotation+this.pdfPageRotate)%360;this.viewport=a.getViewport(1,b),this.reset()},reset:function(){this.renderTask&&this.renderTask.cancel(),this.hasImage=!1,this.resume=null,this.renderingState=RenderingStates.INITIAL,this.pageWidth=this.viewport.width,this.pageHeight=this.viewport.height,this.pageRatio=this.pageWidth/this.pageHeight,this.canvasHeight=this.canvasWidth/this.pageRatio|0,this.scale=this.canvasWidth/this.pageWidth,this.div.removeAttribute("data-loaded");for(var a=this.ring,b=a.childNodes,c=b.length-1;c>=0;c--)a.removeChild(b[c]);var d=2*THUMBNAIL_CANVAS_BORDER_WIDTH;a.style.width=this.canvasWidth+d+"px",a.style.height=this.canvasHeight+d+"px",this.canvas&&(
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
this.canvas.width=0,this.canvas.height=0,delete this.canvas)},update:function(a){"undefined"!=typeof a&&(this.rotation=a);var b=(this.rotation+this.pdfPageRotate)%360;this.viewport=this.viewport.clone({scale:1,rotation:b}),this.reset()},/**
     * @private
     */
_getPageDrawContext:function(){var a=document.createElement("canvas");return a.id=this.renderingId,a.width=this.canvasWidth,a.height=this.canvasHeight,a.className="thumbnailImage",a.setAttribute("aria-label",mozL10n.get("thumb_page_canvas",{page:this.id},"Thumbnail of Page {{page}}")),this.canvas=a,this.div.setAttribute("data-loaded",!0),this.ring.appendChild(a),a.getContext("2d")},draw:function(){function a(a){
// The renderTask may have been replaced by a new one, so only remove
// the reference to the renderTask if it matches the one that is
// triggering this callback.
return j===e.renderTask&&(e.renderTask=null),"cancelled"===a?void c(a):(e.renderingState=RenderingStates.FINISHED,void(a?c(a):b(void 0)))}if(this.renderingState!==RenderingStates.INITIAL&&console.error("Must be in new state before drawing"),this.hasImage)return Promise.resolve(void 0);this.hasImage=!0,this.renderingState=RenderingStates.RUNNING;var b,c,d=new Promise(function(a,d){b=a,c=d}),e=this,f=this._getPageDrawContext(),g=this.viewport.clone({scale:this.scale}),h=function(a){return e.renderingQueue.isHighestPriority(e)?void a():(e.renderingState=RenderingStates.PAUSED,void(e.resume=function(){e.renderingState=RenderingStates.RUNNING,a()}))},i={canvasContext:f,viewport:g,continueCallback:h},j=this.renderTask=this.pdfPage.render(i);return j.promise.then(function(){a(null)},function(b){a(b)}),d},setImage:function(b){var c=b.canvas;if(!this.hasImage&&c){this.pdfPage||this.setPdfPage(b.pdfPage),this.hasImage=!0,this.renderingState=RenderingStates.FINISHED;var d=this._getPageDrawContext(),e=d.canvas;if(c.width<=2*e.width)return void d.drawImage(c,0,0,c.width,c.height,0,0,e.width,e.height);for(
// drawImage does an awful job of rescaling the image, doing it gradually.
var f=3,g=e.width<<f,h=e.height<<f,i=a(g,h),j=i.getContext("2d");g>c.width||h>c.height;)g>>=1,h>>=1;for(j.drawImage(c,0,0,c.width,c.height,0,0,g,h);g>2*e.width;)j.drawImage(i,0,0,g,h,0,0,g>>1,h>>1),g>>=1,h>>=1;d.drawImage(i,0,0,g,h,0,0,e.width,e.height)}}},b}();PDFThumbnailView.tempImageCache=null;/**
 * @typedef {Object} PDFThumbnailViewerOptions
 * @property {HTMLDivElement} container - The container for the thumbnail
 *   elements.
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 * @property {PDFRenderingQueue} renderingQueue - The rendering queue object.
 */
/**
 * Simple viewer control to display thumbnails for pages.
 * @class
 * @implements {IRenderableView}
 */
var PDFThumbnailViewer=function(){/**
   * @constructs PDFThumbnailViewer
   * @param {PDFThumbnailViewerOptions} options
   */
function a(a){this.container=a.container,this.renderingQueue=a.renderingQueue,this.linkService=a.linkService,this.scroll=watchScroll(this.container,this._scrollUpdated.bind(this)),this._resetView()}return a.prototype={/**
     * @private
     */
_scrollUpdated:function(){this.renderingQueue.renderHighestPriority()},getThumbnail:function(a){return this.thumbnails[a]},/**
     * @private
     */
_getVisibleThumbs:function(){return getVisibleElements(this.container,this.thumbnails)},scrollThumbnailIntoView:function(a){var b=document.querySelector(".thumbnail.selected");b&&b.classList.remove("selected");var c=document.getElementById("thumbnailContainer"+a);c&&c.classList.add("selected");var d=this._getVisibleThumbs(),e=d.views.length;
// If the thumbnail isn't currently visible, scroll it into view.
if(e>0){var f=d.first.id,g=e>1?d.last.id:f;(f>=a||a>=g)&&scrollIntoView(c,{top:THUMBNAIL_SCROLL_MARGIN})}},get pagesRotation(){return this._pagesRotation},set pagesRotation(a){this._pagesRotation=a;for(var b=0,c=this.thumbnails.length;c>b;b++){var d=this.thumbnails[b];d.update(a)}},cleanup:function(){var a=PDFThumbnailView.tempImageCache;a&&(
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
a.width=0,a.height=0),PDFThumbnailView.tempImageCache=null},/**
     * @private
     */
_resetView:function(){this.thumbnails=[],this._pagesRotation=0,this._pagesRequests=[]},setDocument:function(a){if(this.pdfDocument){for(
// cleanup of the elements and views
var b=this.container;b.hasChildNodes();)b.removeChild(b.lastChild);this._resetView()}return this.pdfDocument=a,a?a.getPage(1).then(function(b){for(var c=a.numPages,d=b.getViewport(1),e=1;c>=e;++e){var f=new PDFThumbnailView({container:this.container,id:e,defaultViewport:d.clone(),linkService:this.linkService,renderingQueue:this.renderingQueue});this.thumbnails.push(f)}}.bind(this)):Promise.resolve()},/**
     * @param {PDFPageView} pageView
     * @returns {PDFPage}
     * @private
     */
_ensurePdfPageLoaded:function(a){if(a.pdfPage)return Promise.resolve(a.pdfPage);var b=a.id;if(this._pagesRequests[b])return this._pagesRequests[b];var c=this.pdfDocument.getPage(b).then(function(c){return a.setPdfPage(c),this._pagesRequests[b]=null,c}.bind(this));return this._pagesRequests[b]=c,c},ensureThumbnailVisible:function(a){
// Ensure that the thumbnail of the current page is visible
// when switching from another view.
scrollIntoView(document.getElementById("thumbnailContainer"+a))},forceRendering:function(){var a=this._getVisibleThumbs(),b=this.renderingQueue.getHighestPriority(a,this.thumbnails,this.scroll.down);return b?(this._ensurePdfPageLoaded(b).then(function(){this.renderingQueue.renderView(b)}.bind(this)),!0):!1}},a}(),PDFOutlineView=function(){/**
   * @constructs PDFOutlineView
   * @param {PDFOutlineViewOptions} options
   */
function a(a){this.container=a.container,this.outline=a.outline,this.linkService=a.linkService}return a.prototype={reset:function(){for(var a=this.container;a.firstChild;)a.removeChild(a.firstChild)},/**
     * @private
     */
_bindLink:function(a,b){var c=this.linkService;a.href=c.getDestinationHash(b.dest),a.onclick=function(a){return c.navigateTo(b.dest),!1}},render:function(){var a=this.outline;if(this.reset(),a)for(var b=[{parent:this.container,items:this.outline}];b.length>0;)for(var c=b.shift(),d=0,e=c.items.length;e>d;d++){var f=c.items[d],g=document.createElement("div");g.className="outlineItem";var h=document.createElement("a");if(this._bindLink(h,f),h.textContent=f.title,g.appendChild(h),f.items.length>0){var i=document.createElement("div");i.className="outlineItems",g.appendChild(i),b.push({parent:i,items:f.items})}c.parent.appendChild(g)}}},a}(),PDFAttachmentView=function(){/**
   * @constructs PDFAttachmentView
   * @param {PDFAttachmentViewOptions} options
   */
function a(a){this.container=a.container,this.attachments=a.attachments,this.downloadManager=a.downloadManager}return a.prototype={reset:function(){for(var a=this.container;a.firstChild;)a.removeChild(a.firstChild)},/**
     * @private
     */
_bindLink:function(a,b,c){a.onclick=function(a){return this.downloadManager.downloadData(b,c,""),!1}.bind(this)},render:function(){var a=this.attachments;if(this.reset(),a)for(var b=Object.keys(a).sort(function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase())}),c=0,d=b.length;d>c;c++){var e=a[b[c]],f=getFileName(e.filename),g=document.createElement("div");g.className="attachmentsItem";var h=document.createElement("button");this._bindLink(h,e.content,f),h.textContent=f,g.appendChild(h),this.container.appendChild(g)}}},a}(),PDFViewerApplication={initialBookmark:document.location.hash.substring(1),initialized:!1,fellback:!1,pdfDocument:null,sidebarOpen:!1,printing:!1,/** @type {PDFViewer} */
pdfViewer:null,/** @type {PDFThumbnailViewer} */
pdfThumbnailViewer:null,/** @type {PDFRenderingQueue} */
pdfRenderingQueue:null,pageRotation:0,updateScaleControls:!0,isInitialViewSet:!1,animationStartedPromise:null,mouseScrollTimeStamp:0,mouseScrollDelta:0,preferenceSidebarViewOnLoad:SidebarView.NONE,preferencePdfBugEnabled:!1,preferenceShowPreviousViewOnLoad:!0,isViewerEmbedded:window.parent!==window,url:"",
// called once when the document is loaded
initialize:function(){var a=new PDFRenderingQueue;a.onIdle=this.cleanup.bind(this),this.pdfRenderingQueue=a;var b=document.getElementById("viewerContainer"),c=document.getElementById("viewer");this.pdfViewer=new PDFViewer({container:b,viewer:c,renderingQueue:a,linkService:this}),a.setViewer(this.pdfViewer);var d=document.getElementById("thumbnailView");this.pdfThumbnailViewer=new PDFThumbnailViewer({container:d,renderingQueue:a,linkService:this}),a.setThumbnailViewer(this.pdfThumbnailViewer),Preferences.initialize(),this.findController=new PDFFindController({pdfViewer:this.pdfViewer,integratedFind:this.supportsIntegratedFind}),this.pdfViewer.setFindController(this.findController),this.findBar=new PDFFindBar({bar:document.getElementById("findbar"),toggleButton:document.getElementById("viewFind"),findField:document.getElementById("findInput"),highlightAllCheckbox:document.getElementById("findHighlightAll"),caseSensitiveCheckbox:document.getElementById("findMatchCase"),findMsg:document.getElementById("findMsg"),findStatusIcon:document.getElementById("findStatusIcon"),findPreviousButton:document.getElementById("findPrevious"),findNextButton:document.getElementById("findNext"),findController:this.findController}),this.findController.setFindBar(this.findBar),HandTool.initialize({container:b,toggleHandTool:document.getElementById("toggleHandTool")}),SecondaryToolbar.initialize({toolbar:document.getElementById("secondaryToolbar"),presentationMode:PresentationMode,toggleButton:document.getElementById("secondaryToolbarToggle"),presentationModeButton:document.getElementById("secondaryPresentationMode"),openFile:document.getElementById("secondaryOpenFile"),print:document.getElementById("secondaryPrint"),download:document.getElementById("secondaryDownload"),viewBookmark:document.getElementById("secondaryViewBookmark"),firstPage:document.getElementById("firstPage"),lastPage:document.getElementById("lastPage"),pageRotateCw:document.getElementById("pageRotateCw"),pageRotateCcw:document.getElementById("pageRotateCcw"),documentProperties:DocumentProperties,documentPropertiesButton:document.getElementById("documentProperties")}),PresentationMode.initialize({container:b,secondaryToolbar:SecondaryToolbar,firstPage:document.getElementById("contextFirstPage"),lastPage:document.getElementById("contextLastPage"),pageRotateCw:document.getElementById("contextPageRotateCw"),pageRotateCcw:document.getElementById("contextPageRotateCcw")}),PasswordPrompt.initialize({overlayName:"passwordOverlay",passwordField:document.getElementById("password"),passwordText:document.getElementById("passwordText"),passwordSubmit:document.getElementById("passwordSubmit"),passwordCancel:document.getElementById("passwordCancel")}),DocumentProperties.initialize({overlayName:"documentPropertiesOverlay",closeButton:document.getElementById("documentPropertiesClose"),fileNameField:document.getElementById("fileNameField"),fileSizeField:document.getElementById("fileSizeField"),titleField:document.getElementById("titleField"),authorField:document.getElementById("authorField"),subjectField:document.getElementById("subjectField"),keywordsField:document.getElementById("keywordsField"),creationDateField:document.getElementById("creationDateField"),modificationDateField:document.getElementById("modificationDateField"),creatorField:document.getElementById("creatorField"),producerField:document.getElementById("producerField"),versionField:document.getElementById("versionField"),pageCountField:document.getElementById("pageCountField")});var e=this,f=Promise.all([Preferences.get("enableWebGL").then(function(a){PDFJS.disableWebGL=!a}),Preferences.get("sidebarViewOnLoad").then(function(a){e.preferenceSidebarViewOnLoad=a}),Preferences.get("pdfBugEnabled").then(function(a){e.preferencePdfBugEnabled=a}),Preferences.get("showPreviousViewOnLoad").then(function(a){e.preferenceShowPreviousViewOnLoad=a,!a&&window.history.state&&window.history.replaceState(null,"")}),Preferences.get("disableTextLayer").then(function(a){PDFJS.disableTextLayer!==!0&&(PDFJS.disableTextLayer=a)}),Preferences.get("disableRange").then(function(a){PDFJS.disableRange!==!0&&(PDFJS.disableRange=a)}),Preferences.get("disableAutoFetch").then(function(a){PDFJS.disableAutoFetch=a}),Preferences.get("disableFontFace").then(function(a){PDFJS.disableFontFace!==!0&&(PDFJS.disableFontFace=a)}),Preferences.get("useOnlyCssZoom").then(function(a){PDFJS.useOnlyCssZoom=a})])["catch"](function(a){});return f.then(function(){PDFViewerApplication.initialized=!0})},zoomIn:function(a){var b=this.pdfViewer.currentScale;do b=(b*DEFAULT_SCALE_DELTA).toFixed(2),b=Math.ceil(10*b)/10,b=Math.min(MAX_SCALE,b);while(--a&&MAX_SCALE>b);this.setScale(b,!0)},zoomOut:function(a){var b=this.pdfViewer.currentScale;do b=(b/DEFAULT_SCALE_DELTA).toFixed(2),b=Math.floor(10*b)/10,b=Math.max(MIN_SCALE,b);while(--a&&b>MIN_SCALE);this.setScale(b,!0)},get currentScaleValue(){return this.pdfViewer.currentScaleValue},get pagesCount(){return this.pdfDocument.numPages},set page(a){this.pdfViewer.currentPageNumber=a},get page(){return this.pdfViewer.currentPageNumber},get supportsPrinting(){var a=document.createElement("canvas"),b="mozPrintCallback"in a;return PDFJS.shadow(this,"supportsPrinting",b)},get supportsFullscreen(){var a=document.documentElement,b=a.requestFullscreen||a.mozRequestFullScreen||a.webkitRequestFullScreen||a.msRequestFullscreen;return(document.fullscreenEnabled===!1||document.mozFullScreenEnabled===!1||document.webkitFullscreenEnabled===!1||document.msFullscreenEnabled===!1)&&(b=!1),b&&PDFJS.disableFullscreen===!0&&(b=!1),PDFJS.shadow(this,"supportsFullscreen",b)},get supportsIntegratedFind(){var a=!1;return PDFJS.shadow(this,"supportsIntegratedFind",a)},get supportsDocumentFonts(){var a=!0;return PDFJS.shadow(this,"supportsDocumentFonts",a)},get supportsDocumentColors(){var a=!0;return PDFJS.shadow(this,"supportsDocumentColors",a)},get loadingBar(){var a=new ProgressBar("#loadingBar",{});return PDFJS.shadow(this,"loadingBar",a)},setTitleUsingUrl:function(a){this.url=a;try{this.setTitle(decodeURIComponent(getFileName(a))||a)}catch(b){
// decodeURIComponent may throw URIError,
// fall back to using the unprocessed url in that case
this.setTitle(a)}},setTitle:function(a){this.isViewerEmbedded||(document.title=a)},close:function(){var a=document.getElementById("errorWrapper");a.setAttribute("hidden","true"),this.pdfDocument&&(this.pdfDocument.destroy(),this.pdfDocument=null,this.pdfThumbnailViewer.setDocument(null),this.pdfViewer.setDocument(null),"undefined"!=typeof PDFBug&&PDFBug.cleanup())},
// TODO(mack): This function signature should really be pdfViewOpen(url, args)
open:function(a,b,c,d,e){function f(a){i.progress(a.loaded/a.total)}this.pdfDocument&&
// Reload the preferences if a document was previously opened.
Preferences.reload(),this.close();var g={password:c};if("string"==typeof a?(// URL
this.setTitleUsingUrl(a),g.url=a):a&&"byteLength"in a?// ArrayBuffer
g.data=a:a.url&&a.originalUrl&&(this.setTitleUsingUrl(a.originalUrl),g.url=a.url),e)for(var h in e)g[h]=e[h];var i=this;i.loading=!0,i.downloadComplete=!1;var j=function(a,b){PasswordPrompt.updatePassword=a,PasswordPrompt.reason=b,PasswordPrompt.open()};PDFJS.getDocument(g,d,j,f).then(function(a){i.load(a,b),i.loading=!1},function(a){var b=a&&a.message,c=mozL10n.get("loading_error",null,"An error occurred while loading the PDF.");a instanceof PDFJS.InvalidPDFException?
// change error message also for other builds
c=mozL10n.get("invalid_file_error",null,"Invalid or corrupted PDF file."):a instanceof PDFJS.MissingPDFException?
// special message for missing PDF's
c=mozL10n.get("missing_file_error",null,"Missing PDF file."):a instanceof PDFJS.UnexpectedResponseException&&(c=mozL10n.get("unexpected_response_error",null,"Unexpected server response."));var d={message:b};i.error(c,d),i.loading=!1}),e&&e.length&&DocumentProperties.setFileSize(e.length)},download:function(){function a(){d.downloadUrl(b,c)}var b=this.url.split("#")[0],c=getPDFFileNameFromURL(b),d=new DownloadManager;// the PDF is not ready yet
return d.onerror=function(a){
// This error won't really be helpful because it's likely the
// fallback won't work either (or is already open).
PDFViewerApplication.error("PDF failed to download.")},this.pdfDocument&&this.downloadComplete?void this.pdfDocument.getData().then(function(a){var e=PDFJS.createBlob(a,"application/pdf");d.download(e,b,c)},a).then(null,a):void a()},fallback:function(a){},navigateTo:function(a){var b,c="",d=this,e=function(b){d.pendingRefStr=null;
// dest array looks like that: <page-ref> </XYZ|FitXXX> <args..>
var f=b instanceof Object?d.pagesRefMap[b.num+" "+b.gen+" R"]:b+1;f?(f>d.pagesCount&&(f=d.pagesCount),d.pdfViewer.scrollPageIntoView(f,a),
// Update the browsing history.
PDFHistory.push({dest:a,hash:c,page:f})):d.pdfDocument.getPageIndex(b).then(function(a){var c=a+1;d.pagesRefMap[b.num+" "+b.gen+" R"]=c,e(b)})};"string"==typeof a?(c=a,b=this.pdfDocument.getDestination(a)):b=Promise.resolve(a),b.then(function(b){a=b,b instanceof Array&&e(b[0])})},executeNamedAction:function(a){
// See PDF reference, table 8.45 - Named action
switch(a){case"GoToPage":document.getElementById("pageNumber").focus();break;case"GoBack":PDFHistory.back();break;case"GoForward":PDFHistory.forward();break;case"Find":this.supportsIntegratedFind||this.findBar.toggle();break;case"NextPage":this.page++;break;case"PrevPage":this.page--;break;case"LastPage":this.page=this.pagesCount;break;case"FirstPage":this.page=1}},getDestinationHash:function(a){if("string"==typeof a)return this.getAnchorUrl("#"+escape(a));if(a instanceof Array){var b=a[0],c=b instanceof Object?this.pagesRefMap[b.num+" "+b.gen+" R"]:b+1;if(c){var d=this.getAnchorUrl("#page="+c),e=a[1];if("object"==typeof e&&"name"in e&&"XYZ"===e.name){var f=a[4]||this.currentScaleValue,g=parseFloat(f);g&&(f=100*g),d+="&zoom="+f,(a[2]||a[3])&&(d+=","+(a[2]||0)+","+(a[3]||0))}return d}}return""},/**
   * Prefix the full url on anchor links to make sure that links are resolved
   * relative to the current URL instead of the one defined in <base href>.
   * @param {String} anchor The anchor hash, including the #.
   */
getAnchorUrl:function(a){return a},/**
   * Show the error box.
   * @param {String} message A message that is human readable.
   * @param {Object} moreInfo (optional) Further information about the error
   *                            that is more technical.  Should have a 'message'
   *                            and optionally a 'stack' property.
   */
error:function(a,b){var c=mozL10n.get("error_version_info",{version:PDFJS.version||"?",build:PDFJS.build||"?"},"PDF.js v{{version}} (build: {{build}})")+"\n";b&&(c+=mozL10n.get("error_message",{message:b.message},"Message: {{message}}"),b.stack?c+="\n"+mozL10n.get("error_stack",{stack:b.stack},"Stack: {{stack}}"):(b.filename&&(c+="\n"+mozL10n.get("error_file",{file:b.filename},"File: {{file}}")),b.lineNumber&&(c+="\n"+mozL10n.get("error_line",{line:b.lineNumber},"Line: {{line}}"))));var d=document.getElementById("errorWrapper");d.removeAttribute("hidden");var e=document.getElementById("errorMessage");e.textContent=a;var f=document.getElementById("errorClose");f.onclick=function(){d.setAttribute("hidden","true")};var g=document.getElementById("errorMoreInfo"),h=document.getElementById("errorShowMore"),i=document.getElementById("errorShowLess");h.onclick=function(){g.removeAttribute("hidden"),h.setAttribute("hidden","true"),i.removeAttribute("hidden"),g.style.height=g.scrollHeight+"px"},i.onclick=function(){g.setAttribute("hidden","true"),h.removeAttribute("hidden"),i.setAttribute("hidden","true")},h.oncontextmenu=noContextMenuHandler,i.oncontextmenu=noContextMenuHandler,f.oncontextmenu=noContextMenuHandler,h.removeAttribute("hidden"),i.setAttribute("hidden","true"),g.value=c},progress:function(a){var b=Math.round(100*a);
// When we transition from full request to range requests, it's possible
// that we discard some of the loaded data. This can cause the loading
// bar to move backwards. So prevent this by only updating the bar if it
// increases.
(b>this.loadingBar.percent||isNaN(b))&&(this.loadingBar.percent=b,
// When disableAutoFetch is enabled, it's not uncommon for the entire file
// to never be fetched (depends on e.g. the file structure). In this case
// the loading bar will not be completely filled, nor will it be hidden.
// To prevent displaying a partially filled loading bar permanently, we
// hide it when no data has been loaded during a certain amount of time.
PDFJS.disableAutoFetch&&b&&(this.disableAutoFetchLoadingBarTimeout&&(clearTimeout(this.disableAutoFetchLoadingBarTimeout),this.disableAutoFetchLoadingBarTimeout=null),this.loadingBar.show(),this.disableAutoFetchLoadingBarTimeout=setTimeout(function(){this.loadingBar.hide(),this.disableAutoFetchLoadingBarTimeout=null}.bind(this),DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT)))},load:function(a,b){var c=this;b=b||UNKNOWN_SCALE,this.findController.reset(),this.pdfDocument=a,DocumentProperties.url=this.url,DocumentProperties.pdfDocument=a,DocumentProperties.resolveDataAvailable();var d=a.getDownloadInfo().then(function(){c.downloadComplete=!0,c.loadingBar.hide()}),e=a.numPages;document.getElementById("numPages").textContent=mozL10n.get("page_of",{pageCount:e},"of {{pageCount}}"),document.getElementById("pageNumber").max=e;var f=this.documentFingerprint=a.fingerprint,g=this.store=new ViewHistory(f),h=this.pdfViewer;h.currentScale=b,h.setDocument(a);var i=h.firstPagePromise,j=h.pagesPromise,k=h.onePageRendered;this.pageRotation=0,this.isInitialViewSet=!1,this.pagesRefMap=h.pagesRefMap,this.pdfThumbnailViewer.setDocument(a),i.then(function(a){d.then(function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("documentload",!0,!0,{}),window.dispatchEvent(a)}),c.loadingBar.setWidth(document.getElementById("viewer")),PDFJS.disableHistory||c.isViewerEmbedded||
// The browsing history is only enabled when the viewer is standalone,
// i.e. not when it is embedded in a web page.
PDFHistory.initialize(c.documentFingerprint,c)});
// Fetch the necessary preference values.
var l,m=Preferences.get("defaultZoomValue").then(function(a){l=a}),n=g.initializedPromise;Promise.all([i,n,m]).then(function(){var a=null;if(PDFViewerApplication.preferenceShowPreviousViewOnLoad&&g.get("exists",!1)){var d=g.get("page","1"),e=l||g.get("zoom",c.pdfViewer.currentScale),f=g.get("scrollLeft","0"),h=g.get("scrollTop","0");a="page="+d+"&zoom="+e+","+f+","+h}else l&&(a="page=1&zoom="+l);c.setInitialView(a,b),
// Make all navigation keys work on document load,
// unless the viewer is embedded in a web page.
c.isViewerEmbedded||c.pdfViewer.focus()},function(a){console.error(a),i.then(function(){c.setInitialView(null,b)})}),j.then(function(){c.supportsPrinting&&a.getJavaScript().then(function(a){a.length&&(console.warn("Warning: JavaScript is not supported"),c.fallback(PDFJS.UNSUPPORTED_FEATURES.javaScript));for(var b=/\bprint\s*\(/g,d=0,e=a.length;e>d;d++){var f=a[d];if(f&&b.test(f))return void setTimeout(function(){window.print()})}})});
// outline depends on pagesRefMap
var o=[j,this.animationStartedPromise];Promise.all(o).then(function(){a.getOutline().then(function(a){var b=document.getElementById("outlineView");c.outline=new PDFOutlineView({container:b,outline:a,linkService:c}),c.outline.render(),document.getElementById("viewOutline").disabled=!a,a||b.classList.contains("hidden")||c.switchSidebarView("thumbs"),a&&c.preferenceSidebarViewOnLoad===SidebarView.OUTLINE&&c.switchSidebarView("outline",!0)}),a.getAttachments().then(function(a){var b=document.getElementById("attachmentsView");c.attachments=new PDFAttachmentView({container:b,attachments:a,downloadManager:new DownloadManager}),c.attachments.render(),document.getElementById("viewAttachments").disabled=!a,a||b.classList.contains("hidden")||c.switchSidebarView("thumbs"),a&&c.preferenceSidebarViewOnLoad===SidebarView.ATTACHMENTS&&c.switchSidebarView("attachments",!0)})}),c.preferenceSidebarViewOnLoad===SidebarView.THUMBS&&Promise.all([i,k]).then(function(){c.switchSidebarView("thumbs",!0)}),a.getMetadata().then(function(b){var d=b.info,e=b.metadata;c.documentInfo=d,c.metadata=e,
// Provides some basic debug information
console.log("PDF "+a.fingerprint+" ["+d.PDFFormatVersion+" "+(d.Producer||"-").trim()+" / "+(d.Creator||"-").trim()+"] (PDF.js: "+(PDFJS.version||"-")+(PDFJS.disableWebGL?"":" [WebGL]")+")");var f;if(e&&e.has("dc:title")){var g=e.get("dc:title");
// Ghostscript sometimes return 'Untitled', sets the title to 'Untitled'
"Untitled"!==g&&(f=g)}!f&&d&&d.Title&&(f=d.Title),f&&c.setTitle(f+" - "+document.title),d.IsAcroFormPresent&&(console.warn("Warning: AcroForm/XFA is not supported"),c.fallback(PDFJS.UNSUPPORTED_FEATURES.forms))})},setInitialView:function(a,b){this.isInitialViewSet=!0,
// When opening a new file (when one is already loaded in the viewer):
// Reset 'currentPageNumber', since otherwise the page's scale will be wrong
// if 'currentPageNumber' is larger than the number of pages in the file.
document.getElementById("pageNumber").value=this.pdfViewer.currentPageNumber=1,PDFHistory.initialDestination?(this.navigateTo(PDFHistory.initialDestination),PDFHistory.initialDestination=null):this.initialBookmark?(this.setHash(this.initialBookmark),PDFHistory.push({hash:this.initialBookmark},!!this.initialBookmark),this.initialBookmark=null):a?this.setHash(a):b&&(this.setScale(b,!0),this.page=1),/*
    if (this.pdfViewer.currentScale === UNKNOWN_SCALE) {
      // Scale was not initialized: invalid bookmark or scale was not specified.
      // Setting the default one.
      this.setScale(DEFAULT_SCALE, true);
    }
    */
// always set default scale
this.setScale(DEFAULT_SCALE,!0)},cleanup:function(){this.pdfViewer.cleanup(),this.pdfThumbnailViewer.cleanup(),this.pdfDocument.cleanup()},forceRendering:function(){this.pdfRenderingQueue.printing=this.printing,this.pdfRenderingQueue.isThumbnailViewEnabled=this.sidebarOpen,this.pdfRenderingQueue.renderHighestPriority()},setHash:function(a){if(!this.isInitialViewSet)return void(this.initialBookmark=a);if(a)if(a.indexOf("=")>=0){var b=this.parseQueryString(a);
// borrowing syntax from "Parameters for Opening PDF Files"
if("nameddest"in b)return PDFHistory.updateNextHashParam(b.nameddest),void this.navigateTo(b.nameddest);var c,d;if("page"in b&&(c=0|b.page||1),"zoom"in b){
// Build the destination array.
var e=b.zoom.split(","),f=e[0],g=parseFloat(f);-1===f.indexOf("Fit")?
// If the zoomArg is a number, it has to get divided by 100. If it's
// a string, it should stay as it is.
d=[null,{name:"XYZ"},e.length>1?0|e[1]:null,e.length>2?0|e[2]:null,g?g/100:f]:"Fit"===f||"FitB"===f?d=[null,{name:f}]:"FitH"===f||"FitBH"===f||"FitV"===f||"FitBV"===f?d=[null,{name:f},e.length>1?0|e[1]:null]:"FitR"===f?5!==e.length?console.error("pdfViewSetHash: Not enough parameters for 'FitR'."):d=[null,{name:f},0|e[1],0|e[2],0|e[3],0|e[4]]:console.error("pdfViewSetHash: '"+f+"' is not a valid zoom value.")}d?this.pdfViewer.scrollPageIntoView(c||this.page,d):c&&(this.page=c),"pagemode"in b&&("thumbs"===b.pagemode||"bookmarks"===b.pagemode||"attachments"===b.pagemode?this.switchSidebarView("bookmarks"===b.pagemode?"outline":b.pagemode,!0):"none"===b.pagemode&&this.sidebarOpen&&document.getElementById("sidebarToggle").click())}else/^\d+$/.test(a)?// page number
this.page=a:(// named destination
PDFHistory.updateNextHashParam(unescape(a)),this.navigateTo(unescape(a)))},refreshThumbnailViewer:function(){for(var a=this.pdfViewer,b=this.pdfThumbnailViewer,c=a.pagesCount,d=0;c>d;d++){var e=a.getPageView(d);if(e&&e.renderingState===RenderingStates.FINISHED){var f=b.getThumbnail(d);f.setImage(e)}}b.scrollThumbnailIntoView(this.page)},switchSidebarView:function(a,b){b&&!this.sidebarOpen&&document.getElementById("sidebarToggle").click();var c=document.getElementById("thumbnailView"),d=document.getElementById("outlineView"),e=document.getElementById("attachmentsView"),f=document.getElementById("viewThumbnail"),g=document.getElementById("viewOutline"),h=document.getElementById("viewAttachments");switch(a){case"thumbs":var i=c.classList.contains("hidden");f.classList.add("toggled"),g.classList.remove("toggled"),h.classList.remove("toggled"),c.classList.remove("hidden"),d.classList.add("hidden"),e.classList.add("hidden"),this.forceRendering(),i&&this.pdfThumbnailViewer.ensureThumbnailVisible(this.page);break;case"outline":if(f.classList.remove("toggled"),g.classList.add("toggled"),h.classList.remove("toggled"),c.classList.add("hidden"),d.classList.remove("hidden"),e.classList.add("hidden"),g.getAttribute("disabled"))return;break;case"attachments":if(f.classList.remove("toggled"),g.classList.remove("toggled"),h.classList.add("toggled"),c.classList.add("hidden"),d.classList.add("hidden"),e.classList.remove("hidden"),h.getAttribute("disabled"))return}},
// Helper function to parse query string (e.g. ?param1=value&parm2=...).
parseQueryString:function(a){for(var b=a.split("&"),c={},d=0,e=b.length;e>d;++d){var f=b[d].split("="),g=f[0].toLowerCase(),h=f.length>1?f[1]:null;c[decodeURIComponent(g)]=decodeURIComponent(h)}return c},beforePrint:function(){if(!this.supportsPrinting){var a=mozL10n.get("printing_not_supported",null,"Warning: Printing is not fully supported by this browser.");return void this.error(a)}var b,c,d=!1;if(this.pagesCount){for(b=0,c=this.pagesCount;c>b;++b)if(!this.pdfViewer.getPageView(b).pdfPage){d=!0;break}}else d=!0;if(d){var e=mozL10n.get("printing_not_ready",null,"Warning: The PDF is not fully loaded for printing.");return void window.alert(e)}this.printing=!0,this.forceRendering();var f=document.querySelector("body");for(f.setAttribute("data-mozPrintCallback",!0),b=0,c=this.pagesCount;c>b;++b)this.pdfViewer.getPageView(b).beforePrint()},afterPrint:function(){for(var a=document.getElementById("printContainer");a.hasChildNodes();)a.removeChild(a.lastChild);this.printing=!1,this.forceRendering()},setScale:function(a,b){this.updateScaleControls=!!b,this.pdfViewer.currentScaleValue=a,this.updateScaleControls=!0},rotatePages:function(a){var b=this.page;this.pageRotation=(this.pageRotation+360+a)%360,this.pdfViewer.pagesRotation=this.pageRotation,this.pdfThumbnailViewer.pagesRotation=this.pageRotation,this.forceRendering(),this.pdfViewer.scrollPageIntoView(b)},/**
   * This function flips the page in presentation mode if the user scrolls up
   * or down with large enough motion and prevents page flipping too often.
   *
   * @this {PDFView}
   * @param {number} mouseScrollDelta The delta value from the mouse event.
   */
mouseScroll:function(a){var b=50,c=(new Date).getTime(),d=this.mouseScrollTimeStamp;
// In case one page has already been flipped there is a cooldown time
// which has to expire before next page can be scrolled on to.
if(!(c>d&&b>c-d)){
// In case the user decides to scroll to the opposite direction than before
// clear the accumulated delta.
(this.mouseScrollDelta>0&&0>a||this.mouseScrollDelta<0&&a>0)&&this.clearMouseScrollState(),this.mouseScrollDelta+=a;var e=120;if(Math.abs(this.mouseScrollDelta)>=e){var f={UP:-1,DOWN:1},g=this.mouseScrollDelta>0?f.UP:f.DOWN;this.clearMouseScrollState();var h=this.page;
// In case we are already on the first or the last page there is no need
// to do anything.
if(1===h&&g===f.UP||h===this.pagesCount&&g===f.DOWN)return;this.page+=g,this.mouseScrollTimeStamp=c}}},/**
   * This function clears the member attributes used with mouse scrolling in
   * presentation mode.
   *
   * @this {PDFView}
   */
clearMouseScrollState:function(){this.mouseScrollTimeStamp=0,this.mouseScrollDelta=0}};window.PDFView=PDFViewerApplication,document.addEventListener("DOMContentLoaded",webViewerLoad,!0),document.addEventListener("pagerendered",function(a){var b=a.detail.pageNumber,c=b-1,d=PDFViewerApplication.pdfViewer.getPageView(c);if(PDFViewerApplication.sidebarOpen){var e=PDFViewerApplication.pdfThumbnailViewer.getThumbnail(c);e.setImage(d)}
// If the page is still visible when it has finished rendering,
// ensure that the page number input loading indicator is hidden.
if(PDFJS.pdfBug&&Stats.enabled&&d.stats&&Stats.add(b,d.stats),d.error&&PDFViewerApplication.error(mozL10n.get("rendering_error",null,"An error occurred while rendering the page."),d.error),b===PDFViewerApplication.page){var f=document.getElementById("pageNumber");f.classList.remove(PAGE_NUMBER_LOADING_INDICATOR)}},!0),document.addEventListener("textlayerrendered",function(a){var b=a.detail.pageNumber-1;PDFViewerApplication.pdfViewer.getPageView(b)},!0),window.addEventListener("presentationmodechanged",function(a){var b=a.detail.active,c=a.detail.switchInProgress;PDFViewerApplication.pdfViewer.presentationModeState=c?PresentationModeState.CHANGING:b?PresentationModeState.FULLSCREEN:PresentationModeState.NORMAL}),window.addEventListener("updateviewarea",function(){if(PDFViewerApplication.initialized){var a=PDFViewerApplication.pdfViewer.location;PDFViewerApplication.store.initializedPromise.then(function(){PDFViewerApplication.store.setMultiple({exists:!0,page:a.pageNumber,zoom:a.scale,scrollLeft:a.left,scrollTop:a.top})["catch"](function(){})});PDFViewerApplication.getAnchorUrl(a.pdfOpenParams);
// Update the current bookmark in the browsing history.
PDFHistory.updateCurrentBookmark(a.pdfOpenParams,a.pageNumber);
// Show/hide the loading indicator in the page number input element.
var b=document.getElementById("pageNumber"),c=PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page-1);c.renderingState===RenderingStates.FINISHED?b.classList.remove(PAGE_NUMBER_LOADING_INDICATOR):b.classList.add(PAGE_NUMBER_LOADING_INDICATOR)}},!0),window.addEventListener("resize",function(a){if(PDFViewerApplication.initialized&&(document.getElementById("pageWidthOption").selected||document.getElementById("pageFitOption").selected||document.getElementById("pageAutoOption").selected)){var b=document.getElementById("scaleSelect").value;PDFViewerApplication.setScale(b,!1)}updateViewarea(),
// Set the 'max-height' CSS property of the secondary toolbar.
SecondaryToolbar.setMaxHeight(document.getElementById("viewerContainer"))}),window.addEventListener("hashchange",function(a){PDFHistory.isHashChangeUnlocked&&PDFViewerApplication.setHash(document.location.hash.substring(1))}),window.addEventListener("change",function(a){var b=a.target.files;if(b&&0!==b.length){var c=b[0];if(!PDFJS.disableCreateObjectURL&&"undefined"!=typeof URL&&URL.createObjectURL)PDFViewerApplication.open(URL.createObjectURL(c),0);else{
// Read the local file into a Uint8Array.
var d=new FileReader;d.onload=function(a){var b=a.target.result,c=new Uint8Array(b);PDFViewerApplication.open(c,0)},d.readAsArrayBuffer(c)}PDFViewerApplication.setTitleUsingUrl(c.name),
// URL does not reflect proper document location - hiding some icons.
document.getElementById("download").setAttribute("hidden","true"),document.getElementById("secondaryDownload").setAttribute("hidden","true")}},!0),window.addEventListener("localized",function(a){document.getElementsByTagName("html")[0].dir=mozL10n.getDirection(),PDFViewerApplication.animationStartedPromise.then(function(){
// Adjust the width of the zoom box to fit the content.
// Note: If the window is narrow enough that the zoom box is not visible,
//       we temporarily show it to be able to adjust its width.
var a=document.getElementById("scaleSelectContainer");if(0===a.clientWidth&&a.setAttribute("style","display: inherit;"),a.clientWidth>0){var b=document.getElementById("scaleSelect");b.setAttribute("style","min-width: inherit;");var c=b.clientWidth+SCALE_SELECT_CONTAINER_PADDING;b.setAttribute("style","min-width: "+(c+SCALE_SELECT_PADDING)+"px;"),a.setAttribute("style","min-width: "+c+"px; max-width: "+c+"px;")}
// Set the 'max-height' CSS property of the secondary toolbar.
SecondaryToolbar.setMaxHeight(document.getElementById("viewerContainer"))})},!0),window.addEventListener("scalechange",function(a){document.getElementById("zoomOut").disabled=a.scale===MIN_SCALE,document.getElementById("zoomIn").disabled=a.scale===MAX_SCALE;var b=document.getElementById("customScaleOption");if(b.selected=!1,!PDFViewerApplication.updateScaleControls&&(document.getElementById("pageWidthOption").selected||document.getElementById("pageFitOption").selected||document.getElementById("pageAutoOption").selected))return void updateViewarea();if(a.presetValue)return selectScaleOption(a.presetValue),void updateViewarea();var c=selectScaleOption(""+a.scale);if(!c){var d=Math.round(1e4*a.scale)/100;b.textContent=mozL10n.get("page_scale_percent",{scale:d},"{{scale}}%"),b.selected=!0}updateViewarea()},!0),window.addEventListener("pagechange",function(a){var b=a.pageNumber;a.previousPageNumber!==b&&(document.getElementById("pageNumber").value=b,PDFViewerApplication.sidebarOpen&&PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(b));var c=PDFViewerApplication.pagesCount;
// we need to update stats
if(document.getElementById("previous").disabled=1>=b,document.getElementById("next").disabled=b>=c,document.getElementById("firstPage").disabled=1>=b,document.getElementById("lastPage").disabled=b>=c,PDFJS.pdfBug&&Stats.enabled){var d=PDFViewerApplication.pdfViewer.getPageView(b-1);d.stats&&Stats.add(b,d.stats)}
// checking if the this.page was called from the updateViewarea function
a.updateInProgress||this.loading&&1===b||PDFViewerApplication.pdfViewer.scrollPageIntoView(b)},!0),window.addEventListener("DOMMouseScroll",handleMouseWheel),window.addEventListener("mousewheel",handleMouseWheel),window.addEventListener("click",function(a){PresentationMode.active?0===a.button&&
// Necessary since preventDefault() in 'mousedown' won't stop
// the event propagation in all circumstances in presentation mode.
a.preventDefault():SecondaryToolbar.opened&&PDFViewerApplication.pdfViewer.containsElement(a.target)&&SecondaryToolbar.close()},!1),window.addEventListener("keydown",function(a){if(!OverlayManager.active){var b=!1,c=(a.ctrlKey?1:0)|(a.altKey?2:0)|(a.shiftKey?4:0)|(a.metaKey?8:0);
// First, handle the key bindings that are independent whether an input
// control is selected or not.
if(1===c||8===c||5===c||12===c){
// either CTRL or META key with optional SHIFT.
var d=PDFViewerApplication.pdfViewer,e=d&&(d.presentationModeState===PresentationModeState.CHANGING||d.presentationModeState===PresentationModeState.FULLSCREEN);switch(a.keyCode){case 70:// f
PDFViewerApplication.supportsIntegratedFind||(PDFViewerApplication.findBar.open(),b=!0);break;case 71:// g
PDFViewerApplication.supportsIntegratedFind||(PDFViewerApplication.findBar.dispatchEvent("again",5===c||12===c),b=!0);break;case 61:// FF/Mac '='
case 107:// FF '+' and '='
case 187:// Chrome '+'
case 171:// FF with German keyboard
e||PDFViewerApplication.zoomIn(),b=!0;break;case 173:// FF/Mac '-'
case 109:// FF '-'
case 189:// Chrome '-'
e||PDFViewerApplication.zoomOut(),b=!0;break;case 48:// '0'
case 96:// '0' on Numpad of Swedish keyboard
e||(
// keeping it unhandled (to restore page zoom to 100%)
setTimeout(function(){
// ... and resetting the scale after browser adjusts its scale
PDFViewerApplication.setScale(DEFAULT_SCALE,!0)}),b=!1)}}
// CTRL or META without shift
if(1===c||8===c)switch(a.keyCode){case 83:// s
PDFViewerApplication.download(),b=!0}
// CTRL+ALT or Option+Command
if(3===c||10===c)switch(a.keyCode){case 80:// p
SecondaryToolbar.presentationModeClick(),b=!0;break;case 71:// g
// focuses input#pageNumber field
document.getElementById("pageNumber").select(),b=!0}if(b)return void a.preventDefault();
// Some shortcuts should not get handled if a control/input element
// is selected.
var f=document.activeElement||document.querySelector(":focus"),g=f&&f.tagName.toUpperCase();if("INPUT"!==g&&"TEXTAREA"!==g&&"SELECT"!==g||27===a.keyCode){if(0===c)// no control key pressed at all.
switch(a.keyCode){case 38:// up arrow
case 33:// pg up
case 8:// backspace
if(!PresentationMode.active&&"page-fit"!==PDFViewerApplication.currentScaleValue)break;/* in presentation mode */
/* falls through */
case 37:// left arrow
// horizontal scrolling using arrow keys
if(PDFViewerApplication.pdfViewer.isHorizontalScrollbarEnabled)break;/* falls through */
case 75:// 'k'
case 80:// 'p'
PDFViewerApplication.page--,b=!0;break;case 27:// esc key
SecondaryToolbar.opened&&(SecondaryToolbar.close(),b=!0),!PDFViewerApplication.supportsIntegratedFind&&PDFViewerApplication.findBar.opened&&(PDFViewerApplication.findBar.close(),b=!0);break;case 40:// down arrow
case 34:// pg down
case 32:// spacebar
if(!PresentationMode.active&&"page-fit"!==PDFViewerApplication.currentScaleValue)break;/* falls through */
case 39:// right arrow
// horizontal scrolling using arrow keys
if(PDFViewerApplication.pdfViewer.isHorizontalScrollbarEnabled)break;/* falls through */
case 74:// 'j'
case 78:// 'n'
PDFViewerApplication.page++,b=!0;break;case 36:// home
(PresentationMode.active||PDFViewerApplication.page>1)&&(PDFViewerApplication.page=1,b=!0);break;case 35:// end
(PresentationMode.active||PDFViewerApplication.pdfDocument&&PDFViewerApplication.page<PDFViewerApplication.pagesCount)&&(PDFViewerApplication.page=PDFViewerApplication.pagesCount,b=!0);break;case 72:// 'h'
PresentationMode.active||HandTool.toggle();break;case 82:// 'r'
PDFViewerApplication.rotatePages(90)}if(4===c)// shift-key
switch(a.keyCode){case 32:// spacebar
if(!PresentationMode.active&&"page-fit"!==PDFViewerApplication.currentScaleValue)break;PDFViewerApplication.page--,b=!0;break;case 82:// 'r'
PDFViewerApplication.rotatePages(-90)}if(b||PresentationMode.active||(
// 33=Page Up  34=Page Down  35=End    36=Home
// 37=Left     38=Up         39=Right  40=Down
a.keyCode>=33&&a.keyCode<=40&&!PDFViewerApplication.pdfViewer.containsElement(f)&&
// The page container is not focused, but a page navigation key has been
// pressed. Change the focus to the viewer container to make sure that
// navigation by keyboard works as expected.
PDFViewerApplication.pdfViewer.focus(),
// 32=Spacebar
32===a.keyCode&&"BUTTON"!==g&&(PDFViewerApplication.pdfViewer.containsElement(f)||PDFViewerApplication.pdfViewer.focus())),2===c)// alt-key
switch(a.keyCode){case 37:// left arrow
PresentationMode.active&&(PDFHistory.back(),b=!0);break;case 39:// right arrow
PresentationMode.active&&(PDFHistory.forward(),b=!0)}b&&(a.preventDefault(),PDFViewerApplication.clearMouseScrollState())}}}),window.addEventListener("beforeprint",function(a){PDFViewerApplication.beforePrint()}),window.addEventListener("afterprint",function(a){PDFViewerApplication.afterPrint()}),function(){
// The offsetParent is not set until the pdf.js iframe or object is visible.
// Waiting for first animation.
PDFViewerApplication.animationStartedPromise=new Promise(function(a){window.requestAnimationFrame(a)})}();