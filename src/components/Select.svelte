<script>
import geo from "../assets/geo.svg";
let isOpenSelect = false;

const openSelect = () => {
    isOpenSelect = !isOpenSelect;
}

export let cities;

export let title;

let selectText = cities.split(",")[0];

const onClickSelect = () => {
    isOpenSelect = !isOpenSelect;
    console.log(isOpenSelect);
    console.log("select");
}

const onClickOption = (city) => {
    console.log("option");
    selectText = city;
}
</script>

<div class="from select-block">
    <h3 class="title">
        {title}
    </h3>
    <div class="select" on:click={onClickSelect}>
        <div class="select__main">
            <img src={geo} />
            <p class="select__text">{selectText}</p>
        </div>
        {#if isOpenSelect}
            <div class="select__popup">
                {#each cities.split(",") as city}
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
    }
    .select {
        position: relative;
        /*padding: 15px 18px;*/
    }
    .select__main {
        border-radius: 5px;
        padding: 15px 18px;
        background-color: #E0E0E0;

        display: flex;

        max-width: 200px;

        cursor: pointer;
    }
    .select__text {
        margin: 0 0 0 8px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select__popup {
        top: 52px;
        left: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: 10px;

        border: 1px solid #BDBDBD;
        border-radius: 5px;
        background-color: #F2F2F2;

        cursor: pointer;
    }
    .select__option {
        background-color: #F2F2F2;
        border-radius: 5px;
        padding: 10px;
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