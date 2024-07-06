<template>
  <div class="login-container">
    <form @submit.prevent="validar" class="login-form">
      <h2>Iniciar sesión</h2>
      <div class="input-group">
        <label for="username">Usuario</label>
        
        <input type="text" id="username" v-model="formData.username" placeholder="Ingresa tu usuario" required/>
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="formData.password" placeholder="Ingresa tu contraseña" />
      </div>
      <button class="login-button" >Ingresar</button>
      <!-- <p v-if="error" style="color: red;">Datos incorrectos, por favor verifícalos.</p> -->
    </form>
  </div>
</template>
<script setup lang="ts">
import {RouterLink} from "vue-router";
import {API} from "@/contantes";
import { useRouter } from "vue-router";
import { computed, onMounted, reactive, ref, watch } from "vue";


const formData = reactive({
  username: '',
  password: '',
});

const router = useRouter();

const validar = async()=> {
      // event.preventDefault();
      console.log('entra')
      const username = formData.username;
      const password = formData.password;
      // const errorMessage = document.getElementById('error-message');
      
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response.status)
      if (response.status === 200) {
        router.push('/clientes')
      } else {
        const respuesta = alert(`Usuario o Contraseña Incorrectos`);

      }
    }
</script>
<style scoped>
.activo{
  color: black;
}
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #080700; /* Fondo amarillo */
  }

  .login-form {
    background-color: #FFCA00; /* Fondo negro transparente */
    padding: 20px;
    border-radius: 8px;
    color: #ffffff; /* Texto blanco */
    width: 300px;
  }

  .input-group {
    margin-bottom: 15px;
  }
  .image{
    width: 300px; /* Ancho deseado */
    height: 150px; /* Alto deseado */
    background-image: url('../assets/images/imallas.jpg'); /* Ruta a tu imagen */
    background-size: cover; /* Ajusta la imagen para cubrir todo el div */
    background-position: center; /* Centra la imagen */
    background-color: white;
  }
  label {
    display: block;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: none;
    border-bottom: 1px solid #ffffff; /* Línea blanca en el input */
    background-color: transparent;
    color: #ffffff;
  }

  button.login-button {
    width: 100%;
    padding: 10px;
    background-color: #000000; /* Botón negro */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>