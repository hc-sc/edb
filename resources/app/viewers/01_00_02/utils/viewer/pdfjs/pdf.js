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
a=[].join.call(arguments," ")}else console.log("Error: "+a);throw console.log(d()),F.notify(E.unknown),new Error(a)}function d(){try{throw new Error}catch(a){return a.stack?a.stack.split("\n").slice(2).join("\n"):""}}function e(a,b){a||c(b)}
// Combines two URLs. The baseUrl shall be absolute URL. If the url is an
// absolute URL, it will be returned as is.
function f(a,b){if(!b)return a;if(/^[a-z][a-z0-9+\-.]*:/i.test(b))return b;var c;if("/"===b.charAt(0))
// absolute path
return c=a.indexOf("://"),"/"===b.charAt(1)?++c:c=a.indexOf("/",c+3),a.substring(0,c)+b;
// relative path
var d=a.length;c=a.lastIndexOf("#"),d=c>=0?c:d,c=a.lastIndexOf("?",d),d=c>=0?c:d;var e=a.lastIndexOf("/",d);return a.substring(0,e+1)+b}
// Validates if URL is safe and allowed, e.g. to avoid XSS.
function g(a,b){if(!a)return!1;
// RFC 3986 (http://tools.ietf.org/html/rfc3986#section-3.1)
// scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
var c=/^[a-z][a-z0-9+\-.]*(?=:)/i.exec(a);if(!c)return b;switch(c=c[0].toLowerCase()){case"http":case"https":case"ftp":case"mailto":case"tel":return!0;default:return!1}}function h(a,b,c){return Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!1}),c}function i(a){e(null!==a&&"object"==typeof a&&void 0!==a.length,"Invalid argument for bytesToString");var b=a.length,c=8192;if(c>b)return String.fromCharCode.apply(null,a);for(var d=[],f=0;b>f;f+=c){var g=Math.min(f+c,b),h=a.subarray(f,g);d.push(String.fromCharCode.apply(null,h))}return d.join("")}function j(a){e("string"==typeof a,"Invalid argument for stringToBytes");for(var b=a.length,c=new Uint8Array(b),d=0;b>d;++d)c[d]=255&a.charCodeAt(d);return c}function k(a){return String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,255&a)}
// Lazy test the endianness of the platform
// NOTE: This will be 'true' for simulated TypedArrays
function l(){var a=new Uint8Array(2);a[0]=1;var b=new Uint16Array(a.buffer);return 1===b[0]}
// Lazy test if the userAgant support CanvasTypedArrays
function m(){var a=document.createElement("canvas");a.width=a.height=1;var b=a.getContext("2d"),c=b.createImageData(1,1);return"undefined"!=typeof c.data.buffer}function n(a){return"number"==typeof a}function o(a){return a instanceof Array}function p(a){return"object"==typeof a&&null!==a&&void 0!==a.byteLength}/**
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
function q(){var a={};return a.promise=new Promise(function(b,c){a.resolve=b,a.reject=c}),a}function r(a,b){this.name=a,this.comObj=b,this.callbackIndex=1,this.postMessageTransfers=!0;var d=this.callbacksCapabilities={},e=this.actionHandler={};e.console_log=[function(a){console.log.apply(console,a)}],e.console_error=[function(a){console.error.apply(console,a)}],e._unsupported_feature=[function(a){F.notify(a)}],b.onmessage=function(a){var f=a.data;if(f.isReply){var g=f.callbackId;if(f.callbackId in d){var h=d[g];delete d[g],"error"in f?h.reject(f.error):h.resolve(f.data)}else c("Cannot resolve callback "+g)}else if(f.action in e){var i=e[f.action];f.callbackId?Promise.resolve().then(function(){return i[0].call(i[1],f.data)}).then(function(a){b.postMessage({isReply:!0,callbackId:f.callbackId,data:a})},function(a){b.postMessage({isReply:!0,callbackId:f.callbackId,error:a})}):i[0].call(i[1],f.data)}else c("Unknown action from worker: "+f.action)}}function s(a,c,d){var e=new Image;e.onload=function(){d.resolve(a,e)},e.onerror=function(){d.resolve(a,null),b("Error during JPEG image loading")},e.src=c}function t(a,b){var c=document.createElement("canvas");return c.width=a,c.height=b,c}function u(a){
// If the context doesn't expose a `mozCurrentTransform`, add a JS based on.
a.mozCurrentTransform||(
// Store the original context
a._scaleX=a._scaleX||1,a._scaleY=a._scaleY||1,a._originalSave=a.save,a._originalRestore=a.restore,a._originalRotate=a.rotate,a._originalScale=a.scale,a._originalTranslate=a.translate,a._originalTransform=a.transform,a._originalSetTransform=a.setTransform,a._transformMatrix=[a._scaleX,0,0,a._scaleY,0,0],a._transformStack=[],Object.defineProperty(a,"mozCurrentTransform",{get:function(){return this._transformMatrix}}),Object.defineProperty(a,"mozCurrentTransformInverse",{get:function(){
// Calculation done using WolframAlpha:
// http://www.wolframalpha.com/input/?
//   i=Inverse+{{a%2C+c%2C+e}%2C+{b%2C+d%2C+f}%2C+{0%2C+0%2C+1}}
var a=this._transformMatrix,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=b*e-c*d,i=c*d-b*e;return[e/h,c/i,d/i,b/h,(e*f-d*g)/i,(c*f-b*g)/h]}}),a.save=function(){var a=this._transformMatrix;this._transformStack.push(a),this._transformMatrix=a.slice(0,6),this._originalSave()},a.restore=function(){var a=this._transformStack.pop();a&&(this._transformMatrix=a,this._originalRestore())},a.translate=function(a,b){var c=this._transformMatrix;c[4]=c[0]*a+c[2]*b+c[4],c[5]=c[1]*a+c[3]*b+c[5],this._originalTranslate(a,b)},a.scale=function(a,b){var c=this._transformMatrix;c[0]=c[0]*a,c[1]=c[1]*a,c[2]=c[2]*b,c[3]=c[3]*b,this._originalScale(a,b)},a.transform=function(b,c,d,e,f,g){var h=this._transformMatrix;this._transformMatrix=[h[0]*b+h[2]*c,h[1]*b+h[3]*c,h[0]*d+h[2]*e,h[1]*d+h[3]*e,h[0]*f+h[2]*g+h[4],h[1]*f+h[3]*g+h[5]],a._originalTransform(b,c,d,e,f,g)},a.setTransform=function(b,c,d,e,f,g){this._transformMatrix=[b,c,d,e,f,g],a._originalSetTransform(b,c,d,e,f,g)},a.rotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this._transformMatrix;this._transformMatrix=[d[0]*b+d[2]*c,d[1]*b+d[3]*c,d[0]*-c+d[2]*b,d[1]*-c+d[3]*b,d[4],d[5]],this._originalRotate(a)})}function v(a){var b,c,d,e,f=1e3,g=a.width,h=a.height,i=g+1,j=new Uint8Array(i*(h+1)),k=new Uint8Array([0,2,4,0,1,0,5,4,8,10,0,8,0,2,1,0]),l=g+7&-8,m=a.data,n=new Uint8Array(l*h),o=0;for(b=0,e=m.length;e>b;b++)for(var p=128,q=m[b];p>0;)n[o++]=q&p?0:255,p>>=1;
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
var t=new Int32Array([0,i,-1,0,-i,0,0,0,1]),u=[];for(b=0;r&&h>=b;b++){for(var v=b*i,w=v+g;w>v&&!j[v];)v++;if(v!==w){var x,y=[v%i,b],z=j[v],A=v;do{var B=t[z];do v+=B;while(!j[v]);x=j[v],5!==x&&10!==x?(
// set new direction
z=x,
// delete mark
j[v]=0):(// type is 5 or 10, ie, a crossing
// set new direction
z=x&51*z>>4,
// set new type for "future hit"
j[v]&=z>>2|z<<2),y.push(v%i),y.push(v/i|0),--r}while(A!==v);u.push(y),--b}}var C=function(a){a.save(),
// the path shall be painted in [0..1]x[0..1] space
a.scale(1/g,-1/h),a.translate(0,-h),a.beginPath();for(var b=0,c=u.length;c>b;b++){var d=u[b];a.moveTo(d[0],d[1]);for(var e=2,f=d.length;f>e;e+=2)a.lineTo(d[e],d[e+1])}a.fill(),a.beginPath(),a.restore()};return C}function w(a){var b=ha[a[0]];return b||c("Unknown IR type: "+a[0]),b.fromIR(a)}var x="undefined"==typeof window?this:window,y="undefined"==typeof window,z=[.001,0,0,.001,0,0],A={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},B={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},C={WIDGET:1,TEXT:2,LINK:3};
// The global PDFJS object exposes the API
// In production, it will be declared outside a global wrapper
// In development, it will be declared here
x.PDFJS||(x.PDFJS={}),x.PDFJS.pdfBug=!1,PDFJS.VERBOSITY_LEVELS={errors:0,warnings:1,infos:5};
// All the possible operations for an operator list.
var D=PDFJS.OPS={
// Intentionally start from 1 so it is easy to spot bad operators that will be
// 0's.
dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},E=PDFJS.UNSUPPORTED_FEATURES={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},F=PDFJS.UnsupportedManager=function(){var a=[];return{listen:function(b){a.push(b)},notify:function(c){b('Unsupported feature "'+c+'"');for(var d=0,e=a.length;e>d;d++)a[d](c)}}}();PDFJS.isValidUrl=g,PDFJS.shadow=h;var G=PDFJS.PasswordResponses={NEED_PASSWORD:1,INCORRECT_PASSWORD:2},H=function(){function a(a,b){this.name="PasswordException",this.message=a,this.code=b}return a.prototype=new Error,a.constructor=a,a}();PDFJS.PasswordException=H;var I=function(){function a(a,b){this.name="UnknownErrorException",this.message=a,this.details=b}return a.prototype=new Error,a.constructor=a,a}();PDFJS.UnknownErrorException=I;var J=function(){function a(a){this.name="InvalidPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}();PDFJS.InvalidPDFException=J;var K=function(){function a(a){this.name="MissingPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}();PDFJS.MissingPDFException=K;var L=function(){function a(a,b){this.name="UnexpectedResponseException",this.message=a,this.status=b}return a.prototype=new Error,a.constructor=a,a}();PDFJS.UnexpectedResponseException=L;(function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="NotImplementedException",a.constructor=a,a})(),function(){function a(a,b){this.begin=a,this.end=b,this.message="Missing data ["+a+", "+b+")"}return a.prototype=new Error,a.prototype.name="MissingDataException",a.constructor=a,a}(),function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="XRefParseException",a.constructor=a,a}();Object.defineProperty(PDFJS,"isLittleEndian",{configurable:!0,get:function(){return h(PDFJS,"isLittleEndian",l())}}),Object.defineProperty(PDFJS,"hasCanvasTypedArrays",{configurable:!0,get:function(){return h(PDFJS,"hasCanvasTypedArrays",m())}});var M=function(){function a(a,b){this.buffer=a,this.byteLength=a.length,this.length=void 0===b?this.byteLength>>2:b,c(this.length)}function b(a){return{get:function(){var b=this.buffer,c=a<<2;return(b[c]|b[c+1]<<8|b[c+2]<<16|b[c+3]<<24)>>>0},set:function(b){var c=this.buffer,d=a<<2;c[d]=255&b,c[d+1]=b>>8&255,c[d+2]=b>>16&255,c[d+3]=b>>>24&255}}}function c(c){for(;c>d;)Object.defineProperty(a.prototype,d,b(d)),d++}a.prototype=Object.create(null);var d=0;return a}(),N=[1,0,0,1,0,0],O=PDFJS.Util=function(){function a(){}var b=["rgb(",0,",",0,",",0,")"];
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
return b=a.normalizeRect(b),c=a.normalizeRect(c),e[0]===b[0]&&e[1]===c[0]||e[0]===c[0]&&e[1]===b[0]?(g[0]=e[1],g[2]=e[2],f[0]===b[1]&&f[1]===c[1]||f[0]===c[1]&&f[1]===b[1]?(g[1]=f[1],g[3]=f[2],g):!1):!1},a.sign=function(a){return 0>a?-1:1},a.appendToArray=function(a,b){Array.prototype.push.apply(a,b)},a.prependToArray=function(a,b){Array.prototype.unshift.apply(a,b)},a.extendObj=function(a,b){for(var c in b)a[c]=b[c]},a.getInheritableProperty=function(a,b){for(;a&&!a.has(b);)a=a.get("Parent");return a?a.get(b):null},a.inherit=function(a,b,c){a.prototype=Object.create(b.prototype),a.prototype.constructor=a;for(var d in c)a.prototype[d]=c[d]},a.loadScript=function(a,b){var c=document.createElement("script"),d=!1;c.setAttribute("src",a),b&&(c.onload=function(){d||b(),d=!0}),document.getElementsByTagName("head")[0].appendChild(c)},a}();PDFJS.PageViewport=function(){/**
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
convertToViewportPoint:function(a,b){return O.applyTransform([a,b],this.transform)},/**
     * Converts PDF rectangle to the viewport coordinates.
     * @param rect {Array} xMin, yMin, xMax and yMax coordinates.
     * @returns {Array} Contains corresponding coordinates of the rectangle
     * in the viewport coordinate space.
     * @see {@link convertToViewportPoint}
     */
convertToViewportRectangle:function(a){var b=O.applyTransform([a[0],a[1]],this.transform),c=O.applyTransform([a[2],a[3]],this.transform);return[b[0],b[1],c[0],c[1]]},/**
     * Converts viewport coordinates to the PDF location. For examples, useful
     * for converting canvas pixel location into PDF one.
     * @param x {number} X coordinate.
     * @param y {number} Y coordinate.
     * @returns {Object} Object that contains 'x' and 'y' properties of the
     * point in the PDF coordinate space.
     * @see {@link convertToViewportPoint}
     */
convertToPdfPoint:function(a,b){return O.applyInverseTransform([a,b],this.transform)}},a}();PDFJS.createPromiseCapability=q,/**
 * Polyfill for Promises:
 * The following promise implementation tries to generally implement the
 * Promise/A+ spec. Some notable differences from other promise libaries are:
 * - There currently isn't a seperate deferred and promise object.
 * - Unhandled rejections eventually show an error if they aren't handled.
 *
 * Based off of the work in:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=810490
 */
function(){function a(a){this._status=c,this._handlers=[];try{a.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(b){this._reject(b)}}if(x.Promise)
// Promises existing in the DOM/Worker, checking presence of all/resolve
return"function"!=typeof x.Promise.all&&(x.Promise.all=function(a){var b,c,d=0,e=[],f=new x.Promise(function(a,d){b=a,c=d});return a.forEach(function(a,f){d++,a.then(function(a){e[f]=a,d--,0===d&&b(e)},c)}),0===d&&b(e),f}),"function"!=typeof x.Promise.resolve&&(x.Promise.resolve=function(a){return new x.Promise(function(b){b(a)})}),"function"!=typeof x.Promise.reject&&(x.Promise.reject=function(a){return new x.Promise(function(b,c){c(a)})}),void("function"!=typeof x.Promise.prototype["catch"]&&(x.Promise.prototype["catch"]=function(a){return x.Promise.prototype.then(void 0,a)}));var c=0,d=1,e=2,f=500,g={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(a){a._status!==c&&(this.handlers=this.handlers.concat(a._handlers),a._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var a=1,b=Date.now()+a;this.handlers.length>0;){var c=this.handlers.shift(),f=c.thisPromise._status,g=c.thisPromise._value;try{f===d?"function"==typeof c.onResolve&&(g=c.onResolve(g)):"function"==typeof c.onReject&&(g=c.onReject(g),f=d,c.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(c.thisPromise))}catch(h){f=e,g=h}if(c.nextPromise._updateStatus(f,g),Date.now()>=b)break}return this.handlers.length>0?void setTimeout(this.runHandlers.bind(this),0):void(this.running=!1)},addUnhandledRejection:function(a){this.unhandledRejections.push({promise:a,time:Date.now()}),this.scheduleRejectionCheck()},removeUnhandeledRejection:function(a){a._unhandledRejection=!1;for(var b=0;b<this.unhandledRejections.length;b++)this.unhandledRejections[b].promise===a&&(this.unhandledRejections.splice(b),b--)},scheduleRejectionCheck:function(){this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){this.pendingRejectionCheck=!1;for(var a=Date.now(),c=0;c<this.unhandledRejections.length;c++)if(a-this.unhandledRejections[c].time>f){var d=this.unhandledRejections[c].promise._value,e="Unhandled rejection: "+d;d.stack&&(e+="\n"+d.stack),b(e),this.unhandledRejections.splice(c),c--}this.unhandledRejections.length&&this.scheduleRejectionCheck()}.bind(this),f))}};/**
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
a.reject=function(b){return new a(function(a,c){c(b)})},a.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(b,c){if(this._status!==d&&this._status!==e){if(b===d&&a.isPromise(c))return void c.then(this._updateStatus.bind(this,d),this._updateStatus.bind(this,e));this._status=b,this._value=c,b===e&&0===this._handlers.length&&(this._unhandledRejection=!0,g.addUnhandledRejection(this)),g.scheduleHandlers(this)}},_resolve:function(a){this._updateStatus(d,a)},_reject:function(a){this._updateStatus(e,a)},then:function(b,c){var d=new a(function(a,b){this.resolve=a,this.reject=b});return this._handlers.push({thisPromise:this,onResolve:b,onReject:c,nextPromise:d}),g.scheduleHandlers(this),d},"catch":function(a){return this.then(void 0,a)}},x.Promise=a}();var P=function(){function a(a,b,c){for(;a.length<c;)a+=b;return a}function c(){this.started={},this.times=[],this.enabled=!0}return c.prototype={time:function(a){this.enabled&&(a in this.started&&b("Timer is already running for "+a),this.started[a]=Date.now())},timeEnd:function(a){this.enabled&&(a in this.started||b("Timer has not been started for "+a),this.times.push({name:a,start:this.started[a],end:Date.now()}),
// Remove timer from started so it can be called again.
delete this.started[a])},toString:function(){var b,c,d=this.times,e="",f=0;for(b=0,c=d.length;c>b;++b){var g=d[b].name;g.length>f&&(f=g.length)}for(b=0,c=d.length;c>b;++b){var h=d[b],i=h.end-h.start;e+=a(h.name," ",f)+" "+i+"ms\n"}return e}},c}();PDFJS.createBlob=function(a,b){if("undefined"!=typeof Blob)return new Blob([a],{type:b});
// Blob builder is deprecated in FF14 and removed in FF18.
var c=new MozBlobBuilder;return c.append(a),c.getBlob(b)},PDFJS.createObjectURL=function(){
// Blob/createObjectURL is not available, falling back to data schema.
var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return function(b,c){if(!PDFJS.disableCreateObjectURL&&"undefined"!=typeof URL&&URL.createObjectURL){var d=PDFJS.createBlob(b,c);return URL.createObjectURL(d)}for(var e="data:"+c+";base64,",f=0,g=b.length;g>f;f+=3){var h=255&b[f],i=255&b[f+1],j=255&b[f+2],k=h>>2,l=(3&h)<<4|i>>4,m=g>f+1?(15&i)<<2|j>>6:64,n=g>f+2?63&j:64;e+=a[k]+a[l]+a[m]+a[n]}return e}}(),r.prototype={on:function(a,b,d){var e=this.actionHandler;e[a]&&c('There is already an actionName called "'+a+'"'),e[a]=[b,d]},/**
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
sendWithPromise:function(a,b,c){var d=this.callbackIndex++,e={action:a,data:b,callbackId:d},f=q();this.callbacksCapabilities[d]=f;try{this.postMessage(e,c)}catch(g){f.reject(g)}return f.promise},/**
   * Sends raw message to the comObj.
   * @private
   * @param message {Object} Raw message.
   * @param transfers List of transfers/ArrayBuffers, or undefined.
   */
postMessage:function(a,b){b&&this.postMessageTransfers?this.comObj.postMessage(a,b):this.comObj.postMessage(a)}},/**
 * The maximum allowed image size in total pixels e.g. width * height. Images
 * above this value will not be drawn. Use -1 for no limit.
 * @var {number}
 */
PDFJS.maxImageSize=void 0===PDFJS.maxImageSize?-1:PDFJS.maxImageSize,/**
 * The url of where the predefined Adobe CMaps are located. Include trailing
 * slash.
 * @var {string}
 */
PDFJS.cMapUrl=void 0===PDFJS.cMapUrl?null:PDFJS.cMapUrl,/**
 * Specifies if CMaps are binary packed.
 * @var {boolean}
 */
PDFJS.cMapPacked=void 0===PDFJS.cMapPacked?!1:PDFJS.cMapPacked,/**
 * By default fonts are converted to OpenType fonts and loaded via font face
 * rules. If disabled, the font will be rendered using a built in font renderer
 * that constructs the glyphs with primitive path commands.
 * @var {boolean}
 */
PDFJS.disableFontFace=void 0===PDFJS.disableFontFace?!1:PDFJS.disableFontFace,/**
 * Path for image resources, mainly for annotation icons. Include trailing
 * slash.
 * @var {string}
 */
PDFJS.imageResourcesPath=void 0===PDFJS.imageResourcesPath?"":PDFJS.imageResourcesPath,/**
 * Disable the web worker and run all code on the main thread. This will happen
 * automatically if the browser doesn't support workers or sending typed arrays
 * to workers.
 * @var {boolean}
 */
PDFJS.disableWorker=void 0===PDFJS.disableWorker?!1:PDFJS.disableWorker,/**
 * Path and filename of the worker file. Required when the worker is enabled in
 * development mode. If unspecified in the production build, the worker will be
 * loaded based on the location of the pdf.js file.
 * @var {string}
 */
PDFJS.workerSrc=void 0===PDFJS.workerSrc?null:PDFJS.workerSrc,/**
 * Disable range request loading of PDF files. When enabled and if the server
 * supports partial content requests then the PDF will be fetched in chunks.
 * Enabled (false) by default.
 * @var {boolean}
 */
PDFJS.disableRange=void 0===PDFJS.disableRange?!1:PDFJS.disableRange,/**
 * Disable streaming of PDF file data. By default PDF.js attempts to load PDF
 * in chunks. This default behavior can be disabled.
 * @var {boolean}
 */
PDFJS.disableStream=void 0===PDFJS.disableStream?!1:PDFJS.disableStream,/**
 * Disable pre-fetching of PDF file data. When range requests are enabled PDF.js
 * will automatically keep fetching more data even if it isn't needed to display
 * the current page. This default behavior can be disabled.
 *
 * NOTE: It is also necessary to disable streaming, see above,
 *       in order for disabling of pre-fetching to work correctly.
 * @var {boolean}
 */
PDFJS.disableAutoFetch=void 0===PDFJS.disableAutoFetch?!1:PDFJS.disableAutoFetch,/**
 * Enables special hooks for debugging PDF.js.
 * @var {boolean}
 */
PDFJS.pdfBug=void 0===PDFJS.pdfBug?!1:PDFJS.pdfBug,/**
 * Enables transfer usage in postMessage for ArrayBuffers.
 * @var {boolean}
 */
PDFJS.postMessageTransfers=void 0===PDFJS.postMessageTransfers?!0:PDFJS.postMessageTransfers,/**
 * Disables URL.createObjectURL usage.
 * @var {boolean}
 */
PDFJS.disableCreateObjectURL=void 0===PDFJS.disableCreateObjectURL?!1:PDFJS.disableCreateObjectURL,/**
 * Disables WebGL usage.
 * @var {boolean}
 */
PDFJS.disableWebGL=void 0===PDFJS.disableWebGL?!0:PDFJS.disableWebGL,/**
 * Disables fullscreen support, and by extension Presentation Mode,
 * in browsers which support the fullscreen API.
 * @var {boolean}
 */
PDFJS.disableFullscreen=void 0===PDFJS.disableFullscreen?!1:PDFJS.disableFullscreen,/**
 * Enables CSS only zooming.
 * @var {boolean}
 */
PDFJS.useOnlyCssZoom=void 0===PDFJS.useOnlyCssZoom?!1:PDFJS.useOnlyCssZoom,/**
 * Controls the logging level.
 * The constants from PDFJS.VERBOSITY_LEVELS should be used:
 * - errors
 * - warnings [default]
 * - infos
 * @var {number}
 */
PDFJS.verbosity=void 0===PDFJS.verbosity?PDFJS.VERBOSITY_LEVELS.warnings:PDFJS.verbosity,/**
 * The maximum supported canvas size in total pixels e.g. width * height.
 * The default value is 4096 * 4096. Use -1 for no limit.
 * @var {number}
 */
PDFJS.maxCanvasPixels=void 0===PDFJS.maxCanvasPixels?16777216:PDFJS.maxCanvasPixels,/**
 * Opens external links in a new window if enabled. The default behavior opens
 * external links in the PDF.js window.
 * @var {boolean}
 */
PDFJS.openExternalLinksInNewWindow=void 0===PDFJS.openExternalLinksInNewWindow?!1:PDFJS.openExternalLinksInNewWindow,/**
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
PDFJS.getDocument=function(a,b,d,e){var g=new Q;
// Support of the obsolete arguments (for compatibility with API v1.0)
b&&(b instanceof R||(
// Not a PDFDataRangeTransport instance, trying to add missing properties.
b=Object.create(b),b.length=a.length,b.initialData=a.initialData),a=Object.create(a),a.range=b),g.onPassword=d||null,g.onProgress=e||null;var h,i,k;"string"==typeof a?k={url:a}:p(a)?k={data:a}:a instanceof R?k={range:a}:("object"!=typeof a&&c("Invalid parameter in getDocument, need either Uint8Array, string or a parameter object"),a.url||a.data||a.range||c("Invalid parameter object: need either .data, .range or .url"),k=a);var l={};for(var m in k)if("url"!==m||"undefined"==typeof window){if("range"!==m)if("data"!==m||k[m]instanceof Uint8Array)l[m]=k[m];else{
// Converting string or array-like data to Uint8Array.
var n=k[m];"string"==typeof n?l[m]=j(n):"object"!=typeof n||null===n||isNaN(n.length)?c("Invalid PDF binary data: either typed array, string or array-like object is expected in the data property."):l[m]=new Uint8Array(n)}}else
// The full path is required in the 'url' field.
l[m]=f(window.location.href,k[m]);return h=q(),i=new U(h,k.range),h.promise.then(function(){i.fetchDocument(g,l)}),g};/**
 * PDF document loading operation.
 * @class
 */
var Q=function(){/** @constructs PDFDocumentLoadingTask */
function a(){this._capability=q(),/**
     * Callback to request a password if wrong or no password was provided.
     * The callback receives two parameters: function that needs to be called
     * with new password and reason (see {PasswordResponses}).
     */
this.onPassword=null,/**
     * Callback to be able to monitor the loading progress of the PDF file
     * (necessary to implement e.g. a loading bar). The callback receives
     * an {Object} with the properties: {number} loaded and {number} total.
     */
this.onProgress=null}/** @lends PDFDocumentLoadingTask.prototype */
return a.prototype={/**
     * @return {Promise}
     */
get promise(){return this._capability.promise},
// TODO add cancel or abort method
/**
     * Registers callbacks to indicate the document loading completion.
     *
     * @param {function} onFulfilled The callback for the loading completion.
     * @param {function} onRejected The callback for the loading failure.
     * @return {Promise} A promise that is resolved after the onFulfilled or
     *                   onRejected callback.
     */
then:function(a,b){return this.promise.then.apply(this.promise,arguments)}},a}(),R=function(){/**
   * @constructs PDFDataRangeTransport
   * @param {number} length
   * @param {Uint8Array} initialData
   */
function a(a,b){this.length=a,this.initialData=b,this._rangeListeners=[],this._progressListeners=[],this._progressiveReadListeners=[],this._readyCapability=q()}/** @lends PDFDataRangeTransport.prototype */
return a.prototype={addRangeListener:function(a){this._rangeListeners.push(a)},addProgressListener:function(a){this._progressListeners.push(a)},addProgressiveReadListener:function(a){this._progressiveReadListeners.push(a)},onDataRange:function(a,b){for(var c=this._rangeListeners,d=0,e=c.length;e>d;++d)c[d](a,b)},onDataProgress:function(a){this._readyCapability.promise.then(function(){for(var b=this._progressListeners,c=0,d=b.length;d>c;++c)b[c](a)}.bind(this))},onDataProgressiveRead:function(a){this._readyCapability.promise.then(function(){for(var b=this._progressiveReadListeners,c=0,d=b.length;d>c;++c)b[c](a)}.bind(this))},transportReady:function(){this._readyCapability.resolve()},requestDataRange:function(a,b){throw new Error("Abstract method PDFDataRangeTransport.requestDataRange")}},a}();PDFJS.PDFDataRangeTransport=R;/**
 * Proxy to a PDFDocument in the worker thread. Also, contains commonly used
 * properties that can be read synchronously.
 * @class
 */
var S=function(){function a(a,b){this.pdfInfo=a,this.transport=b}/** @lends PDFDocumentProxy.prototype */
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
     *   color: rgb array,
     *   dest: dest obj,
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
destroy:function(){this.transport.destroy()}},a}(),T=function(){function a(a,b,c){this.pageIndex=a,this.pageInfo=b,this.transport=c,this.stats=new P,this.stats.enabled=!!x.PDFJS.enableStats,this.commonObjs=c.commonObjs,this.objs=new V,this.cleanupAfterRender=!1,this.pendingDestroy=!1,this.intentStates={}}/** @lends PDFPageProxy.prototype */
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
     * @return {PDFJS.PageViewport} Contains 'width' and 'height' properties
     * along with transforms required for rendering.
     */
getViewport:function(a,b){return arguments.length<2&&(b=this.rotate),new PDFJS.PageViewport(this.view,a,b,0,0)},/**
     * @return {Promise} A promise that is resolved with an {Array} of the
     * annotation objects.
     */
getAnnotations:function(){if(this.annotationsPromise)return this.annotationsPromise;var a=this.transport.getAnnotations(this.pageIndex);return this.annotationsPromise=a,a},/**
     * Begins the process of rendering a page to the desired context.
     * @param {RenderParameters} params Page render parameters.
     * @return {RenderTask} An object that contains the promise, which
     *                      is resolved when the page finishes rendering.
     */
render:function(a){function b(a){var b=e.renderTasks.indexOf(f);b>=0&&e.renderTasks.splice(b,1),h.cleanupAfterRender&&(h.pendingDestroy=!0),h._tryDestroy(),a?f.capability.reject(a):f.capability.resolve(),c.timeEnd("Rendering"),c.timeEnd("Overall")}var c=this.stats;c.time("Overall"),
// If there was a pending destroy cancel it so no cleanup happens during
// this call to render.
this.pendingDestroy=!1;var d="print"===a.intent?"print":"display";this.intentStates[d]||(this.intentStates[d]={});var e=this.intentStates[d];
// If there's no displayReadyCapability yet, then the operatorList
// was never requested before. Make the request and create the promise.
e.displayReadyCapability||(e.receivingOperatorList=!0,e.displayReadyCapability=q(),e.operatorList={fnArray:[],argsArray:[],lastChunk:!1},this.stats.time("Page Request"),this.transport.messageHandler.send("RenderPageRequest",{pageIndex:this.pageNumber-1,intent:d}));var f=new X(b,a,this.objs,this.commonObjs,e.operatorList,this.pageNumber);e.renderTasks||(e.renderTasks=[]),e.renderTasks.push(f);var g=f.task;
// Obsolete parameter support
a.continueCallback&&(g.onContinue=a.continueCallback);var h=this;return e.displayReadyCapability.promise.then(function(a){return h.pendingDestroy?void b():(c.time("Rendering"),f.initalizeGraphics(a),void f.operatorListChanged())},function(a){b(a)}),g},/**
     * @return {Promise} A promise resolved with an {@link PDFOperatorList}
     * object that represents page's operator list.
     */
getOperatorList:function(){function a(){c.operatorList.lastChunk&&c.opListReadCapability.resolve(c.operatorList)}var b="oplist";this.intentStates[b]||(this.intentStates[b]={});var c=this.intentStates[b];if(!c.opListReadCapability){var d={};d.operatorListChanged=a,c.receivingOperatorList=!0,c.opListReadCapability=q(),c.renderTasks=[],c.renderTasks.push(d),c.operatorList={fnArray:[],argsArray:[],lastChunk:!1},this.transport.messageHandler.send("RenderPageRequest",{pageIndex:this.pageIndex,intent:b})}return c.opListReadCapability.promise},/**
     * @return {Promise} That is resolved a {@link TextContent}
     * object that represent the page text content.
     */
getTextContent:function(){return this.transport.messageHandler.sendWithPromise("GetTextContent",{pageIndex:this.pageNumber-1})},/**
     * Destroys resources allocated by the page.
     */
destroy:function(){this.pendingDestroy=!0,this._tryDestroy()},/**
     * For internal use only. Attempts to clean up if rendering is in a state
     * where that's possible.
     * @ignore
     */
_tryDestroy:function(){this.pendingDestroy&&!Object.keys(this.intentStates).some(function(a){var b=this.intentStates[a];return 0!==b.renderTasks.length||b.receivingOperatorList},this)&&(Object.keys(this.intentStates).forEach(function(a){delete this.intentStates[a]},this),this.objs.clear(),this.annotationsPromise=null,this.pendingDestroy=!1)},/**
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
for(e.operatorList.lastChunk=a.lastChunk,c=0;c<e.renderTasks.length;c++)e.renderTasks[c].operatorListChanged();a.lastChunk&&(e.receivingOperatorList=!1,this._tryDestroy())}},a}(),U=function(){function d(b,d){
// If worker support isn't disabled explicit and the browser has worker
// support, create a new web worker and test if it/the browser fullfills
// all requirements to run parts of pdf.js in a web worker.
// Right now, the requirement is, that an Uint8Array is still an Uint8Array
// as it arrives on the worker. Chrome added this with version 15.
if(this.pdfDataRangeTransport=d,this.workerInitializedCapability=b,this.commonObjs=new V,this.loadingTask=null,this.pageCache=[],this.pagePromises=[],this.downloadInfoCapability=q(),!x.PDFJS.disableWorker&&"undefined"!=typeof Worker){var e=PDFJS.workerSrc;e||c("No PDFJS.workerSrc specified");try{
// Some versions of FF can't create a worker on localhost, see:
// https://bugzilla.mozilla.org/show_bug.cgi?id=683280
var f=new Worker(e),g=new r("main",f);this.messageHandler=g,g.on("test",function(a){var c=a&&a.supportTypedArray;c?(this.worker=f,a.supportTransfers||(PDFJS.postMessageTransfers=!1),this.setupMessageHandler(g),b.resolve()):this.setupFakeWorker()}.bind(this));var h=new Uint8Array([PDFJS.postMessageTransfers?255:0]);
// Some versions of Opera throw a DATA_CLONE_ERR on serializing the
// typed array. Also, checking if we can use transfers.
try{g.send("test",h,[h.buffer])}catch(i){a("Cannot use postMessage transfers"),h[0]=0,g.send("test",h)}return}catch(j){a("The worker has been disabled.")}}
// Either workers are disabled, not supported or have thrown an exception.
// Thus, we fallback to a faked worker.
this.setupFakeWorker()}return d.prototype={destroy:function(){this.pageCache=[],this.pagePromises=[];var a=this;this.messageHandler.sendWithPromise("Terminate",null).then(function(){ka.clear(),a.worker&&a.worker.terminate()})},setupFakeWorker:function(){x.PDFJS.disableWorker=!0,PDFJS.fakeWorkerFilesLoadedCapability||(PDFJS.fakeWorkerFilesLoadedCapability=q(),
// In the developer build load worker_loader which in turn loads all the
// other files and resolves the promise. In production only the
// pdf.worker.js file is needed.
O.loadScript(PDFJS.workerSrc,function(){PDFJS.fakeWorkerFilesLoadedCapability.resolve()})),PDFJS.fakeWorkerFilesLoadedCapability.promise.then(function(){b("Setting up fake worker.");
// If we don't use a worker, just post/sendMessage to the main thread.
var a={postMessage:function(b){a.onmessage({data:b})},terminate:function(){}},c=new r("main",a);this.setupMessageHandler(c),
// If the main thread is our worker, setup the handling for the messages
// the main thread sends to it self.
PDFJS.WorkerMessageHandler.setup(c),this.workerInitializedCapability.resolve()}.bind(this))},setupMessageHandler:function(a){function d(b){a.send("UpdatePassword",b)}this.messageHandler=a;var e=this.pdfDataRangeTransport;e&&(e.addRangeListener(function(b,c){a.send("OnDataRange",{begin:b,chunk:c})}),e.addProgressListener(function(b){a.send("OnDataProgress",{loaded:b})}),e.addProgressiveReadListener(function(b){a.send("OnDataRange",{chunk:b})}),a.on("RequestDataRange",function(a){e.requestDataRange(a.begin,a.end)},this)),a.on("GetDoc",function(a){var b=a.pdfInfo;this.numPages=a.pdfInfo.numPages;var c=new S(b,this);this.pdfDocument=c,this.loadingTask._capability.resolve(c)},this),a.on("NeedPassword",function(a){var b=this.loadingTask;return b.onPassword?b.onPassword(d,G.NEED_PASSWORD):void b._capability.reject(new H(a.message,a.code))},this),a.on("IncorrectPassword",function(a){var b=this.loadingTask;return b.onPassword?b.onPassword(d,G.INCORRECT_PASSWORD):void b._capability.reject(new H(a.message,a.code))},this),a.on("InvalidPDF",function(a){this.loadingTask._capability.reject(new J(a.message))},this),a.on("MissingPDF",function(a){this.loadingTask._capability.reject(new K(a.message))},this),a.on("UnexpectedResponse",function(a){this.loadingTask._capability.reject(new L(a.message,a.status))},this),a.on("UnknownError",function(a){this.loadingTask._capability.reject(new I(a.message,a.details))},this),a.on("DataLoaded",function(a){this.downloadInfoCapability.resolve(a)},this),a.on("PDFManagerReady",function(a){this.pdfDataRangeTransport&&this.pdfDataRangeTransport.transportReady()},this),a.on("StartRenderPage",function(a){var b=this.pageCache[a.pageIndex];b.stats.timeEnd("Page Request"),b._startRenderPage(a.transparency,a.intent)},this),a.on("RenderPageChunk",function(a){var b=this.pageCache[a.pageIndex];b._renderPageChunk(a.operatorList,a.intent)},this),a.on("commonobj",function(a){var c=a[0],d=a[1];if(!this.commonObjs.hasData(c))switch(d){case"Font":var e,f=a[2];if("error"in f){var g=f.error;b("Error during font loading: "+g),this.commonObjs.resolve(c,g);break}e=new la(f),ka.bind([e],function(a){this.commonObjs.resolve(c,e)}.bind(this));break;case"FontPath":this.commonObjs.resolve(c,a[2]);break;default:g("Got unknown common object type "+d)}},this),a.on("obj",function(a){var b,d=a[0],e=a[1],f=a[2],g=this.pageCache[e];if(!g.objs.hasData(d))switch(f){case"JpegStream":b=a[3],s(d,b,g.objs);break;case"Image":b=a[3],g.objs.resolve(d,b);
// heuristics that will allow not to store large data
var h=8e6;b&&"data"in b&&b.data.length>h&&(g.cleanupAfterRender=!0);break;default:c("Got unknown object type "+f)}},this),a.on("DocProgress",function(a){var b=this.loadingTask;b.onProgress&&b.onProgress({loaded:a.loaded,total:a.total})},this),a.on("PageError",function(a){var b=this.pageCache[a.pageNum-1],d=b.intentStates[a.intent];d.displayReadyCapability?d.displayReadyCapability.reject(a.error):c(a.error)},this),a.on("JpegDecode",function(a){var b=a[0],c=a[1];return 3!==c&&1!==c?Promise.reject(new Error("Only 3 components or 1 component can be returned")):new Promise(function(a,d){var e=new Image;e.onload=function(){var b=e.width,d=e.height,f=b*d,g=4*f,h=new Uint8Array(f*c),i=t(b,d),j=i.getContext("2d");j.drawImage(e,0,0);var k,l,m=j.getImageData(0,0,b,d).data;if(3===c)for(k=0,l=0;g>k;k+=4,l+=3)h[l]=m[k],h[l+1]=m[k+1],h[l+2]=m[k+2];else if(1===c)for(k=0,l=0;g>k;k+=4,l++)h[l]=m[k];a({data:h,width:b,height:d})},e.onerror=function(){d(new Error("JpegDecode failed to load image"))},e.src=b})})},fetchDocument:function(a,b){this.loadingTask=a,b.disableAutoFetch=PDFJS.disableAutoFetch,b.disableStream=PDFJS.disableStream,b.chunkedViewerLoading=!!this.pdfDataRangeTransport,this.pdfDataRangeTransport&&(b.length=this.pdfDataRangeTransport.length,b.initialData=this.pdfDataRangeTransport.initialData),this.messageHandler.send("GetDocRequest",{source:b,disableRange:PDFJS.disableRange,maxImageSize:PDFJS.maxImageSize,cMapUrl:PDFJS.cMapUrl,cMapPacked:PDFJS.cMapPacked,disableFontFace:PDFJS.disableFontFace,disableCreateObjectURL:PDFJS.disableCreateObjectURL,verbosity:PDFJS.verbosity})},getData:function(){return this.messageHandler.sendWithPromise("GetData",null)},getPage:function(a,b){if(0>=a||a>this.numPages||(0|a)!==a)return Promise.reject(new Error("Invalid page request"));var c=a-1;if(c in this.pagePromises)return this.pagePromises[c];var d=this.messageHandler.sendWithPromise("GetPage",{pageIndex:c}).then(function(a){var b=new T(c,a,this);return this.pageCache[c]=b,b}.bind(this));return this.pagePromises[c]=d,d},getPageIndex:function(a){return this.messageHandler.sendWithPromise("GetPageIndex",{ref:a})},getAnnotations:function(a){return this.messageHandler.sendWithPromise("GetAnnotations",{pageIndex:a})},getDestinations:function(){return this.messageHandler.sendWithPromise("GetDestinations",null)},getDestination:function(a){return this.messageHandler.sendWithPromise("GetDestination",{id:a})},getAttachments:function(){return this.messageHandler.sendWithPromise("GetAttachments",null)},getJavaScript:function(){return this.messageHandler.sendWithPromise("GetJavaScript",null)},getOutline:function(){return this.messageHandler.sendWithPromise("GetOutline",null)},getMetadata:function(){return this.messageHandler.sendWithPromise("GetMetadata",null).then(function(a){return{info:a[0],metadata:a[1]?new PDFJS.Metadata(a[1]):null}})},getStats:function(){return this.messageHandler.sendWithPromise("GetStats",null)},startCleanup:function(){this.messageHandler.sendWithPromise("Cleanup",null).then(function(){for(var a=0,b=this.pageCache.length;b>a;a++){var c=this.pageCache[a];c&&c.destroy()}this.commonObjs.clear(),ka.clear()}.bind(this))}},d}(),V=function(){function a(){this.objs={}}return a.prototype={/**
     * Internal function.
     * Ensures there is an object defined for `objId`.
     */
ensureObj:function(a){if(this.objs[a])return this.objs[a];var b={capability:q(),data:null,resolved:!1};return this.objs[a]=b,b},/**
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
var d=this.objs[a];
// If there isn't an object yet or the object isn't resolved, then the
// data isn't ready yet!
return d&&d.resolved||c("Requesting object that isn't resolved yet "+a),d.data},/**
     * Resolves the object `objId` with optional `data`.
     */
resolve:function(a,b){var c=this.ensureObj(a);c.resolved=!0,c.data=b,c.capability.resolve(b)},isResolved:function(a){var b=this.objs;return b[a]?b[a].resolved:!1},hasData:function(a){return this.isResolved(a)},/**
     * Returns the data of `objId` if object exists, null otherwise.
     */
getData:function(a){var b=this.objs;return b[a]&&b[a].resolved?b[a].data:null},clear:function(){this.objs={}}},a}(),W=function(){function a(a){this._internalRenderTask=a,/**
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
then:function(a,b){return this.promise.then.apply(this.promise,arguments)}},a}(),X=function(){function a(a,b,c,d,e,f){this.callback=a,this.params=b,this.objs=c,this.commonObjs=d,this.operatorListIdx=null,this.operatorList=e,this.pageNumber=f,this.running=!1,this.graphicsReadyCallback=null,this.graphicsReady=!1,this.cancelled=!1,this.capability=q(),this.task=new W(this),
// caching this-bound methods
this._continueBound=this._continue.bind(this),this._scheduleNextBound=this._scheduleNext.bind(this),this._nextBound=this._next.bind(this)}return a.prototype={initalizeGraphics:function(a){if(!this.cancelled){PDFJS.pdfBug&&"StepperManager"in x&&x.StepperManager.enabled&&(this.stepper=x.StepperManager.create(this.pageNumber-1),this.stepper.init(this.operatorList),this.stepper.nextBreakPoint=this.stepper.getNextBreakPoint());var b=this.params;this.gfx=new fa(b.canvasContext,this.commonObjs,this.objs,b.imageLayer),this.gfx.beginDrawing(b.viewport,a),this.operatorListIdx=0,this.graphicsReady=!0,this.graphicsReadyCallback&&this.graphicsReadyCallback()}},cancel:function(){this.running=!1,this.cancelled=!0,this.callback("cancelled")},operatorListChanged:function(){return this.graphicsReady?(this.stepper&&this.stepper.updateOperatorList(this.operatorList),void(this.running||this._continue())):void(this.graphicsReadyCallback||(this.graphicsReadyCallback=this._continueBound))},_continue:function(){this.running=!0,this.cancelled||(this.task.onContinue?this.task.onContinue.call(this.task,this._scheduleNextBound):this._scheduleNext())},_scheduleNext:function(){window.requestAnimationFrame(this._nextBound)},_next:function(){this.cancelled||(this.operatorListIdx=this.gfx.executeOperatorList(this.operatorList,this.operatorListIdx,this._continueBound,this.stepper),this.operatorListIdx===this.operatorList.argsArray.length&&(this.running=!1,this.operatorList.lastChunk&&(this.gfx.endDrawing(),this.callback())))}},a}(),Y=(PDFJS.Metadata=function(){function a(a){return a.replace(/>\\376\\377([^<]+)/g,function(a,b){for(var c=b.replace(/\\([0-3])([0-7])([0-7])/g,function(a,b,c,d){return String.fromCharCode(64*b+8*c+1*d)}),d="",e=0;e<c.length;e+=2){var f=256*c.charCodeAt(e)+c.charCodeAt(e+1);d+="&#x"+(65536+f).toString(16).substring(1)+";"}return">"+d})}function b(b){if("string"==typeof b){
// Ghostscript produces invalid metadata
b=a(b);var d=new DOMParser;b=d.parseFromString(b,"application/xml")}else b instanceof Document||c("Metadata: Invalid metadata object");this.metaDocument=b,this.metadata={},this.parse()}return b.prototype={parse:function(){var a=this.metaDocument,b=a.documentElement;if("rdf:rdf"!==b.nodeName.toLowerCase())for(// Wrapped in <xmpmeta>
b=b.firstChild;b&&"rdf:rdf"!==b.nodeName.toLowerCase();)b=b.nextSibling;var c=b?b.nodeName.toLowerCase():null;if(b&&"rdf:rdf"===c&&b.hasChildNodes()){var d,e,f,g,h,i,j,k=b.childNodes;for(g=0,i=k.length;i>g;g++)if(d=k[g],"rdf:description"===d.nodeName.toLowerCase())for(h=0,j=d.childNodes.length;j>h;h++)"#text"!==d.childNodes[h].nodeName.toLowerCase()&&(e=d.childNodes[h],f=e.nodeName.toLowerCase(),this.metadata[f]=e.textContent.trim())}},get:function(a){return this.metadata[a]||null},has:function(a){return"undefined"!=typeof this.metadata[a]}},b}(),16),Z=100,$=4096,_=.65,aa=!0,ba=1e3,ca=16,da=function(){var a={};return{getCanvas:function(b,c,d,e){var f;if(void 0!==a[b])f=a[b],f.canvas.width=c,f.canvas.height=d,
// reset canvas transform for emulated mozCurrentTransform, if needed
f.context.setTransform(1,0,0,1,0,0);else{var g=t(c,d),h=g.getContext("2d");e&&u(h),a[b]=f={canvas:g,context:h}}return f},clear:function(){for(var b in a){var c=a[b];
// Zeroing the width and height causes Firefox to release graphics
// resources immediately, which can greatly reduce memory consumption.
c.canvas.width=0,c.canvas.height=0,delete a[b]}}}}(),ea=function(){function a(a){
// Are soft masks and alpha values shapes or opacities?
this.alphaIsShape=!1,this.fontSize=0,this.fontSizeScale=1,this.textMatrix=N,this.textMatrixScale=1,this.fontMatrix=z,this.leading=0,
// Current point (in user coordinates)
this.x=0,this.y=0,
// Start of text line (in text coordinates)
this.lineX=0,this.lineY=0,
// Character and word spacing
this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRenderingMode=A.FILL,this.textRise=0,
// Default fore and background colors
this.fillColor="#000000",this.strokeColor="#000000",this.patternFill=!1,
// Note: fill alpha applies to all non-stroking operations
this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.activeSMask=null,// nonclonable field (see the save method below)
this.old=a}return a.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(a,b){this.x=a,this.y=b}},a}(),fa=function(){function d(a,b,c,d){this.ctx=a,this.current=new ea,this.stateStack=[],this.pendingClip=null,this.pendingEOFill=!1,this.res=null,this.xobjs=null,this.commonObjs=b,this.objs=c,this.imageLayer=d,this.groupStack=[],this.processingType3=null,
// Patterns are painted relative to the initial page/form transform, see pdf
// spec 8.7.2 NOTE 1.
this.baseTransform=null,this.baseTransformStack=[],this.groupLevel=0,this.smaskStack=[],this.smaskCounter=0,this.tempSMask=null,a&&u(a),this.cachedGetSinglePixelWidth=null}function f(a,b){if("undefined"!=typeof ImageData&&b instanceof ImageData)return void a.putImageData(b,0,0);
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
var d,e,f,g,h,i=b.height,j=b.width,k=i%ca,l=(i-k)/ca,m=0===k?l:l+1,n=a.createImageData(j,ca),o=0,p=b.data,q=n.data;
// There are multiple forms in which the pixel data can be passed, and
// imgData.kind tells us which one this is.
if(b.kind===B.GRAYSCALE_1BPP){
// Grayscale, 1 bit per pixel (i.e. black-and-white).
var r=p.byteLength,s=PDFJS.hasCanvasTypedArrays?new Uint32Array(q.buffer):new M(q),t=s.length,u=j+7>>3,v=4294967295,w=PDFJS.isLittleEndian||!PDFJS.hasCanvasTypedArrays?4278190080:255;for(e=0;m>e;e++){for(g=l>e?ca:k,d=0,f=0;g>f;f++){for(var x=r-o,y=0,z=x>u?j:8*x-7,A=-8&z,C=0,D=0;A>y;y+=8)D=p[o++],s[d++]=128&D?v:w,s[d++]=64&D?v:w,s[d++]=32&D?v:w,s[d++]=16&D?v:w,s[d++]=8&D?v:w,s[d++]=4&D?v:w,s[d++]=2&D?v:w,s[d++]=1&D?v:w;for(;z>y;y++)0===C&&(D=p[o++],C=128),s[d++]=D&C?v:w,C>>=1}
// We ran out of input. Make all remaining pixels transparent.
for(;t>d;)s[d++]=0;a.putImageData(n,0,e*ca)}}else if(b.kind===B.RGBA_32BPP){for(
// RGBA, 32-bits per pixel.
f=0,h=j*ca*4,e=0;l>e;e++)q.set(p.subarray(o,o+h)),o+=h,a.putImageData(n,0,f),f+=ca;m>e&&(h=j*k*4,q.set(p.subarray(o,o+h)),a.putImageData(n,0,f))}else if(b.kind===B.RGB_24BPP)for(
// RGB, 24-bits per pixel.
g=ca,h=j*g,e=0;m>e;e++){for(e>=l&&(g=k,h=j*g),d=0,f=h;f--;)q[d++]=p[o++],q[d++]=p[o++],q[d++]=p[o++],q[d++]=255;a.putImageData(n,0,e*ca)}else c("bad image kind: "+b.kind)}function g(a,b){for(var c=b.height,d=b.width,e=c%ca,f=(c-e)/ca,g=0===e?f:f+1,h=a.createImageData(d,ca),i=0,j=b.data,k=h.data,l=0;g>l;l++){// alpha component offset
for(var m=f>l?ca:e,n=3,o=0;m>o;o++)for(var p=0,q=0;d>q;q++){if(!p){var r=j[i++];p=128}k[n]=r&p?0:255,n+=4,p>>=1}a.putImageData(h,0,l*ca)}}function i(a,b){for(var c=["strokeStyle","fillStyle","fillRule","globalAlpha","lineWidth","lineCap","lineJoin","miterLimit","globalCompositeOperation","font"],d=0,e=c.length;e>d;d++){var f=c[d];void 0!==a[f]&&(b[f]=a[f])}void 0!==a.setLineDash?(b.setLineDash(a.getLineDash()),b.lineDashOffset=a.lineDashOffset):void 0!==a.mozDashOffset&&(b.mozDash=a.mozDash,b.mozDashOffset=a.mozDashOffset)}function j(a,b,c,d){for(var e=a.length,f=3;e>f;f+=4){var g=a[f];if(0===g)a[f-3]=b,a[f-2]=c,a[f-1]=d;else if(255>g){var h=255-g;a[f-3]=a[f-3]*g+b*h>>8,a[f-2]=a[f-2]*g+c*h>>8,a[f-1]=a[f-1]*g+d*h>>8}}}function k(a,b){for(var c=a.length,d=1/255,e=3;c>e;e+=4){var f=a[e];b[e]=b[e]*f*d|0}}function l(a,b){for(var c=a.length,d=3;c>d;d+=4){var e=77*a[d-3]+// * 0.3 / 255 * 0x10000
152*a[d-2]+// * 0.59 ....
28*a[d-1];// * 0.11 ....
b[d]=b[d]*e>>16}}function m(a,b,c,d,e,f){var g,h=!!f,i=h?f[0]:0,m=h?f[1]:0,n=h?f[2]:0;g="Luminosity"===e?l:k;for(var o=1048576,p=Math.min(d,Math.ceil(o/c)),q=0;d>q;q+=p){var r=Math.min(p,d-q),s=a.getImageData(0,q,c,r),t=b.getImageData(0,q,c,r);h&&j(s.data,i,m,n),g(s.data,t.data),a.putImageData(t,0,q)}}function p(a,b,c){var d=b.canvas,e=b.context;a.setTransform(b.scaleX,0,0,b.scaleY,b.offsetX,b.offsetY);var f=b.backdrop||null;if(ga.isEnabled){var g=ga.composeSMask(c.canvas,d,{subtype:b.subtype,backdrop:f});return a.setTransform(1,0,0,1,0,0),void a.drawImage(g,b.offsetX,b.offsetY)}m(e,c,d.width,d.height,b.subtype,f),a.drawImage(d,0,0)}
// Defines the time the executeOperatorList is going to be executing
// before it stops and shedules a continue of execution.
var q=15,r=10,s=["butt","round","square"],t=["miter","round","bevel"],x={},y={};d.prototype={beginDrawing:function(a,b){
// For pdfs that use blend modes we have to clear the canvas else certain
// blend modes can look wrong since we'd be blending with a white
// backdrop. The problem with a transparent backdrop though is we then
// don't get sub pixel anti aliasing on text, so we fill with white if
// we can.
var c=this.ctx.canvas.width,d=this.ctx.canvas.height;b?this.ctx.clearRect(0,0,c,d):(this.ctx.mozOpaque=!0,this.ctx.save(),this.ctx.fillStyle="rgb(255, 255, 255)",this.ctx.fillRect(0,0,c,d),this.ctx.restore());var e=a.transform;this.ctx.save(),this.ctx.transform.apply(this.ctx,e),this.baseTransform=this.ctx.mozCurrentTransform.slice(),this.imageLayer&&this.imageLayer.beginLayout()},executeOperatorList:function(a,b,c,d){var e=a.argsArray,f=a.fnArray,g=b||0,h=e.length;
// Sometimes the OperatorList to execute is empty.
if(h===g)return g;for(var i,j=h-g>r&&"function"==typeof c,k=j?Date.now()+q:0,l=0,m=this.commonObjs,n=this.objs;;){if(void 0!==d&&g===d.nextBreakPoint)return d.breakIt(g,c),g;if(i=f[g],i!==D.dependency)this[i].apply(this,e[g]);else for(var o=e[g],p=0,s=o.length;s>p;p++){var t=o[p],u="g"===t[0]&&"_"===t[1],v=u?m:n;
// If the promise isn't resolved yet, add the continueCallback
// to the promise and bail out.
if(!v.isResolved(t))return v.get(t,c),g}
// If the entire operatorList was executed, stop as were done.
if(g++,g===h)return g;
// If the execution took longer then a certain amount of time and
// `continueCallback` is specified, interrupt the execution.
if(j&&++l>r){if(Date.now()>k)return c(),g;l=0}}},endDrawing:function(){this.ctx.restore(),da.clear(),ga.clear(),this.imageLayer&&this.imageLayer.endLayout()},
// Graphics state
setLineWidth:function(a){this.current.lineWidth=a,this.ctx.lineWidth=a},setLineCap:function(a){this.ctx.lineCap=s[a]},setLineJoin:function(a){this.ctx.lineJoin=t[a]},setMiterLimit:function(a){this.ctx.miterLimit=a},setDash:function(a,b){var c=this.ctx;void 0!==c.setLineDash?(c.setLineDash(a),c.lineDashOffset=b):(c.mozDash=a,c.mozDashOffset=b)},setRenderingIntent:function(a){},setFlatness:function(a){},setGState:function(a){for(var c=0,d=a.length;d>c;c++){var e=a[c],f=e[0],g=e[1];switch(f){case"LW":this.setLineWidth(g);break;case"LC":this.setLineCap(g);break;case"LJ":this.setLineJoin(g);break;case"ML":this.setMiterLimit(g);break;case"D":this.setDash(g[0],g[1]);break;case"RI":this.setRenderingIntent(g);break;case"FL":this.setFlatness(g);break;case"Font":this.setFont(g[0],g[1]);break;case"CA":this.current.strokeAlpha=e[1];break;case"ca":this.current.fillAlpha=e[1],this.ctx.globalAlpha=e[1];break;case"BM":if(g&&g.name&&"Normal"!==g.name){var h=g.name.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()}).substring(1);this.ctx.globalCompositeOperation=h,this.ctx.globalCompositeOperation!==h&&b('globalCompositeOperation "'+h+'" is not supported')}else this.ctx.globalCompositeOperation="source-over";break;case"SMask":this.current.activeSMask&&this.endSMaskGroup(),this.current.activeSMask=g?this.tempSMask:null,this.current.activeSMask&&this.beginSMaskGroup(),this.tempSMask=null}}},beginSMaskGroup:function(){var a=this.current.activeSMask,b=a.canvas.width,c=a.canvas.height,d="smaskGroupAt"+this.groupLevel,e=da.getCanvas(d,b,c,!0),f=this.ctx,g=f.mozCurrentTransform;this.ctx.save();var h=e.context;h.scale(1/a.scaleX,1/a.scaleY),h.translate(-a.offsetX,-a.offsetY),h.transform.apply(h,g),i(f,h),this.ctx=h,this.setGState([["BM","Normal"],["ca",1],["CA",1]]),this.groupStack.push(f),this.groupLevel++},endSMaskGroup:function(){var a=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),p(this.ctx,this.current.activeSMask,a),this.ctx.restore()},save:function(){this.ctx.save();var a=this.current;this.stateStack.push(a),this.current=a.clone(),this.current.activeSMask=null},restore:function(){0!==this.stateStack.length&&(null!==this.current.activeSMask&&this.endSMaskGroup(),this.current=this.stateStack.pop(),this.ctx.restore(),this.cachedGetSinglePixelWidth=null)},transform:function(a,b,c,d,e,f){this.ctx.transform(a,b,c,d,e,f),this.cachedGetSinglePixelWidth=null},
// Path
constructPath:function(a,b){for(var c=this.ctx,d=this.current,e=d.x,f=d.y,g=0,h=0,i=a.length;i>g;g++)switch(0|a[g]){case D.rectangle:e=b[h++],f=b[h++];var j=b[h++],k=b[h++];0===j&&(j=this.getSinglePixelWidth()),0===k&&(k=this.getSinglePixelWidth());var l=e+j,m=f+k;this.ctx.moveTo(e,f),this.ctx.lineTo(l,f),this.ctx.lineTo(l,m),this.ctx.lineTo(e,m),this.ctx.lineTo(e,f),this.ctx.closePath();break;case D.moveTo:e=b[h++],f=b[h++],c.moveTo(e,f);break;case D.lineTo:e=b[h++],f=b[h++],c.lineTo(e,f);break;case D.curveTo:e=b[h+4],f=b[h+5],c.bezierCurveTo(b[h],b[h+1],b[h+2],b[h+3],e,f),h+=6;break;case D.curveTo2:c.bezierCurveTo(e,f,b[h],b[h+1],b[h+2],b[h+3]),e=b[h+2],f=b[h+3],h+=4;break;case D.curveTo3:e=b[h+2],f=b[h+3],c.bezierCurveTo(b[h],b[h+1],e,f,e,f),h+=4;break;case D.closePath:c.closePath()}d.setCurrentPoint(e,f)},closePath:function(){this.ctx.closePath()},stroke:function(a){a="undefined"!=typeof a?a:!0;var b=this.ctx,c=this.current.strokeColor;
// Prevent drawing too thin lines by enforcing a minimum line width.
b.lineWidth=Math.max(this.getSinglePixelWidth()*_,this.current.lineWidth),
// For stroke we want to temporarily change the global alpha to the
// stroking alpha.
b.globalAlpha=this.current.strokeAlpha,c&&c.hasOwnProperty("type")&&"Pattern"===c.type?(
// for patterns, we transform to pattern space, calculate
// the pattern, call stroke, and restore to user space
b.save(),b.strokeStyle=c.getPattern(b,this),b.stroke(),b.restore()):b.stroke(),a&&this.consumePath(),
// Restore the global alpha to the fill alpha
b.globalAlpha=this.current.fillAlpha},closeStroke:function(){this.closePath(),this.stroke()},fill:function(a){a="undefined"!=typeof a?a:!0;var b=this.ctx,c=this.current.fillColor,d=this.current.patternFill,e=!1;if(d&&(b.save(),b.fillStyle=c.getPattern(b,this),e=!0),this.pendingEOFill){if(void 0!==b.mozFillRule)b.mozFillRule="evenodd",b.fill(),b.mozFillRule="nonzero";else try{b.fill("evenodd")}catch(f){
// shouldn't really happen, but browsers might think differently
b.fill()}this.pendingEOFill=!1}else b.fill();e&&b.restore(),a&&this.consumePath()},eoFill:function(){this.pendingEOFill=!0,this.fill()},fillStroke:function(){this.fill(!1),this.stroke(!1),this.consumePath()},eoFillStroke:function(){this.pendingEOFill=!0,this.fillStroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},closeEOFillStroke:function(){this.pendingEOFill=!0,this.closePath(),this.fillStroke()},endPath:function(){this.consumePath()},
// Clipping
clip:function(){this.pendingClip=x},eoClip:function(){this.pendingClip=y},
// Text
beginText:function(){this.current.textMatrix=N,this.current.textMatrixScale=1,this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},endText:function(){var a=this.pendingTextPaths,b=this.ctx;if(void 0===a)return void b.beginPath();b.save(),b.beginPath();for(var c=0;c<a.length;c++){var d=a[c];b.setTransform.apply(b,d.transform),b.translate(d.x,d.y),d.addToPath(b,d.fontSize)}b.restore(),b.clip(),b.beginPath(),delete this.pendingTextPaths},setCharSpacing:function(a){this.current.charSpacing=a},setWordSpacing:function(a){this.current.wordSpacing=a},setHScale:function(a){this.current.textHScale=a/100},setLeading:function(a){this.current.leading=-a},setFont:function(a,d){var e=this.commonObjs.get(a),f=this.current;if(e||c("Can't find font for "+a),f.fontMatrix=e.fontMatrix?e.fontMatrix:z,
// A valid matrix needs all main diagonal elements to be non-zero
// This also ensures we bypass FF bugzilla bug #719844.
(0===f.fontMatrix[0]||0===f.fontMatrix[3])&&b("Invalid font matrix for font "+a),
// The spec for Tf (setFont) says that 'size' specifies the font 'scale',
// and in some docs this can be negative (inverted x-y axes).
0>d?(d=-d,f.fontDirection=-1):f.fontDirection=1,this.current.font=e,this.current.fontSize=d,!e.isType3Font){var g=e.loadedName||"sans-serif",h=e.black?e.bold?"bolder":"bold":e.bold?"bold":"normal",i=e.italic?"italic":"normal",j='"'+g+'", '+e.fallbackName,k=Y>d?Y:d>Z?Z:d;this.current.fontSizeScale=d/k;var l=i+" "+h+" "+k+"px "+j;this.ctx.font=l}},setTextRenderingMode:function(a){this.current.textRenderingMode=a},setTextRise:function(a){this.current.textRise=a},moveText:function(a,b){this.current.x=this.current.lineX+=a,this.current.y=this.current.lineY+=b},setLeadingMoveText:function(a,b){this.setLeading(-b),this.moveText(a,b)},setTextMatrix:function(a,b,c,d,e,f){this.current.textMatrix=[a,b,c,d,e,f],this.current.textMatrixScale=Math.sqrt(a*a+b*b),this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},nextLine:function(){this.moveText(0,this.current.leading)},paintChar:function(a,b,c){var d,e=this.ctx,f=this.current,g=f.font,h=f.textRenderingMode,i=f.fontSize/f.fontSizeScale,j=h&A.FILL_STROKE_MASK,k=!!(h&A.ADD_TO_PATH_FLAG);if((g.disableFontFace||k)&&(d=g.getPathGenerator(this.commonObjs,a)),g.disableFontFace?(e.save(),e.translate(b,c),e.beginPath(),d(e,i),(j===A.FILL||j===A.FILL_STROKE)&&e.fill(),(j===A.STROKE||j===A.FILL_STROKE)&&e.stroke(),e.restore()):((j===A.FILL||j===A.FILL_STROKE)&&e.fillText(a,b,c),(j===A.STROKE||j===A.FILL_STROKE)&&e.strokeText(a,b,c)),k){var l=this.pendingTextPaths||(this.pendingTextPaths=[]);l.push({transform:e.mozCurrentTransform,x:b,y:c,fontSize:i,addToPath:d})}},get isFontSubpixelAAEnabled(){
// Checks if anti-aliasing is enabled when scaled text is painted.
// On Windows GDI scaled fonts looks bad.
var a=document.createElement("canvas").getContext("2d");a.scale(1.5,1),a.fillText("I",0,10);for(var b=a.getImageData(0,0,10,10).data,c=!1,d=3;d<b.length;d+=4)if(b[d]>0&&b[d]<255){c=!0;break}return h(this,"isFontSubpixelAAEnabled",c)},showText:function(a){var b=this.current,c=b.font;if(c.isType3Font)return this.showType3Text(a);var d=b.fontSize;if(0!==d){var e=this.ctx,f=b.fontSizeScale,g=b.charSpacing,h=b.wordSpacing,i=b.fontDirection,j=b.textHScale*i,k=a.length,l=c.vertical,m=c.defaultVMetrics,o=d*b.fontMatrix[0],p=b.textRenderingMode===A.FILL&&!c.disableFontFace;e.save(),e.transform.apply(e,b.textMatrix),e.translate(b.x,b.y+b.textRise),i>0?e.scale(j,-1):e.scale(j,1);var q=b.lineWidth,r=b.textMatrixScale;if(0===r||0===q){var s=b.textRenderingMode&A.FILL_STROKE_MASK;(s===A.STROKE||s===A.FILL_STROKE)&&(this.cachedGetSinglePixelWidth=null,q=this.getSinglePixelWidth()*_)}else q/=r;1!==f&&(e.scale(f,f),q/=f),e.lineWidth=q;var t,u=0;for(t=0;k>t;++t){var v=a[t];if(null!==v)if(n(v))u+=-v*d*.001;else{var w,x,y,z,B=!1,C=v.fontChar,D=v.accent,E=v.width;if(l){var F,G,H;F=v.vmetric||m,G=v.vmetric?F[1]:.5*E,G=-G*o,H=F[2]*o,E=F?-F[0]:E,w=G/f,x=(u+H)/f}else w=u/f,x=0;if(c.remeasure&&E>0&&this.isFontSubpixelAAEnabled){
// some standard fonts may not have the exact width, trying to
// rescale per character
var I=1e3*e.measureText(C).width/d*f,J=E/I;B=!0,e.save(),e.scale(J,1),w/=J}p&&!D?
// common case
e.fillText(C,w,x):(this.paintChar(C,w,x),D&&(y=w+D.offset.x/f,z=x-D.offset.y/f,this.paintChar(D.fontChar,y,z)));var K=E*o+g*i;u+=K,B&&e.restore()}else
// word break
u+=i*h}l?b.y-=u*j:b.x+=u*j,e.restore()}},showType3Text:function(a){
// Type3 fonts - each glyph is a "mini-PDF"
var c,d,e,f=this.ctx,g=this.current,h=g.font,i=g.fontSize,j=g.fontDirection,k=g.charSpacing,l=g.wordSpacing,m=g.textHScale*j,o=g.fontMatrix||z,p=a.length,q=g.textRenderingMode===A.INVISIBLE;if(!q&&0!==i){for(f.save(),f.transform.apply(f,g.textMatrix),f.translate(g.x,g.y),f.scale(m,j),c=0;p>c;++c)if(d=a[c],null!==d)if(n(d)){var r=.001*-d*i;this.ctx.translate(r,0),g.x+=r*m}else{var s=h.charProcOperatorList[d.operatorListId];if(s){this.processingType3=d,this.save(),f.scale(i,i),f.transform.apply(f,o),this.executeOperatorList(s),this.restore();var t=O.applyTransform([d.width,0],o);e=t[0]*i+k,f.translate(e,0),g.x+=e*m}else b('Type3 character "'+d.operatorListId+'" is not available')}else
// word break
this.ctx.translate(l,0),g.x+=l*m;f.restore(),this.processingType3=null}},
// Type3 fonts
setCharWidth:function(a,b){},setCharWidthAndBounds:function(a,b,c,d,e,f){
// TODO According to the spec we're also suppose to ignore any operators
// that set color or include images while processing this type3 font.
this.ctx.rect(c,d,e-c,f-d),this.clip(),this.endPath()},
// Color
getColorN_Pattern:function(a){var b;if("TilingPattern"===a[0]){var c=a[1];b=new ja(a,c,this.ctx,this.objs,this.commonObjs,this.baseTransform)}else b=w(a);return b},setStrokeColorN:function(){this.current.strokeColor=this.getColorN_Pattern(arguments)},setFillColorN:function(){this.current.fillColor=this.getColorN_Pattern(arguments),this.current.patternFill=!0},setStrokeRGBColor:function(a,b,c){var d=O.makeCssRgb(a,b,c);this.ctx.strokeStyle=d,this.current.strokeColor=d},setFillRGBColor:function(a,b,c){var d=O.makeCssRgb(a,b,c);this.ctx.fillStyle=d,this.current.fillColor=d,this.current.patternFill=!1},shadingFill:function(a){var b=this.ctx;this.save();var c=w(a);b.fillStyle=c.getPattern(b,this,!0);var d=b.mozCurrentTransformInverse;if(d){var e=b.canvas,f=e.width,g=e.height,h=O.applyTransform([0,0],d),i=O.applyTransform([0,g],d),j=O.applyTransform([f,0],d),k=O.applyTransform([f,g],d),l=Math.min(h[0],i[0],j[0],k[0]),m=Math.min(h[1],i[1],j[1],k[1]),n=Math.max(h[0],i[0],j[0],k[0]),o=Math.max(h[1],i[1],j[1],k[1]);this.ctx.fillRect(l,m,n-l,o-m)}else
// HACK to draw the gradient onto an infinite rectangle.
// PDF gradients are drawn across the entire image while
// Canvas only allows gradients to be drawn in a rectangle
// The following bug should allow us to remove this.
// https://bugzilla.mozilla.org/show_bug.cgi?id=664884
this.ctx.fillRect(-1e10,-1e10,2e10,2e10);this.restore()},
// Images
beginInlineImage:function(){c("Should not call beginInlineImage")},beginImageData:function(){c("Should not call beginImageData")},paintFormXObjectBegin:function(a,b){if(this.save(),this.baseTransformStack.push(this.baseTransform),o(a)&&6===a.length&&this.transform.apply(this,a),this.baseTransform=this.ctx.mozCurrentTransform,o(b)&&4===b.length){var c=b[2]-b[0],d=b[3]-b[1];this.ctx.rect(b[0],b[1],c,d),this.clip(),this.endPath()}},paintFormXObjectEnd:function(){this.restore(),this.baseTransform=this.baseTransformStack.pop()},beginGroup:function(c){this.save();var d=this.ctx;
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
c.isolated||a("TODO: Support non-isolated groups."),
// TODO knockout - supposedly possible with the clever use of compositing
// modes.
c.knockout&&b("Knockout groups not supported.");var f=d.mozCurrentTransform;c.matrix&&d.transform.apply(d,c.matrix),e(c.bbox,"Bounding box is required.");
// Based on the current transform figure out how big the bounding box
// will actually be.
var g=O.getAxialAlignedBoundingBox(c.bbox,d.mozCurrentTransform),h=[0,0,d.canvas.width,d.canvas.height];g=O.intersect(g,h)||[0,0,0,0];
// Use ceil in case we're between sizes so we don't create canvas that is
// too small and make the canvas at least 1x1 pixels.
var j=Math.floor(g[0]),k=Math.floor(g[1]),l=Math.max(Math.ceil(g[2])-j,1),m=Math.max(Math.ceil(g[3])-k,1),n=1,o=1;l>$&&(n=l/$,l=$),m>$&&(o=m/$,m=$);var p="groupAt"+this.groupLevel;c.smask&&(
// Using two cache entries is case if masks are used one after another.
p+="_smask_"+this.smaskCounter++%2);var q=da.getCanvas(p,l,m,!0),r=q.context;
// Since we created a new canvas that is just the size of the bounding box
// we have to translate the group ctx.
r.scale(1/n,1/o),r.translate(-j,-k),r.transform.apply(r,f),c.smask?
// Saving state and cached mask to be used in setGState.
this.smaskStack.push({canvas:q.canvas,context:r,offsetX:j,offsetY:k,scaleX:n,scaleY:o,subtype:c.smask.subtype,backdrop:c.smask.backdrop}):(
// Setup the current ctx so when the group is popped we draw it at the
// right location.
d.setTransform(1,0,0,1,0,0),d.translate(j,k),d.scale(n,o)),
// The transparency group inherits all off the current graphics state
// except the blend mode, soft mask, and alpha constants.
i(d,r),this.ctx=r,this.setGState([["BM","Normal"],["ca",1],["CA",1]]),this.groupStack.push(d),this.groupLevel++},endGroup:function(a){this.groupLevel--;var b=this.ctx;this.ctx=this.groupStack.pop(),
// Turn off image smoothing to avoid sub pixel interpolation which can
// look kind of blurry for some pdfs.
void 0!==this.ctx.imageSmoothingEnabled?this.ctx.imageSmoothingEnabled=!1:this.ctx.mozImageSmoothingEnabled=!1,a.smask?this.tempSMask=this.smaskStack.pop():this.ctx.drawImage(b.canvas,0,0),this.restore()},beginAnnotations:function(){this.save(),this.current=new ea},endAnnotations:function(){this.restore()},beginAnnotation:function(a,b,c){if(this.save(),o(a)&&4===a.length){var d=a[2]-a[0],e=a[3]-a[1];this.ctx.rect(a[0],a[1],d,e),this.clip(),this.endPath()}this.transform.apply(this,b),this.transform.apply(this,c)},endAnnotation:function(){this.restore()},paintJpegXObject:function(a,c,d){var e=this.objs.get(a);if(!e)return void b("Dependent image isn't ready yet");this.save();var f=this.ctx;if(
// scale the image to the unit square
f.scale(1/c,-1/d),f.drawImage(e,0,0,e.width,e.height,0,-d,c,d),this.imageLayer){var g=f.mozCurrentTransformInverse,h=this.getCanvasPosition(0,0);this.imageLayer.appendImage({objId:a,left:h[0],top:h[1],width:c/g[0],height:d/g[3]})}this.restore()},paintImageMaskXObject:function(a){var b=this.ctx,c=a.width,d=a.height,e=this.current.fillColor,f=this.current.patternFill,h=this.processingType3;if(aa&&h&&void 0===h.compiled&&(ba>=c&&ba>=d?h.compiled=v({data:a.data,width:c,height:d}):h.compiled=null),h&&h.compiled)return void h.compiled(b);var i=da.getCanvas("maskCanvas",c,d),j=i.context;j.save(),g(j,a),j.globalCompositeOperation="source-in",j.fillStyle=f?e.getPattern(j,this):e,j.fillRect(0,0,c,d),j.restore(),this.paintInlineImageXObject(i.canvas)},paintImageMaskXObjectRepeat:function(a,b,c,d){var e=a.width,f=a.height,h=this.current.fillColor,i=this.current.patternFill,j=da.getCanvas("maskCanvas",e,f),k=j.context;k.save(),g(k,a),k.globalCompositeOperation="source-in",k.fillStyle=i?h.getPattern(k,this):h,k.fillRect(0,0,e,f),k.restore();for(var l=this.ctx,m=0,n=d.length;n>m;m+=2)l.save(),l.transform(b,0,0,c,d[m],d[m+1]),l.scale(1,-1),l.drawImage(j.canvas,0,0,e,f,0,-1,1,1),l.restore()},paintImageMaskXObjectGroup:function(a){for(var b=this.ctx,c=this.current.fillColor,d=this.current.patternFill,e=0,f=a.length;f>e;e++){var h=a[e],i=h.width,j=h.height,k=da.getCanvas("maskCanvas",i,j),l=k.context;l.save(),g(l,h),l.globalCompositeOperation="source-in",l.fillStyle=d?c.getPattern(l,this):c,l.fillRect(0,0,i,j),l.restore(),b.save(),b.transform.apply(b,h.transform),b.scale(1,-1),b.drawImage(k.canvas,0,0,i,j,0,-1,1,1),b.restore()}},paintImageXObject:function(a){var c=this.objs.get(a);return c?void this.paintInlineImageXObject(c):void b("Dependent image isn't ready yet")},paintImageXObjectRepeat:function(a,c,d,e){var f=this.objs.get(a);if(!f)return void b("Dependent image isn't ready yet");for(var g=f.width,h=f.height,i=[],j=0,k=e.length;k>j;j+=2)i.push({transform:[c,0,0,d,e[j],e[j+1]],x:0,y:0,w:g,h:h});this.paintInlineImageXObjectGroup(f,i)},paintInlineImageXObject:function(a){var b=a.width,c=a.height,d=this.ctx;this.save(),
// scale the image to the unit square
d.scale(1/b,-1/c);var e,g,h=d.mozCurrentTransformInverse,i=h[0],j=h[1],k=Math.max(Math.sqrt(i*i+j*j),1),l=h[2],m=h[3],n=Math.max(Math.sqrt(l*l+m*m),1);
// instanceof HTMLElement does not work in jsdom node.js module
if(a instanceof HTMLElement||!a.data)e=a;else{g=da.getCanvas("inlineImage",b,c);var o=g.context;f(o,a),e=g.canvas}
// Vertial or horizontal scaling shall not be more than 2 to not loose the
// pixels during drawImage operation, painting on the temporary canvas(es)
// that are twice smaller in size
for(var p=b,q=c,r="prescale1";k>2&&p>1||n>2&&q>1;){var s=p,t=q;k>2&&p>1&&(s=Math.ceil(p/2),k/=p/s),n>2&&q>1&&(t=Math.ceil(q/2),n/=q/t),g=da.getCanvas(r,s,t),o=g.context,o.clearRect(0,0,s,t),o.drawImage(e,0,0,p,q,0,0,s,t),e=g.canvas,p=s,q=t,r="prescale1"===r?"prescale2":"prescale1"}if(d.drawImage(e,0,0,p,q,0,-c,b,c),this.imageLayer){var u=this.getCanvasPosition(0,-c);this.imageLayer.appendImage({imgData:a,left:u[0],top:u[1],width:b/h[0],height:c/h[3]})}this.restore()},paintInlineImageXObjectGroup:function(a,b){var c=this.ctx,d=a.width,e=a.height,g=da.getCanvas("inlineImage",d,e),h=g.context;f(h,a);for(var i=0,j=b.length;j>i;i++){var k=b[i];if(c.save(),c.transform.apply(c,k.transform),c.scale(1,-1),c.drawImage(g.canvas,k.x,k.y,k.w,k.h,0,-1,1,1),this.imageLayer){var l=this.getCanvasPosition(k.x,k.y);this.imageLayer.appendImage({imgData:a,left:l[0],top:l[1],width:d,height:e})}c.restore()}},paintSolidColorImageMask:function(){this.ctx.fillRect(0,0,1,1)},
// Marked content
markPoint:function(a){},markPointProps:function(a,b){},beginMarkedContent:function(a){},beginMarkedContentProps:function(a,b){},endMarkedContent:function(){},
// Compatibility
beginCompat:function(){},endCompat:function(){},
// Helper functions
consumePath:function(){var a=this.ctx;if(this.pendingClip){if(this.pendingClip===y)if(void 0!==a.mozFillRule)a.mozFillRule="evenodd",a.clip(),a.mozFillRule="nonzero";else try{a.clip("evenodd")}catch(b){
// shouldn't really happen, but browsers might think differently
a.clip()}else a.clip();this.pendingClip=null}a.beginPath()},getSinglePixelWidth:function(a){if(null===this.cachedGetSinglePixelWidth){var b=this.ctx.mozCurrentTransformInverse;
// max of the current horizontal and vertical scale
this.cachedGetSinglePixelWidth=Math.sqrt(Math.max(b[0]*b[0]+b[1]*b[1],b[2]*b[2]+b[3]*b[3]))}return this.cachedGetSinglePixelWidth},getCanvasPosition:function(a,b){var c=this.ctx.mozCurrentTransform;return[c[0]*a+c[2]*b+c[4],c[1]*a+c[3]*b+c[5]]}};for(var C in D)d.prototype[D[C]]=d.prototype[C];return d}(),ga=function(){function a(a,b,c){var d=a.createShader(c);a.shaderSource(d,b),a.compileShader(d);var e=a.getShaderParameter(d,a.COMPILE_STATUS);if(!e){var f=a.getShaderInfoLog(d);throw new Error("Error during shader compilation: "+f)}return d}function b(b,c){return a(b,c,b.VERTEX_SHADER)}function c(b,c){return a(b,c,b.FRAGMENT_SHADER)}function d(a,b){for(var c=a.createProgram(),d=0,e=b.length;e>d;++d)a.attachShader(c,b[d]);a.linkProgram(c);var f=a.getProgramParameter(c,a.LINK_STATUS);if(!f){var g=a.getProgramInfoLog(c);throw new Error("Error during program linking: "+g)}return c}function e(a,b,c){a.activeTexture(c);var d=a.createTexture();
// Set the parameters so we can render any size image.
// Upload the image into the texture.
return a.bindTexture(a.TEXTURE_2D,d),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b),d}function f(){m||(n=document.createElement("canvas"),m=n.getContext("webgl",{premultipliedalpha:!1}))}function g(){var a,e;f(),a=n,n=null,e=m,m=null;
// setup a GLSL program
var g=b(e,o),h=c(e,p),i=d(e,[g,h]);e.useProgram(i);var j={};j.gl=e,j.canvas=a,j.resolutionLocation=e.getUniformLocation(i,"u_resolution"),j.positionLocation=e.getAttribLocation(i,"a_position"),j.backdropLocation=e.getUniformLocation(i,"u_backdrop"),j.subtypeLocation=e.getUniformLocation(i,"u_subtype");var k=e.getAttribLocation(i,"a_texCoord"),l=e.getUniformLocation(i,"u_image"),r=e.getUniformLocation(i,"u_mask"),s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(k),e.vertexAttribPointer(k,2,e.FLOAT,!1,0,0),e.uniform1i(l,0),e.uniform1i(r,1),q=j}function i(a,b,c){var d=a.width,f=a.height;q||g();var h=q,i=h.canvas,j=h.gl;i.width=d,i.height=f,j.viewport(0,0,j.drawingBufferWidth,j.drawingBufferHeight),j.uniform2f(h.resolutionLocation,d,f),c.backdrop?j.uniform4f(h.resolutionLocation,c.backdrop[0],c.backdrop[1],c.backdrop[2],1):j.uniform4f(h.resolutionLocation,0,0,0,0),j.uniform1i(h.subtypeLocation,"Luminosity"===c.subtype?1:0);
// Create a textures
var k=e(j,a,j.TEXTURE0),l=e(j,b,j.TEXTURE1),m=j.createBuffer();
// draw
return j.bindBuffer(j.ARRAY_BUFFER,m),j.bufferData(j.ARRAY_BUFFER,new Float32Array([0,0,d,0,0,f,0,f,d,0,d,f]),j.STATIC_DRAW),j.enableVertexAttribArray(h.positionLocation),j.vertexAttribPointer(h.positionLocation,2,j.FLOAT,!1,0,0),j.clearColor(0,0,0,0),j.enable(j.BLEND),j.blendFunc(j.ONE,j.ONE_MINUS_SRC_ALPHA),j.clear(j.COLOR_BUFFER_BIT),j.drawArrays(j.TRIANGLES,0,6),j.flush(),j.deleteTexture(k),j.deleteTexture(l),j.deleteBuffer(m),i}function j(){var a,e;f(),a=n,n=null,e=m,m=null;
// setup a GLSL program
var g=b(e,r),h=c(e,s),i=d(e,[g,h]);e.useProgram(i);var j={};j.gl=e,j.canvas=a,j.resolutionLocation=e.getUniformLocation(i,"u_resolution"),j.scaleLocation=e.getUniformLocation(i,"u_scale"),j.offsetLocation=e.getUniformLocation(i,"u_offset"),j.positionLocation=e.getAttribLocation(i,"a_position"),j.colorLocation=e.getAttribLocation(i,"a_color"),t=j}function k(a,b,c,d,e){t||j();var f=t,g=f.canvas,h=f.gl;g.width=a,g.height=b,h.viewport(0,0,h.drawingBufferWidth,h.drawingBufferHeight),h.uniform2f(f.resolutionLocation,a,b);
// count triangle points
var i,k,l,m=0;for(i=0,k=d.length;k>i;i++)switch(d[i].type){case"lattice":l=d[i].coords.length/d[i].verticesPerRow|0,m+=(l-1)*(d[i].verticesPerRow-1)*6;break;case"triangles":m+=d[i].coords.length}
// transfer data
var n=new Float32Array(2*m),o=new Uint8Array(3*m),p=e.coords,q=e.colors,r=0,s=0;for(i=0,k=d.length;k>i;i++){var u=d[i],v=u.coords,w=u.colors;switch(u.type){case"lattice":var x=u.verticesPerRow;l=v.length/x|0;for(var y=1;l>y;y++)for(var z=y*x+1,A=1;x>A;A++,z++)n[r]=p[v[z-x-1]],n[r+1]=p[v[z-x-1]+1],n[r+2]=p[v[z-x]],n[r+3]=p[v[z-x]+1],n[r+4]=p[v[z-1]],n[r+5]=p[v[z-1]+1],o[s]=q[w[z-x-1]],o[s+1]=q[w[z-x-1]+1],o[s+2]=q[w[z-x-1]+2],o[s+3]=q[w[z-x]],o[s+4]=q[w[z-x]+1],o[s+5]=q[w[z-x]+2],o[s+6]=q[w[z-1]],o[s+7]=q[w[z-1]+1],o[s+8]=q[w[z-1]+2],n[r+6]=n[r+2],n[r+7]=n[r+3],n[r+8]=n[r+4],n[r+9]=n[r+5],n[r+10]=p[v[z]],n[r+11]=p[v[z]+1],o[s+9]=o[s+3],o[s+10]=o[s+4],o[s+11]=o[s+5],o[s+12]=o[s+6],o[s+13]=o[s+7],o[s+14]=o[s+8],o[s+15]=q[w[z]],o[s+16]=q[w[z]+1],o[s+17]=q[w[z]+2],r+=12,s+=18;break;case"triangles":for(var B=0,C=v.length;C>B;B++)n[r]=p[v[B]],n[r+1]=p[v[B]+1],o[s]=q[w[i]],o[s+1]=q[w[B]+1],o[s+2]=q[w[B]+2],r+=2,s+=3}}
// draw
c?h.clearColor(c[0]/255,c[1]/255,c[2]/255,1):h.clearColor(0,0,0,0),h.clear(h.COLOR_BUFFER_BIT);var D=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,D),h.bufferData(h.ARRAY_BUFFER,n,h.STATIC_DRAW),h.enableVertexAttribArray(f.positionLocation),h.vertexAttribPointer(f.positionLocation,2,h.FLOAT,!1,0,0);var E=h.createBuffer();return h.bindBuffer(h.ARRAY_BUFFER,E),h.bufferData(h.ARRAY_BUFFER,o,h.STATIC_DRAW),h.enableVertexAttribArray(f.colorLocation),h.vertexAttribPointer(f.colorLocation,3,h.UNSIGNED_BYTE,!1,0,0),h.uniform2f(f.scaleLocation,e.scaleX,e.scaleY),h.uniform2f(f.offsetLocation,e.offsetX,e.offsetY),h.drawArrays(h.TRIANGLES,0,m),h.flush(),h.deleteBuffer(D),h.deleteBuffer(E),g}function l(){q&&q.canvas&&(q.canvas.width=0,q.canvas.height=0),t&&t.canvas&&(t.canvas.width=0,t.canvas.height=0),q=null,t=null}var m,n,o="  attribute vec2 a_position;                                      attribute vec2 a_texCoord;                                                                                                      uniform vec2 u_resolution;                                                                                                      varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_texCoord = a_texCoord;                                      }                                                             ",p="  precision mediump float;                                                                                                        uniform vec4 u_backdrop;                                        uniform int u_subtype;                                          uniform sampler2D u_image;                                      uniform sampler2D u_mask;                                                                                                       varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec4 imageColor = texture2D(u_image, v_texCoord);               vec4 maskColor = texture2D(u_mask, v_texCoord);                 if (u_backdrop.a > 0.0) {                                         maskColor.rgb = maskColor.rgb * maskColor.a +                                   u_backdrop.rgb * (1.0 - maskColor.a);         }                                                               float lum;                                                      if (u_subtype == 0) {                                             lum = maskColor.a;                                            } else {                                                          lum = maskColor.r * 0.3 + maskColor.g * 0.59 +                        maskColor.b * 0.11;                                     }                                                               imageColor.a *= lum;                                            imageColor.rgb *= imageColor.a;                                 gl_FragColor = imageColor;                                    }                                                             ",q=null,r="  attribute vec2 a_position;                                      attribute vec3 a_color;                                                                                                         uniform vec2 u_resolution;                                      uniform vec2 u_scale;                                           uniform vec2 u_offset;                                                                                                          varying vec4 v_color;                                                                                                           void main() {                                                     vec2 position = (a_position + u_offset) * u_scale;              vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_color = vec4(a_color / 255.0, 1.0);                         }                                                             ",s="  precision mediump float;                                                                                                        varying vec4 v_color;                                                                                                           void main() {                                                     gl_FragColor = v_color;                                       }                                                             ",t=null;return{get isEnabled(){if(PDFJS.disableWebGL)return!1;var a=!1;try{f(),a=!!m}catch(b){}return h(this,"isEnabled",a)},composeSMask:i,drawFigures:k,clear:l}}(),ha={};ha.RadialAxial={fromIR:function(a){var b=a[1],c=a[2],d=a[3],e=a[4],f=a[5],g=a[6];return{type:"Pattern",getPattern:function(a){var h;"axial"===b?h=a.createLinearGradient(d[0],d[1],e[0],e[1]):"radial"===b&&(h=a.createRadialGradient(d[0],d[1],f,e[0],e[1],g));for(var i=0,j=c.length;j>i;++i){var k=c[i];h.addColorStop(k[0],k[1])}return h}}}};var ia=function(){function a(a,b,c,d,e,f,g,h){
// Very basic Gouraud-shaded triangle rasterization algorithm.
var i,j=b.coords,k=b.colors,l=a.data,m=4*a.width;j[c+1]>j[d+1]&&(i=c,c=d,d=i,i=f,f=g,g=i),j[d+1]>j[e+1]&&(i=d,d=e,e=i,i=g,g=h,h=i),j[c+1]>j[d+1]&&(i=c,c=d,d=i,i=f,f=g,g=i);var n=(j[c]+b.offsetX)*b.scaleX,o=(j[c+1]+b.offsetY)*b.scaleY,p=(j[d]+b.offsetX)*b.scaleX,q=(j[d+1]+b.offsetY)*b.scaleY,r=(j[e]+b.offsetX)*b.scaleX,s=(j[e+1]+b.offsetY)*b.scaleY;if(!(o>=s))for(var t,u,v,w,x,y,z,A,B,C=k[f],D=k[f+1],E=k[f+2],F=k[g],G=k[g+1],H=k[g+2],I=k[h],J=k[h+1],K=k[h+2],L=Math.round(o),M=Math.round(s),N=L;M>=N;N++){q>N?(B=o>N?0:o===q?1:(o-N)/(o-q),t=n-(n-p)*B,u=C-(C-F)*B,v=D-(D-G)*B,w=E-(E-H)*B):(B=N>s?1:q===s?0:(q-N)/(q-s),t=p-(p-r)*B,u=F-(F-I)*B,v=G-(G-J)*B,w=H-(H-K)*B),B=o>N?0:N>s?1:(o-N)/(o-s),x=n-(n-r)*B,y=C-(C-I)*B,z=D-(D-J)*B,A=E-(E-K)*B;for(var O=Math.round(Math.min(t,x)),P=Math.round(Math.max(t,x)),Q=m*N+4*O,R=O;P>=R;R++)B=(t-R)/(t-x),B=0>B?0:B>1?1:B,l[Q++]=u-(u-y)*B|0,l[Q++]=v-(v-z)*B|0,l[Q++]=w-(w-A)*B|0,l[Q++]=255}}function b(b,d,e){var f,g,h=d.coords,i=d.colors;switch(d.type){case"lattice":var j=d.verticesPerRow,k=Math.floor(h.length/j)-1,l=j-1;for(f=0;k>f;f++)for(var m=f*j,n=0;l>n;n++,m++)a(b,e,h[m],h[m+1],h[m+j],i[m],i[m+1],i[m+j]),a(b,e,h[m+j+1],h[m+1],h[m+j],i[m+j+1],i[m+1],i[m+j]);break;case"triangles":for(f=0,g=h.length;g>f;f+=3)a(b,e,h[f],h[f+1],h[f+2],i[f],i[f+1],i[f+2]);break;default:c("illigal figure")}}function d(a,c,d,e,f,g){
// we will increase scale on some weird factor to let antialiasing take
// care of "rough" edges
var h,i,j,k,l=1.1,m=3e3,n=Math.floor(a[0]),o=Math.floor(a[1]),p=Math.ceil(a[2])-n,q=Math.ceil(a[3])-o,r=Math.min(Math.ceil(Math.abs(p*c[0]*l)),m),s=Math.min(Math.ceil(Math.abs(q*c[1]*l)),m),t=p/r,u=q/s,v={coords:d,colors:e,offsetX:-n,offsetY:-o,scaleX:1/t,scaleY:1/u};if(ga.isEnabled)h=ga.drawFigures(r,s,g,f,v),
// https://bugzilla.mozilla.org/show_bug.cgi?id=972126
i=da.getCanvas("mesh",r,s,!1),i.context.drawImage(h,0,0),h=i.canvas;else{i=da.getCanvas("mesh",r,s,!1);var w=i.context,x=w.createImageData(r,s);if(g){var y=x.data;for(j=0,k=y.length;k>j;j+=4)y[j]=g[0],y[j+1]=g[1],y[j+2]=g[2],y[j+3]=255}for(j=0;j<f.length;j++)b(x,f[j],v);w.putImageData(x,0,0),h=i.canvas}return{canvas:h,offsetX:n,offsetY:o,scaleX:t,scaleY:u}}return d}();ha.Mesh={fromIR:function(a){
//var type = raw[1];
var b=a[2],c=a[3],d=a[4],e=a[5],f=a[6],g=a[8];return{type:"Pattern",getPattern:function(a,h,i){var j;if(i)j=O.singularValueDecompose2dScale(a.mozCurrentTransform);else if(
// Obtain scale from matrix and current transformation matrix.
j=O.singularValueDecompose2dScale(h.baseTransform),f){var k=O.singularValueDecompose2dScale(f);j=[j[0]*k[0],j[1]*k[1]]}
// Rasterizing on the main thread since sending/queue large canvases
// might cause OOM.
var l=ia(e,j,b,c,d,i?null:g);return i||(a.setTransform.apply(a,h.baseTransform),f&&a.transform.apply(a,f)),a.translate(l.offsetX,l.offsetY),a.scale(l.scaleX,l.scaleY),a.createPattern(l.canvas,"no-repeat")}}}},ha.Dummy={fromIR:function(){return{type:"Pattern",getPattern:function(){return"hotpink"}}}};var ja=function(){// 10in @ 300dpi shall be enough
function b(a,b,c,d,e,f){this.operatorList=a[2],this.matrix=a[3]||[1,0,0,1,0,0],this.bbox=a[4],this.xstep=a[5],this.ystep=a[6],this.paintType=a[7],this.tilingType=a[8],this.color=b,this.objs=d,this.commonObjs=e,this.baseTransform=f,this.type="Pattern",this.ctx=c}var d={COLORED:1,UNCOLORED:2},e=3e3;return b.prototype={createPatternCanvas:function(b){var c=this.operatorList,d=this.bbox,f=this.xstep,g=this.ystep,h=this.paintType,i=this.tilingType,j=this.color,k=this.objs,l=this.commonObjs;a("TilingType: "+i);var m=d[0],n=d[1],o=d[2],p=d[3],q=[m,n],r=[m+f,n+g],s=r[0]-q[0],t=r[1]-q[1],u=O.singularValueDecompose2dScale(this.matrix),v=O.singularValueDecompose2dScale(this.baseTransform),w=[u[0]*v[0],u[1]*v[1]];
// MAX_PATTERN_SIZE is used to avoid OOM situation.
// Use width and height values that are as close as possible to the end
// result when the pattern is used. Too low value makes the pattern look
// blurry. Too large value makes it look too crispy.
s=Math.min(Math.ceil(Math.abs(s*w[0])),e),t=Math.min(Math.ceil(Math.abs(t*w[1])),e);var x=da.getCanvas("pattern",s,t,!0),y=x.context,z=new fa(y,l,k);z.groupLevel=b.groupLevel,this.setFillAndStrokeStyleToContext(y,h,j),this.setScale(s,t,f,g),this.transformToScale(z);
// transform coordinates to pattern space
var A=[1,0,0,1,-q[0],-q[1]];return z.transform.apply(z,A),this.clipBbox(z,d,m,n,o,p),z.executeOperatorList(c),x.canvas},setScale:function(a,b,c,d){this.scale=[a/c,b/d]},transformToScale:function(a){var b=this.scale,c=[b[0],0,0,b[1],0,0];a.transform.apply(a,c)},scaleToContext:function(){var a=this.scale;this.ctx.scale(1/a[0],1/a[1])},clipBbox:function(a,b,c,d,e,f){if(b&&o(b)&&4===b.length){var g=e-c,h=f-d;a.ctx.rect(c,d,g,h),a.clip(),a.endPath()}},setFillAndStrokeStyleToContext:function(a,b,e){switch(b){case d.COLORED:var f=this.ctx;a.fillStyle=f.fillStyle,a.strokeStyle=f.strokeStyle;break;case d.UNCOLORED:var g=O.makeCssRgb(e[0],e[1],e[2]);a.fillStyle=g,a.strokeStyle=g;break;default:c("Unsupported paint type: "+b)}},getPattern:function(a,b){var c=this.createPatternCanvas(b);return a=this.ctx,a.setTransform.apply(a,this.baseTransform),a.transform.apply(a,this.matrix),this.scaleToContext(),a.createPattern(c,"repeat")}},b}();PDFJS.disableFontFace=!1;var ka={insertRule:function(a){var b=document.getElementById("PDFJS_FONT_STYLE_TAG");b||(b=document.createElement("style"),b.id="PDFJS_FONT_STYLE_TAG",document.documentElement.getElementsByTagName("head")[0].appendChild(b));var c=b.sheet;c.insertRule(a,c.cssRules.length)},clear:function(){var a=document.getElementById("PDFJS_FONT_STYLE_TAG");a&&a.parentNode.removeChild(a),this.nativeFontFaces.forEach(function(a){document.fonts["delete"](a)}),this.nativeFontFaces.length=0},get loadTestFont(){
// This is a CFF font with 1 glyph for '.' that fills its entire width and
// height.
return h(this,"loadTestFont",atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA=="))},loadTestFontId:0,loadingContext:{requests:[],nextRequestId:0},isSyncFontLoadingSupported:function(){if(y)return!1;
// User agent string sniffing is bad, but there is no reliable way to tell
// if font is fully loaded and ready to be used with canvas.
var a=window.navigator.userAgent,b=/Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(a);
// TODO other browsers
return b&&b[1]>=14?!0:"node"===a?!0:!1}(),nativeFontFaces:[],isFontLoadingAPISupported:!y&&"undefined"!=typeof document&&!!document.fonts,addNativeFontFace:function(a){this.nativeFontFaces.push(a),document.fonts.add(a)},bind:function(a,b){e(!y,"bind() shall be called from main thread");for(var c=[],d=[],f=[],g=0,h=a.length;h>g;g++){var i=a[g];
// Add the font to the DOM only once or skip if the font
// is already loaded.
if(!i.attached&&i.loading!==!1)if(i.attached=!0,this.isFontLoadingAPISupported){var j=i.createNativeFontFace();j&&f.push(j.loaded)}else{var k=i.bindDOM();k&&(c.push(k),d.push(i))}}var l=ka.queueLoadingCallback(b);this.isFontLoadingAPISupported?Promise.all(d).then(function(){l.complete()}):c.length>0&&!this.isSyncFontLoadingSupported?ka.prepareFontLoadEvent(c,d,l):l.complete()},queueLoadingCallback:function(a){function b(){
// sending all completed requests in order how they were queued
for(e(!f.end,"completeRequest() cannot be called twice"),f.end=Date.now();c.requests.length>0&&c.requests[0].end;){var a=c.requests.shift();setTimeout(a.callback,0)}}var c=ka.loadingContext,d="pdfjs-font-loading-"+c.nextRequestId++,f={id:d,complete:b,callback:a,started:Date.now()};return c.requests.push(f),f},prepareFontLoadEvent:function(a,c,d){/** Hack begin */
// There's currently no event when a font has finished downloading so the
// following code is a dirty hack to 'guess' when a font is
// ready. It's assumed fonts are loaded in order, so add a known test
// font after the desired fonts and then test for the loading of that
// test font.
function e(a,b){return a.charCodeAt(b)<<24|a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|255&a.charCodeAt(b+3)}function f(a,b,c,d){var e=a.substr(0,b),f=a.substr(b+c);return e+d+f}function g(a,c){
// With setTimeout clamping this gives the font ~100ms to load.
if(m++,m>30)return b("Load test font never loaded."),void c();l.font="30px "+a,l.fillText(".",0,20);var d=l.getImageData(0,0,1,1);return d.data[3]>0?void c():void setTimeout(g.bind(null,a,c))}var h,i,j=document.createElement("canvas");j.width=1,j.height=1;var l=j.getContext("2d"),m=0,n="lt"+Date.now()+this.loadTestFontId++,o=this.loadTestFont,p=976;// has to be on 4 byte boundary (for checksum)
o=f(o,p,n.length,n);
// CFF checksum is important for IE, adjusting it
var q=16,r=1482184792,s=e(o,q);for(h=0,i=n.length-3;i>h;h+=4)s=s-r+e(n,h)|0;h<n.length&&(// align to 4 bytes boundary
s=s-r+e(n+"XXX",h)|0),o=f(o,q,4,k(s));var t="url(data:font/opentype;base64,"+btoa(o)+");",u='@font-face { font-family:"'+n+'";src:'+t+"}";ka.insertRule(u);var v=[];for(h=0,i=c.length;i>h;h++)v.push(c[h].loadedName);v.push(n);var w=document.createElement("div");for(w.setAttribute("style","visibility: hidden;width: 10px; height: 10px;position: absolute; top: 0px; left: 0px;"),h=0,i=v.length;i>h;++h){var x=document.createElement("span");x.textContent="Hi",x.style.fontFamily=v[h],w.appendChild(x)}document.body.appendChild(w),g(n,function(){document.body.removeChild(w),d.complete()})}},la=function(){function a(a,b,c){if(this.compiledGlyphs={},1!==arguments.length);else{
// importing translated data
var d=arguments[0];for(var e in d)this[e]=d[e]}}return a.prototype={createNativeFontFace:function(){if(!this.data)return null;if(PDFJS.disableFontFace)return this.disableFontFace=!0,null;var a=new FontFace(this.loadedName,this.data,{});return ka.addNativeFontFace(a),PDFJS.pdfBug&&"FontInspector"in x&&x.FontInspector.enabled&&x.FontInspector.fontAdded(this),a},bindDOM:function(){if(!this.data)return null;if(PDFJS.disableFontFace)return this.disableFontFace=!0,null;var a=i(new Uint8Array(this.data)),b=this.loadedName,c="url(data:"+this.mimetype+";base64,"+window.btoa(a)+");",d='@font-face { font-family:"'+b+'";src:'+c+"}";return ka.insertRule(d),PDFJS.pdfBug&&"FontInspector"in x&&x.FontInspector.enabled&&x.FontInspector.fontAdded(this,c),d},getPathGenerator:function(a,b){if(!(b in this.compiledGlyphs)){var c=a.get(this.loadedName+"_path_"+b);/*jshint -W054 */
this.compiledGlyphs[b]=new Function("c","size",c)}return this.compiledGlyphs[b]}},a}(),ma=10,na=function(){
// TODO(mack): This dupes some of the logic in CanvasGraphics.setFont()
function a(a,b,c){var d=a.style;if(d.fontSize=b.fontSize+"px",d.direction=b.fontDirection<0?"rtl":"ltr",c){d.fontWeight=c.black?c.bold?"bolder":"bold":c.bold?"bold":"normal",d.fontStyle=c.italic?"italic":"normal";var e=c.loadedName,f=e?'"'+e+'", ':"",g=c.fallbackName||"Helvetica, sans-serif";d.fontFamily=f+g}}function b(a,b){var c=document.createElement("section"),d=c.style,e=a.rect[2]-a.rect[0],f=a.rect[3]-a.rect[1],g=a.borderWidth||0;if(g){e-=2*g,f-=2*g,d.borderWidth=g+"px";var h=a.color;b&&h&&(d.borderStyle="solid",d.borderColor=O.makeCssRgb(Math.round(255*h[0]),Math.round(255*h[1]),Math.round(255*h[2])))}return d.width=e+"px",d.height=f+"px",c}function c(b,c){var d=document.createElement("div"),e=b.rect[2]-b.rect[0],f=b.rect[3]-b.rect[1];d.style.width=e+"px",d.style.height=f+"px",d.style.display="table";var g=document.createElement("div");g.textContent=b.fieldValue;var h=b.textAlignment;g.style.textAlign=["left","center","right"][h],g.style.verticalAlign="middle",g.style.display="table-cell";var i=b.fontRefName?c.getData(b.fontRefName):null;return a(g,b,i),d.appendChild(g),d}function d(a){var c=a.rect;
// sanity check because of OOo-generated PDFs
c[3]-c[1]<ma&&(c[3]=c[1]+ma),c[2]-c[0]<ma&&(c[2]=c[0]+(c[3]-c[1]));var d=b(a,!1);d.className="annotText";var e=document.createElement("img");e.style.height=d.style.height,e.style.width=d.style.width;var f=a.name;e.src=PDFJS.imageResourcesPath+"annotation-"+f.toLowerCase()+".svg",e.alt="[{{type}} Annotation]",e.dataset.l10nId="text_annotation_type",e.dataset.l10nArgs=JSON.stringify({type:f});var g=document.createElement("div");g.className="annotTextContentWrapper",g.style.left=Math.floor(c[2]-c[0]+5)+"px",g.style.top="-10px";var h=document.createElement("div");h.className="annotTextContent",h.setAttribute("hidden",!0);var i,j;if(a.hasBgColor){var k=a.color,l=.7,m=l*(1-k[0])+k[0],n=l*(1-k[1])+k[1],o=l*(1-k[2])+k[2];h.style.backgroundColor=O.makeCssRgb(255*m|0,255*n|0,255*o|0)}var p=document.createElement("h1"),q=document.createElement("p");if(p.textContent=a.title,a.content||a.title){var r=document.createElement("span"),s=a.content.split(/(?:\r\n?|\n)/);for(i=0,j=s.length;j>i;++i){var t=s[i];r.appendChild(document.createTextNode(t)),j-1>i&&r.appendChild(document.createElement("br"))}q.appendChild(r);var u=!1,v=function(a){a&&(u=!0),h.hasAttribute("hidden")&&(d.style.zIndex+=1,h.removeAttribute("hidden"))},w=function(a){a&&(u=!1),h.hasAttribute("hidden")||u||(d.style.zIndex-=1,h.setAttribute("hidden",!0))},x=function(){u?w(!0):v(!0)};e.addEventListener("click",function(){x()},!1),e.addEventListener("mouseover",function(){v()},!1),e.addEventListener("mouseout",function(){w()},!1),h.addEventListener("click",function(){w(!0)},!1)}else h.setAttribute("hidden",!0);return h.appendChild(p),h.appendChild(q),g.appendChild(h),d.appendChild(e),d.appendChild(g),d}function e(a){var c=b(a,!0);c.className="annotLink";var d=document.createElement("a");return d.href=d.title=a.url||"",a.url&&PDFJS.openExternalLinksInNewWindow&&(d.target="_blank"),c.appendChild(d),c}function f(a,b){switch(a.annotationType){case C.WIDGET:return c(a,b);case C.TEXT:return d(a);case C.LINK:return e(a);default:throw new Error("Unsupported annotationType: "+a.annotationType)}}return{getHtmlElement:f}}();PDFJS.AnnotationUtils=na;var oa={fontStyle:"normal",fontWeight:"normal",fillColor:"#000000"},pa=function(){function a(a,b,c){for(var d=-1,e=b;c>e;e++){var f=255&(d^a[e]),h=g[f];d=d>>>8^h}return-1^d}function b(b,c,d,e){var f=e,g=c.length;d[f]=g>>24&255,d[f+1]=g>>16&255,d[f+2]=g>>8&255,d[f+3]=255&g,f+=4,d[f]=255&b.charCodeAt(0),d[f+1]=255&b.charCodeAt(1),d[f+2]=255&b.charCodeAt(2),d[f+3]=255&b.charCodeAt(3),f+=4,d.set(c,f),f+=c.length;var h=a(d,e+4,f);d[f]=h>>24&255,d[f+1]=h>>16&255,d[f+2]=h>>8&255,d[f+3]=255&h}function c(a,b,c){for(var d=1,e=0,f=b;c>f;++f)d=(d+(255&a[f]))%65521,e=(e+d)%65521;return e<<16|d}function d(a,d){var g,h,i,j=a.width,k=a.height,l=a.data;switch(d){case B.GRAYSCALE_1BPP:h=0,g=1,i=j+7>>3;break;case B.RGB_24BPP:h=2,g=8,i=3*j;break;case B.RGBA_32BPP:h=6,g=8,i=4*j;break;default:throw new Error("invalid format")}
// prefix every row with predictor 0
var m,n,o=new Uint8Array((1+i)*k),p=0,q=0;for(m=0;k>m;++m)o[p++]=0,// no prediction
o.set(l.subarray(q,q+i),p),q+=i,p+=i;if(d===B.GRAYSCALE_1BPP)for(
// inverting for B/W
p=0,m=0;k>m;m++)// skipping predictor
for(p++,n=0;i>n;n++)o[p++]^=255;var r=new Uint8Array([j>>24&255,j>>16&255,j>>8&255,255&j,k>>24&255,k>>16&255,k>>8&255,255&k,g,// bit depth
h,// color type
0,// compression method
0,// filter method
0]),s=o.length,t=65535,u=Math.ceil(s/t),v=new Uint8Array(2+s+5*u+4),w=0;v[w++]=120,// compression method and flags
v[w++]=156;for(// flags
var x=0;s>t;)
// writing non-final DEFLATE blocks type 0 and length of 65535
v[w++]=0,v[w++]=255,v[w++]=255,v[w++]=0,v[w++]=0,v.set(o.subarray(x,x+t),w),w+=t,x+=t,s-=t;
// writing non-final DEFLATE blocks type 0
v[w++]=1,v[w++]=255&s,v[w++]=s>>8&255,v[w++]=65535&~s&255,v[w++]=(65535&~s)>>8&255,v.set(o.subarray(x),w),w+=o.length-x;var y=c(o,0,o.length);// checksum
v[w++]=y>>24&255,v[w++]=y>>16&255,v[w++]=y>>8&255,v[w++]=255&y;
// PNG will consists: header, IHDR+data, IDAT+data, and IEND.
var z=e.length+3*f+r.length+v.length,A=new Uint8Array(z),C=0;return A.set(e,C),C+=e.length,b("IHDR",r,A,C),C+=f+r.length,b("IDATA",v,A,C),C+=f+v.length,b("IEND",new Uint8Array(0),A,C),PDFJS.createObjectURL(A,"image/png")}for(var e=new Uint8Array([137,80,78,71,13,10,26,10]),f=12,g=new Int32Array(256),h=0;256>h;h++){for(var i=h,j=0;8>j;j++)i=1&i?3988292384^i>>1&2147483647:i>>1&2147483647;g[h]=i}return function(a){var b=void 0===a.kind?B.GRAYSCALE_1BPP:a.kind;return d(a,b)}}(),qa=function(){function a(){this.fontSizeScale=1,this.fontWeight=oa.fontWeight,this.fontSize=0,this.textMatrix=N,this.fontMatrix=z,this.leading=0,
// Current point (in user coordinates)
this.x=0,this.y=0,
// Start of text line (in text coordinates)
this.lineX=0,this.lineY=0,
// Character and word spacing
this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRise=0,
// Default foreground and background colors
this.fillColor=oa.fillColor,this.strokeColor="#000000",this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.lineJoin="",this.lineCap="",this.miterLimit=0,this.dashArray=[],this.dashPhase=0,this.dependencies=[],
// Clipping
this.clipId="",this.pendingClip=!1,this.maskId=""}return a.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(a,b){this.x=a,this.y=b}},a}(),ra=function(){function a(a,b){var c="http://www.w3.org/2000/svg",d=document.createElementNS(c,"svg:svg");return d.setAttributeNS(null,"version","1.1"),d.setAttributeNS(null,"width",a+"px"),d.setAttributeNS(null,"height",b+"px"),d.setAttributeNS(null,"viewBox","0 0 "+a+" "+b),d}function c(a){for(var b=[],c=[],d=a.length,e=0;d>e;e++)"save"!==a[e].fn?"restore"===a[e].fn?b=c.pop():b.push(a[e]):(b.push({fnId:92,fn:"group",items:[]}),c.push(b),b=b[b.length-1].items);return b}/**
   * Formats float number.
   * @param value {number} number to format.
   * @returns {string}
   */
function d(a){if(a===(0|a))// integer number
return a.toString();var b=a.toFixed(10),c=b.length-1;if("0"!==b[c])return b;
// removing trailing zeros
do c--;while("0"===b[c]);return b.substr(0,"."===b[c]?c:c+1)}/**
   * Formats transform matrix. The standard rotation, scale and translate
   * matrices are replaced by their shorter forms, and for identity matrix
   * returns empty string to save the memory.
   * @param m {Array} matrix to format.
   * @returns {string}
   */
function e(a){if(0===a[4]&&0===a[5]){if(0===a[1]&&0===a[2])return 1===a[0]&&1===a[3]?"":"scale("+d(a[0])+" "+d(a[3])+")";if(a[0]===a[3]&&a[1]===-a[2]){var b=180*Math.acos(a[0])/Math.PI;return"rotate("+d(b)+")"}}else if(1===a[0]&&0===a[1]&&0===a[2]&&1===a[3])return"translate("+d(a[4])+" "+d(a[5])+")";return"matrix("+d(a[0])+" "+d(a[1])+" "+d(a[2])+" "+d(a[3])+" "+d(a[4])+" "+d(a[5])+")"}function f(a,b){this.current=new qa,this.transformMatrix=N,// Graphics state matrix
this.transformStack=[],this.extraStack=[],this.commonObjs=a,this.objs=b,this.pendingEOFill=!1,this.embedFonts=!1,this.embeddedFonts={},this.cssStyle=null}var g="http://www.w3.org/2000/svg",h="http://www.w3.org/XML/1998/namespace",i="http://www.w3.org/1999/xlink",j=["butt","round","square"],k=["miter","round","bevel"],l=0,m=0;return f.prototype={save:function(){this.transformStack.push(this.transformMatrix);var a=this.current;this.extraStack.push(a),this.current=a.clone()},restore:function(){this.transformMatrix=this.transformStack.pop(),this.current=this.extraStack.pop(),this.tgrp=document.createElementNS(g,"svg:g"),this.tgrp.setAttributeNS(null,"transform",e(this.transformMatrix)),this.pgrp.appendChild(this.tgrp)},group:function(a){this.save(),this.executeOpTree(a),this.restore()},loadDependencies:function(a){for(var b=a.fnArray,c=b.length,d=a.argsArray,e=this,f=0;c>f;f++)if(D.dependency===b[f])for(var g=d[f],h=0,i=g.length;i>h;h++){var j,k=g[h],l="g_"===k.substring(0,2);j=new Promise(l?function(a){e.commonObjs.get(k,a)}:function(a){e.objs.get(k,a)}),this.current.dependencies.push(j)}return Promise.all(this.current.dependencies)},transform:function(a,b,c,d,f,h){var i=[a,b,c,d,f,h];this.transformMatrix=PDFJS.Util.transform(this.transformMatrix,i),this.tgrp=document.createElementNS(g,"svg:g"),this.tgrp.setAttributeNS(null,"transform",e(this.transformMatrix))},getSVG:function(b,c){return this.svg=a(c.width,c.height),this.viewport=c,this.loadDependencies(b).then(function(){this.transformMatrix=N,this.pgrp=document.createElementNS(g,"svg:g"),// Parent group
this.pgrp.setAttributeNS(null,"transform",e(c.transform)),this.tgrp=document.createElementNS(g,"svg:g"),// Transform group
this.tgrp.setAttributeNS(null,"transform",e(this.transformMatrix)),this.defs=document.createElementNS(g,"svg:defs"),this.pgrp.appendChild(this.defs),this.pgrp.appendChild(this.tgrp),this.svg.appendChild(this.pgrp);var a=this.convertOpList(b);return this.executeOpTree(a),this.svg}.bind(this))},convertOpList:function(a){var b=a.argsArray,d=a.fnArray,e=d.length,f=[],g=[];for(var h in D)f[D[h]]=h;for(var i=0;e>i;i++){var j=d[i];g.push({fnId:j,fn:f[j],args:b[i]})}return c(g)},executeOpTree:function(a){for(var c=a.length,d=0;c>d;d++){var e=a[d].fn,f=a[d].fnId,g=a[d].args;switch(0|f){case D.beginText:this.beginText();break;case D.setLeading:this.setLeading(g);break;case D.setLeadingMoveText:this.setLeadingMoveText(g[0],g[1]);break;case D.setFont:this.setFont(g);break;case D.showText:this.showText(g[0]);break;case D.showSpacedText:this.showText(g[0]);break;case D.endText:this.endText();break;case D.moveText:this.moveText(g[0],g[1]);break;case D.setCharSpacing:this.setCharSpacing(g[0]);break;case D.setWordSpacing:this.setWordSpacing(g[0]);break;case D.setHScale:this.setHScale(g[0]);break;case D.setTextMatrix:this.setTextMatrix(g[0],g[1],g[2],g[3],g[4],g[5]);break;case D.setLineWidth:this.setLineWidth(g[0]);break;case D.setLineJoin:this.setLineJoin(g[0]);break;case D.setLineCap:this.setLineCap(g[0]);break;case D.setMiterLimit:this.setMiterLimit(g[0]);break;case D.setFillRGBColor:this.setFillRGBColor(g[0],g[1],g[2]);break;case D.setStrokeRGBColor:this.setStrokeRGBColor(g[0],g[1],g[2]);break;case D.setDash:this.setDash(g[0],g[1]);break;case D.setGState:this.setGState(g[0]);break;case D.fill:this.fill();break;case D.eoFill:this.eoFill();break;case D.stroke:this.stroke();break;case D.fillStroke:this.fillStroke();break;case D.eoFillStroke:this.eoFillStroke();break;case D.clip:this.clip("nonzero");break;case D.eoClip:this.clip("evenodd");break;case D.paintSolidColorImageMask:this.paintSolidColorImageMask();break;case D.paintJpegXObject:this.paintJpegXObject(g[0],g[1],g[2]);break;case D.paintImageXObject:this.paintImageXObject(g[0]);break;case D.paintInlineImageXObject:this.paintInlineImageXObject(g[0]);break;case D.paintImageMaskXObject:this.paintImageMaskXObject(g[0]);break;case D.paintFormXObjectBegin:this.paintFormXObjectBegin(g[0],g[1]);break;case D.paintFormXObjectEnd:this.paintFormXObjectEnd();break;case D.closePath:this.closePath();break;case D.closeStroke:this.closeStroke();break;case D.closeFillStroke:this.closeFillStroke();break;case D.nextLine:this.nextLine();break;case D.transform:this.transform(g[0],g[1],g[2],g[3],g[4],g[5]);break;case D.constructPath:this.constructPath(g[0],g[1]);break;case D.endPath:this.endPath();break;case 92:this.group(a[d].items);break;default:b("Unimplemented method "+e)}}},setWordSpacing:function(a){this.current.wordSpacing=a},setCharSpacing:function(a){this.current.charSpacing=a},nextLine:function(){this.moveText(0,this.current.leading)},setTextMatrix:function(a,b,c,e,f,h){var i=this.current;this.current.textMatrix=this.current.lineMatrix=[a,b,c,e,f,h],this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0,i.xcoords=[],i.tspan=document.createElementNS(g,"svg:tspan"),i.tspan.setAttributeNS(null,"font-family",i.fontFamily),i.tspan.setAttributeNS(null,"font-size",d(i.fontSize)+"px"),i.tspan.setAttributeNS(null,"y",d(-i.y)),i.txtElement=document.createElementNS(g,"svg:text"),i.txtElement.appendChild(i.tspan)},beginText:function(){this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0,this.current.textMatrix=N,this.current.lineMatrix=N,this.current.tspan=document.createElementNS(g,"svg:tspan"),this.current.txtElement=document.createElementNS(g,"svg:text"),this.current.txtgrp=document.createElementNS(g,"svg:g"),this.current.xcoords=[]},moveText:function(a,b){var c=this.current;this.current.x=this.current.lineX+=a,this.current.y=this.current.lineY+=b,c.xcoords=[],c.tspan=document.createElementNS(g,"svg:tspan"),c.tspan.setAttributeNS(null,"font-family",c.fontFamily),c.tspan.setAttributeNS(null,"font-size",d(c.fontSize)+"px"),c.tspan.setAttributeNS(null,"y",d(-c.y))},showText:function(a){var b=this.current,c=b.font,f=b.fontSize;if(0!==f){var g,i=b.charSpacing,j=b.wordSpacing,k=b.fontDirection,l=b.textHScale*k,m=a.length,o=c.vertical,p=f*b.fontMatrix[0],q=0;for(g=0;m>g;++g){var r=a[g];if(null!==r)if(n(r))q+=-r*f*.001;else{b.xcoords.push(b.x+q*l);var s=r.width,t=r.fontChar,u=s*p+i*k;q+=u,b.tspan.textContent+=t}else
// word break
q+=k*j}o?b.y-=q*l:b.x+=q*l,b.tspan.setAttributeNS(null,"x",b.xcoords.map(d).join(" ")),b.tspan.setAttributeNS(null,"y",d(-b.y)),b.tspan.setAttributeNS(null,"font-family",b.fontFamily),b.tspan.setAttributeNS(null,"font-size",d(b.fontSize)+"px"),b.fontStyle!==oa.fontStyle&&b.tspan.setAttributeNS(null,"font-style",b.fontStyle),b.fontWeight!==oa.fontWeight&&b.tspan.setAttributeNS(null,"font-weight",b.fontWeight),b.fillColor!==oa.fillColor&&b.tspan.setAttributeNS(null,"fill",b.fillColor),b.txtElement.setAttributeNS(null,"transform",e(b.textMatrix)+" scale(1, -1)"),b.txtElement.setAttributeNS(h,"xml:space","preserve"),b.txtElement.appendChild(b.tspan),b.txtgrp.appendChild(b.txtElement),this.tgrp.appendChild(b.txtElement)}},setLeadingMoveText:function(a,b){this.setLeading(-b),this.moveText(a,b)},addFontStyle:function(a){this.cssStyle||(this.cssStyle=document.createElementNS(g,"svg:style"),this.cssStyle.setAttributeNS(null,"type","text/css"),this.defs.appendChild(this.cssStyle));var b=PDFJS.createObjectURL(a.data,a.mimetype);this.cssStyle.textContent+='@font-face { font-family: "'+a.loadedName+'"; src: url('+b+"); }\n"},setFont:function(a){var b=this.current,c=this.commonObjs.get(a[0]),e=a[1];this.current.font=c,this.embedFonts&&c.data&&!this.embeddedFonts[c.loadedName]&&(this.addFontStyle(c),this.embeddedFonts[c.loadedName]=c),b.fontMatrix=c.fontMatrix?c.fontMatrix:z;var f=c.black?c.bold?"bolder":"bold":c.bold?"bold":"normal",h=c.italic?"italic":"normal";0>e?(e=-e,b.fontDirection=-1):b.fontDirection=1,b.fontSize=e,b.fontFamily=c.loadedName,b.fontWeight=f,b.fontStyle=h,b.tspan=document.createElementNS(g,"svg:tspan"),b.tspan.setAttributeNS(null,"y",d(-b.y)),b.xcoords=[]},endText:function(){this.current.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp),this.tgrp=document.createElementNS(g,"svg:g"),this.tgrp.setAttributeNS(null,"transform",e(this.transformMatrix))},
// Path properties
setLineWidth:function(a){this.current.lineWidth=a},setLineCap:function(a){this.current.lineCap=j[a]},setLineJoin:function(a){this.current.lineJoin=k[a]},setMiterLimit:function(a){this.current.miterLimit=a},setStrokeRGBColor:function(a,b,c){var d=O.makeCssRgb(a,b,c);this.current.strokeColor=d},setFillRGBColor:function(a,b,c){var d=O.makeCssRgb(a,b,c);this.current.fillColor=d,this.current.tspan=document.createElementNS(g,"svg:tspan"),this.current.xcoords=[]},setDash:function(a,b){this.current.dashArray=a,this.current.dashPhase=b},constructPath:function(a,b){var c=this.current,e=c.x,f=c.y;c.path=document.createElementNS(g,"svg:path");for(var h=[],i=a.length,j=0,k=0;i>j;j++)switch(0|a[j]){case D.rectangle:e=b[k++],f=b[k++];var l=b[k++],m=b[k++],n=e+l,o=f+m;h.push("M",d(e),d(f),"L",d(n),d(f),"L",d(n),d(o),"L",d(e),d(o),"Z");break;case D.moveTo:e=b[k++],f=b[k++],h.push("M",d(e),d(f));break;case D.lineTo:e=b[k++],f=b[k++],h.push("L",d(e),d(f));break;case D.curveTo:e=b[k+4],f=b[k+5],h.push("C",d(b[k]),d(b[k+1]),d(b[k+2]),d(b[k+3]),d(e),d(f)),k+=6;break;case D.curveTo2:e=b[k+2],f=b[k+3],h.push("C",d(e),d(f),d(b[k]),d(b[k+1]),d(b[k+2]),d(b[k+3])),k+=4;break;case D.curveTo3:e=b[k+2],f=b[k+3],h.push("C",d(b[k]),d(b[k+1]),d(e),d(f),d(e),d(f)),k+=4;break;case D.closePath:h.push("Z")}c.path.setAttributeNS(null,"d",h.join(" ")),c.path.setAttributeNS(null,"stroke-miterlimit",d(c.miterLimit)),c.path.setAttributeNS(null,"stroke-linecap",c.lineCap),c.path.setAttributeNS(null,"stroke-linejoin",c.lineJoin),c.path.setAttributeNS(null,"stroke-width",d(c.lineWidth)+"px"),c.path.setAttributeNS(null,"stroke-dasharray",c.dashArray.map(d).join(" ")),c.path.setAttributeNS(null,"stroke-dashoffset",d(c.dashPhase)+"px"),c.path.setAttributeNS(null,"fill","none"),this.tgrp.appendChild(c.path),c.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp),
// Saving a reference in current.element so that it can be addressed
// in 'fill' and 'stroke'
c.element=c.path,c.setCurrentPoint(e,f)},endPath:function(){var a=this.current;a.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp),this.tgrp=document.createElementNS(g,"svg:g"),this.tgrp.setAttributeNS(null,"transform",e(this.transformMatrix))},clip:function(a){var b=this.current;
// Add current path to clipping path
b.clipId="clippath"+l,l++,this.clippath=document.createElementNS(g,"svg:clipPath"),this.clippath.setAttributeNS(null,"id",b.clipId);var c=b.element.cloneNode();"evenodd"===a?c.setAttributeNS(null,"clip-rule","evenodd"):c.setAttributeNS(null,"clip-rule","nonzero"),this.clippath.setAttributeNS(null,"transform",e(this.transformMatrix)),this.clippath.appendChild(c),this.defs.appendChild(this.clippath),
// Create a new group with that attribute
b.pendingClip=!0,this.cgrp=document.createElementNS(g,"svg:g"),this.cgrp.setAttributeNS(null,"clip-path","url(#"+b.clipId+")"),this.pgrp.appendChild(this.cgrp)},closePath:function(){var a=this.current,b=a.path.getAttributeNS(null,"d");b+="Z",a.path.setAttributeNS(null,"d",b)},setLeading:function(a){this.current.leading=-a},setTextRise:function(a){this.current.textRise=a},setHScale:function(a){this.current.textHScale=a/100},setGState:function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b],e=d[0],f=d[1];switch(e){case"LW":this.setLineWidth(f);break;case"LC":this.setLineCap(f);break;case"LJ":this.setLineJoin(f);break;case"ML":this.setMiterLimit(f);break;case"D":this.setDash(f[0],f[1]);break;case"RI":break;case"FL":break;case"Font":this.setFont(f);break;case"CA":break;case"ca":break;case"BM":break;case"SMask":}}},fill:function(){var a=this.current;a.element.setAttributeNS(null,"fill",a.fillColor)},stroke:function(){var a=this.current;a.element.setAttributeNS(null,"stroke",a.strokeColor),a.element.setAttributeNS(null,"fill","none")},eoFill:function(){var a=this.current;a.element.setAttributeNS(null,"fill",a.fillColor),a.element.setAttributeNS(null,"fill-rule","evenodd")},fillStroke:function(){
// Order is important since stroke wants fill to be none.
// First stroke, then if fill needed, it will be overwritten.
this.stroke(),this.fill()},eoFillStroke:function(){this.current.element.setAttributeNS(null,"fill-rule","evenodd"),this.fillStroke()},closeStroke:function(){this.closePath(),this.stroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},paintSolidColorImageMask:function(){var a=this.current,b=document.createElementNS(g,"svg:rect");b.setAttributeNS(null,"x","0"),b.setAttributeNS(null,"y","0"),b.setAttributeNS(null,"width","1px"),b.setAttributeNS(null,"height","1px"),b.setAttributeNS(null,"fill",a.fillColor),this.tgrp.appendChild(b)},paintJpegXObject:function(a,b,c){var e=this.current,f=this.objs.get(a),h=document.createElementNS(g,"svg:image");h.setAttributeNS(i,"xlink:href",f.src),h.setAttributeNS(null,"width",f.width+"px"),h.setAttributeNS(null,"height",f.height+"px"),h.setAttributeNS(null,"x","0"),h.setAttributeNS(null,"y",d(-c)),h.setAttributeNS(null,"transform","scale("+d(1/b)+" "+d(-1/c)+")"),this.tgrp.appendChild(h),e.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp)},paintImageXObject:function(a){var c=this.objs.get(a);return c?void this.paintInlineImageXObject(c):void b("Dependent image isn't ready yet")},paintInlineImageXObject:function(a,b){var c=this.current,e=a.width,f=a.height,h=pa(a),j=document.createElementNS(g,"svg:rect");j.setAttributeNS(null,"x","0"),j.setAttributeNS(null,"y","0"),j.setAttributeNS(null,"width",d(e)),j.setAttributeNS(null,"height",d(f)),c.element=j,this.clip("nonzero");var k=document.createElementNS(g,"svg:image");k.setAttributeNS(i,"xlink:href",h),k.setAttributeNS(null,"x","0"),k.setAttributeNS(null,"y",d(-f)),k.setAttributeNS(null,"width",d(e)+"px"),k.setAttributeNS(null,"height",d(f)+"px"),k.setAttributeNS(null,"transform","scale("+d(1/e)+" "+d(-1/f)+")"),b?b.appendChild(k):this.tgrp.appendChild(k),c.pendingClip?(this.cgrp.appendChild(this.tgrp),this.pgrp.appendChild(this.cgrp)):this.pgrp.appendChild(this.tgrp)},paintImageMaskXObject:function(a){var b=this.current,c=a.width,e=a.height,f=b.fillColor;b.maskId="mask"+m++;var h=document.createElementNS(g,"svg:mask");h.setAttributeNS(null,"id",b.maskId);var i=document.createElementNS(g,"svg:rect");i.setAttributeNS(null,"x","0"),i.setAttributeNS(null,"y","0"),i.setAttributeNS(null,"width",d(c)),i.setAttributeNS(null,"height",d(e)),i.setAttributeNS(null,"fill",f),i.setAttributeNS(null,"mask","url(#"+b.maskId+")"),this.defs.appendChild(h),this.tgrp.appendChild(i),this.paintInlineImageXObject(a,h)},paintFormXObjectBegin:function(a,b){if(this.save(),o(a)&&6===a.length&&this.transform(a[0],a[1],a[2],a[3],a[4],a[5]),o(b)&&4===b.length){var c=b[2]-b[0],e=b[3]-b[1],f=document.createElementNS(g,"svg:rect");f.setAttributeNS(null,"x",b[0]),f.setAttributeNS(null,"y",b[1]),f.setAttributeNS(null,"width",d(c)),f.setAttributeNS(null,"height",d(e)),this.current.element=f,this.clip("nonzero"),this.endPath()}},paintFormXObjectEnd:function(){this.restore()}},f}();PDFJS.SVGGraphics=ra}.call("undefined"==typeof window?this:window),PDFJS.workerSrc||"undefined"==typeof document||(
// workerSrc is not set -- using last script url to define default location
PDFJS.workerSrc=function(){"use strict";var a=document.body||document.getElementsByTagName("head")[0],b=a.lastChild.src;return b&&b.replace(/\.js$/i,".worker.js")}());