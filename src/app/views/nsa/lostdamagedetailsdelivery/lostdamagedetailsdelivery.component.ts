import { Component, OnInit, ViewChild } from '@angular/core';
  import {Router, ActivatedRoute} from '@angular/router';
  import {IsmsworkflowsService } from './../services/ismsworkflows.service';
  import { WorkflowsService } from './../services/workflows.service';
  import { FileoperationService } from './../services/fileoperation.service';
  
  
  
  
  
  import { AppGlobals } from './../../../app.global';  
  import { LoginService } from '../../pages/LoginService';
  import { LoggedInUser } from '../../pages/loggedInUser';
  import {DefinitionDataService} from '../services/definitiondata.service';
@Component({
    selector: 'app-lostdamagedetailsdelivery',
    templateUrl: './lostdamagedetailsdelivery.component.html',
    styleUrls: ['./lostdamagedetailsdelivery.component.scss'],
    providers: [IsmsworkflowsService, WorkflowsService, AppGlobals, LoginService, FileoperationService, DefinitionDataService],
    standalone: false
})
export class LostdamagedetailsdeliveryComponent implements OnInit {

  public recordsFromFile: any[] = [];
  @ViewChild('csvReader', { static: true }) csvReader: any;

  sim_action_id : number;
  hop_sequence : number;
  wrBriefName : string;
  userGroup_id : number;
  
  currentLoggedInUser: LoggedInUser;
  userName: string;
  userID: string;	  	  
  groupID: number;
  public rawDataFromBackend: Array<Object>;
  public rawDataFromBackend_polished: Array<Object>;

  public dangerAlertShow:boolean = false;
  public dangerAlertMessage:string = "";
  public successAlertShow:boolean = false;
  public successAlertMessage:string = "";
  public isDone:boolean = false;
  public isDoneDisable:boolean = false;
  public isLoading:boolean = false;
  public isDataFound:boolean = false;
  public isMsisdnAssigned:boolean = false;
  showMsisdnSeriesAssignmentCard: boolean;
  allAssignmentTypes : any;
  assignmentType : any;
  lineItemBeingConsidered : any;
  startingKitNumber : any;
  endingKitNumber : any;
  quantity: number;
  alreadyAssignedMsisdnSeriesDetails : Array<any>;
  finalArrayToSubmit : Array<any>;
  msisdnList : Array<any>;
  public listProduct = [];
  product: {};

  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private router:Router, public _global: AppGlobals, private ismsWorkFlowsService: IsmsworkflowsService, private workflowsService : WorkflowsService, private fileoperationService: FileoperationService, private definitionDataService: DefinitionDataService) {
		
	  // Get Current User Profile
	  
	  this.currentLoggedInUser = this.loginService.GetCurrentLoggedInUser();
	  
	  if (this.currentLoggedInUser) {
		  this.userName = this.currentLoggedInUser.userName
		  this.userID = this.currentLoggedInUser.userID
		  this.groupID = this.currentLoggedInUser.groupID
		  //console.log('Current user: ' + this.userName);
		  
	  } 
	  else {
		//console.log('Current user not found');
		this.router.navigate(['pages/login']);
	  }			
		
    this.LoadQueryStringData();	
    this.LoadInitialData();
    this.getProduct();

    this.allAssignmentTypes = [
      {
        "id" : "Discrete",
        "name" : "Discrete"
      },
      {
        "id" : "Sequential",
        "name" : "Sequential"
      }
    ];
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.lineItemBeingConsidered = {};
    this.quantity = 1;
    this.alreadyAssignedMsisdnSeriesDetails = [];
    this.finalArrayToSubmit = [];
    this.msisdnList=[];
		}
		
	ngOnInit() {

      
	}
	  
	
  
	LoadQueryStringData(){
		// LOAD QUERY STRING DATA
		  this.sim_action_id = Number(this.activatedRoute.snapshot.paramMap.get('sim_action_id'));
		  console.log(this.sim_action_id);		  
	  
  }

  getProduct() {
    //GetProducts
    this.definitionDataService.getReplacementProduct().subscribe(
        data => {
          //console.log(data);
          for (let index in data) {
            //console.log (data[index]);
            this.listProduct.push(
                {
                  fuseMaserProductId: data[index].fuseMaserProductId,
                  masterDataDetailsId: data[index].masterDataDetailsId,
                  productName: data[index].productName,
                  productCode: data[index].productCode
                }
            );
          }
        },
        err => console.error(err),
        () => console.log('done loading Product Name List')
    );
  }
  
  LoadInitialData(){
    //LoastDamagedFind

    this.ismsWorkFlowsService.LostDamagedFind(this.sim_action_id).subscribe(
      res  =>  {
        if(res !== ""){
          console.log(res);
          this.isDataFound = true;
          this.rawDataFromBackend = res[0];
          this.rawDataFromBackend_polished = res[1];

          for(var i = 0; i < this.rawDataFromBackend['allRequisitionDetails'].length; i++){            
            //this.rawDataFromBackend['requisitionLines'][i].clcUpdateQnty = false;
            if(this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].indexOf(",")>=0)
            this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'] = this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].substr(0, this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'].indexOf(','));
            console.log('***'+this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn']);
            this.rawDataFromBackend['allRequisitionDetails'][i].clcAssignmentCompleted = false;
            var obj2 = {};
            obj2['simActionMsisdnId']= this.rawDataFromBackend['allRequisitionDetails'][i]['simActionMsisdn'];
            obj2['approvalStatus'] = 2; // By Default Rejected
            this.msisdnList.push(obj2);
          }

          console.log(this.msisdnList);
        } 
    },
    err  =>  {

    }
    );  
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
        console.log("recordsFromFile");
        console.log(this.recordsFromFile);
        

      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .txt file.");
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
    return file.name.endsWith(".txt");
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.recordsFromFile = [];
  }



  assignMsisdn(lineItem){
    console.log('lineItem');
    console.log(lineItem);
      this.showMsisdnSeriesAssignmentCard = true;
      this.lineItemBeingConsidered = lineItem;

  }

  
  resetMsisdnSeriesAssignment(){
    this.assignmentType = "";
    this.startingKitNumber = "";
    this.endingKitNumber = "";
    this.showMsisdnSeriesAssignmentCard = false;
  }

  confirmMsisdnSeriesAssignment(){
    
    var responseObj = {};
    var msisdn = this.lineItemBeingConsidered['msisdn'];
    var simActionMsisdnId = this.lineItemBeingConsidered['simActionMsisdn'];
    //alert(simActionMsisdnId);
   console.log(this.msisdnList);

   if (!this.product) {
     alert("Please assign a product");
     return;
   }

    for(var i = 0; i < this.msisdnList.length; i++){  
     // alert(this.msisdnList[i]['simActionMsisdnId']);    
      if(this.msisdnList[i]['simActionMsisdnId'] == simActionMsisdnId){
        this.msisdnList[i]['approvalStatus'] = 1;
        this.msisdnList[i]['product'] = this.product;
        break;
      }
    }

    console.log(this.msisdnList);

    responseObj['msisdn'] = this.lineItemBeingConsidered['msisdn'];
    responseObj['searchModel'] = [];
    
    //alert(responseObj['requisitionLineId']);

    if(this.assignmentType == 'Discrete'){
      for(var i = 0; i < this.recordsFromFile.length; i++){
        var arrayObj = {};
        var str = this.recordsFromFile[i];
        var res = str.split(" ");
        arrayObj['startingKitNumber'] = res[0];
        arrayObj['endingKitNumber'] = res[1];
        arrayObj['quantity'] = res[2];
        
        
        console.log(arrayObj['startingKitNumber']);
          console.log(arrayObj['startingKitNumber'].length);
          console.log(arrayObj['endingKitNumber']);
          console.log(arrayObj['quantity']);

        if(arrayObj['startingKitNumber'] == null || arrayObj['startingKitNumber'] == undefined || arrayObj['startingKitNumber'] == "" ||
            (arrayObj['startingKitNumber'].length != 12 && arrayObj['startingKitNumber'].length != 18 && arrayObj['startingKitNumber'].length != 20 && arrayObj['startingKitNumber'].length != 26 && arrayObj['startingKitNumber'].length != 28)) {
          console.log(arrayObj['startingKitNumber']);
          console.log(arrayObj['startingKitNumber'].length);
          var alertTxt = "Invalid starting KIT number specified in row "+ (i+1) +" of input file. KIT number must be 12/18/20/26/28 digits.";
          alert(alertTxt);
          return;
        }
        if(arrayObj['endingKitNumber'] == null || arrayObj['endingKitNumber'] == undefined || arrayObj['endingKitNumber'] == "" ||
            (arrayObj['endingKitNumber'].length != 12 && arrayObj['endingKitNumber'].length != 18 && arrayObj['endingKitNumber'].length != 20 && arrayObj['endingKitNumber'].length != 26 && arrayObj['endingKitNumber'].length != 28)) {
          var alertTxt = "Invalid ending KIT number specified in row "+ (i+1) +" of input file. KIT number must be 12/18/20/26/28 digits.";
          alert(alertTxt);
          return;
        }
        
        responseObj['searchModel'].push(arrayObj);
    }
  }
    else if(this.assignmentType == 'Sequential'){
      var arrayObj = {};
      //alert(this.startingKitNumber);
      //alert(this.endingKitNumber);
      arrayObj['startingKitNumber'] = this.startingKitNumber;
      arrayObj['endingKitNumber'] = this.endingKitNumber;
      arrayObj['quantity'] = this.quantity;
      

      console.log(arrayObj['startingKitNumber']);
      console.log(arrayObj['startingKitNumber'].length);

      if(this.startingKitNumber == null || this.startingKitNumber == undefined || this.startingKitNumber == "" ||
          (this.startingKitNumber.length != 12 && this.startingKitNumber.length != 18 && this.startingKitNumber.length != 20 && this.startingKitNumber.length != 26 && this.startingKitNumber.length != 28)) {
        alert("Invalid starting KIT number specified. KIT number must be 12/18/20/26/28 digits.");
        return;
      }
      if(this.endingKitNumber == null || this.endingKitNumber == undefined || this.endingKitNumber == "" ||
          (this.endingKitNumber.length != 12 && this.endingKitNumber.length != 18 && this.endingKitNumber.length != 20 && this.endingKitNumber.length != 26 && this.endingKitNumber.length != 28)) {
        alert("Invalid ending KIT number specified. KIT number must be 12/18/20/26/28 digits.");
        return;
      }

      responseObj['searchModel'].push(arrayObj);
    }

    console.log (responseObj);

    this.ismsWorkFlowsService.getMsisdnDetailsFromSsmLostDamaged(responseObj).subscribe(
        res  =>  {
        console.log('response is : ');
        console.log(res);
        if(res !== ""){

          //step 0: validation

          //if(res.length <= 0){
            if(res.length == 0){
            alert("No MSISDNs found with the given KIT numbers specified. Please try again with different KIT numbers.");
            return;
          }
          
          else{
            console.log("res");
            let obj = Object.create(null);
          
          obj['msisdn'] = msisdn;
          obj['sim']=res[0]['kit_No'];
          obj['reqLineMsisdnId'] = this.lineItemBeingConsidered['reqLineMsisdnId'];


          this.finalArrayToSubmit.push(obj);

          console.log(this.finalArrayToSubmit);

          //step 2: reflection on UI

          obj = Object.create(null);
          obj['msisdn'] = msisdn;
          
          obj['startingKitNumber'] = res[0]['kit_No'];
          obj['endingKitNumber'] = res[res.length - 1]['kit_No'];
          obj['startingMsisdnNumber'] =res[0]['mobile_No'];
          obj['endingMsisdnNumber'] = res[res.length - 1]['mobile_No'];
          obj['startingImsiNumber'] = res[0]['imsi_No'];
          obj['endingImsiNumber'] = res[res.length - 1]['imsi_No'];
          obj['product'] = this.product;

          this.alreadyAssignedMsisdnSeriesDetails.push(obj);
          //this.isMsisdnAssigned = true;


          //step 3: clear

          this.assignmentType = "";
          this.startingKitNumber = "";
          this.endingKitNumber = "";
          this.showMsisdnSeriesAssignmentCard = false;

          //step 4: mark the row in requisition line items as completed
          //console.log("in step 4");
          for(var i = 0; i < this.rawDataFromBackend['allRequisitionDetails'].length; i++){
            //console.log(this.requisition['requisitionLines'][i].id);
            //console.log(responseObj['requisitionLineId']);
            if(this.rawDataFromBackend['allRequisitionDetails'][i]['msisdn'] == msisdn){
              this.rawDataFromBackend['allRequisitionDetails'][i].clcAssignmentCompleted = true;
            }
          }
            
          }
      }
    },
      err  =>  {

      }

    );


  }


  clear(){
    window.location.reload();
  }

  submit(){

    var obj = {};
    obj['simActionId'] = this.sim_action_id;
    obj['userId'] = this.userName;
    obj['msisdnDetails'] = this.msisdnList;
    console.log(obj);

    if(this.alreadyAssignedMsisdnSeriesDetails.length == 0) {
        var msg = "Please assign MSISDN to continue.";
          alert(msg);
          return;
      }

    this.workflowsService.updateSimAction(obj).subscribe(
      res  =>  {
        if(res != null && res != undefined && res !== ""){
          this.isLoading = false;
          var msg = "The request has been submitted" + res['name'];
          alert(msg);
          
          this.ismsWorkFlowsService.updateForClcLostDamaged(this.finalArrayToSubmit).subscribe(
            res  =>  {
              console.log('response is : ');
              console.log(res);
              if(res.message !== ""){
                alert(res.message);
            }
          },
          err  =>  {
      
          }
      
          );

          this.router.navigate(['nsa/testsimdashboard']);
        }
      },
      err  =>  {
        this.isLoading = false;
      }
    );
    this.isLoading = false;
  }

  }
