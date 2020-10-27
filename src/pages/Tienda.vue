<template>
  <div>
    <div class="mt-5">
      <h1>Coño e la madre</h1>
      <SfHeading
        :class="customClass"
        :level="3"
        :title="Tienda"
        :description="''"
      />
    </div>
    
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue";
export default {
  components: {
    SfHeading
  },
  data() {
    return {
      
    };
  }
};
</script>
<style></style>
