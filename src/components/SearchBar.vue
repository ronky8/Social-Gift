<template>
    <div class="search-container">
        <img src="../assets/menu/message.svg" alt="search icon" width="30" height="30">
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="searchbar" />
    </div>
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script>

<style>
@media screen and (max-width: 800px) {
    .search-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;

    border: 1px solid black;
    padding: 1rem;
    padding-right: 5rem;
}

.search-container>img {
    position: absolute;
    margin-left: 0.5rem;
    left: 0;
}

.search-container:focus {
    outline: #457B9D solid 1px;
}

.searchbar {
    border: 0px solid #457B9D;
    margin-left: 1.5rem;

}

.searchbar:focus {
    outline: none;
}

    
}
@media screen and (min-width: 800px) {
    .search-container {
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 25px;

    border: 1px solid black;
    padding: 1rem;
    padding-right: 5rem;
}

.search-container>img {
    position: absolute;
    margin-left: 0.5rem;
    left: 0;
}

.search-container:focus {
    outline: #457B9D solid 1px;
}

.searchbar {
    border: 0px solid #457B9D;
    margin-left: 1.5rem;

}

.searchbar:focus {
    outline: none;
}

}
</style>