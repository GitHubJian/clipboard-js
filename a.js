define('base:widget/clipboard/clipboard.js', function(t, e, i) {
  i.exports = {
    getHTML5Clipboard: function() {
      return (function(t) {
        return t()
      })(function() {
        var e
        return (function i(e, n, o) {
          function r(a, l) {
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
                !(function(o, r) {
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
define('base:widget/ZeroClipboard/ZeroClipboard.js', function(e, o, i) {
  i.exports = e('base:widget/clipboard/clipboard.js').getZeroClipboard()
})
define('base:widget/libs/jquery-1.12.4.js', function(e, t, n) {
  !(function(e, t) {
    'object' == typeof n && 'object' == typeof n.exports
      ? (n.exports = e.document
          ? t(e, !0)
          : function(e) {
              if (!e.document)
                throw new Error('jQuery requires a window with a document')
              return t(e)
            })
      : t(e)
  })('undefined' != typeof window ? window : this, function(e, t) {
    function n(e) {
      var t = !!e && 'length' in e && e.length,
        n = pt.type(e)
      return 'function' === n || pt.isWindow(e)
        ? !1
        : 'array' === n ||
            0 === t ||
            ('number' == typeof t && t > 0 && t - 1 in e)
    }
    function r(e, t, n) {
      if (pt.isFunction(t))
        return pt.grep(e, function(e, r) {
          return !!t.call(e, r, e) !== n
        })
      if (t.nodeType)
        return pt.grep(e, function(e) {
          return (e === t) !== n
        })
      if ('string' == typeof t) {
        if (Ct.test(t)) return pt.filter(t, e, n)
        t = pt.filter(t, e)
      }
      return pt.grep(e, function(e) {
        return pt.inArray(e, t) > -1 !== n
      })
    }
    function i(e, t) {
      do e = e[t]
      while (e && 1 !== e.nodeType)
      return e
    }
    function o(e) {
      var t = {}
      return (
        pt.each(e.match(Dt) || [], function(e, n) {
          t[n] = !0
        }),
        t
      )
    }
    function a() {
      rt.addEventListener
        ? (rt.removeEventListener('DOMContentLoaded', s),
          e.removeEventListener('load', s))
        : (rt.detachEvent('onreadystatechange', s), e.detachEvent('onload', s))
    }
    function s() {
      ;(rt.addEventListener ||
        'load' === e.event.type ||
        'complete' === rt.readyState) &&
        (a(), pt.ready())
    }
    function u(e, t, n) {
      if (void 0 === n && 1 === e.nodeType) {
        var r = 'data-' + t.replace(_t, '-$1').toLowerCase()
        if (((n = e.getAttribute(r)), 'string' == typeof n)) {
          try {
            n =
              'true' === n
                ? !0
                : 'false' === n
                ? !1
                : 'null' === n
                ? null
                : +n + '' === n
                ? +n
                : qt.test(n)
                ? pt.parseJSON(n)
                : n
          } catch (i) {}
          pt.data(e, t, n)
        } else n = void 0
      }
      return n
    }
    function l(e) {
      var t
      for (t in e)
        if (('data' !== t || !pt.isEmptyObject(e[t])) && 'toJSON' !== t)
          return !1
      return !0
    }
    function c(e, t, n, r) {
      if (Ht(e)) {
        var i,
          o,
          a = pt.expando,
          s = e.nodeType,
          u = s ? pt.cache : e,
          l = s ? e[a] : e[a] && a
        if (
          (l && u[l] && (r || u[l].data)) ||
          void 0 !== n ||
          'string' != typeof t
        )
          return (
            l || (l = s ? (e[a] = nt.pop() || pt.guid++) : a),
            u[l] || (u[l] = s ? {} : { toJSON: pt.noop }),
            ('object' == typeof t || 'function' == typeof t) &&
              (r
                ? (u[l] = pt.extend(u[l], t))
                : (u[l].data = pt.extend(u[l].data, t))),
            (o = u[l]),
            r || (o.data || (o.data = {}), (o = o.data)),
            void 0 !== n && (o[pt.camelCase(t)] = n),
            'string' == typeof t
              ? ((i = o[t]), null == i && (i = o[pt.camelCase(t)]))
              : (i = o),
            i
          )
      }
    }
    function d(e, t, n) {
      if (Ht(e)) {
        var r,
          i,
          o = e.nodeType,
          a = o ? pt.cache : e,
          s = o ? e[pt.expando] : pt.expando
        if (a[s]) {
          if (t && (r = n ? a[s] : a[s].data)) {
            pt.isArray(t)
              ? (t = t.concat(pt.map(t, pt.camelCase)))
              : t in r
              ? (t = [t])
              : ((t = pt.camelCase(t)), (t = t in r ? [t] : t.split(' '))),
              (i = t.length)
            for (; i--; ) delete r[t[i]]
            if (n ? !l(r) : !pt.isEmptyObject(r)) return
          }
          ;(n || (delete a[s].data, l(a[s]))) &&
            (o
              ? pt.cleanData([e], !0)
              : dt.deleteExpando || a != a.window
              ? delete a[s]
              : (a[s] = void 0))
        }
      }
    }
    function f(e, t, n, r) {
      var i,
        o = 1,
        a = 20,
        s = r
          ? function() {
              return r.cur()
            }
          : function() {
              return pt.css(e, t, '')
            },
        u = s(),
        l = (n && n[3]) || (pt.cssNumber[t] ? '' : 'px'),
        c = (pt.cssNumber[t] || ('px' !== l && +u)) && Mt.exec(pt.css(e, t))
      if (c && c[3] !== l) {
        ;(l = l || c[3]), (n = n || []), (c = +u || 1)
        do (o = o || '.5'), (c /= o), pt.style(e, t, c + l)
        while (o !== (o = s() / u) && 1 !== o && --a)
      }
      return (
        n &&
          ((c = +c || +u || 0),
          (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
          r && ((r.unit = l), (r.start = c), (r.end = i))),
        i
      )
    }
    function p(e) {
      var t = zt.split('|'),
        n = e.createDocumentFragment()
      if (n.createElement) for (; t.length; ) n.createElement(t.pop())
      return n
    }
    function h(e, t) {
      var n,
        r,
        i = 0,
        o =
          'undefined' != typeof e.getElementsByTagName
            ? e.getElementsByTagName(t || '*')
            : 'undefined' != typeof e.querySelectorAll
            ? e.querySelectorAll(t || '*')
            : void 0
      if (!o)
        for (o = [], n = e.childNodes || e; null != (r = n[i]); i++)
          !t || pt.nodeName(r, t) ? o.push(r) : pt.merge(o, h(r, t))
      return void 0 === t || (t && pt.nodeName(e, t)) ? pt.merge([e], o) : o
    }
    function g(e, t) {
      for (var n, r = 0; null != (n = e[r]); r++)
        pt._data(n, 'globalEval', !t || pt._data(t[r], 'globalEval'))
    }
    function m(e) {
      Bt.test(e.type) && (e.defaultChecked = e.checked)
    }
    function v(e, t, n, r, i) {
      for (
        var o, a, s, u, l, c, d, f = e.length, v = p(t), y = [], x = 0;
        f > x;
        x++
      )
        if (((a = e[x]), a || 0 === a))
          if ('object' === pt.type(a)) pt.merge(y, a.nodeType ? [a] : a)
          else if (Ut.test(a)) {
            for (
              u = u || v.appendChild(t.createElement('div')),
                l = (Wt.exec(a) || ['', ''])[1].toLowerCase(),
                d = Xt[l] || Xt._default,
                u.innerHTML = d[1] + pt.htmlPrefilter(a) + d[2],
                o = d[0];
              o--;

            )
              u = u.lastChild
            if (
              (!dt.leadingWhitespace &&
                $t.test(a) &&
                y.push(t.createTextNode($t.exec(a)[0])),
              !dt.tbody)
            )
              for (
                a =
                  'table' !== l || Vt.test(a)
                    ? '<table>' !== d[1] || Vt.test(a)
                      ? 0
                      : u
                    : u.firstChild,
                  o = a && a.childNodes.length;
                o--;

              )
                pt.nodeName((c = a.childNodes[o]), 'tbody') &&
                  !c.childNodes.length &&
                  a.removeChild(c)
            for (pt.merge(y, u.childNodes), u.textContent = ''; u.firstChild; )
              u.removeChild(u.firstChild)
            u = v.lastChild
          } else y.push(t.createTextNode(a))
      for (
        u && v.removeChild(u),
          dt.appendChecked || pt.grep(h(y, 'input'), m),
          x = 0;
        (a = y[x++]);

      )
        if (r && pt.inArray(a, r) > -1) i && i.push(a)
        else if (
          ((s = pt.contains(a.ownerDocument, a)),
          (u = h(v.appendChild(a), 'script')),
          s && g(u),
          n)
        )
          for (o = 0; (a = u[o++]); ) It.test(a.type || '') && n.push(a)
      return (u = null), v
    }
    function y() {
      return !0
    }
    function x() {
      return !1
    }
    function b() {
      try {
        return rt.activeElement
      } catch (e) {}
    }
    function w(e, t, n, r, i, o) {
      var a, s
      if ('object' == typeof t) {
        'string' != typeof n && ((r = r || n), (n = void 0))
        for (s in t) w(e, s, n, r, t[s], o)
        return e
      }
      if (
        (null == r && null == i
          ? ((i = n), (r = n = void 0))
          : null == i &&
            ('string' == typeof n
              ? ((i = r), (r = void 0))
              : ((i = r), (r = n), (n = void 0))),
        i === !1)
      )
        i = x
      else if (!i) return e
      return (
        1 === o &&
          ((a = i),
          (i = function(e) {
            return pt().off(e), a.apply(this, arguments)
          }),
          (i.guid = a.guid || (a.guid = pt.guid++))),
        e.each(function() {
          pt.event.add(this, t, i, r, n)
        })
      )
    }
    function T(e, t) {
      return pt.nodeName(e, 'table') &&
        pt.nodeName(11 !== t.nodeType ? t : t.firstChild, 'tr')
        ? e.getElementsByTagName('tbody')[0] ||
            e.appendChild(e.ownerDocument.createElement('tbody'))
        : e
    }
    function C(e) {
      return (e.type = (null !== pt.find.attr(e, 'type')) + '/' + e.type), e
    }
    function E(e) {
      var t = on.exec(e.type)
      return t ? (e.type = t[1]) : e.removeAttribute('type'), e
    }
    function N(e, t) {
      if (1 === t.nodeType && pt.hasData(e)) {
        var n,
          r,
          i,
          o = pt._data(e),
          a = pt._data(t, o),
          s = o.events
        if (s) {
          delete a.handle, (a.events = {})
          for (n in s)
            for (r = 0, i = s[n].length; i > r; r++) pt.event.add(t, n, s[n][r])
        }
        a.data && (a.data = pt.extend({}, a.data))
      }
    }
    function k(e, t) {
      var n, r, i
      if (1 === t.nodeType) {
        if (
          ((n = t.nodeName.toLowerCase()), !dt.noCloneEvent && t[pt.expando])
        ) {
          i = pt._data(t)
          for (r in i.events) pt.removeEvent(t, r, i.handle)
          t.removeAttribute(pt.expando)
        }
        'script' === n && t.text !== e.text
          ? ((C(t).text = e.text), E(t))
          : 'object' === n
          ? (t.parentNode && (t.outerHTML = e.outerHTML),
            dt.html5Clone &&
              e.innerHTML &&
              !pt.trim(t.innerHTML) &&
              (t.innerHTML = e.innerHTML))
          : 'input' === n && Bt.test(e.type)
          ? ((t.defaultChecked = t.checked = e.checked),
            t.value !== e.value && (t.value = e.value))
          : 'option' === n
          ? (t.defaultSelected = t.selected = e.defaultSelected)
          : ('input' === n || 'textarea' === n) &&
            (t.defaultValue = e.defaultValue)
      }
    }
    function S(e, t, n, r) {
      t = ot.apply([], t)
      var i,
        o,
        a,
        s,
        u,
        l,
        c = 0,
        d = e.length,
        f = d - 1,
        p = t[0],
        g = pt.isFunction(p)
      if (g || (d > 1 && 'string' == typeof p && !dt.checkClone && rn.test(p)))
        return e.each(function(i) {
          var o = e.eq(i)
          g && (t[0] = p.call(this, i, o.html())), S(o, t, n, r)
        })
      if (
        d &&
        ((l = v(t, e[0].ownerDocument, !1, e, r)),
        (i = l.firstChild),
        1 === l.childNodes.length && (l = i),
        i || r)
      ) {
        for (s = pt.map(h(l, 'script'), C), a = s.length; d > c; c++)
          (o = l),
            c !== f &&
              ((o = pt.clone(o, !0, !0)), a && pt.merge(s, h(o, 'script'))),
            n.call(e[c], o, c)
        if (a)
          for (
            u = s[s.length - 1].ownerDocument, pt.map(s, E), c = 0;
            a > c;
            c++
          )
            (o = s[c]),
              It.test(o.type || '') &&
                !pt._data(o, 'globalEval') &&
                pt.contains(u, o) &&
                (o.src
                  ? pt._evalUrl && pt._evalUrl(o.src)
                  : pt.globalEval(
                      (o.text || o.textContent || o.innerHTML || '').replace(
                        an,
                        ''
                      )
                    ))
        l = i = null
      }
      return e
    }
    function A(e, t, n) {
      for (var r, i = t ? pt.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
        n || 1 !== r.nodeType || pt.cleanData(h(r)),
          r.parentNode &&
            (n && pt.contains(r.ownerDocument, r) && g(h(r, 'script')),
            r.parentNode.removeChild(r))
      return e
    }
    function D(e, t) {
      var n = pt(t.createElement(e)).appendTo(t.body),
        r = pt.css(n[0], 'display')
      return n.detach(), r
    }
    function j(e) {
      var t = rt,
        n = cn[e]
      return (
        n ||
          ((n = D(e, t)),
          ('none' !== n && n) ||
            ((ln = (
              ln || pt("<iframe frameborder='0' width='0' height='0'/>")
            ).appendTo(t.documentElement)),
            (t = (ln[0].contentWindow || ln[0].contentDocument).document),
            t.write(),
            t.close(),
            (n = D(e, t)),
            ln.detach()),
          (cn[e] = n)),
        n
      )
    }
    function L(e, t) {
      return {
        get: function() {
          return e()
            ? void delete this.get
            : (this.get = t).apply(this, arguments)
        }
      }
    }
    function H(e) {
      if (e in Nn) return e
      for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = En.length; n--; )
        if (((e = En[n] + t), e in Nn)) return e
    }
    function q(e, t) {
      for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)
        (r = e[a]),
          r.style &&
            ((o[a] = pt._data(r, 'olddisplay')),
            (n = r.style.display),
            t
              ? (o[a] || 'none' !== n || (r.style.display = ''),
                '' === r.style.display &&
                  Rt(r) &&
                  (o[a] = pt._data(r, 'olddisplay', j(r.nodeName))))
              : ((i = Rt(r)),
                ((n && 'none' !== n) || !i) &&
                  pt._data(r, 'olddisplay', i ? n : pt.css(r, 'display'))))
      for (a = 0; s > a; a++)
        (r = e[a]),
          r.style &&
            ((t && 'none' !== r.style.display && '' !== r.style.display) ||
              (r.style.display = t ? o[a] || '' : 'none'))
      return e
    }
    function _(e, t, n) {
      var r = wn.exec(t)
      return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || 'px') : t
    }
    function F(e, t, n, r, i) {
      for (
        var o = n === (r ? 'border' : 'content') ? 4 : 'width' === t ? 1 : 0,
          a = 0;
        4 > o;
        o += 2
      )
        'margin' === n && (a += pt.css(e, n + Ot[o], !0, i)),
          r
            ? ('content' === n && (a -= pt.css(e, 'padding' + Ot[o], !0, i)),
              'margin' !== n &&
                (a -= pt.css(e, 'border' + Ot[o] + 'Width', !0, i)))
            : ((a += pt.css(e, 'padding' + Ot[o], !0, i)),
              'padding' !== n &&
                (a += pt.css(e, 'border' + Ot[o] + 'Width', !0, i)))
      return a
    }
    function M(e, t, n) {
      var r = !0,
        i = 'width' === t ? e.offsetWidth : e.offsetHeight,
        o = gn(e),
        a = dt.boxSizing && 'border-box' === pt.css(e, 'boxSizing', !1, o)
      if (0 >= i || null == i) {
        if (
          ((i = mn(e, t, o)),
          (0 > i || null == i) && (i = e.style[t]),
          fn.test(i))
        )
          return i
        ;(r = a && (dt.boxSizingReliable() || i === e.style[t])),
          (i = parseFloat(i) || 0)
      }
      return i + F(e, t, n || (a ? 'border' : 'content'), r, o) + 'px'
    }
    function O(e, t, n, r, i) {
      return new O.prototype.init(e, t, n, r, i)
    }
    function R() {
      return (
        e.setTimeout(function() {
          kn = void 0
        }),
        (kn = pt.now())
      )
    }
    function P(e, t) {
      var n,
        r = { height: e },
        i = 0
      for (t = t ? 1 : 0; 4 > i; i += 2 - t)
        (n = Ot[i]), (r['margin' + n] = r['padding' + n] = e)
      return t && (r.opacity = r.width = e), r
    }
    function B(e, t, n) {
      for (
        var r,
          i = ($.tweeners[t] || []).concat($.tweeners['*']),
          o = 0,
          a = i.length;
        a > o;
        o++
      )
        if ((r = i[o].call(n, t, e))) return r
    }
    function W(e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        d = this,
        f = {},
        p = e.style,
        h = e.nodeType && Rt(e),
        g = pt._data(e, 'fxshow')
      n.queue ||
        ((s = pt._queueHooks(e, 'fx')),
        null == s.unqueued &&
          ((s.unqueued = 0),
          (u = s.empty.fire),
          (s.empty.fire = function() {
            s.unqueued || u()
          })),
        s.unqueued++,
        d.always(function() {
          d.always(function() {
            s.unqueued--, pt.queue(e, 'fx').length || s.empty.fire()
          })
        })),
        1 === e.nodeType &&
          ('height' in t || 'width' in t) &&
          ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
          (l = pt.css(e, 'display')),
          (c = 'none' === l ? pt._data(e, 'olddisplay') || j(e.nodeName) : l),
          'inline' === c &&
            'none' === pt.css(e, 'float') &&
            (dt.inlineBlockNeedsLayout && 'inline' !== j(e.nodeName)
              ? (p.zoom = 1)
              : (p.display = 'inline-block'))),
        n.overflow &&
          ((p.overflow = 'hidden'),
          dt.shrinkWrapBlocks() ||
            d.always(function() {
              ;(p.overflow = n.overflow[0]),
                (p.overflowX = n.overflow[1]),
                (p.overflowY = n.overflow[2])
            }))
      for (r in t)
        if (((i = t[r]), An.exec(i))) {
          if (
            (delete t[r],
            (o = o || 'toggle' === i),
            i === (h ? 'hide' : 'show'))
          ) {
            if ('show' !== i || !g || void 0 === g[r]) continue
            h = !0
          }
          f[r] = (g && g[r]) || pt.style(e, r)
        } else l = void 0
      if (pt.isEmptyObject(f))
        'inline' === ('none' === l ? j(e.nodeName) : l) && (p.display = l)
      else {
        g ? 'hidden' in g && (h = g.hidden) : (g = pt._data(e, 'fxshow', {})),
          o && (g.hidden = !h),
          h
            ? pt(e).show()
            : d.done(function() {
                pt(e).hide()
              }),
          d.done(function() {
            var t
            pt._removeData(e, 'fxshow')
            for (t in f) pt.style(e, t, f[t])
          })
        for (r in f)
          (a = B(h ? g[r] : 0, r, d)),
            r in g ||
              ((g[r] = a.start),
              h &&
                ((a.end = a.start),
                (a.start = 'width' === r || 'height' === r ? 1 : 0)))
      }
    }
    function I(e, t) {
      var n, r, i, o, a
      for (n in e)
        if (
          ((r = pt.camelCase(n)),
          (i = t[r]),
          (o = e[n]),
          pt.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
          n !== r && ((e[r] = o), delete e[n]),
          (a = pt.cssHooks[r]),
          a && 'expand' in a)
        ) {
          ;(o = a.expand(o)), delete e[r]
          for (n in o) n in e || ((e[n] = o[n]), (t[n] = i))
        } else t[r] = i
    }
    function $(e, t, n) {
      var r,
        i,
        o = 0,
        a = $.prefilters.length,
        s = pt.Deferred().always(function() {
          delete u.elem
        }),
        u = function() {
          if (i) return !1
          for (
            var t = kn || R(),
              n = Math.max(0, l.startTime + l.duration - t),
              r = n / l.duration || 0,
              o = 1 - r,
              a = 0,
              u = l.tweens.length;
            u > a;
            a++
          )
            l.tweens[a].run(o)
          return (
            s.notifyWith(e, [l, o, n]),
            1 > o && u ? n : (s.resolveWith(e, [l]), !1)
          )
        },
        l = s.promise({
          elem: e,
          props: pt.extend({}, t),
          opts: pt.extend(
            !0,
            { specialEasing: {}, easing: pt.easing._default },
            n
          ),
          originalProperties: t,
          originalOptions: n,
          startTime: kn || R(),
          duration: n.duration,
          tweens: [],
          createTween: function(t, n) {
            var r = pt.Tween(
              e,
              l.opts,
              t,
              n,
              l.opts.specialEasing[t] || l.opts.easing
            )
            return l.tweens.push(r), r
          },
          stop: function(t) {
            var n = 0,
              r = t ? l.tweens.length : 0
            if (i) return this
            for (i = !0; r > n; n++) l.tweens[n].run(1)
            return (
              t
                ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t]))
                : s.rejectWith(e, [l, t]),
              this
            )
          }
        }),
        c = l.props
      for (I(c, l.opts.specialEasing); a > o; o++)
        if ((r = $.prefilters[o].call(l, e, c, l.opts)))
          return (
            pt.isFunction(r.stop) &&
              (pt._queueHooks(l.elem, l.opts.queue).stop = pt.proxy(r.stop, r)),
            r
          )
      return (
        pt.map(c, B, l),
        pt.isFunction(l.opts.start) && l.opts.start.call(e, l),
        pt.fx.timer(pt.extend(u, { elem: e, anim: l, queue: l.opts.queue })),
        l
          .progress(l.opts.progress)
          .done(l.opts.done, l.opts.complete)
          .fail(l.opts.fail)
          .always(l.opts.always)
      )
    }
    function z(e) {
      return pt.attr(e, 'class') || ''
    }
    function X(e) {
      return function(t, n) {
        'string' != typeof t && ((n = t), (t = '*'))
        var r,
          i = 0,
          o = t.toLowerCase().match(Dt) || []
        if (pt.isFunction(n))
          for (; (r = o[i++]); )
            '+' === r.charAt(0)
              ? ((r = r.slice(1) || '*'), (e[r] = e[r] || []).unshift(n))
              : (e[r] = e[r] || []).push(n)
      }
    }
    function U(e, t, n, r) {
      function i(s) {
        var u
        return (
          (o[s] = !0),
          pt.each(e[s] || [], function(e, s) {
            var l = s(t, n, r)
            return 'string' != typeof l || a || o[l]
              ? a
                ? !(u = l)
                : void 0
              : (t.dataTypes.unshift(l), i(l), !1)
          }),
          u
        )
      }
      var o = {},
        a = e === Zn
      return i(t.dataTypes[0]) || (!o['*'] && i('*'))
    }
    function V(e, t) {
      var n,
        r,
        i = pt.ajaxSettings.flatOptions || {}
      for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r])
      return n && pt.extend(!0, e, n), e
    }
    function Y(e, t, n) {
      for (var r, i, o, a, s = e.contents, u = e.dataTypes; '*' === u[0]; )
        u.shift(),
          void 0 === i &&
            (i = e.mimeType || t.getResponseHeader('Content-Type'))
      if (i)
        for (a in s)
          if (s[a] && s[a].test(i)) {
            u.unshift(a)
            break
          }
      if (u[0] in n) o = u[0]
      else {
        for (a in n) {
          if (!u[0] || e.converters[a + ' ' + u[0]]) {
            o = a
            break
          }
          r || (r = a)
        }
        o = o || r
      }
      return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }
    function J(e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l = {},
        c = e.dataTypes.slice()
      if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a]
      for (o = c.shift(); o; )
        if (
          (e.responseFields[o] && (n[e.responseFields[o]] = t),
          !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
          (u = o),
          (o = c.shift()))
        )
          if ('*' === o) o = u
          else if ('*' !== u && u !== o) {
            if (((a = l[u + ' ' + o] || l['* ' + o]), !a))
              for (i in l)
                if (
                  ((s = i.split(' ')),
                  s[1] === o && (a = l[u + ' ' + s[0]] || l['* ' + s[0]]))
                ) {
                  a === !0
                    ? (a = l[i])
                    : l[i] !== !0 && ((o = s[0]), c.unshift(s[1]))
                  break
                }
            if (a !== !0)
              if (a && e['throws']) t = a(t)
              else
                try {
                  t = a(t)
                } catch (d) {
                  return {
                    state: 'parsererror',
                    error: a ? d : 'No conversion from ' + u + ' to ' + o
                  }
                }
          }
      return { state: 'success', data: t }
    }
    function G(e) {
      return (e.style && e.style.display) || pt.css(e, 'display')
    }
    function Q(e) {
      if (!pt.contains(e.ownerDocument || rt, e)) return !0
      for (; e && 1 === e.nodeType; ) {
        if ('none' === G(e) || 'hidden' === e.type) return !0
        e = e.parentNode
      }
      return !1
    }
    function K(e, t, n, r) {
      var i
      if (pt.isArray(t))
        pt.each(t, function(t, i) {
          n || ir.test(e)
            ? r(e, i)
            : K(
                e + '[' + ('object' == typeof i && null != i ? t : '') + ']',
                i,
                n,
                r
              )
        })
      else if (n || 'object' !== pt.type(t)) r(e, t)
      else for (i in t) K(e + '[' + i + ']', t[i], n, r)
    }
    function Z() {
      try {
        return new e.XMLHttpRequest()
      } catch (t) {}
    }
    function et() {
      try {
        return new e.ActiveXObject('Microsoft.XMLHTTP')
      } catch (t) {}
    }
    function tt(e) {
      return pt.isWindow(e)
        ? e
        : 9 === e.nodeType
        ? e.defaultView || e.parentWindow
        : !1
    }
    var nt = [],
      rt = e.document,
      it = nt.slice,
      ot = nt.concat,
      at = nt.push,
      st = nt.indexOf,
      ut = {},
      lt = ut.toString,
      ct = ut.hasOwnProperty,
      dt = {},
      ft = '1.12.4',
      pt = function(e, t) {
        return new pt.fn.init(e, t)
      },
      ht = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      gt = /^-ms-/,
      mt = /-([\da-z])/gi,
      vt = function(e, t) {
        return t.toUpperCase()
      }
    ;(pt.fn = pt.prototype = {
      jquery: ft,
      constructor: pt,
      selector: '',
      length: 0,
      toArray: function() {
        return it.call(this)
      },
      get: function(e) {
        return null != e
          ? 0 > e
            ? this[e + this.length]
            : this[e]
          : it.call(this)
      },
      pushStack: function(e) {
        var t = pt.merge(this.constructor(), e)
        return (t.prevObject = this), (t.context = this.context), t
      },
      each: function(e) {
        return pt.each(this, e)
      },
      map: function(e) {
        return this.pushStack(
          pt.map(this, function(t, n) {
            return e.call(t, n, t)
          })
        )
      },
      slice: function() {
        return this.pushStack(it.apply(this, arguments))
      },
      first: function() {
        return this.eq(0)
      },
      last: function() {
        return this.eq(-1)
      },
      eq: function(e) {
        var t = this.length,
          n = +e + (0 > e ? t : 0)
        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
      },
      end: function() {
        return this.prevObject || this.constructor()
      },
      push: at,
      sort: nt.sort,
      splice: nt.splice
    }),
      (pt.extend = pt.fn.extend = function() {
        var e,
          t,
          n,
          r,
          i,
          o,
          a = arguments[0] || {},
          s = 1,
          u = arguments.length,
          l = !1
        for (
          'boolean' == typeof a && ((l = a), (a = arguments[s] || {}), s++),
            'object' == typeof a || pt.isFunction(a) || (a = {}),
            s === u && ((a = this), s--);
          u > s;
          s++
        )
          if (null != (i = arguments[s]))
            for (r in i)
              (e = a[r]),
                (n = i[r]),
                a !== n &&
                  (l && n && (pt.isPlainObject(n) || (t = pt.isArray(n)))
                    ? (t
                        ? ((t = !1), (o = e && pt.isArray(e) ? e : []))
                        : (o = e && pt.isPlainObject(e) ? e : {}),
                      (a[r] = pt.extend(l, o, n)))
                    : void 0 !== n && (a[r] = n))
        return a
      }),
      pt.extend({
        expando: 'jQuery' + (ft + Math.random()).replace(/\D/g, ''),
        isReady: !0,
        error: function(e) {
          throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
          return 'function' === pt.type(e)
        },
        isArray:
          Array.isArray ||
          function(e) {
            return 'array' === pt.type(e)
          },
        isWindow: function(e) {
          return null != e && e == e.window
        },
        isNumeric: function(e) {
          var t = e && e.toString()
          return !pt.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(e) {
          var t
          for (t in e) return !1
          return !0
        },
        isPlainObject: function(e) {
          var t
          if (!e || 'object' !== pt.type(e) || e.nodeType || pt.isWindow(e))
            return !1
          try {
            if (
              e.constructor &&
              !ct.call(e, 'constructor') &&
              !ct.call(e.constructor.prototype, 'isPrototypeOf')
            )
              return !1
          } catch (n) {
            return !1
          }
          if (!dt.ownFirst) for (t in e) return ct.call(e, t)
          for (t in e);
          return void 0 === t || ct.call(e, t)
        },
        type: function(e) {
          return null == e
            ? e + ''
            : 'object' == typeof e || 'function' == typeof e
            ? ut[lt.call(e)] || 'object'
            : typeof e
        },
        globalEval: function(t) {
          t &&
            pt.trim(t) &&
            (e.execScript ||
              function(t) {
                e.eval.call(e, t)
              })(t)
        },
        camelCase: function(e) {
          return e.replace(gt, 'ms-').replace(mt, vt)
        },
        nodeName: function(e, t) {
          return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
          var r,
            i = 0
          if (n(e))
            for (r = e.length; r > i && t.call(e[i], i, e[i]) !== !1; i++);
          else for (i in e) if (t.call(e[i], i, e[i]) === !1) break
          return e
        },
        trim: function(e) {
          return null == e ? '' : (e + '').replace(ht, '')
        },
        makeArray: function(e, t) {
          var r = t || []
          return (
            null != e &&
              (n(Object(e))
                ? pt.merge(r, 'string' == typeof e ? [e] : e)
                : at.call(r, e)),
            r
          )
        },
        inArray: function(e, t, n) {
          var r
          if (t) {
            if (st) return st.call(t, e, n)
            for (
              r = t.length, n = n ? (0 > n ? Math.max(0, r + n) : n) : 0;
              r > n;
              n++
            )
              if (n in t && t[n] === e) return n
          }
          return -1
        },
        merge: function(e, t) {
          for (var n = +t.length, r = 0, i = e.length; n > r; ) e[i++] = t[r++]
          if (n !== n) for (; void 0 !== t[r]; ) e[i++] = t[r++]
          return (e.length = i), e
        },
        grep: function(e, t, n) {
          for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)
            (r = !t(e[o], o)), r !== s && i.push(e[o])
          return i
        },
        map: function(e, t, r) {
          var i,
            o,
            a = 0,
            s = []
          if (n(e))
            for (i = e.length; i > a; a++)
              (o = t(e[a], a, r)), null != o && s.push(o)
          else for (a in e) (o = t(e[a], a, r)), null != o && s.push(o)
          return ot.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
          var n, r, i
          return (
            'string' == typeof t && ((i = e[t]), (t = e), (e = i)),
            pt.isFunction(e)
              ? ((n = it.call(arguments, 2)),
                (r = function() {
                  return e.apply(t || this, n.concat(it.call(arguments)))
                }),
                (r.guid = e.guid = e.guid || pt.guid++),
                r)
              : void 0
          )
        },
        now: function() {
          return +new Date()
        },
        browser: {},
        support: dt
      }),
      'function' == typeof Symbol &&
        (pt.fn[Symbol.iterator] = nt[Symbol.iterator]),
      pt.each(
        'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
          ' '
        ),
        function(e, t) {
          ut['[object ' + t + ']'] = t.toLowerCase()
        }
      )
    var yt = (function(e) {
      function t(e, t, n, r) {
        var i,
          o,
          a,
          s,
          u,
          l,
          d,
          p,
          h = t && t.ownerDocument,
          g = t ? t.nodeType : 9
        if (
          ((n = n || []),
          'string' != typeof e || !e || (1 !== g && 9 !== g && 11 !== g))
        )
          return n
        if (
          !r &&
          ((t ? t.ownerDocument || t : B) !== H && L(t), (t = t || H), _)
        ) {
          if (11 !== g && (l = vt.exec(e)))
            if ((i = l[1])) {
              if (9 === g) {
                if (!(a = t.getElementById(i))) return n
                if (a.id === i) return n.push(a), n
              } else if (
                h &&
                (a = h.getElementById(i)) &&
                R(t, a) &&
                a.id === i
              )
                return n.push(a), n
            } else {
              if (l[2]) return K.apply(n, t.getElementsByTagName(e)), n
              if (
                (i = l[3]) &&
                w.getElementsByClassName &&
                t.getElementsByClassName
              )
                return K.apply(n, t.getElementsByClassName(i)), n
            }
          if (!(!w.qsa || X[e + ' '] || (F && F.test(e)))) {
            if (1 !== g) (h = t), (p = e)
            else if ('object' !== t.nodeName.toLowerCase()) {
              for (
                (s = t.getAttribute('id'))
                  ? (s = s.replace(xt, '\\$&'))
                  : t.setAttribute('id', (s = P)),
                  d = N(e),
                  o = d.length,
                  u = ft.test(s) ? '#' + s : "[id='" + s + "']";
                o--;

              )
                d[o] = u + ' ' + f(d[o])
              ;(p = d.join(',')), (h = (yt.test(e) && c(t.parentNode)) || t)
            }
            if (p)
              try {
                return K.apply(n, h.querySelectorAll(p)), n
              } catch (m) {
              } finally {
                s === P && t.removeAttribute('id')
              }
          }
        }
        return S(e.replace(st, '$1'), t, n, r)
      }
      function n() {
        function e(n, r) {
          return (
            t.push(n + ' ') > T.cacheLength && delete e[t.shift()],
            (e[n + ' '] = r)
          )
        }
        var t = []
        return e
      }
      function r(e) {
        return (e[P] = !0), e
      }
      function i(e) {
        var t = H.createElement('div')
        try {
          return !!e(t)
        } catch (n) {
          return !1
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null)
        }
      }
      function o(e, t) {
        for (var n = e.split('|'), r = n.length; r--; ) T.attrHandle[n[r]] = t
      }
      function a(e, t) {
        var n = t && e,
          r =
            n &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            (~t.sourceIndex || V) - (~e.sourceIndex || V)
        if (r) return r
        if (n) for (; (n = n.nextSibling); ) if (n === t) return -1
        return e ? 1 : -1
      }
      function s(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase()
          return 'input' === n && t.type === e
        }
      }
      function u(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase()
          return ('input' === n || 'button' === n) && t.type === e
        }
      }
      function l(e) {
        return r(function(t) {
          return (
            (t = +t),
            r(function(n, r) {
              for (var i, o = e([], n.length, t), a = o.length; a--; )
                n[(i = o[a])] && (n[i] = !(r[i] = n[i]))
            })
          )
        })
      }
      function c(e) {
        return e && 'undefined' != typeof e.getElementsByTagName && e
      }
      function d() {}
      function f(e) {
        for (var t = 0, n = e.length, r = ''; n > t; t++) r += e[t].value
        return r
      }
      function p(e, t, n) {
        var r = t.dir,
          i = n && 'parentNode' === r,
          o = I++
        return t.first
          ? function(t, n, o) {
              for (; (t = t[r]); ) if (1 === t.nodeType || i) return e(t, n, o)
            }
          : function(t, n, a) {
              var s,
                u,
                l,
                c = [W, o]
              if (a) {
                for (; (t = t[r]); )
                  if ((1 === t.nodeType || i) && e(t, n, a)) return !0
              } else
                for (; (t = t[r]); )
                  if (1 === t.nodeType || i) {
                    if (
                      ((l = t[P] || (t[P] = {})),
                      (u = l[t.uniqueID] || (l[t.uniqueID] = {})),
                      (s = u[r]) && s[0] === W && s[1] === o)
                    )
                      return (c[2] = s[2])
                    if (((u[r] = c), (c[2] = e(t, n, a)))) return !0
                  }
            }
      }
      function h(e) {
        return e.length > 1
          ? function(t, n, r) {
              for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1
              return !0
            }
          : e[0]
      }
      function g(e, n, r) {
        for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r)
        return r
      }
      function m(e, t, n, r, i) {
        for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)
          (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s))
        return a
      }
      function v(e, t, n, i, o, a) {
        return (
          i && !i[P] && (i = v(i)),
          o && !o[P] && (o = v(o, a)),
          r(function(r, a, s, u) {
            var l,
              c,
              d,
              f = [],
              p = [],
              h = a.length,
              v = r || g(t || '*', s.nodeType ? [s] : s, []),
              y = !e || (!r && t) ? v : m(v, f, e, s, u),
              x = n ? (o || (r ? e : h || i) ? [] : a) : y
            if ((n && n(y, x, s, u), i))
              for (l = m(x, p), i(l, [], s, u), c = l.length; c--; )
                (d = l[c]) && (x[p[c]] = !(y[p[c]] = d))
            if (r) {
              if (o || e) {
                if (o) {
                  for (l = [], c = x.length; c--; )
                    (d = x[c]) && l.push((y[c] = d))
                  o(null, (x = []), l, u)
                }
                for (c = x.length; c--; )
                  (d = x[c]) &&
                    (l = o ? et(r, d) : f[c]) > -1 &&
                    (r[l] = !(a[l] = d))
              }
            } else (x = m(x === a ? x.splice(h, x.length) : x)), o ? o(null, a, x, u) : K.apply(a, x)
          })
        )
      }
      function y(e) {
        for (
          var t,
            n,
            r,
            i = e.length,
            o = T.relative[e[0].type],
            a = o || T.relative[' '],
            s = o ? 1 : 0,
            u = p(
              function(e) {
                return e === t
              },
              a,
              !0
            ),
            l = p(
              function(e) {
                return et(t, e) > -1
              },
              a,
              !0
            ),
            c = [
              function(e, n, r) {
                var i =
                  (!o && (r || n !== A)) ||
                  ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
                return (t = null), i
              }
            ];
          i > s;
          s++
        )
          if ((n = T.relative[e[s].type])) c = [p(h(c), n)]
          else {
            if (((n = T.filter[e[s].type].apply(null, e[s].matches)), n[P])) {
              for (r = ++s; i > r && !T.relative[e[r].type]; r++);
              return v(
                s > 1 && h(c),
                s > 1 &&
                  f(
                    e
                      .slice(0, s - 1)
                      .concat({ value: ' ' === e[s - 2].type ? '*' : '' })
                  ).replace(st, '$1'),
                n,
                r > s && y(e.slice(s, r)),
                i > r && y((e = e.slice(r))),
                i > r && f(e)
              )
            }
            c.push(n)
          }
        return h(c)
      }
      function x(e, n) {
        var i = n.length > 0,
          o = e.length > 0,
          a = function(r, a, s, u, l) {
            var c,
              d,
              f,
              p = 0,
              h = '0',
              g = r && [],
              v = [],
              y = A,
              x = r || (o && T.find.TAG('*', l)),
              b = (W += null == y ? 1 : Math.random() || 0.1),
              w = x.length
            for (
              l && (A = a === H || a || l);
              h !== w && null != (c = x[h]);
              h++
            ) {
              if (o && c) {
                for (
                  d = 0, a || c.ownerDocument === H || (L(c), (s = !_));
                  (f = e[d++]);

                )
                  if (f(c, a || H, s)) {
                    u.push(c)
                    break
                  }
                l && (W = b)
              }
              i && ((c = !f && c) && p--, r && g.push(c))
            }
            if (((p += h), i && h !== p)) {
              for (d = 0; (f = n[d++]); ) f(g, v, a, s)
              if (r) {
                if (p > 0) for (; h--; ) g[h] || v[h] || (v[h] = G.call(u))
                v = m(v)
              }
              K.apply(u, v),
                l && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(u)
            }
            return l && ((W = b), (A = y)), g
          }
        return i ? r(a) : a
      }
      var b,
        w,
        T,
        C,
        E,
        N,
        k,
        S,
        A,
        D,
        j,
        L,
        H,
        q,
        _,
        F,
        M,
        O,
        R,
        P = 'sizzle' + 1 * new Date(),
        B = e.document,
        W = 0,
        I = 0,
        $ = n(),
        z = n(),
        X = n(),
        U = function(e, t) {
          return e === t && (j = !0), 0
        },
        V = 1 << 31,
        Y = {}.hasOwnProperty,
        J = [],
        G = J.pop,
        Q = J.push,
        K = J.push,
        Z = J.slice,
        et = function(e, t) {
          for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n
          return -1
        },
        tt =
          'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
        nt = '[\\x20\\t\\r\\n\\f]',
        rt = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
        it =
          '\\[' +
          nt +
          '*(' +
          rt +
          ')(?:' +
          nt +
          '*([*^$|!~]?=)' +
          nt +
          '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
          rt +
          '))|)' +
          nt +
          '*\\]',
        ot =
          ':(' +
          rt +
          ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
          it +
          ')*)|.*)\\)|)',
        at = new RegExp(nt + '+', 'g'),
        st = new RegExp(
          '^' + nt + '+|((?:^|[^\\\\])(?:\\\\.)*)' + nt + '+$',
          'g'
        ),
        ut = new RegExp('^' + nt + '*,' + nt + '*'),
        lt = new RegExp('^' + nt + '*([>+~]|' + nt + ')' + nt + '*'),
        ct = new RegExp('=' + nt + '*([^\\]\'"]*?)' + nt + '*\\]', 'g'),
        dt = new RegExp(ot),
        ft = new RegExp('^' + rt + '$'),
        pt = {
          ID: new RegExp('^#(' + rt + ')'),
          CLASS: new RegExp('^\\.(' + rt + ')'),
          TAG: new RegExp('^(' + rt + '|[*])'),
          ATTR: new RegExp('^' + it),
          PSEUDO: new RegExp('^' + ot),
          CHILD: new RegExp(
            '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
              nt +
              '*(even|odd|(([+-]|)(\\d*)n|)' +
              nt +
              '*(?:([+-]|)' +
              nt +
              '*(\\d+)|))' +
              nt +
              '*\\)|)',
            'i'
          ),
          bool: new RegExp('^(?:' + tt + ')$', 'i'),
          needsContext: new RegExp(
            '^' +
              nt +
              '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
              nt +
              '*((?:-\\d)?\\d*)' +
              nt +
              '*\\)|)(?=[^-]|$)',
            'i'
          )
        },
        ht = /^(?:input|select|textarea|button)$/i,
        gt = /^h\d$/i,
        mt = /^[^{]+\{\s*\[native \w/,
        vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        yt = /[+~]/,
        xt = /'|\\/g,
        bt = new RegExp('\\\\([\\da-f]{1,6}' + nt + '?|(' + nt + ')|.)', 'ig'),
        wt = function(e, t, n) {
          var r = '0x' + t - 65536
          return r !== r || n
            ? t
            : 0 > r
            ? String.fromCharCode(r + 65536)
            : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320)
        },
        Tt = function() {
          L()
        }
      try {
        K.apply((J = Z.call(B.childNodes)), B.childNodes),
          J[B.childNodes.length].nodeType
      } catch (Ct) {
        K = {
          apply: J.length
            ? function(e, t) {
                Q.apply(e, Z.call(t))
              }
            : function(e, t) {
                for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                e.length = n - 1
              }
        }
      }
      ;(w = t.support = {}),
        (E = t.isXML = function(e) {
          var t = e && (e.ownerDocument || e).documentElement
          return t ? 'HTML' !== t.nodeName : !1
        }),
        (L = t.setDocument = function(e) {
          var t,
            n,
            r = e ? e.ownerDocument || e : B
          return r !== H && 9 === r.nodeType && r.documentElement
            ? ((H = r),
              (q = H.documentElement),
              (_ = !E(H)),
              (n = H.defaultView) &&
                n.top !== n &&
                (n.addEventListener
                  ? n.addEventListener('unload', Tt, !1)
                  : n.attachEvent && n.attachEvent('onunload', Tt)),
              (w.attributes = i(function(e) {
                return (e.className = 'i'), !e.getAttribute('className')
              })),
              (w.getElementsByTagName = i(function(e) {
                return (
                  e.appendChild(H.createComment('')),
                  !e.getElementsByTagName('*').length
                )
              })),
              (w.getElementsByClassName = mt.test(H.getElementsByClassName)),
              (w.getById = i(function(e) {
                return (
                  (q.appendChild(e).id = P),
                  !H.getElementsByName || !H.getElementsByName(P).length
                )
              })),
              w.getById
                ? ((T.find.ID = function(e, t) {
                    if ('undefined' != typeof t.getElementById && _) {
                      var n = t.getElementById(e)
                      return n ? [n] : []
                    }
                  }),
                  (T.filter.ID = function(e) {
                    var t = e.replace(bt, wt)
                    return function(e) {
                      return e.getAttribute('id') === t
                    }
                  }))
                : (delete T.find.ID,
                  (T.filter.ID = function(e) {
                    var t = e.replace(bt, wt)
                    return function(e) {
                      var n =
                        'undefined' != typeof e.getAttributeNode &&
                        e.getAttributeNode('id')
                      return n && n.value === t
                    }
                  })),
              (T.find.TAG = w.getElementsByTagName
                ? function(e, t) {
                    return 'undefined' != typeof t.getElementsByTagName
                      ? t.getElementsByTagName(e)
                      : w.qsa
                      ? t.querySelectorAll(e)
                      : void 0
                  }
                : function(e, t) {
                    var n,
                      r = [],
                      i = 0,
                      o = t.getElementsByTagName(e)
                    if ('*' === e) {
                      for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n)
                      return r
                    }
                    return o
                  }),
              (T.find.CLASS =
                w.getElementsByClassName &&
                function(e, t) {
                  return 'undefined' != typeof t.getElementsByClassName && _
                    ? t.getElementsByClassName(e)
                    : void 0
                }),
              (M = []),
              (F = []),
              (w.qsa = mt.test(H.querySelectorAll)) &&
                (i(function(e) {
                  ;(q.appendChild(e).innerHTML =
                    "<a id='" +
                    P +
                    "'></a><select id='" +
                    P +
                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                    e.querySelectorAll("[msallowcapture^='']").length &&
                      F.push('[*^$]=' + nt + '*(?:\'\'|"")'),
                    e.querySelectorAll('[selected]').length ||
                      F.push('\\[' + nt + '*(?:value|' + tt + ')'),
                    e.querySelectorAll('[id~=' + P + '-]').length ||
                      F.push('~='),
                    e.querySelectorAll(':checked').length || F.push(':checked'),
                    e.querySelectorAll('a#' + P + '+*').length ||
                      F.push('.#.+[+~]')
                }),
                i(function(e) {
                  var t = H.createElement('input')
                  t.setAttribute('type', 'hidden'),
                    e.appendChild(t).setAttribute('name', 'D'),
                    e.querySelectorAll('[name=d]').length &&
                      F.push('name' + nt + '*[*^$|!~]?='),
                    e.querySelectorAll(':enabled').length ||
                      F.push(':enabled', ':disabled'),
                    e.querySelectorAll('*,:x'),
                    F.push(',.*:')
                })),
              (w.matchesSelector = mt.test(
                (O =
                  q.matches ||
                  q.webkitMatchesSelector ||
                  q.mozMatchesSelector ||
                  q.oMatchesSelector ||
                  q.msMatchesSelector)
              )) &&
                i(function(e) {
                  ;(w.disconnectedMatch = O.call(e, 'div')),
                    O.call(e, "[s!='']:x"),
                    M.push('!=', ot)
                }),
              (F = F.length && new RegExp(F.join('|'))),
              (M = M.length && new RegExp(M.join('|'))),
              (t = mt.test(q.compareDocumentPosition)),
              (R =
                t || mt.test(q.contains)
                  ? function(e, t) {
                      var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode
                      return (
                        e === r ||
                        !(
                          !r ||
                          1 !== r.nodeType ||
                          !(n.contains
                            ? n.contains(r)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(r))
                        )
                      )
                    }
                  : function(e, t) {
                      if (t) for (; (t = t.parentNode); ) if (t === e) return !0
                      return !1
                    }),
              (U = t
                ? function(e, t) {
                    if (e === t) return (j = !0), 0
                    var n =
                      !e.compareDocumentPosition - !t.compareDocumentPosition
                    return n
                      ? n
                      : ((n =
                          (e.ownerDocument || e) === (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1),
                        1 & n ||
                        (!w.sortDetached && t.compareDocumentPosition(e) === n)
                          ? e === H || (e.ownerDocument === B && R(B, e))
                            ? -1
                            : t === H || (t.ownerDocument === B && R(B, t))
                            ? 1
                            : D
                            ? et(D, e) - et(D, t)
                            : 0
                          : 4 & n
                          ? -1
                          : 1)
                  }
                : function(e, t) {
                    if (e === t) return (j = !0), 0
                    var n,
                      r = 0,
                      i = e.parentNode,
                      o = t.parentNode,
                      s = [e],
                      u = [t]
                    if (!i || !o)
                      return e === H
                        ? -1
                        : t === H
                        ? 1
                        : i
                        ? -1
                        : o
                        ? 1
                        : D
                        ? et(D, e) - et(D, t)
                        : 0
                    if (i === o) return a(e, t)
                    for (n = e; (n = n.parentNode); ) s.unshift(n)
                    for (n = t; (n = n.parentNode); ) u.unshift(n)
                    for (; s[r] === u[r]; ) r++
                    return r
                      ? a(s[r], u[r])
                      : s[r] === B
                      ? -1
                      : u[r] === B
                      ? 1
                      : 0
                  }),
              H)
            : H
        }),
        (t.matches = function(e, n) {
          return t(e, null, null, n)
        }),
        (t.matchesSelector = function(e, n) {
          if (
            ((e.ownerDocument || e) !== H && L(e),
            (n = n.replace(ct, "='$1']")),
            !(
              !w.matchesSelector ||
              !_ ||
              X[n + ' '] ||
              (M && M.test(n)) ||
              (F && F.test(n))
            ))
          )
            try {
              var r = O.call(e, n)
              if (
                r ||
                w.disconnectedMatch ||
                (e.document && 11 !== e.document.nodeType)
              )
                return r
            } catch (i) {}
          return t(n, H, null, [e]).length > 0
        }),
        (t.contains = function(e, t) {
          return (e.ownerDocument || e) !== H && L(e), R(e, t)
        }),
        (t.attr = function(e, t) {
          ;(e.ownerDocument || e) !== H && L(e)
          var n = T.attrHandle[t.toLowerCase()],
            r =
              n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !_) : void 0
          return void 0 !== r
            ? r
            : w.attributes || !_
            ? e.getAttribute(t)
            : (r = e.getAttributeNode(t)) && r.specified
            ? r.value
            : null
        }),
        (t.error = function(e) {
          throw new Error('Syntax error, unrecognized expression: ' + e)
        }),
        (t.uniqueSort = function(e) {
          var t,
            n = [],
            r = 0,
            i = 0
          if (
            ((j = !w.detectDuplicates),
            (D = !w.sortStable && e.slice(0)),
            e.sort(U),
            j)
          ) {
            for (; (t = e[i++]); ) t === e[i] && (r = n.push(i))
            for (; r--; ) e.splice(n[r], 1)
          }
          return (D = null), e
        }),
        (C = t.getText = function(e) {
          var t,
            n = '',
            r = 0,
            i = e.nodeType
          if (i) {
            if (1 === i || 9 === i || 11 === i) {
              if ('string' == typeof e.textContent) return e.textContent
              for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
            } else if (3 === i || 4 === i) return e.nodeValue
          } else for (; (t = e[r++]); ) n += C(t)
          return n
        }),
        (T = t.selectors = {
          cacheLength: 50,
          createPseudo: r,
          match: pt,
          attrHandle: {},
          find: {},
          relative: {
            '>': { dir: 'parentNode', first: !0 },
            ' ': { dir: 'parentNode' },
            '+': { dir: 'previousSibling', first: !0 },
            '~': { dir: 'previousSibling' }
          },
          preFilter: {
            ATTR: function(e) {
              return (
                (e[1] = e[1].replace(bt, wt)),
                (e[3] = (e[3] || e[4] || e[5] || '').replace(bt, wt)),
                '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
                e.slice(0, 4)
              )
            },
            CHILD: function(e) {
              return (
                (e[1] = e[1].toLowerCase()),
                'nth' === e[1].slice(0, 3)
                  ? (e[3] || t.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ('even' === e[3] || 'odd' === e[3]))),
                    (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
                  : e[3] && t.error(e[0]),
                e
              )
            },
            PSEUDO: function(e) {
              var t,
                n = !e[6] && e[2]
              return pt.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[4] || e[5] || '')
                    : n &&
                      dt.test(n) &&
                      (t = N(n, !0)) &&
                      (t = n.indexOf(')', n.length - t) - n.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                  e.slice(0, 3))
            }
          },
          filter: {
            TAG: function(e) {
              var t = e.replace(bt, wt).toLowerCase()
              return '*' === e
                ? function() {
                    return !0
                  }
                : function(e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t
                  }
            },
            CLASS: function(e) {
              var t = $[e + ' ']
              return (
                t ||
                ((t = new RegExp('(^|' + nt + ')' + e + '(' + nt + '|$)')) &&
                  $(e, function(e) {
                    return t.test(
                      ('string' == typeof e.className && e.className) ||
                        ('undefined' != typeof e.getAttribute &&
                          e.getAttribute('class')) ||
                        ''
                    )
                  }))
              )
            },
            ATTR: function(e, n, r) {
              return function(i) {
                var o = t.attr(i, e)
                return null == o
                  ? '!=' === n
                  : n
                  ? ((o += ''),
                    '=' === n
                      ? o === r
                      : '!=' === n
                      ? o !== r
                      : '^=' === n
                      ? r && 0 === o.indexOf(r)
                      : '*=' === n
                      ? r && o.indexOf(r) > -1
                      : '$=' === n
                      ? r && o.slice(-r.length) === r
                      : '~=' === n
                      ? (' ' + o.replace(at, ' ') + ' ').indexOf(r) > -1
                      : '|=' === n
                      ? o === r || o.slice(0, r.length + 1) === r + '-'
                      : !1)
                  : !0
              }
            },
            CHILD: function(e, t, n, r, i) {
              var o = 'nth' !== e.slice(0, 3),
                a = 'last' !== e.slice(-4),
                s = 'of-type' === t
              return 1 === r && 0 === i
                ? function(e) {
                    return !!e.parentNode
                  }
                : function(t, n, u) {
                    var l,
                      c,
                      d,
                      f,
                      p,
                      h,
                      g = o !== a ? 'nextSibling' : 'previousSibling',
                      m = t.parentNode,
                      v = s && t.nodeName.toLowerCase(),
                      y = !u && !s,
                      x = !1
                    if (m) {
                      if (o) {
                        for (; g; ) {
                          for (f = t; (f = f[g]); )
                            if (
                              s
                                ? f.nodeName.toLowerCase() === v
                                : 1 === f.nodeType
                            )
                              return !1
                          h = g = 'only' === e && !h && 'nextSibling'
                        }
                        return !0
                      }
                      if (((h = [a ? m.firstChild : m.lastChild]), a && y)) {
                        for (
                          f = m,
                            d = f[P] || (f[P] = {}),
                            c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                            l = c[e] || [],
                            p = l[0] === W && l[1],
                            x = p && l[2],
                            f = p && m.childNodes[p];
                          (f = (++p && f && f[g]) || (x = p = 0) || h.pop());

                        )
                          if (1 === f.nodeType && ++x && f === t) {
                            c[e] = [W, p, x]
                            break
                          }
                      } else if (
                        (y &&
                          ((f = t),
                          (d = f[P] || (f[P] = {})),
                          (c = d[f.uniqueID] || (d[f.uniqueID] = {})),
                          (l = c[e] || []),
                          (p = l[0] === W && l[1]),
                          (x = p)),
                        x === !1)
                      )
                        for (
                          ;
                          (f = (++p && f && f[g]) || (x = p = 0) || h.pop()) &&
                          ((s
                            ? f.nodeName.toLowerCase() !== v
                            : 1 !== f.nodeType) ||
                            !++x ||
                            (y &&
                              ((d = f[P] || (f[P] = {})),
                              (c = d[f.uniqueID] || (d[f.uniqueID] = {})),
                              (c[e] = [W, x])),
                            f !== t));

                        );
                      return (x -= i), x === r || (x % r === 0 && x / r >= 0)
                    }
                  }
            },
            PSEUDO: function(e, n) {
              var i,
                o =
                  T.pseudos[e] ||
                  T.setFilters[e.toLowerCase()] ||
                  t.error('unsupported pseudo: ' + e)
              return o[P]
                ? o(n)
                : o.length > 1
                ? ((i = [e, e, '', n]),
                  T.setFilters.hasOwnProperty(e.toLowerCase())
                    ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--; )
                          (r = et(e, i[a])), (e[r] = !(t[r] = i[a]))
                      })
                    : function(e) {
                        return o(e, 0, i)
                      })
                : o
            }
          },
          pseudos: {
            not: r(function(e) {
              var t = [],
                n = [],
                i = k(e.replace(st, '$1'))
              return i[P]
                ? r(function(e, t, n, r) {
                    for (var o, a = i(e, null, r, []), s = e.length; s--; )
                      (o = a[s]) && (e[s] = !(t[s] = o))
                  })
                : function(e, r, o) {
                    return (t[0] = e), i(t, null, o, n), (t[0] = null), !n.pop()
                  }
            }),
            has: r(function(e) {
              return function(n) {
                return t(e, n).length > 0
              }
            }),
            contains: r(function(e) {
              return (
                (e = e.replace(bt, wt)),
                function(t) {
                  return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                }
              )
            }),
            lang: r(function(e) {
              return (
                ft.test(e || '') || t.error('unsupported lang: ' + e),
                (e = e.replace(bt, wt).toLowerCase()),
                function(t) {
                  var n
                  do
                    if (
                      (n = _
                        ? t.lang
                        : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                    )
                      return (
                        (n = n.toLowerCase()),
                        n === e || 0 === n.indexOf(e + '-')
                      )
                  while ((t = t.parentNode) && 1 === t.nodeType)
                  return !1
                }
              )
            }),
            target: function(t) {
              var n = e.location && e.location.hash
              return n && n.slice(1) === t.id
            },
            root: function(e) {
              return e === q
            },
            focus: function(e) {
              return (
                e === H.activeElement &&
                (!H.hasFocus || H.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              )
            },
            enabled: function(e) {
              return e.disabled === !1
            },
            disabled: function(e) {
              return e.disabled === !0
            },
            checked: function(e) {
              var t = e.nodeName.toLowerCase()
              return (
                ('input' === t && !!e.checked) ||
                ('option' === t && !!e.selected)
              )
            },
            selected: function(e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, e.selected === !0
              )
            },
            empty: function(e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeType < 6) return !1
              return !0
            },
            parent: function(e) {
              return !T.pseudos.empty(e)
            },
            header: function(e) {
              return gt.test(e.nodeName)
            },
            input: function(e) {
              return ht.test(e.nodeName)
            },
            button: function(e) {
              var t = e.nodeName.toLowerCase()
              return ('input' === t && 'button' === e.type) || 'button' === t
            },
            text: function(e) {
              var t
              return (
                'input' === e.nodeName.toLowerCase() &&
                'text' === e.type &&
                (null == (t = e.getAttribute('type')) ||
                  'text' === t.toLowerCase())
              )
            },
            first: l(function() {
              return [0]
            }),
            last: l(function(e, t) {
              return [t - 1]
            }),
            eq: l(function(e, t, n) {
              return [0 > n ? n + t : n]
            }),
            even: l(function(e, t) {
              for (var n = 0; t > n; n += 2) e.push(n)
              return e
            }),
            odd: l(function(e, t) {
              for (var n = 1; t > n; n += 2) e.push(n)
              return e
            }),
            lt: l(function(e, t, n) {
              for (var r = 0 > n ? n + t : n; --r >= 0; ) e.push(r)
              return e
            }),
            gt: l(function(e, t, n) {
              for (var r = 0 > n ? n + t : n; ++r < t; ) e.push(r)
              return e
            })
          }
        }),
        (T.pseudos.nth = T.pseudos.eq)
      for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        T.pseudos[b] = s(b)
      for (b in { submit: !0, reset: !0 }) T.pseudos[b] = u(b)
      return (
        (d.prototype = T.filters = T.pseudos),
        (T.setFilters = new d()),
        (N = t.tokenize = function(e, n) {
          var r,
            i,
            o,
            a,
            s,
            u,
            l,
            c = z[e + ' ']
          if (c) return n ? 0 : c.slice(0)
          for (s = e, u = [], l = T.preFilter; s; ) {
            ;(!r || (i = ut.exec(s))) &&
              (i && (s = s.slice(i[0].length) || s), u.push((o = []))),
              (r = !1),
              (i = lt.exec(s)) &&
                ((r = i.shift()),
                o.push({ value: r, type: i[0].replace(st, ' ') }),
                (s = s.slice(r.length)))
            for (a in T.filter)
              !(i = pt[a].exec(s)) ||
                (l[a] && !(i = l[a](i))) ||
                ((r = i.shift()),
                o.push({ value: r, type: a, matches: i }),
                (s = s.slice(r.length)))
            if (!r) break
          }
          return n ? s.length : s ? t.error(e) : z(e, u).slice(0)
        }),
        (k = t.compile = function(e, t) {
          var n,
            r = [],
            i = [],
            o = X[e + ' ']
          if (!o) {
            for (t || (t = N(e)), n = t.length; n--; )
              (o = y(t[n])), o[P] ? r.push(o) : i.push(o)
            ;(o = X(e, x(i, r))), (o.selector = e)
          }
          return o
        }),
        (S = t.select = function(e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = 'function' == typeof e && e,
            d = !r && N((e = l.selector || e))
          if (((n = n || []), 1 === d.length)) {
            if (
              ((o = d[0] = d[0].slice(0)),
              o.length > 2 &&
                'ID' === (a = o[0]).type &&
                w.getById &&
                9 === t.nodeType &&
                _ &&
                T.relative[o[1].type])
            ) {
              if (
                ((t = (T.find.ID(a.matches[0].replace(bt, wt), t) || [])[0]),
                !t)
              )
                return n
              l && (t = t.parentNode), (e = e.slice(o.shift().value.length))
            }
            for (
              i = pt.needsContext.test(e) ? 0 : o.length;
              i-- && ((a = o[i]), !T.relative[(s = a.type)]);

            )
              if (
                (u = T.find[s]) &&
                (r = u(
                  a.matches[0].replace(bt, wt),
                  (yt.test(o[0].type) && c(t.parentNode)) || t
                ))
              ) {
                if ((o.splice(i, 1), (e = r.length && f(o)), !e))
                  return K.apply(n, r), n
                break
              }
          }
          return (
            (l || k(e, d))(
              r,
              t,
              !_,
              n,
              !t || (yt.test(e) && c(t.parentNode)) || t
            ),
            n
          )
        }),
        (w.sortStable =
          P.split('')
            .sort(U)
            .join('') === P),
        (w.detectDuplicates = !!j),
        L(),
        (w.sortDetached = i(function(e) {
          return 1 & e.compareDocumentPosition(H.createElement('div'))
        })),
        i(function(e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            '#' === e.firstChild.getAttribute('href')
          )
        }) ||
          o('type|href|height|width', function(e, t, n) {
            return n
              ? void 0
              : e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2)
          }),
        (w.attributes &&
          i(function(e) {
            return (
              (e.innerHTML = '<input/>'),
              e.firstChild.setAttribute('value', ''),
              '' === e.firstChild.getAttribute('value')
            )
          })) ||
          o('value', function(e, t, n) {
            return n || 'input' !== e.nodeName.toLowerCase()
              ? void 0
              : e.defaultValue
          }),
        i(function(e) {
          return null == e.getAttribute('disabled')
        }) ||
          o(tt, function(e, t, n) {
            var r
            return n
              ? void 0
              : e[t] === !0
              ? t.toLowerCase()
              : (r = e.getAttributeNode(t)) && r.specified
              ? r.value
              : null
          }),
        t
      )
    })(e)
    ;(pt.find = yt),
      (pt.expr = yt.selectors),
      (pt.expr[':'] = pt.expr.pseudos),
      (pt.uniqueSort = pt.unique = yt.uniqueSort),
      (pt.text = yt.getText),
      (pt.isXMLDoc = yt.isXML),
      (pt.contains = yt.contains)
    var xt = function(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
          if (1 === e.nodeType) {
            if (i && pt(e).is(n)) break
            r.push(e)
          }
        return r
      },
      bt = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && n.push(e)
        return n
      },
      wt = pt.expr.match.needsContext,
      Tt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      Ct = /^.[^:#\[\.,]*$/
    ;(pt.filter = function(e, t, n) {
      var r = t[0]
      return (
        n && (e = ':not(' + e + ')'),
        1 === t.length && 1 === r.nodeType
          ? pt.find.matchesSelector(r, e)
            ? [r]
            : []
          : pt.find.matches(
              e,
              pt.grep(t, function(e) {
                return 1 === e.nodeType
              })
            )
      )
    }),
      pt.fn.extend({
        find: function(e) {
          var t,
            n = [],
            r = this,
            i = r.length
          if ('string' != typeof e)
            return this.pushStack(
              pt(e).filter(function() {
                for (t = 0; i > t; t++) if (pt.contains(r[t], this)) return !0
              })
            )
          for (t = 0; i > t; t++) pt.find(e, r[t], n)
          return (
            (n = this.pushStack(i > 1 ? pt.unique(n) : n)),
            (n.selector = this.selector ? this.selector + ' ' + e : e),
            n
          )
        },
        filter: function(e) {
          return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
          return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
          return !!r(
            this,
            'string' == typeof e && wt.test(e) ? pt(e) : e || [],
            !1
          ).length
        }
      })
    var Et,
      Nt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      kt = (pt.fn.init = function(e, t, n) {
        var r, i
        if (!e) return this
        if (((n = n || Et), 'string' == typeof e)) {
          if (
            ((r =
              '<' === e.charAt(0) &&
              '>' === e.charAt(e.length - 1) &&
              e.length >= 3
                ? [null, e, null]
                : Nt.exec(e)),
            !r || (!r[1] && t))
          )
            return !t || t.jquery
              ? (t || n).find(e)
              : this.constructor(t).find(e)
          if (r[1]) {
            if (
              ((t = t instanceof pt ? t[0] : t),
              pt.merge(
                this,
                pt.parseHTML(
                  r[1],
                  t && t.nodeType ? t.ownerDocument || t : rt,
                  !0
                )
              ),
              Tt.test(r[1]) && pt.isPlainObject(t))
            )
              for (r in t)
                pt.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r])
            return this
          }
          if (((i = rt.getElementById(r[2])), i && i.parentNode)) {
            if (i.id !== r[2]) return Et.find(e)
            ;(this.length = 1), (this[0] = i)
          }
          return (this.context = rt), (this.selector = e), this
        }
        return e.nodeType
          ? ((this.context = this[0] = e), (this.length = 1), this)
          : pt.isFunction(e)
          ? 'undefined' != typeof n.ready
            ? n.ready(e)
            : e(pt)
          : (void 0 !== e.selector &&
              ((this.selector = e.selector), (this.context = e.context)),
            pt.makeArray(e, this))
      })
    ;(kt.prototype = pt.fn), (Et = pt(rt))
    var St = /^(?:parents|prev(?:Until|All))/,
      At = { children: !0, contents: !0, next: !0, prev: !0 }
    pt.fn.extend({
      has: function(e) {
        var t,
          n = pt(e, this),
          r = n.length
        return this.filter(function() {
          for (t = 0; r > t; t++) if (pt.contains(this, n[t])) return !0
        })
      },
      closest: function(e, t) {
        for (
          var n,
            r = 0,
            i = this.length,
            o = [],
            a =
              wt.test(e) || 'string' != typeof e ? pt(e, t || this.context) : 0;
          i > r;
          r++
        )
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? a.index(n) > -1
                : 1 === n.nodeType && pt.find.matchesSelector(n, e))
            ) {
              o.push(n)
              break
            }
        return this.pushStack(o.length > 1 ? pt.uniqueSort(o) : o)
      },
      index: function(e) {
        return e
          ? 'string' == typeof e
            ? pt.inArray(this[0], pt(e))
            : pt.inArray(e.jquery ? e[0] : e, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1
      },
      add: function(e, t) {
        return this.pushStack(pt.uniqueSort(pt.merge(this.get(), pt(e, t))))
      },
      addBack: function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
      }
    }),
      pt.each(
        {
          parent: function(e) {
            var t = e.parentNode
            return t && 11 !== t.nodeType ? t : null
          },
          parents: function(e) {
            return xt(e, 'parentNode')
          },
          parentsUntil: function(e, t, n) {
            return xt(e, 'parentNode', n)
          },
          next: function(e) {
            return i(e, 'nextSibling')
          },
          prev: function(e) {
            return i(e, 'previousSibling')
          },
          nextAll: function(e) {
            return xt(e, 'nextSibling')
          },
          prevAll: function(e) {
            return xt(e, 'previousSibling')
          },
          nextUntil: function(e, t, n) {
            return xt(e, 'nextSibling', n)
          },
          prevUntil: function(e, t, n) {
            return xt(e, 'previousSibling', n)
          },
          siblings: function(e) {
            return bt((e.parentNode || {}).firstChild, e)
          },
          children: function(e) {
            return bt(e.firstChild)
          },
          contents: function(e) {
            return pt.nodeName(e, 'iframe')
              ? e.contentDocument || e.contentWindow.document
              : pt.merge([], e.childNodes)
          }
        },
        function(e, t) {
          pt.fn[e] = function(n, r) {
            var i = pt.map(this, t, n)
            return (
              'Until' !== e.slice(-5) && (r = n),
              r && 'string' == typeof r && (i = pt.filter(r, i)),
              this.length > 1 &&
                (At[e] || (i = pt.uniqueSort(i)),
                St.test(e) && (i = i.reverse())),
              this.pushStack(i)
            )
          }
        }
      )
    var Dt = /\S+/g
    ;(pt.Callbacks = function(e) {
      e = 'string' == typeof e ? o(e) : pt.extend({}, e)
      var t,
        n,
        r,
        i,
        a = [],
        s = [],
        u = -1,
        l = function() {
          for (i = e.once, r = t = !0; s.length; u = -1)
            for (n = s.shift(); ++u < a.length; )
              a[u].apply(n[0], n[1]) === !1 &&
                e.stopOnFalse &&
                ((u = a.length), (n = !1))
          e.memory || (n = !1), (t = !1), i && (a = n ? [] : '')
        },
        c = {
          add: function() {
            return (
              a &&
                (n && !t && ((u = a.length - 1), s.push(n)),
                (function r(t) {
                  pt.each(t, function(t, n) {
                    pt.isFunction(n)
                      ? (e.unique && c.has(n)) || a.push(n)
                      : n && n.length && 'string' !== pt.type(n) && r(n)
                  })
                })(arguments),
                n && !t && l()),
              this
            )
          },
          remove: function() {
            return (
              pt.each(arguments, function(e, t) {
                for (var n; (n = pt.inArray(t, a, n)) > -1; )
                  a.splice(n, 1), u >= n && u--
              }),
              this
            )
          },
          has: function(e) {
            return e ? pt.inArray(e, a) > -1 : a.length > 0
          },
          empty: function() {
            return a && (a = []), this
          },
          disable: function() {
            return (i = s = []), (a = n = ''), this
          },
          disabled: function() {
            return !a
          },
          lock: function() {
            return (i = !0), n || c.disable(), this
          },
          locked: function() {
            return !!i
          },
          fireWith: function(e, n) {
            return (
              i ||
                ((n = n || []),
                (n = [e, n.slice ? n.slice() : n]),
                s.push(n),
                t || l()),
              this
            )
          },
          fire: function() {
            return c.fireWith(this, arguments), this
          },
          fired: function() {
            return !!r
          }
        }
      return c
    }),
      pt.extend({
        Deferred: function(e) {
          var t = [
              ['resolve', 'done', pt.Callbacks('once memory'), 'resolved'],
              ['reject', 'fail', pt.Callbacks('once memory'), 'rejected'],
              ['notify', 'progress', pt.Callbacks('memory')]
            ],
            n = 'pending',
            r = {
              state: function() {
                return n
              },
              always: function() {
                return i.done(arguments).fail(arguments), this
              },
              then: function() {
                var e = arguments
                return pt
                  .Deferred(function(n) {
                    pt.each(t, function(t, o) {
                      var a = pt.isFunction(e[t]) && e[t]
                      i[o[1]](function() {
                        var e = a && a.apply(this, arguments)
                        e && pt.isFunction(e.promise)
                          ? e
                              .promise()
                              .progress(n.notify)
                              .done(n.resolve)
                              .fail(n.reject)
                          : n[o[0] + 'With'](
                              this === r ? n.promise() : this,
                              a ? [e] : arguments
                            )
                      })
                    }),
                      (e = null)
                  })
                  .promise()
              },
              promise: function(e) {
                return null != e ? pt.extend(e, r) : r
              }
            },
            i = {}
          return (
            (r.pipe = r.then),
            pt.each(t, function(e, o) {
              var a = o[2],
                s = o[3]
              ;(r[o[1]] = a.add),
                s &&
                  a.add(
                    function() {
                      n = s
                    },
                    t[1 ^ e][2].disable,
                    t[2][2].lock
                  ),
                (i[o[0]] = function() {
                  return (
                    i[o[0] + 'With'](this === i ? r : this, arguments), this
                  )
                }),
                (i[o[0] + 'With'] = a.fireWith)
            }),
            r.promise(i),
            e && e.call(i, i),
            i
          )
        },
        when: function(e) {
          var t,
            n,
            r,
            i = 0,
            o = it.call(arguments),
            a = o.length,
            s = 1 !== a || (e && pt.isFunction(e.promise)) ? a : 0,
            u = 1 === s ? e : pt.Deferred(),
            l = function(e, n, r) {
              return function(i) {
                ;(n[e] = this),
                  (r[e] = arguments.length > 1 ? it.call(arguments) : i),
                  r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
              }
            }
          if (a > 1)
            for (
              t = new Array(a), n = new Array(a), r = new Array(a);
              a > i;
              i++
            )
              o[i] && pt.isFunction(o[i].promise)
                ? o[i]
                    .promise()
                    .progress(l(i, n, t))
                    .done(l(i, r, o))
                    .fail(u.reject)
                : --s
          return s || u.resolveWith(r, o), u.promise()
        }
      })
    var jt
    ;(pt.fn.ready = function(e) {
      return pt.ready.promise().done(e), this
    }),
      pt.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
          e ? pt.readyWait++ : pt.ready(!0)
        },
        ready: function(e) {
          ;(e === !0 ? --pt.readyWait : pt.isReady) ||
            ((pt.isReady = !0),
            (e !== !0 && --pt.readyWait > 0) ||
              (jt.resolveWith(rt, [pt]),
              pt.fn.triggerHandler &&
                (pt(rt).triggerHandler('ready'), pt(rt).off('ready'))))
        }
      }),
      (pt.ready.promise = function(t) {
        if (!jt)
          if (
            ((jt = pt.Deferred()),
            'complete' === rt.readyState ||
              ('loading' !== rt.readyState && !rt.documentElement.doScroll))
          )
            e.setTimeout(pt.ready)
          else if (rt.addEventListener)
            rt.addEventListener('DOMContentLoaded', s),
              e.addEventListener('load', s)
          else {
            rt.attachEvent('onreadystatechange', s), e.attachEvent('onload', s)
            var n = !1
            try {
              n = null == e.frameElement && rt.documentElement
            } catch (r) {}
            n &&
              n.doScroll &&
              !(function i() {
                if (!pt.isReady) {
                  try {
                    n.doScroll('left')
                  } catch (t) {
                    return e.setTimeout(i, 50)
                  }
                  a(), pt.ready()
                }
              })()
          }
        return jt.promise(t)
      }),
      pt.ready.promise()
    var Lt
    for (Lt in pt(dt)) break
    ;(dt.ownFirst = '0' === Lt),
      (dt.inlineBlockNeedsLayout = !1),
      pt(function() {
        var e, t, n, r
        ;(n = rt.getElementsByTagName('body')[0]),
          n &&
            n.style &&
            ((t = rt.createElement('div')),
            (r = rt.createElement('div')),
            (r.style.cssText =
              'position:absolute;border:0;width:0;height:0;top:0;left:-9999px'),
            n.appendChild(r).appendChild(t),
            'undefined' != typeof t.style.zoom &&
              ((t.style.cssText =
                'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1'),
              (dt.inlineBlockNeedsLayout = e = 3 === t.offsetWidth),
              e && (n.style.zoom = 1)),
            n.removeChild(r))
      }),
      (function() {
        var e = rt.createElement('div')
        dt.deleteExpando = !0
        try {
          delete e.test
        } catch (t) {
          dt.deleteExpando = !1
        }
        e = null
      })()
    var Ht = function(e) {
        var t = pt.noData[(e.nodeName + ' ').toLowerCase()],
          n = +e.nodeType || 1
        return 1 !== n && 9 !== n
          ? !1
          : !t || (t !== !0 && e.getAttribute('classid') === t)
      },
      qt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      _t = /([A-Z])/g
    pt.extend({
      cache: {},
      noData: {
        'applet ': !0,
        'embed ': !0,
        'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
      },
      hasData: function(e) {
        return (
          (e = e.nodeType ? pt.cache[e[pt.expando]] : e[pt.expando]),
          !!e && !l(e)
        )
      },
      data: function(e, t, n) {
        return c(e, t, n)
      },
      removeData: function(e, t) {
        return d(e, t)
      },
      _data: function(e, t, n) {
        return c(e, t, n, !0)
      },
      _removeData: function(e, t) {
        return d(e, t, !0)
      }
    }),
      pt.fn.extend({
        data: function(e, t) {
          var n,
            r,
            i,
            o = this[0],
            a = o && o.attributes
          if (void 0 === e) {
            if (
              this.length &&
              ((i = pt.data(o)),
              1 === o.nodeType && !pt._data(o, 'parsedAttrs'))
            ) {
              for (n = a.length; n--; )
                a[n] &&
                  ((r = a[n].name),
                  0 === r.indexOf('data-') &&
                    ((r = pt.camelCase(r.slice(5))), u(o, r, i[r])))
              pt._data(o, 'parsedAttrs', !0)
            }
            return i
          }
          return 'object' == typeof e
            ? this.each(function() {
                pt.data(this, e)
              })
            : arguments.length > 1
            ? this.each(function() {
                pt.data(this, e, t)
              })
            : o
            ? u(o, e, pt.data(o, e))
            : void 0
        },
        removeData: function(e) {
          return this.each(function() {
            pt.removeData(this, e)
          })
        }
      }),
      pt.extend({
        queue: function(e, t, n) {
          var r
          return e
            ? ((t = (t || 'fx') + 'queue'),
              (r = pt._data(e, t)),
              n &&
                (!r || pt.isArray(n)
                  ? (r = pt._data(e, t, pt.makeArray(n)))
                  : r.push(n)),
              r || [])
            : void 0
        },
        dequeue: function(e, t) {
          t = t || 'fx'
          var n = pt.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = pt._queueHooks(e, t),
            a = function() {
              pt.dequeue(e, t)
            }
          'inprogress' === i && ((i = n.shift()), r--),
            i &&
              ('fx' === t && n.unshift('inprogress'),
              delete o.stop,
              i.call(e, a, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
          var n = t + 'queueHooks'
          return (
            pt._data(e, n) ||
            pt._data(e, n, {
              empty: pt.Callbacks('once memory').add(function() {
                pt._removeData(e, t + 'queue'), pt._removeData(e, n)
              })
            })
          )
        }
      }),
      pt.fn.extend({
        queue: function(e, t) {
          var n = 2
          return (
            'string' != typeof e && ((t = e), (e = 'fx'), n--),
            arguments.length < n
              ? pt.queue(this[0], e)
              : void 0 === t
              ? this
              : this.each(function() {
                  var n = pt.queue(this, e, t)
                  pt._queueHooks(this, e),
                    'fx' === e && 'inprogress' !== n[0] && pt.dequeue(this, e)
                })
          )
        },
        dequeue: function(e) {
          return this.each(function() {
            pt.dequeue(this, e)
          })
        },
        clearQueue: function(e) {
          return this.queue(e || 'fx', [])
        },
        promise: function(e, t) {
          var n,
            r = 1,
            i = pt.Deferred(),
            o = this,
            a = this.length,
            s = function() {
              --r || i.resolveWith(o, [o])
            }
          for (
            'string' != typeof e && ((t = e), (e = void 0)), e = e || 'fx';
            a--;

          )
            (n = pt._data(o[a], e + 'queueHooks')),
              n && n.empty && (r++, n.empty.add(s))
          return s(), i.promise(t)
        }
      }),
      (function() {
        var e
        dt.shrinkWrapBlocks = function() {
          if (null != e) return e
          e = !1
          var t, n, r
          return (
            (n = rt.getElementsByTagName('body')[0]),
            n && n.style
              ? ((t = rt.createElement('div')),
                (r = rt.createElement('div')),
                (r.style.cssText =
                  'position:absolute;border:0;width:0;height:0;top:0;left:-9999px'),
                n.appendChild(r).appendChild(t),
                'undefined' != typeof t.style.zoom &&
                  ((t.style.cssText =
                    '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1'),
                  (t.appendChild(rt.createElement('div')).style.width = '5px'),
                  (e = 3 !== t.offsetWidth)),
                n.removeChild(r),
                e)
              : void 0
          )
        }
      })()
    var Ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      Mt = new RegExp('^(?:([+-])=|)(' + Ft + ')([a-z%]*)$', 'i'),
      Ot = ['Top', 'Right', 'Bottom', 'Left'],
      Rt = function(e, t) {
        return (
          (e = t || e),
          'none' === pt.css(e, 'display') || !pt.contains(e.ownerDocument, e)
        )
      },
      Pt = function(e, t, n, r, i, o, a) {
        var s = 0,
          u = e.length,
          l = null == n
        if ('object' === pt.type(n)) {
          i = !0
          for (s in n) Pt(e, t, s, n[s], !0, o, a)
        } else if (
          void 0 !== r &&
          ((i = !0),
          pt.isFunction(r) || (a = !0),
          l &&
            (a
              ? (t.call(e, r), (t = null))
              : ((l = t),
                (t = function(e, t, n) {
                  return l.call(pt(e), n)
                }))),
          t)
        )
          for (; u > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)))
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
      },
      Bt = /^(?:checkbox|radio)$/i,
      Wt = /<([\w:-]+)/,
      It = /^$|\/(?:java|ecma)script/i,
      $t = /^\s+/,
      zt =
        'abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video'
    !(function() {
      var e = rt.createElement('div'),
        t = rt.createDocumentFragment(),
        n = rt.createElement('input')
      ;(e.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (dt.leadingWhitespace = 3 === e.firstChild.nodeType),
        (dt.tbody = !e.getElementsByTagName('tbody').length),
        (dt.htmlSerialize = !!e.getElementsByTagName('link').length),
        (dt.html5Clone =
          '<:nav></:nav>' !== rt.createElement('nav').cloneNode(!0).outerHTML),
        (n.type = 'checkbox'),
        (n.checked = !0),
        t.appendChild(n),
        (dt.appendChecked = n.checked),
        (e.innerHTML = '<textarea>x</textarea>'),
        (dt.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue),
        t.appendChild(e),
        (n = rt.createElement('input')),
        n.setAttribute('type', 'radio'),
        n.setAttribute('checked', 'checked'),
        n.setAttribute('name', 't'),
        e.appendChild(n),
        (dt.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (dt.noCloneEvent = !!e.addEventListener),
        (e[pt.expando] = 1),
        (dt.attributes = !e.getAttribute(pt.expando))
    })()
    var Xt = {
      option: [1, "<select multiple='multiple'>", '</select>'],
      legend: [1, '<fieldset>', '</fieldset>'],
      area: [1, '<map>', '</map>'],
      param: [1, '<object>', '</object>'],
      thead: [1, '<table>', '</table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: dt.htmlSerialize ? [0, '', ''] : [1, 'X<div>', '</div>']
    }
    ;(Xt.optgroup = Xt.option),
      (Xt.tbody = Xt.tfoot = Xt.colgroup = Xt.caption = Xt.thead),
      (Xt.th = Xt.td)
    var Ut = /<|&#?\w+;/,
      Vt = /<tbody/i
    !(function() {
      var t,
        n,
        r = rt.createElement('div')
      for (t in { submit: !0, change: !0, focusin: !0 })
        (n = 'on' + t),
          (dt[t] = n in e) ||
            (r.setAttribute(n, 't'), (dt[t] = r.attributes[n].expando === !1))
      r = null
    })()
    var Yt = /^(?:input|select|textarea)$/i,
      Jt = /^key/,
      Gt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Qt = /^(?:focusinfocus|focusoutblur)$/,
      Kt = /^([^.]*)(?:\.(.+)|)/
    ;(pt.event = {
      global: {},
      add: function(e, t, n, r, i) {
        var o,
          a,
          s,
          u,
          l,
          c,
          d,
          f,
          p,
          h,
          g,
          m = pt._data(e)
        if (m) {
          for (
            n.handler && ((u = n), (n = u.handler), (i = u.selector)),
              n.guid || (n.guid = pt.guid++),
              (a = m.events) || (a = m.events = {}),
              (c = m.handle) ||
                ((c = m.handle = function(e) {
                  return 'undefined' == typeof pt ||
                    (e && pt.event.triggered === e.type)
                    ? void 0
                    : pt.event.dispatch.apply(c.elem, arguments)
                }),
                (c.elem = e)),
              t = (t || '').match(Dt) || [''],
              s = t.length;
            s--;

          )
            (o = Kt.exec(t[s]) || []),
              (p = g = o[1]),
              (h = (o[2] || '').split('.').sort()),
              p &&
                ((l = pt.event.special[p] || {}),
                (p = (i ? l.delegateType : l.bindType) || p),
                (l = pt.event.special[p] || {}),
                (d = pt.extend(
                  {
                    type: p,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && pt.expr.match.needsContext.test(i),
                    namespace: h.join('.')
                  },
                  u
                )),
                (f = a[p]) ||
                  ((f = a[p] = []),
                  (f.delegateCount = 0),
                  (l.setup && l.setup.call(e, r, h, c) !== !1) ||
                    (e.addEventListener
                      ? e.addEventListener(p, c, !1)
                      : e.attachEvent && e.attachEvent('on' + p, c))),
                l.add &&
                  (l.add.call(e, d),
                  d.handler.guid || (d.handler.guid = n.guid)),
                i ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                (pt.event.global[p] = !0))
          e = null
        }
      },
      remove: function(e, t, n, r, i) {
        var o,
          a,
          s,
          u,
          l,
          c,
          d,
          f,
          p,
          h,
          g,
          m = pt.hasData(e) && pt._data(e)
        if (m && (c = m.events)) {
          for (t = (t || '').match(Dt) || [''], l = t.length; l--; )
            if (
              ((s = Kt.exec(t[l]) || []),
              (p = g = s[1]),
              (h = (s[2] || '').split('.').sort()),
              p)
            ) {
              for (
                d = pt.event.special[p] || {},
                  p = (r ? d.delegateType : d.bindType) || p,
                  f = c[p] || [],
                  s =
                    s[2] &&
                    new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                  u = o = f.length;
                o--;

              )
                (a = f[o]),
                  (!i && g !== a.origType) ||
                    (n && n.guid !== a.guid) ||
                    (s && !s.test(a.namespace)) ||
                    (r && r !== a.selector && ('**' !== r || !a.selector)) ||
                    (f.splice(o, 1),
                    a.selector && f.delegateCount--,
                    d.remove && d.remove.call(e, a))
              u &&
                !f.length &&
                ((d.teardown && d.teardown.call(e, h, m.handle) !== !1) ||
                  pt.removeEvent(e, p, m.handle),
                delete c[p])
            } else for (p in c) pt.event.remove(e, p + t[l], n, r, !0)
          pt.isEmptyObject(c) && (delete m.handle, pt._removeData(e, 'events'))
        }
      },
      trigger: function(t, n, r, i) {
        var o,
          a,
          s,
          u,
          l,
          c,
          d,
          f = [r || rt],
          p = ct.call(t, 'type') ? t.type : t,
          h = ct.call(t, 'namespace') ? t.namespace.split('.') : []
        if (
          ((s = c = r = r || rt),
          3 !== r.nodeType &&
            8 !== r.nodeType &&
            !Qt.test(p + pt.event.triggered) &&
            (p.indexOf('.') > -1 &&
              ((h = p.split('.')), (p = h.shift()), h.sort()),
            (a = p.indexOf(':') < 0 && 'on' + p),
            (t = t[pt.expando]
              ? t
              : new pt.Event(p, 'object' == typeof t && t)),
            (t.isTrigger = i ? 2 : 3),
            (t.namespace = h.join('.')),
            (t.rnamespace = t.namespace
              ? new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)')
              : null),
            (t.result = void 0),
            t.target || (t.target = r),
            (n = null == n ? [t] : pt.makeArray(n, [t])),
            (l = pt.event.special[p] || {}),
            i || !l.trigger || l.trigger.apply(r, n) !== !1))
        ) {
          if (!i && !l.noBubble && !pt.isWindow(r)) {
            for (
              u = l.delegateType || p, Qt.test(u + p) || (s = s.parentNode);
              s;
              s = s.parentNode
            )
              f.push(s), (c = s)
            c === (r.ownerDocument || rt) &&
              f.push(c.defaultView || c.parentWindow || e)
          }
          for (d = 0; (s = f[d++]) && !t.isPropagationStopped(); )
            (t.type = d > 1 ? u : l.bindType || p),
              (o =
                (pt._data(s, 'events') || {})[t.type] && pt._data(s, 'handle')),
              o && o.apply(s, n),
              (o = a && s[a]),
              o &&
                o.apply &&
                Ht(s) &&
                ((t.result = o.apply(s, n)),
                t.result === !1 && t.preventDefault())
          if (
            ((t.type = p),
            !i &&
              !t.isDefaultPrevented() &&
              (!l._default || l._default.apply(f.pop(), n) === !1) &&
              Ht(r) &&
              a &&
              r[p] &&
              !pt.isWindow(r))
          ) {
            ;(c = r[a]), c && (r[a] = null), (pt.event.triggered = p)
            try {
              r[p]()
            } catch (g) {}
            ;(pt.event.triggered = void 0), c && (r[a] = c)
          }
          return t.result
        }
      },
      dispatch: function(e) {
        e = pt.event.fix(e)
        var t,
          n,
          r,
          i,
          o,
          a = [],
          s = it.call(arguments),
          u = (pt._data(this, 'events') || {})[e.type] || [],
          l = pt.event.special[e.type] || {}
        if (
          ((s[0] = e),
          (e.delegateTarget = this),
          !l.preDispatch || l.preDispatch.call(this, e) !== !1)
        ) {
          for (
            a = pt.event.handlers.call(this, e, u), t = 0;
            (i = a[t++]) && !e.isPropagationStopped();

          )
            for (
              e.currentTarget = i.elem, n = 0;
              (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();

            )
              (!e.rnamespace || e.rnamespace.test(o.namespace)) &&
                ((e.handleObj = o),
                (e.data = o.data),
                (r = (
                  (pt.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, s)),
                void 0 !== r &&
                  (e.result = r) === !1 &&
                  (e.preventDefault(), e.stopPropagation()))
          return l.postDispatch && l.postDispatch.call(this, e), e.result
        }
      },
      handlers: function(e, t) {
        var n,
          r,
          i,
          o,
          a = [],
          s = t.delegateCount,
          u = e.target
        if (
          s &&
          u.nodeType &&
          ('click' !== e.type || isNaN(e.button) || e.button < 1)
        )
          for (; u != this; u = u.parentNode || this)
            if (1 === u.nodeType && (u.disabled !== !0 || 'click' !== e.type)) {
              for (r = [], n = 0; s > n; n++)
                (o = t[n]),
                  (i = o.selector + ' '),
                  void 0 === r[i] &&
                    (r[i] = o.needsContext
                      ? pt(i, this).index(u) > -1
                      : pt.find(i, this, null, [u]).length),
                  r[i] && r.push(o)
              r.length && a.push({ elem: u, handlers: r })
            }
        return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a
      },
      fix: function(e) {
        if (e[pt.expando]) return e
        var t,
          n,
          r,
          i = e.type,
          o = e,
          a = this.fixHooks[i]
        for (
          a ||
            (this.fixHooks[i] = a = Gt.test(i)
              ? this.mouseHooks
              : Jt.test(i)
              ? this.keyHooks
              : {}),
            r = a.props ? this.props.concat(a.props) : this.props,
            e = new pt.Event(o),
            t = r.length;
          t--;

        )
          (n = r[t]), (e[n] = o[n])
        return (
          e.target || (e.target = o.srcElement || rt),
          3 === e.target.nodeType && (e.target = e.target.parentNode),
          (e.metaKey = !!e.metaKey),
          a.filter ? a.filter(e, o) : e
        )
      },
      props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
        ' '
      ),
      fixHooks: {},
      keyHooks: {
        props: 'char charCode key keyCode'.split(' '),
        filter: function(e, t) {
          return (
            null == e.which &&
              (e.which = null != t.charCode ? t.charCode : t.keyCode),
            e
          )
        }
      },
      mouseHooks: {
        props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(
          ' '
        ),
        filter: function(e, t) {
          var n,
            r,
            i,
            o = t.button,
            a = t.fromElement
          return (
            null == e.pageX &&
              null != t.clientX &&
              ((r = e.target.ownerDocument || rt),
              (i = r.documentElement),
              (n = r.body),
              (e.pageX =
                t.clientX +
                ((i && i.scrollLeft) || (n && n.scrollLeft) || 0) -
                ((i && i.clientLeft) || (n && n.clientLeft) || 0)),
              (e.pageY =
                t.clientY +
                ((i && i.scrollTop) || (n && n.scrollTop) || 0) -
                ((i && i.clientTop) || (n && n.clientTop) || 0))),
            !e.relatedTarget &&
              a &&
              (e.relatedTarget = a === e.target ? t.toElement : a),
            e.which ||
              void 0 === o ||
              (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
            e
          )
        }
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function() {
            if (this !== b() && this.focus)
              try {
                return this.focus(), !1
              } catch (e) {}
          },
          delegateType: 'focusin'
        },
        blur: {
          trigger: function() {
            return this === b() && this.blur ? (this.blur(), !1) : void 0
          },
          delegateType: 'focusout'
        },
        click: {
          trigger: function() {
            return pt.nodeName(this, 'input') &&
              'checkbox' === this.type &&
              this.click
              ? (this.click(), !1)
              : void 0
          },
          _default: function(e) {
            return pt.nodeName(e.target, 'a')
          }
        },
        beforeunload: {
          postDispatch: function(e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result)
          }
        }
      },
      simulate: function(e, t, n) {
        var r = pt.extend(new pt.Event(), n, { type: e, isSimulated: !0 })
        pt.event.trigger(r, null, t),
          r.isDefaultPrevented() && n.preventDefault()
      }
    }),
      (pt.removeEvent = rt.removeEventListener
        ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
          }
        : function(e, t, n) {
            var r = 'on' + t
            e.detachEvent &&
              ('undefined' == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
          }),
      (pt.Event = function(e, t) {
        return this instanceof pt.Event
          ? (e && e.type
              ? ((this.originalEvent = e),
                (this.type = e.type),
                (this.isDefaultPrevented =
                  e.defaultPrevented ||
                  (void 0 === e.defaultPrevented && e.returnValue === !1)
                    ? y
                    : x))
              : (this.type = e),
            t && pt.extend(this, t),
            (this.timeStamp = (e && e.timeStamp) || pt.now()),
            void (this[pt.expando] = !0))
          : new pt.Event(e, t)
      }),
      (pt.Event.prototype = {
        constructor: pt.Event,
        isDefaultPrevented: x,
        isPropagationStopped: x,
        isImmediatePropagationStopped: x,
        preventDefault: function() {
          var e = this.originalEvent
          ;(this.isDefaultPrevented = y),
            e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1))
        },
        stopPropagation: function() {
          var e = this.originalEvent
          ;(this.isPropagationStopped = y),
            e &&
              !this.isSimulated &&
              (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0))
        },
        stopImmediatePropagation: function() {
          var e = this.originalEvent
          ;(this.isImmediatePropagationStopped = y),
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
      }),
      pt.each(
        {
          mouseenter: 'mouseover',
          mouseleave: 'mouseout',
          pointerenter: 'pointerover',
          pointerleave: 'pointerout'
        },
        function(e, t) {
          pt.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
              var n,
                r = this,
                i = e.relatedTarget,
                o = e.handleObj
              return (
                (!i || (i !== r && !pt.contains(r, i))) &&
                  ((e.type = o.origType),
                  (n = o.handler.apply(this, arguments)),
                  (e.type = t)),
                n
              )
            }
          }
        }
      ),
      dt.submit ||
        (pt.event.special.submit = {
          setup: function() {
            return pt.nodeName(this, 'form')
              ? !1
              : void pt.event.add(
                  this,
                  'click._submit keypress._submit',
                  function(e) {
                    var t = e.target,
                      n =
                        pt.nodeName(t, 'input') || pt.nodeName(t, 'button')
                          ? pt.prop(t, 'form')
                          : void 0
                    n &&
                      !pt._data(n, 'submit') &&
                      (pt.event.add(n, 'submit._submit', function(e) {
                        e._submitBubble = !0
                      }),
                      pt._data(n, 'submit', !0))
                  }
                )
          },
          postDispatch: function(e) {
            e._submitBubble &&
              (delete e._submitBubble,
              this.parentNode &&
                !e.isTrigger &&
                pt.event.simulate('submit', this.parentNode, e))
          },
          teardown: function() {
            return pt.nodeName(this, 'form')
              ? !1
              : void pt.event.remove(this, '._submit')
          }
        }),
      dt.change ||
        (pt.event.special.change = {
          setup: function() {
            return Yt.test(this.nodeName)
              ? (('checkbox' === this.type || 'radio' === this.type) &&
                  (pt.event.add(this, 'propertychange._change', function(e) {
                    'checked' === e.originalEvent.propertyName &&
                      (this._justChanged = !0)
                  }),
                  pt.event.add(this, 'click._change', function(e) {
                    this._justChanged &&
                      !e.isTrigger &&
                      (this._justChanged = !1),
                      pt.event.simulate('change', this, e)
                  })),
                !1)
              : void pt.event.add(this, 'beforeactivate._change', function(e) {
                  var t = e.target
                  Yt.test(t.nodeName) &&
                    !pt._data(t, 'change') &&
                    (pt.event.add(t, 'change._change', function(e) {
                      !this.parentNode ||
                        e.isSimulated ||
                        e.isTrigger ||
                        pt.event.simulate('change', this.parentNode, e)
                    }),
                    pt._data(t, 'change', !0))
                })
          },
          handle: function(e) {
            var t = e.target
            return this !== t ||
              e.isSimulated ||
              e.isTrigger ||
              ('radio' !== t.type && 'checkbox' !== t.type)
              ? e.handleObj.handler.apply(this, arguments)
              : void 0
          },
          teardown: function() {
            return pt.event.remove(this, '._change'), !Yt.test(this.nodeName)
          }
        }),
      dt.focusin ||
        pt.each({ focus: 'focusin', blur: 'focusout' }, function(e, t) {
          var n = function(e) {
            pt.event.simulate(t, e.target, pt.event.fix(e))
          }
          pt.event.special[t] = {
            setup: function() {
              var r = this.ownerDocument || this,
                i = pt._data(r, t)
              i || r.addEventListener(e, n, !0), pt._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
              var r = this.ownerDocument || this,
                i = pt._data(r, t) - 1
              i
                ? pt._data(r, t, i)
                : (r.removeEventListener(e, n, !0), pt._removeData(r, t))
            }
          }
        }),
      pt.fn.extend({
        on: function(e, t, n, r) {
          return w(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
          return w(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
          var r, i
          if (e && e.preventDefault && e.handleObj)
            return (
              (r = e.handleObj),
              pt(e.delegateTarget).off(
                r.namespace ? r.origType + '.' + r.namespace : r.origType,
                r.selector,
                r.handler
              ),
              this
            )
          if ('object' == typeof e) {
            for (i in e) this.off(i, t, e[i])
            return this
          }
          return (
            (t === !1 || 'function' == typeof t) && ((n = t), (t = void 0)),
            n === !1 && (n = x),
            this.each(function() {
              pt.event.remove(this, e, n, t)
            })
          )
        },
        trigger: function(e, t) {
          return this.each(function() {
            pt.event.trigger(e, t, this)
          })
        },
        triggerHandler: function(e, t) {
          var n = this[0]
          return n ? pt.event.trigger(e, t, n, !0) : void 0
        }
      })
    var Zt = / jQuery\d+="(?:null|\d+)"/g,
      en = new RegExp('<(?:' + zt + ')[\\s/>]', 'i'),
      tn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      nn = /<script|<style|<link/i,
      rn = /checked\s*(?:[^=]|=\s*.checked.)/i,
      on = /^true\/(.*)/,
      an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      sn = p(rt),
      un = sn.appendChild(rt.createElement('div'))
    pt.extend({
      htmlPrefilter: function(e) {
        return e.replace(tn, '<$1></$2>')
      },
      clone: function(e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u = pt.contains(e.ownerDocument, e)
        if (
          (dt.html5Clone || pt.isXMLDoc(e) || !en.test('<' + e.nodeName + '>')
            ? (o = e.cloneNode(!0))
            : ((un.innerHTML = e.outerHTML),
              un.removeChild((o = un.firstChild))),
          !(
            (dt.noCloneEvent && dt.noCloneChecked) ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            pt.isXMLDoc(e)
          ))
        )
          for (r = h(o), s = h(e), a = 0; null != (i = s[a]); ++a)
            r[a] && k(i, r[a])
        if (t)
          if (n)
            for (s = s || h(e), r = r || h(o), a = 0; null != (i = s[a]); a++)
              N(i, r[a])
          else N(e, o)
        return (
          (r = h(o, 'script')),
          r.length > 0 && g(r, !u && h(e, 'script')),
          (r = s = i = null),
          o
        )
      },
      cleanData: function(e, t) {
        for (
          var n,
            r,
            i,
            o,
            a = 0,
            s = pt.expando,
            u = pt.cache,
            l = dt.attributes,
            c = pt.event.special;
          null != (n = e[a]);
          a++
        )
          if ((t || Ht(n)) && ((i = n[s]), (o = i && u[i]))) {
            if (o.events)
              for (r in o.events)
                c[r] ? pt.event.remove(n, r) : pt.removeEvent(n, r, o.handle)
            u[i] &&
              (delete u[i],
              l || 'undefined' == typeof n.removeAttribute
                ? (n[s] = void 0)
                : n.removeAttribute(s),
              nt.push(i))
          }
      }
    }),
      pt.fn.extend({
        domManip: S,
        detach: function(e) {
          return A(this, e, !0)
        },
        remove: function(e) {
          return A(this, e)
        },
        text: function(e) {
          return Pt(
            this,
            function(e) {
              return void 0 === e
                ? pt.text(this)
                : this.empty().append(
                    ((this[0] && this[0].ownerDocument) || rt).createTextNode(e)
                  )
            },
            null,
            e,
            arguments.length
          )
        },
        append: function() {
          return S(this, arguments, function(e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = T(this, e)
              t.appendChild(e)
            }
          })
        },
        prepend: function() {
          return S(this, arguments, function(e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = T(this, e)
              t.insertBefore(e, t.firstChild)
            }
          })
        },
        before: function() {
          return S(this, arguments, function(e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
          })
        },
        after: function() {
          return S(this, arguments, function(e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
          })
        },
        empty: function() {
          for (var e, t = 0; null != (e = this[t]); t++) {
            for (1 === e.nodeType && pt.cleanData(h(e, !1)); e.firstChild; )
              e.removeChild(e.firstChild)
            e.options && pt.nodeName(e, 'select') && (e.options.length = 0)
          }
          return this
        },
        clone: function(e, t) {
          return (
            (e = null == e ? !1 : e),
            (t = null == t ? e : t),
            this.map(function() {
              return pt.clone(this, e, t)
            })
          )
        },
        html: function(e) {
          return Pt(
            this,
            function(e) {
              var t = this[0] || {},
                n = 0,
                r = this.length
              if (void 0 === e)
                return 1 === t.nodeType ? t.innerHTML.replace(Zt, '') : void 0
              if (
                !(
                  'string' != typeof e ||
                  nn.test(e) ||
                  (!dt.htmlSerialize && en.test(e)) ||
                  (!dt.leadingWhitespace && $t.test(e)) ||
                  Xt[(Wt.exec(e) || ['', ''])[1].toLowerCase()]
                )
              ) {
                e = pt.htmlPrefilter(e)
                try {
                  for (; r > n; n++)
                    (t = this[n] || {}),
                      1 === t.nodeType &&
                        (pt.cleanData(h(t, !1)), (t.innerHTML = e))
                  t = 0
                } catch (i) {}
              }
              t && this.empty().append(e)
            },
            null,
            e,
            arguments.length
          )
        },
        replaceWith: function() {
          var e = []
          return S(
            this,
            arguments,
            function(t) {
              var n = this.parentNode
              pt.inArray(this, e) < 0 &&
                (pt.cleanData(h(this)), n && n.replaceChild(t, this))
            },
            e
          )
        }
      }),
      pt.each(
        {
          appendTo: 'append',
          prependTo: 'prepend',
          insertBefore: 'before',
          insertAfter: 'after',
          replaceAll: 'replaceWith'
        },
        function(e, t) {
          pt.fn[e] = function(e) {
            for (var n, r = 0, i = [], o = pt(e), a = o.length - 1; a >= r; r++)
              (n = r === a ? this : this.clone(!0)),
                pt(o[r])[t](n),
                at.apply(i, n.get())
            return this.pushStack(i)
          }
        }
      )
    var ln,
      cn = { HTML: 'block', BODY: 'block' },
      dn = /^margin/,
      fn = new RegExp('^(' + Ft + ')(?!px)[a-z%]+$', 'i'),
      pn = function(e, t, n, r) {
        var i,
          o,
          a = {}
        for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o])
        i = n.apply(e, r || [])
        for (o in t) e.style[o] = a[o]
        return i
      },
      hn = rt.documentElement
    !(function() {
      function t() {
        var t,
          c,
          d = rt.documentElement
        d.appendChild(u),
          (l.style.cssText =
            '-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%'),
          (n = i = s = !1),
          (r = a = !0),
          e.getComputedStyle &&
            ((c = e.getComputedStyle(l)),
            (n = '1%' !== (c || {}).top),
            (s = '2px' === (c || {}).marginLeft),
            (i = '4px' === (c || { width: '4px' }).width),
            (l.style.marginRight = '50%'),
            (r = '4px' === (c || { marginRight: '4px' }).marginRight),
            (t = l.appendChild(rt.createElement('div'))),
            (t.style.cssText = l.style.cssText =
              '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'),
            (t.style.marginRight = t.style.width = '0'),
            (l.style.width = '1px'),
            (a = !parseFloat((e.getComputedStyle(t) || {}).marginRight)),
            l.removeChild(t)),
          (l.style.display = 'none'),
          (o = 0 === l.getClientRects().length),
          o &&
            ((l.style.display = ''),
            (l.innerHTML = '<table><tr><td></td><td>t</td></tr></table>'),
            (l.childNodes[0].style.borderCollapse = 'separate'),
            (t = l.getElementsByTagName('td')),
            (t[0].style.cssText = 'margin:0;border:0;padding:0;display:none'),
            (o = 0 === t[0].offsetHeight),
            o &&
              ((t[0].style.display = ''),
              (t[1].style.display = 'none'),
              (o = 0 === t[0].offsetHeight))),
          d.removeChild(u)
      }
      var n,
        r,
        i,
        o,
        a,
        s,
        u = rt.createElement('div'),
        l = rt.createElement('div')
      l.style &&
        ((l.style.cssText = 'float:left;opacity:.5'),
        (dt.opacity = '0.5' === l.style.opacity),
        (dt.cssFloat = !!l.style.cssFloat),
        (l.style.backgroundClip = 'content-box'),
        (l.cloneNode(!0).style.backgroundClip = ''),
        (dt.clearCloneStyle = 'content-box' === l.style.backgroundClip),
        (u = rt.createElement('div')),
        (u.style.cssText =
          'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute'),
        (l.innerHTML = ''),
        u.appendChild(l),
        (dt.boxSizing =
          '' === l.style.boxSizing ||
          '' === l.style.MozBoxSizing ||
          '' === l.style.WebkitBoxSizing),
        pt.extend(dt, {
          reliableHiddenOffsets: function() {
            return null == n && t(), o
          },
          boxSizingReliable: function() {
            return null == n && t(), i
          },
          pixelMarginRight: function() {
            return null == n && t(), r
          },
          pixelPosition: function() {
            return null == n && t(), n
          },
          reliableMarginRight: function() {
            return null == n && t(), a
          },
          reliableMarginLeft: function() {
            return null == n && t(), s
          }
        }))
    })()
    var gn,
      mn,
      vn = /^(top|right|bottom|left)$/
    e.getComputedStyle
      ? ((gn = function(t) {
          var n = t.ownerDocument.defaultView
          return (n && n.opener) || (n = e), n.getComputedStyle(t)
        }),
        (mn = function(e, t, n) {
          var r,
            i,
            o,
            a,
            s = e.style
          return (
            (n = n || gn(e)),
            (a = n ? n.getPropertyValue(t) || n[t] : void 0),
            ('' !== a && void 0 !== a) ||
              pt.contains(e.ownerDocument, e) ||
              (a = pt.style(e, t)),
            n &&
              !dt.pixelMarginRight() &&
              fn.test(a) &&
              dn.test(t) &&
              ((r = s.width),
              (i = s.minWidth),
              (o = s.maxWidth),
              (s.minWidth = s.maxWidth = s.width = a),
              (a = n.width),
              (s.width = r),
              (s.minWidth = i),
              (s.maxWidth = o)),
            void 0 === a ? a : a + ''
          )
        }))
      : hn.currentStyle &&
        ((gn = function(e) {
          return e.currentStyle
        }),
        (mn = function(e, t, n) {
          var r,
            i,
            o,
            a,
            s = e.style
          return (
            (n = n || gn(e)),
            (a = n ? n[t] : void 0),
            null == a && s && s[t] && (a = s[t]),
            fn.test(a) &&
              !vn.test(t) &&
              ((r = s.left),
              (i = e.runtimeStyle),
              (o = i && i.left),
              o && (i.left = e.currentStyle.left),
              (s.left = 'fontSize' === t ? '1em' : a),
              (a = s.pixelLeft + 'px'),
              (s.left = r),
              o && (i.left = o)),
            void 0 === a ? a : a + '' || 'auto'
          )
        }))
    var yn = /alpha\([^)]*\)/i,
      xn = /opacity\s*=\s*([^)]*)/i,
      bn = /^(none|table(?!-c[ea]).+)/,
      wn = new RegExp('^(' + Ft + ')(.*)$', 'i'),
      Tn = { position: 'absolute', visibility: 'hidden', display: 'block' },
      Cn = { letterSpacing: '0', fontWeight: '400' },
      En = ['Webkit', 'O', 'Moz', 'ms'],
      Nn = rt.createElement('div').style
    pt.extend({
      cssHooks: {
        opacity: {
          get: function(e, t) {
            if (t) {
              var n = mn(e, 'opacity')
              return '' === n ? '1' : n
            }
          }
        }
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: { float: dt.cssFloat ? 'cssFloat' : 'styleFloat' },
      style: function(e, t, n, r) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var i,
            o,
            a,
            s = pt.camelCase(t),
            u = e.style
          if (
            ((t = pt.cssProps[s] || (pt.cssProps[s] = H(s) || s)),
            (a = pt.cssHooks[t] || pt.cssHooks[s]),
            void 0 === n)
          )
            return a && 'get' in a && void 0 !== (i = a.get(e, !1, r))
              ? i
              : u[t]
          if (
            ((o = typeof n),
            'string' === o &&
              (i = Mt.exec(n)) &&
              i[1] &&
              ((n = f(e, t, i)), (o = 'number')),
            null != n &&
              n === n &&
              ('number' === o &&
                (n += (i && i[3]) || (pt.cssNumber[s] ? '' : 'px')),
              dt.clearCloneStyle ||
                '' !== n ||
                0 !== t.indexOf('background') ||
                (u[t] = 'inherit'),
              !(a && 'set' in a && void 0 === (n = a.set(e, n, r)))))
          )
            try {
              u[t] = n
            } catch (l) {}
        }
      },
      css: function(e, t, n, r) {
        var i,
          o,
          a,
          s = pt.camelCase(t)
        return (
          (t = pt.cssProps[s] || (pt.cssProps[s] = H(s) || s)),
          (a = pt.cssHooks[t] || pt.cssHooks[s]),
          a && 'get' in a && (o = a.get(e, !0, n)),
          void 0 === o && (o = mn(e, t, r)),
          'normal' === o && t in Cn && (o = Cn[t]),
          '' === n || n
            ? ((i = parseFloat(o)), n === !0 || isFinite(i) ? i || 0 : o)
            : o
        )
      }
    }),
      pt.each(['height', 'width'], function(e, t) {
        pt.cssHooks[t] = {
          get: function(e, n, r) {
            return n
              ? bn.test(pt.css(e, 'display')) && 0 === e.offsetWidth
                ? pn(e, Tn, function() {
                    return M(e, t, r)
                  })
                : M(e, t, r)
              : void 0
          },
          set: function(e, n, r) {
            var i = r && gn(e)
            return _(
              e,
              n,
              r
                ? F(
                    e,
                    t,
                    r,
                    dt.boxSizing &&
                      'border-box' === pt.css(e, 'boxSizing', !1, i),
                    i
                  )
                : 0
            )
          }
        }
      }),
      dt.opacity ||
        (pt.cssHooks.opacity = {
          get: function(e, t) {
            return xn.test(
              (t && e.currentStyle ? e.currentStyle.filter : e.style.filter) ||
                ''
            )
              ? 0.01 * parseFloat(RegExp.$1) + ''
              : t
              ? '1'
              : ''
          },
          set: function(e, t) {
            var n = e.style,
              r = e.currentStyle,
              i = pt.isNumeric(t) ? 'alpha(opacity=' + 100 * t + ')' : '',
              o = (r && r.filter) || n.filter || ''
            ;(n.zoom = 1),
              ((t >= 1 || '' === t) &&
                '' === pt.trim(o.replace(yn, '')) &&
                n.removeAttribute &&
                (n.removeAttribute('filter'), '' === t || (r && !r.filter))) ||
                (n.filter = yn.test(o) ? o.replace(yn, i) : o + ' ' + i)
          }
        }),
      (pt.cssHooks.marginRight = L(dt.reliableMarginRight, function(e, t) {
        return t
          ? pn(e, { display: 'inline-block' }, mn, [e, 'marginRight'])
          : void 0
      })),
      (pt.cssHooks.marginLeft = L(dt.reliableMarginLeft, function(e, t) {
        return t
          ? (parseFloat(mn(e, 'marginLeft')) ||
              (pt.contains(e.ownerDocument, e)
                ? e.getBoundingClientRect().left -
                  pn(e, { marginLeft: 0 }, function() {
                    return e.getBoundingClientRect().left
                  })
                : 0)) + 'px'
          : void 0
      })),
      pt.each({ margin: '', padding: '', border: 'Width' }, function(e, t) {
        ;(pt.cssHooks[e + t] = {
          expand: function(n) {
            for (
              var r = 0, i = {}, o = 'string' == typeof n ? n.split(' ') : [n];
              4 > r;
              r++
            )
              i[e + Ot[r] + t] = o[r] || o[r - 2] || o[0]
            return i
          }
        }),
          dn.test(e) || (pt.cssHooks[e + t].set = _)
      }),
      pt.fn.extend({
        css: function(e, t) {
          return Pt(
            this,
            function(e, t, n) {
              var r,
                i,
                o = {},
                a = 0
              if (pt.isArray(t)) {
                for (r = gn(e), i = t.length; i > a; a++)
                  o[t[a]] = pt.css(e, t[a], !1, r)
                return o
              }
              return void 0 !== n ? pt.style(e, t, n) : pt.css(e, t)
            },
            e,
            t,
            arguments.length > 1
          )
        },
        show: function() {
          return q(this, !0)
        },
        hide: function() {
          return q(this)
        },
        toggle: function(e) {
          return 'boolean' == typeof e
            ? e
              ? this.show()
              : this.hide()
            : this.each(function() {
                Rt(this) ? pt(this).show() : pt(this).hide()
              })
        }
      }),
      (pt.Tween = O),
      (O.prototype = {
        constructor: O,
        init: function(e, t, n, r, i, o) {
          ;(this.elem = e),
            (this.prop = n),
            (this.easing = i || pt.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = r),
            (this.unit = o || (pt.cssNumber[n] ? '' : 'px'))
        },
        cur: function() {
          var e = O.propHooks[this.prop]
          return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        },
        run: function(e) {
          var t,
            n = O.propHooks[this.prop]
          return (
            (this.pos = t = this.options.duration
              ? pt.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                )
              : e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : O.propHooks._default.set(this),
            this
          )
        }
      }),
      (O.prototype.init.prototype = O.prototype),
      (O.propHooks = {
        _default: {
          get: function(e) {
            var t
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : ((t = pt.css(e.elem, e.prop, '')), t && 'auto' !== t ? t : 0)
          },
          set: function(e) {
            pt.fx.step[e.prop]
              ? pt.fx.step[e.prop](e)
              : 1 !== e.elem.nodeType ||
                (null == e.elem.style[pt.cssProps[e.prop]] &&
                  !pt.cssHooks[e.prop])
              ? (e.elem[e.prop] = e.now)
              : pt.style(e.elem, e.prop, e.now + e.unit)
          }
        }
      }),
      (O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function(e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
      }),
      (pt.easing = {
        linear: function(e) {
          return e
        },
        swing: function(e) {
          return 0.5 - Math.cos(e * Math.PI) / 2
        },
        _default: 'swing'
      }),
      (pt.fx = O.prototype.init),
      (pt.fx.step = {})
    var kn,
      Sn,
      An = /^(?:toggle|show|hide)$/,
      Dn = /queueHooks$/
    ;(pt.Animation = pt.extend($, {
      tweeners: {
        '*': [
          function(e, t) {
            var n = this.createTween(e, t)
            return f(n.elem, e, Mt.exec(t), n), n
          }
        ]
      },
      tweener: function(e, t) {
        pt.isFunction(e) ? ((t = e), (e = ['*'])) : (e = e.match(Dt))
        for (var n, r = 0, i = e.length; i > r; r++)
          (n = e[r]),
            ($.tweeners[n] = $.tweeners[n] || []),
            $.tweeners[n].unshift(t)
      },
      prefilters: [W],
      prefilter: function(e, t) {
        t ? $.prefilters.unshift(e) : $.prefilters.push(e)
      }
    })),
      (pt.speed = function(e, t, n) {
        var r =
          e && 'object' == typeof e
            ? pt.extend({}, e)
            : {
                complete: n || (!n && t) || (pt.isFunction(e) && e),
                duration: e,
                easing: (n && t) || (t && !pt.isFunction(t) && t)
              }
        return (
          (r.duration = pt.fx.off
            ? 0
            : 'number' == typeof r.duration
            ? r.duration
            : r.duration in pt.fx.speeds
            ? pt.fx.speeds[r.duration]
            : pt.fx.speeds._default),
          (null == r.queue || r.queue === !0) && (r.queue = 'fx'),
          (r.old = r.complete),
          (r.complete = function() {
            pt.isFunction(r.old) && r.old.call(this),
              r.queue && pt.dequeue(this, r.queue)
          }),
          r
        )
      }),
      pt.fn.extend({
        fadeTo: function(e, t, n, r) {
          return this.filter(Rt)
            .css('opacity', 0)
            .show()
            .end()
            .animate({ opacity: t }, e, n, r)
        },
        animate: function(e, t, n, r) {
          var i = pt.isEmptyObject(e),
            o = pt.speed(t, n, r),
            a = function() {
              var t = $(this, pt.extend({}, e), o)
              ;(i || pt._data(this, 'finish')) && t.stop(!0)
            }
          return (
            (a.finish = a),
            i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
          )
        },
        stop: function(e, t, n) {
          var r = function(e) {
            var t = e.stop
            delete e.stop, t(n)
          }
          return (
            'string' != typeof e && ((n = t), (t = e), (e = void 0)),
            t && e !== !1 && this.queue(e || 'fx', []),
            this.each(function() {
              var t = !0,
                i = null != e && e + 'queueHooks',
                o = pt.timers,
                a = pt._data(this)
              if (i) a[i] && a[i].stop && r(a[i])
              else for (i in a) a[i] && a[i].stop && Dn.test(i) && r(a[i])
              for (i = o.length; i--; )
                o[i].elem !== this ||
                  (null != e && o[i].queue !== e) ||
                  (o[i].anim.stop(n), (t = !1), o.splice(i, 1))
              ;(t || !n) && pt.dequeue(this, e)
            })
          )
        },
        finish: function(e) {
          return (
            e !== !1 && (e = e || 'fx'),
            this.each(function() {
              var t,
                n = pt._data(this),
                r = n[e + 'queue'],
                i = n[e + 'queueHooks'],
                o = pt.timers,
                a = r ? r.length : 0
              for (
                n.finish = !0,
                  pt.queue(this, e, []),
                  i && i.stop && i.stop.call(this, !0),
                  t = o.length;
                t--;

              )
                o[t].elem === this &&
                  o[t].queue === e &&
                  (o[t].anim.stop(!0), o.splice(t, 1))
              for (t = 0; a > t; t++)
                r[t] && r[t].finish && r[t].finish.call(this)
              delete n.finish
            })
          )
        }
      }),
      pt.each(['toggle', 'show', 'hide'], function(e, t) {
        var n = pt.fn[t]
        pt.fn[t] = function(e, r, i) {
          return null == e || 'boolean' == typeof e
            ? n.apply(this, arguments)
            : this.animate(P(t, !0), e, r, i)
        }
      }),
      pt.each(
        {
          slideDown: P('show'),
          slideUp: P('hide'),
          slideToggle: P('toggle'),
          fadeIn: { opacity: 'show' },
          fadeOut: { opacity: 'hide' },
          fadeToggle: { opacity: 'toggle' }
        },
        function(e, t) {
          pt.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
          }
        }
      ),
      (pt.timers = []),
      (pt.fx.tick = function() {
        var e,
          t = pt.timers,
          n = 0
        for (kn = pt.now(); n < t.length; n++)
          (e = t[n]), e() || t[n] !== e || t.splice(n--, 1)
        t.length || pt.fx.stop(), (kn = void 0)
      }),
      (pt.fx.timer = function(e) {
        pt.timers.push(e), e() ? pt.fx.start() : pt.timers.pop()
      }),
      (pt.fx.interval = 13),
      (pt.fx.start = function() {
        Sn || (Sn = e.setInterval(pt.fx.tick, pt.fx.interval))
      }),
      (pt.fx.stop = function() {
        e.clearInterval(Sn), (Sn = null)
      }),
      (pt.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (pt.fn.delay = function(t, n) {
        return (
          (t = pt.fx ? pt.fx.speeds[t] || t : t),
          (n = n || 'fx'),
          this.queue(n, function(n, r) {
            var i = e.setTimeout(n, t)
            r.stop = function() {
              e.clearTimeout(i)
            }
          })
        )
      }),
      (function() {
        var e,
          t = rt.createElement('input'),
          n = rt.createElement('div'),
          r = rt.createElement('select'),
          i = r.appendChild(rt.createElement('option'))
        ;(n = rt.createElement('div')),
          n.setAttribute('className', 't'),
          (n.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (e = n.getElementsByTagName('a')[0]),
          t.setAttribute('type', 'checkbox'),
          n.appendChild(t),
          (e = n.getElementsByTagName('a')[0]),
          (e.style.cssText = 'top:1px'),
          (dt.getSetAttribute = 't' !== n.className),
          (dt.style = /top/.test(e.getAttribute('style'))),
          (dt.hrefNormalized = '/a' === e.getAttribute('href')),
          (dt.checkOn = !!t.value),
          (dt.optSelected = i.selected),
          (dt.enctype = !!rt.createElement('form').enctype),
          (r.disabled = !0),
          (dt.optDisabled = !i.disabled),
          (t = rt.createElement('input')),
          t.setAttribute('value', ''),
          (dt.input = '' === t.getAttribute('value')),
          (t.value = 't'),
          t.setAttribute('type', 'radio'),
          (dt.radioValue = 't' === t.value)
      })()
    var jn = /\r/g,
      Ln = /[\x20\t\r\n\f]+/g
    pt.fn.extend({
      val: function(e) {
        var t,
          n,
          r,
          i = this[0]
        {
          if (arguments.length)
            return (
              (r = pt.isFunction(e)),
              this.each(function(n) {
                var i
                1 === this.nodeType &&
                  ((i = r ? e.call(this, n, pt(this).val()) : e),
                  null == i
                    ? (i = '')
                    : 'number' == typeof i
                    ? (i += '')
                    : pt.isArray(i) &&
                      (i = pt.map(i, function(e) {
                        return null == e ? '' : e + ''
                      })),
                  (t =
                    pt.valHooks[this.type] ||
                    pt.valHooks[this.nodeName.toLowerCase()]),
                  (t && 'set' in t && void 0 !== t.set(this, i, 'value')) ||
                    (this.value = i))
              })
            )
          if (i)
            return (
              (t =
                pt.valHooks[i.type] || pt.valHooks[i.nodeName.toLowerCase()]),
              t && 'get' in t && void 0 !== (n = t.get(i, 'value'))
                ? n
                : ((n = i.value),
                  'string' == typeof n ? n.replace(jn, '') : null == n ? '' : n)
            )
        }
      }
    }),
      pt.extend({
        valHooks: {
          option: {
            get: function(e) {
              var t = pt.find.attr(e, 'value')
              return null != t ? t : pt.trim(pt.text(e)).replace(Ln, ' ')
            }
          },
          select: {
            get: function(e) {
              for (
                var t,
                  n,
                  r = e.options,
                  i = e.selectedIndex,
                  o = 'select-one' === e.type || 0 > i,
                  a = o ? null : [],
                  s = o ? i + 1 : r.length,
                  u = 0 > i ? s : o ? i : 0;
                s > u;
                u++
              )
                if (
                  ((n = r[u]),
                  !(
                    (!n.selected && u !== i) ||
                    (dt.optDisabled
                      ? n.disabled
                      : null !== n.getAttribute('disabled')) ||
                    (n.parentNode.disabled &&
                      pt.nodeName(n.parentNode, 'optgroup'))
                  ))
                ) {
                  if (((t = pt(n).val()), o)) return t
                  a.push(t)
                }
              return a
            },
            set: function(e, t) {
              for (
                var n, r, i = e.options, o = pt.makeArray(t), a = i.length;
                a--;

              )
                if (((r = i[a]), pt.inArray(pt.valHooks.option.get(r), o) > -1))
                  try {
                    r.selected = n = !0
                  } catch (s) {
                    r.scrollHeight
                  }
                else r.selected = !1
              return n || (e.selectedIndex = -1), i
            }
          }
        }
      }),
      pt.each(['radio', 'checkbox'], function() {
        ;(pt.valHooks[this] = {
          set: function(e, t) {
            return pt.isArray(t)
              ? (e.checked = pt.inArray(pt(e).val(), t) > -1)
              : void 0
          }
        }),
          dt.checkOn ||
            (pt.valHooks[this].get = function(e) {
              return null === e.getAttribute('value') ? 'on' : e.value
            })
      })
    var Hn,
      qn,
      _n = pt.expr.attrHandle,
      Fn = /^(?:checked|selected)$/i,
      Mn = dt.getSetAttribute,
      On = dt.input
    pt.fn.extend({
      attr: function(e, t) {
        return Pt(this, pt.attr, e, t, arguments.length > 1)
      },
      removeAttr: function(e) {
        return this.each(function() {
          pt.removeAttr(this, e)
        })
      }
    }),
      pt.extend({
        attr: function(e, t, n) {
          var r,
            i,
            o = e.nodeType
          if (3 !== o && 8 !== o && 2 !== o)
            return 'undefined' == typeof e.getAttribute
              ? pt.prop(e, t, n)
              : ((1 === o && pt.isXMLDoc(e)) ||
                  ((t = t.toLowerCase()),
                  (i =
                    pt.attrHooks[t] || (pt.expr.match.bool.test(t) ? qn : Hn))),
                void 0 !== n
                  ? null === n
                    ? void pt.removeAttr(e, t)
                    : i && 'set' in i && void 0 !== (r = i.set(e, n, t))
                    ? r
                    : (e.setAttribute(t, n + ''), n)
                  : i && 'get' in i && null !== (r = i.get(e, t))
                  ? r
                  : ((r = pt.find.attr(e, t)), null == r ? void 0 : r))
        },
        attrHooks: {
          type: {
            set: function(e, t) {
              if (!dt.radioValue && 'radio' === t && pt.nodeName(e, 'input')) {
                var n = e.value
                return e.setAttribute('type', t), n && (e.value = n), t
              }
            }
          }
        },
        removeAttr: function(e, t) {
          var n,
            r,
            i = 0,
            o = t && t.match(Dt)
          if (o && 1 === e.nodeType)
            for (; (n = o[i++]); )
              (r = pt.propFix[n] || n),
                pt.expr.match.bool.test(n)
                  ? (On && Mn) || !Fn.test(n)
                    ? (e[r] = !1)
                    : (e[pt.camelCase('default-' + n)] = e[r] = !1)
                  : pt.attr(e, n, ''),
                e.removeAttribute(Mn ? n : r)
        }
      }),
      (qn = {
        set: function(e, t, n) {
          return (
            t === !1
              ? pt.removeAttr(e, n)
              : (On && Mn) || !Fn.test(n)
              ? e.setAttribute((!Mn && pt.propFix[n]) || n, n)
              : (e[pt.camelCase('default-' + n)] = e[n] = !0),
            n
          )
        }
      }),
      pt.each(pt.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = _n[t] || pt.find.attr
        _n[t] =
          (On && Mn) || !Fn.test(t)
            ? function(e, t, r) {
                var i, o
                return (
                  r ||
                    ((o = _n[t]),
                    (_n[t] = i),
                    (i = null != n(e, t, r) ? t.toLowerCase() : null),
                    (_n[t] = o)),
                  i
                )
              }
            : function(e, t, n) {
                return n
                  ? void 0
                  : e[pt.camelCase('default-' + t)]
                  ? t.toLowerCase()
                  : null
              }
      }),
      (On && Mn) ||
        (pt.attrHooks.value = {
          set: function(e, t, n) {
            return pt.nodeName(e, 'input')
              ? void (e.defaultValue = t)
              : Hn && Hn.set(e, t, n)
          }
        }),
      Mn ||
        ((Hn = {
          set: function(e, t, n) {
            var r = e.getAttributeNode(n)
            return (
              r || e.setAttributeNode((r = e.ownerDocument.createAttribute(n))),
              (r.value = t += ''),
              'value' === n || t === e.getAttribute(n) ? t : void 0
            )
          }
        }),
        (_n.id = _n.name = _n.coords = function(e, t, n) {
          var r
          return n
            ? void 0
            : (r = e.getAttributeNode(t)) && '' !== r.value
            ? r.value
            : null
        }),
        (pt.valHooks.button = {
          get: function(e, t) {
            var n = e.getAttributeNode(t)
            return n && n.specified ? n.value : void 0
          },
          set: Hn.set
        }),
        (pt.attrHooks.contenteditable = {
          set: function(e, t, n) {
            Hn.set(e, '' === t ? !1 : t, n)
          }
        }),
        pt.each(['width', 'height'], function(e, t) {
          pt.attrHooks[t] = {
            set: function(e, n) {
              return '' === n ? (e.setAttribute(t, 'auto'), n) : void 0
            }
          }
        })),
      dt.style ||
        (pt.attrHooks.style = {
          get: function(e) {
            return e.style.cssText || void 0
          },
          set: function(e, t) {
            return (e.style.cssText = t + '')
          }
        })
    var Rn = /^(?:input|select|textarea|button|object)$/i,
      Pn = /^(?:a|area)$/i
    pt.fn.extend({
      prop: function(e, t) {
        return Pt(this, pt.prop, e, t, arguments.length > 1)
      },
      removeProp: function(e) {
        return (
          (e = pt.propFix[e] || e),
          this.each(function() {
            try {
              ;(this[e] = void 0), delete this[e]
            } catch (t) {}
          })
        )
      }
    }),
      pt.extend({
        prop: function(e, t, n) {
          var r,
            i,
            o = e.nodeType
          if (3 !== o && 8 !== o && 2 !== o)
            return (
              (1 === o && pt.isXMLDoc(e)) ||
                ((t = pt.propFix[t] || t), (i = pt.propHooks[t])),
              void 0 !== n
                ? i && 'set' in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e[t] = n)
                : i && 'get' in i && null !== (r = i.get(e, t))
                ? r
                : e[t]
            )
        },
        propHooks: {
          tabIndex: {
            get: function(e) {
              var t = pt.find.attr(e, 'tabindex')
              return t
                ? parseInt(t, 10)
                : Rn.test(e.nodeName) || (Pn.test(e.nodeName) && e.href)
                ? 0
                : -1
            }
          }
        },
        propFix: { for: 'htmlFor', class: 'className' }
      }),
      dt.hrefNormalized ||
        pt.each(['href', 'src'], function(e, t) {
          pt.propHooks[t] = {
            get: function(e) {
              return e.getAttribute(t, 4)
            }
          }
        }),
      dt.optSelected ||
        (pt.propHooks.selected = {
          get: function(e) {
            var t = e.parentNode
            return (
              t &&
                (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
              null
            )
          },
          set: function(e) {
            var t = e.parentNode
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
          }
        }),
      pt.each(
        [
          'tabIndex',
          'readOnly',
          'maxLength',
          'cellSpacing',
          'cellPadding',
          'rowSpan',
          'colSpan',
          'useMap',
          'frameBorder',
          'contentEditable'
        ],
        function() {
          pt.propFix[this.toLowerCase()] = this
        }
      ),
      dt.enctype || (pt.propFix.enctype = 'encoding')
    var Bn = /[\t\r\n\f]/g
    pt.fn.extend({
      addClass: function(e) {
        var t,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0
        if (pt.isFunction(e))
          return this.each(function(t) {
            pt(this).addClass(e.call(this, t, z(this)))
          })
        if ('string' == typeof e && e)
          for (t = e.match(Dt) || []; (n = this[u++]); )
            if (
              ((i = z(n)),
              (r = 1 === n.nodeType && (' ' + i + ' ').replace(Bn, ' ')))
            ) {
              for (a = 0; (o = t[a++]); )
                r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ')
              ;(s = pt.trim(r)), i !== s && pt.attr(n, 'class', s)
            }
        return this
      },
      removeClass: function(e) {
        var t,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0
        if (pt.isFunction(e))
          return this.each(function(t) {
            pt(this).removeClass(e.call(this, t, z(this)))
          })
        if (!arguments.length) return this.attr('class', '')
        if ('string' == typeof e && e)
          for (t = e.match(Dt) || []; (n = this[u++]); )
            if (
              ((i = z(n)),
              (r = 1 === n.nodeType && (' ' + i + ' ').replace(Bn, ' ')))
            ) {
              for (a = 0; (o = t[a++]); )
                for (; r.indexOf(' ' + o + ' ') > -1; )
                  r = r.replace(' ' + o + ' ', ' ')
              ;(s = pt.trim(r)), i !== s && pt.attr(n, 'class', s)
            }
        return this
      },
      toggleClass: function(e, t) {
        var n = typeof e
        return 'boolean' == typeof t && 'string' === n
          ? t
            ? this.addClass(e)
            : this.removeClass(e)
          : this.each(
              pt.isFunction(e)
                ? function(n) {
                    pt(this).toggleClass(e.call(this, n, z(this), t), t)
                  }
                : function() {
                    var t, r, i, o
                    if ('string' === n)
                      for (
                        r = 0, i = pt(this), o = e.match(Dt) || [];
                        (t = o[r++]);

                      )
                        i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                    else
                      (void 0 === e || 'boolean' === n) &&
                        ((t = z(this)),
                        t && pt._data(this, '__className__', t),
                        pt.attr(
                          this,
                          'class',
                          t || e === !1
                            ? ''
                            : pt._data(this, '__className__') || ''
                        ))
                  }
            )
      },
      hasClass: function(e) {
        var t,
          n,
          r = 0
        for (t = ' ' + e + ' '; (n = this[r++]); )
          if (
            1 === n.nodeType &&
            (' ' + z(n) + ' ').replace(Bn, ' ').indexOf(t) > -1
          )
            return !0
        return !1
      }
    }),
      pt.each(
        'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
          ' '
        ),
        function(e, t) {
          pt.fn[t] = function(e, n) {
            return arguments.length > 0
              ? this.on(t, null, e, n)
              : this.trigger(t)
          }
        }
      ),
      pt.fn.extend({
        hover: function(e, t) {
          return this.mouseenter(e).mouseleave(t || e)
        }
      })
    var Wn = e.location,
      In = pt.now(),
      $n = /\?/,
      zn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g
    ;(pt.parseJSON = function(t) {
      if (e.JSON && e.JSON.parse) return e.JSON.parse(t + '')
      var n,
        r = null,
        i = pt.trim(t + '')
      return i &&
        !pt.trim(
          i.replace(zn, function(e, t, i, o) {
            return (
              n && t && (r = 0),
              0 === r ? e : ((n = i || t), (r += !o - !i), '')
            )
          })
        )
        ? Function('return ' + i)()
        : pt.error('Invalid JSON: ' + t)
    }),
      (pt.parseXML = function(t) {
        var n, r
        if (!t || 'string' != typeof t) return null
        try {
          e.DOMParser
            ? ((r = new e.DOMParser()), (n = r.parseFromString(t, 'text/xml')))
            : ((n = new e.ActiveXObject('Microsoft.XMLDOM')),
              (n.async = 'false'),
              n.loadXML(t))
        } catch (i) {
          n = void 0
        }
        return (
          (n &&
            n.documentElement &&
            !n.getElementsByTagName('parsererror').length) ||
            pt.error('Invalid XML: ' + t),
          n
        )
      })
    var Xn = /#.*$/,
      Un = /([?&])_=[^&]*/,
      Vn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      Yn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Jn = /^(?:GET|HEAD)$/,
      Gn = /^\/\//,
      Qn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      Kn = {},
      Zn = {},
      er = '*/'.concat('*'),
      tr = Wn.href,
      nr = Qn.exec(tr.toLowerCase()) || []
    pt.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: tr,
        type: 'GET',
        isLocal: Yn.test(nr[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: {
          '*': er,
          text: 'text/plain',
          html: 'text/html',
          xml: 'application/xml, text/xml',
          json: 'application/json, text/javascript'
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: 'responseXML',
          text: 'responseText',
          json: 'responseJSON'
        },
        converters: {
          '* text': String,
          'text html': !0,
          'text json': pt.parseJSON,
          'text xml': pt.parseXML
        },
        flatOptions: { url: !0, context: !0 }
      },
      ajaxSetup: function(e, t) {
        return t ? V(V(e, pt.ajaxSettings), t) : V(pt.ajaxSettings, e)
      },
      ajaxPrefilter: X(Kn),
      ajaxTransport: X(Zn),
      ajax: function(t, n) {
        function r(t, n, r, i) {
          var o,
            d,
            y,
            x,
            w,
            C = n
          2 !== b &&
            ((b = 2),
            u && e.clearTimeout(u),
            (c = void 0),
            (s = i || ''),
            (T.readyState = t > 0 ? 4 : 0),
            (o = (t >= 200 && 300 > t) || 304 === t),
            r && (x = Y(f, T, r)),
            (x = J(f, x, T, o)),
            o
              ? (f.ifModified &&
                  ((w = T.getResponseHeader('Last-Modified')),
                  w && (pt.lastModified[a] = w),
                  (w = T.getResponseHeader('etag')),
                  w && (pt.etag[a] = w)),
                204 === t || 'HEAD' === f.type
                  ? (C = 'nocontent')
                  : 304 === t
                  ? (C = 'notmodified')
                  : ((C = x.state), (d = x.data), (y = x.error), (o = !y)))
              : ((y = C), (t || !C) && ((C = 'error'), 0 > t && (t = 0))),
            (T.status = t),
            (T.statusText = (n || C) + ''),
            o ? g.resolveWith(p, [d, C, T]) : g.rejectWith(p, [T, C, y]),
            T.statusCode(v),
            (v = void 0),
            l && h.trigger(o ? 'ajaxSuccess' : 'ajaxError', [T, f, o ? d : y]),
            m.fireWith(p, [T, C]),
            l &&
              (h.trigger('ajaxComplete', [T, f]),
              --pt.active || pt.event.trigger('ajaxStop')))
        }
        'object' == typeof t && ((n = t), (t = void 0)), (n = n || {})
        var i,
          o,
          a,
          s,
          u,
          l,
          c,
          d,
          f = pt.ajaxSetup({}, n),
          p = f.context || f,
          h = f.context && (p.nodeType || p.jquery) ? pt(p) : pt.event,
          g = pt.Deferred(),
          m = pt.Callbacks('once memory'),
          v = f.statusCode || {},
          y = {},
          x = {},
          b = 0,
          w = 'canceled',
          T = {
            readyState: 0,
            getResponseHeader: function(e) {
              var t
              if (2 === b) {
                if (!d)
                  for (d = {}; (t = Vn.exec(s)); ) d[t[1].toLowerCase()] = t[2]
                t = d[e.toLowerCase()]
              }
              return null == t ? null : t
            },
            getAllResponseHeaders: function() {
              return 2 === b ? s : null
            },
            setRequestHeader: function(e, t) {
              var n = e.toLowerCase()
              return b || ((e = x[n] = x[n] || e), (y[e] = t)), this
            },
            overrideMimeType: function(e) {
              return b || (f.mimeType = e), this
            },
            statusCode: function(e) {
              var t
              if (e)
                if (2 > b) for (t in e) v[t] = [v[t], e[t]]
                else T.always(e[T.status])
              return this
            },
            abort: function(e) {
              var t = e || w
              return c && c.abort(t), r(0, t), this
            }
          }
        if (
          ((g.promise(T).complete = m.add),
          (T.success = T.done),
          (T.error = T.fail),
          (f.url = ((t || f.url || tr) + '')
            .replace(Xn, '')
            .replace(Gn, nr[1] + '//')),
          (f.type = n.method || n.type || f.method || f.type),
          (f.dataTypes = pt
            .trim(f.dataType || '*')
            .toLowerCase()
            .match(Dt) || ['']),
          null == f.crossDomain &&
            ((i = Qn.exec(f.url.toLowerCase())),
            (f.crossDomain = !(
              !i ||
              (i[1] === nr[1] &&
                i[2] === nr[2] &&
                (i[3] || ('http:' === i[1] ? '80' : '443')) ===
                  (nr[3] || ('http:' === nr[1] ? '80' : '443')))
            ))),
          f.data &&
            f.processData &&
            'string' != typeof f.data &&
            (f.data = pt.param(f.data, f.traditional)),
          U(Kn, f, n, T),
          2 === b)
        )
          return T
        ;(l = pt.event && f.global),
          l && 0 === pt.active++ && pt.event.trigger('ajaxStart'),
          (f.type = f.type.toUpperCase()),
          (f.hasContent = !Jn.test(f.type)),
          (a = f.url),
          f.hasContent ||
            (f.data &&
              ((a = f.url += ($n.test(a) ? '&' : '?') + f.data), delete f.data),
            f.cache === !1 &&
              (f.url = Un.test(a)
                ? a.replace(Un, '$1_=' + In++)
                : a + ($n.test(a) ? '&' : '?') + '_=' + In++)),
          f.ifModified &&
            (pt.lastModified[a] &&
              T.setRequestHeader('If-Modified-Since', pt.lastModified[a]),
            pt.etag[a] && T.setRequestHeader('If-None-Match', pt.etag[a])),
          ((f.data && f.hasContent && f.contentType !== !1) || n.contentType) &&
            T.setRequestHeader('Content-Type', f.contentType),
          T.setRequestHeader(
            'Accept',
            f.dataTypes[0] && f.accepts[f.dataTypes[0]]
              ? f.accepts[f.dataTypes[0]] +
                  ('*' !== f.dataTypes[0] ? ', ' + er + '; q=0.01' : '')
              : f.accepts['*']
          )
        for (o in f.headers) T.setRequestHeader(o, f.headers[o])
        if (f.beforeSend && (f.beforeSend.call(p, T, f) === !1 || 2 === b))
          return T.abort()
        w = 'abort'
        for (o in { success: 1, error: 1, complete: 1 }) T[o](f[o])
        if ((c = U(Zn, f, n, T))) {
          if (((T.readyState = 1), l && h.trigger('ajaxSend', [T, f]), 2 === b))
            return T
          f.async &&
            f.timeout > 0 &&
            (u = e.setTimeout(function() {
              T.abort('timeout')
            }, f.timeout))
          try {
            ;(b = 1), c.send(y, r)
          } catch (C) {
            if (!(2 > b)) throw C
            r(-1, C)
          }
        } else r(-1, 'No Transport')
        return T
      },
      getJSON: function(e, t, n) {
        return pt.get(e, t, n, 'json')
      },
      getScript: function(e, t) {
        return pt.get(e, void 0, t, 'script')
      }
    }),
      pt.each(['get', 'post'], function(e, t) {
        pt[t] = function(e, n, r, i) {
          return (
            pt.isFunction(n) && ((i = i || r), (r = n), (n = void 0)),
            pt.ajax(
              pt.extend(
                { url: e, type: t, dataType: i, data: n, success: r },
                pt.isPlainObject(e) && e
              )
            )
          )
        }
      }),
      (pt._evalUrl = function(e) {
        return pt.ajax({
          url: e,
          type: 'GET',
          dataType: 'script',
          cache: !0,
          async: !1,
          global: !1,
          throws: !0
        })
      }),
      pt.fn.extend({
        wrapAll: function(e) {
          if (pt.isFunction(e))
            return this.each(function(t) {
              pt(this).wrapAll(e.call(this, t))
            })
          if (this[0]) {
            var t = pt(e, this[0].ownerDocument)
              .eq(0)
              .clone(!0)
            this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function() {
                  for (
                    var e = this;
                    e.firstChild && 1 === e.firstChild.nodeType;

                  )
                    e = e.firstChild
                  return e
                })
                .append(this)
          }
          return this
        },
        wrapInner: function(e) {
          return this.each(
            pt.isFunction(e)
              ? function(t) {
                  pt(this).wrapInner(e.call(this, t))
                }
              : function() {
                  var t = pt(this),
                    n = t.contents()
                  n.length ? n.wrapAll(e) : t.append(e)
                }
          )
        },
        wrap: function(e) {
          var t = pt.isFunction(e)
          return this.each(function(n) {
            pt(this).wrapAll(t ? e.call(this, n) : e)
          })
        },
        unwrap: function() {
          return this.parent()
            .each(function() {
              pt.nodeName(this, 'body') || pt(this).replaceWith(this.childNodes)
            })
            .end()
        }
      }),
      (pt.expr.filters.hidden = function(e) {
        return dt.reliableHiddenOffsets()
          ? e.offsetWidth <= 0 &&
              e.offsetHeight <= 0 &&
              !e.getClientRects().length
          : Q(e)
      }),
      (pt.expr.filters.visible = function(e) {
        return !pt.expr.filters.hidden(e)
      })
    var rr = /%20/g,
      ir = /\[\]$/,
      or = /\r?\n/g,
      ar = /^(?:submit|button|image|reset|file)$/i,
      sr = /^(?:input|select|textarea|keygen)/i
    ;(pt.param = function(e, t) {
      var n,
        r = [],
        i = function(e, t) {
          ;(t = pt.isFunction(t) ? t() : null == t ? '' : t),
            (r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(t))
        }
      if (
        (void 0 === t && (t = pt.ajaxSettings && pt.ajaxSettings.traditional),
        pt.isArray(e) || (e.jquery && !pt.isPlainObject(e)))
      )
        pt.each(e, function() {
          i(this.name, this.value)
        })
      else for (n in e) K(n, e[n], t, i)
      return r.join('&').replace(rr, '+')
    }),
      pt.fn.extend({
        serialize: function() {
          return pt.param(this.serializeArray())
        },
        serializeArray: function() {
          return this.map(function() {
            var e = pt.prop(this, 'elements')
            return e ? pt.makeArray(e) : this
          })
            .filter(function() {
              var e = this.type
              return (
                this.name &&
                !pt(this).is(':disabled') &&
                sr.test(this.nodeName) &&
                !ar.test(e) &&
                (this.checked || !Bt.test(e))
              )
            })
            .map(function(e, t) {
              var n = pt(this).val()
              return null == n
                ? null
                : pt.isArray(n)
                ? pt.map(n, function(e) {
                    return { name: t.name, value: e.replace(or, '\r\n') }
                  })
                : { name: t.name, value: n.replace(or, '\r\n') }
            })
            .get()
        }
      }),
      (pt.ajaxSettings.xhr =
        void 0 !== e.ActiveXObject
          ? function() {
              return this.isLocal
                ? et()
                : rt.documentMode > 8
                ? Z()
                : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                    Z()) ||
                  et()
            }
          : Z)
    var ur = 0,
      lr = {},
      cr = pt.ajaxSettings.xhr()
    e.attachEvent &&
      e.attachEvent('onunload', function() {
        for (var e in lr) lr[e](void 0, !0)
      }),
      (dt.cors = !!cr && 'withCredentials' in cr),
      (cr = dt.ajax = !!cr),
      cr &&
        pt.ajaxTransport(function(t) {
          if (!t.crossDomain || dt.cors) {
            var n
            return {
              send: function(r, i) {
                var o,
                  a = t.xhr(),
                  s = ++ur
                if (
                  (a.open(t.type, t.url, t.async, t.username, t.password),
                  t.xhrFields)
                )
                  for (o in t.xhrFields) a[o] = t.xhrFields[o]
                t.mimeType &&
                  a.overrideMimeType &&
                  a.overrideMimeType(t.mimeType),
                  t.crossDomain ||
                    r['X-Requested-With'] ||
                    (r['X-Requested-With'] = 'XMLHttpRequest')
                for (o in r) void 0 !== r[o] && a.setRequestHeader(o, r[o] + '')
                a.send((t.hasContent && t.data) || null),
                  (n = function(e, r) {
                    var o, u, l
                    if (n && (r || 4 === a.readyState))
                      if (
                        (delete lr[s],
                        (n = void 0),
                        (a.onreadystatechange = pt.noop),
                        r)
                      )
                        4 !== a.readyState && a.abort()
                      else {
                        ;(l = {}),
                          (o = a.status),
                          'string' == typeof a.responseText &&
                            (l.text = a.responseText)
                        try {
                          u = a.statusText
                        } catch (c) {
                          u = ''
                        }
                        o || !t.isLocal || t.crossDomain
                          ? 1223 === o && (o = 204)
                          : (o = l.text ? 200 : 404)
                      }
                    l && i(o, u, l, a.getAllResponseHeaders())
                  }),
                  t.async
                    ? 4 === a.readyState
                      ? e.setTimeout(n)
                      : (a.onreadystatechange = lr[s] = n)
                    : n()
              },
              abort: function() {
                n && n(void 0, !0)
              }
            }
          }
        }),
      pt.ajaxSetup({
        accepts: {
          script:
            'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          'text script': function(e) {
            return pt.globalEval(e), e
          }
        }
      }),
      pt.ajaxPrefilter('script', function(e) {
        void 0 === e.cache && (e.cache = !1),
          e.crossDomain && ((e.type = 'GET'), (e.global = !1))
      }),
      pt.ajaxTransport('script', function(e) {
        if (e.crossDomain) {
          var t,
            n = rt.head || pt('head')[0] || rt.documentElement
          return {
            send: function(r, i) {
              ;(t = rt.createElement('script')),
                (t.async = !0),
                e.scriptCharset && (t.charset = e.scriptCharset),
                (t.src = e.url),
                (t.onload = t.onreadystatechange = function(e, n) {
                  ;(n ||
                    !t.readyState ||
                    /loaded|complete/.test(t.readyState)) &&
                    ((t.onload = t.onreadystatechange = null),
                    t.parentNode && t.parentNode.removeChild(t),
                    (t = null),
                    n || i(200, 'success'))
                }),
                n.insertBefore(t, n.firstChild)
            },
            abort: function() {
              t && t.onload(void 0, !0)
            }
          }
        }
      })
    var dr = [],
      fr = /(=)\?(?=&|$)|\?\?/
    pt.ajaxSetup({
      jsonp: 'callback',
      jsonpCallback: function() {
        var e = dr.pop() || pt.expando + '_' + In++
        return (this[e] = !0), e
      }
    }),
      pt.ajaxPrefilter('json jsonp', function(t, n, r) {
        var i,
          o,
          a,
          s =
            t.jsonp !== !1 &&
            (fr.test(t.url)
              ? 'url'
              : 'string' == typeof t.data &&
                0 ===
                  (t.contentType || '').indexOf(
                    'application/x-www-form-urlencoded'
                  ) &&
                fr.test(t.data) &&
                'data')
        return s || 'jsonp' === t.dataTypes[0]
          ? ((i = t.jsonpCallback = pt.isFunction(t.jsonpCallback)
              ? t.jsonpCallback()
              : t.jsonpCallback),
            s
              ? (t[s] = t[s].replace(fr, '$1' + i))
              : t.jsonp !== !1 &&
                (t.url += ($n.test(t.url) ? '&' : '?') + t.jsonp + '=' + i),
            (t.converters['script json'] = function() {
              return a || pt.error(i + ' was not called'), a[0]
            }),
            (t.dataTypes[0] = 'json'),
            (o = e[i]),
            (e[i] = function() {
              a = arguments
            }),
            r.always(function() {
              void 0 === o ? pt(e).removeProp(i) : (e[i] = o),
                t[i] && ((t.jsonpCallback = n.jsonpCallback), dr.push(i)),
                a && pt.isFunction(o) && o(a[0]),
                (a = o = void 0)
            }),
            'script')
          : void 0
      }),
      (pt.parseHTML = function(e, t, n) {
        if (!e || 'string' != typeof e) return null
        'boolean' == typeof t && ((n = t), (t = !1)), (t = t || rt)
        var r = Tt.exec(e),
          i = !n && []
        return r
          ? [t.createElement(r[1])]
          : ((r = v([e], t, i)),
            i && i.length && pt(i).remove(),
            pt.merge([], r.childNodes))
      })
    var pr = pt.fn.load
    ;(pt.fn.load = function(e, t, n) {
      if ('string' != typeof e && pr) return pr.apply(this, arguments)
      var r,
        i,
        o,
        a = this,
        s = e.indexOf(' ')
      return (
        s > -1 && ((r = pt.trim(e.slice(s, e.length))), (e = e.slice(0, s))),
        pt.isFunction(t)
          ? ((n = t), (t = void 0))
          : t && 'object' == typeof t && (i = 'POST'),
        a.length > 0 &&
          pt
            .ajax({ url: e, type: i || 'GET', dataType: 'html', data: t })
            .done(function(e) {
              ;(o = arguments),
                a.html(
                  r
                    ? pt('<div>')
                        .append(pt.parseHTML(e))
                        .find(r)
                    : e
                )
            })
            .always(
              n &&
                function(e, t) {
                  a.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                  })
                }
            ),
        this
      )
    }),
      pt.each(
        [
          'ajaxStart',
          'ajaxStop',
          'ajaxComplete',
          'ajaxError',
          'ajaxSuccess',
          'ajaxSend'
        ],
        function(e, t) {
          pt.fn[t] = function(e) {
            return this.on(t, e)
          }
        }
      ),
      (pt.expr.filters.animated = function(e) {
        return pt.grep(pt.timers, function(t) {
          return e === t.elem
        }).length
      }),
      (pt.offset = {
        setOffset: function(e, t, n) {
          var r,
            i,
            o,
            a,
            s,
            u,
            l,
            c = pt.css(e, 'position'),
            d = pt(e),
            f = {}
          'static' === c && (e.style.position = 'relative'),
            (s = d.offset()),
            (o = pt.css(e, 'top')),
            (u = pt.css(e, 'left')),
            (l =
              ('absolute' === c || 'fixed' === c) &&
              pt.inArray('auto', [o, u]) > -1),
            l
              ? ((r = d.position()), (a = r.top), (i = r.left))
              : ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
            pt.isFunction(t) && (t = t.call(e, n, pt.extend({}, s))),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            'using' in t ? t.using.call(e, f) : d.css(f)
        }
      }),
      pt.fn.extend({
        offset: function(e) {
          if (arguments.length)
            return void 0 === e
              ? this
              : this.each(function(t) {
                  pt.offset.setOffset(this, e, t)
                })
          var t,
            n,
            r = { top: 0, left: 0 },
            i = this[0],
            o = i && i.ownerDocument
          if (o)
            return (
              (t = o.documentElement),
              pt.contains(t, i)
                ? ('undefined' != typeof i.getBoundingClientRect &&
                    (r = i.getBoundingClientRect()),
                  (n = tt(o)),
                  {
                    top:
                      r.top +
                      (n.pageYOffset || t.scrollTop) -
                      (t.clientTop || 0),
                    left:
                      r.left +
                      (n.pageXOffset || t.scrollLeft) -
                      (t.clientLeft || 0)
                  })
                : r
            )
        },
        position: function() {
          if (this[0]) {
            var e,
              t,
              n = { top: 0, left: 0 },
              r = this[0]
            return (
              'fixed' === pt.css(r, 'position')
                ? (t = r.getBoundingClientRect())
                : ((e = this.offsetParent()),
                  (t = this.offset()),
                  pt.nodeName(e[0], 'html') || (n = e.offset()),
                  (n.top += pt.css(e[0], 'borderTopWidth', !0)),
                  (n.left += pt.css(e[0], 'borderLeftWidth', !0))),
              {
                top: t.top - n.top - pt.css(r, 'marginTop', !0),
                left: t.left - n.left - pt.css(r, 'marginLeft', !0)
              }
            )
          }
        },
        offsetParent: function() {
          return this.map(function() {
            for (
              var e = this.offsetParent;
              e &&
              !pt.nodeName(e, 'html') &&
              'static' === pt.css(e, 'position');

            )
              e = e.offsetParent
            return e || hn
          })
        }
      }),
      pt.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(
        e,
        t
      ) {
        var n = /Y/.test(t)
        pt.fn[e] = function(r) {
          return Pt(
            this,
            function(e, r, i) {
              var o = tt(e)
              return void 0 === i
                ? o
                  ? t in o
                    ? o[t]
                    : o.document.documentElement[r]
                  : e[r]
                : void (o
                    ? o.scrollTo(
                        n ? pt(o).scrollLeft() : i,
                        n ? i : pt(o).scrollTop()
                      )
                    : (e[r] = i))
            },
            e,
            r,
            arguments.length,
            null
          )
        }
      }),
      pt.each(['top', 'left'], function(e, t) {
        pt.cssHooks[t] = L(dt.pixelPosition, function(e, n) {
          return n
            ? ((n = mn(e, t)), fn.test(n) ? pt(e).position()[t] + 'px' : n)
            : void 0
        })
      }),
      pt.each({ Height: 'height', Width: 'width' }, function(e, t) {
        pt.each({ padding: 'inner' + e, content: t, '': 'outer' + e }, function(
          n,
          r
        ) {
          pt.fn[r] = function(r, i) {
            var o = arguments.length && (n || 'boolean' != typeof r),
              a = n || (r === !0 || i === !0 ? 'margin' : 'border')
            return Pt(
              this,
              function(t, n, r) {
                var i
                return pt.isWindow(t)
                  ? t.document.documentElement['client' + e]
                  : 9 === t.nodeType
                  ? ((i = t.documentElement),
                    Math.max(
                      t.body['scroll' + e],
                      i['scroll' + e],
                      t.body['offset' + e],
                      i['offset' + e],
                      i['client' + e]
                    ))
                  : void 0 === r
                  ? pt.css(t, n, a)
                  : pt.style(t, n, r, a)
              },
              t,
              o ? r : void 0,
              o,
              null
            )
          }
        })
      }),
      pt.fn.extend({
        bind: function(e, t, n) {
          return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
          return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
          return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
          return 1 === arguments.length
            ? this.off(e, '**')
            : this.off(t, e || '**', n)
        }
      }),
      (pt.fn.size = function() {
        return this.length
      }),
      (pt.fn.andSelf = pt.fn.addBack),
      'function' == typeof define &&
        define.amd &&
        define('jquery', [], function() {
          return pt
        })
    var hr = e.jQuery,
      gr = e.$
    pt.noConflict = function(t) {
      return (
        e.$ === pt && (e.$ = gr), t && e.jQuery === pt && (e.jQuery = hr), pt
      )
    }
    var mr = (function() {
      var e = /(webkit)[ \/]([\w.]+)/,
        t = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        n = /(msie) ([\w.]+)/,
        r = /(mozilla)(?:.*? rv:([\w.]+))?/,
        i = function(i) {
          i = i.toLowerCase()
          var o =
            e.exec(i) ||
            t.exec(i) ||
            n.exec(i) ||
            (i.indexOf('compatible') < 0 && r.exec(i)) ||
            []
          return { browser: o[1] || '', version: o[2] || '0' }
        }
      return i(navigator.userAgent)
    })()
    return (
      mr.browser &&
        ((pt.browser[mr.browser] = !0), (pt.browser.version = mr.version)),
      t || (e.jQuery = e.$ = pt),
      pt
    )
  })
})
define('base:widget/libs/jquerypacket.js', function(r, e, t) {
  var n = r('base:widget/libs/jquery-1.12.4.js')
  n.extend({
    stringify: function(r) {
      var e = typeof r
      if ('object' != e || null === r)
        return 'string' == e && (r = '"' + r + '"'), String(r)
      if ('object' == typeof JSON && JSON.stringify) return JSON.stringify(r)
      var t,
        i,
        o = [],
        s = r && r.constructor == Array
      for (t in r)
        (i = r[t]),
          (e = typeof i),
          r.hasOwnProperty(t) &&
            void 0 !== i &&
            ('string' == e
              ? (i = '"' + i + '"')
              : 'object' == e && null !== i && (i = n.stringify(i)),
            o.push((s ? '' : '"' + t + '":') + String(i)))
      return (s ? '[' : '{') + String(o) + (s ? ']' : '}')
    },
    parseJSON: function(r) {
      var e = /^[\],:{}\s]*$/,
        t = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        i = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        o = /(?:^|:|,)(?:\s*\[)+/g
      return 'object' == typeof r
        ? r
        : 'string' == typeof r && r
        ? ((r = n.trim(r)),
          e.test(
            r
              .replace(t, '@')
              .replace(i, ']')
              .replace(o, '')
          )
            ? window.JSON && window.JSON.parse
              ? window.JSON.parse(r)
              : new Function('return ' + r)()
            : void n.error('Invalid JSON: ' + r))
        : null
    }
  }),
    (t.exports = n)
})
define('base:widget/tools/service/tools.util.js', function(t, e, o) {
  ;(o.exports.inherits =
    'function' == typeof Object.create
      ? function(t, e) {
          ;(t.super_ = e),
            (t.prototype = Object.create(e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            }))
        }
      : function(t, e) {
          t.super_ = e
          var o = function() {}
          ;(o.prototype = e.prototype),
            (t.prototype = new o()),
            (t.prototype.constructor = t)
        }),
    (o.exports.assign =
      Object.assign ||
      function(t) {
        'use strict'
        if (null == t)
          throw new TypeError('Cannot convert undefined or null to object')
        for (var e = Object(t), o = 1; o < arguments.length; o++) {
          var r = arguments[o]
          if (null != r)
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
      })
})
define('base:widget/tools/service/tools.event.js', function(e, t, n) {
  function s() {
    ;(this._events = this._events || {}),
      (this._maxListeners = this._maxListeners || void 0)
  }
  function r(e) {
    return 'function' == typeof e
  }
  function i(e) {
    return 'number' == typeof e
  }
  function o(e) {
    return 'object' == typeof e && null !== e
  }
  function h(e) {
    return void 0 === e
  }
  ;(n.exports.mouseWheel = function(e, t, n) {
    var s = function(e) {
      var e = e || window.event || arguments[0],
        s = 0
      e.wheelDelta ? (s = -e.wheelDelta / 120) : e.detail && (s = e.detail / 3),
        s &&
          ('string' == typeof n || n instanceof String
            ? t(s > 0 ? !0 : !1)
            : ('number' == typeof n || n instanceof Number) && t(s * n)),
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1)
    }
    'undefined' != typeof window.attachEvent
      ? e.attachEvent('onmousewheel', s)
      : 'onmousewheel' in window
      ? (e.onmousewheel = s)
      : 'undefined' != typeof window.addEventListener &&
        e.addEventListener('DOMMouseScroll', s, !1)
  }),
    (s.EventEmitter = s),
    (s.prototype._events = void 0),
    (s.prototype._maxListeners = void 0),
    (s.defaultMaxListeners = 10),
    (s.prototype.setMaxListeners = function(e) {
      if (!i(e) || 0 > e || isNaN(e))
        throw TypeError('n must be a positive number')
      return (this._maxListeners = e), this
    }),
    (s.prototype.emit = function(e) {
      var t, n, s, i, l, v
      if (
        (this._events || (this._events = {}),
        'error' === e &&
          (!this._events.error ||
            (o(this._events.error) && !this._events.error.length)))
      ) {
        if (((t = arguments[1]), t instanceof Error)) throw t
        var u = new Error('Uncaught, unspecified "error" event. (' + t + ')')
        throw ((u.context = t), u)
      }
      if (((n = this._events[e]), h(n))) return !1
      if (r(n))
        switch (arguments.length) {
          case 1:
            n.call(this)
            break
          case 2:
            n.call(this, arguments[1])
            break
          case 3:
            n.call(this, arguments[1], arguments[2])
            break
          default:
            ;(i = Array.prototype.slice.call(arguments, 1)), n.apply(this, i)
        }
      else if (o(n))
        for (
          i = Array.prototype.slice.call(arguments, 1),
            v = n.slice(),
            s = v.length,
            l = 0;
          s > l;
          l++
        )
          v[l].apply(this, i)
      return !0
    }),
    (s.prototype.addListener = function(e, t) {
      var n
      if (!r(t)) throw TypeError('listener must be a function')
      return (
        this._events || (this._events = {}),
        this._events.newListener &&
          this.emit('newListener', e, r(t.listener) ? t.listener : t),
        this._events[e]
          ? o(this._events[e])
            ? this._events[e].push(t)
            : (this._events[e] = [this._events[e], t])
          : (this._events[e] = t),
        o(this._events[e]) &&
          !this._events[e].warned &&
          ((n = h(this._maxListeners)
            ? s.defaultMaxListeners
            : this._maxListeners),
          n &&
            n > 0 &&
            this._events[e].length > n &&
            ((this._events[e].warned = !0),
            console.error(
              '(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
              this._events[e].length
            ),
            'function' == typeof console.trace && console.trace())),
        this
      )
    }),
    (s.prototype.on = s.prototype.addListener),
    (s.prototype.once = function(e, t) {
      function n() {
        this.removeListener(e, n), s || ((s = !0), t.apply(this, arguments))
      }
      if (!r(t)) throw TypeError('listener must be a function')
      var s = !1
      return (n.listener = t), this.on(e, n), this
    }),
    (s.prototype.removeListener = function(e, t) {
      var n, s, i, h
      if (!r(t)) throw TypeError('listener must be a function')
      if (!this._events || !this._events[e]) return this
      if (
        ((n = this._events[e]),
        (i = n.length),
        (s = -1),
        n === t || (r(n.listener) && n.listener === t))
      )
        delete this._events[e],
          this._events.removeListener && this.emit('removeListener', e, t)
      else if (o(n)) {
        for (h = i; h-- > 0; )
          if (n[h] === t || (n[h].listener && n[h].listener === t)) {
            s = h
            break
          }
        if (0 > s) return this
        1 === n.length
          ? ((n.length = 0), delete this._events[e])
          : n.splice(s, 1),
          this._events.removeListener && this.emit('removeListener', e, t)
      }
      return this
    }),
    (s.prototype.removeAllListeners = function(e) {
      var t, n
      if (!this._events) return this
      if (!this._events.removeListener)
        return (
          0 === arguments.length
            ? (this._events = {})
            : this._events[e] && delete this._events[e],
          this
        )
      if (0 === arguments.length) {
        for (t in this._events)
          'removeListener' !== t && this.removeAllListeners(t)
        return (
          this.removeAllListeners('removeListener'), (this._events = {}), this
        )
      }
      if (((n = this._events[e]), r(n))) this.removeListener(e, n)
      else if (n) for (; n.length; ) this.removeListener(e, n[n.length - 1])
      return delete this._events[e], this
    }),
    (s.prototype.listeners = function(e) {
      return this._events && this._events[e]
        ? r(this._events[e])
          ? [this._events[e]]
          : this._events[e].slice()
        : []
    }),
    (s.prototype.listenerCount = function(e) {
      if (this._events) {
        var t = this._events[e]
        if (r(t)) return 1
        if (t) return t.length
      }
      return 0
    }),
    (s.listenerCount = function(e, t) {
      return e.listenerCount(t)
    }),
    (n.exports.EventEmitter = s)
})
define('base:widget/clipboard/myClipboard.js', function(t, e, i) {
  function n(t) {
    ;(this.clipboard = null),
      (this.element = n.getElement(t)),
      (this.event = {}),
      s.EventEmitter.call(this)
  }
  function r(t) {
    t &&
      ((this.type = r.initClipboardBean.type),
      (this.clipboardIns = r.initClipboardBean(t)))
  }
  var o = t('base:widget/libs/jquerypacket.js'),
    c = t('base:widget/clipboard/clipboard.js'),
    a = t('base:widget/tools/service/tools.util.js'),
    s = t('base:widget/tools/service/tools.event.js'),
    l = null
  ;(n.getElement = function(t) {
    return o(t).get(0)
  }),
    a.inherits(n, s.EventEmitter),
    (n.prototype.getClipboardHandler = function() {
      return this
    }),
    (n.prototype.setText = function(t) {
      return this.clipboard.setText(t), this.clipboard
    }),
    (n.create = function(t) {
      var e = function(t) {
        n.call(this, t)
      }
      ;(e.prototype = new n()), (e.prototype.constructor = e)
      for (var i in t) t.hasOwnProperty(i) && (e.prototype[i] = t[i])
      return e
    })
  var d = n.create({
      getClipboardHandler: function() {
        if (this.clipboard) return this.clipboard
        var t = this,
          e = this.element,
          i = new l.Client()
        return (
          i.glue(e, e),
          i.setHandCursor(!0),
          i.addEventListener('complete', function(e) {
            t.emit('success', e)
          }),
          i.addEventListener('error', function(e) {
            t.emit('error', e)
          }),
          (this.clipboard = i),
          this
        )
      }
    }),
    p = n.create({
      setText: function(t) {
        var e = this
        return (
          (this.clipboard = new l(e.element, {
            text: function() {
              return t
            }
          })),
          this.clipboard.on('success', function(t) {
            e.emit('success', t.text), t.clearSelection()
          }),
          this.clipboard.on('error', function(t) {
            e.emit('error', t)
          }),
          this.clipboard
        )
      }
    })
  p.check = function() {
    return !(
      !window.getSelection ||
      !(
        (document.queryCommandSupported &&
          document.queryCommandSupported('copy')) ||
        (document.execCommand && document.execCommand('copy'))
      )
    )
  }
  var u = n.create({
    getClipboardHandler: function() {
      return (this.clipboard = window.clipboardData), this
    },
    setText: function(t) {
      var e = this
      return (
        window.attachEvent
          ? e.element.attachEvent('onclick', function() {
              try {
                e.clipboard.clearData(), e.clipboard.setData('Text', t)
              } catch (i) {
                return void e.emit('error', i)
              }
              e.emit('success', t)
            })
          : e.element.addEventListener(
              'click',
              function() {
                try {
                  e.clipboard.clearData(), e.clipboard.setData('Text', t)
                } catch (i) {
                  return void e.emit('error', i)
                }
                e.emit('success', t)
              },
              !1
            ),
        this.clipboard
      )
    }
  })
  ;(u.check = function() {
    return !!window.clipboardData
  }),
    (r.TYPE_HTML5 = 0),
    (r.TYPE_FLASH = 1),
    (r.TYPE_NATIVE = 2),
    (r.prototype = {
      constructor: r,
      setText: function(t) {
        return this.clipboardIns.getClipboardHandler().setText(t)
      },
      on: function(t, e) {
        this.clipboardIns.on(t, e)
      },
      emit: function() {
        this.clipboardIns.emit.apply(this.clipboardIns, arguments)
      }
    }),
    p.check()
      ? ((l = c.getHTML5Clipboard()),
        (r.initClipboardBean = function(t) {
          return new p(t)
        }),
        (r.initClipboardBean.type = r.TYPE_HTML5))
      : u.check()
      ? ((r.initClipboardBean = function(t) {
          return new u(t)
        }),
        (r.initClipboardBean.type = r.TYPE_NATIVE))
      : ((l = c.getZeroClipboard()),
        (r.initClipboardBean = function(t) {
          return new d(t)
        }),
        (r.initClipboardBean.type = r.TYPE_FLASH)),
    (i.exports = r)
})
define('base:widget/crossDomainUtil/crossDomainInner.js', function(e, t, n) {
  var s = {
    postMessage: function(e) {
      if (
        ('object' == typeof e && (e = this.stringify(e)), 'string' != typeof e)
      )
        return void this.dispatchEvent('Error', ['发送的信息格式出现问题'])
      var t = window.parent
      this.sendMessage(e, t), this.dispatchEvent('PostMessage', [e, t])
    },
    setEventDelegate: function(e) {
      this._eventDelegate = e
    },
    DEBUG: !1,
    _eventDelegate: this,
    stringify: function(e) {
      var t = typeof e,
        n = arguments.callee
      if ('object' != t || null === e)
        return 'string' == t && (e = '"' + e + '"'), String(e)
      if ('object' == typeof JSON && JSON.stringify) return JSON.stringify(e)
      var s,
        i,
        o = [],
        a = e && e.constructor == Array
      for (s in e)
        (i = e[s]),
          (t = typeof i),
          e.hasOwnProperty(s) &&
            ('string' == t
              ? (i = '"' + i + '"')
              : 'object' == t && null !== i && (i = n(i)),
            o.push((a ? '' : '"' + s + '":') + String(i)))
      return (a ? '[' : '{') + String(o) + (a ? ']' : '}')
    },
    parseJSON: function(e) {
      var t = /^[\],:{}\s]*$/,
        n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        s = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        i = /(?:^|:|,)(?:\s*\[)+/g
      return 'object' == typeof e
        ? e
        : 'string' == typeof e && e
        ? ((e = e.replace(/(^\s+)|(\s+$)/g, '')),
          t.test(
            e
              .replace(n, '@')
              .replace(s, ']')
              .replace(i, '')
          )
            ? window.JSON && window.JSON.parse
              ? window.JSON.parse(e)
              : new Function('return ' + e)()
            : e)
        : null
    },
    dispatchEvent: function(e, t) {
      var n = this
      return (
        this._eventDelegate && (n = this._eventDelegate),
        'function' == typeof n['on' + e]
          ? (n.DEBUG &&
              console.log(
                '[LOG] call the delegate function `on' +
                  e +
                  '` of the crossDomainInner obj:',
                n,
                ' successful'
              ),
            '[object Array]' === Object.prototype.toString.call(t)
              ? n['on' + e].apply(n, t)
              : n['on' + e].apply(n),
            n)
          : (n.DEBUG &&
              console.log(
                '[WARN] the delegate function `on' +
                  e +
                  '` of the crossDomainInner is not a function'
              ),
            !1)
      )
    },
    _supportPostMessage: function() {
      if (window.postMessage)
        try {
          if (window.postMessage.toString().indexOf('[native code]') >= 0)
            return !0
          this.dispatchEvent('Warn', [
            '浏览器原生的postMessage方法似乎已被覆盖，跨域模块可能工作不正常'
          ])
        } catch (e) {
          return !0
        }
      return !1
    }.call(this),
    bind: function(e, t, n) {
      e &&
        'function' == typeof n &&
        (e.addEventListener
          ? e.addEventListener(t, n, !1)
          : e.attachEvent && e.attachEvent('on' + t, n))
    },
    sendMessage: function(e, t) {
      this._supportPostMessage ? t.postMessage(e, '*') : (t.name = e)
    },
    init: function() {
      var e = this
      this._eventDelegate = this
      var t = function(t) {
        'event' === t.type
          ? e.dispatchEvent(t.eventName, [t.param])
          : e.dispatchEvent('Message', [t])
      }
      this._supportPostMessage
        ? this.bind(window, 'message', function(n) {
            if (n.data) {
              var s = e.parseJSON(n.data)
              t(s)
            }
          })
        : ((window.name = ''),
          (e.windowName = window.name),
          setInterval(function() {
            if (window.name != e.windowName && '' !== window.name) {
              e.windowName = window.name
              var n = e.parseJSON(e.windowName)
              t(n),
                setTimeout(function() {
                  ;(window.name = ''), (e.windowName = '')
                }, 20)
            }
          }, 100))
    }
  }
  s.init(), (n.exports = s)
})
define('base:widget/crossDomainUtil/crossPanel.js', function(e, t, i) {
  var n =
      'undefined' != typeof console
        ? console
        : { log: function() {}, warn: function() {} },
    s = {
      postMessage: function(e, t) {
        return (
          'object' == typeof e && (e = this.stringify(e)),
          'string' == typeof e && t
            ? (this.sendMessage(e, t),
              void this.dispatchEvent('PostMessage', [e, t]))
            : (this.dispatchEvent('Error', ['发送的信息格式出现问题']),
              void (
                this.DEBUG &&
                n.log(
                  '[WARN] the message is not a string type or the target window is not exist.'
                )
              ))
        )
      },
      setEventDelegate: function(e) {
        this._eventDelegate = e
      },
      DEBUG: !1,
      _eventDelegate: this,
      stringify: function(e) {
        var t = typeof e,
          i = this.stringify
        if ('object' != t || null === e)
          return 'string' == t && (e = '"' + e + '"'), String(e)
        if ('object' == typeof JSON && JSON.stringify) return JSON.stringify(e)
        var n,
          s,
          o = [],
          a = e && e.constructor == Array
        for (n in e)
          (s = e[n]),
            (t = typeof s),
            e.hasOwnProperty(n) &&
              ('string' == t
                ? (s = '"' + s + '"')
                : 'object' == t && null !== s && (s = i(s)),
              o.push((a ? '' : '"' + n + '":') + String(s)))
        return (a ? '[' : '{') + String(o) + (a ? ']' : '}')
      },
      parseJSON: function(e) {
        var t = /^[\],:{}\s]*$/,
          i = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
          n = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          s = /(?:^|:|,)(?:\s*\[)+/g
        return 'object' == typeof e
          ? e
          : 'string' == typeof e && e
          ? ((e = e.replace(/(^\s+)|(\s+$)/g, '')),
            t.test(
              e
                .replace(i, '@')
                .replace(n, ']')
                .replace(s, '')
            )
              ? window.JSON && window.JSON.parse
                ? window.JSON.parse(e)
                : new Function('return ' + e)()
              : e)
          : null
      },
      dispatchEvent: function(e, t) {
        var i = this
        return (
          this._eventDelegate && (i = this._eventDelegate),
          'function' == typeof i['on' + e]
            ? (i.DEBUG &&
                n.log(
                  '[LOG] call the delegate function `on' + e + '` of the obj:',
                  i,
                  ' successful'
                ),
              '[object Array]' === Object.prototype.toString.call(t) ||
              ('object' == typeof t && t.length)
                ? i['on' + e].apply(i, t)
                : i['on' + e].apply(i),
              i)
            : (i.DEBUG &&
                n.log(
                  '[WARN] the delegate function `on' +
                    e +
                    '` of the crossDomainOuter is not a function'
                ),
              !1)
        )
      },
      _supportPostMessage: function() {
        if (window.postMessage)
          try {
            if (window.postMessage.toString().indexOf('[native code]') >= 0)
              return !0
            this.dispatchEvent('Warn', [
              '浏览器原生的postMessage方法似乎已被覆盖，跨域模块可能工作不正常'
            ])
          } catch (e) {
            return !0
          }
        return !1
      }.call(this),
      bind: function(e, t, i) {
        e &&
          'function' == typeof i &&
          (e.addEventListener
            ? e.addEventListener(t, i, !1)
            : e.attachEvent && e.attachEvent('on' + t, i))
      },
      sendMessage: function(e, t) {
        this.DEBUG &&
          n.log(
            '[LOG] will send message to innerWindow:',
            t,
            ', message is:',
            e
          ),
          this._supportPostMessage ? t.postMessage(e, '*') : (t.name = e)
      },
      init: function() {
        var e = this
        this._eventDelegate = this
        var t = function(t) {
          'event' === t.type
            ? e.dispatchEvent(t.eventName, [t.param])
            : e.dispatchEvent('Message', [t])
        }
        this._supportPostMessage
          ? this.bind(window, 'message', function(i) {
              if (i.data) {
                var n = e.parseJSON(i.data)
                t(n)
              }
            })
          : ((window.name = ''),
            (e.windowName = window.name),
            setInterval(function() {
              if (window.name != e.windowName && '' !== window.name) {
                e.windowName = window.name
                var i = e.parseJSON(e.windowName)
                t(i),
                  setTimeout(function() {
                    ;(window.name = ''), (e.windowName = '')
                  }, 20)
              }
            }, 100))
      }
    }
  s.init()
  var o = {
    DEBUG: !1,
    remoteUrl: '',
    visible: !1,
    bdCode: 'DS9F2A3E5H',
    params: null,
    setParams: function(e) {
      e && (this.params = e)
    },
    setRemoteUrl: function(e) {
      this.remoteUrl = e
    },
    show: function() {
      return this.remoteUrl
        ? void this.setVisible(!0)
        : void s.dispatchEvent('Error', ['remoteUlr is empty!'])
    },
    reopen: function() {
      this.setVisible(!0, !0)
    },
    hide: function() {
      this.setVisible()
    },
    setVisible: function(e, t) {
      if (e) {
        if (this.frame)
          t !== !0 &&
            this.postMessage({
              type: 'event',
              eventName: 'VisibilityChange',
              param: { visible: !0, isFirst: !1, outerParams: o.params }
            }),
            this.rePosition(),
            (this.frame.style.display = 'block')
        else {
          var i = this,
            n = this.bdCode
          ;(this.onReady = function() {
            this.onReadyStateChange(),
              (this.frame.style.visibility = 'visible'),
              i.postMessage({
                type: 'event',
                eventName: 'VisibilityChange',
                param: {
                  visible: !0,
                  isFirst: !0,
                  bdCode: n,
                  siteHref: location.href,
                  outerParams: o.params
                }
              })
          }),
            this._initElement()
        }
        ;(this.visible = !0), s.dispatchEvent('Show')
      } else
        (this.frame.style.display = 'none'),
          this.postMessage({
            type: 'event',
            eventName: 'VisibilityChange',
            param: { visible: !1, isFirst: !1 }
          }),
          (this.visible = !1),
          s.dispatchEvent('Hide')
    },
    setEventDelegate: function(e) {
      s.setEventDelegate(e), (this._eventDelegate = e)
      var t = this
      setTimeout(function() {
        t.catchEvent(t, [
          'onNeedResize',
          'onClose',
          'onCancel',
          'onSelected',
          'onSubmitAndClose'
        ])
      }, 1)
    },
    setPosition: function(e, t) {
      return 'center' === t || 'center' === e
        ? void this.rePosition()
        : (/MSIE\s?6\.0\;\s?Windows\s?NT\s?/i.test(navigator.userAgent) &&
            (t += this.getScrollTop()),
          (t = /^\d+(\.\d+)?$/.test(t) ? t + 'px' : t),
          (e = /^\d+(\.\d+)?$/.test(e) ? e + 'px' : e),
          (this.frame.style.top = t),
          void (this.frame.style.left = e))
    },
    postMessage: function(e) {
      var t =
        this.frame.contentWindow ||
        this.frame.getElementsByTagName('iframe')[0].contentWindow
      s.postMessage(e, t)
    },
    setInnerMsg: function(e) {
      var t =
        this.frame.contentWindow ||
        this.frame.getElementsByTagName('iframe')[0].contentWindow
      t[e.name] = e.value
    },
    _eventDelegate: this,
    getClientWidth: function(e) {
      var t = e || document,
        i = t.documentElement,
        n = t.body
      return window.ActiveXObject
        ? i.clientWidth || n.clientWidth
        : 'BackCompat' != t.compatMode
        ? i.clientWidth
        : n.clientWidth
    },
    getClientHeight: function(e) {
      var t = e || document,
        i = t.documentElement,
        n = t.body
      return window.ActiveXObject
        ? i.clientHeight || n.clientHeight
        : 'BackCompat' != t.compatMode
        ? i.clientHeight
        : n.clientHeight
    },
    getScrollWidth: function(e) {
      var t = e || document,
        i = t.documentElement,
        n = t.body
      return window.ActiveXObject && 'BackCompat' == t.compatMode
        ? n.scrollWidth
        : Math.min(i.scrollWidth, n.scrollWidth)
    },
    getScrollHeight: function(e) {
      var t = e || document,
        i = t.documentElement,
        n = t.body
      return window.ActiveXObject && 'BackCompat' == t.compatMode
        ? n.scrollHeight
        : Math.min(i.scrollHeight, n.scrollHeight)
    },
    getScrollLeft: function(e) {
      var t = e || document,
        i = t.documentElement,
        n = t.body,
        s = t.defaultView
      return s && 'pageXOffset' in s
        ? s.pageXOffset
        : i.scrollLeft || n.scrollLeft
    },
    getScrollTop: function(e) {
      var t = e || document,
        i = t.documentElement,
        n = t.body,
        s = t.defaultView
      return s && 'pageXOffset' in s
        ? s.pageYOffset
        : i.scrollTop || n.scrollTop
    },
    _initElement: function() {
      s.dispatchEvent('beforeRender')
      var e = document.createElement('div'),
        t = (this.getClientHeight() - 481) / 2,
        i = (this.getClientWidth() - 753) / 2,
        n = document.createElement('iframe')
      ;(n.id = 'yunfujianPanel'),
        /MSIE\s?6\.0\;\s?Windows\s?NT\s?/i.test(navigator.userAgent)
          ? (setTimeout(function() {
              n.src = o.remoteUrl
            }, 100),
            (t += this.getScrollTop()))
          : (n.src = o.remoteUrl),
        (n.frameBorder = '0'),
        (n.style.cssText = 'width:100%; height:100%;background:transparent'),
        (e.style.cssText =
          'visibility:hidden;width:753px; height:481px; position:fixed;background:transparent;_position:absolute; top:' +
          t +
          'px; left:' +
          i +
          'px;z-index:999999;'),
        e.appendChild(n),
        (this.frame = e),
        document.body.appendChild(this.frame),
        s.dispatchEvent('AfterRender')
    },
    catchEvent: function(e, t) {
      var i = this._eventDelegate
      if ('[object Array]' === Object.prototype.toString.call(t))
        for (var n = 0, s = t.length; s > n; n++)
          !(function(t) {
            i[t] = function() {
              e[t].apply(e, arguments)
            }
          })(t[n])
    },
    rePosition: function(e, t) {
      var i = parseInt(this.frame.style.width),
        n = parseInt(this.frame.style.height)
      ;(e = 'center' !== e && e ? e : (this.getClientWidth() - i) / 2),
        (t = 'center' !== t && t ? t : (this.getClientHeight() - n) / 2),
        this.setPosition(e, t)
    },
    initEverything: function() {
      var e,
        t = this
      s.setEventDelegate(this),
        s.bind(window, 'resize', function() {
          t.visible &&
            (clearTimeout(e),
            (e = setTimeout(function() {
              t.rePosition()
            }, 100)))
        })
    },
    onNeedResize: function(e) {
      ;(e.width = /^\d+(\.\d+)?$/.test(e.width) ? e.width + 'px' : e.width),
        (e.height = /^\d+(\.\d+)?$/.test(e.height)
          ? e.height + 'px'
          : e.height),
        (this.frame.style.width = e.width),
        (this.frame.style.height = e.height),
        this.rePosition(),
        s.dispatchEvent('PanelResize', [e])
    },
    onSubmitAndClose: function() {
      this.hide(), s.dispatchEvent('Submit', arguments)
    },
    onClose: function() {
      this.hide(), s.dispatchEvent('PanelClose')
    },
    onCancel: function() {
      this.hide(), s.dispatchEvent('PanelCancel')
    },
    onSelected: function(e) {
      this.hide(), s.dispatchEvent('PanelCancel', [e])
    },
    onReadyStateChange: function() {}
  }
  o.initEverything(), (i.exports = o)
})
define('base:widget/fileSelector/fileSelector.js', function(t, e, o) {
  'use strict'
  function n(t) {
    ;(this.remoteUrl = t.remoteUrl || '//pan.baidu.com/disk/file-selector'),
      (this.params = t.params || {}),
      this.init()
  }
  var i = t('base:widget/crossDomainUtil/crossPanel.js')
  ;(n.prototype.init = function() {
    var t = this
    i.setRemoteUrl(this.remoteUrl),
      (i.onSubmit = function(e) {
        t.onListenSubmit(e)
      }),
      (i.onPanelClose = function() {
        t.onListenClose()
      }),
      (i.onReadyStateChange = function() {
        t.onReadyStateChange()
      })
  }),
    (n.prototype.onListenSubmit = function() {}),
    (n.prototype.onListenClose = function() {}),
    (n.prototype.show = function() {
      i.show()
    }),
    (n.prototype.reopen = function() {
      i.reopen()
    }),
    (n.prototype.hide = function() {
      i.hide()
    }),
    (n.prototype.setInnerMsg = function(t) {
      i.setInnerMsg(t)
    }),
    (o.exports = n)
})
define('base:widget/hash/jquery.hash.js', function(e) {
  var n = e('base:widget/libs/jquerypacket.js')
  !(function(e) {
    e.hash ||
      (e.hash = function(n, t) {
        function o(e) {
          return (
            'string' == typeof e ||
            '[object String]' === Object.prototype.toString.call(e)
          )
        }
        if (o(n) && '' != n) {
          var a = new RegExp(
              '(&' + n + '=[^&]*)|(\\b' + n + '=[^&]*&)|(\\b' + n + '=[^&]*)',
              'ig'
            ),
            i = new RegExp('&*\\b' + n + '=[^&]*', 'i')
          if ('undefined' == typeof t) {
            var h = location.hash.match(i)
            return h ? decodeURIComponent(e.trim(h[0].split('=')[1])) : null
          }
          if (null === t) location.hash = location.hash.replace(a, '')
          else {
            t += ''
            var c = location.hash.replace(a, '')
            ;(c +=
              (-1 != c.indexOf('=') ? '&' : '') +
              n +
              '=' +
              encodeURIComponent(t)),
              (location.hash = c)
          }
        }
      })
  })(n)
})
define('base:widget/hash/hash.js', function(n, t, e) {
  n('base:widget/hash/jquery.hash.js')
  var o = n('base:widget/libs/jquerypacket.js'),
    i = {},
    a = {},
    h = function(n, t) {
      ;(i[n] = i[n] || []),
        (a[n] = c.get(n)),
        'function' == typeof t && i[n].push(t)
    },
    s = function(n, t) {
      var e
      for (e = 0; e < i[n].length; e++) i[n][e](t)
    },
    r = { path: 'dir/path', key: 's/key' }
  i.ALL = []
  var f = function() {
    var n, t
    for (n in a)
      a.hasOwnProperty(n) &&
        ((t = c.get(n)), t !== a[n] && ((a[n] = t), s(n, t)))
    s('ALL')
  }
  !(function() {
    var n = 100,
      t = window.location.hash,
      e = 'undefined' != typeof window.attachEvent,
      o = 'onhashchange' in window
    if (o) {
      var i = /MSIE (\d+)/gi
      i.test(navigator.userAgent) && RegExp.$1 < 9 && (o = !1)
    }
    e && !o
      ? window.setInterval(function() {
          var n = window.location.hash
          n !== t && (f(), (t = n))
        }, n)
      : (window.onhashchange = f)
  })()
  var c = {
    del: function(n) {
      var t = this.get(n)
      t && '' !== t && this.set(n, null)
    },
    get: function(n) {
      var t,
        e = r[n]
      if (((t = o.hash(e ? (o.hash(n) ? n : e) : n)), 'string' == typeof t))
        try {
          t = window.decodeURIComponent(t)
        } catch (i) {}
      return t
    },
    set: function(n, t) {
      'string' == typeof t && (t = window.encodeURIComponent(t)), o.hash(n, t)
    },
    listen: function(n, t) {
      var e = []
      'function' == typeof n && (e.push('ALL'), (t = n)),
        'string' == typeof n && (e = n.split(',')),
        e.forEach(function(n) {
          ;(n = n.trim()), h(n, t)
        })
    }
  }
  e.exports = c
})
define('base:widget/historyManager/historyStackEmulator.js', function(t, e, i) {
  function n() {
    o.call(this),
      (this._mIFrame = null),
      (this._mState = ''),
      (this._mTimer = null),
      (this.type = n.NO_CHECK),
      this._init()
  }
  var r = t('base:widget/tools/service/tools.util.js'),
    o = t('base:widget/tools/service/tools.event.js').EventEmitter
  r.inherits(n, o),
    (n.NO_CHECK = 0),
    (n.IFRAME = 1),
    (n.HTML5 = 2),
    (n.DISABLED = 3)
  var a = null
  ;(n.HISTORY_IFRAME_ID = 'historyIFrameEmulator'),
    (n.getInstance = function() {
      return a || (a = new n()), a
    }),
    (n.getSupportedType = function() {
      var t = 'undefined' != typeof window.attachEvent,
        e = 'onhashchange' in window
      if (e) {
        var i = /MSIE (\d+)/gi
        i.test(navigator.userAgent) && RegExp.$1 < 9 && (e = !1)
      }
      return t && !e
        ? n.IFRAME
        : 'onhashchange' in window
        ? n.HTML5
        : n.DISABLED
    }),
    (n.prototype._buildIFrame = function() {
      var t = document.getElementById(n.HISTORY_IFRAME_ID)
      return t ? ((this._mIFrame = t), !0) : !1
    }),
    (n.prototype._init = function() {
      function t() {
        i._dispatchIFrameLoaded(location.hash.slice(1) || '')
      }
      if (((this.type = n.getSupportedType()), this.type !== n.DISABLED)) {
        if (this.type === n.IFRAME) {
          var e = this._buildIFrame()
          e && (this._startTimer(), this._addState(''))
        }
        var i = this
        this.type === n.HTML5 &&
          (window.addEventListener
            ? window.addEventListener('hashchange', t, !1)
            : window.attachEvent && window.attachEvent('onhashchange', t))
      }
    }),
    (n.prototype._dispatchIFrameLoaded = function(t) {
      t != this._mState && ((this._mState = t), this.emit('historychanged', t))
    }),
    (n.prototype._startTimer = function() {
      if (!this._mTimer) {
        var t = this
        this._mTimer = setInterval(function() {
          if (t._mIFrame)
            try {
              var e = t._mIFrame.contentWindow.document.body.innerText.trim()
              t._dispatchIFrameLoaded(e)
            } catch (i) {}
        }, 50)
      }
    }),
    (n.prototype._stopTimer = function() {
      this._mTimer && (clearInterval(this._mTimer), (this._mTimer = null))
    }),
    (n.prototype._addState = function(t) {
      var e = null,
        i = '<html><body>' + t + '</body></html>'
      try {
        return (
          (e = this._mIFrame.contentWindow.document),
          e.open(),
          e.writeln(i),
          e.close(),
          !0
        )
      } catch (n) {
        return !1
      }
    }),
    (n.prototype.replaceHistoryState = function(t) {
      if (this.type !== n.IFRAME) return !1
      try {
        return (this._mIFrame.contentWindow.document.body.innerHTML = t), !0
      } catch (e) {
        return !1
      }
    }),
    (n.prototype.addHistoryState = function(t) {
      return this.type !== n.IFRAME ? !1 : this._addState(t)
    }),
    (i.exports = n)
})
define('base:widget/historyManager/historyManager.js', function(t, e, r) {
  function n() {
    s.call(this), (this._mEmulator = i.getInstance())
    var t = this
    this._mEmulator.on('historychanged', function(e) {
      if (e) {
        var r = n.parseHistory(e)
        if (r) {
          var i = r[0]
          t.emit(i, r[1])
        }
      } else t.emit('all', {}, !0)
    })
  }
  var i = t('base:widget/historyManager/historyStackEmulator.js'),
    o = t('base:widget/tools/service/tools.util.js'),
    s = t('base:widget/tools/service/tools.event.js').EventEmitter
  o.inherits(n, s)
  var a = null
  ;(n.getDefault = function() {
    return a || (a = new n()), a
  }),
    (n.PATTERN_HISTORY_STATE = /^([\w-]+)((\/(?:[\w-]+)=[^&]*(&(?:[\w-]+)=[^&]*)*)*)$/gi),
    (n.parseHistory = function(t) {
      if (
        ((n.PATTERN_HISTORY_STATE.lastIndex = 0),
        n.PATTERN_HISTORY_STATE.test(t))
      ) {
        var e = RegExp.$2.trim(),
          r = {}
        if (e.length > 0)
          for (
            var i = e.substring(1).split('&'), o = 0, s = i.length;
            s > o;
            o++
          ) {
            var a = i[o].split('=')
            r[a[0]] = decodeURIComponent(a[1])
          }
        return [RegExp.$1.trim(), r]
      }
      return null
    }),
    (n.getCurrentParams = function() {
      var t = n.getCurrentHash()
      return t && 2 === t.length ? t[1] : {}
    }),
    (n.getCurrentHash = function() {
      return n.parseHistory(location.hash.slice(1))
    }),
    (n.getCurrentModule = function() {
      var t = location.hash,
        e = t.indexOf('/')
      return e > -1 ? t.substring(1, e) : t.substring(1)
    }),
    (n.assignUrlHash = function(t, e) {
      if (0 != t.trim().length || e !== !0)
        try {
          location.hash = t
        } catch (r) {}
    }),
    (n.replaceUrlHash = function(t, e) {
      if (0 != t.trim().length || e !== !0)
        try {
          location.replace('#' + t)
        } catch (r) {
          debug && console.log('Exception On Assigning Url Hash = ', t)
        }
    }),
    (n.buildHistory = function(t, e) {
      var r = []
      for (var n in e)
        e.hasOwnProperty(n) &&
          void 0 != e[n] &&
          r.push(n + '=' + encodeURIComponent(e[n]))
      return t + (r.length > 0 ? '/' + r.join('&') : '')
    }),
    (n.interpretCurrentWindow = function(t) {
      var e = location.hash.slice(1)
      if (e) {
        var r = n.parseHistory(e)
        if (null != r)
          return t
            ? r
            : (n.getDefault()._mEmulator.emit('historychanged', e), !0)
      }
      return t ? null : !1
    }),
    (n.prototype.addListener = n.prototype.listen = function(t, e) {
      this.on(t, e), this.on('all', e)
    }),
    (n.prototype.removeListener = n.prototype.unlisten = function(t, e) {
      this.removeAllListeners(t), e && this.removeListener('all', e)
    }),
    (n.prototype.addHistory = function(t) {
      ;(t = t.trim()),
        t && (n.assignUrlHash(t), this._mEmulator.addHistoryState(t))
    }),
    (n.prototype.replaceHistory = function(t) {
      ;(t = t.trim()),
        t && (n.replaceUrlHash(t), this._mEmulator.replaceHistoryState(t))
    }),
    (n.prototype.navigate = function(t, e, r) {
      if ('undefined' == typeof t || null == t)
        throw new Error("Arguments 'module' required to navigate history")
      var i = n.buildHistory(t, e)
      return i == location.hash.slice(1)
        ? !1
        : (r === !0 ? this.replaceHistory(i) : this.addHistory(i), !0)
    }),
    (n.prototype.go = function(t) {
      history.go(t)
    }),
    (r.exports = n)
})
define('base:widget/storage/storage.js', function(e, t, a) {
  var o = function() {
    this.checkFeature()
  }
  ;(o.prototype = {
    storage: null,
    cache: {},
    featureSupport: {
      localStorageAccess: !0,
      localStorageCall: !0,
      indexedDBCall: !0
    },
    browserMode: { IE67: !1 },
    checkFeature: function() {
      var e = this
      if ('undefined' == typeof document || 'undefined' == typeof document.body)
        throw new Error('Storage Module Need Document Availability')
      try {
        window.localStorage
      } catch (t) {
        e.featureSupport.localStorageAccess = !1
      }
      try {
        window.localStorage.setItem('localStorageCall', 'true')
      } catch (t) {
        e.featureSupport.localStorageCall = !1
      }
      try {
        indexedDB.open('pan.baidu.com', 'v5')
      } catch (t) {
        e.featureSupport.indexedDBCall = !1
      }
      'undefined' != typeof window.attachEvent &&
        'object' != typeof window.localStorage &&
        (e.browserMode.IE67 = !0)
    },
    getUserData: function() {
      var e = '_simulateLocalStorage',
        t = 365,
        a = null,
        o = new Date()
      return (
        o.setDate(t + o.getDate()),
        (a = document.createElement('input')),
        (a.type = 'hidden'),
        a.addBehavior('#default#userData'),
        document.body.appendChild(a),
        (a.expires = o.toUTCString()),
        {
          setItem: function(t, o) {
            a.load(e), a.setAttribute(t, o), a.save(e)
          },
          getItem: function(t) {
            return a.load(e), a.getAttribute(t)
          },
          removeItem: function(t) {
            a.load(e), a.removeAttribute(t), a.save(e)
          },
          clear: function() {
            a.load(e)
            var t = new Date()
            t.setDate(t.getDate() - 1), (a.expires = t.toUTCString()), a.save(e)
          }
        }
      )
    },
    getOverwriteLocalStorage: function() {
      var e = this,
        t = (window.localStorage = window.sessionStorage = {
          setItem: function(t, a) {
            e.cache[t] = a
          },
          getItem: function(t) {
            return e.cache[t] || null
          },
          removeItem: function(t) {
            delete e.cache[t]
          },
          clear: function() {
            e.cache = {}
          },
          overwrite: !0,
          localStorageAccess: e.featureSupport.localStorageAccess,
          localStorageCall: e.featureSupport.localStorageCall,
          indexedDBCall: e.featureSupport.indexedDBCall
        })
      return t
    },
    getStorage: function() {
      var e = this
      return !e.featureSupport.localStorageAccess || e.browserMode.IE67
        ? e.getUserData()
        : e.featureSupport.localStorageCall
        ? window.localStorage
        : e.getOverwriteLocalStorage()
    }
  }),
    (a.exports = new o().getStorage())
})
define('base:widget/httpProxy/swfobject.js', function(e, t, n) {
  var a = (function() {
    function e() {
      if (!G) {
        try {
          var e = V.getElementsByTagName('body')[0].appendChild(m('span'))
          e.parentNode.removeChild(e)
        } catch (t) {
          return
        }
        G = !0
        for (var n = D.length, a = 0; n > a; a++) D[a]()
      }
    }
    function t(e) {
      G ? e() : (D[D.length] = e)
    }
    function n(e) {
      if (typeof M.addEventListener != k) M.addEventListener('load', e, !1)
      else if (typeof V.addEventListener != k) V.addEventListener('load', e, !1)
      else if (typeof M.attachEvent != k) g(M, 'onload', e)
      else if ('function' == typeof M.onload) {
        var t = M.onload
        M.onload = function() {
          t(), e()
        }
      } else M.onload = e
    }
    function i() {
      R ? r() : o()
    }
    function r() {
      var e = V.getElementsByTagName('body')[0],
        t = m(B)
      t.setAttribute('type', x)
      var n = e.appendChild(t)
      if (n) {
        var a = 0
        !(function() {
          if (typeof n.GetVariable != k) {
            var i = n.GetVariable('$version')
            i &&
              ((i = i.split(' ')[1].split(',')),
              (z.pv = [
                parseInt(i[0], 10),
                parseInt(i[1], 10),
                parseInt(i[2], 10)
              ]))
          } else if (10 > a) return a++, void setTimeout(arguments.callee, 10)
          e.removeChild(t), (n = null), o()
        })()
      } else o()
    }
    function o() {
      var e = W.length
      if (e > 0)
        for (var t = 0; e > t; t++) {
          var n = W[t].id,
            a = W[t].callbackFn,
            i = { success: !1, id: n }
          if (z.pv[0] > 0) {
            var r = h(n)
            if (r)
              if (!w(W[t].swfVersion) || (z.wk && z.wk < 312))
                if (W[t].expressInstall && l()) {
                  var o = {}
                  ;(o.data = W[t].expressInstall),
                    (o.width = r.getAttribute('width') || '0'),
                    (o.height = r.getAttribute('height') || '0'),
                    r.getAttribute('class') &&
                      (o.styleclass = r.getAttribute('class')),
                    r.getAttribute('align') &&
                      (o.align = r.getAttribute('align'))
                  for (
                    var f = {},
                      u = r.getElementsByTagName('param'),
                      p = u.length,
                      v = 0;
                    p > v;
                    v++
                  )
                    'movie' != u[v].getAttribute('name').toLowerCase() &&
                      (f[u[v].getAttribute('name')] = u[v].getAttribute(
                        'value'
                      ))
                  d(o, f, n, a)
                } else c(r), a && a(i)
              else E(n, !0), a && ((i.success = !0), (i.ref = s(n)), a(i))
          } else if ((E(n, !0), a)) {
            var y = s(n)
            y && typeof y.SetVariable != k && ((i.success = !0), (i.ref = y)),
              a(i)
          }
        }
    }
    function s(e) {
      var t = null,
        n = h(e)
      if (n && 'OBJECT' == n.nodeName)
        if (typeof n.SetVariable != k) t = n
        else {
          var a = n.getElementsByTagName(B)[0]
          a && (t = a)
        }
      return t
    }
    function l() {
      return !J && w('6.0.65') && (z.win || z.mac) && !(z.wk && z.wk < 312)
    }
    function d(e, t, n, a) {
      ;(J = !0), (I = a || null), (N = { success: !1, id: n })
      var i = h(n)
      if (i) {
        'OBJECT' == i.nodeName ? ((S = f(i)), (A = null)) : ((S = i), (A = n)),
          (e.id = F),
          (typeof e.width == k ||
            (!/%$/.test(e.width) && parseInt(e.width, 10) < 310)) &&
            (e.width = '310'),
          (typeof e.height == k ||
            (!/%$/.test(e.height) && parseInt(e.height, 10) < 137)) &&
            (e.height = '137'),
          (V.title = V.title.slice(0, 47) + ' - Flash Player Installation')
        var r = z.ie && z.win ? 'ActiveX' : 'PlugIn',
          o =
            'MMredirectURL=' +
            encodeURI(window.location)
              .toString()
              .replace(/&/g, '%26') +
            '&MMplayerType=' +
            r +
            '&MMdoctitle=' +
            V.title
        if (
          (typeof t.flashvars != k
            ? (t.flashvars += '&' + o)
            : (t.flashvars = o),
          z.ie && z.win && 4 != i.readyState)
        ) {
          var s = m('div')
          ;(n += 'SWFObjectNew'),
            s.setAttribute('id', n),
            i.parentNode.insertBefore(s, i),
            (i.style.display = 'none'),
            (function() {
              4 == i.readyState
                ? i.parentNode.removeChild(i)
                : setTimeout(arguments.callee, 10)
            })()
        }
        u(e, t, n)
      }
    }
    function c(e) {
      if (z.ie && z.win && 4 != e.readyState) {
        var t = m('div')
        e.parentNode.insertBefore(t, e),
          t.parentNode.replaceChild(f(e), t),
          (e.style.display = 'none'),
          (function() {
            4 == e.readyState
              ? e.parentNode.removeChild(e)
              : setTimeout(arguments.callee, 10)
          })()
      } else e.parentNode.replaceChild(f(e), e)
    }
    function f(e) {
      var t = m('div')
      if (z.win && z.ie) t.innerHTML = e.innerHTML
      else {
        var n = e.getElementsByTagName(B)[0]
        if (n) {
          var a = n.childNodes
          if (a)
            for (var i = a.length, r = 0; i > r; r++)
              (1 == a[r].nodeType && 'PARAM' == a[r].nodeName) ||
                8 == a[r].nodeType ||
                t.appendChild(a[r].cloneNode(!0))
        }
      }
      return t
    }
    function u(e, t, n) {
      var a,
        i = h(n)
      if (z.wk && z.wk < 312) return a
      if (i)
        if ((typeof e.id == k && (e.id = n), z.ie && z.win)) {
          var r = ''
          for (var o in e)
            e[o] != Object.prototype[o] &&
              ('data' == o.toLowerCase()
                ? (t.movie = e[o])
                : 'styleclass' == o.toLowerCase()
                ? (r += ' class="' + e[o] + '"')
                : 'classid' != o.toLowerCase() &&
                  (r += ' ' + o + '="' + e[o] + '"'))
          var s = ''
          for (var l in t)
            t[l] != Object.prototype[l] &&
              (s += '<param name="' + l + '" value="' + t[l] + '" />')
          ;(i.outerHTML =
            '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
            r +
            '>' +
            s +
            '</object>'),
            (H[H.length] = e.id),
            (a = h(e.id))
        } else {
          var d = m(B)
          d.setAttribute('type', x)
          for (var c in e)
            e[c] != Object.prototype[c] &&
              ('styleclass' == c.toLowerCase()
                ? d.setAttribute('class', e[c])
                : 'classid' != c.toLowerCase() && d.setAttribute(c, e[c]))
          for (var f in t)
            t[f] != Object.prototype[f] &&
              'movie' != f.toLowerCase() &&
              p(d, f, t[f])
          i.parentNode.replaceChild(d, i), (a = d)
        }
      return a
    }
    function p(e, t, n) {
      var a = m('param')
      a.setAttribute('name', t), a.setAttribute('value', n), e.appendChild(a)
    }
    function v(e) {
      var t = h(e)
      t &&
        'OBJECT' == t.nodeName &&
        (z.ie && z.win
          ? ((t.style.display = 'none'),
            (function() {
              4 == t.readyState ? y(e) : setTimeout(arguments.callee, 10)
            })())
          : t.parentNode.removeChild(t))
    }
    function y(e) {
      var t = h(e)
      if (t) {
        for (var n in t) 'function' == typeof t[n] && (t[n] = null)
        t.parentNode.removeChild(t)
      }
    }
    function h(e) {
      var t = null
      try {
        t = V.getElementById(e)
      } catch (n) {}
      return t
    }
    function m(e) {
      return V.createElement(e)
    }
    function g(e, t, n) {
      e.attachEvent(t, n), (U[U.length] = [e, t, n])
    }
    function w(e) {
      var t = z.pv,
        n = e.split('.')
      return (
        (n[0] = parseInt(n[0], 10)),
        (n[1] = parseInt(n[1], 10) || 0),
        (n[2] = parseInt(n[2], 10) || 0),
        t[0] > n[0] ||
        (t[0] == n[0] && t[1] > n[1]) ||
        (t[0] == n[0] && t[1] == n[1] && t[2] >= n[2])
          ? !0
          : !1
      )
    }
    function b(e, t, n, a) {
      if (!z.ie || !z.mac) {
        var i = V.getElementsByTagName('head')[0]
        if (i) {
          var r = n && 'string' == typeof n ? n : 'screen'
          if ((a && ((T = null), (L = null)), !T || L != r)) {
            var o = m('style')
            o.setAttribute('type', 'text/css'),
              o.setAttribute('media', r),
              (T = i.appendChild(o)),
              z.ie &&
                z.win &&
                typeof V.styleSheets != k &&
                V.styleSheets.length > 0 &&
                (T = V.styleSheets[V.styleSheets.length - 1]),
              (L = r)
          }
          z.ie && z.win
            ? T && typeof T.addRule == B && T.addRule(e, t)
            : T &&
              typeof V.createTextNode != k &&
              T.appendChild(V.createTextNode(e + ' {' + t + '}'))
        }
      }
    }
    function E(e, t) {
      if (X) {
        var n = t ? 'visible' : 'hidden'
        G && h(e) ? (h(e).style.visibility = n) : b('#' + e, 'visibility:' + n)
      }
    }
    function C(e) {
      var t = /[\\\"<>\.;]/,
        n = null != t.exec(e)
      return n && typeof encodeURIComponent != k ? encodeURIComponent(e) : e
    }
    {
      var S,
        A,
        I,
        N,
        T,
        L,
        k = 'undefined',
        B = 'object',
        O = 'Shockwave Flash',
        j = 'ShockwaveFlash.ShockwaveFlash',
        x = 'application/x-shockwave-flash',
        F = 'SWFObjectExprInst',
        $ = 'onreadystatechange',
        M = window,
        V = document,
        P = navigator,
        R = !1,
        D = [i],
        W = [],
        H = [],
        U = [],
        G = !1,
        J = !1,
        X = !0,
        z = (function() {
          var e =
              typeof V.getElementById != k &&
              typeof V.getElementsByTagName != k &&
              typeof V.createElement != k,
            t = P.userAgent.toLowerCase(),
            n = P.platform.toLowerCase(),
            a = /win/.test(n ? n : t),
            i = /mac/.test(n ? n : t),
            r = /webkit/.test(t)
              ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1'))
              : !1,
            o = /msie/.test(t),
            s = [0, 0, 0],
            l = null
          if (typeof P.plugins != k && typeof P.plugins[O] == B)
            (l = P.plugins[O].description),
              !l ||
                (typeof P.mimeTypes != k &&
                  P.mimeTypes[x] &&
                  !P.mimeTypes[x].enabledPlugin) ||
                ((R = !0),
                (o = !1),
                (l = l.replace(/^.*\s+(\S+\s+\S+$)/, '$1')),
                (s[0] = parseInt(l.replace(/^(.*)\..*$/, '$1'), 10)),
                (s[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, '$1'), 10)),
                (s[2] = /[a-zA-Z]/.test(l)
                  ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10)
                  : 0))
          else if (typeof M.ActiveXObject != k)
            try {
              var d = new ActiveXObject(j)
              d &&
                ((l = d.GetVariable('$version')),
                l &&
                  ((o = !0),
                  (l = l.split(' ')[1].split(',')),
                  (s = [
                    parseInt(l[0], 10),
                    parseInt(l[1], 10),
                    parseInt(l[2], 10)
                  ])))
            } catch (c) {}
          return { w3: e, pv: s, wk: r, ie: o, win: a, mac: i }
        })()
      !(function() {
        z.w3 &&
          (((typeof V.readyState != k && 'complete' == V.readyState) ||
            (typeof V.readyState == k &&
              (V.getElementsByTagName('body')[0] || V.body))) &&
            e(),
          G ||
            (typeof V.addEventListener != k &&
              V.addEventListener('DOMContentLoaded', e, !1),
            z.ie &&
              z.win &&
              (V.attachEvent($, function() {
                'complete' == V.readyState &&
                  (V.detachEvent($, arguments.callee), e())
              }),
              M == top &&
                !(function() {
                  if (!G) {
                    try {
                      V.documentElement.doScroll('left')
                    } catch (t) {
                      return void setTimeout(arguments.callee, 0)
                    }
                    e()
                  }
                })()),
            z.wk &&
              !(function() {
                return G
                  ? void 0
                  : /loaded|complete/.test(V.readyState)
                  ? void e()
                  : void setTimeout(arguments.callee, 0)
              })(),
            n(e)))
      })(),
        (function() {
          z.ie &&
            z.win &&
            'undefined' != typeof window.attachEvent &&
            window.attachEvent('onunload', function() {
              for (var e = U.length, t = 0; e > t; t++)
                U[t][0].detachEvent(U[t][1], U[t][2])
              for (var n = H.length, i = 0; n > i; i++) v(H[i])
              for (var r in z) z[r] = null
              z = null
              for (var o in a) a[o] = null
              a = null
            })
        })()
    }
    return {
      registerObject: function(e, t, n, a) {
        if (z.w3 && e && t) {
          var i = {}
          ;(i.id = e),
            (i.swfVersion = t),
            (i.expressInstall = n),
            (i.callbackFn = a),
            (W[W.length] = i),
            E(e, !1)
        } else a && a({ success: !1, id: e })
      },
      getObjectById: function(e) {
        return z.w3 ? s(e) : void 0
      },
      embedSWF: function(e, n, a, i, r, o, s, c, f, p) {
        var v = { success: !1, id: n }
        z.w3 && !(z.wk && z.wk < 312) && e && n && a && i && r
          ? (E(n, !1),
            t(function() {
              ;(a += ''), (i += '')
              var t = {}
              if (f && typeof f === B) for (var y in f) t[y] = f[y]
              ;(t.data = e), (t.width = a), (t.height = i)
              var h = {}
              if (c && typeof c === B) for (var m in c) h[m] = c[m]
              if (s && typeof s === B)
                for (var g in s)
                  typeof h.flashvars != k
                    ? (h.flashvars += '&' + g + '=' + s[g])
                    : (h.flashvars = g + '=' + s[g])
              if (w(r)) {
                var b = u(t, h, n)
                t.id == n && E(n, !0), (v.success = !0), (v.ref = b)
              } else {
                if (o && l()) return (t.data = o), void d(t, h, n, p)
                E(n, !0)
              }
              p && p(v)
            }))
          : p && p(v)
      },
      switchOffAutoHideShow: function() {
        X = !1
      },
      ua: z,
      getFlashPlayerVersion: function() {
        return { major: z.pv[0], minor: z.pv[1], release: z.pv[2] }
      },
      hasFlashPlayerVersion: w,
      createSWF: function(e, t, n) {
        return z.w3 ? u(e, t, n) : void 0
      },
      showExpressInstall: function(e, t, n, a) {
        z.w3 && l() && d(e, t, n, a)
      },
      removeSWF: function(e) {
        z.w3 && v(e)
      },
      createCSS: function(e, t, n, a) {
        z.w3 && b(e, t, n, a)
      },
      addDomLoadEvent: t,
      addLoadEvent: n,
      getQueryParamValue: function(e) {
        var t = V.location.search || V.location.hash
        if (t) {
          if ((/\?/.test(t) && (t = t.split('?')[1]), null == e)) return C(t)
          for (var n = t.split('&'), a = 0; a < n.length; a++)
            if (n[a].substring(0, n[a].indexOf('=')) == e)
              return C(n[a].substring(n[a].indexOf('=') + 1))
        }
        return ''
      },
      expressInstallCallback: function() {
        if (J) {
          var e = h(F)
          e &&
            S &&
            (e.parentNode.replaceChild(S, e),
            A && (E(A, !0), z.ie && z.win && (S.style.display = 'block')),
            I && I(N)),
            (J = !1)
        }
      }
    }
  })()
  n.exports = a
})
define('base:widget/httpProxy/httpProxy.js', function(t, e, o) {
  var r = t('base:widget/libs/jquerypacket.js'),
    a = t('base:widget/storage/storage.js'),
    s = t('base:widget/httpProxy/swfobject.js'),
    n = 0,
    c = [],
    i = !1,
    p = function() {
      var t = document.getElementById('httpProxy')
      r.each(c, function(e, o) {
        t.ajax(r.stringify(o))
      }),
        (c = []),
        h(!0)
    },
    y = function() {
      ;(window.httpProxyFunc = {}),
        r('body').append(
          '<div class="httpProxy-container" style="position:absolute;top:-9999px;"><div id="httpProxy" class="httpProxy"></div></div>'
        )
      var t = '11.4.0',
        e = '',
        o = {}
      ;(httpProxyFunc.onReady = p), (o.onReady = 'httpProxyFunc.onReady')
      var a = {}
      ;(a.quality = 'high'),
        (a.wmode = 'opaque'),
        (a.allowscriptaccess = 'always'),
        (a.allowfullscreen = 'false')
      var n = {}
      ;(n.id = 'httpProxy'),
        (n.name = 'httpProxy'),
        s.embedSWF(
          '/box-static/base/widget/httpProxy/HttpProxy_e00bc12.swf',
          'httpProxy',
          '1',
          '1',
          t,
          e,
          o,
          a,
          n
        ),
        setTimeout(function() {
          h(!1)
        }, 3e3)
    },
    u = function(t) {
      if ((n++, (n %= 1e7), 'function' == typeof t.success)) {
        var e = 'success_callback_' + n
        ;(httpProxyFunc[e] = t.success), (t.success = 'httpProxyFunc.' + e)
      }
      if ('function' == typeof t.error) {
        var o = 'error_callback_' + n
        ;(httpProxyFunc[o] = t.error), (t.error = 'httpProxyFunc.' + o)
      }
      var a = document.getElementById('httpProxy')
      'function' == typeof a.ajax ? a.ajax(r.stringify(t)) : c.push(t)
    },
    h = function(t) {
      t ? a.setItem('FlashSupport', !0) : i || a.setItem('FlashSupport', !1),
        (i = !0)
    }
  0 === r('#httpProxy').length && y(), (o.exports = { ajax: u })
})
define('base:widget/identify/identify.js', function(n, o, e) {
  'use strict'
  var t = {
    init: function(n, o) {
      var e = { eyun: '/enterprise/404', pan: '/error/404' },
        t = new Image()
      ;(t.src = location.protocol + '//' + location.host + e[n]),
        (t.onload = t.onerror = function() {
          'function' == typeof o && o()
        })
    }
  }
  e.exports = t
})
define('base:widget/libs/MutationObserver.js', function() {
  window.MutationObserver =
    window.MutationObserver ||
    (function(t) {
      'use strict'
      function e(t) {
        ;(this._watched = []), (this._listener = t)
      }
      function n(t) {
        !(function n() {
          var r = t.takeRecords()
          r.length && t._listener(r, t), (t._timeout = setTimeout(n, e._period))
        })()
      }
      function r(e) {
        var n = {
          type: null,
          target: null,
          addedNodes: [],
          removedNodes: [],
          previousSibling: null,
          nextSibling: null,
          attributeName: null,
          attributeNamespace: null,
          oldValue: null
        }
        for (var r in e) b(n, r) && e[r] !== t && (n[r] = e[r])
        return n
      }
      function a(t, e) {
        var n = l(t, e)
        return function(r) {
          var a,
            i = r.length
          e.attr && n.attr && o(r, t, n.attr, e.afilter),
            (e.kids || e.descendents) && (a = s(r, t, n, e)),
            (a || r.length !== i) && (n = l(t, e))
        }
      }
      function i(t, e) {
        return e.value
      }
      function u(t, e) {
        return 'style' !== e.name ? e.value : t.style.cssText
      }
      function o(t, e, n, a) {
        for (var i, u, o = {}, s = e.attributes, l = s.length; l--; )
          (i = s[l]),
            (u = i.name),
            (!a || b(a, u)) &&
              (m(e, i) !== n[u] &&
                t.push(
                  r({
                    type: 'attributes',
                    target: e,
                    attributeName: u,
                    oldValue: n[u],
                    attributeNamespace: i.namespaceURI
                  })
                ),
              (o[u] = !0))
        for (u in n)
          o[u] ||
            t.push(
              r({
                target: e,
                type: 'attributes',
                attributeName: u,
                oldValue: n[u]
              })
            )
      }
      function s(e, n, a, i) {
        function u(t, n, a, u, l) {
          for (
            var d, c, h, f = t.length - 1, p = -~((f - l) / 2);
            (h = t.pop());

          )
            (d = a[h.i]),
              (c = u[h.j]),
              i.kids &&
                p &&
                Math.abs(h.i - h.j) >= f &&
                (e.push(
                  r({
                    type: 'childList',
                    target: n,
                    addedNodes: [d],
                    removedNodes: [d],
                    nextSibling: d.nextSibling,
                    previousSibling: d.previousSibling
                  })
                ),
                p--),
              i.attr && c.attr && o(e, d, c.attr, i.afilter),
              i.charData &&
                3 === d.nodeType &&
                d.nodeValue !== c.charData &&
                e.push(r({ type: 'characterData', target: d })),
              i.descendents && s(d, c)
        }
        function s(n, a) {
          for (
            var h,
              f,
              b,
              g,
              v,
              m,
              y,
              N = n.childNodes,
              D = a.kids,
              _ = N.length,
              k = D ? D.length : 0,
              S = 0,
              w = 0,
              V = 0;
            _ > w || k > V;

          )
            (m = N[w]),
              (v = D[V]),
              (y = v && v.node),
              m === y
                ? (i.attr && v.attr && o(e, m, v.attr, i.afilter),
                  i.charData &&
                    v.charData !== t &&
                    m.nodeValue !== v.charData &&
                    e.push(r({ type: 'characterData', target: m })),
                  f && u(f, n, N, D, S),
                  i.descendents &&
                    (m.childNodes.length || (v.kids && v.kids.length)) &&
                    s(m, v),
                  w++,
                  V++)
                : ((l = !0),
                  h || ((h = {}), (f = [])),
                  m &&
                    (h[(b = c(m))] ||
                      ((h[b] = !0),
                      -1 === (g = d(D, m, V))
                        ? i.kids &&
                          (e.push(
                            r({
                              type: 'childList',
                              target: n,
                              addedNodes: [m],
                              nextSibling: m.nextSibling,
                              previousSibling: m.previousSibling
                            })
                          ),
                          S++)
                        : f.push({ i: w, j: g })),
                    w++),
                  y &&
                    y !== N[w] &&
                    (h[(b = c(y))] ||
                      ((h[b] = !0),
                      -1 === (g = p(N, y, w))
                        ? i.kids &&
                          (e.push(
                            r({
                              type: 'childList',
                              target: a.node,
                              removedNodes: [y],
                              nextSibling: D[V + 1],
                              previousSibling: D[V - 1]
                            })
                          ),
                          S--)
                        : f.push({ i: g, j: V })),
                    V++))
          f && u(f, n, N, D, S)
        }
        var l
        return s(n, a), l
      }
      function l(t, e) {
        var n = !0
        return (function r(t) {
          var a = { node: t }
          return (
            !e.charData || (3 !== t.nodeType && 8 !== t.nodeType)
              ? (e.attr &&
                  n &&
                  1 === t.nodeType &&
                  (a.attr = f(
                    t.attributes,
                    function(n, r) {
                      return (
                        (!e.afilter || e.afilter[r.name]) &&
                          (n[r.name] = m(t, r)),
                        n
                      )
                    },
                    {}
                  )),
                n &&
                  (e.kids || e.charData || (e.attr && e.descendents)) &&
                  (a.kids = h(t.childNodes, r)),
                (n = e.descendents))
              : (a.charData = t.nodeValue),
            a
          )
        })(t)
      }
      function d(t, e, n) {
        return p(t, e, n, g('node'))
      }
      function c(t) {
        try {
          return t.id || (t[N] = t[N] || y++)
        } catch (e) {
          try {
            return t.nodeValue
          } catch (n) {
            return y++
          }
        }
      }
      function h(t, e) {
        for (var n = [], r = 0; r < t.length; r++) n[r] = e(t[r], r, t)
        return n
      }
      function f(t, e, n) {
        for (var r = 0; r < t.length; r++) n = e(n, t[r], r, t)
        return n
      }
      function p(t, e, n, r) {
        for (; n < t.length; n++) if ((r ? t[n][r] : t[n]) === e) return n
        return -1
      }
      function b(e, n) {
        return e[n] !== t
      }
      function g(t) {
        return t
      }
      ;(e._period = 30),
        (e.prototype = {
          observe: function(t, e) {
            for (
              var r = {
                  attr: !!(
                    e.attributes ||
                    e.attributeFilter ||
                    e.attributeOldValue
                  ),
                  kids: !!e.childList,
                  descendents: !!e.subtree,
                  charData: !(!e.characterData && !e.characterDataOldValue)
                },
                i = this._watched,
                u = 0;
              u < i.length;
              u++
            )
              i[u].tar === t && i.splice(u, 1)
            e.attributeFilter &&
              (r.afilter = f(
                e.attributeFilter,
                function(t, e) {
                  return (t[e] = !0), t
                },
                {}
              )),
              i.push({ tar: t, fn: a(t, r) }),
              this._timeout || n(this)
          },
          takeRecords: function() {
            for (var t = [], e = this._watched, n = 0; n < e.length; n++)
              e[n].fn(t)
            return t
          },
          disconnect: function() {
            ;(this._watched = []),
              clearTimeout(this._timeout),
              (this._timeout = null)
          }
        })
      var v = document.createElement('i')
      ;(v.style.top = 0), (v = 'null' != v.attributes.style.value)
      var m = v ? i : u,
        y = 1,
        N = 'mo_id'
      return e
    })(void 0)
})
define('base:widget/libs/underscore.js', function(n, r, t) {
  !(function() {
    var n =
        ('object' == typeof self && self.self === self && self) ||
        ('object' == typeof global && global.global === global && global) ||
        this ||
        {},
      e = n._,
      u = Array.prototype,
      i = Object.prototype,
      o = 'undefined' != typeof Symbol ? Symbol.prototype : null,
      a = u.push,
      c = u.slice,
      f = i.toString,
      l = i.hasOwnProperty,
      s = Array.isArray,
      p = Object.keys,
      h = Object.create,
      v = function() {},
      y = function(n) {
        return n instanceof y
          ? n
          : this instanceof y
          ? void (this._wrapped = n)
          : new y(n)
      }
    'undefined' == typeof r || r.nodeType
      ? (n._ = y)
      : ('undefined' != typeof t &&
          !t.nodeType &&
          t.exports &&
          (r = t.exports = y),
        (r._ = y)),
      (y.VERSION = '1.8.3')
    var g,
      d = function(n, r, t) {
        if (void 0 === r) return n
        switch (t) {
          case 1:
            return function(t) {
              return n.call(r, t)
            }
          case null:
          case 3:
            return function(t, e, u) {
              return n.call(r, t, e, u)
            }
          case 4:
            return function(t, e, u, i) {
              return n.call(r, t, e, u, i)
            }
        }
        return function() {
          return n.apply(r, arguments)
        }
      },
      m = function(n, r, t) {
        return y.iteratee !== g
          ? y.iteratee(n, r)
          : null == n
          ? y.identity
          : y.isFunction(n)
          ? d(n, r, t)
          : y.isObject(n) && !y.isArray(n)
          ? y.matcher(n)
          : y.property(n)
      }
    y.iteratee = g = function(n, r) {
      return m(n, r, 1 / 0)
    }
    var b = function(n, r) {
        return (
          (r = null == r ? n.length - 1 : +r),
          function() {
            for (
              var t = Math.max(arguments.length - r, 0), e = Array(t), u = 0;
              t > u;
              u++
            )
              e[u] = arguments[u + r]
            switch (r) {
              case 0:
                return n.call(this, e)
              case 1:
                return n.call(this, arguments[0], e)
              case 2:
                return n.call(this, arguments[0], arguments[1], e)
            }
            var i = Array(r + 1)
            for (u = 0; r > u; u++) i[u] = arguments[u]
            return (i[r] = e), n.apply(this, i)
          }
        )
      },
      j = function(n) {
        if (!y.isObject(n)) return {}
        if (h) return h(n)
        v.prototype = n
        var r = new v()
        return (v.prototype = null), r
      },
      _ = function(n) {
        return function(r) {
          return null == r ? void 0 : r[n]
        }
      },
      x = function(n, r) {
        for (var t = r.length, e = 0; t > e; e++) {
          if (null == n) return void 0
          n = n[r[e]]
        }
        return t ? n : void 0
      },
      A = Math.pow(2, 53) - 1,
      w = _('length'),
      O = function(n) {
        var r = w(n)
        return 'number' == typeof r && r >= 0 && A >= r
      }
    ;(y.each = y.forEach = function(n, r, t) {
      r = d(r, t)
      var e, u
      if (O(n)) for (e = 0, u = n.length; u > e; e++) r(n[e], e, n)
      else {
        var i = y.keys(n)
        for (e = 0, u = i.length; u > e; e++) r(n[i[e]], i[e], n)
      }
      return n
    }),
      (y.map = y.collect = function(n, r, t) {
        r = m(r, t)
        for (
          var e = !O(n) && y.keys(n), u = (e || n).length, i = Array(u), o = 0;
          u > o;
          o++
        ) {
          var a = e ? e[o] : o
          i[o] = r(n[a], a, n)
        }
        return i
      })
    var k = function(n) {
      var r = function(r, t, e, u) {
        var i = !O(r) && y.keys(r),
          o = (i || r).length,
          a = n > 0 ? 0 : o - 1
        for (u || ((e = r[i ? i[a] : a]), (a += n)); a >= 0 && o > a; a += n) {
          var c = i ? i[a] : a
          e = t(e, r[c], c, r)
        }
        return e
      }
      return function(n, t, e, u) {
        var i = arguments.length >= 3
        return r(n, d(t, u, 4), e, i)
      }
    }
    ;(y.reduce = y.foldl = y.inject = k(1)),
      (y.reduceRight = y.foldr = k(-1)),
      (y.find = y.detect = function(n, r, t) {
        var e = O(n) ? y.findIndex : y.findKey,
          u = e(n, r, t)
        return void 0 !== u && -1 !== u ? n[u] : void 0
      }),
      (y.filter = y.select = function(n, r, t) {
        var e = []
        return (
          (r = m(r, t)),
          y.each(n, function(n, t, u) {
            r(n, t, u) && e.push(n)
          }),
          e
        )
      }),
      (y.reject = function(n, r, t) {
        return y.filter(n, y.negate(m(r)), t)
      }),
      (y.every = y.all = function(n, r, t) {
        r = m(r, t)
        for (
          var e = !O(n) && y.keys(n), u = (e || n).length, i = 0;
          u > i;
          i++
        ) {
          var o = e ? e[i] : i
          if (!r(n[o], o, n)) return !1
        }
        return !0
      }),
      (y.some = y.any = function(n, r, t) {
        r = m(r, t)
        for (
          var e = !O(n) && y.keys(n), u = (e || n).length, i = 0;
          u > i;
          i++
        ) {
          var o = e ? e[i] : i
          if (r(n[o], o, n)) return !0
        }
        return !1
      }),
      (y.contains = y.includes = y.include = function(n, r, t, e) {
        return (
          O(n) || (n = y.values(n)),
          ('number' != typeof t || e) && (t = 0),
          y.indexOf(n, r, t) >= 0
        )
      }),
      (y.invoke = b(function(n, r, t) {
        var e, u
        return (
          y.isFunction(r)
            ? (u = r)
            : y.isArray(r) && ((e = r.slice(0, -1)), (r = r[r.length - 1])),
          y.map(n, function(n) {
            var i = u
            if (!i) {
              if ((e && e.length && (n = x(n, e)), null == n)) return void 0
              i = n[r]
            }
            return null == i ? i : i.apply(n, t)
          })
        )
      })),
      (y.pluck = function(n, r) {
        return y.map(n, y.property(r))
      }),
      (y.where = function(n, r) {
        return y.filter(n, y.matcher(r))
      }),
      (y.findWhere = function(n, r) {
        return y.find(n, y.matcher(r))
      }),
      (y.max = function(n, r, t) {
        var e,
          u,
          i = -1 / 0,
          o = -1 / 0
        if (
          null == r ||
          ('number' == typeof r && 'object' != typeof n[0] && null != n)
        ) {
          n = O(n) ? n : y.values(n)
          for (var a = 0, c = n.length; c > a; a++)
            (e = n[a]), null != e && e > i && (i = e)
        } else
          (r = m(r, t)),
            y.each(n, function(n, t, e) {
              ;(u = r(n, t, e)),
                (u > o || (u === -1 / 0 && i === -1 / 0)) && ((i = n), (o = u))
            })
        return i
      }),
      (y.min = function(n, r, t) {
        var e,
          u,
          i = 1 / 0,
          o = 1 / 0
        if (
          null == r ||
          ('number' == typeof r && 'object' != typeof n[0] && null != n)
        ) {
          n = O(n) ? n : y.values(n)
          for (var a = 0, c = n.length; c > a; a++)
            (e = n[a]), null != e && i > e && (i = e)
        } else
          (r = m(r, t)),
            y.each(n, function(n, t, e) {
              ;(u = r(n, t, e)),
                (o > u || (1 / 0 === u && 1 / 0 === i)) && ((i = n), (o = u))
            })
        return i
      }),
      (y.shuffle = function(n) {
        return y.sample(n, 1 / 0)
      }),
      (y.sample = function(n, r, t) {
        if (null == r || t)
          return O(n) || (n = y.values(n)), n[y.random(n.length - 1)]
        var e = O(n) ? y.clone(n) : y.values(n),
          u = w(e)
        r = Math.max(Math.min(r, u), 0)
        for (var i = u - 1, o = 0; r > o; o++) {
          var a = y.random(o, i),
            c = e[o]
          ;(e[o] = e[a]), (e[a] = c)
        }
        return e.slice(0, r)
      }),
      (y.sortBy = function(n, r, t) {
        var e = 0
        return (
          (r = m(r, t)),
          y.pluck(
            y
              .map(n, function(n, t, u) {
                return { value: n, index: e++, criteria: r(n, t, u) }
              })
              .sort(function(n, r) {
                var t = n.criteria,
                  e = r.criteria
                if (t !== e) {
                  if (t > e || void 0 === t) return 1
                  if (e > t || void 0 === e) return -1
                }
                return n.index - r.index
              }),
            'value'
          )
        )
      })
    var S = function(n, r) {
      return function(t, e, u) {
        var i = r ? [[], []] : {}
        return (
          (e = m(e, u)),
          y.each(t, function(r, u) {
            var o = e(r, u, t)
            n(i, r, o)
          }),
          i
        )
      }
    }
    ;(y.groupBy = S(function(n, r, t) {
      y.has(n, t) ? n[t].push(r) : (n[t] = [r])
    })),
      (y.indexBy = S(function(n, r, t) {
        n[t] = r
      })),
      (y.countBy = S(function(n, r, t) {
        y.has(n, t) ? n[t]++ : (n[t] = 1)
      }))
    var M = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g
    ;(y.toArray = function(n) {
      return n
        ? y.isArray(n)
          ? c.call(n)
          : y.isString(n)
          ? n.match(M)
          : O(n)
          ? y.map(n, y.identity)
          : y.values(n)
        : []
    }),
      (y.size = function(n) {
        return null == n ? 0 : O(n) ? n.length : y.keys(n).length
      }),
      (y.partition = S(function(n, r, t) {
        n[t ? 0 : 1].push(r)
      }, !0)),
      (y.first = y.head = y.take = function(n, r, t) {
        return null == n || n.length < 1
          ? void 0
          : null == r || t
          ? n[0]
          : y.initial(n, n.length - r)
      }),
      (y.initial = function(n, r, t) {
        return c.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)))
      }),
      (y.last = function(n, r, t) {
        return null == n || n.length < 1
          ? void 0
          : null == r || t
          ? n[n.length - 1]
          : y.rest(n, Math.max(0, n.length - r))
      }),
      (y.rest = y.tail = y.drop = function(n, r, t) {
        return c.call(n, null == r || t ? 1 : r)
      }),
      (y.compact = function(n) {
        return y.filter(n, Boolean)
      })
    var F = function(n, r, t, e) {
      e = e || []
      for (var u = e.length, i = 0, o = w(n); o > i; i++) {
        var a = n[i]
        if (O(a) && (y.isArray(a) || y.isArguments(a)))
          if (r) for (var c = 0, f = a.length; f > c; ) e[u++] = a[c++]
          else F(a, r, t, e), (u = e.length)
        else t || (e[u++] = a)
      }
      return e
    }
    ;(y.flatten = function(n, r) {
      return F(n, r, !1)
    }),
      (y.without = b(function(n, r) {
        return y.difference(n, r)
      })),
      (y.uniq = y.unique = function(n, r, t, e) {
        y.isBoolean(r) || ((e = t), (t = r), (r = !1)),
          null != t && (t = m(t, e))
        for (var u = [], i = [], o = 0, a = w(n); a > o; o++) {
          var c = n[o],
            f = t ? t(c, o, n) : c
          r
            ? ((o && i === f) || u.push(c), (i = f))
            : t
            ? y.contains(i, f) || (i.push(f), u.push(c))
            : y.contains(u, c) || u.push(c)
        }
        return u
      }),
      (y.union = b(function(n) {
        return y.uniq(F(n, !0, !0))
      })),
      (y.intersection = function(n) {
        for (var r = [], t = arguments.length, e = 0, u = w(n); u > e; e++) {
          var i = n[e]
          if (!y.contains(r, i)) {
            var o
            for (o = 1; t > o && y.contains(arguments[o], i); o++);
            o === t && r.push(i)
          }
        }
        return r
      }),
      (y.difference = b(function(n, r) {
        return (
          (r = F(r, !0, !0)),
          y.filter(n, function(n) {
            return !y.contains(r, n)
          })
        )
      })),
      (y.unzip = function(n) {
        for (
          var r = (n && y.max(n, w).length) || 0, t = Array(r), e = 0;
          r > e;
          e++
        )
          t[e] = y.pluck(n, e)
        return t
      }),
      (y.zip = b(y.unzip)),
      (y.object = function(n, r) {
        for (var t = {}, e = 0, u = w(n); u > e; e++)
          r ? (t[n[e]] = r[e]) : (t[n[e][0]] = n[e][1])
        return t
      })
    var E = function(n) {
      return function(r, t, e) {
        t = m(t, e)
        for (var u = w(r), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
          if (t(r[i], i, r)) return i
        return -1
      }
    }
    ;(y.findIndex = E(1)),
      (y.findLastIndex = E(-1)),
      (y.sortedIndex = function(n, r, t, e) {
        t = m(t, e, 1)
        for (var u = t(r), i = 0, o = w(n); o > i; ) {
          var a = Math.floor((i + o) / 2)
          t(n[a]) < u ? (i = a + 1) : (o = a)
        }
        return i
      })
    var N = function(n, r, t) {
      return function(e, u, i) {
        var o = 0,
          a = w(e)
        if ('number' == typeof i)
          n > 0
            ? (o = i >= 0 ? i : Math.max(i + a, o))
            : (a = i >= 0 ? Math.min(i + 1, a) : i + a + 1)
        else if (t && i && a) return (i = t(e, u)), e[i] === u ? i : -1
        if (u !== u)
          return (i = r(c.call(e, o, a), y.isNaN)), i >= 0 ? i + o : -1
        for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
          if (e[i] === u) return i
        return -1
      }
    }
    ;(y.indexOf = N(1, y.findIndex, y.sortedIndex)),
      (y.lastIndexOf = N(-1, y.findLastIndex)),
      (y.range = function(n, r, t) {
        null == r && ((r = n || 0), (n = 0)), t || (t = n > r ? -1 : 1)
        for (
          var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0;
          e > i;
          i++, n += t
        )
          u[i] = n
        return u
      }),
      (y.chunk = function(n, r) {
        if (null == r || 1 > r) return []
        for (var t = [], e = 0, u = n.length; u > e; )
          t.push(c.call(n, e, (e += r)))
        return t
      })
    var I = function(n, r, t, e, u) {
      if (!(e instanceof r)) return n.apply(t, u)
      var i = j(n.prototype),
        o = n.apply(i, u)
      return y.isObject(o) ? o : i
    }
    ;(y.bind = b(function(n, r, t) {
      if (!y.isFunction(n))
        throw new TypeError('Bind must be called on a function')
      var e = b(function(u) {
        return I(n, e, r, this, t.concat(u))
      })
      return e
    })),
      (y.partial = b(function(n, r) {
        var t = y.partial.placeholder,
          e = function() {
            for (var u = 0, i = r.length, o = Array(i), a = 0; i > a; a++)
              o[a] = r[a] === t ? arguments[u++] : r[a]
            for (; u < arguments.length; ) o.push(arguments[u++])
            return I(n, e, this, this, o)
          }
        return e
      })),
      (y.partial.placeholder = y),
      (y.bindAll = b(function(n, r) {
        r = F(r, !1, !1)
        var t = r.length
        if (1 > t) throw new Error('bindAll must be passed function names')
        for (; t--; ) {
          var e = r[t]
          n[e] = y.bind(n[e], n)
        }
      })),
      (y.memoize = function(n, r) {
        var t = function(e) {
          var u = t.cache,
            i = '' + (r ? r.apply(this, arguments) : e)
          return y.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        }
        return (t.cache = {}), t
      }),
      (y.delay = b(function(n, r, t) {
        return setTimeout(function() {
          return n.apply(null, t)
        }, r)
      })),
      (y.defer = y.partial(y.delay, y, 1)),
      (y.throttle = function(n, r, t) {
        var e,
          u,
          i,
          o,
          a = 0
        t || (t = {})
        var c = function() {
            ;(a = t.leading === !1 ? 0 : y.now()),
              (e = null),
              (o = n.apply(u, i)),
              e || (u = i = null)
          },
          f = function() {
            var f = y.now()
            a || t.leading !== !1 || (a = f)
            var l = r - (f - a)
            return (
              (u = this),
              (i = arguments),
              0 >= l || l > r
                ? (e && (clearTimeout(e), (e = null)),
                  (a = f),
                  (o = n.apply(u, i)),
                  e || (u = i = null))
                : e || t.trailing === !1 || (e = setTimeout(c, l)),
              o
            )
          }
        return (
          (f.cancel = function() {
            clearTimeout(e), (a = 0), (e = u = i = null)
          }),
          f
        )
      }),
      (y.debounce = function(n, r, t) {
        var e,
          u,
          i = function(r, t) {
            ;(e = null), t && (u = n.apply(r, t))
          },
          o = b(function(o) {
            if ((e && clearTimeout(e), t)) {
              var a = !e
              ;(e = setTimeout(i, r)), a && (u = n.apply(this, o))
            } else e = y.delay(i, r, this, o)
            return u
          })
        return (
          (o.cancel = function() {
            clearTimeout(e), (e = null)
          }),
          o
        )
      }),
      (y.wrap = function(n, r) {
        return y.partial(r, n)
      }),
      (y.negate = function(n) {
        return function() {
          return !n.apply(this, arguments)
        }
      }),
      (y.compose = function() {
        var n = arguments,
          r = n.length - 1
        return function() {
          for (var t = r, e = n[r].apply(this, arguments); t--; )
            e = n[t].call(this, e)
          return e
        }
      }),
      (y.after = function(n, r) {
        return function() {
          return --n < 1 ? r.apply(this, arguments) : void 0
        }
      }),
      (y.before = function(n, r) {
        var t
        return function() {
          return (
            --n > 0 && (t = r.apply(this, arguments)), 1 >= n && (r = null), t
          )
        }
      }),
      (y.once = y.partial(y.before, 2)),
      (y.restArgs = b)
    var T = !{ toString: null }.propertyIsEnumerable('toString'),
      B = [
        'valueOf',
        'isPrototypeOf',
        'toString',
        'propertyIsEnumerable',
        'hasOwnProperty',
        'toLocaleString'
      ],
      R = function(n, r) {
        var t = B.length,
          e = n.constructor,
          u = (y.isFunction(e) && e.prototype) || i,
          o = 'constructor'
        for (y.has(n, o) && !y.contains(r, o) && r.push(o); t--; )
          (o = B[t]), o in n && n[o] !== u[o] && !y.contains(r, o) && r.push(o)
      }
    ;(y.keys = function(n) {
      if (!y.isObject(n)) return []
      if (p) return p(n)
      var r = []
      for (var t in n) y.has(n, t) && r.push(t)
      return T && R(n, r), r
    }),
      (y.allKeys = function(n) {
        if (!y.isObject(n)) return []
        var r = []
        for (var t in n) r.push(t)
        return T && R(n, r), r
      }),
      (y.values = function(n) {
        for (var r = y.keys(n), t = r.length, e = Array(t), u = 0; t > u; u++)
          e[u] = n[r[u]]
        return e
      }),
      (y.mapObject = function(n, r, t) {
        r = m(r, t)
        for (var e = y.keys(n), u = e.length, i = {}, o = 0; u > o; o++) {
          var a = e[o]
          i[a] = r(n[a], a, n)
        }
        return i
      }),
      (y.pairs = function(n) {
        for (var r = y.keys(n), t = r.length, e = Array(t), u = 0; t > u; u++)
          e[u] = [r[u], n[r[u]]]
        return e
      }),
      (y.invert = function(n) {
        for (var r = {}, t = y.keys(n), e = 0, u = t.length; u > e; e++)
          r[n[t[e]]] = t[e]
        return r
      }),
      (y.functions = y.methods = function(n) {
        var r = []
        for (var t in n) y.isFunction(n[t]) && r.push(t)
        return r.sort()
      })
    var q = function(n, r) {
      return function(t) {
        var e = arguments.length
        if ((r && (t = Object(t)), 2 > e || null == t)) return t
        for (var u = 1; e > u; u++)
          for (
            var i = arguments[u], o = n(i), a = o.length, c = 0;
            a > c;
            c++
          ) {
            var f = o[c]
            ;(r && void 0 !== t[f]) || (t[f] = i[f])
          }
        return t
      }
    }
    ;(y.extend = q(y.allKeys)),
      (y.extendOwn = y.assign = q(y.keys)),
      (y.findKey = function(n, r, t) {
        r = m(r, t)
        for (var e, u = y.keys(n), i = 0, o = u.length; o > i; i++)
          if (((e = u[i]), r(n[e], e, n))) return e
      })
    var K = function(n, r, t) {
      return r in t
    }
    ;(y.pick = b(function(n, r) {
      var t = {},
        e = r[0]
      if (null == n) return t
      y.isFunction(e)
        ? (r.length > 1 && (e = d(e, r[1])), (r = y.allKeys(n)))
        : ((e = K), (r = F(r, !1, !1)), (n = Object(n)))
      for (var u = 0, i = r.length; i > u; u++) {
        var o = r[u],
          a = n[o]
        e(a, o, n) && (t[o] = a)
      }
      return t
    })),
      (y.omit = b(function(n, r) {
        var t,
          e = r[0]
        return (
          y.isFunction(e)
            ? ((e = y.negate(e)), r.length > 1 && (t = r[1]))
            : ((r = y.map(F(r, !1, !1), String)),
              (e = function(n, t) {
                return !y.contains(r, t)
              })),
          y.pick(n, e, t)
        )
      })),
      (y.defaults = q(y.allKeys, !0)),
      (y.create = function(n, r) {
        var t = j(n)
        return r && y.extendOwn(t, r), t
      }),
      (y.clone = function(n) {
        return y.isObject(n) ? (y.isArray(n) ? n.slice() : y.extend({}, n)) : n
      }),
      (y.tap = function(n, r) {
        return r(n), n
      }),
      (y.isMatch = function(n, r) {
        var t = y.keys(r),
          e = t.length
        if (null == n) return !e
        for (var u = Object(n), i = 0; e > i; i++) {
          var o = t[i]
          if (r[o] !== u[o] || !(o in u)) return !1
        }
        return !0
      })
    var z, D
    ;(z = function(n, r, t, e) {
      if (n === r) return 0 !== n || 1 / n === 1 / r
      if (null == n || null == r) return !1
      if (n !== n) return r !== r
      var u = typeof n
      return 'function' !== u && 'object' !== u && 'object' != typeof r
        ? !1
        : D(n, r, t, e)
    }),
      (D = function(n, r, t, e) {
        n instanceof y && (n = n._wrapped), r instanceof y && (r = r._wrapped)
        var u = f.call(n)
        if (u !== f.call(r)) return !1
        switch (u) {
          case '[object RegExp]':
          case '[object String]':
            return '' + n == '' + r
          case '[object Number]':
            return +n !== +n
              ? +r !== +r
              : 0 === +n
              ? 1 / +n === 1 / r
              : +n === +r
          case '[object Date]':
          case '[object Boolean]':
            return +n === +r
          case '[object Symbol]':
            return o.valueOf.call(n) === o.valueOf.call(r)
        }
        var i = '[object Array]' === u
        if (!i) {
          if ('object' != typeof n || 'object' != typeof r) return !1
          var a = n.constructor,
            c = r.constructor
          if (
            a !== c &&
            !(
              y.isFunction(a) &&
              a instanceof a &&
              y.isFunction(c) &&
              c instanceof c
            ) &&
            'constructor' in n &&
            'constructor' in r
          )
            return !1
        }
        ;(t = t || []), (e = e || [])
        for (var l = t.length; l--; ) if (t[l] === n) return e[l] === r
        if ((t.push(n), e.push(r), i)) {
          if (((l = n.length), l !== r.length)) return !1
          for (; l--; ) if (!z(n[l], r[l], t, e)) return !1
        } else {
          var s,
            p = y.keys(n)
          if (((l = p.length), y.keys(r).length !== l)) return !1
          for (; l--; )
            if (((s = p[l]), !y.has(r, s) || !z(n[s], r[s], t, e))) return !1
        }
        return t.pop(), e.pop(), !0
      }),
      (y.isEqual = function(n, r) {
        return z(n, r)
      }),
      (y.isEmpty = function(n) {
        return null == n
          ? !0
          : O(n) && (y.isArray(n) || y.isString(n) || y.isArguments(n))
          ? 0 === n.length
          : 0 === y.keys(n).length
      }),
      (y.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
      }),
      (y.isArray =
        s ||
        function(n) {
          return '[object Array]' === f.call(n)
        }),
      (y.isObject = function(n) {
        var r = typeof n
        return 'function' === r || ('object' === r && !!n)
      }),
      y.each(
        [
          'Arguments',
          'Function',
          'String',
          'Number',
          'Date',
          'RegExp',
          'Error',
          'Symbol',
          'Map',
          'WeakMap',
          'Set',
          'WeakSet'
        ],
        function(n) {
          y['is' + n] = function(r) {
            return f.call(r) === '[object ' + n + ']'
          }
        }
      ),
      y.isArguments(arguments) ||
        (y.isArguments = function(n) {
          return y.has(n, 'callee')
        })
    var L = n.document && n.document.childNodes
    'function' != typeof /./ &&
      'object' != typeof Int8Array &&
      'function' != typeof L &&
      (y.isFunction = function(n) {
        return 'function' == typeof n || !1
      }),
      (y.isFinite = function(n) {
        return !y.isSymbol(n) && isFinite(n) && !isNaN(parseFloat(n))
      }),
      (y.isNaN = function(n) {
        return y.isNumber(n) && isNaN(n)
      }),
      (y.isBoolean = function(n) {
        return n === !0 || n === !1 || '[object Boolean]' === f.call(n)
      }),
      (y.isNull = function(n) {
        return null === n
      }),
      (y.isUndefined = function(n) {
        return void 0 === n
      }),
      (y.has = function(n, r) {
        if (!y.isArray(r)) return null != n && l.call(n, r)
        for (var t = r.length, e = 0; t > e; e++) {
          var u = r[e]
          if (null == n || !l.call(n, u)) return !1
          n = n[u]
        }
        return !!t
      }),
      (y.noConflict = function() {
        return (n._ = e), this
      }),
      (y.identity = function(n) {
        return n
      }),
      (y.constant = function(n) {
        return function() {
          return n
        }
      }),
      (y.noop = function() {}),
      (y.property = function(n) {
        return y.isArray(n)
          ? function(r) {
              return x(r, n)
            }
          : _(n)
      }),
      (y.propertyOf = function(n) {
        return null == n
          ? function() {}
          : function(r) {
              return y.isArray(r) ? x(n, r) : n[r]
            }
      }),
      (y.matcher = y.matches = function(n) {
        return (
          (n = y.extendOwn({}, n)),
          function(r) {
            return y.isMatch(r, n)
          }
        )
      }),
      (y.times = function(n, r, t) {
        var e = Array(Math.max(0, n))
        r = d(r, t, 1)
        for (var u = 0; n > u; u++) e[u] = r(u)
        return e
      }),
      (y.random = function(n, r) {
        return (
          null == r && ((r = n), (n = 0)),
          n + Math.floor(Math.random() * (r - n + 1))
        )
      }),
      (y.now =
        Date.now ||
        function() {
          return new Date().getTime()
        })
    var P = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
      },
      W = y.invert(P),
      C = function(n) {
        var r = function(r) {
            return n[r]
          },
          t = '(?:' + y.keys(n).join('|') + ')',
          e = RegExp(t),
          u = RegExp(t, 'g')
        return function(n) {
          return (n = null == n ? '' : '' + n), e.test(n) ? n.replace(u, r) : n
        }
      }
    ;(y.escape = C(P)),
      (y.unescape = C(W)),
      (y.result = function(n, r, t) {
        y.isArray(r) || (r = [r])
        var e = r.length
        if (!e) return y.isFunction(t) ? t.call(n) : t
        for (var u = 0; e > u; u++) {
          var i = null == n ? void 0 : n[r[u]]
          void 0 === i && ((i = t), (u = e)),
            (n = y.isFunction(i) ? i.call(n) : i)
        }
        return n
      })
    var J = 0
    ;(y.uniqueId = function(n) {
      var r = ++J + ''
      return n ? n + r : r
    }),
      (y.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
      })
    var U = /(.)^/,
      V = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      },
      $ = /\\|'|\r|\n|\u2028|\u2029/g,
      G = function(n) {
        return '\\' + V[n]
      }
    ;(y.template = function(n, r, t) {
      !r && t && (r = t), (r = y.defaults({}, r, y.templateSettings))
      var e = RegExp(
          [
            (r.escape || U).source,
            (r.interpolate || U).source,
            (r.evaluate || U).source
          ].join('|') + '|$',
          'g'
        ),
        u = 0,
        i = "__p+='"
      n.replace(e, function(r, t, e, o, a) {
        return (
          (i += n.slice(u, a).replace($, G)),
          (u = a + r.length),
          t
            ? (i += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'")
            : e
            ? (i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'")
            : o && (i += "';\n" + o + "\n__p+='"),
          r
        )
      }),
        (i += "';\n"),
        r.variable || (i = 'with(obj||{}){\n' + i + '}\n'),
        (i =
          "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
          i +
          'return __p;\n')
      var o
      try {
        o = new Function(r.variable || 'obj', '_', i)
      } catch (a) {
        throw ((a.source = i), a)
      }
      var c = function(n) {
          return o.call(this, n, y)
        },
        f = r.variable || 'obj'
      return (c.source = 'function(' + f + '){\n' + i + '}'), c
    }),
      (y.chain = function(n) {
        var r = y(n)
        return (r._chain = !0), r
      })
    var H = function(n, r) {
      return n._chain ? y(r).chain() : r
    }
    ;(y.mixin = function(n) {
      return (
        y.each(y.functions(n), function(r) {
          var t = (y[r] = n[r])
          y.prototype[r] = function() {
            var n = [this._wrapped]
            return a.apply(n, arguments), H(this, t.apply(y, n))
          }
        }),
        y
      )
    }),
      y.mixin(y),
      y.each(
        ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'],
        function(n) {
          var r = u[n]
          y.prototype[n] = function() {
            var t = this._wrapped
            return (
              r.apply(t, arguments),
              ('shift' !== n && 'splice' !== n) ||
                0 !== t.length ||
                delete t[0],
              H(this, t)
            )
          }
        }
      ),
      y.each(['concat', 'join', 'slice'], function(n) {
        var r = u[n]
        y.prototype[n] = function() {
          return H(this, r.apply(this._wrapped, arguments))
        }
      }),
      (y.prototype.value = function() {
        return this._wrapped
      }),
      (y.prototype.valueOf = y.prototype.toJSON = y.prototype.value),
      (y.prototype.toString = function() {
        return String(this._wrapped)
      }),
      'function' == typeof define &&
        define.amd &&
        define('underscore', [], function() {
          return y
        })
  })()
})
define('base:widget/scroll-utils/scroll-utils.js', function(t, o, e) {
  'use strict'
  var l = {
    getScrollTop: function(t) {
      return t.scrollTop()
    },
    getScrollBottom: function(t) {
      var o = t.height(),
        e = Math.max(t[0].scrollHeight, o),
        l = t.scrollTop(),
        r = Math.max(e - l - o, 0)
      return r
    },
    resolveHasScroll: function(t) {
      return l.getScrollTop(t) > 0 || l.getScrollBottom(t) > 0 ? !0 : !1
    },
    getScrollBarWidth: function() {
      var t,
        o = document.createElement('div')
      return (
        (o.style.cssText =
          'display:block;width:40px;height:40px;overflow-x:hidden;overflow-y:scroll;position:absolute;left:-20px;top:0px;'),
        document.body.appendChild(o),
        (t = o.offsetWidth - o.clientWidth),
        o.parentNode.removeChild(o),
        t
      )
    }
  }
  e.exports = l
})
define('base:widget/mouse-utils/mouse-drag.js', function(e, t, i) {
  var n = e('base:widget/scroll-utils/scroll-utils.js'),
    o = e('base:widget/libs/jquerypacket.js'),
    s = function() {
      var e = {},
        t = {},
        i = function(t) {
          ;(e.$mod = t),
            e.bindEvent(),
            (e.$filesIco = o('<div>').css({
              position: 'absolute',
              background:
                'url(/res/static/images/sprite_icon.gif?t=201301175055) 0px -1208px no-repeat',
              opacity: 0.5,
              'z-index': 99999,
              width: '32px',
              height: '32px',
              'font-size': '9px'
            })),
            e.$filesIco.html('<em>1</em>'),
            e.$filesIco
              .find('em')
              .css({
                top: '14px',
                left: '19px',
                position: 'relative',
                color: '#FFFFFF',
                'font-size': '10px'
              })
        }
      return (
        (e.$mod = null),
        (e.$filesIco = null),
        (e.isMove = 0),
        (e.isCreateMisk = !1),
        (e.createMisk = function() {
          e.$filesIco.appendTo(o('body')).show()
        }),
        (e.destoryMisk = function() {
          e.$filesIco.hide()
        }),
        (e.bindEvent = function() {
          var i = function() {
            return !1
          }
          e.$mod.bind('mousedown', function(s) {
            if (
              !(
                1 !== s.which ||
                (1 === s.which && s.ctrlKey) ||
                ('function' == typeof t.onStart && !t.onStart(s))
              )
            ) {
              var c = 0
              ;(n.resolveHasScroll(e.$mod) &&
                ((c = e.$mod.offset().left + e.$mod.outerWidth()),
                (c -= n.getScrollBarWidth(e.$mod)),
                s.clientX > c - 5)) ||
                (o(document).bind('selectstart', i),
                (e.isMove = !0),
                (e.clientX = s.clientX),
                (e.clientY = s.clientY))
            }
          }),
            o(document).bind('mouseup', function() {
              e.isMove &&
                ((e.isMove = !1),
                e.destoryMisk(),
                'function' == typeof t.onDragEnd && t.onDragEnd(),
                o(document).unbind('selectstart', i))
            }),
            o(document).bind('mousemove', function(i) {
              var n, o, s, c, l, r, u
              e.isMove &&
                (i.preventDefault(),
                (s = 32),
                (c = 32),
                (n = i.clientX),
                (o = i.clientY),
                (r = i.clientX - e.clientX),
                (u = i.clientY - e.clientY),
                (l = { top: o, left: n, width: s, height: c }),
                e.$filesIco.css(l),
                (-10 > r || r > 10 || -10 > u || u > 10) &&
                  (e.isCreateMisk || e.createMisk(),
                  'function' == typeof t.onSelect && t.onSelect(l)))
            })
        }),
        (t.onSelect = function() {}),
        (t.onStart = function() {
          return !0
        }),
        (t.onDragEnd = function() {}),
        (t.setNum = function(t) {
          t >= 99 && (t = 99), e.$filesIco.find('em').html(t || 0)
        }),
        i.apply(t, arguments),
        t
      )
    }
  i.exports = s
})
define('base:widget/mouse-utils/mouse-selection.js', function(t, n, i) {
  var e = t('base:widget/libs/jquerypacket.js'),
    o = function(t) {
      var n = {},
        i = {},
        o = function(t) {
          ;(n.$mod = t),
            n.bindEvent(),
            (n.$misk = e('<div>').css({
              position: 'absolute',
              'background-color': '#8BBFF9',
              border: '1px solid #1362B4',
              opacity: 0.5,
              'z-index': 99999
            }))
        }
      return (
        (n.$mod = null),
        (n.$misk = null),
        (n.clientX = 0),
        (n.clientY = 0),
        (n.isMove = 0),
        (n.isStart = 0),
        (n.isCreateMisk = !1),
        (n.createMisk = function() {
          n.$misk.appendTo(e('body')).show()
        }),
        (n.destoryMisk = function() {
          n.$misk.hide().css({ height: 0, width: 0 })
        }),
        (n.bindEvent = function() {
          var t = function() {
            return !1
          }
          n.$mod.bind('mousedown', function(e) {
            1 !== e.which ||
              (1 === e.which && e.ctrlKey) ||
              (('function' != typeof i.onStart || i.onStart(e)) &&
                (n.$mod.bind('selectstart', t),
                (n.isStart = !0),
                (n.clientX = e.clientX),
                (n.clientY = e.clientY)))
          }),
            e(document).bind('mouseup', function() {
              return n.isMove
                ? ((n.isMove = !1),
                  (n.isStart = !1),
                  n.destoryMisk(),
                  'function' == typeof i.onEnd && i.onEnd(),
                  void n.$mod.unbind('selectstart', t))
                : void (n.isStart = !1)
            }),
            e(document).bind('mousemove', function(t) {
              var e, o
              if (n.isStart) {
                ;(e = t.clientX - n.clientX),
                  (o = t.clientY - n.clientY),
                  !n.isMove &&
                    (Math.abs(e) > 5 || Math.abs(o) > 5) &&
                    (n.isMove = !0)
                var s, c, r
                n.isMove &&
                  (t.preventDefault(),
                  (s = n.clientX),
                  (c = n.clientY),
                  0 > e && ((s += e), (e = -e)),
                  0 > o && ((c += o), (o = -o)),
                  (r = { top: c, left: s, width: e, height: o }),
                  n.$misk.css(r),
                  n.isCreateMisk || n.createMisk(),
                  'function' == typeof i.onSelect && i.onSelect(r))
              }
            })
        }),
        (i.onSelect = function() {}),
        (i.onStart = function() {
          return !0
        }),
        (i.onEnd = function() {}),
        o.call(i, t),
        i
      )
    }
  i.exports = o
})
define('base:widget/passAPI/passAPI.js', function(n, o, i) {
  var t = n('base:widget/libs/jquerypacket.js'),
    e = {},
    s =
      'https:' === document.location.protocol
        ? 'https://passport.baidu.com/'
        : 'http://passport.bdimg.com/',
    a = (e.PassForceverify = function() {})
  ;(a.onSubmitSuccess = function() {}), (a.onSubmitFailure = function() {})
  var p = (e.PassLoginDialog = function() {})
  ;(p._mLoginStatic = 0),
    (p.reload = !1),
    (p.flagSendReport = !0),
    (p.singleton = null)
  var c = ''
  ;(e.setDisplayUserName = function(n) {
    c = n
  }),
    (p.obtain = function() {
      return p.singleton ? p.singleton : (p.singleton = new p())
    }),
    (p.onLoginSuccessCallback = function() {
      window.disk && window.disk.DEBUG && console.log('login hide!')
    }),
    (p.onLoginHideCallback = function() {
      window.disk && window.disk.DEBUG && console.log('login hide!')
    })
  var r = (e.PassBindMobileDialog = function() {})
  ;(r.onBindSuccessCallback = function() {}),
    (r.onBindFailCallback = function() {}),
    (r.reload = !1)
  var l = t.ajax({
      async: !0,
      url:
        s +
        'passApi/js/uni_login_wrapper.js?cdnversion=' +
        new Date().getTime(),
      dataType: 'script',
      success: function() {
        var n = encodeURIComponent(location.href)
        ;(e.PassportInit = window.passport.pop.init({
          apiOpt: {
            staticPage:
              location.protocol +
              '//' +
              location.host +
              '/box-static/base/widget/passAPI/pass_v3_jump.html',
            product: 'netdisk',
            subpro: 'netdisk_web',
            u: location.href,
            memberPass: !0,
            safeFlag: 0
          },
          cache: !1,
          registerLink:
            'https://passport.baidu.com/v2/?reg&regphone=1&tpl=netdisk&u=' + n,
          authsite: ['tsina', 'qzone', 'renren'],
          authsiteCfg: { act: 'implicit' },
          onLoginSuccess: function(n) {
            p.flagSendReport === !0
              ? window.disk &&
                'function' == typeof window.disk.sendBaiduLog &&
                window.disk.sendBaiduLog('网盘弹框登录', 'web_dialog_login')
              : (p.flagSendReport = !0),
              (n.returnValue = p.reload),
              p.reload && window.location.reload(),
              p.onLoginSuccessCallback(n)
          },
          onHide: function() {},
          onShow: function() {
            if (
              (t('.tang-pass-pop-login ul.tang-pass-qrcode-ullist').hide(),
              t('.tang-pass-pop-login .tang-pass-qrcode-title').html(
                '请使用<a href="https://pan.baidu.com/download?from=login#pan" target="_blank">百度网盘App</a>扫码登录'
              ),
              0 ===
                t('.tang-pass-pop-login .tang-pass-qrcode').find('.tips')
                  .length &&
                t('.tang-pass-pop-login .tang-pass-qrcode').append(
                  '<p class="tips">百度网盘App - 首页右上角加号 - 左下角扫一扫</p>'
                ),
              c)
            ) {
              var n = t('#passport-login-pop')
              n.find("input[name='userName']").val(c),
                n
                  .find("input[name='password']")
                  .val('')
                  .focus(),
                e.setDisplayUserName('')
            }
          },
          tangram: !0
        })),
          (e.PassportInit.netdiskLogin = function(n) {
            ;(p.reload = n.reload),
              n.flagSendReport === !1 && (p.flagSendReport = n.flagSendReport),
              setTimeout(function() {
                e.PassportInit.show()
              }, 100)
          })
      }
    }),
    d = t.ajax({
      async: !0,
      url:
        s +
        'passApi/js/uni_forceverify_wrapper.js?cdnversion=' +
        new Date().getTime(),
      dataType: 'script',
      success: function() {
        ;(e.PassportForceInit = passport.pop.initForceverify({
          token: window.yunData.token,
          curType: 'mobile',
          title: '',
          msg: '',
          ids: '',
          footerHTML: ' ',
          onRender: function() {},
          onHide: function() {},
          onSendvcodeSuccess: function() {},
          onGetapiError: function() {},
          onSubmitSuccess: function(n) {
            a.onSubmitSuccess(n)
          },
          onSubmitFailure: function(n) {
            a.onSubmitFailure(n)
          }
        })),
          (e.PassportForceInit.netdiskForceVerify = function() {
            setTimeout(function() {
              e.PassportForceInit.show()
            }, 100)
          })
      }
    }),
    u = {
      done: function(n) {
        'function' == typeof n && n()
      }
    }
  i.exports = {
    promise: l,
    promiseBindMobile: u,
    promiseForceverify: d,
    passAPI: e
  }
})
define('base:widget/passAPI/wrapperPassAPI.js', function(s, o, n) {
  var e = s('base:widget/libs/jquerypacket.js'),
    t = {},
    a =
      'https:' === document.location.protocol
        ? 'https://passport.baidu.com/'
        : 'http://passport.bdimg.com/',
    i = (t.PassLoginDialog = function() {})
  ;(i._mLoginStatic = 0),
    (i.reload = !1),
    (i.flagSendReport = !0),
    (i.singleton = null)
  var r = ''
  ;(t.setDisplayUserName = function(s) {
    r = s
  }),
    (i.obtain = function() {
      return i.singleton ? i.singleton : (i.singleton = new i())
    }),
    (i.onLoginSuccessCallback = function() {}),
    (i.onLoginHideCallback = function() {}),
    (i.onRenderCallback = function() {})
  var l = function(s) {
    if (
      s &&
      '[object object]' === Object.prototype.toString.call(s).toLowerCase()
    )
      var s = s
    else var s = {}
    return null !== l.promise
      ? l.promise
      : (l.promise = e.ajax({
          async: !0,
          url: a + 'passApi/js/wrapper.js?cdnversion=' + new Date().getTime(),
          dataType: 'script',
          success: function() {
            window.passport.use('login', { tangram: !0 }, function(o) {
              ;(t.PassportInit = new o.passport.login({
                product: s.product || 'netdisk',
                staticPage:
                  location.protocol +
                  '//' +
                  location.host +
                  '/box-static/base/widget/passAPI/pass_v3_jump.html',
                subpro: 'netdisk_web',
                u: location.href,
                isPhone: !1,
                sms: 1,
                safeFlag: 0,
                autosuggest: !1,
                defaultCss: !1,
                hasPlaceholder: !0,
                loginMerge: !0,
                memberPass: !0,
                hasFeedback: !0,
                hasRegUrl: !1
              })),
                t.PassportInit.on('loginSuccess', function(s) {
                  ;(s.returnValue = !1), i.onLoginSuccessCallback(s)
                }),
                t.PassportInit.on('render', function(s) {
                  e('.module-pass-login-regLink').show(), i.onRenderCallback(s)
                }),
                t.PassportInit.render('login')
            })
          }
        }))
  }
  ;(l.promise = null), (n.exports = { loadPassLogin: l, passAPI: t })
})
define('base:widget/report-utils/report-util.js', function(t, e, r) {
  r.exports.browserReport = function(t, e) {
    if (
      !t ||
      '网盘图片预览@com.baidu.pan' === e ||
      '网盘视频播放器@com.baidu.pan' === e ||
      '网盘视频@com.baidu.pan' === e
    )
      return !1
    var r = [],
      o = function(t) {
        r.push({
          type: 3,
          path: t.path,
          fs_id: parseInt(t.fs_id, 10),
          category: t.category,
          op_time: Math.floor(new Date().getTime() / 1e3)
        })
      }
    if ('[object Array]' === Object.prototype.toString.call(t))
      for (var i = 0; i < t.length; i++) o(t[i])
    else o(t)
    $.post('/recent/report', { detail: JSON.stringify(r) })
  }
})
define('base:widget/router/stateManager.js', function(t, e, n) {
  function a() {
    return !(
      'undefined' == typeof window ||
      !window.history ||
      !window.history.pushState
    )
  }
  function o(t, e) {
    r.emit('statePathChange', t, e), r.emit('stateQueryChange', t, e)
  }
  var i = t('base:widget/tools/service/tools.event.js').EventEmitter,
    h = '',
    s = '',
    r = new i(),
    c = 'historyIFrameEmulator',
    d = {
      iFrame: null,
      hash: location.hash,
      timer: 0,
      buildIFrame: function() {
        var t = document.getElementById(c)
        t && ((this.iFrame = t), this.addState(''), this.mockHashChange())
      },
      dispose: function() {
        ;(this.iFrame = null), clearInterval(this.timer)
      },
      addState: function(t) {
        if (this.iFrame)
          try {
            var e = this.iFrame.contentWindow.document
            e.open(),
              e.writeln('<html><body>' + t + '</body></html>'),
              e.close()
          } catch (n) {
            this.dispose()
          }
      },
      mockHashChange: function() {
        var t = this
        this.timer = setInterval(function() {
          var e = location.hash
          if (t.hash != e) t.addState(e), o(e, t.hash), (t.hash = e)
          else
            try {
              var n = t.iFrame.contentWindow.document.body.innerText.replace(
                /^\s+|\s+$/g,
                ''
              )
              n !== e &&
                ((t.hash = location.hash = n),
                setTimeout(function() {
                  o(n, e)
                }, 0))
            } catch (a) {
              this.dispose()
            }
        }, 1e3)
      },
      init: function() {
        var t = document.documentMode,
          e = (t && t >= 8) || void 0 != window.HashChangeEvent
        e
          ? window.addEventListener
            ? window.addEventListener(
                'hashchange',
                function(t) {
                  var e = ((t.oldURL || '').match(/#[^#]*$/) || [''])[0]
                  o(location.hash, e)
                },
                !1
              )
            : window.attachEvent('onhashchange', function(t) {
                o(location.hash, void 0 === t.oldURL ? s : t.oldURL)
              })
          : this.buildIFrame()
      }
    }
  ;(n.exports.bindQueryChange = function(t) {
    r.on('stateQueryChange', t)
  }),
    (n.exports.bindPathChange = function(t) {
      r.on('statePathChange', t)
    }),
    (n.exports.getRoutePath = function() {
      return 'hash' === h
        ? location.hash.replace(/^#/, '')
        : location.pathname + location.search
    }),
    (n.exports.setRoutePath = function(t) {
      if ('hash' === h) (s = location.hash), (location.hash = t)
      else {
        var e = location.pathname + location.search
        history.pushState(null, '', t),
          o(location.pathname + location.search, e)
      }
    }),
    (n.exports.setMode = function(t) {
      h ||
        ((t && /^(history|hash)$/i.test(t)) || (t = 'history'),
        'history' !== t || a() || (t = 'hash'),
        'history' === t
          ? window.addEventListener('popstate', function() {
              o(location.pathname + location.search)
            })
          : d.init(),
        (h = t))
    })
})
define('base:widget/router/Query.js', function(t, e, n) {
  function i(t) {
    return String(t.match(r) || '')
  }
  function a() {
    ;(this.__keyList__ = {}), (this.hashWatch = !1), this._watch()
  }
  var o = t('base:widget/libs/underscore.js'),
    c = t('base:widget/tools/service/tools.util.js'),
    h = t('base:widget/router/stateManager.js'),
    s = /[?&]([^=&?\/]+)(=([^=&?\/]+))?/g,
    r = /^#?[^#?]*\??/
  ;(a.prototype.add = function(t, e) {
    var n = c.assign(
      {},
      { name: '', value: '', locked: !1, watch: function() {} },
      t
    )
    !this.__keyList__[n.name] && (this.__keyList__[n.name] = n),
      this.watch(n.name, n.watch),
      e || this.set(n.name, n.value)
  }),
    (a.prototype.remove = function(t) {
      this.set(t, !1)
    }),
    (a.prototype.get = function(t) {
      var e = h.getRoutePath(),
        n = e.match(new RegExp('[?&]' + t + '=([^&=?/]+)', 'i'))
      return n && n.length && n[1] ? decodeURIComponent(n[1]) : null
    }),
    (a.prototype.set = function(t, e) {
      var n = {}
      o.isString(t)
        ? (n[t] = e ? String(e) : '')
        : o.isObject(t) &&
          ('name' in t && 'value' in t
            ? (n[t.name] = t.value ? String(t.value) : '')
            : o.each(t, function(t, e) {
                t && e && (n[e] = t ? String(t) : '')
              }))
      var i = h.getRoutePath()
      o.each(n, function(t, e) {
        ;(t = encodeURIComponent(t)), (e = encodeURIComponent(e))
        var n = new RegExp('([?&])(' + e + '=)[^&=?/]+(&?)', 'g')
        i = n.test(i)
          ? i.replace(n, function(e, n, i, a) {
              return t ? n + i + t + a : '&' === n ? a : a ? n : ''
            })
          : i + (/\?/.test(i) ? '&' : '?') + e + '=' + t
      }),
        i !== h.getRoutePath() && h.setRoutePath(i)
    }),
    (a.prototype._watch = function() {
      var t = this
      h.bindQueryChange(function(e, n) {
        if (t.hashWatch && e !== n) {
          var a = i(e),
            c = i(n),
            h = a && a === c,
            s = t.getAll(e),
            r = h ? t.getAll(n) : {}
          o.each(s, function(e, n) {
            if (e) {
              var i = r[n] || ''
              e !== i && t.emitWatch(n, e, i)
            }
          })
        }
      })
    }),
    (a.prototype.watch = function(t, e) {
      if (t && o.isString(t) && o.isFunction(e)) {
        var n = this.__keyList__[t] || (this.__keyList__[t] = {})
        ;(this.hashWatch = !0),
          o.isArray(n.watch)
            ? -1 === n.watch.indexOf(e) && n.watch.push(e)
            : o.isFunction(n.watch)
            ? n.watch !== e && (n.watch = [n.watch, e])
            : (n.watch = e)
      }
    }),
    (a.prototype.getAll = function(t) {
      for (var e = {}; s.exec(t || h.getRoutePath()); )
        RegExp.$1 && (e[RegExp.$1] = decodeURIComponent(RegExp.$3) || '')
      return e
    }),
    (a.prototype.emitWatch = function(t, e, n) {
      var i = this.__keyList__[t]
      if (i) {
        var a = i.watch
        o.isFunction(a)
          ? a.call(null, e, n)
          : o.each(a, function(t) {
              t.call(null, e, n)
            })
      }
    }),
    (a.prototype.emitAllWatch = function() {
      var t = this.getAll(),
        e = this
      o.each(t, function(t, n) {
        e.emitWatch(n, t, '')
      })
    }),
    (n.exports = a)
})
define('base:widget/router/Router.js', function(e, t, r) {
  function a(e) {
    return (e.replace(/^#/, '').match(m) || [, ''])[1]
  }
  function n(e, t) {
    e || (e = {}),
      s.call(this),
      o.setMode(e.mode),
      (this._routes = []),
      (this.query = new h()),
      (this.currentRouteName = '')
    var r = e.routes
    r && this.addRoute(r), t && this.init()
  }
  var i = e('base:widget/libs/underscore.js'),
    o = e('base:widget/router/stateManager.js'),
    u = e('base:widget/tools/service/tools.util.js'),
    s = e('base:widget/tools/service/tools.event.js').EventEmitter,
    h = e('base:widget/router/Query.js'),
    m = /([^?]*)\??/,
    p = /\B[A-Z]/g
  u.inherits(n, s),
    (n.prototype.init = function() {
      var e = this
      o.bindPathChange(function(t, r) {
        if (t !== r) {
          var n = a(t),
            i = a(r)
          if (n !== i) {
            var o = e.getCurrentRouter(i).route,
              u = e.getCurrentRouter(n),
              s = u.route
            s
              ? (o &&
                  (o._emitter.emit('leave', s && s.name, o.name),
                  e.emit('eachLeave', s && s.name, o.name)),
                (e.currentRouteName = s.name),
                s._emitter.emit('enter', s.name, o && o.name),
                e.emit('eachEnter', s.name, o && o.name),
                s._emitter.emit('render', s.name, u.params))
              : ((e.currentRouteName = ''), (location.href = r))
          }
        }
      })
      var t = this.getCurrentRouter(),
        r = t.route
      return r
        ? ((e.currentRouteName = r.name),
          r._emitter.emit('enter', r.name),
          e.emit('eachEnter', r.name),
          r._emitter.emit('render', r.name, t.params),
          this.query.emitAllWatch(),
          void this.emit('ready', r.name, this.query.getAll()))
        : ((r = i.find(this._routes, function(e) {
            return e.isDefault === !0 && !e._hasParams
          })),
          void (r
            ? (this.push(r), this.emit('ready', r.name, this.query.getAll()))
            : this.emit('error')))
    }),
    (n.prototype.getCurrentRouter = function(e) {
      if ('' === e) return { route: null, params: {} }
      if (void 0 === e || null === e) {
        var t = o.getRoutePath()
        if (((e = a(t)), !e)) return { route: null, params: {} }
      }
      var r = {},
        n = i.find(this._routes, function(t) {
          if (!t._hasParams) return t.path === e
          var a = new RegExp(t._paramPath)
          return a.test(e)
            ? (e.replace(a, function() {
                var e = [].slice.call(arguments, 1, t._params.length + 1)
                i.each(t._params, function(t, a) {
                  r[t] = e[a] || ''
                })
              }),
              !0)
            : void 0
        })
      return { route: n, params: r }
    }),
    (n.prototype.addRoute = function(e) {
      var t = this
      i.isArray(e) || (e = [e]),
        i.each(e, function(e) {
          ;(e = u.assign(
            {},
            {
              path: '',
              name: '',
              query: {},
              isDefault: !1,
              enter: null,
              leave: null,
              render: null,
              _emitter: new s()
            },
            e
          )),
            /^\//.test(e.path) || (e.path = '/' + e.path)
          var r = i.some(t._routes, function(t) {
            return t.path === e.path
          })
          if (!r) {
            if (/\/:([^\/])+/.test(e.path)) {
              var a = []
              ;(e._hasParams = !0),
                (e._paramPath = e.path.replace(/:([^\/]+)/g, function(e, t) {
                  return a.push(t), '([^/]+)'
                })),
                (e._params = a)
            }
            i.each(['enter', 'leave', 'render'], function(t) {
              i.isFunction(e[t]) && (e._emitter.on(t, e[t]), (e[t] = void 0))
            }),
              i.each(e.query, function(r, a) {
                i.isString(r)
                  ? t.query.add({ name: a, value: r }, !0)
                  : i.isObject(r) &&
                    (t.query.add(u.assign({ name: a }, r), !0),
                    (e.query[a] = r.value))
              }),
              t._routes.push(e)
          }
        })
    }),
    (n.prototype.push = function(e) {
      var t = { path: '', name: '', params: {}, query: {} }
      if (
        (i.isString(e) && (t.path = e),
        i.isObject(e) && (t = u.assign({}, t, e)),
        !t.path && !t.name)
      )
        return void this.emit('error')
      t.path = t.path.replace(/^[#\/]+/, '')
      var r = []
      for (var a in this.query.__keyList__)
        if (this.query.__keyList__.hasOwnProperty(a)) {
          var n = this.query.__keyList__[a]
          if (n.locked && void 0 === t.query[a]) {
            var s = this.query.get(a)
            s && (t.query[a] = this.query.get(a))
          }
        }
      for (var h in t.query)
        t.query.hasOwnProperty(h) &&
          r.push(encodeURIComponent(h) + '=' + encodeURIComponent(t.query[h]))
      r = r.join('&')
      var m = ''
      if (t.path) m = '/' + t.path
      else {
        var p = this.getRouterConfig(t.name)
        if (!p) return
        if (p._hasParams) {
          var c = p._paramPath.split('/([^/]+)')
          i.each(p._params, function(e) {
            if (!(e in t.params)) throw new Error('no params : ', e)
            m += c.shift() + '/' + t.params[e]
          }),
            (m += c.join(''))
        } else m = p.path
      }
      r && (m += '?' + r), o.setRoutePath(m)
    }),
    (n.prototype.eachLeave = function(e) {
      this.on('eachLeave', e)
    }),
    (n.prototype.eachEnter = function(e) {
      this.on('eachEnter', e)
    }),
    (n.prototype.getRouterConfig = function(e) {
      return i.find(this._routes, function(t) {
        return t.name === e
      })
    }),
    (n.prototype.getAllRouteNames = function() {
      var e = {}
      return (
        i.each(this._routes, function(t) {
          var r = t.name
          e[
            r
              .replace(p, function(e) {
                return '_' + e
              })
              .toUpperCase()
          ] = r
        }),
        e
      )
    }),
    (n.prototype.use = function(e) {
      e(n)
    }),
    i.each(['enter', 'leave', 'render'], function(e) {
      n.prototype[
        'on' +
          e.replace(/^[a-z]/, function(e) {
            return e.toUpperCase()
          })
      ] = function(t, r) {
        if (i.isFunction(r)) {
          var a = this.getRouterConfig(t)
          a && a._emitter.on(e, r)
        }
      }
    }),
    (n.app = new n({ mode: 'hash' }, !1)),
    (r.exports = n)
})
define('base:widget/small-flow/small-flow-util.js', function(n, a, i) {
  i.exports.isSmallFlow = function(n) {
    return window.yunData &&
      window.yunData.sampling &&
      n &&
      window.yunData.sampling.indexOf(n) > -1
      ? !0
      : !1
  }
})
define('base:widget/tools/service/tools.browser.js', function(e, r, t) {
  var i = window,
    s = i.document,
    o = null,
    a = null
  t.exports = {
    client: function() {
      if (o) return o
      var e = { ie: 0, gecko: 0, webkit: 0, khtml: 0, opera: 0, ver: null },
        r = {
          ie: 0,
          firefox: 0,
          safari: 0,
          konq: 0,
          opera: 0,
          chrome: 0,
          ver: null
        },
        t = '',
        s = i.navigator.userAgent
      if (i.opera)
        (e.ver = i.opera.version()),
          (e.opera = parseFloat(e.ver)),
          (t = 'opera' + e.opera)
      else if (/AppleWebKit\/(\S+)/.test(s)) {
        if (
          ((e.ver = RegExp.$1),
          (e.webkit = parseFloat(e.ver)),
          /Chrome\/(\S+)/.test(s))
        )
          (r.ver = RegExp.$1),
            (r.chrome = parseFloat(r.ver)),
            (t = 'chrome' + r.chrome)
        else if (/Version\/(\S+)/.test(s))
          (r.ver = RegExp.$1),
            (r.safari = parseFloat(r.ver)),
            (t = 'safari' + r.safari)
        else {
          var a = 1
          ;(a =
            e.webkit < 100
              ? 1
              : e.webkit < 312
              ? 1.2
              : e.webkit < 412
              ? 1.3
              : 2),
            (r.safari = r.ver = a),
            (t = 'safari' + r.safari)
        }
        ;/Edge\/(\S+)/.test(s) &&
          ((r.ver = RegExp.$1), (e.ie = 'edge'), (t = 'edge'))
      } else
        /KHTML\/(\S+)/.test(s) || /Konqueror\/(\S+)/.test(s)
          ? ((e.ver = RegExp.$1), (e.khtml = parseFloat(e.ver)))
          : /rv:([^\)]+)[)] Gecko\/\d{8}/.test(s)
          ? ((e.ver = RegExp.$1),
            (e.gecko = parseFloat(e.ver)),
            /Firefox\/(\S+)/.test(s) &&
              ((r.ver = RegExp.$1),
              (r.firefox = parseFloat(r.ver)),
              (t = 'firefox' + r.firefox)))
          : /MSIE\s([^;]+)/.test(s)
          ? ((e.ver = RegExp.$1), (e.ie = parseFloat(e.ver)), (t = 'ie' + e.ie))
          : /WOW64\;\sTrident\/7.0/i.test(s)
          ? ((e.ver = 11), (e.ie = 11), (t = 'ie11'))
          : /Edge\/(\d+)/.test(s) &&
            ((e.ver = RegExp.$1), (e.ie = 'edge'), (t = 'edge'))
      return (
        (r.ie = e.ie),
        (r.opera = e.opera),
        (o = { engine: e, browser: r, browserString: t })
      )
    },
    os: function() {
      if (a) return a
      var e = navigator.userAgent
      return (
        /windows\s/i.test(e)
          ? (a = 'windows')
          : /iphone/i.test(e)
          ? (a = 'ios')
          : /ipad/i.test(e)
          ? (a = 'ios')
          : /mac\sos\s/i.test(e)
          ? (a = 'mac')
          : /android\s/i.test(e)
          ? (a = 'android')
          : /linux/i.test(e)
          ? (a = 'linux')
          : /unix/i.test(e) && (a = 'unix'),
        a
      )
    },
    css3Support: function(e) {
      var r = s.createElement('div'),
        t = 'Khtml O Moz Webkit'.split(' '),
        i = t.length
      if (e in r.style) return !0
      if ('-ms-' + e in r.style) return !0
      for (
        e = e.replace(/^[a-z]/, function(e) {
          return e.toUpperCase()
        });
        i--;

      )
        if (t[i] + e in r.style) return !0
      return !1
    }
  }
})
define('base:widget/tools/service/tools.cookie.js', function(e, o, t) {
  var i = window,
    n = i.document,
    c = i.decodeURI
  t.exports = {
    setCookie: function(e, o, t, i, c) {
      var s = new Date(),
        a = '',
        r = ''
      s.setDate(s.getDate() + t),
        c && (a = ';domain=' + c),
        i && (r = ';path=' + i),
        (n.cookie =
          e +
          '=' +
          escape(o) +
          (null == t ? '' : ';expires=' + s.toGMTString()) +
          r +
          a)
    },
    getCookie: function(e) {
      var o, t
      return n.cookie.length > 0 && ((o = n.cookie.indexOf(e + '=')), -1 != o)
        ? ((o = o + e.length + 1),
          (t = n.cookie.indexOf(';', o)),
          -1 == t && (t = n.cookie.length),
          c(n.cookie.substring(o, t)))
        : ''
    }
  }
})
define('base:widget/tools/service/tools.date.js', function(e, t, n) {
  var g = window,
    o = g.String,
    i = g.Date,
    r = e('base:widget/libs/underscore.js')
  n.exports = {
    toDateString: function() {
      var e = new i(),
        t = e.getMonth() + 1,
        n = e.getDate(),
        g = e.getHours(),
        r = e.getMinutes()
      return (
        e.getFullYear() +
        '-' +
        (o(t).length < 2 ? '0' + t : t) +
        '-' +
        (o(n).length < 2 ? '0' + n : n) +
        ' ' +
        (o(g).length < 2 ? '0' + g : g) +
        ':' +
        (o(r).length < 2 ? '0' + r : r)
      )
    },
    parseDate: function(e) {
      var t, n
      return (
        (t = new i(1e3 * e)),
        (n = [
          t.getFullYear(),
          t.getMonth() + 1,
          t.getDate(),
          t.getHours(),
          t.getMinutes(),
          t.getSeconds()
        ]),
        r.each(n, function(e, t) {
          9 >= e && (n[t] = '0' + e)
        }),
        (n = n.slice(0, 3).join('-') + ' ' + n.slice(3, 5).join(':'))
      )
    }
  }
})
define('base:widget/tools/service/tools.flash.js', function(
  require,
  exports,
  module
) {
  var win = window,
    String = win.String,
    Date = win.Date,
    storage = require('base:widget/storage/storage.js')
  module.exports = {
    getFlashVersion: function() {
      var f = null,
        n = navigator
      if (n.plugins && n.plugins.length) {
        for (var ii = 0, len = n.plugins.length; len > ii; ii++)
          if (-1 != n.plugins[ii].name.indexOf('Shockwave Flash')) {
            f = n.plugins[ii].description.split('Shockwave Flash ')[1]
            break
          }
      } else if (window.ActiveXObject)
        for (var ii = 11; ii >= 2; ii--)
          try {
            var fl = eval(
              "new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');"
            )
            if (fl) {
              f = ii + '.0'
              break
            }
          } catch (e) {}
      return f
    },
    checkFlashSupport: function() {
      var e = storage.getItem('FlashSupport')
      if (e && 'true' === e) return !0
      if (e && 'false' === e) return !1
      var i = this.getFlashVersion()
      return !!(i && parseFloat(i, 10) >= 11.4)
    }
  }
})
define('base:widget/tools/service/tools.format.js', function(e, t, o) {
  o.exports = {
    toFriendlyFileSize: function(e, t) {
      return (
        t && 'number' == typeof e && (e /= 8),
        'number' == typeof e || ('string' == typeof e && /^[\d\.]+$/.test(e))
          ? 1024 > e
            ? Math.round(e) + 'B'
            : 1048576 > e && e >= 1024
            ? Math.round(e / 1024) + 'KB'
            : 1073741824 > e && e >= 1048576
            ? (10 * (e / 1024 / 1024).toFixed(1)) / 10 + 'M'
            : (100 * (e / 1024 / 1024 / 1024).toFixed(2)) / 100 + 'G'
          : '-'
      )
    }
  }
})
define('base:widget/tools/service/tools.html.js', function(e, t, c) {
  c.exports = {
    encodeHTML: function(e) {
      return (
        'string' != typeof e && (e = ''),
        e
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
      )
    },
    selectTextField: function(e, t, c) {
      var a
      e.createTextRange
        ? ((a = e.createTextRange()),
          a.collapse(!0),
          a.moveStart('character', t),
          a.moveEnd('character', c),
          a.select())
        : e.setSelectionRange
        ? e.setSelectionRange(t, c)
        : e.selectionStart && ((e.selectionStart = t), (e.selectionEnd = c)),
        e.focus()
    }
  }
})
define('base:widget/tools/service/tools.object.js', function(r, t, o) {
  o.exports = {
    cloneObject: function(r) {
      var t = r.constructor === Array ? [] : {}
      for (var o in r)
        r.hasOwnProperty(o) &&
          (t[o] = 'object' == typeof r[o] ? this.cloneObject(r[o]) : r[o])
      return t
    },
    isArray: function(r) {
      return Array.isArray
        ? Array.isArray(r)
        : '[object Array]' === Object.prototype.toString.call(r)
    }
  }
})
define('base:widget/tools/service/tools.observer.js', function(e, o, r) {
  var t = function(o) {
    var r =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    if (
      (r ||
        (e('base:widget/libs/MutationObserver.js'),
        (r = window.MutationObserver)),
      'object' != typeof o)
    )
      throw new Error('[Observer error]: config is not a object')
    if (!o.target)
      throw new Error('[Observer error]: please add the observer dom')
    if ('object' != typeof o.options)
      throw new Error('[Observer error]: please point the Specific change')
    ;(this.observer = new r(
      o.callback ||
        function(e) {
          for (var o = 0, r = e.length; r > o; o++) {
            var t = e[o]
            console.log('Mutation type: ' + t.type),
              console.log('Mutation target: ' + t.target)
          }
        }
    )),
      this.observer.observe(o.target, o.options)
  }
  ;(t.prototype.disconnect = function() {
    this.observer.disconnect()
  }),
    (t.prototype.takeRecords = function() {
      this.Observer.takeRecords()
    }),
    (r.exports.observerDom = t)
})
define('base:widget/tools/service/tools.path.js', function(t, e, n) {
  n.exports = {
    parseDirPath: function(t) {
      return t.substring(t.indexOf(':/') + 1)
    },
    parseRootDir: function(t) {
      return t.length < 2
        ? '/'
        : ((t = t.slice(1)), (t = t.slice(0, t.indexOf('/'))), '/' + t)
    },
    isRootDir: function(t) {
      return 0 === t.lastIndexOf('/') ? !0 : !1
    },
    parseDirFromPath: function(t, e) {
      if (t.lastIndexOf('/') === t.length - 1) {
        if (e) return ''
        t = t.substring(0, t.lastIndexOf('/'))
      }
      var n = t.substring(t.lastIndexOf('/') + 1)
      return '' === n && (n = '/'), n
    },
    parseFullDirFromPath: function(t) {
      return t.substring(0, t.lastIndexOf('/'))
    },
    parseParentPath: function(t) {
      var e = t.lastIndexOf('/')
      return (
        e + 1 === t.length &&
          ((t = t.substring(0, e)), (e = t.lastIndexOf('/'))),
        t.substring(0, e + 1)
      )
    },
    getFileCategory: function(t) {
      return -1 !== t.lastIndexOf('.')
        ? t.substring(t.lastIndexOf('.') + 1).toLowerCase()
        : void 0
    },
    PARTICULAR_DIR_MAP: {
      '/apps': '/我的应用数据',
      '/百度云收藏': '/百度云收藏',
      '/来自PC的备份文件': '/来自PC的备份文件',
      '/我的分享': '/我的分享',
      '/我的作品': '/我的作品'
    },
    sliceDir: function(t) {
      return '/' == t && (t = ''), t.split('/')
    },
    getNormalizedPath: function(t, e) {
      var n = this.PARTICULAR_DIR_MAP,
        r = n[t],
        i = r
      if ('undefined' == typeof r) {
        var s = this.sliceDir(t),
          a = '/' + s[1],
          u = n[a]
        i = 'undefined' != typeof u ? t.replace(a, u) : t
      }
      return e === !0 ? this.parseDirFromPath(i) : i
    },
    getFileNameByPath: function(t) {
      if (!t) return ''
      var e = t.match(/\/([^\/]+)$/)
      return e && e[1] ? e[1] : t
    }
  }
})
define('base:widget/tools/service/tools.string.js', function(r, t, e) {
  e.exports = {
    len: function(r) {
      var t = /[^\x00-\xFF]/g
      return r.replace(t, '..').length
    },
    trim: function(r) {
      return r.replace(/^\s+|\s+$/gi, '')
    },
    chineseSubstr: function(r, t, e) {
      for (var a, c = /[^\x00-\xFF]/g, n = 0; t > n; )
        n++ && r.charAt(n).match(c) && t--
      for (n = t, a = t + e; a > n; ) n++ && r.charAt(n).match(c) && a--
      return r.substring(t, a)
    },
    toEntity: function(r) {
      return r
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    },
    padStart: function(r, t, e) {
      r = String(r)
      var a = -1
      for (e || 0 === e || (e = ' '), t -= r.length; ++a < t; ) r = e + r
      return r
    },
    base64Encode: function(r) {
      var t,
        e,
        a,
        c,
        n,
        o,
        h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      for (a = r.length, e = 0, t = ''; a > e; ) {
        if (((c = 255 & r.charCodeAt(e++)), e == a)) {
          ;(t += h.charAt(c >> 2)), (t += h.charAt((3 & c) << 4)), (t += '==')
          break
        }
        if (((n = r.charCodeAt(e++)), e == a)) {
          ;(t += h.charAt(c >> 2)),
            (t += h.charAt(((3 & c) << 4) | ((240 & n) >> 4))),
            (t += h.charAt((15 & n) << 2)),
            (t += '=')
          break
        }
        ;(o = r.charCodeAt(e++)),
          (t += h.charAt(c >> 2)),
          (t += h.charAt(((3 & c) << 4) | ((240 & n) >> 4))),
          (t += h.charAt(((15 & n) << 2) | ((192 & o) >> 6))),
          (t += h.charAt(63 & o))
      }
      return t
    }
  }
})
define('base:widget/tools/service/tools.throttle.js', function(t, e, n) {
  n.exports = {
    throttle: function(t, e, n) {
      var o = null,
        i = null
      return function() {
        if (n) {
          var l = +new Date()
          if ((null === i && (i = l), l - i > n))
            return clearTimeout(o), t(), void (i = l)
        }
        clearTimeout(o),
          (o = setTimeout(function() {
            t()
          }, e))
      }
    }
  }
})
define('base:widget/tools/service/tools.tmpl.js', function(e, t, s) {
  var o = e('base:widget/libs/underscore.js')
  s.exports = {
    tmpl: function(e, t) {
      return o.template(e, t)
    }
  }
})
define('base:widget/tools/service/tools.url.js', function(e, t, o) {
  var n = window,
    r = n.location,
    R = n.RegExp
  o.exports = {
    getParam: function(e, t) {
      var o, n
      return (
        (o = new R('(?:^|\\?|#|&)' + e + '=([^&#]*)(?:$|&|#)', 'i')),
        (n = o.exec(t || r.href)),
        n ? encodeURI(n[1]) : ''
      )
    },
    setParam: function(e, t, o) {
      var n, i
      return (
        (n = new R('(?:^|\\?|#|&)' + e + '=([^&#]*)(?:$|&|#)', 'i')),
        (i = n.exec(o || r.href)),
        null != i ? o.replace(i[1], t) : null
      )
    },
    URL_PROTOCOL: 1,
    URL_PORT: 2,
    URL_HOST: 3,
    URL_PRIMARY: 4,
    URL: 5,
    getURLComponent: function(e, t) {
      return (
        (t = t || r),
        e === this.URL_PROTOCOL
          ? t.protocol
          : e === this.URL_PORT
          ? t.port
          : e === this.URL_HOST
          ? t.host
          : e === this.URL_PRIMARY
          ? t.protocol + '//' + t.host
          : null
      )
    }
  }
})
define('base:widget/tools/tools.js', function(e, t, o) {
  var s = e('base:widget/libs/underscore.js'),
    r = [
      'browser',
      'cookie',
      'date',
      'flash',
      'format',
      'html',
      'path',
      'string',
      'object',
      'tmpl',
      'url',
      'event',
      'observer',
      'throttle',
      'util'
    ],
    i = {}
  s.each(r, function(t) {
    s.extend(i, e('base:widget/tools/service/tools.' + t + '.js'))
  }),
    (o.exports = i)
})
define('base:widget/vip/vip.js', function(n, i, a) {
  a.exports.getVipValue = function() {
    var n = 0
    return window.yunData
      ? (1 === window.yunData.ISVIP && (n = 1),
        1 === window.yunData.ISSVIP && (n = 2),
        n)
      : n
  }
})
