import { AppError, ERROR_CODE } from '../error';

export class DateUtils {
  public static dateToKey(date: string | Date | number): string {
    const d = new Date(date);
    if (!d || !d.getTime() || isNaN(d.getTime())) {
      throw new AppError(ERROR_CODE.PARAM_INVALID, 'Invalid createAt');
    }
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  public static getDatesInRange(from: Date, to: Date): Date[] {
    const dateArray = [];
    let currentDate = new Date(from);

    while (currentDate <= to) {
      dateArray.push(currentDate);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dateArray;
  }
}
