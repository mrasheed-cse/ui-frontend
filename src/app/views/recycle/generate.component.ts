import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Misidn} from '../../views/nsa/misidn';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxJS/Observable';
import {catchError,} from 'rxJs/operators';
import {_throw} from 'rxjs/observable/throw';

@Component({
    selector: 'app-generate',
    templateUrl: './generate.component.html',
    styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {
    misisdnList: Misidn[] = [];
    misisdn: Misidn;
    startDate: string;
    endDate: string;
    genalert: string;
    genenable: boolean = false;
    isForAnalyze: boolean

    constructor(private httpClient: HttpClient, private datePipe: DatePipe, private activeRoute: ActivatedRoute) {
        this.isForAnalyze = "analyze" == activeRoute.snapshot.data.list
    }

    ngOnInit() {
        this.httpClient.get<Misidn[]>(environment.apiUrl + "msisdn_recycle_list/list/" + (this.isForAnalyze ? "analyze" : "generate")).subscribe(x => {
            this.misisdnList = x;
        });
    }

    clearGenerate(linkno: number): Observable<any> {
        return this.httpClient.get(environment.apiUrl + "msisdn_recycle_list_generate/clear/" + linkno).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
        } else {
            switch (error.status) {
                case 404:
                    this.genenable = true;
                    this.genalert = "MSISDN Deletion Fail";
                    break;
            }
        }
        return _throw(error);
    }

    clear(linkno: number) {
        this.clearGenerate(linkno).subscribe((res => {
            if (res == false) {
                this.genenable = true;
                this.genalert = "MSISDN Deletion Fail";
            } else {
                this.misisdnList = this.misisdnList.filter(h => h.id !== linkno);
                this.genenable = true;
                this.genalert = "MSISDN Deletion Success";
            }

        }), err => {
            this.genenable = true;
            this.genalert = "MSISDN delettion Fail";
        });
    }

    downloadfile(path: string, std: Date, end: Date, id: any) {
        const httpOptions = {
            responseType: 'blob' as 'json',
        };
        let st = this.datePipe.transform(std, "dd-MM-yyyy");
        let dt = this.datePipe.transform(end, "dd-MM-yyyy");
        this.httpClient.get(environment.apiUrl + "msisdn_recycle_list_generate/download/" + id,
            httpOptions).subscribe((response: Response) => {
            if (response == null) {
                this.genenable = true;
                this.genalert = "Couldnot Find the File from " + st + " to " + dt;
            } else {
                const a = document.createElement('a');
                document.body.appendChild(a);
                const blob = new Blob([response], {type: 'octet/stream'});
                const url = window.URL.createObjectURL(response);
                a.href = url;
                a.download = path + ".csv";
                a.click();
                window.URL.revokeObjectURL(url);
                console.log(response.headers);
            }
        });
    }
}