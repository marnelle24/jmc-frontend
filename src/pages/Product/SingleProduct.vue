<template>
  <div class="content">
    <template v-if="isNewForm === '/product/new'">
      <AddProductForm></AddProductForm>
    </template>
    <template v-else>
      <EditProductForm></EditProductForm>
    </template>
  </div>
</template>
<script>
  import EditProductForm from './EditProductForm'
  import AddProductForm from './AddProductForm'

  export default {
    data() {
      return {
        isNewForm: null,
      }
    },
    components: {
      EditProductForm,
      AddProductForm
    },
    created() {
      this.isNewForm = this.$route.fullPath;
    }
  }

</script>
<style>

</style>
