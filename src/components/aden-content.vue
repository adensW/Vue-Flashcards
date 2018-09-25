<template>
     <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
        <textarea v-model="value"
          name="input-7-1"
          label="Default style"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Hint text"
        ></textarea>
         asda
        </v-flex>
        <v-flex xs12>
         asdas
        </v-flex>
        <v-flex xs12>
         asd
        </v-flex>
        <v-flex xs12>
         asd
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'aden-content',
    data(){ return {
        name:"",
        value:"啊实打实的",
        label:"",
        hint:""
        }
    }
}
</script>
<style>

</style>
