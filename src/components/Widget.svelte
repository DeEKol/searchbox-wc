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

    export let cities;

    const citiesArr = cities.split(",");

    let dataForm = writable({
        from: "",
        to: "",
        dateFrom: new Date(),
        dateTo: new Date(),
    });

    setContext("dataForm", dataForm);

    let currentDate = new Date();
    let lastSelected = new Date();

    let isDateLast = writable(false);

    let firstCell = writable({
        date: 0,
        month: 0,
    });
    let activetedCell = writable({
        date: 0,
        month: 0,
    });

    setContext('isDate', { isDateLast, activetedCell, firstCell });

    const onDateChange = d => {
        if (!$isDateLast) {
            currentDate = d.detail;
            $dataForm.dateFrom = currentDate;
            $dataForm.dateTo = currentDate;
        }
        if ($isDateLast) {
            if ($firstCell.month >= $activetedCell.month && $firstCell.date > $activetedCell.date) {
              // if (lastSelected !== currentDate) {
              //   currentDate = d.detail;
              //   $dataForm.dateFrom = currentDate;
              // }
              lastSelected = currentDate;

            }
            else if ($firstCell.month > $activetedCell.month) {
              // currentDate = d.detail;
              lastSelected = currentDate;

              // $dataForm.dateFrom = currentDate;
            }
            // else if ($firstCell.month <= $activetedCell.month && $firstCell.date < $activetedCell.date) {
            //   currentDate = d.detail;
            //   $dataForm.dateFrom = currentDate;
            // }
            else {
              lastSelected = d.detail;
            }
            $dataForm.dateTo = lastSelected;
        }
    };

    let find;
    let event = new Event("search", {
      bubbles: true,
      composed: true,
    });
    event.dataForm = $dataForm;

    let isError = false;
    const onClick = () => {
        if ($dataForm.from === "" || $dataForm.to === "") {
            isError = true;
        } else {
            find.dispatchEvent(event)
            isError = false;
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
                    if (millisecs > Date.now() + 3600 * 24 * 45 * 1000) return false;
                    return true;
                }}
        />
    </div>
    <button bind:this={find} class="btn" on:click={onClick}>
        Найти
    </button>
    {#if isError}
        <div class="error">Заполните все поля</div>
    {/if}
</div>
<slot class="card" />

<style>
    .widget {
        position: relative;

        box-sizing: border-box;
        padding: 20px 23px;

        /*width: 1032px;*/
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