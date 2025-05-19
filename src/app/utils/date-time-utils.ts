import * as moment from 'moment';


export class DurationInfo {
    years: number;
    months: number;
    days: number;
}

export class DateTimeUtils {

    static getDuration(dateStr1: string, dateStr2: string, format: string): DurationInfo {
        //const format = 'DD-MM-YYYY';
        let start = moment(dateStr1, format);
        let end = moment(dateStr2, format);

        if (!start.isValid() || !end.isValid()) {
            throw new Error('Invalid date format. Use DD-MM-YYYY.');
        }

        // Ensure start is before end
        if (end.isBefore(start)) {
            [start, end] = [end, start];
        }

        const years = end.diff(start, 'years');
        start.add(years, 'years');

        const months = end.diff(start, 'months');
        start.add(months, 'months');

        const days = end.diff(start, 'days');

        return { years, months, days };
    }

    static format(date: Date, format: string): string {
        console.log('Formating date : ' + date);
        //const date = moment(date);
        const formattedDate = moment(date).format(format);
        console.log('Formated date string: ' + formattedDate);
        return formattedDate;
    }

    // static format(date: string, format: string): string {
    //     console.log('Formating date : ' + date);
    //     //const date = moment(date);
    //     const formattedDate = moment(date, format).format(format);
    //     console.log('Formated date string: ' + formattedDate);
    //     return formattedDate;
    // }

    static toString(date: Date, format:string): string {
        return DateTimeUtils.format(date, format);
    }

    static parse(dateStr: string, format: string): Date {
        return moment(dateStr, format).toDate();
    }

    static isValid(date : Date, format: string) :boolean {
        return moment(date, format).isValid();
    }
}
