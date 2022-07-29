<template>
  <div class="content">
    <template v-if="isNewForm === '/category/new'">
      <AddCategoryForm></AddCategoryForm>
    </template>
    <template v-else>
      <EditCategoryForm></EditCategoryForm>
    </template>
  </div>
</template>
<script>
  import EditCategoryForm from './EditCategoryForm'
  import AddCategoryForm from './AddCategoryForm'

  export default {
    data() {
      return {
        isNewForm: null,
      }
    },
    components: {
      EditCategoryForm,
      AddCategoryForm
    },
    created() {
      this.isNewForm = this.$route.fullPath;
    }
  }

</script>
<style>

</style>
