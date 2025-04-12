import * as moment from 'moment';


export class DurationInfo {
    years: number;
    months: number;
    days: number;
}

export class DateTimeUtil {

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
}
