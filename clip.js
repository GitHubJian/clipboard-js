var clipboard = null

function MyClipboard() {
  this.clipboard = null
  this.element = MyClipboard.getElement(el)
  this.event = {}
}

MyClipboard.getElement = function(el) {
  return document.getElement(el)
}

MyClipboard.prototype.getClipboardHandler = function() {
  return this
}

MyClipboard.prototype.setText = function(text) {
  this.clipboard.setText(text)

  return this.clipboard
}

MyClipboard.create = function(proto) {
  var MyClipboardIns = function(opts) {
    MyClipboard.call(this, opts)
  }

  MyClipboardIns.prototype = new MyClipboard()
  MyClipboardIns.prototype.constructor = MyClipboardIns

  for (var i in proto) {
    if (proto.hasOwnProperty(i)) {
      MyClipboardIns.prototype[i] = proto[i]
    }
  }

  return MyClipboardIns
}

var d = MyClipboard.create({
  getClipboardHandler: function() {
    if (this.clipboard) return this.clipboard

    var that = this,
      el = this.element,
      client = new clipboard.Client()

    client.glue(el, el)

    client.setHandCursor(!0)

    client.addEventListener('complete', function(e) {
      that.emit('success', e)
    })

    client.addEventListener('error', function(e) {
      that.emit('error', e)
    })

    this.clipboard = i

    return this
  }
})

var p = MyClipboard.create({
  setText: function(t) {
    var that = this

    this.clipboard = new clipboard(that.element, {
      text: function() {
        return t
      }
    })

    this.clipboard.on('success', function(t) {
      that.emit('success', t.text)
      t.clearSelection()
    })

    this.clipboard.on('error', function(t) {
      that.emit('error', t)
    })

    return this.clipboard
  }
})

p.check = function() {
  return !(
    window.getSelection ||
    !(
      (document.queryCommandSupported &&
        document.queryCommandSupported('copy')) ||
      (document.execCommand && document.execCommand('copy'))
    )
  )
}

var u = MyClipboard.create({
  getClipboardHandler: function() {
    this.clipboard = window.clipboardData

    return this
  },
  setText: function(text) {
    var that = this
    window.attachEvent
      ? that.element.attachEvent('onclick', function() {
          try {
            that.clipboard.clearData()
            that.clipboard.setData('Text', text)
          } catch (e) {
            return void that.emit('error', e)
          }

          that.emit('success', text)
        })
      : that.element.addEventListener(
          'click',
          function() {
            try {
              that.clipboard.clearData()
              that.clipboard.setData('Text', text)
            } catch (e) {
              return void that.emit('error', e)
            }

            that.emit('success', text)
          },
          !1
        )

    return this.clipboard
  }
})

u.check = function() {
  return !!window.clipboardData
}

function r(t) {
  if (t) {
    this.type = r.initClipboardBean.type
    this.clipboardIns = r.initClipboardBean(t)
  }
}

r.TYPE_HTML5 = 0

r.TYPE_FLASH = 1

r.TYPE_NATIVE = 2

r.prototype.constructor = r

r.prototype.setText = function(text) {
  return this.clipboardIns.getClipboardHandler().setText(text)
}

r.prototype.on = function(event, listener) {
  this.clipboardIns.on(event, listener)
}

r.prototype.emit = function() {
  this.clipboardIns.emit.apply(this.clipboardIns, arguments)
}

if (p.check()) {
  clipboard = Clipboard.getHTML5Clipboard()

  r.initClipboardBean = function(t) {
    return new p(t)
  }

  r.initClipboardBean.type = r.TYPE_HTML5
} else if (u.check()) {
  r.initClipboardBean = function(t) {
    return new u(t)
  }

  r.initClipboardBean.type = r.TYPE_NATIVE
} else {
  clipboard = Clipboard.getZeroClipboard()

  r.initClipboardBean = function(t) {
    return new d(t)
  }

  r.initClipboardBean.type = r.TYPE_FLASH
}
