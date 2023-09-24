const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
    "Январь",
];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const isLeapYear = year => year % 4 === 0;
const getEmptyRows = () => {
    return Array.from({ length: 42 }).map(() => []);
};
const getMonthDays = (index, year) => {
    return index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28;
};

const getMonthStats = (monthIndex, year) => {
    const today = new Date(year, monthIndex, 1);
    const index = today.getMonth();
    return {
        name: index[index],
        days: getMonthDays(index, year)
    };
};

export const getMonthName = index => monthNames[index];

export const getDateRows = (monthIndex, year) => {
    const { days } = getMonthStats(monthIndex, year);
    const rows = getEmptyRows();
    const startIndex = new Date(year, monthIndex, 1).getDay();
    Array.from({ length: days -1 }).forEach((_, i) => {
        const index = startIndex + i;
        rows[index] = i + 2;
    });
    const filled = rows.map(i => (Array.isArray(i) ? undefined : i));

    return filled[35] ? filled : filled.slice(0, -7);
};

export const noop = () => {};

export const uuid = (() => {
    let id = 1;
    return () => {
        return ++id;
    };
})();

export const formatedSelected = (date) => {
    const dateArr = date.split(" ");
    const dayWeek = () => {
        switch(dateArr[0]) {
            case "Mon":
                return "Пн"
            case "Tue":
                return "Вт"
            case "Wed":
                return "Ср"
            case "Thu":
                return "Чт"
            case "Fri":
                return "Пт"
            case "Sat":
                return "Сб"
            case "Sun":
                return "Вс"
            default:
                return dateArr[0]
        }
    }
    const day = dateArr[2];
    const month = () => {
        switch(dateArr[1]) {
            case "Jan":
                return "01"
            case "Feb":
                return "02"
            case "Mar":
                return "03"
            case "Apr":
                return "04"
            case "May":
                return "05"
            case "June":
                return "06"
            case "July":
                return "07"
            case "Aug":
                return "08"
            case "Sep":
                return "09"
            case "Oct":
                return "10"
            case "Nov":
                return "11"
            case "Dec":
                return "12"
            default:
                return dateArr[1]
        }
    }

    return `${dayWeek()} ${day}/${month()}`;
}