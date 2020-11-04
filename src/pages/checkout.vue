<template>
  <div>
    <div style="margin-top:10em">
      <h1 class="text-center">Pago de producto(s)</h1>
      
    </div>
    <div class="container">
        <div class="row">
            <div  class="col-md-8 p-3">
                <h3>Detalles de facturación</h3>
                <SfDivider />
                <div class="row">
                    <div class="col-md-6">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[0].data" disabled placeholder="Primer nombre">
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[1].data" disabled placeholder="Apellido"></fg-input>
                    </div>
                    <div class="col-md-12">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[2].data" placeholder="Nombre de la empresa"></fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[3].data" placeholder="Número de teléfono"></fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[4].data" disabled placeholder="Correo electrónico"></fg-input>
                    </div>
                    <div class="col-md-12">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[5].data" placeholder="País"></fg-input>
                    </div>
                    <div class="col-md-12">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[6].data" placeholder="Dirección 1"></fg-input>
                    </div>
                    <div class="col-md-12">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[7].data" placeholder="Dirección 2"></fg-input>
                    </div>
                    <div class="col-md-12">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[8].data" placeholder="Ciudad"></fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[9].data" placeholder="Distrito"></fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input class="no-border form-control-lg" v-model="dataClient[10].data" placeholder="Codigo postal"></fg-input>
                    </div>
                    <h4 class="mt-2 p-3">Detalles de la cotización</h4>

                    <div class="col-md-12">
                        <textarea style="height:200px" v-model="dataClient[11].data" class="no-border form-control-lg w-100" name="w3review" rows="3">
                            
                        </textarea>
                    </div>

                </div>
            </div>

            <modal :show.sync="modals.notice"
                footer-classes="justify-content-center"
                type="notice">
              <h5 slot="header" class="modal-title">Terminos y condiciones</h5>
              <template>
                <div class="instruction">
                  <div class="row">
                    <div class="col-md-8">
                      <strong>1. Register</strong>
                      <p class="description">The first step is to create an account at <a
                        href="http://www.creative-tim.com/">Creative Tim</a>. You can choose a social network or
                        go for the classic version, whatever works best for you.</p>
                    </div>
                    <div class="col-md-4">
                      <div class="picture">
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="instruction">
                  <div class="row">
                    <div class="col-md-8">
                      <strong>2. Apply</strong>
                      <p class="description">The first step is to create an account at <a
                        href="http://www.creative-tim.com/">Creative Tim</a>. You can choose a social network or
                        go for the classic version, whatever works best for you.</p>
                    </div>
                    <div class="col-md-4">
                      <div class="picture">
                        
                      </div>
                    </div>
                  </div>
                </div>
                <p>If you have more questions, don't hesitate to contact us or send us a tweet @creativetim. We're
                  here to help!</p>
              </template>
              <div slot="footer" class="justify-content-center">
                <n-button type="primary" round @click.native="modals.notice = false">¡Entendido!</n-button>
              </div>
            </modal>
            <div class="col-md-4 p-0">
                <div style="background-color:#f9f9f9;border-radius:5px" class="p-3">
                    <h3 class="text-center">Su pedido</h3>
                    
                    <SfDivider />
                     <SfGroupedProduct
                        v-for="prod in products" :key="prod.id"
                        :settings="settings"
                        :has-carousel="hasCarousel"
                        :style="{ maxWidth: '500px' }"
                    >
                        <SfGroupedProductItem
                        :qty="prod.qty"
                        @input="prod.qty = $event, chageQty()"
                        :image="prod.image"
                        :image-width="imageWidth"
                        :image-height="imageHeight"
                        :image-lazy="imageLazy"
                        :title="prod.name"
                        :price-regular="''"
                        :price-special="''"
                        >
                        <template #details>
                            
                        
                        </template>
                        </SfGroupedProductItem>
                    </SfGroupedProduct>
                    
                    <br>
                      <card style="width: 20rem;">
                          <h4 style="margin-top:0" class="card-title">Tipo de pago</h4>
                          <h6 class="card-subtitle mb-2 text-muted">Una vez aprobada la cotización y comprometida la fecha de entrega, se realiza el pago por consignación a cuentas Bancolombia, Nequi o Efecty. Posteriormente se envía el producto.</h6>
                          
                      </card>
                    
                    <br>
                    <n-checkbox  v-model="checks.check2">He leído y acepto los <a @click="modals.notice = true">Términos y condiciones</a> </n-checkbox>
                    <center>
                        <n-button class="w-75 mt-4" v-on:click="addQuotation()" type="primary">Cotizar</n-button>
                    </center>
                    
                    
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
import {FormGroupInput as FgInput} from '@/components'
import { SfDivider } from "@storefront-ui/vue";
import {Checkbox} from '@/components'
import {Button} from '@/components'
import {Card} from '@/components'
import { SfGroupedProduct } from "@storefront-ui/vue";
import EventBus from "./components/eventBus"
import {Modal} from '@/components'

export default {
  components: {
    FgInput,
    SfDivider,
    SfGroupedProduct,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    Card,
    Modal
  },
  data() {
    return {
      modals:{
        notice:false
      },
      checks:{
          check1:false,
          check2:false
      },
      dataClient:[
          {
            name:"Nombre",
            data:localStorage.clientName
          },
          {
            name:"Apellido",
            data:localStorage.clientlastName  
          },
          {
            name:"Empresa",
            data:''
          },
          {
            name:"Teléfono",
            data:""  
          },
          {
            name:"Correo",
            data:localStorage.clientMail  
          },
          {
            name:"País",
            data:""  
          },
          {
            name:"Dirección 1",
            data:""  
          },
          {
            name:"Dirección 2",
            data:""  
          },
          {
            name:"Ciudad",
            data:""  
          },
          {
            name:"Distrito",
            data:""  
          },
          {
            name:"Codigo postal",
            data:""  
          },
          {
            name:"description",
            data:""  
          }
          
      ],
      products:[],
      settings: { type: "slider" },
      hasCarousel: false,
      imageWidth: 328,
      imageHeight: 448,
      imageLazy: true,
      configHeader: {headers:{"x-database-connect":endPoint.dataBase}},
    }
    
  },
  created(){
       this.getCart() 
        
    },
    methods: {
        getCart(){
          if (localStorage.cart) {
            this.products = JSON.parse(localStorage.cart)
          }
        },
        emitMethod(){
            EventBus.$emit("addProduct", "products")
        },
        chageQty(){
          localStorage.setItem("cart", JSON.stringify(this.products))
          this.emitMethod()
        },
        addQuotation(){
          var valid = true
          for (let i = 0; i < this.dataClient.length; i++) {
            const element = this.dataClient[i];
            if (element.data == '') {
              console.log("entre")
              this.$swal({
                  type: 'error',
                  icon: 'error',
                  timer: 2000,
                  timerProgressBar: true,
                  title: '¡Debes completar todos los datos!',
                  showConfirmButton: false,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })
              valid = false
              break
            }
          }
          if(valid && this.checks.check2 == false){
            this.$swal({
                type: 'error',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                title: 'Debes aceptar los terminos y condiciones',
                showConfirmButton: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            valid = false
          }
          if (valid && this.checks.check2 == true) {
            axios.post(endPoint.endpointTarget+'/quotations',{
                products:JSON.parse(localStorage.cart),
                dataClient:this.dataClient,
            },this.configHeader)
            .then(res => {

                if (res.data.status == 'Quotation create') {
                    this.$swal({
                        type: 'success',
                        icon: 'success',
                        timerProgressBar: true,
                        title: '¡Listo! En un plazo de 24 horas enviaremos la cotización a tu correo electrónico. Para más información puedes comunicarte al \n +57 317 4635202',
                        showConfirmButton: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    localStorage.setItem('userToken', res.data.token)
                    localStorage.removeItem("cart")
                    this.emitMethod()
                    router.push("/")
                }
                else{
                  this.$swal({
                        type: 'error',
                        icon: 'error',
                        timer: 3000,
                        timerProgressBar: true,
                        title: 'Problemas de conexión',
                        showConfirmButton: false,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                }
            })
          }
          
          
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
    ::-webkit-input-placeholder { color: red; } 
</style>