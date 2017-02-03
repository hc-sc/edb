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
/*jshint globalstrict: false */
/* globals PDFJS */
// Initializing PDFJS global object (if still undefined)
"undefined"==typeof PDFJS&&(("undefined"!=typeof window?window:this).PDFJS={}),PDFJS.version="1.1.1",PDFJS.build="a1e0859",function(){
// Use strict in our context only - users might not want it
"use strict";
// A notice for devs. These are good for things that are helpful to devs, such
// as warning that Workers were disabled, which is important to devs but not
// end users.
function a(a){PDFJS.verbosity>=PDFJS.VERBOSITY_LEVELS.infos&&console.log("Info: "+a)}
// Non-fatal warnings.
function b(a){PDFJS.verbosity>=PDFJS.VERBOSITY_LEVELS.warnings&&console.log("Warning: "+a)}
// Fatal errors that should trigger the fallback UI and halt execution by
// throwing an exception.
function c(a){
// If multiple arguments were passed, pass them all to the log function.
if(arguments.length>1){var b=["Error:"];b.push.apply(b,arguments),console.log.apply(console,b),
// Join the arguments into a single string for the lines below.
a=[].join.call(arguments," ")}else console.log("Error: "+a);throw console.log(d()),Y.notify(X.unknown),new Error(a)}function d(){try{throw new Error}catch(a){return a.stack?a.stack.split("\n").slice(2).join("\n"):""}}function e(a,b){a||c(b)}
// Validates if URL is safe and allowed, e.g. to avoid XSS.
function f(a,b){if(!a)return!1;
// RFC 3986 (http://tools.ietf.org/html/rfc3986#section-3.1)
// scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
var c=/^[a-z][a-z0-9+\-.]*(?=:)/i.exec(a);if(!c)return b;switch(c=c[0].toLowerCase()){case"http":case"https":case"ftp":case"mailto":case"tel":return!0;default:return!1}}function g(a,b,c){return Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!1}),c}function h(a){e(null!==a&&"object"==typeof a&&void 0!==a.length,"Invalid argument for bytesToString");var b=a.length,c=8192;if(c>b)return String.fromCharCode.apply(null,a);for(var d=[],f=0;b>f;f+=c){var g=Math.min(f+c,b),h=a.subarray(f,g);d.push(String.fromCharCode.apply(null,h))}return d.join("")}function i(a){e("string"==typeof a,"Invalid argument for stringToBytes");for(var b=a.length,c=new Uint8Array(b),d=0;b>d;++d)c[d]=255&a.charCodeAt(d);return c}function j(a){return String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,255&a)}function k(a){for(var b=1,c=0;a>b;)b<<=1,c++;return c}function l(a,b){return a[b]<<24>>24}function m(a,b){return a[b]<<8|a[b+1]}function n(a,b){return(a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3])>>>0}
// Lazy test the endianness of the platform
// NOTE: This will be 'true' for simulated TypedArrays
function o(){var a=new Uint8Array(2);a[0]=1;var b=new Uint16Array(a.buffer);return 1===b[0]}
// Lazy test if the userAgant support CanvasTypedArrays
function p(){var a=document.createElement("canvas");a.width=a.height=1;var b=a.getContext("2d"),c=b.createImageData(1,1);return"undefined"!=typeof c.data.buffer}function q(a){var b,c=a.length,d=[];if("þ"===a[0]&&"ÿ"===a[1])
// UTF16BE BOM
for(b=2;c>b;b+=2)d.push(String.fromCharCode(a.charCodeAt(b)<<8|a.charCodeAt(b+1)));else for(b=0;c>b;++b){var e=ja[a.charCodeAt(b)];d.push(e?String.fromCharCode(e):a.charAt(b))}return d.join("")}function r(a){return decodeURIComponent(escape(a))}function s(a){for(var b in a)return!1;return!0}function t(a){return"boolean"==typeof a}function u(a){return"number"==typeof a&&(0|a)===a}function v(a){return"number"==typeof a}function w(a){return"string"==typeof a}function x(a){return a instanceof ta}function y(a,b){return a instanceof ua&&(void 0===b||a.cmd===b)}function z(a,b){if(!(a instanceof va))return!1;if(!b)return!0;var c=a.get("Type");return x(c)&&c.name===b}function A(a){return a instanceof Array}function B(a){return"object"==typeof a&&null!==a&&void 0!==a.getBytes}function C(a){return"object"==typeof a&&null!==a&&void 0!==a.byteLength}function D(a){return a instanceof wa}/**
 * Promise Capability object.
 *
 * @typedef {Object} PromiseCapability
 * @property {Promise} promise - A promise object.
 * @property {function} resolve - Fullfills the promise.
 * @property {function} reject - Rejects the promise.
 */
/**
 * Creates a promise capability object.
 * @alias PDFJS.createPromiseCapability
 *
 * @return {PromiseCapability} A capability object contains:
 * - a Promise, resolve and reject methods.
 */
function E(){var a={};return a.promise=new Promise(function(b,c){a.resolve=b,a.reject=c}),a}function F(a,b){this.name=a,this.comObj=b,this.callbackIndex=1,this.postMessageTransfers=!0;var d=this.callbacksCapabilities={},e=this.actionHandler={};e.console_log=[function(a){console.log.apply(console,a)}],e.console_error=[function(a){console.error.apply(console,a)}],e._unsupported_feature=[function(a){Y.notify(a)}],b.onmessage=function(a){var f=a.data;if(f.isReply){var g=f.callbackId;if(f.callbackId in d){var h=d[g];delete d[g],"error"in f?h.reject(f.error):h.resolve(f.data)}else c("Cannot resolve callback "+g)}else if(f.action in e){var i=e[f.action];f.callbackId?Promise.resolve().then(function(){return i[0].call(i[1],f.data)}).then(function(a){b.postMessage({isReply:!0,callbackId:f.callbackId,data:a})},function(a){b.postMessage({isReply:!0,callbackId:f.callbackId,error:a})}):i[0].call(i[1],f.data)}else c("Unknown action from worker: "+f.action)}}function G(a,b,c){var d=b.get("Matrix"),e=b.get("BBox"),f=b.get("XStep"),g=b.get("YStep"),h=b.get("PaintType"),i=b.get("TilingType");return["TilingPattern",c,a,d,e,f,g,h,i]}function H(a){return a>=65520&&65535>=a?0:a>=62976&&63743>=a?Rb[a]||a:a}function I(a){for(var b=0,c=Sb.length;c>b;b++){var d=Sb[b];if(a>=d.begin&&a<d.end)return b}return-1}function J(a){var b=Sb[13];return a>=b.begin&&a<b.end?!0:(b=Sb[11],a>=b.begin&&a<b.end?!0:!1)}function K(a){var b=a.length;
//reverse an arabic ligature
if(1>=b||!J(a.charCodeAt(0)))return a;for(var c="",d=b-1;d>=0;d--)c+=a[d];return c}function L(a){if(a.fontMatrix[0]!==Q[0]){
// adjusting width to fontMatrix scale
var b=.001/a.fontMatrix[0],c=a.widths;for(var d in c)c[d]*=b;a.defaultWidth*=b}}function M(a,b){switch(a){case"Type1":return"Type1C"===b?V.TYPE1C:V.TYPE1;case"CIDFontType0":return"CIDFontType0C"===b?V.CIDFONTTYPE0C:V.CIDFONTTYPE0;case"OpenType":return V.OPENTYPE;case"TrueType":return V.TRUETYPE;case"CIDFontType2":return V.CIDFONTTYPE2;case"MMType1":return V.MMTYPE1;case"Type0":return V.TYPE0;default:return V.UNKNOWN}}/**
 * Shared logic for building a char code to glyph id mapping for Type1 and
 * simple CFF fonts. See section 9.6.6.2 of the spec.
 * @param {Object} properties Font properties object.
 * @param {Object} builtInEncoding The encoding contained within the actual font
 * data.
 * @param {Array} Array of glyph names where the index is the glyph ID.
 * @returns {Object} A char code to glyph ID map.
 */
function N(a,b,c){var d,e,f,g=Object.create(null);if(a.baseEncodingName)for(
// If a valid base encoding name was used, the mapping is initialized with
// that.
f=Lb[a.baseEncodingName],e=0;e<f.length;e++)d=c.indexOf(f[e]),d>=0?g[e]=d:g[e]=0;else if(a.flags&Kb.Symbolic)
// For a symbolic font the encoding should be the fonts built-in
// encoding.
for(e in b)g[e]=b[e];else for(
// For non-symbolic fonts that don't have a base encoding the standard
// encoding should be used.
f=Lb.StandardEncoding,e=0;e<f.length;e++)d=c.indexOf(f[e]),d>=0?g[e]=d:g[e]=0;
// Lastly, merge in the differences.
var h=a.differences;if(h)for(e in h){var i=h[e];d=c.indexOf(i),d>=0?g[e]=d:g[e]=0}return g}function O(a){return a===xc}var P="undefined"==typeof window?this:window,Q=("undefined"==typeof window,[.001,0,0,.001,0,0]),R={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},S={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},T={WIDGET:1,TEXT:2,LINK:3},U={UNKNOWN:0,FLATE:1,LZW:2,DCT:3,JPX:4,JBIG:5,A85:6,AHX:7,CCF:8,RL:9},V={UNKNOWN:0,TYPE1:1,TYPE1C:2,CIDFONTTYPE0:3,CIDFONTTYPE0C:4,TRUETYPE:5,CIDFONTTYPE2:6,TYPE3:7,OPENTYPE:8,TYPE0:9,MMTYPE1:10};
// The global PDFJS object exposes the API
// In production, it will be declared outside a global wrapper
// In development, it will be declared here
P.PDFJS||(P.PDFJS={}),P.PDFJS.pdfBug=!1,PDFJS.VERBOSITY_LEVELS={errors:0,warnings:1,infos:5};
// All the possible operations for an operator list.
var W=PDFJS.OPS={
// Intentionally start from 1 so it is easy to spot bad operators that will be
// 0's.
dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},X=PDFJS.UNSUPPORTED_FEATURES={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},Y=PDFJS.UnsupportedManager=function(){var a=[];return{listen:function(b){a.push(b)},notify:function(c){b('Unsupported feature "'+c+'"');for(var d=0,e=a.length;e>d;d++)a[d](c)}}}();PDFJS.isValidUrl=f,PDFJS.shadow=g;var Z=PDFJS.PasswordResponses={NEED_PASSWORD:1,INCORRECT_PASSWORD:2},$=function(){function a(a,b){this.name="PasswordException",this.message=a,this.code=b}return a.prototype=new Error,a.constructor=a,a}();PDFJS.PasswordException=$;var _=function(){function a(a,b){this.name="UnknownErrorException",this.message=a,this.details=b}return a.prototype=new Error,a.constructor=a,a}();PDFJS.UnknownErrorException=_;var aa=function(){function a(a){this.name="InvalidPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}();PDFJS.InvalidPDFException=aa;var ba=function(){function a(a){this.name="MissingPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}();PDFJS.MissingPDFException=ba;var ca=function(){function a(a,b){this.name="UnexpectedResponseException",this.message=a,this.status=b}return a.prototype=new Error,a.constructor=a,a}();PDFJS.UnexpectedResponseException=ca;var da=function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="NotImplementedException",a.constructor=a,a}(),ea=function(){function a(a,b){this.begin=a,this.end=b,this.message="Missing data ["+a+", "+b+")"}return a.prototype=new Error,a.prototype.name="MissingDataException",a.constructor=a,a}(),fa=function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="XRefParseException",a.constructor=a,a}();Object.defineProperty(PDFJS,"isLittleEndian",{configurable:!0,get:function(){return g(PDFJS,"isLittleEndian",o())}}),Object.defineProperty(PDFJS,"hasCanvasTypedArrays",{configurable:!0,get:function(){return g(PDFJS,"hasCanvasTypedArrays",p())}});var ga=function(){function a(a,b){this.buffer=a,this.byteLength=a.length,this.length=void 0===b?this.byteLength>>2:b,c(this.length)}function b(a){return{get:function(){var b=this.buffer,c=a<<2;return(b[c]|b[c+1]<<8|b[c+2]<<16|b[c+3]<<24)>>>0},set:function(b){var c=this.buffer,d=a<<2;c[d]=255&b,c[d+1]=b>>8&255,c[d+2]=b>>16&255,c[d+3]=b>>>24&255}}}function c(c){for(;c>d;)Object.defineProperty(a.prototype,d,b(d)),d++}a.prototype=Object.create(null);var d=0;return a}(),ha=[1,0,0,1,0,0],ia=PDFJS.Util=function(){function a(){}var b=["rgb(",0,",",0,",",0,")"];
// makeCssRgb() can be called thousands of times. Using |rgbBuf| avoids
// creating many intermediate strings.
// Concatenates two transformation matrices together and returns the result.
// For 2d affine transforms
// Applies the transform to the rectangle and finds the minimum axially
// aligned bounding box.
// Apply a generic 3d matrix M on a 3-vector v:
//   | a b c |   | X |
//   | d e f | x | Y |
//   | g h i |   | Z |
// M is assumed to be serialized as [a,b,c,d,e,f,g,h,i],
// with v as [X,Y,Z]
// This calculation uses Singular Value Decomposition.
// The SVD can be represented with formula A = USV. We are interested in the
// matrix S here because it represents the scale values.
// Normalize rectangle rect=[x1, y1, x2, y2] so that (x1,y1) < (x2,y2)
// For coordinate systems whose origin lies in the bottom-left, this
// means normalization to (BL,TR) ordering. For systems with origin in the
// top-left, this means (TL,BR) ordering.
// Returns a rectangle [x1, y1, x2, y2] corresponding to the
// intersection of rect1 and rect2. If no intersection, returns 'false'
// The rectangle coordinates of rect1, rect2 should be [x1, y1, x2, y2]
return a.makeCssRgb=function(a,c,d){return b[1]=a,b[3]=c,b[5]=d,b.join("")},a.transform=function(a,b){return[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]]},a.applyTransform=function(a,b){var c=a[0]*b[0]+a[1]*b[2]+b[4],d=a[0]*b[1]+a[1]*b[3]+b[5];return[c,d]},a.applyInverseTransform=function(a,b){var c=b[0]*b[3]-b[1]*b[2],d=(a[0]*b[3]-a[1]*b[2]+b[2]*b[5]-b[4]*b[3])/c,e=(-a[0]*b[1]+a[1]*b[0]+b[4]*b[1]-b[5]*b[0])/c;return[d,e]},a.getAxialAlignedBoundingBox=function(b,c){var d=a.applyTransform(b,c),e=a.applyTransform(b.slice(2,4),c),f=a.applyTransform([b[0],b[3]],c),g=a.applyTransform([b[2],b[1]],c);return[Math.min(d[0],e[0],f[0],g[0]),Math.min(d[1],e[1],f[1],g[1]),Math.max(d[0],e[0],f[0],g[0]),Math.max(d[1],e[1],f[1],g[1])]},a.inverseTransform=function(a){var b=a[0]*a[3]-a[1]*a[2];return[a[3]/b,-a[1]/b,-a[2]/b,a[0]/b,(a[2]*a[5]-a[4]*a[3])/b,(a[4]*a[1]-a[5]*a[0])/b]},a.apply3dTransform=function(a,b){return[a[0]*b[0]+a[1]*b[1]+a[2]*b[2],a[3]*b[0]+a[4]*b[1]+a[5]*b[2],a[6]*b[0]+a[7]*b[1]+a[8]*b[2]]},a.singularValueDecompose2dScale=function(a){var b=[a[0],a[2],a[1],a[3]],c=a[0]*b[0]+a[1]*b[2],d=a[0]*b[1]+a[1]*b[3],e=a[2]*b[0]+a[3]*b[2],f=a[2]*b[1]+a[3]*b[3],g=(c+f)/2,h=Math.sqrt((c+f)*(c+f)-4*(c*f-e*d))/2,i=g+h||1,j=g-h||1;
// Scale values are the square roots of the eigenvalues.
return[Math.sqrt(i),Math.sqrt(j)]},a.normalizeRect=function(a){var b=a.slice(0);// clone rect
return a[0]>a[2]&&(b[0]=a[2],b[2]=a[0]),a[1]>a[3]&&(b[1]=a[3],b[3]=a[1]),b},a.intersect=function(b,c){function d(a,b){return a-b}
// Order points along the axes
var e=[b[0],b[2],c[0],c[2]].sort(d),f=[b[1],b[3],c[1],c[3]].sort(d),g=[];
// X: first and second points belong to different rectangles?
// X: first and second points belong to different rectangles?
// Intersection must be between second and third points
// Y: first and second points belong to different rectangles?
// Intersection must be between second and third points
return b=a.normalizeRect(b),c=a.normalizeRect(c),e[0]===b[0]&&e[1]===c[0]||e[0]===c[0]&&e[1]===b[0]?(g[0]=e[1],g[2]=e[2],f[0]===b[1]&&f[1]===c[1]||f[0]===c[1]&&f[1]===b[1]?(g[1]=f[1],g[3]=f[2],g):!1):!1},a.sign=function(a){return 0>a?-1:1},a.appendToArray=function(a,b){Array.prototype.push.apply(a,b)},a.prependToArray=function(a,b){Array.prototype.unshift.apply(a,b)},a.extendObj=function(a,b){for(var c in b)a[c]=b[c]},a.getInheritableProperty=function(a,b){for(;a&&!a.has(b);)a=a.get("Parent");return a?a.get(b):null},a.inherit=function(a,b,c){a.prototype=Object.create(b.prototype),a.prototype.constructor=a;for(var d in c)a.prototype[d]=c[d]},a.loadScript=function(a,b){var c=document.createElement("script"),d=!1;c.setAttribute("src",a),b&&(c.onload=function(){d||b(),d=!0}),document.getElementsByTagName("head")[0].appendChild(c)},a}(),ja=(PDFJS.PageViewport=function(){/**
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
this.transform=[g*b,h*b,i*b,j*b,m-g*b*k-i*b*l,n-h*b*k-j*b*l],this.width=o,this.height=p,this.fontScale=b}/** @lends PDFJS.PageViewport.prototype */
return a.prototype={/**
     * Clones viewport with additional properties.
     * @param args {Object} (optional) If specified, may contain the 'scale' or
     * 'rotation' properties to override the corresponding properties in
     * the cloned viewport.
     * @returns {PDFJS.PageViewport} Cloned viewport.
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
convertToViewportPoint:function(a,b){return ia.applyTransform([a,b],this.transform)},/**
     * Converts PDF rectangle to the viewport coordinates.
     * @param rect {Array} xMin, yMin, xMax and yMax coordinates.
     * @returns {Array} Contains corresponding coordinates of the rectangle
     * in the viewport coordinate space.
     * @see {@link convertToViewportPoint}
     */
convertToViewportRectangle:function(a){var b=ia.applyTransform([a[0],a[1]],this.transform),c=ia.applyTransform([a[2],a[3]],this.transform);return[b[0],b[1],c[0],c[1]]},/**
     * Converts viewport coordinates to the PDF location. For examples, useful
     * for converting canvas pixel location into PDF one.
     * @param x {number} X coordinate.
     * @param y {number} Y coordinate.
     * @returns {Object} Object that contains 'x' and 'y' properties of the
     * point in the PDF coordinate space.
     * @see {@link convertToViewportPoint}
     */
convertToPdfPoint:function(a,b){return ia.applyInverseTransform([a,b],this.transform)}},a}(),[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364]);PDFJS.createPromiseCapability=E,/**
 * Polyfill for Promises:
 * The following promise implementation tries to generally implement the
 * Promise/A+ spec. Some notable differences from other promise libaries are:
 * - There currently isn't a seperate deferred and promise object.
 * - Unhandled rejections eventually show an error if they aren't handled.
 *
 * Based off of the work in:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=810490
 */
function(){function a(a){this._status=c,this._handlers=[];try{a.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(b){this._reject(b)}}if(P.Promise)
// Promises existing in the DOM/Worker, checking presence of all/resolve
return"function"!=typeof P.Promise.all&&(P.Promise.all=function(a){var b,c,d=0,e=[],f=new P.Promise(function(a,d){b=a,c=d});return a.forEach(function(a,f){d++,a.then(function(a){e[f]=a,d--,0===d&&b(e)},c)}),0===d&&b(e),f}),"function"!=typeof P.Promise.resolve&&(P.Promise.resolve=function(a){return new P.Promise(function(b){b(a)})}),"function"!=typeof P.Promise.reject&&(P.Promise.reject=function(a){return new P.Promise(function(b,c){c(a)})}),void("function"!=typeof P.Promise.prototype["catch"]&&(P.Promise.prototype["catch"]=function(a){return P.Promise.prototype.then(void 0,a)}));var c=0,d=1,e=2,f=500,g={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(a){a._status!==c&&(this.handlers=this.handlers.concat(a._handlers),a._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var a=1,b=Date.now()+a;this.handlers.length>0;){var c=this.handlers.shift(),f=c.thisPromise._status,g=c.thisPromise._value;try{f===d?"function"==typeof c.onResolve&&(g=c.onResolve(g)):"function"==typeof c.onReject&&(g=c.onReject(g),f=d,c.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(c.thisPromise))}catch(h){f=e,g=h}if(c.nextPromise._updateStatus(f,g),Date.now()>=b)break}return this.handlers.length>0?void setTimeout(this.runHandlers.bind(this),0):void(this.running=!1)},addUnhandledRejection:function(a){this.unhandledRejections.push({promise:a,time:Date.now()}),this.scheduleRejectionCheck()},removeUnhandeledRejection:function(a){a._unhandledRejection=!1;for(var b=0;b<this.unhandledRejections.length;b++)this.unhandledRejections[b].promise===a&&(this.unhandledRejections.splice(b),b--)},scheduleRejectionCheck:function(){this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){this.pendingRejectionCheck=!1;for(var a=Date.now(),c=0;c<this.unhandledRejections.length;c++)if(a-this.unhandledRejections[c].time>f){var d=this.unhandledRejections[c].promise._value,e="Unhandled rejection: "+d;d.stack&&(e+="\n"+d.stack),b(e),this.unhandledRejections.splice(c),c--}this.unhandledRejections.length&&this.scheduleRejectionCheck()}.bind(this),f))}};/**
   * Builds a promise that is resolved when all the passed in promises are
   * resolved.
   * @param {array} array of data and/or promises to wait for.
   * @return {Promise} New dependant promise.
   */
a.all=function(b){function c(a){g._status!==e&&(i=[],f(a))}var d,f,g=new a(function(a,b){d=a,f=b}),h=b.length,i=[];if(0===h)return d(i),g;for(var j=0,k=b.length;k>j;++j){var l=b[j],m=function(a){return function(b){g._status!==e&&(i[a]=b,h--,0===h&&d(i))}}(j);a.isPromise(l)?l.then(m,c):m(l)}return g},/**
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
a.reject=function(b){return new a(function(a,c){c(b)})},a.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(b,c){if(this._status!==d&&this._status!==e){if(b===d&&a.isPromise(c))return void c.then(this._updateStatus.bind(this,d),this._updateStatus.bind(this,e));this._status=b,this._value=c,b===e&&0===this._handlers.length&&(this._unhandledRejection=!0,g.addUnhandledRejection(this)),g.scheduleHandlers(this)}},_resolve:function(a){this._updateStatus(d,a)},_reject:function(a){this._updateStatus(e,a)},then:function(b,c){var d=new a(function(a,b){this.resolve=a,this.reject=b});return this._handlers.push({thisPromise:this,onResolve:b,onReject:c,nextPromise:d}),g.scheduleHandlers(this),d},"catch":function(a){return this.then(void 0,a)}},P.Promise=a}();(function(){function a(a,b,c){for(;a.length<c;)a+=b;return a}function c(){this.started={},this.times=[],this.enabled=!0}return c.prototype={time:function(a){this.enabled&&(a in this.started&&b("Timer is already running for "+a),this.started[a]=Date.now())},timeEnd:function(a){this.enabled&&(a in this.started||b("Timer has not been started for "+a),this.times.push({name:a,start:this.started[a],end:Date.now()}),
// Remove timer from started so it can be called again.
delete this.started[a])},toString:function(){var b,c,d=this.times,e="",f=0;for(b=0,c=d.length;c>b;++b){var g=d[b].name;g.length>f&&(f=g.length)}for(b=0,c=d.length;c>b;++b){var h=d[b],i=h.end-h.start;e+=a(h.name," ",f)+" "+i+"ms\n"}return e}},c})();PDFJS.createBlob=function(a,b){if("undefined"!=typeof Blob)return new Blob([a],{type:b});
// Blob builder is deprecated in FF14 and removed in FF18.
var c=new MozBlobBuilder;return c.append(a),c.getBlob(b)},PDFJS.createObjectURL=function(){
// Blob/createObjectURL is not available, falling back to data schema.
var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return function(b,c){if(!PDFJS.disableCreateObjectURL&&"undefined"!=typeof URL&&URL.createObjectURL){var d=PDFJS.createBlob(b,c);return URL.createObjectURL(d)}for(var e="data:"+c+";base64,",f=0,g=b.length;g>f;f+=3){var h=255&b[f],i=255&b[f+1],j=255&b[f+2],k=h>>2,l=(3&h)<<4|i>>4,m=g>f+1?(15&i)<<2|j>>6:64,n=g>f+2?63&j:64;e+=a[k]+a[l]+a[m]+a[n]}return e}}(),F.prototype={on:function(a,b,d){var e=this.actionHandler;e[a]&&c('There is already an actionName called "'+a+'"'),e[a]=[b,d]},/**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * @param {String} actionName Action to call.
   * @param {JSON} data JSON data to send.
   * @param {Array} [transfers] Optional list of transfers/ArrayBuffers
   */
send:function(a,b,c){var d={action:a,data:b};this.postMessage(d,c)},/**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * Expects that other side will callback with the response.
   * @param {String} actionName Action to call.
   * @param {JSON} data JSON data to send.
   * @param {Array} [transfers] Optional list of transfers/ArrayBuffers.
   * @returns {Promise} Promise to be resolved with response data.
   */
sendWithPromise:function(a,b,c){var d=this.callbackIndex++,e={action:a,data:b,callbackId:d},f=E();this.callbacksCapabilities[d]=f;try{this.postMessage(e,c)}catch(g){f.reject(g)}return f.promise},/**
   * Sends raw message to the comObj.
   * @private
   * @param message {Object} Raw message.
   * @param transfers List of transfers/ArrayBuffers, or undefined.
   */
postMessage:function(a,b){b&&this.postMessageTransfers?this.comObj.postMessage(a,b):this.comObj.postMessage(a)}};var ka=function(){function a(a,b){this.url=a,b=b||{},this.isHttp=/^https?:/i.test(a),this.httpHeaders=this.isHttp&&b.httpHeaders||{},this.withCredentials=b.withCredentials||!1,this.getXhr=b.getXhr||function(){return new XMLHttpRequest},this.currXhrId=0,this.pendingRequests={},this.loadedRequests={}}function b(a){var b=a.response;if("string"!=typeof b)return b;for(var c=b.length,d=new Uint8Array(c),e=0;c>e;e++)d[e]=255&b.charCodeAt(e);return d.buffer}var c=200,d=206;return a.prototype={requestRange:function(a,b,c){var d={begin:a,end:b};for(var e in c)d[e]=c[e];return this.request(d)},requestFull:function(a){return this.request(a)},request:function(a){var b=this.getXhr(),c=this.currXhrId++,d=this.pendingRequests[c]={xhr:b};b.open("GET",this.url),b.withCredentials=this.withCredentials;for(var e in this.httpHeaders){var f=this.httpHeaders[e];"undefined"!=typeof f&&b.setRequestHeader(e,f)}if(this.isHttp&&"begin"in a&&"end"in a){var g=a.begin+"-"+(a.end-1);b.setRequestHeader("Range","bytes="+g),d.expectedStatus=206}else d.expectedStatus=200;if(a.onProgressiveData){
// Some legacy browsers might throw an exception.
try{b.responseType="moz-chunked-arraybuffer"}catch(h){}"moz-chunked-arraybuffer"===b.responseType?(d.onProgressiveData=a.onProgressiveData,d.mozChunked=!0):b.responseType="arraybuffer"}else b.responseType="arraybuffer";return a.onError&&(b.onerror=function(c){a.onError(b.status)}),b.onreadystatechange=this.onStateChange.bind(this,c),b.onprogress=this.onProgress.bind(this,c),d.onHeadersReceived=a.onHeadersReceived,d.onDone=a.onDone,d.onError=a.onError,d.onProgress=a.onProgress,b.send(null),c},onProgress:function(a,c){var d=this.pendingRequests[a];if(d){if(d.mozChunked){var e=b(d.xhr);d.onProgressiveData(e)}var f=d.onProgress;f&&f(c)}},onStateChange:function(a,e){var f=this.pendingRequests[a];if(f){var g=f.xhr;if(g.readyState>=2&&f.onHeadersReceived&&(f.onHeadersReceived(),delete f.onHeadersReceived),4===g.readyState&&a in this.pendingRequests){
// success status == 0 can be on ftp, file and other protocols
if(delete this.pendingRequests[a],0===g.status&&this.isHttp)return void(f.onError&&f.onError(g.status));var h=g.status||c,i=h===c&&f.expectedStatus===d;if(!i&&h!==f.expectedStatus)return void(f.onError&&f.onError(g.status));this.loadedRequests[a]=!0;var j=b(g);if(h===d){var k=g.getResponseHeader("Content-Range"),l=/bytes (\d+)-(\d+)\/(\d+)/.exec(k),m=parseInt(l[1],10);f.onDone({begin:m,chunk:j})}else f.onDone(f.onProgressiveData?null:{begin:0,chunk:j})}}},hasPendingRequests:function(){for(var a in this.pendingRequests)return!0;return!1},getRequestXhr:function(a){return this.pendingRequests[a].xhr},isStreamingRequest:function(a){return!!this.pendingRequests[a].onProgressiveData},isPendingRequest:function(a){return a in this.pendingRequests},isLoadedRequest:function(a){return a in this.loadedRequests},abortAllRequests:function(){for(var a in this.pendingRequests)this.abortRequest(0|a)},abortRequest:function(a){var b=this.pendingRequests[a].xhr;delete this.pendingRequests[a],b.abort()}},a}(),la=function(){function a(a,b,c){this.bytes=new Uint8Array(a),this.start=0,this.pos=0,this.end=a,this.chunkSize=b,this.loadedChunks=[],this.numChunksLoaded=0,this.numChunks=Math.ceil(a/b),this.manager=c,this.progressiveDataLength=0,this.lastSuccessfulEnsureByteChunk=-1}
// required methods for a stream. if a particular stream does not
// implement these, an error should be thrown
return a.prototype={getMissingChunks:function(){for(var a=[],b=0,c=this.numChunks;c>b;++b)this.loadedChunks[b]||a.push(b);return a},getBaseStreams:function(){return[this]},allChunksLoaded:function(){return this.numChunksLoaded===this.numChunks},onReceiveData:function(a,b){var c=a+b.byteLength;e(a%this.chunkSize===0,"Bad begin offset: "+a);
// Using this.length is inaccurate here since this.start can be moved
// See ChunkedStream.moveStart()
var d=this.bytes.length;e(c%this.chunkSize===0||c===d,"Bad end offset: "+c),this.bytes.set(new Uint8Array(b),a);var f,g=this.chunkSize,h=Math.floor(a/g),i=Math.floor((c-1)/g)+1;for(f=h;i>f;++f)this.loadedChunks[f]||(this.loadedChunks[f]=!0,++this.numChunksLoaded)},onReceiveProgressiveData:function(a){var b=this.progressiveDataLength,c=Math.floor(b/this.chunkSize);this.bytes.set(new Uint8Array(a),b),b+=a.byteLength,this.progressiveDataLength=b;var d,e=b>=this.end?this.numChunks:Math.floor(b/this.chunkSize);for(d=c;e>d;++d)this.loadedChunks[d]||(this.loadedChunks[d]=!0,++this.numChunksLoaded)},ensureByte:function(a){var b=Math.floor(a/this.chunkSize);if(b!==this.lastSuccessfulEnsureByteChunk){if(!this.loadedChunks[b])throw new ea(a,a+1);this.lastSuccessfulEnsureByteChunk=b}},ensureRange:function(a,b){if(!(a>=b||b<=this.progressiveDataLength))for(var c=this.chunkSize,d=Math.floor(a/c),e=Math.floor((b-1)/c)+1,f=d;e>f;++f)if(!this.loadedChunks[f])throw new ea(a,b)},nextEmptyChunk:function(a){var b,c;for(b=a,c=this.numChunks;c>b;++b)if(!this.loadedChunks[b])return b;
// Wrap around to beginning
for(b=0;a>b;++b)if(!this.loadedChunks[b])return b;return null},hasChunk:function(a){return!!this.loadedChunks[a]},get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){var a=this.pos;return a>=this.end?-1:(this.ensureByte(a),this.bytes[this.pos++])},getUint16:function(){var a=this.getByte(),b=this.getByte();return-1===a||-1===b?-1:(a<<8)+b},getInt32:function(){var a=this.getByte(),b=this.getByte(),c=this.getByte(),d=this.getByte();return(a<<24)+(b<<16)+(c<<8)+d},
// returns subarray of original buffer
// should only be read
getBytes:function(a){var b=this.bytes,c=this.pos,d=this.end;if(!a)return this.ensureRange(c,d),b.subarray(c,d);var e=c+a;return e>d&&(e=d),this.ensureRange(c,e),this.pos=e,b.subarray(c,e)},peekByte:function(){var a=this.getByte();return this.pos--,a},peekBytes:function(a){var b=this.getBytes(a);return this.pos-=b.length,b},getByteRange:function(a,b){return this.ensureRange(a,b),this.bytes.subarray(a,b)},skip:function(a){a||(a=1),this.pos+=a},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(a,b,c){function d(){}this.ensureRange(a,a+b),d.prototype=Object.create(this),d.prototype.getMissingChunks=function(){for(var a=this.chunkSize,b=Math.floor(this.start/a),c=Math.floor((this.end-1)/a)+1,d=[],e=b;c>e;++e)this.loadedChunks[e]||d.push(e);return d};var e=new d;return e.pos=e.start=a,e.end=a+b||this.end,e.dict=c,e},isStream:!0},a}(),ma=function(){function a(a,b,c,d){this.stream=new la(a,b,this),this.length=a,this.chunkSize=b,this.url=c,this.disableAutoFetch=d.disableAutoFetch;var e=this.msgHandler=d.msgHandler;if(d.chunkedViewerLoading)e.on("OnDataRange",this.onReceiveData.bind(this)),e.on("OnDataProgress",this.onProgress.bind(this)),this.sendRequest=function(a,b){e.send("RequestDataRange",{begin:a,end:b})};else{var f=function(){return new XMLHttpRequest};this.networkManager=new ka(this.url,{getXhr:f,httpHeaders:d.httpHeaders,withCredentials:d.withCredentials}),this.sendRequest=function(a,b){this.networkManager.requestRange(a,b,{onDone:this.onReceiveData.bind(this),onProgress:this.onProgress.bind(this)})}}this.currRequestId=0,this.chunksNeededByRequest={},this.requestsByChunk={},this.callbacksByRequest={},this.progressiveDataLength=0,this._loadedStreamCapability=E(),d.initialData&&this.onReceiveData({chunk:d.initialData})}return a.prototype={onLoadedStream:function(){return this._loadedStreamCapability.promise},
// Get all the chunks that are not yet loaded and groups them into
// contiguous ranges to load in as few requests as possible
requestAllChunks:function(){var a=this.stream.getMissingChunks();return this.requestChunks(a),this._loadedStreamCapability.promise},requestChunks:function(a,b){var c,d,e,f=this.currRequestId++;for(this.chunksNeededByRequest[f]=c={},d=0,e=a.length;e>d;d++)this.stream.hasChunk(a[d])||(c[a[d]]=!0);if(s(c))return void(b&&b());this.callbacksByRequest[f]=b;var g=[];for(var h in c)h=0|h,h in this.requestsByChunk||(this.requestsByChunk[h]=[],g.push(h)),this.requestsByChunk[h].push(f);if(g.length){var i=this.groupChunks(g);for(d=0;d<i.length;++d){var j=i[d],k=j.beginChunk*this.chunkSize,l=Math.min(j.endChunk*this.chunkSize,this.length);this.sendRequest(k,l)}}},getStream:function(){return this.stream},
// Loads any chunks in the requested range that are not yet loaded
requestRange:function(a,b,c){b=Math.min(b,this.length);for(var d=this.getBeginChunk(a),e=this.getEndChunk(b),f=[],g=d;e>g;++g)f.push(g);this.requestChunks(f,c)},requestRanges:function(a,b){a=a||[];for(var c=[],d=0;d<a.length;d++)for(var e=this.getBeginChunk(a[d].begin),f=this.getEndChunk(a[d].end),g=e;f>g;++g)c.indexOf(g)<0&&c.push(g);c.sort(function(a,b){return a-b}),this.requestChunks(c,b)},
// Groups a sorted array of chunks into as few continguous larger
// chunks as possible
groupChunks:function(a){for(var b=[],c=-1,d=-1,e=0;e<a.length;++e){var f=a[e];0>c&&(c=f),d>=0&&d+1!==f&&(b.push({beginChunk:c,endChunk:d+1}),c=f),e+1===a.length&&b.push({beginChunk:c,endChunk:f+1}),d=f}return b},onProgress:function(a){var b=this.stream.numChunksLoaded*this.chunkSize+a.loaded;this.msgHandler.send("DocProgress",{loaded:b,total:this.length})},onReceiveData:function(a){var b=a.chunk,c=void 0===a.begin,d=c?this.progressiveDataLength:a.begin,e=d+b.byteLength,f=Math.floor(d/this.chunkSize),g=e<this.length?Math.floor(e/this.chunkSize):Math.ceil(e/this.chunkSize);c?(this.stream.onReceiveProgressiveData(b),this.progressiveDataLength=e):this.stream.onReceiveData(d,b),this.stream.allChunksLoaded()&&this._loadedStreamCapability.resolve(this.stream);var h,i,j=[];for(b=f;g>b;++b){
// The server might return more chunks than requested
var k=this.requestsByChunk[b]||[];for(delete this.requestsByChunk[b],h=0;h<k.length;++h){i=k[h];var l=this.chunksNeededByRequest[i];b in l&&delete l[b],s(l)&&j.push(i)}}
// If there are no pending requests, automatically fetch the next
// unfetched chunk of the PDF
if(!this.disableAutoFetch&&s(this.requestsByChunk)){var m;if(1===this.stream.numChunksLoaded){
// This is a special optimization so that after fetching the first
// chunk, rather than fetching the second chunk, we fetch the last
// chunk.
var n=this.stream.numChunks-1;this.stream.hasChunk(n)||(m=n)}else m=this.stream.nextEmptyChunk(g);u(m)&&this.requestChunks([m])}for(h=0;h<j.length;++h){i=j[h];var o=this.callbacksByRequest[i];delete this.callbacksByRequest[i],o&&o()}this.msgHandler.send("DocProgress",{loaded:this.stream.numChunksLoaded*this.chunkSize,total:this.length})},onError:function(a){this._loadedStreamCapability.reject(a)},getBeginChunk:function(a){var b=Math.floor(a/this.chunkSize);return b},getEndChunk:function(a){if(a%this.chunkSize===0)return a/this.chunkSize;
// 0 -> 0
// 1 -> 1
// 99 -> 1
// 100 -> 1
// 101 -> 2
var b=Math.floor((a-1)/this.chunkSize)+1;return b}},a}(),na=65536,oa=function(){function a(){throw new Error("Cannot initialize BaseManagerManager")}return a.prototype={onLoadedStream:function(){throw new da},ensureDoc:function(a,b){return this.ensure(this.pdfDocument,a,b)},ensureXRef:function(a,b){return this.ensure(this.pdfDocument.xref,a,b)},ensureCatalog:function(a,b){return this.ensure(this.pdfDocument.catalog,a,b)},getPage:function(a){return this.pdfDocument.getPage(a)},cleanup:function(){return this.pdfDocument.cleanup()},ensure:function(a,b,c){return new da},requestRange:function(a,b){return new da},requestLoadedStream:function(){return new da},sendProgressiveData:function(a){return new da},updatePassword:function(a){this.pdfDocument.xref.password=this.password=a,this._passwordChangedCapability&&this._passwordChangedCapability.resolve()},passwordChanged:function(){return this._passwordChangedCapability=E(),this._passwordChangedCapability.promise},terminate:function(){return new da}},a}(),pa=function(){function a(a,b){var c=new Gc(a);this.pdfDocument=new sa(this,c,b),this._loadedStreamCapability=E(),this._loadedStreamCapability.resolve(c)}return a.prototype=Object.create(oa.prototype),a.prototype.constructor=a,a.prototype.ensure=function(a,b,c){return new Promise(function(d,e){try{var f,g=a[b];f="function"==typeof g?g.apply(a,c):g,d(f)}catch(h){e(h)}})},a.prototype.requestRange=function(a,b){return Promise.resolve()},a.prototype.requestLoadedStream=function(){},a.prototype.onLoadedStream=function(){return this._loadedStreamCapability.promise},a.prototype.terminate=function(){},a}(),qa=function(){function a(a,b){this.msgHandler=b;var c={msgHandler:b,httpHeaders:a.httpHeaders,withCredentials:a.withCredentials,chunkedViewerLoading:a.chunkedViewerLoading,disableAutoFetch:a.disableAutoFetch,initialData:a.initialData};this.streamManager=new ma(a.length,na,a.url,c),this.pdfDocument=new sa(this,this.streamManager.getStream(),a.password)}return a.prototype=Object.create(oa.prototype),a.prototype.constructor=a,a.prototype.ensure=function(a,b,c){var d=this;return new Promise(function(e,f){function g(){try{var h,i=a[b];h="function"==typeof i?i.apply(a,c):i,e(h)}catch(j){if(!(j instanceof ea))return void f(j);d.streamManager.requestRange(j.begin,j.end,g)}}g()})},a.prototype.requestRange=function(a,b){return new Promise(function(c){this.streamManager.requestRange(a,b,function(){c()})}.bind(this))},a.prototype.requestLoadedStream=function(){this.streamManager.requestAllChunks()},a.prototype.sendProgressiveData=function(a){this.streamManager.onReceiveData({chunk:a})},a.prototype.onLoadedStream=function(){return this.streamManager.onLoadedStream()},a.prototype.terminate=function(){this.streamManager.networkManager.abortAllRequests()},a}(),ra=function(){function a(a,b,c,d,e,f){this.pdfManager=a,this.pageIndex=c,this.pageDict=d,this.xref=b,this.ref=e,this.fontCache=f,this.idCounters={obj:0},this.resourcesPromise=null}var b=[0,0,612,792];return a.prototype={getPageProp:function(a){return this.pageDict.get(a)},getInheritedPageProp:function(a){for(var b=this.pageDict,c=b.get(a);void 0===c&&(b=b.get("Parent"));)c=b.get(a);return c},get content(){return this.getPageProp("Contents")},get resources(){var a=this.getInheritedPageProp("Resources");
// For robustness: The spec states that a \Resources entry has to be
// present, but can be empty. Some document omit it still. In this case
// return an empty dictionary:
return void 0===a&&(a=va.empty),g(this,"resources",a)},get mediaBox(){var a=this.getInheritedPageProp("MediaBox");
// Reset invalid media box to letter size.
return A(a)&&4===a.length||(a=b),g(this,"mediaBox",a)},get view(){var a=this.mediaBox,b=this.getInheritedPageProp("CropBox");
// From the spec, 6th ed., p.963:
// "The crop, bleed, trim, and art boxes should not ordinarily
// extend beyond the boundaries of the media box. If they do, they are
// effectively reduced to their intersection with the media box."
return A(b)&&4===b.length?(b=ia.intersect(b,a),b?g(this,"view",b):g(this,"view",a)):g(this,"view",a)},get annotationRefs(){return g(this,"annotationRefs",this.getInheritedPageProp("Annots"))},get rotate(){var a=this.getInheritedPageProp("Rotate")||0;
// Normalize rotation so it's a multiple of 90 and between 0 and 270
// The spec doesn't cover negatives, assume its counterclockwise
// rotation. The following is the other implementation of modulo.
return a%90!==0?a=0:a>=360?a%=360:0>a&&(a=(a%360+360)%360),g(this,"rotate",a)},getContentStream:function(){var a,b=this.content;if(A(b)){
// fetching items
var c,d=this.xref,e=b.length,f=[];for(c=0;e>c;++c)f.push(d.fetchIfRef(b[c]));a=new Jc(f)}else a=B(b)?b:new Vc;return a},loadResources:function(a){
// TODO: add async getInheritedPageProp and remove this.
return this.resourcesPromise||(this.resourcesPromise=this.pdfManager.ensure(this,"resources")),this.resourcesPromise.then(function(){var b=new Da(this.resources.map,a,this.xref);return b.load()}.bind(this))},getOperatorList:function(a,b){var c=this,d=this.pdfManager,e=d.ensure(this,"getContentStream",[]),f=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),g=new rb(d,this.xref,a,this.pageIndex,"p"+this.pageIndex+"_",this.idCounters,this.fontCache),h=Promise.all([e,f]),i=h.then(function(d){var e=d[0],f=new tb(b,a,c.pageIndex);return a.send("StartRenderPage",{transparency:g.hasBlendModes(c.resources),pageIndex:c.pageIndex,intent:b}),g.getOperatorList(e,c.resources,f).then(function(){return f})}),j=d.ensure(this,"annotations");return Promise.all([i,j]).then(function(a){var c=a[0],e=a[1];if(0===e.length)return c.flush(!0),c;var f=Ja.appendToOperatorList(e,c,d,g,b);return f.then(function(){return c.flush(!0),c})})},extractTextContent:function(){var a={on:function(){},send:function(){}},b=this,c=this.pdfManager,d=c.ensure(this,"getContentStream",[]),e=this.loadResources(["ExtGState","XObject","Font"]),f=Promise.all([d,e]);return f.then(function(d){var e=d[0],f=new rb(c,b.xref,a,b.pageIndex,"p"+b.pageIndex+"_",b.idCounters,b.fontCache);return f.getTextContent(e,b.resources)})},getAnnotationsData:function(){for(var a=this.annotations,b=[],c=0,d=a.length;d>c;++c)b.push(a[c].getData());return b},get annotations(){for(var a=[],b=this.annotationRefs||[],c=0,d=b.length;d>c;++c){var e=b[c],f=Ja.fromRef(this.xref,e);f&&a.push(f)}return g(this,"annotations",a)}},a}(),sa=function(){function b(a,b,e){B(b)?d.call(this,a,b,e):C(b)?d.call(this,a,new Gc(b),e):c("PDFDocument: Unknown argument type")}function d(a,b,c){e(b.length>0,"stream must have data"),this.pdfManager=a,this.stream=b;var d=new Aa(this.stream,c,a);this.xref=d}function f(a,b,c,d){var e=a.pos,f=a.end,g=[];e+c>f&&(c=f-e);for(var h=0;c>h;++h)g.push(String.fromCharCode(a.getByte()));var i=g.join("");a.pos=e;var j=d?i.lastIndexOf(b):i.indexOf(b);return-1===j?!1:(a.pos+=j,!0)}var h=1024,j="\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",k={get entries(){
// Lazily build this since all the validation functions below are not
// defined until after this file loads.
return g(this,"entries",{Title:w,Author:w,Subject:w,Keywords:w,Creator:w,Producer:w,CreationDate:w,ModDate:w,Trapped:x})}};return b.prototype={parse:function(b){this.setup(b);try{if(
// checking if AcroForm is present
this.acroForm=this.catalog.catDict.get("AcroForm"),this.acroForm){this.xfa=this.acroForm.get("XFA");var c=this.acroForm.get("Fields");c&&A(c)&&0!==c.length||this.xfa||(
// no fields and no XFA -- not a form (?)
this.acroForm=null)}}catch(d){a("Something wrong with AcroForm entry"),this.acroForm=null}},get linearization(){var b=null;if(this.stream.length)try{b=Bc.create(this.stream)}catch(c){if(c instanceof ea)throw c;a(c)}
// shadow the prototype getter with a data property
return g(this,"linearization",b)},get startXRef(){var a=this.stream,b=0,c=this.linearization;if(c)
// Find end of first obj.
a.reset(),f(a,"endobj",1024)&&(b=a.pos+6);else{for(
// Find startxref by jumping backward from the end of the file.
var d=1024,e=!1,h=a.end;!e&&h>0;)h-=d-"startxref".length,0>h&&(h=0),a.pos=h,e=f(a,"startxref",d,!0);if(e){a.skip(9);var i;do i=a.getByte();while(Ac.isSpace(i));for(var j="";i>=32&&57>=i;)// < '9'
j+=String.fromCharCode(i),i=a.getByte();b=parseInt(j,10),isNaN(b)&&(b=0)}}
// shadow the prototype getter with a data property
return g(this,"startXRef",b)},get mainXRefEntriesOffset(){var a=0,b=this.linearization;
// shadow the prototype getter with a data property
return b&&(a=b.mainXRefEntriesOffset),g(this,"mainXRefEntriesOffset",a)},
// Find the header, remove leading garbage and setup the stream
// starting from the header.
checkHeader:function(){var a=this.stream;if(a.reset(),f(a,"%PDF-",1024)){
// Found the header, trim off any garbage before it.
a.moveStart();for(
// Reading file format version
var b,c=12,d="";(b=a.getByte())>32&&!(d.length>=c);)d+=String.fromCharCode(b);
// removing "%PDF-"-prefix
return void(this.pdfFormatVersion=d.substring(5))}},parseStartXRef:function(){var a=this.startXRef;this.xref.setStartXRef(a)},setup:function(a){this.xref.parse(a),this.catalog=new za(this.pdfManager,this.xref)},get numPages(){var a=this.linearization,b=a?a.numPages:this.catalog.numPages;
// shadow the prototype getter
return g(this,"numPages",b)},get documentInfo(){var b,c={PDFFormatVersion:this.pdfFormatVersion,IsAcroFormPresent:!!this.acroForm,IsXFAPresent:!!this.xfa};try{b=this.xref.trailer.get("Info")}catch(d){a("The document information dictionary is invalid.")}if(b){var e=k.entries;
// Only fill the document info with valid entries from the spec.
for(var f in e)if(b.has(f)){var h=b.get(f);
// Make sure the value conforms to the spec.
e[f](h)?c[f]="string"!=typeof h?h:q(h):a('Bad value in document info for "'+f+'"')}}return g(this,"documentInfo",c)},get fingerprint(){var a,b,c=this.xref,d="";c.trailer.has("ID")&&(a=c.trailer.get("ID")),a&&A(a)&&a[0]!==j?b=i(a[0]):(this.stream.ensureRange&&this.stream.ensureRange(0,Math.min(h,this.stream.end)),b=cb(this.stream.bytes.subarray(0,h),0,h));for(var e=0,f=b.length;f>e;e++){var k=b[e].toString(16);d+=1===k.length?"0"+k:k}return g(this,"fingerprint",d)},getPage:function(a){return this.catalog.getPage(a)},cleanup:function(){return this.catalog.cleanup()}},b}(),ta=function(){function a(a){this.name=a}a.prototype={};var b={};return a.get=function(c){var d=b[c];return d?d:b[c]=new a(c)},a}(),ua=function(){function a(a){this.cmd=a}a.prototype={};var b={};return a.get=function(c){var d=b[c];return d?d:b[c]=new a(c)},a}(),va=function(){function a(a){if(!x(a.Type))return!0;var b=a.Type.name;return d[b]===!0}
// xref is optional
function b(a){
// Map should only be used internally, use functions below to access.
this.map=Object.create(null),this.xref=a,this.objId=null,this.__nonSerializable__=c}var c=function(){return c},d={Background:!0,ExtGState:!0,Halftone:!0,Layout:!0,Mask:!0,Pagination:!0,Printing:!0};return b.prototype={assignXref:function(a){this.xref=a},
// automatically dereferences Ref objects
get:function(a,b,c){var d,e=this.xref;return"undefined"!=typeof(d=this.map[a])||a in this.map||"undefined"==typeof b?e?e.fetchIfRef(d):d:"undefined"!=typeof(d=this.map[b])||b in this.map||"undefined"==typeof c?e?e.fetchIfRef(d):d:(d=this.map[c]||null,e?e.fetchIfRef(d):d)},
// Same as get(), but returns a promise and uses fetchIfRefAsync().
getAsync:function(a,b,c){var d,e=this.xref;return"undefined"!=typeof(d=this.map[a])||a in this.map||"undefined"==typeof b?e?e.fetchIfRefAsync(d):Promise.resolve(d):"undefined"!=typeof(d=this.map[b])||b in this.map||"undefined"==typeof c?e?e.fetchIfRefAsync(d):Promise.resolve(d):(d=this.map[c]||null,e?e.fetchIfRefAsync(d):Promise.resolve(d))},
// no dereferencing
getRaw:function(a){return this.map[a]},
// creates new map and dereferences all Refs
getAll:function(){var c,d,e=Object.create(null),f=null;for(c in this.map)d=this.get(c),d instanceof b?a(d)?(f||(f=[])).push({target:e,key:c,obj:d}):e[c]=this.getRaw(c):e[c]=d;if(!f)return e;for(
// trying to take cyclic references into the account
var g=Object.create(null);f.length>0;){var h=f.shift(),i=h.obj,j=i.objId;if(j&&j in g)h.target[h.key]=g[j];else{var k=Object.create(null);for(c in i.map)d=i.get(c),d instanceof b?a(d)?f.push({target:k,key:c,obj:d}):k[c]=i.getRaw(c):k[c]=d;j&&(g[j]=k),h.target[h.key]=k}}return e},set:function(a,b){this.map[a]=b},has:function(a){return a in this.map},forEach:function(a){for(var b in this.map)a(b,this.get(b))}},b.empty=new b(null),b}(),wa=function(){function a(a,b){this.num=a,this.gen=b}return a.prototype={toString:function(){
// This function is hot, so we make the string as compact as possible.
// |this.gen| is almost always zero, so we treat that case specially.
var a=this.num+"R";return 0!==this.gen&&(a+=this.gen),a}},a}(),xa=function(){function a(){this.dict={}}return a.prototype={has:function(a){return a.toString()in this.dict},put:function(a){this.dict[a.toString()]=!0},remove:function(a){delete this.dict[a.toString()]}},a}(),ya=function(){function a(){this.dict=Object.create(null)}return a.prototype={get:function(a){return this.dict[a.toString()]},has:function(a){return a.toString()in this.dict},put:function(a,b){this.dict[a.toString()]=b},putAlias:function(a,b){this.dict[a.toString()]=this.get(b)},forEach:function(a,b){for(var c in this.dict)a.call(b,this.dict[c])},clear:function(){this.dict=Object.create(null)}},a}(),za=function(){function d(a,b){this.pdfManager=a,this.xref=b,this.catDict=b.getCatalogObj(),this.fontCache=new ya,e(z(this.catDict),"catalog object is not a dictionary"),this.pagePromises=[]}return d.prototype={get metadata(){var b=this.catDict.getRaw("Metadata");if(!D(b))return g(this,"metadata",null);var c,d=this.xref.encrypt?this.xref.encrypt.encryptMetadata:!1,e=this.xref.fetch(b,!d);if(e&&z(e.dict)){var f=e.dict.get("Type"),i=e.dict.get("Subtype");if(x(f)&&x(i)&&"Metadata"===f.name&&"XML"===i.name)
// XXX: This should examine the charset the XML document defines,
// however since there are currently no real means to decode
// arbitrary charsets, let's just hope that the author of the PDF
// was reasonable enough to stick with the XML default charset,
// which is UTF-8.
try{c=r(h(e.getBytes()))}catch(j){a("Skipping invalid metadata.")}}return g(this,"metadata",c)},get toplevelPagesDict(){var a=this.catDict.get("Pages");
// shadow the prototype getter
return e(z(a),"invalid top-level pages dictionary"),g(this,"toplevelPagesDict",a)},get documentOutline(){var a=null;try{a=this.readDocumentOutline()}catch(c){if(c instanceof ea)throw c;b("Unable to read document outline")}return g(this,"documentOutline",a)},readDocumentOutline:function(){var a=this.xref,b=this.catDict.get("Outlines"),d={items:[]};if(z(b)){b=b.getRaw("First");var e=new xa;if(D(b)){var f=[{obj:b,parent:d}];for(
// to avoid recursion keeping track of the items
// in the processed dictionary
e.put(b);f.length>0;){var g=f.shift(),h=a.fetchIfRef(g.obj);if(null!==h){h.has("Title")||c("Invalid outline item");var i=h.get("A");i?i=i.get("D"):h.has("Dest")&&(i=h.getRaw("Dest"),x(i)&&(i=i.name));var j=h.get("Title"),k={dest:i,title:q(j),color:h.get("C")||[0,0,0],count:h.get("Count"),bold:!!(2&h.get("F")),italic:!!(1&h.get("F")),items:[]};g.parent.items.push(k),b=h.getRaw("First"),D(b)&&!e.has(b)&&(f.push({obj:b,parent:k}),e.put(b)),b=h.getRaw("Next"),D(b)&&!e.has(b)&&(f.push({obj:b,parent:g.parent}),e.put(b))}}}}return d.items.length>0?d.items:null},get numPages(){var a=this.toplevelPagesDict.get("Count");
// shadow the prototype getter
return e(u(a),"page count in top level pages object is not an integer"),g(this,"num",a)},get destinations(){function a(a){return z(a)?a.get("D"):a}var b,c,d=this.xref,e={},f=this.catDict.get("Names");if(f&&f.has("Dests")?b=f.getRaw("Dests"):this.catDict.has("Dests")&&(c=this.catDict.get("Dests")),c&&(
// reading simple destination dictionary
f=c,f.forEach(function(b,c){c&&(e[b]=a(c))})),b){var h=new Ba(b,d),i=h.getAll();for(var j in i)i.hasOwnProperty(j)&&(e[j]=a(i[j]))}return g(this,"destinations",e)},getDestination:function(a){function b(a){return z(a)?a.get("D"):a}var c,d,e,f=this.xref,g=this.catDict.get("Names");if(g&&g.has("Dests")?d=g.getRaw("Dests"):this.catDict.has("Dests")&&(e=this.catDict.get("Dests")),e&&(
// reading simple destination dictionary
g=e,g.forEach(function(d,e){e&&d===a&&(c=b(e))})),d){var h=new Ba(d,f);c=b(h.get(a))}return c},get attachments(){var a,b=this.xref,c=null,d=this.catDict.get("Names");if(d&&(a=d.getRaw("EmbeddedFiles")),a){var e=new Ba(a,b),f=e.getAll();for(var h in f)if(f.hasOwnProperty(h)){var i=new Ca(f[h],b);c||(c={}),c[q(h)]=i.serializable}}return g(this,"attachments",c)},get javaScript(){var a=this.xref,b=this.catDict.get("Names"),c=[];if(b&&b.has("JavaScript")){var d=new Ba(b.getRaw("JavaScript"),a),e=d.getAll();for(var f in e)if(e.hasOwnProperty(f)){
// We don't really use the JavaScript right now. This code is
// defensive so we don't cause errors on document load.
var i=e[f];if(z(i)){var j=i.get("S");if(x(j)&&"JavaScript"===j.name){var k=i.get("JS");(w(k)||B(k))&&(B(k)&&(k=h(k.getBytes())),c.push(q(k)))}}}}
// Append OpenAction actions to javaScript array
var l=this.catDict.get("OpenAction");if(z(l)){var m=l.get("Type"),n=l.get("S"),o=l.get("N"),p=x(m)&&"Action"===m.name&&x(n)&&"Named"===n.name&&x(o)&&"Print"===o.name;p&&c.push("print(true);")}return g(this,"javaScript",c)},cleanup:function(){var a=[];return this.fontCache.forEach(function(b){a.push(b)}),Promise.all(a).then(function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b].dict;delete d.translated}this.fontCache.clear()}.bind(this))},getPage:function(a){return a in this.pagePromises||(this.pagePromises[a]=this.getPageDict(a).then(function(b){var c=b[0],d=b[1];return new ra(this.pdfManager,this.xref,a,c,d,this.fontCache)}.bind(this))),this.pagePromises[a]},getPageDict:function(a){function b(){for(;d.length;){var h=d.pop();if(D(h))return void g.fetchAsync(h).then(function(e){return z(e,"Page")||z(e)&&!e.has("Kids")?void(a===f?c.resolve([e,h]):(f++,b())):(d.push(e),void b())},c.reject);
// must be a child page dictionary
e(z(h),"page dictionary kid reference points to wrong type of object");var i=h.get("Count");
// Skip nodes where the page can't be.
if(a>=f+i)f+=i;else{var j=h.get("Kids");if(e(A(j),"page dictionary kids object is not an array"),i!==j.length)for(var k=j.length-1;k>=0;k--)d.push(j[k]);else
// Nodes that don't have the page have been skipped and this is the
// bottom of the tree which means the page requested must be a
// descendant of this pages node. Ideally we would just resolve the
// promise with the page ref here, but there is the case where more
// pages nodes could link to single a page (see issue 3666 pdf). To
// handle this push it back on the queue so if it is a pages node it
// will be descended into.
d=[j[a-f]],f=a}}c.reject("Page index "+a+" not found.")}var c=E(),d=[this.catDict.getRaw("Pages")],f=0,g=this.xref;return b(),c.promise},getPageIndex:function(a){function b(a){var b,d=0;return f.fetchAsync(a).then(function(a){return a?(b=a.getRaw("Parent"),a.getAsync("Parent")):null}).then(function(a){return a?a.getAsync("Kids"):null}).then(function(g){if(!g)return null;for(var h=[],i=!1,j=0;j<g.length;j++){var k=g[j];if(e(D(k),"kids must be a ref"),k.num===a.num){i=!0;break}h.push(f.fetchAsync(k).then(function(a){if(a.has("Count")){var b=a.get("Count");d+=b}else// page leaf node
d++}))}return i||c("kid ref not found in parents kids"),Promise.all(h).then(function(){return[d,b]})})}function d(a){return b(a).then(function(a){if(!a)return g;var b=a[0],c=a[1];return g+=b,d(c)})}
// The page tree nodes have the count of all the leaves below them. To get
// how many pages are before we just have to walk up the tree and keep
// adding the count of siblings to the left of the node.
var f=this.xref,g=0;return d(a)}},d}(),Aa=function(){function d(a,b){this.stream=a,this.entries=[],this.xrefstms={},
// prepare the XRef cache
this.cache=[],this.password=b,this.stats={streamTypes:[],fontTypes:[]}}return d.prototype={setStartXRef:function(a){
// Store the starting positions of xref tables as we process them
// so we can recover from missing data errors
this.startXRefQueue=[a]},parse:function(a){var d;a?(b("Indexing all PDF objects"),d=this.indexObjects()):d=this.readXRef(),d.assignXref(this),this.trailer=d;var e=d.get("Encrypt");if(e){var f=d.get("ID"),g=f&&f.length?f[0]:"";this.encrypt=new nb(e,g,this.password)}
// get the root dictionary (catalog) object
(this.root=d.get("Root"))||c("Invalid root reference")},processXRefTable:function(a){"tableState"in this||(
// Stores state of the table as we process it so we can resume
// from middle of table in case of missing data error
this.tableState={entryNum:0,streamPos:a.lexer.stream.pos,parserBuf1:a.buf1,parserBuf2:a.buf2});var b=this.readXRefTable(a);
// Sanity check
y(b,"trailer")||c("Invalid XRef table: could not find trailer dictionary");
// Read trailer dictionary, e.g.
// trailer
//    << /Size 22
//      /Root 20R
//      /Info 10R
//      /ID [ <81b14aafa313db63dbd6f981e49f94f4> ]
//    >>
// The parser goes through the entire stream << ... >> and provides
// a getter interface for the key-value table
var d=a.getObj();
// The pdflib PDF generator can generate a nested trailer dictionary
return!z(d)&&d.dict&&(d=d.dict),z(d)||c("Invalid XRef table: could not parse trailer dictionary"),delete this.tableState,d},readXRefTable:function(a){
// Example of cross-reference table:
// xref
// 0 1                    <-- subsection header (first obj #, obj count)
// 0000000000 65535 f     <-- actual object (offset, generation #, f/n)
// 23 2                   <-- subsection header ... and so on ...
// 0000025518 00002 n
// 0000025635 00000 n
// trailer
// ...
var b=a.lexer.stream,d=this.tableState;b.pos=d.streamPos,a.buf1=d.parserBuf1,a.buf2=d.parserBuf2;for(
// Outer loop is over subsection headers
var e;;){if(!("firstEntryNum"in d&&"entryCount"in d)){if(y(e=a.getObj(),"trailer"))break;d.firstEntryNum=e,d.entryCount=a.getObj()}var f=d.firstEntryNum,g=d.entryCount;u(f)&&u(g)||c("Invalid XRef table: wrong types in subsection header");
// Inner loop is over objects themselves
for(var h=d.entryNum;g>h;h++){d.streamPos=b.pos,d.entryNum=h,d.parserBuf1=a.buf1,d.parserBuf2=a.buf2;var i={};i.offset=a.getObj(),i.gen=a.getObj();var j=a.getObj();y(j,"f")?i.free=!0:y(j,"n")&&(i.uncompressed=!0),
// Validate entry obj
u(i.offset)&&u(i.gen)&&(i.free||i.uncompressed)||c("Invalid entry in XRef subsection: "+f+", "+g),this.entries[h+f]||(this.entries[h+f]=i)}d.entryNum=0,d.streamPos=b.pos,d.parserBuf1=a.buf1,d.parserBuf2=a.buf2,delete d.firstEntryNum,delete d.entryCount}
// Per issue 3248: hp scanners generate bad XRef
// shifting the entries
// Sanity check: as per spec, first object must be free
return 1===f&&this.entries[1]&&this.entries[1].free&&this.entries.shift(),this.entries[0]&&!this.entries[0].free&&c("Invalid XRef table: unexpected first object"),e},processXRefStream:function(a){if(!("streamState"in this)){
// Stores state of the stream as we process it so we can resume
// from middle of stream in case of missing data error
var b=a.dict,c=b.get("W"),d=b.get("Index");d||(d=[0,b.get("Size")]),this.streamState={entryRanges:d,byteWidths:c,entryNum:0,streamPos:a.pos}}return this.readXRefStream(a),delete this.streamState,a.dict},readXRefStream:function(a){var b,d,e=this.streamState;a.pos=e.streamPos;for(var f=e.byteWidths,g=f[0],h=f[1],i=f[2],j=e.entryRanges;j.length>0;){var k=j[0],l=j[1];for(u(k)&&u(l)||c("Invalid XRef range fields: "+k+", "+l),u(g)&&u(h)&&u(i)||c("Invalid XRef entry fields length: "+k+", "+l),b=e.entryNum;l>b;++b){e.entryNum=b,e.streamPos=a.pos;var m=0,n=0,o=0;for(d=0;g>d;++d)m=m<<8|a.getByte();for(
// if type field is absent, its default value is 1
0===g&&(m=1),d=0;h>d;++d)n=n<<8|a.getByte();for(d=0;i>d;++d)o=o<<8|a.getByte();var p={};switch(p.offset=n,p.gen=o,m){case 0:p.free=!0;break;case 1:p.uncompressed=!0;break;case 2:break;default:c("Invalid XRef entry type: "+m)}this.entries[k+b]||(this.entries[k+b]=p)}e.entryNum=0,e.streamPos=a.pos,j.splice(0,2)}},indexObjects:function(){
// Simple scan through the PDF content to find objects,
// trailers and XRef streams.
function a(a,b){for(var c="",d=a[b];13!==d&&10!==d&&!(++b>=a.length);)c+=String.fromCharCode(d),d=a[b];return c}function b(a,b,c){
// finding byte sequence
for(var d=c.length,e=a.length,f=0;e>b;){for(var g=0;d>g&&a[b+g]===c[g];)++g;if(g>=d)break;b++,f++}return f}var c=new Uint8Array([116,114,97,105,108,101,114]),d=new Uint8Array([115,116,97,114,116,120,114,101,102]),e=new Uint8Array([101,110,100,111,98,106]),f=new Uint8Array([47,88,82,101,102]),g=this.stream;g.pos=0;for(var h=g.getBytes(),i=g.start,j=h.length,k=[],l=[];j>i;){var m=h[i];if(32!==m&&9!==m&&13!==m&&10!==m)if(37!==m){var n,o=a(h,i);if("xref"===o)i+=b(h,i,c),k.push(i),i+=b(h,i,d);else if(n=/^(\d+)\s+(\d+)\s+obj\b/.exec(o)){this.entries[n[1]]={offset:i,gen:0|n[2],uncompressed:!0};var p=b(h,i,e)+7,q=h.subarray(i,i+p),r=b(q,0,f);p>r&&q[r+5]<64&&(l.push(i),this.xrefstms[i]=1),i+=p}else i+=o.length+1}else// %-comment
do{if(++i,i>=j)break;m=h[i]}while(13!==m&&10!==m);else++i}
// reading XRef streams
var s,t;for(s=0,t=l.length;t>s;++s)this.startXRefQueue.push(l[s]),this.readXRef(/* recoveryMode */!0);
// finding main trailer
var u;for(s=0,t=k.length;t>s;++s){g.pos=k[s];var v=new zc(new Ac(g),!0,this),w=v.getObj();if(y(w,"trailer")&&z(u=v.getObj())&&u.has("ID"))return u}
// no tailer with 'ID', taking last one (if exists)
if(u)return u;
// nothing helps
// calling error() would reject worker with an UnknownErrorException.
throw new aa("Invalid PDF structure")},readXRef:function(b){var d=this.stream;try{for(;this.startXRefQueue.length;){var e=this.startXRefQueue[0];d.pos=e+d.start;var f,g=new zc(new Ac(d),!0,this),h=g.getObj();
// Get dictionary
if(y(h,"xref")){if(
// Parse end-of-file XRef
f=this.processXRefTable(g),this.topDict||(this.topDict=f),
// Recursively get other XRefs 'XRefStm', if any
h=f.get("XRefStm"),u(h)){var i=h;
// ignore previously loaded xref streams
// (possible infinite recursion)
i in this.xrefstms||(this.xrefstms[i]=1,this.startXRefQueue.push(i))}}else u(h)?(
// Parse in-stream XRef
u(g.getObj())&&y(g.getObj(),"obj")&&B(h=g.getObj())||c("Invalid XRef stream"),f=this.processXRefStream(h),this.topDict||(this.topDict=f),f||c("Failed to read XRef stream")):c("Invalid XRef stream header");
// Recursively get previous dictionary, if any
h=f.get("Prev"),u(h)?this.startXRefQueue.push(h):D(h)&&
// The spec says Prev must not be a reference, i.e. "/Prev NNN"
// This is a fallback for non-compliant PDFs, i.e. "/Prev NNN 0 R"
this.startXRefQueue.push(h.num),this.startXRefQueue.shift()}return this.topDict}catch(j){if(j instanceof ea)throw j;a("(while reading XRef): "+j)}if(!b)throw new fa},getEntry:function(a){var b=this.entries[a];return b&&!b.free&&b.offset?b:null},fetchIfRef:function(a){return D(a)?this.fetch(a):a},fetch:function(a,b){e(D(a),"ref object is not a reference");var c=a.num;if(c in this.cache){var d=this.cache[c];return d}var f=this.getEntry(c);
// the referenced entry can be free
// the referenced entry can be free
return null===f?this.cache[c]=null:(f=f.uncompressed?this.fetchUncompressed(a,f,b):this.fetchCompressed(f,b),z(f)?f.objId=a.toString():B(f)&&(f.dict.objId=a.toString()),f)},fetchUncompressed:function(a,b,d){var e=a.gen,f=a.num;b.gen!==e&&c("inconsistent generation in XRef");var g=this.stream.makeSubStream(b.offset+this.stream.start),h=new zc(new Ac(g),!0,this),i=h.getObj(),j=h.getObj(),k=h.getObj();if(u(i)&&parseInt(i,10)===f&&u(j)&&parseInt(j,10)===e&&y(k)||c("bad XRef entry"),!y(k,"obj")){
// some bad PDFs use "obj1234" and really mean 1234
if(0===k.cmd.indexOf("obj")&&(f=parseInt(k.cmd.substring(3),10),!isNaN(f)))return f;c("bad XRef entry")}return b=this.encrypt&&!d?h.getObj(this.encrypt.createCipherTransform(f,e)):h.getObj(),B(b)||(this.cache[f]=b),b},fetchCompressed:function(a,b){var d=a.offset,e=this.fetch(new wa(d,0));B(e)||c("bad ObjStm stream");var f=e.dict.get("First"),g=e.dict.get("N");u(f)&&u(g)||c("invalid first and n parameters for ObjStm stream");var h=new zc(new Ac(e),!1,this);h.allowStreams=!0;var i,j,k=[],l=[];
// read the object numbers to populate cache
for(i=0;g>i;++i){j=h.getObj(),u(j)||c("invalid object number in the ObjStm stream: "+j),l.push(j);var m=h.getObj();u(m)||c("invalid object offset in the ObjStm stream: "+m)}
// read stream objects for cache
for(i=0;g>i;++i){k.push(h.getObj()),j=l[i];var n=this.entries[j];n&&n.offset===d&&n.gen===i&&(this.cache[j]=k[i])}return a=k[a.gen],void 0===a&&c("bad XRef entry for compressed object"),a},fetchIfRefAsync:function(a){return D(a)?this.fetchAsync(a):Promise.resolve(a)},fetchAsync:function(a,b){var c=this.stream.manager,d=this;return new Promise(function e(f,g){try{f(d.fetch(a,b))}catch(h){if(h instanceof ea)return void c.requestRange(h.begin,h.end,function(){e(f,g)});g(h)}})},getCatalogObj:function(){return this.root}},d}(),Ba=function(){function a(a,b){this.root=a,this.xref=b}return a.prototype={getAll:function(){var a={};if(!this.root)return a;var b=this.xref,d=new xa;d.put(this.root);for(var e=[this.root];e.length>0;){var f,g,h=b.fetchIfRef(e.shift());if(z(h))if(h.has("Kids")){var i=h.get("Kids");for(f=0,g=i.length;g>f;f++){var j=i[f];d.has(j)&&c("invalid destinations"),e.push(j),d.put(j)}}else{var k=h.get("Names");if(k)for(f=0,g=k.length;g>f;f+=2)a[k[f]]=b.fetchIfRef(k[f+1])}}return a},get:function(a){if(!this.root)return null;
// Perform a binary search to quickly find the entry that
// contains the named destination we are looking for.
for(var c,d,e,f=this.xref,g=f.fetchIfRef(this.root),h=0,i=10;g.has("Kids");){if(h++,h>i)return b("Search depth limit for named destionations has been reached."),null;var j=g.get("Kids");if(!A(j))return null;for(c=0,d=j.length-1;d>=c;){e=c+d>>1;var k=f.fetchIfRef(j[e]),l=k.get("Limits");if(a<l[0])d=e-1;else{if(!(a>l[1])){g=f.fetchIfRef(j[e]);break}c=e+1}}if(c>d)return null}
// If we get here, then we have found the right entry. Now
// go through the named destinations in the Named dictionary
// until we find the exact destination we're looking for.
var m=g.get("Names");if(A(m))for(
// Perform a binary search to reduce the lookup time.
c=0,d=m.length-2;d>=c;)if(
// Check only even indices (0, 2, 4, ...) because the
// odd indices contain the actual D array.
e=c+d&-2,a<m[e])d=e-2;else{if(!(a>m[e]))return f.fetchIfRef(m[e+1]);c=e+2}return null}},a}(),Ca=function(){function a(a,c){a&&z(a)&&(this.xref=c,this.root=a,a.has("FS")&&(this.fs=a.get("FS")),this.description=a.has("Desc")?q(a.get("Desc")):"",a.has("RF")&&b("Related file specifications are not supported"),this.contentAvailable=!0,a.has("EF")||(this.contentAvailable=!1,b("Non-embedded file specifications are not supported")))}function c(a){
// Look for the filename in this order:
// UF, F, Unix, Mac, DOS
// Look for the filename in this order:
// UF, F, Unix, Mac, DOS
return a.has("UF")?a.get("UF"):a.has("F")?a.get("F"):a.has("Unix")?a.get("Unix"):a.has("Mac")?a.get("Mac"):a.has("DOS")?a.get("DOS"):null}return a.prototype={get filename(){if(!this._filename&&this.root){var a=c(this.root)||"unnamed";this._filename=q(a).replace(/\\\\/g,"\\").replace(/\\\//g,"/").replace(/\\/g,"/")}return this._filename},get content(){if(!this.contentAvailable)return null;!this.contentRef&&this.root&&(this.contentRef=c(this.root.get("EF")));var a=null;if(this.contentRef){var d=this.xref,e=d.fetchIfRef(this.contentRef);e&&B(e)?a=e.getBytes():b("Embedded file specification points to non-existing/invalid content")}else b("Embedded file specification does not have a content");return a},get serializable(){return{filename:this.filename,content:this.content}}},a}(),Da=function(){function a(a){return D(a)||z(a)||A(a)||B(a)}function b(b,c){var d;if(z(b)||B(b)){var e;e=z(b)?b.map:b.dict.map;for(var f in e)d=e[f],a(d)&&c.push(d)}else if(A(b))for(var g=0,h=b.length;h>g;g++)d=b[g],a(d)&&c.push(d)}function c(a,b,c){this.obj=a,this.keys=b,this.xref=c,this.refSet=null}return c.prototype={load:function(){var a=this.keys;
// Don't walk the graph if all the data is already loaded.
if(this.capability=E(),!(this.xref.stream instanceof la)||0===this.xref.stream.getMissingChunks().length)return this.capability.resolve(),this.capability.promise;this.refSet=new xa;for(var b=[],c=0;c<a.length;c++)b.push(this.obj[a[c]]);return this.walk(b),this.capability.promise},walk:function(a){
// DFS walk of the object graph.
for(var c=[],d=[];a.length;){var e=a.pop();
// Only references or chunked streams can cause missing data exceptions.
if(D(e)){
// Skip nodes that have already been visited.
if(this.refSet.has(e))continue;try{var f=e;this.refSet.put(f),e=this.xref.fetch(e)}catch(g){if(!(g instanceof ea))throw g;c.push(e),d.push({begin:g.begin,end:g.end})}}if(e&&e.getBaseStreams){for(var h=e.getBaseStreams(),i=!1,j=0;j<h.length;j++){var k=h[j];k.getMissingChunks&&k.getMissingChunks().length&&(i=!0,d.push({begin:k.start,end:k.end}))}i&&c.push(e)}b(e,a)}
// Everything is loaded.
return d.length?void this.xref.stream.manager.requestRanges(d,function(){a=c;for(var b=0;b<c.length;b++){var d=c[b];
// Remove any reference nodes from the currrent refset so they
// aren't skipped when we revist them.
D(d)&&this.refSet.remove(d)}this.walk(a)}.bind(this)):(this.refSet=null,void this.capability.resolve())}},c}(),Ea=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],Fa=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],Ga=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"],Ha=22,Ia=["Link","Text","Widget"],Ja=function(){
// 12.5.5: Algorithm: Appearance streams
function a(a,b,c){var d=ia.getAxialAlignedBoundingBox(b,c),e=d[0],f=d[1],g=d[2],h=d[3];if(e===g||f===h)
// From real-life file, bbox was [0, 0, 0, 0]. In this case,
// just apply the transform for rect
return[1,0,0,1,a[0],a[1]];var i=(a[2]-a[0])/(g-e),j=(a[3]-a[1])/(h-f);return[i,0,0,j,a[0]-e*i,a[1]-f*j]}function c(a){var b=a.get("AP");if(z(b)){var c,d=b.get("N");if(z(d)){var e=a.get("AS");e&&d.has(e.name)&&(c=d.get(e.name))}else c=d;return c}}function d(a){var b=a.dict,d=this.data={};d.subtype=b.get("Subtype").name;var e=b.get("Rect")||[0,0,0,0];d.rect=ia.normalizeRect(e),d.annotationFlags=b.get("F");var f=b.get("C");if(f){if(A(f))switch(f.length){case 0:
// Empty array denotes transparent border.
d.color=null;break;case 1:
// TODO: implement DeviceGray
break;case 3:d.color=f;break;case 4:}}else
// The PDF spec does not mention how a missing color array is interpreted.
// Adobe Reader seems to default to black in this case.
d.color=[0,0,0];
// Some types of annotations have border style dict which has more
// info than the border array
if(b.has("BS")){var g=b.get("BS");d.borderWidth=g.has("W")?g.get("W"):1}else{var h=b.get("Border")||[0,0,1];d.borderWidth=h[2]||0;
// TODO: implement proper support for annotations with line dash patterns.
var i=h[3];if(d.borderWidth>0&&i)if(A(i)){var j=i.length;if(j>0){for(var k=!1,l=0,m=0;j>m;m++){var n=+i[m]>=0;if(!n){k=!0;break}i[m]>0&&l++}(k||0===l)&&(d.borderWidth=0)}}else
// Ignore the border if dashArray is not actually an array,
// this is consistent with the behaviour in Adobe Reader.
d.borderWidth=0}this.appearance=c(b),d.hasAppearance=!!this.appearance,d.id=a.ref.num}return d.prototype={getData:function(){return this.data},isInvisible:function(){var a=this.data;// Default: not invisible
return a&&-1!==Ia.indexOf(a.subtype)?!1:!!(a&&a.annotationFlags&&1&a.annotationFlags)},isViewable:function(){var a=this.data;// Hidden or NoView
return!(this.isInvisible()||!a||a.annotationFlags&&34&a.annotationFlags||!a.rect)},isPrintable:function(){var a=this.data;// Default: not printable
// Hidden
return!(!(!this.isInvisible()&&a&&a.annotationFlags&&4&a.annotationFlags)||2&a.annotationFlags||!a.rect)},loadResources:function(a){return new Promise(function(b,c){this.appearance.dict.getAsync("Resources").then(function(d){if(!d)return void b();var e=new Da(d.map,a,d.xref);e.load().then(function(){b(d)},c)},c)}.bind(this))},getOperatorList:function(b){if(!this.appearance)return Promise.resolve(new tb);var c=this.data,d=this.appearance.dict,e=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),f=d.get("BBox")||[0,0,1,1],g=d.get("Matrix")||[1,0,0,1,0,0],h=a(c.rect,f,g),i=this;return e.then(function(a){var d=new tb;return d.addOp(W.beginAnnotation,[c.rect,h,g]),b.getOperatorList(i.appearance,a,d).then(function(){return d.addOp(W.endAnnotation,[]),i.appearance.reset(),d})})}},d.getConstructor=function(a,b){if(a){
// TODO(mack): Implement FreeText annotations
if("Link"===a)return Oa;if("Text"===a)return Na;if("Widget"===a){if(!b)return;return"Tx"===b?La:Ka}return d}},d.fromRef=function(a,c){var e=a.fetchIfRef(c);if(z(e)){var f=e.get("Subtype");if(f=x(f)?f.name:""){var g=ia.getInheritableProperty(e,"FT");g=x(g)?g.name:"";var h=d.getConstructor(f,g);if(h){var i={dict:e,ref:c},j=new h(i);return j.isViewable()||j.isPrintable()?j:void(-1===Ia.indexOf(f)&&b("unimplemented annotation type: "+f))}}}},d.appendToOperatorList=function(a,b,c,d,e){function f(a){g.reject(a)}for(var g=E(),h=[],i=0,j=a.length;j>i;++i)("display"===e&&a[i].isViewable()||"print"===e&&a[i].isPrintable())&&h.push(a[i].getOperatorList(d));return Promise.all(h).then(function(a){b.addOp(W.beginAnnotations,[]);for(var c=0,d=a.length;d>c;++c){var e=a[c];b.addOpList(e)}b.addOp(W.endAnnotations,[]),g.resolve()},f),g.promise},d}(),Ka=function(){function a(a){Ja.call(this,a);var b=a.dict,c=this.data;c.fieldValue=q(ia.getInheritableProperty(b,"V")||""),c.alternativeText=q(b.get("TU")||""),c.defaultAppearance=ia.getInheritableProperty(b,"DA")||"";var d=ia.getInheritableProperty(b,"FT");c.fieldType=x(d)?d.name:"",c.fieldFlags=ia.getInheritableProperty(b,"Ff")||0,this.fieldResources=ia.getInheritableProperty(b,"DR")||va.empty;for(
// Building the full field name by collecting the field and
// its ancestors 'T' data and joining them using '.'.
var e=[],f=b,g=a.ref;f;){var h=f.get("Parent"),i=f.getRaw("Parent"),j=f.get("T");if(j)e.unshift(q(j));else if(h&&g){
// The field name is absent, that means more than one field
// with the same name may exist. Replacing the empty name
// with the '`' plus index in the parent's 'Kids' array.
// This is not in the PDF spec but necessary to id the
// the input controls.
var k,l,m=h.get("Kids");for(k=0,l=m.length;l>k;k++){var n=m[k];if(n.num===g.num&&n.gen===g.gen)break}e.unshift("`"+k)}f=h,g=i}c.fullName=e.join(".")}var c=Ja.prototype;return ia.inherit(a,Ja,{isViewable:function(){return"Sig"===this.data.fieldType?(b("unimplemented annotation type: Widget signature"),!1):c.isViewable.call(this)}}),a}(),La=function(){function a(a){Ka.call(this,a),this.data.textAlignment=ia.getInheritableProperty(a.dict,"Q"),this.data.annotationType=T.WIDGET,this.data.hasHtml=!this.data.hasAppearance&&!!this.data.fieldValue}return ia.inherit(a,Ka,{getOperatorList:function(a){if(this.appearance)return Ja.prototype.getOperatorList.call(this,a);var b=new tb,c=this.data;
// Even if there is an appearance stream, ignore it. This is the
// behaviour used by Adobe Reader.
if(!c.defaultAppearance)return Promise.resolve(b);var d=new Gc(i(c.defaultAppearance));return a.getOperatorList(d,this.fieldResources,b).then(function(){return b})}}),a}(),Ma=function(){function a(a){Ja.call(this,a),this.data.hasHtml=!0}return ia.inherit(a,Ja,{}),a}(),Na=function(){function a(a){Ma.call(this,a);var b=a.dict,c=this.data,d=b.get("Contents"),e=b.get("T");c.annotationType=T.TEXT,c.content=q(d||""),c.title=q(e||""),c.hasAppearance?c.name="NoIcon":(c.rect[1]=c.rect[3]-Ha,c.rect[2]=c.rect[0]+Ha,c.name=b.has("Name")?b.get("Name").name:"Note"),b.has("C")&&(c.hasBgColor=!0)}return ia.inherit(a,Ma,{}),a}(),Oa=function(){function a(a){Ma.call(this,a);var d=a.dict,e=this.data;e.annotationType=T.LINK;var g=d.get("A");if(g&&z(g)){var h=g.get("S").name;if("URI"===h){var i=g.get("URI");x(i)?
// Some bad PDFs do not put parentheses around relative URLs.
i="/"+i.name:i&&(i=c(i)),
// TODO: pdf spec mentions urls can be relative to a Base
// entry in the dictionary.
f(i,!1)||(i=""),e.url=i}else if("GoTo"===h)e.dest=g.get("D");else if("GoToR"===h){var j=g.get("F");z(j)&&(
// We assume that the 'url' is a Filspec dictionary
// and fetch the url without checking any further
i=j.get("F")||""),
// TODO: pdf reference says that GoToR
// can also have 'NewWindow' attribute
f(i,!1)||(i=""),e.url=i,e.dest=g.get("D")}else"Named"===h?e.action=g.get("N").name:b("unrecognized link type: "+h)}else if(d.has("Dest")){
// simple destination link
var k=d.get("Dest");e.dest=x(k)?k.name:k}}
// Lets URLs beginning with 'www.' default to using the 'http://' protocol.
function c(a){return a&&0===a.indexOf("www.")?"http://"+a:a}return ia.inherit(a,Ma,{}),a}(),Pa=function(){var b=0,d=2,e=3,f=4;return{getSampleArray:function(a,b,c,d){var e,f,g=1;for(e=0,f=a.length;f>e;e++)g*=a[e];g*=b;var h=new Array(g),i=0,j=0,k=1/(Math.pow(2,c)-1),l=d.getBytes((g*c+7)/8),m=0;for(e=0;g>e;e++){for(;c>i;)j<<=8,j|=l[m++],i+=8;i-=c,h[e]=(j>>i)*k,j&=(1<<i)-1}return h},getIR:function(a,b){var d=b.dict;d||(d=b);var e=[this.constructSampled,null,this.constructInterpolated,this.constructStiched,this.constructPostScript],f=d.get("FunctionType"),g=e[f];return g||c("Unknown type of function"),g.call(this,b,d,a)},fromIR:function(a){var c=a[0];switch(c){case b:return this.constructSampledFromIR(a);case d:return this.constructInterpolatedFromIR(a);case e:return this.constructStichedFromIR(a);
//case CONSTRUCT_POSTSCRIPT:
default:return this.constructPostScriptFromIR(a)}},parse:function(a,b){var c=this.getIR(a,b);return this.fromIR(c)},parseArray:function(a,b){if(!A(b))
// not an array -- parsing as regular function
return this.parse(a,b);for(var c=[],d=0,e=b.length;e>d;d++){var f=a.fetchIfRef(b[d]);c.push(Pa.parse(a,f))}return function(a,b,d,e){for(var f=0,g=c.length;g>f;f++)c[f](a,b,d,e+f)}},constructSampled:function(d,e){function f(a){for(var b=a.length,c=[],d=0,e=0;b>e;e+=2)c[d]=[a[e],a[e+1]],++d;return c}var g=e.get("Domain"),h=e.get("Range");g&&h||c("No domain or range");var i=g.length/2,j=h.length/2;g=f(g),h=f(h);var k=e.get("Size"),l=e.get("BitsPerSample"),m=e.get("Order")||1;1!==m&&
// No description how cubic spline interpolation works in PDF32000:2008
// As in poppler, ignoring order, linear interpolation may work as good
a("No support for cubic spline interpolation: "+m);var n=e.get("Encode");if(!n){n=[];for(var o=0;i>o;++o)n.push(0),n.push(k[o]-1)}n=f(n);var p=e.get("Decode");p=p?f(p):h;var q=this.getSampleArray(k,j,l,d);return[b,i,g,n,p,q,k,j,Math.pow(2,l)-1,h]},constructSampledFromIR:function(a){
// See chapter 3, page 109 of the PDF reference
function b(a,b,c,d,e){return d+(a-b)*((e-d)/(c-b))}return function(c,d,e,f){
// See chapter 3, page 110 of the PDF reference.
var g,h,i=a[1],j=a[2],k=a[3],l=a[4],m=a[5],n=a[6],o=a[7],p=a[9],q=1<<i,r=new Float64Array(q),s=new Uint32Array(q);for(h=0;q>h;h++)r[h]=1;var t=o,u=1;
// Map x_i to y_j for 0 <= i < m using the sampled function.
for(g=0;i>g;++g){
// x_i' = min(max(x_i, Domain_2i), Domain_2i+1)
var v=j[g][0],w=j[g][1],x=Math.min(Math.max(c[d+g],v),w),y=b(x,v,w,k[g][0],k[g][1]),z=n[g];y=Math.min(Math.max(y,0),z-1);
// Adjusting the cube: N and vertex sample index
var A=z-1>y?Math.floor(y):y-1,B=A+1-y,C=y-A,D=A*t,E=D+t;// e1 * k
for(h=0;q>h;h++)h&u?(r[h]*=C,s[h]+=E):(r[h]*=B,s[h]+=D);t*=z,u<<=1}for(h=0;o>h;++h){
// Sum all cube vertices' samples portions
var F=0;for(g=0;q>g;g++)F+=m[s[g]+h]*r[g];
// r_j' = Interpolate(r_j, 0, 2^BitsPerSample - 1,
//                    Decode_2j, Decode_2j+1)
F=b(F,0,1,l[h][0],l[h][1]),
// y_j = min(max(r_j, range_2j), range_2j+1)
e[f+h]=Math.min(Math.max(F,p[h][0]),p[h][1])}}},constructInterpolated:function(a,b){var e=b.get("C0")||[0],f=b.get("C1")||[1],g=b.get("N");A(e)&&A(f)||c("Illegal dictionary for interpolated function");for(var h=e.length,i=[],j=0;h>j;++j)i.push(f[j]-e[j]);return[d,e,i,g]},constructInterpolatedFromIR:function(a){var b=a[1],c=a[2],d=a[3],e=c.length;return function(a,f,g,h){for(var i=1===d?a[f]:Math.pow(a[f],d),j=0;e>j;++j)g[h+j]=b[j]+i*c[j]}},constructStiched:function(a,b,d){var f=b.get("Domain");f||c("No domain");var g=f.length/2;1!==g&&c("Bad domain for stiched function");for(var h=b.get("Functions"),i=[],j=0,k=h.length;k>j;++j)i.push(Pa.getIR(d,d.fetchIfRef(h[j])));var l=b.get("Bounds"),m=b.get("Encode");return[e,f,l,m,i]},constructStichedFromIR:function(a){for(var b=a[1],c=a[2],d=a[3],e=a[4],f=[],g=new Float32Array(1),h=0,i=e.length;i>h;h++)f.push(Pa.fromIR(e[h]));return function(a,e,h,i){
// calulate which bound the value is in
for(var j=function(a,b,c){return a>c?a=c:b>a&&(a=b),a},k=j(a[e],b[0],b[1]),l=0,m=c.length;m>l&&!(k<c[l]);++l);
// encode value into domain of function
var n=b[0];l>0&&(n=c[l-1]);var o=b[1];l<c.length&&(o=c[l]);var p=d[2*l],q=d[2*l+1];g[0]=p+(k-n)*(q-p)/(o-n),
// call the appropriate function
f[l](g,0,h,i)}},constructPostScript:function(a,b,d){var e=b.get("Domain"),g=b.get("Range");e||c("No domain."),g||c("No range.");var h=new Fc(a),i=new Cc(h),j=i.parse();return[f,e,g,j]},constructPostScriptFromIR:function(b){var c=b[1],d=b[2],e=b[3],f=(new Sa).compile(e,c,d);if(f)
// Compiled function consists of simple expressions such as addition,
// subtraction, Math.max, and also contains 'var' and 'return'
// statements. See the generation in the PostScriptCompiler below.
/*jshint -W054 */
return new Function("src","srcOffset","dest","destOffset",f);a("Unable to compile PS function");var g=d.length>>1,h=c.length>>1,i=new Ra(e),j={},k=8192,l=k,m=new Float32Array(h);return function(a,b,c,e){var f,k,n="",o=m;for(f=0;h>f;f++)k=a[b+f],o[f]=k,n+=k+"_";var p=j[n];if(void 0!==p)return void c.set(p,e);var q=new Float32Array(g),r=i.execute(o),s=r.length-g;for(f=0;g>f;f++){k=r[s+f];var t=d[2*f];t>k?k=t:(t=d[2*f+1],k>t&&(k=t)),q[f]=k}l>0&&(l--,j[n]=q),c.set(q,e)}}}}(),Qa=function(){function a(a){this.stack=a?Array.prototype.slice.call(a,0):[]}var b=100;return a.prototype={push:function(a){this.stack.length>=b&&c("PostScript function stack overflow."),this.stack.push(a)},pop:function(){return this.stack.length<=0&&c("PostScript function stack underflow."),this.stack.pop()},copy:function(a){this.stack.length+a>=b&&c("PostScript function stack overflow.");for(var d=this.stack,e=d.length-a,f=a-1;f>=0;f--,e++)d.push(d[e])},index:function(a){this.push(this.stack[this.stack.length-a-1])},
// rotate the last n stack elements p times
roll:function(a,b){var c,d,e,f=this.stack,g=f.length-a,h=f.length-1,i=g+(b-Math.floor(b/a)*a);for(c=g,d=h;d>c;c++,d--)e=f[c],f[c]=f[d],f[d]=e;for(c=g,d=i-1;d>c;c++,d--)e=f[c],f[c]=f[d],f[d]=e;for(c=i,d=h;d>c;c++,d--)e=f[c],f[c]=f[d],f[d]=e}},a}(),Ra=function(){function a(a){this.operators=a}return a.prototype={execute:function(a){for(var b,d,e,f=new Qa(a),g=0,h=this.operators,i=h.length;i>g;)if(b=h[g++],"number"!=typeof b)switch(b){
// non standard ps operators
case"jz":// jump if false
e=f.pop(),d=f.pop(),d||(g=e);break;case"j":// jump
d=f.pop(),g=d;break;
// all ps operators in alphabetical order (excluding if/ifelse)
case"abs":d=f.pop(),f.push(Math.abs(d));break;case"add":e=f.pop(),d=f.pop(),f.push(d+e);break;case"and":e=f.pop(),d=f.pop(),f.push(t(d)&&t(e)?d&&e:d&e);break;case"atan":d=f.pop(),f.push(Math.atan(d));break;case"bitshift":e=f.pop(),d=f.pop(),f.push(d>0?d<<e:d>>e);break;case"ceiling":d=f.pop(),f.push(Math.ceil(d));break;case"copy":d=f.pop(),f.copy(d);break;case"cos":d=f.pop(),f.push(Math.cos(d));break;case"cvi":d=0|f.pop(),f.push(d);break;case"cvr":
// noop
break;case"div":e=f.pop(),d=f.pop(),f.push(d/e);break;case"dup":f.copy(1);break;case"eq":e=f.pop(),d=f.pop(),f.push(d===e);break;case"exch":f.roll(2,1);break;case"exp":e=f.pop(),d=f.pop(),f.push(Math.pow(d,e));break;case"false":f.push(!1);break;case"floor":d=f.pop(),f.push(Math.floor(d));break;case"ge":e=f.pop(),d=f.pop(),f.push(d>=e);break;case"gt":e=f.pop(),d=f.pop(),f.push(d>e);break;case"idiv":e=f.pop(),d=f.pop(),f.push(d/e|0);break;case"index":d=f.pop(),f.index(d);break;case"le":e=f.pop(),d=f.pop(),f.push(e>=d);break;case"ln":d=f.pop(),f.push(Math.log(d));break;case"log":d=f.pop(),f.push(Math.log(d)/Math.LN10);break;case"lt":e=f.pop(),d=f.pop(),f.push(e>d);break;case"mod":e=f.pop(),d=f.pop(),f.push(d%e);break;case"mul":e=f.pop(),d=f.pop(),f.push(d*e);break;case"ne":e=f.pop(),d=f.pop(),f.push(d!==e);break;case"neg":d=f.pop(),f.push(-d);break;case"not":d=f.pop(),f.push(t(d)?!d:~d);break;case"or":e=f.pop(),d=f.pop(),f.push(t(d)&&t(e)?d||e:d|e);break;case"pop":f.pop();break;case"roll":e=f.pop(),d=f.pop(),f.roll(d,e);break;case"round":d=f.pop(),f.push(Math.round(d));break;case"sin":d=f.pop(),f.push(Math.sin(d));break;case"sqrt":d=f.pop(),f.push(Math.sqrt(d));break;case"sub":e=f.pop(),d=f.pop(),f.push(d-e);break;case"true":f.push(!0);break;case"truncate":d=f.pop(),d=0>d?Math.ceil(d):Math.floor(d),f.push(d);break;case"xor":e=f.pop(),d=f.pop(),f.push(t(d)&&t(e)?d!==e:d^e);break;default:c("Unknown operator "+b)}else
// Operator is really an operand and should be pushed to the stack.
f.push(b);return f.stack}},a}(),Sa=function(){function a(a){this.type=a}function b(b,c,d){a.call(this,"args"),this.index=b,this.min=c,this.max=d}function c(b){a.call(this,"literal"),this.number=b,this.min=b,this.max=b}function d(b,c,d,e,f){a.call(this,"binary"),this.op=b,this.arg1=c,this.arg2=d,this.min=e,this.max=f}function e(b,c){a.call(this,"max"),this.arg=b,this.min=b.min,this.max=c}function f(b,c,d){a.call(this,"var"),this.index=b,this.min=c,this.max=d}function g(b,c){a.call(this,"definition"),this.variable=b,this.arg=c}function h(){this.parts=[]}function i(a,b){return"literal"===b.type&&0===b.number?a:"literal"===a.type&&0===a.number?b:"literal"===b.type&&"literal"===a.type?new c(a.number+b.number):new d("+",a,b,a.min+b.min,a.max+b.max)}function j(a,b){if("literal"===b.type){
// optimization: second operands is a literal...
if(0===b.number)return new c(0);if(1===b.number)return a;if("literal"===a.type)
// ... and first operands is a literal too
return new c(a.number*b.number)}if("literal"===a.type){
// optimization: first operands is a literal...
if(0===a.number)return new c(0);if(1===a.number)return b}var e=Math.min(a.min*b.min,a.min*b.max,a.max*b.min,a.max*b.max),f=Math.max(a.min*b.min,a.min*b.max,a.max*b.min,a.max*b.max);return new d("*",a,b,e,f)}function k(a,b){if("literal"===b.type){
// optimization: second operands is a literal...
if(0===b.number)return a;if("literal"===a.type)
// ... and first operands is a literal too
return new c(a.number-b.number)}return"binary"===b.type&&"-"===b.op&&"literal"===a.type&&1===a.number&&"literal"===b.arg1.type&&1===b.arg1.number?b.arg2:new d("-",a,b,a.min-b.max,a.max-b.min)}function l(a,b){return a.min>=b?new c(b):a.max<=b?a:new e(a,b)}function m(){}return a.prototype.visit=function(a){throw new Error("abstract method")},b.prototype=Object.create(a.prototype),b.prototype.visit=function(a){a.visitArgument(this)},c.prototype=Object.create(a.prototype),c.prototype.visit=function(a){a.visitLiteral(this)},d.prototype=Object.create(a.prototype),d.prototype.visit=function(a){a.visitBinaryOperation(this)},e.prototype=Object.create(a.prototype),e.prototype.visit=function(a){a.visitMin(this)},f.prototype=Object.create(a.prototype),f.prototype.visit=function(a){a.visitVariable(this)},g.prototype=Object.create(a.prototype),g.prototype.visit=function(a){a.visitVariableDefinition(this)},h.prototype={visitArgument:function(a){this.parts.push("Math.max(",a.min,", Math.min(",a.max,", src[srcOffset + ",a.index,"]))")},visitVariable:function(a){this.parts.push("v",a.index)},visitLiteral:function(a){this.parts.push(a.number)},visitBinaryOperation:function(a){this.parts.push("("),a.arg1.visit(this),this.parts.push(" ",a.op," "),a.arg2.visit(this),this.parts.push(")")},visitVariableDefinition:function(a){this.parts.push("var "),a.variable.visit(this),this.parts.push(" = "),a.arg.visit(this),this.parts.push(";")},visitMin:function(a){this.parts.push("Math.min("),a.arg.visit(this),this.parts.push(", ",a.max,")")},toString:function(){return this.parts.join("")}},m.prototype={compile:function(a,d,e){var m,n,o,p,q,r,s,t,u,v,w=[],x=[],y=d.length>>1,z=e.length>>1,A=0;for(m=0;y>m;m++)w.push(new b(m,d[2*m],d[2*m+1]));for(m=0,n=a.length;n>m;m++)if(v=a[m],"number"!=typeof v)switch(v){case"add":if(w.length<2)return null;r=w.pop(),q=w.pop(),w.push(i(q,r));break;case"cvr":if(w.length<1)return null;break;case"mul":if(w.length<2)return null;r=w.pop(),q=w.pop(),w.push(j(q,r));break;case"sub":if(w.length<2)return null;r=w.pop(),q=w.pop(),w.push(k(q,r));break;case"exch":if(w.length<2)return null;s=w.pop(),t=w.pop(),w.push(s,t);break;case"pop":if(w.length<1)return null;w.pop();break;case"index":if(w.length<1)return null;if(q=w.pop(),"literal"!==q.type)return null;if(o=q.number,0>o||(0|o)!==o||w.length<o)return null;if(s=w[w.length-o-1],"literal"===s.type||"var"===s.type){w.push(s);break}u=new f(A++,s.min,s.max),w[w.length-o-1]=u,w.push(u),x.push(new g(u,s));break;case"dup":if(w.length<1)return null;if("number"==typeof a[m+1]&&"gt"===a[m+2]&&a[m+3]===m+7&&"jz"===a[m+4]&&"pop"===a[m+5]&&a[m+6]===a[m+1]){
// special case of the commands sequence for the min operation
q=w.pop(),w.push(l(q,a[m+1])),m+=6;break}if(s=w[w.length-1],"literal"===s.type||"var"===s.type){
// we don't have to save into intermediate variable a literal or
// variable.
w.push(s);break}u=new f(A++,s.min,s.max),w[w.length-1]=u,w.push(u),x.push(new g(u,s));break;case"roll":if(w.length<2)return null;if(r=w.pop(),q=w.pop(),"literal"!==r.type||"literal"!==q.type)
// both roll operands must be numbers
return null;if(p=r.number,o=q.number,0>=o||(0|o)!==o||(0|p)!==p||w.length<o)
// ... and integers
return null;if(p=(p%o+o)%o,0===p)break;Array.prototype.push.apply(w,w.splice(w.length-o,o-p));break;default:return null}else w.push(new c(v));if(w.length!==z)return null;var B=[];return x.forEach(function(a){var b=new h;a.visit(b),B.push(b.toString())}),w.forEach(function(a,b){var c=new h;a.visit(c);var d=e[2*b],f=e[2*b+1],g=[c.toString()];d>a.min&&(g.unshift("Math.max(",d,", "),g.push(")")),f<a.max&&(g.unshift("Math.min(",f,", "),g.push(")")),g.unshift("dest[destOffset + ",b,"] = "),g.push(";"),B.push(g.join(""))}),B.join("\n")}},m}(),Ta=function(){
// Constructor should define this.numComps, this.defaultColor, this.name
function a(){c("should not call ColorSpace constructor")}/**
   * Checks if a decode map matches the default decode map for a color space.
   * This handles the general decode maps where there are two values per
   * component. e.g. [0, 1, 0, 1, 0, 1] for a RGB color.
   * This does not handle Lab, Indexed, or Pattern decode maps since they are
   * slightly different.
   * @param {Array} decode Decode map (usually from an image).
   * @param {Number} n Number of components the color space has.
   */
return a.prototype={/**
     * Converts the color value to the RGB color. The color components are
     * located in the src array starting from the srcOffset. Returns the array
     * of the rgb components, each value ranging from [0,255].
     */
getRgb:function(a,b){var c=new Uint8Array(3);return this.getRgbItem(a,b,c,0),c},/**
     * Converts the color value to the RGB color, similar to the getRgb method.
     * The result placed into the dest array starting from the destOffset.
     */
getRgbItem:function(a,b,d,e){c("Should not call ColorSpace.getRgbItem")},/**
     * Converts the specified number of the color values to the RGB colors.
     * The colors are located in the src array starting from the srcOffset.
     * The result is placed into the dest array starting from the destOffset.
     * The src array items shall be in [0,2^bits) range, the dest array items
     * will be in [0,255] range. alpha01 indicates how many alpha components
     * there are in the dest array; it will be either 0 (RGB array) or 1 (RGBA
     * array).
     */
getRgbBuffer:function(a,b,d,e,f,g,h){c("Should not call ColorSpace.getRgbBuffer")},/**
     * Determines the number of bytes required to store the result of the
     * conversion done by the getRgbBuffer method. As in getRgbBuffer,
     * |alpha01| is either 0 (RGB output) or 1 (RGBA output).
     */
getOutputLength:function(a,b){c("Should not call ColorSpace.getOutputLength")},/**
     * Returns true if source data will be equal the result/output data.
     */
isPassthrough:function(a){return!1},/**
     * Fills in the RGB colors in the destination buffer.  alpha01 indicates
     * how many alpha components there are in the dest array; it will be either
     * 0 (RGB array) or 1 (RGBA array).
     */
fillRgb:function(a,b,c,d,e,f,g,h,i){var j,k,l=b*c,m=null,n=1<<g,o=c!==e||b!==d;if(this.isPassthrough(g))m=h;else if(1===this.numComps&&l>n&&"DeviceGray"!==this.name&&"DeviceRGB"!==this.name){
// Optimization: create a color map when there is just one component and
// we are converting more colors than the size of the color map. We
// don't build the map if the colorspace is gray or rgb since those
// methods are faster than building a map. This mainly offers big speed
// ups for indexed and alternate colorspaces.
//
// TODO it may be worth while to cache the color map. While running
// testing I never hit a cache so I will leave that out for now (perhaps
// we are reparsing colorspaces too much?).
var p,q=8>=g?new Uint8Array(n):new Uint16Array(n);for(j=0;n>j;j++)q[j]=j;var r=new Uint8Array(3*n);this.getRgbBuffer(q,0,n,r,0,g,/* alpha01 = */
0);var s,t;if(o)for(m=new Uint8Array(3*l),t=0,j=0;l>j;++j)p=3*h[j],m[t++]=r[p],m[t++]=r[p+1],m[t++]=r[p+2];else for(
// Fill in the RGB values directly into |dest|.
s=0,j=0;l>j;++j)p=3*h[j],a[s++]=r[p],a[s++]=r[p+1],a[s++]=r[p+2],s+=i}else o?(m=new Uint8Array(3*l),this.getRgbBuffer(h,0,l,m,0,g,/* alpha01 = */
0)):
// Fill in the RGB values directly into |dest|.
this.getRgbBuffer(h,0,d*f,a,0,g,i);if(m)if(o)vc.resize(m,g,3,b,c,d,e,a,i);else for(t=0,s=0,j=0,k=d*f;k>j;j++)a[s++]=m[t++],a[s++]=m[t++],a[s++]=m[t++],s+=i},/**
     * True if the colorspace has components in the default range of [0, 1].
     * This should be true for all colorspaces except for lab color spaces
     * which are [0,100], [-128, 127], [-128, 127].
     */
usesZeroToOneRange:!0},a.parse=function(b,c,d){var e=a.parseToIR(b,c,d);return e instanceof Ua?e:a.fromIR(e)},a.fromIR=function(b){var d,e,f,g=A(b)?b[0]:b;switch(g){case"DeviceGrayCS":return this.singletons.gray;case"DeviceRgbCS":return this.singletons.rgb;case"DeviceCmykCS":return this.singletons.cmyk;case"CalGrayCS":return d=b[1].WhitePoint,e=b[1].BlackPoint,f=b[1].Gamma,new $a(d,e,f);case"CalRGBCS":d=b[1].WhitePoint,e=b[1].BlackPoint,f=b[1].Gamma;var h=b[1].Matrix;return new _a(d,e,f,h);case"PatternCS":var i=b[1];return i&&(i=a.fromIR(i)),new Va(i);case"IndexedCS":var j=b[1],k=b[2],l=b[3];return new Wa(a.fromIR(j),k,l);case"AlternateCS":var m=b[1],n=b[2],o=b[3];return new Ua(m,a.fromIR(n),Pa.fromIR(o));case"LabCS":d=b[1].WhitePoint,e=b[1].BlackPoint;var p=b[1].Range;return new ab(d,e,p);default:c("Unknown name "+g)}return null},a.parseToIR=function(b,d,e){if(x(b)){var f=e.get("ColorSpace");if(z(f)){var g=f.get(b.name);g&&(b=g)}}b=d.fetchIfRef(b);var h;if(x(b))switch(h=b.name,this.mode=h,h){case"DeviceGray":case"G":return"DeviceGrayCS";case"DeviceRGB":case"RGB":return"DeviceRgbCS";case"DeviceCMYK":case"CMYK":return"DeviceCmykCS";case"Pattern":return["PatternCS",null];default:c("unrecognized colorspace "+h)}else if(A(b)){h=b[0].name,this.mode=h;var i,j;switch(h){case"DeviceGray":case"G":return"DeviceGrayCS";case"DeviceRGB":case"RGB":return"DeviceRgbCS";case"DeviceCMYK":case"CMYK":return"DeviceCmykCS";case"CalGray":return j=d.fetchIfRef(b[1]).getAll(),["CalGrayCS",j];case"CalRGB":return j=d.fetchIfRef(b[1]).getAll(),["CalRGBCS",j];case"ICCBased":var k=d.fetchIfRef(b[1]),l=k.dict;if(i=l.get("N"),1===i)return"DeviceGrayCS";if(3===i)return"DeviceRgbCS";if(4===i)return"DeviceCmykCS";break;case"Pattern":var m=b[1];return m&&(m=a.parseToIR(m,d,e)),["PatternCS",m];case"Indexed":case"I":var n=a.parseToIR(b[1],d,e),o=b[2]+1,p=d.fetchIfRef(b[3]);return B(p)&&(p=p.getBytes()),["IndexedCS",n,o,p];case"Separation":case"DeviceN":var q=b[1];i=1,x(q)?i=1:A(q)&&(i=q.length);var r=a.parseToIR(b[2],d,e),s=Pa.getIR(d,d.fetchIfRef(b[3]));return["AlternateCS",i,r,s];case"Lab":return j=b[1].getAll(),["LabCS",j];default:c('unimplemented color space object "'+h+'"')}}else c('unrecognized color space object: "'+b+'"');return null},a.isDefaultDecode=function(a,c){if(!a)return!0;if(2*c!==a.length)return b("The decode map is not the correct length"),!0;for(var d=0,e=a.length;e>d;d+=2)if(0!==a[d]||1!==a[d+1])return!1;return!0},a.singletons={get gray(){return g(this,"gray",new Xa)},get rgb(){return g(this,"rgb",new Ya)},get cmyk(){return g(this,"cmyk",new Za)}},a}(),Ua=function(){function a(a,b,c){this.name="Alternate",this.numComps=a,this.defaultColor=new Float32Array(a);for(var d=0;a>d;++d)this.defaultColor[d]=1;this.base=b,this.tintFn=c,this.tmpBuf=new Float32Array(b.numComps)}return a.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=this.tmpBuf;this.tintFn(a,b,e,0),this.base.getRgbItem(e,0,c,d)},getRgbBuffer:function(a,b,c,d,e,f,g){var h,i,j=this.tintFn,k=this.base,l=1/((1<<f)-1),m=k.numComps,n=k.usesZeroToOneRange,o=(k.isPassthrough(8)||!n)&&0===g,p=o?e:0,q=o?d:new Uint8Array(m*c),r=this.numComps,s=new Float32Array(r),t=new Float32Array(m);if(n)for(h=0;c>h;h++){for(i=0;r>i;i++)s[i]=a[b++]*l;for(j(s,0,t,0),i=0;m>i;i++)q[p++]=255*t[i]}else for(h=0;c>h;h++){for(i=0;r>i;i++)s[i]=a[b++]*l;j(s,0,t,0),k.getRgbItem(t,0,q,p),p+=m}o||k.getRgbBuffer(q,0,c,d,e,8,g)},getOutputLength:function(a,b){return this.base.getOutputLength(a*this.base.numComps/this.numComps,b)},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){return Ta.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),Va=function(){function a(a){this.name="Pattern",this.base=a}return a.prototype={},a}(),Wa=function(){function a(a,b,d){this.name="Indexed",this.numComps=1,this.defaultColor=new Uint8Array([0]),this.base=a,this.highVal=b;var e,f=a.numComps,g=f*b;if(B(d)){e=new Uint8Array(g);var h=d.getBytes(g);e.set(h)}else if(w(d)){e=new Uint8Array(g);for(var i=0;g>i;++i)e[i]=d.charCodeAt(i)}else d instanceof Uint8Array||d instanceof Array?e=d:c("Unrecognized lookup table: "+d);this.lookup=e}return a.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=this.base.numComps,f=a[b]*e;this.base.getRgbItem(this.lookup,f,c,d)},getRgbBuffer:function(a,b,c,d,e,f,g){for(var h=this.base,i=h.numComps,j=h.getOutputLength(i,g),k=this.lookup,l=0;c>l;++l){var m=a[b++]*i;h.getRgbBuffer(k,m,1,d,e,8,g),e+=j}},getOutputLength:function(a,b){return this.base.getOutputLength(a*this.base.numComps,b)},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){
// indexed color maps shouldn't be changed
return!0},usesZeroToOneRange:!0},a}(),Xa=function(){function a(){this.name="DeviceGray",this.numComps=1,this.defaultColor=new Float32Array([0])}return a.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=255*a[b]|0;e=0>e?0:e>255?255:e,c[d]=c[d+1]=c[d+2]=e},getRgbBuffer:function(a,b,c,d,e,f,g){for(var h=255/((1<<f)-1),i=b,j=e,k=0;c>k;++k){var l=h*a[i++]|0;d[j++]=l,d[j++]=l,d[j++]=l,j+=g}},getOutputLength:function(a,b){return a*(3+b)},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){return Ta.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),Ya=function(){function a(){this.name="DeviceRGB",this.numComps=3,this.defaultColor=new Float32Array([0,0,0])}return a.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=255*a[b]|0,f=255*a[b+1]|0,g=255*a[b+2]|0;c[d]=0>e?0:e>255?255:e,c[d+1]=0>f?0:f>255?255:f,c[d+2]=0>g?0:g>255?255:g},getRgbBuffer:function(a,b,c,d,e,f,g){if(8===f&&0===g)return void d.set(a.subarray(b,b+3*c),e);for(var h=255/((1<<f)-1),i=b,j=e,k=0;c>k;++k)d[j++]=h*a[i++]|0,d[j++]=h*a[i++]|0,d[j++]=h*a[i++]|0,j+=g},getOutputLength:function(a,b){return a*(3+b)/3|0},isPassthrough:function(a){return 8===a},fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){return Ta.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),Za=function(){
// The coefficients below was found using numerical analysis: the method of
// steepest descent for the sum((f_i - color_value_i)^2) for r/g/b colors,
// where color_value is the tabular value from the table of sampled RGB colors
// from CMYK US Web Coated (SWOP) colorspace, and f_i is the corresponding
// CMYK color conversion using the estimation below:
//   f(A, B,.. N) = Acc+Bcm+Ccy+Dck+c+Fmm+Gmy+Hmk+Im+Jyy+Kyk+Ly+Mkk+Nk+255
function a(a,b,c,d,e){var f=a[b+0]*c,g=a[b+1]*c,h=a[b+2]*c,i=a[b+3]*c,j=f*(-4.387332384609988*f+54.48615194189176*g+18.82290502165302*h+212.25662451639585*i+-285.2331026137004)+g*(1.7149763477362134*g-5.6096736904047315*h+-17.873870861415444*i-5.497006427196366)+h*(-2.5217340131683033*h-21.248923337353073*i+17.5119270841813)+i*(-21.86122147463605*i-189.48180835922747)+255|0,k=f*(8.841041422036149*f+60.118027045597366*g+6.871425592049007*h+31.159100130055922*i+-79.2970844816548)+g*(-15.310361306967817*g+17.575251261109482*h+131.35250912493976*i-190.9453302588951)+h*(4.444339102852739*h+9.8632861493405*i-24.86741582555878)+i*(-20.737325471181034*i-187.80453709719578)+255|0,l=f*(.8842522430003296*f+8.078677503112928*g+30.89978309703729*h-.23883238689178934*i+-14.183576799673286)+g*(10.49593273432072*g+63.02378494754052*h+50.606957656360734*i-112.23884253719248)+h*(.03296041114873217*h+115.60384449646641*i+-193.58209356861505)+i*(-22.33816807309886*i-180.12613974708367)+255|0;d[e]=j>255?255:0>j?0:j,d[e+1]=k>255?255:0>k?0:k,d[e+2]=l>255?255:0>l?0:l}function b(){this.name="DeviceCMYK",this.numComps=4,this.defaultColor=new Float32Array([0,0,0,1])}return b.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(b,c,d,e){a(b,c,1,d,e)},getRgbBuffer:function(b,c,d,e,f,g,h){for(var i=1/((1<<g)-1),j=0;d>j;j++)a(b,c,i,e,f),c+=4,f+=3+h},getOutputLength:function(a,b){return a/4*(3+b)|0},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){return Ta.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},b}(),$a=function(){function d(d,e,f){this.name="CalGray",this.numComps=1,this.defaultColor=new Float32Array([0]),d||c("WhitePoint missing - required for color space CalGray"),e=e||[0,0,0],f=f||1,
// Translate arguments to spec variables.
this.XW=d[0],this.YW=d[1],this.ZW=d[2],this.XB=e[0],this.YB=e[1],this.ZB=e[2],this.G=f,
// Validate variables as per spec.
(this.XW<0||this.ZW<0||1!==this.YW)&&c("Invalid WhitePoint components for "+this.name+", no fallback available"),(this.XB<0||this.YB<0||this.ZB<0)&&(a("Invalid BlackPoint for "+this.name+", falling back to default"),this.XB=this.YB=this.ZB=0),(0!==this.XB||0!==this.YB||0!==this.ZB)&&b(this.name+", BlackPoint: XB: "+this.XB+", YB: "+this.YB+", ZB: "+this.ZB+", only default values are supported."),this.G<1&&(a("Invalid Gamma: "+this.G+" for "+this.name+", falling back to default"),this.G=1)}function e(a,b,c,d,e,f){
// A represents a gray component of a calibrated gray space.
// A <---> AG in the spec
var g=b[c]*f,h=Math.pow(g,a.G),i=a.YW*h,j=0|Math.max(295.8*Math.pow(i,.3333333333333333)-40.8,0);d[e]=j,d[e+1]=j,d[e+2]=j}return d.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(a,b,c,d){e(this,a,b,c,d,1)},getRgbBuffer:function(a,b,c,d,f,g,h){for(var i=1/((1<<g)-1),j=0;c>j;++j)e(this,a,b,d,f,i),b+=1,f+=3+h},getOutputLength:function(a,b){return a*(3+b)},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){return Ta.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},d}(),_a=function(){function b(b,d,e,f){this.name="CalRGB",this.numComps=3,this.defaultColor=new Float32Array(3),b||c("WhitePoint missing - required for color space CalRGB"),d=d||new Float32Array(3),e=e||new Float32Array([1,1,1]),f=f||new Float32Array([1,0,0,0,1,0,0,0,1]);
// Translate arguments to spec variables.
var g=b[0],h=b[1],i=b[2];this.whitePoint=b;var j=d[0],k=d[1],l=d[2];this.blackPoint=d,this.GR=e[0],this.GG=e[1],this.GB=e[2],this.MXA=f[0],this.MYA=f[1],this.MZA=f[2],this.MXB=f[3],this.MYB=f[4],this.MZB=f[5],this.MXC=f[6],this.MYC=f[7],this.MZC=f[8],
// Validate variables as per spec.
(0>g||0>i||1!==h)&&c("Invalid WhitePoint components for "+this.name+", no fallback available"),(0>j||0>k||0>l)&&(a("Invalid BlackPoint for "+this.name+" ["+j+", "+k+", "+l+"], falling back to default"),this.blackPoint=new Float32Array(3)),(this.GR<0||this.GG<0||this.GB<0)&&(a("Invalid Gamma ["+this.GR+", "+this.GG+", "+this.GB+"] for "+this.name+", falling back to default"),this.GR=this.GG=this.GB=1),(this.MXA<0||this.MYA<0||this.MZA<0||this.MXB<0||this.MYB<0||this.MZB<0||this.MXC<0||this.MYC<0||this.MZC<0)&&(a("Invalid Matrix for "+this.name+" ["+this.MXA+", "+this.MYA+", "+this.MZA+this.MXB+", "+this.MYB+", "+this.MZB+this.MXC+", "+this.MYC+", "+this.MZC+"], falling back to default"),this.MXA=this.MYB=this.MZC=1,this.MXB=this.MYA=this.MZA=this.MXC=this.MYC=this.MZB=0)}function d(a,b,c){c[0]=a[0]*b[0]+a[1]*b[1]+a[2]*b[2],c[1]=a[3]*b[0]+a[4]*b[1]+a[5]*b[2],c[2]=a[6]*b[0]+a[7]*b[1]+a[8]*b[2]}function e(a,b,c){c[0]=1*b[0]/a[0],c[1]=1*b[1]/a[1],c[2]=1*b[2]/a[2]}function f(a,b,c){var d=.95047,e=1,f=1.08883;c[0]=b[0]*d/a[0],c[1]=b[1]*e/a[1],c[2]=b[2]*f/a[2]}function g(a){
// See http://en.wikipedia.org/wiki/SRGB.
// See http://en.wikipedia.org/wiki/SRGB.
return.0031308>=a?h(0,1,12.92*a):h(0,1,1.055*Math.pow(a,1/2.4)-.055)}function h(a,b,c){return Math.max(a,Math.min(b,c))}function i(a){return 0>a?-i(-a):a>8?Math.pow((a+16)/116,3):a*u}function j(a,b,c){
// In case the blackPoint is already the default blackPoint then there is
// no need to do compensation.
if(0===a[0]&&0===a[1]&&0===a[2])return c[0]=b[0],c[1]=b[1],void(c[2]=b[2]);
// For the blackPoint calculation details, please see
// http://www.adobe.com/content/dam/Adobe/en/devnet/photoshop/sdk/
// AdobeBPC.pdf.
// The destination blackPoint is the default blackPoint [0, 0, 0].
var d=i(0),e=d,f=i(a[0]),g=d,h=i(a[1]),j=d,k=i(a[2]),l=(1-e)/(1-f),m=1-l,n=(1-g)/(1-h),o=1-n,p=(1-j)/(1-k),q=1-p;c[0]=b[0]*l+m,c[1]=b[1]*n+o,c[2]=b[2]*p+q}function k(a,b,c){
// In case the whitePoint is already flat then there is no need to do
// normalization.
if(1===a[0]&&1===a[2])return c[0]=b[0],c[1]=b[1],void(c[2]=b[2]);var f=c;d(n,b,f);var g=r;e(a,f,g),d(o,g,c)}function l(a,b,c){var e=c;d(n,b,e);var g=r;f(a,e,g),d(o,g,c)}function m(a,b,c,e,f,i){
// A, B and C represent a red, green and blue components of a calibrated
// rgb space.
var m=h(0,1,b[c]*i),n=h(0,1,b[c+1]*i),o=h(0,1,b[c+2]*i),r=Math.pow(m,a.GR),u=Math.pow(n,a.GG),v=Math.pow(o,a.GB),w=a.MXA*r+a.MXB*u+a.MXC*v,x=a.MYA*r+a.MYB*u+a.MYC*v,y=a.MZA*r+a.MZB*u+a.MZC*v,z=s;z[0]=w,z[1]=x,z[2]=y;var A=t;k(a.whitePoint,z,A);var B=s;j(a.blackPoint,A,B);var C=t;l(q,B,C);var D=s;d(p,C,D);var E=g(D[0]),F=g(D[1]),G=g(D[2]);
// Convert the values to rgb range [0, 255].
e[f]=Math.round(255*E),e[f+1]=Math.round(255*F),e[f+2]=Math.round(255*G)}
// See http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html for these
// matrices.
var n=new Float32Array([.8951,.2664,-.1614,-.7502,1.7135,.0367,.0389,-.0685,1.0296]),o=new Float32Array([.9869929,-.1470543,.1599627,.4323053,.5183603,.0492912,-.0085287,.0400428,.9684867]),p=new Float32Array([3.2404542,-1.5371385,-.4985314,-.969266,1.8760108,.041556,.0556434,-.2040259,1.0572252]),q=new Float32Array([1,1,1]),r=new Float32Array(3),s=new Float32Array(3),t=new Float32Array(3),u=Math.pow(24/116,3)/8;return b.prototype={getRgb:function(a,b){var c=new Uint8Array(3);return this.getRgbItem(a,b,c,0),c},getRgbItem:function(a,b,c,d){m(this,a,b,c,d,1)},getRgbBuffer:function(a,b,c,d,e,f,g){for(var h=1/((1<<f)-1),i=0;c>i;++i)m(this,a,b,d,e,h),b+=3,e+=3+g},getOutputLength:function(a,b){return a*(3+b)/3|0},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){return Ta.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},b}(),ab=function(){function b(b,d,e){this.name="Lab",this.numComps=3,this.defaultColor=new Float32Array([0,0,0]),b||c("WhitePoint missing - required for color space Lab"),d=d||[0,0,0],e=e||[-100,100,-100,100],
// Translate args to spec variables
this.XW=b[0],this.YW=b[1],this.ZW=b[2],this.amin=e[0],this.amax=e[1],this.bmin=e[2],this.bmax=e[3],
// These are here just for completeness - the spec doesn't offer any
// formulas that use BlackPoint in Lab
this.XB=d[0],this.YB=d[1],this.ZB=d[2],
// Validate vars as per spec
(this.XW<0||this.ZW<0||1!==this.YW)&&c("Invalid WhitePoint components, no fallback available"),(this.XB<0||this.YB<0||this.ZB<0)&&(a("Invalid BlackPoint, falling back to default"),this.XB=this.YB=this.ZB=0),(this.amin>this.amax||this.bmin>this.bmax)&&(a("Invalid Range, falling back to defaults"),this.amin=-100,this.amax=100,this.bmin=-100,this.bmax=100)}
// Function g(x) from spec
function d(a){return a>=6/29?a*a*a:108/841*(a-4/29)}function e(a,b,c,d){return c+a*(d-c)/b}
// If decoding is needed maxVal should be 2^bits per component - 1.
function f(a,b,c,f,g,h){
// XXX: Lab input is in the range of [0, 100], [amin, amax], [bmin, bmax]
// not the usual [0, 1]. If a command like setFillColor is used the src
// values will already be within the correct range. However, if we are
// converting an image we have to map the values to the correct range given
// above.
// Ls,as,bs <---> L*,a*,b* in the spec
var i=b[c],j=b[c+1],k=b[c+2];f!==!1&&(i=e(i,f,0,100),j=e(j,f,a.amin,a.amax),k=e(k,f,a.bmin,a.bmax)),
// Adjust limits of 'as' and 'bs'
j=j>a.amax?a.amax:j<a.amin?a.amin:j,k=k>a.bmax?a.bmax:k<a.bmin?a.bmin:k;
// Computes intermediate variables X,Y,Z as per spec
var l,m,n,o=(i+16)/116,p=o+j/500,q=o-k/200,r=a.XW*d(p),s=a.YW*d(o),t=a.ZW*d(q);
// Using different conversions for D50 and D65 white points,
// per http://www.color.org/srgb.pdf
a.ZW<1?(
// Assuming D50 (X=0.9642, Y=1.00, Z=0.8249)
l=3.1339*r+-1.617*s+t*-.4906,m=r*-.9785+1.916*s+.0333*t,n=.072*r+s*-.229+1.4057*t):(
// Assuming D65 (X=0.9505, Y=1.00, Z=1.0888)
l=3.2406*r+-1.5372*s+t*-.4986,m=r*-.9689+1.8758*s+.0415*t,n=.0557*r+s*-.204+1.057*t),
// clamp color values to [0,1] range then convert to [0,255] range.
g[h]=0>=l?0:l>=1?255:255*Math.sqrt(l)|0,g[h+1]=0>=m?0:m>=1?255:255*Math.sqrt(m)|0,g[h+2]=0>=n?0:n>=1?255:255*Math.sqrt(n)|0}return b.prototype={getRgb:Ta.prototype.getRgb,getRgbItem:function(a,b,c,d){f(this,a,b,!1,c,d)},getRgbBuffer:function(a,b,c,d,e,g,h){for(var i=(1<<g)-1,j=0;c>j;j++)f(this,a,b,i,d,e),b+=3,e+=3+h},getOutputLength:function(a,b){return a*(3+b)/3|0},isPassthrough:Ta.prototype.isPassthrough,fillRgb:Ta.prototype.fillRgb,isDefaultDecode:function(a){
// XXX: Decoding is handled with the lab conversion because of the strange
// ranges that are used.
return!0},usesZeroToOneRange:!1},b}(),bb=function(){function a(a){this.a=0,this.b=0;var b,c,d=new Uint8Array(256),e=0,f=a.length;for(b=0;256>b;++b)d[b]=b;for(b=0;256>b;++b)c=d[b],e=e+c+a[b%f]&255,d[b]=d[e],d[e]=c;this.s=d}return a.prototype={encryptBlock:function(a){var b,c,d,e=a.length,f=this.a,g=this.b,h=this.s,i=new Uint8Array(e);for(b=0;e>b;++b)f=f+1&255,c=h[f],g=g+c&255,d=h[g],h[f]=d,h[g]=c,i[b]=a[b]^h[c+d&255];return this.a=f,this.b=g,i}},a.prototype.decryptBlock=a.prototype.encryptBlock,a}(),cb=function(){function a(a,d,e){var f,g,h,i=1732584193,j=-271733879,k=-1732584194,l=271733878,m=e+72&-64,n=new Uint8Array(m);for(f=0;e>f;++f)n[f]=a[d++];for(n[f++]=128,h=m-8;h>f;)n[f++]=0;n[f++]=e<<3&255,n[f++]=e>>5&255,n[f++]=e>>13&255,n[f++]=e>>21&255,n[f++]=e>>>29&255,n[f++]=0,n[f++]=0,n[f++]=0;var o=new Int32Array(16);for(f=0;m>f;){for(g=0;16>g;++g,f+=4)o[g]=n[f]|n[f+1]<<8|n[f+2]<<16|n[f+3]<<24;var p,q,r=i,s=j,t=k,u=l;for(g=0;64>g;++g){16>g?(p=s&t|~s&u,q=g):32>g?(p=u&s|~u&t,q=5*g+1&15):48>g?(p=s^t^u,q=3*g+5&15):(p=t^(s|~u),q=7*g&15);var v=u,w=r+p+c[g]+o[q]|0,x=b[g];u=t,t=s,s=s+(w<<x|w>>>32-x)|0,r=v}i=i+r|0,j=j+s|0,k=k+t|0,l=l+u|0}return new Uint8Array([255&i,i>>8&255,i>>16&255,i>>>24&255,255&j,j>>8&255,j>>16&255,j>>>24&255,255&k,k>>8&255,k>>16&255,k>>>24&255,255&l,l>>8&255,l>>16&255,l>>>24&255])}var b=new Uint8Array([7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]),c=new Int32Array([-680876936,-389564586,606105819,-1044525330,-176418897,1200080426,-1473231341,-45705983,1770035416,-1958414417,-42063,-1990404162,1804603682,-40341101,-1502002290,1236535329,-165796510,-1069501632,643717713,-373897302,-701558691,38016083,-660478335,-405537848,568446438,-1019803690,-187363961,1163531501,-1444681467,-51403784,1735328473,-1926607734,-378558,-2022574463,1839030562,-35309556,-1530992060,1272893353,-155497632,-1094730640,681279174,-358537222,-722521979,76029189,-640364487,-421815835,530742520,-995338651,-198630844,1126891415,-1416354905,-57434055,1700485571,-1894986606,-1051523,-2054922799,1873313359,-30611744,-1560198380,1309151649,-145523070,-1120210379,718787259,-343485551]);return a}(),db=function(){function a(a,b){this.high=0|a,this.low=0|b}return a.prototype={and:function(a){this.high&=a.high,this.low&=a.low},xor:function(a){this.high^=a.high,this.low^=a.low},or:function(a){this.high|=a.high,this.low|=a.low},shiftRight:function(a){a>=32?(this.low=this.high>>>a-32|0,this.high=0):(this.low=this.low>>>a|this.high<<32-a,this.high=this.high>>>a|0)},shiftLeft:function(a){a>=32?(this.high=this.low<<a-32,this.low=0):(this.high=this.high<<a|this.low>>>32-a,this.low=this.low<<a)},rotateRight:function(a){var b,c;32&a?(c=this.low,b=this.high):(b=this.low,c=this.high),a&=31,this.low=b>>>a|c<<32-a,this.high=c>>>a|b<<32-a},not:function(){this.high=~this.high,this.low=~this.low},add:function(a){var b=(this.low>>>0)+(a.low>>>0),c=(this.high>>>0)+(a.high>>>0);b>4294967295&&(c+=1),this.low=0|b,this.high=0|c},copyTo:function(a,b){a[b]=this.high>>>24&255,a[b+1]=this.high>>16&255,a[b+2]=this.high>>8&255,a[b+3]=255&this.high,a[b+4]=this.low>>>24&255,a[b+5]=this.low>>16&255,a[b+6]=this.low>>8&255,a[b+7]=255&this.low},assign:function(a){this.high=a.high,this.low=a.low}},a}(),eb=function(){function a(a,b){return a>>>b|a<<32-b}function b(a,b,c){return a&b^~a&c}function c(a,b,c){return a&b^a&c^b&c}function d(b){return a(b,2)^a(b,13)^a(b,22)}function e(b){return a(b,6)^a(b,11)^a(b,25)}function f(b){return a(b,7)^a(b,18)^b>>>3}function g(b){return a(b,17)^a(b,19)^b>>>10}function h(a,h,j){
// initial hash values
var k,l,m,n=1779033703,o=3144134277,p=1013904242,q=2773480762,r=1359893119,s=2600822924,t=528734635,u=1541459225,v=64*Math.ceil((j+9)/64),w=new Uint8Array(v);for(k=0;j>k;++k)w[k]=a[h++];for(w[k++]=128,m=v-8;m>k;)w[k++]=0;w[k++]=0,w[k++]=0,w[k++]=0,w[k++]=j>>>29&255,w[k++]=j>>21&255,w[k++]=j>>13&255,w[k++]=j>>5&255,w[k++]=j<<3&255;var x=new Uint32Array(64);
// for each 512 bit block
for(k=0;v>k;){for(l=0;16>l;++l)x[l]=w[k]<<24|w[k+1]<<16|w[k+2]<<8|w[k+3],k+=4;for(l=16;64>l;++l)x[l]=g(x[l-2])+x[l-7]+f(x[l-15])+x[l-16]|0;var y,z,A=n,B=o,C=p,D=q,E=r,F=s,G=t,H=u;for(l=0;64>l;++l)y=H+e(E)+b(E,F,G)+i[l]+x[l],z=d(A)+c(A,B,C),H=G,G=F,F=E,E=D+y|0,D=C,C=B,B=A,A=y+z|0;n=n+A|0,o=o+B|0,p=p+C|0,q=q+D|0,r=r+E|0,s=s+F|0,t=t+G|0,u=u+H|0}return new Uint8Array([n>>24&255,n>>16&255,n>>8&255,255&n,o>>24&255,o>>16&255,o>>8&255,255&o,p>>24&255,p>>16&255,p>>8&255,255&p,q>>24&255,q>>16&255,q>>8&255,255&q,r>>24&255,r>>16&255,r>>8&255,255&r,s>>24&255,s>>16&255,s>>8&255,255&s,t>>24&255,t>>16&255,t>>8&255,255&t,u>>24&255,u>>16&255,u>>8&255,255&u])}var i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];return h}(),fb=function(){function a(a,b,c,d,e){a.assign(b),a.and(c),e.assign(b),e.not(),e.and(d),a.xor(e)}function b(a,b,c,d,e){a.assign(b),a.and(c),e.assign(b),e.and(d),a.xor(e),e.assign(c),e.and(d),a.xor(e)}function c(a,b,c){a.assign(b),a.rotateRight(28),c.assign(b),c.rotateRight(34),a.xor(c),c.assign(b),c.rotateRight(39),a.xor(c)}function d(a,b,c){a.assign(b),a.rotateRight(14),c.assign(b),c.rotateRight(18),a.xor(c),c.assign(b),c.rotateRight(41),a.xor(c)}function e(a,b,c){a.assign(b),a.rotateRight(1),c.assign(b),c.rotateRight(8),a.xor(c),c.assign(b),c.shiftRight(7),a.xor(c)}function f(a,b,c){a.assign(b),a.rotateRight(19),c.assign(b),c.rotateRight(61),a.xor(c),c.assign(b),c.shiftRight(6),a.xor(c)}function g(g,i,j,k){k=!!k;
// initial hash values
var l,m,n,o,p,q,r,s;k?(
// SHA384 is exactly the same
// except with different starting values and a trimmed result
l=new db(3418070365,3238371032),m=new db(1654270250,914150663),n=new db(2438529370,812702999),o=new db(355462360,4144912697),p=new db(1731405415,4290775857),q=new db(2394180231,1750603025),r=new db(3675008525,1694076839),s=new db(1203062813,3204075428)):(l=new db(1779033703,4089235720),m=new db(3144134277,2227873595),n=new db(1013904242,4271175723),o=new db(2773480762,1595750129),p=new db(1359893119,2917565137),q=new db(2600822924,725511199),r=new db(528734635,4215389547),s=new db(1541459225,327033209));
// pre-processing
var t,u,v,w=128*Math.ceil((j+17)/128),x=new Uint8Array(w);for(t=0;j>t;++t)x[t]=g[i++];for(x[t++]=128,v=w-16;v>t;)x[t++]=0;x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=0,x[t++]=j>>>29&255,x[t++]=j>>21&255,x[t++]=j>>13&255,x[t++]=j>>5&255,x[t++]=j<<3&255;var y=new Array(80);for(t=0;80>t;t++)y[t]=new db(0,0);var z,A=new db(0,0),B=new db(0,0),C=new db(0,0),D=new db(0,0),E=new db(0,0),F=new db(0,0),G=new db(0,0),H=new db(0,0),I=new db(0,0),J=new db(0,0),K=new db(0,0),L=new db(0,0);
// for each 1024 bit block
for(t=0;w>t;){for(u=0;16>u;++u)y[u].high=x[t]<<24|x[t+1]<<16|x[t+2]<<8|x[t+3],y[u].low=x[t+4]<<24|x[t+5]<<16|x[t+6]<<8|x[t+7],t+=8;for(u=16;80>u;++u)z=y[u],f(z,y[u-2],L),z.add(y[u-7]),e(K,y[u-15],L),z.add(K),z.add(y[u-16]);for(A.assign(l),B.assign(m),C.assign(n),D.assign(o),E.assign(p),F.assign(q),G.assign(r),H.assign(s),u=0;80>u;++u)I.assign(H),d(K,E,L),I.add(K),a(K,E,F,G,L),I.add(K),I.add(h[u]),I.add(y[u]),c(J,A,L),b(K,A,B,C,L),J.add(K),z=H,H=G,G=F,F=E,D.add(I),E=D,D=C,C=B,B=A,z.assign(I),z.add(J),A=z;l.add(A),m.add(B),n.add(C),o.add(D),p.add(E),q.add(F),r.add(G),s.add(H)}var M;return k?(M=new Uint8Array(48),l.copyTo(M,0),m.copyTo(M,8),n.copyTo(M,16),o.copyTo(M,24),p.copyTo(M,32),q.copyTo(M,40)):(M=new Uint8Array(64),l.copyTo(M,0),m.copyTo(M,8),n.copyTo(M,16),o.copyTo(M,24),p.copyTo(M,32),q.copyTo(M,40),r.copyTo(M,48),s.copyTo(M,56)),M}var h=[new db(1116352408,3609767458),new db(1899447441,602891725),new db(3049323471,3964484399),new db(3921009573,2173295548),new db(961987163,4081628472),new db(1508970993,3053834265),new db(2453635748,2937671579),new db(2870763221,3664609560),new db(3624381080,2734883394),new db(310598401,1164996542),new db(607225278,1323610764),new db(1426881987,3590304994),new db(1925078388,4068182383),new db(2162078206,991336113),new db(2614888103,633803317),new db(3248222580,3479774868),new db(3835390401,2666613458),new db(4022224774,944711139),new db(264347078,2341262773),new db(604807628,2007800933),new db(770255983,1495990901),new db(1249150122,1856431235),new db(1555081692,3175218132),new db(1996064986,2198950837),new db(2554220882,3999719339),new db(2821834349,766784016),new db(2952996808,2566594879),new db(3210313671,3203337956),new db(3336571891,1034457026),new db(3584528711,2466948901),new db(113926993,3758326383),new db(338241895,168717936),new db(666307205,1188179964),new db(773529912,1546045734),new db(1294757372,1522805485),new db(1396182291,2643833823),new db(1695183700,2343527390),new db(1986661051,1014477480),new db(2177026350,1206759142),new db(2456956037,344077627),new db(2730485921,1290863460),new db(2820302411,3158454273),new db(3259730800,3505952657),new db(3345764771,106217008),new db(3516065817,3606008344),new db(3600352804,1432725776),new db(4094571909,1467031594),new db(275423344,851169720),new db(430227734,3100823752),new db(506948616,1363258195),new db(659060556,3750685593),new db(883997877,3785050280),new db(958139571,3318307427),new db(1322822218,3812723403),new db(1537002063,2003034995),new db(1747873779,3602036899),new db(1955562222,1575990012),new db(2024104815,1125592928),new db(2227730452,2716904306),new db(2361852424,442776044),new db(2428436474,593698344),new db(2756734187,3733110249),new db(3204031479,2999351573),new db(3329325298,3815920427),new db(3391569614,3928383900),new db(3515267271,566280711),new db(3940187606,3454069534),new db(4118630271,4000239992),new db(116418474,1914138554),new db(174292421,2731055270),new db(289380356,3203993006),new db(460393269,320620315),new db(685471733,587496836),new db(852142971,1086792851),new db(1017036298,365543100),new db(1126000580,2618297676),new db(1288033470,3409855158),new db(1501505948,4234509866),new db(1607167915,987167468),new db(1816402316,1246189591)];return g}(),gb=function(){function a(a,b,c){return fb(a,b,c,!0)}return a}(),hb=function(){function a(){}return a.prototype={decryptBlock:function(a){return a}},a}(),ib=function(){function a(a){var b=176,c=new Uint8Array(b);c.set(a);for(var d=16,e=1;b>d;++e){
// RotWord
var h=c[d-3],i=c[d-2],j=c[d-1],k=c[d-4];
// SubWord
h=g[h],i=g[i],j=g[j],k=g[k],
// Rcon
h^=f[e];for(var l=0;4>l;++l)c[d]=h^=c[d-16],d++,c[d]=i^=c[d-16],d++,c[d]=j^=c[d-16],d++,c[d]=k^=c[d-16],d++}return c}function b(a,b){var c=new Uint8Array(16);c.set(a);var d,e,f,g,i,j;
// AddRoundKey
for(e=0,f=160;16>e;++e,++f)c[e]^=b[f];for(d=9;d>=1;--d){
// InvSubBytes
for(
// InvShiftRows
g=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=g,g=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=g,c[2]=i,g=c[15],i=c[11],j=c[7],c[15]=c[3],c[11]=g,c[7]=i,c[3]=j,e=0;16>e;++e)c[e]=h[c[e]];
// AddRoundKey
for(e=0,f=16*d;16>e;++e,++f)c[e]^=b[f];
// InvMixColumns
for(e=0;16>e;e+=4){var l=k[c[e]],m=k[c[e+1]],n=k[c[e+2]],o=k[c[e+3]];g=l^m>>>8^m<<24^n>>>16^n<<16^o>>>24^o<<8,c[e]=g>>>24&255,c[e+1]=g>>16&255,c[e+2]=g>>8&255,c[e+3]=255&g}}for(
// InvShiftRows
g=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=g,g=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=g,c[2]=i,g=c[15],i=c[11],j=c[7],c[15]=c[3],c[11]=g,c[7]=i,c[3]=j,e=0;16>e;++e)
// InvSubBytes
c[e]=h[c[e]],
// AddRoundKey
c[e]^=b[e];return c}function c(a,b){var c,d,e,f,h=new Uint8Array(16);for(h.set(a),k=0;16>k;++k)
// AddRoundKey
h[k]^=b[k];for(j=1;10>j;j++){
//SubBytes
for(k=0;16>k;++k)h[k]=g[h[k]];
//ShiftRows
e=h[1],h[1]=h[5],h[5]=h[9],h[9]=h[13],h[13]=e,e=h[2],d=h[6],h[2]=h[10],h[6]=h[14],h[10]=e,h[14]=d,e=h[3],d=h[7],c=h[11],h[3]=h[15],h[7]=e,h[11]=d,h[15]=c;
//MixColumns
for(var k=0;16>k;k+=4){var l=h[k+0],m=h[k+1],n=h[k+2],o=h[k+3];c=l^m^n^o,h[k+0]^=c^i[l^m],h[k+1]^=c^i[m^n],h[k+2]^=c^i[n^o],h[k+3]^=c^i[o^l]}
//AddRoundKey
for(k=0,f=16*j;16>k;++k,++f)h[k]^=b[f]}
//SubBytes
for(k=0;16>k;++k)h[k]=g[h[k]];
//AddRoundKey
for(
//ShiftRows
e=h[1],h[1]=h[5],h[5]=h[9],h[9]=h[13],h[13]=e,e=h[2],d=h[6],h[2]=h[10],h[6]=h[14],h[10]=e,h[14]=d,e=h[3],d=h[7],c=h[11],h[3]=h[15],h[7]=e,h[11]=d,h[15]=c,k=0,f=160;16>k;++k,++f)h[k]^=b[f];return h}function d(b){this.key=a(b),this.buffer=new Uint8Array(16),this.bufferPosition=0}function e(a,c){var d,e,f,g=a.length,h=this.buffer,i=this.bufferPosition,j=[],k=this.iv;for(d=0;g>d;++d)if(h[i]=a[d],++i,!(16>i)){
// buffer is full, decrypting
var l=b(h,this.key);
// xor-ing the IV vector to get plain text
for(e=0;16>e;++e)l[e]^=k[e];k=h,j.push(l),h=new Uint8Array(16),i=0}if(
// saving incomplete buffer
this.buffer=h,this.bufferLength=i,this.iv=k,0===j.length)return new Uint8Array([]);
// combining plain text blocks into one
var m=16*j.length;if(c){
// undo a padding that is described in RFC 2898
var n=j[j.length-1],o=n[15];if(16>=o){for(d=15,f=16-o;d>=f;--d)if(n[d]!==o){
// Invalid padding, assume that the block has no padding.
o=0;break}m-=o,j[j.length-1]=n.subarray(0,16-o)}}var p=new Uint8Array(m);for(d=0,e=0,f=j.length;f>d;++d,e+=16)p.set(j[d],e);return p}for(var f=new Uint8Array([141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141]),g=new Uint8Array([99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22]),h=new Uint8Array([82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125]),i=new Uint8Array(256),j=0;256>j;j++)128>j?i[j]=j<<1:i[j]=j<<1^27;var k=new Uint32Array([0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795]);return d.prototype={decryptBlock:function(a,b){var c,d=a.length,f=this.buffer,g=this.bufferPosition;
// waiting for IV values -- they are at the start of the stream
for(c=0;16>g&&d>c;++c,++g)f[g]=a[c];
// need more data
// starting decryption
return 16>g?(this.bufferLength=g,new Uint8Array([])):(this.iv=f,this.buffer=new Uint8Array(16),this.bufferLength=0,this.decryptBlock=e,this.decryptBlock(a.subarray(16),b))},encrypt:function(a,b){var d,e,f,g=a.length,h=this.buffer,i=this.bufferPosition,j=[];for(b||(b=new Uint8Array(16)),d=0;g>d;++d)if(h[i]=a[d],++i,!(16>i)){for(e=0;16>e;++e)h[e]^=b[e];
// buffer is full, encrypting
var k=c(h,this.key);b=k,j.push(k),h=new Uint8Array(16),i=0}if(
// saving incomplete buffer
this.buffer=h,this.bufferLength=i,this.iv=b,0===j.length)return new Uint8Array([]);
// combining plain text blocks into one
var l=16*j.length,m=new Uint8Array(l);for(d=0,e=0,f=j.length;f>d;++d,e+=16)m.set(j[d],e);return m}},d}(),jb=function(){function a(a){var b=240,c=new Uint8Array(b),d=1;c.set(a);for(var e=32,g=1;b>e;++g){if(e%32===16)h=f[h],i=f[i],j=f[j],k=f[k];else if(e%32===0){
// RotWord
var h=c[e-3],i=c[e-2],j=c[e-1],k=c[e-4];
// SubWord
h=f[h],i=f[i],j=f[j],k=f[k],
// Rcon
h^=d,(d<<=1)>=256&&(d=255&(27^d))}for(var l=0;4>l;++l)c[e]=h^=c[e-32],e++,c[e]=i^=c[e-32],e++,c[e]=j^=c[e-32],e++,c[e]=k^=c[e-32],e++}return c}function b(a,b){var c=new Uint8Array(16);c.set(a);var d,e,f,h,i,k;
// AddRoundKey
for(e=0,f=224;16>e;++e,++f)c[e]^=b[f];for(d=13;d>=1;--d){
// InvSubBytes
for(
// InvShiftRows
h=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=h,h=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=h,c[2]=i,h=c[15],i=c[11],k=c[7],c[15]=c[3],c[11]=h,c[7]=i,c[3]=k,e=0;16>e;++e)c[e]=g[c[e]];
// AddRoundKey
for(e=0,f=16*d;16>e;++e,++f)c[e]^=b[f];
// InvMixColumns
for(e=0;16>e;e+=4){var l=j[c[e]],m=j[c[e+1]],n=j[c[e+2]],o=j[c[e+3]];h=l^m>>>8^m<<24^n>>>16^n<<16^o>>>24^o<<8,c[e]=h>>>24&255,c[e+1]=h>>16&255,c[e+2]=h>>8&255,c[e+3]=255&h}}for(
// InvShiftRows
h=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=h,h=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=h,c[2]=i,h=c[15],i=c[11],k=c[7],c[15]=c[3],c[11]=h,c[7]=i,c[3]=k,e=0;16>e;++e)
// InvSubBytes
c[e]=g[c[e]],
// AddRoundKey
c[e]^=b[e];return c}function c(a,b){var c,d,e,g,j=new Uint8Array(16);for(j.set(a),k=0;16>k;++k)
// AddRoundKey
j[k]^=b[k];for(i=1;14>i;i++){
//SubBytes
for(k=0;16>k;++k)j[k]=f[j[k]];
//ShiftRows
e=j[1],j[1]=j[5],j[5]=j[9],j[9]=j[13],j[13]=e,e=j[2],d=j[6],j[2]=j[10],j[6]=j[14],j[10]=e,j[14]=d,e=j[3],d=j[7],c=j[11],j[3]=j[15],j[7]=e,j[11]=d,j[15]=c;
//MixColumns
for(var k=0;16>k;k+=4){var l=j[k+0],m=j[k+1],n=j[k+2],o=j[k+3];c=l^m^n^o,j[k+0]^=c^h[l^m],j[k+1]^=c^h[m^n],j[k+2]^=c^h[n^o],j[k+3]^=c^h[o^l]}
//AddRoundKey
for(k=0,g=16*i;16>k;++k,++g)j[k]^=b[g]}
//SubBytes
for(k=0;16>k;++k)j[k]=f[j[k]];
//AddRoundKey
for(
//ShiftRows
e=j[1],j[1]=j[5],j[5]=j[9],j[9]=j[13],j[13]=e,e=j[2],d=j[6],j[2]=j[10],j[6]=j[14],j[10]=e,j[14]=d,e=j[3],d=j[7],c=j[11],j[3]=j[15],j[7]=e,j[11]=d,j[15]=c,k=0,g=224;16>k;++k,++g)j[k]^=b[g];return j}function d(b){this.key=a(b),this.buffer=new Uint8Array(16),this.bufferPosition=0}function e(a,c){var d,e,f,g=a.length,h=this.buffer,i=this.bufferPosition,j=[],k=this.iv;for(d=0;g>d;++d)if(h[i]=a[d],++i,!(16>i)){
// buffer is full, decrypting
var l=b(h,this.key);
// xor-ing the IV vector to get plain text
for(e=0;16>e;++e)l[e]^=k[e];k=h,j.push(l),h=new Uint8Array(16),i=0}if(
// saving incomplete buffer
this.buffer=h,this.bufferLength=i,this.iv=k,0===j.length)return new Uint8Array([]);
// combining plain text blocks into one
var m=16*j.length;if(c){
// undo a padding that is described in RFC 2898
var n=j[j.length-1],o=n[15];if(16>=o){for(d=15,f=16-o;d>=f;--d)if(n[d]!==o){
// Invalid padding, assume that the block has no padding.
o=0;break}m-=o,j[j.length-1]=n.subarray(0,16-o)}}var p=new Uint8Array(m);for(d=0,e=0,f=j.length;f>d;++d,e+=16)p.set(j[d],e);return p}for(var f=(new Uint8Array([141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141]),new Uint8Array([99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22])),g=new Uint8Array([82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125]),h=new Uint8Array(256),i=0;256>i;i++)128>i?h[i]=i<<1:h[i]=i<<1^27;var j=new Uint32Array([0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795]);return d.prototype={decryptBlock:function(a,b,c){var d,f=a.length,g=this.buffer,h=this.bufferPosition;
// if not supplied an IV wait for IV values
// they are at the start of the stream
if(c)this.iv=c;else{for(d=0;16>h&&f>d;++d,++h)g[h]=a[d];if(16>h)
//need more data
return this.bufferLength=h,new Uint8Array([]);this.iv=g,a=a.subarray(16)}
// starting decryption
return this.buffer=new Uint8Array(16),this.bufferLength=0,this.decryptBlock=e,this.decryptBlock(a,b)},encrypt:function(a,b){var d,e,f,g=a.length,h=this.buffer,i=this.bufferPosition,j=[];for(b||(b=new Uint8Array(16)),d=0;g>d;++d)if(h[i]=a[d],++i,!(16>i)){for(e=0;16>e;++e)h[e]^=b[e];
// buffer is full, encrypting
var k=c(h,this.key);this.iv=k,j.push(k),h=new Uint8Array(16),i=0}if(
// saving incomplete buffer
this.buffer=h,this.bufferLength=i,this.iv=b,0===j.length)return new Uint8Array([]);
// combining plain text blocks into one
var l=16*j.length,m=new Uint8Array(l);for(d=0,e=0,f=j.length;f>d;++d,e+=16)m.set(j[d],e);return m}},d}(),kb=function(){function a(a,b){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0}function b(){}return b.prototype={checkOwnerPassword:function(b,c,d,e){var f=new Uint8Array(b.length+56);f.set(b,0),f.set(c,b.length),f.set(d,b.length+c.length);var g=eb(f,0,f.length);return a(g,e)},checkUserPassword:function(b,c,d){var e=new Uint8Array(b.length+8);e.set(b,0),e.set(c,b.length);var f=eb(e,0,e.length);return a(f,d)},getOwnerKey:function(a,b,c,d){var e=new Uint8Array(a.length+56);e.set(a,0),e.set(b,a.length),e.set(c,a.length+b.length);var f=eb(e,0,e.length),g=new jb(f);return g.decryptBlock(d,!1,new Uint8Array(16))},getUserKey:function(a,b,c){var d=new Uint8Array(a.length+8);d.set(a,0),d.set(b,a.length);
//key is the decryption key for the UE string
var e=eb(d,0,d.length),f=new jb(e);return f.decryptBlock(c,!1,new Uint8Array(16))}},b}(),lb=function(){function a(a,b){var c=new Uint8Array(a.length+b.length);return c.set(a,0),c.set(b,a.length),c}function b(b,c,d){for(
//This refers to Algorithm 2.B as defined in ISO 32000-2
var e=eb(c,0,c.length).subarray(0,32),f=[0],g=0;64>g||f[f.length-1]>g-32;){var h=b.length+e.length+d.length,i=new Uint8Array(64*h),j=a(b,e);j=a(j,d);for(var k=0,l=0;64>k;k++,l+=h)i.set(j,l);
//AES128 CBC NO PADDING with
//first 16 bytes of k as the key and the second 16 as the iv.
var m=new ib(e.subarray(0,16));f=m.encrypt(i,e.subarray(16,32));for(var n=0,o=0;16>o;o++)n*=1,n%=3,n+=(f[o]>>>0)%3,n%=3;0===n?e=eb(f,0,f.length):1===n?e=gb(f,0,f.length):2===n&&(e=fb(f,0,f.length)),g++}return e.subarray(0,32)}function c(){}function d(a,b){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0}return c.prototype={hash:function(a,c,d){return b(a,c,d)},checkOwnerPassword:function(a,c,e,f){var g=new Uint8Array(a.length+56);g.set(a,0),g.set(c,a.length),g.set(e,a.length+c.length);var h=b(a,g,e);return d(h,f)},checkUserPassword:function(a,c,e){var f=new Uint8Array(a.length+8);f.set(a,0),f.set(c,a.length);var g=b(a,f,[]);return d(g,e)},getOwnerKey:function(a,c,d,e){var f=new Uint8Array(a.length+56);f.set(a,0),f.set(c,a.length),f.set(d,a.length+c.length);var g=b(a,f,d),h=new jb(g);return h.decryptBlock(e,!1,new Uint8Array(16))},getUserKey:function(a,c,d){var e=new Uint8Array(a.length+8);e.set(a,0),e.set(c,a.length);
//key is the decryption key for the UE string
var f=b(a,e,[]),g=new jb(f);return g.decryptBlock(d,!1,new Uint8Array(16))}},c}(),mb=function(){function a(a,b){this.stringCipherConstructor=a,this.streamCipherConstructor=b}return a.prototype={createStream:function(a,b){var c=new this.streamCipherConstructor;return new Pc(a,b,function(a,b){return c.decryptBlock(a,b)})},decryptString:function(a){var b=new this.stringCipherConstructor,c=i(a);return c=b.decryptBlock(c,!0),h(c)}},a}(),nb=function(){function a(a,b,c,d,e,f,g,h,i,j,k,l){if(b){var m=Math.min(127,b.length);b=b.subarray(0,m)}else b=[];var n;if(n=6===a?new lb:new kb){if(n.checkUserPassword(b,h,g))return n.getUserKey(b,i,k);if(n.checkOwnerPassword(b,d,f,c))return n.getOwnerKey(b,e,f,j)}return null}function b(a,b,c,d,e,f,g,i){var j,k,l=40+c.length+a.length,m=new Uint8Array(l),n=0;if(b)for(k=Math.min(32,b.length);k>n;++n)m[n]=b[n];for(j=0;32>n;)m[n++]=h[j++];
// as now the padded password in the hashData[0..i]
for(j=0,k=c.length;k>j;++j)m[n++]=c[j];for(m[n++]=255&e,m[n++]=e>>8&255,m[n++]=e>>16&255,m[n++]=e>>>24&255,j=0,k=a.length;k>j;++j)m[n++]=a[j];f>=4&&!i&&(m[n++]=255,m[n++]=255,m[n++]=255,m[n++]=255);var o=cb(m,0,n),p=g>>3;if(f>=3)for(j=0;50>j;++j)o=cb(o,0,p);var q,r,s=o.subarray(0,p);if(f>=3){for(n=0;32>n;++n)m[n]=h[n];for(j=0,k=a.length;k>j;++j)m[n++]=a[j];q=new bb(s),r=q.encryptBlock(cb(m,0,n)),k=s.length;var t,u=new Uint8Array(k);for(j=1;19>=j;++j){for(t=0;k>t;++t)u[t]=s[t]^j;q=new bb(u),r=q.encryptBlock(r)}for(j=0,k=r.length;k>j;++j)if(d[j]!==r[j])return null}else for(q=new bb(s),r=q.encryptBlock(h),j=0,k=r.length;k>j;++j)if(d[j]!==r[j])return null;return s}function d(a,b,c,d){var e,f,g=new Uint8Array(32),i=0;for(f=Math.min(32,a.length);f>i;++i)g[i]=a[i];for(e=0;32>i;)g[i++]=h[e++];var j=cb(g,0,i),k=d>>3;if(c>=3)for(e=0;50>e;++e)j=cb(j,0,j.length);var l,m;if(c>=3){m=b;var n,o=new Uint8Array(k);for(e=19;e>=0;e--){for(n=0;k>n;++n)o[n]=j[n]^e;l=new bb(o),m=l.encryptBlock(m)}}else l=new bb(j.subarray(0,k)),m=l.encryptBlock(b);return m}function e(e,f,g){var h=e.get("Filter");x(h)&&"Standard"===h.name||c("unknown encryption method"),this.dict=e;var k=e.get("V");(!u(k)||1!==k&&2!==k&&4!==k&&5!==k)&&c("unsupported encryption algorithm"),this.algorithm=k;var l=e.get("Length")||40;(!u(l)||40>l||l%8!==0)&&c("invalid key length");
// prepare keys
var m=i(e.get("O")).subarray(0,32),n=i(e.get("U")).subarray(0,32),o=e.get("P"),p=e.get("R"),q=(4===k||5===k)&&e.get("EncryptMetadata")!==!1;this.encryptMetadata=q;var r,s=i(f);g&&(r=i(g));var t;if(5!==k)t=b(s,r,m,n,o,p,l,q);else{var v=i(e.get("O")).subarray(32,40),w=i(e.get("O")).subarray(40,48),y=i(e.get("U")).subarray(0,48),z=i(e.get("U")).subarray(32,40),A=i(e.get("U")).subarray(40,48),B=i(e.get("OE")),C=i(e.get("UE")),D=i(e.get("Perms"));t=a(p,r,m,v,w,y,n,z,A,B,C,D)}if(!t&&!g)throw new $("No password given",Z.NEED_PASSWORD);if(!t&&g){
// Attempting use the password as an owner password
var E=d(r,m,p,l);t=b(s,E,m,n,o,p,l,q)}if(!t)throw new $("Incorrect Password",Z.INCORRECT_PASSWORD);this.encryptionKey=t,k>=4&&(this.cf=e.get("CF"),this.stmf=e.get("StmF")||j,this.strf=e.get("StrF")||j,this.eff=e.get("EFF")||this.strf)}function f(a,b,c,d){var e,f,g=new Uint8Array(c.length+9);for(e=0,f=c.length;f>e;++e)g[e]=c[e];g[e++]=255&a,g[e++]=a>>8&255,g[e++]=a>>16&255,g[e++]=255&b,g[e++]=b>>8&255,d&&(g[e++]=115,g[e++]=65,g[e++]=108,g[e++]=84);var h=cb(g,0,e);return h.subarray(0,Math.min(c.length+5,16))}function g(a,b,d,e,g){var h,i=a.get(b.name);return null!==i&&void 0!==i&&(h=i.get("CFM")),h&&"None"!==h.name?"V2"===h.name?function(){return new bb(f(d,e,g,!1))}:"AESV2"===h.name?function(){return new ib(f(d,e,g,!0))}:"AESV3"===h.name?function(){return new jb(g)}:void c("Unknown crypto method"):function(){return new hb}}var h=new Uint8Array([40,191,78,94,78,117,138,65,100,0,78,86,255,250,1,8,46,46,0,182,208,104,62,128,47,12,169,254,100,83,105,122]),j=ta.get("Identity");return e.prototype={createCipherTransform:function(a,b){if(4===this.algorithm||5===this.algorithm)return new mb(g(this.cf,this.stmf,a,b,this.encryptionKey),g(this.cf,this.strf,a,b,this.encryptionKey));
// algorithms 1 and 2
var c=f(a,b,this.encryptionKey,!1),d=function(){return new bb(c)};return new mb(d,d)}},e}(),ob={FUNCTION_BASED:1,AXIAL:2,RADIAL:3,FREE_FORM_MESH:4,LATTICE_FORM_MESH:5,COONS_PATCH_MESH:6,TENSOR_PATCH_MESH:7},pb=function(){
// Constructor should define this.getPattern
function a(){c("should not call Pattern constructor")}return a.prototype={
// Input: current Canvas context
// Output: the appropriate fillStyle or strokeStyle
getPattern:function(a){c("Should not call Pattern.getStyle: "+a)}},a.parseShading=function(a,c,d,e){var f=B(a)?a.dict:a,g=f.get("ShadingType");try{switch(g){case ob.AXIAL:case ob.RADIAL:
// Both radial and axial shadings are handled by RadialAxial shading.
return new qb.RadialAxial(f,c,d,e);case ob.FREE_FORM_MESH:case ob.LATTICE_FORM_MESH:case ob.COONS_PATCH_MESH:case ob.TENSOR_PATCH_MESH:return new qb.Mesh(a,c,d,e);default:throw new Error("Unknown PatternType: "+g)}}catch(h){if(h instanceof ea)throw h;return Y.notify(X.shadingPattern),b(h),new qb.Dummy}},a}(),qb={};
// A small number to offset the first/last color stops so we can insert ones to
// support extend.  Number.MIN_VALUE appears to be too small and breaks the
// extend. 1e-7 works in FF but chrome seems to use an even smaller sized number
// internally so we have to go bigger.
qb.SMALL_NUMBER=.01,
// Radial and axial shading have very similar implementations
// If needed, the implementations can be broken into two classes
qb.RadialAxial=function(){function d(c,d,e,f){this.matrix=d,this.coordsArr=c.get("Coords"),this.shadingType=c.get("ShadingType"),this.type="Pattern";var g=c.get("ColorSpace","CS");g=Ta.parse(g,e,f),this.cs=g;var h=0,i=1;if(c.has("Domain")){var j=c.get("Domain");h=j[0],i=j[1]}var k=!1,l=!1;if(c.has("Extend")){var m=c.get("Extend");k=m[0],l=m[1]}if(!(this.shadingType!==ob.RADIAL||k&&l)){
// Radial gradient only currently works if either circle is fully within
// the other circle.
var n=this.coordsArr[0],o=this.coordsArr[1],p=this.coordsArr[2],q=this.coordsArr[3],r=this.coordsArr[4],s=this.coordsArr[5],t=Math.sqrt((n-q)*(n-q)+(o-r)*(o-r));s+t>=p&&p+t>=s&&b("Unsupported radial gradient.")}this.extendStart=k,this.extendEnd=l;var u=c.get("Function"),v=Pa.parseArray(e,u),w=i-h,x=w/10,y=this.colorStops=[];
// Protect against bad domains so we don't end up in an infinte loop below.
if(h>=i||0>=x)
// Acrobat doesn't seem to handle these cases so we'll ignore for
// now.
return void a("Bad shading domain.");for(var z,A=new Float32Array(g.numComps),B=new Float32Array(1),C=h;i>=C;C+=x){B[0]=C,v(B,0,A,0),z=g.getRgb(A,0);var D=ia.makeCssRgb(z[0],z[1],z[2]);y.push([(C-h)/w,D])}var E="transparent";c.has("Background")&&(z=g.getRgb(c.get("Background"),0),E=ia.makeCssRgb(z[0],z[1],z[2])),k||(
// Insert a color stop at the front and offset the first real color stop
// so it doesn't conflict with the one we insert.
y.unshift([0,E]),y[1][0]+=qb.SMALL_NUMBER),l||(
// Same idea as above in extendStart but for the end.
y[y.length-1][0]-=qb.SMALL_NUMBER,y.push([1,E])),this.colorStops=y}return d.prototype={getIR:function(){var a,b,d,e,f,g=this.coordsArr,h=this.shadingType;h===ob.AXIAL?(b=[g[0],g[1]],d=[g[2],g[3]],e=null,f=null,a="axial"):h===ob.RADIAL?(b=[g[0],g[1]],d=[g[3],g[4]],e=g[2],f=g[5],a="radial"):c("getPattern type unknown: "+h);var i=this.matrix;return i&&(b=ia.applyTransform(b,i),d=ia.applyTransform(d,i)),["RadialAxial",a,this.colorStops,b,d,e,f]}},d}(),
// All mesh shading. For now, they will be presented as set of the triangles
// to be drawn on the canvas and rgb color for each vertex.
qb.Mesh=function(){function a(a,b){this.stream=a,this.context=b,this.buffer=0,this.bufferLength=0;var c=b.numComps;this.tmpCompsBuf=new Float32Array(c);var d=b.colorSpace;this.tmpCsCompsBuf=b.colorFn?new Float32Array(d):this.tmpCompsBuf}function b(a,b){// assuming we have all data to start a new triangle
for(var c=a.coords,d=a.colors,f=[],g=[],h=0;b.hasData;){var i=b.readFlag(),j=b.readCoordinate(),k=b.readComponents();if(0===h){switch(// ignoring flags if we started a triangle
e(i>=0&&2>=i,"Unknown type4 flag"),i){case 0:h=3;break;case 1:g.push(g[g.length-2],g[g.length-1]),h=1;break;case 2:g.push(g[g.length-3],g[g.length-1]),h=1}f.push(i)}g.push(c.length),c.push(j),d.push(k),h--,b.align()}var l=new Int32Array(g);a.figures.push({type:"triangles",coords:l,colors:l})}function d(a,b,c){// not maintaining cs since that will match ps
for(var d=a.coords,e=a.colors,f=[];b.hasData;){var g=b.readCoordinate(),h=b.readComponents();f.push(d.length),d.push(g),e.push(h)}var i=new Int32Array(f);a.figures.push({type:"lattice",coords:i,colors:i,verticesPerRow:c})}function f(a,b){var c=a.figures[b];e("patch"===c.type,"Unexpected patch mesh figure");var d=a.coords,f=a.colors,g=c.coords,h=c.colors,i=Math.min(d[g[0]][0],d[g[3]][0],d[g[12]][0],d[g[15]][0]),j=Math.min(d[g[0]][1],d[g[3]][1],d[g[12]][1],d[g[15]][1]),k=Math.max(d[g[0]][0],d[g[3]][0],d[g[12]][0],d[g[15]][0]),p=Math.max(d[g[0]][1],d[g[3]][1],d[g[12]][1],d[g[15]][1]),q=Math.ceil((k-i)*n/(a.bounds[2]-a.bounds[0]));q=Math.max(l,Math.min(m,q));var r=Math.ceil((p-j)*n/(a.bounds[3]-a.bounds[1]));r=Math.max(l,Math.min(m,r));for(var s=q+1,t=new Int32Array((r+1)*s),u=new Int32Array((r+1)*s),v=0,w=new Uint8Array(3),x=new Uint8Array(3),y=f[h[0]],z=f[h[1]],A=f[h[2]],B=f[h[3]],C=o(r),D=o(q),E=0;r>=E;E++){w[0]=(y[0]*(r-E)+A[0]*E)/r|0,w[1]=(y[1]*(r-E)+A[1]*E)/r|0,w[2]=(y[2]*(r-E)+A[2]*E)/r|0,x[0]=(z[0]*(r-E)+B[0]*E)/r|0,x[1]=(z[1]*(r-E)+B[1]*E)/r|0,x[2]=(z[2]*(r-E)+B[2]*E)/r|0;for(var F=0;q>=F;F++,v++)if(0!==E&&E!==r||0!==F&&F!==q){for(var G=0,H=0,I=0,J=0;3>=J;J++)for(var K=0;3>=K;K++,I++){var L=C[E][J]*D[F][K];G+=d[g[I]][0]*L,H+=d[g[I]][1]*L}t[v]=d.length,d.push([G,H]),u[v]=f.length;var M=new Uint8Array(3);M[0]=(w[0]*(q-F)+x[0]*F)/q|0,M[1]=(w[1]*(q-F)+x[1]*F)/q|0,M[2]=(w[2]*(q-F)+x[2]*F)/q|0,f.push(M)}}t[0]=g[0],u[0]=h[0],t[q]=g[3],u[q]=h[1],t[s*r]=g[12],u[s*r]=h[2],t[s*r+q]=g[15],u[s*r+q]=h[3],a.figures[b]={type:"lattice",coords:t,colors:u,verticesPerRow:s}}function g(a,b){// c00, c30, c03, c33
for(
// A special case of Type 7. The p11, p12, p21, p22 automatically filled
var c=a.coords,d=a.colors,f=new Int32Array(16),g=new Int32Array(4);b.hasData;){var h=b.readFlag();e(h>=0&&3>=h,"Unknown type6 flag");var i,j,k=c.length;for(i=0,j=0!==h?8:12;j>i;i++)c.push(b.readCoordinate());var l=d.length;for(i=0,j=0!==h?2:4;j>i;i++)d.push(b.readComponents());var m,n,o,p;switch(h){case 0:f[12]=k+3,f[13]=k+4,f[14]=k+5,f[15]=k+6,f[8]=k+2,/* values for 5, 6, 9, 10 are    */f[11]=k+7,f[4]=k+1,/* calculated below              */f[7]=k+8,f[0]=k,f[1]=k+11,f[2]=k+10,f[3]=k+9,g[2]=l+1,g[3]=l+2,g[0]=l,g[1]=l+3;break;case 1:m=f[12],n=f[13],o=f[14],p=f[15],f[12]=k+5,f[13]=k+4,f[14]=k+3,f[15]=k+2,f[8]=k+6,/* values for 5, 6, 9, 10 are    */f[11]=k+1,f[4]=k+7,/* calculated below              */f[7]=k,f[0]=m,f[1]=n,f[2]=o,f[3]=p,m=g[2],n=g[3],g[2]=l+1,g[3]=l,g[0]=m,g[1]=n;break;case 2:f[12]=f[15],f[13]=k+7,f[14]=k+6,f[15]=k+5,f[8]=f[11],/* values for 5, 6, 9, 10 are    */f[11]=k+4,f[4]=f[7],/* calculated below              */f[7]=k+3,f[0]=f[3],f[1]=k,f[2]=k+1,f[3]=k+2,g[2]=g[3],g[3]=l+1,g[0]=g[1],g[1]=l;break;case 3:f[12]=f[0],f[13]=f[1],f[14]=f[2],f[15]=f[3],f[8]=k,/* values for 5, 6, 9, 10 are    */f[11]=k+7,f[4]=k+1,/* calculated below              */f[7]=k+6,f[0]=k+2,f[1]=k+3,f[2]=k+4,f[3]=k+5,g[2]=g[0],g[3]=g[1],g[0]=l,g[1]=l+1}
// set p11, p12, p21, p22
f[5]=c.length,c.push([(-4*c[f[0]][0]-c[f[15]][0]+6*(c[f[4]][0]+c[f[1]][0])-2*(c[f[12]][0]+c[f[3]][0])+3*(c[f[13]][0]+c[f[7]][0]))/9,(-4*c[f[0]][1]-c[f[15]][1]+6*(c[f[4]][1]+c[f[1]][1])-2*(c[f[12]][1]+c[f[3]][1])+3*(c[f[13]][1]+c[f[7]][1]))/9]),f[6]=c.length,c.push([(-4*c[f[3]][0]-c[f[12]][0]+6*(c[f[2]][0]+c[f[7]][0])-2*(c[f[0]][0]+c[f[15]][0])+3*(c[f[4]][0]+c[f[14]][0]))/9,(-4*c[f[3]][1]-c[f[12]][1]+6*(c[f[2]][1]+c[f[7]][1])-2*(c[f[0]][1]+c[f[15]][1])+3*(c[f[4]][1]+c[f[14]][1]))/9]),f[9]=c.length,c.push([(-4*c[f[12]][0]-c[f[3]][0]+6*(c[f[8]][0]+c[f[13]][0])-2*(c[f[0]][0]+c[f[15]][0])+3*(c[f[11]][0]+c[f[1]][0]))/9,(-4*c[f[12]][1]-c[f[3]][1]+6*(c[f[8]][1]+c[f[13]][1])-2*(c[f[0]][1]+c[f[15]][1])+3*(c[f[11]][1]+c[f[1]][1]))/9]),f[10]=c.length,c.push([(-4*c[f[15]][0]-c[f[0]][0]+6*(c[f[11]][0]+c[f[14]][0])-2*(c[f[12]][0]+c[f[3]][0])+3*(c[f[2]][0]+c[f[8]][0]))/9,(-4*c[f[15]][1]-c[f[0]][1]+6*(c[f[11]][1]+c[f[14]][1])-2*(c[f[12]][1]+c[f[3]][1])+3*(c[f[2]][1]+c[f[8]][1]))/9]),a.figures.push({type:"patch",coords:new Int32Array(f),// making copies of ps and cs
colors:new Int32Array(g)})}}function h(a,b){// c00, c30, c03, c33
for(var c=a.coords,d=a.colors,f=new Int32Array(16),g=new Int32Array(4);b.hasData;){var h=b.readFlag();e(h>=0&&3>=h,"Unknown type7 flag");var i,j,k=c.length;for(i=0,j=0!==h?12:16;j>i;i++)c.push(b.readCoordinate());var l=d.length;for(i=0,j=0!==h?2:4;j>i;i++)d.push(b.readComponents());var m,n,o,p;switch(h){case 0:f[12]=k+3,f[13]=k+4,f[14]=k+5,f[15]=k+6,f[8]=k+2,f[9]=k+13,f[10]=k+14,f[11]=k+7,f[4]=k+1,f[5]=k+12,f[6]=k+15,f[7]=k+8,f[0]=k,f[1]=k+11,f[2]=k+10,f[3]=k+9,g[2]=l+1,g[3]=l+2,g[0]=l,g[1]=l+3;break;case 1:m=f[12],n=f[13],o=f[14],p=f[15],f[12]=k+5,f[13]=k+4,f[14]=k+3,f[15]=k+2,f[8]=k+6,f[9]=k+11,f[10]=k+10,f[11]=k+1,f[4]=k+7,f[5]=k+8,f[6]=k+9,f[7]=k,f[0]=m,f[1]=n,f[2]=o,f[3]=p,m=g[2],n=g[3],g[2]=l+1,g[3]=l,g[0]=m,g[1]=n;break;case 2:f[12]=f[15],f[13]=k+7,f[14]=k+6,f[15]=k+5,f[8]=f[11],f[9]=k+8,f[10]=k+11,f[11]=k+4,f[4]=f[7],f[5]=k+9,f[6]=k+10,f[7]=k+3,f[0]=f[3],f[1]=k,f[2]=k+1,f[3]=k+2,g[2]=g[3],g[3]=l+1,g[0]=g[1],g[1]=l;break;case 3:f[12]=f[0],f[13]=f[1],f[14]=f[2],f[15]=f[3],f[8]=k,f[9]=k+9,f[10]=k+8,f[11]=k+7,f[4]=k+1,f[5]=k+10,f[6]=k+11,f[7]=k+6,f[0]=k+2,f[1]=k+3,f[2]=k+4,f[3]=k+5,g[2]=g[0],g[3]=g[1],g[0]=l,g[1]=l+1}a.figures.push({type:"patch",coords:new Int32Array(f),// making copies of ps and cs
colors:new Int32Array(g)})}}function i(a){for(var b=a.coords[0][0],c=a.coords[0][1],d=b,e=c,f=1,g=a.coords.length;g>f;f++){var h=a.coords[f][0],i=a.coords[f][1];b=b>h?h:b,c=c>i?i:c,d=h>d?h:d,e=i>e?i:e}a.bounds=[b,c,d,e]}function j(a){var b,c,d,e,f=a.coords,g=new Float32Array(2*f.length);for(b=0,d=0,c=f.length;c>b;b++){var h=f[b];g[d++]=h[0],g[d++]=h[1]}a.coords=g;var i=a.colors,j=new Uint8Array(3*i.length);for(b=0,d=0,c=i.length;c>b;b++){var k=i[b];j[d++]=k[0],j[d++]=k[1],j[d++]=k[2]}a.colors=j;var l=a.figures;for(b=0,c=l.length;c>b;b++){var m=l[b],n=m.coords,o=m.colors;for(d=0,e=n.length;e>d;d++)n[d]*=2,o[d]*=3}}function k(k,l,m,n){e(B(k),"Mesh data is not a stream");var o=k.dict;this.matrix=l,this.shadingType=o.get("ShadingType"),this.type="Pattern",this.bbox=o.get("BBox");var p=o.get("ColorSpace","CS");p=Ta.parse(p,m,n),this.cs=p,this.background=o.has("Background")?p.getRgb(o.get("Background"),0):null;var q=o.get("Function"),r=q?Pa.parseArray(m,q):null;this.coords=[],this.colors=[],this.figures=[];var s={bitsPerCoordinate:o.get("BitsPerCoordinate"),bitsPerComponent:o.get("BitsPerComponent"),bitsPerFlag:o.get("BitsPerFlag"),decode:o.get("Decode"),colorFn:r,colorSpace:p,numComps:r?1:p.numComps},t=new a(k,s),u=!1;switch(this.shadingType){case ob.FREE_FORM_MESH:b(this,t);break;case ob.LATTICE_FORM_MESH:var v=0|o.get("VerticesPerRow");e(v>=2,"Invalid VerticesPerRow"),d(this,t,v);break;case ob.COONS_PATCH_MESH:g(this,t),u=!0;break;case ob.TENSOR_PATCH_MESH:h(this,t),u=!0;break;default:c("Unsupported mesh type.")}if(u){
// dirty bounds calculation for determining, how dense shall be triangles
i(this);for(var w=0,x=this.figures.length;x>w;w++)f(this,w)}
// calculate bounds
i(this),j(this)}a.prototype={get hasData(){if(this.stream.end)return this.stream.pos<this.stream.end;if(this.bufferLength>0)return!0;var a=this.stream.getByte();return 0>a?!1:(this.buffer=a,this.bufferLength=8,!0)},readBits:function(a){var b=this.buffer,c=this.bufferLength;if(32===a){if(0===c)return(this.stream.getByte()<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte())>>>0;b=b<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte();var d=this.stream.getByte();return this.buffer=d&(1<<c)-1,(b<<8-c|(255&d)>>c)>>>0}if(8===a&&0===c)return this.stream.getByte();for(;a>c;)b=b<<8|this.stream.getByte(),c+=8;return c-=a,this.bufferLength=c,this.buffer=b&(1<<c)-1,b>>c},align:function(){this.buffer=0,this.bufferLength=0},readFlag:function(){return this.readBits(this.context.bitsPerFlag)},readCoordinate:function(){var a=this.context.bitsPerCoordinate,b=this.readBits(a),c=this.readBits(a),d=this.context.decode,e=32>a?1/((1<<a)-1):2.3283064365386963e-10;// 2 ^ -32
return[b*e*(d[1]-d[0])+d[0],c*e*(d[3]-d[2])+d[2]]},readComponents:function(){for(var a=this.context.numComps,b=this.context.bitsPerComponent,c=32>b?1/((1<<b)-1):2.3283064365386963e-10,d=this.context.decode,e=this.tmpCompsBuf,f=0,g=4;a>f;f++,g+=2){var h=this.readBits(b);e[f]=h*c*(d[g+1]-d[g])+d[g]}var i=this.tmpCsCompsBuf;return this.context.colorFn&&this.context.colorFn(e,0,i,0),this.context.colorSpace.getRgb(i,0)}};var l=3,m=20,n=20,o=function(){function a(a){for(var b=[],c=0;a>=c;c++){var d=c/a,e=1-d;b.push(new Float32Array([e*e*e,3*d*e*e,3*d*d*e,d*d*d]))}return b}var b=[];return function(c){return b[c]||(b[c]=a(c)),b[c]}}();return k.prototype={getIR:function(){return["Mesh",this.shadingType,this.coords,this.colors,this.figures,this.bounds,this.matrix,this.bbox,this.background]}},k}(),qb.Dummy=function(){function a(){this.type="Pattern"}return a.prototype={getIR:function(){return["Dummy"]}},a}();var rb=function(){function d(a,b,c,d,e,f,g){this.pdfManager=a,this.xref=b,this.handler=c,this.pageIndex=d,this.uniquePrefix=e,this.idCounters=f,this.fontCache=g}function f(){this.reset()}
// Trying to minimize Date.now() usage and check every 100 time
var g=20,h=100;f.prototype={check:function(){return++this.checked<h?!1:(this.checked=0,this.endTime<=Date.now())},reset:function(){this.endTime=Date.now()+g,this.checked=0}};var i=Promise.resolve(),j=1,k=2;return d.prototype={hasBlendModes:function(a){if(!z(a))return!1;var b=Object.create(null);a.objId&&(b[a.objId]=!0);for(var c=[a];c.length;){var d,e=c.shift(),f=e.get("ExtGState");if(z(f)){f=f.getAll();for(d in f){var g=f[d],h=g.BM;if(x(h)&&"Normal"!==h.name)return!0}}
// Descend into the XObjects to look for more resources and blend modes.
var i=e.get("XObject");if(z(i)){i=i.getAll();for(d in i){var j=i[d];if(B(j)){if(j.dict.objId){if(b[j.dict.objId])
// stream has objId and is processed already
continue;b[j.dict.objId]=!0}var k=j.dict.get("Resources");
// Checking objId to detect an infinite loop.
!z(k)||k.objId&&b[k.objId]||(c.push(k),k.objId&&(b[k.objId]=!0))}}}}return!1},buildFormXObject:function(a,b,c,d,e){var f=b.dict.get("Matrix"),g=b.dict.get("BBox"),h=b.dict.get("Group");if(h){var i,j={matrix:f,bbox:g,smask:c,isolated:!1,knockout:!1},k=h.get("S");x(k)&&"Transparency"===k.name&&(j.isolated=h.get("I")||!1,j.knockout=h.get("K")||!1,i=h.has("CS")?Ta.parse(h.get("CS"),this.xref,a):null),c&&c.backdrop&&(i=i||Ta.singletons.rgb,c.backdrop=i.getRgb(c.backdrop,0)),d.addOp(W.beginGroup,[j])}return d.addOp(W.paintFormXObjectBegin,[f,g]),this.getOperatorList(b,b.dict.get("Resources")||a,d,e).then(function(){d.addOp(W.paintFormXObjectEnd,[]),h&&d.addOp(W.endGroup,[j])})},buildPaintImageXObject:function(a,c,d,e,f,g){var h=this,i=c.dict,j=i.get("Width","W"),k=i.get("Height","H");if(!(j&&v(j)&&k&&v(k)))return void b("Image dimensions are missing, or not numbers.");if(-1!==PDFJS.maxImageSize&&j*k>PDFJS.maxImageSize)return void b("Image exceeded maximum allowed size and was removed.");var l,m,n=i.get("ImageMask","IM")||!1;if(n){
// This depends on a tmpCanvas being filled with the
// current fillStyle, such that processing the pixel
// data can't be done here. Instead of creating a
// complete PDFImage, only read the information needed
// for later.
var o=i.get("Width","W"),p=i.get("Height","H"),q=o+7>>3,r=c.getBytes(q*p),s=i.get("Decode","D"),t=!!s&&s[0]>0;return l=vc.createMask(r,o,p,c instanceof Ic,t),l.cached=!0,m=[l],e.addOp(W.paintImageMaskXObject,m),void(f&&(g[f]={fn:W.paintImageMaskXObject,args:m}))}var u=i.get("SMask","SM")||!1,w=i.get("Mask")||!1,x=200;
// Inlining small images into the queue as RGB data
if(d&&!u&&!w&&!(c instanceof Mc)&&x>j+k){var y=new vc(this.xref,a,c,d,null,null);
// We force the use of RGBA_32BPP images here, because we can't handle
// any other kind.
/* forceRGBA = */
return l=y.createImageData(!0),void e.addOp(W.paintInlineImageXObject,[l])}
// If there is no imageMask, create the PDFImage and a lot
// of image processing can be done here.
var z=this.uniquePrefix||"",A="img_"+z+ ++this.idCounters.obj;
// These JPEGs don't need any more processing so we can just send it.
return e.addDependency(A),m=[A,j,k],!u&&!w&&c instanceof Mc&&c.isNativelySupported(this.xref,a)?(e.addOp(W.paintJpegXObject,m),void this.handler.send("obj",[A,this.pageIndex,"JpegStream",c.getIR()])):(vc.buildImage(h.handler,h.xref,a,c,d).then(function(a){var b=a.createImageData(/* forceRGBA = */!1);h.handler.send("obj",[A,h.pageIndex,"Image",b],[b.data.buffer])}).then(void 0,function(a){b("Unable to decode image: "+a),h.handler.send("obj",[A,h.pageIndex,"Image",null])}),e.addOp(W.paintImageXObject,m),void(f&&(g[f]={fn:W.paintImageXObject,args:m})))},handleSMask:function(a,b,c,d){var e=a.get("G"),f={subtype:a.get("S").name,backdrop:a.get("BC")};return this.buildFormXObject(b,e,f,c,d.state.clone())},handleTilingType:function(a,b,c,d,e,f){
// Create an IR of the pattern code.
var g=new tb;return this.getOperatorList(d,e.get("Resources")||c,g).then(function(){
// Add the dependencies to the parent operator list so they are
// resolved before sub operator list is executed synchronously.
f.addDependencies(g.dependencies),f.addOp(a,G({fnArray:g.fnArray,argsArray:g.argsArray},e,b))})},handleSetFont:function(a,b,c,d,e){
// TODO(mack): Not needed?
var f;b&&(b=b.slice(),f=b[0].name);var g=this;return this.loadFont(f,c,this.xref,a).then(function(b){return b.font.isType3Font?b.loadType3Data(g,a,d).then(function(){return b}):b}).then(function(a){return e.font=a.font,a.send(g.handler),a.loadedName})},handleText:function(a,b){var c=b.font,d=c.charsToGlyphs(a),e=!!(b.textRenderingMode&R.ADD_TO_PATH_FLAG);if(c.data&&(e||PDFJS.disableFontFace))for(var f=function(a){if(!c.renderer.hasBuiltPath(a)){var b=c.renderer.getPathJs(a);this.handler.send("commonobj",[c.loadedName+"_path_"+a,"FontPath",b])}}.bind(this),g=0,h=d.length;h>g;g++){var i=d[g];if(null!==i){f(i.fontChar);
// If the glyph has an accent we need to build a path for its
// fontChar too, otherwise CanvasGraphics_paintChar will fail.
var j=i.accent;j&&j.fontChar&&f(j.fontChar)}}return d},setGState:function(c,d,e,f,g){
// This array holds the converted/processed state data.
var h=[],i=d.map,j=this,k=Promise.resolve();for(var l in i){var m=i[l];switch(l){case"Type":break;case"LW":case"LC":case"LJ":case"ML":case"D":case"RI":case"FL":case"CA":case"ca":h.push([l,m]);break;case"Font":k=k.then(function(){return j.handleSetFont(c,null,m[0],e,g.state).then(function(a){e.addDependency(a),h.push([l,[a,m[1]]])})});break;case"BM":h.push([l,m]);break;case"SMask":if(x(m)&&"None"===m.name){h.push([l,!1]);break}var n=f.fetchIfRef(m);z(n)?(k=k.then(function(){return j.handleSMask(n,c,e,g)}),h.push([l,!0])):b("Unsupported SMask type");break;
// Only generate info log messages for the following since
// they are unlikely to have a big impact on the rendering.
case"OP":case"op":case"OPM":case"BG":case"BG2":case"UCR":case"UCR2":case"TR":case"TR2":case"HT":case"SM":case"SA":case"AIS":case"TK":
// TODO implement these operators.
a("graphic state operator "+l);break;default:a("Unknown graphic state operator "+l)}}return k.then(function(){h.length>=0&&e.addOp(W.setGState,[h])})},loadFont:function(a,c,d,f){function g(){return Promise.resolve(new sb("g_font_error",new $b("Font "+a+" is not available"),c))}var h;if(c)// Loading by ref.
e(D(c)),h=c;else{// Loading by name.
var i=f.get("Font");if(!i)return b("fontRes not available"),g();h=i.getRaw(a)}if(!h)return b("fontRef not available"),g();if(this.fontCache.has(h))return this.fontCache.get(h);if(c=d.fetchIfRef(h),!z(c))return g();
// We are holding font.translated references just for fontRef that are not
// dictionaries (Dict). See explanation below.
if(c.translated)return c.translated;var j=E(),k=this.preEvaluateFont(c,d),l=k.descriptor,m=h.num+"_"+h.gen;if(z(l)){l.fontAliases||(l.fontAliases=Object.create(null));var n=l.fontAliases,o=k.hash;if(n[o]){var p=n[o].aliasRef;if(p&&this.fontCache.has(p))return this.fontCache.putAlias(h,p),this.fontCache.get(h)}n[o]||(n[o]={fontID:Zb.getFontID()}),n[o].aliasRef=h,m=n[o].fontID}
// Workaround for bad PDF generators that don't reference fonts
// properly, i.e. by not using an object identifier.
// Check if the fontRef is a Dict (as opposed to a standard object),
// in which case we don't cache the font and instead reference it by
// fontName in font.loadedName below.
var q=z(h);q||this.fontCache.put(h,j.promise),
// Keep track of each font we translated so the caller can
// load them asynchronously before calling display on a page.
c.loadedName="g_font_"+(q?a.replace(/\W/g,""):m),c.translated=j.promise;
// TODO move promises into translate font
var r;try{r=Promise.resolve(this.translateFont(k,d))}catch(s){r=Promise.reject(s)}return r.then(function(a){if(void 0!==a.fontType){var b=d.stats.fontTypes;b[a.fontType]=!0}j.resolve(new sb(c.loadedName,a,c))},function(a){
// TODO fontCapability.reject?
Y.notify(X.font);try{
// error, but it's still nice to have font type reported
var b=k.descriptor,e=b&&b.get("FontFile3"),f=e&&e.get("Subtype"),g=M(k.type,f&&f.name),h=d.stats.fontTypes;h[g]=!0}catch(i){}j.resolve(new sb(c.loadedName,new $b(a instanceof Error?a.message:a),c))}),j.promise},buildPath:function(a,b,c){var d=a.length-1;if(c||(c=[]),0>d||a.fnArray[d]!==W.constructPath)a.addOp(W.constructPath,[[b],c]);else{var e=a.argsArray[d];e[0].push(b),Array.prototype.push.apply(e[1],c)}},handleColorN:function(a,b,c,d,e,f,g){
// compile tiling patterns
var h,i=c[c.length-1];if(x(i)&&(h=e.get(i.name))){var l=B(h)?h.dict:h,m=l.get("PatternType");if(m===j){var n=d.base?d.base.getRgb(c,0):null;return this.handleTilingType(b,n,f,h,l,a)}if(m===k){var o=l.get("Shading"),p=l.get("Matrix");return h=pb.parseShading(o,p,g,f),a.addOp(b,h.getIR()),Promise.resolve()}return Promise.reject("Unknown PatternType: "+m)}
// TODO shall we fail here?
return a.addOp(b,c),Promise.resolve()},getOperatorList:function(b,d,g,h){var j=this,k=this.xref,l={};e(g),d=d||va.empty;var m=d.get("XObject")||va.empty,n=d.get("Pattern")||va.empty,o=new ub(h||new wb),p=new xb(b,k,o),q=new f;return new Promise(function r(b,f){q.reset();for(var h,s,t,u,y={};!(h=q.check())&&(
// The arguments parsed by read() are used beyond this loop, so we
// cannot reuse the same array on each iteration. Therefore we pass
// in |null| as the initial value (see the comment on
// EvaluatorPreprocessor_read() for why).
y.args=null,p.read(y));){var A=y.args,C=y.fn;switch(0|C){case W.paintXObject:if(A[0].code)break;
// eagerly compile XForm objects
var D=A[0].name;if(void 0!==l[D]){g.addOp(l[D].fn,l[D].args),A=null;continue}var E=m.get(D);if(E){e(B(E),"XObject should be a stream");var F=E.dict.get("Subtype");if(e(x(F),"XObject should have a Name subtype"),"Form"===F.name)return o.save(),j.buildFormXObject(d,E,null,g,o.state.clone()).then(function(){o.restore(),r(b,f)},f);if("Image"===F.name){j.buildPaintImageXObject(d,E,!1,g,D,l),A=null;continue}if("PS"===F.name){
// PostScript XObjects are unused when viewing documents.
// See section 4.7.1 of Adobe's PDF reference.
a("Ignored XObject subtype PS");continue}c("Unhandled XObject subtype "+F.name)}break;case W.setFont:var G=A[1];
// eagerly collect all fonts
return j.handleSetFont(d,A,null,g,o.state).then(function(a){g.addDependency(a),g.addOp(W.setFont,[a,G]),r(b,f)},f);case W.endInlineImage:var H=A[0].cacheKey;if(H){var I=l[H];if(void 0!==I){g.addOp(I.fn,I.args),A=null;continue}}j.buildPaintImageXObject(d,A[0],!0,g,H,l),A=null;continue;case W.showText:A[0]=j.handleText(A[0],o.state);break;case W.showSpacedText:var J=A[0],K=[],L=J.length;for(s=0;L>s;++s){var M=J[s];w(M)?Array.prototype.push.apply(K,j.handleText(M,o.state)):v(M)&&K.push(M)}A[0]=K,C=W.showText;break;case W.nextLineShowText:g.addOp(W.nextLine),A[0]=j.handleText(A[0],o.state),C=W.showText;break;case W.nextLineSetSpacingShowText:g.addOp(W.nextLine),g.addOp(W.setWordSpacing,[A.shift()]),g.addOp(W.setCharSpacing,[A.shift()]),A[0]=j.handleText(A[0],o.state),C=W.showText;break;case W.setTextRenderingMode:o.state.textRenderingMode=A[0];break;case W.setFillColorSpace:o.state.fillColorSpace=Ta.parse(A[0],k,d);continue;case W.setStrokeColorSpace:o.state.strokeColorSpace=Ta.parse(A[0],k,d);continue;case W.setFillColor:u=o.state.fillColorSpace,A=u.getRgb(A,0),C=W.setFillRGBColor;break;case W.setStrokeColor:u=o.state.strokeColorSpace,A=u.getRgb(A,0),C=W.setStrokeRGBColor;break;case W.setFillGray:o.state.fillColorSpace=Ta.singletons.gray,A=Ta.singletons.gray.getRgb(A,0),C=W.setFillRGBColor;break;case W.setStrokeGray:o.state.strokeColorSpace=Ta.singletons.gray,A=Ta.singletons.gray.getRgb(A,0),C=W.setStrokeRGBColor;break;case W.setFillCMYKColor:o.state.fillColorSpace=Ta.singletons.cmyk,A=Ta.singletons.cmyk.getRgb(A,0),C=W.setFillRGBColor;break;case W.setStrokeCMYKColor:o.state.strokeColorSpace=Ta.singletons.cmyk,A=Ta.singletons.cmyk.getRgb(A,0),C=W.setStrokeRGBColor;break;case W.setFillRGBColor:o.state.fillColorSpace=Ta.singletons.rgb,A=Ta.singletons.rgb.getRgb(A,0);break;case W.setStrokeRGBColor:o.state.strokeColorSpace=Ta.singletons.rgb,A=Ta.singletons.rgb.getRgb(A,0);break;case W.setFillColorN:if(u=o.state.fillColorSpace,"Pattern"===u.name)return j.handleColorN(g,W.setFillColorN,A,u,n,d,k).then(function(){r(b,f)},f);A=u.getRgb(A,0),C=W.setFillRGBColor;break;case W.setStrokeColorN:if(u=o.state.strokeColorSpace,"Pattern"===u.name)return j.handleColorN(g,W.setStrokeColorN,A,u,n,d,k).then(function(){r(b,f)},f);A=u.getRgb(A,0),C=W.setStrokeRGBColor;break;case W.shadingFill:var N=d.get("Shading");N||c("No shading resource found");var O=N.get(A[0].name);O||c("No shading object found");var P=pb.parseShading(O,null,k,d),Q=P.getIR();A=[Q],C=W.shadingFill;break;case W.setGState:var R=A[0],S=d.get("ExtGState");if(!z(S)||!S.has(R.name))break;var T=S.get(R.name);return j.setGState(d,T,g,k,o).then(function(){r(b,f)},f);case W.moveTo:case W.lineTo:case W.curveTo:case W.curveTo2:case W.curveTo3:case W.closePath:j.buildPath(g,C,A);continue;case W.rectangle:j.buildPath(g,C,A);continue}g.addOp(C,A)}if(h)return void i.then(function(){r(b,f)});
// Some PDFs don't close all restores inside object/form.
// Closing those for them.
for(s=0,t=p.savedStatesDepth;t>s;s++)g.addOp(W.restore,[]);b()})},getTextContent:function(a,b,c){function d(){var a=q.font;return a.loadedName in k.styles||(k.styles[a.loadedName]={fontFamily:a.fallbackName,ascent:a.ascent,descent:a.descent,vertical:a.vertical}),{
// |str| is initially an array which we push individual chars to, and
// then runBidi() overwrites it with the final string.
str:[],dir:null,width:0,height:0,transform:null,fontName:a.loadedName}}function g(a){var b=a.str.join(""),c=PDFJS.bidi(b,-1,q.font.vertical);return a.str=c.str,a.dir=c.dir,a}function h(a,c){return o.loadFont(a,c,p,b).then(function(a){q.font=a.font,q.fontMatrix=a.font.fontMatrix||Q})}function j(a,b){var c=q.font;if(b=b||d(),!b.transform){
// 9.4.4 Text Space Details
var e=[q.fontSize*q.textHScale,0,0,q.fontSize,0,q.textRise],f=b.transform=ia.transform(q.ctm,ia.transform(q.textMatrix,e));c.vertical?b.width=Math.sqrt(f[0]*f[0]+f[1]*f[1]):b.height=Math.sqrt(f[2]*f[2]+f[3]*f[3])}for(var g=0,h=0,i=c.charsToGlyphs(a),j=c.defaultVMetrics,k=0;k<i.length;k++){var l=i[k];if(l){var m=null,n=null,o=null;c.vertical?l.vmetric?(o=l.vmetric[0],m=l.vmetric[1],n=l.vmetric[2]):(o=l.width,m=.5*l.width,n=j[2]):o=l.width;var p=l.unicode;void 0!==Ub[p]&&(p=Ub[p]),p=K(p);
// The following will calculate the x and y of the individual glyphs.
// if (font.vertical) {
//   tsm[4] -= vMetricX * Math.abs(textState.fontSize) *
//             textState.fontMatrix[0];
//   tsm[5] -= vMetricY * textState.fontSize *
//             textState.fontMatrix[0];
// }
// var trm = Util.transform(textState.textMatrix, tsm);
// var pt = Util.applyTransform([trm[4], trm[5]], textState.ctm);
// var x = pt[0];
// var y = pt[1];
var r=0,s=0;if(c.vertical){var t=o*q.fontMatrix[0];s=t*q.fontSize+q.charSpacing,h+=s}else{var u=o*q.fontMatrix[0];r=(u*q.fontSize+q.charSpacing)*q.textHScale,g+=r}q.translateTextMatrix(r,s),b.str.push(p)}else// Previous glyph was a space.
g+=q.wordSpacing*q.textHScale}var v=q.textLineMatrix[0],w=q.textLineMatrix[1],x=Math.sqrt(v*v+w*w);v=q.ctm[0],w=q.ctm[1];var y=Math.sqrt(v*v+w*w);return c.vertical?b.height+=Math.abs(h*y*x):b.width+=g*y*x,b}c=c||new ub(new vb);var k={items:[],styles:Object.create(null)},l=k.items,m=.3,n=1.5,o=this,p=this.xref;b=p.fetchIfRef(b)||va.empty;
// The xobj is parsed iff it's needed, e.g. if there is a `DO` cmd.
var q,r=null,s={},t=new xb(a,p,c),u=new f;return new Promise(function v(a,f){u.reset();for(var p,w={},y=[];!(p=u.check())&&(
// The arguments parsed by read() are not used beyond this loop, so
// we can reuse the same array on every iteration, thus avoiding
// unnecessary allocations.
y.length=0,w.args=y,t.read(w));){q=c.state;var C=w.fn;switch(y=w.args,0|C){case W.setFont:return q.fontSize=y[1],h(y[0].name).then(function(){v(a,f)},f);case W.setTextRise:q.textRise=y[0];break;case W.setHScale:q.textHScale=y[0]/100;break;case W.setLeading:q.leading=y[0];break;case W.moveText:q.translateTextLineMatrix(y[0],y[1]),q.textMatrix=q.textLineMatrix.slice();break;case W.setLeadingMoveText:q.leading=-y[1],q.translateTextLineMatrix(y[0],y[1]),q.textMatrix=q.textLineMatrix.slice();break;case W.nextLine:q.carriageReturn();break;case W.setTextMatrix:q.setTextMatrix(y[0],y[1],y[2],y[3],y[4],y[5]),q.setTextLineMatrix(y[0],y[1],y[2],y[3],y[4],y[5]);break;case W.setCharSpacing:q.charSpacing=y[0];break;case W.setWordSpacing:q.wordSpacing=y[0];break;case W.beginText:q.textMatrix=ha.slice(),q.textLineMatrix=ha.slice();break;case W.showSpacedText:for(var D,E=y[0],F=d(),G=0,H=E.length;H>G;G++)if("string"==typeof E[G])j(E[G],F);else{var I=E[G]/1e3;if(q.font.vertical?(D=-I*q.fontSize*q.textMatrix[3],q.translateTextMatrix(0,D),F.height+=D):(D=-I*q.fontSize*q.textHScale*q.textMatrix[0],q.translateTextMatrix(D,0),F.width+=D),E[G]<0&&q.font.spaceWidth>0){var J=-E[G]/q.font.spaceWidth;if(J>n)for(J=Math.round(J);J--;)F.str.push(" ");else J>m&&F.str.push(" ")}}l.push(g(F));break;case W.showText:l.push(g(j(y[0])));break;case W.nextLineShowText:q.carriageReturn(),l.push(g(j(y[0])));break;case W.nextLineSetSpacingShowText:q.wordSpacing=y[0],q.charSpacing=y[1],q.carriageReturn(),l.push(g(j(y[2])));break;case W.paintXObject:if(y[0].code)break;r||(r=b.get("XObject")||va.empty);var K=y[0].name;if(s.key===K){s.texts&&(ia.appendToArray(l,s.texts.items),ia.extendObj(k.styles,s.texts.styles));break}var L=r.get(K);if(!L)break;e(B(L),"XObject should be a stream");var M=L.dict.get("Subtype");if(e(x(M),"XObject should have a Name subtype"),"Form"!==M.name){s.key=K,s.texts=null;break}c.save();var N=L.dict.get("Matrix");return A(N)&&6===N.length&&c.transform(N),o.getTextContent(L,L.dict.get("Resources")||b,c).then(function(b){ia.appendToArray(l,b.items),ia.extendObj(k.styles,b.styles),c.restore(),s.key=K,s.texts=b,v(a,f)},f);case W.setGState:var O=y[0],P=b.get("ExtGState");if(!z(P)||!P.has(O.name))break;var Q=P.get(O.name),R=null;for(var S in Q)"Font"===S&&(e(!R),R=Q[S]);if(R)return q.fontSize=R[1],h(R[0]).then(function(){v(a,f)},f)}}// while
// while
return p?void i.then(function(){v(a,f)}):void a(k)})},extractDataStructures:function(a,b,d,e){
// 9.10.2
var f=a.get("ToUnicode")||b.get("ToUnicode");if(f&&(e.toUnicode=this.readToUnicode(f)),e.composite){
// CIDSystemInfo helps to match CID to glyphs
var g=a.get("CIDSystemInfo");z(g)&&(e.cidSystemInfo={registry:g.get("Registry"),ordering:g.get("Ordering"),supplement:g.get("Supplement")});var h=a.get("CIDToGIDMap");B(h)&&(e.cidToGidMap=this.readCidToGidMap(h))}
// Based on 9.6.6 of the spec the encoding can come from multiple places
// and depends on the font type. The base encoding and differences are
// read here, but the encoding that is actually used is chosen during
// glyph mapping in the font.
// TODO: Loading the built in encoding in the font would allow the
// differences to be merged in here not require us to hold on to it.
var i,j=[],k=null;if(a.has("Encoding")){if(i=a.get("Encoding"),z(i)){
// Load the differences between the base and original
if(k=i.get("BaseEncoding"),k=x(k)?k.name:null,i.has("Differences"))for(var l=i.get("Differences"),m=0,n=0,o=l.length;o>n;n++){var p=l[n];v(p)?m=p:j[m++]=p.name}}else x(i)?k=i.name:c("Encoding is not a Name nor a Dict");
// According to table 114 if the encoding is a named encoding it must be
// one of these predefined encodings.
"MacRomanEncoding"!==k&&"MacExpertEncoding"!==k&&"WinAnsiEncoding"!==k&&(k=null)}k?e.defaultEncoding=Lb[k].slice():(i="TrueType"===e.type?Lb.WinAnsiEncoding:Lb.StandardEncoding,
// The Symbolic attribute can be misused for regular fonts
// Heuristic: we have to check if the font is a standard one also
e.flags&Kb.Symbolic&&(i=Lb.MacRomanEncoding,e.file||(/Symbol/i.test(e.name)?i=Lb.SymbolSetEncoding:/Dingbats/i.test(e.name)&&(i=Lb.ZapfDingbatsEncoding))),e.defaultEncoding=i),e.differences=j,e.baseEncodingName=k,e.dict=a},readToUnicode:function(a){var b,c=a;
// Convert UTF-16BE
// NOTE: cmap can be a sparse array, so use forEach instead of for(;;)
// to iterate over all keys.
return x(c)?(b=Db.create(c,{url:PDFJS.cMapUrl,packed:PDFJS.cMapPacked},null).getMap(),new Wb(b)):B(c)?(b=Db.create(c,{url:PDFJS.cMapUrl,packed:PDFJS.cMapPacked},null).getMap(),b.forEach(function(a,c){for(var d=[],e=0;e<a.length;e+=2){var f=a.charCodeAt(e)<<8|a.charCodeAt(e+1);if(55296===(63488&f)){e+=2;var g=a.charCodeAt(e)<<8|a.charCodeAt(e+1);d.push(((1023&f)<<10)+(1023&g)+65536)}else// w1 < 0xD800 || w1 > 0xDFFF
d.push(f)}b[c]=String.fromCharCode.apply(String,d)}),new Wb(b)):null},readCidToGidMap:function(a){for(var b=a.getBytes(),c=[],d=0,e=b.length;e>d;d++){var f=b[d++]<<8|b[d];if(0!==f){var g=d>>1;c[g]=f}}return c},extractWidths:function(a,b,c,d){var e,f,g,h,i,j,k,l,m=[],n=0,o=[];if(d.composite){if(n=a.get("DW")||1e3,l=a.get("W"))for(f=0,g=l.length;g>f;f++)if(j=l[f++],k=b.fetchIfRef(l[f]),A(k))for(h=0,i=k.length;i>h;h++)m[j++]=k[h];else{var p=l[++f];for(h=j;k>=h;h++)m[h]=p}if(d.vertical){var q=a.get("DW2")||[880,-1e3];if(e=[q[1],.5*n,q[0]],q=a.get("W2"))for(f=0,g=q.length;g>f;f++)if(j=q[f++],k=b.fetchIfRef(q[f]),A(k))for(h=0,i=k.length;i>h;h++)o[j++]=[k[h++],k[h++],k[h]];else{var r=[q[++f],q[++f],q[++f]];for(h=j;k>=h;h++)o[h]=r}}}else{var s=d.firstChar;if(l=a.get("Widths")){for(h=s,f=0,g=l.length;g>f;f++)m[h++]=l[f];n=parseFloat(c.get("MissingWidth"))||0}else{
// Trying get the BaseFont metrics (see comment above).
var t=a.get("BaseFont");if(x(t)){var u=this.getBaseFontMetrics(t.name);m=this.buildCharCodeToWidth(u.widths,d),n=u.defaultWidth}}}
// Heuristic: detection of monospace font by checking all non-zero widths
var v=!0,w=n;for(var y in m){var z=m[y];if(z)if(w){if(w!==z){v=!1;break}}else w=z}v&&(d.flags|=Kb.FixedPitch),d.defaultWidth=n,d.widths=m,d.defaultVMetrics=e,d.vmetrics=o},isSerifFont:function(a){
// Simulating descriptor flags attribute
var b=a.split("-")[0];return b in Ob||-1!==b.search(/serif/gi)},getBaseFontMetrics:function(a){var b=0,c=[],d=!1,e=Mb[a]||a;e in wc||(
// Use default fonts for looking up font metrics if the passed
// font is not a base font
e=this.isSerifFont(a)?"Times-Roman":"Helvetica");var f=wc[e];return v(f)?(b=f,d=!0):c=f,{defaultWidth:b,monospace:d,widths:c}},buildCharCodeToWidth:function(a,b){for(var c=Object.create(null),d=b.differences,e=b.defaultEncoding,f=0;256>f;f++)f in d&&a[d[f]]?c[f]=a[d[f]]:f in e&&a[e[f]]&&(c[f]=a[e[f]]);return c},preEvaluateFont:function(a,b){var d=a,f=a.get("Subtype");e(x(f),"invalid font Subtype");var g,h=!1;if("Type0"===f.name){
// If font is a composite
//  - get the descendant font
//  - set the type according to the descendant font
//  - get the FontDescriptor from the descendant font
var i=a.get("DescendantFonts");i||c("Descendant fonts are not specified"),a=A(i)?b.fetchIfRef(i[0]):i,f=a.get("Subtype"),e(x(f),"invalid font Subtype"),h=!0}var j=a.get("FontDescriptor");if(j){var k=new cd,l=d.getRaw("Encoding");x(l)?k.update(l.name):D(l)&&k.update(l.num+"_"+l.gen);var m=a.get("ToUnicode")||d.get("ToUnicode");if(B(m)){var n=m.str||m;g=n.buffer?new Uint8Array(n.buffer.buffer,0,n.bufferLength):new Uint8Array(n.bytes.buffer,n.start,n.end-n.start),k.update(g)}else x(m)&&k.update(m.name);var o=a.get("Widths")||d.get("Widths");o&&(g=new Uint8Array(new Uint32Array(o).buffer),k.update(g))}return{descriptor:j,dict:a,baseDict:d,composite:h,type:f.name,hash:k?k.hexdigest():""}},translateFont:function(b,d){var f,g=b.baseDict,h=b.dict,i=b.composite,j=b.descriptor,k=b.type,l=i?65535:255;if(!j){if("Type3"!==k){
// Before PDF 1.5 if the font was one of the base 14 fonts, having a
// FontDescriptor was not required.
// This case is here for compatibility.
var m=h.get("BaseFont");x(m)||c("Base font is not specified"),
// Using base font name as a font name.
m=m.name.replace(/[,_]/g,"-");var n=this.getBaseFontMetrics(m),o=m.split("-")[0],p=(this.isSerifFont(o)?Kb.Serif:0)|(n.monospace?Kb.FixedPitch:0)|(Pb[o]?Kb.Symbolic:Kb.Nonsymbolic);return f={type:k,name:m,widths:n.widths,defaultWidth:n.defaultWidth,flags:p,firstChar:0,lastChar:l},this.extractDataStructures(h,h,d,f),f.widths=this.buildCharCodeToWidth(n.widths,f),new Zb(m,null,f)}
// FontDescriptor is only required for Type3 fonts when the document
// is a tagged pdf. Create a barbebones one to get by.
j=new va(null),j.set("FontName",ta.get(k))}
// According to the spec if 'FontDescriptor' is declared, 'FirstChar',
// 'LastChar' and 'Widths' should exist too, but some PDF encoders seem
// to ignore this rule when a variant of a standart font is used.
// TODO Fill the width array depending on which of the base font this is
// a variant.
var q=h.get("FirstChar")||0,r=h.get("LastChar")||l,s=j.get("FontName"),t=h.get("BaseFont");if(
// Some bad PDFs have a string as the font name.
w(s)&&(s=ta.get(s)),w(t)&&(t=ta.get(t)),"Type3"!==k){var u=s&&s.name,v=t&&t.name;u!==v&&(a("The FontDescriptor's FontName is \""+u+'" but should be the same as the Font\'s BaseFont "'+v+'"'),
// Workaround for cases where e.g. fontNameStr = 'Arial' and
// baseFontStr = 'Arial,Bold' (needed when no font file is embedded).
u&&v&&0===v.indexOf(u)&&(s=t))}s=s||t,e(x(s),"invalid font name");var y=j.get("FontFile","FontFile2","FontFile3");if(y&&y.dict){var z=y.dict.get("Subtype");z&&(z=z.name);var A=y.dict.get("Length1"),B=y.dict.get("Length2")}if(f={type:k,name:s.name,subtype:z,file:y,length1:A,length2:B,loadedName:g.loadedName,composite:i,wideChars:i,fixedPitch:!1,fontMatrix:h.get("FontMatrix")||Q,firstChar:q||0,lastChar:r||l,bbox:j.get("FontBBox"),ascent:j.get("Ascent"),descent:j.get("Descent"),xHeight:j.get("XHeight"),capHeight:j.get("CapHeight"),flags:j.get("Flags"),italicAngle:j.get("ItalicAngle"),coded:!1},i){var C=g.get("Encoding");x(C)&&(f.cidEncoding=C.name),f.cMap=Db.create(C,{url:PDFJS.cMapUrl,packed:PDFJS.cMapPacked},null),f.vertical=f.cMap.vertical}return this.extractDataStructures(h,g,d,f),this.extractWidths(h,d,j,f),"Type3"===k&&(f.isType3Font=!0),new Zb(s.name,y,f)}},d}(),sb=function(){function a(a,b,c){this.loadedName=a,this.font=b,this.dict=c,this.type3Loaded=null,this.sent=!1}return a.prototype={send:function(a){if(!this.sent){var b=this.font.exportData();a.send("commonobj",[this.loadedName,"Font",b]),this.sent=!0}},loadType3Data:function(a,c,d){if(e(this.font.isType3Font),this.type3Loaded)return this.type3Loaded;for(var f=this.font,g=Promise.resolve(),h=this.dict.get("CharProcs").getAll(),i=this.dict.get("Resources")||c,j=Object.keys(h),k={},l=0,m=j.length;m>l;++l)g=g.then(function(c){var e=h[c],f=new tb;return a.getOperatorList(e,i,f).then(function(){k[c]=f.getIR(),
// Add the dependencies to the parent operator list so they are
// resolved before sub operator list is executed synchronously.
d.addDependencies(f.dependencies)},function(a){b('Type3 font resource "'+c+'" is not available');var d=new tb;k[c]=d.getIR()})}.bind(this,j[l]));return this.type3Loaded=g.then(function(){f.charProcOperatorList=k}),this.type3Loaded}},a}(),tb=function(){// close to chunk size
function a(a){for(var b=[],c=a.fnArray,d=a.argsArray,e=0,f=a.length;f>e;e++)switch(c[e]){case W.paintInlineImageXObject:case W.paintInlineImageXObjectGroup:case W.paintImageMaskXObject:var g=d[e][0];// first param in imgData
g.cached||b.push(g.data.buffer)}return b}function b(a,b,c){this.messageHandler=b,this.fnArray=[],this.argsArray=[],this.dependencies={},this.pageIndex=c,this.intent=a}var c=1e3,d=c-5;return b.prototype={get length(){return this.argsArray.length},addOp:function(a,b){this.fnArray.push(a),this.argsArray.push(b),this.messageHandler&&(this.fnArray.length>=c?this.flush():this.fnArray.length>=d&&(a===W.restore||a===W.endText)&&
// heuristic to flush on boundary of restore or endText
this.flush())},addDependency:function(a){a in this.dependencies||(this.dependencies[a]=!0,this.addOp(W.dependency,[a]))},addDependencies:function(a){for(var b in a)this.addDependency(b)},addOpList:function(a){ia.extendObj(this.dependencies,a.dependencies);for(var b=0,c=a.length;c>b;b++)this.addOp(a.fnArray[b],a.argsArray[b])},getIR:function(){return{fnArray:this.fnArray,argsArray:this.argsArray,length:this.length}},flush:function(b){"oplist"!==this.intent&&(new yb).optimize(this);var c=a(this);this.messageHandler.send("RenderPageChunk",{operatorList:{fnArray:this.fnArray,argsArray:this.argsArray,lastChunk:b,length:this.length},pageIndex:this.pageIndex,intent:this.intent},c),this.dependencies={},this.fnArray.length=0,this.argsArray.length=0}},b}(),ub=function(){function a(a){this.state=a,this.stateStack=[]}return a.prototype={save:function(){var a=this.state;this.stateStack.push(this.state),this.state=a.clone()},restore:function(){var a=this.stateStack.pop();a&&(this.state=a)},transform:function(a){this.state.ctm=ia.transform(this.state.ctm,a)}},a}(),vb=function(){function a(){this.ctm=new Float32Array(ha),this.fontSize=0,this.font=null,this.fontMatrix=Q,this.textMatrix=ha.slice(),this.textLineMatrix=ha.slice(),this.charSpacing=0,this.wordSpacing=0,this.leading=0,this.textHScale=1,this.textRise=0}return a.prototype={setTextMatrix:function(a,b,c,d,e,f){var g=this.textMatrix;g[0]=a,g[1]=b,g[2]=c,g[3]=d,g[4]=e,g[5]=f},setTextLineMatrix:function(a,b,c,d,e,f){var g=this.textLineMatrix;g[0]=a,g[1]=b,g[2]=c,g[3]=d,g[4]=e,g[5]=f},translateTextMatrix:function(a,b){var c=this.textMatrix;c[4]=c[0]*a+c[2]*b+c[4],c[5]=c[1]*a+c[3]*b+c[5]},translateTextLineMatrix:function(a,b){var c=this.textLineMatrix;c[4]=c[0]*a+c[2]*b+c[4],c[5]=c[1]*a+c[3]*b+c[5]},calcRenderMatrix:function(a){
// 9.4.4 Text Space Details
var b=[this.fontSize*this.textHScale,0,0,this.fontSize,0,this.textRise];return ia.transform(a,ia.transform(this.textMatrix,b))},carriageReturn:function(){this.translateTextLineMatrix(0,-this.leading),this.textMatrix=this.textLineMatrix.slice()},clone:function(){var a=Object.create(this);return a.textMatrix=this.textMatrix.slice(),a.textLineMatrix=this.textLineMatrix.slice(),a.fontMatrix=this.fontMatrix.slice(),a}},a}(),wb=function(){function a(){this.ctm=new Float32Array(ha),this.font=null,this.textRenderingMode=R.FILL,this.fillColorSpace=Ta.singletons.gray,this.strokeColorSpace=Ta.singletons.gray}return a.prototype={clone:function(){return Object.create(this)}},a}(),xb=function(){function c(a,b,c){
// TODO(mduan): pass array of knownCommands rather than OP_MAP
// dictionary
this.parser=new zc(new Ac(a,d),!1,b),this.stateManager=c,this.nonProcessedArgs=[]}
// Specifies properties for each command
//
// If variableArgs === true: [0, `numArgs`] expected
// If variableArgs === false: exactly `numArgs` expected
var d={
// Graphic state
w:{id:W.setLineWidth,numArgs:1,variableArgs:!1},J:{id:W.setLineCap,numArgs:1,variableArgs:!1},j:{id:W.setLineJoin,numArgs:1,variableArgs:!1},M:{id:W.setMiterLimit,numArgs:1,variableArgs:!1},d:{id:W.setDash,numArgs:2,variableArgs:!1},ri:{id:W.setRenderingIntent,numArgs:1,variableArgs:!1},i:{id:W.setFlatness,numArgs:1,variableArgs:!1},gs:{id:W.setGState,numArgs:1,variableArgs:!1},q:{id:W.save,numArgs:0,variableArgs:!1},Q:{id:W.restore,numArgs:0,variableArgs:!1},cm:{id:W.transform,numArgs:6,variableArgs:!1},
// Path
m:{id:W.moveTo,numArgs:2,variableArgs:!1},l:{id:W.lineTo,numArgs:2,variableArgs:!1},c:{id:W.curveTo,numArgs:6,variableArgs:!1},v:{id:W.curveTo2,numArgs:4,variableArgs:!1},y:{id:W.curveTo3,numArgs:4,variableArgs:!1},h:{id:W.closePath,numArgs:0,variableArgs:!1},re:{id:W.rectangle,numArgs:4,variableArgs:!1},S:{id:W.stroke,numArgs:0,variableArgs:!1},s:{id:W.closeStroke,numArgs:0,variableArgs:!1},f:{id:W.fill,numArgs:0,variableArgs:!1},F:{id:W.fill,numArgs:0,variableArgs:!1},"f*":{id:W.eoFill,numArgs:0,variableArgs:!1},B:{id:W.fillStroke,numArgs:0,variableArgs:!1},"B*":{id:W.eoFillStroke,numArgs:0,variableArgs:!1},b:{id:W.closeFillStroke,numArgs:0,variableArgs:!1},"b*":{id:W.closeEOFillStroke,numArgs:0,variableArgs:!1},n:{id:W.endPath,numArgs:0,variableArgs:!1},
// Clipping
W:{id:W.clip,numArgs:0,variableArgs:!1},"W*":{id:W.eoClip,numArgs:0,variableArgs:!1},
// Text
BT:{id:W.beginText,numArgs:0,variableArgs:!1},ET:{id:W.endText,numArgs:0,variableArgs:!1},Tc:{id:W.setCharSpacing,numArgs:1,variableArgs:!1},Tw:{id:W.setWordSpacing,numArgs:1,variableArgs:!1},Tz:{id:W.setHScale,numArgs:1,variableArgs:!1},TL:{id:W.setLeading,numArgs:1,variableArgs:!1},Tf:{id:W.setFont,numArgs:2,variableArgs:!1},Tr:{id:W.setTextRenderingMode,numArgs:1,variableArgs:!1},Ts:{id:W.setTextRise,numArgs:1,variableArgs:!1},Td:{id:W.moveText,numArgs:2,variableArgs:!1},TD:{id:W.setLeadingMoveText,numArgs:2,variableArgs:!1},Tm:{id:W.setTextMatrix,numArgs:6,variableArgs:!1},"T*":{id:W.nextLine,numArgs:0,variableArgs:!1},Tj:{id:W.showText,numArgs:1,variableArgs:!1},TJ:{id:W.showSpacedText,numArgs:1,variableArgs:!1},"'":{id:W.nextLineShowText,numArgs:1,variableArgs:!1},'"':{id:W.nextLineSetSpacingShowText,numArgs:3,variableArgs:!1},
// Type3 fonts
d0:{id:W.setCharWidth,numArgs:2,variableArgs:!1},d1:{id:W.setCharWidthAndBounds,numArgs:6,variableArgs:!1},
// Color
CS:{id:W.setStrokeColorSpace,numArgs:1,variableArgs:!1},cs:{id:W.setFillColorSpace,numArgs:1,variableArgs:!1},SC:{id:W.setStrokeColor,numArgs:4,variableArgs:!0},SCN:{id:W.setStrokeColorN,numArgs:33,variableArgs:!0},sc:{id:W.setFillColor,numArgs:4,variableArgs:!0},scn:{id:W.setFillColorN,numArgs:33,variableArgs:!0},G:{id:W.setStrokeGray,numArgs:1,variableArgs:!1},g:{id:W.setFillGray,numArgs:1,variableArgs:!1},RG:{id:W.setStrokeRGBColor,numArgs:3,variableArgs:!1},rg:{id:W.setFillRGBColor,numArgs:3,variableArgs:!1},K:{id:W.setStrokeCMYKColor,numArgs:4,variableArgs:!1},k:{id:W.setFillCMYKColor,numArgs:4,variableArgs:!1},
// Shading
sh:{id:W.shadingFill,numArgs:1,variableArgs:!1},
// Images
BI:{id:W.beginInlineImage,numArgs:0,variableArgs:!1},ID:{id:W.beginImageData,numArgs:0,variableArgs:!1},EI:{id:W.endInlineImage,numArgs:1,variableArgs:!1},
// XObjects
Do:{id:W.paintXObject,numArgs:1,variableArgs:!1},MP:{id:W.markPoint,numArgs:1,variableArgs:!1},DP:{id:W.markPointProps,numArgs:2,variableArgs:!1},BMC:{id:W.beginMarkedContent,numArgs:1,variableArgs:!1},BDC:{id:W.beginMarkedContentProps,numArgs:2,variableArgs:!1},EMC:{id:W.endMarkedContent,numArgs:0,variableArgs:!1},
// Compatibility
BX:{id:W.beginCompat,numArgs:0,variableArgs:!1},EX:{id:W.endCompat,numArgs:0,variableArgs:!1},
// (reserved partial commands for the lexer)
BM:null,BD:null,"true":null,fa:null,fal:null,fals:null,"false":null,nu:null,nul:null,"null":null};return c.prototype={get savedStatesDepth(){return this.stateManager.stateStack.length},
// |operation| is an object with two fields:
//
// - |fn| is an out param.
//
// - |args| is an inout param. On entry, it should have one of two values.
//
//   - An empty array. This indicates that the caller is providing the
//     array in which the args will be stored in. The caller should use
//     this value if it can reuse a single array for each call to read().
//
//   - |null|. This indicates that the caller needs this function to create
//     the array in which any args are stored in. If there are zero args,
//     this function will leave |operation.args| as |null| (thus avoiding
//     allocations that would occur if we used an empty array to represent
//     zero arguments). Otherwise, it will replace |null| with a new array
//     containing the arguments. The caller should use this value if it
//     cannot reuse an array for each call to read().
//
// These two modes are present because this function is very hot and so
// avoiding allocations where possible is worthwhile.
//
read:function(c){for(var f=c.args;;){var g=this.parser.getObj();if(y(g)){var h=g.cmd,i=d[h];if(!i){b('Unknown command "'+h+'"');continue}var j=i.id,k=i.numArgs,l=null!==f?f.length:0;if(i.variableArgs)l>k&&a("Command "+j+": expected [0,"+k+"] args, but received "+l+" args");else{
// Postscript commands can be nested, e.g. /F2 /GS2 gs 5.711 Tf
if(l!==k){for(var m=this.nonProcessedArgs;l>k;)m.push(f.shift()),l--;for(;k>l&&0!==m.length;)f||(f=[]),f.unshift(m.pop()),l++}if(k>l){
// If we receive too few args, it's not possible to possible
// to execute the command, so skip the command
a("Command "+j+": because expected "+k+" args, but received "+l+" args; skipping"),f=null;continue}}
// TODO figure out how to type-check vararg functions
return this.preprocessCommand(j,f),c.fn=j,c.args=f,!0}if(O(g))return!1;
// argument
null!==g&&(f||(f=[]),f.push(g instanceof va?g.getAll():g),e(f.length<=33,"Too many arguments"))}},preprocessCommand:function(a,b){switch(0|a){case W.save:this.stateManager.save();break;case W.restore:this.stateManager.restore();break;case W.transform:this.stateManager.transform(b)}}},c}(),yb=function(){function a(a,b,c){for(var d=a,e=0,f=b.length-1;f>e;e++){var g=b[e];d=d[g]||(d[g]=[])}d[b[b.length-1]]=c}function b(a,b,c,d){for(var e=a+2,f=0;b>f;f++){var g=d[e+4*f],h=1===g.length&&g[0];if(!h||1!==h.width||1!==h.height||h.data.length&&(1!==h.data.length||0!==h.data[0]))break;c[e+4*f]=W.paintSolidColorImageMask}return b-f}function c(){}var d=[];
// This replaces (save, transform, paintInlineImageXObject, restore)+
// sequences with one |paintInlineImageXObjectGroup| operation.
// This replaces (save, transform, paintImageMaskXObject, restore)+
// sequences with one |paintImageMaskXObjectGroup| or one
// |paintImageMaskXObjectRepeat| operation.
// This replaces (save, transform, paintImageXObject, restore)+ sequences
// with one paintImageXObjectRepeat operation, if the |transform| and
// |paintImageXObjectRepeat| ops are appropriate.
// This replaces (beginText, setFont, setTextMatrix, showText, endText)+
// sequences with (beginText, setFont, (setTextMatrix, showText)+, endText)+
// sequences, if the font for each one is the same.
return a(d,[W.save,W.transform,W.paintInlineImageXObject,W.restore],function(a){for(var b=10,c=200,d=1e3,e=1,f=a.fnArray,g=a.argsArray,h=a.iCurr,i=h-3,j=h-2,k=h-1,l=i+4,m=f.length;m>l+3&&f[l]===W.save&&f[l+1]===W.transform&&f[l+2]===W.paintInlineImageXObject&&f[l+3]===W.restore;)l+=4;
// At this point, i is the index of the first op past the last valid
// quartet.
var n=Math.min((l-i)/4,c);if(b>n)return l;
// assuming that heights of those image is too small (~1 pixel)
// packing as much as possible by lines
var o,p=0,q=[],r=0,s=e,t=e;for(o=0;n>o;o++){var u=g[j+(o<<2)],v=g[k+(o<<2)][0];s+v.width>d&&(
// starting new line
p=Math.max(p,s),t+=r+2*e,s=0,r=0),q.push({transform:u,x:s,y:t,w:v.width,h:v.height}),s+=v.width+2*e,r=Math.max(r,v.height)}var w=Math.max(p,s)+e,x=t+r+e,y=new Uint8Array(w*x*4),z=w<<2;for(o=0;n>o;o++){var A=g[k+(o<<2)][0].data,B=q[o].w<<2,C=0,D=q[o].x+q[o].y*w<<2;y.set(A.subarray(0,B),D-z);for(var E=0,F=q[o].h;F>E;E++)y.set(A.subarray(C,C+B),D),C+=B,D+=z;for(y.set(A.subarray(C-B,C),D);D>=0;)A[D-4]=A[D],A[D-3]=A[D+1],A[D-2]=A[D+2],A[D-1]=A[D+3],A[D+B]=A[D+B-4],A[D+B+1]=A[D+B-3],A[D+B+2]=A[D+B-2],A[D+B+3]=A[D+B-1],D-=z}
// Replace queue items.
return f.splice(i,4*n,W.paintInlineImageXObjectGroup),g.splice(i,4*n,[{width:w,height:x,kind:S.RGBA_32BPP,data:y},q]),i+1}),a(d,[W.save,W.transform,W.paintImageMaskXObject,W.restore],function(a){for(var c=10,d=100,e=1e3,f=a.fnArray,g=a.argsArray,h=a.iCurr,i=h-3,j=h-2,k=h-1,l=i+4,m=f.length;m>l+3&&f[l]===W.save&&f[l+1]===W.transform&&f[l+2]===W.paintImageMaskXObject&&f[l+3]===W.restore;)l+=4;
// At this point, i is the index of the first op past the last valid
// quartet.
var n=(l-i)/4;if(n=b(i,n,f,g),c>n)return l;var o,p,q,r=!1,s=g[k][0];if(0===g[j][1]&&0===g[j][2]){r=!0;var t=g[j][0],u=g[j][3];p=j+4;var v=k+4;for(o=1;n>o;o++,p+=4,v+=4)if(q=g[p],g[v][0]!==s||q[0]!==t||0!==q[1]||0!==q[2]||q[3]!==u){c>o?r=!1:n=o;break}}if(r){n=Math.min(n,e);var w=new Float32Array(2*n);for(p=j,o=0;n>o;o++,p+=4)q=g[p],w[o<<1]=q[4],w[(o<<1)+1]=q[5];
// Replace queue items.
f.splice(i,4*n,W.paintImageMaskXObjectRepeat),g.splice(i,4*n,[s,t,u,w])}else{n=Math.min(n,d);var x=[];for(o=0;n>o;o++){q=g[j+(o<<2)];var y=g[k+(o<<2)][0];x.push({data:y.data,width:y.width,height:y.height,transform:q})}
// Replace queue items.
f.splice(i,4*n,W.paintImageMaskXObjectGroup),g.splice(i,4*n,[x])}return i+1}),a(d,[W.save,W.transform,W.paintImageXObject,W.restore],function(a){var b=3,c=1e3,d=a.fnArray,e=a.argsArray,f=a.iCurr,g=f-3,h=f-2,i=f-1,j=f;if(0!==e[h][1]||0!==e[h][2])return j+1;for(
// Look for the quartets.
var k=e[i][0],l=e[h][0],m=e[h][3],n=g+4,o=d.length;o>n+3&&d[n]===W.save&&d[n+1]===W.transform&&d[n+2]===W.paintImageXObject&&d[n+3]===W.restore&&e[n+1][0]===l&&0===e[n+1][1]&&0===e[n+1][2]&&e[n+1][3]===m&&e[n+2][0]===k;)n+=4;
// At this point, i is the index of the first op past the last valid
// quartet.
var p=Math.min((n-g)/4,c);if(b>p)return n;for(var q=new Float32Array(2*p),r=h,s=0;p>s;s++,r+=4){var t=e[r];q[s<<1]=t[4],q[(s<<1)+1]=t[5]}
// Replace queue items.
var u=[k,l,m,q];return d.splice(g,4*p,W.paintImageXObjectRepeat),e.splice(g,4*p,u),g+1}),a(d,[W.beginText,W.setFont,W.setTextMatrix,W.showText,W.endText],function(a){for(var b=3,c=1e3,d=a.fnArray,e=a.argsArray,f=a.iCurr,g=f-4,h=f-3,i=f-2,j=f-1,k=f,l=e[h][0],m=e[h][1],n=g+5,o=d.length;o>n+4&&d[n]===W.beginText&&d[n+1]===W.setFont&&d[n+2]===W.setTextMatrix&&d[n+3]===W.showText&&d[n+4]===W.endText&&e[n+1][0]===l&&e[n+1][1]===m;)n+=5;
// At this point, i is the index of the first op past the last valid
// quintet.
var p=Math.min((n-g)/5,c);if(b>p)return n;
// If the preceding quintet is (<something>, setFont, setTextMatrix,
// showText, endText), include that as well. (E.g. <something> might be
// |dependency|.)
var q=g;g>=4&&d[g-4]===d[h]&&d[g-3]===d[i]&&d[g-2]===d[j]&&d[g-1]===d[k]&&e[g-4][0]===l&&e[g-4][1]===m&&(p++,q-=5);for(var r=q+4,s=1;p>s;s++)d.splice(r,3),e.splice(r,3),r+=2;return r+1}),c.prototype={optimize:function(a){for(var b,c=a.fnArray,e=a.argsArray,f={iCurr:0,fnArray:c,argsArray:e},g=0,h=c.length;h>g;)b=(b||d)[c[g]],"function"==typeof b?(// we found some handler
f.iCurr=g,
// state() returns the index of the first non-matching op (if we
// didn't match) or the first op past the modified ops (if we did
// match and replace).
g=b(f),b=void 0,// reset the state machine
h=f.fnArray.length):g++}},c}(),zb=[
// << Start unicode maps.
"Adobe-GB1-UCS2","Adobe-CNS1-UCS2","Adobe-Japan1-UCS2","Adobe-Korea1-UCS2",
// >> End unicode maps.
"78-EUC-H","78-EUC-V","78-H","78-RKSJ-H","78-RKSJ-V","78-V","78ms-RKSJ-H","78ms-RKSJ-V","83pv-RKSJ-H","90ms-RKSJ-H","90ms-RKSJ-V","90msp-RKSJ-H","90msp-RKSJ-V","90pv-RKSJ-H","90pv-RKSJ-V","Add-H","Add-RKSJ-H","Add-RKSJ-V","Add-V","Adobe-CNS1-0","Adobe-CNS1-1","Adobe-CNS1-2","Adobe-CNS1-3","Adobe-CNS1-4","Adobe-CNS1-5","Adobe-CNS1-6","Adobe-GB1-0","Adobe-GB1-1","Adobe-GB1-2","Adobe-GB1-3","Adobe-GB1-4","Adobe-GB1-5","Adobe-Japan1-0","Adobe-Japan1-1","Adobe-Japan1-2","Adobe-Japan1-3","Adobe-Japan1-4","Adobe-Japan1-5","Adobe-Japan1-6","Adobe-Korea1-0","Adobe-Korea1-1","Adobe-Korea1-2","B5-H","B5-V","B5pc-H","B5pc-V","CNS-EUC-H","CNS-EUC-V","CNS1-H","CNS1-V","CNS2-H","CNS2-V","ETHK-B5-H","ETHK-B5-V","ETen-B5-H","ETen-B5-V","ETenms-B5-H","ETenms-B5-V","EUC-H","EUC-V","Ext-H","Ext-RKSJ-H","Ext-RKSJ-V","Ext-V","GB-EUC-H","GB-EUC-V","GB-H","GB-V","GBK-EUC-H","GBK-EUC-V","GBK2K-H","GBK2K-V","GBKp-EUC-H","GBKp-EUC-V","GBT-EUC-H","GBT-EUC-V","GBT-H","GBT-V","GBTpc-EUC-H","GBTpc-EUC-V","GBpc-EUC-H","GBpc-EUC-V","H","HKdla-B5-H","HKdla-B5-V","HKdlb-B5-H","HKdlb-B5-V","HKgccs-B5-H","HKgccs-B5-V","HKm314-B5-H","HKm314-B5-V","HKm471-B5-H","HKm471-B5-V","HKscs-B5-H","HKscs-B5-V","Hankaku","Hiragana","KSC-EUC-H","KSC-EUC-V","KSC-H","KSC-Johab-H","KSC-Johab-V","KSC-V","KSCms-UHC-H","KSCms-UHC-HW-H","KSCms-UHC-HW-V","KSCms-UHC-V","KSCpc-EUC-H","KSCpc-EUC-V","Katakana","NWP-H","NWP-V","RKSJ-H","RKSJ-V","Roman","UniCNS-UCS2-H","UniCNS-UCS2-V","UniCNS-UTF16-H","UniCNS-UTF16-V","UniCNS-UTF32-H","UniCNS-UTF32-V","UniCNS-UTF8-H","UniCNS-UTF8-V","UniGB-UCS2-H","UniGB-UCS2-V","UniGB-UTF16-H","UniGB-UTF16-V","UniGB-UTF32-H","UniGB-UTF32-V","UniGB-UTF8-H","UniGB-UTF8-V","UniJIS-UCS2-H","UniJIS-UCS2-HW-H","UniJIS-UCS2-HW-V","UniJIS-UCS2-V","UniJIS-UTF16-H","UniJIS-UTF16-V","UniJIS-UTF32-H","UniJIS-UTF32-V","UniJIS-UTF8-H","UniJIS-UTF8-V","UniJIS2004-UTF16-H","UniJIS2004-UTF16-V","UniJIS2004-UTF32-H","UniJIS2004-UTF32-V","UniJIS2004-UTF8-H","UniJIS2004-UTF8-V","UniJISPro-UCS2-HW-V","UniJISPro-UCS2-V","UniJISPro-UTF8-V","UniJISX0213-UTF32-H","UniJISX0213-UTF32-V","UniJISX02132004-UTF32-H","UniJISX02132004-UTF32-V","UniKS-UCS2-H","UniKS-UCS2-V","UniKS-UTF16-H","UniKS-UTF16-V","UniKS-UTF32-H","UniKS-UTF32-V","UniKS-UTF8-H","UniKS-UTF8-V","V","WP-Symbol"],Ab=function(){function a(a){
// Codespace ranges are stored as follows:
// [[1BytePairs], [2BytePairs], [3BytePairs], [4BytePairs]]
// where nBytePairs are ranges e.g. [low1, high1, low2, high2, ...]
this.codespaceRanges=[[],[],[],[]],this.numCodespaceRanges=0,
// Map entries have one of two forms.
// - cid chars are 16-bit unsigned integers, stored as integers.
// - bf chars are variable-length byte sequences, stored as strings, with
//   one byte per character.
this._map=[],this.vertical=!1,this.useCMap=null,this.builtInCMap=a}return a.prototype={addCodespaceRange:function(a,b,c){this.codespaceRanges[a-1].push(b,c),this.numCodespaceRanges++},mapCidRange:function(a,b,c){for(;b>=a;)this._map[a++]=c++},mapBfRange:function(a,b,c){for(var d=c.length-1;b>=a;)this._map[a++]=c,
// Only the last byte has to be incremented.
c=c.substr(0,d)+String.fromCharCode(c.charCodeAt(d)+1)},mapBfRangeToArray:function(a,b,c){for(var d=0,e=c.length;b>=a&&e>d;)this._map[a]=c[d++],++a},
// This is used for both bf and cid chars.
mapOne:function(a,b){this._map[a]=b},lookup:function(a){return this._map[a]},contains:function(a){return void 0!==this._map[a]},forEach:function(a){
// Most maps have fewer than 65536 entries, and for those we use normal
// array iteration. But really sparse tables are possible -- e.g. with
// indices in the *billions*. For such tables we use for..in, which isn't
// ideal because it stringifies the indices for all present elements, but
// it does avoid iterating over every undefined entry.
var b,c=this._map,d=c.length;if(65536>=d)for(b=0;d>b;b++)void 0!==c[b]&&a(b,c[b]);else for(b in this._map)a(b,c[b])},charCodeOf:function(a){return this._map.indexOf(a)},getMap:function(){return this._map},readCharCode:function(a,b,c){
// 9.7.6.2 CMap Mapping
// The code length is at most 4.
for(var d=0,e=this.codespaceRanges,f=this.codespaceRanges.length,g=0;f>g;g++){d=(d<<8|a.charCodeAt(b+g))>>>0;for(var h=e[g],i=0,j=h.length;j>i;){var k=h[i++],l=h[i++];if(d>=k&&l>=d)return c.charcode=d,void(c.length=g+1)}}c.charcode=0,c.length=1}},a}(),Bb=function(){function a(a,b){Ab.call(this),this.vertical=a,this.addCodespaceRange(b,0,65535)}return ia.inherit(a,Ab,{}),a.prototype={addCodespaceRange:Ab.prototype.addCodespaceRange,mapCidRange:function(a,b,d){c("should not call mapCidRange")},mapBfRange:function(a,b,d){c("should not call mapBfRange")},mapBfRangeToArray:function(a,b,d){c("should not call mapBfRangeToArray")},mapOne:function(a,b){c("should not call mapCidOne")},lookup:function(a){return u(a)&&65535>=a?a:void 0},contains:function(a){return u(a)&&65535>=a},forEach:function(a){for(var b=0;65535>=b;b++)a(b,b)},charCodeOf:function(a){return u(a)&&65535>=a?a:-1},getMap:function(){for(var a=new Array(65536),b=0;65535>=b;b++)a[b]=b;return a},readCharCode:Ab.prototype.readCharCode},a}(),Cb=function(){function a(a){var b=PDFJS.disableWorker,d=new XMLHttpRequest;if(d.open("GET",a,!1),!b)try{d.responseType="arraybuffer",b="arraybuffer"!==d.responseType}catch(e){b=!0}if(b&&d.overrideMimeType&&d.overrideMimeType("text/plain; charset=x-user-defined"),d.send(null),(b?d.responseText:d.response)||c("Unable to get binary cMap at: "+a),b){var f=Array.prototype.map.call(d.responseText,function(a){return 255&a.charCodeAt(0)});return new Uint8Array(f)}return new Uint8Array(d.response)}function b(a,b){for(var c=0,d=0;b>=d;d++)c=c<<8|a[d];return c>>>0}function d(a,b){
// This code is hot. Special-case some common values to avoid creating an
// object with subarray().
// This code is hot. Special-case some common values to avoid creating an
// object with subarray().
return 1===b?String.fromCharCode(a[0],a[1]):3===b?String.fromCharCode(a[0],a[1],a[2],a[3]):String.fromCharCode.apply(null,a.subarray(0,b+1))}function f(a,b,c){for(var d=0,e=c;e>=0;e--)d+=a[e]+b[e],a[e]=255&d,d>>=8}function g(a,b){for(var c=1,d=b;d>=0&&c>0;d--)c+=a[d],a[d]=255&c,c>>=8}// ceil(MAX_NUM_SIZE * 7 / 8)
function h(a){this.buffer=a,this.pos=0,this.end=a.length,this.tmpBuf=new Uint8Array(l)}function i(i,j,l){var m=a(i),n=new h(m),o=n.readByte();j.vertical=!!(1&o);for(var p,q,r=null,s=new Uint8Array(k),t=new Uint8Array(k),u=new Uint8Array(k),v=new Uint8Array(k),w=new Uint8Array(k);(q=n.readByte())>=0;){var x=q>>5;if(7!==x){var y=!!(16&q),z=15&q;e(k>=z+1);var A,B=1,C=n.readNumber();switch(x){case 0:for(// codespacerange
n.readHex(s,z),n.readHexNumber(t,z),f(t,s,z),j.addCodespaceRange(z+1,b(s,z),b(t,z)),A=1;C>A;A++)g(t,z),n.readHexNumber(s,z),f(s,t,z),n.readHexNumber(t,z),f(t,s,z),j.addCodespaceRange(z+1,b(s,z),b(t,z));break;case 1:
// undefined range, skipping
for(// notdefrange
n.readHex(s,z),n.readHexNumber(t,z),f(t,s,z),p=n.readNumber(),A=1;C>A;A++)g(t,z),n.readHexNumber(s,z),f(s,t,z),n.readHexNumber(t,z),f(t,s,z),p=n.readNumber();break;case 2:for(// cidchar
n.readHex(u,z),p=n.readNumber(),j.mapOne(b(u,z),p),A=1;C>A;A++)g(u,z),y||(n.readHexNumber(w,z),f(u,w,z)),p=n.readSigned()+(p+1),j.mapOne(b(u,z),p);break;case 3:for(// cidrange
n.readHex(s,z),n.readHexNumber(t,z),f(t,s,z),p=n.readNumber(),j.mapCidRange(b(s,z),b(t,z),p),A=1;C>A;A++)g(t,z),y?s.set(t):(n.readHexNumber(s,z),f(s,t,z)),n.readHexNumber(t,z),f(t,s,z),p=n.readNumber(),j.mapCidRange(b(s,z),b(t,z),p);break;case 4:for(// bfchar
n.readHex(u,B),n.readHex(v,z),j.mapOne(b(u,B),d(v,z)),A=1;C>A;A++)g(u,B),y||(n.readHexNumber(w,B),f(u,w,B)),g(v,z),n.readHexSigned(w,z),f(v,w,z),j.mapOne(b(u,B),d(v,z));break;case 5:for(// bfrange
n.readHex(s,B),n.readHexNumber(t,B),f(t,s,B),n.readHex(v,z),j.mapBfRange(b(s,B),b(t,B),d(v,z)),A=1;C>A;A++)g(t,B),y?s.set(t):(n.readHexNumber(s,B),f(s,t,B)),n.readHexNumber(t,B),f(t,s,B),n.readHex(v,z),j.mapBfRange(b(s,B),b(t,B),d(v,z));break;default:c("Unknown type: "+x)}}else// metadata, e.g. comment or usecmap
switch(31&q){case 0:n.readString();// skipping comment
break;case 1:r=n.readString()}}return r&&l(r),j}function j(){}var k=16,l=19;return h.prototype={readByte:function(){return this.pos>=this.end?-1:this.buffer[this.pos++]},readNumber:function(){var a,b=0;do{var d=this.readByte();0>d&&c("unexpected EOF in bcmap"),a=!(128&d),b=b<<7|127&d}while(!a);return b},readSigned:function(){var a=this.readNumber();return 1&a?~(a>>>1):a>>>1},readHex:function(a,b){a.set(this.buffer.subarray(this.pos,this.pos+b+1)),this.pos+=b+1},readHexNumber:function(a,b){var d,e=this.tmpBuf,f=0;do{var g=this.readByte();0>g&&c("unexpected EOF in bcmap"),d=!(128&g),e[f++]=127&g}while(!d);for(var h=b,i=0,j=0;h>=0;){for(;8>j&&e.length>0;)i=e[--f]<<j|i,j+=7;a[h]=255&i,h--,i>>=8,j-=8}},readHexSigned:function(a,b){this.readHexNumber(a,b);for(var c=1&a[b]?255:0,d=0,e=0;b>=e;e++)d=(1&d)<<8|a[e],a[e]=d>>1^c},readString:function(){for(var a=this.readNumber(),b="",c=0;a>c;c++)b+=String.fromCharCode(this.readNumber());return b}},j.prototype={read:i},j}(),Db=function(){function a(a){for(var b=0,c=0;c<a.length;c++)b=b<<8|a.charCodeAt(c);return b>>>0}function d(a){w(a)||c("Malformed CMap: expected string.")}function f(a){u(a)||c("Malformed CMap: expected int.")}function g(b,c){for(;;){var e=c.getObj();if(O(e))break;if(y(e,"endbfchar"))return;d(e);var f=a(e);e=c.getObj(),
// TODO are /dstName used?
d(e);var g=e;b.mapOne(f,g)}}function h(b,e){for(;;){var f=e.getObj();if(O(f))break;if(y(f,"endbfrange"))return;d(f);var g=a(f);f=e.getObj(),d(f);var h=a(f);if(f=e.getObj(),u(f)||w(f)){var i=u(f)?String.fromCharCode(f):f;b.mapBfRange(g,h,i)}else{if(!y(f,"["))break;f=e.getObj();for(var j=[];!y(f,"]")&&!O(f);)j.push(f),f=e.getObj();b.mapBfRangeToArray(g,h,j)}}c("Invalid bf range.")}function i(b,c){for(;;){var e=c.getObj();if(O(e))break;if(y(e,"endcidchar"))return;d(e);var g=a(e);e=c.getObj(),f(e);var h=e;b.mapOne(g,h)}}function j(b,c){for(;;){var e=c.getObj();if(O(e))break;if(y(e,"endcidrange"))return;d(e);var g=a(e);e=c.getObj(),d(e);var h=a(e);e=c.getObj(),f(e);var i=e;b.mapCidRange(g,h,i)}}function k(b,d){for(;;){var e=d.getObj();if(O(e))break;if(y(e,"endcodespacerange"))return;if(!w(e))break;var f=a(e);if(e=d.getObj(),!w(e))break;var g=a(e);b.addCodespaceRange(e.length,f,g)}c("Invalid codespace range.")}function l(a,b){var c=b.getObj();u(c)&&(a.vertical=!!c)}function m(a,b,c,d){var e,f;a:for(;;){var m=b.getObj();if(O(m))break;if(x(m))"WMode"===m.name&&l(a,b),e=m;else if(y(m))switch(m.cmd){case"endcmap":break a;case"usecmap":x(e)&&(f=e.name);break;case"begincodespacerange":k(a,b);break;case"beginbfchar":g(a,b);break;case"begincidchar":i(a,b);break;case"beginbfrange":h(a,b);break;case"begincidrange":j(a,b)}}!d&&f&&(
// Load the usecmap definition from the file only if there wasn't one
// specified.
d=f),d&&n(a,c,d)}function n(a,b,c){
// If there aren't any code space ranges defined clone all the parent ones
// into this cMap.
if(a.useCMap=p(c,b),0===a.numCodespaceRanges){for(var d=a.useCMap.codespaceRanges,e=0;e<d.length;e++)a.codespaceRanges[e]=d[e].slice();a.numCodespaceRanges=a.useCMap.numCodespaceRanges}
// Merge the map into the current one, making sure not to override
// any previously defined entries.
a.useCMap.forEach(function(b,c){a.contains(b)||a.mapOne(b,a.useCMap.lookup(b))})}function o(a,b){var c=b.url+a+".bcmap",d=new Ab(!0);return(new Cb).read(c,d,function(a){n(d,b,a)}),d}function p(a,b){if("Identity-H"===a)return new Bb(!1,2);if("Identity-V"===a)return new Bb(!0,2);if(-1===zb.indexOf(a)&&c("Unknown cMap name: "+a),e(b,"built-in cMap parameters are not provided"),b.packed)return o(a,b);var d=new XMLHttpRequest,f=b.url+a;d.open("GET",f,!1),d.send(null),d.responseText||c("Unable to get cMap at: "+f);var g=new Ab(!0),h=new Ac(new Hc(d.responseText));return m(g,h,b,null),g}return{create:function(a,d,e){if(x(a))return p(a.name,d);if(B(a)){var f=new Ab,g=new Ac(a);try{m(f,g,d,e)}catch(h){b("Invalid CMap data. "+h)}return f}c("Encoding required.")}}}(),Eb=57344,Fb=63743,Gb=!1,Hb=1e3,Ib=!1,Jb=!1,Kb={FixedPitch:1,Serif:2,Symbolic:4,Script:8,Nonsymbolic:32,Italic:64,AllCap:65536,SmallCap:131072,ForceBold:262144},Lb={ExpertEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],MacExpertEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","centoldstyle","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","","threequartersemdash","","questionsmall","","","","","Ethsmall","","","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","","","","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hypheninferior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","asuperior","centsuperior","","","","","Aacutesmall","Agravesmall","Acircumflexsmall","Adieresissmall","Atildesmall","Aringsmall","Ccedillasmall","Eacutesmall","Egravesmall","Ecircumflexsmall","Edieresissmall","Iacutesmall","Igravesmall","Icircumflexsmall","Idieresissmall","Ntildesmall","Oacutesmall","Ogravesmall","Ocircumflexsmall","Odieresissmall","Otildesmall","Uacutesmall","Ugravesmall","Ucircumflexsmall","Udieresissmall","","eightsuperior","fourinferior","threeinferior","sixinferior","eightinferior","seveninferior","Scaronsmall","","centinferior","twoinferior","","Dieresissmall","","Caronsmall","osuperior","fiveinferior","","commainferior","periodinferior","Yacutesmall","","dollarinferior","","Thornsmall","","nineinferior","zeroinferior","Zcaronsmall","AEsmall","Oslashsmall","questiondownsmall","oneinferior","Lslashsmall","","","","","","","Cedillasmall","","","","","","OEsmall","figuredash","hyphensuperior","","","","","exclamdownsmall","","Ydieresissmall","","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","ninesuperior","zerosuperior","","esuperior","rsuperior","tsuperior","","","isuperior","ssuperior","dsuperior","","","","","","lsuperior","Ogoneksmall","Brevesmall","Macronsmall","bsuperior","nsuperior","msuperior","commasuperior","periodsuperior","Dotaccentsmall","Ringsmall"],MacRomanEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","space","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron"],StandardEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],WinAnsiEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","bullet","Euro","bullet","quotesinglbase","florin","quotedblbase","ellipsis","dagger","daggerdbl","circumflex","perthousand","Scaron","guilsinglleft","OE","bullet","Zcaron","bullet","bullet","quoteleft","quoteright","quotedblleft","quotedblright","bullet","endash","emdash","tilde","trademark","scaron","guilsinglright","oe","bullet","zcaron","Ydieresis","space","exclamdown","cent","sterling","currency","yen","brokenbar","section","dieresis","copyright","ordfeminine","guillemotleft","logicalnot","hyphen","registered","macron","degree","plusminus","twosuperior","threesuperior","acute","mu","paragraph","periodcentered","cedilla","onesuperior","ordmasculine","guillemotright","onequarter","onehalf","threequarters","questiondown","Agrave","Aacute","Acircumflex","Atilde","Adieresis","Aring","AE","Ccedilla","Egrave","Eacute","Ecircumflex","Edieresis","Igrave","Iacute","Icircumflex","Idieresis","Eth","Ntilde","Ograve","Oacute","Ocircumflex","Otilde","Odieresis","multiply","Oslash","Ugrave","Uacute","Ucircumflex","Udieresis","Yacute","Thorn","germandbls","agrave","aacute","acircumflex","atilde","adieresis","aring","ae","ccedilla","egrave","eacute","ecircumflex","edieresis","igrave","iacute","icircumflex","idieresis","eth","ntilde","ograve","oacute","ocircumflex","otilde","odieresis","divide","oslash","ugrave","uacute","ucircumflex","udieresis","yacute","thorn","ydieresis"],SymbolSetEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","universal","numbersign","existential","percent","ampersand","suchthat","parenleft","parenright","asteriskmath","plus","comma","minus","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","congruent","Alpha","Beta","Chi","Delta","Epsilon","Phi","Gamma","Eta","Iota","theta1","Kappa","Lambda","Mu","Nu","Omicron","Pi","Theta","Rho","Sigma","Tau","Upsilon","sigma1","Omega","Xi","Psi","Zeta","bracketleft","therefore","bracketright","perpendicular","underscore","radicalex","alpha","beta","chi","delta","epsilon","phi","gamma","eta","iota","phi1","kappa","lambda","mu","nu","omicron","pi","theta","rho","sigma","tau","upsilon","omega1","omega","xi","psi","zeta","braceleft","bar","braceright","similar","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Euro","Upsilon1","minute","lessequal","fraction","infinity","florin","club","diamond","heart","spade","arrowboth","arrowleft","arrowup","arrowright","arrowdown","degree","plusminus","second","greaterequal","multiply","proportional","partialdiff","bullet","divide","notequal","equivalence","approxequal","ellipsis","arrowvertex","arrowhorizex","carriagereturn","aleph","Ifraktur","Rfraktur","weierstrass","circlemultiply","circleplus","emptyset","intersection","union","propersuperset","reflexsuperset","notsubset","propersubset","reflexsubset","element","notelement","angle","gradient","registerserif","copyrightserif","trademarkserif","product","radical","dotmath","logicalnot","logicaland","logicalor","arrowdblboth","arrowdblleft","arrowdblup","arrowdblright","arrowdbldown","lozenge","angleleft","registersans","copyrightsans","trademarksans","summation","parenlefttp","parenleftex","parenleftbt","bracketlefttp","bracketleftex","bracketleftbt","bracelefttp","braceleftmid","braceleftbt","braceex","","angleright","integral","integraltp","integralex","integralbt","parenrighttp","parenrightex","parenrightbt","bracketrighttp","bracketrightex","bracketrightbt","bracerighttp","bracerightmid","bracerightbt"],ZapfDingbatsEncoding:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","a1","a2","a202","a3","a4","a5","a119","a118","a117","a11","a12","a13","a14","a15","a16","a105","a17","a18","a19","a20","a21","a22","a23","a24","a25","a26","a27","a28","a6","a7","a8","a9","a10","a29","a30","a31","a32","a33","a34","a35","a36","a37","a38","a39","a40","a41","a42","a43","a44","a45","a46","a47","a48","a49","a50","a51","a52","a53","a54","a55","a56","a57","a58","a59","a60","a61","a62","a63","a64","a65","a66","a67","a68","a69","a70","a71","a72","a73","a74","a203","a75","a204","a76","a77","a78","a79","a81","a82","a83","a84","a97","a98","a99","a100","","a89","a90","a93","a94","a91","a92","a205","a85","a206","a86","a87","a88","a95","a96","","","","","","","","","","","","","","","","","","","","a101","a102","a103","a104","a106","a107","a108","a112","a111","a110","a109","a120","a121","a122","a123","a124","a125","a126","a127","a128","a129","a130","a131","a132","a133","a134","a135","a136","a137","a138","a139","a140","a141","a142","a143","a144","a145","a146","a147","a148","a149","a150","a151","a152","a153","a154","a155","a156","a157","a158","a159","a160","a161","a163","a164","a196","a165","a192","a166","a167","a168","a169","a170","a171","a172","a173","a162","a174","a175","a176","a177","a178","a179","a193","a180","a199","a181","a200","a182","","a201","a183","a184","a197","a185","a194","a198","a186","a195","a187","a188","a189","a190","a191"]},Mb={ArialNarrow:"Helvetica","ArialNarrow-Bold":"Helvetica-Bold","ArialNarrow-BoldItalic":"Helvetica-BoldOblique","ArialNarrow-Italic":"Helvetica-Oblique",ArialBlack:"Helvetica","ArialBlack-Bold":"Helvetica-Bold","ArialBlack-BoldItalic":"Helvetica-BoldOblique","ArialBlack-Italic":"Helvetica-Oblique",Arial:"Helvetica","Arial-Bold":"Helvetica-Bold","Arial-BoldItalic":"Helvetica-BoldOblique","Arial-Italic":"Helvetica-Oblique","Arial-BoldItalicMT":"Helvetica-BoldOblique","Arial-BoldMT":"Helvetica-Bold","Arial-ItalicMT":"Helvetica-Oblique",ArialMT:"Helvetica","Courier-Bold":"Courier-Bold","Courier-BoldItalic":"Courier-BoldOblique","Courier-Italic":"Courier-Oblique",CourierNew:"Courier","CourierNew-Bold":"Courier-Bold","CourierNew-BoldItalic":"Courier-BoldOblique","CourierNew-Italic":"Courier-Oblique","CourierNewPS-BoldItalicMT":"Courier-BoldOblique","CourierNewPS-BoldMT":"Courier-Bold","CourierNewPS-ItalicMT":"Courier-Oblique",CourierNewPSMT:"Courier",Helvetica:"Helvetica","Helvetica-Bold":"Helvetica-Bold","Helvetica-BoldItalic":"Helvetica-BoldOblique","Helvetica-BoldOblique":"Helvetica-BoldOblique","Helvetica-Italic":"Helvetica-Oblique","Helvetica-Oblique":"Helvetica-Oblique","Symbol-Bold":"Symbol","Symbol-BoldItalic":"Symbol","Symbol-Italic":"Symbol",TimesNewRoman:"Times-Roman","TimesNewRoman-Bold":"Times-Bold","TimesNewRoman-BoldItalic":"Times-BoldItalic","TimesNewRoman-Italic":"Times-Italic",TimesNewRomanPS:"Times-Roman","TimesNewRomanPS-Bold":"Times-Bold","TimesNewRomanPS-BoldItalic":"Times-BoldItalic","TimesNewRomanPS-BoldItalicMT":"Times-BoldItalic","TimesNewRomanPS-BoldMT":"Times-Bold","TimesNewRomanPS-Italic":"Times-Italic","TimesNewRomanPS-ItalicMT":"Times-Italic",TimesNewRomanPSMT:"Times-Roman","TimesNewRomanPSMT-Bold":"Times-Bold","TimesNewRomanPSMT-BoldItalic":"Times-BoldItalic","TimesNewRomanPSMT-Italic":"Times-Italic"},Nb={CenturyGothic:"Helvetica","CenturyGothic-Bold":"Helvetica-Bold","CenturyGothic-BoldItalic":"Helvetica-BoldOblique","CenturyGothic-Italic":"Helvetica-Oblique",ComicSansMS:"Comic Sans MS","ComicSansMS-Bold":"Comic Sans MS-Bold","ComicSansMS-BoldItalic":"Comic Sans MS-BoldItalic","ComicSansMS-Italic":"Comic Sans MS-Italic",LucidaConsole:"Courier","LucidaConsole-Bold":"Courier-Bold","LucidaConsole-BoldItalic":"Courier-BoldOblique","LucidaConsole-Italic":"Courier-Oblique","MS-Gothic":"MS Gothic","MS-Gothic-Bold":"MS Gothic-Bold","MS-Gothic-BoldItalic":"MS Gothic-BoldItalic","MS-Gothic-Italic":"MS Gothic-Italic","MS-Mincho":"MS Mincho","MS-Mincho-Bold":"MS Mincho-Bold","MS-Mincho-BoldItalic":"MS Mincho-BoldItalic","MS-Mincho-Italic":"MS Mincho-Italic","MS-PGothic":"MS PGothic","MS-PGothic-Bold":"MS PGothic-Bold","MS-PGothic-BoldItalic":"MS PGothic-BoldItalic","MS-PGothic-Italic":"MS PGothic-Italic","MS-PMincho":"MS PMincho","MS-PMincho-Bold":"MS PMincho-Bold","MS-PMincho-BoldItalic":"MS PMincho-BoldItalic","MS-PMincho-Italic":"MS PMincho-Italic",Wingdings:"ZapfDingbats"},Ob={"Adobe Jenson":!0,"Adobe Text":!0,Albertus:!0,Aldus:!0,Alexandria:!0,Algerian:!0,"American Typewriter":!0,Antiqua:!0,Apex:!0,Arno:!0,Aster:!0,Aurora:!0,Baskerville:!0,Bell:!0,Bembo:!0,"Bembo Schoolbook":!0,Benguiat:!0,"Berkeley Old Style":!0,"Bernhard Modern":!0,"Berthold City":!0,Bodoni:!0,"Bauer Bodoni":!0,"Book Antiqua":!0,Bookman:!0,"Bordeaux Roman":!0,"Californian FB":!0,Calisto:!0,Calvert:!0,Capitals:!0,Cambria:!0,Cartier:!0,Caslon:!0,Catull:!0,Centaur:!0,"Century Old Style":!0,"Century Schoolbook":!0,Chaparral:!0,"Charis SIL":!0,Cheltenham:!0,"Cholla Slab":!0,Clarendon:!0,Clearface:!0,Cochin:!0,Colonna:!0,"Computer Modern":!0,"Concrete Roman":!0,Constantia:!0,"Cooper Black":!0,Corona:!0,Ecotype:!0,Egyptienne:!0,Elephant:!0,Excelsior:!0,Fairfield:!0,"FF Scala":!0,Folkard:!0,Footlight:!0,FreeSerif:!0,"Friz Quadrata":!0,Garamond:!0,Gentium:!0,Georgia:!0,Gloucester:!0,"Goudy Old Style":!0,"Goudy Schoolbook":!0,"Goudy Pro Font":!0,Granjon:!0,"Guardian Egyptian":!0,Heather:!0,Hercules:!0,"High Tower Text":!0,Hiroshige:!0,"Hoefler Text":!0,"Humana Serif":!0,Imprint:!0,"Ionic No. 5":!0,Janson:!0,Joanna:!0,Korinna:!0,Lexicon:!0,"Liberation Serif":!0,"Linux Libertine":!0,Literaturnaya:!0,Lucida:!0,"Lucida Bright":!0,Melior:!0,Memphis:!0,Miller:!0,Minion:!0,Modern:!0,"Mona Lisa":!0,"Mrs Eaves":!0,"MS Serif":!0,"Museo Slab":!0,"New York":!0,"Nimbus Roman":!0,"NPS Rawlinson Roadway":!0,Palatino:!0,Perpetua:!0,Plantin:!0,"Plantin Schoolbook":!0,Playbill:!0,"Poor Richard":!0,"Rawlinson Roadway":!0,Renault:!0,Requiem:!0,Rockwell:!0,Roman:!0,"Rotis Serif":!0,Sabon:!0,Scala:!0,Seagull:!0,Sistina:!0,Souvenir:!0,STIX:!0,"Stone Informal":!0,"Stone Serif":!0,Sylfaen:!0,Times:!0,Trajan:!0,"Trinité":!0,"Trump Mediaeval":!0,Utopia:!0,"Vale Type":!0,"Bitstream Vera":!0,"Vera Serif":!0,Versailles:!0,Wanted:!0,Weiss:!0,"Wide Latin":!0,Windsor:!0,XITS:!0},Pb={Dingbats:!0,Symbol:!0,ZapfDingbats:!0},Qb={2:10,3:32,4:33,5:34,6:35,7:36,8:37,9:38,10:39,11:40,12:41,13:42,14:43,15:44,16:45,17:46,18:47,19:48,20:49,21:50,22:51,23:52,24:53,25:54,26:55,27:56,28:57,29:58,30:894,31:60,32:61,33:62,34:63,35:64,36:65,37:66,38:67,39:68,40:69,41:70,42:71,43:72,44:73,45:74,46:75,47:76,48:77,49:78,50:79,51:80,52:81,53:82,54:83,55:84,56:85,57:86,58:87,59:88,60:89,61:90,62:91,63:92,64:93,65:94,66:95,67:96,68:97,69:98,70:99,71:100,72:101,73:102,74:103,75:104,76:105,77:106,78:107,79:108,80:109,81:110,82:111,83:112,84:113,85:114,86:115,87:116,88:117,89:118,90:119,91:120,92:121,93:122,94:123,95:124,96:125,97:126,98:196,99:197,100:199,101:201,102:209,103:214,104:220,105:225,106:224,107:226,108:228,109:227,110:229,111:231,112:233,113:232,114:234,115:235,116:237,117:236,118:238,119:239,120:241,121:243,122:242,123:244,124:246,125:245,126:250,127:249,128:251,129:252,130:8224,131:176,132:162,133:163,134:167,135:8226,136:182,137:223,138:174,139:169,140:8482,141:180,142:168,143:8800,144:198,145:216,146:8734,147:177,148:8804,149:8805,150:165,151:181,152:8706,153:8721,154:8719,156:8747,157:170,158:186,159:8486,160:230,161:248,162:191,163:161,164:172,165:8730,166:402,167:8776,168:8710,169:171,170:187,171:8230,210:218,223:711,224:321,225:322,227:353,229:382,234:253,252:263,253:268,254:269,258:258,260:260,261:261,265:280,266:281,268:283,269:313,275:323,276:324,278:328,284:345,285:346,286:347,292:367,295:377,296:378,298:380,305:963,306:964,307:966,308:8215,309:8252,310:8319,311:8359,312:8592,313:8593,337:9552,493:1039,494:1040,705:1524,706:8362,710:64288,711:64298,759:1617,761:1776,763:1778,775:1652,777:1764,778:1780,779:1781,780:1782,782:771,783:64726,786:8363,788:8532,790:768,791:769,792:768,795:803,797:64336,798:64337,799:64342,800:64343,801:64344,802:64345,803:64362,804:64363,805:64364,2424:7821,2425:7822,2426:7823,2427:7824,2428:7825,2429:7826,2430:7827,2433:7682,2678:8045,2679:8046,2830:1552,2838:686,2840:751,2842:753,2843:754,2844:755,2846:757,2856:767,2857:848,2858:849,2862:853,2863:854,2864:855,2865:861,2866:862,2906:7460,2908:7462,2909:7463,2910:7464,2912:7466,2913:7467,2914:7468,2916:7470,2917:7471,2918:7472,2920:7474,2921:7475,2922:7476,2924:7478,2925:7479,2926:7480,2928:7482,2929:7483,2930:7484,2932:7486,2933:7487,2934:7488,2936:7490,2937:7491,2938:7492,2940:7494,2941:7495,2942:7496,2944:7498,2946:7500,2948:7502,2950:7504,2951:7505,2952:7506,2954:7508,2955:7509,2956:7510,2958:7512,2959:7513,2960:7514,2962:7516,2963:7517,2964:7518,2966:7520,2967:7521,2968:7522,2970:7524,2971:7525,2972:7526,2974:7528,2975:7529,2976:7530,2978:1537,2979:1538,2980:1539,2982:1549,2983:1551,2984:1552,2986:1554,2987:1555,2988:1556,2990:1623,2991:1624,2995:1775,2999:1791,3002:64290,3003:64291,3004:64292,3006:64294,3007:64295,3008:64296,3011:1900,3014:8223,3015:8244,3017:7532,3018:7533,3019:7534,3075:7590,3076:7591,3079:7594,3080:7595,3083:7598,3084:7599,3087:7602,3088:7603,3091:7606,3092:7607,3095:7610,3096:7611,3099:7614,3100:7615,3103:7618,3104:7619,3107:8337,3108:8338,3116:1884,3119:1885,3120:1885,3123:1886,3124:1886,3127:1887,3128:1887,3131:1888,3132:1888,3135:1889,3136:1889,3139:1890,3140:1890,3143:1891,3144:1891,3147:1892,3148:1892,3153:580,3154:581,3157:584,3158:585,3161:588,3162:589,3165:891,3166:892,3169:1274,3170:1275,3173:1278,3174:1279,3181:7622,3182:7623,3282:11799,3316:578,3379:42785,3393:1159,3416:8377},Rb={63721:169,// copyrightsans (0xF8E9) => copyright
63193:169,// copyrightserif (0xF6D9) => copyright
63720:174,// registersans (0xF8E8) => registered
63194:174,// registerserif (0xF6DA) => registered
63722:8482,// trademarksans (0xF8EA) => trademark
63195:8482,// trademarkserif (0xF6DB) => trademark
63729:9127,// bracelefttp (0xF8F1)
63730:9128,// braceleftmid (0xF8F2)
63731:9129,// braceleftbt (0xF8F3)
63740:9131,// bracerighttp (0xF8FC)
63741:9132,// bracerightmid (0xF8FD)
63742:9133,// bracerightbt (0xF8FE)
63726:9121,// bracketlefttp (0xF8EE)
63727:9122,// bracketleftex (0xF8EF)
63728:9123,// bracketleftbt (0xF8F0)
63737:9124,// bracketrighttp (0xF8F9)
63738:9125,// bracketrightex (0xF8FA)
63739:9126,// bracketrightbt (0xF8FB)
63723:9115,// parenlefttp (0xF8EB)
63724:9116,// parenleftex (0xF8EC)
63725:9117,// parenleftbt (0xF8ED)
63734:9118,// parenrighttp (0xF8F6)
63735:9119,// parenrightex (0xF8F7)
63736:9120},Sb=[{begin:0,end:127},// Basic Latin
{begin:128,end:255},// Latin-1 Supplement
{begin:256,end:383},// Latin Extended-A
{begin:384,end:591},// Latin Extended-B
{begin:592,end:687},// IPA Extensions
{begin:688,end:767},// Spacing Modifier Letters
{begin:768,end:879},// Combining Diacritical Marks
{begin:880,end:1023},// Greek and Coptic
{begin:11392,end:11519},// Coptic
{begin:1024,end:1279},// Cyrillic
{begin:1328,end:1423},// Armenian
{begin:1424,end:1535},// Hebrew
{begin:42240,end:42559},// Vai
{begin:1536,end:1791},// Arabic
{begin:1984,end:2047},// NKo
{begin:2304,end:2431},// Devanagari
{begin:2432,end:2559},// Bengali
{begin:2560,end:2687},// Gurmukhi
{begin:2688,end:2815},// Gujarati
{begin:2816,end:2943},// Oriya
{begin:2944,end:3071},// Tamil
{begin:3072,end:3199},// Telugu
{begin:3200,end:3327},// Kannada
{begin:3328,end:3455},// Malayalam
{begin:3584,end:3711},// Thai
{begin:3712,end:3839},// Lao
{begin:4256,end:4351},// Georgian
{begin:6912,end:7039},// Balinese
{begin:4352,end:4607},// Hangul Jamo
{begin:7680,end:7935},// Latin Extended Additional
{begin:7936,end:8191},// Greek Extended
{begin:8192,end:8303},// General Punctuation
{begin:8304,end:8351},// Superscripts And Subscripts
{begin:8352,end:8399},// Currency Symbol
{begin:8400,end:8447},// Combining Diacritical Marks For Symbols
{begin:8448,end:8527},// Letterlike Symbols
{begin:8528,end:8591},// Number Forms
{begin:8592,end:8703},// Arrows
{begin:8704,end:8959},// Mathematical Operators
{begin:8960,end:9215},// Miscellaneous Technical
{begin:9216,end:9279},// Control Pictures
{begin:9280,end:9311},// Optical Character Recognition
{begin:9312,end:9471},// Enclosed Alphanumerics
{begin:9472,end:9599},// Box Drawing
{begin:9600,end:9631},// Block Elements
{begin:9632,end:9727},// Geometric Shapes
{begin:9728,end:9983},// Miscellaneous Symbols
{begin:9984,end:10175},// Dingbats
{begin:12288,end:12351},// CJK Symbols And Punctuation
{begin:12352,end:12447},// Hiragana
{begin:12448,end:12543},// Katakana
{begin:12544,end:12591},// Bopomofo
{begin:12592,end:12687},// Hangul Compatibility Jamo
{begin:43072,end:43135},// Phags-pa
{begin:12800,end:13055},// Enclosed CJK Letters And Months
{begin:13056,end:13311},// CJK Compatibility
{begin:44032,end:55215},// Hangul Syllables
{begin:55296,end:57343},// Non-Plane 0 *
{begin:67840,end:67871},// Phoenicia
{begin:19968,end:40959},// CJK Unified Ideographs
{begin:57344,end:63743},// Private Use Area (plane 0)
{begin:12736,end:12783},// CJK Strokes
{begin:64256,end:64335},// Alphabetic Presentation Forms
{begin:64336,end:65023},// Arabic Presentation Forms-A
{begin:65056,end:65071},// Combining Half Marks
{begin:65040,end:65055},// Vertical Forms
{begin:65104,end:65135},// Small Form Variants
{begin:65136,end:65279},// Arabic Presentation Forms-B
{begin:65280,end:65519},// Halfwidth And Fullwidth Forms
{begin:65520,end:65535},// Specials
{begin:3840,end:4095},// Tibetan
{begin:1792,end:1871},// Syriac
{begin:1920,end:1983},// Thaana
{begin:3456,end:3583},// Sinhala
{begin:4096,end:4255},// Myanmar
{begin:4608,end:4991},// Ethiopic
{begin:5024,end:5119},// Cherokee
{begin:5120,end:5759},// Unified Canadian Aboriginal Syllabics
{begin:5760,end:5791},// Ogham
{begin:5792,end:5887},// Runic
{begin:6016,end:6143},// Khmer
{begin:6144,end:6319},// Mongolian
{begin:10240,end:10495},// Braille Patterns
{begin:40960,end:42127},// Yi Syllables
{begin:5888,end:5919},// Tagalog
{begin:66304,end:66351},// Old Italic
{begin:66352,end:66383},// Gothic
{begin:66560,end:66639},// Deseret
{begin:118784,end:119039},// Byzantine Musical Symbols
{begin:119808,end:120831},// Mathematical Alphanumeric Symbols
{begin:1044480,end:1048573},// Private Use (plane 15)
{begin:65024,end:65039},// Variation Selectors
{begin:917504,end:917631},// Tags
{begin:6400,end:6479},// Limbu
{begin:6480,end:6527},// Tai Le
{begin:6528,end:6623},// New Tai Lue
{begin:6656,end:6687},// Buginese
{begin:11264,end:11359},// Glagolitic
{begin:11568,end:11647},// Tifinagh
{begin:19904,end:19967},// Yijing Hexagram Symbols
{begin:43008,end:43055},// Syloti Nagri
{begin:65536,end:65663},// Linear B Syllabary
{begin:65856,end:65935},// Ancient Greek Numbers
{begin:66432,end:66463},// Ugaritic
{begin:66464,end:66527},// Old Persian
{begin:66640,end:66687},// Shavian
{begin:66688,end:66735},// Osmanya
{begin:67584,end:67647},// Cypriot Syllabary
{begin:68096,end:68191},// Kharoshthi
{begin:119552,end:119647},// Tai Xuan Jing Symbols
{begin:73728,end:74751},// Cuneiform
{begin:119648,end:119679},// Counting Rod Numerals
{begin:7040,end:7103},// Sundanese
{begin:7168,end:7247},// Lepcha
{begin:7248,end:7295},// Ol Chiki
{begin:43136,end:43231},// Saurashtra
{begin:43264,end:43311},// Kayah Li
{begin:43312,end:43359},// Rejang
{begin:43520,end:43615},// Cham
{begin:65936,end:65999},// Ancient Symbols
{begin:66e3,end:66047},// Phaistos Disc
{begin:66208,end:66271},// Carian
{begin:127024,end:127135}],Tb=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"],Ub={"¨":" ̈","¯":" ̄","´":" ́","µ":"μ","¸":" ̧","Ĳ":"IJ","ĳ":"ij","Ŀ":"L·","ŀ":"l·","ŉ":"ʼn","ſ":"s","Ǆ":"DŽ","ǅ":"Dž","ǆ":"dž","Ǉ":"LJ","ǈ":"Lj","ǉ":"lj","Ǌ":"NJ","ǋ":"Nj","ǌ":"nj","Ǳ":"DZ","ǲ":"Dz","ǳ":"dz","˘":" ̆","˙":" ̇","˚":" ̊","˛":" ̨","˜":" ̃","˝":" ̋","ͺ":" ͅ","΄":" ́","ϐ":"β","ϑ":"θ","ϒ":"Υ","ϕ":"φ","ϖ":"π","ϰ":"κ","ϱ":"ρ","ϲ":"ς","ϴ":"Θ","ϵ":"ε","Ϲ":"Σ","և":"եւ","ٵ":"اٴ","ٶ":"وٴ","ٷ":"ۇٴ","ٸ":"يٴ","ำ":"ํา","ຳ":"ໍາ","ໜ":"ຫນ","ໝ":"ຫມ","ཷ":"ྲཱྀ","ཹ":"ླཱྀ","ẚ":"aʾ","᾽":" ̓","᾿":" ̓","῀":" ͂","῾":" ̔"," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" "," ":" ","‗":" ̳","․":".","‥":"..","…":"...","″":"′′","‴":"′′′","‶":"‵‵","‷":"‵‵‵","‼":"!!","‾":" ̅","⁇":"??","⁈":"?!","⁉":"!?","⁗":"′′′′"," ":" ","₨":"Rs","℀":"a/c","℁":"a/s","℃":"°C","℅":"c/o","℆":"c/u","ℇ":"Ɛ","℉":"°F","№":"No","℡":"TEL","ℵ":"א","ℶ":"ב","ℷ":"ג","ℸ":"ד","℻":"FAX","Ⅰ":"I","Ⅱ":"II","Ⅲ":"III","Ⅳ":"IV","Ⅴ":"V","Ⅵ":"VI","Ⅶ":"VII","Ⅷ":"VIII","Ⅸ":"IX","Ⅹ":"X","Ⅺ":"XI","Ⅻ":"XII","Ⅼ":"L","Ⅽ":"C","Ⅾ":"D","Ⅿ":"M","ⅰ":"i","ⅱ":"ii","ⅲ":"iii","ⅳ":"iv","ⅴ":"v","ⅵ":"vi","ⅶ":"vii","ⅷ":"viii","ⅸ":"ix","ⅹ":"x","ⅺ":"xi","ⅻ":"xii","ⅼ":"l","ⅽ":"c","ⅾ":"d","ⅿ":"m","∬":"∫∫","∭":"∫∫∫","∯":"∮∮","∰":"∮∮∮","⑴":"(1)","⑵":"(2)","⑶":"(3)","⑷":"(4)","⑸":"(5)","⑹":"(6)","⑺":"(7)","⑻":"(8)","⑼":"(9)","⑽":"(10)","⑾":"(11)","⑿":"(12)","⒀":"(13)","⒁":"(14)","⒂":"(15)","⒃":"(16)","⒄":"(17)","⒅":"(18)","⒆":"(19)","⒇":"(20)","⒈":"1.","⒉":"2.","⒊":"3.","⒋":"4.","⒌":"5.","⒍":"6.","⒎":"7.","⒏":"8.","⒐":"9.","⒑":"10.","⒒":"11.","⒓":"12.","⒔":"13.","⒕":"14.","⒖":"15.","⒗":"16.","⒘":"17.","⒙":"18.","⒚":"19.","⒛":"20.","⒜":"(a)","⒝":"(b)","⒞":"(c)","⒟":"(d)","⒠":"(e)","⒡":"(f)","⒢":"(g)","⒣":"(h)","⒤":"(i)","⒥":"(j)","⒦":"(k)","⒧":"(l)","⒨":"(m)","⒩":"(n)","⒪":"(o)","⒫":"(p)","⒬":"(q)","⒭":"(r)","⒮":"(s)","⒯":"(t)","⒰":"(u)","⒱":"(v)","⒲":"(w)","⒳":"(x)","⒴":"(y)","⒵":"(z)","⨌":"∫∫∫∫","⩴":"::=","⩵":"==","⩶":"===","⺟":"母","⻳":"龟","⼀":"一","⼁":"丨","⼂":"丶","⼃":"丿","⼄":"乙","⼅":"亅","⼆":"二","⼇":"亠","⼈":"人","⼉":"儿","⼊":"入","⼋":"八","⼌":"冂","⼍":"冖","⼎":"冫","⼏":"几","⼐":"凵","⼑":"刀","⼒":"力","⼓":"勹","⼔":"匕","⼕":"匚","⼖":"匸","⼗":"十","⼘":"卜","⼙":"卩","⼚":"厂","⼛":"厶","⼜":"又","⼝":"口","⼞":"囗","⼟":"土","⼠":"士","⼡":"夂","⼢":"夊","⼣":"夕","⼤":"大","⼥":"女","⼦":"子","⼧":"宀","⼨":"寸","⼩":"小","⼪":"尢","⼫":"尸","⼬":"屮","⼭":"山","⼮":"巛","⼯":"工","⼰":"己","⼱":"巾","⼲":"干","⼳":"幺","⼴":"广","⼵":"廴","⼶":"廾","⼷":"弋","⼸":"弓","⼹":"彐","⼺":"彡","⼻":"彳","⼼":"心","⼽":"戈","⼾":"戶","⼿":"手","⽀":"支","⽁":"攴","⽂":"文","⽃":"斗","⽄":"斤","⽅":"方","⽆":"无","⽇":"日","⽈":"曰","⽉":"月","⽊":"木","⽋":"欠","⽌":"止","⽍":"歹","⽎":"殳","⽏":"毋","⽐":"比","⽑":"毛","⽒":"氏","⽓":"气","⽔":"水","⽕":"火","⽖":"爪","⽗":"父","⽘":"爻","⽙":"爿","⽚":"片","⽛":"牙","⽜":"牛","⽝":"犬","⽞":"玄","⽟":"玉","⽠":"瓜","⽡":"瓦","⽢":"甘","⽣":"生","⽤":"用","⽥":"田","⽦":"疋","⽧":"疒","⽨":"癶","⽩":"白","⽪":"皮","⽫":"皿","⽬":"目","⽭":"矛","⽮":"矢","⽯":"石","⽰":"示","⽱":"禸","⽲":"禾","⽳":"穴","⽴":"立","⽵":"竹","⽶":"米","⽷":"糸","⽸":"缶","⽹":"网","⽺":"羊","⽻":"羽","⽼":"老","⽽":"而","⽾":"耒","⽿":"耳","⾀":"聿","⾁":"肉","⾂":"臣","⾃":"自","⾄":"至","⾅":"臼","⾆":"舌","⾇":"舛","⾈":"舟","⾉":"艮","⾊":"色","⾋":"艸","⾌":"虍","⾍":"虫","⾎":"血","⾏":"行","⾐":"衣","⾑":"襾","⾒":"見","⾓":"角","⾔":"言","⾕":"谷","⾖":"豆","⾗":"豕","⾘":"豸","⾙":"貝","⾚":"赤","⾛":"走","⾜":"足","⾝":"身","⾞":"車","⾟":"辛","⾠":"辰","⾡":"辵","⾢":"邑","⾣":"酉","⾤":"釆","⾥":"里","⾦":"金","⾧":"長","⾨":"門","⾩":"阜","⾪":"隶","⾫":"隹","⾬":"雨","⾭":"靑","⾮":"非","⾯":"面","⾰":"革","⾱":"韋","⾲":"韭","⾳":"音","⾴":"頁","⾵":"風","⾶":"飛","⾷":"食","⾸":"首","⾹":"香","⾺":"馬","⾻":"骨","⾼":"高","⾽":"髟","⾾":"鬥","⾿":"鬯","⿀":"鬲","⿁":"鬼","⿂":"魚","⿃":"鳥","⿄":"鹵","⿅":"鹿","⿆":"麥","⿇":"麻","⿈":"黃","⿉":"黍","⿊":"黑","⿋":"黹","⿌":"黽","⿍":"鼎","⿎":"鼓","⿏":"鼠","⿐":"鼻","⿑":"齊","⿒":"齒","⿓":"龍","⿔":"龜","⿕":"龠","〶":"〒","〸":"十","〹":"卄","〺":"卅","゛":" ゙","゜":" ゚","ㄱ":"ᄀ","ㄲ":"ᄁ","ㄳ":"ᆪ","ㄴ":"ᄂ","ㄵ":"ᆬ","ㄶ":"ᆭ","ㄷ":"ᄃ","ㄸ":"ᄄ","ㄹ":"ᄅ","ㄺ":"ᆰ","ㄻ":"ᆱ","ㄼ":"ᆲ","ㄽ":"ᆳ","ㄾ":"ᆴ","ㄿ":"ᆵ","ㅀ":"ᄚ","ㅁ":"ᄆ","ㅂ":"ᄇ","ㅃ":"ᄈ","ㅄ":"ᄡ","ㅅ":"ᄉ","ㅆ":"ᄊ","ㅇ":"ᄋ","ㅈ":"ᄌ","ㅉ":"ᄍ","ㅊ":"ᄎ","ㅋ":"ᄏ","ㅌ":"ᄐ","ㅍ":"ᄑ","ㅎ":"ᄒ","ㅏ":"ᅡ","ㅐ":"ᅢ","ㅑ":"ᅣ","ㅒ":"ᅤ","ㅓ":"ᅥ","ㅔ":"ᅦ","ㅕ":"ᅧ","ㅖ":"ᅨ","ㅗ":"ᅩ","ㅘ":"ᅪ","ㅙ":"ᅫ","ㅚ":"ᅬ","ㅛ":"ᅭ","ㅜ":"ᅮ","ㅝ":"ᅯ","ㅞ":"ᅰ","ㅟ":"ᅱ","ㅠ":"ᅲ","ㅡ":"ᅳ","ㅢ":"ᅴ","ㅣ":"ᅵ","ㅤ":"ᅠ","ㅥ":"ᄔ","ㅦ":"ᄕ","ㅧ":"ᇇ","ㅨ":"ᇈ","ㅩ":"ᇌ","ㅪ":"ᇎ","ㅫ":"ᇓ","ㅬ":"ᇗ","ㅭ":"ᇙ","ㅮ":"ᄜ","ㅯ":"ᇝ","ㅰ":"ᇟ","ㅱ":"ᄝ","ㅲ":"ᄞ","ㅳ":"ᄠ","ㅴ":"ᄢ","ㅵ":"ᄣ","ㅶ":"ᄧ","ㅷ":"ᄩ","ㅸ":"ᄫ","ㅹ":"ᄬ","ㅺ":"ᄭ","ㅻ":"ᄮ","ㅼ":"ᄯ","ㅽ":"ᄲ","ㅾ":"ᄶ","ㅿ":"ᅀ","ㆀ":"ᅇ","ㆁ":"ᅌ","ㆂ":"ᇱ","ㆃ":"ᇲ","ㆄ":"ᅗ","ㆅ":"ᅘ","ㆆ":"ᅙ","ㆇ":"ᆄ","ㆈ":"ᆅ","ㆉ":"ᆈ","ㆊ":"ᆑ","ㆋ":"ᆒ","ㆌ":"ᆔ","ㆍ":"ᆞ","ㆎ":"ᆡ","㈀":"(ᄀ)","㈁":"(ᄂ)","㈂":"(ᄃ)","㈃":"(ᄅ)","㈄":"(ᄆ)","㈅":"(ᄇ)","㈆":"(ᄉ)","㈇":"(ᄋ)","㈈":"(ᄌ)","㈉":"(ᄎ)","㈊":"(ᄏ)","㈋":"(ᄐ)","㈌":"(ᄑ)","㈍":"(ᄒ)","㈎":"(가)","㈏":"(나)","㈐":"(다)","㈑":"(라)","㈒":"(마)","㈓":"(바)","㈔":"(사)","㈕":"(아)","㈖":"(자)","㈗":"(차)","㈘":"(카)","㈙":"(타)","㈚":"(파)","㈛":"(하)","㈜":"(주)","㈝":"(오전)","㈞":"(오후)","㈠":"(一)","㈡":"(二)","㈢":"(三)","㈣":"(四)","㈤":"(五)","㈥":"(六)","㈦":"(七)","㈧":"(八)","㈨":"(九)","㈩":"(十)","㈪":"(月)","㈫":"(火)","㈬":"(水)","㈭":"(木)","㈮":"(金)","㈯":"(土)","㈰":"(日)","㈱":"(株)","㈲":"(有)","㈳":"(社)","㈴":"(名)","㈵":"(特)","㈶":"(財)","㈷":"(祝)","㈸":"(労)","㈹":"(代)","㈺":"(呼)","㈻":"(学)","㈼":"(監)","㈽":"(企)","㈾":"(資)","㈿":"(協)","㉀":"(祭)","㉁":"(休)","㉂":"(自)","㉃":"(至)","㋀":"1月","㋁":"2月","㋂":"3月","㋃":"4月","㋄":"5月","㋅":"6月","㋆":"7月","㋇":"8月","㋈":"9月","㋉":"10月","㋊":"11月","㋋":"12月","㍘":"0点","㍙":"1点","㍚":"2点","㍛":"3点","㍜":"4点","㍝":"5点","㍞":"6点","㍟":"7点","㍠":"8点","㍡":"9点","㍢":"10点","㍣":"11点","㍤":"12点","㍥":"13点","㍦":"14点","㍧":"15点","㍨":"16点","㍩":"17点","㍪":"18点","㍫":"19点","㍬":"20点","㍭":"21点","㍮":"22点","㍯":"23点","㍰":"24点","㏠":"1日","㏡":"2日","㏢":"3日","㏣":"4日","㏤":"5日","㏥":"6日","㏦":"7日","㏧":"8日","㏨":"9日","㏩":"10日","㏪":"11日","㏫":"12日","㏬":"13日","㏭":"14日","㏮":"15日","㏯":"16日","㏰":"17日","㏱":"18日","㏲":"19日","㏳":"20日","㏴":"21日","㏵":"22日","㏶":"23日","㏷":"24日","㏸":"25日","㏹":"26日","㏺":"27日","㏻":"28日","㏼":"29日","㏽":"30日","㏾":"31日","ﬀ":"ff","ﬁ":"fi","ﬂ":"fl","ﬃ":"ffi","ﬄ":"ffl","ﬅ":"ſt","ﬆ":"st","ﬓ":"մն","ﬔ":"մե","ﬕ":"մի","ﬖ":"վն","ﬗ":"մխ","ﭏ":"אל","ﭐ":"ٱ","ﭑ":"ٱ","ﭒ":"ٻ","ﭓ":"ٻ","ﭔ":"ٻ","ﭕ":"ٻ","ﭖ":"پ","ﭗ":"پ","ﭘ":"پ","ﭙ":"پ","ﭚ":"ڀ","ﭛ":"ڀ","ﭜ":"ڀ","ﭝ":"ڀ","ﭞ":"ٺ","ﭟ":"ٺ","ﭠ":"ٺ","ﭡ":"ٺ","ﭢ":"ٿ","ﭣ":"ٿ","ﭤ":"ٿ","ﭥ":"ٿ","ﭦ":"ٹ","ﭧ":"ٹ","ﭨ":"ٹ","ﭩ":"ٹ","ﭪ":"ڤ","ﭫ":"ڤ","ﭬ":"ڤ","ﭭ":"ڤ","ﭮ":"ڦ","ﭯ":"ڦ","ﭰ":"ڦ","ﭱ":"ڦ","ﭲ":"ڄ","ﭳ":"ڄ","ﭴ":"ڄ","ﭵ":"ڄ","ﭶ":"ڃ","ﭷ":"ڃ","ﭸ":"ڃ","ﭹ":"ڃ","ﭺ":"چ","ﭻ":"چ","ﭼ":"چ","ﭽ":"چ","ﭾ":"ڇ","ﭿ":"ڇ","ﮀ":"ڇ","ﮁ":"ڇ","ﮂ":"ڍ","ﮃ":"ڍ","ﮄ":"ڌ","ﮅ":"ڌ","ﮆ":"ڎ","ﮇ":"ڎ","ﮈ":"ڈ","ﮉ":"ڈ","ﮊ":"ژ","ﮋ":"ژ","ﮌ":"ڑ","ﮍ":"ڑ","ﮎ":"ک","ﮏ":"ک","ﮐ":"ک","ﮑ":"ک","ﮒ":"گ","ﮓ":"گ","ﮔ":"گ","ﮕ":"گ","ﮖ":"ڳ","ﮗ":"ڳ","ﮘ":"ڳ","ﮙ":"ڳ","ﮚ":"ڱ","ﮛ":"ڱ","ﮜ":"ڱ","ﮝ":"ڱ","ﮞ":"ں","ﮟ":"ں","ﮠ":"ڻ","ﮡ":"ڻ","ﮢ":"ڻ","ﮣ":"ڻ","ﮤ":"ۀ","ﮥ":"ۀ","ﮦ":"ہ","ﮧ":"ہ","ﮨ":"ہ","ﮩ":"ہ","ﮪ":"ھ","ﮫ":"ھ","ﮬ":"ھ","ﮭ":"ھ","ﮮ":"ے","ﮯ":"ے","ﮰ":"ۓ","ﮱ":"ۓ","ﯓ":"ڭ","ﯔ":"ڭ","ﯕ":"ڭ","ﯖ":"ڭ","ﯗ":"ۇ","ﯘ":"ۇ","ﯙ":"ۆ","ﯚ":"ۆ","ﯛ":"ۈ","ﯜ":"ۈ","ﯝ":"ٷ","ﯞ":"ۋ","ﯟ":"ۋ","ﯠ":"ۅ","ﯡ":"ۅ","ﯢ":"ۉ","ﯣ":"ۉ","ﯤ":"ې","ﯥ":"ې","ﯦ":"ې","ﯧ":"ې","ﯨ":"ى","ﯩ":"ى","ﯪ":"ئا","ﯫ":"ئا","ﯬ":"ئە","ﯭ":"ئە","ﯮ":"ئو","ﯯ":"ئو","ﯰ":"ئۇ","ﯱ":"ئۇ","ﯲ":"ئۆ","ﯳ":"ئۆ","ﯴ":"ئۈ","ﯵ":"ئۈ","ﯶ":"ئې","ﯷ":"ئې","ﯸ":"ئې","ﯹ":"ئى","ﯺ":"ئى","ﯻ":"ئى","ﯼ":"ی","ﯽ":"ی","ﯾ":"ی","ﯿ":"ی","ﰀ":"ئج","ﰁ":"ئح","ﰂ":"ئم","ﰃ":"ئى","ﰄ":"ئي","ﰅ":"بج","ﰆ":"بح","ﰇ":"بخ","ﰈ":"بم","ﰉ":"بى","ﰊ":"بي","ﰋ":"تج","ﰌ":"تح","ﰍ":"تخ","ﰎ":"تم","ﰏ":"تى","ﰐ":"تي","ﰑ":"ثج","ﰒ":"ثم","ﰓ":"ثى","ﰔ":"ثي","ﰕ":"جح","ﰖ":"جم","ﰗ":"حج","ﰘ":"حم","ﰙ":"خج","ﰚ":"خح","ﰛ":"خم","ﰜ":"سج","ﰝ":"سح","ﰞ":"سخ","ﰟ":"سم","ﰠ":"صح","ﰡ":"صم","ﰢ":"ضج","ﰣ":"ضح","ﰤ":"ضخ","ﰥ":"ضم","ﰦ":"طح","ﰧ":"طم","ﰨ":"ظم","ﰩ":"عج","ﰪ":"عم","ﰫ":"غج","ﰬ":"غم","ﰭ":"فج","ﰮ":"فح","ﰯ":"فخ","ﰰ":"فم","ﰱ":"فى","ﰲ":"في","ﰳ":"قح","ﰴ":"قم","ﰵ":"قى","ﰶ":"قي","ﰷ":"كا","ﰸ":"كج","ﰹ":"كح","ﰺ":"كخ","ﰻ":"كل","ﰼ":"كم","ﰽ":"كى","ﰾ":"كي","ﰿ":"لج","ﱀ":"لح","ﱁ":"لخ","ﱂ":"لم","ﱃ":"لى","ﱄ":"لي","ﱅ":"مج","ﱆ":"مح","ﱇ":"مخ","ﱈ":"مم","ﱉ":"مى","ﱊ":"مي","ﱋ":"نج","ﱌ":"نح","ﱍ":"نخ","ﱎ":"نم","ﱏ":"نى","ﱐ":"ني","ﱑ":"هج","ﱒ":"هم","ﱓ":"هى","ﱔ":"هي","ﱕ":"يج","ﱖ":"يح","ﱗ":"يخ","ﱘ":"يم","ﱙ":"يى","ﱚ":"يي","ﱛ":"ذٰ","ﱜ":"رٰ","ﱝ":"ىٰ","ﱞ":" ٌّ","ﱟ":" ٍّ","ﱠ":" َّ","ﱡ":" ُّ","ﱢ":" ِّ","ﱣ":" ّٰ","ﱤ":"ئر","ﱥ":"ئز","ﱦ":"ئم","ﱧ":"ئن","ﱨ":"ئى","ﱩ":"ئي","ﱪ":"بر","ﱫ":"بز","ﱬ":"بم","ﱭ":"بن","ﱮ":"بى","ﱯ":"بي","ﱰ":"تر","ﱱ":"تز","ﱲ":"تم","ﱳ":"تن","ﱴ":"تى","ﱵ":"تي","ﱶ":"ثر","ﱷ":"ثز","ﱸ":"ثم","ﱹ":"ثن","ﱺ":"ثى","ﱻ":"ثي","ﱼ":"فى","ﱽ":"في","ﱾ":"قى","ﱿ":"قي","ﲀ":"كا","ﲁ":"كل","ﲂ":"كم","ﲃ":"كى","ﲄ":"كي","ﲅ":"لم","ﲆ":"لى","ﲇ":"لي","ﲈ":"ما","ﲉ":"مم","ﲊ":"نر","ﲋ":"نز","ﲌ":"نم","ﲍ":"نن","ﲎ":"نى","ﲏ":"ني","ﲐ":"ىٰ","ﲑ":"ير","ﲒ":"يز","ﲓ":"يم","ﲔ":"ين","ﲕ":"يى","ﲖ":"يي","ﲗ":"ئج","ﲘ":"ئح","ﲙ":"ئخ","ﲚ":"ئم","ﲛ":"ئه","ﲜ":"بج","ﲝ":"بح","ﲞ":"بخ","ﲟ":"بم","ﲠ":"به","ﲡ":"تج","ﲢ":"تح","ﲣ":"تخ","ﲤ":"تم","ﲥ":"ته","ﲦ":"ثم","ﲧ":"جح","ﲨ":"جم","ﲩ":"حج","ﲪ":"حم","ﲫ":"خج","ﲬ":"خم","ﲭ":"سج","ﲮ":"سح","ﲯ":"سخ","ﲰ":"سم","ﲱ":"صح","ﲲ":"صخ","ﲳ":"صم","ﲴ":"ضج","ﲵ":"ضح","ﲶ":"ضخ","ﲷ":"ضم","ﲸ":"طح","ﲹ":"ظم","ﲺ":"عج","ﲻ":"عم","ﲼ":"غج","ﲽ":"غم","ﲾ":"فج","ﲿ":"فح","ﳀ":"فخ","ﳁ":"فم","ﳂ":"قح","ﳃ":"قم","ﳄ":"كج","ﳅ":"كح","ﳆ":"كخ","ﳇ":"كل","ﳈ":"كم","ﳉ":"لج","ﳊ":"لح","ﳋ":"لخ","ﳌ":"لم","ﳍ":"له","ﳎ":"مج","ﳏ":"مح","ﳐ":"مخ","ﳑ":"مم","ﳒ":"نج","ﳓ":"نح","ﳔ":"نخ","ﳕ":"نم","ﳖ":"نه","ﳗ":"هج","ﳘ":"هم","ﳙ":"هٰ","ﳚ":"يج","ﳛ":"يح","ﳜ":"يخ","ﳝ":"يم","ﳞ":"يه","ﳟ":"ئم","ﳠ":"ئه","ﳡ":"بم","ﳢ":"به","ﳣ":"تم","ﳤ":"ته","ﳥ":"ثم","ﳦ":"ثه","ﳧ":"سم","ﳨ":"سه","ﳩ":"شم","ﳪ":"شه","ﳫ":"كل","ﳬ":"كم","ﳭ":"لم","ﳮ":"نم","ﳯ":"نه","ﳰ":"يم","ﳱ":"يه","ﳲ":"ـَّ","ﳳ":"ـُّ","ﳴ":"ـِّ","ﳵ":"طى","ﳶ":"طي","ﳷ":"عى","ﳸ":"عي","ﳹ":"غى","ﳺ":"غي","ﳻ":"سى","ﳼ":"سي","ﳽ":"شى","ﳾ":"شي","ﳿ":"حى","ﴀ":"حي","ﴁ":"جى","ﴂ":"جي","ﴃ":"خى","ﴄ":"خي","ﴅ":"صى","ﴆ":"صي","ﴇ":"ضى","ﴈ":"ضي","ﴉ":"شج","ﴊ":"شح","ﴋ":"شخ","ﴌ":"شم","ﴍ":"شر","ﴎ":"سر","ﴏ":"صر","ﴐ":"ضر","ﴑ":"طى","ﴒ":"طي","ﴓ":"عى","ﴔ":"عي","ﴕ":"غى","ﴖ":"غي","ﴗ":"سى","ﴘ":"سي","ﴙ":"شى","ﴚ":"شي","ﴛ":"حى","ﴜ":"حي","ﴝ":"جى","ﴞ":"جي","ﴟ":"خى","ﴠ":"خي","ﴡ":"صى","ﴢ":"صي","ﴣ":"ضى","ﴤ":"ضي","ﴥ":"شج","ﴦ":"شح","ﴧ":"شخ","ﴨ":"شم","ﴩ":"شر","ﴪ":"سر","ﴫ":"صر","ﴬ":"ضر","ﴭ":"شج","ﴮ":"شح","ﴯ":"شخ","ﴰ":"شم","ﴱ":"سه","ﴲ":"شه","ﴳ":"طم","ﴴ":"سج","ﴵ":"سح","ﴶ":"سخ","ﴷ":"شج","ﴸ":"شح","ﴹ":"شخ","ﴺ":"طم","ﴻ":"ظم","ﴼ":"اً","ﴽ":"اً","ﵐ":"تجم","ﵑ":"تحج","ﵒ":"تحج","ﵓ":"تحم","ﵔ":"تخم","ﵕ":"تمج","ﵖ":"تمح","ﵗ":"تمخ","ﵘ":"جمح","ﵙ":"جمح","ﵚ":"حمي","ﵛ":"حمى","ﵜ":"سحج","ﵝ":"سجح","ﵞ":"سجى","ﵟ":"سمح","ﵠ":"سمح","ﵡ":"سمج","ﵢ":"سمم","ﵣ":"سمم","ﵤ":"صحح","ﵥ":"صحح","ﵦ":"صمم","ﵧ":"شحم","ﵨ":"شحم","ﵩ":"شجي","ﵪ":"شمخ","ﵫ":"شمخ","ﵬ":"شمم","ﵭ":"شمم","ﵮ":"ضحى","ﵯ":"ضخم","ﵰ":"ضخم","ﵱ":"طمح","ﵲ":"طمح","ﵳ":"طمم","ﵴ":"طمي","ﵵ":"عجم","ﵶ":"عمم","ﵷ":"عمم","ﵸ":"عمى","ﵹ":"غمم","ﵺ":"غمي","ﵻ":"غمى","ﵼ":"فخم","ﵽ":"فخم","ﵾ":"قمح","ﵿ":"قمم","ﶀ":"لحم","ﶁ":"لحي","ﶂ":"لحى","ﶃ":"لجج","ﶄ":"لجج","ﶅ":"لخم","ﶆ":"لخم","ﶇ":"لمح","ﶈ":"لمح","ﶉ":"محج","ﶊ":"محم","ﶋ":"محي","ﶌ":"مجح","ﶍ":"مجم","ﶎ":"مخج","ﶏ":"مخم","ﶒ":"مجخ","ﶓ":"همج","ﶔ":"همم","ﶕ":"نحم","ﶖ":"نحى","ﶗ":"نجم","ﶘ":"نجم","ﶙ":"نجى","ﶚ":"نمي","ﶛ":"نمى","ﶜ":"يمم","ﶝ":"يمم","ﶞ":"بخي","ﶟ":"تجي","ﶠ":"تجى","ﶡ":"تخي","ﶢ":"تخى","ﶣ":"تمي","ﶤ":"تمى","ﶥ":"جمي","ﶦ":"جحى","ﶧ":"جمى","ﶨ":"سخى","ﶩ":"صحي","ﶪ":"شحي","ﶫ":"ضحي","ﶬ":"لجي","ﶭ":"لمي","ﶮ":"يحي","ﶯ":"يجي","ﶰ":"يمي","ﶱ":"ممي","ﶲ":"قمي","ﶳ":"نحي","ﶴ":"قمح","ﶵ":"لحم","ﶶ":"عمي","ﶷ":"كمي","ﶸ":"نجح","ﶹ":"مخي","ﶺ":"لجم","ﶻ":"كمم","ﶼ":"لجم","ﶽ":"نجح","ﶾ":"جحي","ﶿ":"حجي","ﷀ":"مجي","ﷁ":"فمي","ﷂ":"بحي","ﷃ":"كمم","ﷄ":"عجم","ﷅ":"صمم","ﷆ":"سخي","ﷇ":"نجي","﹉":"‾","﹊":"‾","﹋":"‾","﹌":"‾","﹍":"_","﹎":"_","﹏":"_","ﺀ":"ء","ﺁ":"آ","ﺂ":"آ","ﺃ":"أ","ﺄ":"أ","ﺅ":"ؤ","ﺆ":"ؤ","ﺇ":"إ","ﺈ":"إ","ﺉ":"ئ","ﺊ":"ئ","ﺋ":"ئ","ﺌ":"ئ","ﺍ":"ا","ﺎ":"ا","ﺏ":"ب","ﺐ":"ب","ﺑ":"ب","ﺒ":"ب","ﺓ":"ة","ﺔ":"ة","ﺕ":"ت","ﺖ":"ت","ﺗ":"ت","ﺘ":"ت","ﺙ":"ث","ﺚ":"ث","ﺛ":"ث","ﺜ":"ث","ﺝ":"ج","ﺞ":"ج","ﺟ":"ج","ﺠ":"ج","ﺡ":"ح","ﺢ":"ح","ﺣ":"ح","ﺤ":"ح","ﺥ":"خ","ﺦ":"خ","ﺧ":"خ","ﺨ":"خ","ﺩ":"د","ﺪ":"د","ﺫ":"ذ","ﺬ":"ذ","ﺭ":"ر","ﺮ":"ر","ﺯ":"ز","ﺰ":"ز","ﺱ":"س","ﺲ":"س","ﺳ":"س","ﺴ":"س","ﺵ":"ش","ﺶ":"ش","ﺷ":"ش","ﺸ":"ش","ﺹ":"ص","ﺺ":"ص","ﺻ":"ص","ﺼ":"ص","ﺽ":"ض","ﺾ":"ض","ﺿ":"ض","ﻀ":"ض","ﻁ":"ط","ﻂ":"ط","ﻃ":"ط","ﻄ":"ط","ﻅ":"ظ","ﻆ":"ظ","ﻇ":"ظ","ﻈ":"ظ","ﻉ":"ع","ﻊ":"ع","ﻋ":"ع","ﻌ":"ع","ﻍ":"غ","ﻎ":"غ","ﻏ":"غ","ﻐ":"غ","ﻑ":"ف","ﻒ":"ف","ﻓ":"ف","ﻔ":"ف","ﻕ":"ق","ﻖ":"ق","ﻗ":"ق","ﻘ":"ق","ﻙ":"ك","ﻚ":"ك","ﻛ":"ك","ﻜ":"ك","ﻝ":"ل","ﻞ":"ل","ﻟ":"ل","ﻠ":"ل","ﻡ":"م","ﻢ":"م","ﻣ":"م","ﻤ":"م","ﻥ":"ن","ﻦ":"ن","ﻧ":"ن","ﻨ":"ن","ﻩ":"ه","ﻪ":"ه","ﻫ":"ه","ﻬ":"ه","ﻭ":"و","ﻮ":"و","ﻯ":"ى","ﻰ":"ى","ﻱ":"ي","ﻲ":"ي","ﻳ":"ي","ﻴ":"ي","ﻵ":"لآ","ﻶ":"لآ","ﻷ":"لأ","ﻸ":"لأ","ﻹ":"لإ","ﻺ":"لإ","ﻻ":"لا","ﻼ":"لا"},Vb=function(){function a(a,b,c,d,e,f){this.fontChar=a,this.unicode=b,this.accent=c,this.width=d,this.vmetric=e,this.operatorListId=f}return a.prototype.matchesForCache=function(a,b,c,d,e,f){return this.fontChar===a&&this.unicode===b&&this.accent===c&&this.width===d&&this.vmetric===e&&this.operatorListId===f},a}(),Wb=function(){function a(a){
// The elements of this._map can be integers or strings, depending on how
// |cmap| was created.
this._map=a}return a.prototype={get length(){return this._map.length},forEach:function(a){for(var b in this._map)a(b,this._map[b].charCodeAt(0))},has:function(a){return void 0!==this._map[a]},get:function(a){return this._map[a]},charCodeOf:function(a){return this._map.indexOf(a)}},a}(),Xb=function(){function a(a,b){this.firstChar=a,this.lastChar=b}return a.prototype={get length(){c("should not access .length")},forEach:function(a){for(var b=this.firstChar,c=this.lastChar;c>=b;b++)a(b,b)},has:function(a){return this.firstChar<=a&&a<=this.lastChar},get:function(a){return this.firstChar<=a&&a<=this.lastChar?String.fromCharCode(a):void 0},charCodeOf:function(a){c("should not call .charCodeOf")}},a}(),Yb=function(){function a(a,b,c){a[b]=c>>8&255,a[b+1]=255&c}function b(a,b,c){a[b]=c>>24&255,a[b+1]=c>>16&255,a[b+2]=c>>8&255,a[b+3]=255&c}function c(a,b,c){var d,e;if(c instanceof Uint8Array)a.set(c,b);else if("string"==typeof c)for(d=0,e=c.length;e>d;d++)a[b++]=255&c.charCodeAt(d);else
// treating everything else as array
for(d=0,e=c.length;e>d;d++)a[b++]=255&c[d]}function d(a){this.sfnt=a,this.tables=Object.create(null)}d.getSearchParams=function(a,b){for(var c=1,d=0;(c^a)>c;)c<<=1,d++;var e=c*b;return{range:e,entry:d,rangeShift:b*a-e}};var e=12,f=16;return d.prototype={toArray:function(){var g=this.sfnt,h=this.tables,i=Object.keys(h);i.sort();var k,l,m,n,o,p=i.length,q=e+p*f,r=[q];for(k=0;p>k;k++){n=h[i[k]];var s=(n.length+3&-4)>>>0;q+=s,r.push(q)}var t=new Uint8Array(q);
// write the table data first (mostly for checksum)
for(k=0;p>k;k++)n=h[i[k]],c(t,r[k],n);
// sfnt version (4 bytes)
"true"===g&&(
// Windows hates the Mac TrueType sfnt version number
g=j(65536)),t[0]=255&g.charCodeAt(0),t[1]=255&g.charCodeAt(1),t[2]=255&g.charCodeAt(2),t[3]=255&g.charCodeAt(3),
// numTables (2 bytes)
a(t,4,p);var u=d.getSearchParams(p,16);
// writing table entries
for(
// searchRange (2 bytes)
a(t,6,u.range),
// entrySelector (2 bytes)
a(t,8,u.entry),
// rangeShift (2 bytes)
a(t,10,u.rangeShift),q=e,k=0;p>k;k++){o=i[k],t[q]=255&o.charCodeAt(0),t[q+1]=255&o.charCodeAt(1),t[q+2]=255&o.charCodeAt(2),t[q+3]=255&o.charCodeAt(3);
// checksum
var v=0;for(l=r[k],m=r[k+1];m>l;l+=4){var w=(t[l]<<24)+(t[l+1]<<16)+(t[l+2]<<8)+t[l+3];v=v+w|0}b(t,q+4,v),
// offset
b(t,q+8,r[k]),
// length
b(t,q+12,h[o].length),q+=f}return t},addTable:function(a,b){if(a in this.tables)throw new Error("Table "+a+" already exists");this.tables[a]=b}},d}(),Zb=function(){function d(d,e,f){var g,h,i;this.name=d,this.loadedName=f.loadedName,this.isType3Font=f.isType3Font,this.sizes=[],this.glyphCache={};var j=d.split("+");j=j.length>1?j[1]:j[0],j=j.split(/[-,_]/g)[0],this.isSerifFont=!!(f.flags&Kb.Serif),this.isSymbolicFont=!!(f.flags&Kb.Symbolic),this.isMonospace=!!(f.flags&Kb.FixedPitch);var k=f.type,l=f.subtype;if(this.type=k,this.fallbackName=this.isMonospace?"monospace":this.isSerifFont?"serif":"sans-serif",this.differences=f.differences,this.widths=f.widths,this.defaultWidth=f.defaultWidth,this.composite=f.composite,this.wideChars=f.wideChars,this.cMap=f.cMap,this.ascent=f.ascent/Hb,this.descent=f.descent/Hb,this.fontMatrix=f.fontMatrix,this.toUnicode=f.toUnicode=this.buildToUnicode(f),this.toFontChar=[],"Type3"===f.type){for(g=0;256>g;g++)this.toFontChar[g]=this.differences[g]||f.defaultEncoding[g];return void(this.fontType=V.TYPE3)}if(this.cidEncoding=f.cidEncoding,this.vertical=f.vertical,this.vertical&&(this.vmetrics=f.vmetrics,this.defaultVMetrics=f.defaultVMetrics),!e||e.isEmpty){e&&
// Some bad PDF generators will include empty font files,
// attempting to recover by assuming that no file exists.
b('Font file is empty in "'+d+'" ('+this.loadedName+")"),this.missingFile=!0;
// The file data is not specified. Trying to fix the font name
// to be used with the canvas.font.
var n=d.replace(/[,_]/g,"-"),o=!!Mb[n]||!(!Nb[n]||!Mb[Nb[n]]);if(n=Mb[n]||Nb[n]||n,this.bold=-1!==n.search(/bold/gi),this.italic=-1!==n.search(/oblique/gi)||-1!==n.search(/italic/gi),
// Use 'name' instead of 'fontName' here because the original
// name ArialBlack for example will be replaced by Helvetica.
this.black=-1!==d.search(/Black/g),
// if at least one width is present, remeasure all chars when exists
this.remeasure=Object.keys(this.widths).length>0,o&&"CIDFontType2"===k&&0===f.cidEncoding.indexOf("Identity-")){
// Standard fonts might be embedded as CID font without glyph mapping.
// Building one based on GlyphMapForStandardFonts.
var p=[];for(var q in Qb)p[+q]=Qb[q];var r=this.toUnicode instanceof Xb;r||this.toUnicode.forEach(function(a,b){p[+a]=b}),this.toFontChar=p,this.toUnicode=new Wb(p)}else if(/Symbol/i.test(n)){var s=Lb.SymbolSetEncoding;for(g in s)i=tc[s[g]],i&&(this.toFontChar[g]=i);for(g in f.differences)i=tc[f.differences[g]],i&&(this.toFontChar[g]=i)}else if(/Dingbats/i.test(n)){/Wingdings/i.test(d)&&b("Wingdings font without embedded font file, falling back to the ZapfDingbats encoding.");var t=Lb.ZapfDingbatsEncoding;for(g in t)i=uc[t[g]],i&&(this.toFontChar[g]=i);for(g in f.differences)i=uc[f.differences[g]],i&&(this.toFontChar[g]=i)}else if(o){this.toFontChar=[];for(g in f.defaultEncoding)h=f.differences[g]||f.defaultEncoding[g],this.toFontChar[g]=tc[h]}else{var u=-1===k.indexOf("CIDFontType");this.toUnicode.forEach(function(a,b){u&&(h=f.differences[a]||f.defaultEncoding[a],b=tc[h]||b),this.toFontChar[a]=b}.bind(this))}return this.loadedName=n.split("-")[0],this.loading=!1,void(this.fontType=M(k,l))}
// Some fonts might use wrong font types for Type1C or CIDFontType0C
"Type1C"===l&&"Type1"!==k&&"MMType1"!==k&&(
// Some TrueType fonts by mistake claim Type1C
m(e)?l="TrueType":k="Type1"),"CIDFontType0C"===l&&"CIDFontType0"!==k&&(k="CIDFontType0"),"OpenType"===l&&(k="OpenType");var v;switch(k){case"MMType1":a("MMType1 font ("+d+"), falling back to Type1.");/* falls through */
case"Type1":case"CIDFontType0":this.mimetype="font/opentype";var w="Type1C"===l||"CIDFontType0C"===l?new dc(e,f):new cc(d,e,f);L(f),
// Wrap the CFF data inside an OTF font file
v=this.convert(d,w,f);break;case"OpenType":case"TrueType":case"CIDFontType2":this.mimetype="font/opentype",
// Repair the TrueType file. It is can be damaged in the point of
// view of the sanitizer
v=this.checkAndRepair(d,e,f),this.isOpenType&&(k="OpenType");break;default:c("Font "+k+" is not supported")}this.data=v,this.fontType=M(k,l),
// Transfer some properties again that could change during font conversion
this.fontMatrix=f.fontMatrix,this.widths=f.widths,this.defaultWidth=f.defaultWidth,this.encoding=f.baseEncoding,this.seacMap=f.seacMap,this.loading=!0}function f(a,b){return(a<<8)+b}function i(a,b,c,d){return(a<<24)+(b<<16)+(c<<8)+d}function k(a){return String.fromCharCode(a>>8&255,255&a)}function l(a){
// clamp value to the 16-bit int range
return a=a>32767?32767:-32768>a?-32768:a,String.fromCharCode(a>>8&255,255&a)}function m(a){var b=a.peekBytes(4);return 65536===n(b,0)}/**
   * Rebuilds the char code to glyph ID map by trying to replace the char codes
   * with their unicode value. It also moves char codes that are in known
   * problematic locations.
   * @return {Object} Two properties:
   * 'toFontChar' - maps original char codes(the value that will be read
   * from commands such as show text) to the char codes that will be used in the
   * font that we build
   * 'charCodeToGlyphId' - maps the new font char codes to glyph ids
   */
function o(a,b){var c=b.toUnicode,d=!!(b.flags&Kb.Symbolic),e=b.toUnicode instanceof Xb,f=Object.create(null),g=[],h=[],i=Eb;for(var j in a){j|=0;var k=a[j],l=j;
// First try to map the value to a unicode position if a non identity map
// was created.
if(!e&&c.has(j)){var m=c.get(l);
// TODO: Try to map ligatures to the correct spot.
1===m.length&&(l=m.charCodeAt(0))}
// Try to move control characters, special characters and already mapped
// characters to the private use area since they will not be drawn by
// canvas if left in their current position. Also, move characters if the
// font was symbolic and there is only an identity unicode map since the
// characters probably aren't in the correct position (fixes an issue
// with firefox and thuluthfont).
if((void 0!==h[l]||31>=l||// Control chars
127===l||// Control char
173===l||// Soft hyphen
160===l||// Non breaking space
l>=128&&159>=l||// Control chars
// Prevent drawing characters in the specials unicode block.
l>=65520&&65535>=l||d&&e)&&Fb>=i)// Room left.
// Loop to try and find a free spot in the private use area.
do l=i++,Gb&&61440===l&&(l=61472,i=l+1);while(void 0!==h[l]&&Fb>=i);f[l]=k,g[j]=l,h[l]=!0}return{toFontChar:g,charCodeToGlyphId:f,nextAvailableFontCharCode:i}}function p(a){
// Array.sort() sorts by characters, not numerically, so convert to an
// array of characters.
var b=[];for(var c in a)b.push({fontCharCode:0|c,glyphId:a[c]});b.sort(function(a,b){return a.fontCharCode-b.fontCharCode});for(var d=[],e=b.length,f=0;e>f;){var g=b[f].fontCharCode,h=[b[f].glyphId];++f;for(var i=g;e>f&&i+1===b[f].fontCharCode&&(h.push(b[f].glyphId),++i,++f,65535!==i););d.push([g,i,h])}return d}function q(a){var b,c,d,e,f=p(a),g=f[f.length-1][1]>65535?2:1,h="\x00\x00"+// version
k(g)+// numTables
"\x00\x00"+// encodingID
j(4+8*g);for(b=f.length-1;b>=0&&!(f[b][0]<=65535);--b);var i=b+1;f[b][0]<65535&&65535===f[b][1]&&(f[b][1]=65534);var l,m,n,o,q=f[b][1]<65535?1:0,r=i+q,s=Yb.getSearchParams(r,2),t="",u="",v="",w="",x="",y=0;for(b=0,c=i;c>b;b++){l=f[b],m=l[0],n=l[1],t+=k(m),u+=k(n),o=l[2];var z=!0;for(d=1,e=o.length;e>d;++d)if(o[d]!==o[d-1]+1){z=!1;break}if(z){var A=o[0];v+=k(A-m&65535),w+=k(0)}else{var B=2*(r-b)+2*y;for(y+=n-m+1,v+=k(0),w+=k(B),d=0,e=o.length;e>d;++d)x+=k(o[d])}}q>0&&(u+="ÿÿ",t+="ÿÿ",v+="\x00",w+="\x00\x00");var C="\x00\x00"+// language
k(2*r)+k(s.range)+k(s.entry)+k(s.rangeShift)+u+"\x00\x00"+t+v+w+x,D="",E="";if(g>1){for(h+="\x00\x00\n"+// encodingID
j(4+8*g+4+C.length),// start of the table record
D="",b=0,c=f.length;c>b;b++){l=f[b],m=l[0],o=l[2];var F=o[0];for(d=1,e=o.length;e>d;++d)o[d]!==o[d-1]+1&&(n=l[0]+d-1,D+=j(m)+// startCharCode
j(n)+// endCharCode
j(F),// startGlyphID
m=n+1,F=o[d]);D+=j(m)+// startCharCode
j(l[1])+// endCharCode
j(F)}E="\x00\f\x00\x00"+// reserved
j(D.length+16)+// length
"\x00\x00\x00\x00"+// language
j(D.length/12)}// format
// length
return h+"\x00"+k(C.length+4)+C+E+D}function r(a){var b=new Gc(a.data),c=b.getUint16();
// TODO verify all OS/2 tables fields, but currently we validate only those
// that give us issues
b.getBytes(60);// skipping type, misc sizes, panose, unicode ranges
var d=b.getUint16();if(4>c&&768&d)return!1;var e=b.getUint16(),f=b.getUint16();if(e>f)return!1;b.getBytes(6);// skipping sTypoAscender/Descender/LineGap
var g=b.getUint16();
// OS/2 appears to be valid, resetting some fields
return 0===g?!1:(a.data[8]=a.data[9]=0,!0)}function s(a,b,d){d=d||{unitsPerEm:0,yMax:0,yMin:0,ascent:0,descent:0};var e=0,f=0,g=0,h=0,i=null,l=0;if(b)for(var m in b){m|=0,(i>m||!i)&&(i=m),m>l&&(l=m);var n=I(m);32>n?e|=1<<n:64>n?f|=1<<n-32:96>n?g|=1<<n-64:123>n?h|=1<<n-96:c("Unicode ranges Bits > 123 are reserved for internal usage")}else
// TODO
i=0,l=255;var o=a.bbox||[0,0,0,0],p=d.unitsPerEm||1/(a.fontMatrix||Q)[0],q=a.ascentScaled?1:p/Hb,r=d.ascent||Math.round(q*(a.ascent||o[3])),s=d.descent||Math.round(q*(a.descent||o[1]));s>0&&a.descent>0&&o[1]<0&&(s=-s);var t=d.yMax||r,u=-d.yMin||-s;// Panose
// ulUnicodeRange1 (Bits 0-31)
// ulUnicodeRange2 (Bits 32-63)
// ulUnicodeRange3 (Bits 64-95)
// ulUnicodeRange4 (Bits 96-127)
// achVendID
// fsSelection
// usFirstCharIndex
// usLastCharIndex
// sTypoAscender
// sTypoDescender
// sTypoLineGap (7%-10% of the unitsPerEM value)
// usWinAscent
// usWinDescent
// ulCodePageRange2 (Bits 32-63)
// sxHeight
// sCapHeight
// usDefaultChar
// usBreakChar
return"\x00$ô\x00\x00\x00»\x00\x00\x00»\x00\x00ß\x001\x00\x00\x00\x00"+String.fromCharCode(a.fixedPitch?9:0)+"\x00\x00\x00\x00\x00\x00"+j(e)+j(f)+j(g)+j(h)+"*21*"+k(a.italicAngle?1:0)+k(i||a.firstChar)+k(l||a.lastChar)+k(r)+k(s)+"\x00d"+k(t)+k(u)+"\x00\x00\x00\x00\x00\x00\x00\x00"+k(a.xHeight)+k(a.capHeight)+k(0)+k(i||a.firstChar)+"\x00"}function t(a){var b=Math.floor(a.italicAngle*Math.pow(2,16));// Version number
// italicAngle
// underlineThickness
// isFixedPitch
return"\x00\x00\x00"+j(b)+"\x00\x00\x00\x00"+j(a.fixedPitch)+"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"}function u(a,b){b||(b=[[],[]]);var c,d,e,f,g,h=[b[0][0]||"Original licence",// 0.Copyright
b[0][1]||a,// 1.Font family
b[0][2]||"Unknown",// 2.Font subfamily (font weight)
b[0][3]||"uniqueID",// 3.Unique ID
b[0][4]||a,// 4.Full font name
b[0][5]||"Version 0.11",// 5.Version
b[0][6]||"",// 6.Postscript name
b[0][7]||"Unknown",// 7.Trademark
b[0][8]||"Unknown",// 8.Manufacturer
b[0][9]||"Unknown"],i=[];for(c=0,d=h.length;d>c;c++){g=b[1][c]||h[c];var j=[];for(e=0,f=g.length;f>e;e++)j.push(k(g.charCodeAt(e)));i.push(j.join(""))}var l=[h,i],m=["\x00","\x00"],n=["\x00\x00","\x00"],o=["\x00\x00","	"],p=h.length*m.length,q="\x00\x00"+// format
k(p)+// Number of names Record
k(12*p+6),r=0;for(c=0,d=m.length;d>c;c++){var s=l[c];for(e=0,f=s.length;f>e;e++){g=s[e];var t=m[c]+// platform ID
n[c]+// encoding ID
o[c]+// language ID
k(e)+// name ID
k(g.length)+k(r);q+=t,r+=g.length}}return q+=h.join("")+i.join("")}return d.getFontID=function(){var a=1;return function(){return String(a++)}}(),d.prototype={name:null,font:null,mimetype:null,encoding:null,get renderer(){var a=sc.create(this);return g(this,"renderer",a)},exportData:function(){var a={};for(var b in this)this.hasOwnProperty(b)&&(a[b]=this[b]);return a},checkAndRepair:function(d,g,j){function k(a){var b=h(a.getBytes(4)),c=a.getInt32(),d=a.getInt32()>>>0,e=a.getInt32()>>>0,f=a.pos;a.pos=a.start?a.start:0,a.skip(d);var g=a.getBytes(e);
// clearing checksum adjustment
return a.pos=f,"head"===b&&(g[8]=g[9]=g[10]=g[11]=0,g[17]|=32),{tag:b,checksum:c,length:e,offset:d,data:g}}function l(a){return{version:h(a.getBytes(4)),numTables:a.getUint16(),searchRange:a.getUint16(),entrySelector:a.getUint16(),rangeShift:a.getUint16()}}/**
       * Read the appropriate subtable from the cmap according to 9.6.6.4 from
       * PDF spec
       */
function m(a,d,e){var f,g=(d.start?d.start:0)+a.offset;d.pos=g;
// There's an order of preference in terms of which cmap subtable to
// use:
// - non-symbolic fonts the preference is a 3,1 table then a 1,0 table
// - symbolic fonts the preference is a 3,0 table then a 1,0 table
// The following takes advantage of the fact that the tables are sorted
// to work.
for(var h,i=(d.getUint16(),d.getUint16()),j=!1,k=0;i>k;k++){var l=d.getUint16(),m=d.getUint16(),n=d.getInt32()>>>0,o=!1;if(0===l&&0===m?o=!0:1===l&&0===m?o=!0:3!==l||1!==m||e&&h?e&&3===l&&0===m&&(o=!0,j=!0):(o=!0,e||(j=!0)),o&&(h={platformId:l,encodingId:m,offset:n}),j)break}if(!h)return b("Could not find a preferred cmap table."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1};d.pos=g+h.offset;var p,q,r=d.getUint16(),s=(d.getUint16(),d.getUint16(),!1),t=[];
// TODO(mack): refactor this cmap subtable reading logic out
if(0===r){for(p=0;256>p;p++){var u=d.getByte();u&&t.push({charCode:p,glyphId:u})}s=!0}else if(4===r){
// re-creating the table in format 4 since the encoding
// might be changed
var v=d.getUint16()>>1;d.getBytes(6);// skipping range fields
var w,x=[];for(w=0;v>w;w++)x.push({end:d.getUint16()});for(d.getUint16(),w=0;v>w;w++)x[w].start=d.getUint16();for(w=0;v>w;w++)x[w].delta=d.getUint16();var y=0;for(w=0;v>w;w++){f=x[w];var z=d.getUint16();if(z){var A=(z>>1)-(v-w);f.offsetIndex=A,y=Math.max(y,A+f.end-f.start+1)}else f.offsetIndex=-1}var B=[];for(p=0;y>p;p++)B.push(d.getUint16());for(w=0;v>w;w++){f=x[w],g=f.start;var C=f.end,D=f.delta;for(A=f.offsetIndex,p=g;C>=p;p++)65535!==p&&(q=0>A?p:B[A+p-g],q=q+D&65535,0!==q&&t.push({charCode:p,glyphId:q}))}}else if(6===r){
// Format 6 is a 2-bytes dense mapping, which means the font data
// lives glue together even if they are pretty far in the unicode
// table. (This looks weird, so I can have missed something), this
// works on Linux but seems to fails on Mac so let's rewrite the
// cmap table to a 3-1-4 style
var E=d.getUint16(),F=d.getUint16();for(p=0;F>p;p++){q=d.getUint16();var G=E+p;t.push({charCode:G,glyphId:q})}}else c("cmap table has unsupported format: "+r);for(
// removing duplicate entries
t.sort(function(a,b){return a.charCode-b.charCode}),k=1;k<t.length;k++)t[k-1].charCode===t[k].charCode&&(t.splice(k,1),k--);return{platformId:h.platformId,encodingId:h.encodingId,mappings:t,hasShortCmap:s}}function n(b,c,d,e){if(!c)return void(d&&(d.data=null));b.pos=(b.start?b.start:0)+c.offset,b.pos+=c.length-2;var f=b.getUint16();f>e&&(a("The numOfMetrics ("+f+") should not be greater than the numGlyphs ("+e+")"),
// Reduce numOfMetrics if it is greater than numGlyphs
f=e,c.data[34]=(65280&f)>>8,c.data[35]=255&f);var g=e-f,h=g-(d.length-4*f>>1);if(h>0){
// For each missing glyph, we set both the width and lsb to 0 (zero).
// Since we need to add two properties for each glyph, this explains
// the use of |numMissing * 2| when initializing the typed array.
var i=new Uint8Array(d.length+2*h);i.set(d.data),d.data=i}}function p(a,b,c,d,e,f){if(12>=c-b)
// glyph with data less than 12 is invalid one
return 0;var g=a.subarray(b,c),h=g[0]<<8|g[1];if(32768&h)
// complex glyph, writing as is
return d.set(g,e),g.length;var i,j=10,k=0;for(i=0;h>i;i++){var l=g[j]<<8|g[j+1];k=l+1,j+=2}
// skipping instructions
var m=j,n=g[j]<<8|g[j+1];j+=2+n;var o=j,p=0;for(i=0;k>i;i++){var q=g[j++];192&q&&(
// reserved flags must be zero, cleaning up
g[j-1]=63&q);var r=(2&q?1:16&q?0:2)+(4&q?1:32&q?0:2);if(p+=r,8&q){var s=g[j++];i+=s,p+=s*r}}
// glyph without coordinates will be rejected
if(0===p)return 0;var t=j+p;
// truncating and aligning to 4 bytes the long glyph data
// glyph data is fine
return t>g.length?0:!f&&n>0?(d.set(g.subarray(0,m),e),d.set([0,0],e+m),d.set(g.subarray(o,t),e+m+2),t-=n,g.length-t>3&&(t=t+3&-4),t):g.length-t>3?(t=t+3&-4,d.set(g.subarray(0,t),e),t):(d.set(g,e),g.length)}function v(c,d,e){var g=c.data,h=i(g[0],g[1],g[2],g[3]);h>>16!==1&&(a("Attempting to fix invalid version in head table: "+h),g[0]=0,g[1]=1,g[2]=0,g[3]=0);var j=f(g[50],g[51]);if(0>j||j>1){a("Attempting to fix invalid indexToLocFormat in head table: "+j);
// The value of indexToLocFormat should be 0 if the loca table
// consists of short offsets, and should be 1 if the loca table
// consists of long offsets.
//
// The number of entries in the loca table should be numGlyphs + 1.
//
// Using this information, we can work backwards to deduce if the
// size of each offset in the loca table, and thus figure out the
// appropriate value for indexToLocFormat.
var k=d+1;e===k<<1?(
// 0x0000 indicates the loca table consists of short offsets
g[50]=0,g[51]=0):e===k<<2?(
// 0x0001 indicates the loca table consists of long offsets
g[50]=0,g[51]=1):b("Could not fix indexToLocFormat: "+j)}}function w(a,b,c,d,e,f){var g,h,i;d?(g=4,h=function(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]},i=function(a,b,c){a[b]=c>>>24&255,a[b+1]=c>>16&255,a[b+2]=c>>8&255,a[b+3]=255&c}):(g=2,h=function(a,b){return a[b]<<9|a[b+1]<<1},i=function(a,b,c){a[b]=c>>9&255,a[b+1]=c>>1&255});var j=a.data,k=g*(1+c);
// is loca.data too short or long?
j.length!==k&&(j=new Uint8Array(k),j.set(a.data.subarray(0,k)),a.data=j);
// removing the invalid glyphs
var l=b.data,m=l.length,n=new Uint8Array(m),o=h(j,0),q=0,r={};i(j,0,q);var s,t;for(s=0,t=g;c>s;s++,t+=g){var u=h(j,t);if(u>m&&(m+3&-4)===u&&(
// Aspose breaks fonts by aligning the glyphs to the qword, but not
// the glyf table size, which makes last glyph out of range.
u=m),u>m)
// glyph end offset points outside glyf data, rejecting the glyph
i(j,t,q),o=u;else{o===u&&(r[s]=!0);var v=p(l,o,u,n,q,e);q+=v,i(j,t,q),o=u}}if(0===q){
// glyf table cannot be empty -- redoing the glyf and loca tables
// to have single glyph with one point
var w=new Uint8Array([0,1,0,0,0,0,0,0,0,0,0,0,0,0,49,0]);for(s=0,t=g;c>s;s++,t+=g)i(j,t,w.length);return b.data=w,r}if(f){var x=h(j,g);n.length>x+q?b.data=n.subarray(0,x+q):(b.data=new Uint8Array(x+q),b.data.set(n.subarray(0,q))),b.data.set(n.subarray(0,x),q),i(a.data,j.length-g,q+x)}else b.data=n.subarray(0,q);return r}function x(a,c,d){var e=(g.start?g.start:0)+a.offset;g.pos=e;var f=a.length,h=e+f,i=g.getInt32();
// skip rest to the tables
g.getBytes(28);var j,k,l=!0;switch(i){case 65536:j=Tb;break;case 131072:var m=g.getUint16();if(m!==d){l=!1;break}var n=[];for(k=0;m>k;++k){var o=g.getUint16();if(o>=32768){l=!1;break}n.push(o)}if(!l)break;for(var p=[],q=[];g.pos<h;){var r=g.getByte();for(q.length=r,k=0;r>k;++k)q[k]=String.fromCharCode(g.getByte());p.push(q.join(""))}for(j=[],k=0;m>k;++k){var s=n[k];j.push(258>s?Tb[s]:p[s-258])}break;case 196608:break;default:b("Unknown/unsupported post table version "+i),l=!1}return c.glyphNames=j,l}function y(a){var b=(g.start?g.start:0)+a.offset;g.pos=b;var c=[[],[]],d=a.length,e=b+d,f=g.getUint16(),i=6;if(0!==f||i>d)
// unsupported name table format or table "too" small
return c;var j,k,l=g.getUint16(),m=g.getUint16(),n=[],o=12;for(j=0;l>j&&g.pos+o<=e;j++){var p={platform:g.getUint16(),encoding:g.getUint16(),language:g.getUint16(),name:g.getUint16(),length:g.getUint16(),offset:g.getUint16()};
// using only Macintosh and Windows platform/encoding names
(1===p.platform&&0===p.encoding&&0===p.language||3===p.platform&&1===p.encoding&&1033===p.language)&&n.push(p)}for(j=0,k=n.length;k>j;j++){var q=n[j],r=b+m+q.offset;if(!(r+q.length>e)){g.pos=r;var s=q.name;if(q.encoding){for(var t="",u=0,v=q.length;v>u;u+=2)t+=String.fromCharCode(g.getUint16());c[1][s]=t}else c[0][s]=h(g.getBytes(q.length))}}return c}
// 0xC0-DF == -1 and 0xE0-FF == -2
function z(a,c){for(var d,e,f,g,h,i=a.data,j=0,k=0,l=0,m=[],n=[],o=[],p=c.tooComplexToFollowFunctions,q=!1,r=0,s=0,t=i.length;t>j;){var u=i[j++];
// The TrueType instruction set docs can be found at
// https://developer.apple.com/fonts/TTRefMan/RM05/Chap5.html
if(64===u)if(// NPUSHB - pushes n bytes
e=i[j++],q||s)j+=e;else for(d=0;e>d;d++)m.push(i[j++]);else if(65===u)if(// NPUSHW - pushes n words
e=i[j++],q||s)j+=2*e;else for(d=0;e>d;d++)f=i[j++],m.push(f<<8|i[j++]);else if(176===(248&u))if(// PUSHB - pushes bytes
e=u-176+1,q||s)j+=e;else for(d=0;e>d;d++)m.push(i[j++]);else if(184===(248&u))if(// PUSHW - pushes words
e=u-184+1,q||s)j+=2*e;else for(d=0;e>d;d++)f=i[j++],m.push(f<<8|i[j++]);else if(43!==u||p)if(44!==u||p){if(45===u)// ENDF - end of function
if(q)q=!1,k=j;else{if(h=n.pop(),!h)return b("TT: ENDF bad stack"),void(c.hintsValid=!1);g=o.pop(),i=h.data,j=h.i,c.functionsStackDeltas[g]=m.length-h.stackTop}else if(137===u)// IDEF - instruction definition
(q||s)&&(b("TT: nested IDEFs not allowed"),p=!0),q=!0,
// recording it as a function to track ENDF
l=j;else if(88===u)// IF
++r;else if(27===u)// ELSE
s=r;else if(89===u)// EIF
s===r&&(s=0),--r;else if(28===u&&!q&&!s){var v=m[m.length-1];
// only jumping forward to prevent infinite loop
v>0&&(j+=v-1)}}else// FDEF
(q||s)&&(b("TT: nested FDEFs not allowed"),p=!0),q=!0,
// collecting inforamtion about which functions are defined
l=j,g=m.pop(),c.functionsDefined[g]={data:i,i:j};else// CALL
if(!q&&!s)if(
// collecting inforamtion about which functions are used
g=m[m.length-1],c.functionsUsed[g]=!0,g in c.functionsStackDeltas)m.length+=c.functionsStackDeltas[g];else if(g in c.functionsDefined&&o.indexOf(g)<0){if(n.push({data:i,i:j,stackTop:m.length-1}),o.push(g),h=c.functionsDefined[g],!h)return b("TT: CALL non-existent function"),void(c.hintsValid=!1);i=h.data,j=h.i}
// Adjusting stack not extactly, but just enough to get function id
if(!q&&!s){var w=142>=u?E[u]:u>=192&&223>=u?-1:u>=224?-2:0;for(u>=113&&117>=u&&(e=m.pop(),e===e&&(w=2*-e));0>w&&m.length>0;)m.pop(),w++;for(;w>0;)m.push(NaN),// pushing any number into stack
w--}}c.tooComplexToFollowFunctions=p;var x=[i];j>i.length&&x.push(new Uint8Array(j-i.length)),l>k&&(b("TT: complementing a missing function tail"),
// new function definition started, but not finished
// complete function by [CLEAR, ENDF]
x.push(new Uint8Array([34,45]))),B(a,x)}function A(a,c){if(!a.tooComplexToFollowFunctions){if(a.functionsDefined.length>c)return b("TT: more functions defined than expected"),void(a.hintsValid=!1);for(var d=0,e=a.functionsUsed.length;e>d;d++){if(d>c)return b("TT: invalid function id: "+d),void(a.hintsValid=!1);if(a.functionsUsed[d]&&!a.functionsDefined[d])return b("TT: undefined function: "+d),void(a.hintsValid=!1)}}}function B(a,b){if(b.length>1){
// concatenating the content items
var c,d,e=0;for(c=0,d=b.length;d>c;c++)e+=b[c].length;e=e+3&-4;var f=new Uint8Array(e),g=0;for(c=0,d=b.length;d>c;c++)f.set(b[c],g),g+=b[c].length;a.data=f,a.length=e}}function C(a,b,c){var d={functionsDefined:[],functionsUsed:[],functionsStackDeltas:[],tooComplexToFollowFunctions:!1,hintsValid:!0};if(a&&z(a,d),b&&z(b,d),a&&A(d,Q),c&&1&c.length){var e=new Uint8Array(c.length+1);e.set(c.data),c.data=e}return d.hintsValid}function D(a,b){return U[a]?b>=0&&Z.has(b)?!0:!1:!0}var E=[0,0,0,0,0,0,0,0,-2,-2,-2,-2,0,0,-2,-5,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,-1,-1,1,-1,-999,0,1,0,-1,-2,0,-1,-2,-1,-1,0,-1,-1,0,0,-999,-999,-1,-1,-1,-1,-2,-999,-2,-2,-999,0,-2,-2,0,0,-2,0,-2,0,0,0,-2,-1,-1,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,0,-999,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,-2,-999,-999,-999,-999,-999,-1,-1,-2,-2,0,0,0,0,-1,-1,-999,-2,-2,0,0,-1,-2,-2,0,0,0,-1,-1,-1,-2];
// The following steps modify the original font data, making copy
g=new Gc(new Uint8Array(g.getBytes()));for(var F,G,H,I=["OS/2","cmap","head","hhea","hmtx","maxp","name","post","loca","glyf","fpgm","prep","cvt ","CFF "],J=l(g),K=J.numTables,L={"OS/2":null,cmap:null,head:null,hhea:null,hmtx:null,maxp:null,name:null,post:null},M=0;K>M;M++)H=k(g),I.indexOf(H.tag)<0||0!==H.length&&(L[H.tag]=H);var N=!L["CFF "];if(N)L.glyf&&L.loca||c('Required "glyf" or "loca" tables are not found'),this.isOpenType=!1;else{
// OpenType font
if(!("OTTO"!==J.version&&L.head&&L.hhea&&L.maxp&&L.post))
// no major tables: throwing everything at CFFFont
return G=new Gc(L["CFF "].data),F=new dc(G,j),this.convert(d,F,j);delete L.glyf,delete L.loca,delete L.fpgm,delete L.prep,delete L["cvt "],this.isOpenType=!0}L.maxp||c('Required "maxp" table is not found'),g.pos=(g.start||0)+L.maxp.offset;var O=g.getInt32(),P=g.getUint16(),Q=0;if(O>=65536&&L.maxp.length>=22){
// maxZones can be invalid
g.pos+=8;var R=g.getUint16();R>2&&(// reset to 2 if font has invalid maxZones
L.maxp.data[14]=0,L.maxp.data[15]=2),g.pos+=4,Q=g.getUint16()}var S=!1;"CIDFontType2"===j.type&&j.toUnicode&&j.toUnicode.get(0)>"\x00"&&(
// oracle's defect (see 3427), duplicating first entry
S=!0,P++,L.maxp.data[4]=P>>8,L.maxp.data[5]=255&P);var T=C(L.fpgm,L.prep,L["cvt "],Q);T||(delete L.fpgm,delete L.prep,delete L["cvt "]),
// Ensure the hmtx table contains the advance width and
// sidebearings information for numGlyphs in the maxp table
n(g,L.hhea,L.hmtx,P),L.head||c('Required "head" table is not found'),v(L.head,P,N?L.loca.length:0);var U={};if(N){var V=f(L.head.data[50],L.head.data[51]);U=w(L.loca,L.glyf,P,V,T,S)}
// The 'post' table has glyphs names.
if(L.hhea||c('Required "hhea" table is not found'),
// Sanitizer reduces the glyph advanceWidth to the maxAdvanceWidth
// Sometimes it's 0. That needs to be fixed
0===L.hhea.data[10]&&0===L.hhea.data[11]&&(L.hhea.data[10]=255,L.hhea.data[11]=255),L.post){var W=x(L.post,j,P);W||(L.post=null)}var X,Y=[],Z=j.toUnicode;if("CIDFontType2"===j.type){var $=j.cidToGidMap||[],_=0===$.length;j.cMap.forEach(function(a,b){e(65535>=b,"Max size of CID is 65,535");var c=-1;_?c=a:void 0!==$[b]&&(c=$[b]),c>=0&&P>c&&D(c,a)&&(Y[a]=c)}),S&&(Y[0]=P-1)}else{
// Most of the following logic in this code branch is based on the
// 9.6.6.4 of the PDF spec.
var aa=m(L.cmap,g,this.isSymbolicFont),ba=aa.platformId,ca=aa.encodingId,da=aa.mappings,ea=da.length,fa=j.differences.length||!!j.baseEncodingName;
// The spec seems to imply that if the font is symbolic the encoding
// should be ignored, this doesn't appear to work for 'preistabelle.pdf'
// where the the font is symbolic and it has an encoding.
if(fa&&(3===ba&&1===ca||1===ba&&0===ca)||-1===ba&&-1===ca&&Lb[j.baseEncodingName]){// Temporary hack
// When no preferred cmap table was found and |baseEncodingName| is
// one of the predefined encodings, we seem to obtain a better
// |charCodeToGlyphId| map from the code below (fixes bug 1057544).
// TODO: Note that this is a hack which should be removed as soon as
//       we have proper support for more exotic cmap tables.
var ga=[];for(("MacRomanEncoding"===j.baseEncodingName||"WinAnsiEncoding"===j.baseEncodingName)&&(ga=Lb[j.baseEncodingName]),X=0;256>X;X++){var ha;if(ha=this.differences&&X in this.differences?this.differences[X]:X in ga&&""!==ga[X]?ga[X]:Lb.StandardEncoding[X]){var ia;3===ba&&1===ca?ia=tc[ha]:1===ba&&0===ca&&(
// TODO: the encoding needs to be updated with mac os table.
ia=Lb.MacRomanEncoding.indexOf(ha));var ja=!1;for(M=0;ea>M;++M)if(da[M].charCode===ia&&D(da[M].glyphId,ia)){Y[X]=da[M].glyphId,ja=!0;break}if(!ja&&j.glyphNames){
// Try to map using the post table. There are currently no known
// pdfs that this fixes.
var ka=j.glyphNames.indexOf(ha);ka>0&&D(ka,-1)&&(Y[X]=ka)}}}}else if(0===ba&&0===ca)
// Default Unicode semantics, use the charcodes as is.
for(M=0;ea>M;++M)Y[da[M].charCode]=da[M].glyphId;else
// For (3, 0) cmap tables:
// The charcode key being stored in charCodeToGlyphId is the lower
// byte of the two-byte charcodes of the cmap table since according to
// the spec: 'each byte from the string shall be prepended with the
// high byte of the range [of charcodes in the cmap table], to form
// a two-byte character, which shall be used to select the
// associated glyph description from the subtable'.
//
// For (1, 0) cmap tables:
// 'single bytes from the string shall be used to look up the
// associated glyph descriptions from the subtable'. This means
// charcodes in the cmap will be single bytes, so no-op since
// glyph.charCode & 0xFF === glyph.charCode
for(M=0;ea>M;++M)X=255&da[M].charCode,Y[X]=da[M].glyphId}0===Y.length&&(
// defines at least one glyph
Y[0]=0);
// Converting glyphs and ids into font's cmap table
var la=o(Y,j);if(this.toFontChar=la.toFontChar,L.cmap={tag:"cmap",data:q(la.charCodeToGlyphId)},!L["OS/2"]||!r(L["OS/2"])){
// extract some more font properties from the OpenType head and
// hhea tables; yMin and descent value are always negative
var ma={unitsPerEm:f(L.head.data[18],L.head.data[19]),yMax:f(L.head.data[42],L.head.data[43]),yMin:f(L.head.data[38],L.head.data[39])-65536,ascent:f(L.hhea.data[4],L.hhea.data[5]),descent:f(L.hhea.data[6],L.hhea.data[7])-65536};L["OS/2"]={tag:"OS/2",data:s(j,la.charCodeToGlyphId,ma)}}if(
// Rewrite the 'post' table if needed
L.post||(L.post={tag:"post",data:t(j)}),!N)try{
// Trying to repair CFF file
G=new Gc(L["CFF "].data);var na=new ec(G,j);F=na.parse();var oa=new rc(F);L["CFF "].data=oa.compile()}catch(pa){b("Failed to compile font "+j.loadedName)}
// Re-creating 'name' table
if(L.name){
// ... using existing 'name' table as prototype
var qa=y(L.name);L.name.data=u(d,qa)}else L.name={tag:"name",data:u(this.name)};var ra=new Yb(J.version);for(var sa in L)ra.addTable(sa,L[sa].data);return ra.toArray()},convert:function(a,b,c){function d(a,b){var c=null;for(var d in a)b===a[d]&&(c||(c=[]),c.push(0|d));return c}function e(a,b){for(var c in a)if(b===a[c])return 0|c;return g.charCodeToGlyphId[g.nextAvailableFontCharCode]=b,g.nextAvailableFontCharCode++}
// TODO: Check the charstring widths to determine this.
c.fixedPitch=!1;var f=b.getGlyphMapping(c),g=o(f,c);this.toFontChar=g.toFontChar;var h=b.numGlyphs,i=b.seacs;if(Jb&&i&&i.length){var j=c.fontMatrix||Q,m=b.getCharset(),n=Object.create(null);for(var p in i){p|=0;var r=i[p],v=Lb.StandardEncoding[r[2]],w=Lb.StandardEncoding[r[3]],x=m.indexOf(v),y=m.indexOf(w);if(!(0>x||0>y)){var z={x:r[0]*j[0]+r[1]*j[2]+j[4],y:r[0]*j[1]+r[1]*j[3]+j[5]},A=d(f,p);if(A)for(var B=0,C=A.length;C>B;B++){var D=A[B],E=g.charCodeToGlyphId,F=e(E,x),G=e(E,y);n[D]={baseFontCharCode:F,accentFontCharCode:G,accentOffset:z}}}}c.seacMap=n}var H=1/(c.fontMatrix||Q)[0],I=new Yb("OTTO");
// PostScript Font Program
// OS/2 and Windows Specific metrics
// Character to glyphs mapping
// Font header
// Flags
// unitsPerEM
// xMin
// yMin
// xMax
// yMax
// macStyle
// glyphDataFormat
// Horizontal header
// Version number
// Typographic Ascent
// Typographic Descent
// xMaxExtent
// caretSlopeRise
// caretSlopeRun
// metricDataFormat
// Number of HMetrics
// Horizontal metrics
// Maximum profile
// Version number
// Num of glyphs
// Naming tables
// PostScript informations
return I.addTable("CFF ",b.data),I.addTable("OS/2",s(c,g.charCodeToGlyphId)),I.addTable("cmap",q(g.charCodeToGlyphId)),I.addTable("head","\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00_<õ\x00\x00"+l(H)+"\x00\x00\x00\x00~'\x00\x00\x00\x00~'\x00\x00"+l(c.descent)+"ÿ"+l(c.ascent)+k(c.italicAngle?2:0)+"\x00\x00\x00\x00\x00\x00\x00"),I.addTable("hhea","\x00\x00\x00"+l(c.ascent)+l(c.descent)+"\x00\x00ÿÿ\x00\x00\x00\x00\x00\x00"+l(c.capHeight)+l(Math.tan(c.italicAngle)*c.xHeight)+"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"+k(h)),I.addTable("hmtx",function(){// Fake .notdef
for(var a=b.charstrings,c=b.cff?b.cff.widths:null,d="\x00\x00\x00\x00",e=1,f=h;f>e;e++){var g=0;if(a){var i=a[e-1];g="width"in i?i.width:0}else c&&(g=Math.ceil(c[e]||0));d+=k(g)+k(0)}return d}()),I.addTable("maxp","\x00\x00P\x00"+k(h)),I.addTable("name",u(a)),I.addTable("post",t(c)),I.toArray()},/**
     * Builds a char code to unicode map based on section 9.10 of the spec.
     * @param {Object} properties Font properties object.
     * @return {Object} A ToUnicodeMap object.
     */
buildToUnicode:function(a){
// Section 9.10.2 Mapping Character Codes to Unicode Values
if(a.toUnicode&&0!==a.toUnicode.length)return a.toUnicode;
// According to the spec if the font is a simple font we should only map
// to unicode if the base encoding is MacRoman, MacExpert, or WinAnsi or
// the differences array only contains adobe standard or symbol set names,
// in pratice it seems better to always try to create a toUnicode
// map based of the default encoding.
var b,c;if(!a.composite){b=[];var d=a.defaultEncoding.slice(),f=a.baseEncodingName,g=a.differences;for(c in g)d[c]=g[c];for(c in d){
// a) Map the character code to a character name.
var h=d[c];
// b) Look up the character name in the Adobe Glyph List (see the
//    Bibliography) to obtain the corresponding Unicode value.
if(""!==h)if(void 0!==tc[h])b[c]=String.fromCharCode(tc[h]);else{
// (undocumented) c) Few heuristics to recognize unknown glyphs
// NOTE: Adobe Reader does not do this step, but OSX Preview does
var i=0;switch(h[0]){case"G":// Gxx glyph
3===h.length&&(i=parseInt(h.substr(1),16));break;case"g":// g00xx glyph
5===h.length&&(i=parseInt(h.substr(1),16));break;case"C":// Cddd glyph
case"c":// cddd glyph
h.length>=3&&(i=+h.substr(1))}if(i){
// If |baseEncodingName| is one the predefined encodings,
// and |code| equals |charcode|, using the glyph defined in the
// baseEncoding seems to yield a better |toUnicode| mapping
// (fixes issue 5070).
if(f&&i===+c){var j=Lb[f];if(j&&(h=j[c])){b[c]=String.fromCharCode(tc[h]);continue}}b[c]=String.fromCharCode(i)}}}return new Wb(b)}
// If the font is a composite font that uses one of the predefined CMaps
// listed in Table 118 (except Identity–H and Identity–V) or whose
// descendant CIDFont uses the Adobe-GB1, Adobe-CNS1, Adobe-Japan1, or
// Adobe-Korea1 character collection:
if(a.composite&&(a.cMap.builtInCMap&&!(a.cMap instanceof Bb)||"Adobe"===a.cidSystemInfo.registry&&("GB1"===a.cidSystemInfo.ordering||"CNS1"===a.cidSystemInfo.ordering||"Japan1"===a.cidSystemInfo.ordering||"Korea1"===a.cidSystemInfo.ordering))){
// Then:
// a) Map the character code to a character identifier (CID) according
// to the font’s CMap.
// b) Obtain the registry and ordering of the character collection used
// by the font’s CMap (for example, Adobe and Japan1) from its
// CIDSystemInfo dictionary.
var k=a.cidSystemInfo.registry,l=a.cidSystemInfo.ordering,m=new ta(k+"-"+l+"-UCS2"),n=Db.create(m,{url:PDFJS.cMapUrl,packed:PDFJS.cMapPacked},null),o=a.cMap;return b=[],o.forEach(function(a,c){e(65535>=c,"Max size of CID is 65,535");
// e) Map the CID obtained in step (a) according to the CMap obtained
// in step (d), producing a Unicode value.
var d=n.lookup(c);d&&(b[a]=String.fromCharCode((d.charCodeAt(0)<<8)+d.charCodeAt(1)))}),new Wb(b)}
// The viewer's choice, just use an identity map.
return new Xb(a.firstChar,a.lastChar)},get spaceWidth(){if("_shadowWidth"in this)return this._shadowWidth;for(var a,b=["space","minus","one","i"],c=0,d=b.length;d>c;c++){var e=b[c];
// if possible, getting width by glyph name
if(e in this.widths){a=this.widths[e];break}var f=tc[e],g=0;if(this.composite&&this.cMap.contains(f)&&(g=this.cMap.lookup(f)),
// ... via toUnicode map
!g&&"toUnicode"in this&&(g=this.toUnicode.charCodeOf(f)),
// setting it to unicode if negative or undefined
0>=g&&(g=f),
// trying to get width via charcode
a=this.widths[g])break}
// Do not shadow the property here. See discussion:
// https://github.com/mozilla/pdf.js/pull/2127#discussion_r1662280
return a=a||this.defaultWidth,this._shadowWidth=a,a},charToGlyph:function(a){var b,c,d,e=a;this.cMap&&this.cMap.contains(a)&&(e=this.cMap.lookup(a)),c=this.widths[e],c=v(c)?c:this.defaultWidth;var f=this.vmetrics&&this.vmetrics[e],g=this.toUnicode.get(a)||a;"number"==typeof g&&(g=String.fromCharCode(g)),
// First try the toFontChar map, if it's not there then try falling
// back to the char code.
b=this.toFontChar[a]||a,this.missingFile&&(b=H(b)),this.isType3Font&&(
// Font char code in this case is actually a glyph name.
d=b);var h=null;if(this.seacMap&&this.seacMap[a]){var i=this.seacMap[a];b=i.baseFontCharCode,h={fontChar:String.fromCharCode(i.accentFontCharCode),offset:i.accentOffset}}var j=String.fromCharCode(b),k=this.glyphCache[a];return k&&k.matchesForCache(j,g,h,c,f,d)||(k=new Vb(j,g,h,c,f,d),this.glyphCache[a]=k),k},charsToGlyphs:function(a){var b,c,d,e=this.charsCache;
// if we translated this string before, just grab it from the cache
if(e&&(b=e[a]))return b;
// lazily create the translation cache
e||(e=this.charsCache=Object.create(null)),b=[];var f,g=a,h=0;if(this.cMap)for(
// composite fonts have multi-byte strings convert the string from
// single-byte to multi-byte
var i={};h<a.length;){this.cMap.readCharCode(a,h,i),d=i.charcode;var j=i.length;h+=j,c=this.charToGlyph(d),b.push(c),
// placing null after each word break charcode (ASCII SPACE)
// Ignore occurences of 0x20 in multiple-byte codes.
1===j&&32===a.charCodeAt(h-1)&&b.push(null)}else for(h=0,f=a.length;f>h;++h)d=a.charCodeAt(h),c=this.charToGlyph(d),b.push(c),32===d&&b.push(null);
// Enter the translated string into the cache
return e[g]=b}},d}(),$b=function(){function a(a){this.error=a,this.loadedName="g_font_error",this.loading=!1}return a.prototype={charsToGlyphs:function(){return[]},exportData:function(){return{error:this.error}}},a}(),_b=function(){function a(){this.width=0,this.lsb=0,this.flexing=!1,this.output=[],this.stack=[]}var c={hstem:[1],vstem:[3],vmoveto:[4],rlineto:[5],hlineto:[6],vlineto:[7],rrcurveto:[8],callsubr:[10],flex:[12,35],drop:[12,18],endchar:[14],rmoveto:[21],hmoveto:[22],vhcurveto:[30],hvcurveto:[31]};return a.prototype={convert:function(a,d){for(var e,f,g,h=a.length,i=!1,j=0;h>j;j++){var k=a[j];if(32>k){switch(12===k&&(k=(k<<8)+a[++j]),k){case 1:// hstem
if(!Ib){this.stack=[];break}i=this.executeCommand(2,c.hstem);break;case 3:// vstem
if(!Ib){this.stack=[];break}i=this.executeCommand(2,c.vstem);break;case 4:// vmoveto
if(this.flexing){if(this.stack.length<1){i=!0;break}
// Add the dx for flex and but also swap the values so they are
// the right order.
var l=this.stack.pop();this.stack.push(0,l);break}i=this.executeCommand(1,c.vmoveto);break;case 5:// rlineto
i=this.executeCommand(2,c.rlineto);break;case 6:// hlineto
i=this.executeCommand(1,c.hlineto);break;case 7:// vlineto
i=this.executeCommand(1,c.vlineto);break;case 8:// rrcurveto
i=this.executeCommand(6,c.rrcurveto);break;case 9:// closepath
// closepath is a Type1 command that does not take argument and is
// useless in Type2 and it can simply be ignored.
this.stack=[];break;case 10:// callsubr
if(this.stack.length<1){i=!0;break}g=this.stack.pop(),i=this.convert(d[g],d);break;case 11:// return
return i;case 13:// hsbw
if(this.stack.length<2){i=!0;break}
// To convert to type2 we have to move the width value to the
// first part of the charstring and then use hmoveto with lsb.
e=this.stack.pop(),f=this.stack.pop(),this.lsb=f,this.width=e,this.stack.push(e,f),i=this.executeCommand(2,c.hmoveto);break;case 14:// endchar
this.output.push(c.endchar[0]);break;case 21:// rmoveto
if(this.flexing)break;i=this.executeCommand(2,c.rmoveto);break;case 22:// hmoveto
if(this.flexing){
// Add the dy for flex.
this.stack.push(0);break}i=this.executeCommand(1,c.hmoveto);break;case 30:// vhcurveto
i=this.executeCommand(4,c.vhcurveto);break;case 31:// hvcurveto
i=this.executeCommand(4,c.hvcurveto);break;case 3072:// dotsection
// dotsection is a Type1 command to specify some hinting feature
// for dots that do not take a parameter and it can safely be
// ignored for Type2.
this.stack=[];break;case 3073:// vstem3
if(!Ib){this.stack=[];break}
// [vh]stem3 are Type1 only and Type2 supports [vh]stem with
// multiple parameters, so instead of returning [vh]stem3 take a
// shortcut and return [vhstem] instead.
i=this.executeCommand(2,c.vstem);break;case 3074:// hstem3
if(!Ib){this.stack=[];break}
// See vstem3.
i=this.executeCommand(2,c.hstem);break;case 3078:// seac
// seac is like type 2's special endchar but it doesn't use the
// first argument asb, so remove it.
Jb?(this.seac=this.stack.splice(-4,4),i=this.executeCommand(0,c.endchar)):i=this.executeCommand(4,c.endchar);break;case 3079:// sbw
if(this.stack.length<4){i=!0;break}
// To convert to type2 we have to move the width value to the
// first part of the charstring and then use rmoveto with
// (dx, dy). The height argument will not be used for vmtx and
// vhea tables reconstruction -- ignoring it.
this.stack.pop();e=this.stack.pop();var m=this.stack.pop();f=this.stack.pop(),this.lsb=f,this.width=e,this.stack.push(e,f,m),i=this.executeCommand(3,c.rmoveto);break;case 3084:// div
if(this.stack.length<2){i=!0;break}var n=this.stack.pop(),o=this.stack.pop();this.stack.push(o/n);break;case 3088:// callothersubr
if(this.stack.length<2){i=!0;break}g=this.stack.pop();var p=this.stack.pop();if(0===g&&3===p){var q=this.stack.splice(this.stack.length-17,17);this.stack.push(q[2]+q[0],// bcp1x + rpx
q[3]+q[1],// bcp1y + rpy
q[4],// bcp2x
q[5],// bcp2y
q[6],// p2x
q[7],// p2y
q[8],// bcp3x
q[9],// bcp3y
q[10],// bcp4x
q[11],// bcp4y
q[12],// p3x
q[13],// p3y
q[14]),i=this.executeCommand(13,c.flex,!0),this.flexing=!1,this.stack.push(q[15],q[16])}else 1===g&&0===p&&(this.flexing=!0);break;case 3089:// pop
// Ignore this since it is only used with othersubr.
break;case 3105:// setcurrentpoint
// Ignore for now.
this.stack=[];break;default:b('Unknown type 1 charstring command of "'+k+'"')}if(i)break}else 246>=k?k-=139:k=250>=k?256*(k-247)+a[++j]+108:254>=k?-(256*(k-251))-a[++j]-108:(255&a[++j])<<24|(255&a[++j])<<16|(255&a[++j])<<8|(255&a[++j])<<0,this.stack.push(k)}return i},executeCommand:function(a,b,c){var d=this.stack.length;if(a>d)return!0;for(var e=d-a,f=e;d>f;f++){var g=this.stack[f];g===(0|g)?// int
this.output.push(28,g>>8&255,255&g):(// fixed point
g=65536*g|0,this.output.push(255,g>>24&255,g>>16&255,g>>8&255,255&g))}return this.output.push.apply(this.output,b),c?this.stack.splice(e,a):this.stack.length=0,!1}},a}(),ac=function(){function a(a){// '0'-'9'
// 'A'-'F'
return a>=48&&57>=a||a>=65&&70>=a||a>=97&&102>=a}function b(a,b,c){for(var d=0|b,e=52845,f=22719,g=a.length,h=new Uint8Array(g),i=0;g>i;i++){var j=a[i];h[i]=j^d>>8,d=(j+d)*e+f&65535}return Array.prototype.slice.call(h,c)}function c(b,c,d){var e,f,g=0|c,h=52845,i=22719,j=b.length,k=j>>>1,l=new Uint8Array(k);for(e=0,f=0;j>e;e++){var m=b[e];if(a(m)){e++;for(var n;j>e&&!a(n=b[e]);)e++;if(j>e){var o=parseInt(String.fromCharCode(m,n),16);l[f++]=o^g>>8,g=(o+g)*h+i&65535}}}return Array.prototype.slice.call(l,d,f)}function d(a){// '/'
// '[', ']'
// '{', '}'
return 47===a||91===a||93===a||123===a||125===a||40===a||41===a}function e(d,e){if(e){var g=d.getBytes(),h=!(a(g[0])&&a(g[1])&&a(g[2])&&a(g[3]));d=new Gc(h?b(g,f,4):c(g,f,4))}this.stream=d,this.nextChar()}/*
   * Decrypt a Sequence of Ciphertext Bytes to Produce the Original Sequence
   * of Plaintext Bytes. The function took a key as a parameter which can be
   * for decrypting the eexec block of for decoding charStrings.
   */
var f=55665,g=4330;return e.prototype={readNumberArray:function(){this.getToken();for(// read '[' or '{' (arrays can start with either)
var a=[];;){var b=this.getToken();if(null===b||"]"===b||"}"===b)break;a.push(parseFloat(b||0))}return a},readNumber:function(){var a=this.getToken();return parseFloat(a||0)},readInt:function(){
// Use '| 0' to prevent setting a double into length such as the double
// does not flow into the loop variable.
var a=this.getToken();return 0|parseInt(a||0,10)},readBoolean:function(){var a=this.getToken();
// Use 1 and 0 since that's what type2 charstrings use.
return"true"===a?1:0},nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){for(
// Eat whitespace and comments.
var a=!1,b=this.currentChar;;){if(-1===b)return null;if(a)(10===b||13===b)&&(a=!1);else if(37===b)// '%'
a=!0;else if(!Ac.isSpace(b))break;b=this.nextChar()}if(d(b))return this.nextChar(),String.fromCharCode(b);var c="";do c+=String.fromCharCode(b),b=this.nextChar();while(b>=0&&!Ac.isSpace(b)&&!d(b));return c},/*
     * Returns an object containing a Subrs array and a CharStrings
     * array extracted from and eexec encrypted block of data
     */
extractFontProgram:function(){for(var a,c,d,e,f,h=this.stream,i=[],j=[],k={subrs:[],charstrings:[],properties:{privateData:{lenIV:4}}};null!==(a=this.getToken());)if("/"===a)switch(a=this.getToken()){case"CharStrings":// read in 'begin'
for(
// The number immediately following CharStrings must be greater or
// equal to the number of CharStrings.
this.getToken(),this.getToken(),// read in 'dict'
this.getToken(),// read in 'dup'
this.getToken();;){if(a=this.getToken(),null===a||"end"===a)break;if("/"===a){var l=this.getToken();c=this.readInt(),this.getToken(),// read in 'RD' or '-|'
d=h.makeSubStream(h.pos,c),e=k.properties.privateData.lenIV,f=b(d.getBytes(),g,e),
// Skip past the required space and binary data.
h.skip(c),this.nextChar(),a=this.getToken(),// read in 'ND' or '|-'
"noaccess"===a&&this.getToken(),j.push({glyph:l,encoded:f})}}break;case"Subrs":this.readInt();// read in 'array'
for(this.getToken();"dup"===(a=this.getToken());){var m=this.readInt();c=this.readInt(),this.getToken(),// read in 'RD' or '-|'
d=h.makeSubStream(h.pos,c),e=k.properties.privateData.lenIV,f=b(d.getBytes(),g,e),
// Skip past the required space and binary data.
h.skip(c),this.nextChar(),a=this.getToken(),// read in 'NP' or '|'
"noaccess"===a&&this.getToken(),i[m]=f}break;case"BlueValues":case"OtherBlues":case"FamilyBlues":case"FamilyOtherBlues":var n=this.readNumberArray();
// *Blue* values may contain invalid data: disables reading of
// those values when hinting is disabled.
n.length>0&&n.length%2===0&&Ib&&(k.properties.privateData[a]=n);break;case"StemSnapH":case"StemSnapV":k.properties.privateData[a]=this.readNumberArray();break;case"StdHW":case"StdVW":k.properties.privateData[a]=this.readNumberArray()[0];break;case"BlueShift":case"lenIV":case"BlueFuzz":case"BlueScale":case"LanguageGroup":case"ExpansionFactor":k.properties.privateData[a]=this.readNumber();break;case"ForceBold":k.properties.privateData[a]=this.readBoolean()}for(var o=0;o<j.length;o++){l=j[o].glyph,f=j[o].encoded;var p=new _b,q=p.convert(f,i),r=p.output;q&&(
// It seems when FreeType encounters an error while evaluating a glyph
// that it completely ignores the glyph so we'll mimic that behaviour
// here and put an endchar to make the validator happy.
r=[14]),k.charstrings.push({glyphName:l,charstring:r,width:p.width,lsb:p.lsb,seac:p.seac})}return k},extractFontHeader:function(a){for(var b;null!==(b=this.getToken());)if("/"===b)switch(b=this.getToken()){case"FontMatrix":var c=this.readNumberArray();a.fontMatrix=c;break;case"Encoding":var d,e=this.getToken();if(/^\d+$/.test(e)){d=[];var f=0|parseInt(e,10);this.getToken();// read in 'array'
for(var g=0;f>g;g++){
// skipping till first dup or def (e.g. ignoring for statement)
for(b=this.getToken();"dup"!==b&&"def"!==b;)if(b=this.getToken(),null===b)return;if("def"===b)break;var h=this.readInt();this.getToken();// read in '/'
var i=this.getToken();d[h]=i,this.getToken()}}else
// encoding name is specified
d=Lb[e];a.builtInEncoding=d;break;case"FontBBox":var j=this.readNumberArray();
// adjusting ascent/descent
a.ascent=j[3],a.descent=j[1],a.ascentScaled=!0}}},e}(),bc=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],cc=function(a,b,c){
// Some bad generators embed pfb file as is, we have to strip 6-byte headers.
// Also, length1 and length2 might be off by 6 bytes as well.
// http://www.math.ubc.ca/~cass/piscript/type1.pdf
var d=6,e=c.length1,f=c.length2,g=b.peekBytes(d),h=128===g[0]&&1===g[1];h&&(b.skip(d),e=g[5]<<24|g[4]<<16|g[3]<<8|g[2]);
// Get the data block containing glyphs and subrs informations
var i=new Gc(b.getBytes(e)),j=new ac(i);j.extractFontHeader(c),h&&(g=b.getBytes(d),f=g[5]<<24|g[4]<<16|g[3]<<8|g[2]);
// Decrypt the data blocks and retrieve it's content
var k=new Gc(b.getBytes(f)),l=new ac(k,!0),m=l.extractFontProgram();for(var n in m.properties)c[n]=m.properties[n];var o=m.charstrings,p=this.getType2Charstrings(o),q=this.getType2Subrs(m.subrs);this.charstrings=o,this.data=this.wrap(a,p,this.charstrings,q,c),this.seacs=this.getSeacs(m.charstrings)};cc.prototype={get numGlyphs(){return this.charstrings.length+1},getCharset:function(){for(var a=[".notdef"],b=this.charstrings,c=0;c<b.length;c++)a.push(b[c].glyphName);return a},getGlyphMapping:function(a){var b,c=this.charstrings,d=[".notdef"];for(b=0;b<c.length;b++)d.push(c[b].glyphName);var e=a.builtInEncoding;if(e){var f={};for(var g in e)b=d.indexOf(e[g]),b>=0&&(f[g]=b)}return N(a,f,d)},getSeacs:function(a){var b,c,d=[];for(b=0,c=a.length;c>b;b++){var e=a[b];e.seac&&(
// Offset by 1 for .notdef
d[b+1]=e.seac)}return d},getType2Charstrings:function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c].charstring);return b},getType2Subrs:function(a){var b=0,c=a.length;b=1133>c?107:33769>c?1131:32768;
// Add a bunch of empty subrs to deal with the Type2 bias
var d,e=[];for(d=0;b>d;d++)e.push([11]);for(d=0;c>d;d++)e.push(a[d]);return e},wrap:function(a,b,c,d,e){var f=new fc;f.header=new gc(1,0,4,4),f.names=[a];var g=new kc;
// CFF strings IDs 0...390 are predefined names, so refering
// to entries in our own String INDEX starts at SID 391.
g.setByName("version",391),g.setByName("Notice",392),g.setByName("FullName",393),g.setByName("FamilyName",394),g.setByName("Weight",395),g.setByName("Encoding",null),// placeholder
g.setByName("FontMatrix",e.fontMatrix),g.setByName("FontBBox",e.bbox),g.setByName("charset",null),// placeholder
g.setByName("CharStrings",null),// placeholder
g.setByName("Private",null),// placeholder
f.topDict=g;var h=new hc;h.add("Version 0.11"),// Version
h.add("See original notice"),// Notice
h.add(a),// FullName
h.add(a),// FamilyName
h.add("Medium"),// Weight
f.strings=h,f.globalSubrIndex=new ic;var i,j,k=b.length,l=[0];for(i=0;k>i;i++){var m=bc.indexOf(c[i].glyphName);
// TODO: Insert the string and correctly map it.  Previously it was
// thought mapping names that aren't in the standard strings to .notdef
// was fine, however in issue818 when mapping them all to .notdef the
// adieresis glyph no longer worked.
-1===m&&(m=0),l.push(m>>8&255,255&m)}f.charset=new nc(!1,0,[],l);var n=new ic;// .notdef
for(n.add([139,14]),i=0;k>i;i++)n.add(b[i]);f.charStrings=n;var o=new lc;o.setByName("Subrs",null);// placeholder
var p=["BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StemSnapH","StemSnapV","BlueShift","BlueFuzz","BlueScale","LanguageGroup","ExpansionFactor","ForceBold","StdHW","StdVW"];for(i=0,j=p.length;j>i;i++){var q=p[i];if(e.privateData.hasOwnProperty(q)){var r=e.privateData[q];if(A(r))
// All of the private dictionary array data in CFF must be stored as
// "delta-encoded" numbers.
for(var s=r.length-1;s>0;s--)r[s]-=r[s-1];o.setByName(q,r)}}f.topDict.privateDict=o;var t=new ic;for(i=0,j=d.length;j>i;i++)t.add(d[i]);o.subrsIndex=t;var u=new rc(f);return u.compile()}};var dc=function(){function a(a,c){this.properties=c;var d=new ec(a,c);this.cff=d.parse();var e=new rc(this.cff);this.seacs=this.cff.seacs;try{this.data=e.compile()}catch(f){b("Failed to compile font "+c.loadedName),
// There may have just been an issue with the compiler, set the data
// anyway and hope the font loaded.
this.data=a}}return a.prototype={get numGlyphs(){return this.cff.charStrings.count},getCharset:function(){return this.cff.charset.charset},getGlyphMapping:function(){var a,b,c=this.cff,d=this.properties,e=c.charset.charset;if(d.composite){if(a=Object.create(null),c.isCIDFont)
// If the font is actually a CID font then we should use the charset
// to map CIDs to GIDs.
for(b=0;b<e.length;b++){var f=e[b],g=d.cMap.charCodeOf(f);a[g]=b}else
// If it is NOT actually a CID font then CIDs should be mapped
// directly to GIDs.
for(b=0;b<c.charStrings.count;b++)a[b]=b;return a}var h=c.encoding?c.encoding.encoding:null;return a=N(d,h,e)}},a}(),ec=function(){function d(a,b){this.bytes=a.getBytes(),this.properties=b}var e=[null,{id:"hstem",min:2,stackClearing:!0,stem:!0},null,{id:"vstem",min:2,stackClearing:!0,stem:!0},{id:"vmoveto",min:1,stackClearing:!0},{id:"rlineto",min:2,resetStack:!0},{id:"hlineto",min:1,resetStack:!0},{id:"vlineto",min:1,resetStack:!0},{id:"rrcurveto",min:6,resetStack:!0},null,{id:"callsubr",min:1,undefStack:!0},{id:"return",min:0,undefStack:!0},null,// 12
null,{id:"endchar",min:0,stackClearing:!0},null,null,null,{id:"hstemhm",min:2,stackClearing:!0,stem:!0},{id:"hintmask",min:0,stackClearing:!0},{id:"cntrmask",min:0,stackClearing:!0},{id:"rmoveto",min:2,stackClearing:!0},{id:"hmoveto",min:1,stackClearing:!0},{id:"vstemhm",min:2,stackClearing:!0,stem:!0},{id:"rcurveline",min:8,resetStack:!0},{id:"rlinecurve",min:8,resetStack:!0},{id:"vvcurveto",min:4,resetStack:!0},{id:"hhcurveto",min:4,resetStack:!0},null,// shortint
{id:"callgsubr",min:1,undefStack:!0},{id:"vhcurveto",min:4,resetStack:!0},{id:"hvcurveto",min:4,resetStack:!0}],f=[null,null,null,{id:"and",min:2,stackDelta:-1},{id:"or",min:2,stackDelta:-1},{id:"not",min:1,stackDelta:0},null,null,null,{id:"abs",min:1,stackDelta:0},{id:"add",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]+a[b-1]}},{id:"sub",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]-a[b-1]}},{id:"div",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]/a[b-1]}},null,{id:"neg",min:1,stackDelta:0,stackFn:function(a,b){a[b-1]=-a[b-1]}},{id:"eq",min:2,stackDelta:-1},null,null,{id:"drop",min:1,stackDelta:-1},null,{id:"put",min:2,stackDelta:-2},{id:"get",min:1,stackDelta:0},{id:"ifelse",min:4,stackDelta:-3},{id:"random",min:0,stackDelta:1},{id:"mul",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]*a[b-1]}},null,{id:"sqrt",min:1,stackDelta:0},{id:"dup",min:1,stackDelta:1},{id:"exch",min:2,stackDelta:0},{id:"index",min:2,stackDelta:0},{id:"roll",min:3,stackDelta:-2},null,null,null,{id:"hflex",min:7,resetStack:!0},{id:"flex",min:13,resetStack:!0},{id:"hflex1",min:9,resetStack:!0},{id:"flex1",min:11,resetStack:!0}];return d.prototype={parse:function(){var a=this.properties,b=new fc;this.cff=b;
// The first five sections must be in order, all the others are reached
// via offsets contained in one of the below.
var c=this.parseHeader(),d=this.parseIndex(c.endPos),e=this.parseIndex(d.endPos),f=this.parseIndex(e.endPos),g=this.parseIndex(f.endPos),h=this.parseDict(e.obj.get(0)),i=this.createDict(kc,h,b.strings);b.header=c.obj,b.names=this.parseNameIndex(d.obj),b.strings=this.parseStringIndex(f.obj),b.topDict=i,b.globalSubrIndex=g.obj,this.parsePrivateDict(b.topDict),b.isCIDFont=i.hasName("ROS");var j=i.getByName("CharStrings"),k=this.parseCharStrings(j);b.charStrings=k.charStrings,b.seacs=k.seacs,b.widths=k.widths;var l=i.getByName("FontMatrix");l&&(a.fontMatrix=l);var m=i.getByName("FontBBox");m&&(
// adjusting ascent/descent
a.ascent=m[3],a.descent=m[1],a.ascentScaled=!0);var n,o;if(b.isCIDFont){for(var p=this.parseIndex(i.getByName("FDArray")).obj,q=0,r=p.count;r>q;++q){var s=p.get(q),t=this.createDict(kc,this.parseDict(s),b.strings);this.parsePrivateDict(t),b.fdArray.push(t)}
// cid fonts don't have an encoding
o=null,n=this.parseCharsets(i.getByName("charset"),b.charStrings.count,b.strings,!0),b.fdSelect=this.parseFDSelect(i.getByName("FDSelect"),b.charStrings.count)}else n=this.parseCharsets(i.getByName("charset"),b.charStrings.count,b.strings,!1),o=this.parseEncoding(i.getByName("Encoding"),a,b.strings,n.charset);return b.charset=n,b.encoding=o,b},parseHeader:function(){
// Prevent an infinite loop, by checking that the offset is within the
// bounds of the bytes array. Necessary in empty, or invalid, font files.
for(var b=this.bytes,d=b.length,e=0;d>e&&1!==b[e];)++e;e>=d?c("Invalid CFF header"):0!==e&&(a("cff data is shifted"),b=b.subarray(e),this.bytes=b);var f=b[0],g=b[1],h=b[2],i=b[3],j=new gc(f,g,h,i);return{obj:j,endPos:h}},parseDict:function(a){function b(){var b=a[e++];return 30===b?d(e):28===b?(b=a[e++],b=(b<<24|a[e++]<<16)>>16):29===b?(b=a[e++],b=b<<8|a[e++],b=b<<8|a[e++],b=b<<8|a[e++]):b>=32&&246>=b?b-139:b>=247&&250>=b?256*(b-247)+a[e++]+108:b>=251&&254>=b?-(256*(b-251))-a[e++]-108:(c("255 is not a valid DICT command"),-1)}function d(){for(var b="",c=15,d=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"],f=a.length;f>e;){var g=a[e++],h=g>>4,i=15&g;if(h===c)break;if(b+=d[h],i===c)break;b+=d[i]}return parseFloat(b)}var e=0,f=[],g=[];e=0;for(var h=a.length;h>e;){var i=a[e];21>=i?(12===i&&(i=i<<8|a[++e]),g.push([i,f]),f=[],++e):f.push(b())}return g},parseIndex:function(a){var b,c,d=new ic,e=this.bytes,f=e[a++]<<8|e[a++],g=[],h=a;if(0!==f){var i=e[a++],j=a+(f+1)*i-1;for(b=0,c=f+1;c>b;++b){for(var k=0,l=0;i>l;++l)k<<=8,k+=e[a++];g.push(j+k)}h=g[f]}for(b=0,c=g.length-1;c>b;++b){var m=g[b],n=g[b+1];d.add(e.subarray(m,n))}return{obj:d,endPos:h}},parseNameIndex:function(a){for(var b=[],c=0,d=a.count;d>c;++c){
// OTS also only permits certain characters in the name.
for(var e=a.get(c),f=Math.min(e.length,127),g=[],i=0;f>i;++i){var j=e[i];(0!==i||0!==j)&&(33>j||j>126||91===j||93===j||40===j||41===j||123===j||125===j||60===j||62===j||47===j||37===j||35===j)?g[i]=95:g[i]=j}b.push(h(g))}return b},parseStringIndex:function(a){for(var b=new hc,c=0,d=a.count;d>c;++c){var e=a.get(c);b.add(h(e))}return b},createDict:function(a,b,c){for(var d=new a(c),e=0,f=b.length;f>e;++e){var g=b[e],h=g[0],i=g[1];d.setByKey(h,i)}return d},parseCharStrings:function(a){for(var c=this.parseIndex(a).obj,d=[],g=[],h=c.count,i=0;h>i;i++){for(var j=c.get(i),k=0,l=[],m=!0,n=0,o=!0,p=j,q=p.length,r=!0,s=0;q>s;){var t=p[s++],u=null;if(12===t){var v=p[s++];0===v?(
// The CFF specification state that the 'dotsection' command
// (12, 0) is deprecated and treated as a no-op, but all Type2
// charstrings processors should support them. Unfortunately
// the font sanitizer don't. As a workaround the sequence (12, 0)
// is replaced by a useless (0, hmoveto).
p[s-2]=139,p[s-1]=22,k=0):u=f[v]}else 28===t?(// number (16 bit)
l[k]=(p[s]<<24|p[s+1]<<16)>>16,s+=2,k++):14===t?(k>=4&&(k-=4,Jb&&(d[i]=l.slice(k,k+4),o=!1)),u=e[t]):t>=32&&246>=t?(// number
l[k]=t-139,k++):t>=247&&254>=t?(// number (+1 bytes)
l[k]=251>t?(t-247<<8)+p[s]+108:-(t-251<<8)-p[s]-108,s++,k++):255===t?(// number (32 bit)
l[k]=(p[s]<<24|p[s+1]<<16|p[s+2]<<8|p[s+3])/65536,s+=4,k++):19===t||20===t?(n+=k>>1,s+=n+7>>3,// skipping right amount of hints flag data
k%=2,u=e[t]):u=e[t];if(u){if(u.stem&&(n+=k>>1),"min"in u&&!m&&k<u.min){b("Not enough parameters for "+u.id+"; actual: "+k+", expected: "+u.min),o=!1;break}r&&u.stackClearing&&(r=!1,
// the optional character width can be found before the first
// stack-clearing command arguments
k-=u.min,k>=2&&u.stem?
// there are even amount of arguments for stem commands
k%=2:k>1&&b("Found too many parameters for stack-clearing command"),k>0&&l[k-1]>=0&&(g[i]=l[k-1])),"stackDelta"in u?("stackFn"in u&&u.stackFn(l,k),k+=u.stackDelta):u.stackClearing?k=0:u.resetStack?(k=0,m=!1):u.undefStack&&(k=0,m=!0,r=!1)}}o||
// resetting invalid charstring to single 'endchar'
c.set(i,new Uint8Array([14]))}return{charStrings:c,seacs:d,widths:g}},emptyPrivateDictionary:function(a){var b=this.createDict(lc,[],a.strings);a.setByKey(18,[0,0]),a.privateDict=b},parsePrivateDict:function(a){
// no private dict, do nothing
if(!a.hasName("Private"))return void this.emptyPrivateDictionary(a);var b=a.getByName("Private");
// make sure the params are formatted correctly
if(!A(b)||2!==b.length)return void a.removeByName("Private");var c=b[0],d=b[1];
// remove empty dicts or ones that refer to invalid location
if(0===c||d>=this.bytes.length)return void this.emptyPrivateDictionary(a);var e=d+c,f=this.bytes.subarray(d,e),g=this.parseDict(f),h=this.createDict(lc,g,a.strings);
// Parse the Subrs index also since it's relative to the private dict.
if(a.privateDict=h,h.getByName("Subrs")){var i=h.getByName("Subrs"),j=d+i;
// Validate the offset.
if(0===i||j>=this.bytes.length)return void this.emptyPrivateDictionary(a);var k=this.parseIndex(j);h.subrsIndex=k.obj}},parseCharsets:function(a,b,d,e){if(0===a)return new nc(!0,mc.ISO_ADOBE,Ea);if(1===a)return new nc(!0,mc.EXPERT,Fa);if(2===a)return new nc(!0,mc.EXPERT_SUBSET,Ga);var f,g,h,i=this.bytes,j=a,k=i[a++],l=[".notdef"];switch(
// subtract 1 for the .notdef glyph
b-=1,k){case 0:for(h=0;b>h;h++)f=i[a++]<<8|i[a++],l.push(e?f:d.get(f));break;case 1:for(;l.length<=b;)for(f=i[a++]<<8|i[a++],g=i[a++],h=0;g>=h;h++)l.push(e?f++:d.get(f++));break;case 2:for(;l.length<=b;)for(f=i[a++]<<8|i[a++],g=i[a++]<<8|i[a++],h=0;g>=h;h++)l.push(e?f++:d.get(f++));break;default:c("Unknown charset format")}
// Raw won't be needed if we actually compile the charset.
var m=a,n=i.subarray(j,m);return new nc(!1,k,l,n)},parseEncoding:function(a,b,d,e){function f(){var b=k[a++];for(h=0;b>h;h++){var c=k[a++],f=(k[a++]<<8)+(255&k[a++]);j[c]=e.indexOf(d.get(f))}}var g,h,i,j={},k=this.bytes,l=!1,m=!1,n=null;if(0===a||1===a){l=!0,g=a;var o=a?Lb.ExpertEncoding:Lb.StandardEncoding;for(h=0,i=e.length;i>h;h++){var p=o.indexOf(e[h]);-1!==p&&(j[p]=h)}}else{var q=a;switch(g=k[a++],127&g){case 0:var r=k[a++];for(h=1;r>=h;h++)j[k[a++]]=h;break;case 1:var s=k[a++],t=1;for(h=0;s>h;h++)for(var u=k[a++],v=k[a++],w=u;u+v>=w;w++)j[w]=t++;break;default:c("Unknow encoding format: "+g+" in CFF")}var x=a;128&g&&(
// The font sanitizer does not support CFF encoding with a
// supplement, since the encoding is not really used to map
// between gid to glyph, let's overwrite what is declared in
// the top dictionary to let the sanitizer think the font use
// StandardEncoding, that's a lie but that's ok.
k[q]&=127,f(),m=!0),n=k.subarray(q,x)}return g=127&g,new oc(l,g,j,n)},parseFDSelect:function(a,b){var d,e=a,f=this.bytes,g=f[a++],h=[];switch(g){case 0:for(d=0;b>d;++d){var i=f[a++];h.push(i)}break;case 3:var j=f[a++]<<8|f[a++];for(d=0;j>d;++d)for(var k=f[a++]<<8|f[a++],l=f[a++],m=f[a]<<8|f[a+1],n=k;m>n;++n)h.push(l);
// Advance past the sentinel(next).
a+=2;break;default:c("Unknown fdselect format "+g)}var o=a;return new pc(h,f.subarray(e,o))}},d}(),fc=function(){function a(){this.header=null,this.names=[],this.topDict=null,this.strings=new hc,this.globalSubrIndex=null,
// The following could really be per font, but since we only have one font
// store them here.
this.encoding=null,this.charset=null,this.charStrings=null,this.fdArray=[],this.fdSelect=null,this.isCIDFont=!1}return a}(),gc=function(){function a(a,b,c,d){this.major=a,this.minor=b,this.hdrSize=c,this.offSize=d}return a}(),hc=function(){function a(){this.strings=[]}return a.prototype={get:function(a){return a>=0&&390>=a?bc[a]:a-391<=this.strings.length?this.strings[a-391]:bc[0]},add:function(a){this.strings.push(a)},get count(){return this.strings.length}},a}(),ic=function(){function a(){this.objects=[],this.length=0}return a.prototype={add:function(a){this.length+=a.length,this.objects.push(a)},set:function(a,b){this.length+=b.length-this.objects[a].length,this.objects[a]=b},get:function(a){return this.objects[a]},get count(){return this.objects.length}},a}(),jc=function(){function a(a,b){this.keyToNameMap=a.keyToNameMap,this.nameToKeyMap=a.nameToKeyMap,this.defaults=a.defaults,this.types=a.types,this.opcodes=a.opcodes,this.order=a.order,this.strings=b,this.values={}}return a.prototype={
// value should always be an array
setByKey:function(a,b){if(!(a in this.keyToNameMap))return!1;
// ignore empty values
if(0===b.length)return!0;var c=this.types[a];
// remove the array wrapping these types of values
return("num"===c||"sid"===c||"offset"===c)&&(b=b[0]),this.values[a]=b,!0},setByName:function(a,b){a in this.nameToKeyMap||c('Invalid dictionary name "'+a+'"'),this.values[this.nameToKeyMap[a]]=b},hasName:function(a){return this.nameToKeyMap[a]in this.values},getByName:function(a){a in this.nameToKeyMap||c('Invalid dictionary name "'+a+'"');var b=this.nameToKeyMap[a];return b in this.values?this.values[b]:this.defaults[b]},removeByName:function(a){delete this.values[this.nameToKeyMap[a]]}},a.createTables=function(a){for(var b={keyToNameMap:{},nameToKeyMap:{},defaults:{},types:{},opcodes:{},order:[]},c=0,d=a.length;d>c;++c){var e=a[c],f=A(e[0])?(e[0][0]<<8)+e[0][1]:e[0];b.keyToNameMap[f]=e[1],b.nameToKeyMap[e[1]]=f,b.types[f]=e[2],b.defaults[f]=e[3],b.opcodes[f]=A(e[0])?e[0]:[e[0]],b.order.push(f)}return b},a}(),kc=function(){function a(a){null===c&&(c=jc.createTables(b)),jc.call(this,c,a),this.privateDict=null}var b=[[[12,30],"ROS",["sid","sid","num"],null],[[12,20],"SyntheticBase","num",null],[0,"version","sid",null],[1,"Notice","sid",null],[[12,0],"Copyright","sid",null],[2,"FullName","sid",null],[3,"FamilyName","sid",null],[4,"Weight","sid",null],[[12,1],"isFixedPitch","num",0],[[12,2],"ItalicAngle","num",0],[[12,3],"UnderlinePosition","num",-100],[[12,4],"UnderlineThickness","num",50],[[12,5],"PaintType","num",0],[[12,6],"CharstringType","num",2],[[12,7],"FontMatrix",["num","num","num","num","num","num"],[.001,0,0,.001,0,0]],[13,"UniqueID","num",null],[5,"FontBBox",["num","num","num","num"],[0,0,0,0]],[[12,8],"StrokeWidth","num",0],[14,"XUID","array",null],[15,"charset","offset",0],[16,"Encoding","offset",0],[17,"CharStrings","offset",0],[18,"Private",["offset","offset"],null],[[12,21],"PostScript","sid",null],[[12,22],"BaseFontName","sid",null],[[12,23],"BaseFontBlend","delta",null],[[12,31],"CIDFontVersion","num",0],[[12,32],"CIDFontRevision","num",0],[[12,33],"CIDFontType","num",0],[[12,34],"CIDCount","num",8720],[[12,35],"UIDBase","num",null],
// XXX: CID Fonts on DirectWrite 6.1 only seem to work if FDSelect comes
// before FDArray.
[[12,37],"FDSelect","offset",null],[[12,36],"FDArray","offset",null],[[12,38],"FontName","sid",null]],c=null;return a.prototype=Object.create(jc.prototype),a}(),lc=function(){function a(a){null===c&&(c=jc.createTables(b)),jc.call(this,c,a),this.subrsIndex=null}var b=[[6,"BlueValues","delta",null],[7,"OtherBlues","delta",null],[8,"FamilyBlues","delta",null],[9,"FamilyOtherBlues","delta",null],[[12,9],"BlueScale","num",.039625],[[12,10],"BlueShift","num",7],[[12,11],"BlueFuzz","num",1],[10,"StdHW","num",null],[11,"StdVW","num",null],[[12,12],"StemSnapH","delta",null],[[12,13],"StemSnapV","delta",null],[[12,14],"ForceBold","num",0],[[12,17],"LanguageGroup","num",0],[[12,18],"ExpansionFactor","num",.06],[[12,19],"initialRandomSeed","num",0],[20,"defaultWidthX","num",0],[21,"nominalWidthX","num",0],[19,"Subrs","offset",null]],c=null;return a.prototype=Object.create(jc.prototype),a}(),mc={ISO_ADOBE:0,EXPERT:1,EXPERT_SUBSET:2},nc=function(){function a(a,b,c,d){this.predefined=a,this.format=b,this.charset=c,this.raw=d}return a}(),oc=function(){function a(a,b,c,d){this.predefined=a,this.format=b,this.encoding=c,this.raw=d}return a}(),pc=function(){function a(a,b){this.fdSelect=a,this.raw=b}return a}(),qc=function(){function a(){this.offsets={}}return a.prototype={isTracking:function(a){return a in this.offsets},track:function(a,b){a in this.offsets&&c("Already tracking location of "+a),this.offsets[a]=b},offset:function(a){for(var b in this.offsets)this.offsets[b]+=a},setEntryLocation:function(a,b,d){a in this.offsets||c("Not tracking location of "+a);for(var e=d.data,f=this.offsets[a],g=5,h=0,i=b.length;i>h;++h){var j=h*g+f,k=j+1,l=j+2,m=j+3,n=j+4;
// It's easy to screw up offsets so perform this sanity check.
(29!==e[j]||0!==e[k]||0!==e[l]||0!==e[m]||0!==e[n])&&c("writing to an offset that is not empty");var o=b[h];e[j]=29,e[k]=o>>24&255,e[l]=o>>16&255,e[m]=o>>8&255,e[n]=255&o}}},a}(),rc=function(){function a(a){this.cff=a}return a.prototype={compile:function(){var a=this.cff,b={data:[],length:0,add:function(a){this.data=this.data.concat(a),this.length=this.data.length}},c=this.compileHeader(a.header);b.add(c);var d=this.compileNameIndex(a.names);if(b.add(d),a.isCIDFont&&a.topDict.hasName("FontMatrix")){var e=a.topDict.getByName("FontMatrix");a.topDict.removeByName("FontMatrix");for(var f=0,g=a.fdArray.length;g>f;f++){var h=a.fdArray[f],i=e.slice(0);h.hasName("FontMatrix")&&(i=ia.transform(i,h.getByName("FontMatrix"))),h.setByName("FontMatrix",i)}}var j=this.compileTopDicts([a.topDict],b.length,a.isCIDFont);b.add(j.output);var k=j.trackers[0],l=this.compileStringIndex(a.strings.strings);b.add(l);var m=this.compileIndex(a.globalSubrIndex);
// Now start on the other entries that have no specfic order.
if(b.add(m),a.encoding&&a.topDict.hasName("Encoding"))if(a.encoding.predefined)k.setEntryLocation("Encoding",[a.encoding.format],b);else{var n=this.compileEncoding(a.encoding);k.setEntryLocation("Encoding",[b.length],b),b.add(n)}if(a.charset&&a.topDict.hasName("charset"))if(a.charset.predefined)k.setEntryLocation("charset",[a.charset.format],b);else{var o=this.compileCharset(a.charset);k.setEntryLocation("charset",[b.length],b),b.add(o)}var p=this.compileCharStrings(a.charStrings);if(k.setEntryLocation("CharStrings",[b.length],b),b.add(p),a.isCIDFont){
// For some reason FDSelect must be in front of FDArray on windows. OSX
// and linux don't seem to care.
k.setEntryLocation("FDSelect",[b.length],b);var q=this.compileFDSelect(a.fdSelect.raw);b.add(q),
// It is unclear if the sub font dictionary can have CID related
// dictionary keys, but the sanitizer doesn't like them so remove them.
j=this.compileTopDicts(a.fdArray,b.length,!0),k.setEntryLocation("FDArray",[b.length],b),b.add(j.output);var r=j.trackers;this.compilePrivateDicts(a.fdArray,r,b)}
// If the font data ends with INDEX whose object data is zero-length,
// the sanitizer will bail out. Add a dummy byte to avoid that.
return this.compilePrivateDicts([a.topDict],[k],b),b.add([0]),b.data},encodeNumber:function(a){return parseFloat(a)!==parseInt(a,10)||isNaN(a)?this.encodeFloat(a):this.encodeInteger(a)},encodeFloat:function(a){var b=a.toString(),c=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(b);if(c){var d=parseFloat("1e"+((c[2]?+c[2]:0)+c[1].length));b=(Math.round(a*d)/d).toString()}var e,f,g="";for(e=0,f=b.length;f>e;++e){var h=b[e];g+="e"===h?"-"===b[++e]?"c":"b":"."===h?"a":"-"===h?"e":h}g+=1&g.length?"f":"ff";var i=[30];for(e=0,f=g.length;f>e;e+=2)i.push(parseInt(g.substr(e,2),16));return i},encodeInteger:function(a){var b;return a>=-107&&107>=a?b=[a+139]:a>=108&&1131>=a?(a=[a-108],b=[(a>>8)+247,255&a]):a>=-1131&&-108>=a?(a=-a-108,b=[(a>>8)+251,255&a]):b=a>=-32768&&32767>=a?[28,a>>8&255,255&a]:[29,a>>24&255,a>>16&255,a>>8&255,255&a],b},compileHeader:function(a){return[a.major,a.minor,a.hdrSize,a.offSize]},compileNameIndex:function(a){for(var b=new ic,c=0,d=a.length;d>c;++c)b.add(i(a[c]));return this.compileIndex(b)},compileTopDicts:function(a,b,c){for(var d=[],e=new ic,f=0,g=a.length;g>f;++f){var h=a[f];c&&(h.removeByName("CIDFontVersion"),h.removeByName("CIDFontRevision"),h.removeByName("CIDFontType"),h.removeByName("CIDCount"),h.removeByName("UIDBase"));var i=new qc,j=this.compileDict(h,i);d.push(i),e.add(j),i.offset(b)}return e=this.compileIndex(e,d),{trackers:d,output:e}},compilePrivateDicts:function(a,b,c){for(var d=0,f=a.length;f>d;++d){var g=a[d];e(g.privateDict&&g.hasName("Private"),"There must be an private dictionary.");var h=g.privateDict,i=new qc,j=this.compileDict(h,i),k=c.length;if(i.offset(k),j.length||(
// The private dictionary was empty, set the output length to zero to
// ensure the offset length isn't out of bounds in the eyes of the
// sanitizer.
k=0),b[d].setEntryLocation("Private",[j.length,k],c),c.add(j),h.subrsIndex&&h.hasName("Subrs")){var l=this.compileIndex(h.subrsIndex);i.setEntryLocation("Subrs",[j.length],c),c.add(l)}}},compileDict:function(a,b){for(var d=[],e=a.order,f=0;f<e.length;++f){var g=e[f];if(g in a.values){var h=a.values[g],i=a.types[g];
// Remove any empty dict values.
if(A(i)||(i=[i]),A(h)||(h=[h]),0!==h.length){for(var j=0,k=i.length;k>j;++j){var l=i[j],m=h[j];switch(l){case"num":case"sid":d=d.concat(this.encodeNumber(m));break;case"offset":
// For offsets we just insert a 32bit integer so we don't have to
// deal with figuring out the length of the offset when it gets
// replaced later on by the compiler.
var n=a.keyToNameMap[g];
// Some offsets have the offset and the length, so just record the
// position of the first one.
b.isTracking(n)||b.track(n,d.length),d=d.concat([29,0,0,0,0]);break;case"array":case"delta":d=d.concat(this.encodeNumber(m));for(var o=1,p=h.length;p>o;++o)d=d.concat(this.encodeNumber(h[o]));break;default:c("Unknown data type of "+l)}}d=d.concat(a.opcodes[g])}}}return d},compileStringIndex:function(a){for(var b=new ic,c=0,d=a.length;d>c;++c)b.add(i(a[c]));return this.compileIndex(b)},compileGlobalSubrIndex:function(){var a=this.cff.globalSubrIndex;this.out.writeByteArray(this.compileIndex(a))},compileCharStrings:function(a){return this.compileIndex(a)},compileCharset:function(a){return this.compileTypedArray(a.raw)},compileEncoding:function(a){return this.compileTypedArray(a.raw)},compileFDSelect:function(a){return this.compileTypedArray(a)},compileTypedArray:function(a){for(var b=[],c=0,d=a.length;d>c;++c)b[c]=a[c];return b},compileIndex:function(a,b){b=b||[];var c=a.objects,d=c.length;
// If there is no object, just create an index. This technically
// should just be [0, 0] but OTS has an issue with that.
if(0===d)return[0,0,0];var e,f=[d>>8&255,255&d],g=1;for(e=0;d>e;++e)g+=c[e].length;var h;h=256>g?1:65536>g?2:16777216>g?3:4,
// Next byte contains the offset size use to reference object in the file
f.push(h);
// Add another offset after this one because we need a new offset
var i=1;for(e=0;d+1>e;e++)1===h?f.push(255&i):2===h?f.push(i>>8&255,255&i):3===h?f.push(i>>16&255,i>>8&255,255&i):f.push(i>>>24&255,i>>16&255,i>>8&255,255&i),c[e]&&(i+=c[e].length);for(e=0;d>e;e++){
// Notify the tracker where the object will be offset in the data.
b[e]&&b[e].offset(f.length);for(var j=0,k=c[e].length;k>j;j++)f.push(c[e][j])}return f}},a}();
// Workaround for seac on Windows.
!function(){/Windows/.test(navigator.userAgent)&&(Jb=!0)}(),
// Workaround for Private Use Area characters in Chrome on Windows
// http://code.google.com/p/chromium/issues/detail?id=122465
// https://github.com/mozilla/pdf.js/issues/1689
function(){/Windows.*Chrome/.test(navigator.userAgent)&&(Gb=!0)}();var sc=function(){function a(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]}function b(a,b){return a[b]<<8|a[b+1]}function d(d,e,f){var g,h,i,j,k=1===b(d,e+2)?a(d,e+8):a(d,e+16),l=b(d,e+k);if(4===l){g=b(d,e+k+2);var m=b(d,e+k+6)>>1;for(i=e+k+14,h=[],j=0;m>j;j++,i+=2)h[j]={end:b(d,i)};for(i+=2,j=0;m>j;j++,i+=2)h[j].start=b(d,i);for(j=0;m>j;j++,i+=2)h[j].idDelta=b(d,i);for(j=0;m>j;j++,i+=2){var n=b(d,i);if(0!==n){h[j].ids=[];for(var o=0,p=h[j].end-h[j].start+1;p>o;o++)h[j].ids[o]=b(d,i+n),n+=2}}return h}if(12===l){g=a(d,e+k+4);var q=a(d,e+k+12);for(i=e+k+16,h=[],j=0;q>j;j++)h.push({start:a(d,i),end:a(d,i+4),idDelta:a(d,i+8)-a(d,i)}),i+=12;return h}c("not supported cmap: "+l)}function e(a,b,c){var d={},e=new ec(new Gc(a,b,c-b),d),f=e.parse();return{glyphs:f.charStrings.objects,subrs:f.topDict.privateDict&&f.topDict.privateDict.subrsIndex&&f.topDict.privateDict.subrsIndex.objects,gsubrs:f.globalSubrIndex&&f.globalSubrIndex.objects}}function f(a,b,c){var d,e;c?(d=4,e=function(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]}):(d=2,e=function(a,b){return a[b]<<9|a[b+1]<<1});for(var f=[],g=e(b,0),h=d;h<b.length;h+=d){var i=e(b,h);f.push(a.subarray(g,i)),g=i}return f}function g(a,b){for(var c=b.charCodeAt(0),d=0,e=a.length-1;e>d;){var f=d+e+1>>1;c<a[f].start?e=f-1:d=f}return a[d].start<=c&&c<=a[d].end?a[d].idDelta+(a[d].ids?a[d].ids[c-a[d].start]:c)&65535:0}function i(a,b,c){function d(a,c){b.push("c.moveTo("+a+","+c+");")}function e(a,c){b.push("c.lineTo("+a+","+c+");")}function f(a,c,d,e){b.push("c.quadraticCurveTo("+a+","+c+","+d+","+e+");")}var g,h=0,j=(a[h]<<24|a[h+1]<<16)>>16,k=0,l=0;if(h+=10,0>j){
// composite glyph
do{g=a[h]<<8|a[h+1];var m=a[h+2]<<8|a[h+3];h+=4;var n,o;1&g?(n=(a[h]<<24|a[h+1]<<16)>>16,o=(a[h+2]<<24|a[h+3]<<16)>>16,h+=4):(n=a[h++],o=a[h++]),2&g?(k=n,l=o):(k=0,l=0);var p=1,q=1,r=0,s=0;8&g?(p=q=(a[h]<<24|a[h+1]<<16)/1073741824,h+=2):64&g?(p=(a[h]<<24|a[h+1]<<16)/1073741824,q=(a[h+2]<<24|a[h+3]<<16)/1073741824,h+=4):128&g&&(p=(a[h]<<24|a[h+1]<<16)/1073741824,r=(a[h+2]<<24|a[h+3]<<16)/1073741824,s=(a[h+4]<<24|a[h+5]<<16)/1073741824,q=(a[h+6]<<24|a[h+7]<<16)/1073741824,h+=8);var t=c.glyphs[m];t&&(b.push("c.save();"),b.push("c.transform("+p+","+r+","+s+","+q+","+k+","+l+");"),i(t,b,c),b.push("c.restore();"))}while(32&g)}else{
// simple glyph
var u,v,w=[];for(u=0;j>u;u++)w.push(a[h]<<8|a[h+1]),h+=2;var x=a[h]<<8|a[h+1];h+=2+x;for(// skipping the instructions
var y=w[w.length-1]+1,z=[];z.length<y;){g=a[h++];var A=1;for(8&g&&(A+=a[h++]);A-->0;)z.push({flags:g})}for(u=0;y>u;u++){switch(18&z[u].flags){case 0:k+=(a[h]<<24|a[h+1]<<16)>>16,h+=2;break;case 2:k-=a[h++];break;case 18:k+=a[h++]}z[u].x=k}for(u=0;y>u;u++){switch(36&z[u].flags){case 0:l+=(a[h]<<24|a[h+1]<<16)>>16,h+=2;break;case 4:l-=a[h++];break;case 36:l+=a[h++]}z[u].y=l}var B=0;for(h=0;j>h;h++){var C=w[h],D=z.slice(B,C+1);if(1&D[0].flags)D.push(D[0]);else if(1&D[D.length-1].flags)
// first is off-curve point, trying to use one from the end
D.unshift(D[D.length-1]);else{
// start and end are off-curve points, creating implicit one
var E={flags:1,x:(D[0].x+D[D.length-1].x)/2,y:(D[0].y+D[D.length-1].y)/2};D.unshift(E),D.push(E)}for(d(D[0].x,D[0].y),u=1,v=D.length;v>u;u++)1&D[u].flags?e(D[u].x,D[u].y):1&D[u+1].flags?(f(D[u].x,D[u].y,D[u+1].x,D[u+1].y),u++):f(D[u].x,D[u].y,(D[u].x+D[u+1].x)/2,(D[u].y+D[u+1].y)/2);B=C+1}}}function j(a,b,d){function e(a,c){b.push("c.moveTo("+a+","+c+");")}function f(a,c){b.push("c.lineTo("+a+","+c+");")}function h(a,c,d,e,f,g){b.push("c.bezierCurveTo("+a+","+c+","+d+","+e+","+f+","+g+");")}function i(a){for(var o=0;o<a.length;){var p,q,r,s,t,u,v,w,x,y=!1,z=a[o++];switch(z){case 1:// hstem
n+=k.length>>1,y=!0;break;case 3:// vstem
n+=k.length>>1,y=!0;break;case 4:// vmoveto
m+=k.pop(),e(l,m),y=!0;break;case 5:// rlineto
for(;k.length>0;)l+=k.shift(),m+=k.shift(),f(l,m);break;case 6:// hlineto
for(;k.length>0&&(l+=k.shift(),f(l,m),0!==k.length);)m+=k.shift(),f(l,m);break;case 7:// vlineto
for(;k.length>0&&(m+=k.shift(),f(l,m),0!==k.length);)l+=k.shift(),f(l,m);break;case 8:// rrcurveto
for(;k.length>0;)p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+k.shift(),h(p,r,q,s,l,m);break;case 10:// callsubr
w=k.pop()+d.subrsBias,x=d.subrs[w],x&&i(x);break;case 11:// return
return;case 12:switch(z=a[o++]){case 34:// flex
p=l+k.shift(),q=p+k.shift(),t=m+k.shift(),l=q+k.shift(),h(p,m,q,t,l,t),p=l+k.shift(),q=p+k.shift(),l=q+k.shift(),h(p,t,q,m,l,m);break;case 35:// flex
p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+k.shift(),h(p,r,q,s,l,m),p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+k.shift(),h(p,r,q,s,l,m),k.pop();// fd
break;case 36:// hflex1
p=l+k.shift(),t=m+k.shift(),q=p+k.shift(),u=t+k.shift(),l=q+k.shift(),h(p,t,q,u,l,u),p=l+k.shift(),q=p+k.shift(),v=u+k.shift(),l=q+k.shift(),h(p,u,q,v,l,m);break;case 37:// flex1
var A=l,B=m;p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+k.shift(),h(p,r,q,s,l,m),p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q,m=s,Math.abs(l-A)>Math.abs(m-B)?l+=k.shift():m+=k.shift(),h(p,r,q,s,l,m);break;default:c("unknown operator: 12 "+z)}break;case 14:// endchar
if(k.length>=4){var C=k.pop(),D=k.pop();m=k.pop(),l=k.pop(),b.push("c.save();"),b.push("c.translate("+l+","+m+");");var E=g(d.cmap,String.fromCharCode(d.glyphNameMap[Lb.StandardEncoding[C]]));j(d.glyphs[E],b,d),b.push("c.restore();"),E=g(d.cmap,String.fromCharCode(d.glyphNameMap[Lb.StandardEncoding[D]])),j(d.glyphs[E],b,d)}return;case 18:// hstemhm
n+=k.length>>1,y=!0;break;case 19:// hintmask
n+=k.length>>1,o+=n+7>>3,y=!0;break;case 20:// cntrmask
n+=k.length>>1,o+=n+7>>3,y=!0;break;case 21:// rmoveto
m+=k.pop(),l+=k.pop(),e(l,m),y=!0;break;case 22:// hmoveto
l+=k.pop(),e(l,m),y=!0;break;case 23:// vstemhm
n+=k.length>>1,y=!0;break;case 24:// rcurveline
for(;k.length>2;)p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+k.shift(),h(p,r,q,s,l,m);l+=k.shift(),m+=k.shift(),f(l,m);break;case 25:// rlinecurve
for(;k.length>6;)l+=k.shift(),m+=k.shift(),f(l,m);p=l+k.shift(),r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+k.shift(),h(p,r,q,s,l,m);break;case 26:for(// vvcurveto
k.length%2&&(l+=k.shift());k.length>0;)p=l,r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q,m=s+k.shift(),h(p,r,q,s,l,m);break;case 27:for(// hhcurveto
k.length%2&&(m+=k.shift());k.length>0;)p=l+k.shift(),r=m,q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s,h(p,r,q,s,l,m);break;case 28:k.push((a[o]<<24|a[o+1]<<16)>>16),o+=2;break;case 29:// callgsubr
w=k.pop()+d.gsubrsBias,x=d.gsubrs[w],x&&i(x);break;case 30:// vhcurveto
for(;k.length>0&&(p=l,r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+(1===k.length?k.shift():0),h(p,r,q,s,l,m),0!==k.length);)p=l+k.shift(),r=m,q=p+k.shift(),s=r+k.shift(),m=s+k.shift(),l=q+(1===k.length?k.shift():0),h(p,r,q,s,l,m);break;case 31:// hvcurveto
for(;k.length>0&&(p=l+k.shift(),r=m,q=p+k.shift(),s=r+k.shift(),m=s+k.shift(),l=q+(1===k.length?k.shift():0),h(p,r,q,s,l,m),0!==k.length);)p=l,r=m+k.shift(),q=p+k.shift(),s=r+k.shift(),l=q+k.shift(),m=s+(1===k.length?k.shift():0),h(p,r,q,s,l,m);break;default:32>z&&c("unknown operator: "+z),247>z?k.push(z-139):251>z?k.push(256*(z-247)+a[o++]+108):255>z?k.push(256*-(z-251)-a[o++]-108):(k.push((a[o]<<24|a[o+1]<<16|a[o+2]<<8|a[o+3])/65536),o+=4)}y&&(k.length=0)}}var k=[],l=0,m=0,n=0;i(a)}function k(a){this.compiledGlyphs={},this.fontMatrix=a}function l(a,b,c){c=c||[488e-6,0,0,488e-6,0,0],k.call(this,c),this.glyphs=a,this.cmap=b,this.compiledGlyphs=[]}function m(a,b,c,d){c=c||[.001,0,0,.001,0,0],k.call(this,c),this.glyphs=a.glyphs,this.gsubrs=a.gsubrs||[],this.subrs=a.subrs||[],this.cmap=b,this.glyphNameMap=d||tc,this.compiledGlyphs=[],this.gsubrsBias=this.gsubrs.length<1240?107:this.gsubrs.length<33900?1131:32768,this.subrsBias=this.subrs.length<1240?107:this.subrs.length<33900?1131:32768}var n="";return k.prototype={getPathJs:function(a){var b=g(this.cmap,a),c=this.compiledGlyphs[b];return c||(this.compiledGlyphs[b]=c=this.compileGlyph(this.glyphs[b])),c},compileGlyph:function(a){if(!a||0===a.length||14===a[0])return n;var b=[];return b.push("c.save();"),b.push("c.transform("+this.fontMatrix.join(",")+");"),b.push("c.scale(size, -size);"),this.compileGlyphImpl(a,b),b.push("c.restore();"),b.join("\n")},compileGlyphImpl:function(){c("Children classes should implement this.")},hasBuiltPath:function(a){var b=g(this.cmap,a);return b in this.compiledGlyphs}},ia.inherit(l,k,{compileGlyphImpl:function(a,b){i(a,b,this)}}),ia.inherit(m,k,{compileGlyphImpl:function(a,b){j(a,b,this)}}),{create:function(c){for(var g,i,j,k,n,o,p=new Uint8Array(c.data),q=b(p,4),r=0,s=12;q>r;r++,s+=16){var t=h(p.subarray(s,s+4)),u=a(p,s+8),v=a(p,s+12);switch(t){case"cmap":g=d(p,u,u+v);break;case"glyf":i=p.subarray(u,u+v);break;case"loca":j=p.subarray(u,u+v);break;case"head":o=b(p,u+18),n=b(p,u+50);break;case"CFF ":k=e(p,u,u+v)}}if(i){var w=o?[1/o,0,0,1/o,0,0]:c.fontMatrix;return new l(f(i,j,n),g,w)}return new m(k,g,c.fontMatrix,c.glyphNameMap)}}}(),tc={A:65,AE:198,AEacute:508,AEmacron:482,AEsmall:63462,Aacute:193,Aacutesmall:63457,Abreve:258,Abreveacute:7854,Abrevecyrillic:1232,Abrevedotbelow:7862,Abrevegrave:7856,Abrevehookabove:7858,Abrevetilde:7860,Acaron:461,Acircle:9398,Acircumflex:194,Acircumflexacute:7844,Acircumflexdotbelow:7852,Acircumflexgrave:7846,Acircumflexhookabove:7848,Acircumflexsmall:63458,Acircumflextilde:7850,Acute:63177,Acutesmall:63412,Acyrillic:1040,Adblgrave:512,Adieresis:196,Adieresiscyrillic:1234,Adieresismacron:478,Adieresissmall:63460,Adotbelow:7840,Adotmacron:480,Agrave:192,Agravesmall:63456,Ahookabove:7842,Aiecyrillic:1236,Ainvertedbreve:514,Alpha:913,Alphatonos:902,Amacron:256,Amonospace:65313,Aogonek:260,Aring:197,Aringacute:506,Aringbelow:7680,Aringsmall:63461,Asmall:63329,Atilde:195,Atildesmall:63459,Aybarmenian:1329,B:66,Bcircle:9399,Bdotaccent:7682,Bdotbelow:7684,Becyrillic:1041,Benarmenian:1330,Beta:914,Bhook:385,Blinebelow:7686,Bmonospace:65314,Brevesmall:63220,Bsmall:63330,Btopbar:386,C:67,Caarmenian:1342,Cacute:262,Caron:63178,Caronsmall:63221,Ccaron:268,Ccedilla:199,Ccedillaacute:7688,Ccedillasmall:63463,Ccircle:9400,Ccircumflex:264,Cdot:266,Cdotaccent:266,Cedillasmall:63416,Chaarmenian:1353,Cheabkhasiancyrillic:1212,Checyrillic:1063,Chedescenderabkhasiancyrillic:1214,Chedescendercyrillic:1206,Chedieresiscyrillic:1268,Cheharmenian:1347,Chekhakassiancyrillic:1227,Cheverticalstrokecyrillic:1208,Chi:935,Chook:391,Circumflexsmall:63222,Cmonospace:65315,Coarmenian:1361,Csmall:63331,D:68,DZ:497,DZcaron:452,Daarmenian:1332,Dafrican:393,Dcaron:270,Dcedilla:7696,Dcircle:9401,Dcircumflexbelow:7698,Dcroat:272,Ddotaccent:7690,Ddotbelow:7692,Decyrillic:1044,Deicoptic:1006,Delta:8710,Deltagreek:916,Dhook:394,Dieresis:63179,DieresisAcute:63180,DieresisGrave:63181,Dieresissmall:63400,Digammagreek:988,Djecyrillic:1026,Dlinebelow:7694,Dmonospace:65316,Dotaccentsmall:63223,Dslash:272,Dsmall:63332,Dtopbar:395,Dz:498,Dzcaron:453,Dzeabkhasiancyrillic:1248,Dzecyrillic:1029,Dzhecyrillic:1039,E:69,Eacute:201,Eacutesmall:63465,Ebreve:276,Ecaron:282,Ecedillabreve:7708,Echarmenian:1333,Ecircle:9402,Ecircumflex:202,Ecircumflexacute:7870,Ecircumflexbelow:7704,Ecircumflexdotbelow:7878,Ecircumflexgrave:7872,Ecircumflexhookabove:7874,Ecircumflexsmall:63466,Ecircumflextilde:7876,Ecyrillic:1028,Edblgrave:516,Edieresis:203,Edieresissmall:63467,Edot:278,Edotaccent:278,Edotbelow:7864,Efcyrillic:1060,Egrave:200,Egravesmall:63464,Eharmenian:1335,Ehookabove:7866,Eightroman:8551,Einvertedbreve:518,Eiotifiedcyrillic:1124,Elcyrillic:1051,Elevenroman:8554,Emacron:274,Emacronacute:7702,Emacrongrave:7700,Emcyrillic:1052,Emonospace:65317,Encyrillic:1053,Endescendercyrillic:1186,Eng:330,Enghecyrillic:1188,Enhookcyrillic:1223,Eogonek:280,Eopen:400,Epsilon:917,Epsilontonos:904,Ercyrillic:1056,Ereversed:398,Ereversedcyrillic:1069,Escyrillic:1057,Esdescendercyrillic:1194,Esh:425,Esmall:63333,Eta:919,Etarmenian:1336,Etatonos:905,Eth:208,Ethsmall:63472,Etilde:7868,Etildebelow:7706,Euro:8364,Ezh:439,Ezhcaron:494,Ezhreversed:440,F:70,Fcircle:9403,Fdotaccent:7710,Feharmenian:1366,Feicoptic:996,Fhook:401,Fitacyrillic:1138,Fiveroman:8548,Fmonospace:65318,Fourroman:8547,Fsmall:63334,G:71,GBsquare:13191,Gacute:500,Gamma:915,Gammaafrican:404,Gangiacoptic:1002,Gbreve:286,Gcaron:486,Gcedilla:290,Gcircle:9404,Gcircumflex:284,Gcommaaccent:290,Gdot:288,Gdotaccent:288,Gecyrillic:1043,Ghadarmenian:1346,Ghemiddlehookcyrillic:1172,Ghestrokecyrillic:1170,Gheupturncyrillic:1168,Ghook:403,Gimarmenian:1331,Gjecyrillic:1027,Gmacron:7712,Gmonospace:65319,Grave:63182,Gravesmall:63328,Gsmall:63335,Gsmallhook:667,Gstroke:484,H:72,H18533:9679,H18543:9642,H18551:9643,H22073:9633,HPsquare:13259,Haabkhasiancyrillic:1192,Hadescendercyrillic:1202,Hardsigncyrillic:1066,Hbar:294,Hbrevebelow:7722,Hcedilla:7720,Hcircle:9405,Hcircumflex:292,Hdieresis:7718,Hdotaccent:7714,Hdotbelow:7716,Hmonospace:65320,Hoarmenian:1344,Horicoptic:1e3,Hsmall:63336,Hungarumlaut:63183,Hungarumlautsmall:63224,Hzsquare:13200,I:73,IAcyrillic:1071,IJ:306,IUcyrillic:1070,Iacute:205,Iacutesmall:63469,Ibreve:300,Icaron:463,Icircle:9406,Icircumflex:206,Icircumflexsmall:63470,Icyrillic:1030,Idblgrave:520,Idieresis:207,Idieresisacute:7726,Idieresiscyrillic:1252,Idieresissmall:63471,Idot:304,Idotaccent:304,Idotbelow:7882,Iebrevecyrillic:1238,Iecyrillic:1045,Ifraktur:8465,Igrave:204,Igravesmall:63468,Ihookabove:7880,Iicyrillic:1048,Iinvertedbreve:522,Iishortcyrillic:1049,Imacron:298,Imacroncyrillic:1250,Imonospace:65321,Iniarmenian:1339,Iocyrillic:1025,Iogonek:302,Iota:921,Iotaafrican:406,Iotadieresis:938,Iotatonos:906,Ismall:63337,Istroke:407,Itilde:296,Itildebelow:7724,Izhitsacyrillic:1140,Izhitsadblgravecyrillic:1142,J:74,Jaarmenian:1345,Jcircle:9407,Jcircumflex:308,Jecyrillic:1032,Jheharmenian:1355,Jmonospace:65322,Jsmall:63338,K:75,KBsquare:13189,KKsquare:13261,Kabashkircyrillic:1184,Kacute:7728,Kacyrillic:1050,Kadescendercyrillic:1178,Kahookcyrillic:1219,Kappa:922,Kastrokecyrillic:1182,Kaverticalstrokecyrillic:1180,Kcaron:488,Kcedilla:310,Kcircle:9408,Kcommaaccent:310,Kdotbelow:7730,Keharmenian:1364,Kenarmenian:1343,Khacyrillic:1061,Kheicoptic:998,Khook:408,Kjecyrillic:1036,Klinebelow:7732,Kmonospace:65323,Koppacyrillic:1152,Koppagreek:990,Ksicyrillic:1134,Ksmall:63339,L:76,LJ:455,LL:63167,Lacute:313,Lambda:923,Lcaron:317,Lcedilla:315,Lcircle:9409,Lcircumflexbelow:7740,Lcommaaccent:315,Ldot:319,Ldotaccent:319,Ldotbelow:7734,Ldotbelowmacron:7736,Liwnarmenian:1340,Lj:456,Ljecyrillic:1033,Llinebelow:7738,Lmonospace:65324,Lslash:321,Lslashsmall:63225,Lsmall:63340,M:77,MBsquare:13190,Macron:63184,Macronsmall:63407,Macute:7742,Mcircle:9410,Mdotaccent:7744,Mdotbelow:7746,Menarmenian:1348,Mmonospace:65325,Msmall:63341,Mturned:412,Mu:924,N:78,NJ:458,Nacute:323,Ncaron:327,Ncedilla:325,Ncircle:9411,Ncircumflexbelow:7754,Ncommaaccent:325,Ndotaccent:7748,Ndotbelow:7750,Nhookleft:413,Nineroman:8552,Nj:459,Njecyrillic:1034,Nlinebelow:7752,Nmonospace:65326,Nowarmenian:1350,Nsmall:63342,Ntilde:209,Ntildesmall:63473,Nu:925,O:79,OE:338,OEsmall:63226,Oacute:211,Oacutesmall:63475,Obarredcyrillic:1256,Obarreddieresiscyrillic:1258,Obreve:334,Ocaron:465,Ocenteredtilde:415,Ocircle:9412,Ocircumflex:212,Ocircumflexacute:7888,Ocircumflexdotbelow:7896,Ocircumflexgrave:7890,Ocircumflexhookabove:7892,Ocircumflexsmall:63476,Ocircumflextilde:7894,Ocyrillic:1054,Odblacute:336,Odblgrave:524,Odieresis:214,Odieresiscyrillic:1254,Odieresissmall:63478,Odotbelow:7884,Ogoneksmall:63227,Ograve:210,Ogravesmall:63474,Oharmenian:1365,Ohm:8486,Ohookabove:7886,Ohorn:416,Ohornacute:7898,Ohorndotbelow:7906,Ohorngrave:7900,Ohornhookabove:7902,Ohorntilde:7904,Ohungarumlaut:336,Oi:418,Oinvertedbreve:526,Omacron:332,Omacronacute:7762,Omacrongrave:7760,Omega:8486,Omegacyrillic:1120,Omegagreek:937,Omegaroundcyrillic:1146,Omegatitlocyrillic:1148,Omegatonos:911,Omicron:927,Omicrontonos:908,Omonospace:65327,Oneroman:8544,Oogonek:490,Oogonekmacron:492,Oopen:390,Oslash:216,Oslashacute:510,Oslashsmall:63480,Osmall:63343,Ostrokeacute:510,Otcyrillic:1150,Otilde:213,Otildeacute:7756,Otildedieresis:7758,Otildesmall:63477,P:80,Pacute:7764,Pcircle:9413,Pdotaccent:7766,Pecyrillic:1055,Peharmenian:1354,Pemiddlehookcyrillic:1190,Phi:934,Phook:420,Pi:928,Piwrarmenian:1363,Pmonospace:65328,Psi:936,Psicyrillic:1136,Psmall:63344,Q:81,Qcircle:9414,Qmonospace:65329,Qsmall:63345,R:82,Raarmenian:1356,Racute:340,Rcaron:344,Rcedilla:342,Rcircle:9415,Rcommaaccent:342,Rdblgrave:528,Rdotaccent:7768,Rdotbelow:7770,Rdotbelowmacron:7772,Reharmenian:1360,Rfraktur:8476,Rho:929,Ringsmall:63228,Rinvertedbreve:530,Rlinebelow:7774,Rmonospace:65330,Rsmall:63346,Rsmallinverted:641,Rsmallinvertedsuperior:694,S:83,SF010000:9484,SF020000:9492,SF030000:9488,SF040000:9496,SF050000:9532,SF060000:9516,SF070000:9524,SF080000:9500,SF090000:9508,SF100000:9472,SF110000:9474,SF190000:9569,SF200000:9570,SF210000:9558,SF220000:9557,SF230000:9571,SF240000:9553,SF250000:9559,SF260000:9565,SF270000:9564,SF280000:9563,SF360000:9566,SF370000:9567,SF380000:9562,SF390000:9556,SF400000:9577,SF410000:9574,SF420000:9568,SF430000:9552,SF440000:9580,SF450000:9575,SF460000:9576,SF470000:9572,SF480000:9573,SF490000:9561,SF500000:9560,SF510000:9554,SF520000:9555,SF530000:9579,SF540000:9578,Sacute:346,Sacutedotaccent:7780,Sampigreek:992,Scaron:352,Scarondotaccent:7782,Scaronsmall:63229,Scedilla:350,Schwa:399,Schwacyrillic:1240,Schwadieresiscyrillic:1242,Scircle:9416,Scircumflex:348,Scommaaccent:536,Sdotaccent:7776,Sdotbelow:7778,Sdotbelowdotaccent:7784,Seharmenian:1357,Sevenroman:8550,Shaarmenian:1351,Shacyrillic:1064,Shchacyrillic:1065,Sheicoptic:994,Shhacyrillic:1210,Shimacoptic:1004,Sigma:931,Sixroman:8549,Smonospace:65331,Softsigncyrillic:1068,Ssmall:63347,Stigmagreek:986,T:84,Tau:932,Tbar:358,Tcaron:356,Tcedilla:354,Tcircle:9417,Tcircumflexbelow:7792,Tcommaaccent:354,Tdotaccent:7786,Tdotbelow:7788,Tecyrillic:1058,Tedescendercyrillic:1196,Tenroman:8553,Tetsecyrillic:1204,Theta:920,Thook:428,Thorn:222,Thornsmall:63486,Threeroman:8546,Tildesmall:63230,Tiwnarmenian:1359,Tlinebelow:7790,Tmonospace:65332,Toarmenian:1337,Tonefive:444,Tonesix:388,Tonetwo:423,Tretroflexhook:430,Tsecyrillic:1062,Tshecyrillic:1035,Tsmall:63348,Twelveroman:8555,Tworoman:8545,U:85,Uacute:218,Uacutesmall:63482,Ubreve:364,Ucaron:467,Ucircle:9418,Ucircumflex:219,Ucircumflexbelow:7798,Ucircumflexsmall:63483,Ucyrillic:1059,Udblacute:368,Udblgrave:532,Udieresis:220,Udieresisacute:471,Udieresisbelow:7794,Udieresiscaron:473,Udieresiscyrillic:1264,Udieresisgrave:475,Udieresismacron:469,Udieresissmall:63484,Udotbelow:7908,Ugrave:217,Ugravesmall:63481,Uhookabove:7910,Uhorn:431,Uhornacute:7912,Uhorndotbelow:7920,Uhorngrave:7914,Uhornhookabove:7916,Uhorntilde:7918,Uhungarumlaut:368,Uhungarumlautcyrillic:1266,Uinvertedbreve:534,Ukcyrillic:1144,Umacron:362,Umacroncyrillic:1262,Umacrondieresis:7802,Umonospace:65333,Uogonek:370,Upsilon:933,Upsilon1:978,Upsilonacutehooksymbolgreek:979,Upsilonafrican:433,Upsilondieresis:939,Upsilondieresishooksymbolgreek:980,Upsilonhooksymbol:978,Upsilontonos:910,Uring:366,Ushortcyrillic:1038,Usmall:63349,Ustraightcyrillic:1198,Ustraightstrokecyrillic:1200,Utilde:360,Utildeacute:7800,Utildebelow:7796,V:86,Vcircle:9419,Vdotbelow:7806,Vecyrillic:1042,Vewarmenian:1358,Vhook:434,Vmonospace:65334,Voarmenian:1352,Vsmall:63350,Vtilde:7804,W:87,Wacute:7810,Wcircle:9420,Wcircumflex:372,Wdieresis:7812,Wdotaccent:7814,Wdotbelow:7816,Wgrave:7808,Wmonospace:65335,Wsmall:63351,X:88,Xcircle:9421,Xdieresis:7820,Xdotaccent:7818,Xeharmenian:1341,Xi:926,Xmonospace:65336,Xsmall:63352,Y:89,Yacute:221,Yacutesmall:63485,Yatcyrillic:1122,Ycircle:9422,Ycircumflex:374,Ydieresis:376,Ydieresissmall:63487,Ydotaccent:7822,Ydotbelow:7924,Yericyrillic:1067,Yerudieresiscyrillic:1272,Ygrave:7922,Yhook:435,Yhookabove:7926,Yiarmenian:1349,Yicyrillic:1031,Yiwnarmenian:1362,Ymonospace:65337,Ysmall:63353,Ytilde:7928,Yusbigcyrillic:1130,Yusbigiotifiedcyrillic:1132,Yuslittlecyrillic:1126,Yuslittleiotifiedcyrillic:1128,Z:90,Zaarmenian:1334,Zacute:377,Zcaron:381,Zcaronsmall:63231,Zcircle:9423,Zcircumflex:7824,Zdot:379,Zdotaccent:379,Zdotbelow:7826,Zecyrillic:1047,Zedescendercyrillic:1176,Zedieresiscyrillic:1246,Zeta:918,Zhearmenian:1338,Zhebrevecyrillic:1217,Zhecyrillic:1046,Zhedescendercyrillic:1174,Zhedieresiscyrillic:1244,Zlinebelow:7828,Zmonospace:65338,Zsmall:63354,Zstroke:437,a:97,aabengali:2438,aacute:225,aadeva:2310,aagujarati:2694,aagurmukhi:2566,aamatragurmukhi:2622,aarusquare:13059,aavowelsignbengali:2494,aavowelsigndeva:2366,aavowelsigngujarati:2750,abbreviationmarkarmenian:1375,abbreviationsigndeva:2416,abengali:2437,abopomofo:12570,abreve:259,abreveacute:7855,abrevecyrillic:1233,abrevedotbelow:7863,abrevegrave:7857,abrevehookabove:7859,abrevetilde:7861,acaron:462,acircle:9424,acircumflex:226,acircumflexacute:7845,acircumflexdotbelow:7853,acircumflexgrave:7847,acircumflexhookabove:7849,acircumflextilde:7851,acute:180,acutebelowcmb:791,acutecmb:769,acutecomb:769,acutedeva:2388,acutelowmod:719,acutetonecmb:833,acyrillic:1072,adblgrave:513,addakgurmukhi:2673,adeva:2309,adieresis:228,adieresiscyrillic:1235,adieresismacron:479,adotbelow:7841,adotmacron:481,ae:230,aeacute:509,aekorean:12624,aemacron:483,afii00208:8213,afii08941:8356,afii10017:1040,afii10018:1041,afii10019:1042,afii10020:1043,afii10021:1044,afii10022:1045,afii10023:1025,afii10024:1046,afii10025:1047,afii10026:1048,afii10027:1049,afii10028:1050,afii10029:1051,afii10030:1052,afii10031:1053,afii10032:1054,afii10033:1055,afii10034:1056,afii10035:1057,afii10036:1058,afii10037:1059,afii10038:1060,afii10039:1061,afii10040:1062,afii10041:1063,afii10042:1064,afii10043:1065,afii10044:1066,afii10045:1067,afii10046:1068,afii10047:1069,afii10048:1070,afii10049:1071,afii10050:1168,afii10051:1026,afii10052:1027,afii10053:1028,afii10054:1029,afii10055:1030,afii10056:1031,afii10057:1032,afii10058:1033,afii10059:1034,afii10060:1035,afii10061:1036,afii10062:1038,afii10063:63172,afii10064:63173,afii10065:1072,afii10066:1073,afii10067:1074,afii10068:1075,afii10069:1076,afii10070:1077,afii10071:1105,afii10072:1078,afii10073:1079,afii10074:1080,afii10075:1081,afii10076:1082,afii10077:1083,afii10078:1084,afii10079:1085,afii10080:1086,afii10081:1087,afii10082:1088,afii10083:1089,afii10084:1090,afii10085:1091,afii10086:1092,afii10087:1093,afii10088:1094,afii10089:1095,afii10090:1096,afii10091:1097,afii10092:1098,afii10093:1099,afii10094:1100,afii10095:1101,afii10096:1102,afii10097:1103,afii10098:1169,afii10099:1106,afii10100:1107,afii10101:1108,afii10102:1109,afii10103:1110,afii10104:1111,afii10105:1112,afii10106:1113,afii10107:1114,afii10108:1115,afii10109:1116,afii10110:1118,afii10145:1039,afii10146:1122,afii10147:1138,afii10148:1140,afii10192:63174,afii10193:1119,afii10194:1123,afii10195:1139,afii10196:1141,afii10831:63175,afii10832:63176,afii10846:1241,afii299:8206,afii300:8207,afii301:8205,afii57381:1642,afii57388:1548,afii57392:1632,afii57393:1633,afii57394:1634,afii57395:1635,afii57396:1636,afii57397:1637,afii57398:1638,afii57399:1639,afii57400:1640,afii57401:1641,afii57403:1563,afii57407:1567,afii57409:1569,afii57410:1570,afii57411:1571,afii57412:1572,afii57413:1573,afii57414:1574,afii57415:1575,afii57416:1576,afii57417:1577,afii57418:1578,afii57419:1579,afii57420:1580,afii57421:1581,afii57422:1582,afii57423:1583,afii57424:1584,afii57425:1585,afii57426:1586,afii57427:1587,afii57428:1588,afii57429:1589,afii57430:1590,afii57431:1591,afii57432:1592,afii57433:1593,afii57434:1594,afii57440:1600,afii57441:1601,afii57442:1602,afii57443:1603,afii57444:1604,afii57445:1605,afii57446:1606,afii57448:1608,afii57449:1609,afii57450:1610,afii57451:1611,afii57452:1612,afii57453:1613,afii57454:1614,afii57455:1615,afii57456:1616,afii57457:1617,afii57458:1618,afii57470:1607,afii57505:1700,afii57506:1662,afii57507:1670,afii57508:1688,afii57509:1711,afii57511:1657,afii57512:1672,afii57513:1681,afii57514:1722,afii57519:1746,afii57534:1749,afii57636:8362,afii57645:1470,afii57658:1475,afii57664:1488,afii57665:1489,afii57666:1490,afii57667:1491,afii57668:1492,afii57669:1493,afii57670:1494,afii57671:1495,afii57672:1496,afii57673:1497,afii57674:1498,afii57675:1499,afii57676:1500,afii57677:1501,afii57678:1502,afii57679:1503,afii57680:1504,afii57681:1505,afii57682:1506,afii57683:1507,afii57684:1508,afii57685:1509,afii57686:1510,afii57687:1511,afii57688:1512,afii57689:1513,afii57690:1514,afii57694:64298,afii57695:64299,afii57700:64331,afii57705:64287,afii57716:1520,afii57717:1521,afii57718:1522,afii57723:64309,afii57793:1460,afii57794:1461,afii57795:1462,afii57796:1467,afii57797:1464,afii57798:1463,afii57799:1456,afii57800:1458,afii57801:1457,afii57802:1459,afii57803:1474,afii57804:1473,afii57806:1465,afii57807:1468,afii57839:1469,afii57841:1471,afii57842:1472,afii57929:700,afii61248:8453,afii61289:8467,afii61352:8470,afii61573:8236,afii61574:8237,afii61575:8238,afii61664:8204,afii63167:1645,afii64937:701,agrave:224,agujarati:2693,agurmukhi:2565,ahiragana:12354,ahookabove:7843,aibengali:2448,aibopomofo:12574,aideva:2320,aiecyrillic:1237,aigujarati:2704,aigurmukhi:2576,aimatragurmukhi:2632,ainarabic:1593,ainfinalarabic:65226,aininitialarabic:65227,ainmedialarabic:65228,ainvertedbreve:515,aivowelsignbengali:2504,aivowelsigndeva:2376,aivowelsigngujarati:2760,akatakana:12450,akatakanahalfwidth:65393,akorean:12623,alef:1488,alefarabic:1575,alefdageshhebrew:64304,aleffinalarabic:65166,alefhamzaabovearabic:1571,alefhamzaabovefinalarabic:65156,alefhamzabelowarabic:1573,alefhamzabelowfinalarabic:65160,alefhebrew:1488,aleflamedhebrew:64335,alefmaddaabovearabic:1570,alefmaddaabovefinalarabic:65154,alefmaksuraarabic:1609,alefmaksurafinalarabic:65264,alefmaksurainitialarabic:65267,alefmaksuramedialarabic:65268,alefpatahhebrew:64302,alefqamatshebrew:64303,aleph:8501,allequal:8780,alpha:945,alphatonos:940,amacron:257,amonospace:65345,ampersand:38,ampersandmonospace:65286,ampersandsmall:63270,amsquare:13250,anbopomofo:12578,angbopomofo:12580,angbracketleft:12296,// This glyph is missing from Adobe's original list.
angbracketright:12297,// This glyph is missing from Adobe's original list.
angkhankhuthai:3674,angle:8736,anglebracketleft:12296,anglebracketleftvertical:65087,anglebracketright:12297,anglebracketrightvertical:65088,angleleft:9001,angleright:9002,angstrom:8491,anoteleia:903,anudattadeva:2386,anusvarabengali:2434,anusvaradeva:2306,anusvaragujarati:2690,aogonek:261,apaatosquare:13056,aparen:9372,apostrophearmenian:1370,apostrophemod:700,apple:63743,approaches:8784,approxequal:8776,approxequalorimage:8786,approximatelyequal:8773,araeaekorean:12686,araeakorean:12685,arc:8978,arighthalfring:7834,aring:229,aringacute:507,aringbelow:7681,arrowboth:8596,arrowdashdown:8675,arrowdashleft:8672,arrowdashright:8674,arrowdashup:8673,arrowdblboth:8660,arrowdbldown:8659,arrowdblleft:8656,arrowdblright:8658,arrowdblup:8657,arrowdown:8595,arrowdownleft:8601,arrowdownright:8600,arrowdownwhite:8681,arrowheaddownmod:709,arrowheadleftmod:706,arrowheadrightmod:707,arrowheadupmod:708,arrowhorizex:63719,arrowleft:8592,arrowleftdbl:8656,arrowleftdblstroke:8653,arrowleftoverright:8646,arrowleftwhite:8678,arrowright:8594,arrowrightdblstroke:8655,arrowrightheavy:10142,arrowrightoverleft:8644,arrowrightwhite:8680,arrowtableft:8676,arrowtabright:8677,arrowup:8593,arrowupdn:8597,arrowupdnbse:8616,arrowupdownbase:8616,arrowupleft:8598,arrowupleftofdown:8645,arrowupright:8599,arrowupwhite:8679,arrowvertex:63718,asciicircum:94,asciicircummonospace:65342,asciitilde:126,asciitildemonospace:65374,ascript:593,ascriptturned:594,asmallhiragana:12353,asmallkatakana:12449,asmallkatakanahalfwidth:65383,asterisk:42,asteriskaltonearabic:1645,asteriskarabic:1645,asteriskmath:8727,asteriskmonospace:65290,asterisksmall:65121,asterism:8258,asuperior:63209,asymptoticallyequal:8771,at:64,atilde:227,atmonospace:65312,atsmall:65131,aturned:592,aubengali:2452,aubopomofo:12576,audeva:2324,augujarati:2708,augurmukhi:2580,aulengthmarkbengali:2519,aumatragurmukhi:2636,auvowelsignbengali:2508,auvowelsigndeva:2380,auvowelsigngujarati:2764,avagrahadeva:2365,aybarmenian:1377,ayin:1506,ayinaltonehebrew:64288,ayinhebrew:1506,b:98,babengali:2476,backslash:92,backslashmonospace:65340,badeva:2348,bagujarati:2732,bagurmukhi:2604,bahiragana:12400,bahtthai:3647,bakatakana:12496,bar:124,barmonospace:65372,bbopomofo:12549,bcircle:9425,bdotaccent:7683,bdotbelow:7685,beamedsixteenthnotes:9836,because:8757,becyrillic:1073,beharabic:1576,behfinalarabic:65168,behinitialarabic:65169,behiragana:12409,behmedialarabic:65170,behmeeminitialarabic:64671,behmeemisolatedarabic:64520,behnoonfinalarabic:64621,bekatakana:12505,benarmenian:1378,bet:1489,beta:946,betasymbolgreek:976,betdagesh:64305,betdageshhebrew:64305,bethebrew:1489,betrafehebrew:64332,bhabengali:2477,bhadeva:2349,bhagujarati:2733,bhagurmukhi:2605,bhook:595,bihiragana:12403,bikatakana:12499,bilabialclick:664,bindigurmukhi:2562,birusquare:13105,blackcircle:9679,blackdiamond:9670,blackdownpointingtriangle:9660,blackleftpointingpointer:9668,blackleftpointingtriangle:9664,blacklenticularbracketleft:12304,blacklenticularbracketleftvertical:65083,blacklenticularbracketright:12305,blacklenticularbracketrightvertical:65084,blacklowerlefttriangle:9699,blacklowerrighttriangle:9698,blackrectangle:9644,blackrightpointingpointer:9658,blackrightpointingtriangle:9654,blacksmallsquare:9642,blacksmilingface:9787,blacksquare:9632,blackstar:9733,blackupperlefttriangle:9700,blackupperrighttriangle:9701,blackuppointingsmalltriangle:9652,blackuppointingtriangle:9650,blank:9251,blinebelow:7687,block:9608,bmonospace:65346,bobaimaithai:3610,bohiragana:12412,bokatakana:12508,bparen:9373,bqsquare:13251,braceex:63732,braceleft:123,braceleftbt:63731,braceleftmid:63730,braceleftmonospace:65371,braceleftsmall:65115,bracelefttp:63729,braceleftvertical:65079,braceright:125,bracerightbt:63742,bracerightmid:63741,bracerightmonospace:65373,bracerightsmall:65116,bracerighttp:63740,bracerightvertical:65080,bracketleft:91,bracketleftbt:63728,bracketleftex:63727,bracketleftmonospace:65339,bracketlefttp:63726,bracketright:93,bracketrightbt:63739,bracketrightex:63738,bracketrightmonospace:65341,bracketrighttp:63737,breve:728,brevebelowcmb:814,brevecmb:774,breveinvertedbelowcmb:815,breveinvertedcmb:785,breveinverteddoublecmb:865,bridgebelowcmb:810,bridgeinvertedbelowcmb:826,brokenbar:166,bstroke:384,bsuperior:63210,btopbar:387,buhiragana:12406,bukatakana:12502,bullet:8226,bulletinverse:9688,bulletoperator:8729,bullseye:9678,c:99,caarmenian:1390,cabengali:2458,cacute:263,cadeva:2330,cagujarati:2714,cagurmukhi:2586,calsquare:13192,candrabindubengali:2433,candrabinducmb:784,candrabindudeva:2305,candrabindugujarati:2689,capslock:8682,careof:8453,caron:711,caronbelowcmb:812,caroncmb:780,carriagereturn:8629,cbopomofo:12568,ccaron:269,ccedilla:231,ccedillaacute:7689,ccircle:9426,ccircumflex:265,ccurl:597,cdot:267,cdotaccent:267,cdsquare:13253,cedilla:184,cedillacmb:807,cent:162,centigrade:8451,centinferior:63199,centmonospace:65504,centoldstyle:63394,centsuperior:63200,chaarmenian:1401,chabengali:2459,chadeva:2331,chagujarati:2715,chagurmukhi:2587,chbopomofo:12564,cheabkhasiancyrillic:1213,checkmark:10003,checyrillic:1095,chedescenderabkhasiancyrillic:1215,chedescendercyrillic:1207,chedieresiscyrillic:1269,cheharmenian:1395,chekhakassiancyrillic:1228,cheverticalstrokecyrillic:1209,chi:967,chieuchacirclekorean:12919,chieuchaparenkorean:12823,chieuchcirclekorean:12905,chieuchkorean:12618,chieuchparenkorean:12809,chochangthai:3594,chochanthai:3592,chochingthai:3593,chochoethai:3596,chook:392,cieucacirclekorean:12918,cieucaparenkorean:12822,cieuccirclekorean:12904,cieuckorean:12616,cieucparenkorean:12808,cieucuparenkorean:12828,circle:9675,circlecopyrt:169,// This glyph is missing from Adobe's original list.
circlemultiply:8855,circleot:8857,circleplus:8853,circlepostalmark:12342,circlewithlefthalfblack:9680,circlewithrighthalfblack:9681,circumflex:710,circumflexbelowcmb:813,circumflexcmb:770,clear:8999,clickalveolar:450,clickdental:448,clicklateral:449,clickretroflex:451,club:9827,clubsuitblack:9827,clubsuitwhite:9831,cmcubedsquare:13220,cmonospace:65347,cmsquaredsquare:13216,coarmenian:1409,colon:58,colonmonetary:8353,colonmonospace:65306,colonsign:8353,colonsmall:65109,colontriangularhalfmod:721,colontriangularmod:720,comma:44,commaabovecmb:787,commaaboverightcmb:789,commaaccent:63171,commaarabic:1548,commaarmenian:1373,commainferior:63201,commamonospace:65292,commareversedabovecmb:788,commareversedmod:701,commasmall:65104,commasuperior:63202,commaturnedabovecmb:786,commaturnedmod:699,compass:9788,congruent:8773,contourintegral:8750,control:8963,controlACK:6,controlBEL:7,controlBS:8,controlCAN:24,controlCR:13,controlDC1:17,controlDC2:18,controlDC3:19,controlDC4:20,controlDEL:127,controlDLE:16,controlEM:25,controlENQ:5,controlEOT:4,controlESC:27,controlETB:23,controlETX:3,controlFF:12,controlFS:28,controlGS:29,controlHT:9,controlLF:10,controlNAK:21,controlRS:30,controlSI:15,controlSO:14,controlSOT:2,controlSTX:1,controlSUB:26,controlSYN:22,controlUS:31,controlVT:11,copyright:169,copyrightsans:63721,copyrightserif:63193,cornerbracketleft:12300,cornerbracketlefthalfwidth:65378,cornerbracketleftvertical:65089,cornerbracketright:12301,cornerbracketrighthalfwidth:65379,cornerbracketrightvertical:65090,corporationsquare:13183,cosquare:13255,coverkgsquare:13254,cparen:9374,cruzeiro:8354,cstretched:663,curlyand:8911,curlyor:8910,currency:164,cyrBreve:63185,cyrFlex:63186,cyrbreve:63188,cyrflex:63189,d:100,daarmenian:1380,dabengali:2470,dadarabic:1590,dadeva:2342,dadfinalarabic:65214,dadinitialarabic:65215,dadmedialarabic:65216,dagesh:1468,dageshhebrew:1468,dagger:8224,daggerdbl:8225,dagujarati:2726,dagurmukhi:2598,dahiragana:12384,dakatakana:12480,dalarabic:1583,dalet:1491,daletdagesh:64307,daletdageshhebrew:64307,dalethebrew:1491,dalfinalarabic:65194,dammaarabic:1615,dammalowarabic:1615,dammatanaltonearabic:1612,dammatanarabic:1612,danda:2404,dargahebrew:1447,dargalefthebrew:1447,dasiapneumatacyrilliccmb:1157,dblGrave:63187,dblanglebracketleft:12298,dblanglebracketleftvertical:65085,dblanglebracketright:12299,dblanglebracketrightvertical:65086,dblarchinvertedbelowcmb:811,dblarrowleft:8660,dblarrowright:8658,dbldanda:2405,dblgrave:63190,dblgravecmb:783,dblintegral:8748,dbllowline:8215,dbllowlinecmb:819,dbloverlinecmb:831,dblprimemod:698,dblverticalbar:8214,dblverticallineabovecmb:782,dbopomofo:12553,dbsquare:13256,dcaron:271,dcedilla:7697,dcircle:9427,dcircumflexbelow:7699,dcroat:273,ddabengali:2465,ddadeva:2337,ddagujarati:2721,ddagurmukhi:2593,ddalarabic:1672,ddalfinalarabic:64393,dddhadeva:2396,ddhabengali:2466,ddhadeva:2338,ddhagujarati:2722,ddhagurmukhi:2594,ddotaccent:7691,ddotbelow:7693,decimalseparatorarabic:1643,decimalseparatorpersian:1643,decyrillic:1076,degree:176,dehihebrew:1453,dehiragana:12391,deicoptic:1007,dekatakana:12487,deleteleft:9003,deleteright:8998,delta:948,deltaturned:397,denominatorminusonenumeratorbengali:2552,dezh:676,dhabengali:2471,dhadeva:2343,dhagujarati:2727,dhagurmukhi:2599,dhook:599,dialytikatonos:901,dialytikatonoscmb:836,diamond:9830,diamondsuitwhite:9826,dieresis:168,dieresisacute:63191,dieresisbelowcmb:804,dieresiscmb:776,dieresisgrave:63192,dieresistonos:901,dihiragana:12386,dikatakana:12482,dittomark:12291,divide:247,divides:8739,divisionslash:8725,djecyrillic:1106,dkshade:9619,dlinebelow:7695,dlsquare:13207,dmacron:273,dmonospace:65348,dnblock:9604,dochadathai:3598,dodekthai:3604,dohiragana:12393,dokatakana:12489,dollar:36,dollarinferior:63203,dollarmonospace:65284,dollaroldstyle:63268,dollarsmall:65129,dollarsuperior:63204,dong:8363,dorusquare:13094,dotaccent:729,dotaccentcmb:775,dotbelowcmb:803,dotbelowcomb:803,dotkatakana:12539,dotlessi:305,dotlessj:63166,dotlessjstrokehook:644,dotmath:8901,dottedcircle:9676,doubleyodpatah:64287,doubleyodpatahhebrew:64287,downtackbelowcmb:798,downtackmod:725,dparen:9375,dsuperior:63211,dtail:598,dtopbar:396,duhiragana:12389,dukatakana:12485,dz:499,dzaltone:675,dzcaron:454,dzcurl:677,dzeabkhasiancyrillic:1249,dzecyrillic:1109,dzhecyrillic:1119,e:101,eacute:233,earth:9793,ebengali:2447,ebopomofo:12572,ebreve:277,ecandradeva:2317,ecandragujarati:2701,ecandravowelsigndeva:2373,ecandravowelsigngujarati:2757,ecaron:283,ecedillabreve:7709,echarmenian:1381,echyiwnarmenian:1415,ecircle:9428,ecircumflex:234,ecircumflexacute:7871,ecircumflexbelow:7705,ecircumflexdotbelow:7879,ecircumflexgrave:7873,ecircumflexhookabove:7875,ecircumflextilde:7877,ecyrillic:1108,edblgrave:517,edeva:2319,edieresis:235,edot:279,edotaccent:279,edotbelow:7865,eegurmukhi:2575,eematragurmukhi:2631,efcyrillic:1092,egrave:232,egujarati:2703,eharmenian:1383,ehbopomofo:12573,ehiragana:12360,ehookabove:7867,eibopomofo:12575,eight:56,eightarabic:1640,eightbengali:2542,eightcircle:9319,eightcircleinversesansserif:10129,eightdeva:2414,eighteencircle:9329,eighteenparen:9349,eighteenperiod:9369,eightgujarati:2798,eightgurmukhi:2670,eighthackarabic:1640,eighthangzhou:12328,eighthnotebeamed:9835,eightideographicparen:12839,eightinferior:8328,eightmonospace:65304,eightoldstyle:63288,eightparen:9339,eightperiod:9359,eightpersian:1784,eightroman:8567,eightsuperior:8312,eightthai:3672,einvertedbreve:519,eiotifiedcyrillic:1125,ekatakana:12456,ekatakanahalfwidth:65396,ekonkargurmukhi:2676,ekorean:12628,elcyrillic:1083,element:8712,elevencircle:9322,elevenparen:9342,elevenperiod:9362,elevenroman:8570,ellipsis:8230,ellipsisvertical:8942,emacron:275,emacronacute:7703,emacrongrave:7701,emcyrillic:1084,emdash:8212,emdashvertical:65073,emonospace:65349,emphasismarkarmenian:1371,emptyset:8709,enbopomofo:12579,encyrillic:1085,endash:8211,endashvertical:65074,endescendercyrillic:1187,eng:331,engbopomofo:12581,enghecyrillic:1189,enhookcyrillic:1224,enspace:8194,eogonek:281,eokorean:12627,eopen:603,eopenclosed:666,eopenreversed:604,eopenreversedclosed:606,eopenreversedhook:605,eparen:9376,epsilon:949,epsilontonos:941,equal:61,equalmonospace:65309,equalsmall:65126,equalsuperior:8316,equivalence:8801,erbopomofo:12582,ercyrillic:1088,ereversed:600,ereversedcyrillic:1101,escyrillic:1089,esdescendercyrillic:1195,esh:643,eshcurl:646,eshortdeva:2318,eshortvowelsigndeva:2374,eshreversedloop:426,eshsquatreversed:645,esmallhiragana:12359,esmallkatakana:12455,esmallkatakanahalfwidth:65386,estimated:8494,esuperior:63212,eta:951,etarmenian:1384,etatonos:942,eth:240,etilde:7869,etildebelow:7707,etnahtafoukhhebrew:1425,etnahtafoukhlefthebrew:1425,etnahtahebrew:1425,etnahtalefthebrew:1425,eturned:477,eukorean:12641,euro:8364,evowelsignbengali:2503,evowelsigndeva:2375,evowelsigngujarati:2759,exclam:33,exclamarmenian:1372,exclamdbl:8252,exclamdown:161,exclamdownsmall:63393,exclammonospace:65281,exclamsmall:63265,existential:8707,ezh:658,ezhcaron:495,ezhcurl:659,ezhreversed:441,ezhtail:442,f:102,fadeva:2398,fagurmukhi:2654,fahrenheit:8457,fathaarabic:1614,fathalowarabic:1614,fathatanarabic:1611,fbopomofo:12552,fcircle:9429,fdotaccent:7711,feharabic:1601,feharmenian:1414,fehfinalarabic:65234,fehinitialarabic:65235,fehmedialarabic:65236,feicoptic:997,female:9792,ff:64256,ffi:64259,ffl:64260,fi:64257,fifteencircle:9326,fifteenparen:9346,fifteenperiod:9366,figuredash:8210,filledbox:9632,filledrect:9644,finalkaf:1498,finalkafdagesh:64314,finalkafdageshhebrew:64314,finalkafhebrew:1498,finalmem:1501,finalmemhebrew:1501,finalnun:1503,finalnunhebrew:1503,finalpe:1507,finalpehebrew:1507,finaltsadi:1509,finaltsadihebrew:1509,firsttonechinese:713,fisheye:9673,fitacyrillic:1139,five:53,fivearabic:1637,fivebengali:2539,fivecircle:9316,fivecircleinversesansserif:10126,fivedeva:2411,fiveeighths:8541,fivegujarati:2795,fivegurmukhi:2667,fivehackarabic:1637,fivehangzhou:12325,fiveideographicparen:12836,fiveinferior:8325,fivemonospace:65301,fiveoldstyle:63285,fiveparen:9336,fiveperiod:9356,fivepersian:1781,fiveroman:8564,fivesuperior:8309,fivethai:3669,fl:64258,florin:402,fmonospace:65350,fmsquare:13209,fofanthai:3615,fofathai:3613,fongmanthai:3663,forall:8704,four:52,fourarabic:1636,fourbengali:2538,fourcircle:9315,fourcircleinversesansserif:10125,fourdeva:2410,fourgujarati:2794,fourgurmukhi:2666,fourhackarabic:1636,fourhangzhou:12324,fourideographicparen:12835,fourinferior:8324,fourmonospace:65300,fournumeratorbengali:2551,fouroldstyle:63284,fourparen:9335,fourperiod:9355,fourpersian:1780,fourroman:8563,foursuperior:8308,fourteencircle:9325,fourteenparen:9345,fourteenperiod:9365,fourthai:3668,fourthtonechinese:715,fparen:9377,fraction:8260,franc:8355,g:103,gabengali:2455,gacute:501,gadeva:2327,gafarabic:1711,gaffinalarabic:64403,gafinitialarabic:64404,gafmedialarabic:64405,gagujarati:2711,gagurmukhi:2583,gahiragana:12364,gakatakana:12460,gamma:947,gammalatinsmall:611,gammasuperior:736,gangiacoptic:1003,gbopomofo:12557,gbreve:287,gcaron:487,gcedilla:291,gcircle:9430,gcircumflex:285,gcommaaccent:291,gdot:289,gdotaccent:289,gecyrillic:1075,gehiragana:12370,gekatakana:12466,geometricallyequal:8785,gereshaccenthebrew:1436,gereshhebrew:1523,gereshmuqdamhebrew:1437,germandbls:223,gershayimaccenthebrew:1438,gershayimhebrew:1524,getamark:12307,ghabengali:2456,ghadarmenian:1394,ghadeva:2328,ghagujarati:2712,ghagurmukhi:2584,ghainarabic:1594,ghainfinalarabic:65230,ghaininitialarabic:65231,ghainmedialarabic:65232,ghemiddlehookcyrillic:1173,ghestrokecyrillic:1171,gheupturncyrillic:1169,ghhadeva:2394,ghhagurmukhi:2650,ghook:608,ghzsquare:13203,gihiragana:12366,gikatakana:12462,gimarmenian:1379,gimel:1490,gimeldagesh:64306,gimeldageshhebrew:64306,gimelhebrew:1490,gjecyrillic:1107,glottalinvertedstroke:446,glottalstop:660,glottalstopinverted:662,glottalstopmod:704,glottalstopreversed:661,glottalstopreversedmod:705,glottalstopreversedsuperior:740,glottalstopstroke:673,glottalstopstrokereversed:674,gmacron:7713,gmonospace:65351,gohiragana:12372,gokatakana:12468,gparen:9378,gpasquare:13228,gradient:8711,grave:96,gravebelowcmb:790,gravecmb:768,gravecomb:768,gravedeva:2387,gravelowmod:718,gravemonospace:65344,gravetonecmb:832,greater:62,greaterequal:8805,greaterequalorless:8923,greatermonospace:65310,greaterorequivalent:8819,greaterorless:8823,greateroverequal:8807,greatersmall:65125,gscript:609,gstroke:485,guhiragana:12368,guillemotleft:171,guillemotright:187,guilsinglleft:8249,guilsinglright:8250,gukatakana:12464,guramusquare:13080,gysquare:13257,h:104,haabkhasiancyrillic:1193,haaltonearabic:1729,habengali:2489,hadescendercyrillic:1203,hadeva:2361,hagujarati:2745,hagurmukhi:2617,haharabic:1581,hahfinalarabic:65186,hahinitialarabic:65187,hahiragana:12399,hahmedialarabic:65188,haitusquare:13098,hakatakana:12495,hakatakanahalfwidth:65418,halantgurmukhi:2637,hamzaarabic:1569,hamzalowarabic:1569,hangulfiller:12644,hardsigncyrillic:1098,harpoonleftbarbup:8636,harpoonrightbarbup:8640,hasquare:13258,hatafpatah:1458,hatafpatah16:1458,hatafpatah23:1458,hatafpatah2f:1458,hatafpatahhebrew:1458,hatafpatahnarrowhebrew:1458,hatafpatahquarterhebrew:1458,hatafpatahwidehebrew:1458,hatafqamats:1459,hatafqamats1b:1459,hatafqamats28:1459,hatafqamats34:1459,hatafqamatshebrew:1459,hatafqamatsnarrowhebrew:1459,hatafqamatsquarterhebrew:1459,hatafqamatswidehebrew:1459,hatafsegol:1457,hatafsegol17:1457,hatafsegol24:1457,hatafsegol30:1457,hatafsegolhebrew:1457,hatafsegolnarrowhebrew:1457,hatafsegolquarterhebrew:1457,hatafsegolwidehebrew:1457,hbar:295,hbopomofo:12559,hbrevebelow:7723,hcedilla:7721,hcircle:9431,hcircumflex:293,hdieresis:7719,hdotaccent:7715,hdotbelow:7717,he:1492,heart:9829,heartsuitblack:9829,heartsuitwhite:9825,hedagesh:64308,hedageshhebrew:64308,hehaltonearabic:1729,heharabic:1607,hehebrew:1492,hehfinalaltonearabic:64423,hehfinalalttwoarabic:65258,hehfinalarabic:65258,hehhamzaabovefinalarabic:64421,hehhamzaaboveisolatedarabic:64420,hehinitialaltonearabic:64424,hehinitialarabic:65259,hehiragana:12408,hehmedialaltonearabic:64425,hehmedialarabic:65260,heiseierasquare:13179,hekatakana:12504,hekatakanahalfwidth:65421,hekutaarusquare:13110,henghook:615,herutusquare:13113,het:1495,hethebrew:1495,hhook:614,hhooksuperior:689,hieuhacirclekorean:12923,hieuhaparenkorean:12827,hieuhcirclekorean:12909,hieuhkorean:12622,hieuhparenkorean:12813,hihiragana:12402,hikatakana:12498,hikatakanahalfwidth:65419,hiriq:1460,hiriq14:1460,hiriq21:1460,hiriq2d:1460,hiriqhebrew:1460,hiriqnarrowhebrew:1460,hiriqquarterhebrew:1460,hiriqwidehebrew:1460,hlinebelow:7830,hmonospace:65352,hoarmenian:1392,hohipthai:3627,hohiragana:12411,hokatakana:12507,hokatakanahalfwidth:65422,holam:1465,holam19:1465,holam26:1465,holam32:1465,holamhebrew:1465,holamnarrowhebrew:1465,holamquarterhebrew:1465,holamwidehebrew:1465,honokhukthai:3630,hookabovecomb:777,hookcmb:777,hookpalatalizedbelowcmb:801,hookretroflexbelowcmb:802,hoonsquare:13122,horicoptic:1001,horizontalbar:8213,horncmb:795,hotsprings:9832,house:8962,hparen:9379,hsuperior:688,hturned:613,huhiragana:12405,huiitosquare:13107,hukatakana:12501,hukatakanahalfwidth:65420,hungarumlaut:733,hungarumlautcmb:779,hv:405,hyphen:45,hypheninferior:63205,hyphenmonospace:65293,hyphensmall:65123,hyphensuperior:63206,hyphentwo:8208,i:105,iacute:237,iacyrillic:1103,ibengali:2439,ibopomofo:12583,ibreve:301,icaron:464,icircle:9432,icircumflex:238,icyrillic:1110,idblgrave:521,ideographearthcircle:12943,ideographfirecircle:12939,ideographicallianceparen:12863,ideographiccallparen:12858,ideographiccentrecircle:12965,ideographicclose:12294,ideographiccomma:12289,ideographiccommaleft:65380,ideographiccongratulationparen:12855,ideographiccorrectcircle:12963,ideographicearthparen:12847,ideographicenterpriseparen:12861,ideographicexcellentcircle:12957,ideographicfestivalparen:12864,ideographicfinancialcircle:12950,ideographicfinancialparen:12854,ideographicfireparen:12843,ideographichaveparen:12850,ideographichighcircle:12964,ideographiciterationmark:12293,ideographiclaborcircle:12952,ideographiclaborparen:12856,ideographicleftcircle:12967,ideographiclowcircle:12966,ideographicmedicinecircle:12969,ideographicmetalparen:12846,ideographicmoonparen:12842,ideographicnameparen:12852,ideographicperiod:12290,ideographicprintcircle:12958,ideographicreachparen:12867,ideographicrepresentparen:12857,ideographicresourceparen:12862,ideographicrightcircle:12968,ideographicsecretcircle:12953,ideographicselfparen:12866,ideographicsocietyparen:12851,ideographicspace:12288,ideographicspecialparen:12853,ideographicstockparen:12849,ideographicstudyparen:12859,ideographicsunparen:12848,ideographicsuperviseparen:12860,ideographicwaterparen:12844,ideographicwoodparen:12845,ideographiczero:12295,ideographmetalcircle:12942,ideographmooncircle:12938,ideographnamecircle:12948,ideographsuncircle:12944,ideographwatercircle:12940,ideographwoodcircle:12941,ideva:2311,idieresis:239,idieresisacute:7727,idieresiscyrillic:1253,idotbelow:7883,iebrevecyrillic:1239,iecyrillic:1077,ieungacirclekorean:12917,ieungaparenkorean:12821,ieungcirclekorean:12903,ieungkorean:12615,ieungparenkorean:12807,igrave:236,igujarati:2695,igurmukhi:2567,ihiragana:12356,ihookabove:7881,iibengali:2440,iicyrillic:1080,iideva:2312,iigujarati:2696,iigurmukhi:2568,iimatragurmukhi:2624,iinvertedbreve:523,iishortcyrillic:1081,iivowelsignbengali:2496,iivowelsigndeva:2368,iivowelsigngujarati:2752,ij:307,ikatakana:12452,ikatakanahalfwidth:65394,ikorean:12643,ilde:732,iluyhebrew:1452,imacron:299,imacroncyrillic:1251,imageorapproximatelyequal:8787,imatragurmukhi:2623,imonospace:65353,increment:8710,infinity:8734,iniarmenian:1387,integral:8747,integralbottom:8993,integralbt:8993,integralex:63733,integraltop:8992,integraltp:8992,intersection:8745,intisquare:13061,invbullet:9688,invcircle:9689,invsmileface:9787,iocyrillic:1105,iogonek:303,iota:953,iotadieresis:970,iotadieresistonos:912,iotalatin:617,iotatonos:943,iparen:9380,irigurmukhi:2674,ismallhiragana:12355,ismallkatakana:12451,ismallkatakanahalfwidth:65384,issharbengali:2554,istroke:616,isuperior:63213,iterationhiragana:12445,iterationkatakana:12541,itilde:297,itildebelow:7725,iubopomofo:12585,iucyrillic:1102,ivowelsignbengali:2495,ivowelsigndeva:2367,ivowelsigngujarati:2751,izhitsacyrillic:1141,izhitsadblgravecyrillic:1143,j:106,jaarmenian:1393,jabengali:2460,jadeva:2332,jagujarati:2716,jagurmukhi:2588,jbopomofo:12560,jcaron:496,jcircle:9433,jcircumflex:309,jcrossedtail:669,jdotlessstroke:607,jecyrillic:1112,jeemarabic:1580,jeemfinalarabic:65182,jeeminitialarabic:65183,jeemmedialarabic:65184,jeharabic:1688,jehfinalarabic:64395,jhabengali:2461,jhadeva:2333,jhagujarati:2717,jhagurmukhi:2589,jheharmenian:1403,jis:12292,jmonospace:65354,jparen:9381,jsuperior:690,k:107,kabashkircyrillic:1185,kabengali:2453,kacute:7729,kacyrillic:1082,kadescendercyrillic:1179,kadeva:2325,kaf:1499,kafarabic:1603,kafdagesh:64315,kafdageshhebrew:64315,kaffinalarabic:65242,kafhebrew:1499,kafinitialarabic:65243,kafmedialarabic:65244,kafrafehebrew:64333,kagujarati:2709,kagurmukhi:2581,kahiragana:12363,kahookcyrillic:1220,kakatakana:12459,kakatakanahalfwidth:65398,kappa:954,kappasymbolgreek:1008,kapyeounmieumkorean:12657,kapyeounphieuphkorean:12676,kapyeounpieupkorean:12664,kapyeounssangpieupkorean:12665,karoriisquare:13069,kashidaautoarabic:1600,kashidaautonosidebearingarabic:1600,kasmallkatakana:12533,kasquare:13188,kasraarabic:1616,kasratanarabic:1613,kastrokecyrillic:1183,katahiraprolongmarkhalfwidth:65392,kaverticalstrokecyrillic:1181,kbopomofo:12558,kcalsquare:13193,kcaron:489,kcedilla:311,kcircle:9434,kcommaaccent:311,kdotbelow:7731,keharmenian:1412,kehiragana:12369,kekatakana:12465,kekatakanahalfwidth:65401,kenarmenian:1391,kesmallkatakana:12534,kgreenlandic:312,khabengali:2454,khacyrillic:1093,khadeva:2326,khagujarati:2710,khagurmukhi:2582,khaharabic:1582,khahfinalarabic:65190,khahinitialarabic:65191,khahmedialarabic:65192,kheicoptic:999,khhadeva:2393,khhagurmukhi:2649,khieukhacirclekorean:12920,khieukhaparenkorean:12824,khieukhcirclekorean:12906,khieukhkorean:12619,khieukhparenkorean:12810,khokhaithai:3586,khokhonthai:3589,khokhuatthai:3587,khokhwaithai:3588,khomutthai:3675,khook:409,khorakhangthai:3590,khzsquare:13201,kihiragana:12365,kikatakana:12461,kikatakanahalfwidth:65399,kiroguramusquare:13077,kiromeetorusquare:13078,kirosquare:13076,kiyeokacirclekorean:12910,kiyeokaparenkorean:12814,kiyeokcirclekorean:12896,kiyeokkorean:12593,kiyeokparenkorean:12800,kiyeoksioskorean:12595,kjecyrillic:1116,klinebelow:7733,klsquare:13208,kmcubedsquare:13222,kmonospace:65355,kmsquaredsquare:13218,kohiragana:12371,kohmsquare:13248,kokaithai:3585,kokatakana:12467,kokatakanahalfwidth:65402,kooposquare:13086,koppacyrillic:1153,koreanstandardsymbol:12927,koroniscmb:835,kparen:9382,kpasquare:13226,ksicyrillic:1135,ktsquare:13263,kturned:670,kuhiragana:12367,kukatakana:12463,kukatakanahalfwidth:65400,kvsquare:13240,kwsquare:13246,l:108,labengali:2482,lacute:314,ladeva:2354,lagujarati:2738,lagurmukhi:2610,lakkhangyaothai:3653,lamaleffinalarabic:65276,lamalefhamzaabovefinalarabic:65272,lamalefhamzaaboveisolatedarabic:65271,lamalefhamzabelowfinalarabic:65274,lamalefhamzabelowisolatedarabic:65273,lamalefisolatedarabic:65275,lamalefmaddaabovefinalarabic:65270,lamalefmaddaaboveisolatedarabic:65269,lamarabic:1604,lambda:955,lambdastroke:411,lamed:1500,lameddagesh:64316,lameddageshhebrew:64316,lamedhebrew:1500,lamfinalarabic:65246,lamhahinitialarabic:64714,laminitialarabic:65247,lamjeeminitialarabic:64713,lamkhahinitialarabic:64715,lamlamhehisolatedarabic:65010,lammedialarabic:65248,lammeemhahinitialarabic:64904,lammeeminitialarabic:64716,largecircle:9711,lbar:410,lbelt:620,lbopomofo:12556,lcaron:318,lcedilla:316,lcircle:9435,lcircumflexbelow:7741,lcommaaccent:316,ldot:320,ldotaccent:320,ldotbelow:7735,ldotbelowmacron:7737,leftangleabovecmb:794,lefttackbelowcmb:792,less:60,lessequal:8804,lessequalorgreater:8922,lessmonospace:65308,lessorequivalent:8818,lessorgreater:8822,lessoverequal:8806,lesssmall:65124,lezh:622,lfblock:9612,lhookretroflex:621,lira:8356,liwnarmenian:1388,lj:457,ljecyrillic:1113,ll:63168,lladeva:2355,llagujarati:2739,llinebelow:7739,llladeva:2356,llvocalicbengali:2529,llvocalicdeva:2401,llvocalicvowelsignbengali:2531,llvocalicvowelsigndeva:2403,lmiddletilde:619,lmonospace:65356,lmsquare:13264,lochulathai:3628,logicaland:8743,logicalnot:172,logicalnotreversed:8976,logicalor:8744,lolingthai:3621,longs:383,lowlinecenterline:65102,lowlinecmb:818,lowlinedashed:65101,lozenge:9674,lparen:9383,lslash:322,lsquare:8467,lsuperior:63214,ltshade:9617,luthai:3622,lvocalicbengali:2444,lvocalicdeva:2316,lvocalicvowelsignbengali:2530,lvocalicvowelsigndeva:2402,lxsquare:13267,m:109,mabengali:2478,macron:175,macronbelowcmb:817,macroncmb:772,macronlowmod:717,macronmonospace:65507,macute:7743,madeva:2350,magujarati:2734,magurmukhi:2606,mahapakhhebrew:1444,mahapakhlefthebrew:1444,mahiragana:12414,maichattawalowleftthai:63637,maichattawalowrightthai:63636,maichattawathai:3659,maichattawaupperleftthai:63635,maieklowleftthai:63628,maieklowrightthai:63627,maiekthai:3656,maiekupperleftthai:63626,maihanakatleftthai:63620,maihanakatthai:3633,maitaikhuleftthai:63625,maitaikhuthai:3655,maitholowleftthai:63631,maitholowrightthai:63630,maithothai:3657,maithoupperleftthai:63629,maitrilowleftthai:63634,maitrilowrightthai:63633,maitrithai:3658,maitriupperleftthai:63632,maiyamokthai:3654,makatakana:12510,makatakanahalfwidth:65423,male:9794,mansyonsquare:13127,maqafhebrew:1470,mars:9794,masoracirclehebrew:1455,masquare:13187,mbopomofo:12551,mbsquare:13268,mcircle:9436,mcubedsquare:13221,mdotaccent:7745,mdotbelow:7747,meemarabic:1605,meemfinalarabic:65250,meeminitialarabic:65251,meemmedialarabic:65252,meemmeeminitialarabic:64721,meemmeemisolatedarabic:64584,meetorusquare:13133,mehiragana:12417,meizierasquare:13182,mekatakana:12513,mekatakanahalfwidth:65426,mem:1502,memdagesh:64318,memdageshhebrew:64318,memhebrew:1502,menarmenian:1396,merkhahebrew:1445,merkhakefulahebrew:1446,merkhakefulalefthebrew:1446,merkhalefthebrew:1445,mhook:625,mhzsquare:13202,middledotkatakanahalfwidth:65381,middot:183,mieumacirclekorean:12914,mieumaparenkorean:12818,mieumcirclekorean:12900,mieumkorean:12609,mieumpansioskorean:12656,mieumparenkorean:12804,mieumpieupkorean:12654,mieumsioskorean:12655,mihiragana:12415,mikatakana:12511,mikatakanahalfwidth:65424,minus:8722,minusbelowcmb:800,minuscircle:8854,minusmod:727,minusplus:8723,minute:8242,miribaarusquare:13130,mirisquare:13129,mlonglegturned:624,mlsquare:13206,mmcubedsquare:13219,mmonospace:65357,mmsquaredsquare:13215,mohiragana:12418,mohmsquare:13249,mokatakana:12514,mokatakanahalfwidth:65427,molsquare:13270,momathai:3617,moverssquare:13223,moverssquaredsquare:13224,mparen:9384,mpasquare:13227,mssquare:13235,msuperior:63215,mturned:623,mu:181,mu1:181,muasquare:13186,muchgreater:8811,muchless:8810,mufsquare:13196,mugreek:956,mugsquare:13197,muhiragana:12416,mukatakana:12512,mukatakanahalfwidth:65425,mulsquare:13205,multiply:215,mumsquare:13211,munahhebrew:1443,munahlefthebrew:1443,musicalnote:9834,musicalnotedbl:9835,musicflatsign:9837,musicsharpsign:9839,mussquare:13234,muvsquare:13238,muwsquare:13244,mvmegasquare:13241,mvsquare:13239,mwmegasquare:13247,mwsquare:13245,n:110,nabengali:2472,nabla:8711,nacute:324,nadeva:2344,nagujarati:2728,nagurmukhi:2600,nahiragana:12394,nakatakana:12490,nakatakanahalfwidth:65413,napostrophe:329,nasquare:13185,nbopomofo:12555,nbspace:160,ncaron:328,ncedilla:326,ncircle:9437,ncircumflexbelow:7755,ncommaaccent:326,ndotaccent:7749,ndotbelow:7751,nehiragana:12397,nekatakana:12493,nekatakanahalfwidth:65416,newsheqelsign:8362,nfsquare:13195,ngabengali:2457,ngadeva:2329,ngagujarati:2713,ngagurmukhi:2585,ngonguthai:3591,nhiragana:12435,nhookleft:626,nhookretroflex:627,nieunacirclekorean:12911,nieunaparenkorean:12815,nieuncieuckorean:12597,nieuncirclekorean:12897,nieunhieuhkorean:12598,nieunkorean:12596,nieunpansioskorean:12648,nieunparenkorean:12801,nieunsioskorean:12647,nieuntikeutkorean:12646,nihiragana:12395,nikatakana:12491,nikatakanahalfwidth:65414,nikhahitleftthai:63641,nikhahitthai:3661,nine:57,ninearabic:1641,ninebengali:2543,ninecircle:9320,ninecircleinversesansserif:10130,ninedeva:2415,ninegujarati:2799,ninegurmukhi:2671,ninehackarabic:1641,ninehangzhou:12329,nineideographicparen:12840,nineinferior:8329,ninemonospace:65305,nineoldstyle:63289,nineparen:9340,nineperiod:9360,ninepersian:1785,nineroman:8568,ninesuperior:8313,nineteencircle:9330,nineteenparen:9350,nineteenperiod:9370,ninethai:3673,nj:460,njecyrillic:1114,nkatakana:12531,nkatakanahalfwidth:65437,nlegrightlong:414,nlinebelow:7753,nmonospace:65358,nmsquare:13210,nnabengali:2467,nnadeva:2339,nnagujarati:2723,nnagurmukhi:2595,nnnadeva:2345,nohiragana:12398,nokatakana:12494,nokatakanahalfwidth:65417,nonbreakingspace:160,nonenthai:3603,nonuthai:3609,noonarabic:1606,noonfinalarabic:65254,noonghunnaarabic:1722,noonghunnafinalarabic:64415,nooninitialarabic:65255,noonjeeminitialarabic:64722,noonjeemisolatedarabic:64587,noonmedialarabic:65256,noonmeeminitialarabic:64725,noonmeemisolatedarabic:64590,noonnoonfinalarabic:64653,notcontains:8716,notelement:8713,notelementof:8713,notequal:8800,notgreater:8815,notgreaternorequal:8817,notgreaternorless:8825,notidentical:8802,notless:8814,notlessnorequal:8816,notparallel:8742,notprecedes:8832,notsubset:8836,notsucceeds:8833,notsuperset:8837,nowarmenian:1398,nparen:9385,nssquare:13233,nsuperior:8319,ntilde:241,nu:957,nuhiragana:12396,nukatakana:12492,nukatakanahalfwidth:65415,nuktabengali:2492,nuktadeva:2364,nuktagujarati:2748,nuktagurmukhi:2620,numbersign:35,numbersignmonospace:65283,numbersignsmall:65119,numeralsigngreek:884,numeralsignlowergreek:885,numero:8470,nun:1504,nundagesh:64320,nundageshhebrew:64320,nunhebrew:1504,nvsquare:13237,nwsquare:13243,nyabengali:2462,nyadeva:2334,nyagujarati:2718,nyagurmukhi:2590,o:111,oacute:243,oangthai:3629,obarred:629,obarredcyrillic:1257,obarreddieresiscyrillic:1259,obengali:2451,obopomofo:12571,obreve:335,ocandradeva:2321,ocandragujarati:2705,ocandravowelsigndeva:2377,ocandravowelsigngujarati:2761,ocaron:466,ocircle:9438,ocircumflex:244,ocircumflexacute:7889,ocircumflexdotbelow:7897,ocircumflexgrave:7891,ocircumflexhookabove:7893,ocircumflextilde:7895,ocyrillic:1086,odblacute:337,odblgrave:525,odeva:2323,odieresis:246,odieresiscyrillic:1255,odotbelow:7885,oe:339,oekorean:12634,ogonek:731,ogonekcmb:808,ograve:242,ogujarati:2707,oharmenian:1413,ohiragana:12362,ohookabove:7887,ohorn:417,ohornacute:7899,ohorndotbelow:7907,ohorngrave:7901,ohornhookabove:7903,ohorntilde:7905,ohungarumlaut:337,oi:419,oinvertedbreve:527,okatakana:12458,okatakanahalfwidth:65397,okorean:12631,olehebrew:1451,omacron:333,omacronacute:7763,omacrongrave:7761,omdeva:2384,omega:969,omega1:982,omegacyrillic:1121,omegalatinclosed:631,omegaroundcyrillic:1147,omegatitlocyrillic:1149,omegatonos:974,omgujarati:2768,omicron:959,omicrontonos:972,omonospace:65359,one:49,onearabic:1633,onebengali:2535,onecircle:9312,onecircleinversesansserif:10122,onedeva:2407,onedotenleader:8228,oneeighth:8539,onefitted:63196,onegujarati:2791,onegurmukhi:2663,onehackarabic:1633,onehalf:189,onehangzhou:12321,oneideographicparen:12832,oneinferior:8321,onemonospace:65297,onenumeratorbengali:2548,oneoldstyle:63281,oneparen:9332,oneperiod:9352,onepersian:1777,onequarter:188,oneroman:8560,onesuperior:185,onethai:3665,onethird:8531,oogonek:491,oogonekmacron:493,oogurmukhi:2579,oomatragurmukhi:2635,oopen:596,oparen:9386,openbullet:9702,option:8997,ordfeminine:170,ordmasculine:186,orthogonal:8735,oshortdeva:2322,oshortvowelsigndeva:2378,oslash:248,oslashacute:511,osmallhiragana:12361,osmallkatakana:12457,osmallkatakanahalfwidth:65387,ostrokeacute:511,osuperior:63216,otcyrillic:1151,otilde:245,otildeacute:7757,otildedieresis:7759,oubopomofo:12577,overline:8254,overlinecenterline:65098,overlinecmb:773,overlinedashed:65097,overlinedblwavy:65100,overlinewavy:65099,overscore:175,ovowelsignbengali:2507,ovowelsigndeva:2379,ovowelsigngujarati:2763,p:112,paampssquare:13184,paasentosquare:13099,pabengali:2474,pacute:7765,padeva:2346,pagedown:8671,pageup:8670,pagujarati:2730,pagurmukhi:2602,pahiragana:12401,paiyannoithai:3631,pakatakana:12497,palatalizationcyrilliccmb:1156,palochkacyrillic:1216,pansioskorean:12671,paragraph:182,parallel:8741,parenleft:40,parenleftaltonearabic:64830,parenleftbt:63725,parenleftex:63724,parenleftinferior:8333,parenleftmonospace:65288,parenleftsmall:65113,parenleftsuperior:8317,parenlefttp:63723,parenleftvertical:65077,parenright:41,parenrightaltonearabic:64831,parenrightbt:63736,parenrightex:63735,parenrightinferior:8334,parenrightmonospace:65289,parenrightsmall:65114,parenrightsuperior:8318,parenrighttp:63734,parenrightvertical:65078,partialdiff:8706,paseqhebrew:1472,pashtahebrew:1433,pasquare:13225,patah:1463,patah11:1463,patah1d:1463,patah2a:1463,patahhebrew:1463,patahnarrowhebrew:1463,patahquarterhebrew:1463,patahwidehebrew:1463,pazerhebrew:1441,pbopomofo:12550,pcircle:9439,pdotaccent:7767,pe:1508,pecyrillic:1087,pedagesh:64324,pedageshhebrew:64324,peezisquare:13115,pefinaldageshhebrew:64323,peharabic:1662,peharmenian:1402,pehebrew:1508,pehfinalarabic:64343,pehinitialarabic:64344,pehiragana:12410,pehmedialarabic:64345,pekatakana:12506,pemiddlehookcyrillic:1191,perafehebrew:64334,percent:37,percentarabic:1642,percentmonospace:65285,percentsmall:65130,period:46,periodarmenian:1417,periodcentered:183,periodhalfwidth:65377,periodinferior:63207,periodmonospace:65294,periodsmall:65106,periodsuperior:63208,perispomenigreekcmb:834,perpendicular:8869,perthousand:8240,peseta:8359,pfsquare:13194,phabengali:2475,phadeva:2347,phagujarati:2731,phagurmukhi:2603,phi:966,phi1:981,phieuphacirclekorean:12922,phieuphaparenkorean:12826,phieuphcirclekorean:12908,phieuphkorean:12621,phieuphparenkorean:12812,philatin:632,phinthuthai:3642,phisymbolgreek:981,phook:421,phophanthai:3614,phophungthai:3612,phosamphaothai:3616,pi:960,pieupacirclekorean:12915,pieupaparenkorean:12819,pieupcieuckorean:12662,pieupcirclekorean:12901,pieupkiyeokkorean:12658,pieupkorean:12610,pieupparenkorean:12805,pieupsioskiyeokkorean:12660,pieupsioskorean:12612,pieupsiostikeutkorean:12661,pieupthieuthkorean:12663,pieuptikeutkorean:12659,pihiragana:12404,pikatakana:12500,pisymbolgreek:982,piwrarmenian:1411,plus:43,plusbelowcmb:799,pluscircle:8853,plusminus:177,plusmod:726,plusmonospace:65291,plussmall:65122,plussuperior:8314,pmonospace:65360,pmsquare:13272,pohiragana:12413,pointingindexdownwhite:9759,pointingindexleftwhite:9756,pointingindexrightwhite:9758,pointingindexupwhite:9757,pokatakana:12509,poplathai:3611,postalmark:12306,postalmarkface:12320,pparen:9387,precedes:8826,prescription:8478,primemod:697,primereversed:8245,product:8719,projective:8965,prolongedkana:12540,propellor:8984,propersubset:8834,propersuperset:8835,proportion:8759,proportional:8733,psi:968,psicyrillic:1137,psilipneumatacyrilliccmb:1158,pssquare:13232,puhiragana:12407,pukatakana:12503,pvsquare:13236,pwsquare:13242,q:113,qadeva:2392,qadmahebrew:1448,qafarabic:1602,qaffinalarabic:65238,qafinitialarabic:65239,qafmedialarabic:65240,qamats:1464,qamats10:1464,qamats1a:1464,qamats1c:1464,qamats27:1464,qamats29:1464,qamats33:1464,qamatsde:1464,qamatshebrew:1464,qamatsnarrowhebrew:1464,qamatsqatanhebrew:1464,qamatsqatannarrowhebrew:1464,qamatsqatanquarterhebrew:1464,qamatsqatanwidehebrew:1464,qamatsquarterhebrew:1464,qamatswidehebrew:1464,qarneyparahebrew:1439,qbopomofo:12561,qcircle:9440,qhook:672,qmonospace:65361,qof:1511,qofdagesh:64327,qofdageshhebrew:64327,qofhebrew:1511,qparen:9388,quarternote:9833,qubuts:1467,qubuts18:1467,qubuts25:1467,qubuts31:1467,qubutshebrew:1467,qubutsnarrowhebrew:1467,qubutsquarterhebrew:1467,qubutswidehebrew:1467,question:63,questionarabic:1567,questionarmenian:1374,questiondown:191,questiondownsmall:63423,questiongreek:894,questionmonospace:65311,questionsmall:63295,quotedbl:34,quotedblbase:8222,quotedblleft:8220,quotedblmonospace:65282,quotedblprime:12318,quotedblprimereversed:12317,quotedblright:8221,quoteleft:8216,quoteleftreversed:8219,quotereversed:8219,
quoteright:8217,quoterightn:329,quotesinglbase:8218,quotesingle:39,quotesinglemonospace:65287,r:114,raarmenian:1404,rabengali:2480,racute:341,radeva:2352,radical:8730,radicalex:63717,radoverssquare:13230,radoverssquaredsquare:13231,radsquare:13229,rafe:1471,rafehebrew:1471,ragujarati:2736,ragurmukhi:2608,rahiragana:12425,rakatakana:12521,rakatakanahalfwidth:65431,ralowerdiagonalbengali:2545,ramiddlediagonalbengali:2544,ramshorn:612,ratio:8758,rbopomofo:12566,rcaron:345,rcedilla:343,rcircle:9441,rcommaaccent:343,rdblgrave:529,rdotaccent:7769,rdotbelow:7771,rdotbelowmacron:7773,referencemark:8251,reflexsubset:8838,reflexsuperset:8839,registered:174,registersans:63720,registerserif:63194,reharabic:1585,reharmenian:1408,rehfinalarabic:65198,rehiragana:12428,rekatakana:12524,rekatakanahalfwidth:65434,resh:1512,reshdageshhebrew:64328,reshhebrew:1512,reversedtilde:8765,reviahebrew:1431,reviamugrashhebrew:1431,revlogicalnot:8976,rfishhook:638,rfishhookreversed:639,rhabengali:2525,rhadeva:2397,rho:961,rhook:637,rhookturned:635,rhookturnedsuperior:693,rhosymbolgreek:1009,rhotichookmod:734,rieulacirclekorean:12913,rieulaparenkorean:12817,rieulcirclekorean:12899,rieulhieuhkorean:12608,rieulkiyeokkorean:12602,rieulkiyeoksioskorean:12649,rieulkorean:12601,rieulmieumkorean:12603,rieulpansioskorean:12652,rieulparenkorean:12803,rieulphieuphkorean:12607,rieulpieupkorean:12604,rieulpieupsioskorean:12651,rieulsioskorean:12605,rieulthieuthkorean:12606,rieultikeutkorean:12650,rieulyeorinhieuhkorean:12653,rightangle:8735,righttackbelowcmb:793,righttriangle:8895,rihiragana:12426,rikatakana:12522,rikatakanahalfwidth:65432,ring:730,ringbelowcmb:805,ringcmb:778,ringhalfleft:703,ringhalfleftarmenian:1369,ringhalfleftbelowcmb:796,ringhalfleftcentered:723,ringhalfright:702,ringhalfrightbelowcmb:825,ringhalfrightcentered:722,rinvertedbreve:531,rittorusquare:13137,rlinebelow:7775,rlongleg:636,rlonglegturned:634,rmonospace:65362,rohiragana:12429,rokatakana:12525,rokatakanahalfwidth:65435,roruathai:3619,rparen:9389,rrabengali:2524,rradeva:2353,rragurmukhi:2652,rreharabic:1681,rrehfinalarabic:64397,rrvocalicbengali:2528,rrvocalicdeva:2400,rrvocalicgujarati:2784,rrvocalicvowelsignbengali:2500,rrvocalicvowelsigndeva:2372,rrvocalicvowelsigngujarati:2756,rsuperior:63217,rtblock:9616,rturned:633,rturnedsuperior:692,ruhiragana:12427,rukatakana:12523,rukatakanahalfwidth:65433,rupeemarkbengali:2546,rupeesignbengali:2547,rupiah:63197,ruthai:3620,rvocalicbengali:2443,rvocalicdeva:2315,rvocalicgujarati:2699,rvocalicvowelsignbengali:2499,rvocalicvowelsigndeva:2371,rvocalicvowelsigngujarati:2755,s:115,sabengali:2488,sacute:347,sacutedotaccent:7781,sadarabic:1589,sadeva:2360,sadfinalarabic:65210,sadinitialarabic:65211,sadmedialarabic:65212,sagujarati:2744,sagurmukhi:2616,sahiragana:12373,sakatakana:12469,sakatakanahalfwidth:65403,sallallahoualayhewasallamarabic:65018,samekh:1505,samekhdagesh:64321,samekhdageshhebrew:64321,samekhhebrew:1505,saraaathai:3634,saraaethai:3649,saraaimaimalaithai:3652,saraaimaimuanthai:3651,saraamthai:3635,saraathai:3632,saraethai:3648,saraiileftthai:63622,saraiithai:3637,saraileftthai:63621,saraithai:3636,saraothai:3650,saraueeleftthai:63624,saraueethai:3639,saraueleftthai:63623,sarauethai:3638,sarauthai:3640,sarauuthai:3641,sbopomofo:12569,scaron:353,scarondotaccent:7783,scedilla:351,schwa:601,schwacyrillic:1241,schwadieresiscyrillic:1243,schwahook:602,scircle:9442,scircumflex:349,scommaaccent:537,sdotaccent:7777,sdotbelow:7779,sdotbelowdotaccent:7785,seagullbelowcmb:828,second:8243,secondtonechinese:714,section:167,seenarabic:1587,seenfinalarabic:65202,seeninitialarabic:65203,seenmedialarabic:65204,segol:1462,segol13:1462,segol1f:1462,segol2c:1462,segolhebrew:1462,segolnarrowhebrew:1462,segolquarterhebrew:1462,segoltahebrew:1426,segolwidehebrew:1462,seharmenian:1405,sehiragana:12379,sekatakana:12475,sekatakanahalfwidth:65406,semicolon:59,semicolonarabic:1563,semicolonmonospace:65307,semicolonsmall:65108,semivoicedmarkkana:12444,semivoicedmarkkanahalfwidth:65439,sentisquare:13090,sentosquare:13091,seven:55,sevenarabic:1639,sevenbengali:2541,sevencircle:9318,sevencircleinversesansserif:10128,sevendeva:2413,seveneighths:8542,sevengujarati:2797,sevengurmukhi:2669,sevenhackarabic:1639,sevenhangzhou:12327,sevenideographicparen:12838,seveninferior:8327,sevenmonospace:65303,sevenoldstyle:63287,sevenparen:9338,sevenperiod:9358,sevenpersian:1783,sevenroman:8566,sevensuperior:8311,seventeencircle:9328,seventeenparen:9348,seventeenperiod:9368,seventhai:3671,sfthyphen:173,shaarmenian:1399,shabengali:2486,shacyrillic:1096,shaddaarabic:1617,shaddadammaarabic:64609,shaddadammatanarabic:64606,shaddafathaarabic:64608,shaddakasraarabic:64610,shaddakasratanarabic:64607,shade:9618,shadedark:9619,shadelight:9617,shademedium:9618,shadeva:2358,shagujarati:2742,shagurmukhi:2614,shalshelethebrew:1427,shbopomofo:12565,shchacyrillic:1097,sheenarabic:1588,sheenfinalarabic:65206,sheeninitialarabic:65207,sheenmedialarabic:65208,sheicoptic:995,sheqel:8362,sheqelhebrew:8362,sheva:1456,sheva115:1456,sheva15:1456,sheva22:1456,sheva2e:1456,shevahebrew:1456,shevanarrowhebrew:1456,shevaquarterhebrew:1456,shevawidehebrew:1456,shhacyrillic:1211,shimacoptic:1005,shin:1513,shindagesh:64329,shindageshhebrew:64329,shindageshshindot:64300,shindageshshindothebrew:64300,shindageshsindot:64301,shindageshsindothebrew:64301,shindothebrew:1473,shinhebrew:1513,shinshindot:64298,shinshindothebrew:64298,shinsindot:64299,shinsindothebrew:64299,shook:642,sigma:963,sigma1:962,sigmafinal:962,sigmalunatesymbolgreek:1010,sihiragana:12375,sikatakana:12471,sikatakanahalfwidth:65404,siluqhebrew:1469,siluqlefthebrew:1469,similar:8764,sindothebrew:1474,siosacirclekorean:12916,siosaparenkorean:12820,sioscieuckorean:12670,sioscirclekorean:12902,sioskiyeokkorean:12666,sioskorean:12613,siosnieunkorean:12667,siosparenkorean:12806,siospieupkorean:12669,siostikeutkorean:12668,six:54,sixarabic:1638,sixbengali:2540,sixcircle:9317,sixcircleinversesansserif:10127,sixdeva:2412,sixgujarati:2796,sixgurmukhi:2668,sixhackarabic:1638,sixhangzhou:12326,sixideographicparen:12837,sixinferior:8326,sixmonospace:65302,sixoldstyle:63286,sixparen:9337,sixperiod:9357,sixpersian:1782,sixroman:8565,sixsuperior:8310,sixteencircle:9327,sixteencurrencydenominatorbengali:2553,sixteenparen:9347,sixteenperiod:9367,sixthai:3670,slash:47,slashmonospace:65295,slong:383,slongdotaccent:7835,smileface:9786,smonospace:65363,sofpasuqhebrew:1475,softhyphen:173,softsigncyrillic:1100,sohiragana:12381,sokatakana:12477,sokatakanahalfwidth:65407,soliduslongoverlaycmb:824,solidusshortoverlaycmb:823,sorusithai:3625,sosalathai:3624,sosothai:3595,sosuathai:3626,space:32,spacehackarabic:32,spade:9824,spadesuitblack:9824,spadesuitwhite:9828,sparen:9390,squarebelowcmb:827,squarecc:13252,squarecm:13213,squarediagonalcrosshatchfill:9641,squarehorizontalfill:9636,squarekg:13199,squarekm:13214,squarekmcapital:13262,squareln:13265,squarelog:13266,squaremg:13198,squaremil:13269,squaremm:13212,squaremsquared:13217,squareorthogonalcrosshatchfill:9638,squareupperlefttolowerrightfill:9639,squareupperrighttolowerleftfill:9640,squareverticalfill:9637,squarewhitewithsmallblack:9635,srsquare:13275,ssabengali:2487,ssadeva:2359,ssagujarati:2743,ssangcieuckorean:12617,ssanghieuhkorean:12677,ssangieungkorean:12672,ssangkiyeokkorean:12594,ssangnieunkorean:12645,ssangpieupkorean:12611,ssangsioskorean:12614,ssangtikeutkorean:12600,ssuperior:63218,sterling:163,sterlingmonospace:65505,strokelongoverlaycmb:822,strokeshortoverlaycmb:821,subset:8834,subsetnotequal:8842,subsetorequal:8838,succeeds:8827,suchthat:8715,suhiragana:12377,sukatakana:12473,sukatakanahalfwidth:65405,sukunarabic:1618,summation:8721,sun:9788,superset:8835,supersetnotequal:8843,supersetorequal:8839,svsquare:13276,syouwaerasquare:13180,t:116,tabengali:2468,tackdown:8868,tackleft:8867,tadeva:2340,tagujarati:2724,tagurmukhi:2596,taharabic:1591,tahfinalarabic:65218,tahinitialarabic:65219,tahiragana:12383,tahmedialarabic:65220,taisyouerasquare:13181,takatakana:12479,takatakanahalfwidth:65408,tatweelarabic:1600,tau:964,tav:1514,tavdages:64330,tavdagesh:64330,tavdageshhebrew:64330,tavhebrew:1514,tbar:359,tbopomofo:12554,tcaron:357,tccurl:680,tcedilla:355,tcheharabic:1670,tchehfinalarabic:64379,tchehinitialarabic:64380,tchehmedialarabic:64381,tcircle:9443,tcircumflexbelow:7793,tcommaaccent:355,tdieresis:7831,tdotaccent:7787,tdotbelow:7789,tecyrillic:1090,tedescendercyrillic:1197,teharabic:1578,tehfinalarabic:65174,tehhahinitialarabic:64674,tehhahisolatedarabic:64524,tehinitialarabic:65175,tehiragana:12390,tehjeeminitialarabic:64673,tehjeemisolatedarabic:64523,tehmarbutaarabic:1577,tehmarbutafinalarabic:65172,tehmedialarabic:65176,tehmeeminitialarabic:64676,tehmeemisolatedarabic:64526,tehnoonfinalarabic:64627,tekatakana:12486,tekatakanahalfwidth:65411,telephone:8481,telephoneblack:9742,telishagedolahebrew:1440,telishaqetanahebrew:1449,tencircle:9321,tenideographicparen:12841,tenparen:9341,tenperiod:9361,tenroman:8569,tesh:679,tet:1496,tetdagesh:64312,tetdageshhebrew:64312,tethebrew:1496,tetsecyrillic:1205,tevirhebrew:1435,tevirlefthebrew:1435,thabengali:2469,thadeva:2341,thagujarati:2725,thagurmukhi:2597,thalarabic:1584,thalfinalarabic:65196,thanthakhatlowleftthai:63640,thanthakhatlowrightthai:63639,thanthakhatthai:3660,thanthakhatupperleftthai:63638,theharabic:1579,thehfinalarabic:65178,thehinitialarabic:65179,thehmedialarabic:65180,thereexists:8707,therefore:8756,theta:952,theta1:977,thetasymbolgreek:977,thieuthacirclekorean:12921,thieuthaparenkorean:12825,thieuthcirclekorean:12907,thieuthkorean:12620,thieuthparenkorean:12811,thirteencircle:9324,thirteenparen:9344,thirteenperiod:9364,thonangmonthothai:3601,thook:429,thophuthaothai:3602,thorn:254,thothahanthai:3607,thothanthai:3600,thothongthai:3608,thothungthai:3606,thousandcyrillic:1154,thousandsseparatorarabic:1644,thousandsseparatorpersian:1644,three:51,threearabic:1635,threebengali:2537,threecircle:9314,threecircleinversesansserif:10124,threedeva:2409,threeeighths:8540,threegujarati:2793,threegurmukhi:2665,threehackarabic:1635,threehangzhou:12323,threeideographicparen:12834,threeinferior:8323,threemonospace:65299,threenumeratorbengali:2550,threeoldstyle:63283,threeparen:9334,threeperiod:9354,threepersian:1779,threequarters:190,threequartersemdash:63198,threeroman:8562,threesuperior:179,threethai:3667,thzsquare:13204,tihiragana:12385,tikatakana:12481,tikatakanahalfwidth:65409,tikeutacirclekorean:12912,tikeutaparenkorean:12816,tikeutcirclekorean:12898,tikeutkorean:12599,tikeutparenkorean:12802,tilde:732,tildebelowcmb:816,tildecmb:771,tildecomb:771,tildedoublecmb:864,tildeoperator:8764,tildeoverlaycmb:820,tildeverticalcmb:830,timescircle:8855,tipehahebrew:1430,tipehalefthebrew:1430,tippigurmukhi:2672,titlocyrilliccmb:1155,tiwnarmenian:1407,tlinebelow:7791,tmonospace:65364,toarmenian:1385,tohiragana:12392,tokatakana:12488,tokatakanahalfwidth:65412,tonebarextrahighmod:741,tonebarextralowmod:745,tonebarhighmod:742,tonebarlowmod:744,tonebarmidmod:743,tonefive:445,tonesix:389,tonetwo:424,tonos:900,tonsquare:13095,topatakthai:3599,tortoiseshellbracketleft:12308,tortoiseshellbracketleftsmall:65117,tortoiseshellbracketleftvertical:65081,tortoiseshellbracketright:12309,tortoiseshellbracketrightsmall:65118,tortoiseshellbracketrightvertical:65082,totaothai:3605,tpalatalhook:427,tparen:9391,trademark:8482,trademarksans:63722,trademarkserif:63195,tretroflexhook:648,triagdn:9660,triaglf:9668,triagrt:9658,triagup:9650,ts:678,tsadi:1510,tsadidagesh:64326,tsadidageshhebrew:64326,tsadihebrew:1510,tsecyrillic:1094,tsere:1461,tsere12:1461,tsere1e:1461,tsere2b:1461,tserehebrew:1461,tserenarrowhebrew:1461,tserequarterhebrew:1461,tserewidehebrew:1461,tshecyrillic:1115,tsuperior:63219,ttabengali:2463,ttadeva:2335,ttagujarati:2719,ttagurmukhi:2591,tteharabic:1657,ttehfinalarabic:64359,ttehinitialarabic:64360,ttehmedialarabic:64361,tthabengali:2464,tthadeva:2336,tthagujarati:2720,tthagurmukhi:2592,tturned:647,tuhiragana:12388,tukatakana:12484,tukatakanahalfwidth:65410,tusmallhiragana:12387,tusmallkatakana:12483,tusmallkatakanahalfwidth:65391,twelvecircle:9323,twelveparen:9343,twelveperiod:9363,twelveroman:8571,twentycircle:9331,twentyhangzhou:21316,twentyparen:9351,twentyperiod:9371,two:50,twoarabic:1634,twobengali:2536,twocircle:9313,twocircleinversesansserif:10123,twodeva:2408,twodotenleader:8229,twodotleader:8229,twodotleadervertical:65072,twogujarati:2792,twogurmukhi:2664,twohackarabic:1634,twohangzhou:12322,twoideographicparen:12833,twoinferior:8322,twomonospace:65298,twonumeratorbengali:2549,twooldstyle:63282,twoparen:9333,twoperiod:9353,twopersian:1778,tworoman:8561,twostroke:443,twosuperior:178,twothai:3666,twothirds:8532,u:117,uacute:250,ubar:649,ubengali:2441,ubopomofo:12584,ubreve:365,ucaron:468,ucircle:9444,ucircumflex:251,ucircumflexbelow:7799,ucyrillic:1091,udattadeva:2385,udblacute:369,udblgrave:533,udeva:2313,udieresis:252,udieresisacute:472,udieresisbelow:7795,udieresiscaron:474,udieresiscyrillic:1265,udieresisgrave:476,udieresismacron:470,udotbelow:7909,ugrave:249,ugujarati:2697,ugurmukhi:2569,uhiragana:12358,uhookabove:7911,uhorn:432,uhornacute:7913,uhorndotbelow:7921,uhorngrave:7915,uhornhookabove:7917,uhorntilde:7919,uhungarumlaut:369,uhungarumlautcyrillic:1267,uinvertedbreve:535,ukatakana:12454,ukatakanahalfwidth:65395,ukcyrillic:1145,ukorean:12636,umacron:363,umacroncyrillic:1263,umacrondieresis:7803,umatragurmukhi:2625,umonospace:65365,underscore:95,underscoredbl:8215,underscoremonospace:65343,underscorevertical:65075,underscorewavy:65103,union:8746,universal:8704,uogonek:371,uparen:9392,upblock:9600,upperdothebrew:1476,upsilon:965,upsilondieresis:971,upsilondieresistonos:944,upsilonlatin:650,upsilontonos:973,uptackbelowcmb:797,uptackmod:724,uragurmukhi:2675,uring:367,ushortcyrillic:1118,usmallhiragana:12357,usmallkatakana:12453,usmallkatakanahalfwidth:65385,ustraightcyrillic:1199,ustraightstrokecyrillic:1201,utilde:361,utildeacute:7801,utildebelow:7797,uubengali:2442,uudeva:2314,uugujarati:2698,uugurmukhi:2570,uumatragurmukhi:2626,uuvowelsignbengali:2498,uuvowelsigndeva:2370,uuvowelsigngujarati:2754,uvowelsignbengali:2497,uvowelsigndeva:2369,uvowelsigngujarati:2753,v:118,vadeva:2357,vagujarati:2741,vagurmukhi:2613,vakatakana:12535,vav:1493,vavdagesh:64309,vavdagesh65:64309,vavdageshhebrew:64309,vavhebrew:1493,vavholam:64331,vavholamhebrew:64331,vavvavhebrew:1520,vavyodhebrew:1521,vcircle:9445,vdotbelow:7807,vecyrillic:1074,veharabic:1700,vehfinalarabic:64363,vehinitialarabic:64364,vehmedialarabic:64365,vekatakana:12537,venus:9792,verticalbar:124,verticallineabovecmb:781,verticallinebelowcmb:809,verticallinelowmod:716,verticallinemod:712,vewarmenian:1406,vhook:651,vikatakana:12536,viramabengali:2509,viramadeva:2381,viramagujarati:2765,visargabengali:2435,visargadeva:2307,visargagujarati:2691,vmonospace:65366,voarmenian:1400,voicediterationhiragana:12446,voicediterationkatakana:12542,voicedmarkkana:12443,voicedmarkkanahalfwidth:65438,vokatakana:12538,vparen:9393,vtilde:7805,vturned:652,vuhiragana:12436,vukatakana:12532,w:119,wacute:7811,waekorean:12633,wahiragana:12431,wakatakana:12527,wakatakanahalfwidth:65436,wakorean:12632,wasmallhiragana:12430,wasmallkatakana:12526,wattosquare:13143,wavedash:12316,wavyunderscorevertical:65076,wawarabic:1608,wawfinalarabic:65262,wawhamzaabovearabic:1572,wawhamzaabovefinalarabic:65158,wbsquare:13277,wcircle:9446,wcircumflex:373,wdieresis:7813,wdotaccent:7815,wdotbelow:7817,wehiragana:12433,weierstrass:8472,wekatakana:12529,wekorean:12638,weokorean:12637,wgrave:7809,whitebullet:9702,whitecircle:9675,whitecircleinverse:9689,whitecornerbracketleft:12302,whitecornerbracketleftvertical:65091,whitecornerbracketright:12303,whitecornerbracketrightvertical:65092,whitediamond:9671,whitediamondcontainingblacksmalldiamond:9672,whitedownpointingsmalltriangle:9663,whitedownpointingtriangle:9661,whiteleftpointingsmalltriangle:9667,whiteleftpointingtriangle:9665,whitelenticularbracketleft:12310,whitelenticularbracketright:12311,whiterightpointingsmalltriangle:9657,whiterightpointingtriangle:9655,whitesmallsquare:9643,whitesmilingface:9786,whitesquare:9633,whitestar:9734,whitetelephone:9743,whitetortoiseshellbracketleft:12312,whitetortoiseshellbracketright:12313,whiteuppointingsmalltriangle:9653,whiteuppointingtriangle:9651,wihiragana:12432,wikatakana:12528,wikorean:12639,wmonospace:65367,wohiragana:12434,wokatakana:12530,wokatakanahalfwidth:65382,won:8361,wonmonospace:65510,wowaenthai:3623,wparen:9394,wring:7832,wsuperior:695,wturned:653,wynn:447,x:120,xabovecmb:829,xbopomofo:12562,xcircle:9447,xdieresis:7821,xdotaccent:7819,xeharmenian:1389,xi:958,xmonospace:65368,xparen:9395,xsuperior:739,y:121,yaadosquare:13134,yabengali:2479,yacute:253,yadeva:2351,yaekorean:12626,yagujarati:2735,yagurmukhi:2607,yahiragana:12420,yakatakana:12516,yakatakanahalfwidth:65428,yakorean:12625,yamakkanthai:3662,yasmallhiragana:12419,yasmallkatakana:12515,yasmallkatakanahalfwidth:65388,yatcyrillic:1123,ycircle:9448,ycircumflex:375,ydieresis:255,ydotaccent:7823,ydotbelow:7925,yeharabic:1610,yehbarreearabic:1746,yehbarreefinalarabic:64431,yehfinalarabic:65266,yehhamzaabovearabic:1574,yehhamzaabovefinalarabic:65162,yehhamzaaboveinitialarabic:65163,yehhamzaabovemedialarabic:65164,yehinitialarabic:65267,yehmedialarabic:65268,yehmeeminitialarabic:64733,yehmeemisolatedarabic:64600,yehnoonfinalarabic:64660,yehthreedotsbelowarabic:1745,yekorean:12630,yen:165,yenmonospace:65509,yeokorean:12629,yeorinhieuhkorean:12678,yerahbenyomohebrew:1450,yerahbenyomolefthebrew:1450,yericyrillic:1099,yerudieresiscyrillic:1273,yesieungkorean:12673,yesieungpansioskorean:12675,yesieungsioskorean:12674,yetivhebrew:1434,ygrave:7923,yhook:436,yhookabove:7927,yiarmenian:1397,yicyrillic:1111,yikorean:12642,yinyang:9775,yiwnarmenian:1410,ymonospace:65369,yod:1497,yoddagesh:64313,yoddageshhebrew:64313,yodhebrew:1497,yodyodhebrew:1522,yodyodpatahhebrew:64287,yohiragana:12424,yoikorean:12681,yokatakana:12520,yokatakanahalfwidth:65430,yokorean:12635,yosmallhiragana:12423,yosmallkatakana:12519,yosmallkatakanahalfwidth:65390,yotgreek:1011,yoyaekorean:12680,yoyakorean:12679,yoyakthai:3618,yoyingthai:3597,yparen:9396,ypogegrammeni:890,ypogegrammenigreekcmb:837,yr:422,yring:7833,ysuperior:696,ytilde:7929,yturned:654,yuhiragana:12422,yuikorean:12684,yukatakana:12518,yukatakanahalfwidth:65429,yukorean:12640,yusbigcyrillic:1131,yusbigiotifiedcyrillic:1133,yuslittlecyrillic:1127,yuslittleiotifiedcyrillic:1129,yusmallhiragana:12421,yusmallkatakana:12517,yusmallkatakanahalfwidth:65389,yuyekorean:12683,yuyeokorean:12682,yyabengali:2527,yyadeva:2399,z:122,zaarmenian:1382,zacute:378,zadeva:2395,zagurmukhi:2651,zaharabic:1592,zahfinalarabic:65222,zahinitialarabic:65223,zahiragana:12374,zahmedialarabic:65224,zainarabic:1586,zainfinalarabic:65200,zakatakana:12470,zaqefgadolhebrew:1429,zaqefqatanhebrew:1428,zarqahebrew:1432,zayin:1494,zayindagesh:64310,zayindageshhebrew:64310,zayinhebrew:1494,zbopomofo:12567,zcaron:382,zcircle:9449,zcircumflex:7825,zcurl:657,zdot:380,zdotaccent:380,zdotbelow:7827,zecyrillic:1079,zedescendercyrillic:1177,zedieresiscyrillic:1247,zehiragana:12380,zekatakana:12476,zero:48,zeroarabic:1632,zerobengali:2534,zerodeva:2406,zerogujarati:2790,zerogurmukhi:2662,zerohackarabic:1632,zeroinferior:8320,zeromonospace:65296,zerooldstyle:63280,zeropersian:1776,zerosuperior:8304,zerothai:3664,zerowidthjoiner:65279,zerowidthnonjoiner:8204,zerowidthspace:8203,zeta:950,zhbopomofo:12563,zhearmenian:1386,zhebrevecyrillic:1218,zhecyrillic:1078,zhedescendercyrillic:1175,zhedieresiscyrillic:1245,zihiragana:12376,zikatakana:12472,zinorhebrew:1454,zlinebelow:7829,zmonospace:65370,zohiragana:12382,zokatakana:12478,zparen:9397,zretroflexhook:656,zstroke:438,zuhiragana:12378,zukatakana:12474,".notdef":0},uc={space:32,a1:9985,a2:9986,a202:9987,a3:9988,a4:9742,a5:9990,a119:9991,a118:9992,a117:9993,a11:9755,a12:9758,a13:9996,a14:9997,a15:9998,a16:9999,a105:1e4,a17:10001,a18:10002,a19:10003,a20:10004,a21:10005,a22:10006,a23:10007,a24:10008,a25:10009,a26:10010,a27:10011,a28:10012,a6:10013,a7:10014,a8:10015,a9:10016,a10:10017,a29:10018,a30:10019,a31:10020,a32:10021,a33:10022,a34:10023,a35:9733,a36:10025,a37:10026,a38:10027,a39:10028,a40:10029,a41:10030,a42:10031,a43:10032,a44:10033,a45:10034,a46:10035,a47:10036,a48:10037,a49:10038,a50:10039,a51:10040,a52:10041,a53:10042,a54:10043,a55:10044,a56:10045,a57:10046,a58:10047,a59:10048,a60:10049,a61:10050,a62:10051,a63:10052,a64:10053,a65:10054,a66:10055,a67:10056,a68:10057,a69:10058,a70:10059,a71:9679,a72:10061,a73:9632,a74:10063,a203:10064,a75:10065,a204:10066,a76:9650,a77:9660,a78:9670,a79:10070,a81:9687,a82:10072,a83:10073,a84:10074,a97:10075,a98:10076,a99:10077,a100:10078,a101:10081,a102:10082,a103:10083,a104:10084,a106:10085,a107:10086,a108:10087,a112:9827,a111:9830,a110:9829,a109:9824,a120:9312,a121:9313,a122:9314,a123:9315,a124:9316,a125:9317,a126:9318,a127:9319,a128:9320,a129:9321,a130:10102,a131:10103,a132:10104,a133:10105,a134:10106,a135:10107,a136:10108,a137:10109,a138:10110,a139:10111,a140:10112,a141:10113,a142:10114,a143:10115,a144:10116,a145:10117,a146:10118,a147:10119,a148:10120,a149:10121,a150:10122,a151:10123,a152:10124,a153:10125,a154:10126,a155:10127,a156:10128,a157:10129,a158:10130,a159:10131,a160:10132,a161:8594,a163:8596,a164:8597,a196:10136,a165:10137,a192:10138,a166:10139,a167:10140,a168:10141,a169:10142,a170:10143,a171:10144,a172:10145,a173:10146,a162:10147,a174:10148,a175:10149,a176:10150,a177:10151,a178:10152,a179:10153,a193:10154,a180:10155,a199:10156,a181:10157,a200:10158,a182:10159,a201:10161,a183:10162,a184:10163,a197:10164,a185:10165,a194:10166,a198:10167,a186:10168,a195:10169,a187:10170,a188:10171,a189:10172,a190:10173,a191:10174,a89:10088,// 0xF8D7
a90:10089,// 0xF8D8
a93:10090,// 0xF8D9
a94:10091,// 0xF8DA
a91:10092,// 0xF8DB
a92:10093,// 0xF8DC
a205:10094,// 0xF8DD
a85:10095,// 0xF8DE
a206:10096,// 0xF8DF
a86:10097,// 0xF8E0
a87:10098,// 0xF8E1
a88:10099,// 0xF8E2
a95:10100,// 0xF8E3
a96:10101,// 0xF8E4
".notdef":0},vc=function(){/**
   * Decode the image in the main thread if it supported. Resovles the promise
   * when the image data is ready.
   */
function d(a,b,c,d){if(d instanceof Mc&&d.isNativelyDecodable(b,c)){
// For natively supported jpegs send them to the main thread for decoding.
var e=d.dict,f=e.get("ColorSpace","CS");f=Ta.parse(f,b,c);var g=f.numComps,h=a.sendWithPromise("JpegDecode",[d.getIR(),g]);return h.then(function(a){var b=a.data;return new Gc(b,0,b.length,d.dict)})}return Promise.resolve(d)}/**
   * Decode and clamp a value. The formula is different from the spec because we
   * don't decode to float range [0,1], we decode it in the [0,max] range.
   */
function f(a,b,c,d){
// Clamp the value to the range
return a=b+a*c,0>a?0:a>d?d:a}function g(b,d,e,f,h,i,j){this.image=e;var k=e.dict;if(k.has("Filter")){var l=k.get("Filter").name;if("JPXDecode"===l){var m=new ad;m.parseImageProperties(e.stream),e.stream.reset(),e.bitsPerComponent=m.bitsPerComponent,e.numComps=m.componentsCount}else"JBIG2Decode"===l&&(e.bitsPerComponent=1,e.numComps=1)}
// TODO cache rendered images?
this.width=k.get("Width","W"),this.height=k.get("Height","H"),(this.width<1||this.height<1)&&c("Invalid image width: "+this.width+" or height: "+this.height),this.interpolate=k.get("Interpolate","I")||!1,this.imageMask=k.get("ImageMask","IM")||!1,this.matte=k.get("Matte")||!1;var n=e.bitsPerComponent;if(n||(n=k.get("BitsPerComponent","BPC"),n||(this.imageMask?n=1:c("Bits per component missing in image: "+this.imageMask))),this.bpc=n,!this.imageMask){var o=k.get("ColorSpace","CS");if(!o)switch(a("JPX images (which do not require color spaces)"),e.numComps){case 1:o=ta.get("DeviceGray");break;case 3:o=ta.get("DeviceRGB");break;case 4:o=ta.get("DeviceCMYK");break;default:c("JPX images with "+this.numComps+" color components not supported.")}this.colorSpace=Ta.parse(o,b,d),this.numComps=this.colorSpace.numComps}if(this.decode=k.get("Decode","D"),this.needsDecode=!1,this.decode&&(this.colorSpace&&!this.colorSpace.isDefaultDecode(this.decode)||j&&!Ta.isDefaultDecode(this.decode,1))){this.needsDecode=!0;
// Do some preprocessing to avoid more math.
var p=(1<<n)-1;this.decodeCoefficients=[],this.decodeAddends=[];for(var q=0,r=0;q<this.decode.length;q+=2,++r){var s=this.decode[q],t=this.decode[q+1];this.decodeCoefficients[r]=t-s,this.decodeAddends[r]=p*s}}h?this.smask=new g(b,d,h,!1):i&&(B(i)?this.mask=new g(b,d,i,!1,null,null,!0):
// Color key mask (just an array).
this.mask=i)}/**
   * Handles processing of image data and returns the Promise that is resolved
   * with a PDFImage when the image is ready to be used.
   */
/**
   * Resize an image using the nearest neighbor algorithm. Currently only
   * supports one and three component images.
   * @param {TypedArray} pixels The original image with one component.
   * @param {Number} bpc Number of bits per component.
   * @param {Number} components Number of color components, 1 or 3 is supported.
   * @param {Number} w1 Original width.
   * @param {Number} h1 Original height.
   * @param {Number} w2 New width.
   * @param {Number} h2 New height.
   * @param {TypedArray} dest (Optional) The destination buffer.
   * @param {Number} alpha01 (Optional) Size reserved for the alpha channel.
   * @return {TypedArray} Resized image data.
   */
return g.buildImage=function(a,c,e,f,h){var i,j,k=d(a,c,e,f),l=f.dict.get("SMask"),m=f.dict.get("Mask");return l?(i=d(a,c,e,l),j=Promise.resolve(null)):(i=Promise.resolve(null),m?B(m)?j=d(a,c,e,m):A(m)?j=Promise.resolve(m):(b("Unsupported mask format."),j=Promise.resolve(null)):j=Promise.resolve(null)),Promise.all([k,i,j]).then(function(a){var b=a[0],d=a[1],f=a[2];return new g(c,e,b,h,d,f)})},g.resize=function(a,b,d,e,f,g,h,i,j){1!==d&&3!==d&&c("Unsupported component count for resizing.");var k,l,m,n,o=g*h*d,p=i?i:8>=b?new Uint8Array(o):16>=b?new Uint16Array(o):new Uint32Array(o),q=e/g,r=f/h,s=0,t=new Uint16Array(g),u=e*d;for(1!==j&&(j=0),l=0;g>l;l++)t[l]=Math.floor(l*q)*d;if(1===d)for(k=0;h>k;k++)for(m=Math.floor(k*r)*u,l=0;g>l;l++)n=m+t[l],p[s++]=a[n];else if(3===d)for(k=0;h>k;k++)for(m=Math.floor(k*r)*u,l=0;g>l;l++)n=m+t[l],p[s++]=a[n++],p[s++]=a[n++],p[s++]=a[n++],s+=j;return p},g.createMask=function(a,b,c,d,e){
// |imgArray| might not contain full data for every pixel of the mask, so
// we need to distinguish between |computedLength| and |actualLength|.
// In particular, if inverseDecode is true, then the array we return must
// have a length of |computedLength|.
var f,g,h=(b+7>>3)*c,i=a.byteLength,j=h===i;if(!d||e&&!j)if(e)for(f=new Uint8Array(h),f.set(a),g=i;h>g;g++)f[g]=255;else f=new Uint8Array(i),f.set(a);else
// imgArray came from a DecodeStream and its data is in an appropriate
// form, so we can just transfer it.
f=a;
// If necessary, invert the original mask data (but not any extra we might
// have added above). It's safe to modify the array -- whether it's the
// original or a copy, we're about to transfer it anyway, so nothing else
// in this thread can be relying on its contents.
if(e)for(g=0;i>g;g++)f[g]=~f[g];return{data:f,width:b,height:c}},g.prototype={get drawWidth(){return Math.max(this.width,this.smask&&this.smask.width||0,this.mask&&this.mask.width||0)},get drawHeight(){return Math.max(this.height,this.smask&&this.smask.height||0,this.mask&&this.mask.height||0)},decodeBuffer:function(a){var b,c,d=this.bpc,e=this.numComps,g=this.decodeAddends,h=this.decodeCoefficients,i=(1<<d)-1;if(1!==d){var j=0;for(b=0,c=this.width*this.height;c>b;b++)for(var k=0;e>k;k++)a[j]=f(a[j],g[k],h[k],i),j++}else
// If the buffer needed decode that means it just needs to be inverted.
for(b=0,c=a.length;c>b;b++)a[b]=+!a[b]},getComponents:function(a){var b=this.bpc;
// This image doesn't require any extra work.
if(8===b)return a;var c,d,e=this.width,f=this.height,g=this.numComps,h=e*f*g,i=0,j=8>=b?new Uint8Array(h):16>=b?new Uint16Array(h):new Uint32Array(h),k=e*g,l=(1<<b)-1,m=0;if(1===b)for(var n,o,p,q=0;f>q;q++){
// unroll loop for all full bytes
for(o=m+(-8&k),p=m+k;o>m;)d=a[i++],j[m]=d>>7&1,j[m+1]=d>>6&1,j[m+2]=d>>5&1,j[m+3]=d>>4&1,j[m+4]=d>>3&1,j[m+5]=d>>2&1,j[m+6]=d>>1&1,j[m+7]=1&d,m+=8;
// handle remaing bits
if(p>m)for(d=a[i++],n=128;p>m;)j[m++]=+!!(d&n),n>>=1}else{
// The general case that handles all other bpc values.
var r=0;for(d=0,m=0,c=h;c>m;++m){for(m%k===0&&(d=0,r=0);b>r;)d=d<<8|a[i++],r+=8;var s=r-b,t=d>>s;j[m]=0>t?0:t>l?l:t,d&=(1<<s)-1,r=s}}return j},fillOpacity:function(a,b,d,e,f){var h,i,j,k,l,m,n=this.smask,o=this.mask;if(n)i=n.width,j=n.height,h=new Uint8Array(i*j),n.fillGrayBuffer(h),(i!==b||j!==d)&&(h=g.resize(h,n.bpc,1,i,j,b,d));else if(o)if(o instanceof g){
// Need to invert values in rgbaBuf
for(i=o.width,j=o.height,h=new Uint8Array(i*j),o.numComps=1,o.fillGrayBuffer(h),k=0,l=i*j;l>k;++k)h[k]=255-h[k];(i!==b||j!==d)&&(h=g.resize(h,o.bpc,1,i,j,b,d))}else if(A(o)){
// Color key mask: if any of the compontents are outside the range
// then they should be painted.
h=new Uint8Array(b*d);var p=this.numComps;for(k=0,l=b*d;l>k;++k){var q=0,r=k*p;for(m=0;p>m;++m){var s=f[r+m],t=2*m;if(s<o[t]||s>o[t+1]){q=255;break}}h[k]=q}}else c("Unknown mask format.");if(h)for(k=0,m=3,l=b*e;l>k;++k,m+=4)a[m]=h[k];else
// No mask.
for(k=0,m=3,l=b*e;l>k;++k,m+=4)a[m]=255},undoPreblend:function(a,b,c){var d=this.smask&&this.smask.matte;if(d)for(var e,f,g,h=this.colorSpace.getRgb(d,0),i=h[0],j=h[1],k=h[2],l=b*c*4,m=0;l>m;m+=4){var n=a[m+3];if(0!==n){var o=255/n;e=(a[m]-i)*o+i,f=(a[m+1]-j)*o+j,g=(a[m+2]-k)*o+k,a[m]=0>=e?0:e>=255?255:0|e,a[m+1]=0>=f?0:f>=255?255:0|f,a[m+2]=0>=g?0:g>=255?255:0|g}else
// according formula we have to get Infinity in all components
// making it white (typical paper color) should be okay
a[m]=255,a[m+1]=255,a[m+2]=255}},createImageData:function(a){var b,c=this.drawWidth,d=this.drawHeight,f={// other fields are filled in below
width:c,height:d},g=this.numComps,h=this.width,i=this.height,j=this.bpc,k=h*g*j+7>>3;if(!a){
// If it is a 1-bit-per-pixel grayscale (i.e. black-and-white) image
// without any complications, we pass a same-sized copy to the main
// thread rather than expanding by 32x to RGBA form. This saves *lots*
// of memory for many scanned documents. It's also much faster.
//
// Similarly, if it is a 24-bit-per pixel RGB image without any
// complications, we avoid expanding by 1.333x to RGBA form.
var l;if("DeviceGray"===this.colorSpace.name&&1===j?l=S.GRAYSCALE_1BPP:"DeviceRGB"!==this.colorSpace.name||8!==j||this.needsDecode||(l=S.RGB_24BPP),l&&!this.smask&&!this.mask&&c===h&&d===i){
// If imgArray came from a DecodeStream, we're safe to transfer it
// (and thus neuter it) because it will constitute the entire
// DecodeStream's data.  But if it came from a Stream, we need to
// copy it because it'll only be a portion of the Stream's data, and
// the rest will be read later on.
if(f.kind=l,b=this.getImageBytes(i*k),this.image instanceof Ic)f.data=b;else{var m=new Uint8Array(b.length);m.set(b),f.data=m}if(this.needsDecode){
// Invert the buffer (which must be grayscale if we reached here).
e(l===S.GRAYSCALE_1BPP);for(var n=f.data,o=0,p=n.length;p>o;o++)n[o]^=255}return f}if(this.image instanceof Mc&&!this.smask&&!this.mask)return f.kind=S.RGB_24BPP,f.data=this.getImageBytes(i*k,c,d,!0),f}b=this.getImageBytes(i*k);
// imgArray can be incomplete (e.g. after CCITT fax encoding).
var q,r,s=0|b.length/k*d/i,t=this.getComponents(b);
// Color key masking (opacity) must be performed before decoding.
return a||this.smask||this.mask?(f.kind=S.RGBA_32BPP,f.data=new Uint8Array(c*d*4),q=1,r=!0,this.fillOpacity(f.data,c,d,s,t)):(f.kind=S.RGB_24BPP,f.data=new Uint8Array(c*d*3),q=0,r=!1),this.needsDecode&&this.decodeBuffer(t),this.colorSpace.fillRgb(f.data,h,i,c,d,s,j,t,q),r&&this.undoPreblend(f.data,c,s),f},fillGrayBuffer:function(a){var b=this.numComps;1!==b&&c("Reading gray scale from a color image: "+b);var d,e,f=this.width,g=this.height,h=this.bpc,i=f*b*h+7>>3,j=this.getImageBytes(g*i),k=this.getComponents(j);if(1!==h){this.needsDecode&&this.decodeBuffer(k),e=f*g;
// we aren't using a colorspace so we need to scale the value
var l=255/((1<<h)-1);for(d=0;e>d;++d)a[d]=l*k[d]|0}else if(
// inline decoding (= inversion) for 1 bpc images
e=f*g,this.needsDecode)
// invert and scale to {0, 255}
for(d=0;e>d;++d)a[d]=k[d]-1&255;else
// scale to {0, 255}
for(d=0;e>d;++d)a[d]=255&-k[d]},getImageBytes:function(a,b,c,d){return this.image.reset(),this.image.drawWidth=b||this.width,this.image.drawHeight=c||this.height,this.image.forceRGB=!!d,this.image.getBytes(a)}},g}(),wc={Courier:600,"Courier-Bold":600,"Courier-BoldOblique":600,"Courier-Oblique":600,Helvetica:{space:278,exclam:278,quotedbl:355,numbersign:556,dollar:556,percent:889,ampersand:667,quoteright:222,parenleft:333,parenright:333,asterisk:389,plus:584,comma:278,hyphen:333,period:278,slash:278,zero:556,one:556,two:556,three:556,four:556,five:556,six:556,seven:556,eight:556,nine:556,colon:278,semicolon:278,less:584,equal:584,greater:584,question:556,at:1015,A:667,B:667,C:722,D:722,E:667,F:611,G:778,H:722,I:278,J:500,K:667,L:556,M:833,N:722,O:778,P:667,Q:778,R:722,S:667,T:611,U:722,V:667,W:944,X:667,Y:667,Z:611,bracketleft:278,backslash:278,bracketright:278,asciicircum:469,underscore:556,quoteleft:222,a:556,b:556,c:500,d:556,e:556,f:278,g:556,h:556,i:222,j:222,k:500,l:222,m:833,n:556,o:556,p:556,q:556,r:333,s:500,t:278,u:556,v:500,w:722,x:500,y:500,z:500,braceleft:334,bar:260,braceright:334,asciitilde:584,exclamdown:333,cent:556,sterling:556,fraction:167,yen:556,florin:556,section:556,currency:556,quotesingle:191,quotedblleft:333,guillemotleft:556,guilsinglleft:333,guilsinglright:333,fi:500,fl:500,endash:556,dagger:556,daggerdbl:556,periodcentered:278,paragraph:537,bullet:350,quotesinglbase:222,quotedblbase:333,quotedblright:333,guillemotright:556,ellipsis:1e3,perthousand:1e3,questiondown:611,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:1e3,ordfeminine:370,Lslash:556,Oslash:778,OE:1e3,ordmasculine:365,ae:889,dotlessi:278,lslash:222,oslash:611,oe:944,germandbls:611,Idieresis:278,eacute:556,abreve:556,uhungarumlaut:556,ecaron:556,Ydieresis:667,divide:584,Yacute:667,Acircumflex:667,aacute:556,Ucircumflex:722,yacute:500,scommaaccent:500,ecircumflex:556,Uring:722,Udieresis:722,aogonek:556,Uacute:722,uogonek:556,Edieresis:667,Dcroat:722,commaaccent:250,copyright:737,Emacron:667,ccaron:500,aring:556,Ncommaaccent:722,lacute:222,agrave:556,Tcommaaccent:611,Cacute:722,atilde:556,Edotaccent:667,scaron:500,scedilla:500,iacute:278,lozenge:471,Rcaron:722,Gcommaaccent:778,ucircumflex:556,acircumflex:556,Amacron:667,rcaron:333,ccedilla:500,Zdotaccent:611,Thorn:667,Omacron:778,Racute:722,Sacute:667,dcaron:643,Umacron:722,uring:556,threesuperior:333,Ograve:778,Agrave:667,Abreve:667,multiply:584,uacute:556,Tcaron:611,partialdiff:476,ydieresis:500,Nacute:722,icircumflex:278,Ecircumflex:667,adieresis:556,edieresis:556,cacute:500,nacute:556,umacron:556,Ncaron:722,Iacute:278,plusminus:584,brokenbar:260,registered:737,Gbreve:778,Idotaccent:278,summation:600,Egrave:667,racute:333,omacron:556,Zacute:611,Zcaron:611,greaterequal:549,Eth:722,Ccedilla:722,lcommaaccent:222,tcaron:317,eogonek:556,Uogonek:722,Aacute:667,Adieresis:667,egrave:556,zacute:500,iogonek:222,Oacute:778,oacute:556,amacron:556,sacute:500,idieresis:278,Ocircumflex:778,Ugrave:722,Delta:612,thorn:556,twosuperior:333,Odieresis:778,mu:556,igrave:278,ohungarumlaut:556,Eogonek:667,dcroat:556,threequarters:834,Scedilla:667,lcaron:299,Kcommaaccent:667,Lacute:556,trademark:1e3,edotaccent:556,Igrave:278,Imacron:278,Lcaron:556,onehalf:834,lessequal:549,ocircumflex:556,ntilde:556,Uhungarumlaut:722,Eacute:667,emacron:556,gbreve:556,onequarter:834,Scaron:667,Scommaaccent:667,Ohungarumlaut:778,degree:400,ograve:556,Ccaron:722,ugrave:556,radical:453,Dcaron:722,rcommaaccent:333,Ntilde:722,otilde:556,Rcommaaccent:722,Lcommaaccent:556,Atilde:667,Aogonek:667,Aring:667,Otilde:778,zdotaccent:500,Ecaron:667,Iogonek:278,kcommaaccent:500,minus:584,Icircumflex:278,ncaron:556,tcommaaccent:278,logicalnot:584,odieresis:556,udieresis:556,notequal:549,gcommaaccent:556,eth:556,zcaron:500,ncommaaccent:556,onesuperior:333,imacron:278,Euro:556},"Helvetica-Bold":{space:278,exclam:333,quotedbl:474,numbersign:556,dollar:556,percent:889,ampersand:722,quoteright:278,parenleft:333,parenright:333,asterisk:389,plus:584,comma:278,hyphen:333,period:278,slash:278,zero:556,one:556,two:556,three:556,four:556,five:556,six:556,seven:556,eight:556,nine:556,colon:333,semicolon:333,less:584,equal:584,greater:584,question:611,at:975,A:722,B:722,C:722,D:722,E:667,F:611,G:778,H:722,I:278,J:556,K:722,L:611,M:833,N:722,O:778,P:667,Q:778,R:722,S:667,T:611,U:722,V:667,W:944,X:667,Y:667,Z:611,bracketleft:333,backslash:278,bracketright:333,asciicircum:584,underscore:556,quoteleft:278,a:556,b:611,c:556,d:611,e:556,f:333,g:611,h:611,i:278,j:278,k:556,l:278,m:889,n:611,o:611,p:611,q:611,r:389,s:556,t:333,u:611,v:556,w:778,x:556,y:556,z:500,braceleft:389,bar:280,braceright:389,asciitilde:584,exclamdown:333,cent:556,sterling:556,fraction:167,yen:556,florin:556,section:556,currency:556,quotesingle:238,quotedblleft:500,guillemotleft:556,guilsinglleft:333,guilsinglright:333,fi:611,fl:611,endash:556,dagger:556,daggerdbl:556,periodcentered:278,paragraph:556,bullet:350,quotesinglbase:278,quotedblbase:500,quotedblright:500,guillemotright:556,ellipsis:1e3,perthousand:1e3,questiondown:611,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:1e3,ordfeminine:370,Lslash:611,Oslash:778,OE:1e3,ordmasculine:365,ae:889,dotlessi:278,lslash:278,oslash:611,oe:944,germandbls:611,Idieresis:278,eacute:556,abreve:556,uhungarumlaut:611,ecaron:556,Ydieresis:667,divide:584,Yacute:667,Acircumflex:722,aacute:556,Ucircumflex:722,yacute:556,scommaaccent:556,ecircumflex:556,Uring:722,Udieresis:722,aogonek:556,Uacute:722,uogonek:611,Edieresis:667,Dcroat:722,commaaccent:250,copyright:737,Emacron:667,ccaron:556,aring:556,Ncommaaccent:722,lacute:278,agrave:556,Tcommaaccent:611,Cacute:722,atilde:556,Edotaccent:667,scaron:556,scedilla:556,iacute:278,lozenge:494,Rcaron:722,Gcommaaccent:778,ucircumflex:611,acircumflex:556,Amacron:722,rcaron:389,ccedilla:556,Zdotaccent:611,Thorn:667,Omacron:778,Racute:722,Sacute:667,dcaron:743,Umacron:722,uring:611,threesuperior:333,Ograve:778,Agrave:722,Abreve:722,multiply:584,uacute:611,Tcaron:611,partialdiff:494,ydieresis:556,Nacute:722,icircumflex:278,Ecircumflex:667,adieresis:556,edieresis:556,cacute:556,nacute:611,umacron:611,Ncaron:722,Iacute:278,plusminus:584,brokenbar:280,registered:737,Gbreve:778,Idotaccent:278,summation:600,Egrave:667,racute:389,omacron:611,Zacute:611,Zcaron:611,greaterequal:549,Eth:722,Ccedilla:722,lcommaaccent:278,tcaron:389,eogonek:556,Uogonek:722,Aacute:722,Adieresis:722,egrave:556,zacute:500,iogonek:278,Oacute:778,oacute:611,amacron:556,sacute:556,idieresis:278,Ocircumflex:778,Ugrave:722,Delta:612,thorn:611,twosuperior:333,Odieresis:778,mu:611,igrave:278,ohungarumlaut:611,Eogonek:667,dcroat:611,threequarters:834,Scedilla:667,lcaron:400,Kcommaaccent:722,Lacute:611,trademark:1e3,edotaccent:556,Igrave:278,Imacron:278,Lcaron:611,onehalf:834,lessequal:549,ocircumflex:611,ntilde:611,Uhungarumlaut:722,Eacute:667,emacron:556,gbreve:611,onequarter:834,Scaron:667,Scommaaccent:667,Ohungarumlaut:778,degree:400,ograve:611,Ccaron:722,ugrave:611,radical:549,Dcaron:722,rcommaaccent:389,Ntilde:722,otilde:611,Rcommaaccent:722,Lcommaaccent:611,Atilde:722,Aogonek:722,Aring:722,Otilde:778,zdotaccent:500,Ecaron:667,Iogonek:278,kcommaaccent:556,minus:584,Icircumflex:278,ncaron:611,tcommaaccent:333,logicalnot:584,odieresis:611,udieresis:611,notequal:549,gcommaaccent:611,eth:611,zcaron:500,ncommaaccent:611,onesuperior:333,imacron:278,Euro:556},"Helvetica-BoldOblique":{space:278,exclam:333,quotedbl:474,numbersign:556,dollar:556,percent:889,ampersand:722,quoteright:278,parenleft:333,parenright:333,asterisk:389,plus:584,comma:278,hyphen:333,period:278,slash:278,zero:556,one:556,two:556,three:556,four:556,five:556,six:556,seven:556,eight:556,nine:556,colon:333,semicolon:333,less:584,equal:584,greater:584,question:611,at:975,A:722,B:722,C:722,D:722,E:667,F:611,G:778,H:722,I:278,J:556,K:722,L:611,M:833,N:722,O:778,P:667,Q:778,R:722,S:667,T:611,U:722,V:667,W:944,X:667,Y:667,Z:611,bracketleft:333,backslash:278,bracketright:333,asciicircum:584,underscore:556,quoteleft:278,a:556,b:611,c:556,d:611,e:556,f:333,g:611,h:611,i:278,j:278,k:556,l:278,m:889,n:611,o:611,p:611,q:611,r:389,s:556,t:333,u:611,v:556,w:778,x:556,y:556,z:500,braceleft:389,bar:280,braceright:389,asciitilde:584,exclamdown:333,cent:556,sterling:556,fraction:167,yen:556,florin:556,section:556,currency:556,quotesingle:238,quotedblleft:500,guillemotleft:556,guilsinglleft:333,guilsinglright:333,fi:611,fl:611,endash:556,dagger:556,daggerdbl:556,periodcentered:278,paragraph:556,bullet:350,quotesinglbase:278,quotedblbase:500,quotedblright:500,guillemotright:556,ellipsis:1e3,perthousand:1e3,questiondown:611,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:1e3,ordfeminine:370,Lslash:611,Oslash:778,OE:1e3,ordmasculine:365,ae:889,dotlessi:278,lslash:278,oslash:611,oe:944,germandbls:611,Idieresis:278,eacute:556,abreve:556,uhungarumlaut:611,ecaron:556,Ydieresis:667,divide:584,Yacute:667,Acircumflex:722,aacute:556,Ucircumflex:722,yacute:556,scommaaccent:556,ecircumflex:556,Uring:722,Udieresis:722,aogonek:556,Uacute:722,uogonek:611,Edieresis:667,Dcroat:722,commaaccent:250,copyright:737,Emacron:667,ccaron:556,aring:556,Ncommaaccent:722,lacute:278,agrave:556,Tcommaaccent:611,Cacute:722,atilde:556,Edotaccent:667,scaron:556,scedilla:556,iacute:278,lozenge:494,Rcaron:722,Gcommaaccent:778,ucircumflex:611,acircumflex:556,Amacron:722,rcaron:389,ccedilla:556,Zdotaccent:611,Thorn:667,Omacron:778,Racute:722,Sacute:667,dcaron:743,Umacron:722,uring:611,threesuperior:333,Ograve:778,Agrave:722,Abreve:722,multiply:584,uacute:611,Tcaron:611,partialdiff:494,ydieresis:556,Nacute:722,icircumflex:278,Ecircumflex:667,adieresis:556,edieresis:556,cacute:556,nacute:611,umacron:611,Ncaron:722,Iacute:278,plusminus:584,brokenbar:280,registered:737,Gbreve:778,Idotaccent:278,summation:600,Egrave:667,racute:389,omacron:611,Zacute:611,Zcaron:611,greaterequal:549,Eth:722,Ccedilla:722,lcommaaccent:278,tcaron:389,eogonek:556,Uogonek:722,Aacute:722,Adieresis:722,egrave:556,zacute:500,iogonek:278,Oacute:778,oacute:611,amacron:556,sacute:556,idieresis:278,Ocircumflex:778,Ugrave:722,Delta:612,thorn:611,twosuperior:333,Odieresis:778,mu:611,igrave:278,ohungarumlaut:611,Eogonek:667,dcroat:611,threequarters:834,Scedilla:667,lcaron:400,Kcommaaccent:722,Lacute:611,trademark:1e3,edotaccent:556,Igrave:278,Imacron:278,Lcaron:611,onehalf:834,lessequal:549,ocircumflex:611,ntilde:611,Uhungarumlaut:722,Eacute:667,emacron:556,gbreve:611,onequarter:834,Scaron:667,Scommaaccent:667,Ohungarumlaut:778,degree:400,ograve:611,Ccaron:722,ugrave:611,radical:549,Dcaron:722,rcommaaccent:389,Ntilde:722,otilde:611,Rcommaaccent:722,Lcommaaccent:611,Atilde:722,Aogonek:722,Aring:722,Otilde:778,zdotaccent:500,Ecaron:667,Iogonek:278,kcommaaccent:556,minus:584,Icircumflex:278,ncaron:611,tcommaaccent:333,logicalnot:584,odieresis:611,udieresis:611,notequal:549,gcommaaccent:611,eth:611,zcaron:500,ncommaaccent:611,onesuperior:333,imacron:278,Euro:556},"Helvetica-Oblique":{space:278,exclam:278,quotedbl:355,numbersign:556,dollar:556,percent:889,ampersand:667,quoteright:222,parenleft:333,parenright:333,asterisk:389,plus:584,comma:278,hyphen:333,period:278,slash:278,zero:556,one:556,two:556,three:556,four:556,five:556,six:556,seven:556,eight:556,nine:556,colon:278,semicolon:278,less:584,equal:584,greater:584,question:556,at:1015,A:667,B:667,C:722,D:722,E:667,F:611,G:778,H:722,I:278,J:500,K:667,L:556,M:833,N:722,O:778,P:667,Q:778,R:722,S:667,T:611,U:722,V:667,W:944,X:667,Y:667,Z:611,bracketleft:278,backslash:278,bracketright:278,asciicircum:469,underscore:556,quoteleft:222,a:556,b:556,c:500,d:556,e:556,f:278,g:556,h:556,i:222,j:222,k:500,l:222,m:833,n:556,o:556,p:556,q:556,r:333,s:500,t:278,u:556,v:500,w:722,x:500,y:500,z:500,braceleft:334,bar:260,braceright:334,asciitilde:584,exclamdown:333,cent:556,sterling:556,fraction:167,yen:556,florin:556,section:556,currency:556,quotesingle:191,quotedblleft:333,guillemotleft:556,guilsinglleft:333,guilsinglright:333,fi:500,fl:500,endash:556,dagger:556,daggerdbl:556,periodcentered:278,paragraph:537,bullet:350,quotesinglbase:222,quotedblbase:333,quotedblright:333,guillemotright:556,ellipsis:1e3,perthousand:1e3,questiondown:611,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:1e3,ordfeminine:370,Lslash:556,Oslash:778,OE:1e3,ordmasculine:365,ae:889,dotlessi:278,lslash:222,oslash:611,oe:944,germandbls:611,Idieresis:278,eacute:556,abreve:556,uhungarumlaut:556,ecaron:556,Ydieresis:667,divide:584,Yacute:667,Acircumflex:667,aacute:556,Ucircumflex:722,yacute:500,scommaaccent:500,ecircumflex:556,Uring:722,Udieresis:722,aogonek:556,Uacute:722,uogonek:556,Edieresis:667,Dcroat:722,commaaccent:250,copyright:737,Emacron:667,ccaron:500,aring:556,Ncommaaccent:722,lacute:222,agrave:556,Tcommaaccent:611,Cacute:722,atilde:556,Edotaccent:667,scaron:500,scedilla:500,iacute:278,lozenge:471,Rcaron:722,Gcommaaccent:778,ucircumflex:556,acircumflex:556,Amacron:667,rcaron:333,ccedilla:500,Zdotaccent:611,Thorn:667,Omacron:778,Racute:722,Sacute:667,dcaron:643,Umacron:722,uring:556,threesuperior:333,Ograve:778,Agrave:667,Abreve:667,multiply:584,uacute:556,Tcaron:611,partialdiff:476,ydieresis:500,Nacute:722,icircumflex:278,Ecircumflex:667,adieresis:556,edieresis:556,cacute:500,nacute:556,umacron:556,Ncaron:722,Iacute:278,plusminus:584,brokenbar:260,registered:737,Gbreve:778,Idotaccent:278,summation:600,Egrave:667,racute:333,omacron:556,Zacute:611,Zcaron:611,greaterequal:549,Eth:722,Ccedilla:722,lcommaaccent:222,tcaron:317,eogonek:556,Uogonek:722,Aacute:667,Adieresis:667,egrave:556,zacute:500,iogonek:222,Oacute:778,oacute:556,amacron:556,sacute:500,idieresis:278,Ocircumflex:778,Ugrave:722,Delta:612,thorn:556,twosuperior:333,Odieresis:778,mu:556,igrave:278,ohungarumlaut:556,Eogonek:667,dcroat:556,threequarters:834,Scedilla:667,lcaron:299,Kcommaaccent:667,Lacute:556,trademark:1e3,edotaccent:556,Igrave:278,Imacron:278,Lcaron:556,onehalf:834,lessequal:549,ocircumflex:556,ntilde:556,Uhungarumlaut:722,Eacute:667,emacron:556,gbreve:556,onequarter:834,Scaron:667,Scommaaccent:667,Ohungarumlaut:778,degree:400,ograve:556,Ccaron:722,ugrave:556,radical:453,Dcaron:722,rcommaaccent:333,Ntilde:722,otilde:556,Rcommaaccent:722,Lcommaaccent:556,Atilde:667,Aogonek:667,Aring:667,Otilde:778,zdotaccent:500,Ecaron:667,Iogonek:278,kcommaaccent:500,minus:584,Icircumflex:278,ncaron:556,tcommaaccent:278,logicalnot:584,odieresis:556,udieresis:556,notequal:549,gcommaaccent:556,eth:556,zcaron:500,ncommaaccent:556,onesuperior:333,imacron:278,Euro:556},Symbol:{space:250,exclam:333,universal:713,numbersign:500,existential:549,percent:833,ampersand:778,suchthat:439,parenleft:333,parenright:333,asteriskmath:500,plus:549,comma:250,minus:549,period:250,slash:278,zero:500,one:500,two:500,three:500,four:500,five:500,six:500,seven:500,eight:500,nine:500,colon:278,semicolon:278,less:549,equal:549,greater:549,question:444,congruent:549,Alpha:722,Beta:667,Chi:722,Delta:612,Epsilon:611,Phi:763,Gamma:603,Eta:722,Iota:333,theta1:631,Kappa:722,Lambda:686,Mu:889,Nu:722,Omicron:722,Pi:768,Theta:741,Rho:556,Sigma:592,Tau:611,Upsilon:690,sigma1:439,Omega:768,Xi:645,Psi:795,Zeta:611,bracketleft:333,therefore:863,bracketright:333,perpendicular:658,underscore:500,radicalex:500,alpha:631,beta:549,chi:549,delta:494,epsilon:439,phi:521,gamma:411,eta:603,iota:329,phi1:603,kappa:549,lambda:549,mu:576,nu:521,omicron:549,pi:549,theta:521,rho:549,sigma:603,tau:439,upsilon:576,omega1:713,omega:686,xi:493,psi:686,zeta:494,braceleft:480,bar:200,braceright:480,similar:549,Euro:750,Upsilon1:620,minute:247,lessequal:549,fraction:167,infinity:713,florin:500,club:753,diamond:753,heart:753,spade:753,arrowboth:1042,arrowleft:987,arrowup:603,arrowright:987,arrowdown:603,degree:400,plusminus:549,second:411,greaterequal:549,multiply:549,proportional:713,partialdiff:494,bullet:460,divide:549,notequal:549,equivalence:549,approxequal:549,ellipsis:1e3,arrowvertex:603,arrowhorizex:1e3,carriagereturn:658,aleph:823,Ifraktur:686,Rfraktur:795,weierstrass:987,circlemultiply:768,circleplus:768,emptyset:823,intersection:768,union:768,propersuperset:713,reflexsuperset:713,notsubset:713,propersubset:713,reflexsubset:713,element:713,notelement:713,angle:768,gradient:713,registerserif:790,copyrightserif:790,trademarkserif:890,product:823,radical:549,dotmath:250,logicalnot:713,logicaland:603,logicalor:603,arrowdblboth:1042,arrowdblleft:987,arrowdblup:603,arrowdblright:987,arrowdbldown:603,lozenge:494,angleleft:329,registersans:790,copyrightsans:790,trademarksans:786,summation:713,parenlefttp:384,parenleftex:384,parenleftbt:384,bracketlefttp:384,bracketleftex:384,bracketleftbt:384,bracelefttp:494,braceleftmid:494,braceleftbt:494,braceex:494,angleright:329,integral:274,integraltp:686,integralex:686,integralbt:686,parenrighttp:384,parenrightex:384,parenrightbt:384,bracketrighttp:384,bracketrightex:384,bracketrightbt:384,bracerighttp:494,bracerightmid:494,bracerightbt:494,apple:790},"Times-Roman":{space:250,exclam:333,quotedbl:408,numbersign:500,dollar:500,percent:833,ampersand:778,quoteright:333,parenleft:333,parenright:333,asterisk:500,plus:564,comma:250,hyphen:333,period:250,slash:278,zero:500,one:500,two:500,three:500,four:500,five:500,six:500,seven:500,eight:500,nine:500,colon:278,semicolon:278,less:564,equal:564,greater:564,question:444,at:921,A:722,B:667,C:667,D:722,E:611,F:556,G:722,H:722,I:333,J:389,K:722,L:611,M:889,N:722,O:722,P:556,Q:722,R:667,S:556,T:611,U:722,V:722,W:944,X:722,Y:722,Z:611,bracketleft:333,backslash:278,bracketright:333,asciicircum:469,underscore:500,quoteleft:333,a:444,b:500,c:444,d:500,e:444,f:333,g:500,h:500,i:278,j:278,k:500,l:278,m:778,n:500,o:500,p:500,q:500,r:333,s:389,t:278,u:500,v:500,w:722,x:500,y:500,z:444,braceleft:480,bar:200,braceright:480,asciitilde:541,exclamdown:333,cent:500,sterling:500,fraction:167,yen:500,florin:500,section:500,currency:500,quotesingle:180,quotedblleft:444,guillemotleft:500,guilsinglleft:333,guilsinglright:333,fi:556,fl:556,endash:500,dagger:500,daggerdbl:500,periodcentered:250,paragraph:453,bullet:350,quotesinglbase:333,quotedblbase:444,quotedblright:444,guillemotright:500,ellipsis:1e3,perthousand:1e3,questiondown:444,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:889,ordfeminine:276,Lslash:611,Oslash:722,OE:889,ordmasculine:310,ae:667,dotlessi:278,lslash:278,oslash:500,oe:722,germandbls:500,Idieresis:333,eacute:444,abreve:444,uhungarumlaut:500,ecaron:444,Ydieresis:722,divide:564,Yacute:722,Acircumflex:722,aacute:444,Ucircumflex:722,yacute:500,scommaaccent:389,ecircumflex:444,Uring:722,Udieresis:722,aogonek:444,Uacute:722,uogonek:500,Edieresis:611,Dcroat:722,commaaccent:250,copyright:760,Emacron:611,ccaron:444,aring:444,Ncommaaccent:722,lacute:278,agrave:444,Tcommaaccent:611,Cacute:667,atilde:444,Edotaccent:611,scaron:389,scedilla:389,iacute:278,lozenge:471,Rcaron:667,Gcommaaccent:722,ucircumflex:500,acircumflex:444,Amacron:722,rcaron:333,ccedilla:444,Zdotaccent:611,Thorn:556,Omacron:722,Racute:667,Sacute:556,dcaron:588,Umacron:722,uring:500,threesuperior:300,Ograve:722,Agrave:722,Abreve:722,multiply:564,uacute:500,Tcaron:611,partialdiff:476,ydieresis:500,Nacute:722,icircumflex:278,Ecircumflex:611,adieresis:444,edieresis:444,cacute:444,nacute:500,umacron:500,Ncaron:722,Iacute:333,plusminus:564,brokenbar:200,registered:760,Gbreve:722,Idotaccent:333,summation:600,Egrave:611,racute:333,omacron:500,Zacute:611,Zcaron:611,greaterequal:549,Eth:722,Ccedilla:667,lcommaaccent:278,tcaron:326,eogonek:444,Uogonek:722,Aacute:722,Adieresis:722,egrave:444,zacute:444,iogonek:278,Oacute:722,oacute:500,amacron:444,sacute:389,idieresis:278,Ocircumflex:722,Ugrave:722,Delta:612,thorn:500,twosuperior:300,Odieresis:722,mu:500,igrave:278,ohungarumlaut:500,Eogonek:611,dcroat:500,threequarters:750,Scedilla:556,lcaron:344,Kcommaaccent:722,Lacute:611,trademark:980,edotaccent:444,Igrave:333,Imacron:333,Lcaron:611,onehalf:750,lessequal:549,ocircumflex:500,ntilde:500,Uhungarumlaut:722,Eacute:611,emacron:444,gbreve:500,onequarter:750,Scaron:556,Scommaaccent:556,Ohungarumlaut:722,degree:400,ograve:500,Ccaron:667,ugrave:500,radical:453,Dcaron:722,rcommaaccent:333,Ntilde:722,otilde:500,Rcommaaccent:667,Lcommaaccent:611,Atilde:722,Aogonek:722,Aring:722,Otilde:722,zdotaccent:444,Ecaron:611,Iogonek:333,kcommaaccent:500,minus:564,Icircumflex:333,ncaron:500,tcommaaccent:278,logicalnot:564,odieresis:500,udieresis:500,notequal:549,gcommaaccent:500,eth:500,zcaron:444,ncommaaccent:500,onesuperior:300,imacron:278,Euro:500},"Times-Bold":{space:250,exclam:333,quotedbl:555,numbersign:500,dollar:500,percent:1e3,ampersand:833,quoteright:333,parenleft:333,parenright:333,asterisk:500,plus:570,comma:250,hyphen:333,period:250,slash:278,zero:500,one:500,two:500,three:500,four:500,five:500,six:500,seven:500,eight:500,nine:500,colon:333,semicolon:333,less:570,equal:570,greater:570,question:500,at:930,A:722,B:667,C:722,D:722,E:667,F:611,G:778,H:778,I:389,J:500,K:778,L:667,M:944,N:722,O:778,P:611,Q:778,R:722,S:556,T:667,U:722,V:722,W:1e3,X:722,Y:722,Z:667,bracketleft:333,backslash:278,bracketright:333,asciicircum:581,underscore:500,quoteleft:333,a:500,b:556,c:444,d:556,e:444,f:333,g:500,h:556,i:278,j:333,k:556,l:278,m:833,n:556,o:500,p:556,q:556,r:444,s:389,t:333,u:556,v:500,w:722,x:500,y:500,z:444,braceleft:394,bar:220,braceright:394,asciitilde:520,exclamdown:333,cent:500,sterling:500,fraction:167,yen:500,florin:500,section:500,currency:500,quotesingle:278,quotedblleft:500,guillemotleft:500,guilsinglleft:333,guilsinglright:333,fi:556,fl:556,endash:500,dagger:500,daggerdbl:500,periodcentered:250,paragraph:540,bullet:350,quotesinglbase:333,quotedblbase:500,quotedblright:500,guillemotright:500,ellipsis:1e3,perthousand:1e3,questiondown:500,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:1e3,ordfeminine:300,Lslash:667,Oslash:778,OE:1e3,ordmasculine:330,ae:722,dotlessi:278,lslash:278,oslash:500,oe:722,germandbls:556,Idieresis:389,eacute:444,abreve:500,uhungarumlaut:556,ecaron:444,Ydieresis:722,divide:570,Yacute:722,Acircumflex:722,aacute:500,Ucircumflex:722,yacute:500,scommaaccent:389,ecircumflex:444,Uring:722,Udieresis:722,aogonek:500,Uacute:722,uogonek:556,Edieresis:667,Dcroat:722,commaaccent:250,copyright:747,Emacron:667,ccaron:444,aring:500,Ncommaaccent:722,lacute:278,agrave:500,Tcommaaccent:667,Cacute:722,atilde:500,Edotaccent:667,scaron:389,scedilla:389,iacute:278,lozenge:494,Rcaron:722,Gcommaaccent:778,ucircumflex:556,acircumflex:500,Amacron:722,rcaron:444,ccedilla:444,Zdotaccent:667,Thorn:611,Omacron:778,Racute:722,Sacute:556,dcaron:672,Umacron:722,uring:556,threesuperior:300,Ograve:778,Agrave:722,Abreve:722,multiply:570,uacute:556,Tcaron:667,partialdiff:494,ydieresis:500,Nacute:722,icircumflex:278,Ecircumflex:667,adieresis:500,edieresis:444,cacute:444,nacute:556,umacron:556,Ncaron:722,Iacute:389,plusminus:570,brokenbar:220,registered:747,Gbreve:778,Idotaccent:389,summation:600,Egrave:667,racute:444,omacron:500,Zacute:667,Zcaron:667,greaterequal:549,Eth:722,Ccedilla:722,lcommaaccent:278,tcaron:416,eogonek:444,Uogonek:722,Aacute:722,Adieresis:722,egrave:444,zacute:444,iogonek:278,Oacute:778,oacute:500,amacron:500,sacute:389,idieresis:278,Ocircumflex:778,Ugrave:722,Delta:612,thorn:556,twosuperior:300,Odieresis:778,mu:556,igrave:278,ohungarumlaut:500,Eogonek:667,dcroat:556,threequarters:750,Scedilla:556,lcaron:394,Kcommaaccent:778,Lacute:667,trademark:1e3,edotaccent:444,Igrave:389,Imacron:389,Lcaron:667,onehalf:750,lessequal:549,ocircumflex:500,ntilde:556,Uhungarumlaut:722,Eacute:667,emacron:444,gbreve:500,onequarter:750,Scaron:556,Scommaaccent:556,Ohungarumlaut:778,degree:400,ograve:500,Ccaron:722,ugrave:556,radical:549,Dcaron:722,rcommaaccent:444,Ntilde:722,otilde:500,Rcommaaccent:722,Lcommaaccent:667,Atilde:722,Aogonek:722,Aring:722,Otilde:778,zdotaccent:444,Ecaron:667,Iogonek:389,kcommaaccent:556,minus:570,Icircumflex:389,ncaron:556,tcommaaccent:333,logicalnot:570,odieresis:500,udieresis:556,notequal:549,gcommaaccent:500,eth:500,zcaron:444,ncommaaccent:556,onesuperior:300,imacron:278,Euro:500},"Times-BoldItalic":{space:250,exclam:389,quotedbl:555,numbersign:500,dollar:500,percent:833,ampersand:778,quoteright:333,parenleft:333,parenright:333,asterisk:500,plus:570,comma:250,hyphen:333,period:250,slash:278,zero:500,one:500,two:500,three:500,four:500,five:500,six:500,seven:500,eight:500,nine:500,colon:333,semicolon:333,less:570,equal:570,greater:570,question:500,at:832,A:667,B:667,C:667,D:722,E:667,F:667,G:722,H:778,I:389,J:500,K:667,L:611,M:889,N:722,O:722,P:611,Q:722,R:667,S:556,T:611,U:722,V:667,W:889,X:667,Y:611,Z:611,bracketleft:333,backslash:278,bracketright:333,asciicircum:570,underscore:500,quoteleft:333,a:500,b:500,c:444,d:500,e:444,f:333,g:500,h:556,i:278,j:278,k:500,l:278,m:778,n:556,o:500,p:500,q:500,r:389,s:389,t:278,u:556,v:444,w:667,x:500,y:444,z:389,braceleft:348,bar:220,braceright:348,asciitilde:570,exclamdown:389,cent:500,sterling:500,fraction:167,yen:500,florin:500,section:500,currency:500,quotesingle:278,quotedblleft:500,guillemotleft:500,guilsinglleft:333,guilsinglright:333,fi:556,fl:556,endash:500,dagger:500,daggerdbl:500,periodcentered:250,paragraph:500,bullet:350,quotesinglbase:333,quotedblbase:500,quotedblright:500,guillemotright:500,ellipsis:1e3,perthousand:1e3,questiondown:500,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:1e3,AE:944,ordfeminine:266,Lslash:611,Oslash:722,OE:944,ordmasculine:300,ae:722,dotlessi:278,lslash:278,oslash:500,oe:722,germandbls:500,Idieresis:389,eacute:444,abreve:500,uhungarumlaut:556,ecaron:444,Ydieresis:611,divide:570,Yacute:611,Acircumflex:667,aacute:500,Ucircumflex:722,yacute:444,scommaaccent:389,ecircumflex:444,Uring:722,Udieresis:722,aogonek:500,Uacute:722,uogonek:556,Edieresis:667,Dcroat:722,commaaccent:250,copyright:747,Emacron:667,ccaron:444,aring:500,Ncommaaccent:722,lacute:278,agrave:500,Tcommaaccent:611,Cacute:667,atilde:500,Edotaccent:667,scaron:389,scedilla:389,iacute:278,lozenge:494,Rcaron:667,Gcommaaccent:722,ucircumflex:556,acircumflex:500,Amacron:667,rcaron:389,ccedilla:444,Zdotaccent:611,Thorn:611,Omacron:722,Racute:667,Sacute:556,dcaron:608,Umacron:722,uring:556,threesuperior:300,Ograve:722,Agrave:667,Abreve:667,multiply:570,uacute:556,Tcaron:611,partialdiff:494,ydieresis:444,Nacute:722,icircumflex:278,Ecircumflex:667,adieresis:500,edieresis:444,cacute:444,nacute:556,umacron:556,Ncaron:722,Iacute:389,plusminus:570,brokenbar:220,registered:747,Gbreve:722,Idotaccent:389,summation:600,Egrave:667,racute:389,omacron:500,Zacute:611,Zcaron:611,greaterequal:549,Eth:722,Ccedilla:667,lcommaaccent:278,tcaron:366,eogonek:444,Uogonek:722,Aacute:667,Adieresis:667,egrave:444,zacute:389,iogonek:278,Oacute:722,oacute:500,amacron:500,sacute:389,idieresis:278,Ocircumflex:722,Ugrave:722,Delta:612,thorn:500,twosuperior:300,Odieresis:722,mu:576,igrave:278,ohungarumlaut:500,Eogonek:667,dcroat:500,threequarters:750,Scedilla:556,lcaron:382,Kcommaaccent:667,Lacute:611,trademark:1e3,edotaccent:444,Igrave:389,Imacron:389,Lcaron:611,onehalf:750,lessequal:549,ocircumflex:500,ntilde:556,Uhungarumlaut:722,Eacute:667,emacron:444,gbreve:500,onequarter:750,Scaron:556,Scommaaccent:556,Ohungarumlaut:722,degree:400,ograve:500,Ccaron:667,ugrave:556,radical:549,Dcaron:722,rcommaaccent:389,Ntilde:722,otilde:500,Rcommaaccent:667,Lcommaaccent:611,Atilde:667,Aogonek:667,Aring:667,Otilde:722,zdotaccent:389,Ecaron:667,Iogonek:389,kcommaaccent:500,minus:606,Icircumflex:389,ncaron:556,tcommaaccent:278,logicalnot:606,odieresis:500,udieresis:556,notequal:549,gcommaaccent:500,eth:500,zcaron:389,ncommaaccent:556,onesuperior:300,imacron:278,Euro:500},"Times-Italic":{space:250,exclam:333,quotedbl:420,numbersign:500,dollar:500,percent:833,ampersand:778,quoteright:333,parenleft:333,parenright:333,asterisk:500,plus:675,comma:250,hyphen:333,period:250,slash:278,zero:500,one:500,two:500,three:500,four:500,five:500,six:500,seven:500,eight:500,nine:500,colon:333,semicolon:333,less:675,equal:675,greater:675,question:500,at:920,A:611,B:611,C:667,D:722,E:611,F:611,G:722,H:722,I:333,J:444,K:667,L:556,M:833,N:667,O:722,P:611,Q:722,R:611,S:500,T:556,U:722,V:611,W:833,X:611,Y:556,Z:556,bracketleft:389,backslash:278,bracketright:389,asciicircum:422,underscore:500,quoteleft:333,a:500,b:500,c:444,d:500,e:444,f:278,g:500,h:500,i:278,j:278,k:444,l:278,m:722,n:500,o:500,p:500,q:500,r:389,s:389,t:278,u:500,v:444,w:667,x:444,y:444,z:389,braceleft:400,bar:275,braceright:400,asciitilde:541,exclamdown:389,cent:500,sterling:500,fraction:167,yen:500,florin:500,section:500,currency:500,quotesingle:214,quotedblleft:556,guillemotleft:500,guilsinglleft:333,guilsinglright:333,fi:500,fl:500,endash:500,dagger:500,daggerdbl:500,periodcentered:250,paragraph:523,bullet:350,quotesinglbase:333,quotedblbase:556,quotedblright:556,guillemotright:500,ellipsis:889,perthousand:1e3,questiondown:500,grave:333,acute:333,circumflex:333,tilde:333,macron:333,breve:333,dotaccent:333,dieresis:333,ring:333,cedilla:333,hungarumlaut:333,ogonek:333,caron:333,emdash:889,AE:889,ordfeminine:276,Lslash:556,Oslash:722,OE:944,ordmasculine:310,ae:667,dotlessi:278,lslash:278,oslash:500,oe:667,germandbls:500,Idieresis:333,eacute:444,abreve:500,uhungarumlaut:500,ecaron:444,Ydieresis:556,divide:675,Yacute:556,Acircumflex:611,aacute:500,Ucircumflex:722,yacute:444,scommaaccent:389,ecircumflex:444,Uring:722,Udieresis:722,aogonek:500,Uacute:722,uogonek:500,Edieresis:611,Dcroat:722,commaaccent:250,copyright:760,Emacron:611,ccaron:444,aring:500,Ncommaaccent:667,lacute:278,agrave:500,Tcommaaccent:556,Cacute:667,atilde:500,Edotaccent:611,scaron:389,scedilla:389,iacute:278,lozenge:471,Rcaron:611,Gcommaaccent:722,ucircumflex:500,acircumflex:500,Amacron:611,rcaron:389,ccedilla:444,Zdotaccent:556,Thorn:611,Omacron:722,Racute:611,Sacute:500,dcaron:544,Umacron:722,uring:500,threesuperior:300,Ograve:722,Agrave:611,Abreve:611,multiply:675,uacute:500,Tcaron:556,partialdiff:476,ydieresis:444,Nacute:667,icircumflex:278,Ecircumflex:611,adieresis:500,edieresis:444,cacute:444,nacute:500,umacron:500,Ncaron:667,Iacute:333,plusminus:675,brokenbar:275,registered:760,Gbreve:722,Idotaccent:333,summation:600,Egrave:611,racute:389,omacron:500,Zacute:556,Zcaron:556,greaterequal:549,Eth:722,Ccedilla:667,lcommaaccent:278,tcaron:300,eogonek:444,Uogonek:722,Aacute:611,Adieresis:611,egrave:444,zacute:389,iogonek:278,Oacute:722,oacute:500,amacron:500,sacute:389,idieresis:278,Ocircumflex:722,Ugrave:722,Delta:612,thorn:500,twosuperior:300,Odieresis:722,mu:500,igrave:278,ohungarumlaut:500,Eogonek:611,dcroat:500,threequarters:750,Scedilla:500,lcaron:300,Kcommaaccent:667,Lacute:556,trademark:980,edotaccent:444,Igrave:333,Imacron:333,Lcaron:611,onehalf:750,lessequal:549,ocircumflex:500,ntilde:500,Uhungarumlaut:722,Eacute:611,emacron:444,gbreve:500,onequarter:750,Scaron:500,Scommaaccent:500,Ohungarumlaut:722,degree:400,ograve:500,Ccaron:667,ugrave:500,radical:453,Dcaron:722,rcommaaccent:389,Ntilde:667,otilde:500,Rcommaaccent:611,Lcommaaccent:556,Atilde:611,Aogonek:611,Aring:611,Otilde:722,zdotaccent:389,Ecaron:611,Iogonek:333,kcommaaccent:444,minus:675,Icircumflex:333,ncaron:500,tcommaaccent:278,logicalnot:675,odieresis:500,udieresis:500,notequal:549,gcommaaccent:500,eth:500,zcaron:389,ncommaaccent:500,onesuperior:300,imacron:278,Euro:500},ZapfDingbats:{space:278,a1:974,a2:961,a202:974,a3:980,a4:719,a5:789,a119:790,
a118:791,a117:690,a11:960,a12:939,a13:549,a14:855,a15:911,a16:933,a105:911,a17:945,a18:974,a19:755,a20:846,a21:762,a22:761,a23:571,a24:677,a25:763,a26:760,a27:759,a28:754,a6:494,a7:552,a8:537,a9:577,a10:692,a29:786,a30:788,a31:788,a32:790,a33:793,a34:794,a35:816,a36:823,a37:789,a38:841,a39:823,a40:833,a41:816,a42:831,a43:923,a44:744,a45:723,a46:749,a47:790,a48:792,a49:695,a50:776,a51:768,a52:792,a53:759,a54:707,a55:708,a56:682,a57:701,a58:826,a59:815,a60:789,a61:789,a62:707,a63:687,a64:696,a65:689,a66:786,a67:787,a68:713,a69:791,a70:785,a71:791,a72:873,a73:761,a74:762,a203:762,a75:759,a204:759,a76:892,a77:892,a78:788,a79:784,a81:438,a82:138,a83:277,a84:415,a97:392,a98:392,a99:668,a100:668,a89:390,a90:390,a93:317,a94:317,a91:276,a92:276,a205:509,a85:509,a206:410,a86:410,a87:234,a88:234,a95:334,a96:334,a101:732,a102:544,a103:544,a104:910,a106:667,a107:760,a108:760,a112:776,a111:595,a110:694,a109:626,a120:788,a121:788,a122:788,a123:788,a124:788,a125:788,a126:788,a127:788,a128:788,a129:788,a130:788,a131:788,a132:788,a133:788,a134:788,a135:788,a136:788,a137:788,a138:788,a139:788,a140:788,a141:788,a142:788,a143:788,a144:788,a145:788,a146:788,a147:788,a148:788,a149:788,a150:788,a151:788,a152:788,a153:788,a154:788,a155:788,a156:788,a157:788,a158:788,a159:788,a160:894,a161:838,a163:1016,a164:458,a196:748,a165:924,a192:748,a166:918,a167:927,a168:928,a169:928,a170:834,a171:873,a172:828,a173:924,a162:924,a174:917,a175:930,a176:931,a177:463,a178:883,a179:836,a193:836,a180:867,a199:867,a181:696,a200:696,a182:874,a201:874,a183:760,a184:946,a197:771,a185:865,a194:771,a198:888,a186:967,a195:888,a187:831,a188:873,a189:927,a190:970,a191:918}},xc={},yc=1e3,zc=function(){function d(a,b,c){this.lexer=a,this.allowStreams=b,this.xref=c,this.imageCache={},this.refill()}return d.prototype={refill:function(){this.buf1=this.lexer.getObj(),this.buf2=this.lexer.getObj()},shift:function(){y(this.buf2,"ID")?(this.buf1=this.buf2,this.buf2=null):(this.buf1=this.buf2,this.buf2=this.lexer.getObj())},getObj:function(b){var d=this.buf1;if(this.shift(),d instanceof ua)switch(d.cmd){case"BI":// inline image
return this.makeInlineImage(b);case"[":for(// array
var e=[];!y(this.buf1,"]")&&!O(this.buf1);)e.push(this.getObj(b));return O(this.buf1)&&c("End of file inside array"),this.shift(),e;case"<<":for(// dictionary or stream
var f=new va(this.xref);!y(this.buf1,">>")&&!O(this.buf1);)if(x(this.buf1)){var g=this.buf1.name;if(this.shift(),O(this.buf1))break;f.set(g,this.getObj(b))}else a("Malformed dictionary: key must be a name object"),this.shift();
// Stream objects are not allowed inside content streams or
// object streams.
// Stream objects are not allowed inside content streams or
// object streams.
return O(this.buf1)&&c("End of file inside dictionary"),y(this.buf2,"stream")?this.allowStreams?this.makeStream(f,b):f:(this.shift(),f);default:// simple object
return d}if(u(d)){// indirect reference or integer
var h=d;if(u(this.buf1)&&y(this.buf2,"R")){var i=new wa(h,this.buf1);return this.shift(),this.shift(),i}return h}if(w(d)){// string
var j=d;return b&&(j=b.decryptString(j)),j}
// simple object
return d},/**
     * Find the end of the stream by searching for the /EI\s/.
     * @returns {number} The inline stream length.
     */
findDefaultInlineStreamEnd:function(a){for(var b,c,d,f,g=69,h=73,i=32,j=10,k=13,l=a.pos,m=0;-1!==(b=a.getByte());)if(0===m)m=b===g?1:0;else if(1===m)m=b===h?2:0;else if(e(2===m),b===i||b===j||b===k){for(
// Let's check the next five bytes are ASCII... just be sure.
d=5,f=a.peekBytes(d),c=0;d>c;c++)if(b=f[c],b!==j&&b!==k&&(i>b||b>127)){
// Not a LF, CR, SPACE or any visible ASCII character, i.e.
// it's binary stuff. Resetting the state.
m=0;break}if(2===m)break}else m=0;return a.pos-4-l},/**
     * Find the EOI (end-of-image) marker 0xFFD9 of the stream.
     * @returns {number} The inline stream length.
     */
findDCTDecodeInlineStreamEnd:function(a){for(var c,d,e,f=a.pos,g=!1;-1!==(c=a.getByte());)if(255===c){switch(a.getByte()){case 0:// Byte stuffing.
// 0xFF00 appears to be a very common byte sequence in JPEG images.
break;case 255:// Fill byte.
// Avoid skipping a valid marker, resetting the stream position.
a.skip(-1);break;case 217:// EOI
g=!0;break;case 192:// SOF0
case 193:// SOF1
case 194:// SOF2
case 195:// SOF3
case 197:// SOF5
case 198:// SOF6
case 199:// SOF7
case 201:// SOF9
case 202:// SOF10
case 203:// SOF11
case 205:// SOF13
case 206:// SOF14
case 207:// SOF15
case 196:// DHT
case 204:// DAC
case 218:// SOS
case 219:// DQT
case 220:// DNL
case 221:// DRI
case 222:// DHP
case 223:// EXP
case 224:// APP0
case 225:// APP1
case 226:// APP2
case 227:// APP3
case 228:// APP4
case 229:// APP5
case 230:// APP6
case 231:// APP7
case 232:// APP8
case 233:// APP9
case 234:// APP10
case 235:// APP11
case 236:// APP12
case 237:// APP13
case 238:// APP14
case 239:// APP15
case 254:// COM
// The marker should be followed by the length of the segment.
d=a.getUint16(),
// |markerLength| contains the byte length of the marker segment,
// including its own length (2 bytes) and excluding the marker.
a.skip(d>2?d-2:-2)}if(g)break}return e=a.pos-f,-1===c?(b("Inline DCTDecode image stream: EOI marker not found, searching for /EI/ instead."),a.skip(-e),this.findDefaultInlineStreamEnd(a)):(this.inlineStreamSkipEI(a),e)},/**
     * Find the EOD (end-of-data) marker '~>' (i.e. TILDE + GT) of the stream.
     * @returns {number} The inline stream length.
     */
findASCII85DecodeInlineStreamEnd:function(a){for(var c,d,e=126,f=62,g=a.pos;-1!==(c=a.getByte());)if(c===e&&a.peekByte()===f){a.skip();break}return d=a.pos-g,-1===c?(b("Inline ASCII85Decode image stream: EOD marker not found, searching for /EI/ instead."),a.skip(-d),this.findDefaultInlineStreamEnd(a)):(this.inlineStreamSkipEI(a),d)},/**
     * Find the EOD (end-of-data) marker '>' (i.e. GT) of the stream.
     * @returns {number} The inline stream length.
     */
findASCIIHexDecodeInlineStreamEnd:function(a){for(var c,d,e=62,f=a.pos;-1!==(c=a.getByte())&&c!==e;);return d=a.pos-f,-1===c?(b("Inline ASCIIHexDecode image stream: EOD marker not found, searching for /EI/ instead."),a.skip(-d),this.findDefaultInlineStreamEnd(a)):(this.inlineStreamSkipEI(a),d)},/**
     * Skip over the /EI/ for streams where we search for an EOD marker.
     */
inlineStreamSkipEI:function(a){for(var b,c=69,d=73,e=0;-1!==(b=a.getByte());)if(0===e)e=b===c?1:0;else if(1===e)e=b===d?2:0;else if(2===e)break},makeInlineImage:function(a){for(var b=this.lexer,d=b.stream,e=new va(null);!y(this.buf1,"ID")&&!O(this.buf1);){x(this.buf1)||c("Dictionary key must be a name object");var f=this.buf1.name;if(this.shift(),O(this.buf1))break;e.set(f,this.getObj(a))}
// Extract the name of the first (i.e. the current) image filter.
var g,h=this.fetchIfRef(e.get("Filter","F"));x(h)?g=h.name:A(h)&&x(h[0])&&(g=h[0].name);
// Parse image stream.
var i,j,k,l=d.pos;i="DCTDecode"===g||"DCT"===g?this.findDCTDecodeInlineStreamEnd(d):"ASCII85Decide"===g||"A85"===g?this.findASCII85DecodeInlineStreamEnd(d):"ASCIIHexDecode"===g||"AHx"===g?this.findASCIIHexDecodeInlineStreamEnd(d):this.findDefaultInlineStreamEnd(d);var m,n=d.makeSubStream(l,i,e);if(yc>i){var o=n.getBytes();n.reset();var p=1,q=0;for(j=0,k=o.length;k>j;++j)
// No modulo required in the loop if imageBytes.length < 5552.
p+=255&o[j],q+=p;if(m=q%65521<<16|p%65521,this.imageCache.adler32===m)return this.buf2=ua.get("EI"),this.shift(),this.imageCache[m].reset(),this.imageCache[m]}return a&&(n=a.createStream(n,i)),n=this.filter(n,e,i),n.dict=e,void 0!==m&&(n.cacheKey="inline_"+i+"_"+m,this.imageCache[m]=n),this.buf2=ua.get("EI"),this.shift(),n},fetchIfRef:function(a){
// not relying on the xref.fetchIfRef -- xref might not be set
return D(a)?this.xref.fetch(a):a},makeStream:function(b,d){var e=this.lexer,f=e.stream;
// get stream start position
e.skipToNextLine();var g=f.pos-1,h=this.fetchIfRef(b.get("Length"));// 'stream'
if(u(h)||(a("Bad "+h+" attribute in stream"),h=0),
// skip over the stream data
f.pos=g+h,e.nextChar(),this.shift(),// '>>'
this.shift(),!y(this.buf1,"endstream")){
// bad stream length, scanning for endstream
f.pos=g;for(var i,j,k=2048,l=9,m=[101,110,100,115,116,114,101,97,109],n=0,o=!1;f.pos<f.end;){var p=f.peekBytes(k),q=p.length-l;if(0>=q)break;for(o=!1,i=0,j=0;q>i;i++){var r=p[i];if(r!==m[j])i-=j,j=0;else if(j++,j>=l){i++,o=!0;break}}if(o){n+=i-l,f.pos+=i-l;break}n+=q,f.pos+=q}o||c("Missing endstream"),h=n,e.nextChar(),this.shift(),this.shift()}// 'endstream'
return this.shift(),f=f.makeSubStream(g,h,b),d&&(f=d.createStream(f,h)),f=this.filter(f,b,h),f.dict=b,f},filter:function(a,b,d){var e=this.fetchIfRef(b.get("Filter","F")),f=this.fetchIfRef(b.get("DecodeParms","DP"));if(x(e))return this.makeFilter(a,e.name,d,f);var g=d;if(A(e))for(var h=e,i=f,j=0,k=h.length;k>j;++j)e=h[j],x(e)||c("Bad filter name: "+e),f=null,A(i)&&j in i&&(f=i[j]),a=this.makeFilter(a,e.name,g,f),
// after the first stream the length variable is invalid
g=null;return a},makeFilter:function(a,c,d,e){if(0===a.dict.get("Length"))return new Vc(a);try{e&&(e=this.fetchIfRef(e));var f=this.xref.stats.streamTypes;if("FlateDecode"===c||"Fl"===c)return f[U.FLATE]=!0,e?new Lc(new Kc(a,d),d,e):new Kc(a,d);if("LZWDecode"===c||"LZW"===c){f[U.LZW]=!0;var g=1;return e?(e.has("EarlyChange")&&(g=e.get("EarlyChange")),new Lc(new Uc(a,d,g),d,e)):new Uc(a,d,g)}return"DCTDecode"===c||"DCT"===c?(f[U.DCT]=!0,new Mc(a,d,a.dict,this.xref)):"JPXDecode"===c||"JPX"===c?(f[U.JPX]=!0,new Nc(a,d,a.dict)):"ASCII85Decode"===c||"A85"===c?(f[U.A85]=!0,new Qc(a,d)):"ASCIIHexDecode"===c||"AHx"===c?(f[U.AHX]=!0,new Rc(a,d)):"CCITTFaxDecode"===c||"CCF"===c?(f[U.CCF]=!0,new Tc(a,d,e)):"RunLengthDecode"===c||"RL"===c?(f[U.RL]=!0,new Sc(a,d)):"JBIG2Decode"===c?(f[U.JBIG]=!0,new Oc(a,d,a.dict)):(b('filter "'+c+'" not supported yet'),a)}catch(h){if(h instanceof ea)throw h;return b('Invalid stream: "'+h+'"'),new Vc(a)}}},d}(),Ac=function(){function a(a,b){this.stream=a,this.nextChar(),
// While lexing, we build up many strings one char at a time. Using += for
// this can result in lots of garbage strings. It's better to build an
// array of single-char strings and then join() them together at the end.
// And reusing a single array (i.e. |this.strBuf|) over and over for this
// purpose uses less memory than using a new array for each string.
this.strBuf=[],
// The PDFs might have "glued" commands with other commands, operands or
// literals, e.g. "q1". The knownCommands is a dictionary of the valid
// commands and their prefixes. The prefixes are built the following way:
// if there a command that is a prefix of the other valid command or
// literal (e.g. 'f' and 'false') the following prefixes must be included,
// 'fa', 'fal', 'fals'. The prefixes are not needed, if the command has no
// other commands or literals as a prefix. The knowCommands is optional.
this.knownCommands=b}function d(a){return a>=48&&57>=a?15&a:a>=65&&70>=a||a>=97&&102>=a?(15&a)+9:-1}a.isSpace=function(a){
// Space is one of the following characters: SPACE, TAB, CR or LF.
return 32===a||9===a||13===a||10===a};
// A '1' in this array means the character is white space. A '1' or
// '2' means the character ends a name or command.
var e=[1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,// 0x
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// 1x
1,0,0,0,0,2,0,0,2,2,0,0,0,0,0,2,// 2x
0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,// 3x
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// 4x
0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,// 5x
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// 6x
0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,// 7x
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// 8x
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// 9x
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// ax
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// bx
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// cx
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// dx
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,// ex
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];return a.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},peekChar:function(){return this.stream.peekByte()},getNumber:function(){var a=this.currentChar,d=!1,e=0,f=1;if(45===a?(// '-'
f=-1,a=this.nextChar()):43===a&&(// '+'
a=this.nextChar()),46===a&&(// '.'
e=10,a=this.nextChar()),48>a||a>57)// '0' - '9'
return c("Invalid number: "+String.fromCharCode(a)),0;for(var g=a-48,h=0,i=1;(a=this.nextChar())>=0;)if(a>=48&&57>=a){// '0' - '9'
var j=a-48;// '0'
d?// We are after an 'e' or 'E'
h=10*h+j:(0!==e&&(// We are after a point
e*=10),g=10*g+j)}else if(46===a){// '.'
if(0!==e)
// A number can have only one '.'
break;e=1}else if(45===a)// '-'
// ignore minus signs in the middle of numbers to match
// Adobe's behavior
b("Badly formated number");else{if(69!==a&&101!==a)
// the last character doesn't belong to us
break;if(// 'E', 'e'
// 'E' can be either a scientific notation or the beginning of a new
// operator
a=this.peekChar(),43===a||45===a)// '+', '-'
i=45===a?-1:1,this.nextChar();else if(48>a||a>57)// '0' - '9'
// The 'E' must be the beginning of a new operator
break;d=!0}return 0!==e&&(g/=e),d&&(g*=Math.pow(10,i*h)),f*g},getString:function(){var a=1,c=!1,d=this.strBuf;d.length=0;for(var e=this.nextChar();;){var f=!1;switch(0|e){case-1:b("Unterminated string"),c=!0;break;case 40:// '('
++a,d.push("(");break;case 41:// ')'
0===--a?(this.nextChar(),// consume strings ')'
c=!0):d.push(")");break;case 92:switch(// '\\'
e=this.nextChar()){case-1:b("Unterminated string"),c=!0;break;case 110:// 'n'
d.push("\n");break;case 114:// 'r'
d.push("\r");break;case 116:// 't'
d.push("	");break;case 98:// 'b'
d.push("\b");break;case 102:// 'f'
d.push("\f");break;case 92:// '\'
case 40:// '('
case 41:// ')'
d.push(String.fromCharCode(e));break;case 48:case 49:case 50:case 51:// '0'-'3'
case 52:case 53:case 54:case 55:// '4'-'7'
var g=15&e;e=this.nextChar(),f=!0,e>=48&&55>=e&&(// '0'-'7'
g=(g<<3)+(15&e),e=this.nextChar(),e>=48&&55>=e&&(// '0'-'7'
f=!1,g=(g<<3)+(15&e))),d.push(String.fromCharCode(g));break;case 13:// CR
10===this.peekChar()&&// LF
this.nextChar();break;case 10:// LF
break;default:d.push(String.fromCharCode(e))}break;default:d.push(String.fromCharCode(e))}if(c)break;f||(e=this.nextChar())}return d.join("")},getName:function(){var a,b=this.strBuf;for(b.length=0;(a=this.nextChar())>=0&&!e[a];)if(35===a){// '#'
a=this.nextChar();var f=d(a);if(-1!==f){var g=d(this.nextChar());-1===g&&c("Illegal digit in hex char in name: "+g),b.push(String.fromCharCode(f<<4|g))}else b.push("#",String.fromCharCode(a))}else b.push(String.fromCharCode(a));return b.length>128&&c("Warning: name token is longer than allowed by the spec: "+b.length),ta.get(b.join(""))},getHexString:function(){var a=this.strBuf;a.length=0;for(var c,f,g=this.currentChar,h=!0;;){if(0>g){b("Unterminated hex string");break}if(62===g){// '>'
this.nextChar();break}if(1!==e[g]){if(h){if(c=d(g),-1===c){b('Ignoring invalid character "'+g+'" in hex string'),g=this.nextChar();continue}}else{if(f=d(g),-1===f){b('Ignoring invalid character "'+g+'" in hex string'),g=this.nextChar();continue}a.push(String.fromCharCode(c<<4|f))}h=!h,g=this.nextChar()}else g=this.nextChar()}return a.join("")},getObj:function(){for(
// skip whitespace and comments
var a=!1,b=this.currentChar;;){if(0>b)return xc;if(a)(10===b||13===b)&&(// LF, CR
a=!1);else if(37===b)// '%'
a=!0;else if(1!==e[b])break;b=this.nextChar()}
// start reading token
switch(0|b){case 48:case 49:case 50:case 51:case 52:// '0'-'4'
case 53:case 54:case 55:case 56:case 57:// '5'-'9'
case 43:case 45:case 46:// '+', '-', '.'
return this.getNumber();case 40:// '('
return this.getString();case 47:// '/'
return this.getName();
// array punctuation
case 91:// '['
return this.nextChar(),ua.get("[");case 93:// ']'
return this.nextChar(),ua.get("]");
// hex string or dict punctuation
case 60:// '<'
// dict punctuation
return b=this.nextChar(),60===b?(this.nextChar(),ua.get("<<")):this.getHexString();
// dict punctuation
case 62:// '>'
return b=this.nextChar(),62===b?(this.nextChar(),ua.get(">>")):ua.get(">");case 123:// '{'
return this.nextChar(),ua.get("{");case 125:// '}'
return this.nextChar(),ua.get("}");case 41:// ')'
c("Illegal character: "+b)}for(
// command
var d=String.fromCharCode(b),f=this.knownCommands,g=f&&void 0!==f[d];(b=this.nextChar())>=0&&!e[b];){
// stop if known command is found and next character does not make
// the str a command
var h=d+String.fromCharCode(b);if(g&&void 0===f[h])break;128===d.length&&c("Command token too long: "+d.length),d=h,g=f&&void 0!==f[d]}return"true"===d?!0:"false"===d?!1:"null"===d?null:ua.get(d)},skipToNextLine:function(){for(var a=this.currentChar;a>=0;){if(13===a){// CR
a=this.nextChar(),10===a&&// LF
this.nextChar();break}if(10===a){// LF
this.nextChar();break}a=this.nextChar()}}},a}(),Bc={create:function(a){function b(a,b){var c=j.get(a);if(u(c)&&(b?c>=0:c>0))return c;throw new Error('The "'+a+'" parameter in the linearization dictionary is invalid.')}function c(){var a,b,c=j.get("H");if(A(c)&&(2===(a=c.length)||4===a)){for(var d=0;a>d;d++)if(!(u(b=c[d])&&b>0))throw new Error("Hint ("+d+") in the linearization dictionary is invalid.");return c}throw new Error("Hint array in the linearization dictionary is invalid.")}var d,e,f=new zc(new Ac(a),!1,null),g=f.getObj(),h=f.getObj(),i=f.getObj(),j=f.getObj();if(!(u(g)&&u(h)&&y(i,"obj")&&z(j)&&v(d=j.get("Linearized"))&&d>0))return null;if((e=b("L"))!==a.length)throw new Error('The "L" parameter in the linearization dictionary does not equal the stream length.');return{length:e,hints:c(),objectNumberFirst:b("O"),endFirst:b("E"),numPages:b("N"),mainXRefEntriesOffset:b("T"),pageFirst:j.has("P")?b("P",!0):0}}},Cc=function(){function a(a){this.lexer=a,this.operators=[],this.token=null,this.prev=null}return a.prototype={nextToken:function(){this.prev=this.token,this.token=this.lexer.getToken()},accept:function(a){return this.token.type===a?(this.nextToken(),!0):!1},expect:function(a){return this.accept(a)?!0:void c("Unexpected symbol: found "+this.token.type+" expected "+a+".")},parse:function(){return this.nextToken(),this.expect(Dc.LBRACE),this.parseBlock(),this.expect(Dc.RBRACE),this.operators},parseBlock:function(){for(;;)if(this.accept(Dc.NUMBER))this.operators.push(this.prev.value);else if(this.accept(Dc.OPERATOR))this.operators.push(this.prev.value);else{if(!this.accept(Dc.LBRACE))return;this.parseCondition()}},parseCondition:function(){
// Add two place holders that will be updated later
var a=this.operators.length;if(this.operators.push(null,null),this.parseBlock(),this.expect(Dc.RBRACE),this.accept(Dc.IF))
// The true block is right after the 'if' so it just falls through on
// true else it jumps and skips the true block.
this.operators[a]=this.operators.length,this.operators[a+1]="jz";else if(this.accept(Dc.LBRACE)){var b=this.operators.length;this.operators.push(null,null);var d=this.operators.length;this.parseBlock(),this.expect(Dc.RBRACE),this.expect(Dc.IFELSE),
// The jump is added at the end of the true block to skip the false
// block.
this.operators[b]=this.operators.length,this.operators[b+1]="j",this.operators[a]=d,this.operators[a+1]="jz"}else c("PS Function: error parsing conditional.")}},a}(),Dc={LBRACE:0,RBRACE:1,NUMBER:2,OPERATOR:3,IF:4,IFELSE:5},Ec=function(){function a(a,b){this.type=a,this.value=b}var b={};return a.getOperator=function(c){var d=b[c];return d?d:b[c]=new a(Dc.OPERATOR,c)},a.LBRACE=new a(Dc.LBRACE,"{"),a.RBRACE=new a(Dc.RBRACE,"}"),a.IF=new a(Dc.IF,"IF"),a.IFELSE=new a(Dc.IFELSE,"IFELSE"),a}(),Fc=function(){function a(a){this.stream=a,this.nextChar(),this.strBuf=[]}return a.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){
// skip comments
for(var a=!1,b=this.currentChar;;){if(0>b)return xc;if(a)(10===b||13===b)&&(a=!1);else if(37===b)// '%'
a=!0;else if(!Ac.isSpace(b))break;b=this.nextChar()}switch(0|b){case 48:case 49:case 50:case 51:case 52:// '0'-'4'
case 53:case 54:case 55:case 56:case 57:// '5'-'9'
case 43:case 45:case 46:// '+', '-', '.'
return new Ec(Dc.NUMBER,this.getNumber());case 123:// '{'
return this.nextChar(),Ec.LBRACE;case 125:// '}'
return this.nextChar(),Ec.RBRACE}
// operator
var c=this.strBuf;for(c.length=0,c[0]=String.fromCharCode(b);(b=this.nextChar())>=0&&(// and 'A'-'Z', 'a'-'z'
b>=65&&90>=b||b>=97&&122>=b);)c.push(String.fromCharCode(b));var d=c.join("");switch(d.toLowerCase()){case"if":return Ec.IF;case"ifelse":return Ec.IFELSE;default:return Ec.getOperator(d)}},getNumber:function(){var a=this.currentChar,b=this.strBuf;for(b.length=0,b[0]=String.fromCharCode(a);(a=this.nextChar())>=0&&(a>=48&&57>=a||// '0'-'9'
45===a||46===a);)// '-', '.'
b.push(String.fromCharCode(a));var d=parseFloat(b.join(""));return isNaN(d)&&c("Invalid floating point number: "+d),d}},a}(),Gc=function(){function a(a,b,c,d){this.bytes=a instanceof Uint8Array?a:new Uint8Array(a),this.start=b||0,this.pos=this.start,this.end=b+c||this.bytes.length,this.dict=d}
// required methods for a stream. if a particular stream does not
// implement these, an error should be thrown
return a.prototype={get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){return this.pos>=this.end?-1:this.bytes[this.pos++]},getUint16:function(){var a=this.getByte(),b=this.getByte();return-1===a||-1===b?-1:(a<<8)+b},getInt32:function(){var a=this.getByte(),b=this.getByte(),c=this.getByte(),d=this.getByte();return(a<<24)+(b<<16)+(c<<8)+d},
// returns subarray of original buffer
// should only be read
getBytes:function(a){var b=this.bytes,c=this.pos,d=this.end;if(!a)return b.subarray(c,d);var e=c+a;return e>d&&(e=d),this.pos=e,b.subarray(c,e)},peekByte:function(){var a=this.getByte();return this.pos--,a},peekBytes:function(a){var b=this.getBytes(a);return this.pos-=b.length,b},skip:function(a){a||(a=1),this.pos+=a},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(b,c,d){return new a(this.bytes.buffer,b,c,d)},isStream:!0},a}(),Hc=function(){function a(a){for(var b=a.length,c=new Uint8Array(b),d=0;b>d;++d)c[d]=a.charCodeAt(d);Gc.call(this,c)}return a.prototype=Gc.prototype,a}(),Ic=function(){function a(a){if(this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=b,this.minBufferLength=512,a)
// Compute the first power of two that is as big as maybeMinBufferLength.
for(;this.minBufferLength<a;)this.minBufferLength*=2}
// Lots of DecodeStreams are created whose buffers are never used.  For these
// we share a single empty buffer. This is (a) space-efficient and (b) avoids
// having special cases that would be required if we used |null| for an empty
// buffer.
var b=new Uint8Array(0);return a.prototype={get isEmpty(){for(;!this.eof&&0===this.bufferLength;)this.readBlock();return 0===this.bufferLength},ensureBuffer:function(a){var b=this.buffer;if(a<=b.byteLength)return b;for(var c=this.minBufferLength;a>c;)c*=2;var d=new Uint8Array(c);return d.set(b),this.buffer=d},getByte:function(){for(var a=this.pos;this.bufferLength<=a;){if(this.eof)return-1;this.readBlock()}return this.buffer[this.pos++]},getUint16:function(){var a=this.getByte(),b=this.getByte();return-1===a||-1===b?-1:(a<<8)+b},getInt32:function(){var a=this.getByte(),b=this.getByte(),c=this.getByte(),d=this.getByte();return(a<<24)+(b<<16)+(c<<8)+d},getBytes:function(a){var b,c=this.pos;if(a){for(this.ensureBuffer(c+a),b=c+a;!this.eof&&this.bufferLength<b;)this.readBlock();var d=this.bufferLength;b>d&&(b=d)}else{for(;!this.eof;)this.readBlock();b=this.bufferLength}return this.pos=b,this.buffer.subarray(c,b)},peekByte:function(){var a=this.getByte();return this.pos--,a},peekBytes:function(a){var b=this.getBytes(a);return this.pos-=b.length,b},makeSubStream:function(a,b,c){for(var d=a+b;this.bufferLength<=d&&!this.eof;)this.readBlock();return new Gc(this.buffer,a,b,c)},skip:function(a){a||(a=1),this.pos+=a},reset:function(){this.pos=0},getBaseStreams:function(){return this.str&&this.str.getBaseStreams?this.str.getBaseStreams():[]}},a}(),Jc=function(){function a(a){this.streams=a,Ic.call(this,/* maybeLength = */null)}return a.prototype=Object.create(Ic.prototype),a.prototype.readBlock=function(){var a=this.streams;if(0===a.length)return void(this.eof=!0);var b=a.shift(),c=b.getBytes(),d=this.bufferLength,e=d+c.length,f=this.ensureBuffer(e);f.set(c,d),this.bufferLength=e},a.prototype.getBaseStreams=function(){for(var a=[],b=0,c=this.streams.length;c>b;b++){var d=this.streams[b];d.getBaseStreams&&ia.appendToArray(a,d.getBaseStreams())}return a},a}(),Kc=function(){function a(a,b){this.str=a,this.dict=a.dict;var d=a.getByte(),e=a.getByte();(-1===d||-1===e)&&c("Invalid header in flate stream: "+d+", "+e),8!==(15&d)&&c("Unknown compression method in flate stream: "+d+", "+e),((d<<8)+e)%31!==0&&c("Bad FCHECK in flate stream: "+d+", "+e),32&e&&c("FDICT bit set in flate stream: "+d+", "+e),this.codeSize=0,this.codeBuf=0,Ic.call(this,b)}var b=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),e=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),f=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],g=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];return a.prototype=Object.create(Ic.prototype),a.prototype.getBits=function(a){for(var b,d=this.str,e=this.codeSize,f=this.codeBuf;a>e;)-1===(b=d.getByte())&&c("Bad encoding in flate stream"),f|=b<<e,e+=8;return b=f&(1<<a)-1,this.codeBuf=f>>a,this.codeSize=e-=a,b},a.prototype.getCode=function(a){for(var b,d=this.str,e=a[0],f=a[1],g=this.codeSize,h=this.codeBuf;f>g&&-1!==(b=d.getByte());)h|=b<<g,g+=8;var i=e[h&(1<<f)-1],j=i>>16,k=65535&i;return(1>j||j>g)&&c("Bad encoding in flate stream"),this.codeBuf=h>>j,this.codeSize=g-j,k},a.prototype.generateHuffmanTable=function(a){var b,c=a.length,d=0;for(b=0;c>b;++b)a[b]>d&&(d=a[b]);for(var e=1<<d,f=new Uint32Array(e),g=1,h=0,i=2;d>=g;++g,h<<=1,i<<=1)for(var j=0;c>j;++j)if(a[j]===g){
// bit-reverse the code
var k=0,l=h;for(b=0;g>b;++b)k=k<<1|1&l,l>>=1;
// fill the table entries
for(b=k;e>b;b+=i)f[b]=g<<16|j;++h}return[f,d]},a.prototype.readBlock=function(){var a,h,i=this.str,j=this.getBits(3);if(1&j&&(this.eof=!0),j>>=1,0!==j){var k,l;if(1===j)// compressed block, fixed codes
k=f,l=g;else if(2===j){// compressed block, dynamic codes
var m,n=this.getBits(5)+257,o=this.getBits(5)+1,p=this.getBits(4)+4,q=new Uint8Array(b.length);for(m=0;p>m;++m)q[b[m]]=this.getBits(3);var r=this.generateHuffmanTable(q);
// build the literal and distance code tables
h=0,m=0;for(var s,t,u,v=n+o,w=new Uint8Array(v);v>m;){var x=this.getCode(r);if(16===x)s=2,t=3,u=h;else if(17===x)s=3,t=3,u=h=0;else{if(18!==x){w[m++]=h=x;continue}s=7,t=11,u=h=0}for(var y=this.getBits(s)+t;y-->0;)w[m++]=u}k=this.generateHuffmanTable(w.subarray(0,n)),l=this.generateHuffmanTable(w.subarray(n,v))}else c("Unknown block type in flate stream");a=this.buffer;for(var z=a?a.length:0,A=this.bufferLength;;){var B=this.getCode(k);if(256>B)A+1>=z&&(a=this.ensureBuffer(A+1),z=a.length),a[A++]=B;else{if(256===B)return void(this.bufferLength=A);B-=257,B=d[B];var C=B>>16;C>0&&(C=this.getBits(C)),h=(65535&B)+C,B=this.getCode(l),B=e[B],C=B>>16,C>0&&(C=this.getBits(C));var D=(65535&B)+C;A+h>=z&&(a=this.ensureBuffer(A+h),z=a.length);for(var E=0;h>E;++E,++A)a[A]=a[A-D]}}}else{// uncompressed block
var F;-1===(F=i.getByte())&&c("Bad block header in flate stream");var G=F;-1===(F=i.getByte())&&c("Bad block header in flate stream"),G|=F<<8,-1===(F=i.getByte())&&c("Bad block header in flate stream");var H=F;-1===(F=i.getByte())&&c("Bad block header in flate stream"),H|=F<<8,H===(65535&~G)||0===G&&0===H||
// Ignoring error for bad "empty" block (see issue 1277)
c("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0;var I=this.bufferLength;a=this.ensureBuffer(I+G);var J=I+G;if(this.bufferLength=J,0===G)-1===i.peekByte()&&(this.eof=!0);else for(var K=I;J>K;++K){if(-1===(F=i.getByte())){this.eof=!0;break}a[K]=F}}},a}(),Lc=function(){function a(a,b,d){var e=this.predictor=d.get("Predictor")||1;if(1>=e)return a;2!==e&&(10>e||e>15)&&c("Unsupported predictor: "+e),2===e?this.readBlock=this.readBlockTiff:this.readBlock=this.readBlockPng,this.str=a,this.dict=a.dict;var f=this.colors=d.get("Colors")||1,g=this.bits=d.get("BitsPerComponent")||8,h=this.columns=d.get("Columns")||1;return this.pixBytes=f*g+7>>3,this.rowBytes=h*f*g+7>>3,Ic.call(this,b),this}return a.prototype=Object.create(Ic.prototype),a.prototype.readBlockTiff=function(){var a=this.rowBytes,b=this.bufferLength,c=this.ensureBuffer(b+a),d=this.bits,e=this.colors,f=this.str.getBytes(a);if(this.eof=!f.length,!this.eof){var g,h=0,i=0,j=0,k=0,l=b;if(1===d)for(g=0;a>g;++g){var m=f[g];h=h<<8|m,
// bitwise addition is exclusive or
// first shift inbuf and then add
c[l++]=255&(m^h>>e),
// truncate inbuf (assumes colors < 16)
h&=65535}else if(8===d){for(g=0;e>g;++g)c[l++]=f[g];for(;a>g;++g)c[l]=c[l-e]+f[g],l++}else{var n=new Uint8Array(e+1),o=(1<<d)-1,p=0,q=b,r=this.columns;for(g=0;r>g;++g)for(var s=0;e>s;++s)d>j&&(h=h<<8|255&f[p++],j+=8),n[s]=n[s]+(h>>j-d)&o,j-=d,i=i<<d|n[s],k+=d,k>=8&&(c[q++]=i>>k-8&255,k-=8);k>0&&(c[q++]=(i<<8-k)+(h&(1<<8-k)-1))}this.bufferLength+=a}},a.prototype.readBlockPng=function(){var a=this.rowBytes,b=this.pixBytes,d=this.str.getByte(),e=this.str.getBytes(a);if(this.eof=!e.length,!this.eof){var f=this.bufferLength,g=this.ensureBuffer(f+a),h=g.subarray(f-a,f);0===h.length&&(h=new Uint8Array(a));var i,j,k,l=f;switch(d){case 0:for(i=0;a>i;++i)g[l++]=e[i];break;case 1:for(i=0;b>i;++i)g[l++]=e[i];for(;a>i;++i)g[l]=g[l-b]+e[i]&255,l++;break;case 2:for(i=0;a>i;++i)g[l++]=h[i]+e[i]&255;break;case 3:for(i=0;b>i;++i)g[l++]=(h[i]>>1)+e[i];for(;a>i;++i)g[l]=(h[i]+g[l-b]>>1)+e[i]&255,l++;break;case 4:
// we need to save the up left pixels values. the simplest way
// is to create a new buffer
for(i=0;b>i;++i)j=h[i],k=e[i],g[l++]=j+k;for(;a>i;++i){j=h[i];var m=h[i-b],n=g[l-b],o=n+j-m,p=o-n;0>p&&(p=-p);var q=o-j;0>q&&(q=-q);var r=o-m;0>r&&(r=-r),k=e[i],q>=p&&r>=p?g[l++]=n+k:r>=q?g[l++]=j+k:g[l++]=m+k}break;default:c("Unsupported predictor: "+d)}this.bufferLength+=a}},a}(),Mc=function(){function a(a,b,c,d){for(
// Some images may contain 'junk' before the SOI (start-of-image) marker.
// Note: this seems to mainly affect inline images.
var e;-1!==(e=a.getByte());)if(255===e){// Find the first byte of the SOI marker (0xFFD8).
a.skip(-1);// Reset the stream position to the SOI.
break}this.stream=a,this.maybeLength=b,this.dict=c,Ic.call(this,b)}/**
   * Checks if the image can be decoded and displayed by the browser without any
   * further processing such as color space conversions.
   */
/**
   * Checks if the image can be decoded by the browser.
   */
return a.prototype=Object.create(Ic.prototype),Object.defineProperty(a.prototype,"bytes",{get:function(){
// If this.maybeLength is null, we'll get the entire stream.
return g(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),a.prototype.ensureBuffer=function(a){if(!this.bufferLength)try{var b=new _c;
// checking if values needs to be transformed before conversion
if(this.forceRGB&&this.dict&&A(this.dict.get("Decode"))){for(var d=this.dict.get("Decode"),e=this.dict.get("BitsPerComponent")||8,f=d.length,g=new Int32Array(f),h=!1,i=(1<<e)-1,j=0;f>j;j+=2)g[j]=256*(d[j+1]-d[j])|0,g[j+1]=d[j]*i|0,(256!==g[j]||0!==g[j+1])&&(h=!0);h&&(b.decodeTransform=g)}b.parse(this.bytes);var k=b.getData(this.drawWidth,this.drawHeight,this.forceRGB);this.buffer=k,this.bufferLength=k.length,this.eof=!0}catch(l){c("JPEG error: "+l)}},a.prototype.getBytes=function(a){return this.ensureBuffer(),this.buffer},a.prototype.getIR=function(){return PDFJS.createObjectURL(this.bytes,"image/jpeg")},a.prototype.isNativelySupported=function(a,b){var c=Ta.parse(this.dict.get("ColorSpace","CS"),a,b);return"DeviceGray"===c.name||"DeviceRGB"===c.name},a.prototype.isNativelyDecodable=function(a,b){var c=Ta.parse(this.dict.get("ColorSpace","CS"),a,b),d=c.numComps;return 1===d||3===d},a}(),Nc=function(){function a(a,b,c){this.stream=a,this.maybeLength=b,this.dict=c,Ic.call(this,b)}return a.prototype=Object.create(Ic.prototype),Object.defineProperty(a.prototype,"bytes",{get:function(){
// If this.maybeLength is null, we'll get the entire stream.
return g(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),a.prototype.ensureBuffer=function(a){if(!this.bufferLength){var b=new ad;b.parse(this.bytes);var c=b.width,d=b.height,e=b.componentsCount,f=b.tiles.length;if(1===f)this.buffer=b.tiles[0].items;else{for(var g=new Uint8Array(c*d*e),h=0;f>h;h++)for(var i=b.tiles[h],j=i.width,k=i.height,l=i.left,m=i.top,n=i.items,o=0,p=(c*m+l)*e,q=c*e,r=j*e,s=0;k>s;s++){var t=n.subarray(o,o+r);g.set(t,p),o+=r,p+=q}this.buffer=g}this.bufferLength=this.buffer.length,this.eof=!0}},a}(),Oc=function(){function a(a,b,c){this.stream=a,this.maybeLength=b,this.dict=c,Ic.call(this,b)}return a.prototype=Object.create(Ic.prototype),Object.defineProperty(a.prototype,"bytes",{get:function(){
// If this.maybeLength is null, we'll get the entire stream.
return g(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),a.prototype.ensureBuffer=function(a){if(!this.bufferLength){var c=new bd,d=[],e=this.dict.xref,f=e.fetchIfRef(this.dict.get("DecodeParms"));if(
// According to the PDF specification, DecodeParms can be either
// a dictionary, or an array whose elements are dictionaries.
A(f)&&(f.length>1&&b("JBIG2 - 'DecodeParms' array with multiple elements not supported."),f=e.fetchIfRef(f[0])),f&&f.has("JBIG2Globals")){var g=f.get("JBIG2Globals"),h=g.getBytes();d.push({data:h,start:0,end:h.length})}d.push({data:this.bytes,start:0,end:this.bytes.length});
// JBIG2 had black as 1 and white as 0, inverting the colors
for(var i=c.parseChunks(d),j=i.length,k=0;j>k;k++)i[k]^=255;this.buffer=i,this.bufferLength=j,this.eof=!0}},a}(),Pc=function(){function a(a,b,c){this.str=a,this.dict=a.dict,this.decrypt=c,this.nextChunk=null,this.initialized=!1,Ic.call(this,b)}var b=512;return a.prototype=Object.create(Ic.prototype),a.prototype.readBlock=function(){var a;if(this.initialized?a=this.nextChunk:(a=this.str.getBytes(b),this.initialized=!0),!a||0===a.length)return void(this.eof=!0);this.nextChunk=this.str.getBytes(b);var c=this.nextChunk&&this.nextChunk.length>0,d=this.decrypt;a=d(a,!c);var e,f=this.bufferLength,g=a.length,h=this.ensureBuffer(f+g);for(e=0;g>e;e++)h[f++]=a[e];this.bufferLength=f},a}(),Qc=function(){function a(a,b){this.str=a,this.dict=a.dict,this.input=new Uint8Array(5),
// Most streams increase in size when decoded, but Ascii85 streams
// typically shrink by ~20%.
b&&(b=.8*b),Ic.call(this,b)}return a.prototype=Object.create(Ic.prototype),a.prototype.readBlock=function(){for(var a=126,b=122,c=-1,d=this.str,e=d.getByte();Ac.isSpace(e);)e=d.getByte();if(e===c||e===a)return void(this.eof=!0);var f,g,h=this.bufferLength;
// special code for z
if(e===b){for(f=this.ensureBuffer(h+4),g=0;4>g;++g)f[h+g]=0;this.bufferLength+=4}else{var i=this.input;for(i[0]=e,g=1;5>g;++g){for(e=d.getByte();Ac.isSpace(e);)e=d.getByte();if(i[g]=e,e===c||e===a)break}
// partial ending;
if(f=this.ensureBuffer(h+g-1),this.bufferLength+=g-1,5>g){for(;5>g;++g)i[g]=117;this.eof=!0}var j=0;for(g=0;5>g;++g)j=85*j+(i[g]-33);for(g=3;g>=0;--g)f[h+g]=255&j,j>>=8}},a}(),Rc=function(){function a(a,b){this.str=a,this.dict=a.dict,this.firstDigit=-1,
// Most streams increase in size when decoded, but AsciiHex streams shrink
// by 50%.
b&&(b=.5*b),Ic.call(this,b)}return a.prototype=Object.create(Ic.prototype),a.prototype.readBlock=function(){var a=8e3,b=this.str.getBytes(a);if(!b.length)return void(this.eof=!0);for(var c=b.length+1>>1,d=this.ensureBuffer(this.bufferLength+c),e=this.bufferLength,f=this.firstDigit,g=0,h=b.length;h>g;g++){var i,j=b[g];if(j>=48&&57>=j)// '0'-'9'
i=15&j;else{if(!(j>=65&&70>=j||j>=97&&102>=j)){if(62===j){// '>'
this.eof=!0;break}// probably whitespace
continue}
// 'A'-'Z', 'a'-'z'
i=(15&j)+9}0>f?f=i:(d[e++]=f<<4|i,f=-1)}f>=0&&this.eof&&(
// incomplete byte
d[e++]=f<<4,f=-1),this.firstDigit=f,this.bufferLength=e},a}(),Sc=function(){function a(a,b){this.str=a,this.dict=a.dict,Ic.call(this,b)}return a.prototype=Object.create(Ic.prototype),a.prototype.readBlock=function(){
// The repeatHeader has following format. The first byte defines type of run
// and amount of bytes to repeat/copy: n = 0 through 127 - copy next n bytes
// (in addition to the second byte from the header), n = 129 through 255 -
// duplicate the second byte from the header (257 - n) times, n = 128 - end.
var a=this.str.getBytes(2);if(!a||a.length<2||128===a[0])return void(this.eof=!0);var b,c=this.bufferLength,d=a[0];if(128>d){if(
// copy n bytes
b=this.ensureBuffer(c+d+1),b[c++]=a[1],d>0){var e=this.str.getBytes(d);b.set(e,c),c+=d}}else{d=257-d;var f=a[1];b=this.ensureBuffer(c+d+1);for(var g=0;d>g;g++)b[c++]=f}this.bufferLength=c},a}(),Tc=function(){function b(a,b,c){this.str=a,this.dict=a.dict,c=c||va.empty,this.encoding=c.get("K")||0,this.eoline=c.get("EndOfLine")||!1,this.byteAlign=c.get("EncodedByteAlign")||!1,this.columns=c.get("Columns")||1728,this.rows=c.get("Rows")||0;var d=c.get("EndOfBlock");(null===d||void 0===d)&&(d=!0),this.eoblock=d,this.black=c.get("BlackIs1")||!1,this.codingLine=new Uint32Array(this.columns+1),this.refLine=new Uint32Array(this.columns+2),this.codingLine[0]=this.columns,this.codingPos=0,this.row=0,this.nextLine2D=this.encoding<0,this.inputBits=0,this.inputBuf=0,this.outputBits=0;for(var e;0===(e=this.lookBits(12));)this.eatBits(1);1===e&&this.eatBits(12),this.encoding>0&&(this.nextLine2D=!this.lookBits(1),this.eatBits(1)),Ic.call(this,b)}var c=-2,d=0,e=1,f=2,g=3,h=4,i=5,j=6,k=7,l=8,m=[[-1,-1],[-1,-1],// 000000x
[7,l],// 0000010
[7,k],// 0000011
[6,j],[6,j],// 000010x
[6,i],[6,i],// 000011x
[4,d],[4,d],// 0001xxx
[4,d],[4,d],[4,d],[4,d],[4,d],[4,d],[3,e],[3,e],// 001xxxx
[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,h],[3,h],// 010xxxx
[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,g],[3,g],// 011xxxx
[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[1,f],[1,f],// 1xxxxxx
[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f]],n=[[-1,-1],// 00000
[12,c],// 00001
[-1,-1],[-1,-1],// 0001x
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 001xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 010xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 011xx
[11,1792],[11,1792],// 1000x
[12,1984],// 10010
[12,2048],// 10011
[12,2112],// 10100
[12,2176],// 10101
[12,2240],// 10110
[12,2304],// 10111
[11,1856],[11,1856],// 1100x
[11,1920],[11,1920],// 1101x
[12,2368],// 11100
[12,2432],// 11101
[12,2496],// 11110
[12,2560]],o=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 0000000xx
[8,29],[8,29],// 00000010x
[8,30],[8,30],// 00000011x
[8,45],[8,45],// 00000100x
[8,46],[8,46],// 00000101x
[7,22],[7,22],[7,22],[7,22],// 0000011xx
[7,23],[7,23],[7,23],[7,23],// 0000100xx
[8,47],[8,47],// 00001010x
[8,48],[8,48],// 00001011x
[6,13],[6,13],[6,13],[6,13],// 000011xxx
[6,13],[6,13],[6,13],[6,13],[7,20],[7,20],[7,20],[7,20],// 0001000xx
[8,33],[8,33],// 00010010x
[8,34],[8,34],// 00010011x
[8,35],[8,35],// 00010100x
[8,36],[8,36],// 00010101x
[8,37],[8,37],// 00010110x
[8,38],[8,38],// 00010111x
[7,19],[7,19],[7,19],[7,19],// 0001100xx
[8,31],[8,31],// 00011010x
[8,32],[8,32],// 00011011x
[6,1],[6,1],[6,1],[6,1],// 000111xxx
[6,1],[6,1],[6,1],[6,1],[6,12],[6,12],[6,12],[6,12],// 001000xxx
[6,12],[6,12],[6,12],[6,12],[8,53],[8,53],// 00100100x
[8,54],[8,54],// 00100101x
[7,26],[7,26],[7,26],[7,26],// 0010011xx
[8,39],[8,39],// 00101000x
[8,40],[8,40],// 00101001x
[8,41],[8,41],// 00101010x
[8,42],[8,42],// 00101011x
[8,43],[8,43],// 00101100x
[8,44],[8,44],// 00101101x
[7,21],[7,21],[7,21],[7,21],// 0010111xx
[7,28],[7,28],[7,28],[7,28],// 0011000xx
[8,61],[8,61],// 00110010x
[8,62],[8,62],// 00110011x
[8,63],[8,63],// 00110100x
[8,0],[8,0],// 00110101x
[8,320],[8,320],// 00110110x
[8,384],[8,384],// 00110111x
[5,10],[5,10],[5,10],[5,10],// 00111xxxx
[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,11],[5,11],[5,11],[5,11],// 01000xxxx
[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[7,27],[7,27],[7,27],[7,27],// 0100100xx
[8,59],[8,59],// 01001010x
[8,60],[8,60],// 01001011x
[9,1472],// 010011000
[9,1536],// 010011001
[9,1600],// 010011010
[9,1728],// 010011011
[7,18],[7,18],[7,18],[7,18],// 0100111xx
[7,24],[7,24],[7,24],[7,24],// 0101000xx
[8,49],[8,49],// 01010010x
[8,50],[8,50],// 01010011x
[8,51],[8,51],// 01010100x
[8,52],[8,52],// 01010101x
[7,25],[7,25],[7,25],[7,25],// 0101011xx
[8,55],[8,55],// 01011000x
[8,56],[8,56],// 01011001x
[8,57],[8,57],// 01011010x
[8,58],[8,58],// 01011011x
[6,192],[6,192],[6,192],[6,192],// 010111xxx
[6,192],[6,192],[6,192],[6,192],[6,1664],[6,1664],[6,1664],[6,1664],// 011000xxx
[6,1664],[6,1664],[6,1664],[6,1664],[8,448],[8,448],// 01100100x
[8,512],[8,512],// 01100101x
[9,704],// 011001100
[9,768],// 011001101
[8,640],[8,640],// 01100111x
[8,576],[8,576],// 01101000x
[9,832],// 011010010
[9,896],// 011010011
[9,960],// 011010100
[9,1024],// 011010101
[9,1088],// 011010110
[9,1152],// 011010111
[9,1216],// 011011000
[9,1280],// 011011001
[9,1344],// 011011010
[9,1408],// 011011011
[7,256],[7,256],[7,256],[7,256],// 0110111xx
[4,2],[4,2],[4,2],[4,2],// 0111xxxxx
[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3],// 1000xxxxx
[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[5,128],[5,128],[5,128],[5,128],// 10010xxxx
[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,8],[5,8],[5,8],[5,8],// 10011xxxx
[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,9],[5,9],[5,9],[5,9],// 10100xxxx
[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[6,16],[6,16],[6,16],[6,16],// 101010xxx
[6,16],[6,16],[6,16],[6,16],[6,17],[6,17],[6,17],[6,17],// 101011xxx
[6,17],[6,17],[6,17],[6,17],[4,4],[4,4],[4,4],[4,4],// 1011xxxxx
[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,5],[4,5],[4,5],[4,5],// 1100xxxxx
[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[6,14],[6,14],[6,14],[6,14],// 110100xxx
[6,14],[6,14],[6,14],[6,14],[6,15],[6,15],[6,15],[6,15],// 110101xxx
[6,15],[6,15],[6,15],[6,15],[5,64],[5,64],[5,64],[5,64],// 11011xxxx
[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[4,6],[4,6],[4,6],[4,6],// 1110xxxxx
[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,7],[4,7],[4,7],[4,7],// 1111xxxxx
[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7]],p=[[-1,-1],[-1,-1],// 000000000000x
[12,c],[12,c],// 000000000001x
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000001xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000010xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000011xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000100xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000101xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000110xx
[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 00000000111xx
[11,1792],[11,1792],[11,1792],[11,1792],// 00000001000xx
[12,1984],[12,1984],// 000000010010x
[12,2048],[12,2048],// 000000010011x
[12,2112],[12,2112],// 000000010100x
[12,2176],[12,2176],// 000000010101x
[12,2240],[12,2240],// 000000010110x
[12,2304],[12,2304],// 000000010111x
[11,1856],[11,1856],[11,1856],[11,1856],// 00000001100xx
[11,1920],[11,1920],[11,1920],[11,1920],// 00000001101xx
[12,2368],[12,2368],// 000000011100x
[12,2432],[12,2432],// 000000011101x
[12,2496],[12,2496],// 000000011110x
[12,2560],[12,2560],// 000000011111x
[10,18],[10,18],[10,18],[10,18],// 0000001000xxx
[10,18],[10,18],[10,18],[10,18],[12,52],[12,52],// 000000100100x
[13,640],// 0000001001010
[13,704],// 0000001001011
[13,768],// 0000001001100
[13,832],// 0000001001101
[12,55],[12,55],// 000000100111x
[12,56],[12,56],// 000000101000x
[13,1280],// 0000001010010
[13,1344],// 0000001010011
[13,1408],// 0000001010100
[13,1472],// 0000001010101
[12,59],[12,59],// 000000101011x
[12,60],[12,60],// 000000101100x
[13,1536],// 0000001011010
[13,1600],// 0000001011011
[11,24],[11,24],[11,24],[11,24],// 00000010111xx
[11,25],[11,25],[11,25],[11,25],// 00000011000xx
[13,1664],// 0000001100100
[13,1728],// 0000001100101
[12,320],[12,320],// 000000110011x
[12,384],[12,384],// 000000110100x
[12,448],[12,448],// 000000110101x
[13,512],// 0000001101100
[13,576],// 0000001101101
[12,53],[12,53],// 000000110111x
[12,54],[12,54],// 000000111000x
[13,896],// 0000001110010
[13,960],// 0000001110011
[13,1024],// 0000001110100
[13,1088],// 0000001110101
[13,1152],// 0000001110110
[13,1216],// 0000001110111
[10,64],[10,64],[10,64],[10,64],// 0000001111xxx
[10,64],[10,64],[10,64],[10,64]],q=[[8,13],[8,13],[8,13],[8,13],// 00000100xxxx
[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[11,23],[11,23],// 00000101000x
[12,50],// 000001010010
[12,51],// 000001010011
[12,44],// 000001010100
[12,45],// 000001010101
[12,46],// 000001010110
[12,47],// 000001010111
[12,57],// 000001011000
[12,58],// 000001011001
[12,61],// 000001011010
[12,256],// 000001011011
[10,16],[10,16],[10,16],[10,16],// 0000010111xx
[10,17],[10,17],[10,17],[10,17],// 0000011000xx
[12,48],// 000001100100
[12,49],// 000001100101
[12,62],// 000001100110
[12,63],// 000001100111
[12,30],// 000001101000
[12,31],// 000001101001
[12,32],// 000001101010
[12,33],// 000001101011
[12,40],// 000001101100
[12,41],// 000001101101
[11,22],[11,22],// 00000110111x
[8,14],[8,14],[8,14],[8,14],// 00000111xxxx
[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[7,10],[7,10],[7,10],[7,10],// 0000100xxxxx
[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,11],[7,11],[7,11],[7,11],// 0000101xxxxx
[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[9,15],[9,15],[9,15],[9,15],// 000011000xxx
[9,15],[9,15],[9,15],[9,15],[12,128],// 000011001000
[12,192],// 000011001001
[12,26],// 000011001010
[12,27],// 000011001011
[12,28],// 000011001100
[12,29],// 000011001101
[11,19],[11,19],// 00001100111x
[11,20],[11,20],// 00001101000x
[12,34],// 000011010010
[12,35],// 000011010011
[12,36],// 000011010100
[12,37],// 000011010101
[12,38],// 000011010110
[12,39],// 000011010111
[11,21],[11,21],// 00001101100x
[12,42],// 000011011010
[12,43],// 000011011011
[10,0],[10,0],[10,0],[10,0],// 0000110111xx
[7,12],[7,12],[7,12],[7,12],// 0000111xxxxx
[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12]],r=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 0000xx
[6,9],// 000100
[6,8],// 000101
[5,7],[5,7],// 00011x
[4,6],[4,6],[4,6],[4,6],// 0010xx
[4,5],[4,5],[4,5],[4,5],// 0011xx
[3,1],[3,1],[3,1],[3,1],// 010xxx
[3,1],[3,1],[3,1],[3,1],[3,4],[3,4],[3,4],[3,4],// 011xxx
[3,4],[3,4],[3,4],[3,4],[2,3],[2,3],[2,3],[2,3],// 10xxxx
[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,2],[2,2],[2,2],[2,2],// 11xxxx
[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2]];
// This functions returns the code found from the table.
// The start and end parameters set the boundaries for searching the table.
// The limit parameter is optional. Function returns an array with three
// values. The first array element indicates whether a valid code is being
// returned. The second array element is the actual code. The third array
// element indicates whether EOF was reached.
return b.prototype=Object.create(Ic.prototype),b.prototype.readBlock=function(){for(;!this.eof;){var a=this.lookChar();this.ensureBuffer(this.bufferLength+1),this.buffer[this.bufferLength++]=a}},b.prototype.addPixels=function(b,c){var d=this.codingLine,e=this.codingPos;b>d[e]&&(b>this.columns&&(a("row is wrong length"),this.err=!0,b=this.columns),1&e^c&&++e,d[e]=b),this.codingPos=e},b.prototype.addPixelsNeg=function(b,c){var d=this.codingLine,e=this.codingPos;if(b>d[e])b>this.columns&&(a("row is wrong length"),this.err=!0,b=this.columns),1&e^c&&++e,d[e]=b;else if(b<d[e]){for(0>b&&(a("invalid code"),this.err=!0,b=0);e>0&&b<d[e-1];)--e;d[e]=b}this.codingPos=e},b.prototype.lookChar=function(){var b,c,m,n,o=this.refLine,p=this.codingLine,q=this.columns;if(0===this.outputBits){if(this.eof)return null;this.err=!1;var r,s,t;if(this.nextLine2D){for(n=0;p[n]<q;++n)o[n]=p[n];for(o[n++]=q,o[n]=q,p[0]=0,this.codingPos=0,b=0,c=0;p[this.codingPos]<q;)switch(r=this.getTwoDimCode()){case d:this.addPixels(o[b+1],c),o[b+1]<q&&(b+=2);break;case e:if(r=s=0,c){do r+=t=this.getBlackCode();while(t>=64);do s+=t=this.getWhiteCode();while(t>=64)}else{do r+=t=this.getWhiteCode();while(t>=64);do s+=t=this.getBlackCode();while(t>=64)}for(this.addPixels(p[this.codingPos]+r,c),p[this.codingPos]<q&&this.addPixels(p[this.codingPos]+s,1^c);o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case k:if(this.addPixels(o[b]+3,c),c^=1,p[this.codingPos]<q)for(++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case i:if(this.addPixels(o[b]+2,c),c^=1,p[this.codingPos]<q)for(++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case g:if(this.addPixels(o[b]+1,c),c^=1,p[this.codingPos]<q)for(++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case f:if(this.addPixels(o[b],c),c^=1,p[this.codingPos]<q)for(++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case l:if(this.addPixelsNeg(o[b]-3,c),c^=1,p[this.codingPos]<q)for(b>0?--b:++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case j:if(this.addPixelsNeg(o[b]-2,c),c^=1,p[this.codingPos]<q)for(b>0?--b:++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case h:if(this.addPixelsNeg(o[b]-1,c),c^=1,p[this.codingPos]<q)for(b>0?--b:++b;o[b]<=p[this.codingPos]&&o[b]<q;)b+=2;break;case xc:this.addPixels(q,0),this.eof=!0;break;default:a("bad 2d code"),this.addPixels(q,0),this.err=!0}}else for(p[0]=0,this.codingPos=0,c=0;p[this.codingPos]<q;){if(r=0,c){do r+=t=this.getBlackCode();while(t>=64)}else do r+=t=this.getWhiteCode();while(t>=64);this.addPixels(p[this.codingPos]+r,c),c^=1}var u=!1;if(this.byteAlign&&(this.inputBits&=-8),this.eoblock||this.row!==this.rows-1){if(r=this.lookBits(12),this.eoline)for(;r!==xc&&1!==r;)this.eatBits(1),r=this.lookBits(12);else for(;0===r;)this.eatBits(1),r=this.lookBits(12);1===r?(this.eatBits(12),u=!0):r===xc&&(this.eof=!0)}else this.eof=!0;if(!this.eof&&this.encoding>0&&(this.nextLine2D=!this.lookBits(1),this.eatBits(1)),this.eoblock&&u&&this.byteAlign){if(r=this.lookBits(12),1===r){if(this.eatBits(12),this.encoding>0&&(this.lookBits(1),this.eatBits(1)),this.encoding>=0)for(n=0;4>n;++n)r=this.lookBits(12),1!==r&&a("bad rtc code: "+r),this.eatBits(12),this.encoding>0&&(this.lookBits(1),this.eatBits(1));this.eof=!0}}else if(this.err&&this.eoline){for(;;){if(r=this.lookBits(13),r===xc)return this.eof=!0,null;if(r>>1===1)break;this.eatBits(1)}this.eatBits(12),this.encoding>0&&(this.eatBits(1),this.nextLine2D=!(1&r))}p[0]>0?this.outputBits=p[this.codingPos=0]:this.outputBits=p[this.codingPos=1],this.row++}var v;if(this.outputBits>=8)v=1&this.codingPos?0:255,this.outputBits-=8,0===this.outputBits&&p[this.codingPos]<q&&(this.codingPos++,this.outputBits=p[this.codingPos]-p[this.codingPos-1]);else{m=8,v=0;do this.outputBits>m?(v<<=m,1&this.codingPos||(v|=255>>8-m),this.outputBits-=m,m=0):(v<<=this.outputBits,1&this.codingPos||(v|=255>>8-this.outputBits),m-=this.outputBits,this.outputBits=0,p[this.codingPos]<q?(this.codingPos++,this.outputBits=p[this.codingPos]-p[this.codingPos-1]):m>0&&(v<<=m,m=0));while(m)}return this.black&&(v^=255),v},b.prototype.findTableCode=function(a,b,c,d){for(var e=d||0,f=a;b>=f;++f){var g=this.lookBits(f);if(g===xc)return[!0,1,!1];if(b>f&&(g<<=b-f),!e||g>=e){var h=c[g-e];if(h[0]===f)return this.eatBits(f),[!0,h[1],!0]}}return[!1,0,!1]},b.prototype.getTwoDimCode=function(){var b,c=0;if(this.eoblock){if(c=this.lookBits(7),b=m[c],b&&b[0]>0)return this.eatBits(b[0]),b[1]}else{var d=this.findTableCode(1,7,m);if(d[0]&&d[2])return d[1]}return a("Bad two dim code"),xc},b.prototype.getWhiteCode=function(){var b,c=0;if(this.eoblock){if(c=this.lookBits(12),c===xc)return 1;if(b=c>>5===0?n[c]:o[c>>3],b[0]>0)return this.eatBits(b[0]),b[1]}else{var d=this.findTableCode(1,9,o);if(d[0])return d[1];if(d=this.findTableCode(11,12,n),d[0])return d[1]}return a("bad white code"),this.eatBits(1),1},b.prototype.getBlackCode=function(){var b,c;if(this.eoblock){if(b=this.lookBits(13),b===xc)return 1;if(c=b>>7===0?p[b]:b>>9===0&&b>>7!==0?q[(b>>1)-64]:r[b>>7],c[0]>0)return this.eatBits(c[0]),c[1]}else{var d=this.findTableCode(2,6,r);if(d[0])return d[1];if(d=this.findTableCode(7,12,q,64),d[0])return d[1];if(d=this.findTableCode(10,13,p),d[0])return d[1]}return a("bad black code"),this.eatBits(1),1},b.prototype.lookBits=function(a){for(var b;this.inputBits<a;){if(-1===(b=this.str.getByte()))return 0===this.inputBits?xc:this.inputBuf<<a-this.inputBits&65535>>16-a;this.inputBuf=(this.inputBuf<<8)+b,this.inputBits+=8}return this.inputBuf>>this.inputBits-a&65535>>16-a},b.prototype.eatBits=function(a){(this.inputBits-=a)<0&&(this.inputBits=0)},b}(),Uc=function(){function a(a,b,c){this.str=a,this.dict=a.dict,this.cachedData=0,this.bitsCached=0;for(var d=4096,e={earlyChange:c,codeLength:9,nextCode:258,dictionaryValues:new Uint8Array(d),dictionaryLengths:new Uint16Array(d),dictionaryPrevCodes:new Uint16Array(d),currentSequence:new Uint8Array(d),currentSequenceLength:0},f=0;256>f;++f)e.dictionaryValues[f]=f,e.dictionaryLengths[f]=1;this.lzwState=e,Ic.call(this,b)}return a.prototype=Object.create(Ic.prototype),a.prototype.readBits=function(a){for(var b=this.bitsCached,c=this.cachedData;a>b;){var d=this.str.getByte();if(-1===d)return this.eof=!0,null;c=c<<8|d,b+=8}return this.bitsCached=b-=a,this.cachedData=c,this.lastCode=null,c>>>b&(1<<a)-1},a.prototype.readBlock=function(){var a,b,c,d=512,e=2*d,f=d,g=this.lzwState;if(g){var h=g.earlyChange,i=g.nextCode,j=g.dictionaryValues,k=g.dictionaryLengths,l=g.dictionaryPrevCodes,m=g.codeLength,n=g.prevCode,o=g.currentSequence,p=g.currentSequenceLength,q=0,r=this.bufferLength,s=this.ensureBuffer(this.bufferLength+e);for(a=0;d>a;a++){var t=this.readBits(m),u=p>0;if(256>t)o[0]=t,p=1;else{if(!(t>=258)){if(256===t){m=9,i=258,p=0;continue}this.eof=!0,delete this.lzwState;break}if(i>t)for(p=k[t],b=p-1,c=t;b>=0;b--)o[b]=j[c],c=l[c];else o[p++]=o[0]}if(u&&(l[i]=n,k[i]=k[n]+1,j[i]=o[0],i++,m=i+h&i+h-1?m:0|Math.min(Math.log(i+h)/.6931471805599453+1,12)),n=t,q+=p,q>e){do e+=f;while(q>e);s=this.ensureBuffer(this.bufferLength+e)}for(b=0;p>b;b++)s[r++]=o[b]}g.nextCode=i,g.codeLength=m,g.prevCode=n,g.currentSequenceLength=p,this.bufferLength=r}},a}(),Vc=function(){function a(){Gc.call(this,new Uint8Array(0))}return a.prototype=Gc.prototype,a}(),Wc=PDFJS.WorkerMessageHandler={setup:function(c){function d(a){var b=E(),c=function(){var a=f.ensureDoc("numPages"),c=f.ensureDoc("fingerprint"),e=f.ensureXRef("encrypt");Promise.all([a,c,e]).then(function(a){var c={numPages:a[0],fingerprint:a[1],encrypted:!!a[2]};b.resolve(c)},d)},d=function(a){b.reject(a)};return f.ensureDoc("checkHeader",[]).then(function(){f.ensureDoc("parseStartXRef",[]).then(function(){f.ensureDoc("parse",[a]).then(c,d)},d)},d),b.promise}function e(a){var d=E(),e=a.source,g=a.disableRange;if(e.data){try{f=new pa(e.data,e.password),d.resolve()}catch(h){d.reject(h)}return d.promise}if(e.chunkedViewerLoading){try{f=new qa(e,c),d.resolve()}catch(h){d.reject(h)}return d.promise}var i=new ka(e.url,{httpHeaders:e.httpHeaders,withCredentials:e.withCredentials}),j=[],k=i.requestFull({onHeadersReceived:function(){if(!g){var a=i.getRequestXhr(k);if("bytes"===a.getResponseHeader("Accept-Ranges")){var b=a.getResponseHeader("Content-Encoding")||"identity";if("identity"===b){var h=a.getResponseHeader("Content-Length");if(h=parseInt(h,10),206===a.status&&(
// Since Chrome 39, there exists a bug where cached responses are
// served with status code 206 for non-range requests.
// Content-Length does not specify the total size of the resource
// when the status code is 206 (see RFC 2616, section 14.16).
// In this case, extract the file size from the Content-Range
// header, which is defined to be "bytes start-end/length" for
// byte range requests.
// See https://github.com/mozilla/pdf.js/issues/5512 and
// https://code.google.com/p/chromium/issues/detail?id=442318
h=a.getResponseHeader("Content-Range"),h=h&&/bytes \d+-\d+\/(\d+)/.exec(h),h=h&&parseInt(h[1],10)),u(h)&&(e.length=h,!(2*na>=h))){i.isStreamingRequest(k)?
// We can continue fetching when progressive loading is enabled,
// and we don't need the autoFetch feature.
e.disableAutoFetch=!0:
// NOTE: by cancelling the full request, and then issuing range
// requests, there will be an issue for sites where you can only
// request the pdf once. However, if this is the case, then the
// server should not be returning that it can support range
// requests.
i.abortRequest(k);try{f=new qa(e,c),d.resolve(f)}catch(j){d.reject(j)}}}}}},onProgressiveData:e.disableStream?null:function(a){return f?void f.sendProgressiveData(a):void j.push(a)},onDone:function(a){if(!f){var c;if(null===a){
// TODO add some streaming manager, e.g. for unknown length files.
// The data was returned in the onProgressiveData, combining...
var g=0,h=0;j.forEach(function(a){g+=a.byteLength}),e.length&&g!==e.length&&b("reported HTTP length is different from actual");var i=new Uint8Array(g);j.forEach(function(a){i.set(new Uint8Array(a),h),h+=a.byteLength}),c=i.buffer}else c=a.chunk;
// the data is array, instantiating directly from it
try{f=new pa(c,e.password),d.resolve()}catch(k){d.reject(k)}}},onError:function(a){var b;404===a?(b=new ba('Missing PDF "'+e.url+'".'),c.send("MissingPDF",b)):(b=new ca("Unexpected server response ("+a+') while retrieving PDF "'+e.url+'".',a),c.send("UnexpectedResponse",b))},onProgress:function(a){c.send("DocProgress",{loaded:a.loaded,total:a.lengthComputable?a.total:e.length})}});return d.promise}var f;c.on("test",function(a){
// check if Uint8Array can be sent to worker
if(!(a instanceof Uint8Array))return void c.send("test",!1);
// making sure postMessage transfers are working
var b=255===a[0];c.postMessageTransfers=b;
// check if the response property is supported by xhr
var d=new XMLHttpRequest,e="response"in d;
// check if the property is actually implemented
try{d.responseType}catch(f){e=!1}return e?void c.send("test",{supportTypedArray:!0,supportTransfers:b}):void c.send("test",!1)}),c.on("GetDocRequest",function(a){var b=function(a){c.send("GetDoc",{pdfInfo:a})},g=function(a){a instanceof $?a.code===Z.NEED_PASSWORD?c.send("NeedPassword",a):a.code===Z.INCORRECT_PASSWORD&&c.send("IncorrectPassword",a):a instanceof aa?c.send("InvalidPDF",a):a instanceof ba?c.send("MissingPDF",a):a instanceof ca?c.send("UnexpectedResponse",a):c.send("UnknownError",new _(a.message,a.toString()))};PDFJS.maxImageSize=void 0===a.maxImageSize?-1:a.maxImageSize,PDFJS.disableFontFace=a.disableFontFace,PDFJS.disableCreateObjectURL=a.disableCreateObjectURL,PDFJS.verbosity=a.verbosity,PDFJS.cMapUrl=void 0===a.cMapUrl?null:a.cMapUrl,PDFJS.cMapPacked=a.cMapPacked===!0,e(a).then(function(){c.send("PDFManagerReady",null),f.onLoadedStream().then(function(a){c.send("DataLoaded",{length:a.bytes.byteLength})})}).then(function h(){d(!1).then(b,function(a){
// Try again with recoveryMode == true
// Try again with recoveryMode == true
// after password exception prepare to receive a new password
// to repeat loading
return a instanceof fa?(f.requestLoadedStream(),void f.onLoadedStream().then(function(){d(!0).then(b,g)})):(a instanceof $&&f.passwordChanged().then(h),void g(a))},g)},g)}),c.on("GetPage",function(a){return f.getPage(a.pageIndex).then(function(a){var b=f.ensure(a,"rotate"),c=f.ensure(a,"ref"),d=f.ensure(a,"view");return Promise.all([b,c,d]).then(function(a){return{rotate:a[0],ref:a[1],view:a[2]}})})}),c.on("GetPageIndex",function(a){var b=new wa(a.ref.num,a.ref.gen),c=f.pdfDocument.catalog;return c.getPageIndex(b)}),c.on("GetDestinations",function(a){return f.ensureCatalog("destinations")}),c.on("GetDestination",function(a){return f.ensureCatalog("getDestination",[a.id])}),c.on("GetAttachments",function(a){return f.ensureCatalog("attachments")}),c.on("GetJavaScript",function(a){return f.ensureCatalog("javaScript")}),c.on("GetOutline",function(a){return f.ensureCatalog("documentOutline")}),c.on("GetMetadata",function(a){return Promise.all([f.ensureDoc("documentInfo"),f.ensureCatalog("metadata")])}),c.on("GetData",function(a){return f.requestLoadedStream(),f.onLoadedStream().then(function(a){return a.bytes})}),c.on("GetStats",function(a){return f.pdfDocument.xref.stats}),c.on("UpdatePassword",function(a){f.updatePassword(a)}),c.on("GetAnnotations",function(a){return f.getPage(a.pageIndex).then(function(a){return f.ensure(a,"getAnnotationsData",[])})}),c.on("RenderPageRequest",function(b){f.getPage(b.pageIndex).then(function(d){var e=b.pageIndex+1,f=Date.now();
// Pre compile the pdf page and fetch the fonts/images.
d.getOperatorList(c,b.intent).then(function(b){a("page="+e+" - getOperatorList: time="+(Date.now()-f)+"ms, len="+b.fnArray.length)},function(a){var d,f="worker.js: while trying to getPage() and getOperatorList()";
// Turn the error into an obj that can be serialized
d="string"==typeof a?{message:a,stack:f}:"object"==typeof a?{message:a.message||a.toString(),stack:a.stack||f}:{message:"Unknown exception type: "+typeof a,stack:f},c.send("PageError",{pageNum:e,error:d,intent:b.intent})})})},this),c.on("GetTextContent",function(b){return f.getPage(b.pageIndex).then(function(c){var d=b.pageIndex+1,e=Date.now();return c.extractTextContent().then(function(b){return a("text indexing: page="+d+" - time="+(Date.now()-e)+"ms"),b})})}),c.on("Cleanup",function(a){return f.cleanup()}),c.on("Terminate",function(a){f.terminate()})}},Xc={},Yc={log:function(){var a=Array.prototype.slice.call(arguments);P.postMessage({action:"console_log",data:a})},error:function(){var a=Array.prototype.slice.call(arguments);throw P.postMessage({action:"console_error",data:a}),"pdf.js execution error"},time:function(a){Xc[a]=Date.now()},timeEnd:function(a){var b=Xc[a];b||c("Unknown timer name "+a),this.log("Timer:",a,Date.now()-b)}};
// Worker thread?
if("undefined"==typeof window){"console"in P||(P.console=Yc),
// Listen for unsupported features so we can pass them on to the main thread.
PDFJS.UnsupportedManager.listen(function(a){P.postMessage({action:"_unsupported_feature",data:a})});var Zc=new F("worker_processor",this);Wc.setup(Zc)}/* This class implements the QM Coder decoding as defined in
 *   JPEG 2000 Part I Final Committee Draft Version 1.0
 *   Annex C.3 Arithmetic decoding procedure
 * available at http://www.jpeg.org/public/fcd15444-1.pdf
 *
 * The arithmetic decoder is used in conjunction with context models to decode
 * JPEG2000 and JBIG2 streams.
 */
var $c=function(){
// C.3.5 Initialisation of the decoder (INITDEC)
function a(a,b,c){this.data=a,this.bp=b,this.dataEnd=c,this.chigh=a[b],this.clow=0,this.byteIn(),this.chigh=this.chigh<<7&65535|this.clow>>9&127,this.clow=this.clow<<7&65535,this.ct-=7,this.a=32768}
// Table C-2
var b=[{qe:22017,nmps:1,nlps:1,switchFlag:1},{qe:13313,nmps:2,nlps:6,switchFlag:0},{qe:6145,nmps:3,nlps:9,switchFlag:0},{qe:2753,nmps:4,nlps:12,switchFlag:0},{qe:1313,nmps:5,nlps:29,switchFlag:0},{qe:545,nmps:38,nlps:33,switchFlag:0},{qe:22017,nmps:7,nlps:6,switchFlag:1},{qe:21505,nmps:8,nlps:14,switchFlag:0},{qe:18433,nmps:9,nlps:14,switchFlag:0},{qe:14337,nmps:10,nlps:14,switchFlag:0},{qe:12289,nmps:11,nlps:17,switchFlag:0},{qe:9217,nmps:12,nlps:18,switchFlag:0},{qe:7169,nmps:13,nlps:20,switchFlag:0},{qe:5633,nmps:29,nlps:21,switchFlag:0},{qe:22017,nmps:15,nlps:14,switchFlag:1},{qe:21505,nmps:16,nlps:14,switchFlag:0},{qe:20737,nmps:17,nlps:15,switchFlag:0},{qe:18433,nmps:18,nlps:16,switchFlag:0},{qe:14337,nmps:19,nlps:17,switchFlag:0},{qe:13313,nmps:20,nlps:18,switchFlag:0},{qe:12289,nmps:21,nlps:19,switchFlag:0},{qe:10241,nmps:22,nlps:19,switchFlag:0},{qe:9217,nmps:23,nlps:20,switchFlag:0},{qe:8705,nmps:24,nlps:21,switchFlag:0},{qe:7169,nmps:25,nlps:22,switchFlag:0},{qe:6145,nmps:26,nlps:23,switchFlag:0},{qe:5633,nmps:27,nlps:24,switchFlag:0},{qe:5121,nmps:28,nlps:25,switchFlag:0},{qe:4609,nmps:29,nlps:26,switchFlag:0},{qe:4353,nmps:30,nlps:27,switchFlag:0},{qe:2753,nmps:31,nlps:28,switchFlag:0},{qe:2497,nmps:32,nlps:29,switchFlag:0},{qe:2209,nmps:33,nlps:30,switchFlag:0},{qe:1313,nmps:34,nlps:31,switchFlag:0},{qe:1089,nmps:35,nlps:32,switchFlag:0},{qe:673,nmps:36,nlps:33,switchFlag:0},{qe:545,nmps:37,nlps:34,switchFlag:0},{qe:321,nmps:38,nlps:35,switchFlag:0},{qe:273,nmps:39,nlps:36,switchFlag:0},{qe:133,nmps:40,nlps:37,switchFlag:0},{qe:73,nmps:41,nlps:38,switchFlag:0},{qe:37,nmps:42,nlps:39,switchFlag:0},{qe:21,nmps:43,nlps:40,switchFlag:0},{qe:9,nmps:44,nlps:41,switchFlag:0},{qe:5,nmps:45,nlps:42,switchFlag:0},{qe:1,nmps:45,nlps:43,switchFlag:0},{qe:22017,nmps:46,nlps:46,switchFlag:0}];return a.prototype={
// C.3.4 Compressed data input (BYTEIN)
byteIn:function(){var a=this.data,b=this.bp;if(255===a[b]){var c=a[b+1];c>143?(this.clow+=65280,this.ct=8):(b++,this.clow+=a[b]<<9,this.ct=7,this.bp=b)}else b++,this.clow+=b<this.dataEnd?a[b]<<8:65280,this.ct=8,this.bp=b;this.clow>65535&&(this.chigh+=this.clow>>16,this.clow&=65535)},
// C.3.2 Decoding a decision (DECODE)
readBit:function(a,c){
// contexts are packed into 1 byte:
// highest 7 bits carry cx.index, lowest bit carries cx.mps
var d,e=a[c]>>1,f=1&a[c],g=b[e],h=g.qe,i=this.a-h;if(this.chigh<h)
// exchangeLps
h>i?(i=h,d=f,e=g.nmps):(i=h,d=1^f,1===g.switchFlag&&(f=d),e=g.nlps);else{if(this.chigh-=h,0!==(32768&i))return this.a=i,f;
// exchangeMps
h>i?(d=1^f,1===g.switchFlag&&(f=d),e=g.nlps):(d=f,e=g.nmps)}
// C.3.3 renormD;
do 0===this.ct&&this.byteIn(),i<<=1,this.chigh=this.chigh<<1&65535|this.clow>>15&1,this.clow=this.clow<<1&65535,this.ct--;while(0===(32768&i));return this.a=i,a[c]=e<<1|f,d}},a}(),_c=function(){// sqrt(2) / 2
function a(){}function b(a,b){for(var c,d,e=0,f=[],g=16;g>0&&!a[g-1];)g--;f.push({children:[],index:0});var h,i=f[0];for(c=0;g>c;c++){for(d=0;d<a[c];d++){for(i=f.pop(),i.children[i.index]=b[e];i.index>0;)i=f.pop();for(i.index++,f.push(i);f.length<=c;)f.push(h={children:[],index:0}),i.children[i.index]=h.children,i=h;e++}g>c+1&&(
// p here points to last code
f.push(h={children:[],index:0}),i.children[i.index]=h.children,i=h)}return f[0].children}function c(a,b,c){return 64*((a.blocksPerLine+1)*b+c)}function d(a,b,d,e,f,g,i,j,k){function l(){if(H>0)return H--,G>>H&1;if(G=a[b++],255===G){var c=a[b++];if(c)throw"unexpected marker: "+(G<<8|c).toString(16)}return H=7,G>>>7}function m(a){for(var b=a;;){if(b=b[l()],"number"==typeof b)return b;if("object"!=typeof b)throw"invalid huffman sequence"}}function n(a){for(var b=0;a>0;)b=b<<1|l(),a--;return b}function o(a){if(1===a)return 1===l()?1:-1;var b=n(a);return b>=1<<a-1?b:b+(-1<<a)+1}function p(a,b){var c=m(a.huffmanTableDC),d=0===c?0:o(c);a.blockData[b]=a.pred+=d;for(var e=1;64>e;){var f=m(a.huffmanTableAC),g=15&f,i=f>>4;if(0!==g){e+=i;var j=h[e];a.blockData[b+j]=o(g),e++}else{if(15>i)break;e+=16}}}function q(a,b){var c=m(a.huffmanTableDC),d=0===c?0:o(c)<<k;a.blockData[b]=a.pred+=d}function r(a,b){a.blockData[b]|=l()<<k}function s(a,b){if(I>0)return void I--;for(var c=g,d=i;d>=c;){var e=m(a.huffmanTableAC),f=15&e,j=e>>4;if(0!==f){c+=j;var l=h[c];a.blockData[b+l]=o(f)*(1<<k),c++}else{if(15>j){I=n(j)+(1<<j)-1;break}c+=16}}}function t(a,b){for(var c,d,e=g,f=i,j=0;f>=e;){var p=h[e];switch(J){case 0:if(// initial state
d=m(a.huffmanTableAC),c=15&d,j=d>>4,0===c)15>j?(I=n(j)+(1<<j),J=4):(j=16,J=1);else{if(1!==c)throw"invalid ACn encoding";w=o(c),J=j?2:3}continue;case 1:// skipping r zero items
case 2:a.blockData[b+p]?a.blockData[b+p]+=l()<<k:(j--,0===j&&(J=2===J?3:0));break;case 3:// set value for a zero item
a.blockData[b+p]?a.blockData[b+p]+=l()<<k:(a.blockData[b+p]=w<<k,J=0);break;case 4:// eob
a.blockData[b+p]&&(a.blockData[b+p]+=l()<<k)}e++}4===J&&(I--,0===I&&(J=0))}function u(a,b,d,e,f){var g=d/D|0,h=d%D,i=g*a.v+e,j=h*a.h+f,k=c(a,i,j);b(a,k)}function v(a,b,d){var e=d/a.blocksPerLine|0,f=d%a.blocksPerLine,g=c(a,e,f);b(a,g)}var w,x,y,z,A,B,C,D=(d.precision,d.samplesPerLine,d.scanLines,d.mcusPerLine),E=d.progressive,F=(d.maxH,d.maxV,b),G=0,H=0,I=0,J=0,K=e.length;C=E?0===g?0===j?q:r:0===j?s:t:p;var L,M,N=0;M=1===K?e[0].blocksPerLine*e[0].blocksPerColumn:D*d.mcusPerColumn,f||(f=M);for(var O,P;M>N;){
// reset interval stuff
for(y=0;K>y;y++)e[y].pred=0;if(I=0,1===K)for(x=e[0],B=0;f>B;B++)v(x,C,N),N++;else for(B=0;f>B;B++){for(y=0;K>y;y++)for(x=e[y],O=x.h,P=x.v,z=0;P>z;z++)for(A=0;O>A;A++)u(x,C,N,z,A);N++}if(
// find marker
H=0,L=a[b]<<8|a[b+1],65280>=L)throw"marker was not found";if(!(L>=65488&&65495>=L))break;// RSTx
b+=2}return b-F}
// A port of poppler's IDCT method which in turn is taken from:
//   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
//   'Practical Fast 1-D DCT Algorithms with 11 Multiplications',
//   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
//   988-991.
function e(a,b,c){
// inverse DCT on rows
for(var d,e,f,g,h,q,r,s,t,u,v,w,x,y,z,A,B,C=a.quantizationTable,D=a.blockData,E=0;64>E;E+=8)
// gather block data
t=D[b+E],u=D[b+E+1],v=D[b+E+2],w=D[b+E+3],x=D[b+E+4],y=D[b+E+5],z=D[b+E+6],A=D[b+E+7],
// dequant p0
t*=C[E],
// check for all-zero AC coefficients
0!==(u|v|w|x|y|z|A)?(
// dequant p1 ... p7
u*=C[E+1],v*=C[E+2],w*=C[E+3],x*=C[E+4],y*=C[E+5],z*=C[E+6],A*=C[E+7],
// stage 4
d=o*t+128>>8,e=o*x+128>>8,f=v,g=z,h=p*(u-A)+128>>8,s=p*(u+A)+128>>8,q=w<<4,r=y<<4,
// stage 3
d=d+e+1>>1,e=d-e,B=f*n+g*m+128>>8,f=f*m-g*n+128>>8,g=B,h=h+r+1>>1,r=h-r,s=s+q+1>>1,q=s-q,
// stage 2
d=d+g+1>>1,g=d-g,e=e+f+1>>1,f=e-f,B=h*l+s*k+2048>>12,h=h*k-s*l+2048>>12,s=B,B=q*j+r*i+2048>>12,q=q*i-r*j+2048>>12,r=B,
// stage 1
c[E]=d+s,c[E+7]=d-s,c[E+1]=e+r,c[E+6]=e-r,c[E+2]=f+q,c[E+5]=f-q,c[E+3]=g+h,c[E+4]=g-h):(B=o*t+512>>10,c[E]=B,c[E+1]=B,c[E+2]=B,c[E+3]=B,c[E+4]=B,c[E+5]=B,c[E+6]=B,c[E+7]=B);
// inverse DCT on columns
for(var F=0;8>F;++F)t=c[F],u=c[F+8],v=c[F+16],w=c[F+24],x=c[F+32],y=c[F+40],z=c[F+48],A=c[F+56],
// check for all-zero AC coefficients
0!==(u|v|w|x|y|z|A)?(
// stage 4
d=o*t+2048>>12,e=o*x+2048>>12,f=v,g=z,h=p*(u-A)+2048>>12,s=p*(u+A)+2048>>12,q=w,r=y,
// stage 3
// Shift v0 by 128.5 << 5 here, so we don't need to shift p0...p7 when
// converting to UInt8 range later.
d=(d+e+1>>1)+4112,e=d-e,B=f*n+g*m+2048>>12,f=f*m-g*n+2048>>12,g=B,h=h+r+1>>1,r=h-r,s=s+q+1>>1,q=s-q,
// stage 2
d=d+g+1>>1,g=d-g,e=e+f+1>>1,f=e-f,B=h*l+s*k+2048>>12,h=h*k-s*l+2048>>12,s=B,B=q*j+r*i+2048>>12,q=q*i-r*j+2048>>12,r=B,
// stage 1
t=d+s,A=d-s,u=e+r,z=e-r,v=f+q,y=f-q,w=g+h,x=g-h,
// convert to 8-bit integers
t=16>t?0:t>=4080?255:t>>4,u=16>u?0:u>=4080?255:u>>4,v=16>v?0:v>=4080?255:v>>4,w=16>w?0:w>=4080?255:w>>4,x=16>x?0:x>=4080?255:x>>4,y=16>y?0:y>=4080?255:y>>4,z=16>z?0:z>=4080?255:z>>4,A=16>A?0:A>=4080?255:A>>4,
// store block data
D[b+F]=t,D[b+F+8]=u,D[b+F+16]=v,D[b+F+24]=w,D[b+F+32]=x,D[b+F+40]=y,D[b+F+48]=z,D[b+F+56]=A):(B=o*t+8192>>14,
// convert to 8 bit
B=-2040>B?0:B>=2024?255:B+2056>>4,D[b+F]=B,D[b+F+8]=B,D[b+F+16]=B,D[b+F+24]=B,D[b+F+32]=B,D[b+F+40]=B,D[b+F+48]=B,D[b+F+56]=B)}function f(a,b){for(var d=b.blocksPerLine,f=b.blocksPerColumn,g=new Int16Array(64),h=0;f>h;h++)for(var i=0;d>i;i++){var j=c(b,h,i);e(b,j,g)}return b.blockData}function g(a){return 0>=a?0:a>=255?255:a}var h=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),i=4017,j=799,k=3406,l=2276,m=1567,n=3784,o=5793,p=2896;return a.prototype={parse:function(a){function c(){var b=a[k]<<8|a[k+1];return k+=2,b}function e(){var b=c(),d=a.subarray(k,k+b-2);return k+=d.length,d}function g(a){for(var b=Math.ceil(a.samplesPerLine/8/a.maxH),c=Math.ceil(a.scanLines/8/a.maxV),d=0;d<a.components.length;d++){M=a.components[d];var e=Math.ceil(Math.ceil(a.samplesPerLine/8)*M.h/a.maxH),f=Math.ceil(Math.ceil(a.scanLines/8)*M.v/a.maxV),g=b*M.h,h=c*M.v,i=64*h*(g+1);M.blockData=new Int16Array(i),M.blocksPerLine=e,M.blocksPerColumn=f}a.mcusPerLine=b,a.mcusPerColumn=c}var i,j,k=0,l=(a.length,null),m=null,n=[],o=[],p=[],q=c();if(65496!==q)// SOI (Start of Image)
throw"SOI not found";for(q=c();65497!==q;){// EOI (End of image)
var r,s,t;switch(q){case 65504:// APP0 (Application Specific)
case 65505:// APP1
case 65506:// APP2
case 65507:// APP3
case 65508:// APP4
case 65509:// APP5
case 65510:// APP6
case 65511:// APP7
case 65512:// APP8
case 65513:// APP9
case 65514:// APP10
case 65515:// APP11
case 65516:// APP12
case 65517:// APP13
case 65518:// APP14
case 65519:// APP15
case 65534:// COM (Comment)
var u=e();65504===q&&74===u[0]&&70===u[1]&&73===u[2]&&70===u[3]&&0===u[4]&&(// 'JFIF\x00'
l={version:{major:u[5],minor:u[6]},densityUnits:u[7],xDensity:u[8]<<8|u[9],yDensity:u[10]<<8|u[11],thumbWidth:u[12],thumbHeight:u[13],thumbData:u.subarray(14,14+3*u[12]*u[13])}),
// TODO APP1 - Exif
65518===q&&65===u[0]&&100===u[1]&&111===u[2]&&98===u[3]&&101===u[4]&&(// 'Adobe'
m={version:u[5]<<8|u[6],flags0:u[7]<<8|u[8],flags1:u[9]<<8|u[10],transformCode:u[11]});break;case 65499:for(// DQT (Define Quantization Tables)
var v,w=c(),x=w+k-2;x>k;){var y=a[k++],z=new Uint16Array(64);if(y>>4===0)// 8 bit values
for(s=0;64>s;s++)v=h[s],z[v]=a[k++];else{if(y>>4!==1)throw"DQT: invalid table spec";//16 bit
for(s=0;64>s;s++)v=h[s],z[v]=c()}n[15&y]=z}break;case 65472:// SOF0 (Start of Frame, Baseline DCT)
case 65473:// SOF1 (Start of Frame, Extended DCT)
case 65474:// SOF2 (Start of Frame, Progressive DCT)
if(i)throw"Only single frame JPEGs supported";c(),// skip data length
i={},i.extended=65473===q,i.progressive=65474===q,i.precision=a[k++],i.scanLines=c(),i.samplesPerLine=c(),i.components=[],i.componentIds={};var A,B=a[k++],C=0,D=0;for(r=0;B>r;r++){A=a[k];var E=a[k+1]>>4,F=15&a[k+1];E>C&&(C=E),F>D&&(D=F);var G=a[k+2];t=i.components.push({h:E,v:F,quantizationTable:n[G]}),i.componentIds[A]=t-1,k+=3}i.maxH=C,i.maxV=D,g(i);break;case 65476:// DHT (Define Huffman Tables)
var H=c();for(r=2;H>r;){var I=a[k++],J=new Uint8Array(16),K=0;for(s=0;16>s;s++,k++)K+=J[s]=a[k];var L=new Uint8Array(K);for(s=0;K>s;s++,k++)L[s]=a[k];r+=17+K,(I>>4===0?p:o)[15&I]=b(J,L)}break;case 65501:// DRI (Define Restart Interval)
c(),// skip data length
j=c();break;case 65498:// SOS (Start of Scan)
var M,N=(c(),a[k++]),O=[];for(r=0;N>r;r++){var P=i.componentIds[a[k++]];M=i.components[P];var Q=a[k++];M.huffmanTableDC=p[Q>>4],M.huffmanTableAC=o[15&Q],O.push(M)}var R=a[k++],S=a[k++],T=a[k++],U=d(a,k,i,O,j,R,S,T>>4,15&T);k+=U;break;case 65535:// Fill bytes
255!==a[k]&&// Avoid skipping a valid marker.
k--;break;default:if(255===a[k-3]&&a[k-2]>=192&&a[k-2]<=254){
// could be incorrect encoding -- last 0xFF byte of the previous
// block was eaten by the encoder
k-=3;break}throw"unknown JPEG marker "+q.toString(16)}q=c()}for(this.width=i.samplesPerLine,this.height=i.scanLines,this.jfif=l,this.adobe=m,this.components=[],r=0;r<i.components.length;r++)M=i.components[r],this.components.push({output:f(i,M),scaleX:M.h/i.maxH,scaleY:M.v/i.maxV,blocksPerLine:M.blocksPerLine,blocksPerColumn:M.blocksPerColumn});this.numComponents=this.components.length},_getLinearizedBlockData:function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=this.width/a,o=this.height/b,p=0,q=this.components.length,r=a*b*q,s=new Uint8Array(r),t=new Uint32Array(a),u=4294967288;// used to clear the 3 LSBs
for(i=0;q>i;i++){
// precalculate the xScaleBlockOffset
for(c=this.components[i],d=c.scaleX*n,e=c.scaleY*o,p=i,m=c.output,f=c.blocksPerLine+1<<3,g=0;a>g;g++)j=0|g*d,t[g]=(j&u)<<3|7&j;
// linearize the blocks of the component
for(h=0;b>h;h++)for(j=0|h*e,l=f*(j&u)|(7&j)<<3,g=0;a>g;g++)s[p]=m[l+t[g]],p+=q}
// decodeTransform contains pairs of multiplier (-256..256) and additive
var v=this.decodeTransform;if(v)for(i=0;r>i;)for(j=0,k=0;q>j;j++,i++,k+=2)s[i]=(s[i]*v[k]>>8)+v[k+1];return s},_isColorConversionNeeded:function(){return this.adobe&&this.adobe.transformCode?!0:3===this.numComponents?!0:!1},_convertYccToRgb:function(a){for(var b,c,d,e=0,f=a.length;f>e;e+=3)b=a[e],c=a[e+1],d=a[e+2],a[e]=g(b-179.456+1.402*d),a[e+1]=g(b+135.459-.344*c-.714*d),a[e+2]=g(b-226.816+1.772*c);return a},_convertYcckToRgb:function(a){for(var b,c,d,e,f=0,h=0,i=a.length;i>h;h+=4){b=a[h],c=a[h+1],d=a[h+2],e=a[h+3];var j=-122.67195406894+c*(-660635669420364e-19*c+.000437130475926232*d-54080610064599e-18*b+.00048449797120281*e-.154362151871126)+d*(-.000957964378445773*d+.000817076911346625*b-.00477271405408747*e+1.53380253221734)+b*(.000961250184130688*b-.00266257332283933*e+.48357088451265)+e*(-.000336197177618394*e+.484791561490776),k=107.268039397724+c*(219927104525741e-19*c-.000640992018297945*d+.000659397001245577*b+.000426105652938837*e-.176491792462875)+d*(-.000778269941513683*d+.00130872261408275*b+.000770482631801132*e-.151051492775562)+b*(.00126935368114843*b-.00265090189010898*e+.25802910206845)+e*(-.000318913117588328*e-.213742400323665),l=-20.810012546947+c*(-.000570115196973677*c-263409051004589e-19*d+.0020741088115012*b-.00288260236853442*e+.814272968359295)+d*(-153496057440975e-19*d-.000132689043961446*b+.000560833691242812*e-.195152027534049)+b*(.00174418132927582*b-.00255243321439347*e+.116935020465145)+e*(-.000343531996510555*e+.24165260232407);a[f++]=g(j),a[f++]=g(k),a[f++]=g(l)}return a},_convertYcckToCmyk:function(a){for(var b,c,d,e=0,f=a.length;f>e;e+=4)b=a[e],c=a[e+1],d=a[e+2],a[e]=g(434.456-b-1.402*d),a[e+1]=g(119.541-b+.344*c+.714*d),a[e+2]=g(481.816-b-1.772*c);return a},_convertCmykToRgb:function(a){for(var b,c,d,e,f=0,g=-16581375,h=1/255/255,i=0,j=a.length;j>i;i+=4){b=a[i],c=a[i+1],d=a[i+2],e=a[i+3];var k=b*(-4.387332384609988*b+54.48615194189176*c+18.82290502165302*d+212.25662451639585*e-72734.4411664936)+c*(1.7149763477362134*c-5.6096736904047315*d-17.873870861415444*e-1401.7366389350734)+d*(-2.5217340131683033*d-21.248923337353073*e+4465.541406466231)-e*(21.86122147463605*e+48317.86113160301),l=b*(8.841041422036149*b+60.118027045597366*c+6.871425592049007*d+31.159100130055922*e-20220.756542821975)+c*(-15.310361306967817*c+17.575251261109482*d+131.35250912493976*e-48691.05921601825)+d*(4.444339102852739*d+9.8632861493405*e-6341.191035517494)-e*(20.737325471181034*e+47890.15695978492),m=b*(.8842522430003296*b+8.078677503112928*c+30.89978309703729*d-.23883238689178934*e-3616.812083916688)+c*(10.49593273432072*c+63.02378494754052*d+50.606957656360734*e-28620.90484698408)+d*(.03296041114873217*d+115.60384449646641*e-49363.43385999684)-e*(22.33816807309886*e+45932.16563550634);a[f++]=k>=0?255:g>=k?0:255+k*h|0,a[f++]=l>=0?255:g>=l?0:255+l*h|0,a[f++]=m>=0?255:g>=m?0:255+m*h|0}return a},getData:function(a,b,c){if(this.numComponents>4)throw"Unsupported color mode";
// type of data: Uint8Array(width * height * numComponents)
var d=this._getLinearizedBlockData(a,b);if(3===this.numComponents)return this._convertYccToRgb(d);if(4===this.numComponents){if(this._isColorConversionNeeded())return c?this._convertYcckToRgb(d):this._convertYcckToCmyk(d);if(c)return this._convertCmykToRgb(d)}return d}},a}(),ad=function(){function c(){this.failOnCorruptedImage=!1}function d(a,b){
// Section B.2 Component mapping
a.x0=Math.ceil(b.XOsiz/a.XRsiz),a.x1=Math.ceil(b.Xsiz/a.XRsiz),a.y0=Math.ceil(b.YOsiz/a.YRsiz),a.y1=Math.ceil(b.Ysiz/a.YRsiz),a.width=a.x1-a.x0,a.height=a.y1-a.y0}function e(a,b){for(var c,d=a.SIZ,e=[],f=Math.ceil((d.Xsiz-d.XTOsiz)/d.XTsiz),g=Math.ceil((d.Ysiz-d.YTOsiz)/d.YTsiz),h=0;g>h;h++)for(var i=0;f>i;i++)c={},c.tx0=Math.max(d.XTOsiz+i*d.XTsiz,d.XOsiz),c.ty0=Math.max(d.YTOsiz+h*d.YTsiz,d.YOsiz),c.tx1=Math.min(d.XTOsiz+(i+1)*d.XTsiz,d.Xsiz),c.ty1=Math.min(d.YTOsiz+(h+1)*d.YTsiz,d.Ysiz),c.width=c.tx1-c.tx0,c.height=c.ty1-c.ty0,c.components=[],e.push(c);a.tiles=e;for(var j=d.Csiz,k=0,l=j;l>k;k++)for(var m=b[k],n=0,o=e.length;o>n;n++){var p={};c=e[n],p.tcx0=Math.ceil(c.tx0/m.XRsiz),p.tcy0=Math.ceil(c.ty0/m.YRsiz),p.tcx1=Math.ceil(c.tx1/m.XRsiz),p.tcy1=Math.ceil(c.ty1/m.YRsiz),p.width=p.tcx1-p.tcx0,p.height=p.tcy1-p.tcy0,c.components[k]=p}}function f(a,b,c){var d=b.codingStyleParameters,e={};
// calculate codeblock size as described in section B.7
return d.entropyCoderWithCustomPrecincts?(e.PPx=d.precinctsSizes[c].PPx,e.PPy=d.precinctsSizes[c].PPy):(e.PPx=15,e.PPy=15),e.xcb_=c>0?Math.min(d.xcb,e.PPx-1):Math.min(d.xcb,e.PPx),e.ycb_=c>0?Math.min(d.ycb,e.PPy-1):Math.min(d.ycb,e.PPy),e}function g(a,b,c){
// Section B.6 Division resolution to precincts
var d=1<<c.PPx,e=1<<c.PPy,f=0===b.resLevel,g=1<<c.PPx+(f?0:-1),h=1<<c.PPy+(f?0:-1),i=b.trx1>b.trx0?Math.ceil(b.trx1/d)-Math.floor(b.trx0/d):0,j=b.try1>b.try0?Math.ceil(b.try1/e)-Math.floor(b.try0/e):0,k=i*j;b.precinctParameters={precinctWidth:d,precinctHeight:e,numprecinctswide:i,numprecinctshigh:j,numprecincts:k,precinctWidthInSubband:g,precinctHeightInSubband:h}}function h(a,b,c){
// Section B.7 Division sub-band into code-blocks
var d,e,f,g,h=c.xcb_,i=c.ycb_,j=1<<h,k=1<<i,l=b.tbx0>>h,m=b.tby0>>i,n=b.tbx1+j-1>>h,o=b.tby1+k-1>>i,p=b.resolution.precinctParameters,q=[],r=[];for(e=m;o>e;e++)for(d=l;n>d;d++){f={cbx:d,cby:e,tbx0:j*d,tby0:k*e,tbx1:j*(d+1),tby1:k*(e+1)},f.tbx0_=Math.max(b.tbx0,f.tbx0),f.tby0_=Math.max(b.tby0,f.tby0),f.tbx1_=Math.min(b.tbx1,f.tbx1),f.tby1_=Math.min(b.tby1,f.tby1);
// Calculate precinct number for this codeblock, codeblock position
// should be relative to its subband, use actual dimension and position
// See comment about codeblock group width and height
var s=Math.floor((f.tbx0_-b.tbx0)/p.precinctWidthInSubband),t=Math.floor((f.tby0_-b.tby0)/p.precinctHeightInSubband);if(g=s+t*p.numprecinctswide,f.precinctNumber=g,f.subbandType=b.type,f.Lblock=3,!(f.tbx1_<=f.tbx0_||f.tby1_<=f.tby0_)){q.push(f);
// building precinct for the sub-band
var u=r[g];void 0!==u?(d<u.cbxMin?u.cbxMin=d:d>u.cbxMax&&(u.cbxMax=d),e<u.cbyMin?u.cbxMin=e:e>u.cbyMax&&(u.cbyMax=e)):r[g]=u={cbxMin:d,cbyMin:e,cbxMax:d,cbyMax:e},f.precinct=u}}b.codeblockParameters={codeblockWidth:h,codeblockHeight:i,numcodeblockwide:n-l+1,numcodeblockhigh:o-m+1},b.codeblocks=q,b.precincts=r}function i(a,b,c){
// sub-bands already ordered in 'LL', 'HL', 'LH', and 'HH' sequence
for(var d=[],e=a.subbands,f=0,g=e.length;g>f;f++)for(var h=e[f],i=h.codeblocks,j=0,k=i.length;k>j;j++){var l=i[j];l.precinctNumber===b&&d.push(l)}return{layerNumber:c,codeblocks:d}}function j(a){for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=0,h=0;f>h;h++)g=Math.max(g,d.components[h].codingStyleParameters.decompositionLevelsCount);var j=0,k=0,l=0,m=0;this.nextPacket=function(){
// Section B.12.1.1 Layer-resolution-component-position
for(;e>j;j++){for(;g>=k;k++){for(;f>l;l++){var a=d.components[l];if(!(k>a.codingStyleParameters.decompositionLevelsCount)){for(var b=a.resolutions[k],c=b.precinctParameters.numprecincts;c>m;){var h=i(b,m,j);return m++,h}m=0}}l=0}k=0}throw new Error("JPX Error: Out of packets")}}function l(a){for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=0,h=0;f>h;h++)g=Math.max(g,d.components[h].codingStyleParameters.decompositionLevelsCount);var j=0,k=0,l=0,m=0;this.nextPacket=function(){
// Section B.12.1.2 Resolution-layer-component-position
for(;g>=j;j++){for(;e>k;k++){for(;f>l;l++){var a=d.components[l];if(!(j>a.codingStyleParameters.decompositionLevelsCount)){for(var b=a.resolutions[j],c=b.precinctParameters.numprecincts;c>m;){var h=i(b,m,k);return m++,h}m=0}}l=0}k=0}throw new Error("JPX Error: Out of packets")}}function o(a){var b,c,d,e,f=a.SIZ,g=a.currentTile.index,h=a.tiles[g],j=h.codingStyleDefaultParameters.layersCount,k=f.Csiz,l=0;for(d=0;k>d;d++){var m=h.components[d];l=Math.max(l,m.codingStyleParameters.decompositionLevelsCount)}var n=new Int32Array(l+1);for(c=0;l>=c;++c){var o=0;for(d=0;k>d;++d){var p=h.components[d].resolutions;c<p.length&&(o=Math.max(o,p[c].precinctParameters.numprecincts))}n[c]=o}b=0,c=0,d=0,e=0,this.nextPacket=function(){
// Section B.12.1.3 Resolution-position-component-layer
for(;l>=c;c++){for(;e<n[c];e++){for(;k>d;d++){var a=h.components[d];if(!(c>a.codingStyleParameters.decompositionLevelsCount)){var f=a.resolutions[c],g=f.precinctParameters.numprecincts;if(!(e>=g)){for(;j>b;){var m=i(f,e,b);return b++,m}b=0}}}d=0}e=0}throw new Error("JPX Error: Out of packets")}}function p(a){var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=s(d),h=g,j=0,k=0,l=0,m=0,n=0;this.nextPacket=function(){
// Section B.12.1.4 Position-component-resolution-layer
for(;n<h.maxNumHigh;n++){for(;m<h.maxNumWide;m++){for(;f>l;l++){for(var a=d.components[l],b=a.codingStyleParameters.decompositionLevelsCount;b>=k;k++){var c=a.resolutions[k],o=g.components[l].resolutions[k],p=r(m,n,o,h,c);if(null!==p){for(;e>j;){var q=i(c,p,j);return j++,q}j=0}}k=0}l=0}m=0}throw new Error("JPX Error: Out of packets")}}function q(a){var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=s(d),h=0,j=0,k=0,l=0,m=0;this.nextPacket=function(){
// Section B.12.1.5 Component-position-resolution-layer
for(;f>k;++k){for(var a=d.components[k],b=g.components[k],c=a.codingStyleParameters.decompositionLevelsCount;m<b.maxNumHigh;m++){for(;l<b.maxNumWide;l++){for(;c>=j;j++){var n=a.resolutions[j],o=b.resolutions[j],p=r(l,m,o,b,n);if(null!==p){for(;e>h;){var q=i(n,p,h);return h++,q}h=0}}j=0}l=0}m=0}throw new Error("JPX Error: Out of packets")}}function r(a,b,c,d,e){var f=a*d.minWidth,g=b*d.minHeight;if(f%c.width!==0||g%c.height!==0)return null;var h=g/c.width*e.precinctParameters.numprecinctswide;return f/c.height+h}function s(a){for(var b=a.components.length,c=Number.MAX_VALUE,d=Number.MAX_VALUE,e=0,f=0,g=new Array(b),h=0;b>h;h++){for(var i=a.components[h],j=i.codingStyleParameters.decompositionLevelsCount,k=new Array(j+1),l=Number.MAX_VALUE,m=Number.MAX_VALUE,n=0,o=0,p=1,q=j;q>=0;--q){var r=i.resolutions[q],s=p*r.precinctParameters.precinctWidth,t=p*r.precinctParameters.precinctHeight;l=Math.min(l,s),m=Math.min(m,t),n=Math.max(n,r.precinctParameters.numprecinctswide),o=Math.max(o,r.precinctParameters.numprecinctshigh),k[q]={width:s,height:t},p<<=1}c=Math.min(c,l),d=Math.min(d,m),e=Math.max(e,n),f=Math.max(f,o),g[h]={resolutions:k,minWidth:l,minHeight:m,maxNumWide:n,maxNumHigh:o}}return{components:g,minWidth:c,minHeight:d,maxNumWide:e,maxNumHigh:f}}function t(a){
// Creating resolutions and sub-bands for each component
for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=b.Csiz,i=0;e>i;i++){for(var k=d.components[i],m=k.codingStyleParameters.decompositionLevelsCount,n=[],r=[],s=0;m>=s;s++){var t=f(a,k,s),u={},v=1<<m-s;u.trx0=Math.ceil(k.tcx0/v),u.try0=Math.ceil(k.tcy0/v),u.trx1=Math.ceil(k.tcx1/v),u.try1=Math.ceil(k.tcy1/v),u.resLevel=s,g(a,u,t),n.push(u);var w;if(0===s)
// one sub-band (LL) with last decomposition
w={},w.type="LL",w.tbx0=Math.ceil(k.tcx0/v),w.tby0=Math.ceil(k.tcy0/v),w.tbx1=Math.ceil(k.tcx1/v),w.tby1=Math.ceil(k.tcy1/v),w.resolution=u,h(a,w,t),r.push(w),u.subbands=[w];else{var x=1<<m-s+1,y=[];
// three sub-bands (HL, LH and HH) with rest of decompositions
w={},w.type="HL",w.tbx0=Math.ceil(k.tcx0/x-.5),w.tby0=Math.ceil(k.tcy0/x),w.tbx1=Math.ceil(k.tcx1/x-.5),w.tby1=Math.ceil(k.tcy1/x),w.resolution=u,h(a,w,t),r.push(w),y.push(w),w={},w.type="LH",w.tbx0=Math.ceil(k.tcx0/x),w.tby0=Math.ceil(k.tcy0/x-.5),w.tbx1=Math.ceil(k.tcx1/x),w.tby1=Math.ceil(k.tcy1/x-.5),w.resolution=u,h(a,w,t),r.push(w),y.push(w),w={},w.type="HH",w.tbx0=Math.ceil(k.tcx0/x-.5),w.tby0=Math.ceil(k.tcy0/x-.5),w.tbx1=Math.ceil(k.tcx1/x-.5),w.tby1=Math.ceil(k.tcy1/x-.5),w.resolution=u,h(a,w,t),r.push(w),y.push(w),u.subbands=y}}k.resolutions=n,k.subbands=r}
// Generate the packets sequence
var z=d.codingStyleDefaultParameters.progressionOrder;switch(z){case 0:d.packetsIterator=new j(a);break;case 1:d.packetsIterator=new l(a);break;case 2:d.packetsIterator=new o(a);break;case 3:d.packetsIterator=new p(a);break;case 4:d.packetsIterator=new q(a);break;default:throw new Error("JPX Error: Unsupported progression order "+z)}}function u(a,b,c,d){function e(a){for(;a>m;){var d=b[c+l];l++,n?(j=j<<7|d,m+=7,n=!1):(j=j<<8|d,m+=8),255===d&&(n=!0)}return m-=a,j>>>m&(1<<a)-1}function f(a){return 255===b[c+l-1]&&b[c+l]===a?(g(1),!0):255===b[c+l]&&b[c+l+1]===a?(g(2),!0):!1}function g(a){l+=a}function h(){m=0,n&&(l++,n=!1)}function i(){if(0===e(1))return 1;if(0===e(1))return 2;var a=e(2);return 3>a?a+3:(a=e(5),31>a?a+6:(a=e(7),a+37))}for(var j,l=0,m=0,n=!1,o=a.currentTile.index,p=a.tiles[o],q=a.COD.sopMarkerUsed,r=a.COD.ephMarkerUsed,s=p.packetsIterator;d>l;){h(),q&&f(145)&&
// Skip also marker segment length and packet sequence ID
g(4);var t=s.nextPacket();if(e(1)){for(var u,v=t.layerNumber,w=[],x=0,y=t.codeblocks.length;y>x;x++){u=t.codeblocks[x];var z,C=u.precinct,D=u.cbx-C.cbxMin,E=u.cby-C.cbyMin,F=!1,G=!1;if(void 0!==u.included)F=!!e(1);else{
// reading inclusion tree
C=u.precinct;var H,I;if(void 0!==C.inclusionTree)H=C.inclusionTree;else{
// building inclusion and zero bit-planes trees
var J=C.cbxMax-C.cbxMin+1,K=C.cbyMax-C.cbyMin+1;H=new B(J,K,v),I=new A(J,K),C.inclusionTree=H,C.zeroBitPlanesTree=I}if(H.reset(D,E,v))for(;;){if(!e(1)){H.incrementValue(v);break}if(z=!H.nextLevel()){u.included=!0,F=G=!0;break}}}if(F){if(G){for(I=C.zeroBitPlanesTree,I.reset(D,E);;)if(e(1)){if(z=!I.nextLevel())break}else I.incrementValue();u.zeroBitPlanes=I.value}for(var L=i();e(1);)u.Lblock++;var M=k(L),N=(1<<M>L?M-1:M)+u.Lblock,O=e(N);w.push({codeblock:u,codingpasses:L,dataLength:O})}}for(h(),r&&f(146);w.length>0;){var P=w.shift();u=P.codeblock,void 0===u.data&&(u.data=[]),u.data.push({data:b,start:c+l,end:c+l+P.dataLength,codingpasses:P.codingpasses}),l+=P.dataLength}}}return l}function v(a,b,c,d,e,f,g,h){for(var i=d.tbx0,j=d.tby0,k=d.tbx1-d.tbx0,l=d.codeblocks,m="H"===d.type.charAt(0)?1:0,n="H"===d.type.charAt(1)?b:0,o=0,p=l.length;p>o;++o){var q=l[o],r=q.tbx1_-q.tbx0_,s=q.tby1_-q.tby0_;if(0!==r&&0!==s&&void 0!==q.data){var t,u;t=new C(r,s,q.subbandType,q.zeroBitPlanes,f),u=2;// first bit plane starts from cleanup
// collect data
var v,w,x,y=q.data,z=0,A=0;for(v=0,w=y.length;w>v;v++)x=y[v],z+=x.end-x.start,A+=x.codingpasses;var B=new Uint8Array(z),D=0;for(v=0,w=y.length;w>v;v++){x=y[v];var E=x.data.subarray(x.start,x.end);B.set(E,D),D+=E.length}
// decoding the item
var F=new $c(B,0,z);for(t.setDecoder(F),v=0;A>v;v++){switch(u){case 0:t.runSignificancePropogationPass();break;case 1:t.runMagnitudeRefinementPass();break;case 2:t.runCleanupPass(),h&&t.checkSegmentationSymbol()}u=(u+1)%3}var G,H,I,J=q.tbx0_-i+(q.tby0_-j)*k,K=t.coefficentsSign,L=t.coefficentsMagnitude,M=t.bitsDecoded,N=g?0:.5;D=0;
// Do the interleaving of Section F.3.3 here, so we do not need
// to copy later. LL level is not interleaved, just copied.
var O="LL"!==d.type;for(v=0;s>v;v++){var P=J/k|0,Q=2*P*(b-k)+m+n;for(G=0;r>G;G++){if(H=L[D],0!==H){H=(H+N)*e,0!==K[D]&&(H=-H),I=M[D];var R=O?Q+(J<<1):J;g&&I>=f?a[R]=H:a[R]=H*(1<<f-I)}J++,D++}J+=k-r}}}}function w(a,b,c){for(var d=b.components[c],e=d.codingStyleParameters,f=d.quantizationParameters,g=e.decompositionLevelsCount,h=f.SPqcds,i=f.scalarExpounded,j=f.guardBits,k=e.segmentationSymbolUsed,l=a.components[c].precision,m=e.reversibleTransformation,n=m?new F:new E,o=[],p=0,q=0;g>=q;q++){for(var r=d.resolutions[q],s=r.trx1-r.trx0,t=r.try1-r.try0,u=new Float32Array(s*t),w=0,x=r.subbands.length;x>w;w++){var y,A;i?(y=h[p].mu,A=h[p].epsilon,p++):(
// formula E-5
y=h[0].mu,A=h[0].epsilon+(q>0?1-q:0));var B=r.subbands[w],C=z[B.type],D=m?1:Math.pow(2,l+C-A)*(1+y/2048),G=j+A-1;
// In the first resolution level, copyCoefficients will fill the
// whole array with coefficients. In the succeding passes,
// copyCoefficients will consecutively fill in the values that belong
// to the interleaved positions of the HL, LH, and HH coefficients.
// The LL coefficients will then be interleaved in Transform.iterate().
v(u,s,t,B,D,G,m,k)}o.push({width:s,height:t,items:u})}var H=n.calculate(o,d.tcx0,d.tcy0);return{left:d.tcx0,top:d.tcy0,width:H.width,height:H.height,items:H.items}}function x(a){for(var b=a.SIZ,c=a.components,d=b.Csiz,e=[],f=0,g=a.tiles.length;g>f;f++){var h,i=a.tiles[f],j=[];for(h=0;d>h;h++)j[h]=w(a,i,h);var k,l,m,n,o,p,q,r,s,t,u,v,x,y,z,A=j[0],B=new Uint8Array(A.items.length*d),C={left:A.left,top:A.top,width:A.width,height:A.height,items:B},D=0;if(i.codingStyleDefaultParameters.multipleComponentTransform){var E=4===d,F=j[0].items,G=j[1].items,H=j[2].items,I=E?j[3].items:null;
// HACK: The multiple component transform formulas below assume that
// all components have the same precision. With this in mind, we
// compute shift and offset only once.
k=c[0].precision-8,l=(128<<k)+.5,m=255*(1<<k),o=.5*m,n=-o;var J=i.components[0],K=d-3;if(q=F.length,J.codingStyleParameters.reversibleTransformation)
// inverse reversible multiple component transform
for(p=0;q>p;p++,D+=K)r=F[p]+l,s=G[p],t=H[p],v=r-(t+s>>2),u=v+t,x=v+s,B[D++]=0>=u?0:u>=m?255:u>>k,B[D++]=0>=v?0:v>=m?255:v>>k,B[D++]=0>=x?0:x>=m?255:x>>k;else
// inverse irreversible multiple component transform
for(p=0;q>p;p++,D+=K)r=F[p]+l,s=G[p],t=H[p],u=r+1.402*t,v=r-.34413*s-.71414*t,x=r+1.772*s,B[D++]=0>=u?0:u>=m?255:u>>k,B[D++]=0>=v?0:v>=m?255:v>>k,B[D++]=0>=x?0:x>=m?255:x>>k;if(E)for(p=0,D=3;q>p;p++,D+=4)y=I[p],B[D]=n>=y?0:y>=o?255:y+l>>k}else// no multi-component transform
for(h=0;d>h;h++){var L=j[h].items;for(k=c[h].precision-8,l=(128<<k)+.5,m=127.5*(1<<k),n=-m,D=h,p=0,q=L.length;q>p;p++)z=L[p],B[D]=n>=z?0:z>=m?255:z+l>>k,D+=d}e.push(C)}return e}function y(a,b){for(var c=a.SIZ,d=c.Csiz,e=a.tiles[b],f=0;d>f;f++){var g=e.components[f],h=void 0!==a.currentTile.QCC[f]?a.currentTile.QCC[f]:a.currentTile.QCD;g.quantizationParameters=h;var i=void 0!==a.currentTile.COC[f]?a.currentTile.COC[f]:a.currentTile.COD;g.codingStyleParameters=i}e.codingStyleDefaultParameters=a.currentTile.COD}
// Table E.1
var z={LL:0,LH:1,HL:1,HH:2};c.prototype={parse:function(c){var d=m(c,0);
// No box header, immediate start of codestream (SOC)
if(65359===d)return void this.parseCodestream(c,0,c.length);for(var e=0,f=c.length;f>e;){var g=8,h=n(c,e),i=n(c,e+4);if(e+=g,1===h&&(
// XLBox: read UInt64 according to spec.
// JavaScript's int precision of 53 bit should be sufficient here.
h=4294967296*n(c,e)+n(c,e+4),e+=8,g+=8),0===h&&(h=f-e+g),g>h)throw new Error("JPX Error: Invalid box field size");var j=h-g,k=!0;switch(i){case 1785737832:// 'jp2h'
k=!1;// parsing child boxes
break;case 1668246642:// 'colr'
// Colorspaces are not used, the CS from the PDF is used.
var l=c[e];c[e+1],c[e+2];if(1===l){
// enumerated colorspace
var o=n(c,e+3);switch(o){case 16:// this indicates a sRGB colorspace
case 17:// this indicates a grayscale colorspace
case 18:// this indicates a YUV colorspace
break;default:b("Unknown colorspace "+o)}}else 2===l&&a("ICC profile not supported");break;case 1785737827:// 'jp2c'
this.parseCodestream(c,e,e+j);break;case 1783636e3:// 'jP\024\024'
218793738!==n(c,e)&&b("Invalid JP2 signature");break;
// The following header types are valid but currently not used:
case 1783634458:// 'jP\032\032'
case 1718909296:// 'ftyp'
case 1920099697:// 'rreq'
case 1919251232:// 'res '
case 1768449138:// 'ihdr'
break;default:var p=String.fromCharCode(i>>24&255,i>>16&255,i>>8&255,255&i);b("Unsupported header type "+i+" ("+p+")")}k&&(e+=j)}},parseImageProperties:function(a){for(var b=a.getByte();b>=0;){var c=b;b=a.getByte();var d=c<<8|b;
// Image and tile size (SIZ)
if(65361===d){a.skip(4);var e=a.getInt32()>>>0,f=a.getInt32()>>>0,g=a.getInt32()>>>0,h=a.getInt32()>>>0;// Byte 16
a.skip(16);var i=a.getUint16();// Byte 36
// Results are always returned as Uint8Arrays
return this.width=e-g,this.height=f-h,this.componentsCount=i,void(this.bitsPerComponent=8)}}throw new Error("JPX Error: No size marker found in JPX stream")},parseCodestream:function(a,c,f){var g={};try{for(var h=!1,i=c;f>i+1;){var j=m(a,i);i+=2;var k,l,o,p,q,r,s=0;switch(j){case 65359:// Start of codestream (SOC)
g.mainHeader=!0;break;case 65497:// End of codestream (EOC)
break;case 65361:// Image and tile size (SIZ)
s=m(a,i);var v={};v.Xsiz=n(a,i+4),v.Ysiz=n(a,i+8),v.XOsiz=n(a,i+12),v.YOsiz=n(a,i+16),v.XTsiz=n(a,i+20),v.YTsiz=n(a,i+24),v.XTOsiz=n(a,i+28),v.YTOsiz=n(a,i+32);var w=m(a,i+36);v.Csiz=w;var z=[];k=i+38;for(var A=0;w>A;A++){var B={precision:(127&a[k])+1,isSigned:!!(128&a[k]),XRsiz:a[k+1],YRsiz:a[k+1]};d(B,v),z.push(B)}g.SIZ=v,g.components=z,e(g,z),g.QCC=[],g.COC=[];break;case 65372:// Quantization default (QCD)
s=m(a,i);var C={};switch(k=i+2,l=a[k++],31&l){case 0:p=8,q=!0;break;case 1:p=16,q=!1;break;case 2:p=16,q=!0;break;default:throw new Error("JPX Error: Invalid SQcd value "+l)}for(C.noQuantization=8===p,C.scalarExpounded=q,C.guardBits=l>>5,o=[];s+i>k;){var D={};8===p?(D.epsilon=a[k++]>>3,D.mu=0):(D.epsilon=a[k]>>3,D.mu=(7&a[k])<<8|a[k+1],k+=2),o.push(D)}C.SPqcds=o,g.mainHeader?g.QCD=C:(g.currentTile.QCD=C,g.currentTile.QCC=[]);break;case 65373:// Quantization component (QCC)
s=m(a,i);var E={};k=i+2;var F;switch(g.SIZ.Csiz<257?F=a[k++]:(F=m(a,k),k+=2),l=a[k++],31&l){case 0:p=8,q=!0;break;case 1:p=16,q=!1;break;case 2:p=16,q=!0;break;default:throw new Error("JPX Error: Invalid SQcd value "+l)}for(E.noQuantization=8===p,E.scalarExpounded=q,E.guardBits=l>>5,o=[];s+i>k;)D={},8===p?(D.epsilon=a[k++]>>3,D.mu=0):(D.epsilon=a[k]>>3,D.mu=(7&a[k])<<8|a[k+1],k+=2),o.push(D);E.SPqcds=o,g.mainHeader?g.QCC[F]=E:g.currentTile.QCC[F]=E;break;case 65362:// Coding style default (COD)
s=m(a,i);var G={};k=i+2;var H=a[k++];G.entropyCoderWithCustomPrecincts=!!(1&H),G.sopMarkerUsed=!!(2&H),G.ephMarkerUsed=!!(4&H),G.progressionOrder=a[k++],G.layersCount=m(a,k),k+=2,G.multipleComponentTransform=a[k++],G.decompositionLevelsCount=a[k++],G.xcb=(15&a[k++])+2,G.ycb=(15&a[k++])+2;var I=a[k++];if(G.selectiveArithmeticCodingBypass=!!(1&I),G.resetContextProbabilities=!!(2&I),G.terminationOnEachCodingPass=!!(4&I),G.verticalyStripe=!!(8&I),G.predictableTermination=!!(16&I),G.segmentationSymbolUsed=!!(32&I),G.reversibleTransformation=a[k++],G.entropyCoderWithCustomPrecincts){for(var J=[];s+i>k;){var K=a[k++];J.push({PPx:15&K,PPy:K>>4})}G.precinctsSizes=J}var L=[];if(G.selectiveArithmeticCodingBypass&&L.push("selectiveArithmeticCodingBypass"),G.resetContextProbabilities&&L.push("resetContextProbabilities"),G.terminationOnEachCodingPass&&L.push("terminationOnEachCodingPass"),G.verticalyStripe&&L.push("verticalyStripe"),G.predictableTermination&&L.push("predictableTermination"),L.length>0)throw h=!0,new Error("JPX Error: Unsupported COD options ("+L.join(", ")+")");g.mainHeader?g.COD=G:(g.currentTile.COD=G,g.currentTile.COC=[]);break;case 65424:// Start of tile-part (SOT)
s=m(a,i),r={},r.index=m(a,i+2),r.length=n(a,i+4),r.dataEnd=r.length+i-2,r.partIndex=a[i+8],r.partsCount=a[i+9],g.mainHeader=!1,0===r.partIndex&&(
// reset component specific settings
r.COD=g.COD,r.COC=g.COC.slice(0),// clone of the global COC
r.QCD=g.QCD,r.QCC=g.QCC.slice(0)),g.currentTile=r;break;case 65427:// Start of data (SOD)
r=g.currentTile,0===r.partIndex&&(y(g,r.index),t(g)),
// moving to the end of the data
s=r.dataEnd-i,u(g,a,i,s);break;case 65365:// Tile-part lengths, main header (TLM)
case 65367:// Packet length, main header (PLM)
case 65368:// Packet length, tile-part header (PLT)
case 65380:// Comment (COM)
s=m(a,i);
// skipping content
break;case 65363:// Coding style component (COC)
throw new Error("JPX Error: Codestream code 0xFF53 (COC) is not implemented");default:throw new Error("JPX Error: Unknown codestream code: "+j.toString(16))}i+=s}}catch(M){if(h||this.failOnCorruptedImage)throw M;b("Trying to recover from "+M.message)}this.tiles=x(g),this.width=g.SIZ.Xsiz-g.SIZ.XOsiz,this.height=g.SIZ.Ysiz-g.SIZ.YOsiz,this.componentsCount=g.SIZ.Csiz}};
// Section B.10.2 Tag trees
var A=function(){function a(a,b){var c=k(Math.max(a,b))+1;this.levels=[];for(var d=0;c>d;d++){var e={width:a,height:b,items:[]};this.levels.push(e),a=Math.ceil(a/2),b=Math.ceil(b/2)}}return a.prototype={reset:function(a,b){for(var c,d=0,e=0;d<this.levels.length;){c=this.levels[d];var f=a+b*c.width;if(void 0!==c.items[f]){e=c.items[f];break}c.index=f,a>>=1,b>>=1,d++}d--,c=this.levels[d],c.items[c.index]=e,this.currentLevel=d,delete this.value},incrementValue:function(){var a=this.levels[this.currentLevel];a.items[a.index]++},nextLevel:function(){var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];return a--,0>a?(this.value=c,!1):(this.currentLevel=a,b=this.levels[a],b.items[b.index]=c,!0)}},a}(),B=function(){function a(a,b,c){var d=k(Math.max(a,b))+1;this.levels=[];for(var e=0;d>e;e++){for(var f=new Uint8Array(a*b),g=0,h=f.length;h>g;g++)f[g]=c;var i={width:a,height:b,items:f};this.levels.push(i),a=Math.ceil(a/2),b=Math.ceil(b/2)}}return a.prototype={reset:function(a,b,c){for(var d=0;d<this.levels.length;){var e=this.levels[d],f=a+b*e.width;e.index=f;var g=e.items[f];if(255===g)break;if(g>c)
// already know about this one, propagating the value to top levels
return this.currentLevel=d,this.propagateValues(),!1;a>>=1,b>>=1,d++}return this.currentLevel=d-1,!0},incrementValue:function(a){var b=this.levels[this.currentLevel];b.items[b.index]=a+1,this.propagateValues()},propagateValues:function(){for(var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];--a>=0;)b=this.levels[a],b.items[b.index]=c},nextLevel:function(){var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];return b.items[b.index]=255,a--,0>a?!1:(this.currentLevel=a,b=this.levels[a],b.items[b.index]=c,!0)}},a}(),C=function(){function a(a,b,c,g,h){this.width=a,this.height=b,this.contextLabelTable="HH"===c?f:"HL"===c?e:d;var i=a*b;
// coefficients outside the encoding region treated as insignificant
// add border state cells for significanceState
this.neighborsSignificance=new Uint8Array(i),this.coefficentsSign=new Uint8Array(i),this.coefficentsMagnitude=h>14?new Uint32Array(i):h>6?new Uint16Array(i):new Uint8Array(i),this.processingFlags=new Uint8Array(i);var j=new Uint8Array(i);if(0!==g)for(var k=0;i>k;k++)j[k]=g;this.bitsDecoded=j,this.reset()}var b=17,c=18,d=new Uint8Array([0,5,8,0,3,7,8,0,4,7,8,0,0,0,0,0,1,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8]),e=new Uint8Array([0,3,4,0,5,7,7,0,8,8,8,0,0,0,0,0,1,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8]),f=new Uint8Array([0,1,2,0,1,2,2,0,2,2,2,0,0,0,0,0,3,4,5,0,4,5,5,0,5,5,5,0,0,0,0,0,6,7,7,0,7,7,7,0,7,7,7,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8]);return a.prototype={setDecoder:function(a){this.decoder=a},reset:function(){
// We have 17 contexts that are accessed via context labels,
// plus the uniform and runlength context.
this.contexts=new Int8Array(19),
// Contexts are packed into 1 byte:
// highest 7 bits carry the index, lowest bit carries mps
this.contexts[0]=8,this.contexts[b]=92,this.contexts[c]=6},setNeighborsSignificance:function(a,b,c){var d,e=this.neighborsSignificance,f=this.width,g=this.height,h=b>0,i=f>b+1;a>0&&(d=c-f,h&&(e[d-1]+=16),i&&(e[d+1]+=16),e[d]+=4),g>a+1&&(d=c+f,h&&(e[d-1]+=16),i&&(e[d+1]+=16),e[d]+=4),h&&(e[c-1]+=1),i&&(e[c+1]+=1),e[c]|=128},runSignificancePropogationPass:function(){for(var a=this.decoder,b=this.width,c=this.height,d=this.coefficentsMagnitude,e=this.coefficentsSign,f=this.neighborsSignificance,g=this.processingFlags,h=this.contexts,i=this.contextLabelTable,j=this.bitsDecoded,k=-2,l=1,m=2,n=0;c>n;n+=4)for(var o=0;b>o;o++)for(var p=n*b+o,q=0;4>q;q++,p+=b){var r=n+q;if(r>=c)break;if(
// clear processed flag first
g[p]&=k,!d[p]&&f[p]){var s=i[f[p]],t=a.readBit(h,s);if(t){var u=this.decodeSignBit(r,o,p);e[p]=u,d[p]=1,this.setNeighborsSignificance(r,o,p),g[p]|=m}j[p]++,g[p]|=l}}},decodeSignBit:function(a,b,c){var d,e,f,g,h,i,j=this.width,k=this.height,l=this.coefficentsMagnitude,m=this.coefficentsSign;
// calculate horizontal contribution
g=b>0&&0!==l[c-1],j>b+1&&0!==l[c+1]?(f=m[c+1],g?(e=m[c-1],d=1-f-e):d=1-f-f):g?(e=m[c-1],d=1-e-e):d=0;var n=3*d;
// calculate vertical contribution and combine with the horizontal
return g=a>0&&0!==l[c-j],k>a+1&&0!==l[c+j]?(f=m[c+j],g?(e=m[c-j],d=1-f-e+n):d=1-f-f+n):g?(e=m[c-j],d=1-e-e+n):d=n,d>=0?(h=9+d,i=this.decoder.readBit(this.contexts,h)):(h=9-d,i=1^this.decoder.readBit(this.contexts,h)),i},runMagnitudeRefinementPass:function(){for(var a,b=this.decoder,c=this.width,d=this.height,e=this.coefficentsMagnitude,f=this.neighborsSignificance,g=this.contexts,h=this.bitsDecoded,i=this.processingFlags,j=1,k=2,l=c*d,m=4*c,n=0;l>n;n=a){a=Math.min(l,n+m);for(var o=0;c>o;o++)for(var p=n+o;a>p;p+=c)
// significant but not those that have just become
if(e[p]&&0===(i[p]&j)){var q=16;if(0!==(i[p]&k)){i[p]^=k;
// first refinement
var r=127&f[p];q=0===r?15:14}var s=b.readBit(g,q);e[p]=e[p]<<1|s,h[p]++,i[p]|=j}}},runCleanupPass:function(){for(var a,d=this.decoder,e=this.width,f=this.height,g=this.neighborsSignificance,h=this.coefficentsMagnitude,i=this.coefficentsSign,j=this.contexts,k=this.contextLabelTable,l=this.bitsDecoded,m=this.processingFlags,n=1,o=2,p=e,q=2*e,r=3*e,s=0;f>s;s=a){a=Math.min(s+4,f);for(var t=s*e,u=f>s+3,v=0;e>v;v++){var w,x=t+v,y=u&&0===m[x]&&0===m[x+p]&&0===m[x+q]&&0===m[x+r]&&0===g[x]&&0===g[x+p]&&0===g[x+q]&&0===g[x+r],z=0,A=x,B=s;if(y){var C=d.readBit(j,c);if(!C){l[x]++,l[x+p]++,l[x+q]++,l[x+r]++;continue}z=d.readBit(j,b)<<1|d.readBit(j,b),0!==z&&(B=s+z,A+=z*e),w=this.decodeSignBit(B,v,A),i[A]=w,h[A]=1,this.setNeighborsSignificance(B,v,A),m[A]|=o,A=x;for(var D=s;B>=D;D++,A+=e)l[A]++;z++}for(B=s+z;a>B;B++,A+=e)if(!h[A]&&0===(m[A]&n)){var E=k[g[A]],F=d.readBit(j,E);1===F&&(w=this.decodeSignBit(B,v,A),i[A]=w,h[A]=1,this.setNeighborsSignificance(B,v,A),m[A]|=o),l[A]++}}}},checkSegmentationSymbol:function(){var a=this.decoder,c=this.contexts,d=a.readBit(c,b)<<3|a.readBit(c,b)<<2|a.readBit(c,b)<<1|a.readBit(c,b);if(10!==d)throw new Error("JPX Error: Invalid segmentation symbol")}},a}(),D=function(){function a(){}return a.prototype.calculate=function(a,b,c){for(var d=a[0],e=1,f=a.length;f>e;e++)d=this.iterate(d,a[e],b,c);return d},a.prototype.extend=function(a,b,c){
// Section F.3.7 extending... using max extension of 4
var d=b-1,e=b+1,f=b+c-2,g=b+c;a[d--]=a[e++],a[g++]=a[f--],a[d--]=a[e++],a[g++]=a[f--],a[d--]=a[e++],a[g++]=a[f--],a[d]=a[e],a[g]=a[f]},a.prototype.iterate=function(a,b,c,d){var e,f,g,h,i,j,k=a.width,l=a.height,m=a.items,n=b.width,o=b.height,p=b.items;
// Interleave LL according to Section F.3.3
for(g=0,e=0;l>e;e++)for(h=2*e*n,f=0;k>f;f++,g++,h+=2)p[h]=m[g];
// The LL band is not needed anymore.
m=a.items=null;var q=4,r=new Float32Array(n+2*q);
// Section F.3.4 HOR_SR
if(1===n){
// if width = 1, when u0 even keep items as is, when odd divide by 2
if(0!==(1&c))for(j=0,g=0;o>j;j++,g+=n)p[g]*=.5}else for(j=0,g=0;o>j;j++,g+=n)r.set(p.subarray(g,g+n),q),this.extend(r,q,n),this.filter(r,q,n),p.set(r.subarray(q,q+n),g);
// Accesses to the items array can take long, because it may not fit into
// CPU cache and has to be fetched from main memory. Since subsequent
// accesses to the items array are not local when reading columns, we
// have a cache miss every time. To reduce cache misses, get up to
// 'numBuffers' items at a time and store them into the individual
// buffers. The colBuffers should be small enough to fit into CPU cache.
var s=16,t=[];for(e=0;s>e;e++)t.push(new Float32Array(o+2*q));var u,v=0;
// Section F.3.5 VER_SR
if(a=q+o,1===o){
// if height = 1, when v0 even keep items as is, when odd divide by 2
if(0!==(1&d))for(i=0;n>i;i++)p[i]*=.5}else for(i=0;n>i;i++){
// if we ran out of buffers, copy several image columns at once
if(0===v){for(s=Math.min(n-i,s),g=i,h=q;a>h;g+=n,h++)for(u=0;s>u;u++)t[u][h]=p[g+u];v=s}v--;var w=t[v];
// If this is last buffer in this group of buffers, flush all buffers.
if(this.extend(w,q,o),this.filter(w,q,o),0===v)for(g=i-s+1,h=q;a>h;g+=n,h++)for(u=0;s>u;u++)p[g+u]=t[u][h]}return{width:n,height:o,items:p}},a}(),E=function(){function a(){D.call(this)}return a.prototype=Object.create(D.prototype),a.prototype.filter=function(a,b,c){var d=c>>1;b=0|b;var e,f,g,h,i=-1.586134342059924,j=-.052980118572961,k=.882911075530934,l=.443506852043971,m=1.230174104914001,n=1/m;for(
// step 1 is combined with step 3
// step 2
e=b-3,f=d+4;f--;e+=2)a[e]*=n;for(
// step 1 & 3
e=b-2,g=l*a[e-1],f=d+3;f--&&(h=l*a[e+1],a[e]=m*a[e]-g-h,f--);e+=2)e+=2,g=l*a[e+1],a[e]=m*a[e]-g-h;for(
// step 4
e=b-1,g=k*a[e-1],f=d+2;f--&&(h=k*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=k*a[e+1],a[e]-=g+h;for(
// step 5
e=b,g=j*a[e-1],f=d+1;f--&&(h=j*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=j*a[e+1],a[e]-=g+h;
// step 6
if(0!==d)for(e=b+1,g=i*a[e-1],f=d;f--&&(h=i*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=i*a[e+1],a[e]-=g+h},a}(),F=function(){function a(){D.call(this)}return a.prototype=Object.create(D.prototype),a.prototype.filter=function(a,b,c){var d=c>>1;b=0|b;var e,f;for(e=b,f=d+1;f--;e+=2)a[e]-=a[e-1]+a[e+1]+2>>2;for(e=b+1,f=d;f--;e+=2)a[e]+=a[e-1]+a[e+1]>>1},a}();return c}(),bd=function(){
// Utility data structures
function a(){}function b(a,b,c){this.data=a,this.start=b,this.end=c}
// Annex A. Arithmetic Integer Decoding Procedure
// A.2 Procedure for decoding values
function d(a,b,c){function d(a){for(var b=0,d=0;a>d;d++){var g=c.readBit(e,f);f=256>f?f<<1|g:511&(f<<1|g)|256,b=b<<1|g}return b>>>0}var e=a.getContexts(b),f=1,g=d(1),h=d(1)?d(1)?d(1)?d(1)?d(1)?d(32)+4436:d(12)+340:d(8)+84:d(6)+20:d(4)+4:d(2);return 0===g?h:h>0?-h:null}
// A.3 The IAID decoding procedure
function e(a,b,c){for(var d=a.getContexts("IAID"),e=1,f=0;c>f;f++){var g=b.readBit(d,e);e=e<<1|g}return 31>c?e&(1<<c)-1:2147483647&e}function f(a,b,c){var d,e,f,g,h,i,j,k=c.decoder,l=c.contextCache.getContexts("GB"),m=[],n=31735;// 01111 0111111 0111
for(e=0;b>e;e++)for(h=m[e]=new Uint8Array(a),i=1>e?h:m[e-1],j=2>e?h:m[e-2],
// At the beginning of each row:
// Fill contextLabel with pixels that are above/right of (X)
d=j[0]<<13|j[1]<<12|j[2]<<11|i[0]<<7|i[1]<<6|i[2]<<5|i[3]<<4,f=0;a>f;f++)h[f]=g=k.readBit(l,d),
// At each pixel: Clear contextLabel pixels that are shifted
// out of the context, then add new ones.
d=(d&n)<<1|(a>f+3?j[f+3]<<11:0)|(a>f+4?i[f+4]<<4:0)|g;return m}
// 6.2 Generic Region Decoding Procedure
function h(a,b,d,e,g,h,i,j){
// Use optimized version for the most common case
if(a&&c("JBIG2 error: MMR encoding is not supported"),0===e&&!h&&!g&&4===i.length&&3===i[0].x&&-1===i[0].y&&-3===i[1].x&&-1===i[1].y&&2===i[2].x&&-2===i[2].y&&-2===i[3].x&&-2===i[3].y)return f(b,d,j);var k=!!h,l=y[e].concat(i);
// Sorting is non-standard, and it is not required. But sorting increases
// the number of template bits that can be reused from the previous
// contextLabel in the main loop.
l.sort(function(a,b){return a.y-b.y||a.x-b.x});var m,n,o=l.length,p=new Int8Array(o),q=new Int8Array(o),r=[],s=0,t=0,u=0,v=0;for(n=0;o>n;n++)p[n]=l[n].x,q[n]=l[n].y,t=Math.min(t,l[n].x),u=Math.max(u,l[n].x),v=Math.min(v,l[n].y),
// Check if the template pixel appears in two consecutive context labels,
// so it can be reused. Otherwise, we add it to the list of changing
// template entries.
o-1>n&&l[n].y===l[n+1].y&&l[n].x===l[n+1].x-1?s|=1<<o-1-n:r.push(n);var w=r.length,x=new Int8Array(w),z=new Int8Array(w),B=new Uint16Array(w);for(m=0;w>m;m++)n=r[m],x[m]=l[n].x,z[m]=l[n].y,B[m]=1<<o-1-n;for(var C,D,E,F,G,H=-t,I=-v,J=b-u,K=A[e],L=new Uint8Array(b),M=[],N=j.decoder,O=j.contextCache.getContexts("GB"),P=0,Q=0,R=0;d>R;R++){if(g){var S=N.readBit(O,K);if(P^=S){M.push(L);// duplicate previous row
continue}}for(L=new Uint8Array(L),M.push(L),C=0;b>C;C++)if(k&&h[R][C])L[C]=0;else{
// Are we in the middle of a scanline, so we can reuse contextLabel
// bits?
if(C>=H&&J>C&&R>=I)for(
// If yes, we can just shift the bits that are reusable and only
// fetch the remaining ones.
Q=Q<<1&s,n=0;w>n;n++)D=R+z[n],E=C+x[n],F=M[D][E],F&&(F=B[n],Q|=F);else for(
// compute the contextLabel from scratch
Q=0,G=o-1,n=0;o>n;n++,G--)E=C+p[n],E>=0&&b>E&&(D=R+q[n],D>=0&&(F=M[D][E],F&&(Q|=F<<G)));var T=N.readBit(O,Q);L[C]=T}}return M}
// 6.3.2 Generic Refinement Region Decoding Procedure
function i(a,b,d,e,f,g,h,i,j){var k=z[d].coding;0===d&&(k=k.concat([i[0]]));var l,m=k.length,n=new Int32Array(m),o=new Int32Array(m);for(l=0;m>l;l++)n[l]=k[l].x,o[l]=k[l].y;var p=z[d].reference;0===d&&(p=p.concat([i[1]]));var q=p.length,r=new Int32Array(q),s=new Int32Array(q);for(l=0;q>l;l++)r[l]=p[l].x,s[l]=p[l].y;for(var t=e[0].length,u=e.length,v=B[d],w=[],x=j.decoder,y=j.contextCache.getContexts("GR"),A=0,C=0;b>C;C++){if(h){var D=x.readBit(y,v);A^=D,A&&c("JBIG2 error: prediction is not supported")}var E=new Uint8Array(a);w.push(E);for(var F=0;a>F;F++){var G,H,I=0;for(l=0;m>l;l++)G=C+o[l],H=F+n[l],0>G||0>H||H>=a?I<<=1:I=I<<1|w[G][H];for(l=0;q>l;l++)G=C+s[l]+g,H=F+r[l]+f,0>G||G>=u||0>H||H>=t?I<<=1:I=I<<1|e[G][H];var J=x.readBit(y,I);E[F]=J}}return w}
// 6.5.5 Decoding the symbol dictionary
function j(a,b,f,g,j,l,m,n,p,q,r){a&&c("JBIG2 error: huffman is not supported");for(var s=[],t=0,u=k(f.length+g),v=r.decoder,w=r.contextCache;s.length<g;){var x=d(w,"IADH",v);// 6.5.6
t+=x;for(var y=0,z=0;;){var A=d(w,"IADW",v);// 6.5.7
if(null===A)break;y+=A,z+=y;var B;if(b){
// 6.5.8.2 Refinement/aggregate-coded symbol bitmap
var C=d(w,"IAAI",v);if(C>1)B=o(a,b,y,t,0,C,1,//strip size
f.concat(s),u,0,//transposed
0,//ds offset
1,//top left 7.4.3.1.1
0,//OR operator
l,p,q,r);else{var D=e(w,v,u),E=d(w,"IARDX",v),F=d(w,"IARDY",v),G=D<f.length?f[D]:s[D-f.length];B=i(y,t,p,G,E,F,!1,q,r)}}else
// 6.5.8.1 Direct-coded symbol bitmap
B=h(!1,y,t,m,!1,null,n,r);s.push(B)}}for(
// 6.5.10 Exported symbols
var H=[],I=[],J=!1,K=f.length+g;I.length<K;){for(var L=d(w,"IAEX",v);L--;)I.push(J);J=!J}for(var M=0,N=f.length;N>M;M++)I[M]&&H.push(f[M]);for(var O=0;g>O;M++,O++)I[M]&&H.push(s[O]);return H}function o(a,b,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u){a&&c("JBIG2 error: huffman is not supported");
// Prepare bitmap
var v,w,x=[];for(v=0;g>v;v++){if(w=new Uint8Array(f),h)for(var y=0;f>y;y++)w[y]=h;x.push(w)}var z=u.decoder,A=u.contextCache,B=-d(A,"IADT",z),C=0;for(v=0;j>v;){var D=d(A,"IADT",z);// 6.4.6
B+=D;var E=d(A,"IAFS",z);// 6.4.7
C+=E;for(var F=C;;){var G=1===k?0:d(A,"IAIT",z),H=k*B+G,I=e(A,z,m),J=b&&d(A,"IARI",z),K=l[I],L=K[0].length,M=K.length;if(J){var N=d(A,"IARDW",z),O=d(A,"IARDH",z),P=d(A,"IARDX",z),Q=d(A,"IARDY",z);// 6.4.11.4
L+=N,M+=O,K=i(L,M,s,K,(N>>1)+P,(O>>1)+Q,!1,t,u)}var R,S,T,U=H-(1&p?0:M),V=F-(2&p?L:0);if(n){
// Place Symbol Bitmap from T1,S1
for(R=0;M>R;R++)if(w=x[V+R]){T=K[R];
// To ignore Parts of Symbol bitmap which goes
// outside bitmap region
var W=Math.min(f-U,L);switch(q){case 0:// OR
for(S=0;W>S;S++)w[U+S]|=T[S];break;case 2:// XOR
for(S=0;W>S;S++)w[U+S]^=T[S];break;default:c("JBIG2 error: operator "+q+" is not supported")}}F+=M-1}else{for(S=0;M>S;S++)if(w=x[U+S])switch(T=K[S],q){case 0:// OR
for(R=0;L>R;R++)w[V+R]|=T[R];break;case 2:// XOR
for(R=0;L>R;R++)w[V+R]^=T[R];break;default:c("JBIG2 error: operator "+q+" is not supported")}F+=L-1}v++;var X=d(A,"IADS",z);// 6.4.8
if(null===X)break;F+=X+o}}return x}function p(a,b){var d={};d.number=n(a,b);var e=a[b+4],f=63&e;x[f]||c("JBIG2 error: invalid segment type: "+f),d.type=f,d.typeName=x[f],d.deferredNonRetain=!!(128&e);var g=!!(64&e),h=a[b+5],i=h>>5&7,j=[31&h],k=b+6;if(7===h){i=536870911&n(a,k-1),k+=3;var l=i+7>>3;for(j[0]=a[k++];--l>0;)j.push(a[k++])}else(5===h||6===h)&&c("JBIG2 error: invalid referred-to flags");d.retainBits=j;var o,p,q=d.number<=256?1:d.number<=65536?2:4,s=[];for(o=0;i>o;o++){var t=1===q?a[k]:2===q?m(a,k):n(a,k);s.push(t),k+=q}if(d.referredTo=s,g?(d.pageAssociation=n(a,k),k+=4):d.pageAssociation=a[k++],d.length=n(a,k),k+=4,4294967295===d.length)
// 7.2.7 Segment data length, unknown segment length
if(38===f){// ImmediateGenericRegion
var u=r(a,k),v=a[k+C],w=!!(1&v),y=6,z=new Uint8Array(y);for(w||(z[0]=255,z[1]=172),z[2]=u.height>>>24&255,z[3]=u.height>>16&255,z[4]=u.height>>8&255,z[5]=255&u.height,o=k,p=a.length;p>o;o++){for(var A=0;y>A&&z[A]===a[o+A];)A++;if(A===y){d.length=o+y;break}}4294967295===d.length&&c("JBIG2 error: segment end was not found")}else c("JBIG2 error: invalid unknown segment length");return d.headerEnd=k,d}function q(a,b,c,d){for(var e=[],f=c;d>f;){var g=p(b,f);f=g.headerEnd;var h={header:g,data:b};if(a.randomAccess||(h.start=f,f+=g.length,h.end=f),e.push(h),51===g.type)break}if(a.randomAccess)for(var i=0,j=e.length;j>i;i++)e[i].start=f,f+=e[i].header.length,e[i].end=f;return e}
// 7.4.1 Region segment information field
function r(a,b){return{width:n(a,b),height:n(a,b+4),x:n(a,b+8),y:n(a,b+12),combinationOperator:7&a[b+16]}}function s(a,b){var d,e,f,g,h=a.header,i=a.data,j=a.start,k=a.end;switch(h.type){case 0:// SymbolDictionary
// 7.4.2 Symbol dictionary segment syntax
var o={},p=m(i,j);if(// 7.4.2.1.1
o.huffman=!!(1&p),o.refinement=!!(2&p),o.huffmanDHSelector=p>>2&3,o.huffmanDWSelector=p>>4&3,o.bitmapSizeSelector=p>>6&1,o.aggregationInstancesSelector=p>>7&1,o.bitmapCodingContextUsed=!!(256&p),o.bitmapCodingContextRetained=!!(512&p),o.template=p>>10&3,o.refinementTemplate=p>>12&1,j+=2,!o.huffman){for(g=0===o.template?4:1,e=[],f=0;g>f;f++)e.push({x:l(i,j),y:l(i,j+1)}),j+=2;o.at=e}if(o.refinement&&!o.refinementTemplate){for(e=[],f=0;2>f;f++)e.push({x:l(i,j),y:l(i,j+1)}),j+=2;o.refinementAt=e}o.numberOfExportedSymbols=n(i,j),j+=4,o.numberOfNewSymbols=n(i,j),j+=4,d=[o,h.number,h.referredTo,i,j,k];break;case 6:// ImmediateTextRegion
case 7:// ImmediateLosslessTextRegion
var q={};q.info=r(i,j),j+=C;var s=m(i,j);if(j+=2,q.huffman=!!(1&s),q.refinement=!!(2&s),q.stripSize=1<<(s>>2&3),q.referenceCorner=s>>4&3,q.transposed=!!(64&s),q.combinationOperator=s>>7&3,q.defaultPixelValue=s>>9&1,q.dsOffset=s<<17>>27,q.refinementTemplate=s>>15&1,q.huffman){var t=m(i,j);j+=2,q.huffmanFS=3&t,q.huffmanDS=t>>2&3,q.huffmanDT=t>>4&3,q.huffmanRefinementDW=t>>6&3,q.huffmanRefinementDH=t>>8&3,q.huffmanRefinementDX=t>>10&3,q.huffmanRefinementDY=t>>12&3,q.huffmanRefinementSizeSelector=!!(14&t)}if(q.refinement&&!q.refinementTemplate){for(e=[],f=0;2>f;f++)e.push({x:l(i,j),y:l(i,j+1)}),j+=2;q.refinementAt=e}q.numberOfSymbolInstances=n(i,j),j+=4,
// TODO 7.4.3.1.7 Symbol ID Huffman table decoding
q.huffman&&c("JBIG2 error: huffman is not supported"),d=[q,h.referredTo,i,j,k];break;case 38:// ImmediateGenericRegion
case 39:// ImmediateLosslessGenericRegion
var u={};u.info=r(i,j),j+=C;var v=i[j++];if(u.mmr=!!(1&v),u.template=v>>1&3,u.prediction=!!(8&v),!u.mmr){for(g=0===u.template?4:1,e=[],f=0;g>f;f++)e.push({x:l(i,j),y:l(i,j+1)}),j+=2;u.at=e}d=[u,i,j,k];break;case 48:// PageInformation
var w={width:n(i,j),height:n(i,j+4),resolutionX:n(i,j+8),resolutionY:n(i,j+12)};4294967295===w.height&&delete w.height;var x=i[j+16];m(i,j+17);w.lossless=!!(1&x),w.refinement=!!(2&x),w.defaultPixelValue=x>>2&1,w.combinationOperator=x>>3&3,w.requiresBuffer=!!(32&x),w.combinationOperatorOverride=!!(64&x),d=[w];break;case 49:// EndOfPage
break;case 50:// EndOfStripe
break;case 51:// EndOfFile
break;case 62:// 7.4.15 defines 2 extension types which
// are comments and can be ignored.
break;default:c("JBIG2 error: segment type "+h.typeName+"("+h.type+") is not implemented")}var y="on"+h.typeName;y in b&&b[y].apply(b,d)}function t(a,b){for(var c=0,d=a.length;d>c;c++)s(a[c],b)}function u(a){for(var b=new v,c=0,d=a.length;d>c;c++){var e=a[c],f=q({},e.data,e.start,e.end);t(f,b)}return b.buffer}function v(){}function w(){}a.prototype={getContexts:function(a){return a in this?this[a]:this[a]=new Int8Array(65536)}},b.prototype={get decoder(){var a=new $c(this.data,this.start,this.end);return g(this,"decoder",a)},get contextCache(){var b=new a;return g(this,"contextCache",b)}};
// 7.3 Segment types
var x=["SymbolDictionary",null,null,null,"IntermediateTextRegion",null,"ImmediateTextRegion","ImmediateLosslessTextRegion",null,null,null,null,null,null,null,null,"patternDictionary",null,null,null,"IntermediateHalftoneRegion",null,"ImmediateHalftoneRegion","ImmediateLosslessHalftoneRegion",null,null,null,null,null,null,null,null,null,null,null,null,"IntermediateGenericRegion",null,"ImmediateGenericRegion","ImmediateLosslessGenericRegion","IntermediateGenericRefinementRegion",null,"ImmediateGenericRefinementRegion","ImmediateLosslessGenericRefinementRegion",null,null,null,null,"PageInformation","EndOfPage","EndOfStripe","EndOfFile","Profiles","Tables",null,null,null,null,null,null,null,null,"Extension"],y=[[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-2,y:0},{x:-1,y:0}],[{x:-3,y:-1},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}]],z=[{coding:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}]},{coding:[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]}],A=[39717,// 10011 0110010 0101
1941,// 0011 110010 101
229,// 001 11001 01
405],B=[32,// '000' + '0' (coding) + '00010000' + '0' (reference)
8],C=17;return v.prototype={onPageInformation:function(a){this.currentPageInfo=a;var b=a.width+7>>3,c=new Uint8Array(b*a.height);
// The contents of ArrayBuffers are initialized to 0.
// Fill the buffer with 0xFF only if info.defaultPixelValue is set
if(a.defaultPixelValue)for(var d=0,e=c.length;e>d;d++)c[d]=255;this.buffer=c},drawBitmap:function(a,b){var d,e,f,g,h=this.currentPageInfo,i=a.width,j=a.height,k=h.width+7>>3,l=h.combinationOperatorOverride?a.combinationOperator:h.combinationOperator,m=this.buffer,n=128>>(7&a.x),o=a.y*k+(a.x>>3);switch(l){case 0:// OR
for(d=0;j>d;d++){for(f=n,g=o,e=0;i>e;e++)b[d][e]&&(m[g]|=f),f>>=1,f||(f=128,g++);o+=k}break;case 2:// XOR
for(d=0;j>d;d++){for(f=n,g=o,e=0;i>e;e++)b[d][e]&&(m[g]^=f),f>>=1,f||(f=128,g++);o+=k}break;default:c("JBIG2 error: operator "+l+" is not supported")}},onImmediateGenericRegion:function(a,c,d,e){var f=a.info,g=new b(c,d,e),i=h(a.mmr,f.width,f.height,a.template,a.prediction,null,a.at,g);this.drawBitmap(f,i)},onImmediateLosslessGenericRegion:function(){this.onImmediateGenericRegion.apply(this,arguments)},onSymbolDictionary:function(a,d,e,f,g,h){var i;a.huffman&&c("JBIG2 error: huffman is not supported");
// Combines exported symbols from all referred segments
var k=this.symbols;k||(this.symbols=k={});for(var l=[],m=0,n=e.length;n>m;m++)l=l.concat(k[e[m]]);var o=new b(f,g,h);k[d]=j(a.huffman,a.refinement,l,a.numberOfNewSymbols,a.numberOfExportedSymbols,i,a.template,a.at,a.refinementTemplate,a.refinementAt,o)},onImmediateTextRegion:function(a,c,d,e,f){for(var g,h=a.info,i=this.symbols,j=[],l=0,m=c.length;m>l;l++)j=j.concat(i[c[l]]);var n=k(j.length),p=new b(d,e,f),q=o(a.huffman,a.refinement,h.width,h.height,a.defaultPixelValue,a.numberOfSymbolInstances,a.stripSize,j,n,a.transposed,a.dsOffset,a.referenceCorner,a.combinationOperator,g,a.refinementTemplate,a.refinementAt,p);this.drawBitmap(h,q)},onImmediateLosslessTextRegion:function(){this.onImmediateTextRegion.apply(this,arguments)}},w.prototype={parseChunks:function(a){return u(a)}},w}(),cd=(PDFJS.bidi=function(){function a(a){return 0!==(1&a)}function b(a){return 0===(1&a)}function c(a,b,c){for(var d=b,e=a.length;e>d;++d)if(a[d]!==c)return d;return d}function d(a,b,c,d){for(var e=b;c>e;++e)a[e]=d}function e(a,b,c){for(var d=b,e=c-1;e>d;++d,--e){var f=a[d];a[d]=a[e],a[e]=f}}function f(a,b,c){return{str:a,dir:c?"ttb":b?"ltr":"rtl"}}function g(g,l,m){var n=!0,o=g.length;if(0===o||m)return f(g,n,m);
// Get types and fill arrays
j.length=o,k.length=o;var p,q,r=0;for(p=0;o>p;++p){j[p]=g.charAt(p);var s=g.charCodeAt(p),t="L";255>=s?t=h[s]:s>=1424&&1524>=s?t="R":s>=1536&&1791>=s?t=i[255&s]:s>=1792&&2220>=s&&(t="AL"),("R"===t||"AL"===t||"AN"===t)&&r++,k[p]=t}
// Detect the bidi method
// - If there are no rtl characters then no bidi needed
// - If less than 30% chars are rtl then string is primarily ltr
// - If more than 30% chars are rtl then string is primarily rtl
if(0===r)return n=!0,f(g,n);-1===l&&(.3>o/r?(n=!0,l=0):(n=!1,l=1));var u=[];for(p=0;o>p;++p)u[p]=l;/*
     X1-X10: skip most of this, since we are NOT doing the embeddings.
     */
var v=a(l)?"R":"L",w=v,x=w,y=w;for(p=0;o>p;++p)"NSM"===k[p]?k[p]=y:y=k[p];/*
     W2. Search backwards from each instance of a European number until the
     first strong type (R, L, AL, or sor) is found.  If an AL is found, change
     the type of the European number to Arabic number.
     */
y=w;var z;for(p=0;o>p;++p)z=k[p],"EN"===z?k[p]="AL"===y?"AN":"EN":("R"===z||"L"===z||"AL"===z)&&(y=z);/*
     W3. Change all ALs to R.
     */
for(p=0;o>p;++p)z=k[p],"AL"===z&&(k[p]="R");/*
     W4. A single European separator between two European numbers changes to a
     European number. A single common separator between two numbers of the same
     type changes to that type:
     */
for(p=1;o-1>p;++p)"ES"===k[p]&&"EN"===k[p-1]&&"EN"===k[p+1]&&(k[p]="EN"),"CS"!==k[p]||"EN"!==k[p-1]&&"AN"!==k[p-1]||k[p+1]!==k[p-1]||(k[p]=k[p-1]);/*
     W5. A sequence of European terminators adjacent to European numbers changes
     to all European numbers:
     */
for(p=0;o>p;++p)if("EN"===k[p]){
// do before
var A;for(A=p-1;A>=0&&"ET"===k[A];--A)k[A]="EN";
// do after
for(A=p+1;o>A&&"ET"===k[A];--A)k[A]="EN"}/*
     W6. Otherwise, separators and terminators change to Other Neutral:
     */
for(p=0;o>p;++p)z=k[p],("WS"===z||"ES"===z||"ET"===z||"CS"===z)&&(k[p]="ON");for(/*
     W7. Search backwards from each instance of a European number until the
     first strong type (R, L, or sor) is found. If an L is found,  then change
     the type of the European number to L.
     */
y=w,p=0;o>p;++p)z=k[p],"EN"===z?k[p]="L"===y?"L":"EN":("R"===z||"L"===z)&&(y=z);/*
     N1. A sequence of neutrals takes the direction of the surrounding strong
     text if the text on both sides has the same direction. European and Arabic
     numbers are treated as though they were R. Start-of-level-run (sor) and
     end-of-level-run (eor) are used at level run boundaries.
     */
for(p=0;o>p;++p)if("ON"===k[p]){var B=c(k,p+1,"ON"),C=w;p>0&&(C=k[p-1]);var D=x;o>B+1&&(D=k[B+1]),"L"!==C&&(C="R"),"L"!==D&&(D="R"),C===D&&d(k,p,B,C),p=B-1}/*
     N2. Any remaining neutrals take the embedding direction.
     */
for(p=0;o>p;++p)"ON"===k[p]&&(k[p]=v);/*
     I1. For all characters with an even (left-to-right) embedding direction,
     those of type R go up one level and those of type AN or EN go up two
     levels.
     I2. For all characters with an odd (right-to-left) embedding direction,
     those of type L, EN or AN go up one level.
     */
for(p=0;o>p;++p)z=k[p],b(u[p])?"R"===z?u[p]+=1:("AN"===z||"EN"===z)&&(u[p]+=2):// isOdd
("L"===z||"AN"===z||"EN"===z)&&(u[p]+=1);/*
     L1. On each line, reset the embedding level of the following characters to
     the paragraph embedding level:

     segment separators,
     paragraph separators,
     any sequence of whitespace characters preceding a segment separator or
     paragraph separator, and any sequence of white space characters at the end
     of the line.
     */
// don't bother as text is only single line
/*
     L2. From the highest level found in the text to the lowest odd level on
     each line, reverse any contiguous sequence of characters that are at that
     level or higher.
     */
// find highest level & lowest odd level
var E,F=-1,G=99;for(p=0,q=u.length;q>p;++p)E=u[p],E>F&&(F=E),G>E&&a(E)&&(G=E);
// now reverse between those limits
for(E=F;E>=G;--E){
// find segments to reverse
var H=-1;for(p=0,q=u.length;q>p;++p)u[p]<E?H>=0&&(e(j,H,p),H=-1):0>H&&(H=p);H>=0&&e(j,H,u.length)}/*
     L3. Combining marks applied to a right-to-left base character will at this
     point precede their base character. If the rendering engine expects them to
     follow the base characters in the final display process, then the ordering
     of the marks and the base character must be reversed.
     */
// don't bother for now
/*
     L4. A character that possesses the mirrored property as specified by
     Section 4.7, Mirrored, must be depicted by a mirrored glyph if the resolved
     directionality of that character is R.
     */
// don't mirror as characters are already mirrored in the pdf
// Finally, return string
var I="";for(p=0,q=j.length;q>p;++p){var J=j[p];"<"!==J&&">"!==J&&(I+=J)}return f(I,n)}
// Character types for symbols from 0000 to 00FF.
var h=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","ON","ON","ET","ET","ET","ON","ON","ON","ON","ON","ON","CS","ON","CS","ON","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","ON","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","ON","ET","ET","ET","ET","ON","ON","ON","ON","L","ON","ON","ON","ON","ON","ET","ET","EN","EN","ON","L","ON","ON","ON","EN","L","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L"],i=["AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","CS","AL","ON","ON","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","AL","AL","AL","AL","AL","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","ON","NSM","NSM","NSM","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL"],j=[],k=[];return g}(),function(a){function b(a){var b=3285377520;this.h1=a?4294967295&a:b,this.h2=a?4294967295&a:b}
// Workaround for missing math precison in JS.
var c=4294901760,d=65535,e=!1;
// old webkits have issues with non-aligned arrays
try{new Uint32Array(new Uint8Array(5).buffer,0,1)}catch(f){e=!0}return b.prototype={update:function(a){var b,f=e;if("string"==typeof a){var g=new Uint8Array(2*a.length),h=0;for(b=0;b<a.length;b++){var i=a.charCodeAt(b);255>=i?g[h++]=i:(g[h++]=i>>>8,g[h++]=255&i)}}else if(a instanceof Uint8Array)g=a,h=g.length;else{if(!("object"==typeof a&&"length"in a))throw new Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.");
// processing regular arrays as well, e.g. for IE9
g=a,h=g.length,f=!0}var j=h>>2,k=h-4*j,l=f?new ga(g,j):new Uint32Array(g.buffer,0,j),m=0,n=0,o=this.h1,p=this.h2,q=3432918353,r=461845907,s=q&d,t=r&d;for(b=0;j>b;b++)1&b?(m=l[b],m=m*q&c|m*s&d,m=m<<15|m>>>17,m=m*r&c|m*t&d,o^=m,o=o<<13|o>>>19,o=5*o+3864292196):(n=l[b],n=n*q&c|n*s&d,n=n<<15|n>>>17,n=n*r&c|n*t&d,p^=n,p=p<<13|p>>>19,p=5*p+3864292196);switch(m=0,k){case 3:m^=g[4*j+2]<<16;/* falls through */
case 2:m^=g[4*j+1]<<8;/* falls through */
case 1:m^=g[4*j],/* falls through */
m=m*q&c|m*s&d,m=m<<15|m>>>17,m=m*r&c|m*t&d,1&j?o^=m:p^=m}return this.h1=o,this.h2=p,this},hexdigest:function(){var a=this.h1,b=this.h2;a^=b>>>1,a=3981806797*a&c|36045*a&d,b=4283543511*b&c|(2950163797*(b<<16|a>>>16)&c)>>>16,a^=b>>>1,a=444984403*a&c|60499*a&d,b=3301882366*b&c|(3120437893*(b<<16|a>>>16)&c)>>>16,a^=b>>>1;for(var e=0,f=[a,b],g="";e<f.length;e++){for(var h=(f[e]>>>0).toString(16);h.length<8;)h="0"+h;g+=h}return g}},b}())}.call("undefined"==typeof window?this:window),PDFJS.workerSrc||"undefined"==typeof document||(
// workerSrc is not set -- using last script url to define default location
PDFJS.workerSrc=function(){"use strict";var a=document.body||document.getElementsByTagName("head")[0],b=a.lastChild.src;return b&&b.replace(/\.js$/i,".worker.js")}());