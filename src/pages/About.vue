<template>
    <div>
        <div class="page-header page-header-small">
            <parallax
                class="page-header-image"
                style="background-image:url('img/bg_4.png');"
            >
            </parallax>
            <div class="container">
                <h2 style="display:inline-block;color:#000;font-family: 'Prata', serif;font-weight:600;letter-spacing:.2em;margin-top:100px;">NOSOTROS</h2>
            </div>
        </div>
        <div id="nosotros">
            <abouut-section></abouut-section>
        </div>
        
       
    </div>
</template>
<script>
import abouutSection from './components/abouutSection';

import AOS from 'aos'
import 'aos/dist/aos.css'


export default {
    components: {
        abouutSection
    },
    data(){
        return {

        }
    },
    created () {
        AOS.init()
    },
    
}
  
</script>