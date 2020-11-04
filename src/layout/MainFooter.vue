<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
  <div class="wsPos">
    <a href="https://wa.me/56972628949" target="_blank">
      <img style="width:8%" src="img/ws.png" alt="">
    </a>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h5 class="fontTwo"  style="color: black;font-weight:400;">Creaciones apícolas ALEO</h5>
        <p style="color:black">Seguridad y Confianza.</p>
        <ul class="ftco-footer-social float-lft list-unstyled">
          <li>
            <a href="https://www.facebook.com/kkprettynails" target="_blank">
              <span style="left: 40%;margin-left: 20%;" class="fab fa-facebook-f span-socials"></span>
            </a>
          </li>
          <li class="ml-3">
            <a href="https://www.instagram.com/kkprettynails/?hl=es-la" target="_blank">
              <span style="left: 33%;margin-left: 20%;" class="fab fa-instagram span-socials"></span>
            </a>
          </li>
          <li class="ml-3">
            <a href="https://www.youtube.com/channel/UCg9tufEPhKadP4JM-GiDNNQ" target="_blank">
              <span style="left: 25%;margin-left: 20%;" class="fab fa-whatsapp span-socials"></span>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <h5  style="color: black;font-weight:700;">Enlaces populares</h5>
        <ul class="list-unstyled linksFooter fast-links" style="display:block;font-size:17px">
          <li class="w-100">
            <router-link to="/nosotros">
              <a href="#destacados">Destacados</a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <h5   style="color: black;font-weight:700;">Enlaces rápidos</h5>
        <ul class="list-unstyled linksFooter fast-links" style="display:block;font-size:17px">
          <li class="w-100">
            <router-link to="/nosotros">
              <a href="">Nosotros</a>
            </router-link>
          </li>
          <li class="w-100">
            <router-link to="/products">
              <a href="">Tienda</a>
            </router-link>
            
          </li>
          <!-- <li class="w-100">
            <router-link to="/galeria">
              <a href="">Galería</a>
            </router-link>
            
          </li> -->
          <li class="w-100">
            <router-link to="/contacto">
              <a href="">Contacto</a>
            </router-link>
            
          </li>
        </ul>
      </div>
      <div class="col-md-3 p-0">
        <h5 style="color: black;font-weight:700;">Contáctanos</h5>
        <ul class="list-unstyled fast-links" style="display:block">
          <li class="w-100">
            <i class="fa fa-map-marker-alt" style="color:black;font-size:16px;margin-right:10px;"></i>
            <a href="https://goo.gl/maps/GhvcDBH1ppBDae1KA" target="_blank">Av. Pedro de Valdivia 3474 Caracol Ñuñoa, Local 53-B Ñuñoa, Chile</a>
          </li>
          <li class="w-100">
            <i class="fab fa-whatsapp" style="color:black;font-size:16px;margin-right:10px;"></i>
            <a href="https://wa.me/56972628949" target="_blank">+57 317 4635202</a>
          </li>
          <li class="w-100">
            <i class="fa fa-envelope" style="color:black;font-size:11px;"></i>
            <a href="mailto:creacionesapicolasaleo@gmail.com" target="_blank">creacionesapicolasaleo@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright-center w-100 mt-5 mb-4">
      <center>
        <p style="color:black;width:auto" class="mx-auto">Copyright ©{{ year }} Todos los derechos reservados | Desarrollado por <a href="https://syswa.net" target="_blank" style="color:black;">SYSWA</a></p>.
      </center>
    </div>
  </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
  .footer{
    
    background-color: #ffcb05!important;
    color:#42210B
  }
  footer ul li a{
    font-size: 16px !important;
    color:#42210B !important
  }
  .ftco-footer-social li a {
    height: 40px;
    width: 40px;
    display: block;
    font-size: 19px !important;
    background: #42210B;
    border-radius: 50%;
    
    color: #ffcb05 !important;
}
.wsPos{
  bottom: 2%;
  position: fixed;
  z-index: 100;
}

</style>
