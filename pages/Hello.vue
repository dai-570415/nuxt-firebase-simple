<template>
  <div class="hello">
    <h1>Hello {{ name }}!!</h1>
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Hello',
  data () {
    return {
      name: firebase.auth().currentUser.email,
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/Signin');
      })
    }
  }
}
</script>

<style scoped>

</style>