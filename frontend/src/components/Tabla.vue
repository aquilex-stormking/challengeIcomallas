<template>
  <div class="card">
    <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre empresa</th>
        <th scope="col">Nit</th>
        <th scope="col">Correo</th>
        <th scope="col">Telefono</th>
        <th scope="col">Creado por</th>
        <th scope="col">Estado</th>


      </tr>
    </thead>
    <tbody>
      <tr v-for="cliente in clientes" :key="cliente.client_id">
        <td>{{ cliente.client_id }}</td>
        <td>{{ cliente.business_name }}</td>
        <td>{{ cliente.nit }}</td>
        <td>{{ cliente.email }}</td>
        <td>{{ cliente.phone }}</td>
        <td>{{ cliente.created_by }}</td>
        <td>{{ cliente.status }}</td>

  
        <td>
          <span @click="editar(cliente.client_id)" class="icono">
            👁
          </span>
          <span 
            @click="eliminar(cliente.client_id)"
            class="icono">
            ❌
          </span>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {API,type ICliente} from "@/contantes";
import {useRouter} from "vue-router";

const clientes = ref<ICliente[]>([])
const router = useRouter();

const editar = (id:Number)=>{
  router.push(`/cliente-formulario/${id}`)
}

// Define la función 'eliminar'
const eliminar = async (id:Number) => {
  // Muestra un mensaje de confirmación
  const respuesta = confirm(`¿Estás seguro de eliminar cliente con ID ${id}?`);

  if (respuesta) {
    // Realiza una petición para eliminar el cliente
    const data = await fetch(`${API}/clients/${id}`, {
      method: 'DELETE'
    });

    // Convierte la respuesta en JSON
    const cliente = await data.json();

    // if (cliente) {
    //   // Filtra las clientes para eliminar el cliente
    //   cliente.value = cliente.value.filter(x => x.client_id !== cliente._id);
    // }
  }
};
onMounted(async()=>{
  const data = await fetch(`${API}/clients`)
  clientes.value = await data.json()
  console.log(clientes);
})
</script>

<style scoped>
.icono{
  cursor: pointer;
}
</style>