webpackJsonp(["theme.module"],{

/***/ "../../../../../src/app/views/theme/colors.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <i class=\"icon-drop\"></i> Theme colors\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-primary\">Primary</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-secondary\">Secondary</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-success\">Success</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-danger\">Danger</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-warning\">Warning</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-info\">Info</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-light\">Light</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-dark\">Dark</div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <i class=\"icon-drop\"></i> Grays\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row mb-3\">\n        <div class=\"col-md-4\">\n          <div class=\"p-3 bg-gray-100\">100</div>\n          <div class=\"p-3 bg-gray-200\">200</div>\n          <div class=\"p-3 bg-gray-300\">300</div>\n          <div class=\"p-3 bg-gray-400\">400</div>\n          <div class=\"p-3 bg-gray-500\">500</div>\n          <div class=\"p-3 bg-gray-600\">600</div>\n          <div class=\"p-3 bg-gray-700\">700</div>\n          <div class=\"p-3 bg-gray-800\">800</div>\n          <div class=\"p-3 bg-gray-900\">900</div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <i class=\"icon-drop\"></i> Additional colors\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-blue\">Blue</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-indigo\">Indigo</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-purple\">Purple</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-pink\">Pink</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-red\">Red</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-orange\">Orange</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-yellow\">Yellow</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-green\">Green</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-teal\">Teal</div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"p-3 mb-3 bg-cyan\">Cyan</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/theme/colors.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorsComponent = /** @class */ (function () {
    function ColorsComponent() {
    }
    ColorsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/views/theme/colors.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], ColorsComponent);
    return ColorsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/views/theme/theme-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__colors_component__ = __webpack_require__("../../../../../src/app/views/theme/colors.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__typography_component__ = __webpack_require__("../../../../../src/app/views/theme/typography.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        data: {
            title: 'Theme'
        },
        children: [
            {
                path: 'colors',
                component: __WEBPACK_IMPORTED_MODULE_2__colors_component__["a" /* ColorsComponent */],
                data: {
                    title: 'Colors'
                }
            },
            {
                path: 'typography',
                component: __WEBPACK_IMPORTED_MODULE_3__typography_component__["a" /* TypographyComponent */],
                data: {
                    title: 'Typography'
                }
            }
        ]
    }
];
var ThemeRoutingModule = /** @class */ (function () {
    function ThemeRoutingModule() {
    }
    ThemeRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], ThemeRoutingModule);
    return ThemeRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/views/theme/theme.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeModule", function() { return ThemeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__colors_component__ = __webpack_require__("../../../../../src/app/views/theme/colors.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__typography_component__ = __webpack_require__("../../../../../src/app/views/theme/typography.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__theme_routing_module__ = __webpack_require__("../../../../../src/app/views/theme/theme-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular




// Theme Routing

var ThemeModule = /** @class */ (function () {
    function ThemeModule() {
    }
    ThemeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_4__theme_routing_module__["a" /* ThemeRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__colors_component__["a" /* ColorsComponent */],
                __WEBPACK_IMPORTED_MODULE_3__typography_component__["a" /* TypographyComponent */]
            ]
        })
    ], ThemeModule);
    return ThemeModule;
}());



/***/ }),

/***/ "../../../../../src/app/views/theme/typography.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Headings\n    </div>\n    <div class=\"card-body\">\n      <p>Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.</p>\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th>Heading</th>\n            <th>Example</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>\n              <p><code class=\"highlighter-rouge\">&lt;h1&gt;&lt;/h1&gt;</code></p>\n            </td>\n            <td><span class=\"h1\">h1. Bootstrap heading</span></td>\n          </tr>\n          <tr>\n            <td>\n              <p><code class=\"highlighter-rouge\">&lt;h2&gt;&lt;/h2&gt;</code></p>\n            </td>\n            <td><span class=\"h2\">h2. Bootstrap heading</span></td>\n          </tr>\n          <tr>\n            <td>\n              <p><code class=\"highlighter-rouge\">&lt;h3&gt;&lt;/h3&gt;</code></p>\n            </td>\n            <td><span class=\"h3\">h3. Bootstrap heading</span></td>\n          </tr>\n          <tr>\n            <td>\n              <p><code class=\"highlighter-rouge\">&lt;h4&gt;&lt;/h4&gt;</code></p>\n            </td>\n            <td><span class=\"h4\">h4. Bootstrap heading</span></td>\n          </tr>\n          <tr>\n            <td>\n              <p><code class=\"highlighter-rouge\">&lt;h5&gt;&lt;/h5&gt;</code></p>\n            </td>\n            <td><span class=\"h5\">h5. Bootstrap heading</span></td>\n          </tr>\n          <tr>\n            <td>\n              <p><code class=\"highlighter-rouge\">&lt;h6&gt;&lt;/h6&gt;</code></p>\n            </td>\n            <td><span class=\"h6\">h6. Bootstrap heading</span></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Headings\n    </div>\n    <div class=\"card-body\">\n      <p><code class=\"highlighter-rouge\">.h1</code> through <code class=\"highlighter-rouge\">.h6</code> classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element.</p>\n      <div class=\"bd-example\">\n        <p class=\"h1\">h1. Bootstrap heading</p>\n        <p class=\"h2\">h2. Bootstrap heading</p>\n        <p class=\"h3\">h3. Bootstrap heading</p>\n        <p class=\"h4\">h4. Bootstrap heading</p>\n        <p class=\"h5\">h5. Bootstrap heading</p>\n        <p class=\"h6\">h6. Bootstrap heading</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Display headings\n    </div>\n    <div class=\"card-body\">\n      <p>Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a <strong>display heading</strong>—a larger, slightly more opinionated heading style.</p>\n      <div class=\"bd-example bd-example-type\">\n        <table class=\"table\">\n          <tbody>\n            <tr>\n              <td><span class=\"display-1\">Display 1</span></td>\n            </tr>\n            <tr>\n              <td><span class=\"display-2\">Display 2</span></td>\n            </tr>\n            <tr>\n              <td><span class=\"display-3\">Display 3</span></td>\n            </tr>\n            <tr>\n              <td><span class=\"display-4\">Display 4</span></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Inline text elements\n    </div>\n    <div class=\"card-body\">\n      <p>Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a <strong>display heading</strong>—a larger, slightly more opinionated heading style.</p>\n      <div class=\"bd-example\">\n        <p>You can use the mark tag to <mark>highlight</mark> text.</p>\n        <p><del>This line of text is meant to be treated as deleted text.</del></p>\n        <p><s>This line of text is meant to be treated as no longer accurate.</s></p>\n        <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>\n        <p><u>This line of text will render as underlined</u></p>\n        <p><small>This line of text is meant to be treated as fine print.</small></p>\n        <p><strong>This line rendered as bold text.</strong></p>\n        <p><em>This line rendered as italicized text.</em></p>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Description list alignment\n    </div>\n    <div class=\"card-body\">\n      <p>Align terms and descriptions horizontally by using our grid system’s predefined classes (or semantic mixins). For longer terms, you can optionally add a <code class=\"highlighter-rouge\">.text-truncate</code> class to truncate the text with an ellipsis.</p>\n      <div class=\"bd-example\">\n        <dl class=\"row\">\n          <dt class=\"col-sm-3\">Description lists</dt>\n          <dd class=\"col-sm-9\">A description list is perfect for defining terms.</dd>\n\n          <dt class=\"col-sm-3\">Euismod</dt>\n          <dd class=\"col-sm-9\">\n            <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>\n            <p>Donec id elit non mi porta gravida at eget metus.</p>\n          </dd>\n\n          <dt class=\"col-sm-3\">Malesuada porta</dt>\n          <dd class=\"col-sm-9\">Etiam porta sem malesuada magna mollis euismod.</dd>\n\n          <dt class=\"col-sm-3 text-truncate\">Truncated term is truncated</dt>\n          <dd class=\"col-sm-9\">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>\n\n          <dt class=\"col-sm-3\">Nesting</dt>\n          <dd class=\"col-sm-9\">\n            <dl class=\"row\">\n              <dt class=\"col-sm-4\">Nested definition list</dt>\n              <dd class=\"col-sm-8\">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>\n            </dl>\n          </dd>\n        </dl>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/theme/typography.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypographyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TypographyComponent = /** @class */ (function () {
    function TypographyComponent() {
    }
    TypographyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/views/theme/typography.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TypographyComponent);
    return TypographyComponent;
}());



/***/ })

});
//# sourceMappingURL=theme.module.chunk.js.map