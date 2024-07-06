<template>
  <div class="container">
    <Formulario
      :cliente="cliente"
    />
  </div>
</template>

<script setup lang="ts">
import Formulario from '@/components/Formulario.vue';
import { API, type ICliente } from '@/contantes';
import { onBeforeMount, ref } from 'vue';
import {useRoute} from "vue-router";

const {params} = useRoute()
const cliente = ref<null | ICliente>(null)

onBeforeMount(async()=>{
  if(params.id){
    const data = await fetch(`${API}/clients/id/${params.id}`)
    cliente.value = await data.json()
    console.log(cliente);
  }
})
</script>

<style scoped>

</style>