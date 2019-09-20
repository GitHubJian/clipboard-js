function ClipboardAction(e) {
  this.resolveOptions(e)
  this.initSelection()
}

ClipboardAction.prototype.resolveOptions = function() {
  var opts =
    arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]

  this.action = opts.action
  this.emitter = opts.emitter
  this.target = opts.target
  this.text = opts.text
  this.trigger = opts.trigger
  this.selectedText = ''
}

ClipboardAction.prototype.initSelection = function() {
  this.text ? this.selectFake() : this.target && this.selectTarget()
}

ClipboardAction.prototype.selectFake = function() {
  var that = this,
    isRtl = 'rtl' === document.documentElement.getAttribute('dir')

  this.removeFake()
  this.fakeHandlerCallback = function() {
    return that.removeFake()
  }
  this.fakeHandler =
    document.body.addEventListener('click', this.fakeHandlerCallback) || !0
  this.fakeElem = document.createElement('textarea')
  this.fakeElem.style.fontSize = '12pt'
  this.fakeElem.style.border = '0'
  this.fakeElem.style.padding = '0'
  this.fakeElem.style.margin = '0'
  this.fakeElem.style.position = 'absolute'
  this.fakeElem.style[isRtl ? 'right' : 'left'] = '-9999px'
  this.fakeElem.style.top =
    (window.pageYOffset || document.documentElement.scrollTop) + 'px'
  this.fakeElem.setAttribute('readonly', '')
  this.fakeElem.value = this.text
  document.body.appendChild(this.fakeElem)
  this.selectedText = '' // ???
  this.copyText()
}

ClipboardAction.prototype.removeFake = function() {
  if (this.fakeHandler) {
    document.body.removeEventListener('click', this.fakeHandlerCallback)
    this.fakeHandler = null
    this.fakeHandlerCallback = null
  }

  if (this.fakeElem) {
    document.body.removeChild(this.fakeElem)
    this.fakeElem = null
  }
}

ClipboardAction.prototype.selectTarget

ClipboardAction.prototype.copyText

ClipboardAction.prototype.handleResult

ClipboardAction.prototype.clearSelection

ClipboardAction.prototype.destroy

Object.defineProperty(ClipboardAction.prototype, 'action', {
  enumerable: !1,
  configurable: !0,
  get: function() {},
  set: function() {}
})

Object.defineProperty(ClipboardAction.prototype, 'target', {
  enumerable: !1,
  configurable: !0,
  get: function() {},
  set: function() {}
})
