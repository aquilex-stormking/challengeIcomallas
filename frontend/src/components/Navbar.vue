<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <h3 class="navbar-brand">App Clientes</h3>
      <div>
        <RouterLink exact-active-class="activo" class="me-2" to="/">Salir</RouterLink>
        
      </div>
    </div>
  </nav>
  <!-- <div class="login-container">
    <form class="login-form">
      <h2>Iniciar sesión</h2>
      <div class="input-group">
        <label for="username">Usuario</label>
        <input type="text" id="username" placeholder="Ingresa tu usuario" />
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" />
      </div>
      <button class="login-button" type="submit" onclick="validar()">Ingresar</button>
      <p v-if="error" style="color: red;">Datos incorrectos, por favor verifícalos.</p>
    </form>
  </div> -->
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import {API} from "@/contantes";



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