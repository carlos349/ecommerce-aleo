<template>
  <div class="section estePs" style="background-image: url('img/intro.png');margin-top:-170px;background-repeat:no-repeat">
    <div style="margin-top: 14rem !important;" class="container">
      <h2 class="fontTwo text-center text-white col-4 mx-auto bgLetters" style="letter-spacing:.2em;margin-top:100px;">NOSOTROS</h2>
        <div class="row justify-content-end">
          <div class="col-md-6 text-white bgLetters">
            <br><br>
            <h2 data-aos="fade-up" class="opacity-cero titlesPrada">Creaciones apicolas aleo</h2>
            <p data-aos="fade-up" class="textparra-color" style="line-height: 1.6;" >
            Somos una empresa dedicada a la fabricación de overoles apícolas, con amplia experiencia en el área. 
            <br><br>
            Iniciamos originalmente en Perú, en la ciudad de Lima fabricando overoles apícolas e indumentaria apícola en material de acero inoxidable y galvanizado, productos como ahumadores, centrifugas de 3 y 4 marcos, filtros de acero, recuperadoras de miel en acero, entre otros.
            <br><br>
            Posteriormente decidimos establecernos aquí en Colombia iniciando con la confección de overoles apícolas en diferentes tipos de careta como tipo esgrima o sombreros flexibles y 360°.
            <br>  <br>
            Guantes apícolas, caretas simples y chaquetas apícolas. Próximamente incluiremos productos fabricados en material de acero inoxidable y galvanizado para completar toda la indumentario del apicultor. 
            <br><br>
            Los valores que nos definen como empresa son:
            </p>
            <p data-aos="fade-up" class="items-about mt-4"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Eficiencia </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Empatía </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Amabilidad </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Profesionalismo </p>
            <p data-aos="fade-up" class="items-about"><i class="now-ui-icons ui-1_check" style="margin-right:10px;"></i> Responsabilidad </p>
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
<style >
.bgLetters{
  background-color: #5b1c0096;
  border-radius: 5px;
}
</style>
