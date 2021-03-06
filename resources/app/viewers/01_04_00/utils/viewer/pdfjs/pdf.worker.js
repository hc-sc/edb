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
!function(a,b){"use strict";"function"==typeof define&&define.amd?define("pdfjs-dist/build/pdf.worker",["exports"],b):b("undefined"!=typeof exports?exports:a.pdfjsDistBuildPdfWorker={})}(this,function(a){
// Use strict in our context only - users might not want it
"use strict";var b=("undefined"!=typeof document&&document.currentScript?document.currentScript.src:null,{});(function(){!function(a,b){b(a.pdfjsCoreArithmeticDecoder={})}(this,function(a){/* This class implements the QM Coder decoding as defined in
 *   JPEG 2000 Part I Final Committee Draft Version 1.0
 *   Annex C.3 Arithmetic decoding procedure
 * available at http://www.jpeg.org/public/fcd15444-1.pdf
 *
 * The arithmetic decoder is used in conjunction with context models to decode
 * JPEG2000 and JBIG2 streams.
 */
var b=function(){
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
do 0===this.ct&&this.byteIn(),i<<=1,this.chigh=this.chigh<<1&65535|this.clow>>15&1,this.clow=this.clow<<1&65535,this.ct--;while(0===(32768&i));return this.a=i,a[c]=e<<1|f,d}},a}();a.ArithmeticDecoder=b}),function(a,b){b(a.pdfjsCoreBidi={})}(this,function(a){function b(a){return 0!==(1&a)}function c(a){return 0===(1&a)}function d(a,b,c){for(var d=b,e=a.length;e>d;++d)if(a[d]!==c)return d;return d}function e(a,b,c,d){for(var e=b;c>e;++e)a[e]=d}function f(a,b,c){for(var d=b,e=c-1;e>d;++d,--e){var f=a[d];a[d]=a[e],a[e]=f}}function g(a,b,c){return{str:a,dir:c?"ttb":b?"ltr":"rtl"}}function h(a,h,m){var n=!0,o=a.length;if(0===o||m)return g(a,n,m);
// Get types and fill arrays
k.length=o,l.length=o;var p,q,r=0;for(p=0;o>p;++p){k[p]=a.charAt(p);var s=a.charCodeAt(p),t="L";255>=s?t=i[s]:s>=1424&&1524>=s?t="R":s>=1536&&1791>=s?t=j[255&s]:s>=1792&&2220>=s&&(t="AL"),"R"!==t&&"AL"!==t&&"AN"!==t||r++,l[p]=t}
// Detect the bidi method
// - If there are no rtl characters then no bidi needed
// - If less than 30% chars are rtl then string is primarily ltr
// - If more than 30% chars are rtl then string is primarily rtl
if(0===r)return n=!0,g(a,n);-1===h&&(.3>o/r?(n=!0,h=0):(n=!1,h=1));var u=[];for(p=0;o>p;++p)u[p]=h;/*
     X1-X10: skip most of this, since we are NOT doing the embeddings.
     */
var v=b(h)?"R":"L",w=v,x=w,y=w;for(p=0;o>p;++p)"NSM"===l[p]?l[p]=y:y=l[p];/*
     W2. Search backwards from each instance of a European number until the
     first strong type (R, L, AL, or sor) is found.  If an AL is found, change
     the type of the European number to Arabic number.
     */
y=w;var z;for(p=0;o>p;++p)z=l[p],"EN"===z?l[p]="AL"===y?"AN":"EN":"R"!==z&&"L"!==z&&"AL"!==z||(y=z);/*
     W3. Change all ALs to R.
     */
for(p=0;o>p;++p)z=l[p],"AL"===z&&(l[p]="R");/*
     W4. A single European separator between two European numbers changes to a
     European number. A single common separator between two numbers of the same
     type changes to that type:
     */
for(p=1;o-1>p;++p)"ES"===l[p]&&"EN"===l[p-1]&&"EN"===l[p+1]&&(l[p]="EN"),"CS"!==l[p]||"EN"!==l[p-1]&&"AN"!==l[p-1]||l[p+1]!==l[p-1]||(l[p]=l[p-1]);/*
     W5. A sequence of European terminators adjacent to European numbers changes
     to all European numbers:
     */
for(p=0;o>p;++p)if("EN"===l[p]){
// do before
var A;for(A=p-1;A>=0&&"ET"===l[A];--A)l[A]="EN";
// do after
for(A=p+1;o>A&&"ET"===l[A];++A)l[A]="EN"}/*
     W6. Otherwise, separators and terminators change to Other Neutral:
     */
for(p=0;o>p;++p)z=l[p],"WS"!==z&&"ES"!==z&&"ET"!==z&&"CS"!==z||(l[p]="ON");for(y=w,p=0;o>p;++p)z=l[p],"EN"===z?l[p]="L"===y?"L":"EN":"R"!==z&&"L"!==z||(y=z);/*
     N1. A sequence of neutrals takes the direction of the surrounding strong
     text if the text on both sides has the same direction. European and Arabic
     numbers are treated as though they were R. Start-of-level-run (sor) and
     end-of-level-run (eor) are used at level run boundaries.
     */
for(p=0;o>p;++p)if("ON"===l[p]){var B=d(l,p+1,"ON"),C=w;p>0&&(C=l[p-1]);var D=x;o>B+1&&(D=l[B+1]),"L"!==C&&(C="R"),"L"!==D&&(D="R"),C===D&&e(l,p,B,C),p=B-1}/*
     N2. Any remaining neutrals take the embedding direction.
     */
for(p=0;o>p;++p)"ON"===l[p]&&(l[p]=v);/*
     I1. For all characters with an even (left-to-right) embedding direction,
     those of type R go up one level and those of type AN or EN go up two
     levels.
     I2. For all characters with an odd (right-to-left) embedding direction,
     those of type L, EN or AN go up one level.
     */
for(p=0;o>p;++p)z=l[p],c(u[p])?"R"===z?u[p]+=1:"AN"!==z&&"EN"!==z||(u[p]+=2):"L"!==z&&"AN"!==z&&"EN"!==z||(u[p]+=1);/*
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
var E,F=-1,G=99;for(p=0,q=u.length;q>p;++p)E=u[p],E>F&&(F=E),G>E&&b(E)&&(G=E);
// now reverse between those limits
for(E=F;E>=G;--E){
// find segments to reverse
var H=-1;for(p=0,q=u.length;q>p;++p)u[p]<E?H>=0&&(f(k,H,p),H=-1):0>H&&(H=p);H>=0&&f(k,H,u.length)}/*
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
for(p=0,q=k.length;q>p;++p){var I=k[p];"<"!==I&&">"!==I||(k[p]="")}return g(k.join(""),n)}
// Character types for symbols from 0000 to 00FF.
var i=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","ON","ON","ET","ET","ET","ON","ON","ON","ON","ON","ON","CS","ON","CS","ON","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","ON","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","ON","ET","ET","ET","ET","ON","ON","ON","ON","L","ON","ON","ON","ON","ON","ET","ET","EN","EN","ON","L","ON","ON","ON","EN","L","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L"],j=["AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","CS","AL","ON","ON","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","AL","AL","AL","AL","AL","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","ON","NSM","NSM","NSM","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL"],k=[],l=[];a.bidi=h}),function(a,b){b(a.pdfjsCoreCharsets={})}(this,function(a){var b=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],c=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],d=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"];a.ISOAdobeCharset=b,a.ExpertCharset=c,a.ExpertSubsetCharset=d}),function(a,b){b(a.pdfjsCoreEncodings={})}(this,function(a){function b(a){switch(a){case"WinAnsiEncoding":return g;case"StandardEncoding":return f;case"MacRomanEncoding":return e;case"SymbolSetEncoding":return h;case"ZapfDingbatsEncoding":return i;case"ExpertEncoding":return c;case"MacExpertEncoding":return d;default:return null}}var c=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],d=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","centoldstyle","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","","threequartersemdash","","questionsmall","","","","","Ethsmall","","","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","","","","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hypheninferior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","asuperior","centsuperior","","","","","Aacutesmall","Agravesmall","Acircumflexsmall","Adieresissmall","Atildesmall","Aringsmall","Ccedillasmall","Eacutesmall","Egravesmall","Ecircumflexsmall","Edieresissmall","Iacutesmall","Igravesmall","Icircumflexsmall","Idieresissmall","Ntildesmall","Oacutesmall","Ogravesmall","Ocircumflexsmall","Odieresissmall","Otildesmall","Uacutesmall","Ugravesmall","Ucircumflexsmall","Udieresissmall","","eightsuperior","fourinferior","threeinferior","sixinferior","eightinferior","seveninferior","Scaronsmall","","centinferior","twoinferior","","Dieresissmall","","Caronsmall","osuperior","fiveinferior","","commainferior","periodinferior","Yacutesmall","","dollarinferior","","Thornsmall","","nineinferior","zeroinferior","Zcaronsmall","AEsmall","Oslashsmall","questiondownsmall","oneinferior","Lslashsmall","","","","","","","Cedillasmall","","","","","","OEsmall","figuredash","hyphensuperior","","","","","exclamdownsmall","","Ydieresissmall","","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","ninesuperior","zerosuperior","","esuperior","rsuperior","tsuperior","","","isuperior","ssuperior","dsuperior","","","","","","lsuperior","Ogoneksmall","Brevesmall","Macronsmall","bsuperior","nsuperior","msuperior","commasuperior","periodsuperior","Dotaccentsmall","Ringsmall"],e=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","space","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron"],f=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],g=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","bullet","Euro","bullet","quotesinglbase","florin","quotedblbase","ellipsis","dagger","daggerdbl","circumflex","perthousand","Scaron","guilsinglleft","OE","bullet","Zcaron","bullet","bullet","quoteleft","quoteright","quotedblleft","quotedblright","bullet","endash","emdash","tilde","trademark","scaron","guilsinglright","oe","bullet","zcaron","Ydieresis","space","exclamdown","cent","sterling","currency","yen","brokenbar","section","dieresis","copyright","ordfeminine","guillemotleft","logicalnot","hyphen","registered","macron","degree","plusminus","twosuperior","threesuperior","acute","mu","paragraph","periodcentered","cedilla","onesuperior","ordmasculine","guillemotright","onequarter","onehalf","threequarters","questiondown","Agrave","Aacute","Acircumflex","Atilde","Adieresis","Aring","AE","Ccedilla","Egrave","Eacute","Ecircumflex","Edieresis","Igrave","Iacute","Icircumflex","Idieresis","Eth","Ntilde","Ograve","Oacute","Ocircumflex","Otilde","Odieresis","multiply","Oslash","Ugrave","Uacute","Ucircumflex","Udieresis","Yacute","Thorn","germandbls","agrave","aacute","acircumflex","atilde","adieresis","aring","ae","ccedilla","egrave","eacute","ecircumflex","edieresis","igrave","iacute","icircumflex","idieresis","eth","ntilde","ograve","oacute","ocircumflex","otilde","odieresis","divide","oslash","ugrave","uacute","ucircumflex","udieresis","yacute","thorn","ydieresis"],h=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","universal","numbersign","existential","percent","ampersand","suchthat","parenleft","parenright","asteriskmath","plus","comma","minus","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","congruent","Alpha","Beta","Chi","Delta","Epsilon","Phi","Gamma","Eta","Iota","theta1","Kappa","Lambda","Mu","Nu","Omicron","Pi","Theta","Rho","Sigma","Tau","Upsilon","sigma1","Omega","Xi","Psi","Zeta","bracketleft","therefore","bracketright","perpendicular","underscore","radicalex","alpha","beta","chi","delta","epsilon","phi","gamma","eta","iota","phi1","kappa","lambda","mu","nu","omicron","pi","theta","rho","sigma","tau","upsilon","omega1","omega","xi","psi","zeta","braceleft","bar","braceright","similar","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Euro","Upsilon1","minute","lessequal","fraction","infinity","florin","club","diamond","heart","spade","arrowboth","arrowleft","arrowup","arrowright","arrowdown","degree","plusminus","second","greaterequal","multiply","proportional","partialdiff","bullet","divide","notequal","equivalence","approxequal","ellipsis","arrowvertex","arrowhorizex","carriagereturn","aleph","Ifraktur","Rfraktur","weierstrass","circlemultiply","circleplus","emptyset","intersection","union","propersuperset","reflexsuperset","notsubset","propersubset","reflexsubset","element","notelement","angle","gradient","registerserif","copyrightserif","trademarkserif","product","radical","dotmath","logicalnot","logicaland","logicalor","arrowdblboth","arrowdblleft","arrowdblup","arrowdblright","arrowdbldown","lozenge","angleleft","registersans","copyrightsans","trademarksans","summation","parenlefttp","parenleftex","parenleftbt","bracketlefttp","bracketleftex","bracketleftbt","bracelefttp","braceleftmid","braceleftbt","braceex","","angleright","integral","integraltp","integralex","integralbt","parenrighttp","parenrightex","parenrightbt","bracketrighttp","bracketrightex","bracketrightbt","bracerighttp","bracerightmid","bracerightbt"],i=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","a1","a2","a202","a3","a4","a5","a119","a118","a117","a11","a12","a13","a14","a15","a16","a105","a17","a18","a19","a20","a21","a22","a23","a24","a25","a26","a27","a28","a6","a7","a8","a9","a10","a29","a30","a31","a32","a33","a34","a35","a36","a37","a38","a39","a40","a41","a42","a43","a44","a45","a46","a47","a48","a49","a50","a51","a52","a53","a54","a55","a56","a57","a58","a59","a60","a61","a62","a63","a64","a65","a66","a67","a68","a69","a70","a71","a72","a73","a74","a203","a75","a204","a76","a77","a78","a79","a81","a82","a83","a84","a97","a98","a99","a100","","a89","a90","a93","a94","a91","a92","a205","a85","a206","a86","a87","a88","a95","a96","","","","","","","","","","","","","","","","","","","","a101","a102","a103","a104","a106","a107","a108","a112","a111","a110","a109","a120","a121","a122","a123","a124","a125","a126","a127","a128","a129","a130","a131","a132","a133","a134","a135","a136","a137","a138","a139","a140","a141","a142","a143","a144","a145","a146","a147","a148","a149","a150","a151","a152","a153","a154","a155","a156","a157","a158","a159","a160","a161","a163","a164","a196","a165","a192","a166","a167","a168","a169","a170","a171","a172","a173","a162","a174","a175","a176","a177","a178","a179","a193","a180","a199","a181","a200","a182","","a201","a183","a184","a197","a185","a194","a198","a186","a195","a187","a188","a189","a190","a191"];a.WinAnsiEncoding=g,a.StandardEncoding=f,a.MacRomanEncoding=e,a.SymbolSetEncoding=h,a.ZapfDingbatsEncoding=i,a.ExpertEncoding=c,a.getEncoding=b}),function(a,b){b(a.pdfjsCoreJpg={})}(this,function(a){/*
This code was forked from https://github.com/notmasteryet/jpgjs. The original
version was created by github user notmasteryet

- The JPEG specification can be found in the ITU CCITT Recommendation T.81
 (www.w3.org/Graphics/JPEG/itu-t81.pdf)
- The JFIF specification can be found in the JPEG File Interchange Format
 (www.w3.org/Graphics/JPEG/jfif3.pdf)
- The Adobe Application-Specific JPEG markers in the Supporting the DCT Filters
 in PostScript Level 2, Technical Note #5116
 (partners.adobe.com/public/developer/en/ps/sdk/5116.DCT_Filter.pdf)
*/
var b=function(){// sqrt(2) / 2
function a(){}function b(a,b){for(var c,d,e=0,f=[],g=16;g>0&&!a[g-1];)g--;f.push({children:[],index:0});var h,i=f[0];for(c=0;g>c;c++){for(d=0;d<a[c];d++){for(i=f.pop(),i.children[i.index]=b[e];i.index>0;)i=f.pop();for(i.index++,f.push(i);f.length<=c;)f.push(h={children:[],index:0}),i.children[i.index]=h.children,i=h;e++}g>c+1&&(
// p here points to last code
f.push(h={children:[],index:0}),i.children[i.index]=h.children,i=h)}return f[0].children}function c(a,b,c){return 64*((a.blocksPerLine+1)*b+c)}function d(a,b,d,e,f,g,i,j,k){function l(){if(H>0)return H--,G>>H&1;if(G=a[b++],255===G){var c=a[b++];if(c)throw"unexpected marker: "+(G<<8|c).toString(16)}return H=7,G>>>7}function m(a){for(var b=a;;){if(b=b[l()],"number"==typeof b)return b;if("object"!=typeof b)throw"invalid huffman sequence"}}function n(a){for(var b=0;a>0;)b=b<<1|l(),a--;return b}function o(a){if(1===a)return 1===l()?1:-1;var b=n(a);return b>=1<<a-1?b:b+(-1<<a)+1}function p(a,b){var c=m(a.huffmanTableDC),d=0===c?0:o(c);a.blockData[b]=a.pred+=d;for(var e=1;64>e;){var f=m(a.huffmanTableAC),g=15&f,i=f>>4;if(0!==g){e+=i;var j=h[e];a.blockData[b+j]=o(g),e++}else{if(15>i)break;e+=16}}}function q(a,b){var c=m(a.huffmanTableDC),d=0===c?0:o(c)<<k;a.blockData[b]=a.pred+=d}function r(a,b){a.blockData[b]|=l()<<k}function s(a,b){if(I>0)return void I--;for(var c=g,d=i;d>=c;){var e=m(a.huffmanTableAC),f=15&e,j=e>>4;if(0!==f){c+=j;var l=h[c];a.blockData[b+l]=o(f)*(1<<k),c++}else{if(15>j){I=n(j)+(1<<j)-1;break}c+=16}}}function t(a,b){for(var c,d,e=g,f=i,j=0;f>=e;){var p=h[e];switch(J){case 0:if(d=m(a.huffmanTableAC),c=15&d,j=d>>4,0===c)15>j?(I=n(j)+(1<<j),J=4):(j=16,J=1);else{if(1!==c)throw"invalid ACn encoding";w=o(c),J=j?2:3}continue;case 1:// skipping r zero items
case 2:a.blockData[b+p]?a.blockData[b+p]+=l()<<k:(j--,0===j&&(J=2===J?3:0));break;case 3:// set value for a zero item
a.blockData[b+p]?a.blockData[b+p]+=l()<<k:(a.blockData[b+p]=w<<k,J=0);break;case 4:// eob
a.blockData[b+p]&&(a.blockData[b+p]+=l()<<k)}e++}4===J&&(I--,0===I&&(J=0))}function u(a,b,d,e,f){var g=d/D|0,h=d%D,i=g*a.v+e,j=h*a.h+f,k=c(a,i,j);b(a,k)}function v(a,b,d){var e=d/a.blocksPerLine|0,f=d%a.blocksPerLine,g=c(a,e,f);b(a,g)}var w,x,y,z,A,B,C,D=d.mcusPerLine,E=d.progressive,F=b,G=0,H=0,I=0,J=0,K=e.length;C=E?0===g?0===j?q:r:0===j?s:t:p;var L,M,N=0;M=1===K?e[0].blocksPerLine*e[0].blocksPerColumn:D*d.mcusPerColumn,f||(f=M);for(var O,P;M>N;){
// reset interval stuff
for(y=0;K>y;y++)e[y].pred=0;if(I=0,1===K)for(x=e[0],B=0;f>B;B++)v(x,C,N),N++;else for(B=0;f>B;B++){for(y=0;K>y;y++)for(x=e[y],O=x.h,P=x.v,z=0;P>z;z++)for(A=0;O>A;A++)u(x,C,N,z,A);N++}if(H=0,L=a[b]<<8|a[b+1],65280>=L)throw"marker was not found";if(!(L>=65488&&65495>=L))break;// RSTx
b+=2}return b-F}
// A port of poppler's IDCT method which in turn is taken from:
//   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
//   'Practical Fast 1-D DCT Algorithms with 11 Multiplications',
//   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
//   988-991.
function e(a,b,c){
// inverse DCT on rows
for(var d,e,f,g,h,q,r,s,t,u,v,w,x,y,z,A,B,C=a.quantizationTable,D=a.blockData,E=0;64>E;E+=8)t=D[b+E],u=D[b+E+1],v=D[b+E+2],w=D[b+E+3],x=D[b+E+4],y=D[b+E+5],z=D[b+E+6],A=D[b+E+7],t*=C[E],0!==(u|v|w|x|y|z|A)?(u*=C[E+1],v*=C[E+2],w*=C[E+3],x*=C[E+4],y*=C[E+5],z*=C[E+6],A*=C[E+7],d=o*t+128>>8,e=o*x+128>>8,f=v,g=z,h=p*(u-A)+128>>8,s=p*(u+A)+128>>8,q=w<<4,r=y<<4,d=d+e+1>>1,e=d-e,B=f*n+g*m+128>>8,f=f*m-g*n+128>>8,g=B,h=h+r+1>>1,r=h-r,s=s+q+1>>1,q=s-q,d=d+g+1>>1,g=d-g,e=e+f+1>>1,f=e-f,B=h*l+s*k+2048>>12,h=h*k-s*l+2048>>12,s=B,B=q*j+r*i+2048>>12,q=q*i-r*j+2048>>12,r=B,c[E]=d+s,c[E+7]=d-s,c[E+1]=e+r,c[E+6]=e-r,c[E+2]=f+q,c[E+5]=f-q,c[E+3]=g+h,c[E+4]=g-h):(B=o*t+512>>10,c[E]=B,c[E+1]=B,c[E+2]=B,c[E+3]=B,c[E+4]=B,c[E+5]=B,c[E+6]=B,c[E+7]=B);
// inverse DCT on columns
for(var F=0;8>F;++F)t=c[F],u=c[F+8],v=c[F+16],w=c[F+24],x=c[F+32],y=c[F+40],z=c[F+48],A=c[F+56],0!==(u|v|w|x|y|z|A)?(d=o*t+2048>>12,e=o*x+2048>>12,f=v,g=z,h=p*(u-A)+2048>>12,s=p*(u+A)+2048>>12,q=w,r=y,d=(d+e+1>>1)+4112,e=d-e,B=f*n+g*m+2048>>12,f=f*m-g*n+2048>>12,g=B,h=h+r+1>>1,r=h-r,s=s+q+1>>1,q=s-q,d=d+g+1>>1,g=d-g,e=e+f+1>>1,f=e-f,B=h*l+s*k+2048>>12,h=h*k-s*l+2048>>12,s=B,B=q*j+r*i+2048>>12,q=q*i-r*j+2048>>12,r=B,t=d+s,A=d-s,u=e+r,z=e-r,v=f+q,y=f-q,w=g+h,x=g-h,t=16>t?0:t>=4080?255:t>>4,u=16>u?0:u>=4080?255:u>>4,v=16>v?0:v>=4080?255:v>>4,w=16>w?0:w>=4080?255:w>>4,x=16>x?0:x>=4080?255:x>>4,y=16>y?0:y>=4080?255:y>>4,z=16>z?0:z>=4080?255:z>>4,A=16>A?0:A>=4080?255:A>>4,D[b+F]=t,D[b+F+8]=u,D[b+F+16]=v,D[b+F+24]=w,D[b+F+32]=x,D[b+F+40]=y,D[b+F+48]=z,D[b+F+56]=A):(B=o*t+8192>>14,B=-2040>B?0:B>=2024?255:B+2056>>4,D[b+F]=B,D[b+F+8]=B,D[b+F+16]=B,D[b+F+24]=B,D[b+F+32]=B,D[b+F+40]=B,D[b+F+48]=B,D[b+F+56]=B)}function f(a,b){for(var d=b.blocksPerLine,f=b.blocksPerColumn,g=new Int16Array(64),h=0;f>h;h++)for(var i=0;d>i;i++){var j=c(b,h,i);e(b,j,g)}return b.blockData}function g(a){return 0>=a?0:a>=255?255:a}var h=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),i=4017,j=799,k=3406,l=2276,m=1567,n=3784,o=5793,p=2896;return a.prototype={parse:function(a){function c(){var b=a[k]<<8|a[k+1];return k+=2,b}function e(){var b=c(),d=a.subarray(k,k+b-2);return k+=d.length,d}function g(a){for(var b=Math.ceil(a.samplesPerLine/8/a.maxH),c=Math.ceil(a.scanLines/8/a.maxV),d=0;d<a.components.length;d++){M=a.components[d];var e=Math.ceil(Math.ceil(a.samplesPerLine/8)*M.h/a.maxH),f=Math.ceil(Math.ceil(a.scanLines/8)*M.v/a.maxV),g=b*M.h,h=c*M.v,i=64*h*(g+1);M.blockData=new Int16Array(i),M.blocksPerLine=e,M.blocksPerColumn=f}a.mcusPerLine=b,a.mcusPerColumn=c}var i,j,k=0,l=null,m=null,n=[],o=[],p=[],q=c();if(65496!==q)// SOI (Start of Image)
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
var v=this.decodeTransform;if(v)for(i=0;r>i;)for(j=0,k=0;q>j;j++,i++,k+=2)s[i]=(s[i]*v[k]>>8)+v[k+1];return s},_isColorConversionNeeded:function(){return this.adobe&&this.adobe.transformCode?!0:3===this.numComponents},_convertYccToRgb:function(a){for(var b,c,d,e=0,f=a.length;f>e;e+=3)b=a[e],c=a[e+1],d=a[e+2],a[e]=g(b-179.456+1.402*d),a[e+1]=g(b+135.459-.344*c-.714*d),a[e+2]=g(b-226.816+1.772*c);return a},_convertYcckToRgb:function(a){for(var b,c,d,e,f=0,h=0,i=a.length;i>h;h+=4){b=a[h],c=a[h+1],d=a[h+2],e=a[h+3];var j=-122.67195406894+c*(-660635669420364e-19*c+.000437130475926232*d-54080610064599e-18*b+.00048449797120281*e-.154362151871126)+d*(-.000957964378445773*d+.000817076911346625*b-.00477271405408747*e+1.53380253221734)+b*(.000961250184130688*b-.00266257332283933*e+.48357088451265)+e*(-.000336197177618394*e+.484791561490776),k=107.268039397724+c*(219927104525741e-19*c-.000640992018297945*d+.000659397001245577*b+.000426105652938837*e-.176491792462875)+d*(-.000778269941513683*d+.00130872261408275*b+.000770482631801132*e-.151051492775562)+b*(.00126935368114843*b-.00265090189010898*e+.25802910206845)+e*(-.000318913117588328*e-.213742400323665),l=-20.810012546947+c*(-.000570115196973677*c-263409051004589e-19*d+.0020741088115012*b-.00288260236853442*e+.814272968359295)+d*(-153496057440975e-19*d-.000132689043961446*b+.000560833691242812*e-.195152027534049)+b*(.00174418132927582*b-.00255243321439347*e+.116935020465145)+e*(-.000343531996510555*e+.24165260232407);a[f++]=g(j),a[f++]=g(k),a[f++]=g(l)}return a},_convertYcckToCmyk:function(a){for(var b,c,d,e=0,f=a.length;f>e;e+=4)b=a[e],c=a[e+1],d=a[e+2],a[e]=g(434.456-b-1.402*d),a[e+1]=g(119.541-b+.344*c+.714*d),a[e+2]=g(481.816-b-1.772*c);return a},_convertCmykToRgb:function(a){for(var b,c,d,e,f=0,g=-16581375,h=1/255/255,i=0,j=a.length;j>i;i+=4){b=a[i],c=a[i+1],d=a[i+2],e=a[i+3];var k=b*(-4.387332384609988*b+54.48615194189176*c+18.82290502165302*d+212.25662451639585*e-72734.4411664936)+c*(1.7149763477362134*c-5.6096736904047315*d-17.873870861415444*e-1401.7366389350734)+d*(-2.5217340131683033*d-21.248923337353073*e+4465.541406466231)-e*(21.86122147463605*e+48317.86113160301),l=b*(8.841041422036149*b+60.118027045597366*c+6.871425592049007*d+31.159100130055922*e-20220.756542821975)+c*(-15.310361306967817*c+17.575251261109482*d+131.35250912493976*e-48691.05921601825)+d*(4.444339102852739*d+9.8632861493405*e-6341.191035517494)-e*(20.737325471181034*e+47890.15695978492),m=b*(.8842522430003296*b+8.078677503112928*c+30.89978309703729*d-.23883238689178934*e-3616.812083916688)+c*(10.49593273432072*c+63.02378494754052*d+50.606957656360734*e-28620.90484698408)+d*(.03296041114873217*d+115.60384449646641*e-49363.43385999684)-e*(22.33816807309886*e+45932.16563550634);a[f++]=k>=0?255:g>=k?0:255+k*h|0,a[f++]=l>=0?255:g>=l?0:255+l*h|0,a[f++]=m>=0?255:g>=m?0:255+m*h|0}return a},getData:function(a,b,c){if(this.numComponents>4)throw"Unsupported color mode";
// type of data: Uint8Array(width * height * numComponents)
var d=this._getLinearizedBlockData(a,b);if(1===this.numComponents&&c){for(var e=d.length,f=new Uint8Array(3*e),g=0,h=0;e>h;h++){var i=d[h];f[g++]=i,f[g++]=i,f[g++]=i}return f}if(3===this.numComponents)return this._convertYccToRgb(d);if(4===this.numComponents){if(this._isColorConversionNeeded())return c?this._convertYcckToRgb(d):this._convertYcckToCmyk(d);if(c)return this._convertCmykToRgb(d)}return d}},a}();a.JpegImage=b}),function(a,b){b(a.pdfjsSharedUtil={})}(this,function(a){function b(a){X=a}function c(){return X}
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
return r.createObjectURL.apply(r,arguments)},i.revokeObjectURL=function(a){r.revokeObjectURL(a)}),a.URL=i}}(M),a.FONT_IDENTITY_MATRIX=N,a.IDENTITY_MATRIX=ia,a.OPS=W,a.VERBOSITY_LEVELS=V,a.UNSUPPORTED_FEATURES=Y,a.AnnotationBorderStyleType=S,a.AnnotationFlag=R,a.AnnotationType=Q,a.FontType=U,a.ImageKind=P,a.InvalidPDFException=aa,a.MessageHandler=K,a.MissingDataException=ea,a.MissingPDFException=ba,a.NotImplementedException=da,a.PageViewport=ka,a.PasswordException=$,a.PasswordResponses=Z,a.StatTimer=ma,a.StreamType=T,a.TextRenderingMode=O,a.UnexpectedResponseException=ca,a.UnknownErrorException=_,a.Util=ja,a.XRefParseException=fa,a.arrayByteLength=q,a.arraysToBytes=r,a.assert=i,a.bytesToString=o,a.createBlob=na,a.createPromiseCapability=J,a.createObjectURL=oa,a.deprecated=f,a.error=g,a.getLookupTableFactory=m,a.getVerbosityLevel=c,a.globalScope=M,a.info=d,a.isArray=H,a.isArrayBuffer=I,a.isBool=D,a.isEmptyObj=C,a.isInt=E,a.isNum=F,a.isString=G,a.isSameOrigin=j,a.isValidUrl=k,a.isLittleEndian=x,a.isEvalSupported=y,a.loadJpegStream=L,a.log2=t,a.readInt8=u,a.readUint16=v,a.readUint32=w,a.removeNullCharacters=n,a.setVerbosityLevel=b,a.shadow=l,a.string32=s,a.stringToBytes=p,a.stringToPDFString=z,a.stringToUTF8String=A,a.utf8StringToString=B,a.warn=e}),function(a,b){b(a.pdfjsCoreCFFParser={},a.pdfjsSharedUtil,a.pdfjsCoreCharsets,a.pdfjsCoreEncodings)}(this,function(a,b,c,d){var e=b.error,f=b.info,g=b.bytesToString,h=b.warn,i=b.isArray,j=b.Util,k=b.stringToBytes,l=b.assert,m=c.ISOAdobeCharset,n=c.ExpertCharset,o=c.ExpertSubsetCharset,p=d.StandardEncoding,q=d.ExpertEncoding,r=10,s=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],t=function(){function a(a,b,c){this.bytes=a.getBytes(),this.properties=b,this.seacAnalysisEnabled=!!c}var b=[null,{id:"hstem",min:2,stackClearing:!0,stem:!0},null,{id:"vstem",min:2,stackClearing:!0,stem:!0},{id:"vmoveto",min:1,stackClearing:!0},{id:"rlineto",min:2,resetStack:!0},{id:"hlineto",min:1,resetStack:!0},{id:"vlineto",min:1,resetStack:!0},{id:"rrcurveto",min:6,resetStack:!0},null,{id:"callsubr",min:1,undefStack:!0},{id:"return",min:0,undefStack:!0},null,// 12
null,{id:"endchar",min:0,stackClearing:!0},null,null,null,{id:"hstemhm",min:2,stackClearing:!0,stem:!0},{id:"hintmask",min:0,stackClearing:!0},{id:"cntrmask",min:0,stackClearing:!0},{id:"rmoveto",min:2,stackClearing:!0},{id:"hmoveto",min:1,stackClearing:!0},{id:"vstemhm",min:2,stackClearing:!0,stem:!0},{id:"rcurveline",min:8,resetStack:!0},{id:"rlinecurve",min:8,resetStack:!0},{id:"vvcurveto",min:4,resetStack:!0},{id:"hhcurveto",min:4,resetStack:!0},null,// shortint
{id:"callgsubr",min:1,undefStack:!0},{id:"vhcurveto",min:4,resetStack:!0},{id:"hvcurveto",min:4,resetStack:!0}],c=[null,null,null,{id:"and",min:2,stackDelta:-1},{id:"or",min:2,stackDelta:-1},{id:"not",min:1,stackDelta:0},null,null,null,{id:"abs",min:1,stackDelta:0},{id:"add",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]+a[b-1]}},{id:"sub",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]-a[b-1]}},{id:"div",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]/a[b-1]}},null,{id:"neg",min:1,stackDelta:0,stackFn:function(a,b){a[b-1]=-a[b-1]}},{id:"eq",min:2,stackDelta:-1},null,null,{id:"drop",min:1,stackDelta:-1},null,{id:"put",min:2,stackDelta:-2},{id:"get",min:1,stackDelta:0},{id:"ifelse",min:4,stackDelta:-3},{id:"random",min:0,stackDelta:1},{id:"mul",min:2,stackDelta:-1,stackFn:function(a,b){a[b-2]=a[b-2]*a[b-1]}},null,{id:"sqrt",min:1,stackDelta:0},{id:"dup",min:1,stackDelta:1},{id:"exch",min:2,stackDelta:0},{id:"index",min:2,stackDelta:0},{id:"roll",min:3,stackDelta:-2},null,null,null,{id:"hflex",min:7,resetStack:!0},{id:"flex",min:13,resetStack:!0},{id:"hflex1",min:9,resetStack:!0},{id:"flex1",min:11,resetStack:!0}];return a.prototype={parse:function(){var a=this.properties,b=new u;this.cff=b;
// The first five sections must be in order, all the others are reached
// via offsets contained in one of the below.
var c=this.parseHeader(),d=this.parseIndex(c.endPos),e=this.parseIndex(d.endPos),f=this.parseIndex(e.endPos),g=this.parseIndex(f.endPos),h=this.parseDict(e.obj.get(0)),i=this.createDict(z,h,b.strings);b.header=c.obj,b.names=this.parseNameIndex(d.obj),b.strings=this.parseStringIndex(f.obj),b.topDict=i,b.globalSubrIndex=g.obj,this.parsePrivateDict(b.topDict),b.isCIDFont=i.hasName("ROS");var j=i.getByName("CharStrings"),k=this.parseIndex(j).obj,l=i.getByName("FontMatrix");l&&(a.fontMatrix=l);var m=i.getByName("FontBBox");m&&(
// adjusting ascent/descent
a.ascent=m[3],a.descent=m[1],a.ascentScaled=!0);var n,o;if(b.isCIDFont){for(var p=this.parseIndex(i.getByName("FDArray")).obj,q=0,r=p.count;r>q;++q){var s=p.get(q),t=this.createDict(z,this.parseDict(s),b.strings);this.parsePrivateDict(t),b.fdArray.push(t)}
// cid fonts don't have an encoding
o=null,n=this.parseCharsets(i.getByName("charset"),k.count,b.strings,!0),b.fdSelect=this.parseFDSelect(i.getByName("FDSelect"),k.count)}else n=this.parseCharsets(i.getByName("charset"),k.count,b.strings,!1),o=this.parseEncoding(i.getByName("Encoding"),a,b.strings,n.charset);b.charset=n,b.encoding=o;var v=this.parseCharStrings(k,i.privateDict.subrsIndex,g.obj,b.fdSelect,b.fdArray);return b.charStrings=v.charStrings,b.seacs=v.seacs,b.widths=v.widths,b},parseHeader:function(){
// Prevent an infinite loop, by checking that the offset is within the
// bounds of the bytes array. Necessary in empty, or invalid, font files.
for(var a=this.bytes,b=a.length,c=0;b>c&&1!==a[c];)++c;c>=b?e("Invalid CFF header"):0!==c&&(f("cff data is shifted"),a=a.subarray(c),this.bytes=a);var d=a[0],g=a[1],h=a[2],i=a[3],j=new v(d,g,h,i);return{obj:j,endPos:h}},parseDict:function(a){function b(){var b=a[d++];return 30===b?c():28===b?(b=a[d++],b=(b<<24|a[d++]<<16)>>16):29===b?(b=a[d++],b=b<<8|a[d++],b=b<<8|a[d++],b=b<<8|a[d++]):b>=32&&246>=b?b-139:b>=247&&250>=b?256*(b-247)+a[d++]+108:b>=251&&254>=b?-(256*(b-251))-a[d++]-108:(e("255 is not a valid DICT command"),-1)}function c(){for(var b="",c=15,e=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"],f=a.length;f>d;){var g=a[d++],h=g>>4,i=15&g;if(h===c)break;if(b+=e[h],i===c)break;b+=e[i]}return parseFloat(b)}var d=0,f=[],g=[];d=0;for(var h=a.length;h>d;){var i=a[d];21>=i?(12===i&&(i=i<<8|a[++d]),g.push([i,f]),f=[],++d):f.push(b())}return g},parseIndex:function(a){var b,c,d=new x,e=this.bytes,f=e[a++]<<8|e[a++],g=[],h=a;if(0!==f){var i=e[a++],j=a+(f+1)*i-1;for(b=0,c=f+1;c>b;++b){for(var k=0,l=0;i>l;++l)k<<=8,k+=e[a++];g.push(j+k)}h=g[f]}for(b=0,c=g.length-1;c>b;++b){var m=g[b],n=g[b+1];d.add(e.subarray(m,n))}return{obj:d,endPos:h}},parseNameIndex:function(a){for(var b=[],c=0,d=a.count;d>c;++c){
// OTS also only permits certain characters in the name.
for(var e=a.get(c),f=Math.min(e.length,127),h=[],i=0;f>i;++i){var j=e[i];(0!==i||0!==j)&&(33>j||j>126||91===j||93===j||40===j||41===j||123===j||125===j||60===j||62===j||47===j||37===j||35===j)?h[i]=95:h[i]=j}b.push(g(h))}return b},parseStringIndex:function(a){for(var b=new w,c=0,d=a.count;d>c;++c){var e=a.get(c);b.add(g(e))}return b},createDict:function(a,b,c){for(var d=new a(c),e=0,f=b.length;f>e;++e){var g=b[e],h=g[0],i=g[1];d.setByKey(h,i)}return d},parseCharString:function(a,d,e,f){if(a.callDepth>r)return!1;for(var g=a.stackSize,i=a.stack,j=d.length,k=0;j>k;){var l=d[k++],m=null;if(12===l){var n=d[k++];0===n?(
// The CFF specification state that the 'dotsection' command
// (12, 0) is deprecated and treated as a no-op, but all Type2
// charstrings processors should support them. Unfortunately
// the font sanitizer don't. As a workaround the sequence (12, 0)
// is replaced by a useless (0, hmoveto).
d[k-2]=139,d[k-1]=22,g=0):m=c[n]}else if(28===l)// number (16 bit)
i[g]=(d[k]<<24|d[k+1]<<16)>>16,k+=2,g++;else if(14===l){if(g>=4&&(g-=4,this.seacAnalysisEnabled))return a.seac=i.slice(g,g+4),!1;m=b[l]}else if(l>=32&&246>=l)// number
i[g]=l-139,g++;else if(l>=247&&254>=l)// number (+1 bytes)
i[g]=251>l?(l-247<<8)+d[k]+108:-(l-251<<8)-d[k]-108,k++,g++;else if(255===l)// number (32 bit)
i[g]=(d[k]<<24|d[k+1]<<16|d[k+2]<<8|d[k+3])/65536,k+=4,g++;else if(19===l||20===l)a.hints+=g>>1,k+=a.hints+7>>3,g%=2,m=b[l];else{if(10===l||29===l){var o;if(o=10===l?e:f,!o)return m=b[l],h("Missing subrsIndex for "+m.id),!1;var p=32768;o.count<1240?p=107:o.count<33900&&(p=1131);var q=i[--g]+p;if(0>q||q>=o.count)return m=b[l],h("Out of bounds subrIndex for "+m.id),!1;a.stackSize=g,a.callDepth++;var s=this.parseCharString(a,o.get(q),e,f);if(!s)return!1;a.callDepth--,g=a.stackSize;continue}if(11===l)return a.stackSize=g,!0;m=b[l]}if(m){if(m.stem&&(a.hints+=g>>1),"min"in m&&!a.undefStack&&g<m.min)return h("Not enough parameters for "+m.id+"; actual: "+g+", expected: "+m.min),!1;a.firstStackClearing&&m.stackClearing&&(a.firstStackClearing=!1,g-=m.min,g>=2&&m.stem?g%=2:g>1&&h("Found too many parameters for stack-clearing command"),g>0&&i[g-1]>=0&&(a.width=i[g-1])),"stackDelta"in m?("stackFn"in m&&m.stackFn(i,g),g+=m.stackDelta):m.stackClearing?g=0:m.resetStack?(g=0,a.undefStack=!1):m.undefStack&&(g=0,a.undefStack=!0,a.firstStackClearing=!1)}}return a.stackSize=g,!0},parseCharStrings:function(a,b,c,d,e){for(var f=[],g=[],i=a.count,j=0;i>j;j++){var k=a.get(j),l={callDepth:0,stackSize:0,stack:[],undefStack:!0,hints:0,firstStackClearing:!0,seac:null,width:null},m=!0,n=null;if(d&&e.length){var o=d.getFDIndex(j);-1===o&&(h("Glyph index is not in fd select."),m=!1),o>=e.length&&(h("Invalid fd index for glyph index."),m=!1),m&&(n=e[o].privateDict.subrsIndex)}else b&&(n=b);m&&(m=this.parseCharString(l,k,n,c)),null!==l.width&&(g[j]=l.width),null!==l.seac&&(f[j]=l.seac),m||
// resetting invalid charstring to single 'endchar'
a.set(j,new Uint8Array([14]))}return{charStrings:a,seacs:f,widths:g}},emptyPrivateDictionary:function(a){var b=this.createDict(A,[],a.strings);a.setByKey(18,[0,0]),a.privateDict=b},parsePrivateDict:function(a){
// no private dict, do nothing
if(!a.hasName("Private"))return void this.emptyPrivateDictionary(a);var b=a.getByName("Private");
// make sure the params are formatted correctly
if(!i(b)||2!==b.length)return void a.removeByName("Private");var c=b[0],d=b[1];
// remove empty dicts or ones that refer to invalid location
if(0===c||d>=this.bytes.length)return void this.emptyPrivateDictionary(a);var e=d+c,f=this.bytes.subarray(d,e),g=this.parseDict(f),h=this.createDict(A,g,a.strings);
// Parse the Subrs index also since it's relative to the private dict.
if(a.privateDict=h,h.getByName("Subrs")){var j=h.getByName("Subrs"),k=d+j;
// Validate the offset.
if(0===j||k>=this.bytes.length)return void this.emptyPrivateDictionary(a);var l=this.parseIndex(k);h.subrsIndex=l.obj}},parseCharsets:function(a,b,c,d){if(0===a)return new C(!0,B.ISO_ADOBE,m);if(1===a)return new C(!0,B.EXPERT,n);if(2===a)return new C(!0,B.EXPERT_SUBSET,o);var f,g,h,i=this.bytes,j=a,k=i[a++],l=[".notdef"];switch(b-=1,k){case 0:for(h=0;b>h;h++)f=i[a++]<<8|i[a++],l.push(d?f:c.get(f));break;case 1:for(;l.length<=b;)for(f=i[a++]<<8|i[a++],g=i[a++],h=0;g>=h;h++)l.push(d?f++:c.get(f++));break;case 2:for(;l.length<=b;)for(f=i[a++]<<8|i[a++],g=i[a++]<<8|i[a++],h=0;g>=h;h++)l.push(d?f++:c.get(f++));break;default:e("Unknown charset format")}
// Raw won't be needed if we actually compile the charset.
var p=a,q=i.subarray(j,p);return new C(!1,k,l,q)},parseEncoding:function(a,b,c,d){function f(){var b=k[a++];for(h=0;b>h;h++){var e=k[a++],f=(k[a++]<<8)+(255&k[a++]);j[e]=d.indexOf(c.get(f))}}var g,h,i,j=Object.create(null),k=this.bytes,l=!1,m=!1,n=null;if(0===a||1===a){l=!0,g=a;var o=a?q:p;for(h=0,i=d.length;i>h;h++){var r=o.indexOf(d[h]);-1!==r&&(j[r]=h)}}else{var s=a;switch(g=k[a++],127&g){case 0:var t=k[a++];for(h=1;t>=h;h++)j[k[a++]]=h;break;case 1:var u=k[a++],v=1;for(h=0;u>h;h++)for(var w=k[a++],x=k[a++],y=w;w+x>=y;y++)j[y]=v++;break;default:e("Unknow encoding format: "+g+" in CFF")}var z=a;128&g&&(
// The font sanitizer does not support CFF encoding with a
// supplement, since the encoding is not really used to map
// between gid to glyph, let's overwrite what is declared in
// the top dictionary to let the sanitizer think the font use
// StandardEncoding, that's a lie but that's ok.
k[s]&=127,f(),m=!0),n=k.subarray(s,z)}return g=127&g,new D(l,g,j,n)},parseFDSelect:function(a,b){var c,d=a,f=this.bytes,g=f[a++],h=[];switch(g){case 0:for(c=0;b>c;++c){var i=f[a++];h.push(i)}break;case 3:var j=f[a++]<<8|f[a++];for(c=0;j>c;++c)for(var k=f[a++]<<8|f[a++],l=f[a++],m=f[a]<<8|f[a+1],n=k;m>n;++n)h.push(l);
// Advance past the sentinel(next).
a+=2;break;default:e("Unknown fdselect format "+g)}var o=a;return new E(h,f.subarray(d,o))}},a}(),u=function(){function a(){this.header=null,this.names=[],this.topDict=null,this.strings=new w,this.globalSubrIndex=null,
// The following could really be per font, but since we only have one font
// store them here.
this.encoding=null,this.charset=null,this.charStrings=null,this.fdArray=[],this.fdSelect=null,this.isCIDFont=!1}return a}(),v=function(){function a(a,b,c,d){this.major=a,this.minor=b,this.hdrSize=c,this.offSize=d}return a}(),w=function(){function a(){this.strings=[]}return a.prototype={get:function(a){return a>=0&&390>=a?s[a]:a-391<=this.strings.length?this.strings[a-391]:s[0]},add:function(a){this.strings.push(a)},get count(){return this.strings.length}},a}(),x=function(){function a(){this.objects=[],this.length=0}return a.prototype={add:function(a){this.length+=a.length,this.objects.push(a)},set:function(a,b){this.length+=b.length-this.objects[a].length,this.objects[a]=b},get:function(a){return this.objects[a]},get count(){return this.objects.length}},a}(),y=function(){function a(a,b){this.keyToNameMap=a.keyToNameMap,this.nameToKeyMap=a.nameToKeyMap,this.defaults=a.defaults,this.types=a.types,this.opcodes=a.opcodes,this.order=a.order,this.strings=b,this.values=Object.create(null)}return a.prototype={
// value should always be an array
setByKey:function(a,b){if(!(a in this.keyToNameMap))return!1;
// ignore empty values
if(0===b.length)return!0;var c=this.types[a];
// remove the array wrapping these types of values
return"num"!==c&&"sid"!==c&&"offset"!==c||(b=b[0]),this.values[a]=b,!0},setByName:function(a,b){a in this.nameToKeyMap||e('Invalid dictionary name "'+a+'"'),this.values[this.nameToKeyMap[a]]=b},hasName:function(a){return this.nameToKeyMap[a]in this.values},getByName:function(a){a in this.nameToKeyMap||e('Invalid dictionary name "'+a+'"');var b=this.nameToKeyMap[a];return b in this.values?this.values[b]:this.defaults[b]},removeByName:function(a){delete this.values[this.nameToKeyMap[a]]}},a.createTables=function(a){for(var b={keyToNameMap:{},nameToKeyMap:{},defaults:{},types:{},opcodes:{},order:[]},c=0,d=a.length;d>c;++c){var e=a[c],f=i(e[0])?(e[0][0]<<8)+e[0][1]:e[0];b.keyToNameMap[f]=e[1],b.nameToKeyMap[e[1]]=f,b.types[f]=e[2],b.defaults[f]=e[3],b.opcodes[f]=i(e[0])?e[0]:[e[0]],b.order.push(f)}return b},a}(),z=function(){function a(a){null===c&&(c=y.createTables(b)),y.call(this,c,a),this.privateDict=null}var b=[[[12,30],"ROS",["sid","sid","num"],null],[[12,20],"SyntheticBase","num",null],[0,"version","sid",null],[1,"Notice","sid",null],[[12,0],"Copyright","sid",null],[2,"FullName","sid",null],[3,"FamilyName","sid",null],[4,"Weight","sid",null],[[12,1],"isFixedPitch","num",0],[[12,2],"ItalicAngle","num",0],[[12,3],"UnderlinePosition","num",-100],[[12,4],"UnderlineThickness","num",50],[[12,5],"PaintType","num",0],[[12,6],"CharstringType","num",2],[[12,7],"FontMatrix",["num","num","num","num","num","num"],[.001,0,0,.001,0,0]],[13,"UniqueID","num",null],[5,"FontBBox",["num","num","num","num"],[0,0,0,0]],[[12,8],"StrokeWidth","num",0],[14,"XUID","array",null],[15,"charset","offset",0],[16,"Encoding","offset",0],[17,"CharStrings","offset",0],[18,"Private",["offset","offset"],null],[[12,21],"PostScript","sid",null],[[12,22],"BaseFontName","sid",null],[[12,23],"BaseFontBlend","delta",null],[[12,31],"CIDFontVersion","num",0],[[12,32],"CIDFontRevision","num",0],[[12,33],"CIDFontType","num",0],[[12,34],"CIDCount","num",8720],[[12,35],"UIDBase","num",null],
// XXX: CID Fonts on DirectWrite 6.1 only seem to work if FDSelect comes
// before FDArray.
[[12,37],"FDSelect","offset",null],[[12,36],"FDArray","offset",null],[[12,38],"FontName","sid",null]],c=null;return a.prototype=Object.create(y.prototype),a}(),A=function(){function a(a){null===c&&(c=y.createTables(b)),y.call(this,c,a),this.subrsIndex=null}var b=[[6,"BlueValues","delta",null],[7,"OtherBlues","delta",null],[8,"FamilyBlues","delta",null],[9,"FamilyOtherBlues","delta",null],[[12,9],"BlueScale","num",.039625],[[12,10],"BlueShift","num",7],[[12,11],"BlueFuzz","num",1],[10,"StdHW","num",null],[11,"StdVW","num",null],[[12,12],"StemSnapH","delta",null],[[12,13],"StemSnapV","delta",null],[[12,14],"ForceBold","num",0],[[12,17],"LanguageGroup","num",0],[[12,18],"ExpansionFactor","num",.06],[[12,19],"initialRandomSeed","num",0],[20,"defaultWidthX","num",0],[21,"nominalWidthX","num",0],[19,"Subrs","offset",null]],c=null;return a.prototype=Object.create(y.prototype),a}(),B={ISO_ADOBE:0,EXPERT:1,EXPERT_SUBSET:2},C=function(){function a(a,b,c,d){this.predefined=a,this.format=b,this.charset=c,this.raw=d}return a}(),D=function(){function a(a,b,c,d){this.predefined=a,this.format=b,this.encoding=c,this.raw=d}return a}(),E=function(){function a(a,b){this.fdSelect=a,this.raw=b}return a.prototype={getFDIndex:function(a){return 0>a||a>=this.fdSelect.length?-1:this.fdSelect[a]}},a}(),F=function(){function a(){this.offsets=Object.create(null)}return a.prototype={isTracking:function(a){return a in this.offsets},track:function(a,b){a in this.offsets&&e("Already tracking location of "+a),this.offsets[a]=b},offset:function(a){for(var b in this.offsets)this.offsets[b]+=a},setEntryLocation:function(a,b,c){a in this.offsets||e("Not tracking location of "+a);for(var d=c.data,f=this.offsets[a],g=5,h=0,i=b.length;i>h;++h){var j=h*g+f,k=j+1,l=j+2,m=j+3,n=j+4;
// It's easy to screw up offsets so perform this sanity check.
29===d[j]&&0===d[k]&&0===d[l]&&0===d[m]&&0===d[n]||e("writing to an offset that is not empty");var o=b[h];d[j]=29,d[k]=o>>24&255,d[l]=o>>16&255,d[m]=o>>8&255,d[n]=255&o}}},a}(),G=function(){function a(a){this.cff=a}return a.prototype={compile:function(){var a=this.cff,b={data:[],length:0,add:function(a){this.data=this.data.concat(a),this.length=this.data.length}},c=this.compileHeader(a.header);b.add(c);var d=this.compileNameIndex(a.names);if(b.add(d),a.isCIDFont&&a.topDict.hasName("FontMatrix")){var e=a.topDict.getByName("FontMatrix");a.topDict.removeByName("FontMatrix");for(var f=0,g=a.fdArray.length;g>f;f++){var h=a.fdArray[f],i=e.slice(0);h.hasName("FontMatrix")&&(i=j.transform(i,h.getByName("FontMatrix"))),h.setByName("FontMatrix",i)}}var k=this.compileTopDicts([a.topDict],b.length,a.isCIDFont);b.add(k.output);var l=k.trackers[0],m=this.compileStringIndex(a.strings.strings);b.add(m);var n=this.compileIndex(a.globalSubrIndex);
// Now start on the other entries that have no specfic order.
if(b.add(n),a.encoding&&a.topDict.hasName("Encoding"))if(a.encoding.predefined)l.setEntryLocation("Encoding",[a.encoding.format],b);else{var o=this.compileEncoding(a.encoding);l.setEntryLocation("Encoding",[b.length],b),b.add(o)}if(a.charset&&a.topDict.hasName("charset"))if(a.charset.predefined)l.setEntryLocation("charset",[a.charset.format],b);else{var p=this.compileCharset(a.charset);l.setEntryLocation("charset",[b.length],b),b.add(p)}var q=this.compileCharStrings(a.charStrings);if(l.setEntryLocation("CharStrings",[b.length],b),b.add(q),a.isCIDFont){
// For some reason FDSelect must be in front of FDArray on windows. OSX
// and linux don't seem to care.
l.setEntryLocation("FDSelect",[b.length],b);var r=this.compileFDSelect(a.fdSelect.raw);b.add(r),
// It is unclear if the sub font dictionary can have CID related
// dictionary keys, but the sanitizer doesn't like them so remove them.
k=this.compileTopDicts(a.fdArray,b.length,!0),l.setEntryLocation("FDArray",[b.length],b),b.add(k.output);var s=k.trackers;this.compilePrivateDicts(a.fdArray,s,b)}
// If the font data ends with INDEX whose object data is zero-length,
// the sanitizer will bail out. Add a dummy byte to avoid that.
return this.compilePrivateDicts([a.topDict],[l],b),b.add([0]),b.data},encodeNumber:function(a){return parseFloat(a)!==parseInt(a,10)||isNaN(a)?this.encodeFloat(a):this.encodeInteger(a)},encodeFloat:function(a){var b=a.toString(),c=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(b);if(c){var d=parseFloat("1e"+((c[2]?+c[2]:0)+c[1].length));b=(Math.round(a*d)/d).toString()}var e,f,g="";for(e=0,f=b.length;f>e;++e){var h=b[e];g+="e"===h?"-"===b[++e]?"c":"b":"."===h?"a":"-"===h?"e":h}g+=1&g.length?"f":"ff";var i=[30];for(e=0,f=g.length;f>e;e+=2)i.push(parseInt(g.substr(e,2),16));return i},encodeInteger:function(a){var b;return a>=-107&&107>=a?b=[a+139]:a>=108&&1131>=a?(a-=108,b=[(a>>8)+247,255&a]):a>=-1131&&-108>=a?(a=-a-108,b=[(a>>8)+251,255&a]):b=a>=-32768&&32767>=a?[28,a>>8&255,255&a]:[29,a>>24&255,a>>16&255,a>>8&255,255&a],b},compileHeader:function(a){return[a.major,a.minor,a.hdrSize,a.offSize]},compileNameIndex:function(a){for(var b=new x,c=0,d=a.length;d>c;++c)b.add(k(a[c]));return this.compileIndex(b)},compileTopDicts:function(a,b,c){for(var d=[],e=new x,f=0,g=a.length;g>f;++f){var h=a[f];c&&(h.removeByName("CIDFontVersion"),h.removeByName("CIDFontRevision"),h.removeByName("CIDFontType"),h.removeByName("CIDCount"),h.removeByName("UIDBase"));var i=new F,j=this.compileDict(h,i);d.push(i),e.add(j),i.offset(b)}return e=this.compileIndex(e,d),{trackers:d,output:e}},compilePrivateDicts:function(a,b,c){for(var d=0,e=a.length;e>d;++d){var f=a[d];l(f.privateDict&&f.hasName("Private"),"There must be an private dictionary.");var g=f.privateDict,h=new F,i=this.compileDict(g,h),j=c.length;if(h.offset(j),i.length||(
// The private dictionary was empty, set the output length to zero to
// ensure the offset length isn't out of bounds in the eyes of the
// sanitizer.
j=0),b[d].setEntryLocation("Private",[i.length,j],c),c.add(i),g.subrsIndex&&g.hasName("Subrs")){var k=this.compileIndex(g.subrsIndex);h.setEntryLocation("Subrs",[i.length],c),c.add(k)}}},compileDict:function(a,b){for(var c=[],d=a.order,f=0;f<d.length;++f){var g=d[f];if(g in a.values){var h=a.values[g],j=a.types[g];
// Remove any empty dict values.
if(i(j)||(j=[j]),i(h)||(h=[h]),0!==h.length){for(var k=0,l=j.length;l>k;++k){var m=j[k],n=h[k];switch(m){case"num":case"sid":c=c.concat(this.encodeNumber(n));break;case"offset":
// For offsets we just insert a 32bit integer so we don't have to
// deal with figuring out the length of the offset when it gets
// replaced later on by the compiler.
var o=a.keyToNameMap[g];
// Some offsets have the offset and the length, so just record the
// position of the first one.
b.isTracking(o)||b.track(o,c.length),c=c.concat([29,0,0,0,0]);break;case"array":case"delta":c=c.concat(this.encodeNumber(n));for(var p=1,q=h.length;q>p;++p)c=c.concat(this.encodeNumber(h[p]));break;default:e("Unknown data type of "+m)}}c=c.concat(a.opcodes[g])}}}return c},compileStringIndex:function(a){for(var b=new x,c=0,d=a.length;d>c;++c)b.add(k(a[c]));return this.compileIndex(b)},compileGlobalSubrIndex:function(){var a=this.cff.globalSubrIndex;this.out.writeByteArray(this.compileIndex(a))},compileCharStrings:function(a){return this.compileIndex(a)},compileCharset:function(a){return this.compileTypedArray(a.raw)},compileEncoding:function(a){return this.compileTypedArray(a.raw)},compileFDSelect:function(a){return this.compileTypedArray(a)},compileTypedArray:function(a){for(var b=[],c=0,d=a.length;d>c;++c)b[c]=a[c];return b},compileIndex:function(a,b){b=b||[];var c=a.objects,d=c.length;
// If there is no object, just create an index. This technically
// should just be [0, 0] but OTS has an issue with that.
if(0===d)return[0,0,0];var e,f=[d>>8&255,255&d],g=1;for(e=0;d>e;++e)g+=c[e].length;var h;h=256>g?1:65536>g?2:16777216>g?3:4,f.push(h);
// Add another offset after this one because we need a new offset
var i=1;for(e=0;d+1>e;e++)1===h?f.push(255&i):2===h?f.push(i>>8&255,255&i):3===h?f.push(i>>16&255,i>>8&255,255&i):f.push(i>>>24&255,i>>16&255,i>>8&255,255&i),c[e]&&(i+=c[e].length);for(e=0;d>e;e++){
// Notify the tracker where the object will be offset in the data.
b[e]&&b[e].offset(f.length);for(var j=0,k=c[e].length;k>j;j++)f.push(c[e][j])}return f}},a}();a.CFFStandardStrings=s,a.CFFParser=t,a.CFF=u,a.CFFHeader=v,a.CFFStrings=w,a.CFFIndex=x,a.CFFCharset=C,a.CFFTopDict=z,a.CFFPrivateDict=A,a.CFFCompiler=G}),function(a,b){b(a.pdfjsCoreChunkedStream={},a.pdfjsSharedUtil)}(this,function(a,b){var c=b.MissingDataException,d=b.arrayByteLength,e=b.arraysToBytes,f=b.assert,g=b.createPromiseCapability,h=b.isInt,i=b.isEmptyObj,j=function(){function a(a,b,c){this.bytes=new Uint8Array(a),this.start=0,this.pos=0,this.end=a,this.chunkSize=b,this.loadedChunks=[],this.numChunksLoaded=0,this.numChunks=Math.ceil(a/b),this.manager=c,this.progressiveDataLength=0,this.lastSuccessfulEnsureByteChunk=-1}
// required methods for a stream. if a particular stream does not
// implement these, an error should be thrown
return a.prototype={getMissingChunks:function(){for(var a=[],b=0,c=this.numChunks;c>b;++b)this.loadedChunks[b]||a.push(b);return a},getBaseStreams:function(){return[this]},allChunksLoaded:function(){return this.numChunksLoaded===this.numChunks},onReceiveData:function(a,b){var c=a+b.byteLength;f(a%this.chunkSize===0,"Bad begin offset: "+a);
// Using this.length is inaccurate here since this.start can be moved
// See ChunkedStream.moveStart()
var d=this.bytes.length;f(c%this.chunkSize===0||c===d,"Bad end offset: "+c),this.bytes.set(new Uint8Array(b),a);var e,g=this.chunkSize,h=Math.floor(a/g),i=Math.floor((c-1)/g)+1;for(e=h;i>e;++e)this.loadedChunks[e]||(this.loadedChunks[e]=!0,++this.numChunksLoaded)},onReceiveProgressiveData:function(a){var b=this.progressiveDataLength,c=Math.floor(b/this.chunkSize);this.bytes.set(new Uint8Array(a),b),b+=a.byteLength,this.progressiveDataLength=b;var d,e=b>=this.end?this.numChunks:Math.floor(b/this.chunkSize);for(d=c;e>d;++d)this.loadedChunks[d]||(this.loadedChunks[d]=!0,++this.numChunksLoaded)},ensureByte:function(a){var b=Math.floor(a/this.chunkSize);if(b!==this.lastSuccessfulEnsureByteChunk){if(!this.loadedChunks[b])throw new c(a,a+1);this.lastSuccessfulEnsureByteChunk=b}},ensureRange:function(a,b){if(!(a>=b||b<=this.progressiveDataLength))for(var d=this.chunkSize,e=Math.floor(a/d),f=Math.floor((b-1)/d)+1,g=e;f>g;++g)if(!this.loadedChunks[g])throw new c(a,b)},nextEmptyChunk:function(a){for(var b,c=this.numChunks,d=0;c>d;++d)// Wrap around to beginning
if(b=(a+d)%c,!this.loadedChunks[b])return b;return null},hasChunk:function(a){return!!this.loadedChunks[a]},get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){var a=this.pos;return a>=this.end?-1:(this.ensureByte(a),this.bytes[this.pos++])},getUint16:function(){var a=this.getByte(),b=this.getByte();return-1===a||-1===b?-1:(a<<8)+b},getInt32:function(){var a=this.getByte(),b=this.getByte(),c=this.getByte(),d=this.getByte();return(a<<24)+(b<<16)+(c<<8)+d},
// returns subarray of original buffer
// should only be read
getBytes:function(a){var b=this.bytes,c=this.pos,d=this.end;if(!a)return this.ensureRange(c,d),b.subarray(c,d);var e=c+a;return e>d&&(e=d),this.ensureRange(c,e),this.pos=e,b.subarray(c,e)},peekByte:function(){var a=this.getByte();return this.pos--,a},peekBytes:function(a){var b=this.getBytes(a);return this.pos-=b.length,b},getByteRange:function(a,b){return this.ensureRange(a,b),this.bytes.subarray(a,b)},skip:function(a){a||(a=1),this.pos+=a},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(a,b,c){function d(){}this.ensureRange(a,a+b),d.prototype=Object.create(this),d.prototype.getMissingChunks=function(){for(var a=this.chunkSize,b=Math.floor(this.start/a),c=Math.floor((this.end-1)/a)+1,d=[],e=b;c>e;++e)this.loadedChunks[e]||d.push(e);return d};var e=new d;return e.pos=e.start=a,e.end=a+b||this.end,e.dict=c,e},isStream:!0},a}(),k=function(){function a(a,b){var c=b.rangeChunkSize,d=b.length;this.stream=new j(d,c,this),this.length=d,this.chunkSize=c,this.pdfNetworkStream=a,this.url=b.url,this.disableAutoFetch=b.disableAutoFetch,this.msgHandler=b.msgHandler,this.currRequestId=0,this.chunksNeededByRequest=Object.create(null),this.requestsByChunk=Object.create(null),this.promisesByRequest=Object.create(null),this.progressiveDataLength=0,this.aborted=!1,this._loadedStreamCapability=g()}return a.prototype={onLoadedStream:function(){return this._loadedStreamCapability.promise},sendRequest:function(a,b){var c=this.pdfNetworkStream.getRangeReader(a,b);c.isStreamingSupported||(c.onProgress=this.onProgress.bind(this));var f=[],g=0,h=this,i=new Promise(function(a,b){var i=function(j){try{if(!j.done){var k=j.value;return f.push(k),g+=d(k),c.isStreamingSupported&&h.onProgress({loaded:g}),void c.read().then(i,b)}var l=e(f);f=null,a(l)}catch(m){b(m)}};c.read().then(i,b)});i.then(function(b){this.aborted||this.onReceiveData({chunk:b,begin:a})}.bind(this))},
// Get all the chunks that are not yet loaded and groups them into
// contiguous ranges to load in as few requests as possible
requestAllChunks:function(){var a=this.stream.getMissingChunks();return this._requestChunks(a),this._loadedStreamCapability.promise},_requestChunks:function(a){var b,c,d=this.currRequestId++,e=Object.create(null);for(this.chunksNeededByRequest[d]=e,b=0,c=a.length;c>b;b++)this.stream.hasChunk(a[b])||(e[a[b]]=!0);if(i(e))return Promise.resolve();var f=g();this.promisesByRequest[d]=f;var h=[];for(var j in e)j=0|j,j in this.requestsByChunk||(this.requestsByChunk[j]=[],h.push(j)),this.requestsByChunk[j].push(d);if(!h.length)return f.promise;var k=this.groupChunks(h);for(b=0;b<k.length;++b){var l=k[b],m=l.beginChunk*this.chunkSize,n=Math.min(l.endChunk*this.chunkSize,this.length);this.sendRequest(m,n)}return f.promise},getStream:function(){return this.stream},
// Loads any chunks in the requested range that are not yet loaded
requestRange:function(a,b){b=Math.min(b,this.length);for(var c=this.getBeginChunk(a),d=this.getEndChunk(b),e=[],f=c;d>f;++f)e.push(f);return this._requestChunks(e)},requestRanges:function(a){a=a||[];for(var b=[],c=0;c<a.length;c++)for(var d=this.getBeginChunk(a[c].begin),e=this.getEndChunk(a[c].end),f=d;e>f;++f)b.indexOf(f)<0&&b.push(f);return b.sort(function(a,b){return a-b}),this._requestChunks(b)},
// Groups a sorted array of chunks into as few contiguous larger
// chunks as possible
groupChunks:function(a){for(var b=[],c=-1,d=-1,e=0;e<a.length;++e){var f=a[e];0>c&&(c=f),d>=0&&d+1!==f&&(b.push({beginChunk:c,endChunk:d+1}),c=f),e+1===a.length&&b.push({beginChunk:c,endChunk:f+1}),d=f}return b},onProgress:function(a){var b=this.stream.numChunksLoaded*this.chunkSize+a.loaded;this.msgHandler.send("DocProgress",{loaded:b,total:this.length})},onReceiveData:function(a){var b=a.chunk,c=void 0===a.begin,d=c?this.progressiveDataLength:a.begin,e=d+b.byteLength,f=Math.floor(d/this.chunkSize),g=e<this.length?Math.floor(e/this.chunkSize):Math.ceil(e/this.chunkSize);c?(this.stream.onReceiveProgressiveData(b),this.progressiveDataLength=e):this.stream.onReceiveData(d,b),this.stream.allChunksLoaded()&&this._loadedStreamCapability.resolve(this.stream);var j,k,l=[];for(b=f;g>b;++b){
// The server might return more chunks than requested
var m=this.requestsByChunk[b]||[];for(delete this.requestsByChunk[b],j=0;j<m.length;++j){k=m[j];var n=this.chunksNeededByRequest[k];b in n&&delete n[b],i(n)&&l.push(k)}}
// If there are no pending requests, automatically fetch the next
// unfetched chunk of the PDF
if(!this.disableAutoFetch&&i(this.requestsByChunk)){var o;if(1===this.stream.numChunksLoaded){
// This is a special optimization so that after fetching the first
// chunk, rather than fetching the second chunk, we fetch the last
// chunk.
var p=this.stream.numChunks-1;this.stream.hasChunk(p)||(o=p)}else o=this.stream.nextEmptyChunk(g);h(o)&&this._requestChunks([o])}for(j=0;j<l.length;++j){k=l[j];var q=this.promisesByRequest[k];delete this.promisesByRequest[k],q.resolve()}this.msgHandler.send("DocProgress",{loaded:this.stream.numChunksLoaded*this.chunkSize,total:this.length})},onError:function(a){this._loadedStreamCapability.reject(a)},getBeginChunk:function(a){var b=Math.floor(a/this.chunkSize);return b},getEndChunk:function(a){var b=Math.floor((a-1)/this.chunkSize)+1;return b},abort:function(){this.aborted=!0,this.pdfNetworkStream&&this.pdfNetworkStream.cancelAllRequests("abort");for(var a in this.promisesByRequest){var b=this.promisesByRequest[a];b.reject(new Error("Request was aborted"))}}},a}();a.ChunkedStream=j,a.ChunkedStreamManager=k}),function(a,b){b(a.pdfjsCoreGlyphList={},a.pdfjsSharedUtil)}(this,function(a,b){var c=b.getLookupTableFactory,d=c(function(a){a.A=65,a.AE=198,a.AEacute=508,a.AEmacron=482,a.AEsmall=63462,a.Aacute=193,a.Aacutesmall=63457,a.Abreve=258,a.Abreveacute=7854,a.Abrevecyrillic=1232,a.Abrevedotbelow=7862,a.Abrevegrave=7856,a.Abrevehookabove=7858,a.Abrevetilde=7860,a.Acaron=461,a.Acircle=9398,a.Acircumflex=194,a.Acircumflexacute=7844,a.Acircumflexdotbelow=7852,a.Acircumflexgrave=7846,a.Acircumflexhookabove=7848,a.Acircumflexsmall=63458,a.Acircumflextilde=7850,a.Acute=63177,a.Acutesmall=63412,a.Acyrillic=1040,a.Adblgrave=512,a.Adieresis=196,a.Adieresiscyrillic=1234,a.Adieresismacron=478,a.Adieresissmall=63460,a.Adotbelow=7840,a.Adotmacron=480,a.Agrave=192,a.Agravesmall=63456,a.Ahookabove=7842,a.Aiecyrillic=1236,a.Ainvertedbreve=514,a.Alpha=913,a.Alphatonos=902,a.Amacron=256,a.Amonospace=65313,a.Aogonek=260,a.Aring=197,a.Aringacute=506,a.Aringbelow=7680,a.Aringsmall=63461,a.Asmall=63329,a.Atilde=195,a.Atildesmall=63459,a.Aybarmenian=1329,a.B=66,a.Bcircle=9399,a.Bdotaccent=7682,a.Bdotbelow=7684,a.Becyrillic=1041,a.Benarmenian=1330,a.Beta=914,a.Bhook=385,a.Blinebelow=7686,a.Bmonospace=65314,a.Brevesmall=63220,a.Bsmall=63330,a.Btopbar=386,a.C=67,a.Caarmenian=1342,a.Cacute=262,a.Caron=63178,a.Caronsmall=63221,a.Ccaron=268,a.Ccedilla=199,a.Ccedillaacute=7688,a.Ccedillasmall=63463,a.Ccircle=9400,a.Ccircumflex=264,a.Cdot=266,a.Cdotaccent=266,a.Cedillasmall=63416,a.Chaarmenian=1353,a.Cheabkhasiancyrillic=1212,a.Checyrillic=1063,a.Chedescenderabkhasiancyrillic=1214,a.Chedescendercyrillic=1206,a.Chedieresiscyrillic=1268,a.Cheharmenian=1347,a.Chekhakassiancyrillic=1227,a.Cheverticalstrokecyrillic=1208,a.Chi=935,a.Chook=391,a.Circumflexsmall=63222,a.Cmonospace=65315,a.Coarmenian=1361,a.Csmall=63331,a.D=68,a.DZ=497,a.DZcaron=452,a.Daarmenian=1332,a.Dafrican=393,a.Dcaron=270,a.Dcedilla=7696,a.Dcircle=9401,a.Dcircumflexbelow=7698,a.Dcroat=272,a.Ddotaccent=7690,a.Ddotbelow=7692,a.Decyrillic=1044,a.Deicoptic=1006,a.Delta=8710,a.Deltagreek=916,a.Dhook=394,a.Dieresis=63179,a.DieresisAcute=63180,a.DieresisGrave=63181,a.Dieresissmall=63400,a.Digammagreek=988,a.Djecyrillic=1026,a.Dlinebelow=7694,a.Dmonospace=65316,a.Dotaccentsmall=63223,a.Dslash=272,a.Dsmall=63332,a.Dtopbar=395,a.Dz=498,a.Dzcaron=453,a.Dzeabkhasiancyrillic=1248,a.Dzecyrillic=1029,a.Dzhecyrillic=1039,a.E=69,a.Eacute=201,a.Eacutesmall=63465,a.Ebreve=276,a.Ecaron=282,a.Ecedillabreve=7708,a.Echarmenian=1333,a.Ecircle=9402,a.Ecircumflex=202,a.Ecircumflexacute=7870,a.Ecircumflexbelow=7704,a.Ecircumflexdotbelow=7878,a.Ecircumflexgrave=7872,a.Ecircumflexhookabove=7874,a.Ecircumflexsmall=63466,a.Ecircumflextilde=7876,a.Ecyrillic=1028,a.Edblgrave=516,a.Edieresis=203,a.Edieresissmall=63467,a.Edot=278,a.Edotaccent=278,a.Edotbelow=7864,a.Efcyrillic=1060,a.Egrave=200,a.Egravesmall=63464,a.Eharmenian=1335,a.Ehookabove=7866,a.Eightroman=8551,a.Einvertedbreve=518,a.Eiotifiedcyrillic=1124,a.Elcyrillic=1051,a.Elevenroman=8554,a.Emacron=274,a.Emacronacute=7702,a.Emacrongrave=7700,a.Emcyrillic=1052,a.Emonospace=65317,a.Encyrillic=1053,a.Endescendercyrillic=1186,a.Eng=330,a.Enghecyrillic=1188,a.Enhookcyrillic=1223,a.Eogonek=280,a.Eopen=400,a.Epsilon=917,a.Epsilontonos=904,a.Ercyrillic=1056,a.Ereversed=398,a.Ereversedcyrillic=1069,a.Escyrillic=1057,a.Esdescendercyrillic=1194,a.Esh=425,a.Esmall=63333,a.Eta=919,a.Etarmenian=1336,a.Etatonos=905,a.Eth=208,a.Ethsmall=63472,a.Etilde=7868,a.Etildebelow=7706,a.Euro=8364,a.Ezh=439,a.Ezhcaron=494,a.Ezhreversed=440,a.F=70,a.Fcircle=9403,a.Fdotaccent=7710,a.Feharmenian=1366,a.Feicoptic=996,a.Fhook=401,a.Fitacyrillic=1138,a.Fiveroman=8548,a.Fmonospace=65318,a.Fourroman=8547,a.Fsmall=63334,a.G=71,a.GBsquare=13191,a.Gacute=500,a.Gamma=915,a.Gammaafrican=404,a.Gangiacoptic=1002,a.Gbreve=286,a.Gcaron=486,a.Gcedilla=290,a.Gcircle=9404,a.Gcircumflex=284,a.Gcommaaccent=290,a.Gdot=288,a.Gdotaccent=288,a.Gecyrillic=1043,a.Ghadarmenian=1346,a.Ghemiddlehookcyrillic=1172,a.Ghestrokecyrillic=1170,a.Gheupturncyrillic=1168,a.Ghook=403,a.Gimarmenian=1331,a.Gjecyrillic=1027,a.Gmacron=7712,a.Gmonospace=65319,a.Grave=63182,a.Gravesmall=63328,a.Gsmall=63335,a.Gsmallhook=667,a.Gstroke=484,a.H=72,a.H18533=9679,a.H18543=9642,a.H18551=9643,a.H22073=9633,a.HPsquare=13259,a.Haabkhasiancyrillic=1192,a.Hadescendercyrillic=1202,a.Hardsigncyrillic=1066,a.Hbar=294,a.Hbrevebelow=7722,a.Hcedilla=7720,a.Hcircle=9405,a.Hcircumflex=292,a.Hdieresis=7718,a.Hdotaccent=7714,a.Hdotbelow=7716,a.Hmonospace=65320,a.Hoarmenian=1344,a.Horicoptic=1e3,a.Hsmall=63336,a.Hungarumlaut=63183,a.Hungarumlautsmall=63224,a.Hzsquare=13200,a.I=73,a.IAcyrillic=1071,a.IJ=306,a.IUcyrillic=1070,a.Iacute=205,a.Iacutesmall=63469,a.Ibreve=300,a.Icaron=463,a.Icircle=9406,a.Icircumflex=206,a.Icircumflexsmall=63470,a.Icyrillic=1030,a.Idblgrave=520,a.Idieresis=207,a.Idieresisacute=7726,a.Idieresiscyrillic=1252,a.Idieresissmall=63471,a.Idot=304,a.Idotaccent=304,a.Idotbelow=7882,a.Iebrevecyrillic=1238,a.Iecyrillic=1045,a.Ifraktur=8465,a.Igrave=204,a.Igravesmall=63468,a.Ihookabove=7880,a.Iicyrillic=1048,a.Iinvertedbreve=522,a.Iishortcyrillic=1049,a.Imacron=298,a.Imacroncyrillic=1250,a.Imonospace=65321,a.Iniarmenian=1339,a.Iocyrillic=1025,a.Iogonek=302,a.Iota=921,a.Iotaafrican=406,a.Iotadieresis=938,a.Iotatonos=906,a.Ismall=63337,a.Istroke=407,a.Itilde=296,a.Itildebelow=7724,a.Izhitsacyrillic=1140,a.Izhitsadblgravecyrillic=1142,a.J=74,a.Jaarmenian=1345,a.Jcircle=9407,a.Jcircumflex=308,a.Jecyrillic=1032,a.Jheharmenian=1355,a.Jmonospace=65322,a.Jsmall=63338,a.K=75,a.KBsquare=13189,a.KKsquare=13261,a.Kabashkircyrillic=1184,a.Kacute=7728,a.Kacyrillic=1050,a.Kadescendercyrillic=1178,a.Kahookcyrillic=1219,a.Kappa=922,a.Kastrokecyrillic=1182,a.Kaverticalstrokecyrillic=1180,a.Kcaron=488,a.Kcedilla=310,a.Kcircle=9408,a.Kcommaaccent=310,a.Kdotbelow=7730,a.Keharmenian=1364,a.Kenarmenian=1343,a.Khacyrillic=1061,a.Kheicoptic=998,a.Khook=408,a.Kjecyrillic=1036,a.Klinebelow=7732,a.Kmonospace=65323,a.Koppacyrillic=1152,a.Koppagreek=990,a.Ksicyrillic=1134,a.Ksmall=63339,a.L=76,a.LJ=455,a.LL=63167,a.Lacute=313,a.Lambda=923,a.Lcaron=317,a.Lcedilla=315,a.Lcircle=9409,a.Lcircumflexbelow=7740,a.Lcommaaccent=315,a.Ldot=319,a.Ldotaccent=319,a.Ldotbelow=7734,a.Ldotbelowmacron=7736,a.Liwnarmenian=1340,a.Lj=456,a.Ljecyrillic=1033,a.Llinebelow=7738,a.Lmonospace=65324,a.Lslash=321,a.Lslashsmall=63225,a.Lsmall=63340,a.M=77,a.MBsquare=13190,a.Macron=63184,a.Macronsmall=63407,a.Macute=7742,a.Mcircle=9410,a.Mdotaccent=7744,a.Mdotbelow=7746,a.Menarmenian=1348,a.Mmonospace=65325,a.Msmall=63341,a.Mturned=412,a.Mu=924,a.N=78,a.NJ=458,a.Nacute=323,a.Ncaron=327,a.Ncedilla=325,a.Ncircle=9411,a.Ncircumflexbelow=7754,a.Ncommaaccent=325,a.Ndotaccent=7748,a.Ndotbelow=7750,a.Nhookleft=413,a.Nineroman=8552,a.Nj=459,a.Njecyrillic=1034,a.Nlinebelow=7752,a.Nmonospace=65326,a.Nowarmenian=1350,a.Nsmall=63342,a.Ntilde=209,a.Ntildesmall=63473,a.Nu=925,a.O=79,a.OE=338,a.OEsmall=63226,a.Oacute=211,a.Oacutesmall=63475,a.Obarredcyrillic=1256,a.Obarreddieresiscyrillic=1258,a.Obreve=334,a.Ocaron=465,a.Ocenteredtilde=415,a.Ocircle=9412,a.Ocircumflex=212,a.Ocircumflexacute=7888,a.Ocircumflexdotbelow=7896,a.Ocircumflexgrave=7890,a.Ocircumflexhookabove=7892,a.Ocircumflexsmall=63476,a.Ocircumflextilde=7894,a.Ocyrillic=1054,a.Odblacute=336,a.Odblgrave=524,a.Odieresis=214,a.Odieresiscyrillic=1254,a.Odieresissmall=63478,a.Odotbelow=7884,a.Ogoneksmall=63227,a.Ograve=210,a.Ogravesmall=63474,a.Oharmenian=1365,a.Ohm=8486,a.Ohookabove=7886,a.Ohorn=416,a.Ohornacute=7898,a.Ohorndotbelow=7906,a.Ohorngrave=7900,a.Ohornhookabove=7902,a.Ohorntilde=7904,a.Ohungarumlaut=336,a.Oi=418,a.Oinvertedbreve=526,a.Omacron=332,a.Omacronacute=7762,a.Omacrongrave=7760,a.Omega=8486,a.Omegacyrillic=1120,a.Omegagreek=937,a.Omegaroundcyrillic=1146,a.Omegatitlocyrillic=1148,a.Omegatonos=911,a.Omicron=927,a.Omicrontonos=908,a.Omonospace=65327,a.Oneroman=8544,a.Oogonek=490,a.Oogonekmacron=492,a.Oopen=390,a.Oslash=216,a.Oslashacute=510,a.Oslashsmall=63480,a.Osmall=63343,a.Ostrokeacute=510,a.Otcyrillic=1150,a.Otilde=213,a.Otildeacute=7756,a.Otildedieresis=7758,a.Otildesmall=63477,a.P=80,a.Pacute=7764,a.Pcircle=9413,a.Pdotaccent=7766,a.Pecyrillic=1055,a.Peharmenian=1354,a.Pemiddlehookcyrillic=1190,a.Phi=934,a.Phook=420,a.Pi=928,a.Piwrarmenian=1363,a.Pmonospace=65328,a.Psi=936,a.Psicyrillic=1136,a.Psmall=63344,a.Q=81,a.Qcircle=9414,a.Qmonospace=65329,a.Qsmall=63345,a.R=82,a.Raarmenian=1356,a.Racute=340,a.Rcaron=344,a.Rcedilla=342,a.Rcircle=9415,a.Rcommaaccent=342,a.Rdblgrave=528,a.Rdotaccent=7768,a.Rdotbelow=7770,a.Rdotbelowmacron=7772,a.Reharmenian=1360,a.Rfraktur=8476,a.Rho=929,a.Ringsmall=63228,a.Rinvertedbreve=530,a.Rlinebelow=7774,a.Rmonospace=65330,a.Rsmall=63346,a.Rsmallinverted=641,a.Rsmallinvertedsuperior=694,a.S=83,a.SF010000=9484,a.SF020000=9492,a.SF030000=9488,a.SF040000=9496,a.SF050000=9532,a.SF060000=9516,a.SF070000=9524,a.SF080000=9500,a.SF090000=9508,a.SF100000=9472,a.SF110000=9474,a.SF190000=9569,a.SF200000=9570,a.SF210000=9558,a.SF220000=9557,a.SF230000=9571,a.SF240000=9553,a.SF250000=9559,a.SF260000=9565,a.SF270000=9564,a.SF280000=9563,a.SF360000=9566,a.SF370000=9567,a.SF380000=9562,a.SF390000=9556,a.SF400000=9577,a.SF410000=9574,a.SF420000=9568,a.SF430000=9552,a.SF440000=9580,a.SF450000=9575,a.SF460000=9576,a.SF470000=9572,a.SF480000=9573,a.SF490000=9561,a.SF500000=9560,a.SF510000=9554,a.SF520000=9555,a.SF530000=9579,a.SF540000=9578,a.Sacute=346,a.Sacutedotaccent=7780,a.Sampigreek=992,a.Scaron=352,a.Scarondotaccent=7782,a.Scaronsmall=63229,a.Scedilla=350,a.Schwa=399,a.Schwacyrillic=1240,a.Schwadieresiscyrillic=1242,a.Scircle=9416,a.Scircumflex=348,a.Scommaaccent=536,a.Sdotaccent=7776,a.Sdotbelow=7778,a.Sdotbelowdotaccent=7784,a.Seharmenian=1357,a.Sevenroman=8550,a.Shaarmenian=1351,a.Shacyrillic=1064,a.Shchacyrillic=1065,a.Sheicoptic=994,a.Shhacyrillic=1210,a.Shimacoptic=1004,a.Sigma=931,a.Sixroman=8549,a.Smonospace=65331,a.Softsigncyrillic=1068,a.Ssmall=63347,a.Stigmagreek=986,a.T=84,a.Tau=932,a.Tbar=358,a.Tcaron=356,a.Tcedilla=354,a.Tcircle=9417,a.Tcircumflexbelow=7792,a.Tcommaaccent=354,a.Tdotaccent=7786,a.Tdotbelow=7788,a.Tecyrillic=1058,a.Tedescendercyrillic=1196,a.Tenroman=8553,a.Tetsecyrillic=1204,a.Theta=920,a.Thook=428,a.Thorn=222,a.Thornsmall=63486,a.Threeroman=8546,a.Tildesmall=63230,a.Tiwnarmenian=1359,a.Tlinebelow=7790,a.Tmonospace=65332,a.Toarmenian=1337,a.Tonefive=444,a.Tonesix=388,a.Tonetwo=423,a.Tretroflexhook=430,a.Tsecyrillic=1062,a.Tshecyrillic=1035,a.Tsmall=63348,a.Twelveroman=8555,a.Tworoman=8545,a.U=85,a.Uacute=218,a.Uacutesmall=63482,a.Ubreve=364,a.Ucaron=467,a.Ucircle=9418,a.Ucircumflex=219,a.Ucircumflexbelow=7798,a.Ucircumflexsmall=63483,a.Ucyrillic=1059,a.Udblacute=368,a.Udblgrave=532,a.Udieresis=220,a.Udieresisacute=471,a.Udieresisbelow=7794,a.Udieresiscaron=473,a.Udieresiscyrillic=1264,a.Udieresisgrave=475,a.Udieresismacron=469,a.Udieresissmall=63484,a.Udotbelow=7908,a.Ugrave=217,a.Ugravesmall=63481,a.Uhookabove=7910,a.Uhorn=431,a.Uhornacute=7912,a.Uhorndotbelow=7920,a.Uhorngrave=7914,a.Uhornhookabove=7916,a.Uhorntilde=7918,a.Uhungarumlaut=368,a.Uhungarumlautcyrillic=1266,a.Uinvertedbreve=534,a.Ukcyrillic=1144,a.Umacron=362,a.Umacroncyrillic=1262,a.Umacrondieresis=7802,a.Umonospace=65333,a.Uogonek=370,a.Upsilon=933,a.Upsilon1=978,a.Upsilonacutehooksymbolgreek=979,a.Upsilonafrican=433,a.Upsilondieresis=939,a.Upsilondieresishooksymbolgreek=980,a.Upsilonhooksymbol=978,a.Upsilontonos=910,a.Uring=366,a.Ushortcyrillic=1038,a.Usmall=63349,a.Ustraightcyrillic=1198,a.Ustraightstrokecyrillic=1200,a.Utilde=360,a.Utildeacute=7800,a.Utildebelow=7796,a.V=86,a.Vcircle=9419,a.Vdotbelow=7806,a.Vecyrillic=1042,a.Vewarmenian=1358,a.Vhook=434,a.Vmonospace=65334,a.Voarmenian=1352,a.Vsmall=63350,a.Vtilde=7804,a.W=87,a.Wacute=7810,a.Wcircle=9420,a.Wcircumflex=372,a.Wdieresis=7812,a.Wdotaccent=7814,a.Wdotbelow=7816,a.Wgrave=7808,a.Wmonospace=65335,a.Wsmall=63351,a.X=88,a.Xcircle=9421,a.Xdieresis=7820,a.Xdotaccent=7818,a.Xeharmenian=1341,a.Xi=926,a.Xmonospace=65336,a.Xsmall=63352,a.Y=89,a.Yacute=221,a.Yacutesmall=63485,a.Yatcyrillic=1122,a.Ycircle=9422,a.Ycircumflex=374,a.Ydieresis=376,a.Ydieresissmall=63487,a.Ydotaccent=7822,a.Ydotbelow=7924,a.Yericyrillic=1067,a.Yerudieresiscyrillic=1272,a.Ygrave=7922,a.Yhook=435,a.Yhookabove=7926,a.Yiarmenian=1349,a.Yicyrillic=1031,a.Yiwnarmenian=1362,a.Ymonospace=65337,a.Ysmall=63353,a.Ytilde=7928,a.Yusbigcyrillic=1130,a.Yusbigiotifiedcyrillic=1132,a.Yuslittlecyrillic=1126,a.Yuslittleiotifiedcyrillic=1128,a.Z=90,a.Zaarmenian=1334,a.Zacute=377,a.Zcaron=381,a.Zcaronsmall=63231,a.Zcircle=9423,a.Zcircumflex=7824,a.Zdot=379,a.Zdotaccent=379,a.Zdotbelow=7826,a.Zecyrillic=1047,a.Zedescendercyrillic=1176,a.Zedieresiscyrillic=1246,a.Zeta=918,a.Zhearmenian=1338,a.Zhebrevecyrillic=1217,a.Zhecyrillic=1046,a.Zhedescendercyrillic=1174,a.Zhedieresiscyrillic=1244,a.Zlinebelow=7828,a.Zmonospace=65338,a.Zsmall=63354,a.Zstroke=437,a.a=97,a.aabengali=2438,a.aacute=225,a.aadeva=2310,a.aagujarati=2694,a.aagurmukhi=2566,a.aamatragurmukhi=2622,a.aarusquare=13059,a.aavowelsignbengali=2494,a.aavowelsigndeva=2366,a.aavowelsigngujarati=2750,a.abbreviationmarkarmenian=1375,a.abbreviationsigndeva=2416,a.abengali=2437,a.abopomofo=12570,a.abreve=259,a.abreveacute=7855,a.abrevecyrillic=1233,a.abrevedotbelow=7863,a.abrevegrave=7857,a.abrevehookabove=7859,a.abrevetilde=7861,a.acaron=462,a.acircle=9424,a.acircumflex=226,a.acircumflexacute=7845,a.acircumflexdotbelow=7853,a.acircumflexgrave=7847,a.acircumflexhookabove=7849,a.acircumflextilde=7851,a.acute=180,a.acutebelowcmb=791,a.acutecmb=769,a.acutecomb=769,a.acutedeva=2388,a.acutelowmod=719,a.acutetonecmb=833,a.acyrillic=1072,a.adblgrave=513,a.addakgurmukhi=2673,a.adeva=2309,a.adieresis=228,a.adieresiscyrillic=1235,a.adieresismacron=479,a.adotbelow=7841,a.adotmacron=481,a.ae=230,a.aeacute=509,a.aekorean=12624,a.aemacron=483,a.afii00208=8213,a.afii08941=8356,a.afii10017=1040,a.afii10018=1041,a.afii10019=1042,a.afii10020=1043,a.afii10021=1044,a.afii10022=1045,a.afii10023=1025,a.afii10024=1046,a.afii10025=1047,a.afii10026=1048,a.afii10027=1049,a.afii10028=1050,a.afii10029=1051,a.afii10030=1052,a.afii10031=1053,a.afii10032=1054,a.afii10033=1055,a.afii10034=1056,a.afii10035=1057,a.afii10036=1058,a.afii10037=1059,a.afii10038=1060,a.afii10039=1061,a.afii10040=1062,a.afii10041=1063,a.afii10042=1064,a.afii10043=1065,a.afii10044=1066,a.afii10045=1067,a.afii10046=1068,a.afii10047=1069,a.afii10048=1070,a.afii10049=1071,a.afii10050=1168,a.afii10051=1026,a.afii10052=1027,a.afii10053=1028,a.afii10054=1029,a.afii10055=1030,a.afii10056=1031,a.afii10057=1032,a.afii10058=1033,a.afii10059=1034,a.afii10060=1035,a.afii10061=1036,a.afii10062=1038,a.afii10063=63172,a.afii10064=63173,a.afii10065=1072,a.afii10066=1073,a.afii10067=1074,a.afii10068=1075,a.afii10069=1076,a.afii10070=1077,a.afii10071=1105,a.afii10072=1078,a.afii10073=1079,a.afii10074=1080,a.afii10075=1081,a.afii10076=1082,a.afii10077=1083,a.afii10078=1084,a.afii10079=1085,a.afii10080=1086,a.afii10081=1087,a.afii10082=1088,a.afii10083=1089,a.afii10084=1090,a.afii10085=1091,a.afii10086=1092,a.afii10087=1093,a.afii10088=1094,a.afii10089=1095,a.afii10090=1096,a.afii10091=1097,a.afii10092=1098,a.afii10093=1099,a.afii10094=1100,a.afii10095=1101,a.afii10096=1102,a.afii10097=1103,a.afii10098=1169,a.afii10099=1106,a.afii10100=1107,a.afii10101=1108,a.afii10102=1109,a.afii10103=1110,a.afii10104=1111,a.afii10105=1112,a.afii10106=1113,a.afii10107=1114,a.afii10108=1115,a.afii10109=1116,a.afii10110=1118,a.afii10145=1039,a.afii10146=1122,a.afii10147=1138,a.afii10148=1140,a.afii10192=63174,a.afii10193=1119,a.afii10194=1123,a.afii10195=1139,a.afii10196=1141,a.afii10831=63175,a.afii10832=63176,a.afii10846=1241,a.afii299=8206,a.afii300=8207,a.afii301=8205,a.afii57381=1642,a.afii57388=1548,a.afii57392=1632,a.afii57393=1633,a.afii57394=1634,a.afii57395=1635,a.afii57396=1636,a.afii57397=1637,a.afii57398=1638,a.afii57399=1639,a.afii57400=1640,a.afii57401=1641,a.afii57403=1563,a.afii57407=1567,a.afii57409=1569,a.afii57410=1570,a.afii57411=1571,a.afii57412=1572,a.afii57413=1573,a.afii57414=1574,a.afii57415=1575,a.afii57416=1576,a.afii57417=1577,a.afii57418=1578,a.afii57419=1579,a.afii57420=1580,a.afii57421=1581,a.afii57422=1582,a.afii57423=1583,a.afii57424=1584,a.afii57425=1585,a.afii57426=1586,a.afii57427=1587,a.afii57428=1588,a.afii57429=1589,a.afii57430=1590,a.afii57431=1591,a.afii57432=1592,a.afii57433=1593,a.afii57434=1594,a.afii57440=1600,a.afii57441=1601,a.afii57442=1602,a.afii57443=1603,a.afii57444=1604,a.afii57445=1605,a.afii57446=1606,a.afii57448=1608,a.afii57449=1609,a.afii57450=1610,a.afii57451=1611,a.afii57452=1612,a.afii57453=1613,a.afii57454=1614,a.afii57455=1615,a.afii57456=1616,a.afii57457=1617,a.afii57458=1618,a.afii57470=1607,a.afii57505=1700,a.afii57506=1662,a.afii57507=1670,a.afii57508=1688,a.afii57509=1711,a.afii57511=1657,a.afii57512=1672,a.afii57513=1681,a.afii57514=1722,a.afii57519=1746,a.afii57534=1749,a.afii57636=8362,a.afii57645=1470,a.afii57658=1475,a.afii57664=1488,a.afii57665=1489,a.afii57666=1490,a.afii57667=1491,a.afii57668=1492,a.afii57669=1493,a.afii57670=1494,a.afii57671=1495,a.afii57672=1496,a.afii57673=1497,a.afii57674=1498,a.afii57675=1499,a.afii57676=1500,a.afii57677=1501,a.afii57678=1502,a.afii57679=1503,a.afii57680=1504,a.afii57681=1505,a.afii57682=1506,a.afii57683=1507,a.afii57684=1508,a.afii57685=1509,a.afii57686=1510,a.afii57687=1511,a.afii57688=1512,a.afii57689=1513,a.afii57690=1514,a.afii57694=64298,a.afii57695=64299,a.afii57700=64331,a.afii57705=64287,a.afii57716=1520,a.afii57717=1521,a.afii57718=1522,a.afii57723=64309,a.afii57793=1460,a.afii57794=1461,a.afii57795=1462,a.afii57796=1467,a.afii57797=1464,a.afii57798=1463,a.afii57799=1456,a.afii57800=1458,a.afii57801=1457,a.afii57802=1459,a.afii57803=1474,a.afii57804=1473,a.afii57806=1465,a.afii57807=1468,a.afii57839=1469,a.afii57841=1471,a.afii57842=1472,a.afii57929=700,a.afii61248=8453,a.afii61289=8467,a.afii61352=8470,a.afii61573=8236,a.afii61574=8237,a.afii61575=8238,a.afii61664=8204,a.afii63167=1645,a.afii64937=701,a.agrave=224,a.agujarati=2693,a.agurmukhi=2565,a.ahiragana=12354,a.ahookabove=7843,a.aibengali=2448,a.aibopomofo=12574,a.aideva=2320,a.aiecyrillic=1237,a.aigujarati=2704,a.aigurmukhi=2576,a.aimatragurmukhi=2632,a.ainarabic=1593,a.ainfinalarabic=65226,a.aininitialarabic=65227,a.ainmedialarabic=65228,a.ainvertedbreve=515,a.aivowelsignbengali=2504,a.aivowelsigndeva=2376,a.aivowelsigngujarati=2760,a.akatakana=12450,a.akatakanahalfwidth=65393,a.akorean=12623,a.alef=1488,a.alefarabic=1575,a.alefdageshhebrew=64304,a.aleffinalarabic=65166,a.alefhamzaabovearabic=1571,a.alefhamzaabovefinalarabic=65156,a.alefhamzabelowarabic=1573,a.alefhamzabelowfinalarabic=65160,a.alefhebrew=1488,a.aleflamedhebrew=64335,a.alefmaddaabovearabic=1570,a.alefmaddaabovefinalarabic=65154,a.alefmaksuraarabic=1609,a.alefmaksurafinalarabic=65264,a.alefmaksurainitialarabic=65267,a.alefmaksuramedialarabic=65268,a.alefpatahhebrew=64302,a.alefqamatshebrew=64303,a.aleph=8501,a.allequal=8780,a.alpha=945,a.alphatonos=940,a.amacron=257,a.amonospace=65345,a.ampersand=38,a.ampersandmonospace=65286,a.ampersandsmall=63270,a.amsquare=13250,a.anbopomofo=12578,a.angbopomofo=12580,a.angbracketleft=12296,// Glyph is missing from Adobe's original list.
a.angbracketright=12297,// Glyph is missing from Adobe's original list.
a.angkhankhuthai=3674,a.angle=8736,a.anglebracketleft=12296,a.anglebracketleftvertical=65087,a.anglebracketright=12297,a.anglebracketrightvertical=65088,a.angleleft=9001,a.angleright=9002,a.angstrom=8491,a.anoteleia=903,a.anudattadeva=2386,a.anusvarabengali=2434,a.anusvaradeva=2306,a.anusvaragujarati=2690,a.aogonek=261,a.apaatosquare=13056,a.aparen=9372,a.apostrophearmenian=1370,a.apostrophemod=700,a.apple=63743,a.approaches=8784,a.approxequal=8776,a.approxequalorimage=8786,a.approximatelyequal=8773,a.araeaekorean=12686,a.araeakorean=12685,a.arc=8978,a.arighthalfring=7834,a.aring=229,a.aringacute=507,a.aringbelow=7681,a.arrowboth=8596,a.arrowdashdown=8675,a.arrowdashleft=8672,a.arrowdashright=8674,a.arrowdashup=8673,a.arrowdblboth=8660,a.arrowdbldown=8659,a.arrowdblleft=8656,a.arrowdblright=8658,a.arrowdblup=8657,a.arrowdown=8595,a.arrowdownleft=8601,a.arrowdownright=8600,a.arrowdownwhite=8681,a.arrowheaddownmod=709,a.arrowheadleftmod=706,a.arrowheadrightmod=707,a.arrowheadupmod=708,a.arrowhorizex=63719,a.arrowleft=8592,a.arrowleftdbl=8656,a.arrowleftdblstroke=8653,a.arrowleftoverright=8646,a.arrowleftwhite=8678,a.arrowright=8594,a.arrowrightdblstroke=8655,a.arrowrightheavy=10142,a.arrowrightoverleft=8644,a.arrowrightwhite=8680,a.arrowtableft=8676,a.arrowtabright=8677,a.arrowup=8593,a.arrowupdn=8597,a.arrowupdnbse=8616,a.arrowupdownbase=8616,a.arrowupleft=8598,a.arrowupleftofdown=8645,a.arrowupright=8599,a.arrowupwhite=8679,a.arrowvertex=63718,a.asciicircum=94,a.asciicircummonospace=65342,a.asciitilde=126,a.asciitildemonospace=65374,a.ascript=593,a.ascriptturned=594,a.asmallhiragana=12353,a.asmallkatakana=12449,a.asmallkatakanahalfwidth=65383,a.asterisk=42,a.asteriskaltonearabic=1645,a.asteriskarabic=1645,a.asteriskmath=8727,a.asteriskmonospace=65290,a.asterisksmall=65121,a.asterism=8258,a.asuperior=63209,a.asymptoticallyequal=8771,a.at=64,a.atilde=227,a.atmonospace=65312,a.atsmall=65131,a.aturned=592,a.aubengali=2452,a.aubopomofo=12576,a.audeva=2324,a.augujarati=2708,a.augurmukhi=2580,a.aulengthmarkbengali=2519,a.aumatragurmukhi=2636,a.auvowelsignbengali=2508,a.auvowelsigndeva=2380,a.auvowelsigngujarati=2764,a.avagrahadeva=2365,a.aybarmenian=1377,a.ayin=1506,a.ayinaltonehebrew=64288,a.ayinhebrew=1506,a.b=98,a.babengali=2476,a.backslash=92,a.backslashmonospace=65340,a.badeva=2348,a.bagujarati=2732,a.bagurmukhi=2604,a.bahiragana=12400,a.bahtthai=3647,a.bakatakana=12496,a.bar=124,a.barmonospace=65372,a.bbopomofo=12549,a.bcircle=9425,a.bdotaccent=7683,a.bdotbelow=7685,a.beamedsixteenthnotes=9836,a.because=8757,a.becyrillic=1073,a.beharabic=1576,a.behfinalarabic=65168,a.behinitialarabic=65169,a.behiragana=12409,a.behmedialarabic=65170,a.behmeeminitialarabic=64671,a.behmeemisolatedarabic=64520,a.behnoonfinalarabic=64621,a.bekatakana=12505,a.benarmenian=1378,a.bet=1489,a.beta=946,a.betasymbolgreek=976,a.betdagesh=64305,a.betdageshhebrew=64305,a.bethebrew=1489,a.betrafehebrew=64332,a.bhabengali=2477,a.bhadeva=2349,a.bhagujarati=2733,a.bhagurmukhi=2605,a.bhook=595,a.bihiragana=12403,a.bikatakana=12499,a.bilabialclick=664,a.bindigurmukhi=2562,a.birusquare=13105,a.blackcircle=9679,a.blackdiamond=9670,a.blackdownpointingtriangle=9660,a.blackleftpointingpointer=9668,a.blackleftpointingtriangle=9664,a.blacklenticularbracketleft=12304,a.blacklenticularbracketleftvertical=65083,a.blacklenticularbracketright=12305,a.blacklenticularbracketrightvertical=65084,a.blacklowerlefttriangle=9699,a.blacklowerrighttriangle=9698,a.blackrectangle=9644,a.blackrightpointingpointer=9658,a.blackrightpointingtriangle=9654,a.blacksmallsquare=9642,a.blacksmilingface=9787,a.blacksquare=9632,a.blackstar=9733,a.blackupperlefttriangle=9700,a.blackupperrighttriangle=9701,a.blackuppointingsmalltriangle=9652,a.blackuppointingtriangle=9650,a.blank=9251,a.blinebelow=7687,a.block=9608,a.bmonospace=65346,a.bobaimaithai=3610,a.bohiragana=12412,a.bokatakana=12508,a.bparen=9373,a.bqsquare=13251,a.braceex=63732,a.braceleft=123,a.braceleftbt=63731,a.braceleftmid=63730,a.braceleftmonospace=65371,a.braceleftsmall=65115,a.bracelefttp=63729,a.braceleftvertical=65079,a.braceright=125,a.bracerightbt=63742,a.bracerightmid=63741,a.bracerightmonospace=65373,a.bracerightsmall=65116,a.bracerighttp=63740,a.bracerightvertical=65080,a.bracketleft=91,a.bracketleftbt=63728,a.bracketleftex=63727,a.bracketleftmonospace=65339,a.bracketlefttp=63726,a.bracketright=93,a.bracketrightbt=63739,a.bracketrightex=63738,a.bracketrightmonospace=65341,a.bracketrighttp=63737,a.breve=728,a.brevebelowcmb=814,a.brevecmb=774,a.breveinvertedbelowcmb=815,a.breveinvertedcmb=785,a.breveinverteddoublecmb=865,a.bridgebelowcmb=810,a.bridgeinvertedbelowcmb=826,a.brokenbar=166,a.bstroke=384,a.bsuperior=63210,a.btopbar=387,a.buhiragana=12406,a.bukatakana=12502,a.bullet=8226,a.bulletinverse=9688,a.bulletoperator=8729,a.bullseye=9678,a.c=99,a.caarmenian=1390,a.cabengali=2458,a.cacute=263,a.cadeva=2330,a.cagujarati=2714,a.cagurmukhi=2586,a.calsquare=13192,a.candrabindubengali=2433,a.candrabinducmb=784,a.candrabindudeva=2305,a.candrabindugujarati=2689,a.capslock=8682,a.careof=8453,a.caron=711,a.caronbelowcmb=812,a.caroncmb=780,a.carriagereturn=8629,a.cbopomofo=12568,a.ccaron=269,a.ccedilla=231,a.ccedillaacute=7689,a.ccircle=9426,a.ccircumflex=265,a.ccurl=597,a.cdot=267,a.cdotaccent=267,a.cdsquare=13253,a.cedilla=184,a.cedillacmb=807,a.cent=162,a.centigrade=8451,a.centinferior=63199,a.centmonospace=65504,a.centoldstyle=63394,a.centsuperior=63200,a.chaarmenian=1401,a.chabengali=2459,a.chadeva=2331,a.chagujarati=2715,a.chagurmukhi=2587,a.chbopomofo=12564,a.cheabkhasiancyrillic=1213,a.checkmark=10003,a.checyrillic=1095,a.chedescenderabkhasiancyrillic=1215,a.chedescendercyrillic=1207,a.chedieresiscyrillic=1269,a.cheharmenian=1395,a.chekhakassiancyrillic=1228,a.cheverticalstrokecyrillic=1209,a.chi=967,a.chieuchacirclekorean=12919,a.chieuchaparenkorean=12823,a.chieuchcirclekorean=12905,a.chieuchkorean=12618,a.chieuchparenkorean=12809,a.chochangthai=3594,a.chochanthai=3592,a.chochingthai=3593,a.chochoethai=3596,a.chook=392,a.cieucacirclekorean=12918,a.cieucaparenkorean=12822,a.cieuccirclekorean=12904,a.cieuckorean=12616,a.cieucparenkorean=12808,a.cieucuparenkorean=12828,a.circle=9675,a.circlecopyrt=169,// Glyph is missing from Adobe's original list.
a.circlemultiply=8855,a.circleot=8857,a.circleplus=8853,a.circlepostalmark=12342,a.circlewithlefthalfblack=9680,a.circlewithrighthalfblack=9681,a.circumflex=710,a.circumflexbelowcmb=813,a.circumflexcmb=770,a.clear=8999,a.clickalveolar=450,a.clickdental=448,a.clicklateral=449,a.clickretroflex=451,a.club=9827,a.clubsuitblack=9827,a.clubsuitwhite=9831,a.cmcubedsquare=13220,a.cmonospace=65347,a.cmsquaredsquare=13216,a.coarmenian=1409,a.colon=58,a.colonmonetary=8353,a.colonmonospace=65306,a.colonsign=8353,a.colonsmall=65109,a.colontriangularhalfmod=721,a.colontriangularmod=720,a.comma=44,a.commaabovecmb=787,a.commaaboverightcmb=789,a.commaaccent=63171,a.commaarabic=1548,a.commaarmenian=1373,a.commainferior=63201,a.commamonospace=65292,a.commareversedabovecmb=788,a.commareversedmod=701,a.commasmall=65104,a.commasuperior=63202,a.commaturnedabovecmb=786,a.commaturnedmod=699,a.compass=9788,a.congruent=8773,a.contourintegral=8750,a.control=8963,a.controlACK=6,a.controlBEL=7,a.controlBS=8,a.controlCAN=24,a.controlCR=13,a.controlDC1=17,a.controlDC2=18,a.controlDC3=19,a.controlDC4=20,a.controlDEL=127,a.controlDLE=16,a.controlEM=25,a.controlENQ=5,a.controlEOT=4,a.controlESC=27,a.controlETB=23,a.controlETX=3,a.controlFF=12,a.controlFS=28,a.controlGS=29,a.controlHT=9,a.controlLF=10,a.controlNAK=21,a.controlRS=30,a.controlSI=15,a.controlSO=14,a.controlSOT=2,a.controlSTX=1,a.controlSUB=26,a.controlSYN=22,a.controlUS=31,a.controlVT=11,a.copyright=169,a.copyrightsans=63721,a.copyrightserif=63193,a.cornerbracketleft=12300,a.cornerbracketlefthalfwidth=65378,a.cornerbracketleftvertical=65089,a.cornerbracketright=12301,a.cornerbracketrighthalfwidth=65379,a.cornerbracketrightvertical=65090,a.corporationsquare=13183,a.cosquare=13255,a.coverkgsquare=13254,a.cparen=9374,a.cruzeiro=8354,a.cstretched=663,a.curlyand=8911,a.curlyor=8910,a.currency=164,a.cyrBreve=63185,a.cyrFlex=63186,a.cyrbreve=63188,a.cyrflex=63189,a.d=100,a.daarmenian=1380,a.dabengali=2470,a.dadarabic=1590,a.dadeva=2342,a.dadfinalarabic=65214,a.dadinitialarabic=65215,a.dadmedialarabic=65216,a.dagesh=1468,a.dageshhebrew=1468,a.dagger=8224,a.daggerdbl=8225,a.dagujarati=2726,a.dagurmukhi=2598,a.dahiragana=12384,a.dakatakana=12480,a.dalarabic=1583,a.dalet=1491,a.daletdagesh=64307,a.daletdageshhebrew=64307,a.dalethebrew=1491,a.dalfinalarabic=65194,a.dammaarabic=1615,a.dammalowarabic=1615,a.dammatanaltonearabic=1612,a.dammatanarabic=1612,a.danda=2404,a.dargahebrew=1447,a.dargalefthebrew=1447,a.dasiapneumatacyrilliccmb=1157,a.dblGrave=63187,a.dblanglebracketleft=12298,a.dblanglebracketleftvertical=65085,a.dblanglebracketright=12299,a.dblanglebracketrightvertical=65086,a.dblarchinvertedbelowcmb=811,a.dblarrowleft=8660,a.dblarrowright=8658,a.dbldanda=2405,a.dblgrave=63190,a.dblgravecmb=783,a.dblintegral=8748,a.dbllowline=8215,a.dbllowlinecmb=819,a.dbloverlinecmb=831,a.dblprimemod=698,a.dblverticalbar=8214,a.dblverticallineabovecmb=782,a.dbopomofo=12553,a.dbsquare=13256,a.dcaron=271,a.dcedilla=7697,a.dcircle=9427,a.dcircumflexbelow=7699,a.dcroat=273,a.ddabengali=2465,a.ddadeva=2337,a.ddagujarati=2721,a.ddagurmukhi=2593,a.ddalarabic=1672,a.ddalfinalarabic=64393,a.dddhadeva=2396,a.ddhabengali=2466,a.ddhadeva=2338,a.ddhagujarati=2722,a.ddhagurmukhi=2594,a.ddotaccent=7691,a.ddotbelow=7693,a.decimalseparatorarabic=1643,a.decimalseparatorpersian=1643,a.decyrillic=1076,a.degree=176,a.dehihebrew=1453,a.dehiragana=12391,a.deicoptic=1007,a.dekatakana=12487,a.deleteleft=9003,a.deleteright=8998,a.delta=948,a.deltaturned=397,a.denominatorminusonenumeratorbengali=2552,a.dezh=676,a.dhabengali=2471,a.dhadeva=2343,a.dhagujarati=2727,a.dhagurmukhi=2599,a.dhook=599,a.dialytikatonos=901,a.dialytikatonoscmb=836,a.diamond=9830,a.diamondsuitwhite=9826,a.dieresis=168,a.dieresisacute=63191,a.dieresisbelowcmb=804,a.dieresiscmb=776,a.dieresisgrave=63192,a.dieresistonos=901,a.dihiragana=12386,a.dikatakana=12482,a.dittomark=12291,a.divide=247,a.divides=8739,a.divisionslash=8725,a.djecyrillic=1106,a.dkshade=9619,a.dlinebelow=7695,a.dlsquare=13207,a.dmacron=273,a.dmonospace=65348,a.dnblock=9604,a.dochadathai=3598,a.dodekthai=3604,a.dohiragana=12393,a.dokatakana=12489,a.dollar=36,a.dollarinferior=63203,a.dollarmonospace=65284,a.dollaroldstyle=63268,a.dollarsmall=65129,a.dollarsuperior=63204,a.dong=8363,a.dorusquare=13094,a.dotaccent=729,a.dotaccentcmb=775,a.dotbelowcmb=803,a.dotbelowcomb=803,a.dotkatakana=12539,a.dotlessi=305,a.dotlessj=63166,a.dotlessjstrokehook=644,a.dotmath=8901,a.dottedcircle=9676,a.doubleyodpatah=64287,a.doubleyodpatahhebrew=64287,a.downtackbelowcmb=798,a.downtackmod=725,a.dparen=9375,a.dsuperior=63211,a.dtail=598,a.dtopbar=396,a.duhiragana=12389,a.dukatakana=12485,a.dz=499,a.dzaltone=675,a.dzcaron=454,a.dzcurl=677,a.dzeabkhasiancyrillic=1249,a.dzecyrillic=1109,a.dzhecyrillic=1119,a.e=101,a.eacute=233,a.earth=9793,a.ebengali=2447,a.ebopomofo=12572,a.ebreve=277,a.ecandradeva=2317,a.ecandragujarati=2701,a.ecandravowelsigndeva=2373,a.ecandravowelsigngujarati=2757,a.ecaron=283,a.ecedillabreve=7709,a.echarmenian=1381,a.echyiwnarmenian=1415,a.ecircle=9428,a.ecircumflex=234,a.ecircumflexacute=7871,a.ecircumflexbelow=7705,a.ecircumflexdotbelow=7879,a.ecircumflexgrave=7873,a.ecircumflexhookabove=7875,a.ecircumflextilde=7877,a.ecyrillic=1108,a.edblgrave=517,a.edeva=2319,a.edieresis=235,a.edot=279,a.edotaccent=279,a.edotbelow=7865,a.eegurmukhi=2575,a.eematragurmukhi=2631,a.efcyrillic=1092,a.egrave=232,a.egujarati=2703,a.eharmenian=1383,a.ehbopomofo=12573,a.ehiragana=12360,a.ehookabove=7867,a.eibopomofo=12575,a.eight=56,a.eightarabic=1640,a.eightbengali=2542,a.eightcircle=9319,a.eightcircleinversesansserif=10129,a.eightdeva=2414,a.eighteencircle=9329,a.eighteenparen=9349,a.eighteenperiod=9369,a.eightgujarati=2798,a.eightgurmukhi=2670,a.eighthackarabic=1640,a.eighthangzhou=12328,a.eighthnotebeamed=9835,a.eightideographicparen=12839,a.eightinferior=8328,a.eightmonospace=65304,a.eightoldstyle=63288,a.eightparen=9339,a.eightperiod=9359,a.eightpersian=1784,a.eightroman=8567,a.eightsuperior=8312,a.eightthai=3672,a.einvertedbreve=519,a.eiotifiedcyrillic=1125,a.ekatakana=12456,a.ekatakanahalfwidth=65396,a.ekonkargurmukhi=2676,a.ekorean=12628,a.elcyrillic=1083,a.element=8712,a.elevencircle=9322,a.elevenparen=9342,a.elevenperiod=9362,a.elevenroman=8570,a.ellipsis=8230,a.ellipsisvertical=8942,a.emacron=275,a.emacronacute=7703,a.emacrongrave=7701,a.emcyrillic=1084,a.emdash=8212,a.emdashvertical=65073,a.emonospace=65349,a.emphasismarkarmenian=1371,a.emptyset=8709,a.enbopomofo=12579,a.encyrillic=1085,a.endash=8211,a.endashvertical=65074,a.endescendercyrillic=1187,a.eng=331,a.engbopomofo=12581,a.enghecyrillic=1189,a.enhookcyrillic=1224,a.enspace=8194,a.eogonek=281,a.eokorean=12627,a.eopen=603,a.eopenclosed=666,a.eopenreversed=604,a.eopenreversedclosed=606,a.eopenreversedhook=605,a.eparen=9376,a.epsilon=949,a.epsilontonos=941,a.equal=61,a.equalmonospace=65309,a.equalsmall=65126,a.equalsuperior=8316,a.equivalence=8801,a.erbopomofo=12582,a.ercyrillic=1088,a.ereversed=600,a.ereversedcyrillic=1101,a.escyrillic=1089,a.esdescendercyrillic=1195,a.esh=643,a.eshcurl=646,a.eshortdeva=2318,a.eshortvowelsigndeva=2374,a.eshreversedloop=426,a.eshsquatreversed=645,a.esmallhiragana=12359,a.esmallkatakana=12455,a.esmallkatakanahalfwidth=65386,a.estimated=8494,a.esuperior=63212,a.eta=951,a.etarmenian=1384,a.etatonos=942,a.eth=240,a.etilde=7869,a.etildebelow=7707,a.etnahtafoukhhebrew=1425,a.etnahtafoukhlefthebrew=1425,a.etnahtahebrew=1425,a.etnahtalefthebrew=1425,a.eturned=477,a.eukorean=12641,a.euro=8364,a.evowelsignbengali=2503,a.evowelsigndeva=2375,a.evowelsigngujarati=2759,a.exclam=33,a.exclamarmenian=1372,a.exclamdbl=8252,a.exclamdown=161,a.exclamdownsmall=63393,a.exclammonospace=65281,a.exclamsmall=63265,a.existential=8707,a.ezh=658,a.ezhcaron=495,a.ezhcurl=659,a.ezhreversed=441,a.ezhtail=442,a.f=102,a.fadeva=2398,a.fagurmukhi=2654,a.fahrenheit=8457,a.fathaarabic=1614,a.fathalowarabic=1614,a.fathatanarabic=1611,a.fbopomofo=12552,a.fcircle=9429,a.fdotaccent=7711,a.feharabic=1601,a.feharmenian=1414,a.fehfinalarabic=65234,a.fehinitialarabic=65235,a.fehmedialarabic=65236,a.feicoptic=997,a.female=9792,a.ff=64256,a.ffi=64259,a.ffl=64260,a.fi=64257,a.fifteencircle=9326,a.fifteenparen=9346,a.fifteenperiod=9366,a.figuredash=8210,a.filledbox=9632,a.filledrect=9644,a.finalkaf=1498,a.finalkafdagesh=64314,a.finalkafdageshhebrew=64314,a.finalkafhebrew=1498,a.finalmem=1501,a.finalmemhebrew=1501,a.finalnun=1503,a.finalnunhebrew=1503,a.finalpe=1507,a.finalpehebrew=1507,a.finaltsadi=1509,a.finaltsadihebrew=1509,a.firsttonechinese=713,a.fisheye=9673,a.fitacyrillic=1139,a.five=53,a.fivearabic=1637,a.fivebengali=2539,a.fivecircle=9316,a.fivecircleinversesansserif=10126,a.fivedeva=2411,a.fiveeighths=8541,a.fivegujarati=2795,a.fivegurmukhi=2667,a.fivehackarabic=1637,a.fivehangzhou=12325,a.fiveideographicparen=12836,a.fiveinferior=8325,a.fivemonospace=65301,a.fiveoldstyle=63285,a.fiveparen=9336,a.fiveperiod=9356,a.fivepersian=1781,a.fiveroman=8564,a.fivesuperior=8309,a.fivethai=3669,a.fl=64258,a.florin=402,a.fmonospace=65350,a.fmsquare=13209,a.fofanthai=3615,a.fofathai=3613,a.fongmanthai=3663,a.forall=8704,a.four=52,a.fourarabic=1636,a.fourbengali=2538,a.fourcircle=9315,a.fourcircleinversesansserif=10125,a.fourdeva=2410,a.fourgujarati=2794,a.fourgurmukhi=2666,a.fourhackarabic=1636,a.fourhangzhou=12324,a.fourideographicparen=12835,a.fourinferior=8324,a.fourmonospace=65300,a.fournumeratorbengali=2551,a.fouroldstyle=63284,a.fourparen=9335,a.fourperiod=9355,a.fourpersian=1780,a.fourroman=8563,a.foursuperior=8308,a.fourteencircle=9325,a.fourteenparen=9345,a.fourteenperiod=9365,a.fourthai=3668,a.fourthtonechinese=715,a.fparen=9377,a.fraction=8260,a.franc=8355,a.g=103,a.gabengali=2455,a.gacute=501,a.gadeva=2327,a.gafarabic=1711,a.gaffinalarabic=64403,a.gafinitialarabic=64404,a.gafmedialarabic=64405,a.gagujarati=2711,a.gagurmukhi=2583,a.gahiragana=12364,a.gakatakana=12460,a.gamma=947,a.gammalatinsmall=611,a.gammasuperior=736,a.gangiacoptic=1003,a.gbopomofo=12557,a.gbreve=287,a.gcaron=487,a.gcedilla=291,a.gcircle=9430,a.gcircumflex=285,a.gcommaaccent=291,a.gdot=289,a.gdotaccent=289,a.gecyrillic=1075,a.gehiragana=12370,a.gekatakana=12466,a.geometricallyequal=8785,a.gereshaccenthebrew=1436,a.gereshhebrew=1523,a.gereshmuqdamhebrew=1437,a.germandbls=223,a.gershayimaccenthebrew=1438,a.gershayimhebrew=1524,a.getamark=12307,a.ghabengali=2456,a.ghadarmenian=1394,a.ghadeva=2328,a.ghagujarati=2712,a.ghagurmukhi=2584,a.ghainarabic=1594,a.ghainfinalarabic=65230,a.ghaininitialarabic=65231,a.ghainmedialarabic=65232,a.ghemiddlehookcyrillic=1173,a.ghestrokecyrillic=1171,a.gheupturncyrillic=1169,a.ghhadeva=2394,a.ghhagurmukhi=2650,a.ghook=608,a.ghzsquare=13203,a.gihiragana=12366,a.gikatakana=12462,a.gimarmenian=1379,a.gimel=1490,a.gimeldagesh=64306,a.gimeldageshhebrew=64306,a.gimelhebrew=1490,a.gjecyrillic=1107,a.glottalinvertedstroke=446,a.glottalstop=660,a.glottalstopinverted=662,a.glottalstopmod=704,a.glottalstopreversed=661,a.glottalstopreversedmod=705,a.glottalstopreversedsuperior=740,a.glottalstopstroke=673,a.glottalstopstrokereversed=674,a.gmacron=7713,a.gmonospace=65351,a.gohiragana=12372,a.gokatakana=12468,a.gparen=9378,a.gpasquare=13228,a.gradient=8711,a.grave=96,a.gravebelowcmb=790,a.gravecmb=768,a.gravecomb=768,a.gravedeva=2387,a.gravelowmod=718,a.gravemonospace=65344,a.gravetonecmb=832,a.greater=62,a.greaterequal=8805,a.greaterequalorless=8923,a.greatermonospace=65310,a.greaterorequivalent=8819,a.greaterorless=8823,a.greateroverequal=8807,a.greatersmall=65125,a.gscript=609,a.gstroke=485,a.guhiragana=12368,a.guillemotleft=171,a.guillemotright=187,a.guilsinglleft=8249,a.guilsinglright=8250,a.gukatakana=12464,a.guramusquare=13080,a.gysquare=13257,a.h=104,a.haabkhasiancyrillic=1193,a.haaltonearabic=1729,a.habengali=2489,a.hadescendercyrillic=1203,a.hadeva=2361,a.hagujarati=2745,a.hagurmukhi=2617,a.haharabic=1581,a.hahfinalarabic=65186,a.hahinitialarabic=65187,a.hahiragana=12399,a.hahmedialarabic=65188,a.haitusquare=13098,a.hakatakana=12495,a.hakatakanahalfwidth=65418,a.halantgurmukhi=2637,a.hamzaarabic=1569,a.hamzalowarabic=1569,a.hangulfiller=12644,a.hardsigncyrillic=1098,a.harpoonleftbarbup=8636,a.harpoonrightbarbup=8640,a.hasquare=13258,a.hatafpatah=1458,a.hatafpatah16=1458,a.hatafpatah23=1458,a.hatafpatah2f=1458,a.hatafpatahhebrew=1458,a.hatafpatahnarrowhebrew=1458,a.hatafpatahquarterhebrew=1458,a.hatafpatahwidehebrew=1458,a.hatafqamats=1459,a.hatafqamats1b=1459,a.hatafqamats28=1459,a.hatafqamats34=1459,a.hatafqamatshebrew=1459,a.hatafqamatsnarrowhebrew=1459,a.hatafqamatsquarterhebrew=1459,a.hatafqamatswidehebrew=1459,a.hatafsegol=1457,a.hatafsegol17=1457,a.hatafsegol24=1457,a.hatafsegol30=1457,a.hatafsegolhebrew=1457,a.hatafsegolnarrowhebrew=1457,a.hatafsegolquarterhebrew=1457,a.hatafsegolwidehebrew=1457,a.hbar=295,a.hbopomofo=12559,a.hbrevebelow=7723,a.hcedilla=7721,a.hcircle=9431,a.hcircumflex=293,a.hdieresis=7719,a.hdotaccent=7715,a.hdotbelow=7717,a.he=1492,a.heart=9829,a.heartsuitblack=9829,a.heartsuitwhite=9825,a.hedagesh=64308,a.hedageshhebrew=64308,a.hehaltonearabic=1729,a.heharabic=1607,a.hehebrew=1492,a.hehfinalaltonearabic=64423,a.hehfinalalttwoarabic=65258,a.hehfinalarabic=65258,a.hehhamzaabovefinalarabic=64421,a.hehhamzaaboveisolatedarabic=64420,a.hehinitialaltonearabic=64424,a.hehinitialarabic=65259,a.hehiragana=12408,a.hehmedialaltonearabic=64425,a.hehmedialarabic=65260,a.heiseierasquare=13179,a.hekatakana=12504,a.hekatakanahalfwidth=65421,a.hekutaarusquare=13110,a.henghook=615,a.herutusquare=13113,a.het=1495,a.hethebrew=1495,a.hhook=614,a.hhooksuperior=689,a.hieuhacirclekorean=12923,a.hieuhaparenkorean=12827,a.hieuhcirclekorean=12909,a.hieuhkorean=12622,a.hieuhparenkorean=12813,a.hihiragana=12402,a.hikatakana=12498,a.hikatakanahalfwidth=65419,a.hiriq=1460,a.hiriq14=1460,a.hiriq21=1460,a.hiriq2d=1460,a.hiriqhebrew=1460,a.hiriqnarrowhebrew=1460,a.hiriqquarterhebrew=1460,a.hiriqwidehebrew=1460,a.hlinebelow=7830,a.hmonospace=65352,a.hoarmenian=1392,a.hohipthai=3627,a.hohiragana=12411,a.hokatakana=12507,a.hokatakanahalfwidth=65422,a.holam=1465,a.holam19=1465,a.holam26=1465,a.holam32=1465,a.holamhebrew=1465,a.holamnarrowhebrew=1465,a.holamquarterhebrew=1465,a.holamwidehebrew=1465,a.honokhukthai=3630,a.hookabovecomb=777,a.hookcmb=777,a.hookpalatalizedbelowcmb=801,a.hookretroflexbelowcmb=802,a.hoonsquare=13122,a.horicoptic=1001,a.horizontalbar=8213,a.horncmb=795,a.hotsprings=9832,a.house=8962,a.hparen=9379,a.hsuperior=688,a.hturned=613,a.huhiragana=12405,a.huiitosquare=13107,a.hukatakana=12501,a.hukatakanahalfwidth=65420,a.hungarumlaut=733,a.hungarumlautcmb=779,a.hv=405,a.hyphen=45,a.hypheninferior=63205,a.hyphenmonospace=65293,a.hyphensmall=65123,a.hyphensuperior=63206,a.hyphentwo=8208,a.i=105,a.iacute=237,a.iacyrillic=1103,a.ibengali=2439,a.ibopomofo=12583,a.ibreve=301,a.icaron=464,a.icircle=9432,a.icircumflex=238,a.icyrillic=1110,a.idblgrave=521,a.ideographearthcircle=12943,a.ideographfirecircle=12939,a.ideographicallianceparen=12863,a.ideographiccallparen=12858,a.ideographiccentrecircle=12965,a.ideographicclose=12294,a.ideographiccomma=12289,a.ideographiccommaleft=65380,a.ideographiccongratulationparen=12855,a.ideographiccorrectcircle=12963,a.ideographicearthparen=12847,a.ideographicenterpriseparen=12861,a.ideographicexcellentcircle=12957,a.ideographicfestivalparen=12864,a.ideographicfinancialcircle=12950,a.ideographicfinancialparen=12854,a.ideographicfireparen=12843,a.ideographichaveparen=12850,a.ideographichighcircle=12964,a.ideographiciterationmark=12293,a.ideographiclaborcircle=12952,a.ideographiclaborparen=12856,a.ideographicleftcircle=12967,a.ideographiclowcircle=12966,a.ideographicmedicinecircle=12969,a.ideographicmetalparen=12846,a.ideographicmoonparen=12842,a.ideographicnameparen=12852,a.ideographicperiod=12290,a.ideographicprintcircle=12958,a.ideographicreachparen=12867,a.ideographicrepresentparen=12857,a.ideographicresourceparen=12862,a.ideographicrightcircle=12968,a.ideographicsecretcircle=12953,a.ideographicselfparen=12866,a.ideographicsocietyparen=12851,a.ideographicspace=12288,a.ideographicspecialparen=12853,a.ideographicstockparen=12849,a.ideographicstudyparen=12859,a.ideographicsunparen=12848,a.ideographicsuperviseparen=12860,a.ideographicwaterparen=12844,a.ideographicwoodparen=12845,a.ideographiczero=12295,a.ideographmetalcircle=12942,a.ideographmooncircle=12938,a.ideographnamecircle=12948,a.ideographsuncircle=12944,a.ideographwatercircle=12940,a.ideographwoodcircle=12941,a.ideva=2311,a.idieresis=239,a.idieresisacute=7727,a.idieresiscyrillic=1253,a.idotbelow=7883,a.iebrevecyrillic=1239,a.iecyrillic=1077,a.ieungacirclekorean=12917,a.ieungaparenkorean=12821,a.ieungcirclekorean=12903,a.ieungkorean=12615,a.ieungparenkorean=12807,a.igrave=236,a.igujarati=2695,a.igurmukhi=2567,a.ihiragana=12356,a.ihookabove=7881,a.iibengali=2440,a.iicyrillic=1080,a.iideva=2312,a.iigujarati=2696,a.iigurmukhi=2568,a.iimatragurmukhi=2624,a.iinvertedbreve=523,a.iishortcyrillic=1081,a.iivowelsignbengali=2496,a.iivowelsigndeva=2368,a.iivowelsigngujarati=2752,a.ij=307,a.ikatakana=12452,a.ikatakanahalfwidth=65394,a.ikorean=12643,a.ilde=732,a.iluyhebrew=1452,a.imacron=299,a.imacroncyrillic=1251,a.imageorapproximatelyequal=8787,a.imatragurmukhi=2623,a.imonospace=65353,a.increment=8710,a.infinity=8734,a.iniarmenian=1387,a.integral=8747,a.integralbottom=8993,a.integralbt=8993,a.integralex=63733,a.integraltop=8992,a.integraltp=8992,a.intersection=8745,a.intisquare=13061,a.invbullet=9688,a.invcircle=9689,a.invsmileface=9787,a.iocyrillic=1105,a.iogonek=303,a.iota=953,a.iotadieresis=970,a.iotadieresistonos=912,a.iotalatin=617,a.iotatonos=943,a.iparen=9380,a.irigurmukhi=2674,a.ismallhiragana=12355,a.ismallkatakana=12451,a.ismallkatakanahalfwidth=65384,a.issharbengali=2554,a.istroke=616,a.isuperior=63213,a.iterationhiragana=12445,a.iterationkatakana=12541,a.itilde=297,a.itildebelow=7725,a.iubopomofo=12585,a.iucyrillic=1102,a.ivowelsignbengali=2495,a.ivowelsigndeva=2367,a.ivowelsigngujarati=2751,a.izhitsacyrillic=1141,a.izhitsadblgravecyrillic=1143,a.j=106,a.jaarmenian=1393,a.jabengali=2460,a.jadeva=2332,a.jagujarati=2716,a.jagurmukhi=2588,a.jbopomofo=12560,a.jcaron=496,a.jcircle=9433,a.jcircumflex=309,a.jcrossedtail=669,a.jdotlessstroke=607,a.jecyrillic=1112,a.jeemarabic=1580,a.jeemfinalarabic=65182,a.jeeminitialarabic=65183,a.jeemmedialarabic=65184,a.jeharabic=1688,a.jehfinalarabic=64395,a.jhabengali=2461,a.jhadeva=2333,a.jhagujarati=2717,a.jhagurmukhi=2589,a.jheharmenian=1403,a.jis=12292,a.jmonospace=65354,a.jparen=9381,a.jsuperior=690,a.k=107,a.kabashkircyrillic=1185,a.kabengali=2453,a.kacute=7729,a.kacyrillic=1082,a.kadescendercyrillic=1179,a.kadeva=2325,a.kaf=1499,a.kafarabic=1603,a.kafdagesh=64315,a.kafdageshhebrew=64315,a.kaffinalarabic=65242,a.kafhebrew=1499,a.kafinitialarabic=65243,a.kafmedialarabic=65244,a.kafrafehebrew=64333,a.kagujarati=2709,a.kagurmukhi=2581,a.kahiragana=12363,a.kahookcyrillic=1220,a.kakatakana=12459,a.kakatakanahalfwidth=65398,a.kappa=954,a.kappasymbolgreek=1008,a.kapyeounmieumkorean=12657,a.kapyeounphieuphkorean=12676,a.kapyeounpieupkorean=12664,a.kapyeounssangpieupkorean=12665,a.karoriisquare=13069,a.kashidaautoarabic=1600,a.kashidaautonosidebearingarabic=1600,a.kasmallkatakana=12533,a.kasquare=13188,a.kasraarabic=1616,a.kasratanarabic=1613,a.kastrokecyrillic=1183,a.katahiraprolongmarkhalfwidth=65392,a.kaverticalstrokecyrillic=1181,a.kbopomofo=12558,a.kcalsquare=13193,a.kcaron=489,a.kcedilla=311,a.kcircle=9434,a.kcommaaccent=311,a.kdotbelow=7731,a.keharmenian=1412,a.kehiragana=12369,a.kekatakana=12465,a.kekatakanahalfwidth=65401,a.kenarmenian=1391,a.kesmallkatakana=12534,a.kgreenlandic=312,a.khabengali=2454,a.khacyrillic=1093,a.khadeva=2326,a.khagujarati=2710,a.khagurmukhi=2582,a.khaharabic=1582,a.khahfinalarabic=65190,a.khahinitialarabic=65191,a.khahmedialarabic=65192,a.kheicoptic=999,a.khhadeva=2393,a.khhagurmukhi=2649,a.khieukhacirclekorean=12920,a.khieukhaparenkorean=12824,a.khieukhcirclekorean=12906,a.khieukhkorean=12619,a.khieukhparenkorean=12810,a.khokhaithai=3586,a.khokhonthai=3589,a.khokhuatthai=3587,a.khokhwaithai=3588,a.khomutthai=3675,a.khook=409,a.khorakhangthai=3590,a.khzsquare=13201,a.kihiragana=12365,a.kikatakana=12461,a.kikatakanahalfwidth=65399,a.kiroguramusquare=13077,a.kiromeetorusquare=13078,a.kirosquare=13076,a.kiyeokacirclekorean=12910,a.kiyeokaparenkorean=12814,a.kiyeokcirclekorean=12896,a.kiyeokkorean=12593,a.kiyeokparenkorean=12800,a.kiyeoksioskorean=12595,a.kjecyrillic=1116,a.klinebelow=7733,a.klsquare=13208,a.kmcubedsquare=13222,a.kmonospace=65355,a.kmsquaredsquare=13218,a.kohiragana=12371,a.kohmsquare=13248,a.kokaithai=3585,a.kokatakana=12467,a.kokatakanahalfwidth=65402,a.kooposquare=13086,a.koppacyrillic=1153,a.koreanstandardsymbol=12927,a.koroniscmb=835,a.kparen=9382,a.kpasquare=13226,a.ksicyrillic=1135,a.ktsquare=13263,a.kturned=670,a.kuhiragana=12367,a.kukatakana=12463,a.kukatakanahalfwidth=65400,a.kvsquare=13240,a.kwsquare=13246,a.l=108,a.labengali=2482,a.lacute=314,a.ladeva=2354,a.lagujarati=2738,a.lagurmukhi=2610,a.lakkhangyaothai=3653,a.lamaleffinalarabic=65276,a.lamalefhamzaabovefinalarabic=65272,a.lamalefhamzaaboveisolatedarabic=65271,a.lamalefhamzabelowfinalarabic=65274,a.lamalefhamzabelowisolatedarabic=65273,a.lamalefisolatedarabic=65275,a.lamalefmaddaabovefinalarabic=65270,a.lamalefmaddaaboveisolatedarabic=65269,a.lamarabic=1604,a.lambda=955,a.lambdastroke=411,a.lamed=1500,a.lameddagesh=64316,a.lameddageshhebrew=64316,a.lamedhebrew=1500,a.lamfinalarabic=65246,a.lamhahinitialarabic=64714,a.laminitialarabic=65247,a.lamjeeminitialarabic=64713,a.lamkhahinitialarabic=64715,a.lamlamhehisolatedarabic=65010,a.lammedialarabic=65248,a.lammeemhahinitialarabic=64904,a.lammeeminitialarabic=64716,a.largecircle=9711,a.lbar=410,a.lbelt=620,a.lbopomofo=12556,a.lcaron=318,a.lcedilla=316,a.lcircle=9435,a.lcircumflexbelow=7741,a.lcommaaccent=316,a.ldot=320,a.ldotaccent=320,a.ldotbelow=7735,a.ldotbelowmacron=7737,a.leftangleabovecmb=794,a.lefttackbelowcmb=792,a.less=60,a.lessequal=8804,a.lessequalorgreater=8922,a.lessmonospace=65308,a.lessorequivalent=8818,a.lessorgreater=8822,a.lessoverequal=8806,a.lesssmall=65124,a.lezh=622,a.lfblock=9612,a.lhookretroflex=621,a.lira=8356,a.liwnarmenian=1388,a.lj=457,a.ljecyrillic=1113,a.ll=63168,a.lladeva=2355,a.llagujarati=2739,a.llinebelow=7739,a.llladeva=2356,a.llvocalicbengali=2529,a.llvocalicdeva=2401,a.llvocalicvowelsignbengali=2531,a.llvocalicvowelsigndeva=2403,a.lmiddletilde=619,a.lmonospace=65356,a.lmsquare=13264,a.lochulathai=3628,a.logicaland=8743,a.logicalnot=172,a.logicalnotreversed=8976,a.logicalor=8744,a.lolingthai=3621,a.longs=383,a.lowlinecenterline=65102,a.lowlinecmb=818,a.lowlinedashed=65101,a.lozenge=9674,a.lparen=9383,a.lslash=322,a.lsquare=8467,a.lsuperior=63214,a.ltshade=9617,a.luthai=3622,a.lvocalicbengali=2444,a.lvocalicdeva=2316,a.lvocalicvowelsignbengali=2530,a.lvocalicvowelsigndeva=2402,a.lxsquare=13267,a.m=109,a.mabengali=2478,a.macron=175,a.macronbelowcmb=817,a.macroncmb=772,a.macronlowmod=717,a.macronmonospace=65507,a.macute=7743,a.madeva=2350,a.magujarati=2734,a.magurmukhi=2606,a.mahapakhhebrew=1444,a.mahapakhlefthebrew=1444,a.mahiragana=12414,a.maichattawalowleftthai=63637,a.maichattawalowrightthai=63636,a.maichattawathai=3659,a.maichattawaupperleftthai=63635,a.maieklowleftthai=63628,a.maieklowrightthai=63627,a.maiekthai=3656,a.maiekupperleftthai=63626,a.maihanakatleftthai=63620,a.maihanakatthai=3633,a.maitaikhuleftthai=63625,a.maitaikhuthai=3655,a.maitholowleftthai=63631,a.maitholowrightthai=63630,a.maithothai=3657,a.maithoupperleftthai=63629,a.maitrilowleftthai=63634,a.maitrilowrightthai=63633,a.maitrithai=3658,a.maitriupperleftthai=63632,a.maiyamokthai=3654,a.makatakana=12510,a.makatakanahalfwidth=65423,a.male=9794,a.mansyonsquare=13127,a.maqafhebrew=1470,a.mars=9794,a.masoracirclehebrew=1455,a.masquare=13187,a.mbopomofo=12551,a.mbsquare=13268,a.mcircle=9436,a.mcubedsquare=13221,a.mdotaccent=7745,a.mdotbelow=7747,a.meemarabic=1605,a.meemfinalarabic=65250,a.meeminitialarabic=65251,a.meemmedialarabic=65252,a.meemmeeminitialarabic=64721,a.meemmeemisolatedarabic=64584,a.meetorusquare=13133,a.mehiragana=12417,a.meizierasquare=13182,a.mekatakana=12513,a.mekatakanahalfwidth=65426,a.mem=1502,a.memdagesh=64318,a.memdageshhebrew=64318,a.memhebrew=1502,a.menarmenian=1396,a.merkhahebrew=1445,a.merkhakefulahebrew=1446,a.merkhakefulalefthebrew=1446,a.merkhalefthebrew=1445,a.mhook=625,a.mhzsquare=13202,a.middledotkatakanahalfwidth=65381,a.middot=183,a.mieumacirclekorean=12914,a.mieumaparenkorean=12818,a.mieumcirclekorean=12900,a.mieumkorean=12609,a.mieumpansioskorean=12656,a.mieumparenkorean=12804,a.mieumpieupkorean=12654,a.mieumsioskorean=12655,a.mihiragana=12415,a.mikatakana=12511,a.mikatakanahalfwidth=65424,a.minus=8722,a.minusbelowcmb=800,a.minuscircle=8854,a.minusmod=727,a.minusplus=8723,a.minute=8242,a.miribaarusquare=13130,a.mirisquare=13129,a.mlonglegturned=624,a.mlsquare=13206,a.mmcubedsquare=13219,a.mmonospace=65357,a.mmsquaredsquare=13215,a.mohiragana=12418,a.mohmsquare=13249,a.mokatakana=12514,a.mokatakanahalfwidth=65427,a.molsquare=13270,a.momathai=3617,a.moverssquare=13223,a.moverssquaredsquare=13224,a.mparen=9384,a.mpasquare=13227,a.mssquare=13235,a.msuperior=63215,a.mturned=623,a.mu=181,a.mu1=181,a.muasquare=13186,a.muchgreater=8811,a.muchless=8810,a.mufsquare=13196,a.mugreek=956,a.mugsquare=13197,a.muhiragana=12416,a.mukatakana=12512,a.mukatakanahalfwidth=65425,a.mulsquare=13205,a.multiply=215,a.mumsquare=13211,a.munahhebrew=1443,a.munahlefthebrew=1443,a.musicalnote=9834,a.musicalnotedbl=9835,a.musicflatsign=9837,a.musicsharpsign=9839,a.mussquare=13234,a.muvsquare=13238,a.muwsquare=13244,a.mvmegasquare=13241,a.mvsquare=13239,a.mwmegasquare=13247,a.mwsquare=13245,a.n=110,a.nabengali=2472,a.nabla=8711,a.nacute=324,a.nadeva=2344,a.nagujarati=2728,a.nagurmukhi=2600,a.nahiragana=12394,a.nakatakana=12490,a.nakatakanahalfwidth=65413,a.napostrophe=329,a.nasquare=13185,a.nbopomofo=12555,a.nbspace=160,a.ncaron=328,a.ncedilla=326,a.ncircle=9437,a.ncircumflexbelow=7755,a.ncommaaccent=326,a.ndotaccent=7749,a.ndotbelow=7751,a.nehiragana=12397,a.nekatakana=12493,a.nekatakanahalfwidth=65416,a.newsheqelsign=8362,a.nfsquare=13195,a.ngabengali=2457,a.ngadeva=2329,a.ngagujarati=2713,a.ngagurmukhi=2585,a.ngonguthai=3591,a.nhiragana=12435,a.nhookleft=626,a.nhookretroflex=627,a.nieunacirclekorean=12911,a.nieunaparenkorean=12815,a.nieuncieuckorean=12597,a.nieuncirclekorean=12897,a.nieunhieuhkorean=12598,a.nieunkorean=12596,a.nieunpansioskorean=12648,a.nieunparenkorean=12801,a.nieunsioskorean=12647,a.nieuntikeutkorean=12646,a.nihiragana=12395,a.nikatakana=12491,a.nikatakanahalfwidth=65414,a.nikhahitleftthai=63641,a.nikhahitthai=3661,a.nine=57,a.ninearabic=1641,a.ninebengali=2543,a.ninecircle=9320,a.ninecircleinversesansserif=10130,a.ninedeva=2415,a.ninegujarati=2799,a.ninegurmukhi=2671,a.ninehackarabic=1641,a.ninehangzhou=12329,a.nineideographicparen=12840,a.nineinferior=8329,a.ninemonospace=65305,a.nineoldstyle=63289,a.nineparen=9340,a.nineperiod=9360,a.ninepersian=1785,a.nineroman=8568,a.ninesuperior=8313,a.nineteencircle=9330,a.nineteenparen=9350,a.nineteenperiod=9370,a.ninethai=3673,a.nj=460,a.njecyrillic=1114,a.nkatakana=12531,a.nkatakanahalfwidth=65437,a.nlegrightlong=414,a.nlinebelow=7753,a.nmonospace=65358,a.nmsquare=13210,a.nnabengali=2467,a.nnadeva=2339,a.nnagujarati=2723,a.nnagurmukhi=2595,a.nnnadeva=2345,a.nohiragana=12398,a.nokatakana=12494,a.nokatakanahalfwidth=65417,a.nonbreakingspace=160,a.nonenthai=3603,a.nonuthai=3609,a.noonarabic=1606,a.noonfinalarabic=65254,a.noonghunnaarabic=1722,a.noonghunnafinalarabic=64415,a.nooninitialarabic=65255,a.noonjeeminitialarabic=64722,a.noonjeemisolatedarabic=64587,a.noonmedialarabic=65256,a.noonmeeminitialarabic=64725,a.noonmeemisolatedarabic=64590,a.noonnoonfinalarabic=64653,a.notcontains=8716,a.notelement=8713,a.notelementof=8713,a.notequal=8800,a.notgreater=8815,a.notgreaternorequal=8817,a.notgreaternorless=8825,a.notidentical=8802,a.notless=8814,a.notlessnorequal=8816,a.notparallel=8742,a.notprecedes=8832,a.notsubset=8836,a.notsucceeds=8833,a.notsuperset=8837,a.nowarmenian=1398,a.nparen=9385,a.nssquare=13233,a.nsuperior=8319,a.ntilde=241,a.nu=957,a.nuhiragana=12396,a.nukatakana=12492,a.nukatakanahalfwidth=65415,a.nuktabengali=2492,a.nuktadeva=2364,a.nuktagujarati=2748,a.nuktagurmukhi=2620,a.numbersign=35,a.numbersignmonospace=65283,a.numbersignsmall=65119,a.numeralsigngreek=884,a.numeralsignlowergreek=885,a.numero=8470,a.nun=1504,a.nundagesh=64320,a.nundageshhebrew=64320,a.nunhebrew=1504,a.nvsquare=13237,a.nwsquare=13243,a.nyabengali=2462,a.nyadeva=2334,a.nyagujarati=2718,a.nyagurmukhi=2590,a.o=111,a.oacute=243,a.oangthai=3629,a.obarred=629,a.obarredcyrillic=1257,a.obarreddieresiscyrillic=1259,a.obengali=2451,a.obopomofo=12571,a.obreve=335,a.ocandradeva=2321,a.ocandragujarati=2705,a.ocandravowelsigndeva=2377,a.ocandravowelsigngujarati=2761,a.ocaron=466,a.ocircle=9438,a.ocircumflex=244,a.ocircumflexacute=7889,a.ocircumflexdotbelow=7897,a.ocircumflexgrave=7891,a.ocircumflexhookabove=7893,a.ocircumflextilde=7895,a.ocyrillic=1086,a.odblacute=337,a.odblgrave=525,a.odeva=2323,a.odieresis=246,a.odieresiscyrillic=1255,a.odotbelow=7885,a.oe=339,a.oekorean=12634,a.ogonek=731,a.ogonekcmb=808,a.ograve=242,a.ogujarati=2707,a.oharmenian=1413,a.ohiragana=12362,a.ohookabove=7887,a.ohorn=417,a.ohornacute=7899,a.ohorndotbelow=7907,a.ohorngrave=7901,a.ohornhookabove=7903,a.ohorntilde=7905,a.ohungarumlaut=337,a.oi=419,a.oinvertedbreve=527,a.okatakana=12458,a.okatakanahalfwidth=65397,a.okorean=12631,a.olehebrew=1451,a.omacron=333,a.omacronacute=7763,a.omacrongrave=7761,a.omdeva=2384,a.omega=969,a.omega1=982,a.omegacyrillic=1121,a.omegalatinclosed=631,a.omegaroundcyrillic=1147,a.omegatitlocyrillic=1149,a.omegatonos=974,a.omgujarati=2768,a.omicron=959,a.omicrontonos=972,a.omonospace=65359,a.one=49,a.onearabic=1633,a.onebengali=2535,a.onecircle=9312,a.onecircleinversesansserif=10122,a.onedeva=2407,a.onedotenleader=8228,a.oneeighth=8539,a.onefitted=63196,a.onegujarati=2791,a.onegurmukhi=2663,a.onehackarabic=1633,a.onehalf=189,a.onehangzhou=12321,a.oneideographicparen=12832,a.oneinferior=8321,a.onemonospace=65297,a.onenumeratorbengali=2548,a.oneoldstyle=63281,a.oneparen=9332,a.oneperiod=9352,a.onepersian=1777,a.onequarter=188,a.oneroman=8560,a.onesuperior=185,a.onethai=3665,a.onethird=8531,a.oogonek=491,a.oogonekmacron=493,a.oogurmukhi=2579,a.oomatragurmukhi=2635,a.oopen=596,a.oparen=9386,a.openbullet=9702,a.option=8997,a.ordfeminine=170,a.ordmasculine=186,a.orthogonal=8735,a.oshortdeva=2322,a.oshortvowelsigndeva=2378,a.oslash=248,a.oslashacute=511,a.osmallhiragana=12361,a.osmallkatakana=12457,a.osmallkatakanahalfwidth=65387,a.ostrokeacute=511,a.osuperior=63216,a.otcyrillic=1151,a.otilde=245,a.otildeacute=7757,a.otildedieresis=7759,a.oubopomofo=12577,a.overline=8254,a.overlinecenterline=65098,a.overlinecmb=773,a.overlinedashed=65097,a.overlinedblwavy=65100,a.overlinewavy=65099,a.overscore=175,a.ovowelsignbengali=2507,a.ovowelsigndeva=2379,a.ovowelsigngujarati=2763,a.p=112,a.paampssquare=13184,a.paasentosquare=13099,a.pabengali=2474,a.pacute=7765,a.padeva=2346,a.pagedown=8671,a.pageup=8670,a.pagujarati=2730,a.pagurmukhi=2602,a.pahiragana=12401,a.paiyannoithai=3631,a.pakatakana=12497,a.palatalizationcyrilliccmb=1156,a.palochkacyrillic=1216,a.pansioskorean=12671,a.paragraph=182,a.parallel=8741,a.parenleft=40,a.parenleftaltonearabic=64830,a.parenleftbt=63725,a.parenleftex=63724,a.parenleftinferior=8333,a.parenleftmonospace=65288,a.parenleftsmall=65113,a.parenleftsuperior=8317,a.parenlefttp=63723,a.parenleftvertical=65077,a.parenright=41,a.parenrightaltonearabic=64831,a.parenrightbt=63736,a.parenrightex=63735,a.parenrightinferior=8334,a.parenrightmonospace=65289,a.parenrightsmall=65114,a.parenrightsuperior=8318,a.parenrighttp=63734,a.parenrightvertical=65078,a.partialdiff=8706,a.paseqhebrew=1472,a.pashtahebrew=1433,a.pasquare=13225,a.patah=1463,a.patah11=1463,a.patah1d=1463,a.patah2a=1463,a.patahhebrew=1463,a.patahnarrowhebrew=1463,
a.patahquarterhebrew=1463,a.patahwidehebrew=1463,a.pazerhebrew=1441,a.pbopomofo=12550,a.pcircle=9439,a.pdotaccent=7767,a.pe=1508,a.pecyrillic=1087,a.pedagesh=64324,a.pedageshhebrew=64324,a.peezisquare=13115,a.pefinaldageshhebrew=64323,a.peharabic=1662,a.peharmenian=1402,a.pehebrew=1508,a.pehfinalarabic=64343,a.pehinitialarabic=64344,a.pehiragana=12410,a.pehmedialarabic=64345,a.pekatakana=12506,a.pemiddlehookcyrillic=1191,a.perafehebrew=64334,a.percent=37,a.percentarabic=1642,a.percentmonospace=65285,a.percentsmall=65130,a.period=46,a.periodarmenian=1417,a.periodcentered=183,a.periodhalfwidth=65377,a.periodinferior=63207,a.periodmonospace=65294,a.periodsmall=65106,a.periodsuperior=63208,a.perispomenigreekcmb=834,a.perpendicular=8869,a.perthousand=8240,a.peseta=8359,a.pfsquare=13194,a.phabengali=2475,a.phadeva=2347,a.phagujarati=2731,a.phagurmukhi=2603,a.phi=966,a.phi1=981,a.phieuphacirclekorean=12922,a.phieuphaparenkorean=12826,a.phieuphcirclekorean=12908,a.phieuphkorean=12621,a.phieuphparenkorean=12812,a.philatin=632,a.phinthuthai=3642,a.phisymbolgreek=981,a.phook=421,a.phophanthai=3614,a.phophungthai=3612,a.phosamphaothai=3616,a.pi=960,a.pieupacirclekorean=12915,a.pieupaparenkorean=12819,a.pieupcieuckorean=12662,a.pieupcirclekorean=12901,a.pieupkiyeokkorean=12658,a.pieupkorean=12610,a.pieupparenkorean=12805,a.pieupsioskiyeokkorean=12660,a.pieupsioskorean=12612,a.pieupsiostikeutkorean=12661,a.pieupthieuthkorean=12663,a.pieuptikeutkorean=12659,a.pihiragana=12404,a.pikatakana=12500,a.pisymbolgreek=982,a.piwrarmenian=1411,a.plus=43,a.plusbelowcmb=799,a.pluscircle=8853,a.plusminus=177,a.plusmod=726,a.plusmonospace=65291,a.plussmall=65122,a.plussuperior=8314,a.pmonospace=65360,a.pmsquare=13272,a.pohiragana=12413,a.pointingindexdownwhite=9759,a.pointingindexleftwhite=9756,a.pointingindexrightwhite=9758,a.pointingindexupwhite=9757,a.pokatakana=12509,a.poplathai=3611,a.postalmark=12306,a.postalmarkface=12320,a.pparen=9387,a.precedes=8826,a.prescription=8478,a.primemod=697,a.primereversed=8245,a.product=8719,a.projective=8965,a.prolongedkana=12540,a.propellor=8984,a.propersubset=8834,a.propersuperset=8835,a.proportion=8759,a.proportional=8733,a.psi=968,a.psicyrillic=1137,a.psilipneumatacyrilliccmb=1158,a.pssquare=13232,a.puhiragana=12407,a.pukatakana=12503,a.pvsquare=13236,a.pwsquare=13242,a.q=113,a.qadeva=2392,a.qadmahebrew=1448,a.qafarabic=1602,a.qaffinalarabic=65238,a.qafinitialarabic=65239,a.qafmedialarabic=65240,a.qamats=1464,a.qamats10=1464,a.qamats1a=1464,a.qamats1c=1464,a.qamats27=1464,a.qamats29=1464,a.qamats33=1464,a.qamatsde=1464,a.qamatshebrew=1464,a.qamatsnarrowhebrew=1464,a.qamatsqatanhebrew=1464,a.qamatsqatannarrowhebrew=1464,a.qamatsqatanquarterhebrew=1464,a.qamatsqatanwidehebrew=1464,a.qamatsquarterhebrew=1464,a.qamatswidehebrew=1464,a.qarneyparahebrew=1439,a.qbopomofo=12561,a.qcircle=9440,a.qhook=672,a.qmonospace=65361,a.qof=1511,a.qofdagesh=64327,a.qofdageshhebrew=64327,a.qofhebrew=1511,a.qparen=9388,a.quarternote=9833,a.qubuts=1467,a.qubuts18=1467,a.qubuts25=1467,a.qubuts31=1467,a.qubutshebrew=1467,a.qubutsnarrowhebrew=1467,a.qubutsquarterhebrew=1467,a.qubutswidehebrew=1467,a.question=63,a.questionarabic=1567,a.questionarmenian=1374,a.questiondown=191,a.questiondownsmall=63423,a.questiongreek=894,a.questionmonospace=65311,a.questionsmall=63295,a.quotedbl=34,a.quotedblbase=8222,a.quotedblleft=8220,a.quotedblmonospace=65282,a.quotedblprime=12318,a.quotedblprimereversed=12317,a.quotedblright=8221,a.quoteleft=8216,a.quoteleftreversed=8219,a.quotereversed=8219,a.quoteright=8217,a.quoterightn=329,a.quotesinglbase=8218,a.quotesingle=39,a.quotesinglemonospace=65287,a.r=114,a.raarmenian=1404,a.rabengali=2480,a.racute=341,a.radeva=2352,a.radical=8730,a.radicalex=63717,a.radoverssquare=13230,a.radoverssquaredsquare=13231,a.radsquare=13229,a.rafe=1471,a.rafehebrew=1471,a.ragujarati=2736,a.ragurmukhi=2608,a.rahiragana=12425,a.rakatakana=12521,a.rakatakanahalfwidth=65431,a.ralowerdiagonalbengali=2545,a.ramiddlediagonalbengali=2544,a.ramshorn=612,a.ratio=8758,a.rbopomofo=12566,a.rcaron=345,a.rcedilla=343,a.rcircle=9441,a.rcommaaccent=343,a.rdblgrave=529,a.rdotaccent=7769,a.rdotbelow=7771,a.rdotbelowmacron=7773,a.referencemark=8251,a.reflexsubset=8838,a.reflexsuperset=8839,a.registered=174,a.registersans=63720,a.registerserif=63194,a.reharabic=1585,a.reharmenian=1408,a.rehfinalarabic=65198,a.rehiragana=12428,a.rekatakana=12524,a.rekatakanahalfwidth=65434,a.resh=1512,a.reshdageshhebrew=64328,a.reshhebrew=1512,a.reversedtilde=8765,a.reviahebrew=1431,a.reviamugrashhebrew=1431,a.revlogicalnot=8976,a.rfishhook=638,a.rfishhookreversed=639,a.rhabengali=2525,a.rhadeva=2397,a.rho=961,a.rhook=637,a.rhookturned=635,a.rhookturnedsuperior=693,a.rhosymbolgreek=1009,a.rhotichookmod=734,a.rieulacirclekorean=12913,a.rieulaparenkorean=12817,a.rieulcirclekorean=12899,a.rieulhieuhkorean=12608,a.rieulkiyeokkorean=12602,a.rieulkiyeoksioskorean=12649,a.rieulkorean=12601,a.rieulmieumkorean=12603,a.rieulpansioskorean=12652,a.rieulparenkorean=12803,a.rieulphieuphkorean=12607,a.rieulpieupkorean=12604,a.rieulpieupsioskorean=12651,a.rieulsioskorean=12605,a.rieulthieuthkorean=12606,a.rieultikeutkorean=12650,a.rieulyeorinhieuhkorean=12653,a.rightangle=8735,a.righttackbelowcmb=793,a.righttriangle=8895,a.rihiragana=12426,a.rikatakana=12522,a.rikatakanahalfwidth=65432,a.ring=730,a.ringbelowcmb=805,a.ringcmb=778,a.ringhalfleft=703,a.ringhalfleftarmenian=1369,a.ringhalfleftbelowcmb=796,a.ringhalfleftcentered=723,a.ringhalfright=702,a.ringhalfrightbelowcmb=825,a.ringhalfrightcentered=722,a.rinvertedbreve=531,a.rittorusquare=13137,a.rlinebelow=7775,a.rlongleg=636,a.rlonglegturned=634,a.rmonospace=65362,a.rohiragana=12429,a.rokatakana=12525,a.rokatakanahalfwidth=65435,a.roruathai=3619,a.rparen=9389,a.rrabengali=2524,a.rradeva=2353,a.rragurmukhi=2652,a.rreharabic=1681,a.rrehfinalarabic=64397,a.rrvocalicbengali=2528,a.rrvocalicdeva=2400,a.rrvocalicgujarati=2784,a.rrvocalicvowelsignbengali=2500,a.rrvocalicvowelsigndeva=2372,a.rrvocalicvowelsigngujarati=2756,a.rsuperior=63217,a.rtblock=9616,a.rturned=633,a.rturnedsuperior=692,a.ruhiragana=12427,a.rukatakana=12523,a.rukatakanahalfwidth=65433,a.rupeemarkbengali=2546,a.rupeesignbengali=2547,a.rupiah=63197,a.ruthai=3620,a.rvocalicbengali=2443,a.rvocalicdeva=2315,a.rvocalicgujarati=2699,a.rvocalicvowelsignbengali=2499,a.rvocalicvowelsigndeva=2371,a.rvocalicvowelsigngujarati=2755,a.s=115,a.sabengali=2488,a.sacute=347,a.sacutedotaccent=7781,a.sadarabic=1589,a.sadeva=2360,a.sadfinalarabic=65210,a.sadinitialarabic=65211,a.sadmedialarabic=65212,a.sagujarati=2744,a.sagurmukhi=2616,a.sahiragana=12373,a.sakatakana=12469,a.sakatakanahalfwidth=65403,a.sallallahoualayhewasallamarabic=65018,a.samekh=1505,a.samekhdagesh=64321,a.samekhdageshhebrew=64321,a.samekhhebrew=1505,a.saraaathai=3634,a.saraaethai=3649,a.saraaimaimalaithai=3652,a.saraaimaimuanthai=3651,a.saraamthai=3635,a.saraathai=3632,a.saraethai=3648,a.saraiileftthai=63622,a.saraiithai=3637,a.saraileftthai=63621,a.saraithai=3636,a.saraothai=3650,a.saraueeleftthai=63624,a.saraueethai=3639,a.saraueleftthai=63623,a.sarauethai=3638,a.sarauthai=3640,a.sarauuthai=3641,a.sbopomofo=12569,a.scaron=353,a.scarondotaccent=7783,a.scedilla=351,a.schwa=601,a.schwacyrillic=1241,a.schwadieresiscyrillic=1243,a.schwahook=602,a.scircle=9442,a.scircumflex=349,a.scommaaccent=537,a.sdotaccent=7777,a.sdotbelow=7779,a.sdotbelowdotaccent=7785,a.seagullbelowcmb=828,a.second=8243,a.secondtonechinese=714,a.section=167,a.seenarabic=1587,a.seenfinalarabic=65202,a.seeninitialarabic=65203,a.seenmedialarabic=65204,a.segol=1462,a.segol13=1462,a.segol1f=1462,a.segol2c=1462,a.segolhebrew=1462,a.segolnarrowhebrew=1462,a.segolquarterhebrew=1462,a.segoltahebrew=1426,a.segolwidehebrew=1462,a.seharmenian=1405,a.sehiragana=12379,a.sekatakana=12475,a.sekatakanahalfwidth=65406,a.semicolon=59,a.semicolonarabic=1563,a.semicolonmonospace=65307,a.semicolonsmall=65108,a.semivoicedmarkkana=12444,a.semivoicedmarkkanahalfwidth=65439,a.sentisquare=13090,a.sentosquare=13091,a.seven=55,a.sevenarabic=1639,a.sevenbengali=2541,a.sevencircle=9318,a.sevencircleinversesansserif=10128,a.sevendeva=2413,a.seveneighths=8542,a.sevengujarati=2797,a.sevengurmukhi=2669,a.sevenhackarabic=1639,a.sevenhangzhou=12327,a.sevenideographicparen=12838,a.seveninferior=8327,a.sevenmonospace=65303,a.sevenoldstyle=63287,a.sevenparen=9338,a.sevenperiod=9358,a.sevenpersian=1783,a.sevenroman=8566,a.sevensuperior=8311,a.seventeencircle=9328,a.seventeenparen=9348,a.seventeenperiod=9368,a.seventhai=3671,a.sfthyphen=173,a.shaarmenian=1399,a.shabengali=2486,a.shacyrillic=1096,a.shaddaarabic=1617,a.shaddadammaarabic=64609,a.shaddadammatanarabic=64606,a.shaddafathaarabic=64608,a.shaddakasraarabic=64610,a.shaddakasratanarabic=64607,a.shade=9618,a.shadedark=9619,a.shadelight=9617,a.shademedium=9618,a.shadeva=2358,a.shagujarati=2742,a.shagurmukhi=2614,a.shalshelethebrew=1427,a.shbopomofo=12565,a.shchacyrillic=1097,a.sheenarabic=1588,a.sheenfinalarabic=65206,a.sheeninitialarabic=65207,a.sheenmedialarabic=65208,a.sheicoptic=995,a.sheqel=8362,a.sheqelhebrew=8362,a.sheva=1456,a.sheva115=1456,a.sheva15=1456,a.sheva22=1456,a.sheva2e=1456,a.shevahebrew=1456,a.shevanarrowhebrew=1456,a.shevaquarterhebrew=1456,a.shevawidehebrew=1456,a.shhacyrillic=1211,a.shimacoptic=1005,a.shin=1513,a.shindagesh=64329,a.shindageshhebrew=64329,a.shindageshshindot=64300,a.shindageshshindothebrew=64300,a.shindageshsindot=64301,a.shindageshsindothebrew=64301,a.shindothebrew=1473,a.shinhebrew=1513,a.shinshindot=64298,a.shinshindothebrew=64298,a.shinsindot=64299,a.shinsindothebrew=64299,a.shook=642,a.sigma=963,a.sigma1=962,a.sigmafinal=962,a.sigmalunatesymbolgreek=1010,a.sihiragana=12375,a.sikatakana=12471,a.sikatakanahalfwidth=65404,a.siluqhebrew=1469,a.siluqlefthebrew=1469,a.similar=8764,a.sindothebrew=1474,a.siosacirclekorean=12916,a.siosaparenkorean=12820,a.sioscieuckorean=12670,a.sioscirclekorean=12902,a.sioskiyeokkorean=12666,a.sioskorean=12613,a.siosnieunkorean=12667,a.siosparenkorean=12806,a.siospieupkorean=12669,a.siostikeutkorean=12668,a.six=54,a.sixarabic=1638,a.sixbengali=2540,a.sixcircle=9317,a.sixcircleinversesansserif=10127,a.sixdeva=2412,a.sixgujarati=2796,a.sixgurmukhi=2668,a.sixhackarabic=1638,a.sixhangzhou=12326,a.sixideographicparen=12837,a.sixinferior=8326,a.sixmonospace=65302,a.sixoldstyle=63286,a.sixparen=9337,a.sixperiod=9357,a.sixpersian=1782,a.sixroman=8565,a.sixsuperior=8310,a.sixteencircle=9327,a.sixteencurrencydenominatorbengali=2553,a.sixteenparen=9347,a.sixteenperiod=9367,a.sixthai=3670,a.slash=47,a.slashmonospace=65295,a.slong=383,a.slongdotaccent=7835,a.smileface=9786,a.smonospace=65363,a.sofpasuqhebrew=1475,a.softhyphen=173,a.softsigncyrillic=1100,a.sohiragana=12381,a.sokatakana=12477,a.sokatakanahalfwidth=65407,a.soliduslongoverlaycmb=824,a.solidusshortoverlaycmb=823,a.sorusithai=3625,a.sosalathai=3624,a.sosothai=3595,a.sosuathai=3626,a.space=32,a.spacehackarabic=32,a.spade=9824,a.spadesuitblack=9824,a.spadesuitwhite=9828,a.sparen=9390,a.squarebelowcmb=827,a.squarecc=13252,a.squarecm=13213,a.squarediagonalcrosshatchfill=9641,a.squarehorizontalfill=9636,a.squarekg=13199,a.squarekm=13214,a.squarekmcapital=13262,a.squareln=13265,a.squarelog=13266,a.squaremg=13198,a.squaremil=13269,a.squaremm=13212,a.squaremsquared=13217,a.squareorthogonalcrosshatchfill=9638,a.squareupperlefttolowerrightfill=9639,a.squareupperrighttolowerleftfill=9640,a.squareverticalfill=9637,a.squarewhitewithsmallblack=9635,a.srsquare=13275,a.ssabengali=2487,a.ssadeva=2359,a.ssagujarati=2743,a.ssangcieuckorean=12617,a.ssanghieuhkorean=12677,a.ssangieungkorean=12672,a.ssangkiyeokkorean=12594,a.ssangnieunkorean=12645,a.ssangpieupkorean=12611,a.ssangsioskorean=12614,a.ssangtikeutkorean=12600,a.ssuperior=63218,a.sterling=163,a.sterlingmonospace=65505,a.strokelongoverlaycmb=822,a.strokeshortoverlaycmb=821,a.subset=8834,a.subsetnotequal=8842,a.subsetorequal=8838,a.succeeds=8827,a.suchthat=8715,a.suhiragana=12377,a.sukatakana=12473,a.sukatakanahalfwidth=65405,a.sukunarabic=1618,a.summation=8721,a.sun=9788,a.superset=8835,a.supersetnotequal=8843,a.supersetorequal=8839,a.svsquare=13276,a.syouwaerasquare=13180,a.t=116,a.tabengali=2468,a.tackdown=8868,a.tackleft=8867,a.tadeva=2340,a.tagujarati=2724,a.tagurmukhi=2596,a.taharabic=1591,a.tahfinalarabic=65218,a.tahinitialarabic=65219,a.tahiragana=12383,a.tahmedialarabic=65220,a.taisyouerasquare=13181,a.takatakana=12479,a.takatakanahalfwidth=65408,a.tatweelarabic=1600,a.tau=964,a.tav=1514,a.tavdages=64330,a.tavdagesh=64330,a.tavdageshhebrew=64330,a.tavhebrew=1514,a.tbar=359,a.tbopomofo=12554,a.tcaron=357,a.tccurl=680,a.tcedilla=355,a.tcheharabic=1670,a.tchehfinalarabic=64379,a.tchehinitialarabic=64380,a.tchehmedialarabic=64381,a.tcircle=9443,a.tcircumflexbelow=7793,a.tcommaaccent=355,a.tdieresis=7831,a.tdotaccent=7787,a.tdotbelow=7789,a.tecyrillic=1090,a.tedescendercyrillic=1197,a.teharabic=1578,a.tehfinalarabic=65174,a.tehhahinitialarabic=64674,a.tehhahisolatedarabic=64524,a.tehinitialarabic=65175,a.tehiragana=12390,a.tehjeeminitialarabic=64673,a.tehjeemisolatedarabic=64523,a.tehmarbutaarabic=1577,a.tehmarbutafinalarabic=65172,a.tehmedialarabic=65176,a.tehmeeminitialarabic=64676,a.tehmeemisolatedarabic=64526,a.tehnoonfinalarabic=64627,a.tekatakana=12486,a.tekatakanahalfwidth=65411,a.telephone=8481,a.telephoneblack=9742,a.telishagedolahebrew=1440,a.telishaqetanahebrew=1449,a.tencircle=9321,a.tenideographicparen=12841,a.tenparen=9341,a.tenperiod=9361,a.tenroman=8569,a.tesh=679,a.tet=1496,a.tetdagesh=64312,a.tetdageshhebrew=64312,a.tethebrew=1496,a.tetsecyrillic=1205,a.tevirhebrew=1435,a.tevirlefthebrew=1435,a.thabengali=2469,a.thadeva=2341,a.thagujarati=2725,a.thagurmukhi=2597,a.thalarabic=1584,a.thalfinalarabic=65196,a.thanthakhatlowleftthai=63640,a.thanthakhatlowrightthai=63639,a.thanthakhatthai=3660,a.thanthakhatupperleftthai=63638,a.theharabic=1579,a.thehfinalarabic=65178,a.thehinitialarabic=65179,a.thehmedialarabic=65180,a.thereexists=8707,a.therefore=8756,a.theta=952,a.theta1=977,a.thetasymbolgreek=977,a.thieuthacirclekorean=12921,a.thieuthaparenkorean=12825,a.thieuthcirclekorean=12907,a.thieuthkorean=12620,a.thieuthparenkorean=12811,a.thirteencircle=9324,a.thirteenparen=9344,a.thirteenperiod=9364,a.thonangmonthothai=3601,a.thook=429,a.thophuthaothai=3602,a.thorn=254,a.thothahanthai=3607,a.thothanthai=3600,a.thothongthai=3608,a.thothungthai=3606,a.thousandcyrillic=1154,a.thousandsseparatorarabic=1644,a.thousandsseparatorpersian=1644,a.three=51,a.threearabic=1635,a.threebengali=2537,a.threecircle=9314,a.threecircleinversesansserif=10124,a.threedeva=2409,a.threeeighths=8540,a.threegujarati=2793,a.threegurmukhi=2665,a.threehackarabic=1635,a.threehangzhou=12323,a.threeideographicparen=12834,a.threeinferior=8323,a.threemonospace=65299,a.threenumeratorbengali=2550,a.threeoldstyle=63283,a.threeparen=9334,a.threeperiod=9354,a.threepersian=1779,a.threequarters=190,a.threequartersemdash=63198,a.threeroman=8562,a.threesuperior=179,a.threethai=3667,a.thzsquare=13204,a.tihiragana=12385,a.tikatakana=12481,a.tikatakanahalfwidth=65409,a.tikeutacirclekorean=12912,a.tikeutaparenkorean=12816,a.tikeutcirclekorean=12898,a.tikeutkorean=12599,a.tikeutparenkorean=12802,a.tilde=732,a.tildebelowcmb=816,a.tildecmb=771,a.tildecomb=771,a.tildedoublecmb=864,a.tildeoperator=8764,a.tildeoverlaycmb=820,a.tildeverticalcmb=830,a.timescircle=8855,a.tipehahebrew=1430,a.tipehalefthebrew=1430,a.tippigurmukhi=2672,a.titlocyrilliccmb=1155,a.tiwnarmenian=1407,a.tlinebelow=7791,a.tmonospace=65364,a.toarmenian=1385,a.tohiragana=12392,a.tokatakana=12488,a.tokatakanahalfwidth=65412,a.tonebarextrahighmod=741,a.tonebarextralowmod=745,a.tonebarhighmod=742,a.tonebarlowmod=744,a.tonebarmidmod=743,a.tonefive=445,a.tonesix=389,a.tonetwo=424,a.tonos=900,a.tonsquare=13095,a.topatakthai=3599,a.tortoiseshellbracketleft=12308,a.tortoiseshellbracketleftsmall=65117,a.tortoiseshellbracketleftvertical=65081,a.tortoiseshellbracketright=12309,a.tortoiseshellbracketrightsmall=65118,a.tortoiseshellbracketrightvertical=65082,a.totaothai=3605,a.tpalatalhook=427,a.tparen=9391,a.trademark=8482,a.trademarksans=63722,a.trademarkserif=63195,a.tretroflexhook=648,a.triagdn=9660,a.triaglf=9668,a.triagrt=9658,a.triagup=9650,a.ts=678,a.tsadi=1510,a.tsadidagesh=64326,a.tsadidageshhebrew=64326,a.tsadihebrew=1510,a.tsecyrillic=1094,a.tsere=1461,a.tsere12=1461,a.tsere1e=1461,a.tsere2b=1461,a.tserehebrew=1461,a.tserenarrowhebrew=1461,a.tserequarterhebrew=1461,a.tserewidehebrew=1461,a.tshecyrillic=1115,a.tsuperior=63219,a.ttabengali=2463,a.ttadeva=2335,a.ttagujarati=2719,a.ttagurmukhi=2591,a.tteharabic=1657,a.ttehfinalarabic=64359,a.ttehinitialarabic=64360,a.ttehmedialarabic=64361,a.tthabengali=2464,a.tthadeva=2336,a.tthagujarati=2720,a.tthagurmukhi=2592,a.tturned=647,a.tuhiragana=12388,a.tukatakana=12484,a.tukatakanahalfwidth=65410,a.tusmallhiragana=12387,a.tusmallkatakana=12483,a.tusmallkatakanahalfwidth=65391,a.twelvecircle=9323,a.twelveparen=9343,a.twelveperiod=9363,a.twelveroman=8571,a.twentycircle=9331,a.twentyhangzhou=21316,a.twentyparen=9351,a.twentyperiod=9371,a.two=50,a.twoarabic=1634,a.twobengali=2536,a.twocircle=9313,a.twocircleinversesansserif=10123,a.twodeva=2408,a.twodotenleader=8229,a.twodotleader=8229,a.twodotleadervertical=65072,a.twogujarati=2792,a.twogurmukhi=2664,a.twohackarabic=1634,a.twohangzhou=12322,a.twoideographicparen=12833,a.twoinferior=8322,a.twomonospace=65298,a.twonumeratorbengali=2549,a.twooldstyle=63282,a.twoparen=9333,a.twoperiod=9353,a.twopersian=1778,a.tworoman=8561,a.twostroke=443,a.twosuperior=178,a.twothai=3666,a.twothirds=8532,a.u=117,a.uacute=250,a.ubar=649,a.ubengali=2441,a.ubopomofo=12584,a.ubreve=365,a.ucaron=468,a.ucircle=9444,a.ucircumflex=251,a.ucircumflexbelow=7799,a.ucyrillic=1091,a.udattadeva=2385,a.udblacute=369,a.udblgrave=533,a.udeva=2313,a.udieresis=252,a.udieresisacute=472,a.udieresisbelow=7795,a.udieresiscaron=474,a.udieresiscyrillic=1265,a.udieresisgrave=476,a.udieresismacron=470,a.udotbelow=7909,a.ugrave=249,a.ugujarati=2697,a.ugurmukhi=2569,a.uhiragana=12358,a.uhookabove=7911,a.uhorn=432,a.uhornacute=7913,a.uhorndotbelow=7921,a.uhorngrave=7915,a.uhornhookabove=7917,a.uhorntilde=7919,a.uhungarumlaut=369,a.uhungarumlautcyrillic=1267,a.uinvertedbreve=535,a.ukatakana=12454,a.ukatakanahalfwidth=65395,a.ukcyrillic=1145,a.ukorean=12636,a.umacron=363,a.umacroncyrillic=1263,a.umacrondieresis=7803,a.umatragurmukhi=2625,a.umonospace=65365,a.underscore=95,a.underscoredbl=8215,a.underscoremonospace=65343,a.underscorevertical=65075,a.underscorewavy=65103,a.union=8746,a.universal=8704,a.uogonek=371,a.uparen=9392,a.upblock=9600,a.upperdothebrew=1476,a.upsilon=965,a.upsilondieresis=971,a.upsilondieresistonos=944,a.upsilonlatin=650,a.upsilontonos=973,a.uptackbelowcmb=797,a.uptackmod=724,a.uragurmukhi=2675,a.uring=367,a.ushortcyrillic=1118,a.usmallhiragana=12357,a.usmallkatakana=12453,a.usmallkatakanahalfwidth=65385,a.ustraightcyrillic=1199,a.ustraightstrokecyrillic=1201,a.utilde=361,a.utildeacute=7801,a.utildebelow=7797,a.uubengali=2442,a.uudeva=2314,a.uugujarati=2698,a.uugurmukhi=2570,a.uumatragurmukhi=2626,a.uuvowelsignbengali=2498,a.uuvowelsigndeva=2370,a.uuvowelsigngujarati=2754,a.uvowelsignbengali=2497,a.uvowelsigndeva=2369,a.uvowelsigngujarati=2753,a.v=118,a.vadeva=2357,a.vagujarati=2741,a.vagurmukhi=2613,a.vakatakana=12535,a.vav=1493,a.vavdagesh=64309,a.vavdagesh65=64309,a.vavdageshhebrew=64309,a.vavhebrew=1493,a.vavholam=64331,a.vavholamhebrew=64331,a.vavvavhebrew=1520,a.vavyodhebrew=1521,a.vcircle=9445,a.vdotbelow=7807,a.vecyrillic=1074,a.veharabic=1700,a.vehfinalarabic=64363,a.vehinitialarabic=64364,a.vehmedialarabic=64365,a.vekatakana=12537,a.venus=9792,a.verticalbar=124,a.verticallineabovecmb=781,a.verticallinebelowcmb=809,a.verticallinelowmod=716,a.verticallinemod=712,a.vewarmenian=1406,a.vhook=651,a.vikatakana=12536,a.viramabengali=2509,a.viramadeva=2381,a.viramagujarati=2765,a.visargabengali=2435,a.visargadeva=2307,a.visargagujarati=2691,a.vmonospace=65366,a.voarmenian=1400,a.voicediterationhiragana=12446,a.voicediterationkatakana=12542,a.voicedmarkkana=12443,a.voicedmarkkanahalfwidth=65438,a.vokatakana=12538,a.vparen=9393,a.vtilde=7805,a.vturned=652,a.vuhiragana=12436,a.vukatakana=12532,a.w=119,a.wacute=7811,a.waekorean=12633,a.wahiragana=12431,a.wakatakana=12527,a.wakatakanahalfwidth=65436,a.wakorean=12632,a.wasmallhiragana=12430,a.wasmallkatakana=12526,a.wattosquare=13143,a.wavedash=12316,a.wavyunderscorevertical=65076,a.wawarabic=1608,a.wawfinalarabic=65262,a.wawhamzaabovearabic=1572,a.wawhamzaabovefinalarabic=65158,a.wbsquare=13277,a.wcircle=9446,a.wcircumflex=373,a.wdieresis=7813,a.wdotaccent=7815,a.wdotbelow=7817,a.wehiragana=12433,a.weierstrass=8472,a.wekatakana=12529,a.wekorean=12638,a.weokorean=12637,a.wgrave=7809,a.whitebullet=9702,a.whitecircle=9675,a.whitecircleinverse=9689,a.whitecornerbracketleft=12302,a.whitecornerbracketleftvertical=65091,a.whitecornerbracketright=12303,a.whitecornerbracketrightvertical=65092,a.whitediamond=9671,a.whitediamondcontainingblacksmalldiamond=9672,a.whitedownpointingsmalltriangle=9663,a.whitedownpointingtriangle=9661,a.whiteleftpointingsmalltriangle=9667,a.whiteleftpointingtriangle=9665,a.whitelenticularbracketleft=12310,a.whitelenticularbracketright=12311,a.whiterightpointingsmalltriangle=9657,a.whiterightpointingtriangle=9655,a.whitesmallsquare=9643,a.whitesmilingface=9786,a.whitesquare=9633,a.whitestar=9734,a.whitetelephone=9743,a.whitetortoiseshellbracketleft=12312,a.whitetortoiseshellbracketright=12313,a.whiteuppointingsmalltriangle=9653,a.whiteuppointingtriangle=9651,a.wihiragana=12432,a.wikatakana=12528,a.wikorean=12639,a.wmonospace=65367,a.wohiragana=12434,a.wokatakana=12530,a.wokatakanahalfwidth=65382,a.won=8361,a.wonmonospace=65510,a.wowaenthai=3623,a.wparen=9394,a.wring=7832,a.wsuperior=695,a.wturned=653,a.wynn=447,a.x=120,a.xabovecmb=829,a.xbopomofo=12562,a.xcircle=9447,a.xdieresis=7821,a.xdotaccent=7819,a.xeharmenian=1389,a.xi=958,a.xmonospace=65368,a.xparen=9395,a.xsuperior=739,a.y=121,a.yaadosquare=13134,a.yabengali=2479,a.yacute=253,a.yadeva=2351,a.yaekorean=12626,a.yagujarati=2735,a.yagurmukhi=2607,a.yahiragana=12420,a.yakatakana=12516,a.yakatakanahalfwidth=65428,a.yakorean=12625,a.yamakkanthai=3662,a.yasmallhiragana=12419,a.yasmallkatakana=12515,a.yasmallkatakanahalfwidth=65388,a.yatcyrillic=1123,a.ycircle=9448,a.ycircumflex=375,a.ydieresis=255,a.ydotaccent=7823,a.ydotbelow=7925,a.yeharabic=1610,a.yehbarreearabic=1746,a.yehbarreefinalarabic=64431,a.yehfinalarabic=65266,a.yehhamzaabovearabic=1574,a.yehhamzaabovefinalarabic=65162,a.yehhamzaaboveinitialarabic=65163,a.yehhamzaabovemedialarabic=65164,a.yehinitialarabic=65267,a.yehmedialarabic=65268,a.yehmeeminitialarabic=64733,a.yehmeemisolatedarabic=64600,a.yehnoonfinalarabic=64660,a.yehthreedotsbelowarabic=1745,a.yekorean=12630,a.yen=165,a.yenmonospace=65509,a.yeokorean=12629,a.yeorinhieuhkorean=12678,a.yerahbenyomohebrew=1450,a.yerahbenyomolefthebrew=1450,a.yericyrillic=1099,a.yerudieresiscyrillic=1273,a.yesieungkorean=12673,a.yesieungpansioskorean=12675,a.yesieungsioskorean=12674,a.yetivhebrew=1434,a.ygrave=7923,a.yhook=436,a.yhookabove=7927,a.yiarmenian=1397,a.yicyrillic=1111,a.yikorean=12642,a.yinyang=9775,a.yiwnarmenian=1410,a.ymonospace=65369,a.yod=1497,a.yoddagesh=64313,a.yoddageshhebrew=64313,a.yodhebrew=1497,a.yodyodhebrew=1522,a.yodyodpatahhebrew=64287,a.yohiragana=12424,a.yoikorean=12681,a.yokatakana=12520,a.yokatakanahalfwidth=65430,a.yokorean=12635,a.yosmallhiragana=12423,a.yosmallkatakana=12519,a.yosmallkatakanahalfwidth=65390,a.yotgreek=1011,a.yoyaekorean=12680,a.yoyakorean=12679,a.yoyakthai=3618,a.yoyingthai=3597,a.yparen=9396,a.ypogegrammeni=890,a.ypogegrammenigreekcmb=837,a.yr=422,a.yring=7833,a.ysuperior=696,a.ytilde=7929,a.yturned=654,a.yuhiragana=12422,a.yuikorean=12684,a.yukatakana=12518,a.yukatakanahalfwidth=65429,a.yukorean=12640,a.yusbigcyrillic=1131,a.yusbigiotifiedcyrillic=1133,a.yuslittlecyrillic=1127,a.yuslittleiotifiedcyrillic=1129,a.yusmallhiragana=12421,a.yusmallkatakana=12517,a.yusmallkatakanahalfwidth=65389,a.yuyekorean=12683,a.yuyeokorean=12682,a.yyabengali=2527,a.yyadeva=2399,a.z=122,a.zaarmenian=1382,a.zacute=378,a.zadeva=2395,a.zagurmukhi=2651,a.zaharabic=1592,a.zahfinalarabic=65222,a.zahinitialarabic=65223,a.zahiragana=12374,a.zahmedialarabic=65224,a.zainarabic=1586,a.zainfinalarabic=65200,a.zakatakana=12470,a.zaqefgadolhebrew=1429,a.zaqefqatanhebrew=1428,a.zarqahebrew=1432,a.zayin=1494,a.zayindagesh=64310,a.zayindageshhebrew=64310,a.zayinhebrew=1494,a.zbopomofo=12567,a.zcaron=382,a.zcircle=9449,a.zcircumflex=7825,a.zcurl=657,a.zdot=380,a.zdotaccent=380,a.zdotbelow=7827,a.zecyrillic=1079,a.zedescendercyrillic=1177,a.zedieresiscyrillic=1247,a.zehiragana=12380,a.zekatakana=12476,a.zero=48,a.zeroarabic=1632,a.zerobengali=2534,a.zerodeva=2406,a.zerogujarati=2790,a.zerogurmukhi=2662,a.zerohackarabic=1632,a.zeroinferior=8320,a.zeromonospace=65296,a.zerooldstyle=63280,a.zeropersian=1776,a.zerosuperior=8304,a.zerothai=3664,a.zerowidthjoiner=65279,a.zerowidthnonjoiner=8204,a.zerowidthspace=8203,a.zeta=950,a.zhbopomofo=12563,a.zhearmenian=1386,a.zhebrevecyrillic=1218,a.zhecyrillic=1078,a.zhedescendercyrillic=1175,a.zhedieresiscyrillic=1245,a.zihiragana=12376,a.zikatakana=12472,a.zinorhebrew=1454,a.zlinebelow=7829,a.zmonospace=65370,a.zohiragana=12382,a.zokatakana=12478,a.zparen=9397,a.zretroflexhook=656,a.zstroke=438,a.zuhiragana=12378,a.zukatakana=12474,a[".notdef"]=0}),e=c(function(a){a.space=32,a.a1=9985,a.a2=9986,a.a202=9987,a.a3=9988,a.a4=9742,a.a5=9990,a.a119=9991,a.a118=9992,a.a117=9993,a.a11=9755,a.a12=9758,a.a13=9996,a.a14=9997,a.a15=9998,a.a16=9999,a.a105=1e4,a.a17=10001,a.a18=10002,a.a19=10003,a.a20=10004,a.a21=10005,a.a22=10006,a.a23=10007,a.a24=10008,a.a25=10009,a.a26=10010,a.a27=10011,a.a28=10012,a.a6=10013,a.a7=10014,a.a8=10015,a.a9=10016,a.a10=10017,a.a29=10018,a.a30=10019,a.a31=10020,a.a32=10021,a.a33=10022,a.a34=10023,a.a35=9733,a.a36=10025,a.a37=10026,a.a38=10027,a.a39=10028,a.a40=10029,a.a41=10030,a.a42=10031,a.a43=10032,a.a44=10033,a.a45=10034,a.a46=10035,a.a47=10036,a.a48=10037,a.a49=10038,a.a50=10039,a.a51=10040,a.a52=10041,a.a53=10042,a.a54=10043,a.a55=10044,a.a56=10045,a.a57=10046,a.a58=10047,a.a59=10048,a.a60=10049,a.a61=10050,a.a62=10051,a.a63=10052,a.a64=10053,a.a65=10054,a.a66=10055,a.a67=10056,a.a68=10057,a.a69=10058,a.a70=10059,a.a71=9679,a.a72=10061,a.a73=9632,a.a74=10063,a.a203=10064,a.a75=10065,a.a204=10066,a.a76=9650,a.a77=9660,a.a78=9670,a.a79=10070,a.a81=9687,a.a82=10072,a.a83=10073,a.a84=10074,a.a97=10075,a.a98=10076,a.a99=10077,a.a100=10078,a.a101=10081,a.a102=10082,a.a103=10083,a.a104=10084,a.a106=10085,a.a107=10086,a.a108=10087,a.a112=9827,a.a111=9830,a.a110=9829,a.a109=9824,a.a120=9312,a.a121=9313,a.a122=9314,a.a123=9315,a.a124=9316,a.a125=9317,a.a126=9318,a.a127=9319,a.a128=9320,a.a129=9321,a.a130=10102,a.a131=10103,a.a132=10104,a.a133=10105,a.a134=10106,a.a135=10107,a.a136=10108,a.a137=10109,a.a138=10110,a.a139=10111,a.a140=10112,a.a141=10113,a.a142=10114,a.a143=10115,a.a144=10116,a.a145=10117,a.a146=10118,a.a147=10119,a.a148=10120,a.a149=10121,a.a150=10122,a.a151=10123,a.a152=10124,a.a153=10125,a.a154=10126,a.a155=10127,a.a156=10128,a.a157=10129,a.a158=10130,a.a159=10131,a.a160=10132,a.a161=8594,a.a163=8596,a.a164=8597,a.a196=10136,a.a165=10137,a.a192=10138,a.a166=10139,a.a167=10140,a.a168=10141,a.a169=10142,a.a170=10143,a.a171=10144,a.a172=10145,a.a173=10146,a.a162=10147,a.a174=10148,a.a175=10149,a.a176=10150,a.a177=10151,a.a178=10152,a.a179=10153,a.a193=10154,a.a180=10155,a.a199=10156,a.a181=10157,a.a200=10158,a.a182=10159,a.a201=10161,a.a183=10162,a.a184=10163,a.a197=10164,a.a185=10165,a.a194=10166,a.a198=10167,a.a186=10168,a.a195=10169,a.a187=10170,a.a188=10171,a.a189=10172,a.a190=10173,a.a191=10174,a.a89=10088,// 0xF8D7
a.a90=10089,// 0xF8D8
a.a93=10090,// 0xF8D9
a.a94=10091,// 0xF8DA
a.a91=10092,// 0xF8DB
a.a92=10093,// 0xF8DC
a.a205=10094,// 0xF8DD
a.a85=10095,// 0xF8DE
a.a206=10096,// 0xF8DF
a.a86=10097,// 0xF8E0
a.a87=10098,// 0xF8E1
a.a88=10099,// 0xF8E2
a.a95=10100,// 0xF8E3
a.a96=10101,// 0xF8E4
a[".notdef"]=0});a.getGlyphsUnicode=d,a.getDingbatsGlyphsUnicode=e}),function(a,b){b(a.pdfjsCoreJbig2={},a.pdfjsSharedUtil,a.pdfjsCoreArithmeticDecoder)}(this,function(a,b,c){var d=b.error,e=b.log2,f=b.readInt8,g=b.readUint16,h=b.readUint32,i=b.shadow,j=c.ArithmeticDecoder,k=function(){
// Utility data structures
function a(){}function b(a,b,c){this.data=a,this.start=b,this.end=c}
// Annex A. Arithmetic Integer Decoding Procedure
// A.2 Procedure for decoding values
function c(a,b,c){function d(a){for(var b=0,d=0;a>d;d++){var g=c.readBit(e,f);f=256>f?f<<1|g:511&(f<<1|g)|256,b=b<<1|g}return b>>>0}var e=a.getContexts(b),f=1,g=d(1),h=d(1)?d(1)?d(1)?d(1)?d(1)?d(32)+4436:d(12)+340:d(8)+84:d(6)+20:d(4)+4:d(2);return 0===g?h:h>0?-h:null}
// A.3 The IAID decoding procedure
function k(a,b,c){for(var d=a.getContexts("IAID"),e=1,f=0;c>f;f++){var g=b.readBit(d,e);e=e<<1|g}return 31>c?e&(1<<c)-1:2147483647&e}function l(a,b,c){var d,e,f,g,h,i,j,k=c.decoder,l=c.contextCache.getContexts("GB"),m=[],n=31735;// 01111 0111111 0111
for(e=0;b>e;e++)for(h=m[e]=new Uint8Array(a),i=1>e?h:m[e-1],j=2>e?h:m[e-2],d=j[0]<<13|j[1]<<12|j[2]<<11|i[0]<<7|i[1]<<6|i[2]<<5|i[3]<<4,f=0;a>f;f++)h[f]=g=k.readBit(l,d),
// At each pixel: Clear contextLabel pixels that are shifted
// out of the context, then add new ones.
d=(d&n)<<1|(a>f+3?j[f+3]<<11:0)|(a>f+4?i[f+4]<<4:0)|g;return m}
// 6.2 Generic Region Decoding Procedure
function m(a,b,c,e,f,g,h,i){
// Use optimized version for the most common case
if(a&&d("JBIG2 error: MMR encoding is not supported"),0===e&&!g&&!f&&4===h.length&&3===h[0].x&&-1===h[0].y&&-3===h[1].x&&-1===h[1].y&&2===h[2].x&&-2===h[2].y&&-2===h[3].x&&-2===h[3].y)return l(b,c,i);var j=!!g,k=z[e].concat(h);
// Sorting is non-standard, and it is not required. But sorting increases
// the number of template bits that can be reused from the previous
// contextLabel in the main loop.
k.sort(function(a,b){return a.y-b.y||a.x-b.x});var m,n,o=k.length,p=new Int8Array(o),q=new Int8Array(o),r=[],s=0,t=0,u=0,v=0;for(n=0;o>n;n++)p[n]=k[n].x,q[n]=k[n].y,t=Math.min(t,k[n].x),u=Math.max(u,k[n].x),v=Math.min(v,k[n].y),o-1>n&&k[n].y===k[n+1].y&&k[n].x===k[n+1].x-1?s|=1<<o-1-n:r.push(n);var w=r.length,x=new Int8Array(w),y=new Int8Array(w),A=new Uint16Array(w);for(m=0;w>m;m++)n=r[m],x[m]=k[n].x,y[m]=k[n].y,A[m]=1<<o-1-n;for(var C,D,E,F,G,H=-t,I=-v,J=b-u,K=B[e],L=new Uint8Array(b),M=[],N=i.decoder,O=i.contextCache.getContexts("GB"),P=0,Q=0,R=0;c>R;R++){if(f){var S=N.readBit(O,K);if(P^=S){M.push(L);// duplicate previous row
continue}}for(L=new Uint8Array(L),M.push(L),C=0;b>C;C++)if(j&&g[R][C])L[C]=0;else{
// Are we in the middle of a scanline, so we can reuse contextLabel
// bits?
if(C>=H&&J>C&&R>=I)for(Q=Q<<1&s,n=0;w>n;n++)D=R+y[n],E=C+x[n],F=M[D][E],F&&(F=A[n],Q|=F);else for(Q=0,G=o-1,n=0;o>n;n++,G--)E=C+p[n],E>=0&&b>E&&(D=R+q[n],D>=0&&(F=M[D][E],F&&(Q|=F<<G)));var T=N.readBit(O,Q);L[C]=T}}return M}
// 6.3.2 Generic Refinement Region Decoding Procedure
function n(a,b,c,e,f,g,h,i,j){var k=A[c].coding;0===c&&(k=k.concat([i[0]]));var l,m=k.length,n=new Int32Array(m),o=new Int32Array(m);for(l=0;m>l;l++)n[l]=k[l].x,o[l]=k[l].y;var p=A[c].reference;0===c&&(p=p.concat([i[1]]));var q=p.length,r=new Int32Array(q),s=new Int32Array(q);for(l=0;q>l;l++)r[l]=p[l].x,s[l]=p[l].y;for(var t=e[0].length,u=e.length,v=C[c],w=[],x=j.decoder,y=j.contextCache.getContexts("GR"),z=0,B=0;b>B;B++){if(h){var D=x.readBit(y,v);z^=D,z&&d("JBIG2 error: prediction is not supported")}var E=new Uint8Array(a);w.push(E);for(var F=0;a>F;F++){var G,H,I=0;for(l=0;m>l;l++)G=B+o[l],H=F+n[l],0>G||0>H||H>=a?I<<=1:I=I<<1|w[G][H];for(l=0;q>l;l++)G=B+s[l]+g,H=F+r[l]+f,0>G||G>=u||0>H||H>=t?I<<=1:I=I<<1|e[G][H];var J=x.readBit(y,I);E[F]=J}}return w}
// 6.5.5 Decoding the symbol dictionary
function o(a,b,f,g,h,i,j,l,o,q,r){a&&d("JBIG2 error: huffman is not supported");for(var s=[],t=0,u=e(f.length+g),v=r.decoder,w=r.contextCache;s.length<g;){var x=c(w,"IADH",v);// 6.5.6
t+=x;for(var y=0,z=0;;){var A=c(w,"IADW",v);// 6.5.7
if(null===A)break;y+=A,z+=y;var B;if(b){
// 6.5.8.2 Refinement/aggregate-coded symbol bitmap
var C=c(w,"IAAI",v);if(C>1)B=p(a,b,y,t,0,C,1,//strip size
f.concat(s),u,0,//transposed
0,//ds offset
1,//top left 7.4.3.1.1
0,//OR operator
i,o,q,r);else{var D=k(w,v,u),E=c(w,"IARDX",v),F=c(w,"IARDY",v),G=D<f.length?f[D]:s[D-f.length];B=n(y,t,o,G,E,F,!1,q,r)}}else
// 6.5.8.1 Direct-coded symbol bitmap
B=m(!1,y,t,j,!1,null,l,r);s.push(B)}}for(
// 6.5.10 Exported symbols
var H=[],I=[],J=!1,K=f.length+g;I.length<K;){for(var L=c(w,"IAEX",v);L--;)I.push(J);J=!J}for(var M=0,N=f.length;N>M;M++)I[M]&&H.push(f[M]);for(var O=0;g>O;M++,O++)I[M]&&H.push(s[O]);return H}function p(a,b,e,f,g,h,i,j,l,m,o,p,q,r,s,t,u){a&&d("JBIG2 error: huffman is not supported");
// Prepare bitmap
var v,w,x=[];for(v=0;f>v;v++){if(w=new Uint8Array(e),g)for(var y=0;e>y;y++)w[y]=g;x.push(w)}var z=u.decoder,A=u.contextCache,B=-c(A,"IADT",z),C=0;for(v=0;h>v;){var D=c(A,"IADT",z);// 6.4.6
B+=D;var E=c(A,"IAFS",z);// 6.4.7
C+=E;for(var F=C;;){var G=1===i?0:c(A,"IAIT",z),H=i*B+G,I=k(A,z,l),J=b&&c(A,"IARI",z),K=j[I],L=K[0].length,M=K.length;if(J){var N=c(A,"IARDW",z),O=c(A,"IARDH",z),P=c(A,"IARDX",z),Q=c(A,"IARDY",z);// 6.4.11.4
L+=N,M+=O,K=n(L,M,s,K,(N>>1)+P,(O>>1)+Q,!1,t,u)}var R,S,T,U=H-(1&p?0:M),V=F-(2&p?L:0);if(m){
// Place Symbol Bitmap from T1,S1
for(R=0;M>R;R++)if(w=x[V+R]){T=K[R];
// To ignore Parts of Symbol bitmap which goes
// outside bitmap region
var W=Math.min(e-U,L);switch(q){case 0:// OR
for(S=0;W>S;S++)w[U+S]|=T[S];break;case 2:// XOR
for(S=0;W>S;S++)w[U+S]^=T[S];break;default:d("JBIG2 error: operator "+q+" is not supported")}}F+=M-1}else{for(S=0;M>S;S++)if(w=x[U+S])switch(T=K[S],q){case 0:// OR
for(R=0;L>R;R++)w[V+R]|=T[R];break;case 2:// XOR
for(R=0;L>R;R++)w[V+R]^=T[R];break;default:d("JBIG2 error: operator "+q+" is not supported")}F+=L-1}v++;var X=c(A,"IADS",z);// 6.4.8
if(null===X)break;F+=X+o}}return x}function q(a,b){var c={};c.number=h(a,b);var e=a[b+4],f=63&e;y[f]||d("JBIG2 error: invalid segment type: "+f),c.type=f,c.typeName=y[f],c.deferredNonRetain=!!(128&e);var i=!!(64&e),j=a[b+5],k=j>>5&7,l=[31&j],m=b+6;if(7===j){k=536870911&h(a,m-1),m+=3;var n=k+7>>3;for(l[0]=a[m++];--n>0;)l.push(a[m++])}else 5!==j&&6!==j||d("JBIG2 error: invalid referred-to flags");c.retainBits=l;var o,p,q=c.number<=256?1:c.number<=65536?2:4,r=[];for(o=0;k>o;o++){var t=1===q?a[m]:2===q?g(a,m):h(a,m);r.push(t),m+=q}if(c.referredTo=r,i?(c.pageAssociation=h(a,m),m+=4):c.pageAssociation=a[m++],c.length=h(a,m),m+=4,4294967295===c.length)
// 7.2.7 Segment data length, unknown segment length
if(38===f){// ImmediateGenericRegion
var u=s(a,m),v=a[m+D],w=!!(1&v),x=6,z=new Uint8Array(x);for(w||(z[0]=255,z[1]=172),z[2]=u.height>>>24&255,z[3]=u.height>>16&255,z[4]=u.height>>8&255,z[5]=255&u.height,o=m,p=a.length;p>o;o++){for(var A=0;x>A&&z[A]===a[o+A];)A++;if(A===x){c.length=o+x;break}}4294967295===c.length&&d("JBIG2 error: segment end was not found")}else d("JBIG2 error: invalid unknown segment length");return c.headerEnd=m,c}function r(a,b,c,d){for(var e=[],f=c;d>f;){var g=q(b,f);f=g.headerEnd;var h={header:g,data:b};if(a.randomAccess||(h.start=f,f+=g.length,h.end=f),e.push(h),51===g.type)break}if(a.randomAccess)for(var i=0,j=e.length;j>i;i++)e[i].start=f,f+=e[i].header.length,e[i].end=f;return e}
// 7.4.1 Region segment information field
function s(a,b){return{width:h(a,b),height:h(a,b+4),x:h(a,b+8),y:h(a,b+12),combinationOperator:7&a[b+16]}}function t(a,b){var c,e,i,j,k=a.header,l=a.data,m=a.start,n=a.end;switch(k.type){case 0:// SymbolDictionary
// 7.4.2 Symbol dictionary segment syntax
var o={},p=g(l,m);if(// 7.4.2.1.1
o.huffman=!!(1&p),o.refinement=!!(2&p),o.huffmanDHSelector=p>>2&3,o.huffmanDWSelector=p>>4&3,o.bitmapSizeSelector=p>>6&1,o.aggregationInstancesSelector=p>>7&1,o.bitmapCodingContextUsed=!!(256&p),o.bitmapCodingContextRetained=!!(512&p),o.template=p>>10&3,o.refinementTemplate=p>>12&1,m+=2,!o.huffman){for(j=0===o.template?4:1,e=[],i=0;j>i;i++)e.push({x:f(l,m),y:f(l,m+1)}),m+=2;o.at=e}if(o.refinement&&!o.refinementTemplate){for(e=[],i=0;2>i;i++)e.push({x:f(l,m),y:f(l,m+1)}),m+=2;o.refinementAt=e}o.numberOfExportedSymbols=h(l,m),m+=4,o.numberOfNewSymbols=h(l,m),m+=4,c=[o,k.number,k.referredTo,l,m,n];break;case 6:// ImmediateTextRegion
case 7:// ImmediateLosslessTextRegion
var q={};q.info=s(l,m),m+=D;var r=g(l,m);if(m+=2,q.huffman=!!(1&r),q.refinement=!!(2&r),q.stripSize=1<<(r>>2&3),q.referenceCorner=r>>4&3,q.transposed=!!(64&r),q.combinationOperator=r>>7&3,q.defaultPixelValue=r>>9&1,q.dsOffset=r<<17>>27,q.refinementTemplate=r>>15&1,q.huffman){var t=g(l,m);m+=2,q.huffmanFS=3&t,q.huffmanDS=t>>2&3,q.huffmanDT=t>>4&3,q.huffmanRefinementDW=t>>6&3,q.huffmanRefinementDH=t>>8&3,q.huffmanRefinementDX=t>>10&3,q.huffmanRefinementDY=t>>12&3,q.huffmanRefinementSizeSelector=!!(14&t)}if(q.refinement&&!q.refinementTemplate){for(e=[],i=0;2>i;i++)e.push({x:f(l,m),y:f(l,m+1)}),m+=2;q.refinementAt=e}q.numberOfSymbolInstances=h(l,m),m+=4,
// TODO 7.4.3.1.7 Symbol ID Huffman table decoding
q.huffman&&d("JBIG2 error: huffman is not supported"),c=[q,k.referredTo,l,m,n];break;case 38:// ImmediateGenericRegion
case 39:// ImmediateLosslessGenericRegion
var u={};u.info=s(l,m),m+=D;var v=l[m++];if(u.mmr=!!(1&v),u.template=v>>1&3,u.prediction=!!(8&v),!u.mmr){for(j=0===u.template?4:1,e=[],i=0;j>i;i++)e.push({x:f(l,m),y:f(l,m+1)}),m+=2;u.at=e}c=[u,l,m,n];break;case 48:// PageInformation
var w={width:h(l,m),height:h(l,m+4),resolutionX:h(l,m+8),resolutionY:h(l,m+12)};4294967295===w.height&&delete w.height;var x=l[m+16];g(l,m+17);w.lossless=!!(1&x),w.refinement=!!(2&x),w.defaultPixelValue=x>>2&1,w.combinationOperator=x>>3&3,w.requiresBuffer=!!(32&x),w.combinationOperatorOverride=!!(64&x),c=[w];break;case 49:// EndOfPage
break;case 50:// EndOfStripe
break;case 51:// EndOfFile
break;case 62:// 7.4.15 defines 2 extension types which
// are comments and can be ignored.
break;default:d("JBIG2 error: segment type "+k.typeName+"("+k.type+") is not implemented")}var y="on"+k.typeName;y in b&&b[y].apply(b,c)}function u(a,b){for(var c=0,d=a.length;d>c;c++)t(a[c],b)}function v(a){for(var b=new w,c=0,d=a.length;d>c;c++){var e=a[c],f=r({},e.data,e.start,e.end);u(f,b)}return b.buffer}function w(){}function x(){}a.prototype={getContexts:function(a){return a in this?this[a]:this[a]=new Int8Array(65536)}},b.prototype={get decoder(){var a=new j(this.data,this.start,this.end);return i(this,"decoder",a)},get contextCache(){var b=new a;return i(this,"contextCache",b)}};
// 7.3 Segment types
var y=["SymbolDictionary",null,null,null,"IntermediateTextRegion",null,"ImmediateTextRegion","ImmediateLosslessTextRegion",null,null,null,null,null,null,null,null,"patternDictionary",null,null,null,"IntermediateHalftoneRegion",null,"ImmediateHalftoneRegion","ImmediateLosslessHalftoneRegion",null,null,null,null,null,null,null,null,null,null,null,null,"IntermediateGenericRegion",null,"ImmediateGenericRegion","ImmediateLosslessGenericRegion","IntermediateGenericRefinementRegion",null,"ImmediateGenericRefinementRegion","ImmediateLosslessGenericRefinementRegion",null,null,null,null,"PageInformation","EndOfPage","EndOfStripe","EndOfFile","Profiles","Tables",null,null,null,null,null,null,null,null,"Extension"],z=[[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-2,y:0},{x:-1,y:0}],[{x:-3,y:-1},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}]],A=[{coding:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}]},{coding:[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]}],B=[39717,// 10011 0110010 0101
1941,// 0011 110010 101
229,// 001 11001 01
405],C=[32,// '000' + '0' (coding) + '00010000' + '0' (reference)
8],D=17;return w.prototype={onPageInformation:function(a){this.currentPageInfo=a;var b=a.width+7>>3,c=new Uint8Array(b*a.height);
// The contents of ArrayBuffers are initialized to 0.
// Fill the buffer with 0xFF only if info.defaultPixelValue is set
if(a.defaultPixelValue)for(var d=0,e=c.length;e>d;d++)c[d]=255;this.buffer=c},drawBitmap:function(a,b){var c,e,f,g,h=this.currentPageInfo,i=a.width,j=a.height,k=h.width+7>>3,l=h.combinationOperatorOverride?a.combinationOperator:h.combinationOperator,m=this.buffer,n=128>>(7&a.x),o=a.y*k+(a.x>>3);switch(l){case 0:// OR
for(c=0;j>c;c++){for(f=n,g=o,e=0;i>e;e++)b[c][e]&&(m[g]|=f),f>>=1,f||(f=128,g++);o+=k}break;case 2:// XOR
for(c=0;j>c;c++){for(f=n,g=o,e=0;i>e;e++)b[c][e]&&(m[g]^=f),f>>=1,f||(f=128,g++);o+=k}break;default:d("JBIG2 error: operator "+l+" is not supported")}},onImmediateGenericRegion:function(a,c,d,e){var f=a.info,g=new b(c,d,e),h=m(a.mmr,f.width,f.height,a.template,a.prediction,null,a.at,g);this.drawBitmap(f,h)},onImmediateLosslessGenericRegion:function(){this.onImmediateGenericRegion.apply(this,arguments)},onSymbolDictionary:function(a,c,e,f,g,h){var i;a.huffman&&d("JBIG2 error: huffman is not supported");
// Combines exported symbols from all referred segments
var j=this.symbols;j||(this.symbols=j={});for(var k=[],l=0,m=e.length;m>l;l++)k=k.concat(j[e[l]]);var n=new b(f,g,h);j[c]=o(a.huffman,a.refinement,k,a.numberOfNewSymbols,a.numberOfExportedSymbols,i,a.template,a.at,a.refinementTemplate,a.refinementAt,n)},onImmediateTextRegion:function(a,c,d,f,g){for(var h,i=a.info,j=this.symbols,k=[],l=0,m=c.length;m>l;l++)k=k.concat(j[c[l]]);var n=e(k.length),o=new b(d,f,g),q=p(a.huffman,a.refinement,i.width,i.height,a.defaultPixelValue,a.numberOfSymbolInstances,a.stripSize,k,n,a.transposed,a.dsOffset,a.referenceCorner,a.combinationOperator,h,a.refinementTemplate,a.refinementAt,o);this.drawBitmap(i,q)},onImmediateLosslessTextRegion:function(){this.onImmediateTextRegion.apply(this,arguments)}},x.prototype={parseChunks:function(a){return v(a)}},x}();a.Jbig2Image=k}),function(a,b){b(a.pdfjsCoreJpx={},a.pdfjsSharedUtil,a.pdfjsCoreArithmeticDecoder)}(this,function(a,b,c){var d=b.info,e=b.log2,f=b.readUint16,g=b.readUint32,h=b.warn,i=c.ArithmeticDecoder,j=function(){function a(){this.failOnCorruptedImage=!1}function b(a,b){
// Section B.2 Component mapping
a.x0=Math.ceil(b.XOsiz/a.XRsiz),a.x1=Math.ceil(b.Xsiz/a.XRsiz),a.y0=Math.ceil(b.YOsiz/a.YRsiz),a.y1=Math.ceil(b.Ysiz/a.YRsiz),a.width=a.x1-a.x0,a.height=a.y1-a.y0}function c(a,b){for(var c,d=a.SIZ,e=[],f=Math.ceil((d.Xsiz-d.XTOsiz)/d.XTsiz),g=Math.ceil((d.Ysiz-d.YTOsiz)/d.YTsiz),h=0;g>h;h++)for(var i=0;f>i;i++)c={},c.tx0=Math.max(d.XTOsiz+i*d.XTsiz,d.XOsiz),c.ty0=Math.max(d.YTOsiz+h*d.YTsiz,d.YOsiz),c.tx1=Math.min(d.XTOsiz+(i+1)*d.XTsiz,d.Xsiz),c.ty1=Math.min(d.YTOsiz+(h+1)*d.YTsiz,d.Ysiz),c.width=c.tx1-c.tx0,c.height=c.ty1-c.ty0,c.components=[],e.push(c);a.tiles=e;for(var j=d.Csiz,k=0,l=j;l>k;k++)for(var m=b[k],n=0,o=e.length;o>n;n++){var p={};c=e[n],p.tcx0=Math.ceil(c.tx0/m.XRsiz),p.tcy0=Math.ceil(c.ty0/m.YRsiz),p.tcx1=Math.ceil(c.tx1/m.XRsiz),p.tcy1=Math.ceil(c.ty1/m.YRsiz),p.width=p.tcx1-p.tcx0,p.height=p.tcy1-p.tcy0,c.components[k]=p}}function j(a,b,c){var d=b.codingStyleParameters,e={};
// calculate codeblock size as described in section B.7
return d.entropyCoderWithCustomPrecincts?(e.PPx=d.precinctsSizes[c].PPx,e.PPy=d.precinctsSizes[c].PPy):(e.PPx=15,e.PPy=15),e.xcb_=c>0?Math.min(d.xcb,e.PPx-1):Math.min(d.xcb,e.PPx),e.ycb_=c>0?Math.min(d.ycb,e.PPy-1):Math.min(d.ycb,e.PPy),e}function k(a,b,c){
// Section B.6 Division resolution to precincts
var d=1<<c.PPx,e=1<<c.PPy,f=0===b.resLevel,g=1<<c.PPx+(f?0:-1),h=1<<c.PPy+(f?0:-1),i=b.trx1>b.trx0?Math.ceil(b.trx1/d)-Math.floor(b.trx0/d):0,j=b.try1>b.try0?Math.ceil(b.try1/e)-Math.floor(b.try0/e):0,k=i*j;b.precinctParameters={precinctWidth:d,precinctHeight:e,numprecinctswide:i,numprecinctshigh:j,numprecincts:k,precinctWidthInSubband:g,precinctHeightInSubband:h}}function l(a,b,c){
// Section B.7 Division sub-band into code-blocks
var d,e,f,g,h=c.xcb_,i=c.ycb_,j=1<<h,k=1<<i,l=b.tbx0>>h,m=b.tby0>>i,n=b.tbx1+j-1>>h,o=b.tby1+k-1>>i,p=b.resolution.precinctParameters,q=[],r=[];for(e=m;o>e;e++)for(d=l;n>d;d++){f={cbx:d,cby:e,tbx0:j*d,tby0:k*e,tbx1:j*(d+1),tby1:k*(e+1)},f.tbx0_=Math.max(b.tbx0,f.tbx0),f.tby0_=Math.max(b.tby0,f.tby0),f.tbx1_=Math.min(b.tbx1,f.tbx1),f.tby1_=Math.min(b.tby1,f.tby1);
// Calculate precinct number for this codeblock, codeblock position
// should be relative to its subband, use actual dimension and position
// See comment about codeblock group width and height
var s=Math.floor((f.tbx0_-b.tbx0)/p.precinctWidthInSubband),t=Math.floor((f.tby0_-b.tby0)/p.precinctHeightInSubband);if(g=s+t*p.numprecinctswide,f.precinctNumber=g,f.subbandType=b.type,f.Lblock=3,!(f.tbx1_<=f.tbx0_||f.tby1_<=f.tby0_)){q.push(f);
// building precinct for the sub-band
var u=r[g];void 0!==u?(d<u.cbxMin?u.cbxMin=d:d>u.cbxMax&&(u.cbxMax=d),e<u.cbyMin?u.cbxMin=e:e>u.cbyMax&&(u.cbyMax=e)):r[g]=u={cbxMin:d,cbyMin:e,cbxMax:d,cbyMax:e},f.precinct=u}}b.codeblockParameters={codeblockWidth:h,codeblockHeight:i,numcodeblockwide:n-l+1,numcodeblockhigh:o-m+1},b.codeblocks=q,b.precincts=r}function m(a,b,c){
// sub-bands already ordered in 'LL', 'HL', 'LH', and 'HH' sequence
for(var d=[],e=a.subbands,f=0,g=e.length;g>f;f++)for(var h=e[f],i=h.codeblocks,j=0,k=i.length;k>j;j++){var l=i[j];l.precinctNumber===b&&d.push(l)}return{layerNumber:c,codeblocks:d}}function n(a){for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=0,h=0;f>h;h++)g=Math.max(g,d.components[h].codingStyleParameters.decompositionLevelsCount);var i=0,j=0,k=0,l=0;this.nextPacket=function(){
// Section B.12.1.1 Layer-resolution-component-position
for(;e>i;i++){for(;g>=j;j++){for(;f>k;k++){var a=d.components[k];if(!(j>a.codingStyleParameters.decompositionLevelsCount)){for(var b=a.resolutions[j],c=b.precinctParameters.numprecincts;c>l;){var h=m(b,l,i);return l++,h}l=0}}k=0}j=0}throw new Error("JPX Error: Out of packets")}}function o(a){for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=0,h=0;f>h;h++)g=Math.max(g,d.components[h].codingStyleParameters.decompositionLevelsCount);var i=0,j=0,k=0,l=0;this.nextPacket=function(){
// Section B.12.1.2 Resolution-layer-component-position
for(;g>=i;i++){for(;e>j;j++){for(;f>k;k++){var a=d.components[k];if(!(i>a.codingStyleParameters.decompositionLevelsCount)){for(var b=a.resolutions[i],c=b.precinctParameters.numprecincts;c>l;){var h=m(b,l,j);return l++,h}l=0}}k=0}j=0}throw new Error("JPX Error: Out of packets")}}function p(a){var b,c,d,e,f=a.SIZ,g=a.currentTile.index,h=a.tiles[g],i=h.codingStyleDefaultParameters.layersCount,j=f.Csiz,k=0;for(d=0;j>d;d++){var l=h.components[d];k=Math.max(k,l.codingStyleParameters.decompositionLevelsCount)}var n=new Int32Array(k+1);for(c=0;k>=c;++c){var o=0;for(d=0;j>d;++d){var p=h.components[d].resolutions;c<p.length&&(o=Math.max(o,p[c].precinctParameters.numprecincts))}n[c]=o}b=0,c=0,d=0,e=0,this.nextPacket=function(){for(;k>=c;c++){for(;e<n[c];e++){for(;j>d;d++){var a=h.components[d];if(!(c>a.codingStyleParameters.decompositionLevelsCount)){var f=a.resolutions[c],g=f.precinctParameters.numprecincts;if(!(e>=g)){for(;i>b;){var l=m(f,e,b);return b++,l}b=0}}}d=0}e=0}throw new Error("JPX Error: Out of packets")}}function q(a){var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=t(d),h=g,i=0,j=0,k=0,l=0,n=0;this.nextPacket=function(){
// Section B.12.1.4 Position-component-resolution-layer
for(;n<h.maxNumHigh;n++){for(;l<h.maxNumWide;l++){for(;f>k;k++){for(var a=d.components[k],b=a.codingStyleParameters.decompositionLevelsCount;b>=j;j++){var c=a.resolutions[j],o=g.components[k].resolutions[j],p=s(l,n,o,h,c);if(null!==p){for(;e>i;){var q=m(c,p,i);return i++,q}i=0}}j=0}k=0}l=0}throw new Error("JPX Error: Out of packets")}}function r(a){var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,g=t(d),h=0,i=0,j=0,k=0,l=0;this.nextPacket=function(){
// Section B.12.1.5 Component-position-resolution-layer
for(;f>j;++j){for(var a=d.components[j],b=g.components[j],c=a.codingStyleParameters.decompositionLevelsCount;l<b.maxNumHigh;l++){for(;k<b.maxNumWide;k++){for(;c>=i;i++){var n=a.resolutions[i],o=b.resolutions[i],p=s(k,l,o,b,n);if(null!==p){for(;e>h;){var q=m(n,p,h);return h++,q}h=0}}i=0}k=0}l=0}throw new Error("JPX Error: Out of packets")}}function s(a,b,c,d,e){var f=a*d.minWidth,g=b*d.minHeight;if(f%c.width!==0||g%c.height!==0)return null;var h=g/c.width*e.precinctParameters.numprecinctswide;return f/c.height+h}function t(a){for(var b=a.components.length,c=Number.MAX_VALUE,d=Number.MAX_VALUE,e=0,f=0,g=new Array(b),h=0;b>h;h++){for(var i=a.components[h],j=i.codingStyleParameters.decompositionLevelsCount,k=new Array(j+1),l=Number.MAX_VALUE,m=Number.MAX_VALUE,n=0,o=0,p=1,q=j;q>=0;--q){var r=i.resolutions[q],s=p*r.precinctParameters.precinctWidth,t=p*r.precinctParameters.precinctHeight;l=Math.min(l,s),m=Math.min(m,t),n=Math.max(n,r.precinctParameters.numprecinctswide),o=Math.max(o,r.precinctParameters.numprecinctshigh),k[q]={width:s,height:t},p<<=1}c=Math.min(c,l),d=Math.min(d,m),e=Math.max(e,n),f=Math.max(f,o),g[h]={resolutions:k,minWidth:l,minHeight:m,maxNumWide:n,maxNumHigh:o}}return{components:g,minWidth:c,minHeight:d,maxNumWide:e,maxNumHigh:f}}function u(a){
// Creating resolutions and sub-bands for each component
for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=b.Csiz,f=0;e>f;f++){for(var g=d.components[f],h=g.codingStyleParameters.decompositionLevelsCount,i=[],m=[],s=0;h>=s;s++){var t=j(a,g,s),u={},v=1<<h-s;u.trx0=Math.ceil(g.tcx0/v),u.try0=Math.ceil(g.tcy0/v),u.trx1=Math.ceil(g.tcx1/v),u.try1=Math.ceil(g.tcy1/v),u.resLevel=s,k(a,u,t),i.push(u);var w;if(0===s)w={},w.type="LL",w.tbx0=Math.ceil(g.tcx0/v),w.tby0=Math.ceil(g.tcy0/v),w.tbx1=Math.ceil(g.tcx1/v),w.tby1=Math.ceil(g.tcy1/v),w.resolution=u,l(a,w,t),m.push(w),u.subbands=[w];else{var x=1<<h-s+1,y=[];
// three sub-bands (HL, LH and HH) with rest of decompositions
w={},w.type="HL",w.tbx0=Math.ceil(g.tcx0/x-.5),w.tby0=Math.ceil(g.tcy0/x),w.tbx1=Math.ceil(g.tcx1/x-.5),w.tby1=Math.ceil(g.tcy1/x),w.resolution=u,l(a,w,t),m.push(w),y.push(w),w={},w.type="LH",w.tbx0=Math.ceil(g.tcx0/x),w.tby0=Math.ceil(g.tcy0/x-.5),w.tbx1=Math.ceil(g.tcx1/x),w.tby1=Math.ceil(g.tcy1/x-.5),w.resolution=u,l(a,w,t),m.push(w),y.push(w),w={},w.type="HH",w.tbx0=Math.ceil(g.tcx0/x-.5),w.tby0=Math.ceil(g.tcy0/x-.5),w.tbx1=Math.ceil(g.tcx1/x-.5),w.tby1=Math.ceil(g.tcy1/x-.5),w.resolution=u,l(a,w,t),m.push(w),y.push(w),u.subbands=y}}g.resolutions=i,g.subbands=m}
// Generate the packets sequence
var z=d.codingStyleDefaultParameters.progressionOrder;switch(z){case 0:d.packetsIterator=new n(a);break;case 1:d.packetsIterator=new o(a);break;case 2:d.packetsIterator=new p(a);break;case 3:d.packetsIterator=new q(a);break;case 4:d.packetsIterator=new r(a);break;default:throw new Error("JPX Error: Unsupported progression order "+z)}}function v(a,b,c,d){function f(a){for(;a>m;){var d=b[c+l];l++,n?(k=k<<7|d,m+=7,n=!1):(k=k<<8|d,m+=8),255===d&&(n=!0)}return m-=a,k>>>m&(1<<a)-1}function g(a){return 255===b[c+l-1]&&b[c+l]===a?(h(1),!0):255===b[c+l]&&b[c+l+1]===a?(h(2),!0):!1}function h(a){l+=a}function i(){m=0,n&&(l++,n=!1)}function j(){if(0===f(1))return 1;if(0===f(1))return 2;var a=f(2);return 3>a?a+3:(a=f(5),31>a?a+6:(a=f(7),a+37))}for(var k,l=0,m=0,n=!1,o=a.currentTile.index,p=a.tiles[o],q=a.COD.sopMarkerUsed,r=a.COD.ephMarkerUsed,s=p.packetsIterator;d>l;){i(),q&&g(145)&&
// Skip also marker segment length and packet sequence ID
h(4);var t=s.nextPacket();if(f(1)){for(var u,v=t.layerNumber,w=[],x=0,y=t.codeblocks.length;y>x;x++){u=t.codeblocks[x];var z,A=u.precinct,D=u.cbx-A.cbxMin,E=u.cby-A.cbyMin,F=!1,G=!1;if(void 0!==u.included)F=!!f(1);else{
// reading inclusion tree
A=u.precinct;var H,I;if(void 0!==A.inclusionTree)H=A.inclusionTree;else{
// building inclusion and zero bit-planes trees
var J=A.cbxMax-A.cbxMin+1,K=A.cbyMax-A.cbyMin+1;H=new C(J,K,v),I=new B(J,K),A.inclusionTree=H,A.zeroBitPlanesTree=I}if(H.reset(D,E,v))for(;;){if(!f(1)){H.incrementValue(v);break}if(z=!H.nextLevel()){u.included=!0,F=G=!0;break}}}if(F){if(G){for(I=A.zeroBitPlanesTree,I.reset(D,E);;)if(f(1)){if(z=!I.nextLevel())break}else I.incrementValue();u.zeroBitPlanes=I.value}for(var L=j();f(1);)u.Lblock++;var M=e(L),N=(1<<M>L?M-1:M)+u.Lblock,O=f(N);w.push({codeblock:u,codingpasses:L,dataLength:O})}}for(i(),r&&g(146);w.length>0;){var P=w.shift();u=P.codeblock,void 0===u.data&&(u.data=[]),u.data.push({data:b,start:c+l,end:c+l+P.dataLength,codingpasses:P.codingpasses}),l+=P.dataLength}}}return l}function w(a,b,c,d,e,f,g,h){for(var j=d.tbx0,k=d.tby0,l=d.tbx1-d.tbx0,m=d.codeblocks,n="H"===d.type.charAt(0)?1:0,o="H"===d.type.charAt(1)?b:0,p=0,q=m.length;q>p;++p){var r=m[p],s=r.tbx1_-r.tbx0_,t=r.tby1_-r.tby0_;if(0!==s&&0!==t&&void 0!==r.data){var u,v;u=new D(s,t,r.subbandType,r.zeroBitPlanes,f),v=2;// first bit plane starts from cleanup
// collect data
var w,x,y,z=r.data,A=0,B=0;for(w=0,x=z.length;x>w;w++)y=z[w],A+=y.end-y.start,B+=y.codingpasses;var C=new Uint8Array(A),E=0;for(w=0,x=z.length;x>w;w++){y=z[w];var F=y.data.subarray(y.start,y.end);C.set(F,E),E+=F.length}
// decoding the item
var G=new i(C,0,A);for(u.setDecoder(G),w=0;B>w;w++){switch(v){case 0:u.runSignificancePropagationPass();break;case 1:u.runMagnitudeRefinementPass();break;case 2:u.runCleanupPass(),h&&u.checkSegmentationSymbol()}v=(v+1)%3}var H,I,J,K=r.tbx0_-j+(r.tby0_-k)*l,L=u.coefficentsSign,M=u.coefficentsMagnitude,N=u.bitsDecoded,O=g?0:.5;E=0;
// Do the interleaving of Section F.3.3 here, so we do not need
// to copy later. LL level is not interleaved, just copied.
var P="LL"!==d.type;for(w=0;t>w;w++){var Q=K/l|0,R=2*Q*(b-l)+n+o;for(H=0;s>H;H++){if(I=M[E],0!==I){I=(I+O)*e,0!==L[E]&&(I=-I),J=N[E];var S=P?R+(K<<1):K;g&&J>=f?a[S]=I:a[S]=I*(1<<f-J)}K++,E++}K+=l-s}}}}function x(a,b,c){for(var d=b.components[c],e=d.codingStyleParameters,f=d.quantizationParameters,g=e.decompositionLevelsCount,h=f.SPqcds,i=f.scalarExpounded,j=f.guardBits,k=e.segmentationSymbolUsed,l=a.components[c].precision,m=e.reversibleTransformation,n=m?new G:new F,o=[],p=0,q=0;g>=q;q++){for(var r=d.resolutions[q],s=r.trx1-r.trx0,t=r.try1-r.try0,u=new Float32Array(s*t),v=0,x=r.subbands.length;x>v;v++){var y,z;i?(y=h[p].mu,z=h[p].epsilon,p++):(y=h[0].mu,z=h[0].epsilon+(q>0?1-q:0));var B=r.subbands[v],C=A[B.type],D=m?1:Math.pow(2,l+C-z)*(1+y/2048),E=j+z-1;
// In the first resolution level, copyCoefficients will fill the
// whole array with coefficients. In the succeding passes,
// copyCoefficients will consecutively fill in the values that belong
// to the interleaved positions of the HL, LH, and HH coefficients.
// The LL coefficients will then be interleaved in Transform.iterate().
w(u,s,t,B,D,E,m,k)}o.push({width:s,height:t,items:u})}var H=n.calculate(o,d.tcx0,d.tcy0);return{left:d.tcx0,top:d.tcy0,width:H.width,height:H.height,items:H.items}}function y(a){for(var b=a.SIZ,c=a.components,d=b.Csiz,e=[],f=0,g=a.tiles.length;g>f;f++){var h,i=a.tiles[f],j=[];for(h=0;d>h;h++)j[h]=x(a,i,h);var k,l,m,n,o,p,q,r,s,t,u,v,w,y,z,A=j[0],B=new Uint8Array(A.items.length*d),C={left:A.left,top:A.top,width:A.width,height:A.height,items:B},D=0;if(i.codingStyleDefaultParameters.multipleComponentTransform){var E=4===d,F=j[0].items,G=j[1].items,H=j[2].items,I=E?j[3].items:null;
// HACK: The multiple component transform formulas below assume that
// all components have the same precision. With this in mind, we
// compute shift and offset only once.
k=c[0].precision-8,l=(128<<k)+.5,m=255*(1<<k),o=.5*m,n=-o;var J=i.components[0],K=d-3;if(q=F.length,J.codingStyleParameters.reversibleTransformation)
// inverse reversible multiple component transform
for(p=0;q>p;p++,D+=K)r=F[p]+l,s=G[p],t=H[p],v=r-(t+s>>2),u=v+t,w=v+s,B[D++]=0>=u?0:u>=m?255:u>>k,B[D++]=0>=v?0:v>=m?255:v>>k,B[D++]=0>=w?0:w>=m?255:w>>k;else
// inverse irreversible multiple component transform
for(p=0;q>p;p++,D+=K)r=F[p]+l,s=G[p],t=H[p],u=r+1.402*t,v=r-.34413*s-.71414*t,w=r+1.772*s,B[D++]=0>=u?0:u>=m?255:u>>k,B[D++]=0>=v?0:v>=m?255:v>>k,B[D++]=0>=w?0:w>=m?255:w>>k;if(E)for(p=0,D=3;q>p;p++,D+=4)y=I[p],B[D]=n>=y?0:y>=o?255:y+l>>k}else// no multi-component transform
for(h=0;d>h;h++){var L=j[h].items;for(k=c[h].precision-8,l=(128<<k)+.5,m=127.5*(1<<k),n=-m,D=h,p=0,q=L.length;q>p;p++)z=L[p],B[D]=n>=z?0:z>=m?255:z+l>>k,D+=d}e.push(C)}return e}function z(a,b){for(var c=a.SIZ,d=c.Csiz,e=a.tiles[b],f=0;d>f;f++){var g=e.components[f],h=void 0!==a.currentTile.QCC[f]?a.currentTile.QCC[f]:a.currentTile.QCD;g.quantizationParameters=h;var i=void 0!==a.currentTile.COC[f]?a.currentTile.COC[f]:a.currentTile.COD;g.codingStyleParameters=i}e.codingStyleDefaultParameters=a.currentTile.COD}
// Table E.1
var A={LL:0,LH:1,HL:1,HH:2};a.prototype={parse:function(a){var b=f(a,0);
// No box header, immediate start of codestream (SOC)
if(65359===b)return void this.parseCodestream(a,0,a.length);for(var c=0,e=a.length;e>c;){var i=8,j=g(a,c),k=g(a,c+4);if(c+=i,1===j&&(j=4294967296*g(a,c)+g(a,c+4),c+=8,i+=8),0===j&&(j=e-c+i),i>j)throw new Error("JPX Error: Invalid box field size");var l=j-i,m=!0;switch(k){case 1785737832:// 'jp2h'
m=!1;// parsing child boxes
break;case 1668246642:// 'colr'
// Colorspaces are not used, the CS from the PDF is used.
var n=a[c];if(1===n){
// enumerated colorspace
var o=g(a,c+3);switch(o){case 16:// this indicates a sRGB colorspace
case 17:// this indicates a grayscale colorspace
case 18:// this indicates a YUV colorspace
break;default:h("Unknown colorspace "+o)}}else 2===n&&d("ICC profile not supported");break;case 1785737827:// 'jp2c'
this.parseCodestream(a,c,c+l);break;case 1783636e3:// 'jP\024\024'
218793738!==g(a,c)&&h("Invalid JP2 signature");break;
// The following header types are valid but currently not used:
case 1783634458:// 'jP\032\032'
case 1718909296:// 'ftyp'
case 1920099697:// 'rreq'
case 1919251232:// 'res '
case 1768449138:// 'ihdr'
break;default:var p=String.fromCharCode(k>>24&255,k>>16&255,k>>8&255,255&k);h("Unsupported header type "+k+" ("+p+")")}m&&(c+=l)}},parseImageProperties:function(a){for(var b=a.getByte();b>=0;){var c=b;b=a.getByte();var d=c<<8|b;
// Image and tile size (SIZ)
if(65361===d){a.skip(4);var e=a.getInt32()>>>0,f=a.getInt32()>>>0,g=a.getInt32()>>>0,h=a.getInt32()>>>0;// Byte 16
a.skip(16);var i=a.getUint16();// Byte 36
// Results are always returned as Uint8Arrays
return this.width=e-g,this.height=f-h,this.componentsCount=i,void(this.bitsPerComponent=8)}}throw new Error("JPX Error: No size marker found in JPX stream")},parseCodestream:function(a,d,e){var i={};try{for(var j=!1,k=d;e>k+1;){var l=f(a,k);k+=2;var m,n,o,p,q,r,s=0;switch(l){case 65359:// Start of codestream (SOC)
i.mainHeader=!0;break;case 65497:// End of codestream (EOC)
break;case 65361:// Image and tile size (SIZ)
s=f(a,k);var t={};t.Xsiz=g(a,k+4),t.Ysiz=g(a,k+8),t.XOsiz=g(a,k+12),t.YOsiz=g(a,k+16),t.XTsiz=g(a,k+20),t.YTsiz=g(a,k+24),t.XTOsiz=g(a,k+28),t.YTOsiz=g(a,k+32);var w=f(a,k+36);t.Csiz=w;var x=[];m=k+38;for(var A=0;w>A;A++){var B={precision:(127&a[m])+1,isSigned:!!(128&a[m]),XRsiz:a[m+1],YRsiz:a[m+1]};b(B,t),x.push(B)}i.SIZ=t,i.components=x,c(i,x),i.QCC=[],i.COC=[];break;case 65372:// Quantization default (QCD)
s=f(a,k);var C={};switch(m=k+2,n=a[m++],31&n){case 0:p=8,q=!0;break;case 1:p=16,q=!1;break;case 2:p=16,q=!0;break;default:throw new Error("JPX Error: Invalid SQcd value "+n)}for(C.noQuantization=8===p,C.scalarExpounded=q,C.guardBits=n>>5,o=[];s+k>m;){var D={};8===p?(D.epsilon=a[m++]>>3,D.mu=0):(D.epsilon=a[m]>>3,D.mu=(7&a[m])<<8|a[m+1],m+=2),o.push(D)}C.SPqcds=o,i.mainHeader?i.QCD=C:(i.currentTile.QCD=C,i.currentTile.QCC=[]);break;case 65373:// Quantization component (QCC)
s=f(a,k);var E={};m=k+2;var F;switch(i.SIZ.Csiz<257?F=a[m++]:(F=f(a,m),m+=2),n=a[m++],31&n){case 0:p=8,q=!0;break;case 1:p=16,q=!1;break;case 2:p=16,q=!0;break;default:throw new Error("JPX Error: Invalid SQcd value "+n)}for(E.noQuantization=8===p,E.scalarExpounded=q,E.guardBits=n>>5,o=[];s+k>m;)D={},8===p?(D.epsilon=a[m++]>>3,D.mu=0):(D.epsilon=a[m]>>3,D.mu=(7&a[m])<<8|a[m+1],m+=2),o.push(D);E.SPqcds=o,i.mainHeader?i.QCC[F]=E:i.currentTile.QCC[F]=E;break;case 65362:// Coding style default (COD)
s=f(a,k);var G={};m=k+2;var H=a[m++];G.entropyCoderWithCustomPrecincts=!!(1&H),G.sopMarkerUsed=!!(2&H),G.ephMarkerUsed=!!(4&H),G.progressionOrder=a[m++],G.layersCount=f(a,m),m+=2,G.multipleComponentTransform=a[m++],G.decompositionLevelsCount=a[m++],G.xcb=(15&a[m++])+2,G.ycb=(15&a[m++])+2;var I=a[m++];if(G.selectiveArithmeticCodingBypass=!!(1&I),G.resetContextProbabilities=!!(2&I),G.terminationOnEachCodingPass=!!(4&I),G.verticalyStripe=!!(8&I),G.predictableTermination=!!(16&I),G.segmentationSymbolUsed=!!(32&I),G.reversibleTransformation=a[m++],G.entropyCoderWithCustomPrecincts){for(var J=[];s+k>m;){var K=a[m++];J.push({PPx:15&K,PPy:K>>4})}G.precinctsSizes=J}var L=[];if(G.selectiveArithmeticCodingBypass&&L.push("selectiveArithmeticCodingBypass"),G.resetContextProbabilities&&L.push("resetContextProbabilities"),G.terminationOnEachCodingPass&&L.push("terminationOnEachCodingPass"),G.verticalyStripe&&L.push("verticalyStripe"),G.predictableTermination&&L.push("predictableTermination"),L.length>0)throw j=!0,new Error("JPX Error: Unsupported COD options ("+L.join(", ")+")");i.mainHeader?i.COD=G:(i.currentTile.COD=G,i.currentTile.COC=[]);break;case 65424:// Start of tile-part (SOT)
s=f(a,k),r={},r.index=f(a,k+2),r.length=g(a,k+4),r.dataEnd=r.length+k-2,r.partIndex=a[k+8],r.partsCount=a[k+9],i.mainHeader=!1,0===r.partIndex&&(
// reset component specific settings
r.COD=i.COD,r.COC=i.COC.slice(0),// clone of the global COC
r.QCD=i.QCD,r.QCC=i.QCC.slice(0)),i.currentTile=r;break;case 65427:// Start of data (SOD)
r=i.currentTile,0===r.partIndex&&(z(i,r.index),u(i)),
// moving to the end of the data
s=r.dataEnd-k,v(i,a,k,s);break;case 65365:// Tile-part lengths, main header (TLM)
case 65367:// Packet length, main header (PLM)
case 65368:// Packet length, tile-part header (PLT)
case 65380:// Comment (COM)
s=f(a,k);
// skipping content
break;case 65363:// Coding style component (COC)
throw new Error("JPX Error: Codestream code 0xFF53 (COC) is not implemented");default:throw new Error("JPX Error: Unknown codestream code: "+l.toString(16))}k+=s}}catch(M){if(j||this.failOnCorruptedImage)throw M;h("Trying to recover from "+M.message)}this.tiles=y(i),this.width=i.SIZ.Xsiz-i.SIZ.XOsiz,this.height=i.SIZ.Ysiz-i.SIZ.YOsiz,this.componentsCount=i.SIZ.Csiz}};
// Section B.10.2 Tag trees
var B=function(){function a(a,b){var c=e(Math.max(a,b))+1;this.levels=[];for(var d=0;c>d;d++){var f={width:a,height:b,items:[]};this.levels.push(f),a=Math.ceil(a/2),b=Math.ceil(b/2)}}return a.prototype={reset:function(a,b){for(var c,d=0,e=0;d<this.levels.length;){c=this.levels[d];var f=a+b*c.width;if(void 0!==c.items[f]){e=c.items[f];break}c.index=f,a>>=1,b>>=1,d++}d--,c=this.levels[d],c.items[c.index]=e,this.currentLevel=d,delete this.value},incrementValue:function(){var a=this.levels[this.currentLevel];a.items[a.index]++},nextLevel:function(){var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];return a--,0>a?(this.value=c,!1):(this.currentLevel=a,b=this.levels[a],b.items[b.index]=c,!0)}},a}(),C=function(){function a(a,b,c){var d=e(Math.max(a,b))+1;this.levels=[];for(var f=0;d>f;f++){for(var g=new Uint8Array(a*b),h=0,i=g.length;i>h;h++)g[h]=c;var j={width:a,height:b,items:g};this.levels.push(j),a=Math.ceil(a/2),b=Math.ceil(b/2)}}return a.prototype={reset:function(a,b,c){for(var d=0;d<this.levels.length;){var e=this.levels[d],f=a+b*e.width;e.index=f;var g=e.items[f];if(255===g)break;if(g>c)
// already know about this one, propagating the value to top levels
return this.currentLevel=d,this.propagateValues(),!1;a>>=1,b>>=1,d++}return this.currentLevel=d-1,!0},incrementValue:function(a){var b=this.levels[this.currentLevel];b.items[b.index]=a+1,this.propagateValues()},propagateValues:function(){for(var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];--a>=0;)b=this.levels[a],b.items[b.index]=c},nextLevel:function(){var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];return b.items[b.index]=255,a--,0>a?!1:(this.currentLevel=a,b=this.levels[a],b.items[b.index]=c,!0)}},a}(),D=function(){function a(a,b,c,g,h){this.width=a,this.height=b,this.contextLabelTable="HH"===c?f:"HL"===c?e:d;var i=a*b;
// coefficients outside the encoding region treated as insignificant
// add border state cells for significanceState
this.neighborsSignificance=new Uint8Array(i),this.coefficentsSign=new Uint8Array(i),this.coefficentsMagnitude=h>14?new Uint32Array(i):h>6?new Uint16Array(i):new Uint8Array(i),this.processingFlags=new Uint8Array(i);var j=new Uint8Array(i);if(0!==g)for(var k=0;i>k;k++)j[k]=g;this.bitsDecoded=j,this.reset()}var b=17,c=18,d=new Uint8Array([0,5,8,0,3,7,8,0,4,7,8,0,0,0,0,0,1,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8]),e=new Uint8Array([0,3,4,0,5,7,7,0,8,8,8,0,0,0,0,0,1,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8]),f=new Uint8Array([0,1,2,0,1,2,2,0,2,2,2,0,0,0,0,0,3,4,5,0,4,5,5,0,5,5,5,0,0,0,0,0,6,7,7,0,7,7,7,0,7,7,7,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8]);return a.prototype={setDecoder:function(a){this.decoder=a},reset:function(){
// We have 17 contexts that are accessed via context labels,
// plus the uniform and runlength context.
this.contexts=new Int8Array(19),
// Contexts are packed into 1 byte:
// highest 7 bits carry the index, lowest bit carries mps
this.contexts[0]=8,this.contexts[b]=92,this.contexts[c]=6},setNeighborsSignificance:function(a,b,c){var d,e=this.neighborsSignificance,f=this.width,g=this.height,h=b>0,i=f>b+1;a>0&&(d=c-f,h&&(e[d-1]+=16),i&&(e[d+1]+=16),e[d]+=4),g>a+1&&(d=c+f,h&&(e[d-1]+=16),i&&(e[d+1]+=16),e[d]+=4),h&&(e[c-1]+=1),i&&(e[c+1]+=1),e[c]|=128},runSignificancePropagationPass:function(){for(var a=this.decoder,b=this.width,c=this.height,d=this.coefficentsMagnitude,e=this.coefficentsSign,f=this.neighborsSignificance,g=this.processingFlags,h=this.contexts,i=this.contextLabelTable,j=this.bitsDecoded,k=-2,l=1,m=2,n=0;c>n;n+=4)for(var o=0;b>o;o++)for(var p=n*b+o,q=0;4>q;q++,p+=b){var r=n+q;if(r>=c)break;if(
// clear processed flag first
g[p]&=k,!d[p]&&f[p]){var s=i[f[p]],t=a.readBit(h,s);if(t){var u=this.decodeSignBit(r,o,p);e[p]=u,d[p]=1,this.setNeighborsSignificance(r,o,p),g[p]|=m}j[p]++,g[p]|=l}}},decodeSignBit:function(a,b,c){var d,e,f,g,h,i,j=this.width,k=this.height,l=this.coefficentsMagnitude,m=this.coefficentsSign;g=b>0&&0!==l[c-1],j>b+1&&0!==l[c+1]?(f=m[c+1],g?(e=m[c-1],d=1-f-e):d=1-f-f):g?(e=m[c-1],d=1-e-e):d=0;var n=3*d;
// calculate vertical contribution and combine with the horizontal
return g=a>0&&0!==l[c-j],k>a+1&&0!==l[c+j]?(f=m[c+j],g?(e=m[c-j],d=1-f-e+n):d=1-f-f+n):g?(e=m[c-j],d=1-e-e+n):d=n,d>=0?(h=9+d,i=this.decoder.readBit(this.contexts,h)):(h=9-d,i=1^this.decoder.readBit(this.contexts,h)),i},runMagnitudeRefinementPass:function(){for(var a,b=this.decoder,c=this.width,d=this.height,e=this.coefficentsMagnitude,f=this.neighborsSignificance,g=this.contexts,h=this.bitsDecoded,i=this.processingFlags,j=1,k=2,l=c*d,m=4*c,n=0;l>n;n=a){a=Math.min(l,n+m);for(var o=0;c>o;o++)for(var p=n+o;a>p;p+=c)
// significant but not those that have just become
if(e[p]&&0===(i[p]&j)){var q=16;if(0!==(i[p]&k)){i[p]^=k;
// first refinement
var r=127&f[p];q=0===r?15:14}var s=b.readBit(g,q);e[p]=e[p]<<1|s,h[p]++,i[p]|=j}}},runCleanupPass:function(){for(var a,d=this.decoder,e=this.width,f=this.height,g=this.neighborsSignificance,h=this.coefficentsMagnitude,i=this.coefficentsSign,j=this.contexts,k=this.contextLabelTable,l=this.bitsDecoded,m=this.processingFlags,n=1,o=2,p=e,q=2*e,r=3*e,s=0;f>s;s=a){a=Math.min(s+4,f);for(var t=s*e,u=f>s+3,v=0;e>v;v++){var w,x=t+v,y=u&&0===m[x]&&0===m[x+p]&&0===m[x+q]&&0===m[x+r]&&0===g[x]&&0===g[x+p]&&0===g[x+q]&&0===g[x+r],z=0,A=x,B=s;if(y){var C=d.readBit(j,c);if(!C){l[x]++,l[x+p]++,l[x+q]++,l[x+r]++;continue}z=d.readBit(j,b)<<1|d.readBit(j,b),0!==z&&(B=s+z,A+=z*e),w=this.decodeSignBit(B,v,A),i[A]=w,h[A]=1,this.setNeighborsSignificance(B,v,A),m[A]|=o,A=x;for(var D=s;B>=D;D++,A+=e)l[A]++;z++}for(B=s+z;a>B;B++,A+=e)if(!h[A]&&0===(m[A]&n)){var E=k[g[A]],F=d.readBit(j,E);1===F&&(w=this.decodeSignBit(B,v,A),i[A]=w,h[A]=1,this.setNeighborsSignificance(B,v,A),m[A]|=o),l[A]++}}}},checkSegmentationSymbol:function(){var a=this.decoder,c=this.contexts,d=a.readBit(c,b)<<3|a.readBit(c,b)<<2|a.readBit(c,b)<<1|a.readBit(c,b);if(10!==d)throw new Error("JPX Error: Invalid segmentation symbol")}},a}(),E=function(){function a(){}return a.prototype.calculate=function(a,b,c){for(var d=a[0],e=1,f=a.length;f>e;e++)d=this.iterate(d,a[e],b,c);return d},a.prototype.extend=function(a,b,c){
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
if(this.extend(w,q,o),this.filter(w,q,o),0===v)for(g=i-s+1,h=q;a>h;g+=n,h++)for(u=0;s>u;u++)p[g+u]=t[u][h]}return{width:n,height:o,items:p}},a}(),F=function(){function a(){E.call(this)}return a.prototype=Object.create(E.prototype),a.prototype.filter=function(a,b,c){var d=c>>1;b=0|b;var e,f,g,h,i=-1.586134342059924,j=-.052980118572961,k=.882911075530934,l=.443506852043971,m=1.230174104914001,n=1/m;for(e=b-3,f=d+4;f--;e+=2)a[e]*=n;for(e=b-2,g=l*a[e-1],f=d+3;f--&&(h=l*a[e+1],a[e]=m*a[e]-g-h,f--);e+=2)e+=2,g=l*a[e+1],a[e]=m*a[e]-g-h;for(e=b-1,g=k*a[e-1],f=d+2;f--&&(h=k*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=k*a[e+1],a[e]-=g+h;for(e=b,g=j*a[e-1],f=d+1;f--&&(h=j*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=j*a[e+1],a[e]-=g+h;
// step 6
if(0!==d)for(e=b+1,g=i*a[e-1],f=d;f--&&(h=i*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=i*a[e+1],a[e]-=g+h},a}(),G=function(){function a(){E.call(this)}return a.prototype=Object.create(E.prototype),a.prototype.filter=function(a,b,c){var d=c>>1;b=0|b;var e,f;for(e=b,f=d+1;f--;e+=2)a[e]-=a[e-1]+a[e+1]+2>>2;for(e=b+1,f=d;f--;e+=2)a[e]+=a[e-1]+a[e+1]>>1},a}();return a}();a.JpxImage=j}),function(a,b){b(a.pdfjsCoreMetrics={},a.pdfjsSharedUtil)}(this,function(a,b){var c=b.getLookupTableFactory,d=c(function(a){a.Courier=600,a["Courier-Bold"]=600,a["Courier-BoldOblique"]=600,a["Courier-Oblique"]=600,a.Helvetica=c(function(a){a.space=278,a.exclam=278,a.quotedbl=355,a.numbersign=556,a.dollar=556,a.percent=889,a.ampersand=667,a.quoteright=222,a.parenleft=333,a.parenright=333,a.asterisk=389,a.plus=584,a.comma=278,a.hyphen=333,a.period=278,a.slash=278,a.zero=556,a.one=556,a.two=556,a.three=556,a.four=556,a.five=556,a.six=556,a.seven=556,a.eight=556,a.nine=556,a.colon=278,a.semicolon=278,a.less=584,a.equal=584,a.greater=584,a.question=556,a.at=1015,a.A=667,a.B=667,a.C=722,a.D=722,a.E=667,a.F=611,a.G=778,a.H=722,a.I=278,a.J=500,a.K=667,a.L=556,a.M=833,a.N=722,a.O=778,a.P=667,a.Q=778,a.R=722,a.S=667,a.T=611,a.U=722,a.V=667,a.W=944,a.X=667,a.Y=667,a.Z=611,a.bracketleft=278,a.backslash=278,a.bracketright=278,a.asciicircum=469,a.underscore=556,a.quoteleft=222,a.a=556,a.b=556,a.c=500,a.d=556,a.e=556,a.f=278,a.g=556,a.h=556,a.i=222,a.j=222,a.k=500,a.l=222,a.m=833,a.n=556,a.o=556,a.p=556,a.q=556,a.r=333,a.s=500,a.t=278,a.u=556,a.v=500,a.w=722,a.x=500,a.y=500,a.z=500,a.braceleft=334,a.bar=260,a.braceright=334,a.asciitilde=584,a.exclamdown=333,a.cent=556,a.sterling=556,a.fraction=167,a.yen=556,a.florin=556,a.section=556,a.currency=556,a.quotesingle=191,a.quotedblleft=333,a.guillemotleft=556,a.guilsinglleft=333,a.guilsinglright=333,a.fi=500,a.fl=500,a.endash=556,a.dagger=556,a.daggerdbl=556,a.periodcentered=278,a.paragraph=537,a.bullet=350,a.quotesinglbase=222,a.quotedblbase=333,a.quotedblright=333,a.guillemotright=556,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=611,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=1e3,a.ordfeminine=370,a.Lslash=556,a.Oslash=778,a.OE=1e3,a.ordmasculine=365,a.ae=889,a.dotlessi=278,a.lslash=222,a.oslash=611,a.oe=944,a.germandbls=611,a.Idieresis=278,a.eacute=556,a.abreve=556,a.uhungarumlaut=556,a.ecaron=556,a.Ydieresis=667,a.divide=584,a.Yacute=667,a.Acircumflex=667,a.aacute=556,a.Ucircumflex=722,a.yacute=500,a.scommaaccent=500,a.ecircumflex=556,a.Uring=722,a.Udieresis=722,a.aogonek=556,a.Uacute=722,a.uogonek=556,a.Edieresis=667,a.Dcroat=722,a.commaaccent=250,a.copyright=737,a.Emacron=667,a.ccaron=500,a.aring=556,a.Ncommaaccent=722,a.lacute=222,a.agrave=556,a.Tcommaaccent=611,a.Cacute=722,a.atilde=556,a.Edotaccent=667,a.scaron=500,a.scedilla=500,a.iacute=278,a.lozenge=471,a.Rcaron=722,a.Gcommaaccent=778,a.ucircumflex=556,a.acircumflex=556,a.Amacron=667,a.rcaron=333,a.ccedilla=500,a.Zdotaccent=611,a.Thorn=667,a.Omacron=778,a.Racute=722,a.Sacute=667,a.dcaron=643,a.Umacron=722,a.uring=556,a.threesuperior=333,a.Ograve=778,a.Agrave=667,a.Abreve=667,a.multiply=584,a.uacute=556,a.Tcaron=611,a.partialdiff=476,a.ydieresis=500,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=667,a.adieresis=556,a.edieresis=556,a.cacute=500,a.nacute=556,a.umacron=556,a.Ncaron=722,a.Iacute=278,a.plusminus=584,a.brokenbar=260,a.registered=737,a.Gbreve=778,a.Idotaccent=278,a.summation=600,a.Egrave=667,a.racute=333,a.omacron=556,a.Zacute=611,a.Zcaron=611,a.greaterequal=549,a.Eth=722,a.Ccedilla=722,a.lcommaaccent=222,a.tcaron=317,a.eogonek=556,a.Uogonek=722,a.Aacute=667,a.Adieresis=667,a.egrave=556,a.zacute=500,a.iogonek=222,a.Oacute=778,a.oacute=556,a.amacron=556,a.sacute=500,a.idieresis=278,a.Ocircumflex=778,a.Ugrave=722,a.Delta=612,a.thorn=556,a.twosuperior=333,a.Odieresis=778,a.mu=556,a.igrave=278,a.ohungarumlaut=556,a.Eogonek=667,a.dcroat=556,a.threequarters=834,a.Scedilla=667,a.lcaron=299,a.Kcommaaccent=667,a.Lacute=556,a.trademark=1e3,a.edotaccent=556,a.Igrave=278,a.Imacron=278,a.Lcaron=556,a.onehalf=834,a.lessequal=549,a.ocircumflex=556,a.ntilde=556,a.Uhungarumlaut=722,a.Eacute=667,a.emacron=556,a.gbreve=556,a.onequarter=834,a.Scaron=667,a.Scommaaccent=667,a.Ohungarumlaut=778,a.degree=400,a.ograve=556,a.Ccaron=722,a.ugrave=556,a.radical=453,a.Dcaron=722,a.rcommaaccent=333,a.Ntilde=722,a.otilde=556,a.Rcommaaccent=722,a.Lcommaaccent=556,a.Atilde=667,a.Aogonek=667,a.Aring=667,a.Otilde=778,a.zdotaccent=500,a.Ecaron=667,a.Iogonek=278,a.kcommaaccent=500,a.minus=584,a.Icircumflex=278,a.ncaron=556,a.tcommaaccent=278,a.logicalnot=584,a.odieresis=556,a.udieresis=556,a.notequal=549,a.gcommaaccent=556,a.eth=556,a.zcaron=500,a.ncommaaccent=556,a.onesuperior=333,a.imacron=278,a.Euro=556}),a["Helvetica-Bold"]=c(function(a){a.space=278,a.exclam=333,a.quotedbl=474,a.numbersign=556,a.dollar=556,a.percent=889,a.ampersand=722,a.quoteright=278,a.parenleft=333,a.parenright=333,a.asterisk=389,a.plus=584,a.comma=278,a.hyphen=333,a.period=278,a.slash=278,a.zero=556,a.one=556,a.two=556,a.three=556,a.four=556,a.five=556,a.six=556,a.seven=556,a.eight=556,a.nine=556,a.colon=333,a.semicolon=333,a.less=584,a.equal=584,a.greater=584,a.question=611,a.at=975,a.A=722,a.B=722,a.C=722,a.D=722,a.E=667,a.F=611,a.G=778,a.H=722,a.I=278,a.J=556,a.K=722,a.L=611,a.M=833,a.N=722,a.O=778,a.P=667,a.Q=778,a.R=722,a.S=667,a.T=611,a.U=722,a.V=667,a.W=944,a.X=667,a.Y=667,a.Z=611,a.bracketleft=333,a.backslash=278,a.bracketright=333,a.asciicircum=584,a.underscore=556,a.quoteleft=278,a.a=556,a.b=611,a.c=556,a.d=611,a.e=556,a.f=333,a.g=611,a.h=611,a.i=278,a.j=278,a.k=556,a.l=278,a.m=889,a.n=611,a.o=611,a.p=611,a.q=611,a.r=389,a.s=556,a.t=333,a.u=611,a.v=556,a.w=778,a.x=556,a.y=556,a.z=500,a.braceleft=389,a.bar=280,a.braceright=389,a.asciitilde=584,a.exclamdown=333,a.cent=556,a.sterling=556,a.fraction=167,a.yen=556,a.florin=556,a.section=556,a.currency=556,a.quotesingle=238,a.quotedblleft=500,a.guillemotleft=556,a.guilsinglleft=333,a.guilsinglright=333,a.fi=611,a.fl=611,a.endash=556,a.dagger=556,a.daggerdbl=556,a.periodcentered=278,a.paragraph=556,a.bullet=350,a.quotesinglbase=278,a.quotedblbase=500,a.quotedblright=500,a.guillemotright=556,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=611,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=1e3,a.ordfeminine=370,a.Lslash=611,a.Oslash=778,a.OE=1e3,a.ordmasculine=365,a.ae=889,a.dotlessi=278,a.lslash=278,a.oslash=611,a.oe=944,a.germandbls=611,a.Idieresis=278,a.eacute=556,a.abreve=556,a.uhungarumlaut=611,a.ecaron=556,a.Ydieresis=667,a.divide=584,a.Yacute=667,a.Acircumflex=722,a.aacute=556,a.Ucircumflex=722,a.yacute=556,a.scommaaccent=556,a.ecircumflex=556,a.Uring=722,a.Udieresis=722,a.aogonek=556,a.Uacute=722,a.uogonek=611,a.Edieresis=667,a.Dcroat=722,a.commaaccent=250,a.copyright=737,a.Emacron=667,a.ccaron=556,a.aring=556,a.Ncommaaccent=722,a.lacute=278,a.agrave=556,a.Tcommaaccent=611,a.Cacute=722,a.atilde=556,a.Edotaccent=667,a.scaron=556,a.scedilla=556,a.iacute=278,a.lozenge=494,a.Rcaron=722,a.Gcommaaccent=778,a.ucircumflex=611,a.acircumflex=556,a.Amacron=722,a.rcaron=389,a.ccedilla=556,a.Zdotaccent=611,a.Thorn=667,a.Omacron=778,a.Racute=722,a.Sacute=667,a.dcaron=743,a.Umacron=722,a.uring=611,a.threesuperior=333,a.Ograve=778,a.Agrave=722,a.Abreve=722,a.multiply=584,a.uacute=611,a.Tcaron=611,a.partialdiff=494,a.ydieresis=556,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=667,a.adieresis=556,a.edieresis=556,a.cacute=556,a.nacute=611,a.umacron=611,a.Ncaron=722,a.Iacute=278,a.plusminus=584,a.brokenbar=280,a.registered=737,a.Gbreve=778,a.Idotaccent=278,a.summation=600,a.Egrave=667,a.racute=389,a.omacron=611,a.Zacute=611,a.Zcaron=611,a.greaterequal=549,a.Eth=722,a.Ccedilla=722,a.lcommaaccent=278,a.tcaron=389,a.eogonek=556,a.Uogonek=722,a.Aacute=722,a.Adieresis=722,a.egrave=556,a.zacute=500,a.iogonek=278,a.Oacute=778,a.oacute=611,a.amacron=556,a.sacute=556,a.idieresis=278,a.Ocircumflex=778,a.Ugrave=722,a.Delta=612,a.thorn=611,a.twosuperior=333,a.Odieresis=778,a.mu=611,a.igrave=278,a.ohungarumlaut=611,a.Eogonek=667,a.dcroat=611,a.threequarters=834,a.Scedilla=667,a.lcaron=400,a.Kcommaaccent=722,a.Lacute=611,a.trademark=1e3,a.edotaccent=556,a.Igrave=278,a.Imacron=278,a.Lcaron=611,a.onehalf=834,a.lessequal=549,a.ocircumflex=611,a.ntilde=611,a.Uhungarumlaut=722,a.Eacute=667,a.emacron=556,a.gbreve=611,a.onequarter=834,a.Scaron=667,a.Scommaaccent=667,a.Ohungarumlaut=778,a.degree=400,a.ograve=611,a.Ccaron=722,a.ugrave=611,a.radical=549,a.Dcaron=722,a.rcommaaccent=389,a.Ntilde=722,a.otilde=611,a.Rcommaaccent=722,a.Lcommaaccent=611,a.Atilde=722,a.Aogonek=722,a.Aring=722,a.Otilde=778,a.zdotaccent=500,a.Ecaron=667,a.Iogonek=278,a.kcommaaccent=556,a.minus=584,a.Icircumflex=278,a.ncaron=611,a.tcommaaccent=333,a.logicalnot=584,a.odieresis=611,a.udieresis=611,a.notequal=549,a.gcommaaccent=611,a.eth=611,a.zcaron=500,a.ncommaaccent=611,a.onesuperior=333,a.imacron=278,a.Euro=556}),a["Helvetica-BoldOblique"]=c(function(a){a.space=278,a.exclam=333,a.quotedbl=474,a.numbersign=556,a.dollar=556,a.percent=889,a.ampersand=722,a.quoteright=278,a.parenleft=333,a.parenright=333,a.asterisk=389,a.plus=584,a.comma=278,a.hyphen=333,a.period=278,a.slash=278,a.zero=556,a.one=556,a.two=556,a.three=556,a.four=556,a.five=556,a.six=556,a.seven=556,a.eight=556,a.nine=556,a.colon=333,a.semicolon=333,a.less=584,a.equal=584,a.greater=584,a.question=611,a.at=975,a.A=722,a.B=722,a.C=722,a.D=722,a.E=667,a.F=611,a.G=778,a.H=722,a.I=278,a.J=556,a.K=722,a.L=611,a.M=833,a.N=722,a.O=778,a.P=667,a.Q=778,a.R=722,a.S=667,a.T=611,a.U=722,a.V=667,a.W=944,a.X=667,a.Y=667,a.Z=611,a.bracketleft=333,a.backslash=278,a.bracketright=333,a.asciicircum=584,a.underscore=556,a.quoteleft=278,a.a=556,a.b=611,a.c=556,a.d=611,a.e=556,a.f=333,a.g=611,a.h=611,a.i=278,a.j=278,a.k=556,a.l=278,a.m=889,a.n=611,a.o=611,a.p=611,a.q=611,a.r=389,a.s=556,a.t=333,a.u=611,a.v=556,a.w=778,a.x=556,a.y=556,a.z=500,a.braceleft=389,a.bar=280,a.braceright=389,a.asciitilde=584,a.exclamdown=333,a.cent=556,a.sterling=556,a.fraction=167,a.yen=556,a.florin=556,a.section=556,a.currency=556,a.quotesingle=238,a.quotedblleft=500,a.guillemotleft=556,a.guilsinglleft=333,a.guilsinglright=333,a.fi=611,a.fl=611,a.endash=556,a.dagger=556,a.daggerdbl=556,a.periodcentered=278,a.paragraph=556,a.bullet=350,a.quotesinglbase=278,a.quotedblbase=500,a.quotedblright=500,a.guillemotright=556,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=611,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=1e3,a.ordfeminine=370,a.Lslash=611,a.Oslash=778,a.OE=1e3,a.ordmasculine=365,a.ae=889,a.dotlessi=278,a.lslash=278,a.oslash=611,a.oe=944,a.germandbls=611,a.Idieresis=278,a.eacute=556,a.abreve=556,a.uhungarumlaut=611,a.ecaron=556,a.Ydieresis=667,a.divide=584,a.Yacute=667,a.Acircumflex=722,a.aacute=556,a.Ucircumflex=722,a.yacute=556,a.scommaaccent=556,a.ecircumflex=556,a.Uring=722,a.Udieresis=722,a.aogonek=556,a.Uacute=722,a.uogonek=611,a.Edieresis=667,a.Dcroat=722,a.commaaccent=250,a.copyright=737,a.Emacron=667,a.ccaron=556,a.aring=556,a.Ncommaaccent=722,a.lacute=278,a.agrave=556,a.Tcommaaccent=611,a.Cacute=722,a.atilde=556,a.Edotaccent=667,a.scaron=556,a.scedilla=556,a.iacute=278,a.lozenge=494,a.Rcaron=722,a.Gcommaaccent=778,a.ucircumflex=611,a.acircumflex=556,a.Amacron=722,a.rcaron=389,a.ccedilla=556,a.Zdotaccent=611,a.Thorn=667,a.Omacron=778,a.Racute=722,a.Sacute=667,a.dcaron=743,a.Umacron=722,a.uring=611,a.threesuperior=333,a.Ograve=778,a.Agrave=722,a.Abreve=722,a.multiply=584,a.uacute=611,a.Tcaron=611,a.partialdiff=494,a.ydieresis=556,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=667,a.adieresis=556,a.edieresis=556,a.cacute=556,a.nacute=611,a.umacron=611,a.Ncaron=722,a.Iacute=278,a.plusminus=584,a.brokenbar=280,a.registered=737,a.Gbreve=778,a.Idotaccent=278,a.summation=600,a.Egrave=667,a.racute=389,a.omacron=611,a.Zacute=611,a.Zcaron=611,a.greaterequal=549,a.Eth=722,a.Ccedilla=722,a.lcommaaccent=278,a.tcaron=389,a.eogonek=556,a.Uogonek=722,a.Aacute=722,a.Adieresis=722,a.egrave=556,a.zacute=500,a.iogonek=278,a.Oacute=778,a.oacute=611,a.amacron=556,a.sacute=556,a.idieresis=278,a.Ocircumflex=778,a.Ugrave=722,a.Delta=612,a.thorn=611,a.twosuperior=333,a.Odieresis=778,a.mu=611,a.igrave=278,a.ohungarumlaut=611,a.Eogonek=667,a.dcroat=611,a.threequarters=834,a.Scedilla=667,a.lcaron=400,a.Kcommaaccent=722,a.Lacute=611,a.trademark=1e3,a.edotaccent=556,a.Igrave=278,a.Imacron=278,a.Lcaron=611,a.onehalf=834,a.lessequal=549,a.ocircumflex=611,a.ntilde=611,a.Uhungarumlaut=722,a.Eacute=667,a.emacron=556,a.gbreve=611,a.onequarter=834,a.Scaron=667,a.Scommaaccent=667,a.Ohungarumlaut=778,a.degree=400,a.ograve=611,a.Ccaron=722,a.ugrave=611,a.radical=549,a.Dcaron=722,a.rcommaaccent=389,a.Ntilde=722,a.otilde=611,a.Rcommaaccent=722,a.Lcommaaccent=611,a.Atilde=722,a.Aogonek=722,a.Aring=722,a.Otilde=778,a.zdotaccent=500,a.Ecaron=667,a.Iogonek=278,a.kcommaaccent=556,a.minus=584,a.Icircumflex=278,a.ncaron=611,a.tcommaaccent=333,a.logicalnot=584,a.odieresis=611,a.udieresis=611,a.notequal=549,a.gcommaaccent=611,a.eth=611,a.zcaron=500,a.ncommaaccent=611,a.onesuperior=333,a.imacron=278,a.Euro=556}),a["Helvetica-Oblique"]=c(function(a){a.space=278,a.exclam=278,a.quotedbl=355,a.numbersign=556,a.dollar=556,a.percent=889,a.ampersand=667,a.quoteright=222,a.parenleft=333,a.parenright=333,a.asterisk=389,a.plus=584,a.comma=278,a.hyphen=333,a.period=278,a.slash=278,a.zero=556,a.one=556,a.two=556,a.three=556,a.four=556,a.five=556,a.six=556,a.seven=556,a.eight=556,a.nine=556,a.colon=278,a.semicolon=278,a.less=584,a.equal=584,a.greater=584,a.question=556,a.at=1015,a.A=667,a.B=667,a.C=722,a.D=722,a.E=667,a.F=611,a.G=778,a.H=722,a.I=278,a.J=500,a.K=667,a.L=556,a.M=833,a.N=722,a.O=778,a.P=667,a.Q=778,a.R=722,a.S=667,a.T=611,a.U=722,a.V=667,a.W=944,a.X=667,a.Y=667,a.Z=611,a.bracketleft=278,a.backslash=278,a.bracketright=278,a.asciicircum=469,a.underscore=556,a.quoteleft=222,a.a=556,a.b=556,a.c=500,a.d=556,a.e=556,a.f=278,a.g=556,a.h=556,a.i=222,a.j=222,a.k=500,a.l=222,a.m=833,a.n=556,a.o=556,a.p=556,a.q=556,a.r=333,a.s=500,a.t=278,a.u=556,a.v=500,a.w=722,a.x=500,a.y=500,a.z=500,a.braceleft=334,a.bar=260,a.braceright=334,a.asciitilde=584,a.exclamdown=333,a.cent=556,a.sterling=556,a.fraction=167,a.yen=556,a.florin=556,a.section=556,a.currency=556,a.quotesingle=191,a.quotedblleft=333,a.guillemotleft=556,a.guilsinglleft=333,a.guilsinglright=333,a.fi=500,a.fl=500,a.endash=556,a.dagger=556,a.daggerdbl=556,a.periodcentered=278,a.paragraph=537,a.bullet=350,a.quotesinglbase=222,a.quotedblbase=333,a.quotedblright=333,a.guillemotright=556,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=611,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=1e3,a.ordfeminine=370,a.Lslash=556,a.Oslash=778,a.OE=1e3,a.ordmasculine=365,a.ae=889,a.dotlessi=278,a.lslash=222,a.oslash=611,a.oe=944,a.germandbls=611,a.Idieresis=278,a.eacute=556,a.abreve=556,a.uhungarumlaut=556,a.ecaron=556,a.Ydieresis=667,a.divide=584,a.Yacute=667,a.Acircumflex=667,a.aacute=556,a.Ucircumflex=722,a.yacute=500,a.scommaaccent=500,a.ecircumflex=556,a.Uring=722,a.Udieresis=722,a.aogonek=556,a.Uacute=722,a.uogonek=556,a.Edieresis=667,a.Dcroat=722,a.commaaccent=250,a.copyright=737,a.Emacron=667,a.ccaron=500,a.aring=556,a.Ncommaaccent=722,a.lacute=222,a.agrave=556,a.Tcommaaccent=611,a.Cacute=722,a.atilde=556,a.Edotaccent=667,a.scaron=500,a.scedilla=500,a.iacute=278,a.lozenge=471,a.Rcaron=722,a.Gcommaaccent=778,a.ucircumflex=556,a.acircumflex=556,a.Amacron=667,a.rcaron=333,a.ccedilla=500,a.Zdotaccent=611,a.Thorn=667,a.Omacron=778,a.Racute=722,a.Sacute=667,a.dcaron=643,a.Umacron=722,a.uring=556,a.threesuperior=333,a.Ograve=778,a.Agrave=667,a.Abreve=667,a.multiply=584,a.uacute=556,a.Tcaron=611,a.partialdiff=476,a.ydieresis=500,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=667,a.adieresis=556,a.edieresis=556,a.cacute=500,a.nacute=556,a.umacron=556,a.Ncaron=722,a.Iacute=278,a.plusminus=584,a.brokenbar=260,a.registered=737,a.Gbreve=778,a.Idotaccent=278,a.summation=600,a.Egrave=667,a.racute=333,a.omacron=556,a.Zacute=611,a.Zcaron=611,a.greaterequal=549,a.Eth=722,a.Ccedilla=722,a.lcommaaccent=222,a.tcaron=317,a.eogonek=556,a.Uogonek=722,a.Aacute=667,a.Adieresis=667,a.egrave=556,a.zacute=500,a.iogonek=222,a.Oacute=778,a.oacute=556,a.amacron=556,a.sacute=500,a.idieresis=278,a.Ocircumflex=778,a.Ugrave=722,a.Delta=612,a.thorn=556,a.twosuperior=333,a.Odieresis=778,a.mu=556,a.igrave=278,a.ohungarumlaut=556,a.Eogonek=667,a.dcroat=556,a.threequarters=834,a.Scedilla=667,a.lcaron=299,a.Kcommaaccent=667,a.Lacute=556,a.trademark=1e3,a.edotaccent=556,a.Igrave=278,a.Imacron=278,a.Lcaron=556,a.onehalf=834,a.lessequal=549,a.ocircumflex=556,a.ntilde=556,a.Uhungarumlaut=722,a.Eacute=667,a.emacron=556,a.gbreve=556,a.onequarter=834,a.Scaron=667,a.Scommaaccent=667,a.Ohungarumlaut=778,a.degree=400,a.ograve=556,a.Ccaron=722,a.ugrave=556,a.radical=453,a.Dcaron=722,a.rcommaaccent=333,a.Ntilde=722,a.otilde=556,a.Rcommaaccent=722,a.Lcommaaccent=556,a.Atilde=667,a.Aogonek=667,a.Aring=667,a.Otilde=778,a.zdotaccent=500,a.Ecaron=667,a.Iogonek=278,a.kcommaaccent=500,a.minus=584,a.Icircumflex=278,a.ncaron=556,a.tcommaaccent=278,a.logicalnot=584,a.odieresis=556,a.udieresis=556,a.notequal=549,a.gcommaaccent=556,a.eth=556,a.zcaron=500,a.ncommaaccent=556,a.onesuperior=333,a.imacron=278,a.Euro=556}),a.Symbol=c(function(a){a.space=250,a.exclam=333,a.universal=713,a.numbersign=500,a.existential=549,a.percent=833,a.ampersand=778,a.suchthat=439,a.parenleft=333,a.parenright=333,a.asteriskmath=500,a.plus=549,a.comma=250,a.minus=549,a.period=250,a.slash=278,a.zero=500,a.one=500,a.two=500,a.three=500,a.four=500,a.five=500,a.six=500,a.seven=500,a.eight=500,a.nine=500,a.colon=278,a.semicolon=278,a.less=549,a.equal=549,a.greater=549,a.question=444,a.congruent=549,a.Alpha=722,a.Beta=667,a.Chi=722,a.Delta=612,a.Epsilon=611,a.Phi=763,a.Gamma=603,a.Eta=722,a.Iota=333,a.theta1=631,a.Kappa=722,a.Lambda=686,a.Mu=889,a.Nu=722,a.Omicron=722,a.Pi=768,a.Theta=741,a.Rho=556,a.Sigma=592,a.Tau=611,a.Upsilon=690,a.sigma1=439,a.Omega=768,a.Xi=645,a.Psi=795,a.Zeta=611,a.bracketleft=333,a.therefore=863,a.bracketright=333,a.perpendicular=658,a.underscore=500,a.radicalex=500,a.alpha=631,a.beta=549,a.chi=549,a.delta=494,a.epsilon=439,a.phi=521,a.gamma=411,a.eta=603,a.iota=329,a.phi1=603,a.kappa=549,a.lambda=549,a.mu=576,a.nu=521,a.omicron=549,a.pi=549,a.theta=521,a.rho=549,a.sigma=603,a.tau=439,a.upsilon=576,a.omega1=713,a.omega=686,a.xi=493,a.psi=686,a.zeta=494,a.braceleft=480,a.bar=200,a.braceright=480,a.similar=549,a.Euro=750,a.Upsilon1=620,a.minute=247,a.lessequal=549,a.fraction=167,a.infinity=713,a.florin=500,a.club=753,a.diamond=753,a.heart=753,a.spade=753,a.arrowboth=1042,a.arrowleft=987,a.arrowup=603,a.arrowright=987,a.arrowdown=603,a.degree=400,a.plusminus=549,a.second=411,a.greaterequal=549,a.multiply=549,a.proportional=713,a.partialdiff=494,a.bullet=460,a.divide=549,a.notequal=549,a.equivalence=549,a.approxequal=549,a.ellipsis=1e3,a.arrowvertex=603,a.arrowhorizex=1e3,a.carriagereturn=658,a.aleph=823,a.Ifraktur=686,a.Rfraktur=795,a.weierstrass=987,a.circlemultiply=768,a.circleplus=768,a.emptyset=823,a.intersection=768,a.union=768,a.propersuperset=713,a.reflexsuperset=713,a.notsubset=713,a.propersubset=713,a.reflexsubset=713,a.element=713,a.notelement=713,a.angle=768,a.gradient=713,a.registerserif=790,a.copyrightserif=790,a.trademarkserif=890,a.product=823,a.radical=549,a.dotmath=250,a.logicalnot=713,a.logicaland=603,a.logicalor=603,a.arrowdblboth=1042,a.arrowdblleft=987,a.arrowdblup=603,a.arrowdblright=987,a.arrowdbldown=603,a.lozenge=494,a.angleleft=329,a.registersans=790,a.copyrightsans=790,a.trademarksans=786,a.summation=713,a.parenlefttp=384,a.parenleftex=384,a.parenleftbt=384,a.bracketlefttp=384,a.bracketleftex=384,a.bracketleftbt=384,a.bracelefttp=494,a.braceleftmid=494,a.braceleftbt=494,a.braceex=494,a.angleright=329,a.integral=274,a.integraltp=686,a.integralex=686,a.integralbt=686,a.parenrighttp=384,a.parenrightex=384,a.parenrightbt=384,a.bracketrighttp=384,a.bracketrightex=384,a.bracketrightbt=384,a.bracerighttp=494,a.bracerightmid=494,a.bracerightbt=494,a.apple=790}),a["Times-Roman"]=c(function(a){a.space=250,a.exclam=333,a.quotedbl=408,a.numbersign=500,a.dollar=500,a.percent=833,a.ampersand=778,a.quoteright=333,a.parenleft=333,a.parenright=333,a.asterisk=500,a.plus=564,a.comma=250,a.hyphen=333,a.period=250,a.slash=278,a.zero=500,a.one=500,a.two=500,a.three=500,a.four=500,a.five=500,a.six=500,a.seven=500,a.eight=500,a.nine=500,a.colon=278,a.semicolon=278,a.less=564,a.equal=564,a.greater=564,a.question=444,a.at=921,a.A=722,a.B=667,a.C=667,a.D=722,a.E=611,a.F=556,a.G=722,a.H=722,a.I=333,a.J=389,a.K=722,a.L=611,a.M=889,a.N=722,a.O=722,a.P=556,a.Q=722,a.R=667,a.S=556,a.T=611,a.U=722,a.V=722,a.W=944,a.X=722,a.Y=722,a.Z=611,a.bracketleft=333,a.backslash=278,a.bracketright=333,a.asciicircum=469,a.underscore=500,a.quoteleft=333,a.a=444,a.b=500,a.c=444,a.d=500,a.e=444,a.f=333,a.g=500,a.h=500,a.i=278,a.j=278,a.k=500,a.l=278,a.m=778,a.n=500,a.o=500,a.p=500,a.q=500,a.r=333,a.s=389,a.t=278,a.u=500,a.v=500,a.w=722,a.x=500,a.y=500,a.z=444,a.braceleft=480,a.bar=200,a.braceright=480,a.asciitilde=541,a.exclamdown=333,a.cent=500,a.sterling=500,a.fraction=167,a.yen=500,a.florin=500,a.section=500,a.currency=500,a.quotesingle=180,a.quotedblleft=444,a.guillemotleft=500,a.guilsinglleft=333,a.guilsinglright=333,a.fi=556,a.fl=556,a.endash=500,a.dagger=500,a.daggerdbl=500,a.periodcentered=250,a.paragraph=453,a.bullet=350,a.quotesinglbase=333,a.quotedblbase=444,a.quotedblright=444,a.guillemotright=500,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=444,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=889,a.ordfeminine=276,a.Lslash=611,a.Oslash=722,a.OE=889,a.ordmasculine=310,a.ae=667,a.dotlessi=278,a.lslash=278,a.oslash=500,a.oe=722,a.germandbls=500,a.Idieresis=333,a.eacute=444,a.abreve=444,a.uhungarumlaut=500,a.ecaron=444,a.Ydieresis=722,a.divide=564,a.Yacute=722,a.Acircumflex=722,a.aacute=444,a.Ucircumflex=722,a.yacute=500,a.scommaaccent=389,a.ecircumflex=444,a.Uring=722,a.Udieresis=722,a.aogonek=444,a.Uacute=722,a.uogonek=500,a.Edieresis=611,a.Dcroat=722,a.commaaccent=250,a.copyright=760,a.Emacron=611,a.ccaron=444,a.aring=444,a.Ncommaaccent=722,a.lacute=278,a.agrave=444,a.Tcommaaccent=611,a.Cacute=667,a.atilde=444,a.Edotaccent=611,a.scaron=389,a.scedilla=389,a.iacute=278,a.lozenge=471,a.Rcaron=667,a.Gcommaaccent=722,a.ucircumflex=500,a.acircumflex=444,a.Amacron=722,a.rcaron=333,a.ccedilla=444,a.Zdotaccent=611,a.Thorn=556,a.Omacron=722,a.Racute=667,a.Sacute=556,a.dcaron=588,a.Umacron=722,a.uring=500,a.threesuperior=300,a.Ograve=722,a.Agrave=722,a.Abreve=722,a.multiply=564,a.uacute=500,a.Tcaron=611,a.partialdiff=476,a.ydieresis=500,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=611,a.adieresis=444,a.edieresis=444,a.cacute=444,a.nacute=500,a.umacron=500,a.Ncaron=722,a.Iacute=333,a.plusminus=564,a.brokenbar=200,a.registered=760,a.Gbreve=722,a.Idotaccent=333,a.summation=600,a.Egrave=611,a.racute=333,a.omacron=500,a.Zacute=611,a.Zcaron=611,a.greaterequal=549,a.Eth=722,a.Ccedilla=667,a.lcommaaccent=278,a.tcaron=326,a.eogonek=444,a.Uogonek=722,a.Aacute=722,a.Adieresis=722,a.egrave=444,a.zacute=444,a.iogonek=278,a.Oacute=722,a.oacute=500,a.amacron=444,a.sacute=389,a.idieresis=278,a.Ocircumflex=722,a.Ugrave=722,a.Delta=612,a.thorn=500,a.twosuperior=300,a.Odieresis=722,a.mu=500,a.igrave=278,a.ohungarumlaut=500,a.Eogonek=611,a.dcroat=500,a.threequarters=750,a.Scedilla=556,a.lcaron=344,a.Kcommaaccent=722,a.Lacute=611,a.trademark=980,a.edotaccent=444,a.Igrave=333,a.Imacron=333,a.Lcaron=611,a.onehalf=750,a.lessequal=549,a.ocircumflex=500,a.ntilde=500,a.Uhungarumlaut=722,a.Eacute=611,a.emacron=444,a.gbreve=500,a.onequarter=750,a.Scaron=556,a.Scommaaccent=556,a.Ohungarumlaut=722,a.degree=400,a.ograve=500,a.Ccaron=667,a.ugrave=500,a.radical=453,a.Dcaron=722,a.rcommaaccent=333,a.Ntilde=722,a.otilde=500,a.Rcommaaccent=667,a.Lcommaaccent=611,a.Atilde=722,a.Aogonek=722,a.Aring=722,a.Otilde=722,a.zdotaccent=444,a.Ecaron=611,a.Iogonek=333,a.kcommaaccent=500,a.minus=564,a.Icircumflex=333,a.ncaron=500,a.tcommaaccent=278,a.logicalnot=564,a.odieresis=500,a.udieresis=500,a.notequal=549,a.gcommaaccent=500,a.eth=500,a.zcaron=444,a.ncommaaccent=500,a.onesuperior=300,a.imacron=278,a.Euro=500}),a["Times-Bold"]=c(function(a){a.space=250,a.exclam=333,a.quotedbl=555,a.numbersign=500,a.dollar=500,a.percent=1e3,a.ampersand=833,a.quoteright=333,a.parenleft=333,a.parenright=333,a.asterisk=500,a.plus=570,a.comma=250,a.hyphen=333,a.period=250,a.slash=278,a.zero=500,a.one=500,a.two=500,a.three=500,a.four=500,a.five=500,a.six=500,a.seven=500,a.eight=500,a.nine=500,a.colon=333,a.semicolon=333,a.less=570,a.equal=570,a.greater=570,a.question=500,a.at=930,a.A=722,a.B=667,a.C=722,a.D=722,a.E=667,a.F=611,a.G=778,a.H=778,a.I=389,a.J=500,a.K=778,a.L=667,a.M=944,a.N=722,a.O=778,a.P=611,a.Q=778,a.R=722,a.S=556,a.T=667,a.U=722,a.V=722,a.W=1e3,a.X=722,a.Y=722,a.Z=667,a.bracketleft=333,a.backslash=278,a.bracketright=333,a.asciicircum=581,a.underscore=500,a.quoteleft=333,a.a=500,a.b=556,a.c=444,a.d=556,a.e=444,a.f=333,a.g=500,a.h=556,a.i=278,a.j=333,a.k=556,a.l=278,a.m=833,a.n=556,a.o=500,a.p=556,a.q=556,a.r=444,a.s=389,a.t=333,a.u=556,a.v=500,a.w=722,a.x=500,a.y=500,a.z=444,a.braceleft=394,a.bar=220,a.braceright=394,a.asciitilde=520,a.exclamdown=333,a.cent=500,a.sterling=500,a.fraction=167,a.yen=500,a.florin=500,a.section=500,a.currency=500,a.quotesingle=278,a.quotedblleft=500,a.guillemotleft=500,a.guilsinglleft=333,a.guilsinglright=333,a.fi=556,a.fl=556,a.endash=500,a.dagger=500,a.daggerdbl=500,a.periodcentered=250,a.paragraph=540,a.bullet=350,a.quotesinglbase=333,a.quotedblbase=500,a.quotedblright=500,a.guillemotright=500,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=500,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=1e3,a.ordfeminine=300,a.Lslash=667,a.Oslash=778,a.OE=1e3,a.ordmasculine=330,a.ae=722,a.dotlessi=278,a.lslash=278,a.oslash=500,a.oe=722,a.germandbls=556,a.Idieresis=389,a.eacute=444,a.abreve=500,a.uhungarumlaut=556,a.ecaron=444,a.Ydieresis=722,a.divide=570,a.Yacute=722,a.Acircumflex=722,a.aacute=500,a.Ucircumflex=722,a.yacute=500,a.scommaaccent=389,a.ecircumflex=444,a.Uring=722,a.Udieresis=722,a.aogonek=500,a.Uacute=722,a.uogonek=556,a.Edieresis=667,a.Dcroat=722,a.commaaccent=250,a.copyright=747,a.Emacron=667,a.ccaron=444,a.aring=500,a.Ncommaaccent=722,a.lacute=278,a.agrave=500,a.Tcommaaccent=667,a.Cacute=722,a.atilde=500,a.Edotaccent=667,a.scaron=389,a.scedilla=389,a.iacute=278,a.lozenge=494,a.Rcaron=722,a.Gcommaaccent=778,a.ucircumflex=556,a.acircumflex=500,a.Amacron=722,a.rcaron=444,a.ccedilla=444,a.Zdotaccent=667,a.Thorn=611,a.Omacron=778,a.Racute=722,a.Sacute=556,a.dcaron=672,a.Umacron=722,a.uring=556,a.threesuperior=300,a.Ograve=778,a.Agrave=722,a.Abreve=722,a.multiply=570,a.uacute=556,a.Tcaron=667,a.partialdiff=494,a.ydieresis=500,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=667,a.adieresis=500,a.edieresis=444,a.cacute=444,a.nacute=556,a.umacron=556,a.Ncaron=722,a.Iacute=389,a.plusminus=570,a.brokenbar=220,a.registered=747,a.Gbreve=778,a.Idotaccent=389,a.summation=600,a.Egrave=667,a.racute=444,a.omacron=500,a.Zacute=667,a.Zcaron=667,a.greaterequal=549,a.Eth=722,a.Ccedilla=722,a.lcommaaccent=278,a.tcaron=416,a.eogonek=444,a.Uogonek=722,a.Aacute=722,a.Adieresis=722,a.egrave=444,a.zacute=444,a.iogonek=278,a.Oacute=778,a.oacute=500,a.amacron=500,a.sacute=389,a.idieresis=278,a.Ocircumflex=778,a.Ugrave=722,a.Delta=612,a.thorn=556,a.twosuperior=300,a.Odieresis=778,a.mu=556,a.igrave=278,a.ohungarumlaut=500,a.Eogonek=667,a.dcroat=556,a.threequarters=750,a.Scedilla=556,a.lcaron=394,a.Kcommaaccent=778,a.Lacute=667,a.trademark=1e3,a.edotaccent=444,a.Igrave=389,a.Imacron=389,a.Lcaron=667,a.onehalf=750,a.lessequal=549,a.ocircumflex=500,a.ntilde=556,a.Uhungarumlaut=722,a.Eacute=667,a.emacron=444,a.gbreve=500,a.onequarter=750,a.Scaron=556,a.Scommaaccent=556,a.Ohungarumlaut=778,a.degree=400,a.ograve=500,a.Ccaron=722,a.ugrave=556,a.radical=549,a.Dcaron=722,a.rcommaaccent=444,a.Ntilde=722,a.otilde=500,a.Rcommaaccent=722,a.Lcommaaccent=667,a.Atilde=722,a.Aogonek=722,a.Aring=722,a.Otilde=778,a.zdotaccent=444,a.Ecaron=667,a.Iogonek=389,a.kcommaaccent=556,a.minus=570,a.Icircumflex=389,a.ncaron=556,a.tcommaaccent=333,a.logicalnot=570,a.odieresis=500,a.udieresis=556,a.notequal=549,a.gcommaaccent=500,a.eth=500,a.zcaron=444,a.ncommaaccent=556,a.onesuperior=300,a.imacron=278,a.Euro=500}),a["Times-BoldItalic"]=c(function(a){a.space=250,a.exclam=389,a.quotedbl=555,a.numbersign=500,a.dollar=500,a.percent=833,a.ampersand=778,a.quoteright=333,a.parenleft=333,a.parenright=333,a.asterisk=500,a.plus=570,a.comma=250,a.hyphen=333,a.period=250,a.slash=278,a.zero=500,a.one=500,a.two=500,a.three=500,a.four=500,a.five=500,a.six=500,a.seven=500,a.eight=500,a.nine=500,a.colon=333,a.semicolon=333,a.less=570,a.equal=570,a.greater=570,a.question=500,a.at=832,a.A=667,a.B=667,a.C=667,a.D=722,a.E=667,a.F=667,a.G=722,a.H=778,a.I=389,a.J=500,a.K=667,a.L=611,a.M=889,a.N=722,a.O=722,a.P=611,a.Q=722,a.R=667,a.S=556,a.T=611,a.U=722,a.V=667,a.W=889,a.X=667,a.Y=611,a.Z=611,a.bracketleft=333,a.backslash=278,a.bracketright=333,a.asciicircum=570,a.underscore=500,a.quoteleft=333,a.a=500,a.b=500,a.c=444,a.d=500,a.e=444,a.f=333,a.g=500,a.h=556,a.i=278,a.j=278,a.k=500,a.l=278,a.m=778,a.n=556,a.o=500,a.p=500,a.q=500,a.r=389,a.s=389,a.t=278,a.u=556,a.v=444,a.w=667,a.x=500,a.y=444,a.z=389,a.braceleft=348,a.bar=220,a.braceright=348,a.asciitilde=570,a.exclamdown=389,a.cent=500,a.sterling=500,a.fraction=167,a.yen=500,a.florin=500,a.section=500,a.currency=500,a.quotesingle=278,a.quotedblleft=500,a.guillemotleft=500,a.guilsinglleft=333,a.guilsinglright=333,a.fi=556,a.fl=556,a.endash=500,a.dagger=500,a.daggerdbl=500,a.periodcentered=250,a.paragraph=500,a.bullet=350,a.quotesinglbase=333,a.quotedblbase=500,a.quotedblright=500,a.guillemotright=500,a.ellipsis=1e3,a.perthousand=1e3,a.questiondown=500,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=1e3,a.AE=944,a.ordfeminine=266,a.Lslash=611,a.Oslash=722,a.OE=944,a.ordmasculine=300,a.ae=722,a.dotlessi=278,a.lslash=278,a.oslash=500,a.oe=722,a.germandbls=500,a.Idieresis=389,a.eacute=444,a.abreve=500,a.uhungarumlaut=556,a.ecaron=444,a.Ydieresis=611,a.divide=570,a.Yacute=611,a.Acircumflex=667,a.aacute=500,a.Ucircumflex=722,a.yacute=444,a.scommaaccent=389,a.ecircumflex=444,a.Uring=722,a.Udieresis=722,a.aogonek=500,a.Uacute=722,a.uogonek=556,a.Edieresis=667,a.Dcroat=722,a.commaaccent=250,a.copyright=747,a.Emacron=667,a.ccaron=444,a.aring=500,a.Ncommaaccent=722,a.lacute=278,a.agrave=500,a.Tcommaaccent=611,a.Cacute=667,a.atilde=500,a.Edotaccent=667,a.scaron=389,a.scedilla=389,a.iacute=278,a.lozenge=494,a.Rcaron=667,a.Gcommaaccent=722,a.ucircumflex=556,a.acircumflex=500,a.Amacron=667,a.rcaron=389,a.ccedilla=444,a.Zdotaccent=611,a.Thorn=611,a.Omacron=722,a.Racute=667,a.Sacute=556,a.dcaron=608,a.Umacron=722,a.uring=556,a.threesuperior=300,a.Ograve=722,a.Agrave=667,a.Abreve=667,a.multiply=570,a.uacute=556,a.Tcaron=611,a.partialdiff=494,a.ydieresis=444,a.Nacute=722,a.icircumflex=278,a.Ecircumflex=667,a.adieresis=500,a.edieresis=444,
a.cacute=444,a.nacute=556,a.umacron=556,a.Ncaron=722,a.Iacute=389,a.plusminus=570,a.brokenbar=220,a.registered=747,a.Gbreve=722,a.Idotaccent=389,a.summation=600,a.Egrave=667,a.racute=389,a.omacron=500,a.Zacute=611,a.Zcaron=611,a.greaterequal=549,a.Eth=722,a.Ccedilla=667,a.lcommaaccent=278,a.tcaron=366,a.eogonek=444,a.Uogonek=722,a.Aacute=667,a.Adieresis=667,a.egrave=444,a.zacute=389,a.iogonek=278,a.Oacute=722,a.oacute=500,a.amacron=500,a.sacute=389,a.idieresis=278,a.Ocircumflex=722,a.Ugrave=722,a.Delta=612,a.thorn=500,a.twosuperior=300,a.Odieresis=722,a.mu=576,a.igrave=278,a.ohungarumlaut=500,a.Eogonek=667,a.dcroat=500,a.threequarters=750,a.Scedilla=556,a.lcaron=382,a.Kcommaaccent=667,a.Lacute=611,a.trademark=1e3,a.edotaccent=444,a.Igrave=389,a.Imacron=389,a.Lcaron=611,a.onehalf=750,a.lessequal=549,a.ocircumflex=500,a.ntilde=556,a.Uhungarumlaut=722,a.Eacute=667,a.emacron=444,a.gbreve=500,a.onequarter=750,a.Scaron=556,a.Scommaaccent=556,a.Ohungarumlaut=722,a.degree=400,a.ograve=500,a.Ccaron=667,a.ugrave=556,a.radical=549,a.Dcaron=722,a.rcommaaccent=389,a.Ntilde=722,a.otilde=500,a.Rcommaaccent=667,a.Lcommaaccent=611,a.Atilde=667,a.Aogonek=667,a.Aring=667,a.Otilde=722,a.zdotaccent=389,a.Ecaron=667,a.Iogonek=389,a.kcommaaccent=500,a.minus=606,a.Icircumflex=389,a.ncaron=556,a.tcommaaccent=278,a.logicalnot=606,a.odieresis=500,a.udieresis=556,a.notequal=549,a.gcommaaccent=500,a.eth=500,a.zcaron=389,a.ncommaaccent=556,a.onesuperior=300,a.imacron=278,a.Euro=500}),a["Times-Italic"]=c(function(a){a.space=250,a.exclam=333,a.quotedbl=420,a.numbersign=500,a.dollar=500,a.percent=833,a.ampersand=778,a.quoteright=333,a.parenleft=333,a.parenright=333,a.asterisk=500,a.plus=675,a.comma=250,a.hyphen=333,a.period=250,a.slash=278,a.zero=500,a.one=500,a.two=500,a.three=500,a.four=500,a.five=500,a.six=500,a.seven=500,a.eight=500,a.nine=500,a.colon=333,a.semicolon=333,a.less=675,a.equal=675,a.greater=675,a.question=500,a.at=920,a.A=611,a.B=611,a.C=667,a.D=722,a.E=611,a.F=611,a.G=722,a.H=722,a.I=333,a.J=444,a.K=667,a.L=556,a.M=833,a.N=667,a.O=722,a.P=611,a.Q=722,a.R=611,a.S=500,a.T=556,a.U=722,a.V=611,a.W=833,a.X=611,a.Y=556,a.Z=556,a.bracketleft=389,a.backslash=278,a.bracketright=389,a.asciicircum=422,a.underscore=500,a.quoteleft=333,a.a=500,a.b=500,a.c=444,a.d=500,a.e=444,a.f=278,a.g=500,a.h=500,a.i=278,a.j=278,a.k=444,a.l=278,a.m=722,a.n=500,a.o=500,a.p=500,a.q=500,a.r=389,a.s=389,a.t=278,a.u=500,a.v=444,a.w=667,a.x=444,a.y=444,a.z=389,a.braceleft=400,a.bar=275,a.braceright=400,a.asciitilde=541,a.exclamdown=389,a.cent=500,a.sterling=500,a.fraction=167,a.yen=500,a.florin=500,a.section=500,a.currency=500,a.quotesingle=214,a.quotedblleft=556,a.guillemotleft=500,a.guilsinglleft=333,a.guilsinglright=333,a.fi=500,a.fl=500,a.endash=500,a.dagger=500,a.daggerdbl=500,a.periodcentered=250,a.paragraph=523,a.bullet=350,a.quotesinglbase=333,a.quotedblbase=556,a.quotedblright=556,a.guillemotright=500,a.ellipsis=889,a.perthousand=1e3,a.questiondown=500,a.grave=333,a.acute=333,a.circumflex=333,a.tilde=333,a.macron=333,a.breve=333,a.dotaccent=333,a.dieresis=333,a.ring=333,a.cedilla=333,a.hungarumlaut=333,a.ogonek=333,a.caron=333,a.emdash=889,a.AE=889,a.ordfeminine=276,a.Lslash=556,a.Oslash=722,a.OE=944,a.ordmasculine=310,a.ae=667,a.dotlessi=278,a.lslash=278,a.oslash=500,a.oe=667,a.germandbls=500,a.Idieresis=333,a.eacute=444,a.abreve=500,a.uhungarumlaut=500,a.ecaron=444,a.Ydieresis=556,a.divide=675,a.Yacute=556,a.Acircumflex=611,a.aacute=500,a.Ucircumflex=722,a.yacute=444,a.scommaaccent=389,a.ecircumflex=444,a.Uring=722,a.Udieresis=722,a.aogonek=500,a.Uacute=722,a.uogonek=500,a.Edieresis=611,a.Dcroat=722,a.commaaccent=250,a.copyright=760,a.Emacron=611,a.ccaron=444,a.aring=500,a.Ncommaaccent=667,a.lacute=278,a.agrave=500,a.Tcommaaccent=556,a.Cacute=667,a.atilde=500,a.Edotaccent=611,a.scaron=389,a.scedilla=389,a.iacute=278,a.lozenge=471,a.Rcaron=611,a.Gcommaaccent=722,a.ucircumflex=500,a.acircumflex=500,a.Amacron=611,a.rcaron=389,a.ccedilla=444,a.Zdotaccent=556,a.Thorn=611,a.Omacron=722,a.Racute=611,a.Sacute=500,a.dcaron=544,a.Umacron=722,a.uring=500,a.threesuperior=300,a.Ograve=722,a.Agrave=611,a.Abreve=611,a.multiply=675,a.uacute=500,a.Tcaron=556,a.partialdiff=476,a.ydieresis=444,a.Nacute=667,a.icircumflex=278,a.Ecircumflex=611,a.adieresis=500,a.edieresis=444,a.cacute=444,a.nacute=500,a.umacron=500,a.Ncaron=667,a.Iacute=333,a.plusminus=675,a.brokenbar=275,a.registered=760,a.Gbreve=722,a.Idotaccent=333,a.summation=600,a.Egrave=611,a.racute=389,a.omacron=500,a.Zacute=556,a.Zcaron=556,a.greaterequal=549,a.Eth=722,a.Ccedilla=667,a.lcommaaccent=278,a.tcaron=300,a.eogonek=444,a.Uogonek=722,a.Aacute=611,a.Adieresis=611,a.egrave=444,a.zacute=389,a.iogonek=278,a.Oacute=722,a.oacute=500,a.amacron=500,a.sacute=389,a.idieresis=278,a.Ocircumflex=722,a.Ugrave=722,a.Delta=612,a.thorn=500,a.twosuperior=300,a.Odieresis=722,a.mu=500,a.igrave=278,a.ohungarumlaut=500,a.Eogonek=611,a.dcroat=500,a.threequarters=750,a.Scedilla=500,a.lcaron=300,a.Kcommaaccent=667,a.Lacute=556,a.trademark=980,a.edotaccent=444,a.Igrave=333,a.Imacron=333,a.Lcaron=611,a.onehalf=750,a.lessequal=549,a.ocircumflex=500,a.ntilde=500,a.Uhungarumlaut=722,a.Eacute=611,a.emacron=444,a.gbreve=500,a.onequarter=750,a.Scaron=500,a.Scommaaccent=500,a.Ohungarumlaut=722,a.degree=400,a.ograve=500,a.Ccaron=667,a.ugrave=500,a.radical=453,a.Dcaron=722,a.rcommaaccent=389,a.Ntilde=667,a.otilde=500,a.Rcommaaccent=611,a.Lcommaaccent=556,a.Atilde=611,a.Aogonek=611,a.Aring=611,a.Otilde=722,a.zdotaccent=389,a.Ecaron=611,a.Iogonek=333,a.kcommaaccent=444,a.minus=675,a.Icircumflex=333,a.ncaron=500,a.tcommaaccent=278,a.logicalnot=675,a.odieresis=500,a.udieresis=500,a.notequal=549,a.gcommaaccent=500,a.eth=500,a.zcaron=389,a.ncommaaccent=500,a.onesuperior=300,a.imacron=278,a.Euro=500}),a.ZapfDingbats=c(function(a){a.space=278,a.a1=974,a.a2=961,a.a202=974,a.a3=980,a.a4=719,a.a5=789,a.a119=790,a.a118=791,a.a117=690,a.a11=960,a.a12=939,a.a13=549,a.a14=855,a.a15=911,a.a16=933,a.a105=911,a.a17=945,a.a18=974,a.a19=755,a.a20=846,a.a21=762,a.a22=761,a.a23=571,a.a24=677,a.a25=763,a.a26=760,a.a27=759,a.a28=754,a.a6=494,a.a7=552,a.a8=537,a.a9=577,a.a10=692,a.a29=786,a.a30=788,a.a31=788,a.a32=790,a.a33=793,a.a34=794,a.a35=816,a.a36=823,a.a37=789,a.a38=841,a.a39=823,a.a40=833,a.a41=816,a.a42=831,a.a43=923,a.a44=744,a.a45=723,a.a46=749,a.a47=790,a.a48=792,a.a49=695,a.a50=776,a.a51=768,a.a52=792,a.a53=759,a.a54=707,a.a55=708,a.a56=682,a.a57=701,a.a58=826,a.a59=815,a.a60=789,a.a61=789,a.a62=707,a.a63=687,a.a64=696,a.a65=689,a.a66=786,a.a67=787,a.a68=713,a.a69=791,a.a70=785,a.a71=791,a.a72=873,a.a73=761,a.a74=762,a.a203=762,a.a75=759,a.a204=759,a.a76=892,a.a77=892,a.a78=788,a.a79=784,a.a81=438,a.a82=138,a.a83=277,a.a84=415,a.a97=392,a.a98=392,a.a99=668,a.a100=668,a.a89=390,a.a90=390,a.a93=317,a.a94=317,a.a91=276,a.a92=276,a.a205=509,a.a85=509,a.a206=410,a.a86=410,a.a87=234,a.a88=234,a.a95=334,a.a96=334,a.a101=732,a.a102=544,a.a103=544,a.a104=910,a.a106=667,a.a107=760,a.a108=760,a.a112=776,a.a111=595,a.a110=694,a.a109=626,a.a120=788,a.a121=788,a.a122=788,a.a123=788,a.a124=788,a.a125=788,a.a126=788,a.a127=788,a.a128=788,a.a129=788,a.a130=788,a.a131=788,a.a132=788,a.a133=788,a.a134=788,a.a135=788,a.a136=788,a.a137=788,a.a138=788,a.a139=788,a.a140=788,a.a141=788,a.a142=788,a.a143=788,a.a144=788,a.a145=788,a.a146=788,a.a147=788,a.a148=788,a.a149=788,a.a150=788,a.a151=788,a.a152=788,a.a153=788,a.a154=788,a.a155=788,a.a156=788,a.a157=788,a.a158=788,a.a159=788,a.a160=894,a.a161=838,a.a163=1016,a.a164=458,a.a196=748,a.a165=924,a.a192=748,a.a166=918,a.a167=927,a.a168=928,a.a169=928,a.a170=834,a.a171=873,a.a172=828,a.a173=924,a.a162=924,a.a174=917,a.a175=930,a.a176=931,a.a177=463,a.a178=883,a.a179=836,a.a193=836,a.a180=867,a.a199=867,a.a181=696,a.a200=696,a.a182=874,a.a201=874,a.a183=760,a.a184=946,a.a197=771,a.a185=865,a.a194=771,a.a198=888,a.a186=967,a.a195=888,a.a187=831,a.a188=873,a.a189=927,a.a190=970,a.a191=918})});a.getMetrics=d}),function(a,b){b(a.pdfjsCoreMurmurHash3={},a.pdfjsSharedUtil)}(this,function(a,b){var c=b.Uint32ArrayView,d=function(a){function b(a){var b=3285377520;this.h1=a?4294967295&a:b,this.h2=a?4294967295&a:b}
// Workaround for missing math precison in JS.
var d=4294901760,e=65535,f=!1;
// old webkits have issues with non-aligned arrays
try{new Uint32Array(new Uint8Array(5).buffer,0,1)}catch(g){f=!0}return b.prototype={update:function(a){var b,g=f;if("string"==typeof a){var h=new Uint8Array(2*a.length),i=0;for(b=0;b<a.length;b++){var j=a.charCodeAt(b);255>=j?h[i++]=j:(h[i++]=j>>>8,h[i++]=255&j)}}else if(a instanceof Uint8Array)h=a,i=h.length;else{if(!("object"==typeof a&&"length"in a))throw new Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.");h=a,i=h.length,g=!0}var k=i>>2,l=i-4*k,m=g?new c(h,k):new Uint32Array(h.buffer,0,k),n=0,o=0,p=this.h1,q=this.h2,r=3432918353,s=461845907,t=r&e,u=s&e;for(b=0;k>b;b++)1&b?(n=m[b],n=n*r&d|n*t&e,n=n<<15|n>>>17,n=n*s&d|n*u&e,p^=n,p=p<<13|p>>>19,p=5*p+3864292196):(o=m[b],o=o*r&d|o*t&e,o=o<<15|o>>>17,o=o*s&d|o*u&e,q^=o,q=q<<13|q>>>19,q=5*q+3864292196);switch(n=0,l){case 3:n^=h[4*k+2]<<16;/* falls through */
case 2:n^=h[4*k+1]<<8;/* falls through */
case 1:n^=h[4*k],/* falls through */
n=n*r&d|n*t&e,n=n<<15|n>>>17,n=n*s&d|n*u&e,1&k?p^=n:q^=n}return this.h1=p,this.h2=q,this},hexdigest:function(){var a=this.h1,b=this.h2;a^=b>>>1,a=3981806797*a&d|36045*a&e,b=4283543511*b&d|(2950163797*(b<<16|a>>>16)&d)>>>16,a^=b>>>1,a=444984403*a&d|60499*a&e,b=3301882366*b&d|(3120437893*(b<<16|a>>>16)&d)>>>16,a^=b>>>1;for(var c=0,f=[a,b],g="";c<f.length;c++){for(var h=(f[c]>>>0).toString(16);h.length<8;)h="0"+h;g+=h}return g}},b}();a.MurmurHash3_64=d}),function(a,b){b(a.pdfjsCorePrimitives={},a.pdfjsSharedUtil)}(this,function(a,b){function c(a){return a instanceof i}function d(a,b){return a instanceof j&&(void 0===b||a.cmd===b)}function e(a,b){if(!(a instanceof k))return!1;if(!b)return!0;var d=a.get("Type");return c(d)&&d.name===b}function f(a){return a instanceof l}function g(a){return"object"==typeof a&&null!==a&&void 0!==a.getBytes}var h=b.isArray,i=function(){function a(a){this.name=a}a.prototype={};var b=Object.create(null);return a.get=function(c){var d=b[c];return d?d:b[c]=new a(c)},a}(),j=function(){function a(a){this.cmd=a}a.prototype={};var b=Object.create(null);return a.get=function(c){var d=b[c];return d?d:b[c]=new a(c)},a}(),k=function(){
// xref is optional
function a(a){
// Map should only be used internally, use functions below to access.
this.map=Object.create(null),this.xref=a,this.objId=null,this.__nonSerializable__=b}var b=function(){return b};return a.prototype={assignXref:function(a){this.xref=a},
// automatically dereferences Ref objects
get:function(a,b,c){var d,e=this.xref;return"undefined"!=typeof(d=this.map[a])||a in this.map||"undefined"==typeof b?e?e.fetchIfRef(d):d:"undefined"!=typeof(d=this.map[b])||b in this.map||"undefined"==typeof c?e?e.fetchIfRef(d):d:(d=this.map[c]||null,e?e.fetchIfRef(d):d)},
// Same as get(), but returns a promise and uses fetchIfRefAsync().
getAsync:function(a,b,c){var d,e=this.xref;return"undefined"!=typeof(d=this.map[a])||a in this.map||"undefined"==typeof b?e?e.fetchIfRefAsync(d):Promise.resolve(d):"undefined"!=typeof(d=this.map[b])||b in this.map||"undefined"==typeof c?e?e.fetchIfRefAsync(d):Promise.resolve(d):(d=this.map[c]||null,e?e.fetchIfRefAsync(d):Promise.resolve(d))},
// Same as get(), but dereferences all elements if the result is an Array.
getArray:function(a,b,c){var d=this.get(a,b,c),e=this.xref;if(!h(d)||!e)return d;d=d.slice();// Ensure that we don't modify the Dict data.
for(var g=0,i=d.length;i>g;g++)f(d[g])&&(d[g]=e.fetch(d[g]));return d},
// no dereferencing
getRaw:function(a){return this.map[a]},getKeys:function(){return Object.keys(this.map)},set:function(a,b){this.map[a]=b},has:function(a){return a in this.map},forEach:function(a){for(var b in this.map)a(b,this.get(b))}},a.empty=new a(null),a.merge=function(b,c){for(var d=new a(b),f=0,g=c.length;g>f;f++){var h=c[f];if(e(h))for(var i in h.map)d.map[i]||(d.map[i]=h.map[i])}return d},a}(),l=function(){function a(a,b){this.num=a,this.gen=b}return a.prototype={toString:function(){
// This function is hot, so we make the string as compact as possible.
// |this.gen| is almost always zero, so we treat that case specially.
var a=this.num+"R";return 0!==this.gen&&(a+=this.gen),a}},a}(),m=function(){function a(){this.dict=Object.create(null)}return a.prototype={has:function(a){return a.toString()in this.dict},put:function(a){this.dict[a.toString()]=!0},remove:function(a){delete this.dict[a.toString()]}},a}(),n=function(){function a(){this.dict=Object.create(null)}return a.prototype={get:function(a){return this.dict[a.toString()]},has:function(a){return a.toString()in this.dict},put:function(a,b){this.dict[a.toString()]=b},putAlias:function(a,b){this.dict[a.toString()]=this.get(b)},forEach:function(a,b){for(var c in this.dict)a.call(b,this.dict[c])},clear:function(){this.dict=Object.create(null)}},a}();a.Cmd=j,a.Dict=k,a.Name=i,a.Ref=l,a.RefSet=m,a.RefSetCache=n,a.isCmd=d,a.isDict=e,a.isName=c,a.isRef=f,a.isStream=g}),function(a,b){b(a.pdfjsCoreStandardFonts={},a.pdfjsSharedUtil)}(this,function(a,b){var c=b.getLookupTableFactory,d=c(function(a){a.ArialNarrow="Helvetica",a["ArialNarrow-Bold"]="Helvetica-Bold",a["ArialNarrow-BoldItalic"]="Helvetica-BoldOblique",a["ArialNarrow-Italic"]="Helvetica-Oblique",a.ArialBlack="Helvetica",a["ArialBlack-Bold"]="Helvetica-Bold",a["ArialBlack-BoldItalic"]="Helvetica-BoldOblique",a["ArialBlack-Italic"]="Helvetica-Oblique",a.Arial="Helvetica",a["Arial-Bold"]="Helvetica-Bold",a["Arial-BoldItalic"]="Helvetica-BoldOblique",a["Arial-Italic"]="Helvetica-Oblique",a["Arial-BoldItalicMT"]="Helvetica-BoldOblique",a["Arial-BoldMT"]="Helvetica-Bold",a["Arial-ItalicMT"]="Helvetica-Oblique",a.ArialMT="Helvetica",a["Courier-Bold"]="Courier-Bold",a["Courier-BoldItalic"]="Courier-BoldOblique",a["Courier-Italic"]="Courier-Oblique",a.CourierNew="Courier",a["CourierNew-Bold"]="Courier-Bold",a["CourierNew-BoldItalic"]="Courier-BoldOblique",a["CourierNew-Italic"]="Courier-Oblique",a["CourierNewPS-BoldItalicMT"]="Courier-BoldOblique",a["CourierNewPS-BoldMT"]="Courier-Bold",a["CourierNewPS-ItalicMT"]="Courier-Oblique",a.CourierNewPSMT="Courier",a.Helvetica="Helvetica",a["Helvetica-Bold"]="Helvetica-Bold",a["Helvetica-BoldItalic"]="Helvetica-BoldOblique",a["Helvetica-BoldOblique"]="Helvetica-BoldOblique",a["Helvetica-Italic"]="Helvetica-Oblique",a["Helvetica-Oblique"]="Helvetica-Oblique",a["Symbol-Bold"]="Symbol",a["Symbol-BoldItalic"]="Symbol",a["Symbol-Italic"]="Symbol",a.TimesNewRoman="Times-Roman",a["TimesNewRoman-Bold"]="Times-Bold",a["TimesNewRoman-BoldItalic"]="Times-BoldItalic",a["TimesNewRoman-Italic"]="Times-Italic",a.TimesNewRomanPS="Times-Roman",a["TimesNewRomanPS-Bold"]="Times-Bold",a["TimesNewRomanPS-BoldItalic"]="Times-BoldItalic",a["TimesNewRomanPS-BoldItalicMT"]="Times-BoldItalic",a["TimesNewRomanPS-BoldMT"]="Times-Bold",a["TimesNewRomanPS-Italic"]="Times-Italic",a["TimesNewRomanPS-ItalicMT"]="Times-Italic",a.TimesNewRomanPSMT="Times-Roman",a["TimesNewRomanPSMT-Bold"]="Times-Bold",a["TimesNewRomanPSMT-BoldItalic"]="Times-BoldItalic",a["TimesNewRomanPSMT-Italic"]="Times-Italic"}),e=c(function(a){a.CenturyGothic="Helvetica",a["CenturyGothic-Bold"]="Helvetica-Bold",a["CenturyGothic-BoldItalic"]="Helvetica-BoldOblique",a["CenturyGothic-Italic"]="Helvetica-Oblique",a.ComicSansMS="Comic Sans MS",a["ComicSansMS-Bold"]="Comic Sans MS-Bold",a["ComicSansMS-BoldItalic"]="Comic Sans MS-BoldItalic",a["ComicSansMS-Italic"]="Comic Sans MS-Italic",a.LucidaConsole="Courier",a["LucidaConsole-Bold"]="Courier-Bold",a["LucidaConsole-BoldItalic"]="Courier-BoldOblique",a["LucidaConsole-Italic"]="Courier-Oblique",a["MS-Gothic"]="MS Gothic",a["MS-Gothic-Bold"]="MS Gothic-Bold",a["MS-Gothic-BoldItalic"]="MS Gothic-BoldItalic",a["MS-Gothic-Italic"]="MS Gothic-Italic",a["MS-Mincho"]="MS Mincho",a["MS-Mincho-Bold"]="MS Mincho-Bold",a["MS-Mincho-BoldItalic"]="MS Mincho-BoldItalic",a["MS-Mincho-Italic"]="MS Mincho-Italic",a["MS-PGothic"]="MS PGothic",a["MS-PGothic-Bold"]="MS PGothic-Bold",a["MS-PGothic-BoldItalic"]="MS PGothic-BoldItalic",a["MS-PGothic-Italic"]="MS PGothic-Italic",a["MS-PMincho"]="MS PMincho",a["MS-PMincho-Bold"]="MS PMincho-Bold",a["MS-PMincho-BoldItalic"]="MS PMincho-BoldItalic",a["MS-PMincho-Italic"]="MS PMincho-Italic",a.Wingdings="ZapfDingbats"}),f=c(function(a){a["Adobe Jenson"]=!0,a["Adobe Text"]=!0,a.Albertus=!0,a.Aldus=!0,a.Alexandria=!0,a.Algerian=!0,a["American Typewriter"]=!0,a.Antiqua=!0,a.Apex=!0,a.Arno=!0,a.Aster=!0,a.Aurora=!0,a.Baskerville=!0,a.Bell=!0,a.Bembo=!0,a["Bembo Schoolbook"]=!0,a.Benguiat=!0,a["Berkeley Old Style"]=!0,a["Bernhard Modern"]=!0,a["Berthold City"]=!0,a.Bodoni=!0,a["Bauer Bodoni"]=!0,a["Book Antiqua"]=!0,a.Bookman=!0,a["Bordeaux Roman"]=!0,a["Californian FB"]=!0,a.Calisto=!0,a.Calvert=!0,a.Capitals=!0,a.Cambria=!0,a.Cartier=!0,a.Caslon=!0,a.Catull=!0,a.Centaur=!0,a["Century Old Style"]=!0,a["Century Schoolbook"]=!0,a.Chaparral=!0,a["Charis SIL"]=!0,a.Cheltenham=!0,a["Cholla Slab"]=!0,a.Clarendon=!0,a.Clearface=!0,a.Cochin=!0,a.Colonna=!0,a["Computer Modern"]=!0,a["Concrete Roman"]=!0,a.Constantia=!0,a["Cooper Black"]=!0,a.Corona=!0,a.Ecotype=!0,a.Egyptienne=!0,a.Elephant=!0,a.Excelsior=!0,a.Fairfield=!0,a["FF Scala"]=!0,a.Folkard=!0,a.Footlight=!0,a.FreeSerif=!0,a["Friz Quadrata"]=!0,a.Garamond=!0,a.Gentium=!0,a.Georgia=!0,a.Gloucester=!0,a["Goudy Old Style"]=!0,a["Goudy Schoolbook"]=!0,a["Goudy Pro Font"]=!0,a.Granjon=!0,a["Guardian Egyptian"]=!0,a.Heather=!0,a.Hercules=!0,a["High Tower Text"]=!0,a.Hiroshige=!0,a["Hoefler Text"]=!0,a["Humana Serif"]=!0,a.Imprint=!0,a["Ionic No. 5"]=!0,a.Janson=!0,a.Joanna=!0,a.Korinna=!0,a.Lexicon=!0,a["Liberation Serif"]=!0,a["Linux Libertine"]=!0,a.Literaturnaya=!0,a.Lucida=!0,a["Lucida Bright"]=!0,a.Melior=!0,a.Memphis=!0,a.Miller=!0,a.Minion=!0,a.Modern=!0,a["Mona Lisa"]=!0,a["Mrs Eaves"]=!0,a["MS Serif"]=!0,a["Museo Slab"]=!0,a["New York"]=!0,a["Nimbus Roman"]=!0,a["NPS Rawlinson Roadway"]=!0,a.Palatino=!0,a.Perpetua=!0,a.Plantin=!0,a["Plantin Schoolbook"]=!0,a.Playbill=!0,a["Poor Richard"]=!0,a["Rawlinson Roadway"]=!0,a.Renault=!0,a.Requiem=!0,a.Rockwell=!0,a.Roman=!0,a["Rotis Serif"]=!0,a.Sabon=!0,a.Scala=!0,a.Seagull=!0,a.Sistina=!0,a.Souvenir=!0,a.STIX=!0,a["Stone Informal"]=!0,a["Stone Serif"]=!0,a.Sylfaen=!0,a.Times=!0,a.Trajan=!0,a["Trinité"]=!0,a["Trump Mediaeval"]=!0,a.Utopia=!0,a["Vale Type"]=!0,a["Bitstream Vera"]=!0,a["Vera Serif"]=!0,a.Versailles=!0,a.Wanted=!0,a.Weiss=!0,a["Wide Latin"]=!0,a.Windsor=!0,a.XITS=!0}),g=c(function(a){a.Dingbats=!0,a.Symbol=!0,a.ZapfDingbats=!0}),h=c(function(a){a[2]=10,a[3]=32,a[4]=33,a[5]=34,a[6]=35,a[7]=36,a[8]=37,a[9]=38,a[10]=39,a[11]=40,a[12]=41,a[13]=42,a[14]=43,a[15]=44,a[16]=45,a[17]=46,a[18]=47,a[19]=48,a[20]=49,a[21]=50,a[22]=51,a[23]=52,a[24]=53,a[25]=54,a[26]=55,a[27]=56,a[28]=57,a[29]=58,a[30]=894,a[31]=60,a[32]=61,a[33]=62,a[34]=63,a[35]=64,a[36]=65,a[37]=66,a[38]=67,a[39]=68,a[40]=69,a[41]=70,a[42]=71,a[43]=72,a[44]=73,a[45]=74,a[46]=75,a[47]=76,a[48]=77,a[49]=78,a[50]=79,a[51]=80,a[52]=81,a[53]=82,a[54]=83,a[55]=84,a[56]=85,a[57]=86,a[58]=87,a[59]=88,a[60]=89,a[61]=90,a[62]=91,a[63]=92,a[64]=93,a[65]=94,a[66]=95,a[67]=96,a[68]=97,a[69]=98,a[70]=99,a[71]=100,a[72]=101,a[73]=102,a[74]=103,a[75]=104,a[76]=105,a[77]=106,a[78]=107,a[79]=108,a[80]=109,a[81]=110,a[82]=111,a[83]=112,a[84]=113,a[85]=114,a[86]=115,a[87]=116,a[88]=117,a[89]=118,a[90]=119,a[91]=120,a[92]=121,a[93]=122,a[94]=123,a[95]=124,a[96]=125,a[97]=126,a[98]=196,a[99]=197,a[100]=199,a[101]=201,a[102]=209,a[103]=214,a[104]=220,a[105]=225,a[106]=224,a[107]=226,a[108]=228,a[109]=227,a[110]=229,a[111]=231,a[112]=233,a[113]=232,a[114]=234,a[115]=235,a[116]=237,a[117]=236,a[118]=238,a[119]=239,a[120]=241,a[121]=243,a[122]=242,a[123]=244,a[124]=246,a[125]=245,a[126]=250,a[127]=249,a[128]=251,a[129]=252,a[130]=8224,a[131]=176,a[132]=162,a[133]=163,a[134]=167,a[135]=8226,a[136]=182,a[137]=223,a[138]=174,a[139]=169,a[140]=8482,a[141]=180,a[142]=168,a[143]=8800,a[144]=198,a[145]=216,a[146]=8734,a[147]=177,a[148]=8804,a[149]=8805,a[150]=165,a[151]=181,a[152]=8706,a[153]=8721,a[154]=8719,a[156]=8747,a[157]=170,a[158]=186,a[159]=8486,a[160]=230,a[161]=248,a[162]=191,a[163]=161,a[164]=172,a[165]=8730,a[166]=402,a[167]=8776,a[168]=8710,a[169]=171,a[170]=187,a[171]=8230,a[210]=218,a[223]=711,a[224]=321,a[225]=322,a[227]=353,a[229]=382,a[234]=253,a[252]=263,a[253]=268,a[254]=269,a[258]=258,a[260]=260,a[261]=261,a[265]=280,a[266]=281,a[268]=283,a[269]=313,a[275]=323,a[276]=324,a[278]=328,a[284]=345,a[285]=346,a[286]=347,a[292]=367,a[295]=377,a[296]=378,a[298]=380,a[305]=963,a[306]=964,a[307]=966,a[308]=8215,a[309]=8252,a[310]=8319,a[311]=8359,a[312]=8592,a[313]=8593,a[337]=9552,a[493]=1039,a[494]=1040,a[705]=1524,a[706]=8362,a[710]=64288,a[711]=64298,a[759]=1617,a[761]=1776,a[763]=1778,a[775]=1652,a[777]=1764,a[778]=1780,a[779]=1781,a[780]=1782,a[782]=771,a[783]=64726,a[786]=8363,a[788]=8532,a[790]=768,a[791]=769,a[792]=768,a[795]=803,a[797]=64336,a[798]=64337,a[799]=64342,a[800]=64343,a[801]=64344,a[802]=64345,a[803]=64362,a[804]=64363,a[805]=64364,a[2424]=7821,a[2425]=7822,a[2426]=7823,a[2427]=7824,a[2428]=7825,a[2429]=7826,a[2430]=7827,a[2433]=7682,a[2678]=8045,a[2679]=8046,a[2830]=1552,a[2838]=686,a[2840]=751,a[2842]=753,a[2843]=754,a[2844]=755,a[2846]=757,a[2856]=767,a[2857]=848,a[2858]=849,a[2862]=853,a[2863]=854,a[2864]=855,a[2865]=861,a[2866]=862,a[2906]=7460,a[2908]=7462,a[2909]=7463,a[2910]=7464,a[2912]=7466,a[2913]=7467,a[2914]=7468,a[2916]=7470,a[2917]=7471,a[2918]=7472,a[2920]=7474,a[2921]=7475,a[2922]=7476,a[2924]=7478,a[2925]=7479,a[2926]=7480,a[2928]=7482,a[2929]=7483,a[2930]=7484,a[2932]=7486,a[2933]=7487,a[2934]=7488,a[2936]=7490,a[2937]=7491,a[2938]=7492,a[2940]=7494,a[2941]=7495,a[2942]=7496,a[2944]=7498,a[2946]=7500,a[2948]=7502,a[2950]=7504,a[2951]=7505,a[2952]=7506,a[2954]=7508,a[2955]=7509,a[2956]=7510,a[2958]=7512,a[2959]=7513,a[2960]=7514,a[2962]=7516,a[2963]=7517,a[2964]=7518,a[2966]=7520,a[2967]=7521,a[2968]=7522,a[2970]=7524,a[2971]=7525,a[2972]=7526,a[2974]=7528,a[2975]=7529,a[2976]=7530,a[2978]=1537,a[2979]=1538,a[2980]=1539,a[2982]=1549,a[2983]=1551,a[2984]=1552,a[2986]=1554,a[2987]=1555,a[2988]=1556,a[2990]=1623,a[2991]=1624,a[2995]=1775,a[2999]=1791,a[3002]=64290,a[3003]=64291,a[3004]=64292,a[3006]=64294,a[3007]=64295,a[3008]=64296,a[3011]=1900,a[3014]=8223,a[3015]=8244,a[3017]=7532,a[3018]=7533,a[3019]=7534,a[3075]=7590,a[3076]=7591,a[3079]=7594,a[3080]=7595,a[3083]=7598,a[3084]=7599,a[3087]=7602,a[3088]=7603,a[3091]=7606,a[3092]=7607,a[3095]=7610,a[3096]=7611,a[3099]=7614,a[3100]=7615,a[3103]=7618,a[3104]=7619,a[3107]=8337,a[3108]=8338,a[3116]=1884,a[3119]=1885,a[3120]=1885,a[3123]=1886,a[3124]=1886,a[3127]=1887,a[3128]=1887,a[3131]=1888,a[3132]=1888,a[3135]=1889,a[3136]=1889,a[3139]=1890,a[3140]=1890,a[3143]=1891,a[3144]=1891,a[3147]=1892,a[3148]=1892,a[3153]=580,a[3154]=581,a[3157]=584,a[3158]=585,a[3161]=588,a[3162]=589,a[3165]=891,a[3166]=892,a[3169]=1274,a[3170]=1275,a[3173]=1278,a[3174]=1279,a[3181]=7622,a[3182]=7623,a[3282]=11799,a[3316]=578,a[3379]=42785,a[3393]=1159,a[3416]=8377}),i=c(function(a){a[227]=322,a[264]=261,a[291]=346});a.getStdFontMap=d,a.getNonStdFontMap=e,a.getSerifFonts=f,a.getSymbolsFonts=g,a.getGlyphMapForStandardFonts=h,a.getSupplementalGlyphMapForArialBlack=i}),function(a,b){b(a.pdfjsCoreUnicode={},a.pdfjsSharedUtil)}(this,function(a,b){function c(a){return a>=65520&&65535>=a?0:a>=62976&&63743>=a?i()[a]||a:a}function d(a,b){var c=b[a];if(void 0!==c)return c;if(!a)return-1;
// Try to recover valid Unicode values from 'uniXXXX'/'uXXXX{XX}' glyphs.
if("u"===a[0]){var d,e=a.length;if(7===e&&"n"===a[1]&&"i"===a[2])// 'uniXXXX'
d=a.substr(3);else{if(!(e>=5&&7>=e))return-1;// 'uXXXX{XX}'
d=a.substr(1)}
// Check for upper-case hexadecimal characters, to avoid false positives.
if(d===d.toUpperCase()&&(c=parseInt(d,16),c>=0))return c}return-1}function e(a){for(var b=0,c=j.length;c>b;b++){var d=j[b];if(a>=d.begin&&a<d.end)return b}return-1}function f(a){var b=j[13];return a>=b.begin&&a<b.end?!0:(b=j[11],a>=b.begin&&a<b.end)}function g(a){var b=a.length;
//reverse an arabic ligature
if(1>=b||!f(a.charCodeAt(0)))return a;for(var c="",d=b-1;d>=0;d--)c+=a[d];return c}var h=b.getLookupTableFactory,i=h(function(a){a[63721]=169,// copyrightsans (0xF8E9) => copyright
a[63193]=169,// copyrightserif (0xF6D9) => copyright
a[63720]=174,// registersans (0xF8E8) => registered
a[63194]=174,// registerserif (0xF6DA) => registered
a[63722]=8482,// trademarksans (0xF8EA) => trademark
a[63195]=8482,// trademarkserif (0xF6DB) => trademark
a[63729]=9127,// bracelefttp (0xF8F1)
a[63730]=9128,// braceleftmid (0xF8F2)
a[63731]=9129,// braceleftbt (0xF8F3)
a[63740]=9131,// bracerighttp (0xF8FC)
a[63741]=9132,// bracerightmid (0xF8FD)
a[63742]=9133,// bracerightbt (0xF8FE)
a[63726]=9121,// bracketlefttp (0xF8EE)
a[63727]=9122,// bracketleftex (0xF8EF)
a[63728]=9123,// bracketleftbt (0xF8F0)
a[63737]=9124,// bracketrighttp (0xF8F9)
a[63738]=9125,// bracketrightex (0xF8FA)
a[63739]=9126,// bracketrightbt (0xF8FB)
a[63723]=9115,// parenlefttp (0xF8EB)
a[63724]=9116,// parenleftex (0xF8EC)
a[63725]=9117,// parenleftbt (0xF8ED)
a[63734]=9118,// parenrighttp (0xF8F6)
a[63735]=9119,// parenrightex (0xF8F7)
a[63736]=9120}),j=[{begin:0,end:127},// Basic Latin
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
{begin:8400,end:8447},// Combining Diacritical Marks
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
{begin:127024,end:127135}],k=h(function(a){a["¨"]=" ̈",a["¯"]=" ̄",a["´"]=" ́",a["µ"]="μ",a["¸"]=" ̧",a["Ĳ"]="IJ",a["ĳ"]="ij",a["Ŀ"]="L·",a["ŀ"]="l·",a["ŉ"]="ʼn",a["ſ"]="s",a["Ǆ"]="DŽ",a["ǅ"]="Dž",a["ǆ"]="dž",a["Ǉ"]="LJ",a["ǈ"]="Lj",a["ǉ"]="lj",a["Ǌ"]="NJ",a["ǋ"]="Nj",a["ǌ"]="nj",a["Ǳ"]="DZ",a["ǲ"]="Dz",a["ǳ"]="dz",a["˘"]=" ̆",a["˙"]=" ̇",a["˚"]=" ̊",a["˛"]=" ̨",a["˜"]=" ̃",a["˝"]=" ̋",a["ͺ"]=" ͅ",a["΄"]=" ́",a["ϐ"]="β",a["ϑ"]="θ",a["ϒ"]="Υ",a["ϕ"]="φ",a["ϖ"]="π",a["ϰ"]="κ",a["ϱ"]="ρ",a["ϲ"]="ς",a["ϴ"]="Θ",a["ϵ"]="ε",a["Ϲ"]="Σ",a["և"]="եւ",a["ٵ"]="اٴ",a["ٶ"]="وٴ",a["ٷ"]="ۇٴ",a["ٸ"]="يٴ",a["ำ"]="ํา",a["ຳ"]="ໍາ",a["ໜ"]="ຫນ",a["ໝ"]="ຫມ",a["ཷ"]="ྲཱྀ",a["ཹ"]="ླཱྀ",a["ẚ"]="aʾ",a["᾽"]=" ̓",a["᾿"]=" ̓",a["῀"]=" ͂",a["῾"]=" ̔",a[" "]=" ",a[" "]=" ",a[" "]=" ",a[" "]=" ",a[" "]=" ",a[" "]=" ",a[" "]=" ",a[" "]=" ",a["‗"]=" ̳",a["․"]=".",a["‥"]="..",a["…"]="...",a["″"]="′′",a["‴"]="′′′",a["‶"]="‵‵",a["‷"]="‵‵‵",a["‼"]="!!",a["‾"]=" ̅",a["⁇"]="??",a["⁈"]="?!",a["⁉"]="!?",a["⁗"]="′′′′",a[" "]=" ",a["₨"]="Rs",a["℀"]="a/c",a["℁"]="a/s",a["℃"]="°C",a["℅"]="c/o",a["℆"]="c/u",a["ℇ"]="Ɛ",a["℉"]="°F",a["№"]="No",a["℡"]="TEL",a["ℵ"]="א",a["ℶ"]="ב",a["ℷ"]="ג",a["ℸ"]="ד",a["℻"]="FAX",a["Ⅰ"]="I",a["Ⅱ"]="II",a["Ⅲ"]="III",a["Ⅳ"]="IV",a["Ⅴ"]="V",a["Ⅵ"]="VI",a["Ⅶ"]="VII",a["Ⅷ"]="VIII",a["Ⅸ"]="IX",a["Ⅹ"]="X",a["Ⅺ"]="XI",a["Ⅻ"]="XII",a["Ⅼ"]="L",a["Ⅽ"]="C",a["Ⅾ"]="D",a["Ⅿ"]="M",a["ⅰ"]="i",a["ⅱ"]="ii",a["ⅲ"]="iii",a["ⅳ"]="iv",a["ⅴ"]="v",a["ⅵ"]="vi",a["ⅶ"]="vii",a["ⅷ"]="viii",a["ⅸ"]="ix",a["ⅹ"]="x",a["ⅺ"]="xi",a["ⅻ"]="xii",a["ⅼ"]="l",a["ⅽ"]="c",a["ⅾ"]="d",a["ⅿ"]="m",a["∬"]="∫∫",a["∭"]="∫∫∫",a["∯"]="∮∮",a["∰"]="∮∮∮",a["⑴"]="(1)",a["⑵"]="(2)",a["⑶"]="(3)",a["⑷"]="(4)",a["⑸"]="(5)",a["⑹"]="(6)",a["⑺"]="(7)",a["⑻"]="(8)",a["⑼"]="(9)",a["⑽"]="(10)",a["⑾"]="(11)",a["⑿"]="(12)",a["⒀"]="(13)",a["⒁"]="(14)",a["⒂"]="(15)",a["⒃"]="(16)",a["⒄"]="(17)",a["⒅"]="(18)",a["⒆"]="(19)",a["⒇"]="(20)",a["⒈"]="1.",a["⒉"]="2.",a["⒊"]="3.",a["⒋"]="4.",a["⒌"]="5.",a["⒍"]="6.",a["⒎"]="7.",a["⒏"]="8.",a["⒐"]="9.",a["⒑"]="10.",a["⒒"]="11.",a["⒓"]="12.",a["⒔"]="13.",a["⒕"]="14.",a["⒖"]="15.",a["⒗"]="16.",a["⒘"]="17.",a["⒙"]="18.",a["⒚"]="19.",a["⒛"]="20.",a["⒜"]="(a)",a["⒝"]="(b)",a["⒞"]="(c)",a["⒟"]="(d)",a["⒠"]="(e)",a["⒡"]="(f)",a["⒢"]="(g)",a["⒣"]="(h)",a["⒤"]="(i)",a["⒥"]="(j)",a["⒦"]="(k)",a["⒧"]="(l)",a["⒨"]="(m)",a["⒩"]="(n)",a["⒪"]="(o)",a["⒫"]="(p)",a["⒬"]="(q)",a["⒭"]="(r)",a["⒮"]="(s)",a["⒯"]="(t)",a["⒰"]="(u)",a["⒱"]="(v)",a["⒲"]="(w)",a["⒳"]="(x)",a["⒴"]="(y)",a["⒵"]="(z)",a["⨌"]="∫∫∫∫",a["⩴"]="::=",a["⩵"]="==",a["⩶"]="===",a["⺟"]="母",a["⻳"]="龟",a["⼀"]="一",a["⼁"]="丨",a["⼂"]="丶",a["⼃"]="丿",a["⼄"]="乙",a["⼅"]="亅",a["⼆"]="二",a["⼇"]="亠",a["⼈"]="人",a["⼉"]="儿",a["⼊"]="入",a["⼋"]="八",a["⼌"]="冂",a["⼍"]="冖",a["⼎"]="冫",a["⼏"]="几",a["⼐"]="凵",a["⼑"]="刀",a["⼒"]="力",a["⼓"]="勹",a["⼔"]="匕",a["⼕"]="匚",a["⼖"]="匸",a["⼗"]="十",a["⼘"]="卜",a["⼙"]="卩",a["⼚"]="厂",a["⼛"]="厶",a["⼜"]="又",a["⼝"]="口",a["⼞"]="囗",a["⼟"]="土",a["⼠"]="士",a["⼡"]="夂",a["⼢"]="夊",a["⼣"]="夕",a["⼤"]="大",a["⼥"]="女",a["⼦"]="子",a["⼧"]="宀",a["⼨"]="寸",a["⼩"]="小",a["⼪"]="尢",a["⼫"]="尸",a["⼬"]="屮",a["⼭"]="山",a["⼮"]="巛",a["⼯"]="工",a["⼰"]="己",a["⼱"]="巾",a["⼲"]="干",a["⼳"]="幺",a["⼴"]="广",a["⼵"]="廴",a["⼶"]="廾",a["⼷"]="弋",a["⼸"]="弓",a["⼹"]="彐",a["⼺"]="彡",a["⼻"]="彳",a["⼼"]="心",a["⼽"]="戈",a["⼾"]="戶",a["⼿"]="手",a["⽀"]="支",a["⽁"]="攴",a["⽂"]="文",a["⽃"]="斗",a["⽄"]="斤",a["⽅"]="方",a["⽆"]="无",a["⽇"]="日",a["⽈"]="曰",a["⽉"]="月",a["⽊"]="木",a["⽋"]="欠",a["⽌"]="止",a["⽍"]="歹",a["⽎"]="殳",a["⽏"]="毋",a["⽐"]="比",a["⽑"]="毛",a["⽒"]="氏",a["⽓"]="气",a["⽔"]="水",a["⽕"]="火",a["⽖"]="爪",a["⽗"]="父",a["⽘"]="爻",a["⽙"]="爿",a["⽚"]="片",a["⽛"]="牙",a["⽜"]="牛",a["⽝"]="犬",a["⽞"]="玄",a["⽟"]="玉",a["⽠"]="瓜",a["⽡"]="瓦",a["⽢"]="甘",a["⽣"]="生",a["⽤"]="用",a["⽥"]="田",a["⽦"]="疋",a["⽧"]="疒",a["⽨"]="癶",a["⽩"]="白",a["⽪"]="皮",a["⽫"]="皿",a["⽬"]="目",a["⽭"]="矛",a["⽮"]="矢",a["⽯"]="石",a["⽰"]="示",a["⽱"]="禸",a["⽲"]="禾",a["⽳"]="穴",a["⽴"]="立",a["⽵"]="竹",a["⽶"]="米",a["⽷"]="糸",a["⽸"]="缶",a["⽹"]="网",a["⽺"]="羊",a["⽻"]="羽",a["⽼"]="老",a["⽽"]="而",a["⽾"]="耒",a["⽿"]="耳",a["⾀"]="聿",a["⾁"]="肉",a["⾂"]="臣",a["⾃"]="自",a["⾄"]="至",a["⾅"]="臼",a["⾆"]="舌",a["⾇"]="舛",a["⾈"]="舟",a["⾉"]="艮",a["⾊"]="色",a["⾋"]="艸",a["⾌"]="虍",a["⾍"]="虫",a["⾎"]="血",a["⾏"]="行",a["⾐"]="衣",a["⾑"]="襾",a["⾒"]="見",a["⾓"]="角",a["⾔"]="言",a["⾕"]="谷",a["⾖"]="豆",a["⾗"]="豕",a["⾘"]="豸",a["⾙"]="貝",a["⾚"]="赤",a["⾛"]="走",a["⾜"]="足",a["⾝"]="身",a["⾞"]="車",a["⾟"]="辛",a["⾠"]="辰",a["⾡"]="辵",a["⾢"]="邑",a["⾣"]="酉",a["⾤"]="釆",a["⾥"]="里",a["⾦"]="金",a["⾧"]="長",a["⾨"]="門",a["⾩"]="阜",a["⾪"]="隶",a["⾫"]="隹",a["⾬"]="雨",a["⾭"]="靑",a["⾮"]="非",a["⾯"]="面",a["⾰"]="革",a["⾱"]="韋",a["⾲"]="韭",a["⾳"]="音",a["⾴"]="頁",a["⾵"]="風",a["⾶"]="飛",a["⾷"]="食",a["⾸"]="首",a["⾹"]="香",a["⾺"]="馬",a["⾻"]="骨",a["⾼"]="高",a["⾽"]="髟",a["⾾"]="鬥",a["⾿"]="鬯",a["⿀"]="鬲",a["⿁"]="鬼",a["⿂"]="魚",a["⿃"]="鳥",a["⿄"]="鹵",a["⿅"]="鹿",a["⿆"]="麥",a["⿇"]="麻",a["⿈"]="黃",a["⿉"]="黍",a["⿊"]="黑",a["⿋"]="黹",a["⿌"]="黽",a["⿍"]="鼎",a["⿎"]="鼓",a["⿏"]="鼠",a["⿐"]="鼻",a["⿑"]="齊",a["⿒"]="齒",a["⿓"]="龍",a["⿔"]="龜",a["⿕"]="龠",a["〶"]="〒",a["〸"]="十",a["〹"]="卄",a["〺"]="卅",a["゛"]=" ゙",a["゜"]=" ゚",a["ㄱ"]="ᄀ",a["ㄲ"]="ᄁ",a["ㄳ"]="ᆪ",a["ㄴ"]="ᄂ",a["ㄵ"]="ᆬ",a["ㄶ"]="ᆭ",a["ㄷ"]="ᄃ",a["ㄸ"]="ᄄ",a["ㄹ"]="ᄅ",a["ㄺ"]="ᆰ",a["ㄻ"]="ᆱ",a["ㄼ"]="ᆲ",a["ㄽ"]="ᆳ",a["ㄾ"]="ᆴ",a["ㄿ"]="ᆵ",a["ㅀ"]="ᄚ",a["ㅁ"]="ᄆ",a["ㅂ"]="ᄇ",a["ㅃ"]="ᄈ",a["ㅄ"]="ᄡ",a["ㅅ"]="ᄉ",a["ㅆ"]="ᄊ",a["ㅇ"]="ᄋ",a["ㅈ"]="ᄌ",a["ㅉ"]="ᄍ",a["ㅊ"]="ᄎ",a["ㅋ"]="ᄏ",a["ㅌ"]="ᄐ",a["ㅍ"]="ᄑ",a["ㅎ"]="ᄒ",a["ㅏ"]="ᅡ",a["ㅐ"]="ᅢ",a["ㅑ"]="ᅣ",a["ㅒ"]="ᅤ",a["ㅓ"]="ᅥ",a["ㅔ"]="ᅦ",a["ㅕ"]="ᅧ",a["ㅖ"]="ᅨ",a["ㅗ"]="ᅩ",a["ㅘ"]="ᅪ",a["ㅙ"]="ᅫ",a["ㅚ"]="ᅬ",a["ㅛ"]="ᅭ",a["ㅜ"]="ᅮ",a["ㅝ"]="ᅯ",a["ㅞ"]="ᅰ",a["ㅟ"]="ᅱ",a["ㅠ"]="ᅲ",a["ㅡ"]="ᅳ",a["ㅢ"]="ᅴ",a["ㅣ"]="ᅵ",a["ㅤ"]="ᅠ",a["ㅥ"]="ᄔ",a["ㅦ"]="ᄕ",a["ㅧ"]="ᇇ",a["ㅨ"]="ᇈ",a["ㅩ"]="ᇌ",a["ㅪ"]="ᇎ",a["ㅫ"]="ᇓ",a["ㅬ"]="ᇗ",a["ㅭ"]="ᇙ",a["ㅮ"]="ᄜ",a["ㅯ"]="ᇝ",a["ㅰ"]="ᇟ",a["ㅱ"]="ᄝ",a["ㅲ"]="ᄞ",a["ㅳ"]="ᄠ",a["ㅴ"]="ᄢ",a["ㅵ"]="ᄣ",a["ㅶ"]="ᄧ",a["ㅷ"]="ᄩ",a["ㅸ"]="ᄫ",a["ㅹ"]="ᄬ",a["ㅺ"]="ᄭ",a["ㅻ"]="ᄮ",a["ㅼ"]="ᄯ",a["ㅽ"]="ᄲ",a["ㅾ"]="ᄶ",a["ㅿ"]="ᅀ",a["ㆀ"]="ᅇ",a["ㆁ"]="ᅌ",a["ㆂ"]="ᇱ",a["ㆃ"]="ᇲ",a["ㆄ"]="ᅗ",a["ㆅ"]="ᅘ",a["ㆆ"]="ᅙ",a["ㆇ"]="ᆄ",a["ㆈ"]="ᆅ",a["ㆉ"]="ᆈ",a["ㆊ"]="ᆑ",a["ㆋ"]="ᆒ",a["ㆌ"]="ᆔ",a["ㆍ"]="ᆞ",a["ㆎ"]="ᆡ",a["㈀"]="(ᄀ)",a["㈁"]="(ᄂ)",a["㈂"]="(ᄃ)",a["㈃"]="(ᄅ)",a["㈄"]="(ᄆ)",a["㈅"]="(ᄇ)",a["㈆"]="(ᄉ)",a["㈇"]="(ᄋ)",a["㈈"]="(ᄌ)",a["㈉"]="(ᄎ)",a["㈊"]="(ᄏ)",a["㈋"]="(ᄐ)",a["㈌"]="(ᄑ)",a["㈍"]="(ᄒ)",a["㈎"]="(가)",a["㈏"]="(나)",a["㈐"]="(다)",a["㈑"]="(라)",a["㈒"]="(마)",a["㈓"]="(바)",a["㈔"]="(사)",a["㈕"]="(아)",a["㈖"]="(자)",a["㈗"]="(차)",a["㈘"]="(카)",a["㈙"]="(타)",a["㈚"]="(파)",a["㈛"]="(하)",a["㈜"]="(주)",a["㈝"]="(오전)",a["㈞"]="(오후)",a["㈠"]="(一)",a["㈡"]="(二)",a["㈢"]="(三)",a["㈣"]="(四)",a["㈤"]="(五)",a["㈥"]="(六)",a["㈦"]="(七)",a["㈧"]="(八)",a["㈨"]="(九)",a["㈩"]="(十)",a["㈪"]="(月)",a["㈫"]="(火)",a["㈬"]="(水)",a["㈭"]="(木)",a["㈮"]="(金)",a["㈯"]="(土)",a["㈰"]="(日)",a["㈱"]="(株)",a["㈲"]="(有)",a["㈳"]="(社)",a["㈴"]="(名)",a["㈵"]="(特)",a["㈶"]="(財)",a["㈷"]="(祝)",a["㈸"]="(労)",a["㈹"]="(代)",a["㈺"]="(呼)",a["㈻"]="(学)",a["㈼"]="(監)",a["㈽"]="(企)",a["㈾"]="(資)",a["㈿"]="(協)",a["㉀"]="(祭)",a["㉁"]="(休)",a["㉂"]="(自)",a["㉃"]="(至)",a["㋀"]="1月",a["㋁"]="2月",a["㋂"]="3月",a["㋃"]="4月",a["㋄"]="5月",a["㋅"]="6月",a["㋆"]="7月",a["㋇"]="8月",a["㋈"]="9月",a["㋉"]="10月",a["㋊"]="11月",a["㋋"]="12月",a["㍘"]="0点",a["㍙"]="1点",a["㍚"]="2点",a["㍛"]="3点",a["㍜"]="4点",a["㍝"]="5点",a["㍞"]="6点",a["㍟"]="7点",a["㍠"]="8点",a["㍡"]="9点",a["㍢"]="10点",a["㍣"]="11点",a["㍤"]="12点",a["㍥"]="13点",a["㍦"]="14点",a["㍧"]="15点",a["㍨"]="16点",a["㍩"]="17点",a["㍪"]="18点",a["㍫"]="19点",a["㍬"]="20点",a["㍭"]="21点",a["㍮"]="22点",a["㍯"]="23点",a["㍰"]="24点",a["㏠"]="1日",a["㏡"]="2日",a["㏢"]="3日",a["㏣"]="4日",a["㏤"]="5日",a["㏥"]="6日",a["㏦"]="7日",a["㏧"]="8日",a["㏨"]="9日",a["㏩"]="10日",a["㏪"]="11日",a["㏫"]="12日",a["㏬"]="13日",a["㏭"]="14日",a["㏮"]="15日",a["㏯"]="16日",a["㏰"]="17日",a["㏱"]="18日",a["㏲"]="19日",a["㏳"]="20日",a["㏴"]="21日",a["㏵"]="22日",a["㏶"]="23日",a["㏷"]="24日",a["㏸"]="25日",a["㏹"]="26日",a["㏺"]="27日",a["㏻"]="28日",a["㏼"]="29日",a["㏽"]="30日",a["㏾"]="31日",a["ﬀ"]="ff",a["ﬁ"]="fi",a["ﬂ"]="fl",a["ﬃ"]="ffi",a["ﬄ"]="ffl",a["ﬅ"]="ſt",a["ﬆ"]="st",a["ﬓ"]="մն",a["ﬔ"]="մե",a["ﬕ"]="մի",a["ﬖ"]="վն",a["ﬗ"]="մխ",a["ﭏ"]="אל",a["ﭐ"]="ٱ",a["ﭑ"]="ٱ",a["ﭒ"]="ٻ",a["ﭓ"]="ٻ",a["ﭔ"]="ٻ",a["ﭕ"]="ٻ",a["ﭖ"]="پ",a["ﭗ"]="پ",a["ﭘ"]="پ",a["ﭙ"]="پ",a["ﭚ"]="ڀ",a["ﭛ"]="ڀ",a["ﭜ"]="ڀ",a["ﭝ"]="ڀ",a["ﭞ"]="ٺ",a["ﭟ"]="ٺ",a["ﭠ"]="ٺ",a["ﭡ"]="ٺ",a["ﭢ"]="ٿ",a["ﭣ"]="ٿ",a["ﭤ"]="ٿ",a["ﭥ"]="ٿ",a["ﭦ"]="ٹ",a["ﭧ"]="ٹ",a["ﭨ"]="ٹ",a["ﭩ"]="ٹ",a["ﭪ"]="ڤ",a["ﭫ"]="ڤ",a["ﭬ"]="ڤ",a["ﭭ"]="ڤ",a["ﭮ"]="ڦ",a["ﭯ"]="ڦ",a["ﭰ"]="ڦ",a["ﭱ"]="ڦ",a["ﭲ"]="ڄ",a["ﭳ"]="ڄ",a["ﭴ"]="ڄ",a["ﭵ"]="ڄ",a["ﭶ"]="ڃ",a["ﭷ"]="ڃ",a["ﭸ"]="ڃ",a["ﭹ"]="ڃ",a["ﭺ"]="چ",a["ﭻ"]="چ",a["ﭼ"]="چ",a["ﭽ"]="چ",a["ﭾ"]="ڇ",a["ﭿ"]="ڇ",a["ﮀ"]="ڇ",a["ﮁ"]="ڇ",a["ﮂ"]="ڍ",a["ﮃ"]="ڍ",a["ﮄ"]="ڌ",a["ﮅ"]="ڌ",a["ﮆ"]="ڎ",a["ﮇ"]="ڎ",a["ﮈ"]="ڈ",a["ﮉ"]="ڈ",a["ﮊ"]="ژ",a["ﮋ"]="ژ",a["ﮌ"]="ڑ",a["ﮍ"]="ڑ",a["ﮎ"]="ک",a["ﮏ"]="ک",a["ﮐ"]="ک",a["ﮑ"]="ک",a["ﮒ"]="گ",a["ﮓ"]="گ",a["ﮔ"]="گ",a["ﮕ"]="گ",a["ﮖ"]="ڳ",a["ﮗ"]="ڳ",a["ﮘ"]="ڳ",a["ﮙ"]="ڳ",a["ﮚ"]="ڱ",a["ﮛ"]="ڱ",a["ﮜ"]="ڱ",a["ﮝ"]="ڱ",a["ﮞ"]="ں",a["ﮟ"]="ں",a["ﮠ"]="ڻ",a["ﮡ"]="ڻ",a["ﮢ"]="ڻ",a["ﮣ"]="ڻ",a["ﮤ"]="ۀ",a["ﮥ"]="ۀ",a["ﮦ"]="ہ",a["ﮧ"]="ہ",a["ﮨ"]="ہ",a["ﮩ"]="ہ",a["ﮪ"]="ھ",a["ﮫ"]="ھ",a["ﮬ"]="ھ",a["ﮭ"]="ھ",a["ﮮ"]="ے",a["ﮯ"]="ے",a["ﮰ"]="ۓ",a["ﮱ"]="ۓ",a["ﯓ"]="ڭ",a["ﯔ"]="ڭ",a["ﯕ"]="ڭ",a["ﯖ"]="ڭ",a["ﯗ"]="ۇ",a["ﯘ"]="ۇ",a["ﯙ"]="ۆ",a["ﯚ"]="ۆ",a["ﯛ"]="ۈ",a["ﯜ"]="ۈ",a["ﯝ"]="ٷ",a["ﯞ"]="ۋ",a["ﯟ"]="ۋ",a["ﯠ"]="ۅ",a["ﯡ"]="ۅ",a["ﯢ"]="ۉ",a["ﯣ"]="ۉ",a["ﯤ"]="ې",a["ﯥ"]="ې",a["ﯦ"]="ې",a["ﯧ"]="ې",a["ﯨ"]="ى",a["ﯩ"]="ى",a["ﯪ"]="ئا",a["ﯫ"]="ئا",a["ﯬ"]="ئە",a["ﯭ"]="ئە",a["ﯮ"]="ئو",a["ﯯ"]="ئو",a["ﯰ"]="ئۇ",a["ﯱ"]="ئۇ",a["ﯲ"]="ئۆ",a["ﯳ"]="ئۆ",a["ﯴ"]="ئۈ",a["ﯵ"]="ئۈ",a["ﯶ"]="ئې",a["ﯷ"]="ئې",a["ﯸ"]="ئې",a["ﯹ"]="ئى",a["ﯺ"]="ئى",a["ﯻ"]="ئى",a["ﯼ"]="ی",a["ﯽ"]="ی",a["ﯾ"]="ی",a["ﯿ"]="ی",a["ﰀ"]="ئج",a["ﰁ"]="ئح",a["ﰂ"]="ئم",a["ﰃ"]="ئى",a["ﰄ"]="ئي",a["ﰅ"]="بج",a["ﰆ"]="بح",a["ﰇ"]="بخ",a["ﰈ"]="بم",a["ﰉ"]="بى",a["ﰊ"]="بي",a["ﰋ"]="تج",a["ﰌ"]="تح",a["ﰍ"]="تخ",a["ﰎ"]="تم",a["ﰏ"]="تى",a["ﰐ"]="تي",a["ﰑ"]="ثج",a["ﰒ"]="ثم",a["ﰓ"]="ثى",a["ﰔ"]="ثي",a["ﰕ"]="جح",a["ﰖ"]="جم",a["ﰗ"]="حج",a["ﰘ"]="حم",a["ﰙ"]="خج",a["ﰚ"]="خح",a["ﰛ"]="خم",a["ﰜ"]="سج",a["ﰝ"]="سح",a["ﰞ"]="سخ",a["ﰟ"]="سم",a["ﰠ"]="صح",a["ﰡ"]="صم",a["ﰢ"]="ضج",a["ﰣ"]="ضح",a["ﰤ"]="ضخ",a["ﰥ"]="ضم",a["ﰦ"]="طح",a["ﰧ"]="طم",a["ﰨ"]="ظم",a["ﰩ"]="عج",a["ﰪ"]="عم",a["ﰫ"]="غج",a["ﰬ"]="غم",a["ﰭ"]="فج",a["ﰮ"]="فح",a["ﰯ"]="فخ",a["ﰰ"]="فم",a["ﰱ"]="فى",a["ﰲ"]="في",a["ﰳ"]="قح",a["ﰴ"]="قم",a["ﰵ"]="قى",a["ﰶ"]="قي",a["ﰷ"]="كا",a["ﰸ"]="كج",a["ﰹ"]="كح",a["ﰺ"]="كخ",a["ﰻ"]="كل",a["ﰼ"]="كم",a["ﰽ"]="كى",a["ﰾ"]="كي",a["ﰿ"]="لج",a["ﱀ"]="لح",a["ﱁ"]="لخ",a["ﱂ"]="لم",a["ﱃ"]="لى",a["ﱄ"]="لي",a["ﱅ"]="مج",a["ﱆ"]="مح",a["ﱇ"]="مخ",a["ﱈ"]="مم",a["ﱉ"]="مى",a["ﱊ"]="مي",a["ﱋ"]="نج",a["ﱌ"]="نح",a["ﱍ"]="نخ",a["ﱎ"]="نم",a["ﱏ"]="نى",a["ﱐ"]="ني",a["ﱑ"]="هج",a["ﱒ"]="هم",a["ﱓ"]="هى",a["ﱔ"]="هي",a["ﱕ"]="يج",a["ﱖ"]="يح",a["ﱗ"]="يخ",a["ﱘ"]="يم",a["ﱙ"]="يى",a["ﱚ"]="يي",a["ﱛ"]="ذٰ",a["ﱜ"]="رٰ",a["ﱝ"]="ىٰ",a["ﱞ"]=" ٌّ",a["ﱟ"]=" ٍّ",a["ﱠ"]=" َّ",a["ﱡ"]=" ُّ",a["ﱢ"]=" ِّ",a["ﱣ"]=" ّٰ",a["ﱤ"]="ئر",a["ﱥ"]="ئز",a["ﱦ"]="ئم",a["ﱧ"]="ئن",a["ﱨ"]="ئى",a["ﱩ"]="ئي",a["ﱪ"]="بر",a["ﱫ"]="بز",a["ﱬ"]="بم",a["ﱭ"]="بن",a["ﱮ"]="بى",a["ﱯ"]="بي",a["ﱰ"]="تر",a["ﱱ"]="تز",a["ﱲ"]="تم",a["ﱳ"]="تن",a["ﱴ"]="تى",a["ﱵ"]="تي",a["ﱶ"]="ثر",a["ﱷ"]="ثز",a["ﱸ"]="ثم",a["ﱹ"]="ثن",a["ﱺ"]="ثى",a["ﱻ"]="ثي",a["ﱼ"]="فى",a["ﱽ"]="في",a["ﱾ"]="قى",a["ﱿ"]="قي",a["ﲀ"]="كا",a["ﲁ"]="كل",a["ﲂ"]="كم",a["ﲃ"]="كى",a["ﲄ"]="كي",a["ﲅ"]="لم",a["ﲆ"]="لى",a["ﲇ"]="لي",a["ﲈ"]="ما",a["ﲉ"]="مم",a["ﲊ"]="نر",a["ﲋ"]="نز",a["ﲌ"]="نم",a["ﲍ"]="نن",a["ﲎ"]="نى",a["ﲏ"]="ني",a["ﲐ"]="ىٰ",a["ﲑ"]="ير",a["ﲒ"]="يز",a["ﲓ"]="يم",a["ﲔ"]="ين",a["ﲕ"]="يى",a["ﲖ"]="يي",a["ﲗ"]="ئج",a["ﲘ"]="ئح",a["ﲙ"]="ئخ",a["ﲚ"]="ئم",a["ﲛ"]="ئه",a["ﲜ"]="بج",a["ﲝ"]="بح",a["ﲞ"]="بخ",a["ﲟ"]="بم",a["ﲠ"]="به",a["ﲡ"]="تج",a["ﲢ"]="تح",a["ﲣ"]="تخ",a["ﲤ"]="تم",a["ﲥ"]="ته",a["ﲦ"]="ثم",a["ﲧ"]="جح",a["ﲨ"]="جم",a["ﲩ"]="حج",a["ﲪ"]="حم",a["ﲫ"]="خج",a["ﲬ"]="خم",a["ﲭ"]="سج",a["ﲮ"]="سح",a["ﲯ"]="سخ",a["ﲰ"]="سم",a["ﲱ"]="صح",a["ﲲ"]="صخ",a["ﲳ"]="صم",a["ﲴ"]="ضج",a["ﲵ"]="ضح",a["ﲶ"]="ضخ",a["ﲷ"]="ضم",a["ﲸ"]="طح",a["ﲹ"]="ظم",a["ﲺ"]="عج",a["ﲻ"]="عم",a["ﲼ"]="غج",a["ﲽ"]="غم",a["ﲾ"]="فج",a["ﲿ"]="فح",a["ﳀ"]="فخ",a["ﳁ"]="فم",a["ﳂ"]="قح",a["ﳃ"]="قم",a["ﳄ"]="كج",a["ﳅ"]="كح",a["ﳆ"]="كخ",a["ﳇ"]="كل",a["ﳈ"]="كم",a["ﳉ"]="لج",a["ﳊ"]="لح",a["ﳋ"]="لخ",a["ﳌ"]="لم",a["ﳍ"]="له",a["ﳎ"]="مج",a["ﳏ"]="مح",a["ﳐ"]="مخ",a["ﳑ"]="مم",a["ﳒ"]="نج",a["ﳓ"]="نح",a["ﳔ"]="نخ",a["ﳕ"]="نم",a["ﳖ"]="نه",a["ﳗ"]="هج",a["ﳘ"]="هم",a["ﳙ"]="هٰ",a["ﳚ"]="يج",a["ﳛ"]="يح",a["ﳜ"]="يخ",a["ﳝ"]="يم",a["ﳞ"]="يه",a["ﳟ"]="ئم",a["ﳠ"]="ئه",a["ﳡ"]="بم",a["ﳢ"]="به",a["ﳣ"]="تم",a["ﳤ"]="ته",a["ﳥ"]="ثم",a["ﳦ"]="ثه",a["ﳧ"]="سم",a["ﳨ"]="سه",a["ﳩ"]="شم",a["ﳪ"]="شه",a["ﳫ"]="كل",a["ﳬ"]="كم",a["ﳭ"]="لم",a["ﳮ"]="نم",a["ﳯ"]="نه",a["ﳰ"]="يم",a["ﳱ"]="يه",a["ﳲ"]="ـَّ",a["ﳳ"]="ـُّ",a["ﳴ"]="ـِّ",a["ﳵ"]="طى",a["ﳶ"]="طي",a["ﳷ"]="عى",a["ﳸ"]="عي",a["ﳹ"]="غى",a["ﳺ"]="غي",a["ﳻ"]="سى",a["ﳼ"]="سي",a["ﳽ"]="شى",a["ﳾ"]="شي",a["ﳿ"]="حى",a["ﴀ"]="حي",a["ﴁ"]="جى",a["ﴂ"]="جي",a["ﴃ"]="خى",a["ﴄ"]="خي",a["ﴅ"]="صى",a["ﴆ"]="صي",a["ﴇ"]="ضى",a["ﴈ"]="ضي",a["ﴉ"]="شج",a["ﴊ"]="شح",a["ﴋ"]="شخ",a["ﴌ"]="شم",a["ﴍ"]="شر",a["ﴎ"]="سر",a["ﴏ"]="صر",a["ﴐ"]="ضر",a["ﴑ"]="طى",a["ﴒ"]="طي",a["ﴓ"]="عى",a["ﴔ"]="عي",a["ﴕ"]="غى",a["ﴖ"]="غي",a["ﴗ"]="سى",a["ﴘ"]="سي",a["ﴙ"]="شى",a["ﴚ"]="شي",a["ﴛ"]="حى",a["ﴜ"]="حي",a["ﴝ"]="جى",a["ﴞ"]="جي",a["ﴟ"]="خى",a["ﴠ"]="خي",a["ﴡ"]="صى",a["ﴢ"]="صي",a["ﴣ"]="ضى",a["ﴤ"]="ضي",a["ﴥ"]="شج",a["ﴦ"]="شح",a["ﴧ"]="شخ",a["ﴨ"]="شم",a["ﴩ"]="شر",a["ﴪ"]="سر",a["ﴫ"]="صر",a["ﴬ"]="ضر",a["ﴭ"]="شج",a["ﴮ"]="شح",a["ﴯ"]="شخ",a["ﴰ"]="شم",a["ﴱ"]="سه",a["ﴲ"]="شه",a["ﴳ"]="طم",a["ﴴ"]="سج",a["ﴵ"]="سح",a["ﴶ"]="سخ",a["ﴷ"]="شج",a["ﴸ"]="شح",a["ﴹ"]="شخ",a["ﴺ"]="طم",a["ﴻ"]="ظم",a["ﴼ"]="اً",a["ﴽ"]="اً",a["ﵐ"]="تجم",a["ﵑ"]="تحج",a["ﵒ"]="تحج",a["ﵓ"]="تحم",a["ﵔ"]="تخم",a["ﵕ"]="تمج",a["ﵖ"]="تمح",a["ﵗ"]="تمخ",a["ﵘ"]="جمح",a["ﵙ"]="جمح",a["ﵚ"]="حمي",a["ﵛ"]="حمى",a["ﵜ"]="سحج",a["ﵝ"]="سجح",a["ﵞ"]="سجى",a["ﵟ"]="سمح",a["ﵠ"]="سمح",a["ﵡ"]="سمج",a["ﵢ"]="سمم",a["ﵣ"]="سمم",a["ﵤ"]="صحح",a["ﵥ"]="صحح",a["ﵦ"]="صمم",a["ﵧ"]="شحم",a["ﵨ"]="شحم",a["ﵩ"]="شجي",a["ﵪ"]="شمخ",a["ﵫ"]="شمخ",a["ﵬ"]="شمم",a["ﵭ"]="شمم",a["ﵮ"]="ضحى",a["ﵯ"]="ضخم",a["ﵰ"]="ضخم",a["ﵱ"]="طمح",a["ﵲ"]="طمح",a["ﵳ"]="طمم",a["ﵴ"]="طمي",a["ﵵ"]="عجم",a["ﵶ"]="عمم",a["ﵷ"]="عمم",a["ﵸ"]="عمى",a["ﵹ"]="غمم",a["ﵺ"]="غمي",a["ﵻ"]="غمى",a["ﵼ"]="فخم",a["ﵽ"]="فخم",a["ﵾ"]="قمح",a["ﵿ"]="قمم",a["ﶀ"]="لحم",a["ﶁ"]="لحي",a["ﶂ"]="لحى",a["ﶃ"]="لجج",a["ﶄ"]="لجج",a["ﶅ"]="لخم",a["ﶆ"]="لخم",a["ﶇ"]="لمح",a["ﶈ"]="لمح",a["ﶉ"]="محج",a["ﶊ"]="محم",a["ﶋ"]="محي",a["ﶌ"]="مجح",a["ﶍ"]="مجم",a["ﶎ"]="مخج",a["ﶏ"]="مخم",a["ﶒ"]="مجخ",a["ﶓ"]="همج",a["ﶔ"]="همم",a["ﶕ"]="نحم",a["ﶖ"]="نحى",a["ﶗ"]="نجم",a["ﶘ"]="نجم",a["ﶙ"]="نجى",a["ﶚ"]="نمي",a["ﶛ"]="نمى",a["ﶜ"]="يمم",a["ﶝ"]="يمم",a["ﶞ"]="بخي",a["ﶟ"]="تجي",a["ﶠ"]="تجى",a["ﶡ"]="تخي",a["ﶢ"]="تخى",a["ﶣ"]="تمي",a["ﶤ"]="تمى",a["ﶥ"]="جمي",a["ﶦ"]="جحى",a["ﶧ"]="جمى",a["ﶨ"]="سخى",a["ﶩ"]="صحي",a["ﶪ"]="شحي",a["ﶫ"]="ضحي",a["ﶬ"]="لجي",a["ﶭ"]="لمي",a["ﶮ"]="يحي",a["ﶯ"]="يجي",a["ﶰ"]="يمي",a["ﶱ"]="ممي",a["ﶲ"]="قمي",a["ﶳ"]="نحي",a["ﶴ"]="قمح",a["ﶵ"]="لحم",a["ﶶ"]="عمي",a["ﶷ"]="كمي",a["ﶸ"]="نجح",a["ﶹ"]="مخي",a["ﶺ"]="لجم",a["ﶻ"]="كمم",a["ﶼ"]="لجم",a["ﶽ"]="نجح",a["ﶾ"]="جحي",a["ﶿ"]="حجي",a["ﷀ"]="مجي",a["ﷁ"]="فمي",a["ﷂ"]="بحي",a["ﷃ"]="كمم",a["ﷄ"]="عجم",a["ﷅ"]="صمم",a["ﷆ"]="سخي",a["ﷇ"]="نجي",a["﹉"]="‾",a["﹊"]="‾",a["﹋"]="‾",a["﹌"]="‾",a["﹍"]="_",a["﹎"]="_",a["﹏"]="_",a["ﺀ"]="ء",a["ﺁ"]="آ",a["ﺂ"]="آ",a["ﺃ"]="أ",a["ﺄ"]="أ",a["ﺅ"]="ؤ",a["ﺆ"]="ؤ",a["ﺇ"]="إ",a["ﺈ"]="إ",a["ﺉ"]="ئ",a["ﺊ"]="ئ",a["ﺋ"]="ئ",a["ﺌ"]="ئ",a["ﺍ"]="ا",a["ﺎ"]="ا",a["ﺏ"]="ب",a["ﺐ"]="ب",a["ﺑ"]="ب",a["ﺒ"]="ب",a["ﺓ"]="ة",a["ﺔ"]="ة",a["ﺕ"]="ت",a["ﺖ"]="ت",a["ﺗ"]="ت",a["ﺘ"]="ت",a["ﺙ"]="ث",a["ﺚ"]="ث",a["ﺛ"]="ث",a["ﺜ"]="ث",a["ﺝ"]="ج",a["ﺞ"]="ج",a["ﺟ"]="ج",a["ﺠ"]="ج",a["ﺡ"]="ح",a["ﺢ"]="ح",a["ﺣ"]="ح",a["ﺤ"]="ح",a["ﺥ"]="خ",a["ﺦ"]="خ",a["ﺧ"]="خ",a["ﺨ"]="خ",a["ﺩ"]="د",a["ﺪ"]="د",a["ﺫ"]="ذ",a["ﺬ"]="ذ",a["ﺭ"]="ر",a["ﺮ"]="ر",a["ﺯ"]="ز",a["ﺰ"]="ز",a["ﺱ"]="س",a["ﺲ"]="س",a["ﺳ"]="س",a["ﺴ"]="س",a["ﺵ"]="ش",a["ﺶ"]="ش",a["ﺷ"]="ش",a["ﺸ"]="ش",a["ﺹ"]="ص",a["ﺺ"]="ص",a["ﺻ"]="ص",a["ﺼ"]="ص",a["ﺽ"]="ض",a["ﺾ"]="ض",a["ﺿ"]="ض",a["ﻀ"]="ض",a["ﻁ"]="ط",a["ﻂ"]="ط",a["ﻃ"]="ط",a["ﻄ"]="ط",a["ﻅ"]="ظ",a["ﻆ"]="ظ",a["ﻇ"]="ظ",a["ﻈ"]="ظ",a["ﻉ"]="ع",a["ﻊ"]="ع",a["ﻋ"]="ع",a["ﻌ"]="ع",a["ﻍ"]="غ",a["ﻎ"]="غ",a["ﻏ"]="غ",a["ﻐ"]="غ",a["ﻑ"]="ف",a["ﻒ"]="ف",a["ﻓ"]="ف",a["ﻔ"]="ف",a["ﻕ"]="ق",a["ﻖ"]="ق",a["ﻗ"]="ق",a["ﻘ"]="ق",a["ﻙ"]="ك",a["ﻚ"]="ك",a["ﻛ"]="ك",a["ﻜ"]="ك",a["ﻝ"]="ل",a["ﻞ"]="ل",a["ﻟ"]="ل",a["ﻠ"]="ل",a["ﻡ"]="م",a["ﻢ"]="م",a["ﻣ"]="م",a["ﻤ"]="م",a["ﻥ"]="ن",a["ﻦ"]="ن",a["ﻧ"]="ن",a["ﻨ"]="ن",a["ﻩ"]="ه",a["ﻪ"]="ه",a["ﻫ"]="ه",a["ﻬ"]="ه",a["ﻭ"]="و",a["ﻮ"]="و",a["ﻯ"]="ى",a["ﻰ"]="ى",a["ﻱ"]="ي",a["ﻲ"]="ي",a["ﻳ"]="ي",a["ﻴ"]="ي",a["ﻵ"]="لآ",a["ﻶ"]="لآ",a["ﻷ"]="لأ",a["ﻸ"]="لأ",a["ﻹ"]="لإ",a["ﻺ"]="لإ",a["ﻻ"]="لا",a["ﻼ"]="لا"});a.mapSpecialUnicodeValues=c,a.reverseIfRtl=g,a.getUnicodeRangeFor=e,a.getNormalizedUnicodes=k,a.getUnicodeForGlyph=d}),function(a,b){b(a.pdfjsCoreStream={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreJbig2,a.pdfjsCoreJpg,a.pdfjsCoreJpx)}(this,function(a,b,c,d,e,f){var g=b.Util,h=b.error,i=b.info,j=b.isArray,k=b.createObjectURL,l=b.shadow,m=b.warn,n=c.Dict,o=c.isDict,p=d.Jbig2Image,q=e.JpegImage,r=f.JpxImage,s=function(){function a(a,b,c,d){this.bytes=a instanceof Uint8Array?a:new Uint8Array(a),this.start=b||0,this.pos=this.start,this.end=b+c||this.bytes.length,this.dict=d}
// required methods for a stream. if a particular stream does not
// implement these, an error should be thrown
return a.prototype={get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){return this.pos>=this.end?-1:this.bytes[this.pos++]},getUint16:function(){var a=this.getByte(),b=this.getByte();return-1===a||-1===b?-1:(a<<8)+b},getInt32:function(){var a=this.getByte(),b=this.getByte(),c=this.getByte(),d=this.getByte();return(a<<24)+(b<<16)+(c<<8)+d},
// returns subarray of original buffer
// should only be read
getBytes:function(a){var b=this.bytes,c=this.pos,d=this.end;if(!a)return b.subarray(c,d);var e=c+a;return e>d&&(e=d),this.pos=e,b.subarray(c,e)},peekByte:function(){var a=this.getByte();return this.pos--,a},peekBytes:function(a){var b=this.getBytes(a);return this.pos-=b.length,b},skip:function(a){a||(a=1),this.pos+=a},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(b,c,d){return new a(this.bytes.buffer,b,c,d)},isStream:!0},a}(),t=function(){function a(a){for(var b=a.length,c=new Uint8Array(b),d=0;b>d;++d)c[d]=a.charCodeAt(d);s.call(this,c)}return a.prototype=s.prototype,a}(),u=function(){function a(a){if(this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=b,this.minBufferLength=512,a)
// Compute the first power of two that is as big as maybeMinBufferLength.
for(;this.minBufferLength<a;)this.minBufferLength*=2}
// Lots of DecodeStreams are created whose buffers are never used.  For these
// we share a single empty buffer. This is (a) space-efficient and (b) avoids
// having special cases that would be required if we used |null| for an empty
// buffer.
var b=new Uint8Array(0);return a.prototype={get isEmpty(){for(;!this.eof&&0===this.bufferLength;)this.readBlock();return 0===this.bufferLength},ensureBuffer:function(a){var b=this.buffer;if(a<=b.byteLength)return b;for(var c=this.minBufferLength;a>c;)c*=2;var d=new Uint8Array(c);return d.set(b),this.buffer=d},getByte:function(){for(var a=this.pos;this.bufferLength<=a;){if(this.eof)return-1;this.readBlock()}return this.buffer[this.pos++]},getUint16:function(){var a=this.getByte(),b=this.getByte();return-1===a||-1===b?-1:(a<<8)+b},getInt32:function(){var a=this.getByte(),b=this.getByte(),c=this.getByte(),d=this.getByte();return(a<<24)+(b<<16)+(c<<8)+d},getBytes:function(a){var b,c=this.pos;if(a){for(this.ensureBuffer(c+a),b=c+a;!this.eof&&this.bufferLength<b;)this.readBlock();var d=this.bufferLength;b>d&&(b=d)}else{for(;!this.eof;)this.readBlock();b=this.bufferLength}return this.pos=b,this.buffer.subarray(c,b)},peekByte:function(){var a=this.getByte();return this.pos--,a},peekBytes:function(a){var b=this.getBytes(a);return this.pos-=b.length,b},makeSubStream:function(a,b,c){for(var d=a+b;this.bufferLength<=d&&!this.eof;)this.readBlock();return new s(this.buffer,a,b,c)},skip:function(a){a||(a=1),this.pos+=a},reset:function(){this.pos=0},getBaseStreams:function(){return this.str&&this.str.getBaseStreams?this.str.getBaseStreams():[]}},a}(),v=function(){function a(a){this.streams=a,u.call(this,/* maybeLength = */null)}return a.prototype=Object.create(u.prototype),a.prototype.readBlock=function(){var a=this.streams;if(0===a.length)return void(this.eof=!0);var b=a.shift(),c=b.getBytes(),d=this.bufferLength,e=d+c.length,f=this.ensureBuffer(e);f.set(c,d),this.bufferLength=e},a.prototype.getBaseStreams=function(){for(var a=[],b=0,c=this.streams.length;c>b;b++){var d=this.streams[b];d.getBaseStreams&&g.appendToArray(a,d.getBaseStreams())}return a},a}(),w=function(){function a(a,b){this.str=a,this.dict=a.dict;var c=a.getByte(),d=a.getByte();-1!==c&&-1!==d||h("Invalid header in flate stream: "+c+", "+d),8!==(15&c)&&h("Unknown compression method in flate stream: "+c+", "+d),((c<<8)+d)%31!==0&&h("Bad FCHECK in flate stream: "+c+", "+d),32&d&&h("FDICT bit set in flate stream: "+c+", "+d),this.codeSize=0,this.codeBuf=0,u.call(this,b)}var b=new Int32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),c=new Int32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),d=new Int32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),e=[new Int32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],f=[new Int32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];return a.prototype=Object.create(u.prototype),a.prototype.getBits=function(a){for(var b,c=this.str,d=this.codeSize,e=this.codeBuf;a>d;)-1===(b=c.getByte())&&h("Bad encoding in flate stream"),e|=b<<d,d+=8;return b=e&(1<<a)-1,this.codeBuf=e>>a,this.codeSize=d-=a,b},a.prototype.getCode=function(a){for(var b,c=this.str,d=a[0],e=a[1],f=this.codeSize,g=this.codeBuf;e>f&&-1!==(b=c.getByte());)g|=b<<f,f+=8;var i=d[g&(1<<e)-1],j=i>>16,k=65535&i;return(1>j||j>f)&&h("Bad encoding in flate stream"),this.codeBuf=g>>j,this.codeSize=f-j,k},a.prototype.generateHuffmanTable=function(a){var b,c=a.length,d=0;for(b=0;c>b;++b)a[b]>d&&(d=a[b]);for(var e=1<<d,f=new Int32Array(e),g=1,h=0,i=2;d>=g;++g,h<<=1,i<<=1)for(var j=0;c>j;++j)if(a[j]===g){
// bit-reverse the code
var k=0,l=h;for(b=0;g>b;++b)k=k<<1|1&l,l>>=1;
// fill the table entries
for(b=k;e>b;b+=i)f[b]=g<<16|j;++h}return[f,d]},a.prototype.readBlock=function(){var a,g,i=this.str,j=this.getBits(3);if(1&j&&(this.eof=!0),j>>=1,0!==j){var k,l;if(1===j)k=e,l=f;else if(2===j){// compressed block, dynamic codes
var m,n=this.getBits(5)+257,o=this.getBits(5)+1,p=this.getBits(4)+4,q=new Uint8Array(b.length);for(m=0;p>m;++m)q[b[m]]=this.getBits(3);var r=this.generateHuffmanTable(q);
// build the literal and distance code tables
g=0,m=0;for(var s,t,u,v=n+o,w=new Uint8Array(v);v>m;){var x=this.getCode(r);if(16===x)s=2,t=3,u=g;else if(17===x)s=3,t=3,u=g=0;else{if(18!==x){w[m++]=g=x;continue}s=7,t=11,u=g=0}for(var y=this.getBits(s)+t;y-- >0;)w[m++]=u}k=this.generateHuffmanTable(w.subarray(0,n)),l=this.generateHuffmanTable(w.subarray(n,v))}else h("Unknown block type in flate stream");a=this.buffer;for(var z=a?a.length:0,A=this.bufferLength;;){var B=this.getCode(k);if(256>B)A+1>=z&&(a=this.ensureBuffer(A+1),z=a.length),a[A++]=B;else{if(256===B)return void(this.bufferLength=A);B-=257,B=c[B];var C=B>>16;C>0&&(C=this.getBits(C)),g=(65535&B)+C,B=this.getCode(l),B=d[B],C=B>>16,C>0&&(C=this.getBits(C));var D=(65535&B)+C;A+g>=z&&(a=this.ensureBuffer(A+g),z=a.length);for(var E=0;g>E;++E,++A)a[A]=a[A-D]}}}else{// uncompressed block
var F;-1===(F=i.getByte())&&h("Bad block header in flate stream");var G=F;-1===(F=i.getByte())&&h("Bad block header in flate stream"),G|=F<<8,-1===(F=i.getByte())&&h("Bad block header in flate stream");var H=F;-1===(F=i.getByte())&&h("Bad block header in flate stream"),H|=F<<8,H===(65535&~G)||0===G&&0===H||h("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0;var I=this.bufferLength;a=this.ensureBuffer(I+G);var J=I+G;if(this.bufferLength=J,0===G)-1===i.peekByte()&&(this.eof=!0);else for(var K=I;J>K;++K){if(-1===(F=i.getByte())){this.eof=!0;break}a[K]=F}}},a}(),x=function(){function a(a,b,c){if(!o(c))return a;var d=this.predictor=c.get("Predictor")||1;if(1>=d)return a;2!==d&&(10>d||d>15)&&h("Unsupported predictor: "+d),2===d?this.readBlock=this.readBlockTiff:this.readBlock=this.readBlockPng,this.str=a,this.dict=a.dict;var e=this.colors=c.get("Colors")||1,f=this.bits=c.get("BitsPerComponent")||8,g=this.columns=c.get("Columns")||1;return this.pixBytes=e*f+7>>3,this.rowBytes=g*e*f+7>>3,u.call(this,b),this}return a.prototype=Object.create(u.prototype),a.prototype.readBlockTiff=function(){var a=this.rowBytes,b=this.bufferLength,c=this.ensureBuffer(b+a),d=this.bits,e=this.colors,f=this.str.getBytes(a);if(this.eof=!f.length,!this.eof){var g,h=0,i=0,j=0,k=0,l=b;if(1===d)for(g=0;a>g;++g){var m=f[g];h=h<<8|m,
// bitwise addition is exclusive or
// first shift inbuf and then add
c[l++]=255&(m^h>>e),
// truncate inbuf (assumes colors < 16)
h&=65535}else if(8===d){for(g=0;e>g;++g)c[l++]=f[g];for(;a>g;++g)c[l]=c[l-e]+f[g],l++}else{var n=new Uint8Array(e+1),o=(1<<d)-1,p=0,q=b,r=this.columns;for(g=0;r>g;++g)for(var s=0;e>s;++s)d>j&&(h=h<<8|255&f[p++],j+=8),n[s]=n[s]+(h>>j-d)&o,j-=d,i=i<<d|n[s],k+=d,k>=8&&(c[q++]=i>>k-8&255,k-=8);k>0&&(c[q++]=(i<<8-k)+(h&(1<<8-k)-1))}this.bufferLength+=a}},a.prototype.readBlockPng=function(){var a=this.rowBytes,b=this.pixBytes,c=this.str.getByte(),d=this.str.getBytes(a);if(this.eof=!d.length,!this.eof){var e=this.bufferLength,f=this.ensureBuffer(e+a),g=f.subarray(e-a,e);0===g.length&&(g=new Uint8Array(a));var i,j,k,l=e;switch(c){case 0:for(i=0;a>i;++i)f[l++]=d[i];break;case 1:for(i=0;b>i;++i)f[l++]=d[i];for(;a>i;++i)f[l]=f[l-b]+d[i]&255,l++;break;case 2:for(i=0;a>i;++i)f[l++]=g[i]+d[i]&255;break;case 3:for(i=0;b>i;++i)f[l++]=(g[i]>>1)+d[i];for(;a>i;++i)f[l]=(g[i]+f[l-b]>>1)+d[i]&255,l++;break;case 4:
// we need to save the up left pixels values. the simplest way
// is to create a new buffer
for(i=0;b>i;++i)j=g[i],k=d[i],f[l++]=j+k;for(;a>i;++i){j=g[i];var m=g[i-b],n=f[l-b],o=n+j-m,p=o-n;0>p&&(p=-p);var q=o-j;0>q&&(q=-q);var r=o-m;0>r&&(r=-r),k=d[i],q>=p&&r>=p?f[l++]=n+k:r>=q?f[l++]=j+k:f[l++]=m+k}break;default:h("Unsupported predictor: "+c)}this.bufferLength+=a}},a}(),y=function(){function a(a,b,c,d){for(
// Some images may contain 'junk' before the SOI (start-of-image) marker.
// Note: this seems to mainly affect inline images.
var e;-1!==(e=a.getByte());)if(255===e){// Find the first byte of the SOI marker (0xFFD8).
a.skip(-1);// Reset the stream position to the SOI.
break}this.stream=a,this.maybeLength=b,this.dict=c,u.call(this,b)}return a.prototype=Object.create(u.prototype),Object.defineProperty(a.prototype,"bytes",{get:function(){
// If this.maybeLength is null, we'll get the entire stream.
return l(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),a.prototype.ensureBuffer=function(a){if(!this.bufferLength)try{var b=new q;
// checking if values needs to be transformed before conversion
if(this.forceRGB&&this.dict&&j(this.dict.get("Decode"))){for(var c=this.dict.getArray("Decode"),d=this.dict.get("BitsPerComponent")||8,e=c.length,f=new Int32Array(e),g=!1,i=(1<<d)-1,k=0;e>k;k+=2)f[k]=256*(c[k+1]-c[k])|0,f[k+1]=c[k]*i|0,256===f[k]&&0===f[k+1]||(g=!0);g&&(b.decodeTransform=f)}b.parse(this.bytes);var l=b.getData(this.drawWidth,this.drawHeight,this.forceRGB);this.buffer=l,this.bufferLength=l.length,this.eof=!0}catch(m){h("JPEG error: "+m)}},a.prototype.getBytes=function(a){return this.ensureBuffer(),this.buffer},a.prototype.getIR=function(a){return k(this.bytes,"image/jpeg",a)},a}(),z=function(){function a(a,b,c){this.stream=a,this.maybeLength=b,this.dict=c,u.call(this,b)}return a.prototype=Object.create(u.prototype),Object.defineProperty(a.prototype,"bytes",{get:function(){
// If this.maybeLength is null, we'll get the entire stream.
return l(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),a.prototype.ensureBuffer=function(a){if(!this.bufferLength){var b=new r;b.parse(this.bytes);var c=b.width,d=b.height,e=b.componentsCount,f=b.tiles.length;if(1===f)this.buffer=b.tiles[0].items;else{for(var g=new Uint8Array(c*d*e),h=0;f>h;h++)for(var i=b.tiles[h],j=i.width,k=i.height,l=i.left,m=i.top,n=i.items,o=0,p=(c*m+l)*e,q=c*e,s=j*e,t=0;k>t;t++){var u=n.subarray(o,o+s);g.set(u,p),o+=s,p+=q}this.buffer=g}this.bufferLength=this.buffer.length,this.eof=!0}},a}(),A=function(){function a(a,b,c){this.stream=a,this.maybeLength=b,this.dict=c,u.call(this,b)}return a.prototype=Object.create(u.prototype),Object.defineProperty(a.prototype,"bytes",{get:function(){
// If this.maybeLength is null, we'll get the entire stream.
return l(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),a.prototype.ensureBuffer=function(a){if(!this.bufferLength){var b=new p,c=[],d=this.dict.getArray("DecodeParms");if(
// According to the PDF specification, DecodeParms can be either
// a dictionary, or an array whose elements are dictionaries.
j(d)&&(d.length>1&&m("JBIG2 - 'DecodeParms' array with multiple elements not supported."),d=d[0]),d&&d.has("JBIG2Globals")){var e=d.get("JBIG2Globals"),f=e.getBytes();c.push({data:f,start:0,end:f.length})}c.push({data:this.bytes,start:0,end:this.bytes.length});
// JBIG2 had black as 1 and white as 0, inverting the colors
for(var g=b.parseChunks(c),h=g.length,i=0;h>i;i++)g[i]^=255;this.buffer=g,this.bufferLength=h,this.eof=!0}},a}(),B=function(){function a(a,b,c){this.str=a,this.dict=a.dict,this.decrypt=c,this.nextChunk=null,this.initialized=!1,u.call(this,b)}var b=512;return a.prototype=Object.create(u.prototype),a.prototype.readBlock=function(){var a;if(this.initialized?a=this.nextChunk:(a=this.str.getBytes(b),this.initialized=!0),!a||0===a.length)return void(this.eof=!0);this.nextChunk=this.str.getBytes(b);var c=this.nextChunk&&this.nextChunk.length>0,d=this.decrypt;a=d(a,!c);var e,f=this.bufferLength,g=a.length,h=this.ensureBuffer(f+g);for(e=0;g>e;e++)h[f++]=a[e];this.bufferLength=f},a}(),C=function(){
// Checks if ch is one of the following characters: SPACE, TAB, CR or LF.
function a(a){return 32===a||9===a||13===a||10===a}function b(a,b){this.str=a,this.dict=a.dict,this.input=new Uint8Array(5),
// Most streams increase in size when decoded, but Ascii85 streams
// typically shrink by ~20%.
b&&(b=.8*b),u.call(this,b)}return b.prototype=Object.create(u.prototype),b.prototype.readBlock=function(){for(var b=126,c=122,d=-1,e=this.str,f=e.getByte();a(f);)f=e.getByte();if(f===d||f===b)return void(this.eof=!0);var g,h,i=this.bufferLength;
// special code for z
if(f===c){for(g=this.ensureBuffer(i+4),h=0;4>h;++h)g[i+h]=0;this.bufferLength+=4}else{var j=this.input;for(j[0]=f,h=1;5>h;++h){for(f=e.getByte();a(f);)f=e.getByte();if(j[h]=f,f===d||f===b)break}
// partial ending;
if(g=this.ensureBuffer(i+h-1),this.bufferLength+=h-1,5>h){for(;5>h;++h)j[h]=117;this.eof=!0}var k=0;for(h=0;5>h;++h)k=85*k+(j[h]-33);for(h=3;h>=0;--h)g[i+h]=255&k,k>>=8}},b}(),D=function(){function a(a,b){this.str=a,this.dict=a.dict,this.firstDigit=-1,
// Most streams increase in size when decoded, but AsciiHex streams shrink
// by 50%.
b&&(b=.5*b),u.call(this,b)}return a.prototype=Object.create(u.prototype),a.prototype.readBlock=function(){var a=8e3,b=this.str.getBytes(a);if(!b.length)return void(this.eof=!0);for(var c=b.length+1>>1,d=this.ensureBuffer(this.bufferLength+c),e=this.bufferLength,f=this.firstDigit,g=0,h=b.length;h>g;g++){var i,j=b[g];if(j>=48&&57>=j)// '0'-'9'
i=15&j;else{if(!(j>=65&&70>=j||j>=97&&102>=j)){if(62===j){// '>'
this.eof=!0;break}// probably whitespace
continue}
// 'A'-'Z', 'a'-'z'
i=(15&j)+9}0>f?f=i:(d[e++]=f<<4|i,f=-1)}f>=0&&this.eof&&(
// incomplete byte
d[e++]=f<<4,f=-1),this.firstDigit=f,this.bufferLength=e},a}(),E=function(){function a(a,b){this.str=a,this.dict=a.dict,u.call(this,b)}return a.prototype=Object.create(u.prototype),a.prototype.readBlock=function(){
// The repeatHeader has following format. The first byte defines type of run
// and amount of bytes to repeat/copy: n = 0 through 127 - copy next n bytes
// (in addition to the second byte from the header), n = 129 through 255 -
// duplicate the second byte from the header (257 - n) times, n = 128 - end.
var a=this.str.getBytes(2);if(!a||a.length<2||128===a[0])return void(this.eof=!0);var b,c=this.bufferLength,d=a[0];if(128>d){if(b=this.ensureBuffer(c+d+1),b[c++]=a[1],d>0){var e=this.str.getBytes(d);b.set(e,c),c+=d}}else{d=257-d;var f=a[1];b=this.ensureBuffer(c+d+1);for(var g=0;d>g;g++)b[c++]=f}this.bufferLength=c},a}(),F=function(){function a(a,b,c){this.str=a,this.dict=a.dict,c=c||n.empty,this.encoding=c.get("K")||0,this.eoline=c.get("EndOfLine")||!1,this.byteAlign=c.get("EncodedByteAlign")||!1,this.columns=c.get("Columns")||1728,this.rows=c.get("Rows")||0;var d=c.get("EndOfBlock");null!==d&&void 0!==d||(d=!0),this.eoblock=d,this.black=c.get("BlackIs1")||!1,this.codingLine=new Uint32Array(this.columns+1),this.refLine=new Uint32Array(this.columns+2),this.codingLine[0]=this.columns,this.codingPos=0,this.row=0,this.nextLine2D=this.encoding<0,this.inputBits=0,this.inputBuf=0,this.outputBits=0;for(var e;0===(e=this.lookBits(12));)this.eatBits(1);1===e&&this.eatBits(12),this.encoding>0&&(this.nextLine2D=!this.lookBits(1),this.eatBits(1)),u.call(this,b)}var b=-2,c=-1,d=0,e=1,f=2,g=3,h=4,j=5,k=6,l=7,m=8,o=[[-1,-1],[-1,-1],// 000000x
[7,m],// 0000010
[7,l],// 0000011
[6,k],[6,k],// 000010x
[6,j],[6,j],// 000011x
[4,d],[4,d],// 0001xxx
[4,d],[4,d],[4,d],[4,d],[4,d],[4,d],[3,e],[3,e],// 001xxxx
[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,e],[3,h],[3,h],// 010xxxx
[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,h],[3,g],[3,g],// 011xxxx
[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[3,g],[1,f],[1,f],// 1xxxxxx
[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f],[1,f]],p=[[-1,-1],// 00000
[12,b],// 00001
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
[12,2560]],q=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 0000000xx
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
[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7]],r=[[-1,-1],[-1,-1],// 000000000000x
[12,b],[12,b],// 000000000001x
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
[10,64],[10,64],[10,64],[10,64]],s=[[8,13],[8,13],[8,13],[8,13],// 00000100xxxx
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
[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12]],t=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],// 0000xx
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
return a.prototype=Object.create(u.prototype),a.prototype.readBlock=function(){for(;!this.eof;){var a=this.lookChar();this.ensureBuffer(this.bufferLength+1),this.buffer[this.bufferLength++]=a}},a.prototype.addPixels=function(a,b){var c=this.codingLine,d=this.codingPos;a>c[d]&&(a>this.columns&&(i("row is wrong length"),this.err=!0,a=this.columns),1&d^b&&++d,c[d]=a),this.codingPos=d},a.prototype.addPixelsNeg=function(a,b){var c=this.codingLine,d=this.codingPos;if(a>c[d])a>this.columns&&(i("row is wrong length"),this.err=!0,a=this.columns),1&d^b&&++d,c[d]=a;else if(a<c[d]){for(0>a&&(i("invalid code"),this.err=!0,a=0);d>0&&a<c[d-1];)--d;c[d]=a}this.codingPos=d},a.prototype.lookChar=function(){var a,b,n,o,p=this.refLine,q=this.codingLine,r=this.columns;if(0===this.outputBits){if(this.eof)return null;this.err=!1;var s,t,u;if(this.nextLine2D){for(o=0;q[o]<r;++o)p[o]=q[o];for(p[o++]=r,p[o]=r,q[0]=0,this.codingPos=0,a=0,b=0;q[this.codingPos]<r;)switch(s=this.getTwoDimCode()){case d:this.addPixels(p[a+1],b),p[a+1]<r&&(a+=2);break;case e:if(s=t=0,b){do s+=u=this.getBlackCode();while(u>=64);do t+=u=this.getWhiteCode();while(u>=64)}else{do s+=u=this.getWhiteCode();while(u>=64);do t+=u=this.getBlackCode();while(u>=64)}for(this.addPixels(q[this.codingPos]+s,b),q[this.codingPos]<r&&this.addPixels(q[this.codingPos]+t,1^b);p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case l:if(this.addPixels(p[a]+3,b),b^=1,q[this.codingPos]<r)for(++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case j:if(this.addPixels(p[a]+2,b),b^=1,q[this.codingPos]<r)for(++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case g:if(this.addPixels(p[a]+1,b),b^=1,q[this.codingPos]<r)for(++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case f:if(this.addPixels(p[a],b),b^=1,q[this.codingPos]<r)for(++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case m:if(this.addPixelsNeg(p[a]-3,b),b^=1,q[this.codingPos]<r)for(a>0?--a:++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case k:if(this.addPixelsNeg(p[a]-2,b),b^=1,q[this.codingPos]<r)for(a>0?--a:++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case h:if(this.addPixelsNeg(p[a]-1,b),b^=1,q[this.codingPos]<r)for(a>0?--a:++a;p[a]<=q[this.codingPos]&&p[a]<r;)a+=2;break;case c:this.addPixels(r,0),this.eof=!0;break;default:i("bad 2d code"),this.addPixels(r,0),this.err=!0}}else for(q[0]=0,this.codingPos=0,b=0;q[this.codingPos]<r;){if(s=0,b){do s+=u=this.getBlackCode();while(u>=64)}else do s+=u=this.getWhiteCode();while(u>=64);this.addPixels(q[this.codingPos]+s,b),b^=1}var v=!1;if(this.byteAlign&&(this.inputBits&=-8),this.eoblock||this.row!==this.rows-1){if(s=this.lookBits(12),this.eoline)for(;s!==c&&1!==s;)this.eatBits(1),s=this.lookBits(12);else for(;0===s;)this.eatBits(1),s=this.lookBits(12);1===s?(this.eatBits(12),v=!0):s===c&&(this.eof=!0)}else this.eof=!0;if(!this.eof&&this.encoding>0&&(this.nextLine2D=!this.lookBits(1),this.eatBits(1)),this.eoblock&&v&&this.byteAlign){if(s=this.lookBits(12),1===s){if(this.eatBits(12),this.encoding>0&&(this.lookBits(1),this.eatBits(1)),this.encoding>=0)for(o=0;4>o;++o)s=this.lookBits(12),1!==s&&i("bad rtc code: "+s),this.eatBits(12),this.encoding>0&&(this.lookBits(1),this.eatBits(1));this.eof=!0}}else if(this.err&&this.eoline){for(;;){if(s=this.lookBits(13),s===c)return this.eof=!0,null;if(s>>1===1)break;this.eatBits(1)}this.eatBits(12),this.encoding>0&&(this.eatBits(1),this.nextLine2D=!(1&s))}q[0]>0?this.outputBits=q[this.codingPos=0]:this.outputBits=q[this.codingPos=1],this.row++}var w;if(this.outputBits>=8)w=1&this.codingPos?0:255,this.outputBits-=8,0===this.outputBits&&q[this.codingPos]<r&&(this.codingPos++,this.outputBits=q[this.codingPos]-q[this.codingPos-1]);else{n=8,w=0;do this.outputBits>n?(w<<=n,1&this.codingPos||(w|=255>>8-n),this.outputBits-=n,n=0):(w<<=this.outputBits,1&this.codingPos||(w|=255>>8-this.outputBits),n-=this.outputBits,this.outputBits=0,q[this.codingPos]<r?(this.codingPos++,this.outputBits=q[this.codingPos]-q[this.codingPos-1]):n>0&&(w<<=n,n=0));while(n)}return this.black&&(w^=255),w},a.prototype.findTableCode=function(a,b,d,e){for(var f=e||0,g=a;b>=g;++g){var h=this.lookBits(g);if(h===c)return[!0,1,!1];if(b>g&&(h<<=b-g),!f||h>=f){var i=d[h-f];if(i[0]===g)return this.eatBits(g),[!0,i[1],!0]}}return[!1,0,!1]},a.prototype.getTwoDimCode=function(){var a,b=0;if(this.eoblock){if(b=this.lookBits(7),a=o[b],a&&a[0]>0)return this.eatBits(a[0]),a[1]}else{var d=this.findTableCode(1,7,o);if(d[0]&&d[2])return d[1]}return i("Bad two dim code"),c},a.prototype.getWhiteCode=function(){var a,b=0;if(this.eoblock){if(b=this.lookBits(12),b===c)return 1;if(a=b>>5===0?p[b]:q[b>>3],a[0]>0)return this.eatBits(a[0]),a[1]}else{var d=this.findTableCode(1,9,q);if(d[0])return d[1];if(d=this.findTableCode(11,12,p),d[0])return d[1]}return i("bad white code"),this.eatBits(1),1},a.prototype.getBlackCode=function(){var a,b;if(this.eoblock){if(a=this.lookBits(13),a===c)return 1;if(b=a>>7===0?r[a]:a>>9===0&&a>>7!==0?s[(a>>1)-64]:t[a>>7],b[0]>0)return this.eatBits(b[0]),b[1]}else{var d=this.findTableCode(2,6,t);if(d[0])return d[1];if(d=this.findTableCode(7,12,s,64),d[0])return d[1];if(d=this.findTableCode(10,13,r),d[0])return d[1]}return i("bad black code"),this.eatBits(1),1},a.prototype.lookBits=function(a){for(var b;this.inputBits<a;){if(-1===(b=this.str.getByte()))return 0===this.inputBits?c:this.inputBuf<<a-this.inputBits&65535>>16-a;this.inputBuf=this.inputBuf<<8|b,this.inputBits+=8}return this.inputBuf>>this.inputBits-a&65535>>16-a},a.prototype.eatBits=function(a){(this.inputBits-=a)<0&&(this.inputBits=0)},a}(),G=function(){function a(a,b,c){this.str=a,this.dict=a.dict,this.cachedData=0,this.bitsCached=0;for(var d=4096,e={earlyChange:c,codeLength:9,nextCode:258,dictionaryValues:new Uint8Array(d),dictionaryLengths:new Uint16Array(d),dictionaryPrevCodes:new Uint16Array(d),currentSequence:new Uint8Array(d),currentSequenceLength:0},f=0;256>f;++f)e.dictionaryValues[f]=f,e.dictionaryLengths[f]=1;this.lzwState=e,u.call(this,b)}return a.prototype=Object.create(u.prototype),a.prototype.readBits=function(a){for(var b=this.bitsCached,c=this.cachedData;a>b;){var d=this.str.getByte();if(-1===d)return this.eof=!0,null;c=c<<8|d,b+=8}return this.bitsCached=b-=a,this.cachedData=c,this.lastCode=null,c>>>b&(1<<a)-1},a.prototype.readBlock=function(){var a,b,c,d=512,e=2*d,f=d,g=this.lzwState;if(g){var h=g.earlyChange,i=g.nextCode,j=g.dictionaryValues,k=g.dictionaryLengths,l=g.dictionaryPrevCodes,m=g.codeLength,n=g.prevCode,o=g.currentSequence,p=g.currentSequenceLength,q=0,r=this.bufferLength,s=this.ensureBuffer(this.bufferLength+e);for(a=0;d>a;a++){var t=this.readBits(m),u=p>0;if(256>t)o[0]=t,p=1;else{if(!(t>=258)){if(256===t){m=9,i=258,p=0;continue}this.eof=!0,delete this.lzwState;break}if(i>t)for(p=k[t],b=p-1,c=t;b>=0;b--)o[b]=j[c],c=l[c];else o[p++]=o[0]}if(u&&(l[i]=n,k[i]=k[n]+1,j[i]=o[0],i++,m=i+h&i+h-1?m:0|Math.min(Math.log(i+h)/.6931471805599453+1,12)),n=t,q+=p,q>e){do e+=f;while(q>e);s=this.ensureBuffer(this.bufferLength+e)}for(b=0;p>b;b++)s[r++]=o[b]}g.nextCode=i,g.codeLength=m,g.prevCode=n,g.currentSequenceLength=p,this.bufferLength=r}},a}(),H=function(){function a(){s.call(this,new Uint8Array(0))}return a.prototype=s.prototype,a}();a.Ascii85Stream=C,a.AsciiHexStream=D,a.CCITTFaxStream=F,a.DecryptStream=B,a.DecodeStream=u,a.FlateStream=w,a.Jbig2Stream=A,a.JpegStream=y,a.JpxStream=z,a.NullStream=H,a.PredictorStream=x,a.RunLengthStream=E,a.Stream=s,a.StreamsSequenceStream=v,a.StringStream=t,a.LZWStream=G}),function(a,b){b(a.pdfjsCoreCrypto={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream)}(this,function(a,b,c,d){var e=b.PasswordException,f=b.PasswordResponses,g=b.bytesToString,h=b.error,i=b.isInt,j=b.stringToBytes,k=b.utf8StringToString,l=b.warn,m=c.Name,n=c.isName,o=c.isDict,p=d.DecryptStream,q=function(){function a(a){this.a=0,this.b=0;var b,c,d=new Uint8Array(256),e=0,f=a.length;for(b=0;256>b;++b)d[b]=b;for(b=0;256>b;++b)c=d[b],e=e+c+a[b%f]&255,d[b]=d[e],d[e]=c;this.s=d}return a.prototype={encryptBlock:function(a){var b,c,d,e=a.length,f=this.a,g=this.b,h=this.s,i=new Uint8Array(e);for(b=0;e>b;++b)f=f+1&255,c=h[f],g=g+c&255,d=h[g],h[f]=d,h[g]=c,i[b]=a[b]^h[c+d&255];return this.a=f,this.b=g,i}},a.prototype.decryptBlock=a.prototype.encryptBlock,a}(),r=function(){function a(a,d,e){var f,g,h,i=1732584193,j=-271733879,k=-1732584194,l=271733878,m=e+72&-64,n=new Uint8Array(m);for(f=0;e>f;++f)n[f]=a[d++];for(n[f++]=128,h=m-8;h>f;)n[f++]=0;n[f++]=e<<3&255,n[f++]=e>>5&255,n[f++]=e>>13&255,n[f++]=e>>21&255,n[f++]=e>>>29&255,n[f++]=0,n[f++]=0,n[f++]=0;var o=new Int32Array(16);for(f=0;m>f;){for(g=0;16>g;++g,f+=4)o[g]=n[f]|n[f+1]<<8|n[f+2]<<16|n[f+3]<<24;var p,q,r=i,s=j,t=k,u=l;for(g=0;64>g;++g){16>g?(p=s&t|~s&u,q=g):32>g?(p=u&s|~u&t,q=5*g+1&15):48>g?(p=s^t^u,q=3*g+5&15):(p=t^(s|~u),q=7*g&15);var v=u,w=r+p+c[g]+o[q]|0,x=b[g];u=t,t=s,s=s+(w<<x|w>>>32-x)|0,r=v}i=i+r|0,j=j+s|0,k=k+t|0,l=l+u|0}return new Uint8Array([255&i,i>>8&255,i>>16&255,i>>>24&255,255&j,j>>8&255,j>>16&255,j>>>24&255,255&k,k>>8&255,k>>16&255,k>>>24&255,255&l,l>>8&255,l>>16&255,l>>>24&255])}var b=new Uint8Array([7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]),c=new Int32Array([-680876936,-389564586,606105819,-1044525330,-176418897,1200080426,-1473231341,-45705983,1770035416,-1958414417,-42063,-1990404162,1804603682,-40341101,-1502002290,1236535329,-165796510,-1069501632,643717713,-373897302,-701558691,38016083,-660478335,-405537848,568446438,-1019803690,-187363961,1163531501,-1444681467,-51403784,1735328473,-1926607734,-378558,-2022574463,1839030562,-35309556,-1530992060,1272893353,-155497632,-1094730640,681279174,-358537222,-722521979,76029189,-640364487,-421815835,530742520,-995338651,-198630844,1126891415,-1416354905,-57434055,1700485571,-1894986606,-1051523,-2054922799,1873313359,-30611744,-1560198380,1309151649,-145523070,-1120210379,718787259,-343485551]);return a}(),s=function(){function a(a,b){this.high=0|a,this.low=0|b}return a.prototype={and:function(a){this.high&=a.high,this.low&=a.low},xor:function(a){this.high^=a.high,this.low^=a.low},or:function(a){this.high|=a.high,this.low|=a.low},shiftRight:function(a){a>=32?(this.low=this.high>>>a-32|0,this.high=0):(this.low=this.low>>>a|this.high<<32-a,this.high=this.high>>>a|0)},shiftLeft:function(a){a>=32?(this.high=this.low<<a-32,this.low=0):(this.high=this.high<<a|this.low>>>32-a,this.low=this.low<<a)},rotateRight:function(a){var b,c;32&a?(c=this.low,b=this.high):(b=this.low,c=this.high),a&=31,this.low=b>>>a|c<<32-a,this.high=c>>>a|b<<32-a},not:function(){this.high=~this.high,this.low=~this.low},add:function(a){var b=(this.low>>>0)+(a.low>>>0),c=(this.high>>>0)+(a.high>>>0);b>4294967295&&(c+=1),this.low=0|b,this.high=0|c},copyTo:function(a,b){a[b]=this.high>>>24&255,a[b+1]=this.high>>16&255,a[b+2]=this.high>>8&255,a[b+3]=255&this.high,a[b+4]=this.low>>>24&255,a[b+5]=this.low>>16&255,a[b+6]=this.low>>8&255,a[b+7]=255&this.low},assign:function(a){this.high=a.high,this.low=a.low}},a}(),t=function(){function a(a,b){return a>>>b|a<<32-b}function b(a,b,c){return a&b^~a&c}function c(a,b,c){return a&b^a&c^b&c}function d(b){return a(b,2)^a(b,13)^a(b,22)}function e(b){return a(b,6)^a(b,11)^a(b,25)}function f(b){return a(b,7)^a(b,18)^b>>>3}function g(b){return a(b,17)^a(b,19)^b>>>10}function h(a,h,j){
// initial hash values
var k,l,m,n=1779033703,o=3144134277,p=1013904242,q=2773480762,r=1359893119,s=2600822924,t=528734635,u=1541459225,v=64*Math.ceil((j+9)/64),w=new Uint8Array(v);for(k=0;j>k;++k)w[k]=a[h++];for(w[k++]=128,m=v-8;m>k;)w[k++]=0;w[k++]=0,w[k++]=0,w[k++]=0,w[k++]=j>>>29&255,w[k++]=j>>21&255,w[k++]=j>>13&255,w[k++]=j>>5&255,w[k++]=j<<3&255;var x=new Uint32Array(64);
// for each 512 bit block
for(k=0;v>k;){for(l=0;16>l;++l)x[l]=w[k]<<24|w[k+1]<<16|w[k+2]<<8|w[k+3],k+=4;for(l=16;64>l;++l)x[l]=g(x[l-2])+x[l-7]+f(x[l-15])+x[l-16]|0;var y,z,A=n,B=o,C=p,D=q,E=r,F=s,G=t,H=u;for(l=0;64>l;++l)y=H+e(E)+b(E,F,G)+i[l]+x[l],z=d(A)+c(A,B,C),H=G,G=F,F=E,E=D+y|0,D=C,C=B,B=A,A=y+z|0;n=n+A|0,o=o+B|0,p=p+C|0,q=q+D|0,r=r+E|0,s=s+F|0,t=t+G|0,u=u+H|0}return new Uint8Array([n>>24&255,n>>16&255,n>>8&255,255&n,o>>24&255,o>>16&255,o>>8&255,255&o,p>>24&255,p>>16&255,p>>8&255,255&p,q>>24&255,q>>16&255,q>>8&255,255&q,r>>24&255,r>>16&255,r>>8&255,255&r,s>>24&255,s>>16&255,s>>8&255,255&s,t>>24&255,t>>16&255,t>>8&255,255&t,u>>24&255,u>>16&255,u>>8&255,255&u])}var i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];return h}(),u=function(){function a(a,b,c,d,e){a.assign(b),a.and(c),e.assign(b),e.not(),e.and(d),a.xor(e)}function b(a,b,c,d,e){a.assign(b),a.and(c),e.assign(b),e.and(d),a.xor(e),e.assign(c),e.and(d),a.xor(e)}function c(a,b,c){a.assign(b),a.rotateRight(28),c.assign(b),c.rotateRight(34),a.xor(c),c.assign(b),c.rotateRight(39),a.xor(c)}function d(a,b,c){a.assign(b),a.rotateRight(14),c.assign(b),c.rotateRight(18),a.xor(c),c.assign(b),c.rotateRight(41),a.xor(c)}function e(a,b,c){a.assign(b),a.rotateRight(1),c.assign(b),c.rotateRight(8),a.xor(c),c.assign(b),c.shiftRight(7),a.xor(c)}function f(a,b,c){a.assign(b),a.rotateRight(19),c.assign(b),c.rotateRight(61),a.xor(c),c.assign(b),c.shiftRight(6),a.xor(c)}function g(g,i,j,k){k=!!k;
// initial hash values
var l,m,n,o,p,q,r,t;k?(l=new s(3418070365,3238371032),m=new s(1654270250,914150663),n=new s(2438529370,812702999),o=new s(355462360,4144912697),p=new s(1731405415,4290775857),q=new s(2394180231,1750603025),r=new s(3675008525,1694076839),t=new s(1203062813,3204075428)):(l=new s(1779033703,4089235720),m=new s(3144134277,2227873595),n=new s(1013904242,4271175723),o=new s(2773480762,1595750129),p=new s(1359893119,2917565137),q=new s(2600822924,725511199),r=new s(528734635,4215389547),t=new s(1541459225,327033209));
// pre-processing
var u,v,w,x=128*Math.ceil((j+17)/128),y=new Uint8Array(x);for(u=0;j>u;++u)y[u]=g[i++];for(y[u++]=128,w=x-16;w>u;)y[u++]=0;y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=0,y[u++]=j>>>29&255,y[u++]=j>>21&255,y[u++]=j>>13&255,y[u++]=j>>5&255,y[u++]=j<<3&255;var z=new Array(80);for(u=0;80>u;u++)z[u]=new s(0,0);var A,B=new s(0,0),C=new s(0,0),D=new s(0,0),E=new s(0,0),F=new s(0,0),G=new s(0,0),H=new s(0,0),I=new s(0,0),J=new s(0,0),K=new s(0,0),L=new s(0,0),M=new s(0,0);
// for each 1024 bit block
for(u=0;x>u;){for(v=0;16>v;++v)z[v].high=y[u]<<24|y[u+1]<<16|y[u+2]<<8|y[u+3],z[v].low=y[u+4]<<24|y[u+5]<<16|y[u+6]<<8|y[u+7],u+=8;for(v=16;80>v;++v)A=z[v],f(A,z[v-2],M),A.add(z[v-7]),e(L,z[v-15],M),A.add(L),A.add(z[v-16]);for(B.assign(l),C.assign(m),D.assign(n),E.assign(o),F.assign(p),G.assign(q),H.assign(r),I.assign(t),v=0;80>v;++v)J.assign(I),d(L,F,M),J.add(L),a(L,F,G,H,M),J.add(L),J.add(h[v]),J.add(z[v]),c(K,B,M),b(L,B,C,D,M),K.add(L),A=I,I=H,H=G,G=F,E.add(J),F=E,E=D,D=C,C=B,A.assign(J),A.add(K),B=A;l.add(B),m.add(C),n.add(D),o.add(E),p.add(F),q.add(G),r.add(H),t.add(I)}var N;return k?(N=new Uint8Array(48),l.copyTo(N,0),m.copyTo(N,8),n.copyTo(N,16),o.copyTo(N,24),p.copyTo(N,32),q.copyTo(N,40)):(N=new Uint8Array(64),l.copyTo(N,0),m.copyTo(N,8),n.copyTo(N,16),o.copyTo(N,24),p.copyTo(N,32),q.copyTo(N,40),r.copyTo(N,48),t.copyTo(N,56)),N}var h=[new s(1116352408,3609767458),new s(1899447441,602891725),new s(3049323471,3964484399),new s(3921009573,2173295548),new s(961987163,4081628472),new s(1508970993,3053834265),new s(2453635748,2937671579),new s(2870763221,3664609560),new s(3624381080,2734883394),new s(310598401,1164996542),new s(607225278,1323610764),new s(1426881987,3590304994),new s(1925078388,4068182383),new s(2162078206,991336113),new s(2614888103,633803317),new s(3248222580,3479774868),new s(3835390401,2666613458),new s(4022224774,944711139),new s(264347078,2341262773),new s(604807628,2007800933),new s(770255983,1495990901),new s(1249150122,1856431235),new s(1555081692,3175218132),new s(1996064986,2198950837),new s(2554220882,3999719339),new s(2821834349,766784016),new s(2952996808,2566594879),new s(3210313671,3203337956),new s(3336571891,1034457026),new s(3584528711,2466948901),new s(113926993,3758326383),new s(338241895,168717936),new s(666307205,1188179964),new s(773529912,1546045734),new s(1294757372,1522805485),new s(1396182291,2643833823),new s(1695183700,2343527390),new s(1986661051,1014477480),new s(2177026350,1206759142),new s(2456956037,344077627),new s(2730485921,1290863460),new s(2820302411,3158454273),new s(3259730800,3505952657),new s(3345764771,106217008),new s(3516065817,3606008344),new s(3600352804,1432725776),new s(4094571909,1467031594),new s(275423344,851169720),new s(430227734,3100823752),new s(506948616,1363258195),new s(659060556,3750685593),new s(883997877,3785050280),new s(958139571,3318307427),new s(1322822218,3812723403),new s(1537002063,2003034995),new s(1747873779,3602036899),new s(1955562222,1575990012),new s(2024104815,1125592928),new s(2227730452,2716904306),new s(2361852424,442776044),new s(2428436474,593698344),new s(2756734187,3733110249),new s(3204031479,2999351573),new s(3329325298,3815920427),new s(3391569614,3928383900),new s(3515267271,566280711),new s(3940187606,3454069534),new s(4118630271,4000239992),new s(116418474,1914138554),new s(174292421,2731055270),new s(289380356,3203993006),new s(460393269,320620315),new s(685471733,587496836),new s(852142971,1086792851),new s(1017036298,365543100),new s(1126000580,2618297676),new s(1288033470,3409855158),new s(1501505948,4234509866),new s(1607167915,987167468),new s(1816402316,1246189591)];return g}(),v=function(){function a(a,b,c){return u(a,b,c,!0)}return a}(),w=function(){function a(){}return a.prototype={decryptBlock:function(a){return a}},a}(),x=function(){function a(a){var b=176,c=new Uint8Array(b);c.set(a);for(var d=16,e=1;b>d;++e){
// RotWord
var h=c[d-3],i=c[d-2],j=c[d-1],k=c[d-4];
// SubWord
h=g[h],i=g[i],j=g[j],k=g[k],
// Rcon
h^=f[e];for(var l=0;4>l;++l)c[d]=h^=c[d-16],d++,c[d]=i^=c[d-16],d++,c[d]=j^=c[d-16],d++,c[d]=k^=c[d-16],d++}return c}function b(a,b){var c=new Uint8Array(16);c.set(a);var d,e,f,g,i,j;
// AddRoundKey
for(e=0,f=160;16>e;++e,++f)c[e]^=b[f];for(d=9;d>=1;--d){
// InvSubBytes
for(g=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=g,g=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=g,c[2]=i,g=c[15],i=c[11],j=c[7],c[15]=c[3],c[11]=g,c[7]=i,c[3]=j,e=0;16>e;++e)c[e]=h[c[e]];
// AddRoundKey
for(e=0,f=16*d;16>e;++e,++f)c[e]^=b[f];
// InvMixColumns
for(e=0;16>e;e+=4){var l=k[c[e]],m=k[c[e+1]],n=k[c[e+2]],o=k[c[e+3]];g=l^m>>>8^m<<24^n>>>16^n<<16^o>>>24^o<<8,c[e]=g>>>24&255,c[e+1]=g>>16&255,c[e+2]=g>>8&255,c[e+3]=255&g}}for(g=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=g,g=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=g,c[2]=i,g=c[15],i=c[11],j=c[7],c[15]=c[3],c[11]=g,c[7]=i,c[3]=j,e=0;16>e;++e)
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
for(e=h[1],h[1]=h[5],h[5]=h[9],h[9]=h[13],h[13]=e,e=h[2],d=h[6],h[2]=h[10],h[6]=h[14],h[10]=e,h[14]=d,e=h[3],d=h[7],c=h[11],h[3]=h[15],h[7]=e,h[11]=d,h[15]=c,k=0,f=160;16>k;++k,++f)h[k]^=b[f];return h}function d(b){this.key=a(b),this.buffer=new Uint8Array(16),this.bufferPosition=0}function e(a,c){var d,e,f,g=a.length,h=this.buffer,i=this.bufferPosition,j=[],k=this.iv;for(d=0;g>d;++d)if(h[i]=a[d],++i,!(16>i)){
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
var l=16*j.length,m=new Uint8Array(l);for(d=0,e=0,f=j.length;f>d;++d,e+=16)m.set(j[d],e);return m}},d}(),y=function(){function a(a){var b=240,c=new Uint8Array(b),d=1;c.set(a);for(var e=32,g=1;b>e;++g){if(e%32===16)h=f[h],i=f[i],j=f[j],k=f[k];else if(e%32===0){
// RotWord
var h=c[e-3],i=c[e-2],j=c[e-1],k=c[e-4];
// SubWord
h=f[h],i=f[i],j=f[j],k=f[k],
// Rcon
h^=d,(d<<=1)>=256&&(d=255&(27^d))}for(var l=0;4>l;++l)c[e]=h^=c[e-32],e++,c[e]=i^=c[e-32],e++,c[e]=j^=c[e-32],e++,c[e]=k^=c[e-32],e++}return c}function b(a,b){var c=new Uint8Array(16);c.set(a);var d,e,f,h,i,k;
// AddRoundKey
for(e=0,f=224;16>e;++e,++f)c[e]^=b[f];for(d=13;d>=1;--d){
// InvSubBytes
for(h=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=h,h=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=h,c[2]=i,h=c[15],i=c[11],k=c[7],c[15]=c[3],c[11]=h,c[7]=i,c[3]=k,e=0;16>e;++e)c[e]=g[c[e]];
// AddRoundKey
for(e=0,f=16*d;16>e;++e,++f)c[e]^=b[f];
// InvMixColumns
for(e=0;16>e;e+=4){var l=j[c[e]],m=j[c[e+1]],n=j[c[e+2]],o=j[c[e+3]];h=l^m>>>8^m<<24^n>>>16^n<<16^o>>>24^o<<8,c[e]=h>>>24&255,c[e+1]=h>>16&255,c[e+2]=h>>8&255,c[e+3]=255&h}}for(h=c[13],c[13]=c[9],c[9]=c[5],c[5]=c[1],c[1]=h,h=c[14],i=c[10],c[14]=c[6],c[10]=c[2],c[6]=h,c[2]=i,h=c[15],i=c[11],k=c[7],c[15]=c[3],c[11]=h,c[7]=i,c[3]=k,e=0;16>e;++e)
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
for(e=j[1],j[1]=j[5],j[5]=j[9],j[9]=j[13],j[13]=e,e=j[2],d=j[6],j[2]=j[10],j[6]=j[14],j[10]=e,j[14]=d,e=j[3],d=j[7],c=j[11],j[3]=j[15],j[7]=e,j[11]=d,j[15]=c,k=0,g=224;16>k;++k,++g)j[k]^=b[g];return j}function d(b){this.key=a(b),this.buffer=new Uint8Array(16),this.bufferPosition=0}function e(a,c){var d,e,f,g=a.length,h=this.buffer,i=this.bufferPosition,j=[],k=this.iv;for(d=0;g>d;++d)if(h[i]=a[d],++i,!(16>i)){
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
var l=16*j.length,m=new Uint8Array(l);for(d=0,e=0,f=j.length;f>d;++d,e+=16)m.set(j[d],e);return m}},d}(),z=function(){function a(a,b){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0}function b(){}return b.prototype={checkOwnerPassword:function(b,c,d,e){var f=new Uint8Array(b.length+56);f.set(b,0),f.set(c,b.length),f.set(d,b.length+c.length);var g=t(f,0,f.length);return a(g,e)},checkUserPassword:function(b,c,d){var e=new Uint8Array(b.length+8);e.set(b,0),e.set(c,b.length);var f=t(e,0,e.length);return a(f,d)},getOwnerKey:function(a,b,c,d){var e=new Uint8Array(a.length+56);e.set(a,0),e.set(b,a.length),e.set(c,a.length+b.length);var f=t(e,0,e.length),g=new y(f);return g.decryptBlock(d,!1,new Uint8Array(16))},getUserKey:function(a,b,c){var d=new Uint8Array(a.length+8);d.set(a,0),d.set(b,a.length);
//key is the decryption key for the UE string
var e=t(d,0,d.length),f=new y(e);return f.decryptBlock(c,!1,new Uint8Array(16))}},b}(),A=function(){function a(a,b){var c=new Uint8Array(a.length+b.length);return c.set(a,0),c.set(b,a.length),c}function b(b,c,d){for(
//This refers to Algorithm 2.B as defined in ISO 32000-2
var e=t(c,0,c.length).subarray(0,32),f=[0],g=0;64>g||f[f.length-1]>g-32;){var h=b.length+e.length+d.length,i=new Uint8Array(64*h),j=a(b,e);j=a(j,d);for(var k=0,l=0;64>k;k++,l+=h)i.set(j,l);
//AES128 CBC NO PADDING with
//first 16 bytes of k as the key and the second 16 as the iv.
var m=new x(e.subarray(0,16));f=m.encrypt(i,e.subarray(16,32));for(var n=0,o=0;16>o;o++)n*=1,n%=3,n+=(f[o]>>>0)%3,n%=3;0===n?e=t(f,0,f.length):1===n?e=v(f,0,f.length):2===n&&(e=u(f,0,f.length)),g++}return e.subarray(0,32)}function c(){}function d(a,b){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0}return c.prototype={hash:function(a,c,d){return b(a,c,d)},checkOwnerPassword:function(a,c,e,f){var g=new Uint8Array(a.length+56);g.set(a,0),g.set(c,a.length),g.set(e,a.length+c.length);var h=b(a,g,e);return d(h,f)},checkUserPassword:function(a,c,e){var f=new Uint8Array(a.length+8);f.set(a,0),f.set(c,a.length);var g=b(a,f,[]);return d(g,e)},getOwnerKey:function(a,c,d,e){var f=new Uint8Array(a.length+56);f.set(a,0),f.set(c,a.length),f.set(d,a.length+c.length);var g=b(a,f,d),h=new y(g);return h.decryptBlock(e,!1,new Uint8Array(16))},getUserKey:function(a,c,d){var e=new Uint8Array(a.length+8);e.set(a,0),e.set(c,a.length);
//key is the decryption key for the UE string
var f=b(a,e,[]),g=new y(f);return g.decryptBlock(d,!1,new Uint8Array(16))}},c}(),B=function(){function a(a,b){this.stringCipherConstructor=a,this.streamCipherConstructor=b}return a.prototype={createStream:function(a,b){var c=new this.streamCipherConstructor;return new p(a,b,function(a,b){return c.decryptBlock(a,b)})},decryptString:function(a){var b=new this.stringCipherConstructor,c=j(a);return c=b.decryptBlock(c,!0),g(c)}},a}(),C=function(){function a(a,b,c,d,e,f,g,h,i,j,k,l){if(b){var m=Math.min(127,b.length);b=b.subarray(0,m)}else b=[];var n;return n=6===a?new A:new z,n.checkUserPassword(b,h,g)?n.getUserKey(b,i,k):b.length&&n.checkOwnerPassword(b,d,f,c)?n.getOwnerKey(b,e,f,j):null}function b(a,b,c,d,e,f,g,h){var i,j,k=40+c.length+a.length,l=new Uint8Array(k),m=0;if(b)for(j=Math.min(32,b.length);j>m;++m)l[m]=b[m];for(i=0;32>m;)l[m++]=s[i++];
// as now the padded password in the hashData[0..i]
for(i=0,j=c.length;j>i;++i)l[m++]=c[i];for(l[m++]=255&e,l[m++]=e>>8&255,l[m++]=e>>16&255,l[m++]=e>>>24&255,i=0,j=a.length;j>i;++i)l[m++]=a[i];f>=4&&!h&&(l[m++]=255,l[m++]=255,l[m++]=255,l[m++]=255);var n=r(l,0,m),o=g>>3;if(f>=3)for(i=0;50>i;++i)n=r(n,0,o);var p,t,u=n.subarray(0,o);if(f>=3){for(m=0;32>m;++m)l[m]=s[m];for(i=0,j=a.length;j>i;++i)l[m++]=a[i];p=new q(u),t=p.encryptBlock(r(l,0,m)),j=u.length;var v,w=new Uint8Array(j);for(i=1;19>=i;++i){for(v=0;j>v;++v)w[v]=u[v]^i;p=new q(w),t=p.encryptBlock(t)}for(i=0,j=t.length;j>i;++i)if(d[i]!==t[i])return null}else for(p=new q(u),t=p.encryptBlock(s),i=0,j=t.length;j>i;++i)if(d[i]!==t[i])return null;return u}function c(a,b,c,d){var e,f,g=new Uint8Array(32),h=0;for(f=Math.min(32,a.length);f>h;++h)g[h]=a[h];for(e=0;32>h;)g[h++]=s[e++];var i=r(g,0,h),j=d>>3;if(c>=3)for(e=0;50>e;++e)i=r(i,0,i.length);var k,l;if(c>=3){l=b;var m,n=new Uint8Array(j);for(e=19;e>=0;e--){for(m=0;j>m;++m)n[m]=i[m]^e;k=new q(n),l=k.encryptBlock(l)}}else k=new q(i.subarray(0,j)),l=k.encryptBlock(b);return l}function d(d,g,m){var p=d.get("Filter");n(p)&&"Standard"===p.name||h("unknown encryption method"),this.dict=d;var q=d.get("V");(!i(q)||1!==q&&2!==q&&4!==q&&5!==q)&&h("unsupported encryption algorithm"),this.algorithm=q;var r=d.get("Length");if(!r)
// Spec asks to rely on encryption dictionary's Length entry, however
// some PDFs don't have it. Trying to recover.
if(3>=q)
// For 1 and 2 it's fixed to 40-bit, for 3 40-bit is a minimal value.
r=40;else{
// Trying to find default handler -- it usually has Length.
var s=d.get("CF"),u=d.get("StmF");if(o(s)&&n(u)){var v=s.get(u.name);r=v&&v.get("Length")||128,40>r&&(
// Sometimes it's incorrect value of bits, generators specify bytes.
r<<=3)}}(!i(r)||40>r||r%8!==0)&&h("invalid key length");
// prepare keys
var w=j(d.get("O")).subarray(0,32),x=j(d.get("U")).subarray(0,32),y=d.get("P"),z=d.get("R"),A=(4===q||5===q)&&d.get("EncryptMetadata")!==!1;this.encryptMetadata=A;var B,C=j(g);if(m){if(6===z)try{m=k(m)}catch(D){l("CipherTransformFactory: Unable to convert UTF8 encoded password.")}B=j(m)}var E;if(5!==q)E=b(C,B,w,x,y,z,r,A);else{var F=j(d.get("O")).subarray(32,40),G=j(d.get("O")).subarray(40,48),H=j(d.get("U")).subarray(0,48),I=j(d.get("U")).subarray(32,40),J=j(d.get("U")).subarray(40,48),K=j(d.get("OE")),L=j(d.get("UE")),M=j(d.get("Perms"));E=a(z,B,w,F,G,H,x,I,J,K,L,M)}if(!E&&!m)throw new e("No password given",f.NEED_PASSWORD);if(!E&&m){
// Attempting use the password as an owner password
var N=c(B,w,z,r);E=b(C,N,w,x,y,z,r,A)}if(!E)throw new e("Incorrect Password",f.INCORRECT_PASSWORD);this.encryptionKey=E,q>=4&&(this.cf=d.get("CF"),this.stmf=d.get("StmF")||t,this.strf=d.get("StrF")||t,this.eff=d.get("EFF")||this.stmf)}function g(a,b,c,d){var e,f,g=new Uint8Array(c.length+9);for(e=0,f=c.length;f>e;++e)g[e]=c[e];g[e++]=255&a,g[e++]=a>>8&255,g[e++]=a>>16&255,g[e++]=255&b,g[e++]=b>>8&255,d&&(g[e++]=115,g[e++]=65,g[e++]=108,g[e++]=84);var h=r(g,0,e);return h.subarray(0,Math.min(c.length+5,16))}function p(a,b,c,d,e){var f,i=a.get(b.name);return null!==i&&void 0!==i&&(f=i.get("CFM")),f&&"None"!==f.name?"V2"===f.name?function(){return new q(g(c,d,e,!1))}:"AESV2"===f.name?function(){return new x(g(c,d,e,!0))}:"AESV3"===f.name?function(){return new y(e)}:void h("Unknown crypto method"):function(){return new w}}var s=new Uint8Array([40,191,78,94,78,117,138,65,100,0,78,86,255,250,1,8,46,46,0,182,208,104,62,128,47,12,169,254,100,83,105,122]),t=m.get("Identity");return d.prototype={createCipherTransform:function(a,b){if(4===this.algorithm||5===this.algorithm)return new B(p(this.cf,this.stmf,a,b,this.encryptionKey),p(this.cf,this.strf,a,b,this.encryptionKey));
// algorithms 1 and 2
var c=g(a,b,this.encryptionKey,!1),d=function(){return new q(c)};return new B(d,d)}},d}();a.AES128Cipher=x,a.AES256Cipher=y,a.ARCFourCipher=q,a.CipherTransformFactory=C,a.PDF17=z,a.PDF20=A,a.calculateMD5=r,a.calculateSHA256=t,a.calculateSHA384=v,a.calculateSHA512=u}),function(a,b){b(a.pdfjsCoreFontRenderer={},a.pdfjsSharedUtil,a.pdfjsCoreStream,a.pdfjsCoreGlyphList,a.pdfjsCoreEncodings,a.pdfjsCoreCFFParser)}(this,function(a,b,c,d,e,f){var g=b.Util,h=b.bytesToString,i=b.error,j=c.Stream,k=d.getGlyphsUnicode,l=e.StandardEncoding,m=f.CFFParser,n=function(){function a(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]}function b(a,b){return a[b]<<8|a[b+1]}function c(c,d,e){var f,g,h,j,k=1===b(c,d+2)?a(c,d+8):a(c,d+16),l=b(c,d+k);if(4===l){f=b(c,d+k+2);var m=b(c,d+k+6)>>1;for(h=d+k+14,g=[],j=0;m>j;j++,h+=2)g[j]={end:b(c,h)};for(h+=2,j=0;m>j;j++,h+=2)g[j].start=b(c,h);for(j=0;m>j;j++,h+=2)g[j].idDelta=b(c,h);for(j=0;m>j;j++,h+=2){var n=b(c,h);if(0!==n){g[j].ids=[];for(var o=0,p=g[j].end-g[j].start+1;p>o;o++)g[j].ids[o]=b(c,h+n),n+=2}}return g}if(12===l){f=a(c,d+k+4);var q=a(c,d+k+12);for(h=d+k+16,g=[],j=0;q>j;j++)g.push({start:a(c,h),end:a(c,h+4),idDelta:a(c,h+8)-a(c,h)}),h+=12;return g}i("not supported cmap: "+l)}function d(a,b,c,d){var e={},f=new m(new j(a,b,c-b),e,d),g=f.parse();return{glyphs:g.charStrings.objects,subrs:g.topDict.privateDict&&g.topDict.privateDict.subrsIndex&&g.topDict.privateDict.subrsIndex.objects,gsubrs:g.globalSubrIndex&&g.globalSubrIndex.objects}}function e(a,b,c){var d,e;c?(d=4,e=function(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]}):(d=2,e=function(a,b){return a[b]<<9|a[b+1]<<1});for(var f=[],g=e(b,0),h=d;h<b.length;h+=d){var i=e(b,h);f.push(a.subarray(g,i)),g=i}return f}function f(a,b){for(var c=b.charCodeAt(0),d=0,e=0,f=a.length-1;f>e;){var g=e+f+1>>1;c<a[g].start?f=g-1:e=g}return a[e].start<=c&&c<=a[e].end&&(d=a[e].idDelta+(a[e].ids?a[e].ids[c-a[e].start]:c)&65535),{charCode:c,glyphId:d}}function n(a,b,c){function d(a,c){b.push({cmd:"moveTo",args:[a,c]})}function e(a,c){b.push({cmd:"lineTo",args:[a,c]})}function f(a,c,d,e){b.push({cmd:"quadraticCurveTo",args:[a,c,d,e]})}var g,h=0,i=(a[h]<<24|a[h+1]<<16)>>16,j=0,k=0;if(h+=10,0>i){
// composite glyph
do{g=a[h]<<8|a[h+1];var l=a[h+2]<<8|a[h+3];h+=4;var m,o;1&g?(m=(a[h]<<24|a[h+1]<<16)>>16,o=(a[h+2]<<24|a[h+3]<<16)>>16,h+=4):(m=a[h++],o=a[h++]),2&g?(j=m,k=o):(j=0,k=0);var p=1,q=1,r=0,s=0;8&g?(p=q=(a[h]<<24|a[h+1]<<16)/1073741824,h+=2):64&g?(p=(a[h]<<24|a[h+1]<<16)/1073741824,q=(a[h+2]<<24|a[h+3]<<16)/1073741824,h+=4):128&g&&(p=(a[h]<<24|a[h+1]<<16)/1073741824,r=(a[h+2]<<24|a[h+3]<<16)/1073741824,s=(a[h+4]<<24|a[h+5]<<16)/1073741824,q=(a[h+6]<<24|a[h+7]<<16)/1073741824,h+=8);var t=c.glyphs[l];t&&(b.push({cmd:"save"}),b.push({cmd:"transform",args:[p,r,s,q,j,k]}),n(t,b,c),b.push({cmd:"restore"}))}while(32&g)}else{
// simple glyph
var u,v,w=[];for(u=0;i>u;u++)w.push(a[h]<<8|a[h+1]),h+=2;var x=a[h]<<8|a[h+1];h+=2+x;for(// skipping the instructions
var y=w[w.length-1]+1,z=[];z.length<y;){g=a[h++];var A=1;for(8&g&&(A+=a[h++]);A-- >0;)z.push({flags:g})}for(u=0;y>u;u++){switch(18&z[u].flags){case 0:j+=(a[h]<<24|a[h+1]<<16)>>16,h+=2;break;case 2:j-=a[h++];break;case 18:j+=a[h++]}z[u].x=j}for(u=0;y>u;u++){switch(36&z[u].flags){case 0:k+=(a[h]<<24|a[h+1]<<16)>>16,h+=2;break;case 4:k-=a[h++];break;case 36:k+=a[h++]}z[u].y=k}var B=0;for(h=0;i>h;h++){var C=w[h],D=z.slice(B,C+1);if(1&D[0].flags)D.push(D[0]);else if(1&D[D.length-1].flags)
// first is off-curve point, trying to use one from the end
D.unshift(D[D.length-1]);else{
// start and end are off-curve points, creating implicit one
var E={flags:1,x:(D[0].x+D[D.length-1].x)/2,y:(D[0].y+D[D.length-1].y)/2};D.unshift(E),D.push(E)}for(d(D[0].x,D[0].y),u=1,v=D.length;v>u;u++)1&D[u].flags?e(D[u].x,D[u].y):1&D[u+1].flags?(f(D[u].x,D[u].y,D[u+1].x,D[u+1].y),u++):f(D[u].x,D[u].y,(D[u].x+D[u+1].x)/2,(D[u].y+D[u+1].y)/2);B=C+1}}}function o(a,b,c){function d(a,c){b.push({cmd:"moveTo",args:[a,c]})}function e(a,c){b.push({cmd:"lineTo",args:[a,c]})}function g(a,c,d,e,f,g){b.push({cmd:"bezierCurveTo",args:[a,c,d,e,f,g]})}function h(a){for(var p=0;p<a.length;){var q,r,s,t,u,v,w,x,y,z=!1,A=a[p++];switch(A){case 1:// hstem
n+=j.length>>1,z=!0;break;case 3:// vstem
n+=j.length>>1,z=!0;break;case 4:// vmoveto
m+=j.pop(),d(k,m),z=!0;break;case 5:// rlineto
for(;j.length>0;)k+=j.shift(),m+=j.shift(),e(k,m);break;case 6:// hlineto
for(;j.length>0&&(k+=j.shift(),e(k,m),0!==j.length);)m+=j.shift(),e(k,m);break;case 7:// vlineto
for(;j.length>0&&(m+=j.shift(),e(k,m),0!==j.length);)k+=j.shift(),e(k,m);break;case 8:// rrcurveto
for(;j.length>0;)q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+j.shift(),g(q,s,r,t,k,m);break;case 10:// callsubr
x=j.pop()+c.subrsBias,y=c.subrs[x],y&&h(y);break;case 11:// return
return;case 12:switch(A=a[p++]){case 34:// flex
q=k+j.shift(),r=q+j.shift(),u=m+j.shift(),k=r+j.shift(),g(q,m,r,u,k,u),q=k+j.shift(),r=q+j.shift(),k=r+j.shift(),g(q,u,r,m,k,m);break;case 35:// flex
q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+j.shift(),g(q,s,r,t,k,m),q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+j.shift(),g(q,s,r,t,k,m),j.pop();// fd
break;case 36:// hflex1
q=k+j.shift(),u=m+j.shift(),r=q+j.shift(),v=u+j.shift(),k=r+j.shift(),g(q,u,r,v,k,v),q=k+j.shift(),r=q+j.shift(),w=v+j.shift(),k=r+j.shift(),g(q,v,r,w,k,m);break;case 37:// flex1
var B=k,C=m;q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+j.shift(),g(q,s,r,t,k,m),q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r,m=t,Math.abs(k-B)>Math.abs(m-C)?k+=j.shift():m+=j.shift(),g(q,s,r,t,k,m);break;default:i("unknown operator: 12 "+A)}break;case 14:// endchar
if(j.length>=4){var D=j.pop(),E=j.pop();m=j.pop(),k=j.pop(),b.push({cmd:"save"}),b.push({cmd:"translate",args:[k,m]});var F=f(c.cmap,String.fromCharCode(c.glyphNameMap[l[D]]));o(c.glyphs[F.glyphId],b,c),b.push({cmd:"restore"}),F=f(c.cmap,String.fromCharCode(c.glyphNameMap[l[E]])),o(c.glyphs[F.glyphId],b,c)}return;case 18:// hstemhm
n+=j.length>>1,z=!0;break;case 19:// hintmask
n+=j.length>>1,p+=n+7>>3,z=!0;break;case 20:// cntrmask
n+=j.length>>1,p+=n+7>>3,z=!0;break;case 21:// rmoveto
m+=j.pop(),k+=j.pop(),d(k,m),z=!0;break;case 22:// hmoveto
k+=j.pop(),d(k,m),z=!0;break;case 23:// vstemhm
n+=j.length>>1,z=!0;break;case 24:// rcurveline
for(;j.length>2;)q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+j.shift(),g(q,s,r,t,k,m);k+=j.shift(),m+=j.shift(),e(k,m);break;case 25:// rlinecurve
for(;j.length>6;)k+=j.shift(),m+=j.shift(),e(k,m);q=k+j.shift(),s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+j.shift(),g(q,s,r,t,k,m);break;case 26:for(// vvcurveto
j.length%2&&(k+=j.shift());j.length>0;)q=k,s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r,m=t+j.shift(),g(q,s,r,t,k,m);break;case 27:for(// hhcurveto
j.length%2&&(m+=j.shift());j.length>0;)q=k+j.shift(),s=m,r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t,g(q,s,r,t,k,m);break;case 28:j.push((a[p]<<24|a[p+1]<<16)>>16),p+=2;break;case 29:// callgsubr
x=j.pop()+c.gsubrsBias,y=c.gsubrs[x],y&&h(y);break;case 30:// vhcurveto
for(;j.length>0&&(q=k,s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+(1===j.length?j.shift():0),g(q,s,r,t,k,m),0!==j.length);)q=k+j.shift(),s=m,r=q+j.shift(),t=s+j.shift(),m=t+j.shift(),k=r+(1===j.length?j.shift():0),g(q,s,r,t,k,m);break;case 31:// hvcurveto
for(;j.length>0&&(q=k+j.shift(),s=m,r=q+j.shift(),t=s+j.shift(),m=t+j.shift(),k=r+(1===j.length?j.shift():0),g(q,s,r,t,k,m),0!==j.length);)q=k,s=m+j.shift(),r=q+j.shift(),t=s+j.shift(),k=r+j.shift(),m=t+(1===j.length?j.shift():0),g(q,s,r,t,k,m);break;default:32>A&&i("unknown operator: "+A),247>A?j.push(A-139):251>A?j.push(256*(A-247)+a[p++]+108):255>A?j.push(256*-(A-251)-a[p++]-108):(j.push((a[p]<<24|a[p+1]<<16|a[p+2]<<8|a[p+3])/65536),p+=4)}z&&(j.length=0)}}var j=[],k=0,m=0,n=0;h(a)}function p(a){this.compiledGlyphs=Object.create(null),this.compiledCharCodeToGlyphId=Object.create(null),this.fontMatrix=a}function q(a,b,c){c=c||[488e-6,0,0,488e-6,0,0],p.call(this,c),this.glyphs=a,this.cmap=b}function r(a,b,c,d){c=c||[.001,0,0,.001,0,0],p.call(this,c),this.glyphs=a.glyphs,this.gsubrs=a.gsubrs||[],this.subrs=a.subrs||[],this.cmap=b,this.glyphNameMap=d||k(),this.gsubrsBias=this.gsubrs.length<1240?107:this.gsubrs.length<33900?1131:32768,this.subrsBias=this.subrs.length<1240?107:this.subrs.length<33900?1131:32768}var s="";return p.prototype={getPathJs:function(a){var b=f(this.cmap,a),c=this.compiledGlyphs[b.glyphId];return c||(c=this.compileGlyph(this.glyphs[b.glyphId]),this.compiledGlyphs[b.glyphId]=c),void 0===this.compiledCharCodeToGlyphId[b.charCode]&&(this.compiledCharCodeToGlyphId[b.charCode]=b.glyphId),c},compileGlyph:function(a){if(!a||0===a.length||14===a[0])return s;var b=[];return b.push({cmd:"save"}),b.push({cmd:"transform",args:this.fontMatrix.slice()}),b.push({cmd:"scale",args:["size","-size"]}),this.compileGlyphImpl(a,b),b.push({cmd:"restore"}),b},compileGlyphImpl:function(){i("Children classes should implement this.")},hasBuiltPath:function(a){var b=f(this.cmap,a);return void 0!==this.compiledGlyphs[b.glyphId]&&void 0!==this.compiledCharCodeToGlyphId[b.charCode]}},g.inherit(q,p,{compileGlyphImpl:function(a,b){n(a,b,this)}}),g.inherit(r,p,{compileGlyphImpl:function(a,b){o(a,b,this)}}),{create:function(f,g){for(var i,j,k,l,m,n,o=new Uint8Array(f.data),p=b(o,4),s=0,t=12;p>s;s++,t+=16){var u=h(o.subarray(t,t+4)),v=a(o,t+8),w=a(o,t+12);switch(u){case"cmap":i=c(o,v,v+w);break;case"glyf":j=o.subarray(v,v+w);break;case"loca":k=o.subarray(v,v+w);break;case"head":n=b(o,v+18),m=b(o,v+50);break;case"CFF ":l=d(o,v,v+w,g)}}if(j){var x=n?[1/n,0,0,1/n,0,0]:f.fontMatrix;return new q(e(j,k,m),i,x)}return new r(l,i,f.fontMatrix,f.glyphNameMap)}}}();a.FontRendererFactory=n}),function(a,b){b(a.pdfjsCoreParser={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream)}(this,function(a,b,c,d){function e(a){return a===H}var f=b.MissingDataException,g=b.StreamType,h=b.assert,i=b.error,j=b.info,k=b.isArray,l=b.isInt,m=b.isNum,n=b.isString,o=b.warn,p=c.Cmd,q=c.Dict,r=c.Name,s=c.Ref,t=c.isCmd,u=c.isDict,v=c.isName,w=d.Ascii85Stream,x=d.AsciiHexStream,y=d.CCITTFaxStream,z=d.FlateStream,A=d.Jbig2Stream,B=d.JpegStream,C=d.JpxStream,D=d.LZWStream,E=d.NullStream,F=d.PredictorStream,G=d.RunLengthStream,H={},I=1e3,J=function(){function a(a,b,c){this.lexer=a,this.allowStreams=b,this.xref=c,this.imageCache=Object.create(null),this.refill()}return a.prototype={refill:function(){this.buf1=this.lexer.getObj(),this.buf2=this.lexer.getObj()},shift:function(){t(this.buf2,"ID")?(this.buf1=this.buf2,this.buf2=null):(this.buf1=this.buf2,this.buf2=this.lexer.getObj())},tryShift:function(){try{return this.shift(),!0}catch(a){if(a instanceof f)throw a;
// Upon failure, the caller should reset this.lexer.pos to a known good
// state and call this.shift() twice to reset the buffers.
return!1}},getObj:function(a){var b=this.buf1;if(this.shift(),b instanceof p)switch(b.cmd){case"BI":// inline image
return this.makeInlineImage(a);case"[":for(// array
var c=[];!t(this.buf1,"]")&&!e(this.buf1);)c.push(this.getObj(a));return e(this.buf1)&&i("End of file inside array"),this.shift(),c;case"<<":for(// dictionary or stream
var d=new q(this.xref);!t(this.buf1,">>")&&!e(this.buf1);)if(v(this.buf1)){var f=this.buf1.name;if(this.shift(),e(this.buf1))break;d.set(f,this.getObj(a))}else j("Malformed dictionary: key must be a name object"),this.shift();
// Stream objects are not allowed inside content streams or
// object streams.
// Stream objects are not allowed inside content streams or
// object streams.
return e(this.buf1)&&i("End of file inside dictionary"),t(this.buf2,"stream")?this.allowStreams?this.makeStream(d,a):d:(this.shift(),d);default:// simple object
return b}if(l(b)){// indirect reference or integer
var g=b;if(l(this.buf1)&&t(this.buf2,"R")){var h=new s(g,this.buf1);return this.shift(),this.shift(),h}return g}if(n(b)){// string
var k=b;return a&&(k=a.decryptString(k)),k}
// simple object
return b},/**
     * Find the end of the stream by searching for the /EI\s/.
     * @returns {number} The inline stream length.
     */
findDefaultInlineStreamEnd:function(a){for(var b,c,d,e,f=69,g=73,i=32,j=10,k=13,l=a.pos,m=0;-1!==(b=a.getByte());)if(0===m)m=b===f?1:0;else if(1===m)m=b===g?2:0;else if(h(2===m),b===i||b===j||b===k){for(d=5,e=a.peekBytes(d),c=0;d>c;c++)if(b=e[c],b!==j&&b!==k&&(i>b||b>127)){
// Not a LF, CR, SPACE or any visible ASCII character, i.e.
// it's binary stuff. Resetting the state.
m=0;break}if(2===m)break}else m=0;return a.pos-4-l},/**
     * Find the EOI (end-of-image) marker 0xFFD9 of the stream.
     * @returns {number} The inline stream length.
     */
findDCTDecodeInlineStreamEnd:function(a){for(var b,c,d,e=a.pos,f=!1;-1!==(b=a.getByte());)if(255===b){switch(a.getByte()){case 0:// Byte stuffing.
// 0xFF00 appears to be a very common byte sequence in JPEG images.
break;case 255:// Fill byte.
// Avoid skipping a valid marker, resetting the stream position.
a.skip(-1);break;case 217:// EOI
f=!0;break;case 192:// SOF0
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
c=a.getUint16(),c>2?
// |markerLength| contains the byte length of the marker segment,
// including its own length (2 bytes) and excluding the marker.
a.skip(c-2):
// The marker length is invalid, resetting the stream position.
a.skip(-2)}if(f)break}return d=a.pos-e,-1===b?(o("Inline DCTDecode image stream: EOI marker not found, searching for /EI/ instead."),a.skip(-d),this.findDefaultInlineStreamEnd(a)):(this.inlineStreamSkipEI(a),d)},/**
     * Find the EOD (end-of-data) marker '~>' (i.e. TILDE + GT) of the stream.
     * @returns {number} The inline stream length.
     */
findASCII85DecodeInlineStreamEnd:function(a){for(var b,c,d=126,e=62,f=a.pos;-1!==(b=a.getByte());)if(b===d&&a.peekByte()===e){a.skip();break}return c=a.pos-f,-1===b?(o("Inline ASCII85Decode image stream: EOD marker not found, searching for /EI/ instead."),a.skip(-c),this.findDefaultInlineStreamEnd(a)):(this.inlineStreamSkipEI(a),c)},/**
     * Find the EOD (end-of-data) marker '>' (i.e. GT) of the stream.
     * @returns {number} The inline stream length.
     */
findASCIIHexDecodeInlineStreamEnd:function(a){for(var b,c,d=62,e=a.pos;-1!==(b=a.getByte())&&b!==d;);return c=a.pos-e,-1===b?(o("Inline ASCIIHexDecode image stream: EOD marker not found, searching for /EI/ instead."),a.skip(-c),this.findDefaultInlineStreamEnd(a)):(this.inlineStreamSkipEI(a),c)},/**
     * Skip over the /EI/ for streams where we search for an EOD marker.
     */
inlineStreamSkipEI:function(a){for(var b,c=69,d=73,e=0;-1!==(b=a.getByte());)if(0===e)e=b===c?1:0;else if(1===e)e=b===d?2:0;else if(2===e)break},makeInlineImage:function(a){for(var b=this.lexer,c=b.stream,d=new q(this.xref);!t(this.buf1,"ID")&&!e(this.buf1);){v(this.buf1)||i("Dictionary key must be a name object");var f=this.buf1.name;if(this.shift(),e(this.buf1))break;d.set(f,this.getObj(a))}
// Extract the name of the first (i.e. the current) image filter.
var g,h=d.get("Filter","F");v(h)?g=h.name:k(h)&&v(h[0])&&(g=h[0].name);
// Parse image stream.
var j,l,m,n=c.pos;j="DCTDecode"===g||"DCT"===g?this.findDCTDecodeInlineStreamEnd(c):"ASCII85Decide"===g||"A85"===g?this.findASCII85DecodeInlineStreamEnd(c):"ASCIIHexDecode"===g||"AHx"===g?this.findASCIIHexDecodeInlineStreamEnd(c):this.findDefaultInlineStreamEnd(c);var o,r=c.makeSubStream(n,j,d);if(I>j){var s=r.getBytes();r.reset();var u=1,w=0;for(l=0,m=s.length;m>l;++l)u+=255&s[l],w+=u;if(o=w%65521<<16|u%65521,this.imageCache.adler32===o)return this.buf2=p.get("EI"),this.shift(),this.imageCache[o].reset(),this.imageCache[o]}return a&&(r=a.createStream(r,j)),r=this.filter(r,d,j),r.dict=d,void 0!==o&&(r.cacheKey="inline_"+j+"_"+o,this.imageCache[o]=r),this.buf2=p.get("EI"),this.shift(),r},makeStream:function(a,b){var c=this.lexer,d=c.stream;
// get stream start position
c.skipToNextLine();var e=d.pos-1,f=a.get("Length");
// Shift '>>' and check whether the new object marks the end of the stream
if(l(f)||(j("Bad "+f+" attribute in stream"),f=0),
// skip over the stream data
d.pos=e+f,c.nextChar(),this.tryShift()&&t(this.buf2,"endstream"))this.shift();else{
// bad stream length, scanning for endstream
d.pos=e;for(var g,h,k=2048,m=9,n=[101,110,100,115,116,114,101,97,109],o=0,p=!1;d.pos<d.end;){var q=d.peekBytes(k),r=q.length-m;if(0>=r)break;for(p=!1,g=0;r>g;){for(h=0;m>h&&q[g+h]===n[h];)h++;if(h>=m){p=!0;break}g++}if(p){o+=g,d.pos+=g;break}o+=r,d.pos+=r}p||i("Missing endstream"),f=o,c.nextChar(),this.shift(),this.shift()}// 'endstream'
return this.shift(),d=d.makeSubStream(e,f,a),b&&(d=b.createStream(d,f)),d=this.filter(d,a,f),d.dict=a,d},filter:function(a,b,c){var d=b.get("Filter","F"),e=b.get("DecodeParms","DP");if(v(d))return this.makeFilter(a,d.name,c,e);var f=c;if(k(d))for(var g=d,h=e,j=0,l=g.length;l>j;++j)d=g[j],v(d)||i("Bad filter name: "+d),e=null,k(h)&&j in h&&(e=h[j]),a=this.makeFilter(a,d.name,f,e),f=null;return a},makeFilter:function(a,b,c,d){if(0===a.dict.get("Length")&&!c)return o('Empty "'+b+'" stream.'),new E(a);try{d&&this.xref&&(d=this.xref.fetchIfRef(d));var e=this.xref.stats.streamTypes;if("FlateDecode"===b||"Fl"===b)return e[g.FLATE]=!0,d?new F(new z(a,c),c,d):new z(a,c);if("LZWDecode"===b||"LZW"===b){e[g.LZW]=!0;var h=1;return d?(d.has("EarlyChange")&&(h=d.get("EarlyChange")),new F(new D(a,c,h),c,d)):new D(a,c,h)}return"DCTDecode"===b||"DCT"===b?(e[g.DCT]=!0,new B(a,c,a.dict,this.xref)):"JPXDecode"===b||"JPX"===b?(e[g.JPX]=!0,new C(a,c,a.dict)):"ASCII85Decode"===b||"A85"===b?(e[g.A85]=!0,new w(a,c)):"ASCIIHexDecode"===b||"AHx"===b?(e[g.AHX]=!0,new x(a,c)):"CCITTFaxDecode"===b||"CCF"===b?(e[g.CCF]=!0,new y(a,c,d)):"RunLengthDecode"===b||"RL"===b?(e[g.RL]=!0,new G(a,c)):"JBIG2Decode"===b?(e[g.JBIG]=!0,new A(a,c,a.dict)):(o('filter "'+b+'" not supported yet'),a)}catch(i){if(i instanceof f)throw i;return o('Invalid stream: "'+i+'"'),new E(a)}}},a}(),K=function(){function a(a,b){this.stream=a,this.nextChar(),
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
this.knownCommands=b}function b(a){return a>=48&&57>=a?15&a:a>=65&&70>=a||a>=97&&102>=a?(15&a)+9:-1}a.isSpace=function(a){
// Space is one of the following characters: SPACE, TAB, CR or LF.
return 32===a||9===a||13===a||10===a};
// A '1' in this array means the character is white space. A '1' or
// '2' means the character ends a name or command.
var c=[1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,// 0x
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
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];return a.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},peekChar:function(){return this.stream.peekByte()},getNumber:function(){var a=this.currentChar,b=!1,c=0,d=1;if(45===a?(d=-1,a=this.nextChar(),45===a&&(a=this.nextChar())):43===a&&(// '+'
a=this.nextChar()),46===a&&(c=10,a=this.nextChar()),48>a||a>57)// '0' - '9'
return i("Invalid number: "+String.fromCharCode(a)),0;for(var e=a-48,f=0,g=1;(a=this.nextChar())>=0;)if(a>=48&&57>=a){// '0' - '9'
var h=a-48;// '0'
b?// We are after an 'e' or 'E'
f=10*f+h:(0!==c&&(// We are after a point
c*=10),e=10*e+h)}else if(46===a){// '.'
if(0!==c)
// A number can have only one '.'
break;c=1}else if(45===a)// '-'
// ignore minus signs in the middle of numbers to match
// Adobe's behavior
o("Badly formated number");else{if(69!==a&&101!==a)
// the last character doesn't belong to us
break;if(a=this.peekChar(),43===a||45===a)g=45===a?-1:1,this.nextChar();else if(48>a||a>57)// '0' - '9'
// The 'E' must be the beginning of a new operator
break;b=!0}return 0!==c&&(e/=c),b&&(e*=Math.pow(10,g*f)),d*e},getString:function(){var a=1,b=!1,c=this.strBuf;c.length=0;for(var d=this.nextChar();;){var e=!1;switch(0|d){case-1:o("Unterminated string"),b=!0;break;case 40:// '('
++a,c.push("(");break;case 41:// ')'
0===--a?(this.nextChar(),// consume strings ')'
b=!0):c.push(")");break;case 92:switch(d=this.nextChar()){case-1:o("Unterminated string"),b=!0;break;case 110:// 'n'
c.push("\n");break;case 114:// 'r'
c.push("\r");break;case 116:// 't'
c.push("	");break;case 98:// 'b'
c.push("\b");break;case 102:// 'f'
c.push("\f");break;case 92:// '\'
case 40:// '('
case 41:// ')'
c.push(String.fromCharCode(d));break;case 48:case 49:case 50:case 51:// '0'-'3'
case 52:case 53:case 54:case 55:// '4'-'7'
var f=15&d;d=this.nextChar(),e=!0,d>=48&&55>=d&&(f=(f<<3)+(15&d),d=this.nextChar(),d>=48&&55>=d&&(e=!1,f=(f<<3)+(15&d))),c.push(String.fromCharCode(f));break;case 13:// CR
10===this.peekChar()&&// LF
this.nextChar();break;case 10:// LF
break;default:c.push(String.fromCharCode(d))}break;default:c.push(String.fromCharCode(d))}if(b)break;e||(d=this.nextChar())}return c.join("")},getName:function(){var a,d,e=this.strBuf;for(e.length=0;(a=this.nextChar())>=0&&!c[a];)if(35===a){if(a=this.nextChar(),c[a]){o("Lexer_getName: NUMBER SIGN (#) should be followed by a hexadecimal number."),e.push("#");break}var f=b(a);if(-1!==f){d=a,a=this.nextChar();var g=b(a);if(-1===g){if(o("Lexer_getName: Illegal digit ("+String.fromCharCode(a)+") in hexadecimal number."),e.push("#",String.fromCharCode(d)),c[a])break;e.push(String.fromCharCode(a));continue}e.push(String.fromCharCode(f<<4|g))}else e.push("#",String.fromCharCode(a))}else e.push(String.fromCharCode(a));return e.length>127&&o("name token is longer than allowed by the spec: "+e.length),r.get(e.join(""))},getHexString:function(){var a=this.strBuf;a.length=0;for(var d,e,f=this.currentChar,g=!0;;){if(0>f){o("Unterminated hex string");break}if(62===f){// '>'
this.nextChar();break}if(1!==c[f]){if(g){if(d=b(f),-1===d){o('Ignoring invalid character "'+f+'" in hex string'),f=this.nextChar();continue}}else{if(e=b(f),-1===e){o('Ignoring invalid character "'+f+'" in hex string'),f=this.nextChar();continue}a.push(String.fromCharCode(d<<4|e))}g=!g,f=this.nextChar()}else f=this.nextChar()}return a.join("")},getObj:function(){for(
// skip whitespace and comments
var a=!1,b=this.currentChar;;){if(0>b)return H;if(a)10!==b&&13!==b||(a=!1);else if(37===b)// '%'
a=!0;else if(1!==c[b])break;b=this.nextChar()}
// start reading token
switch(0|b){case 48:case 49:case 50:case 51:case 52:// '0'-'4'
case 53:case 54:case 55:case 56:case 57:// '5'-'9'
case 43:case 45:case 46:// '+', '-', '.'
return this.getNumber();case 40:// '('
return this.getString();case 47:// '/'
return this.getName();
// array punctuation
case 91:// '['
return this.nextChar(),p.get("[");case 93:// ']'
return this.nextChar(),p.get("]");
// hex string or dict punctuation
case 60:return b=this.nextChar(),60===b?(this.nextChar(),p.get("<<")):this.getHexString();
// dict punctuation
case 62:return b=this.nextChar(),62===b?(this.nextChar(),p.get(">>")):p.get(">");case 123:// '{'
return this.nextChar(),p.get("{");case 125:// '}'
return this.nextChar(),p.get("}");case 41:// ')'
i("Illegal character: "+b)}for(
// command
var d=String.fromCharCode(b),e=this.knownCommands,f=e&&void 0!==e[d];(b=this.nextChar())>=0&&!c[b];){
// stop if known command is found and next character does not make
// the str a command
var g=d+String.fromCharCode(b);if(f&&void 0===e[g])break;128===d.length&&i("Command token too long: "+d.length),d=g,f=e&&void 0!==e[d]}return"true"===d?!0:"false"===d?!1:"null"===d?null:p.get(d)},skipToNextLine:function(){for(var a=this.currentChar;a>=0;){if(13===a){// CR
a=this.nextChar(),10===a&&// LF
this.nextChar();break}if(10===a){// LF
this.nextChar();break}a=this.nextChar()}}},a}(),L={create:function(a){function b(a,b){var c=j.get(a);if(l(c)&&(b?c>=0:c>0))return c;throw new Error('The "'+a+'" parameter in the linearization dictionary is invalid.')}function c(){var a,b,c=j.get("H");if(k(c)&&(2===(a=c.length)||4===a)){for(var d=0;a>d;d++)if(!(l(b=c[d])&&b>0))throw new Error("Hint ("+d+") in the linearization dictionary is invalid.");return c}throw new Error("Hint array in the linearization dictionary is invalid.")}var d,e,f=new J(new K(a),!1,null),g=f.getObj(),h=f.getObj(),i=f.getObj(),j=f.getObj();if(!(l(g)&&l(h)&&t(i,"obj")&&u(j)&&m(d=j.get("Linearized"))&&d>0))return null;if((e=b("L"))!==a.length)throw new Error('The "L" parameter in the linearization dictionary does not equal the stream length.');return{length:e,hints:c(),objectNumberFirst:b("O"),endFirst:b("E"),numPages:b("N"),mainXRefEntriesOffset:b("T"),pageFirst:j.has("P")?b("P",!0):0}}};a.EOF=H,a.Lexer=K,a.Linearization=L,a.Parser=J,a.isEOF=e}),function(a,b){b(a.pdfjsCoreCMap={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream,a.pdfjsCoreParser)}(this,function(a,b,c,d,e){var f=b.Util,g=b.assert,h=b.error,i=b.isInt,j=b.isString,k=c.isName,l=c.isCmd,m=c.isStream,n=d.StringStream,o=e.Lexer,p=e.isEOF,q=[
// << Start unicode maps.
"Adobe-GB1-UCS2","Adobe-CNS1-UCS2","Adobe-Japan1-UCS2","Adobe-Korea1-UCS2",
// >> End unicode maps.
"78-EUC-H","78-EUC-V","78-H","78-RKSJ-H","78-RKSJ-V","78-V","78ms-RKSJ-H","78ms-RKSJ-V","83pv-RKSJ-H","90ms-RKSJ-H","90ms-RKSJ-V","90msp-RKSJ-H","90msp-RKSJ-V","90pv-RKSJ-H","90pv-RKSJ-V","Add-H","Add-RKSJ-H","Add-RKSJ-V","Add-V","Adobe-CNS1-0","Adobe-CNS1-1","Adobe-CNS1-2","Adobe-CNS1-3","Adobe-CNS1-4","Adobe-CNS1-5","Adobe-CNS1-6","Adobe-GB1-0","Adobe-GB1-1","Adobe-GB1-2","Adobe-GB1-3","Adobe-GB1-4","Adobe-GB1-5","Adobe-Japan1-0","Adobe-Japan1-1","Adobe-Japan1-2","Adobe-Japan1-3","Adobe-Japan1-4","Adobe-Japan1-5","Adobe-Japan1-6","Adobe-Korea1-0","Adobe-Korea1-1","Adobe-Korea1-2","B5-H","B5-V","B5pc-H","B5pc-V","CNS-EUC-H","CNS-EUC-V","CNS1-H","CNS1-V","CNS2-H","CNS2-V","ETHK-B5-H","ETHK-B5-V","ETen-B5-H","ETen-B5-V","ETenms-B5-H","ETenms-B5-V","EUC-H","EUC-V","Ext-H","Ext-RKSJ-H","Ext-RKSJ-V","Ext-V","GB-EUC-H","GB-EUC-V","GB-H","GB-V","GBK-EUC-H","GBK-EUC-V","GBK2K-H","GBK2K-V","GBKp-EUC-H","GBKp-EUC-V","GBT-EUC-H","GBT-EUC-V","GBT-H","GBT-V","GBTpc-EUC-H","GBTpc-EUC-V","GBpc-EUC-H","GBpc-EUC-V","H","HKdla-B5-H","HKdla-B5-V","HKdlb-B5-H","HKdlb-B5-V","HKgccs-B5-H","HKgccs-B5-V","HKm314-B5-H","HKm314-B5-V","HKm471-B5-H","HKm471-B5-V","HKscs-B5-H","HKscs-B5-V","Hankaku","Hiragana","KSC-EUC-H","KSC-EUC-V","KSC-H","KSC-Johab-H","KSC-Johab-V","KSC-V","KSCms-UHC-H","KSCms-UHC-HW-H","KSCms-UHC-HW-V","KSCms-UHC-V","KSCpc-EUC-H","KSCpc-EUC-V","Katakana","NWP-H","NWP-V","RKSJ-H","RKSJ-V","Roman","UniCNS-UCS2-H","UniCNS-UCS2-V","UniCNS-UTF16-H","UniCNS-UTF16-V","UniCNS-UTF32-H","UniCNS-UTF32-V","UniCNS-UTF8-H","UniCNS-UTF8-V","UniGB-UCS2-H","UniGB-UCS2-V","UniGB-UTF16-H","UniGB-UTF16-V","UniGB-UTF32-H","UniGB-UTF32-V","UniGB-UTF8-H","UniGB-UTF8-V","UniJIS-UCS2-H","UniJIS-UCS2-HW-H","UniJIS-UCS2-HW-V","UniJIS-UCS2-V","UniJIS-UTF16-H","UniJIS-UTF16-V","UniJIS-UTF32-H","UniJIS-UTF32-V","UniJIS-UTF8-H","UniJIS-UTF8-V","UniJIS2004-UTF16-H","UniJIS2004-UTF16-V","UniJIS2004-UTF32-H","UniJIS2004-UTF32-V","UniJIS2004-UTF8-H","UniJIS2004-UTF8-V","UniJISPro-UCS2-HW-V","UniJISPro-UCS2-V","UniJISPro-UTF8-V","UniJISX0213-UTF32-H","UniJISX0213-UTF32-V","UniJISX02132004-UTF32-H","UniJISX02132004-UTF32-V","UniKS-UCS2-H","UniKS-UCS2-V","UniKS-UTF16-H","UniKS-UTF16-V","UniKS-UTF32-H","UniKS-UTF32-V","UniKS-UTF8-H","UniKS-UTF8-V","V","WP-Symbol"],r=function(){function a(a){
// Codespace ranges are stored as follows:
// [[1BytePairs], [2BytePairs], [3BytePairs], [4BytePairs]]
// where nBytePairs are ranges e.g. [low1, high1, low2, high2, ...]
this.codespaceRanges=[[],[],[],[]],this.numCodespaceRanges=0,
// Map entries have one of two forms.
// - cid chars are 16-bit unsigned integers, stored as integers.
// - bf chars are variable-length byte sequences, stored as strings, with
//   one byte per character.
this._map=[],this.name="",this.vertical=!1,this.useCMap=null,this.builtInCMap=a}return a.prototype={addCodespaceRange:function(a,b,c){this.codespaceRanges[a-1].push(b,c),this.numCodespaceRanges++},mapCidRange:function(a,b,c){for(;b>=a;)this._map[a++]=c++},mapBfRange:function(a,b,c){for(var d=c.length-1;b>=a;)this._map[a++]=c,
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
for(var d=0,e=this.codespaceRanges,f=this.codespaceRanges.length,g=0;f>g;g++){d=(d<<8|a.charCodeAt(b+g))>>>0;for(var h=e[g],i=0,j=h.length;j>i;){var k=h[i++],l=h[i++];if(d>=k&&l>=d)return c.charcode=d,void(c.length=g+1)}}c.charcode=0,c.length=1},get length(){return this._map.length},get isIdentityCMap(){if("Identity-H"!==this.name&&"Identity-V"!==this.name)return!1;if(65536!==this._map.length)return!1;for(var a=0;65536>a;a++)if(this._map[a]!==a)return!1;return!0}},a}(),s=function(){function a(a,b){r.call(this),this.vertical=a,this.addCodespaceRange(b,0,65535)}return f.inherit(a,r,{}),a.prototype={addCodespaceRange:r.prototype.addCodespaceRange,mapCidRange:function(a,b,c){h("should not call mapCidRange")},mapBfRange:function(a,b,c){h("should not call mapBfRange")},mapBfRangeToArray:function(a,b,c){h("should not call mapBfRangeToArray")},mapOne:function(a,b){h("should not call mapCidOne")},lookup:function(a){return i(a)&&65535>=a?a:void 0},contains:function(a){return i(a)&&65535>=a},forEach:function(a){for(var b=0;65535>=b;b++)a(b,b)},charCodeOf:function(a){return i(a)&&65535>=a?a:-1},getMap:function(){for(var a=new Array(65536),b=0;65535>=b;b++)a[b]=b;return a},readCharCode:r.prototype.readCharCode,get length(){return 65536},get isIdentityCMap(){h("should not access .isIdentityCMap")}},a}(),t=function(){function a(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a,!0),d.responseType="arraybuffer",d.onreadystatechange=function(){d.readyState===XMLHttpRequest.DONE&&(!d.response||200!==d.status&&0!==d.status?c(new Error("Unable to get binary cMap at: "+a)):b(new Uint8Array(d.response)))},d.send(null)})}function b(a,b){for(var c=0,d=0;b>=d;d++)c=c<<8|a[d];return c>>>0}function c(a,b){
// This code is hot. Special-case some common values to avoid creating an
// object with subarray().
// This code is hot. Special-case some common values to avoid creating an
// object with subarray().
return 1===b?String.fromCharCode(a[0],a[1]):3===b?String.fromCharCode(a[0],a[1],a[2],a[3]):String.fromCharCode.apply(null,a.subarray(0,b+1))}function d(a,b,c){for(var d=0,e=c;e>=0;e--)d+=a[e]+b[e],a[e]=255&d,d>>=8}function e(a,b){for(var c=1,d=b;d>=0&&c>0;d--)c+=a[d],a[d]=255&c,c>>=8}// ceil(MAX_NUM_SIZE * 7 / 8)
function f(a){this.buffer=a,this.pos=0,this.end=a.length,this.tmpBuf=new Uint8Array(l)}function i(i,j,l){return a(i).then(function(a){var i=new f(a),m=i.readByte();j.vertical=!!(1&m);for(var n,o,p=null,q=new Uint8Array(k),r=new Uint8Array(k),s=new Uint8Array(k),t=new Uint8Array(k),u=new Uint8Array(k);(o=i.readByte())>=0;){var v=o>>5;if(7!==v){var w=!!(16&o),x=15&o;g(k>=x+1);var y,z=1,A=i.readNumber();switch(v){case 0:for(// codespacerange
i.readHex(q,x),i.readHexNumber(r,x),d(r,q,x),j.addCodespaceRange(x+1,b(q,x),b(r,x)),y=1;A>y;y++)e(r,x),i.readHexNumber(q,x),d(q,r,x),i.readHexNumber(r,x),d(r,q,x),j.addCodespaceRange(x+1,b(q,x),b(r,x));break;case 1:
// undefined range, skipping
for(// notdefrange
i.readHex(q,x),i.readHexNumber(r,x),d(r,q,x),n=i.readNumber(),y=1;A>y;y++)e(r,x),i.readHexNumber(q,x),d(q,r,x),i.readHexNumber(r,x),d(r,q,x),n=i.readNumber();break;case 2:for(// cidchar
i.readHex(s,x),n=i.readNumber(),j.mapOne(b(s,x),n),y=1;A>y;y++)e(s,x),w||(i.readHexNumber(u,x),d(s,u,x)),n=i.readSigned()+(n+1),j.mapOne(b(s,x),n);break;case 3:for(// cidrange
i.readHex(q,x),i.readHexNumber(r,x),d(r,q,x),n=i.readNumber(),j.mapCidRange(b(q,x),b(r,x),n),y=1;A>y;y++)e(r,x),w?q.set(r):(i.readHexNumber(q,x),d(q,r,x)),i.readHexNumber(r,x),d(r,q,x),n=i.readNumber(),j.mapCidRange(b(q,x),b(r,x),n);break;case 4:for(// bfchar
i.readHex(s,z),i.readHex(t,x),j.mapOne(b(s,z),c(t,x)),y=1;A>y;y++)e(s,z),w||(i.readHexNumber(u,z),d(s,u,z)),e(t,x),i.readHexSigned(u,x),d(t,u,x),j.mapOne(b(s,z),c(t,x));break;case 5:for(// bfrange
i.readHex(q,z),i.readHexNumber(r,z),d(r,q,z),i.readHex(t,x),j.mapBfRange(b(q,z),b(r,z),c(t,x)),y=1;A>y;y++)e(r,z),w?q.set(r):(i.readHexNumber(q,z),d(q,r,z)),i.readHexNumber(r,z),d(r,q,z),i.readHex(t,x),j.mapBfRange(b(q,z),b(r,z),c(t,x));break;default:h("Unknown type: "+v)}}else// metadata, e.g. comment or usecmap
switch(31&o){case 0:i.readString();// skipping comment
break;case 1:p=i.readString()}}return p?l(p):j})}function j(){}var k=16,l=19;return f.prototype={readByte:function(){return this.pos>=this.end?-1:this.buffer[this.pos++]},readNumber:function(){var a,b=0;do{var c=this.readByte();0>c&&h("unexpected EOF in bcmap"),a=!(128&c),b=b<<7|127&c}while(!a);return b},readSigned:function(){var a=this.readNumber();return 1&a?~(a>>>1):a>>>1},readHex:function(a,b){a.set(this.buffer.subarray(this.pos,this.pos+b+1)),this.pos+=b+1},readHexNumber:function(a,b){var c,d=this.tmpBuf,e=0;do{var f=this.readByte();0>f&&h("unexpected EOF in bcmap"),c=!(128&f),d[e++]=127&f}while(!c);for(var g=b,i=0,j=0;g>=0;){for(;8>j&&d.length>0;)i=d[--e]<<j|i,j+=7;a[g]=255&i,g--,i>>=8,j-=8}},readHexSigned:function(a,b){this.readHexNumber(a,b);for(var c=1&a[b]?255:0,d=0,e=0;b>=e;e++)d=(1&d)<<8|a[e],a[e]=d>>1^c},readString:function(){for(var a=this.readNumber(),b="",c=0;a>c;c++)b+=String.fromCharCode(this.readNumber());return b}},j.prototype={read:i},j}(),u=function(){function a(a){for(var b=0,c=0;c<a.length;c++)b=b<<8|a.charCodeAt(c);return b>>>0}function b(a){j(a)||h("Malformed CMap: expected string.")}function c(a){i(a)||h("Malformed CMap: expected int.")}function d(c,d){for(;;){var e=d.getObj();if(p(e))break;if(l(e,"endbfchar"))return;b(e);var f=a(e);e=d.getObj(),
// TODO are /dstName used?
b(e);var g=e;c.mapOne(f,g)}}function e(c,d){for(;;){var e=d.getObj();if(p(e))break;if(l(e,"endbfrange"))return;b(e);var f=a(e);e=d.getObj(),b(e);var g=a(e);if(e=d.getObj(),i(e)||j(e)){var k=i(e)?String.fromCharCode(e):e;c.mapBfRange(f,g,k)}else{if(!l(e,"["))break;e=d.getObj();for(var m=[];!l(e,"]")&&!p(e);)m.push(e),e=d.getObj();c.mapBfRangeToArray(f,g,m)}}h("Invalid bf range.")}function f(d,e){for(;;){var f=e.getObj();if(p(f))break;if(l(f,"endcidchar"))return;b(f);var g=a(f);f=e.getObj(),c(f);var h=f;d.mapOne(g,h)}}function u(d,e){for(;;){var f=e.getObj();if(p(f))break;if(l(f,"endcidrange"))return;b(f);var g=a(f);f=e.getObj(),b(f);var h=a(f);f=e.getObj(),c(f);var i=f;d.mapCidRange(g,h,i)}}function v(b,c){for(;;){var d=c.getObj();if(p(d))break;if(l(d,"endcodespacerange"))return;if(!j(d))break;var e=a(d);if(d=c.getObj(),!j(d))break;var f=a(d);b.addCodespaceRange(d.length,e,f)}h("Invalid codespace range.")}function w(a,b){var c=b.getObj();i(c)&&(a.vertical=!!c)}function x(a,b){var c=b.getObj();k(c)&&j(c.name)&&(a.name=c.name)}function y(a,b,c,g){var h,i;a:for(;;){var j=b.getObj();if(p(j))break;if(k(j))"WMode"===j.name?w(a,b):"CMapName"===j.name&&x(a,b),h=j;else if(l(j))switch(j.cmd){case"endcmap":break a;case"usecmap":k(h)&&(i=h.name);break;case"begincodespacerange":v(a,b);break;case"beginbfchar":d(a,b);break;case"begincidchar":f(a,b);break;case"beginbfrange":e(a,b);break;case"begincidrange":u(a,b)}}
// Load the usecmap definition from the file only if there wasn't one
// specified.
return!g&&i&&(g=i),g?z(a,c,g):Promise.resolve(a)}function z(a,b,c){return B(c,b).then(function(b){
// If there aren't any code space ranges defined clone all the parent ones
// into this cMap.
if(a.useCMap=b,0===a.numCodespaceRanges){for(var c=a.useCMap.codespaceRanges,d=0;d<c.length;d++)a.codespaceRanges[d]=c[d].slice();a.numCodespaceRanges=a.useCMap.numCodespaceRanges}
// Merge the map into the current one, making sure not to override
// any previously defined entries.
return a.useCMap.forEach(function(b,c){a.contains(b)||a.mapOne(b,a.useCMap.lookup(b))}),a})}function A(a,b){var c=b.url+a+".bcmap",d=new r(!0);return(new t).read(c,d,function(a){return z(d,b,a)})}function B(a,b){return"Identity-H"===a?Promise.resolve(new s(!1,2)):"Identity-V"===a?Promise.resolve(new s(!0,2)):-1===q.indexOf(a)?Promise.reject(new Error("Unknown cMap name: "+a)):(g(b,"built-in cMap parameters are not provided"),b.packed?A(a,b):new Promise(function(c,d){var e=b.url+a,f=new XMLHttpRequest;f.onreadystatechange=function(){if(f.readyState===XMLHttpRequest.DONE)if(200===f.status||0===f.status){var a=new r(!0),g=new o(new n(f.responseText));y(a,g,b,null).then(function(a){c(a)})["catch"](function(a){d(new Error({message:"Invalid CMap data",error:a}))})}else d(new Error("Unable to get cMap at: "+e))},f.open("GET",e,!0),f.send(null)}))}return{create:function(a,b,c){if(k(a))return B(a.name,b);if(m(a)){var d=new r,e=new o(a);return y(d,e,b,c).then(function(a){return a.isIdentityCMap?B(a.name,b):a})}return Promise.reject(new Error("Encoding required."))}}}();a.CMap=r,a.CMapFactory=u,a.IdentityCMap=s}),function(a,b){b(a.pdfjsCorePsParser={},a.pdfjsSharedUtil,a.pdfjsCoreParser)}(this,function(a,b,c){var d=b.error,e=c.EOF,f=c.Lexer,g=function(){function a(a){this.lexer=a,this.operators=[],this.token=null,this.prev=null}return a.prototype={nextToken:function(){this.prev=this.token,this.token=this.lexer.getToken()},accept:function(a){return this.token.type===a?(this.nextToken(),!0):!1},expect:function(a){return this.accept(a)?!0:void d("Unexpected symbol: found "+this.token.type+" expected "+a+".")},parse:function(){return this.nextToken(),this.expect(h.LBRACE),this.parseBlock(),this.expect(h.RBRACE),this.operators},parseBlock:function(){for(;;)if(this.accept(h.NUMBER))this.operators.push(this.prev.value);else if(this.accept(h.OPERATOR))this.operators.push(this.prev.value);else{if(!this.accept(h.LBRACE))return;this.parseCondition()}},parseCondition:function(){
// Add two place holders that will be updated later
var a=this.operators.length;if(this.operators.push(null,null),this.parseBlock(),this.expect(h.RBRACE),this.accept(h.IF))
// The true block is right after the 'if' so it just falls through on
// true else it jumps and skips the true block.
this.operators[a]=this.operators.length,this.operators[a+1]="jz";else if(this.accept(h.LBRACE)){var b=this.operators.length;this.operators.push(null,null);var c=this.operators.length;this.parseBlock(),this.expect(h.RBRACE),this.expect(h.IFELSE),
// The jump is added at the end of the true block to skip the false
// block.
this.operators[b]=this.operators.length,this.operators[b+1]="j",this.operators[a]=c,this.operators[a+1]="jz"}else d("PS Function: error parsing conditional.")}},a}(),h={LBRACE:0,RBRACE:1,NUMBER:2,OPERATOR:3,IF:4,IFELSE:5},i=function(){function a(a,b){this.type=a,this.value=b}var b=Object.create(null);return a.getOperator=function(c){var d=b[c];return d?d:b[c]=new a(h.OPERATOR,c)},a.LBRACE=new a(h.LBRACE,"{"),a.RBRACE=new a(h.RBRACE,"}"),a.IF=new a(h.IF,"IF"),a.IFELSE=new a(h.IFELSE,"IFELSE"),a}(),j=function(){function a(a){this.stream=a,this.nextChar(),this.strBuf=[]}return a.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){
// skip comments
for(var a=!1,b=this.currentChar;;){if(0>b)return e;if(a)10!==b&&13!==b||(a=!1);else if(37===b)// '%'
a=!0;else if(!f.isSpace(b))break;b=this.nextChar()}switch(0|b){case 48:case 49:case 50:case 51:case 52:// '0'-'4'
case 53:case 54:case 55:case 56:case 57:// '5'-'9'
case 43:case 45:case 46:// '+', '-', '.'
return new i(h.NUMBER,this.getNumber());case 123:// '{'
return this.nextChar(),i.LBRACE;case 125:// '}'
return this.nextChar(),i.RBRACE}
// operator
var c=this.strBuf;for(c.length=0,c[0]=String.fromCharCode(b);(b=this.nextChar())>=0&&(b>=65&&90>=b||b>=97&&122>=b);)c.push(String.fromCharCode(b));var d=c.join("");switch(d.toLowerCase()){case"if":return i.IF;case"ifelse":return i.IFELSE;default:return i.getOperator(d)}},getNumber:function(){var a=this.currentChar,b=this.strBuf;for(b.length=0,b[0]=String.fromCharCode(a);(a=this.nextChar())>=0&&(a>=48&&57>=a||45===a||46===a);)// '-', '.'
b.push(String.fromCharCode(a));var c=parseFloat(b.join(""));return isNaN(c)&&d("Invalid floating point number: "+c),c}},a}();a.PostScriptLexer=j,a.PostScriptParser=g}),function(a,b){b(a.pdfjsCoreType1Parser={},a.pdfjsSharedUtil,a.pdfjsCoreStream,a.pdfjsCoreParser,a.pdfjsCoreEncodings)}(this,function(a,b,c,d,e){var f=b.warn,g=c.Stream,h=d.Lexer,i=e.getEncoding,j=!1,k=function(){function a(){this.width=0,this.lsb=0,this.flexing=!1,this.output=[],this.stack=[]}var b={hstem:[1],vstem:[3],vmoveto:[4],rlineto:[5],hlineto:[6],vlineto:[7],rrcurveto:[8],callsubr:[10],flex:[12,35],drop:[12,18],endchar:[14],rmoveto:[21],hmoveto:[22],vhcurveto:[30],hvcurveto:[31]};return a.prototype={convert:function(a,c,d){for(var e,g,h,i=a.length,k=!1,l=0;i>l;l++){var m=a[l];if(32>m){switch(12===m&&(m=(m<<8)+a[++l]),m){case 1:// hstem
if(!j){this.stack=[];break}k=this.executeCommand(2,b.hstem);break;case 3:// vstem
if(!j){this.stack=[];break}k=this.executeCommand(2,b.vstem);break;case 4:// vmoveto
if(this.flexing){if(this.stack.length<1){k=!0;break}
// Add the dx for flex and but also swap the values so they are
// the right order.
var n=this.stack.pop();this.stack.push(0,n);break}k=this.executeCommand(1,b.vmoveto);break;case 5:// rlineto
k=this.executeCommand(2,b.rlineto);break;case 6:// hlineto
k=this.executeCommand(1,b.hlineto);break;case 7:// vlineto
k=this.executeCommand(1,b.vlineto);break;case 8:// rrcurveto
k=this.executeCommand(6,b.rrcurveto);break;case 9:// closepath
// closepath is a Type1 command that does not take argument and is
// useless in Type2 and it can simply be ignored.
this.stack=[];break;case 10:// callsubr
if(this.stack.length<1){k=!0;break}h=this.stack.pop(),k=this.convert(c[h],c,d);break;case 11:// return
return k;case 13:// hsbw
if(this.stack.length<2){k=!0;break}
// To convert to type2 we have to move the width value to the
// first part of the charstring and then use hmoveto with lsb.
e=this.stack.pop(),g=this.stack.pop(),this.lsb=g,this.width=e,this.stack.push(e,g),k=this.executeCommand(2,b.hmoveto);break;case 14:// endchar
this.output.push(b.endchar[0]);break;case 21:// rmoveto
if(this.flexing)break;k=this.executeCommand(2,b.rmoveto);break;case 22:// hmoveto
if(this.flexing){
// Add the dy for flex.
this.stack.push(0);break}k=this.executeCommand(1,b.hmoveto);break;case 30:// vhcurveto
k=this.executeCommand(4,b.vhcurveto);break;case 31:// hvcurveto
k=this.executeCommand(4,b.hvcurveto);break;case 3072:// dotsection
// dotsection is a Type1 command to specify some hinting feature
// for dots that do not take a parameter and it can safely be
// ignored for Type2.
this.stack=[];break;case 3073:// vstem3
if(!j){this.stack=[];break}
// [vh]stem3 are Type1 only and Type2 supports [vh]stem with
// multiple parameters, so instead of returning [vh]stem3 take a
// shortcut and return [vhstem] instead.
k=this.executeCommand(2,b.vstem);break;case 3074:// hstem3
if(!j){this.stack=[];break}
// See vstem3.
k=this.executeCommand(2,b.hstem);break;case 3078:// seac
// seac is like type 2's special endchar but it doesn't use the
// first argument asb, so remove it.
d?(this.seac=this.stack.splice(-4,4),k=this.executeCommand(0,b.endchar)):k=this.executeCommand(4,b.endchar);break;case 3079:// sbw
if(this.stack.length<4){k=!0;break}
// To convert to type2 we have to move the width value to the
// first part of the charstring and then use rmoveto with
// (dx, dy). The height argument will not be used for vmtx and
// vhea tables reconstruction -- ignoring it.
this.stack.pop();e=this.stack.pop();var o=this.stack.pop();g=this.stack.pop(),this.lsb=g,this.width=e,this.stack.push(e,g,o),k=this.executeCommand(3,b.rmoveto);break;case 3084:// div
if(this.stack.length<2){k=!0;break}var p=this.stack.pop(),q=this.stack.pop();this.stack.push(q/p);break;case 3088:// callothersubr
if(this.stack.length<2){k=!0;break}h=this.stack.pop();var r=this.stack.pop();if(0===h&&3===r){var s=this.stack.splice(this.stack.length-17,17);this.stack.push(s[2]+s[0],// bcp1x + rpx
s[3]+s[1],// bcp1y + rpy
s[4],// bcp2x
s[5],// bcp2y
s[6],// p2x
s[7],// p2y
s[8],// bcp3x
s[9],// bcp3y
s[10],// bcp4x
s[11],// bcp4y
s[12],// p3x
s[13],// p3y
s[14]),k=this.executeCommand(13,b.flex,!0),this.flexing=!1,this.stack.push(s[15],s[16])}else 1===h&&0===r&&(this.flexing=!0);break;case 3089:// pop
// Ignore this since it is only used with othersubr.
break;case 3105:// setcurrentpoint
// Ignore for now.
this.stack=[];break;default:f('Unknown type 1 charstring command of "'+m+'"')}if(k)break}else 246>=m?m-=139:m=250>=m?256*(m-247)+a[++l]+108:254>=m?-(256*(m-251))-a[++l]-108:(255&a[++l])<<24|(255&a[++l])<<16|(255&a[++l])<<8|(255&a[++l])<<0,this.stack.push(m)}return k},executeCommand:function(a,b,c){var d=this.stack.length;if(a>d)return!0;for(var e=d-a,f=e;d>f;f++){var g=this.stack[f];g===(0|g)?// int
this.output.push(28,g>>8&255,255&g):(g=65536*g|0,this.output.push(255,g>>24&255,g>>16&255,g>>8&255,255&g))}return this.output.push.apply(this.output,b),c?this.stack.splice(e,a):this.stack.length=0,!1}},a}(),l=function(){function a(a){// '0'-'9'
// 'A'-'F'
return a>=48&&57>=a||a>=65&&70>=a||a>=97&&102>=a}function b(a,b,c){if(c>=a.length)return new Uint8Array(0);var d,e,f=0|b,g=52845,h=22719;for(d=0;c>d;d++)f=(a[d]+f)*g+h&65535;var i=a.length-c,j=new Uint8Array(i);for(d=c,e=0;i>e;d++,e++){var k=a[d];j[e]=k^f>>8,f=(k+f)*g+h&65535}return j}function c(b,c,d){var e,f,g=0|c,h=52845,i=22719,j=b.length,k=j>>>1,l=new Uint8Array(k);for(e=0,f=0;j>e;e++){var m=b[e];if(a(m)){e++;for(var n;j>e&&!a(n=b[e]);)e++;if(j>e){var o=parseInt(String.fromCharCode(m,n),16);l[f++]=o^g>>8,g=(o+g)*h+i&65535}}}return Array.prototype.slice.call(l,d,f)}function d(a){// '/'
// '[', ']'
// '{', '}'
return 47===a||91===a||93===a||123===a||125===a||40===a||41===a}function e(d,e,h){if(e){var i=d.getBytes(),j=!(a(i[0])&&a(i[1])&&a(i[2])&&a(i[3]));d=new g(j?b(i,f,4):c(i,f,4))}this.seacAnalysisEnabled=!!h,this.stream=d,this.nextChar()}/*
   * Decrypt a Sequence of Ciphertext Bytes to Produce the Original Sequence
   * of Plaintext Bytes. The function took a key as a parameter which can be
   * for decrypting the eexec block of for decoding charStrings.
   */
var f=55665,l=4330;return e.prototype={readNumberArray:function(){this.getToken();for(// read '[' or '{' (arrays can start with either)
var a=[];;){var b=this.getToken();if(null===b||"]"===b||"}"===b)break;a.push(parseFloat(b||0))}return a},readNumber:function(){var a=this.getToken();return parseFloat(a||0)},readInt:function(){
// Use '| 0' to prevent setting a double into length such as the double
// does not flow into the loop variable.
var a=this.getToken();return 0|parseInt(a||0,10)},readBoolean:function(){var a=this.getToken();
// Use 1 and 0 since that's what type2 charstrings use.
return"true"===a?1:0},nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){for(
// Eat whitespace and comments.
var a=!1,b=this.currentChar;;){if(-1===b)return null;if(a)10!==b&&13!==b||(a=!1);else if(37===b)// '%'
a=!0;else if(!h.isSpace(b))break;b=this.nextChar()}if(d(b))return this.nextChar(),String.fromCharCode(b);var c="";do c+=String.fromCharCode(b),b=this.nextChar();while(b>=0&&!h.isSpace(b)&&!d(b));return c},/*
     * Returns an object containing a Subrs array and a CharStrings
     * array extracted from and eexec encrypted block of data
     */
extractFontProgram:function(){var a=this.stream,c=[],d=[],e=Object.create(null);e.lenIV=4;for(var f,g,h,i,m,n={subrs:[],charstrings:[],properties:{privateData:e}};null!==(f=this.getToken());)if("/"===f)switch(f=this.getToken()){case"CharStrings":// read in 'begin'
for(
// The number immediately following CharStrings must be greater or
// equal to the number of CharStrings.
this.getToken(),this.getToken(),// read in 'dict'
this.getToken(),// read in 'dup'
this.getToken();;){if(f=this.getToken(),null===f||"end"===f)break;if("/"===f){var o=this.getToken();g=this.readInt(),this.getToken(),// read in 'RD' or '-|'
h=a.makeSubStream(a.pos,g),i=n.properties.privateData.lenIV,m=b(h.getBytes(),l,i),
// Skip past the required space and binary data.
a.skip(g),this.nextChar(),f=this.getToken(),// read in 'ND' or '|-'
"noaccess"===f&&this.getToken(),d.push({glyph:o,encoded:m})}}break;case"Subrs":this.readInt();// read in 'array'
for(this.getToken();"dup"===(f=this.getToken());){var p=this.readInt();g=this.readInt(),this.getToken(),// read in 'RD' or '-|'
h=a.makeSubStream(a.pos,g),i=n.properties.privateData.lenIV,m=b(h.getBytes(),l,i),
// Skip past the required space and binary data.
a.skip(g),this.nextChar(),f=this.getToken(),// read in 'NP' or '|'
"noaccess"===f&&this.getToken(),c[p]=m}break;case"BlueValues":case"OtherBlues":case"FamilyBlues":case"FamilyOtherBlues":var q=this.readNumberArray();
// *Blue* values may contain invalid data: disables reading of
// those values when hinting is disabled.
q.length>0&&q.length%2===0&&j&&(n.properties.privateData[f]=q);break;case"StemSnapH":case"StemSnapV":n.properties.privateData[f]=this.readNumberArray();break;case"StdHW":case"StdVW":n.properties.privateData[f]=this.readNumberArray()[0];break;case"BlueShift":case"lenIV":case"BlueFuzz":case"BlueScale":case"LanguageGroup":case"ExpansionFactor":n.properties.privateData[f]=this.readNumber();break;case"ForceBold":n.properties.privateData[f]=this.readBoolean()}for(var r=0;r<d.length;r++){o=d[r].glyph,m=d[r].encoded;var s=new k,t=s.convert(m,c,this.seacAnalysisEnabled),u=s.output;t&&(
// It seems when FreeType encounters an error while evaluating a glyph
// that it completely ignores the glyph so we'll mimic that behaviour
// here and put an endchar to make the validator happy.
u=[14]),n.charstrings.push({glyphName:o,charstring:u,width:s.width,lsb:s.lsb,seac:s.seac})}return n},extractFontHeader:function(a){for(var b;null!==(b=this.getToken());)if("/"===b)switch(b=this.getToken()){case"FontMatrix":var c=this.readNumberArray();a.fontMatrix=c;break;case"Encoding":var d,e=this.getToken();if(/^\d+$/.test(e)){d=[];var f=0|parseInt(e,10);this.getToken();// read in 'array'
for(var g=0;f>g;g++){
// skipping till first dup or def (e.g. ignoring for statement)
for(b=this.getToken();"dup"!==b&&"def"!==b;)if(b=this.getToken(),null===b)return;if("def"===b)break;var h=this.readInt();this.getToken();// read in '/'
var j=this.getToken();d[h]=j,this.getToken()}}else
// encoding name is specified
d=i(e);a.builtInEncoding=d;break;case"FontBBox":var k=this.readNumberArray();
// adjusting ascent/descent
a.ascent=k[3],a.descent=k[1],a.ascentScaled=!0}}},e}();a.Type1Parser=l}),function(a,b){b(a.pdfjsCoreFonts={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream,a.pdfjsCoreParser,a.pdfjsCoreGlyphList,a.pdfjsCoreFontRenderer,a.pdfjsCoreEncodings,a.pdfjsCoreStandardFonts,a.pdfjsCoreUnicode,a.pdfjsCoreType1Parser,a.pdfjsCoreCFFParser)}(this,function(a,b,c,d,e,f,g,h,i,j,k,l){function m(a){if(a.fontMatrix&&a.fontMatrix[0]!==p[0]){
// adjusting width to fontMatrix scale
var b=.001/a.fontMatrix[0],c=a.widths;for(var d in c)c[d]*=b;a.defaultWidth*=b}}function n(a,b){switch(a){case"Type1":return"Type1C"===b?q.TYPE1C:q.TYPE1;case"CIDFontType0":return"CIDFontType0C"===b?q.CIDFONTTYPE0C:q.CIDFONTTYPE0;case"OpenType":return q.OPENTYPE;case"TrueType":return q.TRUETYPE;case"CIDFontType2":return q.CIDFONTTYPE2;case"MMType1":return q.MMTYPE1;case"Type0":return q.TYPE0;default:return q.UNKNOWN}}/**
 * Shared logic for building a char code to glyph id mapping for Type1 and
 * simple CFF fonts. See section 9.6.6.2 of the spec.
 * @param {Object} properties Font properties object.
 * @param {Object} builtInEncoding The encoding contained within the actual font
 * data.
 * @param {Array} glyphNames Array of glyph names where the index is the
 * glyph ID.
 * @returns {Object} A char code to glyph ID map.
 */
function o(a,b,c){var d,e,f,g=Object.create(null);if(a.baseEncodingName)for(f=M(a.baseEncodingName),e=0;e<f.length;e++)d=c.indexOf(f[e]),d>=0?g[e]=d:g[e]=0;else if(a.flags&ia.Symbolic)
// For a symbolic font the encoding should be the fonts built-in
// encoding.
for(e in b)g[e]=b[e];else for(f=I,e=0;e<f.length;e++)d=c.indexOf(f[e]),d>=0?g[e]=d:g[e]=0;
// Lastly, merge in the differences.
var h=a.differences;if(h)for(e in h){var i=h[e];d=c.indexOf(i),d>=0?g[e]=d:g[e]=0}return g}var p=b.FONT_IDENTITY_MATRIX,q=b.FontType,r=b.assert,s=b.bytesToString,t=b.error,u=b.info,v=b.isArray,w=b.isInt,x=b.isNum,y=b.readUint32,z=b.shadow,A=b.string32,B=b.warn,C=b.MissingDataException,D=d.Stream,E=e.Lexer,F=f.getGlyphsUnicode,G=f.getDingbatsGlyphsUnicode,H=g.FontRendererFactory,I=h.StandardEncoding,J=h.MacRomanEncoding,K=h.SymbolSetEncoding,L=h.ZapfDingbatsEncoding,M=h.getEncoding,N=i.getStdFontMap,O=i.getNonStdFontMap,P=i.getGlyphMapForStandardFonts,Q=i.getSupplementalGlyphMapForArialBlack,R=j.getUnicodeRangeFor,S=j.mapSpecialUnicodeValues,T=j.getUnicodeForGlyph,U=k.Type1Parser,V=l.CFFStandardStrings,W=l.CFFParser,X=l.CFFCompiler,Y=l.CFF,Z=l.CFFHeader,$=l.CFFTopDict,_=l.CFFPrivateDict,aa=l.CFFStrings,ba=l.CFFIndex,ca=l.CFFCharset,da=57344,ea=63743,fa=!1,ga=1e3,ha=!1,ia={FixedPitch:1,Serif:2,Symbolic:4,Script:8,Nonsymbolic:32,Italic:64,AllCap:65536,SmallCap:131072,ForceBold:262144},ja=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"],ka=function(){function a(a,b,c,d,e,f,g,h){this.fontChar=a,this.unicode=b,this.accent=c,this.width=d,this.vmetric=e,this.operatorListId=f,this.isSpace=g,this.isInFont=h}return a.prototype.matchesForCache=function(a,b,c,d,e,f,g,h){return this.fontChar===a&&this.unicode===b&&this.accent===c&&this.width===d&&this.vmetric===e&&this.operatorListId===f&&this.isSpace===g&&this.isInFont===h},a}(),la=function(){function a(a){
// The elements of this._map can be integers or strings, depending on how
// |cmap| was created.
this._map=a}return a.prototype={get length(){return this._map.length},forEach:function(a){for(var b in this._map)a(b,this._map[b].charCodeAt(0))},has:function(a){return void 0!==this._map[a]},get:function(a){return this._map[a]},charCodeOf:function(a){return this._map.indexOf(a)}},a}(),ma=function(){function a(a,b){this.firstChar=a,this.lastChar=b}return a.prototype={get length(){return this.lastChar+1-this.firstChar},forEach:function(a){for(var b=this.firstChar,c=this.lastChar;c>=b;b++)a(b,b)},has:function(a){return this.firstChar<=a&&a<=this.lastChar},get:function(a){return this.firstChar<=a&&a<=this.lastChar?String.fromCharCode(a):void 0},charCodeOf:function(a){return w(a)&&a>=this.firstChar&&a<=this.lastChar?a:-1}},a}(),na=function(){function a(a,b,c){a[b]=c>>8&255,a[b+1]=255&c}function b(a,b,c){a[b]=c>>24&255,a[b+1]=c>>16&255,a[b+2]=c>>8&255,a[b+3]=255&c}function c(a,b,c){var d,e;if(c instanceof Uint8Array)a.set(c,b);else if("string"==typeof c)for(d=0,e=c.length;e>d;d++)a[b++]=255&c.charCodeAt(d);else
// treating everything else as array
for(d=0,e=c.length;e>d;d++)a[b++]=255&c[d]}function d(a){this.sfnt=a,this.tables=Object.create(null)}d.getSearchParams=function(a,b){for(var c=1,d=0;(c^a)>c;)c<<=1,d++;var e=c*b;return{range:e,entry:d,rangeShift:b*a-e}};var e=12,f=16;return d.prototype={toArray:function(){var g=this.sfnt,h=this.tables,i=Object.keys(h);i.sort();var j,k,l,m,n,o=i.length,p=e+o*f,q=[p];for(j=0;o>j;j++){m=h[i[j]];var r=(m.length+3&-4)>>>0;p+=r,q.push(p)}var s=new Uint8Array(p);
// write the table data first (mostly for checksum)
for(j=0;o>j;j++)m=h[i[j]],c(s,q[j],m);
// sfnt version (4 bytes)
"true"===g&&(
// Windows hates the Mac TrueType sfnt version number
g=A(65536)),s[0]=255&g.charCodeAt(0),s[1]=255&g.charCodeAt(1),s[2]=255&g.charCodeAt(2),s[3]=255&g.charCodeAt(3),
// numTables (2 bytes)
a(s,4,o);var t=d.getSearchParams(o,16);
// writing table entries
for(
// searchRange (2 bytes)
a(s,6,t.range),
// entrySelector (2 bytes)
a(s,8,t.entry),
// rangeShift (2 bytes)
a(s,10,t.rangeShift),p=e,j=0;o>j;j++){n=i[j],s[p]=255&n.charCodeAt(0),s[p+1]=255&n.charCodeAt(1),s[p+2]=255&n.charCodeAt(2),s[p+3]=255&n.charCodeAt(3);
// checksum
var u=0;for(k=q[j],l=q[j+1];l>k;k+=4){var v=y(s,k);u=u+v>>>0}b(s,p+4,u),
// offset
b(s,p+8,q[j]),
// length
b(s,p+12,h[n].length),p+=f}return s},addTable:function(a,b){if(a in this.tables)throw new Error("Table "+a+" already exists");this.tables[a]=b}},d}(),oa=new Int32Array([
// Control characters.
0,32,127,161,173,174,
// Chars that is used in complex-script shaping.
1536,1920,2208,4256,6016,6144,
// General punctuation chars.
8192,8208,8209,8210,8232,8240,8287,8304,9676,9677,
// Chars that is used in complex-script shaping.
43616,43648,
// Specials Unicode block.
65520,65536]),pa=function(){function a(a,b,c){var d,e,f;this.name=a,this.loadedName=c.loadedName,this.isType3Font=c.isType3Font,this.sizes=[],this.missingFile=!1,this.glyphCache=Object.create(null);var k=a.split("+");k=k.length>1?k[1]:k[0],k=k.split(/[-,_]/g)[0],this.isSerifFont=!!(c.flags&ia.Serif),this.isSymbolicFont=!!(c.flags&ia.Symbolic),this.isMonospace=!!(c.flags&ia.FixedPitch);var l=c.type,o=c.subtype;if(this.type=l,this.fallbackName=this.isMonospace?"monospace":this.isSerifFont?"serif":"sans-serif",this.differences=c.differences,this.widths=c.widths,this.defaultWidth=c.defaultWidth,this.composite=c.composite,this.wideChars=c.wideChars,this.cMap=c.cMap,this.ascent=c.ascent/ga,this.descent=c.descent/ga,this.fontMatrix=c.fontMatrix,this.bbox=c.bbox,this.toUnicode=c.toUnicode,this.toFontChar=[],"Type3"===c.type){for(d=0;256>d;d++)this.toFontChar[d]=this.differences[d]||c.defaultEncoding[d];return void(this.fontType=q.TYPE3)}this.cidEncoding=c.cidEncoding,this.vertical=c.vertical,this.vertical&&(this.vmetrics=c.vmetrics,this.defaultVMetrics=c.defaultVMetrics);var p;if(!b||b.isEmpty){b&&
// Some bad PDF generators will include empty font files,
// attempting to recover by assuming that no file exists.
B('Font file is empty in "'+a+'" ('+this.loadedName+")"),this.missingFile=!0;
// The file data is not specified. Trying to fix the font name
// to be used with the canvas.font.
var r=a.replace(/[,_]/g,"-"),s=N(),v=O(),w=!!s[r]||!(!v[r]||!s[v[r]]);if(r=s[r]||v[r]||r,this.bold=-1!==r.search(/bold/gi),this.italic=-1!==r.search(/oblique/gi)||-1!==r.search(/italic/gi),this.black=-1!==a.search(/Black/g),this.remeasure=Object.keys(this.widths).length>0,w&&"CIDFontType2"===l&&0===c.cidEncoding.indexOf("Identity-")){var x=P(),y=[];for(d in x)y[+d]=x[d];if(/ArialBlack/i.test(a)){var z=Q();for(d in z)y[+d]=z[d]}var A=this.toUnicode instanceof ma;A||this.toUnicode.forEach(function(a,b){y[+a]=b}),this.toFontChar=y,this.toUnicode=new la(y)}else/Symbol/i.test(r)?this.toFontChar=j(K,F(),c.differences):/Dingbats/i.test(r)?(/Wingdings/i.test(a)&&B("Non-embedded Wingdings font, falling back to ZapfDingbats."),this.toFontChar=j(L,G(),c.differences)):w?this.toFontChar=j(c.defaultEncoding,F(),c.differences):(p=F(),this.toUnicode.forEach(function(a,b){this.composite||(e=c.differences[a]||c.defaultEncoding[a],f=T(e,p),-1!==f&&(b=f)),this.toFontChar[a]=b}.bind(this)));return this.loadedName=r.split("-")[0],this.loading=!1,void(this.fontType=n(l,o))}
// Some fonts might use wrong font types for Type1C or CIDFontType0C
"Type1C"===o&&"Type1"!==l&&"MMType1"!==l&&(
// Some TrueType fonts by mistake claim Type1C
g(b)?o="TrueType":l="Type1"),"CIDFontType0C"===o&&"CIDFontType0"!==l&&(l="CIDFontType0"),"OpenType"===o&&(l="OpenType"),
// Some CIDFontType0C fonts by mistake claim CIDFontType0.
"CIDFontType0"===l&&(i(b)?o="CIDFontType0":h(b)?l=o="OpenType":o="CIDFontType0C");var C;switch(l){case"MMType1":u("MMType1 font ("+a+"), falling back to Type1.");/* falls through */
case"Type1":case"CIDFontType0":this.mimetype="font/opentype";var D="Type1C"===o||"CIDFontType0C"===o?new sa(b,c):new ra(a,b,c);m(c),
// Wrap the CFF data inside an OTF font file
C=this.convert(a,D,c);break;case"OpenType":case"TrueType":case"CIDFontType2":this.mimetype="font/opentype",
// Repair the TrueType file. It is can be damaged in the point of
// view of the sanitizer
C=this.checkAndRepair(a,b,c),this.isOpenType&&(m(c),l="OpenType");break;default:t("Font "+l+" is not supported")}this.data=C,this.fontType=n(l,o),
// Transfer some properties again that could change during font conversion
this.fontMatrix=c.fontMatrix,this.widths=c.widths,this.defaultWidth=c.defaultWidth,this.encoding=c.baseEncoding,this.seacMap=c.seacMap,this.loading=!0}function b(a,b){return(a<<8)+b}function c(a,b){var c=(a<<8)+b;return 32768&c?c-65536:c}function d(a,b,c,d){return(a<<24)+(b<<16)+(c<<8)+d}function e(a){return String.fromCharCode(a>>8&255,255&a)}function f(a){
// clamp value to the 16-bit int range
return a=a>32767?32767:-32768>a?-32768:a,String.fromCharCode(a>>8&255,255&a)}function g(a){var b=a.peekBytes(4);return 65536===y(b,0)}function h(a){var b=a.peekBytes(4);return"OTTO"===s(b)}function i(a){var b=a.peekBytes(2);
// All Type1 font programs must begin with the comment '%!' (0x25 + 0x21).
// All Type1 font programs must begin with the comment '%!' (0x25 + 0x21).
return 37===b[0]&&33===b[1]?!0:128===b[0]&&1===b[1]}function j(a,b,c){for(var d,e=[],f=0,g=a.length;g>f;f++)d=T(a[f],b),-1!==d&&(e[f]=d);for(var h in c)d=T(c[h],b),-1!==d&&(e[+h]=d);return e}/**
   * Helper function for |adjustMapping|.
   * @return {boolean}
   */
function k(a){for(
// Using binary search to find a range start.
var b=0,c=oa.length-1;c>b;){var d=b+c+1>>1;a<oa[d]?c=d-1:b=d}
// Even index means code in problematic range.
return!(1&b)}/**
   * Rebuilds the char code to glyph ID map by trying to replace the char codes
   * with their unicode value. It also moves char codes that are in known
   * problematic locations.
   * @return {Object} Two properties:
   * 'toFontChar' - maps original char codes(the value that will be read
   * from commands such as show text) to the char codes that will be used in the
   * font that we build
   * 'charCodeToGlyphId' - maps the new font char codes to glyph ids
   */
function l(a,b){var c=b.toUnicode,d=!!(b.flags&ia.Symbolic),e=b.toUnicode instanceof ma,f=Object.create(null),g=[],h=[],i=da;for(var j in a){j|=0;var l=a[j],m=j;
// First try to map the value to a unicode position if a non identity map
// was created.
if(!e&&c.has(j)){var n=c.get(m);
// TODO: Try to map ligatures to the correct spot.
1===n.length&&(m=n.charCodeAt(0))}
// Try to move control characters, special characters and already mapped
// characters to the private use area since they will not be drawn by
// canvas if left in their current position. Also, move characters if the
// font was symbolic and there is only an identity unicode map since the
// characters probably aren't in the correct position (fixes an issue
// with firefox and thuluthfont).
if((void 0!==h[m]||k(m)||d&&e)&&ea>=i)// Room left.
// Loop to try and find a free spot in the private use area.
do m=i++,fa&&61440===m&&(m=61472,i=m+1);while(void 0!==h[m]&&ea>=i);f[m]=l,g[j]=m,h[m]=!0}return{toFontChar:g,charCodeToGlyphId:f,nextAvailableFontCharCode:i}}function o(a,b){
// Array.sort() sorts by characters, not numerically, so convert to an
// array of characters.
var c=[];for(var d in a)
// Remove an invalid glyph ID mappings to make OTS happy.
a[d]>=b||c.push({fontCharCode:0|d,glyphId:a[d]});c.sort(function(a,b){return a.fontCharCode-b.fontCharCode});for(var e=[],f=c.length,g=0;f>g;){var h=c[g].fontCharCode,i=[c[g].glyphId];++g;for(var j=h;f>g&&j+1===c[g].fontCharCode&&(i.push(c[g].glyphId),++j,++g,65535!==j););e.push([h,j,i])}return e}function v(a,b){var c,d,f,g,h=o(a,b),i=h[h.length-1][1]>65535?2:1,j="\x00\x00"+// version
e(i)+// numTables
"\x00\x00"+// encodingID
A(4+8*i);for(c=h.length-1;c>=0&&!(h[c][0]<=65535);--c);var k=c+1;h[c][0]<65535&&65535===h[c][1]&&(h[c][1]=65534);var l,m,n,p,q=h[c][1]<65535?1:0,r=k+q,s=na.getSearchParams(r,2),t="",u="",v="",w="",x="",y=0;for(c=0,d=k;d>c;c++){l=h[c],m=l[0],n=l[1],t+=e(m),u+=e(n),p=l[2];var z=!0;for(f=1,g=p.length;g>f;++f)if(p[f]!==p[f-1]+1){z=!1;break}if(z){var B=p[0];v+=e(B-m&65535),w+=e(0)}else{var C=2*(r-c)+2*y;for(y+=n-m+1,v+=e(0),w+=e(C),f=0,g=p.length;g>f;++f)x+=e(p[f])}}q>0&&(u+="ÿÿ",t+="ÿÿ",v+="\x00",w+="\x00\x00");var D="\x00\x00"+// language
e(2*r)+e(s.range)+e(s.entry)+e(s.rangeShift)+u+"\x00\x00"+t+v+w+x,E="",F="";if(i>1){for(j+="\x00\x00\n"+// encodingID
A(4+8*i+4+D.length),E="",c=0,d=h.length;d>c;c++){l=h[c],m=l[0],p=l[2];var G=p[0];for(f=1,g=p.length;g>f;++f)p[f]!==p[f-1]+1&&(n=l[0]+f-1,E+=A(m)+A(n)+A(G),m=n+1,G=p[f]);E+=A(m)+// startCharCode
A(l[1])+// endCharCode
A(G)}F="\x00\f\x00\x00"+// reserved
A(E.length+16)+// length
"\x00\x00\x00\x00"+// language
A(E.length/12)}// format
// length
return j+"\x00"+e(D.length+4)+D+F+E}function w(a){var b=new D(a.data),c=b.getUint16();
// TODO verify all OS/2 tables fields, but currently we validate only those
// that give us issues
b.getBytes(60);// skipping type, misc sizes, panose, unicode ranges
var d=b.getUint16();if(4>c&&768&d)return!1;var e=b.getUint16(),f=b.getUint16();if(e>f)return!1;b.getBytes(6);// skipping sTypoAscender/Descender/LineGap
var g=b.getUint16();
// OS/2 appears to be valid, resetting some fields
return 0===g?!1:(a.data[8]=a.data[9]=0,!0)}function C(a,b,c){c=c||{unitsPerEm:0,yMax:0,yMin:0,ascent:0,descent:0};var d=0,f=0,g=0,h=0,i=null,j=0;if(b)for(var k in b){k|=0,(i>k||!i)&&(i=k),k>j&&(j=k);var l=R(k);32>l?d|=1<<l:64>l?f|=1<<l-32:96>l?g|=1<<l-64:123>l?h|=1<<l-96:t("Unicode ranges Bits > 123 are reserved for internal usage")}else i=0,j=255;var m=a.bbox||[0,0,0,0],n=c.unitsPerEm||1/(a.fontMatrix||p)[0],o=a.ascentScaled?1:n/ga,q=c.ascent||Math.round(o*(a.ascent||m[3])),r=c.descent||Math.round(o*(a.descent||m[1]));r>0&&a.descent>0&&m[1]<0&&(r=-r);var s=c.yMax||q,u=-c.yMin||-r;// Panose
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
return"\x00$ô\x00\x00\x00»\x00\x00\x00»\x00\x00ß\x001\x00\x00\x00\x00"+String.fromCharCode(a.fixedPitch?9:0)+"\x00\x00\x00\x00\x00\x00"+A(d)+A(f)+A(g)+A(h)+"*21*"+e(a.italicAngle?1:0)+e(i||a.firstChar)+e(j||a.lastChar)+e(q)+e(r)+"\x00d"+e(s)+e(u)+"\x00\x00\x00\x00\x00\x00\x00\x00"+e(a.xHeight)+e(a.capHeight)+e(0)+e(i||a.firstChar)+"\x00"}function E(a){var b=Math.floor(a.italicAngle*Math.pow(2,16));// Version number
// italicAngle
// underlineThickness
// isFixedPitch
return"\x00\x00\x00"+A(b)+"\x00\x00\x00\x00"+A(a.fixedPitch)+"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"}function U(a,b){b||(b=[[],[]]);var c,d,f,g,h,i=[b[0][0]||"Original licence",// 0.Copyright
b[0][1]||a,// 1.Font family
b[0][2]||"Unknown",// 2.Font subfamily (font weight)
b[0][3]||"uniqueID",// 3.Unique ID
b[0][4]||a,// 4.Full font name
b[0][5]||"Version 0.11",// 5.Version
b[0][6]||"",// 6.Postscript name
b[0][7]||"Unknown",// 7.Trademark
b[0][8]||"Unknown",// 8.Manufacturer
b[0][9]||"Unknown"],j=[];for(c=0,d=i.length;d>c;c++){h=b[1][c]||i[c];var k=[];for(f=0,g=h.length;g>f;f++)k.push(e(h.charCodeAt(f)));j.push(k.join(""))}var l=[i,j],m=["\x00","\x00"],n=["\x00\x00","\x00"],o=["\x00\x00","	"],p=i.length*m.length,q="\x00\x00"+// format
e(p)+// Number of names Record
e(12*p+6),r=0;for(c=0,d=m.length;d>c;c++){var s=l[c];for(f=0,g=s.length;g>f;f++){h=s[f];var t=m[c]+// platform ID
n[c]+// encoding ID
o[c]+// language ID
e(f)+// name ID
e(h.length)+e(r);q+=t,r+=h.length}}return q+=i.join("")+j.join("")}return a.getFontID=function(){var a=1;return function(){return String(a++)}}(),a.prototype={name:null,font:null,mimetype:null,encoding:null,get renderer(){var a=H.create(this,ha);return z(this,"renderer",a)},exportData:function(){
// TODO remove enumerating of the properties, e.g. hardcode exact names.
var a={};for(var b in this)this.hasOwnProperty(b)&&(a[b]=this[b]);return a},checkAndRepair:function(a,e,f){function g(a){var b=s(a.getBytes(4)),c=a.getInt32()>>>0,d=a.getInt32()>>>0,e=a.getInt32()>>>0,f=a.pos;a.pos=a.start?a.start:0,a.skip(d);var g=a.getBytes(e);
// clearing checksum adjustment
return a.pos=f,"head"===b&&(g[8]=g[9]=g[10]=g[11]=0,g[17]|=32),{tag:b,checksum:c,length:e,offset:d,data:g}}function h(a){return{version:s(a.getBytes(4)),numTables:a.getUint16(),searchRange:a.getUint16(),entrySelector:a.getUint16(),rangeShift:a.getUint16()}}/**
       * Read the appropriate subtable from the cmap according to 9.6.6.4 from
       * PDF spec
       */
function i(a,b,c,d){if(!a)return B("No cmap table available."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1};var e,f=(b.start?b.start:0)+a.offset;b.pos=f;
// There's an order of preference in terms of which cmap subtable to
// use:
// - non-symbolic fonts the preference is a 3,1 table then a 1,0 table
// - symbolic fonts the preference is a 3,0 table then a 1,0 table
// The following takes advantage of the fact that the tables are sorted
// to work.
for(var g,h=(b.getUint16(),b.getUint16()),i=!1,j=0;h>j;j++){var k=b.getUint16(),l=b.getUint16(),m=b.getInt32()>>>0,n=!1;if(0===k&&0===l?n=!0:1===k&&0===l?n=!0:3!==k||1!==l||(c||!d)&&g?c&&3===k&&0===l&&(n=!0,i=!0):(n=!0,c||(i=!0)),n&&(g={platformId:k,encodingId:l,offset:m}),i)break}if(g&&(b.pos=f+g.offset),!g||-1===b.peekByte())return B("Could not find a preferred cmap table."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1};var o,p,q=b.getUint16(),r=(b.getUint16(),b.getUint16(),!1),s=[];
// TODO(mack): refactor this cmap subtable reading logic out
if(0===q){for(o=0;256>o;o++){var t=b.getByte();t&&s.push({charCode:o,glyphId:t})}r=!0}else if(4===q){
// re-creating the table in format 4 since the encoding
// might be changed
var u=b.getUint16()>>1;b.getBytes(6);// skipping range fields
var v,w=[];for(v=0;u>v;v++)w.push({end:b.getUint16()});for(b.getUint16(),v=0;u>v;v++)w[v].start=b.getUint16();for(v=0;u>v;v++)w[v].delta=b.getUint16();var x=0;for(v=0;u>v;v++){e=w[v];var y=b.getUint16();if(y){var z=(y>>1)-(u-v);e.offsetIndex=z,x=Math.max(x,z+e.end-e.start+1)}else e.offsetIndex=-1}var A=[];for(o=0;x>o;o++)A.push(b.getUint16());for(v=0;u>v;v++){e=w[v],f=e.start;var C=e.end,D=e.delta;for(z=e.offsetIndex,o=f;C>=o;o++)65535!==o&&(p=0>z?o:A[z+o-f],p=p+D&65535,0!==p&&s.push({charCode:o,glyphId:p}))}}else{if(6!==q)return B("cmap table has unsupported format: "+q),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1};
// Format 6 is a 2-bytes dense mapping, which means the font data
// lives glue together even if they are pretty far in the unicode
// table. (This looks weird, so I can have missed something), this
// works on Linux but seems to fails on Mac so let's rewrite the
// cmap table to a 3-1-4 style
var E=b.getUint16(),F=b.getUint16();for(o=0;F>o;o++){p=b.getUint16();var G=E+o;s.push({charCode:G,glyphId:p})}}for(
// removing duplicate entries
s.sort(function(a,b){return a.charCode-b.charCode}),j=1;j<s.length;j++)s[j-1].charCode===s[j].charCode&&(s.splice(j,1),j--);return{platformId:g.platformId,encodingId:g.encodingId,mappings:s,hasShortCmap:r}}function j(a,b,c,d){if(!b)return void(c&&(c.data=null));a.pos=(a.start?a.start:0)+b.offset,a.pos+=b.length-2;var e=a.getUint16();e>d&&(u("The numOfMetrics ("+e+") should not be greater than the numGlyphs ("+d+")"),e=d,b.data[34]=(65280&e)>>8,b.data[35]=255&e);var f=d-e,g=f-(c.length-4*e>>1);if(g>0){
// For each missing glyph, we set both the width and lsb to 0 (zero).
// Since we need to add two properties for each glyph, this explains
// the use of |numMissing * 2| when initializing the typed array.
var h=new Uint8Array(c.length+2*g);h.set(c.data),c.data=h}}function k(a,b,c,d,e,f){if(12>=c-b)
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
return t>g.length?0:!f&&n>0?(d.set(g.subarray(0,m),e),d.set([0,0],e+m),d.set(g.subarray(o,t),e+m+2),t-=n,g.length-t>3&&(t=t+3&-4),t):g.length-t>3?(t=t+3&-4,d.set(g.subarray(0,t),e),t):(d.set(g,e),g.length)}function n(a,c,e){var f=a.data,g=d(f[0],f[1],f[2],f[3]);g>>16!==1&&(u("Attempting to fix invalid version in head table: "+g),f[0]=0,f[1]=1,f[2]=0,f[3]=0);var h=b(f[50],f[51]);if(0>h||h>1){u("Attempting to fix invalid indexToLocFormat in head table: "+h);
// The value of indexToLocFormat should be 0 if the loca table
// consists of short offsets, and should be 1 if the loca table
// consists of long offsets.
//
// The number of entries in the loca table should be numGlyphs + 1.
//
// Using this information, we can work backwards to deduce if the
// size of each offset in the loca table, and thus figure out the
// appropriate value for indexToLocFormat.
var i=c+1;e===i<<1?(
// 0x0000 indicates the loca table consists of short offsets
f[50]=0,f[51]=0):e===i<<2?(
// 0x0001 indicates the loca table consists of long offsets
f[50]=0,f[51]=1):B("Could not fix indexToLocFormat: "+h)}}function o(a,b,c,d,e,f){var g,h,i;d?(g=4,h=function(a,b){return a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3]},i=function(a,b,c){a[b]=c>>>24&255,a[b+1]=c>>16&255,a[b+2]=c>>8&255,a[b+3]=255&c}):(g=2,h=function(a,b){return a[b]<<9|a[b+1]<<1},i=function(a,b,c){a[b]=c>>9&255,a[b+1]=c>>1&255});var j=a.data,l=g*(1+c);
// is loca.data too short or long?
j.length!==l&&(j=new Uint8Array(l),j.set(a.data.subarray(0,l)),a.data=j);
// removing the invalid glyphs
var m=b.data,n=m.length,o=new Uint8Array(n),p=h(j,0),q=0,r=Object.create(null);i(j,0,q);var s,t;for(s=0,t=g;c>s;s++,t+=g){var u=h(j,t);if(u>n&&(n+3&-4)===u&&(
// Aspose breaks fonts by aligning the glyphs to the qword, but not
// the glyf table size, which makes last glyph out of range.
u=n),u>n)
// glyph end offset points outside glyf data, rejecting the glyph
i(j,t,q),p=u;else{p===u&&(r[s]=!0);var v=k(m,p,u,o,q,e);q+=v,i(j,t,q),p=u}}if(0===q){
// glyf table cannot be empty -- redoing the glyf and loca tables
// to have single glyph with one point
var w=new Uint8Array([0,1,0,0,0,0,0,0,0,0,0,0,0,0,49,0]);for(s=0,t=g;c>s;s++,t+=g)i(j,t,w.length);return b.data=w,r}if(f){var x=h(j,g);o.length>x+q?b.data=o.subarray(0,x+q):(b.data=new Uint8Array(x+q),b.data.set(o.subarray(0,q))),b.data.set(o.subarray(0,x),q),i(a.data,j.length-g,q+x)}else b.data=o.subarray(0,q);return r}function p(a,b,c){var d=(e.start?e.start:0)+a.offset;e.pos=d;var f=a.length,g=d+f,h=e.getInt32();
// skip rest to the tables
e.getBytes(28);var i,j,k=!0;switch(h){case 65536:i=ja;break;case 131072:var l=e.getUint16();if(l!==c){k=!1;break}var m=[];for(j=0;l>j;++j){var n=e.getUint16();if(n>=32768){k=!1;break}m.push(n)}if(!k)break;for(var o=[],p=[];e.pos<g;){var q=e.getByte();for(p.length=q,j=0;q>j;++j)p[j]=String.fromCharCode(e.getByte());o.push(p.join(""))}for(i=[],j=0;l>j;++j){var r=m[j];258>r?i.push(ja[r]):i.push(o[r-258])}break;case 196608:break;default:B("Unknown/unsupported post table version "+h),k=!1,b.defaultEncoding&&(i=b.defaultEncoding)}return b.glyphNames=i,k}function q(a){var b=(e.start?e.start:0)+a.offset;e.pos=b;var c=[[],[]],d=a.length,f=b+d,g=e.getUint16(),h=6;if(0!==g||h>d)
// unsupported name table format or table "too" small
return c;var i,j,k=e.getUint16(),l=e.getUint16(),m=[],n=12;for(i=0;k>i&&e.pos+n<=f;i++){var o={platform:e.getUint16(),encoding:e.getUint16(),language:e.getUint16(),name:e.getUint16(),length:e.getUint16(),offset:e.getUint16()};
// using only Macintosh and Windows platform/encoding names
(1===o.platform&&0===o.encoding&&0===o.language||3===o.platform&&1===o.encoding&&1033===o.language)&&m.push(o)}for(i=0,j=m.length;j>i;i++){var p=m[i];if(!(p.length<=0)){var q=b+l+p.offset;if(!(q+p.length>f)){e.pos=q;var r=p.name;if(p.encoding){for(var t="",u=0,v=p.length;v>u;u+=2)t+=String.fromCharCode(e.getUint16());c[1][r]=t}else c[0][r]=s(e.getBytes(p.length))}}}return c}
// 0xC0-DF == -1 and 0xE0-FF == -2
function y(a,b){for(var c,d,e,f,g,h=a.data,i=0,j=0,k=0,l=[],m=[],n=[],o=b.tooComplexToFollowFunctions,p=!1,q=0,r=0,s=h.length;s>i;){var t=h[i++];
// The TrueType instruction set docs can be found at
// https://developer.apple.com/fonts/TTRefMan/RM05/Chap5.html
if(64===t)if(d=h[i++],p||r)i+=d;else for(c=0;d>c;c++)l.push(h[i++]);else if(65===t)if(d=h[i++],p||r)i+=2*d;else for(c=0;d>c;c++)e=h[i++],l.push(e<<8|h[i++]);else if(176===(248&t))if(d=t-176+1,p||r)i+=d;else for(c=0;d>c;c++)l.push(h[i++]);else if(184===(248&t))if(d=t-184+1,p||r)i+=2*d;else for(c=0;d>c;c++)e=h[i++],l.push(e<<8|h[i++]);else if(43!==t||o)if(44!==t||o){if(45===t)// ENDF - end of function
if(p)p=!1,j=i;else{if(g=m.pop(),!g)return B("TT: ENDF bad stack"),void(b.hintsValid=!1);f=n.pop(),h=g.data,i=g.i,b.functionsStackDeltas[f]=l.length-g.stackTop}else if(137===t)// IDEF - instruction definition
(p||r)&&(B("TT: nested IDEFs not allowed"),o=!0),p=!0,k=i;else if(88===t)// IF
++q;else if(27===t)// ELSE
r=q;else if(89===t)// EIF
r===q&&(r=0),--q;else if(28===t&&!p&&!r){var u=l[l.length-1];
// only jumping forward to prevent infinite loop
u>0&&(i+=u-1)}}else// FDEF
(p||r)&&(B("TT: nested FDEFs not allowed"),o=!0),p=!0,k=i,f=l.pop(),b.functionsDefined[f]={data:h,i:i};else// CALL
if(!p&&!r)if(f=l[l.length-1],b.functionsUsed[f]=!0,f in b.functionsStackDeltas)l.length+=b.functionsStackDeltas[f];else if(f in b.functionsDefined&&n.indexOf(f)<0){if(m.push({data:h,i:i,stackTop:l.length-1}),n.push(f),g=b.functionsDefined[f],!g)return B("TT: CALL non-existent function"),void(b.hintsValid=!1);h=g.data,i=g.i}
// Adjusting stack not extactly, but just enough to get function id
if(!p&&!r){var v=142>=t?L[t]:t>=192&&223>=t?-1:t>=224?-2:0;for(t>=113&&117>=t&&(d=l.pop(),d===d&&(v=2*-d));0>v&&l.length>0;)l.pop(),v++;for(;v>0;)l.push(NaN),// pushing any number into stack
v--}}b.tooComplexToFollowFunctions=o;var w=[h];i>h.length&&w.push(new Uint8Array(i-h.length)),k>j&&(B("TT: complementing a missing function tail"),
// new function definition started, but not finished
// complete function by [CLEAR, ENDF]
w.push(new Uint8Array([34,45]))),A(a,w)}function z(a,b){if(!a.tooComplexToFollowFunctions){if(a.functionsDefined.length>b)return B("TT: more functions defined than expected"),void(a.hintsValid=!1);for(var c=0,d=a.functionsUsed.length;d>c;c++){if(c>b)return B("TT: invalid function id: "+c),void(a.hintsValid=!1);if(a.functionsUsed[c]&&!a.functionsDefined[c])return B("TT: undefined function: "+c),void(a.hintsValid=!1)}}}function A(a,b){if(b.length>1){
// concatenating the content items
var c,d,e=0;for(c=0,d=b.length;d>c;c++)e+=b[c].length;e=e+3&-4;var f=new Uint8Array(e),g=0;for(c=0,d=b.length;d>c;c++)f.set(b[c],g),g+=b[c].length;a.data=f,a.length=e}}function G(a,b,c,d){var e={functionsDefined:[],functionsUsed:[],functionsStackDeltas:[],tooComplexToFollowFunctions:!1,hintsValid:!0};if(a&&y(a,e),b&&y(b,e),a&&z(e,d),c&&1&c.length){var f=new Uint8Array(c.length+1);f.set(c.data),c.data=f}return e.hintsValid}
// Helper function to try to skip mapping of empty glyphs.
// Note: In some cases, just relying on the glyph data doesn't work,
//       hence we also use a few heuristics to fix various PDF files.
function H(a,b,c){return ea[a]?!qa&&b>=0&&oa.has(b)?!0:!!(pa&&c>=0&&x(pa[c])):!0}
// Some bad PDF generators, e.g. Scribus PDF, include glyph names
// in a 'uniXXXX' format -- attempting to recover proper ones.
function K(a,b){if(void 0!==b[a])return a;
// The glyph name is non-standard, trying to recover.
var c=T(a,b);if(-1!==c)for(var d in b)if(b[d]===c)return d;return B("Unable to recover a standard glyph name for: "+a),a}var L=[0,0,0,0,0,0,0,0,-2,-2,-2,-2,0,0,-2,-5,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,-1,-1,1,-1,-999,0,1,0,-1,-2,0,-1,-2,-1,-1,0,-1,-1,0,0,-999,-999,-1,-1,-1,-1,-2,-999,-2,-2,-999,0,-2,-2,0,0,-2,0,-2,0,0,0,-2,-1,-1,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,0,-999,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,-2,-999,-999,-999,-999,-999,-1,-1,-2,-2,0,0,0,0,-1,-1,-999,-2,-2,0,0,-1,-2,-2,0,0,0,-1,-1,-1,-2];
// The following steps modify the original font data, making copy
e=new D(new Uint8Array(e.getBytes()));var N,O,P=["OS/2","cmap","head","hhea","hmtx","maxp","name","post","loca","glyf","fpgm","prep","cvt ","CFF "],Q=h(e),R=Q.numTables,S=Object.create(null);S["OS/2"]=null,S.cmap=null,S.head=null,S.hhea=null,S.hmtx=null,S.maxp=null,S.name=null,S.post=null;for(var V,Y=0;R>Y;Y++)V=g(e),P.indexOf(V.tag)<0||0!==V.length&&(S[V.tag]=V);var Z=!S["CFF "];if(Z)S.loca||t('Required "loca" table is not found'),S.glyf||(B('Required "glyf" table is not found -- trying to recover.'),
// Note: We use `sanitizeGlyphLocations` to add dummy glyf data below.
S.glyf={tag:"glyf",data:new Uint8Array(0)}),this.isOpenType=!1;else{
// OpenType font
if("OTTO"===Q.version&&"CIDFontType2"!==f.type||!S.head||!S.hhea||!S.maxp||!S.post)
// no major tables: throwing everything at CFFFont
return O=new D(S["CFF "].data),N=new sa(O,f),m(f),this.convert(a,N,f);delete S.glyf,delete S.loca,delete S.fpgm,delete S.prep,delete S["cvt "],this.isOpenType=!0}S.maxp||t('Required "maxp" table is not found'),e.pos=(e.start||0)+S.maxp.offset;var $=e.getInt32(),_=e.getUint16(),aa=0;if($>=65536&&S.maxp.length>=22){
// maxZones can be invalid
e.pos+=8;var ba=e.getUint16();ba>2&&(// reset to 2 if font has invalid maxZones
S.maxp.data[14]=0,S.maxp.data[15]=2),e.pos+=4,aa=e.getUint16()}var ca=!1;"CIDFontType2"===f.type&&f.toUnicode&&f.toUnicode.get(0)>"\x00"&&(ca=!0,_++,S.maxp.data[4]=_>>8,S.maxp.data[5]=255&_);var da=G(S.fpgm,S.prep,S["cvt "],aa);da||(delete S.fpgm,delete S.prep,delete S["cvt "]),
// Ensure the hmtx table contains the advance width and
// sidebearings information for numGlyphs in the maxp table
j(e,S.hhea,S.hmtx,_),S.head||t('Required "head" table is not found'),n(S.head,_,Z?S.loca.length:0);var ea=Object.create(null);if(Z){var fa=b(S.head.data[50],S.head.data[51]);ea=o(S.loca,S.glyf,_,fa,da,ca)}S.hhea||t('Required "hhea" table is not found'),
// Sanitizer reduces the glyph advanceWidth to the maxAdvanceWidth
// Sometimes it's 0. That needs to be fixed
0===S.hhea.data[10]&&0===S.hhea.data[11]&&(S.hhea.data[10]=255,S.hhea.data[11]=255);
// Extract some more font properties from the OpenType head and
// hhea tables; yMin and descent value are always negative.
var ga={unitsPerEm:b(S.head.data[18],S.head.data[19]),yMax:b(S.head.data[42],S.head.data[43]),yMin:c(S.head.data[38],S.head.data[39]),ascent:b(S.hhea.data[4],S.hhea.data[5]),descent:c(S.hhea.data[6],S.hhea.data[7])};
// The 'post' table has glyphs names.
if(
// PDF FontDescriptor metrics lie -- using data from actual font.
this.ascent=ga.ascent/ga.unitsPerEm,this.descent=ga.descent/ga.unitsPerEm,S.post){var ia=p(S.post,f,_);ia||(S.post=null)}var ka,la=[],oa=f.toUnicode,pa=f.widths,qa=oa instanceof ma||65536===oa.length;if("CIDFontType2"===f.type){var ra=f.cidToGidMap||[],ta=0===ra.length;f.cMap.forEach(function(a,b){r(65535>=b,"Max size of CID is 65,535");var c=-1;ta?c=b:void 0!==ra[b]&&(c=ra[b]),c>=0&&_>c&&H(c,a,b)&&(la[a]=c)}),ca&&(la[0]=_-1)}else{
// Most of the following logic in this code branch is based on the
// 9.6.6.4 of the PDF spec.
var ua=f.differences.length>0||!!f.baseEncodingName,va=i(S.cmap,e,this.isSymbolicFont,ua),wa=va.platformId,xa=va.encodingId,ya=va.mappings,za=ya.length;
// The spec seems to imply that if the font is symbolic the encoding
// should be ignored, this doesn't appear to work for 'preistabelle.pdf'
// where the the font is symbolic and it has an encoding.
if(ua&&(3===wa&&1===xa||1===wa&&0===xa)||-1===wa&&-1===xa&&M(f.baseEncodingName)){// Temporary hack
// When no preferred cmap table was found and |baseEncodingName| is
// one of the predefined encodings, we seem to obtain a better
// |charCodeToGlyphId| map from the code below (fixes bug 1057544).
// TODO: Note that this is a hack which should be removed as soon as
//       we have proper support for more exotic cmap tables.
var Aa=[];"MacRomanEncoding"!==f.baseEncodingName&&"WinAnsiEncoding"!==f.baseEncodingName||(Aa=M(f.baseEncodingName));var Ba=F();for(ka=0;256>ka;ka++){var Ca,Da;if(Ca=this.differences&&ka in this.differences?this.differences[ka]:ka in Aa&&""!==Aa[ka]?Aa[ka]:I[ka]){
// Ensure that non-standard glyph names are resolved to valid ones.
Da=K(Ca,Ba);var Ea,Fa=!1;3===wa&&1===xa?(Ea=Ba[Da],Fa=!0):1===wa&&0===xa&&(
// TODO: the encoding needs to be updated with mac os table.
Ea=J.indexOf(Da));var Ga=!1;for(Y=0;za>Y;++Y)if(ya[Y].charCode===Ea){var Ha=Fa?ka:Ea;if(H(ya[Y].glyphId,Ha,-1)){la[ka]=ya[Y].glyphId,Ga=!0;break}}if(!Ga&&f.glyphNames){
// Try to map using the post table.
var Ia=f.glyphNames.indexOf(Ca);
// The post table ought to use the same kind of glyph names as the
// `differences` array, but check the standard ones as a fallback.
-1===Ia&&Da!==Ca&&(Ia=f.glyphNames.indexOf(Da)),Ia>0&&H(Ia,-1,-1)&&(la[ka]=Ia,Ga=!0)}Ga||(la[ka]=0)}}}else if(0===wa&&0===xa)
// Default Unicode semantics, use the charcodes as is.
for(Y=0;za>Y;++Y)la[ya[Y].charCode]=ya[Y].glyphId;else
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
for(Y=0;za>Y;++Y)ka=255&ya[Y].charCode,la[ka]=ya[Y].glyphId}0===la.length&&(
// defines at least one glyph
la[0]=0);
// Converting glyphs and ids into font's cmap table
var Ja=l(la,f);if(this.toFontChar=Ja.toFontChar,S.cmap={tag:"cmap",data:v(Ja.charCodeToGlyphId,_)},S["OS/2"]&&w(S["OS/2"])||(S["OS/2"]={tag:"OS/2",data:C(f,Ja.charCodeToGlyphId,ga)}),
// Rewrite the 'post' table if needed
S.post||(S.post={tag:"post",data:E(f)}),!Z)try{
// Trying to repair CFF file
O=new D(S["CFF "].data);var Ka=new W(O,f,ha);N=Ka.parse();var La=new X(N);S["CFF "].data=La.compile()}catch(Ma){B("Failed to compile font "+f.loadedName)}
// Re-creating 'name' table
if(S.name){
// ... using existing 'name' table as prototype
var Na=q(S.name);S.name.data=U(a,Na)}else S.name={tag:"name",data:U(this.name)};var Oa=new na(Q.version);for(var Pa in S)Oa.addTable(Pa,S[Pa].data);return Oa.toArray()},convert:function(a,b,c){function d(a,b){var c=null;for(var d in a)b===a[d]&&(c||(c=[]),c.push(0|d));return c}function g(a,b){for(var c in a)if(b===a[c])return 0|c;return i.charCodeToGlyphId[i.nextAvailableFontCharCode]=b,i.nextAvailableFontCharCode++}
// TODO: Check the charstring widths to determine this.
c.fixedPitch=!1;var h=b.getGlyphMapping(c),i=l(h,c);this.toFontChar=i.toFontChar;var j=b.numGlyphs,k=b.seacs;if(ha&&k&&k.length){var m=c.fontMatrix||p,n=b.getCharset(),o=Object.create(null);for(var q in k){q|=0;var r=k[q],s=I[r[2]],t=I[r[3]],u=n.indexOf(s),w=n.indexOf(t);if(!(0>u||0>w)){var x={x:r[0]*m[0]+r[1]*m[2]+m[4],y:r[0]*m[1]+r[1]*m[3]+m[5]},y=d(h,q);if(y)for(var z=0,A=y.length;A>z;z++){var B=y[z],D=i.charCodeToGlyphId,F=g(D,u),G=g(D,w);o[B]={baseFontCharCode:F,accentFontCharCode:G,accentOffset:x}}}}c.seacMap=o}var H=1/(c.fontMatrix||p)[0],J=new na("OTTO");
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
return J.addTable("CFF ",b.data),J.addTable("OS/2",C(c,i.charCodeToGlyphId)),J.addTable("cmap",v(i.charCodeToGlyphId,j)),J.addTable("head","\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00_<õ\x00\x00"+f(H)+"\x00\x00\x00\x00\x0B~'\x00\x00\x00\x00\x0B~'\x00\x00"+f(c.descent)+"ÿ"+f(c.ascent)+e(c.italicAngle?2:0)+"\x00\x00\x00\x00\x00\x00\x00"),J.addTable("hhea","\x00\x00\x00"+f(c.ascent)+f(c.descent)+"\x00\x00ÿÿ\x00\x00\x00\x00\x00\x00"+f(c.capHeight)+f(Math.tan(c.italicAngle)*c.xHeight)+"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"+e(j)),J.addTable("hmtx",function(){// Fake .notdef
for(var a=b.charstrings,c=b.cff?b.cff.widths:null,d="\x00\x00\x00\x00",f=1,g=j;g>f;f++){var h=0;if(a){var i=a[f-1];h="width"in i?i.width:0}else c&&(h=Math.ceil(c[f]||0));d+=e(h)+e(0)}return d}()),J.addTable("maxp","\x00\x00P\x00"+e(j)),J.addTable("name",U(a)),J.addTable("post",E(c)),J.toArray()},get spaceWidth(){if("_shadowWidth"in this)return this._shadowWidth;for(var a,b=["space","minus","one","i"],c=0,d=b.length;d>c;c++){var e=b[c];
// if possible, getting width by glyph name
if(e in this.widths){a=this.widths[e];break}var f=F(),g=f[e],h=0;if(this.composite&&this.cMap.contains(g)&&(h=this.cMap.lookup(g)),
// ... via toUnicode map
!h&&this.toUnicode&&(h=this.toUnicode.charCodeOf(g)),
// setting it to unicode if negative or undefined
0>=h&&(h=g),a=this.widths[h])break}
// Do not shadow the property here. See discussion:
// https://github.com/mozilla/pdf.js/pull/2127#discussion_r1662280
return a=a||this.defaultWidth,this._shadowWidth=a,a},charToGlyph:function(a,b){var c,d,e,f=a;this.cMap&&this.cMap.contains(a)&&(f=this.cMap.lookup(a)),d=this.widths[f],d=x(d)?d:this.defaultWidth;var g=this.vmetrics&&this.vmetrics[f],h=this.toUnicode.get(a)||a;"number"==typeof h&&(h=String.fromCharCode(h));var i=a in this.toFontChar;c=this.toFontChar[a]||a,this.missingFile&&(c=S(c)),this.isType3Font&&(e=c);var j=null;if(this.seacMap&&this.seacMap[a]){i=!0;var k=this.seacMap[a];c=k.baseFontCharCode,j={fontChar:String.fromCharCode(k.accentFontCharCode),offset:k.accentOffset}}var l=String.fromCharCode(c),m=this.glyphCache[a];return m&&m.matchesForCache(l,h,j,d,g,e,b,i)||(m=new ka(l,h,j,d,g,e,b,i),this.glyphCache[a]=m),m},charsToGlyphs:function(a){var b,c,d,e=this.charsCache;
// if we translated this string before, just grab it from the cache
if(e&&(b=e[a]))return b;
// lazily create the translation cache
e||(e=this.charsCache=Object.create(null)),b=[];var f,g=a,h=0;if(this.cMap)for(
// composite fonts have multi-byte strings convert the string from
// single-byte to multi-byte
var i=Object.create(null);h<a.length;){this.cMap.readCharCode(a,h,i),d=i.charcode;var j=i.length;h+=j;
// Space is char with code 0x20 and length 1 in multiple-byte codes.
var k=1===j&&32===a.charCodeAt(h-1);c=this.charToGlyph(d,k),b.push(c)}else for(h=0,f=a.length;f>h;++h)d=a.charCodeAt(h),c=this.charToGlyph(d,32===d),b.push(c);
// Enter the translated string into the cache
return e[g]=b}},a}(),qa=function(){function a(a){this.error=a,this.loadedName="g_font_error",this.loading=!1}return a.prototype={charsToGlyphs:function(){return[]},exportData:function(){return{error:this.error}}},a}(),ra=function(){function a(a,b,c){for(var d,e=a.length,f=b.length,g=e-f,h=c,i=!1;g>h;){for(d=0;f>d&&a[h+d]===b[d];)d++;if(d>=f){for(// `signature` found, skip over whitespace.
h+=d;e>h&&E.isSpace(a[h]);)h++;i=!0;break}h++}return{found:i,length:h}}function b(b,c){var d,e,f,g=[101,101,120,101,99],h=b.pos;try{d=b.getBytes(c),e=d.length}catch(i){if(i instanceof C)throw i}if(e===c&&(f=a(d,g,c-2*g.length),f.found&&f.length===c))return{stream:new D(d),length:c};B('Invalid "Length1" property in Type1 font -- trying to recover.'),b.pos=h;for(// Reset the stream position.
var j,k=2048;;){var l=b.peekBytes(k);if(f=a(l,g,0),0===f.length)break;// Update the stream position.
if(b.pos+=f.length,f.found){j=b.pos-h;break}}// Reset the stream position.
// Reset the stream position.
return b.pos=h,j?{stream:new D(b.getBytes(j)),length:j}:(B('Unable to recover "Length1" property in Type1 font -- using as is.'),{stream:new D(b.getBytes(c)),length:c})}function c(a,b){
// We should ideally parse the eexec block to ensure that `suggestedLength`
// is correct, so we don't truncate the block data if it's too small.
// However, this would also require checking if the fixed-content portion
// exists (using the 'Length3' property), and ensuring that it's valid.
//
// Given that `suggestedLength` almost always is correct, all the validation
// would require a great deal of unnecessary parsing for most fonts.
// To save time, we always fetch the entire stream instead, which also avoid
// issues if `suggestedLength` is huge (see comment in `getHeaderBlock`).
//
// NOTE: This means that the function can include the fixed-content portion
// in the returned eexec block. In practice this does *not* seem to matter,
// since `Type1Parser_extractFontProgram` will skip over any non-commands.
var c=a.getBytes();return{stream:new D(c),length:c.length}}function d(a,d,e){
// Some bad generators embed pfb file as is, we have to strip 6-byte header.
// Also, length1 and length2 might be off by 6 bytes as well.
// http://www.math.ubc.ca/~cass/piscript/type1.pdf
var f=6,g=e.length1,h=e.length2,i=d.peekBytes(f),j=128===i[0]&&1===i[1];j&&(d.skip(f),g=i[5]<<24|i[4]<<16|i[3]<<8|i[2]);
// Get the data block containing glyphs and subrs informations
var k=b(d,g);g=k.length;var l=new U(k.stream,!1,ha);l.extractFontHeader(e),j&&(i=d.getBytes(f),h=i[5]<<24|i[4]<<16|i[3]<<8|i[2]);
// Decrypt the data blocks and retrieve it's content
var m=c(d,h);h=m.length;var n=new U(m.stream,!0,ha),o=n.extractFontProgram();for(var p in o.properties)e[p]=o.properties[p];var q=o.charstrings,r=this.getType2Charstrings(q),s=this.getType2Subrs(o.subrs);this.charstrings=q,this.data=this.wrap(a,r,this.charstrings,s,e),this.seacs=this.getSeacs(o.charstrings)}return d.prototype={get numGlyphs(){return this.charstrings.length+1},getCharset:function(){for(var a=[".notdef"],b=this.charstrings,c=0;c<b.length;c++)a.push(b[c].glyphName);return a},getGlyphMapping:function(a){var b,c=this.charstrings,d=[".notdef"];for(b=0;b<c.length;b++)d.push(c[b].glyphName);var e=a.builtInEncoding;if(e){var f=Object.create(null);for(var g in e)b=d.indexOf(e[g]),b>=0&&(f[g]=b)}return o(a,f,d)},getSeacs:function(a){var b,c,d=[];for(b=0,c=a.length;c>b;b++){var e=a[b];e.seac&&(
// Offset by 1 for .notdef
d[b+1]=e.seac)}return d},getType2Charstrings:function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c].charstring);return b},getType2Subrs:function(a){var b=0,c=a.length;b=1133>c?107:33769>c?1131:32768;
// Add a bunch of empty subrs to deal with the Type2 bias
var d,e=[];for(d=0;b>d;d++)e.push([11]);for(d=0;c>d;d++)e.push(a[d]);return e},wrap:function(a,b,c,d,e){var f=new Y;f.header=new Z(1,0,4,4),f.names=[a];var g=new $;
// CFF strings IDs 0...390 are predefined names, so refering
// to entries in our own String INDEX starts at SID 391.
g.setByName("version",391),g.setByName("Notice",392),g.setByName("FullName",393),g.setByName("FamilyName",394),g.setByName("Weight",395),g.setByName("Encoding",null),// placeholder
g.setByName("FontMatrix",e.fontMatrix),g.setByName("FontBBox",e.bbox),g.setByName("charset",null),// placeholder
g.setByName("CharStrings",null),// placeholder
g.setByName("Private",null),// placeholder
f.topDict=g;var h=new aa;h.add("Version 0.11"),// Version
h.add("See original notice"),// Notice
h.add(a),// FullName
h.add(a),// FamilyName
h.add("Medium"),// Weight
f.strings=h,f.globalSubrIndex=new ba;var i,j,k=b.length,l=[0];for(i=0;k>i;i++){var m=V.indexOf(c[i].glyphName);
// TODO: Insert the string and correctly map it.  Previously it was
// thought mapping names that aren't in the standard strings to .notdef
// was fine, however in issue818 when mapping them all to .notdef the
// adieresis glyph no longer worked.
-1===m&&(m=0),l.push(m>>8&255,255&m)}f.charset=new ca(!1,0,[],l);var n=new ba;// .notdef
for(n.add([139,14]),i=0;k>i;i++)n.add(b[i]);f.charStrings=n;var o=new _;o.setByName("Subrs",null);// placeholder
var p=["BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StemSnapH","StemSnapV","BlueShift","BlueFuzz","BlueScale","LanguageGroup","ExpansionFactor","ForceBold","StdHW","StdVW"];for(i=0,j=p.length;j>i;i++){var q=p[i];if(q in e.privateData){var r=e.privateData[q];if(v(r))
// All of the private dictionary array data in CFF must be stored as
// "delta-encoded" numbers.
for(var s=r.length-1;s>0;s--)r[s]-=r[s-1];o.setByName(q,r)}}f.topDict.privateDict=o;var t=new ba;for(i=0,j=d.length;j>i;i++)t.add(d[i]);o.subrsIndex=t;var u=new X(f);return u.compile()}},d}(),sa=function(){function a(a,b){this.properties=b;var c=new W(a,b,ha);this.cff=c.parse();var d=new X(this.cff);this.seacs=this.cff.seacs;try{this.data=d.compile()}catch(e){B("Failed to compile font "+b.loadedName),
// There may have just been an issue with the compiler, set the data
// anyway and hope the font loaded.
this.data=a}}return a.prototype={get numGlyphs(){return this.cff.charStrings.count},getCharset:function(){return this.cff.charset.charset},getGlyphMapping:function(){var a,b,c=this.cff,d=this.properties,e=c.charset.charset;if(d.composite){if(a=Object.create(null),c.isCIDFont)
// If the font is actually a CID font then we should use the charset
// to map CIDs to GIDs.
for(b=0;b<e.length;b++){var f=e[b],g=d.cMap.charCodeOf(f);a[g]=b}else
// If it is NOT actually a CID font then CIDs should be mapped
// directly to GIDs.
for(b=0;b<c.charStrings.count;b++)a[b]=b;return a}var h=c.encoding?c.encoding.encoding:null;return a=o(d,h,e)}},a}();
// Workaround for seac on Windows.
!function(){"undefined"!=typeof navigator&&/Windows/.test(navigator.userAgent)&&(ha=!0)}(),
// Workaround for Private Use Area characters in Chrome on Windows
// http://code.google.com/p/chromium/issues/detail?id=122465
// https://github.com/mozilla/pdf.js/issues/1689
function(){"undefined"!=typeof navigator&&/Windows.*Chrome/.test(navigator.userAgent)&&(fa=!0)}(),a.SEAC_ANALYSIS_ENABLED=ha,a.ErrorFont=qa,a.Font=pa,a.FontFlags=ia,a.IdentityToUnicodeMap=ma,a.ToUnicodeMap=la,a.getFontType=n}),function(a,b){b(a.pdfjsCoreFunction={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCorePsParser)}(this,function(a,b,c,d){function e(a){var b;if("object"!=typeof a)return!1;if(j(a))b=a;else{if(!k(a))return!1;b=a.dict}return b.has("FunctionType")}var f=b.error,g=b.info,h=b.isArray,i=b.isBool,j=c.isDict,k=c.isStream,l=d.PostScriptLexer,m=d.PostScriptParser,n=function(){var a=0,b=2,c=3,d=4;return{getSampleArray:function(a,b,c,d){var e,f,g=1;for(e=0,f=a.length;f>e;e++)g*=a[e];g*=b;var h=new Array(g),i=0,j=0,k=1/(Math.pow(2,c)-1),l=d.getBytes((g*c+7)/8),m=0;for(e=0;g>e;e++){for(;c>i;)j<<=8,j|=l[m++],i+=8;i-=c,h[e]=(j>>i)*k,j&=(1<<i)-1}return h},getIR:function(a,b){var c=b.dict;c||(c=b);var d=[this.constructSampled,null,this.constructInterpolated,this.constructStiched,this.constructPostScript],e=c.get("FunctionType"),g=d[e];return g||f("Unknown type of function"),g.call(this,b,c,a)},fromIR:function(d){var e=d[0];switch(e){case a:return this.constructSampledFromIR(d);case b:return this.constructInterpolatedFromIR(d);case c:return this.constructStichedFromIR(d);
//case CONSTRUCT_POSTSCRIPT:
default:return this.constructPostScriptFromIR(d)}},parse:function(a,b){var c=this.getIR(a,b);return this.fromIR(c)},parseArray:function(a,b){if(!h(b))
// not an array -- parsing as regular function
return this.parse(a,b);for(var c=[],d=0,e=b.length;e>d;d++){var f=a.fetchIfRef(b[d]);c.push(n.parse(a,f))}return function(a,b,d,e){for(var f=0,g=c.length;g>f;f++)c[f](a,b,d,e+f)}},constructSampled:function(b,c){function d(a){for(var b=a.length,c=[],d=0,e=0;b>e;e+=2)c[d]=[a[e],a[e+1]],++d;return c}var e=c.getArray("Domain"),h=c.getArray("Range");e&&h||f("No domain or range");var i=e.length/2,j=h.length/2;e=d(e),h=d(h);var k=c.get("Size"),l=c.get("BitsPerSample"),m=c.get("Order")||1;1!==m&&
// No description how cubic spline interpolation works in PDF32000:2008
// As in poppler, ignoring order, linear interpolation may work as good
g("No support for cubic spline interpolation: "+m);var n=c.getArray("Encode");if(!n){n=[];for(var o=0;i>o;++o)n.push(0),n.push(k[o]-1)}n=d(n);var p=c.getArray("Decode");p=p?d(p):h;var q=this.getSampleArray(k,j,l,b);return[a,i,e,n,p,q,k,j,Math.pow(2,l)-1,h]},constructSampledFromIR:function(a){
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
e[f+h]=Math.min(Math.max(F,p[h][0]),p[h][1])}}},constructInterpolated:function(a,c){var d=c.getArray("C0")||[0],e=c.getArray("C1")||[1],g=c.get("N");h(d)&&h(e)||f("Illegal dictionary for interpolated function");for(var i=d.length,j=[],k=0;i>k;++k)j.push(e[k]-d[k]);return[b,d,j,g]},constructInterpolatedFromIR:function(a){var b=a[1],c=a[2],d=a[3],e=c.length;return function(a,f,g,h){for(var i=1===d?a[f]:Math.pow(a[f],d),j=0;e>j;++j)g[h+j]=b[j]+i*c[j]}},constructStiched:function(a,b,d){var e=b.getArray("Domain");e||f("No domain");var g=e.length/2;1!==g&&f("Bad domain for stiched function");for(var h=b.get("Functions"),i=[],j=0,k=h.length;k>j;++j)i.push(n.getIR(d,d.fetchIfRef(h[j])));var l=b.getArray("Bounds"),m=b.getArray("Encode");return[c,e,l,m,i]},constructStichedFromIR:function(a){for(var b=a[1],c=a[2],d=a[3],e=a[4],f=[],g=new Float32Array(1),h=0,i=e.length;i>h;h++)f.push(n.fromIR(e[h]));return function(a,e,h,i){
// calulate which bound the value is in
for(var j=function(a,b,c){return a>c?a=c:b>a&&(a=b),a},k=j(a[e],b[0],b[1]),l=0,m=c.length;m>l&&!(k<c[l]);++l);
// encode value into domain of function
var n=b[0];l>0&&(n=c[l-1]);var o=b[1];l<c.length&&(o=c[l]);var p=d[2*l],q=d[2*l+1];
// Prevent the value from becoming NaN as a result
// of division by zero (fixes issue6113.pdf).
g[0]=n===o?p:p+(k-n)*(q-p)/(o-n),
// call the appropriate function
f[l](g,0,h,i)}},constructPostScript:function(a,b,c){var e=b.getArray("Domain"),g=b.getArray("Range");e||f("No domain."),g||f("No range.");var h=new l(a),i=new m(h),j=i.parse();return[d,e,g,j]},constructPostScriptFromIR:function(a){var b=a[1],c=a[2],d=a[3],e=(new q).compile(d,b,c);if(e)
// Compiled function consists of simple expressions such as addition,
// subtraction, Math.max, and also contains 'var' and 'return'
// statements. See the generation in the PostScriptCompiler below.
/*jshint -W054 */
return new Function("src","srcOffset","dest","destOffset",e);g("Unable to compile PS function");var f=c.length>>1,h=b.length>>1,i=new p(d),j=Object.create(null),k=8192,l=k,m=new Float32Array(h);return function(a,b,d,e){var g,k,n="",o=m;for(g=0;h>g;g++)k=a[b+g],o[g]=k,n+=k+"_";var p=j[n];if(void 0!==p)return void d.set(p,e);var q=new Float32Array(f),r=i.execute(o),s=r.length-f;for(g=0;f>g;g++){k=r[s+g];var t=c[2*g];t>k?k=t:(t=c[2*g+1],k>t&&(k=t)),q[g]=k}l>0&&(l--,j[n]=q),d.set(q,e)}}}}(),o=function(){function a(a){this.stack=a?Array.prototype.slice.call(a,0):[]}var b=100;return a.prototype={push:function(a){this.stack.length>=b&&f("PostScript function stack overflow."),this.stack.push(a)},pop:function(){return this.stack.length<=0&&f("PostScript function stack underflow."),this.stack.pop()},copy:function(a){this.stack.length+a>=b&&f("PostScript function stack overflow.");for(var c=this.stack,d=c.length-a,e=a-1;e>=0;e--,d++)c.push(c[d])},index:function(a){this.push(this.stack[this.stack.length-a-1])},
// rotate the last n stack elements p times
roll:function(a,b){var c,d,e,f=this.stack,g=f.length-a,h=f.length-1,i=g+(b-Math.floor(b/a)*a);for(c=g,d=h;d>c;c++,d--)e=f[c],f[c]=f[d],f[d]=e;for(c=g,d=i-1;d>c;c++,d--)e=f[c],f[c]=f[d],f[d]=e;for(c=i,d=h;d>c;c++,d--)e=f[c],f[c]=f[d],f[d]=e}},a}(),p=function(){function a(a){this.operators=a}return a.prototype={execute:function(a){for(var b,c,d,e=new o(a),g=0,h=this.operators,j=h.length;j>g;)if(b=h[g++],"number"!=typeof b)switch(b){
// non standard ps operators
case"jz":// jump if false
d=e.pop(),c=e.pop(),c||(g=d);break;case"j":// jump
c=e.pop(),g=c;break;
// all ps operators in alphabetical order (excluding if/ifelse)
case"abs":c=e.pop(),e.push(Math.abs(c));break;case"add":d=e.pop(),c=e.pop(),e.push(c+d);break;case"and":d=e.pop(),c=e.pop(),i(c)&&i(d)?e.push(c&&d):e.push(c&d);break;case"atan":c=e.pop(),e.push(Math.atan(c));break;case"bitshift":d=e.pop(),c=e.pop(),c>0?e.push(c<<d):e.push(c>>d);break;case"ceiling":c=e.pop(),e.push(Math.ceil(c));break;case"copy":c=e.pop(),e.copy(c);break;case"cos":c=e.pop(),e.push(Math.cos(c));break;case"cvi":c=0|e.pop(),e.push(c);break;case"cvr":
// noop
break;case"div":d=e.pop(),c=e.pop(),e.push(c/d);break;case"dup":e.copy(1);break;case"eq":d=e.pop(),c=e.pop(),e.push(c===d);break;case"exch":e.roll(2,1);break;case"exp":d=e.pop(),c=e.pop(),e.push(Math.pow(c,d));break;case"false":e.push(!1);break;case"floor":c=e.pop(),e.push(Math.floor(c));break;case"ge":d=e.pop(),c=e.pop(),e.push(c>=d);break;case"gt":d=e.pop(),c=e.pop(),e.push(c>d);break;case"idiv":d=e.pop(),c=e.pop(),e.push(c/d|0);break;case"index":c=e.pop(),e.index(c);break;case"le":d=e.pop(),c=e.pop(),e.push(d>=c);break;case"ln":c=e.pop(),e.push(Math.log(c));break;case"log":c=e.pop(),e.push(Math.log(c)/Math.LN10);break;case"lt":d=e.pop(),c=e.pop(),e.push(d>c);break;case"mod":d=e.pop(),c=e.pop(),e.push(c%d);break;case"mul":d=e.pop(),c=e.pop(),e.push(c*d);break;case"ne":d=e.pop(),c=e.pop(),e.push(c!==d);break;case"neg":c=e.pop(),e.push(-c);break;case"not":c=e.pop(),i(c)?e.push(!c):e.push(~c);break;case"or":d=e.pop(),c=e.pop(),i(c)&&i(d)?e.push(c||d):e.push(c|d);break;case"pop":e.pop();break;case"roll":d=e.pop(),c=e.pop(),e.roll(c,d);break;case"round":c=e.pop(),e.push(Math.round(c));break;case"sin":c=e.pop(),e.push(Math.sin(c));break;case"sqrt":c=e.pop(),e.push(Math.sqrt(c));break;case"sub":d=e.pop(),c=e.pop(),e.push(c-d);break;case"true":e.push(!0);break;case"truncate":c=e.pop(),c=0>c?Math.ceil(c):Math.floor(c),e.push(c);break;case"xor":d=e.pop(),c=e.pop(),i(c)&&i(d)?e.push(c!==d):e.push(c^d);break;default:f("Unknown operator "+b)}else
// Operator is really an operand and should be pushed to the stack.
e.push(b);return e.stack}},a}(),q=function(){function a(a){this.type=a}function b(b,c,d){a.call(this,"args"),this.index=b,this.min=c,this.max=d}function c(b){a.call(this,"literal"),this.number=b,this.min=b,this.max=b}function d(b,c,d,e,f){a.call(this,"binary"),this.op=b,this.arg1=c,this.arg2=d,this.min=e,this.max=f}function e(b,c){a.call(this,"max"),this.arg=b,this.min=b.min,this.max=c}function f(b,c,d){a.call(this,"var"),this.index=b,this.min=c,this.max=d}function g(b,c){a.call(this,"definition"),this.variable=b,this.arg=c}function h(){this.parts=[]}function i(a,b){return"literal"===b.type&&0===b.number?a:"literal"===a.type&&0===a.number?b:"literal"===b.type&&"literal"===a.type?new c(a.number+b.number):new d("+",a,b,a.min+b.min,a.max+b.max)}function j(a,b){if("literal"===b.type){
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
return null;if(p=(p%o+o)%o,0===p)break;Array.prototype.push.apply(w,w.splice(w.length-o,o-p));break;default:return null}else w.push(new c(v));if(w.length!==z)return null;var B=[];return x.forEach(function(a){var b=new h;a.visit(b),B.push(b.toString())}),w.forEach(function(a,b){var c=new h;a.visit(c);var d=e[2*b],f=e[2*b+1],g=[c.toString()];d>a.min&&(g.unshift("Math.max(",d,", "),g.push(")")),f<a.max&&(g.unshift("Math.min(",f,", "),g.push(")")),g.unshift("dest[destOffset + ",b,"] = "),g.push(";"),B.push(g.join(""))}),B.join("\n")}},m}();a.isPDFFunction=e,a.PDFFunction=n,a.PostScriptEvaluator=p,a.PostScriptCompiler=q}),function(a,b){b(a.pdfjsCoreColorSpace={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreFunction)}(this,function(a,b,c,d){var e=b.error,f=b.info,g=b.isArray,h=b.isString,i=b.shadow,j=b.warn,k=c.isDict,l=c.isName,m=c.isStream,n=d.PDFFunction,o=function(){/**
   * Resizes an RGB image with 3 components.
   * @param {TypedArray} src - The source buffer.
   * @param {Number} bpc - Number of bits per component.
   * @param {Number} w1 - Original width.
   * @param {Number} h1 - Original height.
   * @param {Number} w2 - New width.
   * @param {Number} h2 - New height.
   * @param {Number} alpha01 - Size reserved for the alpha channel.
   * @param {TypedArray} dest - The destination buffer.
   */
function a(a,b,c,d,e,f,g,h){var i=3;g=1!==g?0:g;var j,k,l,m,n=c/e,o=d/f,p=0,q=new Uint16Array(e),r=c*i;for(j=0;e>j;j++)q[j]=Math.floor(j*n)*i;for(j=0;f>j;j++)for(l=Math.floor(j*o)*r,k=0;e>k;k++)m=l+q[k],h[p++]=a[m++],h[p++]=a[m++],h[p++]=a[m++],p+=g}
// Constructor should define this.numComps, this.defaultColor, this.name
function b(){e("should not call ColorSpace constructor")}/**
   * Checks if a decode map matches the default decode map for a color space.
   * This handles the general decode maps where there are two values per
   * component. e.g. [0, 1, 0, 1, 0, 1] for a RGB color.
   * This does not handle Lab, Indexed, or Pattern decode maps since they are
   * slightly different.
   * @param {Array} decode Decode map (usually from an image).
   * @param {Number} n Number of components the color space has.
   */
return b.prototype={/**
     * Converts the color value to the RGB color. The color components are
     * located in the src array starting from the srcOffset. Returns the array
     * of the rgb components, each value ranging from [0,255].
     */
getRgb:function(a,b){var c=new Uint8Array(3);return this.getRgbItem(a,b,c,0),c},/**
     * Converts the color value to the RGB color, similar to the getRgb method.
     * The result placed into the dest array starting from the destOffset.
     */
getRgbItem:function(a,b,c,d){e("Should not call ColorSpace.getRgbItem")},/**
     * Converts the specified number of the color values to the RGB colors.
     * The colors are located in the src array starting from the srcOffset.
     * The result is placed into the dest array starting from the destOffset.
     * The src array items shall be in [0,2^bits) range, the dest array items
     * will be in [0,255] range. alpha01 indicates how many alpha components
     * there are in the dest array; it will be either 0 (RGB array) or 1 (RGBA
     * array).
     */
getRgbBuffer:function(a,b,c,d,f,g,h){e("Should not call ColorSpace.getRgbBuffer")},/**
     * Determines the number of bytes required to store the result of the
     * conversion done by the getRgbBuffer method. As in getRgbBuffer,
     * |alpha01| is either 0 (RGB output) or 1 (RGBA output).
     */
getOutputLength:function(a,b){e("Should not call ColorSpace.getOutputLength")},/**
     * Returns true if source data will be equal the result/output data.
     */
isPassthrough:function(a){return!1},/**
     * Fills in the RGB colors in the destination buffer.  alpha01 indicates
     * how many alpha components there are in the dest array; it will be either
     * 0 (RGB array) or 1 (RGBA array).
     */
fillRgb:function(b,c,d,e,f,g,h,i,j){var k,l,m=c*d,n=null,o=1<<h,p=d!==f||c!==e;if(this.isPassthrough(h))n=i;else if(1===this.numComps&&m>o&&"DeviceGray"!==this.name&&"DeviceRGB"!==this.name){
// Optimization: create a color map when there is just one component and
// we are converting more colors than the size of the color map. We
// don't build the map if the colorspace is gray or rgb since those
// methods are faster than building a map. This mainly offers big speed
// ups for indexed and alternate colorspaces.
//
// TODO it may be worth while to cache the color map. While running
// testing I never hit a cache so I will leave that out for now (perhaps
// we are reparsing colorspaces too much?).
var q,r=8>=h?new Uint8Array(o):new Uint16Array(o);for(k=0;o>k;k++)r[k]=k;var s=new Uint8Array(3*o);this.getRgbBuffer(r,0,o,s,0,h,/* alpha01 = */
0);var t,u;if(p)for(n=new Uint8Array(3*m),u=0,k=0;m>k;++k)q=3*i[k],n[u++]=s[q],n[u++]=s[q+1],n[u++]=s[q+2];else for(t=0,k=0;m>k;++k)q=3*i[k],b[t++]=s[q],b[t++]=s[q+1],b[t++]=s[q+2],t+=j}else p?(n=new Uint8Array(3*m),this.getRgbBuffer(i,0,m,n,0,h,0)):
// Fill in the RGB values directly into |dest|.
this.getRgbBuffer(i,0,e*g,b,0,h,j);if(n)if(p)a(n,h,c,d,e,f,j,b);else for(u=0,t=0,k=0,l=e*g;l>k;k++)b[t++]=n[u++],b[t++]=n[u++],b[t++]=n[u++],t+=j},/**
     * True if the colorspace has components in the default range of [0, 1].
     * This should be true for all colorspaces except for lab color spaces
     * which are [0,100], [-128, 127], [-128, 127].
     */
usesZeroToOneRange:!0},b.parse=function(a,c,d){var e=b.parseToIR(a,c,d);return e instanceof p?e:b.fromIR(e)},b.fromIR=function(a){var c,d,f,h=g(a)?a[0]:a;switch(h){case"DeviceGrayCS":return this.singletons.gray;case"DeviceRgbCS":return this.singletons.rgb;case"DeviceCmykCS":return this.singletons.cmyk;case"CalGrayCS":return c=a[1],d=a[2],f=a[3],new v(c,d,f);case"CalRGBCS":c=a[1],d=a[2],f=a[3];var i=a[4];return new w(c,d,f,i);case"PatternCS":var j=a[1];return j&&(j=b.fromIR(j)),new q(j);case"IndexedCS":var k=a[1],l=a[2],m=a[3];return new r(b.fromIR(k),l,m);case"AlternateCS":var o=a[1],s=a[2],t=a[3];return new p(o,b.fromIR(s),n.fromIR(t));case"LabCS":c=a[1],d=a[2];var u=a[3];return new x(c,d,u);default:e("Unknown name "+h)}return null},b.parseToIR=function(a,c,d){if(l(a)){var f=d.get("ColorSpace");if(k(f)){var h=f.get(a.name);h&&(a=h)}}a=c.fetchIfRef(a);var i;if(l(a))switch(i=a.name,this.mode=i,i){case"DeviceGray":case"G":return"DeviceGrayCS";case"DeviceRGB":case"RGB":return"DeviceRgbCS";case"DeviceCMYK":case"CMYK":return"DeviceCmykCS";case"Pattern":return["PatternCS",null];default:e("unrecognized colorspace "+i)}else if(g(a)){i=c.fetchIfRef(a[0]).name,this.mode=i;var o,p,q,r,s,t;switch(i){case"DeviceGray":case"G":return"DeviceGrayCS";case"DeviceRGB":case"RGB":return"DeviceRgbCS";case"DeviceCMYK":case"CMYK":return"DeviceCmykCS";case"CalGray":return p=c.fetchIfRef(a[1]),r=p.getArray("WhitePoint"),s=p.getArray("BlackPoint"),t=p.get("Gamma"),["CalGrayCS",r,s,t];case"CalRGB":p=c.fetchIfRef(a[1]),r=p.getArray("WhitePoint"),s=p.getArray("BlackPoint"),t=p.getArray("Gamma");var u=p.getArray("Matrix");return["CalRGBCS",r,s,t,u];case"ICCBased":var v=c.fetchIfRef(a[1]),w=v.dict;if(o=w.get("N"),q=w.get("Alternate")){var x=b.parseToIR(q,c,d),y=b.fromIR(x);if(y.numComps===o)return x;j("ICCBased color space: Ignoring incorrect /Alternate entry.")}if(1===o)return"DeviceGrayCS";if(3===o)return"DeviceRgbCS";if(4===o)return"DeviceCmykCS";break;case"Pattern":var z=a[1]||null;return z&&(z=b.parseToIR(z,c,d)),["PatternCS",z];case"Indexed":case"I":var A=b.parseToIR(a[1],c,d),B=c.fetchIfRef(a[2])+1,C=c.fetchIfRef(a[3]);return m(C)&&(C=C.getBytes()),["IndexedCS",A,B,C];case"Separation":case"DeviceN":var D=c.fetchIfRef(a[1]);o=1,l(D)?o=1:g(D)&&(o=D.length),q=b.parseToIR(a[2],c,d);var E=n.getIR(c,c.fetchIfRef(a[3]));return["AlternateCS",o,q,E];case"Lab":p=c.fetchIfRef(a[1]),r=p.getArray("WhitePoint"),s=p.getArray("BlackPoint");var F=p.getArray("Range");return["LabCS",r,s,F];default:e('unimplemented color space object "'+i+'"')}}else e('unrecognized color space object: "'+a+'"');return null},b.isDefaultDecode=function(a,b){if(!g(a))return!0;if(2*b!==a.length)return j("The decode map is not the correct length"),!0;for(var c=0,d=a.length;d>c;c+=2)if(0!==a[c]||1!==a[c+1])return!1;return!0},b.singletons={get gray(){return i(this,"gray",new s)},get rgb(){return i(this,"rgb",new t)},get cmyk(){return i(this,"cmyk",new u)}},b}(),p=function(){function a(a,b,c){this.name="Alternate",this.numComps=a,this.defaultColor=new Float32Array(a);for(var d=0;a>d;++d)this.defaultColor[d]=1;this.base=b,this.tintFn=c,this.tmpBuf=new Float32Array(b.numComps)}return a.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=this.tmpBuf;this.tintFn(a,b,e,0),this.base.getRgbItem(e,0,c,d)},getRgbBuffer:function(a,b,c,d,e,f,g){var h,i,j=this.tintFn,k=this.base,l=1/((1<<f)-1),m=k.numComps,n=k.usesZeroToOneRange,o=(k.isPassthrough(8)||!n)&&0===g,p=o?e:0,q=o?d:new Uint8Array(m*c),r=this.numComps,s=new Float32Array(r),t=new Float32Array(m);if(n)for(h=0;c>h;h++){for(i=0;r>i;i++)s[i]=a[b++]*l;for(j(s,0,t,0),i=0;m>i;i++)q[p++]=255*t[i]}else for(h=0;c>h;h++){for(i=0;r>i;i++)s[i]=a[b++]*l;j(s,0,t,0),k.getRgbItem(t,0,q,p),p+=m}o||k.getRgbBuffer(q,0,c,d,e,8,g)},getOutputLength:function(a,b){return this.base.getOutputLength(a*this.base.numComps/this.numComps,b)},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){return o.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),q=function(){function a(a){this.name="Pattern",this.base=a}return a.prototype={},a}(),r=function(){function a(a,b,c){this.name="Indexed",this.numComps=1,this.defaultColor=new Uint8Array([0]),this.base=a,this.highVal=b;var d,f=a.numComps,g=f*b;if(m(c)){d=new Uint8Array(g);var i=c.getBytes(g);d.set(i)}else if(h(c)){d=new Uint8Array(g);for(var j=0;g>j;++j)d[j]=c.charCodeAt(j)}else c instanceof Uint8Array||c instanceof Array?d=c:e("Unrecognized lookup table: "+c);this.lookup=d}return a.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=this.base.numComps,f=a[b]*e;this.base.getRgbItem(this.lookup,f,c,d)},getRgbBuffer:function(a,b,c,d,e,f,g){for(var h=this.base,i=h.numComps,j=h.getOutputLength(i,g),k=this.lookup,l=0;c>l;++l){var m=a[b++]*i;h.getRgbBuffer(k,m,1,d,e,8,g),e+=j}},getOutputLength:function(a,b){return this.base.getOutputLength(a*this.base.numComps,b)},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){
// indexed color maps shouldn't be changed
return!0},usesZeroToOneRange:!0},a}(),s=function(){function a(){this.name="DeviceGray",this.numComps=1,this.defaultColor=new Float32Array([0])}return a.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=255*a[b]|0;e=0>e?0:e>255?255:e,c[d]=c[d+1]=c[d+2]=e},getRgbBuffer:function(a,b,c,d,e,f,g){for(var h=255/((1<<f)-1),i=b,j=e,k=0;c>k;++k){var l=h*a[i++]|0;d[j++]=l,d[j++]=l,d[j++]=l,j+=g}},getOutputLength:function(a,b){return a*(3+b)},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){return o.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),t=function(){function a(){this.name="DeviceRGB",this.numComps=3,this.defaultColor=new Float32Array([0,0,0])}return a.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(a,b,c,d){var e=255*a[b]|0,f=255*a[b+1]|0,g=255*a[b+2]|0;c[d]=0>e?0:e>255?255:e,c[d+1]=0>f?0:f>255?255:f,c[d+2]=0>g?0:g>255?255:g},getRgbBuffer:function(a,b,c,d,e,f,g){if(8===f&&0===g)return void d.set(a.subarray(b,b+3*c),e);for(var h=255/((1<<f)-1),i=b,j=e,k=0;c>k;++k)d[j++]=h*a[i++]|0,d[j++]=h*a[i++]|0,d[j++]=h*a[i++]|0,j+=g},getOutputLength:function(a,b){return a*(3+b)/3|0},isPassthrough:function(a){return 8===a},fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){return o.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),u=function(){
// The coefficients below was found using numerical analysis: the method of
// steepest descent for the sum((f_i - color_value_i)^2) for r/g/b colors,
// where color_value is the tabular value from the table of sampled RGB colors
// from CMYK US Web Coated (SWOP) colorspace, and f_i is the corresponding
// CMYK color conversion using the estimation below:
//   f(A, B,.. N) = Acc+Bcm+Ccy+Dck+c+Fmm+Gmy+Hmk+Im+Jyy+Kyk+Ly+Mkk+Nk+255
function a(a,b,c,d,e){var f=a[b+0]*c,g=a[b+1]*c,h=a[b+2]*c,i=a[b+3]*c,j=f*(-4.387332384609988*f+54.48615194189176*g+18.82290502165302*h+212.25662451639585*i+-285.2331026137004)+g*(1.7149763477362134*g-5.6096736904047315*h+-17.873870861415444*i-5.497006427196366)+h*(-2.5217340131683033*h-21.248923337353073*i+17.5119270841813)+i*(-21.86122147463605*i-189.48180835922747)+255|0,k=f*(8.841041422036149*f+60.118027045597366*g+6.871425592049007*h+31.159100130055922*i+-79.2970844816548)+g*(-15.310361306967817*g+17.575251261109482*h+131.35250912493976*i-190.9453302588951)+h*(4.444339102852739*h+9.8632861493405*i-24.86741582555878)+i*(-20.737325471181034*i-187.80453709719578)+255|0,l=f*(.8842522430003296*f+8.078677503112928*g+30.89978309703729*h-.23883238689178934*i+-14.183576799673286)+g*(10.49593273432072*g+63.02378494754052*h+50.606957656360734*i-112.23884253719248)+h*(.03296041114873217*h+115.60384449646641*i+-193.58209356861505)+i*(-22.33816807309886*i-180.12613974708367)+255|0;d[e]=j>255?255:0>j?0:j,d[e+1]=k>255?255:0>k?0:k,d[e+2]=l>255?255:0>l?0:l}function b(){this.name="DeviceCMYK",this.numComps=4,this.defaultColor=new Float32Array([0,0,0,1])}return b.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(b,c,d,e){a(b,c,1,d,e)},getRgbBuffer:function(b,c,d,e,f,g,h){for(var i=1/((1<<g)-1),j=0;d>j;j++)a(b,c,i,e,f),c+=4,f+=3+h},getOutputLength:function(a,b){return a/4*(3+b)|0},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){return o.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},b}(),v=function(){function a(a,b,c){this.name="CalGray",this.numComps=1,this.defaultColor=new Float32Array([0]),a||e("WhitePoint missing - required for color space CalGray"),b=b||[0,0,0],c=c||1,this.XW=a[0],this.YW=a[1],this.ZW=a[2],this.XB=b[0],this.YB=b[1],this.ZB=b[2],this.G=c,(this.XW<0||this.ZW<0||1!==this.YW)&&e("Invalid WhitePoint components for "+this.name+", no fallback available"),(this.XB<0||this.YB<0||this.ZB<0)&&(f("Invalid BlackPoint for "+this.name+", falling back to default"),this.XB=this.YB=this.ZB=0),0===this.XB&&0===this.YB&&0===this.ZB||j(this.name+", BlackPoint: XB: "+this.XB+", YB: "+this.YB+", ZB: "+this.ZB+", only default values are supported."),this.G<1&&(f("Invalid Gamma: "+this.G+" for "+this.name+", falling back to default"),this.G=1)}function b(a,b,c,d,e,f){
// A represents a gray component of a calibrated gray space.
// A <---> AG in the spec
var g=b[c]*f,h=Math.pow(g,a.G),i=a.YW*h,j=0|Math.max(295.8*Math.pow(i,.3333333333333333)-40.8,0);d[e]=j,d[e+1]=j,d[e+2]=j}return a.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(a,c,d,e){b(this,a,c,d,e,1)},getRgbBuffer:function(a,c,d,e,f,g,h){for(var i=1/((1<<g)-1),j=0;d>j;++j)b(this,a,c,e,f,i),c+=1,f+=3+h},getOutputLength:function(a,b){return a*(3+b)},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){return o.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),w=function(){function a(a,b,c,d){this.name="CalRGB",this.numComps=3,this.defaultColor=new Float32Array(3),a||e("WhitePoint missing - required for color space CalRGB"),b=b||new Float32Array(3),c=c||new Float32Array([1,1,1]),d=d||new Float32Array([1,0,0,0,1,0,0,0,1]);
// Translate arguments to spec variables.
var g=a[0],h=a[1],i=a[2];this.whitePoint=a;var j=b[0],k=b[1],l=b[2];this.blackPoint=b,this.GR=c[0],this.GG=c[1],this.GB=c[2],this.MXA=d[0],this.MYA=d[1],this.MZA=d[2],this.MXB=d[3],this.MYB=d[4],this.MZB=d[5],this.MXC=d[6],this.MYC=d[7],this.MZC=d[8],
// Validate variables as per spec.
(0>g||0>i||1!==h)&&e("Invalid WhitePoint components for "+this.name+", no fallback available"),(0>j||0>k||0>l)&&(f("Invalid BlackPoint for "+this.name+" ["+j+", "+k+", "+l+"], falling back to default"),this.blackPoint=new Float32Array(3)),(this.GR<0||this.GG<0||this.GB<0)&&(f("Invalid Gamma ["+this.GR+", "+this.GG+", "+this.GB+"] for "+this.name+", falling back to default"),this.GR=this.GG=this.GB=1),(this.MXA<0||this.MYA<0||this.MZA<0||this.MXB<0||this.MYB<0||this.MZB<0||this.MXC<0||this.MYC<0||this.MZC<0)&&(f("Invalid Matrix for "+this.name+" ["+this.MXA+", "+this.MYA+", "+this.MZA+this.MXB+", "+this.MYB+", "+this.MZB+this.MXC+", "+this.MYC+", "+this.MZC+"], falling back to default"),this.MXA=this.MYB=this.MZC=1,this.MXB=this.MYA=this.MZA=this.MXC=this.MYC=this.MZB=0)}function b(a,b,c){c[0]=a[0]*b[0]+a[1]*b[1]+a[2]*b[2],c[1]=a[3]*b[0]+a[4]*b[1]+a[5]*b[2],c[2]=a[6]*b[0]+a[7]*b[1]+a[8]*b[2]}function c(a,b,c){c[0]=1*b[0]/a[0],c[1]=1*b[1]/a[1],c[2]=1*b[2]/a[2]}function d(a,b,c){var d=.95047,e=1,f=1.08883;c[0]=b[0]*d/a[0],c[1]=b[1]*e/a[1],c[2]=b[2]*f/a[2]}function g(a){
// See http://en.wikipedia.org/wiki/SRGB.
// See http://en.wikipedia.org/wiki/SRGB.
return.0031308>=a?h(0,1,12.92*a):h(0,1,1.055*Math.pow(a,1/2.4)-.055)}function h(a,b,c){return Math.max(a,Math.min(b,c))}function i(a){return 0>a?-i(-a):a>8?Math.pow((a+16)/116,3):a*v}function j(a,b,c){
// In case the blackPoint is already the default blackPoint then there is
// no need to do compensation.
if(0===a[0]&&0===a[1]&&0===a[2])return c[0]=b[0],c[1]=b[1],void(c[2]=b[2]);
// For the blackPoint calculation details, please see
// http://www.adobe.com/content/dam/Adobe/en/devnet/photoshop/sdk/
// AdobeBPC.pdf.
// The destination blackPoint is the default blackPoint [0, 0, 0].
var d=i(0),e=d,f=i(a[0]),g=d,h=i(a[1]),j=d,k=i(a[2]),l=(1-e)/(1-f),m=1-l,n=(1-g)/(1-h),o=1-n,p=(1-j)/(1-k),q=1-p;c[0]=b[0]*l+m,c[1]=b[1]*n+o,c[2]=b[2]*p+q}function k(a,d,e){
// In case the whitePoint is already flat then there is no need to do
// normalization.
if(1===a[0]&&1===a[2])return e[0]=d[0],e[1]=d[1],void(e[2]=d[2]);var f=e;b(n,d,f);var g=s;c(a,f,g),b(p,g,e)}function l(a,c,e){var f=e;b(n,c,f);var g=s;d(a,f,g),b(p,g,e)}function m(a,c,d,e,f,i){
// A, B and C represent a red, green and blue components of a calibrated
// rgb space.
var m=h(0,1,c[d]*i),n=h(0,1,c[d+1]*i),o=h(0,1,c[d+2]*i),p=Math.pow(m,a.GR),s=Math.pow(n,a.GG),v=Math.pow(o,a.GB),w=a.MXA*p+a.MXB*s+a.MXC*v,x=a.MYA*p+a.MYB*s+a.MYC*v,y=a.MZA*p+a.MZB*s+a.MZC*v,z=t;z[0]=w,z[1]=x,z[2]=y;var A=u;k(a.whitePoint,z,A);var B=t;j(a.blackPoint,A,B);var C=u;l(r,B,C);var D=t;b(q,C,D);var E=g(D[0]),F=g(D[1]),G=g(D[2]);
// Convert the values to rgb range [0, 255].
e[f]=Math.round(255*E),e[f+1]=Math.round(255*F),e[f+2]=Math.round(255*G)}
// See http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html for these
// matrices.
var n=new Float32Array([.8951,.2664,-.1614,-.7502,1.7135,.0367,.0389,-.0685,1.0296]),p=new Float32Array([.9869929,-.1470543,.1599627,.4323053,.5183603,.0492912,-.0085287,.0400428,.9684867]),q=new Float32Array([3.2404542,-1.5371385,-.4985314,-.969266,1.8760108,.041556,.0556434,-.2040259,1.0572252]),r=new Float32Array([1,1,1]),s=new Float32Array(3),t=new Float32Array(3),u=new Float32Array(3),v=Math.pow(24/116,3)/8;return a.prototype={getRgb:function(a,b){var c=new Uint8Array(3);return this.getRgbItem(a,b,c,0),c},getRgbItem:function(a,b,c,d){m(this,a,b,c,d,1)},getRgbBuffer:function(a,b,c,d,e,f,g){for(var h=1/((1<<f)-1),i=0;c>i;++i)m(this,a,b,d,e,h),b+=3,e+=3+g},getOutputLength:function(a,b){return a*(3+b)/3|0},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){return o.isDefaultDecode(a,this.numComps)},usesZeroToOneRange:!0},a}(),x=function(){function a(a,b,c){this.name="Lab",this.numComps=3,this.defaultColor=new Float32Array([0,0,0]),a||e("WhitePoint missing - required for color space Lab"),b=b||[0,0,0],c=c||[-100,100,-100,100],this.XW=a[0],this.YW=a[1],this.ZW=a[2],this.amin=c[0],this.amax=c[1],this.bmin=c[2],this.bmax=c[3],this.XB=b[0],this.YB=b[1],this.ZB=b[2],(this.XW<0||this.ZW<0||1!==this.YW)&&e("Invalid WhitePoint components, no fallback available"),(this.XB<0||this.YB<0||this.ZB<0)&&(f("Invalid BlackPoint, falling back to default"),this.XB=this.YB=this.ZB=0),(this.amin>this.amax||this.bmin>this.bmax)&&(f("Invalid Range, falling back to defaults"),this.amin=-100,this.amax=100,this.bmin=-100,this.bmax=100)}
// Function g(x) from spec
function b(a){return a>=6/29?a*a*a:108/841*(a-4/29)}function c(a,b,c,d){return c+a*(d-c)/b}
// If decoding is needed maxVal should be 2^bits per component - 1.
function d(a,d,e,f,g,h){
// XXX: Lab input is in the range of [0, 100], [amin, amax], [bmin, bmax]
// not the usual [0, 1]. If a command like setFillColor is used the src
// values will already be within the correct range. However, if we are
// converting an image we have to map the values to the correct range given
// above.
// Ls,as,bs <---> L*,a*,b* in the spec
var i=d[e],j=d[e+1],k=d[e+2];f!==!1&&(i=c(i,f,0,100),j=c(j,f,a.amin,a.amax),k=c(k,f,a.bmin,a.bmax)),j=j>a.amax?a.amax:j<a.amin?a.amin:j,k=k>a.bmax?a.bmax:k<a.bmin?a.bmin:k;
// Computes intermediate variables X,Y,Z as per spec
var l,m,n,o=(i+16)/116,p=o+j/500,q=o-k/200,r=a.XW*b(p),s=a.YW*b(o),t=a.ZW*b(q);
// Using different conversions for D50 and D65 white points,
// per http://www.color.org/srgb.pdf
a.ZW<1?(l=3.1339*r+-1.617*s+t*-.4906,m=r*-.9785+1.916*s+.0333*t,n=.072*r+s*-.229+1.4057*t):(l=3.2406*r+-1.5372*s+t*-.4986,m=r*-.9689+1.8758*s+.0415*t,n=.0557*r+s*-.204+1.057*t),
// clamp color values to [0,1] range then convert to [0,255] range.
g[h]=0>=l?0:l>=1?255:255*Math.sqrt(l)|0,g[h+1]=0>=m?0:m>=1?255:255*Math.sqrt(m)|0,g[h+2]=0>=n?0:n>=1?255:255*Math.sqrt(n)|0}return a.prototype={getRgb:o.prototype.getRgb,getRgbItem:function(a,b,c,e){d(this,a,b,!1,c,e)},getRgbBuffer:function(a,b,c,e,f,g,h){for(var i=(1<<g)-1,j=0;c>j;j++)d(this,a,b,i,e,f),b+=3,f+=3+h},getOutputLength:function(a,b){return a*(3+b)/3|0},isPassthrough:o.prototype.isPassthrough,fillRgb:o.prototype.fillRgb,isDefaultDecode:function(a){
// XXX: Decoding is handled with the lab conversion because of the strange
// ranges that are used.
return!0},usesZeroToOneRange:!1},a}();a.ColorSpace=o}),function(a,b){b(a.pdfjsCoreImage={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreColorSpace,a.pdfjsCoreStream,a.pdfjsCoreJpx)}(this,function(a,b,c,d,e,f){var g=b.ImageKind,h=b.assert,i=b.error,j=b.info,k=b.isArray,l=b.warn,m=c.Name,n=c.isStream,o=d.ColorSpace,p=e.DecodeStream,q=e.JpegStream,r=f.JpxImage,s=function(){/**
   * Decodes the image using native decoder if possible. Resolves the promise
   * when the image data is ready.
   */
function a(a,b){return b&&b.canDecode(a)?b.decode(a):Promise.resolve(a)}/**
   * Decode and clamp a value. The formula is different from the spec because we
   * don't decode to float range [0,1], we decode it in the [0,max] range.
   */
function b(a,b,c,d){
// Clamp the value to the range
return a=b+a*c,0>a?0:a>d?d:a}/**
   * Resizes an image mask with 1 component.
   * @param {TypedArray} src - The source buffer.
   * @param {Number} bpc - Number of bits per component.
   * @param {Number} w1 - Original width.
   * @param {Number} h1 - Original height.
   * @param {Number} w2 - New width.
   * @param {Number} h2 - New height.
   * @returns {TypedArray} The resized image mask buffer.
   */
function c(a,b,c,d,e,f){var g,h,i,j,k=e*f,l=8>=b?new Uint8Array(k):16>=b?new Uint16Array(k):new Uint32Array(k),m=c/e,n=d/f,o=0,p=new Uint16Array(e),q=c;for(g=0;e>g;g++)p[g]=Math.floor(g*m);for(g=0;f>g;g++)for(i=Math.floor(g*n)*q,h=0;e>h;h++)j=i+p[h],l[o++]=a[j];return l}function d(a,b,c,e,f,g,h){this.image=c;var k=c.dict;if(k.has("Filter")){var p=k.get("Filter").name;if("JPXDecode"===p){var q=new r;q.parseImageProperties(c.stream),c.stream.reset(),c.bitsPerComponent=q.bitsPerComponent,c.numComps=q.componentsCount}else"JBIG2Decode"===p&&(c.bitsPerComponent=1,c.numComps=1)}
// TODO cache rendered images?
this.width=k.get("Width","W"),this.height=k.get("Height","H"),(this.width<1||this.height<1)&&i("Invalid image width: "+this.width+" or height: "+this.height),this.interpolate=k.get("Interpolate","I")||!1,this.imageMask=k.get("ImageMask","IM")||!1,this.matte=k.get("Matte")||!1;var s=c.bitsPerComponent;if(s||(s=k.get("BitsPerComponent","BPC"),s||(this.imageMask?s=1:i("Bits per component missing in image: "+this.imageMask))),this.bpc=s,!this.imageMask){var t=k.get("ColorSpace","CS");if(!t)switch(j("JPX images (which do not require color spaces)"),c.numComps){case 1:t=m.get("DeviceGray");break;case 3:t=m.get("DeviceRGB");break;case 4:t=m.get("DeviceCMYK");break;default:i("JPX images with "+this.numComps+" color components not supported.")}this.colorSpace=o.parse(t,a,b),this.numComps=this.colorSpace.numComps}if(this.decode=k.getArray("Decode","D"),this.needsDecode=!1,this.decode&&(this.colorSpace&&!this.colorSpace.isDefaultDecode(this.decode)||h&&!o.isDefaultDecode(this.decode,1))){this.needsDecode=!0;
// Do some preprocessing to avoid more math.
var u=(1<<s)-1;this.decodeCoefficients=[],this.decodeAddends=[];for(var v=0,w=0;v<this.decode.length;v+=2,++w){var x=this.decode[v],y=this.decode[v+1];this.decodeCoefficients[w]=y-x,this.decodeAddends[w]=u*x}}if(f)this.smask=new d(a,b,f,!1);else if(g)if(n(g)){var z=g.dict,A=z.get("ImageMask","IM");A?this.mask=new d(a,b,g,!1,null,null,!0):l("Ignoring /Mask in image without /ImageMask.")}else
// Color key mask (just an array).
this.mask=g}/**
   * Handles processing of image data and returns the Promise that is resolved
   * with a PDFImage when the image is ready to be used.
   */
return d.buildImage=function(b,c,e,f,g,h){var i,j,m=a(f,h),o=f.dict.get("SMask"),p=f.dict.get("Mask");return o?(i=a(o,h),j=Promise.resolve(null)):(i=Promise.resolve(null),p?n(p)?j=a(p,h):k(p)?j=Promise.resolve(p):(l("Unsupported mask format."),j=Promise.resolve(null)):j=Promise.resolve(null)),Promise.all([m,i,j]).then(function(a){var b=a[0],f=a[1],h=a[2];return new d(c,e,b,g,f,h)})},d.createMask=function(a,b,c,d,e){
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
if(e)for(g=0;i>g;g++)f[g]=~f[g];return{data:f,width:b,height:c}},d.prototype={get drawWidth(){return Math.max(this.width,this.smask&&this.smask.width||0,this.mask&&this.mask.width||0)},get drawHeight(){return Math.max(this.height,this.smask&&this.smask.height||0,this.mask&&this.mask.height||0)},decodeBuffer:function(a){var c,d,e=this.bpc,f=this.numComps,g=this.decodeAddends,h=this.decodeCoefficients,i=(1<<e)-1;if(1!==e){var j=0;for(c=0,d=this.width*this.height;d>c;c++)for(var k=0;f>k;k++)a[j]=b(a[j],g[k],h[k],i),j++}else
// If the buffer needed decode that means it just needs to be inverted.
for(c=0,d=a.length;d>c;c++)a[c]=+!a[c]},getComponents:function(a){var b=this.bpc;
// This image doesn't require any extra work.
if(8===b)return a;var c,d,e=this.width,f=this.height,g=this.numComps,h=e*f*g,i=0,j=8>=b?new Uint8Array(h):16>=b?new Uint16Array(h):new Uint32Array(h),k=e*g,l=(1<<b)-1,m=0;if(1===b)for(var n,o,p,q=0;f>q;q++){
// unroll loop for all full bytes
for(o=m+(-8&k),p=m+k;o>m;)d=a[i++],j[m]=d>>7&1,j[m+1]=d>>6&1,j[m+2]=d>>5&1,j[m+3]=d>>4&1,j[m+4]=d>>3&1,j[m+5]=d>>2&1,j[m+6]=d>>1&1,j[m+7]=1&d,m+=8;
// handle remaing bits
if(p>m)for(d=a[i++],n=128;p>m;)j[m++]=+!!(d&n),n>>=1}else{
// The general case that handles all other bpc values.
var r=0;for(d=0,m=0,c=h;c>m;++m){for(m%k===0&&(d=0,r=0);b>r;)d=d<<8|a[i++],r+=8;var s=r-b,t=d>>s;j[m]=0>t?0:t>l?l:t,d&=(1<<s)-1,r=s}}return j},fillOpacity:function(a,b,e,f,g){var h,j,l,m,n,o,p=this.smask,q=this.mask;if(p)j=p.width,l=p.height,h=new Uint8Array(j*l),p.fillGrayBuffer(h),j===b&&l===e||(h=c(h,p.bpc,j,l,b,e));else if(q)if(q instanceof d){
// Need to invert values in rgbaBuf
for(j=q.width,l=q.height,h=new Uint8Array(j*l),q.numComps=1,q.fillGrayBuffer(h),m=0,n=j*l;n>m;++m)h[m]=255-h[m];j===b&&l===e||(h=c(h,q.bpc,j,l,b,e))}else if(k(q)){
// Color key mask: if any of the compontents are outside the range
// then they should be painted.
h=new Uint8Array(b*e);var r=this.numComps;for(m=0,n=b*e;n>m;++m){var s=0,t=m*r;for(o=0;r>o;++o){var u=g[t+o],v=2*o;if(u<q[v]||u>q[v+1]){s=255;break}}h[m]=s}}else i("Unknown mask format.");if(h)for(m=0,o=3,n=b*f;n>m;++m,o+=4)a[o]=h[m];else
// No mask.
for(m=0,o=3,n=b*f;n>m;++m,o+=4)a[o]=255},undoPreblend:function(a,b,c){var d=this.smask&&this.smask.matte;if(d)for(var e,f,g,h=this.colorSpace.getRgb(d,0),i=h[0],j=h[1],k=h[2],l=b*c*4,m=0;l>m;m+=4){var n=a[m+3];if(0!==n){var o=255/n;e=(a[m]-i)*o+i,f=(a[m+1]-j)*o+j,g=(a[m+2]-k)*o+k,a[m]=0>=e?0:e>=255?255:0|e,a[m+1]=0>=f?0:f>=255?255:0|f,a[m+2]=0>=g?0:g>=255?255:0|g}else
// according formula we have to get Infinity in all components
// making it white (typical paper color) should be okay
a[m]=255,a[m+1]=255,a[m+2]=255}},createImageData:function(a){var b,c=this.drawWidth,d=this.drawHeight,e={// other fields are filled in below
width:c,height:d},f=this.numComps,i=this.width,j=this.height,k=this.bpc,l=i*f*k+7>>3;if(!a){
// If it is a 1-bit-per-pixel grayscale (i.e. black-and-white) image
// without any complications, we pass a same-sized copy to the main
// thread rather than expanding by 32x to RGBA form. This saves *lots*
// of memory for many scanned documents. It's also much faster.
//
// Similarly, if it is a 24-bit-per pixel RGB image without any
// complications, we avoid expanding by 1.333x to RGBA form.
var m;if("DeviceGray"===this.colorSpace.name&&1===k?m=g.GRAYSCALE_1BPP:"DeviceRGB"!==this.colorSpace.name||8!==k||this.needsDecode||(m=g.RGB_24BPP),m&&!this.smask&&!this.mask&&c===i&&d===j){
// If imgArray came from a DecodeStream, we're safe to transfer it
// (and thus detach its underlying buffer) because it will constitute
// the entire DecodeStream's data.  But if it came from a Stream, we
// need to copy it because it'll only be a portion of the Stream's
// data, and the rest will be read later on.
if(e.kind=m,b=this.getImageBytes(j*l),this.image instanceof p)e.data=b;else{var n=new Uint8Array(b.length);n.set(b),e.data=n}if(this.needsDecode){
// Invert the buffer (which must be grayscale if we reached here).
h(m===g.GRAYSCALE_1BPP);for(var o=e.data,r=0,s=o.length;s>r;r++)o[r]^=255}return e}if(this.image instanceof q&&!this.smask&&!this.mask&&("DeviceGray"===this.colorSpace.name||"DeviceRGB"===this.colorSpace.name||"DeviceCMYK"===this.colorSpace.name))return e.kind=g.RGB_24BPP,e.data=this.getImageBytes(j*l,c,d,!0),e}b=this.getImageBytes(j*l);
// imgArray can be incomplete (e.g. after CCITT fax encoding).
var t,u,v=0|b.length/l*d/j,w=this.getComponents(b);
// Color key masking (opacity) must be performed before decoding.
return a||this.smask||this.mask?(e.kind=g.RGBA_32BPP,e.data=new Uint8Array(c*d*4),t=1,u=!0,this.fillOpacity(e.data,c,d,v,w)):(e.kind=g.RGB_24BPP,e.data=new Uint8Array(c*d*3),t=0,u=!1),this.needsDecode&&this.decodeBuffer(w),this.colorSpace.fillRgb(e.data,i,j,c,d,v,k,w,t),u&&this.undoPreblend(e.data,c,v),e},fillGrayBuffer:function(a){var b=this.numComps;1!==b&&i("Reading gray scale from a color image: "+b);var c,d,e=this.width,f=this.height,g=this.bpc,h=e*b*g+7>>3,j=this.getImageBytes(f*h),k=this.getComponents(j);if(1!==g){this.needsDecode&&this.decodeBuffer(k),d=e*f;
// we aren't using a colorspace so we need to scale the value
var l=255/((1<<g)-1);for(c=0;d>c;++c)a[c]=l*k[c]|0}else if(d=e*f,this.needsDecode)
// invert and scale to {0, 255}
for(c=0;d>c;++c)a[c]=k[c]-1&255;else
// scale to {0, 255}
for(c=0;d>c;++c)a[c]=255&-k[c]},getImageBytes:function(a,b,c,d){return this.image.reset(),this.image.drawWidth=b||this.width,this.image.drawHeight=c||this.height,this.image.forceRGB=!!d,this.image.getBytes(a)}},d}();a.PDFImage=s}),function(a,b){b(a.pdfjsCoreObj={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreCrypto,a.pdfjsCoreParser,a.pdfjsCoreChunkedStream,a.pdfjsCoreColorSpace)}(this,function(a,b,c,d,e,f,g){var h=b.InvalidPDFException,i=b.MissingDataException,j=b.XRefParseException,k=b.assert,l=b.bytesToString,m=b.createPromiseCapability,n=b.error,o=b.info,p=b.isArray,q=b.isInt,r=b.isString,s=b.shadow,t=b.stringToPDFString,u=b.stringToUTF8String,v=b.warn,w=b.isValidUrl,x=b.Util,y=c.Ref,z=c.RefSet,A=c.RefSetCache,B=c.isName,C=c.isCmd,D=c.isDict,E=c.isRef,F=c.isStream,G=d.CipherTransformFactory,H=e.Lexer,I=e.Parser,J=f.ChunkedStream,K=g.ColorSpace,L=function(){function a(a,b,c){this.pdfManager=a,this.xref=b,this.catDict=b.getCatalogObj(),this.fontCache=new A,k(D(this.catDict),"catalog object is not a dictionary"),
// TODO refactor to move getPage() to the PDFDocument.
this.pageFactory=c,this.pagePromises=[]}return a.prototype={get metadata(){var a=this.catDict.getRaw("Metadata");if(!E(a))return s(this,"metadata",null);var b,c=this.xref.encrypt?this.xref.encrypt.encryptMetadata:!1,d=this.xref.fetch(a,!c);if(d&&D(d.dict)){var e=d.dict.get("Type"),f=d.dict.get("Subtype");if(B(e)&&B(f)&&"Metadata"===e.name&&"XML"===f.name)
// XXX: This should examine the charset the XML document defines,
// however since there are currently no real means to decode
// arbitrary charsets, let's just hope that the author of the PDF
// was reasonable enough to stick with the XML default charset,
// which is UTF-8.
try{b=u(l(d.getBytes()))}catch(g){o("Skipping invalid metadata.")}}return s(this,"metadata",b)},get toplevelPagesDict(){var a=this.catDict.get("Pages");
// shadow the prototype getter
return k(D(a),"invalid top-level pages dictionary"),s(this,"toplevelPagesDict",a)},get documentOutline(){var a=null;try{a=this.readDocumentOutline()}catch(b){if(b instanceof i)throw b;v("Unable to read document outline")}return s(this,"documentOutline",a)},readDocumentOutline:function(){var a=this.catDict.get("Outlines");if(!D(a))return null;if(a=a.getRaw("First"),!E(a))return null;var b={items:[]},c=[{obj:a,parent:b}],d=new z;d.put(a);for(var e=this.xref,f=new Uint8Array(3);c.length>0;){var g=c.shift(),h=e.fetchIfRef(g.obj);if(null!==h){k(h.has("Title"),"Invalid outline item");var i=h.get("A"),j=null,l=null;if(i){var m=i.get("D");if(m)j=m;else{var n=i.get("URI");r(n)&&w(n,!1)&&(l=n)}}else h.has("Dest")&&(j=h.getRaw("Dest"),B(j)&&(j=j.name));var o=h.get("Title"),q=h.get("F")||0,s=h.getArray("C"),u=f;
// We only need to parse the color when it's valid, and non-default.
!p(s)||3!==s.length||0===s[0]&&0===s[1]&&0===s[2]||(u=K.singletons.rgb.getRgb(s,0));var v={dest:j,url:l,title:t(o),color:u,count:h.get("Count"),bold:!!(2&q),italic:!!(1&q),items:[]};g.parent.items.push(v),a=h.getRaw("First"),E(a)&&!d.has(a)&&(c.push({obj:a,parent:v}),d.put(a)),a=h.getRaw("Next"),E(a)&&!d.has(a)&&(c.push({obj:a,parent:g.parent}),d.put(a))}}return b.items.length>0?b.items:null},get numPages(){var a=this.toplevelPagesDict.get("Count");
// shadow the prototype getter
return k(q(a),"page count in top level pages object is not an integer"),s(this,"num",a)},get destinations(){function a(a){return D(a)?a.get("D"):a}var b,c,d=this.xref,e={},f=this.catDict.get("Names");if(f&&f.has("Dests")?b=f.getRaw("Dests"):this.catDict.has("Dests")&&(c=this.catDict.get("Dests")),c&&(f=c,f.forEach(function(b,c){c&&(e[b]=a(c))})),b){var g=new O(b,d),h=g.getAll();for(var i in h)e[i]=a(h[i])}return s(this,"destinations",e)},getDestination:function(a){function b(a){return D(a)?a.get("D"):a}var c,d,e=this.xref,f=null,g=this.catDict.get("Names");if(g&&g.has("Dests")?c=g.getRaw("Dests"):this.catDict.has("Dests")&&(d=this.catDict.get("Dests")),d){// Simple destination dictionary.
var h=d.get(a);h&&(f=b(h))}if(c){var i=new O(c,e);f=b(i.get(a))}return f},get pageLabels(){var a=null;try{a=this.readPageLabels()}catch(b){if(b instanceof i)throw b;v("Unable to read page labels.")}return s(this,"pageLabels",a)},readPageLabels:function(){var a=this.catDict.getRaw("PageLabels");if(!a)return null;for(var b=new Array(this.numPages),c=null,d="",e=1,f=new P(a,this.xref),g=f.getAll(),h="",i=1,j=0,l=this.numPages;l>j;j++){if(j in g){var m=g[j];k(D(m),"The PageLabel is not a dictionary.");var n=m.get("Type");k(!n||B(n)&&"PageLabel"===n.name,"Invalid type in PageLabel dictionary.");var o=m.get("S");k(!o||B(o),"Invalid style in PageLabel dictionary."),c=o?o.name:null,d=m.get("P")||"",k(r(d),"Invalid prefix in PageLabel dictionary."),e=m.get("St")||1,k(q(e),"Invalid start in PageLabel dictionary."),i=e}switch(c){case"D":h=i;break;case"R":case"r":h=x.toRoman(i,"r"===c);break;case"A":case"a":for(var p=26,s=65,t=97,u="a"===c?t:s,v=i-1,w=String.fromCharCode(u+v%p),y=[],z=0,A=v/p|0;A>=z;z++)y.push(w);h=y.join("");break;default:k(!c,'Invalid style "'+c+'" in PageLabel dictionary.')}b[j]=d+h,h="",i++}return b},get attachments(){var a,b=this.xref,c=null,d=this.catDict.get("Names");if(d&&(a=d.getRaw("EmbeddedFiles")),a){var e=new O(a,b),f=e.getAll();for(var g in f){var h=new Q(f[g],b);c||(c=Object.create(null)),c[t(g)]=h.serializable}}return s(this,"attachments",c)},get javaScript(){function a(a){var b=a.get("S");if(B(b)&&"JavaScript"===b.name){var c=a.get("JS");if(F(c))c=l(c.getBytes());else if(!r(c))return;d.push(t(c))}}var b=this.xref,c=this.catDict.get("Names"),d=[];if(c&&c.has("JavaScript")){var e=new O(c.getRaw("JavaScript"),b),f=e.getAll();for(var g in f){
// We don't really use the JavaScript right now. This code is
// defensive so we don't cause errors on document load.
var h=f[g];D(h)&&a(h)}}
// Append OpenAction actions to javaScript array
var i=this.catDict.get("OpenAction");if(D(i,"Action")){var j=i.get("S");if(B(j)&&"Named"===j.name){
// The named Print action is not a part of the PDF 1.7 specification,
// but is supported by many PDF readers/writers (including Adobe's).
var k=i.get("N");B(k)&&"Print"===k.name&&d.push("print({});")}else a(i)}return s(this,"javaScript",d)},cleanup:function(){var a=[];return this.fontCache.forEach(function(b){a.push(b)}),Promise.all(a).then(function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b].dict;delete d.translated}this.fontCache.clear()}.bind(this))},getPage:function(a){return a in this.pagePromises||(this.pagePromises[a]=this.getPageDict(a).then(function(b){var c=b[0],d=b[1];return this.pageFactory.createPage(a,c,d,this.fontCache)}.bind(this))),this.pagePromises[a]},getPageDict:function(a){function b(){for(;d.length;){var h=d.pop();if(E(h))return void f.fetchAsync(h).then(function(f){return D(f,"Page")||D(f)&&!f.has("Kids")?void(a===e?c.resolve([f,h]):(e++,b())):(d.push(f),void b())},c.reject);
// Must be a child page dictionary.
k(D(h),"page dictionary kid reference points to wrong type of object");var i=h.get("Count");
// Skip nodes where the page can't be.
if(0===i&&(g=!0),a>=e+i)e+=i;else{var j=h.get("Kids");if(k(p(j),"page dictionary kids object is not an array"),g||i!==j.length)for(var l=j.length-1;l>=0;l--)d.push(j[l]);else d=[j[a-e]],e=a}}c.reject("Page index "+a+" not found.")}var c=m(),d=[this.catDict.getRaw("Pages")],e=0,f=this.xref,g=!1;return b(),c.promise},getPageIndex:function(a){function b(a){var b,c=0;return d.fetchAsync(a).then(function(a){return a?(b=a.getRaw("Parent"),a.getAsync("Parent")):null}).then(function(a){return a?a.getAsync("Kids"):null}).then(function(e){if(!e)return null;for(var f=[],g=!1,h=0;h<e.length;h++){var i=e[h];if(k(E(i),"kids must be a ref"),i.num===a.num){g=!0;break}f.push(d.fetchAsync(i).then(function(a){if(a.has("Count")){var b=a.get("Count");c+=b}else// page leaf node
c++}))}return g||n("kid ref not found in parents kids"),Promise.all(f).then(function(){return[c,b]})})}function c(a){return b(a).then(function(a){if(!a)return e;var b=a[0],d=a[1];return e+=b,c(d)})}
// The page tree nodes have the count of all the leaves below them. To get
// how many pages are before we just have to walk up the tree and keep
// adding the count of siblings to the left of the node.
var d=this.xref,e=0;return c(a)}},a}(),M=function(){function a(a,b){this.stream=a,this.entries=[],this.xrefstms=Object.create(null),
// prepare the XRef cache
this.cache=[],this.password=b,this.stats={streamTypes:[],fontTypes:[]}}return a.prototype={setStartXRef:function(a){
// Store the starting positions of xref tables as we process them
// so we can recover from missing data errors
this.startXRefQueue=[a]},parse:function(a){var b;a?(v("Indexing all PDF objects"),b=this.indexObjects()):b=this.readXRef(),b.assignXref(this),this.trailer=b;var c=b.get("Encrypt");if(c){var d=b.get("ID"),e=d&&d.length?d[0]:"";this.encrypt=new G(c,e,this.password)}
// get the root dictionary (catalog) object
(this.root=b.get("Root"))||n("Invalid root reference")},processXRefTable:function(a){"tableState"in this||(
// Stores state of the table as we process it so we can resume
// from middle of table in case of missing data error
this.tableState={entryNum:0,streamPos:a.lexer.stream.pos,parserBuf1:a.buf1,parserBuf2:a.buf2});var b=this.readXRefTable(a);
// Sanity check
C(b,"trailer")||n("Invalid XRef table: could not find trailer dictionary");
// Read trailer dictionary, e.g.
// trailer
//    << /Size 22
//      /Root 20R
//      /Info 10R
//      /ID [ <81b14aafa313db63dbd6f981e49f94f4> ]
//    >>
// The parser goes through the entire stream << ... >> and provides
// a getter interface for the key-value table
var c=a.getObj();
// The pdflib PDF generator can generate a nested trailer dictionary
return!D(c)&&c.dict&&(c=c.dict),D(c)||n("Invalid XRef table: could not parse trailer dictionary"),delete this.tableState,c},readXRefTable:function(a){
// Example of cross-reference table:
// xref
// 0 1                    <-- subsection header (first obj #, obj count)
// 0000000000 65535 f     <-- actual object (offset, generation #, f/n)
// 23 2                   <-- subsection header ... and so on ...
// 0000025518 00002 n
// 0000025635 00000 n
// trailer
// ...
var b=a.lexer.stream,c=this.tableState;b.pos=c.streamPos,a.buf1=c.parserBuf1,a.buf2=c.parserBuf2;for(
// Outer loop is over subsection headers
var d;;){if(!("firstEntryNum"in c&&"entryCount"in c)){if(C(d=a.getObj(),"trailer"))break;c.firstEntryNum=d,c.entryCount=a.getObj()}var e=c.firstEntryNum,f=c.entryCount;q(e)&&q(f)||n("Invalid XRef table: wrong types in subsection header");
// Inner loop is over objects themselves
for(var g=c.entryNum;f>g;g++){c.streamPos=b.pos,c.entryNum=g,c.parserBuf1=a.buf1,c.parserBuf2=a.buf2;var h={};h.offset=a.getObj(),h.gen=a.getObj();var i=a.getObj();C(i,"f")?h.free=!0:C(i,"n")&&(h.uncompressed=!0),
// Validate entry obj
q(h.offset)&&q(h.gen)&&(h.free||h.uncompressed)||n("Invalid entry in XRef subsection: "+e+", "+f),
// The first xref table entry, i.e. obj 0, should be free. Attempting
// to adjust an incorrect first obj # (fixes issue 3248 and 7229).
0===g&&h.free&&1===e&&(e=0),this.entries[g+e]||(this.entries[g+e]=h)}c.entryNum=0,c.streamPos=b.pos,c.parserBuf1=a.buf1,c.parserBuf2=a.buf2,delete c.firstEntryNum,delete c.entryCount}
// Sanity check: as per spec, first object must be free
return this.entries[0]&&!this.entries[0].free&&n("Invalid XRef table: unexpected first object"),d},processXRefStream:function(a){if(!("streamState"in this)){
// Stores state of the stream as we process it so we can resume
// from middle of stream in case of missing data error
var b=a.dict,c=b.get("W"),d=b.get("Index");d||(d=[0,b.get("Size")]),this.streamState={entryRanges:d,byteWidths:c,entryNum:0,streamPos:a.pos}}return this.readXRefStream(a),delete this.streamState,a.dict},readXRefStream:function(a){var b,c,d=this.streamState;a.pos=d.streamPos;for(var e=d.byteWidths,f=e[0],g=e[1],h=e[2],i=d.entryRanges;i.length>0;){var j=i[0],k=i[1];for(q(j)&&q(k)||n("Invalid XRef range fields: "+j+", "+k),q(f)&&q(g)&&q(h)||n("Invalid XRef entry fields length: "+j+", "+k),b=d.entryNum;k>b;++b){d.entryNum=b,d.streamPos=a.pos;var l=0,m=0,o=0;for(c=0;f>c;++c)l=l<<8|a.getByte();for(
// if type field is absent, its default value is 1
0===f&&(l=1),c=0;g>c;++c)m=m<<8|a.getByte();for(c=0;h>c;++c)o=o<<8|a.getByte();var p={};switch(p.offset=m,p.gen=o,l){case 0:p.free=!0;break;case 1:p.uncompressed=!0;break;case 2:break;default:n("Invalid XRef entry type: "+l)}this.entries[j+b]||(this.entries[j+b]=p)}d.entryNum=0,d.streamPos=a.pos,i.splice(0,2)}},indexObjects:function(){function a(a,b){for(var c="",f=a[b];f!==d&&f!==e&&f!==i&&!(++b>=a.length);)c+=String.fromCharCode(f),f=a[b];return c}function b(a,b,c){
// finding byte sequence
for(var d=c.length,e=a.length,f=0;e>b;){for(var g=0;d>g&&a[b+g]===c[g];)++g;if(g>=d)break;b++,f++}return f}
// Simple scan through the PDF content to find objects,
// trailers and XRef streams.
var c=9,d=10,e=13,f=32,g=37,i=60,j=/^(\d+)\s+(\d+)\s+obj\b/,k=new Uint8Array([116,114,97,105,108,101,114]),l=new Uint8Array([115,116,97,114,116,120,114,101,102]),m=new Uint8Array([101,110,100,111,98,106]),n=new Uint8Array([47,88,82,101,102]);
// Clear out any existing entries, since they may be bogus.
this.entries.length=0;var o=this.stream;o.pos=0;for(var p=o.getBytes(),q=o.start,r=p.length,s=[],t=[];r>q;){var u=p[q];if(u!==c&&u!==d&&u!==e&&u!==f)if(u!==g){var v,w=a(p,q);if(0!==w.indexOf("xref")||4!==w.length&&!/\s/.test(w[4]))if(v=j.exec(w)){"undefined"==typeof this.entries[v[1]]&&(this.entries[v[1]]={offset:q-o.start,gen:0|v[2],uncompressed:!0});var x=b(p,q,m)+7,y=p.subarray(q,q+x),z=b(y,0,n);x>z&&y[z+5]<64&&(t.push(q-o.start),this.xrefstms[q-o.start]=1),q+=x}else 0!==w.indexOf("trailer")||7!==w.length&&!/\s/.test(w[7])?q+=w.length+1:(s.push(q),q+=b(p,q,l));else q+=b(p,q,k),s.push(q),q+=b(p,q,l)}else// %-comment
do{if(++q,q>=r)break;u=p[q]}while(u!==d&&u!==e);else++q}
// reading XRef streams
var A,B;for(A=0,B=t.length;B>A;++A)this.startXRefQueue.push(t[A]),this.readXRef(/* recoveryMode */!0);
// finding main trailer
var E;for(A=0,B=s.length;B>A;++A){o.pos=s[A];var F=new I(new H(o),!0,this),G=F.getObj();if(C(G,"trailer")&&D(E=F.getObj())&&E.has("ID"))return E}
// no tailer with 'ID', taking last one (if exists)
if(E)return E;
// nothing helps
// calling error() would reject worker with an UnknownErrorException.
throw new h("Invalid PDF structure")},readXRef:function(a){var b=this.stream;try{for(;this.startXRefQueue.length;){var c=this.startXRefQueue[0];b.pos=c+b.start;var d,e=new I(new H(b),!0,this),f=e.getObj();
// Get dictionary
if(C(f,"xref")){if(d=this.processXRefTable(e),this.topDict||(this.topDict=d),f=d.get("XRefStm"),q(f)){var g=f;
// ignore previously loaded xref streams
// (possible infinite recursion)
g in this.xrefstms||(this.xrefstms[g]=1,this.startXRefQueue.push(g))}}else q(f)?(
// Parse in-stream XRef
q(e.getObj())&&C(e.getObj(),"obj")&&F(f=e.getObj())||n("Invalid XRef stream"),d=this.processXRefStream(f),this.topDict||(this.topDict=d),d||n("Failed to read XRef stream")):n("Invalid XRef stream header");
// Recursively get previous dictionary, if any
f=d.get("Prev"),q(f)?this.startXRefQueue.push(f):E(f)&&
// The spec says Prev must not be a reference, i.e. "/Prev NNN"
// This is a fallback for non-compliant PDFs, i.e. "/Prev NNN 0 R"
this.startXRefQueue.push(f.num),this.startXRefQueue.shift()}return this.topDict}catch(h){if(h instanceof i)throw h;o("(while reading XRef): "+h)}if(!a)throw new j},getEntry:function(a){var b=this.entries[a];return b&&!b.free&&b.offset?b:null},fetchIfRef:function(a){return E(a)?this.fetch(a):a},fetch:function(a,b){k(E(a),"ref object is not a reference");var c=a.num;if(c in this.cache){var d=this.cache[c];return d}var e=this.getEntry(c);
// the referenced entry can be free
// the referenced entry can be free
return null===e?this.cache[c]=null:(e=e.uncompressed?this.fetchUncompressed(a,e,b):this.fetchCompressed(e,b),D(e)?e.objId=a.toString():F(e)&&(e.dict.objId=a.toString()),e)},fetchUncompressed:function(a,b,c){var d=a.gen,e=a.num;b.gen!==d&&n("inconsistent generation in XRef");var f=this.stream.makeSubStream(b.offset+this.stream.start),g=new I(new H(f),!0,this),h=g.getObj(),i=g.getObj(),j=g.getObj();if(q(h)&&parseInt(h,10)===e&&q(i)&&parseInt(i,10)===d&&C(j)||n("bad XRef entry"),!C(j,"obj")){
// some bad PDFs use "obj1234" and really mean 1234
if(0===j.cmd.indexOf("obj")&&(e=parseInt(j.cmd.substring(3),10),!isNaN(e)))return e;n("bad XRef entry")}return b=this.encrypt&&!c?g.getObj(this.encrypt.createCipherTransform(e,d)):g.getObj(),F(b)||(this.cache[e]=b),b},fetchCompressed:function(a,b){var c=a.offset,d=this.fetch(new y(c,0));F(d)||n("bad ObjStm stream");var e=d.dict.get("First"),f=d.dict.get("N");q(e)&&q(f)||n("invalid first and n parameters for ObjStm stream");var g=new I(new H(d),!1,this);g.allowStreams=!0;var h,i,j=[],k=[];
// read the object numbers to populate cache
for(h=0;f>h;++h){i=g.getObj(),q(i)||n("invalid object number in the ObjStm stream: "+i),k.push(i);var l=g.getObj();q(l)||n("invalid object offset in the ObjStm stream: "+l)}
// read stream objects for cache
for(h=0;f>h;++h){j.push(g.getObj()),
// The ObjStm should not contain 'endobj'. If it's present, skip over it
// to support corrupt PDFs (fixes issue 5241, bug 898610, bug 1037816).
C(g.buf1,"endobj")&&g.shift(),i=k[h];var m=this.entries[i];m&&m.offset===c&&m.gen===h&&(this.cache[i]=j[h])}return a=j[a.gen],void 0===a&&n("bad XRef entry for compressed object"),a},fetchIfRefAsync:function(a){return E(a)?this.fetchAsync(a):Promise.resolve(a)},fetchAsync:function(a,b){var c=this.stream.manager,d=this;return new Promise(function e(f,g){try{f(d.fetch(a,b))}catch(h){if(h instanceof i)return void c.requestRange(h.begin,h.end).then(function(){e(f,g)},g);g(h)}})},getCatalogObj:function(){return this.root}},a}(),N=function(){function a(a,b){throw new Error("Cannot initialize NameOrNumberTree.")}return a.prototype={getAll:function(){var a=Object.create(null);if(!this.root)return a;var b=this.xref,c=new z;c.put(this.root);for(var d=[this.root];d.length>0;){var e,f,g=b.fetchIfRef(d.shift());if(D(g))if(g.has("Kids")){var h=g.get("Kids");for(e=0,f=h.length;f>e;e++){var i=h[e];k(!c.has(i),'Duplicate entry in "'+this._type+'" tree.'),d.push(i),c.put(i)}}else{var j=g.get(this._type);if(p(j))for(e=0,f=j.length;f>e;e+=2)a[b.fetchIfRef(j[e])]=b.fetchIfRef(j[e+1])}}return a},get:function(a){if(!this.root)return null;
// Perform a binary search to quickly find the entry that
// contains the key we are looking for.
for(var b,c,d,e=this.xref,f=e.fetchIfRef(this.root),g=0,h=10;f.has("Kids");){if(++g>h)return v('Search depth limit reached for "'+this._type+'" tree.'),null;var i=f.get("Kids");if(!p(i))return null;for(b=0,c=i.length-1;c>=b;){d=b+c>>1;var j=e.fetchIfRef(i[d]),k=j.get("Limits");if(a<e.fetchIfRef(k[0]))c=d-1;else{if(!(a>e.fetchIfRef(k[1]))){f=e.fetchIfRef(i[d]);break}b=d+1}}if(b>c)return null}
// If we get here, then we have found the right entry. Now go through the
// entries in the dictionary until we find the key we're looking for.
var l=f.get(this._type);if(p(l))for(
// Perform a binary search to reduce the lookup time.
b=0,c=l.length-2;c>=b;){
// Check only even indices (0, 2, 4, ...) because the
// odd indices contain the actual data.
d=b+c&-2;var m=e.fetchIfRef(l[d]);if(m>a)c=d-2;else{if(!(a>m))return e.fetchIfRef(l[d+1]);b=d+2}}return null}},a}(),O=function(){function a(a,b){this.root=a,this.xref=b,this._type="Names"}return x.inherit(a,N,{}),a}(),P=function(){function a(a,b){this.root=a,this.xref=b,this._type="Nums"}return x.inherit(a,N,{}),a}(),Q=function(){function a(a,b){a&&D(a)&&(this.xref=b,this.root=a,a.has("FS")&&(this.fs=a.get("FS")),this.description=a.has("Desc")?t(a.get("Desc")):"",a.has("RF")&&v("Related file specifications are not supported"),this.contentAvailable=!0,a.has("EF")||(this.contentAvailable=!1,v("Non-embedded file specifications are not supported")))}function b(a){
// Look for the filename in this order:
// UF, F, Unix, Mac, DOS
// Look for the filename in this order:
// UF, F, Unix, Mac, DOS
return a.has("UF")?a.get("UF"):a.has("F")?a.get("F"):a.has("Unix")?a.get("Unix"):a.has("Mac")?a.get("Mac"):a.has("DOS")?a.get("DOS"):null}return a.prototype={get filename(){if(!this._filename&&this.root){var a=b(this.root)||"unnamed";this._filename=t(a).replace(/\\\\/g,"\\").replace(/\\\//g,"/").replace(/\\/g,"/")}return this._filename},get content(){if(!this.contentAvailable)return null;!this.contentRef&&this.root&&(this.contentRef=b(this.root.get("EF")));var a=null;if(this.contentRef){var c=this.xref,d=c.fetchIfRef(this.contentRef);d&&F(d)?a=d.getBytes():v("Embedded file specification points to non-existing/invalid content")}else v("Embedded file specification does not have a content");return a},get serializable(){return{filename:this.filename,content:this.content}}},a}(),R=function(){function a(a){return E(a)||D(a)||p(a)||F(a)}function b(b,c){var d;if(D(b)||F(b)){var e;e=D(b)?b.map:b.dict.map;for(var f in e)d=e[f],a(d)&&c.push(d)}else if(p(b))for(var g=0,h=b.length;h>g;g++)d=b[g],a(d)&&c.push(d)}function c(a,b,c){this.obj=a,this.keys=b,this.xref=c,this.refSet=null,this.capability=null}return c.prototype={load:function(){var a=this.keys;
// Don't walk the graph if all the data is already loaded.
if(this.capability=m(),!(this.xref.stream instanceof J)||0===this.xref.stream.getMissingChunks().length)return this.capability.resolve(),this.capability.promise;this.refSet=new z;for(var b=[],c=0;c<a.length;c++)b.push(this.obj[a[c]]);return this._walk(b),this.capability.promise},_walk:function(a){
// DFS walk of the object graph.
for(var c=[],d=[];a.length;){var e=a.pop();
// Only references or chunked streams can cause missing data exceptions.
if(E(e)){
// Skip nodes that have already been visited.
if(this.refSet.has(e))continue;try{var f=e;this.refSet.put(f),e=this.xref.fetch(e)}catch(g){if(!(g instanceof i))throw g;c.push(e),d.push({begin:g.begin,end:g.end})}}if(e&&e.getBaseStreams){for(var h=e.getBaseStreams(),j=!1,k=0;k<h.length;k++){var l=h[k];l.getMissingChunks&&l.getMissingChunks().length&&(j=!0,d.push({begin:l.start,end:l.end}))}j&&c.push(e)}b(e,a)}
// Everything is loaded.
return d.length?void this.xref.stream.manager.requestRanges(d).then(function(){a=c;for(var b=0;b<c.length;b++){var d=c[b];
// Remove any reference nodes from the currrent refset so they
// aren't skipped when we revist them.
E(d)&&this.refSet.remove(d)}this._walk(a)}.bind(this),this.capability.reject):(this.refSet=null,void this.capability.resolve())}},c}();a.Catalog=L,a.ObjectLoader=R,a.XRef=M,a.FileSpec=Q}),function(a,b){b(a.pdfjsCorePattern={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreFunction,a.pdfjsCoreColorSpace)}(this,function(a,b,c,d,e){function f(a,b,c){var d=b.getArray("Matrix"),e=b.getArray("BBox"),f=b.get("XStep"),g=b.get("YStep"),h=b.get("PaintType"),i=b.get("TilingType");return["TilingPattern",c,a,d,e,f,g,h,i]}var g=b.UNSUPPORTED_FEATURES,h=b.MissingDataException,i=b.Util,j=b.assert,k=b.error,l=b.info,m=b.warn,n=c.isStream,o=d.PDFFunction,p=e.ColorSpace,q={FUNCTION_BASED:1,AXIAL:2,RADIAL:3,FREE_FORM_MESH:4,LATTICE_FORM_MESH:5,COONS_PATCH_MESH:6,TENSOR_PATCH_MESH:7},r=function(){
// Constructor should define this.getPattern
function a(){k("should not call Pattern constructor")}return a.prototype={
// Input: current Canvas context
// Output: the appropriate fillStyle or strokeStyle
getPattern:function(a){k("Should not call Pattern.getStyle: "+a)}},a.parseShading=function(a,b,c,d,e){var f=n(a)?a.dict:a,i=f.get("ShadingType");try{switch(i){case q.AXIAL:case q.RADIAL:
// Both radial and axial shadings are handled by RadialAxial shading.
return new s.RadialAxial(f,b,c,d);case q.FREE_FORM_MESH:case q.LATTICE_FORM_MESH:case q.COONS_PATCH_MESH:case q.TENSOR_PATCH_MESH:return new s.Mesh(a,b,c,d);default:throw new Error("Unsupported ShadingType: "+i)}}catch(j){if(j instanceof h)throw j;return e.send("UnsupportedFeature",{featureId:g.shadingPattern}),m(j),new s.Dummy}},a}(),s={};
// A small number to offset the first/last color stops so we can insert ones to
// support extend. Number.MIN_VALUE is too small and breaks the extend.
s.SMALL_NUMBER=1e-6,
// Radial and axial shading have very similar implementations
// If needed, the implementations can be broken into two classes
s.RadialAxial=function(){function a(a,b,c,d){this.matrix=b,this.coordsArr=a.getArray("Coords"),this.shadingType=a.get("ShadingType"),this.type="Pattern";var e=a.get("ColorSpace","CS");e=p.parse(e,c,d),this.cs=e;var f=0,g=1;if(a.has("Domain")){var h=a.getArray("Domain");f=h[0],g=h[1]}var j=!1,k=!1;if(a.has("Extend")){var n=a.getArray("Extend");j=n[0],k=n[1]}if(!(this.shadingType!==q.RADIAL||j&&k)){
// Radial gradient only currently works if either circle is fully within
// the other circle.
var r=this.coordsArr[0],t=this.coordsArr[1],u=this.coordsArr[2],v=this.coordsArr[3],w=this.coordsArr[4],x=this.coordsArr[5],y=Math.sqrt((r-v)*(r-v)+(t-w)*(t-w));x+y>=u&&u+y>=x&&m("Unsupported radial gradient.")}this.extendStart=j,this.extendEnd=k;var z=a.get("Function"),A=o.parseArray(c,z),B=g-f,C=B/10,D=this.colorStops=[];
// Protect against bad domains so we don't end up in an infinte loop below.
if(f>=g||0>=C)
// Acrobat doesn't seem to handle these cases so we'll ignore for
// now.
return void l("Bad shading domain.");for(var E,F=new Float32Array(e.numComps),G=new Float32Array(1),H=f;g>=H;H+=C){G[0]=H,A(G,0,F,0),E=e.getRgb(F,0);var I=i.makeCssRgb(E[0],E[1],E[2]);D.push([(H-f)/B,I])}var J="transparent";a.has("Background")&&(E=e.getRgb(a.get("Background"),0),J=i.makeCssRgb(E[0],E[1],E[2])),j||(
// Insert a color stop at the front and offset the first real color stop
// so it doesn't conflict with the one we insert.
D.unshift([0,J]),D[1][0]+=s.SMALL_NUMBER),k||(
// Same idea as above in extendStart but for the end.
D[D.length-1][0]-=s.SMALL_NUMBER,D.push([1,J])),this.colorStops=D}return a.prototype={getIR:function(){var a,b,c,d,e,f=this.coordsArr,g=this.shadingType;g===q.AXIAL?(b=[f[0],f[1]],c=[f[2],f[3]],d=null,e=null,a="axial"):g===q.RADIAL?(b=[f[0],f[1]],c=[f[3],f[4]],d=f[2],e=f[5],a="radial"):k("getPattern type unknown: "+g);var h=this.matrix;if(h&&(b=i.applyTransform(b,h),c=i.applyTransform(c,h),g===q.RADIAL)){var j=i.singularValueDecompose2dScale(h);d*=j[0],e*=j[1]}return["RadialAxial",a,this.colorStops,b,c,d,e]}},a}(),
// All mesh shading. For now, they will be presented as set of the triangles
// to be drawn on the canvas and rgb color for each vertex.
s.Mesh=function(){function a(a,b){this.stream=a,this.context=b,this.buffer=0,this.bufferLength=0;var c=b.numComps;this.tmpCompsBuf=new Float32Array(c);var d=b.colorSpace.numComps;this.tmpCsCompsBuf=b.colorFn?new Float32Array(d):this.tmpCompsBuf}function b(a,b){// assuming we have all data to start a new triangle
for(var c=a.coords,d=a.colors,e=[],f=[],g=0;b.hasData;){var h=b.readFlag(),i=b.readCoordinate(),k=b.readComponents();if(0===g){switch(// ignoring flags if we started a triangle
j(h>=0&&2>=h,"Unknown type4 flag"),h){case 0:g=3;break;case 1:f.push(f[f.length-2],f[f.length-1]),g=1;break;case 2:f.push(f[f.length-3],f[f.length-1]),g=1}e.push(h)}f.push(c.length),c.push(i),d.push(k),g--,b.align()}a.figures.push({type:"triangles",coords:new Int32Array(f),colors:new Int32Array(f)})}function c(a,b,c){// not maintaining cs since that will match ps
for(var d=a.coords,e=a.colors,f=[];b.hasData;){var g=b.readCoordinate(),h=b.readComponents();f.push(d.length),d.push(g),e.push(h)}a.figures.push({type:"lattice",coords:new Int32Array(f),colors:new Int32Array(f),verticesPerRow:c})}function d(a,b){var c=a.figures[b];j("patch"===c.type,"Unexpected patch mesh figure");var d=a.coords,e=a.colors,f=c.coords,g=c.colors,h=Math.min(d[f[0]][0],d[f[3]][0],d[f[12]][0],d[f[15]][0]),i=Math.min(d[f[0]][1],d[f[3]][1],d[f[12]][1],d[f[15]][1]),k=Math.max(d[f[0]][0],d[f[3]][0],d[f[12]][0],d[f[15]][0]),n=Math.max(d[f[0]][1],d[f[3]][1],d[f[12]][1],d[f[15]][1]),o=Math.ceil((k-h)*r/(a.bounds[2]-a.bounds[0]));o=Math.max(l,Math.min(m,o));var p=Math.ceil((n-i)*r/(a.bounds[3]-a.bounds[1]));p=Math.max(l,Math.min(m,p));for(var q=o+1,t=new Int32Array((p+1)*q),u=new Int32Array((p+1)*q),v=0,w=new Uint8Array(3),x=new Uint8Array(3),y=e[g[0]],z=e[g[1]],A=e[g[2]],B=e[g[3]],C=s(p),D=s(o),E=0;p>=E;E++){w[0]=(y[0]*(p-E)+A[0]*E)/p|0,w[1]=(y[1]*(p-E)+A[1]*E)/p|0,w[2]=(y[2]*(p-E)+A[2]*E)/p|0,x[0]=(z[0]*(p-E)+B[0]*E)/p|0,x[1]=(z[1]*(p-E)+B[1]*E)/p|0,x[2]=(z[2]*(p-E)+B[2]*E)/p|0;for(var F=0;o>=F;F++,v++)if(0!==E&&E!==p||0!==F&&F!==o){for(var G=0,H=0,I=0,J=0;3>=J;J++)for(var K=0;3>=K;K++,I++){var L=C[E][J]*D[F][K];G+=d[f[I]][0]*L,H+=d[f[I]][1]*L}t[v]=d.length,d.push([G,H]),u[v]=e.length;var M=new Uint8Array(3);M[0]=(w[0]*(o-F)+x[0]*F)/o|0,M[1]=(w[1]*(o-F)+x[1]*F)/o|0,M[2]=(w[2]*(o-F)+x[2]*F)/o|0,e.push(M)}}t[0]=f[0],u[0]=g[0],t[o]=f[3],u[o]=g[1],t[q*p]=f[12],u[q*p]=g[2],t[q*p+o]=f[15],u[q*p+o]=g[3],a.figures[b]={type:"lattice",coords:t,colors:u,verticesPerRow:q}}function e(a,b){// c00, c30, c03, c33
for(
// A special case of Type 7. The p11, p12, p21, p22 automatically filled
var c=a.coords,d=a.colors,e=new Int32Array(16),f=new Int32Array(4);b.hasData;){var g=b.readFlag();j(g>=0&&3>=g,"Unknown type6 flag");var h,i,k=c.length;for(h=0,i=0!==g?8:12;i>h;h++)c.push(b.readCoordinate());var l=d.length;for(h=0,i=0!==g?2:4;i>h;h++)d.push(b.readComponents());var m,n,o,p;switch(g){case 0:e[12]=k+3,e[13]=k+4,e[14]=k+5,e[15]=k+6,e[8]=k+2,/* values for 5, 6, 9, 10 are    */e[11]=k+7,e[4]=k+1,/* calculated below              */e[7]=k+8,e[0]=k,e[1]=k+11,e[2]=k+10,e[3]=k+9,f[2]=l+1,f[3]=l+2,f[0]=l,f[1]=l+3;break;case 1:m=e[12],n=e[13],o=e[14],p=e[15],e[12]=p,e[13]=k+0,e[14]=k+1,e[15]=k+2,e[8]=o,/* values for 5, 6, 9, 10 are    */e[11]=k+3,e[4]=n,/* calculated below              */e[7]=k+4,e[0]=m,e[1]=k+7,e[2]=k+6,e[3]=k+5,m=f[2],n=f[3],f[2]=n,f[3]=l,f[0]=m,f[1]=l+1;break;case 2:m=e[15],n=e[11],e[12]=e[3],e[13]=k+0,e[14]=k+1,e[15]=k+2,e[8]=e[7],/* values for 5, 6, 9, 10 are    */e[11]=k+3,e[4]=n,/* calculated below              */e[7]=k+4,e[0]=m,e[1]=k+7,e[2]=k+6,e[3]=k+5,m=f[3],f[2]=f[1],f[3]=l,f[0]=m,f[1]=l+1;break;case 3:e[12]=e[0],e[13]=k+0,e[14]=k+1,e[15]=k+2,e[8]=e[1],/* values for 5, 6, 9, 10 are    */e[11]=k+3,e[4]=e[2],/* calculated below              */e[7]=k+4,e[0]=e[3],e[1]=k+7,e[2]=k+6,e[3]=k+5,f[2]=f[0],f[3]=l,f[0]=f[1],f[1]=l+1}
// set p11, p12, p21, p22
e[5]=c.length,c.push([(-4*c[e[0]][0]-c[e[15]][0]+6*(c[e[4]][0]+c[e[1]][0])-2*(c[e[12]][0]+c[e[3]][0])+3*(c[e[13]][0]+c[e[7]][0]))/9,(-4*c[e[0]][1]-c[e[15]][1]+6*(c[e[4]][1]+c[e[1]][1])-2*(c[e[12]][1]+c[e[3]][1])+3*(c[e[13]][1]+c[e[7]][1]))/9]),e[6]=c.length,c.push([(-4*c[e[3]][0]-c[e[12]][0]+6*(c[e[2]][0]+c[e[7]][0])-2*(c[e[0]][0]+c[e[15]][0])+3*(c[e[4]][0]+c[e[14]][0]))/9,(-4*c[e[3]][1]-c[e[12]][1]+6*(c[e[2]][1]+c[e[7]][1])-2*(c[e[0]][1]+c[e[15]][1])+3*(c[e[4]][1]+c[e[14]][1]))/9]),e[9]=c.length,c.push([(-4*c[e[12]][0]-c[e[3]][0]+6*(c[e[8]][0]+c[e[13]][0])-2*(c[e[0]][0]+c[e[15]][0])+3*(c[e[11]][0]+c[e[1]][0]))/9,(-4*c[e[12]][1]-c[e[3]][1]+6*(c[e[8]][1]+c[e[13]][1])-2*(c[e[0]][1]+c[e[15]][1])+3*(c[e[11]][1]+c[e[1]][1]))/9]),e[10]=c.length,c.push([(-4*c[e[15]][0]-c[e[0]][0]+6*(c[e[11]][0]+c[e[14]][0])-2*(c[e[12]][0]+c[e[3]][0])+3*(c[e[2]][0]+c[e[8]][0]))/9,(-4*c[e[15]][1]-c[e[0]][1]+6*(c[e[11]][1]+c[e[14]][1])-2*(c[e[12]][1]+c[e[3]][1])+3*(c[e[2]][1]+c[e[8]][1]))/9]),a.figures.push({type:"patch",coords:new Int32Array(e),// making copies of ps and cs
colors:new Int32Array(f)})}}function f(a,b){// c00, c30, c03, c33
for(var c=a.coords,d=a.colors,e=new Int32Array(16),f=new Int32Array(4);b.hasData;){var g=b.readFlag();j(g>=0&&3>=g,"Unknown type7 flag");var h,i,k=c.length;for(h=0,i=0!==g?12:16;i>h;h++)c.push(b.readCoordinate());var l=d.length;for(h=0,i=0!==g?2:4;i>h;h++)d.push(b.readComponents());var m,n,o,p;switch(g){case 0:e[12]=k+3,e[13]=k+4,e[14]=k+5,e[15]=k+6,e[8]=k+2,e[9]=k+13,e[10]=k+14,e[11]=k+7,e[4]=k+1,e[5]=k+12,e[6]=k+15,e[7]=k+8,e[0]=k,e[1]=k+11,e[2]=k+10,e[3]=k+9,f[2]=l+1,f[3]=l+2,f[0]=l,f[1]=l+3;break;case 1:m=e[12],n=e[13],o=e[14],p=e[15],e[12]=p,e[13]=k+0,e[14]=k+1,e[15]=k+2,e[8]=o,e[9]=k+9,e[10]=k+10,e[11]=k+3,e[4]=n,e[5]=k+8,e[6]=k+11,e[7]=k+4,e[0]=m,e[1]=k+7,e[2]=k+6,e[3]=k+5,m=f[2],n=f[3],f[2]=n,f[3]=l,f[0]=m,f[1]=l+1;break;case 2:m=e[15],n=e[11],e[12]=e[3],e[13]=k+0,e[14]=k+1,e[15]=k+2,e[8]=e[7],e[9]=k+9,e[10]=k+10,e[11]=k+3,e[4]=n,e[5]=k+8,e[6]=k+11,e[7]=k+4,e[0]=m,e[1]=k+7,e[2]=k+6,e[3]=k+5,m=f[3],f[2]=f[1],f[3]=l,f[0]=m,f[1]=l+1;break;case 3:e[12]=e[0],e[13]=k+0,e[14]=k+1,e[15]=k+2,e[8]=e[1],e[9]=k+9,e[10]=k+10,e[11]=k+3,e[4]=e[2],e[5]=k+8,e[6]=k+11,e[7]=k+4,e[0]=e[3],e[1]=k+7,e[2]=k+6,e[3]=k+5,f[2]=f[0],f[3]=l,f[0]=f[1],f[1]=l+1}a.figures.push({type:"patch",coords:new Int32Array(e),// making copies of ps and cs
colors:new Int32Array(f)})}}function g(a){for(var b=a.coords[0][0],c=a.coords[0][1],d=b,e=c,f=1,g=a.coords.length;g>f;f++){var h=a.coords[f][0],i=a.coords[f][1];b=b>h?h:b,c=c>i?i:c,d=h>d?h:d,e=i>e?i:e}a.bounds=[b,c,d,e]}function h(a){var b,c,d,e,f=a.coords,g=new Float32Array(2*f.length);for(b=0,d=0,c=f.length;c>b;b++){var h=f[b];g[d++]=h[0],g[d++]=h[1]}a.coords=g;var i=a.colors,j=new Uint8Array(3*i.length);for(b=0,d=0,c=i.length;c>b;b++){var k=i[b];j[d++]=k[0],j[d++]=k[1],j[d++]=k[2]}a.colors=j;var l=a.figures;for(b=0,c=l.length;c>b;b++){var m=l[b],n=m.coords,o=m.colors;for(d=0,e=n.length;e>d;d++)n[d]*=2,o[d]*=3}}function i(i,l,m,r){j(n(i),"Mesh data is not a stream");var s=i.dict;this.matrix=l,this.shadingType=s.get("ShadingType"),this.type="Pattern",this.bbox=s.getArray("BBox");var t=s.get("ColorSpace","CS");t=p.parse(t,m,r),this.cs=t,this.background=s.has("Background")?t.getRgb(s.get("Background"),0):null;var u=s.get("Function"),v=u?o.parseArray(m,u):null;this.coords=[],this.colors=[],this.figures=[];var w={bitsPerCoordinate:s.get("BitsPerCoordinate"),bitsPerComponent:s.get("BitsPerComponent"),bitsPerFlag:s.get("BitsPerFlag"),decode:s.getArray("Decode"),colorFn:v,colorSpace:t,numComps:v?1:t.numComps},x=new a(i,w),y=!1;switch(this.shadingType){case q.FREE_FORM_MESH:b(this,x);break;case q.LATTICE_FORM_MESH:var z=0|s.get("VerticesPerRow");j(z>=2,"Invalid VerticesPerRow"),c(this,x,z);break;case q.COONS_PATCH_MESH:e(this,x),y=!0;break;case q.TENSOR_PATCH_MESH:f(this,x),y=!0;break;default:k("Unsupported mesh type.")}if(y){
// dirty bounds calculation for determining, how dense shall be triangles
g(this);for(var A=0,B=this.figures.length;B>A;A++)d(this,A)}
// calculate bounds
g(this),h(this)}a.prototype={get hasData(){if(this.stream.end)return this.stream.pos<this.stream.end;if(this.bufferLength>0)return!0;var a=this.stream.getByte();return 0>a?!1:(this.buffer=a,this.bufferLength=8,!0)},readBits:function(a){var b=this.buffer,c=this.bufferLength;if(32===a){if(0===c)return(this.stream.getByte()<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte())>>>0;b=b<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte();var d=this.stream.getByte();return this.buffer=d&(1<<c)-1,(b<<8-c|(255&d)>>c)>>>0}if(8===a&&0===c)return this.stream.getByte();for(;a>c;)b=b<<8|this.stream.getByte(),c+=8;return c-=a,this.bufferLength=c,this.buffer=b&(1<<c)-1,b>>c},align:function(){this.buffer=0,this.bufferLength=0},readFlag:function(){return this.readBits(this.context.bitsPerFlag)},readCoordinate:function(){var a=this.context.bitsPerCoordinate,b=this.readBits(a),c=this.readBits(a),d=this.context.decode,e=32>a?1/((1<<a)-1):2.3283064365386963e-10;// 2 ^ -32
return[b*e*(d[1]-d[0])+d[0],c*e*(d[3]-d[2])+d[2]]},readComponents:function(){for(var a=this.context.numComps,b=this.context.bitsPerComponent,c=32>b?1/((1<<b)-1):2.3283064365386963e-10,d=this.context.decode,e=this.tmpCompsBuf,f=0,g=4;a>f;f++,g+=2){var h=this.readBits(b);e[f]=h*c*(d[g+1]-d[g])+d[g]}var i=this.tmpCsCompsBuf;return this.context.colorFn&&this.context.colorFn(e,0,i,0),this.context.colorSpace.getRgb(i,0)}};var l=3,m=20,r=20,s=function(){function a(a){for(var b=[],c=0;a>=c;c++){var d=c/a,e=1-d;b.push(new Float32Array([e*e*e,3*d*e*e,3*d*d*e,d*d*d]))}return b}var b=[];return function(c){return b[c]||(b[c]=a(c)),b[c]}}();return i.prototype={getIR:function(){return["Mesh",this.shadingType,this.coords,this.colors,this.figures,this.bounds,this.matrix,this.bbox,this.background]}},i}(),s.Dummy=function(){function a(){this.type="Pattern"}return a.prototype={getIR:function(){return["Dummy"]}},a}(),a.Pattern=r,a.getTilingPatternIR=f}),function(a,b){b(a.pdfjsCoreEvaluator={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream,a.pdfjsCoreParser,a.pdfjsCoreImage,a.pdfjsCoreColorSpace,a.pdfjsCoreMurmurHash3,a.pdfjsCoreFonts,a.pdfjsCoreFunction,a.pdfjsCorePattern,a.pdfjsCoreCMap,a.pdfjsCoreMetrics,a.pdfjsCoreBidi,a.pdfjsCoreEncodings,a.pdfjsCoreStandardFonts,a.pdfjsCoreUnicode,a.pdfjsCoreGlyphList)}(this,function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s=b.FONT_IDENTITY_MATRIX,t=b.IDENTITY_MATRIX,u=b.UNSUPPORTED_FEATURES,v=b.ImageKind,w=b.OPS,x=b.TextRenderingMode,y=b.Util,z=b.assert,A=b.createPromiseCapability,B=b.error,C=b.info,D=b.isArray,E=b.isNum,F=b.isString,G=b.getLookupTableFactory,H=b.warn,I=c.Dict,J=c.Name,K=c.isCmd,L=c.isDict,M=c.isName,N=c.isRef,O=c.isStream,P=d.DecodeStream,Q=d.JpegStream,R=d.Stream,S=e.Lexer,T=e.Parser,U=e.isEOF,V=f.PDFImage,W=g.ColorSpace,X=h.MurmurHash3_64,Y=i.ErrorFont,Z=i.FontFlags,$=i.Font,_=i.IdentityToUnicodeMap,aa=i.ToUnicodeMap,ba=i.getFontType,ca=j.isPDFFunction,da=j.PDFFunction,ea=k.Pattern,fa=k.getTilingPatternIR,ga=l.CMapFactory,ha=l.IdentityCMap,ia=m.getMetrics,ja=n.bidi,ka=o.WinAnsiEncoding,la=o.StandardEncoding,ma=o.MacRomanEncoding,na=o.SymbolSetEncoding,oa=o.ZapfDingbatsEncoding,pa=o.getEncoding,qa=p.getStdFontMap,ra=p.getSerifFonts,sa=p.getSymbolsFonts,ta=q.getNormalizedUnicodes,ua=q.reverseIfRtl,va=q.getUnicodeForGlyph,wa=r.getGlyphsUnicode,xa=function(){function a(a,b,c,d){this.xref=a,this.resources=b,this.handler=c,this.forceDataSchema=d}function b(a,b,c,e,f,g,h,i){this.pdfManager=a,this.xref=b,this.handler=c,this.pageIndex=e,this.uniquePrefix=f,this.idCounters=g,this.fontCache=h,this.options=i||d}function c(){this.reset()}var d={forceDataSchema:!1,maxImageSize:-1,disableFontFace:!1,cMapOptions:{url:null,packed:!1}};a.prototype={canDecode:function(b){return b instanceof Q&&a.isDecodable(b,this.xref,this.resources)},decode:function(a){
// For natively supported JPEGs send them to the main thread for decoding.
var b=a.dict,c=b.get("ColorSpace","CS");c=W.parse(c,this.xref,this.resources);var d=c.numComps,e=this.handler.sendWithPromise("JpegDecode",[a.getIR(this.forceDataSchema),d]);return e.then(function(b){var c=b.data;return new R(c,0,c.length,a.dict)})}},/**
   * Checks if the image can be decoded and displayed by the browser without any
   * further processing such as color space conversions.
   */
a.isSupported=function(a,b,c){var d=W.parse(a.dict.get("ColorSpace","CS"),b,c);return("DeviceGray"===d.name||"DeviceRGB"===d.name)&&d.isDefaultDecode(a.dict.getArray("Decode","D"))},/**
   * Checks if the image can be decoded by the browser.
   */
a.isDecodable=function(a,b,c){var d=W.parse(a.dict.get("ColorSpace","CS"),b,c);return(1===d.numComps||3===d.numComps)&&d.isDefaultDecode(a.dict.getArray("Decode","D"))};
// Trying to minimize Date.now() usage and check every 100 time
var e=20,f=100;c.prototype={check:function(){return++this.checked<f?!1:(this.checked=0,this.endTime<=Date.now())},reset:function(){this.endTime=Date.now()+e,this.checked=0}};var g=Promise.resolve(),h=1,i=2;return b.prototype={hasBlendModes:function(a){if(!L(a))return!1;var b=Object.create(null);a.objId&&(b[a.objId]=!0);for(var c=[a],d=this.xref;c.length;){var e,f,g,h=c.shift(),i=h.get("ExtGState");if(L(i)){var j=i.getKeys();for(f=0,g=j.length;g>f;f++){e=j[f];var k=i.get(e),l=k.get("BM");if(M(l)&&"Normal"!==l.name)return!0}}
// Descend into the XObjects to look for more resources and blend modes.
var m=h.get("XObject");if(L(m)){var n=m.getKeys();for(f=0,g=n.length;g>f;f++){e=n[f];var o=m.getRaw(e);if(N(o)){if(b[o.toString()])
// The XObject has already been processed, and by avoiding a
// redundant `xref.fetch` we can *significantly* reduce the load
// time for badly generated PDF files (fixes issue6961.pdf).
continue;o=d.fetch(o)}if(O(o)){if(o.dict.objId){if(b[o.dict.objId])
// stream has objId and is processed already
continue;b[o.dict.objId]=!0}var p=o.dict.get("Resources");
// Checking objId to detect an infinite loop.
!L(p)||p.objId&&b[p.objId]||(c.push(p),p.objId&&(b[p.objId]=!0))}}}}return!1},buildFormXObject:function(a,b,c,d,e,f){var g=b.dict.getArray("Matrix"),h=b.dict.getArray("BBox"),i=b.dict.get("Group");if(i){var j,k={matrix:g,bbox:h,smask:c,isolated:!1,knockout:!1},l=i.get("S");M(l)&&"Transparency"===l.name&&(k.isolated=i.get("I")||!1,k.knockout=i.get("K")||!1,j=i.has("CS")?W.parse(i.get("CS"),this.xref,a):null),c&&c.backdrop&&(j=j||W.singletons.rgb,c.backdrop=j.getRgb(c.backdrop,0)),d.addOp(w.beginGroup,[k])}return d.addOp(w.paintFormXObjectBegin,[g,h]),this.getOperatorList(b,e,b.dict.get("Resources")||a,d,f).then(function(){d.addOp(w.paintFormXObjectEnd,[]),i&&d.addOp(w.endGroup,[k])})},buildPaintImageXObject:function(b,c,d,e,f,g){var h=this,i=c.dict,j=i.get("Width","W"),k=i.get("Height","H");if(!(j&&E(j)&&k&&E(k)))return void H("Image dimensions are missing, or not numbers.");var l=this.options.maxImageSize;if(-1!==l&&j*k>l)return void H("Image exceeded maximum allowed size and was removed.");var m,n,o=i.get("ImageMask","IM")||!1;if(o){
// This depends on a tmpCanvas being filled with the
// current fillStyle, such that processing the pixel
// data can't be done here. Instead of creating a
// complete PDFImage, only read the information needed
// for later.
var p=i.get("Width","W"),q=i.get("Height","H"),r=p+7>>3,s=c.getBytes(r*q),t=i.getArray("Decode","D"),u=!!t&&t[0]>0;return m=V.createMask(s,p,q,c instanceof P,u),m.cached=!0,n=[m],e.addOp(w.paintImageMaskXObject,n),void(f&&(g[f]={fn:w.paintImageMaskXObject,args:n}))}var v=i.get("SMask","SM")||!1,x=i.get("Mask")||!1,y=200;
// Inlining small images into the queue as RGB data
if(d&&!v&&!x&&!(c instanceof Q)&&y>j+k){var z=new V(this.xref,b,c,d,null,null);
// We force the use of RGBA_32BPP images here, because we can't handle
// any other kind.
/* forceRGBA = */
return m=z.createImageData(!0),void e.addOp(w.paintInlineImageXObject,[m])}
// If there is no imageMask, create the PDFImage and a lot
// of image processing can be done here.
var A=this.uniquePrefix||"",B="img_"+A+ ++this.idCounters.obj;if(e.addDependency(B),n=[B,j,k],!v&&!x&&c instanceof Q&&a.isSupported(c,this.xref,b))
// These JPEGs don't need any more processing so we can just send it.
return e.addOp(w.paintJpegXObject,n),void this.handler.send("obj",[B,this.pageIndex,"JpegStream",c.getIR(this.options.forceDataSchema)]);
// Creates native image decoder only if a JPEG image or mask is present.
var C=null;(c instanceof Q||x instanceof Q||v instanceof Q)&&(C=new a(h.xref,b,h.handler,h.options.forceDataSchema)),V.buildImage(h.handler,h.xref,b,c,d,C).then(function(a){var b=a.createImageData(/* forceRGBA = */!1);h.handler.send("obj",[B,h.pageIndex,"Image",b],[b.data.buffer])}).then(void 0,function(a){H("Unable to decode image: "+a),h.handler.send("obj",[B,h.pageIndex,"Image",null])}),e.addOp(w.paintImageXObject,n),f&&(g[f]={fn:w.paintImageXObject,args:n})},handleSMask:function(a,b,c,d,e){var f=a.get("G"),g={subtype:a.get("S").name,backdrop:a.get("BC")},h=a.get("TR");if(ca(h)){for(var i=da.parse(this.xref,h),j=new Uint8Array(256),k=new Float32Array(1),l=0;256>l;l++)k[0]=l/255,i(k,0,k,0),j[l]=255*k[0]|0;g.transferMap=j}return this.buildFormXObject(b,f,g,c,d,e.state.clone())},handleTilingType:function(a,b,c,d,e,f,g){
// Create an IR of the pattern code.
var h=new za,i=[e.get("Resources"),c],j=I.merge(this.xref,i);return this.getOperatorList(d,g,j,h).then(function(){
// Add the dependencies to the parent operator list so they are
// resolved before sub operator list is executed synchronously.
f.addDependencies(h.dependencies),f.addOp(a,fa({fnArray:h.fnArray,argsArray:h.argsArray},e,b))})},handleSetFont:function(a,b,c,d,e,f){
// TODO(mack): Not needed?
var g;b&&(b=b.slice(),g=b[0].name);var h=this;return this.loadFont(g,c,this.xref,a).then(function(b){return b.font.isType3Font?b.loadType3Data(h,a,d,e).then(function(){return b},function(a){
// Error in the font data -- sending unsupported feature notification.
return h.handler.send("UnsupportedFeature",{featureId:u.font}),new ya("g_font_error",new Y("Type3 font load error: "+a),b.font)}):b}).then(function(a){return f.font=a.font,a.send(h.handler),a.loadedName})},handleText:function(a,b){var c=b.font,d=c.charsToGlyphs(a),e=!!(b.textRenderingMode&x.ADD_TO_PATH_FLAG);if(c.data&&(e||this.options.disableFontFace))for(var f=function(a){if(!c.renderer.hasBuiltPath(a)){var b=c.renderer.getPathJs(a);this.handler.send("commonobj",[c.loadedName+"_path_"+a,"FontPath",b])}}.bind(this),g=0,h=d.length;h>g;g++){var i=d[g];f(i.fontChar);
// If the glyph has an accent we need to build a path for its
// fontChar too, otherwise CanvasGraphics_paintChar will fail.
var j=i.accent;j&&j.fontChar&&f(j.fontChar)}return d},setGState:function(a,b,c,d,e,f){for(var g=[],h=b.getKeys(),i=this,j=Promise.resolve(),k=0,l=h.length;l>k;k++){var m=h[k],n=b.get(m);switch(m){case"Type":break;case"LW":case"LC":case"LJ":case"ML":case"D":case"RI":case"FL":case"CA":case"ca":g.push([m,n]);break;case"Font":j=j.then(function(){return i.handleSetFont(a,null,n[0],c,d,f.state).then(function(a){c.addDependency(a),g.push([m,[a,n[1]]])})});break;case"BM":g.push([m,n]);break;case"SMask":if(M(n)&&"None"===n.name){g.push([m,!1]);break}L(n)?(j=j.then(function(b){return i.handleSMask(b,a,c,d,f)}.bind(this,n)),g.push([m,!0])):H("Unsupported SMask type");break;
// Only generate info log messages for the following since
// they are unlikely to have a big impact on the rendering.
case"OP":case"op":case"OPM":case"BG":case"BG2":case"UCR":case"UCR2":case"TR":case"TR2":case"HT":case"SM":case"SA":case"AIS":case"TK":
// TODO implement these operators.
C("graphic state operator "+m);break;default:C("Unknown graphic state operator "+m)}}return j.then(function(){g.length>0&&c.addOp(w.setGState,[g])})},loadFont:function(a,b,c,d){function e(){return Promise.resolve(new ya("g_font_error",new Y("Font "+a+" is not available"),b))}var f;if(b)// Loading by ref.
z(N(b)),f=b;else{// Loading by name.
var g=d.get("Font");if(!g)return H("fontRes not available"),e();f=g.getRaw(a)}if(!f)return H("fontRef not available"),e();if(this.fontCache.has(f))return this.fontCache.get(f);if(b=c.fetchIfRef(f),!L(b))return e();
// We are holding font.translated references just for fontRef that are not
// dictionaries (Dict). See explanation below.
if(b.translated)return b.translated;var h=A(),i=this.preEvaluateFont(b,c),j=i.descriptor,k=f.num+"_"+f.gen;if(L(j)){j.fontAliases||(j.fontAliases=Object.create(null));var l=j.fontAliases,m=i.hash;if(l[m]){var n=l[m].aliasRef;if(n&&this.fontCache.has(n))return this.fontCache.putAlias(f,n),this.fontCache.get(f)}l[m]||(l[m]={fontID:$.getFontID()}),l[m].aliasRef=f,k=l[m].fontID}
// Workaround for bad PDF generators that don't reference fonts
// properly, i.e. by not using an object identifier.
// Check if the fontRef is a Dict (as opposed to a standard object),
// in which case we don't cache the font and instead reference it by
// fontName in font.loadedName below.
var o=L(f);o||this.fontCache.put(f,h.promise),
// Keep track of each font we translated so the caller can
// load them asynchronously before calling display on a page.
b.loadedName="g_"+this.pdfManager.docId+"_f"+(o?a.replace(/\W/g,""):k),b.translated=h.promise;
// TODO move promises into translate font
var p;try{p=this.translateFont(i,c)}catch(q){p=Promise.reject(q)}var r=this;return p.then(function(a){if(void 0!==a.fontType){var d=c.stats.fontTypes;d[a.fontType]=!0}h.resolve(new ya(b.loadedName,a,b))},function(a){
// TODO fontCapability.reject?
// Error in the font data -- sending unsupported feature notification.
r.handler.send("UnsupportedFeature",{featureId:u.font});try{
// error, but it's still nice to have font type reported
var d=i.descriptor,e=d&&d.get("FontFile3"),f=e&&e.get("Subtype"),g=ba(i.type,f&&f.name),j=c.stats.fontTypes;j[g]=!0}catch(k){}h.resolve(new ya(b.loadedName,new Y(a instanceof Error?a.message:a),b))}),h.promise},buildPath:function(a,b,c){var d=a.length-1;if(c||(c=[]),0>d||a.fnArray[d]!==w.constructPath)a.addOp(w.constructPath,[[b],c]);else{var e=a.argsArray[d];e[0].push(b),Array.prototype.push.apply(e[1],c)}},handleColorN:function(a,b,c,d,e,f,g,j){
// compile tiling patterns
var k,l=c[c.length-1];if(M(l)&&(k=e.get(l.name))){var m=O(k)?k.dict:k,n=m.get("PatternType");if(n===h){var o=d.base?d.base.getRgb(c,0):null;return this.handleTilingType(b,o,f,k,m,a,g)}if(n===i){var p=m.get("Shading"),q=m.getArray("Matrix");return k=ea.parseShading(p,q,j,f,this.handler),a.addOp(b,k.getIR()),Promise.resolve()}return Promise.reject("Unknown PatternType: "+n)}
// TODO shall we fail here?
return a.addOp(b,c),Promise.resolve()},getOperatorList:function(a,b,d,e,f){var h=this,i=this.xref,j=Object.create(null);z(e),d=d||I.empty;var k=d.get("XObject")||I.empty,l=d.get("Pattern")||I.empty,m=new Aa(f||new Ca),n=new Da(a,i,m),o=new c;return new Promise(function p(a,c){var f=function(b){b.then(function(){try{p(a,c)}catch(b){c(b)}},c)};b.ensureNotTerminated(),o.reset();for(var q,r,s,t,u={};!(q=o.check())&&(
// The arguments parsed by read() are used beyond this loop, so we
// cannot reuse the same array on each iteration. Therefore we pass
// in |null| as the initial value (see the comment on
// EvaluatorPreprocessor_read() for why).
u.args=null,n.read(u));){var v=u.args,x=u.fn;switch(0|x){case w.paintXObject:if(v[0].code)break;
// eagerly compile XForm objects
var y=v[0].name;if(!y){H("XObject must be referred to by name.");continue}if(void 0!==j[y]){e.addOp(j[y].fn,j[y].args),v=null;continue}var A=k.get(y);if(A){z(O(A),"XObject should be a stream");var D=A.dict.get("Subtype");if(z(M(D),"XObject should have a Name subtype"),"Form"===D.name)return m.save(),void f(h.buildFormXObject(d,A,null,e,b,m.state.clone()).then(function(){m.restore()}));if("Image"===D.name){h.buildPaintImageXObject(d,A,!1,e,y,j),v=null;continue}if("PS"===D.name){
// PostScript XObjects are unused when viewing documents.
// See section 4.7.1 of Adobe's PDF reference.
C("Ignored XObject subtype PS");continue}B("Unhandled XObject subtype "+D.name)}break;case w.setFont:var G=v[1];
// eagerly collect all fonts
return void f(h.handleSetFont(d,v,null,e,b,m.state).then(function(a){e.addDependency(a),e.addOp(w.setFont,[a,G])}));case w.endInlineImage:var J=v[0].cacheKey;if(J){var K=j[J];if(void 0!==K){e.addOp(K.fn,K.args),v=null;continue}}h.buildPaintImageXObject(d,v[0],!0,e,J,j),v=null;continue;case w.showText:v[0]=h.handleText(v[0],m.state);break;case w.showSpacedText:var N=v[0],P=[],Q=N.length,R=m.state;for(r=0;Q>r;++r){var S=N[r];F(S)?Array.prototype.push.apply(P,h.handleText(S,R)):E(S)&&P.push(S)}v[0]=P,x=w.showText;break;case w.nextLineShowText:e.addOp(w.nextLine),v[0]=h.handleText(v[0],m.state),x=w.showText;break;case w.nextLineSetSpacingShowText:e.addOp(w.nextLine),e.addOp(w.setWordSpacing,[v.shift()]),e.addOp(w.setCharSpacing,[v.shift()]),v[0]=h.handleText(v[0],m.state),x=w.showText;break;case w.setTextRenderingMode:m.state.textRenderingMode=v[0];break;case w.setFillColorSpace:m.state.fillColorSpace=W.parse(v[0],i,d);continue;case w.setStrokeColorSpace:m.state.strokeColorSpace=W.parse(v[0],i,d);continue;case w.setFillColor:t=m.state.fillColorSpace,v=t.getRgb(v,0),x=w.setFillRGBColor;break;case w.setStrokeColor:t=m.state.strokeColorSpace,v=t.getRgb(v,0),x=w.setStrokeRGBColor;break;case w.setFillGray:m.state.fillColorSpace=W.singletons.gray,v=W.singletons.gray.getRgb(v,0),x=w.setFillRGBColor;break;case w.setStrokeGray:m.state.strokeColorSpace=W.singletons.gray,v=W.singletons.gray.getRgb(v,0),x=w.setStrokeRGBColor;break;case w.setFillCMYKColor:m.state.fillColorSpace=W.singletons.cmyk,v=W.singletons.cmyk.getRgb(v,0),x=w.setFillRGBColor;break;case w.setStrokeCMYKColor:m.state.strokeColorSpace=W.singletons.cmyk,v=W.singletons.cmyk.getRgb(v,0),x=w.setStrokeRGBColor;break;case w.setFillRGBColor:m.state.fillColorSpace=W.singletons.rgb,v=W.singletons.rgb.getRgb(v,0);break;case w.setStrokeRGBColor:m.state.strokeColorSpace=W.singletons.rgb,v=W.singletons.rgb.getRgb(v,0);break;case w.setFillColorN:if(t=m.state.fillColorSpace,"Pattern"===t.name)return void f(h.handleColorN(e,w.setFillColorN,v,t,l,d,b,i));v=t.getRgb(v,0),x=w.setFillRGBColor;break;case w.setStrokeColorN:if(t=m.state.strokeColorSpace,"Pattern"===t.name)return void f(h.handleColorN(e,w.setStrokeColorN,v,t,l,d,b,i));v=t.getRgb(v,0),x=w.setStrokeRGBColor;break;case w.shadingFill:var T=d.get("Shading");T||B("No shading resource found");var U=T.get(v[0].name);U||B("No shading object found");var V=ea.parseShading(U,null,i,d,h.handler),X=V.getIR();v=[X],x=w.shadingFill;break;case w.setGState:var Y=v[0],Z=d.get("ExtGState");if(!L(Z)||!Z.has(Y.name))break;var $=Z.get(Y.name);return void f(h.setGState(d,$,e,b,i,m));case w.moveTo:case w.lineTo:case w.curveTo:case w.curveTo2:case w.curveTo3:case w.closePath:h.buildPath(e,x,v);continue;case w.rectangle:h.buildPath(e,x,v);continue;case w.markPoint:case w.markPointProps:case w.beginMarkedContent:case w.beginMarkedContentProps:case w.endMarkedContent:case w.beginCompat:case w.endCompat:
// Ignore operators where the corresponding handlers are known to
// be no-op in CanvasGraphics (display/canvas.js). This prevents
// serialization errors and is also a bit more efficient.
// We could also try to serialize all objects in a general way,
// e.g. as done in https://github.com/mozilla/pdf.js/pull/6266,
// but doing so is meaningless without knowing the semantics.
continue;default:
// Note: Ignore the operator if it has `Dict` arguments, since
// those are non-serializable, otherwise postMessage will throw
// "An object could not be cloned.".
if(null!==v){for(r=0,s=v.length;s>r&&!(v[r]instanceof I);r++);if(s>r){H("getOperatorList - ignoring operator: "+x);continue}}}e.addOp(x,v)}if(q)return void f(g);
// Some PDFs don't close all restores inside object/form.
// Closing those for them.
for(r=0,s=n.savedStatesDepth;s>r;r++)e.addOp(w.restore,[]);a()})},getTextContent:function(a,b,d,e,f){function h(){if(q.initialized)return q;var a=B.font;a.loadedName in p.styles||(p.styles[a.loadedName]={fontFamily:a.fallbackName,ascent:a.ascent,descent:a.descent,vertical:a.vertical}),q.fontName=a.loadedName;
// 9.4.4 Text Space Details
var b=[B.fontSize*B.textHScale,0,0,B.fontSize,0,B.textRise];if(a.isType3Font&&B.fontMatrix!==s&&1===B.fontSize){var c=a.bbox[3]-a.bbox[1];c>0&&(c*=B.fontMatrix[3],b[3]*=c)}var d=y.transform(B.ctm,y.transform(B.textMatrix,b));q.transform=d,a.vertical?(q.width=Math.sqrt(d[0]*d[0]+d[1]*d[1]),q.height=0,q.vertical=!0):(q.width=0,q.height=Math.sqrt(d[2]*d[2]+d[3]*d[3]),q.vertical=!1);var e=B.textLineMatrix[0],f=B.textLineMatrix[1],g=Math.sqrt(e*e+f*f);e=B.ctm[0],f=B.ctm[1];var h=Math.sqrt(e*e+f*f);q.textAdvanceScale=h*g,q.lastAdvanceWidth=0,q.lastAdvanceHeight=0;var i=a.spaceWidth/1e3*B.fontSize;
// It's okay for monospace fonts to fake as much space as needed.
return i?(q.spaceWidth=i,q.fakeSpaceMin=i*r,q.fakeMultiSpaceMin=i*u,q.fakeMultiSpaceMax=i*v,q.textRunBreakAllowed=!a.isMonospace):(q.spaceWidth=0,q.fakeSpaceMin=1/0,q.fakeMultiSpaceMin=1/0,q.fakeMultiSpaceMax=0,q.textRunBreakAllowed=!1),q.initialized=!0,q}function i(a){for(
// Replaces all whitespaces with standard spaces (0x20), to avoid
// alignment issues between the textLayer and the canvas if the text
// contains e.g. tabs (fixes issue6612.pdf).
var b,c=0,d=a.length;d>c&&(b=a.charCodeAt(c))>=32&&127>=b;)c++;return d>c?a.replace(o," "):a}function j(a){var b=a.str.join(""),c=ja(b,-1,a.vertical);return{str:f?i(c.str):c.str,dir:c.dir,width:a.width,height:a.height,transform:a.transform,fontName:a.fontName}}function k(a,b){return x.loadFont(a,b,A,d).then(function(a){B.font=a.font,B.fontMatrix=a.font.fontMatrix||s})}function l(a){for(var b=B.font,c=h(),d=0,e=0,f=b.charsToGlyphs(a),g=b.defaultVMetrics,i=0;i<f.length;i++){var j=f[i],k=null,l=null,n=null;b.vertical?j.vmetric?(n=j.vmetric[0],k=j.vmetric[1],l=j.vmetric[2]):(n=j.width,k=.5*j.width,l=g[2]):n=j.width;var o=j.unicode,p=ta();void 0!==p[o]&&(o=p[o]),o=ua(o);
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
var q=B.charSpacing;if(j.isSpace){var r=B.wordSpacing;q+=r,r>0&&m(r,c.str)}var s=0,t=0;if(b.vertical){var u=n*B.fontMatrix[0];t=u*B.fontSize+q,e+=t}else{var v=n*B.fontMatrix[0];s=(v*B.fontSize+q)*B.textHScale,d+=s}B.translateTextMatrix(s,t),c.str.push(o)}return b.vertical?(c.lastAdvanceHeight=e,c.height+=Math.abs(e*c.textAdvanceScale)):(c.lastAdvanceWidth=d,c.width+=d*c.textAdvanceScale),c}function m(a,b){if(!(a<q.fakeSpaceMin)){if(a<q.fakeMultiSpaceMin)return void b.push(" ");for(var c=Math.round(a/q.spaceWidth);c-- >0;)b.push(" ")}}function n(){q.initialized&&(p.items.push(j(q)),q.initialized=!1,q.str.length=0)}e=e||new Aa(new Ba);var o=/\s/g,p={items:[],styles:Object.create(null)},q={initialized:!1,str:[],width:0,height:0,vertical:!1,lastAdvanceWidth:0,lastAdvanceHeight:0,textAdvanceScale:0,spaceWidth:0,fakeSpaceMin:1/0,fakeMultiSpaceMin:1/0,fakeMultiSpaceMax:-0,textRunBreakAllowed:!1,transform:null,fontName:null},r=.3,u=1.5,v=4,x=this,A=this.xref;d=A.fetchIfRef(d)||I.empty;
// The xobj is parsed iff it's needed, e.g. if there is a `DO` cmd.
var B,C=null,E=Object.create(null),F=new Da(a,A,e),G=new c;return new Promise(function H(a,c){var i=function(b){b.then(function(){try{H(a,c)}catch(b){c(b)}},c)};b.ensureNotTerminated(),G.reset();for(var j,o={},r=[];!(j=G.check())&&(
// The arguments parsed by read() are not used beyond this loop, so
// we can reuse the same array on every iteration, thus avoiding
// unnecessary allocations.
r.length=0,o.args=r,F.read(o));){B=e.state;var s=o.fn;r=o.args;var u;switch(0|s){case w.setFont:return n(),B.fontSize=r[1],void i(k(r[0].name));case w.setTextRise:n(),B.textRise=r[0];break;case w.setHScale:n(),B.textHScale=r[0]/100;break;case w.setLeading:n(),B.leading=r[0];break;case w.moveText:
// Optimization to treat same line movement as advance
var v=B.font?0===(B.font.vertical?r[0]:r[1]):!1;if(u=r[0]-r[1],v&&q.initialized&&u>0&&u<=q.fakeMultiSpaceMax){B.translateTextLineMatrix(r[0],r[1]),q.width+=r[0]-q.lastAdvanceWidth,q.height+=r[1]-q.lastAdvanceHeight;var A=r[0]-q.lastAdvanceWidth-(r[1]-q.lastAdvanceHeight);m(A,q.str);break}n(),B.translateTextLineMatrix(r[0],r[1]),B.textMatrix=B.textLineMatrix.slice();break;case w.setLeadingMoveText:n(),B.leading=-r[1],B.translateTextLineMatrix(r[0],r[1]),B.textMatrix=B.textLineMatrix.slice();break;case w.nextLine:n(),B.carriageReturn();break;case w.setTextMatrix:n(),B.setTextMatrix(r[0],r[1],r[2],r[3],r[4],r[5]),B.setTextLineMatrix(r[0],r[1],r[2],r[3],r[4],r[5]);break;case w.setCharSpacing:B.charSpacing=r[0];break;case w.setWordSpacing:B.wordSpacing=r[0];break;case w.beginText:n(),B.textMatrix=t.slice(),B.textLineMatrix=t.slice();break;case w.showSpacedText:for(var J,K=r[0],N=0,P=K.length;P>N;N++)if("string"==typeof K[N])l(K[N]);else{h(),
// PDF Specification 5.3.2 states:
// The number is expressed in thousandths of a unit of text
// space.
// This amount is subtracted from the current horizontal or
// vertical coordinate, depending on the writing mode.
// In the default coordinate system, a positive adjustment
// has the effect of moving the next glyph painted either to
// the left or down by the given amount.
u=K[N]*B.fontSize/1e3;var Q=!1;B.font.vertical?(J=u*(B.textHScale*B.textMatrix[2]+B.textMatrix[3]),B.translateTextMatrix(0,u),Q=q.textRunBreakAllowed&&u>q.fakeMultiSpaceMax,Q||(q.height+=J)):(u=-u,J=u*(B.textHScale*B.textMatrix[0]+B.textMatrix[1]),B.translateTextMatrix(u,0),Q=q.textRunBreakAllowed&&u>q.fakeMultiSpaceMax,Q||(q.width+=J)),Q?n():u>0&&m(u,q.str)}break;case w.showText:l(r[0]);break;case w.nextLineShowText:n(),B.carriageReturn(),l(r[0]);break;case w.nextLineSetSpacingShowText:n(),B.wordSpacing=r[0],B.charSpacing=r[1],B.carriageReturn(),l(r[2]);break;case w.paintXObject:if(n(),r[0].code)break;C||(C=d.get("XObject")||I.empty);var R=r[0].name;if(E.key===R){E.texts&&(y.appendToArray(p.items,E.texts.items),y.extendObj(p.styles,E.texts.styles));break}var S=C.get(R);if(!S)break;z(O(S),"XObject should be a stream");var T=S.dict.get("Subtype");if(z(M(T),"XObject should have a Name subtype"),"Form"!==T.name){E.key=R,E.texts=null;break}e.save();var U=S.dict.getArray("Matrix");return D(U)&&6===U.length&&e.transform(U),void i(x.getTextContent(S,b,S.dict.get("Resources")||d,e,f).then(function(a){y.appendToArray(p.items,a.items),y.extendObj(p.styles,a.styles),e.restore(),E.key=R,E.texts=a}));case w.setGState:n();var V=r[0],W=d.get("ExtGState");if(!L(W)||!W.has(V.name))break;var X=W.get(V.name),Y=null;for(var Z in X)"Font"===Z&&(z(!Y),Y=X[Z]);if(Y)return B.fontSize=Y[1],void i(k(Y[0]))}}// while
// while
return j?void i(g):(n(),void a(p))})},extractDataStructures:function(a,b,c,d){
// 9.10.2
var e=a.get("ToUnicode")||b.get("ToUnicode"),f=e?this.readToUnicode(e):Promise.resolve(void 0);if(d.composite){
// CIDSystemInfo helps to match CID to glyphs
var g=a.get("CIDSystemInfo");L(g)&&(d.cidSystemInfo={registry:g.get("Registry"),ordering:g.get("Ordering"),supplement:g.get("Supplement")});var h=a.get("CIDToGIDMap");O(h)&&(d.cidToGidMap=this.readCidToGidMap(h))}
// Based on 9.6.6 of the spec the encoding can come from multiple places
// and depends on the font type. The base encoding and differences are
// read here, but the encoding that is actually used is chosen during
// glyph mapping in the font.
// TODO: Loading the built in encoding in the font would allow the
// differences to be merged in here not require us to hold on to it.
var i,j=[],k=null;if(a.has("Encoding")){if(i=a.get("Encoding"),L(i)){
// Load the differences between the base and original
if(k=i.get("BaseEncoding"),k=M(k)?k.name:null,i.has("Differences"))for(var l=i.get("Differences"),m=0,n=0,o=l.length;o>n;n++){var p=c.fetchIfRef(l[n]);E(p)?m=p:M(p)?j[m++]=p.name:B("Invalid entry in 'Differences' array: "+p)}}else M(i)?k=i.name:B("Encoding is not a Name nor a Dict");
// According to table 114 if the encoding is a named encoding it must be
// one of these predefined encodings.
"MacRomanEncoding"!==k&&"MacExpertEncoding"!==k&&"WinAnsiEncoding"!==k&&(k=null)}
// The Symbolic attribute can be misused for regular fonts
// Heuristic: we have to check if the font is a standard one also
return k?d.defaultEncoding=pa(k).slice():(i="TrueType"===d.type?ka:la,d.flags&Z.Symbolic&&(i=ma,d.file||(/Symbol/i.test(d.name)?i=na:/Dingbats/i.test(d.name)&&(i=oa))),d.defaultEncoding=i),d.differences=j,d.baseEncodingName=k,d.dict=a,f.then(function(a){return d.toUnicode=a,this.buildToUnicode(d)}.bind(this)).then(function(a){return d.toUnicode=a,d})},/**
     * Builds a char code to unicode map based on section 9.10 of the spec.
     * @param {Object} properties Font properties object.
     * @return {Promise} A Promise that is resolved with a
     *   {ToUnicodeMap|IdentityToUnicodeMap} object.
     */
buildToUnicode:function(a){
// Section 9.10.2 Mapping Character Codes to Unicode Values
if(a.toUnicode&&0!==a.toUnicode.length)return Promise.resolve(a.toUnicode);
// According to the spec if the font is a simple font we should only map
// to unicode if the base encoding is MacRoman, MacExpert, or WinAnsi or
// the differences array only contains adobe standard or symbol set names,
// in pratice it seems better to always try to create a toUnicode
// map based of the default encoding.
var b,c;if(!a.composite){b=[];var d=a.defaultEncoding.slice(),e=a.baseEncodingName,f=a.differences;for(c in f)d[c]=f[c];var g=wa();for(c in d){
// a) Map the character code to a character name.
var h=d[c];
// b) Look up the character name in the Adobe Glyph List (see the
//    Bibliography) to obtain the corresponding Unicode value.
if(""!==h)if(void 0!==g[h])b[c]=String.fromCharCode(g[h]);else{
// (undocumented) c) Few heuristics to recognize unknown glyphs
// NOTE: Adobe Reader does not do this step, but OSX Preview does
var i=0;switch(h[0]){case"G":// Gxx glyph
3===h.length&&(i=parseInt(h.substr(1),16));break;case"g":// g00xx glyph
5===h.length&&(i=parseInt(h.substr(1),16));break;case"C":// Cddd glyph
case"c":// cddd glyph
h.length>=3&&(i=+h.substr(1));break;default:
// 'uniXXXX'/'uXXXX{XX}' glyphs
var j=va(h,g);-1!==j&&(i=j)}if(i){
// If |baseEncodingName| is one the predefined encodings,
// and |code| equals |charcode|, using the glyph defined in the
// baseEncoding seems to yield a better |toUnicode| mapping
// (fixes issue 5070).
if(e&&i===+c){var k=pa(e);if(k&&(h=k[c])){b[c]=String.fromCharCode(g[h]);continue}}b[c]=String.fromCharCode(i)}}}return Promise.resolve(new aa(b))}
// If the font is a composite font that uses one of the predefined CMaps
// listed in Table 118 (except Identity–H and Identity–V) or whose
// descendant CIDFont uses the Adobe-GB1, Adobe-CNS1, Adobe-Japan1, or
// Adobe-Korea1 character collection:
if(a.composite&&(a.cMap.builtInCMap&&!(a.cMap instanceof ha)||"Adobe"===a.cidSystemInfo.registry&&("GB1"===a.cidSystemInfo.ordering||"CNS1"===a.cidSystemInfo.ordering||"Japan1"===a.cidSystemInfo.ordering||"Korea1"===a.cidSystemInfo.ordering))){
// Then:
// a) Map the character code to a character identifier (CID) according
// to the font’s CMap.
// b) Obtain the registry and ordering of the character collection used
// by the font’s CMap (for example, Adobe and Japan1) from its
// CIDSystemInfo dictionary.
var l=a.cidSystemInfo.registry,m=a.cidSystemInfo.ordering,n=J.get(l+"-"+m+"-UCS2");
// d) Obtain the CMap with the name constructed in step (c) (available
// from the ASN Web site; see the Bibliography).
return ga.create(n,this.options.cMapOptions,null).then(function(c){var d=a.cMap;return b=[],d.forEach(function(a,d){z(65535>=d,"Max size of CID is 65,535");var e=c.lookup(d);e&&(b[a]=String.fromCharCode((e.charCodeAt(0)<<8)+e.charCodeAt(1)))}),new aa(b)})}
// The viewer's choice, just use an identity map.
return Promise.resolve(new _(a.firstChar,a.lastChar))},readToUnicode:function(a){var b=a;return M(b)?ga.create(b,this.options.cMapOptions,null).then(function(a){return a instanceof ha?new _(0,65535):new aa(a.getMap())}):O(b)?ga.create(b,this.options.cMapOptions,null).then(function(a){if(a instanceof ha)return new _(0,65535);var b=new Array(a.length);
// Convert UTF-16BE
// NOTE: cmap can be a sparse array, so use forEach instead of for(;;)
// to iterate over all keys.
return a.forEach(function(a,c){for(var d=[],e=0;e<c.length;e+=2){var f=c.charCodeAt(e)<<8|c.charCodeAt(e+1);if(55296===(63488&f)){e+=2;var g=c.charCodeAt(e)<<8|c.charCodeAt(e+1);d.push(((1023&f)<<10)+(1023&g)+65536)}else// w1 < 0xD800 || w1 > 0xDFFF
d.push(f)}b[a]=String.fromCharCode.apply(String,d)}),new aa(b)}):Promise.resolve(null)},readCidToGidMap:function(a){for(var b=a.getBytes(),c=[],d=0,e=b.length;e>d;d++){var f=b[d++]<<8|b[d];if(0!==f){var g=d>>1;c[g]=f}}return c},extractWidths:function(a,b,c,d){var e,f,g,h,i,j,k,l,m=[],n=0,o=[];if(d.composite){if(n=a.get("DW")||1e3,l=a.get("W"))for(f=0,g=l.length;g>f;f++)if(j=l[f++],k=b.fetchIfRef(l[f]),D(k))for(h=0,i=k.length;i>h;h++)m[j++]=k[h];else{var p=l[++f];for(h=j;k>=h;h++)m[h]=p}if(d.vertical){var q=a.get("DW2")||[880,-1e3];if(e=[q[1],.5*n,q[0]],q=a.get("W2"))for(f=0,g=q.length;g>f;f++)if(j=q[f++],k=b.fetchIfRef(q[f]),D(k))for(h=0,i=k.length;i>h;h++)o[j++]=[k[h++],k[h++],k[h]];else{var r=[q[++f],q[++f],q[++f]];for(h=j;k>=h;h++)o[h]=r}}}else{var s=d.firstChar;if(l=a.get("Widths")){for(h=s,f=0,g=l.length;g>f;f++)m[h++]=l[f];n=parseFloat(c.get("MissingWidth"))||0}else{
// Trying get the BaseFont metrics (see comment above).
var t=a.get("BaseFont");if(M(t)){var u=this.getBaseFontMetrics(t.name);m=this.buildCharCodeToWidth(u.widths,d),n=u.defaultWidth}}}
// Heuristic: detection of monospace font by checking all non-zero widths
var v=!0,w=n;for(var x in m){var y=m[x];if(y)if(w){if(w!==y){v=!1;break}}else w=y}v&&(d.flags|=Z.FixedPitch),d.defaultWidth=n,d.widths=m,d.defaultVMetrics=e,d.vmetrics=o},isSerifFont:function(a){
// Simulating descriptor flags attribute
var b=a.split("-")[0];return b in ra()||-1!==b.search(/serif/gi)},getBaseFontMetrics:function(a){var b=0,c=[],d=!1,e=qa(),f=e[a]||a,g=ia();f in g||(
// Use default fonts for looking up font metrics if the passed
// font is not a base font
f=this.isSerifFont(a)?"Times-Roman":"Helvetica");var h=g[f];return E(h)?(b=h,d=!0):c=h(),{defaultWidth:b,monospace:d,widths:c}},buildCharCodeToWidth:function(a,b){for(var c=Object.create(null),d=b.differences,e=b.defaultEncoding,f=0;256>f;f++)f in d&&a[d[f]]?c[f]=a[d[f]]:f in e&&a[e[f]]&&(c[f]=a[e[f]]);return c},preEvaluateFont:function(a,b){var c=a,d=a.get("Subtype");z(M(d),"invalid font Subtype");var e,f=!1;if("Type0"===d.name){
// If font is a composite
//  - get the descendant font
//  - set the type according to the descendant font
//  - get the FontDescriptor from the descendant font
var g=a.get("DescendantFonts");g||B("Descendant fonts are not specified"),a=D(g)?b.fetchIfRef(g[0]):g,d=a.get("Subtype"),z(M(d),"invalid font Subtype"),f=!0}var h=a.get("FontDescriptor");if(h){var i=new X,j=c.getRaw("Encoding");if(M(j))i.update(j.name);else if(N(j))i.update(j.num+"_"+j.gen);else if(L(j))for(var k=j.getKeys(),l=0,m=k.length;m>l;l++){var n=j.getRaw(k[l]);M(n)?i.update(n.name):N(n)?i.update(n.num+"_"+n.gen):D(n)&&// 'Differences' entry.
// Ideally we should check the contents of the array, but to avoid
// parsing it here and then again in |extractDataStructures|,
// we only use the array length for now (fixes bug1157493.pdf).
i.update(n.length.toString())}var o=a.get("ToUnicode")||c.get("ToUnicode");if(O(o)){var p=o.str||o;e=p.buffer?new Uint8Array(p.buffer.buffer,0,p.bufferLength):new Uint8Array(p.bytes.buffer,p.start,p.end-p.start),i.update(e)}else M(o)&&i.update(o.name);var q=a.get("Widths")||c.get("Widths");q&&(e=new Uint8Array(new Uint32Array(q).buffer),i.update(e))}return{descriptor:h,dict:a,baseDict:c,composite:f,type:d.name,hash:i?i.hexdigest():""}},translateFont:function(a,b){var c,d=a.baseDict,e=a.dict,f=a.composite,g=a.descriptor,h=a.type,i=f?65535:255,j=this.options.cMapOptions;if(!g){if("Type3"!==h){
// Before PDF 1.5 if the font was one of the base 14 fonts, having a
// FontDescriptor was not required.
// This case is here for compatibility.
var k=e.get("BaseFont");M(k)||B("Base font is not specified"),
// Using base font name as a font name.
k=k.name.replace(/[,_]/g,"-");var l=this.getBaseFontMetrics(k),m=k.split("-")[0],n=(this.isSerifFont(m)?Z.Serif:0)|(l.monospace?Z.FixedPitch:0)|(sa()[m]?Z.Symbolic:Z.Nonsymbolic);return c={type:h,name:k,widths:l.widths,defaultWidth:l.defaultWidth,flags:n,firstChar:0,lastChar:i},this.extractDataStructures(e,e,b,c).then(function(a){return a.widths=this.buildCharCodeToWidth(l.widths,a),new $(k,null,a)}.bind(this))}g=new I(null),g.set("FontName",J.get(h)),g.set("FontBBox",e.getArray("FontBBox"))}
// According to the spec if 'FontDescriptor' is declared, 'FirstChar',
// 'LastChar' and 'Widths' should exist too, but some PDF encoders seem
// to ignore this rule when a variant of a standart font is used.
// TODO Fill the width array depending on which of the base font this is
// a variant.
var o=e.get("FirstChar")||0,p=e.get("LastChar")||i,q=g.get("FontName"),r=e.get("BaseFont");if(
// Some bad PDFs have a string as the font name.
F(q)&&(q=J.get(q)),F(r)&&(r=J.get(r)),"Type3"!==h){var t=q&&q.name,u=r&&r.name;t!==u&&(C("The FontDescriptor's FontName is \""+t+'" but should be the same as the Font\'s BaseFont "'+u+'"'),
// Workaround for cases where e.g. fontNameStr = 'Arial' and
// baseFontStr = 'Arial,Bold' (needed when no font file is embedded).
t&&u&&0===u.indexOf(t)&&(q=r))}q=q||r,z(M(q),"invalid font name");var v=g.get("FontFile","FontFile2","FontFile3");if(v&&v.dict){var w=v.dict.get("Subtype");w&&(w=w.name);var x=v.dict.get("Length1"),y=v.dict.get("Length2"),A=v.dict.get("Length3")}c={type:h,name:q.name,subtype:w,file:v,length1:x,length2:y,length3:A,loadedName:d.loadedName,composite:f,wideChars:f,fixedPitch:!1,fontMatrix:e.getArray("FontMatrix")||s,firstChar:o||0,lastChar:p||i,bbox:g.getArray("FontBBox"),ascent:g.get("Ascent"),descent:g.get("Descent"),xHeight:g.get("XHeight"),capHeight:g.get("CapHeight"),flags:g.get("Flags"),italicAngle:g.get("ItalicAngle"),coded:!1};var D;if(f){var E=d.get("Encoding");M(E)&&(c.cidEncoding=E.name),D=ga.create(E,j,null).then(function(a){c.cMap=a,c.vertical=c.cMap.vertical})}else D=Promise.resolve(void 0);return D.then(function(){return this.extractDataStructures(e,d,b,c)}.bind(this)).then(function(a){return this.extractWidths(e,b,g,a),"Type3"===h&&(a.isType3Font=!0),new $(q.name,v,a)}.bind(this))}},b}(),ya=function(){function a(a,b,c){this.loadedName=a,this.font=b,this.dict=c,this.type3Loaded=null,this.sent=!1}return a.prototype={send:function(a){if(!this.sent){var b=this.font.exportData();a.send("commonobj",[this.loadedName,"Font",b]),this.sent=!0}},loadType3Data:function(a,b,c,d){if(z(this.font.isType3Font),this.type3Loaded)return this.type3Loaded;for(var e=this.font,f=Promise.resolve(),g=this.dict.get("CharProcs"),h=this.dict.get("Resources")||b,i=g.getKeys(),j=Object.create(null),k=0,l=i.length;l>k;++k)f=f.then(function(b){var e=g.get(b),f=new za;return a.getOperatorList(e,d,h,f).then(function(){j[b]=f.getIR(),
// Add the dependencies to the parent operator list so they are
// resolved before sub operator list is executed synchronously.
c.addDependencies(f.dependencies)},function(a){H('Type3 font resource "'+b+'" is not available');var c=new za;j[b]=c.getIR()})}.bind(this,i[k]));return this.type3Loaded=f.then(function(){e.charProcOperatorList=j}),this.type3Loaded}},a}(),za=function(){// close to chunk size
function a(a){for(var b=[],c=a.fnArray,d=a.argsArray,e=0,f=a.length;f>e;e++)switch(c[e]){case w.paintInlineImageXObject:case w.paintInlineImageXObjectGroup:case w.paintImageMaskXObject:var g=d[e][0];// first param in imgData
g.cached||b.push(g.data.buffer)}return b}function b(a,b,c){this.messageHandler=b,this.fnArray=[],this.argsArray=[],this.dependencies=Object.create(null),this._totalLength=0,this.pageIndex=c,this.intent=a}var c=1e3,d=c-5;return b.prototype={get length(){return this.argsArray.length},/**
     * @returns {number} The total length of the entire operator list,
     *                   since `this.length === 0` after flushing.
     */
get totalLength(){return this._totalLength+this.length},addOp:function(a,b){this.fnArray.push(a),this.argsArray.push(b),this.messageHandler&&(this.fnArray.length>=c?this.flush():this.fnArray.length>=d&&(a===w.restore||a===w.endText)&&
// heuristic to flush on boundary of restore or endText
this.flush())},addDependency:function(a){a in this.dependencies||(this.dependencies[a]=!0,this.addOp(w.dependency,[a]))},addDependencies:function(a){for(var b in a)this.addDependency(b)},addOpList:function(a){y.extendObj(this.dependencies,a.dependencies);for(var b=0,c=a.length;c>b;b++)this.addOp(a.fnArray[b],a.argsArray[b])},getIR:function(){return{fnArray:this.fnArray,argsArray:this.argsArray,length:this.length}},flush:function(b){"oplist"!==this.intent&&(new Ea).optimize(this);var c=a(this),d=this.length;this._totalLength+=d,this.messageHandler.send("RenderPageChunk",{operatorList:{fnArray:this.fnArray,argsArray:this.argsArray,lastChunk:b,length:d},pageIndex:this.pageIndex,intent:this.intent},c),this.dependencies=Object.create(null),this.fnArray.length=0,this.argsArray.length=0}},b}(),Aa=function(){function a(a){this.state=a,this.stateStack=[]}return a.prototype={save:function(){var a=this.state;this.stateStack.push(this.state),this.state=a.clone()},restore:function(){var a=this.stateStack.pop();a&&(this.state=a)},transform:function(a){this.state.ctm=y.transform(this.state.ctm,a)}},a}(),Ba=function(){function a(){this.ctm=new Float32Array(t),this.fontSize=0,this.font=null,this.fontMatrix=s,this.textMatrix=t.slice(),this.textLineMatrix=t.slice(),this.charSpacing=0,this.wordSpacing=0,this.leading=0,this.textHScale=1,this.textRise=0}return a.prototype={setTextMatrix:function(a,b,c,d,e,f){var g=this.textMatrix;g[0]=a,g[1]=b,g[2]=c,g[3]=d,g[4]=e,g[5]=f},setTextLineMatrix:function(a,b,c,d,e,f){var g=this.textLineMatrix;g[0]=a,g[1]=b,g[2]=c,g[3]=d,g[4]=e,g[5]=f},translateTextMatrix:function(a,b){var c=this.textMatrix;c[4]=c[0]*a+c[2]*b+c[4],c[5]=c[1]*a+c[3]*b+c[5]},translateTextLineMatrix:function(a,b){var c=this.textLineMatrix;c[4]=c[0]*a+c[2]*b+c[4],c[5]=c[1]*a+c[3]*b+c[5]},calcRenderMatrix:function(a){
// 9.4.4 Text Space Details
var b=[this.fontSize*this.textHScale,0,0,this.fontSize,0,this.textRise];return y.transform(a,y.transform(this.textMatrix,b))},carriageReturn:function(){this.translateTextLineMatrix(0,-this.leading),this.textMatrix=this.textLineMatrix.slice()},clone:function(){var a=Object.create(this);return a.textMatrix=this.textMatrix.slice(),a.textLineMatrix=this.textLineMatrix.slice(),a.fontMatrix=this.fontMatrix.slice(),a}},a}(),Ca=function(){function a(){this.ctm=new Float32Array(t),this.font=null,this.textRenderingMode=x.FILL,this.fillColorSpace=W.singletons.gray,this.strokeColorSpace=W.singletons.gray}return a.prototype={clone:function(){return Object.create(this)}},a}(),Da=function(){function a(a,c,d){this.opMap=b(),
// TODO(mduan): pass array of knownCommands rather than this.opMap
// dictionary
this.parser=new T(new S(a,this.opMap),!1,c),this.stateManager=d,this.nonProcessedArgs=[]}
// Specifies properties for each command
//
// If variableArgs === true: [0, `numArgs`] expected
// If variableArgs === false: exactly `numArgs` expected
var b=G(function(a){
// Graphic state
a.w={id:w.setLineWidth,numArgs:1,variableArgs:!1},a.J={id:w.setLineCap,numArgs:1,variableArgs:!1},a.j={id:w.setLineJoin,numArgs:1,variableArgs:!1},a.M={id:w.setMiterLimit,numArgs:1,variableArgs:!1},a.d={id:w.setDash,numArgs:2,variableArgs:!1},a.ri={id:w.setRenderingIntent,numArgs:1,variableArgs:!1},a.i={id:w.setFlatness,numArgs:1,variableArgs:!1},a.gs={id:w.setGState,numArgs:1,variableArgs:!1},a.q={id:w.save,numArgs:0,variableArgs:!1},a.Q={id:w.restore,numArgs:0,variableArgs:!1},a.cm={id:w.transform,numArgs:6,variableArgs:!1},
// Path
a.m={id:w.moveTo,numArgs:2,variableArgs:!1},a.l={id:w.lineTo,numArgs:2,variableArgs:!1},a.c={id:w.curveTo,numArgs:6,variableArgs:!1},a.v={id:w.curveTo2,numArgs:4,variableArgs:!1},a.y={id:w.curveTo3,numArgs:4,variableArgs:!1},a.h={id:w.closePath,numArgs:0,variableArgs:!1},a.re={id:w.rectangle,numArgs:4,variableArgs:!1},a.S={id:w.stroke,numArgs:0,variableArgs:!1},a.s={id:w.closeStroke,numArgs:0,variableArgs:!1},a.f={id:w.fill,numArgs:0,variableArgs:!1},a.F={id:w.fill,numArgs:0,variableArgs:!1},a["f*"]={id:w.eoFill,numArgs:0,variableArgs:!1},a.B={id:w.fillStroke,numArgs:0,variableArgs:!1},a["B*"]={id:w.eoFillStroke,numArgs:0,variableArgs:!1},a.b={id:w.closeFillStroke,numArgs:0,variableArgs:!1},a["b*"]={id:w.closeEOFillStroke,numArgs:0,variableArgs:!1},a.n={id:w.endPath,numArgs:0,variableArgs:!1},
// Clipping
a.W={id:w.clip,numArgs:0,variableArgs:!1},a["W*"]={id:w.eoClip,numArgs:0,variableArgs:!1},
// Text
a.BT={id:w.beginText,numArgs:0,variableArgs:!1},a.ET={id:w.endText,numArgs:0,variableArgs:!1},a.Tc={id:w.setCharSpacing,numArgs:1,variableArgs:!1},a.Tw={id:w.setWordSpacing,numArgs:1,variableArgs:!1},a.Tz={id:w.setHScale,numArgs:1,variableArgs:!1},a.TL={id:w.setLeading,numArgs:1,variableArgs:!1},a.Tf={id:w.setFont,numArgs:2,variableArgs:!1},a.Tr={id:w.setTextRenderingMode,numArgs:1,variableArgs:!1},a.Ts={id:w.setTextRise,numArgs:1,variableArgs:!1},a.Td={id:w.moveText,numArgs:2,variableArgs:!1},a.TD={id:w.setLeadingMoveText,numArgs:2,variableArgs:!1},a.Tm={id:w.setTextMatrix,numArgs:6,variableArgs:!1},a["T*"]={id:w.nextLine,numArgs:0,variableArgs:!1},a.Tj={id:w.showText,numArgs:1,variableArgs:!1},a.TJ={id:w.showSpacedText,numArgs:1,variableArgs:!1},a["'"]={id:w.nextLineShowText,numArgs:1,variableArgs:!1},a['"']={id:w.nextLineSetSpacingShowText,numArgs:3,variableArgs:!1},
// Type3 fonts
a.d0={id:w.setCharWidth,numArgs:2,variableArgs:!1},a.d1={id:w.setCharWidthAndBounds,numArgs:6,variableArgs:!1},
// Color
a.CS={id:w.setStrokeColorSpace,numArgs:1,variableArgs:!1},a.cs={id:w.setFillColorSpace,numArgs:1,variableArgs:!1},a.SC={id:w.setStrokeColor,numArgs:4,variableArgs:!0},a.SCN={id:w.setStrokeColorN,numArgs:33,variableArgs:!0},a.sc={id:w.setFillColor,numArgs:4,variableArgs:!0},a.scn={id:w.setFillColorN,numArgs:33,variableArgs:!0},a.G={id:w.setStrokeGray,numArgs:1,variableArgs:!1},a.g={id:w.setFillGray,numArgs:1,variableArgs:!1},a.RG={id:w.setStrokeRGBColor,numArgs:3,variableArgs:!1},a.rg={id:w.setFillRGBColor,numArgs:3,variableArgs:!1},a.K={id:w.setStrokeCMYKColor,numArgs:4,variableArgs:!1},a.k={id:w.setFillCMYKColor,numArgs:4,variableArgs:!1},
// Shading
a.sh={id:w.shadingFill,numArgs:1,variableArgs:!1},
// Images
a.BI={id:w.beginInlineImage,numArgs:0,variableArgs:!1},a.ID={id:w.beginImageData,numArgs:0,variableArgs:!1},a.EI={id:w.endInlineImage,numArgs:1,variableArgs:!1},
// XObjects
a.Do={id:w.paintXObject,numArgs:1,variableArgs:!1},a.MP={id:w.markPoint,numArgs:1,variableArgs:!1},a.DP={id:w.markPointProps,numArgs:2,variableArgs:!1},a.BMC={id:w.beginMarkedContent,numArgs:1,variableArgs:!1},a.BDC={id:w.beginMarkedContentProps,numArgs:2,variableArgs:!1},a.EMC={id:w.endMarkedContent,numArgs:0,variableArgs:!1},
// Compatibility
a.BX={id:w.beginCompat,numArgs:0,variableArgs:!1},a.EX={id:w.endCompat,numArgs:0,variableArgs:!1},
// (reserved partial commands for the lexer)
a.BM=null,a.BD=null,a["true"]=null,a.fa=null,a.fal=null,a.fals=null,a["false"]=null,a.nu=null,a.nul=null,a["null"]=null});return a.prototype={get savedStatesDepth(){return this.stateManager.stateStack.length},
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
read:function(a){for(var b=a.args;;){var c=this.parser.getObj();if(K(c)){var d=c.cmd,e=this.opMap[d];if(!e){H('Unknown command "'+d+'"');continue}var f=e.id,g=e.numArgs,h=null!==b?b.length:0;if(e.variableArgs)h>g&&C("Command "+f+": expected [0,"+g+"] args, but received "+h+" args");else{
// Postscript commands can be nested, e.g. /F2 /GS2 gs 5.711 Tf
if(h!==g){for(var i=this.nonProcessedArgs;h>g;)i.push(b.shift()),h--;for(;g>h&&0!==i.length;)b||(b=[]),b.unshift(i.pop()),h++}if(g>h){
// If we receive too few args, it's not possible to possible
// to execute the command, so skip the command
C("Command "+f+": because expected "+g+" args, but received "+h+" args; skipping"),b=null;continue}}
// TODO figure out how to type-check vararg functions
return this.preprocessCommand(f,b),a.fn=f,a.args=b,!0}if(U(c))return!1;
// argument
null!==c&&(b||(b=[]),b.push(c),z(b.length<=33,"Too many arguments"))}},preprocessCommand:function(a,b){switch(0|a){case w.save:this.stateManager.save();break;case w.restore:this.stateManager.restore();break;case w.transform:this.stateManager.transform(b)}}},a}(),Ea=function(){function a(a,b,c){for(var d=a,e=0,f=b.length-1;f>e;e++){var g=b[e];d=d[g]||(d[g]=[])}d[b[b.length-1]]=c}function b(a,b,c,d){for(var e=a+2,f=0;b>f;f++){var g=d[e+4*f],h=1===g.length&&g[0];if(!h||1!==h.width||1!==h.height||h.data.length&&(1!==h.data.length||0!==h.data[0]))break;c[e+4*f]=w.paintSolidColorImageMask}return b-f}function c(){}var d=[];
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
return a(d,[w.save,w.transform,w.paintInlineImageXObject,w.restore],function(a){for(var b=10,c=200,d=1e3,e=1,f=a.fnArray,g=a.argsArray,h=a.iCurr,i=h-3,j=h-2,k=h-1,l=i+4,m=f.length;m>l+3&&f[l]===w.save&&f[l+1]===w.transform&&f[l+2]===w.paintInlineImageXObject&&f[l+3]===w.restore;)l+=4;
// At this point, i is the index of the first op past the last valid
// quartet.
var n=Math.min((l-i)/4,c);if(b>n)return l;
// assuming that heights of those image is too small (~1 pixel)
// packing as much as possible by lines
var o,p=0,q=[],r=0,s=e,t=e;for(o=0;n>o;o++){var u=g[j+(o<<2)],x=g[k+(o<<2)][0];s+x.width>d&&(p=Math.max(p,s),t+=r+2*e,s=0,r=0),q.push({transform:u,x:s,y:t,w:x.width,h:x.height}),s+=x.width+2*e,r=Math.max(r,x.height)}var y=Math.max(p,s)+e,z=t+r+e,A=new Uint8Array(y*z*4),B=y<<2;for(o=0;n>o;o++){var C=g[k+(o<<2)][0].data,D=q[o].w<<2,E=0,F=q[o].x+q[o].y*y<<2;A.set(C.subarray(0,D),F-B);for(var G=0,H=q[o].h;H>G;G++)A.set(C.subarray(E,E+D),F),E+=D,F+=B;for(A.set(C.subarray(E-D,E),F);F>=0;)C[F-4]=C[F],C[F-3]=C[F+1],C[F-2]=C[F+2],C[F-1]=C[F+3],C[F+D]=C[F+D-4],C[F+D+1]=C[F+D-3],C[F+D+2]=C[F+D-2],C[F+D+3]=C[F+D-1],F-=B}
// Replace queue items.
return f.splice(i,4*n,w.paintInlineImageXObjectGroup),g.splice(i,4*n,[{width:y,height:z,kind:v.RGBA_32BPP,data:A},q]),i+1}),a(d,[w.save,w.transform,w.paintImageMaskXObject,w.restore],function(a){for(var c=10,d=100,e=1e3,f=a.fnArray,g=a.argsArray,h=a.iCurr,i=h-3,j=h-2,k=h-1,l=i+4,m=f.length;m>l+3&&f[l]===w.save&&f[l+1]===w.transform&&f[l+2]===w.paintImageMaskXObject&&f[l+3]===w.restore;)l+=4;
// At this point, i is the index of the first op past the last valid
// quartet.
var n=(l-i)/4;if(n=b(i,n,f,g),c>n)return l;var o,p,q,r=!1,s=g[k][0];if(0===g[j][1]&&0===g[j][2]){r=!0;var t=g[j][0],u=g[j][3];p=j+4;var v=k+4;for(o=1;n>o;o++,p+=4,v+=4)if(q=g[p],g[v][0]!==s||q[0]!==t||0!==q[1]||0!==q[2]||q[3]!==u){c>o?r=!1:n=o;break}}if(r){n=Math.min(n,e);var x=new Float32Array(2*n);for(p=j,o=0;n>o;o++,p+=4)q=g[p],x[o<<1]=q[4],x[(o<<1)+1]=q[5];
// Replace queue items.
f.splice(i,4*n,w.paintImageMaskXObjectRepeat),g.splice(i,4*n,[s,t,u,x])}else{n=Math.min(n,d);var y=[];for(o=0;n>o;o++){q=g[j+(o<<2)];var z=g[k+(o<<2)][0];y.push({data:z.data,width:z.width,height:z.height,transform:q})}
// Replace queue items.
f.splice(i,4*n,w.paintImageMaskXObjectGroup),g.splice(i,4*n,[y])}return i+1}),a(d,[w.save,w.transform,w.paintImageXObject,w.restore],function(a){var b=3,c=1e3,d=a.fnArray,e=a.argsArray,f=a.iCurr,g=f-3,h=f-2,i=f-1,j=f;if(0!==e[h][1]||0!==e[h][2])return j+1;for(
// Look for the quartets.
var k=e[i][0],l=e[h][0],m=e[h][3],n=g+4,o=d.length;o>n+3&&d[n]===w.save&&d[n+1]===w.transform&&d[n+2]===w.paintImageXObject&&d[n+3]===w.restore&&e[n+1][0]===l&&0===e[n+1][1]&&0===e[n+1][2]&&e[n+1][3]===m&&e[n+2][0]===k;)n+=4;
// At this point, i is the index of the first op past the last valid
// quartet.
var p=Math.min((n-g)/4,c);if(b>p)return n;for(var q=new Float32Array(2*p),r=h,s=0;p>s;s++,r+=4){var t=e[r];q[s<<1]=t[4],q[(s<<1)+1]=t[5]}
// Replace queue items.
var u=[k,l,m,q];return d.splice(g,4*p,w.paintImageXObjectRepeat),e.splice(g,4*p,u),g+1}),a(d,[w.beginText,w.setFont,w.setTextMatrix,w.showText,w.endText],function(a){for(var b=3,c=1e3,d=a.fnArray,e=a.argsArray,f=a.iCurr,g=f-4,h=f-3,i=f-2,j=f-1,k=f,l=e[h][0],m=e[h][1],n=g+5,o=d.length;o>n+4&&d[n]===w.beginText&&d[n+1]===w.setFont&&d[n+2]===w.setTextMatrix&&d[n+3]===w.showText&&d[n+4]===w.endText&&e[n+1][0]===l&&e[n+1][1]===m;)n+=5;
// At this point, i is the index of the first op past the last valid
// quintet.
var p=Math.min((n-g)/5,c);if(b>p)return n;
// If the preceding quintet is (<something>, setFont, setTextMatrix,
// showText, endText), include that as well. (E.g. <something> might be
// |dependency|.)
var q=g;g>=4&&d[g-4]===d[h]&&d[g-3]===d[i]&&d[g-2]===d[j]&&d[g-1]===d[k]&&e[g-4][0]===l&&e[g-4][1]===m&&(p++,q-=5);for(var r=q+4,s=1;p>s;s++)d.splice(r,3),e.splice(r,3),r+=2;return r+1}),c.prototype={optimize:function(a){for(var b,c=a.fnArray,e=a.argsArray,f={iCurr:0,fnArray:c,argsArray:e},g=0,h=c.length;h>g;)b=(b||d)[c[g]],"function"==typeof b?(f.iCurr=g,g=b(f),b=void 0,h=f.fnArray.length):g++}},c}();a.OperatorList=za,a.PartialEvaluator=xa}),function(a,b){b(a.pdfjsCoreAnnotation={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream,a.pdfjsCoreColorSpace,a.pdfjsCoreObj,a.pdfjsCoreEvaluator)}(this,function(a,b,c,d,e,f,g){/**
 * @class
 * @alias AnnotationFactory
 */
function h(){}var i=b.AnnotationBorderStyleType,j=b.AnnotationFlag,k=b.AnnotationType,l=b.OPS,m=b.Util,n=b.isBool,o=b.isString,p=b.isArray,q=b.isInt,r=b.isValidUrl,s=b.stringToBytes,t=b.stringToPDFString,u=b.stringToUTF8String,v=b.warn,w=c.Dict,x=c.isDict,y=c.isName,z=d.Stream,A=e.ColorSpace,B=f.ObjectLoader,C=f.FileSpec,D=g.OperatorList;h.prototype=/** @lends AnnotationFactory.prototype */{/**
   * @param {XRef} xref
   * @param {Object} ref
   * @returns {Annotation}
   */
create:function(a,b){var c=a.fetchIfRef(b);if(x(c)){
// Determine the annotation's subtype.
var d=c.get("Subtype");d=y(d)?d.name:"";
// Return the right annotation object based on the subtype and field type.
var e={xref:a,dict:c,ref:b};switch(d){case"Link":return new J(e);case"Text":return new I(e);case"Widget":var f=m.getInheritableProperty(c,"FT");return y(f)&&"Tx"===f.name?new H(e):new G(e);case"Popup":return new K(e);case"Highlight":return new L(e);case"Underline":return new M(e);case"Squiggly":return new N(e);case"StrikeOut":return new O(e);case"FileAttachment":return new P(e);default:return v('Unimplemented annotation type "'+d+'", falling back to base annotation'),new E(e)}}}};var E=function(){
// 12.5.5: Algorithm: Appearance streams
function a(a,b,c){var d=m.getAxialAlignedBoundingBox(b,c),e=d[0],f=d[1],g=d[2],h=d[3];if(e===g||f===h)
// From real-life file, bbox was [0, 0, 0, 0]. In this case,
// just apply the transform for rect
return[1,0,0,1,a[0],a[1]];var i=(a[2]-a[0])/(g-e),j=(a[3]-a[1])/(h-f);return[i,0,0,j,a[0]-e*i,a[1]-f*j]}function b(a){var b=a.get("AP");if(x(b)){var c,d=b.get("N");if(x(d)){var e=a.get("AS");e&&d.has(e.name)&&(c=d.get(e.name))}else c=d;return c}}function c(a){var c=a.dict;this.setFlags(c.get("F")),this.setRectangle(c.getArray("Rect")),this.setColor(c.getArray("C")),this.setBorderStyle(c),this.appearance=b(c),
// Expose public properties using a data object.
this.data={},this.data.id=a.ref.toString(),this.data.subtype=c.get("Subtype").name,this.data.annotationFlags=this.flags,this.data.rect=this.rectangle,this.data.color=this.color,this.data.borderStyle=this.borderStyle,this.data.hasAppearance=!!this.appearance}return c.prototype={/**
     * @return {boolean}
     */
get viewable(){return this.flags?!this.hasFlag(j.INVISIBLE)&&!this.hasFlag(j.HIDDEN)&&!this.hasFlag(j.NOVIEW):!0},/**
     * @return {boolean}
     */
get printable(){return this.flags?this.hasFlag(j.PRINT)&&!this.hasFlag(j.INVISIBLE)&&!this.hasFlag(j.HIDDEN):!1},/**
     * Set the flags.
     *
     * @public
     * @memberof Annotation
     * @param {number} flags - Unsigned 32-bit integer specifying annotation
     *                         characteristics
     * @see {@link shared/util.js}
     */
setFlags:function(a){q(a)?this.flags=a:this.flags=0},/**
     * Check if a provided flag is set.
     *
     * @public
     * @memberof Annotation
     * @param {number} flag - Hexadecimal representation for an annotation
     *                        characteristic
     * @return {boolean}
     * @see {@link shared/util.js}
     */
hasFlag:function(a){return this.flags?(this.flags&a)>0:!1},/**
     * Set the rectangle.
     *
     * @public
     * @memberof Annotation
     * @param {Array} rectangle - The rectangle array with exactly four entries
     */
setRectangle:function(a){p(a)&&4===a.length?this.rectangle=m.normalizeRect(a):this.rectangle=[0,0,0,0]},/**
     * Set the color and take care of color space conversion.
     *
     * @public
     * @memberof Annotation
     * @param {Array} color - The color array containing either 0
     *                        (transparent), 1 (grayscale), 3 (RGB) or
     *                        4 (CMYK) elements
     */
setColor:function(a){var b=new Uint8Array(3);// Black in RGB color space (default)
if(!p(a))return void(this.color=b);switch(a.length){case 0:// Transparent, which we indicate with a null value
this.color=null;break;case 1:// Convert grayscale to RGB
A.singletons.gray.getRgbItem(a,0,b,0),this.color=b;break;case 3:// Convert RGB percentages to RGB
A.singletons.rgb.getRgbItem(a,0,b,0),this.color=b;break;case 4:// Convert CMYK to RGB
A.singletons.cmyk.getRgbItem(a,0,b,0),this.color=b;break;default:this.color=b}},/**
     * Set the border style (as AnnotationBorderStyle object).
     *
     * @public
     * @memberof Annotation
     * @param {Dict} borderStyle - The border style dictionary
     */
setBorderStyle:function(a){if(this.borderStyle=new F,x(a))if(a.has("BS")){var b,c=a.get("BS");(!c.has("Type")||y(b=c.get("Type"))&&"Border"===b.name)&&(this.borderStyle.setWidth(c.get("W")),this.borderStyle.setStyle(c.get("S")),this.borderStyle.setDashArray(c.getArray("D")))}else if(a.has("Border")){var d=a.getArray("Border");p(d)&&d.length>=3&&(this.borderStyle.setHorizontalCornerRadius(d[0]),this.borderStyle.setVerticalCornerRadius(d[1]),this.borderStyle.setWidth(d[2]),4===d.length&&// Dash array available
this.borderStyle.setDashArray(d[3]))}else
// There are no border entries in the dictionary. According to the
// specification, we should draw a solid border of width 1 in that
// case, but Adobe Reader did not implement that part of the
// specification and instead draws no border at all, so we do the same.
// See also https://github.com/mozilla/pdf.js/issues/6179.
this.borderStyle.setWidth(0)},/**
     * Prepare the annotation for working with a popup in the display layer.
     *
     * @private
     * @memberof Annotation
     * @param {Dict} dict - The annotation's data dictionary
     */
_preparePopup:function(a){a.has("C")||(
// Fall back to the default background color.
this.data.color=null),this.data.hasPopup=a.has("Popup"),this.data.title=t(a.get("T")||""),this.data.contents=t(a.get("Contents")||"")},loadResources:function(a){return new Promise(function(b,c){this.appearance.dict.getAsync("Resources").then(function(d){if(!d)return void b();var e=new B(d.map,a,d.xref);e.load().then(function(){b(d)},c)},c)}.bind(this))},getOperatorList:function(b,c){if(!this.appearance)return Promise.resolve(new D);var d=this.data,e=this.appearance.dict,f=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),g=e.getArray("BBox")||[0,0,1,1],h=e.getArray("Matrix")||[1,0,0,1,0,0],i=a(d.rect,g,h),j=this;return f.then(function(a){var e=new D;return e.addOp(l.beginAnnotation,[d.rect,i,h]),b.getOperatorList(j.appearance,c,a,e).then(function(){return e.addOp(l.endAnnotation,[]),j.appearance.reset(),e})})}},c.appendToOperatorList=function(a,b,c,d,e){for(var f=[],g=0,h=a.length;h>g;++g)("display"===e&&a[g].viewable||"print"===e&&a[g].printable)&&f.push(a[g].getOperatorList(c,d));return Promise.all(f).then(function(a){b.addOp(l.beginAnnotations,[]);for(var c=0,d=a.length;d>c;++c)b.addOpList(a[c]);b.addOp(l.endAnnotations,[])})},c}(),F=function(){/**
   * @constructor
   * @private
   */
function a(){this.width=1,this.style=i.SOLID,this.dashArray=[3],this.horizontalCornerRadius=0,this.verticalCornerRadius=0}return a.prototype={/**
     * Set the width.
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {integer} width - The width
     */
setWidth:function(a){a===(0|a)&&(this.width=a)},/**
     * Set the style.
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {Object} style - The style object
     * @see {@link shared/util.js}
     */
setStyle:function(a){if(a)switch(a.name){case"S":this.style=i.SOLID;break;case"D":this.style=i.DASHED;break;case"B":this.style=i.BEVELED;break;case"I":this.style=i.INSET;break;case"U":this.style=i.UNDERLINE}},/**
     * Set the dash array.
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {Array} dashArray - The dash array with at least one element
     */
setDashArray:function(a){
// We validate the dash array, but we do not use it because CSS does not
// allow us to change spacing of dashes. For more information, visit
// http://www.w3.org/TR/css3-background/#the-border-style.
if(p(a)&&a.length>0){for(var b=!0,c=!0,d=0,e=a.length;e>d;d++){var f=a[d],g=+f>=0;if(!g){b=!1;break}f>0&&(c=!1)}b&&!c?this.dashArray=a:this.width=0}else a&&(this.width=0)},/**
     * Set the horizontal corner radius (from a Border dictionary).
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {integer} radius - The horizontal corner radius
     */
setHorizontalCornerRadius:function(a){a===(0|a)&&(this.horizontalCornerRadius=a)},/**
     * Set the vertical corner radius (from a Border dictionary).
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {integer} radius - The vertical corner radius
     */
setVerticalCornerRadius:function(a){a===(0|a)&&(this.verticalCornerRadius=a)}},a}(),G=function(){function a(a){E.call(this,a);var b=a.dict,c=this.data;c.annotationType=k.WIDGET,c.fieldValue=t(m.getInheritableProperty(b,"V")||""),c.alternativeText=t(b.get("TU")||""),c.defaultAppearance=m.getInheritableProperty(b,"DA")||"";var d=m.getInheritableProperty(b,"FT");c.fieldType=y(d)?d.name:"",c.fieldFlags=m.getInheritableProperty(b,"Ff")||0,this.fieldResources=m.getInheritableProperty(b,"DR")||w.empty,
// Hide unsupported Widget signatures.
"Sig"===c.fieldType&&(v("unimplemented annotation type: Widget signature"),this.setFlags(j.HIDDEN));for(
// Building the full field name by collecting the field and
// its ancestors 'T' data and joining them using '.'.
var e=[],f=b,g=a.ref;f;){var h=f.get("Parent"),i=f.getRaw("Parent"),l=f.get("T");if(l)e.unshift(t(l));else if(h&&g){
// The field name is absent, that means more than one field
// with the same name may exist. Replacing the empty name
// with the '`' plus index in the parent's 'Kids' array.
// This is not in the PDF spec but necessary to id the
// the input controls.
var n,o,p=h.get("Kids");for(n=0,o=p.length;o>n;n++){var q=p[n];if(q.num===g.num&&q.gen===g.gen)break}e.unshift("`"+n)}f=h,g=i}c.fullName=e.join(".")}return m.inherit(a,E,{}),a}(),H=function(){function a(a){G.call(this,a),this.data.textAlignment=m.getInheritableProperty(a.dict,"Q")}return m.inherit(a,G,{getOperatorList:function(a,b){if(this.appearance)return E.prototype.getOperatorList.call(this,a,b);var c=new D,d=this.data;
// Even if there is an appearance stream, ignore it. This is the
// behaviour used by Adobe Reader.
if(!d.defaultAppearance)return Promise.resolve(c);var e=new z(s(d.defaultAppearance));return a.getOperatorList(e,b,this.fieldResources,c).then(function(){return c})}}),a}(),I=function(){// px
function a(a){E.call(this,a),this.data.annotationType=k.TEXT,this.data.hasAppearance?this.data.name="NoIcon":(this.data.rect[1]=this.data.rect[3]-b,this.data.rect[2]=this.data.rect[0]+b,this.data.name=a.dict.has("Name")?a.dict.get("Name").name:"Note"),this._preparePopup(a.dict)}var b=22;return m.inherit(a,E,{}),a}(),J=function(){function a(a){E.call(this,a);var d=a.dict,e=this.data;e.annotationType=k.LINK;var f,g,h=d.get("A");if(h&&x(h)){var i=h.get("S").name;switch(i){case"URI":e.type="URI",f=h.get("URI"),
// check for ghsts links
0===f.indexOf("ghsts://")&&(e.ghsts=f),y(f)?
// Some bad PDFs do not put parentheses around relative URLs.
f="/"+f.name:f&&(f=b(f));
// TODO: pdf spec mentions urls can be relative to a Base
// entry in the dictionary.
break;case"GoTo":e.type="GoTo",g=h.get("D");break;case"GoToR":e.type="GoToR";var j=h.get("F");x(j)?
// We assume that we found a FileSpec dictionary
// and fetch the URL without checking any further.
f=j.get("F")||null:o(j)&&(f=j);
// NOTE: the destination is relative to the *remote* document.
var l=h.get("D");if(l&&(y(l)&&(l=l.name),o(l)&&o(f))){var m=f.split("#")[0];f=m+"#"+l}
// The 'NewWindow' property, equal to `LinkTarget.BLANK`.
var p=h.get("NewWindow");n(p)&&(e.newWindow=p);break;case"Named":e.type="Named",e.action=h.get("N").name;break;default:v("unrecognized link type: "+i)}}else d.has("Dest")&&(// Simple destination link.
g=d.get("Dest"));if(f){
// we process GoToR links ourselves for GHSTS, so we allow relative links
var q=!1;"GoToR"===e.type&&(q=!0),r(f,q)&&(e.url=c(f))}g&&(e.dest=y(g)?g.name:g)}
// Lets URLs beginning with 'www.' default to using the 'http://' protocol.
function b(a){return o(a)&&0===a.indexOf("www.")?"http://"+a:a}function c(a){
// According to ISO 32000-1:2008, section 12.6.4.7, URIs should be encoded
// in 7-bit ASCII. Some bad PDFs use UTF-8 encoding, see Bugzilla 1122280.
try{return u(a)}catch(b){return a}}return m.inherit(a,E,{}),a}(),K=function(){function a(a){E.call(this,a),this.data.annotationType=k.POPUP;var b=a.dict,c=b.get("Parent");
// Fall back to the default background color.
return c?(this.data.parentId=b.getRaw("Parent").toString(),this.data.title=t(c.get("T")||""),this.data.contents=t(c.get("Contents")||""),void(c.has("C")?(this.setColor(c.getArray("C")),this.data.color=this.color):this.data.color=null)):void v("Popup annotation has a missing or invalid parent annotation.")}return m.inherit(a,E,{}),a}(),L=function(){function a(a){E.call(this,a),this.data.annotationType=k.HIGHLIGHT,this._preparePopup(a.dict),
// PDF viewers completely ignore any border styles.
this.data.borderStyle.setWidth(0)}return m.inherit(a,E,{}),a}(),M=function(){function a(a){E.call(this,a),this.data.annotationType=k.UNDERLINE,this._preparePopup(a.dict),
// PDF viewers completely ignore any border styles.
this.data.borderStyle.setWidth(0)}return m.inherit(a,E,{}),a}(),N=function(){function a(a){E.call(this,a),this.data.annotationType=k.SQUIGGLY,this._preparePopup(a.dict),
// PDF viewers completely ignore any border styles.
this.data.borderStyle.setWidth(0)}return m.inherit(a,E,{}),a}(),O=function(){function a(a){E.call(this,a),this.data.annotationType=k.STRIKEOUT,this._preparePopup(a.dict),
// PDF viewers completely ignore any border styles.
this.data.borderStyle.setWidth(0)}return m.inherit(a,E,{}),a}(),P=function(){function a(a){E.call(this,a);var b=new C(a.dict.get("FS"),a.xref);this.data.annotationType=k.FILEATTACHMENT,this.data.file=b.serializable,this._preparePopup(a.dict)}return m.inherit(a,E,{}),a}();a.Annotation=E,a.AnnotationBorderStyle=F,a.AnnotationFactory=h}),function(a,b){b(a.pdfjsCoreDocument={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCoreStream,a.pdfjsCoreObj,a.pdfjsCoreParser,a.pdfjsCoreCrypto,a.pdfjsCoreEvaluator,a.pdfjsCoreAnnotation)}(this,function(a,b,c,d,e,f,g,h,i){var j=b.MissingDataException,k=b.Util,l=b.assert,m=b.error,n=b.info,o=b.isArray,p=b.isArrayBuffer,q=b.isString,r=b.shadow,s=b.stringToBytes,t=b.stringToPDFString,u=b.warn,v=c.Dict,w=c.isDict,x=c.isName,y=c.isStream,z=d.NullStream,A=d.Stream,B=d.StreamsSequenceStream,C=e.Catalog,D=e.ObjectLoader,E=e.XRef,F=f.Lexer,G=f.Linearization,H=g.calculateMD5,I=h.OperatorList,J=h.PartialEvaluator,K=i.Annotation,L=i.AnnotationFactory,M=function(){function a(a,b,c,d,e,f){this.pdfManager=a,this.pageIndex=c,this.pageDict=d,this.xref=b,this.ref=e,this.fontCache=f,this.idCounters={obj:0},this.evaluatorOptions=a.evaluatorOptions,this.resourcesPromise=null}var b=[0,0,612,792];return a.prototype={getPageProp:function(a){return this.pageDict.get(a)},getInheritedPageProp:function(a){
// Always walk up the entire parent chain, to be able to find
// e.g. \Resources placed on multiple levels of the tree.
for(var b=this.pageDict,c=null,d=0,e=100;b;){var f=b.get(a);if(f&&(c||(c=[]),c.push(f)),++d>e){u("Page_getInheritedPageProp: maximum loop count exceeded.");break}b=b.get("Parent")}return c?1===c.length||!w(c[0])||d>e?c[0]:v.merge(this.xref,c):v.empty},get content(){return this.getPageProp("Contents")},get resources(){
// For robustness: The spec states that a \Resources entry has to be
// present, but can be empty. Some document omit it still, in this case
// we return an empty dictionary.
return r(this,"resources",this.getInheritedPageProp("Resources"))},get mediaBox(){var a=this.getInheritedPageProp("MediaBox");
// Reset invalid media box to letter size.
return o(a)&&4===a.length||(a=b),r(this,"mediaBox",a)},get view(){var a=this.mediaBox,b=this.getInheritedPageProp("CropBox");
// From the spec, 6th ed., p.963:
// "The crop, bleed, trim, and art boxes should not ordinarily
// extend beyond the boundaries of the media box. If they do, they are
// effectively reduced to their intersection with the media box."
return o(b)&&4===b.length?(b=k.intersect(b,a),b?r(this,"view",b):r(this,"view",a)):r(this,"view",a)},get rotate(){var a=this.getInheritedPageProp("Rotate")||0;
// Normalize rotation so it's a multiple of 90 and between 0 and 270
// The spec doesn't cover negatives, assume its counterclockwise
// rotation. The following is the other implementation of modulo.
return a%90!==0?a=0:a>=360?a%=360:0>a&&(a=(a%360+360)%360),r(this,"rotate",a)},getContentStream:function(){var a,b=this.content;if(o(b)){
// fetching items
var c,d=this.xref,e=b.length,f=[];for(c=0;e>c;++c)f.push(d.fetchIfRef(b[c]));a=new B(f)}else a=y(b)?b:new z;return a},loadResources:function(a){
// TODO: add async getInheritedPageProp and remove this.
return this.resourcesPromise||(this.resourcesPromise=this.pdfManager.ensure(this,"resources")),this.resourcesPromise.then(function(){var b=new D(this.resources.map,a,this.xref);return b.load()}.bind(this))},getOperatorList:function(a,b,c){var d=this,e=this.pdfManager,f=e.ensure(this,"getContentStream",[]),g=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),h=new J(e,this.xref,a,this.pageIndex,"p"+this.pageIndex+"_",this.idCounters,this.fontCache,this.evaluatorOptions),i=Promise.all([f,g]),j=i.then(function(e){var f=e[0],g=new I(c,a,d.pageIndex);return a.send("StartRenderPage",{transparency:h.hasBlendModes(d.resources),pageIndex:d.pageIndex,intent:c}),h.getOperatorList(f,b,d.resources,g).then(function(){return g})}),k=e.ensure(this,"annotations");return Promise.all([j,k]).then(function(a){var d=a[0],e=a[1];if(0===e.length)return d.flush(!0),d;var f=K.appendToOperatorList(e,d,h,b,c);return f.then(function(){return d.flush(!0),d})})},extractTextContent:function(a,b){var c={on:function(){},send:function(){}},d=this,e=this.pdfManager,f=e.ensure(this,"getContentStream",[]),g=this.loadResources(["ExtGState","XObject","Font"]),h=Promise.all([f,g]);return h.then(function(f){var g=f[0],h=new J(e,d.xref,c,d.pageIndex,"p"+d.pageIndex+"_",d.idCounters,d.fontCache,d.evaluatorOptions);/* stateManager = */
return h.getTextContent(g,a,d.resources,null,b)})},getAnnotationsData:function(a){for(var b=this.annotations,c=[],d=0,e=b.length;e>d;++d)(!a||"display"===a&&b[d].viewable||"print"===a&&b[d].printable)&&c.push(b[d].data);return c},get annotations(){for(var a=[],b=this.getInheritedPageProp("Annots")||[],c=new L,d=0,e=b.length;e>d;++d){var f=b[d],g=c.create(this.xref,f);g&&a.push(g)}return r(this,"annotations",a)}},a}(),N=function(){function a(a,c,d){y(c)?b.call(this,a,c,d):p(c)?b.call(this,a,new A(c),d):m("PDFDocument: Unknown argument type")}function b(a,b,c){l(b.length>0,"stream must have data"),this.pdfManager=a,this.stream=b;var d=new E(this.stream,c,a);this.xref=d}function c(a,b,c,d){var e=a.pos,f=a.end,g=[];e+c>f&&(c=f-e);for(var h=0;c>h;++h)g.push(String.fromCharCode(a.getByte()));var i=g.join("");a.pos=e;var j=d?i.lastIndexOf(b):i.indexOf(b);return-1===j?!1:(a.pos+=j,!0)}var d=1024,e="\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",f={get entries(){
// Lazily build this since all the validation functions below are not
// defined until after this file loads.
return r(this,"entries",{Title:q,Author:q,Subject:q,Keywords:q,Creator:q,Producer:q,CreationDate:q,ModDate:q,Trapped:x})}};return a.prototype={parse:function(a){this.setup(a);var b=this.catalog.catDict.get("Version");x(b)&&(this.pdfFormatVersion=b.name);try{if(
// checking if AcroForm is present
this.acroForm=this.catalog.catDict.get("AcroForm"),this.acroForm){this.xfa=this.acroForm.get("XFA");var c=this.acroForm.get("Fields");c&&o(c)&&0!==c.length||this.xfa||(
// no fields and no XFA -- not a form (?)
this.acroForm=null)}}catch(d){n("Something wrong with AcroForm entry"),this.acroForm=null}},get linearization(){var a=null;if(this.stream.length)try{a=G.create(this.stream)}catch(b){if(b instanceof j)throw b;n(b)}
// shadow the prototype getter with a data property
return r(this,"linearization",a)},get startXRef(){var a=this.stream,b=0,d=this.linearization;if(d)
// Find end of first obj.
a.reset(),c(a,"endobj",1024)&&(b=a.pos+6);else{for(
// Find startxref by jumping backward from the end of the file.
var e=1024,f=!1,g=a.end;!f&&g>0;)g-=e-"startxref".length,0>g&&(g=0),a.pos=g,f=c(a,"startxref",e,!0);if(f){a.skip(9);var h;do h=a.getByte();while(F.isSpace(h));for(var i="";h>=32&&57>=h;)i+=String.fromCharCode(h),h=a.getByte();b=parseInt(i,10),isNaN(b)&&(b=0)}}
// shadow the prototype getter with a data property
return r(this,"startXRef",b)},get mainXRefEntriesOffset(){var a=0,b=this.linearization;
// shadow the prototype getter with a data property
return b&&(a=b.mainXRefEntriesOffset),r(this,"mainXRefEntriesOffset",a)},
// Find the header, remove leading garbage and setup the stream
// starting from the header.
checkHeader:function(){var a=this.stream;if(a.reset(),c(a,"%PDF-",1024)){
// Found the header, trim off any garbage before it.
a.moveStart();for(
// Reading file format version
var b,d=12,e="";(b=a.getByte())>32&&!(e.length>=d);)e+=String.fromCharCode(b);
// removing "%PDF-"-prefix
return void(this.pdfFormatVersion||(this.pdfFormatVersion=e.substring(5)))}},parseStartXRef:function(){var a=this.startXRef;this.xref.setStartXRef(a)},setup:function(a){this.xref.parse(a);var b=this,c={createPage:function(a,c,d,e){return new M(b.pdfManager,b.xref,a,c,d,e)}};this.catalog=new C(this.pdfManager,this.xref,c)},get numPages(){var a=this.linearization,b=a?a.numPages:this.catalog.numPages;
// shadow the prototype getter
return r(this,"numPages",b)},get documentInfo(){var a,b={PDFFormatVersion:this.pdfFormatVersion,IsAcroFormPresent:!!this.acroForm,IsXFAPresent:!!this.xfa};try{a=this.xref.trailer.get("Info")}catch(c){n("The document information dictionary is invalid.")}if(a){var d=f.entries;
// Only fill the document info with valid entries from the spec.
for(var e in d)if(a.has(e)){var g=a.get(e);
// Make sure the value conforms to the spec.
d[e](g)?b[e]="string"!=typeof g?g:t(g):n('Bad value in document info for "'+e+'"')}}return r(this,"documentInfo",b)},get fingerprint(){var a,b=this.xref,c="",f=b.trailer.get("ID");f&&o(f)&&f[0]&&q(f[0])&&f[0]!==e?a=s(f[0]):(this.stream.ensureRange&&this.stream.ensureRange(0,Math.min(d,this.stream.end)),a=H(this.stream.bytes.subarray(0,d),0,d));for(var g=0,h=a.length;h>g;g++){var i=a[g].toString(16);c+=1===i.length?"0"+i:i}return r(this,"fingerprint",c)},getPage:function(a){return this.catalog.getPage(a)},cleanup:function(){return this.catalog.cleanup()}},a}();a.Page=M,a.PDFDocument=N}),function(a,b){b(a.pdfjsCorePdfManager={},a.pdfjsSharedUtil,a.pdfjsCoreStream,a.pdfjsCoreChunkedStream,a.pdfjsCoreDocument)}(this,function(a,b,c,d,e){var f=b.NotImplementedException,g=b.MissingDataException,h=b.createPromiseCapability,i=b.Util,j=c.Stream,k=d.ChunkedStreamManager,l=e.PDFDocument,m=function(){function a(){throw new Error("Cannot initialize BaseManagerManager")}return a.prototype={get docId(){return this._docId},onLoadedStream:function(){throw new f},ensureDoc:function(a,b){return this.ensure(this.pdfDocument,a,b)},ensureXRef:function(a,b){return this.ensure(this.pdfDocument.xref,a,b)},ensureCatalog:function(a,b){return this.ensure(this.pdfDocument.catalog,a,b)},getPage:function(a){return this.pdfDocument.getPage(a)},cleanup:function(){return this.pdfDocument.cleanup()},ensure:function(a,b,c){return new f},requestRange:function(a,b){return new f},requestLoadedStream:function(){return new f},sendProgressiveData:function(a){return new f},updatePassword:function(a){this.pdfDocument.xref.password=this.password=a,this._passwordChangedCapability&&this._passwordChangedCapability.resolve()},passwordChanged:function(){return this._passwordChangedCapability=h(),this._passwordChangedCapability.promise},terminate:function(){return new f}},a}(),n=function(){function a(a,b,c,d){this._docId=a,this.evaluatorOptions=d;var e=new j(b);this.pdfDocument=new l(this,e,c),this._loadedStreamCapability=h(),this._loadedStreamCapability.resolve(e)}return i.inherit(a,m,{ensure:function(a,b,c){return new Promise(function(d,e){try{var f,g=a[b];f="function"==typeof g?g.apply(a,c):g,d(f)}catch(h){e(h)}})},requestRange:function(a,b){return Promise.resolve()},requestLoadedStream:function(){},onLoadedStream:function(){return this._loadedStreamCapability.promise},terminate:function(){}}),a}(),o=function(){function a(a,b,c,d){this._docId=a,this.msgHandler=c.msgHandler,this.evaluatorOptions=d;var e={msgHandler:c.msgHandler,url:c.url,length:c.length,disableAutoFetch:c.disableAutoFetch,rangeChunkSize:c.rangeChunkSize};this.streamManager=new k(b,e),this.pdfDocument=new l(this,this.streamManager.getStream(),c.password)}return i.inherit(a,m,{ensure:function(a,b,c){var d=this;return new Promise(function(e,f){function h(){try{var i,j=a[b];i="function"==typeof j?j.apply(a,c):j,e(i)}catch(k){if(!(k instanceof g))return void f(k);d.streamManager.requestRange(k.begin,k.end).then(h,f)}}h()})},requestRange:function(a,b){return this.streamManager.requestRange(a,b)},requestLoadedStream:function(){this.streamManager.requestAllChunks()},sendProgressiveData:function(a){this.streamManager.onReceiveData({chunk:a})},onLoadedStream:function(){return this.streamManager.onLoadedStream()},terminate:function(){this.streamManager.abort()}}),a}();a.LocalPdfManager=n,a.NetworkPdfManager=o}),function(a,b){b(a.pdfjsCoreWorker={},a.pdfjsSharedUtil,a.pdfjsCorePrimitives,a.pdfjsCorePdfManager)}(this,function(a,b,c,d){/**
 * Sets PDFNetworkStream class to be used as alternative PDF data transport.
 * @param {IPDFStream} cls - the PDF data transport.
 */
function e(a){g=a}function f(){if(!("console"in B)){var a={},b={log:function(){var a=Array.prototype.slice.call(arguments);B.postMessage({targetName:"main",action:"console_log",data:a})},error:function(){var a=Array.prototype.slice.call(arguments);throw B.postMessage({targetName:"main",action:"console_error",data:a}),"pdf.js execution error"},time:function(b){a[b]=Date.now()},timeEnd:function(b){var c=a[b];c||u("Unknown timer name "+b),this.log("Timer:",b,Date.now()-c)}};B.console=b}var c=new j("worker","main",self);E.setup(c,self),c.send("ready",null)}var g,h=b.UNSUPPORTED_FEATURES,i=b.InvalidPDFException,j=b.MessageHandler,k=b.MissingPDFException,l=b.UnexpectedResponseException,m=b.PasswordException,n=b.PasswordResponses,o=b.UnknownErrorException,p=b.XRefParseException,q=b.arrayByteLength,r=b.arraysToBytes,s=b.assert,t=b.createPromiseCapability,u=b.error,v=b.info,w=b.warn,x=b.setVerbosityLevel,y=c.Ref,z=d.LocalPdfManager,A=d.NetworkPdfManager,B=b.globalScope,C=function(){function a(a){this.name=a,this.terminated=!1,this._capability=t()}return a.prototype={get finished(){return this._capability.promise},finish:function(){this._capability.resolve()},terminate:function(){this.terminated=!0},ensureNotTerminated:function(){if(this.terminated)throw new Error("Worker task was terminated")}},a}(),D=function(){function a(a,b){this._queuedChunks=[];var c=a.initialData;c&&c.length>0&&this._queuedChunks.push(c),this._msgHandler=b,this._isRangeSupported=!a.disableRange,this._isStreamingSupported=!a.disableStream,this._contentLength=a.length,this._fullRequestReader=null,this._rangeReaders=[],b.on("OnDataRange",this._onReceiveData.bind(this)),b.on("OnDataProgress",this._onProgress.bind(this))}/** @implements {IPDFStreamReader} */
function b(a,b){this._stream=a,this._done=!1,this._queuedChunks=b||[],this._requests=[],this._headersReady=Promise.resolve(),a._fullRequestReader=this,this.onProgress=null}/** @implements {IPDFStreamRangeReader} */
function c(a,b,c){this._stream=a,this._begin=b,this._end=c,this._queuedChunk=null,this._requests=[],this._done=!1,this.onProgress=null}return a.prototype={_onReceiveData:function(a){if(void 0===a.begin)this._fullRequestReader?this._fullRequestReader._enqueue(a.chunk):this._queuedChunks.push(a.chunk);else{var b=this._rangeReaders.some(function(b){return b._begin!==a.begin?!1:(b._enqueue(a.chunk),!0)});s(b)}},_onProgress:function(a){if(this._rangeReaders.length>0){
// Reporting to first range reader.
var b=this._rangeReaders[0];b.onProgress&&b.onProgress({loaded:a.loaded})}},_removeRangeReader:function(a){var b=this._rangeReaders.indexOf(a);b>=0&&this._rangeReaders.splice(b,1)},getFullReader:function(){s(!this._fullRequestReader);var a=this._queuedChunks;return this._queuedChunks=null,new b(this,a)},getRangeReader:function(a,b){var d=new c(this,a,b);return this._msgHandler.send("RequestDataRange",{begin:a,end:b}),this._rangeReaders.push(d),d},cancelAllRequests:function(a){this._fullRequestReader&&this._fullRequestReader.cancel(a);var b=this._rangeReaders.slice(0);b.forEach(function(b){b.cancel(a)})}},b.prototype={_enqueue:function(a){if(!this._done){if(this._requests.length>0){var b=this._requests.shift();return void b.resolve({value:a,done:!1})}this._queuedChunks.push(a)}},get headersReady(){return this._headersReady},get isRangeSupported(){return this._stream._isRangeSupported},get isStreamingSupported(){return this._stream._isStreamingSupported},get contentLength(){return this._stream._contentLength},read:function(){if(this._queuedChunks.length>0){var a=this._queuedChunks.shift();return Promise.resolve({value:a,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0});var b=t();return this._requests.push(b),b.promise},cancel:function(a){this._done=!0,this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[]}},c.prototype={_enqueue:function(a){if(!this._done){if(0===this._requests.length)this._queuedChunk=a;else{var b=this._requests.shift();b.resolve({value:a,done:!1}),this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[]}this._done=!0,this._stream._removeRangeReader(this)}},get isStreamingSupported(){return!1},read:function(){if(this._queuedChunk)return Promise.resolve({value:this._queuedChunk,done:!1});if(this._done)return Promise.resolve({value:void 0,done:!0});var a=t();return this._requests.push(a),a.promise},cancel:function(a){this._done=!0,this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[],this._stream._removeRangeReader(this)}},a}(),E={setup:function(a,b){var c=!1;a.on("test",function(b){if(!c){
// check if Uint8Array can be sent to worker
if(c=!0,!(b instanceof Uint8Array))return void a.send("test","main",!1);
// making sure postMessage transfers are working
var d=255===b[0];a.postMessageTransfers=d;
// check if the response property is supported by xhr
var e=new XMLHttpRequest,f="response"in e;
// check if the property is actually implemented
try{e.responseType}catch(g){f=!1}return f?void a.send("test",{supportTypedArray:!0,supportTransfers:d}):void a.send("test",!1)}}),a.on("configure",function(a){x(a.verbosity)}),a.on("GetDocRequest",function(a){return E.createDocumentHandler(a,b)})},createDocumentHandler:function(a,b){function c(){if(B)throw new Error("Worker was terminated")}function d(a){F.push(a)}function e(a){a.finish();var b=F.indexOf(a);F.splice(b,1)}function f(a){var b=t(),c=function(){var a=x.ensureDoc("numPages"),c=x.ensureDoc("fingerprint"),e=x.ensureXRef("encrypt");Promise.all([a,c,e]).then(function(a){var c={numPages:a[0],fingerprint:a[1],encrypted:!!a[2]};b.resolve(c)},d)},d=function(a){b.reject(a)};return x.ensureDoc("checkHeader",[]).then(function(){x.ensureDoc("parseStartXRef",[]).then(function(){x.ensureDoc("parse",[a]).then(c,d)},d)},d),b.promise}function u(a,b){var d,e=t(),f=a.source;if(f.data){try{d=new z(G,f.data,f.password,b),e.resolve(d)}catch(h){e.reject(h)}return e.promise}var i;try{f.chunkedViewerLoading?i=new D(f,I):(s(g,"pdfjs/core/network module is not loaded"),i=new g(a))}catch(h){return e.reject(h),e.promise}var j=i.getFullReader();j.headersReady.then(function(){if(j.isStreamingSupported&&j.isRangeSupported||(
// If stream or range are disabled, it's our only way to report
// loading progress.
j.onProgress=function(a){I.send("DocProgress",{loaded:a.loaded,total:a.total})}),j.isRangeSupported){
// We don't need auto-fetch when streaming is enabled.
var a=f.disableAutoFetch||j.isStreamingSupported;d=new A(G,i,{msgHandler:I,url:f.url,password:f.password,length:j.contentLength,disableAutoFetch:a,rangeChunkSize:f.rangeChunkSize},b),e.resolve(d),E=null}})["catch"](function(a){e.reject(a),E=null});var k=[],l=0,m=function(){var a=r(k);f.length&&a.length!==f.length&&w("reported HTTP length is different from actual");
// the data is array, instantiating directly from it
try{d=new z(G,a,f.password,b),e.resolve(d)}catch(c){e.reject(c)}k=[]},n=new Promise(function(a,b){var e=function(a){try{if(c(),a.done)return d||m(),void(E=null);var f=a.value;l+=q(f),j.isStreamingSupported||I.send("DocProgress",{loaded:l,total:Math.max(l,j.contentLength||0)}),d?d.sendProgressiveData(f):k.push(f),j.read().then(e,b)}catch(g){b(g)}};j.read().then(e,b)});return n["catch"](function(a){e.reject(a),E=null}),E=function(){i.cancelAllRequests("abort")},e.promise}
// This context is actually holds references on pdfManager and handler,
// until the latter is destroyed.
var x,B=!1,E=null,F=[],G=a.docId,H=a.docId+"_worker",I=new j(H,G,b);
// Ensure that postMessage transfers are correctly enabled/disabled,
// to prevent "DataCloneError" in older versions of IE (see issue 6957).
I.postMessageTransfers=a.postMessageTransfers;var J=function(a){var b=function(a){c(),I.send("GetDoc",{pdfInfo:a})},d=function(a){a instanceof m?a.code===n.NEED_PASSWORD?I.send("NeedPassword",a):a.code===n.INCORRECT_PASSWORD&&I.send("IncorrectPassword",a):a instanceof i?I.send("InvalidPDF",a):a instanceof k?I.send("MissingPDF",a):a instanceof l?I.send("UnexpectedResponse",a):I.send("UnknownError",new o(a.message,a.toString()))};c();var e={url:void 0===a.cMapUrl?null:a.cMapUrl,packed:a.cMapPacked===!0},g={forceDataSchema:a.disableCreateObjectURL,maxImageSize:void 0===a.maxImageSize?-1:a.maxImageSize,disableFontFace:a.disableFontFace,cMapOptions:e};u(a,g).then(function(a){if(B)
// We were in a process of setting up the manager, but it got
// terminated in the middle.
throw a.terminate(),new Error("Worker was terminated");x=a,I.send("PDFManagerReady",null),x.onLoadedStream().then(function(a){I.send("DataLoaded",{length:a.bytes.byteLength})})}).then(function h(){c(),f(!1).then(b,function(a){
// Try again with recoveryMode == true
// Try again with recoveryMode == true
// after password exception prepare to receive a new password
// to repeat loading
return c(),a instanceof p?(x.requestLoadedStream(),void x.onLoadedStream().then(function(){c(),f(!0).then(b,d)})):(a instanceof m&&x.passwordChanged().then(h),void d(a))},d)},d)};return I.on("GetPage",function(a){return x.getPage(a.pageIndex).then(function(a){var b=x.ensure(a,"rotate"),c=x.ensure(a,"ref"),d=x.ensure(a,"view");return Promise.all([b,c,d]).then(function(a){return{rotate:a[0],ref:a[1],view:a[2]}})})}),I.on("GetPageIndex",function(a){var b=new y(a.ref.num,a.ref.gen),c=x.pdfDocument.catalog;return c.getPageIndex(b)}),I.on("GetDestinations",function(a){return x.ensureCatalog("destinations")}),I.on("GetDestination",function(a){return x.ensureCatalog("getDestination",[a.id])}),I.on("GetPageLabels",function(a){return x.ensureCatalog("pageLabels")}),I.on("GetAttachments",function(a){return x.ensureCatalog("attachments")}),I.on("GetJavaScript",function(a){return x.ensureCatalog("javaScript")}),I.on("GetOutline",function(a){return x.ensureCatalog("documentOutline")}),I.on("GetMetadata",function(a){return Promise.all([x.ensureDoc("documentInfo"),x.ensureCatalog("metadata")])}),I.on("GetData",function(a){return x.requestLoadedStream(),x.onLoadedStream().then(function(a){return a.bytes})}),I.on("GetStats",function(a){return x.pdfDocument.xref.stats}),I.on("UpdatePassword",function(a){x.updatePassword(a)}),I.on("GetAnnotations",function(a){return x.getPage(a.pageIndex).then(function(b){return x.ensure(b,"getAnnotationsData",[a.intent])})}),I.on("RenderPageRequest",function(a){var b=a.pageIndex;x.getPage(b).then(function(c){var f=new C("RenderPageRequest: page "+b);d(f);var g=b+1,i=Date.now();
// Pre compile the pdf page and fetch the fonts/images.
c.getOperatorList(I,f,a.intent).then(function(a){e(f),v("page="+g+" - getOperatorList: time="+(Date.now()-i)+"ms, len="+a.totalLength)},function(b){if(e(f),!f.terminated){
// For compatibility with older behavior, generating unknown
// unsupported feature notification on errors.
I.send("UnsupportedFeature",{featureId:h.unknown});var c,d="worker.js: while trying to getPage() and getOperatorList()";
// Turn the error into an obj that can be serialized
c="string"==typeof b?{message:b,stack:d}:"object"==typeof b?{message:b.message||b.toString(),stack:b.stack||d}:{message:"Unknown exception type: "+typeof b,stack:d},I.send("PageError",{pageNum:g,error:c,intent:a.intent})}})})},this),I.on("GetTextContent",function(a){var b=a.pageIndex,c=a.normalizeWhitespace;return x.getPage(b).then(function(a){var f=new C("GetTextContent: page "+b);d(f);var g=b+1,h=Date.now();return a.extractTextContent(f,c).then(function(a){return e(f),v("text indexing: page="+g+" - time="+(Date.now()-h)+"ms"),a},function(a){if(e(f),!f.terminated)throw a})})}),I.on("Cleanup",function(a){return x.cleanup()}),I.on("Terminate",function(a){B=!0,x&&(x.terminate(),x=null),E&&E();var b=[];return F.forEach(function(a){b.push(a.finished),a.terminate()}),Promise.all(b).then(function(){
// Notice that even if we destroying handler, resolved response promise
// must be sent back.
I.destroy(),I=null})}),I.on("Ready",function(b){J(a),a=null}),H}};
// Worker thread (and not node.js)?
"undefined"!=typeof window||"undefined"!=typeof module&&module.require||f(),a.setPDFNetworkStreamClass=e,a.WorkerTask=C,a.WorkerMessageHandler=E});var a=function(){function a(a,b){this.url=a,b=b||{},this.isHttp=/^https?:/i.test(a),this.httpHeaders=this.isHttp&&b.httpHeaders||{},this.withCredentials=b.withCredentials||!1,this.getXhr=b.getXhr||function(){return new XMLHttpRequest},this.currXhrId=0,this.pendingRequests=Object.create(null),this.loadedRequests=Object.create(null)}function b(a){var b=a.response;if("string"!=typeof b)return b;for(var c=b.length,d=new Uint8Array(c),e=0;c>e;e++)d[e]=255&b.charCodeAt(e);return d.buffer}var c=200,d=206,e=function(){try{var a=new XMLHttpRequest;
// Firefox 37- required .open() to be called before setting responseType.
// https://bugzilla.mozilla.org/show_bug.cgi?id=707484
// Even though the URL is not visited, .open() could fail if the URL is
// blocked, e.g. via the connect-src CSP directive or the NoScript addon.
// When this error occurs, this feature detection method will mistakenly
// report that moz-chunked-arraybuffer is not supported in Firefox 37-.
return a.open("GET","https://example.com"),a.responseType="moz-chunked-arraybuffer","moz-chunked-arraybuffer"===a.responseType}catch(b){return!1}}();return a.prototype={requestRange:function(a,b,c){var d={begin:a,end:b};for(var e in c)d[e]=c[e];return this.request(d)},requestFull:function(a){return this.request(a)},request:function(a){var b=this.getXhr(),c=this.currXhrId++,d=this.pendingRequests[c]={xhr:b};b.open("GET",this.url),b.withCredentials=this.withCredentials;for(var f in this.httpHeaders){var g=this.httpHeaders[f];"undefined"!=typeof g&&b.setRequestHeader(f,g)}if(this.isHttp&&"begin"in a&&"end"in a){var h=a.begin+"-"+(a.end-1);b.setRequestHeader("Range","bytes="+h),d.expectedStatus=206}else d.expectedStatus=200;var i=e&&!!a.onProgressiveData;return i?(b.responseType="moz-chunked-arraybuffer",d.onProgressiveData=a.onProgressiveData,d.mozChunked=!0):b.responseType="arraybuffer",a.onError&&(b.onerror=function(c){a.onError(b.status)}),b.onreadystatechange=this.onStateChange.bind(this,c),b.onprogress=this.onProgress.bind(this,c),d.onHeadersReceived=a.onHeadersReceived,d.onDone=a.onDone,d.onError=a.onError,d.onProgress=a.onProgress,b.send(null),c},onProgress:function(a,c){var d=this.pendingRequests[a];if(d){if(d.mozChunked){var e=b(d.xhr);d.onProgressiveData(e)}var f=d.onProgress;f&&f(c)}},onStateChange:function(a,e){var f=this.pendingRequests[a];if(f){var g=f.xhr;if(g.readyState>=2&&f.onHeadersReceived&&(f.onHeadersReceived(),delete f.onHeadersReceived),4===g.readyState&&a in this.pendingRequests){
// success status == 0 can be on ftp, file and other protocols
if(delete this.pendingRequests[a],0===g.status&&this.isHttp)return void(f.onError&&f.onError(g.status));var h=g.status||c,i=h===c&&f.expectedStatus===d;if(!i&&h!==f.expectedStatus)return void(f.onError&&f.onError(g.status));this.loadedRequests[a]=!0;var j=b(g);if(h===d){var k=g.getResponseHeader("Content-Range"),l=/bytes (\d+)-(\d+)\/(\d+)/.exec(k),m=parseInt(l[1],10);f.onDone({begin:m,chunk:j})}else f.onProgressiveData?f.onDone(null):j?f.onDone({begin:0,chunk:j}):f.onError&&f.onError(g.status)}}},hasPendingRequests:function(){for(var a in this.pendingRequests)return!0;return!1},getRequestXhr:function(a){return this.pendingRequests[a].xhr},isStreamingRequest:function(a){return!!this.pendingRequests[a].onProgressiveData},isPendingRequest:function(a){return a in this.pendingRequests},isLoadedRequest:function(a){return a in this.loadedRequests},abortAllRequests:function(){for(var a in this.pendingRequests)this.abortRequest(0|a)},abortRequest:function(a){var b=this.pendingRequests[a].xhr;delete this.pendingRequests[a],b.abort()}},a}();!function(a,b){b(a.pdfjsCoreNetwork={},a.pdfjsSharedUtil,a.pdfjsCoreWorker)}(this,function(b,c,d){/** @implements {IPDFStream} */
function e(b){this._options=b;var c=b.source;this._manager=new a(c.url,{httpHeaders:c.httpHeaders,withCredentials:c.withCredentials}),this._rangeChunkSize=c.rangeChunkSize,this._fullRequestReader=null,this._rangeRequestReaders=[]}/** @implements {IPDFStreamReader} */
function f(a,b){this._manager=a;var c=b.source,d={onHeadersReceived:this._onHeadersReceived.bind(this),onProgressiveData:c.disableStream?null:this._onProgressiveData.bind(this),onDone:this._onDone.bind(this),onError:this._onError.bind(this),onProgress:this._onProgress.bind(this)};this._url=c.url,this._fullRequestId=a.requestFull(d),this._headersReceivedCapability=i(),this._disableRange=b.disableRange||!1,this._contentLength=c.length,// optional
this._rangeChunkSize=c.rangeChunkSize,this._rangeChunkSize||this._disableRange||(this._disableRange=!0),this._isStreamingSupported=!1,this._isRangeSupported=!1,this._cachedChunks=[],this._requests=[],this._done=!1,this._storedError=void 0,this.onProgress=null}/** @implements {IPDFStreamRangeReader} */
function g(a,b,c){this._manager=a;var d={onDone:this._onDone.bind(this),onProgress:this._onProgress.bind(this)};this._requestId=a.requestRange(b,c,d),this._requests=[],this._queuedChunk=null,this._done=!1,this.onProgress=null,this.onClosed=null}var h=c.assert,i=c.createPromiseCapability,j=c.isInt,k=c.MissingPDFException,l=c.UnexpectedResponseException;e.prototype={_onRangeRequestReaderClosed:function(a){var b=this._rangeRequestReaders.indexOf(a);b>=0&&this._rangeRequestReaders.splice(b,1)},getFullReader:function(){return h(!this._fullRequestReader),this._fullRequestReader=new f(this._manager,this._options),this._fullRequestReader},getRangeReader:function(a,b){var c=new g(this._manager,a,b);return c.onClosed=this._onRangeRequestReaderClosed.bind(this),this._rangeRequestReaders.push(c),c},cancelAllRequests:function(a){this._fullRequestReader&&this._fullRequestReader.cancel(a);var b=this._rangeRequestReaders.slice(0);b.forEach(function(b){b.cancel(a)})}},f.prototype={_validateRangeRequestCapabilities:function(){if(this._disableRange)return!1;var a=this._manager,b=this._fullRequestId,c=a.getRequestXhr(b);if("bytes"!==c.getResponseHeader("Accept-Ranges"))return!1;var d=c.getResponseHeader("Content-Encoding")||"identity";if("identity"!==d)return!1;var e=c.getResponseHeader("Content-Length");return e=parseInt(e,10),j(e)?(this._contentLength=e,!(e<=2*this._rangeChunkSize)):!1},_onHeadersReceived:function(){this._validateRangeRequestCapabilities()&&(this._isRangeSupported=!0);var a=this._manager,b=this._fullRequestId;a.isStreamingRequest(b)?
// We can continue fetching when progressive loading is enabled,
// and we don't need the autoFetch feature.
this._isStreamingSupported=!0:this._isRangeSupported&&
// NOTE: by cancelling the full request, and then issuing range
// requests, there will be an issue for sites where you can only
// request the pdf once. However, if this is the case, then the
// server should not be returning that it can support range
// requests.
a.abortRequest(b),this._headersReceivedCapability.resolve()},_onProgressiveData:function(a){if(this._requests.length>0){var b=this._requests.shift();b.resolve({value:a,done:!1})}else this._cachedChunks.push(a)},_onDone:function(a){a&&this._onProgressiveData(a.chunk),this._done=!0,this._cachedChunks.length>0||(this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[])},_onError:function(a){var b,c=this._url;b=404===a||0===a&&/^file:/.test(c)?new k('Missing PDF "'+c+'".'):new l("Unexpected server response ("+a+') while retrieving PDF "'+c+'".',a),this._storedError=b,this._headersReceivedCapability.reject(b),this._requests.forEach(function(a){a.reject(b)}),this._requests=[],this._cachedChunks=[]},_onProgress:function(a){this.onProgress&&this.onProgress({loaded:a.loaded,total:a.lengthComputable?a.total:this._contentLength})},get isRangeSupported(){return this._isRangeSupported},get isStreamingSupported(){return this._isStreamingSupported},get contentLength(){return this._contentLength},get headersReady(){return this._headersReceivedCapability.promise},read:function(){if(this._storedError)return Promise.reject(this._storedError);if(this._cachedChunks.length>0){var a=this._cachedChunks.shift();return Promise.resolve(a)}if(this._done)return Promise.resolve({value:void 0,done:!0});var b=i();return this._requests.push(b),b.promise},cancel:function(a){this._done=!0,this._headersReceivedCapability.reject(a),this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[],this._manager.isPendingRequest(this._fullRequestId)&&this._manager.abortRequest(this._fullRequestId),this._fullRequestReader=null}},g.prototype={_close:function(){this.onClosed&&this.onClosed(this)},_onDone:function(a){var b=a.chunk;if(this._requests.length>0){var c=this._requests.shift();c.resolve({value:b,done:!1})}else this._queuedChunk=b;this._done=!0,this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[],this._close()},_onProgress:function(a){!this.isStreamingSupported&&this.onProgress&&this.onProgress({loaded:a.loaded})},get isStreamingSupported(){return!1},read:function(){if(null!==this._queuedChunk){var a=this._queuedChunk;return this._queuedChunk=null,Promise.resolve({value:a,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0});var b=i();return this._requests.push(b),b.promise},cancel:function(a){this._done=!0,this._requests.forEach(function(a){a.resolve({value:void 0,done:!0})}),this._requests=[],this._manager.isPendingRequest(this._requestId)&&this._manager.abortRequest(this._requestId),this._close()}},d.setPDFNetworkStreamClass(e),b.PDFNetworkStream=e,b.NetworkManager=a})}).call(b),a.WorkerMessageHandler=b.pdfjsCoreWorker.WorkerMessageHandler});