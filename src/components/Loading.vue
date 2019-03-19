<template>
    <div class="centralize-wrapper">
        <div class="centralize">
            Loading...
        </div>
    </div>
</template>

<style scoped>
    .centralize-wrapper {
        position: relative;
        width:100%;
        height:200px;
    }
    .centralize {
        left:50%;
        top:50%;
        margin-left:-18px; /* Metade do valor da Largura */
        margin-top:-18px; /* Metade da valor da Altura */
        position:absolute;
        width:36px; /* Valor da Largura */
        height:36px; /* Valor da Altura */
    }
</style>