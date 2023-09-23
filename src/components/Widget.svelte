<svelte:options
        customElement={{
            tag: '',
            shadow: 'none',
            props: {
                cities: {type: 'String'}
            },
}}
/>

<script>
    import Select from "./Select.svelte";
    import DatePicker from "./DatePicker.svelte";
    import {setContext} from "svelte";
    import {writable} from "svelte/store";

    let currentDate = new Date();
    let lastSelected = new Date();

    // let isLastDate = true;
    let isDateLast = writable(false);
    let activetedCell = writable(0);

    setContext('isDate', { isDateLast, activetedCell });

    const onDateChange = d => {
        if (!$isDateLast) {
            currentDate = d.detail;
        }
        if ($isDateLast) {
            lastSelected = d.detail;
        }
    };

    export let cities;

</script>

<div class="widget">
    <Select title="Откуда" cities={cities} />
    <Select title="Куда" cities={cities} />
    <div class="date">
        <h3 class="title">
            Даты
        </h3>
        <DatePicker
                on:datechange={onDateChange}
                selected={currentDate}
                selectedLast={lastSelected}
                isAllowed={date => {
                    const millisecs = date.getTime();
                    if (millisecs + 25 * 3600 * 1000 < Date.now()) return false;
                    if (millisecs > Date.now() + 3600 * 24 * 45 * 1000) return false;
                    return true;
                }}
        />
    </div>
    <button class="btn">
        Найти
    </button>
</div>
<slot class="card" />

<style>
    .widget {
        box-sizing: border-box;
        padding: 20px 23px;

        width: 1032px;
        /*height: 101px;*/
        border-radius: 10px;
        background-color: #F2F2F2;
        box-shadow: 20px 20px 120px 15px rgba(0, 0, 0, 0.05);
        color: #333;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title {
        font-family: Roboto;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 0 0 10px 0;
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
</style>