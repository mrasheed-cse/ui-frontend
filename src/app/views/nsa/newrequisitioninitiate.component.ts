import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators, UntypedFormArray} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DefinitionDataService} from './services/definitiondata.service';
import {IsmsworkflowsService} from './services/ismsworkflows.service';
import {WorkflowsService} from './services/workflows.service';
import {FileoperationService} from '../nsa/services/fileoperation.service';






import {LoginService} from '../pages/LoginService';
import {LoggedInUser} from '../pages/loggedInUser';

import {NewTestSimRequisition, RequisitionLine} from './models/NewTestSimRequisition'
import {AppGlobals} from './../../app.global';
import * as moment from 'moment';

@Component({
    selector: 'app-newrequisitioninitiate',
    templateUrl: './newrequisitioninitiate.component.html',
    styleUrls: ['./nsa_styles.css'],
    providers: [WorkflowsService, DefinitionDataService, IsmsworkflowsService, AppGlobals, LoginService, FileoperationService]
})
export class NewrequisitioninitiateComponent implements OnInit {


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

    fileToUpload: File = null;
    fileuploadstatus: string;
    fileName: string;
    fileerror: boolean = false;
    filesuccess: boolean = false;
    uploading: boolean = false;
    url: string;
    empVisible: boolean = false;
    cardVisible: boolean = false;
    amsVisible: boolean = false;

    public dangerAlertShow: boolean = false;
    public dangerAlertMessage: string[] = [];
    public successAlertShow: boolean = false;
    public successAlertMessage: string = '';
    public infoAlertShow: boolean = false;
    public infoAlertMessage: string = '';
    public isLoading: boolean = false;
    public defFlowFound: boolean = false;
    public sDate = '';

    newSimRequisitionForm: UntypedFormGroup;
    purposeCategory: UntypedFormControl;


    location: UntypedFormControl;
    usageCategory: UntypedFormControl;
    amsId: UntypedFormControl;
    imei: UntypedFormControl;
    cardNo: UntypedFormControl;
    anyAMS: UntypedFormControl;
    startDate: UntypedFormControl;
    dateRange: UntypedFormControl;
    endDate: UntypedFormControl;
    empType: UntypedFormControl;
    otherEmpType: UntypedFormControl;
    usageEnv: UntypedFormControl;
    cmpEnv: UntypedFormControl;
    IDCardType: UntypedFormControl;
    otherIDCardType: UntypedFormControl;

    purposeDetails: UntypedFormControl;
    question1: UntypedFormControl;
    question2: UntypedFormControl;
    question3: UntypedFormControl;
    question4: UntypedFormControl;
    notificationTo: UntypedFormControl;
    requisitionType: UntypedFormControl;
    requisitionDate: UntypedFormControl;
    requisitionLines: UntypedFormArray;

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

    cmpEnvironments = ['Yes', 'No'];
    selectedCmpEnv: string | null = null;

    todayDate: Date;
    minDate: Date;
    maxDate: Date;

    headerDateData: any;

    anyamsList = [{value: 'Yes'}, {value: 'No'}];


    /*keyDownHandler(event: Event) {
        console.log(event);
        if (event['which'] === 43 || event['which'] === 45)
            event.preventDefault();
    }*/

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
        this.definitionDataService.getAllMasterProduct().subscribe(
            data => {
                //console.log(data);
                for (let index in data) {
                    //console.log (data[index]);
                    this.listProduct.push(
                        {
                            id: data[index].id,
                            ismsMasterDataDetailsName: data[index].ismsMasterDataDetailsName,
                            masterProductId: data[index].masterProductId
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

                this.isLoading = false;
                this.purposeCategory.setValue(this.listPurposeCategory[0]['id']);
                this.location.setValue(this.listLocation[0]['id']);
                this.usageCategory.setValue(this.listUsageCategory[0]['id']);
                this.requisitionType.setValue(this.listRequisitionType[0]['id']);
            },
            err => console.error(err),
            () => console.log('done loading IMSI Type Name List')
        );
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

    constructor(private router: Router, private loginService: LoginService, private http: HttpClient, private _global: AppGlobals, private definitionDataService: DefinitionDataService, private ismsworkflowsService: IsmsworkflowsService, private workFlowsService: WorkflowsService, private fileoperationService: FileoperationService) {

        this.headerDateData = {};

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

        this.listSpecialRequirement = environment.dataSpecialRequirementTypes;

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
            },
            err => console.error(err),
            () => console.log('done loading Emplpoyee Details')
        );

        //GetWR_Name
        /*
        this.definitionDataService.GetWR_Name_forIsms(this._global.wrid_NewSimRequision).subscribe(
        data => {
            const dataStr = JSON.stringify(data);

            JSON.parse(dataStr, (key, value) => {
              if (typeof value === 'string') {
                this.WR_Name = value;
                return value;
              }
            });
          },
          err => console.error(err),
          ()=> console.log('done loading Work Request Name')
          );
    */

        //Get Today Date
        this.todayDate = new Date();
    } //end of constructor

    ngOnInit() {
        this.isLoading = true;
        this.createFormControls();
        this.createForm();
    }


    createFormControls() {
        this.purposeCategory = new UntypedFormControl('', Validators.required);
        this.location = new UntypedFormControl({value: ''}, Validators.required);
        this.usageCategory = new UntypedFormControl({value: ''}, Validators.required);
        this.amsId = new UntypedFormControl('', [Validators.maxLength(20)]);
        this.imei = new UntypedFormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(500)]);
        this.cardNo = new UntypedFormControl('', [Validators.required, Validators.maxLength(500)]);
        this.startDate = new UntypedFormControl('', Validators.required);
        this.dateRange = new UntypedFormControl('', Validators.required);
        this.anyAMS = new UntypedFormControl('', Validators.required);
        this.endDate = new UntypedFormControl({value: '', disabled: true}, Validators.required);
        this.empType = new UntypedFormControl({value: ''}, Validators.required);
        this.otherEmpType = new UntypedFormControl('', [Validators.maxLength(120)]);
        this.usageEnv = new UntypedFormControl({value: ''}, Validators.required);
        this.cmpEnv = new UntypedFormControl({value: ''}, Validators.required);
        this.IDCardType = new UntypedFormControl({value: ''}, Validators.required);
        this.otherIDCardType = new UntypedFormControl('', [Validators.maxLength(120)]);
        this.purposeDetails = new UntypedFormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.question1 = new UntypedFormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.question2 = new UntypedFormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(280)]);
        this.question3 = new UntypedFormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.question4 = new UntypedFormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]);
        this.notificationTo = new UntypedFormControl('');

        this.requisitionType = new UntypedFormControl({value: ''}, Validators.required);
        this.requisitionDate = new UntypedFormControl('');
        this.requisitionDate.setValue(moment(new Date()).format('DD-MM-YYYY'));
        this.requisitionLines = new UntypedFormArray([
            //new FormControl(0)
            new UntypedFormGroup({
                product: new UntypedFormControl('', Validators.required),
                creditLimit: new UntypedFormControl(0),
                quantity: new UntypedFormControl(0),
                imsiType: new UntypedFormControl(''),
                specialRequirement: new UntypedFormControl('', Validators.required),
                specialRequirementOther: new UntypedFormControl(''),
                assignProduct: new UntypedFormControl(0),
                assignQuantity: new UntypedFormControl(0)
            })]);

    }

    createForm() {
        this.newSimRequisitionForm = new UntypedFormGroup({
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
            cmpEnv: this.cmpEnv,
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
        this.getRequisitionType();
    }

    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    get RequisitionLines(): UntypedFormArray {
        return this.newSimRequisitionForm.get('requisitionLines') as UntypedFormArray;
    }


    addLine() {
        //this.RequisitionLines.push(new FormControl());

        this.RequisitionLines.push(new UntypedFormGroup(
            {
                product: new UntypedFormControl('', Validators.required),
                creditLimit: new UntypedFormControl(0),
                quantity: new UntypedFormControl(0),
                imsiType: new UntypedFormControl(''),
                specialRequirement: new UntypedFormControl('', Validators.required),
                specialRequirementOther: new UntypedFormControl(''),
                assignProduct: new UntypedFormControl(0),
                assignQuantity: new UntypedFormControl(0)
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
            } else if (this.fileName == null) {
                validationMessage.push('Please upload AMS File');
                validationPassed = false;
            }
        }

        if (this.selectedEmpType.length != 0) {
            for (var i = 0; i < this.selectedEmpType.length; i++) {
                if (this.selectedEmpType[i] == 'Others') {
                    if (this.otherEmpType.value == null || this.otherEmpType.value == '' || this.otherEmpType.value.length > 120) {
                        validationMessage.push('Employee Type \'Others\' either Blank or crossed maximum limit of 120 characters');
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
                    if (this.otherIDCardType.value == null || this.otherIDCardType.value == '' || this.otherIDCardType.value.length > 120) {
                        validationMessage.push('ID Card Type \'Others\' either Blank or crossed maximum limit of 120 characters');
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
            this.headerDateData.cmpEnvironment = (this.selectedCmpEnv == 'Yes') ? 1 : 0;


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

    onchangeEmp(chk, value) {
        if (value != '') {
            if (value == 'Others') {
                this.empVisible = !this.empVisible;
            }
            let checked = chk.checked;
            if (checked) {
                this.selectedEmpType.push(value);
            } else {
                let index = this.selectedEmpType.indexOf(value);
                this.selectedEmpType.splice(index, 1);
            }

        }
        console.log(this.selectedEmpType);

    }

    onChangeanyAMS(value) {
        console.log('Any AMS Value: ' + value);
        if (value == 'Yes') {
            //this.amsId.enable();
            this.amsVisible = true;
        } else {
            //this.amsId.disable();
            this.amsVisible = false;
        }
    }

    onchangeusageEnv(chk, value) {
        if (value != '') {
            let checked = chk.checked;
            if (checked) {
                this.selectedUsageEnv.push(value);
            } else {
                let index = this.selectedUsageEnv.indexOf(value);
                this.selectedUsageEnv.splice(index, 1);
            }

        }
        console.log(this.selectedUsageEnv);

    }

    onSelectCmpEnv(selected: string) {
        if (this.selectedCmpEnv === selected) {
            // uncheck if already selected
            this.selectedCmpEnv = null;
        } else {
            this.selectedCmpEnv = selected;
        }
        console.log("Selected CMP Env=" + this.selectedCmpEnv);
    }

    onchangeIDType(chk, value) {
        if (value != '') {
            if (value == 'Others') {
                this.cardVisible = !this.cardVisible;
            }
            let checked = chk.checked;
            if (checked) {
                this.selectedIDCardType.push(value);
            } else {
                let index = this.selectedIDCardType.indexOf(value);
                this.selectedIDCardType.splice(index, 1);
            }

        }
        console.log(this.selectedIDCardType);
    }

    onChange(value) {
        if (this.startDate.value != '' && value != '') {
            /* this.visible = !this.visible; */
            this.endDate.enable();
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
        this.fileName = this.fileToUpload.name;

        if (this.fileName.length > 30) {
            alert('File Name max length 30 digit');
            return (event.target.value = null);
        } else if ((this.fileToUpload.size) / 1024 / 1024 > 5) {
            alert('Max File Size is 5 MB');
            return (event.target.value = null);
        }
        outer: if (this.fileToUpload.type == 'application/x-zip-compressed' || this.fileToUpload.type == 'application/pdf'
            || this.fileToUpload.type == 'message/rfc822' || this.fileName.endsWith('.msg')) {
            console.log(this.fileToUpload.type);
            break outer;
        } else {
            alert('Allowed file type is .pdf, .msg, .eml, .zip');
            return (event.target.value = null);
        }

        const formData: FormData = new FormData();
        formData.append('ssm-file', this.fileToUpload, this.fileName);
        console.log(formData);
        var result = this.fileoperationService.uploadSSMCSV(formData);
        console.log(result);
        result.subscribe(res => {
            console.log(res);
            if (res !== '') {
                this.successAlertMessage = 'File Uploaded Successfully';
                alert(res.message);
            }
        })
    }


}
