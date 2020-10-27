<template>
<div>
  <navbar
  style="z-index:3"
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
        <router-link to="/" class="nav-link">
            <p>INICIO</p>
        </router-link>
      </li>
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <router-link to="/nosotros" class="nav-link">
            <p>NOSOTROS</p>
        </router-link>
      </li>
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <router-link to="/products" class="nav-link">
            <p>TIENDA</p>
        </router-link>
      </li>
      <li class="nav-item" style="padding-top:10px;margin-right:50px;">
        <router-link to="/contacto" class="nav-link">
            <p>CONTACTO</p>
        </router-link>
      </li>
      <li class="nav-item">
        
        <n-button @click="isSidebarOpen = true" type="default" icon round>
          <i class="now-ui-icons shopping_cart-simple"></i>
        </n-button>
      </li>
      <li class="nav-item">
        <div v-if="status == 'log-in'">
          <drop-down class="mt-2" tag="div" :title="name + ' ' + lastName">
            <a style="cursor:pointer" class="dropdown-item">Historial de cotizaciones</a>
            <a @click="closeSession()" style="cursor:pointer" class="dropdown-item">Cerrar sesión</a>
          </drop-down>
        </div>
        <router-link v-else to="/ingreso">
            <n-button type="info" round>
              Ingresar
            </n-button>
        </router-link>
        
      </li>
      
    </template>
    
  </navbar>
  <SfSidebar
      :visible="isSidebarOpen"
      @close="isSidebarOpen = false"
      :title="'Carro de compras'"
      :subtitle="subtitle"
      :heading-level="headingLevel"
      :button="button"
      :overlay="overlay"
      :class="'sf-sidebar--right indexZ'"
      :persistent="persistent"
    >
      Total: {{products.length}}
      <SfCollectedProduct
      v-for="(product, index) in products" :key="product.id"
        :qty="product.qty"
        :class="'productsCart'"
        @input="product.qty = $event, chageQty()"
        :image="product.image"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :title="product.name"
        :regular-price="''"
        :special-price="specialPrice"
        @click:remove="deleteProduct(index)"
      >
      </SfCollectedProduct>

      <!-- <SfList v-if="products.length > 0" :style="{ maxWidth: '100%' }">
        <SfListItem
          :style="{ '--list-item-margin': '24px 0' }"
        >
          <SfMenuItem :label="'Sub-Total'" :count="2" />
        </SfListItem>
        <SfListItem
          :style="{ '--list-item-margin': '24px 0' }"
        >
          <SfMenuItem :label="'Costo de envío'" :count="2" />
        </SfListItem>
        <SfListItem
          :style="{ '--list-item-margin': '24px 0' }"
        >
          <SfMenuItem :label="'Tarifas'" :count="2" />
        </SfListItem>
        <SfListItem
          :style="{ '--list-item-margin': '24px 0' }"
        >
          <SfMenuItem :label="'Total'" :count="2" />
        </SfListItem>
      </SfList> -->
      <router-link v-if="products.length > 0"   to="/checkout" class="nav-link">
        <n-button type="primary" class="w-100" v-on:click="isSidebarOpen = false" round>Cotizar</n-button>
      </router-link>
        
    </SfSidebar>
</div>
  
</template>

<script>
import router from '../router'
import {Badge} from '@/components'
import { DropDown, Navbar, NavLink, Button } from '@/components';
import { Popover } from 'element-ui';
import { SfSidebar } from "@storefront-ui/vue";
import { SfCollectedProduct } from "@storefront-ui/vue";
import EventBus from "../pages/components/eventBus"
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    [Popover.name]: Popover,
    [Button.name]: Button,
    SfSidebar,
    SfCollectedProduct,
    [Badge.name]: Badge
  },
  data(){
    return {
      isSidebarOpen: false,
      subtitle: "",
      headingLevel: 3,
      overlay: true,
      button: true,
      persistent: false,
      products:[],
      productQty: 1,
      name:'',
      status:'',
      lastName:'',
      imageWidth: 140,
      imageHeight: 200,
      title: "Cotton Sweater Modern Style",
      regularPrice: "$10,99",
      specialPrice: "",
    }
  },
  created(){
        this.getCart()
    },
    methods: {
        getCart(){
          if (localStorage.clientName) {
            this.name = localStorage.clientName
          }
          if (localStorage.status) {
            this.status = localStorage.status
          }
          if (localStorage.clientlastName) {
            this.lastName = localStorage.clientlastName
          }
          if (localStorage.cart) {
            this.products = JSON.parse(localStorage.cart)
          }
          console.log(localStorage)
          
        },
        chageQty(){
          localStorage.setItem("cart", JSON.stringify(this.products))
        },
        deleteProduct(i){
          this.$swal({
              title: '¿Seguro que desea eliminar?',
              text: "",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.isConfirmed) {
                const data = JSON.parse(localStorage.cart)
                data.splice(i,1)
                localStorage.setItem("cart", JSON.stringify(data))
                this.products = JSON.parse(localStorage.cart)
                this.isSidebarOpen = true
              }
          })
        },
        closeSession(){
          localStorage.removeItem("status")
          localStorage.removeItem("clientMail")
          localStorage.removeItem("clientName")
          localStorage.removeItem("clientlastName")
          localStorage.removeItem("clientId")
          router.push("/")
        }
    },
    mounted() {
      EventBus.$on("addProduct",status => {
        this.getCart()
      })
    }
};
</script>

<style scoped>
  .productsCart{
    --collected-product-actions-display: none;
    --collected-product-transition: none;
    --collected-product-configuration-display:none
  }
  .badgeCart{
    position: absolute;
    right: 16%;
    z-index: 100;
  }
  
</style>
