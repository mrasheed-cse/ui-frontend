webpackJsonp(["nsa.module"],{

/***/ "../../../../../src/app/views/nsa/demo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host /deep/ .data-table-row {\r\n    cursor: pointer;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\t\r\n}\r\n\r\n.st-sort-default:before {content: '\\25B1'}\r\n\r\n.st-sort-ascent:before {content: '\\25B2'}\r\n\r\n.st-sort-descent:before {content: '\\25BC'}\r\n\r\n.calendar-container {\r\n    background: url(https://cdn4.iconfinder.com/data/icons/36-slim-icons/87/calender.png) no-repeat right;\r\n    background-size: 24px 24px;\r\n\tcursor: pointer;\r\n\t \r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/views/nsa/discreteprovision.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  discreteprovision works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/views/nsa/discreteprovision.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscreteprovisionComponent; });
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

var DiscreteprovisionComponent = /** @class */ (function () {
    function DiscreteprovisionComponent() {
    }
    DiscreteprovisionComponent.prototype.ngOnInit = function () {
    };
    DiscreteprovisionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-discreteprovision',
            template: __webpack_require__("../../../../../src/app/views/nsa/discreteprovision.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], DiscreteprovisionComponent);
    return DiscreteprovisionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/landingpage.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  landingpage is Blank!\n \n  \n</p>\n"

/***/ }),

/***/ "../../../../../src/app/views/nsa/landingpage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingpageComponent; });
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

var LandingpageComponent = /** @class */ (function () {
    function LandingpageComponent() {
    }
    LandingpageComponent.prototype.ngOnInit = function () {
    };
    LandingpageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-landingpage',
            template: __webpack_require__("../../../../../src/app/views/nsa/landingpage.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], LandingpageComponent);
    return LandingpageComponent;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/nsa-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NsaRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__landingpage_component__ = __webpack_require__("../../../../../src/app/views/nsa/landingpage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__seriesprovision_component__ = __webpack_require__("../../../../../src/app/views/nsa/seriesprovision.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__discreteprovision_component__ = __webpack_require__("../../../../../src/app/views/nsa/discreteprovision.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__seriesprovisionform_component__ = __webpack_require__("../../../../../src/app/views/nsa/seriesprovisionform.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__seriesprovisiondetail_component__ = __webpack_require__("../../../../../src/app/views/nsa/seriesprovisiondetail.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__landingpage_component__["a" /* LandingpageComponent */],
        data: {
            title: 'Landing page'
        }
    },
    {
        path: 'seriesprovision',
        component: __WEBPACK_IMPORTED_MODULE_3__seriesprovision_component__["a" /* SeriesprovisionComponent */],
        data: {
            title: 'Series Provision'
        }
    },
    {
        path: 'seriesprovisionform',
        component: __WEBPACK_IMPORTED_MODULE_5__seriesprovisionform_component__["a" /* SeriesprovisionformComponent */],
        data: {
            title: 'Series Provision Form'
        }
    },
    {
        path: 'seriesprovisiondetail/:wr_BriefName/:wr_BriefId/:hopSequence',
        component: __WEBPACK_IMPORTED_MODULE_6__seriesprovisiondetail_component__["a" /* SeriesprovisiondetailComponent */],
        data: {
            title: 'Series Provision Workflow'
        }
    },
    {
        path: 'discreteprovision',
        component: __WEBPACK_IMPORTED_MODULE_4__discreteprovision_component__["a" /* DiscreteprovisionComponent */],
        data: {
            title: 'Discrete Provision'
        }
    }
];
var NsaRoutingModule = /** @class */ (function () {
    function NsaRoutingModule() {
    }
    NsaRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], NsaRoutingModule);
    return NsaRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/nsa.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NsaModule", function() { return NsaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_collapse__ = __webpack_require__("../../../../ngx-bootstrap/collapse/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_datepicker__ = __webpack_require__("../../../../ngx-bootstrap/datepicker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nsa_routing_module__ = __webpack_require__("../../../../../src/app/views/nsa/nsa-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__landingpage_component__ = __webpack_require__("../../../../../src/app/views/nsa/landingpage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__seriesprovision_component__ = __webpack_require__("../../../../../src/app/views/nsa/seriesprovision.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__discreteprovision_component__ = __webpack_require__("../../../../../src/app/views/nsa/discreteprovision.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular4_smart_table__ = __webpack_require__("../../../../angular4-smart-table/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular4_smart_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular4_smart_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__seriesprovisionform_component__ = __webpack_require__("../../../../../src/app/views/nsa/seriesprovisionform.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__seriesprovisiondetail_component__ = __webpack_require__("../../../../../src/app/views/nsa/seriesprovisiondetail.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var NsaModule = /** @class */ (function () {
    function NsaModule() {
    }
    NsaModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_9_angular4_smart_table__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_collapse__["a" /* CollapseModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_datepicker__["a" /* BsDatepickerModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__nsa_routing_module__["a" /* NsaRoutingModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__landingpage_component__["a" /* LandingpageComponent */], __WEBPACK_IMPORTED_MODULE_7__seriesprovision_component__["a" /* SeriesprovisionComponent */], __WEBPACK_IMPORTED_MODULE_8__discreteprovision_component__["a" /* DiscreteprovisionComponent */], __WEBPACK_IMPORTED_MODULE_10__seriesprovisionform_component__["a" /* SeriesprovisionformComponent */], __WEBPACK_IMPORTED_MODULE_12__seriesprovisiondetail_component__["a" /* SeriesprovisiondetailComponent */]]
        })
    ], NsaModule);
    return NsaModule;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/seriesprovision.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n  \n  <div class=\"card-header\">\n     \n      \n\t  \n\t   <div class=\"card-body\">\n             <button type=\"button\" class=\"btn btn-primary\" (click)=\"isCollapsed = !isCollapsed\"><i class=\"fa fa-star\"></i>&nbsp; \n\t\t  {{isCollapsed === true ? 'Search for Work Request' : 'Hide Searching'}}\n\t\t  </button>\n         \n          <!--\n\t\t  <button type=\"button\" class=\"btn btn-link\" ><i class=\"fa fa-link\"></i><a [routerLink]=\"[ '/nsa/seriesprovisionform' ]\"> Create a Work Request </a></button>\n\t\t  -->\n\t\t  </div>\n    </div>\n\t\n  \n    <div class=\"card-footer\"\n         (collapsed)=\"collapsed($event)\"\n         (expanded)=\"expanded($event)\"\n         [collapse]=\"isCollapsed\" >\n   <div>\n   \n       <form [formGroup]=\"mySearchForm\" novalidate (ngSubmit)=\"onSearchSubmit()\">\n\t   \n\t<div class=\"form-group\"\n\t\t[ngClass]=\"{\n        'has-danger': mySearchForm.controls.wrname.invalid && (mySearchForm.controls.wrname.dirty || mySearchForm.controls.wrname.touched),\n        'has-success': mySearchForm.controls.wrname.valid && (wrname.dirty || mySearchForm.controls.wrname.touched)\n   }\">\n\t\t<label>wrname</label> <input type=\"text\" class=\"form-control\"\n\t\t\tformControlName=\"wrname\" required>\n\t\t<div class=\"form-control-feedback\"\n\t\t\t*ngIf=\"mySearchForm.controls.wrname.errors && (mySearchForm.controls.wrname.dirty || mySearchForm.controls.wrname.touched)\">\n\t\t\t<p *ngIf=\"mySearchForm.controls.wrname.errors.required\">wrname\n\t\t\t\tis required</p>\t\t\t\n\t\t</div>\n\t</div>\n\n\t\n  <div class=\"col-xs-12 col-12 col-md-4 form-group \" >\n\t\t<label>Start Date</label> \n\t<input type=\"text\" class=\"form-control calendar-container\" id=\"startDate\" formControlName=\"startDate\" name=\"startDate\"  required bsDatepicker [bsConfig]=\"datepickerConfig\"\n\t\t\t\t\tplacement=\"right\" > \n\t</div>\n  \n  <div class=\"col-xs-12 col-12 col-md-4 form-group \" >\n\t\t<label>End Date</label> \n\t<input type=\"text\" class=\"form-control calendar-container\" id=\"endDate\" formControlName=\"endDate\" name=\"endDate\"  required bsDatepicker [bsConfig]=\"datepickerConfig\"\n\t\t\t\t\tplacement=\"right\" > \n\t</div>\n  \n\t<div class=\"form-group\" [ngClass]=\"{\n        'has-danger': mySearchForm.controls.wrstatus.invalid && (mySearchForm.controls.wrstatus.dirty || mySearchForm.controls.wrstatus.touched),\n        'has-success': mySearchForm.controls.wrstatus.valid && (mySearchForm.controls.wrstatus.dirty || mySearchForm.controls.wrstatus.touched)\n      }\">\n\t\t<label>wrstatus</label> <select class=\"form-control\"\n\t\t\tformControlName=\"wrstatus\">\n\t\t\t<option value=\"\">Please select a wrstatus</option>\n\t\t\t<option *ngFor=\"let astatus of wrstatuses\" [value]=\"astatus\">{{astatus}}</option>\n\t\t</select>\n\t</div>\n\t<button type=\"submit\" class=\"btn btn-primary\" >Submit</button>\n</form>\n<!--\n<pre >{{mySearchForm.value | json}}</pre>\n<pre *ngIf=\"mySearchForm.valid\">This is Valid form Data.{{mySearchForm.value | json}}</pre>\n-->\n   </div>   \t  \n\t\n    </div>\n\t\n\t<div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-align-justify\"></i> Pending Task Lists\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table table-bordered table-striped table-sm\">\n            <thead>\n              <tr>\n                <th>Work Request Name</th>\n                <th>Next Action</th>\n                <th>Pending At</th>\n                <th>Last Action By</th>\n\t\t\t\t<th>Last Action Date</th>\n              </tr>\n            </thead>\n           <tbody *ngFor=\"let aTask of pendingTasksList;  index as i\">\n\t\t\t\t\t\t<tr >\n\t\t\t\t\t\t\t<td><a [routerLink]=\"['/nsa/seriesprovisiondetail',aTask.wr_BriefName, aTask.wr_BriefId, aTask.hopSequence]\">{{aTask.wr_BriefName\n\t\t\t\t\t\t\t}}</a></td>\n\t\t\t\t\t\t\t<td>{{aTask.nextAction}}</td>\n\t\t\t\t\t\t\t<td>{{aTask.pendingAt}}</td>\n\t\t\t\t\t\t\t<td>{{aTask.lastActionBy}}</td>\n\t\t\t\t\t\t\t<td>{{aTask.lastActionDate}}</td>\n              </tr>\n            </tbody>\n          </table>\n          <nav>\n            <ul class=\"pagination\">\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n              <li class=\"page-item active\">\n                <a class=\"page-link\" href=\"#\">1</a>\n              </li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n            </ul>\n          </nav>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n  </div>\n </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/views/nsa/seriesprovision.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesprovisionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_workflows_service__ = __webpack_require__("../../../../../src/app/views/nsa/services/workflows.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__("../../../../../src/app/app.global.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_LoginService__ = __webpack_require__("../../../../../src/app/views/pages/LoginService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SeriesprovisionComponent = /** @class */ (function () {
    function SeriesprovisionComponent(router, loginService, http, _global, workFlowsService) {
        // Get Current User Profile
        var _this = this;
        this.router = router;
        this.loginService = loginService;
        this.http = http;
        this._global = _global;
        this.workFlowsService = workFlowsService;
        this.isCollapsed = true;
        this.wrstatuses = [
            'In Progress',
            'Complete'
        ];
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName;
            this.groupID = this.currentLoggedInUser.groupID;
            //console.log('Current user: ' + this.userName);
        }
        else {
            //console.log('Current user not found');
            this.router.navigate(['pages/login']);
        }
        //GetPendingTaskList
        this.workFlowsService.LoadPendingTask(this._global.wrid_NumberSeriesProvisioning, this.groupID).subscribe(function (data) {
            console.log(data);
            _this.pendingTasksList = data;
            for (var index in data) {
                //console.log (data[index]);
                console.log('pendingAt is : ' + index + ' ' + _this.pendingTasksList[index].pendingAt);
                console.log('nextAction is : ' + index + ' ' + _this.pendingTasksList[index].nextAction);
                console.log('lastActionBy is : ' + index + ' ' + _this.pendingTasksList[index].lastActionBy);
                console.log('lastActionDate is : ' + index + ' ' + _this.pendingTasksList[index].lastActionDate);
                console.log('wr_BriefID is : ' + index + ' ' + _this.pendingTasksList[index].wr_BriefId);
                console.log('wr_BriefName is : ' + index + ' ' + _this.pendingTasksList[index].wr_BriefName);
                console.log('hopSequence is : ' + index + ' ' + _this.pendingTasksList[index].hopSequence);
                console.log('index is : ' + index);
            }
        }, function (err) { return console.error(err); }, function () { return console.log('Done loading PendingTask List'); });
    }
    SeriesprovisionComponent.prototype.ngOnInit = function () {
        this.createFormControls();
        this.createForm();
    };
    SeriesprovisionComponent.prototype.onSearchSubmit = function () {
        if (this.mySearchForm.valid) {
            console.log('Form Submitted!');
            console.log(this.mySearchForm.value);
            //this.myModelForm.reset();
        }
    };
    SeriesprovisionComponent.prototype.createFormControls = function () {
        this.wrname = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        this.wrstatus = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
        this.startDate = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
        this.endDate = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
    };
    SeriesprovisionComponent.prototype.createForm = function () {
        this.mySearchForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            wrname: this.wrname,
            wrstatus: this.wrstatus,
            startDate: this.startDate,
            endDate: this.endDate
        });
    };
    SeriesprovisionComponent.prototype.onTaskSelect = function (aTask) {
        //this.selectedContactId = aTask.wr_ID;
        //this.router.navigateByUrl('/nsa/seriesprovisiondetail');
    };
    SeriesprovisionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seriesprovision',
            template: __webpack_require__("../../../../../src/app/views/nsa/seriesprovision.component.html"),
            styles: [__webpack_require__("../../../../../src/app/views/nsa/demo.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_workflows_service__["a" /* WorkflowsService */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* AppGlobals */], __WEBPACK_IMPORTED_MODULE_6__pages_LoginService__["a" /* LoginService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_6__pages_LoginService__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* AppGlobals */], __WEBPACK_IMPORTED_MODULE_3__services_workflows_service__["a" /* WorkflowsService */]])
    ], SeriesprovisionComponent);
    return SeriesprovisionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/seriesprovisiondetail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-md-1\">\n\t\t<div class=\"card-body\"></div>\n\t</div>\n\t<div class=\"col-md-10\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<strong>Provisioning (Active number series) :: {{wrBriefName}}</strong>\n\t\t\t</div>\n\t\t\tCurrent Hop Sequence {{hop_sequence}}\n\t\t\t<div class=\"card-body\">\n\t\t\t\t<table *ngFor=\"let aFnvPair of fieldNameValueList;  index as idx\" class=\"table table-bordered table-striped table-sm\">\n\t\t\t\t\t<tr *ngIf=\"idx % 2 == 0\" >\n\t\t\t\t\t\t<td style =\"width:25%:\">{{fieldNameValueList[idx].fieldName}}</td>\n\t\t\t\t\t\t<td style =\"width:25%\">{{fieldNameValueList[idx].fieldValue}}</td>\n\t\t\t\t\t\t<td style =\"width:25%\">{{fieldNameValueList[idx+1].fieldName}}</td>\n\t\t\t\t\t\t<td style =\"width:25%\">{{fieldNameValueList[idx+1].fieldValue}}</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</table >\n\t\t\t</div>\n\t\t\t<div *ngIf=\"hop_sequence <= 3\">\n\t\t\t<form [formGroup]=\"mySeriesProvisionForm\" novalidate (ngSubmit)=\"onSeriesProvisionSubmit()\" >\n\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t<div class=\"row\" *ngIf=\"hop_sequence === 2\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"HLR\">HLR</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"HLR\" formControlName=\"HLR\" required \n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': HLR.invalid && (HLR.dirty || HLR.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': HLR.valid && (HLR.dirty || HLR.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aHLR of listHLR\" [value]=\"aHLR.id\">{{aHLR.name}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"HLR.errors && (HLR.dirty || HLR.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"HLR.errors.required\">HLR Selection required</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"SAPC\">SAPC</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"SAPC\" formControlName=\"SAPC\" required \n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': SAPC.invalid && (SAPC.dirty || SAPC.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': SAPC.valid && (SAPC.dirty || SAPC.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aSAPC of listSAPC\" [value]=\"aSAPC.id\">{{aSAPC.name}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"SAPC.errors && (SAPC.dirty || SAPC.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"SAPC.errors.required\">SAPC Selection required</p>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group row\" *ngIf=\"hop_sequence === 2\">\n\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"cnpComment\">Comment</label>\n\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t<textarea id=\"cnpComment\" name=\"cnpComment\" class=\"form-control\" formControlName=\"cnpComment\" rows=\"5\">\n\t\t\t\t\t\t\t</textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- BSS Planning Input -->\n\t\t\t\t<div class=\"row\" *ngIf=\"hop_sequence === 3\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"SDP\">SDP</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"SDP\" formControlName=\"SDP\" required (change)=\"onSDPSelect($event)\"\n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': SDP.invalid && (SDP.dirty || SDP.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': SDP.valid && (SDP.dirty || SDP.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aSDP of listSDP\" [value]=\"aSDP.name\">{{aSDP.name}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"SDP.errors && (SDP.dirty || SDP.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"SDP.errors.required\">SDP Selection required</p>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"CSP\">CSP</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"CSP\" name=\"CSP\" class=\"form-control\" formControlName=\"CSP\">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"hop_sequence === 3\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"EOICK\">EOICK(SDP X 10)</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"EOICK\" name=\"EOICK\" class=\"form-control\" formControlName=\"EOICK\">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"emaPort\">EMA Port </label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"emaPort\" formControlName=\"emaPort\" required\n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': emaPort.invalid && (emaPort.dirty || emaPort.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': emaPort.valid && (emaPort.dirty || emaPort.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aEmaPort of listEmaPort\" [value]=\"aEmaPort.id\">{{aEmaPort.name}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"emaPort.errors && (emaPort.dirty || emaPort.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"emaPort.errors.required\">Ema Port Selection required</p>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group row\"  *ngIf=\"hop_sequence === 3\">\n\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"bssComment\">Comment</label>\n\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t<textarea id=\"bssComment\" name=\"bssComment\" class=\"form-control\" formControlName=\"bssComment\" rows=\"5\">\n\t\t\t\t\t\t\t</textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"card-body\"> -->\n\t\t\t\t<div class=\"card-footer text-right\">\n\t\t\t\t\t<button type=\"submit\" [disabled]=\"!mySeriesProvisionForm.valid || isDoneDisable\" class=\"btn btn-sm btn-primary\">\n\t\t\t\t\t\t<i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n\t\t\t\t\t<button type=\"reset\" class=\"btn btn-sm btn-danger\"(click)=\"clearForm($event)\">\n\t\t\t\t\t\t<i class=\"fa fa-ban\"></i> Reset</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-link\" (click)=\"backButton($event)\"><i class=\"fa fa-link\" ></i>&nbsp; Back</button>\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"card-footer\"> -->\n\t\t\t\t\n\t\t\t</form>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div *ngIf=\"hop_sequence > 3\">\n\t\t\t<div class=\"card-footer text-right\">\n\t\t\t\t\t<button type=\"submit\" [disabled]=\"isDoneDisable\" class=\"btn btn-sm btn-primary\" (click)=\"onDoneClick()\">\n\t\t\t\t\t\t<i class=\"fa fa-dot-circle-o\"></i> Done</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"alert alert-success\" role=\"alert\" *ngIf=\"successAlertShow\">The Work Request <b>{{wrBriefName}}</b> {{successAlertMessage}}</div>\n\t\t\t<div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"dangerAlertShow\">The Work Request <b>{{wrBriefName}}</b> {{dangerAlertMessage}}</div>\n\n\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t</div>\n<!--\n<pre >{{mySeriesProvisionForm.value | json}}</pre>\n<pre *ngIf=\"mySeriesProvisionForm.valid\">This is Valid form Data.{{mySeriesProvisionForm.value | json}}</pre>\n-->\n"

/***/ }),

/***/ "../../../../../src/app/views/nsa/seriesprovisiondetail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesprovisiondetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_workflows_service__ = __webpack_require__("../../../../../src/app/views/nsa/services/workflows.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retry__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/retry.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global__ = __webpack_require__("../../../../../src/app/app.global.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_LoginService__ = __webpack_require__("../../../../../src/app/views/pages/LoginService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SeriesprovisiondetailComponent = /** @class */ (function () {
    function SeriesprovisiondetailComponent(loginService, activatedRoute, router, _global, workFlowsService) {
        // Get Current User Profile
        this.loginService = loginService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._global = _global;
        this.workFlowsService = workFlowsService;
        this.listHLR = [];
        this.listSAPC = [];
        this.listSDP = [];
        this.listEmaPort = [];
        this.dangerAlertShow = false;
        this.dangerAlertMessage = "";
        this.successAlertShow = false;
        this.successAlertMessage = "";
        this.isDone = false;
        this.isDoneDisable = false;
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName;
            this.groupID = this.currentLoggedInUser.groupID;
            //console.log('Current user: ' + this.userName);
        }
        else {
            //console.log('Current user not found');
            this.router.navigate(['pages/login']);
        }
    }
    SeriesprovisiondetailComponent.prototype.ngOnInit = function () {
        this.LoadQueryStringData();
        this.LoadPreviousHopsData();
        if (this.hop_sequence <= 3) {
            this.LoadDDLData();
            this.createFormControls();
            this.createForm();
        }
    };
    SeriesprovisiondetailComponent.prototype.LoadQueryStringData = function () {
        // LOAD QUERY STRING DATA
        this.wr_BriefId = Number(this.activatedRoute.snapshot.paramMap.get('wr_BriefId'));
        console.log(this.wr_BriefId);
        this.hop_sequence = Number(this.activatedRoute.snapshot.paramMap.get('hopSequence'));
        console.log(this.hop_sequence);
        this.wrBriefName = this.activatedRoute.snapshot.paramMap.get('wr_BriefName');
    };
    SeriesprovisiondetailComponent.prototype.LoadPreviousHopsData = function () {
        var _this = this;
        //LOAD PREVIOUS HOPS DATA
        //LoadPreviousHopsField(wrID: number,wrBriefId: number,groupID: number,current_hop_seq: number) : any {
        this.workFlowsService.LoadPreviousHopsField(this._global.wrid_NumberSeriesProvisioning, this.wr_BriefId, this.groupID, this.hop_sequence).subscribe(function (data) {
            //console.log(data);
            _this.fieldNameValueList = data;
            var totalData = _this.fieldNameValueList.length;
            console.log(totalData);
            if (totalData % 2 == 1) {
                console.log("totalData is odd");
                _this.fieldNameValueList.push({ fieldName: " ", fieldValue: " " });
            }
            /*
            for (let index in data) {
                console.log (data[index]);
                console.log('fieldName is : '+index +' ' +this.fieldNameValueList[index].fieldName);
                console.log('fieldValue is : '+index +' ' +this.fieldNameValueList[index].fieldValue);
                console.log('index is : '+index);
            }
            */
        }, function (err) { return console.error(err); }, function () { return console.log('Done loading LoadPreviousHopsField List'); });
    };
    SeriesprovisiondetailComponent.prototype.LoadDDLData = function () {
        // LOAD DROPDOWNS DATA
        if (this.hop_sequence == 2) {
            this.listHLR = [{ 'id': 1, 'name': 'HLR1' }, { 'id': 2, 'name': 'HLR2' }, { 'id': 3, 'name': 'HLR3' }];
            this.listSAPC = [{ 'id': 1, 'name': 'SYUPCC01' }];
        }
        else if (this.hop_sequence == 3) {
            this.listSDP = [{ 'id': 1, 'name': 'SDP1' }, { 'id': 2, 'name': 'SDP2' }, { 'id': 3, 'name': 'SDP3' }];
            this.listEmaPort = [{ 'id': 1, 'name': '3001' }, { 'id': 2, 'name': '3002' }];
        }
    };
    SeriesprovisiondetailComponent.prototype.createFormControls = function () {
        if (this.hop_sequence == 2) {
            this.HLR = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]);
            this.SAPC = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
            this.cnpComment = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
        }
        else if (this.hop_sequence == 3) {
            this.SDP = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
            this.CSP = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]({ value: 0, disabled: true }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
            this.EOICK = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]({ value: 0, disabled: true }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
            this.emaPort = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
            this.bssComment = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
        }
    };
    SeriesprovisiondetailComponent.prototype.createForm = function () {
        if (this.hop_sequence == 2) {
            this.mySeriesProvisionForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
                HLR: this.HLR,
                SAPC: this.SAPC,
                cnpComment: this.cnpComment
            });
        }
        else if (this.hop_sequence == 3) {
            this.mySeriesProvisionForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
                SDP: this.SDP,
                CSP: this.CSP,
                EOICK: this.EOICK,
                emaPort: this.emaPort,
                bssComment: this.bssComment
            });
        }
    };
    // event handler for the select element's change event
    SeriesprovisiondetailComponent.prototype.onSDPSelect = function (event) {
        // update the ui
        var selectedSDPID = event.target.value;
        console.log(selectedSDPID);
        this.mySeriesProvisionForm.get('CSP').setValue(selectedSDPID);
        this.mySeriesProvisionForm.get('EOICK').setValue(selectedSDPID);
    };
    SeriesprovisiondetailComponent.prototype.onSeriesProvisionSubmit = function () {
        var _this = this;
        if (this.mySeriesProvisionForm.valid) {
            //console.log('Form Submitted!');
            //console.log(this.mySeriesProvisionForm.value);
            this.formFieldData = "";
            this.LogKeyValuePairs(this.mySeriesProvisionForm);
            console.log(this.formFieldData);
            //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
            this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName), this._global.wrid_NumberSeriesProvisioning, this.groupID, this.userName, this.hop_sequence, this.formFieldData, this.isDone).subscribe(function (res) {
                console.log('response is : ' + res);
                if (res === true) {
                    _this.successAlertShow = true;
                    _this.successAlertMessage = " has been saved successfully.";
                    _this.isDoneDisable = true;
                }
            }, function (err) {
                console.log("err.status : " + err.status);
                _this.dangerAlertShow = true;
                _this.dangerAlertMessage = " could not be saved.";
            });
        }
    };
    SeriesprovisiondetailComponent.prototype.LogKeyValuePairs = function (group) {
        var _this = this;
        // Loop through each control key in the FormGroup
        Object.keys(group.controls).forEach(function (key) {
            // Get the control. The control can be a nested form group
            var abstractControl = group.get(key);
            // If the control is nested form group, recursively call
            // this same method (logKeyValuePairs) passing it
            // the FormGroup so we can get to the form controls in it
            if (abstractControl instanceof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]) {
                _this.LogKeyValuePairs(abstractControl);
                // If the control is a FormControl
            }
            else {
                //console.log("Key : "+key+" , Value : "+abstractControl.value);
                if (_this.formFieldData) {
                    _this.formFieldData = _this.formFieldData + "," + abstractControl.value;
                }
                else {
                    //this.mySeriesProvisionForm.get(key).setValue("TOTOTOTO");
                    //console.log("Key : "+key+" , Value : "+abstractControl.value);
                    _this.formFieldData = abstractControl.value;
                }
            }
        });
    };
    SeriesprovisiondetailComponent.prototype.clearForm = function (event) {
        //console.log(event);
        this.dangerAlertShow = false;
        this.successAlertShow = false;
        this.mySeriesProvisionForm.reset();
    };
    SeriesprovisiondetailComponent.prototype.backButton = function (event) {
        //console.log(event);
        this.router.navigateByUrl('/nsa/seriesprovision');
    };
    SeriesprovisiondetailComponent.prototype.onDoneClick = function (event) {
        var _this = this;
        //console.log(event);
        this.formFieldData = "";
        this.isDoneDisable = true;
        if (this.hop_sequence == 5)
            this.isDone = true;
        this.workFlowsService.UpdateExistiongWorkRequest(this.workFlowsService.FormatWorkRequestNameForAPI(this.wrBriefName), this._global.wrid_NumberSeriesProvisioning, this.groupID, this.userName, this.hop_sequence, this.formFieldData, this.isDone).subscribe(function (res) {
            console.log('response is : ' + res);
            if (res === true) {
                _this.successAlertShow = true;
                if (_this.hop_sequence == 5)
                    _this.successAlertMessage = " has been completed successfully.";
                else
                    _this.successAlertMessage = " has been saved successfully.";
            }
        }, function (err) {
            console.log("err.status : " + err.status);
            _this.dangerAlertShow = true;
            _this.dangerAlertMessage = " could not be saved.";
        });
    };
    SeriesprovisiondetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seriesprovisiondetail',
            template: __webpack_require__("../../../../../src/app/views/nsa/seriesprovisiondetail.component.html"),
            styles: [],
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_workflows_service__["a" /* WorkflowsService */], __WEBPACK_IMPORTED_MODULE_8__app_global__["a" /* AppGlobals */], __WEBPACK_IMPORTED_MODULE_9__pages_LoginService__["a" /* LoginService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__pages_LoginService__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_8__app_global__["a" /* AppGlobals */], __WEBPACK_IMPORTED_MODULE_3__services_workflows_service__["a" /* WorkflowsService */]])
    ], SeriesprovisiondetailComponent);
    return SeriesprovisiondetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/seriesprovisionform.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-md-1\">\n\t\t<div class=\"card-body\"></div>\n\t</div>\n\t<div class=\"col-md-10\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<strong>Provisioning (Active number series table)</strong>\n\t\t\t</div>\n\t\t\t<form [formGroup]=\"mySeriesProvisionForm\" novalidate (ngSubmit)=\"onSeriesProvisionSubmit()\">\n\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\">Work Request Name</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<p class=\"form-control-static\">{{WR_Name}}</p>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"startMSISDN\">Start MSISDN</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"startMSISDN\" name=\"startMSISDN\" class=\"form-control\" formControlName=\"startMSISDN\" pattern=\"(017|013)\\d*\" required\n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t'is-invalid': startMSISDN.invalid && (startMSISDN.dirty || startMSISDN.touched),\n\t\t\t\t\t\t\t\t\t\t'is-valid': startMSISDN.valid && (startMSISDN.dirty || startMSISDN.touched)\n\t\t\t\t\t\t\t\t   }\">\n\t\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"startMSISDN.errors && (startMSISDN.dirty || startMSISDN.touched)\">\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"startMSISDN.errors.required\">Start MSISDN is required</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"startMSISDN.errors.pattern\">MSISDN starts with 017 or 013 and  contains only digits.</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"startMSISDN.errors.minlength\">MSISDN must be 11 digit long</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"startMSISDN.errors.maxlength\">MSISDN must be 11 digit long</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"endMSISDN\">End MSISDN</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"endMSISDN\" name=\"endMSISDN\" class=\"form-control\" formControlName=\"endMSISDN\" pattern=\"(017|013)\\d*\" required\n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t'is-invalid': endMSISDN.invalid && (endMSISDN.dirty || endMSISDN.touched),\n\t\t\t\t\t\t\t\t\t\t'is-valid': endMSISDN.valid && (endMSISDN.dirty || endMSISDN.touched)\n\t\t\t\t\t\t\t\t   }\">\n\t\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"endMSISDN.errors && (endMSISDN.dirty || endMSISDN.touched)\">\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"endMSISDN.errors.required\">End MSISDN is required</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"endMSISDN.errors.pattern\">MSISDN starts with 017 or 013 and  contains only digits.</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"endMSISDN.errors.minlength\">MSISDN must be 11 digit long</p>\n\t\t\t\t\t\t\t\t\t\t<p *ngIf=\"endMSISDN.errors.maxlength\">MSISDN must be 11 digit long</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"IMSI\">IMSI</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"IMSI\" formControlName=\"IMSI\" required [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': IMSI.invalid && (IMSI.dirty || IMSI.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': IMSI.valid && (IMSI.dirty || IMSI.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aIMSI of listIMSI\" [value]=\"aIMSI.id\">{{aIMSI.group_name}}</option>\n\t\t\t\t\t\t\t\t\t\t<!--\t\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let cl of clientOptions\" [value]=\"cl.id\">{{cl.client_name}}</option> -->\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"IMSI.errors && (IMSI.dirty || IMSI.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"IMSI.errors.required\">IMSI Name required</p>\n\n\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"quantity\">Quantity</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"quantity\" name=\"quantity\" class=\"form-control\" formControlName=\"quantity\">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"productType\">Product Type</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"productType\" formControlName=\"productType\" required (change)=\"onProductTypeSelect($event)\"\n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': productType.invalid && (productType.dirty || productType.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': productType.valid && (productType.dirty || productType.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aProductType of listProductType\" [value]=\"aProductType.id\">{{aProductType.productType_name}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"productType.errors && (productType.dirty || productType.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"productType.errors.required\">Product Type Selection required</p>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"productName\">Product Name</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"productName\" formControlName=\"productName\" required (change)=\"onProductNameSelects($event)\"\n\t\t\t\t\t\t\t\t\t [ngClass]=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-invalid': productName.invalid && (productName.dirty || productName.touched),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'is-valid': productName.valid && (productName.dirty || productName.touched)\n\t\t\t\t\t\t\t\t\t\t\t\t\t }\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aProduct of listProduct\" [value]=\"aProduct.id\">{{aProduct.productName}}</option>\n\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"invalid-feedback\" *ngIf=\"productName.errors && (productName.dirty || productName.touched)\">\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"productName.errors.required\">Product Name Selection required</p>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"serviceClassName\">Service Class Name</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"serviceClassName\" name=\"serviceClassName\" class=\"form-control\" formControlName=\"serviceClassName\">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"communityID\">Community ID</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" id=\"communityID\" name=\"communityID\" class=\"form-control\" formControlName=\"communityID\">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"zone\">zone Name</label>\n\t\t\t\t\t\t\t\t<div class=\"col-md-7\">\n\t\t\t\t\t\t\t\t\t<select class=\"form-control\" id=\"zone\" formControlName=\"zone\">\n\t\t\t\t\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let aZone of listZone\" [value]=\"aZone.id\">{{aZone.name}}</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<!-- ///\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-6\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t/// -->\n\n\n\n\t\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t\t<label class=\"col-md-5 col-form-label\" for=\"srcComment\">Comment</label>\n\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t<textarea id=\"srcComment\" name=\"srcComment\" class=\"form-control\" formControlName=\"srcComment\" rows=\"5\">\n\t\t\t\t</textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"card-body\"> -->\n\t\t\t\t<div class=\"card-footer text-right\">\n\t\t\t\t\t<button type=\"submit\" [disabled]=\"!mySeriesProvisionForm.valid\" class=\"btn btn-sm btn-primary\">\n\t\t\t\t\t\t<i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n\t\t\t\t\t<button type=\"reset\" class=\"btn btn-sm btn-danger\"(click)=\"clearForm($event)\">\n\t\t\t\t\t\t<i class=\"fa fa-ban\"></i> Reset</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-link\" (click)=\"backButton($event)\"><i class=\"fa fa-link\" ></i>&nbsp; Back</button>\n\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<!-- <div class=\"card-footer\"> -->\n\t\t\t</form>\n\n\t\t\t<div class=\"alert alert-success\" role=\"alert\" *ngIf=\"successAlertShow\">The New Work Request <b>{{WR_Name}}</b> {{successAlertMessage}}</div>\n\t\t\t<div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"dangerAlertShow\">The New Work Request <b>{{WR_Name}}</b> {{dangerAlertMessage}}</div>\n\n\t\t</div>\n\t\t<!-- <div class=\"card\"> -->\n\t</div>\n\t<div class=\"col-md-2\">\n\t\t<div class=\"card-body\"></div>\n\n\t</div>\n</div>\n<!--\n<pre >{{mySeriesProvisionForm.value | json}}</pre>\n<pre *ngIf=\"mySeriesProvisionForm.valid\">This is Valid form Data.{{mySeriesProvisionForm.value | json}}</pre>\n-->"

/***/ }),

/***/ "../../../../../src/app/views/nsa/seriesprovisionform.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesprovisionformComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_definitiondata_service__ = __webpack_require__("../../../../../src/app/views/nsa/services/definitiondata.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_workflows_service__ = __webpack_require__("../../../../../src/app/views/nsa/services/workflows.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_retry__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/retry.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_LoginService__ = __webpack_require__("../../../../../src/app/views/pages/LoginService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_global__ = __webpack_require__("../../../../../src/app/app.global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var SeriesprovisionformComponent = /** @class */ (function () {
    //listZone = [{'id':1, 'name':'Dhaka'}, {'id':2, 'name': 'Ctd'}, {'id':3, 'name': 'Khulna'}];
    function SeriesprovisionformComponent(router, loginService, http, _global, definitionDataService, workFlowsService) {
        // Get Current User Profile
        var _this = this;
        this.router = router;
        this.loginService = loginService;
        this.http = http;
        this._global = _global;
        this.definitionDataService = definitionDataService;
        this.workFlowsService = workFlowsService;
        this.dangerAlertShow = false;
        this.dangerAlertMessage = "";
        this.successAlertShow = false;
        this.successAlertMessage = "";
        this.listIMSI = [];
        this.listProductType = [];
        this.listProduct = [];
        this.listServiceClass = [];
        this.listCommunityID = [];
        this.listZone = [];
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName;
            this.groupID = this.currentLoggedInUser.groupID;
            //console.log('Current user: ' + this.userName);
        }
        else {
            //console.log('Current user not found');
            this.router.navigate(['pages/login']);
        }
        //GetWR_Name
        this.definitionDataService.GetWR_Name(this._global.wrid_NumberSeriesProvisioning).subscribe(function (data) {
            //console.log(data);				
            var dataStr = JSON.stringify(data);
            JSON.parse(dataStr, function (key, value) {
                if (typeof value === 'string') {
                    _this.WR_Name = value;
                    return value;
                }
            });
            // console.log(this.WR_Name);
        }, function (err) { return console.error(err); }, function () { return console.log('done loading Work Request Name'); });
        //GetAllIMSI
        this.definitionDataService.GetAllIMSI().subscribe(function (data) {
            //console.log(data);
            for (var index in data) {
                //console.log (data[index]);
                _this.listIMSI.push({
                    id: data[index].id,
                    group_name: data[index].groupName
                });
            }
        }, function (err) { return console.error(err); }, function () { return console.log('done loading IMSI List'); });
        //GetProductTypes
        this.definitionDataService.GetProductTypes().subscribe(function (data) {
            _this.listProductType = [];
            //console.log("this.listProductType "+this.listProductType.length);
            for (var index in data) {
                //console.log (data[index]);			
                _this.listProductType.push({
                    id: data[index].id,
                    productType_name: data[index].productTypeName
                });
            }
            // return data;
        }, function (err) { return console.error(err); }, function () { return console.log('done loading ProductTypes List'); });
        //GetZoneNames
        this.definitionDataService.GetZoneNames().subscribe(function (data) {
            _this.listZone = [];
            //console.log("this.listZone "+this.listZone.length);
            for (var index in data) {
                //console.log (data[index]);			
                _this.listZone.push({
                    id: data[index].id,
                    name: data[index].zoneName
                });
            }
            // return data;
        }, function (err) { return console.error(err); }, function () { return console.log('done loading Zone List'); });
    }
    SeriesprovisionformComponent.prototype.ngOnInit = function () {
        this.createFormControls();
        this.createForm();
        this.onMSISDNChanges();
    };
    SeriesprovisionformComponent.prototype.createFormControls = function () {
        this.startMSISDN = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(11),
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(11)
        ]);
        this.endMSISDN = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(11),
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(11)
        ]);
        this.productType = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]);
        this.quantity = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]({ value: 0, disabled: true }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        this.IMSI = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        this.productName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        this.serviceClassName = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]({ value: '', disabled: true }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        this.communityID = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]({ value: '', disabled: true }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        this.zone = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
        this.srcComment = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('');
    };
    SeriesprovisionformComponent.prototype.createForm = function () {
        this.mySeriesProvisionForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            startMSISDN: this.startMSISDN,
            endMSISDN: this.endMSISDN,
            quantity: this.quantity,
            IMSI: this.IMSI,
            productType: this.productType,
            productName: this.productName,
            serviceClassName: this.serviceClassName,
            communityID: this.communityID,
            zone: this.zone,
            srcComment: this.srcComment
        });
    };
    SeriesprovisionformComponent.prototype.onMSISDNChanges = function () {
        var _this = this;
        this.mySeriesProvisionForm.get('startMSISDN').valueChanges
            .subscribe(function (selectedMSISDN) {
            var endMSISDNs = _this.mySeriesProvisionForm.get('endMSISDN').value;
            if (selectedMSISDN != null) {
                _this.mySeriesProvisionForm.get('quantity').setValue(Number(endMSISDNs) - Number(selectedMSISDN));
            }
        });
        this.mySeriesProvisionForm.get('endMSISDN').valueChanges
            .subscribe(function (selectedMSISDN) {
            var startMSISDNs = _this.mySeriesProvisionForm.get('startMSISDN').value;
            if (selectedMSISDN != null) {
                _this.mySeriesProvisionForm.get('quantity').setValue(1 + Number(selectedMSISDN) - Number(startMSISDNs));
            }
        });
    };
    // event handler for the select element's change event
    SeriesprovisionformComponent.prototype.onProductNameSelects = function (event) {
        // update the ui
        var selectedProductID = event.target.value;
        // const selectedProductName = event.target.name;
        //console.log(selectedProductID);
        this.mySeriesProvisionForm.get('serviceClassName').setValue(this.listServiceClass[selectedProductID]);
        this.mySeriesProvisionForm.get('communityID').setValue(this.listCommunityID[selectedProductID]);
    };
    // event handler for the select element's change event
    SeriesprovisionformComponent.prototype.onProductTypeSelect = function (event) {
        var _this = this;
        // update the ui
        var selectedProductTypeID = event.target.value;
        this.definitionDataService.GetProducts(selectedProductTypeID).subscribe(function (data) {
            _this.listCommunityID = [];
            _this.listServiceClass = [];
            _this.listProduct = [];
            _this.mySeriesProvisionForm.get('serviceClassName').setValue('');
            _this.mySeriesProvisionForm.get('communityID').setValue('');
            //console.log ("this.listCommunityID.length "+this.listCommunityID.length);
            //console.log ("this.listServiceClass.length "+this.listServiceClass.length);
            for (var index in data) {
                //console.log (data[index]);
                _this.listProduct.push({
                    id: data[index].id,
                    productName: data[index].productName
                });
                _this.listCommunityID[data[index].id] = data[index].communityID;
                _this.listServiceClass[data[index].id] = data[index].serviceClass.serviceClassName;
            }
            // return data;
        }, function (err) { return console.error(err); }, function () { return console.log('done loading Product List based on ProductTypes'); });
    };
    // FORM SUBMISSION
    SeriesprovisionformComponent.prototype.onSeriesProvisionSubmit = function () {
        var _this = this;
        if (this.mySeriesProvisionForm.valid) {
            console.log('Form Submitted!');
            console.log(this.mySeriesProvisionForm.value);
        }
        this.formFieldData = this.workFlowsService.FormatWorkRequestNameForAPI(this.WR_Name);
        this.LogKeyValuePairs(this.mySeriesProvisionForm);
        //console.log(this.formFieldData);
        //{wr_id}/{userGroup_id}/{user_id}/[{workflowFieldsValueSeqWise}]
        this.workFlowsService.CreateNewWorkRequest(this._global.wrid_NumberSeriesProvisioning, this.groupID, this.userName, this.formFieldData).subscribe(function (res) {
            console.log('response is : ' + res);
            if (res === true) {
                _this.successAlertShow = true;
                _this.successAlertMessage = " has been created successfully.";
            }
        }, function (err) {
            console.log("err.status : " + err.status);
            _this.dangerAlertShow = true;
            _this.dangerAlertMessage = " could not be created.";
        });
    };
    SeriesprovisionformComponent.prototype.LogKeyValuePairs = function (group) {
        var _this = this;
        // Loop through each control key in the FormGroup
        Object.keys(group.controls).forEach(function (key) {
            // Get the control. The control can be a nested form group
            var abstractControl = group.get(key);
            // If the control is nested form group, recursively call
            // this same method (logKeyValuePairs) passing it
            // the FormGroup so we can get to the form controls in it
            if (abstractControl instanceof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]) {
                _this.LogKeyValuePairs(abstractControl);
                // If the control is a FormControl
            }
            else {
                //console.log("Key : "+key+" , Value : "+abstractControl.value);
                if (_this.formFieldData) {
                    _this.formFieldData = _this.formFieldData + "," + abstractControl.value;
                }
                else {
                    //this.mySeriesProvisionForm.get(key).setValue("TOTOTOTO");
                    //console.log("Key : "+key+" , Value : "+abstractControl.value);
                    _this.formFieldData = abstractControl.value;
                }
            }
        });
    };
    SeriesprovisionformComponent.prototype.clearForm = function (event) {
        //console.log(event);
        this.dangerAlertShow = false;
        this.successAlertShow = false;
        this.mySeriesProvisionForm.reset();
    };
    SeriesprovisionformComponent.prototype.backButton = function (event) {
        //console.log(event);
        this.router.navigateByUrl('/nsa/seriesprovision');
    };
    SeriesprovisionformComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seriesprovisionform',
            template: __webpack_require__("../../../../../src/app/views/nsa/seriesprovisionform.component.html"),
            styles: [],
            providers: [__WEBPACK_IMPORTED_MODULE_4__services_definitiondata_service__["a" /* DefinitionDataService */], __WEBPACK_IMPORTED_MODULE_5__services_workflows_service__["a" /* WorkflowsService */], __WEBPACK_IMPORTED_MODULE_11__app_global__["a" /* AppGlobals */], __WEBPACK_IMPORTED_MODULE_10__pages_LoginService__["a" /* LoginService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_10__pages_LoginService__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_11__app_global__["a" /* AppGlobals */], __WEBPACK_IMPORTED_MODULE_4__services_definitiondata_service__["a" /* DefinitionDataService */], __WEBPACK_IMPORTED_MODULE_5__services_workflows_service__["a" /* WorkflowsService */]])
    ], SeriesprovisionformComponent);
    return SeriesprovisionformComponent;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/services/definitiondata.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefinitionDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retry__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/retry.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global__ = __webpack_require__("../../../../../src/app/app.global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DefinitionDataService = /** @class */ (function () {
    function DefinitionDataService(router, http, _global) {
        this.router = router;
        this.http = http;
        this._global = _global;
        this.dataOutput = "";
        this.serverUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].apiUrl;
        //console.log("serverUrl "+ this.serverUrl);
    }
    //GetWR_Name by wr_number
    DefinitionDataService.prototype.GetWR_Name = function (theWrNumber) {
        //console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
        return this.http.post(this.serverUrl + 'WorkRequestName/' + theWrNumber, {
            wr_number: theWrNumber
        });
    };
    //GetAllIMSI
    DefinitionDataService.prototype.GetAllIMSI = function () {
        //console.log("In GetAllIMSI()"); 		
        return this.http.get(this.serverUrl + 'IMSI_Group/');
    };
    //GetProductTypes
    DefinitionDataService.prototype.GetProductTypes = function () {
        //console.log("In GetProductTypes()"); 		
        return this.http.get(this.serverUrl + 'Product_Type/');
    };
    // GetProducts By Product Type
    DefinitionDataService.prototype.GetProducts = function (selectedProductTypeID) {
        //console.log("In GetProducts() for type " + selectedProductTypeID); 
        return this.http.post(this.serverUrl + 'GP_Products/' + selectedProductTypeID, {
            productTypeID: selectedProductTypeID
        });
    };
    //GetZoneNames
    DefinitionDataService.prototype.GetZoneNames = function () {
        //console.log("In GetZoneNames()"); 		
        return this.http.get(this.serverUrl + 'GpZones/');
    };
    DefinitionDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_8__app_global__["a" /* AppGlobals */]])
    ], DefinitionDataService);
    return DefinitionDataService;
}());



/***/ }),

/***/ "../../../../../src/app/views/nsa/services/workflows.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkflowsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__ = __webpack_require__("../../../../../src/environments/environment.prod.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_retry__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/retry.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global__ = __webpack_require__("../../../../../src/app/app.global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var WorkflowsService = /** @class */ (function () {
    function WorkflowsService(router, http, _global) {
        this.router = router;
        this.http = http;
        this._global = _global;
        this.dataOutput = "";
        this.serverUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment_prod__["a" /* environment */].apiUrl;
        this.isSaved = false;
    }
    WorkflowsService.prototype.FormatWorkRequestNameForAPI = function (WorkRequestName) {
        var newstr = WorkRequestName.split('/').join('');
        return newstr;
    };
    //Create New Work Request
    //{wr_id}/{userGroup_id}/{user_name}/[{workflowFieldsValueSeqWise}]
    WorkflowsService.prototype.CreateNewWorkRequest = function (wr_id, userGroup_id, user_name, workflowFieldsValueSeqWise) {
        //console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
        return this.http.post(this.serverUrl + 'NewWorkRequest/' + wr_id + '/' + userGroup_id + '/' + user_name + '/[' + workflowFieldsValueSeqWise + ']', {
            wr_id: wr_id,
            userGroup_id: userGroup_id,
            user_name: user_name,
            workflowFieldsValueSeqWise: workflowFieldsValueSeqWise
        });
    };
    //PendingTasks/{wr_id}/{userGroup_id}
    //http://localhost:8019/nsa/PendingTasks/1/3
    WorkflowsService.prototype.LoadPendingTask = function (wr_id, userGroup_id) {
        return this.http.post(this.serverUrl + 'PendingTasks/' + wr_id + '/' + userGroup_id, {
            wr_id: wr_id,
            userGroup_id: userGroup_id
        });
    };
    //PreviousHopsField/{wrID}/{wrBriefId}/{userGroup_id}/{current_hop_seq}
    //http://localhost:8019/nsa/PreviousHopsField/1/1/3/2
    WorkflowsService.prototype.LoadPreviousHopsField = function (wrID, wrBriefId, userGroup_id, current_hop_seq) {
        return this.http.post(this.serverUrl + 'PreviousHopsField/' + wrID + '/' + wrBriefId + '/' + userGroup_id + '/' + current_hop_seq, {
            wrID: wrID,
            wrBriefId: wrBriefId,
            userGroup_id: userGroup_id,
            current_hop_seq: current_hop_seq
        });
    };
    //Update Existing Work Request
    //{wr_id}/{userGroup_id}/{user_name}/[{workflowFieldsValueSeqWise}]
    WorkflowsService.prototype.UpdateExistiongWorkRequest = function (wrBriefName, wr_id, userGroup_id, user_name, hopSequence, workflowFieldsValueSeqWise, isDone) {
        //console.log("In GetWR_Name() for theWrNumber "+ theWrNumber);	
        return this.http.post(this.serverUrl + 'ExistingWorkRequest/' + wrBriefName + '/' + wr_id + '/' + userGroup_id + '/' + user_name + '/' + hopSequence + '/[' + workflowFieldsValueSeqWise + ']/' + isDone, {
            wrBriefName: wrBriefName,
            wr_id: wr_id,
            userGroup_id: userGroup_id,
            user_name: user_name,
            hopSequence: hopSequence,
            workflowFieldsValueSeqWise: workflowFieldsValueSeqWise,
            isDone: isDone
        });
    };
    WorkflowsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_8__app_global__["a" /* AppGlobals */]])
    ], WorkflowsService);
    return WorkflowsService;
}());



/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })

});
//# sourceMappingURL=nsa.module.chunk.js.map