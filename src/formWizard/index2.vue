<template>
  <form-wizard @on-complete="onComplete">
     <tab-content title="Personal details"
                  icon="ti-user">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
 </form-wizard>

</template>

<script>
  
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>