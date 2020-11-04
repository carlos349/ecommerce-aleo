<template>
    <div>
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