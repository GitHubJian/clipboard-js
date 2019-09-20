define('base:widget/clipboard/clipboard.js', function(t, e, i) {
  debugger
  i.exports = {
    getHTML5Clipboard: function() {
      return (function(t) {
        debugger
        return t()
      })(function() {
        debugger
        var e
        return (function i(e, n, o) {
          debugger
          function r(a, l) {
            debugger
            if (!n[a]) {
              if (!e[a]) {
                var c = 'function' == typeof t && t
                if (!l && c) return c(a, !0)
                if (s) return s(a, !0)
                var u = new Error("Cannot find module '" + a + "'")
                throw ((u.code = 'MODULE_NOT_FOUND'), u)
              }
              var h = (n[a] = { exports: {} })
              e[a][0].call(
                h.exports,
                function(t) {
                  var i = e[a][1][t]
                  return r(i ? i : t)
                },
                h,
                h.exports,
                i,
                e,
                n,
                o
              )
            }
            return n[a].exports
          }
          debugger
          for (var s = 'function' == typeof t && t, a = 0; a < o.length; a++)
            r(o[a])
          return r
        })(
          {
            1: [
              function(t, e) {
                var i = t('matches-selector')
                e.exports = function(t, e, n) {
                  for (var o = n ? t : t.parentNode; o && o !== document; ) {
                    if (i(o, e)) return o
                    o = o.parentNode
                  }
                }
              },
              { 'matches-selector': 5 }
            ],
            2: [
              function(t, e) {
                function i(t, e, i, o, r) {
                  var s = n.apply(this, arguments)
                  return (
                    t.addEventListener(i, s, r),
                    {
                      destroy: function() {
                        t.removeEventListener(i, s, r)
                      }
                    }
                  )
                }
                function n(t, e, i, n) {
                  return function(i) {
                    ;(i.delegateTarget = o(i.target, e, !0)),
                      i.delegateTarget && n.call(t, i)
                  }
                }
                var o = t('closest')
                e.exports = i
              },
              { closest: 1 }
            ],
            3: [
              function(t, e, i) {
                ;(i.node = function(t) {
                  return (
                    void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
                  )
                }),
                  (i.nodeList = function(t) {
                    var e = Object.prototype.toString.call(t)
                    return (
                      void 0 !== t &&
                      ('[object NodeList]' === e ||
                        '[object HTMLCollection]' === e) &&
                      'length' in t &&
                      (0 === t.length || i.node(t[0]))
                    )
                  }),
                  (i.string = function(t) {
                    return 'string' == typeof t || t instanceof String
                  }),
                  (i.fn = function(t) {
                    var e = Object.prototype.toString.call(t)
                    return '[object Function]' === e
                  })
              },
              {}
            ],
            4: [
              function(t, e) {
                function i(t, e, i) {
                  if (!t && !e && !i)
                    throw new Error('Missing required arguments')
                  if (!s.string(e))
                    throw new TypeError('Second argument must be a String')
                  if (!s.fn(i))
                    throw new TypeError('Third argument must be a Function')
                  if (s.node(t)) return n(t, e, i)
                  if (s.nodeList(t)) return o(t, e, i)
                  if (s.string(t)) return r(t, e, i)
                  throw new TypeError(
                    'First argument must be a String, HTMLElement, HTMLCollection, or NodeList'
                  )
                }
                function n(t, e, i) {
                  return (
                    t.addEventListener(e, i),
                    {
                      destroy: function() {
                        t.removeEventListener(e, i)
                      }
                    }
                  )
                }
                function o(t, e, i) {
                  return (
                    Array.prototype.forEach.call(t, function(t) {
                      t.addEventListener(e, i)
                    }),
                    {
                      destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                          t.removeEventListener(e, i)
                        })
                      }
                    }
                  )
                }
                function r(t, e, i) {
                  return a(document.body, t, e, i)
                }
                var s = t('./is'),
                  a = t('delegate')
                e.exports = i
              },
              { './is': 3, delegate: 2 }
            ],
            5: [
              function(t, e) {
                function i(t, e) {
                  if (o) return o.call(t, e)
                  for (
                    var i = t.parentNode.querySelectorAll(e), n = 0;
                    n < i.length;
                    ++n
                  )
                    if (i[n] === t) return !0
                  return !1
                }
                var n = Element.prototype,
                  o =
                    n.matchesSelector ||
                    n.webkitMatchesSelector ||
                    n.mozMatchesSelector ||
                    n.msMatchesSelector ||
                    n.oMatchesSelector
                e.exports = i
              },
              {}
            ],
            6: [
              function(t, e) {
                function i(t) {
                  var e
                  if ('INPUT' === t.nodeName || 'TEXTAREA' === t.nodeName)
                    t.focus(),
                      t.setSelectionRange(0, t.value.length),
                      (e = t.value)
                  else {
                    t.hasAttribute('contenteditable') && t.focus()
                    var i = window.getSelection(),
                      n = document.createRange()
                    n.selectNodeContents(t),
                      i.removeAllRanges(),
                      i.addRange(n),
                      (e = i.toString())
                  }
                  return e
                }
                e.exports = i
              },
              {}
            ],
            7: [
              function(t, e) {
                function i() {}
                ;(i.prototype = {
                  on: function(t, e, i) {
                    var n = this.e || (this.e = {})
                    return (n[t] || (n[t] = [])).push({ fn: e, ctx: i }), this
                  },
                  once: function(t, e, i) {
                    function n() {
                      o.off(t, n), e.apply(i, arguments)
                    }
                    var o = this
                    return (n._ = e), this.on(t, n, i)
                  },
                  emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                      i = ((this.e || (this.e = {}))[t] || []).slice(),
                      n = 0,
                      o = i.length
                    for (n; o > n; n++) i[n].fn.apply(i[n].ctx, e)
                    return this
                  },
                  off: function(t, e) {
                    var i = this.e || (this.e = {}),
                      n = i[t],
                      o = []
                    if (n && e)
                      for (var r = 0, s = n.length; s > r; r++)
                        n[r].fn !== e && n[r].fn._ !== e && o.push(n[r])
                    return o.length ? (i[t] = o) : delete i[t], this
                  }
                }),
                  (e.exports = i)
              },
              {}
            ],
            8: [
              // clipboard-action
              function(t, i, n) {
                !(function(o, r) {
                  if ('function' == typeof e && e.amd)
                    e(['module', 'select'], r)
                  else if ('undefined' != typeof n) r(i, t('select'))
                  else {
                    var s = { exports: {} }
                    r(s, o.select), (o.clipboardAction = s.exports)
                  }
                })(this, function(t, e) {
                  'use strict'
                  function i(t) {
                    return t && t.__esModule ? t : { defaultKey: t }
                  }
                  function n(t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  }
                  var o = i(e),
                    r =
                      'function' == typeof Symbol &&
                      'symbol' == typeof Symbol.iterator
                        ? function(t) {
                            return typeof t
                          }
                        : function(t) {
                            return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol
                              ? 'symbol'
                              : typeof t
                          },
                    s = (function() {
                      function t(t, e) {
                        for (var i = 0; i < e.length; i++) {
                          var n = e[i]
                          ;(n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            'value' in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n)
                        }
                      }
                      return function(e, i, n) {
                        return i && t(e.prototype, i), n && t(e, n), e
                      }
                    })(),
                    a = (function() {
                      function t(e) {
                        n(this, t), this.resolveOptions(e), this.initSelection()
                      }
                      return (
                        (t.prototype.resolveOptions = function() {
                          var t =
                            arguments.length <= 0 || void 0 === arguments[0]
                              ? {}
                              : arguments[0]
                          ;(this.action = t.action),
                            (this.emitter = t.emitter),
                            (this.target = t.target),
                            (this.text = t.text),
                            (this.trigger = t.trigger),
                            (this.selectedText = '')
                        }),
                        (t.prototype.initSelection = function() {
                          this.text
                            ? this.selectFake()
                            : this.target && this.selectTarget()
                        }),
                        (t.prototype.selectFake = function() {
                          var t = this,
                            e =
                              'rtl' ===
                              document.documentElement.getAttribute('dir')
                          this.removeFake(),
                            (this.fakeHandlerCallback = function() {
                              return t.removeFake()
                            }),
                            (this.fakeHandler =
                              document.body.addEventListener(
                                'click',
                                this.fakeHandlerCallback
                              ) || !0),
                            (this.fakeElem = document.createElement(
                              'textarea'
                            )),
                            (this.fakeElem.style.fontSize = '12pt'),
                            (this.fakeElem.style.border = '0'),
                            (this.fakeElem.style.padding = '0'),
                            (this.fakeElem.style.margin = '0'),
                            (this.fakeElem.style.position = 'absolute'),
                            (this.fakeElem.style[e ? 'right' : 'left'] =
                              '-9999px'),
                            (this.fakeElem.style.top =
                              (window.pageYOffset ||
                                document.documentElement.scrollTop) + 'px'),
                            this.fakeElem.setAttribute('readonly', ''),
                            (this.fakeElem.value = this.text),
                            document.body.appendChild(this.fakeElem),
                            (this.selectedText = o.defaultKey(this.fakeElem)),
                            this.copyText()
                        }),
                        (t.prototype.removeFake = function() {
                          this.fakeHandler &&
                            (document.body.removeEventListener(
                              'click',
                              this.fakeHandlerCallback
                            ),
                            (this.fakeHandler = null),
                            (this.fakeHandlerCallback = null)),
                            this.fakeElem &&
                              (document.body.removeChild(this.fakeElem),
                              (this.fakeElem = null))
                        }),
                        (t.prototype.selectTarget = function() {
                          ;(this.selectedText = o.defaultKey(this.target)),
                            this.copyText()
                        }),
                        (t.prototype.copyText = function() {
                          var t = void 0
                          try {
                            t = document.execCommand(this.action)
                          } catch (e) {
                            t = !1
                          }
                          this.handleResult(t)
                        }),
                        (t.prototype.handleResult = function(t) {
                          t
                            ? this.emitter.emit('success', {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                              })
                            : this.emitter.emit('error', {
                                action: this.action,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                              })
                        }),
                        (t.prototype.clearSelection = function() {
                          this.target && this.target.blur(),
                            window.getSelection().removeAllRanges()
                        }),
                        (t.prototype.destroy = function() {
                          this.removeFake()
                        }),
                        s(t, [
                          {
                            key: 'action',
                            set: function() {
                              var t =
                                arguments.length <= 0 || void 0 === arguments[0]
                                  ? 'copy'
                                  : arguments[0]
                              if (
                                ((this._action = t),
                                'copy' !== this._action &&
                                  'cut' !== this._action)
                              )
                                throw new Error(
                                  "Invalid 'action' value, use either 'copy' or 'cut'"
                                )
                            },
                            get: function() {
                              return this._action
                            }
                          },
                          {
                            key: 'target',
                            set: function(t) {
                              if (void 0 !== t) {
                                if (
                                  !t ||
                                  'object' !==
                                    ('undefined' == typeof t
                                      ? 'undefined'
                                      : r(t)) ||
                                  1 !== t.nodeType
                                )
                                  throw new Error(
                                    'Invalid "target" value, use a valid Element'
                                  )
                                if (
                                  'copy' === this.action &&
                                  t.hasAttribute('disabled')
                                )
                                  throw new Error(
                                    "Invalid 'target' attribute. Please use 'readonly' instead of 'disabled' attribute"
                                  )
                                if (
                                  'cut' === this.action &&
                                  (t.hasAttribute('readonly') ||
                                    t.hasAttribute('disabled'))
                                )
                                  throw new Error(
                                    "Invalid 'target' attribute. You can't cut text from elements with 'readonly' or 'disabled' attributes"
                                  )
                                this._target = t
                              }
                            },
                            get: function() {
                              return this._target
                            }
                          }
                        ]),
                        t
                      )
                    })()
                  t.exports = a
                })
              },
              { select: 6 }
            ],
            9: [
              function(t, i, n) {
                debugger
                !(function(o, r) {
                  debugger
                  if ('function' == typeof e && e.amd)
                    e(
                      [
                        'module',
                        './clipboard-action',
                        'tiny-emitter',
                        'good-listener'
                      ],
                      r
                    )
                  else if ('undefined' != typeof n)
                    r(
                      i,
                      t('./clipboard-action'),
                      t('tiny-emitter'),
                      t('good-listener')
                    )
                  else {
                    var s = { exports: {} }
                    r(s, o.clipboardAction, o.tinyEmitter, o.goodListener),
                      (o.clipboard = s.exports)
                  }
                })(this, function(t, e, i, n) {
                  debugger
                  'use strict'
                  function o(t) {
                    return t && t.__esModule ? t : { defaultKey: t }
                  }
                  function r(t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  }
                  function s(t, e) {
                    if (!t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e ||
                      ('object' != typeof e && 'function' != typeof e)
                      ? t
                      : e
                  }
                  function a(t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                      }
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  }
                  function l(t, e) {
                    var i = 'data-clipboard-' + t
                    if (e.hasAttribute(i)) return e.getAttribute(i)
                  }
                  debugger
                  var c = o(e),
                    u = o(i),
                    h = o(n),
                    f = (function(t) {
                      function e(i, n) {
                        r(this, e)
                        var o = s(this, t.call(this))
                        return o.resolveOptions(n), o.listenClick(i), o
                      }
                      return (
                        a(e, t),
                        (e.prototype.resolveOptions = function() {
                          var t =
                            arguments.length <= 0 || void 0 === arguments[0]
                              ? {}
                              : arguments[0]
                          ;(this.action =
                            'function' == typeof t.action
                              ? t.action
                              : this.defaultAction),
                            (this.target =
                              'function' == typeof t.target
                                ? t.target
                                : this.defaultTarget),
                            (this.text =
                              'function' == typeof t.text
                                ? t.text
                                : this.defaultText)
                        }),
                        (e.prototype.listenClick = function(t) {
                          var e = this
                          this.listener = h.defaultKey(t, 'click', function(t) {
                            return e.onClick(t)
                          })
                        }),
                        (e.prototype.onClick = function(t) {
                          var e = t.delegateTarget || t.currentTarget
                          this.clipboardAction && (this.clipboardAction = null),
                            (this.clipboardAction = new c.defaultKey({
                              action: this.action(e),
                              target: this.target(e),
                              text: this.text(e),
                              trigger: e,
                              emitter: this
                            }))
                        }),
                        (e.prototype.defaultAction = function(t) {
                          return l('action', t)
                        }),
                        (e.prototype.defaultTarget = function(t) {
                          var e = l('target', t)
                          return e ? document.querySelector(e) : void 0
                        }),
                        (e.prototype.defaultText = function(t) {
                          return l('text', t)
                        }),
                        (e.prototype.destroy = function() {
                          this.listener.destroy(),
                            this.clipboardAction &&
                              (this.clipboardAction.destroy(),
                              (this.clipboardAction = null))
                        }),
                        e
                      )
                    })(u.defaultKey)
                  t.exports = f
                })
              },
              { './clipboard-action': 8, 'good-listener': 4, 'tiny-emitter': 7 }
            ]
          },
          {},
          [9]
        )(9)
      })
    },
    getZeroClipboard: function() {
      var t = {
        version: '1.0.7',
        clients: {},
        moviePath:
          '/box-static/base/widget/clipboard/ZeroClipboard_4282342.swf',
        nextId: 1,
        $: function(t) {
          return (
            'string' == typeof t && (t = document.getElementById(t)),
            t.addClass ||
              ((t.hide = function() {
                this.style.display = 'none'
              }),
              (t.show = function() {
                this.style.display = ''
              }),
              (t.addClass = function(t) {
                this.removeClass(t), (this.className += ' ' + t)
              }),
              (t.removeClass = function(t) {
                for (
                  var e = this.className.split(/\s+/), i = -1, n = 0;
                  n < e.length;
                  n++
                )
                  e[n] === t && ((i = n), (n = e.length))
                return (
                  i > -1 && (e.splice(i, 1), (this.className = e.join(' '))),
                  this
                )
              }),
              (t.hasClass = function(t) {
                return !!this.className.match(new RegExp('\\s*' + t + '\\s*'))
              })),
            t
          )
        },
        setMoviePath: function(t) {
          this.moviePath = t
        },
        dispatch: function(t, e, i) {
          var n = this.clients[t]
          n && n.receiveEvent(e, i)
        },
        register: function(t, e) {
          this.clients[t] = e
        },
        getDOMObjectPosition: function(t, e) {
          for (
            var i = {
              left: 0,
              top: 0,
              width: (t.width ? t.width : t.offsetWidth) || this.defWidth,
              height: (t.height ? t.height : t.offsetHeight) || this.defHeight
            };
            t && t !== e;

          )
            (i.left += t.offsetLeft),
              (i.top += t.offsetTop),
              (t = t.offsetParent)
          return i
        },
        Client: function(e) {
          ;(this.handlers = {}),
            (this.id = t.nextId++),
            (this.movieId = 'ZeroClipboardMovie_' + this.id),
            t.register(this.id, this),
            e && this.glue(e)
        }
      }
      return (
        (t.Client.prototype = {
          id: 0,
          ready: !1,
          movie: null,
          clipText: '',
          handCursorEnabled: !0,
          cssEffects: !0,
          handlers: null,
          glue: function(e, i, n) {
            this.domElement = t.$(e)
            var o = 9999
            this.domElement.style.zIndex &&
              (o = parseInt(this.domElement.style.zIndex, 10) + 1),
              'string' == typeof i
                ? (i = t.$(i))
                : 'undefined' == typeof i &&
                  (i = document.getElementsByTagName('body')[0])
            var r = t.getDOMObjectPosition(this.domElement, i)
            this.div = document.createElement('div')
            var s = this.div.style
            if (
              ((s.position = 'absolute'),
              (s.left = '' + r.left + 'px'),
              (s.top = '' + r.top + 'px'),
              (s.width = r.width ? '' + r.width + 'px' : '100%'),
              (s.height = r.height ? '' + r.height + 'px' : '100%'),
              (s.zIndex = o),
              'object' == typeof n)
            )
              for (var a in n) s[a] = n[a]
            i.appendChild(this.div),
              (this.div.innerHTML = this.getHTML(r.width, r.height))
          },
          getHTML: function(e, i) {
            var n = '',
              o = 'id=' + this.id + '&width=' + e + '&height=' + i
            if (navigator.userAgent.match(/MSIE/)) {
              var r = location.href.match(/^https/i) ? 'https://' : 'http://'
              n +=
                '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' +
                r +
                'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" style="position:absolute;left:0;top:0;width:100%;height:100%;"" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' +
                t.moviePath +
                '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' +
                o +
                '"/><param name="wmode" value="transparent"/></object>'
            } else
              n +=
                '<embed id="' +
                this.movieId +
                '" src="' +
                t.moviePath +
                '" loop="false" menu="false" quality="best" bgcolor="#ffffff" name="' +
                this.movieId +
                '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' +
                o +
                '" wmode="transparent" style="position:absolute;left:0;top:0;width:100%;height:100%;"/>'
            return n
          },
          hide: function() {
            this.div && (this.div.style.left = '-2000px')
          },
          setEnabled: function(t) {
            this.div && (this.div.style.display = t ? 'block' : 'none')
          },
          show: function() {
            this.reposition()
          },
          destroy: function() {
            if (this.domElement && this.div) {
              this.hide(), (this.div.innerHTML = '')
              var t = this.div.parentNode
              try {
                t.removeChild(this.div)
              } catch (e) {}
              ;(this.domElement = null), (this.div = null)
            }
          },
          reposition: function(e) {
            if (
              (e &&
                ((this.domElement = t.$(e)), this.domElement || this.hide()),
              this.domElement && this.div)
            ) {
              var i = t.getDOMObjectPosition(this.domElement),
                n = this.div.style
              ;(n.left = '' + i.left + 'px'), (n.top = '' + i.top + 'px')
            }
          },
          setText: function(t) {
            ;(this.clipText = t), this.ready && this.movie.setText(t)
          },
          setSize: function(e, i) {
            ;(t.defWidth = e || 0), (t.defHeight = i || 0)
          },
          addEventListener: function(t, e) {
            ;(t = t
              .toString()
              .toLowerCase()
              .replace(/^on/, '')),
              this.handlers[t] || (this.handlers[t] = []),
              this.handlers[t].push(e)
          },
          setHandCursor: function(t) {
            ;(this.handCursorEnabled = t),
              this.ready && this.movie.setHandCursor(t)
          },
          setCSSEffects: function(t) {
            this.cssEffects = !!t
          },
          receiveEvent: function(t, e) {
            switch (
              (t = t
                .toString()
                .toLowerCase()
                .replace(/^on/, ''))
            ) {
              case 'load':
                if (
                  ((this.movie = document.getElementById(this.movieId)),
                  !this.movie)
                ) {
                  var i = this
                  return void setTimeout(function() {
                    i.receiveEvent('load', null)
                  }, 1)
                }
                if (
                  !this.ready &&
                  navigator.userAgent.match(/Firefox/) &&
                  navigator.userAgent.match(/Windows/)
                ) {
                  var i = this
                  return (
                    setTimeout(function() {
                      i.receiveEvent('load', null)
                    }, 100),
                    void (this.ready = !0)
                  )
                }
                ;(this.ready = !0),
                  this.movie.setText(this.clipText),
                  this.movie.setHandCursor(this.handCursorEnabled)
                break
              case 'mouseover':
                this.domElement &&
                  this.cssEffects &&
                  (this.domElement.addClass('hover'),
                  this.recoverActive && this.domElement.addClass('active'))
                break
              case 'mouseout':
                this.domElement &&
                  this.cssEffects &&
                  ((this.recoverActive = !1),
                  this.domElement.hasClass('active') &&
                    (this.domElement.removeClass('active'),
                    (this.recoverActive = !0)),
                  this.domElement.removeClass('hover'))
                break
              case 'mousedown':
                this.domElement &&
                  this.cssEffects &&
                  this.domElement.addClass('active')
                break
              case 'mouseup':
                this.domElement &&
                  this.cssEffects &&
                  (this.domElement.removeClass('active'),
                  (this.recoverActive = !1))
            }
            if (this.handlers[t])
              for (var n = 0, o = this.handlers[t].length; o > n; n++) {
                var r = this.handlers[t][n]
                'function' == typeof r
                  ? r(this, e)
                  : 'object' == typeof r && 2 === r.length
                  ? r[0][r[1]](this, e)
                  : 'string' == typeof r && window[r](this, e)
              }
          }
        }),
        (window.ZeroClipboard = t),
        t
      )
    }
  }
})


var clipboard = require('base:widget/clipboard/clipboard.js')

clipboard.getHTML5Clipboard()