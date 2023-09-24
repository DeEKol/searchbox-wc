<script>
    import geo from "../../assets/geo.svg";
    import { getContext } from "svelte";
    import { fade } from 'svelte/transition';

    export let cities;
    export let title;

    let isOpenSelect = false;
    let selectText = "Выберите город";
    $: filtredCities = cities.filter(elem => elem !== selectText);

    const dataForm = getContext("dataForm");

    const onClickSelect = () => {
        isOpenSelect = !isOpenSelect;
    }

    const onClickOption = (city) => {
        selectText = city;
        if (title === "Откуда") {
            $dataForm.from = selectText;
        }
        else if (title === "Куда") {
            $dataForm.to = selectText;
        }
    }
</script>

<div class="from select-block">
    <h3 class="title">
        {title}
    </h3>
    <div class="select" on:click={onClickSelect}>
        <div class="select__main" class:pickActive={isOpenSelect}>
            <img src={geo} />
            <p class="select__text">{selectText}</p>
        </div>
        {#if isOpenSelect}
            <div class="select__popup" transition:fade>
                {#if !cities.length}
                    Загрузка городов...
                {/if}
                {#each filtredCities as city}
                    <div class="select__option" on:click={onClickOption(city)}>{city}</div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .title {
        font-family: Roboto;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 0 0 10px 0;
    }
    .select-block {
        display: flex;
        flex-direction: column;

        margin-right: 12px;
    }
    .select {
        position: relative;
    }
    .select__main {
        border-radius: 5px;
        padding: 15px 18px;
        background-color: #E0E0E0;

        display: flex;

        max-width: 200px;

        cursor: pointer;
        transition: box-shadow 0.3s;
    }
    .select__main:hover {
        box-shadow: inset 0px 0px 30px rgba(238, 176, 60, 0.8);
    }
    .pickActive {
        box-shadow: inset 0px 0px 30px rgba(0,0,0,0.5);
    }
    .select__text {
        font-family: Roboto;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        margin: 0 0 0 8px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select__popup {
        top: 72px;
        left: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: 10px;
        max-width: 232px;

        border: 1px solid #BDBDBD;
        border-radius: 5px;
        background-color: #F2F2F2;

        cursor: pointer;
    }
    .select__option {
        background-color: #F2F2F2;
        border-radius: 5px;
        padding: 10px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select__option:not(:last-child) {
        margin-bottom: 2px;
    }
    .select__option:before {
        content: "";
        position: absolute;
        border-left: 10px solid rgba(113, 101, 58, 0);
        border-right: 10px solid rgba(113, 101, 58, 0);
        border-bottom: 10px solid #BDBDBD;
        left: 10px;
        top: -10px;
    }
    .select__option:after {
        content: "";
        position: absolute;
        border-left: 10px solid rgba(255, 241, 190, 0);
        border-right: 10px solid rgba(255, 241, 190, 0);
        border-bottom: 10px solid #F2F2F2;
        left: 10px;
        top: -9px;
    }
    .select__option:hover {
        background-color: #E0E0E0;
    }
</style>