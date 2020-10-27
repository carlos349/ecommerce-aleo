<template>
  <div class="section estePs" style="background-image: url('img/intro.jpg');margin-top:-170px;">
    <div class="container">
        <div class="row justify-content-end">
          <div class="col-md-6">
            <h2 data-aos="fade-up" class="opacity-cero titlesPrada">K&K PRETTY NAILS</h2>
            <p data-aos="fade-up" class="textparra-color" style="line-height: 1.6;" >
            Lo que comenzó como un hobby se fue convirtiendo en una profesión para nuestra fundadora Katriel Capacho, por lo que el 24 de abril de 2019 decidimos llevar esto al siguiente nivel creando un local en el cual nos dedicamos no sólo al embellecimiento de las uñas sino al cuidado de ellas.
            <br><br>
            Desde el principio nuestra prioridad es que tu visita a nuestro establecimiento sea una experiencia agradable y única, con atención personalizada y asesorías en el bienestar de tus uñas, y es que más allá de la belleza que consigas en el mantenimiento mensual, es fundamental el cuidado para que se conserven sanas y fuertes.
            <br><br>
            Nuestro estándar de calidad lo medimos en base al resultado del servicio, donde el trabajo y atención sea lo más importante.
            <br>  <br>
            Cuidamos cada detalle minuciosamente desde la atención al cliente hasta los servicios y que la experiencia sea inolvidable para cada una de ustedes.
            <br><br>
            Es por esto y muchas razones más que en K&K Pretty Nails hacemos nuestro trabajo con cariño y buscamos cada día profesionalizar más y garantizar que cada minuto en nuestro local sea satisfactorio.
            </p>
            <p data-aos="fade-up" class="items-about mt-5"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Perfeccionismo </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Empatía </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Amabilidad </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Profesionalismo </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Eficacia </p>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from '@/components';

export default {
    components: {
        [Button.name]: Button
    },
    created () {
        AOS.init()
    }
};
</script>
