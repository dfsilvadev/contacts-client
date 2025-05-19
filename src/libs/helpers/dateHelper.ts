import { type Locale } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

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
}

export default DateHelper;
