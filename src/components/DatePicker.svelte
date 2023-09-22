<script>
    import { createEventDispatcher } from "svelte";
    import Calender from "./Calender.svelte";
    import { getMonthName } from "./date-time.js";
    import calendar from "../assets/calendar.svg";
    import arrowLeft from "../assets/arrow-left.svg";
    import arrowRight from "../assets/arrow-right.svg";

    const dispatch = createEventDispatcher();

    // props
    export let isAllowed = () => true;
    export let selected = new Date();

    const formatedSelected = (date) => {
        console.log(date);
        const dateArr = date.split(" ");
        console.log(dateArr)
        const dayWeek = () => {
            switch(dateArr[0]) {
                case "Mon":
                    return "Пт"
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

    // state
    let date, month, year, showDatePicker;

    // so that these change with props
    $: {
        date = selected.getDate();
        month = selected.getMonth();
        year = selected.getFullYear();
    }

    // handlers
    const onFocus = () => {
        showDatePicker = true;
    };

    const next = () => {
        if (month === 11) {
            month = 0;
            year = year + 1;
            return;
        }
        month = month + 1;
    };

    const prev = () => {
        if (month === 0) {
            month = 11;
            year -= 1;
            return;
        }
        month -= 1;
    };

    const onDateChange = d => {
        // showDatePicker = false;
        dispatch("datechange", d.detail);
    };

    const onButtonReady = () => {
        showDatePicker = false;
    }

</script>

<div class="relative">
    <div class="date-input">
        <img src={calendar} />
        <input class="date-input__text" type="text" on:focus={onFocus} value={formatedSelected(selected.toDateString())} />
    </div>
    {#if showDatePicker}
        <div class="calendar-container">
            <div class="calendar-box">
                <div class="box">
                    <div class="month-name">
                        <div class="center">
                            <button class="arrow-btn" on:click={prev}>
                                <img src={arrowLeft} />
                            </button>
                        </div>
                        <div class="center">{getMonthName(month)} {year}</div>
                        <div class="center">
                            <button class="arrow-btn" on:click={next}>
                                <img src={arrowRight} />
                            </button>
                        </div>
                    </div>
                    <Calender
                            {month}
                            {year}
                            date={selected}
                            {isAllowed}
                            on:datechange={onDateChange} />
                </div>
                <div class="box">
                    <div class="month-name">
                        <div class="center">
                            <button class="arrow-btn" on:click={prev}>
                                <img src={arrowLeft} />
                            </button>
                        </div>
                        <div class="center">{getMonthName(month)} {year}</div>
                        <div class="center">
                            <button class="arrow-btn" on:click={next}>
                                <img src={arrowRight} />
                            </button>
                        </div>
                    </div>
                    <Calender
                            month={month + 1}
                            {year}
                            date={selected}
                            {isAllowed}
                            on:datechange={onDateChange} />
                </div>
            </div>
            <div class="bottom-block">
                <div class="checkbox">
                    <input class="checkbox__input" type="checkbox" id="scales" name="scales" checked />
                    <label class="checkbox__label" for="scales">Без конечной даты</label>
                </div>
                <button class="btn" on:click={onButtonReady}>
                    Готово
                </button>
            </div>
        </div>

    {/if}
</div>

<style>
    .relative {
        position: relative;
    }
    .date-input {
        padding: 15px 44px;
        border-radius: 5px;
        background-color: #E0E0E0;
    }
    :active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }
    .date-input__text {
        font-family: Roboto;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        background-color: #E0E0E0;
        border: none;
        margin: 0 0 0 4px;
        color: #333;
    }
    .calendar-container {
        position: absolute;
        flex-direction: column;
        background-color: #E0E0E0;

        top: 40px;
        left: 0px;
        border-radius: 5px;
        border: 1px solid #E0E0E0;
        display: inline-block;

        background-color: #E0E0E0;

        padding: 34px 51px;

    }
    .calendar-box {
        display: flex;
    }
    .box {
        /*top: 40px;*/
        /*left: 0px;*/
        /*border-radius: 5px;*/
        /*border: 1px solid #E0E0E0;*/
        /*display: inline-block;*/

        /*background-color: #E0E0E0;*/

        /*padding: 34px 51px;*/
    }
    .arrow-btn {
        background-color: #E0E0E0;
    }
    .month-name {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 6px 0;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bottom-block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-top: solid 1px #BDBDBD;

        padding-top: 29px;
        margin-top: 20px;
    }
    .btn {
        border: none;
        height: 47px;
        color: #F2F2F2;
        background-color: #333;
        padding: 14px 40px;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
    }
    .checkbox__input {
        color: #E0E0E0;
        accent-color: #E0E0E0;
    }
</style>