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
      <div class="container-fluid px-4">
        <div class="row justify-content-md-center">
            <h2 class="title text-center w-100">COMPRA POR CATEGORÍAS</h2>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer" style="height:35vh;">
                <h4 class="text-right">Indumentaria para<br> hombres</h4>
              </card>
            </div>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer" style="height:35vh;">
                <h4 class="text-right">Coleccíon de <br> cascos</h4>
              </card>
            </div>
            <div class="col-md-4">
              <card class="w-100 cursor-pointer" style="height:35vh;">
                <h4 class="text-right">Indumentaria para<br> mujer</h4>
              </card>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax, Card } from '@/components';
import { Carousel, CarouselItem } from 'element-ui';
import AOS from 'aos';
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
    [Button.name]: Button,
    Card
  },
  created(){
    AOS.init();
  }
};
</script>
<style></style>
