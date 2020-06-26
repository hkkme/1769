<template>
  <div class="from-generator">
    <form
      @submit.prevent="handleSubmit"
    >
      <div
        v-for="(formItem, index) in formItems"
        :key="index"
      >
        <input
          :label="formItem.label"
          :name="formItem.id"
          :placeholder="formItem.placeholder"
          @input="onChange"
          class="input-text"
          type="input"
          v-if="formItem.type === 'input'"
        />
        <textarea
          :label="formItem.label"
          :name="formItem.id"
          :placeholder="formItem.placeholder"
          :style="{ height: formItem.height + 'px' }"
          @input="onChange"
          class="input-textarea"
          v-if="formItem.type === 'textArea'"
        />
        <div
           class="input-note"
           v-html="formItem.value"
           v-if="formItem.type === 'note'"
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
// import axios from 'axios;'
import ValidationService from '~/services/validationService';

export default {
  name: "formGenerator",
  created() {
    this.formItems = this.$props.data.formItems;
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formItems: [],
      formValues: {},
      message: null
    };
  },
  methods: {
    onChange(e) {
      this.formValues[e.target.name] = e.target.value;
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
        this.message = { text: `Form incomplete: ${missing.join(', ')}`, type: 'warn' }
      } else if (emailValid === false) {
        this.message = { text: `Email not valid!`, type: 'warn' }

      } else {
        formVerified = true;
        this.message = null;
      }

      return formVerified;
    },
    handleSubmit () {

      if(this.verifyFormValues()) {

        console.log('form submitted');

        fetch('/.netlify/functions/formhandler', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formValues)
          }).then(function(response) {

            console.log('response', response);

            return response.json();
          }).then(function(data) {


            console.log('data', data);


            if(data.success) {
              console.log('success > data', data);
            } else {
              console.log('failed');
            }
          });

      } else {

        console.log('form not valid')

      }

    }
  }
}

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
      height: 400px;
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
        color: green;
      }

    }

  }



</style>
