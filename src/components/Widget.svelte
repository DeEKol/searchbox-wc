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

    export let cities;

</script>

<div class="widget">
    <Select title="Откуда" cities={cities} />
    <Select title="Куда" cities={cities} />
    <div class="date">
        <h3 class="title">
            Даты
        </h3>
    </div>
    <button class="button">
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
    .button {
        border: none;
        height: 47px;
        color: #F2F2F2;
        background-color: #333;
        padding: 14px 40px;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
    }
    .select-block {
        display: flex;
        flex-direction: column;
    }
    .select {
        position: relative;
        /*padding: 15px 18px;*/
    }
</style>