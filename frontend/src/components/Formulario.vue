<template>
  <div class="card mx-auto mt-5" style="width: 350px;">
    <form @submit.prevent="procesarFormulario" class="card-body">
      <h1>{{ cliente ? 'Editar' : 'Agregar' }} Cliente</h1>
      <input
        class="form-control mb-2"
        type="text"
        v-model="formData.business_name"
        placeholder="Nombre Empresa"
        required
      />
      <input
        id="nit"
        type="text"
        placeholder="Nit"
        v-model="formData.nit"
        class="form-control mb-3"
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        v-model="formData.email"
        class="form-control mb-3"
        required
      />
      <input
        type="number"
        placeholder="Telefono"
        v-model="formData.phone"
        class="form-control mb-3"
        required
      />
      <div class="form-group">

        <label for="estado">Selecciona un estado:</label>
        <select v-model="selectedEstado"  class="form-control">
          <option v-for="estado in estados" :key="estado.id" :value="estado">
            {{ estado.name }}
          </option>
        </select>
      </div>
      <div class="mt-3"></div> 
        <div>
        <button :disabled="cargando" class="btn btn-primary w-50">{{ cliente ? 'Editar' : 'Crear' }}</button>
        <button :disabled="cargando"  @click="irTabla" class="btn btn-primary w-50">Regresar</button>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { API, type ICliente} from "@/contantes";
import { useRouter } from "vue-router";

const estados = ref([
  { id: 1, name: 'Activo' },
  { id: 2, name: 'Inactivo' },
  
]);
const selectedEstado = ref();

const props = defineProps({
  cliente: {
    type: Object,
    default: null,
  },
});
const formData = reactive({
  business_name: '',
  email: '',
  nit: '',
  phone: '',
  status: '',
});
const cargando = ref(false);
const router = useRouter();
const cliente = computed(() => props.cliente);

const irTabla = ()=>{
  router.push('/clientes')
}

watch(cliente, () => {
  let target  = cliente.value;
  
  formData.nit = target[0].nit;
  formData.email = target[0].email;
  formData.phone = target[0].phone;
  formData.business_name = target[0].business_name;
  selectedEstado.value = 1;

});

const procesarFormulario = async () => {
  cargando.value = true;
  const status1 = selectedEstado.value.name
  console.log(status1.name);
  if (cliente.value) {
    const id = cliente.value[0].client_id
    await fetch(`${API}/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        business_name: formData.business_name,
        nit: formData.nit,
        email: formData.email,
        phone: formData.phone,
        created_by: 1,
        status: status1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    irTabla();
  } else {
    await fetch(`${API}/clients`, {
      method: "POST",
      body: JSON.stringify({
        business_name: formData.business_name,
        nit: formData.nit,
        email: formData.email,
        phone: formData.phone,
        created_by: 1,
        status: status1,
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  irTabla();

};

// // Función para validar si un valor es numérico
// function esNumero(valor: string): boolean {
//   return !isNaN(parseFloat(valor)) && isFinite(parseFloat(valor));
// }

// // Evento para validar el campo "Nit"
// document.querySelector("#nit")?.addEventListener("input", (event) => {
//   const valorIngresado = (event.target as HTMLInputElement).value;
//   if (!esNumero(valorIngresado)) {
//     // Mostrar un mensaje de error o realizar alguna acción
//     console.log("Ingresa solo números en el campo Nit.");
//     // También puedes deshabilitar el botón de guardar si el valor no es numérico
//     // document.querySelector("#botonGuardar")?.disabled = true;
//   } else {
//     // El valor es numérico, puedes habilitar el botón de guardar si lo necesitas
//     // document.querySelector("#botonGuardar")?.disabled = false;
//   }
// });

</script>
