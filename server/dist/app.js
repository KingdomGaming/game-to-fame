!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=socket.io},function(e,t){e.exports=http},function(e,t){e.exports=express},function(e,t){e.exports=path},function(e,t,n){"use strict";var r=i(n(3)),o=i(n(2)),u=i(n(1)),l=i(n(0));function i(e){return e&&e.__esModule?e:{default:e}}var f=(0,o.default)(),c=u.default.Server(f),s=((0,l.default)(c),r.default.resolve("public"));r.default.resolve("server"),r.default.resolve("shared");f.set("port",3e3),f.use(o.default.static(s)),f.get("/",function(e,t){t.sendFile(r.default.join(s,"index.html"))}),c.listen(3e3,function(){console.log("server listening on port 3000")})}]);