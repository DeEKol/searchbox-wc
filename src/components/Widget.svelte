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
    import Select from "./Select/Select.svelte";
    import DatePicker from "./DatePicker/DatePicker.svelte";
    import Modal from "./Modal/Modal.svelte";
    import { fade } from 'svelte/transition';
    import { setContext } from "svelte";
    import {writable} from "svelte/store";

    export let cities = [];
    $: citiesArr = cities;

    let currentDate = new Date();
    let lastSelected = new Date();
    let find;
    let isError = false;

    let dataForm = writable({
        from: "",
        to: "",
        dateFrom: new Date(),
        dateTo: new Date(),
    });
    let isModal = writable(false);
    let isDateLast = writable(false);
    let showDatePicker = writable(false);
    let firstCell = writable({
        date: 0,
        month: 0,
    });
    let activetedCell = writable({
        date: 0,
        month: 0,
    });
    let pickDateLast = writable(false);

    setContext("dataForm", dataForm);
    setContext('isModal', isModal);
    setContext('isDate', { isDateLast, activetedCell, firstCell, pickDateLast, showDatePicker });

    const onDateChange = d => {
        if (!$isDateLast) {
            currentDate = d.detail;
            $dataForm.dateFrom = currentDate;
            lastSelected = d.detail;
            $dataForm.dateTo = lastSelected;
            return;
        }
        if (!$pickDateLast) {
            currentDate = d.detail;
            $dataForm.dateFrom = currentDate;
            if ($firstCell.month >= $activetedCell.month && $firstCell.date >= $activetedCell.date) {
                lastSelected = currentDate;
                $dataForm.dateTo = lastSelected;
            }
        }
        if ($pickDateLast) {
            lastSelected = d.detail;
            $dataForm.dateTo = lastSelected;
            if ($firstCell.month >= $activetedCell.month && $firstCell.date >= $activetedCell.date) {
                currentDate = d.detail;
                $dataForm.dateFrom = currentDate;
            }
            else if ($firstCell.month > $activetedCell.month) {
                currentDate = d.detail;
                $dataForm.dateFrom = currentDate;
            }
        }
    };

    let event = new Event("search", {
        bubbles: true,
        composed: true,
    });
    event.dataForm = $dataForm;

    const onClick = () => {
        $showDatePicker = false;
        if ($dataForm.from === "" || $dataForm.to === "") {
            isError = true;
        } else {
            find.dispatchEvent(event)
            isError = false;
            $isModal = true;
        }
    }

</script>

<div class="widget">
    <Select title="Откуда" cities={citiesArr} />
    <Select title="Куда" cities={citiesArr} />
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
                       return true;
                   }}
        />
    </div>
    <button bind:this={find} class="btn" on:click={onClick}>
        Найти
    </button>
    {#if isError}
        <div class="error" transition:fade>Заполните все поля!!!</div>
    {/if}
</div>
{#if $isModal}
    <Modal dataForm={$dataForm} />
{/if}
<slot class="card" />

<style>
    .widget {
        position: relative;

        box-sizing: border-box;
        padding: 20px 23px;

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
    .date {
      margin-right: 12px;
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

        margin-top: 26px;

        transition: box-shadow 0.3s;
    }
    .btn:hover {
        box-shadow: inset 0px 0px 15px #E0E0E0;
    }
    .error {
        font-family: Roboto;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        position: absolute;
        bottom: 2px;
        left: 10px;
        color: red;
    }
</style>