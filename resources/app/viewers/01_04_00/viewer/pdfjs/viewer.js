/* Copyright 2016 Mozilla Foundation
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
/*globals require, chrome */
"use strict";function getViewerConfiguration(){return{appContainer:document.body,mainContainer:document.getElementById("viewerContainer"),viewerContainer:document.getElementById("viewer"),toolbar:{numPages:document.getElementById("numPages"),pageNumber:document.getElementById("pageNumber"),scaleSelectContainer:document.getElementById("scaleSelectContainer"),scaleSelect:document.getElementById("scaleSelect"),customScaleOption:document.getElementById("customScaleOption"),previous:document.getElementById("previous"),next:document.getElementById("next"),firstPage:document.getElementById("firstPage"),lastPage:document.getElementById("lastPage"),zoomIn:document.getElementById("zoomIn"),zoomOut:document.getElementById("zoomOut"),viewFind:document.getElementById("viewFind"),openFile:document.getElementById("openFile"),print:document.getElementById("print"),presentationModeButton:document.getElementById("presentationMode"),download:document.getElementById("download"),viewBookmark:document.getElementById("viewBookmark")},secondaryToolbar:{toolbar:document.getElementById("secondaryToolbar"),toggleButton:document.getElementById("secondaryToolbarToggle"),presentationModeButton:document.getElementById("secondaryPresentationMode"),openFile:document.getElementById("secondaryOpenFile"),print:document.getElementById("secondaryPrint"),download:document.getElementById("secondaryDownload"),viewBookmark:document.getElementById("secondaryViewBookmark"),firstPage:document.getElementById("firstPage"),lastPage:document.getElementById("lastPage"),pageRotateCw:document.getElementById("pageRotateCw"),pageRotateCcw:document.getElementById("pageRotateCcw"),documentPropertiesButton:document.getElementById("documentProperties"),toggleHandTool:document.getElementById("toggleHandTool")},fullscreen:{contextFirstPage:document.getElementById("contextFirstPage"),contextLastPage:document.getElementById("contextLastPage"),contextPageRotateCw:document.getElementById("contextPageRotateCw"),contextPageRotateCcw:document.getElementById("contextPageRotateCcw")},sidebar:{
// Divs (and sidebar button)
mainContainer:document.getElementById("mainContainer"),outerContainer:document.getElementById("outerContainer"),toggleButton:document.getElementById("sidebarToggle"),
// Buttons
thumbnailButton:document.getElementById("viewThumbnail"),outlineButton:document.getElementById("viewOutline"),attachmentsButton:document.getElementById("viewAttachments"),
// Views
thumbnailView:document.getElementById("thumbnailView"),outlineView:document.getElementById("outlineView"),attachmentsView:document.getElementById("attachmentsView")},findBar:{bar:document.getElementById("findbar"),toggleButton:document.getElementById("viewFind"),findField:document.getElementById("findInput"),highlightAllCheckbox:document.getElementById("findHighlightAll"),caseSensitiveCheckbox:document.getElementById("findMatchCase"),findMsg:document.getElementById("findMsg"),findResultsCount:document.getElementById("findResultsCount"),findStatusIcon:document.getElementById("findStatusIcon"),findPreviousButton:document.getElementById("findPrevious"),findNextButton:document.getElementById("findNext")},passwordOverlay:{overlayName:"passwordOverlay",container:document.getElementById("passwordOverlay"),label:document.getElementById("passwordText"),input:document.getElementById("password"),submitButton:document.getElementById("passwordSubmit"),cancelButton:document.getElementById("passwordCancel")},documentProperties:{overlayName:"documentPropertiesOverlay",container:document.getElementById("documentPropertiesOverlay"),closeButton:document.getElementById("documentPropertiesClose"),fields:{fileName:document.getElementById("fileNameField"),fileSize:document.getElementById("fileSizeField"),title:document.getElementById("titleField"),author:document.getElementById("authorField"),subject:document.getElementById("subjectField"),keywords:document.getElementById("keywordsField"),creationDate:document.getElementById("creationDateField"),modificationDate:document.getElementById("modificationDateField"),creator:document.getElementById("creatorField"),producer:document.getElementById("producerField"),version:document.getElementById("versionField"),pageCount:document.getElementById("pageCountField")}},errorWrapper:{container:document.getElementById("errorWrapper"),errorMessage:document.getElementById("errorMessage"),closeButton:document.getElementById("errorClose"),errorMoreInfo:document.getElementById("errorMoreInfo"),moreInfoButton:document.getElementById("errorShowMore"),lessInfoButton:document.getElementById("errorShowLess")},printContainer:document.getElementById("printContainer"),openFileInputName:"fileInput"}}function webViewerLoad(){var a=getViewerConfiguration();window.PDFViewerApplication=pdfjsWebLibs.pdfjsWebApp.PDFViewerApplication,pdfjsWebLibs.pdfjsWebApp.PDFViewerApplication.run(a)}var DEFAULT_URL="Toxicological_Studies_-_Reference_List.pdf",pdfjsWebLibs={pdfjsWebPDFJS:window.pdfjsDistBuildPdf};(function(){!function(a,b){b(a.pdfjsWebGrabToPan={})}(this,function(a){/**
   * Construct a GrabToPan instance for a given HTML element.
   * @param options.element {Element}
   * @param options.ignoreTarget {function} optional. See `ignoreTarget(node)`
   * @param options.onActiveChanged {function(boolean)} optional. Called
   *  when grab-to-pan is (de)activated. The first argument is a boolean that
   *  shows whether grab-to-pan is activated.
   */
function b(a){this.element=a.element,this.document=a.element.ownerDocument,"function"==typeof a.ignoreTarget&&(this.ignoreTarget=a.ignoreTarget),this.onActiveChanged=a.onActiveChanged,
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
function c(a){return"buttons"in a&&e?!(1|a.buttons):g||h?0===a.which:void 0}b.prototype={/**
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
return a[d]("a[href], a[href] *, input, textarea, button, button *, select, option")},/**
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
_onmousemove:function(a){if(this.element.removeEventListener("scroll",this._endPan,!0),c(a))return void this._endPan();var b=a.clientX-this.clientXStart,d=a.clientY-this.clientYStart;this.element.scrollTop=this.scrollTopStart-d,this.element.scrollLeft=this.scrollLeftStart-b,this.overlay.parentNode||document.body.appendChild(this.overlay)},/**
     * @private
     */
_endPan:function(){this.element.removeEventListener("scroll",this._endPan,!0),this.document.removeEventListener("mousemove",this._onmousemove,!0),this.document.removeEventListener("mouseup",this._endPan,!0),this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)}};
// Get the correct (vendor-prefixed) name of the matches method.
var d;["webkitM","mozM","msM","oM","m"].some(function(a){var b=a+"atches";return b in document.documentElement&&(d=b),b+="Selector",b in document.documentElement&&(d=b),d});
// Browser sniffing because it's impossible to feature-detect
// whether event.which for onmousemove is reliable
var e=!document.documentMode||document.documentMode>9,f=window.chrome,g=f&&(f.webstore||f.app),h=/Apple/.test(navigator.vendor)&&/Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);a.GrabToPan=b}),function(a,b){b(a.pdfjsWebMozPrintCallbackPolyfill={})}(this,function(a){function b(a){var b=document.createEvent("CustomEvent");b.initCustomEvent(a,!1,!1,"custom"),window.dispatchEvent(b)}function c(){if(f)if(e(),++g<f.length){var a=f[g];"function"==typeof a.mozPrintCallback?a.mozPrintCallback({context:a.getContext("2d"),abort:d,done:c}):c()}else e(),h.call(window),setTimeout(d,20)}function d(){f&&(f=null,e(),b("afterprint"))}function e(){var a=document.getElementById("mozPrintCallback-shim");if(f&&f.length){var b=Math.round(100*g/f.length),c=a.querySelector("progress"),e=a.querySelector(".relative-progress");c.value=b,e.textContent=b+"%",a.removeAttribute("hidden"),a.onclick=d}else a.setAttribute("hidden","")}if(!("mozPrintCallback"in document.createElement("canvas"))){
// Cause positive result on feature-detection:
HTMLCanvasElement.prototype.mozPrintCallback=void 0;var f,g,h=window.print;window.print=function(){if(f)return void console.warn("Ignored window.print() because of a pending print job.");try{b("beforeprint")}finally{f=document.querySelectorAll("canvas"),g=-1,c()}};var i=!!document.attachEvent;if(window.addEventListener("keydown",function(a){
// Intercept Cmd/Ctrl + P in all browsers.
// Also intercept Cmd/Ctrl + Shift + P in Chrome and Opera
if(80===a.keyCode&&(a.ctrlKey||a.metaKey)&&!a.altKey&&(!a.shiftKey||window.chrome||window.opera)){if(window.print(),i)
// Only attachEvent can cancel Ctrl + P dialog in IE <=10
// attachEvent is gone in IE11, so the dialog will re-appear in IE11.
return;return a.preventDefault(),void(a.stopImmediatePropagation?a.stopImmediatePropagation():a.stopPropagation())}27===a.keyCode&&f&&// Esc
d()},!0),i&&document.attachEvent("onkeydown",function(a){return a=a||window.event,80===a.keyCode&&a.ctrlKey?(a.keyCode=0,!1):void 0}),"onbeforeprint"in window){
// Do not propagate before/afterprint events when they are not triggered
// from within this polyfill. (FF/IE).
var j=function(a){"custom"!==a.detail&&a.stopImmediatePropagation&&a.stopImmediatePropagation()};window.addEventListener("beforeprint",j,!1),window.addEventListener("afterprint",j,!1)}}}),function(a,b){b(a.pdfjsWebOverlayManager={})}(this,function(a){var b={overlays:{},active:null,/**
   * @param {string} name The name of the overlay that is registered.
   * @param {HTMLDivElement} element The overlay's DOM element.
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
register:function(a,b,c,d){return new Promise(function(e){var f;if(!(a&&b&&(f=b.parentNode)))throw new Error("Not enough parameters.");if(this.overlays[a])throw new Error("The overlay is already registered.");this.overlays[a]={element:b,container:f,callerCloseMethod:c||null,canForceClose:d||!1},e()}.bind(this))},/**
   * @param {string} name The name of the overlay that is unregistered.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    unregistered.
   */
unregister:function(a){return new Promise(function(b){if(!this.overlays[a])throw new Error("The overlay does not exist.");if(this.active===a)throw new Error("The overlay cannot be removed while it is active.");delete this.overlays[a],b()}.bind(this))},/**
   * @param {string} name The name of the overlay that should be opened.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    opened.
   */
open:function(a){return new Promise(function(b){if(!this.overlays[a])throw new Error("The overlay does not exist.");if(this.active){if(!this.overlays[a].canForceClose)throw this.active===a?new Error("The overlay is already active."):new Error("Another overlay is currently active.");this._closeThroughCaller()}this.active=a,this.overlays[this.active].element.classList.remove("hidden"),this.overlays[this.active].container.classList.remove("hidden"),window.addEventListener("keydown",this._keyDown),b()}.bind(this))},/**
   * @param {string} name The name of the overlay that should be closed.
   * @returns {Promise} A promise that is resolved when the overlay has been
   *                    closed.
   */
close:function(a){return new Promise(function(b){if(!this.overlays[a])throw new Error("The overlay does not exist.");if(!this.active)throw new Error("The overlay is currently not active.");if(this.active!==a)throw new Error("Another overlay is currently active.");this.overlays[this.active].container.classList.add("hidden"),this.overlays[this.active].element.classList.add("hidden"),this.active=null,window.removeEventListener("keydown",this._keyDown),b()}.bind(this))},/**
   * @private
   */
_keyDown:function(a){var c=b;c.active&&27===a.keyCode&&(// Esc key.
c._closeThroughCaller(),a.preventDefault())},/**
   * @private
   */
_closeThroughCaller:function(){this.overlays[this.active].callerCloseMethod&&this.overlays[this.active].callerCloseMethod(),this.active&&this.close(this.active)}};a.OverlayManager=b}),function(a,b){b(a.pdfjsWebPDFHistory={})}(this,function(a){function b(a){this.linkService=a.linkService,this.initialized=!1,this.initialDestination=null,this.initialBookmark=null}b.prototype={/**
     * @param {string} fingerprint
     * @param {IPDFLinkService} linkService
     */
initialize:function(a){function b(){f.previousHash=window.location.hash.slice(1),f._pushToHistory({hash:f.previousHash},!1,!0),f._updatePreviousBookmark()}function c(a,b){function c(){window.removeEventListener("popstate",c),window.addEventListener("popstate",d),f._pushToHistory(a,!1,!0),history.forward()}function d(){window.removeEventListener("popstate",d),f.allowHashChange=!0,f.historyUnlocked=!0,b()}
// To modify the previous history entry, the following happens:
// 1. history.back()
// 2. _pushToHistory, which calls history.replaceState( ... )
// 3. history.forward()
// Because a navigation via the history API does not immediately update
// the history state, the popstate event is used for synchronization.
f.historyUnlocked=!1,
// Suppress the hashchange event to avoid side effects caused by
// navigating back and forward.
f.allowHashChange=!1,window.addEventListener("popstate",c),history.back()}function d(){var a=f._getPreviousParams(null,!0);if(a){var b=!f.current.dest&&f.current.hash!==f.previousHash;f._pushToHistory(a,!1,b),f._updatePreviousBookmark()}
// Remove the event listener when navigating away from the document,
// since 'beforeunload' prevents Firefox from caching the document.
window.removeEventListener("beforeunload",d,!1)}this.initialized=!0,this.reInitialized=!1,this.allowHashChange=!0,this.historyUnlocked=!0,this.isViewerInPresentationMode=!1,this.previousHash=window.location.hash.substring(1),this.currentBookmark="",this.currentPage=0,this.updatePreviousBookmark=!1,this.previousBookmark="",this.previousPage=0,this.nextHashParam="",this.fingerprint=a,this.currentUid=this.uid=0,this.current={};var e=window.history.state;this._isStateObjectDefined(e)?(
// This corresponds to navigating back to the document
// from another page in the browser history.
e.target.dest?this.initialDestination=e.target.dest:this.initialBookmark=e.target.hash,this.currentUid=e.uid,this.uid=e.uid+1,this.current=e.target):(
// This corresponds to the loading of a new document.
e&&e.fingerprint&&this.fingerprint!==e.fingerprint&&(
// Reinitialize the browsing history when a new document
// is opened in the web viewer.
this.reInitialized=!0),this._pushOrReplaceState({fingerprint:this.fingerprint},!0));var f=this;window.addEventListener("popstate",function(a){if(f.historyUnlocked){if(a.state)
// Move back/forward in the history.
return void f._goTo(a.state);
// If the state is not set, then the user tried to navigate to a
// different hash by manually editing the URL and pressing Enter, or by
// clicking on an in-page link (e.g. the "current view" link).
// Save the current view state to the browser history.
// Note: In Firefox, history.null could also be null after an in-page
// navigation to the same URL, and without dispatching the popstate
// event: https://bugzilla.mozilla.org/show_bug.cgi?id=1183881
if(0===f.uid){
// Replace the previous state if it was not explicitly set.
var d=f.previousHash&&f.currentBookmark&&f.previousHash!==f.currentBookmark?{hash:f.currentBookmark,page:f.currentPage}:{page:1};c(d,function(){b()})}else b()}},!1),window.addEventListener("beforeunload",d,!1),window.addEventListener("pageshow",function(a){
// If the entire viewer (including the PDF file) is cached in
// the browser, we need to reattach the 'beforeunload' event listener
// since the 'DOMContentLoaded' event is not fired on 'pageshow'.
window.addEventListener("beforeunload",d,!1)},!1),window.addEventListener("presentationmodechanged",function(a){f.isViewerInPresentationMode=!!a.detail.active})},clearHistoryState:function(){this._pushOrReplaceState(null,!0)},_isStateObjectDefined:function(a){return!!(a&&a.uid>=0&&a.fingerprint&&this.fingerprint===a.fingerprint&&a.target&&a.target.hash)},_pushOrReplaceState:function(a,b){b?window.history.replaceState(a,"",document.URL):window.history.pushState(a,"",document.URL)},get isHashChangeUnlocked(){return this.initialized?this.allowHashChange:!0},_updatePreviousBookmark:function(){this.updatePreviousBookmark&&this.currentBookmark&&this.currentPage&&(this.previousBookmark=this.currentBookmark,this.previousPage=this.currentPage,this.updatePreviousBookmark=!1)},updateCurrentBookmark:function(a,b){this.initialized&&(this.currentBookmark=a.substring(1),this.currentPage=0|b,this._updatePreviousBookmark())},updateNextHashParam:function(a){this.initialized&&(this.nextHashParam=a)},push:function(a,b){if(this.initialized&&this.historyUnlocked){if(a.dest&&!a.hash&&(a.hash=this.current.hash&&this.current.dest&&this.current.dest===a.dest?this.current.hash:this.linkService.getDestinationHash(a.dest).split("#")[1]),a.page&&(a.page|=0),b){var c=window.history.state.target;
// Invoked when the user specifies an initial bookmark,
// thus setting initialBookmark, when the document is loaded.
// If the current document is reloaded,
// avoid creating duplicate entries in the history.
return c||(this._pushToHistory(a,!1),this.previousHash=window.location.hash.substring(1)),this.updatePreviousBookmark=!this.nextHashParam,void(c&&this._updatePreviousBookmark())}if(this.nextHashParam){if(this.nextHashParam===a.hash)return this.nextHashParam=null,void(this.updatePreviousBookmark=!0);this.nextHashParam=null}a.hash?this.current.hash?this.current.hash!==a.hash?this._pushToHistory(a,!0):(!this.current.page&&a.page&&this._pushToHistory(a,!1,!0),this.updatePreviousBookmark=!0):this._pushToHistory(a,!0):this.current.page&&a.page&&this.current.page!==a.page&&this._pushToHistory(a,!0)}},_getPreviousParams:function(a,b){if(!this.currentBookmark||!this.currentPage)return null;if(this.updatePreviousBookmark&&(this.updatePreviousBookmark=!1),this.uid>0&&(!this.previousBookmark||!this.previousPage))
// Prevent the history from getting stuck in the current state,
// effectively preventing the user from going back/forward in
// the history.
//
// This happens if the current position in the document didn't change
// when the history was previously updated. The reasons for this are
// either:
// 1. The current zoom value is such that the document does not need to,
//    or cannot, be scrolled to display the destination.
// 2. The previous destination is broken, and doesn't actally point to a
//    position within the document.
//    (This is either due to a bad PDF generator, or the user making a
//     mistake when entering a destination in the hash parameters.)
return null;if(!this.current.dest&&!a||b){if(this.previousBookmark===this.currentBookmark)return null}else{if(!this.current.page&&!a)return null;if(this.previousPage===this.currentPage)return null}var c={hash:this.currentBookmark,page:this.currentPage};return this.isViewerInPresentationMode&&(c.hash=null),c},_stateObj:function(a){return{fingerprint:this.fingerprint,uid:this.uid,target:a}},_pushToHistory:function(a,b,c){if(this.initialized){if(!a.hash&&a.page&&(a.hash="page="+a.page),b&&!c){var d=this._getPreviousParams();if(d){var e=!this.current.dest&&this.current.hash!==this.previousHash;this._pushToHistory(d,!1,e)}}this._pushOrReplaceState(this._stateObj(a),c||0===this.uid),this.currentUid=this.uid++,this.current=a,this.updatePreviousBookmark=!0}},_goTo:function(a){if(this.initialized&&this.historyUnlocked&&this._isStateObjectDefined(a)){if(!this.reInitialized&&a.uid<this.currentUid){var b=this._getPreviousParams(!0);if(b)return this._pushToHistory(this.current,!1),this._pushToHistory(b,!1),this.currentUid=a.uid,void window.history.back()}this.historyUnlocked=!1,a.target.dest?this.linkService.navigateTo(a.target.dest):this.linkService.setHash(a.target.hash),this.currentUid=a.uid,a.uid>this.uid&&(this.uid=a.uid),this.current=a.target,this.updatePreviousBookmark=!0;var c=window.location.hash.substring(1);this.previousHash!==c&&(this.allowHashChange=!1),this.previousHash=c,this.historyUnlocked=!0}},back:function(){this.go(-1)},forward:function(){this.go(1)},go:function(a){if(this.initialized&&this.historyUnlocked){var b=window.history.state;-1===a&&b&&b.uid>0?window.history.back():1===a&&b&&b.uid<this.uid-1&&window.history.forward()}}},a.PDFHistory=b}),function(a,b){b(a.pdfjsWebPDFPresentationMode={})}(this,function(a){var b=1500,c=3e3,d="pdfPresentationMode",e="pdfPresentationModeControls",f=function(){/**
   * @constructs PDFPresentationMode
   * @param {PDFPresentationModeOptions} options
   */
function a(a){this.container=a.container,this.viewer=a.viewer||a.container.firstElementChild,this.pdfViewer=a.pdfViewer;var b=a.contextMenuItems||null;if(this.active=!1,this.args=null,this.contextMenuOpen=!1,this.mouseScrollTimeStamp=0,this.mouseScrollDelta=0,b)for(var c=0,d=b.length;d>c;c++){var e=b[c];e.element.addEventListener("click",function(a){this.contextMenuOpen=!1,a()}.bind(this,e.handler))}}return a.prototype={/**
     * Request the browser to enter fullscreen mode.
     * @returns {boolean} Indicating if the request was successful.
     */
request:function(){if(this.switchInProgress||this.active||!this.viewer.hasChildNodes())return!1;if(this._addFullscreenChangeListeners(),this._setSwitchInProgress(),this._notifyStateChange(),this.container.requestFullscreen)this.container.requestFullscreen();else if(this.container.mozRequestFullScreen)this.container.mozRequestFullScreen();else if(this.container.webkitRequestFullscreen)this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);else{if(!this.container.msRequestFullscreen)return!1;this.container.msRequestFullscreen()}return this.args={page:this.pdfViewer.currentPageNumber,previousScale:this.pdfViewer.currentScaleValue},!0},/**
     * Switches page when the user scrolls (using a scroll wheel or a touchpad)
     * with large enough motion, to prevent accidental page switches.
     * @param {number} delta - The delta value from the mouse event.
     */
mouseScroll:function(a){if(this.active){var b=50,c=120,d={UP:-1,DOWN:1},e=(new Date).getTime(),f=this.mouseScrollTimeStamp;
// If we've already switched page, avoid accidentally switching again.
if(!(e>f&&b>e-f)&&((this.mouseScrollDelta>0&&0>a||this.mouseScrollDelta<0&&a>0)&&this._resetMouseScrollState(),this.mouseScrollDelta+=a,Math.abs(this.mouseScrollDelta)>=c)){var g=this.mouseScrollDelta>0?d.UP:d.DOWN,h=this.pdfViewer.currentPageNumber;
// If we're at the first/last page, we don't need to do anything.
if(this._resetMouseScrollState(),1===h&&g===d.UP||h===this.pdfViewer.pagesCount&&g===d.DOWN)return;this.pdfViewer.currentPageNumber=h+g,this.mouseScrollTimeStamp=e}}},get isFullscreen(){return!!(document.fullscreenElement||document.mozFullScreen||document.webkitIsFullScreen||document.msFullscreenElement)},/**
     * @private
     */
_notifyStateChange:function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("presentationmodechanged",!0,!0,{active:this.active,switchInProgress:!!this.switchInProgress}),window.dispatchEvent(a)},/**
     * Used to initialize a timeout when requesting Presentation Mode,
     * i.e. when the browser is requested to enter fullscreen mode.
     * This timeout is used to prevent the current page from being scrolled
     * partially, or completely, out of view when entering Presentation Mode.
     * NOTE: This issue seems limited to certain zoom levels (e.g. page-width).
     * @private
     */
_setSwitchInProgress:function(){this.switchInProgress&&clearTimeout(this.switchInProgress),this.switchInProgress=setTimeout(function(){this._removeFullscreenChangeListeners(),delete this.switchInProgress,this._notifyStateChange()}.bind(this),b)},/**
     * @private
     */
_resetSwitchInProgress:function(){this.switchInProgress&&(clearTimeout(this.switchInProgress),delete this.switchInProgress)},/**
     * @private
     */
_enter:function(){this.active=!0,this._resetSwitchInProgress(),this._notifyStateChange(),this.container.classList.add(d),
// Ensure that the correct page is scrolled into view when entering
// Presentation Mode, by waiting until fullscreen mode in enabled.
setTimeout(function(){this.pdfViewer.currentPageNumber=this.args.page,this.pdfViewer.currentScaleValue="page-fit"}.bind(this),0),this._addWindowListeners(),this._showControls(),this.contextMenuOpen=!1,this.container.setAttribute("contextmenu","viewerContextMenu"),
// Text selection is disabled in Presentation Mode, thus it's not possible
// for the user to deselect text that is selected (e.g. with "Select all")
// when entering Presentation Mode, hence we remove any active selection.
window.getSelection().removeAllRanges()},/**
     * @private
     */
_exit:function(){var a=this.pdfViewer.currentPageNumber;this.container.classList.remove(d),
// Ensure that the correct page is scrolled into view when exiting
// Presentation Mode, by waiting until fullscreen mode is disabled.
setTimeout(function(){this.active=!1,this._removeFullscreenChangeListeners(),this._notifyStateChange(),this.pdfViewer.currentScaleValue=this.args.previousScale,this.pdfViewer.currentPageNumber=a,this.args=null}.bind(this),0),this._removeWindowListeners(),this._hideControls(),this._resetMouseScrollState(),this.container.removeAttribute("contextmenu"),this.contextMenuOpen=!1},/**
     * @private
     */
_mouseDown:function(a){if(this.contextMenuOpen)return this.contextMenuOpen=!1,void a.preventDefault();if(0===a.button){
// Enable clicking of links in presentation mode. Please note:
// Only links pointing to destinations in the current PDF document work.
var b=a.target.href&&a.target.classList.contains("internalLink");b||(
// Unless an internal link was clicked, advance one page.
a.preventDefault(),this.pdfViewer.currentPageNumber+=a.shiftKey?-1:1)}},/**
     * @private
     */
_contextMenu:function(){this.contextMenuOpen=!0},/**
     * @private
     */
_showControls:function(){this.controlsTimeout?clearTimeout(this.controlsTimeout):this.container.classList.add(e),this.controlsTimeout=setTimeout(function(){this.container.classList.remove(e),delete this.controlsTimeout}.bind(this),c)},/**
     * @private
     */
_hideControls:function(){this.controlsTimeout&&(clearTimeout(this.controlsTimeout),this.container.classList.remove(e),delete this.controlsTimeout)},/**
     * Resets the properties used for tracking mouse scrolling events.
     * @private
     */
_resetMouseScrollState:function(){this.mouseScrollTimeStamp=0,this.mouseScrollDelta=0},/**
     * @private
     */
_addWindowListeners:function(){this.showControlsBind=this._showControls.bind(this),this.mouseDownBind=this._mouseDown.bind(this),this.resetMouseScrollStateBind=this._resetMouseScrollState.bind(this),this.contextMenuBind=this._contextMenu.bind(this),window.addEventListener("mousemove",this.showControlsBind),window.addEventListener("mousedown",this.mouseDownBind),window.addEventListener("keydown",this.resetMouseScrollStateBind),window.addEventListener("contextmenu",this.contextMenuBind)},/**
     * @private
     */
_removeWindowListeners:function(){window.removeEventListener("mousemove",this.showControlsBind),window.removeEventListener("mousedown",this.mouseDownBind),window.removeEventListener("keydown",this.resetMouseScrollStateBind),window.removeEventListener("contextmenu",this.contextMenuBind),delete this.showControlsBind,delete this.mouseDownBind,delete this.resetMouseScrollStateBind,delete this.contextMenuBind},/**
     * @private
     */
_fullscreenChange:function(){this.isFullscreen?this._enter():this._exit()},/**
     * @private
     */
_addFullscreenChangeListeners:function(){this.fullscreenChangeBind=this._fullscreenChange.bind(this),window.addEventListener("fullscreenchange",this.fullscreenChangeBind),window.addEventListener("mozfullscreenchange",this.fullscreenChangeBind),window.addEventListener("webkitfullscreenchange",this.fullscreenChangeBind),window.addEventListener("MSFullscreenChange",this.fullscreenChangeBind)},/**
     * @private
     */
_removeFullscreenChangeListeners:function(){window.removeEventListener("fullscreenchange",this.fullscreenChangeBind),window.removeEventListener("mozfullscreenchange",this.fullscreenChangeBind),window.removeEventListener("webkitfullscreenchange",this.fullscreenChangeBind),window.removeEventListener("MSFullscreenChange",this.fullscreenChangeBind),delete this.fullscreenChangeBind}},a}();a.PDFPresentationMode=f}),function(a,b){b(a.pdfjsWebPDFRenderingQueue={})}(this,function(a){var b=3e4,c={INITIAL:0,RUNNING:1,PAUSED:2,FINISHED:3},d=function(){/**
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
this.pdfViewer.forceRendering(a)||this.pdfThumbnailViewer&&this.isThumbnailViewEnabled&&this.pdfThumbnailViewer.forceRendering()||this.printing||this.onIdle&&(this.idleTimeout=setTimeout(this.onIdle.bind(this),b))},getHighestPriority:function(a,b,c){
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
isViewFinished:function(a){return a.renderingState===c.FINISHED},/**
     * Render a page or thumbnail view. This calls the appropriate function
     * based on the views state. If the view is already rendered it will return
     * false.
     * @param {IRenderableView} view
     */
renderView:function(a){var b=a.renderingState;switch(b){case c.FINISHED:return!1;case c.PAUSED:this.highestPriorityPage=a.renderingId,a.resume();break;case c.RUNNING:this.highestPriorityPage=a.renderingId;break;case c.INITIAL:this.highestPriorityPage=a.renderingId;var d=function(){this.renderHighestPriority()}.bind(this);a.draw().then(d,d)}return!0}},a}();a.RenderingStates=c,a.PDFRenderingQueue=d}),function(a,b){b(a.pdfjsWebPreferences={})}(this,function(a){var b={showPreviousViewOnLoad:!0,defaultZoomValue:"",sidebarViewOnLoad:0,enableHandToolOnLoad:!1,enableWebGL:!1,pdfBugEnabled:!1,disableRange:!1,disableStream:!1,disableAutoFetch:!1,disableFontFace:!1,disableTextLayer:!1,useOnlyCssZoom:!1,externalLinkTarget:0},c={prefs:Object.create(b),isInitializedPromiseResolved:!1,initializedPromise:null,/**
   * Initialize and fetch the current preference values from storage.
   * @return {Promise} A promise that is resolved when the preferences
   *                   have been initialized.
   */
initialize:function(){return this.initializedPromise=this._readFromStorage(b).then(function(a){this.isInitializedPromiseResolved=!0,a&&(this.prefs=a)}.bind(this))},/**
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
reset:function(){return this.initializedPromise.then(function(){return this.prefs=Object.create(b),this._writeToStorage(b)}.bind(this))},/**
   * Replace the current preference values with the ones from storage.
   * @return {Promise} A promise that is resolved when the preference values
   *                   have been updated.
   */
reload:function(){return this.initializedPromise.then(function(){this._readFromStorage(b).then(function(a){a&&(this.prefs=a)}.bind(this))}.bind(this))},/**
   * Set the value of a preference.
   * @param {string} name The name of the preference that should be changed.
   * @param {boolean|number|string} value The new value of the preference.
   * @return {Promise} A promise that is resolved when the value has been set,
   *                   provided that the preference exists and the types match.
   */
set:function(a,c){return this.initializedPromise.then(function(){if(void 0===b[a])throw new Error("preferencesSet: '"+a+"' is undefined.");if(void 0===c)throw new Error("preferencesSet: no value is specified.");var d=typeof c,e=typeof b[a];if(d!==e){if("number"!==d||"string"!==e)throw new Error("Preferences_set: '"+c+"' is a \""+d+'", expected "'+e+'".');c=c.toString()}else if("number"===d&&(0|c)!==c)throw new Error("Preferences_set: '"+c+'\' must be an "integer".');return this.prefs[a]=c,this._writeToStorage(this.prefs)}.bind(this))},/**
   * Get the value of a preference.
   * @param {string} name The name of the preference whose value is requested.
   * @return {Promise} A promise that is resolved with a {boolean|number|string}
   *                   containing the value of the preference.
   */
get:function(a){return this.initializedPromise.then(function(){var c=b[a];if(void 0===c)throw new Error("preferencesGet: '"+a+"' is undefined.");var d=this.prefs[a];return void 0!==d?d:c}.bind(this))}};c._writeToStorage=function(a){return new Promise(function(b){localStorage.setItem("pdfjs.preferences",JSON.stringify(a)),b()})},c._readFromStorage=function(a){return new Promise(function(a){var b=JSON.parse(localStorage.getItem("pdfjs.preferences"));a(b)})},a.Preferences=c}),function(a,b){b(a.pdfjsWebViewHistory={})}(this,function(a){var b=20,c=function(){function a(a,c){this.fingerprint=a,this.cacheSize=c||b,this.isInitializedPromiseResolved=!1,this.initializedPromise=this._readFromStorage().then(function(a){this.isInitializedPromiseResolved=!0;var b=JSON.parse(a||"{}");"files"in b||(b.files=[]),b.files.length>=this.cacheSize&&b.files.shift();for(var c,d=0,e=b.files.length;e>d;d++){var f=b.files[d];if(f.fingerprint===this.fingerprint){c=d;break}}"number"!=typeof c&&(c=b.files.push({fingerprint:this.fingerprint})-1),this.file=b.files[c],this.database=b}.bind(this))}return a.prototype={_writeToStorage:function(){return new Promise(function(a){var b=JSON.stringify(this.database);localStorage.setItem("database",b),a()}.bind(this))},_readFromStorage:function(){return new Promise(function(a){a(localStorage.getItem("database"))})},set:function(a,b){return this.isInitializedPromiseResolved?(this.file[a]=b,this._writeToStorage()):void 0},setMultiple:function(a){if(this.isInitializedPromiseResolved){for(var b in a)this.file[b]=a[b];return this._writeToStorage()}},get:function(a,b){return this.isInitializedPromiseResolved?this.file[a]||b:b}},a}();a.ViewHistory=c}),function(a,b){b(a.pdfjsWebDownloadManager={},a.pdfjsWebPDFJS)}(this,function(a,b){function c(a,b){var c=document.createElement("a");if(c.click)
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
var d=-1===a.indexOf("?")?"?":"&";a=a.replace(/#|$/,d+"$&")}window.open(a,"_parent")}}function d(){}d.prototype={downloadUrl:function(a,d){b.isValidUrl(a,!0)&&c(a+"#pdfjs.action=download",d)},downloadData:function(a,d,e){if(navigator.msSaveBlob)// IE10 and above
return navigator.msSaveBlob(new Blob([a],{type:e}),d);var f=b.createObjectURL(a,e,b.PDFJS.disableCreateObjectURL);c(f,d)},download:function(a,b,d){if(!URL)
// URL.createObjectURL is not supported
return void this.downloadUrl(b,d);if(navigator.msSaveBlob)
// IE10 / IE11
return void(navigator.msSaveBlob(a,d)||this.downloadUrl(b,d));var e=URL.createObjectURL(a);c(e,d)}},a.DownloadManager=d}),function(a,b){b(a.pdfjsWebFirefoxCom={},a.pdfjsWebPreferences,a.pdfjsWebPDFJS)}(this,function(a,b,c){}),function(a,b){b(a.pdfjsWebPDFAttachmentViewer={},a.pdfjsWebPDFJS)}(this,function(a,b){/**
 * @typedef {Object} PDFAttachmentViewerOptions
 * @property {HTMLDivElement} container - The viewer element.
 * @property {DownloadManager} downloadManager - The download manager.
 */
/**
 * @typedef {Object} PDFAttachmentViewerRenderParameters
 * @property {Array|null} attachments - An array of attachment objects.
 */
/**
 * @class
 */
var c=function(){/**
   * @constructs PDFAttachmentViewer
   * @param {PDFAttachmentViewerOptions} options
   */
function a(a){this.attachments=null,this.container=a.container,this.downloadManager=a.downloadManager}return a.prototype={reset:function(){this.attachments=null;for(var a=this.container;a.firstChild;)a.removeChild(a.firstChild)},/**
     * @private
     */
_dispatchEvent:function(a){var b=document.createEvent("CustomEvent");b.initCustomEvent("attachmentsloaded",!0,!0,{attachmentsCount:a}),this.container.dispatchEvent(b)},/**
     * @private
     */
_bindLink:function(a,b,c){a.onclick=function(a){return this.downloadManager.downloadData(b,c,""),!1}.bind(this)},/**
     * @param {PDFAttachmentViewerRenderParameters} params
     */
render:function(a){var c=a&&a.attachments||null,d=0;if(this.attachments&&this.reset(),this.attachments=c,!c)return void this._dispatchEvent(d);var e=Object.keys(c).sort(function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase())});d=e.length;for(var f=0;d>f;f++){var g=c[e[f]],h=b.getFilenameFromUrl(g.filename),i=document.createElement("div");i.className="attachmentsItem";var j=document.createElement("button");this._bindLink(j,g.content,h),j.textContent=b.removeNullCharacters(h),i.appendChild(j),this.container.appendChild(i)}this._dispatchEvent(d)}},a}();a.PDFAttachmentViewer=c}),function(a,b){b(a.pdfjsWebPDFOutlineViewer={},a.pdfjsWebPDFJS)}(this,function(a,b){var c="–",d=function(){/**
   * @constructs PDFOutlineViewer
   * @param {PDFOutlineViewerOptions} options
   */
function a(a){this.outline=null,this.lastToggleIsShow=!0,this.container=a.container,this.linkService=a.linkService}return a.prototype={reset:function(){this.outline=null,this.lastToggleIsShow=!0;for(var a=this.container;a.firstChild;)a.removeChild(a.firstChild)},/**
     * @private
     */
_dispatchEvent:function(a){var b=document.createEvent("CustomEvent");b.initCustomEvent("outlineloaded",!0,!0,{outlineCount:a}),this.container.dispatchEvent(b)},/**
     * @private
     */
_bindLink:function(a,c){if(c.url)return void b.addLinkAttributes(a,{url:c.url});var d=this.linkService;a.href=d.getDestinationHash(c.dest),a.onclick=function(a){return d.navigateTo(c.dest),!1}},/**
     * @private
     */
_setStyles:function(a,b){var c="";b.bold&&(c+="font-weight: bold;"),b.italic&&(c+="font-style: italic;"),c&&a.setAttribute("style",c)},/**
     * Prepend a button before an outline item which allows the user to toggle
     * the visibility of all outline items at that level.
     *
     * @private
     */
_addToggleButton:function(a){var b=document.createElement("div");b.className="outlineItemToggler",b.onclick=function(c){if(c.stopPropagation(),b.classList.toggle("outlineItemsHidden"),c.shiftKey){var d=!b.classList.contains("outlineItemsHidden");this._toggleOutlineItem(a,d)}}.bind(this),a.insertBefore(b,a.firstChild)},/**
     * Toggle the visibility of the subtree of an outline item.
     *
     * @param {Element} root - the root of the outline (sub)tree.
     * @param {boolean} state - whether to show the outline (sub)tree. If false,
     *   the outline subtree rooted at |root| will be collapsed.
     *
     * @private
     */
_toggleOutlineItem:function(a,b){this.lastToggleIsShow=b;for(var c=a.querySelectorAll(".outlineItemToggler"),d=0,e=c.length;e>d;++d)c[d].classList[b?"remove":"add"]("outlineItemsHidden")},/**
     * Collapse or expand all subtrees of the outline.
     */
toggleOutlineTree:function(){this.outline&&this._toggleOutlineItem(this.container,!this.lastToggleIsShow)},/**
     * @param {PDFOutlineViewerRenderParameters} params
     */
render:function(a){var d=a&&a.outline||null,e=0;if(this.outline&&this.reset(),this.outline=d,!d)return void this._dispatchEvent(e);for(var f=document.createDocumentFragment(),g=[{parent:f,items:this.outline}],h=!1;g.length>0;)for(var i=g.shift(),j=0,k=i.items.length;k>j;j++){var l=i.items[j],m=document.createElement("div");m.className="outlineItem";var n=document.createElement("a");if(this._bindLink(n,l),this._setStyles(n,l),n.textContent=b.removeNullCharacters(l.title)||c,m.appendChild(n),l.items.length>0){h=!0,this._addToggleButton(m);var o=document.createElement("div");o.className="outlineItems",m.appendChild(o),g.push({parent:o,items:l.items})}i.parent.appendChild(m),e++}h&&this.container.classList.add("outlineWithDeepNesting"),this.container.appendChild(f),this._dispatchEvent(e)}},a}();a.PDFOutlineViewer=d}),function(a,b){b(a.pdfjsWebPDFSidebar={},a.pdfjsWebPDFRenderingQueue)}(this,function(a,b){var c=b.RenderingStates,d={NONE:0,THUMBS:1,OUTLINE:2,ATTACHMENTS:3},e=function(){/**
   * @constructs PDFSidebar
   * @param {PDFSidebarOptions} options
   */
function a(a){this.isOpen=!1,this.active=d.THUMBS,this.isInitialViewSet=!1,/**
     * Callback used when the sidebar has been opened/closed, to ensure that
     * the viewers (PDFViewer/PDFThumbnailViewer) are updated correctly.
     */
this.onToggled=null,this.pdfViewer=a.pdfViewer,this.pdfThumbnailViewer=a.pdfThumbnailViewer,this.pdfOutlineViewer=a.pdfOutlineViewer,this.mainContainer=a.mainContainer,this.outerContainer=a.outerContainer,this.toggleButton=a.toggleButton,this.thumbnailButton=a.thumbnailButton,this.outlineButton=a.outlineButton,this.attachmentsButton=a.attachmentsButton,this.thumbnailView=a.thumbnailView,this.outlineView=a.outlineView,this.attachmentsView=a.attachmentsView,this._addEventListeners()}return a.prototype={reset:function(){this.isInitialViewSet=!1,this.close(),this.switchView(d.THUMBS),this.outlineButton.disabled=!1,this.attachmentsButton.disabled=!1},/**
     * @returns {number} One of the values in {SidebarView}.
     */
get visibleView(){return this.isOpen?this.active:d.NONE},get isThumbnailViewVisible(){return this.isOpen&&this.active===d.THUMBS},get isOutlineViewVisible(){return this.isOpen&&this.active===d.OUTLINE},get isAttachmentsViewVisible(){return this.isOpen&&this.active===d.ATTACHMENTS},/**
     * @param {number} view - The sidebar view that should become visible,
     *                        must be one of the values in {SidebarView}.
     */
setInitialView:function(a){if(!this.isInitialViewSet){if(this.isInitialViewSet=!0,this.isOpen&&a===d.NONE)
// If the user has already manually opened the sidebar,
// immediately closing it would be bad UX.
return void this._dispatchEvent();var b=a===this.visibleView;this.switchView(a,/* forceOpen */!0),b&&
// Prevent dispatching two back-to-back `sidebarviewchanged` events,
// since `this.switchView` dispatched the event if the view changed.
this._dispatchEvent()}},/**
     * @param {number} view - The sidebar view that should be switched to,
     *                        must be one of the values in {SidebarView}.
     * @param {boolean} forceOpen - (optional) Ensure that the sidebar is open.
     *                              The default value is false.
     */
switchView:function(a,b){if(a===d.NONE)return void this.close();var c=a!==this.active,e=!1;switch(a){case d.THUMBS:this.thumbnailButton.classList.add("toggled"),this.outlineButton.classList.remove("toggled"),this.attachmentsButton.classList.remove("toggled"),this.thumbnailView.classList.remove("hidden"),this.outlineView.classList.add("hidden"),this.attachmentsView.classList.add("hidden"),this.isOpen&&c&&(this._updateThumbnailViewer(),e=!0);break;case d.OUTLINE:if(this.outlineButton.disabled)return;this.thumbnailButton.classList.remove("toggled"),this.outlineButton.classList.add("toggled"),this.attachmentsButton.classList.remove("toggled"),this.thumbnailView.classList.add("hidden"),this.outlineView.classList.remove("hidden"),this.attachmentsView.classList.add("hidden");break;case d.ATTACHMENTS:if(this.attachmentsButton.disabled)return;this.thumbnailButton.classList.remove("toggled"),this.outlineButton.classList.remove("toggled"),this.attachmentsButton.classList.add("toggled"),this.thumbnailView.classList.add("hidden"),this.outlineView.classList.add("hidden"),this.attachmentsView.classList.remove("hidden");break;default:return void console.error('PDFSidebar_switchView: "'+a+'" is an unsupported value.')}
// Update the active view *after* it has been validated above,
// in order to prevent setting it to an invalid state.
return this.active=0|a,b&&!this.isOpen?void this.open():(e&&this._forceRendering(),void(c&&this._dispatchEvent()))},open:function(){this.isOpen||(this.isOpen=!0,this.toggleButton.classList.add("toggled"),this.outerContainer.classList.add("sidebarMoving"),this.outerContainer.classList.add("sidebarOpen"),this.active===d.THUMBS&&this._updateThumbnailViewer(),this._forceRendering(),this._dispatchEvent())},close:function(){this.isOpen&&(this.isOpen=!1,this.toggleButton.classList.remove("toggled"),this.outerContainer.classList.add("sidebarMoving"),this.outerContainer.classList.remove("sidebarOpen"),this._forceRendering(),this._dispatchEvent())},toggle:function(){this.isOpen?this.close():this.open()},/**
     * @private
     */
_dispatchEvent:function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("sidebarviewchanged",!0,!0,{view:this.visibleView}),this.outerContainer.dispatchEvent(a)},/**
     * @private
     */
_forceRendering:function(){this.onToggled?this.onToggled():(// Fallback
this.pdfViewer.forceRendering(),this.pdfThumbnailViewer.forceRendering())},/**
     * @private
     */
_updateThumbnailViewer:function(){for(var a=this.pdfViewer,b=this.pdfThumbnailViewer,d=a.pagesCount,e=0;d>e;e++){var f=a.getPageView(e);if(f&&f.renderingState===c.FINISHED){var g=b.getThumbnail(e);g.setImage(f)}}b.scrollThumbnailIntoView(a.currentPageNumber)},/**
     * @private
     */
_addEventListeners:function(){var a=this;a.mainContainer.addEventListener("transitionend",function(b){b.target===this&&a.outerContainer.classList.remove("sidebarMoving")}),
// Buttons for switching views.
a.thumbnailButton.addEventListener("click",function(){a.switchView(d.THUMBS)}),a.outlineButton.addEventListener("click",function(){a.switchView(d.OUTLINE)}),a.outlineButton.addEventListener("dblclick",function(){a.pdfOutlineViewer.toggleOutlineTree()}),a.attachmentsButton.addEventListener("click",function(){a.switchView(d.ATTACHMENTS)}),
// Disable/enable views.
a.outlineView.addEventListener("outlineloaded",function(b){var c=b.detail.outlineCount;a.outlineButton.disabled=!c,c||a.active!==d.OUTLINE||a.switchView(d.THUMBS)}),a.attachmentsView.addEventListener("attachmentsloaded",function(b){var c=b.detail.attachmentsCount;a.attachmentsButton.disabled=!c,c||a.active!==d.ATTACHMENTS||a.switchView(d.THUMBS)}),
// Update the thumbnailViewer, if visible, when exiting presentation mode.
window.addEventListener("presentationmodechanged",function(b){b.detail.active||b.detail.switchInProgress||!a.isThumbnailViewVisible||a._updateThumbnailViewer()})}},a}();a.SidebarView=d,a.PDFSidebar=e}),function(a,b){b(a.pdfjsWebTextLayerBuilder={},a.pdfjsWebPDFJS)}(this,function(a,b){/**
 * @constructor
 * @implements IPDFTextLayerFactory
 */
function c(){}/**
 * @typedef {Object} TextLayerBuilderOptions
 * @property {HTMLDivElement} textLayerDiv - The text layer container.
 * @property {number} pageIndex - The page index.
 * @property {PageViewport} viewport - The viewport of the text layer.
 * @property {PDFFindController} findController
 */
/**
 * TextLayerBuilder provides text-selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF text. These divs
 * contain text that matches the PDF text they are overlaying. This object
 * also provides a way to highlight text that is being searched for.
 * @class
 */
var d=function(){function a(a){this.textLayerDiv=a.textLayerDiv,this.renderingDone=!1,this.divContentDone=!1,this.pageIdx=a.pageIndex,this.pageNumber=this.pageIdx+1,this.matches=[],this.viewport=a.viewport,this.textDivs=[],this.findController=a.findController||null,this.textLayerRenderTask=null,this._bindMouse()}return a.prototype={_finishRendering:function(){this.renderingDone=!0;var a=document.createElement("div");a.className="endOfContent",this.textLayerDiv.appendChild(a);var b=document.createEvent("CustomEvent");b.initCustomEvent("textlayerrendered",!0,!0,{pageNumber:this.pageNumber}),this.textLayerDiv.dispatchEvent(b)},/**
     * Renders the text layer.
     * @param {number} timeout (optional) if specified, the rendering waits
     *   for specified amount of ms.
     */
render:function(a){if(this.divContentDone&&!this.renderingDone){this.textLayerRenderTask&&(this.textLayerRenderTask.cancel(),this.textLayerRenderTask=null),this.textDivs=[];var c=document.createDocumentFragment();this.textLayerRenderTask=b.renderTextLayer({textContent:this.textContent,container:c,viewport:this.viewport,textDivs:this.textDivs,timeout:a}),this.textLayerRenderTask.promise.then(function(){this.textLayerDiv.appendChild(c),this._finishRendering(),this.updateMatches()}.bind(this),function(a){})}},setTextContent:function(a){this.textLayerRenderTask&&(this.textLayerRenderTask.cancel(),this.textLayerRenderTask=null),this.textContent=a,this.divContentDone=!0},convertMatches:function(a){for(var b=0,c=0,d=this.textContent.items,e=d.length-1,f=null===this.findController?0:this.findController.state.query.length,g=[],h=0,i=a.length;i>h;h++){
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
this.matches=this.convertMatches(null===this.findController?[]:this.findController.pageMatches[this.pageIdx]||[]),this.renderMatches(this.matches))}},/**
     * Fixes text selection: adds additional div where mouse was clicked.
     * This reduces flickering of the content if mouse slowly dragged down/up.
     * @private
     */
_bindMouse:function(){var a=this.textLayerDiv;a.addEventListener("mousedown",function(b){var c=a.querySelector(".endOfContent");if(c){
// On non-Firefox browsers, the selection will feel better if the height
// of the endOfContent div will be adjusted to start at mouse click
// location -- this will avoid flickering when selections moves up.
// However it does not work when selection started on empty space.
var d=b.target!==a;if(d=d&&"none"!==window.getComputedStyle(c).getPropertyValue("-moz-user-select")){var e=a.getBoundingClientRect(),f=Math.max(0,(b.pageY-e.top)/e.height);c.style.top=(100*f).toFixed(2)+"%"}c.classList.add("active")}}),a.addEventListener("mouseup",function(b){var c=a.querySelector(".endOfContent");c&&(c.style.top="",c.classList.remove("active"))})}},a}();c.prototype={/**
   * @param {HTMLDivElement} textLayerDiv
   * @param {number} pageIndex
   * @param {PageViewport} viewport
   * @returns {TextLayerBuilder}
   */
createTextLayerBuilder:function(a,b,c){return new d({textLayerDiv:a,pageIndex:b,viewport:c})}},a.TextLayerBuilder=d,a.DefaultTextLayerFactory=c}),function(a,b){b(a.pdfjsWebUIUtils={},a.pdfjsWebPDFJS)}(this,function(a,b){/**
 * Returns scale factor for the canvas. It makes sense for the HiDPI displays.
 * @return {Object} The object with horizontal (sx) and vertical (sy)
                    scales. The scaled property is set to false if scaling is
                    not required, true otherwise.
 */
function c(a){var b=window.devicePixelRatio||1,c=a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||a.backingStorePixelRatio||1,d=b/c;return{sx:d,sy:d,scaled:1!==d}}/**
 * Scrolls specified element into view of its parent.
 * @param {Object} element - The element to be visible.
 * @param {Object} spot - An object with optional top and left properties,
 *   specifying the offset from the top left edge.
 * @param {boolean} skipOverflowHiddenElements - Ignore elements that have
 *   the CSS rule `overflow: hidden;` set. The default is false.
 */
function d(a,b,c){
// Assuming offsetParent is available (it's not available when viewer is in
// hidden iframe or object). We have to scroll: if the offsetParent is not set
// producing the error. See also animationStartedClosure.
var d=a.offsetParent;if(!d)return void console.error("offsetParent is not set -- cannot scroll");for(var e=c||!1,f=a.offsetTop+a.clientTop,g=a.offsetLeft+a.clientLeft;d.clientHeight===d.scrollHeight||e&&"hidden"===getComputedStyle(d).overflow;)if(d.dataset._scaleY&&(f/=d.dataset._scaleY,g/=d.dataset._scaleX),f+=d.offsetTop,g+=d.offsetLeft,d=d.offsetParent,!d)return;b&&(void 0!==b.top&&(f+=b.top),void 0!==b.left&&(g+=b.left,d.scrollLeft=g)),d.scrollTop=f}/**
 * Helper function to start monitoring the scroll event and converting them into
 * PDF.js friendly one: with scroll debounce and scroll direction.
 */
function e(a,b){var c=function(c){e||(
// schedule an invocation of scroll for next animation frame.
e=window.requestAnimationFrame(function(){e=null;var c=a.scrollTop,f=d.lastY;c!==f&&(d.down=c>f),d.lastY=c,b(d)}))},d={down:!0,lastY:a.scrollTop,_eventHandler:c},e=null;return a.addEventListener("scroll",c,!0),d}/**
 * Helper function to parse query string (e.g. ?param1=value&parm2=...).
 */
function f(a){for(var b=a.split("&"),c={},d=0,e=b.length;e>d;++d){var f=b[d].split("="),g=f[0].toLowerCase(),h=f.length>1?f[1]:null;c[decodeURIComponent(g)]=decodeURIComponent(h)}return c}/**
 * Use binary search to find the index of the first item in a given array which
 * passes a given condition. The items are expected to be sorted in the sense
 * that if the condition is true for one item in the array, then it is also true
 * for all following items.
 *
 * @returns {Number} Index of the first array element to pass the test,
 *                   or |items.length| if no such element exists.
 */
function g(a,b){var c=0,d=a.length-1;if(0===a.length||!b(a[d]))return a.length;if(b(a[c]))return c;for(;d>c;){var e=c+d>>1,f=a[e];b(f)?d=e:c=e+1}return c}/**
 *  Approximates float number as a fraction using Farey sequence (max order
 *  of 8).
 *  @param {number} x - Positive float number.
 *  @returns {Array} Estimated fraction: the first array item is a numerator,
 *                   the second one is a denominator.
 */
function h(a){
// Fast paths for int numbers or their inversions.
if(Math.floor(a)===a)return[a,1];var b=1/a,c=8;if(b>c)return[1,c];if(Math.floor(b)===b)return[1,b];
// Limiting search to order 8.
for(var d=a>1?b:a,e=0,f=1,g=1,h=1;;){
// Generating next term in sequence (order of q).
var i=e+g,j=f+h;if(j>c)break;i/j>=d?(g=i,h=j):(e=i,f=j)}
// Select closest of the neighbours to x.
// Select closest of the neighbours to x.
return g/h-d>d-e/f?d===a?[e,f]:[f,e]:d===a?[g,h]:[h,g]}function i(a,b){var c=a%b;return 0===c?a:Math.round(a-c+b)}/**
 * Generic helper to find out what elements are visible within a scroll pane.
 */
function j(a,b,c){function d(a){var b=a.div,c=b.offsetTop+b.clientTop+b.clientHeight;return c>n}for(var e,f,h,i,j,k,l,m,n=a.scrollTop,o=n+a.clientHeight,p=a.scrollLeft,q=p+a.clientWidth,r=[],s=0===b.length?0:g(b,d),t=s,u=b.length;u>t&&(e=b[t],f=e.div,h=f.offsetTop+f.clientTop,i=f.clientHeight,!(h>o));t++)l=f.offsetLeft+f.clientLeft,m=f.clientWidth,p>l+m||l>q||(j=Math.max(0,n-h)+Math.max(0,h+i-o),k=100*(i-j)/i|0,r.push({id:e.id,x:l,y:h,view:e,percent:k}));var v=r[0],w=r[r.length-1];return c&&r.sort(function(a,b){var c=a.percent-b.percent;return Math.abs(c)>.001?-c:a.id-b.id}),{first:v,last:w,views:r}}/**
 * Event handler to suppress context menu.
 */
function k(a){a.preventDefault()}/**
 * Returns the filename or guessed filename from the url (see issue 3455).
 * url {String} The original PDF location.
 * @return {String} Guessed PDF file name.
 */
function l(a){var b=/^(?:([^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/,c=/[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i,d=b.exec(a),e=c.exec(d[1])||c.exec(d[2])||c.exec(d[3]);if(e&&(e=e[0],-1!==e.indexOf("%")))
// URL-encoded %2Fpath%2Fto%2Ffile.pdf should be file.pdf
try{e=c.exec(decodeURIComponent(e))[0]}catch(f){}return e||"document.pdf"}var m=96/72,n="page-width",o=1,p=0,q=1.25,r=40,s=5,t=document.mozL10n||document.webL10n,u=b.PDFJS;/**
 * Disables fullscreen support, and by extension Presentation Mode,
 * in browsers which support the fullscreen API.
 * @var {boolean}
 */
u.disableFullscreen=void 0===u.disableFullscreen?!1:u.disableFullscreen,/**
 * Enables CSS only zooming.
 * @var {boolean}
 */
u.useOnlyCssZoom=void 0===u.useOnlyCssZoom?!1:u.useOnlyCssZoom,/**
 * The maximum supported canvas size in total pixels e.g. width * height.
 * The default value is 4096 * 4096. Use -1 for no limit.
 * @var {number}
 */
u.maxCanvasPixels=void 0===u.maxCanvasPixels?16777216:u.maxCanvasPixels,/**
 * Disables saving of the last position of the viewed PDF.
 * @var {boolean}
 */
u.disableHistory=void 0===u.disableHistory?!1:u.disableHistory,/**
 * Disables creation of the text layer that used for text selection and search.
 * @var {boolean}
 */
u.disableTextLayer=void 0===u.disableTextLayer?!1:u.disableTextLayer,/**
 * Disables maintaining the current position in the document when zooming.
 */
u.ignoreCurrentPositionOnZoom=void 0===u.ignoreCurrentPositionOnZoom?!1:u.ignoreCurrentPositionOnZoom,/**
 * Interface locale settings.
 * @var {string}
 */
u.locale=void 0===u.locale?navigator.language:u.locale;var v=function(){function a(a,b,c){return Math.min(Math.max(a,b),c)}function b(a,b){this.visible=!0,
// Fetch the sub-elements for later.
this.div=document.querySelector(a+" .progress"),
// Get the loading bar element, so it can be resized to fit the viewer.
this.bar=this.div.parentNode,
// Get options, with sensible defaults.
this.height=b.height||100,this.width=b.width||100,this.units=b.units||"%",
// Initialize heights.
this.div.style.height=this.height+this.units,this.percent=0}return b.prototype={updateBar:function(){if(this._indeterminate)return this.div.classList.add("indeterminate"),void(this.div.style.width=this.width+this.units);this.div.classList.remove("indeterminate");var a=this.width*this._percent/100;this.div.style.width=a+this.units},get percent(){return this._percent},set percent(b){this._indeterminate=isNaN(b),this._percent=a(b,0,100),this.updateBar()},setWidth:function(a){if(a){var b=a.parentNode,c=b.offsetWidth-a.offsetWidth;c>0&&this.bar.setAttribute("style","width: calc(100% - "+c+"px);")}},hide:function(){this.visible&&(this.visible=!1,this.bar.classList.add("hidden"),document.body.classList.remove("loadingInProgress"))},show:function(){this.visible||(this.visible=!0,document.body.classList.add("loadingInProgress"),this.bar.classList.remove("hidden"))}},b}();a.CSS_UNITS=m,a.DEFAULT_SCALE_VALUE=n,a.DEFAULT_SCALE=o,a.UNKNOWN_SCALE=p,a.MAX_AUTO_SCALE=q,a.SCROLLBAR_PADDING=r,a.VERTICAL_PADDING=s,a.mozL10n=t,a.ProgressBar=v,a.getPDFFileNameFromURL=l,a.noContextMenuHandler=k,a.parseQueryString=f,a.getVisibleElements=j,a.roundToDivide=i,a.approximateFraction=h,a.getOutputScale=c,a.scrollIntoView=d,a.watchScroll=e,a.binarySearchFirstItem=g}),function(a,b){b(a.pdfjsWebPasswordPrompt={},a.pdfjsWebUIUtils,a.pdfjsWebOverlayManager,a.pdfjsWebPDFJS)}(this,function(a,b,c,d){var e=b.mozL10n,f=c.OverlayManager,g=function(){/**
   * @constructs PasswordPrompt
   * @param {PasswordPromptOptions} options
   */
function a(a){this.overlayName=a.overlayName,this.container=a.container,this.label=a.label,this.input=a.input,this.submitButton=a.submitButton,this.cancelButton=a.cancelButton,this.updateCallback=null,this.reason=null,
// Attach the event listeners.
this.submitButton.addEventListener("click",this.verify.bind(this)),this.cancelButton.addEventListener("click",this.close.bind(this)),this.input.addEventListener("keydown",function(a){13===a.keyCode&&// Enter key
this.verify()}.bind(this)),f.register(this.overlayName,this.container,this.close.bind(this),!0)}return a.prototype={open:function(){f.open(this.overlayName).then(function(){this.input.type="password",this.input.focus();var a=e.get("password_label",null,"Enter the password to open this PDF file.");this.reason===d.PasswordResponses.INCORRECT_PASSWORD&&(a=e.get("password_invalid",null,"Invalid password. Please try again.")),this.label.textContent=a}.bind(this))},close:function(){f.close(this.overlayName).then(function(){this.input.value="",this.input.type=""}.bind(this))},verify:function(){var a=this.input.value;return a&&a.length>0?(this.close(),this.updateCallback(a)):void 0},setUpdateCallback:function(a,b){this.updateCallback=a,this.reason=b}},a}();a.PasswordPrompt=g}),function(a,b){b(a.pdfjsWebPDFDocumentProperties={},a.pdfjsWebUIUtils,a.pdfjsWebOverlayManager)}(this,function(a,b,c){var d=b.getPDFFileNameFromURL,e=b.mozL10n,f=c.OverlayManager,g=function(){/**
   * @constructs PDFDocumentProperties
   * @param {PDFDocumentPropertiesOptions} options
   */
function a(a){this.fields=a.fields,this.overlayName=a.overlayName,this.container=a.container,this.rawFileSize=0,this.url=null,this.pdfDocument=null,
// Bind the event listener for the Close button.
a.closeButton&&a.closeButton.addEventListener("click",this.close.bind(this)),this.dataAvailablePromise=new Promise(function(a){this.resolveDataAvailable=a}.bind(this)),f.register(this.overlayName,this.container,this.close.bind(this))}return a.prototype={/**
     * Open the document properties overlay.
     */
open:function(){Promise.all([f.open(this.overlayName),this.dataAvailablePromise]).then(function(){this._getProperties()}.bind(this))},/**
     * Close the document properties overlay.
     */
close:function(){f.close(this.overlayName)},/**
     * Set the file size of the PDF document. This method is used to
     * update the file size in the document properties overlay once it
     * is known so we do not have to wait until the entire file is loaded.
     *
     * @param {number} fileSize - The file size of the PDF document.
     */
setFileSize:function(a){a>0&&(this.rawFileSize=a)},/**
     * Set a reference to the PDF document and the URL in order
     * to populate the overlay fields with the document properties.
     * Note that the overlay will contain no information if this method
     * is not called.
     *
     * @param {Object} pdfDocument - A reference to the PDF document.
     * @param {string} url - The URL of the document.
     */
setDocumentAndUrl:function(a,b){this.pdfDocument=a,this.url=b,this.resolveDataAvailable()},/**
     * @private
     */
_getProperties:function(){f.active&&(
// Get the file size (if it hasn't already been set).
this.pdfDocument.getDownloadInfo().then(function(a){a.length!==this.rawFileSize&&(this.setFileSize(a.length),this._updateUI(this.fields.fileSize,this._parseFileSize()))}.bind(this)),
// Get the document properties.
this.pdfDocument.getMetadata().then(function(a){var b={fileName:d(this.url),fileSize:this._parseFileSize(),title:a.info.Title,author:a.info.Author,subject:a.info.Subject,keywords:a.info.Keywords,creationDate:this._parseDate(a.info.CreationDate),modificationDate:this._parseDate(a.info.ModDate),creator:a.info.Creator,producer:a.info.Producer,version:a.info.PDFFormatVersion,pageCount:this.pdfDocument.numPages};
// Show the properties in the dialog.
for(var c in b)this._updateUI(this.fields[c],b[c])}.bind(this)))},/**
     * @private
     */
_updateUI:function(a,b){a&&void 0!==b&&""!==b&&(a.textContent=b)},/**
     * @private
     */
_parseFileSize:function(){var a=this.rawFileSize,b=a/1024;return b?1024>b?e.get("document_properties_kb",{size_kb:(+b.toPrecision(3)).toLocaleString(),size_b:a.toLocaleString()},"{{size_kb}} KB ({{size_b}} bytes)"):e.get("document_properties_mb",{size_mb:(+(b/1024).toPrecision(3)).toLocaleString(),size_b:a.toLocaleString()},"{{size_mb}} MB ({{size_b}} bytes)"):void 0},/**
     * @private
     */
_parseDate:function(a){
// This is implemented according to the PDF specification, but note that
// Adobe Reader doesn't handle changing the date to universal time
// and doesn't use the user's time zone (they're effectively ignoring
// the HH' and mm' parts of the date string).
var b=a;if(void 0===b)return"";
// Remove the D: prefix if it is available.
"D:"===b.substring(0,2)&&(b=b.substring(2));
// Get all elements from the PDF date string.
// JavaScript's Date object expects the month to be between
// 0 and 11 instead of 1 and 12, so we're correcting for this.
var c=parseInt(b.substring(0,4),10),d=parseInt(b.substring(4,6),10)-1,f=parseInt(b.substring(6,8),10),g=parseInt(b.substring(8,10),10),h=parseInt(b.substring(10,12),10),i=parseInt(b.substring(12,14),10),j=b.substring(14,15),k=parseInt(b.substring(15,17),10),l=parseInt(b.substring(18,20),10);
// As per spec, utRel = 'Z' means equal to universal time.
// The other cases ('-' and '+') have to be handled here.
"-"===j?(g+=k,h+=l):"+"===j&&(g-=k,h-=l);
// Return the new date format from the user's locale.
var m=new Date(Date.UTC(c,d,f,g,h,i)),n=m.toLocaleDateString(),o=m.toLocaleTimeString();return e.get("document_properties_date_string",{date:n,time:o},"{{date}}, {{time}}")}},a}();a.PDFDocumentProperties=g}),function(a,b){b(a.pdfjsWebPDFFindController={},a.pdfjsWebUIUtils,a.pdfjsWebFirefoxCom)}(this,function(a,b,c){var d=b.scrollIntoView,e=c.FirefoxCom,f={FIND_FOUND:0,FIND_NOTFOUND:1,FIND_WRAPPED:2,FIND_PENDING:3},g=-50,h=-400,i={"‘":"'",// Left single quotation mark
"’":"'",// Right single quotation mark
"‚":"'",// Single low-9 quotation mark
"‛":"'",// Single high-reversed-9 quotation mark
"“":'"',// Left double quotation mark
"”":'"',// Right double quotation mark
"„":'"',// Double low-9 quotation mark
"‟":'"',// Double high-reversed-9 quotation mark
"¼":"1/4",// Vulgar fraction one quarter
"½":"1/2",// Vulgar fraction one half
"¾":"3/4"},j=function(){function a(a){this.pdfViewer=a.pdfViewer||null,this.integratedFind=a.integratedFind||!1,this.findBar=a.findBar||null,this.reset();
// Compile the regular expression for text normalization once.
var b=Object.keys(i).join("");this.normalizationRegex=new RegExp("["+b+"]","g");var c=["find","findagain","findhighlightallchange","findcasesensitivitychange"];this.handleEvent=this.handleEvent.bind(this);for(var d=0,e=c.length;e>d;d++)window.addEventListener(c[d],this.handleEvent)}return a.prototype={setFindBar:function(a){this.findBar=a},reset:function(){this.startedTextExtraction=!1,this.extractTextPromises=[],this.pendingFindMatches=Object.create(null),this.active=!1,// If active, find results will be highlighted.
this.pageContents=[],// Stores the text for each page.
this.pageMatches=[],this.matchCount=0,this.selected={// Currently selected match.
pageIdx:-1,matchIdx:-1},this.offset={// Where the find algorithm currently is in the document.
pageIdx:null,matchIdx:null},this.pagesToSearch=null,this.resumePageIdx=null,this.state=null,this.dirtyMatch=!1,this.findTimeout=null,this.firstPagePromise=new Promise(function(a){this.resolveFirstPage=a}.bind(this))},normalize:function(a){return a.replace(this.normalizationRegex,function(a){return i[a]})},calcFindMatch:function(a){var b=this.normalize(this.pageContents[a]),c=this.normalize(this.state.query),d=this.state.caseSensitive,e=c.length;if(0!==e){d||(b=b.toLowerCase(),c=c.toLowerCase());for(var f=[],g=-e;;){if(g=b.indexOf(c,g+e),-1===g)break;f.push(g)}this.pageMatches[a]=f,this.updatePage(a),this.resumePageIdx===a&&(this.resumePageIdx=null,this.nextPageMatch()),
// Update the matches count
f.length>0&&(this.matchCount+=f.length,this.updateUIResultsCount())}},extractText:function(){function a(c){e.pdfViewer.getPageTextContent(c).then(function(d){for(var f=d.items,g=[],h=0,i=f.length;i>h;h++)g.push(f[h].str);
// Store the pageContent as a string.
e.pageContents.push(g.join("")),b[c](c),c+1<e.pdfViewer.pagesCount&&a(c+1)})}if(!this.startedTextExtraction){this.startedTextExtraction=!0,this.pageContents=[];for(var b=[],c=this.pdfViewer.pagesCount,d=0;c>d;d++)this.extractTextPromises.push(new Promise(function(a){b.push(a)}));var e=this;a(0)}},handleEvent:function(a){null!==this.state&&"findagain"===a.type||(this.dirtyMatch=!0),this.state=a.detail,this.updateUIState(f.FIND_PENDING),this.firstPagePromise.then(function(){this.extractText(),clearTimeout(this.findTimeout),"find"===a.type?
// Only trigger the find action after 250ms of silence.
this.findTimeout=setTimeout(this.nextMatch.bind(this),250):this.nextMatch()}.bind(this))},updatePage:function(a){this.selected.pageIdx===a&&
// If the page is selected, scroll the page into view, which triggers
// rendering the page, which adds the textLayer. Once the textLayer is
// build, it will scroll onto the selected match.
this.pdfViewer.scrollPageIntoView(a+1);var b=this.pdfViewer.getPageView(a);b.textLayer&&b.textLayer.updateMatches()},nextMatch:function(){var a=this.state.findPrevious,b=this.pdfViewer.currentPageNumber-1,c=this.pdfViewer.pagesCount;if(this.active=!0,this.dirtyMatch){
// Need to recalculate the matches, reset everything.
this.dirtyMatch=!1,this.selected.pageIdx=this.selected.matchIdx=-1,this.offset.pageIdx=b,this.offset.matchIdx=null,this.hadMatch=!1,this.resumePageIdx=null,this.pageMatches=[],this.matchCount=0;for(var d=this,e=0;c>e;e++)
// Wipe out any previous highlighted matches.
this.updatePage(e),
// As soon as the text is extracted start finding the matches.
e in this.pendingFindMatches||(this.pendingFindMatches[e]=!0,this.extractTextPromises[e].then(function(a){delete d.pendingFindMatches[a],d.calcFindMatch(a)}))}
// If there's no query there's no point in searching.
if(""===this.state.query)return void this.updateUIState(f.FIND_FOUND);
// If we're waiting on a page, we return since we can't do anything else.
if(!this.resumePageIdx){var g=this.offset;
// If there's already a matchIdx that means we are iterating through a
// page's matches.
if(
// Keep track of how many pages we should maximally iterate through.
this.pagesToSearch=c,null!==g.matchIdx){var h=this.pageMatches[g.pageIdx].length;if(!a&&g.matchIdx+1<h||a&&g.matchIdx>0)
// The simple case; we just have advance the matchIdx to select
// the next match on the page.
return this.hadMatch=!0,g.matchIdx=a?g.matchIdx-1:g.matchIdx+1,void this.updateMatch(!0);
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
updateMatchPosition:function(a,b,c,e,f){if(this.selected.matchIdx===b&&this.selected.pageIdx===a){var i={top:g,left:h};d(c[e],i,/* skipOverflowHiddenElements = */
!0)}},nextPageMatch:function(){null!==this.resumePageIdx&&console.error("There can only be one pending page.");do{var a=this.offset.pageIdx,b=this.pageMatches[a];if(!b){
// The matches don't exist yet for processing by "matchesReady",
// so set a resume point for when they do exist.
this.resumePageIdx=a;break}}while(!this.matchesReady(b))},advanceOffsetPage:function(a){var b=this.offset,c=this.extractTextPromises.length;b.pageIdx=a?b.pageIdx-1:b.pageIdx+1,b.matchIdx=null,this.pagesToSearch--,(b.pageIdx>=c||b.pageIdx<0)&&(b.pageIdx=a?c-1:0,b.wrapped=!0)},updateMatch:function(a){var b=f.FIND_NOTFOUND,c=this.offset.wrapped;if(this.offset.wrapped=!1,a){var d=this.selected.pageIdx;this.selected.pageIdx=this.offset.pageIdx,this.selected.matchIdx=this.offset.matchIdx,b=c?f.FIND_WRAPPED:f.FIND_FOUND,
// Update the currently selected page to wipe out any selected matches.
-1!==d&&d!==this.selected.pageIdx&&this.updatePage(d)}this.updateUIState(b,this.state.findPrevious),-1!==this.selected.pageIdx&&this.updatePage(this.selected.pageIdx)},updateUIResultsCount:function(){if(null===this.findBar)throw new Error("PDFFindController is not initialized with a PDFFindBar instance.");this.findBar.updateResultsCount(this.matchCount)},updateUIState:function(a,b){if(this.integratedFind)return void e.request("updateFindControlState",{result:a,findPrevious:b});if(null===this.findBar)throw new Error("PDFFindController is not initialized with a PDFFindBar instance.");this.findBar.updateUIState(a,b,this.matchCount)}},a}();a.FindStates=f,a.PDFFindController=j}),function(a,b){b(a.pdfjsWebPDFLinkService={},a.pdfjsWebUIUtils)}(this,function(a,b){var c=b.parseQueryString,d=function(){/**
   * @constructs PDFLinkService
   */
function a(){this.baseUrl=null,this.pdfDocument=null,this.pdfViewer=null,this.pdfHistory=null,this._pagesRefCache=null}return a.prototype={setDocument:function(a,b){this.baseUrl=b,this.pdfDocument=a,this._pagesRefCache=Object.create(null)},setViewer:function(a){this.pdfViewer=a},setHistory:function(a){this.pdfHistory=a},/**
     * @returns {number}
     */
get pagesCount(){return this.pdfDocument.numPages},/**
     * @returns {number}
     */
get page(){return this.pdfViewer.currentPageNumber},/**
     * @param {number} value
     */
set page(a){this.pdfViewer.currentPageNumber=a},/**
     * @param dest - The PDF destination object.
     */
navigateTo:function(a){var b,c="",d=this,e=function(b){
// dest array looks like that: <page-ref> </XYZ|FitXXX> <args..>
var f=b instanceof Object?d._pagesRefCache[b.num+" "+b.gen+" R"]:b+1;f?(f>d.pagesCount&&(f=d.pagesCount),d.pdfViewer.scrollPageIntoView(f,a),d.pdfHistory&&
// Update the browsing history.
d.pdfHistory.push({dest:a,hash:c,page:f})):d.pdfDocument.getPageIndex(b).then(function(a){var c=a+1,f=b.num+" "+b.gen+" R";d._pagesRefCache[f]=c,e(b)})};"string"==typeof a?(c=a,b=this.pdfDocument.getDestination(a)):b=Promise.resolve(a),b.then(function(b){a=b,b instanceof Array&&e(b[0])})},/**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
getDestinationHash:function(a){if("string"==typeof a)return this.getAnchorUrl("#"+escape(a));if(a instanceof Array){var b=a[0],c=b instanceof Object?this._pagesRefCache[b.num+" "+b.gen+" R"]:b+1;if(c){var d=this.getAnchorUrl("#page="+c),e=a[1];if("object"==typeof e&&"name"in e&&"XYZ"===e.name){var f=a[4]||this.pdfViewer.currentScaleValue,g=parseFloat(f);g&&(f=100*g),d+="&zoom="+f,(a[2]||a[3])&&(d+=","+(a[2]||0)+","+(a[3]||0))}return d}}return this.getAnchorUrl("")},/**
     * Prefix the full url on anchor links to make sure that links are resolved
     * relative to the current URL instead of the one defined in <base href>.
     * @param {String} anchor The anchor hash, including the #.
     * @returns {string} The hyperlink to the PDF object.
     */
getAnchorUrl:function(a){return(this.baseUrl||"")+a},/**
     * @param {string} hash
     */
setHash:function(a){if(a.indexOf("=")>=0){var b=c(a);
// borrowing syntax from "Parameters for Opening PDF Files"
if("nameddest"in b)return this.pdfHistory&&this.pdfHistory.updateNextHashParam(b.nameddest),void this.navigateTo(b.nameddest);var d,e;if("page"in b&&(d=0|b.page||1),"zoom"in b){
// Build the destination array.
var f=b.zoom.split(","),g=f[0],h=parseFloat(g);-1===g.indexOf("Fit")?
// If the zoomArg is a number, it has to get divided by 100. If it's
// a string, it should stay as it is.
e=[null,{name:"XYZ"},f.length>1?0|f[1]:null,f.length>2?0|f[2]:null,h?h/100:g]:"Fit"===g||"FitB"===g?e=[null,{name:g}]:"FitH"===g||"FitBH"===g||"FitV"===g||"FitBV"===g?e=[null,{name:g},f.length>1?0|f[1]:null]:"FitR"===g?5!==f.length?console.error("PDFLinkService_setHash: Not enough parameters for 'FitR'."):e=[null,{name:g},0|f[1],0|f[2],0|f[3],0|f[4]]:console.error("PDFLinkService_setHash: '"+g+"' is not a valid zoom value.")}if(e?this.pdfViewer.scrollPageIntoView(d||this.page,e):d&&(this.page=d),"pagemode"in b){var i=document.createEvent("CustomEvent");i.initCustomEvent("pagemode",!0,!0,{mode:b.pagemode}),this.pdfViewer.container.dispatchEvent(i)}}else/^\d+$/.test(a)?// page number
this.page=a:(// named destination
this.pdfHistory&&this.pdfHistory.updateNextHashParam(unescape(a)),this.navigateTo(unescape(a)))},/**
     * @param {string} action
     */
executeNamedAction:function(a){
// See PDF reference, table 8.45 - Named action
switch(a){case"GoBack":this.pdfHistory&&this.pdfHistory.back();break;case"GoForward":this.pdfHistory&&this.pdfHistory.forward();break;case"NextPage":this.page++;break;case"PrevPage":this.page--;break;case"LastPage":this.page=this.pagesCount;break;case"FirstPage":this.page=1}var b=document.createEvent("CustomEvent");b.initCustomEvent("namedaction",!0,!0,{action:a}),this.pdfViewer.container.dispatchEvent(b)},/**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
cachePageRef:function(a,b){var c=b.num+" "+b.gen+" R";this._pagesRefCache[c]=a}},a}(),e=function(){function a(){}return a.prototype={/**
     * @returns {number}
     */
get page(){return 0},/**
     * @param {number} value
     */
set page(a){},/**
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
executeNamedAction:function(a){},/**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
cachePageRef:function(a,b){}},a}();a.PDFLinkService=d,a.SimpleLinkService=e}),function(a,b){b(a.pdfjsWebPDFPageView={},a.pdfjsWebUIUtils,a.pdfjsWebPDFRenderingQueue,a.pdfjsWebPDFJS)}(this,function(a,b,c,d){var e=b.CSS_UNITS,f=b.DEFAULT_SCALE,g=b.getOutputScale,h=b.approximateFraction,i=b.roundToDivide,j=c.RenderingStates,k=200,l=function(){/**
   * @constructs PDFPageView
   * @param {PDFPageViewOptions} options
   */
function a(a){var b=a.container,c=a.id,d=a.scale,e=a.defaultViewport,g=a.renderingQueue,h=a.textLayerFactory,i=a.annotationLayerFactory;this.id=c,this.renderingId="page"+c,this.rotation=0,this.scale=d||f,this.viewport=e,this.pdfPageRotate=e.rotation,this.hasRestrictedScaling=!1,this.renderingQueue=g,this.textLayerFactory=h,this.annotationLayerFactory=i,this.renderingState=j.INITIAL,this.resume=null,this.onBeforeDraw=null,this.onAfterDraw=null,this.textLayer=null,this.zoomLayer=null,this.annotationLayer=null;var k=document.createElement("div");k.id="pageContainer"+this.id,k.className="page",k.style.width=Math.floor(this.viewport.width)+"px",k.style.height=Math.floor(this.viewport.height)+"px",k.setAttribute("data-page-number",this.id),this.div=k,b.appendChild(k)}return a.prototype={setPdfPage:function(a){this.pdfPage=a,this.pdfPageRotate=a.rotate;var b=(this.rotation+this.pdfPageRotate)%360;this.viewport=a.getViewport(this.scale*e,b),this.stats=a.stats,this.reset()},destroy:function(){this.zoomLayer=null,this.reset(),this.pdfPage&&this.pdfPage.cleanup()},reset:function(a,b){this.renderTask&&this.renderTask.cancel(),this.resume=null,this.renderingState=j.INITIAL;var c=this.div;c.style.width=Math.floor(this.viewport.width)+"px",c.style.height=Math.floor(this.viewport.height)+"px";for(var d=c.childNodes,e=a&&this.zoomLayer||null,f=b&&this.annotationLayer&&this.annotationLayer.div||null,g=d.length-1;g>=0;g--){var h=d[g];e!==h&&f!==h&&c.removeChild(h)}c.removeAttribute("data-loaded"),f?
// Hide annotationLayer until all elements are resized
// so they are not displayed on the already-resized page
this.annotationLayer.hide():this.annotationLayer=null,this.canvas&&!e&&(
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
this.canvas.width=0,this.canvas.height=0,delete this.canvas),this.loadingIconDiv=document.createElement("div"),this.loadingIconDiv.className="loadingIcon",c.appendChild(this.loadingIconDiv)},update:function(a,b){this.scale=a||this.scale,"undefined"!=typeof b&&(this.rotation=b);var c=(this.rotation+this.pdfPageRotate)%360;this.viewport=this.viewport.clone({scale:this.scale*e,rotation:c});var f=!1;if(this.canvas&&d.PDFJS.maxCanvasPixels>0){var g=this.outputScale;this.viewport.width*this.viewport.height;(Math.floor(this.viewport.width)*g.sx|0)*(Math.floor(this.viewport.height)*g.sy|0)>d.PDFJS.maxCanvasPixels&&(f=!0)}if(this.canvas){if(d.PDFJS.useOnlyCssZoom||this.hasRestrictedScaling&&f){this.cssTransform(this.canvas,!0);var h=document.createEvent("CustomEvent");return h.initCustomEvent("pagerendered",!0,!0,{pageNumber:this.id,cssTransform:!0}),void this.div.dispatchEvent(h)}this.zoomLayer||(this.zoomLayer=this.canvas.parentNode,this.zoomLayer.style.position="absolute")}this.zoomLayer&&this.cssTransform(this.zoomLayer.firstChild),this.reset(/* keepZoomLayer = */!0,/* keepAnnotations = */!0)},/**
     * Called when moved in the parent's container.
     */
updatePosition:function(){this.textLayer&&this.textLayer.render(k)},cssTransform:function(a,b){var c=d.CustomStyle,e=this.viewport.width,f=this.viewport.height,g=this.div;a.style.width=a.parentNode.style.width=g.style.width=Math.floor(e)+"px",a.style.height=a.parentNode.style.height=g.style.height=Math.floor(f)+"px";
// The canvas may have been originally rotated, rotate relative to that.
var h=this.viewport.rotation-a._viewport.rotation,i=Math.abs(h),j=1,k=1;90!==i&&270!==i||(j=f/e,k=e/f);var l="rotate("+h+"deg) scale("+j+","+k+")";if(c.setProp("transform",a,l),this.textLayer){
// Rotating the text layer is more complicated since the divs inside the
// the text layer are rotated.
// TODO: This could probably be simplified by drawing the text layer in
// one orientation then rotating overall.
var m=this.textLayer.viewport,n=this.viewport.rotation-m.rotation,o=Math.abs(n),p=e/m.width;90!==o&&270!==o||(p=e/m.height);var q,r,s=this.textLayer.textLayerDiv;switch(o){case 0:q=r=0;break;case 90:q=0,r="-"+s.style.height;break;case 180:q="-"+s.style.width,r="-"+s.style.height;break;case 270:q="-"+s.style.width,r=0;break;default:console.error("Bad rotation value.")}c.setProp("transform",s,"rotate("+o+"deg) scale("+p+", "+p+") translate("+q+", "+r+")"),c.setProp("transformOrigin",s,"0% 0%")}b&&this.annotationLayer&&this.annotationLayer.render(this.viewport,"display")},get width(){return this.viewport.width},get height(){return this.viewport.height},getPagePoint:function(a,b){return this.viewport.convertToPdfPoint(a,b)},draw:function(){function a(a){if(
// The renderTask may have been replaced by a new one, so only remove
// the reference to the renderTask if it matches the one that is
// triggering this callback.
E===A.renderTask&&(A.renderTask=null),"cancelled"===a)return void y(a);if(A.renderingState=j.FINISHED,n&&(A.canvas.removeAttribute("hidden"),n=!1),A.loadingIconDiv&&(f.removeChild(A.loadingIconDiv),delete A.loadingIconDiv),A.zoomLayer){
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
var c=A.zoomLayer.firstChild;c.width=0,c.height=0,f.removeChild(A.zoomLayer),A.zoomLayer=null}A.error=a,A.stats=b.stats,A.onAfterDraw&&A.onAfterDraw();var d=document.createEvent("CustomEvent");d.initCustomEvent("pagerendered",!0,!0,{pageNumber:A.id,cssTransform:!1}),f.dispatchEvent(d),a?y(a):x(void 0)}this.renderingState!==j.INITIAL&&console.error("Must be in new state before drawing"),this.renderingState=j.RUNNING;var b=this.pdfPage,c=this.viewport,f=this.div,l=document.createElement("div");l.style.width=f.style.width,l.style.height=f.style.height,l.classList.add("canvasWrapper");var m=document.createElement("canvas");m.id="page"+this.id,
// Keep the canvas hidden until the first draw callback, or until drawing
// is complete when `!this.renderingQueue`, to prevent black flickering.
m.setAttribute("hidden","hidden");var n=!0;l.appendChild(m),this.annotationLayer&&this.annotationLayer.div?
// annotationLayer needs to stay on top
f.insertBefore(l,this.annotationLayer.div):f.appendChild(l),this.canvas=m,m.mozOpaque=!0;var o=m.getContext("2d",{alpha:!1}),p=g(o);if(this.outputScale=p,d.PDFJS.useOnlyCssZoom){var q=c.clone({scale:e});
// Use a scale that will make the canvas be the original intended size
// of the page.
p.sx*=q.width/c.width,p.sy*=q.height/c.height,p.scaled=!0}if(d.PDFJS.maxCanvasPixels>0){var r=c.width*c.height,s=Math.sqrt(d.PDFJS.maxCanvasPixels/r);p.sx>s||p.sy>s?(p.sx=s,p.sy=s,p.scaled=!0,this.hasRestrictedScaling=!0):this.hasRestrictedScaling=!1}var t=h(p.sx),u=h(p.sy);m.width=i(c.width*p.sx,t[0]),m.height=i(c.height*p.sy,u[0]),m.style.width=i(c.width,t[1])+"px",m.style.height=i(c.height,u[1])+"px",
// Add the viewport so it's known what it was originally drawn with.
m._viewport=c;var v=null,w=null;this.textLayerFactory&&(v=document.createElement("div"),v.className="textLayer",v.style.width=l.style.width,v.style.height=l.style.height,this.annotationLayer&&this.annotationLayer.div?f.insertBefore(v,this.annotationLayer.div):f.appendChild(v),w=this.textLayerFactory.createTextLayerBuilder(v,this.id-1,this.viewport)),this.textLayer=w;var x,y,z=new Promise(function(a,b){x=a,y=b}),A=this,B=null;this.renderingQueue&&(B=function(a){return A.renderingQueue.isHighestPriority(A)?(n&&(A.canvas.removeAttribute("hidden"),n=!1),void a()):(A.renderingState=j.PAUSED,void(A.resume=function(){A.renderingState=j.RUNNING,a()}))});var C=p.scaled?[p.sx,0,0,p.sy,0,0]:null,D={canvasContext:o,transform:C,viewport:this.viewport},E=this.renderTask=this.pdfPage.render(D);return E.onContinue=B,this.renderTask.promise.then(function(){a(null),w&&A.pdfPage.getTextContent({normalizeWhitespace:!0}).then(function(a){w.setTextContent(a),w.render(k)})},function(b){a(b)}),this.annotationLayerFactory&&(this.annotationLayer||(this.annotationLayer=this.annotationLayerFactory.createAnnotationLayerBuilder(f,this.pdfPage)),this.annotationLayer.render(this.viewport,"display")),f.setAttribute("data-loaded",!0),A.onBeforeDraw&&A.onBeforeDraw(),z},beforePrint:function(a){var b=d.CustomStyle,c=this.pdfPage,e=c.getViewport(1),f=2,g=document.createElement("canvas");
// The logical size of the canvas.
g.width=Math.floor(e.width)*f,g.height=Math.floor(e.height)*f,
// The rendered size of the canvas, relative to the size of canvasWrapper.
g.style.width=100*f+"%";var h="scale("+1/f+", "+1/f+")";b.setProp("transform",g,h),b.setProp("transformOrigin",g,"0% 0%");var i=document.createElement("div");i.appendChild(g),a.appendChild(i),g.mozPrintCallback=function(a){var b=a.context;b.save(),b.fillStyle="rgb(255, 255, 255)",b.fillRect(0,0,g.width,g.height),b.restore(),
// Used by the mozCurrentTransform polyfill in src/display/canvas.js.
b._transformMatrix=[f,0,0,f,0,0],b.scale(f,f);var d={canvasContext:b,viewport:e,intent:"print"};c.render(d).promise.then(function(){
// Tell the printEngine that rendering this canvas/page has finished.
a.done()},function(b){console.error(b),
// Tell the printEngine that rendering this canvas/page has failed.
// This will make the print proces stop.
"abort"in a?a.abort():a.done()})}}},a}();a.PDFPageView=l}),function(a,b){b(a.pdfjsWebPDFThumbnailView={},a.pdfjsWebUIUtils,a.pdfjsWebPDFRenderingQueue)}(this,function(a,b,c){var d=b.mozL10n,e=b.getOutputScale,f=c.RenderingStates,g=98,h=1,i=function(){function a(a,c){var d=b.tempImageCache;d||(d=document.createElement("canvas"),b.tempImageCache=d),d.width=a,d.height=c,
// Since this is a temporary canvas, we need to fill the canvas with a white
// background ourselves. `_getPageDrawContext` uses CSS rules for this.
d.mozOpaque=!0;var e=d.getContext("2d",{alpha:!1});return e.save(),e.fillStyle="rgb(255, 255, 255)",e.fillRect(0,0,a,c),e.restore(),d}/**
   * @constructs PDFThumbnailView
   * @param {PDFThumbnailViewOptions} options
   */
function b(a){var b=a.container,c=a.id,e=a.defaultViewport,i=a.linkService,j=a.renderingQueue,k=a.disableCanvasToImageConversion||!1;this.id=c,this.renderingId="thumbnail"+c,this.pdfPage=null,this.rotation=0,this.viewport=e,this.pdfPageRotate=e.rotation,this.linkService=i,this.renderingQueue=j,this.resume=null,this.renderingState=f.INITIAL,this.disableCanvasToImageConversion=k,this.pageWidth=this.viewport.width,this.pageHeight=this.viewport.height,this.pageRatio=this.pageWidth/this.pageHeight,this.canvasWidth=g,this.canvasHeight=this.canvasWidth/this.pageRatio|0,this.scale=this.canvasWidth/this.pageWidth;var l=document.createElement("a");l.href=i.getAnchorUrl("#page="+c),l.title=d.get("thumb_page_title",{page:c},"Page {{page}}"),l.onclick=function(){return i.page=c,!1};var m=document.createElement("div");m.id="thumbnailContainer"+c,m.className="thumbnail",this.div=m,1===c&&
// Highlight the thumbnail of the first page when no page number is
// specified (or exists in cache) when the document is loaded.
m.classList.add("selected");var n=document.createElement("div");n.className="thumbnailSelectionRing";var o=2*h;n.style.width=this.canvasWidth+o+"px",n.style.height=this.canvasHeight+o+"px",this.ring=n,m.appendChild(n),l.appendChild(m),b.appendChild(l)}return b.prototype={setPdfPage:function(a){this.pdfPage=a,this.pdfPageRotate=a.rotate;var b=(this.rotation+this.pdfPageRotate)%360;this.viewport=a.getViewport(1,b),this.reset()},reset:function(){this.renderTask&&this.renderTask.cancel(),this.resume=null,this.renderingState=f.INITIAL,this.pageWidth=this.viewport.width,this.pageHeight=this.viewport.height,this.pageRatio=this.pageWidth/this.pageHeight,this.canvasHeight=this.canvasWidth/this.pageRatio|0,this.scale=this.canvasWidth/this.pageWidth,this.div.removeAttribute("data-loaded");for(var a=this.ring,b=a.childNodes,c=b.length-1;c>=0;c--)a.removeChild(b[c]);var d=2*h;a.style.width=this.canvasWidth+d+"px",a.style.height=this.canvasHeight+d+"px",this.canvas&&(
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
this.canvas.width=0,this.canvas.height=0,delete this.canvas),this.image&&(this.image.removeAttribute("src"),delete this.image)},update:function(a){"undefined"!=typeof a&&(this.rotation=a);var b=(this.rotation+this.pdfPageRotate)%360;this.viewport=this.viewport.clone({scale:1,rotation:b}),this.reset()},/**
     * @private
     */
_getPageDrawContext:function(a){var b=document.createElement("canvas");
// Keep the no-thumbnail outline visible, i.e. `data-loaded === false`,
// until rendering/image conversion is complete, to avoid display issues.
this.canvas=b,b.mozOpaque=!0;var c=b.getContext("2d",{alpha:!1}),d=e(c);return b.width=this.canvasWidth*d.sx|0,b.height=this.canvasHeight*d.sy|0,b.style.width=this.canvasWidth+"px",b.style.height=this.canvasHeight+"px",!a&&d.scaled&&c.scale(d.sx,d.sy),c},/**
     * @private
     */
_convertCanvasToImage:function(){if(this.canvas&&this.renderingState===f.FINISHED){var a=this.renderingId,b="thumbnailImage",c=d.get("thumb_page_canvas",{page:this.id},"Thumbnail of Page {{page}}");if(this.disableCanvasToImageConversion)return this.canvas.id=a,this.canvas.className=b,this.canvas.setAttribute("aria-label",c),this.div.setAttribute("data-loaded",!0),void this.ring.appendChild(this.canvas);var e=document.createElement("img");e.id=a,e.className=b,e.setAttribute("aria-label",c),e.style.width=this.canvasWidth+"px",e.style.height=this.canvasHeight+"px",e.src=this.canvas.toDataURL(),this.image=e,this.div.setAttribute("data-loaded",!0),this.ring.appendChild(e),
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
this.canvas.width=0,this.canvas.height=0,delete this.canvas}},draw:function(){function a(a){
// The renderTask may have been replaced by a new one, so only remove
// the reference to the renderTask if it matches the one that is
// triggering this callback.
return k===e.renderTask&&(e.renderTask=null),"cancelled"===a?void c(a):(e.renderingState=f.FINISHED,e._convertCanvasToImage(),void(a?c(a):b(void 0)))}if(this.renderingState!==f.INITIAL)return console.error("Must be in new state before drawing"),Promise.resolve(void 0);this.renderingState=f.RUNNING;var b,c,d=new Promise(function(a,d){b=a,c=d}),e=this,g=this._getPageDrawContext(),h=this.viewport.clone({scale:this.scale}),i=function(a){return e.renderingQueue.isHighestPriority(e)?void a():(e.renderingState=f.PAUSED,void(e.resume=function(){e.renderingState=f.RUNNING,a()}))},j={canvasContext:g,viewport:h},k=this.renderTask=this.pdfPage.render(j);return k.onContinue=i,k.promise.then(function(){a(null)},function(b){a(b)}),d},setImage:function(b){if(this.renderingState===f.INITIAL){var c=b.canvas;if(c){this.pdfPage||this.setPdfPage(b.pdfPage),this.renderingState=f.FINISHED;var d=this._getPageDrawContext(!0),e=d.canvas;if(c.width<=2*e.width)return d.drawImage(c,0,0,c.width,c.height,0,0,e.width,e.height),void this._convertCanvasToImage();for(
// drawImage does an awful job of rescaling the image, doing it gradually.
var g=3,h=e.width<<g,i=e.height<<g,j=a(h,i),k=j.getContext("2d");h>c.width||i>c.height;)h>>=1,i>>=1;for(k.drawImage(c,0,0,c.width,c.height,0,0,h,i);h>2*e.width;)k.drawImage(j,0,0,h,i,0,0,h>>1,i>>1),h>>=1,i>>=1;d.drawImage(j,0,0,h,i,0,0,e.width,e.height),this._convertCanvasToImage()}}}},b}();i.tempImageCache=null,a.PDFThumbnailView=i}),function(a,b){b(a.pdfjsWebSecondaryToolbar={},a.pdfjsWebUIUtils)}(this,function(a,b){function c(a){d=a,f=d.PDFViewerApplication}var d,e=b.SCROLLBAR_PADDING,f=null,g={opened:!1,previousContainerHeight:null,newContainerHeight:null,initialize:function(a){this.toolbar=a.toolbar,this.buttonContainer=this.toolbar.firstElementChild,
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
presentationModeClick:function(a){f.requestPresentationMode(),this.close()},openFileClick:function(a){var b=f.appConfig.openFileInputName;document.getElementById(b).click(),this.close()},printClick:function(a){window.print(),this.close()},downloadClick:function(a){f.download(),this.close()},viewBookmarkClick:function(a){this.close()},firstPageClick:function(a){f.page=1,this.close()},lastPageClick:function(a){f.pdfDocument&&(f.page=f.pagesCount),this.close()},pageRotateCwClick:function(a){f.rotatePages(90)},pageRotateCcwClick:function(a){f.rotatePages(-90)},documentPropertiesClick:function(a){f.pdfDocumentProperties.open(),this.close()},
// Misc. functions for interacting with the toolbar.
setMaxHeight:function(a){a&&this.buttonContainer&&(this.newContainerHeight=a.clientHeight,this.previousContainerHeight!==this.newContainerHeight&&(this.buttonContainer.setAttribute("style","max-height: "+(this.newContainerHeight-e)+"px;"),this.previousContainerHeight=this.newContainerHeight))},open:function(){this.opened||(this.opened=!0,this.toggleButton.classList.add("toggled"),this.toolbar.classList.remove("hidden"))},close:function(a){this.opened&&(a&&!this.toolbar.contains(a)||(this.opened=!1,this.toolbar.classList.add("hidden"),this.toggleButton.classList.remove("toggled")))},toggle:function(){this.opened?this.close():this.open()}};a.SecondaryToolbar=g,a._setApp=c}),function(a,b){b(a.pdfjsWebAnnotationLayerBuilder={},a.pdfjsWebUIUtils,a.pdfjsWebPDFLinkService,a.pdfjsWebPDFJS)}(this,function(a,b,c,d){/**
 * @constructor
 * @implements IPDFAnnotationLayerFactory
 */
function e(){}var f=b.mozL10n,g=c.SimpleLinkService,h=function(){/**
   * @param {AnnotationLayerBuilderOptions} options
   * @constructs AnnotationLayerBuilder
   */
function a(a){this.pageDiv=a.pageDiv,this.pdfPage=a.pdfPage,this.linkService=a.linkService,this.downloadManager=a.downloadManager,this.div=null}/** @lends AnnotationLayerBuilder.prototype */
return a.prototype={/**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     */
render:function(a,b){var c=this,e={intent:void 0===b?"display":b};this.pdfPage.getAnnotations(e).then(function(b){if(a=a.clone({dontFlip:!0}),e={viewport:a,div:c.div,annotations:b,page:c.pdfPage,linkService:c.linkService,downloadManager:c.downloadManager},c.div)
// If an annotationLayer already exists, refresh its children's
// transformation matrices.
d.AnnotationLayer.update(e);else{
// Create an annotation layer div and render the annotations
// if there is at least one annotation.
if(0===b.length)return;c.div=document.createElement("div"),c.div.className="annotationLayer",c.pageDiv.appendChild(c.div),e.div=c.div,d.AnnotationLayer.render(e),"undefined"!=typeof f&&f.translate(c.div)}})},hide:function(){this.div&&this.div.setAttribute("hidden","true")}},a}();e.prototype={/**
   * @param {HTMLDivElement} pageDiv
   * @param {PDFPage} pdfPage
   * @returns {AnnotationLayerBuilder}
   */
createAnnotationLayerBuilder:function(a,b){return new h({pageDiv:a,pdfPage:b,linkService:new g})}},a.AnnotationLayerBuilder=h,a.DefaultAnnotationLayerFactory=e}),function(a,b){b(a.pdfjsWebHandTool={},a.pdfjsWebUIUtils,a.pdfjsWebGrabToPan,a.pdfjsWebPreferences,a.pdfjsWebSecondaryToolbar)}(this,function(a,b,c,d,e){var f=b.mozL10n,g=c.GrabToPan,h=d.Preferences,i=e.SecondaryToolbar,j=function(){/**
   * @constructs HandTool
   * @param {HandToolOptions} options
   */
function a(a){this.container=a.container,this.toggleHandTool=a.toggleHandTool,this.wasActive=!1,this.handTool=new g({element:this.container,onActiveChanged:function(a){this.toggleHandTool&&(a?(this.toggleHandTool.title=f.get("hand_tool_disable.title",null,"Disable hand tool"),this.toggleHandTool.firstElementChild.textContent=f.get("hand_tool_disable_label",null,"Disable hand tool")):(this.toggleHandTool.title=f.get("hand_tool_enable.title",null,"Enable hand tool"),this.toggleHandTool.firstElementChild.textContent=f.get("hand_tool_enable_label",null,"Enable hand tool")))}.bind(this)}),this.toggleHandTool&&(this.toggleHandTool.addEventListener("click",this.toggle.bind(this)),window.addEventListener("localized",function(a){h.get("enableHandToolOnLoad").then(function(a){a&&this.handTool.activate()}.bind(this),function(a){})}.bind(this)),window.addEventListener("presentationmodechanged",function(a){a.detail.switchInProgress||(a.detail.active?this.enterPresentationMode():this.exitPresentationMode())}.bind(this)))}return a.prototype={/**
     * @return {boolean}
     */
get isActive(){return!!this.handTool.active},toggle:function(){this.handTool.toggle(),i.close()},enterPresentationMode:function(){this.isActive&&(this.wasActive=!0,this.handTool.deactivate())},exitPresentationMode:function(){this.wasActive&&(this.wasActive=!1,this.handTool.activate())}},a}();a.HandTool=j}),function(a,b){b(a.pdfjsWebPDFFindBar={},a.pdfjsWebUIUtils,a.pdfjsWebPDFFindController)}(this,function(a,b,c){var d=b.mozL10n,e=c.FindStates,f=function(){function a(a){if(this.opened=!1,this.bar=a.bar||null,this.toggleButton=a.toggleButton||null,this.findField=a.findField||null,this.highlightAll=a.highlightAllCheckbox||null,this.caseSensitive=a.caseSensitiveCheckbox||null,this.findMsg=a.findMsg||null,this.findResultsCount=a.findResultsCount||null,this.findStatusIcon=a.findStatusIcon||null,this.findPreviousButton=a.findPreviousButton||null,this.findNextButton=a.findNextButton||null,this.findController=a.findController||null,null===this.findController)throw new Error("PDFFindBar cannot be used without a PDFFindController instance.");
// Add event listeners to the DOM elements.
var b=this;this.toggleButton.addEventListener("click",function(){b.toggle()}),this.findField.addEventListener("input",function(){b.dispatchEvent("")}),this.bar.addEventListener("keydown",function(a){switch(a.keyCode){case 13:// Enter
a.target===b.findField&&b.dispatchEvent("again",a.shiftKey);break;case 27:// Escape
b.close()}}),this.findPreviousButton.addEventListener("click",function(){b.dispatchEvent("again",!0)}),this.findNextButton.addEventListener("click",function(){b.dispatchEvent("again",!1)}),this.highlightAll.addEventListener("click",function(){b.dispatchEvent("highlightallchange")}),this.caseSensitive.addEventListener("click",function(){b.dispatchEvent("casesensitivitychange")})}return a.prototype={reset:function(){this.updateUIState()},dispatchEvent:function(a,b){var c=document.createEvent("CustomEvent");return c.initCustomEvent("find"+a,!0,!0,{query:this.findField.value,caseSensitive:this.caseSensitive.checked,highlightAll:this.highlightAll.checked,findPrevious:b}),window.dispatchEvent(c)},updateUIState:function(a,b,c){var f=!1,g="",h="";switch(a){case e.FIND_FOUND:break;case e.FIND_PENDING:h="pending";break;case e.FIND_NOTFOUND:g=d.get("find_not_found",null,"Phrase not found"),f=!0;break;case e.FIND_WRAPPED:g=b?d.get("find_reached_top",null,"Reached top of document, continued from bottom"):d.get("find_reached_bottom",null,"Reached end of document, continued from top")}f?this.findField.classList.add("notFound"):this.findField.classList.remove("notFound"),this.findField.setAttribute("data-status",h),this.findMsg.textContent=g,this.updateResultsCount(c)},updateResultsCount:function(a){if(this.findResultsCount){
// If there are no matches, hide the counter
if(!a)return void this.findResultsCount.classList.add("hidden");
// Create the match counter
this.findResultsCount.textContent=a.toLocaleString(),
// Show the counter
this.findResultsCount.classList.remove("hidden")}},open:function(){this.opened||(this.opened=!0,this.toggleButton.classList.add("toggled"),this.bar.classList.remove("hidden")),this.findField.select(),this.findField.focus()},close:function(){this.opened&&(this.opened=!1,this.toggleButton.classList.remove("toggled"),this.bar.classList.add("hidden"),this.findController.active=!1)},toggle:function(){this.opened?this.close():this.open()}},a}();a.PDFFindBar=f}),function(a,b){b(a.pdfjsWebPDFThumbnailViewer={},a.pdfjsWebUIUtils,a.pdfjsWebPDFThumbnailView)}(this,function(a,b,c){var d=b.watchScroll,e=b.getVisibleElements,f=b.scrollIntoView,g=c.PDFThumbnailView,h=-19,i=function(){/**
   * @constructs PDFThumbnailViewer
   * @param {PDFThumbnailViewerOptions} options
   */
function a(a){this.container=a.container,this.renderingQueue=a.renderingQueue,this.linkService=a.linkService,this.scroll=d(this.container,this._scrollUpdated.bind(this)),this._resetView()}return a.prototype={/**
     * @private
     */
_scrollUpdated:function(){this.renderingQueue.renderHighestPriority()},getThumbnail:function(a){return this.thumbnails[a]},/**
     * @private
     */
_getVisibleThumbs:function(){return e(this.container,this.thumbnails)},scrollThumbnailIntoView:function(a){var b=document.querySelector(".thumbnail.selected");b&&b.classList.remove("selected");var c=document.getElementById("thumbnailContainer"+a);c&&c.classList.add("selected");var d=this._getVisibleThumbs(),e=d.views.length;
// If the thumbnail isn't currently visible, scroll it into view.
if(e>0){var g=d.first.id,i=e>1?d.last.id:g;(g>=a||a>=i)&&f(c,{top:h})}},get pagesRotation(){return this._pagesRotation},set pagesRotation(a){this._pagesRotation=a;for(var b=0,c=this.thumbnails.length;c>b;b++){var d=this.thumbnails[b];d.update(a)}},cleanup:function(){var a=g.tempImageCache;a&&(
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
a.width=0,a.height=0),g.tempImageCache=null},/**
     * @private
     */
_resetView:function(){this.thumbnails=[],this._pagesRotation=0,this._pagesRequests=[]},setDocument:function(a){if(this.pdfDocument){for(
// cleanup of the elements and views
var b=this.container;b.hasChildNodes();)b.removeChild(b.lastChild);this._resetView()}return this.pdfDocument=a,a?a.getPage(1).then(function(b){for(var c=a.numPages,d=b.getViewport(1),e=1;c>=e;++e){var f=new g({container:this.container,id:e,defaultViewport:d.clone(),linkService:this.linkService,renderingQueue:this.renderingQueue,disableCanvasToImageConversion:!1});this.thumbnails.push(f)}}.bind(this)):Promise.resolve()},/**
     * @param {PDFPageView} pageView
     * @returns {PDFPage}
     * @private
     */
_ensurePdfPageLoaded:function(a){if(a.pdfPage)return Promise.resolve(a.pdfPage);var b=a.id;if(this._pagesRequests[b])return this._pagesRequests[b];var c=this.pdfDocument.getPage(b).then(function(c){return a.setPdfPage(c),this._pagesRequests[b]=null,c}.bind(this));return this._pagesRequests[b]=c,c},forceRendering:function(){var a=this._getVisibleThumbs(),b=this.renderingQueue.getHighestPriority(a,this.thumbnails,this.scroll.down);return b?(this._ensurePdfPageLoaded(b).then(function(){this.renderingQueue.renderView(b)}.bind(this)),!0):!1}},a}();a.PDFThumbnailViewer=i}),function(a,b){b(a.pdfjsWebPDFViewer={},a.pdfjsWebUIUtils,a.pdfjsWebPDFPageView,a.pdfjsWebPDFRenderingQueue,a.pdfjsWebTextLayerBuilder,a.pdfjsWebAnnotationLayerBuilder,a.pdfjsWebPDFLinkService,a.pdfjsWebPDFJS)}(this,function(a,b,c,d,e,f,g,h){var i=b.UNKNOWN_SCALE,j=b.SCROLLBAR_PADDING,k=b.VERTICAL_PADDING,l=b.MAX_AUTO_SCALE,m=b.CSS_UNITS,n=b.DEFAULT_SCALE,o=b.DEFAULT_SCALE_VALUE,p=b.scrollIntoView,q=b.watchScroll,r=b.getVisibleElements,s=c.PDFPageView,t=d.RenderingStates,u=d.PDFRenderingQueue,v=e.TextLayerBuilder,w=f.AnnotationLayerBuilder,x=g.SimpleLinkService,y={UNKNOWN:0,NORMAL:1,CHANGING:2,FULLSCREEN:3},z=10,A=function(){function a(a){var b=[];this.push=function(c){var d=b.indexOf(c);d>=0&&b.splice(d,1),b.push(c),b.length>a&&b.shift().destroy()},this.resize=function(c){for(a=c;b.length>a;)b.shift().destroy()}}function b(a,b){return b===a?!0:Math.abs(b-a)<1e-15}/**
   * @constructs PDFViewer
   * @param {PDFViewerOptions} options
   */
function c(a){this.container=a.container,this.viewer=a.viewer||a.container.firstElementChild,this.linkService=a.linkService||new x,this.downloadManager=a.downloadManager||null,this.removePageBorders=a.removePageBorders||!1,this.defaultRenderingQueue=!a.renderingQueue,this.defaultRenderingQueue?(
// Custom rendering queue is not specified, using default one
this.renderingQueue=new u,this.renderingQueue.setViewer(this)):this.renderingQueue=a.renderingQueue,this.scroll=q(this.container,this._scrollUpdate.bind(this)),this.updateInProgress=!1,this.presentationModeState=y.UNKNOWN,this._resetView(),this.removePageBorders&&this.viewer.classList.add("removePageBorders")}/** @lends PDFViewer.prototype */
return c.prototype={get pagesCount(){return this._pages.length},getPageView:function(a){return this._pages[a]},get currentPageNumber(){return this._currentPageNumber},set currentPageNumber(a){if(!this.pdfDocument)return void(this._currentPageNumber=a);var b=document.createEvent("UIEvents");
// Check if the caller is `PDFViewer_update`, to avoid breaking scrolling.
return b.initUIEvent("pagechange",!0,!0,window,0),b.updateInProgress=this.updateInProgress,a>0&&a<=this.pagesCount?(b.previousPageNumber=this._currentPageNumber,this._currentPageNumber=a,b.pageNumber=a,this.container.dispatchEvent(b),void(this.updateInProgress||this.scrollPageIntoView(a))):(b.pageNumber=this._currentPageNumber,b.previousPageNumber=a,void this.container.dispatchEvent(b))},/**
     * @returns {number}
     */
get currentScale(){return this._currentScale!==i?this._currentScale:n},/**
     * @param {number} val - Scale of the pages in percents.
     */
set currentScale(a){if(isNaN(a))throw new Error("Invalid numeric scale");return this.pdfDocument?void this._setScale(a,!1):(this._currentScale=a,void(this._currentScaleValue=a!==i?a.toString():null))},/**
     * @returns {string}
     */
get currentScaleValue(){return this._currentScaleValue},/**
     * @param val - The scale of the pages (in percent or predefined value).
     */
set currentScaleValue(a){return this.pdfDocument?void this._setScale(a,!1):(this._currentScale=isNaN(a)?i:a,void(this._currentScaleValue=a))},/**
     * @returns {number}
     */
get pagesRotation(){return this._pagesRotation},/**
     * @param {number} rotation - The rotation of the pages (0, 90, 180, 270).
     */
set pagesRotation(a){this._pagesRotation=a;for(var b=0,c=this._pages.length;c>b;b++){var d=this._pages[b];d.update(d.scale,a)}this._setScale(this._currentScaleValue,!0),this.defaultRenderingQueue&&this.update()},/**
     * @param pdfDocument {PDFDocument}
     */
setDocument:function(a){if(this.pdfDocument&&this._resetView(),this.pdfDocument=a,a){var b,c=a.numPages,d=this,e=new Promise(function(a){b=a});this.pagesPromise=e,e.then(function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("pagesloaded",!0,!0,{pagesCount:c}),d.container.dispatchEvent(a)});var f=!1,g=null,i=new Promise(function(a){g=a});this.onePageRendered=i;var j=function(a){a.onBeforeDraw=function(){
// Add the page to the buffer at the start of drawing. That way it can
// be evicted from the buffer and destroyed even if we pause its
// rendering.
d._buffer.push(this)},
// when page is painted, using the image as thumbnail base
a.onAfterDraw=function(){f||(f=!0,g())}},k=a.getPage(1);
// Fetch a single page so we can get a viewport that will be the default
// viewport for all pages
return this.firstPagePromise=k,k.then(function(e){for(var f=this.currentScale,g=e.getViewport(f*m),k=1;c>=k;++k){var l=null;h.PDFJS.disableTextLayer||(l=this);var n=new s({container:this.viewer,id:k,scale:f,defaultViewport:g.clone(),renderingQueue:this.renderingQueue,textLayerFactory:l,annotationLayerFactory:this});j(n),this._pages.push(n)}var o=this.linkService;
// Fetch all the pages since the viewport is needed before printing
// starts to create the correct size canvas. Wait until one page is
// rendered so we don't tie up too many resources early on.
i.then(function(){if(h.PDFJS.disableAutoFetch)
// XXX: Printing is semi-broken with auto fetch disabled.
b();else for(var e=c,f=1;c>=f;++f)a.getPage(f).then(function(a,c){var f=d._pages[a-1];f.pdfPage||f.setPdfPage(c),o.cachePageRef(a,c.ref),e--,e||b()}.bind(null,f))});var p=document.createEvent("CustomEvent");p.initCustomEvent("pagesinit",!0,!0,null),d.container.dispatchEvent(p),this.defaultRenderingQueue&&this.update(),this.findController&&this.findController.resolveFirstPage()}.bind(this))}},_resetView:function(){this._pages=[],this._currentPageNumber=1,this._currentScale=i,this._currentScaleValue=null,this._buffer=new a(z),this._location=null,this._pagesRotation=0,this._pagesRequests=[];for(var b=this.viewer;b.hasChildNodes();)b.removeChild(b.lastChild)},_scrollUpdate:function(){if(0!==this.pagesCount){this.update();for(var a=0,b=this._pages.length;b>a;a++)this._pages[a].updatePosition()}},_setScaleDispatchEvent:function(a,b,c){var d=document.createEvent("UIEvents");d.initUIEvent("scalechange",!0,!0,window,0),d.scale=a,c&&(d.presetValue=b),this.container.dispatchEvent(d)},_setScaleUpdatePages:function(a,c,d,e){if(this._currentScaleValue=c,b(this._currentScale,a))return void(e&&this._setScaleDispatchEvent(a,c,!0));for(var f=0,g=this._pages.length;g>f;f++)this._pages[f].update(a);if(this._currentScale=a,!d){var i,j=this._currentPageNumber;!this._location||h.PDFJS.ignoreCurrentPositionOnZoom||this.isInPresentationMode||this.isChangingPresentationMode||(j=this._location.pageNumber,i=[null,{name:"XYZ"},this._location.left,this._location.top,null]),this.scrollPageIntoView(j,i)}this._setScaleDispatchEvent(a,c,e),this.defaultRenderingQueue&&this.update()},_setScale:function(a,b){var c=parseFloat(a);if(c>0)this._setScaleUpdatePages(c,a,b,!1);else{var d=this._pages[this._currentPageNumber-1];if(!d)return;var e=this.isInPresentationMode||this.removePageBorders?0:j,f=this.isInPresentationMode||this.removePageBorders?0:k,g=(this.container.clientWidth-e)/d.width*d.scale,h=(this.container.clientHeight-f)/d.height*d.scale;switch(a){case"page-actual":c=1;break;case"page-width":c=g;break;case"page-height":c=h;break;case"page-fit":c=Math.min(g,h);break;case"auto":var i=d.width>d.height,m=i?Math.min(h,g):g;c=Math.min(l,m);break;default:return void console.error("pdfViewSetScale: '"+a+"' is an unknown zoom value.")}this._setScaleUpdatePages(c,a,b,!0)}},/**
     * Scrolls page into view.
     * @param {number} pageNumber
     * @param {Array} dest - (optional) original PDF destination array:
     *   <page-ref> </XYZ|FitXXX> <args..>
     */
scrollPageIntoView:function(a,b){if(this.pdfDocument){var c=this._pages[a-1];if(this.isInPresentationMode){if(this._currentPageNumber!==c.id)
// Avoid breaking getVisiblePages in presentation mode.
return void(this.currentPageNumber=c.id);b=null,
// Fixes the case when PDF has different page sizes.
this._setScale(this._currentScaleValue,!0)}if(!b)return void p(c.div);var d,e,f=0,g=0,h=0,l=0,n=c.rotation%180!==0,q=(n?c.height:c.width)/c.scale/m,r=(n?c.width:c.height)/c.scale/m,s=0;switch(b[1].name){case"XYZ":f=b[2],g=b[3],s=b[4],
// If x and/or y coordinates are not supplied, default to
// _top_ left of the page (not the obvious bottom left,
// since aligning the bottom of the intended page with the
// top of the window is rarely helpful).
f=null!==f?f:0,g=null!==g?g:r;break;case"Fit":case"FitB":s="page-fit";break;case"FitH":case"FitBH":g=b[2],s="page-width",
// According to the PDF spec, section 12.3.2.2, a `null` value in the
// parameter should maintain the position relative to the new page.
null===g&&this._location&&(f=this._location.left,g=this._location.top);break;case"FitV":case"FitBV":f=b[2],h=q,l=r,s="page-height";break;case"FitR":f=b[2],g=b[3],h=b[4]-f,l=b[5]-g;var t=this.removePageBorders?0:j,u=this.removePageBorders?0:k;d=(this.container.clientWidth-t)/h/m,e=(this.container.clientHeight-u)/l/m,s=Math.min(Math.abs(d),Math.abs(e));break;default:return}if(s&&s!==this._currentScale?this.currentScaleValue=s:this._currentScale===i&&(this.currentScaleValue=o),"page-fit"===s&&!b[4])return void p(c.div);var v=[c.viewport.convertToViewportPoint(f,g),c.viewport.convertToViewportPoint(f+h,g+l)],w=Math.min(v[0][0],v[1][0]),x=Math.min(v[0][1],v[1][1]);p(c.div,{left:w,top:x})}},_updateLocation:function(a){var b=this._currentScale,c=this._currentScaleValue,d=parseFloat(c)===b?Math.round(1e4*b)/100:c,e=a.id,f="#page="+e;f+="&zoom="+d;var g=this._pages[e-1],h=this.container,i=g.getPagePoint(h.scrollLeft-a.x,h.scrollTop-a.y),j=Math.round(i[0]),k=Math.round(i[1]);f+=","+j+","+k,this._location={pageNumber:e,scale:d,top:k,left:j,pdfOpenParams:f}},update:function(){var a=this._getVisiblePages(),b=a.views;if(0!==b.length){this.updateInProgress=!0;var c=Math.max(z,2*b.length+1);this._buffer.resize(c),this.renderingQueue.renderHighestPriority(a);for(var d=this._currentPageNumber,e=a.first,f=0,g=b.length,h=!1;g>f;++f){var i=b[f];if(i.percent<100)break;if(i.id===d){h=!0;break}}h||(d=b[0].id),this.isInPresentationMode||(this.currentPageNumber=d),this._updateLocation(e),this.updateInProgress=!1;var j=document.createEvent("UIEvents");j.initUIEvent("updateviewarea",!0,!0,window,0),j.location=this._location,this.container.dispatchEvent(j)}},containsElement:function(a){return this.container.contains(a)},focus:function(){this.container.focus()},get isInPresentationMode(){return this.presentationModeState===y.FULLSCREEN},get isChangingPresentationMode(){return this.presentationModeState===y.CHANGING},get isHorizontalScrollbarEnabled(){return this.isInPresentationMode?!1:this.container.scrollWidth>this.container.clientWidth},_getVisiblePages:function(){if(this.isInPresentationMode){
// The algorithm in getVisibleElements doesn't work in all browsers and
// configurations when presentation mode is active.
var a=[],b=this._pages[this._currentPageNumber-1];return a.push({id:b.id,view:b}),{first:b,last:b,views:a}}return r(this.container,this._pages,!0)},cleanup:function(){for(var a=0,b=this._pages.length;b>a;a++)this._pages[a]&&this._pages[a].renderingState!==t.FINISHED&&this._pages[a].reset()},/**
     * @param {PDFPageView} pageView
     * @returns {PDFPage}
     * @private
     */
_ensurePdfPageLoaded:function(a){if(a.pdfPage)return Promise.resolve(a.pdfPage);var b=a.id;if(this._pagesRequests[b])return this._pagesRequests[b];var c=this.pdfDocument.getPage(b).then(function(c){return a.setPdfPage(c),this._pagesRequests[b]=null,c}.bind(this));return this._pagesRequests[b]=c,c},forceRendering:function(a){var b=a||this._getVisiblePages(),c=this.renderingQueue.getHighestPriority(b,this._pages,this.scroll.down);return c?(this._ensurePdfPageLoaded(c).then(function(){this.renderingQueue.renderView(c)}.bind(this)),!0):!1},getPageTextContent:function(a){return this.pdfDocument.getPage(a+1).then(function(a){return a.getTextContent({normalizeWhitespace:!0})})},/**
     * @param {HTMLDivElement} textLayerDiv
     * @param {number} pageIndex
     * @param {PageViewport} viewport
     * @returns {TextLayerBuilder}
     */
createTextLayerBuilder:function(a,b,c){return new v({textLayerDiv:a,pageIndex:b,viewport:c,findController:this.isInPresentationMode?null:this.findController})},/**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @returns {AnnotationLayerBuilder}
     */
createAnnotationLayerBuilder:function(a,b){return new w({pageDiv:a,pdfPage:b,linkService:this.linkService,downloadManager:this.downloadManager})},setFindController:function(a){this.findController=a}},c}();a.PresentationModeState=y,a.PDFViewer=A}),function(a,b){b(a.pdfjsWebApp={},a.pdfjsWebUIUtils,a.pdfjsWebFirefoxCom,a.pdfjsWebDownloadManager,a.pdfjsWebPDFHistory,a.pdfjsWebPreferences,a.pdfjsWebPDFSidebar,a.pdfjsWebViewHistory,a.pdfjsWebPDFThumbnailViewer,a.pdfjsWebSecondaryToolbar,a.pdfjsWebPasswordPrompt,a.pdfjsWebPDFPresentationMode,a.pdfjsWebPDFDocumentProperties,a.pdfjsWebHandTool,a.pdfjsWebPDFViewer,a.pdfjsWebPDFRenderingQueue,a.pdfjsWebPDFLinkService,a.pdfjsWebPDFOutlineViewer,a.pdfjsWebOverlayManager,a.pdfjsWebPDFAttachmentViewer,a.pdfjsWebPDFFindController,a.pdfjsWebPDFFindBar,a.pdfjsWebMozPrintCallbackPolyfill,a.pdfjsWebPDFJS)}(this,function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){function y(a){a.imageResourcesPath="./images/",a.workerSrc="./pdf.worker.js",a.cMapUrl="./cmaps/",a.cMapPacked=!0}function z(a){try{var b=new URL(window.location.href).origin||"null";if(ma.indexOf(b)>=0)
// Hosted or local viewer, allow for any file locations
return;var c=new URL(a,window.location.href).origin;
// Removing of the following line will not guarantee that the viewer will
// start accepting URLs from foreign origin -- CORS headers on the remote
// server must be properly configured.
if(c!==b)throw new Error("file origin does not match viewer's")}catch(d){var e=d&&d.message,f=I.get("loading_error",null,"An error occurred while loading the PDF."),g={message:e};throw la.error(f,g),d}}function A(){var a=document.location.search.substring(1),b=J(a),c="file"in b?b.file:DEFAULT_URL;z(c);var d=la.appConfig,e=document.createElement("input");e.id=d.openFileInputName,e.className="fileInput",e.setAttribute("type","file"),e.oncontextmenu=H,document.body.appendChild(e),window.File&&window.FileReader&&window.FileList&&window.Blob?e.value=null:(d.toolbar.openFile.setAttribute("hidden","true"),d.secondaryToolbar.openFile.setAttribute("hidden","true"));var f=x.PDFJS;if(la.preferencePdfBugEnabled){
// Special debugging flags in the hash section of the URL.
var g=document.location.hash.substring(1),h=J(g);if("disableworker"in h&&(f.disableWorker="true"===h.disableworker),"disablerange"in h&&(f.disableRange="true"===h.disablerange),"disablestream"in h&&(f.disableStream="true"===h.disablestream),"disableautofetch"in h&&(f.disableAutoFetch="true"===h.disableautofetch),"disablefontface"in h&&(f.disableFontFace="true"===h.disablefontface),"disablehistory"in h&&(f.disableHistory="true"===h.disablehistory),"webgl"in h&&(f.disableWebGL="true"!==h.webgl),"useonlycsszoom"in h&&(f.useOnlyCssZoom="true"===h.useonlycsszoom),"verbosity"in h&&(f.verbosity=0|h.verbosity),"ignorecurrentpositiononzoom"in h&&(f.ignoreCurrentPositionOnZoom="true"===h.ignorecurrentpositiononzoom),"locale"in h&&(f.locale=h.locale),"textlayer"in h)switch(h.textlayer){case"off":f.disableTextLayer=!0;break;case"visible":case"shadow":case"hover":var i=d.viewerContainer;i.classList.add("textLayer-"+h.textlayer)}if("pdfbug"in h){f.pdfBug=!0;var j=h.pdfbug,k=j.split(",");PDFBug.enable(k),PDFBug.init(x,d.mainContainer)}}if(I.setLanguage(f.locale),la.supportsPrinting||(d.toolbar.print.classList.add("hidden"),d.secondaryToolbar.print.classList.add("hidden")),/*
  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add('hidden');
    appConfig.secondaryToolbar.presentationModeButton.classList.add('hidden');
  }
  */
la.supportsIntegratedFind&&d.toolbar.viewFind.classList.add("hidden"),
// Suppress context menus for some controls
d.toolbar.scaleSelect.oncontextmenu=H,d.sidebar.mainContainer.addEventListener("transitionend",function(a){if(a.target===this){var b=document.createEvent("UIEvents");b.initUIEvent("resize",!1,!1,window,0),window.dispatchEvent(b)}},!0),d.sidebar.toggleButton.addEventListener("click",function(){la.pdfSidebar.toggle()}),d.toolbar.previous.addEventListener("click",function(){la.page--}),d.toolbar.next.addEventListener("click",function(){la.page++}),d.toolbar.zoomIn.addEventListener("click",function(){la.zoomIn()}),d.toolbar.zoomOut.addEventListener("click",function(){la.zoomOut()}),d.toolbar.pageNumber.addEventListener("click",function(){this.select()}),d.toolbar.pageNumber.addEventListener("change",function(){
// Handle the user inputting a floating point number.
la.page=0|this.value,this.value!==(0|this.value).toString()&&(this.value=la.page)}),d.toolbar.scaleSelect.addEventListener("change",function(){"custom"!==this.value&&(la.pdfViewer.currentScaleValue=this.value)}),/*
  appConfig.toolbar.presentationModeButton.addEventListener('click',
    SecondaryToolbar.presentationModeClick.bind(SecondaryToolbar));

  appConfig.toolbar.openFile.addEventListener('click',
    SecondaryToolbar.openFileClick.bind(SecondaryToolbar));
	*/
d.toolbar.print.addEventListener("click",R.printClick.bind(R)),d.toolbar.download.addEventListener("click",R.downloadClick.bind(R)),c&&0===c.lastIndexOf("file:",0)){
// file:-scheme. Load the contents in the main thread because QtWebKit
// cannot load file:-URLs in a Web Worker. file:-URLs are usually loaded
// very quickly, so there is no need to set up progress event listeners.
la.setTitleUsingUrl(c);var l=new XMLHttpRequest;l.onload=function(){la.open(new Uint8Array(l.response))};try{l.open("GET",c),l.responseType="arraybuffer",l.send()}catch(m){la.error(I.get("loading_error",null,"An error occurred while loading the PDF."),m)}}else c&&la.open(c)}function B(a){for(var b=la.appConfig.toolbar.scaleSelect.options,c=!1,d=0,e=b.length;e>d;d++){var f=b[d];f.value===a?(f.selected=!0,c=!0):f.selected=!1}return c}function C(a){var b=40,c="DOMMouseScroll"===a.type?-a.detail:a.wheelDelta/b,d=0>c?"zoomOut":"zoomIn",e=la.pdfViewer;if(e.isInPresentationMode)a.preventDefault(),la.scrollPresentationMode(c*b);else if(a.ctrlKey||a.metaKey){var f=la.supportedMouseWheelZoomModifierKeys;if(a.ctrlKey&&!f.ctrlKey||a.metaKey&&!f.metaKey)return;
// NOTE: this check must be placed *after* preventDefault.
if(
// Only zoom the pages, not the entire viewer.
a.preventDefault(),oa)return;var g=e.currentScale;la[d](Math.abs(c));var h=e.currentScale;if(g!==h){
// After scaling the page via zoomIn/zoomOut, the position of the upper-
// left corner is restored. When the mouse wheel is used, the position
// under the cursor should be restored instead.
var i=h/g-1,j=e.container.getBoundingClientRect(),k=a.clientX-j.left,l=a.clientY-j.top;e.container.scrollLeft+=k*i,e.container.scrollTop+=l*i}}else oa=!0,clearTimeout(na),na=setTimeout(function(){oa=!1},1e3)}var D=(c.FirefoxCom,b.UNKNOWN_SCALE),E=b.DEFAULT_SCALE_VALUE,F=b.ProgressBar,G=b.getPDFFileNameFromURL,H=b.noContextMenuHandler,I=b.mozL10n,J=b.parseQueryString,K=d.DownloadManager||c.DownloadManager,L=e.PDFHistory,M=f.Preferences,N=g.SidebarView,O=g.PDFSidebar,P=h.ViewHistory,Q=i.PDFThumbnailViewer,R=j.SecondaryToolbar,S=k.PasswordPrompt,T=l.PDFPresentationMode,U=m.PDFDocumentProperties,V=n.HandTool,W=o.PresentationModeState,X=o.PDFViewer,Y=p.RenderingStates,Z=p.PDFRenderingQueue,$=q.PDFLinkService,_=r.PDFOutlineViewer,aa=s.OverlayManager,ba=t.PDFAttachmentViewer,ca=u.PDFFindController,da=v.PDFFindBar,ea=1.1,fa=.25,ga=10,ha=8,ia=22,ja="visiblePageIsLoading",ka=5e3,la={initialBookmark:document.location.hash.substring(1),initialDestination:null,initialized:!1,fellback:!1,appConfig:null,pdfDocument:null,pdfLoadingTask:null,printing:!1,/** @type {PDFViewer} */
pdfViewer:null,/** @type {PDFThumbnailViewer} */
pdfThumbnailViewer:null,/** @type {PDFRenderingQueue} */
pdfRenderingQueue:null,/** @type {PDFPresentationMode} */
pdfPresentationMode:null,/** @type {PDFDocumentProperties} */
pdfDocumentProperties:null,/** @type {PDFLinkService} */
pdfLinkService:null,/** @type {PDFHistory} */
pdfHistory:null,/** @type {PDFSidebar} */
pdfSidebar:null,/** @type {PDFOutlineViewer} */
pdfOutlineViewer:null,/** @type {PDFAttachmentViewer} */
pdfAttachmentViewer:null,/** @type {ViewHistory} */
store:null,pageRotation:0,isInitialViewSet:!1,animationStartedPromise:null,preferenceSidebarViewOnLoad:N.NONE,preferencePdfBugEnabled:!1,preferenceShowPreviousViewOnLoad:!0,preferenceDefaultZoomValue:"",isViewerEmbedded:window.parent!==window,url:"",
// called once when the document is loaded
initialize:function(a){y(x.PDFJS),this.appConfig=a;var b=new Z;b.onIdle=this.cleanup.bind(this),this.pdfRenderingQueue=b;var c=new $;this.pdfLinkService=c;var d=a.mainContainer,e=a.viewerContainer;this.pdfViewer=new X({container:d,viewer:e,renderingQueue:b,linkService:c,downloadManager:new K}),b.setViewer(this.pdfViewer),c.setViewer(this.pdfViewer);var f=a.sidebar.thumbnailView;this.pdfThumbnailViewer=new Q({container:f,renderingQueue:b,linkService:c}),b.setThumbnailViewer(this.pdfThumbnailViewer),M.initialize(),this.preferences=M,this.pdfHistory=new L({linkService:c}),c.setHistory(this.pdfHistory),this.findController=new ca({pdfViewer:this.pdfViewer,integratedFind:this.supportsIntegratedFind}),this.pdfViewer.setFindController(this.findController);
// FIXME better PDFFindBar constructor parameters
var g=Object.create(a.findBar);if(g.findController=this.findController,this.findBar=new da(g),this.findController.setFindBar(this.findBar),this.overlayManager=aa,this.handTool=new V({container:d,toggleHandTool:a.secondaryToolbar.toggleHandTool}),this.pdfDocumentProperties=new U(a.documentProperties),R.initialize(a.secondaryToolbar),this.secondaryToolbar=R,this.supportsFullscreen){var h=R;this.pdfPresentationMode=new T({container:d,viewer:e,pdfViewer:this.pdfViewer,contextMenuItems:[{element:a.fullscreen.contextFirstPage,handler:h.firstPageClick.bind(h)},{element:a.fullscreen.contextLastPage,handler:h.lastPageClick.bind(h)},{element:a.fullscreen.contextPageRotateCw,handler:h.pageRotateCwClick.bind(h)},{element:a.fullscreen.contextPageRotateCcw,handler:h.pageRotateCcwClick.bind(h)}]})}this.passwordPrompt=new S(a.passwordOverlay),this.pdfOutlineViewer=new _({container:a.sidebar.outlineView,linkService:c}),this.pdfAttachmentViewer=new ba({container:a.sidebar.attachmentsView,downloadManager:new K});
// FIXME better PDFSidebar constructor parameters
var i=Object.create(a.sidebar);i.pdfViewer=this.pdfViewer,i.pdfThumbnailViewer=this.pdfThumbnailViewer,i.pdfOutlineViewer=this.pdfOutlineViewer,this.pdfSidebar=new O(i),this.pdfSidebar.onToggled=this.forceRendering.bind(this);var j=this,k=x.PDFJS,l=Promise.all([M.get("enableWebGL").then(function(a){k.disableWebGL=!a}),M.get("sidebarViewOnLoad").then(function(a){j.preferenceSidebarViewOnLoad=a}),M.get("pdfBugEnabled").then(function(a){j.preferencePdfBugEnabled=a}),M.get("showPreviousViewOnLoad").then(function(a){j.preferenceShowPreviousViewOnLoad=a}),M.get("defaultZoomValue").then(function(a){j.preferenceDefaultZoomValue=a}),M.get("disableTextLayer").then(function(a){k.disableTextLayer!==!0&&(k.disableTextLayer=a)}),M.get("disableRange").then(function(a){k.disableRange!==!0&&(k.disableRange=a)}),M.get("disableStream").then(function(a){k.disableStream!==!0&&(k.disableStream=a)}),M.get("disableAutoFetch").then(function(a){k.disableAutoFetch=a}),M.get("disableFontFace").then(function(a){k.disableFontFace!==!0&&(k.disableFontFace=a)}),M.get("useOnlyCssZoom").then(function(a){k.useOnlyCssZoom=a}),M.get("externalLinkTarget").then(function(a){k.isExternalLinkTargetSet()||(k.externalLinkTarget=a)})])["catch"](function(a){});return l.then(function(){j.isViewerEmbedded&&!k.isExternalLinkTargetSet()&&(
// Prevent external links from "replacing" the viewer,
// when it's embedded in e.g. an iframe or an object.
k.externalLinkTarget=k.LinkTarget.TOP),j.initialized=!0})},run:function(a){this.initialize(a).then(A)},zoomIn:function(a){var b=this.pdfViewer.currentScale;do b=(b*ea).toFixed(2),b=Math.ceil(10*b)/10,b=Math.min(ga,b);while(--a>0&&ga>b);this.pdfViewer.currentScaleValue=b},zoomOut:function(a){var b=this.pdfViewer.currentScale;do b=(b/ea).toFixed(2),b=Math.floor(10*b)/10,b=Math.max(fa,b);while(--a>0&&b>fa);this.pdfViewer.currentScaleValue=b},get pagesCount(){return this.pdfDocument.numPages},set page(a){this.pdfLinkService.page=a},get page(){// TODO remove
return this.pdfLinkService.page},get supportsPrinting(){var a=document.createElement("canvas"),b="mozPrintCallback"in a;return x.shadow(this,"supportsPrinting",b)},get supportsFullscreen(){var a=document.documentElement,b=!!(a.requestFullscreen||a.mozRequestFullScreen||a.webkitRequestFullScreen||a.msRequestFullscreen);return document.fullscreenEnabled!==!1&&document.mozFullScreenEnabled!==!1&&document.webkitFullscreenEnabled!==!1&&document.msFullscreenEnabled!==!1||(b=!1),b&&x.PDFJS.disableFullscreen===!0&&(b=!1),x.shadow(this,"supportsFullscreen",b)},get supportsIntegratedFind(){var a=!1;return x.shadow(this,"supportsIntegratedFind",a)},get supportsDocumentFonts(){var a=!0;return x.shadow(this,"supportsDocumentFonts",a)},get supportsDocumentColors(){var a=!0;return x.shadow(this,"supportsDocumentColors",a)},get loadingBar(){var a=new F("#loadingBar",{});return x.shadow(this,"loadingBar",a)},get supportedMouseWheelZoomModifierKeys(){var a={ctrlKey:!0,metaKey:!0};return x.shadow(this,"supportedMouseWheelZoomModifierKeys",a)},setTitleUsingUrl:function(a){this.url=a;try{this.setTitle(decodeURIComponent(x.getFilenameFromUrl(a))||a)}catch(b){
// decodeURIComponent may throw URIError,
// fall back to using the unprocessed url in that case
this.setTitle(a)}},setTitle:function(a){this.isViewerEmbedded||(document.title=a)},/**
   * Closes opened PDF document.
   * @returns {Promise} - Returns the promise, which is resolved when all
   *                      destruction is completed.
   */
close:function(){var a=this.appConfig.errorWrapper.container;if(a.setAttribute("hidden","true"),!this.pdfLoadingTask)return Promise.resolve();var b=this.pdfLoadingTask.destroy();return this.pdfLoadingTask=null,this.pdfDocument&&(this.pdfDocument=null,this.pdfThumbnailViewer.setDocument(null),this.pdfViewer.setDocument(null),this.pdfLinkService.setDocument(null,null)),this.store=null,this.isInitialViewSet=!1,this.pdfSidebar.reset(),this.pdfOutlineViewer.reset(),this.pdfAttachmentViewer.reset(),this.findController.reset(),this.findBar.reset(),"undefined"!=typeof PDFBug&&PDFBug.cleanup(),b},/**
   * Opens PDF document specified by URL or array with additional arguments.
   * @param {string|TypedArray|ArrayBuffer} file - PDF location or binary data.
   * @param {Object} args - (optional) Additional arguments for the getDocument
   *                        call, e.g. HTTP headers ('httpHeaders') or
   *                        alternative data transport ('range').
   * @returns {Promise} - Returns the promise, which is resolved when document
   *                      is opened.
   */
open:function(a,b){var c=0;if((arguments.length>2||"number"==typeof b)&&(console.warn("Call of open() with obsolete signature."),"number"==typeof b&&(c=b),b=arguments[4]||null,arguments[3]&&"object"==typeof arguments[3]&&(b=Object.create(b),b.range=arguments[3]),"string"==typeof arguments[2]&&(b=Object.create(b),b.password=arguments[2])),this.pdfLoadingTask)
// We need to destroy already opened document.
return this.close().then(function(){
// ... and repeat the open() call.
// Reload the preferences if a document was previously opened.
return M.reload(),this.open(a,b)}.bind(this));var d=Object.create(null);if("string"==typeof a?(// URL
this.setTitleUsingUrl(a),d.url=a):a&&"byteLength"in a?// ArrayBuffer
d.data=a:a.url&&a.originalUrl&&(this.setTitleUsingUrl(a.originalUrl),d.url=a.url),b)for(var e in b)d[e]=b[e];var f=this;f.downloadComplete=!1;var g=x.getDocument(d);this.pdfLoadingTask=g,g.onPassword=function(a,b){f.passwordPrompt.setUpdateCallback(a,b),f.passwordPrompt.open()},g.onProgress=function(a){f.progress(a.loaded/a.total)},
// Listen for unsupported features to trigger the fallback UI.
g.onUnsupportedFeature=this.fallback.bind(this);var h=g.promise.then(function(a){f.load(a,c)},function(a){var b=a&&a.message,c=I.get("loading_error",null,"An error occurred while loading the PDF.");a instanceof x.InvalidPDFException?
// change error message also for other builds
c=I.get("invalid_file_error",null,"Invalid or corrupted PDF file."):a instanceof x.MissingPDFException?
// special message for missing PDF's
c=I.get("missing_file_error",null,"Missing PDF file."):a instanceof x.UnexpectedResponseException&&(c=I.get("unexpected_response_error",null,"Unexpected server response."));var d={message:b};throw f.error(c,d),new Error(c)});return b&&b.length&&la.pdfDocumentProperties.setFileSize(b.length),h},download:function(){function a(){d.downloadUrl(b,c)}var b=this.url.split("#")[0],c=G(b),d=new K;// the PDF is not ready yet
return d.onerror=function(a){la.error("PDF failed to download.")},this.pdfDocument&&this.downloadComplete?void this.pdfDocument.getData().then(function(a){var e=x.createBlob(a,"application/pdf");d.download(e,b,c)},a).then(null,a):void a()},fallback:function(a){},/**
   * Show the error box.
   * @param {String} message A message that is human readable.
   * @param {Object} moreInfo (optional) Further information about the error
   *                            that is more technical.  Should have a 'message'
   *                            and optionally a 'stack' property.
   */
error:function(a,b){var c=I.get("error_version_info",{version:x.version||"?",build:x.build||"?"},"PDF.js v{{version}} (build: {{build}})")+"\n";b&&(c+=I.get("error_message",{message:b.message},"Message: {{message}}"),b.stack?c+="\n"+I.get("error_stack",{stack:b.stack},"Stack: {{stack}}"):(b.filename&&(c+="\n"+I.get("error_file",{file:b.filename},"File: {{file}}")),b.lineNumber&&(c+="\n"+I.get("error_line",{line:b.lineNumber},"Line: {{line}}"))));var d=this.appConfig.errorWrapper,e=d.container;e.removeAttribute("hidden");var f=d.errorMessage;f.textContent=a;var g=d.closeButton;g.onclick=function(){e.setAttribute("hidden","true")};var h=d.errorMoreInfo,i=d.moreInfoButton,j=d.lessInfoButton;i.onclick=function(){h.removeAttribute("hidden"),i.setAttribute("hidden","true"),j.removeAttribute("hidden"),h.style.height=h.scrollHeight+"px"},j.onclick=function(){h.setAttribute("hidden","true"),i.removeAttribute("hidden"),j.setAttribute("hidden","true")},i.oncontextmenu=H,j.oncontextmenu=H,g.oncontextmenu=H,i.removeAttribute("hidden"),j.setAttribute("hidden","true"),h.value=c},progress:function(a){var b=Math.round(100*a);
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
x.PDFJS.disableAutoFetch&&b&&(this.disableAutoFetchLoadingBarTimeout&&(clearTimeout(this.disableAutoFetchLoadingBarTimeout),this.disableAutoFetchLoadingBarTimeout=null),this.loadingBar.show(),this.disableAutoFetchLoadingBarTimeout=setTimeout(function(){this.loadingBar.hide(),this.disableAutoFetchLoadingBarTimeout=null}.bind(this),ka)))},load:function(a,b){var c=this;b=b||D,this.pdfDocument=a,this.pdfDocumentProperties.setDocumentAndUrl(a,this.url);var d=a.getDownloadInfo().then(function(){c.downloadComplete=!0,c.loadingBar.hide()}),e=a.numPages,f=this.appConfig.toolbar;f.numPages.textContent=I.get("page_of",{pageCount:e},"of {{pageCount}}"),f.pageNumber.max=e;var g=this.documentFingerprint=a.fingerprint,h=this.store=new P(g),i=null;this.pdfLinkService.setDocument(a,i);var j=this.pdfViewer;j.currentScale=b,j.setDocument(a);var k=j.firstPagePromise,l=j.pagesPromise;j.onePageRendered;this.pageRotation=0,this.pdfThumbnailViewer.setDocument(a),k.then(function(a){d.then(function(){var a=document.createEvent("CustomEvent");a.initCustomEvent("documentload",!0,!0,{}),window.dispatchEvent(a)}),c.loadingBar.setWidth(c.appConfig.viewerContainer),x.PDFJS.disableHistory||c.isViewerEmbedded||(
// The browsing history is only enabled when the viewer is standalone,
// i.e. not when it is embedded in a web page.
c.preferenceShowPreviousViewOnLoad||c.pdfHistory.clearHistoryState(),c.pdfHistory.initialize(c.documentFingerprint),c.pdfHistory.initialDestination?c.initialDestination=c.pdfHistory.initialDestination:c.pdfHistory.initialBookmark&&(c.initialBookmark=c.pdfHistory.initialBookmark));var e={destination:c.initialDestination,bookmark:c.initialBookmark,hash:null};h.initializedPromise.then(function(){var a=null,d=null;if(c.preferenceShowPreviousViewOnLoad&&h.get("exists",!1)){var f=h.get("page","1"),g=c.preferenceDefaultZoomValue||h.get("zoom",E),i=h.get("scrollLeft","0"),j=h.get("scrollTop","0");a="page="+f+"&zoom="+g+","+i+","+j,d=h.get("sidebarView",N.NONE)}else c.preferenceDefaultZoomValue&&(a="page=1&zoom="+c.preferenceDefaultZoomValue);c.setInitialView(a,{scale:b,sidebarView:d}),e.hash=a,
// Make all navigation keys work on document load,
// unless the viewer is embedded in a web page.
c.isViewerEmbedded||c.pdfViewer.focus()},function(a){console.error(a),c.setInitialView(null,{scale:b})}),
// For documents with different page sizes,
// ensure that the correct location becomes visible on load.
l.then(function(){(e.destination||e.bookmark||e.hash)&&(c.hasEqualPageSizes||(c.initialDestination=e.destination,c.initialBookmark=e.bookmark,c.pdfViewer.currentScaleValue=c.pdfViewer.currentScaleValue,c.setInitialView(e.hash)))})}),l.then(function(){c.supportsPrinting&&a.getJavaScript().then(function(a){a.length&&(console.warn("Warning: JavaScript is not supported"),c.fallback(x.UNSUPPORTED_FEATURES.javaScript));for(var b=/\bprint\s*\(/,d=0,e=a.length;e>d;d++){var f=a[d];if(f&&b.test(f))return void setTimeout(function(){window.print()})}})});
// outline depends on pagesRefMap
var m=[l,this.animationStartedPromise];Promise.all(m).then(function(){a.getOutline().then(function(a){c.pdfOutlineViewer.render({outline:a})}),a.getAttachments().then(function(a){c.pdfAttachmentViewer.render({attachments:a})})}),a.getMetadata().then(function(b){var d=b.info,e=b.metadata;c.documentInfo=d,c.metadata=e,
// Provides some basic debug information
console.log("PDF "+a.fingerprint+" ["+d.PDFFormatVersion+" "+(d.Producer||"-").trim()+" / "+(d.Creator||"-").trim()+"] (PDF.js: "+(x.version||"-")+(x.PDFJS.disableWebGL?"":" [WebGL]")+")");var f;if(e&&e.has("dc:title")){var g=e.get("dc:title");
// Ghostscript sometimes return 'Untitled', sets the title to 'Untitled'
"Untitled"!==g&&(f=g)}!f&&d&&d.Title&&(f=d.Title),f&&c.setTitle(f+" - "+document.title),d.IsAcroFormPresent&&(console.warn("Warning: AcroForm/XFA is not supported"),c.fallback(x.UNSUPPORTED_FEATURES.forms))})},setInitialView:function(a,b){var c=b&&b.scale,d=b&&b.sidebarView;this.isInitialViewSet=!0,
// When opening a new file, when one is already loaded in the viewer,
// ensure that the 'pageNumber' element displays the correct value.
this.appConfig.toolbar.pageNumber.value=this.pdfViewer.currentPageNumber,this.pdfSidebar.setInitialView(this.preferenceSidebarViewOnLoad||0|d),this.initialDestination?(this.pdfLinkService.navigateTo(this.initialDestination),this.initialDestination=null):this.initialBookmark?(this.pdfLinkService.setHash(this.initialBookmark),this.pdfHistory.push({hash:this.initialBookmark},!0),this.initialBookmark=null):a?this.pdfLinkService.setHash(a):c&&(this.pdfViewer.currentScaleValue=c,this.page=1),this.pdfViewer.currentScaleValue||(
// Scale was not initialized: invalid bookmark or scale was not specified.
// Setting the default one.
this.pdfViewer.currentScaleValue=E)},cleanup:function(){this.pdfDocument&&(this.pdfViewer.cleanup(),this.pdfThumbnailViewer.cleanup(),this.pdfDocument.cleanup())},forceRendering:function(){this.pdfRenderingQueue.printing=this.printing,this.pdfRenderingQueue.isThumbnailViewEnabled=this.pdfSidebar.isThumbnailViewVisible,this.pdfRenderingQueue.renderHighestPriority()},beforePrint:function(){if(!this.supportsPrinting){var a=I.get("printing_not_supported",null,"Warning: Printing is not fully supported by this browser.");return void this.error(a)}var b,c,d=!1;if(this.pdfDocument&&this.pagesCount){for(b=0,c=this.pagesCount;c>b;++b)if(!this.pdfViewer.getPageView(b).pdfPage){d=!0;break}}else d=!0;if(d){var e=I.get("printing_not_ready",null,"Warning: The PDF is not fully loaded for printing.");return void window.alert(e)}this.printing=!0,this.forceRendering();var f=this.appConfig.printContainer,g=document.querySelector("body");g.setAttribute("data-mozPrintCallback",!0),this.hasEqualPageSizes||console.warn("Not all pages have the same size. The printed result may be incorrect!"),
// Insert a @page + size rule to make sure that the page size is correctly
// set. Note that we assume that all pages have the same size, because
// variable-size pages are not supported yet (at least in Chrome & Firefox).
// TODO(robwu): Use named pages when size calculation bugs get resolved
// (e.g. https://crbug.com/355116) AND when support for named pages is
// added (http://www.w3.org/TR/css3-page/#using-named-pages).
// In browsers where @page + size is not supported (such as Firefox,
// https://bugzil.la/851441), the next stylesheet will be ignored and the
// user has to select the correct paper size in the UI if wanted.
this.pageStyleSheet=document.createElement("style");var h=this.pdfViewer.getPageView(0).pdfPage.getViewport(1);for(this.pageStyleSheet.textContent="@supports ((size:A4) and (size:1pt 1pt)) {@page { size: "+h.width+"pt "+h.height+"pt;}}",g.appendChild(this.pageStyleSheet),b=0,c=this.pagesCount;c>b;++b)this.pdfViewer.getPageView(b).beforePrint(f)},
// Whether all pages of the PDF have the same width and height.
get hasEqualPageSizes(){for(var a=this.pdfViewer.getPageView(0),b=1,c=this.pagesCount;c>b;++b){var d=this.pdfViewer.getPageView(b);if(d.width!==a.width||d.height!==a.height)return!1}return!0},afterPrint:function(){for(var a=this.appConfig.printContainer;a.hasChildNodes();)a.removeChild(a.lastChild);this.pageStyleSheet&&this.pageStyleSheet.parentNode&&(this.pageStyleSheet.parentNode.removeChild(this.pageStyleSheet),this.pageStyleSheet=null),this.printing=!1,this.forceRendering()},rotatePages:function(a){var b=this.page;this.pageRotation=(this.pageRotation+360+a)%360,this.pdfViewer.pagesRotation=this.pageRotation,this.pdfThumbnailViewer.pagesRotation=this.pageRotation,this.forceRendering(),this.pdfViewer.scrollPageIntoView(b)},requestPresentationMode:function(){this.pdfPresentationMode&&this.pdfPresentationMode.request()},/**
   * @param {number} delta - The delta value from the mouse event.
   */
scrollPresentationMode:function(a){this.pdfPresentationMode&&this.pdfPresentationMode.mouseScroll(a)}},ma=["null","http://mozilla.github.io","https://mozilla.github.io"];document.addEventListener("pagerendered",function(a){var b=a.detail.pageNumber,c=b-1,d=la.pdfViewer.getPageView(c);
// Use the rendered page to set the corresponding thumbnail image.
if(la.pdfSidebar.isThumbnailViewVisible){var e=la.pdfThumbnailViewer.getThumbnail(c);e.setImage(d)}
// If the page is still visible when it has finished rendering,
// ensure that the page number input loading indicator is hidden.
if(x.PDFJS.pdfBug&&Stats.enabled&&d.stats&&Stats.add(b,d.stats),d.error&&la.error(I.get("rendering_error",null,"An error occurred while rendering the page."),d.error),b===la.page){var f=la.appConfig.toolbar.pageNumber;f.classList.remove(ja)}},!0),document.addEventListener("textlayerrendered",function(a){var b=a.detail.pageNumber-1;la.pdfViewer.getPageView(b)},!0),document.addEventListener("pagemode",function(a){if(la.initialized){
// Handle the 'pagemode' hash parameter, see also `PDFLinkService_setHash`.
var b,c=a.detail.mode;switch(c){case"thumbs":b=N.THUMBS;break;case"bookmarks":case"outline":b=N.OUTLINE;break;case"attachments":b=N.ATTACHMENTS;break;case"none":b=N.NONE;break;default:return void console.error('Invalid "pagemode" hash parameter: '+c)}la.pdfSidebar.switchView(b,/* forceOpen = */!0)}},!0),document.addEventListener("namedaction",function(a){if(la.initialized){
// Processing couple of named actions that might be useful.
// See also PDFLinkService.executeNamedAction
var b=a.detail.action;switch(b){case"GoToPage":la.appConfig.toolbar.pageNumber.focus();break;case"Find":la.supportsIntegratedFind||la.findBar.toggle()}}},!0),window.addEventListener("presentationmodechanged",function(a){var b=a.detail.active,c=a.detail.switchInProgress;la.pdfViewer.presentationModeState=c?W.CHANGING:b?W.FULLSCREEN:W.NORMAL}),window.addEventListener("sidebarviewchanged",function(a){if(la.initialized){la.pdfRenderingQueue.isThumbnailViewEnabled=la.pdfSidebar.isThumbnailViewVisible;var b=la.store;b&&la.isInitialViewSet&&b.initializedPromise.then(function(){b.set("sidebarView",a.detail.view)["catch"](function(){})})}},!0),window.addEventListener("updateviewarea",function(a){if(la.initialized){var b=a.location,c=la.store;c&&c.initializedPromise.then(function(){c.setMultiple({exists:!0,page:b.pageNumber,zoom:b.scale,scrollLeft:b.left,scrollTop:b.top})["catch"](function(){})});la.pdfLinkService.getAnchorUrl(b.pdfOpenParams);/*
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmark.href = href;
  */
// Update the current bookmark in the browsing history.
la.pdfHistory.updateCurrentBookmark(b.pdfOpenParams,b.pageNumber);
// Show/hide the loading indicator in the page number input element.
var d=la.appConfig.toolbar.pageNumber,e=la.pdfViewer.getPageView(la.page-1);e.renderingState===Y.FINISHED?d.classList.remove(ja):d.classList.add(ja)}},!0),window.addEventListener("resize",function(a){if(la.initialized){var b=la.pdfViewer.currentScaleValue;"auto"===b||"page-fit"===b||"page-width"===b?
// Note: the scale is constant for 'page-actual'.
la.pdfViewer.currentScaleValue=b:b||(
// Normally this shouldn't happen, but if the scale wasn't initialized
// we set it to the default value in order to prevent any issues.
// (E.g. the document being rendered with the wrong scale on load.)
la.pdfViewer.currentScaleValue=E),la.pdfViewer.update()}
// Set the 'max-height' CSS property of the secondary toolbar.
R.setMaxHeight(la.appConfig.mainContainer)}),window.addEventListener("hashchange",function(a){if(la.pdfHistory.isHashChangeUnlocked){var b=document.location.hash.substring(1);if(!b)return;la.isInitialViewSet?la.pdfLinkService.setHash(b):la.initialBookmark=b}}),window.addEventListener("change",function(a){var b=a.target.files;if(b&&0!==b.length){var c=b[0];if(!x.PDFJS.disableCreateObjectURL&&"undefined"!=typeof URL&&URL.createObjectURL)la.open(URL.createObjectURL(c));else{
// Read the local file into a Uint8Array.
var d=new FileReader;d.onload=function(a){var b=a.target.result,c=new Uint8Array(b);la.open(c)},d.readAsArrayBuffer(c)}la.setTitleUsingUrl(c.name);
// URL does not reflect proper document location - hiding some icons.
var e=la.appConfig;e.toolbar.viewBookmark.setAttribute("hidden","true"),e.secondaryToolbar.viewBookmark.setAttribute("hidden","true"),e.toolbar.download.setAttribute("hidden","true"),e.secondaryToolbar.download.setAttribute("hidden","true")}},!0),window.addEventListener("localized",function(a){document.getElementsByTagName("html")[0].dir=I.getDirection(),la.animationStartedPromise.then(function(){
// Adjust the width of the zoom box to fit the content.
// Note: If the window is narrow enough that the zoom box is not visible,
//       we temporarily show it to be able to adjust its width.
var a=la.appConfig.toolbar.scaleSelectContainer;if(0===a.clientWidth&&a.setAttribute("style","display: inherit;"),a.clientWidth>0){var b=la.appConfig.toolbar.scaleSelect;b.setAttribute("style","min-width: inherit;");var c=b.clientWidth+ha;b.setAttribute("style","min-width: "+(c+ia)+"px;"),a.setAttribute("style","min-width: "+c+"px; max-width: "+c+"px;")}
// Set the 'max-height' CSS property of the secondary toolbar.
R.setMaxHeight(la.appConfig.mainContainer)})},!0),window.addEventListener("scalechange",function(a){var b=la.appConfig;b.toolbar.zoomOut.disabled=a.scale===fa,b.toolbar.zoomIn.disabled=a.scale===ga;
// Update the 'scaleSelect' DOM element.
var c=B(a.presetValue||""+a.scale);if(!c){var d=b.toolbar.customScaleOption,e=Math.round(1e4*a.scale)/100;d.textContent=I.get("page_scale_percent",{scale:e},"{{scale}}%"),d.selected=!0}la.initialized&&la.pdfViewer.update()},!0),window.addEventListener("pagechange",function(a){var b=a.pageNumber;a.previousPageNumber!==b&&(la.appConfig.toolbar.pageNumber.value=b,la.pdfSidebar.isThumbnailViewVisible&&la.pdfThumbnailViewer.scrollThumbnailIntoView(b));var c=la.pagesCount;
// we need to update stats
if(la.appConfig.toolbar.previous.disabled=1>=b,la.appConfig.toolbar.next.disabled=b>=c,la.appConfig.toolbar.firstPage.disabled=1>=b,la.appConfig.toolbar.lastPage.disabled=b>=c,x.PDFJS.pdfBug&&Stats.enabled){var d=la.pdfViewer.getPageView(b-1);d.stats&&Stats.add(b,d.stats)}},!0);var na,oa=!1;window.addEventListener("DOMMouseScroll",C),window.addEventListener("mousewheel",C),window.addEventListener("click",function(a){R.opened&&la.pdfViewer.containsElement(a.target)&&R.close()},!1),window.addEventListener("keydown",function(a){if(!aa.active){var b=!1,c=(a.ctrlKey?1:0)|(a.altKey?2:0)|(a.shiftKey?4:0)|(a.metaKey?8:0),d=la.pdfViewer,e=d&&d.isInPresentationMode;
// First, handle the key bindings that are independent whether an input
// control is selected or not.
if(1===c||8===c||5===c||12===c)
// either CTRL or META key with optional SHIFT.
switch(a.keyCode){case 70:// f
la.supportsIntegratedFind||(la.findBar.open(),b=!0);break;case 71:// g
la.supportsIntegratedFind||(la.findBar.dispatchEvent("again",5===c||12===c),b=!0);break;case 61:// FF/Mac '='
case 107:// FF '+' and '='
case 187:// Chrome '+'
case 171:// FF with German keyboard
e||la.zoomIn(),b=!0;break;case 173:// FF/Mac '-'
case 109:// FF '-'
case 189:// Chrome '-'
e||la.zoomOut(),b=!0;break;case 48:// '0'
case 96:// '0' on Numpad of Swedish keyboard
e||(
// keeping it unhandled (to restore page zoom to 100%)
setTimeout(function(){
// ... and resetting the scale after browser adjusts its scale
d.currentScaleValue=E}),b=!1)}
// CTRL or META without shift
if(1===c||8===c)switch(a.keyCode){case 83:// s
la.download(),b=!0}
// CTRL+ALT or Option+Command
if(3===c||10===c)switch(a.keyCode){case 80:// p
la.requestPresentationMode(),b=!0;break;case 71:// g
// focuses input#pageNumber field
la.appConfig.toolbar.pageNumber.select(),b=!0}if(b)return void a.preventDefault();
// Some shortcuts should not get handled if a control/input element
// is selected.
var f=document.activeElement||document.querySelector(":focus"),g=f&&f.tagName.toUpperCase();if("INPUT"!==g&&"TEXTAREA"!==g&&"SELECT"!==g||27===a.keyCode){var h=!1;if(0===c)// no control key pressed at all.
switch(a.keyCode){case 38:// up arrow
case 33:// pg up
case 8:// backspace
if(!e&&"page-fit"!==d.currentScaleValue)break;/* in presentation mode */
/* falls through */
case 37:// left arrow
// horizontal scrolling using arrow keys
if(d.isHorizontalScrollbarEnabled)break;/* falls through */
case 75:// 'k'
case 80:// 'p'
la.page--,b=!0;break;case 27:// esc key
R.opened&&(R.close(),b=!0),!la.supportsIntegratedFind&&la.findBar.opened&&(la.findBar.close(),b=!0);break;case 40:// down arrow
case 34:// pg down
case 32:// spacebar
if(!e&&"page-fit"!==d.currentScaleValue)break;/* falls through */
case 39:// right arrow
// horizontal scrolling using arrow keys
if(d.isHorizontalScrollbarEnabled)break;/* falls through */
case 74:// 'j'
case 78:// 'n'
la.page++,b=!0;break;case 36:// home
(e||la.page>1)&&(la.page=1,b=!0,h=!0);break;case 35:// end
(e||la.pdfDocument&&la.page<la.pagesCount)&&(la.page=la.pagesCount,b=!0,h=!0);break;case 72:// 'h'
e||la.handTool.toggle();break;case 82:// 'r'
la.rotatePages(90)}if(4===c)// shift-key
switch(a.keyCode){case 32:// spacebar
if(!e&&"page-fit"!==d.currentScaleValue)break;la.page--,b=!0;break;case 82:// 'r'
la.rotatePages(-90)}if(b||e||(a.keyCode>=33&&a.keyCode<=40||32===a.keyCode&&"BUTTON"!==g)&&(h=!0),2===c)// alt-key
switch(a.keyCode){case 37:// left arrow
e&&(la.pdfHistory.back(),b=!0);break;case 39:// right arrow
e&&(la.pdfHistory.forward(),b=!0)}h&&!d.containsElement(f)&&
// The page container is not focused, but a page navigation key has been
// pressed. Change the focus to the viewer container to make sure that
// navigation by keyboard works as expected.
d.focus(),b&&a.preventDefault()}}}),window.addEventListener("beforeprint",function(a){la.beforePrint()}),window.addEventListener("afterprint",function(a){la.afterPrint()}),function(){
// The offsetParent is not set until the pdf.js iframe or object is visible.
// Waiting for first animation.
la.animationStartedPromise=new Promise(function(a){window.requestAnimationFrame(a)})}(),a.PDFViewerApplication=la,
// TODO remove circular reference of pdfjs-web/secondary_toolbar on app.
j._setApp(a)})}).call(pdfjsWebLibs),document.addEventListener("DOMContentLoaded",webViewerLoad,!0);