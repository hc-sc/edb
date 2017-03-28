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
/* jshint globalstrict: false */
/* umdutils ignore */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define("pdfjs-dist/build/pdf",["exports"],b):b("undefined"!=typeof exports?exports:a.pdfjsDistBuildPdf={})}(this,function(a){
// Use strict in our context only - users might not want it
"use strict";var b="1.5.250",c="c1c199d",d="undefined"!=typeof document&&document.currentScript?document.currentScript.src:null,e={};(function(){!function(a,b){b(a.pdfjsSharedUtil={})}(this,function(a){function b(a){X=a}function c(){return X}
// A notice for devs. These are good for things that are helpful to devs, such
// as warning that Workers were disabled, which is important to devs but not
// end users.
function d(a){X>=V.infos&&console.log("Info: "+a)}
// Non-fatal warnings.
function e(a){X>=V.warnings&&console.log("Warning: "+a)}
// Deprecated API function -- display regardless of the PDFJS.verbosity setting.
function f(a){console.log("Deprecated API usage: "+a)}
// Fatal errors that should trigger the fallback UI and halt execution by
// throwing an exception.
function g(a){throw X>=V.errors&&(console.log("Error: "+a),console.log(h())),new Error(a)}function h(){try{throw new Error}catch(a){return a.stack?a.stack.split("\n").slice(2).join("\n"):""}}function i(a,b){a||g(b)}
// Checks if URLs have the same origin. For non-HTTP based URLs, returns false.
function j(a,b){try{var c=new URL(a);if(!c.origin||"null"===c.origin)return!1}catch(d){return!1}var e=new URL(b,c);return c.origin===e.origin}
// Validates if URL is safe and allowed, e.g. to avoid XSS.
function k(a,b){if(!a||"string"!=typeof a)return!1;
// RFC 3986 (http://tools.ietf.org/html/rfc3986#section-3.1)
// scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
var c=/^[a-z][a-z0-9+\-.]*(?=:)/i.exec(a);if(!c)return b;switch(c=c[0].toLowerCase()){case"http":case"https":case"ftp":case"mailto":case"tel":return!0;default:return!1}}function l(a,b,c){return Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!1}),c}function m(a){var b;return function(){return a&&(b=Object.create(null),a(b),a=null),b}}function n(a){return"string"!=typeof a?(e("The argument for removeNullCharacters must be a string."),a):a.replace(ga,"")}function o(a){i(null!==a&&"object"==typeof a&&void 0!==a.length,"Invalid argument for bytesToString");var b=a.length,c=8192;if(c>b)return String.fromCharCode.apply(null,a);for(var d=[],e=0;b>e;e+=c){var f=Math.min(e+c,b),g=a.subarray(e,f);d.push(String.fromCharCode.apply(null,g))}return d.join("")}function p(a){i("string"==typeof a,"Invalid argument for stringToBytes");for(var b=a.length,c=new Uint8Array(b),d=0;b>d;++d)c[d]=255&a.charCodeAt(d);return c}/**
 * Gets length of the array (Array, Uint8Array, or string) in bytes.
 * @param {Array|Uint8Array|string} arr
 * @returns {number}
 */
function q(a){return void 0!==a.length?a.length:(i(void 0!==a.byteLength),a.byteLength)}/**
 * Combines array items (arrays) into single Uint8Array object.
 * @param {Array} arr - the array of the arrays (Array, Uint8Array, or string).
 * @returns {Uint8Array}
 */
function r(a){
// Shortcut: if first and only item is Uint8Array, return it.
if(1===a.length&&a[0]instanceof Uint8Array)return a[0];var b,c,d,e=0,f=a.length;for(b=0;f>b;b++)c=a[b],d=q(c),e+=d;var g=0,h=new Uint8Array(e);for(b=0;f>b;b++)c=a[b],c instanceof Uint8Array||(c="string"==typeof c?p(c):new Uint8Array(c)),d=c.byteLength,h.set(c,g),g+=d;return h}function s(a){return String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,255&a)}function t(a){for(var b=1,c=0;a>b;)b<<=1,c++;return c}function u(a,b){return a[b]<<24>>24}function v(a,b){return a[b]<<8|a[b+1]}function w(a,b){return(a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3])>>>0}
// Lazy test the endianness of the platform
// NOTE: This will be 'true' for simulated TypedArrays
function x(){var a=new Uint8Array(2);a[0]=1;var b=new Uint16Array(a.buffer);return 1===b[0]}
// Checks if it's possible to eval JS expressions.
function y(){try{/* jshint evil: true */
return new Function(""),!0}catch(a){return!1}}function z(a){var b,c=a.length,d=[];if("þ"===a[0]&&"ÿ"===a[1])
// UTF16BE BOM
for(b=2;c>b;b+=2)d.push(String.fromCharCode(a.charCodeAt(b)<<8|a.charCodeAt(b+1)));else for(b=0;c>b;++b){var e=la[a.charCodeAt(b)];d.push(e?String.fromCharCode(e):a.charAt(b))}return d.join("")}function A(a){return decodeURIComponent(escape(a))}function B(a){return unescape(encodeURIComponent(a))}function C(a){for(var b in a)return!1;return!0}function D(a){return"boolean"==typeof a}function E(a){return"number"==typeof a&&(0|a)===a}function F(a){return"number"==typeof a}function G(a){return"string"==typeof a}function H(a){return a instanceof Array}function I(a){return"object"==typeof a&&null!==a&&void 0!==a.byteLength}/**
 * Promise Capability object.
 *
 * @typedef {Object} PromiseCapability
 * @property {Promise} promise - A promise object.
 * @property {function} resolve - Fullfills the promise.
 * @property {function} reject - Rejects the promise.
 */
/**
 * Creates a promise capability object.
 * @alias createPromiseCapability
 *
 * @return {PromiseCapability} A capability object contains:
 * - a Promise, resolve and reject methods.
 */
function J(){var a={};return a.promise=new Promise(function(b,c){a.resolve=b,a.reject=c}),a}function K(a,b,c){this.sourceName=a,this.targetName=b,this.comObj=c,this.callbackIndex=1,this.postMessageTransfers=!0;var d=this.callbacksCapabilities=Object.create(null),e=this.actionHandler=Object.create(null);this._onComObjOnMessage=function(a){var b=a.data;if(b.targetName===this.sourceName)if(b.isReply){var f=b.callbackId;if(b.callbackId in d){var h=d[f];delete d[f],"error"in b?h.reject(b.error):h.resolve(b.data)}else g("Cannot resolve callback "+f)}else if(b.action in e){var i=e[b.action];if(b.callbackId){var j=this.sourceName,k=b.sourceName;Promise.resolve().then(function(){return i[0].call(i[1],b.data)}).then(function(a){c.postMessage({sourceName:j,targetName:k,isReply:!0,callbackId:b.callbackId,data:a})},function(a){a instanceof Error&&(
// Serialize error to avoid "DataCloneError"
a+=""),c.postMessage({sourceName:j,targetName:k,isReply:!0,callbackId:b.callbackId,error:a})})}else i[0].call(i[1],b.data)}else g("Unknown action from worker: "+b.action)}.bind(this),c.addEventListener("message",this._onComObjOnMessage)}function L(a,b,c){var d=new Image;d.onload=function(){c.resolve(a,d)},d.onerror=function(){c.resolve(a,null),e("Error during JPEG image loading")},d.src=b}var M="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,N=[.001,0,0,.001,0,0],O={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},P={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},Q={TEXT:1,LINK:2,FREETEXT:3,LINE:4,SQUARE:5,CIRCLE:6,POLYGON:7,POLYLINE:8,HIGHLIGHT:9,UNDERLINE:10,SQUIGGLY:11,STRIKEOUT:12,STAMP:13,CARET:14,INK:15,POPUP:16,FILEATTACHMENT:17,SOUND:18,MOVIE:19,WIDGET:20,SCREEN:21,PRINTERMARK:22,TRAPNET:23,WATERMARK:24,THREED:25,REDACT:26},R={INVISIBLE:1,HIDDEN:2,PRINT:4,NOZOOM:8,NOROTATE:16,NOVIEW:32,READONLY:64,LOCKED:128,TOGGLENOVIEW:256,LOCKEDCONTENTS:512},S={SOLID:1,DASHED:2,BEVELED:3,INSET:4,UNDERLINE:5},T={UNKNOWN:0,FLATE:1,LZW:2,DCT:3,JPX:4,JBIG:5,A85:6,AHX:7,CCF:8,RL:9},U={UNKNOWN:0,TYPE1:1,TYPE1C:2,CIDFONTTYPE0:3,CIDFONTTYPE0C:4,TRUETYPE:5,CIDFONTTYPE2:6,TYPE3:7,OPENTYPE:8,TYPE0:9,MMTYPE1:10},V={errors:0,warnings:1,infos:5},W={
// Intentionally start from 1 so it is easy to spot bad operators that will be
// 0's.
dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},X=V.warnings,Y={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},Z={NEED_PASSWORD:1,INCORRECT_PASSWORD:2},$=function(){function a(a,b){this.name="PasswordException",this.message=a,this.code=b}return a.prototype=new Error,a.constructor=a,a}(),_=function(){function a(a,b){this.name="UnknownErrorException",this.message=a,this.details=b}return a.prototype=new Error,a.constructor=a,a}(),aa=function(){function a(a){this.name="InvalidPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}(),ba=function(){function a(a){this.name="MissingPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}(),ca=function(){function a(a,b){this.name="UnexpectedResponseException",this.message=a,this.status=b}return a.prototype=new Error,a.constructor=a,a}(),da=function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="NotImplementedException",a.constructor=a,a}(),ea=function(){function a(a,b){this.begin=a,this.end=b,this.message="Missing data ["+a+", "+b+")"}return a.prototype=new Error,a.prototype.name="MissingDataException",a.constructor=a,a}(),fa=function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="XRefParseException",a.constructor=a,a}(),ga=/\x00/g,ha=function(){function a(a,b){this.buffer=a,this.byteLength=a.length,this.length=void 0===b?this.byteLength>>2:b,c(this.length)}function b(a){return{get:function(){var b=this.buffer,c=a<<2;return(b[c]|b[c+1]<<8|b[c+2]<<16|b[c+3]<<24)>>>0},set:function(b){var c=this.buffer,d=a<<2;c[d]=255&b,c[d+1]=b>>8&255,c[d+2]=b>>16&255,c[d+3]=b>>>24&255}}}function c(c){for(;c>d;)Object.defineProperty(a.prototype,d,b(d)),d++}a.prototype=Object.create(null);var d=0;return a}();a.Uint32ArrayView=ha;var ia=[1,0,0,1,0,0],ja=function(){function a(){}var b=["rgb(",0,",",0,",",0,")"];
// makeCssRgb() can be called thousands of times. Using |rgbBuf| avoids
// creating many intermediate strings.
a.makeCssRgb=function(a,c,d){return b[1]=a,b[3]=c,b[5]=d,b.join("")},
// Concatenates two transformation matrices together and returns the result.
a.transform=function(a,b){return[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]]},
// For 2d affine transforms
a.applyTransform=function(a,b){var c=a[0]*b[0]+a[1]*b[2]+b[4],d=a[0]*b[1]+a[1]*b[3]+b[5];return[c,d]},a.applyInverseTransform=function(a,b){var c=b[0]*b[3]-b[1]*b[2],d=(a[0]*b[3]-a[1]*b[2]+b[2]*b[5]-b[4]*b[3])/c,e=(-a[0]*b[1]+a[1]*b[0]+b[4]*b[1]-b[5]*b[0])/c;return[d,e]},
// Applies the transform to the rectangle and finds the minimum axially
// aligned bounding box.
a.getAxialAlignedBoundingBox=function(b,c){var d=a.applyTransform(b,c),e=a.applyTransform(b.slice(2,4),c),f=a.applyTransform([b[0],b[3]],c),g=a.applyTransform([b[2],b[1]],c);return[Math.min(d[0],e[0],f[0],g[0]),Math.min(d[1],e[1],f[1],g[1]),Math.max(d[0],e[0],f[0],g[0]),Math.max(d[1],e[1],f[1],g[1])]},a.inverseTransform=function(a){var b=a[0]*a[3]-a[1]*a[2];return[a[3]/b,-a[1]/b,-a[2]/b,a[0]/b,(a[2]*a[5]-a[4]*a[3])/b,(a[4]*a[1]-a[5]*a[0])/b]},
// Apply a generic 3d matrix M on a 3-vector v:
//   | a b c |   | X |
//   | d e f | x | Y |
//   | g h i |   | Z |
// M is assumed to be serialized as [a,b,c,d,e,f,g,h,i],
// with v as [X,Y,Z]
a.apply3dTransform=function(a,b){return[a[0]*b[0]+a[1]*b[1]+a[2]*b[2],a[3]*b[0]+a[4]*b[1]+a[5]*b[2],a[6]*b[0]+a[7]*b[1]+a[8]*b[2]]},
// This calculation uses Singular Value Decomposition.
// The SVD can be represented with formula A = USV. We are interested in the
// matrix S here because it represents the scale values.
a.singularValueDecompose2dScale=function(a){var b=[a[0],a[2],a[1],a[3]],c=a[0]*b[0]+a[1]*b[2],d=a[0]*b[1]+a[1]*b[3],e=a[2]*b[0]+a[3]*b[2],f=a[2]*b[1]+a[3]*b[3],g=(c+f)/2,h=Math.sqrt((c+f)*(c+f)-4*(c*f-e*d))/2,i=g+h||1,j=g-h||1;
// Scale values are the square roots of the eigenvalues.
return[Math.sqrt(i),Math.sqrt(j)]},
// Normalize rectangle rect=[x1, y1, x2, y2] so that (x1,y1) < (x2,y2)
// For coordinate systems whose origin lies in the bottom-left, this
// means normalization to (BL,TR) ordering. For systems with origin in the
// top-left, this means (TL,BR) ordering.
a.normalizeRect=function(a){var b=a.slice(0);// clone rect
return a[0]>a[2]&&(b[0]=a[2],b[2]=a[0]),a[1]>a[3]&&(b[1]=a[3],b[3]=a[1]),b},
// Returns a rectangle [x1, y1, x2, y2] corresponding to the
// intersection of rect1 and rect2. If no intersection, returns 'false'
// The rectangle coordinates of rect1, rect2 should be [x1, y1, x2, y2]
a.intersect=function(b,c){function d(a,b){return a-b}
// Order points along the axes
var e=[b[0],b[2],c[0],c[2]].sort(d),f=[b[1],b[3],c[1],c[3]].sort(d),g=[];
// X: first and second points belong to different rectangles?
// X: first and second points belong to different rectangles?
// Intersection must be between second and third points
// Y: first and second points belong to different rectangles?
// Intersection must be between second and third points
return b=a.normalizeRect(b),c=a.normalizeRect(c),e[0]===b[0]&&e[1]===c[0]||e[0]===c[0]&&e[1]===b[0]?(g[0]=e[1],g[2]=e[2],f[0]===b[1]&&f[1]===c[1]||f[0]===c[1]&&f[1]===b[1]?(g[1]=f[1],g[3]=f[2],g):!1):!1},a.sign=function(a){return 0>a?-1:1};var c=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"];/**
   * Converts positive integers to (upper case) Roman numerals.
   * @param {integer} number - The number that should be converted.
   * @param {boolean} lowerCase - Indicates if the result should be converted
   *   to lower case letters. The default is false.
   * @return {string} The resulting Roman number.
   */
return a.toRoman=function(a,b){i(E(a)&&a>0,"The number should be a positive integer.");
// Thousands
for(var d,e=[];a>=1e3;)a-=1e3,e.push("M");d=a/100|0,a%=100,e.push(c[d]),d=a/10|0,a%=10,e.push(c[10+d]),e.push(c[20+a]);var f=e.join("");return b?f.toLowerCase():f},a.appendToArray=function(a,b){Array.prototype.push.apply(a,b)},a.prependToArray=function(a,b){Array.prototype.unshift.apply(a,b)},a.extendObj=function(a,b){for(var c in b)a[c]=b[c]},a.getInheritableProperty=function(a,b){for(;a&&!a.has(b);)a=a.get("Parent");return a?a.get(b):null},a.inherit=function(a,b,c){a.prototype=Object.create(b.prototype),a.prototype.constructor=a;for(var d in c)a.prototype[d]=c[d]},a.loadScript=function(a,b){var c=document.createElement("script"),d=!1;c.setAttribute("src",a),b&&(c.onload=function(){d||b(),d=!0}),document.getElementsByTagName("head")[0].appendChild(c)},a}(),ka=function(){/**
   * @constructor
   * @private
   * @param viewBox {Array} xMin, yMin, xMax and yMax coordinates.
   * @param scale {number} scale of the viewport.
   * @param rotation {number} rotations of the viewport in degrees.
   * @param offsetX {number} offset X
   * @param offsetY {number} offset Y
   * @param dontFlip {boolean} if true, axis Y will not be flipped.
   */
function a(a,b,c,d,e,f){this.viewBox=a,this.scale=b,this.rotation=c,this.offsetX=d,this.offsetY=e;
// creating transform to convert pdf coordinate system to the normal
// canvas like coordinates taking in account scale and rotation
var g,h,i,j,k=(a[2]+a[0])/2,l=(a[3]+a[1])/2;switch(c%=360,c=0>c?c+360:c){case 180:g=-1,h=0,i=0,j=1;break;case 90:g=0,h=1,i=1,j=0;break;case 270:g=0,h=-1,i=-1,j=0;break;
//case 0:
default:g=1,h=0,i=0,j=-1}f&&(i=-i,j=-j);var m,n,o,p;0===g?(m=Math.abs(l-a[1])*b+d,n=Math.abs(k-a[0])*b+e,o=Math.abs(a[3]-a[1])*b,p=Math.abs(a[2]-a[0])*b):(m=Math.abs(k-a[0])*b+d,n=Math.abs(l-a[1])*b+e,o=Math.abs(a[2]-a[0])*b,p=Math.abs(a[3]-a[1])*b),
// creating transform for the following operations:
// translate(-centerX, -centerY), rotate and flip vertically,
// scale, and translate(offsetCanvasX, offsetCanvasY)
this.transform=[g*b,h*b,i*b,j*b,m-g*b*k-i*b*l,n-h*b*k-j*b*l],this.width=o,this.height=p,this.fontScale=b}/** @lends PageViewport.prototype */
return a.prototype={/**
     * Clones viewport with additional properties.
     * @param args {Object} (optional) If specified, may contain the 'scale' or
     * 'rotation' properties to override the corresponding properties in
     * the cloned viewport.
     * @returns {PageViewport} Cloned viewport.
     */
clone:function(b){b=b||{};var c="scale"in b?b.scale:this.scale,d="rotation"in b?b.rotation:this.rotation;return new a(this.viewBox.slice(),c,d,this.offsetX,this.offsetY,b.dontFlip)},/**
     * Converts PDF point to the viewport coordinates. For examples, useful for
     * converting PDF location into canvas pixel coordinates.
     * @param x {number} X coordinate.
     * @param y {number} Y coordinate.
     * @returns {Object} Object that contains 'x' and 'y' properties of the
     * point in the viewport coordinate space.
     * @see {@link convertToPdfPoint}
     * @see {@link convertToViewportRectangle}
     */
convertToViewportPoint:function(a,b){return ja.applyTransform([a,b],this.transform)},/**
     * Converts PDF rectangle to the viewport coordinates.
     * @param rect {Array} xMin, yMin, xMax and yMax coordinates.
     * @returns {Array} Contains corresponding coordinates of the rectangle
     * in the viewport coordinate space.
     * @see {@link convertToViewportPoint}
     */
convertToViewportRectangle:function(a){var b=ja.applyTransform([a[0],a[1]],this.transform),c=ja.applyTransform([a[2],a[3]],this.transform);return[b[0],b[1],c[0],c[1]]},/**
     * Converts viewport coordinates to the PDF location. For examples, useful
     * for converting canvas pixel location into PDF one.
     * @param x {number} X coordinate.
     * @param y {number} Y coordinate.
     * @returns {Object} Object that contains 'x' and 'y' properties of the
     * point in the PDF coordinate space.
     * @see {@link convertToViewportPoint}
     */
convertToPdfPoint:function(a,b){return ja.applyInverseTransform([a,b],this.transform)}},a}(),la=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364];/**
 * Polyfill for Promises:
 * The following promise implementation tries to generally implement the
 * Promise/A+ spec. Some notable differences from other promise libaries are:
 * - There currently isn't a seperate deferred and promise object.
 * - Unhandled rejections eventually show an error if they aren't handled.
 *
 * Based off of the work in:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=810490
 */
!function(){function a(a){this._status=b,this._handlers=[];try{a.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(c){this._reject(c)}}if(M.Promise)
// Promises existing in the DOM/Worker, checking presence of all/resolve
return"function"!=typeof M.Promise.all&&(M.Promise.all=function(a){var b,c,d=0,e=[],f=new M.Promise(function(a,d){b=a,c=d});return a.forEach(function(a,f){d++,a.then(function(a){e[f]=a,d--,0===d&&b(e)},c)}),0===d&&b(e),f}),"function"!=typeof M.Promise.resolve&&(M.Promise.resolve=function(a){return new M.Promise(function(b){b(a)})}),"function"!=typeof M.Promise.reject&&(M.Promise.reject=function(a){return new M.Promise(function(b,c){c(a)})}),void("function"!=typeof M.Promise.prototype["catch"]&&(M.Promise.prototype["catch"]=function(a){return M.Promise.prototype.then(void 0,a)}));var b=0,c=1,d=2,f=500,g={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(a){a._status!==b&&(this.handlers=this.handlers.concat(a._handlers),a._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var a=1,b=Date.now()+a;this.handlers.length>0;){var e=this.handlers.shift(),f=e.thisPromise._status,g=e.thisPromise._value;try{f===c?"function"==typeof e.onResolve&&(g=e.onResolve(g)):"function"==typeof e.onReject&&(g=e.onReject(g),f=c,e.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(e.thisPromise))}catch(h){f=d,g=h}if(e.nextPromise._updateStatus(f,g),Date.now()>=b)break}return this.handlers.length>0?void setTimeout(this.runHandlers.bind(this),0):void(this.running=!1)},addUnhandledRejection:function(a){this.unhandledRejections.push({promise:a,time:Date.now()}),this.scheduleRejectionCheck()},removeUnhandeledRejection:function(a){a._unhandledRejection=!1;for(var b=0;b<this.unhandledRejections.length;b++)this.unhandledRejections[b].promise===a&&(this.unhandledRejections.splice(b),b--)},scheduleRejectionCheck:function(){this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){this.pendingRejectionCheck=!1;for(var a=Date.now(),b=0;b<this.unhandledRejections.length;b++)if(a-this.unhandledRejections[b].time>f){var c=this.unhandledRejections[b].promise._value,d="Unhandled rejection: "+c;c.stack&&(d+="\n"+c.stack),e(d),this.unhandledRejections.splice(b),b--}this.unhandledRejections.length&&this.scheduleRejectionCheck()}.bind(this),f))}};/**
   * Builds a promise that is resolved when all the passed in promises are
   * resolved.
   * @param {array} promises array of data and/or promises to wait for.
   * @return {Promise} New dependant promise.
   */
a.all=function(b){function c(a){g._status!==d&&(i=[],f(a))}var e,f,g=new a(function(a,b){e=a,f=b}),h=b.length,i=[];if(0===h)return e(i),g;for(var j=0,k=b.length;k>j;++j){var l=b[j],m=function(a){return function(b){g._status!==d&&(i[a]=b,h--,0===h&&e(i))}}(j);a.isPromise(l)?l.then(m,c):m(l)}return g},/**
   * Checks if the value is likely a promise (has a 'then' function).
   * @return {boolean} true if value is thenable
   */
a.isPromise=function(a){return a&&"function"==typeof a.then},/**
   * Creates resolved promise
   * @param value resolve value
   * @returns {Promise}
   */
a.resolve=function(b){return new a(function(a){a(b)})},/**
   * Creates rejected promise
   * @param reason rejection value
   * @returns {Promise}
   */
a.reject=function(b){return new a(function(a,c){c(b)})},a.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(b,e){if(this._status!==c&&this._status!==d){if(b===c&&a.isPromise(e))return void e.then(this._updateStatus.bind(this,c),this._updateStatus.bind(this,d));this._status=b,this._value=e,b===d&&0===this._handlers.length&&(this._unhandledRejection=!0,g.addUnhandledRejection(this)),g.scheduleHandlers(this)}},_resolve:function(a){this._updateStatus(c,a)},_reject:function(a){this._updateStatus(d,a)},then:function(b,c){var d=new a(function(a,b){this.resolve=a,this.reject=b});return this._handlers.push({thisPromise:this,onResolve:b,onReject:c,nextPromise:d}),g.scheduleHandlers(this),d},"catch":function(a){return this.then(void 0,a)}},M.Promise=a}();var ma=function(){function a(a,b,c){for(;a.length<c;)a+=b;return a}function b(){this.started=Object.create(null),this.times=[],this.enabled=!0}return b.prototype={time:function(a){this.enabled&&(a in this.started&&e("Timer is already running for "+a),this.started[a]=Date.now())},timeEnd:function(a){this.enabled&&(a in this.started||e("Timer has not been started for "+a),this.times.push({name:a,start:this.started[a],end:Date.now()}),
// Remove timer from started so it can be called again.
delete this.started[a])},toString:function(){var b,c,d=this.times,e="",f=0;for(b=0,c=d.length;c>b;++b){var g=d[b].name;g.length>f&&(f=g.length)}for(b=0,c=d.length;c>b;++b){var h=d[b],i=h.end-h.start;e+=a(h.name," ",f)+" "+i+"ms\n"}return e}},b}(),na=function(a,b){if("undefined"!=typeof Blob)return new Blob([a],{type:b});
// Blob builder is deprecated in FF14 and removed in FF18.
var c=new MozBlobBuilder;return c.append(a),c.getBlob(b)},oa=function(){
// Blob/createObjectURL is not available, falling back to data schema.
var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return function(b,c,d){if(!d&&"undefined"!=typeof URL&&URL.createObjectURL){var e=na(b,c);return URL.createObjectURL(e)}for(var f="data:"+c+";base64,",g=0,h=b.length;h>g;g+=3){var i=255&b[g],j=255&b[g+1],k=255&b[g+2],l=i>>2,m=(3&i)<<4|j>>4,n=h>g+1?(15&j)<<2|k>>6:64,o=h>g+2?63&k:64;f+=a[l]+a[m]+a[n]+a[o]}return f}}();K.prototype={on:function(a,b,c){var d=this.actionHandler;d[a]&&g('There is already an actionName called "'+a+'"'),d[a]=[b,c]},/**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * @param {String} actionName Action to call.
   * @param {JSON} data JSON data to send.
   * @param {Array} [transfers] Optional list of transfers/ArrayBuffers
   */
send:function(a,b,c){var d={sourceName:this.sourceName,targetName:this.targetName,action:a,data:b};this.postMessage(d,c)},/**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * Expects that other side will callback with the response.
   * @param {String} actionName Action to call.
   * @param {JSON} data JSON data to send.
   * @param {Array} [transfers] Optional list of transfers/ArrayBuffers.
   * @returns {Promise} Promise to be resolved with response data.
   */
sendWithPromise:function(a,b,c){var d=this.callbackIndex++,e={sourceName:this.sourceName,targetName:this.targetName,action:a,data:b,callbackId:d},f=J();this.callbacksCapabilities[d]=f;try{this.postMessage(e,c)}catch(g){f.reject(g)}return f.promise},/**
   * Sends raw message to the comObj.
   * @private
   * @param message {Object} Raw message.
   * @param transfers List of transfers/ArrayBuffers, or undefined.
   */
postMessage:function(a,b){b&&this.postMessageTransfers?this.comObj.postMessage(a,b):this.comObj.postMessage(a)},destroy:function(){this.comObj.removeEventListener("message",this._onComObjOnMessage)}},
// Polyfill from https://github.com/Polymer/URL
/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */
function(a){function b(a){return void 0!==m[a]}function c(){h.call(this),this._isInvalid=!0}function d(a){
// XXX
return""==a&&c.call(this),a.toLowerCase()}function e(a){var b=a.charCodeAt(0);
// " # < > ? `
return b>32&&127>b&&-1==[34,35,60,62,63,96].indexOf(b)?a:encodeURIComponent(a)}function f(a){
// XXX This actually needs to encode c using encoding and then
// convert the bytes one-by-one.
var b=a.charCodeAt(0);
// " # < > ` (do not escape '?')
return b>32&&127>b&&-1==[34,35,60,62,96].indexOf(b)?a:encodeURIComponent(a)}function g(a,g,h){function i(a){t.push(a)}var j=g||"scheme start",k=0,l="",r=!1,s=!1,t=[];a:for(;(a[k-1]!=o||0==k)&&!this._isInvalid;){var u=a[k];switch(j){case"scheme start":if(!u||!p.test(u)){if(g){i("Invalid scheme.");break a}l="",j="no scheme";continue}l+=u.toLowerCase(),j="scheme";break;case"scheme":if(u&&q.test(u))l+=u.toLowerCase();else{if(":"!=u){if(g){if(o==u)break a;i("Code point not allowed in scheme: "+u);break a}l="",k=0,j="no scheme";continue}if(this._scheme=l,l="",g)break a;b(this._scheme)&&(this._isRelative=!0),j="file"==this._scheme?"relative":this._isRelative&&h&&h._scheme==this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break;case"scheme data":"?"==u?(this._query="?",j="query"):"#"==u?(this._fragment="#",j="fragment"):
// XXX error handling
o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._schemeData+=e(u));break;case"no scheme":if(h&&b(h._scheme)){j="relative";continue}i("Missing scheme."),c.call(this);break;case"relative or authority":if("/"!=u||"/"!=a[k+1]){i("Expected /, got: "+u),j="relative";continue}j="authority ignore slashes";break;case"relative":if(this._isRelative=!0,"file"!=this._scheme&&(this._scheme=h._scheme),o==u){this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query,this._username=h._username,this._password=h._password;break a}if("/"==u||"\\"==u)"\\"==u&&i("\\ is an invalid code point."),j="relative slash";else if("?"==u)this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query="?",this._username=h._username,this._password=h._password,j="query";else{if("#"!=u){var v=a[k+1],w=a[k+2];("file"!=this._scheme||!p.test(u)||":"!=v&&"|"!=v||o!=w&&"/"!=w&&"\\"!=w&&"?"!=w&&"#"!=w)&&(this._host=h._host,this._port=h._port,this._username=h._username,this._password=h._password,this._path=h._path.slice(),this._path.pop()),j="relative path";continue}this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query,this._fragment="#",this._username=h._username,this._password=h._password,j="fragment"}break;case"relative slash":if("/"!=u&&"\\"!=u){"file"!=this._scheme&&(this._host=h._host,this._port=h._port,this._username=h._username,this._password=h._password),j="relative path";continue}"\\"==u&&i("\\ is an invalid code point."),j="file"==this._scheme?"file host":"authority ignore slashes";break;case"authority first slash":if("/"!=u){i("Expected '/', got: "+u),j="authority ignore slashes";continue}j="authority second slash";break;case"authority second slash":if(j="authority ignore slashes","/"!=u){i("Expected '/', got: "+u);continue}break;case"authority ignore slashes":if("/"!=u&&"\\"!=u){j="authority";continue}i("Expected authority, got: "+u);break;case"authority":if("@"==u){r&&(i("@ already seen."),l+="%40"),r=!0;for(var x=0;x<l.length;x++){var y=l[x];if("	"!=y&&"\n"!=y&&"\r"!=y)
// XXX check URL code points
if(":"!=y||null!==this._password){var z=e(y);null!==this._password?this._password+=z:this._username+=z}else this._password="";else i("Invalid whitespace in authority.")}l=""}else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){k-=l.length,l="",j="host";continue}l+=u}break;case"file host":if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){2!=l.length||!p.test(l[0])||":"!=l[1]&&"|"!=l[1]?0==l.length?j="relative path start":(this._host=d.call(this,l),l="",j="relative path start"):j="relative path";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid whitespace in file host."):l+=u;break;case"host":case"hostname":if(":"!=u||s){if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){if(this._host=d.call(this,l),l="",j="relative path start",g)break a;continue}"	"!=u&&"\n"!=u&&"\r"!=u?("["==u?s=!0:"]"==u&&(s=!1),l+=u):i("Invalid code point in host/hostname: "+u)}else if(
// XXX host parsing
this._host=d.call(this,l),l="",j="port","hostname"==g)break a;break;case"port":if(/[0-9]/.test(u))l+=u;else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u||g){if(""!=l){var A=parseInt(l,10);A!=m[this._scheme]&&(this._port=A+""),l=""}if(g)break a;j="relative path start";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid code point in port: "+u):c.call(this)}break;case"relative path start":if("\\"==u&&i("'\\' not allowed in path."),j="relative path","/"!=u&&"\\"!=u)continue;break;case"relative path":if(o!=u&&"/"!=u&&"\\"!=u&&(g||"?"!=u&&"#"!=u))"	"!=u&&"\n"!=u&&"\r"!=u&&(l+=e(u));else{"\\"==u&&i("\\ not allowed in relative path.");var B;(B=n[l.toLowerCase()])&&(l=B),".."==l?(this._path.pop(),"/"!=u&&"\\"!=u&&this._path.push("")):"."==l&&"/"!=u&&"\\"!=u?this._path.push(""):"."!=l&&("file"==this._scheme&&0==this._path.length&&2==l.length&&p.test(l[0])&&"|"==l[1]&&(l=l[0]+":"),this._path.push(l)),l="","?"==u?(this._query="?",j="query"):"#"==u&&(this._fragment="#",j="fragment")}break;case"query":g||"#"!=u?o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._query+=f(u)):(this._fragment="#",j="fragment");break;case"fragment":o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._fragment+=u)}k++}}function h(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}
// Does not process domain names or IP addresses.
// Does not handle encoding for the query parameter.
function i(a,b){void 0===b||b instanceof i||(b=new i(String(b))),this._url=a,h.call(this);var c=a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");
// encoding = encoding || 'utf-8'
g.call(this,c,null,b)}/* jshint ignore:start */
// feature detect for URL constructor
var j=!1;try{if("function"==typeof URL&&"object"==typeof URL.prototype&&"origin"in URL.prototype){var k=new URL("b","http://a");k.pathname="c%20d",j="http://a/c%20d"===k.href}}catch(l){}if(!j){var m=Object.create(null);m.ftp=21,m.file=0,m.gopher=70,m.http=80,m.https=443,m.ws=80,m.wss=443;var n=Object.create(null);n["%2e"]=".",n[".%2e"]="..",n["%2e."]="..",n["%2e%2e"]="..";var o=void 0,p=/[a-zA-Z]/,q=/[a-zA-Z0-9\+\-\.]/;i.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url;var a="";return""==this._username&&null==this._password||(a=this._username+(null!=this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+a+this.host:"")+this.pathname+this._query+this._fragment},set href(a){h.call(this),g.call(this,a)},get protocol(){return this._scheme+":"},set protocol(a){this._isInvalid||g.call(this,a+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"host")},get hostname(){return this._host},set hostname(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"hostname")},get port(){return this._port},set port(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(a){!this._isInvalid&&this._isRelative&&(this._path=[],g.call(this,a,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(a){!this._isInvalid&&this._isRelative&&(this._query="?","?"==a[0]&&(a=a.slice(1)),g.call(this,a,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(a){this._isInvalid||(this._fragment="#","#"==a[0]&&(a=a.slice(1)),g.call(this,a,"fragment"))},get origin(){var a;if(this._isInvalid||!this._scheme)return"";
// javascript: Gecko returns String(""), WebKit/Blink String("null")
// Gecko throws error for "data://"
// data: Gecko returns "", Blink returns "data://", WebKit returns "null"
// Gecko returns String("") for file: mailto:
// WebKit/Blink returns String("SCHEME://") for file: mailto:
switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"}return a=this.host,a?this._scheme+"://"+a:""}};
// Copy over the static methods
var r=a.URL;r&&(i.createObjectURL=function(a){
// IE extension allows a second optional options argument.
// http://msdn.microsoft.com/en-us/library/ie/hh772302(v=vs.85).aspx
return r.createObjectURL.apply(r,arguments)},i.revokeObjectURL=function(a){r.revokeObjectURL(a)}),a.URL=i}}(M),a.FONT_IDENTITY_MATRIX=N,a.IDENTITY_MATRIX=ia,a.OPS=W,a.VERBOSITY_LEVELS=V,a.UNSUPPORTED_FEATURES=Y,a.AnnotationBorderStyleType=S,a.AnnotationFlag=R,a.AnnotationType=Q,a.FontType=U,a.ImageKind=P,a.InvalidPDFException=aa,a.MessageHandler=K,a.MissingDataException=ea,a.MissingPDFException=ba,a.NotImplementedException=da,a.PageViewport=ka,a.PasswordException=$,a.PasswordResponses=Z,a.StatTimer=ma,a.StreamType=T,a.TextRenderingMode=O,a.UnexpectedResponseException=ca,a.UnknownErrorException=_,a.Util=ja,a.XRefParseException=fa,a.arrayByteLength=q,a.arraysToBytes=r,a.assert=i,a.bytesToString=o,a.createBlob=na,a.createPromiseCapability=J,a.createObjectURL=oa,a.deprecated=f,a.error=g,a.getLookupTableFactory=m,a.getVerbosityLevel=c,a.globalScope=M,a.info=d,a.isArray=H,a.isArrayBuffer=I,a.isBool=D,a.isEmptyObj=C,a.isInt=E,a.isNum=F,a.isString=G,a.isSameOrigin=j,a.isValidUrl=k,a.isLittleEndian=x,a.isEvalSupported=y,a.loadJpegStream=L,a.log2=t,a.readInt8=u,a.readUint16=v,a.readUint32=w,a.removeNullCharacters=n,a.setVerbosityLevel=b,a.shadow=l,a.string32=s,a.stringToBytes=p,a.stringToPDFString=z,a.stringToUTF8String=A,a.utf8StringToString=B,a.warn=e}),function(a,b){b(a.pdfjsDisplayDOMUtils={},a.pdfjsSharedUtil)}(this,function(a,b){function c(){var a=document.createElement("canvas");a.width=a.height=1;var b=a.getContext("2d"),c=b.createImageData(1,1);return"undefined"!=typeof c.data.buffer}/**
 * @typedef ExternalLinkParameters
 * @typedef {Object} ExternalLinkParameters
 * @property {string} url - An absolute URL.
 * @property {LinkTarget} target - The link target.
 * @property {string} rel - The link relationship.
 */
/**
 * Adds various attributes (href, title, target, rel) to hyperlinks.
 * @param {HTMLLinkElement} link - The link element.
 * @param {ExternalLinkParameters} params
 */
function d(a,b){var c=b&&b.url;if(a.href=a.title=c?h(c):"",c){var d=b.target;"undefined"==typeof d&&(d=f("externalLinkTarget")),a.target=l[d];var e=b.rel;"undefined"==typeof e&&(e=f("externalLinkRel")),a.rel=e}}
// Gets the file name from a given URL.
function e(a){var b=a.indexOf("#"),c=a.indexOf("?"),d=Math.min(b>0?b:a.length,c>0?c:a.length);return a.substring(a.lastIndexOf("/",d)+1,d)}function f(a){
// The list of the settings and their default is maintained for backward
// compatibility and shall not be extended or modified. See also global.js.
var c=b.globalScope.PDFJS;switch(a){case"pdfBug":return c?c.pdfBug:!1;case"disableAutoFetch":return c?c.disableAutoFetch:!1;case"disableStream":return c?c.disableStream:!1;case"disableRange":return c?c.disableRange:!1;case"disableFontFace":return c?c.disableFontFace:!1;case"disableCreateObjectURL":return c?c.disableCreateObjectURL:!1;case"disableWebGL":return c?c.disableWebGL:!0;case"cMapUrl":return c?c.cMapUrl:null;case"cMapPacked":return c?c.cMapPacked:!1;case"postMessageTransfers":return c?c.postMessageTransfers:!0;case"workerSrc":return c?c.workerSrc:null;case"disableWorker":return c?c.disableWorker:!1;case"maxImageSize":return c?c.maxImageSize:-1;case"imageResourcesPath":return c?c.imageResourcesPath:"";case"isEvalSupported":return c?c.isEvalSupported:!0;case"externalLinkTarget":if(!c)return k.NONE;switch(c.externalLinkTarget){case k.NONE:case k.SELF:case k.BLANK:case k.PARENT:case k.TOP:return c.externalLinkTarget}
// Reset the external link target, to suppress further warnings.
return i("PDFJS.externalLinkTarget is invalid: "+c.externalLinkTarget),c.externalLinkTarget=k.NONE,k.NONE;case"externalLinkRel":return c?c.externalLinkRel:"noreferrer";case"enableStats":return!(!c||!c.enableStats);default:throw new Error("Unknown default setting: "+a)}}function g(){var a=f("externalLinkTarget");switch(a){case k.NONE:return!1;case k.SELF:case k.BLANK:case k.PARENT:case k.TOP:return!0}}var h=b.removeNullCharacters,i=b.warn,j=function(){function a(){}
// As noted on: http://www.zachstronaut.com/posts/2009/02/17/
//              animate-css-transforms-firefox-webkit.html
// in some versions of IE9 it is critical that ms appear in this list
// before Moz
var b=["ms","Moz","Webkit","O"],c=Object.create(null);return a.getProp=function(a,d){
// check cache only when no element is given
if(1===arguments.length&&"string"==typeof c[a])return c[a];d=d||document.documentElement;var e,f,g=d.style;
// test standard property first
if("string"==typeof g[a])return c[a]=a;
// capitalize
f=a.charAt(0).toUpperCase()+a.slice(1);
// test vendor specific properties
for(var h=0,i=b.length;i>h;h++)if(e=b[h]+f,"string"==typeof g[e])return c[a]=e;
//if all fails then set to undefined
return c[a]="undefined"},a.setProp=function(a,b,c){var d=this.getProp(a);"undefined"!==d&&(b.style[d]=c)},a}(),k={NONE:0,// Default value.
SELF:1,BLANK:2,PARENT:3,TOP:4},l=["","_self","_blank","_parent","_top"];a.CustomStyle=j,a.addLinkAttributes=d,a.isExternalLinkTargetSet=g,a.getFilenameFromUrl=e,a.LinkTarget=k,a.hasCanvasTypedArrays=c,a.getDefaultSetting=f}),function(a,b){b(a.pdfjsDisplayFontLoader={},a.pdfjsSharedUtil)}(this,function(a,b){function c(a){this.docId=a,this.styleElement=null,this.nativeFontFaces=[],this.loadTestFontId=0,this.loadingContext={requests:[],nextRequestId:0}}var d=b.assert,e=b.bytesToString,f=b.string32,g=b.shadow,h=b.warn;c.prototype={insertRule:function(a){var b=this.styleElement;b||(b=this.styleElement=document.createElement("style"),b.id="PDFJS_FONT_STYLE_TAG_"+this.docId,document.documentElement.getElementsByTagName("head")[0].appendChild(b));var c=b.sheet;c.insertRule(a,c.cssRules.length)},clear:function(){var a=this.styleElement;a&&(a.parentNode.removeChild(a),a=this.styleElement=null),this.nativeFontFaces.forEach(function(a){document.fonts["delete"](a)}),this.nativeFontFaces.length=0},get loadTestFont(){
// This is a CFF font with 1 glyph for '.' that fills its entire width and
// height.
return g(this,"loadTestFont",atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA=="))},addNativeFontFace:function(a){this.nativeFontFaces.push(a),document.fonts.add(a)},bind:function(a,b){for(var d=[],e=[],f=[],g=function(a){
// Return a promise that is always fulfilled, even when the font fails to
// load.
return a.loaded["catch"](function(b){h('Failed to load font "'+a.family+'": '+b)})},i=0,j=a.length;j>i;i++){var k=a[i];
// Add the font to the DOM only once or skip if the font
// is already loaded.
if(!k.attached&&k.loading!==!1)if(k.attached=!0,c.isFontLoadingAPISupported){var l=k.createNativeFontFace();l&&(this.addNativeFontFace(l),f.push(g(l)))}else{var m=k.createFontFaceRule();m&&(this.insertRule(m),d.push(m),e.push(k))}}var n=this.queueLoadingCallback(b);c.isFontLoadingAPISupported?Promise.all(f).then(function(){n.complete()}):d.length>0&&!c.isSyncFontLoadingSupported?this.prepareFontLoadEvent(d,e,n):n.complete()},queueLoadingCallback:function(a){function b(){
// sending all completed requests in order how they were queued
for(d(!f.end,"completeRequest() cannot be called twice"),f.end=Date.now();c.requests.length>0&&c.requests[0].end;){var a=c.requests.shift();setTimeout(a.callback,0)}}var c=this.loadingContext,e="pdfjs-font-loading-"+c.nextRequestId++,f={id:e,complete:b,callback:a,started:Date.now()};return c.requests.push(f),f},prepareFontLoadEvent:function(a,b,c){/** Hack begin */
// There's currently no event when a font has finished downloading so the
// following code is a dirty hack to 'guess' when a font is
// ready. It's assumed fonts are loaded in order, so add a known test
// font after the desired fonts and then test for the loading of that
// test font.
function d(a,b){return a.charCodeAt(b)<<24|a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|255&a.charCodeAt(b+3)}function e(a,b,c,d){var e=a.substr(0,b),f=a.substr(b+c);return e+d+f}function g(a,b){
// With setTimeout clamping this gives the font ~100ms to load.
if(m++,m>30)return h("Load test font never loaded."),void b();l.font="30px "+a,l.fillText(".",0,20);var c=l.getImageData(0,0,1,1);return c.data[3]>0?void b():void setTimeout(g.bind(null,a,b))}var i,j,k=document.createElement("canvas");k.width=1,k.height=1;var l=k.getContext("2d"),m=0,n="lt"+Date.now()+this.loadTestFontId++,o=this.loadTestFont,p=976;// has to be on 4 byte boundary (for checksum)
o=e(o,p,n.length,n);
// CFF checksum is important for IE, adjusting it
var q=16,r=1482184792,s=d(o,q);for(i=0,j=n.length-3;j>i;i+=4)s=s-r+d(n,i)|0;i<n.length&&(// align to 4 bytes boundary
s=s-r+d(n+"XXX",i)|0),o=e(o,q,4,f(s));var t="url(data:font/opentype;base64,"+btoa(o)+");",u='@font-face { font-family:"'+n+'";src:'+t+"}";this.insertRule(u);var v=[];for(i=0,j=b.length;j>i;i++)v.push(b[i].loadedName);v.push(n);var w=document.createElement("div");for(w.setAttribute("style","visibility: hidden;width: 10px; height: 10px;position: absolute; top: 0px; left: 0px;"),i=0,j=v.length;j>i;++i){var x=document.createElement("span");x.textContent="Hi",x.style.fontFamily=v[i],w.appendChild(x)}document.body.appendChild(w),g(n,function(){document.body.removeChild(w),c.complete()})}},c.isFontLoadingAPISupported="undefined"!=typeof document&&!!document.fonts,Object.defineProperty(c,"isSyncFontLoadingSupported",{get:function(){if("undefined"==typeof navigator)
// node.js - we can pretend sync font loading is supported.
return g(c,"isSyncFontLoadingSupported",!0);var a=!1,b=/Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
// TODO other browsers
return b&&b[1]>=14&&(a=!0),g(c,"isSyncFontLoadingSupported",a)},enumerable:!0,configurable:!0});var i={get value(){return g(this,"value",b.isEvalSupported())}},j=function(){function a(a,b){this.compiledGlyphs=Object.create(null);
// importing translated data
for(var c in a)this[c]=a[c];this.options=b}return a.prototype={createNativeFontFace:function(){if(!this.data)return null;if(this.options.disableFontFace)return this.disableFontFace=!0,null;var a=new FontFace(this.loadedName,this.data,{});return this.options.fontRegistry&&this.options.fontRegistry.registerFont(this),a},createFontFaceRule:function(){if(!this.data)return null;if(this.options.disableFontFace)return this.disableFontFace=!0,null;var a=e(new Uint8Array(this.data)),b=this.loadedName,c="url(data:"+this.mimetype+";base64,"+btoa(a)+");",d='@font-face { font-family:"'+b+'";src:'+c+"}";return this.options.fontRegistry&&this.options.fontRegistry.registerFont(this,c),d},getPathGenerator:function(a,b){if(!(b in this.compiledGlyphs)){var c,d,e,f=a.get(this.loadedName+"_path_"+b);
// If we can, compile cmds into JS for MAXIMUM SPEED
if(this.options.isEvalSupported&&i.value){var g,h="";for(d=0,e=f.length;e>d;d++)c=f[d],g=void 0!==c.args?c.args.join(","):"",h+="c."+c.cmd+"("+g+");\n";/* jshint -W054 */
this.compiledGlyphs[b]=new Function("c","size",h)}else
// But fall back on using Function.prototype.apply() if we're
// blocked from using eval() for whatever reason (like CSP policies)
this.compiledGlyphs[b]=function(a,b){for(d=0,e=f.length;e>d;d++)c=f[d],"scale"===c.cmd&&(c.args=[b,-b]),a[c.cmd].apply(a,c.args)}}return this.compiledGlyphs[b]}},a}();a.FontFaceObject=j,a.FontLoader=c}),function(a,b){b(a.pdfjsDisplayMetadata={},a.pdfjsSharedUtil)}(this,function(a,b){function c(a){return a.replace(/>\\376\\377([^<]+)/g,function(a,b){for(var c=b.replace(/\\([0-3])([0-7])([0-7])/g,function(a,b,c,d){return String.fromCharCode(64*b+8*c+1*d)}),d="",e=0;e<c.length;e+=2){var f=256*c.charCodeAt(e)+c.charCodeAt(e+1);d+="&#x"+(65536+f).toString(16).substring(1)+";"}return">"+d})}function d(a){if("string"==typeof a){
// Ghostscript produces invalid metadata
a=c(a);var b=new DOMParser;a=b.parseFromString(a,"application/xml")}else a instanceof Document||e("Metadata: Invalid metadata object");this.metaDocument=a,this.metadata=Object.create(null),this.parse()}var e=b.error;d.prototype={parse:function(){var a=this.metaDocument,b=a.documentElement;if("rdf:rdf"!==b.nodeName.toLowerCase())for(// Wrapped in <xmpmeta>
b=b.firstChild;b&&"rdf:rdf"!==b.nodeName.toLowerCase();)b=b.nextSibling;var c=b?b.nodeName.toLowerCase():null;if(b&&"rdf:rdf"===c&&b.hasChildNodes()){var d,e,f,g,h,i,j,k=b.childNodes;for(g=0,i=k.length;i>g;g++)if(d=k[g],"rdf:description"===d.nodeName.toLowerCase())for(h=0,j=d.childNodes.length;j>h;h++)"#text"!==d.childNodes[h].nodeName.toLowerCase()&&(e=d.childNodes[h],f=e.nodeName.toLowerCase(),this.metadata[f]=e.textContent.trim())}},get:function(a){return this.metadata[a]||null},has:function(a){return"undefined"!=typeof this.metadata[a]}},a.Metadata=d}),function(a,b){b(a.pdfjsDisplaySVG={},a.pdfjsSharedUtil)}(this,function(a,b){var c=b.FONT_IDENTITY_MATRIX,d=b.IDENTITY_MATRIX,e=b.ImageKind,f=b.OPS,g=b.Util,h=b.isNum,i=b.isArray,j=b.warn,k=b.createObjectURL,l={fontStyle:"normal",fontWeight:"normal",fillColor:"#000000"},m=function(){function a(a,b,c){for(var d=-1,e=b;c>e;e++){var f=255&(d^a[e]),g=h[f];d=d>>>8^g}return-1^d}function b(b,c,d,e){var f=e,g=c.length;d[f]=g>>24&255,d[f+1]=g>>16&255,d[f+2]=g>>8&255,d[f+3]=255&g,f+=4,d[f]=255&b.charCodeAt(0),d[f+1]=255&b.charCodeAt(1),d[f+2]=255&b.charCodeAt(2),d[f+3]=255&b.charCodeAt(3),f+=4,d.set(c,f),f+=c.length;var h=a(d,e+4,f);d[f]=h>>24&255,d[f+1]=h>>16&255,d[f+2]=h>>8&255,d[f+3]=255&h}function c(a,b,c){for(var d=1,e=0,f=b;c>f;++f)d=(d+(255&a[f]))%65521,e=(e+d)%65521;return e<<16|d}function d(a,d,h){var i,j,l,m=a.width,n=a.height,o=a.data;switch(d){case e.GRAYSCALE_1BPP:j=0,i=1,l=m+7>>3;break;case e.RGB_24BPP:j=2,i=8,l=3*m;break;case e.RGBA_32BPP:j=6,i=8,l=4*m;break;default:throw new Error("invalid format")}
// prefix every row with predictor 0
var p,q,r=new Uint8Array((1+l)*n),s=0,t=0;for(p=0;n>p;++p)r[s++]=0,// no prediction
r.set(o.subarray(t,t+l),s),t+=l,s+=l;if(d===e.GRAYSCALE_1BPP)for(s=0,p=0;n>p;p++)// skipping predictor
for(s++,q=0;l>q;q++)r[s++]^=255;var u=new Uint8Array([m>>24&255,m>>16&255,m>>8&255,255&m,n>>24&255,n>>16&255,n>>8&255,255&n,i,// bit depth
j,// color type
0,// compression method
0,// filter method
0]),v=r.length,w=65535,x=Math.ceil(v/w),y=new Uint8Array(2+v+5*x+4),z=0;y[z++]=120,// compression method and flags
y[z++]=156;for(// flags
var A=0;v>w;)
// writing non-final DEFLATE blocks type 0 and length of 65535
y[z++]=0,y[z++]=255,y[z++]=255,y[z++]=0,y[z++]=0,y.set(r.subarray(A,A+w),z),z+=w,A+=w,v-=w;
// writing non-final DEFLATE blocks type 0
y[z++]=1,y[z++]=255&v,y[z++]=v>>8&255,y[z++]=65535&~v&255,y[z++]=(65535&~v)>>8&255,y.set(r.subarray(A),z),z+=r.length-A;var B=c(r,0,r.length);// checksum
y[z++]=B>>24&255,y[z++]=B>>16&255,y[z++]=B>>8&255,y[z++]=255&B;
// PNG will consists: header, IHDR+data, IDAT+data, and IEND.
var C=f.length+3*g+u.length+y.length,D=new Uint8Array(C),E=0;return D.set(f,E),E+=f.length,b("IHDR",u,D,E),E+=g+u.length,b("IDATA",y,D,E),E+=g+y.length,b("IEND",new Uint8Array(0),D,E),k(D,"image/png",h)}for(var f=new Uint8Array([137,80,78,71,13,10,26,10]),g=12,h=new Int32Array(256),i=0;256>i;i++){for(var j=i,l=0;8>l;l++)j=1&j?3988292384^j>>1&2147483647:j>>1&2147483647;h[i]=j}return function(a,b){var c=void 0===a.kind?e.GRAYSCALE_1BPP:a.kind;return d(a,c,b)}}(),n=function(){function a(){this.fontSizeScale=1,this.fontWeight=l.fontWeight,this.fontSize=0,this.textMatrix=d,this.fontMatrix=c,this.leading=0,
// Current point (in user coordinates)
this.x=0,this.y=0,
// Start of text line (in text coordinates)
this.lineX=0,this.lineY=0,
// Character and word spacing
this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRise=0,
// Default foreground and background colors
this.fillColor=l.fillColor,this.strokeColor="#000000",this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.lineJoin="",this.lineCap="",this.miterLimit=0,this.dashArray=[],this.dashPhase=0,this.dependencies=[],
// Clipping
this.clipId="",this.pendingClip=!1,this.maskId=""}return a.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(a,b){this.x=a,this.y=b}},a}(),o=function(){function a(a,b){var c="http://www.w3.org/2000/svg",d=document.createElementNS(c,"svg:svg");return d.setAttributeNS(null,"version","1.1"),d.setAttributeNS(null,"width",a+"px"),d.setAttributeNS(null,"height",b+"px"),d.setAttributeNS(null,"viewBox","0 0 "+a+" "+b),d}function b(a){for(var b=[],c=[],d=a.length,e=0;d>e;e++)"save"!==a[e].fn?"restore"===a[e].fn?b=c.pop():b.push(a[e]):(b.push({fnId:92,fn:"group",items:[]}),c.push(b),b=b[b.length-1].items);return b}/**
   * Formats float number.
   * @param value {number} number to format.
   * @returns {string}
   */
function e(a){if(a===(0|a))// integer number
return a.toString();var b=a.toFixed(10),c=b.length-1;if("0"!==b[c])return b;
// removing trailing zeros
do c--;while("0"===b[c]);return b.substr(0,"."===b[c]?c:c+1)}/**
   * Formats transform matrix. The standard rotation, scale and translate
   * matrices are replaced by their shorter forms, and for identity matrix
   * returns empty string to save the memory.
   * @param m {Array} matrix to format.
   * @returns {string}
   */
function o(a){if(0===a[4]&&0===a[5]){if(0===a[1]&&0===a[2])return 1===a[0]&&1===a[3]?"":"scale("+e(a[0])+" "+e(a[3])+")";if(a[0]===a[3]&&a[1]===-a[2]){var b=180*Math.acos(a[0])/Math.PI;return"rotate("+e(b)+")"}}else if(1===a[0]&&0===a[1]&&0===a[2]&&1===a[3])return"translate("+e(a[4])+" "+e(a[5])+")";return"matrix("+e(a[0])+" "+e(a[1])+" "+e(a[2])+" "+e(a[3])+" "+e(a[4])+" "+e(a[5])+")"}function p(a,b,c){this.current=new n,this.transformMatrix=d,// Graphics state matrix
this.transformStack=[],this.extraStack=[],this.commonObjs=a,this.objs=b,this.pendingEOFill=!1,this.embedFonts=!1,this.embeddedFonts=Object.create(null),this.cssStyle=null,this.forceDataSchema=!!c}var q="http://www.w3.org/2000/svg",r="http://www.w3.org/XML/1998/namespace",s="http://www.w3.org/1999/xlink",t=["butt","round","square"],u=["miter","round","bevel"],v=0,w=0;return p.prototype={save:function(){this.transformStack.push(this.transformMatrix);var a=this.current;this.extraStack.push(a),this.current=a.clone()},restore:function(){this.transformMatrix=this.transformStack.pop(),this.current=this.extraStack.pop(),this.tgrp=document.createElementNS(q,"svg:g"),this.tgrp.setAttributeNS(null,"transform",o(this.transformMatrix)),this.pgrp.appendChild(this.tgrp)},group:function(a){this.save(),this.executeOpTree(a),this.restore()},loadDependencies:function(a){for(var b=a.fnArray,c=b.length,d=a.argsArray,e=this,g=0;c>g;g++)if(f.dependency===b[g])for(var h=d[g],i=0,j=h.length;j>i;i++){var k,l=h[i],m="g_"===l.substring(0,2);k=m?new Promise(function(a){e.commonObjs.get(l,a)}):new Promise(function(a){e.objs.get(l,a)}),this.current.dependencies.push(k)}return Promise.all(this.current.dependencies)},transform:function(a,b,c,d,e,f){var h=[a,b,c,d,e,f];this.transformMatrix=g.transform(this.transformMatrix,h),this.tgrp=document.createElementNS(q,"svg:g"),this.tgrp.setAttributeNS(null,"transform",o(this.transformMatrix))},getSVG:function(b,c){return this.svg=a(c.width,c.height),this.viewport=c,this.loadDependencies(b).then(function(){this.transformMatrix=d,this.pgrp=document.createElementNS(q,"svg:g"),// Parent group
this.pgrp.setAttributeNS(null,"transform",o(c.transform)),this.tgrp=document.createElementNS(q,"svg:g"),// Transform group
this.tgrp.setAttributeNS(null,"transform",o(this.transformMatrix)),this.defs=document.createElementNS(q,"svg:defs"),this.pgrp.appendChild(this.defs),this.pgrp.appendChild(this.tgrp),this.svg.appendChild(this.pgrp);var a=this.convertOpList(b);return this.executeOpTree(a),this.svg}.bind(this))},convertOpList:function(a){var c=a.argsArray,d=a.fnArray,e=d.length,g=[],h=[];for(var i in f)g[f[i]]=i;for(var j=0;e>j;j++){var k=d[j];h.push({fnId:k,fn:g[k],args:c[j]})}return b(h)},executeOpTree:function(a){for(var b=a.length,c=0;b>c;c++){var d=a[c].fn,e=a[c].fnId,g=a[c].args;switch(0|e){case f.beginText:this.beginText();break;case f.setLeading:this.setLeading(g);break;case f.setLeadingMoveText:this.setLeadingMoveText(g[0],g[1]);break;case f.setFont:this.setFont(g);break;case f.showText:this.showText(g[0]);break;case f.showSpacedText:this.showText(g[0]);break;case f.endText:this.endText();break;case f.moveText:this.moveText(g[0],g[1]);break;case f.setCharSpacing:this.setCharSpacing(g[0]);break;case f.setWordSpacing:this.setWordSpacing(g[0]);break;case f.setHScale:this.setHScale(g[0]);break;case f.setTextMatrix:this.setTextMatrix(g[0],g[1],g[2],g[3],g[4],g[5]);break;case f.setLineWidth:this.setLineWidth(g[0]);break;case f.setLineJoin:this.setLineJoin(g[0]);break;case f.setLineCap:this.setLineCap(g[0]);break;case f.setMiterLimit:this.setMiterLimit(g[0]);break;case f.setFillRGBColor:this.setFillRGBColor(g[0],g[1],g[2]);break;case f.setStrokeRGBColor:this.setStrokeRGBColor(g[0],g[1],g[2]);break;case f.setDash:this.setDash(g[0],g[1]);break;case f.setGState:this.setGState(g[0]);break;case f.fill:this.fill();break;case f.eoFill:this.eoFill();break;case f.stroke:this.stroke();break;case f.fillStroke:this.fillStroke();break;case f.eoFillStroke:this.eoFillStroke();break;case f.clip:this.clip("nonzero");break;case f.eoClip:this.clip("evenodd");break;case f.paintSolidColorImageMask:this.paintSolidColorImageMask();break;case f.paintJpegXObject:this.paintJpegXObject(g[0],g[1],g[2]);break;case f.paintImageXObject:this.paintImageXObject(g[0]);break;case f.paintInlineImageXObject:this.paintInlineImageXObject(g[0]);break;case f.paintImageMaskXObject:this.paintImageMaskXObject(g[0]);break;case f.paintFormXObjectBegin:this.paintFormXObjectBegin(g[0],g[1]);break;case f.paintFormXObjectEnd:this.paintFormXObjectEnd();break;case f.closePath:this.closePath();break;case f.closeStroke:this.closeStroke();break;case f.closeFillStroke:this.closeFillStroke();break;case f.nextLine:this.nextLine();break;case f.transform:this.transform(g[0],g[1],g[2],g[3],g[4],g[5]);break;case f.constructPath:this.constructPath(g[0],g[1]);break;case f.endPath:this.endPath();break;case 92:this.group(a[c].items);break;default:j("Unimplemented method "+d)}}},setWordSpacing:function(a){this.current.wordSpacing=a},setCharSpacing:function(a){this.current.charSpacing=a},nextLine:function(){this.moveText(0,this.current.leading)},setTextMatrix:function(a,b,c,d,f,g){var h=this.current;this.current.textMatrix=this.current.lineMatrix=[a,b,c,d,f,g],this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0,h.xcoords=[],h.tspan=document.createElementNS(q,"svg:tspan"),h.tspan.setAttributeNS(null,"font-family",h.fontFamily),h.tspan.setAttributeNS(null,"font-size",e(h.fontSize)+"px"),h.tspan.setAttributeNS(null,"y",e(-h.y)),h.txtElement=document.createElementNS(q,"svg:text"),h.txtElement.appendChild(h.tspan)},beginText:function(){this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0,this.current.textMatrix=d,this.current.lineMatrix=d,this.current.tspan=document.createElementNS(q,"svg:tspan"),this.current.txtElement=document.createElementNS(q,"svg:text"),this.current.txtgrp=document.createElementNS(q,"svg:g"),this.current.xcoords=[]},moveText:function(a,b){var c=this.current;this.current.x=this.current.lineX+=a,this.current.y=this.current.lineY+=b,c.xcoords=[],c.tspan=document.createElementNS(q,"svg:tspan"),c.tspan.setAttributeNS(null,"font-family",c.fontFamily),c.tspan.setAttributeNS(null,"font-size",e(c.fontSize)+"px"),c.tspan.setAttributeNS(null,"y",e(-c.y))},showText:function(a){var b=this.current,c=b.font,d=b.fontSize;if(0!==d){var f,g=b.charSpacing,i=b.wordSpacing,j=b.fontDirection,k=b.textHScale*j,m=a.length,n=c.vertical,p=d*b.fontMatrix[0],q=0;for(f=0;m>f;++f){var s=a[f];if(null!==s)if(h(s))q+=-s*d*.001;else{b.xcoords.push(b.x+q*k);var t=s.width,u=s.fontChar,v=t*p+g*j;q+=v,b.tspan.textContent+=u}else
// word break
q+=j*i}n?b.y-=q*k:b.x+=q*k,b.tspan.setAttributeNS(null,"x",b.xcoords.map(e).join(" ")),b.tspan.setAttributeNS(null,"y",e(-b.y)),b.tspan.setAttributeNS(null,"font-family",b.fontFamily),b.tspan.setAttributeNS(null,"font-size",e(b.fontSize)+"px"),b.fontStyle!==l.fontStyle&&b.tspan.setAttributeNS(null,"font-style",b.fontStyle),b.fontWeight!==l.fontWeight&&b.tspan.setAttributeNS(null,"font-weight",b.fontWeight),b.fillColor!==l.fillColor&&b.tspan.setAttributeNS(null,"fill",b.fillColor),b.txtElement.setAttributeNS(null,"transform",o(b.textMatrix)+" scale(1, -1)"),b.txtElement.setAttributeNS(r,"xml:space","preserve"),b.txtElement.appendChild(b.tspan),b.txtgrp.appendChild(b.txtElement),this.tgrp.appendChild(b.txtElement)}},setLeadingMoveText:function(a,b){this.setLeading(-b),this.moveText(a,b)},addFontStyle:function(a){this.cssStyle||(this.cssStyle=document.createElementNS(q,"svg:style"),this.cssStyle.setAttributeNS(null,"type","text/css"),this.defs.appendChild(this.cssStyle));var b=k(a.data,a.mimetype,this.forceDataSchema);this.cssStyle.textContent+='@font-face { font-family: "'+a.loadedName+'"; src: url('+b+"); }\n"},setFont:function(a){var b=this.current,d=this.commonObjs.get(a[0]),f=a[1];this.current.font=d,this.embedFonts&&d.data&&!this.embeddedFonts[d.loadedName]&&(this.addFontStyle(d),this.embeddedFonts[d.loadedName]=d),b.fontMatrix=d.fontMatrix?d.fontMatrix:c;var g=d.black?d.bold?"bolder":"bold":d.bold?"bold":"normal",h=d.italic?"italic":"normal";0>f?(f=-f,b.fontDirection=-1):b.fontDirection=1,b.fontSize=f,b.fontFamily=d.loadedName,b.fontWeight=g,b.fontStyle=h,b.tspan=document.createElementNS(q,"svg:tspan"),b.tspan.setAttributeNS(null,"y",e(-b.y)),b.xcoords=[]},endText:function(){this.current.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp),this.tgrp=document.createElementNS(q,"svg:g"),this.tgrp.setAttributeNS(null,"transform",o(this.transformMatrix))},
// Path properties
setLineWidth:function(a){this.current.lineWidth=a},setLineCap:function(a){this.current.lineCap=t[a]},setLineJoin:function(a){this.current.lineJoin=u[a]},setMiterLimit:function(a){this.current.miterLimit=a},setStrokeRGBColor:function(a,b,c){var d=g.makeCssRgb(a,b,c);this.current.strokeColor=d},setFillRGBColor:function(a,b,c){var d=g.makeCssRgb(a,b,c);this.current.fillColor=d,this.current.tspan=document.createElementNS(q,"svg:tspan"),this.current.xcoords=[]},setDash:function(a,b){this.current.dashArray=a,this.current.dashPhase=b},constructPath:function(a,b){var c=this.current,d=c.x,g=c.y;c.path=document.createElementNS(q,"svg:path");for(var h=[],i=a.length,j=0,k=0;i>j;j++)switch(0|a[j]){case f.rectangle:d=b[k++],g=b[k++];var l=b[k++],m=b[k++],n=d+l,o=g+m;h.push("M",e(d),e(g),"L",e(n),e(g),"L",e(n),e(o),"L",e(d),e(o),"Z");break;case f.moveTo:d=b[k++],g=b[k++],h.push("M",e(d),e(g));break;case f.lineTo:d=b[k++],g=b[k++],h.push("L",e(d),e(g));break;case f.curveTo:d=b[k+4],g=b[k+5],h.push("C",e(b[k]),e(b[k+1]),e(b[k+2]),e(b[k+3]),e(d),e(g)),k+=6;break;case f.curveTo2:d=b[k+2],g=b[k+3],h.push("C",e(d),e(g),e(b[k]),e(b[k+1]),e(b[k+2]),e(b[k+3])),k+=4;break;case f.curveTo3:d=b[k+2],g=b[k+3],h.push("C",e(b[k]),e(b[k+1]),e(d),e(g),e(d),e(g)),k+=4;break;case f.closePath:h.push("Z")}c.path.setAttributeNS(null,"d",h.join(" ")),c.path.setAttributeNS(null,"stroke-miterlimit",e(c.miterLimit)),c.path.setAttributeNS(null,"stroke-linecap",c.lineCap),c.path.setAttributeNS(null,"stroke-linejoin",c.lineJoin),c.path.setAttributeNS(null,"stroke-width",e(c.lineWidth)+"px"),c.path.setAttributeNS(null,"stroke-dasharray",c.dashArray.map(e).join(" ")),c.path.setAttributeNS(null,"stroke-dashoffset",e(c.dashPhase)+"px"),c.path.setAttributeNS(null,"fill","none"),this.tgrp.appendChild(c.path),c.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp),
// Saving a reference in current.element so that it can be addressed
// in 'fill' and 'stroke'
c.element=c.path,c.setCurrentPoint(d,g)},endPath:function(){var a=this.current;a.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp),this.tgrp=document.createElementNS(q,"svg:g"),this.tgrp.setAttributeNS(null,"transform",o(this.transformMatrix))},clip:function(a){var b=this.current;
// Add current path to clipping path
b.clipId="clippath"+v,v++,this.clippath=document.createElementNS(q,"svg:clipPath"),this.clippath.setAttributeNS(null,"id",b.clipId);var c=b.element.cloneNode();"evenodd"===a?c.setAttributeNS(null,"clip-rule","evenodd"):c.setAttributeNS(null,"clip-rule","nonzero"),this.clippath.setAttributeNS(null,"transform",o(this.transformMatrix)),this.clippath.appendChild(c),this.defs.appendChild(this.clippath),
// Create a new group with that attribute
b.pendingClip=!0,this.cgrp=document.createElementNS(q,"svg:g"),this.cgrp.setAttributeNS(null,"clip-path","url(#"+b.clipId+")"),this.pgrp.appendChild(this.cgrp)},closePath:function(){var a=this.current,b=a.path.getAttributeNS(null,"d");b+="Z",a.path.setAttributeNS(null,"d",b)},setLeading:function(a){this.current.leading=-a},setTextRise:function(a){this.current.textRise=a},setHScale:function(a){this.current.textHScale=a/100},setGState:function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b],e=d[0],f=d[1];switch(e){case"LW":this.setLineWidth(f);break;case"LC":this.setLineCap(f);break;case"LJ":this.setLineJoin(f);break;case"ML":this.setMiterLimit(f);break;case"D":this.setDash(f[0],f[1]);break;case"RI":break;case"FL":break;case"Font":this.setFont(f);break;case"CA":break;case"ca":break;case"BM":break;case"SMask":}}},fill:function(){var a=this.current;a.element.setAttributeNS(null,"fill",a.fillColor)},stroke:function(){var a=this.current;a.element.setAttributeNS(null,"stroke",a.strokeColor),a.element.setAttributeNS(null,"fill","none")},eoFill:function(){var a=this.current;a.element.setAttributeNS(null,"fill",a.fillColor),a.element.setAttributeNS(null,"fill-rule","evenodd")},fillStroke:function(){
// Order is important since stroke wants fill to be none.
// First stroke, then if fill needed, it will be overwritten.
this.stroke(),this.fill()},eoFillStroke:function(){this.current.element.setAttributeNS(null,"fill-rule","evenodd"),this.fillStroke()},closeStroke:function(){this.closePath(),this.stroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},paintSolidColorImageMask:function(){var a=this.current,b=document.createElementNS(q,"svg:rect");b.setAttributeNS(null,"x","0"),b.setAttributeNS(null,"y","0"),b.setAttributeNS(null,"width","1px"),b.setAttributeNS(null,"height","1px"),b.setAttributeNS(null,"fill",a.fillColor),this.tgrp.appendChild(b)},paintJpegXObject:function(a,b,c){var d=this.current,f=this.objs.get(a),g=document.createElementNS(q,"svg:image");g.setAttributeNS(s,"xlink:href",f.src),g.setAttributeNS(null,"width",f.width+"px"),g.setAttributeNS(null,"height",f.height+"px"),g.setAttributeNS(null,"x","0"),g.setAttributeNS(null,"y",e(-c)),g.setAttributeNS(null,"transform","scale("+e(1/b)+" "+e(-1/c)+")"),this.tgrp.appendChild(g),d.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp)},paintImageXObject:function(a){var b=this.objs.get(a);return b?void this.paintInlineImageXObject(b):void j("Dependent image isn't ready yet")},paintInlineImageXObject:function(a,b){var c=this.current,d=a.width,f=a.height,g=m(a,this.forceDataSchema),h=document.createElementNS(q,"svg:rect");h.setAttributeNS(null,"x","0"),h.setAttributeNS(null,"y","0"),h.setAttributeNS(null,"width",e(d)),h.setAttributeNS(null,"height",e(f)),c.element=h,this.clip("nonzero");var i=document.createElementNS(q,"svg:image");i.setAttributeNS(s,"xlink:href",g),i.setAttributeNS(null,"x","0"),i.setAttributeNS(null,"y",e(-f)),i.setAttributeNS(null,"width",e(d)+"px"),i.setAttributeNS(null,"height",e(f)+"px"),i.setAttributeNS(null,"transform","scale("+e(1/d)+" "+e(-1/f)+")"),b?b.appendChild(i):this.tgrp.appendChild(i),c.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp)},paintImageMaskXObject:function(a){var b=this.current,c=a.width,d=a.height,f=b.fillColor;b.maskId="mask"+w++;var g=document.createElementNS(q,"svg:mask");g.setAttributeNS(null,"id",b.maskId);var h=document.createElementNS(q,"svg:rect");h.setAttributeNS(null,"x","0"),h.setAttributeNS(null,"y","0"),h.setAttributeNS(null,"width",e(c)),h.setAttributeNS(null,"height",e(d)),h.setAttributeNS(null,"fill",f),h.setAttributeNS(null,"mask","url(#"+b.maskId+")"),this.defs.appendChild(g),this.tgrp.appendChild(h),this.paintInlineImageXObject(a,g)},paintFormXObjectBegin:function(a,b){if(this.save(),i(a)&&6===a.length&&this.transform(a[0],a[1],a[2],a[3],a[4],a[5]),i(b)&&4===b.length){var c=b[2]-b[0],d=b[3]-b[1],f=document.createElementNS(q,"svg:rect");f.setAttributeNS(null,"x",b[0]),f.setAttributeNS(null,"y",b[1]),f.setAttributeNS(null,"width",e(c)),f.setAttributeNS(null,"height",e(d)),this.current.element=f,this.clip("nonzero"),this.endPath()}},paintFormXObjectEnd:function(){this.restore()}},p}();a.SVGGraphics=o}),function(a,b){b(a.pdfjsDisplayAnnotationLayer={},a.pdfjsSharedUtil,a.pdfjsDisplayDOMUtils)}(this,function(a,b,c){/**
 * @typedef {Object} AnnotationElementParameters
 * @property {Object} data
 * @property {HTMLDivElement} layer
 * @property {PDFPage} page
 * @property {PageViewport} viewport
 * @property {IPDFLinkService} linkService
 * @property {DownloadManager} downloadManager
 */
/**
 * @class
 * @alias AnnotationElementFactory
 */
function d(){}var e=b.AnnotationBorderStyleType,f=b.AnnotationType,g=b.Util,h=c.addLinkAttributes,i=c.LinkTarget,j=c.getFilenameFromUrl,k=b.warn,l=c.CustomStyle,m=c.getDefaultSetting;d.prototype=/** @lends AnnotationElementFactory.prototype */
{/**
   * @param {AnnotationElementParameters} parameters
   * @returns {AnnotationElement}
   */
create:function(a){var b=a.data.annotationType;switch(b){case f.LINK:return new o(a);case f.TEXT:return new p(a);case f.WIDGET:return new q(a);case f.POPUP:return new r(a);case f.HIGHLIGHT:return new t(a);case f.UNDERLINE:return new u(a);case f.SQUIGGLY:return new v(a);case f.STRIKEOUT:return new w(a);case f.FILEATTACHMENT:return new x(a);default:return new n(a)}}};/**
 * @class
 * @alias AnnotationElement
 */
var n=function(){function a(a,b){this.isRenderable=b||!1,this.data=a.data,this.layer=a.layer,this.page=a.page,this.viewport=a.viewport,this.linkService=a.linkService,this.downloadManager=a.downloadManager,this.imageResourcesPath=a.imageResourcesPath,b&&(this.container=this._createContainer())}/** @lends AnnotationElement.prototype */
return a.prototype={/**
     * Create an empty container for the annotation's HTML element.
     *
     * @private
     * @memberof AnnotationElement
     * @returns {HTMLSectionElement}
     */
_createContainer:function(){var a=this.data,b=this.page,c=this.viewport,d=document.createElement("section"),f=a.rect[2]-a.rect[0],h=a.rect[3]-a.rect[1];d.setAttribute("data-annotation-id",a.id);
// Do *not* modify `data.rect`, since that will corrupt the annotation
// position on subsequent calls to `_createContainer` (see issue 6804).
var i=g.normalizeRect([a.rect[0],b.view[3]-a.rect[1]+b.view[1],a.rect[2],b.view[3]-a.rect[3]+b.view[1]]);if(l.setProp("transform",d,"matrix("+c.transform.join(",")+")"),l.setProp("transformOrigin",d,-i[0]+"px "+-i[1]+"px"),a.borderStyle.width>0){d.style.borderWidth=a.borderStyle.width+"px",a.borderStyle.style!==e.UNDERLINE&&(f-=2*a.borderStyle.width,h-=2*a.borderStyle.width);var j=a.borderStyle.horizontalCornerRadius,m=a.borderStyle.verticalCornerRadius;if(j>0||m>0){var n=j+"px / "+m+"px";l.setProp("borderRadius",d,n)}switch(a.borderStyle.style){case e.SOLID:d.style.borderStyle="solid";break;case e.DASHED:d.style.borderStyle="dashed";break;case e.BEVELED:k("Unimplemented border style: beveled");break;case e.INSET:k("Unimplemented border style: inset");break;case e.UNDERLINE:d.style.borderBottomStyle="solid"}a.color?d.style.borderColor=g.makeCssRgb(0|a.color[0],0|a.color[1],0|a.color[2]):d.style.borderWidth=0}return d.style.left=i[0]+"px",d.style.top=i[1]+"px",d.style.width=f+"px",d.style.height=h+"px",d},/**
     * Create a popup for the annotation's HTML element. This is used for
     * annotations that do not have a Popup entry in the dictionary, but
     * are of a type that works with popups (such as Highlight annotations).
     *
     * @private
     * @param {HTMLSectionElement} container
     * @param {HTMLDivElement|HTMLImageElement|null} trigger
     * @param {Object} data
     * @memberof AnnotationElement
     */
_createPopup:function(a,b,c){
// If no trigger element is specified, create it.
b||(b=document.createElement("div"),b.style.height=a.style.height,b.style.width=a.style.width,a.appendChild(b));var d=new s({container:a,trigger:b,color:c.color,title:c.title,contents:c.contents,hideWrapper:!0}),e=d.render();
// Position the popup next to the annotation's container.
e.style.left=a.style.width,a.appendChild(e)},/**
     * Render the annotation's HTML element in the empty container.
     *
     * @public
     * @memberof AnnotationElement
     */
render:function(){throw new Error("Abstract method AnnotationElement.render called")}},a}(),o=function(){function a(a){n.call(this,a,!0)}return g.inherit(a,n,{/**
     * Render the link annotation's HTML element in the empty container.
     *
     * @public
     * @memberof LinkAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){this.container.className="linkAnnotation";var a=document.createElement("a");return h(a,{url:this.data.url,target:this.data.newWindow?i.BLANK:void 0}),this.data.url?"GoToR"===this.data.type&&(this.container.className+=" ghsts-link-container",this._bindGhstsGoToRLink(a,this.data.url)):this.data.action?this._bindNamedAction(a,this.data.action):this.data.ghsts?(this.container.className+=" ghsts-link-container",this._bindGhstsLink(a,this.data.ghsts)):this._bindLink(a,this.data.dest||null),this.container.appendChild(a),this.container},/**
     * Bind internal links to the link element.
     *
     * @private
     * @param {Object} link
     * @param {Object} destination
     * @memberof LinkAnnotationElement
     */
_bindLink:function(a,b){var c=this;a.href=this.linkService.getDestinationHash(b),a.onclick=function(){return b&&c.linkService.navigateTo(b),!1},b&&(a.className="internalLink")},/**
     * Bind internal links to a GHSTS document.
     *
     * @private
     * @param {Object} link
     * @param {Object} ghsts
     * @memberof LinkAnnotationElement
     */
_bindGhstsLink:function(a,b){a.href=b,a.onclick=function(){return window.GhstsLinker&&window.GhstsLinker.openLink(b),!1},a.className="internalLink ghsts-link",window.GhstsLinker&&!window.GhstsLinker.getLinkedDocument(b)&&(a.className+=" ghsts-link-unavailable")},/**
     * Bind internal links to a GHSTS document for GoToR actions.
     *
     * @private
     * @param {Object} link
     * @param {Object} url
     * @memberof LinkAnnotationElement
     */
_bindGhstsGoToRLink:function(a,b){a.href="ghsts://"+b,a.onclick=function(){return window.GhstsLinker&&window.GhstsLinker.openGoToRLink(b),!1},a.className="internalLink ghsts-link",window.GhstsLinker&&!window.GhstsLinker.getLinkedGoToRDocument(b)&&(a.className+=" ghsts-link-unavailable")},/**
     * Bind named actions to the link element.
     *
     * @private
     * @param {Object} link
     * @param {Object} action
     * @memberof LinkAnnotationElement
     */
_bindNamedAction:function(a,b){var c=this;a.href=this.linkService.getAnchorUrl(""),a.onclick=function(){return c.linkService.executeNamedAction(b),!1},a.className="internalLink"}}),a}(),p=function(){function a(a){var b=!!(a.data.hasPopup||a.data.title||a.data.contents);n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the text annotation's HTML element in the empty container.
     *
     * @public
     * @memberof TextAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){this.container.className="textAnnotation";var a=document.createElement("img");return a.style.height=this.container.style.height,a.style.width=this.container.style.width,a.src=this.imageResourcesPath+"annotation-"+this.data.name.toLowerCase()+".svg",a.alt="[{{type}} Annotation]",a.dataset.l10nId="text_annotation_type",a.dataset.l10nArgs=JSON.stringify({type:this.data.name}),this.data.hasPopup||this._createPopup(this.container,a,this.data),this.container.appendChild(a),this.container}}),a}(),q=function(){function a(a){var b=!a.data.hasAppearance&&!!a.data.fieldValue;n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the widget annotation's HTML element in the empty container.
     *
     * @public
     * @memberof WidgetAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){var a=document.createElement("div");a.textContent=this.data.fieldValue;var b=this.data.textAlignment;a.style.textAlign=["left","center","right"][b],a.style.verticalAlign="middle",a.style.display="table-cell";var c=this.data.fontRefName?this.page.commonObjs.getData(this.data.fontRefName):null;return this._setTextStyle(a,c),this.container.appendChild(a),this.container},/**
     * Apply text styles to the text in the element.
     *
     * @private
     * @param {HTMLDivElement} element
     * @param {Object} font
     * @memberof WidgetAnnotationElement
     */
_setTextStyle:function(a,b){
// TODO: This duplicates some of the logic in CanvasGraphics.setFont().
var c=a.style;if(c.fontSize=this.data.fontSize+"px",c.direction=this.data.fontDirection<0?"rtl":"ltr",b){c.fontWeight=b.black?b.bold?"900":"bold":b.bold?"bold":"normal",c.fontStyle=b.italic?"italic":"normal";
// Use a reasonable default font if the font doesn't specify a fallback.
var d=b.loadedName?'"'+b.loadedName+'", ':"",e=b.fallbackName||"Helvetica, sans-serif";c.fontFamily=d+e}}}),a}(),r=function(){function a(a){var b=!(!a.data.title&&!a.data.contents);n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the popup annotation's HTML element in the empty container.
     *
     * @public
     * @memberof PopupAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){this.container.className="popupAnnotation";var a='[data-annotation-id="'+this.data.parentId+'"]',b=this.layer.querySelector(a);if(!b)return this.container;var c=new s({container:this.container,trigger:b,color:this.data.color,title:this.data.title,contents:this.data.contents}),d=parseFloat(b.style.left),e=parseFloat(b.style.width);return l.setProp("transformOrigin",this.container,-(d+e)+"px -"+b.style.top),this.container.style.left=d+e+"px",this.container.appendChild(c.render()),this.container}}),a}(),s=function(){function a(a){this.container=a.container,this.trigger=a.trigger,this.color=a.color,this.title=a.title,this.contents=a.contents,this.hideWrapper=a.hideWrapper||!1,this.pinned=!1}var b=.7;/** @lends PopupElement.prototype */
return a.prototype={/**
     * Render the popup's HTML element.
     *
     * @public
     * @memberof PopupElement
     * @returns {HTMLSectionElement}
     */
render:function(){var a=document.createElement("div");a.className="popupWrapper",
// For Popup annotations we hide the entire section because it contains
// only the popup. However, for Text annotations without a separate Popup
// annotation, we cannot hide the entire container as the image would
// disappear too. In that special case, hiding the wrapper suffices.
this.hideElement=this.hideWrapper?a:this.container,this.hideElement.setAttribute("hidden",!0);var c=document.createElement("div");c.className="popup";var d=this.color;if(d){
// Enlighten the color.
var e=b*(255-d[0])+d[0],f=b*(255-d[1])+d[1],h=b*(255-d[2])+d[2];c.style.backgroundColor=g.makeCssRgb(0|e,0|f,0|h)}var i=this._formatContents(this.contents),j=document.createElement("h1");
// Attach the event listeners to the trigger element.
return j.textContent=this.title,this.trigger.addEventListener("click",this._toggle.bind(this)),this.trigger.addEventListener("mouseover",this._show.bind(this,!1)),this.trigger.addEventListener("mouseout",this._hide.bind(this,!1)),c.addEventListener("click",this._hide.bind(this,!0)),c.appendChild(j),c.appendChild(i),a.appendChild(c),a},/**
     * Format the contents of the popup by adding newlines where necessary.
     *
     * @private
     * @param {string} contents
     * @memberof PopupElement
     * @returns {HTMLParagraphElement}
     */
_formatContents:function(a){for(var b=document.createElement("p"),c=a.split(/(?:\r\n?|\n)/),d=0,e=c.length;e>d;++d){var f=c[d];b.appendChild(document.createTextNode(f)),e-1>d&&b.appendChild(document.createElement("br"))}return b},/**
     * Toggle the visibility of the popup.
     *
     * @private
     * @memberof PopupElement
     */
_toggle:function(){this.pinned?this._hide(!0):this._show(!0)},/**
     * Show the popup.
     *
     * @private
     * @param {boolean} pin
     * @memberof PopupElement
     */
_show:function(a){a&&(this.pinned=!0),this.hideElement.hasAttribute("hidden")&&(this.hideElement.removeAttribute("hidden"),this.container.style.zIndex+=1)},/**
     * Hide the popup.
     *
     * @private
     * @param {boolean} unpin
     * @memberof PopupElement
     */
_hide:function(a){a&&(this.pinned=!1),this.hideElement.hasAttribute("hidden")||this.pinned||(this.hideElement.setAttribute("hidden",!0),this.container.style.zIndex-=1)}},a}(),t=function(){function a(a){var b=!!(a.data.hasPopup||a.data.title||a.data.contents);n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the highlight annotation's HTML element in the empty container.
     *
     * @public
     * @memberof HighlightAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){return this.container.className="highlightAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}),a}(),u=function(){function a(a){var b=!!(a.data.hasPopup||a.data.title||a.data.contents);n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the underline annotation's HTML element in the empty container.
     *
     * @public
     * @memberof UnderlineAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){return this.container.className="underlineAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}),a}(),v=function(){function a(a){var b=!!(a.data.hasPopup||a.data.title||a.data.contents);n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the squiggly annotation's HTML element in the empty container.
     *
     * @public
     * @memberof SquigglyAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){return this.container.className="squigglyAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}),a}(),w=function(){function a(a){var b=!!(a.data.hasPopup||a.data.title||a.data.contents);n.call(this,a,b)}return g.inherit(a,n,{/**
     * Render the strikeout annotation's HTML element in the empty container.
     *
     * @public
     * @memberof StrikeOutAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){return this.container.className="strikeoutAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}),a}(),x=function(){function a(a){n.call(this,a,!0),this.filename=j(a.data.file.filename),this.content=a.data.file.content}return g.inherit(a,n,{/**
     * Render the file attachment annotation's HTML element in the empty
     * container.
     *
     * @public
     * @memberof FileAttachmentAnnotationElement
     * @returns {HTMLSectionElement}
     */
render:function(){this.container.className="fileAttachmentAnnotation";var a=document.createElement("div");return a.style.height=this.container.style.height,a.style.width=this.container.style.width,a.addEventListener("dblclick",this._download.bind(this)),this.data.hasPopup||!this.data.title&&!this.data.contents||this._createPopup(this.container,a,this.data),this.container.appendChild(a),this.container},/**
     * Download the file attachment associated with this annotation.
     *
     * @private
     * @memberof FileAttachmentAnnotationElement
     */
_download:function(){return this.downloadManager?void this.downloadManager.downloadData(this.content,this.filename,""):void k("Download cannot be started due to unavailable download manager")}}),a}(),y=function(){return{/**
     * Render a new annotation layer with all annotation elements.
     *
     * @public
     * @param {AnnotationLayerParameters} parameters
     * @memberof AnnotationLayer
     */
render:function(a){for(var b=new d,c=0,e=a.annotations.length;e>c;c++){var f=a.annotations[c];if(f){var g={data:f,layer:a.div,page:a.page,viewport:a.viewport,linkService:a.linkService,downloadManager:a.downloadManager,imageResourcesPath:a.imageResourcesPath||m("imageResourcesPath")},h=b.create(g);h.isRenderable&&a.div.appendChild(h.render())}}},/**
     * Update the annotation elements on existing annotation layer.
     *
     * @public
     * @param {AnnotationLayerParameters} parameters
     * @memberof AnnotationLayer
     */
update:function(a){for(var b=0,c=a.annotations.length;c>b;b++){var d=a.annotations[b],e=a.div.querySelector('[data-annotation-id="'+d.id+'"]');e&&l.setProp("transform",e,"matrix("+a.viewport.transform.join(",")+")")}a.div.removeAttribute("hidden")}}}();a.AnnotationLayer=y}),function(a,b){b(a.pdfjsDisplayTextLayer={},a.pdfjsSharedUtil,a.pdfjsDisplayDOMUtils)}(this,function(a,b,c){var d=b.Util,e=b.createPromiseCapability,f=c.CustomStyle,g=c.getDefaultSetting,h=(b.PageViewport,function(){function a(a){return!k.test(a)}function b(b,c,e,f){var h=f[e.fontName],i=document.createElement("div");if(b.push(i),a(e.str))return void(i.dataset.isWhitespace=!0);var j=d.transform(c.transform,e.transform),k=Math.atan2(j[1],j[0]);h.vertical&&(k+=Math.PI/2);var l=Math.sqrt(j[2]*j[2]+j[3]*j[3]),m=l;h.ascent?m=h.ascent*m:h.descent&&(m=(1+h.descent)*m);var n,o;0===k?(n=j[4],o=j[5]-m):(n=j[4]+m*Math.sin(k),o=j[5]-m*Math.cos(k)),i.style.left=n+"px",i.style.top=o+"px",i.style.fontSize=l+"px",i.style.fontFamily=h.fontFamily,i.textContent=e.str,
// |fontName| is only used by the Font Inspector. This test will succeed
// when e.g. the Font Inspector is off but the Stepper is on, but it's
// not worth the effort to do a more accurate test.
g("pdfBug")&&(i.dataset.fontName=e.fontName),
// Storing into dataset will convert number into string.
0!==k&&(i.dataset.angle=k*(180/Math.PI)),
// We don't bother scaling single-char text divs, because it has very
// little effect on text highlighting. This makes scrolling on docs with
// lots of such divs a lot faster.
e.str.length>1&&(h.vertical?i.dataset.canvasWidth=e.height*c.scale:i.dataset.canvasWidth=e.width*c.scale)}function c(a){if(!a._canceled){var b=a._container,c=a._textDivs,d=a._capability,e=c.length;
// No point in rendering many divs as it would make the browser
// unusable even after the divs are rendered.
if(e>j)return void d.resolve();var g=document.createElement("canvas");g.mozOpaque=!0;for(var h,i,k=g.getContext("2d",{alpha:!1}),l=0;e>l;l++){var m=c[l];if(void 0===m.dataset.isWhitespace){var n=m.style.fontSize,o=m.style.fontFamily;
// Only build font string and set to context if different from last.
n===h&&o===i||(k.font=n+" "+o,h=n,i=o);var p=k.measureText(m.textContent).width;b.appendChild(m);var q;if(void 0!==m.dataset.canvasWidth&&p>0){
// Dataset values come of type string.
var r=m.dataset.canvasWidth/p;q="scaleX("+r+")"}else q="";var s=m.dataset.angle;s&&(q="rotate("+s+"deg) "+q),q&&f.setProp("transform",m,q)}}d.resolve()}}/**
   * Text layer rendering task.
   *
   * @param {TextContent} textContent
   * @param {HTMLElement} container
   * @param {PageViewport} viewport
   * @param {Array} textDivs
   * @private
   */
function h(a,b,c,d){this._textContent=a,this._container=b,this._viewport=c,d=d||[],this._textDivs=d,this._canceled=!1,this._capability=e(),this._renderTimer=null}/**
   * Starts rendering of the text layer.
   *
   * @param {TextLayerRenderParameters} renderParameters
   * @returns {TextLayerRenderTask}
   */
function i(a){var b=new h(a.textContent,a.container,a.viewport,a.textDivs);return b._render(a.timeout),b}var j=1e5,k=/\S/;return h.prototype={get promise(){return this._capability.promise},cancel:function(){this._canceled=!0,null!==this._renderTimer&&(clearTimeout(this._renderTimer),this._renderTimer=null),this._capability.reject("canceled")},_render:function(a){for(var d=this._textContent.items,e=this._textContent.styles,f=this._textDivs,g=this._viewport,h=0,i=d.length;i>h;h++)b(f,g,d[h],e);if(a){// Schedule
var j=this;this._renderTimer=setTimeout(function(){c(j),j._renderTimer=null},a)}else// Render right away
c(this)}},i}());a.renderTextLayer=h}),function(a,b){b(a.pdfjsDisplayWebGL={},a.pdfjsSharedUtil,a.pdfjsDisplayDOMUtils)}(this,function(a,b,c){var d=b.shadow,e=c.getDefaultSetting,f=function(){function a(a,b,c){var d=a.createShader(c);a.shaderSource(d,b),a.compileShader(d);var e=a.getShaderParameter(d,a.COMPILE_STATUS);if(!e){var f=a.getShaderInfoLog(d);throw new Error("Error during shader compilation: "+f)}return d}function b(b,c){return a(b,c,b.VERTEX_SHADER)}function c(b,c){return a(b,c,b.FRAGMENT_SHADER)}function f(a,b){for(var c=a.createProgram(),d=0,e=b.length;e>d;++d)a.attachShader(c,b[d]);a.linkProgram(c);var f=a.getProgramParameter(c,a.LINK_STATUS);if(!f){var g=a.getProgramInfoLog(c);throw new Error("Error during program linking: "+g)}return c}function g(a,b,c){a.activeTexture(c);var d=a.createTexture();
// Set the parameters so we can render any size image.
// Upload the image into the texture.
return a.bindTexture(a.TEXTURE_2D,d),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b),d}function h(){n||(o=document.createElement("canvas"),n=o.getContext("webgl",{premultipliedalpha:!1}))}function i(){var a,d;h(),a=o,o=null,d=n,n=null;
// setup a GLSL program
var e=b(d,p),g=c(d,q),i=f(d,[e,g]);d.useProgram(i);var j={};j.gl=d,j.canvas=a,j.resolutionLocation=d.getUniformLocation(i,"u_resolution"),j.positionLocation=d.getAttribLocation(i,"a_position"),j.backdropLocation=d.getUniformLocation(i,"u_backdrop"),j.subtypeLocation=d.getUniformLocation(i,"u_subtype");var k=d.getAttribLocation(i,"a_texCoord"),l=d.getUniformLocation(i,"u_image"),m=d.getUniformLocation(i,"u_mask"),s=d.createBuffer();d.bindBuffer(d.ARRAY_BUFFER,s),d.bufferData(d.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),d.STATIC_DRAW),d.enableVertexAttribArray(k),d.vertexAttribPointer(k,2,d.FLOAT,!1,0,0),d.uniform1i(l,0),d.uniform1i(m,1),r=j}function j(a,b,c){var d=a.width,e=a.height;r||i();var f=r,h=f.canvas,j=f.gl;h.width=d,h.height=e,j.viewport(0,0,j.drawingBufferWidth,j.drawingBufferHeight),j.uniform2f(f.resolutionLocation,d,e),c.backdrop?j.uniform4f(f.resolutionLocation,c.backdrop[0],c.backdrop[1],c.backdrop[2],1):j.uniform4f(f.resolutionLocation,0,0,0,0),j.uniform1i(f.subtypeLocation,"Luminosity"===c.subtype?1:0);
// Create a textures
var k=g(j,a,j.TEXTURE0),l=g(j,b,j.TEXTURE1),m=j.createBuffer();
// draw
return j.bindBuffer(j.ARRAY_BUFFER,m),j.bufferData(j.ARRAY_BUFFER,new Float32Array([0,0,d,0,0,e,0,e,d,0,d,e]),j.STATIC_DRAW),j.enableVertexAttribArray(f.positionLocation),j.vertexAttribPointer(f.positionLocation,2,j.FLOAT,!1,0,0),j.clearColor(0,0,0,0),j.enable(j.BLEND),j.blendFunc(j.ONE,j.ONE_MINUS_SRC_ALPHA),j.clear(j.COLOR_BUFFER_BIT),j.drawArrays(j.TRIANGLES,0,6),j.flush(),j.deleteTexture(k),j.deleteTexture(l),j.deleteBuffer(m),h}function k(){var a,d;h(),a=o,o=null,d=n,n=null;
// setup a GLSL program
var e=b(d,s),g=c(d,t),i=f(d,[e,g]);d.useProgram(i);var j={};j.gl=d,j.canvas=a,j.resolutionLocation=d.getUniformLocation(i,"u_resolution"),j.scaleLocation=d.getUniformLocation(i,"u_scale"),j.offsetLocation=d.getUniformLocation(i,"u_offset"),j.positionLocation=d.getAttribLocation(i,"a_position"),j.colorLocation=d.getAttribLocation(i,"a_color"),u=j}function l(a,b,c,d,e){u||k();var f=u,g=f.canvas,h=f.gl;g.width=a,g.height=b,h.viewport(0,0,h.drawingBufferWidth,h.drawingBufferHeight),h.uniform2f(f.resolutionLocation,a,b);
// count triangle points
var i,j,l,m=0;for(i=0,j=d.length;j>i;i++)switch(d[i].type){case"lattice":l=d[i].coords.length/d[i].verticesPerRow|0,m+=(l-1)*(d[i].verticesPerRow-1)*6;break;case"triangles":m+=d[i].coords.length}
// transfer data
var n=new Float32Array(2*m),o=new Uint8Array(3*m),p=e.coords,q=e.colors,r=0,s=0;for(i=0,j=d.length;j>i;i++){var t=d[i],v=t.coords,w=t.colors;switch(t.type){case"lattice":var x=t.verticesPerRow;l=v.length/x|0;for(var y=1;l>y;y++)for(var z=y*x+1,A=1;x>A;A++,z++)n[r]=p[v[z-x-1]],n[r+1]=p[v[z-x-1]+1],n[r+2]=p[v[z-x]],n[r+3]=p[v[z-x]+1],n[r+4]=p[v[z-1]],n[r+5]=p[v[z-1]+1],o[s]=q[w[z-x-1]],o[s+1]=q[w[z-x-1]+1],o[s+2]=q[w[z-x-1]+2],o[s+3]=q[w[z-x]],o[s+4]=q[w[z-x]+1],o[s+5]=q[w[z-x]+2],o[s+6]=q[w[z-1]],o[s+7]=q[w[z-1]+1],o[s+8]=q[w[z-1]+2],n[r+6]=n[r+2],n[r+7]=n[r+3],n[r+8]=n[r+4],n[r+9]=n[r+5],n[r+10]=p[v[z]],n[r+11]=p[v[z]+1],o[s+9]=o[s+3],o[s+10]=o[s+4],o[s+11]=o[s+5],o[s+12]=o[s+6],o[s+13]=o[s+7],o[s+14]=o[s+8],o[s+15]=q[w[z]],o[s+16]=q[w[z]+1],o[s+17]=q[w[z]+2],r+=12,s+=18;break;case"triangles":for(var B=0,C=v.length;C>B;B++)n[r]=p[v[B]],n[r+1]=p[v[B]+1],o[s]=q[w[B]],o[s+1]=q[w[B]+1],o[s+2]=q[w[B]+2],r+=2,s+=3}}
// draw
c?h.clearColor(c[0]/255,c[1]/255,c[2]/255,1):h.clearColor(0,0,0,0),h.clear(h.COLOR_BUFFER_BIT);var D=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,D),h.bufferData(h.ARRAY_BUFFER,n,h.STATIC_DRAW),h.enableVertexAttribArray(f.positionLocation),h.vertexAttribPointer(f.positionLocation,2,h.FLOAT,!1,0,0);var E=h.createBuffer();return h.bindBuffer(h.ARRAY_BUFFER,E),h.bufferData(h.ARRAY_BUFFER,o,h.STATIC_DRAW),h.enableVertexAttribArray(f.colorLocation),h.vertexAttribPointer(f.colorLocation,3,h.UNSIGNED_BYTE,!1,0,0),h.uniform2f(f.scaleLocation,e.scaleX,e.scaleY),h.uniform2f(f.offsetLocation,e.offsetX,e.offsetY),h.drawArrays(h.TRIANGLES,0,m),h.flush(),h.deleteBuffer(D),h.deleteBuffer(E),g}function m(){r&&r.canvas&&(r.canvas.width=0,r.canvas.height=0),u&&u.canvas&&(u.canvas.width=0,u.canvas.height=0),r=null,u=null}var n,o,p="  attribute vec2 a_position;                                      attribute vec2 a_texCoord;                                                                                                      uniform vec2 u_resolution;                                                                                                      varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_texCoord = a_texCoord;                                      }                                                             ",q="  precision mediump float;                                                                                                        uniform vec4 u_backdrop;                                        uniform int u_subtype;                                          uniform sampler2D u_image;                                      uniform sampler2D u_mask;                                                                                                       varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec4 imageColor = texture2D(u_image, v_texCoord);               vec4 maskColor = texture2D(u_mask, v_texCoord);                 if (u_backdrop.a > 0.0) {                                         maskColor.rgb = maskColor.rgb * maskColor.a +                                   u_backdrop.rgb * (1.0 - maskColor.a);         }                                                               float lum;                                                      if (u_subtype == 0) {                                             lum = maskColor.a;                                            } else {                                                          lum = maskColor.r * 0.3 + maskColor.g * 0.59 +                        maskColor.b * 0.11;                                     }                                                               imageColor.a *= lum;                                            imageColor.rgb *= imageColor.a;                                 gl_FragColor = imageColor;                                    }                                                             ",r=null,s="  attribute vec2 a_position;                                      attribute vec3 a_color;                                                                                                         uniform vec2 u_resolution;                                      uniform vec2 u_scale;                                           uniform vec2 u_offset;                                                                                                          varying vec4 v_color;                                                                                                           void main() {                                                     vec2 position = (a_position + u_offset) * u_scale;              vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_color = vec4(a_color / 255.0, 1.0);                         }                                                             ",t="  precision mediump float;                                                                                                        varying vec4 v_color;                                                                                                           void main() {                                                     gl_FragColor = v_color;                                       }                                                             ",u=null;return{get isEnabled(){if(e("disableWebGL"))return!1;var a=!1;try{h(),a=!!n}catch(b){}return d(this,"isEnabled",a)},composeSMask:j,drawFigures:l,clear:m}}();a.WebGLUtils=f}),function(a,b){b(a.pdfjsDisplayPatternHelper={},a.pdfjsSharedUtil,a.pdfjsDisplayWebGL)}(this,function(a,b,c){function d(a){var b=j[a[0]];return b||h("Unknown IR type: "+a[0]),b.fromIR(a)}var e=b.Util,f=b.info,g=b.isArray,h=b.error,i=c.WebGLUtils,j={};j.RadialAxial={fromIR:function(a){var b=a[1],c=a[2],d=a[3],e=a[4],f=a[5],g=a[6];return{type:"Pattern",getPattern:function(a){var h;"axial"===b?h=a.createLinearGradient(d[0],d[1],e[0],e[1]):"radial"===b&&(h=a.createRadialGradient(d[0],d[1],f,e[0],e[1],g));for(var i=0,j=c.length;j>i;++i){var k=c[i];h.addColorStop(k[0],k[1])}return h}}}};var k=function(){function a(a,b,c,d,e,f,g,h){
// Very basic Gouraud-shaded triangle rasterization algorithm.
var i,j=b.coords,k=b.colors,l=a.data,m=4*a.width;j[c+1]>j[d+1]&&(i=c,c=d,d=i,i=f,f=g,g=i),j[d+1]>j[e+1]&&(i=d,d=e,e=i,i=g,g=h,h=i),j[c+1]>j[d+1]&&(i=c,c=d,d=i,i=f,f=g,g=i);var n=(j[c]+b.offsetX)*b.scaleX,o=(j[c+1]+b.offsetY)*b.scaleY,p=(j[d]+b.offsetX)*b.scaleX,q=(j[d+1]+b.offsetY)*b.scaleY,r=(j[e]+b.offsetX)*b.scaleX,s=(j[e+1]+b.offsetY)*b.scaleY;if(!(o>=s))for(var t,u,v,w,x,y,z,A,B,C=k[f],D=k[f+1],E=k[f+2],F=k[g],G=k[g+1],H=k[g+2],I=k[h],J=k[h+1],K=k[h+2],L=Math.round(o),M=Math.round(s),N=L;M>=N;N++){q>N?(B=o>N?0:o===q?1:(o-N)/(o-q),t=n-(n-p)*B,u=C-(C-F)*B,v=D-(D-G)*B,w=E-(E-H)*B):(B=N>s?1:q===s?0:(q-N)/(q-s),t=p-(p-r)*B,u=F-(F-I)*B,v=G-(G-J)*B,w=H-(H-K)*B),B=o>N?0:N>s?1:(o-N)/(o-s),x=n-(n-r)*B,y=C-(C-I)*B,z=D-(D-J)*B,A=E-(E-K)*B;for(var O=Math.round(Math.min(t,x)),P=Math.round(Math.max(t,x)),Q=m*N+4*O,R=O;P>=R;R++)B=(t-R)/(t-x),B=0>B?0:B>1?1:B,l[Q++]=u-(u-y)*B|0,l[Q++]=v-(v-z)*B|0,l[Q++]=w-(w-A)*B|0,l[Q++]=255}}function b(b,c,d){var e,f,g=c.coords,i=c.colors;switch(c.type){case"lattice":var j=c.verticesPerRow,k=Math.floor(g.length/j)-1,l=j-1;for(e=0;k>e;e++)for(var m=e*j,n=0;l>n;n++,m++)a(b,d,g[m],g[m+1],g[m+j],i[m],i[m+1],i[m+j]),a(b,d,g[m+j+1],g[m+1],g[m+j],i[m+j+1],i[m+1],i[m+j]);break;case"triangles":for(e=0,f=g.length;f>e;e+=3)a(b,d,g[e],g[e+1],g[e+2],i[e],i[e+1],i[e+2]);break;default:h("illigal figure")}}function c(a,c,d,e,f,g,h){
// we will increase scale on some weird factor to let antialiasing take
// care of "rough" edges
var j,k,l,m,n=1.1,o=3e3,p=2,q=Math.floor(a[0]),r=Math.floor(a[1]),s=Math.ceil(a[2])-q,t=Math.ceil(a[3])-r,u=Math.min(Math.ceil(Math.abs(s*c[0]*n)),o),v=Math.min(Math.ceil(Math.abs(t*c[1]*n)),o),w=s/u,x=t/v,y={coords:d,colors:e,offsetX:-q,offsetY:-r,scaleX:1/w,scaleY:1/x},z=u+2*p,A=v+2*p;if(i.isEnabled)j=i.drawFigures(u,v,g,f,y),k=h.getCanvas("mesh",z,A,!1),k.context.drawImage(j,p,p),j=k.canvas;else{k=h.getCanvas("mesh",z,A,!1);var B=k.context,C=B.createImageData(u,v);if(g){var D=C.data;for(l=0,m=D.length;m>l;l+=4)D[l]=g[0],D[l+1]=g[1],D[l+2]=g[2],D[l+3]=255}for(l=0;l<f.length;l++)b(C,f[l],y);B.putImageData(C,p,p),j=k.canvas}return{canvas:j,offsetX:q-p*w,offsetY:r-p*x,scaleX:w,scaleY:x}}return c}();j.Mesh={fromIR:function(a){
//var type = raw[1];
var b=a[2],c=a[3],d=a[4],f=a[5],g=a[6],h=a[8];return{type:"Pattern",getPattern:function(a,i,j){var l;if(j)l=e.singularValueDecompose2dScale(a.mozCurrentTransform);else if(l=e.singularValueDecompose2dScale(i.baseTransform),g){var m=e.singularValueDecompose2dScale(g);l=[l[0]*m[0],l[1]*m[1]]}
// Rasterizing on the main thread since sending/queue large canvases
// might cause OOM.
var n=k(f,l,b,c,d,j?null:h,i.cachedCanvases);return j||(a.setTransform.apply(a,i.baseTransform),g&&a.transform.apply(a,g)),a.translate(n.offsetX,n.offsetY),a.scale(n.scaleX,n.scaleY),a.createPattern(n.canvas,"no-repeat")}}}},j.Dummy={fromIR:function(){return{type:"Pattern",getPattern:function(){return"hotpink"}}}};var l=function(){// 10in @ 300dpi shall be enough
function a(a,b,c,d,e){this.operatorList=a[2],this.matrix=a[3]||[1,0,0,1,0,0],this.bbox=a[4],this.xstep=a[5],this.ystep=a[6],this.paintType=a[7],this.tilingType=a[8],this.color=b,this.canvasGraphicsFactory=d,this.baseTransform=e,this.type="Pattern",this.ctx=c}var b={COLORED:1,UNCOLORED:2},c=3e3;return a.prototype={createPatternCanvas:function(a){var b=this.operatorList,d=this.bbox,g=this.xstep,h=this.ystep,i=this.paintType,j=this.tilingType,k=this.color,l=this.canvasGraphicsFactory;f("TilingType: "+j);var m=d[0],n=d[1],o=d[2],p=d[3],q=[m,n],r=[m+g,n+h],s=r[0]-q[0],t=r[1]-q[1],u=e.singularValueDecompose2dScale(this.matrix),v=e.singularValueDecompose2dScale(this.baseTransform),w=[u[0]*v[0],u[1]*v[1]];s=Math.min(Math.ceil(Math.abs(s*w[0])),c),t=Math.min(Math.ceil(Math.abs(t*w[1])),c);var x=a.cachedCanvases.getCanvas("pattern",s,t,!0),y=x.context,z=l.createCanvasGraphics(y);z.groupLevel=a.groupLevel,this.setFillAndStrokeStyleToContext(y,i,k),this.setScale(s,t,g,h),this.transformToScale(z);
// transform coordinates to pattern space
var A=[1,0,0,1,-q[0],-q[1]];return z.transform.apply(z,A),this.clipBbox(z,d,m,n,o,p),z.executeOperatorList(b),x.canvas},setScale:function(a,b,c,d){this.scale=[a/c,b/d]},transformToScale:function(a){var b=this.scale,c=[b[0],0,0,b[1],0,0];a.transform.apply(a,c)},scaleToContext:function(){var a=this.scale;this.ctx.scale(1/a[0],1/a[1])},clipBbox:function(a,b,c,d,e,f){if(b&&g(b)&&4===b.length){var h=e-c,i=f-d;a.ctx.rect(c,d,h,i),a.clip(),a.endPath()}},setFillAndStrokeStyleToContext:function(a,c,d){switch(c){case b.COLORED:var f=this.ctx;a.fillStyle=f.fillStyle,a.strokeStyle=f.strokeStyle;break;case b.UNCOLORED:var g=e.makeCssRgb(d[0],d[1],d[2]);a.fillStyle=g,a.strokeStyle=g;break;default:h("Unsupported paint type: "+c)}},getPattern:function(a,b){var c=this.createPatternCanvas(b);return a=this.ctx,a.setTransform.apply(a,this.baseTransform),a.transform.apply(a,this.matrix),this.scaleToContext(),a.createPattern(c,"repeat")}},a}();a.getShadingPatternFromIR=d,a.TilingPattern=l}),function(a,b){b(a.pdfjsDisplayCanvas={},a.pdfjsSharedUtil,a.pdfjsDisplayDOMUtils,a.pdfjsDisplayPatternHelper,a.pdfjsDisplayWebGL)}(this,function(a,b,c,d,e){function f(a,b){var c=document.createElement("canvas");return c.width=a,c.height=b,c}function g(a){
// If the context doesn't expose a `mozCurrentTransform`, add a JS based one.
a.mozCurrentTransform||(a._originalSave=a.save,a._originalRestore=a.restore,a._originalRotate=a.rotate,a._originalScale=a.scale,a._originalTranslate=a.translate,a._originalTransform=a.transform,a._originalSetTransform=a.setTransform,a._transformMatrix=a._transformMatrix||[1,0,0,1,0,0],a._transformStack=[],Object.defineProperty(a,"mozCurrentTransform",{get:function(){return this._transformMatrix}}),Object.defineProperty(a,"mozCurrentTransformInverse",{get:function(){
// Calculation done using WolframAlpha:
// http://www.wolframalpha.com/input/?
//   i=Inverse+{{a%2C+c%2C+e}%2C+{b%2C+d%2C+f}%2C+{0%2C+0%2C+1}}
var a=this._transformMatrix,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=b*e-c*d,i=c*d-b*e;return[e/h,c/i,d/i,b/h,(e*f-d*g)/i,(c*f-b*g)/h]}}),a.save=function(){var a=this._transformMatrix;this._transformStack.push(a),this._transformMatrix=a.slice(0,6),this._originalSave()},a.restore=function(){var a=this._transformStack.pop();a&&(this._transformMatrix=a,this._originalRestore())},a.translate=function(a,b){var c=this._transformMatrix;c[4]=c[0]*a+c[2]*b+c[4],c[5]=c[1]*a+c[3]*b+c[5],this._originalTranslate(a,b)},a.scale=function(a,b){var c=this._transformMatrix;c[0]=c[0]*a,c[1]=c[1]*a,c[2]=c[2]*b,c[3]=c[3]*b,this._originalScale(a,b)},a.transform=function(b,c,d,e,f,g){var h=this._transformMatrix;this._transformMatrix=[h[0]*b+h[2]*c,h[1]*b+h[3]*c,h[0]*d+h[2]*e,h[1]*d+h[3]*e,h[0]*f+h[2]*g+h[4],h[1]*f+h[3]*g+h[5]],a._originalTransform(b,c,d,e,f,g)},a.setTransform=function(b,c,d,e,f,g){this._transformMatrix=[b,c,d,e,f,g],a._originalSetTransform(b,c,d,e,f,g)},a.rotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this._transformMatrix;this._transformMatrix=[d[0]*b+d[2]*c,d[1]*b+d[3]*c,d[0]*-c+d[2]*b,d[1]*-c+d[3]*b,d[4],d[5]],this._originalRotate(a)})}function h(a){var b,c,d,e,f=1e3,g=a.width,h=a.height,i=g+1,j=new Uint8Array(i*(h+1)),k=new Uint8Array([0,2,4,0,1,0,5,4,8,10,0,8,0,2,1,0]),l=g+7&-8,m=a.data,n=new Uint8Array(l*h),o=0;for(b=0,e=m.length;e>b;b++)for(var p=128,q=m[b];p>0;)n[o++]=q&p?0:255,p>>=1;
// finding iteresting points: every point is located between mask pixels,
// so there will be points of the (width + 1)x(height + 1) grid. Every point
// will have flags assigned based on neighboring mask pixels:
//   4 | 8
//   --P--
//   2 | 1
// We are interested only in points with the flags:
//   - outside corners: 1, 2, 4, 8;
//   - inside corners: 7, 11, 13, 14;
//   - and, intersections: 5, 10.
var r=0;for(o=0,0!==n[o]&&(j[0]=1,++r),c=1;g>c;c++)n[o]!==n[o+1]&&(j[c]=n[o]?2:1,++r),o++;for(0!==n[o]&&(j[c]=2,++r),b=1;h>b;b++){o=b*l,d=b*i,n[o-l]!==n[o]&&(j[d]=n[o]?1:8,++r);
// 'sum' is the position of the current pixel configuration in the 'TYPES'
// array (in order 8-1-2-4, so we can use '>>2' to shift the column).
var s=(n[o]?4:0)+(n[o-l]?8:0);for(c=1;g>c;c++)s=(s>>2)+(n[o+1]?4:0)+(n[o-l+1]?8:0),k[s]&&(j[d+c]=k[s],++r),o++;if(n[o-l]!==n[o]&&(j[d+c]=n[o]?2:4,++r),r>f)return null}for(o=l*(h-1),d=b*i,0!==n[o]&&(j[d]=8,++r),c=1;g>c;c++)n[o]!==n[o+1]&&(j[d+c]=n[o]?4:8,++r),o++;if(0!==n[o]&&(j[d+c]=4,++r),r>f)return null;
// building outlines
var t=new Int32Array([0,i,-1,0,-i,0,0,0,1]),u=[];for(b=0;r&&h>=b;b++){for(var v=b*i,w=v+g;w>v&&!j[v];)v++;if(v!==w){var x,y=[v%i,b],z=j[v],A=v;do{var B=t[z];do v+=B;while(!j[v]);x=j[v],5!==x&&10!==x?(z=x,j[v]=0):(z=x&51*z>>4,j[v]&=z>>2|z<<2),y.push(v%i),y.push(v/i|0),--r}while(A!==v);u.push(y),--b}}var C=function(a){a.save(),
// the path shall be painted in [0..1]x[0..1] space
a.scale(1/g,-1/h),a.translate(0,-h),a.beginPath();for(var b=0,c=u.length;c>b;b++){var d=u[b];a.moveTo(d[0],d[1]);for(var e=2,f=d.length;f>e;e+=2)a.lineTo(d[e],d[e+1])}a.fill(),a.beginPath(),a.restore()};return C}var i=b.FONT_IDENTITY_MATRIX,j=b.IDENTITY_MATRIX,k=b.ImageKind,l=b.OPS,m=b.TextRenderingMode,n=b.Uint32ArrayView,o=b.Util,p=b.assert,q=b.info,r=b.isNum,s=b.isArray,t=b.isLittleEndian,u=b.error,v=b.shadow,w=b.warn,x=d.TilingPattern,y=d.getShadingPatternFromIR,z=e.WebGLUtils,A=c.hasCanvasTypedArrays,B=16,C=100,D=4096,E=.65,F=!0,G=1e3,H=16,I={get value(){return v(I,"value",A())}},J={get value(){return v(J,"value",t())}},K=function(){function a(){this.cache=Object.create(null)}return a.prototype={getCanvas:function(a,b,c,d){var e;if(void 0!==this.cache[a])e=this.cache[a],e.canvas.width=b,e.canvas.height=c,e.context.setTransform(1,0,0,1,0,0);else{var h=f(b,c),i=h.getContext("2d");d&&g(i),this.cache[a]=e={canvas:h,context:i}}return e},clear:function(){for(var a in this.cache){var b=this.cache[a];
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
b.canvas.width=0,b.canvas.height=0,delete this.cache[a]}}},a}(),L=function(){function a(a){
// Are soft masks and alpha values shapes or opacities?
this.alphaIsShape=!1,this.fontSize=0,this.fontSizeScale=1,this.textMatrix=j,this.textMatrixScale=1,this.fontMatrix=i,this.leading=0,
// Current point (in user coordinates)
this.x=0,this.y=0,
// Start of text line (in text coordinates)
this.lineX=0,this.lineY=0,
// Character and word spacing
this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRenderingMode=m.FILL,this.textRise=0,
// Default fore and background colors
this.fillColor="#000000",this.strokeColor="#000000",this.patternFill=!1,
// Note: fill alpha applies to all non-stroking operations
this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.activeSMask=null,this.resumeSMaskCtx=null,// nonclonable field (see the save method below)
this.old=a}return a.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(a,b){this.x=a,this.y=b}},a}(),M=function(){function a(a,b,c,d){this.ctx=a,this.current=new L,this.stateStack=[],this.pendingClip=null,this.pendingEOFill=!1,this.res=null,this.xobjs=null,this.commonObjs=b,this.objs=c,this.imageLayer=d,this.groupStack=[],this.processingType3=null,
// Patterns are painted relative to the initial page/form transform, see pdf
// spec 8.7.2 NOTE 1.
this.baseTransform=null,this.baseTransformStack=[],this.groupLevel=0,this.smaskStack=[],this.smaskCounter=0,this.tempSMask=null,this.cachedCanvases=new K,a&&
// NOTE: if mozCurrentTransform is polyfilled, then the current state of
// the transformation must already be set in canvasCtx._transformMatrix.
g(a),this.cachedGetSinglePixelWidth=null}function b(a,b){if("undefined"!=typeof ImageData&&b instanceof ImageData)return void a.putImageData(b,0,0);
// Put the image data to the canvas in chunks, rather than putting the
// whole image at once.  This saves JS memory, because the ImageData object
// is smaller. It also possibly saves C++ memory within the implementation
// of putImageData(). (E.g. in Firefox we make two short-lived copies of
// the data passed to putImageData()). |n| shouldn't be too small, however,
// because too many putImageData() calls will slow things down.
//
// Note: as written, if the last chunk is partial, the putImageData() call
// will (conceptually) put pixels past the bounds of the canvas.  But
// that's ok; any such pixels are ignored.
var c,d,e,f,g,h=b.height,i=b.width,j=h%H,l=(h-j)/H,m=0===j?l:l+1,o=a.createImageData(i,H),p=0,q=b.data,r=o.data;
// There are multiple forms in which the pixel data can be passed, and
// imgData.kind tells us which one this is.
if(b.kind===k.GRAYSCALE_1BPP){
// Grayscale, 1 bit per pixel (i.e. black-and-white).
var s=q.byteLength,t=I.value?new Uint32Array(r.buffer):new n(r),v=t.length,w=i+7>>3,x=4294967295,y=J.value||!I.value?4278190080:255;for(d=0;m>d;d++){for(f=l>d?H:j,c=0,e=0;f>e;e++){for(var z=s-p,A=0,B=z>w?i:8*z-7,C=-8&B,D=0,E=0;C>A;A+=8)E=q[p++],t[c++]=128&E?x:y,t[c++]=64&E?x:y,t[c++]=32&E?x:y,t[c++]=16&E?x:y,t[c++]=8&E?x:y,t[c++]=4&E?x:y,t[c++]=2&E?x:y,t[c++]=1&E?x:y;for(;B>A;A++)0===D&&(E=q[p++],D=128),t[c++]=E&D?x:y,D>>=1}
// We ran out of input. Make all remaining pixels transparent.
for(;v>c;)t[c++]=0;a.putImageData(o,0,d*H)}}else if(b.kind===k.RGBA_32BPP){for(e=0,g=i*H*4,d=0;l>d;d++)r.set(q.subarray(p,p+g)),p+=g,a.putImageData(o,0,e),e+=H;m>d&&(g=i*j*4,r.set(q.subarray(p,p+g)),a.putImageData(o,0,e))}else if(b.kind===k.RGB_24BPP)for(f=H,g=i*f,d=0;m>d;d++){for(d>=l&&(f=j,g=i*f),c=0,e=g;e--;)r[c++]=q[p++],r[c++]=q[p++],r[c++]=q[p++],r[c++]=255;a.putImageData(o,0,d*H)}else u("bad image kind: "+b.kind)}function c(a,b){for(var c=b.height,d=b.width,e=c%H,f=(c-e)/H,g=0===e?f:f+1,h=a.createImageData(d,H),i=0,j=b.data,k=h.data,l=0;g>l;l++){// alpha component offset
for(var m=f>l?H:e,n=3,o=0;m>o;o++)for(var p=0,q=0;d>q;q++){if(!p){var r=j[i++];p=128}k[n]=r&p?0:255,n+=4,p>>=1}a.putImageData(h,0,l*H)}}function d(a,b){for(var c=["strokeStyle","fillStyle","fillRule","globalAlpha","lineWidth","lineCap","lineJoin","miterLimit","globalCompositeOperation","font"],d=0,e=c.length;e>d;d++){var f=c[d];void 0!==a[f]&&(b[f]=a[f])}void 0!==a.setLineDash?(b.setLineDash(a.getLineDash()),b.lineDashOffset=a.lineDashOffset):void 0!==a.mozDashOffset&&(b.mozDash=a.mozDash,b.mozDashOffset=a.mozDashOffset)}function e(a,b,c,d){for(var e=a.length,f=3;e>f;f+=4){var g=a[f];if(0===g)a[f-3]=b,a[f-2]=c,a[f-1]=d;else if(255>g){var h=255-g;a[f-3]=a[f-3]*g+b*h>>8,a[f-2]=a[f-2]*g+c*h>>8,a[f-1]=a[f-1]*g+d*h>>8}}}function f(a,b,c){for(var d=a.length,e=1/255,f=3;d>f;f+=4){var g=c?c[a[f]]:a[f];b[f]=b[f]*g*e|0}}function t(a,b,c){for(var d=a.length,e=3;d>e;e+=4){var f=77*a[e-3]+// * 0.3 / 255 * 0x10000
152*a[e-2]+// * 0.59 ....
28*a[e-1];// * 0.11 ....
b[e]=c?b[e]*c[f>>8]>>8:b[e]*f>>16}}function A(a,b,c,d,g,h,i){var j,k=!!h,l=k?h[0]:0,m=k?h[1]:0,n=k?h[2]:0;j="Luminosity"===g?t:f;for(var o=1048576,p=Math.min(d,Math.ceil(o/c)),q=0;d>q;q+=p){var r=Math.min(p,d-q),s=a.getImageData(0,q,c,r),u=b.getImageData(0,q,c,r);k&&e(s.data,l,m,n),j(s.data,u.data,i),a.putImageData(u,0,q)}}function M(a,b,c){var d=b.canvas,e=b.context;a.setTransform(b.scaleX,0,0,b.scaleY,b.offsetX,b.offsetY);var f=b.backdrop||null;if(!b.transferMap&&z.isEnabled){var g=z.composeSMask(c.canvas,d,{subtype:b.subtype,backdrop:f});return a.setTransform(1,0,0,1,0,0),void a.drawImage(g,b.offsetX,b.offsetY)}A(e,c,d.width,d.height,b.subtype,f,b.transferMap),a.drawImage(d,0,0)}
// Defines the time the executeOperatorList is going to be executing
// before it stops and shedules a continue of execution.
var N=15,O=10,P=["butt","round","square"],Q=["miter","round","bevel"],R={},S={};a.prototype={beginDrawing:function(a,b,c){
// For pdfs that use blend modes we have to clear the canvas else certain
// blend modes can look wrong since we'd be blending with a white
// backdrop. The problem with a transparent backdrop though is we then
// don't get sub pixel anti aliasing on text, creating temporary
// transparent canvas when we have blend modes.
var d=this.ctx.canvas.width,e=this.ctx.canvas.height;if(this.ctx.save(),this.ctx.fillStyle="rgb(255, 255, 255)",this.ctx.fillRect(0,0,d,e),this.ctx.restore(),c){var f=this.cachedCanvases.getCanvas("transparent",d,e,!0);this.compositeCtx=this.ctx,this.transparentCanvas=f.canvas,this.ctx=f.context,this.ctx.save(),
// The transform can be applied before rendering, transferring it to
// the new canvas.
this.ctx.transform.apply(this.ctx,this.compositeCtx.mozCurrentTransform)}this.ctx.save(),a&&this.ctx.transform.apply(this.ctx,a),this.ctx.transform.apply(this.ctx,b.transform),this.baseTransform=this.ctx.mozCurrentTransform.slice(),this.imageLayer&&this.imageLayer.beginLayout()},executeOperatorList:function(a,b,c,d){var e=a.argsArray,f=a.fnArray,g=b||0,h=e.length;
// Sometimes the OperatorList to execute is empty.
if(h===g)return g;for(var i,j=h-g>O&&"function"==typeof c,k=j?Date.now()+N:0,m=0,n=this.commonObjs,o=this.objs;;){if(void 0!==d&&g===d.nextBreakPoint)return d.breakIt(g,c),g;if(i=f[g],i!==l.dependency)this[i].apply(this,e[g]);else for(var p=e[g],q=0,r=p.length;r>q;q++){var s=p[q],t="g"===s[0]&&"_"===s[1],u=t?n:o;
// If the promise isn't resolved yet, add the continueCallback
// to the promise and bail out.
if(!u.isResolved(s))return u.get(s,c),g}
// If the entire operatorList was executed, stop as were done.
if(g++,g===h)return g;
// If the execution took longer then a certain amount of time and
// `continueCallback` is specified, interrupt the execution.
if(j&&++m>O){if(Date.now()>k)return c(),g;m=0}}},endDrawing:function(){
// Finishing all opened operations such as SMask group painting.
null!==this.current.activeSMask&&this.endSMaskGroup(),this.ctx.restore(),this.transparentCanvas&&(this.ctx=this.compositeCtx,this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),// Avoid apply transform twice
this.ctx.drawImage(this.transparentCanvas,0,0),this.ctx.restore(),this.transparentCanvas=null),this.cachedCanvases.clear(),z.clear(),this.imageLayer&&this.imageLayer.endLayout()},
// Graphics state
setLineWidth:function(a){this.current.lineWidth=a,this.ctx.lineWidth=a},setLineCap:function(a){this.ctx.lineCap=P[a]},setLineJoin:function(a){this.ctx.lineJoin=Q[a]},setMiterLimit:function(a){this.ctx.miterLimit=a},setDash:function(a,b){var c=this.ctx;void 0!==c.setLineDash?(c.setLineDash(a),c.lineDashOffset=b):(c.mozDash=a,c.mozDashOffset=b)},setRenderingIntent:function(a){},setFlatness:function(a){},setGState:function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b],e=d[0],f=d[1];switch(e){case"LW":this.setLineWidth(f);break;case"LC":this.setLineCap(f);break;case"LJ":this.setLineJoin(f);break;case"ML":this.setMiterLimit(f);break;case"D":this.setDash(f[0],f[1]);break;case"RI":this.setRenderingIntent(f);break;case"FL":this.setFlatness(f);break;case"Font":this.setFont(f[0],f[1]);break;case"CA":this.current.strokeAlpha=d[1];break;case"ca":this.current.fillAlpha=d[1],this.ctx.globalAlpha=d[1];break;case"BM":if(f&&f.name&&"Normal"!==f.name){var g=f.name.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()}).substring(1);this.ctx.globalCompositeOperation=g,this.ctx.globalCompositeOperation!==g&&w('globalCompositeOperation "'+g+'" is not supported')}else this.ctx.globalCompositeOperation="source-over";break;case"SMask":this.current.activeSMask&&(
// If SMask is currrenly used, it needs to be suspended or
// finished. Suspend only makes sense when at least one save()
// was performed and state needs to be reverted on restore().
this.stateStack.length>0&&this.stateStack[this.stateStack.length-1].activeSMask===this.current.activeSMask?this.suspendSMaskGroup():this.endSMaskGroup()),this.current.activeSMask=f?this.tempSMask:null,this.current.activeSMask&&this.beginSMaskGroup(),this.tempSMask=null}}},beginSMaskGroup:function(){var a=this.current.activeSMask,b=a.canvas.width,c=a.canvas.height,e="smaskGroupAt"+this.groupLevel,f=this.cachedCanvases.getCanvas(e,b,c,!0),g=this.ctx,h=g.mozCurrentTransform;this.ctx.save();var i=f.context;i.scale(1/a.scaleX,1/a.scaleY),i.translate(-a.offsetX,-a.offsetY),i.transform.apply(i,h),a.startTransformInverse=i.mozCurrentTransformInverse,d(g,i),this.ctx=i,this.setGState([["BM","Normal"],["ca",1],["CA",1]]),this.groupStack.push(g),this.groupLevel++},suspendSMaskGroup:function(){
// Similar to endSMaskGroup, the intermediate canvas has to be composed
// and future ctx state restored.
var a=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),M(this.ctx,this.current.activeSMask,a),this.ctx.restore(),this.ctx.save(),// save is needed since SMask will be resumed.
d(a,this.ctx),
// Saving state for resuming.
this.current.resumeSMaskCtx=a;
// Transform was changed in the SMask canvas, reflecting this change on
// this.ctx.
var b=o.transform(this.current.activeSMask.startTransformInverse,a.mozCurrentTransform);this.ctx.transform.apply(this.ctx,b),
// SMask was composed, the results at the groupCtx can be cleared.
a.save(),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,a.canvas.width,a.canvas.height),a.restore()},resumeSMaskGroup:function(){
// Resuming state saved by suspendSMaskGroup. We don't need to restore
// any groupCtx state since restore() command (the only caller) will do
// that for us. See also beginSMaskGroup.
var a=this.current.resumeSMaskCtx,b=this.ctx;this.ctx=a,this.groupStack.push(b),this.groupLevel++},endSMaskGroup:function(){var a=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),M(this.ctx,this.current.activeSMask,a),this.ctx.restore(),d(a,this.ctx);
// Transform was changed in the SMask canvas, reflecting this change on
// this.ctx.
var b=o.transform(this.current.activeSMask.startTransformInverse,a.mozCurrentTransform);this.ctx.transform.apply(this.ctx,b)},save:function(){this.ctx.save();var a=this.current;this.stateStack.push(a),this.current=a.clone(),this.current.resumeSMaskCtx=null},restore:function(){
// SMask was suspended, we just need to resume it.
this.current.resumeSMaskCtx&&this.resumeSMaskGroup(),
// SMask has to be finished once there is no states that are using the
// same SMask.
null===this.current.activeSMask||0!==this.stateStack.length&&this.stateStack[this.stateStack.length-1].activeSMask===this.current.activeSMask||this.endSMaskGroup(),0!==this.stateStack.length&&(this.current=this.stateStack.pop(),this.ctx.restore(),
// Ensure that the clipping path is reset (fixes issue6413.pdf).
this.pendingClip=null,this.cachedGetSinglePixelWidth=null)},transform:function(a,b,c,d,e,f){this.ctx.transform(a,b,c,d,e,f),this.cachedGetSinglePixelWidth=null},
// Path
constructPath:function(a,b){for(var c=this.ctx,d=this.current,e=d.x,f=d.y,g=0,h=0,i=a.length;i>g;g++)switch(0|a[g]){case l.rectangle:e=b[h++],f=b[h++];var j=b[h++],k=b[h++];0===j&&(j=this.getSinglePixelWidth()),0===k&&(k=this.getSinglePixelWidth());var m=e+j,n=f+k;this.ctx.moveTo(e,f),this.ctx.lineTo(m,f),this.ctx.lineTo(m,n),this.ctx.lineTo(e,n),this.ctx.lineTo(e,f),this.ctx.closePath();break;case l.moveTo:e=b[h++],f=b[h++],c.moveTo(e,f);break;case l.lineTo:e=b[h++],f=b[h++],c.lineTo(e,f);break;case l.curveTo:e=b[h+4],f=b[h+5],c.bezierCurveTo(b[h],b[h+1],b[h+2],b[h+3],e,f),h+=6;break;case l.curveTo2:c.bezierCurveTo(e,f,b[h],b[h+1],b[h+2],b[h+3]),e=b[h+2],f=b[h+3],h+=4;break;case l.curveTo3:e=b[h+2],f=b[h+3],c.bezierCurveTo(b[h],b[h+1],e,f,e,f),h+=4;break;case l.closePath:c.closePath()}d.setCurrentPoint(e,f)},closePath:function(){this.ctx.closePath()},stroke:function(a){a="undefined"!=typeof a?a:!0;var b=this.ctx,c=this.current.strokeColor;
// Prevent drawing too thin lines by enforcing a minimum line width.
b.lineWidth=Math.max(this.getSinglePixelWidth()*E,this.current.lineWidth),
// For stroke we want to temporarily change the global alpha to the
// stroking alpha.
b.globalAlpha=this.current.strokeAlpha,c&&c.hasOwnProperty("type")&&"Pattern"===c.type?(
// for patterns, we transform to pattern space, calculate
// the pattern, call stroke, and restore to user space
b.save(),b.strokeStyle=c.getPattern(b,this),b.stroke(),b.restore()):b.stroke(),a&&this.consumePath(),
// Restore the global alpha to the fill alpha
b.globalAlpha=this.current.fillAlpha},closeStroke:function(){this.closePath(),this.stroke()},fill:function(a){a="undefined"!=typeof a?a:!0;var b=this.ctx,c=this.current.fillColor,d=this.current.patternFill,e=!1;d&&(b.save(),this.baseTransform&&b.setTransform.apply(b,this.baseTransform),b.fillStyle=c.getPattern(b,this),e=!0),this.pendingEOFill?(void 0!==b.mozFillRule?(b.mozFillRule="evenodd",b.fill(),b.mozFillRule="nonzero"):b.fill("evenodd"),this.pendingEOFill=!1):b.fill(),e&&b.restore(),a&&this.consumePath()},eoFill:function(){this.pendingEOFill=!0,this.fill()},fillStroke:function(){this.fill(!1),this.stroke(!1),this.consumePath()},eoFillStroke:function(){this.pendingEOFill=!0,this.fillStroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},closeEOFillStroke:function(){this.pendingEOFill=!0,this.closePath(),this.fillStroke()},endPath:function(){this.consumePath()},
// Clipping
clip:function(){this.pendingClip=R},eoClip:function(){this.pendingClip=S},
// Text
beginText:function(){this.current.textMatrix=j,this.current.textMatrixScale=1,this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},endText:function(){var a=this.pendingTextPaths,b=this.ctx;if(void 0===a)return void b.beginPath();b.save(),b.beginPath();for(var c=0;c<a.length;c++){var d=a[c];b.setTransform.apply(b,d.transform),b.translate(d.x,d.y),d.addToPath(b,d.fontSize)}b.restore(),b.clip(),b.beginPath(),delete this.pendingTextPaths},setCharSpacing:function(a){this.current.charSpacing=a},setWordSpacing:function(a){this.current.wordSpacing=a},setHScale:function(a){this.current.textHScale=a/100},setLeading:function(a){this.current.leading=-a},setFont:function(a,b){var c=this.commonObjs.get(a),d=this.current;if(c||u("Can't find font for "+a),d.fontMatrix=c.fontMatrix?c.fontMatrix:i,
// A valid matrix needs all main diagonal elements to be non-zero
// This also ensures we bypass FF bugzilla bug #719844.
0!==d.fontMatrix[0]&&0!==d.fontMatrix[3]||w("Invalid font matrix for font "+a),
// The spec for Tf (setFont) says that 'size' specifies the font 'scale',
// and in some docs this can be negative (inverted x-y axes).
0>b?(b=-b,d.fontDirection=-1):d.fontDirection=1,this.current.font=c,this.current.fontSize=b,!c.isType3Font){var e=c.loadedName||"sans-serif",f=c.black?c.bold?"900":"bold":c.bold?"bold":"normal",g=c.italic?"italic":"normal",h='"'+e+'", '+c.fallbackName,j=B>b?B:b>C?C:b;this.current.fontSizeScale=b/j;var k=g+" "+f+" "+j+"px "+h;this.ctx.font=k}},setTextRenderingMode:function(a){this.current.textRenderingMode=a},setTextRise:function(a){this.current.textRise=a},moveText:function(a,b){this.current.x=this.current.lineX+=a,this.current.y=this.current.lineY+=b},setLeadingMoveText:function(a,b){this.setLeading(-b),this.moveText(a,b)},setTextMatrix:function(a,b,c,d,e,f){this.current.textMatrix=[a,b,c,d,e,f],this.current.textMatrixScale=Math.sqrt(a*a+b*b),this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},nextLine:function(){this.moveText(0,this.current.leading)},paintChar:function(a,b,c){var d,e=this.ctx,f=this.current,g=f.font,h=f.textRenderingMode,i=f.fontSize/f.fontSizeScale,j=h&m.FILL_STROKE_MASK,k=!!(h&m.ADD_TO_PATH_FLAG);if((g.disableFontFace||k)&&(d=g.getPathGenerator(this.commonObjs,a)),g.disableFontFace?(e.save(),e.translate(b,c),e.beginPath(),d(e,i),j!==m.FILL&&j!==m.FILL_STROKE||e.fill(),j!==m.STROKE&&j!==m.FILL_STROKE||e.stroke(),e.restore()):(j!==m.FILL&&j!==m.FILL_STROKE||e.fillText(a,b,c),j!==m.STROKE&&j!==m.FILL_STROKE||e.strokeText(a,b,c)),k){var l=this.pendingTextPaths||(this.pendingTextPaths=[]);l.push({transform:e.mozCurrentTransform,x:b,y:c,fontSize:i,addToPath:d})}},get isFontSubpixelAAEnabled(){
// Checks if anti-aliasing is enabled when scaled text is painted.
// On Windows GDI scaled fonts looks bad.
var a=document.createElement("canvas").getContext("2d");a.scale(1.5,1),a.fillText("I",0,10);for(var b=a.getImageData(0,0,10,10).data,c=!1,d=3;d<b.length;d+=4)if(b[d]>0&&b[d]<255){c=!0;break}return v(this,"isFontSubpixelAAEnabled",c)},showText:function(a){var b=this.current,c=b.font;if(c.isType3Font)return this.showType3Text(a);var d=b.fontSize;if(0!==d){var e=this.ctx,f=b.fontSizeScale,g=b.charSpacing,h=b.wordSpacing,i=b.fontDirection,j=b.textHScale*i,k=a.length,l=c.vertical,n=l?1:-1,o=c.defaultVMetrics,p=d*b.fontMatrix[0],q=b.textRenderingMode===m.FILL&&!c.disableFontFace;e.save(),e.transform.apply(e,b.textMatrix),e.translate(b.x,b.y+b.textRise),b.patternFill&&(
// TODO: Some shading patterns are not applied correctly to text,
//       e.g. issues 3988 and 5432, and ShowText-ShadingPattern.pdf.
e.fillStyle=b.fillColor.getPattern(e,this)),i>0?e.scale(j,-1):e.scale(j,1);var s=b.lineWidth,t=b.textMatrixScale;if(0===t||0===s){var u=b.textRenderingMode&m.FILL_STROKE_MASK;u!==m.STROKE&&u!==m.FILL_STROKE||(this.cachedGetSinglePixelWidth=null,s=this.getSinglePixelWidth()*E)}else s/=t;1!==f&&(e.scale(f,f),s/=f),e.lineWidth=s;var v,w=0;for(v=0;k>v;++v){var x=a[v];if(r(x))w+=n*x*d/1e3;else{var y,z,A,B,C=!1,D=(x.isSpace?h:0)+g,F=x.fontChar,G=x.accent,H=x.width;if(l){var I,J,K;I=x.vmetric||o,J=x.vmetric?I[1]:.5*H,J=-J*p,K=I[2]*p,H=I?-I[0]:H,y=J/f,z=(w+K)/f}else y=w/f,z=0;if(c.remeasure&&H>0){
// Some standard fonts may not have the exact width: rescale per
// character if measured width is greater than expected glyph width
// and subpixel-aa is enabled, otherwise just center the glyph.
var L=1e3*e.measureText(F).width/d*f;if(L>H&&this.isFontSubpixelAAEnabled){var M=H/L;C=!0,e.save(),e.scale(M,1),y/=M}else H!==L&&(y+=(H-L)/2e3*d/f)}
// Only attempt to draw the glyph if it is actually in the embedded font
// file or if there isn't a font file so the fallback font is shown.
(x.isInFont||c.missingFile)&&(q&&!G?
// common case
e.fillText(F,y,z):(this.paintChar(F,y,z),G&&(A=y+G.offset.x/f,B=z-G.offset.y/f,this.paintChar(G.fontChar,A,B))));var N=H*p+D*i;w+=N,C&&e.restore()}}l?b.y-=w*j:b.x+=w*j,e.restore()}},showType3Text:function(a){
// Type3 fonts - each glyph is a "mini-PDF"
var b,c,d,e,f=this.ctx,g=this.current,h=g.font,j=g.fontSize,k=g.fontDirection,l=h.vertical?1:-1,n=g.charSpacing,p=g.wordSpacing,q=g.textHScale*k,s=g.fontMatrix||i,t=a.length,u=g.textRenderingMode===m.INVISIBLE;if(!u&&0!==j){for(this.cachedGetSinglePixelWidth=null,f.save(),f.transform.apply(f,g.textMatrix),f.translate(g.x,g.y),f.scale(q,k),b=0;t>b;++b)if(c=a[b],r(c))e=l*c*j/1e3,this.ctx.translate(e,0),g.x+=e*q;else{var v=(c.isSpace?p:0)+n,x=h.charProcOperatorList[c.operatorListId];if(x){this.processingType3=c,this.save(),f.scale(j,j),f.transform.apply(f,s),this.executeOperatorList(x),this.restore();var y=o.applyTransform([c.width,0],s);d=y[0]*j+v,f.translate(d,0),g.x+=d*q}else w('Type3 character "'+c.operatorListId+'" is not available')}f.restore(),this.processingType3=null}},
// Type3 fonts
setCharWidth:function(a,b){},setCharWidthAndBounds:function(a,b,c,d,e,f){
// TODO According to the spec we're also suppose to ignore any operators
// that set color or include images while processing this type3 font.
this.ctx.rect(c,d,e-c,f-d),this.clip(),this.endPath()},
// Color
getColorN_Pattern:function(b){var c;if("TilingPattern"===b[0]){var d=b[1],e=this.baseTransform||this.ctx.mozCurrentTransform.slice(),f=this,g={createCanvasGraphics:function(b){return new a(b,f.commonObjs,f.objs)}};c=new x(b,d,this.ctx,g,e)}else c=y(b);return c},setStrokeColorN:function(){this.current.strokeColor=this.getColorN_Pattern(arguments)},setFillColorN:function(){this.current.fillColor=this.getColorN_Pattern(arguments),this.current.patternFill=!0},setStrokeRGBColor:function(a,b,c){var d=o.makeCssRgb(a,b,c);this.ctx.strokeStyle=d,this.current.strokeColor=d},setFillRGBColor:function(a,b,c){var d=o.makeCssRgb(a,b,c);this.ctx.fillStyle=d,this.current.fillColor=d,this.current.patternFill=!1},shadingFill:function(a){var b=this.ctx;this.save();var c=y(a);b.fillStyle=c.getPattern(b,this,!0);var d=b.mozCurrentTransformInverse;if(d){var e=b.canvas,f=e.width,g=e.height,h=o.applyTransform([0,0],d),i=o.applyTransform([0,g],d),j=o.applyTransform([f,0],d),k=o.applyTransform([f,g],d),l=Math.min(h[0],i[0],j[0],k[0]),m=Math.min(h[1],i[1],j[1],k[1]),n=Math.max(h[0],i[0],j[0],k[0]),p=Math.max(h[1],i[1],j[1],k[1]);this.ctx.fillRect(l,m,n-l,p-m)}else
// HACK to draw the gradient onto an infinite rectangle.
// PDF gradients are drawn across the entire image while
// Canvas only allows gradients to be drawn in a rectangle
// The following bug should allow us to remove this.
// https://bugzilla.mozilla.org/show_bug.cgi?id=664884
this.ctx.fillRect(-1e10,-1e10,2e10,2e10);this.restore()},
// Images
beginInlineImage:function(){u("Should not call beginInlineImage")},beginImageData:function(){u("Should not call beginImageData")},paintFormXObjectBegin:function(a,b){if(this.save(),this.baseTransformStack.push(this.baseTransform),s(a)&&6===a.length&&this.transform.apply(this,a),this.baseTransform=this.ctx.mozCurrentTransform,s(b)&&4===b.length){var c=b[2]-b[0],d=b[3]-b[1];this.ctx.rect(b[0],b[1],c,d),this.clip(),this.endPath()}},paintFormXObjectEnd:function(){this.restore(),this.baseTransform=this.baseTransformStack.pop()},beginGroup:function(a){this.save();var b=this.ctx;
// TODO non-isolated groups - according to Rik at adobe non-isolated
// group results aren't usually that different and they even have tools
// that ignore this setting. Notes from Rik on implmenting:
// - When you encounter an transparency group, create a new canvas with
// the dimensions of the bbox
// - copy the content from the previous canvas to the new canvas
// - draw as usual
// - remove the backdrop alpha:
// alphaNew = 1 - (1 - alpha)/(1 - alphaBackdrop) with 'alpha' the alpha
// value of your transparency group and 'alphaBackdrop' the alpha of the
// backdrop
// - remove background color:
// colorNew = color - alphaNew *colorBackdrop /(1 - alphaNew)
a.isolated||q("TODO: Support non-isolated groups."),
// TODO knockout - supposedly possible with the clever use of compositing
// modes.
a.knockout&&w("Knockout groups not supported.");var c=b.mozCurrentTransform;a.matrix&&b.transform.apply(b,a.matrix),p(a.bbox,"Bounding box is required.");
// Based on the current transform figure out how big the bounding box
// will actually be.
var e=o.getAxialAlignedBoundingBox(a.bbox,b.mozCurrentTransform),f=[0,0,b.canvas.width,b.canvas.height];e=o.intersect(e,f)||[0,0,0,0];
// Use ceil in case we're between sizes so we don't create canvas that is
// too small and make the canvas at least 1x1 pixels.
var g=Math.floor(e[0]),h=Math.floor(e[1]),i=Math.max(Math.ceil(e[2])-g,1),j=Math.max(Math.ceil(e[3])-h,1),k=1,l=1;i>D&&(k=i/D,i=D),j>D&&(l=j/D,j=D);var m="groupAt"+this.groupLevel;a.smask&&(
// Using two cache entries is case if masks are used one after another.
m+="_smask_"+this.smaskCounter++%2);var n=this.cachedCanvases.getCanvas(m,i,j,!0),r=n.context;
// Since we created a new canvas that is just the size of the bounding box
// we have to translate the group ctx.
r.scale(1/k,1/l),r.translate(-g,-h),r.transform.apply(r,c),a.smask?
// Saving state and cached mask to be used in setGState.
this.smaskStack.push({canvas:n.canvas,context:r,offsetX:g,offsetY:h,scaleX:k,scaleY:l,subtype:a.smask.subtype,backdrop:a.smask.backdrop,transferMap:a.smask.transferMap||null,startTransformInverse:null}):(
// Setup the current ctx so when the group is popped we draw it at the
// right location.
b.setTransform(1,0,0,1,0,0),b.translate(g,h),b.scale(k,l)),
// The transparency group inherits all off the current graphics state
// except the blend mode, soft mask, and alpha constants.
d(b,r),this.ctx=r,this.setGState([["BM","Normal"],["ca",1],["CA",1]]),this.groupStack.push(b),this.groupLevel++,
// Reseting mask state, masks will be applied on restore of the group.
this.current.activeSMask=null},endGroup:function(a){this.groupLevel--;var b=this.ctx;this.ctx=this.groupStack.pop(),
// Turn off image smoothing to avoid sub pixel interpolation which can
// look kind of blurry for some pdfs.
void 0!==this.ctx.imageSmoothingEnabled?this.ctx.imageSmoothingEnabled=!1:this.ctx.mozImageSmoothingEnabled=!1,a.smask?this.tempSMask=this.smaskStack.pop():this.ctx.drawImage(b.canvas,0,0),this.restore()},beginAnnotations:function(){this.save(),this.current=new L,this.baseTransform&&this.ctx.setTransform.apply(this.ctx,this.baseTransform)},endAnnotations:function(){this.restore()},beginAnnotation:function(a,b,c){if(this.save(),s(a)&&4===a.length){var d=a[2]-a[0],e=a[3]-a[1];this.ctx.rect(a[0],a[1],d,e),this.clip(),this.endPath()}this.transform.apply(this,b),this.transform.apply(this,c)},endAnnotation:function(){this.restore()},paintJpegXObject:function(a,b,c){var d=this.objs.get(a);if(!d)return void w("Dependent image isn't ready yet");this.save();var e=this.ctx;if(
// scale the image to the unit square
e.scale(1/b,-1/c),e.drawImage(d,0,0,d.width,d.height,0,-c,b,c),this.imageLayer){var f=e.mozCurrentTransformInverse,g=this.getCanvasPosition(0,0);this.imageLayer.appendImage({objId:a,left:g[0],top:g[1],width:b/f[0],height:c/f[3]})}this.restore()},paintImageMaskXObject:function(a){var b=this.ctx,d=a.width,e=a.height,f=this.current.fillColor,g=this.current.patternFill,i=this.processingType3;if(F&&i&&void 0===i.compiled&&(G>=d&&G>=e?i.compiled=h({data:a.data,width:d,height:e}):i.compiled=null),i&&i.compiled)return void i.compiled(b);var j=this.cachedCanvases.getCanvas("maskCanvas",d,e),k=j.context;k.save(),c(k,a),k.globalCompositeOperation="source-in",k.fillStyle=g?f.getPattern(k,this):f,k.fillRect(0,0,d,e),k.restore(),this.paintInlineImageXObject(j.canvas)},paintImageMaskXObjectRepeat:function(a,b,d,e){var f=a.width,g=a.height,h=this.current.fillColor,i=this.current.patternFill,j=this.cachedCanvases.getCanvas("maskCanvas",f,g),k=j.context;k.save(),c(k,a),k.globalCompositeOperation="source-in",k.fillStyle=i?h.getPattern(k,this):h,k.fillRect(0,0,f,g),k.restore();for(var l=this.ctx,m=0,n=e.length;n>m;m+=2)l.save(),l.transform(b,0,0,d,e[m],e[m+1]),l.scale(1,-1),l.drawImage(j.canvas,0,0,f,g,0,-1,1,1),l.restore()},paintImageMaskXObjectGroup:function(a){for(var b=this.ctx,d=this.current.fillColor,e=this.current.patternFill,f=0,g=a.length;g>f;f++){var h=a[f],i=h.width,j=h.height,k=this.cachedCanvases.getCanvas("maskCanvas",i,j),l=k.context;l.save(),c(l,h),l.globalCompositeOperation="source-in",l.fillStyle=e?d.getPattern(l,this):d,l.fillRect(0,0,i,j),l.restore(),b.save(),b.transform.apply(b,h.transform),b.scale(1,-1),b.drawImage(k.canvas,0,0,i,j,0,-1,1,1),b.restore()}},paintImageXObject:function(a){var b=this.objs.get(a);return b?void this.paintInlineImageXObject(b):void w("Dependent image isn't ready yet")},paintImageXObjectRepeat:function(a,b,c,d){var e=this.objs.get(a);if(!e)return void w("Dependent image isn't ready yet");for(var f=e.width,g=e.height,h=[],i=0,j=d.length;j>i;i+=2)h.push({transform:[b,0,0,c,d[i],d[i+1]],x:0,y:0,w:f,h:g});this.paintInlineImageXObjectGroup(e,h)},paintInlineImageXObject:function(a){var c=a.width,d=a.height,e=this.ctx;this.save(),
// scale the image to the unit square
e.scale(1/c,-1/d);var f,g,h=e.mozCurrentTransformInverse,i=h[0],j=h[1],k=Math.max(Math.sqrt(i*i+j*j),1),l=h[2],m=h[3],n=Math.max(Math.sqrt(l*l+m*m),1);
// instanceof HTMLElement does not work in jsdom node.js module
if(a instanceof HTMLElement||!a.data)f=a;else{g=this.cachedCanvases.getCanvas("inlineImage",c,d);var o=g.context;b(o,a),f=g.canvas}
// Vertial or horizontal scaling shall not be more than 2 to not loose the
// pixels during drawImage operation, painting on the temporary canvas(es)
// that are twice smaller in size
for(var p=c,q=d,r="prescale1";k>2&&p>1||n>2&&q>1;){var s=p,t=q;k>2&&p>1&&(s=Math.ceil(p/2),k/=p/s),n>2&&q>1&&(t=Math.ceil(q/2),n/=q/t),g=this.cachedCanvases.getCanvas(r,s,t),o=g.context,o.clearRect(0,0,s,t),o.drawImage(f,0,0,p,q,0,0,s,t),f=g.canvas,p=s,q=t,r="prescale1"===r?"prescale2":"prescale1"}if(e.drawImage(f,0,0,p,q,0,-d,c,d),this.imageLayer){var u=this.getCanvasPosition(0,-d);this.imageLayer.appendImage({imgData:a,left:u[0],top:u[1],width:c/h[0],height:d/h[3]})}this.restore()},paintInlineImageXObjectGroup:function(a,c){var d=this.ctx,e=a.width,f=a.height,g=this.cachedCanvases.getCanvas("inlineImage",e,f),h=g.context;b(h,a);for(var i=0,j=c.length;j>i;i++){var k=c[i];if(d.save(),d.transform.apply(d,k.transform),d.scale(1,-1),d.drawImage(g.canvas,k.x,k.y,k.w,k.h,0,-1,1,1),this.imageLayer){var l=this.getCanvasPosition(k.x,k.y);this.imageLayer.appendImage({imgData:a,left:l[0],top:l[1],width:e,height:f})}d.restore()}},paintSolidColorImageMask:function(){this.ctx.fillRect(0,0,1,1)},paintXObject:function(){w("Unsupported 'paintXObject' command.")},
// Marked content
markPoint:function(a){},markPointProps:function(a,b){},beginMarkedContent:function(a){},beginMarkedContentProps:function(a,b){},endMarkedContent:function(){},
// Compatibility
beginCompat:function(){},endCompat:function(){},
// Helper functions
consumePath:function(){var a=this.ctx;this.pendingClip&&(this.pendingClip===S?void 0!==a.mozFillRule?(a.mozFillRule="evenodd",a.clip(),a.mozFillRule="nonzero"):a.clip("evenodd"):a.clip(),this.pendingClip=null),a.beginPath()},getSinglePixelWidth:function(a){if(null===this.cachedGetSinglePixelWidth){var b=this.ctx.mozCurrentTransformInverse;
// max of the current horizontal and vertical scale
this.cachedGetSinglePixelWidth=Math.sqrt(Math.max(b[0]*b[0]+b[1]*b[1],b[2]*b[2]+b[3]*b[3]))}return this.cachedGetSinglePixelWidth},getCanvasPosition:function(a,b){var c=this.ctx.mozCurrentTransform;return[c[0]*a+c[2]*b+c[4],c[1]*a+c[3]*b+c[5]]}};for(var T in l)a.prototype[l[T]]=a.prototype[T];return a}();a.CanvasGraphics=M,a.createScratchCanvas=f}),function(a,b){b(a.pdfjsDisplayAPI={},a.pdfjsSharedUtil,a.pdfjsDisplayFontLoader,a.pdfjsDisplayCanvas,a.pdfjsDisplayMetadata,a.pdfjsDisplayDOMUtils)}(this,function(a,e,f,g,h,i,j){/**
 * Document initialization / loading parameters object.
 *
 * @typedef {Object} DocumentInitParameters
 * @property {string}     url   - The URL of the PDF.
 * @property {TypedArray|Array|string} data - Binary PDF data. Use typed arrays
 *   (Uint8Array) to improve the memory usage. If PDF data is BASE64-encoded,
 *   use atob() to convert it to a binary string first.
 * @property {Object}     httpHeaders - Basic authentication headers.
 * @property {boolean}    withCredentials - Indicates whether or not cross-site
 *   Access-Control requests should be made using credentials such as cookies
 *   or authorization headers. The default is false.
 * @property {string}     password - For decrypting password-protected PDFs.
 * @property {TypedArray} initialData - A typed array with the first portion or
 *   all of the pdf data. Used by the extension since some data is already
 *   loaded before the switch to range requests.
 * @property {number}     length - The PDF file length. It's used for progress
 *   reports and range requests operations.
 * @property {PDFDataRangeTransport} range
 * @property {number}     rangeChunkSize - Optional parameter to specify
 *   maximum number of bytes fetched per range request. The default value is
 *   2^16 = 65536.
 * @property {PDFWorker}  worker - The worker that will be used for the loading
 *   and parsing of the PDF data.
 */
/**
 * @typedef {Object} PDFDocumentStats
 * @property {Array} streamTypes - Used stream types in the document (an item
 *   is set to true if specific stream ID was used in the document).
 * @property {Array} fontTypes - Used font type in the document (an item is set
 *   to true if specific font ID was used in the document).
 */
/**
 * This is the main entry point for loading a PDF and interacting with it.
 * NOTE: If a URL is used to fetch the PDF data a standard XMLHttpRequest(XHR)
 * is used, which means it must follow the same origin rules that any XHR does
 * e.g. No cross domain requests without CORS.
 *
 * @param {string|TypedArray|DocumentInitParameters|PDFDataRangeTransport} src
 * Can be a url to where a PDF is located, a typed array (Uint8Array)
 * already populated with data or parameter object.
 *
 * @param {PDFDataRangeTransport} pdfDataRangeTransport (deprecated) It is used
 * if you want to manually serve range requests for data in the PDF.
 *
 * @param {function} passwordCallback (deprecated) It is used to request a
 * password if wrong or no password was provided. The callback receives two
 * parameters: function that needs to be called with new password and reason
 * (see {PasswordResponses}).
 *
 * @param {function} progressCallback (deprecated) It is used to be able to
 * monitor the loading progress of the PDF file (necessary to implement e.g.
 * a loading bar). The callback receives an {Object} with the properties:
 * {number} loaded and {number} total.
 *
 * @return {PDFDocumentLoadingTask}
 */
function k(a,b,c,d){var e=new U;
// Support of the obsolete arguments (for compatibility with API v1.0)
arguments.length>1&&z("getDocument is called with pdfDataRangeTransport, passwordCallback or progressCallback argument"),b&&(b instanceof V||(b=Object.create(b),b.length=a.length,b.initialData=a.initialData,b.abort||(b.abort=function(){})),a=Object.create(a),a.range=b),e.onPassword=c||null,e.onProgress=d||null;var f;"string"==typeof a?f={url:a}:C(a)?f={data:a}:a instanceof V?f={range:a}:("object"!=typeof a&&y("Invalid parameter in getDocument, need either Uint8Array, string or a parameter object"),a.url||a.data||a.range||y("Invalid parameter object: need either .data, .range or .url"),f=a);var g={},h=null,i=null;for(var j in f)if("url"!==j||"undefined"==typeof window)if("range"!==j)if("worker"!==j)if("data"!==j||f[j]instanceof Uint8Array)g[j]=f[j];else{
// Converting string or array-like data to Uint8Array.
var k=f[j];"string"==typeof k?g[j]=F(k):"object"!=typeof k||null===k||isNaN(k.length)?C(k)?g[j]=new Uint8Array(k):y("Invalid PDF binary data: either typed array, string or array-like object is expected in the data property."):g[j]=new Uint8Array(k)}else i=f[j];else h=f[j];else
// The full path is required in the 'url' field.
g[j]=new URL(f[j],window.location).href;g.rangeChunkSize=g.rangeChunkSize||O,i||(i=new Y,e._worker=i);var m=e.docId;return i.promise.then(function(){if(e.destroyed)throw new Error("Loading aborted");return l(i,g,h,m).then(function(a){if(e.destroyed)throw new Error("Loading aborted");var b=new o(m,a,i.port),c=new Z(b,e,h);e._transport=c,b.send("Ready",null)})})["catch"](e._capability.reject),e}/**
 * Starts fetching of specified PDF document/data.
 * @param {PDFWorker} worker
 * @param {Object} source
 * @param {PDFDataRangeTransport} pdfDataRangeTransport
 * @param {string} docId Unique document id, used as MessageHandler id.
 * @returns {Promise} The promise, which is resolved when worker id of
 *                    MessageHandler is known.
 * @private
 */
function l(a,b,c,d){return a.destroyed?Promise.reject(new Error("Worker was destroyed")):(b.disableAutoFetch=N("disableAutoFetch"),b.disableStream=N("disableStream"),b.chunkedViewerLoading=!!c,c&&(b.length=c.length,b.initialData=c.initialData),a.messageHandler.sendWithPromise("GetDocRequest",{docId:d,source:b,disableRange:N("disableRange"),maxImageSize:N("maxImageSize"),cMapUrl:N("cMapUrl"),cMapPacked:N("cMapPacked"),disableFontFace:N("disableFontFace"),disableCreateObjectURL:N("disableCreateObjectURL"),postMessageTransfers:N("postMessageTransfers")&&!Q}).then(function(b){if(a.destroyed)throw new Error("Worker was destroyed");return b}))}var m,n=e.InvalidPDFException,o=e.MessageHandler,p=e.MissingPDFException,q=e.PageViewport,r=e.PasswordResponses,s=e.PasswordException,t=e.StatTimer,u=e.UnexpectedResponseException,v=e.UnknownErrorException,w=e.Util,x=e.createPromiseCapability,y=e.error,z=e.deprecated,A=e.getVerbosityLevel,B=e.info,C=e.isArrayBuffer,D=e.isSameOrigin,E=e.loadJpegStream,F=e.stringToBytes,G=e.globalScope,H=e.warn,I=f.FontFaceObject,J=f.FontLoader,K=g.CanvasGraphics,L=g.createScratchCanvas,M=h.Metadata,N=i.getDefaultSetting,O=65536,P=!1,Q=!1,R=!1;"undefined"==typeof window&&(P=!0,"undefined"==typeof require.ensure&&(require.ensure=require("node-ensure")),R=!0),"undefined"!=typeof __webpack_require__&&(R=!0),"undefined"!=typeof requirejs&&requirejs.toUrl&&(m=requirejs.toUrl("pdfjs-dist/build/pdf.worker.js"));var S="undefined"!=typeof requirejs&&requirejs.load,T=R?function(a){require.ensure([],function(){var b=require("./pdf.worker.js");a(b.WorkerMessageHandler)})}:S?function(a){requirejs(["pdfjs-dist/build/pdf.worker"],function(b){a(b.WorkerMessageHandler)})}:null,U=function(){/** @constructs PDFDocumentLoadingTask */
function a(){this._capability=x(),this._transport=null,this._worker=null,/**
     * Unique document loading task id -- used in MessageHandlers.
     * @type {string}
     */
this.docId="d"+b++,/**
     * Shows if loading task is destroyed.
     * @type {boolean}
     */
this.destroyed=!1,/**
     * Callback to request a password if wrong or no password was provided.
     * The callback receives two parameters: function that needs to be called
     * with new password and reason (see {PasswordResponses}).
     */
this.onPassword=null,/**
     * Callback to be able to monitor the loading progress of the PDF file
     * (necessary to implement e.g. a loading bar). The callback receives
     * an {Object} with the properties: {number} loaded and {number} total.
     */
this.onProgress=null,/**
     * Callback to when unsupported feature is used. The callback receives
     * an {UNSUPPORTED_FEATURES} argument.
     */
this.onUnsupportedFeature=null}var b=0;/** @lends PDFDocumentLoadingTask.prototype */
return a.prototype={/**
     * @return {Promise}
     */
get promise(){return this._capability.promise},/**
     * Aborts all network requests and destroys worker.
     * @return {Promise} A promise that is resolved after destruction activity
     *                   is completed.
     */
destroy:function(){this.destroyed=!0;var a=this._transport?this._transport.destroy():Promise.resolve();return a.then(function(){this._transport=null,this._worker&&(this._worker.destroy(),this._worker=null)}.bind(this))},/**
     * Registers callbacks to indicate the document loading completion.
     *
     * @param {function} onFulfilled The callback for the loading completion.
     * @param {function} onRejected The callback for the loading failure.
     * @return {Promise} A promise that is resolved after the onFulfilled or
     *                   onRejected callback.
     */
then:function(a,b){return this.promise.then.apply(this.promise,arguments)}},a}(),V=function(){function a(a,b){this.length=a,this.initialData=b,this._rangeListeners=[],this._progressListeners=[],this._progressiveReadListeners=[],this._readyCapability=x()}/** @lends PDFDataRangeTransport.prototype */
return a.prototype={addRangeListener:function(a){this._rangeListeners.push(a)},addProgressListener:function(a){this._progressListeners.push(a)},addProgressiveReadListener:function(a){this._progressiveReadListeners.push(a)},onDataRange:function(a,b){for(var c=this._rangeListeners,d=0,e=c.length;e>d;++d)c[d](a,b)},onDataProgress:function(a){this._readyCapability.promise.then(function(){for(var b=this._progressListeners,c=0,d=b.length;d>c;++c)b[c](a)}.bind(this))},onDataProgressiveRead:function(a){this._readyCapability.promise.then(function(){for(var b=this._progressiveReadListeners,c=0,d=b.length;d>c;++c)b[c](a)}.bind(this))},transportReady:function(){this._readyCapability.resolve()},requestDataRange:function(a,b){throw new Error("Abstract method PDFDataRangeTransport.requestDataRange")},abort:function(){}},a}(),W=function(){function a(a,b,c){this.pdfInfo=a,this.transport=b,this.loadingTask=c}/** @lends PDFDocumentProxy.prototype */
return a.prototype={/**
     * @return {number} Total number of pages the PDF contains.
     */
get numPages(){return this.pdfInfo.numPages},/**
     * @return {string} A unique ID to identify a PDF. Not guaranteed to be
     * unique.
     */
get fingerprint(){return this.pdfInfo.fingerprint},/**
     * @param {number} pageNumber The page number to get. The first page is 1.
     * @return {Promise} A promise that is resolved with a {@link PDFPageProxy}
     * object.
     */
getPage:function(a){return this.transport.getPage(a)},/**
     * @param {{num: number, gen: number}} ref The page reference. Must have
     *   the 'num' and 'gen' properties.
     * @return {Promise} A promise that is resolved with the page index that is
     * associated with the reference.
     */
getPageIndex:function(a){return this.transport.getPageIndex(a)},/**
     * @return {Promise} A promise that is resolved with a lookup table for
     * mapping named destinations to reference numbers.
     *
     * This can be slow for large documents: use getDestination instead
     */
getDestinations:function(){return this.transport.getDestinations()},/**
     * @param {string} id The named destination to get.
     * @return {Promise} A promise that is resolved with all information
     * of the given named destination.
     */
getDestination:function(a){return this.transport.getDestination(a)},/**
     * @return {Promise} A promise that is resolved with:
     *   an Array containing the pageLabels that correspond to the pageIndexes,
     *   or `null` when no pageLabels are present in the PDF file.
     */
getPageLabels:function(){return this.transport.getPageLabels()},/**
     * @return {Promise} A promise that is resolved with a lookup table for
     * mapping named attachments to their content.
     */
getAttachments:function(){return this.transport.getAttachments()},/**
     * @return {Promise} A promise that is resolved with an array of all the
     * JavaScript strings in the name tree.
     */
getJavaScript:function(){return this.transport.getJavaScript()},/**
     * @return {Promise} A promise that is resolved with an {Array} that is a
     * tree outline (if it has one) of the PDF. The tree is in the format of:
     * [
     *  {
     *   title: string,
     *   bold: boolean,
     *   italic: boolean,
     *   color: rgb Uint8Array,
     *   dest: dest obj,
     *   url: string,
     *   items: array of more items like this
     *  },
     *  ...
     * ].
     */
getOutline:function(){return this.transport.getOutline()},/**
     * @return {Promise} A promise that is resolved with an {Object} that has
     * info and metadata properties.  Info is an {Object} filled with anything
     * available in the information dictionary and similarly metadata is a
     * {Metadata} object with information from the metadata section of the PDF.
     */
getMetadata:function(){return this.transport.getMetadata()},/**
     * @return {Promise} A promise that is resolved with a TypedArray that has
     * the raw data from the PDF.
     */
getData:function(){return this.transport.getData()},/**
     * @return {Promise} A promise that is resolved when the document's data
     * is loaded. It is resolved with an {Object} that contains the length
     * property that indicates size of the PDF data in bytes.
     */
getDownloadInfo:function(){return this.transport.downloadInfoCapability.promise},/**
     * @return {Promise} A promise this is resolved with current stats about
     * document structures (see {@link PDFDocumentStats}).
     */
getStats:function(){return this.transport.getStats()},/**
     * Cleans up resources allocated by the document, e.g. created @font-face.
     */
cleanup:function(){this.transport.startCleanup()},/**
     * Destroys current document instance and terminates worker.
     */
destroy:function(){return this.loadingTask.destroy()}},a}(),X=function(){function a(a,b,c){this.pageIndex=a,this.pageInfo=b,this.transport=c,this.stats=new t,this.stats.enabled=N("enableStats"),this.commonObjs=c.commonObjs,this.objs=new $,this.cleanupAfterRender=!1,this.pendingCleanup=!1,this.intentStates=Object.create(null),this.destroyed=!1}/** @lends PDFPageProxy.prototype */
return a.prototype={/**
     * @return {number} Page number of the page. First page is 1.
     */
get pageNumber(){return this.pageIndex+1},/**
     * @return {number} The number of degrees the page is rotated clockwise.
     */
get rotate(){return this.pageInfo.rotate},/**
     * @return {Object} The reference that points to this page. It has 'num' and
     * 'gen' properties.
     */
get ref(){return this.pageInfo.ref},/**
     * @return {Array} An array of the visible portion of the PDF page in the
     * user space units - [x1, y1, x2, y2].
     */
get view(){return this.pageInfo.view},/**
     * @param {number} scale The desired scale of the viewport.
     * @param {number} rotate Degrees to rotate the viewport. If omitted this
     * defaults to the page rotation.
     * @return {PageViewport} Contains 'width' and 'height' properties
     * along with transforms required for rendering.
     */
getViewport:function(a,b){return arguments.length<2&&(b=this.rotate),new q(this.view,a,b,0,0)},/**
     * @param {GetAnnotationsParameters} params - Annotation parameters.
     * @return {Promise} A promise that is resolved with an {Array} of the
     * annotation objects.
     */
getAnnotations:function(a){var b=a&&a.intent||null;return this.annotationsPromise&&this.annotationsIntent===b||(this.annotationsPromise=this.transport.getAnnotations(this.pageIndex,b),this.annotationsIntent=b),this.annotationsPromise},/**
     * Begins the process of rendering a page to the desired context.
     * @param {RenderParameters} params Page render parameters.
     * @return {RenderTask} An object that contains the promise, which
     *                      is resolved when the page finishes rendering.
     */
render:function(a){function b(a){var b=e.renderTasks.indexOf(f);b>=0&&e.renderTasks.splice(b,1),h.cleanupAfterRender&&(h.pendingCleanup=!0),h._tryCleanup(),a?f.capability.reject(a):f.capability.resolve(),c.timeEnd("Rendering"),c.timeEnd("Overall")}var c=this.stats;c.time("Overall"),
// If there was a pending destroy cancel it so no cleanup happens during
// this call to render.
this.pendingCleanup=!1;var d="print"===a.intent?"print":"display";this.intentStates[d]||(this.intentStates[d]=Object.create(null));var e=this.intentStates[d];
// If there's no displayReadyCapability yet, then the operatorList
// was never requested before. Make the request and create the promise.
e.displayReadyCapability||(e.receivingOperatorList=!0,e.displayReadyCapability=x(),e.operatorList={fnArray:[],argsArray:[],lastChunk:!1},this.stats.time("Page Request"),this.transport.messageHandler.send("RenderPageRequest",{pageIndex:this.pageNumber-1,intent:d}));var f=new aa(b,a,this.objs,this.commonObjs,e.operatorList,this.pageNumber);f.useRequestAnimationFrame="print"!==d,e.renderTasks||(e.renderTasks=[]),e.renderTasks.push(f);var g=f.task;
// Obsolete parameter support
a.continueCallback&&(z("render is used with continueCallback parameter"),g.onContinue=a.continueCallback);var h=this;return e.displayReadyCapability.promise.then(function(a){return h.pendingCleanup?void b():(c.time("Rendering"),f.initializeGraphics(a),void f.operatorListChanged())},function(a){b(a)}),g},/**
     * @return {Promise} A promise resolved with an {@link PDFOperatorList}
     * object that represents page's operator list.
     */
getOperatorList:function(){function a(){if(d.operatorList.lastChunk){d.opListReadCapability.resolve(d.operatorList);var a=d.renderTasks.indexOf(c);a>=0&&d.renderTasks.splice(a,1)}}var b="oplist";this.intentStates[b]||(this.intentStates[b]=Object.create(null));var c,d=this.intentStates[b];return d.opListReadCapability||(c={},c.operatorListChanged=a,d.receivingOperatorList=!0,d.opListReadCapability=x(),d.renderTasks=[],d.renderTasks.push(c),d.operatorList={fnArray:[],argsArray:[],lastChunk:!1},this.transport.messageHandler.send("RenderPageRequest",{pageIndex:this.pageIndex,intent:b})),d.opListReadCapability.promise},/**
     * @param {getTextContentParameters} params - getTextContent parameters.
     * @return {Promise} That is resolved a {@link TextContent}
     * object that represent the page text content.
     */
getTextContent:function(a){var b=a&&a.normalizeWhitespace||!1;return this.transport.messageHandler.sendWithPromise("GetTextContent",{pageIndex:this.pageNumber-1,normalizeWhitespace:b})},/**
     * Destroys page object.
     */
_destroy:function(){this.destroyed=!0,this.transport.pageCache[this.pageIndex]=null;var a=[];return Object.keys(this.intentStates).forEach(function(b){if("oplist"!==b){var c=this.intentStates[b];c.renderTasks.forEach(function(b){var c=b.capability.promise["catch"](function(){});// ignoring failures
a.push(c),b.cancel()})}},this),this.objs.clear(),this.annotationsPromise=null,this.pendingCleanup=!1,Promise.all(a)},/**
     * Cleans up resources allocated by the page. (deprecated)
     */
destroy:function(){z("page destroy method, use cleanup() instead"),this.cleanup()},/**
     * Cleans up resources allocated by the page.
     */
cleanup:function(){this.pendingCleanup=!0,this._tryCleanup()},/**
     * For internal use only. Attempts to clean up if rendering is in a state
     * where that's possible.
     * @ignore
     */
_tryCleanup:function(){this.pendingCleanup&&!Object.keys(this.intentStates).some(function(a){var b=this.intentStates[a];return 0!==b.renderTasks.length||b.receivingOperatorList},this)&&(Object.keys(this.intentStates).forEach(function(a){delete this.intentStates[a]},this),this.objs.clear(),this.annotationsPromise=null,this.pendingCleanup=!1)},/**
     * For internal use only.
     * @ignore
     */
_startRenderPage:function(a,b){var c=this.intentStates[b];
// TODO Refactor RenderPageRequest to separate rendering
// and operator list logic
c.displayReadyCapability&&c.displayReadyCapability.resolve(a)},/**
     * For internal use only.
     * @ignore
     */
_renderPageChunk:function(a,b){var c,d,e=this.intentStates[b];
// Add the new chunk to the current operator list.
for(c=0,d=a.length;d>c;c++)e.operatorList.fnArray.push(a.fnArray[c]),e.operatorList.argsArray.push(a.argsArray[c]);
// Notify all the rendering tasks there are more operators to be consumed.
for(e.operatorList.lastChunk=a.lastChunk,c=0;c<e.renderTasks.length;c++)e.renderTasks[c].operatorListChanged();a.lastChunk&&(e.receivingOperatorList=!1,this._tryCleanup())}},a}(),Y=function(){function a(){return"undefined"!=typeof m?m:N("workerSrc")?N("workerSrc"):d?d.replace(/\.js$/i,".worker.js"):void y("No PDFJS.workerSrc specified")}
// Loads worker code into main thread.
function b(){if(!f){f=x();
// In the developer build load worker_loader which in turn loads all the
// other files and resolves the promise. In production only the
// pdf.worker.js file is needed.
var b=T||function(b){w.loadScript(a(),function(){b(window.pdfjsDistBuildPdfWorker.WorkerMessageHandler)})};b(f.resolve)}return f.promise}function c(a){
// We will rely on blob URL's property to specify origin.
// We want this function to fail in case if createObjectURL or Blob do not
// exist or fail for some reason -- our Worker creation will fail anyway.
var b="importScripts('"+a+"');";return URL.createObjectURL(new Blob([b]))}function e(a){this.name=a,this.destroyed=!1,this._readyCapability=x(),this._port=null,this._webWorker=null,this._messageHandler=null,this._initialize()}var f,g=0;/** @lends PDFWorker.prototype */
return e.prototype={get promise(){return this._readyCapability.promise},get port(){return this._port},get messageHandler(){return this._messageHandler},_initialize:function(){
// If worker support isn't disabled explicit and the browser has worker
// support, create a new web worker and test if it/the browser fulfills
// all requirements to run parts of pdf.js in a web worker.
// Right now, the requirement is, that an Uint8Array is still an
// Uint8Array as it arrives on the worker. (Chrome added this with v.15.)
if(!P&&!N("disableWorker")&&"undefined"!=typeof Worker){var b=a();try{
// Wraps workerSrc path into blob URL, if the former does not belong
// to the same origin.
D(window.location.href,b)||(b=c(new URL(b,window.location).href));
// Some versions of FF can't create a worker on localhost, see:
// https://bugzilla.mozilla.org/show_bug.cgi?id=683280
var d=new Worker(b),e=new o("main","worker",d),f=function(){d.removeEventListener("error",g),e.destroy(),d.terminate(),this.destroyed?this._readyCapability.reject(new Error("Worker was destroyed")):
// Fall back to fake worker if the termination is caused by an
// error (e.g. NetworkError / SecurityError).
this._setupFakeWorker()}.bind(this),g=function(a){this._webWorker||
// Worker failed to initialize due to an error. Clean up and fall
// back to the fake worker.
f()}.bind(this);d.addEventListener("error",g),e.on("test",function(a){if(d.removeEventListener("error",g),this.destroyed)return void f();var b=a&&a.supportTypedArray;b?(this._messageHandler=e,this._port=d,this._webWorker=d,a.supportTransfers||(Q=!0),this._readyCapability.resolve(),
// Send global setting, e.g. verbosity level.
e.send("configure",{verbosity:A()})):(this._setupFakeWorker(),e.destroy(),d.terminate())}.bind(this)),e.on("console_log",function(a){console.log.apply(console,a)}),e.on("console_error",function(a){console.error.apply(console,a)}),e.on("ready",function(a){if(d.removeEventListener("error",g),this.destroyed)return void f();try{h()}catch(b){
// We need fallback to a faked worker.
this._setupFakeWorker()}}.bind(this));var h=function(){var a=N("postMessageTransfers")&&!Q,b=new Uint8Array([a?255:0]);
// Some versions of Opera throw a DATA_CLONE_ERR on serializing the
// typed array. Also, checking if we can use transfers.
try{e.send("test",b,[b.buffer])}catch(c){B("Cannot use postMessage transfers"),b[0]=0,e.send("test",b)}};
// It might take time for worker to initialize (especially when AMD
// loader is used). We will try to send test immediately, and then
// when 'ready' message will arrive. The worker shall process only
// first received 'test'.
return void h()}catch(i){B("The worker has been disabled.")}}
// Either workers are disabled, not supported or have thrown an exception.
// Thus, we fallback to a faked worker.
this._setupFakeWorker()},_setupFakeWorker:function(){P||N("disableWorker")||(H("Setting up fake worker."),P=!0),b().then(function(a){if(this.destroyed)return void this._readyCapability.reject(new Error("Worker was destroyed"));
// If we don't use a worker, just post/sendMessage to the main thread.
var b={_listeners:[],postMessage:function(a){var b={data:a};this._listeners.forEach(function(a){a.call(this,b)},this)},addEventListener:function(a,b){this._listeners.push(b)},removeEventListener:function(a,b){var c=this._listeners.indexOf(b);this._listeners.splice(c,1)},terminate:function(){}};this._port=b;
// All fake workers use the same port, making id unique.
var c="fake"+g++,d=new o(c+"_worker",c,b);a.setup(d,b);var e=new o(c,c+"_worker",b);this._messageHandler=e,this._readyCapability.resolve()}.bind(this))},/**
     * Destroys the worker instance.
     */
destroy:function(){this.destroyed=!0,this._webWorker&&(
// We need to terminate only web worker created resource.
this._webWorker.terminate(),this._webWorker=null),this._port=null,this._messageHandler&&(this._messageHandler.destroy(),this._messageHandler=null)}},e}(),Z=function(){function a(a,b,c){this.messageHandler=a,this.loadingTask=b,this.pdfDataRangeTransport=c,this.commonObjs=new $,this.fontLoader=new J(b.docId),this.destroyed=!1,this.destroyCapability=null,this.pageCache=[],this.pagePromises=[],this.downloadInfoCapability=x(),this.setupMessageHandler()}return a.prototype={destroy:function(){if(this.destroyCapability)return this.destroyCapability.promise;this.destroyed=!0,this.destroyCapability=x();var a=[];
// We need to wait for all renderings to be completed, e.g.
// timeout/rAF can take a long time.
this.pageCache.forEach(function(b){b&&a.push(b._destroy())}),this.pageCache=[],this.pagePromises=[];var b=this,c=this.messageHandler.sendWithPromise("Terminate",null);return a.push(c),Promise.all(a).then(function(){b.fontLoader.clear(),b.pdfDataRangeTransport&&(b.pdfDataRangeTransport.abort(),b.pdfDataRangeTransport=null),b.messageHandler&&(b.messageHandler.destroy(),b.messageHandler=null),b.destroyCapability.resolve()},this.destroyCapability.reject),this.destroyCapability.promise},setupMessageHandler:function(){function a(a){b.send("UpdatePassword",a)}var b=this.messageHandler,c=this.pdfDataRangeTransport;c&&(c.addRangeListener(function(a,c){b.send("OnDataRange",{begin:a,chunk:c})}),c.addProgressListener(function(a){b.send("OnDataProgress",{loaded:a})}),c.addProgressiveReadListener(function(a){b.send("OnDataRange",{chunk:a})}),b.on("RequestDataRange",function(a){c.requestDataRange(a.begin,a.end)},this)),b.on("GetDoc",function(a){var b=a.pdfInfo;this.numPages=a.pdfInfo.numPages;var c=this.loadingTask,d=new W(b,this,c);this.pdfDocument=d,c._capability.resolve(d)},this),b.on("NeedPassword",function(b){var c=this.loadingTask;return c.onPassword?c.onPassword(a,r.NEED_PASSWORD):void c._capability.reject(new s(b.message,b.code))},this),b.on("IncorrectPassword",function(b){var c=this.loadingTask;return c.onPassword?c.onPassword(a,r.INCORRECT_PASSWORD):void c._capability.reject(new s(b.message,b.code))},this),b.on("InvalidPDF",function(a){this.loadingTask._capability.reject(new n(a.message))},this),b.on("MissingPDF",function(a){this.loadingTask._capability.reject(new p(a.message))},this),b.on("UnexpectedResponse",function(a){this.loadingTask._capability.reject(new u(a.message,a.status))},this),b.on("UnknownError",function(a){this.loadingTask._capability.reject(new v(a.message,a.details))},this),b.on("DataLoaded",function(a){this.downloadInfoCapability.resolve(a)},this),b.on("PDFManagerReady",function(a){this.pdfDataRangeTransport&&this.pdfDataRangeTransport.transportReady()},this),b.on("StartRenderPage",function(a){if(!this.destroyed){var b=this.pageCache[a.pageIndex];b.stats.timeEnd("Page Request"),b._startRenderPage(a.transparency,a.intent)}},this),b.on("RenderPageChunk",function(a){if(!this.destroyed){var b=this.pageCache[a.pageIndex];b._renderPageChunk(a.operatorList,a.intent)}},this),b.on("commonobj",function(a){if(!this.destroyed){var b=a[0],c=a[1];if(!this.commonObjs.hasData(b))switch(c){case"Font":var d=a[2];if("error"in d){var e=d.error;H("Error during font loading: "+e),this.commonObjs.resolve(b,e);break}var f=null;N("pdfBug")&&G.FontInspector&&G.FontInspector.enabled&&(f={registerFont:function(a,b){G.FontInspector.fontAdded(a,b)}});var g=new I(d,{isEvalSuported:N("isEvalSupported"),disableFontFace:N("disableFontFace"),fontRegistry:f});this.fontLoader.bind([g],function(a){this.commonObjs.resolve(b,g)}.bind(this));break;case"FontPath":this.commonObjs.resolve(b,a[2]);break;default:y("Got unknown common object type "+c)}}},this),b.on("obj",function(a){if(!this.destroyed){var b,c=a[0],d=a[1],e=a[2],f=this.pageCache[d];if(!f.objs.hasData(c))switch(e){case"JpegStream":b=a[3],E(c,b,f.objs);break;case"Image":b=a[3],f.objs.resolve(c,b);
// heuristics that will allow not to store large data
var g=8e6;b&&"data"in b&&b.data.length>g&&(f.cleanupAfterRender=!0);break;default:y("Got unknown object type "+e)}}},this),b.on("DocProgress",function(a){if(!this.destroyed){var b=this.loadingTask;b.onProgress&&b.onProgress({loaded:a.loaded,total:a.total})}},this),b.on("PageError",function(a){if(!this.destroyed){var b=this.pageCache[a.pageNum-1],c=b.intentStates[a.intent];if(c.displayReadyCapability?c.displayReadyCapability.reject(a.error):y(a.error),c.operatorList){
// Mark operator list as complete.
c.operatorList.lastChunk=!0;for(var d=0;d<c.renderTasks.length;d++)c.renderTasks[d].operatorListChanged()}}},this),b.on("UnsupportedFeature",function(a){if(!this.destroyed){var b=a.featureId,c=this.loadingTask;c.onUnsupportedFeature&&c.onUnsupportedFeature(b),ba.notify(b)}},this),b.on("JpegDecode",function(a){if(this.destroyed)return Promise.reject("Worker was terminated");var b=a[0],c=a[1];return 3!==c&&1!==c?Promise.reject(new Error("Only 3 components or 1 component can be returned")):new Promise(function(a,d){var e=new Image;e.onload=function(){var b=e.width,d=e.height,f=b*d,g=4*f,h=new Uint8Array(f*c),i=L(b,d),j=i.getContext("2d");j.drawImage(e,0,0);var k,l,m=j.getImageData(0,0,b,d).data;if(3===c)for(k=0,l=0;g>k;k+=4,l+=3)h[l]=m[k],h[l+1]=m[k+1],h[l+2]=m[k+2];else if(1===c)for(k=0,l=0;g>k;k+=4,l++)h[l]=m[k];a({data:h,width:b,height:d})},e.onerror=function(){d(new Error("JpegDecode failed to load image"))},e.src=b})},this)},getData:function(){return this.messageHandler.sendWithPromise("GetData",null)},getPage:function(a,b){if(0>=a||a>this.numPages||(0|a)!==a)return Promise.reject(new Error("Invalid page request"));var c=a-1;if(c in this.pagePromises)return this.pagePromises[c];var d=this.messageHandler.sendWithPromise("GetPage",{pageIndex:c}).then(function(a){if(this.destroyed)throw new Error("Transport destroyed");var b=new X(c,a,this);return this.pageCache[c]=b,b}.bind(this));return this.pagePromises[c]=d,d},getPageIndex:function(a){return this.messageHandler.sendWithPromise("GetPageIndex",{ref:a})},getAnnotations:function(a,b){return this.messageHandler.sendWithPromise("GetAnnotations",{pageIndex:a,intent:b})},getDestinations:function(){return this.messageHandler.sendWithPromise("GetDestinations",null)},getDestination:function(a){return this.messageHandler.sendWithPromise("GetDestination",{id:a})},getPageLabels:function(){return this.messageHandler.sendWithPromise("GetPageLabels",null)},getAttachments:function(){return this.messageHandler.sendWithPromise("GetAttachments",null)},getJavaScript:function(){return this.messageHandler.sendWithPromise("GetJavaScript",null)},getOutline:function(){return this.messageHandler.sendWithPromise("GetOutline",null)},getMetadata:function(){return this.messageHandler.sendWithPromise("GetMetadata",null).then(function(a){return{info:a[0],metadata:a[1]?new M(a[1]):null}})},getStats:function(){return this.messageHandler.sendWithPromise("GetStats",null)},startCleanup:function(){this.messageHandler.sendWithPromise("Cleanup",null).then(function(){for(var a=0,b=this.pageCache.length;b>a;a++){var c=this.pageCache[a];c&&c.cleanup()}this.commonObjs.clear(),this.fontLoader.clear()}.bind(this))}},a}(),$=function(){function a(){this.objs=Object.create(null)}return a.prototype={/**
     * Internal function.
     * Ensures there is an object defined for `objId`.
     */
ensureObj:function(a){if(this.objs[a])return this.objs[a];var b={capability:x(),data:null,resolved:!1};return this.objs[a]=b,b},/**
     * If called *without* callback, this returns the data of `objId` but the
     * object needs to be resolved. If it isn't, this function throws.
     *
     * If called *with* a callback, the callback is called with the data of the
     * object once the object is resolved. That means, if you call this
     * function and the object is already resolved, the callback gets called
     * right away.
     */
get:function(a,b){
// If there is a callback, then the get can be async and the object is
// not required to be resolved right now
if(b)return this.ensureObj(a).capability.promise.then(b),null;
// If there isn't a callback, the user expects to get the resolved data
// directly.
var c=this.objs[a];
// If there isn't an object yet or the object isn't resolved, then the
// data isn't ready yet!
return c&&c.resolved||y("Requesting object that isn't resolved yet "+a),c.data},/**
     * Resolves the object `objId` with optional `data`.
     */
resolve:function(a,b){var c=this.ensureObj(a);c.resolved=!0,c.data=b,c.capability.resolve(b)},isResolved:function(a){var b=this.objs;return b[a]?b[a].resolved:!1},hasData:function(a){return this.isResolved(a)},/**
     * Returns the data of `objId` if object exists, null otherwise.
     */
getData:function(a){var b=this.objs;return b[a]&&b[a].resolved?b[a].data:null},clear:function(){this.objs=Object.create(null)}},a}(),_=function(){function a(a){this._internalRenderTask=a,/**
     * Callback for incremental rendering -- a function that will be called
     * each time the rendering is paused.  To continue rendering call the
     * function that is the first argument to the callback.
     * @type {function}
     */
this.onContinue=null}/** @lends RenderTask.prototype */
return a.prototype={/**
     * Promise for rendering task completion.
     * @return {Promise}
     */
get promise(){return this._internalRenderTask.capability.promise},/**
     * Cancels the rendering task. If the task is currently rendering it will
     * not be cancelled until graphics pauses with a timeout. The promise that
     * this object extends will resolved when cancelled.
     */
cancel:function(){this._internalRenderTask.cancel()},/**
     * Registers callbacks to indicate the rendering task completion.
     *
     * @param {function} onFulfilled The callback for the rendering completion.
     * @param {function} onRejected The callback for the rendering failure.
     * @return {Promise} A promise that is resolved after the onFulfilled or
     *                   onRejected callback.
     */
then:function(a,b){return this.promise.then.apply(this.promise,arguments)}},a}(),aa=function(){function a(a,b,c,d,e,f){this.callback=a,this.params=b,this.objs=c,this.commonObjs=d,this.operatorListIdx=null,this.operatorList=e,this.pageNumber=f,this.running=!1,this.graphicsReadyCallback=null,this.graphicsReady=!1,this.useRequestAnimationFrame=!1,this.cancelled=!1,this.capability=x(),this.task=new _(this),
// caching this-bound methods
this._continueBound=this._continue.bind(this),this._scheduleNextBound=this._scheduleNext.bind(this),this._nextBound=this._next.bind(this)}return a.prototype={initializeGraphics:function(a){if(!this.cancelled){N("pdfBug")&&G.StepperManager&&G.StepperManager.enabled&&(this.stepper=G.StepperManager.create(this.pageNumber-1),this.stepper.init(this.operatorList),this.stepper.nextBreakPoint=this.stepper.getNextBreakPoint());var b=this.params;this.gfx=new K(b.canvasContext,this.commonObjs,this.objs,b.imageLayer),this.gfx.beginDrawing(b.transform,b.viewport,a),this.operatorListIdx=0,this.graphicsReady=!0,this.graphicsReadyCallback&&this.graphicsReadyCallback()}},cancel:function(){this.running=!1,this.cancelled=!0,this.callback("cancelled")},operatorListChanged:function(){return this.graphicsReady?(this.stepper&&this.stepper.updateOperatorList(this.operatorList),void(this.running||this._continue())):void(this.graphicsReadyCallback||(this.graphicsReadyCallback=this._continueBound))},_continue:function(){this.running=!0,this.cancelled||(this.task.onContinue?this.task.onContinue.call(this.task,this._scheduleNextBound):this._scheduleNext())},_scheduleNext:function(){this.useRequestAnimationFrame&&"undefined"!=typeof window?window.requestAnimationFrame(this._nextBound):Promise.resolve(void 0).then(this._nextBound)},_next:function(){this.cancelled||(this.operatorListIdx=this.gfx.executeOperatorList(this.operatorList,this.operatorListIdx,this._continueBound,this.stepper),this.operatorListIdx===this.operatorList.argsArray.length&&(this.running=!1,this.operatorList.lastChunk&&(this.gfx.endDrawing(),this.callback())))}},a}(),ba=function(){var a=[];return{listen:function(b){z("Global UnsupportedManager.listen is used:  use PDFDocumentLoadingTask.onUnsupportedFeature instead"),a.push(b)},notify:function(b){for(var c=0,d=a.length;d>c;c++)a[c](b)}}}();"undefined"!=typeof b&&(a.version=b),"undefined"!=typeof c&&(a.build=c),a.getDocument=k,a.PDFDataRangeTransport=V,a.PDFWorker=Y,a.PDFDocumentProxy=W,a.PDFPageProxy=X,a._UnsupportedManager=ba}),function(a,b){b(a.pdfjsDisplayGlobal={},a.pdfjsSharedUtil,a.pdfjsDisplayDOMUtils,a.pdfjsDisplayAPI,a.pdfjsDisplayAnnotationLayer,a.pdfjsDisplayTextLayer,a.pdfjsDisplayMetadata,a.pdfjsDisplaySVG)}(this,function(a,d,e,f,g,h,i,j){var k=d.globalScope,l=d.deprecated,m=d.warn,n=e.LinkTarget,o="undefined"==typeof window;
// The global PDFJS object is now deprecated and will not be supported in
// the future. The members below are maintained for backward  compatibility
// and shall not be extended or modified. If the global.js is included as
// a module, we will create a global PDFJS object instance or use existing.
k.PDFJS||(k.PDFJS={});var p=k.PDFJS;"undefined"!=typeof b&&(p.version=b),"undefined"!=typeof c&&(p.build=c),p.pdfBug=!1,void 0!==p.verbosity&&d.setVerbosityLevel(p.verbosity),delete p.verbosity,Object.defineProperty(p,"verbosity",{get:function(){return d.getVerbosityLevel()},set:function(a){d.setVerbosityLevel(a)},enumerable:!0,configurable:!0}),p.VERBOSITY_LEVELS=d.VERBOSITY_LEVELS,p.OPS=d.OPS,p.UNSUPPORTED_FEATURES=d.UNSUPPORTED_FEATURES,p.isValidUrl=d.isValidUrl,p.shadow=d.shadow,p.createBlob=d.createBlob,p.createObjectURL=function(a,b){return d.createObjectURL(a,b,p.disableCreateObjectURL)},Object.defineProperty(p,"isLittleEndian",{configurable:!0,get:function(){var a=d.isLittleEndian();return d.shadow(p,"isLittleEndian",a)}}),p.removeNullCharacters=d.removeNullCharacters,p.PasswordResponses=d.PasswordResponses,p.PasswordException=d.PasswordException,p.UnknownErrorException=d.UnknownErrorException,p.InvalidPDFException=d.InvalidPDFException,p.MissingPDFException=d.MissingPDFException,p.UnexpectedResponseException=d.UnexpectedResponseException,p.Util=d.Util,p.PageViewport=d.PageViewport,p.createPromiseCapability=d.createPromiseCapability,/**
   * The maximum allowed image size in total pixels e.g. width * height. Images
   * above this value will not be drawn. Use -1 for no limit.
   * @var {number}
   */
p.maxImageSize=void 0===p.maxImageSize?-1:p.maxImageSize,/**
   * The url of where the predefined Adobe CMaps are located. Include trailing
   * slash.
   * @var {string}
   */
p.cMapUrl=void 0===p.cMapUrl?null:p.cMapUrl,/**
   * Specifies if CMaps are binary packed.
   * @var {boolean}
   */
p.cMapPacked=void 0===p.cMapPacked?!1:p.cMapPacked,/**
   * By default fonts are converted to OpenType fonts and loaded via font face
   * rules. If disabled, the font will be rendered using a built in font
   * renderer that constructs the glyphs with primitive path commands.
   * @var {boolean}
   */
p.disableFontFace=void 0===p.disableFontFace?!1:p.disableFontFace,/**
   * Path for image resources, mainly for annotation icons. Include trailing
   * slash.
   * @var {string}
   */
p.imageResourcesPath=void 0===p.imageResourcesPath?"":p.imageResourcesPath,/**
   * Disable the web worker and run all code on the main thread. This will
   * happen automatically if the browser doesn't support workers or sending
   * typed arrays to workers.
   * @var {boolean}
   */
p.disableWorker=void 0===p.disableWorker?!1:p.disableWorker,/**
   * Path and filename of the worker file. Required when the worker is enabled
   * in development mode. If unspecified in the production build, the worker
   * will be loaded based on the location of the pdf.js file. It is recommended
   * that the workerSrc is set in a custom application to prevent issues caused
   * by third-party frameworks and libraries.
   * @var {string}
   */
p.workerSrc=void 0===p.workerSrc?null:p.workerSrc,/**
   * Disable range request loading of PDF files. When enabled and if the server
   * supports partial content requests then the PDF will be fetched in chunks.
   * Enabled (false) by default.
   * @var {boolean}
   */
p.disableRange=void 0===p.disableRange?!1:p.disableRange,/**
   * Disable streaming of PDF file data. By default PDF.js attempts to load PDF
   * in chunks. This default behavior can be disabled.
   * @var {boolean}
   */
p.disableStream=void 0===p.disableStream?!1:p.disableStream,/**
   * Disable pre-fetching of PDF file data. When range requests are enabled
   * PDF.js will automatically keep fetching more data even if it isn't needed
   * to display the current page. This default behavior can be disabled.
   *
   * NOTE: It is also necessary to disable streaming, see above,
   *       in order for disabling of pre-fetching to work correctly.
   * @var {boolean}
   */
p.disableAutoFetch=void 0===p.disableAutoFetch?!1:p.disableAutoFetch,/**
   * Enables special hooks for debugging PDF.js.
   * @var {boolean}
   */
p.pdfBug=void 0===p.pdfBug?!1:p.pdfBug,/**
   * Enables transfer usage in postMessage for ArrayBuffers.
   * @var {boolean}
   */
p.postMessageTransfers=void 0===p.postMessageTransfers?!0:p.postMessageTransfers,/**
   * Disables URL.createObjectURL usage.
   * @var {boolean}
   */
p.disableCreateObjectURL=void 0===p.disableCreateObjectURL?!1:p.disableCreateObjectURL,/**
   * Disables WebGL usage.
   * @var {boolean}
   */
p.disableWebGL=void 0===p.disableWebGL?!0:p.disableWebGL,/**
   * Specifies the |target| attribute for external links.
   * The constants from PDFJS.LinkTarget should be used:
   *  - NONE [default]
   *  - SELF
   *  - BLANK
   *  - PARENT
   *  - TOP
   * @var {number}
   */
p.externalLinkTarget=void 0===p.externalLinkTarget?n.NONE:p.externalLinkTarget,/**
   * Specifies the |rel| attribute for external links. Defaults to stripping
   * the referrer.
   * @var {string}
   */
p.externalLinkRel=void 0===p.externalLinkRel?"noreferrer":p.externalLinkRel,/**
    * Determines if we can eval strings as JS. Primarily used to improve
    * performance for font rendering.
    * @var {boolean}
    */
p.isEvalSupported=void 0===p.isEvalSupported?!0:p.isEvalSupported;var q=p.openExternalLinksInNewWindow;delete p.openExternalLinksInNewWindow,Object.defineProperty(p,"openExternalLinksInNewWindow",{get:function(){return p.externalLinkTarget===n.BLANK},set:function(a){return a&&l('PDFJS.openExternalLinksInNewWindow, please use "PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK" instead.'),p.externalLinkTarget!==n.NONE?void m("PDFJS.externalLinkTarget is already initialized"):void(p.externalLinkTarget=a?n.BLANK:n.NONE)},enumerable:!0,configurable:!0}),q&&(/**
     * (Deprecated) Opens external links in a new window if enabled.
     * The default behavior opens external links in the PDF.js window.
     *
     * NOTE: This property has been deprecated, please use
     *       `PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK` instead.
     * @var {boolean}
     */
p.openExternalLinksInNewWindow=q),p.getDocument=f.getDocument,p.PDFDataRangeTransport=f.PDFDataRangeTransport,p.PDFWorker=f.PDFWorker,Object.defineProperty(p,"hasCanvasTypedArrays",{configurable:!0,get:function(){var a=e.hasCanvasTypedArrays();return d.shadow(p,"hasCanvasTypedArrays",a)}}),p.CustomStyle=e.CustomStyle,p.LinkTarget=n,p.addLinkAttributes=e.addLinkAttributes,p.getFilenameFromUrl=e.getFilenameFromUrl,p.isExternalLinkTargetSet=e.isExternalLinkTargetSet,p.AnnotationLayer=g.AnnotationLayer,p.renderTextLayer=h.renderTextLayer,p.Metadata=i.Metadata,p.SVGGraphics=j.SVGGraphics,p.UnsupportedManager=f._UnsupportedManager,a.globalScope=k,a.isWorker=o,a.PDFJS=k.PDFJS})}).call(e),a.PDFJS=e.pdfjsDisplayGlobal.PDFJS,a.build=e.pdfjsDisplayAPI.build,a.version=e.pdfjsDisplayAPI.version,a.getDocument=e.pdfjsDisplayAPI.getDocument,a.PDFDataRangeTransport=e.pdfjsDisplayAPI.PDFDataRangeTransport,a.PDFWorker=e.pdfjsDisplayAPI.PDFWorker,a.renderTextLayer=e.pdfjsDisplayTextLayer.renderTextLayer,a.AnnotationLayer=e.pdfjsDisplayAnnotationLayer.AnnotationLayer,a.CustomStyle=e.pdfjsDisplayDOMUtils.CustomStyle,a.PasswordResponses=e.pdfjsSharedUtil.PasswordResponses,a.InvalidPDFException=e.pdfjsSharedUtil.InvalidPDFException,a.MissingPDFException=e.pdfjsSharedUtil.MissingPDFException,a.SVGGraphics=e.pdfjsDisplaySVG.SVGGraphics,a.UnexpectedResponseException=e.pdfjsSharedUtil.UnexpectedResponseException,a.OPS=e.pdfjsSharedUtil.OPS,a.UNSUPPORTED_FEATURES=e.pdfjsSharedUtil.UNSUPPORTED_FEATURES,a.isValidUrl=e.pdfjsSharedUtil.isValidUrl,a.createObjectURL=e.pdfjsSharedUtil.createObjectURL,a.removeNullCharacters=e.pdfjsSharedUtil.removeNullCharacters,a.shadow=e.pdfjsSharedUtil.shadow,a.createBlob=e.pdfjsSharedUtil.createBlob,a.getFilenameFromUrl=e.pdfjsDisplayDOMUtils.getFilenameFromUrl,a.addLinkAttributes=e.pdfjsDisplayDOMUtils.addLinkAttributes});