<template>
  <div class="from-generator">
    <form
      @submit.prevent="submitForm"
    >
      <div
        v-for="(formItem, index) in formItems"
        :key="index"
      >
        <input
          :label="formItem.label"
          :name="formItem.id"
          :placeholder="formItem.placeholder"
          :value="formValues[formItem.id] || ''"
          @input="inputChange"
          class="input-text"
          type="input"
          v-if="formItem.type === 'input'"
        />
        <textarea
          :label="formItem.label"
          :name="formItem.id"
          :placeholder="formItem.placeholder"
          :style="{ height: formItem.height + 'px' }"
          :value="formValues[formItem.id] || ''"
          @input="inputChange"
          class="input-textarea"
          v-if="formItem.type === 'textArea'"
        />
        <div
            class="input-note"
            v-html="formItem.value"
            v-if="formItem.type === 'note'"
        />
        <recaptcha
          @error="onError"
          @expired="onExpired"
          @success="onSuccess"
          v-if="formItem.type === 'reCAPTCHA'"
        />
        <input
          :value="formItem.value"
          class="input-submit"
          type="submit"
          v-if="formItem.type === 'submit'"
        />
      </div>
    </form>
    <div
      :class="message && message.type"
      class="message"
    >{{ message && message.text }}</div>
  </div>
</template>

<script>
  import ValidationService from '~/services/validationService';

  export default {
    name: 'testform',
    created() {
      this.formItems = this.$props.data.formItems;
      this.formValues.formName = this.$props.data.formName;
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        formItems: [],
        formValues: {},
        message: null,
      }
    },
    methods: {
      inputChange(event) {
        this.formValues[event.target.name] = event.target.value;
      },
      verifyFormValues() {
        const missing = [];
        let emailValid = false;
        let formVerified = false;

        this.formItems.map(formItem => {

          if(formItem.id === 'email' && ValidationService.validateEmail(this.formValues[formItem.id])) {
            emailValid = true;
          }

          if(formItem.required && (this.formValues[formItem.id] === '' || this.formValues[formItem.id] === undefined)) {
            missing.push(formItem.label);
          }

        })

        if(missing.length > 0) {
          this.message = { text: `form incomplete: ${missing.join(', ')}`, type: 'warn' }
        } else if (emailValid === false) {
          this.message = { text: `email not valid!`, type: 'warn' }

        } else {
          formVerified = true;
          this.message = null;
        }

        return formVerified;
      },
      setMessage(message) {
        this.message = message;
      },
      onError(error) {
        console.log('error', error);
      },
      onSuccess(token) {
        // console.log('token', token);
      },
      onExpired() {
        console.log('expired');
      },
      async submitForm() {

        const setMessage = this.setMessage;
        const callSignupHandler = this.callSignupHandler;
        const callFormHandler = this.callFormHandler;

        if(this.verifyFormValues()) {

          if(this.formItems.some(key => key.type === 'reCAPTCHA')) {

            try {

              const token = await this.$recaptcha.getResponse()
              // console.log('token', token);

              if(this.formValues.formName === 'signup') {
                callSignupHandler();
              } else {
                callFormHandler();
              }

              await this.$recaptcha.reset();

            } catch (error) {

              console.log(error);
              setMessage({ text: `something went wrong! please check captcha and try again`, type: 'warn' });

            }

          } else if (this.verifyFormValues()) {

              if(this.formValues.formName === 'signup') {
                callSignupHandler();
              } else {
                callFormHandler();
              }

          } else {

            setMessage({ text: `something went wrong! please try again`, type: 'warn' });

          }

        }

      },
      callFormHandler() {

          const setMessage = this.setMessage;
          let body = '';

          Object.entries(this.formValues).map(val => {
            body += `${val[0]}: ${val[1]}<br>`;
          });

          setMessage({ text: `please wait..`, type: 'confirm' });

          fetch('/.netlify/functions/formhandler', {
            method: 'post',
            body,
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            if(data.success) {
              setMessage({ text: `thanks for your application. we'll get back to you asap!`, type: 'confirm' });
            } else {
              setMessage({ text: `something went wrong! please try again`, type: 'warn' });
            }
          });

      },
      callSignupHandler() {

        const setMessage = this.setMessage;

        fetch('/.netlify/functions/signuphandler', {
            method: 'post',
            body: JSON.stringify({
              signupEmail: this.formValues.email,
            })
          }).then(response => {
            return response.json();
          }).then(function(data) {
            if(data.success) {
              setMessage({ text: `thanks for signing up`, type: 'confirm' });
            } else {
              setMessage({ text: `something went wrong! please try again`, type: 'warn' });
            }
          });

      }
    }
  };
</script>

<style lang="scss">
  @import '~assets/scss/main.scss';

  .from-generator {
    margin: 20px auto 100px auto;
    max-width: 1000px;
    width: calc(100% - 20px);

    .input-text {
      background-color: lightgrey;
      border: 0;
      color: black;
      font-family: 'Courier Prime', monospace;
      font-size: 20px;
      margin-bottom: 10px;
      padding: 5px;
      text-transform: lowercase;
      width: 700px;
      &::placeholder {
        color: $placeholder;
      }
    }

    .input-textarea {
      background-color: lightgrey;
      border: 0;
      color: black;
      font-family: 'Courier Prime', monospace;
      font-size: 20px;
      margin-bottom: 10px;
      max-width: 700px;
      min-width: 700px;
      padding: 5px;
      text-transform: lowercase;
      width: 700px;
    }

    .input-note {
      font-family: 'Courier Prime', monospace;
      font-size: 16px;
      padding: 0 5px;
      margin-bottom: 30px;
      width: 700px;
      a {
        color: red;
        text-decoration: none;
        &:hover {
          background-color: red;
          color: white;
        }
      }
    }

    .input-submit {
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
      padding: 5px;
      margin: 10px 0;
      width: 700px;
      font-family: 'Courier Prime', monospace;
      font-size: 24px;

      &.warn {
        color: red;
      }

      &.confirm {
        color: $blue;
      }

    }

    @media only screen and (max-width: 1300px) {

      .from-generator {
        margin: 20px auto 100px auto;
        width: 100%;
      }

      .input-text {
        font-size: 16px;
        margin-bottom: 5px;
        max-width: none;
        min-width: none;
        padding: 5px;
        width: 100%;
      }

      .input-textarea {
        font-size: 16px;
        margin-bottom: 5px;
        max-width: none;
        min-width: 100px;
        padding: 5px;
        text-transform: lowercase;
        width: 100%;
      }

      .input-note {
        font-family: 'Courier Prime', monospace;
        font-size: 10px;
        padding: 0 5px;
        margin-bottom: 20px;
        width: 100%;
      }

      .input-submit {
        font-size: 16px;
        width: 100%;
      }

      .message {
        padding: 5px;
        margin: 10px 0;
        width: 100%;
        font-family: 'Courier Prime', monospace;
        font-size: 16px;
      }

    }

  }

</style>
