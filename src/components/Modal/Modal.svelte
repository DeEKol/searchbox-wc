<script>
    import { fade } from 'svelte/transition';
    import { getContext } from "svelte";

    export let dataForm;

    const isModal = getContext("isModal")

</script>

<div class="modal-back" transition:fade on:click={() => $isModal = false}>
    <div class="modal">
        <h3 class="modal__title">
            Результат поиска
        </h3>
        <div class="modal__descr">
            <p>Откуда: {dataForm.from}</p>
            <p>Куда: {dataForm.to}</p>
            <p>От: {dataForm.dateFrom}</p>
            <p>До: {dataForm.dateTo}</p>
        </div>
    </div>
</div>

<style>
    .modal-back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal {
        font-family: Roboto;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: #333;

        padding: 20px;

        background: #F2F2F2;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .modal__title {
        margin-top: 0;
    }
    .modal__descr p:last-child {
        margin-bottom: 0;
    }
</style>