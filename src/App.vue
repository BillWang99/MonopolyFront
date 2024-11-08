<script setup>
  import HeaderElm from './components/HeaderElm.vue'
  import FooterElm from './components/FooterElm.vue'
</script>

<template>
  <div class="area">
    <header>
      <HeaderElm/>
    </header>

    <main>
      <RouterView />
    </main>


    <footer>
      <FooterElm/>
    </footer>
  </div>
</template>

<style scoped>
.area { 
  display: flex;
  flex-direction: column; 
  min-height: 100vh; 
  margin: 0; 
} 

main { 
  flex: 1; 
}
 
footer { 
  background-color: rgb(72, 85, 89); 
  color: white; 
  text-align: center; 
  padding: 1rem; 
}
</style>
