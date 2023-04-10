export class DateUtils {
  static getDaysFromInterval(start: string, end: string): number {
    const startDate = this.parseDate(start).getTime();
    const endDate = this.parseDate(end).getTime();
    const diferenceInMS = endDate - startDate;
    const days = Math.floor(diferenceInMS / (24 * 60 * 60 * 1000));

    return days;
  }

  static parseDate(date: string) {
    const parts = date.split('-');

    // month index begin in 0
    const month = Number(parts[0]) - 1;
    const day = Number(parts[1]);
    const year = Number(parts[2]);

    return new Date(year, month, day);
  }
}
