/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?
// For CommonJS and CommonJS-like environments where a proper window is present,
// execute the factory and get jQuery
// For environments that do not inherently posses a window with a document
// (such as Node.js), expose a jQuery-making factory as module.exports
// This accentuates the need for the creation of a real window
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info
module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){function c(a){var b=a.length,c=ea.type(a);return"function"===c||ea.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}
// Implement the identical functionality for filter and not
function d(a,b,c){if(ea.isFunction(b))return ea.grep(a,function(a,d){/* jshint -W018 */
return!!b.call(a,d,a)!==c});if(b.nodeType)return ea.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(ma.test(b))return ea.filter(b,a,c);b=ea.filter(b,a)}return ea.grep(a,function(a){return ea.inArray(a,b)>=0!==c})}function e(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}
// Convert String-formatted options into Object-formatted ones and store in cache
function f(a){var b=ua[a]={};return ea.each(a.match(ta)||[],function(a,c){b[c]=!0}),b}/**
 * Clean-up method for dom ready events
 */
function g(){oa.addEventListener?(oa.removeEventListener("DOMContentLoaded",h,!1),a.removeEventListener("load",h,!1)):(oa.detachEvent("onreadystatechange",h),a.detachEvent("onload",h))}/**
 * The ready event handler and self cleanup method
 */
function h(){
// readyState === "complete" is good enough for us to call the dom ready in oldIE
(oa.addEventListener||"load"===event.type||"complete"===oa.readyState)&&(g(),ea.ready())}function i(a,b,c){
// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(za,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:
// Only convert to a number if it doesn't change the string
+c+""===c?+c:ya.test(c)?ea.parseJSON(c):c}catch(e){}
// Make sure we set the data so it isn't changed later
ea.data(a,b,c)}else c=void 0}return c}
// checks a cache object for emptiness
function j(a){var b;for(b in a)
// if the public data object is empty, the private is still empty
if(("data"!==b||!ea.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function k(a,b,c,d){if(ea.acceptData(a)){var e,f,g=ea.expando,
// We have to handle DOM nodes and JS objects differently because IE6-7
// can't GC object references properly across the DOM-JS boundary
h=a.nodeType,
// Only DOM nodes need the global jQuery cache; JS object data is
// attached directly to the object so GC can occur automatically
i=h?ea.cache:a,
// Only defining an ID for JS objects if its cache already exists allows
// the code to shortcut on the same path as a DOM node with no cache
j=h?a[g]:a[g]&&g;
// Avoid doing any more work than we need to when trying to get data on an
// object that has no data at all
if(j&&i[j]&&(d||i[j].data)||void 0!==c||"string"!=typeof b)
// Only DOM nodes need a new unique ID for each element since their data
// ends up in the global cache
// Avoid exposing jQuery metadata on plain JS objects when the object
// is serialized using JSON.stringify
// An object can be passed to jQuery.data instead of a key/value pair; this gets
// shallow copied over onto the existing cache
// jQuery data() is stored in a separate object inside the object's internal data
// cache in order to avoid key collisions between internal data and user-defined
// data.
// Check for both converted-to-camel and non-converted data property names
// If a data property was specified
// First Try to find as-is property data
// Test for null|undefined property data
// Try to find the camelCased property
return j||(j=h?a[g]=W.pop()||ea.guid++:g),i[j]||(i[j]=h?{}:{toJSON:ea.noop}),("object"==typeof b||"function"==typeof b)&&(d?i[j]=ea.extend(i[j],b):i[j].data=ea.extend(i[j].data,b)),f=i[j],d||(f.data||(f.data={}),f=f.data),void 0!==c&&(f[ea.camelCase(b)]=c),"string"==typeof b?(e=f[b],null==e&&(e=f[ea.camelCase(b)])):e=f,e}}function l(a,b,c){if(ea.acceptData(a)){var d,e,f=a.nodeType,
// See jQuery.data for more information
g=f?ea.cache:a,h=f?a[ea.expando]:ea.expando;
// If there is already no cache entry for this object, there is no
// purpose in continuing
if(g[h]){if(b&&(d=c?g[h]:g[h].data)){
// Support array or space separated string names for data keys
ea.isArray(b)?
// If "name" is an array of keys...
// When data is initially created, via ("key", "val") signature,
// keys will be converted to camelCase.
// Since there is no way to tell _how_ a key was added, remove
// both plain key and camelCase key. #12786
// This will only penalize the array argument path.
b=b.concat(ea.map(b,ea.camelCase)):
// try the string as a key before any manipulation
b in d?b=[b]:(
// split the camel cased version by spaces unless a key with the spaces exists
b=ea.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;for(;e--;)delete d[b[e]];
// If there is no data left in the cache, we want to continue
// and let the cache object itself get destroyed
if(c?!j(d):!ea.isEmptyObject(d))return}
// See jQuery.data for more information
(c||(delete g[h].data,j(g[h])))&&(
// Destroy the cache
f?ea.cleanData([a],!0):ca.deleteExpando||g!=g.window?/* jshint eqeqeq: true */
delete g[h]:g[h]=null)}}}function m(){return!0}function n(){return!1}function o(){try{return oa.activeElement}catch(a){}}function p(a){var b=Ka.split("|"),c=a.createDocumentFragment();if(c.createElement)for(;b.length;)c.createElement(b.pop());return c}function q(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==xa?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==xa?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||ea.nodeName(d,b)?f.push(d):ea.merge(f,q(d,b));return void 0===b||b&&ea.nodeName(a,b)?ea.merge([a],f):f}
// Used in buildFragment, fixes the defaultChecked property
function r(a){Ea.test(a.type)&&(a.defaultChecked=a.checked)}
// Support: IE<8
// Manipulating tables requires a tbody
function s(a,b){return ea.nodeName(a,"table")&&ea.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}
// Replace/restore the type attribute of script elements for safe DOM manipulation
function t(a){return a.type=(null!==ea.find.attr(a,"type"))+"/"+a.type,a}function u(a){var b=Va.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}
// Mark scripts as having already been evaluated
function v(a,b){for(var c,d=0;null!=(c=a[d]);d++)ea._data(c,"globalEval",!b||ea._data(b[d],"globalEval"))}function w(a,b){if(1===b.nodeType&&ea.hasData(a)){var c,d,e,f=ea._data(a),g=ea._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)ea.event.add(b,c,h[c][d])}
// make the cloned public data object a copy from the original
g.data&&(g.data=ea.extend({},g.data))}}function x(a,b){var c,d,e;
// We do not need to do anything for non-Elements
if(1===b.nodeType){
// IE6-8 copies events bound via attachEvent when using cloneNode.
if(c=b.nodeName.toLowerCase(),!ca.noCloneEvent&&b[ea.expando]){e=ea._data(b);for(d in e.events)ea.removeEvent(b,d,e.handle);
// Event data gets referenced instead of copied if the expando gets copied too
b.removeAttribute(ea.expando)}
// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
"script"===c&&b.text!==a.text?(t(b).text=a.text,u(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),
// This path appears unavoidable for IE9. When cloning an object
// element in IE9, the outerHTML strategy above is not sufficient.
// If the src has innerHTML and the destination does not,
// copy the src.innerHTML into the dest.innerHTML. #10324
ca.html5Clone&&a.innerHTML&&!ea.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Ea.test(a.type)?(
// IE6-8 fails to persist the checked state of a cloned checkbox
// or radio button. Worse, IE6-7 fail to give the cloned element
// a checked appearance if the defaultChecked value isn't also set
b.defaultChecked=b.checked=a.checked,
// IE6-7 get confused and end up setting the value of a cloned
// checkbox/radio button to an empty string instead of "on"
b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function y(b,c){var d,e=ea(c.createElement(b)).appendTo(c.body),
// getDefaultComputedStyle might be reliably used only on attached element
f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?
// Use of this method is a temporary fix (more like optmization) until something better comes along,
// since it was removed from specification and supported only in FF
d.display:ea.css(e[0],"display");
// We don't have any data stored on the element,
// so use "detach" method as fast way to get rid of the element
return e.detach(),f}/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function z(a){var b=oa,c=_a[a];
// If the simple way fails, read from inside an iframe
// Use the already-created iframe if possible
// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
// Support: IE
// Store the correct default display
return c||(c=y(a,b),"none"!==c&&c||($a=($a||ea("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=($a[0].contentWindow||$a[0].contentDocument).document,b.write(),b.close(),c=y(a,b),$a.detach()),_a[a]=c),c}function A(a,b){
// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){var c=a();if(null!=c)
// Hook not needed (or it's not possible to use it due to missing dependency),
// remove it.
// Since there are no other hooks for marginRight, remove the whole object.
return c?void delete this.get:(this.get=b).apply(this,arguments)}}}
// return a css property mapped to a potentially vendor prefixed property
function B(a,b){
// shortcut for names that are not vendor prefixed
if(b in a)return b;for(
// check for vendor prefixed names
var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=mb.length;e--;)if(b=mb[e]+c,b in a)return b;return d}function C(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=ea._data(d,"olddisplay"),c=d.style.display,b?(
// Reset the inline display of this element to learn if it is
// being hidden by cascaded rules or not
f[g]||"none"!==c||(d.style.display=""),
// Set elements which have been overridden with display: none
// in a stylesheet to whatever the default browser style is
// for such an element
""===d.style.display&&Ca(d)&&(f[g]=ea._data(d,"olddisplay",z(d.nodeName)))):(e=Ca(d),(c&&"none"!==c||!e)&&ea._data(d,"olddisplay",e?c:ea.css(d,"display"))));
// Set the display of most of the elements in a second loop
// to avoid the constant reflow
for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function D(a,b,c){var d=ib.exec(b);
// Guard against undefined "subtract", e.g., when used as in cssHooks
return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function E(a,b,c,d,e){for(var f=c===(d?"border":"content")?
// If we already have the right measurement, avoid augmentation
4:
// Otherwise initialize for horizontal or vertical properties
"width"===b?1:0,g=0;4>f;f+=2)
// both box models exclude margin, so add it if we want it
"margin"===c&&(g+=ea.css(a,c+Ba[f],!0,e)),d?(
// border-box includes padding, so remove it if we want content
"content"===c&&(g-=ea.css(a,"padding"+Ba[f],!0,e)),
// at this point, extra isn't border nor margin, so remove border
"margin"!==c&&(g-=ea.css(a,"border"+Ba[f]+"Width",!0,e))):(
// at this point, extra isn't content, so add padding
g+=ea.css(a,"padding"+Ba[f],!0,e),
// at this point, extra isn't content nor padding, so add border
"padding"!==c&&(g+=ea.css(a,"border"+Ba[f]+"Width",!0,e)));return g}function F(a,b,c){
// Start with offset property, which is equivalent to the border-box value
var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=ab(a),g=ca.boxSizing&&"border-box"===ea.css(a,"boxSizing",!1,f);
// some non-html elements return undefined for offsetWidth, so check for null/undefined
// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
if(0>=e||null==e){
// Computed unit is not pixels. Stop here and return.
if(
// Fall back to computed then uncomputed css if necessary
e=bb(a,b,f),(0>e||null==e)&&(e=a.style[b]),db.test(e))return e;
// we need the check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
d=g&&(ca.boxSizingReliable()||e===a.style[b]),
// Normalize "", auto, and prepare for extra
e=parseFloat(e)||0}
// use the active box-sizing model to add/subtract irrelevant styles
return e+E(a,b,c||(g?"border":"content"),d,f)+"px"}function G(a,b,c,d,e){return new G.prototype.init(a,b,c,d,e)}
// Animations created synchronously will run synchronously
function H(){return setTimeout(function(){nb=void 0}),nb=ea.now()}
// Generate parameters to create a standard animation
function I(a,b){var c,d={height:a},e=0;for(
// if we include width, step value is 1 to do all cssExpand values,
// if we don't include width, step value is 2 to skip over Left and Right
b=b?1:0;4>e;e+=2-b)c=Ba[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function J(a,b,c){for(var d,e=(tb[b]||[]).concat(tb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))
// we're done with this property
return d}function K(a,b,c){/* jshint validthis: true */
var d,e,f,g,h,i,j,k,l=this,m={},n=a.style,o=a.nodeType&&Ca(a),p=ea._data(a,"fxshow");
// handle queue: false promises
c.queue||(h=ea._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){
// doing this makes sure that the complete handler will be called
// before this completes
l.always(function(){h.unqueued--,ea.queue(a,"fx").length||h.empty.fire()})})),
// height/width overflow pass
1===a.nodeType&&("height"in b||"width"in b)&&(
// Make sure that nothing sneaks out
// Record all 3 overflow attributes because IE does not
// change the overflow attribute when overflowX and
// overflowY are set to the same value
c.overflow=[n.overflow,n.overflowX,n.overflowY],
// Set display property to inline-block for height/width
// animations on inline elements that are having width/height animated
j=ea.css(a,"display"),
// Test default display if display is currently "none"
k="none"===j?ea._data(a,"olddisplay")||z(a.nodeName):j,"inline"===k&&"none"===ea.css(a,"float")&&(
// inline-level elements accept inline-block;
// block-level elements need to be inline with layout
ca.inlineBlockNeedsLayout&&"inline"!==z(a.nodeName)?n.zoom=1:n.display="inline-block")),c.overflow&&(n.overflow="hidden",ca.shrinkWrapBlocks()||l.always(function(){n.overflow=c.overflow[0],n.overflowX=c.overflow[1],n.overflowY=c.overflow[2]}));
// show/hide pass
for(d in b)if(e=b[d],pb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(o?"hide":"show")){
// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
if("show"!==e||!p||void 0===p[d])continue;o=!0}m[d]=p&&p[d]||ea.style(a,d)}else j=void 0;if(ea.isEmptyObject(m))"inline"===("none"===j?z(a.nodeName):j)&&(n.display=j);else{p?"hidden"in p&&(o=p.hidden):p=ea._data(a,"fxshow",{}),
// store state if its toggle - enables .stop().toggle() to "reverse"
f&&(p.hidden=!o),o?ea(a).show():l.done(function(){ea(a).hide()}),l.done(function(){var b;ea._removeData(a,"fxshow");for(b in m)ea.style(a,b,m[b])});for(d in m)g=J(o?p[d]:0,d,l),d in p||(p[d]=g.start,o&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function L(a,b){var c,d,e,f,g;
// camelCase, specialEasing and expand cssHook pass
for(c in a)if(d=ea.camelCase(c),e=b[d],f=a[c],ea.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=ea.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];
// not quite $.extend, this wont overwrite keys already present.
// also - reusing 'index' from above because we have the correct "name"
for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function M(a,b,c){var d,e,f=0,g=sb.length,h=ea.Deferred().always(function(){
// don't match elem in the :animated selector
delete i.elem}),i=function(){if(e)return!1;for(var b=nb||H(),c=Math.max(0,j.startTime+j.duration-b),
// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:ea.extend({},b),opts:ea.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:nb||H(),duration:c.duration,tweens:[],createTween:function(b,c){var d=ea.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,
// if we are going to the end, we want to run all the tweens
// otherwise we skip this part
d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);
// resolve when we played the last frame
// otherwise, reject
return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(L(k,j.opts.specialEasing);g>f;f++)if(d=sb[f].call(j,a,k,j.opts))return d;
// attach callbacks from options
return ea.map(k,J,j),ea.isFunction(j.opts.start)&&j.opts.start.call(a,j),ea.fx.timer(ea.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}
// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function N(a){
// dataTypeExpression is optional and defaults to "*"
return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(ta)||[];if(ea.isFunction(c))
// For each dataType in the dataTypeExpression
for(;d=f[e++];)
// Prepend if requested
"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}
// Base inspection function for prefilters and transports
function O(a,b,c,d){function e(h){var i;return f[h]=!0,ea.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||g||f[j]?g?!(i=j):void 0:(b.dataTypes.unshift(j),e(j),!1)}),i}var f={},g=a===Rb;return e(b.dataTypes[0])||!f["*"]&&e("*")}
// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function P(a,b){var c,d,e=ea.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&ea.extend(!0,a,c),a}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function Q(a,b,c){
// Remove auto dataType and get content-type in the process
for(var d,e,f,g,h=a.contents,i=a.dataTypes;"*"===i[0];)i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));
// Check if we're dealing with a known content-type
if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}
// Check to see if we have a response for the expected dataType
if(i[0]in c)f=i[0];else{
// Try convertible dataTypes
for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}
// Or just use first one
f=f||d}
// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function R(a,b,c,d){var e,f,g,h,i,j={},
// Work with a copy of dataTypes in case we need to modify it for conversion
k=a.dataTypes.slice();
// Create converters map with lowercased keys
if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];
// Convert to each sequential dataType
for(f=k.shift();f;)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),
// Apply the dataFilter if provided
!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())
// There's only work to do if current dataType is non-auto
if("*"===f)f=i;else if("*"!==i&&i!==f){
// If none found, seek a pair
if(
// Seek a direct converter
g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(
// If conv2 outputs current
h=e.split(" "),h[1]===f&&(
// If prev can be converted to accepted input
g=j[i+" "+h[0]]||j["* "+h[0]])){
// Condense equivalence converters
g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}
// Apply converter (if not an equivalence)
if(g!==!0)
// Unless errors are allowed to bubble, catch and return them
if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}function S(a,b,c,d){var e;if(ea.isArray(b))
// Serialize array item.
ea.each(b,function(b,e){c||Vb.test(a)?
// Treat each array item as a scalar.
d(a,e):
// Item is non-scalar (array or object), encode its numeric index.
S(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==ea.type(b))
// Serialize scalar item.
d(a,b);else
// Serialize object item.
for(e in b)S(a+"["+e+"]",b[e],c,d)}
// Functions to create xhrs
function T(){try{return new a.XMLHttpRequest}catch(b){}}function U(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}/**
 * Gets a window from an element
 */
function V(a){return ea.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}
// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//
var W=[],X=W.slice,Y=W.concat,Z=W.push,$=W.indexOf,_={},aa=_.toString,ba=_.hasOwnProperty,ca={},da="1.11.2",
// Define a local copy of jQuery
ea=function(a,b){
// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new ea.fn.init(a,b)},
// Support: Android<4.1, IE<9
// Make sure we trim BOM and NBSP
fa=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
// Matches dashed string for camelizing
ga=/^-ms-/,ha=/-([\da-z])/gi,
// Used by jQuery.camelCase as callback to replace()
ia=function(a,b){return b.toUpperCase()};ea.fn=ea.prototype={
// The current version of jQuery being used
jquery:da,constructor:ea,
// Start with an empty selector
selector:"",
// The default length of a jQuery object is 0
length:0,toArray:function(){return X.call(this)},
// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(a){
// Return just the one element from the set
// Return all the elements in a clean array
return null!=a?0>a?this[a+this.length]:this[a]:X.call(this)},
// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(a){
// Build a new jQuery matched element set
var b=ea.merge(this.constructor(),a);
// Return the newly-formed element set
// Add the old object onto the stack (as a reference)
return b.prevObject=this,b.context=this.context,b},
// Execute a callback for every element in the matched set.
// (You can seed the arguments with an array of args, but this is
// only used internally.)
each:function(a,b){return ea.each(this,a,b)},map:function(a){return this.pushStack(ea.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(X.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},
// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:Z,sort:W.sort,splice:W.splice},ea.extend=ea.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for(
// Handle a deep copy situation
"boolean"==typeof g&&(j=g,
// skip the boolean and the target
g=arguments[h]||{},h++),
// Handle case when target is a string or something (possible in deep copy)
"object"==typeof g||ea.isFunction(g)||(g={}),
// extend jQuery itself if only one argument is passed
h===i&&(g=this,h--);i>h;h++)
// Only deal with non-null/undefined values
if(null!=(e=arguments[h]))
// Extend the base object
for(d in e)a=g[d],c=e[d],
// Prevent never-ending loop
g!==c&&(
// Recurse if we're merging plain objects or arrays
j&&c&&(ea.isPlainObject(c)||(b=ea.isArray(c)))?(b?(b=!1,f=a&&ea.isArray(a)?a:[]):f=a&&ea.isPlainObject(a)?a:{},
// Never move original objects, clone them
g[d]=ea.extend(j,f,c)):void 0!==c&&(g[d]=c));
// Return the modified object
return g},ea.extend({
// Unique for each copy of jQuery on the page
expando:"jQuery"+(da+Math.random()).replace(/\D/g,""),
// Assume jQuery is ready without the ready module
isReady:!0,error:function(a){throw new Error(a)},noop:function(){},
// See test/unit/core.js for details concerning isFunction.
// Since version 1.3, DOM methods and functions like alert
// aren't supported. They return false on IE (#2968).
isFunction:function(a){return"function"===ea.type(a)},isArray:Array.isArray||function(a){return"array"===ea.type(a)},isWindow:function(a){/* jshint eqeqeq: false */
return null!=a&&a==a.window},isNumeric:function(a){
// parseFloat NaNs numeric-cast false positives (null|true|false|"")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
// adding 1 corrects loss of precision from parseFloat (#15100)
return!ea.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;
// Must be an Object.
// Because of IE, we also have to check the presence of the constructor property.
// Make sure that DOM nodes and window objects don't pass through, as well
if(!a||"object"!==ea.type(a)||a.nodeType||ea.isWindow(a))return!1;try{
// Not own constructor property must be Object
if(a.constructor&&!ba.call(a,"constructor")&&!ba.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){
// IE8,9 Will throw exceptions on certain host objects #9897
return!1}
// Support: IE<9
// Handle iteration over inherited properties before own properties.
if(ca.ownLast)for(b in a)return ba.call(a,b);
// Own properties are enumerated firstly, so to speed up,
// if last one is own, then all properties are own.
for(b in a);return void 0===b||ba.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?_[aa.call(a)]||"object":typeof a},
// Evaluates a script in a global context
// Workarounds based on findings by Jim Driscoll
// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
globalEval:function(b){b&&ea.trim(b)&&
// We use execScript on Internet Explorer
// We use an anonymous function so that context is window
// rather than jQuery in Firefox
(a.execScript||function(b){a.eval.call(a,b)})(b)},
// Convert dashed to camelCase; used by the css and data modules
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function(a){return a.replace(ga,"ms-").replace(ha,ia)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},
// args is for internal usage only
each:function(a,b,d){var e,f=0,g=a.length,h=c(a);if(d){if(h)for(;g>f&&(e=b.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=b.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=b.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=b.call(a[f],f,a[f]),e===!1)break;return a},
// Support: Android<4.1, IE<9
trim:function(a){return null==a?"":(a+"").replace(fa,"")},
// results is for internal usage only
makeArray:function(a,b){var d=b||[];return null!=a&&(c(Object(a))?ea.merge(d,"string"==typeof a?[a]:a):Z.call(d,a)),d},inArray:function(a,b,c){var d;if(b){if($)return $.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)
// Skip accessing in sparse arrays
if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;)a[e++]=b[d++];
// Support: IE<9
// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){
// Go through the array, only saving the items
// that pass the validator function
for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},
// arg is for internal usage only
map:function(a,b,d){var e,f=0,g=a.length,h=c(a),i=[];
// Go through the array, translating each of the items to their new values
if(h)for(;g>f;f++)e=b(a[f],f,d),null!=e&&i.push(e);else for(f in a)e=b(a[f],f,d),null!=e&&i.push(e);
// Flatten any nested arrays
return Y.apply([],i)},
// A global GUID counter for objects
guid:1,
// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function(a,b){var c,d,e;
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
// Simulated bind
// Set the guid of unique handler to the same of original handler, so it can be removed
return"string"==typeof b&&(e=a[b],b=a,a=e),ea.isFunction(a)?(c=X.call(arguments,2),d=function(){return a.apply(b||this,c.concat(X.call(arguments)))},d.guid=a.guid=a.guid||ea.guid++,d):void 0},now:function(){return+new Date},
// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:ca}),
// Populate the class2type map
ea.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){_["[object "+b+"]"]=b.toLowerCase()});var ja=/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
function(a){function b(a,b,c,d){var e,f,g,h,
// QSA vars
i,j,l,n,o,p;if((b?b.ownerDocument||b:O)!==G&&F(b),b=b||G,c=c||[],h=b.nodeType,"string"!=typeof a||!a||1!==h&&9!==h&&11!==h)return c;if(!d&&I){
// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
if(11!==h&&(e=sa.exec(a)))
// Speed-up: Sizzle("#ID")
if(g=e[1]){if(9===h){
// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document (jQuery #6963)
if(f=b.getElementById(g),!f||!f.parentNode)return c;
// Handle the case where IE, Opera, and Webkit return items
// by name instead of ID
if(f.id===g)return c.push(f),c}else
// Context is not a document
if(b.ownerDocument&&(f=b.ownerDocument.getElementById(g))&&M(b,f)&&f.id===g)return c.push(f),c}else{if(e[2])return $.apply(c,b.getElementsByTagName(a)),c;if((g=e[3])&&v.getElementsByClassName)return $.apply(c,b.getElementsByClassName(g)),c}
// QSA path
if(v.qsa&&(!J||!J.test(a))){
// qSA works strangely on Element-rooted queries
// We can work around this by specifying an extra ID on the root
// and working up from there (Thanks to Andrew Dupont for the technique)
// IE 8 doesn't work on object elements
if(n=l=N,o=b,p=1!==h&&a,1===h&&"object"!==b.nodeName.toLowerCase()){for(j=z(a),(l=b.getAttribute("id"))?n=l.replace(ua,"\\$&"):b.setAttribute("id",n),n="[id='"+n+"'] ",i=j.length;i--;)j[i]=n+m(j[i]);o=ta.test(a)&&k(b.parentNode)||b,p=j.join(",")}if(p)try{return $.apply(c,o.querySelectorAll(p)),c}catch(q){}finally{l||b.removeAttribute("id")}}}
// All others
return B(a.replace(ia,"$1"),b,c,d)}/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function c(){function a(c,d){
// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
// Only keep the most recent entries
return b.push(c+" ")>w.cacheLength&&delete a[b.shift()],a[c+" "]=d}var b=[];return a}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function d(a){return a[N]=!0,a}/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function e(a){var b=G.createElement("div");try{return!!a(b)}catch(c){return!1}finally{
// Remove from its parent by default
b.parentNode&&b.parentNode.removeChild(b),
// release memory in IE
b=null}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function f(a,b){for(var c=a.split("|"),d=a.length;d--;)w.attrHandle[c[d]]=b}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function g(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||V)-(~a.sourceIndex||V);
// Use IE sourceIndex if available on both nodes
if(d)return d;
// Check if b follows a
if(c)for(;c=c.nextSibling;)if(c===b)return-1;return a?1:-1}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function h(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function i(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function j(a){return d(function(b){return b=+b,d(function(c,d){
// Match elements found at the specified indexes
for(var e,f=a([],c.length,b),g=f.length;g--;)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function k(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}
// Easy API for creating new setFilters
function l(){}function m(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function n(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=Q++;
// Check against closest ancestor/preceding element
// Check against all ancestor/preceding elements
return b.first?function(b,c,f){for(;b=b[d];)if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[P,f];
// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
if(g){for(;b=b[d];)if((1===b.nodeType||e)&&a(b,c,g))return!0}else for(;b=b[d];)if(1===b.nodeType||e){if(i=b[N]||(b[N]={}),(h=i[d])&&h[0]===P&&h[1]===f)
// Assign to newCache so results back-propagate to previous elements
return j[2]=h[2];
// A match means we're done; a fail means we have to keep checking
if(
// Reuse newcache so results back-propagate to previous elements
i[d]=j,j[2]=a(b,c,g))return!0}}}function o(a){return a.length>1?function(b,c,d){for(var e=a.length;e--;)if(!a[e](b,c,d))return!1;return!0}:a[0]}function p(a,c,d){for(var e=0,f=c.length;f>e;e++)b(a,c[e],d);return d}function q(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function r(a,b,c,e,f,g){return e&&!e[N]&&(e=r(e)),f&&!f[N]&&(f=r(f,g)),d(function(d,g,h,i){var j,k,l,m=[],n=[],o=g.length,
// Get initial elements from seed or context
r=d||p(b||"*",h.nodeType?[h]:h,[]),
// Prefilter to get matcher input, preserving a map for seed-results synchronization
s=!a||!d&&b?r:q(r,m,a,h,i),t=c?
// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
f||(d?a:o||e)?
// ...intermediate processing is necessary
[]:
// ...otherwise use results directly
g:s;
// Apply postFilter
if(
// Find primary matches
c&&c(s,t,h,i),e)for(j=q(t,n),e(j,[],h,i),
// Un-match failing elements by moving them back to matcherIn
k=j.length;k--;)(l=j[k])&&(t[n[k]]=!(s[n[k]]=l));if(d){if(f||a){if(f){for(
// Get the final matcherOut by condensing this intermediate into postFinder contexts
j=[],k=t.length;k--;)(l=t[k])&&
// Restore matcherIn since elem is not yet a final match
j.push(s[k]=l);f(null,t=[],j,i)}for(
// Move matched elements from seed to results to keep them synchronized
k=t.length;k--;)(l=t[k])&&(j=f?aa(d,l):m[k])>-1&&(d[j]=!(g[j]=l))}}else t=q(t===g?t.splice(o,t.length):t),f?f(null,g,t,i):$.apply(g,t)})}function s(a){for(var b,c,d,e=a.length,f=w.relative[a[0].type],g=f||w.relative[" "],h=f?1:0,
// The foundational matcher ensures that elements are reachable from top-level context(s)
i=n(function(a){return a===b},g,!0),j=n(function(a){return aa(b,a)>-1},g,!0),k=[function(a,c,d){var e=!f&&(d||c!==C)||((b=c).nodeType?i(a,c,d):j(a,c,d));
// Avoid hanging onto element (issue #299)
return b=null,e}];e>h;h++)if(c=w.relative[a[h].type])k=[n(o(k),c)];else{
// Return special upon seeing a positional matcher
if(c=w.filter[a[h].type].apply(null,a[h].matches),c[N]){for(
// Find the next relative operator (if any) for proper handling
d=++h;e>d&&!w.relative[a[d].type];d++);
// If the preceding token was a descendant combinator, insert an implicit any-element `*`
return r(h>1&&o(k),h>1&&m(a.slice(0,h-1).concat({value:" "===a[h-2].type?"*":""})).replace(ia,"$1"),c,d>h&&s(a.slice(h,d)),e>d&&s(a=a.slice(d)),e>d&&m(a))}k.push(c)}return o(k)}function t(a,c){var e=c.length>0,f=a.length>0,g=function(d,g,h,i,j){var k,l,m,n=0,o="0",p=d&&[],r=[],s=C,
// We must always have either seed elements or outermost context
t=d||f&&w.find.TAG("*",j),
// Use integer dirruns iff this is the outermost matcher
u=P+=null==s?1:Math.random()||.1,v=t.length;
// Add elements passing elementMatchers directly to results
// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(j&&(C=g!==G&&g);o!==v&&null!=(k=t[o]);o++){if(f&&k){for(l=0;m=a[l++];)if(m(k,g,h)){i.push(k);break}j&&(P=u)}
// Track unmatched elements for set filters
e&&(
// They will have gone through all possible matchers
(k=!m&&k)&&n--,
// Lengthen the array for every element, matched or not
d&&p.push(k))}if(
// Apply set filters to unmatched elements
n+=o,e&&o!==n){for(l=0;m=c[l++];)m(p,r,g,h);if(d){
// Reintegrate element matches to eliminate the need for sorting
if(n>0)for(;o--;)p[o]||r[o]||(r[o]=Y.call(i));
// Discard index placeholder values to get only actual matches
r=q(r)}
// Add matches to results
$.apply(i,r),
// Seedless set matches succeeding multiple successful matchers stipulate sorting
j&&!d&&r.length>0&&n+c.length>1&&b.uniqueSort(i)}
// Override manipulation of globals by nested matchers
return j&&(P=u,C=s),p};return e?d(g):g}var u,v,w,x,y,z,A,B,C,D,E,
// Local document vars
F,G,H,I,J,K,L,M,
// Instance-specific data
N="sizzle"+1*new Date,O=a.document,P=0,Q=0,R=c(),S=c(),T=c(),U=function(a,b){return a===b&&(E=!0),0},
// General-purpose constants
V=1<<31,
// Instance methods
W={}.hasOwnProperty,X=[],Y=X.pop,Z=X.push,$=X.push,_=X.slice,
// Use a stripped-down indexOf as it's faster than native
// http://jsperf.com/thor-indexof-vs-for/5
aa=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},ba="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
// Regular expressions
// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
ca="[\\x20\\t\\r\\n\\f]",
// http://www.w3.org/TR/css3-syntax/#characters
da="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
// Loosely modeled on CSS identifier characters
// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
ea=da.replace("w","w#"),
// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
fa="\\["+ca+"*("+da+")(?:"+ca+
// Operator (capture 2)
"*([*^$|!~]?=)"+ca+
// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ea+"))|)"+ca+"*\\]",ga=":("+da+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+fa+")*)|.*)\\)|)",
// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
ha=new RegExp(ca+"+","g"),ia=new RegExp("^"+ca+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ca+"+$","g"),ja=new RegExp("^"+ca+"*,"+ca+"*"),ka=new RegExp("^"+ca+"*([>+~]|"+ca+")"+ca+"*"),la=new RegExp("="+ca+"*([^\\]'\"]*?)"+ca+"*\\]","g"),ma=new RegExp(ga),na=new RegExp("^"+ea+"$"),oa={ID:new RegExp("^#("+da+")"),CLASS:new RegExp("^\\.("+da+")"),TAG:new RegExp("^("+da.replace("w","w*")+")"),ATTR:new RegExp("^"+fa),PSEUDO:new RegExp("^"+ga),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ca+"*(even|odd|(([+-]|)(\\d*)n|)"+ca+"*(?:([+-]|)"+ca+"*(\\d+)|))"+ca+"*\\)|)","i"),bool:new RegExp("^(?:"+ba+")$","i"),
// For use in libraries implementing .is()
// We use this for POS matching in `select`
needsContext:new RegExp("^"+ca+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ca+"*((?:-\\d)?\\d*)"+ca+"*\\)|)(?=[^-]|$)","i")},pa=/^(?:input|select|textarea|button)$/i,qa=/^h\d$/i,ra=/^[^{]+\{\s*\[native \w/,
// Easily-parseable/retrievable ID or TAG or CLASS selectors
sa=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ta=/[+~]/,ua=/'|\\/g,
// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
va=new RegExp("\\\\([\\da-f]{1,6}"+ca+"?|("+ca+")|.)","ig"),wa=function(a,b,c){var d="0x"+b-65536;
// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
// BMP codepoint
// Supplemental Plane codepoint (surrogate pair)
return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},
// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
xa=function(){F()};
// Optimize for push.apply( _, NodeList )
try{$.apply(X=_.call(O.childNodes),O.childNodes),
// Support: Android<4.0
// Detect silently failing push.apply
X[O.childNodes.length].nodeType}catch(ya){$={apply:X.length?
// Leverage slice if possible
function(a,b){Z.apply(a,_.call(b))}:
// Support: IE<9
// Otherwise append directly
function(a,b){
// Can't trust NodeList.length
for(var c=a.length,d=0;a[c++]=b[d++];);a.length=c-1}}}
// Expose support vars for convenience
v=b.support={},/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
y=b.isXML=function(a){
// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
F=b.setDocument=function(a){var b,c,d=a?a.ownerDocument||a:O;
// If no document and documentElement is available, return
// If no document and documentElement is available, return
// Set our document
// Support: IE>8
// If iframe document is assigned to "document" variable and if iframe has been reloaded,
// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
// IE6-8 do not support the defaultView property so parent will be undefined
// IE11 does not have attachEvent, so all must suffer
/* Support tests
	---------------------------------------------------------------------- */
/* Attributes
	---------------------------------------------------------------------- */
// Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
/* getElement(s)By*
	---------------------------------------------------------------------- */
// Check if getElementsByTagName("*") returns only elements
// Support: IE<9
// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programatically-set names,
// so use a roundabout getElementsByName test
// ID find and filter
// Support: IE6/7
// getElementById is not reliable as a find shortcut
// Tag
// Class
/* QSA/matchesSelector
	---------------------------------------------------------------------- */
// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See http://bugs.jquery.com/ticket/13378
// Build QSA regex
// Regex strategy adopted from Diego Perini
/* Contains
	---------------------------------------------------------------------- */
// Element contains another
// Purposefully does not implement inclusive descendent
// As in, an element does not contain itself
/* Sorting
	---------------------------------------------------------------------- */
// Document order sorting
return d!==G&&9===d.nodeType&&d.documentElement?(G=d,H=d.documentElement,c=d.defaultView,c&&c!==c.top&&(c.addEventListener?c.addEventListener("unload",xa,!1):c.attachEvent&&c.attachEvent("onunload",xa)),I=!y(d),v.attributes=e(function(a){return a.className="i",!a.getAttribute("className")}),v.getElementsByTagName=e(function(a){return a.appendChild(d.createComment("")),!a.getElementsByTagName("*").length}),v.getElementsByClassName=ra.test(d.getElementsByClassName),v.getById=e(function(a){return H.appendChild(a).id=N,!d.getElementsByName||!d.getElementsByName(N).length}),v.getById?(w.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&I){var c=b.getElementById(a);
// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
return c&&c.parentNode?[c]:[]}},w.filter.ID=function(a){var b=a.replace(va,wa);return function(a){return a.getAttribute("id")===b}}):(delete w.find.ID,w.filter.ID=function(a){var b=a.replace(va,wa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),w.find.TAG=v.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):v.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,
// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
f=b.getElementsByTagName(a);
// Filter out possible comments
if("*"===a){for(;c=f[e++];)1===c.nodeType&&d.push(c);return d}return f},w.find.CLASS=v.getElementsByClassName&&function(a,b){return I?b.getElementsByClassName(a):void 0},K=[],J=[],(v.qsa=ra.test(d.querySelectorAll))&&(e(function(a){
// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// http://bugs.jquery.com/ticket/12359
H.appendChild(a).innerHTML="<a id='"+N+"'></a><select id='"+N+"-\f]' msallowcapture=''><option selected=''></option></select>",
// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
a.querySelectorAll("[msallowcapture^='']").length&&J.push("[*^$]="+ca+"*(?:''|\"\")"),
// Support: IE8
// Boolean attributes and "value" are not treated correctly
a.querySelectorAll("[selected]").length||J.push("\\["+ca+"*(?:value|"+ba+")"),
// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
a.querySelectorAll("[id~="+N+"-]").length||J.push("~="),
// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
a.querySelectorAll(":checked").length||J.push(":checked"),
// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibing-combinator selector` fails
a.querySelectorAll("a#"+N+"+*").length||J.push(".#.+[+~]")}),e(function(a){
// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var b=d.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),
// Support: IE8
// Enforce case-sensitivity of name attribute
a.querySelectorAll("[name=d]").length&&J.push("name"+ca+"*[*^$|!~]?="),
// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
a.querySelectorAll(":enabled").length||J.push(":enabled",":disabled"),
// Opera 10-11 does not throw on post-comma invalid pseudos
a.querySelectorAll("*,:x"),J.push(",.*:")})),(v.matchesSelector=ra.test(L=H.matches||H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&e(function(a){
// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
v.disconnectedMatch=L.call(a,"div"),
// This should fail with an exception
// Gecko does not error, returns false instead
L.call(a,"[s!='']:x"),K.push("!=",ga)}),J=J.length&&new RegExp(J.join("|")),K=K.length&&new RegExp(K.join("|")),b=ra.test(H.compareDocumentPosition),M=b||ra.test(H.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},U=b?function(a,b){
// Flag for duplicate removal
if(a===b)return E=!0,0;
// Sort on method existence if only one input has compareDocumentPosition
var c=!a.compareDocumentPosition-!b.compareDocumentPosition;
// Calculate position if both inputs belong to the same document
// Otherwise we know they are disconnected
// Disconnected nodes
// Choose the first element that is related to our preferred document
return c?c:(c=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&c||!v.sortDetached&&b.compareDocumentPosition(a)===c?a===d||a.ownerDocument===O&&M(O,a)?-1:b===d||b.ownerDocument===O&&M(O,b)?1:D?aa(D,a)-aa(D,b):0:4&c?-1:1)}:function(a,b){
// Exit early if the nodes are identical
if(a===b)return E=!0,0;var c,e=0,f=a.parentNode,h=b.parentNode,i=[a],j=[b];
// Parentless nodes are either documents or disconnected
if(!f||!h)return a===d?-1:b===d?1:f?-1:h?1:D?aa(D,a)-aa(D,b):0;if(f===h)return g(a,b);for(
// Otherwise we need full lists of their ancestors for comparison
c=a;c=c.parentNode;)i.unshift(c);for(c=b;c=c.parentNode;)j.unshift(c);
// Walk down the tree looking for a discrepancy
for(;i[e]===j[e];)e++;
// Do a sibling check if the nodes have a common ancestor
// Otherwise nodes in our document sort first
return e?g(i[e],j[e]):i[e]===O?-1:j[e]===O?1:0},d):G},b.matches=function(a,c){return b(a,null,null,c)},b.matchesSelector=function(a,c){if(
// Set document vars if needed
(a.ownerDocument||a)!==G&&F(a),
// Make sure that attribute selectors are quoted
c=c.replace(la,"='$1']"),!(!v.matchesSelector||!I||K&&K.test(c)||J&&J.test(c)))try{var d=L.call(a,c);
// IE 9's matchesSelector returns false on disconnected nodes
if(d||v.disconnectedMatch||
// As well, disconnected nodes are said to be in a document
// fragment in IE 9
a.document&&11!==a.document.nodeType)return d}catch(e){}return b(c,G,null,[a]).length>0},b.contains=function(a,b){
// Set document vars if needed
return(a.ownerDocument||a)!==G&&F(a),M(a,b)},b.attr=function(a,b){
// Set document vars if needed
(a.ownerDocument||a)!==G&&F(a);var c=w.attrHandle[b.toLowerCase()],
// Don't get fooled by Object.prototype properties (jQuery #13807)
d=c&&W.call(w.attrHandle,b.toLowerCase())?c(a,b,!I):void 0;return void 0!==d?d:v.attributes||!I?a.getAttribute(b):(d=a.getAttributeNode(b))&&d.specified?d.value:null},b.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
b.uniqueSort=function(a){var b,c=[],d=0,e=0;if(
// Unless we *know* we can detect duplicates, assume their presence
E=!v.detectDuplicates,D=!v.sortStable&&a.slice(0),a.sort(U),E){for(;b=a[e++];)b===a[e]&&(d=c.push(e));for(;d--;)a.splice(c[d],1)}
// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
return D=null,a},/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
x=b.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(1===e||9===e||11===e){
// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if("string"==typeof a.textContent)return a.textContent;
// Traverse its children
for(a=a.firstChild;a;a=a.nextSibling)c+=x(a)}else if(3===e||4===e)return a.nodeValue}else
// If no nodeType, this is expected to be an array
for(;b=a[d++];)
// Do not traverse comment nodes
c+=x(b);
// Do not include comment or processing instruction nodes
return c},w=b.selectors={
// Can be adjusted by the user
cacheLength:50,createPseudo:d,match:oa,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){
// Move the given value to match[3] whether quoted or unquoted
return a[1]=a[1].replace(va,wa),a[3]=(a[3]||a[4]||a[5]||"").replace(va,wa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
// nth-* requires argument
// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||b.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&b.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];
// Accept quoted arguments as-is
// Get excess from tokenize (recursively)
// advance to the next closing parenthesis
// excess is a negative index
return oa.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&ma.test(c)&&(b=z(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(va,wa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=R[a+" "];return b||(b=new RegExp("(^|"+ca+")"+a+"("+ca+"|$)"))&&R(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,c,d){return function(e){var f=b.attr(e,a);return null==f?"!="===c:c?(f+="","="===c?f===d:"!="===c?f!==d:"^="===c?d&&0===f.indexOf(d):"*="===c?d&&f.indexOf(d)>-1:"$="===c?d&&f.slice(-d.length)===d:"~="===c?(" "+f.replace(ha," ")+" ").indexOf(d)>-1:"|="===c?f===d||f.slice(0,d.length+1)===d+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;
// Shortcut for :nth-*(n)
return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){
// :(first|last|only)-(child|of-type)
if(f){for(;p;){for(l=b;l=l[p];)if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;
// Reverse direction for :only-* (if we haven't yet done so)
o=p="only"===a&&!o&&"nextSibling"}return!0}
// non-xml :nth-child(...) stores cache data on `parent`
if(o=[g?q.firstChild:q.lastChild],g&&s){for(
// Seek `elem` from a previously-cached index
k=q[N]||(q[N]={}),j=k[a]||[],n=j[0]===P&&j[1],m=j[0]===P&&j[2],l=n&&q.childNodes[n];l=++n&&l&&l[p]||(
// Fallback to seeking `elem` from the start
m=n=0)||o.pop();)
// When found, cache indexes on `parent` and break
if(1===l.nodeType&&++m&&l===b){k[a]=[P,n,m];break}}else if(s&&(j=(b[N]||(b[N]={}))[a])&&j[0]===P)m=j[1];else
// Use the same loop as above to seek `elem` from the start
for(;(l=++n&&l&&l[p]||(m=n=0)||o.pop())&&((h?l.nodeName.toLowerCase()!==r:1!==l.nodeType)||!++m||(
// Cache the index of each encountered element
s&&((l[N]||(l[N]={}))[a]=[P,m]),l!==b)););
// Incorporate the offset, then check against cycle size
return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,c){
// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var e,f=w.pseudos[a]||w.setFilters[a.toLowerCase()]||b.error("unsupported pseudo: "+a);
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// But maintain support for old signatures
return f[N]?f(c):f.length>1?(e=[a,a,"",c],w.setFilters.hasOwnProperty(a.toLowerCase())?d(function(a,b){for(var d,e=f(a,c),g=e.length;g--;)d=aa(a,e[g]),a[d]=!(b[d]=e[g])}):function(a){return f(a,0,e)}):f}},pseudos:{
// Potentially complex pseudos
not:d(function(a){
// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var b=[],c=[],e=A(a.replace(ia,"$1"));return e[N]?d(function(a,b,c,d){
// Match elements unmatched by `matcher`
for(var f,g=e(a,null,d,[]),h=a.length;h--;)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,d,f){
// Don't keep the element (issue #299)
return b[0]=a,e(b,null,f,c),b[0]=null,!c.pop()}}),has:d(function(a){return function(c){return b(a,c).length>0}}),contains:d(function(a){return a=a.replace(va,wa),function(b){return(b.textContent||b.innerText||x(b)).indexOf(a)>-1}}),
// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
lang:d(function(a){
// lang value must be a valid identifier
return na.test(a||"")||b.error("unsupported lang: "+a),a=a.replace(va,wa).toLowerCase(),function(b){var c;do if(c=I?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),
// Miscellaneous
target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===H},focus:function(a){return a===G.activeElement&&(!G.hasFocus||G.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},
// Boolean properties
enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){
// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){
// Accessing this property makes selected-by-default
// options in Safari work properly
return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},
// Contents
empty:function(a){
// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!w.pseudos.empty(a)},
// Element/input types
header:function(a){return qa.test(a.nodeName)},input:function(a){return pa.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;
// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},
// Position-in-collection
first:j(function(){return[0]}),last:j(function(a,b){return[b-1]}),eq:j(function(a,b,c){return[0>c?c+b:c]}),even:j(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:j(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:j(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:j(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},w.pseudos.nth=w.pseudos.eq;
// Add button/input type pseudos
for(u in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[u]=h(u);for(u in{submit:!0,reset:!0})w.pseudos[u]=i(u);/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
// One-time assignments
// Sort stability
// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
// Initialize against the default document
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
// Support: IE<9
// Use defaultValue in place of getAttribute("value")
// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
return l.prototype=w.filters=w.pseudos,w.setFilters=new l,z=b.tokenize=function(a,c){var d,e,f,g,h,i,j,k=S[a+" "];if(k)return c?0:k.slice(0);for(h=a,i=[],j=w.preFilter;h;){
// Comma and first run
(!d||(e=ja.exec(h)))&&(e&&(
// Don't consume trailing commas as valid
h=h.slice(e[0].length)||h),i.push(f=[])),d=!1,
// Combinators
(e=ka.exec(h))&&(d=e.shift(),f.push({value:d,
// Cast descendant combinators to space
type:e[0].replace(ia," ")}),h=h.slice(d.length));
// Filters
for(g in w.filter)!(e=oa[g].exec(h))||j[g]&&!(e=j[g](e))||(d=e.shift(),f.push({value:d,type:g,matches:e}),h=h.slice(d.length));if(!d)break}
// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
// Cache the tokens
return c?h.length:h?b.error(a):S(a,i).slice(0)},A=b.compile=function(a,b){var c,d=[],e=[],f=T[a+" "];if(!f){for(
// Generate a function of recursive functions that can be used to check each element
b||(b=z(a)),c=b.length;c--;)f=s(b[c]),f[N]?d.push(f):e.push(f);
// Cache the compiled function
f=T(a,t(e,d)),
// Save selector and tokenization
f.selector=a}return f},B=b.select=function(a,b,c,d){var e,f,g,h,i,j="function"==typeof a&&a,l=!d&&z(a=j.selector||a);
// Try to minimize operations if there is no seed and only one group
if(c=c||[],1===l.length){if(
// Take a shortcut and set the context if the root selector is an ID
f=l[0]=l[0].slice(0),f.length>2&&"ID"===(g=f[0]).type&&v.getById&&9===b.nodeType&&I&&w.relative[f[1].type]){if(b=(w.find.ID(g.matches[0].replace(va,wa),b)||[])[0],!b)return c;j&&(b=b.parentNode),a=a.slice(f.shift().value.length)}for(
// Fetch a seed set for right-to-left matching
e=oa.needsContext.test(a)?0:f.length;e--&&(g=f[e],!w.relative[h=g.type]);)if((i=w.find[h])&&(d=i(g.matches[0].replace(va,wa),ta.test(f[0].type)&&k(b.parentNode)||b))){if(
// If seed is empty or no tokens remain, we can return early
f.splice(e,1),a=d.length&&m(f),!a)return $.apply(c,d),c;break}}
// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
return(j||A(a,l))(d,b,!I,c,ta.test(a)&&k(b.parentNode)||b),c},v.sortStable=N.split("").sort(U).join("")===N,v.detectDuplicates=!!E,F(),v.sortDetached=e(function(a){
// Should return 1, but returns 4 (following)
return 1&a.compareDocumentPosition(G.createElement("div"))}),e(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||f("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),v.attributes&&e(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||f("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),e(function(a){return null==a.getAttribute("disabled")})||f(ba,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),b}(a);ea.find=ja,ea.expr=ja.selectors,ea.expr[":"]=ea.expr.pseudos,ea.unique=ja.uniqueSort,ea.text=ja.getText,ea.isXMLDoc=ja.isXML,ea.contains=ja.contains;var ka=ea.expr.match.needsContext,la=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ma=/^.[^:#\[\.,]*$/;ea.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?ea.find.matchesSelector(d,a)?[d]:[]:ea.find.matches(a,ea.grep(b,function(a){return 1===a.nodeType}))},ea.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(ea(a).filter(function(){for(b=0;e>b;b++)if(ea.contains(d[b],this))return!0}));for(b=0;e>b;b++)ea.find(a,d[b],c);
// Needed because $( selector, context ) becomes $( context ).find( selector )
return c=this.pushStack(e>1?ea.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(d(this,a||[],!1))},not:function(a){return this.pushStack(d(this,a||[],!0))},is:function(a){
// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
return!!d(this,"string"==typeof a&&ka.test(a)?ea(a):a||[],!1).length}});
// Initialize a jQuery object
// A central reference to the root jQuery(document)
var na,
// Use the correct document accordingly with window argument (sandbox)
oa=a.document,
// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
pa=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,qa=ea.fn.init=function(a,b){var c,d;
// HANDLE: $(""), $(null), $(undefined), $(false)
if(!a)return this;
// Handle HTML strings
if("string"==typeof a){
// Match html or make sure no context is specified for #id
if(
// Assume that strings that start and end with <> are HTML and skip the regex check
c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:pa.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||na).find(a):this.constructor(b).find(a);
// HANDLE: $(html) -> $(array)
if(c[1]){
// HANDLE: $(html, props)
if(b=b instanceof ea?b[0]:b,
// scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
ea.merge(this,ea.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:oa,!0)),la.test(c[1])&&ea.isPlainObject(b))for(c in b)
// Properties of context are called as methods if possible
ea.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}
// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
if(d=oa.getElementById(c[2]),d&&d.parentNode){
// Handle the case where IE and Opera return items
// by name instead of ID
if(d.id!==c[2])return na.find(a);
// Otherwise, we inject the element directly into the jQuery object
this.length=1,this[0]=d}return this.context=oa,this.selector=a,this}
// Execute immediately if ready is not present
return a.nodeType?(this.context=this[0]=a,this.length=1,this):ea.isFunction(a)?"undefined"!=typeof na.ready?na.ready(a):a(ea):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),ea.makeArray(a,this))};
// Give the init function the jQuery prototype for later instantiation
qa.prototype=ea.fn,
// Initialize central reference
na=ea(oa);var ra=/^(?:parents|prev(?:Until|All))/,
// methods guaranteed to produce a unique set when starting from a unique set
sa={children:!0,contents:!0,next:!0,prev:!0};ea.extend({dir:function(a,b,c){for(var d=[],e=a[b];e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!ea(e).is(c));)1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),ea.fn.extend({has:function(a){var b,c=ea(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(ea.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=ka.test(a)||"string"!=typeof a?ea(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)
// Always skip document fragments
if(c.nodeType<11&&(g?g.index(c)>-1:
// Don't pass non-elements to Sizzle
1===c.nodeType&&ea.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?ea.unique(f):f)},
// Determine the position of an element within
// the matched set of elements
index:function(a){
// No argument, return index in parent
// No argument, return index in parent
// index in selector
// If it receives a jQuery object, the first element is used
return a?"string"==typeof a?ea.inArray(this[0],ea(a)):ea.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(ea.unique(ea.merge(this.get(),ea(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}}),ea.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return ea.dir(a,"parentNode")},parentsUntil:function(a,b,c){return ea.dir(a,"parentNode",c)},next:function(a){return e(a,"nextSibling")},prev:function(a){return e(a,"previousSibling")},nextAll:function(a){return ea.dir(a,"nextSibling")},prevAll:function(a){return ea.dir(a,"previousSibling")},nextUntil:function(a,b,c){return ea.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return ea.dir(a,"previousSibling",c)},siblings:function(a){return ea.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return ea.sibling(a.firstChild)},contents:function(a){return ea.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:ea.merge([],a.childNodes)}},function(a,b){ea.fn[a]=function(c,d){var e=ea.map(this,b,c);
// Remove duplicates
// Reverse order for parents* and prev-derivatives
return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=ea.filter(d,e)),this.length>1&&(sa[a]||(e=ea.unique(e)),ra.test(a)&&(e=e.reverse())),this.pushStack(e)}});var ta=/\S+/g,ua={};/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
ea.Callbacks=function(a){
// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
a="string"==typeof a?ua[a]||f(a):ea.extend({},a);var// Flag to know if list is currently firing
b,
// Last fire value (for non-forgettable lists)
c,
// Flag to know if list was already fired
d,
// End of the loop when firing
e,
// Index of currently firing callback (modified by remove if needed)
g,
// First callback to fire (used internally by add and fireWith)
h,
// Actual callback list
i=[],
// Stack of fire calls for repeatable lists
j=!a.once&&[],
// Fire callbacks
k=function(f){for(c=a.memory&&f,d=!0,g=h||0,h=0,e=i.length,b=!0;i&&e>g;g++)if(i[g].apply(f[0],f[1])===!1&&a.stopOnFalse){c=!1;// To prevent further calls using add
break}b=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},
// Actual Callbacks object
l={
// Add a callback or a collection of callbacks to the list
add:function(){if(i){
// First, we save the current length
var d=i.length;!function f(b){ea.each(b,function(b,c){var d=ea.type(c);"function"===d?a.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!==d&&
// Inspect recursively
f(c)})}(arguments),
// Do we need to add the callbacks to the
// current firing batch?
b?e=i.length:c&&(h=d,k(c))}return this},
// Remove a callback from the list
remove:function(){return i&&ea.each(arguments,function(a,c){for(var d;(d=ea.inArray(c,i,d))>-1;)i.splice(d,1),
// Handle firing indexes
b&&(e>=d&&e--,g>=d&&g--)}),this},
// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(a){return a?ea.inArray(a,i)>-1:!(!i||!i.length)},
// Remove all callbacks from the list
empty:function(){return i=[],e=0,this},
// Have the list do nothing anymore
disable:function(){return i=j=c=void 0,this},
// Is it disabled?
disabled:function(){return!i},
// Lock the list in its current state
lock:function(){return j=void 0,c||l.disable(),this},
// Is it locked?
locked:function(){return!j},
// Call all callbacks with the given context and arguments
fireWith:function(a,c){return!i||d&&!j||(c=c||[],c=[a,c.slice?c.slice():c],b?j.push(c):k(c)),this},
// Call all the callbacks with the given arguments
fire:function(){return l.fireWith(this,arguments),this},
// To know if the callbacks have already been called at least once
fired:function(){return!!d}};return l},ea.extend({Deferred:function(a){var b=[
// action, add listener, listener list, final state
["resolve","done",ea.Callbacks("once memory"),"resolved"],["reject","fail",ea.Callbacks("once memory"),"rejected"],["notify","progress",ea.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return ea.Deferred(function(c){ea.each(b,function(b,f){var g=ea.isFunction(a[b])&&a[b];
// deferred[ done | fail | progress ] for forwarding actions to newDefer
e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&ea.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},
// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(a){return null!=a?ea.extend(a,d):d}},e={};
// All done!
// Keep pipe for back-compat
// Add list-specific methods
// Make the deferred a promise
// Call given func if any
return d.pipe=d.then,ea.each(b,function(a,f){var g=f[2],h=f[3];
// promise[ done | fail | progress ] = list.add
d[f[1]]=g.add,
// Handle state
h&&g.add(function(){
// state = [ resolved | rejected ]
c=h},b[1^a][2].disable,b[2][2].lock),
// deferred[ resolve | reject | notify ]
e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},
// Deferred helper
when:function(a){var b,c,d,e=0,f=X.call(arguments),g=f.length,
// the count of uncompleted subordinates
h=1!==g||a&&ea.isFunction(a.promise)?g:0,
// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
i=1===h?a:ea.Deferred(),
// Update function for both resolve and progress values
j=function(a,c,d){return function(e){c[a]=this,d[a]=arguments.length>1?X.call(arguments):e,d===b?i.notifyWith(c,d):--h||i.resolveWith(c,d)}};
// add listeners to Deferred subordinates; treat others as resolved
if(g>1)for(b=new Array(g),c=new Array(g),d=new Array(g);g>e;e++)f[e]&&ea.isFunction(f[e].promise)?f[e].promise().done(j(e,d,f)).fail(i.reject).progress(j(e,c,b)):--h;
// if we're not waiting on anything, resolve the master
return h||i.resolveWith(d,f),i.promise()}});
// The deferred used on DOM ready
var va;ea.fn.ready=function(a){
// Add the callback
return ea.ready.promise().done(a),this},ea.extend({
// Is the DOM ready to be used? Set to true once it occurs.
isReady:!1,
// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,
// Hold (or release) the ready event
holdReady:function(a){a?ea.readyWait++:ea.ready(!0)},
// Handle when the DOM is ready
ready:function(a){
// Abort if there are pending holds or we're already ready
if(a===!0?!--ea.readyWait:!ea.isReady){
// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
if(!oa.body)return setTimeout(ea.ready);
// Remember that the DOM is ready
ea.isReady=!0,
// If a normal DOM Ready event fired, decrement, and wait if need be
a!==!0&&--ea.readyWait>0||(
// If there are functions bound, to execute
va.resolveWith(oa,[ea]),
// Trigger any bound ready events
ea.fn.triggerHandler&&(ea(oa).triggerHandler("ready"),ea(oa).off("ready")))}}}),ea.ready.promise=function(b){if(!va)
// Catch cases where $(document).ready() is called after the browser event has already occurred.
// we once tried to use readyState "interactive" here, but it caused issues like the one
// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
if(va=ea.Deferred(),"complete"===oa.readyState)
// Handle it asynchronously to allow scripts the opportunity to delay ready
setTimeout(ea.ready);else if(oa.addEventListener)
// Use the handy event callback
oa.addEventListener("DOMContentLoaded",h,!1),
// A fallback to window.onload, that will always work
a.addEventListener("load",h,!1);else{
// Ensure firing before onload, maybe late but safe also for iframes
oa.attachEvent("onreadystatechange",h),
// A fallback to window.onload, that will always work
a.attachEvent("onload",h);
// If IE and not a frame
// continually check to see if the document is ready
var c=!1;try{c=null==a.frameElement&&oa.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!ea.isReady){try{
// Use the trick by Diego Perini
// http://javascript.nwbox.com/IEContentLoaded/
c.doScroll("left")}catch(a){return setTimeout(e,50)}
// detach all dom ready events
g(),
// and execute any waiting functions
ea.ready()}}()}return va.promise(b)};var wa,xa="undefined";for(wa in ea(ca))break;ca.ownLast="0"!==wa,
// Note: most support tests are defined in their respective modules.
// false until the test is run
ca.inlineBlockNeedsLayout=!1,
// Execute ASAP in case we need to set body.style.zoom
ea(function(){
// Minified: var a,b,c,d
var a,b,c,d;c=oa.getElementsByTagName("body")[0],c&&c.style&&(
// Setup
b=oa.createElement("div"),d=oa.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==xa&&(
// Support: IE<8
// Check if natively block-level elements act like inline-block
// elements when setting their display to 'inline' and giving
// them layout
b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ca.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(
// Prevent IE 6 from affecting layout for positioned elements #11048
// Prevent IE from shrinking the body in IE 7 mode #12869
// Support: IE<8
c.style.zoom=1)),c.removeChild(d))}),function(){var a=oa.createElement("div");
// Execute the test only if not already executed in another module.
if(null==ca.deleteExpando){
// Support: IE<9
ca.deleteExpando=!0;try{delete a.test}catch(b){ca.deleteExpando=!1}}
// Null elements to avoid leaks in IE.
a=null}(),/**
 * Determines whether an object can have data
 */
ea.acceptData=function(a){var b=ea.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;
// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
// Nodes accept data unless otherwise specified; rejection can be conditional
return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var ya=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,za=/([A-Z])/g;ea.extend({cache:{},
// The following elements (space-suffixed to avoid Object.prototype collisions)
// throw uncatchable exceptions if you attempt to set expando properties
noData:{"applet ":!0,"embed ":!0,
// ...but Flash objects (which have this classid) *can* handle expandos
"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?ea.cache[a[ea.expando]]:a[ea.expando],!!a&&!j(a)},data:function(a,b,c){return k(a,b,c)},removeData:function(a,b){return l(a,b)},
// For internal use only.
_data:function(a,b,c){return k(a,b,c,!0)},_removeData:function(a,b){return l(a,b,!0)}}),ea.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;
// Special expections of .data basically thwart jQuery.access,
// so implement the relevant behavior ourselves
// Gets all values
if(void 0===a){if(this.length&&(e=ea.data(f),1===f.nodeType&&!ea._data(f,"parsedAttrs"))){for(c=g.length;c--;)
// Support: IE11+
// The attrs elements can be null (#14894)
g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=ea.camelCase(d.slice(5)),i(f,d,e[d])));ea._data(f,"parsedAttrs",!0)}return e}
// Sets multiple values
// Sets multiple values
// Sets one value
// Gets one value
// Try to fetch any internally stored data first
return"object"==typeof a?this.each(function(){ea.data(this,a)}):arguments.length>1?this.each(function(){ea.data(this,a,b)}):f?i(f,a,ea.data(f,a)):void 0},removeData:function(a){return this.each(function(){ea.removeData(this,a)})}}),ea.extend({queue:function(a,b,c){var d;
// Speed up dequeue by getting out quickly if this is just a lookup
return a?(b=(b||"fx")+"queue",d=ea._data(a,b),c&&(!d||ea.isArray(c)?d=ea._data(a,b,ea.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=ea.queue(a,b),d=c.length,e=c.shift(),f=ea._queueHooks(a,b),g=function(){ea.dequeue(a,b)};
// If the fx queue is dequeued, always remove the progress sentinel
"inprogress"===e&&(e=c.shift(),d--),e&&(
// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
"fx"===b&&c.unshift("inprogress"),
// clear up the last queue stop function
delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},
// not intended for public consumption - generates a queueHooks object, or returns the current one
_queueHooks:function(a,b){var c=b+"queueHooks";return ea._data(a,c)||ea._data(a,c,{empty:ea.Callbacks("once memory").add(function(){ea._removeData(a,b+"queue"),ea._removeData(a,c)})})}}),ea.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?ea.queue(this[0],a):void 0===b?this:this.each(function(){var c=ea.queue(this,a,b);
// ensure a hooks for this queue
ea._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&ea.dequeue(this,a)})},dequeue:function(a){return this.each(function(){ea.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},
// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(a,b){var c,d=1,e=ea.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};for("string"!=typeof a&&(b=a,a=void 0),a=a||"fx";g--;)c=ea._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ba=["Top","Right","Bottom","Left"],Ca=function(a,b){
// isHidden might be called from jQuery#filter function;
// in that case, element will be second argument
return a=b||a,"none"===ea.css(a,"display")||!ea.contains(a.ownerDocument,a)},Da=ea.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;
// Sets many values
if("object"===ea.type(c)){e=!0;for(h in c)ea.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,ea.isFunction(d)||(g=!0),j&&(
// Bulk operations run against the entire set
g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(ea(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));
// Gets
return e?a:j?b.call(a):i?b(a[0],c):f},Ea=/^(?:checkbox|radio)$/i;!function(){
// Minified: var a,b,c
var a=oa.createElement("input"),b=oa.createElement("div"),c=oa.createDocumentFragment();
// Execute the test only if not already executed in another module.
if(
// Setup
b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
// IE strips leading whitespace when .innerHTML is used
ca.leadingWhitespace=3===b.firstChild.nodeType,
// Make sure that tbody elements aren't automatically inserted
// IE will insert them into empty tables
ca.tbody=!b.getElementsByTagName("tbody").length,
// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
ca.htmlSerialize=!!b.getElementsByTagName("link").length,
// Makes sure cloning an html5 element does not cause problems
// Where outerHTML is undefined, this still works
ca.html5Clone="<:nav></:nav>"!==oa.createElement("nav").cloneNode(!0).outerHTML,
// Check if a disconnected checkbox will retain its checked
// value of true after appended to the DOM (IE6/7)
a.type="checkbox",a.checked=!0,c.appendChild(a),ca.appendChecked=a.checked,
// Make sure textarea (and checkbox) defaultValue is properly cloned
// Support: IE6-IE11+
b.innerHTML="<textarea>x</textarea>",ca.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,
// #11217 - WebKit loses check when the name is after the checked attribute
c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",
// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
// old WebKit doesn't clone checked state correctly in fragments
ca.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,
// Support: IE<9
// Opera does not clone events (and typeof div.attachEvent === undefined).
// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
ca.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){ca.noCloneEvent=!1}),b.cloneNode(!0).click()),null==ca.deleteExpando){
// Support: IE<9
ca.deleteExpando=!0;try{delete b.test}catch(d){ca.deleteExpando=!1}}}(),function(){var b,c,d=oa.createElement("div");
// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(ca[b+"Bubbles"]=c in a)||(
// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
d.setAttribute(c,"t"),ca[b+"Bubbles"]=d.attributes[c].expando===!1);
// Null elements to avoid leaks in IE.
d=null}();var Fa=/^(?:input|select|textarea)$/i,Ga=/^key/,Ha=/^(?:mouse|pointer|contextmenu)|click/,Ia=/^(?:focusinfocus|focusoutblur)$/,Ja=/^([^.]*)(?:\.(.+)|)$/;/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
ea.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=ea._data(a);
// Don't attach events to noData or text/comment nodes (but allow plain objects)
if(q){for(
// Caller can pass in an object of custom data in lieu of the handler
c.handler&&(i=c,c=i.handler,e=i.selector),
// Make sure that the handler has a unique ID, used to find/remove it later
c.guid||(c.guid=ea.guid++),
// Init the element's event structure and main handler, if this is the first
(g=q.events)||(g=q.events={}),(k=q.handle)||(k=q.handle=function(a){
// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof ea===xa||a&&ea.event.triggered===a.type?void 0:ea.event.dispatch.apply(k.elem,arguments)},
// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
k.elem=a),
// Handle multiple events separated by a space
b=(b||"").match(ta)||[""],h=b.length;h--;)f=Ja.exec(b[h])||[],n=p=f[1],o=(f[2]||"").split(".").sort(),
// There *must* be a type, no attaching namespace-only handlers
n&&(
// If event changes its type, use the special event handlers for the changed type
j=ea.event.special[n]||{},
// If selector defined, determine special event api type, otherwise given type
n=(e?j.delegateType:j.bindType)||n,
// Update special based on newly reset type
j=ea.event.special[n]||{},
// handleObj is passed to all event handlers
l=ea.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&ea.expr.match.needsContext.test(e),namespace:o.join(".")},i),
// Init the event handler queue if we're the first
(m=g[n])||(m=g[n]=[],m.delegateCount=0,
// Only use addEventListener/attachEvent if the special events handler returns false
j.setup&&j.setup.call(a,d,o,k)!==!1||(
// Bind the global event handler to the element
a.addEventListener?a.addEventListener(n,k,!1):a.attachEvent&&a.attachEvent("on"+n,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),
// Add to the element's handler list, delegates in front
e?m.splice(m.delegateCount++,0,l):m.push(l),
// Keep track of which events have ever been used, for event optimization
ea.event.global[n]=!0);
// Nullify elem to prevent memory leaks in IE
a=null}},
// Detach an event or set of events from an element
remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=ea.hasData(a)&&ea._data(a);if(q&&(k=q.events)){for(
// Once for each type.namespace in types; type may be omitted
b=(b||"").match(ta)||[""],j=b.length;j--;)
// Unbind all events (on this namespace, if provided) for the element
if(h=Ja.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){for(l=ea.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=k[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),
// Remove matching events
i=f=m.length;f--;)g=m[f],!e&&p!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));
// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
i&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||ea.removeEvent(a,n,q.handle),delete k[n])}else for(n in k)ea.event.remove(a,n+b[j],c,d,!0);
// Remove the expando if it's no longer used
ea.isEmptyObject(k)&&(delete q.handle,
// removeData also checks for emptiness and clears the expando if empty
// so use it instead of delete
ea._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,j,k,l,m=[d||oa],n=ba.call(b,"type")?b.type:b,o=ba.call(b,"namespace")?b.namespace.split("."):[];
// Don't do events on text and comment nodes
if(h=k=d=d||oa,3!==d.nodeType&&8!==d.nodeType&&!Ia.test(n+ea.event.triggered)&&(n.indexOf(".")>=0&&(
// Namespaced trigger; create a regexp to match event type in handle()
o=n.split("."),n=o.shift(),o.sort()),g=n.indexOf(":")<0&&"on"+n,
// Caller can pass in a jQuery.Event object, Object, or just an event type string
b=b[ea.expando]?b:new ea.Event(n,"object"==typeof b&&b),
// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
b.isTrigger=e?2:3,b.namespace=o.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
// Clean up the event in case it is being reused
b.result=void 0,b.target||(b.target=d),
// Clone any incoming data and prepend the event, creating the handler arg list
c=null==c?[b]:ea.makeArray(c,[b]),
// Allow special events to draw outside the lines
j=ea.event.special[n]||{},e||!j.trigger||j.trigger.apply(d,c)!==!1)){
// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!e&&!j.noBubble&&!ea.isWindow(d)){for(i=j.delegateType||n,Ia.test(i+n)||(h=h.parentNode);h;h=h.parentNode)m.push(h),k=h;
// Only add window if we got to document (e.g., not plain obj or detached DOM)
k===(d.ownerDocument||oa)&&m.push(k.defaultView||k.parentWindow||a)}for(
// Fire handlers on the event path
l=0;(h=m[l++])&&!b.isPropagationStopped();)b.type=l>1?i:j.bindType||n,
// jQuery handler
f=(ea._data(h,"events")||{})[b.type]&&ea._data(h,"handle"),f&&f.apply(h,c),
// Native handler
f=g&&h[g],f&&f.apply&&ea.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());
// If nobody prevented the default action, do it now
if(b.type=n,!e&&!b.isDefaultPrevented()&&(!j._default||j._default.apply(m.pop(),c)===!1)&&ea.acceptData(d)&&g&&d[n]&&!ea.isWindow(d)){
// Don't re-trigger an onFOO event when we call its FOO() method
k=d[g],k&&(d[g]=null),
// Prevent re-triggering of the same event, since we already bubbled it above
ea.event.triggered=n;try{d[n]()}catch(p){}ea.event.triggered=void 0,k&&(d[g]=k)}return b.result}},dispatch:function(a){
// Make a writable jQuery.Event from the native event object
a=ea.event.fix(a);var b,c,d,e,f,g=[],h=X.call(arguments),i=(ea._data(this,"events")||{})[a.type]||[],j=ea.event.special[a.type]||{};
// Call the preDispatch hook for the mapped type, and let it bail if desired
if(
// Use the fix-ed jQuery.Event rather than the (read-only) native event
h[0]=a,a.delegateTarget=this,!j.preDispatch||j.preDispatch.call(this,a)!==!1){for(
// Determine handlers
g=ea.event.handlers.call(this,a,i),
// Run delegates first; they may want to stop propagation beneath us
b=0;(e=g[b++])&&!a.isPropagationStopped();)for(a.currentTarget=e.elem,f=0;(d=e.handlers[f++])&&!a.isImmediatePropagationStopped();)
// Triggered event must either 1) have no namespace, or
// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
(!a.namespace_re||a.namespace_re.test(d.namespace))&&(a.handleObj=d,a.data=d.data,c=((ea.event.special[d.origType]||{}).handle||d.handler).apply(e.elem,h),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()));
// Call the postDispatch hook for the mapped type
return j.postDispatch&&j.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;
// Find delegate handlers
// Black-hole SVG <use> instance trees (#13180)
// Avoid non-left-click bubbling in Firefox (#3861)
if(h&&i.nodeType&&(!a.button||"click"!==a.type))/* jshint eqeqeq: false */
for(;i!=this;i=i.parentNode||this)/* jshint eqeqeq: true */
// Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],
// Don't conflict with Object.prototype properties (#13203)
c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?ea(c,this).index(i)>=0:ea.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}
// Add the remaining (directly-bound) handlers
return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[ea.expando])return a;
// Create a writable copy of the event object and normalize some properties
var b,c,d,e=a.type,f=a,g=this.fixHooks[e];for(g||(this.fixHooks[e]=g=Ha.test(e)?this.mouseHooks:Ga.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new ea.Event(f),b=d.length;b--;)c=d[b],a[c]=f[c];
// Support: IE<9
// Fix target property (#1925)
// Support: Chrome 23+, Safari?
// Target should not be a text node (#504, #13143)
// Support: IE<9
// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
return a.target||(a.target=f.srcElement||oa),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},
// Includes some event props shared by KeyEvent and MouseEvent
props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){
// Add which for key events
return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;
// Calculate pageX/Y if missing and clientX/Y available
// Add relatedTarget, if necessary
// Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||oa,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{
// Prevent triggered image.load events from bubbling to window.load
noBubble:!0},focus:{
// Fire native event if possible so blur/focus sequence is correct
trigger:function(){if(this!==o()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===o()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{
// For checkbox, fire native event so checked state will be right
trigger:function(){return ea.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},
// For cross-browser consistency, don't fire native .click() on links
_default:function(a){return ea.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){
// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){
// Piggyback on a donor event to simulate a different one.
// Fake originalEvent to avoid donor's stopPropagation, but if the
// simulated event prevents default then we do the same on the donor.
var e=ea.extend(new ea.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?ea.event.trigger(e,null,b):ea.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},ea.removeEvent=oa.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(
// #8545, #7054, preventing memory leaks for custom events in IE6-8
// detachEvent needed property on element, by name of that event, to properly expose it to GC
typeof a[d]===xa&&(a[d]=null),a.detachEvent(d,c))},ea.Event=function(a,b){
// Allow instantiation without the 'new' keyword
// Allow instantiation without the 'new' keyword
// Event object
// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
// Support: IE < 9, Android < 4.0
// Put explicitly provided properties onto the event object
// Create a timestamp if incoming event doesn't have one
// Mark it as fixed
return this instanceof ea.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?m:n):this.type=a,b&&ea.extend(this,b),this.timeStamp=a&&a.timeStamp||ea.now(),void(this[ea.expando]=!0)):new ea.Event(a,b)},
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
ea.Event.prototype={isDefaultPrevented:n,isPropagationStopped:n,isImmediatePropagationStopped:n,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=m,a&&(
// If preventDefault exists, run it on the original event
a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=m,a&&(
// If stopPropagation exists, run it on the original event
a.stopPropagation&&a.stopPropagation(),
// Support: IE
// Set the cancelBubble property of the original event to true
a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=m,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},
// Create mouseenter/leave events using mouseover/out and event-time checks
ea.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){ea.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;
// For mousenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
return(!e||e!==d&&!ea.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),
// IE submit delegation
ca.submitBubbles||(ea.event.special.submit={setup:function(){
// Only need this for delegated form submit events
// Only need this for delegated form submit events
// Lazy-add a submit handler when a descendant form may potentially be submitted
return ea.nodeName(this,"form")?!1:void ea.event.add(this,"click._submit keypress._submit",function(a){
// Node name check avoids a VML-related crash in IE (#9807)
var b=a.target,c=ea.nodeName(b,"input")||ea.nodeName(b,"button")?b.form:void 0;c&&!ea._data(c,"submitBubbles")&&(ea.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),ea._data(c,"submitBubbles",!0))})},postDispatch:function(a){
// If form was submitted by the user, bubble the event up the tree
a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&ea.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){
// Only need this for delegated form submit events
// Only need this for delegated form submit events
// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
return ea.nodeName(this,"form")?!1:void ea.event.remove(this,"._submit")}}),
// IE change delegation and checkbox/radio fix
ca.changeBubbles||(ea.event.special.change={setup:function(){
// IE doesn't fire change on a check/radio until blur; trigger it on click
// after a propertychange. Eat the blur-change in special.change.handle.
// This still fires onchange a second time for check/radio after blur.
// Delegated event; lazy-add a change handler on descendant inputs
return Fa.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(ea.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),ea.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),
// Allow triggered, simulated change events (#11500)
ea.event.simulate("change",this,a,!0)})),!1):void ea.event.add(this,"beforeactivate._change",function(a){var b=a.target;Fa.test(b.nodeName)&&!ea._data(b,"changeBubbles")&&(ea.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||ea.event.simulate("change",this.parentNode,a,!0)}),ea._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;
// Swallow native change events from checkbox/radio, we already triggered them above
// Swallow native change events from checkbox/radio, we already triggered them above
return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return ea.event.remove(this,"._change"),!Fa.test(this.nodeName)}}),
// Create "bubbling" focus and blur events
ca.focusinBubbles||ea.each({focus:"focusin",blur:"focusout"},function(a,b){
// Attach a single capturing handler on the document while someone wants focusin/focusout
var c=function(a){ea.event.simulate(b,a.target,ea.event.fix(a),!0)};ea.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=ea._data(d,b);e||d.addEventListener(a,c,!0),ea._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=ea._data(d,b)-1;e?ea._data(d,b,e):(d.removeEventListener(a,c,!0),ea._removeData(d,b))}}}),ea.fn.extend({on:function(a,b,c,d,/*INTERNAL*/e){var f,g;
// Types can be a map of types/handlers
if("object"==typeof a){
// ( types-Object, selector, data )
"string"!=typeof b&&(
// ( types-Object, data )
c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(
// ( types, fn )
d=b,c=b=void 0):null==d&&("string"==typeof b?(
// ( types, selector, fn )
d=c,c=void 0):(
// ( types, data, fn )
d=c,c=b,b=void 0)),d===!1)d=n;else if(!d)return this;
// Use same guid so caller can remove using origFn
return 1===e&&(g=d,d=function(a){
// Can use an empty set, since event contains the info
return ea().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=ea.guid++)),this.each(function(){ea.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)
// ( event )  dispatched jQuery.Event
return d=a.handleObj,ea(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){
// ( types-object [, selector] )
for(e in a)this.off(e,b,a[e]);return this}
// ( types [, fn] )
return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=n),this.each(function(){ea.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){ea.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?ea.event.trigger(a,b,c,!0):void 0}});var Ka="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",La=/ jQuery\d+="(?:null|\d+)"/g,Ma=new RegExp("<(?:"+Ka+")[\\s/>]","i"),Na=/^\s+/,Oa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Pa=/<([\w:]+)/,Qa=/<tbody/i,Ra=/<|&#?\w+;/,Sa=/<(?:script|style|link)/i,
// checked="checked" or checked
Ta=/checked\s*(?:[^=]|=\s*.checked.)/i,Ua=/^$|\/(?:java|ecma)script/i,Va=/^true\/(.*)/,Wa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
// We have to close these tags to support XHTML (#13200)
Xa={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],
// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
_default:ca.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Ya=p(oa),Za=Ya.appendChild(oa.createElement("div"));Xa.optgroup=Xa.option,Xa.tbody=Xa.tfoot=Xa.colgroup=Xa.caption=Xa.thead,Xa.th=Xa.td,ea.extend({clone:function(a,b,c){var d,e,f,g,h,i=ea.contains(a.ownerDocument,a);if(ca.html5Clone||ea.isXMLDoc(a)||!Ma.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Za.innerHTML=a.outerHTML,Za.removeChild(f=Za.firstChild)),!(ca.noCloneEvent&&ca.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||ea.isXMLDoc(a)))
// Fix all IE cloning issues
for(
// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
d=q(f),h=q(a),g=0;null!=(e=h[g]);++g)
// Ensure that the destination node is not null; Fixes #9587
d[g]&&x(e,d[g]);
// Copy the events from the original to the clone
if(b)if(c)for(h=h||q(a),d=d||q(f),g=0;null!=(e=h[g]);g++)w(e,d[g]);else w(a,f);
// Return the cloned set
// Preserve script evaluation history
return d=q(f,"script"),d.length>0&&v(d,!i&&q(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,l=a.length,
// Ensure a safe fragment
m=p(b),n=[],o=0;l>o;o++)if(f=a[o],f||0===f)
// Add nodes directly
if("object"===ea.type(f))ea.merge(n,f.nodeType?[f]:f);else if(Ra.test(f)){for(h=h||m.appendChild(b.createElement("div")),
// Deserialize a standard representation
i=(Pa.exec(f)||["",""])[1].toLowerCase(),k=Xa[i]||Xa._default,h.innerHTML=k[1]+f.replace(Oa,"<$1></$2>")+k[2],
// Descend through wrappers to the right content
e=k[0];e--;)h=h.lastChild;
// Remove IE's autoinserted <tbody> from table fragments
if(
// Manually add leading whitespace removed by IE
!ca.leadingWhitespace&&Na.test(f)&&n.push(b.createTextNode(Na.exec(f)[0])),!ca.tbody)for(
// String was a <table>, *may* have spurious <tbody>
f="table"!==i||Qa.test(f)?
// String was a bare <thead> or <tfoot>
"<table>"!==k[1]||Qa.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;e--;)ea.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j);
// Fix #12392 for oldIE
for(ea.merge(n,h.childNodes),
// Fix #12392 for WebKit and IE > 9
h.textContent="";h.firstChild;)h.removeChild(h.firstChild);
// Remember the top-level container for proper cleanup
h=m.lastChild}else n.push(b.createTextNode(f));for(
// Fix #11356: Clear elements from fragment
h&&m.removeChild(h),
// Reset defaultChecked for any radios and checkboxes
// about to be appended to the DOM in IE 6/7 (#8060)
ca.appendChecked||ea.grep(q(n,"input"),r),o=0;f=n[o++];)
// #4087 - If origin and destination elements are the same, and this is
// that element, do not do anything
if((!d||-1===ea.inArray(f,d))&&(g=ea.contains(f.ownerDocument,f),
// Append to fragment
h=q(m.appendChild(f),"script"),
// Preserve script evaluation history
g&&v(h),c))for(e=0;f=h[e++];)Ua.test(f.type||"")&&c.push(f);return h=null,m},cleanData:function(a,/* internal */b){for(var c,d,e,f,g=0,h=ea.expando,i=ea.cache,j=ca.deleteExpando,k=ea.event.special;null!=(c=a[g]);g++)if((b||ea.acceptData(c))&&(e=c[h],f=e&&i[e])){if(f.events)for(d in f.events)k[d]?ea.event.remove(c,d):ea.removeEvent(c,d,f.handle);
// Remove cache only if it was not already removed by jQuery.event.remove
i[e]&&(delete i[e],
// IE does not allow us to delete expando properties from nodes,
// nor does it have a removeAttribute function on Document nodes;
// we must handle all of these cases
j?delete c[h]:typeof c.removeAttribute!==xa?c.removeAttribute(h):c[h]=null,W.push(e))}}}),ea.fn.extend({text:function(a){return Da(this,function(a){return void 0===a?ea.text(this):this.empty().append((this[0]&&this[0].ownerDocument||oa).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=s(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=s(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?ea.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||ea.cleanData(q(c)),c.parentNode&&(b&&ea.contains(c.ownerDocument,c)&&v(q(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){
// Remove any remaining nodes
for(
// Remove element nodes and prevent memory leaks
1===a.nodeType&&ea.cleanData(q(a,!1));a.firstChild;)a.removeChild(a.firstChild);
// If this is a select, ensure that it displays empty (#12336)
// Support: IE<9
a.options&&ea.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return ea.clone(this,a,b)})},html:function(a){return Da(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(La,""):void 0;
// See if we can take a shortcut and just use innerHTML
if(!("string"!=typeof a||Sa.test(a)||!ca.htmlSerialize&&Ma.test(a)||!ca.leadingWhitespace&&Na.test(a)||Xa[(Pa.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(Oa,"<$1></$2>");try{for(;d>c;c++)
// Remove element nodes and prevent memory leaks
b=this[c]||{},1===b.nodeType&&(ea.cleanData(q(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];
// Force removal if there was no new content (e.g., from empty arguments)
// Make the changes, replacing each context element with the new content
return this.domManip(arguments,function(b){a=this.parentNode,ea.cleanData(q(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){
// Flatten any nested arrays
a=Y.apply([],a);var c,d,e,f,g,h,i=0,j=this.length,k=this,l=j-1,m=a[0],n=ea.isFunction(m);
// We can't cloneNode fragments that contain checked, in WebKit
if(n||j>1&&"string"==typeof m&&!ca.checkClone&&Ta.test(m))return this.each(function(c){var d=k.eq(c);n&&(a[0]=m.call(this,c,d.html())),d.domManip(a,b)});if(j&&(h=ea.buildFragment(a,this[0].ownerDocument,!1,this),c=h.firstChild,1===h.childNodes.length&&(h=c),c)){
// Use the original fragment for the last item instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(f=ea.map(q(h,"script"),t),e=f.length;j>i;i++)d=h,i!==l&&(d=ea.clone(d,!0,!0),
// Keep references to cloned scripts for later restoration
e&&ea.merge(f,q(d,"script"))),b.call(this[i],d,i);if(e)
// Evaluate executable scripts on first document insertion
for(g=f[f.length-1].ownerDocument,
// Reenable scripts
ea.map(f,u),i=0;e>i;i++)d=f[i],Ua.test(d.type||"")&&!ea._data(d,"globalEval")&&ea.contains(g,d)&&(d.src?
// Optional AJAX dependency, but won't run scripts if not present
ea._evalUrl&&ea._evalUrl(d.src):ea.globalEval((d.text||d.textContent||d.innerHTML||"").replace(Wa,"")));
// Fix #11809: Avoid leaking memory
h=c=null}return this}}),ea.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){ea.fn[a]=function(a){for(var c,d=0,e=[],f=ea(a),g=f.length-1;g>=d;d++)c=d===g?this:this.clone(!0),ea(f[d])[b](c),
// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
Z.apply(e,c.get());return this.pushStack(e)}});var $a,_a={};!function(){var a;ca.shrinkWrapBlocks=function(){if(null!=a)return a;
// Will be changed later if needed.
a=!1;
// Minified: var b,c,d
var b,c,d;
// Setup
// Support: IE6
// Check if elements with layout shrink-wrap their children
// Reset CSS: box-sizing; display; margin; border
// Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
return c=oa.getElementsByTagName("body")[0],c&&c.style?(b=oa.createElement("div"),d=oa.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==xa&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(oa.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var ab,bb,cb=/^margin/,db=new RegExp("^("+Aa+")(?!px)[a-z%]+$","i"),eb=/^(top|right|bottom|left)$/;a.getComputedStyle?(ab=function(b){
// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},bb=function(a,b,c){var d,e,f,g,h=a.style;
// Support: IE
// IE returns zIndex value as an integer.
// getPropertyValue is only needed for .css('filter') in IE9, see #12537
// A tribute to the "awesome hack by Dean Edwards"
// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
// Remember the original values
// Put in the new values to get a computed value out
// Revert the changed values
return c=c||ab(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||ea.contains(a.ownerDocument,a)||(g=ea.style(a,b)),db.test(g)&&cb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):oa.documentElement.currentStyle&&(ab=function(a){return a.currentStyle},bb=function(a,b,c){var d,e,f,g,h=a.style;
// Support: IE
// IE returns zIndex value as an integer.
// Avoid setting ret to empty string here
// so we don't default to auto
// From the awesome hack by Dean Edwards
// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
// If we're not dealing with a regular pixel number
// but a number that has a weird ending, we need to convert it to pixels
// but not position css attributes, as those are proportional to the parent element instead
// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
// Remember the original values
// Put in the new values to get a computed value out
// Revert the changed values
return c=c||ab(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),db.test(g)&&!eb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"}),function(){function b(){
// Minified: var b,c,d,j
var b,c,d,e;c=oa.getElementsByTagName("body")[0],c&&c.style&&(
// Setup
b=oa.createElement("div"),d=oa.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText=
// Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
// Support: IE<9
// Assume reasonable values in the absence of getComputedStyle
f=g=!1,i=!0,
// Check for getComputedStyle so that this code is not run in IE<9.
a.getComputedStyle&&(f="1%"!==(a.getComputedStyle(b,null)||{}).top,g="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,
// Support: Android 2.3
// Div with explicit width and no margin-right incorrectly
// gets computed margin-right based on width of container (#3333)
// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
e=b.appendChild(oa.createElement("div")),
// Reset CSS: box-sizing; display; margin; border; padding
e.style.cssText=b.style.cssText=
// Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",e.style.marginRight=e.style.width="0",b.style.width="1px",i=!parseFloat((a.getComputedStyle(e,null)||{}).marginRight),b.removeChild(e)),
// Support: IE8
// Check if table cells still have offsetWidth/Height when they are set
// to display:none and there are still other visible table cells in a
// table row; if so, offsetWidth/Height are not reliable for use when
// determining if an element has been hidden directly using
// display:none (it is still safe to use offsets if a parent element is
// hidden; don safety goggles and see bug #4512 for more information).
b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",e=b.getElementsByTagName("td"),e[0].style.cssText="margin:0;border:0;padding:0;display:none",h=0===e[0].offsetHeight,h&&(e[0].style.display="",e[1].style.display="none",h=0===e[0].offsetHeight),c.removeChild(d))}
// Minified: var b,c,d,e,f,g, h,i
var c,d,e,f,g,h,i;
// Setup
c=oa.createElement("div"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",e=c.getElementsByTagName("a")[0],d=e&&e.style,
// Finish early in limited (non-browser) environments
d&&(d.cssText="float:left;opacity:.5",
// Support: IE<9
// Make sure that element opacity exists (as opposed to filter)
ca.opacity="0.5"===d.opacity,
// Verify style float existence
// (IE uses styleFloat instead of cssFloat)
ca.cssFloat=!!d.cssFloat,c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",ca.clearCloneStyle="content-box"===c.style.backgroundClip,
// Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
ca.boxSizing=""===d.boxSizing||""===d.MozBoxSizing||""===d.WebkitBoxSizing,ea.extend(ca,{reliableHiddenOffsets:function(){return null==h&&b(),h},boxSizingReliable:function(){return null==g&&b(),g},pixelPosition:function(){return null==f&&b(),f},
// Support: Android 2.3
reliableMarginRight:function(){return null==i&&b(),i}}))}(),
// A method for quickly swapping in/out CSS properties to get correct calculations.
ea.swap=function(a,b,c,d){var e,f,g={};
// Remember the old values, and insert the new ones
for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);
// Revert the old values
for(f in b)a.style[f]=g[f];return e};var fb=/alpha\([^)]*\)/i,gb=/opacity\s*=\s*([^)]*)/,
// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
hb=/^(none|table(?!-c[ea]).+)/,ib=new RegExp("^("+Aa+")(.*)$","i"),jb=new RegExp("^([+-])=("+Aa+")","i"),kb={position:"absolute",visibility:"hidden",display:"block"},lb={letterSpacing:"0",fontWeight:"400"},mb=["Webkit","O","Moz","ms"];ea.extend({
// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function(a,b){if(b){
// We should always get a number back from opacity
var c=bb(a,"opacity");return""===c?"1":c}}}},
// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},
// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{
// normalize float css property
"float":ca.cssFloat?"cssFloat":"styleFloat"},
// Get and set the style property on a DOM Node
style:function(a,b,c,d){
// Don't set styles on text and comment nodes
if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){
// Make sure that we're working with the right name
var e,f,g,h=ea.camelCase(b),i=a.style;
// Check if we're setting a value
if(b=ea.cssProps[h]||(ea.cssProps[h]=B(i,h)),
// gets hook for the prefixed version
// followed by the unprefixed version
g=ea.cssHooks[b]||ea.cssHooks[h],void 0===c)
// If a hook was provided get the non-computed value from there
// If a hook was provided get the non-computed value from there
return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];
// Make sure that null and NaN values aren't set. See: #7116
if(f=typeof c,
// convert relative number strings (+= or -=) to relative numbers. #7345
"string"===f&&(e=jb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(ea.css(a,b)),
// Fixes bug #9237
f="number"),null!=c&&c===c&&(
// If a number was passed in, add 'px' to the (except for certain CSS properties)
"number"!==f||ea.cssNumber[h]||(c+="px"),
// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
// but it would mean to define eight (for every problematic property) identical functions
ca.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))
// Support: IE
// Swallow errors from 'invalid' CSS values (#5509)
try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=ea.camelCase(b);
// Return, converting to number if forced or a qualifier was provided and val looks numeric
// Make sure that we're working with the right name
// gets hook for the prefixed version
// followed by the unprefixed version
// If a hook was provided get the computed value from there
// Otherwise, if a way to get the computed value exists, use that
//convert "normal" to computed value
// Return, converting to number if forced or a qualifier was provided and val looks numeric
return b=ea.cssProps[h]||(ea.cssProps[h]=B(a.style,h)),g=ea.cssHooks[b]||ea.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=bb(a,b,d)),"normal"===f&&b in lb&&(f=lb[b]),""===c||c?(e=parseFloat(f),c===!0||ea.isNumeric(e)?e||0:f):f}}),ea.each(["height","width"],function(a,b){ea.cssHooks[b]={get:function(a,c,d){return c?hb.test(ea.css(a,"display"))&&0===a.offsetWidth?ea.swap(a,kb,function(){return F(a,b,d)}):F(a,b,d):void 0},set:function(a,c,d){var e=d&&ab(a);return D(a,c,d?E(a,b,d,ca.boxSizing&&"border-box"===ea.css(a,"boxSizing",!1,e),e):0)}}}),ca.opacity||(ea.cssHooks.opacity={get:function(a,b){
// IE uses filters for opacity
return gb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=ea.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";
// IE has trouble with opacity if it does not have layout
// Force it by setting the zoom level
c.zoom=1,
// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
// if value === "", then remove inline opacity #12685
(b>=1||""===b)&&""===ea.trim(f.replace(fb,""))&&c.removeAttribute&&(
// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
// if "filter:" is present at all, clearType is disabled, we want to avoid this
// style.removeAttribute is IE Only, but so apparently is this code path...
c.removeAttribute("filter"),""===b||d&&!d.filter)||(
// otherwise, set new filter values
c.filter=fb.test(f)?f.replace(fb,e):f+" "+e)}}),ea.cssHooks.marginRight=A(ca.reliableMarginRight,function(a,b){return b?ea.swap(a,{display:"inline-block"},bb,[a,"marginRight"]):void 0}),
// These hooks are used by animate to expand properties
ea.each({margin:"",padding:"",border:"Width"},function(a,b){ea.cssHooks[a+b]={expand:function(c){for(var d=0,e={},
// assumes a single number if not a string
f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+Ba[d]+b]=f[d]||f[d-2]||f[0];return e}},cb.test(a)||(ea.cssHooks[a+b].set=D)}),ea.fn.extend({css:function(a,b){return Da(this,function(a,b,c){var d,e,f={},g=0;if(ea.isArray(b)){for(d=ab(a),e=b.length;e>g;g++)f[b[g]]=ea.css(a,b[g],!1,d);return f}return void 0!==c?ea.style(a,b,c):ea.css(a,b)},a,b,arguments.length>1)},show:function(){return C(this,!0)},hide:function(){return C(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){Ca(this)?ea(this).show():ea(this).hide()})}}),ea.Tween=G,G.prototype={constructor:G,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(ea.cssNumber[c]?"":"px")},cur:function(){var a=G.propHooks[this.prop];return a&&a.get?a.get(this):G.propHooks._default.get(this)},run:function(a){var b,c=G.propHooks[this.prop];return this.options.duration?this.pos=b=ea.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):G.propHooks._default.set(this),this}},G.prototype.init.prototype=G.prototype,G.propHooks={_default:{get:function(a){var b;
// passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails
// so, simple values such as "10px" are parsed to Float.
// complex values such as "rotate(1rad)" are returned as is.
return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=ea.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){
// use step hook for back compat - use cssHook if its there - use .style if its
// available and use plain properties where available
ea.fx.step[a.prop]?ea.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[ea.cssProps[a.prop]]||ea.cssHooks[a.prop])?ea.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},
// Support: IE <=9
// Panic based approach to setting things on disconnected nodes
G.propHooks.scrollTop=G.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},ea.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},ea.fx=G.prototype.init,
// Back Compat <1.8 extension point
ea.fx.step={};var nb,ob,pb=/^(?:toggle|show|hide)$/,qb=new RegExp("^(?:([+-])=|)("+Aa+")([a-z%]*)$","i"),rb=/queueHooks$/,sb=[K],tb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=qb.exec(b),f=e&&e[3]||(ea.cssNumber[a]?"":"px"),
// Starting value computation is required for potential unit mismatches
g=(ea.cssNumber[a]||"px"!==f&&+d)&&qb.exec(ea.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){
// Trust units reported by jQuery.css
f=f||g[3],
// Make sure we update the tween properties later on
e=e||[],
// Iteratively approximate from a nonzero starting point
g=+d||1;do
// If previous iteration zeroed out, double until we get *something*
// Use a string for doubling factor so we don't accidentally see scale as unchanged below
h=h||".5",
// Adjust and apply
g/=h,ea.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}
// Update tween properties
// If a +=/-= token was provided, we're doing a relative animation
return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};ea.Animation=ea.extend(M,{tweener:function(a,b){ea.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],tb[c]=tb[c]||[],tb[c].unshift(b)},prefilter:function(a,b){b?sb.unshift(a):sb.push(a)}}),ea.speed=function(a,b,c){var d=a&&"object"==typeof a?ea.extend({},a):{complete:c||!c&&b||ea.isFunction(a)&&a,duration:a,easing:c&&b||b&&!ea.isFunction(b)&&b};
// normalize opt.queue - true/undefined/null -> "fx"
// Queueing
return d.duration=ea.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in ea.fx.speeds?ea.fx.speeds[d.duration]:ea.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){ea.isFunction(d.old)&&d.old.call(this),d.queue&&ea.dequeue(this,d.queue)},d},ea.fn.extend({fadeTo:function(a,b,c,d){
// show any hidden elements after setting opacity to 0
return this.filter(Ca).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=ea.isEmptyObject(a),f=ea.speed(b,c,d),g=function(){
// Operate on a copy of prop so per-property easing won't be lost
var b=M(this,ea.extend({},a),f);
// Empty animations, or finishing resolves immediately
(e||ea._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=ea.timers,g=ea._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&rb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));
// start the next in the queue if the last step wasn't forced
// timers currently will call their complete callbacks, which will dequeue
// but only if they were gotoEnd
(b||!c)&&ea.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=ea._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=ea.timers,g=d?d.length:0;
// look for any active animations, and finish them
for(
// enable finishing flag on private data
c.finish=!0,
// empty the queue first
ea.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));
// look for any animations in the old queue and finish them
for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);
// turn off finishing flag
delete c.finish})}}),ea.each(["toggle","show","hide"],function(a,b){var c=ea.fn[b];ea.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(I(b,!0),a,d,e)}}),
// Generate shortcuts for custom animations
ea.each({slideDown:I("show"),slideUp:I("hide"),slideToggle:I("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){ea.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),ea.timers=[],ea.fx.tick=function(){var a,b=ea.timers,c=0;for(nb=ea.now();c<b.length;c++)a=b[c],
// Checks the timer has not already been removed
a()||b[c]!==a||b.splice(c--,1);b.length||ea.fx.stop(),nb=void 0},ea.fx.timer=function(a){ea.timers.push(a),a()?ea.fx.start():ea.timers.pop()},ea.fx.interval=13,ea.fx.start=function(){ob||(ob=setInterval(ea.fx.tick,ea.fx.interval))},ea.fx.stop=function(){clearInterval(ob),ob=null},ea.fx.speeds={slow:600,fast:200,
// Default speed
_default:400},
// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
ea.fn.delay=function(a,b){return a=ea.fx?ea.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){
// Minified: var a,b,c,d,e
var a,b,c,d,e;
// Setup
b=oa.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],
// First batch of tests.
c=oa.createElement("select"),e=c.appendChild(oa.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",
// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
ca.getSetAttribute="t"!==b.className,
// Get the style information from getAttribute
// (IE uses .cssText instead)
ca.style=/top/.test(d.getAttribute("style")),
// Make sure that URLs aren't manipulated
// (IE normalizes it by default)
ca.hrefNormalized="/a"===d.getAttribute("href"),
// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
ca.checkOn=!!a.value,
// Make sure that a selected-by-default option has a working selected property.
// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
ca.optSelected=e.selected,
// Tests for enctype support on a form (#6743)
ca.enctype=!!oa.createElement("form").enctype,
// Make sure that the options inside disabled selects aren't marked as disabled
// (WebKit marks them as disabled)
c.disabled=!0,ca.optDisabled=!e.disabled,
// Support: IE8 only
// Check if we can trust getAttribute("value")
a=oa.createElement("input"),a.setAttribute("value",""),ca.input=""===a.getAttribute("value"),
// Check if an input maintains its value after becoming a radio
a.value="t",a.setAttribute("type","radio"),ca.radioValue="t"===a.value}();var ub=/\r/g;ea.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=ea.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,ea(this).val()):a,
// Treat null/undefined as ""; convert numbers to string
null==e?e="":"number"==typeof e?e+="":ea.isArray(e)&&(e=ea.map(e,function(a){return null==a?"":a+""})),b=ea.valHooks[this.type]||ea.valHooks[this.nodeName.toLowerCase()],
// If set returns undefined, fall back to normal setting
b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)
// handle most common string cases
// handle cases where value is null/undef or number
return b=ea.valHooks[e.type]||ea.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ub,""):null==c?"":c)}}}),ea.extend({valHooks:{option:{get:function(a){var b=ea.find.attr(a,"value");
// Support: IE10-11+
// option.text throws exceptions (#14686, #14858)
return null!=b?b:ea.trim(ea.text(a))}},select:{get:function(a){
// Loop through all the selected options
for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)
// oldIE doesn't update selected after form reset (#2551)
if(c=d[i],!(!c.selected&&i!==e||(
// Don't return options that are disabled or in a disabled optgroup
ca.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&ea.nodeName(c.parentNode,"optgroup"))){
// We don't need an array for one selects
if(
// Get the specific value for the option
b=ea(c).val(),f)return b;
// Multi-Selects return an array
g.push(b)}return g},set:function(a,b){for(var c,d,e=a.options,f=ea.makeArray(b),g=e.length;g--;)if(d=e[g],ea.inArray(ea.valHooks.option.get(d),f)>=0)
// Support: IE6
// When new option element is added to select box we need to
// force reflow of newly added node in order to workaround delay
// of initialization properties
try{d.selected=c=!0}catch(h){
// Will be executed only in IE6
d.scrollHeight}else d.selected=!1;
// Force browsers to behave consistently when non-matching value is set
return c||(a.selectedIndex=-1),e}}}}),
// Radios and checkboxes getter/setter
ea.each(["radio","checkbox"],function(){ea.valHooks[this]={set:function(a,b){return ea.isArray(b)?a.checked=ea.inArray(ea(a).val(),b)>=0:void 0}},ca.checkOn||(ea.valHooks[this].get=function(a){
// Support: Webkit
// "" is returned instead of "on" if a value isn't specified
return null===a.getAttribute("value")?"on":a.value})});var vb,wb,xb=ea.expr.attrHandle,yb=/^(?:checked|selected)$/i,zb=ca.getSetAttribute,Ab=ca.input;ea.fn.extend({attr:function(a,b){return Da(this,ea.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){ea.removeAttr(this,a)})}}),ea.extend({attr:function(a,b,c){var d,e,f=a.nodeType;
// don't get/set attributes on text, comment and attribute nodes
if(a&&3!==f&&8!==f&&2!==f)
// Fallback to prop when attributes are not supported
// Fallback to prop when attributes are not supported
// All attributes are lowercase
// Grab necessary hook if one is defined
return typeof a.getAttribute===xa?ea.prop(a,b,c):(1===f&&ea.isXMLDoc(a)||(b=b.toLowerCase(),d=ea.attrHooks[b]||(ea.expr.match.bool.test(b)?wb:vb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=ea.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void ea.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(ta);if(f&&1===a.nodeType)for(;c=f[e++];)d=ea.propFix[c]||c,
// Boolean attributes get special treatment (#10870)
ea.expr.match.bool.test(c)?
// Set corresponding property to false
Ab&&zb||!yb.test(c)?a[d]=!1:a[ea.camelCase("default-"+c)]=a[d]=!1:ea.attr(a,c,""),a.removeAttribute(zb?c:d)},attrHooks:{type:{set:function(a,b){if(!ca.radioValue&&"radio"===b&&ea.nodeName(a,"input")){
// Setting the type on a radio button after the value resets the value in IE6-9
// Reset value to default in case type is set after value during creation
var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),
// Hook for boolean attributes
wb={set:function(a,b,c){
// Remove boolean attributes when set to false
// IE<8 needs the *property* name
return b===!1?ea.removeAttr(a,c):Ab&&zb||!yb.test(c)?a.setAttribute(!zb&&ea.propFix[c]||c,c):a[ea.camelCase("default-"+c)]=a[c]=!0,c}},
// Retrieve booleans specially
ea.each(ea.expr.match.bool.source.match(/\w+/g),function(a,b){var c=xb[b]||ea.find.attr;xb[b]=Ab&&zb||!yb.test(b)?function(a,b,d){var e,f;
// Avoid an infinite loop by temporarily removing this function from the getter
return d||(f=xb[b],xb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,xb[b]=f),e}:function(a,b,c){return c?void 0:a[ea.camelCase("default-"+b)]?b.toLowerCase():null}}),
// fix oldIE attroperties
Ab&&zb||(ea.attrHooks.value={set:function(a,b,c){
// Does not return so that setAttribute is also used
return ea.nodeName(a,"input")?void(a.defaultValue=b):vb&&vb.set(a,b,c)}}),
// IE6/7 do not support getting/setting some attributes with get/setAttribute
zb||(
// Use this for any attribute in IE6/7
// This fixes almost every IE6/7 issue
vb={set:function(a,b,c){
// Set the existing or create a new attribute node
var d=a.getAttributeNode(c);
// Break association with cloned elements by also using setAttribute (#9646)
// Break association with cloned elements by also using setAttribute (#9646)
return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},
// Some attributes are constructed with empty-string values when not defined
xb.id=xb.name=xb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},
// Fixing value retrieval on a button requires this module
ea.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:vb.set},
// Set contenteditable to false on removals(#10429)
// Setting to empty string throws an error as an invalid value
ea.attrHooks.contenteditable={set:function(a,b,c){vb.set(a,""===b?!1:b,c)}},
// Set width and height to auto instead of 0 on empty string( Bug #8150 )
// This is for removals
ea.each(["width","height"],function(a,b){ea.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),ca.style||(ea.attrHooks.style={get:function(a){
// Return undefined in the case of empty string
// Note: IE uppercases css property names, but if we were to .toLowerCase()
// .cssText, that would destroy case senstitivity in URL's, like in "background"
return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var Bb=/^(?:input|select|textarea|button|object)$/i,Cb=/^(?:a|area)$/i;ea.fn.extend({prop:function(a,b){return Da(this,ea.prop,a,b,arguments.length>1)},removeProp:function(a){return a=ea.propFix[a]||a,this.each(function(){
// try/catch handles cases where IE balks (such as removing a property on window)
try{this[a]=void 0,delete this[a]}catch(b){}})}}),ea.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;
// don't get/set properties on text, comment and attribute nodes
if(a&&3!==g&&8!==g&&2!==g)
// Fix name and attach hooks
return f=1!==g||!ea.isXMLDoc(a),f&&(b=ea.propFix[b]||b,e=ea.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){
// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var b=ea.find.attr(a,"tabindex");return b?parseInt(b,10):Bb.test(a.nodeName)||Cb.test(a.nodeName)&&a.href?0:-1}}}}),
// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
ca.hrefNormalized||
// href/src property should get the full normalized URL (#10299/#12915)
ea.each(["href","src"],function(a,b){ea.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),
// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
ca.optSelected||(ea.propHooks.selected={get:function(a){var b=a.parentNode;
// Make sure that it also works with optgroups, see #5701
return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),ea.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ea.propFix[this.toLowerCase()]=this}),
// IE6/7 call enctype encoding
ca.enctype||(ea.propFix.enctype="encoding");var Db=/[\t\r\n\f]/g;ea.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(ea.isFunction(a))return this.each(function(b){ea(this).addClass(a.call(this,b,this.className))});if(j)for(
// The disjunction here is for better compressibility (see removeClass)
b=(a||"").match(ta)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(Db," "):" ")){for(f=0;e=b[f++];)d.indexOf(" "+e+" ")<0&&(d+=e+" ");
// only assign if different to avoid unneeded rendering.
g=ea.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(ea.isFunction(a))return this.each(function(b){ea(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(ta)||[];i>h;h++)if(c=this[h],
// This expression is here for better compressibility (see addClass)
d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(Db," "):"")){for(f=0;e=b[f++];)
// Remove *all* instances
for(;d.indexOf(" "+e+" ")>=0;)d=d.replace(" "+e+" "," ");
// only assign if different to avoid unneeded rendering.
g=a?ea.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(ea.isFunction(a)?function(c){ea(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c)for(
// toggle individual class names
var b,d=0,e=ea(this),f=a.match(ta)||[];b=f[d++];)
// check each className given, space separated list
e.hasClass(b)?e.removeClass(b):e.addClass(b);else(c===xa||"boolean"===c)&&(this.className&&
// store className if set
ea._data(this,"__className__",this.className),
// If the element has a class name or if we're passed "false",
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
this.className=this.className||a===!1?"":ea._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(Db," ").indexOf(b)>=0)return!0;return!1}}),
// Return jQuery for attributes-only inclusion
ea.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){
// Handle event binding
ea.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),ea.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){
// ( namespace ) or ( selector, types [, fn] )
return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var Eb=ea.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;ea.parseJSON=function(b){
// Attempt to parse using the native JSON parser first
if(a.JSON&&a.JSON.parse)
// Support: Android 2.3
// Workaround failure to string-cast null input
return a.JSON.parse(b+"");var c,d=null,e=ea.trim(b+"");
// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
// after removing valid tokens
return e&&!ea.trim(e.replace(Gb,function(a,b,e,f){
// Perform no more replacements after returning to outermost depth
// Force termination if we see a misplaced comma
// Perform no more replacements after returning to outermost depth
// Commas must not follow "[", "{", or ","
// Determine new depth
// array/object open ("[" or "{"): depth += true - false (increment)
// array/object close ("]" or "}"): depth += false - true (decrement)
// other cases ("," or primitive): depth += true - true (numeric cast)
return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():ea.error("Invalid JSON: "+b)},
// Cross-browser xml parsing
ea.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(// Standard
d=new DOMParser,c=d.parseFromString(b,"text/xml")):(// IE
c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||ea.error("Invalid XML: "+b),c};var
// Document location
Hb,Ib,Jb=/#.*$/,Kb=/([?&])_=[^&]*/,Lb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,// IE leaves an \r character at EOL
// #7653, #8125, #8152: local protocol detection
Mb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nb=/^(?:GET|HEAD)$/,Ob=/^\/\//,Pb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
Qb={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
Rb={},
// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
Sb="*/".concat("*");
// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try{Ib=location.href}catch(Tb){
// Use the href attribute of an A element
// since IE will modify it given document.location
Ib=oa.createElement("a"),Ib.href="",Ib=Ib.href}
// Segment location into parts
Hb=Pb.exec(Ib.toLowerCase())||[],ea.extend({
// Counter for holding the number of active queries
active:0,
// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:Ib,type:"GET",isLocal:Mb.test(Hb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
accepts:{"*":Sb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},
// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{
// Convert anything to text
"* text":String,
// Text to html (true = no transformation)
"text html":!0,
// Evaluate text as a json expression
"text json":ea.parseJSON,
// Parse text as xml
"text xml":ea.parseXML},
// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:!0,context:!0}},
// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function(a,b){
// Building a settings object
// Extending ajaxSettings
return b?P(P(a,ea.ajaxSettings),b):P(ea.ajaxSettings,a)},ajaxPrefilter:N(Qb),ajaxTransport:N(Rb),
// Main method
ajax:function(a,b){
// Callback for when everything is done
function c(a,b,c,d){var e,k,r,s,u,w=b;
// Called once
2!==t&&(
// State is "done" now
t=2,
// Clear timeout if it exists
h&&clearTimeout(h),
// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
j=void 0,
// Cache response headers
g=d||"",
// Set readyState
v.readyState=a>0?4:0,
// Determine if successful
e=a>=200&&300>a||304===a,
// Get response data
c&&(s=Q(l,v,c)),
// Convert no matter what (that way responseXXX fields are always set)
s=R(l,s,v,e),
// If successful, handle type chaining
e?(
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
l.ifModified&&(u=v.getResponseHeader("Last-Modified"),u&&(ea.lastModified[f]=u),u=v.getResponseHeader("etag"),u&&(ea.etag[f]=u)),
// if no content
204===a||"HEAD"===l.type?w="nocontent":304===a?w="notmodified":(w=s.state,k=s.data,r=s.error,e=!r)):(
// We extract error from statusText
// then normalize statusText and status for non-aborts
r=w,(a||!w)&&(w="error",0>a&&(a=0))),
// Set data for the fake xhr object
v.status=a,v.statusText=(b||w)+"",
// Success/Error
e?o.resolveWith(m,[k,w,v]):o.rejectWith(m,[v,w,r]),
// Status-dependent callbacks
v.statusCode(q),q=void 0,i&&n.trigger(e?"ajaxSuccess":"ajaxError",[v,l,e?k:r]),
// Complete
p.fireWith(m,[v,w]),i&&(n.trigger("ajaxComplete",[v,l]),
// Handle the global AJAX counter
--ea.active||ea.event.trigger("ajaxStop")))}
// If url is an object, simulate pre-1.5 signature
"object"==typeof a&&(b=a,a=void 0),
// Force options to be an object
b=b||{};var// Cross-domain detection vars
d,
// Loop variable
e,
// URL without anti-cache param
f,
// Response headers as string
g,
// timeout handle
h,
// To know if global events are to be dispatched
i,j,
// Response headers
k,
// Create the final options object
l=ea.ajaxSetup({},b),
// Callbacks context
m=l.context||l,
// Context for global events is callbackContext if it is a DOM node or jQuery collection
n=l.context&&(m.nodeType||m.jquery)?ea(m):ea.event,
// Deferreds
o=ea.Deferred(),p=ea.Callbacks("once memory"),
// Status-dependent callbacks
q=l.statusCode||{},
// Headers (they are sent all at once)
r={},s={},
// The jqXHR state
t=0,
// Default abort message
u="canceled",
// Fake xhr
v={readyState:0,
// Builds headers hashtable if needed
getResponseHeader:function(a){var b;if(2===t){if(!k)for(k={};b=Lb.exec(g);)k[b[1].toLowerCase()]=b[2];b=k[a.toLowerCase()]}return null==b?null:b},
// Raw string
getAllResponseHeaders:function(){return 2===t?g:null},
// Caches the header
setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},
// Overrides response content-type header
overrideMimeType:function(a){return t||(l.mimeType=a),this},
// Status-dependent callbacks
statusCode:function(a){var b;if(a)if(2>t)for(b in a)
// Lazy-add the new callback in a way that preserves old ones
q[b]=[q[b],a[b]];else
// Execute the appropriate callbacks
v.always(a[v.status]);return this},
// Cancel the request
abort:function(a){var b=a||u;return j&&j.abort(b),c(0,b),this}};
// If request was aborted inside a prefilter, stop there
if(
// Attach deferreds
o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,
// Remove hash character (#7531: and string promotion)
// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
l.url=((a||l.url||Ib)+"").replace(Jb,"").replace(Ob,Hb[1]+"//"),
// Alias method option to type as per ticket #12004
l.type=b.method||b.type||l.method||l.type,
// Extract dataTypes list
l.dataTypes=ea.trim(l.dataType||"*").toLowerCase().match(ta)||[""],
// A cross-domain request is in order when we have a protocol:host:port mismatch
null==l.crossDomain&&(d=Pb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Hb[1]&&d[2]===Hb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Hb[3]||("http:"===Hb[1]?"80":"443")))),
// Convert data if not already a string
l.data&&l.processData&&"string"!=typeof l.data&&(l.data=ea.param(l.data,l.traditional)),
// Apply prefilters
O(Qb,l,b,v),2===t)return v;
// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
i=ea.event&&l.global,
// Watch for a new set of requests
i&&0===ea.active++&&ea.event.trigger("ajaxStart"),
// Uppercase the type
l.type=l.type.toUpperCase(),
// Determine if request has content
l.hasContent=!Nb.test(l.type),
// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
f=l.url,
// More options handling for requests with no content
l.hasContent||(
// If data is available, append data to url
l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,
// #9682: remove data so that it's not used in an eventual retry
delete l.data),
// Add anti-cache in url if needed
l.cache===!1&&(l.url=Kb.test(f)?
// If there is already a '_' parameter, set its value
f.replace(Kb,"$1_="+Eb++):
// Otherwise add one to the end
f+(Fb.test(f)?"&":"?")+"_="+Eb++)),
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
l.ifModified&&(ea.lastModified[f]&&v.setRequestHeader("If-Modified-Since",ea.lastModified[f]),ea.etag[f]&&v.setRequestHeader("If-None-Match",ea.etag[f])),
// Set the correct header, if data is being sent
(l.data&&l.hasContent&&l.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",l.contentType),
// Set the Accepts header for the server, depending on the dataType
v.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Sb+"; q=0.01":""):l.accepts["*"]);
// Check for headers option
for(e in l.headers)v.setRequestHeader(e,l.headers[e]);
// Allow custom headers/mimetypes and early abort
if(l.beforeSend&&(l.beforeSend.call(m,v,l)===!1||2===t))
// Abort if not done already and return
return v.abort();
// aborting is no longer a cancellation
u="abort";
// Install callbacks on deferreds
for(e in{success:1,error:1,complete:1})v[e](l[e]);
// If no transport, we auto-abort
if(
// Get transport
j=O(Rb,l,b,v)){v.readyState=1,
// Send global event
i&&n.trigger("ajaxSend",[v,l]),
// Timeout
l.async&&l.timeout>0&&(h=setTimeout(function(){v.abort("timeout")},l.timeout));try{t=1,j.send(r,c)}catch(w){
// Propagate exception as error if not done
if(!(2>t))throw w;c(-1,w)}}else c(-1,"No Transport");return v},getJSON:function(a,b,c){return ea.get(a,b,c,"json")},getScript:function(a,b){return ea.get(a,void 0,b,"script")}}),ea.each(["get","post"],function(a,b){ea[b]=function(a,c,d,e){
// shift arguments if data argument was omitted
return ea.isFunction(c)&&(e=e||d,d=c,c=void 0),ea.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),ea._evalUrl=function(a){return ea.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},ea.fn.extend({wrapAll:function(a){if(ea.isFunction(a))return this.each(function(b){ea(this).wrapAll(a.call(this,b))});if(this[0]){
// The elements to wrap the target around
var b=ea(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){for(var a=this;a.firstChild&&1===a.firstChild.nodeType;)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(ea.isFunction(a)?function(b){ea(this).wrapInner(a.call(this,b))}:function(){var b=ea(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=ea.isFunction(a);return this.each(function(c){ea(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){ea.nodeName(this,"body")||ea(this).replaceWith(this.childNodes)}).end()}}),ea.expr.filters.hidden=function(a){
// Support: Opera <= 12.12
// Opera reports offsetWidths and offsetHeights less than zero on some elements
return a.offsetWidth<=0&&a.offsetHeight<=0||!ca.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||ea.css(a,"display"))},ea.expr.filters.visible=function(a){return!ea.expr.filters.hidden(a)};var Ub=/%20/g,Vb=/\[\]$/,Wb=/\r?\n/g,Xb=/^(?:submit|button|image|reset|file)$/i,Yb=/^(?:input|select|textarea|keygen)/i;
// Serialize an array of form elements or a set of
// key/values into a query string
ea.param=function(a,b){var c,d=[],e=function(a,b){
// If value is a function, invoke it and return its value
b=ea.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};
// If an array was passed in, assume that it is an array of form elements.
if(
// Set traditional to true for jQuery <= 1.3.2 behavior.
void 0===b&&(b=ea.ajaxSettings&&ea.ajaxSettings.traditional),ea.isArray(a)||a.jquery&&!ea.isPlainObject(a))
// Serialize the form elements
ea.each(a,function(){e(this.name,this.value)});else
// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(c in a)S(c,a[c],b,e);
// Return the resulting serialization
return d.join("&").replace(Ub,"+")},ea.fn.extend({serialize:function(){return ea.param(this.serializeArray())},serializeArray:function(){return this.map(function(){
// Can add propHook for "elements" to filter or add form elements
var a=ea.prop(this,"elements");return a?ea.makeArray(a):this}).filter(function(){var a=this.type;
// Use .is(":disabled") so that fieldset[disabled] works
return this.name&&!ea(this).is(":disabled")&&Yb.test(this.nodeName)&&!Xb.test(a)&&(this.checked||!Ea.test(a))}).map(function(a,b){var c=ea(this).val();return null==c?null:ea.isArray(c)?ea.map(c,function(a){return{name:b.name,value:a.replace(Wb,"\r\n")}}):{name:b.name,value:c.replace(Wb,"\r\n")}}).get()}}),
// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
ea.ajaxSettings.xhr=void 0!==a.ActiveXObject?
// Support: IE6+
function(){
// XHR cannot access local files, always use ActiveX for that case
// Support: IE7-8
// oldIE XHR does not support non-RFC2616 methods (#13240)
// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
// Although this check for six methods instead of eight
// since IE also does not support "trace" and "connect"
return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&T()||U()}:
// For all other browsers, use the standard XMLHttpRequest object
T;var Zb=0,$b={},_b=ea.ajaxSettings.xhr();
// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
a.attachEvent&&a.attachEvent("onunload",function(){for(var a in $b)$b[a](void 0,!0)}),
// Determine support properties
ca.cors=!!_b&&"withCredentials"in _b,_b=ca.ajax=!!_b,
// Create transport if the browser can provide an xhr
_b&&ea.ajaxTransport(function(a){
// Cross domain only allowed if supported through XMLHttpRequest
if(!a.crossDomain||ca.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Zb;
// Apply custom fields if provided
if(
// Open the socket
f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];
// Override mime type if needed
a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),
// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");
// Set headers
for(e in c)
// Support: IE<9
// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
// request header to a null-value.
//
// To keep consistent with other XHR implementations, cast the value
// to string and ignore `undefined`.
void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");
// Do send the request
// This may raise an exception which is actually
// handled in jQuery.ajax (so no try/catch here)
f.send(a.hasContent&&a.data||null),
// Listener
b=function(c,e){var h,i,j;
// Was never called and is aborted or complete
if(b&&(e||4===f.readyState))
// Abort manually if needed
if(
// Clean up
delete $b[g],b=void 0,f.onreadystatechange=ea.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,
// Support: IE<10
// Accessing binary-data responseText throws an exception
// (#11426)
"string"==typeof f.responseText&&(j.text=f.responseText);
// Firefox throws an exception when accessing
// statusText for faulty cross-domain requests
try{i=f.statusText}catch(k){
// We normalize with Webkit giving an empty statusText
i=""}
// Filter status for non standard behaviors
// If the request is local and we have data: assume a success
// (success with no data won't get notified, that's the best we
// can do given current implementations)
h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}
// Call complete if needed
j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?
// (IE6 & IE7) if it's in cache and has been
// retrieved directly we need to fire the callback
setTimeout(b):
// Add to the list of active xhr callbacks
f.onreadystatechange=$b[g]=b:
// if we're in sync mode we fire the callback
b()},abort:function(){b&&b(void 0,!0)}}}}),
// Install script dataType
ea.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return ea.globalEval(a),a}}}),
// Handle cache's special case and global
ea.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),
// Bind script tag hack transport
ea.ajaxTransport("script",function(a){
// This transport only deals with cross domain requests
if(a.crossDomain){var b,c=oa.head||ea("head")[0]||oa.documentElement;return{send:function(d,e){b=oa.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,
// Attach handlers for all browsers
b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(
// Handle memory leak in IE
b.onload=b.onreadystatechange=null,
// Remove the script
b.parentNode&&b.parentNode.removeChild(b),
// Dereference the script
b=null,
// Callback if not abort
c||e(200,"success"))},
// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
// Use native DOM manipulation to avoid our domManip AJAX trickery
c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var ac=[],bc=/(=)\?(?=&|$)|\?\?/;
// Default jsonp settings
ea.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=ac.pop()||ea.expando+"_"+Eb++;return this[a]=!0,a}}),
// Detect, normalize options and install callbacks for jsonp requests
ea.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(bc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&bc.test(b.data)&&"data");
// Handle iff the expected data type is "jsonp" or we have a parameter to set
// Handle iff the expected data type is "jsonp" or we have a parameter to set
// Get callback name, remembering preexisting value associated with it
// Insert callback into url or form data
// Use data converter to retrieve json after script execution
// force json dataType
// Install callback
// Clean-up function (fires after converters)
return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=ea.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(bc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||ea.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){
// Restore preexisting value
a[e]=f,
// Save back as free
b[e]&&(
// make sure that re-using the options doesn't screw things around
b.jsonpCallback=c.jsonpCallback,
// save the callback name for future use
ac.push(e)),
// Call if it was a function and we have a response
g&&ea.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),
// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
ea.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||oa;var d=la.exec(a),e=!c&&[];
// Single tag
// Single tag
return d?[b.createElement(d[1])]:(d=ea.buildFragment([a],b,e),e&&e.length&&ea(e).remove(),ea.merge([],d.childNodes))};
// Keep a copy of the old load method
var cc=ea.fn.load;/**
 * Load a url into a page
 */
ea.fn.load=function(a,b,c){if("string"!=typeof a&&cc)return cc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");
// If it's a function
// We assume that it's the callback
// If we have elements to modify, make the request
return h>=0&&(d=ea.trim(a.slice(h,a.length)),a=a.slice(0,h)),ea.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&ea.ajax({url:a,
// if "type" variable is undefined, then "GET" method will be used
type:f,dataType:"html",data:b}).done(function(a){
// Save response for use in complete callback
e=arguments,g.html(d?
// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
ea("<div>").append(ea.parseHTML(a)).find(d):
// Otherwise use the full result
a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},
// Attach a bunch of functions for handling common AJAX events
ea.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){ea.fn[b]=function(a){return this.on(b,a)}}),ea.expr.filters.animated=function(a){return ea.grep(ea.timers,function(b){return a===b.elem}).length};var dc=a.document.documentElement;ea.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=ea.css(a,"position"),l=ea(a),m={};
// set position first, in-case top/left are set even on static elem
"static"===k&&(a.style.position="relative"),h=l.offset(),f=ea.css(a,"top"),i=ea.css(a,"left"),j=("absolute"===k||"fixed"===k)&&ea.inArray("auto",[f,i])>-1,
// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),ea.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},ea.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){ea.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)
// Make sure it's not a disconnected DOM node
// Make sure it's not a disconnected DOM node
// If we don't have gBCR, just use 0,0 rather than error
// BlackBerry 5, iOS 3 (original iPhone)
return b=f.documentElement,ea.contains(b,e)?(typeof e.getBoundingClientRect!==xa&&(d=e.getBoundingClientRect()),c=V(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];
// Subtract parent offsets and element margins
// note: when an element has margin: auto the offsetLeft and marginLeft
// are the same in Safari causing offset.left to incorrectly be 0
// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
// we assume that getBoundingClientRect is available when computed position is fixed
// Get *real* offsetParent
// Get correct offsets
// Add offsetParent borders
return"fixed"===ea.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),ea.nodeName(a[0],"html")||(c=a.offset()),c.top+=ea.css(a[0],"borderTopWidth",!0),c.left+=ea.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-ea.css(d,"marginTop",!0),left:b.left-c.left-ea.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||dc;a&&!ea.nodeName(a,"html")&&"static"===ea.css(a,"position");)a=a.offsetParent;return a||dc})}}),
// Create scrollLeft and scrollTop methods
ea.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);ea.fn[a]=function(d){return Da(this,function(a,d,e){var f=V(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?ea(f).scrollLeft():e,c?e:ea(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
ea.each(["top","left"],function(a,b){ea.cssHooks[b]=A(ca.pixelPosition,function(a,c){return c?(c=bb(a,b),db.test(c)?ea(a).position()[b]+"px":c):void 0})}),
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
ea.each({Height:"height",Width:"width"},function(a,b){ea.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){
// margin is only for outerHeight, outerWidth
ea.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Da(this,function(b,c,d){var e;
// Get document width or height
// Get width or height on the element, requesting but not forcing parseFloat
// Set width or height on the element
return ea.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?ea.css(b,c,g):ea.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),
// The number of elements contained in the matched element set
ea.fn.size=function(){return this.length},ea.fn.andSelf=ea.fn.addBack,
// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
"function"==typeof define&&define.amd&&define("jquery",[],function(){return ea});var
// Map over jQuery in case of overwrite
ec=a.jQuery,
// Map over the $ in case of overwrite
fc=a.$;
// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
return ea.noConflict=function(b){return a.$===ea&&(a.$=fc),b&&a.jQuery===ea&&(a.jQuery=ec),ea},typeof b===xa&&(a.jQuery=a.$=ea),ea}),/**
 * @license AngularJS v1.3.15
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
function(a,b,c){"use strict";/**
 * @description
 *
 * This object provides a utility for producing rich Error messages within
 * Angular. It can be called as follows:
 *
 * var exampleMinErr = minErr('example');
 * throw exampleMinErr('one', 'This {0} is {1}', foo, bar);
 *
 * The above creates an instance of minErr in the example namespace. The
 * resulting error will have a namespaced error code of example.one.  The
 * resulting error will replace {0} with the value of foo, and {1} with the
 * value of bar. The object is not restricted in the number of arguments it can
 * take.
 *
 * If fewer arguments are specified than necessary for interpolation, the extra
 * interpolation markers will be preserved in the final string.
 *
 * Since data will be parsed statically during a build step, some restrictions
 * are applied with respect to how minErr instances are created and called.
 * Instances should have names of the form namespaceMinErr for a minErr created
 * using minErr('namespace') . Error codes, namespaces and template strings
 * should all be static strings, not variables or general expressions.
 *
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */
function d(a,b){return b=b||Error,function(){var c,d,e=arguments[0],f="["+(a?a+":":"")+e+"] ",g=arguments[1],h=arguments;for(c=f+g.replace(/\{\d+\}/g,function(a){var b=+a.slice(1,-1);return b+2<h.length?ma(h[b+2]):a}),c=c+"\nhttp://errors.angularjs.org/1.3.15/"+(a?a+"/":"")+e,d=2;d<arguments.length;d++)c=c+(2==d?"?":"&")+"p"+(d-2)+"="+encodeURIComponent(ma(arguments[d]));return new b(c)}}/**
 * @private
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
 *                   String ...)
 */
function e(a){if(null==a||z(a))return!1;var b=a.length;return a.nodeType===sd&&b?!0:u(a)||ld(a)||0===b||"number"==typeof b&&b>0&&b-1 in a}/**
 * @ngdoc function
 * @name angular.forEach
 * @module ng
 * @kind function
 *
 * @description
 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
 * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
 * is the value of an object property or an array element, `key` is the object property key or
 * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
 *
 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
 * using the `hasOwnProperty` method.
 *
 * Unlike ES262's
 * [Array.prototype.forEach](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18),
 * Providing 'undefined' or 'null' values for `obj` will not throw a TypeError, but rather just
 * return the value provided.
 *
   ```js
     var values = {name: 'misko', gender: 'male'};
     var log = [];
     angular.forEach(values, function(value, key) {
       this.push(key + ': ' + value);
     }, log);
     expect(log).toEqual(['name: misko', 'gender: male']);
   ```
 *
 * @param {Object|Array} obj Object to iterate over.
 * @param {Function} iterator Iterator function.
 * @param {Object=} context Object to become context (`this`) for the iterator function.
 * @returns {Object|Array} Reference to `obj`.
 */
function f(a,b,c){var d,g;if(a)if(x(a))for(d in a)
// Need to check if hasOwnProperty exists,
// as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
"prototype"==d||"length"==d||"name"==d||a.hasOwnProperty&&!a.hasOwnProperty(d)||b.call(c,a[d],d,a);else if(ld(a)||e(a)){var h="object"!=typeof a;for(d=0,g=a.length;g>d;d++)(h||d in a)&&b.call(c,a[d],d,a)}else if(a.forEach&&a.forEach!==f)a.forEach(b,c,a);else for(d in a)a.hasOwnProperty(d)&&b.call(c,a[d],d,a);return a}function g(a){return Object.keys(a).sort()}function h(a,b,c){for(var d=g(a),e=0;e<d.length;e++)b.call(c,a[d[e]],d[e]);return d}/**
 * when using forEach the params are value, key, but it is often useful to have key, value.
 * @param {function(string, *)} iteratorFn
 * @returns {function(*, string)}
 */
function i(a){return function(b,c){a(c,b)}}/**
 * A consistent way of creating unique IDs in angular.
 *
 * Using simple numbers allows us to generate 28.6 million unique ids per second for 10 years before
 * we hit number precision issues in JavaScript.
 *
 * Math.pow(2,53) / 60 / 60 / 24 / 365 / 10 = 28.6M
 *
 * @returns {number} an unique alpha-numeric string
 */
function j(){return++jd}/**
 * Set or clear the hashkey for an object.
 * @param obj object
 * @param h the hashkey (!truthy to delete the hashkey)
 */
function k(a,b){b?a.$$hashKey=b:delete a.$$hashKey}/**
 * @ngdoc function
 * @name angular.extend
 * @module ng
 * @kind function
 *
 * @description
 * Extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
 * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
 * by passing an empty object as the target: `var object = angular.extend({}, object1, object2)`.
 * Note: Keep in mind that `angular.extend` does not support recursive merge (deep copy).
 *
 * @param {Object} dst Destination object.
 * @param {...Object} src Source object(s).
 * @returns {Object} Reference to `dst`.
 */
function l(a){for(var b=a.$$hashKey,c=1,d=arguments.length;d>c;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;h>g;g++){var i=f[g];a[i]=e[i]}}return k(a,b),a}function m(a){return parseInt(a,10)}function n(a,b){return l(Object.create(a),b)}/**
 * @ngdoc function
 * @name angular.noop
 * @module ng
 * @kind function
 *
 * @description
 * A function that performs no operations. This function can be useful when writing code in the
 * functional style.
   ```js
     function foo(callback) {
       var result = calculateResult();
       (callback || angular.noop)(result);
     }
   ```
 */
function o(){}/**
 * @ngdoc function
 * @name angular.identity
 * @module ng
 * @kind function
 *
 * @description
 * A function that returns its first argument. This function is useful when writing code in the
 * functional style.
 *
   ```js
     function transformer(transformationFn, value) {
       return (transformationFn || angular.identity)(value);
     };
   ```
  * @param {*} value to be returned.
  * @returns {*} the value passed in.
 */
function p(a){return a}function q(a){return function(){return a}}/**
 * @ngdoc function
 * @name angular.isUndefined
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
function r(a){return"undefined"==typeof a}/**
 * @ngdoc function
 * @name angular.isDefined
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is defined.
 */
function s(a){return"undefined"!=typeof a}/**
 * @ngdoc function
 * @name angular.isObject
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects. Note that JavaScript arrays are objects.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Object` but not `null`.
 */
function t(a){
// http://jsperf.com/isobject4
return null!==a&&"object"==typeof a}/**
 * @ngdoc function
 * @name angular.isString
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
function u(a){return"string"==typeof a}/**
 * @ngdoc function
 * @name angular.isNumber
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `Number`.
 *
 * This includes the "special" numbers `NaN`, `+Infinity` and `-Infinity`.
 *
 * If you wish to exclude these then you can use the native
 * [`isFinite'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
 * method.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Number`.
 */
function v(a){return"number"==typeof a}/**
 * @ngdoc function
 * @name angular.isDate
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a value is a date.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Date`.
 */
function w(a){return"[object Date]"===gd.call(a)}/**
 * @ngdoc function
 * @name angular.isFunction
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function x(a){return"function"==typeof a}/**
 * Determines if a value is a regular expression object.
 *
 * @private
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `RegExp`.
 */
function y(a){return"[object RegExp]"===gd.call(a)}/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
function z(a){return a&&a.window===a}function A(a){return a&&a.$evalAsync&&a.$watch}function B(a){return"[object File]"===gd.call(a)}function C(a){return"[object FormData]"===gd.call(a)}function D(a){return"[object Blob]"===gd.call(a)}function E(a){return"boolean"==typeof a}function F(a){return a&&x(a.then)}/**
 * @ngdoc function
 * @name angular.isElement
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a DOM element (or wrapped jQuery element).
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a DOM element (or wrapped jQuery element).
 */
function G(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}/**
 * @param str 'key1,key2,...'
 * @returns {object} in the form of {key1:true, key2:true, ...}
 */
function H(a){var b,c={},d=a.split(",");for(b=0;b<d.length;b++)c[d[b]]=!0;return c}function I(a){return Wc(a.nodeName||a[0]&&a[0].nodeName)}function J(a,b){var c=a.indexOf(b);return c>=0&&a.splice(c,1),b}/**
 * @ngdoc function
 * @name angular.copy
 * @module ng
 * @kind function
 *
 * @description
 * Creates a deep copy of `source`, which should be an object or an array.
 *
 * * If no destination is supplied, a copy of the object or array is created.
 * * If a destination is provided, all of its elements (for arrays) or properties (for objects)
 *   are deleted and then all elements/properties from the source are copied to it.
 * * If `source` is not an object or array (inc. `null` and `undefined`), `source` is returned.
 * * If `source` is identical to 'destination' an exception will be thrown.
 *
 * @param {*} source The source that will be used to make a copy.
 *                   Can be any type, including primitives, `null`, and `undefined`.
 * @param {(Object|Array)=} destination Destination into which the source is copied. If
 *     provided, must be of the same type as `source`.
 * @returns {*} The copy or updated `destination`, if `destination` was specified.
 *
 * @example
 <example module="copyExample">
 <file name="index.html">
 <div ng-controller="ExampleController">
 <form novalidate class="simple-form">
 Name: <input type="text" ng-model="user.name" /><br />
 E-mail: <input type="email" ng-model="user.email" /><br />
 Gender: <input type="radio" ng-model="user.gender" value="male" />male
 <input type="radio" ng-model="user.gender" value="female" />female<br />
 <button ng-click="reset()">RESET</button>
 <button ng-click="update(user)">SAVE</button>
 </form>
 <pre>form = {{user | json}}</pre>
 <pre>master = {{master | json}}</pre>
 </div>

 <script>
  angular.module('copyExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
      $scope.master= {};

      $scope.update = function(user) {
        // Example with 1 argument
        $scope.master= angular.copy(user);
      };

      $scope.reset = function() {
        // Example with 2 arguments
        angular.copy($scope.master, $scope.user);
      };

      $scope.reset();
    }]);
 </script>
 </file>
 </example>
 */
function K(a,b,c,d){if(z(a)||A(a))throw hd("cpws","Can't copy! Making copies of Window or Scope instances is not supported.");if(b){if(a===b)throw hd("cpi","Can't copy! Source and destination are identical.");if(c=c||[],d=d||[],t(a)){var e=c.indexOf(a);if(-1!==e)return d[e];c.push(a),d.push(b)}var g;if(ld(a)){b.length=0;for(var h=0;h<a.length;h++)g=K(a[h],null,c,d),t(a[h])&&(c.push(a[h]),d.push(g)),b.push(g)}else{var i=b.$$hashKey;ld(b)?b.length=0:f(b,function(a,c){delete b[c]});for(var j in a)a.hasOwnProperty(j)&&(g=K(a[j],null,c,d),t(a[j])&&(c.push(a[j]),d.push(g)),b[j]=g);k(b,i)}}else if(b=a,a)if(ld(a))b=K(a,[],c,d);else if(w(a))b=new Date(a.getTime());else if(y(a))b=new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),b.lastIndex=a.lastIndex;else if(t(a)){var l=Object.create(Object.getPrototypeOf(a));b=K(a,l,c,d)}return b}/**
 * Creates a shallow copy of an object, an array or a primitive.
 *
 * Assumes that there are no proto properties for objects.
 */
function L(a,b){if(ld(a)){b=b||[];for(var c=0,d=a.length;d>c;c++)b[c]=a[c]}else if(t(a)){b=b||{};for(var e in a)("$"!==e.charAt(0)||"$"!==e.charAt(1))&&(b[e]=a[e])}return b||a}/**
 * @ngdoc function
 * @name angular.equals
 * @module ng
 * @kind function
 *
 * @description
 * Determines if two objects or two values are equivalent. Supports value types, regular
 * expressions, arrays and objects.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `angular.equals`.
 * * Both values are NaN. (In JavaScript, NaN == NaN => false. But we consider two NaN as equal)
 * * Both values represent the same regular expression (In JavaScript,
 *   /abc/ == /abc/ => false. But we consider two regular expressions as equal when their textual
 *   representation matches).
 *
 * During a property comparison, properties of `function` type and properties with names
 * that begin with `$` are ignored.
 *
 * Scope and DOMWindow objects are being compared only by identify (`===`).
 *
 * @param {*} o1 Object or value to compare.
 * @param {*} o2 Object or value to compare.
 * @returns {boolean} True if arguments are equal.
 */
function M(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;// NaN === NaN
var d,e,f,g=typeof a,h=typeof b;if(g==h&&"object"==g){if(!ld(a)){if(w(a))return w(b)?M(a.getTime(),b.getTime()):!1;if(y(a))return y(b)?a.toString()==b.toString():!1;if(A(a)||A(b)||z(a)||z(b)||ld(b)||w(b)||y(b))return!1;f={};for(e in a)if("$"!==e.charAt(0)&&!x(a[e])){if(!M(a[e],b[e]))return!1;f[e]=!0}for(e in b)if(!f.hasOwnProperty(e)&&"$"!==e.charAt(0)&&b[e]!==c&&!x(b[e]))return!1;return!0}if(!ld(b))return!1;if((d=a.length)==b.length){for(e=0;d>e;e++)if(!M(a[e],b[e]))return!1;return!0}}return!1}function N(a,b,c){return a.concat(dd.call(b,c))}function O(a,b){return dd.call(a,b||0)}/* jshint -W101 */
/**
 * @ngdoc function
 * @name angular.bind
 * @module ng
 * @kind function
 *
 * @description
 * Returns a function which calls function `fn` bound to `self` (`self` becomes the `this` for
 * `fn`). You can supply optional `args` that are prebound to the function. This feature is also
 * known as [partial application](http://en.wikipedia.org/wiki/Partial_application), as
 * distinguished from [function currying](http://en.wikipedia.org/wiki/Currying#Contrast_with_partial_function_application).
 *
 * @param {Object} self Context which `fn` should be evaluated in.
 * @param {function()} fn Function to be bound.
 * @param {...*} args Optional arguments to be prebound to the `fn` function call.
 * @returns {function()} Function that wraps the `fn` with all the specified bindings.
 */
/* jshint +W101 */
function P(a,b){var c=arguments.length>2?O(arguments,2):[];return!x(b)||b instanceof RegExp?b:c.length?function(){return arguments.length?b.apply(a,N(c,arguments,0)):b.apply(a,c)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function Q(a,d){var e=d;return"string"==typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?e=c:z(d)?e="$WINDOW":d&&b===d?e="$DOCUMENT":A(d)&&(e="$SCOPE"),e}/**
 * @ngdoc function
 * @name angular.toJson
 * @module ng
 * @kind function
 *
 * @description
 * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
 * stripped since angular uses this notation internally.
 *
 * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
 * @param {boolean|number=} pretty If set to true, the JSON output will contain newlines and whitespace.
 *    If set to an integer, the JSON output will contain that many spaces per indentation (the default is 2).
 * @returns {string|undefined} JSON-ified string representing `obj`.
 */
function R(a,b){return"undefined"==typeof a?c:(v(b)||(b=b?2:null),JSON.stringify(a,Q,b))}/**
 * @ngdoc function
 * @name angular.fromJson
 * @module ng
 * @kind function
 *
 * @description
 * Deserializes a JSON string.
 *
 * @param {string} json JSON string to deserialize.
 * @returns {Object|Array|string|number} Deserialized JSON string.
 */
function S(a){return u(a)?JSON.parse(a):a}/**
 * @returns {string} Returns the string representation of the element.
 */
function T(a){a=ad(a).clone();try{
// turns out IE does not let you set .html() on elements which
// are not allowed to have children. So we just ignore it.
a.empty()}catch(b){}var c=ad("<div>").append(a).html();try{return a[0].nodeType===td?Wc(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+Wc(b)})}catch(b){return Wc(c)}}
/////////////////////////////////////////////////
/**
 * Tries to decode the URI component without throwing an exception.
 *
 * @private
 * @param str value potential URI component to check.
 * @returns {boolean} True if `value` can be decoded
 * with the decodeURIComponent function.
 */
function U(a){try{return decodeURIComponent(a)}catch(b){}}/**
 * Parses an escaped url query string into key-value pairs.
 * @returns {Object.<string,boolean|Array>}
 */
function V(/**string*/a){var b,c,d={};return f((a||"").split("&"),function(a){if(a&&(b=a.replace(/\+/g,"%20").split("="),c=U(b[0]),s(c))){var e=s(b[1])?U(b[1]):!0;Xc.call(d,c)?ld(d[c])?d[c].push(e):d[c]=[d[c],e]:d[c]=e}}),d}function W(a){var b=[];return f(a,function(a,c){ld(a)?f(a,function(a){b.push(Y(c,!0)+(a===!0?"":"="+Y(a,!0)))}):b.push(Y(c,!0)+(a===!0?"":"="+Y(a,!0)))}),b.length?b.join("&"):""}/**
 * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
 * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set (pchar) allowed in path
 * segments:
 *    segment       = *pchar
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
function X(a){return Y(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}/**
 * This method is intended for encoding *key* or *value* parts of query component. We need a custom
 * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
 * encoded per http://tools.ietf.org/html/rfc3986:
 *    query       = *( pchar / "/" / "?" )
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
function Y(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function Z(a,b){var c,d,e=pd.length;for(a=ad(a),d=0;e>d;++d)if(c=pd[d]+b,u(c=a.attr(c)))return c;return null}/**
 * @ngdoc directive
 * @name ngApp
 * @module ng
 *
 * @element ANY
 * @param {angular.Module} ngApp an optional application
 *   {@link angular.module module} name to load.
 * @param {boolean=} ngStrictDi if this attribute is present on the app element, the injector will be
 *   created in "strict-di" mode. This means that the application will fail to invoke functions which
 *   do not use explicit function annotation (and are thus unsuitable for minification), as described
 *   in {@link guide/di the Dependency Injection guide}, and useful debugging info will assist in
 *   tracking down the root of these bugs.
 *
 * @description
 *
 * Use this directive to **auto-bootstrap** an AngularJS application. The `ngApp` directive
 * designates the **root element** of the application and is typically placed near the root element
 * of the page - e.g. on the `<body>` or `<html>` tags.
 *
 * Only one AngularJS application can be auto-bootstrapped per HTML document. The first `ngApp`
 * found in the document will be used to define the root element to auto-bootstrap as an
 * application. To run multiple applications in an HTML document you must manually bootstrap them using
 * {@link angular.bootstrap} instead. AngularJS applications cannot be nested within each other.
 *
 * You can specify an **AngularJS module** to be used as the root module for the application.  This
 * module will be loaded into the {@link auto.$injector} when the application is bootstrapped. It
 * should contain the application code needed or have dependencies on other modules that will
 * contain the code. See {@link angular.module} for more information.
 *
 * In the example below if the `ngApp` directive were not placed on the `html` element then the
 * document would not be compiled, the `AppController` would not be instantiated and the `{{ a+b }}`
 * would not be resolved to `3`.
 *
 * `ngApp` is the easiest, and most common way to bootstrap an application.
 *
 <example module="ngAppDemo">
   <file name="index.html">
   <div ng-controller="ngAppDemoController">
     I can add: {{a}} + {{b}} =  {{ a+b }}
   </div>
   </file>
   <file name="script.js">
   angular.module('ngAppDemo', []).controller('ngAppDemoController', function($scope) {
     $scope.a = 1;
     $scope.b = 2;
   });
   </file>
 </example>
 *
 * Using `ngStrictDi`, you would see something like this:
 *
 <example ng-app-included="true">
   <file name="index.html">
   <div ng-app="ngAppStrictDemo" ng-strict-di>
       <div ng-controller="GoodController1">
           I can add: {{a}} + {{b}} =  {{ a+b }}

           <p>This renders because the controller does not fail to
              instantiate, by using explicit annotation style (see
              script.js for details)
           </p>
       </div>

       <div ng-controller="GoodController2">
           Name: <input ng-model="name"><br />
           Hello, {{name}}!

           <p>This renders because the controller does not fail to
              instantiate, by using explicit annotation style
              (see script.js for details)
           </p>
       </div>

       <div ng-controller="BadController">
           I can add: {{a}} + {{b}} =  {{ a+b }}

           <p>The controller could not be instantiated, due to relying
              on automatic function annotations (which are disabled in
              strict mode). As such, the content of this section is not
              interpolated, and there should be an error in your web console.
           </p>
       </div>
   </div>
   </file>
   <file name="script.js">
   angular.module('ngAppStrictDemo', [])
     // BadController will fail to instantiate, due to relying on automatic function annotation,
     // rather than an explicit annotation
     .controller('BadController', function($scope) {
       $scope.a = 1;
       $scope.b = 2;
     })
     // Unlike BadController, GoodController1 and GoodController2 will not fail to be instantiated,
     // due to using explicit annotations using the array style and $inject property, respectively.
     .controller('GoodController1', ['$scope', function($scope) {
       $scope.a = 1;
       $scope.b = 2;
     }])
     .controller('GoodController2', GoodController2);
     function GoodController2($scope) {
       $scope.name = "World";
     }
     GoodController2.$inject = ['$scope'];
   </file>
   <file name="style.css">
   div[ng-controller] {
       margin-bottom: 1em;
       -webkit-border-radius: 4px;
       border-radius: 4px;
       border: 1px solid;
       padding: .5em;
   }
   div[ng-controller^=Good] {
       border-color: #d6e9c6;
       background-color: #dff0d8;
       color: #3c763d;
   }
   div[ng-controller^=Bad] {
       border-color: #ebccd1;
       background-color: #f2dede;
       color: #a94442;
       margin-bottom: 0;
   }
   </file>
 </example>
 */
function $(a,b){var c,d,e={};
// The element `element` has priority over any other element
f(pd,function(b){var e=b+"app";!c&&a.hasAttribute&&a.hasAttribute(e)&&(c=a,d=a.getAttribute(e))}),f(pd,function(b){var e,f=b+"app";!c&&(e=a.querySelector("["+f.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(f))}),c&&(e.strictDi=null!==Z(c,"strict-di"),b(c,d?[d]:[],e))}/**
 * @ngdoc function
 * @name angular.bootstrap
 * @module ng
 * @description
 * Use this function to manually start up angular application.
 *
 * See: {@link guide/bootstrap Bootstrap}
 *
 * Note that Protractor based end-to-end tests cannot use this function to bootstrap manually.
 * They must use {@link ng.directive:ngApp ngApp}.
 *
 * Angular will detect if it has been loaded into the browser more than once and only allow the
 * first loaded script to be bootstrapped and will report a warning to the browser console for
 * each of the subsequent scripts. This prevents strange results in applications, where otherwise
 * multiple instances of Angular try to work on the DOM.
 *
 * ```html
 * <!doctype html>
 * <html>
 * <body>
 * <div ng-controller="WelcomeController">
 *   {{greeting}}
 * </div>
 *
 * <script src="angular.js"></script>
 * <script>
 *   var app = angular.module('demo', [])
 *   .controller('WelcomeController', function($scope) {
 *       $scope.greeting = 'Welcome!';
 *   });
 *   angular.bootstrap(document, ['demo']);
 * </script>
 * </body>
 * </html>
 * ```
 *
 * @param {DOMElement} element DOM element which is the root of angular application.
 * @param {Array<String|Function|Array>=} modules an array of modules to load into the application.
 *     Each item in the array should be the name of a predefined module or a (DI annotated)
 *     function that will be invoked by the injector as a `config` block.
 *     See: {@link angular.module modules}
 * @param {Object=} config an object for defining configuration options for the application. The
 *     following keys are supported:
 *
 * * `strictDi` - disable automatic function annotation for the application. This is meant to
 *   assist in finding bugs which break minified code. Defaults to `false`.
 *
 * @returns {auto.$injector} Returns the newly created injector for this app.
 */
function _(c,d,e){t(e)||(e={});var g={strictDi:!1};e=l(g,e);var h=function(){if(c=ad(c),c.injector()){var a=c[0]===b?"document":T(c);
//Encode angle brackets to prevent input from being sanitized to empty string #8683
throw hd("btstrpd","App Already Bootstrapped with this Element '{0}'",a.replace(/</,"&lt;").replace(/>/,"&gt;"))}d=d||[],d.unshift(["$provide",function(a){a.value("$rootElement",c)}]),e.debugInfoEnabled&&
// Pushing so that this overrides `debugInfoEnabled` setting defined in user's `modules`.
d.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]),d.unshift("ng");var f=Sa(d,e.strictDi);return f.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d),c(b)(a)})}]),f},i=/^NG_ENABLE_DEBUG_INFO!/,j=/^NG_DEFER_BOOTSTRAP!/;return a&&i.test(a.name)&&(e.debugInfoEnabled=!0,a.name=a.name.replace(i,"")),a&&!j.test(a.name)?h():(a.name=a.name.replace(j,""),id.resumeBootstrap=function(a){return f(a,function(a){d.push(a)}),h()},void(x(id.resumeDeferredBootstrap)&&id.resumeDeferredBootstrap()))}/**
 * @ngdoc function
 * @name angular.reloadWithDebugInfo
 * @module ng
 * @description
 * Use this function to reload the current application with debug information turned on.
 * This takes precedence over a call to `$compileProvider.debugInfoEnabled(false)`.
 *
 * See {@link ng.$compileProvider#debugInfoEnabled} for more.
 */
function aa(){a.name="NG_ENABLE_DEBUG_INFO!"+a.name,a.location.reload()}/**
 * @name angular.getTestability
 * @module ng
 * @description
 * Get the testability service for the instance of Angular on the given
 * element.
 * @param {DOMElement} element DOM element which is the root of angular application.
 */
function ba(a){var b=id.element(a).injector();if(!b)throw hd("test","no injector found for element argument to getTestability");return b.get("$$testability")}function ca(a,b){return b=b||"_",a.replace(qd,function(a,c){return(c?b:"")+a.toLowerCase()})}function da(){var b;rd||(
// bind to jQuery if present;
bd=a.jQuery,
// Use jQuery if it exists with proper functionality, otherwise default to us.
// Angular 1.2+ requires jQuery 1.7+ for on()/off() support.
// Angular 1.3+ technically requires at least jQuery 2.1+ but it may work with older
// versions. It will not work for sure with jQuery <1.7, though.
bd&&bd.fn.on?(ad=bd,l(bd.fn,{scope:Ld.scope,isolateScope:Ld.isolateScope,controller:Ld.controller,injector:Ld.injector,inheritedData:Ld.inheritedData}),
// All nodes removed from the DOM via various jQuery APIs like .remove()
// are passed through jQuery.cleanData. Monkey-patch this method to fire
// the $destroy event on all removed nodes.
b=bd.cleanData,bd.cleanData=function(a){var c;if(kd)kd=!1;else for(var d,e=0;null!=(d=a[e]);e++)c=bd._data(d,"events"),c&&c.$destroy&&bd(d).triggerHandler("$destroy");b(a)}):ad=ua,id.element=ad,
// Prevent double-proxying.
rd=!0)}/**
 * throw error if the argument is falsy.
 */
function ea(a,b,c){if(!a)throw hd("areq","Argument '{0}' is {1}",b||"?",c||"required");return a}function fa(a,b,c){return c&&ld(a)&&(a=a[a.length-1]),ea(x(a),b,"not a function, got "+(a&&"object"==typeof a?a.constructor.name||"Object":typeof a)),a}/**
 * throw error if the name given is hasOwnProperty
 * @param  {String} name    the name to test
 * @param  {String} context the context in which the name is used, such as module or directive
 */
function ga(a,b){if("hasOwnProperty"===a)throw hd("badname","hasOwnProperty is not a valid {0} name",b)}/**
 * Return the value accessible from the object by path. Any undefined traversals are ignored
 * @param {Object} obj starting object
 * @param {String} path path to traverse
 * @param {boolean} [bindFnToScope=true]
 * @returns {Object} value as accessible by path
 */
//TODO(misko): this function needs to be removed
function ha(a,b,c){if(!b)return a;for(var d,e=b.split("."),f=a,g=e.length,h=0;g>h;h++)d=e[h],a&&(a=(f=a)[d]);return!c&&x(a)?P(f,a):a}/**
 * Return the DOM siblings between the first and last node in the given array.
 * @param {Array} array like object
 * @returns {jqLite} jqLite collection containing the nodes
 */
function ia(a){
// TODO(perf): just check if all items in `nodes` are siblings and if they are return the original
//             collection, otherwise update the original collection.
var b=a[0],c=a[a.length-1],d=[b];do{if(b=b.nextSibling,!b)break;d.push(b)}while(b!==c);return ad(d)}/**
 * Creates a new object without a prototype. This object is useful for lookup without having to
 * guard against prototypically inherited properties via hasOwnProperty.
 *
 * Related micro-benchmarks:
 * - http://jsperf.com/object-create2
 * - http://jsperf.com/proto-map-lookup/2
 * - http://jsperf.com/for-in-vs-object-keys2
 *
 * @returns {Object}
 */
function ja(){return Object.create(null)}/**
 * @ngdoc type
 * @name angular.Module
 * @module ng
 * @description
 *
 * Interface for configuring angular {@link angular.module modules}.
 */
function ka(a){function b(a,b,c){return a[b]||(a[b]=c())}var c=d("$injector"),e=d("ng"),f=b(a,"angular",Object);
// We need to expose `angular.$$minErr` to modules such as `ngResource` that reference it during bootstrap
return f.$$minErr=f.$$minErr||d,b(f,"module",function(){/** @type {Object.<string, angular.Module>} */
var a={};/**
     * @ngdoc function
     * @name angular.module
     * @module ng
     * @description
     *
     * The `angular.module` is a global place for creating, registering and retrieving Angular
     * modules.
     * All modules (angular core or 3rd party) that should be available to an application must be
     * registered using this mechanism.
     *
     * When passed two or more arguments, a new module is created.  If passed only one argument, an
     * existing module (the name passed as the first argument to `module`) is retrieved.
     *
     *
     * # Module
     *
     * A module is a collection of services, directives, controllers, filters, and configuration information.
     * `angular.module` is used to configure the {@link auto.$injector $injector}.
     *
     * ```js
     * // Create a new module
     * var myModule = angular.module('myModule', []);
     *
     * // register a new service
     * myModule.value('appName', 'MyCoolApp');
     *
     * // configure existing services inside initialization blocks.
     * myModule.config(['$locationProvider', function($locationProvider) {
     *   // Configure existing providers
     *   $locationProvider.hashPrefix('!');
     * }]);
     * ```
     *
     * Then you can create an injector and load your modules like this:
     *
     * ```js
     * var injector = angular.injector(['ng', 'myModule'])
     * ```
     *
     * However it's more likely that you'll just use
     * {@link ng.directive:ngApp ngApp} or
     * {@link angular.bootstrap} to simplify this process for you.
     *
     * @param {!string} name The name of the module to create or retrieve.
     * @param {!Array.<string>=} requires If specified then new module is being created. If
     *        unspecified then the module is being retrieved for further configuration.
     * @param {Function=} configFn Optional configuration function for the module. Same as
     *        {@link angular.Module#config Module#config()}.
     * @returns {module} new module with the {@link angular.Module} api.
     */
return function(d,f,g){var h=function(a,b){if("hasOwnProperty"===a)throw e("badname","hasOwnProperty is not a valid {0} name",b)};return h(d,"module"),f&&a.hasOwnProperty(d)&&(a[d]=null),b(a,d,function(){/**
         * @param {string} provider
         * @param {string} method
         * @param {String=} insertMethod
         * @returns {angular.Module}
         */
function a(a,c,d,e){return e||(e=b),function(){return e[d||"push"]([a,c,arguments]),j}}if(!f)throw c("nomod","Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",d);/** @type {!Array.<Array.<*>>} */
var b=[],e=[],h=[],i=a("$injector","invoke","push",e),j={
// Private state
_invokeQueue:b,_configBlocks:e,_runBlocks:h,/**
           * @ngdoc property
           * @name angular.Module#requires
           * @module ng
           *
           * @description
           * Holds the list of modules which the injector will load before the current module is
           * loaded.
           */
requires:f,/**
           * @ngdoc property
           * @name angular.Module#name
           * @module ng
           *
           * @description
           * Name of the module.
           */
name:d,/**
           * @ngdoc method
           * @name angular.Module#provider
           * @module ng
           * @param {string} name service name
           * @param {Function} providerType Construction function for creating new instance of the
           *                                service.
           * @description
           * See {@link auto.$provide#provider $provide.provider()}.
           */
provider:a("$provide","provider"),/**
           * @ngdoc method
           * @name angular.Module#factory
           * @module ng
           * @param {string} name service name
           * @param {Function} providerFunction Function for creating new instance of the service.
           * @description
           * See {@link auto.$provide#factory $provide.factory()}.
           */
factory:a("$provide","factory"),/**
           * @ngdoc method
           * @name angular.Module#service
           * @module ng
           * @param {string} name service name
           * @param {Function} constructor A constructor function that will be instantiated.
           * @description
           * See {@link auto.$provide#service $provide.service()}.
           */
service:a("$provide","service"),/**
           * @ngdoc method
           * @name angular.Module#value
           * @module ng
           * @param {string} name service name
           * @param {*} object Service instance object.
           * @description
           * See {@link auto.$provide#value $provide.value()}.
           */
value:a("$provide","value"),/**
           * @ngdoc method
           * @name angular.Module#constant
           * @module ng
           * @param {string} name constant name
           * @param {*} object Constant value.
           * @description
           * Because the constant are fixed, they get applied before other provide methods.
           * See {@link auto.$provide#constant $provide.constant()}.
           */
constant:a("$provide","constant","unshift"),/**
           * @ngdoc method
           * @name angular.Module#animation
           * @module ng
           * @param {string} name animation name
           * @param {Function} animationFactory Factory function for creating new instance of an
           *                                    animation.
           * @description
           *
           * **NOTE**: animations take effect only if the **ngAnimate** module is loaded.
           *
           *
           * Defines an animation hook that can be later used with
           * {@link ngAnimate.$animate $animate} service and directives that use this service.
           *
           * ```js
           * module.animation('.animation-name', function($inject1, $inject2) {
           *   return {
           *     eventName : function(element, done) {
           *       //code to run the animation
           *       //once complete, then run done()
           *       return function cancellationFunction(element) {
           *         //code to cancel the animation
           *       }
           *     }
           *   }
           * })
           * ```
           *
           * See {@link ng.$animateProvider#register $animateProvider.register()} and
           * {@link ngAnimate ngAnimate module} for more information.
           */
animation:a("$animateProvider","register"),/**
           * @ngdoc method
           * @name angular.Module#filter
           * @module ng
           * @param {string} name Filter name.
           * @param {Function} filterFactory Factory function for creating new instance of filter.
           * @description
           * See {@link ng.$filterProvider#register $filterProvider.register()}.
           */
filter:a("$filterProvider","register"),/**
           * @ngdoc method
           * @name angular.Module#controller
           * @module ng
           * @param {string|Object} name Controller name, or an object map of controllers where the
           *    keys are the names and the values are the constructors.
           * @param {Function} constructor Controller constructor function.
           * @description
           * See {@link ng.$controllerProvider#register $controllerProvider.register()}.
           */
controller:a("$controllerProvider","register"),/**
           * @ngdoc method
           * @name angular.Module#directive
           * @module ng
           * @param {string|Object} name Directive name, or an object map of directives where the
           *    keys are the names and the values are the factories.
           * @param {Function} directiveFactory Factory function for creating new instance of
           * directives.
           * @description
           * See {@link ng.$compileProvider#directive $compileProvider.directive()}.
           */
directive:a("$compileProvider","directive"),/**
           * @ngdoc method
           * @name angular.Module#config
           * @module ng
           * @param {Function} configFn Execute this function on module load. Useful for service
           *    configuration.
           * @description
           * Use this method to register work which needs to be performed on module loading.
           * For more about how to configure services, see
           * {@link providers#provider-recipe Provider Recipe}.
           */
config:i,/**
           * @ngdoc method
           * @name angular.Module#run
           * @module ng
           * @param {Function} initializationFn Execute this function after injector creation.
           *    Useful for application initialization.
           * @description
           * Use this method to register work which should be performed when the injector is done
           * loading all modules.
           */
run:function(a){return h.push(a),this}};return g&&i(g),j})}})}/* global: toDebugString: true */
function la(a){var b=[];return JSON.stringify(a,function(a,c){if(c=Q(a,c),t(c)){if(b.indexOf(c)>=0)return"<<already seen>>";b.push(c)}return c})}function ma(a){return"function"==typeof a?a.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof a?"undefined":"string"!=typeof a?la(a):a}function na(b){l(b,{bootstrap:_,copy:K,extend:l,equals:M,element:ad,forEach:f,injector:Sa,noop:o,bind:P,toJson:R,fromJson:S,identity:p,isUndefined:r,isDefined:s,isString:u,isFunction:x,isObject:t,isNumber:v,isElement:G,isArray:ld,version:xd,isDate:w,lowercase:Wc,uppercase:Yc,callbacks:{counter:0},getTestability:ba,$$minErr:d,$$csp:od,reloadWithDebugInfo:aa}),cd=ka(a);try{cd("ngLocale")}catch(c){cd("ngLocale",[]).provider("$locale",qb)}cd("ng",["ngLocale"],["$provide",function(a){
// $$sanitizeUriProvider needs to be before $compileProvider as it is used by it.
a.provider({$$sanitizeUri:Wb}),a.provider("$compile",Za).directive({a:De,input:Ue,textarea:Ue,form:Ie,script:Kf,select:Nf,style:Pf,option:Of,ngBind:Xe,ngBindHtml:Ze,ngBindTemplate:Ye,ngClass:_e,ngClassEven:bf,ngClassOdd:af,ngCloak:cf,ngController:df,ngForm:Je,ngHide:Ef,ngIf:gf,ngInclude:hf,ngInit:kf,ngNonBindable:yf,ngPluralize:zf,ngRepeat:Af,ngShow:Df,ngStyle:Ff,ngSwitch:Gf,ngSwitchWhen:Hf,ngSwitchDefault:If,ngOptions:Mf,ngTransclude:Jf,ngModel:vf,ngList:lf,ngChange:$e,pattern:Rf,ngPattern:Rf,required:Qf,ngRequired:Qf,minlength:Tf,ngMinlength:Tf,maxlength:Sf,ngMaxlength:Sf,ngValue:We,ngModelOptions:xf}).directive({ngInclude:jf}).directive(Ee).directive(ef),a.provider({$anchorScroll:Ta,$animate:Vd,$browser:Wa,$cacheFactory:Xa,$controller:bb,$document:cb,$exceptionHandler:db,$filter:gc,$interpolate:ob,$interval:pb,$http:kb,$httpBackend:mb,$location:Eb,$log:Fb,$parse:Qb,$rootScope:Vb,$q:Rb,$$q:Sb,$sce:$b,$sceDelegate:Zb,$sniffer:_b,$templateCache:Ya,$templateRequest:ac,$$testability:bc,$timeout:cc,$window:fc,$$rAF:Ub,$$asyncCallback:Ua,$$jqLite:Na})}])}function oa(){return++zd}/**
 * Converts snake_case to camelCase.
 * Also there is special case for Moz prefix starting with upper case letter.
 * @param name Name to normalize
 */
function pa(a){return a.replace(Cd,function(a,b,c,d){return d?c.toUpperCase():c}).replace(Dd,"Moz$1")}function qa(a){return!Hd.test(a)}function ra(a){
// The window object can accept data but has no nodeType
// Otherwise we are only interested in elements (1) and documents (9)
var b=a.nodeType;return b===sd||!b||b===vd}function sa(a,b){var c,d,e,g,h=b.createDocumentFragment(),i=[];if(qa(a))
// Convert non-html into a text node
i.push(b.createTextNode(a));else{for(
// Convert html into DOM nodes
c=c||h.appendChild(b.createElement("div")),d=(Id.exec(a)||["",""])[1].toLowerCase(),e=Kd[d]||Kd._default,c.innerHTML=e[1]+a.replace(Jd,"<$1></$2>")+e[2],
// Descend through wrappers to the right content
g=e[0];g--;)c=c.lastChild;i=N(i,c.childNodes),c=h.firstChild,c.textContent=""}
// Remove wrapper from fragment
// Clear inner HTML
return h.textContent="",h.innerHTML="",f(i,function(a){h.appendChild(a)}),h}function ta(a,c){c=c||b;var d;return(d=Gd.exec(a))?[c.createElement(d[1])]:(d=sa(a,c))?d.childNodes:[]}
/////////////////////////////////////////////
function ua(a){if(a instanceof ua)return a;var b;if(u(a)&&(a=md(a),b=!0),!(this instanceof ua)){if(b&&"<"!=a.charAt(0))throw Fd("nosel","Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");return new ua(a)}b?Ea(this,ta(a)):Ea(this,a)}function va(a){return a.cloneNode(!0)}function wa(a,b){if(b||ya(a),a.querySelectorAll)for(var c=a.querySelectorAll("*"),d=0,e=c.length;e>d;d++)ya(c[d])}function xa(a,b,c,d){if(s(d))throw Fd("offargs","jqLite#off() does not support the `selector` argument");var e=za(a),g=e&&e.events,h=e&&e.handle;if(h)//no listeners registered
if(b)f(b.split(" "),function(b){if(s(c)){var d=g[b];if(J(d||[],c),d&&d.length>0)return}Bd(a,b,h),delete g[b]});else for(b in g)"$destroy"!==b&&Bd(a,b,h),delete g[b]}function ya(a,b){var d=a.ng339,e=d&&yd[d];if(e){if(b)return void delete e.data[b];e.handle&&(e.events.$destroy&&e.handle({},"$destroy"),xa(a)),delete yd[d],a.ng339=c}}function za(a,b){var d=a.ng339,e=d&&yd[d];return b&&!e&&(a.ng339=d=oa(),e=yd[d]={events:{},data:{},handle:c}),e}function Aa(a,b,c){if(ra(a)){var d=s(c),e=!d&&b&&!t(b),f=!b,g=za(a,!e),h=g&&g.data;if(d)// data('key', value)
h[b]=c;else{if(f)// data()
return h;if(e)// data('key')
// don't force creation of expandoStore if it doesn't exist yet
return h&&h[b];// mass-setter: data({key1: val1, key2: val2})
l(h,b)}}}function Ba(a,b){return a.getAttribute?(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" ")>-1:!1}function Ca(a,b){b&&a.setAttribute&&f(b.split(" "),function(b){a.setAttribute("class",md((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+md(b)+" "," ")))})}function Da(a,b){if(b&&a.setAttribute){var c=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");f(b.split(" "),function(a){a=md(a),-1===c.indexOf(" "+a+" ")&&(c+=a+" ")}),a.setAttribute("class",md(c))}}function Ea(a,b){
// THIS CODE IS VERY HOT. Don't make changes without benchmarking.
if(b)
// if a Node (the most common case)
if(b.nodeType)a[a.length++]=b;else{var c=b.length;
// if an Array or NodeList and not a Window
if("number"==typeof c&&b.window!==b){if(c)for(var d=0;c>d;d++)a[a.length++]=b[d]}else a[a.length++]=b}}function Fa(a,b){return Ga(a,"$"+(b||"ngController")+"Controller")}function Ga(a,b,d){
// if element is the document object work with the html element instead
// this makes $(document).scope() possible
a.nodeType==vd&&(a=a.documentElement);for(var e=ld(b)?b:[b];a;){for(var f=0,g=e.length;g>f;f++)if((d=ad.data(a,e[f]))!==c)return d;
// If dealing with a document fragment node with a host element, and no parent, use the host
// element as the parent. This enables directives within a Shadow DOM or polyfilled Shadow DOM
// to lookup parent controllers.
a=a.parentNode||a.nodeType===wd&&a.host}}function Ha(a){for(wa(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Ia(a,b){b||wa(a);var c=a.parentNode;c&&c.removeChild(a)}function Ja(b,c){c=c||a,"complete"===c.document.readyState?
// Force the action to be run async for consistent behaviour
// from the action's point of view
// i.e. it will definitely not be in a $apply
c.setTimeout(b):
// No need to unbind this handler as load is only ever called once
ad(c).on("load",b)}function Ka(a,b){
// check dom last since we will most likely fail on name
var c=Md[b.toLowerCase()];
// booleanAttr is here twice to minimize DOM access
return c&&Nd[I(a)]&&c}function La(a,b){var c=a.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Od[b]}function Ma(a,b){var c=function(c,d){
// jQuery specific api
c.isDefaultPrevented=function(){return c.defaultPrevented};var e=b[d||c.type],f=e?e.length:0;if(f){if(r(c.immediatePropagationStopped)){var g=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0,c.stopPropagation&&c.stopPropagation(),g&&g.call(c)}}c.isImmediatePropagationStopped=function(){return c.immediatePropagationStopped===!0},
// Copy event handlers in case event handlers array is modified during execution.
f>1&&(e=L(e));for(var h=0;f>h;h++)c.isImmediatePropagationStopped()||e[h].call(a,c)}};
// TODO: this is a hack for angularMocks/clearDataCache that makes it possible to deregister all
//       events on `element`
return c.elem=a,c}
// Provider for private $$jqLite service
function Na(){this.$get=function(){return l(ua,{hasClass:function(a,b){return a.attr&&(a=a[0]),Ba(a,b)},addClass:function(a,b){return a.attr&&(a=a[0]),Da(a,b)},removeClass:function(a,b){return a.attr&&(a=a[0]),Ca(a,b)}})}}/**
 * Computes a hash of an 'obj'.
 * Hash of a:
 *  string is string
 *  number is number as string
 *  object is either result of calling $$hashKey function on the object or uniquely generated id,
 *         that is also assigned to the $$hashKey property of the object.
 *
 * @param obj
 * @returns {string} hash string such that the same input will have the same hash string.
 *         The resulting string key is in 'type:hashKey' format.
 */
function Oa(a,b){var c=a&&a.$$hashKey;if(c)return"function"==typeof c&&(c=a.$$hashKey()),c;var d=typeof a;return c="function"==d||"object"==d&&null!==a?a.$$hashKey=d+":"+(b||j)():d+":"+a}/**
 * HashMap which can use objects as keys
 */
function Pa(a,b){if(b){var c=0;this.nextUid=function(){return++c}}f(a,this.put,this)}function Qa(a){
// For anonymous functions, showing at the very least the function signature can help in
// debugging.
var b=a.toString().replace(Sd,""),c=b.match(Pd);return c?"function("+(c[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Ra(a,b,c){var d,e,g,h;if("function"==typeof a){if(!(d=a.$inject)){if(d=[],a.length){if(b)throw u(c)&&c||(c=a.name||Qa(a)),Td("strictdi","{0} is not using explicit annotation and cannot be invoked in strict mode",c);e=a.toString().replace(Sd,""),g=e.match(Pd),f(g[1].split(Qd),function(a){a.replace(Rd,function(a,b,c){d.push(c)})})}a.$inject=d}}else ld(a)?(h=a.length-1,fa(a[h],"fn"),d=a.slice(0,h)):fa(a,"fn",!0);return d}
///////////////////////////////////////
/**
 * @ngdoc service
 * @name $injector
 *
 * @description
 *
 * `$injector` is used to retrieve object instances as defined by
 * {@link auto.$provide provider}, instantiate types, invoke methods,
 * and load modules.
 *
 * The following always holds true:
 *
 * ```js
 *   var $injector = angular.injector();
 *   expect($injector.get('$injector')).toBe($injector);
 *   expect($injector.invoke(function($injector) {
 *     return $injector;
 *   })).toBe($injector);
 * ```
 *
 * # Injection Function Annotation
 *
 * JavaScript does not have annotations, and annotations are needed for dependency injection. The
 * following are all valid ways of annotating function with injection arguments and are equivalent.
 *
 * ```js
 *   // inferred (only works if code not minified/obfuscated)
 *   $injector.invoke(function(serviceA){});
 *
 *   // annotated
 *   function explicit(serviceA) {};
 *   explicit.$inject = ['serviceA'];
 *   $injector.invoke(explicit);
 *
 *   // inline
 *   $injector.invoke(['serviceA', function(serviceA){}]);
 * ```
 *
 * ## Inference
 *
 * In JavaScript calling `toString()` on a function returns the function definition. The definition
 * can then be parsed and the function arguments can be extracted. This method of discovering
 * annotations is disallowed when the injector is in strict mode.
 * *NOTE:* This does not work with minification, and obfuscation tools since these tools change the
 * argument names.
 *
 * ## `$inject` Annotation
 * By adding an `$inject` property onto a function the injection parameters can be specified.
 *
 * ## Inline
 * As an array of injection names, where the last item in the array is the function to call.
 */
/**
 * @ngdoc method
 * @name $injector#get
 *
 * @description
 * Return an instance of the service.
 *
 * @param {string} name The name of the instance to retrieve.
 * @param {string} caller An optional string to provide the origin of the function call for error messages.
 * @return {*} The instance.
 */
/**
 * @ngdoc method
 * @name $injector#invoke
 *
 * @description
 * Invoke the method and supply the method arguments from the `$injector`.
 *
 * @param {!Function} fn The function to invoke. Function parameters are injected according to the
 *   {@link guide/di $inject Annotation} rules.
 * @param {Object=} self The `this` for the invoked method.
 * @param {Object=} locals Optional object. If preset then any argument names are read from this
 *                         object first, before the `$injector` is consulted.
 * @returns {*} the value returned by the invoked `fn` function.
 */
/**
 * @ngdoc method
 * @name $injector#has
 *
 * @description
 * Allows the user to query if the particular service exists.
 *
 * @param {string} name Name of the service to query.
 * @returns {boolean} `true` if injector has given service.
 */
/**
 * @ngdoc method
 * @name $injector#instantiate
 * @description
 * Create a new instance of JS type. The method takes a constructor function, invokes the new
 * operator, and supplies all of the arguments to the constructor function as specified by the
 * constructor annotation.
 *
 * @param {Function} Type Annotated constructor function.
 * @param {Object=} locals Optional object. If preset then any argument names are read from this
 * object first, before the `$injector` is consulted.
 * @returns {Object} new instance of `Type`.
 */
/**
 * @ngdoc method
 * @name $injector#annotate
 *
 * @description
 * Returns an array of service names which the function is requesting for injection. This API is
 * used by the injector to determine which services need to be injected into the function when the
 * function is invoked. There are three ways in which the function can be annotated with the needed
 * dependencies.
 *
 * # Argument names
 *
 * The simplest form is to extract the dependencies from the arguments of the function. This is done
 * by converting the function into a string using `toString()` method and extracting the argument
 * names.
 * ```js
 *   // Given
 *   function MyController($scope, $route) {
 *     // ...
 *   }
 *
 *   // Then
 *   expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
 * ```
 *
 * You can disallow this method by using strict injection mode.
 *
 * This method does not work with code minification / obfuscation. For this reason the following
 * annotation strategies are supported.
 *
 * # The `$inject` property
 *
 * If a function has an `$inject` property and its value is an array of strings, then the strings
 * represent names of services to be injected into the function.
 * ```js
 *   // Given
 *   var MyController = function(obfuscatedScope, obfuscatedRoute) {
 *     // ...
 *   }
 *   // Define function dependencies
 *   MyController['$inject'] = ['$scope', '$route'];
 *
 *   // Then
 *   expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
 * ```
 *
 * # The array notation
 *
 * It is often desirable to inline Injected functions and that's when setting the `$inject` property
 * is very inconvenient. In these situations using the array notation to specify the dependencies in
 * a way that survives minification is a better choice:
 *
 * ```js
 *   // We wish to write this (not minification / obfuscation safe)
 *   injector.invoke(function($compile, $rootScope) {
 *     // ...
 *   });
 *
 *   // We are forced to write break inlining
 *   var tmpFn = function(obfuscatedCompile, obfuscatedRootScope) {
 *     // ...
 *   };
 *   tmpFn.$inject = ['$compile', '$rootScope'];
 *   injector.invoke(tmpFn);
 *
 *   // To better support inline function the inline annotation is supported
 *   injector.invoke(['$compile', '$rootScope', function(obfCompile, obfRootScope) {
 *     // ...
 *   }]);
 *
 *   // Therefore
 *   expect(injector.annotate(
 *      ['$compile', '$rootScope', function(obfus_$compile, obfus_$rootScope) {}])
 *    ).toEqual(['$compile', '$rootScope']);
 * ```
 *
 * @param {Function|Array.<string|Function>} fn Function for which dependent service names need to
 * be retrieved as described above.
 *
 * @param {boolean=} [strictDi=false] Disallow argument name annotation inference.
 *
 * @returns {Array.<string>} The names of the services which the function requires.
 */
/**
 * @ngdoc service
 * @name $provide
 *
 * @description
 *
 * The {@link auto.$provide $provide} service has a number of methods for registering components
 * with the {@link auto.$injector $injector}. Many of these functions are also exposed on
 * {@link angular.Module}.
 *
 * An Angular **service** is a singleton object created by a **service factory**.  These **service
 * factories** are functions which, in turn, are created by a **service provider**.
 * The **service providers** are constructor functions. When instantiated they must contain a
 * property called `$get`, which holds the **service factory** function.
 *
 * When you request a service, the {@link auto.$injector $injector} is responsible for finding the
 * correct **service provider**, instantiating it and then calling its `$get` **service factory**
 * function to get the instance of the **service**.
 *
 * Often services have no configuration options and there is no need to add methods to the service
 * provider.  The provider will be no more than a constructor function with a `$get` property. For
 * these cases the {@link auto.$provide $provide} service has additional helper methods to register
 * services without specifying a provider.
 *
 * * {@link auto.$provide#provider provider(provider)} - registers a **service provider** with the
 *     {@link auto.$injector $injector}
 * * {@link auto.$provide#constant constant(obj)} - registers a value/object that can be accessed by
 *     providers and services.
 * * {@link auto.$provide#value value(obj)} - registers a value/object that can only be accessed by
 *     services, not providers.
 * * {@link auto.$provide#factory factory(fn)} - registers a service **factory function**, `fn`,
 *     that will be wrapped in a **service provider** object, whose `$get` property will contain the
 *     given factory function.
 * * {@link auto.$provide#service service(class)} - registers a **constructor function**, `class`
 *     that will be wrapped in a **service provider** object, whose `$get` property will instantiate
 *      a new object using the given constructor function.
 *
 * See the individual methods for more information and examples.
 */
/**
 * @ngdoc method
 * @name $provide#provider
 * @description
 *
 * Register a **provider function** with the {@link auto.$injector $injector}. Provider functions
 * are constructor functions, whose instances are responsible for "providing" a factory for a
 * service.
 *
 * Service provider names start with the name of the service they provide followed by `Provider`.
 * For example, the {@link ng.$log $log} service has a provider called
 * {@link ng.$logProvider $logProvider}.
 *
 * Service provider objects can have additional methods which allow configuration of the provider
 * and its service. Importantly, you can configure what kind of service is created by the `$get`
 * method, or how that service will act. For example, the {@link ng.$logProvider $logProvider} has a
 * method {@link ng.$logProvider#debugEnabled debugEnabled}
 * which lets you specify whether the {@link ng.$log $log} service will log debug messages to the
 * console or not.
 *
 * @param {string} name The name of the instance. NOTE: the provider will be available under `name +
                        'Provider'` key.
 * @param {(Object|function())} provider If the provider is:
 *
 *   - `Object`: then it should have a `$get` method. The `$get` method will be invoked using
 *     {@link auto.$injector#invoke $injector.invoke()} when an instance needs to be created.
 *   - `Constructor`: a new instance of the provider will be created using
 *     {@link auto.$injector#instantiate $injector.instantiate()}, then treated as `object`.
 *
 * @returns {Object} registered provider instance

 * @example
 *
 * The following example shows how to create a simple event tracking service and register it using
 * {@link auto.$provide#provider $provide.provider()}.
 *
 * ```js
 *  // Define the eventTracker provider
 *  function EventTrackerProvider() {
 *    var trackingUrl = '/track';
 *
 *    // A provider method for configuring where the tracked events should been saved
 *    this.setTrackingUrl = function(url) {
 *      trackingUrl = url;
 *    };
 *
 *    // The service factory function
 *    this.$get = ['$http', function($http) {
 *      var trackedEvents = {};
 *      return {
 *        // Call this to track an event
 *        event: function(event) {
 *          var count = trackedEvents[event] || 0;
 *          count += 1;
 *          trackedEvents[event] = count;
 *          return count;
 *        },
 *        // Call this to save the tracked events to the trackingUrl
 *        save: function() {
 *          $http.post(trackingUrl, trackedEvents);
 *        }
 *      };
 *    }];
 *  }
 *
 *  describe('eventTracker', function() {
 *    var postSpy;
 *
 *    beforeEach(module(function($provide) {
 *      // Register the eventTracker provider
 *      $provide.provider('eventTracker', EventTrackerProvider);
 *    }));
 *
 *    beforeEach(module(function(eventTrackerProvider) {
 *      // Configure eventTracker provider
 *      eventTrackerProvider.setTrackingUrl('/custom-track');
 *    }));
 *
 *    it('tracks events', inject(function(eventTracker) {
 *      expect(eventTracker.event('login')).toEqual(1);
 *      expect(eventTracker.event('login')).toEqual(2);
 *    }));
 *
 *    it('saves to the tracking url', inject(function(eventTracker, $http) {
 *      postSpy = spyOn($http, 'post');
 *      eventTracker.event('login');
 *      eventTracker.save();
 *      expect(postSpy).toHaveBeenCalled();
 *      expect(postSpy.mostRecentCall.args[0]).not.toEqual('/track');
 *      expect(postSpy.mostRecentCall.args[0]).toEqual('/custom-track');
 *      expect(postSpy.mostRecentCall.args[1]).toEqual({ 'login': 1 });
 *    }));
 *  });
 * ```
 */
/**
 * @ngdoc method
 * @name $provide#factory
 * @description
 *
 * Register a **service factory**, which will be called to return the service instance.
 * This is short for registering a service where its provider consists of only a `$get` property,
 * which is the given service factory function.
 * You should use {@link auto.$provide#factory $provide.factory(getFn)} if you do not need to
 * configure your service in a provider.
 *
 * @param {string} name The name of the instance.
 * @param {function()} $getFn The $getFn for the instance creation. Internally this is a short hand
 *                            for `$provide.provider(name, {$get: $getFn})`.
 * @returns {Object} registered provider instance
 *
 * @example
 * Here is an example of registering a service
 * ```js
 *   $provide.factory('ping', ['$http', function($http) {
 *     return function ping() {
 *       return $http.send('/ping');
 *     };
 *   }]);
 * ```
 * You would then inject and use this service like this:
 * ```js
 *   someModule.controller('Ctrl', ['ping', function(ping) {
 *     ping();
 *   }]);
 * ```
 */
/**
 * @ngdoc method
 * @name $provide#service
 * @description
 *
 * Register a **service constructor**, which will be invoked with `new` to create the service
 * instance.
 * This is short for registering a service where its provider's `$get` property is the service
 * constructor function that will be used to instantiate the service instance.
 *
 * You should use {@link auto.$provide#service $provide.service(class)} if you define your service
 * as a type/class.
 *
 * @param {string} name The name of the instance.
 * @param {Function} constructor A class (constructor function) that will be instantiated.
 * @returns {Object} registered provider instance
 *
 * @example
 * Here is an example of registering a service using
 * {@link auto.$provide#service $provide.service(class)}.
 * ```js
 *   var Ping = function($http) {
 *     this.$http = $http;
 *   };
 *
 *   Ping.$inject = ['$http'];
 *
 *   Ping.prototype.send = function() {
 *     return this.$http.get('/ping');
 *   };
 *   $provide.service('ping', Ping);
 * ```
 * You would then inject and use this service like this:
 * ```js
 *   someModule.controller('Ctrl', ['ping', function(ping) {
 *     ping.send();
 *   }]);
 * ```
 */
/**
 * @ngdoc method
 * @name $provide#value
 * @description
 *
 * Register a **value service** with the {@link auto.$injector $injector}, such as a string, a
 * number, an array, an object or a function.  This is short for registering a service where its
 * provider's `$get` property is a factory function that takes no arguments and returns the **value
 * service**.
 *
 * Value services are similar to constant services, except that they cannot be injected into a
 * module configuration function (see {@link angular.Module#config}) but they can be overridden by
 * an Angular
 * {@link auto.$provide#decorator decorator}.
 *
 * @param {string} name The name of the instance.
 * @param {*} value The value.
 * @returns {Object} registered provider instance
 *
 * @example
 * Here are some examples of creating value services.
 * ```js
 *   $provide.value('ADMIN_USER', 'admin');
 *
 *   $provide.value('RoleLookup', { admin: 0, writer: 1, reader: 2 });
 *
 *   $provide.value('halfOf', function(value) {
 *     return value / 2;
 *   });
 * ```
 */
/**
 * @ngdoc method
 * @name $provide#constant
 * @description
 *
 * Register a **constant service**, such as a string, a number, an array, an object or a function,
 * with the {@link auto.$injector $injector}. Unlike {@link auto.$provide#value value} it can be
 * injected into a module configuration function (see {@link angular.Module#config}) and it cannot
 * be overridden by an Angular {@link auto.$provide#decorator decorator}.
 *
 * @param {string} name The name of the constant.
 * @param {*} value The constant value.
 * @returns {Object} registered instance
 *
 * @example
 * Here a some examples of creating constants:
 * ```js
 *   $provide.constant('SHARD_HEIGHT', 306);
 *
 *   $provide.constant('MY_COLOURS', ['red', 'blue', 'grey']);
 *
 *   $provide.constant('double', function(value) {
 *     return value * 2;
 *   });
 * ```
 */
/**
 * @ngdoc method
 * @name $provide#decorator
 * @description
 *
 * Register a **service decorator** with the {@link auto.$injector $injector}. A service decorator
 * intercepts the creation of a service, allowing it to override or modify the behaviour of the
 * service. The object returned by the decorator may be the original service, or a new service
 * object which replaces or wraps and delegates to the original service.
 *
 * @param {string} name The name of the service to decorate.
 * @param {function()} decorator This function will be invoked when the service needs to be
 *    instantiated and should return the decorated service instance. The function is called using
 *    the {@link auto.$injector#invoke injector.invoke} method and is therefore fully injectable.
 *    Local injection arguments:
 *
 *    * `$delegate` - The original service instance, which can be monkey patched, configured,
 *      decorated or delegated to.
 *
 * @example
 * Here we decorate the {@link ng.$log $log} service to convert warnings to errors by intercepting
 * calls to {@link ng.$log#error $log.warn()}.
 * ```js
 *   $provide.decorator('$log', ['$delegate', function($delegate) {
 *     $delegate.warn = $delegate.error;
 *     return $delegate;
 *   }]);
 * ```
 */
function Sa(a,b){
////////////////////////////////////
// $provider
////////////////////////////////////
function d(a){return function(b,c){return t(b)?void f(b,i(a)):a(b,c)}}function e(a,b){if(ga(a,"service"),(x(b)||ld(b))&&(b=A.instantiate(b)),!b.$get)throw Td("pget","Provider '{0}' must define $get factory method.",a);return z[a+v]=b}function g(a,b){return function(){var c=C.invoke(b,this);if(r(c))throw Td("undef","Provider '{0}' must return a value from $get factory method.",a);return c}}function h(a,b,c){return e(a,{$get:c!==!1?g(a,b):b})}function j(a,b){return h(a,["$injector",function(a){return a.instantiate(b)}])}function k(a,b){return h(a,q(b),!1)}function l(a,b){ga(a,"constant"),z[a]=b,B[a]=b}function m(a,b){var c=A.get(a+v),d=c.$get;c.$get=function(){var a=C.invoke(d,c);return C.invoke(b,null,{$delegate:a})}}
////////////////////////////////////
// Module Loading
////////////////////////////////////
function n(a){var b,c=[];return f(a,function(a){function d(a){var b,c;for(b=0,c=a.length;c>b;b++){var d=a[b],e=A.get(d[0]);e[d[1]].apply(e,d[2])}}if(!y.get(a)){y.put(a,!0);try{u(a)?(b=cd(a),c=c.concat(n(b.requires)).concat(b._runBlocks),d(b._invokeQueue),d(b._configBlocks)):x(a)?c.push(A.invoke(a)):ld(a)?c.push(A.invoke(a)):fa(a,"module")}catch(e){
// Safari & FF's stack traces don't contain error.message content
// unlike those of Chrome and IE
// So if stack doesn't contain message, we create a new string that contains both.
// Since error.stack is read-only in Safari, I'm overriding e and not e.stack here.
/* jshint -W022 */
throw ld(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Td("modulerr","Failed to instantiate module {0} due to:\n{1}",a,e.stack||e.message||e)}}}),c}
////////////////////////////////////
// internal Injector
////////////////////////////////////
function p(a,c){function d(b,d){if(a.hasOwnProperty(b)){if(a[b]===s)throw Td("cdep","Circular dependency found: {0}",b+" <- "+w.join(" <- "));return a[b]}try{return w.unshift(b),a[b]=s,a[b]=c(b,d)}catch(e){throw a[b]===s&&delete a[b],e}finally{w.shift()}}function e(a,c,e,f){"string"==typeof e&&(f=e,e=null);var g,h,i,j=[],k=Sa.$$annotate(a,b,f);for(h=0,g=k.length;g>h;h++){if(i=k[h],"string"!=typeof i)throw Td("itkn","Incorrect injection token! Expected service name as string, got {0}",i);j.push(e&&e.hasOwnProperty(i)?e[i]:d(i,f))}
// http://jsperf.com/angularjs-invoke-apply-vs-switch
// #5388
return ld(a)&&(a=a[g]),a.apply(c,j)}function f(a,b,c){
// Check if Type is annotated and use just the given function at n-1 as parameter
// e.g. someModule.factory('greeter', ['$window', function(renamed$window) {}]);
// Object creation: http://jsperf.com/create-constructor/2
var d=Object.create((ld(a)?a[a.length-1]:a).prototype||null),f=e(a,d,b,c);return t(f)||x(f)?f:d}return{invoke:e,instantiate:f,get:d,annotate:Sa.$$annotate,has:function(b){return z.hasOwnProperty(b+v)||a.hasOwnProperty(b)}}}b=b===!0;var s={},v="Provider",w=[],y=new Pa([],!0),z={$provide:{provider:d(e),factory:d(h),service:d(j),value:d(k),constant:d(l),decorator:m}},A=z.$injector=p(z,function(a,b){throw id.isString(b)&&w.push(b),Td("unpr","Unknown provider: {0}",w.join(" <- "))}),B={},C=B.$injector=p(B,function(a,b){var d=A.get(a+v,b);return C.invoke(d.$get,d,c,a)});return f(n(a),function(a){C.invoke(a||o)}),C}/**
 * @ngdoc provider
 * @name $anchorScrollProvider
 *
 * @description
 * Use `$anchorScrollProvider` to disable automatic scrolling whenever
 * {@link ng.$location#hash $location.hash()} changes.
 */
function Ta(){var a=!0;/**
   * @ngdoc method
   * @name $anchorScrollProvider#disableAutoScrolling
   *
   * @description
   * By default, {@link ng.$anchorScroll $anchorScroll()} will automatically detect changes to
   * {@link ng.$location#hash $location.hash()} and scroll to the element matching the new hash.<br />
   * Use this method to disable automatic scrolling.
   *
   * If automatic scrolling is disabled, one must explicitly call
   * {@link ng.$anchorScroll $anchorScroll()} in order to scroll to the element related to the
   * current hash.
   */
this.disableAutoScrolling=function(){a=!1},/**
   * @ngdoc service
   * @name $anchorScroll
   * @kind function
   * @requires $window
   * @requires $location
   * @requires $rootScope
   *
   * @description
   * When called, it checks the current value of {@link ng.$location#hash $location.hash()} and
   * scrolls to the related element, according to the rules specified in the
   * [Html5 spec](http://dev.w3.org/html5/spec/Overview.html#the-indicated-part-of-the-document).
   *
   * It also watches the {@link ng.$location#hash $location.hash()} and automatically scrolls to
   * match any anchor whenever it changes. This can be disabled by calling
   * {@link ng.$anchorScrollProvider#disableAutoScrolling $anchorScrollProvider.disableAutoScrolling()}.
   *
   * Additionally, you can use its {@link ng.$anchorScroll#yOffset yOffset} property to specify a
   * vertical scroll-offset (either fixed or dynamic).
   *
   * @property {(number|function|jqLite)} yOffset
   * If set, specifies a vertical scroll-offset. This is often useful when there are fixed
   * positioned elements at the top of the page, such as navbars, headers etc.
   *
   * `yOffset` can be specified in various ways:
   * - **number**: A fixed number of pixels to be used as offset.<br /><br />
   * - **function**: A getter function called everytime `$anchorScroll()` is executed. Must return
   *   a number representing the offset (in pixels).<br /><br />
   * - **jqLite**: A jqLite/jQuery element to be used for specifying the offset. The distance from
   *   the top of the page to the element's bottom will be used as offset.<br />
   *   **Note**: The element will be taken into account only as long as its `position` is set to
   *   `fixed`. This option is useful, when dealing with responsive navbars/headers that adjust
   *   their height and/or positioning according to the viewport's size.
   *
   * <br />
   * <div class="alert alert-warning">
   * In order for `yOffset` to work properly, scrolling should take place on the document's root and
   * not some child element.
   * </div>
   *
   * @example
     <example module="anchorScrollExample">
       <file name="index.html">
         <div id="scrollArea" ng-controller="ScrollController">
           <a ng-click="gotoBottom()">Go to bottom</a>
           <a id="bottom"></a> You're at the bottom!
         </div>
       </file>
       <file name="script.js">
         angular.module('anchorScrollExample', [])
           .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
             function ($scope, $location, $anchorScroll) {
               $scope.gotoBottom = function() {
                 // set the location.hash to the id of
                 // the element you wish to scroll to.
                 $location.hash('bottom');

                 // call $anchorScroll()
                 $anchorScroll();
               };
             }]);
       </file>
       <file name="style.css">
         #scrollArea {
           height: 280px;
           overflow: auto;
         }

         #bottom {
           display: block;
           margin-top: 2000px;
         }
       </file>
     </example>
   *
   * <hr />
   * The example below illustrates the use of a vertical scroll-offset (specified as a fixed value).
   * See {@link ng.$anchorScroll#yOffset $anchorScroll.yOffset} for more details.
   *
   * @example
     <example module="anchorScrollOffsetExample">
       <file name="index.html">
         <div class="fixed-header" ng-controller="headerCtrl">
           <a href="" ng-click="gotoAnchor(x)" ng-repeat="x in [1,2,3,4,5]">
             Go to anchor {{x}}
           </a>
         </div>
         <div id="anchor{{x}}" class="anchor" ng-repeat="x in [1,2,3,4,5]">
           Anchor {{x}} of 5
         </div>
       </file>
       <file name="script.js">
         angular.module('anchorScrollOffsetExample', [])
           .run(['$anchorScroll', function($anchorScroll) {
             $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
           }])
           .controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
             function ($anchorScroll, $location, $scope) {
               $scope.gotoAnchor = function(x) {
                 var newHash = 'anchor' + x;
                 if ($location.hash() !== newHash) {
                   // set the $location.hash to `newHash` and
                   // $anchorScroll will automatically scroll to it
                   $location.hash('anchor' + x);
                 } else {
                   // call $anchorScroll() explicitly,
                   // since $location.hash hasn't changed
                   $anchorScroll();
                 }
               };
             }
           ]);
       </file>
       <file name="style.css">
         body {
           padding-top: 50px;
         }

         .anchor {
           border: 2px dashed DarkOrchid;
           padding: 10px 10px 200px 10px;
         }

         .fixed-header {
           background-color: rgba(0, 0, 0, 0.2);
           height: 50px;
           position: fixed;
           top: 0; left: 0; right: 0;
         }

         .fixed-header > a {
           display: inline-block;
           margin: 5px 15px;
         }
       </file>
     </example>
   */
this.$get=["$window","$location","$rootScope",function(b,c,d){
// Helper function to get first anchor from a NodeList
// (using `Array#some()` instead of `angular#forEach()` since it's more performant
//  and working in all supported browsers.)
function e(a){var b=null;return Array.prototype.some.call(a,function(a){return"a"===I(a)?(b=a,!0):void 0}),b}function f(){var a=h.yOffset;if(x(a))a=a();else if(G(a)){var c=a[0],d=b.getComputedStyle(c);a="fixed"!==d.position?0:c.getBoundingClientRect().bottom}else v(a)||(a=0);return a}function g(a){if(a){a.scrollIntoView();var c=f();if(c){
// `offset` is the number of pixels we should scroll UP in order to align `elem` properly.
// This is true ONLY if the call to `elem.scrollIntoView()` initially aligns `elem` at the
// top of the viewport.
//
// IF the number of pixels from the top of `elem` to the end of the page's content is less
// than the height of the viewport, then `elem.scrollIntoView()` will align the `elem` some
// way down the page.
//
// This is often the case for elements near the bottom of the page.
//
// In such cases we do not need to scroll the whole `offset` up, just the difference between
// the top of the element and the offset, which is enough to align the top of `elem` at the
// desired position.
var d=a.getBoundingClientRect().top;b.scrollBy(0,d-c)}}else b.scrollTo(0,0)}function h(){var a,b=c.hash();
// empty hash, scroll to the top of the page
b?(a=i.getElementById(b))?g(a):(a=e(i.getElementsByName(b)))?g(a):"top"===b&&g(null):g(null)}var i=b.document;
// does not scroll when user clicks on anchor link that is currently on
// (no url change, no $location.hash() change), browser native does scroll
return a&&d.$watch(function(){return c.hash()},function(a,b){
// skip the initial scroll if $location.hash is empty
(a!==b||""!==a)&&Ja(function(){d.$evalAsync(h)})}),h}]}function Ua(){this.$get=["$$rAF","$timeout",function(a,b){return a.supported?function(b){return a(b)}:function(a){return b(a,0,!1)}}]}/* global stripHash: true */
/**
 * ! This is a private undocumented service !
 *
 * @name $browser
 * @requires $log
 * @description
 * This object has two goals:
 *
 * - hide all the global state in the browser caused by the window object
 * - abstract away all the browser specific features and inconsistencies
 *
 * For tests we provide {@link ngMock.$browser mock implementation} of the `$browser`
 * service, which can be used for convenient testing of the application without the interaction with
 * the real browser apis.
 */
/**
 * @param {object} window The global window object.
 * @param {object} document jQuery wrapped document.
 * @param {object} $log window.console or an object with the same interface.
 * @param {object} $sniffer $sniffer service
 */
function Va(a,b,d,e){/**
   * Executes the `fn` function(supports currying) and decrements the `outstandingRequestCallbacks`
   * counter. If the counter reaches 0, all the `outstandingRequestCallbacks` are executed.
   */
function g(a){try{a.apply(null,O(arguments,1))}finally{if(y--,0===y)for(;z.length;)try{z.pop()()}catch(b){d.error(b)}}}function h(a){var b=a.indexOf("#");return-1===b?"":a.substr(b+1)}/**
   * @param {number} interval How often should browser call poll functions (ms)
   * @param {function()} setTimeout Reference to a real or fake `setTimeout` function.
   *
   * @description
   * Configures the poller to run in the specified intervals, using the specified
   * setTimeout fn and kicks it off.
   */
function i(a,b){!function c(){f(B,function(a){a()}),A=b(c,a)}()}function j(){l(),m()}function k(){try{return t.state}catch(a){}}function l(){
// This should be the only place in $browser where `history.state` is read.
C=k(),C=r(C)?null:C,
// Prevent callbacks fo fire twice if both hashchange & popstate were fired.
M(C,J)&&(C=J),J=C}function m(){(E!==p.url()||D!==C)&&(E=p.url(),D=C,f(H,function(a){a(p.url(),C)}))}function n(a){try{return decodeURIComponent(a)}catch(b){return a}}var p=this,q=b[0],s=a.location,t=a.history,v=a.setTimeout,w=a.clearTimeout,x={};p.isMock=!1;var y=0,z=[];
// TODO(vojta): remove this temporary api
p.$$completeOutstandingRequest=g,p.$$incOutstandingRequestCount=function(){y++},/**
   * @private
   * Note: this method is used only by scenario runner
   * TODO(vojta): prefix this method with $$ ?
   * @param {function()} callback Function that will be called when no outstanding request
   */
p.notifyWhenNoOutstandingRequests=function(a){
// force browser to execute all pollFns - this is needed so that cookies and other pollers fire
// at some deterministic time in respect to the test runner's actions. Leaving things up to the
// regular poller would result in flaky tests.
f(B,function(a){a()}),0===y?a():z.push(a)};
//////////////////////////////////////////////////////////////
// Poll Watcher API
//////////////////////////////////////////////////////////////
var A,B=[];/**
   * @name $browser#addPollFn
   *
   * @param {function()} fn Poll function to add
   *
   * @description
   * Adds a function to the list of functions that poller periodically executes,
   * and starts polling if not started yet.
   *
   * @returns {function()} the added function
   */
p.addPollFn=function(a){return r(A)&&i(100,v),B.push(a),a};
//////////////////////////////////////////////////////////////
// URL API
//////////////////////////////////////////////////////////////
var C,D,E=s.href,F=b.find("base"),G=null;l(),D=C,/**
   * @name $browser#url
   *
   * @description
   * GETTER:
   * Without any argument, this method just returns current value of location.href.
   *
   * SETTER:
   * With at least one argument, this method sets url to new value.
   * If html5 history api supported, pushState/replaceState is used, otherwise
   * location.href/location.replace is used.
   * Returns its own instance to allow chaining
   *
   * NOTE: this api is intended for use only by the $location service. Please use the
   * {@link ng.$location $location service} to change url.
   *
   * @param {string} url New url (when used as setter)
   * @param {boolean=} replace Should new url replace current history record?
   * @param {object=} state object to use with pushState/replaceState
   */
p.url=function(b,c,d){
// setter
if(
// In modern browsers `history.state` is `null` by default; treating it separately
// from `undefined` would cause `$browser.url('/foo')` to change `history.state`
// to undefined via `pushState`. Instead, let's change `undefined` to `null` here.
r(d)&&(d=null),
// Android Browser BFCache causes location, history reference to become stale.
s!==a.location&&(s=a.location),t!==a.history&&(t=a.history),b){var f=D===d;
// Don't change anything if previous and current URLs and states match. This also prevents
// IE<10 from getting into redirect loop when in LocationHashbangInHtml5Url mode.
// See https://github.com/angular/angular.js/commit/ffb2701
if(E===b&&(!e.history||f))return p;var g=E&&vb(E)===vb(b);
// Don't use history API if only the hash changed
// due to a bug in IE10/IE11 which leads
// to not firing a `hashchange` nor `popstate` event
// in some cases (see #9143).
// Do the assignment again so that those two variables are referentially identical.
return E=b,D=d,!e.history||g&&f?(g||(G=b),c?s.replace(b):g?s.hash=h(b):s.href=b):(t[c?"replaceState":"pushState"](d,"",b),l(),D=C),p}
// - reloadLocation is needed as browsers don't allow to read out
//   the new location.href if a reload happened.
// - the replacement is a workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=407172
return G||s.href.replace(/%27/g,"'")},/**
   * @name $browser#state
   *
   * @description
   * This method is a getter.
   *
   * Return history.state or null if history.state is undefined.
   *
   * @returns {object} state
   */
p.state=function(){return C};var H=[],I=!1,J=null;/**
   * @name $browser#onUrlChange
   *
   * @description
   * Register callback function that will be called, when url changes.
   *
   * It's only called when the url is changed from outside of angular:
   * - user types different url into address bar
   * - user clicks on history (forward/back) button
   * - user clicks on a link
   *
   * It's not called when url is changed by $browser.url() method
   *
   * The listener gets called with new url as parameter.
   *
   * NOTE: this api is intended for use only by the $location service. Please use the
   * {@link ng.$location $location service} to monitor url changes in angular apps.
   *
   * @param {function(string)} listener Listener function to be called when url changes.
   * @return {function(string)} Returns the registered listener fn - handy if the fn is anonymous.
   */
p.onUrlChange=function(b){
// TODO(vojta): refactor to use node's syntax for events
// We listen on both (hashchange/popstate) when available, as some browsers (e.g. Opera)
// don't fire popstate when user change the address bar and don't fire hashchange when url
// changed by push/replaceState
// html5 history api - popstate event
// hashchange event
return I||(e.history&&ad(a).on("popstate",j),ad(a).on("hashchange",j),I=!0),H.push(b),b},/**
   * Checks whether the url has changed outside of Angular.
   * Needs to be exported to be able to check for changes that have been done in sync,
   * as hashchange/popstate events fire in async.
   */
p.$$checkUrlChange=m,
//////////////////////////////////////////////////////////////
// Misc API
//////////////////////////////////////////////////////////////
/**
   * @name $browser#baseHref
   *
   * @description
   * Returns current <base href>
   * (always relative - without domain)
   *
   * @returns {string} The current base href
   */
p.baseHref=function(){var a=F.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};
//////////////////////////////////////////////////////////////
// Cookies API
//////////////////////////////////////////////////////////////
var K={},L="",N=p.baseHref();/**
   * @name $browser#cookies
   *
   * @param {string=} name Cookie name
   * @param {string=} value Cookie value
   *
   * @description
   * The cookies method provides a 'private' low level access to browser cookies.
   * It is not meant to be used directly, use the $cookie service instead.
   *
   * The return values vary depending on the arguments that the method was called with as follows:
   *
   * - cookies() -> hash of all cookies, this is NOT a copy of the internal state, so do not modify
   *   it
   * - cookies(name, value) -> set name to value, if value is undefined delete the cookie
   * - cookies(name) -> the same as (name, undefined) == DELETES (no one calls it right now that
   *   way)
   *
   * @returns {Object} Hash of all cookies (if called without any parameter)
   */
p.cookies=function(a,b){var e,f,g,h,i;if(!a){if(q.cookie!==L)for(L=q.cookie,f=L.split("; "),K={},h=0;h<f.length;h++)g=f[h],i=g.indexOf("="),i>0&&(//ignore nameless cookies
a=n(g.substring(0,i)),
// the first value that is seen for a cookie is the most
// specific one.  values for the same cookie name that
// follow are for less specific paths.
K[a]===c&&(K[a]=n(g.substring(i+1))));return K}b===c?q.cookie=encodeURIComponent(a)+"=;path="+N+";expires=Thu, 01 Jan 1970 00:00:00 GMT":u(b)&&(e=(q.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+N).length+1,
// per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
// - 300 cookies
// - 20 cookies per unique domain
// - 4096 bytes per cookie
e>4096&&d.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+e+" > 4096 bytes)!"))},/**
   * @name $browser#defer
   * @param {function()} fn A function, who's execution should be deferred.
   * @param {number=} [delay=0] of milliseconds to defer the function execution.
   * @returns {*} DeferId that can be used to cancel the task via `$browser.defer.cancel()`.
   *
   * @description
   * Executes a fn asynchronously via `setTimeout(fn, delay)`.
   *
   * Unlike when calling `setTimeout` directly, in test this function is mocked and instead of using
   * `setTimeout` in tests, the fns are queued in an array, which can be programmatically flushed
   * via `$browser.defer.flush()`.
   *
   */
p.defer=function(a,b){var c;return y++,c=v(function(){delete x[c],g(a)},b||0),x[c]=!0,c},/**
   * @name $browser#defer.cancel
   *
   * @description
   * Cancels a deferred task identified with `deferId`.
   *
   * @param {*} deferId Token returned by the `$browser.defer` function.
   * @returns {boolean} Returns `true` if the task hasn't executed yet and was successfully
   *                    canceled.
   */
p.defer.cancel=function(a){return x[a]?(delete x[a],w(a),g(o),!0):!1}}function Wa(){this.$get=["$window","$log","$sniffer","$document",function(a,b,c,d){return new Va(a,d,b,c)}]}/**
 * @ngdoc service
 * @name $cacheFactory
 *
 * @description
 * Factory that constructs {@link $cacheFactory.Cache Cache} objects and gives access to
 * them.
 *
 * ```js
 *
 *  var cache = $cacheFactory('cacheId');
 *  expect($cacheFactory.get('cacheId')).toBe(cache);
 *  expect($cacheFactory.get('noSuchCacheId')).not.toBeDefined();
 *
 *  cache.put("key", "value");
 *  cache.put("another key", "another value");
 *
 *  // We've specified no options on creation
 *  expect(cache.info()).toEqual({id: 'cacheId', size: 2});
 *
 * ```
 *
 *
 * @param {string} cacheId Name or id of the newly created cache.
 * @param {object=} options Options object that specifies the cache behavior. Properties:
 *
 *   - `{number=}` `capacity` — turns the cache into LRU cache.
 *
 * @returns {object} Newly created cache object with the following set of methods:
 *
 * - `{object}` `info()` — Returns id, size, and options of cache.
 * - `{{*}}` `put({string} key, {*} value)` — Puts a new key-value pair into the cache and returns
 *   it.
 * - `{{*}}` `get({string} key)` — Returns cached value for `key` or undefined for cache miss.
 * - `{void}` `remove({string} key)` — Removes a key-value pair from the cache.
 * - `{void}` `removeAll()` — Removes all cached values.
 * - `{void}` `destroy()` — Removes references to this cache from $cacheFactory.
 *
 * @example
   <example module="cacheExampleApp">
     <file name="index.html">
       <div ng-controller="CacheController">
         <input ng-model="newCacheKey" placeholder="Key">
         <input ng-model="newCacheValue" placeholder="Value">
         <button ng-click="put(newCacheKey, newCacheValue)">Cache</button>

         <p ng-if="keys.length">Cached Values</p>
         <div ng-repeat="key in keys">
           <span ng-bind="key"></span>
           <span>: </span>
           <b ng-bind="cache.get(key)"></b>
         </div>

         <p>Cache Info</p>
         <div ng-repeat="(key, value) in cache.info()">
           <span ng-bind="key"></span>
           <span>: </span>
           <b ng-bind="value"></b>
         </div>
       </div>
     </file>
     <file name="script.js">
       angular.module('cacheExampleApp', []).
         controller('CacheController', ['$scope', '$cacheFactory', function($scope, $cacheFactory) {
           $scope.keys = [];
           $scope.cache = $cacheFactory('cacheId');
           $scope.put = function(key, value) {
             if ($scope.cache.get(key) === undefined) {
               $scope.keys.push(key);
             }
             $scope.cache.put(key, value === undefined ? null : value);
           };
         }]);
     </file>
     <file name="style.css">
       p {
         margin: 10px 0 3px;
       }
     </file>
   </example>
 */
function Xa(){this.$get=function(){function a(a,c){/**
       * makes the `entry` the freshEnd of the LRU linked list
       */
function e(a){a!=m&&(n?n==a&&(n=a.n):n=a,f(a.n,a.p),f(a,m),m=a,m.n=null)}/**
       * bidirectionally links two entries of the LRU linked list
       */
function f(a,b){a!=b&&(a&&(a.p=b),//p stands for previous, 'prev' didn't minify
b&&(b.n=a))}if(a in b)throw d("$cacheFactory")("iid","CacheId '{0}' is already taken!",a);var g=0,h=l({},c,{id:a}),i={},j=c&&c.capacity||Number.MAX_VALUE,k={},m=null,n=null;/**
       * @ngdoc type
       * @name $cacheFactory.Cache
       *
       * @description
       * A cache object used to store and retrieve data, primarily used by
       * {@link $http $http} and the {@link ng.directive:script script} directive to cache
       * templates and other data.
       *
       * ```js
       *  angular.module('superCache')
       *    .factory('superCache', ['$cacheFactory', function($cacheFactory) {
       *      return $cacheFactory('super-cache');
       *    }]);
       * ```
       *
       * Example test:
       *
       * ```js
       *  it('should behave like a cache', inject(function(superCache) {
       *    superCache.put('key', 'value');
       *    superCache.put('another key', 'another value');
       *
       *    expect(superCache.info()).toEqual({
       *      id: 'super-cache',
       *      size: 2
       *    });
       *
       *    superCache.remove('another key');
       *    expect(superCache.get('another key')).toBeUndefined();
       *
       *    superCache.removeAll();
       *    expect(superCache.info()).toEqual({
       *      id: 'super-cache',
       *      size: 0
       *    });
       *  }));
       * ```
       */
return b[a]={/**
         * @ngdoc method
         * @name $cacheFactory.Cache#put
         * @kind function
         *
         * @description
         * Inserts a named entry into the {@link $cacheFactory.Cache Cache} object to be
         * retrieved later, and incrementing the size of the cache if the key was not already
         * present in the cache. If behaving like an LRU cache, it will also remove stale
         * entries from the set.
         *
         * It will not insert undefined values into the cache.
         *
         * @param {string} key the key under which the cached data is stored.
         * @param {*} value the value to store alongside the key. If it is undefined, the key
         *    will not be stored.
         * @returns {*} the value stored.
         */
put:function(a,b){if(j<Number.MAX_VALUE){var c=k[a]||(k[a]={key:a});e(c)}if(!r(b))return a in i||g++,i[a]=b,g>j&&this.remove(n.key),b},/**
         * @ngdoc method
         * @name $cacheFactory.Cache#get
         * @kind function
         *
         * @description
         * Retrieves named data stored in the {@link $cacheFactory.Cache Cache} object.
         *
         * @param {string} key the key of the data to be retrieved
         * @returns {*} the value stored.
         */
get:function(a){if(j<Number.MAX_VALUE){var b=k[a];if(!b)return;e(b)}return i[a]},/**
         * @ngdoc method
         * @name $cacheFactory.Cache#remove
         * @kind function
         *
         * @description
         * Removes an entry from the {@link $cacheFactory.Cache Cache} object.
         *
         * @param {string} key the key of the entry to be removed
         */
remove:function(a){if(j<Number.MAX_VALUE){var b=k[a];if(!b)return;b==m&&(m=b.p),b==n&&(n=b.n),f(b.n,b.p),delete k[a]}delete i[a],g--},/**
         * @ngdoc method
         * @name $cacheFactory.Cache#removeAll
         * @kind function
         *
         * @description
         * Clears the cache object of any entries.
         */
removeAll:function(){i={},g=0,k={},m=n=null},/**
         * @ngdoc method
         * @name $cacheFactory.Cache#destroy
         * @kind function
         *
         * @description
         * Destroys the {@link $cacheFactory.Cache Cache} object entirely,
         * removing it from the {@link $cacheFactory $cacheFactory} set.
         */
destroy:function(){i=null,h=null,k=null,delete b[a]},/**
         * @ngdoc method
         * @name $cacheFactory.Cache#info
         * @kind function
         *
         * @description
         * Retrieve information regarding a particular {@link $cacheFactory.Cache Cache}.
         *
         * @returns {object} an object with the following properties:
         *   <ul>
         *     <li>**id**: the id of the cache instance</li>
         *     <li>**size**: the number of entries kept in the cache instance</li>
         *     <li>**...**: any additional properties from the options object when creating the
         *       cache.</li>
         *   </ul>
         */
info:function(){return l({},h,{size:g})}}}var b={};/**
   * @ngdoc method
   * @name $cacheFactory#info
   *
   * @description
   * Get information about all the caches that have been created
   *
   * @returns {Object} - key-value map of `cacheId` to the result of calling `cache#info`
   */
/**
   * @ngdoc method
   * @name $cacheFactory#get
   *
   * @description
   * Get access to a cache object by the `cacheId` used when it was created.
   *
   * @param {string} cacheId Name or id of a cache to access.
   * @returns {object} Cache object identified by the cacheId or undefined if no such cache.
   */
return a.info=function(){var a={};return f(b,function(b,c){a[c]=b.info()}),a},a.get=function(a){return b[a]},a}}/**
 * @ngdoc service
 * @name $templateCache
 *
 * @description
 * The first time a template is used, it is loaded in the template cache for quick retrieval. You
 * can load templates directly into the cache in a `script` tag, or by consuming the
 * `$templateCache` service directly.
 *
 * Adding via the `script` tag:
 *
 * ```html
 *   <script type="text/ng-template" id="templateId.html">
 *     <p>This is the content of the template</p>
 *   </script>
 * ```
 *
 * **Note:** the `script` tag containing the template does not need to be included in the `head` of
 * the document, but it must be a descendent of the {@link ng.$rootElement $rootElement} (IE,
 * element with ng-app attribute), otherwise the template will be ignored.
 *
 * Adding via the `$templateCache` service:
 *
 * ```js
 * var myApp = angular.module('myApp', []);
 * myApp.run(function($templateCache) {
 *   $templateCache.put('templateId.html', 'This is the content of the template');
 * });
 * ```
 *
 * To retrieve the template later, simply use it in your HTML:
 * ```html
 * <div ng-include=" 'templateId.html' "></div>
 * ```
 *
 * or get it via Javascript:
 * ```js
 * $templateCache.get('templateId.html')
 * ```
 *
 * See {@link ng.$cacheFactory $cacheFactory}.
 *
 */
function Ya(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Za(a,d){function e(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};return f(a,function(a,e){var f=a.match(c);if(!f)throw Wd("iscp","Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}}),d}var g={},h="Directive",j=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,k=/(([\w\-]+)(?:\:([^;]+))?;?)/,m=H("ngSrc,ngSrcset,src,srcset"),r=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,v=/^(on[a-z]+|formaction)$/;/**
   * @ngdoc method
   * @name $compileProvider#directive
   * @kind function
   *
   * @description
   * Register a new directive with the compiler.
   *
   * @param {string|Object} name Name of the directive in camel-case (i.e. <code>ngBind</code> which
   *    will match as <code>ng-bind</code>), or an object map of directives where the keys are the
   *    names and the values are the factories.
   * @param {Function|Array} directiveFactory An injectable directive factory function. See
   *    {@link guide/directive} for more info.
   * @returns {ng.$compileProvider} Self for chaining.
   */
this.directive=function y(b,c){return ga(b,"directive"),u(b)?(ea(c,"directiveFactory"),g.hasOwnProperty(b)||(g[b]=[],a.factory(b+h,["$injector","$exceptionHandler",function(a,c){var d=[];return f(g[b],function(f,g){try{var h=a.invoke(f);x(h)?h={compile:q(h)}:!h.compile&&h.link&&(h.compile=q(h.link)),h.priority=h.priority||0,h.index=g,h.name=h.name||b,h.require=h.require||h.controller&&h.name,h.restrict=h.restrict||"EA",t(h.scope)&&(h.$$isolateBindings=e(h.scope,h.name)),d.push(h)}catch(i){c(i)}}),d}])),g[b].push(c)):f(b,i(y)),this},/**
   * @ngdoc method
   * @name $compileProvider#aHrefSanitizationWhitelist
   * @kind function
   *
   * @description
   * Retrieves or overrides the default regular expression that is used for whitelisting of safe
   * urls during a[href] sanitization.
   *
   * The sanitization is a security measure aimed at preventing XSS attacks via html links.
   *
   * Any url about to be assigned to a[href] via data-binding is first normalized and turned into
   * an absolute url. Afterwards, the url is matched against the `aHrefSanitizationWhitelist`
   * regular expression. If a match is found, the original url is written into the dom. Otherwise,
   * the absolute url is prefixed with `'unsafe:'` string and only then is it written into the DOM.
   *
   * @param {RegExp=} regexp New regexp to whitelist urls with.
   * @returns {RegExp|ng.$compileProvider} Current RegExp if called without value or self for
   *    chaining otherwise.
   */
this.aHrefSanitizationWhitelist=function(a){return s(a)?(d.aHrefSanitizationWhitelist(a),this):d.aHrefSanitizationWhitelist()},/**
   * @ngdoc method
   * @name $compileProvider#imgSrcSanitizationWhitelist
   * @kind function
   *
   * @description
   * Retrieves or overrides the default regular expression that is used for whitelisting of safe
   * urls during img[src] sanitization.
   *
   * The sanitization is a security measure aimed at prevent XSS attacks via html links.
   *
   * Any url about to be assigned to img[src] via data-binding is first normalized and turned into
   * an absolute url. Afterwards, the url is matched against the `imgSrcSanitizationWhitelist`
   * regular expression. If a match is found, the original url is written into the dom. Otherwise,
   * the absolute url is prefixed with `'unsafe:'` string and only then is it written into the DOM.
   *
   * @param {RegExp=} regexp New regexp to whitelist urls with.
   * @returns {RegExp|ng.$compileProvider} Current RegExp if called without value or self for
   *    chaining otherwise.
   */
this.imgSrcSanitizationWhitelist=function(a){return s(a)?(d.imgSrcSanitizationWhitelist(a),this):d.imgSrcSanitizationWhitelist()};/**
   * @ngdoc method
   * @name  $compileProvider#debugInfoEnabled
   *
   * @param {boolean=} enabled update the debugInfoEnabled state if provided, otherwise just return the
   * current debugInfoEnabled state
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   *
   * @kind function
   *
   * @description
   * Call this method to enable/disable various debug runtime information in the compiler such as adding
   * binding information and a reference to the current scope on to DOM elements.
   * If enabled, the compiler will add the following to DOM elements that have been bound to the scope
   * * `ng-binding` CSS class
   * * `$binding` data property containing an array of the binding expressions
   *
   * You may want to disable this in production for a significant performance boost. See
   * {@link guide/production#disabling-debug-data Disabling Debug Data} for more.
   *
   * The default value is true.
   */
var w=!0;this.debugInfoEnabled=function(a){return s(a)?(w=a,this):w},this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,d,e,i,q,s,y,z,B,C,D){function E(a,b){try{a.addClass(b)}catch(c){}}
//================================
function F(a,b,c,d,e){a instanceof ad||(
// jquery always rewraps, whereas we need to preserve the original selector so that we can
// modify it.
a=ad(a)),
// We can not compile top level text elements since text nodes can be merged and we will
// not be able to attach scope data to them, so we will wrap them in <span>
f(a,function(b,c){b.nodeType==td&&b.nodeValue.match(/\S+/)&&(a[c]=ad(b).wrap("<span></span>").parent()[0])});var g=H(a,b,a,c,d,e);F.$$addScopeClass(a);var h=null;return function(b,c,d){ea(b,"scope"),d=d||{};var e=d.parentBoundTranscludeFn,f=d.transcludeControllers,i=d.futureParentElement;
// When `parentBoundTranscludeFn` is passed, it is a
// `controllersBoundTransclude` function (it was previously passed
// as `transclude` to directive.link) so we must unwrap it to get
// its `boundTranscludeFn`
e&&e.$$boundTransclude&&(e=e.$$boundTransclude),h||(h=G(i));var j;if(
// When using a directive with replace:true and templateUrl the $compileNodes
// (or a child element inside of them)
// might change, so we need to recreate the namespace adapted compileNodes
// for call to the link function.
// Note: This will already clone the nodes...
j="html"!==h?ad($(h,ad("<div>").append(a).html())):c?Ld.clone.call(a):a,f)for(var k in f)j.data("$"+k+"Controller",f[k].instance);return F.$$addScopeInfo(j,b),c&&c(j,b),g&&g(b,j,j,e),j}}function G(a){
// TODO: Make this detect MathML as well...
var b=a&&a[0];return b&&"foreignobject"!==I(b)&&b.toString().match(/SVG/)?"svg":"html"}/**
     * Compile function matches each node in nodeList against the directives. Once all directives
     * for a particular node are collected their compile functions are executed. The compile
     * functions return values - the linking functions - are combined into a composite linking
     * function, which is the a linking function for the node.
     *
     * @param {NodeList} nodeList an array of nodes or NodeList to compile
     * @param {function(angular.Scope, cloneAttachFn=)} transcludeFn A linking function, where the
     *        scope argument is auto-generated to the new child of the transcluded parent scope.
     * @param {DOMElement=} $rootElement If the nodeList is the root of the compilation tree then
     *        the rootElement must be set the jqLite collection of the compile root. This is
     *        needed so that the jqLite collection items can be replaced with widgets.
     * @param {number=} maxPriority Max directive priority.
     * @returns {Function} A composite linking function of all of the matched directives or null.
     */
function H(a,b,d,e,f,g){function h(a,d,e,f){var g,h,i,j,k,l,m,n,q;if(o){
// copy nodeList so that if a nodeLinkFn removes or adds an element at this DOM level our
// offsets don't get screwed up
var r=d.length;
// create a sparse array by only copying the elements which have a linkFn
for(q=new Array(r),k=0;k<p.length;k+=3)m=p[k],q[m]=d[m]}else q=d;for(k=0,l=p.length;l>k;)i=q[p[k++]],g=p[k++],h=p[k++],g?(g.scope?(j=a.$new(),F.$$addScopeInfo(ad(i),j)):j=a,n=g.transcludeOnThisElement?K(a,g.transclude,f,g.elementTranscludeOnThisElement):!g.templateOnThisElement&&f?f:!f&&b?K(a,b):null,g(h,j,i,e,n)):h&&h(a,i.childNodes,c,f)}for(var i,j,k,l,m,n,o,p=[],q=0;q<a.length;q++)i=new ga,
// we must always refer to nodeList[i] since the nodes can be replaced underneath us.
j=L(a[q],[],i,0===q?e:c,f),k=j.length?Q(j,a[q],i,b,d,null,[],[],g):null,k&&k.scope&&F.$$addScopeClass(i.$$element),m=k&&k.terminal||!(l=a[q].childNodes)||!l.length?null:H(l,k?(k.transcludeOnThisElement||!k.templateOnThisElement)&&k.transclude:b),(k||m)&&(p.push(q,k,m),n=!0,o=o||k),
//use the previous context only for the first element in the virtual group
g=null;
// return a linking function if we have found anything, null otherwise
return n?h:null}function K(a,b,c,d){var e=function(d,e,f,g,h){return d||(d=a.$new(!1,h),d.$$transcluded=!0),b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})};return e}/**
     * Looks for directives on the given node and adds them to the directive collection which is
     * sorted.
     *
     * @param node Node to search.
     * @param directives An array to which the directives are added to. This array is sorted before
     *        the function returns.
     * @param attrs The shared attrs object which is used to populate the normalized attributes.
     * @param {number=} maxPriority Max directive priority.
     */
function L(a,b,c,d,e){var f,g,h=a.nodeType,i=c.$attr;switch(h){case sd:/* Element */
// use the node name: <directive>
S(b,$a(I(a)),"E",d,e);
// iterate over the attributes
for(var l,m,n,o,p,q,r=a.attributes,s=0,v=r&&r.length;v>s;s++){var w=!1,x=!1;l=r[s],m=l.name,p=md(l.value),
// support ngAttr attribute binding
o=$a(m),(q=la.test(o))&&(m=m.replace(Xd,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()}));var y=o.replace(/(Start|End)$/,"");U(y)&&o===y+"Start"&&(w=m,x=m.substr(0,m.length-5)+"end",m=m.substr(0,m.length-6)),n=$a(m.toLowerCase()),i[n]=m,(q||!c.hasOwnProperty(n))&&(c[n]=p,Ka(a,n)&&(c[n]=!0)),aa(a,b,p,n,q),S(b,n,"A",d,e,w,x)}if(
// use class as directive
g=a.className,t(g)&&(
// Maybe SVGAnimatedString
g=g.animVal),u(g)&&""!==g)for(;f=k.exec(g);)n=$a(f[2]),S(b,n,"C",d,e)&&(c[n]=md(f[3])),g=g.substr(f.index+f[0].length);break;case td:/* Text Node */
Z(b,a.nodeValue);break;case ud:/* Comment */
try{f=j.exec(a.nodeValue),f&&(n=$a(f[1]),S(b,n,"M",d,e)&&(c[n]=md(f[2])))}catch(z){}}return b.sort(X),b}/**
     * Given a node with an directive-start it collects all of the siblings until it finds
     * directive-end.
     * @param node
     * @param attrStart
     * @param attrEnd
     * @returns {*}
     */
function N(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw Wd("uterdir","Unterminated attribute, found '{0}' but no matching '{1}' found.",b,c);a.nodeType==sd&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--),d.push(a),a=a.nextSibling}while(e>0)}else d.push(a);return ad(d)}/**
     * Wrapper for linking function which converts normal linking function into a grouped
     * linking function.
     * @param linkFn
     * @param attrStart
     * @param attrEnd
     * @returns {Function}
     */
function P(a,b,c){return function(d,e,f,g,h){return e=N(e[0],b,c),a(d,e,f,g,h)}}/**
     * Once the directives have been collected, their compile functions are executed. This method
     * is responsible for inlining directive templates as well as terminating the application
     * of the directives if the terminal directive has been reached.
     *
     * @param {Array} directives Array of collected directives to execute their compile function.
     *        this needs to be pre-sorted by priority order.
     * @param {Node} compileNode The raw DOM node to apply the compile functions to
     * @param {Object} templateAttrs The shared attribute function
     * @param {function(angular.Scope, cloneAttachFn=)} transcludeFn A linking function, where the
     *                                                  scope argument is auto-generated to the new
     *                                                  child of the transcluded parent scope.
     * @param {JQLite} jqCollection If we are working on the root of the compile tree then this
     *                              argument has the root jqLite array so that we can replace nodes
     *                              on it.
     * @param {Object=} originalReplaceDirective An optional directive that will be ignored when
     *                                           compiling the transclusion.
     * @param {Array.<Function>} preLinkFns
     * @param {Array.<Function>} postLinkFns
     * @param {Object} previousCompileContext Context used for previous compilation of the current
     *                                        node
     * @returns {Function} linkFn
     */
function Q(a,g,h,i,j,k,l,m,n){
////////////////////
function o(a,b,c,d){a&&(c&&(a=P(a,c,d)),a.require=z.require,a.directiveName=B,(I===z||z.$$isolateScope)&&(a=da(a,{isolateScope:!0})),l.push(a)),b&&(c&&(b=P(b,c,d)),b.require=z.require,b.directiveName=B,(I===z||z.$$isolateScope)&&(b=da(b,{isolateScope:!0})),m.push(b))}function p(a,b,c,d){var e,g,h="data",i=!1,j=c;if(u(b)){if(g=b.match(r),b=b.substring(g[0].length),g[3]&&(g[1]?g[3]=null:g[1]=g[3]),"^"===g[1]?h="inheritedData":"^^"===g[1]&&(h="inheritedData",j=c.parent()),"?"===g[2]&&(i=!0),e=null,d&&"data"===h&&(e=d[b])&&(e=e.instance),e=e||j[h]("$"+b+"Controller"),!e&&!i)throw Wd("ctreq","Controller '{0}', required by directive '{1}', can't be found!",b,a);return e||null}return ld(b)&&(e=[],f(b,function(b){e.push(p(a,b,c,d))})),e}function v(a,b,e,i,j){
// This is the function that is injected as `$transclude`.
// Note: all arguments are optional!
function k(a,b,d){var e;
// No scope passed in:
return A(a)||(d=b,b=a,a=c),U&&(e=v),d||(d=U?x.parent():x),j(a,b,e,d,D)}var n,o,r,t,u,v,w,x,z;if(g===e?(z=h,x=h.$$element):(x=ad(e),z=new ga(x,h)),I&&(u=b.$new(!0)),j&&(
// track `boundTranscludeFn` so it can be unwrapped if `transcludeFn`
// is later passed as `parentBoundTranscludeFn` to `publicLinkFn`
w=k,w.$$boundTransclude=j),H&&(
// TODO: merge `controllers` and `elementControllers` into single object.
y={},v={},f(H,function(a){var c,d={$scope:a===I||a.$$isolateScope?u:b,$element:x,$attrs:z,$transclude:w};t=a.controller,"@"==t&&(t=z[a.name]),c=s(t,d,!0,a.controllerAs),
// For directives with element transclusion the element is a comment,
// but jQuery .data doesn't support attaching data to comment nodes as it's hard to
// clean up (http://bugs.jquery.com/ticket/8335).
// Instead, we save the controllers for the element in a local hash and attach to .data
// later, once we have the actual element.
v[a.name]=c,U||x.data("$"+a.name+"Controller",c.instance),y[a.name]=c})),I){F.$$addScopeInfo(x,u,!0,!(J&&(J===I||J===I.$$originalDirective))),F.$$addScopeClass(x,!0);var B=y&&y[I.name],C=u;B&&B.identifier&&I.bindToController===!0&&(C=B.instance),f(u.$$isolateBindings=I.$$isolateBindings,function(a,c){var// @, =, or &
e,f,g,h,i=a.attrName,j=a.optional,k=a.mode;switch(k){case"@":z.$observe(i,function(a){C[c]=a}),z.$$observers[i].$$scope=b,z[i]&&(
// If the attribute has been provided then we trigger an interpolation to ensure
// the value is there for use in the link fn
C[c]=d(z[i])(b));break;case"=":if(j&&!z[i])return;f=q(z[i]),h=f.literal?M:function(a,b){return a===b||a!==a&&b!==b},g=f.assign||function(){
// reset the change, or we will throw this exception on every $digest
throw e=C[c]=f(b),Wd("nonassign","Expression '{0}' used with directive '{1}' is non-assignable!",z[i],I.name)},e=C[c]=f(b);var l=function(a){
// we are out of sync and need to copy
// if the parent can be assigned then do so
// parent changed and it has precedence
return h(a,C[c])||(h(a,e)?g(b,a=C[c]):C[c]=a),e=a};l.$stateful=!0;var m;m=a.collection?b.$watchCollection(z[i],l):b.$watch(q(z[i],l),null,f.literal),u.$on("$destroy",m);break;case"&":f=q(z[i]),C[c]=function(a){return f(b,a)}}})}
// PRELINKING
for(y&&(f(y,function(a){a()}),y=null),n=0,o=l.length;o>n;n++)r=l[n],fa(r,r.isolateScope?u:b,x,z,r.require&&p(r.directiveName,r.require,x,v),w);
// RECURSION
// We only pass the isolate scope, if the isolate directive has a template,
// otherwise the child elements do not belong to the isolate directive.
var D=b;
// POSTLINKING
for(I&&(I.template||null===I.templateUrl)&&(D=u),a&&a(D,e.childNodes,c,j),n=m.length-1;n>=0;n--)r=m[n],fa(r,r.isolateScope?u:b,x,z,r.require&&p(r.directiveName,r.require,x,v),w)}n=n||{};
// executes all directives on the current element
for(var w,y,z,B,C,D,E,G=-Number.MAX_VALUE,H=n.controllerDirectives,I=n.newIsolateScopeDirective,J=n.templateDirective,K=n.nonTlbTranscludeDirective,Q=!1,S=!1,U=n.hasElementTranscludeDirective,X=h.$$element=ad(g),Z=k,_=i,aa=0,ca=a.length;ca>aa;aa++){z=a[aa];var ea=z.$$start,ha=z.$$end;if(
// collect multiblock sections
ea&&(X=N(g,ea,ha)),C=c,G>z.priority)break;if((E=z.scope)&&(
// skip the check for directives with async templates, we'll check the derived sync
// directive when the template arrives
z.templateUrl||(t(E)?(
// This directive is trying to add an isolated scope.
// Check that there is no scope of any kind already
Y("new/isolated scope",I||w,z,X),I=z):
// This directive is trying to add a child scope.
// Check that there is no isolated scope already
Y("new/isolated scope",I,z,X)),w=w||z),B=z.name,!z.templateUrl&&z.controller&&(E=z.controller,H=H||{},Y("'"+B+"' controller",H[B],z,X),H[B]=z),(E=z.transclude)&&(Q=!0,
// Special case ngIf and ngRepeat so that we don't complain about duplicate transclusion.
// This option should only be used by directives that know how to safely handle element transclusion,
// where the transcluded nodes are added or replaced after linking.
z.$$tlb||(Y("transclusion",K,z,X),K=z),"element"==E?(U=!0,G=z.priority,C=X,X=h.$$element=ad(b.createComment(" "+B+": "+h[B]+" ")),g=X[0],ba(j,O(C),g),_=F(C,i,G,Z&&Z.name,{
// Don't pass in:
// - controllerDirectives - otherwise we'll create duplicates controllers
// - newIsolateScopeDirective or templateDirective - combining templates with
//   element transclusion doesn't make sense.
//
// We need only nonTlbTranscludeDirective so that we prevent putting transclusion
// on the same element more than once.
nonTlbTranscludeDirective:K})):(C=ad(va(g)).contents(),X.empty(),// clear contents
_=F(C,i))),z.template)if(S=!0,Y("template",J,z,X),J=z,E=x(z.template)?z.template(X,h):z.template,E=ka(E),z.replace){if(Z=z,C=qa(E)?[]:ab($(z.templateNamespace,md(E))),g=C[0],1!=C.length||g.nodeType!==sd)throw Wd("tplrt","Template for directive '{0}' must have exactly one root element. {1}",B,"");ba(j,X,g);var ia={$attr:{}},ja=L(g,[],ia),la=a.splice(aa+1,a.length-(aa+1));I&&R(ja),a=a.concat(ja).concat(la),V(h,ia),ca=a.length}else X.html(E);if(z.templateUrl)S=!0,Y("template",J,z,X),J=z,z.replace&&(Z=z),v=W(a.splice(aa,a.length-aa),X,h,j,Q&&_,l,m,{controllerDirectives:H,newIsolateScopeDirective:I,templateDirective:J,nonTlbTranscludeDirective:K}),ca=a.length;else if(z.compile)try{D=z.compile(X,h,_),x(D)?o(null,D,ea,ha):D&&o(D.pre,D.post,ea,ha)}catch(ma){e(ma,T(X))}z.terminal&&(v.terminal=!0,G=Math.max(G,z.priority))}
// might be normal or delayed nodeLinkFn depending on if templateUrl is present
return v.scope=w&&w.scope===!0,v.transcludeOnThisElement=Q,v.elementTranscludeOnThisElement=U,v.templateOnThisElement=S,v.transclude=_,n.hasElementTranscludeDirective=U,v}function R(a){
// mark all directives as needing isolate scope.
for(var b=0,c=a.length;c>b;b++)a[b]=n(a[b],{$$isolateScope:!0})}/**
     * looks up the directive and decorates it with exception handling and proper parameters. We
     * call this the boundDirective.
     *
     * @param {string} name name of the directive to look up.
     * @param {string} location The directive must be found in specific format.
     *   String containing any of theses characters:
     *
     *   * `E`: element name
     *   * `A': attribute
     *   * `C`: class
     *   * `M`: comment
     * @returns {boolean} true if directive was added.
     */
function S(b,d,f,i,j,k,l){if(d===j)return null;var m=null;if(g.hasOwnProperty(d))for(var o,p=a.get(d+h),q=0,r=p.length;r>q;q++)try{o=p[q],(i===c||i>o.priority)&&-1!=o.restrict.indexOf(f)&&(k&&(o=n(o,{$$start:k,$$end:l})),b.push(o),m=o)}catch(s){e(s)}return m}/**
     * looks up the directive and returns true if it is a multi-element directive,
     * and therefore requires DOM nodes between -start and -end markers to be grouped
     * together.
     *
     * @param {string} name name of the directive to look up.
     * @returns true if directive was registered as multi-element.
     */
function U(b){if(g.hasOwnProperty(b))for(var c,d=a.get(b+h),e=0,f=d.length;f>e;e++)if(c=d[e],c.multiElement)return!0;return!1}/**
     * When the element is replaced with HTML template then the new attributes
     * on the template need to be merged with the existing attributes in the DOM.
     * The desired effect is to have both of the attributes present.
     *
     * @param {object} dst destination attributes (original DOM)
     * @param {object} src source attributes (from the directive template)
     */
function V(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;
// reapply the old attributes to the new element
f(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))}),
// copy the new attributes on the old attrs object
f(b,function(b,f){"class"==f?(E(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function W(a,b,c,d,e,g,h,j){var k,l,m=[],o=b[0],p=a.shift(),q=n(p,{templateUrl:null,transclude:null,replace:null,$$originalDirective:p}),r=x(p.templateUrl)?p.templateUrl(b,c):p.templateUrl,s=p.templateNamespace;return b.empty(),i(B.getTrustedResourceUrl(r)).then(function(i){var n,u,v,w;if(i=ka(i),p.replace){if(v=qa(i)?[]:ab($(s,md(i))),n=v[0],1!=v.length||n.nodeType!==sd)throw Wd("tplrt","Template for directive '{0}' must have exactly one root element. {1}",p.name,r);u={$attr:{}},ba(d,b,n);var x=L(n,[],u);t(p.scope)&&R(x),a=x.concat(a),V(c,u)}else n=o,b.html(i);for(a.unshift(q),k=Q(a,n,c,e,b,p,g,h,j),f(d,function(a,c){a==n&&(d[c]=b[0])}),l=H(b[0].childNodes,e);m.length;){var y=m.shift(),z=m.shift(),A=m.shift(),B=m.shift(),C=b[0];if(!y.$$destroyed){if(z!==o){var D=z.className;j.hasElementTranscludeDirective&&p.replace||(
// it was cloned therefore we have to clone as well.
C=va(n)),ba(A,ad(z),C),
// Copy in CSS classes from original node
E(ad(C),D)}w=k.transcludeOnThisElement?K(y,k.transclude,B):B,k(l,y,C,d,w)}}m=null}),function(a,b,c,d,e){var f=e;b.$$destroyed||(m?m.push(b,c,d,f):(k.transcludeOnThisElement&&(f=K(b,k.transclude,e)),k(l,b,c,d,f)))}}/**
     * Sorting function for bound directives.
     */
function X(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Y(a,b,c,d){if(b)throw Wd("multidir","Multiple directives [{0}, {1}] asking for {2} on: {3}",b.name,c.name,a,T(d))}function Z(a,b){var c=d(b,!0);c&&a.push({priority:0,compile:function(a){var b=a.parent(),d=!!b.length;
// When transcluding a template that has bindings in the root
// we don't have a parent and thus need to add the class during linking fn.
return d&&F.$$addBindingClass(b),function(a,b){var e=b.parent();d||F.$$addBindingClass(e),F.$$addBindingInfo(e,c.expressions),a.$watch(c,function(a){b[0].nodeValue=a})}}})}function $(a,c){switch(a=Wc(a||"html")){case"svg":case"math":var d=b.createElement("div");return d.innerHTML="<"+a+">"+c+"</"+a+">",d.childNodes[0].childNodes;default:return c}}function _(a,b){if("srcdoc"==b)return B.HTML;var c=I(a);
// maction[xlink:href] can source SVG.  It's not limited to <maction>.
// maction[xlink:href] can source SVG.  It's not limited to <maction>.
return"xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b)?B.RESOURCE_URL:void 0}function aa(a,b,c,e,f){var g=_(a,e);f=m[e]||f;var h=d(c,!0,g,f);
// no interpolation found -> ignore
if(h){if("multiple"===e&&"select"===I(a))throw Wd("selmulti","Binding to the 'multiple' attribute is not supported. Element: {0}",T(a));b.push({priority:100,compile:function(){return{pre:function(a,b,i){var j=i.$$observers||(i.$$observers={});if(v.test(e))throw Wd("nodomevents","Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
// If the attribute has changed since last $interpolate()ed
var k=i[e];k!==c&&(
// we need to interpolate again since the attribute value has been updated
// (e.g. by another directive's compile function)
// ensure unset/empty values make interpolateFn falsy
h=k&&d(k,!0,g,f),c=k),
// if attribute was updated so that there is no interpolation going on we don't want to
// register any observers
h&&(
// initialize attr object so that it's ready in case we need the value for isolate
// scope initialization, otherwise the value would not be available from isolate
// directive's linking fn during linking phase
i[e]=h(a),(j[e]||(j[e]=[])).$$inter=!0,(i.$$observers&&i.$$observers[e].$$scope||a).$watch(h,function(a,b){
//special case for class attribute addition + removal
//so that class changes can tap into the animation
//hooks provided by the $animate service. Be sure to
//skip animations when the first digest occurs (when
//both the new and the old values are the same) since
//the CSS classes are the non-interpolated values
"class"===e&&a!=b?i.$updateClass(a,b):i.$set(e,a)}))}}}})}}/**
     * This is a special jqLite.replaceWith, which can replace items which
     * have no parents, provided that the containing jqLite collection is provided.
     *
     * @param {JqLite=} $rootElement The root of the compile tree. Used so that we can replace nodes
     *                               in the root of the tree.
     * @param {JqLite} elementsToRemove The jqLite element which we are going to replace. We keep
     *                                  the shell, but replace its DOM node reference.
     * @param {Node} newNode The new DOM node.
     */
function ba(a,c,d){var e,f,g=c[0],h=c.length,i=g.parentNode;if(a)for(e=0,f=a.length;f>e;e++)if(a[e]==g){a[e++]=d;for(var j=e,k=j+h-1,l=a.length;l>j;j++,k++)l>k?a[j]=a[k]:delete a[j];a.length-=h-1,
// If the replaced element is also the jQuery .context then replace it
// .context is a deprecated jQuery api, so we should set it only when jQuery set it
// http://api.jquery.com/context/
a.context===g&&(a.context=d);break}i&&i.replaceChild(d,g);
// TODO(perf): what's this document fragment for? is it needed? can we at least reuse it?
var m=b.createDocumentFragment();m.appendChild(g),
// Copy over user data (that includes Angular's $scope etc.). Don't copy private
// data here because there's no public interface in jQuery to do that and copying over
// event listeners (which is the main use of private data) wouldn't work anyway.
ad(d).data(ad(g).data()),
// Remove data of the replaced element. We cannot just call .remove()
// on the element it since that would deallocate scope that is needed
// for the new node. Instead, remove the data "manually".
bd?(
// jQuery 2.x doesn't expose the data storage. Use jQuery.cleanData to clean up after
// the replaced element. The cleanData version monkey-patched by Angular would cause
// the scope to be trashed and we do need the very same scope to work with the new
// element. However, we cannot just cache the non-patched version and use it here as
// that would break if another library patches the method after Angular does (one
// example is jQuery UI). Instead, set a flag indicating scope destroying should be
// skipped this one time.
kd=!0,bd.cleanData([g])):delete ad.cache[g[ad.expando]];for(var n=1,o=c.length;o>n;n++){var p=c[n];ad(p).remove(),// must do this way to clean up expando
m.appendChild(p),delete c[n]}c[0]=d,c.length=1}function da(a,b){return l(function(){return a.apply(null,arguments)},a,b)}function fa(a,b,c,d,f,g){try{a(b,c,d,f,g)}catch(h){e(h,T(c))}}var ga=function(a,b){if(b){var c,d,e,f=Object.keys(b);for(c=0,d=f.length;d>c;c++)e=f[c],this[e]=b[e]}else this.$attr={};this.$$element=a};ga.prototype={/**
       * @ngdoc method
       * @name $compile.directive.Attributes#$normalize
       * @kind function
       *
       * @description
       * Converts an attribute name (e.g. dash/colon/underscore-delimited string, optionally prefixed with `x-` or
       * `data-`) to its normalized, camelCase form.
       *
       * Also there is special case for Moz prefix starting with upper case letter.
       *
       * For further information check out the guide on {@link guide/directive#matching-directives Matching Directives}
       *
       * @param {string} name Name to normalize
       */
$normalize:$a,/**
       * @ngdoc method
       * @name $compile.directive.Attributes#$addClass
       * @kind function
       *
       * @description
       * Adds the CSS class value specified by the classVal parameter to the element. If animations
       * are enabled then an animation will be triggered for the class addition.
       *
       * @param {string} classVal The className value that will be added to the element
       */
$addClass:function(a){a&&a.length>0&&C.addClass(this.$$element,a)},/**
       * @ngdoc method
       * @name $compile.directive.Attributes#$removeClass
       * @kind function
       *
       * @description
       * Removes the CSS class value specified by the classVal parameter from the element. If
       * animations are enabled then an animation will be triggered for the class removal.
       *
       * @param {string} classVal The className value that will be removed from the element
       */
$removeClass:function(a){a&&a.length>0&&C.removeClass(this.$$element,a)},/**
       * @ngdoc method
       * @name $compile.directive.Attributes#$updateClass
       * @kind function
       *
       * @description
       * Adds and removes the appropriate CSS class values to the element based on the difference
       * between the new and old CSS class values (specified as newClasses and oldClasses).
       *
       * @param {string} newClasses The current CSS className value
       * @param {string} oldClasses The former CSS className value
       */
$updateClass:function(a,b){var c=_a(a,b);c&&c.length&&C.addClass(this.$$element,c);var d=_a(b,a);d&&d.length&&C.removeClass(this.$$element,d)},/**
       * Set a normalized attribute on the element in a way such that all directives
       * can share the attribute. This function properly handles boolean attributes.
       * @param {string} key Normalized key. (ie ngAttribute)
       * @param {string|boolean} value The value to set. If `null` attribute will be deleted.
       * @param {boolean=} writeAttr If false, does not write the value to DOM element attribute.
       *     Defaults to true.
       * @param {string=} attrName Optional none normalized name. Defaults to key.
       */
$set:function(a,b,d,g){
// TODO: decide whether or not to throw an error if "class"
//is set through this function since it may cause $updateClass to
//become unstable.
var h,i=this.$$element[0],j=Ka(i,a),k=La(i,a),l=a;if(j?(this.$$element.prop(a,b),g=j):k&&(this[k]=b,l=k),this[a]=b,
// translate normalized key to actual key
g?this.$attr[a]=g:(g=this.$attr[a],g||(this.$attr[a]=g=ca(a,"-"))),h=I(this.$$element),"a"===h&&"href"===a||"img"===h&&"src"===a)
// sanitize a[href] and img[src] values
this[a]=b=D(b,"src"===a);else if("img"===h&&"srcset"===a){for(var m="",n=md(b),o=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,p=/\s/.test(n)?o:/(,)/,q=n.split(p),r=Math.floor(q.length/2),s=0;r>s;s++){var t=2*s;
// sanitize the uri
m+=D(md(q[t]),!0),
// add the descriptor
m+=" "+md(q[t+1])}
// split the last item into uri and descriptor
var u=md(q[2*s]).split(/\s/);
// sanitize the last uri
m+=D(md(u[0]),!0),
// and add the last descriptor if any
2===u.length&&(m+=" "+md(u[1])),this[a]=b=m}d!==!1&&(null===b||b===c?this.$$element.removeAttr(g):this.$$element.attr(g,b));
// fire observers
var v=this.$$observers;v&&f(v[l],function(a){try{a(b)}catch(c){e(c)}})},/**
       * @ngdoc method
       * @name $compile.directive.Attributes#$observe
       * @kind function
       *
       * @description
       * Observes an interpolated attribute.
       *
       * The observer function will be invoked once during the next `$digest` following
       * compilation. The observer is then invoked whenever the interpolated value
       * changes.
       *
       * @param {string} key Normalized key. (ie ngAttribute) .
       * @param {function(interpolatedValue)} fn Function that will be called whenever
                the interpolated value of the attribute changes.
       *        See the {@link guide/directive#text-and-attribute-bindings Directives} guide for more info.
       * @returns {function()} Returns a deregistration function for this observer.
       */
$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ja()),e=d[a]||(d[a]=[]);return e.push(b),y.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&
// no one registered attribute interpolation function, so lets call it manually
b(c[a])}),function(){J(e,b)}}};var ha=d.startSymbol(),ia=d.endSymbol(),ka="{{"==ha||"}}"==ia?p:function(a){return a.replace(/\{\{/g,ha).replace(/}}/g,ia)},la=/^ngAttr[A-Z]/;return F.$$addBindingInfo=w?function(a,b){var c=a.data("$binding")||[];ld(b)?c=c.concat(b):c.push(b),a.data("$binding",c)}:o,F.$$addBindingClass=w?function(a){E(a,"ng-binding")}:o,F.$$addScopeInfo=w?function(a,b,c,d){var e=c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope";a.data(e,b)}:o,F.$$addScopeClass=w?function(a,b){E(a,b?"ng-isolate-scope":"ng-scope")}:o,F}]}/**
 * Converts all accepted directives format into proper directive name.
 * @param name Name to normalize
 */
function $a(a){return pa(a.replace(Xd,""))}function _a(a,b){var c="",d=a.split(/\s+/),e=b.split(/\s+/);a:for(var f=0;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(c.length>0?" ":"")+g}return c}function ab(a){a=ad(a);var b=a.length;if(1>=b)return a;for(;b--;){var c=a[b];c.nodeType===ud&&ed.call(a,b,1)}return a}/**
 * @ngdoc provider
 * @name $controllerProvider
 * @description
 * The {@link ng.$controller $controller service} is used by Angular to create new
 * controllers.
 *
 * This provider allows controller registration via the
 * {@link ng.$controllerProvider#register register} method.
 */
function bb(){var a={},b=!1,e=/^(\S+)(\s+as\s+(\w+))?$/;/**
   * @ngdoc method
   * @name $controllerProvider#register
   * @param {string|Object} name Controller name, or an object map of controllers where the keys are
   *    the names and the values are the constructors.
   * @param {Function|Array} constructor Controller constructor fn (optionally decorated with DI
   *    annotations in the array notation).
   */
this.register=function(b,c){ga(b,"controller"),t(b)?l(a,b):a[b]=c},/**
   * @ngdoc method
   * @name $controllerProvider#allowGlobals
   * @description If called, allows `$controller` to find controller constructors on `window`
   */
this.allowGlobals=function(){b=!0},this.$get=["$injector","$window",function(f,g){function h(a,b,c,e){if(!a||!t(a.$scope))throw d("$controller")("noscp","Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.",e,b);a.$scope[b]=c}/**
     * @ngdoc service
     * @name $controller
     * @requires $injector
     *
     * @param {Function|string} constructor If called with a function then it's considered to be the
     *    controller constructor function. Otherwise it's considered to be a string which is used
     *    to retrieve the controller constructor using the following steps:
     *
     *    * check if a controller with given name is registered via `$controllerProvider`
     *    * check if evaluating the string on the current scope returns a constructor
     *    * if $controllerProvider#allowGlobals, check `window[constructor]` on the global
     *      `window` object (not recommended)
     *
     *    The string can use the `controller as property` syntax, where the controller instance is published
     *    as the specified property on the `scope`; the `scope` must be injected into `locals` param for this
     *    to work correctly.
     *
     * @param {Object} locals Injection locals for Controller.
     * @return {Object} Instance of given controller.
     *
     * @description
     * `$controller` service is responsible for instantiating controllers.
     *
     * It's just a simple call to {@link auto.$injector $injector}, but extracted into
     * a service, so that one can override this service with [BC version](https://gist.github.com/1649788).
     */
return function(d,i,j,k){
// PRIVATE API:
//   param `later` --- indicates that the controller's constructor is invoked at a later time.
//                     If true, $controller will allocate the object with the correct
//                     prototype chain, but will not invoke the controller until a returned
//                     callback is invoked.
//   param `ident` --- An optional label which overrides the label parsed from the controller
//                     expression, if any.
var m,n,o,p;if(j=j===!0,k&&u(k)&&(p=k),u(d)){if(n=d.match(e),!n)throw Yd("ctrlfmt","Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.",d);o=n[1],p=p||n[3],d=a.hasOwnProperty(o)?a[o]:ha(i.$scope,o,!0)||(b?ha(g,o,!0):c),fa(d,o,!0)}if(j){
// Instantiate controller later:
// This machinery is used to create an instance of the object before calling the
// controller's constructor itself.
//
// This allows properties to be added to the controller before the constructor is
// invoked. Primarily, this is used for isolate scope bindings in $compile.
//
// This feature is not intended for use by applications, and is thus not documented
// publicly.
// Object creation: http://jsperf.com/create-constructor/2
var q=(ld(d)?d[d.length-1]:d).prototype;return m=Object.create(q||null),p&&h(i,p,m,o||d.name),l(function(){return f.invoke(d,m,i,o),m},{instance:m,identifier:p})}return m=f.instantiate(d,i,o),p&&h(i,p,m,o||d.name),m}}]}/**
 * @ngdoc service
 * @name $document
 * @requires $window
 *
 * @description
 * A {@link angular.element jQuery or jqLite} wrapper for the browser's `window.document` object.
 *
 * @example
   <example module="documentExample">
     <file name="index.html">
       <div ng-controller="ExampleController">
         <p>$document title: <b ng-bind="title"></b></p>
         <p>window.document title: <b ng-bind="windowTitle"></b></p>
       </div>
     </file>
     <file name="script.js">
       angular.module('documentExample', [])
         .controller('ExampleController', ['$scope', '$document', function($scope, $document) {
           $scope.title = $document[0].title;
           $scope.windowTitle = angular.element(window.document)[0].title;
         }]);
     </file>
   </example>
 */
function cb(){this.$get=["$window",function(a){return ad(a.document)}]}/**
 * @ngdoc service
 * @name $exceptionHandler
 * @requires ng.$log
 *
 * @description
 * Any uncaught exception in angular expressions is delegated to this service.
 * The default implementation simply delegates to `$log.error` which logs it into
 * the browser console.
 *
 * In unit tests, if `angular-mocks.js` is loaded, this service is overridden by
 * {@link ngMock.$exceptionHandler mock $exceptionHandler} which aids in testing.
 *
 * ## Example:
 *
 * ```js
 *   angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
 *     return function(exception, cause) {
 *       exception.message += ' (caused by "' + cause + '")';
 *       throw exception;
 *     };
 *   });
 * ```
 *
 * This example will override the normal action of `$exceptionHandler`, to make angular
 * exceptions fail hard when they happen, instead of just logging to the console.
 *
 * <hr />
 * Note, that code executed in event-listeners (even those registered using jqLite's `on`/`bind`
 * methods) does not delegate exceptions to the {@link ng.$exceptionHandler $exceptionHandler}
 * (unless executed during a digest).
 *
 * If you wish, you can manually delegate exceptions, e.g.
 * `try { ... } catch(e) { $exceptionHandler(e); }`
 *
 * @param {Error} exception Exception associated with the error.
 * @param {string=} cause optional information about the context in which
 *       the error was thrown.
 *
 */
function db(){this.$get=["$log",function(a){return function(b,c){a.error.apply(a,arguments)}}]}function eb(a,b){if(u(a)){
// Strip json vulnerability protection prefix and trim whitespace
var c=a.replace(be,"").trim();if(c){var d=b("Content-Type");(d&&0===d.indexOf(Zd)||fb(c))&&(a=S(c))}}return a}function fb(a){var b=a.match(_d);return b&&ae[b[0]].test(a)}/**
 * Parse headers into key value object
 *
 * @param {string} headers Raw headers as a string
 * @returns {Object} Parsed headers as key value object
 */
function gb(a){var b,c,d,e=ja();return a?(f(a.split("\n"),function(a){d=a.indexOf(":"),b=Wc(md(a.substr(0,d))),c=md(a.substr(d+1)),b&&(e[b]=e[b]?e[b]+", "+c:c)}),e):e}/**
 * Returns a function that provides access to parsed headers.
 *
 * Headers are lazy parsed when first requested.
 * @see parseHeaders
 *
 * @param {(string|Object)} headers Headers to provide access to.
 * @returns {function(string=)} Returns a getter function which if called with:
 *
 *   - if called with single an argument returns a single header value or null
 *   - if called with no arguments returns an object containing all headers.
 */
function hb(a){var b=t(a)?a:c;return function(c){if(b||(b=gb(a)),c){var d=b[Wc(c)];return void 0===d&&(d=null),d}return b}}/**
 * Chain all given functions
 *
 * This function is used for both request and response transforming
 *
 * @param {*} data Data to transform.
 * @param {function(string=)} headers HTTP headers getter fn.
 * @param {number} status HTTP status code of the response.
 * @param {(Function|Array.<Function>)} fns Function or an array of functions.
 * @returns {*} Transformed data.
 */
function ib(a,b,c,d){return x(d)?d(a,b,c):(f(d,function(d){a=d(a,b,c)}),a)}function jb(a){return a>=200&&300>a}/**
 * @ngdoc provider
 * @name $httpProvider
 * @description
 * Use `$httpProvider` to change the default behavior of the {@link ng.$http $http} service.
 * */
function kb(){/**
   * @ngdoc property
   * @name $httpProvider#defaults
   * @description
   *
   * Object containing default values for all {@link ng.$http $http} requests.
   *
   * - **`defaults.cache`** - {Object} - an object built with {@link ng.$cacheFactory `$cacheFactory`}
   * that will provide the cache for all requests who set their `cache` property to `true`.
   * If you set the `default.cache = false` then only requests that specify their own custom
   * cache object will be cached. See {@link $http#caching $http Caching} for more information.
   *
   * - **`defaults.xsrfCookieName`** - {string} - Name of cookie containing the XSRF token.
   * Defaults value is `'XSRF-TOKEN'`.
   *
   * - **`defaults.xsrfHeaderName`** - {string} - Name of HTTP header to populate with the
   * XSRF token. Defaults value is `'X-XSRF-TOKEN'`.
   *
   * - **`defaults.headers`** - {Object} - Default headers for all $http requests.
   * Refer to {@link ng.$http#setting-http-headers $http} for documentation on
   * setting default headers.
   *     - **`defaults.headers.common`**
   *     - **`defaults.headers.post`**
   *     - **`defaults.headers.put`**
   *     - **`defaults.headers.patch`**
   *
   **/
var a=this.defaults={
// transform incoming response data
transformResponse:[eb],
// transform outgoing request data
transformRequest:[function(a){return!t(a)||B(a)||D(a)||C(a)?a:R(a)}],
// default headers
headers:{common:{Accept:"application/json, text/plain, */*"},post:L($d),put:L($d),patch:L($d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},b=!1;/**
   * @ngdoc method
   * @name $httpProvider#useApplyAsync
   * @description
   *
   * Configure $http service to combine processing of multiple http responses received at around
   * the same time via {@link ng.$rootScope.Scope#$applyAsync $rootScope.$applyAsync}. This can result in
   * significant performance improvement for bigger applications that make many HTTP requests
   * concurrently (common during application bootstrap).
   *
   * Defaults to false. If no value is specifed, returns the current configured value.
   *
   * @param {boolean=} value If true, when requests are loaded, they will schedule a deferred
   *    "apply" on the next tick, giving time for subsequent requests in a roughly ~10ms window
   *    to load and share the same digest cycle.
   *
   * @returns {boolean|Object} If a value is specified, returns the $httpProvider for chaining.
   *    otherwise, returns the current configured value.
   **/
this.useApplyAsync=function(a){return s(a)?(b=!!a,this):b};/**
   * @ngdoc property
   * @name $httpProvider#interceptors
   * @description
   *
   * Array containing service factories for all synchronous or asynchronous {@link ng.$http $http}
   * pre-processing of request or postprocessing of responses.
   *
   * These service factories are ordered by request, i.e. they are applied in the same order as the
   * array, on request, but reverse order, on response.
   *
   * {@link ng.$http#interceptors Interceptors detailed info}
   **/
var e=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(g,i,j,k,m,n){/**
     * @ngdoc service
     * @kind function
     * @name $http
     * @requires ng.$httpBackend
     * @requires $cacheFactory
     * @requires $rootScope
     * @requires $q
     * @requires $injector
     *
     * @description
     * The `$http` service is a core Angular service that facilitates communication with the remote
     * HTTP servers via the browser's [XMLHttpRequest](https://developer.mozilla.org/en/xmlhttprequest)
     * object or via [JSONP](http://en.wikipedia.org/wiki/JSONP).
     *
     * For unit testing applications that use `$http` service, see
     * {@link ngMock.$httpBackend $httpBackend mock}.
     *
     * For a higher level of abstraction, please check out the {@link ngResource.$resource
     * $resource} service.
     *
     * The $http API is based on the {@link ng.$q deferred/promise APIs} exposed by
     * the $q service. While for simple usage patterns this doesn't matter much, for advanced usage
     * it is important to familiarize yourself with these APIs and the guarantees they provide.
     *
     *
     * ## General usage
     * The `$http` service is a function which takes a single argument — a configuration object —
     * that is used to generate an HTTP request and returns  a {@link ng.$q promise}
     * with two $http specific methods: `success` and `error`.
     *
     * ```js
     *   // Simple GET request example :
     *   $http.get('/someUrl').
     *     success(function(data, status, headers, config) {
     *       // this callback will be called asynchronously
     *       // when the response is available
     *     }).
     *     error(function(data, status, headers, config) {
     *       // called asynchronously if an error occurs
     *       // or server returns response with an error status.
     *     });
     * ```
     *
     * ```js
     *   // Simple POST request example (passing data) :
     *   $http.post('/someUrl', {msg:'hello word!'}).
     *     success(function(data, status, headers, config) {
     *       // this callback will be called asynchronously
     *       // when the response is available
     *     }).
     *     error(function(data, status, headers, config) {
     *       // called asynchronously if an error occurs
     *       // or server returns response with an error status.
     *     });
     * ```
     *
     *
     * Since the returned value of calling the $http function is a `promise`, you can also use
     * the `then` method to register callbacks, and these callbacks will receive a single argument –
     * an object representing the response. See the API signature and type info below for more
     * details.
     *
     * A response status code between 200 and 299 is considered a success status and
     * will result in the success callback being called. Note that if the response is a redirect,
     * XMLHttpRequest will transparently follow it, meaning that the error callback will not be
     * called for such responses.
     *
     * ## Writing Unit Tests that use $http
     * When unit testing (using {@link ngMock ngMock}), it is necessary to call
     * {@link ngMock.$httpBackend#flush $httpBackend.flush()} to flush each pending
     * request using trained responses.
     *
     * ```
     * $httpBackend.expectGET(...);
     * $http.get(...);
     * $httpBackend.flush();
     * ```
     *
     * ## Shortcut methods
     *
     * Shortcut methods are also available. All shortcut methods require passing in the URL, and
     * request data must be passed in for POST/PUT requests.
     *
     * ```js
     *   $http.get('/someUrl').success(successCallback);
     *   $http.post('/someUrl', data).success(successCallback);
     * ```
     *
     * Complete list of shortcut methods:
     *
     * - {@link ng.$http#get $http.get}
     * - {@link ng.$http#head $http.head}
     * - {@link ng.$http#post $http.post}
     * - {@link ng.$http#put $http.put}
     * - {@link ng.$http#delete $http.delete}
     * - {@link ng.$http#jsonp $http.jsonp}
     * - {@link ng.$http#patch $http.patch}
     *
     *
     * ## Setting HTTP Headers
     *
     * The $http service will automatically add certain HTTP headers to all requests. These defaults
     * can be fully configured by accessing the `$httpProvider.defaults.headers` configuration
     * object, which currently contains this default configuration:
     *
     * - `$httpProvider.defaults.headers.common` (headers that are common for all requests):
     *   - `Accept: application/json, text/plain, * / *`
     * - `$httpProvider.defaults.headers.post`: (header defaults for POST requests)
     *   - `Content-Type: application/json`
     * - `$httpProvider.defaults.headers.put` (header defaults for PUT requests)
     *   - `Content-Type: application/json`
     *
     * To add or overwrite these defaults, simply add or remove a property from these configuration
     * objects. To add headers for an HTTP method other than POST or PUT, simply add a new object
     * with the lowercased HTTP method name as the key, e.g.
     * `$httpProvider.defaults.headers.get = { 'My-Header' : 'value' }.
     *
     * The defaults can also be set at runtime via the `$http.defaults` object in the same
     * fashion. For example:
     *
     * ```
     * module.run(function($http) {
     *   $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
     * });
     * ```
     *
     * In addition, you can supply a `headers` property in the config object passed when
     * calling `$http(config)`, which overrides the defaults without changing them globally.
     *
     * To explicitly remove a header automatically added via $httpProvider.defaults.headers on a per request basis,
     * Use the `headers` property, setting the desired header to `undefined`. For example:
     *
     * ```js
     * var req = {
     *  method: 'POST',
     *  url: 'http://example.com',
     *  headers: {
     *    'Content-Type': undefined
     *  },
     *  data: { test: 'test' },
     * }
     *
     * $http(req).success(function(){...}).error(function(){...});
     * ```
     *
     * ## Transforming Requests and Responses
     *
     * Both requests and responses can be transformed using transformation functions: `transformRequest`
     * and `transformResponse`. These properties can be a single function that returns
     * the transformed value (`function(data, headersGetter, status)`) or an array of such transformation functions,
     * which allows you to `push` or `unshift` a new transformation function into the transformation chain.
     *
     * ### Default Transformations
     *
     * The `$httpProvider` provider and `$http` service expose `defaults.transformRequest` and
     * `defaults.transformResponse` properties. If a request does not provide its own transformations
     * then these will be applied.
     *
     * You can augment or replace the default transformations by modifying these properties by adding to or
     * replacing the array.
     *
     * Angular provides the following default transformations:
     *
     * Request transformations (`$httpProvider.defaults.transformRequest` and `$http.defaults.transformRequest`):
     *
     * - If the `data` property of the request configuration object contains an object, serialize it
     *   into JSON format.
     *
     * Response transformations (`$httpProvider.defaults.transformResponse` and `$http.defaults.transformResponse`):
     *
     *  - If XSRF prefix is detected, strip it (see Security Considerations section below).
     *  - If JSON response is detected, deserialize it using a JSON parser.
     *
     *
     * ### Overriding the Default Transformations Per Request
     *
     * If you wish override the request/response transformations only for a single request then provide
     * `transformRequest` and/or `transformResponse` properties on the configuration object passed
     * into `$http`.
     *
     * Note that if you provide these properties on the config object the default transformations will be
     * overwritten. If you wish to augment the default transformations then you must include them in your
     * local transformation array.
     *
     * The following code demonstrates adding a new response transformation to be run after the default response
     * transformations have been run.
     *
     * ```js
     * function appendTransform(defaults, transform) {
     *
     *   // We can't guarantee that the default transformation is an array
     *   defaults = angular.isArray(defaults) ? defaults : [defaults];
     *
     *   // Append the new transformation to the defaults
     *   return defaults.concat(transform);
     * }
     *
     * $http({
     *   url: '...',
     *   method: 'GET',
     *   transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
     *     return doTransform(value);
     *   })
     * });
     * ```
     *
     *
     * ## Caching
     *
     * To enable caching, set the request configuration `cache` property to `true` (to use default
     * cache) or to a custom cache object (built with {@link ng.$cacheFactory `$cacheFactory`}).
     * When the cache is enabled, `$http` stores the response from the server in the specified
     * cache. The next time the same request is made, the response is served from the cache without
     * sending a request to the server.
     *
     * Note that even if the response is served from cache, delivery of the data is asynchronous in
     * the same way that real requests are.
     *
     * If there are multiple GET requests for the same URL that should be cached using the same
     * cache, but the cache is not populated yet, only one request to the server will be made and
     * the remaining requests will be fulfilled using the response from the first request.
     *
     * You can change the default cache to a new object (built with
     * {@link ng.$cacheFactory `$cacheFactory`}) by updating the
     * {@link ng.$http#defaults `$http.defaults.cache`} property. All requests who set
     * their `cache` property to `true` will now use this cache object.
     *
     * If you set the default cache to `false` then only requests that specify their own custom
     * cache object will be cached.
     *
     * ## Interceptors
     *
     * Before you start creating interceptors, be sure to understand the
     * {@link ng.$q $q and deferred/promise APIs}.
     *
     * For purposes of global error handling, authentication, or any kind of synchronous or
     * asynchronous pre-processing of request or postprocessing of responses, it is desirable to be
     * able to intercept requests before they are handed to the server and
     * responses before they are handed over to the application code that
     * initiated these requests. The interceptors leverage the {@link ng.$q
     * promise APIs} to fulfill this need for both synchronous and asynchronous pre-processing.
     *
     * The interceptors are service factories that are registered with the `$httpProvider` by
     * adding them to the `$httpProvider.interceptors` array. The factory is called and
     * injected with dependencies (if specified) and returns the interceptor.
     *
     * There are two kinds of interceptors (and two kinds of rejection interceptors):
     *
     *   * `request`: interceptors get called with a http `config` object. The function is free to
     *     modify the `config` object or create a new one. The function needs to return the `config`
     *     object directly, or a promise containing the `config` or a new `config` object.
     *   * `requestError`: interceptor gets called when a previous interceptor threw an error or
     *     resolved with a rejection.
     *   * `response`: interceptors get called with http `response` object. The function is free to
     *     modify the `response` object or create a new one. The function needs to return the `response`
     *     object directly, or as a promise containing the `response` or a new `response` object.
     *   * `responseError`: interceptor gets called when a previous interceptor threw an error or
     *     resolved with a rejection.
     *
     *
     * ```js
     *   // register the interceptor as a service
     *   $provide.factory('myHttpInterceptor', function($q, dependency1, dependency2) {
     *     return {
     *       // optional method
     *       'request': function(config) {
     *         // do something on success
     *         return config;
     *       },
     *
     *       // optional method
     *      'requestError': function(rejection) {
     *         // do something on error
     *         if (canRecover(rejection)) {
     *           return responseOrNewPromise
     *         }
     *         return $q.reject(rejection);
     *       },
     *
     *
     *
     *       // optional method
     *       'response': function(response) {
     *         // do something on success
     *         return response;
     *       },
     *
     *       // optional method
     *      'responseError': function(rejection) {
     *         // do something on error
     *         if (canRecover(rejection)) {
     *           return responseOrNewPromise
     *         }
     *         return $q.reject(rejection);
     *       }
     *     };
     *   });
     *
     *   $httpProvider.interceptors.push('myHttpInterceptor');
     *
     *
     *   // alternatively, register the interceptor via an anonymous factory
     *   $httpProvider.interceptors.push(function($q, dependency1, dependency2) {
     *     return {
     *      'request': function(config) {
     *          // same as above
     *       },
     *
     *       'response': function(response) {
     *          // same as above
     *       }
     *     };
     *   });
     * ```
     *
     * ## Security Considerations
     *
     * When designing web applications, consider security threats from:
     *
     * - [JSON vulnerability](http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx)
     * - [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
     *
     * Both server and the client must cooperate in order to eliminate these threats. Angular comes
     * pre-configured with strategies that address these issues, but for this to work backend server
     * cooperation is required.
     *
     * ### JSON Vulnerability Protection
     *
     * A [JSON vulnerability](http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx)
     * allows third party website to turn your JSON resource URL into
     * [JSONP](http://en.wikipedia.org/wiki/JSONP) request under some conditions. To
     * counter this your server can prefix all JSON requests with following string `")]}',\n"`.
     * Angular will automatically strip the prefix before processing it as JSON.
     *
     * For example if your server needs to return:
     * ```js
     * ['one','two']
     * ```
     *
     * which is vulnerable to attack, your server can return:
     * ```js
     * )]}',
     * ['one','two']
     * ```
     *
     * Angular will strip the prefix, before processing the JSON.
     *
     *
     * ### Cross Site Request Forgery (XSRF) Protection
     *
     * [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) is a technique by which
     * an unauthorized site can gain your user's private data. Angular provides a mechanism
     * to counter XSRF. When performing XHR requests, the $http service reads a token from a cookie
     * (by default, `XSRF-TOKEN`) and sets it as an HTTP header (`X-XSRF-TOKEN`). Since only
     * JavaScript that runs on your domain could read the cookie, your server can be assured that
     * the XHR came from JavaScript running on your domain. The header will not be set for
     * cross-domain requests.
     *
     * To take advantage of this, your server needs to set a token in a JavaScript readable session
     * cookie called `XSRF-TOKEN` on the first HTTP GET request. On subsequent XHR requests the
     * server can verify that the cookie matches `X-XSRF-TOKEN` HTTP header, and therefore be sure
     * that only JavaScript running on your domain could have sent the request. The token must be
     * unique for each user and must be verifiable by the server (to prevent the JavaScript from
     * making up its own tokens). We recommend that the token is a digest of your site's
     * authentication cookie with a [salt](https://en.wikipedia.org/wiki/Salt_(cryptography&#41;)
     * for added security.
     *
     * The name of the headers can be specified using the xsrfHeaderName and xsrfCookieName
     * properties of either $httpProvider.defaults at config-time, $http.defaults at run-time,
     * or the per-request config object.
     *
     *
     * @param {object} config Object describing the request to be made and how it should be
     *    processed. The object has following properties:
     *
     *    - **method** – `{string}` – HTTP method (e.g. 'GET', 'POST', etc)
     *    - **url** – `{string}` – Absolute or relative URL of the resource that is being requested.
     *    - **params** – `{Object.<string|Object>}` – Map of strings or objects which will be turned
     *      to `?key1=value1&key2=value2` after the url. If the value is not a string, it will be
     *      JSONified.
     *    - **data** – `{string|Object}` – Data to be sent as the request message data.
     *    - **headers** – `{Object}` – Map of strings or functions which return strings representing
     *      HTTP headers to send to the server. If the return value of a function is null, the
     *      header will not be sent.
     *    - **xsrfHeaderName** – `{string}` – Name of HTTP header to populate with the XSRF token.
     *    - **xsrfCookieName** – `{string}` – Name of cookie containing the XSRF token.
     *    - **transformRequest** –
     *      `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
     *      transform function or an array of such functions. The transform function takes the http
     *      request body and headers and returns its transformed (typically serialized) version.
     *      See {@link ng.$http#overriding-the-default-transformations-per-request
     *      Overriding the Default Transformations}
     *    - **transformResponse** –
     *      `{function(data, headersGetter, status)|Array.<function(data, headersGetter, status)>}` –
     *      transform function or an array of such functions. The transform function takes the http
     *      response body, headers and status and returns its transformed (typically deserialized) version.
     *      See {@link ng.$http#overriding-the-default-transformations-per-request
     *      Overriding the Default Transformations}
     *    - **cache** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the
     *      GET request, otherwise if a cache instance built with
     *      {@link ng.$cacheFactory $cacheFactory}, this cache will be used for
     *      caching.
     *    - **timeout** – `{number|Promise}` – timeout in milliseconds, or {@link ng.$q promise}
     *      that should abort the request when resolved.
     *    - **withCredentials** - `{boolean}` - whether to set the `withCredentials` flag on the
     *      XHR object. See [requests with credentials](https://developer.mozilla.org/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials)
     *      for more information.
     *    - **responseType** - `{string}` - see
     *      [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).
     *
     * @returns {HttpPromise} Returns a {@link ng.$q promise} object with the
     *   standard `then` method and two http specific methods: `success` and `error`. The `then`
     *   method takes two arguments a success and an error callback which will be called with a
     *   response object. The `success` and `error` methods take a single argument - a function that
     *   will be called when the request succeeds or fails respectively. The arguments passed into
     *   these functions are destructured representation of the response object passed into the
     *   `then` method. The response object has these properties:
     *
     *   - **data** – `{string|Object}` – The response body transformed with the transform
     *     functions.
     *   - **status** – `{number}` – HTTP status code of the response.
     *   - **headers** – `{function([headerName])}` – Header getter function.
     *   - **config** – `{Object}` – The configuration object that was used to generate the request.
     *   - **statusText** – `{string}` – HTTP status text of the response.
     *
     * @property {Array.<Object>} pendingRequests Array of config objects for currently pending
     *   requests. This is primarily meant to be used for debugging purposes.
     *
     *
     * @example
<example module="httpExample">
<file name="index.html">
  <div ng-controller="FetchController">
    <select ng-model="method">
      <option>GET</option>
      <option>JSONP</option>
    </select>
    <input type="text" ng-model="url" size="80"/>
    <button id="fetchbtn" ng-click="fetch()">fetch</button><br>
    <button id="samplegetbtn" ng-click="updateModel('GET', 'http-hello.html')">Sample GET</button>
    <button id="samplejsonpbtn"
      ng-click="updateModel('JSONP',
                    'https://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero')">
      Sample JSONP
    </button>
    <button id="invalidjsonpbtn"
      ng-click="updateModel('JSONP', 'https://angularjs.org/doesntexist&callback=JSON_CALLBACK')">
        Invalid JSONP
      </button>
    <pre>http status code: {{status}}</pre>
    <pre>http response data: {{data}}</pre>
  </div>
</file>
<file name="script.js">
  angular.module('httpExample', [])
    .controller('FetchController', ['$scope', '$http', '$templateCache',
      function($scope, $http, $templateCache) {
        $scope.method = 'GET';
        $scope.url = 'http-hello.html';

        $scope.fetch = function() {
          $scope.code = null;
          $scope.response = null;

          $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
            success(function(data, status) {
              $scope.status = status;
              $scope.data = data;
            }).
            error(function(data, status) {
              $scope.data = data || "Request failed";
              $scope.status = status;
          });
        };

        $scope.updateModel = function(method, url) {
          $scope.method = method;
          $scope.url = url;
        };
      }]);
</file>
<file name="http-hello.html">
  Hello, $http!
</file>
<file name="protractor.js" type="protractor">
  var status = element(by.binding('status'));
  var data = element(by.binding('data'));
  var fetchBtn = element(by.id('fetchbtn'));
  var sampleGetBtn = element(by.id('samplegetbtn'));
  var sampleJsonpBtn = element(by.id('samplejsonpbtn'));
  var invalidJsonpBtn = element(by.id('invalidjsonpbtn'));

  it('should make an xhr GET request', function() {
    sampleGetBtn.click();
    fetchBtn.click();
    expect(status.getText()).toMatch('200');
    expect(data.getText()).toMatch(/Hello, \$http!/);
  });

// Commented out due to flakes. See https://github.com/angular/angular.js/issues/9185
// it('should make a JSONP request to angularjs.org', function() {
//   sampleJsonpBtn.click();
//   fetchBtn.click();
//   expect(status.getText()).toMatch('200');
//   expect(data.getText()).toMatch(/Super Hero!/);
// });

  it('should make JSONP request to invalid URL and invoke the error handler',
      function() {
    invalidJsonpBtn.click();
    fetchBtn.click();
    expect(status.getText()).toMatch('0');
    expect(data.getText()).toMatch('Request failed');
  });
</file>
</example>
     */
function o(b){function e(a){
// make a copy since the response must be cacheable
var b=l({},a);return a.data?b.data=ib(a.data,a.headers,a.status,i.transformResponse):b.data=a.data,jb(a.status)?b:m.reject(b)}function g(a){var b,c={};return f(a,function(a,d){x(a)?(b=a(),null!=b&&(c[d]=b)):c[d]=a}),c}function h(b){var c,d,e,f=a.headers,h=l({},b.headers);f=l({},f.common,f[Wc(b.method)]);
// using for-in instead of forEach to avoid unecessary iteration after header has been found
a:for(c in f){d=Wc(c);for(e in h)if(Wc(e)===d)continue a;h[c]=f[c]}
// execute if header value is a function for merged headers
return g(h)}if(!id.isObject(b))throw d("$http")("badreq","Http request configuration must be an object.  Received: {0}",b);var i=l({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse},b);i.headers=h(b),i.method=Yc(i.method);var j=function(b){var d=b.headers,g=ib(b.data,hb(d),c,b.transformRequest);
// send request
// strip content-type if data is undefined
return r(g)&&f(d,function(a,b){"content-type"===Wc(b)&&delete d[b]}),r(b.withCredentials)&&!r(a.withCredentials)&&(b.withCredentials=a.withCredentials),v(b,g).then(e,e)},k=[j,c],n=m.when(i);for(
// apply interceptors
f(A,function(a){(a.request||a.requestError)&&k.unshift(a.request,a.requestError),(a.response||a.responseError)&&k.push(a.response,a.responseError)});k.length;){var o=k.shift(),p=k.shift();n=n.then(o,p)}return n.success=function(a){return n.then(function(b){a(b.data,b.status,b.headers,i)}),n},n.error=function(a){return n.then(null,function(b){a(b.data,b.status,b.headers,i)}),n},n}function p(a){f(arguments,function(a){o[a]=function(b,c){return o(l(c||{},{method:a,url:b}))}})}function q(a){f(arguments,function(a){o[a]=function(b,c,d){return o(l(d||{},{method:a,url:b,data:c}))}})}/**
     * Makes the request.
     *
     * !!! ACCESSES CLOSURE VARS:
     * $httpBackend, defaults, $log, $rootScope, defaultCache, $http.pendingRequests
     */
function v(d,e){/**
       * Callback registered to $httpBackend():
       *  - caches the response if desired
       *  - resolves the raw $http promise
       *  - calls $apply
       */
function f(a,c,d,e){function f(){h(c,a,d,e)}n&&(jb(a)?n.put(w,[a,c,gb(d),e]):
// remove promise from the cache
n.remove(w)),b?k.$applyAsync(f):(f(),k.$$phase||k.$apply())}/**
       * Resolves the raw $http promise.
       */
function h(a,b,c,e){
// normalize internal statuses to 0
b=Math.max(b,0),(jb(b)?q.resolve:q.reject)({data:a,status:b,headers:hb(c),config:d,statusText:e})}function j(a){h(a.data,a.status,L(a.headers()),a.statusText)}function l(){var a=o.pendingRequests.indexOf(d);-1!==a&&o.pendingRequests.splice(a,1)}var n,p,q=m.defer(),u=q.promise,v=d.headers,w=y(d.url,d.params);
// if we won't have the response in cache, set the xsrf headers and
// send the request to the backend
if(o.pendingRequests.push(d),u.then(l,l),!d.cache&&!a.cache||d.cache===!1||"GET"!==d.method&&"JSONP"!==d.method||(n=t(d.cache)?d.cache:t(a.cache)?a.cache:z),n&&(p=n.get(w),s(p)?F(p)?
// cached request has already been sent, but there is no response yet
p.then(j,j):
// serving from cache
ld(p)?h(p[1],p[0],L(p[2]),p[3]):h(p,200,{},"OK"):
// put the promise for the non-transformed response into cache as a placeholder
n.put(w,u)),r(p)){var x=ec(d.url)?i.cookies()[d.xsrfCookieName||a.xsrfCookieName]:c;x&&(v[d.xsrfHeaderName||a.xsrfHeaderName]=x),g(d.method,w,e,f,v,d.timeout,d.withCredentials,d.responseType)}return u}function y(a,b){if(!b)return a;var c=[];return h(b,function(a,b){null===a||r(a)||(ld(a)||(a=[a]),f(a,function(a){t(a)&&(a=w(a)?a.toISOString():R(a)),c.push(Y(b)+"="+Y(a))}))}),c.length>0&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&")),a}var z=j("$http"),A=[];/**
     * @ngdoc method
     * @name $http#get
     *
     * @description
     * Shortcut method to perform `GET` request.
     *
     * @param {string} url Relative or absolute URL specifying the destination of the request
     * @param {Object=} config Optional configuration object
     * @returns {HttpPromise} Future object
     */
/**
     * @ngdoc method
     * @name $http#delete
     *
     * @description
     * Shortcut method to perform `DELETE` request.
     *
     * @param {string} url Relative or absolute URL specifying the destination of the request
     * @param {Object=} config Optional configuration object
     * @returns {HttpPromise} Future object
     */
/**
     * @ngdoc method
     * @name $http#head
     *
     * @description
     * Shortcut method to perform `HEAD` request.
     *
     * @param {string} url Relative or absolute URL specifying the destination of the request
     * @param {Object=} config Optional configuration object
     * @returns {HttpPromise} Future object
     */
/**
     * @ngdoc method
     * @name $http#jsonp
     *
     * @description
     * Shortcut method to perform `JSONP` request.
     *
     * @param {string} url Relative or absolute URL specifying the destination of the request.
     *                     The name of the callback should be the string `JSON_CALLBACK`.
     * @param {Object=} config Optional configuration object
     * @returns {HttpPromise} Future object
     */
/**
     * @ngdoc method
     * @name $http#post
     *
     * @description
     * Shortcut method to perform `POST` request.
     *
     * @param {string} url Relative or absolute URL specifying the destination of the request
     * @param {*} data Request content
     * @param {Object=} config Optional configuration object
     * @returns {HttpPromise} Future object
     */
/**
     * @ngdoc method
     * @name $http#put
     *
     * @description
     * Shortcut method to perform `PUT` request.
     *
     * @param {string} url Relative or absolute URL specifying the destination of the request
     * @param {*} data Request content
     * @param {Object=} config Optional configuration object
     * @returns {HttpPromise} Future object
     */
/**
      * @ngdoc method
      * @name $http#patch
      *
      * @description
      * Shortcut method to perform `PATCH` request.
      *
      * @param {string} url Relative or absolute URL specifying the destination of the request
      * @param {*} data Request content
      * @param {Object=} config Optional configuration object
      * @returns {HttpPromise} Future object
      */
/**
         * @ngdoc property
         * @name $http#defaults
         *
         * @description
         * Runtime equivalent of the `$httpProvider.defaults` property. Allows configuration of
         * default headers, withCredentials as well as request and response transformations.
         *
         * See "Setting HTTP Headers" and "Transforming Requests and Responses" sections above.
         */
return f(e,function(a){A.unshift(u(a)?n.get(a):n.invoke(a))}),o.pendingRequests=[],p("get","delete","head","jsonp"),q("post","put","patch"),o.defaults=a,o}]}function lb(){return new a.XMLHttpRequest}/**
 * @ngdoc service
 * @name $httpBackend
 * @requires $window
 * @requires $document
 *
 * @description
 * HTTP backend used by the {@link ng.$http service} that delegates to
 * XMLHttpRequest object or JSONP and deals with browser incompatibilities.
 *
 * You should never need to use this service directly, instead use the higher-level abstractions:
 * {@link ng.$http $http} or {@link ngResource.$resource $resource}.
 *
 * During testing this implementation is swapped with {@link ngMock.$httpBackend mock
 * $httpBackend} which can be trained with responses.
 */
function mb(){this.$get=["$browser","$window","$document",function(a,b,c){return nb(a,lb,a.defer,b.angular.callbacks,c[0])}]}function nb(a,b,d,e,g){function h(a,b,c){
// we can't use jQuery/jqLite here because jQuery does crazy shit with script elements, e.g.:
// - fetches local scripts via XHR and evals them
// - adds and immediately removes script elements from the document
var d=g.createElement("script"),f=null;return d.type="text/javascript",d.src=a,d.async=!0,f=function(a){Bd(d,"load",f),Bd(d,"error",f),g.body.removeChild(d),d=null;var h=-1,i="unknown";a&&("load"!==a.type||e[b].called||(a={type:"error"}),i=a.type,h="error"===a.type?404:200),c&&c(h,i)},Ad(d,"load",f),Ad(d,"error",f),g.body.appendChild(d),f}
// TODO(vojta): fix the signature
return function(g,i,j,k,l,m,n,p){function q(){u&&u(),v&&v.abort()}function r(b,e,f,g,h){
// cancel timeout and subsequent timeout promise resolution
y!==c&&d.cancel(y),u=v=null,b(e,f,g,h),a.$$completeOutstandingRequest(o)}if(a.$$incOutstandingRequestCount(),i=i||a.url(),"jsonp"==Wc(g)){var t="_"+(e.counter++).toString(36);e[t]=function(a){e[t].data=a,e[t].called=!0};var u=h(i.replace("JSON_CALLBACK","angular.callbacks."+t),t,function(a,b){r(k,a,e[t].data,"",b),e[t]=o})}else{var v=b();v.open(g,i,!0),f(l,function(a,b){s(a)&&v.setRequestHeader(b,a)}),v.onload=function(){var a=v.statusText||"",b="response"in v?v.response:v.responseText,c=1223===v.status?204:v.status;
// fix status code when it is 0 (0 status is undocumented).
// Occurs when accessing file resources or on Android 4.1 stock browser
// while retrieving files from application cache.
0===c&&(c=b?200:"file"==dc(i).protocol?404:0),r(k,c,b,v.getAllResponseHeaders(),a)};var w=function(){
// The response is always empty
// See https://xhr.spec.whatwg.org/#request-error-steps and https://fetch.spec.whatwg.org/#concept-network-error
r(k,-1,null,null,"")};if(v.onerror=w,v.onabort=w,n&&(v.withCredentials=!0),p)try{v.responseType=p}catch(x){
// WebKit added support for the json responseType value on 09/03/2013
// https://bugs.webkit.org/show_bug.cgi?id=73648. Versions of Safari prior to 7 are
// known to throw when setting the value "json" as the response type. Other older
// browsers implementing the responseType
//
// The json response type can be ignored if not supported, because JSON payloads are
// parsed on the client-side regardless.
if("json"!==p)throw x}v.send(j||null)}if(m>0)var y=d(q,m);else F(m)&&m.then(q)}}/**
 * @ngdoc provider
 * @name $interpolateProvider
 *
 * @description
 *
 * Used for configuring the interpolation markup. Defaults to `{{` and `}}`.
 *
 * @example
<example module="customInterpolationApp">
<file name="index.html">
<script>
  var customInterpolationApp = angular.module('customInterpolationApp', []);

  customInterpolationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });


  customInterpolationApp.controller('DemoController', function() {
      this.label = "This binding is brought you by // interpolation symbols.";
  });
</script>
<div ng-app="App" ng-controller="DemoController as demo">
    //demo.label//
</div>
</file>
<file name="protractor.js" type="protractor">
  it('should interpolate binding with custom symbols', function() {
    expect(element(by.binding('demo.label')).getText()).toBe('This binding is brought you by // interpolation symbols.');
  });
</file>
</example>
 */
function ob(){var a="{{",b="}}";/**
   * @ngdoc method
   * @name $interpolateProvider#startSymbol
   * @description
   * Symbol to denote start of expression in the interpolated string. Defaults to `{{`.
   *
   * @param {string=} value new value to set the starting symbol to.
   * @returns {string|self} Returns the symbol when used as getter and self if used as setter.
   */
this.startSymbol=function(b){return b?(a=b,this):a},/**
   * @ngdoc method
   * @name $interpolateProvider#endSymbol
   * @description
   * Symbol to denote the end of expression in the interpolated string. Defaults to `}}`.
   *
   * @param {string=} value new value to set the ending symbol to.
   * @returns {string|self} Returns the symbol when used as getter and self if used as setter.
   */
this.endSymbol=function(a){return a?(b=a,this):b},this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}/**
     * @ngdoc service
     * @name $interpolate
     * @kind function
     *
     * @requires $parse
     * @requires $sce
     *
     * @description
     *
     * Compiles a string with markup into an interpolation function. This service is used by the
     * HTML {@link ng.$compile $compile} service for data binding. See
     * {@link ng.$interpolateProvider $interpolateProvider} for configuring the
     * interpolation markup.
     *
     *
     * ```js
     *   var $interpolate = ...; // injected
     *   var exp = $interpolate('Hello {{name | uppercase}}!');
     *   expect(exp({name:'Angular'}).toEqual('Hello ANGULAR!');
     * ```
     *
     * `$interpolate` takes an optional fourth argument, `allOrNothing`. If `allOrNothing` is
     * `true`, the interpolation function will return `undefined` unless all embedded expressions
     * evaluate to a value other than `undefined`.
     *
     * ```js
     *   var $interpolate = ...; // injected
     *   var context = {greeting: 'Hello', name: undefined };
     *
     *   // default "forgiving" mode
     *   var exp = $interpolate('{{greeting}} {{name}}!');
     *   expect(exp(context)).toEqual('Hello !');
     *
     *   // "allOrNothing" mode
     *   exp = $interpolate('{{greeting}} {{name}}!', false, null, true);
     *   expect(exp(context)).toBeUndefined();
     *   context.name = 'Angular';
     *   expect(exp(context)).toEqual('Hello Angular!');
     * ```
     *
     * `allOrNothing` is useful for interpolating URLs. `ngSrc` and `ngSrcset` use this behavior.
     *
     * ####Escaped Interpolation
     * $interpolate provides a mechanism for escaping interpolation markers. Start and end markers
     * can be escaped by preceding each of their characters with a REVERSE SOLIDUS U+005C (backslash).
     * It will be rendered as a regular start/end marker, and will not be interpreted as an expression
     * or binding.
     *
     * This enables web-servers to prevent script injection attacks and defacing attacks, to some
     * degree, while also enabling code examples to work without relying on the
     * {@link ng.directive:ngNonBindable ngNonBindable} directive.
     *
     * **For security purposes, it is strongly encouraged that web servers escape user-supplied data,
     * replacing angle brackets (&lt;, &gt;) with &amp;lt; and &amp;gt; respectively, and replacing all
     * interpolation start/end markers with their escaped counterparts.**
     *
     * Escaped interpolation markers are only replaced with the actual interpolation markers in rendered
     * output when the $interpolate service processes the text. So, for HTML elements interpolated
     * by {@link ng.$compile $compile}, or otherwise interpolated with the `mustHaveExpression` parameter
     * set to `true`, the interpolated text must contain an unescaped interpolation expression. As such,
     * this is typically useful only when user-data is used in rendering a template from the server, or
     * when otherwise untrusted data is used by a directive.
     *
     * <example>
     *  <file name="index.html">
     *    <div ng-init="username='A user'">
     *      <p ng-init="apptitle='Escaping demo'">{{apptitle}}: \{\{ username = "defaced value"; \}\}
     *        </p>
     *      <p><strong>{{username}}</strong> attempts to inject code which will deface the
     *        application, but fails to accomplish their task, because the server has correctly
     *        escaped the interpolation start/end markers with REVERSE SOLIDUS U+005C (backslash)
     *        characters.</p>
     *      <p>Instead, the result of the attempted script injection is visible, and can be removed
     *        from the database by an administrator.</p>
     *    </div>
     *  </file>
     * </example>
     *
     * @param {string} text The text with markup to interpolate.
     * @param {boolean=} mustHaveExpression if set to true then the interpolation string must have
     *    embedded expression in order to return an interpolation function. Strings with no
     *    embedded expression will return null for the interpolation function.
     * @param {string=} trustedContext when provided, the returned function passes the interpolated
     *    result through {@link ng.$sce#getTrusted $sce.getTrusted(interpolatedResult,
     *    trustedContext)} before returning it.  Refer to the {@link ng.$sce $sce} service that
     *    provides Strict Contextual Escaping for details.
     * @param {boolean=} allOrNothing if `true`, then the returned function returns undefined
     *    unless all embedded expressions evaluate to a value other than `undefined`.
     * @returns {function(context)} an interpolation function which is used to compute the
     *    interpolated string. The function has these parameters:
     *
     * - `context`: evaluation context for all expressions embedded in the interpolated text
     */
function g(f,g,m,n){function o(c){return c.replace(j,a).replace(k,b)}function p(a){try{return a=D(a),n&&!s(a)?a:E(a)}catch(b){var c=ce("interr","Can't interpolate: {0}\n{1}",f,b.toString());d(c)}}n=!!n;for(var q,t,u,v=0,w=[],y=[],z=f.length,A=[],B=[];z>v;){if(-1==(q=f.indexOf(a,v))||-1==(t=f.indexOf(b,q+h))){
// we did not find an interpolation, so we have to add the remainder to the separators array
v!==z&&A.push(o(f.substring(v)));break}v!==q&&A.push(o(f.substring(v,q))),u=f.substring(q+h,t),w.push(u),y.push(c(u,p)),v=t+i,B.push(A.length),A.push("")}
// Concatenating expressions makes it hard to reason about whether some combination of
// concatenated values are unsafe to use and could easily lead to XSS.  By requiring that a
// single expression be used for iframe[src], object[src], etc., we ensure that the value
// that's used is assigned or constructed by some JS code somewhere that is more testable or
// make it obvious that you bound the value to some user controlled value.  This helps reduce
// the load when auditing for XSS issues.
if(m&&A.length>1)throw ce("noconcat","Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce",f);if(!g||w.length){var C=function(a){for(var b=0,c=w.length;c>b;b++){if(n&&r(a[b]))return;A[B[b]]=a[b]}return A.join("")},D=function(a){return m?e.getTrusted(m,a):e.valueOf(a)},E=function(a){if(null==a)// null || undefined
return"";switch(typeof a){case"string":break;case"number":a=""+a;break;default:a=R(a)}return a};return l(function(a){var b=0,c=w.length,e=new Array(c);try{for(;c>b;b++)e[b]=y[b](a);return C(e)}catch(g){var h=ce("interr","Can't interpolate: {0}\n{1}",f,g.toString());d(h)}},{
// all of these properties are undocumented for now
exp:f,//just for compatibility with regular watchers created via $watch
expressions:w,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(y,function(c,e){var f=C(c);x(b)&&b.call(this,f,c!==e?d:f,a),d=f},c)}})}}var h=a.length,i=b.length,j=new RegExp(a.replace(/./g,f),"g"),k=new RegExp(b.replace(/./g,f),"g");/**
     * @ngdoc method
     * @name $interpolate#startSymbol
     * @description
     * Symbol to denote the start of expression in the interpolated string. Defaults to `{{`.
     *
     * Use {@link ng.$interpolateProvider#startSymbol `$interpolateProvider.startSymbol`} to change
     * the symbol.
     *
     * @returns {string} start symbol.
     */
/**
     * @ngdoc method
     * @name $interpolate#endSymbol
     * @description
     * Symbol to denote the end of expression in the interpolated string. Defaults to `}}`.
     *
     * Use {@link ng.$interpolateProvider#endSymbol `$interpolateProvider.endSymbol`} to change
     * the symbol.
     *
     * @returns {string} end symbol.
     */
return g.startSymbol=function(){return a},g.endSymbol=function(){return b},g}]}function pb(){this.$get=["$rootScope","$window","$q","$$q",function(a,b,c,d){/**
      * @ngdoc service
      * @name $interval
      *
      * @description
      * Angular's wrapper for `window.setInterval`. The `fn` function is executed every `delay`
      * milliseconds.
      *
      * The return value of registering an interval function is a promise. This promise will be
      * notified upon each tick of the interval, and will be resolved after `count` iterations, or
      * run indefinitely if `count` is not defined. The value of the notification will be the
      * number of iterations that have run.
      * To cancel an interval, call `$interval.cancel(promise)`.
      *
      * In tests you can use {@link ngMock.$interval#flush `$interval.flush(millis)`} to
      * move forward by `millis` milliseconds and trigger any functions scheduled to run in that
      * time.
      *
      * <div class="alert alert-warning">
      * **Note**: Intervals created by this service must be explicitly destroyed when you are finished
      * with them.  In particular they are not automatically destroyed when a controller's scope or a
      * directive's element are destroyed.
      * You should take this into consideration and make sure to always cancel the interval at the
      * appropriate moment.  See the example below for more details on how and when to do this.
      * </div>
      *
      * @param {function()} fn A function that should be called repeatedly.
      * @param {number} delay Number of milliseconds between each function call.
      * @param {number=} [count=0] Number of times to repeat. If not set, or 0, will repeat
      *   indefinitely.
      * @param {boolean=} [invokeApply=true] If set to `false` skips model dirty checking, otherwise
      *   will invoke `fn` within the {@link ng.$rootScope.Scope#$apply $apply} block.
      * @returns {promise} A promise which will be notified on each iteration.
      *
      * @example
      * <example module="intervalExample">
      * <file name="index.html">
      *   <script>
      *     angular.module('intervalExample', [])
      *       .controller('ExampleController', ['$scope', '$interval',
      *         function($scope, $interval) {
      *           $scope.format = 'M/d/yy h:mm:ss a';
      *           $scope.blood_1 = 100;
      *           $scope.blood_2 = 120;
      *
      *           var stop;
      *           $scope.fight = function() {
      *             // Don't start a new fight if we are already fighting
      *             if ( angular.isDefined(stop) ) return;
      *
      *             stop = $interval(function() {
      *               if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
      *                 $scope.blood_1 = $scope.blood_1 - 3;
      *                 $scope.blood_2 = $scope.blood_2 - 4;
      *               } else {
      *                 $scope.stopFight();
      *               }
      *             }, 100);
      *           };
      *
      *           $scope.stopFight = function() {
      *             if (angular.isDefined(stop)) {
      *               $interval.cancel(stop);
      *               stop = undefined;
      *             }
      *           };
      *
      *           $scope.resetFight = function() {
      *             $scope.blood_1 = 100;
      *             $scope.blood_2 = 120;
      *           };
      *
      *           $scope.$on('$destroy', function() {
      *             // Make sure that the interval is destroyed too
      *             $scope.stopFight();
      *           });
      *         }])
      *       // Register the 'myCurrentTime' directive factory method.
      *       // We inject $interval and dateFilter service since the factory method is DI.
      *       .directive('myCurrentTime', ['$interval', 'dateFilter',
      *         function($interval, dateFilter) {
      *           // return the directive link function. (compile function not needed)
      *           return function(scope, element, attrs) {
      *             var format,  // date format
      *                 stopTime; // so that we can cancel the time updates
      *
      *             // used to update the UI
      *             function updateTime() {
      *               element.text(dateFilter(new Date(), format));
      *             }
      *
      *             // watch the expression, and update the UI on change.
      *             scope.$watch(attrs.myCurrentTime, function(value) {
      *               format = value;
      *               updateTime();
      *             });
      *
      *             stopTime = $interval(updateTime, 1000);
      *
      *             // listen on DOM destroy (removal) event, and cancel the next UI update
      *             // to prevent updating time after the DOM element was removed.
      *             element.on('$destroy', function() {
      *               $interval.cancel(stopTime);
      *             });
      *           }
      *         }]);
      *   </script>
      *
      *   <div>
      *     <div ng-controller="ExampleController">
      *       Date format: <input ng-model="format"> <hr/>
      *       Current time is: <span my-current-time="format"></span>
      *       <hr/>
      *       Blood 1 : <font color='red'>{{blood_1}}</font>
      *       Blood 2 : <font color='red'>{{blood_2}}</font>
      *       <button type="button" data-ng-click="fight()">Fight</button>
      *       <button type="button" data-ng-click="stopFight()">StopFight</button>
      *       <button type="button" data-ng-click="resetFight()">resetFight</button>
      *     </div>
      *   </div>
      *
      * </file>
      * </example>
      */
function e(e,g,h,i){var j=b.setInterval,k=b.clearInterval,l=0,m=s(i)&&!i,n=(m?d:c).defer(),o=n.promise;return h=s(h)?h:0,o.then(null,null,e),o.$$intervalId=j(function(){n.notify(l++),h>0&&l>=h&&(n.resolve(l),k(o.$$intervalId),delete f[o.$$intervalId]),m||a.$apply()},g),f[o.$$intervalId]=n,o}var f={};/**
      * @ngdoc method
      * @name $interval#cancel
      *
      * @description
      * Cancels a task associated with the `promise`.
      *
      * @param {promise} promise returned by the `$interval` function.
      * @returns {boolean} Returns `true` if the task was successfully canceled.
      */
return e.cancel=function(a){return a&&a.$$intervalId in f?(f[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete f[a.$$intervalId],!0):!1},e}]}/**
 * @ngdoc service
 * @name $locale
 *
 * @description
 * $locale service provides localization rules for various Angular components. As of right now the
 * only public api is:
 *
 * * `id` – `{string}` – locale id formatted as `languageId-countryId` (e.g. `en-us`)
 */
function qb(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{// Decimal Pattern
minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{//Currency Pattern
minInt:1,minFrac:2,maxFrac:2,posPre:"¤",posSuf:"",negPre:"(¤",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),SHORTMONTH:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),DAY:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),SHORTDAY:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a",ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"]},pluralCat:function(a){return 1===a?"one":"other"}}}}/**
 * Encode path using encodeUriSegment, ignoring forward slashes
 *
 * @param {string} path Path to encode
 * @returns {string}
 */
function rb(a){for(var b=a.split("/"),c=b.length;c--;)b[c]=X(b[c]);return b.join("/")}function sb(a,b){var c=dc(a);b.$$protocol=c.protocol,b.$$host=c.hostname,b.$$port=m(c.port)||ee[c.protocol]||null}function tb(a,b){var c="/"!==a.charAt(0);c&&(a="/"+a);var d=dc(a);b.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname),b.$$search=V(d.search),b.$$hash=decodeURIComponent(d.hash),
// make sure path starts with '/';
b.$$path&&"/"!=b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}/**
 *
 * @param {string} begin
 * @param {string} whole
 * @returns {string} returns text from whole after begin or undefined if it does not begin with
 *                   expected string.
 */
function ub(a,b){return 0===b.indexOf(a)?b.substr(a.length):void 0}function vb(a){var b=a.indexOf("#");return-1==b?a:a.substr(0,b)}function wb(a){return a.replace(/(#.+)|#$/,"$1")}function xb(a){return a.substr(0,vb(a).lastIndexOf("/")+1)}/* return the server only (scheme://host:port) */
function yb(a){return a.substring(0,a.indexOf("/",a.indexOf("//")+2))}/**
 * LocationHtml5Url represents an url
 * This object is exposed as $location service when HTML5 mode is enabled and supported
 *
 * @constructor
 * @param {string} appBase application base URL
 * @param {string} basePrefix url path prefix
 */
function zb(a,b){this.$$html5=!0,b=b||"";var d=xb(a);sb(a,this),/**
   * Parse given html5 (regular) url string into properties
   * @param {string} url HTML5 url
   * @private
   */
this.$$parse=function(a){var b=ub(d,a);if(!u(b))throw fe("ipthprfx",'Invalid url "{0}", missing path prefix "{1}".',a,d);tb(b,this),this.$$path||(this.$$path="/"),this.$$compose()},/**
   * Compose url and update `absUrl` property
   * @private
   */
this.$$compose=function(){var a=W(this.$$search),b=this.$$hash?"#"+X(this.$$hash):"";this.$$url=rb(this.$$path)+(a?"?"+a:"")+b,this.$$absUrl=d+this.$$url.substr(1)},this.$$parseLinkUrl=function(e,f){if(f&&"#"===f[0])
// special case for links to hash fragments:
// keep the old url and only replace the hash fragment
return this.hash(f.slice(1)),!0;var g,h,i;return(g=ub(a,e))!==c?(h=g,i=(g=ub(b,g))!==c?d+(ub("/",g)||g):a+h):(g=ub(d,e))!==c?i=d+g:d==e+"/"&&(i=d),i&&this.$$parse(i),!!i}}/**
 * LocationHashbangUrl represents url
 * This object is exposed as $location service when developer doesn't opt into html5 mode.
 * It also serves as the base class for html5 mode fallback on legacy browsers.
 *
 * @constructor
 * @param {string} appBase application base URL
 * @param {string} hashPrefix hashbang prefix
 */
function Ab(a,b){var c=xb(a);sb(a,this),/**
   * Parse given hashbang url into properties
   * @param {string} url Hashbang url
   * @private
   */
this.$$parse=function(d){/*
     * In Windows, on an anchor node on documents loaded from
     * the filesystem, the browser will return a pathname
     * prefixed with the drive name ('/C:/path') when a
     * pathname without a drive is set:
     *  * a.setAttribute('href', '/foo')
     *   * a.pathname === '/C:/foo' //true
     *
     * Inside of Angular, we're always using pathnames that
     * do not include drive names for routing.
     */
function e(a,b,c){/*
      Matches paths for file protocol on windows,
      such as /C:/foo/bar, and captures only /foo/bar.
      */
var d,e=/^\/[A-Z]:(\/.*)/;
// The input URL intentionally contains a first path segment that ends with a colon.
//Get the relative path from the input URL.
// The input URL intentionally contains a first path segment that ends with a colon.
return 0===b.indexOf(c)&&(b=b.replace(c,"")),e.exec(b)?a:(d=e.exec(a),d?d[1]:a)}var f,g=ub(a,d)||ub(c,d);"#"===g.charAt(0)?(
// The rest of the url starts with a hash so we have
// got either a hashbang path or a plain hash fragment
f=ub(b,g),r(f)&&(
// There was no hashbang prefix so we just have a hash fragment
f=g)):
// There was no hashbang path nor hash fragment:
// If we are in HTML5 mode we use what is left as the path;
// Otherwise we ignore what is left
f=this.$$html5?g:"",tb(f,this),this.$$path=e(this.$$path,f,a),this.$$compose()},/**
   * Compose hashbang url and update `absUrl` property
   * @private
   */
this.$$compose=function(){var c=W(this.$$search),d=this.$$hash?"#"+X(this.$$hash):"";this.$$url=rb(this.$$path)+(c?"?"+c:"")+d,this.$$absUrl=a+(this.$$url?b+this.$$url:"")},this.$$parseLinkUrl=function(b,c){return vb(a)==vb(b)?(this.$$parse(b),!0):!1}}/**
 * LocationHashbangUrl represents url
 * This object is exposed as $location service when html5 history api is enabled but the browser
 * does not support it.
 *
 * @constructor
 * @param {string} appBase application base URL
 * @param {string} hashPrefix hashbang prefix
 */
function Bb(a,b){this.$$html5=!0,Ab.apply(this,arguments);var c=xb(a);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])
// special case for links to hash fragments:
// keep the old url and only replace the hash fragment
return this.hash(e.slice(1)),!0;var f,g;return a==vb(d)?f=d:(g=ub(c,d))?f=a+b+g:c===d+"/"&&(f=c),f&&this.$$parse(f),!!f},this.$$compose=function(){var c=W(this.$$search),d=this.$$hash?"#"+X(this.$$hash):"";this.$$url=rb(this.$$path)+(c?"?"+c:"")+d,
// include hashPrefix in $$absUrl when $$url is empty so IE8 & 9 do not reload page because of removal of '#'
this.$$absUrl=a+b+this.$$url}}function Cb(a){return function(){return this[a]}}function Db(a,b){return function(c){return r(c)?this[a]:(this[a]=b(c),this.$$compose(),this)}}/**
 * @ngdoc service
 * @name $location
 *
 * @requires $rootElement
 *
 * @description
 * The $location service parses the URL in the browser address bar (based on the
 * [window.location](https://developer.mozilla.org/en/window.location)) and makes the URL
 * available to your application. Changes to the URL in the address bar are reflected into
 * $location service and changes to $location are reflected into the browser address bar.
 *
 * **The $location service:**
 *
 * - Exposes the current URL in the browser address bar, so you can
 *   - Watch and observe the URL.
 *   - Change the URL.
 * - Synchronizes the URL with the browser when the user
 *   - Changes the address bar.
 *   - Clicks the back or forward button (or clicks a History link).
 *   - Clicks on a link.
 * - Represents the URL object as a set of methods (protocol, host, port, path, search, hash).
 *
 * For more information see {@link guide/$location Developer Guide: Using $location}
 */
/**
 * @ngdoc provider
 * @name $locationProvider
 * @description
 * Use the `$locationProvider` to configure how the application deep linking paths are stored.
 */
function Eb(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};/**
   * @ngdoc method
   * @name $locationProvider#hashPrefix
   * @description
   * @param {string=} prefix Prefix for hash part (containing path and search)
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   */
this.hashPrefix=function(b){return s(b)?(a=b,this):a},/**
   * @ngdoc method
   * @name $locationProvider#html5Mode
   * @description
   * @param {(boolean|Object)=} mode If boolean, sets `html5Mode.enabled` to value.
   *   If object, sets `enabled`, `requireBase` and `rewriteLinks` to respective values. Supported
   *   properties:
   *   - **enabled** – `{boolean}` – (default: false) If true, will rely on `history.pushState` to
   *     change urls where supported. Will fall back to hash-prefixed paths in browsers that do not
   *     support `pushState`.
   *   - **requireBase** - `{boolean}` - (default: `true`) When html5Mode is enabled, specifies
   *     whether or not a <base> tag is required to be present. If `enabled` and `requireBase` are
   *     true, and a base tag is not present, an error will be thrown when `$location` is injected.
   *     See the {@link guide/$location $location guide for more information}
   *   - **rewriteLinks** - `{boolean}` - (default: `true`) When html5Mode is enabled,
   *     enables/disables url rewriting for relative links.
   *
   * @returns {Object} html5Mode object if used as getter or itself (chaining) if used as setter
   */
this.html5Mode=function(a){return E(a)?(b.enabled=a,this):t(a)?(E(a.enabled)&&(b.enabled=a.enabled),E(a.requireBase)&&(b.requireBase=a.requireBase),E(a.rewriteLinks)&&(b.rewriteLinks=a.rewriteLinks),this):b},/**
   * @ngdoc event
   * @name $location#$locationChangeStart
   * @eventType broadcast on root scope
   * @description
   * Broadcasted before a URL will change.
   *
   * This change can be prevented by calling
   * `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on} for more
   * details about event object. Upon successful change
   * {@link ng.$location#$locationChangeSuccess $locationChangeSuccess} is fired.
   *
   * The `newState` and `oldState` parameters may be defined only in HTML5 mode and when
   * the browser supports the HTML5 History API.
   *
   * @param {Object} angularEvent Synthetic event object.
   * @param {string} newUrl New URL
   * @param {string=} oldUrl URL that was before it was changed.
   * @param {string=} newState New history state object
   * @param {string=} oldState History state object that was before it was changed.
   */
/**
   * @ngdoc event
   * @name $location#$locationChangeSuccess
   * @eventType broadcast on root scope
   * @description
   * Broadcasted after a URL was changed.
   *
   * The `newState` and `oldState` parameters may be defined only in HTML5 mode and when
   * the browser supports the HTML5 History API.
   *
   * @param {Object} angularEvent Synthetic event object.
   * @param {string} newUrl New URL
   * @param {string=} oldUrl URL that was before it was changed.
   * @param {string=} newState New history state object
   * @param {string=} oldState History state object that was before it was changed.
   */
this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=j.url(),f=j.$$state;try{d.url(a,b,c),
// Make sure $location.state() returns referentially identical (not just deeply equal)
// state object; this makes possible quick checking if the state changed in the digest
// loop. Checking deep equality would be too expensive.
j.$$state=d.state()}catch(g){
// Restore old values if pushState fails
throw j.url(e),j.$$state=f,g}}function i(a,b){c.$broadcast("$locationChangeSuccess",j.absUrl(),a,j.$$state,b)}var j,k,l,m=d.baseHref(),// if base[href] is undefined, it defaults to ''
n=d.url();if(b.enabled){if(!m&&b.requireBase)throw fe("nobase","$location in HTML5 mode requires a <base> tag to be present!");l=yb(n)+(m||"/"),k=e.history?zb:Bb}else l=vb(n),k=Ab;j=new k(l,"#"+a),j.$$parseLinkUrl(n,n),j.$$state=d.state();var o=/^\s*(javascript|mailto):/i;f.on("click",function(a){
// TODO(vojta): rewrite link when opening in new tab/window (in legacy browser)
// currently we open nice url link and redirect then
if(b.rewriteLinks&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!=a.which&&2!=a.button){
// traverse the DOM up to find first A tag
for(var e=ad(a.target);"a"!==I(e[0]);)
// ignore rewriting if no A tag (reached root element, or no parent - removed from document)
if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),i=e.attr("href")||e.attr("xlink:href");t(h)&&"[object SVGAnimatedString]"===h.toString()&&(
// SVGAnimatedString.animVal should be identical to SVGAnimatedString.baseVal, unless during
// an animation.
h=dc(h.animVal).href),
// Ignore when url is started with javascript: or mailto:
o.test(h)||!h||e.attr("target")||a.isDefaultPrevented()||j.$$parseLinkUrl(h,i)&&(
// We do a preventDefault for all urls that are part of the angular application,
// in html5mode and also without, so that we are able to abort navigation without
// getting double entries in the location history.
a.preventDefault(),
// update location manually
j.absUrl()!=d.url()&&(c.$apply(),
// hack to work around FF6 bug 684208 when scenario runner clicks on links
g.angular["ff-684208-preventDefault"]=!0))}}),
// rewrite hashbang url <> html5 url
wb(j.absUrl())!=wb(n)&&d.url(j.absUrl(),!0);var p=!0;
// update $location when $browser url changes
// update browser
return d.onUrlChange(function(a,b){c.$evalAsync(function(){var d,e=j.absUrl(),f=j.$$state;j.$$parse(a),j.$$state=b,d=c.$broadcast("$locationChangeStart",a,e,b,f).defaultPrevented,
// if the location was changed by a `$locationChangeStart` handler then stop
// processing this location change
j.absUrl()===a&&(d?(j.$$parse(e),j.$$state=f,h(e,!1,f)):(p=!1,i(e,f)))}),c.$$phase||c.$digest()}),c.$watch(function(){var a=wb(d.url()),b=wb(j.absUrl()),f=d.state(),g=j.$$replace,k=a!==b||j.$$html5&&e.history&&f!==j.$$state;(p||k)&&(p=!1,c.$evalAsync(function(){var b=j.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,j.$$state,f).defaultPrevented;
// if the location was changed by a `$locationChangeStart` handler then stop
// processing this location change
j.absUrl()===b&&(d?(j.$$parse(a),j.$$state=f):(k&&h(b,g,f===j.$$state?null:j.$$state),i(a,f)))})),j.$$replace=!1}),j}]}/**
 * @ngdoc service
 * @name $log
 * @requires $window
 *
 * @description
 * Simple service for logging. Default implementation safely writes the message
 * into the browser's console (if present).
 *
 * The main purpose of this service is to simplify debugging and troubleshooting.
 *
 * The default is to log `debug` messages. You can use
 * {@link ng.$logProvider ng.$logProvider#debugEnabled} to change this.
 *
 * @example
   <example module="logExample">
     <file name="script.js">
       angular.module('logExample', [])
         .controller('LogController', ['$scope', '$log', function($scope, $log) {
           $scope.$log = $log;
           $scope.message = 'Hello World!';
         }]);
     </file>
     <file name="index.html">
       <div ng-controller="LogController">
         <p>Reload this page with open console, enter text and hit the log button...</p>
         Message:
         <input type="text" ng-model="message"/>
         <button ng-click="$log.log(message)">log</button>
         <button ng-click="$log.warn(message)">warn</button>
         <button ng-click="$log.info(message)">info</button>
         <button ng-click="$log.error(message)">error</button>
         <button ng-click="$log.debug(message)">debug</button>
       </div>
     </file>
   </example>
 */
/**
 * @ngdoc provider
 * @name $logProvider
 * @description
 * Use the `$logProvider` to configure how the application logs messages
 */
function Fb(){var a=!0,b=this;/**
   * @ngdoc method
   * @name $logProvider#debugEnabled
   * @description
   * @param {boolean=} flag enable or disable debug level messages
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   */
this.debugEnabled=function(b){return s(b)?(a=b,this):a},this.$get=["$window",function(c){function d(a){return a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line)),a}function e(a){var b=c.console||{},e=b[a]||b.log||o,g=!1;
// Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
// The reason behind this is that console.log has type "object" in IE8...
try{g=!!e.apply}catch(h){}return g?function(){var a=[];return f(arguments,function(b){a.push(d(b))}),e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{/**
       * @ngdoc method
       * @name $log#log
       *
       * @description
       * Write a log message
       */
log:e("log"),/**
       * @ngdoc method
       * @name $log#info
       *
       * @description
       * Write an information message
       */
info:e("info"),/**
       * @ngdoc method
       * @name $log#warn
       *
       * @description
       * Write a warning message
       */
warn:e("warn"),/**
       * @ngdoc method
       * @name $log#error
       *
       * @description
       * Write an error message
       */
error:e("error"),/**
       * @ngdoc method
       * @name $log#debug
       *
       * @description
       * Write a debug message
       */
debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}
// Sandboxing Angular Expressions
// ------------------------------
// Angular expressions are generally considered safe because these expressions only have direct
// access to `$scope` and locals. However, one can obtain the ability to execute arbitrary JS code by
// obtaining a reference to native JS functions such as the Function constructor.
//
// As an example, consider the following Angular expression:
//
//   {}.toString.constructor('alert("evil JS code")')
//
// This sandboxing technique is not perfect and doesn't aim to be. The goal is to prevent exploits
// against the expression language, but not to prevent exploits that were enabled by exposing
// sensitive JavaScript or browser APIs on Scope. Exposing such objects on a Scope is never a good
// practice and therefore we are not even trying to protect against interaction with an object
// explicitly exposed in this way.
//
// In general, it is not possible to access a Window object from an angular expression unless a
// window or some DOM object that has a reference to window is published onto a Scope.
// Similarly we prevent invocations of function known to be dangerous, as well as assignments to
// native objects.
//
// See https://docs.angularjs.org/guide/security
function Gb(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===a||"__proto__"===a)throw he("isecfld","Attempting to access a disallowed field in Angular expressions! Expression: {0}",b);return a}function Hb(a,b){
// nifty check if obj is Function that is fast and works across iframes and other contexts
if(a){if(a.constructor===a)throw he("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",b);if(// isWindow(obj)
a.window===a)throw he("isecwindow","Referencing the Window in Angular expressions is disallowed! Expression: {0}",b);if(// isElement(obj)
a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw he("isecdom","Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}",b);if(// block Object so that we can't get hold of dangerous Object.* methods
a===Object)throw he("isecobj","Referencing Object in Angular expressions is disallowed! Expression: {0}",b)}return a}function Ib(a,b){if(a){if(a.constructor===a)throw he("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",b);if(a===ie||a===je||a===ke)throw he("isecff","Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}",b)}}function Jb(a){return a.constant}
//////////////////////////////////////////////////
// Parser helper functions
//////////////////////////////////////////////////
function Kb(a,b,c,d,e){Hb(a,e),Hb(b,e);for(var f,g=c.split("."),h=0;g.length>1;h++){f=Gb(g.shift(),e);var i=0===h&&b&&b[f]||a[f];i||(i={},a[f]=i),a=Hb(i,e)}return f=Gb(g.shift(),e),Hb(a[f],e),a[f]=d,d}function Lb(a){return"constructor"==a}/**
 * Implementation of the "Black Hole" variant from:
 * - http://jsperf.com/angularjs-parse-getter/4
 * - http://jsperf.com/path-evaluation-simplified/7
 */
function Mb(a,b,d,e,f,g,h){Gb(a,g),Gb(b,g),Gb(d,g),Gb(e,g),Gb(f,g);var i=function(a){return Hb(a,g)},j=h||Lb(a)?i:p,k=h||Lb(b)?i:p,l=h||Lb(d)?i:p,m=h||Lb(e)?i:p,n=h||Lb(f)?i:p;return function(g,h){var i=h&&h.hasOwnProperty(a)?h:g;return null==i?i:(i=j(i[a]),b?null==i?c:(i=k(i[b]),d?null==i?c:(i=l(i[d]),e?null==i?c:(i=m(i[e]),f?null==i?c:i=n(i[f]):i):i):i):i)}}function Nb(a,b){return function(c,d){return a(c,d,Hb,b)}}function Ob(a,b,d){var e=b.expensiveChecks,g=e?re:qe,h=g[a];if(h)return h;var i=a.split("."),j=i.length;
// http://jsperf.com/angularjs-parse-getter/6
if(b.csp)h=6>j?Mb(i[0],i[1],i[2],i[3],i[4],d,e):function(a,b){var f,g=0;do f=Mb(i[g++],i[g++],i[g++],i[g++],i[g++],d,e)(a,b),b=c,// clear after first iteration
a=f;while(j>g);return f};else{var k="";e&&(k+="s = eso(s, fe);\nl = eso(l, fe);\n");var l=e;f(i,function(a,b){Gb(a,d);var c=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;(e||Lb(a))&&(c="eso("+c+", fe)",l=!0),k+="if(s == null) return undefined;\ns="+c+";\n"}),k+="return s;";/* jshint -W054 */
var m=new Function("s","l","eso","fe",k);// s=scope, l=locals, eso=ensureSafeObject
/* jshint +W054 */
m.toString=q(k),l&&(m=Nb(m,d)),h=m}return h.sharedGetter=!0,h.assign=function(b,c,d){return Kb(b,d,a,c,a)},g[a]=h,h}function Pb(a){return x(a.valueOf)?a.valueOf():se.call(a)}
///////////////////////////////////
/**
 * @ngdoc service
 * @name $parse
 * @kind function
 *
 * @description
 *
 * Converts Angular {@link guide/expression expression} into a function.
 *
 * ```js
 *   var getter = $parse('user.name');
 *   var setter = getter.assign;
 *   var context = {user:{name:'angular'}};
 *   var locals = {user:{name:'local'}};
 *
 *   expect(getter(context)).toEqual('angular');
 *   setter(context, 'newValue');
 *   expect(context.user.name).toEqual('newValue');
 *   expect(getter(context, locals)).toEqual('local');
 * ```
 *
 *
 * @param {string} expression String expression to compile.
 * @returns {function(context, locals)} a function which represents the compiled expression:
 *
 *    * `context` – `{object}` – an object against which any expressions embedded in the strings
 *      are evaluated against (typically a scope object).
 *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
 *      `context`.
 *
 *    The returned function also has the following properties:
 *      * `literal` – `{boolean}` – whether the expression's top-level node is a JavaScript
 *        literal.
 *      * `constant` – `{boolean}` – whether the expression is made entirely of JavaScript
 *        constant literals.
 *      * `assign` – `{?function(context, value)}` – if the expression is assignable, this will be
 *        set to a function to change its value on the given context.
 *
 */
/**
 * @ngdoc provider
 * @name $parseProvider
 *
 * @description
 * `$parseProvider` can be used for configuring the default behavior of the {@link ng.$parse $parse}
 *  service.
 */
function Qb(){var a=ja(),b=ja();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;return a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign),b}function g(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];e.constant||(e.inputs?g(e.inputs,b):-1===b.indexOf(e)&&// TODO(perf) can we do better?
b.push(e))}return b}function h(a,b){
// attempt to convert the value to a primitive type
// TODO(docs): add a note to docs that by implementing valueOf even objects and arrays can
//             be cheaply dirty-checked
return null==a||null==b?a===b:"object"==typeof a&&(a=Pb(a),"object"==typeof a)?!1:a===b||a!==a&&b!==b}function i(a,b,c,d){var e,f=d.$$inputs||(d.$$inputs=g(d.inputs,[]));if(1===f.length){var i=h;// init to something unique so that equals check fails
return f=f[0],a.$watch(function(a){var b=f(a);return h(b,i)||(e=d(a),i=b&&Pb(b)),e},b,c)}for(var j=[],k=0,l=f.length;l>k;k++)j[k]=h;return a.$watch(function(a){for(var b=!1,c=0,g=f.length;g>c;c++){var i=f[c](a);(b||(b=!h(i,j[c])))&&(j[c]=i&&Pb(i))}return b&&(e=d(a)),e},b,c)}function j(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a,x(b)&&b.apply(this,arguments),s(a)&&d.$$postDigest(function(){s(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;return f(a,function(a){s(a)||(b=!1)}),b}var g,h;return g=a.$watch(function(a){return d(a)},function(a,c,d){h=a,x(b)&&b.call(this,a,c,d),e(a)&&d.$$postDigest(function(){e(h)&&g()})},c)}function l(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){x(b)&&b.apply(this,arguments),e()},c)}function m(a,b){if(!b)return a;var c=a.$$watchDelegate,d=c!==k&&c!==j,e=d?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);
// we only return the interceptor's result if the
// initial value is defined (for bind-once)
return s(e)?f:e};
// Propagate $$watchDelegates other then inputsWatchDelegate
// If there is an interceptor, but no watchDelegate then treat the interceptor like
// we treat filters - it is assumed to be a pure function unless flagged with $stateful
return a.$$watchDelegate&&a.$$watchDelegate!==i?e.$$watchDelegate=a.$$watchDelegate:b.$stateful||(e.$$watchDelegate=i,e.inputs=[a]),e}var n={csp:d.csp,expensiveChecks:!1},p={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var h,q,r;switch(typeof d){case"string":r=d=d.trim();var s=g?b:a;if(h=s[r],!h){":"===d.charAt(0)&&":"===d.charAt(1)&&(q=!0,d=d.substring(2));var t=g?p:n,u=new oe(t),v=new pe(u,c,t);h=v.parse(d),h.constant?h.$$watchDelegate=l:q?(
//oneTime is not part of the exp passed to the Parser so we may have to
//wrap the parsedExpression before adding a $$watchDelegate
h=e(h),h.$$watchDelegate=h.literal?k:j):h.inputs&&(h.$$watchDelegate=i),s[r]=h}return m(h,f);case"function":return m(d,f);default:return m(o,f)}}}]}/**
 * @ngdoc service
 * @name $q
 * @requires $rootScope
 *
 * @description
 * A service that helps you run functions asynchronously, and use their return values (or exceptions)
 * when they are done processing.
 *
 * This is an implementation of promises/deferred objects inspired by
 * [Kris Kowal's Q](https://github.com/kriskowal/q).
 *
 * $q can be used in two fashions --- one which is more similar to Kris Kowal's Q or jQuery's Deferred
 * implementations, and the other which resembles ES6 promises to some degree.
 *
 * # $q constructor
 *
 * The streamlined ES6 style promise is essentially just using $q as a constructor which takes a `resolver`
 * function as the first argument. This is similar to the native Promise implementation from ES6 Harmony,
 * see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * While the constructor-style use is supported, not all of the supporting methods from ES6 Harmony promises are
 * available yet.
 *
 * It can be used like so:
 *
 * ```js
 *   // for the purpose of this example let's assume that variables `$q` and `okToGreet`
 *   // are available in the current lexical scope (they could have been injected or passed in).
 *
 *   function asyncGreet(name) {
 *     // perform some asynchronous operation, resolve or reject the promise when appropriate.
 *     return $q(function(resolve, reject) {
 *       setTimeout(function() {
 *         if (okToGreet(name)) {
 *           resolve('Hello, ' + name + '!');
 *         } else {
 *           reject('Greeting ' + name + ' is not allowed.');
 *         }
 *       }, 1000);
 *     });
 *   }
 *
 *   var promise = asyncGreet('Robin Hood');
 *   promise.then(function(greeting) {
 *     alert('Success: ' + greeting);
 *   }, function(reason) {
 *     alert('Failed: ' + reason);
 *   });
 * ```
 *
 * Note: progress/notify callbacks are not currently supported via the ES6-style interface.
 *
 * However, the more traditional CommonJS-style usage is still available, and documented below.
 *
 * [The CommonJS Promise proposal](http://wiki.commonjs.org/wiki/Promises) describes a promise as an
 * interface for interacting with an object that represents the result of an action that is
 * performed asynchronously, and may or may not be finished at any given point in time.
 *
 * From the perspective of dealing with error handling, deferred and promise APIs are to
 * asynchronous programming what `try`, `catch` and `throw` keywords are to synchronous programming.
 *
 * ```js
 *   // for the purpose of this example let's assume that variables `$q` and `okToGreet`
 *   // are available in the current lexical scope (they could have been injected or passed in).
 *
 *   function asyncGreet(name) {
 *     var deferred = $q.defer();
 *
 *     setTimeout(function() {
 *       deferred.notify('About to greet ' + name + '.');
 *
 *       if (okToGreet(name)) {
 *         deferred.resolve('Hello, ' + name + '!');
 *       } else {
 *         deferred.reject('Greeting ' + name + ' is not allowed.');
 *       }
 *     }, 1000);
 *
 *     return deferred.promise;
 *   }
 *
 *   var promise = asyncGreet('Robin Hood');
 *   promise.then(function(greeting) {
 *     alert('Success: ' + greeting);
 *   }, function(reason) {
 *     alert('Failed: ' + reason);
 *   }, function(update) {
 *     alert('Got notification: ' + update);
 *   });
 * ```
 *
 * At first it might not be obvious why this extra complexity is worth the trouble. The payoff
 * comes in the way of guarantees that promise and deferred APIs make, see
 * https://github.com/kriskowal/uncommonjs/blob/master/promises/specification.md.
 *
 * Additionally the promise api allows for composition that is very hard to do with the
 * traditional callback ([CPS](http://en.wikipedia.org/wiki/Continuation-passing_style)) approach.
 * For more on this please see the [Q documentation](https://github.com/kriskowal/q) especially the
 * section on serial or parallel joining of promises.
 *
 * # The Deferred API
 *
 * A new instance of deferred is constructed by calling `$q.defer()`.
 *
 * The purpose of the deferred object is to expose the associated Promise instance as well as APIs
 * that can be used for signaling the successful or unsuccessful completion, as well as the status
 * of the task.
 *
 * **Methods**
 *
 * - `resolve(value)` – resolves the derived promise with the `value`. If the value is a rejection
 *   constructed via `$q.reject`, the promise will be rejected instead.
 * - `reject(reason)` – rejects the derived promise with the `reason`. This is equivalent to
 *   resolving it with a rejection constructed via `$q.reject`.
 * - `notify(value)` - provides updates on the status of the promise's execution. This may be called
 *   multiple times before the promise is either resolved or rejected.
 *
 * **Properties**
 *
 * - promise – `{Promise}` – promise object associated with this deferred.
 *
 *
 * # The Promise API
 *
 * A new promise instance is created when a deferred instance is created and can be retrieved by
 * calling `deferred.promise`.
 *
 * The purpose of the promise object is to allow for interested parties to get access to the result
 * of the deferred task when it completes.
 *
 * **Methods**
 *
 * - `then(successCallback, errorCallback, notifyCallback)` – regardless of when the promise was or
 *   will be resolved or rejected, `then` calls one of the success or error callbacks asynchronously
 *   as soon as the result is available. The callbacks are called with a single argument: the result
 *   or rejection reason. Additionally, the notify callback may be called zero or more times to
 *   provide a progress indication, before the promise is resolved or rejected.
 *
 *   This method *returns a new promise* which is resolved or rejected via the return value of the
 *   `successCallback`, `errorCallback`. It also notifies via the return value of the
 *   `notifyCallback` method. The promise cannot be resolved or rejected from the notifyCallback
 *   method.
 *
 * - `catch(errorCallback)` – shorthand for `promise.then(null, errorCallback)`
 *
 * - `finally(callback, notifyCallback)` – allows you to observe either the fulfillment or rejection of a promise,
 *   but to do so without modifying the final value. This is useful to release resources or do some
 *   clean-up that needs to be done whether the promise was rejected or resolved. See the [full
 *   specification](https://github.com/kriskowal/q/wiki/API-Reference#promisefinallycallback) for
 *   more information.
 *
 * # Chaining promises
 *
 * Because calling the `then` method of a promise returns a new derived promise, it is easily
 * possible to create a chain of promises:
 *
 * ```js
 *   promiseB = promiseA.then(function(result) {
 *     return result + 1;
 *   });
 *
 *   // promiseB will be resolved immediately after promiseA is resolved and its value
 *   // will be the result of promiseA incremented by 1
 * ```
 *
 * It is possible to create chains of any length and since a promise can be resolved with another
 * promise (which will defer its resolution further), it is possible to pause/defer resolution of
 * the promises at any point in the chain. This makes it possible to implement powerful APIs like
 * $http's response interceptors.
 *
 *
 * # Differences between Kris Kowal's Q and $q
 *
 *  There are two main differences:
 *
 * - $q is integrated with the {@link ng.$rootScope.Scope} Scope model observation
 *   mechanism in angular, which means faster propagation of resolution or rejection into your
 *   models and avoiding unnecessary browser repaints, which would result in flickering UI.
 * - Q has many more features than $q, but that comes at a cost of bytes. $q is tiny, but contains
 *   all the important functionality needed for common async tasks.
 *
 *  # Testing
 *
 *  ```js
 *    it('should simulate promise', inject(function($q, $rootScope) {
 *      var deferred = $q.defer();
 *      var promise = deferred.promise;
 *      var resolvedValue;
 *
 *      promise.then(function(value) { resolvedValue = value; });
 *      expect(resolvedValue).toBeUndefined();
 *
 *      // Simulate resolving of promise
 *      deferred.resolve(123);
 *      // Note that the 'then' function does not get called synchronously.
 *      // This is because we want the promise API to always be async, whether or not
 *      // it got called synchronously or asynchronously.
 *      expect(resolvedValue).toBeUndefined();
 *
 *      // Propagate promise resolution to 'then' functions using $apply().
 *      $rootScope.$apply();
 *      expect(resolvedValue).toEqual(123);
 *    }));
 *  ```
 *
 * @param {function(function, function)} resolver Function which is responsible for resolving or
 *   rejecting the newly created promise. The first parameter is a function which resolves the
 *   promise, the second parameter is a function which rejects the promise.
 *
 * @returns {Promise} The newly created promise.
 */
function Rb(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return Tb(function(b){a.$evalAsync(b)},b)}]}function Sb(){this.$get=["$browser","$exceptionHandler",function(a,b){return Tb(function(b){a.defer(b)},b)}]}/**
 * Constructs a promise manager.
 *
 * @param {function(function)} nextTick Function for executing functions in the next turn.
 * @param {function(...*)} exceptionHandler Function into which unexpected exceptions are passed for
 *     debugging purposes.
 * @returns {object} Promise manager.
 */
function Tb(a,b){function e(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function g(){this.$$state={status:0}}
//Faster, more basic than angular.bind http://jsperf.com/angular-bind-vs-custom-vs-native
function h(a,b){return function(c){b.call(a,c)}}function i(a){var d,e,f;f=a.pending,a.processScheduled=!1,a.pending=c;for(var g=0,h=f.length;h>g;++g){e=f[g][0],d=f[g][a.status];try{x(d)?e.resolve(d(a.value)):1===a.status?e.resolve(a.value):e.reject(a.value)}catch(i){e.reject(i),b(i)}}}function j(b){!b.processScheduled&&b.pending&&(b.processScheduled=!0,a(function(){i(b)}))}function k(){this.promise=new g,
//Necessary to support unbound execution :/
this.resolve=h(this,this.resolve),this.reject=h(this,this.reject),this.notify=h(this,this.notify)}/**
   * @ngdoc method
   * @name $q#all
   * @kind function
   *
   * @description
   * Combines multiple promises into a single promise that is resolved when all of the input
   * promises are resolved.
   *
   * @param {Array.<Promise>|Object.<Promise>} promises An array or hash of promises.
   * @returns {Promise} Returns a single promise that will be resolved with an array/hash of values,
   *   each value corresponding to the promise at the same index/key in the `promises` array/hash.
   *   If any of the promises is resolved with a rejection, this resulting promise will be rejected
   *   with the same rejection value.
   */
function l(a){var b=new k,c=0,d=ld(a)?[]:{};return f(a,function(a,e){c++,r(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})}),0===c&&b.resolve(d),b.promise}var m=d("$q",TypeError),n=function(){return new k};g.prototype={then:function(a,b,c){var d=new k;return this.$$state.pending=this.$$state.pending||[],this.$$state.pending.push([d,a,b,c]),this.$$state.status>0&&j(this.$$state),d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return q(b,!0,a)},function(b){return q(b,!1,a)},b)}},k.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(m("qcycle","Expected promise to be resolved with value other than itself '{0}'",a)):this.$$resolve(a))},$$resolve:function(a){var c,d;d=e(this,this.$$resolve,this.$$reject);try{(t(a)||x(a))&&(c=a&&a.then),x(c)?(this.promise.$$state.status=-1,c.call(a,d[0],d[1],this.notify)):(this.promise.$$state.value=a,this.promise.$$state.status=1,j(this.promise.$$state))}catch(f){d[1](f),b(f)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a,this.promise.$$state.status=2,j(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;this.promise.$$state.status<=0&&d&&d.length&&a(function(){for(var a,e,f=0,g=d.length;g>f;f++){e=d[f][0],a=d[f][3];try{e.notify(x(a)?a(c):c)}catch(h){b(h)}}})}};/**
   * @ngdoc method
   * @name $q#reject
   * @kind function
   *
   * @description
   * Creates a promise that is resolved as rejected with the specified `reason`. This api should be
   * used to forward rejection in a chain of promises. If you are dealing with the last promise in
   * a promise chain, you don't need to worry about it.
   *
   * When comparing deferreds/promises to the familiar behavior of try/catch/throw, think of
   * `reject` as the `throw` keyword in JavaScript. This also means that if you "catch" an error via
   * a promise error callback and you want to forward the error to the promise derived from the
   * current promise, you have to "rethrow" the error by returning a rejection constructed via
   * `reject`.
   *
   * ```js
   *   promiseB = promiseA.then(function(result) {
   *     // success: do something and resolve promiseB
   *     //          with the old or a new result
   *     return result;
   *   }, function(reason) {
   *     // error: handle the error if possible and
   *     //        resolve promiseB with newPromiseOrValue,
   *     //        otherwise forward the rejection to promiseB
   *     if (canHandle(reason)) {
   *      // handle the error and recover
   *      return newPromiseOrValue;
   *     }
   *     return $q.reject(reason);
   *   });
   * ```
   *
   * @param {*} reason Constant, message, exception or an object representing the rejection reason.
   * @returns {Promise} Returns a promise that was already resolved as rejected with the `reason`.
   */
var o=function(a){var b=new k;return b.reject(a),b.promise},p=function(a,b){var c=new k;return b?c.resolve(a):c.reject(a),c.promise},q=function(a,b,c){var d=null;try{x(c)&&(d=c())}catch(e){return p(e,!1)}return F(d)?d.then(function(){return p(a,b)},function(a){return p(a,!1)}):p(a,b)},r=function(a,b,c,d){var e=new k;return e.resolve(a),e.promise.then(b,c,d)},s=function u(a){function b(a){d.resolve(a)}function c(a){d.reject(a)}if(!x(a))throw m("norslvr","Expected resolverFn, got '{0}'",a);if(!(this instanceof u))
// More useful when $Q is the Promise itself.
return new u(a);var d=new k;return a(b,c),d.promise};return s.defer=n,s.reject=o,s.when=r,s.all=l,s}function Ub(){//rAF
this.$get=["$window","$timeout",function(a,b){var c=a.requestAnimationFrame||a.webkitRequestAnimationFrame,d=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(a){var c=b(a,16.66,!1);// 1000 / 60 = 16.666
return function(){b.cancel(c)}};return f.supported=e,f}]}/**
 * DESIGN NOTES
 *
 * The design decisions behind the scope are heavily favored for speed and memory consumption.
 *
 * The typical use of scope is to watch the expressions, which most of the time return the same
 * value as last time so we optimize the operation.
 *
 * Closures construction is expensive in terms of speed as well as memory:
 *   - No closures, instead use prototypical inheritance for API
 *   - Internal state needs to be stored on scope directly, which means that private state is
 *     exposed as $$____ properties
 *
 * Loop operations are optimized by using while(count--) { ... }
 *   - this means that in order to keep the same order of execution as addition we have to add
 *     items to the array at the beginning (unshift) instead of at the end (push)
 *
 * Child scopes are created and removed often
 *   - Using an array would be slow since inserts in middle are expensive so we use linked list
 *
 * There are few watches then a lot of observers. This is why you don't want the observer to be
 * implemented in the same way as watch. Watch requires return of initialization function which
 * are expensive to construct.
 */
/**
 * @ngdoc provider
 * @name $rootScopeProvider
 * @description
 *
 * Provider for the $rootScope service.
 */
/**
 * @ngdoc method
 * @name $rootScopeProvider#digestTtl
 * @description
 *
 * Sets the number of `$digest` iterations the scope should attempt to execute before giving up and
 * assuming that the model is unstable.
 *
 * The current default is 10 iterations.
 *
 * In complex applications it's possible that the dependencies between `$watch`s will result in
 * several digest iterations. However if an application needs more than the default 10 digest
 * iterations for its model to stabilize then you should investigate what is causing the model to
 * continuously change during the digest.
 *
 * Increasing the TTL could have performance implications, so you should not change it without
 * proper justification.
 *
 * @param {number} limit The number of digest iterations.
 */
/**
 * @ngdoc service
 * @name $rootScope
 * @description
 *
 * Every application has a single root {@link ng.$rootScope.Scope scope}.
 * All other scopes are descendant scopes of the root scope. Scopes provide separation
 * between the model and the view, via a mechanism for watching the model for changes.
 * They also provide an event emission/broadcast and subscription facility. See the
 * {@link guide/scope developer guide on scopes}.
 */
function Vb(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null,this.$$listeners={},this.$$listenerCount={},this.$$watchersCount=0,this.$id=j(),this.$$ChildScope=null}return b.prototype=a,b}var b=10,c=d("$rootScope"),g=null,h=null;this.digestTtl=function(a){return arguments.length&&(b=a),b},this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,i,k,l){function m(a){a.currentScope.$$destroyed=!0}/**
     * @ngdoc type
     * @name $rootScope.Scope
     *
     * @description
     * A root scope can be retrieved using the {@link ng.$rootScope $rootScope} key from the
     * {@link auto.$injector $injector}. Child scopes are created using the
     * {@link ng.$rootScope.Scope#$new $new()} method. (Most scopes are created automatically when
     * compiled HTML template is executed.)
     *
     * Here is a simple scope snippet to show how you can interact with the scope.
     * ```html
     * <file src="./test/ng/rootScopeSpec.js" tag="docs1" />
     * ```
     *
     * # Inheritance
     * A scope can inherit from a parent scope, as in this example:
     * ```js
         var parent = $rootScope;
         var child = parent.$new();

         parent.salutation = "Hello";
         expect(child.salutation).toEqual('Hello');

         child.salutation = "Welcome";
         expect(child.salutation).toEqual('Welcome');
         expect(parent.salutation).toEqual('Hello');
     * ```
     *
     * When interacting with `Scope` in tests, additional helper methods are available on the
     * instances of `Scope` type. See {@link ngMock.$rootScope.Scope ngMock Scope} for additional
     * details.
     *
     *
     * @param {Object.<string, function()>=} providers Map of service factory which need to be
     *                                       provided for the current scope. Defaults to {@link ng}.
     * @param {Object.<string, *>=} instanceCache Provides pre-instantiated services which should
     *                              append/override services provided by `providers`. This is handy
     *                              when unit-testing and having the need to override a default
     *                              service.
     * @returns {Object} Newly created scope.
     *
     */
function n(){this.$id=j(),this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this.$root=this,this.$$destroyed=!1,this.$$listeners={},this.$$listenerCount={},this.$$isolateBindings=null}function p(a){if(y.$$phase)throw c("inprog","{0} already in progress",y.$$phase);y.$$phase=a}function q(){y.$$phase=null}function s(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}/**
     * function used as an initial value for watchers.
     * because it's unique we can easily tell it apart from other values
     */
function u(){}function v(){for(;B.length;)try{B.shift()()}catch(a){i(a)}h=null}function w(){null===h&&(h=l.defer(function(){y.$apply(v)}))}/**
     * @ngdoc property
     * @name $rootScope.Scope#$id
     *
     * @description
     * Unique scope ID (monotonically increasing) useful for debugging.
     */
/**
      * @ngdoc property
      * @name $rootScope.Scope#$parent
      *
      * @description
      * Reference to the parent scope.
      */
/**
       * @ngdoc property
       * @name $rootScope.Scope#$root
       *
       * @description
       * Reference to the root scope.
       */
n.prototype={constructor:n,/**
       * @ngdoc method
       * @name $rootScope.Scope#$new
       * @kind function
       *
       * @description
       * Creates a new child {@link ng.$rootScope.Scope scope}.
       *
       * The parent scope will propagate the {@link ng.$rootScope.Scope#$digest $digest()} event.
       * The scope can be removed from the scope hierarchy using {@link ng.$rootScope.Scope#$destroy $destroy()}.
       *
       * {@link ng.$rootScope.Scope#$destroy $destroy()} must be called on a scope when it is
       * desired for the scope and its child scopes to be permanently detached from the parent and
       * thus stop participating in model change detection and listener notification by invoking.
       *
       * @param {boolean} isolate If true, then the scope does not prototypically inherit from the
       *         parent scope. The scope is isolated, as it can not see parent scope properties.
       *         When creating widgets, it is useful for the widget to not accidentally read parent
       *         state.
       *
       * @param {Scope} [parent=this] The {@link ng.$rootScope.Scope `Scope`} that will be the `$parent`
       *                              of the newly created scope. Defaults to `this` scope if not provided.
       *                              This is used when creating a transclude scope to correctly place it
       *                              in the scope hierarchy while maintaining the correct prototypical
       *                              inheritance.
       *
       * @returns {Object} The newly created child scope.
       *
       */
$new:function(b,c){var d;
// Only create a child scope class if somebody asks for one,
// but cache it to allow the VM to optimize lookups.
// When the new scope is not isolated or we inherit from `this`, and
// the parent scope is destroyed, the property `$$destroyed` is inherited
// prototypically. In all other cases, this property needs to be set
// when the parent scope is destroyed.
// The listener needs to be added after the parent is set
return c=c||this,b?(d=new n,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope),d.$parent=c,d.$$prevSibling=c.$$childTail,c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d,(b||c!=this)&&d.$on("$destroy",m),d},/**
       * @ngdoc method
       * @name $rootScope.Scope#$watch
       * @kind function
       *
       * @description
       * Registers a `listener` callback to be executed whenever the `watchExpression` changes.
       *
       * - The `watchExpression` is called on every call to {@link ng.$rootScope.Scope#$digest
       *   $digest()} and should return the value that will be watched. (Since
       *   {@link ng.$rootScope.Scope#$digest $digest()} reruns when it detects changes the
       *   `watchExpression` can execute multiple times per
       *   {@link ng.$rootScope.Scope#$digest $digest()} and should be idempotent.)
       * - The `listener` is called only when the value from the current `watchExpression` and the
       *   previous call to `watchExpression` are not equal (with the exception of the initial run,
       *   see below). Inequality is determined according to reference inequality,
       *   [strict comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
       *    via the `!==` Javascript operator, unless `objectEquality == true`
       *   (see next point)
       * - When `objectEquality == true`, inequality of the `watchExpression` is determined
       *   according to the {@link angular.equals} function. To save the value of the object for
       *   later comparison, the {@link angular.copy} function is used. This therefore means that
       *   watching complex objects will have adverse memory and performance implications.
       * - The watch `listener` may change the model, which may trigger other `listener`s to fire.
       *   This is achieved by rerunning the watchers until no changes are detected. The rerun
       *   iteration limit is 10 to prevent an infinite loop deadlock.
       *
       *
       * If you want to be notified whenever {@link ng.$rootScope.Scope#$digest $digest} is called,
       * you can register a `watchExpression` function with no `listener`. (Since `watchExpression`
       * can execute multiple times per {@link ng.$rootScope.Scope#$digest $digest} cycle when a
       * change is detected, be prepared for multiple calls to your listener.)
       *
       * After a watcher is registered with the scope, the `listener` fn is called asynchronously
       * (via {@link ng.$rootScope.Scope#$evalAsync $evalAsync}) to initialize the
       * watcher. In rare cases, this is undesirable because the listener is called when the result
       * of `watchExpression` didn't change. To detect this scenario within the `listener` fn, you
       * can compare the `newVal` and `oldVal`. If these two values are identical (`===`) then the
       * listener was called due to initialization.
       *
       *
       *
       * # Example
       * ```js
           // let's assume that scope was dependency injected as the $rootScope
           var scope = $rootScope;
           scope.name = 'misko';
           scope.counter = 0;

           expect(scope.counter).toEqual(0);
           scope.$watch('name', function(newValue, oldValue) {
             scope.counter = scope.counter + 1;
           });
           expect(scope.counter).toEqual(0);

           scope.$digest();
           // the listener is always called during the first $digest loop after it was registered
           expect(scope.counter).toEqual(1);

           scope.$digest();
           // but now it will not be called unless the value changes
           expect(scope.counter).toEqual(1);

           scope.name = 'adam';
           scope.$digest();
           expect(scope.counter).toEqual(2);



           // Using a function as a watchExpression
           var food;
           scope.foodCounter = 0;
           expect(scope.foodCounter).toEqual(0);
           scope.$watch(
             // This function returns the value being watched. It is called for each turn of the $digest loop
             function() { return food; },
             // This is the change listener, called when the value returned from the above function changes
             function(newValue, oldValue) {
               if ( newValue !== oldValue ) {
                 // Only increment the counter if the value changed
                 scope.foodCounter = scope.foodCounter + 1;
               }
             }
           );
           // No digest has been run so the counter will be zero
           expect(scope.foodCounter).toEqual(0);

           // Run the digest but since food has not changed count will still be zero
           scope.$digest();
           expect(scope.foodCounter).toEqual(0);

           // Update food and run digest.  Now the counter will increment
           food = 'cheeseburger';
           scope.$digest();
           expect(scope.foodCounter).toEqual(1);

       * ```
       *
       *
       *
       * @param {(function()|string)} watchExpression Expression that is evaluated on each
       *    {@link ng.$rootScope.Scope#$digest $digest} cycle. A change in the return value triggers
       *    a call to the `listener`.
       *
       *    - `string`: Evaluated as {@link guide/expression expression}
       *    - `function(scope)`: called with current `scope` as a parameter.
       * @param {function(newVal, oldVal, scope)} listener Callback called whenever the value
       *    of `watchExpression` changes.
       *
       *    - `newVal` contains the current value of the `watchExpression`
       *    - `oldVal` contains the previous value of the `watchExpression`
       *    - `scope` refers to the current scope
       * @param {boolean=} objectEquality Compare for object equality using {@link angular.equals} instead of
       *     comparing for reference equality.
       * @returns {function()} Returns a deregistration function for this listener.
       */
$watch:function(a,b,c){var d=k(a);if(d.$$watchDelegate)return d.$$watchDelegate(this,b,c,d);var e=this,f=e.$$watchers,h={fn:b,last:u,get:d,exp:a,eq:!!c};
// we use unshift since we use a while loop in $digest for speed.
// the while loop reads in reverse order.
return g=null,x(b)||(h.fn=o),f||(f=e.$$watchers=[]),f.unshift(h),function(){J(f,h),g=null}},/**
       * @ngdoc method
       * @name $rootScope.Scope#$watchGroup
       * @kind function
       *
       * @description
       * A variant of {@link ng.$rootScope.Scope#$watch $watch()} where it watches an array of `watchExpressions`.
       * If any one expression in the collection changes the `listener` is executed.
       *
       * - The items in the `watchExpressions` array are observed via standard $watch operation and are examined on every
       *   call to $digest() to see if any items changes.
       * - The `listener` is called whenever any expression in the `watchExpressions` array changes.
       *
       * @param {Array.<string|Function(scope)>} watchExpressions Array of expressions that will be individually
       * watched using {@link ng.$rootScope.Scope#$watch $watch()}
       *
       * @param {function(newValues, oldValues, scope)} listener Callback called whenever the return value of any
       *    expression in `watchExpressions` changes
       *    The `newValues` array contains the current values of the `watchExpressions`, with the indexes matching
       *    those of `watchExpression`
       *    and the `oldValues` array contains the previous values of the `watchExpressions`, with the indexes matching
       *    those of `watchExpression`
       *    The `scope` refers to the current scope.
       * @returns {function()} Returns a de-registration function for all listeners.
       */
$watchGroup:function(a,b){function c(){i=!1,j?(j=!1,b(e,e,h)):b(e,d,h)}var d=new Array(a.length),e=new Array(a.length),g=[],h=this,i=!1,j=!0;if(!a.length){
// No expressions means we call the listener ASAP
var k=!0;return h.$evalAsync(function(){k&&b(e,e,h)}),function(){k=!1}}return 1===a.length?this.$watch(a[0],function(a,c,f){e[0]=a,d[0]=c,b(e,a===c?e:d,f)}):(f(a,function(a,b){var f=h.$watch(a,function(a,f){e[b]=a,d[b]=f,i||(i=!0,h.$evalAsync(c))});g.push(f)}),function(){for(;g.length;)g.shift()()})},/**
       * @ngdoc method
       * @name $rootScope.Scope#$watchCollection
       * @kind function
       *
       * @description
       * Shallow watches the properties of an object and fires whenever any of the properties change
       * (for arrays, this implies watching the array items; for object maps, this implies watching
       * the properties). If a change is detected, the `listener` callback is fired.
       *
       * - The `obj` collection is observed via standard $watch operation and is examined on every
       *   call to $digest() to see if any items have been added, removed, or moved.
       * - The `listener` is called whenever anything within the `obj` has changed. Examples include
       *   adding, removing, and moving items belonging to an object or array.
       *
       *
       * # Example
       * ```js
          $scope.names = ['igor', 'matias', 'misko', 'james'];
          $scope.dataCount = 4;

          $scope.$watchCollection('names', function(newNames, oldNames) {
            $scope.dataCount = newNames.length;
          });

          expect($scope.dataCount).toEqual(4);
          $scope.$digest();

          //still at 4 ... no changes
          expect($scope.dataCount).toEqual(4);

          $scope.names.pop();
          $scope.$digest();

          //now there's been a change
          expect($scope.dataCount).toEqual(3);
       * ```
       *
       *
       * @param {string|function(scope)} obj Evaluated as {@link guide/expression expression}. The
       *    expression value should evaluate to an object or an array which is observed on each
       *    {@link ng.$rootScope.Scope#$digest $digest} cycle. Any shallow change within the
       *    collection will trigger a call to the `listener`.
       *
       * @param {function(newCollection, oldCollection, scope)} listener a callback function called
       *    when a change is detected.
       *    - The `newCollection` object is the newly modified data obtained from the `obj` expression
       *    - The `oldCollection` object is a copy of the former collection data.
       *      Due to performance considerations, the`oldCollection` value is computed only if the
       *      `listener` function declares two or more arguments.
       *    - The `scope` argument refers to the current scope.
       *
       * @returns {function()} Returns a de-registration function for this listener. When the
       *    de-registration function is executed, the internal watch operation is terminated.
       */
$watchCollection:function(a,b){function c(a){f=a;var b,c,d,h,i;
// If the new value is undefined, then return undefined as the watch may be a one-time watch
if(!r(f)){if(t(f))if(e(f)){g!==n&&(
// we are transitioning from something which was not an array into array.
g=n,q=g.length=0,l++),b=f.length,q!==b&&(
// if lengths do not match we need to trigger change notification
l++,g.length=q=b);
// copy the items to oldValue and look for changes.
for(var j=0;b>j;j++)i=g[j],h=f[j],d=i!==i&&h!==h,d||i===h||(l++,g[j]=h)}else{g!==o&&(
// we are transitioning from something which was not an object into object.
g=o={},q=0,l++),
// copy the items to oldValue and look for changes.
b=0;for(c in f)f.hasOwnProperty(c)&&(b++,h=f[c],i=g[c],c in g?(d=i!==i&&h!==h,d||i===h||(l++,g[c]=h)):(q++,g[c]=h,l++));if(q>b){
// we used to have more keys, need to find them and destroy them.
l++;for(c in g)f.hasOwnProperty(c)||(q--,delete g[c])}}else// if primitive
g!==f&&(g=f,l++);return l}}function d(){
// make a copy for the next time a collection is changed
if(p?(p=!1,b(f,f,i)):b(f,h,i),j)if(t(f))if(e(f)){h=new Array(f.length);for(var a=0;a<f.length;a++)h[a]=f[a]}else{// if object
h={};for(var c in f)Xc.call(f,c)&&(h[c]=f[c])}else
//primitive
h=f}c.$stateful=!0;var f,g,h,i=this,j=b.length>1,l=0,m=k(a,c),n=[],o={},p=!0,q=0;return this.$watch(m,d)},/**
       * @ngdoc method
       * @name $rootScope.Scope#$digest
       * @kind function
       *
       * @description
       * Processes all of the {@link ng.$rootScope.Scope#$watch watchers} of the current scope and
       * its children. Because a {@link ng.$rootScope.Scope#$watch watcher}'s listener can change
       * the model, the `$digest()` keeps calling the {@link ng.$rootScope.Scope#$watch watchers}
       * until no more listeners are firing. This means that it is possible to get into an infinite
       * loop. This function will throw `'Maximum iteration limit exceeded.'` if the number of
       * iterations exceeds 10.
       *
       * Usually, you don't call `$digest()` directly in
       * {@link ng.directive:ngController controllers} or in
       * {@link ng.$compileProvider#directive directives}.
       * Instead, you should call {@link ng.$rootScope.Scope#$apply $apply()} (typically from within
       * a {@link ng.$compileProvider#directive directive}), which will force a `$digest()`.
       *
       * If you want to be notified whenever `$digest()` is called,
       * you can register a `watchExpression` function with
       * {@link ng.$rootScope.Scope#$watch $watch()} with no `listener`.
       *
       * In unit tests, you may need to call `$digest()` to simulate the scope life cycle.
       *
       * # Example
       * ```js
           var scope = ...;
           scope.name = 'misko';
           scope.counter = 0;

           expect(scope.counter).toEqual(0);
           scope.$watch('name', function(newValue, oldValue) {
             scope.counter = scope.counter + 1;
           });
           expect(scope.counter).toEqual(0);

           scope.$digest();
           // the listener is always called during the first $digest loop after it was registered
           expect(scope.counter).toEqual(1);

           scope.$digest();
           // but now it will not be called unless the value changes
           expect(scope.counter).toEqual(1);

           scope.name = 'adam';
           scope.$digest();
           expect(scope.counter).toEqual(2);
       * ```
       *
       */
$digest:function(){var a,d,e,f,j,k,m,n,o,r,s=b,t=this,w=[];p("$digest"),
// Check for changes to browser url that happened in sync before the call to $digest
l.$$checkUrlChange(),this===y&&null!==h&&(
// If this is the root scope, and $applyAsync has scheduled a deferred $apply(), then
// cancel the scheduled $apply and flush the queue of expressions to be evaluated.
l.defer.cancel(h),v()),g=null;do{for(// "while dirty" loop
k=!1,n=t;z.length;){try{r=z.shift(),r.scope.$eval(r.expression,r.locals)}catch(B){i(B)}g=null}a:do{// "traverse the scopes" loop
if(f=n.$$watchers)for(
// process our watches
j=f.length;j--;)try{
// Most common watches are on primitives, in which case we can short
// circuit it with === operator, only when === fails do we use .equals
if(a=f[j])if((d=a.get(n))===(e=a.last)||(a.eq?M(d,e):"number"==typeof d&&"number"==typeof e&&isNaN(d)&&isNaN(e))){if(a===g){
// If the most recently dirty watcher is now clean, short circuit since the remaining watchers
// have already been tested.
k=!1;break a}}else k=!0,g=a,a.last=a.eq?K(d,null):d,a.fn(d,e===u?d:e,n),5>s&&(o=4-s,w[o]||(w[o]=[]),w[o].push({msg:x(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:d,oldVal:e}))}catch(B){i(B)}
// Insanity Warning: scope depth-first traversal
// yes, this code is a bit crazy, but it works and we have tests to prove it!
// this piece should be kept in sync with the traversal in $broadcast
if(!(m=n.$$childHead||n!==t&&n.$$nextSibling))for(;n!==t&&!(m=n.$$nextSibling);)n=n.$parent}while(n=m);
// `break traverseScopesLoop;` takes us to here
if((k||z.length)&&!s--)throw q(),c("infdig","{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}",b,w)}while(k||z.length);for(q();A.length;)try{A.shift()()}catch(B){i(B)}},/**
       * @ngdoc event
       * @name $rootScope.Scope#$destroy
       * @eventType broadcast on scope being destroyed
       *
       * @description
       * Broadcasted when a scope and its children are being destroyed.
       *
       * Note that, in AngularJS, there is also a `$destroy` jQuery event, which can be used to
       * clean up DOM bindings before an element is removed from the DOM.
       */
/**
       * @ngdoc method
       * @name $rootScope.Scope#$destroy
       * @kind function
       *
       * @description
       * Removes the current scope (and all of its children) from the parent scope. Removal implies
       * that calls to {@link ng.$rootScope.Scope#$digest $digest()} will no longer
       * propagate to the current scope and its children. Removal also implies that the current
       * scope is eligible for garbage collection.
       *
       * The `$destroy()` is usually used by directives such as
       * {@link ng.directive:ngRepeat ngRepeat} for managing the
       * unrolling of the loop.
       *
       * Just before a scope is destroyed, a `$destroy` event is broadcasted on this scope.
       * Application code can register a `$destroy` event handler that will give it a chance to
       * perform any necessary cleanup.
       *
       * Note that, in AngularJS, there is also a `$destroy` jQuery event, which can be used to
       * clean up DOM bindings before an element is removed from the DOM.
       */
$destroy:function(){
// we can't destroy the root scope or a scope that has been already destroyed
if(!this.$$destroyed){var a=this.$parent;if(this.$broadcast("$destroy"),this.$$destroyed=!0,this!==y){for(var b in this.$$listenerCount)s(this,this.$$listenerCount[b],b);
// sever all the references to parent scopes (after this cleanup, the current scope should
// not be retained by any of our references and should be eligible for garbage collection)
a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),
// Disable listeners, watchers and apply/digest methods
this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=o,this.$on=this.$watch=this.$watchGroup=function(){return o},this.$$listeners={},
// All of the code below is bogus code that works around V8's memory leak via optimized code
// and inline caches.
//
// see:
// - https://code.google.com/p/v8/issues/detail?id=2073#c26
// - https://github.com/angular/angular.js/issues/6794#issuecomment-38648909
// - https://github.com/angular/angular.js/issues/1313#issuecomment-10378451
this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},/**
       * @ngdoc method
       * @name $rootScope.Scope#$eval
       * @kind function
       *
       * @description
       * Executes the `expression` on the current scope and returns the result. Any exceptions in
       * the expression are propagated (uncaught). This is useful when evaluating Angular
       * expressions.
       *
       * # Example
       * ```js
           var scope = ng.$rootScope.Scope();
           scope.a = 1;
           scope.b = 2;

           expect(scope.$eval('a+b')).toEqual(3);
           expect(scope.$eval(function(scope){ return scope.a + scope.b; })).toEqual(3);
       * ```
       *
       * @param {(string|function())=} expression An angular expression to be executed.
       *
       *    - `string`: execute using the rules as defined in  {@link guide/expression expression}.
       *    - `function(scope)`: execute the function with the current `scope` parameter.
       *
       * @param {(object)=} locals Local variables object, useful for overriding values in scope.
       * @returns {*} The result of evaluating the expression.
       */
$eval:function(a,b){return k(a)(this,b)},/**
       * @ngdoc method
       * @name $rootScope.Scope#$evalAsync
       * @kind function
       *
       * @description
       * Executes the expression on the current scope at a later point in time.
       *
       * The `$evalAsync` makes no guarantees as to when the `expression` will be executed, only
       * that:
       *
       *   - it will execute after the function that scheduled the evaluation (preferably before DOM
       *     rendering).
       *   - at least one {@link ng.$rootScope.Scope#$digest $digest cycle} will be performed after
       *     `expression` execution.
       *
       * Any exceptions from the execution of the expression are forwarded to the
       * {@link ng.$exceptionHandler $exceptionHandler} service.
       *
       * __Note:__ if this function is called outside of a `$digest` cycle, a new `$digest` cycle
       * will be scheduled. However, it is encouraged to always call code that changes the model
       * from within an `$apply` call. That includes code evaluated via `$evalAsync`.
       *
       * @param {(string|function())=} expression An angular expression to be executed.
       *
       *    - `string`: execute using the rules as defined in {@link guide/expression expression}.
       *    - `function(scope)`: execute the function with the current `scope` parameter.
       *
       * @param {(object)=} locals Local variables object, useful for overriding values in scope.
       */
$evalAsync:function(a,b){
// if we are outside of an $digest loop and this is the first time we are scheduling async
// task also schedule async auto-flush
y.$$phase||z.length||l.defer(function(){z.length&&y.$digest()}),z.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){A.push(a)},/**
       * @ngdoc method
       * @name $rootScope.Scope#$apply
       * @kind function
       *
       * @description
       * `$apply()` is used to execute an expression in angular from outside of the angular
       * framework. (For example from browser DOM events, setTimeout, XHR or third party libraries).
       * Because we are calling into the angular framework we need to perform proper scope life
       * cycle of {@link ng.$exceptionHandler exception handling},
       * {@link ng.$rootScope.Scope#$digest executing watches}.
       *
       * ## Life cycle
       *
       * # Pseudo-Code of `$apply()`
       * ```js
           function $apply(expr) {
             try {
               return $eval(expr);
             } catch (e) {
               $exceptionHandler(e);
             } finally {
               $root.$digest();
             }
           }
       * ```
       *
       *
       * Scope's `$apply()` method transitions through the following stages:
       *
       * 1. The {@link guide/expression expression} is executed using the
       *    {@link ng.$rootScope.Scope#$eval $eval()} method.
       * 2. Any exceptions from the execution of the expression are forwarded to the
       *    {@link ng.$exceptionHandler $exceptionHandler} service.
       * 3. The {@link ng.$rootScope.Scope#$watch watch} listeners are fired immediately after the
       *    expression was executed using the {@link ng.$rootScope.Scope#$digest $digest()} method.
       *
       *
       * @param {(string|function())=} exp An angular expression to be executed.
       *
       *    - `string`: execute using the rules as defined in {@link guide/expression expression}.
       *    - `function(scope)`: execute the function with current `scope` parameter.
       *
       * @returns {*} The result of evaluating the expression.
       */
$apply:function(a){try{return p("$apply"),this.$eval(a)}catch(b){i(b)}finally{q();try{y.$digest()}catch(b){throw i(b),b}}},/**
       * @ngdoc method
       * @name $rootScope.Scope#$applyAsync
       * @kind function
       *
       * @description
       * Schedule the invocation of $apply to occur at a later time. The actual time difference
       * varies across browsers, but is typically around ~10 milliseconds.
       *
       * This can be used to queue up multiple expressions which need to be evaluated in the same
       * digest.
       *
       * @param {(string|function())=} exp An angular expression to be executed.
       *
       *    - `string`: execute using the rules as defined in {@link guide/expression expression}.
       *    - `function(scope)`: execute the function with current `scope` parameter.
       */
$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&B.push(b),w()},/**
       * @ngdoc method
       * @name $rootScope.Scope#$on
       * @kind function
       *
       * @description
       * Listens on events of a given type. See {@link ng.$rootScope.Scope#$emit $emit} for
       * discussion of event life cycle.
       *
       * The event listener function format is: `function(event, args...)`. The `event` object
       * passed into the listener has the following attributes:
       *
       *   - `targetScope` - `{Scope}`: the scope on which the event was `$emit`-ed or
       *     `$broadcast`-ed.
       *   - `currentScope` - `{Scope}`: the scope that is currently handling the event. Once the
       *     event propagates through the scope hierarchy, this property is set to null.
       *   - `name` - `{string}`: name of the event.
       *   - `stopPropagation` - `{function=}`: calling `stopPropagation` function will cancel
       *     further event propagation (available only for events that were `$emit`-ed).
       *   - `preventDefault` - `{function}`: calling `preventDefault` sets `defaultPrevented` flag
       *     to true.
       *   - `defaultPrevented` - `{boolean}`: true if `preventDefault` was called.
       *
       * @param {string} name Event name to listen on.
       * @param {function(event, ...args)} listener Function to call when the event is emitted.
       * @returns {function()} Returns a deregistration function for this listener.
       */
$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]),c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,s(e,1,a))}},/**
       * @ngdoc method
       * @name $rootScope.Scope#$emit
       * @kind function
       *
       * @description
       * Dispatches an event `name` upwards through the scope hierarchy notifying the
       * registered {@link ng.$rootScope.Scope#$on} listeners.
       *
       * The event life cycle starts at the scope on which `$emit` was called. All
       * {@link ng.$rootScope.Scope#$on listeners} listening for `name` event on this scope get
       * notified. Afterwards, the event traverses upwards toward the root scope and calls all
       * registered listeners along the way. The event will stop propagating if one of the listeners
       * cancels it.
       *
       * Any exception emitted from the {@link ng.$rootScope.Scope#$on listeners} will be passed
       * onto the {@link ng.$exceptionHandler $exceptionHandler} service.
       *
       * @param {string} name Event name to emit.
       * @param {...*} args Optional one or more arguments which will be passed onto the event listeners.
       * @return {Object} Event object (see {@link ng.$rootScope.Scope#$on}).
       */
$emit:function(a,b){var c,d,e,f=[],g=this,h=!1,j={name:a,targetScope:g,stopPropagation:function(){h=!0},preventDefault:function(){j.defaultPrevented=!0},defaultPrevented:!1},k=N([j],arguments,1);do{for(c=g.$$listeners[a]||f,j.currentScope=g,d=0,e=c.length;e>d;d++)
// if listeners were deregistered, defragment the array
if(c[d])try{
//allow all listeners attached to the current scope to run
c[d].apply(null,k)}catch(l){i(l)}else c.splice(d,1),d--,e--;
//if any listener on the current scope stops propagation, prevent bubbling
if(h)return j.currentScope=null,j;
//traverse upwards
g=g.$parent}while(g);return j.currentScope=null,j},/**
       * @ngdoc method
       * @name $rootScope.Scope#$broadcast
       * @kind function
       *
       * @description
       * Dispatches an event `name` downwards to all child scopes (and their children) notifying the
       * registered {@link ng.$rootScope.Scope#$on} listeners.
       *
       * The event life cycle starts at the scope on which `$broadcast` was called. All
       * {@link ng.$rootScope.Scope#$on listeners} listening for `name` event on this scope get
       * notified. Afterwards, the event propagates to all direct and indirect scopes of the current
       * scope and calls all registered listeners along the way. The event cannot be canceled.
       *
       * Any exception emitted from the {@link ng.$rootScope.Scope#$on listeners} will be passed
       * onto the {@link ng.$exceptionHandler $exceptionHandler} service.
       *
       * @param {string} name Event name to broadcast.
       * @param {...*} args Optional one or more arguments which will be passed onto the event listeners.
       * @return {Object} Event object, see {@link ng.$rootScope.Scope#$on}
       */
$broadcast:function(a,b){var c=this,d=c,e=c,f={name:a,targetScope:c,preventDefault:function(){f.defaultPrevented=!0},defaultPrevented:!1};if(!c.$$listenerCount[a])return f;
//down while you can, then up and next sibling or up and next sibling until back at root
for(var g,h,j,k=N([f],arguments,1);d=e;){for(f.currentScope=d,g=d.$$listeners[a]||[],h=0,j=g.length;j>h;h++)
// if listeners were deregistered, defragment the array
if(g[h])try{g[h].apply(null,k)}catch(l){i(l)}else g.splice(h,1),h--,j--;
// Insanity Warning: scope depth-first traversal
// yes, this code is a bit crazy, but it works and we have tests to prove it!
// this piece should be kept in sync with the traversal in $digest
// (though it differs due to having the extra check for $$listenerCount)
if(!(e=d.$$listenerCount[a]&&d.$$childHead||d!==c&&d.$$nextSibling))for(;d!==c&&!(e=d.$$nextSibling);)d=d.$parent}return f.currentScope=null,f}};var y=new n,z=y.$$asyncQueue=[],A=y.$$postDigestQueue=[],B=y.$$applyAsyncQueue=[];return y}]}/**
 * @description
 * Private service to sanitize uris for links and images. Used by $compile and $sanitize.
 */
function Wb(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;/**
   * @description
   * Retrieves or overrides the default regular expression that is used for whitelisting of safe
   * urls during a[href] sanitization.
   *
   * The sanitization is a security measure aimed at prevent XSS attacks via html links.
   *
   * Any url about to be assigned to a[href] via data-binding is first normalized and turned into
   * an absolute url. Afterwards, the url is matched against the `aHrefSanitizationWhitelist`
   * regular expression. If a match is found, the original url is written into the dom. Otherwise,
   * the absolute url is prefixed with `'unsafe:'` string and only then is it written into the DOM.
   *
   * @param {RegExp=} regexp New regexp to whitelist urls with.
   * @returns {RegExp|ng.$compileProvider} Current RegExp if called without value or self for
   *    chaining otherwise.
   */
this.aHrefSanitizationWhitelist=function(b){return s(b)?(a=b,this):a},/**
   * @description
   * Retrieves or overrides the default regular expression that is used for whitelisting of safe
   * urls during img[src] sanitization.
   *
   * The sanitization is a security measure aimed at prevent XSS attacks via html links.
   *
   * Any url about to be assigned to img[src] via data-binding is first normalized and turned into
   * an absolute url. Afterwards, the url is matched against the `imgSrcSanitizationWhitelist`
   * regular expression. If a match is found, the original url is written into the dom. Otherwise,
   * the absolute url is prefixed with `'unsafe:'` string and only then is it written into the DOM.
   *
   * @param {RegExp=} regexp New regexp to whitelist urls with.
   * @returns {RegExp|ng.$compileProvider} Current RegExp if called without value or self for
   *    chaining otherwise.
   */
this.imgSrcSanitizationWhitelist=function(a){return s(a)?(b=a,this):b},this.$get=function(){return function(c,d){var e,f=d?b:a;return e=dc(c).href,""===e||e.match(f)?c:"unsafe:"+e}}}
// Helper functions follow.
function Xb(a){if("self"===a)return a;if(u(a)){
// Strings match exactly except for 2 wildcards - '*' and '**'.
// '*' matches any character except those from the set ':/.?&'.
// '**' matches any character (like .* in a RegExp).
// More than 2 *'s raises an error as it's ill defined.
if(a.indexOf("***")>-1)throw te("iwcard","Illegal sequence *** in string matcher.  String: {0}",a);return a=nd(a).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*"),new RegExp("^"+a+"$")}if(y(a))
// The only other type of matcher allowed is a Regexp.
// Match entire URL / disallow partial matches.
// Flags are reset (i.e. no global, ignoreCase or multiline)
return new RegExp("^"+a.source+"$");throw te("imatcher",'Matchers may only be "self", string patterns or RegExp objects')}function Yb(a){var b=[];return s(a)&&f(a,function(a){b.push(Xb(a))}),b}/**
 * @ngdoc service
 * @name $sceDelegate
 * @kind function
 *
 * @description
 *
 * `$sceDelegate` is a service that is used by the `$sce` service to provide {@link ng.$sce Strict
 * Contextual Escaping (SCE)} services to AngularJS.
 *
 * Typically, you would configure or override the {@link ng.$sceDelegate $sceDelegate} instead of
 * the `$sce` service to customize the way Strict Contextual Escaping works in AngularJS.  This is
 * because, while the `$sce` provides numerous shorthand methods, etc., you really only need to
 * override 3 core functions (`trustAs`, `getTrusted` and `valueOf`) to replace the way things
 * work because `$sce` delegates to `$sceDelegate` for these operations.
 *
 * Refer {@link ng.$sceDelegateProvider $sceDelegateProvider} to configure this service.
 *
 * The default instance of `$sceDelegate` should work out of the box with little pain.  While you
 * can override it completely to change the behavior of `$sce`, the common case would
 * involve configuring the {@link ng.$sceDelegateProvider $sceDelegateProvider} instead by setting
 * your own whitelists and blacklists for trusting URLs used for loading AngularJS resources such as
 * templates.  Refer {@link ng.$sceDelegateProvider#resourceUrlWhitelist
 * $sceDelegateProvider.resourceUrlWhitelist} and {@link
 * ng.$sceDelegateProvider#resourceUrlBlacklist $sceDelegateProvider.resourceUrlBlacklist}
 */
/**
 * @ngdoc provider
 * @name $sceDelegateProvider
 * @description
 *
 * The `$sceDelegateProvider` provider allows developers to configure the {@link ng.$sceDelegate
 * $sceDelegate} service.  This allows one to get/set the whitelists and blacklists used to ensure
 * that the URLs used for sourcing Angular templates are safe.  Refer {@link
 * ng.$sceDelegateProvider#resourceUrlWhitelist $sceDelegateProvider.resourceUrlWhitelist} and
 * {@link ng.$sceDelegateProvider#resourceUrlBlacklist $sceDelegateProvider.resourceUrlBlacklist}
 *
 * For the general details about this service in Angular, read the main page for {@link ng.$sce
 * Strict Contextual Escaping (SCE)}.
 *
 * **Example**:  Consider the following case. <a name="example"></a>
 *
 * - your app is hosted at url `http://myapp.example.com/`
 * - but some of your templates are hosted on other domains you control such as
 *   `http://srv01.assets.example.com/`,  `http://srv02.assets.example.com/`, etc.
 * - and you have an open redirect at `http://myapp.example.com/clickThru?...`.
 *
 * Here is what a secure configuration for this scenario might look like:
 *
 * ```
 *  angular.module('myApp', []).config(function($sceDelegateProvider) {
 *    $sceDelegateProvider.resourceUrlWhitelist([
 *      // Allow same origin resource loads.
 *      'self',
 *      // Allow loading from our assets domain.  Notice the difference between * and **.
 *      'http://srv*.assets.example.com/**'
 *    ]);
 *
 *    // The blacklist overrides the whitelist so the open redirect here is blocked.
 *    $sceDelegateProvider.resourceUrlBlacklist([
 *      'http://myapp.example.com/clickThru**'
 *    ]);
 *  });
 * ```
 */
function Zb(){this.SCE_CONTEXTS=ue;
// Resource URLs can also be trusted by policy.
var a=["self"],b=[];/**
   * @ngdoc method
   * @name $sceDelegateProvider#resourceUrlWhitelist
   * @kind function
   *
   * @param {Array=} whitelist When provided, replaces the resourceUrlWhitelist with the value
   *     provided.  This must be an array or null.  A snapshot of this array is used so further
   *     changes to the array are ignored.
   *
   *     Follow {@link ng.$sce#resourceUrlPatternItem this link} for a description of the items
   *     allowed in this array.
   *
   *     Note: **an empty whitelist array will block all URLs**!
   *
   * @return {Array} the currently set whitelist array.
   *
   * The **default value** when no whitelist has been explicitly set is `['self']` allowing only
   * same origin resource requests.
   *
   * @description
   * Sets/Gets the whitelist of trusted resource URLs.
   */
this.resourceUrlWhitelist=function(b){return arguments.length&&(a=Yb(b)),a},/**
   * @ngdoc method
   * @name $sceDelegateProvider#resourceUrlBlacklist
   * @kind function
   *
   * @param {Array=} blacklist When provided, replaces the resourceUrlBlacklist with the value
   *     provided.  This must be an array or null.  A snapshot of this array is used so further
   *     changes to the array are ignored.
   *
   *     Follow {@link ng.$sce#resourceUrlPatternItem this link} for a description of the items
   *     allowed in this array.
   *
   *     The typical usage for the blacklist is to **block
   *     [open redirects](http://cwe.mitre.org/data/definitions/601.html)** served by your domain as
   *     these would otherwise be trusted but actually return content from the redirected domain.
   *
   *     Finally, **the blacklist overrides the whitelist** and has the final say.
   *
   * @return {Array} the currently set blacklist array.
   *
   * The **default value** when no whitelist has been explicitly set is the empty array (i.e. there
   * is no blacklist.)
   *
   * @description
   * Sets/Gets the blacklist of trusted resource URLs.
   */
this.resourceUrlBlacklist=function(a){return arguments.length&&(b=Yb(a)),b},this.$get=["$injector",function(d){function e(a,b){return"self"===a?ec(b):!!a.exec(b.href)}function f(c){var d,f,g=dc(c.toString()),h=!1;
// Ensure that at least one item from the whitelist allows this url.
for(d=0,f=a.length;f>d;d++)if(e(a[d],g)){h=!0;break}if(h)
// Ensure that no item from the blacklist blocked this url.
for(d=0,f=b.length;f>d;d++)if(e(b[d],g)){h=!1;break}return h}function g(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};return a&&(b.prototype=new a),b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()},b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()},b}/**
     * @ngdoc method
     * @name $sceDelegate#trustAs
     *
     * @description
     * Returns an object that is trusted by angular for use in specified strict
     * contextual escaping contexts (such as ng-bind-html, ng-include, any src
     * attribute interpolation, any dom event binding attribute interpolation
     * such as for onclick,  etc.) that uses the provided value.
     * See {@link ng.$sce $sce} for enabling strict contextual escaping.
     *
     * @param {string} type The kind of context in which this value is safe for use.  e.g. url,
     *   resourceUrl, html, js and css.
     * @param {*} value The value that that should be considered trusted/safe.
     * @returns {*} A value that can be used to stand in for the provided `value` in places
     * where Angular expects a $sce.trustAs() return value.
     */
function h(a,b){var d=m.hasOwnProperty(a)?m[a]:null;if(!d)throw te("icontext","Attempted to trust a value in invalid context. Context: {0}; Value: {1}",a,b);if(null===b||b===c||""===b)return b;
// All the current contexts in SCE_CONTEXTS happen to be strings.  In order to avoid trusting
// mutable objects, we ensure here that the value passed in is actually a string.
if("string"!=typeof b)throw te("itype","Attempted to trust a non-string value in a content requiring a string: Context: {0}",a);return new d(b)}/**
     * @ngdoc method
     * @name $sceDelegate#valueOf
     *
     * @description
     * If the passed parameter had been returned by a prior call to {@link ng.$sceDelegate#trustAs
     * `$sceDelegate.trustAs`}, returns the value that had been passed to {@link
     * ng.$sceDelegate#trustAs `$sceDelegate.trustAs`}.
     *
     * If the passed parameter is not a value that had been returned by {@link
     * ng.$sceDelegate#trustAs `$sceDelegate.trustAs`}, returns it as-is.
     *
     * @param {*} value The result of a prior {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs`}
     *      call or anything else.
     * @returns {*} The `value` that was originally provided to {@link ng.$sceDelegate#trustAs
     *     `$sceDelegate.trustAs`} if `value` is the result of such a call.  Otherwise, returns
     *     `value` unchanged.
     */
function i(a){return a instanceof l?a.$$unwrapTrustedValue():a}/**
     * @ngdoc method
     * @name $sceDelegate#getTrusted
     *
     * @description
     * Takes the result of a {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs`} call and
     * returns the originally supplied value if the queried context type is a supertype of the
     * created type.  If this condition isn't satisfied, throws an exception.
     *
     * @param {string} type The kind of context in which this value is to be used.
     * @param {*} maybeTrusted The result of a prior {@link ng.$sceDelegate#trustAs
     *     `$sceDelegate.trustAs`} call.
     * @returns {*} The value the was originally provided to {@link ng.$sceDelegate#trustAs
     *     `$sceDelegate.trustAs`} if valid in this context.  Otherwise, throws an exception.
     */
function j(a,b){if(null===b||b===c||""===b)return b;var d=m.hasOwnProperty(a)?m[a]:null;if(d&&b instanceof d)return b.$$unwrapTrustedValue();
// If we get here, then we may only take one of two actions.
// 1. sanitize the value for the requested type, or
// 2. throw an exception.
if(a===ue.RESOURCE_URL){if(f(b))return b;throw te("insecurl","Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}",b.toString())}if(a===ue.HTML)return k(b);throw te("unsafe","Attempting to use an unsafe value in a safe context.")}var k=function(a){throw te("unsafe","Attempting to use an unsafe value in a safe context.")};d.has("$sanitize")&&(k=d.get("$sanitize"));var l=g(),m={};return m[ue.HTML]=g(l),m[ue.CSS]=g(l),m[ue.URL]=g(l),m[ue.JS]=g(l),m[ue.RESOURCE_URL]=g(m[ue.URL]),{trustAs:h,getTrusted:j,valueOf:i}}]}/**
 * @ngdoc provider
 * @name $sceProvider
 * @description
 *
 * The $sceProvider provider allows developers to configure the {@link ng.$sce $sce} service.
 * -   enable/disable Strict Contextual Escaping (SCE) in a module
 * -   override the default implementation with a custom delegate
 *
 * Read more about {@link ng.$sce Strict Contextual Escaping (SCE)}.
 */
/* jshint maxlen: false*/
/**
 * @ngdoc service
 * @name $sce
 * @kind function
 *
 * @description
 *
 * `$sce` is a service that provides Strict Contextual Escaping services to AngularJS.
 *
 * # Strict Contextual Escaping
 *
 * Strict Contextual Escaping (SCE) is a mode in which AngularJS requires bindings in certain
 * contexts to result in a value that is marked as safe to use for that context.  One example of
 * such a context is binding arbitrary html controlled by the user via `ng-bind-html`.  We refer
 * to these contexts as privileged or SCE contexts.
 *
 * As of version 1.2, Angular ships with SCE enabled by default.
 *
 * Note:  When enabled (the default), IE<11 in quirks mode is not supported.  In this mode, IE<11 allow
 * one to execute arbitrary javascript by the use of the expression() syntax.  Refer
 * <http://blogs.msdn.com/b/ie/archive/2008/10/16/ending-expressions.aspx> to learn more about them.
 * You can ensure your document is in standards mode and not quirks mode by adding `<!doctype html>`
 * to the top of your HTML document.
 *
 * SCE assists in writing code in way that (a) is secure by default and (b) makes auditing for
 * security vulnerabilities such as XSS, clickjacking, etc. a lot easier.
 *
 * Here's an example of a binding in a privileged context:
 *
 * ```
 * <input ng-model="userHtml">
 * <div ng-bind-html="userHtml"></div>
 * ```
 *
 * Notice that `ng-bind-html` is bound to `userHtml` controlled by the user.  With SCE
 * disabled, this application allows the user to render arbitrary HTML into the DIV.
 * In a more realistic example, one may be rendering user comments, blog articles, etc. via
 * bindings.  (HTML is just one example of a context where rendering user controlled input creates
 * security vulnerabilities.)
 *
 * For the case of HTML, you might use a library, either on the client side, or on the server side,
 * to sanitize unsafe HTML before binding to the value and rendering it in the document.
 *
 * How would you ensure that every place that used these types of bindings was bound to a value that
 * was sanitized by your library (or returned as safe for rendering by your server?)  How can you
 * ensure that you didn't accidentally delete the line that sanitized the value, or renamed some
 * properties/fields and forgot to update the binding to the sanitized value?
 *
 * To be secure by default, you want to ensure that any such bindings are disallowed unless you can
 * determine that something explicitly says it's safe to use a value for binding in that
 * context.  You can then audit your code (a simple grep would do) to ensure that this is only done
 * for those values that you can easily tell are safe - because they were received from your server,
 * sanitized by your library, etc.  You can organize your codebase to help with this - perhaps
 * allowing only the files in a specific directory to do this.  Ensuring that the internal API
 * exposed by that code doesn't markup arbitrary values as safe then becomes a more manageable task.
 *
 * In the case of AngularJS' SCE service, one uses {@link ng.$sce#trustAs $sce.trustAs}
 * (and shorthand methods such as {@link ng.$sce#trustAsHtml $sce.trustAsHtml}, etc.) to
 * obtain values that will be accepted by SCE / privileged contexts.
 *
 *
 * ## How does it work?
 *
 * In privileged contexts, directives and code will bind to the result of {@link ng.$sce#getTrusted
 * $sce.getTrusted(context, value)} rather than to the value directly.  Directives use {@link
 * ng.$sce#parseAs $sce.parseAs} rather than `$parse` to watch attribute bindings, which performs the
 * {@link ng.$sce#getTrusted $sce.getTrusted} behind the scenes on non-constant literals.
 *
 * As an example, {@link ng.directive:ngBindHtml ngBindHtml} uses {@link
 * ng.$sce#parseAsHtml $sce.parseAsHtml(binding expression)}.  Here's the actual code (slightly
 * simplified):
 *
 * ```
 * var ngBindHtmlDirective = ['$sce', function($sce) {
 *   return function(scope, element, attr) {
 *     scope.$watch($sce.parseAsHtml(attr.ngBindHtml), function(value) {
 *       element.html(value || '');
 *     });
 *   };
 * }];
 * ```
 *
 * ## Impact on loading templates
 *
 * This applies both to the {@link ng.directive:ngInclude `ng-include`} directive as well as
 * `templateUrl`'s specified by {@link guide/directive directives}.
 *
 * By default, Angular only loads templates from the same domain and protocol as the application
 * document.  This is done by calling {@link ng.$sce#getTrustedResourceUrl
 * $sce.getTrustedResourceUrl} on the template URL.  To load templates from other domains and/or
 * protocols, you may either either {@link ng.$sceDelegateProvider#resourceUrlWhitelist whitelist
 * them} or {@link ng.$sce#trustAsResourceUrl wrap it} into a trusted value.
 *
 * *Please note*:
 * The browser's
 * [Same Origin Policy](https://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy_for_XMLHttpRequest)
 * and [Cross-Origin Resource Sharing (CORS)](http://www.w3.org/TR/cors/)
 * policy apply in addition to this and may further restrict whether the template is successfully
 * loaded.  This means that without the right CORS policy, loading templates from a different domain
 * won't work on all browsers.  Also, loading templates from `file://` URL does not work on some
 * browsers.
 *
 * ## This feels like too much overhead
 *
 * It's important to remember that SCE only applies to interpolation expressions.
 *
 * If your expressions are constant literals, they're automatically trusted and you don't need to
 * call `$sce.trustAs` on them (remember to include the `ngSanitize` module) (e.g.
 * `<div ng-bind-html="'<b>implicitly trusted</b>'"></div>`) just works.
 *
 * Additionally, `a[href]` and `img[src]` automatically sanitize their URLs and do not pass them
 * through {@link ng.$sce#getTrusted $sce.getTrusted}.  SCE doesn't play a role here.
 *
 * The included {@link ng.$sceDelegate $sceDelegate} comes with sane defaults to allow you to load
 * templates in `ng-include` from your application's domain without having to even know about SCE.
 * It blocks loading templates from other domains or loading templates over http from an https
 * served document.  You can change these by setting your own custom {@link
 * ng.$sceDelegateProvider#resourceUrlWhitelist whitelists} and {@link
 * ng.$sceDelegateProvider#resourceUrlBlacklist blacklists} for matching such URLs.
 *
 * This significantly reduces the overhead.  It is far easier to pay the small overhead and have an
 * application that's secure and can be audited to verify that with much more ease than bolting
 * security onto an application later.
 *
 * <a name="contexts"></a>
 * ## What trusted context types are supported?
 *
 * | Context             | Notes          |
 * |---------------------|----------------|
 * | `$sce.HTML`         | For HTML that's safe to source into the application.  The {@link ng.directive:ngBindHtml ngBindHtml} directive uses this context for bindings. If an unsafe value is encountered and the {@link ngSanitize $sanitize} module is present this will sanitize the value instead of throwing an error. |
 * | `$sce.CSS`          | For CSS that's safe to source into the application.  Currently unused.  Feel free to use it in your own directives. |
 * | `$sce.URL`          | For URLs that are safe to follow as links.  Currently unused (`<a href=` and `<img src=` sanitize their urls and don't constitute an SCE context. |
 * | `$sce.RESOURCE_URL` | For URLs that are not only safe to follow as links, but whose contents are also safe to include in your application.  Examples include `ng-include`, `src` / `ngSrc` bindings for tags other than `IMG` (e.g. `IFRAME`, `OBJECT`, etc.)  <br><br>Note that `$sce.RESOURCE_URL` makes a stronger statement about the URL than `$sce.URL` does and therefore contexts requiring values trusted for `$sce.RESOURCE_URL` can be used anywhere that values trusted for `$sce.URL` are required. |
 * | `$sce.JS`           | For JavaScript that is safe to execute in your application's context.  Currently unused.  Feel free to use it in your own directives. |
 *
 * ## Format of items in {@link ng.$sceDelegateProvider#resourceUrlWhitelist resourceUrlWhitelist}/{@link ng.$sceDelegateProvider#resourceUrlBlacklist Blacklist} <a name="resourceUrlPatternItem"></a>
 *
 *  Each element in these arrays must be one of the following:
 *
 *  - **'self'**
 *    - The special **string**, `'self'`, can be used to match against all URLs of the **same
 *      domain** as the application document using the **same protocol**.
 *  - **String** (except the special value `'self'`)
 *    - The string is matched against the full *normalized / absolute URL* of the resource
 *      being tested (substring matches are not good enough.)
 *    - There are exactly **two wildcard sequences** - `*` and `**`.  All other characters
 *      match themselves.
 *    - `*`: matches zero or more occurrences of any character other than one of the following 6
 *      characters: '`:`', '`/`', '`.`', '`?`', '`&`' and ';'.  It's a useful wildcard for use
 *      in a whitelist.
 *    - `**`: matches zero or more occurrences of *any* character.  As such, it's not
 *      not appropriate to use in for a scheme, domain, etc. as it would match too much.  (e.g.
 *      http://**.example.com/ would match http://evil.com/?ignore=.example.com/ and that might
 *      not have been the intention.)  Its usage at the very end of the path is ok.  (e.g.
 *      http://foo.example.com/templates/**).
 *  - **RegExp** (*see caveat below*)
 *    - *Caveat*:  While regular expressions are powerful and offer great flexibility,  their syntax
 *      (and all the inevitable escaping) makes them *harder to maintain*.  It's easy to
 *      accidentally introduce a bug when one updates a complex expression (imho, all regexes should
 *      have good test coverage.).  For instance, the use of `.` in the regex is correct only in a
 *      small number of cases.  A `.` character in the regex used when matching the scheme or a
 *      subdomain could be matched against a `:` or literal `.` that was likely not intended.   It
 *      is highly recommended to use the string patterns and only fall back to regular expressions
 *      if they as a last resort.
 *    - The regular expression must be an instance of RegExp (i.e. not a string.)  It is
 *      matched against the **entire** *normalized / absolute URL* of the resource being tested
 *      (even when the RegExp did not have the `^` and `$` codes.)  In addition, any flags
 *      present on the RegExp (such as multiline, global, ignoreCase) are ignored.
 *    - If you are generating your JavaScript from some other templating engine (not
 *      recommended, e.g. in issue [#4006](https://github.com/angular/angular.js/issues/4006)),
 *      remember to escape your regular expression (and be aware that you might need more than
 *      one level of escaping depending on your templating engine and the way you interpolated
 *      the value.)  Do make use of your platform's escaping mechanism as it might be good
 *      enough before coding your own.  e.g. Ruby has
 *      [Regexp.escape(str)](http://www.ruby-doc.org/core-2.0.0/Regexp.html#method-c-escape)
 *      and Python has [re.escape](http://docs.python.org/library/re.html#re.escape).
 *      Javascript lacks a similar built in function for escaping.  Take a look at Google
 *      Closure library's [goog.string.regExpEscape(s)](
 *      http://docs.closure-library.googlecode.com/git/closure_goog_string_string.js.source.html#line962).
 *
 * Refer {@link ng.$sceDelegateProvider $sceDelegateProvider} for an example.
 *
 * ## Show me an example using SCE.
 *
 * <example module="mySceApp" deps="angular-sanitize.js">
 * <file name="index.html">
 *   <div ng-controller="AppController as myCtrl">
 *     <i ng-bind-html="myCtrl.explicitlyTrustedHtml" id="explicitlyTrustedHtml"></i><br><br>
 *     <b>User comments</b><br>
 *     By default, HTML that isn't explicitly trusted (e.g. Alice's comment) is sanitized when
 *     $sanitize is available.  If $sanitize isn't available, this results in an error instead of an
 *     exploit.
 *     <div class="well">
 *       <div ng-repeat="userComment in myCtrl.userComments">
 *         <b>{{userComment.name}}</b>:
 *         <span ng-bind-html="userComment.htmlComment" class="htmlComment"></span>
 *         <br>
 *       </div>
 *     </div>
 *   </div>
 * </file>
 *
 * <file name="script.js">
 *   angular.module('mySceApp', ['ngSanitize'])
 *     .controller('AppController', ['$http', '$templateCache', '$sce',
 *       function($http, $templateCache, $sce) {
 *         var self = this;
 *         $http.get("test_data.json", {cache: $templateCache}).success(function(userComments) {
 *           self.userComments = userComments;
 *         });
 *         self.explicitlyTrustedHtml = $sce.trustAsHtml(
 *             '<span onmouseover="this.textContent=&quot;Explicitly trusted HTML bypasses ' +
 *             'sanitization.&quot;">Hover over this text.</span>');
 *       }]);
 * </file>
 *
 * <file name="test_data.json">
 * [
 *   { "name": "Alice",
 *     "htmlComment":
 *         "<span onmouseover='this.textContent=\"PWN3D!\"'>Is <i>anyone</i> reading this?</span>"
 *   },
 *   { "name": "Bob",
 *     "htmlComment": "<i>Yes!</i>  Am I the only other one?"
 *   }
 * ]
 * </file>
 *
 * <file name="protractor.js" type="protractor">
 *   describe('SCE doc demo', function() {
 *     it('should sanitize untrusted values', function() {
 *       expect(element.all(by.css('.htmlComment')).first().getInnerHtml())
 *           .toBe('<span>Is <i>anyone</i> reading this?</span>');
 *     });
 *
 *     it('should NOT sanitize explicitly trusted values', function() {
 *       expect(element(by.id('explicitlyTrustedHtml')).getInnerHtml()).toBe(
 *           '<span onmouseover="this.textContent=&quot;Explicitly trusted HTML bypasses ' +
 *           'sanitization.&quot;">Hover over this text.</span>');
 *     });
 *   });
 * </file>
 * </example>
 *
 *
 *
 * ## Can I disable SCE completely?
 *
 * Yes, you can.  However, this is strongly discouraged.  SCE gives you a lot of security benefits
 * for little coding overhead.  It will be much harder to take an SCE disabled application and
 * either secure it on your own or enable SCE at a later stage.  It might make sense to disable SCE
 * for cases where you have a lot of existing code that was written before SCE was introduced and
 * you're migrating them a module at a time.
 *
 * That said, here's how you can completely disable SCE:
 *
 * ```
 * angular.module('myAppWithSceDisabledmyApp', []).config(function($sceProvider) {
 *   // Completely disable SCE.  For demonstration purposes only!
 *   // Do not use in new projects.
 *   $sceProvider.enabled(false);
 * });
 * ```
 *
 */
/* jshint maxlen: 100 */
function $b(){var a=!0;/**
   * @ngdoc method
   * @name $sceProvider#enabled
   * @kind function
   *
   * @param {boolean=} value If provided, then enables/disables SCE.
   * @return {boolean} true if SCE is enabled, false otherwise.
   *
   * @description
   * Enables/disables SCE and returns the current value.
   */
this.enabled=function(b){return arguments.length&&(a=!!b),a},/* Design notes on the default implementation for SCE.
   *
   * The API contract for the SCE delegate
   * -------------------------------------
   * The SCE delegate object must provide the following 3 methods:
   *
   * - trustAs(contextEnum, value)
   *     This method is used to tell the SCE service that the provided value is OK to use in the
   *     contexts specified by contextEnum.  It must return an object that will be accepted by
   *     getTrusted() for a compatible contextEnum and return this value.
   *
   * - valueOf(value)
   *     For values that were not produced by trustAs(), return them as is.  For values that were
   *     produced by trustAs(), return the corresponding input value to trustAs.  Basically, if
   *     trustAs is wrapping the given values into some type, this operation unwraps it when given
   *     such a value.
   *
   * - getTrusted(contextEnum, value)
   *     This function should return the a value that is safe to use in the context specified by
   *     contextEnum or throw and exception otherwise.
   *
   * NOTE: This contract deliberately does NOT state that values returned by trustAs() must be
   * opaque or wrapped in some holder object.  That happens to be an implementation detail.  For
   * instance, an implementation could maintain a registry of all trusted objects by context.  In
   * such a case, trustAs() would return the same object that was passed in.  getTrusted() would
   * return the same object passed in if it was found in the registry under a compatible context or
   * throw an exception otherwise.  An implementation might only wrap values some of the time based
   * on some criteria.  getTrusted() might return a value and not throw an exception for special
   * constants or objects even if not wrapped.  All such implementations fulfill this contract.
   *
   *
   * A note on the inheritance model for SCE contexts
   * ------------------------------------------------
   * I've used inheritance and made RESOURCE_URL wrapped types a subtype of URL wrapped types.  This
   * is purely an implementation details.
   *
   * The contract is simply this:
   *
   *     getTrusted($sce.RESOURCE_URL, value) succeeding implies that getTrusted($sce.URL, value)
   *     will also succeed.
   *
   * Inheritance happens to capture this in a natural way.  In some future, we
   * may not use inheritance anymore.  That is OK because no code outside of
   * sce.js and sceSpecs.js would need to be aware of this detail.
   */
this.$get=["$parse","$sceDelegate",function(b,c){
// Prereq: Ensure that we're not running in IE<11 quirks mode.  In that mode, IE < 11 allow
// the "expression(javascript expression)" syntax which is insecure.
if(a&&8>_c)throw te("iequirks","Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");var d=L(ue);/**
     * @ngdoc method
     * @name $sce#isEnabled
     * @kind function
     *
     * @return {Boolean} true if SCE is enabled, false otherwise.  If you want to set the value, you
     * have to do it at module config time on {@link ng.$sceProvider $sceProvider}.
     *
     * @description
     * Returns a boolean indicating if SCE is enabled.
     */
d.isEnabled=function(){return a},d.trustAs=c.trustAs,d.getTrusted=c.getTrusted,d.valueOf=c.valueOf,a||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=p),/**
     * @ngdoc method
     * @name $sce#parseAs
     *
     * @description
     * Converts Angular {@link guide/expression expression} into a function.  This is like {@link
     * ng.$parse $parse} and is identical when the expression is a literal constant.  Otherwise, it
     * wraps the expression in a call to {@link ng.$sce#getTrusted $sce.getTrusted(*type*,
     * *result*)}
     *
     * @param {string} type The kind of SCE context in which this result will be used.
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
d.parseAs=function(a,c){var e=b(c);return e.literal&&e.constant?e:b(c,function(b){return d.getTrusted(a,b)})};/**
     * @ngdoc method
     * @name $sce#trustAs
     *
     * @description
     * Delegates to {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs`}.  As such,
     * returns an object that is trusted by angular for use in specified strict contextual
     * escaping contexts (such as ng-bind-html, ng-include, any src attribute
     * interpolation, any dom event binding attribute interpolation such as for onclick,  etc.)
     * that uses the provided value.  See * {@link ng.$sce $sce} for enabling strict contextual
     * escaping.
     *
     * @param {string} type The kind of context in which this value is safe for use.  e.g. url,
     *   resource_url, html, js and css.
     * @param {*} value The value that that should be considered trusted/safe.
     * @returns {*} A value that can be used to stand in for the provided `value` in places
     * where Angular expects a $sce.trustAs() return value.
     */
/**
     * @ngdoc method
     * @name $sce#trustAsHtml
     *
     * @description
     * Shorthand method.  `$sce.trustAsHtml(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.HTML, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedHtml
     *     $sce.getTrustedHtml(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the
     *     return value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */
/**
     * @ngdoc method
     * @name $sce#trustAsUrl
     *
     * @description
     * Shorthand method.  `$sce.trustAsUrl(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.URL, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedUrl
     *     $sce.getTrustedUrl(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the
     *     return value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */
/**
     * @ngdoc method
     * @name $sce#trustAsResourceUrl
     *
     * @description
     * Shorthand method.  `$sce.trustAsResourceUrl(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.RESOURCE_URL, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedResourceUrl
     *     $sce.getTrustedResourceUrl(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the return
     *     value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */
/**
     * @ngdoc method
     * @name $sce#trustAsJs
     *
     * @description
     * Shorthand method.  `$sce.trustAsJs(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.JS, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedJs
     *     $sce.getTrustedJs(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the
     *     return value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */
/**
     * @ngdoc method
     * @name $sce#getTrusted
     *
     * @description
     * Delegates to {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted`}.  As such,
     * takes the result of a {@link ng.$sce#trustAs `$sce.trustAs`}() call and returns the
     * originally supplied value if the queried context type is a supertype of the created type.
     * If this condition isn't satisfied, throws an exception.
     *
     * @param {string} type The kind of context in which this value is to be used.
     * @param {*} maybeTrusted The result of a prior {@link ng.$sce#trustAs `$sce.trustAs`}
     *                         call.
     * @returns {*} The value the was originally provided to
     *              {@link ng.$sce#trustAs `$sce.trustAs`} if valid in this context.
     *              Otherwise, throws an exception.
     */
/**
     * @ngdoc method
     * @name $sce#getTrustedHtml
     *
     * @description
     * Shorthand method.  `$sce.getTrustedHtml(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.HTML, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.HTML, value)`
     */
/**
     * @ngdoc method
     * @name $sce#getTrustedCss
     *
     * @description
     * Shorthand method.  `$sce.getTrustedCss(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.CSS, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.CSS, value)`
     */
/**
     * @ngdoc method
     * @name $sce#getTrustedUrl
     *
     * @description
     * Shorthand method.  `$sce.getTrustedUrl(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.URL, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.URL, value)`
     */
/**
     * @ngdoc method
     * @name $sce#getTrustedResourceUrl
     *
     * @description
     * Shorthand method.  `$sce.getTrustedResourceUrl(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.RESOURCE_URL, value)`}
     *
     * @param {*} value The value to pass to `$sceDelegate.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.RESOURCE_URL, value)`
     */
/**
     * @ngdoc method
     * @name $sce#getTrustedJs
     *
     * @description
     * Shorthand method.  `$sce.getTrustedJs(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.JS, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.JS, value)`
     */
/**
     * @ngdoc method
     * @name $sce#parseAsHtml
     *
     * @description
     * Shorthand method.  `$sce.parseAsHtml(expression string)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.HTML, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
/**
     * @ngdoc method
     * @name $sce#parseAsCss
     *
     * @description
     * Shorthand method.  `$sce.parseAsCss(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.CSS, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
/**
     * @ngdoc method
     * @name $sce#parseAsUrl
     *
     * @description
     * Shorthand method.  `$sce.parseAsUrl(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.URL, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
/**
     * @ngdoc method
     * @name $sce#parseAsResourceUrl
     *
     * @description
     * Shorthand method.  `$sce.parseAsResourceUrl(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.RESOURCE_URL, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
/**
     * @ngdoc method
     * @name $sce#parseAsJs
     *
     * @description
     * Shorthand method.  `$sce.parseAsJs(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.JS, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
// Shorthand delegations.
var e=d.parseAs,g=d.getTrusted,h=d.trustAs;return f(ue,function(a,b){var c=Wc(b);d[pa("parse_as_"+c)]=function(b){return e(a,b)},d[pa("get_trusted_"+c)]=function(b){return g(a,b)},d[pa("trust_as_"+c)]=function(b){return h(a,b)}}),d}]}/**
 * !!! This is an undocumented "private" service !!!
 *
 * @name $sniffer
 * @requires $window
 * @requires $document
 *
 * @property {boolean} history Does the browser support html5 history api ?
 * @property {boolean} transitions Does the browser support CSS transition events ?
 * @property {boolean} animations Does the browser support CSS animation events ?
 *
 * @description
 * This is very simple implementation of testing browser's features.
 */
function _b(){this.$get=["$window","$document",function(a,b){var c,d,e={},f=m((/android (\d+)/.exec(Wc((a.navigator||{}).userAgent))||[])[1]),g=/Boxee/i.test((a.navigator||{}).userAgent),h=b[0]||{},i=/^(Moz|webkit|ms)(?=[A-Z])/,j=h.body&&h.body.style,k=!1,l=!1;if(j){for(var n in j)if(d=i.exec(n)){c=d[0],c=c.substr(0,1).toUpperCase()+c.substr(1);break}c||(c="WebkitOpacity"in j&&"webkit"),k=!!("transition"in j||c+"Transition"in j),l=!!("animation"in j||c+"Animation"in j),!f||k&&l||(k=u(h.body.style.webkitTransition),l=u(h.body.style.webkitAnimation))}return{
// Android has history.pushState, but it does not update location correctly
// so let's not use the history API at all.
// http://code.google.com/p/android/issues/detail?id=17471
// https://github.com/angular/angular.js/issues/904
// older webkit browser (533.9) on Boxee box has exactly the same problem as Android has
// so let's not use the history API also
// We are purposefully using `!(android < 4)` to cover the case when `android` is undefined
// jshint -W018
history:!(!a.history||!a.history.pushState||4>f||g),
// jshint +W018
hasEvent:function(a){
// IE9 implements 'input' event it's so fubared that we rather pretend that it doesn't have
// it. In particular the event is not fired when backspace or delete key are pressed or
// when cut operation is performed.
// IE10+ implements 'input' event but it erroneously fires under various situations,
// e.g. when placeholder changes, or a form is focused.
if("input"===a&&11>=_c)return!1;if(r(e[a])){var b=h.createElement("div");e[a]="on"+a in b}return e[a]},csp:od(),vendorPrefix:c,transitions:k,animations:l,android:f}}]}/**
 * @ngdoc service
 * @name $templateRequest
 *
 * @description
 * The `$templateRequest` service downloads the provided template using `$http` and, upon success,
 * stores the contents inside of `$templateCache`. If the HTTP request fails or the response data
 * of the HTTP request is empty, a `$compile` error will be thrown (the exception can be thwarted
 * by setting the 2nd parameter of the function to true).
 *
 * @param {string} tpl The HTTP request template URL
 * @param {boolean=} ignoreRequestError Whether or not to ignore the exception when the request fails or the template is empty
 *
 * @return {Promise} the HTTP Promise for the given.
 *
 * @property {number} totalPendingRequests total amount of pending template requests being downloaded.
 */
function ac(){this.$get=["$templateCache","$http","$q",function(a,b,c){function d(e,f){function g(a){if(!f)throw Wd("tpload","Failed to load template: {0}",e);return c.reject(a)}d.totalPendingRequests++;var h=b.defaults&&b.defaults.transformResponse;ld(h)?h=h.filter(function(a){return a!==eb}):h===eb&&(h=null);var i={cache:a,transformResponse:h};return b.get(e,i)["finally"](function(){d.totalPendingRequests--}).then(function(a){return a.data},g)}return d.totalPendingRequests=0,d}]}function bc(){this.$get=["$rootScope","$browser","$location",function(a,b,c){/**
     * @name $testability
     *
     * @description
     * The private $$testability service provides a collection of methods for use when debugging
     * or by automated test and debugging tools.
     */
var d={};/**
     * @name $$testability#findBindings
     *
     * @description
     * Returns an array of elements that are bound (via ng-bind or {{}})
     * to expressions matching the input.
     *
     * @param {Element} element The element root to search from.
     * @param {string} expression The binding expression to match.
     * @param {boolean} opt_exactMatch If true, only returns exact matches
     *     for the expression. Filters and whitespace are ignored.
     */
/**
     * @name $$testability#findModels
     *
     * @description
     * Returns an array of elements that are two-way found via ng-model to
     * expressions matching the input.
     *
     * @param {Element} element The element root to search from.
     * @param {string} expression The model expression to match.
     * @param {boolean} opt_exactMatch If true, only returns exact matches
     *     for the expression.
     */
/**
     * @name $$testability#getLocation
     *
     * @description
     * Shortcut for getting the location in a browser agnostic way. Returns
     *     the path, search, and hash. (e.g. /path?a=b#hash)
     */
/**
     * @name $$testability#setLocation
     *
     * @description
     * Shortcut for navigating to a location without doing a full page reload.
     *
     * @param {string} url The location url (path, search and hash,
     *     e.g. /path?a=b#hash) to go to.
     */
/**
     * @name $$testability#whenStable
     *
     * @description
     * Calls the callback when $timeout and $http requests are completed.
     *
     * @param {function} callback
     */
return d.findBindings=function(a,b,c){var d=a.getElementsByClassName("ng-binding"),e=[];return f(d,function(a){var d=id.element(a).data("$binding");d&&f(d,function(d){if(c){var f=new RegExp("(^|\\s)"+nd(b)+"(\\s|\\||$)");f.test(d)&&e.push(a)}else-1!=d.indexOf(b)&&e.push(a)})}),e},d.findModels=function(a,b,c){for(var d=["ng-","data-ng-","ng\\:"],e=0;e<d.length;++e){var f=c?"=":"*=",g="["+d[e]+"model"+f+'"'+b+'"]',h=a.querySelectorAll(g);if(h.length)return h}},d.getLocation=function(){return c.url()},d.setLocation=function(b){b!==c.url()&&(c.url(b),a.$digest())},d.whenStable=function(a){b.notifyWhenNoOutstandingRequests(a)},d}]}function cc(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,c,d,e){/**
      * @ngdoc service
      * @name $timeout
      *
      * @description
      * Angular's wrapper for `window.setTimeout`. The `fn` function is wrapped into a try/catch
      * block and delegates any exceptions to
      * {@link ng.$exceptionHandler $exceptionHandler} service.
      *
      * The return value of registering a timeout function is a promise, which will be resolved when
      * the timeout is reached and the timeout function is executed.
      *
      * To cancel a timeout request, call `$timeout.cancel(promise)`.
      *
      * In tests you can use {@link ngMock.$timeout `$timeout.flush()`} to
      * synchronously flush the queue of deferred functions.
      *
      * @param {function()} fn A function, whose execution should be delayed.
      * @param {number=} [delay=0] Delay in milliseconds.
      * @param {boolean=} [invokeApply=true] If set to `false` skips model dirty checking, otherwise
      *   will invoke `fn` within the {@link ng.$rootScope.Scope#$apply $apply} block.
      * @returns {Promise} Promise that will be resolved when the timeout is reached. The value this
      *   promise will be resolved with is the return value of the `fn` function.
      *
      */
function f(f,h,i){var j,k=s(i)&&!i,l=(k?d:c).defer(),m=l.promise;return j=b.defer(function(){try{l.resolve(f())}catch(b){l.reject(b),e(b)}finally{delete g[m.$$timeoutId]}k||a.$apply()},h),m.$$timeoutId=j,g[j]=l,m}var g={};/**
      * @ngdoc method
      * @name $timeout#cancel
      *
      * @description
      * Cancels a task associated with the `promise`. As a result of this, the promise will be
      * resolved with a rejection.
      *
      * @param {Promise=} promise Promise returned by the `$timeout` function.
      * @returns {boolean} Returns `true` if the task hasn't executed yet and was successfully
      *   canceled.
      */
return f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1},f}]}/**
 *
 * Implementation Notes for non-IE browsers
 * ----------------------------------------
 * Assigning a URL to the href property of an anchor DOM node, even one attached to the DOM,
 * results both in the normalizing and parsing of the URL.  Normalizing means that a relative
 * URL will be resolved into an absolute URL in the context of the application document.
 * Parsing means that the anchor node's host, hostname, protocol, port, pathname and related
 * properties are all populated to reflect the normalized URL.  This approach has wide
 * compatibility - Safari 1+, Mozilla 1+, Opera 7+,e etc.  See
 * http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
 *
 * Implementation Notes for IE
 * ---------------------------
 * IE >= 8 and <= 10 normalizes the URL when assigned to the anchor node similar to the other
 * browsers.  However, the parsed components will not be set if the URL assigned did not specify
 * them.  (e.g. if you assign a.href = "foo", then a.protocol, a.host, etc. will be empty.)  We
 * work around that by performing the parsing in a 2nd step by taking a previously normalized
 * URL (e.g. by assigning to a.href) and assigning it a.href again.  This correctly populates the
 * properties such as protocol, hostname, port, etc.
 *
 * IE7 does not normalize the URL when assigned to an anchor node.  (Apparently, it does, if one
 * uses the inner HTML approach to assign the URL as part of an HTML snippet -
 * http://stackoverflow.com/a/472729)  However, setting img[src] does normalize the URL.
 * Unfortunately, setting img[src] to something like "javascript:foo" on IE throws an exception.
 * Since the primary usage for normalizing URLs is to sanitize such URLs, we can't use that
 * method and IE < 8 is unsupported.
 *
 * References:
 *   http://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
 *   http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
 *   http://url.spec.whatwg.org/#urlutils
 *   https://github.com/angular/angular.js/pull/2902
 *   http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
 *
 * @kind function
 * @param {string} url The URL to be parsed.
 * @description Normalizes and parses a URL.
 * @returns {object} Returns the normalized URL as a dictionary.
 *
 *   | member name   | Description    |
 *   |---------------|----------------|
 *   | href          | A normalized version of the provided URL if it was not an absolute URL |
 *   | protocol      | The protocol including the trailing colon                              |
 *   | host          | The host and port (if the port is non-default) of the normalizedUrl    |
 *   | search        | The search params, minus the question mark                             |
 *   | hash          | The hash string, minus the hash symbol
 *   | hostname      | The hostname
 *   | port          | The port, without ":"
 *   | pathname      | The pathname, beginning with "/"
 *
 */
function dc(a){var b=a;
// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
// Normalize before parse.  Refer Implementation Notes on why this is
// done in two steps on IE.
return _c&&(ve.setAttribute("href",b),b=ve.href),ve.setAttribute("href",b),{href:ve.href,protocol:ve.protocol?ve.protocol.replace(/:$/,""):"",host:ve.host,search:ve.search?ve.search.replace(/^\?/,""):"",hash:ve.hash?ve.hash.replace(/^#/,""):"",hostname:ve.hostname,port:ve.port,pathname:"/"===ve.pathname.charAt(0)?ve.pathname:"/"+ve.pathname}}/**
 * Parse a request URL and determine whether this is a same-origin request as the application document.
 *
 * @param {string|object} requestUrl The url of the request as a string that will be resolved
 * or a parsed URL object.
 * @returns {boolean} Whether the request is for the same origin as the application document.
 */
function ec(a){var b=u(a)?dc(a):a;return b.protocol===we.protocol&&b.host===we.host}/**
 * @ngdoc service
 * @name $window
 *
 * @description
 * A reference to the browser's `window` object. While `window`
 * is globally available in JavaScript, it causes testability problems, because
 * it is a global variable. In angular we always refer to it through the
 * `$window` service, so it may be overridden, removed or mocked for testing.
 *
 * Expressions, like the one defined for the `ngClick` directive in the example
 * below, are evaluated with respect to the current scope.  Therefore, there is
 * no risk of inadvertently coding in a dependency on a global value in such an
 * expression.
 *
 * @example
   <example module="windowExample">
     <file name="index.html">
       <script>
         angular.module('windowExample', [])
           .controller('ExampleController', ['$scope', '$window', function($scope, $window) {
             $scope.greeting = 'Hello, World!';
             $scope.doGreeting = function(greeting) {
               $window.alert(greeting);
             };
           }]);
       </script>
       <div ng-controller="ExampleController">
         <input type="text" ng-model="greeting" />
         <button ng-click="doGreeting(greeting)">ALERT</button>
       </div>
     </file>
     <file name="protractor.js" type="protractor">
      it('should display the greeting in the input box', function() {
       element(by.model('greeting')).sendKeys('Hello, E2E Tests');
       // If we click the button it will block the test runner
       // element(':button').click();
      });
     </file>
   </example>
 */
function fc(){this.$get=q(a)}function gc(a){/**
   * @ngdoc method
   * @name $filterProvider#register
   * @param {string|Object} name Name of the filter function, or an object map of filters where
   *    the keys are the filter names and the values are the filter factories.
   * @returns {Object} Registered filter instance, or if a map of filters was provided then a map
   *    of the registered filter instances.
   */
function b(d,e){if(t(d)){var g={};return f(d,function(a,c){g[c]=b(c,a)}),g}return a.factory(d+c,e)}var c="Filter";this.register=b,this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}],
////////////////////////////////////////
/* global
    currencyFilter: false,
    dateFilter: false,
    filterFilter: false,
    jsonFilter: false,
    limitToFilter: false,
    lowercaseFilter: false,
    numberFilter: false,
    orderByFilter: false,
    uppercaseFilter: false,
  */
b("currency",kc),b("date",xc),b("filter",hc),b("json",yc),b("limitTo",zc),b("lowercase",Be),b("number",lc),b("orderBy",Ac),b("uppercase",Ce)}/**
 * @ngdoc filter
 * @name filter
 * @kind function
 *
 * @description
 * Selects a subset of items from `array` and returns it as a new array.
 *
 * @param {Array} array The source array.
 * @param {string|Object|function()} expression The predicate to be used for selecting items from
 *   `array`.
 *
 *   Can be one of:
 *
 *   - `string`: The string is used for matching against the contents of the `array`. All strings or
 *     objects with string properties in `array` that match this string will be returned. This also
 *     applies to nested object properties.
 *     The predicate can be negated by prefixing the string with `!`.
 *
 *   - `Object`: A pattern object can be used to filter specific properties on objects contained
 *     by `array`. For example `{name:"M", phone:"1"}` predicate will return an array of items
 *     which have property `name` containing "M" and property `phone` containing "1". A special
 *     property name `$` can be used (as in `{$:"text"}`) to accept a match against any
 *     property of the object or its nested object properties. That's equivalent to the simple
 *     substring match with a `string` as described above. The predicate can be negated by prefixing
 *     the string with `!`.
 *     For example `{name: "!M"}` predicate will return an array of items which have property `name`
 *     not containing "M".
 *
 *     Note that a named property will match properties on the same level only, while the special
 *     `$` property will match properties on the same level or deeper. E.g. an array item like
 *     `{name: {first: 'John', last: 'Doe'}}` will **not** be matched by `{name: 'John'}`, but
 *     **will** be matched by `{$: 'John'}`.
 *
 *   - `function(value, index)`: A predicate function can be used to write arbitrary filters. The
 *     function is called for each element of `array`. The final result is an array of those
 *     elements that the predicate returned true for.
 *
 * @param {function(actual, expected)|true|undefined} comparator Comparator which is used in
 *     determining if the expected value (from the filter expression) and actual value (from
 *     the object in the array) should be considered a match.
 *
 *   Can be one of:
 *
 *   - `function(actual, expected)`:
 *     The function will be given the object value and the predicate value to compare and
 *     should return true if both values should be considered equal.
 *
 *   - `true`: A shorthand for `function(actual, expected) { return angular.equals(actual, expected)}`.
 *     This is essentially strict comparison of expected and actual.
 *
 *   - `false|undefined`: A short hand for a function which will look for a substring match in case
 *     insensitive way.
 *
 * @example
   <example>
     <file name="index.html">
       <div ng-init="friends = [{name:'John', phone:'555-1276'},
                                {name:'Mary', phone:'800-BIG-MARY'},
                                {name:'Mike', phone:'555-4321'},
                                {name:'Adam', phone:'555-5678'},
                                {name:'Julie', phone:'555-8765'},
                                {name:'Juliette', phone:'555-5678'}]"></div>

       Search: <input ng-model="searchText">
       <table id="searchTextResults">
         <tr><th>Name</th><th>Phone</th></tr>
         <tr ng-repeat="friend in friends | filter:searchText">
           <td>{{friend.name}}</td>
           <td>{{friend.phone}}</td>
         </tr>
       </table>
       <hr>
       Any: <input ng-model="search.$"> <br>
       Name only <input ng-model="search.name"><br>
       Phone only <input ng-model="search.phone"><br>
       Equality <input type="checkbox" ng-model="strict"><br>
       <table id="searchObjResults">
         <tr><th>Name</th><th>Phone</th></tr>
         <tr ng-repeat="friendObj in friends | filter:search:strict">
           <td>{{friendObj.name}}</td>
           <td>{{friendObj.phone}}</td>
         </tr>
       </table>
     </file>
     <file name="protractor.js" type="protractor">
       var expectFriendNames = function(expectedNames, key) {
         element.all(by.repeater(key + ' in friends').column(key + '.name')).then(function(arr) {
           arr.forEach(function(wd, i) {
             expect(wd.getText()).toMatch(expectedNames[i]);
           });
         });
       };

       it('should search across all fields when filtering with a string', function() {
         var searchText = element(by.model('searchText'));
         searchText.clear();
         searchText.sendKeys('m');
         expectFriendNames(['Mary', 'Mike', 'Adam'], 'friend');

         searchText.clear();
         searchText.sendKeys('76');
         expectFriendNames(['John', 'Julie'], 'friend');
       });

       it('should search in specific fields when filtering with a predicate object', function() {
         var searchAny = element(by.model('search.$'));
         searchAny.clear();
         searchAny.sendKeys('i');
         expectFriendNames(['Mary', 'Mike', 'Julie', 'Juliette'], 'friendObj');
       });
       it('should use a equal comparison when comparator is true', function() {
         var searchName = element(by.model('search.name'));
         var strict = element(by.model('strict'));
         searchName.clear();
         searchName.sendKeys('Julie');
         strict.click();
         expectFriendNames(['Julie'], 'friendObj');
       });
     </file>
   </example>
 */
function hc(){return function(a,b,c){if(!ld(a))return a;var d,e;switch(typeof b){case"function":d=b;break;case"boolean":case"number":case"string":e=!0;
//jshint -W086
case"object":
//jshint +W086
d=ic(b,c,e);break;default:return a}return a.filter(d)}}
// Helper functions for `filterFilter`
function ic(a,b,c){var d,e=t(a)&&"$"in a;return b===!0?b=M:x(b)||(b=function(a,b){return t(a)||t(b)?!1:(a=Wc(""+a),b=Wc(""+b),-1!==a.indexOf(b))}),d=function(d){return e&&!t(d)?jc(d,a.$,b,!1):jc(d,a,b,c)}}function jc(a,b,c,d,e){var f=null!==a?typeof a:"null",g=null!==b?typeof b:"null";if("string"===g&&"!"===b.charAt(0))return!jc(a,b.substring(1),c,d);if(ld(a))
// In case `actual` is an array, consider it a match
// if ANY of it's items matches `expected`
return a.some(function(a){return jc(a,b,c,d)});switch(f){case"object":var h;if(d){for(h in a)if("$"!==h.charAt(0)&&jc(a[h],b,c,!0))return!0;return e?!1:jc(a,b,c,!1)}if("object"===g){for(h in b){var i=b[h];if(!x(i)&&!r(i)){var j="$"===h,k=j?a:a[h];if(!jc(k,i,c,j,j))return!1}}return!0}return c(a,b);case"function":return!1;default:return c(a,b)}}function kc(a){var b=a.NUMBER_FORMATS;return function(a,c,d){
// if null or undefined pass it through
return r(c)&&(c=b.CURRENCY_SYM),r(d)&&(d=b.PATTERNS[1].maxFrac),null==a?a:mc(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,d).replace(/\u00A4/g,c)}}function lc(a){var b=a.NUMBER_FORMATS;return function(a,c){
// if null or undefined pass it through
return null==a?a:mc(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function mc(a,b,c,d,e){if(!isFinite(a)||t(a))return"";var f=0>a;a=Math.abs(a);var g=a+"",h="",i=[],j=!1;if(-1!==g.indexOf("e")){var k=g.match(/([\d\.]+)e(-?)(\d+)/);k&&"-"==k[2]&&k[3]>e+1?a=0:(h=g,j=!0)}if(j)e>0&&1>a&&(h=a.toFixed(e),a=parseFloat(h));else{var l=(g.split(xe)[1]||"").length;
// determine fractionSize if it is not specified
r(e)&&(e=Math.min(Math.max(b.minFrac,l),b.maxFrac)),
// safely round numbers in JS without hitting imprecisions of floating-point arithmetics
// inspired by:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
a=+(Math.round(+(a.toString()+"e"+e)).toString()+"e"+-e);var m=(""+a).split(xe),n=m[0];m=m[1]||"";var o,p=0,q=b.lgSize,s=b.gSize;if(n.length>=q+s)for(p=n.length-q,o=0;p>o;o++)(p-o)%s===0&&0!==o&&(h+=c),h+=n.charAt(o);for(o=p;o<n.length;o++)(n.length-o)%q===0&&0!==o&&(h+=c),h+=n.charAt(o);
// format fraction part.
for(;m.length<e;)m+="0";e&&"0"!==e&&(h+=d+m.substr(0,e))}return 0===a&&(f=!1),i.push(f?b.negPre:b.posPre,h,f?b.negSuf:b.posSuf),i.join("")}function nc(a,b,c){var d="";for(0>a&&(d="-",a=-a),a=""+a;a.length<b;)a="0"+a;return c&&(a=a.substr(a.length-b)),d+a}function oc(a,b,c,d){return c=c||0,function(e){var f=e["get"+a]();return(c>0||f>-c)&&(f+=c),0===f&&-12==c&&(f=12),nc(f,b,d)}}function pc(a,b){return function(c,d){var e=c["get"+a](),f=Yc(b?"SHORT"+a:a);return d[f][e]}}function qc(a){var b=-1*a.getTimezoneOffset(),c=b>=0?"+":"";return c+=nc(Math[b>0?"floor":"ceil"](b/60),2)+nc(Math.abs(b%60),2)}function rc(a){
// 0 = index of January
var b=new Date(a,0,1).getDay();
// 4 = index of Thursday (+1 to account for 1st = 5)
// 11 = index of *next* Thursday (+1 account for 1st = 12)
return new Date(a,0,(4>=b?5:12)-b)}function sc(a){
// 4 = index of Thursday
return new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))}function tc(a){return function(b){var c=rc(b.getFullYear()),d=sc(b),e=+d-+c,f=1+Math.round(e/6048e5);// 6.048e8 ms per week
return nc(f,a)}}function uc(a,b){return a.getHours()<12?b.AMPMS[0]:b.AMPMS[1]}function vc(a,b){return a.getFullYear()<=0?b.ERAS[0]:b.ERAS[1]}function wc(a,b){return a.getFullYear()<=0?b.ERANAMES[0]:b.ERANAMES[1]}function xc(a){
// 1        2       3         4          5          6          7          8  9     10      11
function b(a){var b;if(b=a.match(c)){var d=new Date(0),e=0,f=0,g=b[8]?d.setUTCFullYear:d.setFullYear,h=b[8]?d.setUTCHours:d.setHours;b[9]&&(e=m(b[9]+b[10]),f=m(b[9]+b[11])),g.call(d,m(b[1]),m(b[2])-1,m(b[3]));var i=m(b[4]||0)-e,j=m(b[5]||0)-f,k=m(b[6]||0),l=Math.round(1e3*parseFloat("0."+(b[7]||0)));return h.call(d,i,j,k,l),d}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,d,e){var g,h,i="",j=[];if(d=d||"mediumDate",d=a.DATETIME_FORMATS[d]||d,u(c)&&(c=Ae.test(c)?m(c):b(c)),v(c)&&(c=new Date(c)),!w(c))return c;for(;d;)h=ze.exec(d),h?(j=N(j,h,1),d=j.pop()):(j.push(d),d=null);return e&&"UTC"===e&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset())),f(j,function(b){g=ye[b],i+=g?g(c,a.DATETIME_FORMATS):b.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),i}}/**
 * @ngdoc filter
 * @name json
 * @kind function
 *
 * @description
 *   Allows you to convert a JavaScript object into JSON string.
 *
 *   This filter is mostly useful for debugging. When using the double curly {{value}} notation
 *   the binding is automatically converted to JSON.
 *
 * @param {*} object Any JavaScript object (including arrays and primitive types) to filter.
 * @param {number=} spacing The number of spaces to use per indentation, defaults to 2.
 * @returns {string} JSON string.
 *
 *
 * @example
   <example>
     <file name="index.html">
       <pre id="default-spacing">{{ {'name':'value'} | json }}</pre>
       <pre id="custom-spacing">{{ {'name':'value'} | json:4 }}</pre>
     </file>
     <file name="protractor.js" type="protractor">
       it('should jsonify filtered objects', function() {
         expect(element(by.id('default-spacing')).getText()).toMatch(/\{\n  "name": ?"value"\n}/);
         expect(element(by.id('custom-spacing')).getText()).toMatch(/\{\n    "name": ?"value"\n}/);
       });
     </file>
   </example>
 *
 */
function yc(){return function(a,b){return r(b)&&(b=2),R(a,b)}}/**
 * @ngdoc filter
 * @name limitTo
 * @kind function
 *
 * @description
 * Creates a new array or string containing only a specified number of elements. The elements
 * are taken from either the beginning or the end of the source array, string or number, as specified by
 * the value and sign (positive or negative) of `limit`. If a number is used as input, it is
 * converted to a string.
 *
 * @param {Array|string|number} input Source array, string or number to be limited.
 * @param {string|number} limit The length of the returned array or string. If the `limit` number
 *     is positive, `limit` number of items from the beginning of the source array/string are copied.
 *     If the number is negative, `limit` number  of items from the end of the source array/string
 *     are copied. The `limit` will be trimmed if it exceeds `array.length`
 * @returns {Array|string} A new sub-array or substring of length `limit` or less if input array
 *     had less than `limit` elements.
 *
 * @example
   <example module="limitToExample">
     <file name="index.html">
       <script>
         angular.module('limitToExample', [])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.numbers = [1,2,3,4,5,6,7,8,9];
             $scope.letters = "abcdefghi";
             $scope.longNumber = 2345432342;
             $scope.numLimit = 3;
             $scope.letterLimit = 3;
             $scope.longNumberLimit = 3;
           }]);
       </script>
       <div ng-controller="ExampleController">
         Limit {{numbers}} to: <input type="number" step="1" ng-model="numLimit">
         <p>Output numbers: {{ numbers | limitTo:numLimit }}</p>
         Limit {{letters}} to: <input type="number" step="1" ng-model="letterLimit">
         <p>Output letters: {{ letters | limitTo:letterLimit }}</p>
         Limit {{longNumber}} to: <input type="number" step="1" ng-model="longNumberLimit">
         <p>Output long number: {{ longNumber | limitTo:longNumberLimit }}</p>
       </div>
     </file>
     <file name="protractor.js" type="protractor">
       var numLimitInput = element(by.model('numLimit'));
       var letterLimitInput = element(by.model('letterLimit'));
       var longNumberLimitInput = element(by.model('longNumberLimit'));
       var limitedNumbers = element(by.binding('numbers | limitTo:numLimit'));
       var limitedLetters = element(by.binding('letters | limitTo:letterLimit'));
       var limitedLongNumber = element(by.binding('longNumber | limitTo:longNumberLimit'));

       it('should limit the number array to first three items', function() {
         expect(numLimitInput.getAttribute('value')).toBe('3');
         expect(letterLimitInput.getAttribute('value')).toBe('3');
         expect(longNumberLimitInput.getAttribute('value')).toBe('3');
         expect(limitedNumbers.getText()).toEqual('Output numbers: [1,2,3]');
         expect(limitedLetters.getText()).toEqual('Output letters: abc');
         expect(limitedLongNumber.getText()).toEqual('Output long number: 234');
       });

       // There is a bug in safari and protractor that doesn't like the minus key
       // it('should update the output when -3 is entered', function() {
       //   numLimitInput.clear();
       //   numLimitInput.sendKeys('-3');
       //   letterLimitInput.clear();
       //   letterLimitInput.sendKeys('-3');
       //   longNumberLimitInput.clear();
       //   longNumberLimitInput.sendKeys('-3');
       //   expect(limitedNumbers.getText()).toEqual('Output numbers: [7,8,9]');
       //   expect(limitedLetters.getText()).toEqual('Output letters: ghi');
       //   expect(limitedLongNumber.getText()).toEqual('Output long number: 342');
       // });

       it('should not exceed the maximum size of input array', function() {
         numLimitInput.clear();
         numLimitInput.sendKeys('100');
         letterLimitInput.clear();
         letterLimitInput.sendKeys('100');
         longNumberLimitInput.clear();
         longNumberLimitInput.sendKeys('100');
         expect(limitedNumbers.getText()).toEqual('Output numbers: [1,2,3,4,5,6,7,8,9]');
         expect(limitedLetters.getText()).toEqual('Output letters: abcdefghi');
         expect(limitedLongNumber.getText()).toEqual('Output long number: 2345432342');
       });
     </file>
   </example>
*/
function zc(){return function(a,b){
//NaN check on limit
return v(a)&&(a=a.toString()),ld(a)||u(a)?(b=Math.abs(Number(b))===1/0?Number(b):m(b),b?b>0?a.slice(0,b):a.slice(b):u(a)?"":[]):a}}function Ac(a){return function(b,c,d){function f(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0}function g(a,b){return b?function(b,c){return a(c,b)}:a}function h(a){switch(typeof a){case"number":/* falls through */
case"boolean":/* falls through */
case"string":return!0;default:return!1}}function i(a){return null===a?"null":"function"==typeof a.valueOf&&(a=a.valueOf(),h(a))?a:"function"==typeof a.toString&&(a=a.toString(),h(a))?a:""}function j(a,b){var c=typeof a,d=typeof b;return c===d&&"object"===c&&(a=i(a),b=i(b)),c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:b>a?-1:1):d>c?-1:1}return e(b)?(c=ld(c)?c:[c],0===c.length&&(c=["+"]),c=c.map(function(b){var c=!1,d=b||p;if(u(b)){if(("+"==b.charAt(0)||"-"==b.charAt(0))&&(c="-"==b.charAt(0),b=b.substring(1)),""===b)
// Effectively no predicate was passed so we compare identity
return g(j,c);if(d=a(b),d.constant){var e=d();return g(function(a,b){return j(a[e],b[e])},c)}}return g(function(a,b){return j(d(a),d(b))},c)}),dd.call(b).sort(g(f,d))):b}}function Bc(a){return x(a)&&(a={link:a}),a.restrict=a.restrict||"AC",q(a)}function Cc(a,b){a.$name=b}function Dc(a,b,d,e,g){var h=this,i=[],j=h.$$parentForm=a.parent().controller("form")||Fe;
// init state
h.$error={},h.$$success={},h.$pending=c,h.$name=g(b.name||b.ngForm||"")(d),h.$dirty=!1,h.$pristine=!0,h.$valid=!0,h.$invalid=!1,h.$submitted=!1,j.$addControl(h),/**
   * @ngdoc method
   * @name form.FormController#$rollbackViewValue
   *
   * @description
   * Rollback all form controls pending updates to the `$modelValue`.
   *
   * Updates may be pending by a debounced event or because the input is waiting for a some future
   * event defined in `ng-model-options`. This method is typically needed by the reset button of
   * a form that uses `ng-model-options` to pend updates.
   */
h.$rollbackViewValue=function(){f(i,function(a){a.$rollbackViewValue()})},/**
   * @ngdoc method
   * @name form.FormController#$commitViewValue
   *
   * @description
   * Commit all form controls pending updates to the `$modelValue`.
   *
   * Updates may be pending by a debounced event or because the input is waiting for a some future
   * event defined in `ng-model-options`. This method is rarely needed as `NgModelController`
   * usually handles calling this in response to input events.
   */
h.$commitViewValue=function(){f(i,function(a){a.$commitViewValue()})},/**
   * @ngdoc method
   * @name form.FormController#$addControl
   *
   * @description
   * Register a control with the form.
   *
   * Input elements using ngModelController do this automatically when they are linked.
   */
h.$addControl=function(a){
// Breaking change - before, inputs whose name was "hasOwnProperty" were quietly ignored
// and not added to the scope.  Now we throw an error.
ga(a.$name,"input"),i.push(a),a.$name&&(h[a.$name]=a)},
// Private API: rename a form control
h.$$renameControl=function(a,b){var c=a.$name;h[c]===a&&delete h[c],h[b]=a,a.$name=b},/**
   * @ngdoc method
   * @name form.FormController#$removeControl
   *
   * @description
   * Deregister a control from the form.
   *
   * Input elements using ngModelController do this automatically when they are destroyed.
   */
h.$removeControl=function(a){a.$name&&h[a.$name]===a&&delete h[a.$name],f(h.$pending,function(b,c){h.$setValidity(c,null,a)}),f(h.$error,function(b,c){h.$setValidity(c,null,a)}),f(h.$$success,function(b,c){h.$setValidity(c,null,a)}),J(i,a)},/**
   * @ngdoc method
   * @name form.FormController#$setValidity
   *
   * @description
   * Sets the validity of a form control.
   *
   * This method will also propagate to parent forms.
   */
Sc({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];if(d){var e=d.indexOf(c);-1===e&&d.push(c)}else a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(J(d,c),0===d.length&&delete a[b])},parentForm:j,$animate:e}),/**
   * @ngdoc method
   * @name form.FormController#$setDirty
   *
   * @description
   * Sets the form to a dirty state.
   *
   * This method can be called to add the 'ng-dirty' class and set the form to a dirty
   * state (ng-dirty class). This method will also propagate to parent forms.
   */
h.$setDirty=function(){e.removeClass(a,of),e.addClass(a,pf),h.$dirty=!0,h.$pristine=!1,j.$setDirty()},/**
   * @ngdoc method
   * @name form.FormController#$setPristine
   *
   * @description
   * Sets the form to its pristine state.
   *
   * This method can be called to remove the 'ng-dirty' class and set the form to its pristine
   * state (ng-pristine class). This method will also propagate to all the controls contained
   * in this form.
   *
   * Setting a form back to a pristine state is often useful when we want to 'reuse' a form after
   * saving or resetting it.
   */
h.$setPristine=function(){e.setClass(a,of,pf+" "+Ge),h.$dirty=!1,h.$pristine=!0,h.$submitted=!1,f(i,function(a){a.$setPristine()})},/**
   * @ngdoc method
   * @name form.FormController#$setUntouched
   *
   * @description
   * Sets the form to its untouched state.
   *
   * This method can be called to remove the 'ng-touched' class and set the form controls to their
   * untouched state (ng-untouched class).
   *
   * Setting a form controls back to their untouched state is often useful when setting the form
   * back to its pristine state.
   */
h.$setUntouched=function(){f(i,function(a){a.$setUntouched()})},/**
   * @ngdoc method
   * @name form.FormController#$setSubmitted
   *
   * @description
   * Sets the form to its submitted state.
   */
h.$setSubmitted=function(){e.addClass(a,Ge),h.$submitted=!0,j.$setSubmitted()}}function Ec(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function Fc(a,b,c,d,e,f){Gc(a,b,c,d,e,f),Ec(d)}function Gc(a,b,c,d,e,f){var g=Wc(b[0].type);
// In composition mode, users are still inputing intermediate text buffer,
// hold the listener until composition is done.
// More about composition events: https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent
if(!e.android){var h=!1;b.on("compositionstart",function(a){h=!0}),b.on("compositionend",function(){h=!1,i()})}var i=function(a){if(j&&(f.defer.cancel(j),j=null),!h){var e=b.val(),i=a&&a.type;
// By default we will trim the value
// If the attribute ng-trim exists we will avoid trimming
// If input type is 'password', the value is never trimmed
"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=md(e)),
// If a control is suffering from bad input (due to native validators), browsers discard its
// value, so it may be necessary to revalidate (by calling $setViewValue again) even if the
// control's value is the same empty value twice in a row.
(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,i)}};
// if the browser does support "input" event, we are fine - except on IE9 which doesn't fire the
// input event on backspace, delete or cut
if(e.hasEvent("input"))b.on("input",i);else{var j,k=function(a,b,c){j||(j=f.defer(function(){j=null,b&&b.value===c||i(a)}))};b.on("keydown",function(a){var b=a.keyCode;
// ignore
//    command            modifiers                   arrows
91===b||b>15&&19>b||b>=37&&40>=b||k(a,this,this.value)}),
// if user modifies input value using context menu in IE, we need "paste" and "cut" events to catch it
e.hasEvent("paste")&&b.on("paste cut",k)}
// if user paste into input using mouse on older browser
// or form autocomplete on newer browser, we need "change" event to catch it
b.on("change",i),d.$render=function(){b.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function Hc(a,b){if(w(a))return a;if(u(a)){Qe.lastIndex=0;var c=Qe.exec(a);if(c){var d=+c[1],e=+c[2],f=0,g=0,h=0,i=0,j=rc(d),k=7*(e-1);return b&&(f=b.getHours(),g=b.getMinutes(),h=b.getSeconds(),i=b.getMilliseconds()),new Date(d,0,j.getDate()+k,f,g,h,i)}}return NaN}function Ic(a,b){return function(c,d){var e,g;if(w(c))return c;if(u(c)){if(
// When a date is JSON'ified to wraps itself inside of an extra
// set of double quotes. This makes the date parsing code unable
// to match the date string and parse it as a date.
'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1)),Ke.test(c))return new Date(c);if(a.lastIndex=0,e=a.exec(c))return e.shift(),g=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1e3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},f(e,function(a,c){c<b.length&&(g[b[c]]=+a)}),new Date(g.yyyy,g.MM-1,g.dd,g.HH,g.mm,g.ss||0,1e3*g.sss||0)}return NaN}}function Jc(a,b,d,e){return function(f,g,h,i,j,k,l){function m(a){
// Invalid Date: getTime() returns NaN
return a&&!(a.getTime&&a.getTime()!==a.getTime())}function n(a){return s(a)?w(a)?a:d(a):c}Kc(f,g,h,i),Gc(f,g,h,i,j,k);var o,p=i&&i.$options&&i.$options.timezone;if(i.$$parserName=a,i.$parsers.push(function(a){if(i.$isEmpty(a))return null;if(b.test(a)){
// Note: We cannot read ctrl.$modelValue, as there might be a different
// parser/formatter in the processing chain so that the model
// contains some different data format!
var e=d(a,o);return"UTC"===p&&e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e}return c}),i.$formatters.push(function(a){if(a&&!w(a))throw tf("datefmt","Expected `{0}` to be a date",a);if(m(a)){if(o=a,o&&"UTC"===p){var b=6e4*o.getTimezoneOffset();o=new Date(o.getTime()+b)}return l("date")(a,e,p)}return o=null,""}),s(h.min)||h.ngMin){var q;i.$validators.min=function(a){return!m(a)||r(q)||d(a)>=q},h.$observe("min",function(a){q=n(a),i.$validate()})}if(s(h.max)||h.ngMax){var t;i.$validators.max=function(a){return!m(a)||r(t)||d(a)<=t},h.$observe("max",function(a){t=n(a),i.$validate()})}}}function Kc(a,b,d,e){var f=b[0],g=e.$$hasNativeValidators=t(f.validity);g&&e.$parsers.push(function(a){var d=b.prop(Vc)||{};
// Detect bug in FF35 for input[email] (https://bugzilla.mozilla.org/show_bug.cgi?id=1064430):
// - also sets validity.badInput (should only be validity.typeMismatch).
// - see http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#e-mail-state-(type=email)
// - can ignore this case as we can still read out the erroneous email...
return d.badInput&&!d.typeMismatch?c:a})}function Lc(a,b,d,e,f,g){if(Kc(a,b,d,e),Gc(a,b,d,e,f,g),e.$$parserName="number",e.$parsers.push(function(a){return e.$isEmpty(a)?null:Ne.test(a)?parseFloat(a):c}),e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!v(a))throw tf("numfmt","Expected `{0}` to be a number",a);a=a.toString()}return a}),s(d.min)||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||r(h)||a>=h},d.$observe("min",function(a){s(a)&&!v(a)&&(a=parseFloat(a,10)),h=v(a)&&!isNaN(a)?a:c,
// TODO(matsko): implement validateLater to reduce number of validations
e.$validate()})}if(s(d.max)||d.ngMax){var i;e.$validators.max=function(a){return e.$isEmpty(a)||r(i)||i>=a},d.$observe("max",function(a){s(a)&&!v(a)&&(a=parseFloat(a,10)),i=v(a)&&!isNaN(a)?a:c,
// TODO(matsko): implement validateLater to reduce number of validations
e.$validate()})}}function Mc(a,b,c,d,e,f){
// Note: no badInputChecker here by purpose as `url` is only a validation
// in browsers, i.e. we can always read out input.value even if it is not valid!
Gc(a,b,c,d,e,f),Ec(d),d.$$parserName="url",d.$validators.url=function(a,b){var c=a||b;return d.$isEmpty(c)||Le.test(c)}}function Nc(a,b,c,d,e,f){
// Note: no badInputChecker here by purpose as `url` is only a validation
// in browsers, i.e. we can always read out input.value even if it is not valid!
Gc(a,b,c,d,e,f),Ec(d),d.$$parserName="email",d.$validators.email=function(a,b){var c=a||b;return d.$isEmpty(c)||Me.test(c)}}function Oc(a,b,c,d){
// make the name unique, if not defined
r(c.name)&&b.attr("name",j());var e=function(a){b[0].checked&&d.$setViewValue(c.value,a&&a.type)};b.on("click",e),d.$render=function(){var a=c.value;b[0].checked=a==d.$viewValue},c.$observe("value",d.$render)}function Pc(a,b,c,e,f){var g;if(s(e)){if(g=a(e),!g.constant)throw d("ngModel")("constexpr","Expected constant expression for `{0}`, but saw `{1}`.",c,e);return g(b)}return f}function Qc(a,b,c,d,e,f,g,h){var i=Pc(h,a,"ngTrueValue",c.ngTrueValue,!0),j=Pc(h,a,"ngFalseValue",c.ngFalseValue,!1),k=function(a){d.$setViewValue(b[0].checked,a&&a.type)};b.on("click",k),d.$render=function(){b[0].checked=d.$viewValue},
// Override the standard `$isEmpty` because the $viewValue of an empty checkbox is always set to `false`
// This is because of the parser below, which compares the `$modelValue` with `trueValue` to convert
// it to a boolean.
d.$isEmpty=function(a){return a===!1},d.$formatters.push(function(a){return M(a,i)}),d.$parsers.push(function(a){return a?i:j})}function Rc(a,b){return a="ngClass"+a,["$animate",function(c){function d(a,b){var c=[];a:for(var d=0;d<a.length;d++){for(var e=a[d],f=0;f<b.length;f++)if(e==b[f])continue a;c.push(e)}return c}function e(a){if(ld(a))return a;if(u(a))return a.split(" ");if(t(a)){var b=[];return f(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b}return a}return{restrict:"AC",link:function(g,h,i){function j(a){var b=l(a,1);i.$addClass(b)}function k(a){var b=l(a,-1);i.$removeClass(b)}function l(a,b){var c=h.data("$classCounts")||{},d=[];return f(a,function(a){(b>0||c[a])&&(c[a]=(c[a]||0)+b,c[a]===+(b>0)&&d.push(a))}),h.data("$classCounts",c),d.join(" ")}function m(a,b){var e=d(b,a),f=d(a,b);e=l(e,1),f=l(f,-1),e&&e.length&&c.addClass(h,e),f&&f.length&&c.removeClass(h,f)}function n(a){if(b===!0||g.$index%2===b){var c=e(a||[]);if(o){if(!M(a,o)){var d=e(o);m(d,c)}}else j(c)}o=L(a)}var o;g.$watch(i[a],n,!0),i.$observe("class",function(b){n(g.$eval(i[a]))}),"ngClass"!==a&&g.$watch("$index",function(c,d){
// jshint bitwise: false
var f=1&c;if(f!==(1&d)){var h=e(g.$eval(i[a]));f===b?j(h):k(h)}})}}}]}
// helper methods
function Sc(a){function b(a,b,i){b===c?d("$pending",a,i):e("$pending",a,i),E(b)?b?(l(h.$error,a,i),k(h.$$success,a,i)):(k(h.$error,a,i),l(h.$$success,a,i)):(l(h.$error,a,i),l(h.$$success,a,i)),h.$pending?(f(sf,!0),h.$valid=h.$invalid=c,g("",null)):(f(sf,!1),h.$valid=Tc(h.$error),h.$invalid=!h.$valid,g("",h.$valid));
// re-read the state as the set/unset methods could have
// combined state in ctrl.$error[validationError] (used for forms),
// where setting/unsetting only increments/decrements the value,
// and does not replace it.
var j;j=h.$pending&&h.$pending[a]?c:h.$error[a]?!1:h.$$success[a]?!0:null,g(a,j),m.$setValidity(a,j,h)}function d(a,b,c){h[a]||(h[a]={}),k(h[a],b,c)}function e(a,b,d){h[a]&&l(h[a],b,d),Tc(h[a])&&(h[a]=c)}function f(a,b){b&&!j[a]?(n.addClass(i,a),j[a]=!0):!b&&j[a]&&(n.removeClass(i,a),j[a]=!1)}function g(a,b){a=a?"-"+ca(a,"-"):"",f(mf+a,b===!0),f(nf+a,b===!1)}var h=a.ctrl,i=a.$element,j={},k=a.set,l=a.unset,m=a.parentForm,n=a.$animate;j[nf]=!(j[mf]=i.hasClass(mf)),h.$setValidity=b}function Tc(a){if(a)for(var b in a)return!1;return!0}/* We need to tell jshint what variables are being exported */
/* global angular: true,
  msie: true,
  jqLite: true,
  jQuery: true,
  slice: true,
  splice: true,
  push: true,
  toString: true,
  ngMinErr: true,
  angularModule: true,
  uid: true,
  REGEX_STRING_REGEXP: true,
  VALIDITY_STATE_PROPERTY: true,

  lowercase: true,
  uppercase: true,
  manualLowercase: true,
  manualUppercase: true,
  nodeName_: true,
  isArrayLike: true,
  forEach: true,
  sortedKeys: true,
  forEachSorted: true,
  reverseParams: true,
  nextUid: true,
  setHashKey: true,
  extend: true,
  int: true,
  inherit: true,
  noop: true,
  identity: true,
  valueFn: true,
  isUndefined: true,
  isDefined: true,
  isObject: true,
  isString: true,
  isNumber: true,
  isDate: true,
  isArray: true,
  isFunction: true,
  isRegExp: true,
  isWindow: true,
  isScope: true,
  isFile: true,
  isFormData: true,
  isBlob: true,
  isBoolean: true,
  isPromiseLike: true,
  trim: true,
  escapeForRegexp: true,
  isElement: true,
  makeMap: true,
  includes: true,
  arrayRemove: true,
  copy: true,
  shallowCopy: true,
  equals: true,
  csp: true,
  concat: true,
  sliceArgs: true,
  bind: true,
  toJsonReplacer: true,
  toJson: true,
  fromJson: true,
  startingTag: true,
  tryDecodeURIComponent: true,
  parseKeyValue: true,
  toKeyValue: true,
  encodeUriSegment: true,
  encodeUriQuery: true,
  angularInit: true,
  bootstrap: true,
  getTestability: true,
  snake_case: true,
  bindJQuery: true,
  assertArg: true,
  assertArgFn: true,
  assertNotHasOwnProperty: true,
  getter: true,
  getBlockNodes: true,
  hasOwnProperty: true,
  createMap: true,

  NODE_TYPE_ELEMENT: true,
  NODE_TYPE_TEXT: true,
  NODE_TYPE_COMMENT: true,
  NODE_TYPE_DOCUMENT: true,
  NODE_TYPE_DOCUMENT_FRAGMENT: true,
*/
////////////////////////////////////
/**
 * @ngdoc module
 * @name ng
 * @module ng
 * @description
 *
 * # ng (core module)
 * The ng module is loaded by default when an AngularJS application is started. The module itself
 * contains the essential components for an AngularJS application to function. The table below
 * lists a high level breakdown of each of the services/factories, filters, directives and testing
 * components available within this core module.
 *
 * <div doc-module-components="ng"></div>
 */
var Uc=/^\/(.+)\/([a-z]*)$/,Vc="validity",Wc=function(a){return u(a)?a.toLowerCase():a},Xc=Object.prototype.hasOwnProperty,Yc=function(a){return u(a)?a.toUpperCase():a},Zc=function(a){/* jshint bitwise: false */
return u(a)?a.replace(/[A-Z]/g,function(a){return String.fromCharCode(32|a.charCodeAt(0))}):a},$c=function(a){/* jshint bitwise: false */
return u(a)?a.replace(/[a-z]/g,function(a){return String.fromCharCode(-33&a.charCodeAt(0))}):a};
// String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
// locale, for this reason we need to detect this case and redefine lowercase/uppercase methods
// with correct but slower alternatives.
"i"!=="I".toLowerCase()&&(Wc=Zc,Yc=$c);var _c,// holds major version number for IE, or NaN if UA is not IE.
ad,// delay binding since jQuery could be loaded after us.
bd,cd,// delay binding
dd=[].slice,ed=[].splice,fd=[].push,gd=Object.prototype.toString,hd=d("ng"),/** @name angular */
id=a.angular||(a.angular={}),jd=0;/**
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
_c=b.documentMode,o.$inject=[],p.$inject=[];/**
 * @ngdoc function
 * @name angular.isArray
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is an `Array`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Array`.
 */
var kd,ld=Array.isArray,md=function(a){return u(a)?a.trim():a},nd=function(a){return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},od=function(){if(s(od.isActive_))return od.isActive_;var a=!(!b.querySelector("[ng-csp]")&&!b.querySelector("[data-ng-csp]"));if(!a)try{/* jshint -W031, -W054 */
new Function("")}catch(c){a=!0}return od.isActive_=a},pd=["ng-","data-ng-","ng:","x-ng-"],qd=/[A-Z]/g,rd=!1,sd=1,td=3,ud=8,vd=9,wd=11,xd={full:"1.3.15",// all of these placeholder strings will be replaced by grunt's
major:1,// package task
minor:3,dot:15,codeName:"locality-filtration"};/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables likes document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* global JQLitePrototype: true,
  addEventListenerFn: true,
  removeEventListenerFn: true,
  BOOLEAN_ATTR: true,
  ALIASED_ATTR: true,
*/
//////////////////////////////////
//JQLite
//////////////////////////////////
/**
 * @ngdoc function
 * @name angular.element
 * @module ng
 * @kind function
 *
 * @description
 * Wraps a raw DOM element or HTML string as a [jQuery](http://jquery.com) element.
 *
 * If jQuery is available, `angular.element` is an alias for the
 * [jQuery](http://api.jquery.com/jQuery/) function. If jQuery is not available, `angular.element`
 * delegates to Angular's built-in subset of jQuery, called "jQuery lite" or "jqLite."
 *
 * <div class="alert alert-success">jqLite is a tiny, API-compatible subset of jQuery that allows
 * Angular to manipulate the DOM in a cross-browser compatible way. **jqLite** implements only the most
 * commonly needed functionality with the goal of having a very small footprint.</div>
 *
 * To use jQuery, simply load it before `DOMContentLoaded` event fired.
 *
 * <div class="alert">**Note:** all element references in Angular are always wrapped with jQuery or
 * jqLite; they are never raw DOM references.</div>
 *
 * ## Angular's jqLite
 * jqLite provides only the following jQuery methods:
 *
 * - [`addClass()`](http://api.jquery.com/addClass/)
 * - [`after()`](http://api.jquery.com/after/)
 * - [`append()`](http://api.jquery.com/append/)
 * - [`attr()`](http://api.jquery.com/attr/) - Does not support functions as parameters
 * - [`bind()`](http://api.jquery.com/bind/) - Does not support namespaces, selectors or eventData
 * - [`children()`](http://api.jquery.com/children/) - Does not support selectors
 * - [`clone()`](http://api.jquery.com/clone/)
 * - [`contents()`](http://api.jquery.com/contents/)
 * - [`css()`](http://api.jquery.com/css/) - Only retrieves inline-styles, does not call `getComputedStyle()`
 * - [`data()`](http://api.jquery.com/data/)
 * - [`detach()`](http://api.jquery.com/detach/)
 * - [`empty()`](http://api.jquery.com/empty/)
 * - [`eq()`](http://api.jquery.com/eq/)
 * - [`find()`](http://api.jquery.com/find/) - Limited to lookups by tag name
 * - [`hasClass()`](http://api.jquery.com/hasClass/)
 * - [`html()`](http://api.jquery.com/html/)
 * - [`next()`](http://api.jquery.com/next/) - Does not support selectors
 * - [`on()`](http://api.jquery.com/on/) - Does not support namespaces, selectors or eventData
 * - [`off()`](http://api.jquery.com/off/) - Does not support namespaces or selectors
 * - [`one()`](http://api.jquery.com/one/) - Does not support namespaces or selectors
 * - [`parent()`](http://api.jquery.com/parent/) - Does not support selectors
 * - [`prepend()`](http://api.jquery.com/prepend/)
 * - [`prop()`](http://api.jquery.com/prop/)
 * - [`ready()`](http://api.jquery.com/ready/)
 * - [`remove()`](http://api.jquery.com/remove/)
 * - [`removeAttr()`](http://api.jquery.com/removeAttr/)
 * - [`removeClass()`](http://api.jquery.com/removeClass/)
 * - [`removeData()`](http://api.jquery.com/removeData/)
 * - [`replaceWith()`](http://api.jquery.com/replaceWith/)
 * - [`text()`](http://api.jquery.com/text/)
 * - [`toggleClass()`](http://api.jquery.com/toggleClass/)
 * - [`triggerHandler()`](http://api.jquery.com/triggerHandler/) - Passes a dummy event object to handlers.
 * - [`unbind()`](http://api.jquery.com/unbind/) - Does not support namespaces
 * - [`val()`](http://api.jquery.com/val/)
 * - [`wrap()`](http://api.jquery.com/wrap/)
 *
 * ## jQuery/jqLite Extras
 * Angular also provides the following additional methods and events to both jQuery and jqLite:
 *
 * ### Events
 * - `$destroy` - AngularJS intercepts all jqLite/jQuery's DOM destruction apis and fires this event
 *    on all DOM nodes being removed.  This can be used to clean up any 3rd party bindings to the DOM
 *    element before it is removed.
 *
 * ### Methods
 * - `controller(name)` - retrieves the controller of the current element or its parent. By default
 *   retrieves controller associated with the `ngController` directive. If `name` is provided as
 *   camelCase directive name, then the controller for this directive will be retrieved (e.g.
 *   `'ngModel'`).
 * - `injector()` - retrieves the injector of the current element or its parent.
 * - `scope()` - retrieves the {@link ng.$rootScope.Scope scope} of the current
 *   element or its parent. Requires {@link guide/production#disabling-debug-data Debug Data} to
 *   be enabled.
 * - `isolateScope()` - retrieves an isolate {@link ng.$rootScope.Scope scope} if one is attached directly to the
 *   current element. This getter should be used only on elements that contain a directive which starts a new isolate
 *   scope. Calling `scope()` on this element always returns the original non-isolate scope.
 *   Requires {@link guide/production#disabling-debug-data Debug Data} to be enabled.
 * - `inheritedData()` - same as `data()`, but walks up the DOM until a value is found or the top
 *   parent element is reached.
 *
 * @param {string|DOMElement} element HTML string or DOMElement to be wrapped into jQuery.
 * @returns {Object} jQuery object.
 */
ua.expando="ng339";var yd=ua.cache={},zd=1,Ad=function(a,b,c){a.addEventListener(b,c,!1)},Bd=function(a,b,c){a.removeEventListener(b,c,!1)};/*
 * !!! This is an undocumented "private" function !!!
 */
ua._data=function(a){
//jQuery always returns an object on cache miss
return this.cache[a[this.expando]]||{}};var Cd=/([\:\-\_]+(.))/g,Dd=/^moz([A-Z])/,Ed={mouseleave:"mouseout",mouseenter:"mouseover"},Fd=d("jqLite"),Gd=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Hd=/<|&#?\w+;/,Id=/<([\w:]+)/,Jd=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Kd={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Kd.optgroup=Kd.option,Kd.tbody=Kd.tfoot=Kd.colgroup=Kd.caption=Kd.thead,Kd.th=Kd.td;
//////////////////////////////////////////
// Functions which are declared directly.
//////////////////////////////////////////
var Ld=ua.prototype={ready:function(c){function d(){e||(e=!0,c())}var e=!1;
// check if document is already loaded
"complete"===b.readyState?setTimeout(d):(this.on("DOMContentLoaded",d),// works for modern browsers and IE9
// we can not use jqLite since we are not done loading and jQuery could be loaded later.
// jshint -W064
ua(a).on("load",d))},toString:function(){var a=[];return f(this,function(b){a.push(""+b)}),"["+a.join(", ")+"]"},eq:function(a){return ad(a>=0?this[a]:this[this.length+a])},length:0,push:fd,sort:[].sort,splice:[].splice},Md={};f("multiple,selected,checked,disabled,readOnly,required,open".split(","),function(a){Md[Wc(a)]=a});var Nd={};f("input,select,option,textarea,button,form,details".split(","),function(a){Nd[a]=!0});var Od={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};f({data:Aa,removeData:ya},function(a,b){ua[b]=a}),f({data:Aa,inheritedData:Ga,scope:function(a){
// Can't use jqLiteData here directly so we stay compatible with jQuery!
return ad.data(a,"$scope")||Ga(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){
// Can't use jqLiteData here directly so we stay compatible with jQuery!
return ad.data(a,"$isolateScope")||ad.data(a,"$isolateScopeNoTemplate")},controller:Fa,injector:function(a){return Ga(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:Ba,css:function(a,b,c){return b=pa(b),s(c)?void(a.style[b]=c):a.style[b]},attr:function(a,b,d){var e=Wc(b);if(Md[e]){if(!s(d))return a[b]||(a.attributes.getNamedItem(b)||o).specified?e:c;d?(a[b]=!0,a.setAttribute(b,e)):(a[b]=!1,a.removeAttribute(e))}else if(s(d))a.setAttribute(b,d);else if(a.getAttribute){
// the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
// some elements (e.g. Document) don't have get attribute, so return undefined
var f=a.getAttribute(b,2);
// normalize non-existing attributes to undefined (as jQuery)
return null===f?c:f}},prop:function(a,b,c){return s(c)?void(a[b]=c):a[b]},text:function(){function a(a,b){if(r(b)){var c=a.nodeType;return c===sd||c===td?a.textContent:""}a.textContent=b}return a.$dv="",a}(),val:function(a,b){if(r(b)){if(a.multiple&&"select"===I(a)){var c=[];return f(a.options,function(a){a.selected&&c.push(a.value||a.text)}),0===c.length?null:c}return a.value}a.value=b},html:function(a,b){return r(b)?a.innerHTML:(wa(a,!0),void(a.innerHTML=b))},empty:Ha},function(a,b){/**
   * Properties: writes return selection, reads return first value
   */
ua.prototype[b]=function(b,d){var e,f,g=this.length;
// jqLiteHasClass has only two arguments, but is a getter-only fn, so we need to special-case it
// in a way that survives minification.
// jqLiteEmpty takes no arguments but is a setter.
if(a!==Ha&&(2==a.length&&a!==Ba&&a!==Fa?b:d)===c){if(t(b)){
// we are a write, but the object properties are the key/values
for(e=0;g>e;e++)if(a===Aa)
// data() takes the whole object in jQuery
a(this[e],b);else for(f in b)a(this[e],f,b[f]);
// return self for chaining
return this}for(var h=a.$dv,i=h===c?Math.min(g,1):g,j=0;i>j;j++){var k=a(this[j],b,d);h=h?h+k:k}return h}
// we are a write, so apply to all children
for(e=0;g>e;e++)a(this[e],b,d);
// return self for chaining
return this}}),
//////////////////////////////////////////
// Functions iterating traversal.
// These functions chain results into a single
// selector.
//////////////////////////////////////////
f({removeData:ya,on:function Uf(a,b,c,d){if(s(d))throw Fd("onargs","jqLite#on() does not support the `selector` or `eventData` parameters");
// Do not add event handlers to non-elements because they will not be cleaned up.
if(ra(a)){var e=za(a,!0),f=e.events,g=e.handle;g||(g=e.handle=Ma(a,f));for(
// http://jsperf.com/string-indexof-vs-split
var h=b.indexOf(" ")>=0?b.split(" "):[b],i=h.length;i--;){b=h[i];var j=f[b];j||(f[b]=[],"mouseenter"===b||"mouseleave"===b?
// Refer to jQuery's implementation of mouseenter & mouseleave
// Read about mouseenter and mouseleave:
// http://www.quirksmode.org/js/events_mouse.html#link8
Uf(a,Ed[b],function(a){var c=this,d=a.relatedTarget;
// For mousenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
(!d||d!==c&&!c.contains(d))&&g(a,b)}):"$destroy"!==b&&Ad(a,b,g),j=f[b]),j.push(c)}}},off:xa,one:function(a,b,c){a=ad(a),
//add the listener twice so that when it is called
//you can remove the original function and still be
//able to call element.off(ev, fn) normally
a.on(b,function d(){a.off(b,c),a.off(b,d)}),a.on(b,c)},replaceWith:function(a,b){var c,d=a.parentNode;wa(a),f(new ua(b),function(b){c?d.insertBefore(b,c.nextSibling):d.replaceChild(b,a),c=b})},children:function(a){var b=[];return f(a.childNodes,function(a){a.nodeType===sd&&b.push(a)}),b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var c=a.nodeType;if(c===sd||c===wd){b=new ua(b);for(var d=0,e=b.length;e>d;d++){var f=b[d];a.appendChild(f)}}},prepend:function(a,b){if(a.nodeType===sd){var c=a.firstChild;f(new ua(b),function(b){a.insertBefore(b,c)})}},wrap:function(a,b){b=ad(b).eq(0).clone()[0];var c=a.parentNode;c&&c.replaceChild(b,a),b.appendChild(a)},remove:Ia,detach:function(a){Ia(a,!0)},after:function(a,b){var c=a,d=a.parentNode;b=new ua(b);for(var e=0,f=b.length;f>e;e++){var g=b[e];d.insertBefore(g,c.nextSibling),c=g}},addClass:Da,removeClass:Ca,toggleClass:function(a,b,c){b&&f(b.split(" "),function(b){var d=c;r(d)&&(d=!Ba(a,b)),(d?Da:Ca)(a,b)})},parent:function(a){var b=a.parentNode;return b&&b.nodeType!==wd?b:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:va,triggerHandler:function(a,b,c){var d,e,g,h=b.type||b,i=za(a),j=i&&i.events,k=j&&j[h];k&&(
// Create a dummy event to pass to the handlers
d={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return this.defaultPrevented===!0},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return this.immediatePropagationStopped===!0},stopPropagation:o,type:h,target:a},
// If a custom event was provided then extend our dummy event with it
b.type&&(d=l(d,b)),
// Copy event handlers in case event handlers array is modified during execution.
e=L(k),g=c?[d].concat(c):[d],f(e,function(b){d.isImmediatePropagationStopped()||b.apply(a,g)}))}},function(a,b){/**
   * chaining functions
   */
ua.prototype[b]=function(b,c,d){for(var e,f=0,g=this.length;g>f;f++)r(e)?(e=a(this[f],b,c,d),s(e)&&(
// any function which returns a value needs to be wrapped
e=ad(e))):Ea(e,a(this[f],b,c,d));return s(e)?e:this},
// bind legacy bind/unbind to on/off
ua.prototype.bind=ua.prototype.on,ua.prototype.unbind=ua.prototype.off}),Pa.prototype={/**
   * Store key value pair
   * @param key key to store can be any type
   * @param value value to store can be any type
   */
put:function(a,b){this[Oa(a,this.nextUid)]=b},/**
   * @param key
   * @returns {Object} the value for the key
   */
get:function(a){return this[Oa(a,this.nextUid)]},/**
   * Remove the key/value pair
   * @param key
   */
remove:function(a){var b=this[a=Oa(a,this.nextUid)];return delete this[a],b}};/**
 * @ngdoc function
 * @module ng
 * @name angular.injector
 * @kind function
 *
 * @description
 * Creates an injector object that can be used for retrieving services as well as for
 * dependency injection (see {@link guide/di dependency injection}).
 *
 * @param {Array.<string|Function>} modules A list of module functions or their aliases. See
 *     {@link angular.module}. The `ng` module must be explicitly added.
 * @param {boolean=} [strictDi=false] Whether the injector should be in strict mode, which
 *     disallows argument name annotation inference.
 * @returns {injector} Injector object. See {@link auto.$injector $injector}.
 *
 * @example
 * Typical usage
 * ```js
 *   // create an injector
 *   var $injector = angular.injector(['ng']);
 *
 *   // use the injector to kick off your application
 *   // use the type inference to auto inject arguments, or use implicit injection
 *   $injector.invoke(function($rootScope, $compile, $document) {
 *     $compile($document)($rootScope);
 *     $rootScope.$digest();
 *   });
 * ```
 *
 * Sometimes you want to get access to the injector of a currently running Angular app
 * from outside Angular. Perhaps, you want to inject and compile some markup after the
 * application has been bootstrapped. You can do this using the extra `injector()` added
 * to JQuery/jqLite elements. See {@link angular.element}.
 *
 * *This is fairly rare but could be the case if a third party library is injecting the
 * markup.*
 *
 * In the following example a new block of HTML containing a `ng-controller`
 * directive is added to the end of the document body by JQuery. We then compile and link
 * it into the current AngularJS scope.
 *
 * ```js
 * var $div = $('<div ng-controller="MyCtrl">{{content.label}}</div>');
 * $(document.body).append($div);
 *
 * angular.element(document).injector().invoke(function($compile) {
 *   var scope = angular.element($div).scope();
 *   $compile($div)(scope);
 * });
 * ```
 */
/**
 * @ngdoc module
 * @name auto
 * @description
 *
 * Implicit module which gets automatically added to each {@link auto.$injector $injector}.
 */
var Pd=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Qd=/,/,Rd=/^\s*(_?)(\S+?)\1\s*$/,Sd=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,Td=d("$injector");Sa.$$annotate=Ra;var Ud=d("$animate"),Vd=["$provide",function(a){this.$$selectors={},/**
   * @ngdoc method
   * @name $animateProvider#register
   *
   * @description
   * Registers a new injectable animation factory function. The factory function produces the
   * animation object which contains callback functions for each event that is expected to be
   * animated.
   *
   *   * `eventFn`: `function(Element, doneFunction)` The element to animate, the `doneFunction`
   *   must be called once the element animation is complete. If a function is returned then the
   *   animation service will use this function to cancel the animation whenever a cancel event is
   *   triggered.
   *
   *
   * ```js
   *   return {
     *     eventFn : function(element, done) {
     *       //code to run the animation
     *       //once complete, then run done()
     *       return function cancellationFunction() {
     *         //code to cancel the animation
     *       }
     *     }
     *   }
   * ```
   *
   * @param {string} name The name of the animation.
   * @param {Function} factory The factory function that will be executed to return the animation
   *                           object.
   */
this.register=function(b,c){var d=b+"-animation";if(b&&"."!=b.charAt(0))throw Ud("notcsel","Expecting class selector starting with '.' got '{0}'.",b);this.$$selectors[b.substr(1)]=d,a.factory(d,c)},/**
   * @ngdoc method
   * @name $animateProvider#classNameFilter
   *
   * @description
   * Sets and/or returns the CSS class regular expression that is checked when performing
   * an animation. Upon bootstrap the classNameFilter value is not set at all and will
   * therefore enable $animate to attempt to perform an animation on any element.
   * When setting the classNameFilter value, animations will only be performed on elements
   * that successfully match the filter expression. This in turn can boost performance
   * for low-powered devices as well as applications containing a lot of structural operations.
   * @param {RegExp=} expression The className expression which will be checked against all animations
   * @return {RegExp} The current CSS className expression value. If null then there is no expression value
   */
this.classNameFilter=function(a){return 1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null),this.$$classNameFilter},this.$get=["$$q","$$asyncCallback","$rootScope",function(a,b,c){function d(b){var d,e=a.defer();return e.promise.$$cancelFn=function(){d&&d()},c.$$postDigest(function(){d=b(function(){e.resolve()})}),e.promise}function e(a,b){var c=[],d=[],e=ja();return f((a.attr("class")||"").split(/\s+/),function(a){e[a]=!0}),f(b,function(a,b){var f=e[b];
// If the most recent class manipulation (via $animate) was to remove the class, and the
// element currently has the class, the class is scheduled for removal. Otherwise, if
// the most recent class manipulation (via $animate) was to add the class, and the
// element does not currently have the class, the class is scheduled to be added.
a===!1&&f?d.push(b):a!==!0||f||c.push(b)}),c.length+d.length>0&&[c.length?c:null,d.length?d:null]}function g(a,b,c){for(var d=0,e=b.length;e>d;++d){var f=b[d];a[f]=c}}function h(){
// only serve one instance of a promise in order to save CPU cycles
return j||(j=a.defer(),b(function(){j.resolve(),j=null})),j.promise}function i(a,b){if(id.isObject(b)){var c=l(b.from||{},b.to||{});a.css(c)}}var j;/**
     *
     * @ngdoc service
     * @name $animate
     * @description The $animate service provides rudimentary DOM manipulation functions to
     * insert, remove and move elements within the DOM, as well as adding and removing classes.
     * This service is the core service used by the ngAnimate $animator service which provides
     * high-level animation hooks for CSS and JavaScript.
     *
     * $animate is available in the AngularJS core, however, the ngAnimate module must be included
     * to enable full out animation support. Otherwise, $animate will only perform simple DOM
     * manipulation operations.
     *
     * To learn more about enabling animation support, click here to visit the {@link ngAnimate
     * ngAnimate module page} as well as the {@link ngAnimate.$animate ngAnimate $animate service
     * page}.
     */
return{animate:function(a,b,c){return i(a,{from:b,to:c}),h()},/**
       *
       * @ngdoc method
       * @name $animate#enter
       * @kind function
       * @description Inserts the element into the DOM either after the `after` element or
       * as the first child within the `parent` element. When the function is called a promise
       * is returned that will be resolved at a later time.
       * @param {DOMElement} element the element which will be inserted into the DOM
       * @param {DOMElement} parent the parent element which will append the element as
       *   a child (if the after element is not present)
       * @param {DOMElement} after the sibling element which will append the element
       *   after itself
       * @param {object=} options an optional collection of styles that will be applied to the element.
       * @return {Promise} the animation callback promise
       */
enter:function(a,b,c,d){return i(a,d),c?c.after(a):b.prepend(a),h()},/**
       *
       * @ngdoc method
       * @name $animate#leave
       * @kind function
       * @description Removes the element from the DOM. When the function is called a promise
       * is returned that will be resolved at a later time.
       * @param {DOMElement} element the element which will be removed from the DOM
       * @param {object=} options an optional collection of options that will be applied to the element.
       * @return {Promise} the animation callback promise
       */
leave:function(a,b){return i(a,b),a.remove(),h()},/**
       *
       * @ngdoc method
       * @name $animate#move
       * @kind function
       * @description Moves the position of the provided element within the DOM to be placed
       * either after the `after` element or inside of the `parent` element. When the function
       * is called a promise is returned that will be resolved at a later time.
       *
       * @param {DOMElement} element the element which will be moved around within the
       *   DOM
       * @param {DOMElement} parent the parent element where the element will be
       *   inserted into (if the after element is not present)
       * @param {DOMElement} after the sibling element where the element will be
       *   positioned next to
       * @param {object=} options an optional collection of options that will be applied to the element.
       * @return {Promise} the animation callback promise
       */
move:function(a,b,c,d){
// Do not remove element before insert. Removing will cause data associated with the
// element to be dropped. Insert will implicitly do the remove.
return this.enter(a,b,c,d)},/**
       *
       * @ngdoc method
       * @name $animate#addClass
       * @kind function
       * @description Adds the provided className CSS class value to the provided element.
       * When the function is called a promise is returned that will be resolved at a later time.
       * @param {DOMElement} element the element which will have the className value
       *   added to it
       * @param {string} className the CSS class which will be added to the element
       * @param {object=} options an optional collection of options that will be applied to the element.
       * @return {Promise} the animation callback promise
       */
addClass:function(a,b,c){return this.setClass(a,b,[],c)},$$addClassImmediately:function(a,b,c){return a=ad(a),b=u(b)?b:ld(b)?b.join(" "):"",f(a,function(a){Da(a,b)}),i(a,c),h()},/**
       *
       * @ngdoc method
       * @name $animate#removeClass
       * @kind function
       * @description Removes the provided className CSS class value from the provided element.
       * When the function is called a promise is returned that will be resolved at a later time.
       * @param {DOMElement} element the element which will have the className value
       *   removed from it
       * @param {string} className the CSS class which will be removed from the element
       * @param {object=} options an optional collection of options that will be applied to the element.
       * @return {Promise} the animation callback promise
       */
removeClass:function(a,b,c){return this.setClass(a,[],b,c)},$$removeClassImmediately:function(a,b,c){return a=ad(a),b=u(b)?b:ld(b)?b.join(" "):"",f(a,function(a){Ca(a,b)}),i(a,c),h()},/**
       *
       * @ngdoc method
       * @name $animate#setClass
       * @kind function
       * @description Adds and/or removes the given CSS classes to and from the element.
       * When the function is called a promise is returned that will be resolved at a later time.
       * @param {DOMElement} element the element which will have its CSS classes changed
       *   removed from it
       * @param {string} add the CSS classes which will be added to the element
       * @param {string} remove the CSS class which will be removed from the element
       * @param {object=} options an optional collection of options that will be applied to the element.
       * @return {Promise} the animation callback promise
       */
setClass:function(a,b,c,f){var h=this,i="$$animateClasses",j=!1;a=ad(a);var k=a.data(i);k?f&&k.options&&(k.options=id.extend(k.options||{},f)):(k={classes:{},options:f},j=!0);var l=k.classes;return b=ld(b)?b:b.split(" "),c=ld(c)?c:c.split(" "),g(l,b,!0),g(l,c,!1),j&&(k.promise=d(function(b){var c=a.data(i);
// in the event that the element is removed before postDigest
// is run then the cache will be undefined and there will be
// no need anymore to add or remove and of the element classes
if(a.removeData(i),c){var d=e(a,c.classes);d&&h.$$setClassImmediately(a,d[0],d[1],c.options)}b()}),a.data(i,k)),k.promise},$$setClassImmediately:function(a,b,c,d){return b&&this.$$addClassImmediately(a,b),c&&this.$$removeClassImmediately(a,c),i(a,d),h()},enabled:o,cancel:o}}]}],Wd=d("$compile");/**
 * @ngdoc provider
 * @name $compileProvider
 *
 * @description
 */
Za.$inject=["$provide","$$sanitizeUriProvider"];var Xd=/^((?:x|data)[\:\-_])/i,Yd=d("$controller"),Zd="application/json",$d={"Content-Type":Zd+";charset=utf-8"},_d=/^\[|^\{(?!\{)/,ae={"[":/]$/,"{":/}$/},be=/^\)\]\}',?\n/,ce=d("$interpolate"),de=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,ee={http:80,https:443,ftp:21},fe=d("$location"),ge={/**
   * Are we in html5 mode?
   * @private
   */
$$html5:!1,/**
   * Has any change been replacing?
   * @private
   */
$$replace:!1,/**
   * @ngdoc method
   * @name $location#absUrl
   *
   * @description
   * This method is getter only.
   *
   * Return full url representation with all segments encoded according to rules specified in
   * [RFC 3986](http://www.ietf.org/rfc/rfc3986.txt).
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var absUrl = $location.absUrl();
   * // => "http://example.com/#/some/path?foo=bar&baz=xoxo"
   * ```
   *
   * @return {string} full url
   */
absUrl:Cb("$$absUrl"),/**
   * @ngdoc method
   * @name $location#url
   *
   * @description
   * This method is getter / setter.
   *
   * Return url (e.g. `/path?a=b#hash`) when called without any parameter.
   *
   * Change path, search and hash, when called with parameter and return `$location`.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var url = $location.url();
   * // => "/some/path?foo=bar&baz=xoxo"
   * ```
   *
   * @param {string=} url New url without base prefix (e.g. `/path?a=b#hash`)
   * @return {string} url
   */
url:function(a){if(r(a))return this.$$url;var b=de.exec(a);return(b[1]||""===a)&&this.path(decodeURIComponent(b[1])),(b[2]||b[1]||""===a)&&this.search(b[3]||""),this.hash(b[5]||""),this},/**
   * @ngdoc method
   * @name $location#protocol
   *
   * @description
   * This method is getter only.
   *
   * Return protocol of current url.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var protocol = $location.protocol();
   * // => "http"
   * ```
   *
   * @return {string} protocol of current url
   */
protocol:Cb("$$protocol"),/**
   * @ngdoc method
   * @name $location#host
   *
   * @description
   * This method is getter only.
   *
   * Return host of current url.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var host = $location.host();
   * // => "example.com"
   * ```
   *
   * @return {string} host of current url.
   */
host:Cb("$$host"),/**
   * @ngdoc method
   * @name $location#port
   *
   * @description
   * This method is getter only.
   *
   * Return port of current url.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var port = $location.port();
   * // => 80
   * ```
   *
   * @return {Number} port
   */
port:Cb("$$port"),/**
   * @ngdoc method
   * @name $location#path
   *
   * @description
   * This method is getter / setter.
   *
   * Return path of current url when called without any parameter.
   *
   * Change path when called with parameter and return `$location`.
   *
   * Note: Path should always begin with forward slash (/), this method will add the forward slash
   * if it is missing.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var path = $location.path();
   * // => "/some/path"
   * ```
   *
   * @param {(string|number)=} path New path
   * @return {string} path
   */
path:Db("$$path",function(a){return a=null!==a?a.toString():"","/"==a.charAt(0)?a:"/"+a}),/**
   * @ngdoc method
   * @name $location#search
   *
   * @description
   * This method is getter / setter.
   *
   * Return search part (as object) of current url when called without any parameter.
   *
   * Change search part when called with parameter and return `$location`.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo
   * var searchObject = $location.search();
   * // => {foo: 'bar', baz: 'xoxo'}
   *
   * // set foo to 'yipee'
   * $location.search('foo', 'yipee');
   * // $location.search() => {foo: 'yipee', baz: 'xoxo'}
   * ```
   *
   * @param {string|Object.<string>|Object.<Array.<string>>} search New search params - string or
   * hash object.
   *
   * When called with a single argument the method acts as a setter, setting the `search` component
   * of `$location` to the specified value.
   *
   * If the argument is a hash object containing an array of values, these values will be encoded
   * as duplicate search parameters in the url.
   *
   * @param {(string|Number|Array<string>|boolean)=} paramValue If `search` is a string or number, then `paramValue`
   * will override only a single search property.
   *
   * If `paramValue` is an array, it will override the property of the `search` component of
   * `$location` specified via the first argument.
   *
   * If `paramValue` is `null`, the property specified via the first argument will be deleted.
   *
   * If `paramValue` is `true`, the property specified via the first argument will be added with no
   * value nor trailing equal sign.
   *
   * @return {Object} If called with no arguments returns the parsed `search` object. If called with
   * one or more arguments returns `$location` object itself.
   */
search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(u(a)||v(a))a=a.toString(),this.$$search=V(a);else{if(!t(a))throw fe("isrcharg","The first argument of the `$location#search()` call must be a string or an object.");a=K(a,{}),
// remove object undefined or null properties
f(a,function(b,c){null==b&&delete a[c]}),this.$$search=a}break;default:r(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}return this.$$compose(),this},/**
   * @ngdoc method
   * @name $location#hash
   *
   * @description
   * This method is getter / setter.
   *
   * Return hash fragment when called without any parameter.
   *
   * Change hash fragment when called with parameter and return `$location`.
   *
   *
   * ```js
   * // given url http://example.com/#/some/path?foo=bar&baz=xoxo#hashValue
   * var hash = $location.hash();
   * // => "hashValue"
   * ```
   *
   * @param {(string|number)=} hash New hash fragment
   * @return {string} hash
   */
hash:Db("$$hash",function(a){return null!==a?a.toString():""}),/**
   * @ngdoc method
   * @name $location#replace
   *
   * @description
   * If called, all changes to $location during current `$digest` will be replacing current history
   * record, instead of adding new one.
   */
replace:function(){return this.$$replace=!0,this}};f([Bb,Ab,zb],function(a){a.prototype=Object.create(ge),/**
   * @ngdoc method
   * @name $location#state
   *
   * @description
   * This method is getter / setter.
   *
   * Return the history state object when called without any parameter.
   *
   * Change the history state object when called with one parameter and return `$location`.
   * The state object is later passed to `pushState` or `replaceState`.
   *
   * NOTE: This method is supported only in HTML5 mode and only in browsers supporting
   * the HTML5 History API (i.e. methods `pushState` and `replaceState`). If you need to support
   * older browsers (like IE9 or Android < 4.0), don't use this method.
   *
   * @param {object=} state State object for pushState or replaceState
   * @return {object} state
   */
a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==zb||!this.$$html5)throw fe("nostate","History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
// The user might modify `stateObject` after invoking `$location.state(stateObject)`
// but we're changing the $$state reference to $browser.state() during the $digest
// so the modification window is narrow.
return this.$$state=r(b)?null:b,this}});/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables likes document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var he=d("$parse"),ie=Function.prototype.call,je=Function.prototype.apply,ke=Function.prototype.bind,le=ja();f({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,b){a.constant=a.literal=a.sharedGetter=!0,le[b]=a}),
//Not quite a constant, but can be lex/parsed the same
le["this"]=function(a){return a},le["this"].sharedGetter=!0;
//Operators - will be wrapped by binaryFn/unaryFn/assignment/filter
var me=l(ja(),{"+":function(a,b,d,e){return d=d(a,b),e=e(a,b),s(d)?s(e)?d+e:d:s(e)?e:c},"-":function(a,b,c,d){return c=c(a,b),d=d(a,b),(s(c)?c:0)-(s(d)?d:0)},"*":function(a,b,c,d){return c(a,b)*d(a,b)},"/":function(a,b,c,d){return c(a,b)/d(a,b)},"%":function(a,b,c,d){return c(a,b)%d(a,b)},"===":function(a,b,c,d){return c(a,b)===d(a,b)},"!==":function(a,b,c,d){return c(a,b)!==d(a,b)},"==":function(a,b,c,d){return c(a,b)==d(a,b)},"!=":function(a,b,c,d){return c(a,b)!=d(a,b)},"<":function(a,b,c,d){return c(a,b)<d(a,b)},">":function(a,b,c,d){return c(a,b)>d(a,b)},"<=":function(a,b,c,d){return c(a,b)<=d(a,b)},">=":function(a,b,c,d){return c(a,b)>=d(a,b)},"&&":function(a,b,c,d){return c(a,b)&&d(a,b)},"||":function(a,b,c,d){return c(a,b)||d(a,b)},"!":function(a,b,c){return!c(a,b)},
//Tokenized as operators but parsed as assignment/filters
"=":!0,"|":!0}),ne={n:"\n",f:"\f",r:"\r",t:"	",v:"","'":"'",'"':'"'},oe=function(a){this.options=a};oe.prototype={constructor:oe,lex:function(a){for(this.text=a,this.index=0,this.tokens=[];this.index<this.text.length;){var b=this.text.charAt(this.index);if('"'===b||"'"===b)this.readString(b);else if(this.isNumber(b)||"."===b&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(b))this.readIdent();else if(this.is(b,"(){}[].,;:?"))this.tokens.push({index:this.index,text:b}),this.index++;else if(this.isWhitespace(b))this.index++;else{var c=b+this.peek(),d=c+this.peek(2),e=me[b],f=me[c],g=me[d];if(e||f||g){var h=g?d:f?c:b;this.tokens.push({index:this.index,text:h,operator:!0}),this.index+=h.length}else this.throwError("Unexpected next character ",this.index,this.index+1)}}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){var b=a||1;return this.index+b<this.text.length?this.text.charAt(this.index+b):!1},isNumber:function(a){return a>="0"&&"9">=a&&"string"==typeof a},isWhitespace:function(a){
// IE treats non-breaking space as \u00A0
return" "===a||"\r"===a||"	"===a||"\n"===a||""===a||" "===a},isIdent:function(a){return a>="a"&&"z">=a||a>="A"&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,c){c=c||this.index;var d=s(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,c)+"]":" "+c;throw he("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",a,d,this.text)},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var c=Wc(this.text.charAt(this.index));if("."==c||this.isNumber(c))a+=c;else{var d=this.peek();if("e"==c&&this.isExpOperator(d))a+=c;else if(this.isExpOperator(c)&&d&&this.isNumber(d)&&"e"==a.charAt(a.length-1))a+=c;else{if(!this.isExpOperator(c)||d&&this.isNumber(d)||"e"!=a.charAt(a.length-1))break;this.throwError("Invalid exponent")}}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var b=this.text.charAt(this.index);if(!this.isIdent(b)&&!this.isNumber(b))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var c="",d=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index);if(d+=f,e){if("u"===f){var g=this.text.substring(this.index+1,this.index+5);g.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+g+"]"),this.index+=4,c+=String.fromCharCode(parseInt(g,16))}else{var h=ne[f];c+=h||f}e=!1}else if("\\"===f)e=!0;else{if(f===a)return this.index++,void this.tokens.push({index:b,text:d,constant:!0,value:c});c+=f}this.index++}this.throwError("Unterminated quote",b)}};/**
 * @constructor
 */
var pe=function(a,b,c){this.lexer=a,this.$filter=b,this.options=c};pe.ZERO=l(function(){return 0},{sharedGetter:!0,constant:!0}),pe.prototype={constructor:pe,parse:function(a){this.text=a,this.tokens=this.lexer.lex(a);var b=this.statements();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),b.literal=!!b.literal,b.constant=!!b.constant,b},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier&&this.peek().text in le?a=le[this.consume().text]:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var b,c;b=this.expect("(","[",".");)"("===b.text?(a=this.functionCall(a,c),c=null):"["===b.text?(c=a,a=this.objectIndex(a)):"."===b.text?(c=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,b){throw he("syntax","Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",b.text,a,b.index+1,this.text,this.text.substring(b.index))},peekToken:function(){if(0===this.tokens.length)throw he("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},peek:function(a,b,c,d){return this.peekAhead(0,a,b,c,d)},peekAhead:function(a,b,c,d,e){if(this.tokens.length>a){var f=this.tokens[a],g=f.text;if(g===b||g===c||g===d||g===e||!b&&!c&&!d&&!e)return f}return!1},expect:function(a,b,c,d){var e=this.peek(a,b,c,d);return e?(this.tokens.shift(),e):!1},consume:function(a){if(0===this.tokens.length)throw he("ueoe","Unexpected end of expression: {0}",this.text);var b=this.expect(a);return b||this.throwError("is unexpected, expecting ["+a+"]",this.peek()),b},unaryFn:function(a,b){var c=me[a];return l(function(a,d){return c(a,d,b)},{constant:b.constant,inputs:[b]})},binaryFn:function(a,b,c,d){var e=me[b];return l(function(b,d){return e(b,d,a,c)},{constant:a.constant&&c.constant,inputs:!d&&[a,c]})},identifier:function(){
//Continue reading each `.identifier` unless it is a method invocation
for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return Ob(a,this.options,this.text)},constant:function(){var a=this.consume().value;return l(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))
// optimize for the common case where there is only one statement.
// TODO(size): maybe we should not support multiple statements?
return 1===a.length?a[0]:function(b,c){for(var d,e=0,f=a.length;f>e;e++)d=a[e](b,c);return d}},filterChain:function(){for(var a,b=this.expression();a=this.expect("|");)b=this.filter(b);return b},filter:function(a){var b,d,e=this.$filter(this.consume().text);if(this.peek(":"))// we can safely reuse the array
for(b=[],d=[];this.expect(":");)b.push(this.expression());var f=[a].concat(b||[]);return l(function(f,g){var h=a(f,g);if(d){d[0]=h;for(var i=b.length;i--;)d[i+1]=b[i](f,g);return e.apply(c,d)}return e(h)},{constant:!e.$stateful&&f.every(Jb),inputs:!e.$stateful&&f})},expression:function(){return this.assignment()},assignment:function(){var a,b,c=this.ternary();return(b=this.expect("="))?(c.assign||this.throwError("implies assignment but ["+this.text.substring(0,b.index)+"] can not be assigned to",b),a=this.ternary(),l(function(b,d){return c.assign(b,a(b,d),d)},{inputs:[c,a]})):c},ternary:function(){var a,b,c=this.logicalOR();if((b=this.expect("?"))&&(a=this.assignment(),this.consume(":"))){var d=this.assignment();return l(function(b,e){return c(b,e)?a(b,e):d(b,e)},{constant:c.constant&&a.constant&&d.constant})}return c},logicalOR:function(){for(var a,b=this.logicalAND();a=this.expect("||");)b=this.binaryFn(b,a.text,this.logicalAND(),!0);return b},logicalAND:function(){for(var a,b=this.equality();a=this.expect("&&");)b=this.binaryFn(b,a.text,this.equality(),!0);return b},equality:function(){for(var a,b=this.relational();a=this.expect("==","!=","===","!==");)b=this.binaryFn(b,a.text,this.relational());return b},relational:function(){for(var a,b=this.additive();a=this.expect("<",">","<=",">=");)b=this.binaryFn(b,a.text,this.additive());return b},additive:function(){for(var a,b=this.multiplicative();a=this.expect("+","-");)b=this.binaryFn(b,a.text,this.multiplicative());return b},multiplicative:function(){for(var a,b=this.unary();a=this.expect("*","/","%");)b=this.binaryFn(b,a.text,this.unary());return b},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(pe.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var b=this.identifier();return l(function(d,e,f){var g=f||a(d,e);return null==g?c:b(g)},{assign:function(c,d,e){var f=a(c,e);return f||a.assign(c,f={},e),b.assign(f,d)}})},objectIndex:function(a){var b=this.text,d=this.expression();return this.consume("]"),l(function(e,f){var g,h=a(e,f),i=d(e,f);return Gb(i,b),h?g=Hb(h[i],b):c},{assign:function(c,e,f){var g=Gb(d(c,f),b),h=Hb(a(c,f),b);return h||a.assign(c,h={},f),h[g]=e}})},functionCall:function(a,b){var d=[];if(")"!==this.peekToken().text)do d.push(this.expression());while(this.expect(","));this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var i=b?b(g,h):s(b)?c:g,j=a(g,h,i)||o;if(f)for(var k=d.length;k--;)f[k]=Hb(d[k](g,h),e);Hb(i,e),Ib(j,e);
// IE doesn't have apply for some native functions
var l=j.apply?j.apply(i,f):j(f[0],f[1],f[2],f[3],f[4]);
// Free-up the memory (arguments of the last function call).
return f&&(f.length=0),Hb(l,e)}},
// This is used with json array declaration
arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text)do{if(this.peek("]"))
// Support trailing commas per ES5.1.
break;a.push(this.expression())}while(this.expect(","));return this.consume("]"),l(function(b,c){for(var d=[],e=0,f=a.length;f>e;e++)d.push(a[e](b,c));return d},{literal:!0,constant:a.every(Jb),inputs:a})},object:function(){var a=[],b=[];if("}"!==this.peekToken().text)do{if(this.peek("}"))
// Support trailing commas per ES5.1.
break;var c=this.consume();c.constant?a.push(c.value):c.identifier?a.push(c.text):this.throwError("invalid key",c),this.consume(":"),b.push(this.expression())}while(this.expect(","));return this.consume("}"),l(function(c,d){for(var e={},f=0,g=b.length;g>f;f++)e[a[f]]=b[f](c,d);return e},{literal:!0,constant:b.every(Jb),inputs:b})}};var qe=ja(),re=ja(),se=Object.prototype.valueOf,te=d("$sce"),ue={HTML:"html",CSS:"css",URL:"url",
// RESOURCE_URL is a subtype of URL used in contexts where a privileged resource is sourced from a
// url.  (e.g. ng-include, script src, templateUrl)
RESOURCE_URL:"resourceUrl",JS:"js"},Wd=d("$compile"),ve=b.createElement("a"),we=dc(a.location.href);/* global currencyFilter: true,
 dateFilter: true,
 filterFilter: true,
 jsonFilter: true,
 limitToFilter: true,
 lowercaseFilter: true,
 numberFilter: true,
 orderByFilter: true,
 uppercaseFilter: true,
 */
/**
 * @ngdoc provider
 * @name $filterProvider
 * @description
 *
 * Filters are just functions which transform input to an output. However filters need to be
 * Dependency Injected. To achieve this a filter definition consists of a factory function which is
 * annotated with dependencies and is responsible for creating a filter function.
 *
 * ```js
 *   // Filter registration
 *   function MyModule($provide, $filterProvider) {
 *     // create a service to demonstrate injection (not always needed)
 *     $provide.value('greet', function(name){
 *       return 'Hello ' + name + '!';
 *     });
 *
 *     // register a filter factory which uses the
 *     // greet service to demonstrate DI.
 *     $filterProvider.register('greet', function(greet){
 *       // return the filter function which uses the greet service
 *       // to generate salutation
 *       return function(text) {
 *         // filters need to be forgiving so check input validity
 *         return text && greet(text) || text;
 *       };
 *     });
 *   }
 * ```
 *
 * The filter function is registered with the `$injector` under the filter name suffix with
 * `Filter`.
 *
 * ```js
 *   it('should be the same instance', inject(
 *     function($filterProvider) {
 *       $filterProvider.register('reverse', function(){
 *         return ...;
 *       });
 *     },
 *     function($filter, reverseFilter) {
 *       expect($filter('reverse')).toBe(reverseFilter);
 *     });
 * ```
 *
 *
 * For more information about how angular filters work, and how to create your own filters, see
 * {@link guide/filter Filters} in the Angular Developer Guide.
 */
/**
 * @ngdoc service
 * @name $filter
 * @kind function
 * @description
 * Filters are used for formatting data displayed to the user.
 *
 * The general syntax in templates is as follows:
 *
 *         {{ expression [| filter_name[:parameter_value] ... ] }}
 *
 * @param {String} name Name of the filter function to retrieve
 * @return {Function} the filter function
 * @example
   <example name="$filter" module="filterExample">
     <file name="index.html">
       <div ng-controller="MainCtrl">
        <h3>{{ originalText }}</h3>
        <h3>{{ filteredText }}</h3>
       </div>
     </file>

     <file name="script.js">
      angular.module('filterExample', [])
      .controller('MainCtrl', function($scope, $filter) {
        $scope.originalText = 'hello';
        $scope.filteredText = $filter('uppercase')($scope.originalText);
      });
     </file>
   </example>
  */
gc.$inject=["$provide"],/**
 * @ngdoc filter
 * @name currency
 * @kind function
 *
 * @description
 * Formats a number as a currency (ie $1,234.56). When no currency symbol is provided, default
 * symbol for current locale is used.
 *
 * @param {number} amount Input to filter.
 * @param {string=} symbol Currency symbol or identifier to be displayed.
 * @param {number=} fractionSize Number of decimal places to round the amount to, defaults to default max fraction size for current locale
 * @returns {string} Formatted number.
 *
 *
 * @example
   <example module="currencyExample">
     <file name="index.html">
       <script>
         angular.module('currencyExample', [])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.amount = 1234.56;
           }]);
       </script>
       <div ng-controller="ExampleController">
         <input type="number" ng-model="amount"> <br>
         default currency symbol ($): <span id="currency-default">{{amount | currency}}</span><br>
         custom currency identifier (USD$): <span id="currency-custom">{{amount | currency:"USD$"}}</span>
         no fractions (0): <span id="currency-no-fractions">{{amount | currency:"USD$":0}}</span>
       </div>
     </file>
     <file name="protractor.js" type="protractor">
       it('should init with 1234.56', function() {
         expect(element(by.id('currency-default')).getText()).toBe('$1,234.56');
         expect(element(by.id('currency-custom')).getText()).toBe('USD$1,234.56');
         expect(element(by.id('currency-no-fractions')).getText()).toBe('USD$1,235');
       });
       it('should update', function() {
         if (browser.params.browser == 'safari') {
           // Safari does not understand the minus key. See
           // https://github.com/angular/protractor/issues/481
           return;
         }
         element(by.model('amount')).clear();
         element(by.model('amount')).sendKeys('-1234');
         expect(element(by.id('currency-default')).getText()).toBe('($1,234.00)');
         expect(element(by.id('currency-custom')).getText()).toBe('(USD$1,234.00)');
         expect(element(by.id('currency-no-fractions')).getText()).toBe('(USD$1,234)');
       });
     </file>
   </example>
 */
kc.$inject=["$locale"],/**
 * @ngdoc filter
 * @name number
 * @kind function
 *
 * @description
 * Formats a number as text.
 *
 * If the input is not a number an empty string is returned.
 *
 * @param {number|string} number Number to format.
 * @param {(number|string)=} fractionSize Number of decimal places to round the number to.
 * If this is not provided then the fraction size is computed from the current locale's number
 * formatting pattern. In the case of the default locale, it will be 3.
 * @returns {string} Number rounded to decimalPlaces and places a “,” after each third digit.
 *
 * @example
   <example module="numberFilterExample">
     <file name="index.html">
       <script>
         angular.module('numberFilterExample', [])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.val = 1234.56789;
           }]);
       </script>
       <div ng-controller="ExampleController">
         Enter number: <input ng-model='val'><br>
         Default formatting: <span id='number-default'>{{val | number}}</span><br>
         No fractions: <span>{{val | number:0}}</span><br>
         Negative number: <span>{{-val | number:4}}</span>
       </div>
     </file>
     <file name="protractor.js" type="protractor">
       it('should format numbers', function() {
         expect(element(by.id('number-default')).getText()).toBe('1,234.568');
         expect(element(by.binding('val | number:0')).getText()).toBe('1,235');
         expect(element(by.binding('-val | number:4')).getText()).toBe('-1,234.5679');
       });

       it('should update', function() {
         element(by.model('val')).clear();
         element(by.model('val')).sendKeys('3374.333');
         expect(element(by.id('number-default')).getText()).toBe('3,374.333');
         expect(element(by.binding('val | number:0')).getText()).toBe('3,374');
         expect(element(by.binding('-val | number:4')).getText()).toBe('-3,374.3330');
      });
     </file>
   </example>
 */
lc.$inject=["$locale"];var xe=".",ye={yyyy:oc("FullYear",4),yy:oc("FullYear",2,0,!0),y:oc("FullYear",1),MMMM:pc("Month"),MMM:pc("Month",!0),MM:oc("Month",2,1),M:oc("Month",1,1),dd:oc("Date",2),d:oc("Date",1),HH:oc("Hours",2),H:oc("Hours",1),hh:oc("Hours",2,-12),h:oc("Hours",1,-12),mm:oc("Minutes",2),m:oc("Minutes",1),ss:oc("Seconds",2),s:oc("Seconds",1),
// while ISO 8601 requires fractions to be prefixed with `.` or `,`
// we can be just safely rely on using `sss` since we currently don't support single or two digit fractions
sss:oc("Milliseconds",3),EEEE:pc("Day"),EEE:pc("Day",!0),a:uc,Z:qc,ww:tc(2),w:tc(1),G:vc,GG:vc,GGG:vc,GGGG:wc},ze=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,Ae=/^\-?\d+$/;/**
 * @ngdoc filter
 * @name date
 * @kind function
 *
 * @description
 *   Formats `date` to a string based on the requested `format`.
 *
 *   `format` string can be composed of the following elements:
 *
 *   * `'yyyy'`: 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
 *   * `'yy'`: 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
 *   * `'y'`: 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
 *   * `'MMMM'`: Month in year (January-December)
 *   * `'MMM'`: Month in year (Jan-Dec)
 *   * `'MM'`: Month in year, padded (01-12)
 *   * `'M'`: Month in year (1-12)
 *   * `'dd'`: Day in month, padded (01-31)
 *   * `'d'`: Day in month (1-31)
 *   * `'EEEE'`: Day in Week,(Sunday-Saturday)
 *   * `'EEE'`: Day in Week, (Sun-Sat)
 *   * `'HH'`: Hour in day, padded (00-23)
 *   * `'H'`: Hour in day (0-23)
 *   * `'hh'`: Hour in AM/PM, padded (01-12)
 *   * `'h'`: Hour in AM/PM, (1-12)
 *   * `'mm'`: Minute in hour, padded (00-59)
 *   * `'m'`: Minute in hour (0-59)
 *   * `'ss'`: Second in minute, padded (00-59)
 *   * `'s'`: Second in minute (0-59)
 *   * `'sss'`: Millisecond in second, padded (000-999)
 *   * `'a'`: AM/PM marker
 *   * `'Z'`: 4 digit (+sign) representation of the timezone offset (-1200-+1200)
 *   * `'ww'`: Week of year, padded (00-53). Week 01 is the week with the first Thursday of the year
 *   * `'w'`: Week of year (0-53). Week 1 is the week with the first Thursday of the year
 *   * `'G'`, `'GG'`, `'GGG'`: The abbreviated form of the era string (e.g. 'AD')
 *   * `'GGGG'`: The long form of the era string (e.g. 'Anno Domini')
 *
 *   `format` string can also be one of the following predefined
 *   {@link guide/i18n localizable formats}:
 *
 *   * `'medium'`: equivalent to `'MMM d, y h:mm:ss a'` for en_US locale
 *     (e.g. Sep 3, 2010 12:05:08 PM)
 *   * `'short'`: equivalent to `'M/d/yy h:mm a'` for en_US  locale (e.g. 9/3/10 12:05 PM)
 *   * `'fullDate'`: equivalent to `'EEEE, MMMM d, y'` for en_US  locale
 *     (e.g. Friday, September 3, 2010)
 *   * `'longDate'`: equivalent to `'MMMM d, y'` for en_US  locale (e.g. September 3, 2010)
 *   * `'mediumDate'`: equivalent to `'MMM d, y'` for en_US  locale (e.g. Sep 3, 2010)
 *   * `'shortDate'`: equivalent to `'M/d/yy'` for en_US locale (e.g. 9/3/10)
 *   * `'mediumTime'`: equivalent to `'h:mm:ss a'` for en_US locale (e.g. 12:05:08 PM)
 *   * `'shortTime'`: equivalent to `'h:mm a'` for en_US locale (e.g. 12:05 PM)
 *
 *   `format` string can contain literal values. These need to be escaped by surrounding with single quotes (e.g.
 *   `"h 'in the morning'"`). In order to output a single quote, escape it - i.e., two single quotes in a sequence
 *   (e.g. `"h 'o''clock'"`).
 *
 * @param {(Date|number|string)} date Date to format either as Date object, milliseconds (string or
 *    number) or various ISO 8601 datetime string formats (e.g. yyyy-MM-ddTHH:mm:ss.sssZ and its
 *    shorter versions like yyyy-MM-ddTHH:mmZ, yyyy-MM-dd or yyyyMMddTHHmmssZ). If no timezone is
 *    specified in the string input, the time is considered to be in the local timezone.
 * @param {string=} format Formatting rules (see Description). If not specified,
 *    `mediumDate` is used.
 * @param {string=} timezone Timezone to be used for formatting. Right now, only `'UTC'` is supported.
 *    If not specified, the timezone of the browser will be used.
 * @returns {string} Formatted string or the input if input is not recognized as date/millis.
 *
 * @example
   <example>
     <file name="index.html">
       <span ng-non-bindable>{{1288323623006 | date:'medium'}}</span>:
           <span>{{1288323623006 | date:'medium'}}</span><br>
       <span ng-non-bindable>{{1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'}}</span>:
          <span>{{1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'}}</span><br>
       <span ng-non-bindable>{{1288323623006 | date:'MM/dd/yyyy @ h:mma'}}</span>:
          <span>{{'1288323623006' | date:'MM/dd/yyyy @ h:mma'}}</span><br>
       <span ng-non-bindable>{{1288323623006 | date:"MM/dd/yyyy 'at' h:mma"}}</span>:
          <span>{{'1288323623006' | date:"MM/dd/yyyy 'at' h:mma"}}</span><br>
     </file>
     <file name="protractor.js" type="protractor">
       it('should format date', function() {
         expect(element(by.binding("1288323623006 | date:'medium'")).getText()).
            toMatch(/Oct 2\d, 2010 \d{1,2}:\d{2}:\d{2} (AM|PM)/);
         expect(element(by.binding("1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'")).getText()).
            toMatch(/2010\-10\-2\d \d{2}:\d{2}:\d{2} (\-|\+)?\d{4}/);
         expect(element(by.binding("'1288323623006' | date:'MM/dd/yyyy @ h:mma'")).getText()).
            toMatch(/10\/2\d\/2010 @ \d{1,2}:\d{2}(AM|PM)/);
         expect(element(by.binding("'1288323623006' | date:\"MM/dd/yyyy 'at' h:mma\"")).getText()).
            toMatch(/10\/2\d\/2010 at \d{1,2}:\d{2}(AM|PM)/);
       });
     </file>
   </example>
 */
xc.$inject=["$locale"];/**
 * @ngdoc filter
 * @name lowercase
 * @kind function
 * @description
 * Converts string to lowercase.
 * @see angular.lowercase
 */
var Be=q(Wc),Ce=q(Yc);/**
 * @ngdoc filter
 * @name orderBy
 * @kind function
 *
 * @description
 * Orders a specified `array` by the `expression` predicate. It is ordered alphabetically
 * for strings and numerically for numbers. Note: if you notice numbers are not being sorted
 * correctly, make sure they are actually being saved as numbers and not strings.
 *
 * @param {Array} array The array to sort.
 * @param {function(*)|string|Array.<(function(*)|string)>=} expression A predicate to be
 *    used by the comparator to determine the order of elements.
 *
 *    Can be one of:
 *
 *    - `function`: Getter function. The result of this function will be sorted using the
 *      `<`, `=`, `>` operator.
 *    - `string`: An Angular expression. The result of this expression is used to compare elements
 *      (for example `name` to sort by a property called `name` or `name.substr(0, 3)` to sort by
 *      3 first characters of a property called `name`). The result of a constant expression
 *      is interpreted as a property name to be used in comparisons (for example `"special name"`
 *      to sort object by the value of their `special name` property). An expression can be
 *      optionally prefixed with `+` or `-` to control ascending or descending sort order
 *      (for example, `+name` or `-name`). If no property is provided, (e.g. `'+'`) then the array
 *      element itself is used to compare where sorting.
 *    - `Array`: An array of function or string predicates. The first predicate in the array
 *      is used for sorting, but when two items are equivalent, the next predicate is used.
 *
 *    If the predicate is missing or empty then it defaults to `'+'`.
 *
 * @param {boolean=} reverse Reverse the order of the array.
 * @returns {Array} Sorted copy of the source array.
 *
 *
 * @example
 * The example below demonstrates a simple ngRepeat, where the data is sorted
 * by age in descending order (predicate is set to `'-age'`).
 * `reverse` is not set, which means it defaults to `false`.
   <example module="orderByExample">
     <file name="index.html">
       <script>
         angular.module('orderByExample', [])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.friends =
                 [{name:'John', phone:'555-1212', age:10},
                  {name:'Mary', phone:'555-9876', age:19},
                  {name:'Mike', phone:'555-4321', age:21},
                  {name:'Adam', phone:'555-5678', age:35},
                  {name:'Julie', phone:'555-8765', age:29}];
           }]);
       </script>
       <div ng-controller="ExampleController">
         <table class="friend">
           <tr>
             <th>Name</th>
             <th>Phone Number</th>
             <th>Age</th>
           </tr>
           <tr ng-repeat="friend in friends | orderBy:'-age'">
             <td>{{friend.name}}</td>
             <td>{{friend.phone}}</td>
             <td>{{friend.age}}</td>
           </tr>
         </table>
       </div>
     </file>
   </example>
 *
 * The predicate and reverse parameters can be controlled dynamically through scope properties,
 * as shown in the next example.
 * @example
   <example module="orderByExample">
     <file name="index.html">
       <script>
         angular.module('orderByExample', [])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.friends =
                 [{name:'John', phone:'555-1212', age:10},
                  {name:'Mary', phone:'555-9876', age:19},
                  {name:'Mike', phone:'555-4321', age:21},
                  {name:'Adam', phone:'555-5678', age:35},
                  {name:'Julie', phone:'555-8765', age:29}];
             $scope.predicate = '-age';
           }]);
       </script>
       <div ng-controller="ExampleController">
         <pre>Sorting predicate = {{predicate}}; reverse = {{reverse}}</pre>
         <hr/>
         [ <a href="" ng-click="predicate=''">unsorted</a> ]
         <table class="friend">
           <tr>
             <th><a href="" ng-click="predicate = 'name'; reverse=false">Name</a>
                 (<a href="" ng-click="predicate = '-name'; reverse=false">^</a>)</th>
             <th><a href="" ng-click="predicate = 'phone'; reverse=!reverse">Phone Number</a></th>
             <th><a href="" ng-click="predicate = 'age'; reverse=!reverse">Age</a></th>
           </tr>
           <tr ng-repeat="friend in friends | orderBy:predicate:reverse">
             <td>{{friend.name}}</td>
             <td>{{friend.phone}}</td>
             <td>{{friend.age}}</td>
           </tr>
         </table>
       </div>
     </file>
   </example>
 *
 * It's also possible to call the orderBy filter manually, by injecting `$filter`, retrieving the
 * filter routine with `$filter('orderBy')`, and calling the returned filter routine with the
 * desired parameters.
 *
 * Example:
 *
 * @example
  <example module="orderByExample">
    <file name="index.html">
      <div ng-controller="ExampleController">
        <table class="friend">
          <tr>
            <th><a href="" ng-click="reverse=false;order('name', false)">Name</a>
              (<a href="" ng-click="order('-name',false)">^</a>)</th>
            <th><a href="" ng-click="reverse=!reverse;order('phone', reverse)">Phone Number</a></th>
            <th><a href="" ng-click="reverse=!reverse;order('age',reverse)">Age</a></th>
          </tr>
          <tr ng-repeat="friend in friends">
            <td>{{friend.name}}</td>
            <td>{{friend.phone}}</td>
            <td>{{friend.age}}</td>
          </tr>
        </table>
      </div>
    </file>

    <file name="script.js">
      angular.module('orderByExample', [])
        .controller('ExampleController', ['$scope', '$filter', function($scope, $filter) {
          var orderBy = $filter('orderBy');
          $scope.friends = [
            { name: 'John',    phone: '555-1212',    age: 10 },
            { name: 'Mary',    phone: '555-9876',    age: 19 },
            { name: 'Mike',    phone: '555-4321',    age: 21 },
            { name: 'Adam',    phone: '555-5678',    age: 35 },
            { name: 'Julie',   phone: '555-8765',    age: 29 }
          ];
          $scope.order = function(predicate, reverse) {
            $scope.friends = orderBy($scope.friends, predicate, reverse);
          };
          $scope.order('-age',false);
        }]);
    </file>
</example>
 */
Ac.$inject=["$parse"];/**
 * @ngdoc directive
 * @name a
 * @restrict E
 *
 * @description
 * Modifies the default behavior of the html A tag so that the default action is prevented when
 * the href attribute is empty.
 *
 * This change permits the easy creation of action links with the `ngClick` directive
 * without changing the location or causing page reloads, e.g.:
 * `<a href="" ng-click="list.addItem()">Add Item</a>`
 */
var De=q({restrict:"E",compile:function(a,b){return b.href||b.xlinkHref||b.name?void 0:function(a,b){
// If the linked element is not an anchor tag anymore, do nothing
if("a"===b[0].nodeName.toLowerCase()){
// SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
var c="[object SVGAnimatedString]"===gd.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){
// if we have no href url, then don't navigate anywhere.
b.attr(c)||a.preventDefault()})}}}}),Ee={};
// boolean attrs are evaluated
f(Md,function(a,b){
// binding to multiple is not supported
if("multiple"!=a){var c=$a("ng-"+b);Ee[c]=function(){return{restrict:"A",priority:100,link:function(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}}}}}),
// aliased input attrs are evaluated
f(Od,function(a,b){Ee[b]=function(){return{priority:100,link:function(a,c,d){
//special case ngPattern when a literal regular expression value
//is used as the expression (this way we don't have to watch anything).
if("ngPattern"===b&&"/"==d.ngPattern.charAt(0)){var e=d.ngPattern.match(Uc);if(e)return void d.$set("ngPattern",new RegExp(e[1],e[2]))}a.$watch(d[b],function(a){d.$set(b,a)})}}}}),
// ng-src, ng-srcset, ng-href are interpolated
f(["src","srcset","href"],function(a){var b=$a("ng-"+a);Ee[b]=function(){return{priority:99,// it needs to run after the attributes are interpolated
link:function(c,d,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===gd.call(d.prop("href"))&&(g="xlinkHref",e.$attr[g]="xlink:href",f=null),e.$observe(b,function(b){
// on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
// then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
// to set the property as well to achieve the desired effect.
// we use attr[attrName] value since $set can sanitize the url.
return b?(e.$set(g,b),void(_c&&f&&d.prop(f,e[g]))):void("href"===a&&e.$set(g,null))})}}}});/* global -nullFormCtrl, -SUBMITTED_CLASS, addSetValidityMethod: true
 */
var Fe={$addControl:o,$$renameControl:Cc,$removeControl:o,$setValidity:o,$setDirty:o,$setPristine:o,$setSubmitted:o},Ge="ng-submitted";/**
 * @ngdoc type
 * @name form.FormController
 *
 * @property {boolean} $pristine True if user has not interacted with the form yet.
 * @property {boolean} $dirty True if user has already interacted with the form.
 * @property {boolean} $valid True if all of the containing forms and controls are valid.
 * @property {boolean} $invalid True if at least one containing control or form is invalid.
 * @property {boolean} $submitted True if user has submitted the form even if its invalid.
 *
 * @property {Object} $error Is an object hash, containing references to controls or
 *  forms with failing validators, where:
 *
 *  - keys are validation tokens (error names),
 *  - values are arrays of controls or forms that have a failing validator for given error name.
 *
 *  Built-in validation tokens:
 *
 *  - `email`
 *  - `max`
 *  - `maxlength`
 *  - `min`
 *  - `minlength`
 *  - `number`
 *  - `pattern`
 *  - `required`
 *  - `url`
 *  - `date`
 *  - `datetimelocal`
 *  - `time`
 *  - `week`
 *  - `month`
 *
 * @description
 * `FormController` keeps track of all its controls and nested forms as well as the state of them,
 * such as being valid/invalid or dirty/pristine.
 *
 * Each {@link ng.directive:form form} directive creates an instance
 * of `FormController`.
 *
 */
//asks for $scope to fool the BC controller module
Dc.$inject=["$element","$attrs","$scope","$animate","$interpolate"];/**
 * @ngdoc directive
 * @name ngForm
 * @restrict EAC
 *
 * @description
 * Nestable alias of {@link ng.directive:form `form`} directive. HTML
 * does not allow nesting of form elements. It is useful to nest forms, for example if the validity of a
 * sub-group of controls needs to be determined.
 *
 * Note: the purpose of `ngForm` is to group controls,
 * but not to be a replacement for the `<form>` tag with all of its capabilities
 * (e.g. posting to the server, ...).
 *
 * @param {string=} ngForm|name Name of the form. If specified, the form controller will be published into
 *                       related scope, under this name.
 *
 */
/**
 * @ngdoc directive
 * @name form
 * @restrict E
 *
 * @description
 * Directive that instantiates
 * {@link form.FormController FormController}.
 *
 * If the `name` attribute is specified, the form controller is published onto the current scope under
 * this name.
 *
 * # Alias: {@link ng.directive:ngForm `ngForm`}
 *
 * In Angular, forms can be nested. This means that the outer form is valid when all of the child
 * forms are valid as well. However, browsers do not allow nesting of `<form>` elements, so
 * Angular provides the {@link ng.directive:ngForm `ngForm`} directive which behaves identically to
 * `<form>` but can be nested.  This allows you to have nested forms, which is very useful when
 * using Angular validation directives in forms that are dynamically generated using the
 * {@link ng.directive:ngRepeat `ngRepeat`} directive. Since you cannot dynamically generate the `name`
 * attribute of input elements using interpolation, you have to wrap each set of repeated inputs in an
 * `ngForm` directive and nest these in an outer `form` element.
 *
 *
 * # CSS classes
 *  - `ng-valid` is set if the form is valid.
 *  - `ng-invalid` is set if the form is invalid.
 *  - `ng-pristine` is set if the form is pristine.
 *  - `ng-dirty` is set if the form is dirty.
 *  - `ng-submitted` is set if the form was submitted.
 *
 * Keep in mind that ngAnimate can detect each of these classes when added and removed.
 *
 *
 * # Submitting a form and preventing the default action
 *
 * Since the role of forms in client-side Angular applications is different than in classical
 * roundtrip apps, it is desirable for the browser not to translate the form submission into a full
 * page reload that sends the data to the server. Instead some javascript logic should be triggered
 * to handle the form submission in an application-specific way.
 *
 * For this reason, Angular prevents the default action (form submission to the server) unless the
 * `<form>` element has an `action` attribute specified.
 *
 * You can use one of the following two ways to specify what javascript method should be called when
 * a form is submitted:
 *
 * - {@link ng.directive:ngSubmit ngSubmit} directive on the form element
 * - {@link ng.directive:ngClick ngClick} directive on the first
  *  button or input field of type submit (input[type=submit])
 *
 * To prevent double execution of the handler, use only one of the {@link ng.directive:ngSubmit ngSubmit}
 * or {@link ng.directive:ngClick ngClick} directives.
 * This is because of the following form submission rules in the HTML specification:
 *
 * - If a form has only one input field then hitting enter in this field triggers form submit
 * (`ngSubmit`)
 * - if a form has 2+ input fields and no buttons or input[type=submit] then hitting enter
 * doesn't trigger submit
 * - if a form has one or more input fields and one or more buttons or input[type=submit] then
 * hitting enter in any of the input fields will trigger the click handler on the *first* button or
 * input[type=submit] (`ngClick`) *and* a submit handler on the enclosing form (`ngSubmit`)
 *
 * Any pending `ngModelOptions` changes will take place immediately when an enclosing form is
 * submitted. Note that `ngClick` events will occur before the model is updated. Use `ngSubmit`
 * to have access to the updated model.
 *
 * ## Animation Hooks
 *
 * Animations in ngForm are triggered when any of the associated CSS classes are added and removed.
 * These classes are: `.ng-pristine`, `.ng-dirty`, `.ng-invalid` and `.ng-valid` as well as any
 * other validations that are performed within the form. Animations in ngForm are similar to how
 * they work in ngClass and animations can be hooked into using CSS transitions, keyframes as well
 * as JS animations.
 *
 * The following example shows a simple way to utilize CSS transitions to style a form element
 * that has been rendered as invalid after it has been validated:
 *
 * <pre>
 * //be sure to include ngAnimate as a module to hook into more
 * //advanced animations
 * .my-form {
 *   transition:0.5s linear all;
 *   background: white;
 * }
 * .my-form.ng-invalid {
 *   background: red;
 *   color:white;
 * }
 * </pre>
 *
 * @example
    <example deps="angular-animate.js" animations="true" fixBase="true" module="formExample">
      <file name="index.html">
       <script>
         angular.module('formExample', [])
           .controller('FormController', ['$scope', function($scope) {
             $scope.userType = 'guest';
           }]);
       </script>
       <style>
        .my-form {
          -webkit-transition:all linear 0.5s;
          transition:all linear 0.5s;
          background: transparent;
        }
        .my-form.ng-invalid {
          background: red;
        }
       </style>
       <form name="myForm" ng-controller="FormController" class="my-form">
         userType: <input name="input" ng-model="userType" required>
         <span class="error" ng-show="myForm.input.$error.required">Required!</span><br>
         <tt>userType = {{userType}}</tt><br>
         <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br>
         <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br>
         <tt>myForm.$valid = {{myForm.$valid}}</tt><br>
         <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br>
        </form>
      </file>
      <file name="protractor.js" type="protractor">
        it('should initialize to model', function() {
          var userType = element(by.binding('userType'));
          var valid = element(by.binding('myForm.input.$valid'));

          expect(userType.getText()).toContain('guest');
          expect(valid.getText()).toContain('true');
        });

        it('should be invalid if empty', function() {
          var userType = element(by.binding('userType'));
          var valid = element(by.binding('myForm.input.$valid'));
          var userInput = element(by.model('userType'));

          userInput.clear();
          userInput.sendKeys('');

          expect(userType.getText()).toEqual('userType =');
          expect(valid.getText()).toContain('false');
        });
      </file>
    </example>
 *
 * @param {string=} name Name of the form. If specified, the form controller will be published into
 *                       related scope, under this name.
 */
var He=function(a){return["$timeout",function(b){var d={name:"form",restrict:a?"EAC":"E",controller:Dc,compile:function(d,e){
// Setup initial state of the control
d.addClass(of).addClass(mf);var f=e.name?"name":a&&e.ngForm?"ngForm":!1;return{pre:function(a,d,e,g){
// if `action` attr is not present on the form, prevent the default action (submission)
if(!("action"in e)){
// we can't use jq events because if a form is destroyed during submission the default
// action is not prevented. see #1238
//
// IE 9 is not affected because it doesn't fire a submit event and try to do a full
// page reload if the form was destroyed by submission of the form via a click handler
// on a button in the form. Looks like an IE9 specific bug.
var h=function(b){a.$apply(function(){g.$commitViewValue(),g.$setSubmitted()}),b.preventDefault()};Ad(d[0],"submit",h),
// unregister the preventDefault listener so that we don't not leak memory but in a
// way that will achieve the prevention of the default action.
d.on("$destroy",function(){b(function(){Bd(d[0],"submit",h)},0,!1)})}var i=g.$$parentForm;f&&(Kb(a,null,g.$name,g,g.$name),e.$observe(f,function(b){g.$name!==b&&(Kb(a,null,g.$name,c,g.$name),i.$$renameControl(g,b),Kb(a,null,g.$name,g,g.$name))})),d.on("$destroy",function(){i.$removeControl(g),f&&Kb(a,null,e[f],c,g.$name),l(g,Fe)})}}}};return d}]},Ie=He(),Je=He(!0),Ke=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Le=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Me=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Ne=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Oe=/^(\d{4})-(\d{2})-(\d{2})$/,Pe=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Qe=/^(\d{4})-W(\d\d)$/,Re=/^(\d{4})-(\d\d)$/,Se=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Te={/**
   * @ngdoc input
   * @name input[text]
   *
   * @description
   * Standard HTML text input with angular data binding, inherited by most of the `input` elements.
   *
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} required Adds `required` validation error key if the value is not entered.
   * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
   *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
   *    `required` when you want to data-bind to the `required` attribute.
   * @param {number=} ngMinlength Sets `minlength` validation error key if the value is shorter than
   *    minlength.
   * @param {number=} ngMaxlength Sets `maxlength` validation error key if the value is longer than
   *    maxlength. Setting the attribute to a negative or non-numeric value, allows view values of
   *    any length.
   * @param {string=} pattern Similar to `ngPattern` except that the attribute value is the actual string
   *    that contains the regular expression body that will be converted to a regular expression
   *    as in the ngPattern directive.
   * @param {string=} ngPattern Sets `pattern` validation error key if the ngModel value does not match
   *    a RegExp found by evaluating the Angular expression given in the attribute value.
   *    If the expression evaluates to a RegExp object then this is used directly.
   *    If the expression is a string then it will be converted to a RegExp after wrapping it in `^` and `$`
   *    characters. For instance, `"abc"` will be converted to `new RegExp('^abc$')`.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   * @param {boolean=} [ngTrim=true] If set to false Angular will not automatically trim the input.
   *    This parameter is ignored for input[type=password] controls, which will never trim the
   *    input.
   *
   * @example
      <example name="text-input-directive" module="textInputExample">
        <file name="index.html">
         <script>
           angular.module('textInputExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.example = {
                 text: 'guest',
                 word: /^\s*\w*\s*$/
               };
             }]);
         </script>
         <form name="myForm" ng-controller="ExampleController">
           Single word: <input type="text" name="input" ng-model="example.text"
                               ng-pattern="example.word" required ng-trim="false">
           <span class="error" ng-show="myForm.input.$error.required">
             Required!</span>
           <span class="error" ng-show="myForm.input.$error.pattern">
             Single word only!</span>

           <tt>text = {{example.text}}</tt><br/>
           <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
           <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
           <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
           <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
          </form>
        </file>
        <file name="protractor.js" type="protractor">
          var text = element(by.binding('example.text'));
          var valid = element(by.binding('myForm.input.$valid'));
          var input = element(by.model('example.text'));

          it('should initialize to model', function() {
            expect(text.getText()).toContain('guest');
            expect(valid.getText()).toContain('true');
          });

          it('should be invalid if empty', function() {
            input.clear();
            input.sendKeys('');

            expect(text.getText()).toEqual('text =');
            expect(valid.getText()).toContain('false');
          });

          it('should be invalid if multi word', function() {
            input.clear();
            input.sendKeys('hello world');

            expect(valid.getText()).toContain('false');
          });
        </file>
      </example>
   */
text:Fc,/**
     * @ngdoc input
     * @name input[date]
     *
     * @description
     * Input with date validation and transformation. In browsers that do not yet support
     * the HTML5 date input, a text element will be used. In that case, text must be entered in a valid ISO-8601
     * date format (yyyy-MM-dd), for example: `2009-01-06`. Since many
     * modern browsers do not yet support this input type, it is important to provide cues to users on the
     * expected input format via a placeholder or label.
     *
     * The model must always be a Date object, otherwise Angular will throw an error.
     * Invalid `Date` objects (dates whose `getTime()` is `NaN`) will be rendered as an empty string.
     *
     * The timezone to be used to read/write the `Date` instance in the model can be defined using
     * {@link ng.directive:ngModelOptions ngModelOptions}. By default, this is the timezone of the browser.
     *
     * @param {string} ngModel Assignable angular expression to data-bind to.
     * @param {string=} name Property name of the form under which the control is published.
     * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`. This must be a
     * valid ISO date string (yyyy-MM-dd).
     * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`. This must be
     * a valid ISO date string (yyyy-MM-dd).
     * @param {string=} required Sets `required` validation error key if the value is not entered.
     * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
     *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
     *    `required` when you want to data-bind to the `required` attribute.
     * @param {string=} ngChange Angular expression to be executed when input changes due to user
     *    interaction with the input element.
     *
     * @example
     <example name="date-input-directive" module="dateInputExample">
     <file name="index.html">
       <script>
          angular.module('dateInputExample', [])
            .controller('DateController', ['$scope', function($scope) {
              $scope.example = {
                value: new Date(2013, 9, 22)
              };
            }]);
       </script>
       <form name="myForm" ng-controller="DateController as dateCtrl">
          Pick a date in 2013:
          <input type="date" id="exampleInput" name="input" ng-model="example.value"
              placeholder="yyyy-MM-dd" min="2013-01-01" max="2013-12-31" required />
          <span class="error" ng-show="myForm.input.$error.required">
              Required!</span>
          <span class="error" ng-show="myForm.input.$error.date">
              Not a valid date!</span>
           <tt>value = {{example.value | date: "yyyy-MM-dd"}}</tt><br/>
           <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
           <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
           <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
           <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
       </form>
     </file>
     <file name="protractor.js" type="protractor">
        var value = element(by.binding('example.value | date: "yyyy-MM-dd"'));
        var valid = element(by.binding('myForm.input.$valid'));
        var input = element(by.model('example.value'));

        // currently protractor/webdriver does not support
        // sending keys to all known HTML5 input controls
        // for various browsers (see https://github.com/angular/protractor/issues/562).
        function setInput(val) {
          // set the value of the element and force validation.
          var scr = "var ipt = document.getElementById('exampleInput'); " +
          "ipt.value = '" + val + "';" +
          "angular.element(ipt).scope().$apply(function(s) { s.myForm[ipt.name].$setViewValue('" + val + "'); });";
          browser.executeScript(scr);
        }

        it('should initialize to model', function() {
          expect(value.getText()).toContain('2013-10-22');
          expect(valid.getText()).toContain('myForm.input.$valid = true');
        });

        it('should be invalid if empty', function() {
          setInput('');
          expect(value.getText()).toEqual('value =');
          expect(valid.getText()).toContain('myForm.input.$valid = false');
        });

        it('should be invalid if over max', function() {
          setInput('2015-01-01');
          expect(value.getText()).toContain('');
          expect(valid.getText()).toContain('myForm.input.$valid = false');
        });
     </file>
     </example>
     */
date:Jc("date",Oe,Ic(Oe,["yyyy","MM","dd"]),"yyyy-MM-dd"),/**
    * @ngdoc input
    * @name input[datetime-local]
    *
    * @description
    * Input with datetime validation and transformation. In browsers that do not yet support
    * the HTML5 date input, a text element will be used. In that case, the text must be entered in a valid ISO-8601
    * local datetime format (yyyy-MM-ddTHH:mm:ss), for example: `2010-12-28T14:57:00`.
    *
    * The model must always be a Date object, otherwise Angular will throw an error.
    * Invalid `Date` objects (dates whose `getTime()` is `NaN`) will be rendered as an empty string.
    *
    * The timezone to be used to read/write the `Date` instance in the model can be defined using
    * {@link ng.directive:ngModelOptions ngModelOptions}. By default, this is the timezone of the browser.
    *
    * @param {string} ngModel Assignable angular expression to data-bind to.
    * @param {string=} name Property name of the form under which the control is published.
    * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`. This must be a
    * valid ISO datetime format (yyyy-MM-ddTHH:mm:ss).
    * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`. This must be
    * a valid ISO datetime format (yyyy-MM-ddTHH:mm:ss).
    * @param {string=} required Sets `required` validation error key if the value is not entered.
    * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
    *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
    *    `required` when you want to data-bind to the `required` attribute.
    * @param {string=} ngChange Angular expression to be executed when input changes due to user
    *    interaction with the input element.
    *
    * @example
    <example name="datetimelocal-input-directive" module="dateExample">
    <file name="index.html">
      <script>
        angular.module('dateExample', [])
          .controller('DateController', ['$scope', function($scope) {
            $scope.example = {
              value: new Date(2010, 11, 28, 14, 57)
            };
          }]);
      </script>
      <form name="myForm" ng-controller="DateController as dateCtrl">
        Pick a date between in 2013:
        <input type="datetime-local" id="exampleInput" name="input" ng-model="example.value"
            placeholder="yyyy-MM-ddTHH:mm:ss" min="2001-01-01T00:00:00" max="2013-12-31T00:00:00" required />
        <span class="error" ng-show="myForm.input.$error.required">
            Required!</span>
        <span class="error" ng-show="myForm.input.$error.datetimelocal">
            Not a valid date!</span>
        <tt>value = {{example.value | date: "yyyy-MM-ddTHH:mm:ss"}}</tt><br/>
        <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
        <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
        <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
        <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
      </form>
    </file>
    <file name="protractor.js" type="protractor">
      var value = element(by.binding('example.value | date: "yyyy-MM-ddTHH:mm:ss"'));
      var valid = element(by.binding('myForm.input.$valid'));
      var input = element(by.model('example.value'));

      // currently protractor/webdriver does not support
      // sending keys to all known HTML5 input controls
      // for various browsers (https://github.com/angular/protractor/issues/562).
      function setInput(val) {
        // set the value of the element and force validation.
        var scr = "var ipt = document.getElementById('exampleInput'); " +
        "ipt.value = '" + val + "';" +
        "angular.element(ipt).scope().$apply(function(s) { s.myForm[ipt.name].$setViewValue('" + val + "'); });";
        browser.executeScript(scr);
      }

      it('should initialize to model', function() {
        expect(value.getText()).toContain('2010-12-28T14:57:00');
        expect(valid.getText()).toContain('myForm.input.$valid = true');
      });

      it('should be invalid if empty', function() {
        setInput('');
        expect(value.getText()).toEqual('value =');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });

      it('should be invalid if over max', function() {
        setInput('2015-01-01T23:59:00');
        expect(value.getText()).toContain('');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });
    </file>
    </example>
    */
"datetime-local":Jc("datetimelocal",Pe,Ic(Pe,["yyyy","MM","dd","HH","mm","ss","sss"]),"yyyy-MM-ddTHH:mm:ss.sss"),/**
   * @ngdoc input
   * @name input[time]
   *
   * @description
   * Input with time validation and transformation. In browsers that do not yet support
   * the HTML5 date input, a text element will be used. In that case, the text must be entered in a valid ISO-8601
   * local time format (HH:mm:ss), for example: `14:57:00`. Model must be a Date object. This binding will always output a
   * Date object to the model of January 1, 1970, or local date `new Date(1970, 0, 1, HH, mm, ss)`.
   *
   * The model must always be a Date object, otherwise Angular will throw an error.
   * Invalid `Date` objects (dates whose `getTime()` is `NaN`) will be rendered as an empty string.
   *
   * The timezone to be used to read/write the `Date` instance in the model can be defined using
   * {@link ng.directive:ngModelOptions ngModelOptions}. By default, this is the timezone of the browser.
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`. This must be a
   * valid ISO time format (HH:mm:ss).
   * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`. This must be a
   * valid ISO time format (HH:mm:ss).
   * @param {string=} required Sets `required` validation error key if the value is not entered.
   * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
   *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
   *    `required` when you want to data-bind to the `required` attribute.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   *
   * @example
   <example name="time-input-directive" module="timeExample">
   <file name="index.html">
     <script>
      angular.module('timeExample', [])
        .controller('DateController', ['$scope', function($scope) {
          $scope.example = {
            value: new Date(1970, 0, 1, 14, 57, 0)
          };
        }]);
     </script>
     <form name="myForm" ng-controller="DateController as dateCtrl">
        Pick a between 8am and 5pm:
        <input type="time" id="exampleInput" name="input" ng-model="example.value"
            placeholder="HH:mm:ss" min="08:00:00" max="17:00:00" required />
        <span class="error" ng-show="myForm.input.$error.required">
            Required!</span>
        <span class="error" ng-show="myForm.input.$error.time">
            Not a valid date!</span>
        <tt>value = {{example.value | date: "HH:mm:ss"}}</tt><br/>
        <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
        <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
        <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
        <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
     </form>
   </file>
   <file name="protractor.js" type="protractor">
      var value = element(by.binding('example.value | date: "HH:mm:ss"'));
      var valid = element(by.binding('myForm.input.$valid'));
      var input = element(by.model('example.value'));

      // currently protractor/webdriver does not support
      // sending keys to all known HTML5 input controls
      // for various browsers (https://github.com/angular/protractor/issues/562).
      function setInput(val) {
        // set the value of the element and force validation.
        var scr = "var ipt = document.getElementById('exampleInput'); " +
        "ipt.value = '" + val + "';" +
        "angular.element(ipt).scope().$apply(function(s) { s.myForm[ipt.name].$setViewValue('" + val + "'); });";
        browser.executeScript(scr);
      }

      it('should initialize to model', function() {
        expect(value.getText()).toContain('14:57:00');
        expect(valid.getText()).toContain('myForm.input.$valid = true');
      });

      it('should be invalid if empty', function() {
        setInput('');
        expect(value.getText()).toEqual('value =');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });

      it('should be invalid if over max', function() {
        setInput('23:59:00');
        expect(value.getText()).toContain('');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });
   </file>
   </example>
   */
time:Jc("time",Se,Ic(Se,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),/**
    * @ngdoc input
    * @name input[week]
    *
    * @description
    * Input with week-of-the-year validation and transformation to Date. In browsers that do not yet support
    * the HTML5 week input, a text element will be used. In that case, the text must be entered in a valid ISO-8601
    * week format (yyyy-W##), for example: `2013-W02`.
    *
    * The model must always be a Date object, otherwise Angular will throw an error.
    * Invalid `Date` objects (dates whose `getTime()` is `NaN`) will be rendered as an empty string.
    *
    * The timezone to be used to read/write the `Date` instance in the model can be defined using
    * {@link ng.directive:ngModelOptions ngModelOptions}. By default, this is the timezone of the browser.
    *
    * @param {string} ngModel Assignable angular expression to data-bind to.
    * @param {string=} name Property name of the form under which the control is published.
    * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`. This must be a
    * valid ISO week format (yyyy-W##).
    * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`. This must be
    * a valid ISO week format (yyyy-W##).
    * @param {string=} required Sets `required` validation error key if the value is not entered.
    * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
    *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
    *    `required` when you want to data-bind to the `required` attribute.
    * @param {string=} ngChange Angular expression to be executed when input changes due to user
    *    interaction with the input element.
    *
    * @example
    <example name="week-input-directive" module="weekExample">
    <file name="index.html">
      <script>
      angular.module('weekExample', [])
        .controller('DateController', ['$scope', function($scope) {
          $scope.example = {
            value: new Date(2013, 0, 3)
          };
        }]);
      </script>
      <form name="myForm" ng-controller="DateController as dateCtrl">
        Pick a date between in 2013:
        <input id="exampleInput" type="week" name="input" ng-model="example.value"
            placeholder="YYYY-W##" min="2012-W32" max="2013-W52" required />
        <span class="error" ng-show="myForm.input.$error.required">
            Required!</span>
        <span class="error" ng-show="myForm.input.$error.week">
            Not a valid date!</span>
        <tt>value = {{example.value | date: "yyyy-Www"}}</tt><br/>
        <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
        <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
        <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
        <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
      </form>
    </file>
    <file name="protractor.js" type="protractor">
      var value = element(by.binding('example.value | date: "yyyy-Www"'));
      var valid = element(by.binding('myForm.input.$valid'));
      var input = element(by.model('example.value'));

      // currently protractor/webdriver does not support
      // sending keys to all known HTML5 input controls
      // for various browsers (https://github.com/angular/protractor/issues/562).
      function setInput(val) {
        // set the value of the element and force validation.
        var scr = "var ipt = document.getElementById('exampleInput'); " +
        "ipt.value = '" + val + "';" +
        "angular.element(ipt).scope().$apply(function(s) { s.myForm[ipt.name].$setViewValue('" + val + "'); });";
        browser.executeScript(scr);
      }

      it('should initialize to model', function() {
        expect(value.getText()).toContain('2013-W01');
        expect(valid.getText()).toContain('myForm.input.$valid = true');
      });

      it('should be invalid if empty', function() {
        setInput('');
        expect(value.getText()).toEqual('value =');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });

      it('should be invalid if over max', function() {
        setInput('2015-W01');
        expect(value.getText()).toContain('');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });
    </file>
    </example>
    */
week:Jc("week",Qe,Hc,"yyyy-Www"),/**
   * @ngdoc input
   * @name input[month]
   *
   * @description
   * Input with month validation and transformation. In browsers that do not yet support
   * the HTML5 month input, a text element will be used. In that case, the text must be entered in a valid ISO-8601
   * month format (yyyy-MM), for example: `2009-01`.
   *
   * The model must always be a Date object, otherwise Angular will throw an error.
   * Invalid `Date` objects (dates whose `getTime()` is `NaN`) will be rendered as an empty string.
   * If the model is not set to the first of the month, the next view to model update will set it
   * to the first of the month.
   *
   * The timezone to be used to read/write the `Date` instance in the model can be defined using
   * {@link ng.directive:ngModelOptions ngModelOptions}. By default, this is the timezone of the browser.
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`. This must be
   * a valid ISO month format (yyyy-MM).
   * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`. This must
   * be a valid ISO month format (yyyy-MM).
   * @param {string=} required Sets `required` validation error key if the value is not entered.
   * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
   *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
   *    `required` when you want to data-bind to the `required` attribute.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   *
   * @example
   <example name="month-input-directive" module="monthExample">
   <file name="index.html">
     <script>
      angular.module('monthExample', [])
        .controller('DateController', ['$scope', function($scope) {
          $scope.example = {
            value: new Date(2013, 9, 1)
          };
        }]);
     </script>
     <form name="myForm" ng-controller="DateController as dateCtrl">
       Pick a month in 2013:
       <input id="exampleInput" type="month" name="input" ng-model="example.value"
          placeholder="yyyy-MM" min="2013-01" max="2013-12" required />
       <span class="error" ng-show="myForm.input.$error.required">
          Required!</span>
       <span class="error" ng-show="myForm.input.$error.month">
          Not a valid month!</span>
       <tt>value = {{example.value | date: "yyyy-MM"}}</tt><br/>
       <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
       <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
       <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
       <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
     </form>
   </file>
   <file name="protractor.js" type="protractor">
      var value = element(by.binding('example.value | date: "yyyy-MM"'));
      var valid = element(by.binding('myForm.input.$valid'));
      var input = element(by.model('example.value'));

      // currently protractor/webdriver does not support
      // sending keys to all known HTML5 input controls
      // for various browsers (https://github.com/angular/protractor/issues/562).
      function setInput(val) {
        // set the value of the element and force validation.
        var scr = "var ipt = document.getElementById('exampleInput'); " +
        "ipt.value = '" + val + "';" +
        "angular.element(ipt).scope().$apply(function(s) { s.myForm[ipt.name].$setViewValue('" + val + "'); });";
        browser.executeScript(scr);
      }

      it('should initialize to model', function() {
        expect(value.getText()).toContain('2013-10');
        expect(valid.getText()).toContain('myForm.input.$valid = true');
      });

      it('should be invalid if empty', function() {
        setInput('');
        expect(value.getText()).toEqual('value =');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });

      it('should be invalid if over max', function() {
        setInput('2015-01');
        expect(value.getText()).toContain('');
        expect(valid.getText()).toContain('myForm.input.$valid = false');
      });
   </file>
   </example>
   */
month:Jc("month",Re,Ic(Re,["yyyy","MM"]),"yyyy-MM"),/**
   * @ngdoc input
   * @name input[number]
   *
   * @description
   * Text input with number validation and transformation. Sets the `number` validation
   * error if not a valid number.
   *
   * The model must always be a number, otherwise Angular will throw an error.
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} min Sets the `min` validation error key if the value entered is less than `min`.
   * @param {string=} max Sets the `max` validation error key if the value entered is greater than `max`.
   * @param {string=} required Sets `required` validation error key if the value is not entered.
   * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
   *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
   *    `required` when you want to data-bind to the `required` attribute.
   * @param {number=} ngMinlength Sets `minlength` validation error key if the value is shorter than
   *    minlength.
   * @param {number=} ngMaxlength Sets `maxlength` validation error key if the value is longer than
   *    maxlength. Setting the attribute to a negative or non-numeric value, allows view values of
   *    any length.
   * @param {string=} pattern Similar to `ngPattern` except that the attribute value is the actual string
   *    that contains the regular expression body that will be converted to a regular expression
   *    as in the ngPattern directive.
   * @param {string=} ngPattern Sets `pattern` validation error key if the ngModel value does not match
   *    a RegExp found by evaluating the Angular expression given in the attribute value.
   *    If the expression evaluates to a RegExp object then this is used directly.
   *    If the expression is a string then it will be converted to a RegExp after wrapping it in `^` and `$`
   *    characters. For instance, `"abc"` will be converted to `new RegExp('^abc$')`.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   *
   * @example
      <example name="number-input-directive" module="numberExample">
        <file name="index.html">
         <script>
           angular.module('numberExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.example = {
                 value: 12
               };
             }]);
         </script>
         <form name="myForm" ng-controller="ExampleController">
           Number: <input type="number" name="input" ng-model="example.value"
                          min="0" max="99" required>
           <span class="error" ng-show="myForm.input.$error.required">
             Required!</span>
           <span class="error" ng-show="myForm.input.$error.number">
             Not valid number!</span>
           <tt>value = {{example.value}}</tt><br/>
           <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
           <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
           <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
           <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
          </form>
        </file>
        <file name="protractor.js" type="protractor">
          var value = element(by.binding('example.value'));
          var valid = element(by.binding('myForm.input.$valid'));
          var input = element(by.model('example.value'));

          it('should initialize to model', function() {
            expect(value.getText()).toContain('12');
            expect(valid.getText()).toContain('true');
          });

          it('should be invalid if empty', function() {
            input.clear();
            input.sendKeys('');
            expect(value.getText()).toEqual('value =');
            expect(valid.getText()).toContain('false');
          });

          it('should be invalid if over max', function() {
            input.clear();
            input.sendKeys('123');
            expect(value.getText()).toEqual('value =');
            expect(valid.getText()).toContain('false');
          });
        </file>
      </example>
   */
number:Lc,/**
   * @ngdoc input
   * @name input[url]
   *
   * @description
   * Text input with URL validation. Sets the `url` validation error key if the content is not a
   * valid URL.
   *
   * <div class="alert alert-warning">
   * **Note:** `input[url]` uses a regex to validate urls that is derived from the regex
   * used in Chromium. If you need stricter validation, you can use `ng-pattern` or modify
   * the built-in validators (see the {@link guide/forms Forms guide})
   * </div>
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} required Sets `required` validation error key if the value is not entered.
   * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
   *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
   *    `required` when you want to data-bind to the `required` attribute.
   * @param {number=} ngMinlength Sets `minlength` validation error key if the value is shorter than
   *    minlength.
   * @param {number=} ngMaxlength Sets `maxlength` validation error key if the value is longer than
   *    maxlength. Setting the attribute to a negative or non-numeric value, allows view values of
   *    any length.
   * @param {string=} pattern Similar to `ngPattern` except that the attribute value is the actual string
   *    that contains the regular expression body that will be converted to a regular expression
   *    as in the ngPattern directive.
   * @param {string=} ngPattern Sets `pattern` validation error key if the ngModel value does not match
   *    a RegExp found by evaluating the Angular expression given in the attribute value.
   *    If the expression evaluates to a RegExp object then this is used directly.
   *    If the expression is a string then it will be converted to a RegExp after wrapping it in `^` and `$`
   *    characters. For instance, `"abc"` will be converted to `new RegExp('^abc$')`.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   *
   * @example
      <example name="url-input-directive" module="urlExample">
        <file name="index.html">
         <script>
           angular.module('urlExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.url = {
                 text: 'http://google.com'
               };
             }]);
         </script>
         <form name="myForm" ng-controller="ExampleController">
           URL: <input type="url" name="input" ng-model="url.text" required>
           <span class="error" ng-show="myForm.input.$error.required">
             Required!</span>
           <span class="error" ng-show="myForm.input.$error.url">
             Not valid url!</span>
           <tt>text = {{url.text}}</tt><br/>
           <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
           <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
           <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
           <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
           <tt>myForm.$error.url = {{!!myForm.$error.url}}</tt><br/>
          </form>
        </file>
        <file name="protractor.js" type="protractor">
          var text = element(by.binding('url.text'));
          var valid = element(by.binding('myForm.input.$valid'));
          var input = element(by.model('url.text'));

          it('should initialize to model', function() {
            expect(text.getText()).toContain('http://google.com');
            expect(valid.getText()).toContain('true');
          });

          it('should be invalid if empty', function() {
            input.clear();
            input.sendKeys('');

            expect(text.getText()).toEqual('text =');
            expect(valid.getText()).toContain('false');
          });

          it('should be invalid if not url', function() {
            input.clear();
            input.sendKeys('box');

            expect(valid.getText()).toContain('false');
          });
        </file>
      </example>
   */
url:Mc,/**
   * @ngdoc input
   * @name input[email]
   *
   * @description
   * Text input with email validation. Sets the `email` validation error key if not a valid email
   * address.
   *
   * <div class="alert alert-warning">
   * **Note:** `input[email]` uses a regex to validate email addresses that is derived from the regex
   * used in Chromium. If you need stricter validation (e.g. requiring a top-level domain), you can
   * use `ng-pattern` or modify the built-in validators (see the {@link guide/forms Forms guide})
   * </div>
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} required Sets `required` validation error key if the value is not entered.
   * @param {string=} ngRequired Adds `required` attribute and `required` validation constraint to
   *    the element when the ngRequired expression evaluates to true. Use `ngRequired` instead of
   *    `required` when you want to data-bind to the `required` attribute.
   * @param {number=} ngMinlength Sets `minlength` validation error key if the value is shorter than
   *    minlength.
   * @param {number=} ngMaxlength Sets `maxlength` validation error key if the value is longer than
   *    maxlength. Setting the attribute to a negative or non-numeric value, allows view values of
   *    any length.
   * @param {string=} pattern Similar to `ngPattern` except that the attribute value is the actual string
   *    that contains the regular expression body that will be converted to a regular expression
   *    as in the ngPattern directive.
   * @param {string=} ngPattern Sets `pattern` validation error key if the ngModel value does not match
   *    a RegExp found by evaluating the Angular expression given in the attribute value.
   *    If the expression evaluates to a RegExp object then this is used directly.
   *    If the expression is a string then it will be converted to a RegExp after wrapping it in `^` and `$`
   *    characters. For instance, `"abc"` will be converted to `new RegExp('^abc$')`.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   *
   * @example
      <example name="email-input-directive" module="emailExample">
        <file name="index.html">
         <script>
           angular.module('emailExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.email = {
                 text: 'me@example.com'
               };
             }]);
         </script>
           <form name="myForm" ng-controller="ExampleController">
             Email: <input type="email" name="input" ng-model="email.text" required>
             <span class="error" ng-show="myForm.input.$error.required">
               Required!</span>
             <span class="error" ng-show="myForm.input.$error.email">
               Not valid email!</span>
             <tt>text = {{email.text}}</tt><br/>
             <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/>
             <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/>
             <tt>myForm.$valid = {{myForm.$valid}}</tt><br/>
             <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/>
             <tt>myForm.$error.email = {{!!myForm.$error.email}}</tt><br/>
           </form>
         </file>
        <file name="protractor.js" type="protractor">
          var text = element(by.binding('email.text'));
          var valid = element(by.binding('myForm.input.$valid'));
          var input = element(by.model('email.text'));

          it('should initialize to model', function() {
            expect(text.getText()).toContain('me@example.com');
            expect(valid.getText()).toContain('true');
          });

          it('should be invalid if empty', function() {
            input.clear();
            input.sendKeys('');
            expect(text.getText()).toEqual('text =');
            expect(valid.getText()).toContain('false');
          });

          it('should be invalid if not email', function() {
            input.clear();
            input.sendKeys('xxx');

            expect(valid.getText()).toContain('false');
          });
        </file>
      </example>
   */
email:Nc,/**
   * @ngdoc input
   * @name input[radio]
   *
   * @description
   * HTML radio button.
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string} value The value to which the expression should be set when selected.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   * @param {string} ngValue Angular expression which sets the value to which the expression should
   *    be set when selected.
   *
   * @example
      <example name="radio-input-directive" module="radioExample">
        <file name="index.html">
         <script>
           angular.module('radioExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.color = {
                 name: 'blue'
               };
               $scope.specialValue = {
                 "id": "12345",
                 "value": "green"
               };
             }]);
         </script>
         <form name="myForm" ng-controller="ExampleController">
           <input type="radio" ng-model="color.name" value="red">  Red <br/>
           <input type="radio" ng-model="color.name" ng-value="specialValue"> Green <br/>
           <input type="radio" ng-model="color.name" value="blue"> Blue <br/>
           <tt>color = {{color.name | json}}</tt><br/>
          </form>
          Note that `ng-value="specialValue"` sets radio item's value to be the value of `$scope.specialValue`.
        </file>
        <file name="protractor.js" type="protractor">
          it('should change state', function() {
            var color = element(by.binding('color.name'));

            expect(color.getText()).toContain('blue');

            element.all(by.model('color.name')).get(0).click();

            expect(color.getText()).toContain('red');
          });
        </file>
      </example>
   */
radio:Oc,/**
   * @ngdoc input
   * @name input[checkbox]
   *
   * @description
   * HTML checkbox.
   *
   * @param {string} ngModel Assignable angular expression to data-bind to.
   * @param {string=} name Property name of the form under which the control is published.
   * @param {expression=} ngTrueValue The value to which the expression should be set when selected.
   * @param {expression=} ngFalseValue The value to which the expression should be set when not selected.
   * @param {string=} ngChange Angular expression to be executed when input changes due to user
   *    interaction with the input element.
   *
   * @example
      <example name="checkbox-input-directive" module="checkboxExample">
        <file name="index.html">
         <script>
           angular.module('checkboxExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.checkboxModel = {
                value1 : true,
                value2 : 'YES'
              };
             }]);
         </script>
         <form name="myForm" ng-controller="ExampleController">
           Value1: <input type="checkbox" ng-model="checkboxModel.value1"> <br/>
           Value2: <input type="checkbox" ng-model="checkboxModel.value2"
                          ng-true-value="'YES'" ng-false-value="'NO'"> <br/>
           <tt>value1 = {{checkboxModel.value1}}</tt><br/>
           <tt>value2 = {{checkboxModel.value2}}</tt><br/>
          </form>
        </file>
        <file name="protractor.js" type="protractor">
          it('should change state', function() {
            var value1 = element(by.binding('checkboxModel.value1'));
            var value2 = element(by.binding('checkboxModel.value2'));

            expect(value1.getText()).toContain('true');
            expect(value2.getText()).toContain('YES');

            element(by.model('checkboxModel.value1')).click();
            element(by.model('checkboxModel.value2')).click();

            expect(value1.getText()).toContain('false');
            expect(value2.getText()).toContain('NO');
          });
        </file>
      </example>
   */
checkbox:Qc,hidden:o,button:o,submit:o,reset:o,file:o},Ue=["$browser","$sniffer","$filter","$parse",function(a,b,c,d){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,h){h[0]&&(Te[Wc(g.type)]||Te.text)(e,f,g,h[0],b,a,c,d)}}}}],Ve=/^(true|false|\d+)$/,We=function(){return{restrict:"A",priority:100,compile:function(a,b){return Ve.test(b.ngValue)?function(a,b,c){c.$set("value",a.$eval(c.ngValue))}:function(a,b,c){a.$watch(c.ngValue,function(a){c.$set("value",a)})}}}},Xe=["$compile",function(a){return{restrict:"AC",compile:function(b){return a.$$addBindingClass(b),function(b,d,e){a.$$addBindingInfo(d,e.ngBind),d=d[0],b.$watch(e.ngBind,function(a){d.textContent=a===c?"":a})}}}}],Ye=["$interpolate","$compile",function(a,b){return{compile:function(d){return b.$$addBindingClass(d),function(d,e,f){var g=a(e.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(e,g.expressions),e=e[0],f.$observe("ngBindTemplate",function(a){e.textContent=a===c?"":a})}}}}],Ze=["$sce","$parse","$compile",function(a,b,c){return{restrict:"A",compile:function(d,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(a){return(a||"").toString()});return c.$$addBindingClass(d),function(b,d,e){c.$$addBindingInfo(d,e.ngBindHtml),b.$watch(g,function(){
// we re-evaluate the expr because we want a TrustedValueHolderType
// for $sce, not a string
d.html(a.getTrustedHtml(f(b))||"")})}}}}],$e=q({restrict:"A",require:"ngModel",link:function(a,b,c,d){d.$viewChangeListeners.push(function(){a.$eval(c.ngChange)})}}),_e=Rc("",!0),af=Rc("Odd",0),bf=Rc("Even",1),cf=Bc({compile:function(a,b){b.$set("ngCloak",c),a.removeClass("ng-cloak")}}),df=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],ef={},ff={blur:!0,focus:!0};f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=$a("ng-"+a);ef[b]=["$parse","$rootScope",function(c,d){return{restrict:"A",compile:function(e,f){
// We expose the powerful $event object on the scope that provides access to the Window,
// etc. that isn't protected by the fast paths in $parse.  We explicitly request better
// checks at the cost of speed since event handler expressions are not executed as
// frequently as regular change detection.
var g=c(f[b],/* interceptorFn */null,/* expensiveChecks */!0);return function(b,c){c.on(a,function(c){var e=function(){g(b,{$event:c})};ff[a]&&d.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});/**
 * @ngdoc directive
 * @name ngDblclick
 *
 * @description
 * The `ngDblclick` directive allows you to specify custom behavior on a dblclick event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngDblclick {@link guide/expression Expression} to evaluate upon
 * a dblclick. (The Event object is available as `$event`)
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-dblclick="count = count + 1" ng-init="count=0">
        Increment (on double click)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngMousedown
 *
 * @description
 * The ngMousedown directive allows you to specify custom behavior on mousedown event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMousedown {@link guide/expression Expression} to evaluate upon
 * mousedown. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-mousedown="count = count + 1" ng-init="count=0">
        Increment (on mouse down)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngMouseup
 *
 * @description
 * Specify custom behavior on mouseup event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseup {@link guide/expression Expression} to evaluate upon
 * mouseup. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-mouseup="count = count + 1" ng-init="count=0">
        Increment (on mouse up)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngMouseover
 *
 * @description
 * Specify custom behavior on mouseover event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseover {@link guide/expression Expression} to evaluate upon
 * mouseover. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-mouseover="count = count + 1" ng-init="count=0">
        Increment (when mouse is over)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngMouseenter
 *
 * @description
 * Specify custom behavior on mouseenter event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseenter {@link guide/expression Expression} to evaluate upon
 * mouseenter. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-mouseenter="count = count + 1" ng-init="count=0">
        Increment (when mouse enters)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngMouseleave
 *
 * @description
 * Specify custom behavior on mouseleave event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseleave {@link guide/expression Expression} to evaluate upon
 * mouseleave. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-mouseleave="count = count + 1" ng-init="count=0">
        Increment (when mouse leaves)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngMousemove
 *
 * @description
 * Specify custom behavior on mousemove event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMousemove {@link guide/expression Expression} to evaluate upon
 * mousemove. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <button ng-mousemove="count = count + 1" ng-init="count=0">
        Increment (when mouse moves)
      </button>
      count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngKeydown
 *
 * @description
 * Specify custom behavior on keydown event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngKeydown {@link guide/expression Expression} to evaluate upon
 * keydown. (Event object is available as `$event` and can be interrogated for keyCode, altKey, etc.)
 *
 * @example
   <example>
     <file name="index.html">
      <input ng-keydown="count = count + 1" ng-init="count=0">
      key down count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngKeyup
 *
 * @description
 * Specify custom behavior on keyup event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngKeyup {@link guide/expression Expression} to evaluate upon
 * keyup. (Event object is available as `$event` and can be interrogated for keyCode, altKey, etc.)
 *
 * @example
   <example>
     <file name="index.html">
       <p>Typing in the input box below updates the key count</p>
       <input ng-keyup="count = count + 1" ng-init="count=0"> key up count: {{count}}

       <p>Typing in the input box below updates the keycode</p>
       <input ng-keyup="event=$event">
       <p>event keyCode: {{ event.keyCode }}</p>
       <p>event altKey: {{ event.altKey }}</p>
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngKeypress
 *
 * @description
 * Specify custom behavior on keypress event.
 *
 * @element ANY
 * @param {expression} ngKeypress {@link guide/expression Expression} to evaluate upon
 * keypress. ({@link guide/expression#-event- Event object is available as `$event`}
 * and can be interrogated for keyCode, altKey, etc.)
 *
 * @example
   <example>
     <file name="index.html">
      <input ng-keypress="count = count + 1" ng-init="count=0">
      key press count: {{count}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngSubmit
 *
 * @description
 * Enables binding angular expressions to onsubmit events.
 *
 * Additionally it prevents the default action (which for form means sending the request to the
 * server and reloading the current page), but only if the form does not contain `action`,
 * `data-action`, or `x-action` attributes.
 *
 * <div class="alert alert-warning">
 * **Warning:** Be careful not to cause "double-submission" by using both the `ngClick` and
 * `ngSubmit` handlers together. See the
 * {@link form#submitting-a-form-and-preventing-the-default-action `form` directive documentation}
 * for a detailed discussion of when `ngSubmit` may be triggered.
 * </div>
 *
 * @element form
 * @priority 0
 * @param {expression} ngSubmit {@link guide/expression Expression} to eval.
 * ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example module="submitExample">
     <file name="index.html">
      <script>
        angular.module('submitExample', [])
          .controller('ExampleController', ['$scope', function($scope) {
            $scope.list = [];
            $scope.text = 'hello';
            $scope.submit = function() {
              if ($scope.text) {
                $scope.list.push(this.text);
                $scope.text = '';
              }
            };
          }]);
      </script>
      <form ng-submit="submit()" ng-controller="ExampleController">
        Enter text and hit enter:
        <input type="text" ng-model="text" name="text" />
        <input type="submit" id="submit" value="Submit" />
        <pre>list={{list}}</pre>
      </form>
     </file>
     <file name="protractor.js" type="protractor">
       it('should check ng-submit', function() {
         expect(element(by.binding('list')).getText()).toBe('list=[]');
         element(by.css('#submit')).click();
         expect(element(by.binding('list')).getText()).toContain('hello');
         expect(element(by.model('text')).getAttribute('value')).toBe('');
       });
       it('should ignore empty strings', function() {
         expect(element(by.binding('list')).getText()).toBe('list=[]');
         element(by.css('#submit')).click();
         element(by.css('#submit')).click();
         expect(element(by.binding('list')).getText()).toContain('hello');
        });
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngFocus
 *
 * @description
 * Specify custom behavior on focus event.
 *
 * Note: As the `focus` event is executed synchronously when calling `input.focus()`
 * AngularJS executes the expression using `scope.$evalAsync` if the event is fired
 * during an `$apply` to ensure a consistent state.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngFocus {@link guide/expression Expression} to evaluate upon
 * focus. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
 * See {@link ng.directive:ngClick ngClick}
 */
/**
 * @ngdoc directive
 * @name ngBlur
 *
 * @description
 * Specify custom behavior on blur event.
 *
 * A [blur event](https://developer.mozilla.org/en-US/docs/Web/Events/blur) fires when
 * an element has lost focus.
 *
 * Note: As the `blur` event is executed synchronously also during DOM manipulations
 * (e.g. removing a focussed input),
 * AngularJS executes the expression using `scope.$evalAsync` if the event is fired
 * during an `$apply` to ensure a consistent state.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngBlur {@link guide/expression Expression} to evaluate upon
 * blur. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
 * See {@link ng.directive:ngClick ngClick}
 */
/**
 * @ngdoc directive
 * @name ngCopy
 *
 * @description
 * Specify custom behavior on copy event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngCopy {@link guide/expression Expression} to evaluate upon
 * copy. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <input ng-copy="copied=true" ng-init="copied=false; value='copy me'" ng-model="value">
      copied: {{copied}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngCut
 *
 * @description
 * Specify custom behavior on cut event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngCut {@link guide/expression Expression} to evaluate upon
 * cut. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <input ng-cut="cut=true" ng-init="cut=false; value='cut me'" ng-model="value">
      cut: {{cut}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngPaste
 *
 * @description
 * Specify custom behavior on paste event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngPaste {@link guide/expression Expression} to evaluate upon
 * paste. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
   <example>
     <file name="index.html">
      <input ng-paste="paste=true" ng-init="paste=false" placeholder='paste here'>
      pasted: {{paste}}
     </file>
   </example>
 */
/**
 * @ngdoc directive
 * @name ngIf
 * @restrict A
 *
 * @description
 * The `ngIf` directive removes or recreates a portion of the DOM tree based on an
 * {expression}. If the expression assigned to `ngIf` evaluates to a false
 * value then the element is removed from the DOM, otherwise a clone of the
 * element is reinserted into the DOM.
 *
 * `ngIf` differs from `ngShow` and `ngHide` in that `ngIf` completely removes and recreates the
 * element in the DOM rather than changing its visibility via the `display` css property.  A common
 * case when this difference is significant is when using css selectors that rely on an element's
 * position within the DOM, such as the `:first-child` or `:last-child` pseudo-classes.
 *
 * Note that when an element is removed using `ngIf` its scope is destroyed and a new scope
 * is created when the element is restored.  The scope created within `ngIf` inherits from
 * its parent scope using
 * [prototypal inheritance](https://github.com/angular/angular.js/wiki/Understanding-Scopes#javascript-prototypal-inheritance).
 * An important implication of this is if `ngModel` is used within `ngIf` to bind to
 * a javascript primitive defined in the parent scope. In this case any modifications made to the
 * variable within the child scope will override (hide) the value in the parent scope.
 *
 * Also, `ngIf` recreates elements using their compiled state. An example of this behavior
 * is if an element's class attribute is directly modified after it's compiled, using something like
 * jQuery's `.addClass()` method, and the element is later removed. When `ngIf` recreates the element
 * the added class will be lost because the original compiled state is used to regenerate the element.
 *
 * Additionally, you can provide animations via the `ngAnimate` module to animate the `enter`
 * and `leave` effects.
 *
 * @animations
 * enter - happens just after the `ngIf` contents change and a new DOM element is created and injected into the `ngIf` container
 * leave - happens just before the `ngIf` contents are removed from the DOM
 *
 * @element ANY
 * @scope
 * @priority 600
 * @param {expression} ngIf If the {@link guide/expression expression} is falsy then
 *     the element is removed from the DOM tree. If it is truthy a copy of the compiled
 *     element is added to the DOM tree.
 *
 * @example
  <example module="ngAnimate" deps="angular-animate.js" animations="true">
    <file name="index.html">
      Click me: <input type="checkbox" ng-model="checked" ng-init="checked=true" /><br/>
      Show when checked:
      <span ng-if="checked" class="animate-if">
        This is removed when the checkbox is unchecked.
      </span>
    </file>
    <file name="animations.css">
      .animate-if {
        background:white;
        border:1px solid black;
        padding:10px;
      }

      .animate-if.ng-enter, .animate-if.ng-leave {
        -webkit-transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;
        transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;
      }

      .animate-if.ng-enter,
      .animate-if.ng-leave.ng-leave-active {
        opacity:0;
      }

      .animate-if.ng-leave,
      .animate-if.ng-enter.ng-enter-active {
        opacity:1;
      }
    </file>
  </example>
 */
var gf=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,i,j;c.$watch(e.ngIf,function(c){c?i||g(function(c,f){i=f,c[c.length++]=b.createComment(" end ngIf: "+e.ngIf+" "),
// Note: We only need the first/last node of the cloned nodes.
// However, we need to keep the reference to the jqlite wrapper as it might be changed later
// by a directive with templateUrl when its template arrives.
h={clone:c},a.enter(c,d.parent(),d)}):(j&&(j.remove(),j=null),i&&(i.$destroy(),i=null),h&&(j=ia(h.clone),a.leave(j).then(function(){j=null}),h=null))})}}}],hf=["$templateRequest","$anchorScroll","$animate","$sce",function(a,b,c,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:id.noop,compile:function(e,f){var g=f.ngInclude||f.src,h=f.onload||"",i=f.autoscroll;return function(e,f,j,k,l){var m,n,o,p=0,q=function(){n&&(n.remove(),n=null),m&&(m.$destroy(),m=null),o&&(c.leave(o).then(function(){n=null}),n=o,o=null)};e.$watch(d.parseAsResourceUrl(g),function(d){var g=function(){!s(i)||i&&!e.$eval(i)||b()},j=++p;d?(
//set the 2nd param to true to ignore the template request error so that the inner
//contents and scope can be cleaned up.
a(d,!0).then(function(a){if(j===p){var b=e.$new();k.template=a;
// Note: This will also link all children of ng-include that were contained in the original
// html. If that content contains controllers, ... they could pollute/change the scope.
// However, using ng-include on an element with additional content does not make sense...
// Note: We can't remove them in the cloneAttchFn of $transclude as that
// function is called before linking the content, which would apply child
// directives to non existing elements.
var i=l(b,function(a){q(),c.enter(a,null,f).then(g)});m=b,o=i,m.$emit("$includeContentLoaded",d),e.$eval(h)}},function(){j===p&&(q(),e.$emit("$includeContentError",d))}),e.$emit("$includeContentRequested",d)):(q(),k.template=null)})}}}}],jf=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){
// WebKit: https://bugs.webkit.org/show_bug.cgi?id=135698 --- SVG elements do not
// support innerHTML, so detect this here and try to generate the contents
// specially.
return/SVG/.test(d[0].toString())?(d.empty(),void a(sa(f.template,b).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),void a(d.contents())(c))}}}],kf=Bc({priority:450,compile:function(){return{pre:function(a,b,c){a.$eval(c.ngInit)}}}}),lf=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,e){
// We want to control whitespace trimming so we use this convoluted approach
// to access the ngList attribute, which doesn't pre-trim the attribute
var g=b.attr(d.$attr.ngList)||", ",h="false"!==d.ngTrim,i=h?md(g):g,j=function(a){
// If the viewValue is invalid (say required but empty) it will be `undefined`
if(!r(a)){var b=[];return a&&f(a.split(i),function(a){a&&b.push(h?md(a):a)}),b}};e.$parsers.push(j),e.$formatters.push(function(a){return ld(a)?a.join(g):c}),
// Override the standard $isEmpty because an empty array means the input is empty.
e.$isEmpty=function(a){return!a||!a.length}}}},mf="ng-valid",nf="ng-invalid",of="ng-pristine",pf="ng-dirty",qf="ng-untouched",rf="ng-touched",sf="ng-pending",tf=new d("ngModel"),uf=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,e,g,h,i,j,k,l){this.$viewValue=Number.NaN,this.$modelValue=Number.NaN,this.$$rawModelValue=c,// stores the parsed modelValue / model set from scope regardless of validity.
this.$validators={},this.$asyncValidators={},this.$parsers=[],this.$formatters=[],this.$viewChangeListeners=[],this.$untouched=!0,this.$touched=!1,this.$pristine=!0,this.$dirty=!1,this.$valid=!0,this.$invalid=!1,this.$error={},// keep invalid keys here
this.$$success={},// keep valid keys here
this.$pending=c,// keep pending keys here
this.$name=l(d.name||"",!1)(a);var m,n=g(d.ngModel),p=n.assign,q=n,t=p,u=null,w=this;this.$$setOptions=function(a){if(w.$options=a,a&&a.getterSetter){var b=g(d.ngModel+"()"),c=g(d.ngModel+"($$$p)");q=function(a){var c=n(a);return x(c)&&(c=b(a)),c},t=function(a,b){x(n(a))?c(a,{$$$p:w.$modelValue}):p(a,w.$modelValue)}}else if(!n.assign)throw tf("nonassign","Expression '{0}' is non-assignable. Element: {1}",d.ngModel,T(e))},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$render
   *
   * @description
   * Called when the view needs to be updated. It is expected that the user of the ng-model
   * directive will implement this method.
   *
   * The `$render()` method is invoked in the following situations:
   *
   * * `$rollbackViewValue()` is called.  If we are rolling back the view value to the last
   *   committed value then `$render()` is called to update the input control.
   * * The value referenced by `ng-model` is changed programmatically and both the `$modelValue` and
   *   the `$viewValue` are different to last time.
   *
   * Since `ng-model` does not do a deep watch, `$render()` is only invoked if the values of
   * `$modelValue` and `$viewValue` are actually different to their previous value. If `$modelValue`
   * or `$viewValue` are objects (rather than a string or number) then `$render()` will not be
   * invoked if you only change a property on the objects.
   */
this.$render=o,/**
   * @ngdoc method
   * @name ngModel.NgModelController#$isEmpty
   *
   * @description
   * This is called when we need to determine if the value of an input is empty.
   *
   * For instance, the required directive does this to work out if the input has data or not.
   *
   * The default `$isEmpty` function checks whether the value is `undefined`, `''`, `null` or `NaN`.
   *
   * You can override this for input directives whose concept of being empty is different to the
   * default. The `checkboxInputType` directive does this because in its case a value of `false`
   * implies empty.
   *
   * @param {*} value The value of the input to check for emptiness.
   * @returns {boolean} True if `value` is "empty".
   */
this.$isEmpty=function(a){return r(a)||""===a||null===a||a!==a};var y=e.inheritedData("$formController")||Fe,z=0;/**
   * @ngdoc method
   * @name ngModel.NgModelController#$setValidity
   *
   * @description
   * Change the validity state, and notify the form.
   *
   * This method can be called within $parsers/$formatters or a custom validation implementation.
   * However, in most cases it should be sufficient to use the `ngModel.$validators` and
   * `ngModel.$asyncValidators` collections which will call `$setValidity` automatically.
   *
   * @param {string} validationErrorKey Name of the validator. The `validationErrorKey` will be assigned
   *        to either `$error[validationErrorKey]` or `$pending[validationErrorKey]`
   *        (for unfulfilled `$asyncValidators`), so that it is available for data-binding.
   *        The `validationErrorKey` should be in camelCase and will get converted into dash-case
   *        for class name. Example: `myError` will result in `ng-valid-my-error` and `ng-invalid-my-error`
   *        class and can be bound to as  `{{someForm.someControl.$error.myError}}` .
   * @param {boolean} isValid Whether the current state is valid (true), invalid (false), pending (undefined),
   *                          or skipped (null). Pending is used for unfulfilled `$asyncValidators`.
   *                          Skipped is used by Angular when validators do not run because of parse errors and
   *                          when `$asyncValidators` do not run because any of the `$validators` failed.
   */
Sc({ctrl:this,$element:e,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},parentForm:y,$animate:h}),/**
   * @ngdoc method
   * @name ngModel.NgModelController#$setPristine
   *
   * @description
   * Sets the control to its pristine state.
   *
   * This method can be called to remove the `ng-dirty` class and set the control to its pristine
   * state (`ng-pristine` class). A model is considered to be pristine when the control
   * has not been changed from when first compiled.
   */
this.$setPristine=function(){w.$dirty=!1,w.$pristine=!0,h.removeClass(e,pf),h.addClass(e,of)},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$setDirty
   *
   * @description
   * Sets the control to its dirty state.
   *
   * This method can be called to remove the `ng-pristine` class and set the control to its dirty
   * state (`ng-dirty` class). A model is considered to be dirty when the control has been changed
   * from when first compiled.
   */
this.$setDirty=function(){w.$dirty=!0,w.$pristine=!1,h.removeClass(e,of),h.addClass(e,pf),y.$setDirty()},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$setUntouched
   *
   * @description
   * Sets the control to its untouched state.
   *
   * This method can be called to remove the `ng-touched` class and set the control to its
   * untouched state (`ng-untouched` class). Upon compilation, a model is set as untouched
   * by default, however this function can be used to restore that state if the model has
   * already been touched by the user.
   */
this.$setUntouched=function(){w.$touched=!1,w.$untouched=!0,h.setClass(e,qf,rf)},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$setTouched
   *
   * @description
   * Sets the control to its touched state.
   *
   * This method can be called to remove the `ng-untouched` class and set the control to its
   * touched state (`ng-touched` class). A model is considered to be touched when the user has
   * first focused the control element and then shifted focus away from the control (blur event).
   */
this.$setTouched=function(){w.$touched=!0,w.$untouched=!1,h.setClass(e,rf,qf)},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$rollbackViewValue
   *
   * @description
   * Cancel an update and reset the input element's value to prevent an update to the `$modelValue`,
   * which may be caused by a pending debounced event or because the input is waiting for a some
   * future event.
   *
   * If you have an input that uses `ng-model-options` to set up debounced events or events such
   * as blur you can have a situation where there is a period when the `$viewValue`
   * is out of synch with the ngModel's `$modelValue`.
   *
   * In this case, you can run into difficulties if you try to update the ngModel's `$modelValue`
   * programmatically before these debounced/future events have resolved/occurred, because Angular's
   * dirty checking mechanism is not able to tell whether the model has actually changed or not.
   *
   * The `$rollbackViewValue()` method should be called before programmatically changing the model of an
   * input which may have such events pending. This is important in order to make sure that the
   * input field will be updated with the new model value and any pending operations are cancelled.
   *
   * <example name="ng-model-cancel-update" module="cancel-update-example">
   *   <file name="app.js">
   *     angular.module('cancel-update-example', [])
   *
   *     .controller('CancelUpdateController', ['$scope', function($scope) {
   *       $scope.resetWithCancel = function(e) {
   *         if (e.keyCode == 27) {
   *           $scope.myForm.myInput1.$rollbackViewValue();
   *           $scope.myValue = '';
   *         }
   *       };
   *       $scope.resetWithoutCancel = function(e) {
   *         if (e.keyCode == 27) {
   *           $scope.myValue = '';
   *         }
   *       };
   *     }]);
   *   </file>
   *   <file name="index.html">
   *     <div ng-controller="CancelUpdateController">
   *       <p>Try typing something in each input.  See that the model only updates when you
   *          blur off the input.
   *        </p>
   *        <p>Now see what happens if you start typing then press the Escape key</p>
   *
   *       <form name="myForm" ng-model-options="{ updateOn: 'blur' }">
   *         <p>With $rollbackViewValue()</p>
   *         <input name="myInput1" ng-model="myValue" ng-keydown="resetWithCancel($event)"><br/>
   *         myValue: "{{ myValue }}"
   *
   *         <p>Without $rollbackViewValue()</p>
   *         <input name="myInput2" ng-model="myValue" ng-keydown="resetWithoutCancel($event)"><br/>
   *         myValue: "{{ myValue }}"
   *       </form>
   *     </div>
   *   </file>
   * </example>
   */
this.$rollbackViewValue=function(){i.cancel(u),w.$viewValue=w.$$lastCommittedViewValue,w.$render()},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$validate
   *
   * @description
   * Runs each of the registered validators (first synchronous validators and then
   * asynchronous validators).
   * If the validity changes to invalid, the model will be set to `undefined`,
   * unless {@link ngModelOptions `ngModelOptions.allowInvalid`} is `true`.
   * If the validity changes to valid, it will set the model to the last available valid
   * modelValue, i.e. either the last parsed value or the last value set from the scope.
   */
this.$validate=function(){
// ignore $validate before model is initialized
if(!v(w.$modelValue)||!isNaN(w.$modelValue)){var a=w.$$lastCommittedViewValue,b=w.$$rawModelValue,d=w.$valid,e=w.$modelValue,f=w.$options&&w.$options.allowInvalid;w.$$runValidators(b,a,function(a){
// If there was no change in validity, don't update the model
// This prevents changing an invalid modelValue to undefined
f||d===a||(
// Note: Don't check ctrl.$valid here, as we could have
// external validators (e.g. calculated on the server),
// that just call $setValidity and need the model value
// to calculate their validity.
w.$modelValue=a?b:c,w.$modelValue!==e&&w.$$writeModelToScope())})}},this.$$runValidators=function(a,b,d){function e(){var a=w.$$parserName||"parse";
// Set the parse error last, to prevent unsetting it, should a $validators key == parserName
return m!==c?(m||(f(w.$validators,function(a,b){i(b,null)}),f(w.$asyncValidators,function(a,b){i(b,null)})),i(a,m),m):(i(a,null),!0)}function g(){var c=!0;return f(w.$validators,function(d,e){var f=d(a,b);c=c&&f,i(e,f)}),c?!0:(f(w.$asyncValidators,function(a,b){i(b,null)}),!1)}function h(){var d=[],e=!0;f(w.$asyncValidators,function(f,g){var h=f(a,b);if(!F(h))throw tf("$asyncValidators","Expected asynchronous validator to return a promise but got '{0}' instead.",h);i(g,c),d.push(h.then(function(){i(g,!0)},function(a){e=!1,i(g,!1)}))}),d.length?k.all(d).then(function(){j(e)},o):j(!0)}function i(a,b){l===z&&w.$setValidity(a,b)}function j(a){l===z&&d(a)}z++;var l=z;
// check parser error
// check parser error
return e()&&g()?void h():void j(!1)},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$commitViewValue
   *
   * @description
   * Commit a pending update to the `$modelValue`.
   *
   * Updates may be pending by a debounced event or because the input is waiting for a some future
   * event defined in `ng-model-options`. this method is rarely needed as `NgModelController`
   * usually handles calling this in response to input events.
   */
this.$commitViewValue=function(){var a=w.$viewValue;i.cancel(u),
// If the view value has not changed then we should just exit, except in the case where there is
// a native validator on the element. In this case the validation state may have changed even though
// the viewValue has stayed empty.
(w.$$lastCommittedViewValue!==a||""===a&&w.$$hasNativeValidators)&&(w.$$lastCommittedViewValue=a,
// change to dirty
w.$pristine&&this.$setDirty(),this.$$parseAndValidate())},this.$$parseAndValidate=function(){function b(){w.$modelValue!==g&&w.$$writeModelToScope()}var d=w.$$lastCommittedViewValue,e=d;if(m=r(e)?c:!0)for(var f=0;f<w.$parsers.length;f++)if(e=w.$parsers[f](e),r(e)){m=!1;break}v(w.$modelValue)&&isNaN(w.$modelValue)&&(
// ctrl.$modelValue has not been touched yet...
w.$modelValue=q(a));var g=w.$modelValue,h=w.$options&&w.$options.allowInvalid;w.$$rawModelValue=e,h&&(w.$modelValue=e,b()),
// Pass the $$lastCommittedViewValue here, because the cached viewValue might be out of date.
// This can happen if e.g. $setViewValue is called from inside a parser
w.$$runValidators(e,w.$$lastCommittedViewValue,function(a){h||(
// Note: Don't check ctrl.$valid here, as we could have
// external validators (e.g. calculated on the server),
// that just call $setValidity and need the model value
// to calculate their validity.
w.$modelValue=a?e:c,b())})},this.$$writeModelToScope=function(){t(a,w.$modelValue),f(w.$viewChangeListeners,function(a){try{a()}catch(c){b(c)}})},/**
   * @ngdoc method
   * @name ngModel.NgModelController#$setViewValue
   *
   * @description
   * Update the view value.
   *
   * This method should be called when an input directive want to change the view value; typically,
   * this is done from within a DOM event handler.
   *
   * For example {@link ng.directive:input input} calls it when the value of the input changes and
   * {@link ng.directive:select select} calls it when an option is selected.
   *
   * If the new `value` is an object (rather than a string or a number), we should make a copy of the
   * object before passing it to `$setViewValue`.  This is because `ngModel` does not perform a deep
   * watch of objects, it only looks for a change of identity. If you only change the property of
   * the object then ngModel will not realise that the object has changed and will not invoke the
   * `$parsers` and `$validators` pipelines.
   *
   * For this reason, you should not change properties of the copy once it has been passed to
   * `$setViewValue`. Otherwise you may cause the model value on the scope to change incorrectly.
   *
   * When this method is called, the new `value` will be staged for committing through the `$parsers`
   * and `$validators` pipelines. If there are no special {@link ngModelOptions} specified then the staged
   * value sent directly for processing, finally to be applied to `$modelValue` and then the
   * **expression** specified in the `ng-model` attribute.
   *
   * Lastly, all the registered change listeners, in the `$viewChangeListeners` list, are called.
   *
   * In case the {@link ng.directive:ngModelOptions ngModelOptions} directive is used with `updateOn`
   * and the `default` trigger is not listed, all those actions will remain pending until one of the
   * `updateOn` events is triggered on the DOM element.
   * All these actions will be debounced if the {@link ng.directive:ngModelOptions ngModelOptions}
   * directive is used with a custom debounce for this particular event.
   *
   * Note that calling this function does not trigger a `$digest`.
   *
   * @param {string} value Value from the view.
   * @param {string} trigger Event that triggered the update.
   */
this.$setViewValue=function(a,b){w.$viewValue=a,(!w.$options||w.$options.updateOnDefault)&&w.$$debounceViewValueCommit(b)},this.$$debounceViewValueCommit=function(b){var c,d=0,e=w.$options;e&&s(e.debounce)&&(c=e.debounce,v(c)?d=c:v(c[b])?d=c[b]:v(c["default"])&&(d=c["default"])),i.cancel(u),d?u=i(function(){w.$commitViewValue()},d):j.$$phase?w.$commitViewValue():a.$apply(function(){w.$commitViewValue()})},
// model -> value
// Note: we cannot use a normal scope.$watch as we want to detect the following:
// 1. scope value is 'a'
// 2. user enters 'b'
// 3. ng-change kicks in and reverts scope value to 'a'
//    -> scope value did not change since the last digest as
//       ng-change executes in apply phase
// 4. view should be changed back to 'a'
a.$watch(function(){var b=q(a);
// if scope model value and ngModel value are out of sync
// TODO(perf): why not move this to the action fn?
if(b!==w.$modelValue){w.$modelValue=w.$$rawModelValue=b,m=c;for(var d=w.$formatters,e=d.length,f=b;e--;)f=d[e](f);w.$viewValue!==f&&(w.$viewValue=w.$$lastCommittedViewValue=f,w.$render(),w.$$runValidators(b,f,o))}return b})}],vf=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:uf,
// Prelink needs to run before any input directive
// so that we can set the NgModelOptions in NgModelController
// before anyone else uses it.
priority:1,compile:function(b){
// Setup initial state of the control
return b.addClass(of).addClass(qf).addClass(mf),{pre:function(a,b,c,d){var e=d[0],f=d[1]||Fe;e.$$setOptions(d[2]&&d[2].$options),
// notify others, especially parent forms
f.$addControl(e),c.$observe("name",function(a){e.$name!==a&&f.$$renameControl(e,a)}),a.$on("$destroy",function(){f.$removeControl(e)})},post:function(b,c,d,e){var f=e[0];f.$options&&f.$options.updateOn&&c.on(f.$options.updateOn,function(a){f.$$debounceViewValueCommit(a&&a.type)}),c.on("blur",function(c){f.$touched||(a.$$phase?b.$evalAsync(f.$setTouched):b.$apply(f.$setTouched))})}}}}}],wf=/(\s+|^)default(\s+|$)/,xf=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,b){var d=this;this.$options=a.$eval(b.ngModelOptions),
// Allow adding/overriding bound events
this.$options.updateOn!==c?(this.$options.updateOnDefault=!1,
// extract "default" pseudo-event from list of events that can trigger a model update
this.$options.updateOn=md(this.$options.updateOn.replace(wf,function(){return d.$options.updateOnDefault=!0," "}))):this.$options.updateOnDefault=!0}]}},yf=Bc({terminal:!0,priority:1e3}),zf=["$locale","$interpolate",function(a,b){var c=/{}/g,d=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(e,g,h){function i(a){g.text(a||"")}var j,k=h.count,l=h.$attr.when&&g.attr(h.$attr.when),// we have {{}} in attrs
m=h.offset||0,n=e.$eval(l)||{},o={},p=b.startSymbol(),q=b.endSymbol(),r=p+k+"-"+m+q,s=id.noop;f(h,function(a,b){var c=d.exec(b);if(c){var e=(c[1]?"-":"")+Wc(c[2]);n[e]=g.attr(h.$attr[b])}}),f(n,function(a,d){o[d]=b(a.replace(c,r))}),e.$watch(k,function(b){var c=parseFloat(b),d=isNaN(c);d||c in n||(
// If an explicit number rule such as 1, 2, 3... is defined, just use it.
// Otherwise, check it against pluralization rules in $locale service.
c=a.pluralCat(c-m)),
// If both `count` and `lastCount` are NaN, we don't need to re-register a watch.
// In JS `NaN !== NaN`, so we have to exlicitly check.
c===j||d&&isNaN(j)||(s(),s=e.$watch(o[c],i),j=c)})}}}],Af=["$parse","$animate",function(a,g){var h="$$NG_REMOVED",i=d("ngRepeat"),j=function(a,b,c,d,e,f,g){
// TODO(perf): generate setters to shave off ~40ms or 1-1.5%
a[c]=d,e&&(a[e]=f),a.$index=b,a.$first=0===b,a.$last=b===g-1,a.$middle=!(a.$first||a.$last),
// jshint bitwise: false
a.$odd=!(a.$even=0===(1&b))},k=function(a){return a.clone[0]},l=function(a){return a.clone[a.clone.length-1]};return{restrict:"A",multiElement:!0,transclude:"element",priority:1e3,terminal:!0,$$tlb:!0,compile:function(d,m){var n=m.ngRepeat,o=b.createComment(" end ngRepeat: "+n+" "),p=n.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!p)throw i("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",n);var q=p[1],r=p[2],s=p[3],t=p[4];if(p=q.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/),!p)throw i("iidexp","'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",q);var u=p[3]||p[1],v=p[2];if(s&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(s)))throw i("badident","alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.",s);var w,x,y,z,A={$id:Oa};return t?w=a(t):(y=function(a,b){return Oa(b)},z=function(a){return a}),function(a,b,d,m,p){w&&(x=function(b,c,d){
// assign key, value, and $index to the locals so that they can be used in hash functions
return v&&(A[v]=b),A[u]=c,A.$index=d,w(a,A)});
// Store a list of elements from previous run. This is a hash where key is the item from the
// iterator, and the value is objects with following properties.
//   - scope: bound scope
//   - element: previous element.
//   - index: position
//
// We are using no-proto object so that we don't need to guard against inherited props via
// hasOwnProperty.
var q=ja();
//watch props
a.$watchCollection(r,function(d){var m,r,// node that cloned nodes should be inserted after
// initialized to the comment node anchor
t,w,A,B,// key/value of iteration
C,D,E,F,// last object information {scope, element, id}
G,H,I=b[0],
// Same as lastBlockMap but it has the current state. It will become the
// lastBlockMap on the next iteration.
J=ja();if(s&&(a[s]=d),e(d))E=d,D=x||y;else{D=x||z,
// if object, extract keys, sort them and use to determine order of iteration over obj props
E=[];for(var K in d)d.hasOwnProperty(K)&&"$"!=K.charAt(0)&&E.push(K);E.sort()}
// locate existing items
for(w=E.length,G=new Array(w),m=0;w>m;m++)if(A=d===E?m:E[m],B=d[A],C=D(A,B,m),q[C])
// found previously seen block
F=q[C],delete q[C],J[C]=F,G[m]=F;else{if(J[C])
// if collision detected. restore lastBlockMap and throw an error
throw f(G,function(a){a&&a.scope&&(q[a.id]=a)}),i("dupes","Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}",n,C,B);
// new never before seen block
G[m]={id:C,scope:c,clone:c},J[C]=!0}
// remove leftover items
for(var L in q){if(F=q[L],H=ia(F.clone),g.leave(H),H[0].parentNode)
// if the element was not removed yet because of pending animation, mark it as deleted
// so that we can ignore it later
for(m=0,r=H.length;r>m;m++)H[m][h]=!0;F.scope.$destroy()}
// we are not using forEach for perf reasons (trying to avoid #call)
for(m=0;w>m;m++)if(A=d===E?m:E[m],B=d[A],F=G[m],F.scope){
// if we have already seen this object, then we need to reuse the
// associated scope/element
t=I;
// skip nodes that are already pending removal via leave animation
do t=t.nextSibling;while(t&&t[h]);k(F)!=t&&
// existing item which got moved
g.move(ia(F.clone),null,ad(I)),I=l(F),j(F.scope,m,u,B,v,A,w)}else
// new item which we don't know about
p(function(a,b){F.scope=b;
// http://jsperf.com/clone-vs-createcomment
var c=o.cloneNode(!1);a[a.length++]=c,
// TODO(perf): support naked previousNode in `enter` to avoid creation of jqLite wrapper?
g.enter(a,null,ad(I)),I=c,
// Note: We only need the first/last node of the cloned nodes.
// However, we need to keep the reference to the jqlite wrapper as it might be changed later
// by a directive with templateUrl when its template arrives.
F.clone=a,J[F.id]=F,j(F.scope,m,u,B,v,A,w)});q=J})}}}}],Bf="ng-hide",Cf="ng-hide-animate",Df=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,c,d){b.$watch(d.ngShow,function(b){
// we're adding a temporary, animation-specific class for ng-hide since this way
// we can control when the element is actually displayed on screen without having
// to have a global/greedy CSS selector that breaks when other animations are run.
// Read: https://github.com/angular/angular.js/issues/9103#issuecomment-58335845
a[b?"removeClass":"addClass"](c,Bf,{tempClasses:Cf})})}}}],Ef=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,c,d){b.$watch(d.ngHide,function(b){
// The comment inside of the ngShowDirective explains why we add and
// remove a temporary class for the show/hide animation
a[b?"addClass":"removeClass"](c,Bf,{tempClasses:Cf})})}}}],Ff=Bc(function(a,b,c){a.$watchCollection(c.ngStyle,function(a,c){c&&a!==c&&f(c,function(a,c){b.css(c,"")}),a&&b.css(a)})}),Gf=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",
// asks for $scope to fool the BC controller module
controller:["$scope",function(){this.cases={}}],link:function(c,d,e,g){var h=e.ngSwitch||e.on,i=[],j=[],k=[],l=[],m=function(a,b){return function(){a.splice(b,1)}};c.$watch(h,function(c){var d,e;for(d=0,e=k.length;e>d;++d)a.cancel(k[d]);for(k.length=0,d=0,e=l.length;e>d;++d){var h=ia(j[d].clone);l[d].$destroy();var n=k[d]=a.leave(h);n.then(m(k,d))}j.length=0,l.length=0,(i=g.cases["!"+c]||g.cases["?"])&&f(i,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.createComment(" end ngSwitchWhen: ");var g={clone:d};j.push(g),a.enter(d,f.parent(),f)})})})}}}],Hf=Bc({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,c,d,e){d.cases["!"+c.ngSwitchWhen]=d.cases["!"+c.ngSwitchWhen]||[],d.cases["!"+c.ngSwitchWhen].push({transclude:e,element:b})}}),If=Bc({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,c,d,e){d.cases["?"]=d.cases["?"]||[],d.cases["?"].push({transclude:e,element:b})}}),Jf=Bc({restrict:"EAC",link:function(a,b,c,e,f){if(!f)throw d("ngTransclude")("orphan","Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}",T(b));f(function(a){b.empty(),b.append(a)})}}),Kf=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,c){if("text/ng-template"==c.type){var d=c.id,e=b[0].text;a.put(d,e)}}}}],Lf=d("ngOptions"),Mf=q({restrict:"A",terminal:!0}),Nf=["$compile","$parse",function(a,d){
//000011111111110000000000022222222220000000000000000000003333333333000000000000004444444444444440000000005555555555555550000000666666666666666000000000000000777777777700000000000000000008888888888
var e=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,h={$setViewValue:o};
// jshint maxlen: 100
return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,b,c){var d,e,f=this,g={},i=h;f.databound=c.ngModel,f.init=function(a,b,c){i=a,d=b,e=c},f.addOption=function(b,c){ga(b,'"option value"'),g[b]=!0,i.$viewValue==b&&(a.val(b),e.parent()&&e.remove()),
// Workaround for https://code.google.com/p/chromium/issues/detail?id=381459
// Adding an <option selected="selected"> element to a <select required="required"> should
// automatically select the new element
c&&c[0].hasAttribute("selected")&&(c[0].selected=!0)},f.removeOption=function(a){this.hasOption(a)&&(delete g[a],i.$viewValue===a&&this.renderUnknownOption(a))},f.renderUnknownOption=function(b){var c="? "+Oa(b)+" ?";e.val(c),a.prepend(e),a.val(c),e.prop("selected",!0)},f.hasOption=function(a){return g.hasOwnProperty(a)},b.$on("$destroy",function(){
// disable unknown option so that we don't do work when the whole select is being destroyed
f.renderUnknownOption=o})}],link:function(h,i,j,k){
////////////////////////////
function l(a,b,c,d){c.$render=function(){var a=c.$viewValue;d.hasOption(a)?(z.parent()&&z.remove(),b.val(a),""===a&&o.prop("selected",!0)):r(a)&&o?b.val(""):d.renderUnknownOption(a)},b.on("change",function(){a.$apply(function(){z.parent()&&z.remove(),c.$setViewValue(b.val())})})}function m(a,b,c){var d;c.$render=function(){var a=new Pa(c.$viewValue);f(b.find("option"),function(b){b.selected=s(a.get(b.value))})},
// we have to do it on each watch since ngModel watches reference, but
// we need to work of an array, so we need to see if anything was inserted/removed
a.$watch(function(){M(d,c.$viewValue)||(d=L(c.$viewValue),c.$render())}),b.on("change",function(){a.$apply(function(){var a=[];f(b.find("option"),function(b){b.selected&&a.push(b.value)}),c.$setViewValue(a)})})}function n(b,h,i){
// ------------------------------------------------------------------ //
function j(a,c,d){return M[B]=d,E&&(M[E]=c),a(b,M)}function k(){b.$apply(function(){var a,c=H(b)||[];if(t)a=[],f(h.val(),function(b){b=J?K[b]:b,a.push(l(b,c[b]))});else{var d=J?K[h.val()]:h.val();a=l(d,c[d])}i.$setViewValue(a),r()})}function l(a,b){if("?"===a)return c;if(""===a)return null;var d=D?D:G;return j(d,a,b)}function m(){var a,c=H(b);if(c&&ld(c)){a=new Array(c.length);for(var d=0,e=c.length;e>d;d++)a[d]=j(A,d,c[d]);return a}if(c){
// TODO: Add a test for this case
a={};for(var f in c)c.hasOwnProperty(f)&&(a[f]=j(A,f,c[f]))}return a}function n(a){var b;if(t)if(J&&ld(a)){b=new Pa([]);for(var c=0;c<a.length;c++)
// tracking by key
b.put(j(J,null,a[c]),!0)}else b=new Pa(a);else J&&(a=j(J,null,a));return function(c,d){var e;return e=J?J:D?D:G,t?s(b.remove(j(e,c,d))):a===j(e,c,d)}}function o(){w||(b.$$postDigest(r),w=!0)}/**
         * A new labelMap is created with each render.
         * This function is called for each existing option with added=false,
         * and each new option with added=true.
         * - Labels that are passed to this method twice,
         * (once with added=true and once with added=false) will end up with a value of 0, and
         * will cause no change to happen to the corresponding option.
         * - Labels that are passed to this method only once with added=false will end up with a
         * value of -1 and will eventually be passed to selectCtrl.removeOption()
         * - Labels that are passed to this method only once with added=true will end up with a
         * value of 1 and will eventually be passed to selectCtrl.addOption()
        */
function q(a,b,c){a[b]=a[b]||0,a[b]+=c?1:-1}function r(){w=!1;
// Temporary location for the option groups before we render them
var a,c,d,e,k,l,m,o,r,u,z,B,C,D,G,I,N,O={"":[]},P=[""],Q=i.$viewValue,R=H(b)||[],S=E?g(R):R,T={},U=n(Q),V=!1;
// We now build up the list of options we need (we merge later)
for(K={},B=0;u=S.length,u>B;B++)m=B,E&&(m=S[B],"$"===m.charAt(0))||(o=R[m],a=j(F,m,o)||"",(c=O[a])||(c=O[a]=[],P.push(a)),C=U(m,o),V=V||C,I=j(A,m,o),// what will be seen by the user
// doing displayFn(scope, locals) || '' overwrites zero values
I=s(I)?I:"",N=J?J(b,M):E?S[B]:B,J&&(K[N]=m),c.push({
// either the index into array or key from object
id:N,label:I,selected:C}));
// Now we need to update the list of DOM nodes to match the optionGroups we computed above
for(t||(v||null===Q?
// insert null option if we have a placeholder, or the model is null
O[""].unshift({id:"",label:"",selected:!V}):V||
// option could not be found, we have to insert the undefined item
O[""].unshift({id:"?",label:"",selected:!0})),z=0,r=P.length;r>z;z++){// start at the beginning
for(
// current option group name or '' if no group
a=P[z],
// list of options for that group. (first item has the parent)
c=O[a],L.length<=z?(
// we need to grow the optionGroups
e={element:y.clone().attr("label",a),label:c.label},k=[e],L.push(k),h.append(e.element)):(k=L[z],e=k[0],// either SELECT (no group) or OPTGROUP element
// update the OPTGROUP label if not the same.
e.label!=a&&e.element.attr("label",e.label=a)),D=null,B=0,u=c.length;u>B;B++)d=c[B],(l=k[B+1])?(
// reuse elements
D=l.element,l.label!==d.label&&(q(T,l.label,!1),q(T,d.label,!0),D.text(l.label=d.label),D.prop("label",l.label)),l.id!==d.id&&D.val(l.id=d.id),
// lastElement.prop('selected') provided by jQuery has side-effects
D[0].selected!==d.selected&&(D.prop("selected",l.selected=d.selected),_c&&
// See #7692
// The selected item wouldn't visually update on IE without this.
// Tested on Win7: IE9, IE10 and IE11. Future IEs should be tested as well
D.prop("selected",l.selected))):(
// grow elements
// if it's a null option
""===d.id&&v?
// put back the pre-compiled element
G=v:
// jQuery(v1.4.2) Bug: We should be able to chain the method calls, but
// in this version of jQuery on some browser the .text() returns a string
// rather then the element.
(G=x.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),k.push(l={element:G,label:d.label,id:d.id,selected:d.selected}),q(T,d.label,!0),D?D.after(G):e.element.append(G),D=G);// increment since the existingOptions[0] is parent element not OPTION
for(
// remove any excessive OPTIONs in a group
B++;k.length>B;)d=k.pop(),q(T,d.label,!1),d.element.remove()}
// remove any excessive OPTGROUPs from select
for(;L.length>z;){for(
// remove all the labels in the option group
c=L.pop(),B=1;B<c.length;++B)q(T,c[B].label,!1);c[0].element.remove()}f(T,function(a,b){a>0?p.addOption(b):0>a&&p.removeOption(b)})}var z;if(!(z=u.match(e)))throw Lf("iexp","Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}",u,T(h));var A=d(z[2]||z[1]),B=z[4]||z[6],C=/ as /.test(z[0])&&z[1],D=C?d(C):null,E=z[5],F=d(z[3]||""),G=d(z[2]?z[1]:B),H=d(z[7]),I=z[8],J=I?d(z[8]):null,K={},
// This is an array of array of existing option groups in DOM.
// We try to reuse these if possible
// - optionGroupsCache[0] is the options with no option group
// - optionGroupsCache[?][0] is the parent: either the SELECT or OPTGROUP element
L=[[{element:h,label:""}]],
//re-usable object to represent option's locals
M={};v&&(
// compile the element since there might be bindings in it
a(v)(b),
// remove the class, which is added automatically because we recompile the element and it
// becomes the compilation root
v.removeClass("ng-scope"),
// we need to remove it before calling selectElement.empty() because otherwise IE will
// remove the label from the element. wtf?
v.remove()),
// clear contents, we'll add what's needed based on the model
h.empty(),h.on("change",k),i.$render=r,b.$watchCollection(H,o),b.$watchCollection(m,o),t&&b.$watchCollection(function(){return i.$modelValue},o)}
// if ngModel is not defined, we don't need to do anything
if(k[1]){
// find "null" option
for(var// if false, user will not be able to select it (used by ngOptions)
o,p=k[0],q=k[1],t=j.multiple,u=j.ngOptions,v=!1,w=!1,
// we can't just jqLite('<option>') since jqLite is not smart enough
// to create it in <select> and IE barfs otherwise.
x=ad(b.createElement("option")),y=ad(b.createElement("optgroup")),z=x.clone(),A=0,B=i.children(),C=B.length;C>A;A++)if(""===B[A].value){o=v=B.eq(A);break}p.init(q,v,z),
// required validator
t&&(q.$isEmpty=function(a){return!a||0===a.length}),u?n(h,i,q):t?m(h,i,q):l(h,i,q,p)}}}}],Of=["$interpolate",function(a){var b={addOption:o,removeOption:o};return{restrict:"E",priority:100,compile:function(c,d){if(r(d.value)){var e=a(c.text(),!0);e||d.$set("value",c.text())}return function(a,c,d){var f="$selectController",g=c.parent(),h=g.data(f)||g.parent().data(f);// in case we are in optgroup
h&&h.databound||(h=b),e?a.$watch(e,function(a,b){d.$set("value",a),b!==a&&h.removeOption(b),h.addOption(a,c)}):h.addOption(d.value,c),c.on("$destroy",function(){h.removeOption(d.value)})}}}}],Pf=q({restrict:"E",terminal:!1}),Qf=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){d&&(c.required=!0,// force truthy in case we are on non input element
d.$validators.required=function(a,b){return!c.required||!d.$isEmpty(b)},c.$observe("required",function(){d.$validate()}))}}},Rf=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,e,f){if(f){var g,h=e.ngPattern||e.pattern;e.$observe("pattern",function(a){if(u(a)&&a.length>0&&(a=new RegExp("^"+a+"$")),a&&!a.test)throw d("ngPattern")("noregexp","Expected {0} to be a RegExp but was {1}. Element: {2}",h,a,T(b));g=a||c,f.$validate()}),f.$validators.pattern=function(a){return f.$isEmpty(a)||r(g)||g.test(a)}}}}},Sf=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){if(d){var e=-1;c.$observe("maxlength",function(a){var b=m(a);e=isNaN(b)?-1:b,d.$validate()}),d.$validators.maxlength=function(a,b){return 0>e||d.$isEmpty(b)||b.length<=e}}}}},Tf=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){if(d){var e=0;c.$observe("minlength",function(a){e=m(a)||0,d.$validate()}),d.$validators.minlength=function(a,b){return d.$isEmpty(b)||b.length>=e}}}}};
//AngularJS is already loaded, so we can return here...
//try to bind to jquery now so that one can write jqLite(document).ready()
//but we will rebind on bootstrap again.
return a.angular.bootstrap?void console.log("WARNING: Tried to load angular more than once."):(da(),na(id),void ad(b).ready(function(){$(b,_)}))}(window,document),!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'),function(){"use strict";/**
	 * Bindonce - Zero watches binding for AngularJs
	 * @version v0.3.3
	 * @link https://github.com/Pasvaz/bindonce
	 * @author Pasquale Vazzana <pasqualevazzana@gmail.com>
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
var a=angular.module("pasvaz.bindonce",[]);a.directive("bindonce",function(){var a=function(a){if(a&&0!==a.length){var b=angular.lowercase(""+a);a=!("f"===b||"0"===b||"false"===b||"no"===b||"n"===b||"[]"===b)}else a=!1;return a},b=parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10);isNaN(b)&&(b=parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10));var c={restrict:"AM",controller:["$scope","$element","$attrs","$interpolate",function(c,d,e,f){var g=function(b,c,d){var e="show"===c?"":"none",f="hide"===c?"":"none";b.css("display",a(d)?e:f)},h=function(a,b){if(angular.isObject(b)&&!angular.isArray(b)){var c=[];angular.forEach(b,function(a,b){a&&c.push(b)}),b=c}b&&a.addClass(angular.isArray(b)?b.join(" "):b)},i=function(a,b){a.transclude(b,function(b){var c=a.element.parent(),d=a.element&&a.element[a.element.length-1],e=c&&c[0]||d&&d.parentNode,f=d&&d.nextSibling||null;angular.forEach(b,function(a){e.insertBefore(a,f)})})},j={watcherRemover:void 0,binders:[],group:e.boName,element:d,ran:!1,addBinder:function(a){this.binders.push(a),
// In case of late binding (when using the directive bo-name/bo-parent)
// it happens only when you use nested bindonce, if the bo-children
// are not dom children the linking can follow another order
this.ran&&this.runBinders()},setupWatcher:function(a){var b=this;this.watcherRemover=c.$watch(a,function(a){void 0!==a&&(b.removeWatcher(),b.checkBindonce(a))},!0)},checkBindonce:function(a){var b=this,c=a.$promise?a.$promise.then:a.then;
// since Angular 1.2 promises are no longer
// undefined until they don't get resolved
"function"==typeof c?c(function(){b.runBinders()}):b.runBinders()},removeWatcher:function(){void 0!==this.watcherRemover&&(this.watcherRemover(),this.watcherRemover=void 0)},runBinders:function(){for(;this.binders.length>0;){var c=this.binders.shift();if(!this.group||this.group==c.group){var d=c.scope.$eval(c.interpolate?f(c.value):c.value);switch(c.attr){case"boIf":a(d)&&i(c,c.scope.$new());break;case"boSwitch":var e,j=c.controller[0];(e=j.cases["!"+d]||j.cases["?"])&&(c.scope.$eval(c.attrs.change),angular.forEach(e,function(a){i(a,c.scope.$new())}));break;case"boSwitchWhen":var k=c.controller[0];k.cases["!"+c.attrs.boSwitchWhen]=k.cases["!"+c.attrs.boSwitchWhen]||[],k.cases["!"+c.attrs.boSwitchWhen].push({transclude:c.transclude,element:c.element});break;case"boSwitchDefault":var k=c.controller[0];k.cases["?"]=k.cases["?"]||[],k.cases["?"].push({transclude:c.transclude,element:c.element});break;case"hide":case"show":g(c.element,c.attr,d);break;case"class":h(c.element,d);break;case"text":c.element.text(d);break;case"html":c.element.html(d);break;case"style":c.element.css(d);break;case"disabled":c.element.prop("disabled",d);break;case"src":c.element.attr(c.attr,d),b&&c.element.prop("src",d);break;case"attr":angular.forEach(c.attrs,function(a,b){var d,e;b.match(/^boAttr./)&&c.attrs[b]&&(d=b.replace(/^boAttr/,"").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),e=c.scope.$eval(c.attrs[b]),c.element.attr(d,e))});break;case"href":case"alt":case"title":case"id":case"value":c.element.attr(c.attr,d)}}}this.ran=!0}};angular.extend(this,j)}],link:function(a,b,c,d){var e=c.bindonce&&a.$eval(c.bindonce);void 0!==e?d.checkBindonce(e):(d.setupWatcher(c.bindonce),b.bind("$destroy",d.removeWatcher))}};return c}),angular.forEach([{directiveName:"boShow",attribute:"show"},{directiveName:"boHide",attribute:"hide"},{directiveName:"boClass",attribute:"class"},{directiveName:"boText",attribute:"text"},{directiveName:"boBind",attribute:"text"},{directiveName:"boHtml",attribute:"html"},{directiveName:"boSrcI",attribute:"src",interpolate:!0},{directiveName:"boSrc",attribute:"src"},{directiveName:"boHrefI",attribute:"href",interpolate:!0},{directiveName:"boHref",attribute:"href"},{directiveName:"boAlt",attribute:"alt"},{directiveName:"boTitle",attribute:"title"},{directiveName:"boId",attribute:"id"},{directiveName:"boStyle",attribute:"style"},{directiveName:"boDisabled",attribute:"disabled"},{directiveName:"boValue",attribute:"value"},{directiveName:"boAttr",attribute:"attr"},{directiveName:"boIf",transclude:"element",terminal:!0,priority:1e3},{directiveName:"boSwitch",require:"boSwitch",controller:function(){this.cases={}}},{directiveName:"boSwitchWhen",transclude:"element",priority:800,require:"^boSwitch"},{directiveName:"boSwitchDefault",transclude:"element",priority:800,require:"^boSwitch"}],function(b){var c=200;return a.directive(b.directiveName,function(){var a={priority:b.priority||c,transclude:b.transclude||!1,terminal:b.terminal||!1,require:["^bindonce"].concat(b.require||[]),controller:b.controller,compile:function(a,c,d){return function(a,c,e,f){var g=f[0],h=e.boParent;if(h&&g.group!==h){var i=g.element.parent();g=void 0;for(var j;9!==i[0].nodeType&&i.length;){if((j=i.data("$bindonceController"))&&j.group===h){g=j;break}i=i.parent()}if(!g)throw new Error("No bindonce controller: "+h)}g.addBinder({element:c,attr:b.attribute||b.directiveName,attrs:e,value:e[b.directiveName],interpolate:b.interpolate,group:h,transclude:d,controller:f.slice(1),scope:a})}}};return a})})}(),/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.1 - 2015-02-20
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.tpls",["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(a,b,c){function d(a){for(var b in a)if(void 0!==f.style[b])return a[b]}var e=function(d,f,g){g=g||{};var h=a.defer(),i=e[g.animation?"animationEndEventName":"transitionEndEventName"],j=function(a){c.$apply(function(){d.unbind(i,j),h.resolve(d)})};
// Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
// Add our custom cancel function to the promise that is returned
// We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
// i.e. it will therefore never raise a transitionEnd event for that transition
return i&&d.bind(i,j),b(function(){angular.isString(f)?d.addClass(f):angular.isFunction(f)?f(d):angular.isObject(f)&&d.css(f),
//If browser does not support transitions, instantly resolve
i||h.resolve(d)}),h.promise.cancel=function(){i&&d.unbind(i,j),h.reject("Transition cancelled")},h.promise},f=document.createElement("trans"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},h={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return e.transitionEndEventName=d(g),e.animationEndEventName=d(h),e}]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(a){return{link:function(b,c,d){function e(b){function d(){
// Make sure it's this transition, otherwise, leave it alone.
j===e&&(j=void 0)}var e=a(c,b);return j&&j.cancel(),j=e,e.then(d,d),e}function f(){k?(k=!1,g()):(c.removeClass("collapse").addClass("collapsing"),e({height:c[0].scrollHeight+"px"}).then(g))}function g(){c.removeClass("collapsing"),c.addClass("collapse in"),c.css({height:"auto"})}function h(){if(k)k=!1,i(),c.css({height:0});else{
// CSS transitions don't work with height: auto, so we have to manually change the height to a specific value
c.css({height:c[0].scrollHeight+"px"});
//trigger reflow so a browser realizes that height was updated from auto to a specific value
c[0].offsetWidth;c.removeClass("collapse in").addClass("collapsing"),e({height:0}).then(i)}}function i(){c.removeClass("collapsing"),c.addClass("collapse")}var j,k=!0;b.$watch(d.collapse,function(a){a?h():f()})}}}]),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("accordionConfig",{closeOthers:!0}).controller("AccordionController",["$scope","$attrs","accordionConfig",function(a,b,c){
// This array keeps track of the accordion groups
this.groups=[],
// Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},
// This is called from the accordion-group directive to add itself to the accordion
this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(c){b.removeGroup(a)})},
// This is called from the accordion-group directive when to remove itself
this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("accordion",function(){return{restrict:"EA",controller:"AccordionController",transclude:!0,replace:!1,templateUrl:"template/accordion/accordion.html"}}).directive("accordionGroup",function(){return{require:"^accordion",// We need this directive to be inside an accordion
restrict:"EA",transclude:!0,// It transcludes the contents of the directive into the template
replace:!0,// The element containing the directive will be replaced with the template
templateUrl:"template/accordion/accordion-group.html",scope:{heading:"@",// Interpolate the heading attribute onto this scope
isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){d.addGroup(a),a.$watch("isOpen",function(b){b&&d.closeOthers(a)}),a.toggleOpen=function(){a.isDisabled||(a.isOpen=!a.isOpen)}}}}).directive("accordionHeading",function(){return{restrict:"EA",transclude:!0,// Grab the contents to be used as the heading
template:"",// In effect remove this element!
replace:!0,require:"^accordionGroup",link:function(a,b,c,d,e){
// Pass the heading to the accordion-group controller
// so that it can be transcluded into the right place in the template
// [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
d.setHeading(e(a,function(){}))}}}).directive("accordionTransclude",function(){return{require:"^accordionGroup",link:function(a,b,c,d){a.$watch(function(){return d[c.accordionTransclude]},function(a){a&&(b.html(""),b.append(a))})}}}),angular.module("ui.bootstrap.alert",[]).controller("AlertController",["$scope","$attrs",function(a,b){a.closeable="close"in b,this.close=a.close}]).directive("alert",function(){return{restrict:"EA",controller:"AlertController",templateUrl:"template/alert/alert.html",transclude:!0,replace:!0,scope:{type:"@",close:"&"}}}).directive("dismissOnTimeout",["$timeout",function(a){return{require:"alert",link:function(b,c,d,e){a(function(){e.close()},parseInt(d.dismissOnTimeout,10))}}}]),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(a,b,c){b.addClass("ng-binding").data("$binding",c.bindHtmlUnsafe),a.$watch(c.bindHtmlUnsafe,function(a){b.html(a||"")})}}),angular.module("ui.bootstrap.buttons",[]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).controller("ButtonsController",["buttonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("btnRadio",function(){return{require:["btnRadio","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){var e=d[0],f=d[1];
//model -> UI
f.$render=function(){b.toggleClass(e.activeClass,angular.equals(f.$modelValue,a.$eval(c.btnRadio)))},
//ui->model
b.bind(e.toggleEvent,function(){var d=b.hasClass(e.activeClass);(!d||angular.isDefined(c.uncheckable))&&a.$apply(function(){f.$setViewValue(d?null:a.$eval(c.btnRadio)),f.$render()})})}}}).directive("btnCheckbox",function(){return{require:["btnCheckbox","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){var d=a.$eval(b);return angular.isDefined(d)?d:c}var h=d[0],i=d[1];
//model -> UI
i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},
//ui->model
b.bind(h.toggleEvent,function(){a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),/**
* @ngdoc overview
* @name ui.bootstrap.carousel
*
* @description
* AngularJS version of an image carousel.
*
*/
angular.module("ui.bootstrap.carousel",["ui.bootstrap.transition"]).controller("CarouselController",["$scope","$timeout","$interval","$transition",function(a,b,c,d){function e(){f();var b=+a.interval;!isNaN(b)&&b>0&&(h=c(g,b))}function f(){h&&(c.cancel(h),h=null)}function g(){var b=+a.interval;i&&!isNaN(b)&&b>0?a.next():a.pause()}var h,i,j=this,k=j.slides=a.slides=[],l=-1;j.currentSlide=null;var m=!1;/* direction: "prev" or "next" */
j.select=a.select=function(c,f){function g(){
// Scope has been destroyed, stop here.
if(!m){
//If we have a slide to transition from and we have a transition type and we're allowed, go
if(j.currentSlide&&angular.isString(f)&&!a.noTransition&&c.$element){
//We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
c.$element.addClass(f);c.$element[0].offsetWidth;//force reflow
//Set all other slides to stop doing their stuff for the new transition
angular.forEach(k,function(a){angular.extend(a,{direction:"",entering:!1,leaving:!1,active:!1})}),angular.extend(c,{direction:f,active:!0,entering:!0}),angular.extend(j.currentSlide||{},{direction:f,leaving:!0}),a.$currentTransition=d(c.$element,{}),
//We have to create new pointers inside a closure since next & current will change
function(b,c){a.$currentTransition.then(function(){h(b,c)},function(){h(b,c)})}(c,j.currentSlide)}else h(c,j.currentSlide);j.currentSlide=c,l=i,
//every time you change slides, reset the timer
e()}}function h(b,c){angular.extend(b,{direction:"",active:!0,leaving:!1,entering:!1}),angular.extend(c||{},{direction:"",active:!1,leaving:!1,entering:!1}),a.$currentTransition=null}var i=k.indexOf(c);
//Decide direction if it's not given
void 0===f&&(f=i>l?"next":"prev"),c&&c!==j.currentSlide&&(a.$currentTransition?(a.$currentTransition.cancel(),
//Timeout so ng-class in template has time to fix classes for finished slide
b(g)):g())},a.$on("$destroy",function(){m=!0}),/* Allow outside people to call indexOf on slides array */
j.indexOfSlide=function(a){return k.indexOf(a)},a.next=function(){var b=(l+1)%k.length;
//Prevent this user-triggered transition from occurring if there is already one in progress
//Prevent this user-triggered transition from occurring if there is already one in progress
return a.$currentTransition?void 0:j.select(k[b],"next")},a.prev=function(){var b=0>l-1?k.length-1:l-1;
//Prevent this user-triggered transition from occurring if there is already one in progress
//Prevent this user-triggered transition from occurring if there is already one in progress
return a.$currentTransition?void 0:j.select(k[b],"prev")},a.isActive=function(a){return j.currentSlide===a},a.$watch("interval",e),a.$on("$destroy",f),a.play=function(){i||(i=!0,e())},a.pause=function(){a.noPause||(i=!1,f())},j.addSlide=function(b,c){b.$element=c,k.push(b),
//if this is the first slide or the slide is set to active, select it
1===k.length||b.active?(j.select(k[k.length-1]),1==k.length&&a.play()):b.active=!1},j.removeSlide=function(a){
//get the index of the slide inside the carousel
var b=k.indexOf(a);k.splice(b,1),k.length>0&&a.active?j.select(b>=k.length?k[b-1]:k[b]):l>b&&l--}}]).directive("carousel",[function(){return{restrict:"EA",transclude:!0,replace:!0,controller:"CarouselController",require:"carousel",templateUrl:"template/carousel/carousel.html",scope:{interval:"=",noTransition:"=",noPause:"="}}}]).directive("slide",function(){return{require:"^carousel",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/carousel/slide.html",scope:{active:"=?"},link:function(a,b,c,d){d.addSlide(a,b),
//when the scope is destroyed then remove the slide from the current slides array
a.$on("$destroy",function(){d.removeSlide(a)}),a.$watch("active",function(b){b&&d.select(a)})}}}),angular.module("ui.bootstrap.dateparser",[]).service("dateParser",["$locale","orderByFilter",function(a,b){function c(a){var c=[],d=a.split("");return angular.forEach(e,function(b,e){var f=a.indexOf(e);if(f>-1){a=a.split(""),d[f]="("+b.regex+")",a[f]="$";// Custom symbol to define consumed part of format
for(var g=f+1,h=f+e.length;h>g;g++)d[g]="",a[g]="$";a=a.join(""),c.push({index:f,apply:b.apply})}}),{regex:new RegExp("^"+d.join("")+"$"),map:b(c,"index")}}
// Check if date is valid for specific month (and year for February).
// Month: 0 = Jan, 1 = Feb, etc
function d(a,b,c){return 1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}this.parsers={};var e={yyyy:{regex:"\\d{4}",apply:function(a){this.year=+a}},yy:{regex:"\\d{2}",apply:function(a){this.year=+a+2e3}},y:{regex:"\\d{1,4}",apply:function(a){this.year=+a}},MMMM:{regex:a.DATETIME_FORMATS.MONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.MONTH.indexOf(b)}},MMM:{regex:a.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)}},MM:{regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1}},M:{regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1}},dd:{regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},d:{regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},EEEE:{regex:a.DATETIME_FORMATS.DAY.join("|")},EEE:{regex:a.DATETIME_FORMATS.SHORTDAY.join("|")}};this.parse=function(b,e){if(!angular.isString(b)||!e)return b;e=a.DATETIME_FORMATS[e]||e,this.parsers[e]||(this.parsers[e]=c(e));var f=this.parsers[e],g=f.regex,h=f.map,i=b.match(g);if(i&&i.length){for(var j,k={year:1900,month:0,date:1,hours:0},l=1,m=i.length;m>l;l++){var n=h[l-1];n.apply&&n.apply.call(k,i[l])}return d(k.year,k.month,k.date)&&(j=new Date(k.year,k.month,k.date,k.hours)),j}}}]),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(a,b){function c(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}/**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
function d(a){return"static"===(c(a,"position")||"static")}/**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
var e=function(b){for(var c=a[0],e=b.offsetParent||c;e&&e!==c&&d(e);)e=e.offsetParent;return e||c};return{/**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);f!=a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft);var g=b[0].getBoundingClientRect();return{width:g.width||b.prop("offsetWidth"),height:g.height||b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},/**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
offset:function(c){var d=c[0].getBoundingClientRect();return{width:d.width||c.prop("offsetWidth"),height:d.height||c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].documentElement.scrollLeft)}},/**
       * Provides coordinates for the targetEl in relation to hostEl
       */
positionElements:function(a,b,c,d){var e,f,g,h,i=c.split("-"),j=i[0],k=i[1]||"center";e=d?this.offset(a):this.position(a),f=b.prop("offsetWidth"),g=b.prop("offsetHeight");var l={center:function(){return e.left+e.width/2-f/2},left:function(){return e.left},right:function(){return e.left+e.width}},m={center:function(){return e.top+e.height/2-g/2},top:function(){return e.top},bottom:function(){return e.top+e.height}};switch(j){case"right":h={top:m[k](),left:l[j]()};break;case"left":h={top:m[k](),left:e.left-f};break;case"bottom":h={top:m[j](),left:l[k]()};break;default:h={top:e.top-g,left:l[k]()}}return h}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.position"]).constant("datepickerConfig",{formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",datepickerMode:"day",minMode:"day",maxMode:"year",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null}).controller("DatepickerController",["$scope","$attrs","$parse","$interpolate","$timeout","$log","dateFilter","datepickerConfig",function(a,b,c,d,e,f,g,h){var i=this,j={$setViewValue:angular.noop};// nullModelCtrl;
// Modes chain
this.modes=["day","month","year"],
// Configuration attributes
angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","minMode","maxMode","showWeeks","startingDay","yearRange"],function(c,e){i[c]=angular.isDefined(b[c])?8>e?d(b[c])(a.$parent):a.$parent.$eval(b[c]):h[c]}),
// Watchable date attributes
angular.forEach(["minDate","maxDate"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(a){i[d]=a?new Date(a):null,i.refreshView()}):i[d]=h[d]?new Date(h[d]):null}),a.datepickerMode=a.datepickerMode||h.datepickerMode,a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),this.activeDate=angular.isDefined(b.initDate)?a.$parent.$eval(b.initDate):new Date,a.isActive=function(b){return 0===i.compare(b.date,i.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(a){j=a,j.$render=function(){i.render()}},this.render=function(){if(j.$modelValue){var a=new Date(j.$modelValue),b=!isNaN(a);b?this.activeDate=a:f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'),j.$setValidity("date",b)}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var a=j.$modelValue?new Date(j.$modelValue):null;j.$setValidity("date-disabled",!a||this.element&&!this.isDisabled(a))}},this.createDateObject=function(a,b){var c=j.$modelValue?new Date(j.$modelValue):null;return{date:a,label:g(a,b),selected:c&&0===this.compare(a,c),disabled:this.isDisabled(a),current:0===this.compare(a,new Date)}},this.isDisabled=function(c){return this.minDate&&this.compare(c,this.minDate)<0||this.maxDate&&this.compare(c,this.maxDate)>0||b.dateDisabled&&a.dateDisabled({date:c,mode:a.datepickerMode})},
// Split array into smaller arrays
this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===i.minMode){var c=j.$modelValue?new Date(j.$modelValue):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),j.$setViewValue(c),j.$render()}else i.activeDate=b,a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)-1]},a.move=function(a){var b=i.activeDate.getFullYear()+a*(i.step.years||0),c=i.activeDate.getMonth()+a*(i.step.months||0);i.activeDate.setFullYear(b,c,1),i.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===i.maxMode&&1===b||a.datepickerMode===i.minMode&&-1===b||(a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)+b])},
// Key event mapper
a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var k=function(){e(function(){i.element[0].focus()},0,!1)};
// Listen for focus requests from popup directive
a.$on("datepicker.focus",k),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey)if(b.preventDefault(),b.stopPropagation(),"enter"===c||"space"===c){if(i.isDisabled(i.activeDate))return;a.select(i.activeDate),k()}else!b.ctrlKey||"up"!==c&&"down"!==c?(i.handleKeyDown(c,b),i.refreshView()):(a.toggleMode("up"===c?1:-1),k())}}]).directive("datepicker",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/datepicker.html",scope:{datepickerMode:"=?",dateDisabled:"&"},require:["datepicker","?^ngModel"],controller:"DatepickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}).directive("daypicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/day.html",require:"^datepicker",link:function(b,c,d,e){function f(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?i[b]:29}function g(a,b){var c=new Array(b),d=new Date(a),e=0;// Prevent repeated dates because of timezone bug
for(d.setHours(12);b>e;)c[e++]=new Date(d),d.setDate(d.getDate()+1);return c}function h(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));// Thursday
var c=b.getTime();// Compare with Jan 1
return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}b.showWeeks=e.showWeeks,e.step={months:1},e.element=c;var i=[31,28,31,30,31,30,31,31,30,31,30,31];e._refreshView=function(){var c=e.activeDate.getFullYear(),d=e.activeDate.getMonth(),f=new Date(c,d,1),i=e.startingDay-f.getDay(),j=i>0?7-i:-i,k=new Date(f);j>0&&k.setDate(-j+1);for(var l=g(k,42),m=0;42>m;m++)l[m]=angular.extend(e.createDateObject(l[m],e.formatDay),{secondary:l[m].getMonth()!==d,uid:b.uniqueId+"-"+m});b.labels=new Array(7);for(var n=0;7>n;n++)b.labels[n]={abbr:a(l[n].date,e.formatDayHeader),full:a(l[n].date,"EEEE")};if(b.title=a(e.activeDate,e.formatDayTitle),b.rows=e.split(l,7),b.showWeeks){b.weekNumbers=[];for(var o=h(b.rows[0][0].date),p=b.rows.length;b.weekNumbers.push(o++)<p;);}},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},e.handleKeyDown=function(a,b){var c=e.activeDate.getDate();if("left"===a)c-=1;else if("up"===a)c-=7;else if("right"===a)c+=1;else if("down"===a)c+=7;else if("pageup"===a||"pagedown"===a){var d=e.activeDate.getMonth()+("pageup"===a?-1:1);e.activeDate.setMonth(d,1),c=Math.min(f(e.activeDate.getFullYear(),e.activeDate.getMonth()),c)}else"home"===a?c=1:"end"===a&&(c=f(e.activeDate.getFullYear(),e.activeDate.getMonth()));e.activeDate.setDate(c)},e.refreshView()}}}]).directive("monthpicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/month.html",require:"^datepicker",link:function(b,c,d,e){e.step={years:1},e.element=c,e._refreshView=function(){for(var c=new Array(12),d=e.activeDate.getFullYear(),f=0;12>f;f++)c[f]=angular.extend(e.createDateObject(new Date(d,f,1),e.formatMonth),{uid:b.uniqueId+"-"+f});b.title=a(e.activeDate,e.formatMonthTitle),b.rows=e.split(c,3)},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth())-new Date(b.getFullYear(),b.getMonth())},e.handleKeyDown=function(a,b){var c=e.activeDate.getMonth();if("left"===a)c-=1;else if("up"===a)c-=3;else if("right"===a)c+=1;else if("down"===a)c+=3;else if("pageup"===a||"pagedown"===a){var d=e.activeDate.getFullYear()+("pageup"===a?-1:1);e.activeDate.setFullYear(d)}else"home"===a?c=0:"end"===a&&(c=11);e.activeDate.setMonth(c)},e.refreshView()}}}]).directive("yearpicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/year.html",require:"^datepicker",link:function(a,b,c,d){function e(a){return parseInt((a-1)/f,10)*f+1}var f=d.yearRange;d.step={years:f},d.element=b,d._refreshView=function(){for(var b=new Array(f),c=0,g=e(d.activeDate.getFullYear());f>c;c++)b[c]=angular.extend(d.createDateObject(new Date(g+c,0,1),d.formatYear),{uid:a.uniqueId+"-"+c});a.title=[b[0].label,b[f-1].label].join(" - "),a.rows=d.split(b,5)},d.compare=function(a,b){return a.getFullYear()-b.getFullYear()},d.handleKeyDown=function(a,b){var c=d.activeDate.getFullYear();"left"===a?c-=1:"up"===a?c-=5:"right"===a?c+=1:"down"===a?c+=5:"pageup"===a||"pagedown"===a?c+=("pageup"===a?-1:1)*d.step.years:"home"===a?c=e(d.activeDate.getFullYear()):"end"===a&&(c=e(d.activeDate.getFullYear())+f-1),d.activeDate.setFullYear(c)},d.refreshView()}}}]).constant("datepickerPopupConfig",{datepickerPopup:"yyyy-MM-dd",currentText:"Today",clearText:"Clear",closeText:"Done",closeOnDateSelection:!0,appendToBody:!1,showButtonBar:!0}).directive("datepickerPopup",["$compile","$parse","$document","$position","dateFilter","dateParser","datepickerPopupConfig",function(a,b,c,d,e,f,g){return{restrict:"EA",require:"ngModel",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&"},link:function(h,i,j,k){function l(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function m(a){if(a){if(angular.isDate(a)&&!isNaN(a))return k.$setValidity("date",!0),a;if(angular.isString(a)){var b=f.parse(a,n)||new Date(a);return isNaN(b)?void k.$setValidity("date",!1):(k.$setValidity("date",!0),b)}return void k.$setValidity("date",!1)}return k.$setValidity("date",!0),null}var n,o=angular.isDefined(j.closeOnDateSelection)?h.$parent.$eval(j.closeOnDateSelection):g.closeOnDateSelection,p=angular.isDefined(j.datepickerAppendToBody)?h.$parent.$eval(j.datepickerAppendToBody):g.appendToBody;h.showButtonBar=angular.isDefined(j.showButtonBar)?h.$parent.$eval(j.showButtonBar):g.showButtonBar,h.getText=function(a){return h[a+"Text"]||g[a+"Text"]},j.$observe("datepickerPopup",function(a){n=a||g.datepickerPopup,k.$render()});
// popup element used to display calendar
var q=angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");q.attr({"ng-model":"date","ng-change":"dateSelection()"});
// datepicker element
var r=angular.element(q.children()[0]);j.datepickerOptions&&angular.forEach(h.$parent.$eval(j.datepickerOptions),function(a,b){r.attr(l(b),a)}),h.watchData={},angular.forEach(["minDate","maxDate","datepickerMode"],function(a){if(j[a]){var c=b(j[a]);
// Propagate changes from datepicker to outside
if(h.$parent.$watch(c,function(b){h.watchData[a]=b}),r.attr(l(a),"watchData."+a),"datepickerMode"===a){var d=c.assign;h.$watch("watchData."+a,function(a,b){a!==b&&d(h.$parent,a)})}}}),j.dateDisabled&&r.attr("date-disabled","dateDisabled({ date: date, mode: mode })"),k.$parsers.unshift(m),
// Inner change
h.dateSelection=function(a){angular.isDefined(a)&&(h.date=a),k.$setViewValue(h.date),k.$render(),o&&(h.isOpen=!1,i[0].focus())},i.bind("input change keyup",function(){h.$apply(function(){h.date=k.$modelValue})}),
// Outter change
k.$render=function(){var a=k.$viewValue?e(k.$viewValue,n):"";i.val(a),h.date=m(k.$modelValue)};var s=function(a){h.isOpen&&a.target!==i[0]&&h.$apply(function(){h.isOpen=!1})},t=function(a,b){h.keydown(a)};i.bind("keydown",t),h.keydown=function(a){27===a.which?(a.preventDefault(),a.stopPropagation(),h.close()):40!==a.which||h.isOpen||(h.isOpen=!0)},h.$watch("isOpen",function(a){a?(h.$broadcast("datepicker.focus"),h.position=p?d.offset(i):d.position(i),h.position.top=h.position.top+i.prop("offsetHeight"),c.bind("click",s)):c.unbind("click",s)}),h.select=function(a){if("today"===a){var b=new Date;angular.isDate(k.$modelValue)?(a=new Date(k.$modelValue),a.setFullYear(b.getFullYear(),b.getMonth(),b.getDate())):a=new Date(b.setHours(0,0,0,0))}h.dateSelection(a)},h.close=function(){h.isOpen=!1,i[0].focus()};var u=a(q)(h);
// Prevent jQuery cache memory leak (template is now redundant after linking)
q.remove(),p?c.find("body").append(u):i.after(u),h.$on("$destroy",function(){u.remove(),i.unbind("keydown",t),c.unbind("click",s)})}}}]).directive("datepickerPopupWrap",function(){return{restrict:"EA",replace:!0,transclude:!0,templateUrl:"template/datepicker/popup.html",link:function(a,b,c){b.bind("click",function(a){a.preventDefault(),a.stopPropagation()})}}}),angular.module("ui.bootstrap.dropdown",[]).constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(a){var b=null;this.open=function(e){b||(a.bind("click",c),a.bind("keydown",d)),b&&b!==e&&(b.isOpen=!1),b=e},this.close=function(e){b===e&&(b=null,a.unbind("click",c),a.unbind("keydown",d))};var c=function(a){
// This method may still be called during the same mouse event that
// unbound this event handler. So check openScope before proceeding.
if(b){var c=b.getToggleElement();a&&c&&c[0].contains(a.target)||b.$apply(function(){b.isOpen=!1})}},d=function(a){27===a.which&&(b.focusToggleElement(),c())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(a,b,c,d,e,f){var g,h=this,i=a.$new(),// create a child scope so we are not polluting original one
j=d.openClass,k=angular.noop,l=b.onToggle?c(b.onToggle):angular.noop;this.init=function(d){h.$element=d,b.isOpen&&(g=c(b.isOpen),k=g.assign,a.$watch(g,function(a){i.isOpen=!!a}))},this.toggle=function(a){return i.isOpen=arguments.length?!!a:!i.isOpen},
// Allow other directives to watch status
this.isOpen=function(){return i.isOpen},i.getToggleElement=function(){return h.toggleElement},i.focusToggleElement=function(){h.toggleElement&&h.toggleElement[0].focus()},i.$watch("isOpen",function(b,c){f[b?"addClass":"removeClass"](h.$element,j),b?(i.focusToggleElement(),e.open(i)):e.close(i),k(a,b),angular.isDefined(b)&&b!==c&&l(a,{open:!!b})}),a.$on("$locationChangeSuccess",function(){i.isOpen=!1}),a.$on("$destroy",function(){i.$destroy()})}]).directive("dropdown",function(){return{controller:"DropdownController",link:function(a,b,c,d){d.init(b)}}}).directive("dropdownToggle",function(){return{require:"?^dropdown",link:function(a,b,c,d){if(d){d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),
// WAI-ARIA
b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.transition"]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$timeout",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(b,c,d){b.backdropClass=d.backdropClass||"",b.animate=!1,
//trigger CSS transitions
a(function(){b.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(a,b){return{restrict:"EA",scope:{index:"@",animate:"="},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(c,d,e){d.addClass(e.windowClass||""),c.size=e.size,b(function(){
// trigger CSS transitions
c.animate=!0,/**
           * Auto-focusing of a freshly-opened modal element causes any child elements
           * with the autofocus attribute to lose focus. This is an issue on touch
           * based devices which will show and then hide the onscreen keyboard.
           * Attempts to refocus the autofocus element via JavaScript will not reopen
           * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
           * the modal element if the modal does not contain an autofocus element.
           */
d[0].querySelectorAll("[autofocus]").length||d[0].focus()}),c.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!=c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))}}}}]).directive("modalTransclude",function(){return{link:function(a,b,c,d,e){e(a.$parent,function(a){b.empty(),b.append(a)})}}}).factory("$modalStack",["$transition","$timeout","$document","$compile","$rootScope","$$stackedMap",function(a,b,c,d,e,f){function g(){for(var a=-1,b=n.keys(),c=0;c<b.length;c++)n.get(b[c]).value.backdrop&&(a=c);return a}function h(a){var b=c.find("body").eq(0),d=n.get(a).value;
//clean up the stack
n.remove(a),
//remove window DOM element
j(d.modalDomEl,d.modalScope,300,function(){d.modalScope.$destroy(),b.toggleClass(m,n.length()>0),i()})}function i(){
//remove backdrop if no longer needed
if(k&&-1==g()){var a=l;j(k,l,150,function(){a.$destroy(),a=null}),k=void 0,l=void 0}}function j(c,d,e,f){function g(){g.done||(g.done=!0,c.remove(),f&&f())}
// Closing animation
d.animate=!1;var h=a.transitionEndEventName;if(h){
// transition out
var i=b(g,e);c.bind(h,function(){b.cancel(i),g(),d.$apply()})}else
// Ensure this call is async
b(g)}var k,l,m="modal-open",n=f.createNew(),o={};return e.$watch(g,function(a){l&&(l.index=a)}),c.bind("keydown",function(a){var b;27===a.which&&(b=n.top(),b&&b.value.keyboard&&(a.preventDefault(),e.$apply(function(){o.dismiss(b.key,"escape key press")})))}),o.open=function(a,b){n.add(a,{deferred:b.deferred,modalScope:b.scope,backdrop:b.backdrop,keyboard:b.keyboard});var f=c.find("body").eq(0),h=g();if(h>=0&&!k){l=e.$new(!0),l.index=h;var i=angular.element("<div modal-backdrop></div>");i.attr("backdrop-class",b.backdropClass),k=d(i)(l),f.append(k)}var j=angular.element("<div modal-window></div>");j.attr({"template-url":b.windowTemplateUrl,"window-class":b.windowClass,size:b.size,index:n.length()-1,animate:"animate"}).html(b.content);var o=d(j)(b.scope);n.top().value.modalDomEl=o,f.append(o),f.addClass(m)},o.close=function(a,b){var c=n.get(a);c&&(c.value.deferred.resolve(b),h(a))},o.dismiss=function(a,b){var c=n.get(a);c&&(c.value.deferred.reject(b),h(a))},o.dismissAll=function(a){for(var b=this.getTop();b;)this.dismiss(b.key,a),b=this.getTop()},o.getTop=function(){return n.top()},o}]).provider("$modal",function(){var a={options:{backdrop:!0,//can be also false or 'static'
keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?d.when(a.template):e.get(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl,{cache:f}).then(function(a){return a.data})}function j(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var k={};return k.open=function(b){var e=d.defer(),f=d.defer(),k={result:e.promise,opened:f.promise,close:function(a){h.close(k,a)},dismiss:function(a){h.dismiss(k,a)}};
//verify options
if(
//merge and clean up options
b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var l=d.all([i(b)].concat(j(b.resolve)));return l.then(function(a){var d=(b.scope||c).$new();d.$close=k.close,d.$dismiss=k.dismiss;var f,i={},j=1;
//controllers
b.controller&&(i.$scope=d,i.$modalInstance=k,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),f=g(b.controller,i),b.controllerAs&&(d[b.controllerAs]=f)),h.open(k,{scope:d,deferred:e,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,backdropClass:b.backdropClass,windowClass:b.windowClass,windowTemplateUrl:b.windowTemplateUrl,size:b.size})},function(a){e.reject(a)}),l.then(function(){f.resolve(!0)},function(){f.reject(!1)}),k},k}]};return a}),angular.module("ui.bootstrap.pagination",[]).controller("PaginationController",["$scope","$attrs","$parse",function(a,b,c){var d=this,e={$setViewValue:angular.noop},// nullModelCtrl
f=b.numPages?c(b.numPages).assign:angular.noop;this.init=function(f,g){e=f,this.config=g,e.$render=function(){d.render()},b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){d.itemsPerPage=parseInt(b,10),a.totalPages=d.calculateTotalPages()}):this.itemsPerPage=g.itemsPerPage},this.calculateTotalPages=function(){var b=this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage);return Math.max(b||0,1)},this.render=function(){a.page=parseInt(e.$viewValue,10)||1},a.selectPage=function(b){a.page!==b&&b>0&&b<=a.totalPages&&(e.$setViewValue(b),e.$render())},a.getText=function(b){return a[b+"Text"]||d.config[b+"Text"]},a.noPrevious=function(){return 1===a.page},a.noNext=function(){return a.page===a.totalPages},a.$watch("totalItems",function(){a.totalPages=d.calculateTotalPages()}),a.$watch("totalPages",function(b){f(a.$parent,b),// Readonly variable
a.page>b?a.selectPage(b):e.$render()})}]).constant("paginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("pagination",["$parse","paginationConfig",function(a,b){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@"},require:["pagination","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pagination.html",replace:!0,link:function(c,d,e,f){
// Create page object used in template
function g(a,b,c){return{number:a,text:b,active:c}}function h(a,b){var c=[],d=1,e=b,f=angular.isDefined(k)&&b>k;
// recompute if maxSize
f&&(l?(
// Current page is displayed in the middle of the visible ones
d=Math.max(a-Math.floor(k/2),1),e=d+k-1,
// Adjust if limit is exceeded
e>b&&(e=b,d=e-k+1)):(
// Visible pages are paginated with maxSize
d=(Math.ceil(a/k)-1)*k+1,
// Adjust last page if limit is exceeded
e=Math.min(d+k-1,b)));
// Add page number links
for(var h=d;e>=h;h++){var i=g(h,h,h===a);c.push(i)}
// Add links to move between page sets
if(f&&!l){if(d>1){var j=g(d-1,"...",!1);c.unshift(j)}if(b>e){var m=g(e+1,"...",!1);c.push(m)}}return c}var i=f[0],j=f[1];if(j){
// Setup configuration parameters
var k=angular.isDefined(e.maxSize)?c.$parent.$eval(e.maxSize):b.maxSize,l=angular.isDefined(e.rotate)?c.$parent.$eval(e.rotate):b.rotate;c.boundaryLinks=angular.isDefined(e.boundaryLinks)?c.$parent.$eval(e.boundaryLinks):b.boundaryLinks,c.directionLinks=angular.isDefined(e.directionLinks)?c.$parent.$eval(e.directionLinks):b.directionLinks,i.init(j,b),e.maxSize&&c.$parent.$watch(a(e.maxSize),function(a){k=parseInt(a,10),i.render()});var m=i.render;i.render=function(){m(),c.page>0&&c.page<=c.totalPages&&(c.pages=h(c.page,c.totalPages))}}}}}]).constant("pagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("pager",["pagerConfig",function(a){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@"},require:["pager","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pager.html",replace:!0,link:function(b,c,d,e){var f=e[0],g=e[1];g&&(b.align=angular.isDefined(d.align)?b.$parent.$eval(d.align):a.align,f.init(g,a))}}}]),/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).provider("$tooltip",function(){/**
   * This is a helper function for translating camel-case to snake-case.
   */
function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}
// The default options tooltip and popover.
var b={placement:"top",animation:!0,popupDelay:0},c={mouseenter:"mouseleave",click:"click",focus:"blur"},d={};/**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
this.options=function(a){angular.extend(d,a)},/**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
this.setTriggers=function(a){angular.extend(c,a)},/**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
this.$get=["$window","$compile","$timeout","$document","$position","$interpolate",function(e,f,g,h,i,j){return function(e,k,l){/**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
function m(a){var b=a||n.trigger||l,d=c[b]||b;return{show:b,hide:d}}var n=angular.extend({},b,d),o=a(e),p=j.startSymbol(),q=j.endSymbol(),r="<div "+o+'-popup title="'+p+"title"+q+'" content="'+p+"content"+q+'" placement="'+p+"placement"+q+'" animation="animation" is-open="isOpen"></div>';return{restrict:"EA",compile:function(a,b){var c=f(r);return function(a,b,d){function f(){D.isOpen?l():j()}
// Show the tooltip with delay if specified, otherwise show it immediately
function j(){(!C||a.$eval(d[k+"Enable"]))&&(s(),D.popupDelay?
// Do nothing if the tooltip was already scheduled to pop-up.
// This happens if show is triggered multiple times before any hide is triggered.
z||(z=g(o,D.popupDelay,!1),z.then(function(a){a()})):o()())}function l(){a.$apply(function(){p()})}
// Show the tooltip popup element.
function o(){
// Don't show empty tooltips.
// If there is a pending remove transition, we must cancel it, lest the
// tooltip be mysteriously removed.
// Don't show empty tooltips.
// Set the initial positioning.
// And show the tooltip.
return z=null,y&&(g.cancel(y),y=null),D.content?(q(),w.css({top:0,left:0,display:"block"}),D.$digest(),E(),D.isOpen=!0,D.$digest(),E):angular.noop}
// Hide the tooltip popup element.
function p(){
// First things first: we don't show it anymore.
D.isOpen=!1,
//if tooltip is going to be shown after delay, we must cancel this
g.cancel(z),z=null,
// And now we remove it from the DOM. However, if we have animation, we
// need to wait for it to expire beforehand.
// FIXME: this is a placeholder for a port of the transitions library.
D.animation?y||(y=g(r,500)):r()}function q(){
// There can only be one tooltip element per directive shown at once.
w&&r(),x=D.$new(),w=c(x,function(a){A?h.find("body").append(a):b.after(a)})}function r(){y=null,w&&(w.remove(),w=null),x&&(x.$destroy(),x=null)}function s(){t(),u()}function t(){var a=d[k+"Placement"];D.placement=angular.isDefined(a)?a:n.placement}function u(){var a=d[k+"PopupDelay"],b=parseInt(a,10);D.popupDelay=isNaN(b)?n.popupDelay:b}function v(){var a=d[k+"Trigger"];F(),B=m(a),B.show===B.hide?b.bind(B.show,f):(b.bind(B.show,j),b.bind(B.hide,l))}var w,x,y,z,A=angular.isDefined(n.appendToBody)?n.appendToBody:!1,B=m(void 0),C=angular.isDefined(d[k+"Enable"]),D=a.$new(!0),E=function(){var a=i.positionElements(b,w,D.placement,A);a.top+="px",a.left+="px",
// Now set the calculated positioning.
w.css(a)};
// By default, the tooltip is not open.
// TODO add ability to start tooltip opened
D.isOpen=!1,/**
             * Observe the relevant attributes.
             */
d.$observe(e,function(a){D.content=a,!a&&D.isOpen&&p()}),d.$observe(k+"Title",function(a){D.title=a});var F=function(){b.unbind(B.show,j),b.unbind(B.hide,l)};v();var G=a.$eval(d[k+"Animation"]);D.animation=angular.isDefined(G)?!!G:n.animation;var H=a.$eval(d[k+"AppendToBody"]);A=angular.isDefined(H)?H:A,
// if a tooltip is attached to <body> we need to remove it on
// location change as its parent scope will probably not be destroyed
// by the change.
A&&a.$on("$locationChangeSuccess",function(){D.isOpen&&p()}),
// Make sure tooltip is destroyed and removed.
a.$on("$destroy",function(){g.cancel(y),g.cancel(z),F(),r(),D=null})}}}}}]}).directive("tooltipPopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html"}}).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipHtmlUnsafePopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-unsafe-popup.html"}}).directive("tooltipHtmlUnsafe",["$tooltip",function(a){return a("tooltipHtmlUnsafe","tooltip","mouseenter")}]),/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("popoverPopup",function(){return{restrict:"EA",replace:!0,scope:{title:"@",content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html"}}).directive("popover",["$tooltip",function(a){return a("popover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("progressConfig",{animate:!0,max:100}).controller("ProgressController",["$scope","$attrs","progressConfig",function(a,b,c){var d=this,e=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max,this.addBar=function(b,c){e||c.css({transition:"none"}),this.bars.push(b),b.$watch("value",function(c){b.percent=+(100*c/a.max).toFixed(2)}),b.$on("$destroy",function(){c=null,d.removeBar(b)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1)}}]).directive("progress",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",require:"progress",scope:{},templateUrl:"template/progressbar/progress.html"}}).directive("bar",function(){return{restrict:"EA",replace:!0,transclude:!0,require:"^progress",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b)}}}).directive("progressbar",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]))}}}),angular.module("ui.bootstrap.rating",[]).constant("ratingConfig",{max:5,stateOn:null,stateOff:null}).controller("RatingController",["$scope","$attrs","ratingConfig",function(a,b,c){var d={$setViewValue:angular.noop};this.init=function(e){d=e,d.$render=this.render,this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff;var f=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(f)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff},a[b]);return a},a.rate=function(b){!a.readonly&&b>=0&&b<=a.range.length&&(d.$setViewValue(b),d.$render())},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue}}]).directive("rating",function(){return{restrict:"EA",require:["rating","ngModel"],scope:{readonly:"=?",onHover:"&",onLeave:"&"},controller:"RatingController",templateUrl:"template/rating/rating.html",replace:!0,link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}),/**
 * @ngdoc overview
 * @name ui.bootstrap.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */
angular.module("ui.bootstrap.tabs",[]).controller("TabsetController",["$scope",function(a){var b=this,c=b.tabs=a.tabs=[];b.select=function(a){angular.forEach(c,function(b){b.active&&b!==a&&(b.active=!1,b.onDeselect())}),a.active=!0,a.onSelect()},b.addTab=function(a){c.push(a),
// we can't run the select function on the first tab
// since that would select it twice
1===c.length?a.active=!0:a.active&&b.select(a)},b.removeTab=function(a){var e=c.indexOf(a);
//Select a new tab if the tab to be removed is selected and not destroyed
if(a.active&&c.length>1&&!d){
//If this is the last tab, select the previous tab. else, the next tab.
var f=e==c.length-1?e-1:e+1;b.select(c[f])}c.splice(e,1)};var d;a.$on("$destroy",function(){d=!0})}]).directive("tabset",function(){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("tab",["$parse",function(a){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",heading:"@",onSelect:"&select",//This callback is called in contentHeadingTransclude
//once it inserts the tab's content into the dom
onDeselect:"&deselect"},controller:function(){},compile:function(b,c,d){return function(b,c,e,f){b.$watch("active",function(a){a&&f.select(b)}),b.disabled=!1,e.disabled&&b.$parent.$watch(a(e.disabled),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},f.addTab(b),b.$on("$destroy",function(){f.removeTab(b)}),
//We need to transclude later, once the content container is ready.
//when this link happens, we're inside a tab heading.
b.$transcludeFn=d}}}}]).directive("tabHeadingTransclude",[function(){return{restrict:"A",require:"^tab",link:function(a,b,c,d){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}]).directive("tabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^tabset",link:function(b,c,d){var e=b.$eval(d.tabContentTransclude);
//Now our tab is ready to be transcluded: both the tab heading area
//and the tab content area are loaded.  Transclude 'em both.
e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?
//Let tabHeadingTransclude know.
e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.timepicker",[]).constant("timepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:null,readonlyInput:!1,mousewheel:!0}).controller("TimepickerController",["$scope","$attrs","$parse","$log","$locale","timepickerConfig",function(a,b,c,d,e,f){
// Get $scope.hours in 24H mode if valid
function g(){var b=parseInt(a.hours,10),c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c?(a.showMeridian&&(12===b&&(b=0),a.meridian===p[1]&&(b+=12)),b):void 0}function h(){var b=parseInt(a.minutes,10);return b>=0&&60>b?b:void 0}function i(a){return angular.isDefined(a)&&a.toString().length<2?"0"+a:a}
// Call internally when we know that model is valid.
function j(a){k(),o.$setViewValue(new Date(n)),l(a)}function k(){o.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1}function l(b){var c=n.getHours(),d=n.getMinutes();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:i(c),a.minutes="m"===b?d:i(d),a.meridian=n.getHours()<12?p[0]:p[1]}function m(a){var b=new Date(n.getTime()+6e4*a);n.setHours(b.getHours(),b.getMinutes()),j()}var n=new Date,o={$setViewValue:angular.noop},// nullModelCtrl
p=angular.isDefined(b.meridians)?a.$parent.$eval(b.meridians):f.meridians||e.DATETIME_FORMATS.AMPMS;this.init=function(c,d){o=c,o.$render=this.render;var e=d.eq(0),g=d.eq(1),h=angular.isDefined(b.mousewheel)?a.$parent.$eval(b.mousewheel):f.mousewheel;h&&this.setupMousewheelEvents(e,g),a.readonlyInput=angular.isDefined(b.readonlyInput)?a.$parent.$eval(b.readonlyInput):f.readonlyInput,this.setupInputEvents(e,g)};var q=f.hourStep;b.hourStep&&a.$parent.$watch(c(b.hourStep),function(a){q=parseInt(a,10)});var r=f.minuteStep;b.minuteStep&&a.$parent.$watch(c(b.minuteStep),function(a){r=parseInt(a,10)}),
// 12H / 24H mode
a.showMeridian=f.showMeridian,b.showMeridian&&a.$parent.$watch(c(b.showMeridian),function(b){if(a.showMeridian=!!b,o.$error.time){
// Evaluate from template
var c=g(),d=h();angular.isDefined(c)&&angular.isDefined(d)&&(n.setHours(c),j())}else l()}),
// Respond on mousewheel spin
this.setupMousewheelEvents=function(b,c){var d=function(a){a.originalEvent&&(a=a.originalEvent);
//pick correct delta variable depending on event
var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()})},this.setupInputEvents=function(b,c){if(a.readonlyInput)return a.updateHours=angular.noop,void(a.updateMinutes=angular.noop);var d=function(b,c){o.$setViewValue(null),o.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b),angular.isDefined(c)&&(a.invalidMinutes=c)};a.updateHours=function(){var a=g();angular.isDefined(a)?(n.setHours(a),j("h")):d(!0)},b.bind("blur",function(b){!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=i(a.hours)})}),a.updateMinutes=function(){var a=h();angular.isDefined(a)?(n.setMinutes(a),j("m")):d(void 0,!0)},c.bind("blur",function(b){!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=i(a.minutes)})})},this.render=function(){var a=o.$modelValue?new Date(o.$modelValue):null;isNaN(a)?(o.$setValidity("time",!1),d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(a&&(n=a),k(),l())},a.incrementHours=function(){m(60*q)},a.decrementHours=function(){m(60*-q)},a.incrementMinutes=function(){m(r)},a.decrementMinutes=function(){m(-r)},a.toggleMeridian=function(){m(720*(n.getHours()<12?1:-1))}}]).directive("timepicker",function(){return{restrict:"EA",require:["timepicker","?^ngModel"],controller:"TimepickerController",replace:!0,scope:{},templateUrl:"template/timepicker/timepicker.html",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(a){
//                      00000111000000000000022200000000000000003333333333333330000000000044000
var b=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(a,b,c,d,e,f,g){var h=[9,13,27,38,40];return{require:"ngModel",link:function(i,j,k,l){
//SUPPORTED ATTRIBUTES (OPTIONS)
//minimal no of characters that needs to be entered before typeahead kicks-in
var m,n=i.$eval(k.typeaheadMinLength)||1,o=i.$eval(k.typeaheadWaitMs)||0,p=i.$eval(k.typeaheadEditable)!==!1,q=b(k.typeaheadLoading).assign||angular.noop,r=b(k.typeaheadOnSelect),s=k.typeaheadInputFormatter?b(k.typeaheadInputFormatter):void 0,t=k.typeaheadAppendToBody?i.$eval(k.typeaheadAppendToBody):!1,u=i.$eval(k.typeaheadFocusFirst)!==!1,v=b(k.ngModel).assign,w=g.parse(k.typeahead),x=i.$new();i.$on("$destroy",function(){x.$destroy()});
// WAI-ARIA
var y="typeahead-"+x.$id+"-"+Math.floor(1e4*Math.random());j.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":y});
//pop-up element used to display matches
var z=angular.element("<div typeahead-popup></div>");z.attr({id:y,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),
//custom item template
angular.isDefined(k.typeaheadTemplateUrl)&&z.attr("template-url",k.typeaheadTemplateUrl);var A=function(){x.matches=[],x.activeIdx=-1,j.attr("aria-expanded",!1)},B=function(a){return y+"-option-"+a};
// Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
// This attribute is added or removed automatically when the `activeIdx` changes.
x.$watch("activeIdx",function(a){0>a?j.removeAttr("aria-activedescendant"):j.attr("aria-activedescendant",B(a))});var C=function(a){var b={$viewValue:a};q(i,!0),c.when(w.source(i,b)).then(function(c){
//it might happen that several async queries were in progress if a user were typing fast
//but we are interested only in responses that correspond to the current view value
var d=a===l.$viewValue;if(d&&m)if(c.length>0){x.activeIdx=u?0:-1,x.matches.length=0;
//transform labels
for(var e=0;e<c.length;e++)b[w.itemName]=c[e],x.matches.push({id:B(e),label:w.viewMapper(x,b),model:c[e]});x.query=a,
//position pop-up with matches - we need to re-calculate its position each time we are opening a window
//with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
//due to other elements being rendered
x.position=t?f.offset(j):f.position(j),x.position.top=x.position.top+j.prop("offsetHeight"),j.attr("aria-expanded",!0)}else A();d&&q(i,!1)},function(){A(),q(i,!1)})};A(),
//we need to propagate user's query so we can higlight matches
x.query=void 0;
//Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
var D,E=function(a){D=d(function(){C(a)},o)},F=function(){D&&d.cancel(D)};
//plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
//$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
l.$parsers.unshift(function(a){
// Reset in case user had typed something previously.
return m=!0,a&&a.length>=n?o>0?(F(),E(a)):C(a):(q(i,!1),F(),A()),p?a:a?void l.$setValidity("editable",!1):(l.$setValidity("editable",!0),a)}),l.$formatters.push(function(a){var b,c,d={};
//it might happen that we don't have enough info to properly render input value
//we need to check for this situation and simply return model value if we can't apply custom formatting
return s?(d.$model=a,s(i,d)):(d[w.itemName]=a,b=w.viewMapper(i,d),d[w.itemName]=void 0,c=w.viewMapper(i,d),b!==c?b:a)}),x.select=function(a){
//called from within the $digest() cycle
var b,c,e={};e[w.itemName]=c=x.matches[a].model,b=w.modelMapper(i,e),v(i,b),l.$setValidity("editable",!0),r(i,{$item:c,$model:b,$label:w.viewMapper(i,e)}),A(),
//return focus to the input element if a match was selected via a mouse click event
// use timeout to avoid $rootScope:inprog error
d(function(){j[0].focus()},0,!1)},
//bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
j.bind("keydown",function(a){
//typeahead is open and an "interesting" key was pressed
0!==x.matches.length&&-1!==h.indexOf(a.which)&&(-1!=x.activeIdx||13!==a.which&&9!==a.which)&&(a.preventDefault(),40===a.which?(x.activeIdx=(x.activeIdx+1)%x.matches.length,x.$digest()):38===a.which?(x.activeIdx=(x.activeIdx>0?x.activeIdx:x.matches.length)-1,x.$digest()):13===a.which||9===a.which?x.$apply(function(){x.select(x.activeIdx)}):27===a.which&&(a.stopPropagation(),A(),x.$digest()))}),j.bind("blur",function(a){m=!1});
// Keep reference to click handler to unbind it.
var G=function(a){j[0]!==a.target&&(A(),x.$digest())};e.bind("click",G),i.$on("$destroy",function(){e.unbind("click",G),t&&H.remove()});var H=a(z)(x);t?e.find("body").append(H):j.after(H)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(a,b,c){a.templateUrl=c.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(b){return a.active==b},a.selectActive=function(b){a.active=b},a.selectMatch=function(b){a.select({activeIdx:b})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(a,b,c,d){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(e,f,g){var h=d(g.templateUrl)(e.$parent)||"template/typeahead/typeahead-match.html";a.get(h,{cache:b}).success(function(a){f.replaceWith(c(a.trim())(e))})}}}]).filter("typeaheadHighlight",function(){function a(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(b,c){return c?(""+b).replace(new RegExp(a(c),"gi"),"<strong>$&</strong>"):b}}),angular.module("template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion-group.html",'<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')}]),angular.module("template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion.html",'<div class="panel-group" ng-transclude></div>')}]),angular.module("template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("template/alert/alert.html",'<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')}]),angular.module("template/carousel/carousel.html",[]).run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')}]),angular.module("template/carousel/slide.html",[]).run(["$templateCache",function(a){a.put("template/carousel/slide.html","<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")}]),angular.module("template/datepicker/datepicker.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/datepicker.html",'<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')}]),angular.module("template/datepicker/day.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/day.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/month.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/month.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/popup.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/popup.html",'<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')}]),angular.module("template/datepicker/year.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/year.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(a){a.put("template/modal/backdrop.html",'<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(a){a.put("template/modal/window.html",'<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')}]),angular.module("template/pagination/pager.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pager.html",'<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')}]),angular.module("template/pagination/pagination.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pagination.html",'<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')}]),angular.module("template/tooltip/tooltip-html-unsafe-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-html-unsafe-popup.html",'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')}]),angular.module("template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-popup.html",'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')}]),angular.module("template/popover/popover.html",[]).run(["$templateCache",function(a){a.put("template/popover/popover.html",'<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')}]),angular.module("template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')}]),angular.module("template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progress.html",'<div class="progress" ng-transclude></div>')}]),angular.module("template/progressbar/progressbar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')}]),angular.module("template/rating/rating.html",[]).run(["$templateCache",function(a){a.put("template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')}]),angular.module("template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tab.html",'<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')}]),angular.module("template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset.html",'<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("template/timepicker/timepicker.html",'<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')}]),angular.module("template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-match.html",'<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')}]),angular.module("template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')}]),/** 
* @version 2.0.2
* @license MIT
*/
function(a,b){"use strict";a.module("smart-table",[]).run(["$templateCache",function(a){a.put("template/smart-table/pagination.html",'<nav ng-if="pages.length >= 2"><ul class="pagination"><li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li></ul></nav>')}]),a.module("smart-table").constant("stConfig",{pagination:{template:"template/smart-table/pagination.html",itemsByPage:10,displayedPages:5},search:{delay:400},select:{mode:"single",selectedClass:"st-selected"},sort:{ascentClass:"st-sort-ascent",descentClass:"st-sort-descent"},pipe:{delay:100}}),a.module("smart-table").controller("stTableController",["$scope","$parse","$filter","$attrs",function(c,d,e,f){function g(a){return a?[].concat(a):[]}function h(){q=g(i(c)),s===!0&&t.pipe()}var i,j,k,l=f.stTable,m=d(l),n=m.assign,o=e("orderBy"),p=e("filter"),q=g(m(c)),r={sort:{},search:{},pagination:{start:0}},s=!0,t=this;f.stSafeSrc&&(i=d(f.stSafeSrc),c.$watch(function(){var a=i(c);return a?a.length:0},function(a,b){a!==q.length&&h()}),c.$watch(function(){return i(c)},function(a,b){a!==b&&h()})),/**
     * sort the rows
     * @param {Function | String} predicate - function or string which will be used as predicate for the sorting
     * @param [reverse] - if you want to reverse the order
     */
this.sortBy=function(b,c){return r.sort.predicate=b,r.sort.reverse=c===!0,a.isFunction(b)?r.sort.functionName=b.name:delete r.sort.functionName,r.pagination.start=0,this.pipe()},/**
     * search matching rows
     * @param {String} input - the input string
     * @param {String} [predicate] - the property name against you want to check the match, otherwise it will search on all properties
     */
this.search=function(b,c){var d=r.search.predicateObject||{},e=c?c:"$";
// to avoid to filter out null value
return b=a.isString(b)?b.trim():b,d[e]=b,b||delete d[e],r.search.predicateObject=d,r.pagination.start=0,this.pipe()},/**
     * this will chain the operations of sorting and filtering based on the current table state (sort options, filtering, ect)
     */
this.pipe=function(){var a,d=r.pagination;j=r.search.predicateObject?p(q,r.search.predicateObject):q,r.sort.predicate&&(j=o(j,r.sort.predicate,r.sort.reverse)),d.number!==b&&(d.numberOfPages=j.length>0?Math.ceil(j.length/d.number):1,d.start=d.start>=j.length?(d.numberOfPages-1)*d.number:d.start,a=j.slice(d.start,d.start+parseInt(d.number))),n(c,a||j)},/**
     * select a dataRow (it will add the attribute isSelected to the row object)
     * @param {Object} row - the row to select
     * @param {String} [mode] - "single" or "multiple" (multiple by default)
     */
this.select=function(a,c){var d=q,e=d.indexOf(a);-1!==e&&("single"===c?(a.isSelected=a.isSelected!==!0,k&&(k.isSelected=!1),k=a.isSelected===!0?a:b):d[e].isSelected=!d[e].isSelected)},/**
     * take a slice of the current sorted/filtered collection (pagination)
     *
     * @param {Number} start - start index of the slice
     * @param {Number} number - the number of item in the slice
     */
this.slice=function(a,b){return r.pagination.start=a,r.pagination.number=b,this.pipe()},/**
     * return the current state of the table
     * @returns {{sort: {}, search: {}, pagination: {start: number}}}
     */
this.tableState=function(){return r},this.getFilteredCollection=function(){return j||q},/**
     * Use a different filter function than the angular FilterFilter
     * @param filterName the name under which the custom filter is registered
     */
this.setFilterFunction=function(a){p=e(a)},/**
     * Use a different function than the angular orderBy
     * @param sortFunctionName the name under which the custom order function is registered
     */
this.setSortFunction=function(a){o=e(a)},/**
     * Usually when the safe copy is updated the pipe function is called.
     * Calling this method will prevent it, which is something required when using a custom pipe function
     */
this.preventPipeOnWatch=function(){s=!1}}]).directive("stTable",function(){return{restrict:"A",controller:"stTableController",link:function(a,b,c,d){c.stSetFilter&&d.setFilterFunction(c.stSetFilter),c.stSetSort&&d.setSortFunction(c.stSetSort)}}}),a.module("smart-table").directive("stSearch",["stConfig","$timeout",function(a,b){return{require:"^stTable",link:function(c,d,e,f){var g=f,h=null,i=e.stDelay||a.search.delay;e.$observe("stSearch",function(a,b){var c=d[0].value;a!==b&&c&&(f.tableState().search={},g.search(c,a))}),
//table state -> view
c.$watch(function(){return f.tableState().search},function(a,b){var c=e.stSearch||"$";a.predicateObject&&a.predicateObject[c]!==d[0].value&&(d[0].value=a.predicateObject[c]||"")},!0),
// view -> table state
d.bind("input",function(a){a=a.originalEvent||a,null!==h&&b.cancel(h),h=b(function(){g.search(a.target.value,e.stSearch||""),h=null},i)})}}}]),a.module("smart-table").directive("stSelectRow",["stConfig",function(a){return{restrict:"A",require:"^stTable",scope:{row:"=stSelectRow"},link:function(b,c,d,e){var f=d.stSelectMode||a.select.mode;c.bind("click",function(){b.$apply(function(){e.select(b.row,f)})}),b.$watch("row.isSelected",function(b){b===!0?c.addClass(a.select.selectedClass):c.removeClass(a.select.selectedClass)})}}}]),a.module("smart-table").directive("stSort",["stConfig","$parse",function(c,d){return{restrict:"A",require:"^stTable",link:function(e,f,g,h){
//view --> table state
function i(){m++,k=a.isFunction(l(e))?l(e):g.stSort,m%3===0&&g.stSkipNatural===b?(
//manual reset
m=0,h.tableState().sort={},h.tableState().pagination.start=0,h.pipe()):h.sortBy(k,m%2===0)}var j,k=g.stSort,l=d(k),m=0,n=g.stClassAscent||c.sort.ascentClass,o=g.stClassDescent||c.sort.descentClass,p=[n,o];g.stSortDefault&&(j=e.$eval(g.stSortDefault)!==b?e.$eval(g.stSortDefault):g.stSortDefault),f.bind("click",function(){k&&e.$apply(i)}),j&&(m="reverse"===j?1:0,i()),
//table state --> view
e.$watch(function(){return h.tableState().sort},function(a){a.predicate!==k?(m=0,f.removeClass(n).removeClass(o)):(m=a.reverse===!0?2:1,f.removeClass(p[m%2]).addClass(p[m-1]))},!0)}}}]),a.module("smart-table").directive("stPagination",["stConfig",function(a){return{restrict:"EA",require:"^stTable",scope:{stItemsByPage:"=?",stDisplayedPages:"=?",stPageChange:"&"},templateUrl:function(b,c){return c.stTemplate?c.stTemplate:a.pagination.template},link:function(b,c,d,e){function f(){var a,c,d=e.tableState().pagination,f=1,g=b.currentPage;for(b.currentPage=Math.floor(d.start/d.number)+1,f=Math.max(f,b.currentPage-Math.abs(Math.floor(b.stDisplayedPages/2))),a=f+b.stDisplayedPages,a>d.numberOfPages&&(a=d.numberOfPages+1,f=Math.max(1,a-b.stDisplayedPages)),b.pages=[],b.numPages=d.numberOfPages,c=f;a>c;c++)b.pages.push(c);g!==b.currentPage&&b.stPageChange({newPage:b.currentPage})}b.stItemsByPage=b.stItemsByPage?+b.stItemsByPage:a.pagination.itemsByPage,b.stDisplayedPages=b.stDisplayedPages?+b.stDisplayedPages:a.pagination.displayedPages,b.currentPage=1,b.pages=[],
//table state --> view
b.$watch(function(){return e.tableState().pagination},f,!0),
//scope --> table state  (--> view)
b.$watch("stItemsByPage",function(a,c){a!==c&&b.selectPage(1)}),b.$watch("stDisplayedPages",f),
//view -> table state
b.selectPage=function(a){a>0&&a<=b.numPages&&e.slice((a-1)*b.stItemsByPage,b.stItemsByPage)},e.tableState().pagination.number||e.slice(0,b.stItemsByPage)}}}]),a.module("smart-table").directive("stPipe",["stConfig","$timeout",function(b,c){return{require:"stTable",scope:{stPipe:"="},link:{pre:function(d,e,f,g){var h=null;a.isFunction(d.stPipe)&&(g.preventPipeOnWatch(),g.pipe=function(){return null!==h&&c.cancel(h),h=c(function(){d.stPipe(g.tableState(),g)},b.pipe.delay)})},post:function(a,b,c,d){d.pipe()}}}}])}(angular),
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90b3AudHh0Iiwic3JjL3NtYXJ0LXRhYmxlLm1vZHVsZS5qcyIsInNyYy9zdENvbmZpZy5qcyIsInNyYy9zdFRhYmxlLmpzIiwic3JjL3N0U2VhcmNoLmpzIiwic3JjL3N0U2VsZWN0Um93LmpzIiwic3JjL3N0U29ydC5qcyIsInNyYy9zdFBhZ2luYXRpb24uanMiLCJzcmMvc3RQaXBlLmpzIiwic3JjL2JvdHRvbS50eHQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBIiwiZmlsZSI6InNtYXJ0LXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChuZywgdW5kZWZpbmVkKXtcbiAgICAndXNlIHN0cmljdCc7XG4iLCJuZy5tb2R1bGUoJ3NtYXJ0LXRhYmxlJywgW10pLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0ZW1wbGF0ZS9zbWFydC10YWJsZS9wYWdpbmF0aW9uLmh0bWwnLFxuICAgICAgICAnPG5hdiBuZy1pZj1cInBhZ2VzLmxlbmd0aCA+PSAyXCI+PHVsIGNsYXNzPVwicGFnaW5hdGlvblwiPicgK1xuICAgICAgICAnPGxpIG5nLXJlcGVhdD1cInBhZ2UgaW4gcGFnZXNcIiBuZy1jbGFzcz1cInthY3RpdmU6IHBhZ2U9PWN1cnJlbnRQYWdlfVwiPjxhIG5nLWNsaWNrPVwic2VsZWN0UGFnZShwYWdlKVwiPnt7cGFnZX19PC9hPjwvbGk+JyArXG4gICAgICAgICc8L3VsPjwvbmF2PicpO1xufV0pO1xuXG4iLCJuZy5tb2R1bGUoJ3NtYXJ0LXRhYmxlJylcbiAgLmNvbnN0YW50KCdzdENvbmZpZycsIHtcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlL3NtYXJ0LXRhYmxlL3BhZ2luYXRpb24uaHRtbCcsXG4gICAgICBpdGVtc0J5UGFnZTogMTAsXG4gICAgICBkaXNwbGF5ZWRQYWdlczogNVxuICAgIH0sXG4gICAgc2VhcmNoOiB7XG4gICAgICBkZWxheTogNDAwIC8vIG1zXG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIG1vZGU6ICdzaW5nbGUnLFxuICAgICAgc2VsZWN0ZWRDbGFzczogJ3N0LXNlbGVjdGVkJ1xuICAgIH0sXG4gICAgc29ydDoge1xuICAgICAgYXNjZW50Q2xhc3M6ICdzdC1zb3J0LWFzY2VudCcsXG4gICAgICBkZXNjZW50Q2xhc3M6ICdzdC1zb3J0LWRlc2NlbnQnXG4gICAgfSxcbiAgICBwaXBlOiB7XG4gICAgICBkZWxheTogMTAwIC8vbXNcbiAgICB9XG4gIH0pOyIsIm5nLm1vZHVsZSgnc21hcnQtdGFibGUnKVxuICAuY29udHJvbGxlcignc3RUYWJsZUNvbnRyb2xsZXInLCBbJyRzY29wZScsICckcGFyc2UnLCAnJGZpbHRlcicsICckYXR0cnMnLCBmdW5jdGlvbiBTdFRhYmxlQ29udHJvbGxlciAoJHNjb3BlLCAkcGFyc2UsICRmaWx0ZXIsICRhdHRycykge1xuICAgIHZhciBwcm9wZXJ0eU5hbWUgPSAkYXR0cnMuc3RUYWJsZTtcbiAgICB2YXIgZGlzcGxheUdldHRlciA9ICRwYXJzZShwcm9wZXJ0eU5hbWUpO1xuICAgIHZhciBkaXNwbGF5U2V0dGVyID0gZGlzcGxheUdldHRlci5hc3NpZ247XG4gICAgdmFyIHNhZmVHZXR0ZXI7XG4gICAgdmFyIG9yZGVyQnkgPSAkZmlsdGVyKCdvcmRlckJ5Jyk7XG4gICAgdmFyIGZpbHRlciA9ICRmaWx0ZXIoJ2ZpbHRlcicpO1xuICAgIHZhciBzYWZlQ29weSA9IGNvcHlSZWZzKGRpc3BsYXlHZXR0ZXIoJHNjb3BlKSk7XG4gICAgdmFyIHRhYmxlU3RhdGUgPSB7XG4gICAgICBzb3J0OiB7fSxcbiAgICAgIHNlYXJjaDoge30sXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIHN0YXJ0OiAwXG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZmlsdGVyZWQ7XG4gICAgdmFyIHBpcGVBZnRlclNhZmVDb3B5ID0gdHJ1ZTtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgdmFyIGxhc3RTZWxlY3RlZDtcblxuICAgIGZ1bmN0aW9uIGNvcHlSZWZzIChzcmMpIHtcbiAgICAgIHJldHVybiBzcmMgPyBbXS5jb25jYXQoc3JjKSA6IFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNhZmVDb3B5ICgpIHtcbiAgICAgIHNhZmVDb3B5ID0gY29weVJlZnMoc2FmZUdldHRlcigkc2NvcGUpKTtcbiAgICAgIGlmIChwaXBlQWZ0ZXJTYWZlQ29weSA9PT0gdHJ1ZSkge1xuICAgICAgICBjdHJsLnBpcGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoJGF0dHJzLnN0U2FmZVNyYykge1xuICAgICAgc2FmZUdldHRlciA9ICRwYXJzZSgkYXR0cnMuc3RTYWZlU3JjKTtcbiAgICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2FmZVNyYyA9IHNhZmVHZXR0ZXIoJHNjb3BlKTtcbiAgICAgICAgcmV0dXJuIHNhZmVTcmMgPyBzYWZlU3JjLmxlbmd0aCA6IDA7XG5cbiAgICAgIH0sIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBzYWZlQ29weS5sZW5ndGgpIHtcbiAgICAgICAgICB1cGRhdGVTYWZlQ29weSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2FmZUdldHRlcigkc2NvcGUpO1xuICAgICAgfSwgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgdXBkYXRlU2FmZUNvcHkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc29ydCB0aGUgcm93c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb24gfCBTdHJpbmd9IHByZWRpY2F0ZSAtIGZ1bmN0aW9uIG9yIHN0cmluZyB3aGljaCB3aWxsIGJlIHVzZWQgYXMgcHJlZGljYXRlIGZvciB0aGUgc29ydGluZ1xuICAgICAqIEBwYXJhbSBbcmV2ZXJzZV0gLSBpZiB5b3Ugd2FudCB0byByZXZlcnNlIHRoZSBvcmRlclxuICAgICAqL1xuICAgIHRoaXMuc29ydEJ5ID0gZnVuY3Rpb24gc29ydEJ5IChwcmVkaWNhdGUsIHJldmVyc2UpIHtcbiAgICAgIHRhYmxlU3RhdGUuc29ydC5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICB0YWJsZVN0YXRlLnNvcnQucmV2ZXJzZSA9IHJldmVyc2UgPT09IHRydWU7XG5cbiAgICAgIGlmIChuZy5pc0Z1bmN0aW9uKHByZWRpY2F0ZSkpIHtcbiAgICAgICAgdGFibGVTdGF0ZS5zb3J0LmZ1bmN0aW9uTmFtZSA9IHByZWRpY2F0ZS5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRhYmxlU3RhdGUuc29ydC5mdW5jdGlvbk5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRhYmxlU3RhdGUucGFnaW5hdGlvbi5zdGFydCA9IDA7XG4gICAgICByZXR1cm4gdGhpcy5waXBlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNlYXJjaCBtYXRjaGluZyByb3dzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IC0gdGhlIGlucHV0IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbcHJlZGljYXRlXSAtIHRoZSBwcm9wZXJ0eSBuYW1lIGFnYWluc3QgeW91IHdhbnQgdG8gY2hlY2sgdGhlIG1hdGNoLCBvdGhlcndpc2UgaXQgd2lsbCBzZWFyY2ggb24gYWxsIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uIHNlYXJjaCAoaW5wdXQsIHByZWRpY2F0ZSkge1xuICAgICAgdmFyIHByZWRpY2F0ZU9iamVjdCA9IHRhYmxlU3RhdGUuc2VhcmNoLnByZWRpY2F0ZU9iamVjdCB8fCB7fTtcbiAgICAgIHZhciBwcm9wID0gcHJlZGljYXRlID8gcHJlZGljYXRlIDogJyQnO1xuXG4gICAgICBpbnB1dCA9IG5nLmlzU3RyaW5nKGlucHV0KSA/IGlucHV0LnRyaW0oKSA6IGlucHV0O1xuICAgICAgcHJlZGljYXRlT2JqZWN0W3Byb3BdID0gaW5wdXQ7XG4gICAgICAvLyB0byBhdm9pZCB0byBmaWx0ZXIgb3V0IG51bGwgdmFsdWVcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgZGVsZXRlIHByZWRpY2F0ZU9iamVjdFtwcm9wXTtcbiAgICAgIH1cbiAgICAgIHRhYmxlU3RhdGUuc2VhcmNoLnByZWRpY2F0ZU9iamVjdCA9IHByZWRpY2F0ZU9iamVjdDtcbiAgICAgIHRhYmxlU3RhdGUucGFnaW5hdGlvbi5zdGFydCA9IDA7XG4gICAgICByZXR1cm4gdGhpcy5waXBlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRoaXMgd2lsbCBjaGFpbiB0aGUgb3BlcmF0aW9ucyBvZiBzb3J0aW5nIGFuZCBmaWx0ZXJpbmcgYmFzZWQgb24gdGhlIGN1cnJlbnQgdGFibGUgc3RhdGUgKHNvcnQgb3B0aW9ucywgZmlsdGVyaW5nLCBlY3QpXG4gICAgICovXG4gICAgdGhpcy5waXBlID0gZnVuY3Rpb24gcGlwZSAoKSB7XG4gICAgICB2YXIgcGFnaW5hdGlvbiA9IHRhYmxlU3RhdGUucGFnaW5hdGlvbjtcbiAgICAgIHZhciBvdXRwdXQ7XG4gICAgICBmaWx0ZXJlZCA9IHRhYmxlU3RhdGUuc2VhcmNoLnByZWRpY2F0ZU9iamVjdCA/IGZpbHRlcihzYWZlQ29weSwgdGFibGVTdGF0ZS5zZWFyY2gucHJlZGljYXRlT2JqZWN0KSA6IHNhZmVDb3B5O1xuICAgICAgaWYgKHRhYmxlU3RhdGUuc29ydC5wcmVkaWNhdGUpIHtcbiAgICAgICAgZmlsdGVyZWQgPSBvcmRlckJ5KGZpbHRlcmVkLCB0YWJsZVN0YXRlLnNvcnQucHJlZGljYXRlLCB0YWJsZVN0YXRlLnNvcnQucmV2ZXJzZSk7XG4gICAgICB9XG4gICAgICBpZiAocGFnaW5hdGlvbi5udW1iZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYWdpbmF0aW9uLm51bWJlck9mUGFnZXMgPSBmaWx0ZXJlZC5sZW5ndGggPiAwID8gTWF0aC5jZWlsKGZpbHRlcmVkLmxlbmd0aCAvIHBhZ2luYXRpb24ubnVtYmVyKSA6IDE7XG4gICAgICAgIHBhZ2luYXRpb24uc3RhcnQgPSBwYWdpbmF0aW9uLnN0YXJ0ID49IGZpbHRlcmVkLmxlbmd0aCA/IChwYWdpbmF0aW9uLm51bWJlck9mUGFnZXMgLSAxKSAqIHBhZ2luYXRpb24ubnVtYmVyIDogcGFnaW5hdGlvbi5zdGFydDtcbiAgICAgICAgb3V0cHV0ID0gZmlsdGVyZWQuc2xpY2UocGFnaW5hdGlvbi5zdGFydCwgcGFnaW5hdGlvbi5zdGFydCArIHBhcnNlSW50KHBhZ2luYXRpb24ubnVtYmVyKSk7XG4gICAgICB9XG4gICAgICBkaXNwbGF5U2V0dGVyKCRzY29wZSwgb3V0cHV0IHx8IGZpbHRlcmVkKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2VsZWN0IGEgZGF0YVJvdyAoaXQgd2lsbCBhZGQgdGhlIGF0dHJpYnV0ZSBpc1NlbGVjdGVkIHRvIHRoZSByb3cgb2JqZWN0KVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByb3cgLSB0aGUgcm93IHRvIHNlbGVjdFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbW9kZV0gLSBcInNpbmdsZVwiIG9yIFwibXVsdGlwbGVcIiAobXVsdGlwbGUgYnkgZGVmYXVsdClcbiAgICAgKi9cbiAgICB0aGlzLnNlbGVjdCA9IGZ1bmN0aW9uIHNlbGVjdCAocm93LCBtb2RlKSB7XG4gICAgICB2YXIgcm93cyA9IHNhZmVDb3B5O1xuICAgICAgdmFyIGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGlmIChtb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgIHJvdy5pc1NlbGVjdGVkID0gcm93LmlzU2VsZWN0ZWQgIT09IHRydWU7XG4gICAgICAgICAgaWYgKGxhc3RTZWxlY3RlZCkge1xuICAgICAgICAgICAgbGFzdFNlbGVjdGVkLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFzdFNlbGVjdGVkID0gcm93LmlzU2VsZWN0ZWQgPT09IHRydWUgPyByb3cgOiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93c1tpbmRleF0uaXNTZWxlY3RlZCA9ICFyb3dzW2luZGV4XS5pc1NlbGVjdGVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRha2UgYSBzbGljZSBvZiB0aGUgY3VycmVudCBzb3J0ZWQvZmlsdGVyZWQgY29sbGVjdGlvbiAocGFnaW5hdGlvbilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCAtIHN0YXJ0IGluZGV4IG9mIHRoZSBzbGljZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1iZXIgLSB0aGUgbnVtYmVyIG9mIGl0ZW0gaW4gdGhlIHNsaWNlXG4gICAgICovXG4gICAgdGhpcy5zbGljZSA9IGZ1bmN0aW9uIHNwbGljZSAoc3RhcnQsIG51bWJlcikge1xuICAgICAgdGFibGVTdGF0ZS5wYWdpbmF0aW9uLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICB0YWJsZVN0YXRlLnBhZ2luYXRpb24ubnVtYmVyID0gbnVtYmVyO1xuICAgICAgcmV0dXJuIHRoaXMucGlwZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHRhYmxlXG4gICAgICogQHJldHVybnMge3tzb3J0OiB7fSwgc2VhcmNoOiB7fSwgcGFnaW5hdGlvbjoge3N0YXJ0OiBudW1iZXJ9fX1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxlU3RhdGUgPSBmdW5jdGlvbiBnZXRUYWJsZVN0YXRlICgpIHtcbiAgICAgIHJldHVybiB0YWJsZVN0YXRlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZpbHRlcmVkQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIGdldEZpbHRlcmVkQ29sbGVjdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZmlsdGVyZWQgfHwgc2FmZUNvcHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBhIGRpZmZlcmVudCBmaWx0ZXIgZnVuY3Rpb24gdGhhbiB0aGUgYW5ndWxhciBGaWx0ZXJGaWx0ZXJcbiAgICAgKiBAcGFyYW0gZmlsdGVyTmFtZSB0aGUgbmFtZSB1bmRlciB3aGljaCB0aGUgY3VzdG9tIGZpbHRlciBpcyByZWdpc3RlcmVkXG4gICAgICovXG4gICAgdGhpcy5zZXRGaWx0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIHNldEZpbHRlckZ1bmN0aW9uIChmaWx0ZXJOYW1lKSB7XG4gICAgICBmaWx0ZXIgPSAkZmlsdGVyKGZpbHRlck5hbWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2UgYSBkaWZmZXJlbnQgZnVuY3Rpb24gdGhhbiB0aGUgYW5ndWxhciBvcmRlckJ5XG4gICAgICogQHBhcmFtIHNvcnRGdW5jdGlvbk5hbWUgdGhlIG5hbWUgdW5kZXIgd2hpY2ggdGhlIGN1c3RvbSBvcmRlciBmdW5jdGlvbiBpcyByZWdpc3RlcmVkXG4gICAgICovXG4gICAgdGhpcy5zZXRTb3J0RnVuY3Rpb24gPSBmdW5jdGlvbiBzZXRTb3J0RnVuY3Rpb24gKHNvcnRGdW5jdGlvbk5hbWUpIHtcbiAgICAgIG9yZGVyQnkgPSAkZmlsdGVyKHNvcnRGdW5jdGlvbk5hbWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc3VhbGx5IHdoZW4gdGhlIHNhZmUgY29weSBpcyB1cGRhdGVkIHRoZSBwaXBlIGZ1bmN0aW9uIGlzIGNhbGxlZC5cbiAgICAgKiBDYWxsaW5nIHRoaXMgbWV0aG9kIHdpbGwgcHJldmVudCBpdCwgd2hpY2ggaXMgc29tZXRoaW5nIHJlcXVpcmVkIHdoZW4gdXNpbmcgYSBjdXN0b20gcGlwZSBmdW5jdGlvblxuICAgICAqL1xuICAgIHRoaXMucHJldmVudFBpcGVPbldhdGNoID0gZnVuY3Rpb24gcHJldmVudFBpcGUgKCkge1xuICAgICAgcGlwZUFmdGVyU2FmZUNvcHkgPSBmYWxzZTtcbiAgICB9O1xuICB9XSlcbiAgLmRpcmVjdGl2ZSgnc3RUYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdzdFRhYmxlQ29udHJvbGxlcicsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIsIGN0cmwpIHtcblxuICAgICAgICBpZiAoYXR0ci5zdFNldEZpbHRlcikge1xuICAgICAgICAgIGN0cmwuc2V0RmlsdGVyRnVuY3Rpb24oYXR0ci5zdFNldEZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXR0ci5zdFNldFNvcnQpIHtcbiAgICAgICAgICBjdHJsLnNldFNvcnRGdW5jdGlvbihhdHRyLnN0U2V0U29ydCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiIsIm5nLm1vZHVsZSgnc21hcnQtdGFibGUnKVxuICAuZGlyZWN0aXZlKCdzdFNlYXJjaCcsIFsnc3RDb25maWcnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoc3RDb25maWcsICR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVpcmU6ICdec3RUYWJsZScsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIsIGN0cmwpIHtcbiAgICAgICAgdmFyIHRhYmxlQ3RybCA9IGN0cmw7XG4gICAgICAgIHZhciBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgdmFyIHRocm90dGxlID0gYXR0ci5zdERlbGF5IHx8IHN0Q29uZmlnLnNlYXJjaC5kZWxheTtcblxuICAgICAgICBhdHRyLiRvYnNlcnZlKCdzdFNlYXJjaCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICB2YXIgaW5wdXQgPSBlbGVtZW50WzBdLnZhbHVlO1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgJiYgaW5wdXQpIHtcbiAgICAgICAgICAgIGN0cmwudGFibGVTdGF0ZSgpLnNlYXJjaCA9IHt9O1xuICAgICAgICAgICAgdGFibGVDdHJsLnNlYXJjaChpbnB1dCwgbmV3VmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy90YWJsZSBzdGF0ZSAtPiB2aWV3XG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGN0cmwudGFibGVTdGF0ZSgpLnNlYXJjaDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIHZhciBwcmVkaWNhdGVFeHByZXNzaW9uID0gYXR0ci5zdFNlYXJjaCB8fCAnJCc7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlLnByZWRpY2F0ZU9iamVjdCAmJiBuZXdWYWx1ZS5wcmVkaWNhdGVPYmplY3RbcHJlZGljYXRlRXhwcmVzc2lvbl0gIT09IGVsZW1lbnRbMF0udmFsdWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSBuZXdWYWx1ZS5wcmVkaWNhdGVPYmplY3RbcHJlZGljYXRlRXhwcmVzc2lvbl0gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyB2aWV3IC0+IHRhYmxlIHN0YXRlXG4gICAgICAgIGVsZW1lbnQuYmluZCgnaW5wdXQnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgZXZ0ID0gZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0O1xuICAgICAgICAgIGlmIChwcm9taXNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAkdGltZW91dC5jYW5jZWwocHJvbWlzZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJvbWlzZSA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhYmxlQ3RybC5zZWFyY2goZXZ0LnRhcmdldC52YWx1ZSwgYXR0ci5zdFNlYXJjaCB8fCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgICB9LCB0aHJvdHRsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbiIsIm5nLm1vZHVsZSgnc21hcnQtdGFibGUnKVxuICAuZGlyZWN0aXZlKCdzdFNlbGVjdFJvdycsIFsnc3RDb25maWcnLCBmdW5jdGlvbiAoc3RDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcXVpcmU6ICdec3RUYWJsZScsXG4gICAgICBzY29wZToge1xuICAgICAgICByb3c6ICc9c3RTZWxlY3RSb3cnXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyLCBjdHJsKSB7XG4gICAgICAgIHZhciBtb2RlID0gYXR0ci5zdFNlbGVjdE1vZGUgfHwgc3RDb25maWcuc2VsZWN0Lm1vZGU7XG4gICAgICAgIGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0KHNjb3BlLnJvdywgbW9kZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaCgncm93LmlzU2VsZWN0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3Moc3RDb25maWcuc2VsZWN0LnNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHN0Q29uZmlnLnNlbGVjdC5zZWxlY3RlZENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbiIsIm5nLm1vZHVsZSgnc21hcnQtdGFibGUnKVxuICAuZGlyZWN0aXZlKCdzdFNvcnQnLCBbJ3N0Q29uZmlnJywgJyRwYXJzZScsIGZ1bmN0aW9uIChzdENvbmZpZywgJHBhcnNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXF1aXJlOiAnXnN0VGFibGUnLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyLCBjdHJsKSB7XG5cbiAgICAgICAgdmFyIHByZWRpY2F0ZSA9IGF0dHIuc3RTb3J0O1xuICAgICAgICB2YXIgZ2V0dGVyID0gJHBhcnNlKHByZWRpY2F0ZSk7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBjbGFzc0FzY2VudCA9IGF0dHIuc3RDbGFzc0FzY2VudCB8fCBzdENvbmZpZy5zb3J0LmFzY2VudENsYXNzO1xuICAgICAgICB2YXIgY2xhc3NEZXNjZW50ID0gYXR0ci5zdENsYXNzRGVzY2VudCB8fCBzdENvbmZpZy5zb3J0LmRlc2NlbnRDbGFzcztcbiAgICAgICAgdmFyIHN0YXRlQ2xhc3NlcyA9IFtjbGFzc0FzY2VudCwgY2xhc3NEZXNjZW50XTtcbiAgICAgICAgdmFyIHNvcnREZWZhdWx0O1xuXG4gICAgICAgIGlmIChhdHRyLnN0U29ydERlZmF1bHQpIHtcbiAgICAgICAgICBzb3J0RGVmYXVsdCA9IHNjb3BlLiRldmFsKGF0dHIuc3RTb3J0RGVmYXVsdCkgIT09IHVuZGVmaW5lZCA/IHNjb3BlLiRldmFsKGF0dHIuc3RTb3J0RGVmYXVsdCkgOiBhdHRyLnN0U29ydERlZmF1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL3ZpZXcgLS0+IHRhYmxlIHN0YXRlXG4gICAgICAgIGZ1bmN0aW9uIHNvcnQgKCkge1xuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgcHJlZGljYXRlID0gbmcuaXNGdW5jdGlvbihnZXR0ZXIoc2NvcGUpKSA/IGdldHRlcihzY29wZSkgOiBhdHRyLnN0U29ydDtcbiAgICAgICAgICBpZiAoaW5kZXggJSAzID09PSAwICYmIGF0dHIuc3RTa2lwTmF0dXJhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL21hbnVhbCByZXNldFxuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgY3RybC50YWJsZVN0YXRlKCkuc29ydCA9IHt9O1xuICAgICAgICAgICAgY3RybC50YWJsZVN0YXRlKCkucGFnaW5hdGlvbi5zdGFydCA9IDA7XG4gICAgICAgICAgICBjdHJsLnBpcGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3RybC5zb3J0QnkocHJlZGljYXRlLCBpbmRleCAlIDIgPT09IDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbiBzb3J0Q2xpY2sgKCkge1xuICAgICAgICAgIGlmIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseShzb3J0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzb3J0RGVmYXVsdCkge1xuICAgICAgICAgIGluZGV4ID0gc29ydERlZmF1bHQgPT09ICdyZXZlcnNlJyA/IDEgOiAwO1xuICAgICAgICAgIHNvcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGFibGUgc3RhdGUgLS0+IHZpZXdcbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY3RybC50YWJsZVN0YXRlKCkuc29ydDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlLnByZWRpY2F0ZSAhPT0gcHJlZGljYXRlKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhjbGFzc0FzY2VudClcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNsYXNzRGVzY2VudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gbmV3VmFsdWUucmV2ZXJzZSA9PT0gdHJ1ZSA/IDIgOiAxO1xuICAgICAgICAgICAgZWxlbWVudFxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3Moc3RhdGVDbGFzc2VzW2luZGV4ICUgMl0pXG4gICAgICAgICAgICAgIC5hZGRDbGFzcyhzdGF0ZUNsYXNzZXNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG4iLCJuZy5tb2R1bGUoJ3NtYXJ0LXRhYmxlJylcbiAgLmRpcmVjdGl2ZSgnc3RQYWdpbmF0aW9uJywgWydzdENvbmZpZycsIGZ1bmN0aW9uIChzdENvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAgIHJlcXVpcmU6ICdec3RUYWJsZScsXG4gICAgICBzY29wZToge1xuICAgICAgICBzdEl0ZW1zQnlQYWdlOiAnPT8nLFxuICAgICAgICBzdERpc3BsYXllZFBhZ2VzOiAnPT8nLFxuICAgICAgICBzdFBhZ2VDaGFuZ2U6ICcmJ1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlVXJsOiBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLnN0VGVtcGxhdGUpIHtcbiAgICAgICAgICByZXR1cm4gYXR0cnMuc3RUZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RDb25maWcucGFnaW5hdGlvbi50ZW1wbGF0ZTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cbiAgICAgICAgc2NvcGUuc3RJdGVtc0J5UGFnZSA9IHNjb3BlLnN0SXRlbXNCeVBhZ2UgPyArKHNjb3BlLnN0SXRlbXNCeVBhZ2UpIDogc3RDb25maWcucGFnaW5hdGlvbi5pdGVtc0J5UGFnZTtcbiAgICAgICAgc2NvcGUuc3REaXNwbGF5ZWRQYWdlcyA9IHNjb3BlLnN0RGlzcGxheWVkUGFnZXMgPyArKHNjb3BlLnN0RGlzcGxheWVkUGFnZXMpIDogc3RDb25maWcucGFnaW5hdGlvbi5kaXNwbGF5ZWRQYWdlcztcblxuICAgICAgICBzY29wZS5jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIHNjb3BlLnBhZ2VzID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gcmVkcmF3ICgpIHtcbiAgICAgICAgICB2YXIgcGFnaW5hdGlvblN0YXRlID0gY3RybC50YWJsZVN0YXRlKCkucGFnaW5hdGlvbjtcbiAgICAgICAgICB2YXIgc3RhcnQgPSAxO1xuICAgICAgICAgIHZhciBlbmQ7XG4gICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgdmFyIHByZXZQYWdlID0gc2NvcGUuY3VycmVudFBhZ2U7XG4gICAgICAgICAgc2NvcGUuY3VycmVudFBhZ2UgPSBNYXRoLmZsb29yKHBhZ2luYXRpb25TdGF0ZS5zdGFydCAvIHBhZ2luYXRpb25TdGF0ZS5udW1iZXIpICsgMTtcblxuICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoc3RhcnQsIHNjb3BlLmN1cnJlbnRQYWdlIC0gTWF0aC5hYnMoTWF0aC5mbG9vcihzY29wZS5zdERpc3BsYXllZFBhZ2VzIC8gMikpKTtcbiAgICAgICAgICBlbmQgPSBzdGFydCArIHNjb3BlLnN0RGlzcGxheWVkUGFnZXM7XG5cbiAgICAgICAgICBpZiAoZW5kID4gcGFnaW5hdGlvblN0YXRlLm51bWJlck9mUGFnZXMpIHtcbiAgICAgICAgICAgIGVuZCA9IHBhZ2luYXRpb25TdGF0ZS5udW1iZXJPZlBhZ2VzICsgMTtcbiAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgZW5kIC0gc2NvcGUuc3REaXNwbGF5ZWRQYWdlcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NvcGUucGFnZXMgPSBbXTtcbiAgICAgICAgICBzY29wZS5udW1QYWdlcyA9IHBhZ2luYXRpb25TdGF0ZS5udW1iZXJPZlBhZ2VzO1xuXG4gICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICAgICAgc2NvcGUucGFnZXMucHVzaChpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJldlBhZ2UgIT09IHNjb3BlLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICBzY29wZS5zdFBhZ2VDaGFuZ2Uoe25ld1BhZ2U6IHNjb3BlLmN1cnJlbnRQYWdlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy90YWJsZSBzdGF0ZSAtLT4gdmlld1xuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjdHJsLnRhYmxlU3RhdGUoKS5wYWdpbmF0aW9uO1xuICAgICAgICB9LCByZWRyYXcsIHRydWUpO1xuXG4gICAgICAgIC8vc2NvcGUgLS0+IHRhYmxlIHN0YXRlICAoLS0+IHZpZXcpXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnc3RJdGVtc0J5UGFnZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RQYWdlKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzdERpc3BsYXllZFBhZ2VzJywgcmVkcmF3KTtcblxuICAgICAgICAvL3ZpZXcgLT4gdGFibGUgc3RhdGVcbiAgICAgICAgc2NvcGUuc2VsZWN0UGFnZSA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgICAgaWYgKHBhZ2UgPiAwICYmIHBhZ2UgPD0gc2NvcGUubnVtUGFnZXMpIHtcbiAgICAgICAgICAgIGN0cmwuc2xpY2UoKHBhZ2UgLSAxKSAqIHNjb3BlLnN0SXRlbXNCeVBhZ2UsIHNjb3BlLnN0SXRlbXNCeVBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIWN0cmwudGFibGVTdGF0ZSgpLnBhZ2luYXRpb24ubnVtYmVyKSB7XG4gICAgICAgICAgY3RybC5zbGljZSgwLCBzY29wZS5zdEl0ZW1zQnlQYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbiIsIm5nLm1vZHVsZSgnc21hcnQtdGFibGUnKVxuICAuZGlyZWN0aXZlKCdzdFBpcGUnLCBbJ3N0Q29uZmlnJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKGNvbmZpZywgJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWlyZTogJ3N0VGFibGUnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgc3RQaXBlOiAnPSdcbiAgICAgIH0sXG4gICAgICBsaW5rOiB7XG5cbiAgICAgICAgcHJlOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG5cbiAgICAgICAgICB2YXIgcGlwZVByb21pc2UgPSBudWxsO1xuXG4gICAgICAgICAgaWYgKG5nLmlzRnVuY3Rpb24oc2NvcGUuc3RQaXBlKSkge1xuICAgICAgICAgICAgY3RybC5wcmV2ZW50UGlwZU9uV2F0Y2goKTtcbiAgICAgICAgICAgIGN0cmwucGlwZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICBpZiAocGlwZVByb21pc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwocGlwZVByb21pc2UpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwaXBlUHJvbWlzZSA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5zdFBpcGUoY3RybC50YWJsZVN0YXRlKCksIGN0cmwpO1xuICAgICAgICAgICAgICB9LCBjb25maWcucGlwZS5kZWxheSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHBpcGVQcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwb3N0OiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgY3RybC5waXBlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG4iLCJ9KShhbmd1bGFyKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
/*! 
 * angular-hotkeys v1.4.5
 * https://chieffancypants.github.io/angular-hotkeys
 * Copyright (c) 2014 Wes Cruver
 * License: MIT
 */
/*
 * angular-hotkeys
 *
 * Automatic keyboard shortcuts for your angular apps
 *
 * (c) 2014 Wes Cruver
 * License: MIT
 */
function(){"use strict";angular.module("cfp.hotkeys",[]).provider("hotkeys",function(){/**
     * Configurable setting to disable the cheatsheet entirely
     * @type {Boolean}
     */
this.includeCheatSheet=!0,/**
     * Configurable setting for the cheat sheet title
     * @type {String}
     */
this.templateTitle="Keyboard Shortcuts:",/**
     * Cheat sheet template in the event you want to totally customize it.
     * @type {String}
     */
this.template='<div class="cfp-hotkeys-container fade" ng-class="{in: helpVisible}" style="display: none;"><div class="cfp-hotkeys"><h4 class="cfp-hotkeys-title">{{ title }}</h4><table><tbody><tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }"><td class="cfp-hotkeys-keys"><span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span></td><td class="cfp-hotkeys-text">{{ hotkey.description }}</td></tr></tbody></table><div class="cfp-hotkeys-close" ng-click="toggleCheatSheet()">×</div></div></div>',/**
     * Configurable setting for the cheat sheet hotkey
     * @type {String}
     */
this.cheatSheetHotkey="?",/**
     * Configurable setting for the cheat sheet description
     * @type {String}
     */
this.cheatSheetDescription="Show / hide this help menu",this.$get=["$rootElement","$rootScope","$compile","$window","$document",function(a,b,c,d,e){/**
       * Convert strings like cmd into symbols like ⌘
       * @param  {String} combo Key combination, e.g. 'mod+f'
       * @return {String}       The key combination with symbols
       */
function f(a){var b={command:"⌘",shift:"⇧",left:"←",right:"→",up:"↑",down:"↓","return":"↩",backspace:"⌫"};a=a.split("+");for(var c=0;c<a.length;c++)
// try to resolve command / ctrl based on OS:
"mod"===a[c]&&(d.navigator&&d.navigator.platform.indexOf("Mac")>=0?a[c]="command":a[c]="ctrl"),a[c]=b[a[c]]||a[c];return a.join(" + ")}/**
       * Hotkey object used internally for consistency
       *
       * @param {array}    combo       The keycombo. it's an array to support multiple combos
       * @param {String}   description Description for the keycombo
       * @param {Function} callback    function to execute when keycombo pressed
       * @param {string}   action      the type of event to listen for (for mousetrap)
       * @param {array}    allowIn     an array of tag names to allow this combo in ('INPUT', 'SELECT', and/or 'TEXTAREA')
       * @param {Boolean}  persistent  Whether the hotkey persists navigation events
       */
function g(a,b,c,d,e,f){
// TODO: Check that the values are sane because we could
// be trying to instantiate a new Hotkey with outside dev's
// supplied values
this.combo=a instanceof Array?a:[a],this.description=b,this.callback=c,this.action=d,this.allowIn=e,this.persistent=f}/**
       * Purges all non-persistent hotkeys (such as those defined in routes)
       *
       * Without this, the same hotkey would get recreated everytime
       * the route is accessed.
       */
function h(){for(var a=o.hotkeys.length;a--;){var b=o.hotkeys[a];b&&!b.persistent&&k(b)}}function i(){o.helpVisible=!o.helpVisible,
// Bind to esc to remove the cheat sheet.  Ideally, this would be done
// as a directive in the template, but that would create a nasty
// circular dependency issue that I don't feel like sorting out.
o.helpVisible?(t=l("esc"),k("esc"),
// Here's an odd way to do this: we're going to use the original
// description of the hotkey on the cheat sheet so that it shows up.
// without it, no entry for esc will ever show up (#22)
j("esc",t.description,i)):(k("esc"),
// restore the previously bound ESC key
t!==!1&&j(t))}/**
       * Creates a new Hotkey and creates the Mousetrap binding
       *
       * @param {string}   combo       mousetrap key binding
       * @param {string}   description description for the help menu
       * @param {Function} callback    method to call when key is pressed
       * @param {string}   action      the type of event to listen for (for mousetrap)
       * @param {array}    allowIn     an array of tag names to allow this combo in ('INPUT', 'SELECT', and/or 'TEXTAREA')
       * @param {boolean}  persistent  if true, the binding is preserved upon route changes
       */
function j(a,b,c,d,e,f){
// used to save original callback for "allowIn" wrapping:
var h,i=["INPUT","SELECT","TEXTAREA"],j=Object.prototype.toString.call(a);
// if callback is defined, then wrap it in a function
// that checks if the event originated from a form element.
// the function blocks the callback from executing unless the element is specified
// in allowIn (emulates Mousetrap.stopCallback() on a per-key level)
if("[object Object]"===j&&(b=a.description,c=a.callback,d=a.action,f=a.persistent,e=a.allowIn,a=a.combo),
// description is optional:
b instanceof Function?(d=c,c=b,b="$$undefined$$"):angular.isUndefined(b)&&(b="$$undefined$$"),
// any items added through the public API are for controllers
// that persist through navigation, and thus undefined should mean
// true in this case.
void 0===f&&(f=!0),"function"==typeof c){
// save the original callback
h=c,
// make sure allowIn is an array
e instanceof Array||(e=[]);for(var k,l=0;l<e.length;l++)e[l]=e[l].toUpperCase(),k=i.indexOf(e[l]),-1!==k&&i.splice(k,1);
// create the new wrapper callback
c=function(a){var b=!0,c=a.target||a.srcElement,d=c.nodeName.toUpperCase();
// check if the input has a mousetrap class, and skip checking preventIn if so
if((" "+c.className+" ").indexOf(" mousetrap ")>-1)b=!0;else
// don't execute callback if the event was fired from inside an element listed in preventIn
for(var e=0;e<i.length;e++)if(i[e]===d){b=!1;break}b&&n(h.apply(this,arguments))}}"string"==typeof d?Mousetrap.bind(a,n(c),d):Mousetrap.bind(a,n(c));var m=new g(a,b,c,d,e,f);return o.hotkeys.push(m),m}/**
       * delete and unbind a Hotkey
       *
       * @param  {mixed} hotkey   Either the bound key or an instance of Hotkey
       * @return {boolean}        true if successful
       */
function k(a){var b=a instanceof g?a.combo:a;if(Mousetrap.unbind(b),angular.isArray(b)){for(var c=!0,d=b.length;d--;)c=k(b[d])&&c;return c}var e=o.hotkeys.indexOf(l(b));
// if the combo has other combos bound, don't unbind the whole thing, just the one combo:
return e>-1?(o.hotkeys[e].combo.length>1?o.hotkeys[e].combo.splice(o.hotkeys[e].combo.indexOf(b),1):o.hotkeys.splice(e,1),!0):!1}/**
       * Get a Hotkey object by key binding
       *
       * @param  {[string]} combo  the key the Hotkey is bound to
       * @return {Hotkey}          The Hotkey object
       */
function l(a){for(var b,c=0;c<o.hotkeys.length;c++)if(b=o.hotkeys[c],b.combo.indexOf(a)>-1)return b;return!1}/**
       * Binds the hotkey to a particular scope.  Useful if the scope is
       * destroyed, we can automatically destroy the hotkey binding.
       *
       * @param  {Object} scope The scope to bind to
       */
function m(a){
// return an object with an add function so we can keep track of the
// hotkeys and their scope that we added via this chaining method
// Only initialize once to allow multiple calls for same scope.
// Add the scope to the list of bound scopes
return a.$id in p||(p[a.$id]=[],a.$on("$destroy",function(){for(var b=p[a.$id].length;b--;)k(p[a.$id][b]),delete p[a.$id][b]})),{add:function(b){var c;return c=arguments.length>1?j.apply(this,arguments):j(b),p[a.$id].push(c),this}}}/**
       * All callbacks sent to Mousetrap are wrapped using this function
       * so that we can force a $scope.$apply()
       *
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
function n(a){
// return mousetrap a function to call
return function(c,d){
// if this is an array, it means we provided a route object
// because the scope wasn't available yet, so rewrap the callback
// now that the scope is available:
if(a instanceof Array){var e=a[0],f=a[1];a=function(a){f.scope.$eval(e)}}
// this takes place outside angular, so we'll have to call
// $apply() to make sure angular's digest happens
b.$apply(function(){
// call the original hotkey callback with the keyboard event
a(c,l(d))})}}
// monkeypatch Mousetrap's stopCallback() function
// this version doesn't return true when the element is an INPUT, SELECT, or TEXTAREA
// (instead we will perform this check per-key in the _add() method)
Mousetrap.stopCallback=function(a,b){
// if the element has the class "mousetrap" then no need to stop
// if the element has the class "mousetrap" then no need to stop
return(" "+b.className+" ").indexOf(" mousetrap ")>-1?!1:b.contentEditable&&"true"==b.contentEditable},/**
       * Helper method to format (symbolize) the key combo for display
       *
       * @return {[Array]} An array of the key combination sequence
       *   for example: "command+g c i" becomes ["⌘ + g", "c", "i"]
       *
       * TODO: this gets called a lot.  We should cache the result
       */
g.prototype.format=function(){for(var a=this.combo[0],b=a.split(/[\s]/),c=0;c<b.length;c++)b[c]=f(b[c]);return b};/**
       * A new scope used internally for the cheatsheet
       * @type {$rootScope.Scope}
       */
var o=b.$new();/**
       * Holds an array of Hotkey objects currently bound
       * @type {Array}
       */
o.hotkeys=[],/**
       * Contains the state of the help's visibility
       * @type {Boolean}
       */
o.helpVisible=!1,/**
       * Holds the title string for the help menu
       * @type {String}
       */
o.title=this.templateTitle,/**
       * Expose toggleCheatSheet to hotkeys scope so we can call it using
       * ng-click from the template
       * @type {function}
       */
o.toggleCheatSheet=i;/**
       * Holds references to the different scopes that have bound hotkeys
       * attached.  This is useful to catch when the scopes are `$destroy`d and
       * then automatically unbind the hotkey.
       *
       * @type {Array}
       */
var p=[];
// Auto-create a help menu:
if(b.$on("$routeChangeSuccess",function(a,b){h(),b&&b.hotkeys&&angular.forEach(b.hotkeys,function(a){
// a string was given, which implies this is a function that is to be
// $eval()'d within that controller's scope
// TODO: hotkey here is super confusing.  sometimes a function (that gets turned into an array), sometimes a string
var c=a[2];("string"==typeof c||c instanceof String)&&(a[2]=[c,b]),
// todo: perform check to make sure not already defined:
// this came from a route, so it's likely not meant to be persistent
a[5]=!1,j.apply(this,a)})}),this.includeCheatSheet){var q=e[0],r=a[0],s=angular.element(this.template);j(this.cheatSheetHotkey,this.cheatSheetDescription,i),
// If $rootElement is document or documentElement, then body must be used
(r===q||r===q.documentElement)&&(r=q.body),angular.element(r).append(c(s)(o))}/**
       * Toggles the help menu element's visiblity
       */
var t=!1,u={add:j,del:k,get:l,bindTo:m,template:this.template,toggleCheatSheet:i,includeCheatSheet:this.includeCheatSheet,cheatSheetHotkey:this.cheatSheetHotkey,cheatSheetDescription:this.cheatSheetDescription,purgeHotkeys:h,templateTitle:this.templateTitle};return u}]}).directive("hotkey",["hotkeys",function(a){return{restrict:"A",link:function(b,c,d){var e,f;angular.forEach(b.$eval(d.hotkey),function(b,c){
// split and trim the hotkeys string into array
f="string"==typeof d.hotkeyAllowIn?d.hotkeyAllowIn.split(/[\s,]+/):[],e=c,a.add({combo:c,description:d.hotkeyDescription,callback:b,action:d.hotkeyAction,allowIn:f})}),
// remove the hotkey if the directive is destroyed:
c.bind("$destroy",function(){a.del(e)})}}}]).run(["hotkeys",function(a){}])}(),/*global define:false */
/**
 * Copyright 2013 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.4.6
 * @url craig.is/killing/mice
 */
function(a,b,c){/**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
function d(a,b,c){return a.addEventListener?void a.addEventListener(b,c,!1):void a.attachEvent("on"+b,c)}/**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
function e(a){
// for keypress events we should return the character as is
if("keypress"==a.type){var b=String.fromCharCode(a.which);
// if the shift key is not pressed then it is safe to assume
// that we want the character to be lowercase.  this means if
// you accidentally have caps lock on then your key bindings
// will continue to work
//
// the only side effect that might not be desired is if you
// bind something like 'A' cause you want to trigger an
// event when capital A is pressed caps lock will no longer
// trigger the event.  shift+a will though.
return a.shiftKey||(b=b.toLowerCase()),b}
// for non keypress events the special maps are needed
// for non keypress events the special maps are needed
return z[a.which]?z[a.which]:A[a.which]?A[a.which]:String.fromCharCode(a.which).toLowerCase()}/**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
function f(a,b){return a.sort().join(",")===b.sort().join(",")}/**
     * resets all sequence counters except for the ones passed in
     *
     * @param {Object} doNotReset
     * @returns void
     */
function g(a){a=a||{};var b,c=!1;for(b in F)a[b]?c=!0:F[b]=0;c||(I=!1)}/**
     * finds all callbacks that match based on the keycode, modifiers,
     * and action
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {Event|Object} e
     * @param {string=} sequenceName - name of the sequence we are looking for
     * @param {string=} combination
     * @param {number=} level
     * @returns {Array}
     */
function h(a,b,c,d,e,g){var h,i,j=[],k=c.type;
// if there are no events related to this keycode
if(!D[a])return[];
// loop through all callbacks for the key that was pressed
// and see if any of them match
for(
// if a modifier key is coming up on its own we should allow it
"keyup"==k&&o(a)&&(b=[a]),h=0;h<D[a].length;++h)
// if a sequence name is not specified, but this is a sequence at
// the wrong level then move onto the next match
if(i=D[a][h],(d||!i.seq||F[i.seq]==i.level)&&k==i.action&&("keypress"==k&&!c.metaKey&&!c.ctrlKey||f(b,i.modifiers))){
// when you bind a combination or sequence a second time it
// should overwrite the first one.  if a sequenceName or
// combination is specified in this call it does just that
//
// @todo make deleting its own method?
var l=!d&&i.combo==e,m=d&&i.seq==d&&i.level==g;(l||m)&&D[a].splice(h,1),j.push(i)}return j}/**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
function i(a){var b=[];return a.shiftKey&&b.push("shift"),a.altKey&&b.push("alt"),a.ctrlKey&&b.push("ctrl"),a.metaKey&&b.push("meta"),b}/**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
function j(a){return a.preventDefault?void a.preventDefault():void(a.returnValue=!1)}/**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
function k(a){return a.stopPropagation?void a.stopPropagation():void(a.cancelBubble=!0)}/**
     * actually calls the callback function
     *
     * if your callback function returns false this will use the jquery
     * convention - prevent default and stop propogation on the event
     *
     * @param {Function} callback
     * @param {Event} e
     * @returns void
     */
function l(a,b,c,d){
// if this event should not happen stop here
K.stopCallback(b,b.target||b.srcElement,c,d)||a(b,c)===!1&&(j(b),k(b))}/**
     * handles a character key event
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {Event} e
     * @returns void
     */
function m(a,b,c){var d,e=h(a,b,c),f={},i=0,j=!1;
// Calculate the maxLevel for sequences so we can only execute the longest callback sequence
for(d=0;d<e.length;++d)e[d].seq&&(i=Math.max(i,e[d].level));
// loop through matching callbacks for this key event
for(d=0;d<e.length;++d)
// fire for all sequence callbacks
// this is because if for example you have multiple sequences
// bound such as "g i" and "g t" they both need to fire the
// callback for matching g cause otherwise you can only ever
// match the first one
if(e[d].seq){
// only fire callbacks for the maxLevel to prevent
// subsequences from also firing
//
// for example 'a option b' should not cause 'option b' to fire
// even though 'option b' is part of the other sequence
//
// any sequences that do not match here will be discarded
// below by the _resetSequences call
if(e[d].level!=i)continue;j=!0,
// keep a list of which sequences were matches for later
f[e[d].seq]=1,l(e[d].callback,c,e[d].combo,e[d].seq)}else
// if there were no sequence matches but we are still here
// that means this is a regular match so we should fire that
j||l(e[d].callback,c,e[d].combo);
// if the key you pressed matches the type of sequence without
// being a modifier (ie "keyup" or "keypress") then we should
// reset all sequences that were not matched by this event
//
// this is so, for example, if you have the sequence "h a t" and you
// type "h e a r t" it does not match.  in this case the "e" will
// cause the sequence to reset
//
// modifier keys are ignored because you can have a sequence
// that contains modifiers such as "enter ctrl+space" and in most
// cases the modifier key will be pressed before the next key
//
// also if you have a sequence such as "ctrl+b a" then pressing the
// "b" key will trigger a "keypress" and a "keydown"
//
// the "keydown" is expected when there is a modifier, but the
// "keypress" ends up matching the _nextExpectedAction since it occurs
// after and that causes the sequence to reset
//
// we ignore keypresses in a sequence that directly follow a keydown
// for the same character
var k="keypress"==c.type&&H;c.type!=I||o(a)||k||g(f),H=j&&"keydown"==c.type}/**
     * handles a keydown event
     *
     * @param {Event} e
     * @returns void
     */
function n(a){
// normalize e.which for key events
// @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
"number"!=typeof a.which&&(a.which=a.keyCode);var b=e(a);
// no character found then stop
if(b)
// need to use === for the character check because the character can be 0
// need to use === for the character check because the character can be 0
return"keyup"==a.type&&G===b?void(G=!1):void K.handleKey(b,i(a),a)}/**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
function o(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}/**
     * called to set a 1 second timeout on the specified sequence
     *
     * this is so after each key press in the sequence you have 1 second
     * to press the next key before you have to start over
     *
     * @returns void
     */
function p(){clearTimeout(y),y=setTimeout(g,1e3)}/**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
function q(){if(!x){x={};for(var a in z)
// pull out the numeric keypad from here cause keypress should
// be able to detect the keys from the character
a>95&&112>a||z.hasOwnProperty(a)&&(x[z[a]]=a)}return x}/**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
function r(a,b,c){
// if no action was picked in we should try to pick the one
// that we think would work best for this key
// modifier keys don't work as expected with keypress,
// switch to keydown
return c||(c=q()[a]?"keydown":"keypress"),"keypress"==c&&b.length&&(c="keydown"),c}/**
     * binds a key sequence to an event
     *
     * @param {string} combo - combo specified in bind call
     * @param {Array} keys
     * @param {Function} callback
     * @param {string=} action
     * @returns void
     */
function s(a,b,c,d){/**
         * callback to increase the sequence level for this sequence and reset
         * all other sequences that were active
         *
         * @param {string} nextAction
         * @returns {Function}
         */
function f(b){return function(){I=b,++F[a],p()}}/**
         * wraps the specified callback inside of another function in order
         * to reset all sequence counters as soon as this sequence is done
         *
         * @param {Event} e
         * @returns void
         */
function h(b){l(c,b,a),
// we should ignore the next key up if the action is key down
// or keypress.  this is so if you finish a sequence and
// release the key the final key will not trigger a keyup
"keyup"!==d&&(G=e(b)),
// weird race condition if a sequence ends with the key
// another sequence begins with
setTimeout(g,10)}
// start off by adding a sequence level record for this combination
// and setting the level to 0
F[a]=0;
// loop through keys one at a time and bind the appropriate callback
// function.  for any key leading up to the final one it should
// increase the sequence. after the final, it should reset all sequences
//
// if an action is specified in the original bind call then that will
// be used throughout.  otherwise we will pass the action that the
// next key in the sequence should match.  this allows a sequence
// to mix and match keypress and keydown events depending on which
// ones are better suited to the key provided
for(var i=0;i<b.length;++i){var j=i+1===b.length,k=j?h:f(d||u(b[i+1]).action);v(b[i],k,d,a,i)}}/**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
function t(a){return"+"===a?["+"]:a.split("+")}/**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
function u(a,b){var c,d,e,f=[];for(
// take the keys from this pattern and figure out what the actual
// pattern is all about
c=t(a),e=0;e<c.length;++e)d=c[e],
// normalize key names
C[d]&&(d=C[d]),
// if this is not a keypress event then we should
// be smart about using shift keys
// this will only work for US keyboards however
b&&"keypress"!=b&&B[d]&&(d=B[d],f.push("shift")),
// if this key is a modifier then add it to the list of modifiers
o(d)&&f.push(d);
// depending on what the key combination is
// we will try to pick the best event for it
return b=r(d,f,b),{key:d,modifiers:f,action:b}}/**
     * binds a single keyboard combination
     *
     * @param {string} combination
     * @param {Function} callback
     * @param {string=} action
     * @param {string=} sequenceName - name of sequence if part of sequence
     * @param {number=} level - what part of the sequence the command is
     * @returns void
     */
function v(a,b,c,d,e){
// store a direct mapped reference for use with Mousetrap.trigger
E[a+":"+c]=b,
// make sure multiple spaces in a row become a single space
a=a.replace(/\s+/g," ");var f,g=a.split(" ");
// if this pattern is a sequence of keys then run through this method
// to reprocess each pattern one key at a time
// if this pattern is a sequence of keys then run through this method
// to reprocess each pattern one key at a time
// make sure to initialize array if this is the first time
// a callback is added for this key
// remove an existing match if there is one
// add this call back to the array
// if it is a sequence put it at the beginning
// if not put it at the end
//
// this is important because the way these are processed expects
// the sequence ones to come first
return g.length>1?void s(a,g,b,c):(f=u(a,c),D[f.key]=D[f.key]||[],h(f.key,f.modifiers,{type:f.action},d,a,e),void D[f.key][d?"unshift":"push"]({callback:b,modifiers:f.modifiers,action:f.action,seq:d,level:e,combo:a}))}/**
     * binds multiple combinations to the same callback
     *
     * @param {Array} combinations
     * @param {Function} callback
     * @param {string|undefined} action
     * @returns void
     */
function w(a,b,c){for(var d=0;d<a.length;++d)v(a[d],b,c)}/**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
for(var/**
         * variable to store the flipped version of _MAP from above
         * needed to check if we should use keypress or not when no action
         * is specified
         *
         * @type {Object|undefined}
         */
x,/**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
y,z={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},/**
         * mapping for special characters so they can support
         *
         * this dictionary is only used incase you want to bind a
         * keyup or keydown event to one of these keys
         *
         * @type {Object}
         */
A={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},/**
         * this is a mapping of keys that require shift on a US keypad
         * back to the non shift equivelents
         *
         * this is so you can use keyup events with these keys
         *
         * note that this will only work reliably on US keyboards
         *
         * @type {Object}
         */
B={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},/**
         * this is a list of special strings you can use to map
         * to modifier keys when you specify your keyboard shortcuts
         *
         * @type {Object}
         */
C={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},/**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
D={},/**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
E={},/**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
F={},/**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
G=!1,/**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
H=!1,/**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
I=!1,J=1;20>J;++J)z[111+J]="f"+J;/**
     * loop through to map numbers on the numeric keypad
     */
for(J=0;9>=J;++J)z[J+96]=J;
// start!
d(b,"keypress",n),d(b,"keydown",n),d(b,"keyup",n);var K={/**
         * binds an event to mousetrap
         *
         * can be a single key, a combination of keys separated with +,
         * an array of keys, or a sequence of keys separated by spaces
         *
         * be sure to list the modifier keys first to make sure that the
         * correct key ends up getting bound (the last key in the pattern)
         *
         * @param {string|Array} keys
         * @param {Function} callback
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
         * @returns void
         */
bind:function(a,b,c){return a=a instanceof Array?a:[a],w(a,b,c),this},/**
         * unbinds an event to mousetrap
         *
         * the unbinding sets the callback function of the specified key combo
         * to an empty function and deletes the corresponding key in the
         * _directMap dict.
         *
         * TODO: actually remove this from the _callbacks dictionary instead
         * of binding an empty function
         *
         * the keycombo+action has to be exactly the same as
         * it was defined in the bind method
         *
         * @param {string|Array} keys
         * @param {string} action
         * @returns void
         */
unbind:function(a,b){return K.bind(a,function(){},b)},/**
         * triggers an event that has already been bound
         *
         * @param {string} keys
         * @param {string=} action
         * @returns void
         */
trigger:function(a,b){return E[a+":"+b]&&E[a+":"+b]({},a),this},/**
         * resets the library back to its initial state.  this is useful
         * if you want to clear out the current keyboard shortcuts and bind
         * new ones - for example if you switch to another page
         *
         * @returns void
         */
reset:function(){return D={},E={},this},/**
        * should we stop this event before firing off callbacks
        *
        * @param {Event} e
        * @param {Element} element
        * @return {boolean}
        */
stopCallback:function(a,b){
// if the element has the class "mousetrap" then no need to stop
// if the element has the class "mousetrap" then no need to stop
return(" "+b.className+" ").indexOf(" mousetrap ")>-1?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},/**
         * exposes _handleKey publicly so it can be overwritten by extensions
         */
handleKey:m};
// expose mousetrap to the global object
a.Mousetrap=K,
// expose mousetrap as an AMD module
"function"==typeof define&&define.amd&&define(K)}(window,document),/**
 * UI.Layout
 */
angular.module("ui.layout",[]).controller("uiLayoutCtrl",["$scope","$attrs","$element","LayoutContainer",function(a,b,c,d){function e(){var a=i.sizeProperties.flowProperty,b=parseInt(j.dividerSize),d=c[0][i.sizeProperties.offsetSize];if(null!==i.movingSplitbar){var e=i.containers.indexOf(i.movingSplitbar),f=e+2<i.containers.length?e+2:null;if(e>-1){var k=i.processSplitbar(i.containers[e]),l=k.beforeContainer,m=k.afterContainer;if(!l.collapsed&&!m.collapsed){
// calculate container positons
var n=i.movingSplitbar[a]-h,o=i.movingSplitbar[a]-n;
// Keep the bar in the window (no left/top 100%)
o=Math.min(d-b,o),
// Keep the bar from going past the previous element min/max values
angular.isNumber(l.beforeMinValue)&&o<l.beforeMinValue&&(o=l.beforeMinValue),angular.isNumber(l.beforeMaxValue)&&o>l.beforeMaxValue&&(o=l.beforeMaxValue),
// Keep the bar from going past the next element min/max values
null!==m&&angular.isNumber(m.afterMinValue)&&o>m.afterMinValue-b&&(o=m.afterMinValue-b),null!==m&&angular.isNumber(m.afterMaxValue)&&o<m.afterMaxValue&&(o=m.afterMaxValue),
// resize the before container
l.size=o-l[a];
// update after container position
var p=m[a];m[a]=o+b,
//update after container size if the position has changed
m[a]!=p&&(m.size=null!==f?p+m.size-(o+b):d-(o+b)),
// move the splitbar
i.movingSplitbar[a]=o}}}
//Enable a new animation frame
g=null}function f(a){var b=a[0],c=document.documentElement||document.body,d=window.pageXOffset||c.scrollLeft,e=window.pageYOffset||c.scrollTop,f=b.getBoundingClientRect(),g=f.left+d,h=f.top+e;return{left:g,top:h}}var g,h,i=this,j=angular.extend({},a.$eval(b.uiLayout),a.$eval(b.options)),k=0,l=!1;
// Initial global size definition
//default divider size set to 10
//================================================================================
// Public Controller Functions
//================================================================================
/**
     * Returns the min and max values of the ctrl.containers on each side of the container submitted
     * @param container
     * @returns {*}
     */
/**
     * Checks if a string has a percent symbol in it.
     * @param num
     * @returns {boolean}
     */
/**
     * Converts a number to pixels from percent.
     * @param size
     * @param parentSize
     * @returns {number}
     */
/**
     * Sets the default size for each container.
     */
/**
     * Adds a container to the list of layout ctrl.containers.
     * @param container
     */
/**
     * Returns an array of layout ctrl.containers.
     * @returns {Array}
     */
/**
     * Toggles the container before the provided splitbar
     * @param splitbar
     * @returns {boolean|*|Array}
     */
/**
     * Toggles the container after the provided splitbar
     * @param splitbar
     * @returns {boolean|*|Array}
     */
/**
     * Returns the container object of the splitbar that is before the one passed in.
     * @param currentSplitbar
     */
/**
     * Returns the container object of the splitbar that is after the one passed in.
     * @param currentSplitbar
     */
return i.containers=[],i.movingSplitbar=null,i.bounds=c[0].getBoundingClientRect(),i.isUsingColumnFlow="column"===j.flow,i.sizeProperties=i.isUsingColumnFlow?{sizeProperty:"width",offsetSize:"offsetWidth",offsetPos:"left",flowProperty:"left",oppositeFlowProperty:"right",mouseProperty:"clientX",flowPropertyPosition:"x"}:{sizeProperty:"height",offsetSize:"offsetHeight",offsetPos:"top",flowProperty:"top",oppositeFlowProperty:"bottom",mouseProperty:"clientY",flowPropertyPosition:"y"},c.addClass("stretch").addClass("ui-layout-"+(j.flow||"row")),j.sizes=j.sizes||[],j.maxSizes=j.maxSizes||[],j.minSizes=j.minSizes||[],j.dividerSize=j.dividerSize||10,j.collapsed=j.collapsed||[],i.opts=j,a.updateDisplay=function(){console.log(i.containers),i.updateDisplay()},i.mouseUpHandler=function(a){return null!==i.movingSplitbar&&(i.movingSplitbar=null),a},i.mouseMoveHandler=function(a){var b=a[i.sizeProperties.mouseProperty]||a.originalEvent&&a.originalEvent[i.sizeProperties.mouseProperty]||(a.targetTouches?a.targetTouches[0][i.sizeProperties.mouseProperty]:0);h=b-f(c)[i.sizeProperties.offsetPos],
//Cancel previous rAF call
g&&window.cancelAnimationFrame(g),
//TODO: cache layout values
//Animate the page outside the event
g=window.requestAnimationFrame(e)},i.processSplitbar=function(a){var b=i.containers.indexOf(a),c=function(a){var b=a[i.sizeProperties.flowProperty],c=a[i.sizeProperties.flowProperty]+a.size;a.beforeMinValue=angular.isNumber(a.minSize)?b+a.minSize:b,a.beforeMaxValue=angular.isNumber(a.maxSize)?b+a.maxSize:null,a.afterMinValue=angular.isNumber(a.minSize)?c-a.minSize:c,a.afterMaxValue=angular.isNumber(a.maxSize)?c-a.maxSize:null};
//verify the container was found in the list
if(b>-1){var d=b>0?i.containers[b-1]:null,e=b+1<=i.containers.length?i.containers[b+1]:null;return null!==d&&c(d),null!==e&&c(e),{beforeContainer:d,afterContainer:e}}return null},i.isPercent=function(a){return a&&angular.isString(a)&&a.indexOf("%")>-1?!0:!1},i.convertToPixels=function(a,b){return Math.floor(b*(parseInt(a)/100))},i.updateDisplay=function(){var a,b,e=parseInt(j.dividerSize),f=c[0].getBoundingClientRect()[i.sizeProperties.sizeProperty],g=f-e*k,h=g,m=0,n=0;if(i.containers.length>0&&c.children().length>0){
// remove the last splitbar container from DOM
if(!l&&i.containers.length===c.children().length){var o=i.containers.length-1;i.containers[o].element.remove(),i.containers.splice(o,1),l=!0,k--}
// calculate sizing for ctrl.containers
for(b=0;b<i.containers.length;b++)if(!d.isSplitbar(i.containers[b])){var p=i.containers[b].element;j.maxSizes[b]=p.attr("max-size")||j.maxSizes[b]||null,j.minSizes[b]=p.attr("min-size")||j.minSizes[b]||null,j.sizes[b]=p.attr("size")||j.sizes[b]||"auto";
//opts.collapsed[i] = child.attr('collapsed') || opts.collapsed[i] || false;
// verify size is properly set to pixels or percent
var q=/\d+\s*(px|%)\s*$/i;j.sizes[b]="auto"!=j.sizes[b]&&j.sizes[b].match(q)?j.sizes[b]:"auto",j.minSizes[b]=j.minSizes[b]&&j.minSizes[b].match(q)?j.minSizes[b]:null,j.maxSizes[b]=j.maxSizes[b]&&j.maxSizes[b].match(q)?j.maxSizes[b]:null,"auto"!=j.sizes[b]&&(i.isPercent(j.sizes[b])?j.sizes[b]=i.convertToPixels(j.sizes[b],h):j.sizes[b]=parseInt(j.sizes[b])),null!=j.minSizes[b]&&(i.isPercent(j.minSizes[b])?j.minSizes[b]=i.convertToPixels(j.minSizes[b],h):j.minSizes[b]=parseInt(j.minSizes[b]),
// don't allow the container size to initialize smaller than the minSize
j.sizes[b]<j.minSizes[b]&&(j.sizes[b]=j.minSizes[b])),null!=j.maxSizes[b]&&(i.isPercent(j.maxSizes[b])?j.maxSizes[b]=i.convertToPixels(j.maxSizes[b],h):j.maxSizes[b]=parseInt(j.maxSizes[b]),
// don't allow the container size to intialize larger than the maxSize
j.sizes[b]>j.maxSizes[b]&&(j.sizes[b]=j.maxSizes[b])),"auto"===j.sizes[b]?n++:g-=j.sizes[b]}
// set the sizing for the ctrl.containers
var r=Math.floor(g/n);for(b=0;b<i.containers.length;b++){
//TODO: adjust size if autosize is greater than the maxSize
if(a=i.containers[b],a[i.sizeProperties.flowProperty]=m,a.maxSize=j.maxSizes[b],a.minSize=j.minSizes[b],a.collapsed=a.collapsed||j.collapsed[b],d.isSplitbar(a))a.size=e;else{var s="auto"===j.sizes[b]?r:j.sizes[b];a.size=null!==s?s:r}m+=a.size}}},i.addContainer=function(a){i.containers.push(a),d.isSplitbar(a)&&k++,i.updateDisplay()},i.getContainers=function(){return i.containers},i.toggleBefore=function(b){var c=i.containers.indexOf(b)-1,d=i.containers[c];d.collapsed=!i.containers[c].collapsed;var e=i.containers[c+1],f=i.containers[c+2];return a.$apply(function(){d.collapsed?(d.actualSize=d.size,d.size=0,e&&(e[i.sizeProperties.flowProperty]-=d.actualSize),f&&(f[i.sizeProperties.flowProperty]-=d.actualSize,f.size+=d.actualSize)):(d.size=d.actualSize,e&&(e[i.sizeProperties.flowProperty]+=d.actualSize),f&&(f[i.sizeProperties.flowProperty]+=d.actualSize,f.size-=d.actualSize))}),d.collapsed},i.toggleAfter=function(b){var d,e=i.containers.indexOf(b)+1,f=i.containers[e],g=i.containers[e-1],h=i.containers[e-2],j=e===i.containers.length-1;return i.bounds=c[0].getBoundingClientRect(),f.collapsed=!i.containers[e].collapsed,a.$apply(function(){f.collapsed?(f.actualSize=f.size,f.size=0,
// adds additional space so the splitbar moves to the very end of the container
// to offset the lost space when converting from percents to pixels
d=j?i.bounds[i.sizeProperties.sizeProperty]-f[i.sizeProperties.flowProperty]-f.actualSize:0,g&&(g[i.sizeProperties.flowProperty]+=f.actualSize+d),h&&(h.size+=f.actualSize+d)):(f.size=f.actualSize,
// adds additional space so the splitbar moves back to the proper position
// to offset the additional space added when collapsing
d=j?i.bounds[i.sizeProperties.sizeProperty]-f[i.sizeProperties.flowProperty]-f.actualSize:0,g&&(g[i.sizeProperties.flowProperty]-=f.actualSize+d),h&&(h.size-=f.actualSize+d))}),f.collapsed},i.getPreviousSplitbarContainer=function(a){if(d.isSplitbar(a)){var b=i.containers.indexOf(a),c=b-2;return c>=0?i.containers[c]:null}return null},i.getNextSplitbarContainer=function(a){if(d.isSplitbar(a)){var b=i.containers.indexOf(a),c=b+2;return b>0&&c<i.containers.length?i.containers[c]:null}return null},i}]).directive("uiLayout",["$window",function(a){return{restrict:"AE",controller:"uiLayoutCtrl",link:function(b,c,d,e){function f(){b.$apply(function(){e.updateDisplay()})}b.$watch(c[0][e.sizeProperties.offsetSize],function(){e.updateDisplay()}),angular.element(a).bind("resize",f),b.$on("$destroy",function(){angular.element(a).unbind("resize",f)})}}}]).directive("uiSplitbar",["LayoutContainer",function(a){
// Get all the page.
var b=angular.element(document.body.parentElement);return{restrict:"EAC",require:"^uiLayout",scope:{},link:function(c,d,e,f){d.hasClass("stretch")||d.addClass("stretch"),d.hasClass("ui-splitbar")||d.addClass("ui-splitbar"),c.splitbar=a.Splitbar(),c.splitbar.element=d;
//chevron <a> elements
var g=angular.element(d.children()[0]),h=angular.element(d.children()[1]),i=(angular.element(g.children()[0]),angular.element(h.children()[0]),"glyphicon-chevron-left"),j="glyphicon-chevron-right",k="glyphicon-chevron-up",l="glyphicon-chevron-down";f.isUsingColumnFlow?i:k,f.isUsingColumnFlow?j:l;
//prevChevron.addClass(prevChevronClass);
//afterChevron.addClass(afterChevronClass);
/*prevButton.on('click', function() {
          var prevSplitbarBeforeButton, prevSplitbarAfterButton;
          var result = ctrl.toggleBefore(scope.splitbar);
          var previousSplitbar = ctrl.getPreviousSplitbarContainer(scope.splitbar);

          if(previousSplitbar !== null) {
            prevSplitbarBeforeButton = angular.element(previousSplitbar.element.children()[0]);
            prevSplitbarAfterButton = angular.element(previousSplitbar.element.children()[1]);
          }

          if(ctrl.isUsingColumnFlow) {
            if(result) {
              afterButton.css('display', 'none');
              prevChevron.removeClass(chevronLeft);
              prevChevron.addClass(chevronRight);

              // hide previous splitbar buttons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'none');
                prevSplitbarAfterButton.css('display', 'none');
              }
            } else {
              afterButton.css('display', 'inline');
              prevChevron.removeClass(chevronRight);
              prevChevron.addClass(chevronLeft);

              // show previous splitbar chevrons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'inline');
                prevSplitbarAfterButton.css('display', 'inline');
              }
            }
          } else {
            if(result) {
              afterButton.css('display', 'none');
              prevChevron.removeClass(chevronUp);
              prevChevron.addClass(chevronDown);

              // hide previous splitbar buttons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'none');
                prevSplitbarAfterButton.css('display', 'none');
              }
            } else {
              afterButton.css('display', 'inline');
              prevChevron.removeClass(chevronDown);
              prevChevron.addClass(chevronUp);

              // show previous splitbar chevrons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'inline');
                prevSplitbarAfterButton.css('display', 'inline');
              }
            }
          }
        });*/
/*afterButton.on('click', function() {
          var nextSplitbarBeforeButton, nextSplitbarAfterButton;
          var result = ctrl.toggleAfter(scope.splitbar);
          var nextSplitbar = ctrl.getNextSplitbarContainer(scope.splitbar);

          if(nextSplitbar !== null) {
            nextSplitbarBeforeButton = angular.element(nextSplitbar.element.children()[0]);
            nextSplitbarAfterButton = angular.element(nextSplitbar.element.children()[1]);
          }

          if(ctrl.isUsingColumnFlow) {
            if(result) {
              prevButton.css('display', 'none');
              afterChevron.removeClass(chevronRight);
              afterChevron.addClass(chevronLeft);

              // hide next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'none');
                nextSplitbarAfterButton.css('display', 'none');
              }
            } else {
              prevButton.css('display', 'inline');
              afterChevron.removeClass(chevronLeft);
              afterChevron.addClass(chevronRight);

              // show next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'inline');
                nextSplitbarAfterButton.css('display', 'inline');
              }
            }
          } else {
            if(result) {
              prevButton.css('display', 'none');
              afterChevron.removeClass(chevronDown);
              afterChevron.addClass(chevronUp);

              // hide next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'none');
                nextSplitbarAfterButton.css('display', 'none');
              }
            } else {
              prevButton.css('display', 'inline');
              afterChevron.removeClass(chevronUp);
              afterChevron.addClass(chevronDown);

              // show next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'inline');
                nextSplitbarAfterButton.css('display', 'inline');
              }
            }
          }
        });*/
d.on("mousedown touchstart",function(a){return f.movingSplitbar=c.splitbar,f.processSplitbar(c.splitbar),a.preventDefault(),a.stopPropagation(),b.on("mousemove touchmove",function(a){c.$apply(angular.bind(f,f.mouseMoveHandler,a))}),!1}),b.on("mouseup touchend",function(a){c.$apply(angular.bind(f,f.mouseUpHandler,a)),b.off("mousemove touchmove")}),c.$watch("splitbar.size",function(a){d.css(f.sizeProperties.sizeProperty,a+"px")}),c.$watch("splitbar."+f.sizeProperties.flowProperty,function(a){d.css(f.sizeProperties.flowProperty,a+"px")}),
//Add splitbar to layout container list
f.addContainer(c.splitbar)}}}]).directive("uiLayoutContainer",["LayoutContainer",function(a){return{restrict:"AE",require:"^uiLayout",scope:{},compile:function(b){
//TODO: add ability to disable auto-adding a splitbar after the container
var c=angular.element('<div ui-splitbar><a><span class="glyphicon"></span></a><a><span class="glyphicon"></span></a></div>');return b.after(c),{pre:function(b,c,d,e){b.container=a.Container(),b.container.element=c,e.addContainer(b.container)},post:function(a,b,c,d){b.hasClass("stretch")||b.addClass("stretch"),b.hasClass("ui-layout-container")||b.addClass("ui-layout-container"),a.$watch("container.size",function(a){b.css(d.sizeProperties.sizeProperty,a+"px")}),a.$watch("container."+d.sizeProperties.flowProperty,function(a){b.css(d.sizeProperties.flowProperty,a+"px")})}}}}}]).factory("LayoutContainer",function(){
// Base container that can be locked and resized
function a(){this.size=0,this.maxSize=null,this.minSize=0,this.resizable=!0,this.locked=!1,this.element=null,this.collapsed=!1}
// Splitbar container
function b(){this.size=10,this.left=0,this.top=0,this.element=null}return{Container:function(b){return new a(b)},Splitbar:function(){return new b},isSplitbar:function(a){return a instanceof b}}}),function(a){"use strict";a.module("treeControl",[]).directive("treecontrol",["$compile",function(b){/**
             * @param cssClass - the css class
             * @param addClassProperty - should we wrap the class name with class=""
             */
function c(a,b){return a?b?'class="'+a+'"':a:""}function d(a,b,c){a.hasOwnProperty(b)||(a[b]=c)}return{restrict:"EA",require:"treecontrol",transclude:!0,scope:{treeModel:"=",selectedNode:"=?",expandedNodes:"=?",onSelection:"&",onNodeToggle:"&",options:"=?",orderBy:"@",reverseOrder:"@",filterExpression:"=?",filterComparator:"=?"},controller:["$scope",function(e){function f(a){return!a[e.options.nodeChildren]||0===a[e.options.nodeChildren].length}function g(b,c){return void 0===b||void 0===c?!1:(b=a.copy(b),b[e.options.nodeChildren]=[],c=a.copy(c),c[e.options.nodeChildren]=[],a.equals(b,c))}e.options=e.options||{},d(e.options,"nodeChildren","children"),d(e.options,"dirSelectable","true"),d(e.options,"injectClasses",{}),d(e.options.injectClasses,"ul",""),d(e.options.injectClasses,"li",""),d(e.options.injectClasses,"liSelected",""),d(e.options.injectClasses,"iExpanded",""),d(e.options.injectClasses,"iCollapsed",""),d(e.options.injectClasses,"iLeaf",""),d(e.options.injectClasses,"label",""),d(e.options.injectClasses,"labelSelected",""),d(e.options,"equality",g),d(e.options,"isLeaf",f),e.expandedNodes=e.expandedNodes||[],e.expandedNodesMap={};for(var h=0;h<e.expandedNodes.length;h++)
// fixes compatibility with Angular 1.13
// see https://github.com/DJMatty/angular-tree-control/commit/b29a55d21512e40c6d4d2d1061f4a654a841708f
e.expandedNodesMap["x"+h]=e.expandedNodes[h];e.parentScopeOfTree=e.$parent,e.headClass=function(a){var b=c(e.options.injectClasses.liSelected,!1),d="";
// Malte: top node (TOC) should have different icon (enforced by CSS class)
// Malte: top node (TOC) should have different icon (enforced by CSS class)
// we don't need the TOC structure icon - "tree-top"
// Malte: extended to gray out empty folders
// Malte: extended to gray out empty folders
return b&&e.options.equality(this.node,e.selectedNode)&&(d=" "+b),"TOC"===this.node.type?"tree-top":e.options.isLeaf(a)?"tree-leaf"+d:e.expandedNodesMap[this.$id]?a.docCount>0?"tree-expanded"+d:"tree-expanded no-documents"+d:a.docCount>0?"tree-collapsed"+d:"tree-collapsed no-documents"+d},e.iBranchClass=function(){return c(e.expandedNodesMap[this.$id]?e.options.injectClasses.iExpanded:e.options.injectClasses.iCollapsed)},e.nodeExpanded=function(){return!!e.expandedNodesMap[this.$id]},e.selectNodeHead=function(){var a=void 0===e.expandedNodesMap[this.$id];if(e.expandedNodesMap[this.$id]=a?this.node:void 0,a)e.expandedNodes.push(this.node);else{for(var b,c=0;c<e.expandedNodes.length&&!b;c++)e.options.equality(e.expandedNodes[c],this.node)&&(b=c);void 0!=b&&e.expandedNodes.splice(b,1)}e.onNodeToggle&&e.onNodeToggle({node:this.node,expanded:a})},e.selectNodeLabel=function(a){a[e.options.nodeChildren]&&a[e.options.nodeChildren].length>0&&!e.options.dirSelectable?this.selectNodeHead():(e.selectedNode!=a&&(e.selectedNode=a),e.onSelection&&e.onSelection({node:e.selectedNode}))},e.selectedClass=function(){var a=c(e.options.injectClasses.labelSelected,!1),b="";return a&&this.node==e.selectedNode&&(b=" "+a),this.node==e.selectedNode?"tree-selected"+b:""},e.docCount=function(){function a(b){var c=0;if("DOC"===b.type)return 1;for(var d=0;d<b.children.length;d++)c+=a(b.children[d]);return c}return a(this.node)};
//tree template
var i="<ul "+c(e.options.injectClasses.ul,!0)+'><li ng-repeat="node in node.'+e.options.nodeChildren+' | filter:filterExpression:filterComparator | orderBy:orderBy:reverseOrder" ng-class="headClass(node)" '+c(e.options.injectClasses.li,!0)+'><i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead(node)"></i><i class="tree-leaf-head '+c(e.options.injectClasses.iLeaf,!1)+'"></i><div class="tree-label '+c(e.options.injectClasses.label,!1)+'" ng-class="selectedClass()" ng-click="selectNodeLabel(node)" tree-transclude></div><treeitem ng-if="nodeExpanded()"></treeitem></li></ul>';this.template=b(i)}],compile:function(b,c,d){return function(b,c,e,f){b.$watch("treeModel",function(c){if(a.isArray(c)){if(a.isDefined(b.node)&&a.equals(b.node[b.options.nodeChildren],c))return;b.node={},b.synteticRoot=b.node,b.node[b.options.nodeChildren]=c}else{if(a.equals(b.node,c))return;b.node=c}}),b.$watchCollection("expandedNodes",function(d){var e=0,f={},g=c.find("li"),h=[];
// find all nodes visible on the tree and the scope $id of the scopes including them
a.forEach(g,function(b){var c=a.element(b),d=c.scope();h.push(d)}),
// iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
// if found, add the mapping $id -> node into newExpandedNodesMap
// if not found, add the mapping num -> node into newExpandedNodesMap
a.forEach(d,function(a){for(var c=!1,d=0;d<h.length&&!c;d++){var g=h[d];b.options.equality(a,g.node)&&(f[g.$id]=g.node,c=!0)}c||(
// fixes compatibility with Angular 1.13
// see https://github.com/DJMatty/angular-tree-control/commit/b29a55d21512e40c6d4d2d1061f4a654a841708f
f["x"+e++]=a)}),b.expandedNodesMap=f}),
//Rendering template for a root node
f.template(b,function(a){c.html("").append(a)}),
// save the transclude function from compile (which is not bound to a scope as apposed to the one from link)
// we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need
// to keep using the compile function
b.$treeTransclude=d}}}}]).directive("treeitem",function(){return{restrict:"E",require:"^treecontrol",link:function(a,b,c,d){
// Rendering template for the current node
d.template(a,function(a){b.html("").append(a)})}}}).directive("treeTransclude",function(){return{link:function(b,c,d,e){b.options.isLeaf(b.node)||a.forEach(b.expandedNodesMap,function(a,c){b.options.equality(a,b.node)&&(b.expandedNodesMap[b.$id]=b.node,
// fixes compatibility with Angular 1.13
// see https://github.com/DJMatty/angular-tree-control/commit/b29a55d21512e40c6d4d2d1061f4a654a841708f
b.expandedNodesMap["x"+c]=void 0)}),b.options.equality(b.node,b.selectedNode)&&(b.selectedNode=b.node),
// create a scope for the transclusion, whos parent is the parent of the tree control
b.transcludeScope=b.parentScopeOfTree.$new(),b.transcludeScope.node=b.node,b.transcludeScope.$parentNode=b.$parent.node===b.synteticRoot?null:b.$parent.node,b.transcludeScope.$index=b.$index,b.transcludeScope.$first=b.$first,b.transcludeScope.$middle=b.$middle,b.transcludeScope.$last=b.$last,b.transcludeScope.$odd=b.$odd,b.transcludeScope.$even=b.$even,b.$on("$destroy",function(){b.transcludeScope.$destroy()}),b.$treeTransclude(b.transcludeScope,function(a){c.empty(),c.append(a)})}}})}(angular);