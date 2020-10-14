<template>
  <div class="password">
    <h1>{{ msg }}</h1>
    <p>
      How secure is your password?
    </p>
    <div>
      <label for="showhide">Show password: </label>
      <input type="checkbox" id="showhide" v-model="showInput">
    </div>
    <div class="complexity" :class="'s-' + strength">
      <input :type="showInput ? 'text' : 'password'" @input="checkStrength($event)" placeholder="Type a password" v-model="form.password">
      <span class="strength">{{strength | formatStrength}}</span>
    </div>
    <p>{{warning}}</p>
    <p>{{suggestions}}</p>
    <footer>
      <a href="https://github.com/AfricTivistes/pass-estimator">Get source</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Password',
  props: {
    msg: String
  },
  data() {
    return{
      form:{password:""},
      showInput: false,
      password:"",
      strength:null,
      warning:null,
      suggestions:null
    }
  },
  methods: {
    checkStrength(event){
      if(event.target.value){
        let strength = this.$zxcvbn(event.target.value)
        this.strength = strength.score
        this.warning = strength.feedback.warning
        this.suggestions = strength.feedback.suggestions[0]
      }else{
        this.strength = null
      }
    }
  },
  filters: {
    formatStrength: function (value) {
      if (value!=null) {
        if(value==0){
          return "Very Weak"
        } else if(value == 1){
          return "Weak"
        } else if(value == 2){
          return "Medium"
        } else if(value == 3){
          return "Strong"
        } else if(value == 4){
          return "Very Strong"
        }
      }else{
        return 'No Password'
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}

.complexity{
    width: 313px;
    margin: 0 auto;
    position: relative;
    left: 0px;
    font-weight: bold;
    padding: 5px;
    padding-bottom: 10px;
    margin-top: 10px;
    cursor: default;
    color: white;
    text-align: center;
}

.s-null{
    background-color: #D0D0D0;
}

.s-0{
    background-color: rgb(228, 8, 8);
}

.s-1{
    background-color: rgb(255, 157, 0);
}

.s-2{
    background-color: rgb(255, 216, 0);
}

.s-3{
    background-color: rgb(44, 177, 23);
}

.s-4{
    background-color: rgb(32, 124, 2);
}

.complexity input{
  height: 40px;
  width: 99%;
  font-size: x-large;
  font-weight: bold;
  background: white;
  border: none;
}

.complexity .strength{
  display: block;
  margin-top:10px;
}

a{
  color: darkgray;
  text-decoration: none;
}

footer{
    bottom: 0;
    position: fixed;
    width: 100%;
    padding-bottom: 10px;
}

</style>
