import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {DefinitionDataService} from '../services/definitiondata.service';
import {IsmsworkflowsService} from '../services/ismsworkflows.service';
import {WorkflowsService} from '../services/workflows.service';
import {FileoperationService} from '../services/fileoperation.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import {LoginService} from '../../pages/LoginService';
import {LoggedInUser} from '../../pages/loggedInUser';

import {NewTestSimRequisition, RequisitionLine} from '../models/NewTestSimRequisition'
import {AppGlobals} from '../../../app.global';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {DateTimeUtil, DurationInfo} from '../../../utils/date-time';
import {injectTemplateRef} from '@angular/core/src/render3';


@Component({
    selector: 'app-requisition-edit',
    templateUrl: './requisition-edit.component.html',
    styles: ['./nsa_styles.css'],
    providers: [WorkflowsService, DefinitionDataService, IsmsworkflowsService, AppGlobals, LoginService, FileoperationService]
})
export class RequisitionEditNewComponent implements OnInit {

    userData: any[] = [];
    userList1: any[] = [];
    selectedEmpType: string[] = [];
    selectedUsageEnv: string[] = [];
    selectedIDCardType: string[] = [];
    lastkeydown1: number = 0;
    finalListOfUsersToSendWithRqn: Array<any>;

    employeeID: string;
    employeeName: string;
    mobileNo: string;
    designation: string;
    department: string;
    division: string;
    emailAddress: string;
    fullName: string;

    WR_Name: string;
    serverUrl: string;
    currentLoggedInUser: LoggedInUser;
    newTestSimRequisition: NewTestSimRequisition;
    userName: string;
    groupID: number;
    userID: string;

    existingAmsFileName: string = '';
    existingAmsFileNameToDisplay: string = '';
    fileToUpload: File = null;
    fileuploadstatus: string;
    amsFileName: string = null;
    fileerror: boolean = false;
    filesuccess: boolean = false;
    uploading: boolean = false;
    url: string;
    empVisible: boolean = false;
    cardVisible: boolean = false;
    amsVisible: boolean = false;
    amsFileDeleted: boolean = false;
    amsFileUploaded: boolean = false;
    amsFileSelected: boolean = false;

    public dangerAlertShow: boolean = false;
    public dangerAlertMessage: string[] = [];
    public successAlertShow: boolean = false;
    public successAlertMessage: string = '';
    public infoAlertShow: boolean = false;
    public infoAlertMessage: string = '';
    public isLoading: boolean = false;
    public defFlowFound: boolean = false;
    //public sDate = '';

    newSimRequisitionForm: FormGroup;
    purposeCategory: FormControl;
    location: FormControl;
    usageCategory: FormControl;
    amsId: FormControl;
    imei: FormControl;
    cardNo: FormControl;
    anyAMS: FormControl;
    startDate: FormControl;
    dateRange: FormControl;
    endDate: FormControl;
    empType: FormControl;
    otherEmpType: FormControl;
    usageEnv: FormControl;
    IDCardType: FormControl;
    otherIDCardType: FormControl;

    purposeDetails: FormControl;
    question1: FormControl;
    question2: FormControl;
    question3: FormControl;
    question4: FormControl;
    notificationTo: FormControl;
    requisitionType: FormControl;
    requisitionDate: FormControl;
    requisitionLines: FormArray;

    formFieldData: string;

    public listRequisitionType = [];
    public listPurposeCategory = [];
    public listLocation = [];
    public listUsageCategory = [];
    public listDateRange = [];
    public listEmpType = [];
    public listUsageEnv = [];
    public listIDCardType = [];
    public listProduct = [];
    public listImsiType = [];
    public listSpecialRequirement = [];

    minDate: Date;
    maxDate: Date;
    minStartDate: Date;

    headerDateData: any;

    anyamsList = [{value: 'Yes'}, {value: 'No'}];

    reqDate: Date;
    requisitionId: any;
    requisition: any;
    requisitionDetails: any;
    employeeDetails: any;
    requisitionLinesDetails: Array<any> = [];
    requisition_existing_comments: Array<any> = [];
    requisition_comments: string;

    selectedEmpTypeMap: { [key: string]: boolean } = {};
    selectedUsageEnvMap: { [key: string]: boolean } = {};
    selectedIdCardTypeMap: { [key: string]: boolean } = {};

    isEmpTypeSelected = false;
    isUsageEnvSelected = false;
    idCardTypeSelected = false;

    isValidAmsFileName = false;
    isValidAmsNUmber = false;
    isValidEmpType = false;
    isValidOtherEmpType = false;
    isValidIdCardType = false;
    isValidOtherIdCardType = false;

    loadMasterData() {
        this.getEmployeeDetails();
    }

    getEmployeeDetails() {
        this.definitionDataService.getEmployeeDetails(this.userID).subscribe(
            data => {
                const dataStr = JSON.stringify(data);
                var parsedString = JSON.parse(dataStr);
                this.employeeID = parsedString.employeeNo;
                this.employeeName = parsedString.userName;
                this.mobileNo = parsedString.mobileNumber;
                this.designation = parsedString.designation;
                this.department = parsedString.departmentName;
                this.division = parsedString.divisionName;
                this.emailAddress = parsedString.emailAddress;
                this.fullName = parsedString.fullName;

                this.getRequisitionType();
            },
            err => console.error(err),
            () => console.log('done loading Emplpoyee Details')
        );
    }

    getRequisitionType() {
        //GetRequisitionType
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_RequisitionType).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    if (!data[index].ismsMasterDataDetailsName.includes('Scratch')) {
                        this.listRequisitionType.push(
                            {
                                id: data[index].id,
                                ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName

                            }
                        );
                    }
                }
                this.getPurposeCategory();
            },
            err => console.error(err),
            () => console.log('done loading Provisioning Type Name List')
        );
    }


    getPurposeCategory() {
        //GetPurposeCategory
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_PurposeType).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listPurposeCategory.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getLocation();
            },
            err => console.error(err),
            () => console.log('done loading Provisioning Type Name List')
        );
    }

    getLocation() {
        //GetLocation
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_Location).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listLocation.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getUsageCategory();
            },
            err => console.error(err),
            () => console.log('done loading Provisioning Type Name List')
        );
    }

    getUsageCategory() {
        //GetUsageCategory
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_UsageCategory).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listUsageCategory.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getDateRange();
            },
            err => console.error(err),
            () => console.log('done loading usage category Name List')
        );
    }

    getDateRange() {
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_DateRange).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listDateRange.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getEmpType();
            },
            err => console.error(err),
            () => console.log('done loading Date Range List')
        );
    }

    getEmpType() {
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_EmpType).subscribe(
            data => {
                //console.log(data);
                let newdata = data.sort((a, b) => a.id - b.id);
                for (let index in newdata) {
                    //console.log (newdata[index]);
                    this.listEmpType.push(
                        {
                            id: newdata[index].id,
                            ismsMasterDataDetailsName: newdata[index].ismsMasterDataDetailsName
                        }
                    );
                }

                this.getUsageEnv();
            },
            err => console.error(err),
            () => console.log('done loading Employee Type List')
        );
    }

    getUsageEnv() {
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_UsageEnv).subscribe(
            data => {
                //console.log(data);
                let newdata = data.sort((a, b) => a.id - b.id);
                for (let index in newdata) {
                    //console.log (newdata[index]);
                    this.listUsageEnv.push(
                        {
                            id: newdata[index].id,
                            ismsMasterDataDetailsName: newdata[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getIDCardType();
            },
            err => console.error(err),
            () => console.log('done loading Usage Environment list')
        );
    }

    getIDCardType() {
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_IdType).subscribe(
            data => {
                //console.log(data);
                let newdata = data.sort((a, b) => a.id - b.id);
                for (let index in newdata) {
                    //console.log (newdata[index]);
                    this.listIDCardType.push(
                        {
                            id: newdata[index].id,
                            ismsMasterDataDetailsName: newdata[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getProduct();
            },
            err => console.error(err),
            () => console.log('done loading ID Card Type List')
        );
    }

    getProduct() {
        //GetProducts
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ProductName).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listProduct.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }
                this.getUsersList();
            },
            err => console.error(err),
            () => console.log('done loading Product Name List')
        );
    }

    getUsersList() {
        this.finalListOfUsersToSendWithRqn = [];

        this.workFlowsService.getUserList().subscribe(
            data => {
                Object.assign(this.userData, data);
                this.getImsiType();
            },
            error => {
                console.log('Something wrong here in getUsersList()');
            });
    }

    getImsiType() {
        //GetIMSI Type
        this.definitionDataService.GetMasterDataDetailTypes(this._global.masterData_ImsiType).subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listImsiType.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName
                        }
                    );
                }

                this.getRequisitionDetails();
            },
            err => console.error(err),
            () => console.log('done loading IMSI Type Name List')
        );
    }

    getRequisitionDetails() {
        //call API here to get real data
        this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
        console.log('Requisition Id: ' + this.requisitionId);

        this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
            res => {
                console.log('response is : ' + JSON.stringify(res));
                if (res !== '') {
                    this.requisition = res;
                    this.requisitionLinesDetails = res.requisitionLines;
                    this.employeeDetails = res.employeeDetails;
                    this.requisitionDetails = res.requisitionDetails;
                    this.getComments(this.requisitionDetails['id'], '', '');
                }
            },
            err => {

            }
        );
    }

    getComments(requisitionId, comment, userId) {
        this.ismsworkflowsService.getAllComments(requisitionId, comment, userId).subscribe(
            res => {
                console.log('response is : ' + res);
                if (res !== '') {
                    this.requisition_existing_comments = res;
                }
                this.populateData();
            },
            err => {
            }
        );
    }

    populateData() {
        const dateFormat = 'DD-MM-YYYY';

        //populate requisition date
        this.reqDate = moment(this.requisitionDetails.requisitionDt, dateFormat).toDate();
        console.log(this.reqDate);
        this.requisitionDate.setValue(this.reqDate);

        //populate notification to
        if (this.requisitionDetails.notificationToDetails != undefined && this.requisitionDetails.notificationToDetails != '') {
            this.requisitionDetails.notificationToDetails.split(',').forEach(item => {
                for (var i = 0; i < this.userData.length; i++) {
                    if (this.userData[i].emailAddress == item) {
                        this.finalListOfUsersToSendWithRqn.push(this.userData[i]);
                        break;
                    }
                }
            });
        }

        //populate requisition type
        for (var i = 0; i < this.listRequisitionType.length; i++) {
            if (this.listRequisitionType[i].ismsMasterDataDetailsName == this.requisitionDetails.requisitionType) {
                this.requisitionType.setValue(this.listRequisitionType[i].id);
                break;
            }
        }

        //populate purpose category
        for (var i = 0; i < this.listPurposeCategory.length; i++) {
            if (this.listPurposeCategory[i].ismsMasterDataDetailsName == this.requisitionDetails.purposeCategory) {
                this.purposeCategory.setValue(this.listPurposeCategory[i].id);
                break;
            }
        }

        //populate location
        for (var i = 0; i < this.listLocation.length; i++) {
            if (this.listLocation[i].ismsMasterDataDetailsName == this.requisitionDetails.locationDetails) {
                this.location.setValue(this.listLocation[i].id);
                break;
            }
        }

        //populate Usage Category
        for (var i = 0; i < this.listUsageCategory.length; i++) {
            if (this.listUsageCategory[i].ismsMasterDataDetailsName == this.requisitionDetails.usageCategory) {
                this.usageCategory.setValue(this.listUsageCategory[i].id);
                break;
            }
        }

        //populate ams
        if (this.requisitionDetails.uploadedFileName == undefined || this.requisitionDetails.uploadedFileName == '' || this.requisitionDetails.uploadedFileName == '0' ||
            this.requisitionDetails.amsId == undefined || this.requisitionDetails.amsId == '' || this.requisitionDetails.amsId == '0') {
            this.amsVisible = false;
            this.anyAMS.setValue('No');
            this.amsId.reset();
            this.amsFileName = null;
            this.isValidAmsFileName = false;
            this.fileToUpload = null;
            this.existingAmsFileName = '';
            this.existingAmsFileNameToDisplay = '';
        } else {
            debugger;
            this.amsVisible = true;
            this.anyAMS.setValue('Yes');
            this.amsId.setValue(this.requisitionDetails.amsId);
            this.amsFileName = this.requisitionDetails.uploadedFileName;
            this.isValidAmsFileName = this.amsFileName != null && this.amsFileName != '' && this.amsFileName != '0';
            this.existingAmsFileName = this.requisitionDetails.uploadedFileName;
            this.existingAmsFileNameToDisplay = this.abbreviateMiddle(this.requisitionDetails.uploadedFileName, 15);
            // TODO: how to set ams file?
        }
        this.validateAmsNumber();

        debugger;
        //populate start and end date
        let stDateStr = this.requisitionDetails.testStartDt;
        let enDateStr = this.requisitionDetails.testCompletionDt;

        let stDate = moment(stDateStr, dateFormat).toDate();
        let endDate = moment(enDateStr, dateFormat).toDate();
        let now = new Date();
        now.setHours(0, 0, 0, 0);

        if (stDate >= now) {
            this.startDate.setValue(stDate);
            const monthBucket = this.getMonthRangeBucket(DateTimeUtil.getDuration(stDateStr, enDateStr, dateFormat));

            for (var i = 0; i < this.listDateRange.length; i++) {
                if (this.listDateRange[i].ismsMasterDataDetailsName == monthBucket) {
                    this.dateRange.setValue(this.listDateRange[i].ismsMasterDataDetailsName);
                    break;
                }
            }
            this.onChange(monthBucket);
            this.endDate.setValue(endDate);
        } else {
            this.startDate.reset();
            this.dateRange.reset();
            this.endDate.reset();
        }

        //populate employee type
        this.requisitionDetails.selectedEmpType.split(',').forEach(item => {
            let found = false;
            for (let i = 0; i < this.listEmpType.length; i++) {
                if (this.listEmpType[i].ismsMasterDataDetailsName == item) {
                    found = true;
                    break;
                }
            }
            if (found) {
                this.selectedEmpType.push(item);
            } else {
                this.selectedEmpType.push('Others');
                this.empVisible = true;
                this.otherEmpType.setValue(item);
            }
        });

        for (let i = 0; i < this.listEmpType.length; i++) {
            this.selectedEmpTypeMap[this.listEmpType[i].ismsMasterDataDetailsName] = this.selectedEmpType.includes(this.listEmpType[i].ismsMasterDataDetailsName);
        }

        this.validateEmpTypeSelection();

        console.log(this.selectedEmpType)
        console.log(this.selectedEmpTypeMap);

        //populate Usage Environment
        this.requisitionDetails.selectedUsageEnv.split(',').forEach(item => {
            for (let i = 0; i < this.listUsageEnv.length; i++) {
                if (this.listUsageEnv[i].ismsMasterDataDetailsName == item) {
                    this.selectedUsageEnv.push(item);
                    break;
                }
            }
        });

        for (let i = 0; i < this.listUsageEnv.length; i++) {
            this.selectedUsageEnvMap[this.listUsageEnv[i].ismsMasterDataDetailsName] = this.selectedUsageEnv.includes(this.listUsageEnv[i].ismsMasterDataDetailsName);
        }

        this.validateUsageEnvSelection();

        console.log(this.selectedUsageEnv);
        console.log(this.selectedUsageEnvMap);

        //populate ID card type
        this.requisitionDetails.selectedIDCardType.split(',').forEach(item => {
            let found = false;
            for (let i = 0; i < this.listIDCardType.length; i++) {
                if (this.listIDCardType[i].ismsMasterDataDetailsName == item) {
                    found = true;
                    break;
                }
            }
            if (found) {
                this.selectedIDCardType.push(item);
            } else {
                this.selectedIDCardType.push('Others');
                this.cardVisible = true;
                this.otherIDCardType.setValue(item);
            }
        });

        for (let i = 0; i < this.listIDCardType.length; i++) {
            this.selectedIdCardTypeMap[this.listIDCardType[i].ismsMasterDataDetailsName] = this.selectedIDCardType.includes(this.listIDCardType[i].ismsMasterDataDetailsName);
        }

        this.validateIdCardTypeSelection();

        console.log(this.selectedIDCardType);
        console.log(this.selectedIdCardTypeMap);

        //populate ID Card Number
        this.cardNo.setValue(this.requisitionDetails.cardNo);

        //populate Test Device IMEI Number
        this.imei.setValue(this.requisitionDetails.imei);

        //populate Purpose Details
        this.purposeDetails.setValue(this.requisitionDetails.purposeDetails);

        // populate Please mention Specific reason or project name or UAT name?
        this.question1.setValue(this.requisitionDetails.question1);

        // populate Why this test sim required? Like pre live UAT or post live UAT or general testing etc.
        this.question2.setValue(this.requisitionDetails.question2);

        // populate Who will be associated in UAT?
        this.question3.setValue(this.requisitionDetails.question3);

        // populate Probable outcome from UAT?
        this.question4.setValue(this.requisitionDetails.question4);

        //populate requisition lines
        this.requisitionLinesDetails.forEach(item => {
            this.addLine();
            const index = this.requisitionLines.length - 1;
            const group = this.requisitionLines.at(index) as FormGroup;

            group.get('creditLimit').setValue(item.creditLimit);
            group.get('quantity').setValue(item.quantity);
            group.get('specialRequirementOther').setValue(item.specialRequirementOther);

            group.get('product').setValue(item.product);
            group.get('imsiType').setValue(item.imsiType);
            group.get('specialRequirement').setValue(item.specialRequirement);
        });

        this.isLoading = false;
    }

    getUserIdsFirstWay($event) {

        //console.log($event.target.value);

        //let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;

        let userId = $event.target.value;

        this.userList1 = [];

        if (userId.length > 2) {
            if ($event.timeStamp - this.lastkeydown1 > 200) {
                this.userList1 = this.searchFromArray(this.userData, userId);
            }
        }
    }

    searchFromArray(arr, regex) {
        let matches = [], i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i]['userName'].match(regex)) {
                matches.push(arr[i]);
            }
        }
        return matches;
    };

    addRecipient() {

        if (this.notificationTo.value == null || this.notificationTo.value == undefined || this.notificationTo.value == '') {
            return;
        }

        for (var i = 0; i < this.userData.length; i++) {
            if (this.userData[i]['userName'] == this.notificationTo.value) {
                this.finalListOfUsersToSendWithRqn.push(this.userData[i]);
                break;
            }
        }

        this.notificationTo.setValue('');
    }

    deleteRecipient(listObj) {
        for (var i = 0; i < this.finalListOfUsersToSendWithRqn.length; i++) {
            if (this.finalListOfUsersToSendWithRqn[i]['userName'] == listObj['userName']) {
                this.finalListOfUsersToSendWithRqn.splice(i, 1);
                break;
            }
        }
    }

    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private ismsworkflowsService: IsmsworkflowsService, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {
        this.minStartDate = new Date();
        this.headerDateData = {};
        this.listSpecialRequirement = environment.dataSpecialRequirementTypes;
        this.isLoading = true;

        // Get Current User Profile
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
            //console.log('Current user: ' + this.userName);
        } else {
            //console.log('Current user not found');
            this.router.navigate(['pages/login']);
        }
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();

        // Subscribe to value changes on "otherEmpType"
        this.newSimRequisitionForm.get('otherEmpType').valueChanges.subscribe(value => {
            this.validateEmpTypeSelection();
        });

        // Subscribe to value changes on "otherIDCardType"
        this.newSimRequisitionForm.get('otherIDCardType').valueChanges.subscribe(value => {
            this.validateIdCardTypeSelection();
        });

        // Subscribe to value changes on "otherIDCardType"
        this.newSimRequisitionForm.get('amsId').valueChanges.subscribe(value => {
            this.validateAmsNumber();
        });

        this.loadMasterData();
    }

    createFormControls() {
        this.purposeCategory = new FormControl('', Validators.required);
        this.location = new FormControl('', Validators.required);
        this.usageCategory = new FormControl('', Validators.required);
        this.amsId = new FormControl('', [Validators.maxLength(20)]);
        this.imei = new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(500)]);
        this.cardNo = new FormControl('', [Validators.required, Validators.maxLength(500)]);
        this.startDate = new FormControl('', Validators.required);
        this.dateRange = new FormControl('', Validators.required);
        this.anyAMS = new FormControl('', Validators.required);
        this.endDate = new FormControl({value: '', disabled: false}, Validators.required);
        this.empType = new FormControl({value: ''}, Validators.required);
        this.otherEmpType = new FormControl('', [Validators.maxLength(30)]);
        this.usageEnv = new FormControl({value: ''}, Validators.required);
        this.IDCardType = new FormControl({value: ''}, Validators.required);
        this.otherIDCardType = new FormControl('', [Validators.maxLength(20)]);
        this.purposeDetails = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.question1 = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.question2 = new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(280)]);
        this.question3 = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.question4 = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.notificationTo = new FormControl('');

        this.requisitionType = new FormControl('', Validators.required);
        this.requisitionDate = new FormControl('', Validators.required);
        //this.requisitionDate.setValue(moment(new Date()).format('DD-MM-YYYY'));
        this.requisitionLines = new FormArray([]);
    }

    createForm() {
        this.newSimRequisitionForm = new FormGroup({
            requisitionDate: this.requisitionDate,
            requisitionType: this.requisitionType,
            purposeCategory: this.purposeCategory,
            location: this.location,
            usageCategory: this.usageCategory,
            amsId: this.amsId,
            imei: this.imei,
            cardNo: this.cardNo,
            startDate: this.startDate,
            dateRange: this.dateRange,
            anyAMS: this.anyAMS,
            endDate: this.endDate,
            empType: this.empType,
            otherEmpType: this.otherEmpType,
            usageEnv: this.usageEnv,
            IDCardType: this.IDCardType,
            otherIDCardType: this.otherIDCardType,
            purposeDetails: this.purposeDetails,
            question1: this.question1,
            question2: this.question2,
            question3: this.question3,
            question4: this.question4,
            notificationTo: this.notificationTo,
            requisitionLines: this.requisitionLines
        });
    }

    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    get RequisitionLines(): FormArray {
        return this.newSimRequisitionForm.get('requisitionLines') as FormArray;
    }


    addLine() {
        //this.RequisitionLines.push(new FormControl());

        this.RequisitionLines.push(new FormGroup(
            {
                product: new FormControl('', Validators.required),
                creditLimit: new FormControl(0),
                quantity: new FormControl(0),
                imsiType: new FormControl(''),
                specialRequirement: new FormControl('', Validators.required),
                specialRequirementOther: new FormControl(''),
                assignProduct: new FormControl(0),
                assignQuantity: new FormControl(0)
            }
        ));
    }

    deleteLine(index: number) {
        this.requisitionLines.removeAt(index);
    }

    formValidation() {
        let validationPassed: boolean;
        let validationMessage: string[] = [];
        validationPassed = true;
        //validationMessage = "";

        var currDate = new Date();

        console.log(this.startDate.value);
        console.log(currDate);

        console.log(this.startDate.value.getTime());
        console.log(currDate.getTime());

        const diffTime = Math.abs(this.startDate.value.getTime() - currDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        console.log(diffDays);

        if (this.startDate.value < currDate && diffDays >= 1) {
            validationMessage.push('Start date cannot be a date in the past');
            validationPassed = false;
        } else if (this.endDate.value < currDate) {
            validationMessage.push('End date must be greater than current date.');
            validationPassed = false;
        } else if (this.endDate.value <= this.startDate.value) {
            validationMessage.push('End date must be greater than start date');
            validationPassed = false;
        } else if (this.purposeDetails.value == null || this.purposeDetails.value == '' || this.purposeDetails.value == undefined || this.purposeDetails.value.length < 50) {
            validationMessage.push('Purpose details must contain a minimum of 50 characters');
            validationPassed = false;
        } else if (this.question1.value == null || this.question1.value == '' || this.question1.value == undefined || this.question1.value.length < 50) {
            validationMessage.push('Question1 must contain a minimum of 50 characters');
            validationPassed = false;
        } else if (this.question2.value == null || this.question2.value == '' || this.question2.value == undefined || this.question2.value.length < 20) {
            validationMessage.push('Question2 must contain a minimum of 20 characters');
            validationPassed = false;
        } else if (this.question3.value == null || this.question3.value == '' || this.question3.value == undefined || this.question3.value.length < 50) {
            validationMessage.push('question3 must contain a minimum of 50 characters');
            validationPassed = false;
        } else if (this.question4.value == null || this.question4.value == '' || this.question4.value == undefined || this.question4.value.length < 50) {
            validationMessage.push('question4 must contain a minimum of 50 characters');
            validationPassed = false;
        } else if (this.amsVisible) {
            if (this.amsId.value == null || this.amsId.value == '' || this.amsId.value.length > 30) {
                validationMessage.push('AMS Number is either Blank or crossed maximum limit of 30 characters');
                validationPassed = false;
            } else if (this.amsFileName == null) {
                validationMessage.push('Please upload AMS File');
                validationPassed = false;
            }
        }

        if (this.selectedEmpType.length != 0) {
            for (var i = 0; i < this.selectedEmpType.length; i++) {
                if (this.selectedEmpType[i] == 'Others') {
                    if (this.otherEmpType.value == null || this.otherEmpType.value == '' || this.otherEmpType.value.length > 30) {
                        validationMessage.push('Employee Type \'Others\' either Blank or crossed maximum limit of 30 characters');
                        validationPassed = false;
                    } else {
                        this.selectedEmpType[i] = this.otherEmpType.value;
                    }
                }
            }
            console.log(this.selectedEmpType);
        }

        if (this.selectedUsageEnv.length == 0) {
            validationMessage.push('Please select Usage Environment');
            validationPassed = false;
        } else {
            console.log(this.selectedUsageEnv);
        }

        if (this.selectedIDCardType.length != 0) {
            for (var i = 0; i < this.selectedIDCardType.length; i++) {
                if (this.selectedIDCardType[i] == 'Others') {
                    if (this.otherIDCardType.value == null || this.otherIDCardType.value == '' || this.otherIDCardType.value.length > 20) {
                        validationMessage.push('ID Card Type \'Others\' either Blank or crossed maximum limit of 30 characters');
                        validationPassed = false;
                    } else {
                        this.selectedIDCardType[i] = this.otherIDCardType.value;
                    }
                }
            }
            console.log(this.selectedIDCardType);
        }

        console.log('new check');
        console.log(this.requisitionType.value);
        //validationPassed = false;

        if (this.requisitionType.value == 300) { //test sim

            console.log(this.endDate.value);

            var endDateAsDate = new Date(this.endDate.value);
            console.log(endDateAsDate);

            console.log(this.endDate.value.getTime());
            const diffTimeAlt = Math.abs(this.endDate.value.getTime() - this.startDate.value.getTime());
            const diffDaysAlt = Math.floor(diffTimeAlt / (1000 * 60 * 60 * 24));

            console.log(diffTimeAlt);
            console.log(diffDaysAlt);

            if (diffDaysAlt > 365) {
                alert('You cannot specify a test date period greater than 1 year');
                validationPassed = false;
            }
        }

        for (var i = 0; i < this.requisitionLines.length; i++) {

            var creditLimit = 0;
            var quantity = 0;

            if (this.requisitionLines.controls[i]['value'] != null &&
                this.requisitionLines.controls[i]['value'] != undefined &&
                this.requisitionLines.controls[i]['value'] != '' &&
                this.requisitionLines.controls[i]['value']['creditLimit'] != null &&
                this.requisitionLines.controls[i]['value']['creditLimit'] != undefined &&
                this.requisitionLines.controls[i]['value']['creditLimit'] != '') {
                creditLimit = parseFloat(this.requisitionLines.controls[i]['value']['creditLimit']);
            }

            if (creditLimit >= 0) { /* do nothing */
            } else {
                validationMessage.push('For line ' + (i + 1) + ' invalid credit limit amount given.');
                validationPassed = false;
            }

            /////////// ///////////////// ///////////////// ////////////////

            if (this.requisitionLines.controls[i]['value'] != null &&
                this.requisitionLines.controls[i]['value'] != undefined &&
                this.requisitionLines.controls[i]['value'] != '' &&
                this.requisitionLines.controls[i]['value']['quantity'] != null &&
                this.requisitionLines.controls[i]['value']['quantity'] != undefined &&
                this.requisitionLines.controls[i]['value']['quantity'] != '') {
                quantity = parseInt(this.requisitionLines.controls[i]['value']['quantity']);
            }

            if (quantity > 0) { /* do nothing */
            } else {
                validationMessage.push('For line ' + (i + 1) + ' invalid quantity given.');
                validationPassed = false;
            }

        }

        if (!validationPassed) {
            this.dangerAlertShow = true;
            this.dangerAlertMessage = validationMessage;
        }

        return validationPassed;
    }


    // FORM SUBMISSION
    onNewSimRequisitionSubmit() {
        //console.log("this.defFlowFound is "+this.defFlowFound);
        if (this.newSimRequisitionForm.valid) {

            /////////////////////////////////////////// //////////////////////////////////
            ///////////////////////// /////////////////////// //////////////////////////////////
            this.topFunction();
            this.isLoading = true;
            console.log('Form Submitted!');

            const theReqDate = this.FormatTheDate(new Date());
            const theStartDate = this.FormatTheDate(this.newSimRequisitionForm.get('startDate').value);
            const theEndDate = this.FormatTheDate(this.newSimRequisitionForm.get('endDate').value);

            console.log('log start');
            console.log(theReqDate);

            if (!this.formValidation()) {
                this.isLoading = false;
                return;
            }

            ////////////////////////////////////////////////////////////////////
            if (confirm('Are you sure you want to submit this requisition? Please review that all your data is correct.')) {
                //do nothing here
            } else {
                this.isLoading = false;
                return;
            }
            ////////////////////////////////////////////////////////////////////

            this.headerDateData.requisitionDate = theReqDate;
            console.log(this.headerDateData);
            this.headerDateData.theStartDate = theStartDate;
            this.headerDateData.theEndDate = theEndDate;
            this.headerDateData.requisitionType = this.newSimRequisitionForm.get('requisitionType').value;
            this.headerDateData.purposeCategory = this.newSimRequisitionForm.get('purposeCategory').value;
            this.headerDateData.location = this.newSimRequisitionForm.get('location').value;
            this.headerDateData.usageCategory = this.newSimRequisitionForm.get('usageCategory').value;
            //this.headerDateData.amsId = this.newSimRequisitionForm.get('amsId').value;
            this.headerDateData.imei = this.newSimRequisitionForm.get('imei').value;
            this.headerDateData.selectedEmpType = this.selectedEmpType.map(x => x).join(',');
            this.headerDateData.selectedIDCardType = this.selectedIDCardType.map(x => x).join(',');
            this.headerDateData.selectedUsageEnv = this.selectedUsageEnv.map(x => x).join(',');
            this.headerDateData.cardNo = this.newSimRequisitionForm.get('cardNo').value;

            this.headerDateData.endDate = this.newSimRequisitionForm.get('endDate').value;
            this.headerDateData.purposeDetails = this.newSimRequisitionForm.get('purposeDetails').value;
            this.headerDateData.question1 = this.newSimRequisitionForm.get('question1').value;
            this.headerDateData.question2 = this.newSimRequisitionForm.get('question2').value;
            this.headerDateData.question3 = this.newSimRequisitionForm.get('question3').value;
            this.headerDateData.question4 = this.newSimRequisitionForm.get('question4').value;
            this.headerDateData.notificationTo = '';
            if (this.anyAMS.value == 'Yes') {
                this.headerDateData.uploadedFileName = this.fileToUpload.name;
                this.headerDateData.amsId = this.amsId.value;
            } else {
                this.headerDateData.uploadedFileName = 0;
                this.headerDateData.amsId = 0;
            }


            console.log('this.finalListOfUsersToSendWithRqn');
            console.log(this.finalListOfUsersToSendWithRqn);

            if (this.finalListOfUsersToSendWithRqn != null && this.finalListOfUsersToSendWithRqn.length > 0) {
                for (var i = 0; i < this.finalListOfUsersToSendWithRqn.length; i++) {
                    this.headerDateData.notificationTo += this.finalListOfUsersToSendWithRqn[i]['emailAddress'];
                    if (i >= (this.finalListOfUsersToSendWithRqn.length - 1)) {
                        //do nothing
                    } else {
                        this.headerDateData.notificationTo += ',';
                    }
                }
            }
            console.log(this.headerDateData.notificationTo);
            this.headerDateData.requisitionLines = this.newSimRequisitionForm.get('requisitionLines').value;

            for (var i = 0; i < this.headerDateData.requisitionLines.length; i++) {
                if (this.headerDateData.requisitionLines[i]['imsiType'] == null ||
                    this.headerDateData.requisitionLines[i]['imsiType'] == undefined ||
                    this.headerDateData.requisitionLines[i]['imsiType'] == '') {
                    this.headerDateData.requisitionLines[i]['imsiType'] = '0';
                }
            }

            let resource = (this.headerDateData);
            console.log(resource);
            console.log('Add Button clicked: ' + resource);


            this.ismsworkflowsService.CreateNewTestSimRequest(this._global.wrid_NewSimRequision, this.groupID, this.userID, this.WR_Name, resource).subscribe(
                res => {
                    console.log('response is : ' + res.message);

                    if (res !== '') {
                        this.newSimRequisitionForm.reset();
                        this.successAlertShow = true;
                        /*if(this.groupID == this._global.groupID_SSM){
                            this.successAlertMessage = "Requisition no "+ res.message +" has been submitted successfully and forwarded to CLC for approval.";
                        }
                        else{
                        */
                        this.successAlertMessage = 'Requisition no ' + res.message + ' has been submitted successfully and forwarded to SSM for approval.';
                        //}
                        alert(this.successAlertMessage);
                        setTimeout(() => {
                            this.isLoading = false;
                            this.router.navigate(['nsa/newrequisitiondetails']);
                        }, 4000);
                    }
                },
                err => {
                    this.isLoading = false;
                    console.log('err.status : ' + err.status);
                    this.dangerAlertShow = true;
                    this.dangerAlertMessage.push(' .');
                }
            );

            /////////////////// //////////////// /////////////// ///////////////////////////////
        }
        ///////////////// //////////////////////////// ///////////////////////////////

    }


    FormatTheDate(selectedrequisitionDate: any): string {

        console.log('selectedrequisitionDate : ' + selectedrequisitionDate);
        /*	var date = new Date(selectedrequisitionDate);
        var month = ("0" + (date.getMonth()+1)).slice(-2);
        var day  = ("0" + date.getDate()).slice(-2);
            var formattedDate=[day,month,date.getFullYear()].join("-");*/
        const date = moment(selectedrequisitionDate);
        //console.log('jhhhhhhhhhhhhhhhhhhhhhhhhhh'+date);
        const formattedDate = moment(date).format('DD-MM-YYYY');
        //console.log("formattedDate : "+formattedDate);
        return formattedDate;

    }

    clearForm(event: any) {
        window.location.reload();
    }

    backButton(event: any) {
        //console.log(event);
        this.router.navigateByUrl('/nsa/newrequisition');
    }

    onchangeEmp(value) {
        if (value != '') {
            if (value == 'Others') {
                this.empVisible = !this.empVisible;
            }
            let checked = this.selectedEmpTypeMap[value];
            if (checked) {
                this.selectedEmpType.push(value);
            } else {
                let index = this.selectedEmpType.indexOf(value);
                if (index != -1) {
                    this.selectedEmpType.splice(index, 1);
                }
            }
        }
        this.validateEmpTypeSelection();

        console.log(this.selectedEmpType);
        console.log(this.selectedEmpTypeMap);
    }

    onChangeanyAMS(value) {
        console.log('Any AMS Value: ' + value);
        if (value == 'Yes') {
            //this.amsId.enable();
            this.amsVisible = true;
        } else {
            //this.amsId.disable();
            this.amsVisible = false;
            //this.amsFileName = null;
        }
    }

    onchangeusageEnv(value) {
        if (value != '') {
            let checked = this.selectedUsageEnvMap[value];
            if (checked) {
                this.selectedUsageEnv.push(value);
            } else {
                let index = this.selectedUsageEnv.indexOf(value);
                if (index != -1) {
                    this.selectedUsageEnv.splice(index, 1);
                }
            }
        }
        this.validateUsageEnvSelection();

        console.log(this.selectedUsageEnv);
        console.log(this.selectedUsageEnvMap);
    }

    onchangeIDType(value) {
        if (value != '') {
            if (value == 'Others') {
                this.cardVisible = !this.cardVisible;
            }
            let checked = this.selectedIdCardTypeMap[value];
            if (checked) {
                this.selectedIDCardType.push(value);
            } else {
                let index = this.selectedIDCardType.indexOf(value);
                this.selectedIDCardType.splice(index, 1);
            }
        }

        this.validateIdCardTypeSelection();

        console.log(this.selectedIDCardType);
        console.log(this.selectedIdCardTypeMap);
    }

    onChange(value) {
        if (this.startDate.value != '' && value != '') {
            /* this.visible = !this.visible; */
            //this.endDate.enable();
            this.endDate.reset();
            const theStartDate = this.FormatTheDate(this.startDate.value);
            this.minDate = new Date();
            this.maxDate = new Date();
            if (value == '0 to 3 Months') {
                var minMonth = moment(theStartDate, 'DD-MM-YYYY').add(0, 'M');
                var maxMonth = moment(theStartDate, 'DD-MM-YYYY').add(3, 'M');
                this.minDate = new Date(minMonth.year(), minMonth.month(), minMonth.date());
                this.maxDate = new Date(maxMonth.year(), maxMonth.month(), maxMonth.date());
            }
            if (value == '3 to 6 Months') {
                var minMonth = moment(theStartDate, 'DD-MM-YYYY').add(3, 'M');
                var maxMonth = moment(theStartDate, 'DD-MM-YYYY').add(6, 'M');
                this.minDate = new Date(minMonth.year(), minMonth.month(), minMonth.date());
                this.maxDate = new Date(maxMonth.year(), maxMonth.month(), maxMonth.date());
            }
            if (value == '6 to 9 Months') {
                var minMonth = moment(theStartDate, 'DD-MM-YYYY').add(6, 'M');
                var maxMonth = moment(theStartDate, 'DD-MM-YYYY').add(9, 'M');
                this.minDate = new Date(minMonth.year(), minMonth.month(), minMonth.date());
                this.maxDate = new Date(maxMonth.year(), maxMonth.month(), maxMonth.date());
            }
            if (value == '9 to 12 Months') {
                var minMonth = moment(theStartDate, 'DD-MM-YYYY').add(9, 'M');
                var maxMonth = moment(theStartDate, 'DD-MM-YYYY').add(12, 'M');
                this.minDate = new Date(minMonth.year(), minMonth.month(), minMonth.date());
                this.maxDate = new Date(maxMonth.year(), maxMonth.month(), maxMonth.date());
            }
        }
    }

    onSDateChange() {
        this.endDate.reset();
        this.dateRange.reset();
    }

    handleFileInput(event) {
        this.fileerror = false;
        this.filesuccess = false;
        this.fileToUpload = event.target.files.item(0);
        this.amsFileName = this.fileToUpload.name;
        this.isValidAmsFileName = this.amsFileName != null && this.amsFileName != '' && this.amsFileName != '0';

        if (this.amsFileName.length > 30) {
            alert('File Name max length 30 digit');
            return (event.target.value = null);
        } else if ((this.fileToUpload.size) / 1024 / 1024 > 5) {
            alert('Max File Size is 5 MB');
            return (event.target.value = null);
        }
        outer: if (this.fileToUpload.type == 'application/x-zip-compressed' || this.fileToUpload.type == 'application/pdf'
            || this.fileToUpload.type == 'message/rfc822' || this.amsFileName.endsWith('.msg')) {
            console.log(this.fileToUpload.type);
            break outer;
        } else {
            alert('Allowed file type is .pdf, .msg, .eml, .zip');
            return (event.target.value = null);
        }

        this.amsFileSelected = true;

        const formData: FormData = new FormData();
        formData.append('ssm-file', this.fileToUpload, this.amsFileName);
        console.log(formData);
        var result = this.fileoperationService.uploadSSMCSV(formData);
        console.log(result);
        result.subscribe(res => {
            console.log(res);
            if (res !== '') {
                this.amsFileUploaded = true;
                this.successAlertMessage = 'File Uploaded Successfully';
                alert(res.message);
            }
        })
    }

    abbreviateMiddle(str: string, maxLength: number): string {
        if (str.length <= maxLength) {
            return str;
        }
        if (maxLength <= 3) {
            return str.slice(0, maxLength);
        } // Not enough room for "..."

        const charsToShow = maxLength - 3;
        const frontChars = Math.ceil(charsToShow / 2);
        const backChars = Math.floor(charsToShow / 2);

        return str.slice(0, frontChars) + '...' + str.slice(str.length - backChars);
    }

    getMonthRangeBucket(duration: DurationInfo): string {
        const months = duration.years * 12 + duration.months + (duration.days > 0 ? 1 : 0);

        if (months <= 3) {
            return '0 to 3 Months';
        } else if (months <= 6) {
            return '3 to 6 Months';
        } else if (months <= 9) {
            return '6 to 9 Months';
        } else if (months <= 12) {
            return '9 to 12 Months';
        } else {
            throw new Error('Invalid date range: More than 12 months');
        }
    }

    deleteAmsFile() {
        this.amsFileDeleted = true;
        this.amsFileUploaded = false;
        this.amsFileSelected = false;
        //this.amsId.reset();
        this.amsFileName = null;
        this.isValidAmsFileName = false;
        this.fileToUpload = null;
    }

    validateEmpTypeSelection(): boolean {
        this.isEmpTypeSelected = this.selectedEmpType.length > 0;
        this.isValidEmpType = this.selectedEmpType.length > 0;

        if (this.selectedEmpType.includes('Others')) {
            this.isValidOtherEmpType = !(this.otherEmpType.value == undefined || this.otherEmpType.value == '');
            this.isValidEmpType = !(this.otherEmpType.value == undefined || this.otherEmpType.value == '');
        }
        return this.isEmpTypeSelected;
    }

    validateIdCardTypeSelection(): boolean {
        this.idCardTypeSelected = this.selectedIDCardType.length > 0;
        this.isValidIdCardType = this.selectedIDCardType.length > 0;

        if (this.selectedIDCardType.includes('Others')) {
            this.isValidOtherIdCardType = !(this.otherIDCardType.value == undefined || this.otherIDCardType.value == '');
            this.isValidIdCardType = !(this.otherIDCardType.value == undefined || this.otherIDCardType.value == '');
        }
        return this.idCardTypeSelected;
    }

    validateUsageEnvSelection(): boolean {
        this.isUsageEnvSelected = this.selectedUsageEnv.length > 0;
        return this.isUsageEnvSelected;
    }

    validateAmsNumber(): boolean {
        this.isValidAmsNUmber = this.amsId.value != undefined && this.amsId.value != '';
        return this.isValidAmsNUmber;
    }
}
