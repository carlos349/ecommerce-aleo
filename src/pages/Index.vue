<template>
  <div>
    <div style="z-index:1" class="container-fluid w-100 px-0 mt-5">
      <el-carousel height="80vh">
        <el-carousel-item>
          <img class="d-block w-100" style="height: 80vh" src="img/banner-bg.png" alt="Second slide" />
          <div data-aos="fade-left" data-aos-offset="400" data-aos-easing="ease-in-sine" class="carousel-caption-style">
            <h3 class="fontTwo">Seguridad y confianza para tu empresa.</h3>
            <h6>Todo lo que necesitas en apicultura</h6>
            <n-button type="primary">Está aquí</n-button>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img class="d-block w-100" style="height: 80vh" src="img/banner-bg.png" alt="Second slide" />
          <div data-aos="fade-left" data-aos-offset="400" data-aos-easing="ease-in-sine" class="carousel-caption-style">
            <h3 class="fontTwo">Seguridad y confianza para tu empresa.</h3>
            <h6>Todo lo que necesitas en apicultura</h6>
            <n-button type="primary" round>Está aquí</n-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <modal :show.sync="modals.policity"
             class="modal-primary"
             :show-close="false"
             header-classes="justify-content-center"
             type="mini">
      <div slot="header" class="modal-profile d-flex justify-content-center align-items-center">
        <i class="now-ui-icons files_paper"></i>
      </div>
      <h4 class="fontTwo">Politicas de garantía</h4>
      <p>Garantía 3 meses por defecto de fabricación una vez entregado el producto.</p>
      <template slot="footer">
        <n-button type="neutral" link @click.native="modals.policity = false">Entendido</n-button>
      </template>
    </modal>

    <modal :show.sync="modals.despach"
             class="modal-primary"
             :show-close="false"
             header-classes="justify-content-center"
             type="mini">
      <div slot="header" class="modal-profile d-flex justify-content-center align-items-center">
        <i class="now-ui-icons files_box mx-auto"></i>
      </div>
      <h4 class="fontTwo text-center">Despacho</h4>
      <p>Se hacen envíos a toda Colombia con costo de despacho adicional dependiendo de la cantidad solicitada y la provincia de entrega. Envío por medio de Interrapidisimo, Servientrega, Envía, Coordinadora o Deprisa.</p>
      <template slot="footer">
        <n-button type="neutral" link @click.native="modals.despach = false">Entendido</n-button>
      </template>
    </modal>

    <modal :show.sync="modals.pay"
             class="modal-primary"
             :show-close="false"
             header-classes="justify-content-center"
             type="mini">
      <div slot="header" class="modal-profile d-flex justify-content-center align-items-center">
        <i class="now-ui-icons business_money-coins"></i>
      </div>
      <h4 class="fontTwo text-center">Tipos de pago</h4>
      <p>Una vez aprobada la cotización y comprometida la fecha de entrega, se realiza el pago por consignación a cuentas Bancolombia, Nequi o Efecty. Posteriormente se envía el producto.</p>
      <template slot="footer">
        <n-button type="neutral" link @click.native="modals.pay = false">Entendido</n-button>
      </template>
    </modal>
    
    

    <div class="section">
      <div class="container-fluid px-4">
        <div class="row justify-content-md-center">
            <h2 class="title fontTwo text-center w-100">COMPRA POR CATEGORÍAS</h2>
            <div class="col-md-4 ">
              <card class="w-100 cursor-pointer categoryImg1" style="height:35vh;">
                <h4 class="text-right mt-5">Overoles para<br> caballeros</h4>
              </card>
            </div>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer categoryImg3" style="height:35vh;">
                <h4 class="text-right mt-5">Accesorios</h4>
              </card>
            </div>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer categoryImg2" style="height:35vh;">
                <h4 class="text-right mt-5">Overoles para<br> damas</h4>
              </card>
            </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container-fluid px-4">
        <div  class="row justify-content-md-center">
           <h2 class="title fontTwo text-center w-100">DESTACADOS</h2>
           <center> 
             <div class="row">
               
                <div v-for="(product,index) in products" :key="index" class="col-md-4 mx-auto">
                    <SfProductCard
                      class="mx-auto"
                      :image="product.images[0].url"
                      :image-width="imageWidth"
                      :image-height="imageHeight"
                      :badge-label="badgeLabel"
                      :badge-color="badgeColor"
                      :title="product.name"
                      :link="link+product._id"
                      :link-tag="linkTag"
                      :score-rating="3"
                      :max-rating="5"
                      :reviews-count="product.reviews.length"
                      :regular-price="'$ '+formatPrice(product.price)"
                      :special-price="specialPrice"
                      :wishlist-icon="wishlistIcon"
                      :is-on-wishlist-icon="isOnWishlistIcon"
                      :is-on-wishlist="isOnWishlist"
                      :show-add-to-cart-button="showAddToCartButton"
                      :add-to-cart-disabled="addToCartDisabled"
                      :is-added-to-cart="isAddedToCart"
                      @click:is-added-to-cart="pushCart(index)"
                      @click:wishlist="alert('@click:wishlist')"
                      @click:add-to-cart="pushCart(index)"
                      @click:reviews="alert('@click:reviews')"
                    />
                </div>
            </div>   
          </center>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container-fluid">
        <div class="row justify-content-md-center">
          <card class="card-nav-tabs text-center background-buy" header-classes="card-header-warning">
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8 pt-5">
                <h2 class="card-title mt-5">Lleva ahora tu pack completo de indumentaria de apicultura.</h2>
                <p class="card-text mt-5">Realiza tu pedido en el color que desees.</p>
                <n-button type="primary">Cotiza ahora</n-button>
              </div>
              
            </div>
            
            
            
          </card>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container-fluid  px-4">
        <div class="row justify-content-md-center">
          <div class="row">
            <div v-on:click="modals.policity = true" class="col-md-3 cursor-pointer">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons files_paper mx-auto iconSize"></i> <br> <h4>Políticas de garantía</h4> 
                </center>
                
              </div>
            </div>
            <div v-on:click="modals.despach = true" class="col-md-3 cursor-pointer">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons files_box mx-auto iconSize"></i> <br> <h4>Despacho <br><br> </h4> 
                </center>
                
              </div>
            </div>
            <div v-on:click="pushContact()" class="col-md-3 cursor-pointer">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons users_circle-08 mx-auto iconSize"></i> <br> <h4>Contacto <br><br> </h4> 
                </center>
              </div>
            </div>
            <div v-on:click="modals.pay = true" class="col-md-3 cursor-pointer">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons business_money-coins mx-auto iconSize"></i> <br> <h4>Tipos de pago <br><br> </h4> 
                </center>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section pb-0">
      <div class="container-fluid">
        <div class="row justify-content-md-center">
          <card class="card-nav-tabs text-center background-news mb-0 pb-5" header-classes="card-header-warning">
            <div class="row">
              <div class="col-md-8 card-news py-5">
                <h2 class="card-title mt-5">Suscríbete para recibir nuestras novedades y ofertas de productos mensualmente.</h2>
                <fg-input class="w-50 mx-auto"  placeholder="email@ejemplo.com"></fg-input>
                <n-button type="primary">Subscribirse</n-button>
              </div>
              <div class="col-md-4"></div>
            </div>
            
            
            
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode' 
import { Parallax, Card } from '@/components';
import { Carousel, CarouselItem } from 'element-ui';
import {FormGroupInput as FgInput} from '@/components'
import {Tabs, TabPane} from '@/components'
import Rating from 'vue-bulma-rating'
import AOS from 'aos';
import { SfProductCard } from "@storefront-ui/vue";
import { Popover } from 'element-ui';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import EventBus from "./components/eventBus"
import {Modal} from '@/components'
// ..
import {
  Button
} from '@/components';
export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
    [Popover.name]: Popover,
    [Button.name]: Button,
    Card,
    FgInput,
    SfProductCard,
    Modal
  },
  data () {
    return {
      modals:{
        policity:false,
        despach:false,
        pay:false
      },
      value: 4,
      configHeader: {headers:{"x-database-connect":endPoint.dataBase}},
      products : [],
      destacados:[],
      image: {
        mobile: { url: "https://storybook.storefrontui.io/assets/storybook/Home/productB.jpg" },
        desktop: { url: "https://storybook.storefrontui.io/assets/storybook/Home/productB.jpg" },
      },
      imageWidth: 216,
      imageHeight: 326,
      badgeLabel: "",
      badgeColor: "color-primary",
      title: "Cotton Sweater",
      link: "/producto?id=",
      linkTag: "",
      scoreRating: 4,
      maxRating: 7,
      reviewsCount: 7,
      regularPrice: "$10.99",
      specialPrice: "",
      wishlistIcon: "",
      isOnWishlistIcon: "heart_fill",
      isOnWishlist: false,
      showAddToCartButton: true,
      isAddedToCart: false,
      addToCartDisabled: false,
      ready:false
    }
  },
  beforeCreated(){
   
  },
  created(){
    AOS.init();
     this.getProduct()
  },
  methods: {
    update (val) {
      this.value = val
    },
    emitMethod(){
      EventBus.$emit("addProduct", "index")
    },
    getProduct(){
      axios.get(endPoint.endpointTarget+'/products/featured',this.configHeader)
      .then(res => {
        if (res.data.length != 0) {
            this.products = res.data 

        }
        this.ready = true
        
      })
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    calculateRating(rating){
      var rat = 0
      for (let i = 0; i < rating.length; i++) {
        const element = rating[i];
        rat = rat + element.rating
      }
      rat = (rat / 5)
      console.log(rat) 
    },
    pushCart(i){
      var validation = true
      if (localStorage.cart) {
        const data = JSON.parse(localStorage.cart)
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.idProduct == this.products[i]._id) {
            element.qty ++
            localStorage.setItem("cart", JSON.stringify(data))
            validation = false
            break
          }
        }
        if (validation) {
          data.push({id:data.length,name:this.products[i].name,qty:1,image:this.products[i].images[0].url,idProduct:this.products[i]._id,data:this.products[i].category})
          localStorage.setItem("cart", JSON.stringify(data))
        }
        
      }
      else{
        localStorage.setItem("cart",JSON.stringify([{id:0,name:this.products[i].name,qty:1,image:this.products[i].images[0].url,idProduct:this.products[i]._id,data:this.products[i].category}]))
      }
      this.$swal({
          type: 'success',
          icon: 'success',
          toast: true,
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          title: 'Agregado a cotizaciones',
          showConfirmButton: false,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
      })
      this.emitMethod()
    },
    pushContact(){
      router.push("/contacto")
    }
  }
};
</script>
<style></style>
