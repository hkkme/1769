<template>
  <div class="simple-sign-up">

    <input
      placeholder="test"
      @input="inputChange"
      type="text"
    />

    <button @click="submitForm">button</button>
  </div>
</template>

<script>
  export default {
    name: 'testform',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        formval: 'null',
        emailNotValid: 'testing',
        message: null,
        messageColor: null,
      }
    },
    methods: {
      inputChange(event) {
        // this.formval = event.target.value;
        console.log(event.target.value)
      },
      submitForm() {


      fetch('/.netlify/functions/formhandler', {
          method: 'post',
          body: JSON.stringify({
            testval: this.formval
          })
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          if(data.success) {
            console.log('success');
          } else {
            console.log('no success');
          }
        });


      },

    }
  };
</script>

