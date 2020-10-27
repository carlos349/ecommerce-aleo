<template>
  <div>
    <div style="margin-top:10em">
      <h1 class="text-center">Productos</h1>
      
    </div>
    <div class="container">
        <div class="row">
            <div  class="col-md-3 p-3 border-category">
                <div >
                    <h3>Categorias</h3>
                    <SfFilter
                        :label="'Todas'"
                        :count="products.length"
                        :selected="selected"
                        :color="color"
                        @change="selected = true, changeCategory('todos', true, null)"
                        style="max-width: 22.875rem;"
                    />
                   <SfFilter
                        v-for="(category, i) in categories" :key="category._id"
                        
                        :label="category.name"
                        :count="category.count"
                        :selected="category.selected"
                        :color="color"
                        @change="category.selected = !category.selected, changeCategory(category.name,category.selected,i)"
                        style="max-width: 22.875rem;"
                    />
                    
                </div>
            </div>
            <div class="col-md-9">
                <div class="row mx-auto">
                    <div class="col-md-3 mx-auto border-category">
                        <SfComponentSelect
                                v-model="select1.selected"
                                :class="select1.customClass"
                                :label="select1.label"
                                :size="select1.size"
                                :required="select1.required"
                                :valid="select1.valid"
                                :disabled="select1.disabled"
                                :error-message="select1.errorMessage"
                                :persistent="select1.persistent"
                                style="max-width: 30rem;"
                            >
                            <SfComponentSelectOption
                            v-for="(option, key) in select1.options"
                            :key="key"
                            :value="option.value"
                            >
                            <SfProductOption
                                :color="option.color"
                                :label="option.label"
                            ></SfProductOption>
                            </SfComponentSelectOption>
                        </SfComponentSelect>
                    </div>
                    <div class="col-md-3 mx-auto border-category">
                        <SfComponentSelect
                                v-model="select1.selected"
                                :class="select1.customClass"
                                :label="select1.label"
                                :size="select1.size"
                                :required="select1.required"
                                :valid="select1.valid"
                                :disabled="select1.disabled"
                                :error-message="select1.errorMessage"
                                :persistent="select1.persistent"
                                style="max-width: 30rem;"
                            >
                            <SfComponentSelectOption
                            v-for="(option, key) in select1.options"
                            :key="key"
                            :value="option.value"
                            >
                            <SfProductOption
                                :color="option.color"
                                :label="option.label"
                            ></SfProductOption>
                            </SfComponentSelectOption>
                        </SfComponentSelect>
                    </div>
                    <div class="col-md-3 mx-auto border-category">
                        <SfComponentSelect
                                v-model="select1.selected"
                                :class="select1.customClass"
                                :label="select1.label"
                                :size="select1.size"
                                :required="select1.required"
                                :valid="select1.valid"
                                :disabled="select1.disabled"
                                :error-message="select1.errorMessage"
                                :persistent="select1.persistent"
                                style="max-width: 30rem;"
                            >
                            <SfComponentSelectOption
                            v-for="(option, key) in select1.options"
                            :key="key"
                            :value="option.value"
                            >
                            <SfProductOption
                                :color="option.color"
                                :label="option.label"
                            ></SfProductOption>
                            </SfComponentSelectOption>
                        </SfComponentSelect>
                    </div>
                </div>
                <div class="row pl-4 mx-auto pt-4">
                    <SfProductCard
                        v-for="(prod, index) in actualProducts"
                        :key="prod._id"
                        class="mx-auto"
                        :image="prod.images[0].url"
                        :image-width="product.imageWidth"
                        :image-height="product.imageHeight"
                        :badge-label="product.badgeLabel"
                        :badge-color="product.badgeColor"
                        :title="prod.name"
                        :link="product.link+prod._id"
                        :link-tag="product.link+prod._id"
                        :score-rating="product.scoreRating"
                        :max-rating="product.maxRating"
                        :reviews-count="product.reviewsCount"
                        :regular-price="'$ '+formatPrice(prod.price)"
                        :special-price="product.specialPrice"
                        :wishlist-icon="product.wishlistIcon"
                        :is-on-wishlist-icon="product.isOnWishlistIcon"
                        :is-on-wishlist="product.isOnWishlist"
                        :show-add-to-cart-button="product.showAddToCartButton"
                        :add-to-cart-disabled="product.addToCartDisabled"
                        :is-added-to-cart="product.isAddedToCart"
                        @click:is-added-to-cart="alert('@click:is-added-to-cart')"
                        @click:wishlist="alert('@click:wishlist')"
                        @click:add-to-cart="pushCart(index)"
                        @click:reviews="alert('@click:reviews')"
                    />
                </div>
                
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
import { SfFilter } from "@storefront-ui/vue";
import { SfComponentSelect } from "@storefront-ui/vue";
import { SfProductOption } from "@storefront-ui/vue";
import { SfProductCard } from "@storefront-ui/vue";
import EventBus from "./components/eventBus"

export default {
  components: {
    SfFilter,
    SfComponentSelect,
    SfProductOption,
    SfProductCard
  },
  data() {
    return {
      configHeader: {headers:{"x-database-connect":endPoint.dataBase}},
      categories:[],
      selected: true,
      label: "Red",
      color: "",
      select1:{
        options: [
            { value: "amaranth", color: "#E52B50", label: "Amaranth" },
            { value: "amber", color: "#FFBF00", label: "Amber" },
            { value: "arctic-lime", color: "#D0FF14", label: "Arctic lime" },
            { value: "bluetiful", color: "#3C69E7", label: "Bluetiful" },
            { value: "buff", color: "#F0DC82", label: "Buff" },
        ],
        label: "Color",
        size: 5,
        required: false,
        valid: true,
        disabled: false,
        errorMessage: "Color",
        persistent: false,
      },
      products:[],
      actualProducts:[],
      product:{
          image: {
                mobile: { url: "https://storybook.storefrontui.io/assets/storybook/Home/productB.jpg" },
                desktop: { url: "https://storybook.storefrontui.io/assets/storybook/Home/productB.jpg" },
            },
            imageWidth: 216,
            imageHeight: 326,
            badgeLabel: "",
            badgeColor: "color-primary",
            title: "Cotton Sweater",
            link: 'http://pruebasyswahosting2.tk/#/producto?id=',
            linkTag: "",
            scoreRating: 4.5,
            maxRating: 5,
            reviewsCount: 7,
            regularPrice: "$10.99",
            specialPrice: "",
            wishlistIcon: "",
            isOnWishlistIcon: "heart_fill",
            isOnWishlist: false,
            showAddToCartButton: true,
            isAddedToCart: false,
            addToCartDisabled: false,
            }
    }
    
  },
  created(){
        
        this.getCategories()
        this.getProducts()
    },
    methods: {
        
        getCategories(){
            axios.get(endPoint.endpointTarget+'/categories',this.configHeader)
            .then(res => {
                if (res.data.length != 0) {
                    this.categories = res.data 
                    
                }
                this.categories.forEach((item) => item.push({selected:false}))
                
            })
        },
        emitMethod(){
            EventBus.$emit("addProduct", "products")
        },
        getProducts(){
            axios.get(endPoint.endpointTarget+'/products',this.configHeader)
            .then(res => {
                if (res.data.length != 0) {
                    this.products = res.data 
                    this.actualProducts = res.data
                }
                
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        changeCategory(name,active,i){
            this.actualProducts = []
            if (name == 'todos' ) {
                this.getCategories()
                this.actualProducts = this.products
                this.selected = true
            }
            if (active == false && name != 'todos') {
                this.actualProducts = this.products
                this.selected = true
            }
            if(active == true && name != 'todos'){
                this.getCategories()
                setTimeout(() => {
                   this.categories[i].selected = true
                    for (let i = 0; i < this.products.length; i++) {
                        const element = this.products[i];
                        if (element.category == name) {
                            this.actualProducts.push(element)
                        }
                    }
                    this.selected = false 
                }, 200);
                
            }
        },
        pushCart(i){
            if (localStorage.cart) {
                const data = JSON.parse(localStorage.cart)
                data.push({id:data.length,name:this.actualProducts[i].name,qty:1,image:this.actualProducts[i].images[0].url})
                localStorage.setItem("cart", JSON.stringify(data))
            }
            else{
                localStorage.setItem("cart",JSON.stringify([{id:0,name:this.actualProducts[i].name,qty:1,image:this.actualProducts[i].images[0].url}]))
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
        }

    }
    
};
</script>
<style>
    .border-category{
        border:1px solid #80808033;
    }
    .sf-component-select {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: var(--component-select-width);
        height: var(--component-select-height);
        padding: 0 !important;
        color: var(--component-select-color, var(--c-text));
        cursor: default;
    }
    .sf-component-select__error-message{
        display: none;
    }
    .sf-component-select__selected {
        --product-option-font-size: var(--font-size--lg);
        --component-select-option-font-size: var(--font-size--lg);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: var(--component-select-selected-align-items, center);
        -ms-flex-align: var(--component-select-selected-align-items, center);
        align-items: var(--component-select-selected-align-items, center);
        -webkit-box-pack: var(--component-select-selected-justify-content, flex-start);
        -ms-flex-pack: var(--component-select-selected-justify-content, flex-start);
        justify-content: var(--component-select-selected-justify-content, flex-start);
        padding: var(--component-select-selected-padding, var(--spacer-sm) var(--spacer-lg) var(--spacer-xs) 0);
        margin:0 !important;
        background: var(--component-select-background);
        color: var(--component-select-color, var(--c-text));
        border: var(--component-select-border, var(--component-select-border-style, solid) var(--component-select-border-color, transparent));
        border-width: var(--component-select-border-width, 0);
    }
    .sf-circle-icon {
        background-color: #42210B;
        margin-bottom: 6% ;
    }
    .sf-rating__icon {
        --icon-color: #FFCB05;
    }
</style>