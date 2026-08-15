import {Component, OnInit, ViewChild} from '@angular/core';
import {AppGlobals} from './../../../app.global';
import {LoginService} from '../../pages/LoginService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DefinitionDataService} from '../services/definitiondata.service';
import {IsmsworkflowsService} from '../services/ismsworkflows.service';
import {LoggedInUser} from '../../pages/loggedInUser';
import {FileoperationService} from '../../nsa/services/fileoperation.service';





import {WorkflowsService} from '../services/workflows.service';

@Component({
    selector: 'app-requisitiondetailsdelivery',
    templateUrl: './requisitiondetailsdelivery.component.html',
    styleUrls: ['./requisitiondetailsdelivery.component.scss'],
    providers: [AppGlobals, LoginService, IsmsworkflowsService, FileoperationService, WorkflowsService]
})
export class RequisitiondetailsdeliveryComponent implements OnInit {

    public recordsFromFile: any[] = [];
    public isLoading: boolean = false;
    @ViewChild('csvReader') csvReader: any;

    requisition: any;
    requsitionLines: any;
    employeeDetails: any;
    requisitionDetails: any;
    requisitionId: number;
    allAssignmentTypes: any;
    assignmentType: any;
    startingKitNumber: any;
    endingKitNumber: any;
    quantity: number;
    showMsisdnSeriesAssignmentCard: boolean;
    alreadyAssignedMsisdnSeriesDetails: Array<any>;
    finalArrayToSubmit: Array<any>;
    currentLoggedInUser: LoggedInUser;
    userName: string;
    groupID: number;
    userID: string;
    lineItemBeingConsidered: any;
    zeroDeliveryQtyCount: number;
    requisition_existing_comments: Array<any>;
    requisition_comments: string;
    cmpEnvironment: string;


    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private http: HttpClient,
                private _global: AppGlobals, private ismsworkflowsService: IsmsworkflowsService,
                private fileoperationService: FileoperationService, private workFlowsService: WorkflowsService) {

        this.requisition_comments = '';
        this.requisition_existing_comments = [];
        this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
        this.lineItemBeingConsidered = {};

        if (this.currentLoggedInUser) {
            this.userName = this.currentLoggedInUser.userName
            this.groupID = this.currentLoggedInUser.groupID
            this.userID = this.currentLoggedInUser.userID
        } else {
            this.router.navigate(['pages/login']);
        }

        //call API here to get real dat
        this.requisitionId = parseInt(this.route.snapshot.paramMap.get('requisition_id'));
        // this.requisition = _global.dataTempForRequisitionDetail;
        this.ismsworkflowsService.findRequisitionDetails(this.requisitionId).subscribe(
            res => {
                console.log('response is : ' + res);
                if (res !== '') {
                    this.requisition = res;

                    if (this.requisition != null && this.requisition != undefined && this.requisition != '' &&
                        this.requisition['requisitionLines'] != null && this.requisition['requisitionLines'] != undefined && this.requisition['requisitionLines'] != '') {
                        for (var i = 0; i < this.requisition['requisitionLines'].length; i++) {
                            if (this.requisition['requisitionLines'][i].deliverQuantity > -1) {
                                this.requisition['requisitionLines'][i].clcUpdateQnty = true;
                            } else {
                                this.requisition['requisitionLines'][i].clcUpdateQnty = false;
                            }
                            this.requisition['requisitionLines'][i].clcAssignmentCompleted = false;
                        }
                    }

                    this.requsitionLines = res.requisitionLines;
                    this.employeeDetails = res.employeeDetails;
                    this.requisitionDetails = res.requisitionDetails;
                    this.cmpEnvironment = res.requisitionDetails.cmpFlag == 0 ? 'No' : 'Yes';
                    this.getComments(this.requisitionDetails['id'], "", "");
                }
            },
            err => {

            }
        );

        this.allAssignmentTypes = [
            {
                'id': 'Discrete',
                'name': 'Discrete'
            },
            {
                'id': 'Sequential',
                'name': 'Sequential'
            }
        ];

        this.assignmentType = '';
        this.startingKitNumber = '';
        this.endingKitNumber = '';
        this.showMsisdnSeriesAssignmentCard = false;
        this.alreadyAssignedMsisdnSeriesDetails = [];
        this.finalArrayToSubmit = [];
        this.zeroDeliveryQtyCount = 0;

    }

    ngOnInit() {
    }

    clear() {
        window.location.reload();
    }

    submit() {
        console.log('this.finalArrayToSubmit ' + this.finalArrayToSubmit.length);
        console.log('this.requsitionLines ' + this.requsitionLines.length);
        console.log('this.zeroDeliveryQtyCount ' + this.zeroDeliveryQtyCount);
        var dataToSubmit = Object.create(null);
        dataToSubmit['wrID'] = this.requisitionDetails['id'];
        dataToSubmit['userID'] = this.userID;
        dataToSubmit['status'] = 'ACCEPT';
        dataToSubmit['lineWiseMsisdnInfo'] = this.finalArrayToSubmit;
        dataToSubmit['comment'] = this.requisition_comments;

        //console.log(dataToSubmit);return;
        /*
            if(this.finalArrayToSubmit.length <= 0){
              alert("Please assign MSISDN for each line item before submitting");
              return;
            }
            else
        */
        if (this.finalArrayToSubmit.length + this.zeroDeliveryQtyCount != this.requsitionLines.length) {
            alert('Please assign MSISDN for each line item before submitting');
            return;
        }

        //console.log(dataToSubmit);

        this.updateForClc(dataToSubmit);
        alert('This request has been submitted.');
        this.router.navigate(['nsa/newrequisition']);

    }

    uploadListener($event: any): void {

        let text = [];
        let files = $event.srcElement.files;

        if (this.isValidTxtFile(files[0])) {

            let input = $event.target;
            let reader = new FileReader();
            reader.readAsText(input.files[0]);

            reader.onload = () => {
                let csvData = reader.result;
                let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

                this.recordsFromFile = this.getDataRecordsArrayFromTxtFile(csvRecordsArray);
                console.log('recordsFromFile');
                console.log(this.recordsFromFile);


            };

            reader.onerror = function () {
                console.log('error is occured while reading file!');
            };

        } else {
            alert('Please import valid .txt file.');
            this.fileReset();
        }
    }

    getDataRecordsArrayFromTxtFile(csvRecordsArray: any) {
        let csvArr = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
            let curruntRecord = (<string>csvRecordsArray[i]).split(',');
            let singleKitNumber = curruntRecord[0].trim();
            csvArr.push(singleKitNumber);
        }
        return csvArr;
    }

    isValidTxtFile(file: any) {
        return file.name.endsWith('.txt');
    }

    fileReset() {
        this.csvReader.nativeElement.value = '';
        this.recordsFromFile = [];
    }


    assignMsisdn(lineItem) {
        this.assignmentType = '';
        this.startingKitNumber = '';
        this.endingKitNumber = '';
        this.quantity = lineItem['deliverQuantity'];
        if (lineItem['deliverQuantity'] > 0) {
            this.showMsisdnSeriesAssignmentCard = true;
        } else {
            alert('No assignment is required because of 0 delivery quantity.');
            this.zeroDeliveryQtyCount = this.zeroDeliveryQtyCount + 1;
            this.showMsisdnSeriesAssignmentCard = false;
            lineItem['clcAssignmentCompleted'] = true;
        }
        this.lineItemBeingConsidered = lineItem;
    }

    confirmMsisdnSeriesAssignment() {
        /**/
        this.isLoading = true;
        var responseObj = {};
        responseObj['requisitionLineId'] = this.lineItemBeingConsidered['id'];
        responseObj['searchModel'] = [];

        if (this.assignmentType == 'Discrete') {

            for (var i = 0; i < this.recordsFromFile.length; i++) {
                /*
                var arrayObj = {};
                arrayObj['startingKitNumber'] = this.recordsFromFile[i];
                arrayObj['endingKitNumber'] = this.recordsFromFile[i];

                console.log(arrayObj['startingKitNumber']);
                  console.log(arrayObj['startingKitNumber'].length);
                */

                var arrayObj = {};
                var str = this.recordsFromFile[i];
                var res = str.split(' ');
                arrayObj['startingKitNumber'] = res[0];
                arrayObj['endingKitNumber'] = res[1];
                arrayObj['quantity'] = res[2];


                console.log(arrayObj['startingKitNumber']);
                console.log(arrayObj['startingKitNumber'].length);
                console.log(arrayObj['endingKitNumber']);
                console.log(arrayObj['quantity']);

                if (arrayObj['startingKitNumber'] == null || arrayObj['startingKitNumber'] == undefined || arrayObj['startingKitNumber'] == '' ||
                    (arrayObj['startingKitNumber'].length != 12 && arrayObj['startingKitNumber'].length != 18 && arrayObj['startingKitNumber'].length != 20 && arrayObj['startingKitNumber'].length != 26 && arrayObj['startingKitNumber'].length != 28)) {
                    console.log(arrayObj['startingKitNumber']);
                    console.log(arrayObj['startingKitNumber'].length);
                    var alertTxt = 'Invalid starting KIT number specified in row ' + (i + 1) + ' of input file. KIT number must be 12/18/20/26/28 digits.';
                    alert(alertTxt);
                    return;
                }
                if (arrayObj['endingKitNumber'] == null || arrayObj['endingKitNumber'] == undefined || arrayObj['endingKitNumber'] == '' ||
                    (arrayObj['endingKitNumber'].length != 12 && arrayObj['endingKitNumber'].length != 18 && arrayObj['endingKitNumber'].length != 20 && arrayObj['endingKitNumber'].length != 26 && arrayObj['endingKitNumber'].length != 28)) {
                    var alertTxt = 'Invalid ending KIT number specified in row ' + (i + 1) + ' of input file. KIT number must be 12/18/20/26/28 digits.';
                    alert(alertTxt);
                    return;
                }

                responseObj['searchModel'].push(arrayObj);
            }

        } else if (this.assignmentType == 'Sequential') {

            var arrayObj = {};
            arrayObj['startingKitNumber'] = this.startingKitNumber;
            arrayObj['endingKitNumber'] = this.endingKitNumber;
            arrayObj['quantity'] = this.quantity;
            console.log(arrayObj['startingKitNumber']);
            console.log(arrayObj['startingKitNumber'].length);
            console.log(arrayObj['endingKitNumber']);
            console.log(arrayObj['quantity']);

            if (this.startingKitNumber == null || this.startingKitNumber == undefined || this.startingKitNumber == '' ||
                (this.startingKitNumber.length != 12 && this.startingKitNumber.length != 18 && this.startingKitNumber.length != 20 && this.startingKitNumber.length != 26 && this.startingKitNumber.length != 28)) {
                alert('Invalid starting KIT number specified. KIT number must be 12/18/20/26/28 digits.');
                this.isLoading = false;
                return;
            }
            if (this.endingKitNumber == null || this.endingKitNumber == undefined || this.endingKitNumber == '' ||
                (this.endingKitNumber.length != 12 && this.endingKitNumber.length != 18 && this.endingKitNumber.length != 20 && this.endingKitNumber.length != 26 && this.endingKitNumber.length != 28)) {
                alert('Invalid ending KIT number specified. KIT number must be 12/18/20/26/28 digits.');
                this.isLoading = false;
                return;
            }

            responseObj['searchModel'].push(arrayObj);
        }

        console.log('responseObj ');
        console.log(responseObj);
        //return;

        this.ismsworkflowsService.getMsisdnDetailsFromSsm(responseObj).subscribe(
            res => {
                //console.log('response is : '+res.message);
                this.isLoading = true;
                console.log(res);
                if (res !== '') {

                    //step 0: validation

                    //if(res.length <= 0){
                    if (res == null) {
                        alert('No MSISDNs found with the given KIT numbers specified. Please try again with different KIT numbers.');

                        return;
                    } else if (res.length != this.lineItemBeingConsidered['deliverQuantity']) {
                        let alertMsg = 'The requsition line specifies quantity of ' + this.lineItemBeingConsidered['deliverQuantity'] + '. However, with specified KIT numbers ' + res.length + ' number of MSISDN found.';
                        alert(alertMsg);
                        this.isLoading = false;
                        return;
                    } else {
                        //console.log("new check");
                        for (var z = 0; z < this.finalArrayToSubmit.length; z++) {
                            for (var z1 = 0; z1 < this.finalArrayToSubmit[z].msisdnInfo.length; z1++) {

                                for (var y = 0; y < res.length; y++) {
                                    /*console.log("res");
                                    console.log(res[y]);
                                    console.log("final array to submit");
                                    console.log(this.finalArrayToSubmit[z].msisdnInfo[z1]);*/

                                    if (res[y]['kit_No'] == this.finalArrayToSubmit[z].msisdnInfo[z1]['kit_No']) {
                                        let innerAlertMsg = 'The KIT number ' + res[y]['kit_No'] + ' has been assigned already in a previous line item. Please specify new KIT number.';
                                        alert(innerAlertMsg);
                                        this.isLoading = false;
                                        return;
                                    }
                                    if (res[y]['mobile_No'] == this.finalArrayToSubmit[z].msisdnInfo[z1]['mobile_No']) {
                                        if (res[y]['mobile_No'] != '0' && res[y]['mobile_No'] != '00') {
                                            let innerAlertMsg = 'The MSISDN ' + res[y]['mobile_No'] + ' has been assigned already in a previous line item. Please use new MSISDN.';
                                            alert(innerAlertMsg);
                                            this.isLoading = false;
                                            return;
                                        }
                                    }

                                    if (res[y]['imsi_No'] == this.finalArrayToSubmit[z].msisdnInfo[z1]['imsi_No']) {
                                        let innerAlertMsg = 'The IMSI number ' + res[y]['imsi_No'] + ' has been assigned already in a previous line item. Please specify new IMSI number.';
                                        alert(innerAlertMsg);
                                        this.isLoading = false;
                                        return;
                                    }

                                }

                            }
                        }
                    }

                    //step 1: push to final array

                    let obj = Object.create(null);
                    obj['requisitionLine'] = this.lineItemBeingConsidered['id'];
                    obj['msisdnInfo'] = res;

                    this.finalArrayToSubmit.push(obj);

                    //step 2: reflection on UI

                    obj = Object.create(null);
                    obj['requisitionLine'] = this.lineItemBeingConsidered['id'];
                    obj['startingKitNumber'] = res[0]['kit_No'];
                    obj['endingKitNumber'] = res[res.length - 1]['kit_No'];
                    obj['startingMsisdnNumber'] = res[0]['mobile_No'];
                    obj['endingMsisdnNumber'] = res[res.length - 1]['mobile_No'];
                    obj['startingImsiNumber'] = res[0]['imsi_No'];
                    obj['endingImsiNumber'] = res[res.length - 1]['imsi_No'];

                    this.alreadyAssignedMsisdnSeriesDetails.push(obj);

                    //step 3: clear

                    this.assignmentType = '';
                    this.startingKitNumber = '';
                    this.endingKitNumber = '';
                    this.showMsisdnSeriesAssignmentCard = false;

                    //step 4: mark the row in requisition line items as completed
                    //console.log("in step 4");
                    for (var i = 0; i < this.requisition['requisitionLines'].length; i++) {
                        //console.log(this.requisition['requisitionLines'][i].id);
                        //console.log(responseObj['requisitionLineId']);
                        if (this.requisition['requisitionLines'][i].id == responseObj['requisitionLineId']) {
                            this.requisition['requisitionLines'][i].clcAssignmentCompleted = true;
                        }
                    }
                } else {
                    alert('An error occured when fetching MSISDN information. Please try again.');
                }
                this.isLoading = false;
                console.log('Last');
            },
            err => {

            }
        );

        /*var obj = Object.create(null);
        obj['startingKitNumber'] = "K131";
        obj['endingKitNumber'] = "K140";
        obj['startingMsisdnNumber'] = "8801710823400";
        obj['endingMsisdnNumber'] = "8801710823409";
        obj['c.quantity'] = "10";
        this.alreadyAssignedMsisdnSeriesDetails.push(obj);*/
    }

    resetMsisdnSeriesAssignment() {
        this.assignmentType = '';
        this.startingKitNumber = '';
        this.endingKitNumber = '';
        this.showMsisdnSeriesAssignmentCard = false;
    }

    updateForClc(dataToSubmit) {

        this.ismsworkflowsService.updateForClc(dataToSubmit).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {

                }
            },
            err => {

            }
        );

    }

    clcUpdate(lineItem) {
        //alert('In clcUpdate');
        var lineItemIdBeingConsidered = lineItem['id'];
        var deliverQuantity = lineItem['deliverQuantity'];

        console.log('requisitionId ' + this.requisitionId);
        console.log('lineItemIdBeingConsidered ' + lineItemIdBeingConsidered);
        console.log('deliverQuantity ' + deliverQuantity);
        console.log(this.userID);

        //let theLineItem : any;

        var theLineItem = Object.create(null);
        theLineItem['requisitionLineId'] = lineItemIdBeingConsidered;
        theLineItem['deliverQuantity'] = deliverQuantity;
        //theLineItem.push(obj);
        console.log(theLineItem);


        this.ismsworkflowsService.clcAssignment(this.requisitionId, this.userID, theLineItem).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    //alert(res.message);
                    for (var i = 0; i < this.requisition['requisitionLines'].length; i++) {
                        if (this.requisition['requisitionLines'][i].id == lineItemIdBeingConsidered) {
                            this.requisition['requisitionLines'][i].clcUpdateQnty = true;
                        }
                    }
                    //this.router.navigate(['nsa/newrequisition']);
                }
            },
            err => {

            }
        );

    }

    DownloadFile(fileNameToDownload: string) {
        console.log('fileNameToDownload: ' + fileNameToDownload);
        if (fileNameToDownload == '0') {
            alert('No File uploaded to download');
        } else {
            this.fileoperationService.DownloadFile(fileNameToDownload).subscribe((res) => {
                console.log(res);
                var downloadURL = window.URL.createObjectURL(res);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = fileNameToDownload;
                link.click();
            });
        }
    }

    getComments(requisitionId, comment, userId) {
        this.ismsworkflowsService.getAllComments(requisitionId, comment, userId).subscribe(
            res => {
                console.log('response is : ' + res.message);
                if (res !== '') {
                    this.requisition_existing_comments = res;
                }
            },
            err => {

            }
        );
    }

    DownloadChallan(challanNumber, requisitionId) {
        this.workFlowsService.DownloadChallanSim(challanNumber,requisitionId).subscribe((data) => {

            const blob = new Blob([data], {type: 'application/pdf'});

            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = challanNumber+".pdf";
            link.click();

        });
    }
}
