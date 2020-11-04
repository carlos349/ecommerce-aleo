<template>
    <div style="margin-top:10em" class="container-fluid">
        
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <SfGallery
                        v-if="imgs.length >0"
                        :images="imgs"
                        :image-width="imageWidth"
                        :image-height="imageHeight"
                        :slider-options="sliderOptions"
                        :current="current"
                        :enable-zoom="enableZoom"
                    />
                </div>
                <div style="padding-left:25%" class="col-md-8">
                    <h3 >{{product.name}}</h3>
                    <div class="row">
                        <div class="float-left col-md-6" >
                            <SfPrice :regular="'$ '+formatPrice(product.price)" />
                        </div>
                        
                        <div class="col-md-6">
                            <SfRating :max="5" :score="2.5" :icon="'star'" />
                            <a v-on:click="openRev" href="#calificaciones">Leer comentarios</a> ( {{product.reviews.length}} )
                        </div>
                        
                    </div>
                    <SfProperty class="m-1 mt-2" :name="'Categoria'" :value="product.category" />
                    <!-- <SfProperty class="m-1 mt-2" :name="'Cantidad'" :value="product.quantity" /> -->
                    <SfDivider />
                    <h4>{{product.description}}</h4>
                    <SfDivider />
                    <h3 v-if="product.colors.length > 0">Selecciona un color</h3>
                    <div class="row">
                        <div v-for="(color,index) in product.colors" :key="index" v-on:click="selectColor(index,color)" v-bind:class="{'colorSelected':colorsArray[index].active}" :style="'background-color:'+color" class="col-md-1 m-1 colors"></div>
                    </div>
                    <div class="mt-5 row">
                        <div class="col-md-6">
                            <SfQuantitySelector
                                v-model="value"
                                aria-label="Quantity"
                                class="selectorQ"
                            />
                        </div>
                        <div v-on:click="pushCart()" class="col-md-6">
                            <SfButton  class="bShop cotiza">
                                Agregar a cotización
                            </SfButton>
                        </div>
                    </div>

                    
                </div>
                <div class="col-md-12">
                    <SfTabs
                        class="mt-5"
                        :open-tab="openTab"
                        :tabMaxContentHeight="tabMaxContentHeight"
                        :tabShowText="tabShowText"
                        :tabHideText="tabHideText"
                    >
                        <SfTab :title="'Especificaciones'">
                            <div class="row">
                                <div class="col-md-4" v-for="item in product.data" :key="item.id"><SfProperty class="m-1 mt-2" :name="item.name" :value="item.data" /></div>
                                
                            </div>
                        </SfTab>
                        <SfTab  :title="'Calificaciones ( '+product.reviews.length+' )'">
                            <div id="calificaciones" class="row pl-5">
                                <div class="col-md-6">
                                   <SfReview
                                        v-for="(review, index) in product.reviews"
                                        :key="index"
                                        :author="review.user"
                                        :date="review.date"
                                        :message="review.comment"
                                        :max-rating="5"
                                        :rating="review.rating"
                                        :char-limit="200"
                                        :read-more-text="'Leer mas'"
                                        :hide-full-text="'Leer menos'"
                                    /> 
                                </div>
                                <div class="col-md-6">
                                    <h3 class="fontTwo text-center">Califica el producto</h3>
                                    <rating :items="items" :value="valueRating" @change="update"></rating>
                                    <div class="col-12">
                                        <textarea name="" 
                                            class="form-control " 
                                            id="" 
                                            cols="30" 
                                            rows="10"
                                            placeholder="Mensaje" 
                                            v-model="message" 
                                        >
                                        </textarea>
                                    </div>
                                    <div v-on:click="makeReview()" class="col-md-6 mx-auto mt-5">
                                        <SfButton  class="bShop cotiza">
                                            Calificar
                                        </SfButton>
                                    </div>
                                </div>
                            </div>
                        </SfTab>
                    </SfTabs>
                </div>
            </div>
        </div>
        
        
    </div>
</template>
<script>
import { SfReview } from "@storefront-ui/vue";
import { SfTabs } from "@storefront-ui/vue";
import { SfButton } from "@storefront-ui/vue";
import { SfQuantitySelector } from "@storefront-ui/vue";
import { SfDivider } from "@storefront-ui/vue";
import { SfProperty } from "@storefront-ui/vue";
import { SfGallery } from "@storefront-ui/vue";
import { SfPrice } from "@storefront-ui/vue";
import { SfRating } from "@storefront-ui/vue";
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
import EventBus from "./components/eventBus"
import Rating from 'vue-bulma-rating'

export default {
    components: {
        SfReview,
        SfGallery,
        SfPrice,
        SfRating,
        SfProperty,
        SfDivider,
        SfQuantitySelector,
        SfButton,
        SfTabs,
        Rating
    },
    data(){
        return {
            openTab: 1,
            tabMaxContentHeight: "20rem",
            tabShowText: "Expandir",
            tabHideText: "Ocultar",
            value:1,
            current: 1,
            enableZoom: false,
            idProduct:this.$route.query.id,
            product:[],
            configHeader: {headers:{"x-database-connect":endPoint.dataBase}},
            imgs: [],
            images:[],
            imageWidth: 422,
            imageHeight: 664,
            sliderOptions: { autoplay: false, rewind: true, gap: 0 },
            colorsArray:[],
            colorSelected:'',
            valueRating:0,
            message:'',
            items: [
                {
                title: '5 Estrellas',
                value: 5
                },
                {
                title: '4 Estrellas',
                value: 4
                },
                {
                title: '3 Estrellas',
                value: 3
                },
                {
                title: '2 Estrellas',
                value: 2
                },
                {
                title: '1 Estrella',
                value: 1
                }
            ]
        }
    },
    created(){
        this.getProduct()
    },
    methods: {
        getProduct(){
            axios.get(endPoint.endpointTarget+'/products/'+this.idProduct,this.configHeader)
            .then(res => {
                this.product = res.data
                setTimeout(() => {
                    this.product.images.forEach((item) => this.imgs.push({alt: "imagen",mobile: { url: item.url },desktop: { url: item.url },zoom: { url: item.url}}))
                    this.product.colors.forEach((item) => this.colorsArray.push({active:false}))
                }, 500);
                
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        openRev(){
            var el = document.getElementsByClassName('sf-tabs__title');
            el[1].click();
            
        },
        emitMethod(){
            EventBus.$emit("addProduct", "products")
        },
        pushCart(){
            var validation = true
            var color = ''
            if (this.product.colors.length > 0) {
                
                if (this.colorSelected == '') {
                    color = this.product.colors[0]
                }
                else{
                    color = this.colorSelected
                } 
            }
            
            if (localStorage.cart) {
                const data = JSON.parse(localStorage.cart)
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (element.idProduct == this.product._id) {
                        element.qty = element.qty + this.value
                        localStorage.setItem("cart", JSON.stringify(data))
                        validation = false
                        break
                    }
                }
                if (validation) {
                    data.push({id:data.length,name:this.product.name,qty:this.value,image:this.product.images[0].url,idProduct:this.product._id,data:this.product.category,color:color})
                    localStorage.setItem("cart", JSON.stringify(data))
                }
            }
            else{
                localStorage.setItem("cart",JSON.stringify([{id:0,name:this.product.name,qty:this.value,image:this.product.images[0].url,idProduct:this.product._id,data:this.product.category,color:color}]))
            }
            console.log(localStorage.cart)
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
    selectColor(i,color){
        this.colorSelected = color    
        this.colorsArray.forEach((item) => item.active = false)
        this.colorsArray[i].active = true
    },
    update(val) {
      this.valueRating = val
    },
    makeReview(){
        if (localStorage.status && localStorage.status == "log-in") {
            if (this.valueRating > 0 && this.message != '') {
                axios.put(endPoint.endpointTarget+'/products/addComment/'+this.product._id,{
                    rating:this.valueRating,
                    user:localStorage.clientName + " " + localStorage.clientlastName,
                    comment: this.message
                },this.configHeader)
                .then(res => {
                    if (res.data.status == "product commented") {
                        this.$swal({
                            type: 'success',
                            icon: 'success',
                            toast: true,
                            position: 'top-end',
                            timer: 3000,
                            timerProgressBar: true,
                            title: 'Producto calificado',
                            showConfirmButton: false,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        this.getProduct()
                        this.message = ''
                        this.valueRating = 1 
                    }
                    else{
                        this.$swal({
                            type: 'error',
                            icon: 'error',
                            title: 'Problemas de conexión',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
            else{
                this.$swal({
                    type: 'error',
                    icon: 'error',
                    title: 'Debes llenar todos los datos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
        else{
            this.$swal({
                        type: 'error',
                        icon: 'error',
                        title: 'Debes ingresar para poder calificar un producto',
                        showConfirmButton: false,
                        timer: 2500
                    })
        }
    }
}}
</script>
<style lang="scss">
    .sf-gallery__thumbs{
        max-height: 600px;
        overflow-y: scroll;
    }
    .bShop{
        background-color: #42210B;
    }
    .selectorQ{
        background-color: #FFCB05;
        color: #42210B
    }
    
    .sf-rating__icon--negative {
        --icon-color: #8d8f9a !important;
    }
    .sf-rating__icon {
        --icon-color: #FFCB05;
    }
    .cotiza  {
        background:#42210B ;
    }
    .colors{
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        
    }
    .colorSelected{
        -webkit-box-shadow: 0px 3px 21px 4px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 3px 21px 4px rgba(0,0,0,0.75);
        box-shadow: 0px 3px 21px 4px rgba(0,0,0,0.75);
    }
</style>