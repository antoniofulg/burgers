(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["demo"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Login.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Auth/Login.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/loading */ "./resources/js/mixins/loading.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  computed: {
    endpoint: function endpoint() {
      return "/api/login";
    }
  },
  created: function created() {
    console.log(this.$store.getters.getUser);
  },
  data: function data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function login() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.isLoading = true;
                _context.next = 4;
                return axios.post(_this.endpoint, {
                  email: _this.email,
                  password: _this.password
                });

              case 4:
                response = _context.sent;

                if (response.data.concluded) {
                  _this.$store.commit('setUser', response.data.user);

                  sessionStorage.setItem('user', JSON.stringify(response.data.user));

                  _this.$router.push({
                    name: 'dashboard',
                    params: {
                      toast: {
                        type: 'success',
                        title: 'Ação não concluída!',
                        message: response.data.message
                      }
                    }
                  });
                } else {
                  console.log(response.data.message);
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0.response);

              case 11:
                _this.isLoading = false;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    }
  },
  mixins: [_mixins_loading__WEBPACK_IMPORTED_MODULE_2__["default"]],
  validations: {
    email: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"],
      email: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["email"]
    },
    password: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"]
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Register.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Auth/Register.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_toasts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/toasts */ "./resources/js/mixins/toasts.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  computed: {
    endpoint: function endpoint() {
      return "/api/register";
    }
  },
  created: function created() {
    console.log(this.$store.getters.getUser);
  },
  data: function data() {
    return {
      email: '',
      email_unique: '',
      password: '',
      password_confirmation: '',
      name: ''
    };
  },
  methods: {
    register: function register() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response, field;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.post(_this.endpoint, {
                  email: _this.email,
                  password: _this.password,
                  password_confirmation: _this.password_confirmation,
                  name: _this.name
                });

              case 3:
                response = _context.sent;

                if (response.data.concluded) {
                  _this.$store.commit('setUser', response.data.user);

                  sessionStorage.setItem('user', JSON.stringify(response.data.user));

                  _this.$router.push({
                    name: 'profile'
                  });
                } else {
                  _this.warningToast('Ação não concluída!', response.data.message);

                  for (field in response.data.validation) {
                    _this.warningToast('Erro de validação!', response.data.validation[field]);
                  }

                  _this.email_unique = _this.email;
                }

                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0.response);

                _this.dangerToast('Ação não concluída!', 'Não foi possível resposta do servidor!');

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    }
  },
  mixins: [_mixins_toasts__WEBPACK_IMPORTED_MODULE_2__["default"]],
  validations: {
    name: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"]
    },
    email: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"],
      email: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["email"],
      not: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["not"])(Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["sameAs"])('email_unique'))
    },
    password: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"],
      minLength: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["minLength"])(8)
    },
    password_confirmation: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"],
      minLength: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["minLength"])(8),
      sameAsPassword: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["sameAs"])('password')
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Login.vue?vue&type=template&id=be5ebcfe&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Auth/Login.vue?vue&type=template&id=be5ebcfe& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "row justify-content-center" },
    [
      _c("loading", {
        attrs: {
          active: _vm.isLoading,
          "can-cancel": false,
          "is-full-page": true
        },
        on: {
          "update:active": function($event) {
            _vm.isLoading = $event
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-5 col-md-7" }, [
        _c("div", { staticClass: "card bg-secondary shadow border-0" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "card-body px-lg-5 py-lg-5" }, [
            _vm._m(1),
            _vm._v(" "),
            _c(
              "form",
              { attrs: { role: "form" } },
              [
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "email" } }, [_vm._v("Email")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.$v.email.$model,
                        expression: "$v.email.$model"
                      }
                    ],
                    staticClass: "form-control form-control-user",
                    class: { "is-invalid": _vm.$v.email.$error },
                    attrs: {
                      type: "email",
                      id: "email",
                      placeholder: "Insira seu endereço de e-mail"
                    },
                    domProps: { value: _vm.$v.email.$model },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.$v.email, "$model", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  !_vm.$v.email.required
                    ? _c("div", { staticClass: "invalid-feedback" }, [
                        _vm._v(
                          "\n                            Por favor, preencha este campo.\n                        "
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.$v.email.email
                    ? _c("div", { staticClass: "invalid-feedback" }, [
                        _vm._v(
                          "\n                            Por favor, preencha com um email válido.\n                        "
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "password" } }, [
                    _vm._v("Senha")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.$v.password.$model,
                        expression: "$v.password.$model"
                      }
                    ],
                    staticClass: "form-control form-control-user",
                    class: { "is-invalid": _vm.$v.password.$error },
                    attrs: {
                      type: "password",
                      id: "password",
                      placeholder: "Insira sua senha"
                    },
                    domProps: { value: _vm.$v.password.$model },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.$v.password, "$model", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  !_vm.$v.password.required
                    ? _c("div", { staticClass: "invalid-feedback" }, [
                        _vm._v(
                          "\n                            Por favor, preencha este campo.\n                        "
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c(
                  "base-checkbox",
                  { staticClass: "custom-control-alternative" },
                  [
                    _c("span", { staticClass: "text-muted" }, [
                      _vm._v("Lembrar-me")
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "text-center" },
                  [
                    _c(
                      "base-button",
                      {
                        staticClass: "my-4",
                        attrs: { disabled: _vm.$v.$invalid, type: "primary" },
                        on: { click: _vm.login }
                      },
                      [_c("span", [_vm._v("Entrar")])]
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row mt-3" }, [
          _vm._m(2),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-6 text-right" },
            [
              _c(
                "router-link",
                { staticClass: "text-light", attrs: { to: "/register" } },
                [_c("small", [_vm._v("Criar uma nova conta")])]
              )
            ],
            1
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header bg-transparent pb-5" }, [
      _c("div", { staticClass: "text-muted text-center mt-2 mb-3" }, [
        _c("small", [_vm._v("Entre com")])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "btn-wrapper text-center" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-neutral btn-icon",
            attrs: { href: "#", disabled: "" }
          },
          [
            _c("span", { staticClass: "btn-inner--icon" }, [
              _c("img", { attrs: { src: "img/icons/common/facebook.svg" } })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "btn-inner--text" }, [_vm._v("Facebook")])
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-neutral btn-icon",
            attrs: { href: "#", disabled: "" }
          },
          [
            _c("span", { staticClass: "btn-inner--icon" }, [
              _c("img", { attrs: { src: "img/icons/common/google.svg" } })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "btn-inner--text" }, [_vm._v("Google")])
          ]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-center text-muted mb-4" }, [
      _c("small", [_vm._v("Ou entre com suas credenciais")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-6" }, [
      _c("a", { staticClass: "text-light", attrs: { href: "#" } }, [
        _c("small", [_vm._v("Esqueceu sua senha?")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Register.vue?vue&type=template&id=1629088a&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Auth/Register.vue?vue&type=template&id=1629088a& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "row justify-content-center" },
    [
      _c("loading", {
        attrs: {
          active: _vm.isLoading,
          "can-cancel": false,
          "is-full-page": true
        },
        on: {
          "update:active": function($event) {
            _vm.isLoading = $event
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-5 col-md-7" }, [
        _c("div", { staticClass: "card bg-secondary shadow border-0" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "card-body px-lg-5 py-lg-5" }, [
            _vm._m(1),
            _vm._v(" "),
            _c("form", { attrs: { role: "form" } }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "name" } }, [_vm._v("Nome")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.$v.name.$model,
                      expression: "$v.name.$model"
                    }
                  ],
                  staticClass: "form-control",
                  class: { "is-invalid": _vm.$v.name.$error },
                  attrs: { type: "text", id: "name" },
                  domProps: { value: _vm.$v.name.$model },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.$v.name, "$model", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                !_vm.$v.name.required
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Por favor, preencha este campo.\n                        "
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "email" } }, [_vm._v("Email")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.$v.email.$model,
                      expression: "$v.email.$model"
                    }
                  ],
                  staticClass: "form-control",
                  class: { "is-invalid": _vm.$v.email.$error },
                  attrs: { type: "email", id: "email" },
                  domProps: { value: _vm.$v.email.$model },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.$v.email, "$model", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                !_vm.$v.email.required
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Por favor, preencha este campo.\n                        "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.$v.email.email
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Por favor, preencha com um email válido.\n                        "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.$v.email.not
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Este email já está sendo utilizado.\n                        "
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "password" } }, [_vm._v("Senha")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.$v.password.$model,
                      expression: "$v.password.$model"
                    }
                  ],
                  staticClass: "form-control",
                  class: { "is-invalid": _vm.$v.password.$error },
                  attrs: { type: "password", id: "password" },
                  domProps: { value: _vm.$v.password.$model },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.$v.password, "$model", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                !_vm.$v.password.required
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Por favor, preencha este campo.\n                        "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.$v.password.minLength
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Este campo deve ter pelo menos " +
                          _vm._s(_vm.$v.password.$params.minLength.min) +
                          " caracteres.\n                        "
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "password_confirmation" } }, [
                  _vm._v("Confirmar senha")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.$v.password_confirmation.$model,
                      expression: "$v.password_confirmation.$model"
                    }
                  ],
                  staticClass: "form-control",
                  class: { "is-invalid": _vm.$v.password_confirmation.$error },
                  attrs: { type: "password", id: "password_confirmation" },
                  domProps: { value: _vm.$v.password_confirmation.$model },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.$v.password_confirmation,
                        "$model",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                !_vm.$v.password_confirmation.required
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Por favor, preencha este campo.\n                        "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.$v.password_confirmation.sameAs
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Este campo precisa coincidir com o campo senha.\n                        "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.$v.password_confirmation.minLength
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(
                        "\n                            Este campo deve ter pelo menos " +
                          _vm._s(
                            _vm.$v.password_confirmation.$params.minLength.min
                          ) +
                          " caracteres.\n                        "
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row my-4" }, [
                _c(
                  "div",
                  { staticClass: "col-12" },
                  [
                    _c(
                      "base-checkbox",
                      { staticClass: "custom-control-alternative" },
                      [
                        _c("span", { staticClass: "text-muted" }, [
                          _vm._v("Eu concordo com os "),
                          _c("a", { attrs: { href: "#!" } }, [
                            _vm._v("Termos de Uso")
                          ])
                        ])
                      ]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-center" },
                [
                  _c(
                    "base-button",
                    {
                      staticClass: "my-4",
                      attrs: { disabled: _vm.$v.$invalid, type: "primary" },
                      on: { click: _vm.register }
                    },
                    [_vm._v("Criar conta")]
                  )
                ],
                1
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row mt-3" }, [
          _vm._m(2),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-6 text-right" },
            [
              _c(
                "router-link",
                { staticClass: "text-light", attrs: { to: "/login" } },
                [_c("small", [_vm._v("Já possui uma conta?")])]
              )
            ],
            1
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header bg-transparent pb-5" }, [
      _c("div", { staticClass: "text-muted text-center mt-2 mb-3" }, [
        _c("small", [_vm._v("Entre com")])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "btn-wrapper text-center" }, [
        _c(
          "a",
          { staticClass: "btn btn-neutral btn-icon", attrs: { href: "#" } },
          [
            _c("span", { staticClass: "btn-inner--icon" }, [
              _c("img", { attrs: { src: "img/icons/common/facebook.svg" } })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "btn-inner--text" }, [_vm._v("Facebook")])
          ]
        ),
        _vm._v(" "),
        _c(
          "a",
          { staticClass: "btn btn-neutral btn-icon", attrs: { href: "#" } },
          [
            _c("span", { staticClass: "btn-inner--icon" }, [
              _c("img", { attrs: { src: "img/icons/common/google.svg" } })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "btn-inner--text" }, [_vm._v("Google")])
          ]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-center text-muted mb-4" }, [
      _c("small", [_vm._v("Ou cadastre-se com suas credenciais")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-6" }, [
      _c("a", { staticClass: "text-light", attrs: { href: "#" } }, [
        _c("small", [_vm._v("Esqueceu sua senha?")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/mixins/loading.js":
/*!****************************************!*\
  !*** ./resources/js/mixins/loading.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/vue-loading.min.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_loading_overlay_dist_vue_loading_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-loading-overlay/dist/vue-loading.css */ "./node_modules/vue-loading-overlay/dist/vue-loading.css");
/* harmony import */ var vue_loading_overlay_dist_vue_loading_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay_dist_vue_loading_css__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading: vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default.a
  }
});

/***/ }),

/***/ "./resources/js/mixins/toasts.js":
/*!***************************************!*\
  !*** ./resources/js/mixins/toasts.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    dangerToast: function dangerToast(title, body) {
      this.$bvToast.toast("".concat(body), {
        title: "".concat(title),
        toaster: 'b-toaster-top-right',
        solid: true,
        appendToast: false,
        variant: 'danger'
      });
    },
    infoToast: function infoToast(title, body) {
      this.$bvToast.toast("".concat(body), {
        title: "".concat(title),
        toaster: 'b-toaster-top-right',
        solid: true,
        appendToast: false,
        variant: 'info'
      });
    },
    successToast: function successToast(title, body) {
      this.$bvToast.toast("".concat(body), {
        title: "".concat(title),
        toaster: 'b-toaster-top-right',
        solid: true,
        appendToast: false,
        variant: 'success'
      });
    },
    warningToast: function warningToast(title, body) {
      this.$bvToast.toast("".concat(body), {
        title: "".concat(title),
        toaster: 'b-toaster-top-right',
        solid: true,
        appendToast: false,
        variant: 'warning'
      });
    }
  },
  mounted: function mounted() {
    if (this.toast) {
      if (this.toast.type === 'success') {
        this.successToast(this.toast.title, this.toast.message);
      } else if (this.toast.type === 'warning') {
        this.warningToast(this.toast.title, this.toast.message);
      } else if (this.toast.type === 'danger') {
        this.dangerToast(this.toast.title, this.toast.message);
      }
    }
  },
  props: ['toast']
});

/***/ }),

/***/ "./resources/js/views/Auth/Login.vue":
/*!*******************************************!*\
  !*** ./resources/js/views/Auth/Login.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_be5ebcfe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=be5ebcfe& */ "./resources/js/views/Auth/Login.vue?vue&type=template&id=be5ebcfe&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/views/Auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_be5ebcfe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_be5ebcfe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Auth/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Auth/Login.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/views/Auth/Login.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Auth/Login.vue?vue&type=template&id=be5ebcfe&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Auth/Login.vue?vue&type=template&id=be5ebcfe& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_be5ebcfe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=be5ebcfe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Login.vue?vue&type=template&id=be5ebcfe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_be5ebcfe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_be5ebcfe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Auth/Register.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Auth/Register.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_vue_vue_type_template_id_1629088a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=1629088a& */ "./resources/js/views/Auth/Register.vue?vue&type=template&id=1629088a&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./resources/js/views/Auth/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_1629088a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_vue_vue_type_template_id_1629088a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Auth/Register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Auth/Register.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Auth/Register.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Auth/Register.vue?vue&type=template&id=1629088a&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Auth/Register.vue?vue&type=template&id=1629088a& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_1629088a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=template&id=1629088a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Auth/Register.vue?vue&type=template&id=1629088a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_1629088a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_1629088a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);