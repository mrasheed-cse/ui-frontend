import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RecycleCandidateMsisdn} from '../nsa/recycleCandidateMsisdn';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {catchError,} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import {GeneratedInPage} from "../nsa/models/recycle/GeneratedInPage";

@Component({
    selector: 'app-generate',
    templateUrl: './generate.component.html',
    styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {
    misisdnList: RecycleCandidateMsisdn[] = [];
    genalert: string;
    genenable: boolean = false;
    isForAnalyze: boolean
    sortDir: string = "desc"
    totalPage: number = 1
    currentPage: number = 1
    readonly environment = environment

    constructor(private httpClient: HttpClient, private datePipe: DatePipe, private activeRoute: ActivatedRoute) {
        this.isForAnalyze = "analyze" == activeRoute.snapshot.data.list
    }

    changePage(i: number) {
        if(i + 1 != this.currentPage) {
            this.currentPage = i + 1;
            this.loadList();
        }
    }

    changeSort() {
        this.sortDir = this.sortDir == "desc" ? "asc" : "desc";
        this.loadList();
    }

    ngOnInit() {
        this.loadList();
    }

    loadList() {
        this.httpClient.get<GeneratedInPage>(environment.apiUrl + "msisdn_recycle_list/list/" + (this.isForAnalyze ? "analyze" : "generate") + "?dir=" + this.sortDir + "&page=" + this.currentPage).subscribe(x => {
            this.misisdnList = x.content;
            this.totalPage = x.totalPages || 1
            this.currentPage = x.number
        });
    }

    clearGenerate(linkno: number): Observable<any> {
        return this.httpClient.get(environment.apiUrl + "msisdn_recycle_list_analyze/clear/" + linkno).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
        } else {
            switch (error.status) {
                case 404:
                    this.genenable = true;
                    this.genalert = "Deletion Fail";
                    break;
            }
        }
        return _throw(error);
    }

    clear(linkno: number) {
        this.clearGenerate(linkno).subscribe((res => {
            if (res == false) {
                this.genenable = true;
                this.genalert = "Deletion Fail";
            } else {
                this.loadList()
            }
        }), err => {
            this.genenable = true;
            this.genalert = "MSISDN Deletion Fail";
        });
    }

    downloadCSVFile(fileName){
        const url = environment.apiUrl + "msisdn_recycle_list/download/" + fileName;
        console.log(url);

        this.httpClient.get(url, { observe: 'response', responseType: 'blob' })
            .subscribe(
                response => {
                    this.downloadFile(response, fileName);
                },
                error => {
                    console.log(error);
                    alert('Failed to download file')
                }
            );
    }

    downloadFile(response : any, fileName) :void {
        console.log(response);
        console.log(response.headers);
        let filename = fileName;

        // Get filename from content-disposition header
        const contentDisposition = response.headers.get('content-disposition');

        if (contentDisposition) {
            let arr = contentDisposition.split(';');
            if (arr.length > 1) {
                arr.forEach(element => {
                    if (element.trim().startsWith('filename=')) {
                        let arr2 = element.split('=');
                        if (arr2.length > 1) {
                            filename = arr2[1].trim().replace(/"/g, '');
                        }
                    }
                })
            }
        }

        // Create blob and download
        const blob = new Blob([response.body],
            { type: response.headers.get('content-type') });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
    }
}
