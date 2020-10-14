<template>
  <div>
    <div class="container-fluid w-100 px-0 mt-5">
      <el-carousel height="80vh">
        <el-carousel-item>
          <img class="d-block w-100" style="height: 80vh" src="img/banner-bg.png" alt="Second slide" />
          <div data-aos="fade-left" data-aos-offset="400" data-aos-easing="ease-in-sine" class="carousel-caption-style">
            <h3>Seguridad y confianza para tu empresa.</h3>
            <h6>Todo lo que necesitas en apicultura</h6>
            <n-button type="primary">Está aquí</n-button>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img class="d-block w-100" style="height: 80vh" src="img/banner-bg.png" alt="Second slide" />
          <div data-aos="fade-left" data-aos-offset="400" data-aos-easing="ease-in-sine" class="carousel-caption-style">
            <h3>Seguridad y confianza para tu empresa.</h3>
            <h6>Todo lo que necesitas en apicultura</h6>
            <n-button type="primary" round>Está aquí</n-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="section">
      <div class="container-fluid  px-4">
        <div class="row justify-content-md-center">
          <div class="row">
            <div class="col-md-3">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons files_paper mx-auto iconSize"></i> <br> <h4>Políticas de garantía</h4> 
                </center>
                
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons files_box mx-auto iconSize"></i> <br> <h4>Despacho <br><br> </h4> 
                </center>
                
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons users_circle-08 mx-auto iconSize"></i> <br> <h4>Contacto <br><br> </h4> 
                </center>
                
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-border p-5">
                <center>
                  <i class="now-ui-icons business_money-coins mx-auto iconSize"></i> <br> <h4>Tipos de pago</h4> 
                </center>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container-fluid px-4">
        <div class="row justify-content-md-center">
            <h2 class="title text-center w-100">COMPRA POR CATEGORÍAS</h2>
            <div class="col-md-4 ">
              <card class="w-100 cursor-pointer categoryImg1" style="height:35vh;">
                <h4 class="text-right mt-5">Overoles para<br> caballeros</h4>
              </card>
            </div>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer" style="height:35vh;">
                <h4 class="text-right mt-5">Accesorios</h4>
              </card>
            </div>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer" style="height:35vh;">
                <h4 class="text-right mt-5">Overoles para<br> damas</h4>
              </card>
            </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container-fluid px-4">
        <div class="row justify-content-md-center">
            <h2 class="title text-center w-100">ULTIMOS PRODUCTOS</h2>
            <template>
              <tabs class="px-5 mx-5" type="primary">
                <tab-pane class="sectionBorderCategory" label="Overoles">
                  <div class="row container">
                    <div v-for="(product,index) in products" :key="product" class="col-md-4">
                      <card type="blog" plain>
                        <div class="p-3">
                          <img slot="image" class="img rounded img-raised" src="https://demos.creative-tim.com/vue-now-ui-kit-pro/img/project13.jpg">
                        </div>
                        
                        <div class="card-body">
                          
                          <h5 class="card-title">
                            <center>
                              <template>
                                <form class="row mx-auto borderBottom pb-0 mb-0">
                                  <div class="col-md-8 mx-auto">
                                    <rating class="mx-auto" :items="items" legend="" :value="value" @change="update"></rating>
                                  </div>
                                  <div class="col-md-4 mx-auto cursor-pointer">
                                    <i class="fa fa-comments mx-auto"></i> +12
                                  </div>
                                </form>
                                
                              </template>
                              <a href="#nuk">{{product.name}} </a> <br>
                              <n-button v-popover="'popover'+index" type="primary" outline round>
                                <i class="fa fa-cart-plus mr-2"></i> {{product.price}}
                              </n-button>
                              
                              <el-popover
                                :ref="'popover'+index"
                                popper-class="popover"
                                placement="bottom"
                                width="300"
                                trigger="hover"
                              >
                                <div class="popover-body text-center">
                                  Agregar al carrito
                                </div>
                              </el-popover>
                              
                            </center>
                            
                          </h5>
                        </div>
                      </card>
                    </div>
                  </div>
                  
                </tab-pane>
                <tab-pane label="Cascos">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, voluptatibus. Itaque eveniet, vel maxime accusantium repudiandae, assumenda vitae officiis commodi molestiae voluptatum a? Quas atque, doloribus magnam dolores eum eius.</p>
                  
                </tab-pane>
                <tab-pane label="Accesorios">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, possimus blanditiis. Ipsa vel nam in explicabo itaque! Corrupti quisquam quam, reprehenderit in repellat harum temporibus, obcaecati itaque dolor earum modi.</p>
                  
                </tab-pane>
              </tabs>
            </template>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container-fluid  px-4">
        <div class="row justify-content-md-center">
          <card class="card-nav-tabs text-center background-buy" header-classes="card-header-warning">
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8 pt-5">
                <h2 class="card-title mt-5">Echale un vistazo a nuestros productos de calidad</h2>
                <p class="card-text mt-5">Todo en apicultura.</p>
                <n-button type="primary">Comprar</n-button>
              </div>
              
            </div>
            
            
            
          </card>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container-fluid  px-4">
        <div class="row justify-content-md-center">
          <card class="card-nav-tabs text-center background-news" header-classes="card-header-warning">
            <div class="row">
              <div class="col-md-8 card-news py-5 mt-5">
                <h2 class="card-title mt-5">Mantente al tanto de nuestras promociones</h2>
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
import { Parallax, Card } from '@/components';
import { Carousel, CarouselItem } from 'element-ui';
import {FormGroupInput as FgInput} from '@/components'
import {Tabs, TabPane} from '@/components'
import Rating from 'vue-bulma-rating'
import AOS from 'aos';
import { Popover } from 'element-ui';
import 'aos/dist/aos.css'; // You can also use <link> for styles
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
    Tabs,
    TabPane,
    Rating,
    FgInput
  },
  data () {
    return {
      value: 4,
      items: [
        {
          title: '5 Stars',
          value: 5
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '1 Star',
          value: 1
        }
      ],
      products : [
        {
          name: 'overol para hombre',
          price: '$ 100,00'
        },
        {
          name: 'overol para mujer',
          price: '$ 150,00'
        },
        {
          name: 'accesorio',
          price: '$ 120,00'
        }
      ]
    }
  },
  created(){
    AOS.init();
  },
  methods: {
    update (val) {
      this.value = val
    }
  }
};
</script>
<style></style>
