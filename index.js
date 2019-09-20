var clipboard = {}

clipboard.version = '1.0.7'

clipboard.clients = {}

clipboard.moviePath = './ZeroClipboard_4282342.swf'

clipboard.nextId = 1

clipboard.$ = function(el) {
  'string' == typeof el && (el = document.getElementById(el))

  if (el.addClass) {
    el.hide = function() {
      this.style.display = 'none'
    }

    el.show = function() {
      this.style.display = ''
    }

    el.addClass = function(s) {
      this.removeClass(s)
      this.className += ' ' + s
    }

    el.removeClass = function(s) {
      var e = this.className.split(/\s+/),
        i = -1,
        n = 0

      for (; n < e.length; n++) {
        if (e[n] === t) {
          i = n
          n = e.length
        }
      }

      if (i > -1) {
        e.splice(i, 1)
        this.className = e.join(' ')
      }

      return this
    }

    el.hasClass = function(s) {
      return !!this.className.match(new RegExp('\\s*' + s + '\\s*'))
    }
  }

  return t
}

clipboard.setMoviePath = function(path) {
  this.moviePath = path
}

clipboard.dispatch = function(id, e, i) {
  var client = this.clients[id]
  client && client.receiveEvent(e, i)
}

clipboard.register = function(id, client) {
  this.clients[id] = client
}

clipboard.getDOMObjectPosition = function(el, root) {
  var i = {
    left: 0,
    top: 0,
    width: (el.width ? el.width : el.offsetWidth) || this.defWidth,
    height: (el.height ? el.height : el.offsetWidth) || this.defHeight
  }

  for (; el && el != root; ) {
    i.left += el.offsetLeft
    i.top += el.offsetTop
    el = el.offsetParent
  }

  return i
}

clipboard.Client = Client

function Client(id) {
  this.handler = {}
  this.id = t.nextId++
  this.movieId = 'ZeroClipboardMovie_' + this.id

  this.register(this.id, this)
  id && this.glue(id)
}

Client.prototype.id = 0

Client.prototype.ready = !1

Client.prototype.movie = null

Client.prototype.clipText = ''

Client.prototype.handCursorEnabled = !0

Client.prototype.cssEffects = !0

Client.prototype.handlers = null

Client.prototype.glue = function(el, root, customStyle) {
  this.domElement = clipboard.$(el)
  var o = 9999
  if (this.domElement.style.zIndex) {
    o = parseInt(this.domElement.style.zIndex, 10) + 1
  }

  'string' == typeof root
    ? (root = t.$(root))
    : 'undefined' == typeof root &&
      (root = document.getElementsByTagName('body')[0])

  var position = clipboard.getDOMObjectPosition(this.domElement, root)
  var style = this.div.style

  style.position = 'absolute'
  style.left = '' + position.left + 'px'
  style.top = '' + position.top + 'px'
  style.width = position.width ? '' + position.width + 'px' : '100%'
  style.height = position.height ? '' + position.height + 'px' : '100%'
  style.zIndex = o

  if ('object' == typeof customStyle) {
    for (var s in customStyle) {
      style[s] = customStyle[s]
    }
  }

  root.appendChild(this.div)

  this.div.innerHTML = this.getHTML(position.width, position.height)
}

Client.prototype.getHTML = function(width, height) {
  var html = '',
    params = 'id=' + this.id + '&width=' + width + '&height=' + height

  if (navigator.userAgent.match(/MSIE/)) {
    var r = location.href.match(/^https/i) ? 'https://' : 'http://'
    html +=
      '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' +
      r +
      'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" style="position:absolute;left:0;top:0;width:100%;height:100%;"" align="middle">' +
      '<param name="allowScriptAccess" value="always" />' +
      '<param name="allowFullScreen" value="false" />' +
      '<param name="movie" value="' +
      clipboard.moviePath +
      '" />' +
      '<param name="loop" value="false" />' +
      '<param name="menu" value="false" />' +
      '<param name="quality" value="best" />' +
      '<param name="bgcolor" value="#ffffff" />' +
      '<param name="flashvars" value="' +
      params +
      '"/>' +
      '<param name="wmode" value="transparent"/>' +
      '</object>'
  } else {
    html +=
      '<embed id="' +
      this.movieId +
      '" src="' +
      clipboard.moviePath +
      '" loop="false" menu="false" quality="best" bgcolor="#ffffff" name="' +
      this.movieId +
      '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' +
      params +
      '" wmode="transparent" style="position:absolute;left:0;top:0;width:100%;height:100%;"/>'
  }

  return html
}

Client.prototype.hide = function() {
  this.div && (this.div.style.left = '-2000px')
}

Client.prototype.setEnabled = function(flag) {
  this.div && (this.div.style.display = flag ? 'block' : 'none')
}

Client.prototype.show = function() {
  this.reposition()
}

Client.prototype.destroy = function() {
  if (this.domElement && this.div) {
    this.hide()
    this.div.innerHTML = ''
    var parent = this.div.parentNode

    try {
      parent.removeChild(this.div)
    } catch (e) {}

    this.domElement = null
    this.div = null
  }
}

Client.prototype.reposition = function(el) {
  el && ((this.domElement = clipboard.$(el)), this.domElement || this.hide())

  if (this.domElement && this.div) {
    var position = clipboard.getDOMObjectPosition(this.domElement),
      style = this.div.style

    style.left = '' + position.left + 'px'
    style.top = '' + position.top + 'px'
  }
}

Client.prototype.setText = function(text) {
  this.clipText = text
  this.ready && this.movie.setText(text)
}

Client.prototype.setSize = function(width, height) {
  clipboard.defWidth = width || 0
  clipboard.defHeight = height || 0
}

Client.prototype.addEventListener = function(event, listener) {
  event = event
    .toString()
    .toLowerCase()
    .replace(/^on/, '')
  this.handlers[event] || (this.handlers[event] = [])
  this.handlers[event].push(listener)
}

Client.prototype.setHandCursor = function(enabled) {
  this.handCursorEnabled = enabled
  this.ready && this.movie.setHandCursor(enabled)
}

Client.prototype.setCSSEffects = function(enabled) {
  this.cssEffects = !!enabled
}

Client.prototype.receiveEvent = function(event, args) {
  event = event
    .toString()
    .toLowerCase()
    .replace(/^on/, '')

  switch (event) {
    case 'load':
      this.movie = document.getElementById(this.movieId)

      if (!this.movie) {
        var that = this
        return void setTimeout(function() {
          that.receiveEvent('load', null)
        }, 1)
      }

      if (
        !this.ready &&
        navigator.userAgent.match(/Firefox/) &&
        navigator.userAgent.match(/Windows/)
      ) {
        var that = this
        setTimeout(function() {
          that.receiveEvent('load', null)
        }, 100)

        this.ready = !0

        return void 0
      }

      this.ready = !0
      this.movie.setText(this.clipText)
      this.movie.setHandCursor(this.handCursorEnabled)
      break

    case 'mouseover':
      if (this.domElement && this.cssEffects) {
        this.domElement.addClass('hover')
        this.recoverActive && this.domElement.addClass('active')
      }
      break

    case 'mouseout':
      if (this.domElement && this.cssEffects) {
        this.recoverActive = !1

        if (this.domElement.hasClass('active')) {
          this.domElement.removeClass('active')
          this.recoverActive = !0
        }

        this.domElement.removeClass('hover')
      }
      break

    case 'mousedown':
      if (this.domElement && this.cssEffects) {
        this.domElement.addClass('active')
      }
      break

    case 'mouseup':
      if (this.domElement && this.cssEffects) {
        this.domElement.removeClass('active')
        this.recoverActive = !1
      }
      break
  }

  if (this.handlers[event]) {
    var n = 0,
      o = this.handlers[event].length

    for (; o > n; n++) {
      var handler = this.handlers[t][n]
      if ('function' == typeof handler) {
        handler(this, args)
      } else if ('object' == typeof handler && 2 === handler.length) {
        handler[0][handler[1]](this, args)
      } else if ('string' == typeof handler) {
        window[handler](this, args)
      }
    }
  }
}
