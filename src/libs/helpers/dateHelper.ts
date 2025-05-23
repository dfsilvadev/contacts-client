import { addDays, differenceInDays, type Locale } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import type { RangeKeyDict } from "react-date-range";

interface DateHelperConfig {
  locale: Locale;
  timeZone: string;
  format: string;
}

/**
 * Utility class for date formatting using date-fns and date-fns-tz,
 * with support for locale, timezone, and custom format configuration.
 */
class DateHelper {
  private config: DateHelperConfig;

  /**
   * Initializes the DateHelper with a specific configuration.
   * @param {DateHelperConfig} config - Configuration containing locale, timeZone, and format string.
   */
  constructor(config: DateHelperConfig) {
    this.config = config;
  }

  /**
   * Formats a date string or Date object according to the instance's configuration.
   * Applies the specified time zone and locale.
   *
   * @param {string | Date} dateString - A date string (ISO format) or Date object.
   * @returns {string} The formatted date string based on the configured pattern.
   * Returns an empty string if the input is invalid.
   */
  formatDate(dateInput: string | Date): string {
    if (!dateInput) return "";

    try {
      const isoString =
        typeof dateInput === "string" ? dateInput : dateInput.toISOString();

      return formatInTimeZone(
        isoString,
        this.config.timeZone,
        this.config.format,
        { locale: this.config.locale }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error formatting date:", error);
      return "";
    }
  }

  /**
   * Formats a date string or Date object into the "YYYY-MM-DD" format
   * commonly used in <input type="date"> fields.
   *
   * @param {string | Date} date - The date to be formatted.
   * @returns {string} A string in the format "YYYY-MM-DD".
   * Returns an empty string if the input is invalid.
   */
  static formatDateForInput(date: string | Date): string {
    if (!date) {
      return "";
    }
    try {
      const dateObj: Date = typeof date === "string" ? new Date(date) : date;
      const day: string = String(dateObj.getDate()).padStart(2, "0");
      const month: string = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year: number = dateObj.getFullYear();
      return `${year}-${month}-${day}`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error formatting date for input:", error);
      return "";
    }
  }

  /**
   * Applies a maximum date range limit to a given date range.
   * If the provided date range exceeds the maximum allowed days (7), it sets the end date to the maximum allowed date.
   *
   * @param {object} item - The date range object containing start and end dates.
   * @param {function} stateCb - A callback function to update the start and end dates in the state.
   * @param {function} onInvalidRange - An optional callback function to be invoked when the date range exceeds the maximum allowed days.
   * Returns the updated start and end dates.
   */
  applyMaxDateRange(
    item: RangeKeyDict,
    stateCb: (startDateValue: Date, endDateValue: Date) => void,
    onInvalidRange?: () => void
  ) {
    const { startDate, endDate } = item.selection;

    if (!startDate || !endDate) return;

    const maxAllowedDays = 7;
    const isTooLong = differenceInDays(endDate, startDate) > maxAllowedDays;

    const newEndDate = isTooLong ? addDays(startDate, maxAllowedDays) : endDate;

    stateCb(startDate, newEndDate);

    if (isTooLong && onInvalidRange) {
      onInvalidRange();
    }
  }
}

export default DateHelper;
