<template>
  <navbar
    position="fixed"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
      <div class="logo-container">
        <img src="img/logo.png" class="navbar-logo" alt="">

      </div>
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="300"
        trigger="hover"
      >
        <div class="popover-body text-center">
          Creaciones Apícolas ALEO <br>
          Seguridad y Confianza
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <p>INICIO</p>
        </a>
      </li>
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <p>TIENDA</p>
        </a>
      </li>
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit-pro"
          target="_blank"
        >
          <p>NOSOTROS</p>
        </a>
      </li>
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit-pro"
          target="_blank"
        >
          <p>CONTACTO</p>
        </a>
      </li>
      <li class="nav-item">
        <n-button type="default" icon round>
          <i class="now-ui-icons shopping_cart-simple"></i>
        </n-button>
      </li>
      <li class="nav-item">
        <n-button type="info" round>
          Ingresar
        </n-button>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink, Button } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    Navbar,
    [Popover.name]: Popover,
    [Button.name]: Button,
  }
};
</script>

<style scoped></style>
