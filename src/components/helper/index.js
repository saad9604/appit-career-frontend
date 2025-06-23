import { format } from 'date-fns';

/**
 * Format the given timestamp into a readable date format.
 * 
 * @param timestamp - The timestamp to format.
 * @param showTime - A flag to indicate whether to include the time.
 * @returns The formatted date, or "Today" if the date is today.
 */
const formatDate = (timestamp, showTime = true, showToday) => {
    const date = new Date(timestamp);
    const today = new Date();

    // Check if the date is today
    if (showToday && date.toDateString() === today.toDateString()) {
        return "Today"; // If it's today, return "Today"
    }

    // Format date to "Saturday, May 11, 2025"
    const formattedDate = format(date, "EEEE, MMMM dd, yyyy");

    // If showTime is true, append the time
    if (showTime) {
        const formattedTime = format(date, "hh:mm a");
        return `${formattedDate} at ${formattedTime}`; // Example: "Saturday, May 11, 2025 at 08:37 AM"
    }

    return formattedDate;
};

/**
 * Generates a map of token symbols to their mint addresses.
 * 
 * @param assets - An array of asset objects.
 * @returns An object mapping asset symbols to mint addresses.
 */
export function getTokenAddressMap(assets) {
    if (!Array.isArray(assets)) return {};

    return assets.reduce((map, asset) => {
        if (asset.symbol && asset.mint) {
            map[asset.symbol] = asset.mint;
        }
        return map;
    }, {});
}

export const delay = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

export function formatNumber(number) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }

export default formatDate;
