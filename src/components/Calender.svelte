<script>
    import { getDateRows, uuid, noop } from "./date-time.js";
    import {createEventDispatcher, getContext} from "svelte";

    const { isDateLast, activetedCell } = getContext("isDate")


    const dispatch = createEventDispatcher();

    // props
    export let date;
    export let month;
    export let year;
    export let isAllowed;

    // local vars to help in render
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    let cells;

    export let activeCell;

    // function helpers
    const onChange = date => {
        console.log("click")
        console.log(date)
        if ($isDateLast) {
            activeCell = date
        }

        dispatch("datechange", new Date(year, month, date));
    };

    const allow = (year, month, date) => {
        if (!date) return true;
        return isAllowed(new Date(year, month, date));
    };

    $: cells = getDateRows(month, year).map(c => ({
        value: c,
        allowed: allow(year, month, c)
    }));

    $: console.log(cells);
</script>

<div class="container">
    <div class="row">
        {#each weekdays as day}
            <div class="cell">{day}</div>
        {/each}
    </div>

    <div class="row">
        {#each cells as { allowed, value } (uuid())}
            <div
                    on:click={allowed && value ? onChange.bind(this, value) : noop}
                    class:cell={true}
                    class:highlight={allowed && value}
                    class:disabled={!allowed}
                    class:selected={new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(year, month, value).getTime()}
                    class:selectedLast={$isDateLast && (activeCell >= value)}>
                {value || ''}
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        margin-top: 8px;
        padding: 6px;
        width: 370px;
    }
    .row {
        color: #333;
        font-family: Roboto;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        display: flex;
        margin: 2px 6px;
        flex-wrap: wrap;
    }

    .cell {
        display: inline-block;
        width: 40px;
        height: 20px;
        text-align: center;
        padding: 4px;
        margin: 1px;
    }

    .selected {
        border-radius: 3px;
        background: #333333;
        color: #F2F2F2;
    }
    .selectedLast {
        border-radius: 3px;
        background: #333333;
        color: #F2F2F2;
    }

    .highlight {
        transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .disabled {
        background: #E0E0E0;
        cursor: not-allowed;
        color: #bfbfbf;
    }

    .highlight:hover {
        border-radius: 3px;
        background: rgb(238, 176, 60);
        color: #fff;
        cursor: pointer;
        transform: scale(1.3);
    }

    .selected.highlight:hover {
        background: #333333;
    }
</style>