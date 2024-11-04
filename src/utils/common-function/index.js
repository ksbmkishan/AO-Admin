export const DayMonthYear = (params) => {

    const date = new Date(params);
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };

    return date.toLocaleDateString('en-GB', optionsDate);
};

export const DayMonthYearWithTime = (params) => {

    const date = new Date(params);
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };

    return date.toLocaleString('en-GB', optionsDate);
}

export const OnlyTime = (params) => {

    const date = new Date(params);
    const optionsDate = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    return date.toLocaleString('en-GB', optionsDate);
}

export const YYYYMMDD = (params) => {
    const date = new Date(params);

    let year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1).padStart(2, '0');
    let day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const get_date_value = (year = 18) => {
    var currentDate = new Date();

    // Subtract 16 years from the current date
    var previousYearsDate = new Date(currentDate);
    previousYearsDate.setFullYear(currentDate.getFullYear() - year);

    // Format the date as yyyy-mm-dd
    var formattedDate = previousYearsDate.toISOString().split("T")[0];
    return formattedDate;
};

export const HideDateFromCurrent = (year = 0) => {
    let currentDate = new Date();

    // Subtract years from the current date
    let previousYearsDate = new Date(currentDate);
    previousYearsDate.setFullYear(currentDate.getFullYear() - year);

    // Format the date as yyyy-mm-dd
    let formattedDate = previousYearsDate.toISOString().split("T")[0];
    return formattedDate;
};

export const IndianRupee = (rupee) => {

    let Rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return `${Rupee.format(rupee)}/-`
};

export const DeepSearchSpace = (data, searchText) => {
    const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, '');

    const searchLower = normalizeText(searchText);

    const DeepSearchObject = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(value => DeepSearchObject(value));
        }
        if (Array.isArray(obj)) {
            return obj.some(value => DeepSearchObject(value));
        }
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return normalizeText(obj.toString()).includes(searchLower);
        }
        return false;
    };

    return data && data.filter(item => DeepSearchObject(item));
};

export const secondsToHMS = (duration) => {
    const seconds = parseFloat(duration).toFixed(0)
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}