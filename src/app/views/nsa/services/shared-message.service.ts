import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedMessageService {
    // Initialize a BehaviorSubject with a default value
    // private messageSource = new BehaviorSubject<string | null>(null);
    //
    // // Expose the observable (read-only)
    // currentMessage$ = this.messageSource.asObservable();
    //
    // // Method to update the value
    // setMessage(value: string) {
    //     this.messageSource.next(value);
    // }
    //
    // getMessage() {
    //     return this.messageSource.getValue();
    // }

    setMessage(key: string, message: string) {
        localStorage.setItem(key, message);
    }

    getMessage(key: string) : string {
        return localStorage.getItem(key);
    }
}
