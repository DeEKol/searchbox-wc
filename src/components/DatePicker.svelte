<script>
    import {createEventDispatcher, getContext, setContext} from "svelte";
    import Calender from "./Calender.svelte";
    import { getMonthName } from "./date-time.js";
    import calendar from "../assets/calendar.svg";
    import arrowLeft from "../assets/arrow-left.svg";
    import arrowRight from "../assets/arrow-right.svg";
    import separator from "../assets/separator.svg";
    import checkbox from "../assets/checkbox.svg";
    import { formatedSelected } from "./date-time.js";
    import { fade } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    // props
    export let isAllowed = () => true;
    export let selected = new Date();
    export let selectedLast = new Date();

    // export let isLastDate = false;

    const { isDateLast, activetedCell, firstCell, pickDateLast } = getContext("isDate")
    const dataForm = getContext("dataForm")


    let activeCell = {
      date: 0,
      month: 0,
    };


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
        $pickDateLast = false;
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

    const onClickCheckbox = () => {
      $isDateLast = !$isDateLast;
      $dataForm.dateTo = $dataForm.dateFrom;
      $activetedCell = $firstCell;
      selectedLast = selected;
      dispatch("datechange", new Date(year, month, date));
      // $pickDateLast = !$pickDateLast;
      if (!$isDateLast) {
        $pickDateLast = false;
      }
    }

    const onClickTwoDate = () => {
      showDatePicker = true;
      $pickDateLast = true;
    }

</script>

<div class="relative">
    <div class="date-input" >
        <div class="date-input__elem" class:pickActive={!$pickDateLast && showDatePicker} on:click={onFocus}>
            <img src={calendar} />
            <div class="date-input__text">
                {formatedSelected(selected.toDateString())}
            </div>
        </div>
        {#if $isDateLast}
            <img class="date-input__separator" src={separator} transition:fade />
            <div class="date-input__elem" class:pickActive={$pickDateLast && showDatePicker} on:click={onClickTwoDate}>
                <img src={calendar} transition:fade />
                <div class="date-input__text" transition:fade>
                    {formatedSelected(selectedLast.toDateString())}
                </div>
            </div>

        {/if}
    </div>
    {#if showDatePicker}
        <div class="calendar-container" transition:fade>
            <div class="calendar-box">
                <div class="box">
                    <div class="month-name">
                        <div class="center">
                            <button class="arrow-btn" on:click={prev}>
                                <img src={arrowLeft} />
                            </button>
                        </div>
                        <div class="center">{getMonthName(month)}</div>
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
                        <div class="center">{getMonthName(month + 1)}</div>
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
                    <input on:click={onClickCheckbox} class="checkbox__input" type="checkbox" id="scales" name="scales" checked={!$isDateLast} />
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
        border-radius: 5px;
        background-color: #E0E0E0;
        display: flex;
    }

    .date-input__elem {
        display: flex;
        padding: 15px 44px;
        border-radius: 5px;
        cursor: pointer;
        transition: box-shadow 0.3s;
    }
    .date-input__elem:hover {
        box-shadow: inset 0px 0px 30px rgba(238, 176, 60, 0.8);
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

        border: none;
        margin: 0 0 0 8px;
        color: #333;

        white-space: nowrap;
    }
    .pickActive {
        box-shadow: inset 0px 0px 30px rgba(0,0,0,0.5);
    }


    .calendar-container {
        position: absolute;
        flex-direction: column;

        top: 72px;
        left: 0px;
        border-radius: 5px;
        border: 1px solid #BDBDBD;
        display: inline-block;

        background-color: #F2F2F2;

        padding: 34px 51px;

    }
    .calendar-container:before {
        content: "";
        position: absolute;
        border-left: 10px solid rgba(113, 101, 58, 0);
        border-right: 10px solid rgba(113, 101, 58, 0);
        border-bottom: 10px solid #BDBDBD;
        left: 10px;
        top: -10px;
    }
    .calendar-container:after {
        content: "";
        position: absolute;
        border-left: 10px solid rgba(255, 241, 190, 0);
        border-right: 10px solid rgba(255, 241, 190, 0);
        border-bottom: 10px solid #F2F2F2;
        left: 10px;
        top: -9px;
    }
    .calendar-box {
        display: flex;
    }
    .arrow-btn {
        background-color: transparent;
        transition: box-shadow 0.3s;
    }
    .arrow-btn:hover {
        border: 1px transparent solid;
        box-shadow: inset 0px 0px 15px rgba(0,0,0,0.5);
    }
    .month-name {
        color: #333;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 6px 40px 0 0;
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

    .checkbox {
        display: flex;
        align-items: center;
    }
    .checkbox__label {
        color: #333;
        font-family: Roboto;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
    }
    .checkbox__input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    .checkbox__input+label {
        display: inline-flex;
        align-items: center;
        user-select: none;
    }
    .checkbox__input+label::before {
        content: '';
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #333;
        border-radius: 0.25em;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
        cursor: pointer;

        transition: box-shadow 0.3s;
    }
    .checkbox__input:checked+label::before {
        background-image: url("src/assets/checkbox.svg");
        background-size: cover;
    }
    .checkbox__input:not(:disabled)+label:hover::before {
        box-shadow: inset 0px 0px 5px rgba(0,0,0,0.5);
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
        transition: box-shadow 0.3s;
    }
    .btn:hover {
        box-shadow: inset 0px 0px 15px #E0E0E0;
    }
</style>