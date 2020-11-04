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
            <a style="cursor:pointer" @click="modals.large = true" class="dropdown-item">Historial de cotizaciones</a>
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
  <modal :show.sync="modals.large"
        modal-classes="modal-lg"
        header-classes="justify-content-center">
        <h4>Historial de cotizaciones</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Cantidad de productos</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              
            </tbody>
          </table>
  </modal>
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
        :regular-price="'Categoria:'+product.data"
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
      <n-button v-if="products.length > 0" type="primary" class="w-100" v-on:click="isSidebarOpen = false, goCheck()" round>Cotizar</n-button>
        
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
var os = require('os');
import {Modal} from '@/components'

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
    [Badge.name]: Badge,
    Modal
  },
  data(){
    return {
      modals:{large:false},
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
          }else{
            this.name = ''
          }

          if (localStorage.status) {
            this.status = localStorage.status
          }else{
            this.status = ''
          }

          if (localStorage.clientlastName) {
            this.lastName = localStorage.clientlastName
          }else{
            this.lastName = ''
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
          this.$swal({
              type: 'success',
              icon: 'success',
              toast: true,
              position: 'top-end',
              timer: 3000,
              timerProgressBar: true,
              title: 'Has cerrado sesión',
              showConfirmButton: false,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
          localStorage.removeItem("status")
          localStorage.removeItem("clientMail")
          localStorage.removeItem("clientName")
          localStorage.removeItem("clientlastName")
          localStorage.removeItem("clientId")
          router.push("/")
          this.getCart()
        },
        arrayData(data){
          var better = ''
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            better = better + os.EOL + element.name + ': ' + element.data
          }
          return better
        },
        goCheck(){
          if (this.status == "log-in") {
            router.push("/checkout")
          }
          else{
            this.$swal({
                type: 'error',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                title: 'Debes iniciar sesión',
                showConfirmButton: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            setTimeout(() => {
              router.push("/ingreso")
            }, 2100);
          }
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
