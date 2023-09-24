<script>
    import { getDateRows, uuid, noop } from "./date-time.js";
    import {createEventDispatcher, getContext} from "svelte";

    const { isDateLast, activetedCell, firstCell, pickDateLast } = getContext("isDate")


    const dispatch = createEventDispatcher();

    // props
    export let date;
    export let month;
    export let year;
    export let isAllowed;

    // local vars to help in render
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    let cells;

    export let activeCell = {
      date: 0,
      month: 0,
    };

    // function helpers
    const onChange = date => {
      if (!$isDateLast) {
        $firstCell = {
          date: date,
          month: month,
        }
        $activetedCell = {
          date: date,
          month: month,
        }
        dispatch("datechange", new Date(year, month, date));
        return;
      }
        if (!$pickDateLast) {
            $firstCell = {
                date: date,
                month: month,
            }
            if ($activetedCell.month === month && $firstCell.date > $activetedCell.date) {
              $activetedCell = {
                date: date,
                month: month,
              }
            }
            else if ($activetedCell.month < month) {
              $activetedCell = {
                date: date,
                month: month,
              }
            }
        }
        if ($pickDateLast) {
          $activetedCell = {
            date: date,
            month: month,
          }
          if ($firstCell.month >= $activetedCell.month && $firstCell.date > $activetedCell.date) {
            $firstCell = {
              date: date,
              month: month,
            }
          }
          else if (month < $firstCell.month) {
            $firstCell = {
              date: date,
              month: month,
            }
          }
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
                    class:selectedLast={
                        $isDateLast && value && allowed && (month >= $firstCell.month) &&
                        ((month === $activetedCell.month && (value >= $firstCell.date) && ($activetedCell.date >= value))

                        || (month < $activetedCell.month) && ($activetedCell.month !== $firstCell.month) && (value > $firstCell.date)
                        || (month === $activetedCell.month) && (month > $firstCell.month) && (value <= $activetedCell.date)
                        || (month < $activetedCell.month) && ($firstCell.month !== month) && ($firstCell.month < $activetedCell.month))}>
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
        width: 42px;
        height: 20px;
        text-align: center;
        padding: 4px;
        margin: 1px -2px;
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