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
                    <SfProperty class="m-1 mt-2" :name="'Cantidad'" :value="product.quantity" />
                    <SfDivider />
                    <h4>{{product.description}}</h4>
                    
                    <div class="mt-5 row">
                        <div class="col-md-6">
                            <SfQuantitySelector
                                v-model="value"
                                aria-label="Quantity"
                                class="selectorQ"
                            />
                        </div>
                        <div class="col-md-6">
                            <SfButton class="bShop">
                                Agregar cotización
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
                                <SfReview
                                    v-for="(review, index) in product.reviews"
                                    :key="index"
                                    :author="review.name"
                                    :date="review.date"
                                    :message="review.message"
                                    :max-rating="5"
                                    :rating="review.rating"
                                    :char-limit="200"
                                    :read-more-text="'Leer mas'"
                                    :hide-full-text="'Leer menos'"
                                />
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
        SfTabs
    },
    data(){
        return {
            openTab: 1,
            tabMaxContentHeight: "8.25rem",
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
            
        }
    }
}
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
</style>