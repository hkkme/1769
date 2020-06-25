<template>
  <div class="simple-sign-up">

    <input
      :placeholder="data.placeholder"
      @input="inputChange"
      @focus="() => setMessage(null,null)"
      type="text"
    />

    <button @click="submitForm">{{ data.button }}</button>
    <div
      v-if="message"
      class="message"
      :style="{'color' : messageColor }"
      v-html="message"
    />
  </div>
</template>

<script>
  import ValidationService from '~/services/validationService';

  export default {
    name: 'simpleSignUp',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        signupEmail: null,
        emailNotValid: 'testing',
        message: null,
        messageColor: null,
      }
    },
    methods: {
      inputChange(event) {
        const email = event.target.value;
        this.emailNotValid = !ValidationService.validateEmail(email);
        this.signupEmail = this.emailNotValid ? '' : email;
      },
      setMessage(message, color){
        this.message = message;
        this.messageColor = color;
      },
      submitForm() {

        if(this.emailNotValid) {
          this.setMessage('please enter a valid email','red');
        } else {
          const setMessage = this.setMessage;
          const confirmationMessage = this.data.confirmation;
          const errorMessage = this.data.error;

          fetch('/.netlify/functions/signuphandler', {
              method: 'post',
              body: JSON.stringify({
                signupEmail: this.signupEmail
              })
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              if(data.success) {
                setMessage(confirmationMessage,'blue');
              } else {
                setMessage(errorMessage,'red');
              }
            });

        }
      },

    }
  };
</script>

<style lang="scss">
  @import '~assets/scss/main.scss';

  .simple-sign-up {
    height: 100px;
    margin: 0 auto;
    max-width: 1000px;
    width: calc(100% - 20px);

    input {
      background-color: lightgrey;
      border: 0;
      color: black;
      font-family: 'Courier Prime', monospace;
      font-size: 24px;
      padding: 5px;
      width: 700px;

      &::placeholder {
        color: grey;
      }
    }

    button {
      background-color: $blue;
      border: 0;
      color: lightgrey;
      display: block;
      font-family: 'Alata', sans-serif;
      font-size: 20px;
      margin: 15px 0 0 0;
      padding: 10px;

      &:hover {
        border: 0;
        color: white;
        cursor: pointer;
      }
    }

    .message {
      display: block;
      margin: 30px 0 0 0;
      font-family: 'Courier Prime', monospace;
      font-size: 24px;
    }

  }

  @media only screen and (max-width: 1300px) {

    .simple-sign-up {
      input {
        width: 100%;
        font-size: 16px;
      }

      button {
        font-size: 16px;
      }

      .message {
        font-size: 16px;
      }

    }


  }

</style>
