<script>
    import {createEventDispatcher, getContext} from "svelte";
    import Calender from "./Calender.svelte";
    import { getMonthName } from "./date-time.js";
    import calendar from "../assets/calendar.svg";
    import arrowLeft from "../assets/arrow-left.svg";
    import arrowRight from "../assets/arrow-right.svg";
    import separator from "../assets/separator.svg";
    import { formatedSelected } from "./date-time.js";

    const dispatch = createEventDispatcher();

    // props
    export let isAllowed = () => true;
    export let selected = new Date();
    export let selectedLast = new Date();

    // export let isLastDate = false;

    const { isDateLast } = getContext("isDate")

    let activeCell = 0;


    $: console.log($isDateLast)

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
        console.log("date change")
        console.log(d)
        dispatch("datechange", d.detail);
    };

    const onButtonReady = () => {
        showDatePicker = false;
    }

</script>

<div class="relative">
    <div class="date-input" on:click={onFocus}>
        <img src={calendar} />
        <div class="date-input__text">
            {formatedSelected(selected.toDateString())}
        </div>
        {#if $isDateLast}
            <img class="date-input__separator" src={separator} />
            <img src={calendar} />
            <div class="date-input__text">
                {formatedSelected(selectedLast.toDateString())}
            </div>
        {/if}
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
                            activeCell={activeCell}
                            on:datechange={onDateChange} />
                </div>
                <div class="box">
                    <div class="month-name">
                        <div class="center">
                            <button class="arrow-btn" on:click={prev}>
                                <img src={arrowLeft} />
                            </button>
                        </div>
                        <div class="center">{getMonthName(month + 1)} {year}</div>
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
                <div class="checkbox" on:click={() => $isDateLast = !$isDateLast}>
                    <input class="checkbox__input" type="checkbox" id="scales" name="scales" checked={$isDateLast} />
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
        display: flex;
        cursor: pointer;
    }
    .date-input__separator {
        margin-left: 50px;
        margin-right: 50px;
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
        margin: 0 0 0 8px;
        color: #333;
    }
    .calendar-container {
        position: absolute;
        flex-direction: column;
        background-color: #E0E0E0;

        top: 75px;
        left: 0px;
        border-radius: 5px;
        border: 1px solid #E0E0E0;
        display: inline-block;

        background-color: #E0E0E0;

        padding: 34px 51px;

    }
    .calendar-container:before {
        content: "";
        position: absolute;
        border-left: 10px solid rgba(113, 101, 58, 0);
        border-right: 10px solid rgba(113, 101, 58, 0);
        border-bottom: 10px solid #E0E0E0;
        left: 10px;
        top: -10px;
    }
    .calendar-container:after {
        content: "";
        position: absolute;
        border-left: 10px solid rgba(255, 241, 190, 0);
        border-right: 10px solid rgba(255, 241, 190, 0);
        border-bottom: 10px solid #E0E0E0;
        left: 10px;
        top: -9px;
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
        color: #333;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

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
    .checkbox__label {
        color: #333;
        font-family: Roboto;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .checkbox__input {
        color: #E0E0E0;
        accent-color: #E0E0E0;
    }
</style>