AC.namespace("AC.retail.util"),AC.retail.util.DOM={query:function(){var n;return n=document.querySelectorAll?function(e,t){return e.querySelectorAll(t)}:function(e,t){return Prototype.Selector.select(t,e)},function(e,t){return n(t||document,e)}}(),setOpacity:function(e,t){e.style.opacity=t},parseXML:function(e){var t=document.createElement("div");return t.innerHTML=e,t}},AC.retail.util.template=function(e,t){var n;for(n in"string"!=typeof e&&(e=e.innerHTML),t)t.hasOwnProperty(n)&&(e=e.replace(new RegExp("{\\s*"+n+"\\s*}","g"),t[n]));return e},AC.retail.util.ajaxGet=function(e,t,n){var a=AC.Ajax.getTransport();a.open("GET",e,!0),a.onreadystatechange=function(){4===a.readyState&&(200===a.status?t(a.responseText):n&&n(a.statusText))},a.send()},AC.retail.util.generateExtension=function(e){return"."+e},AC.retail.globalSearchDecorator=function(e,t){var n,a=document.getElementsByTagName("input"),r=new AC.retail.EventDispatch,i="Firefox"===t.name||"iOS"===t.os||"IE"===t.name;init=function(){if(0<a.length)for(n=0;n<a.length;n+=1)a[n].className.match("global-retail-search")&&(self.insertReset(a[n]),i&&(r.subscribeEvent(a[n],"::viewUpdated",function(e){e.value.length&&e.value!==self.placeholder&&makeResetVisible(e)}.bind(null,a[n])),a[n].addEventListener("blur",function(e){var t=e.target;""!==t.value&&(t.value,self.placeholder)}),a[n].addEventListener("keyup",function(e){var t=e.target?e.target:e.srcElement;8==e.keyCode&&0==t.value.length&&self.makeResetHide(t)})))},insertReset=function(e){var t=e.previousElementSibling;if(!t||"span"!=t.tagName){var n=document.createElement("span");n.className="reset",n.classList.add("reset"),e.parentNode.insertBefore(n,e)}},makeResetVisible=function(e){var t=e.previousElementSibling;"SPAN"==t.tagName&&"reset"==t.className&&(t.classList.add("active"),t.addEventListener("click",self.makeResetHide))},makeResetHide=function(e){var t,n;e.type&&"click"==e.type?t=(n=e.target?e.target:e.srcElement).nextElementSibling:(n=e.previousElementSibling,t=e),n.classList.remove("active"),t.value="",r.dispatchEvent(t,"userEngagementChanged",!1),n.removeEventListener("click",self.makeResetHide)},init()};