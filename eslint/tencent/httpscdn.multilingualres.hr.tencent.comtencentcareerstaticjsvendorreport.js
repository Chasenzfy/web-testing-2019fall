// mta上报
var _mtac = { performanceMonitor: 1 }
;(function() {
  var mta = document.createElement('script')
  mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4'
  mta.setAttribute('name', 'MTAH5')
  mta.setAttribute('sid', '500675685')
  mta.setAttribute('cid', '500675686')
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(mta, s)
})()
