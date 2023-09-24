<script>
  import calendar from "../../assets/calendar.svg";
  import { formatedSelected } from "./date-time.js";
  import {getContext} from "svelte";

  export let pickDateLast;
  export let onClick;
  export let selected;

  const { showDatePicker } = getContext("isDate")

</script>

<div class="date-input__elem" class:pickActive={pickDateLast && $showDatePicker} on:click={onClick()}>
    <img src={calendar} />
    <div class="date-input__text">
        {formatedSelected(selected.toDateString())}
    </div>
</div>

<style>
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
</style>