<template>
  <div class="custom-from">
    <form
      :name="data.formName"
      method="POST"
      data-netlify="true"
    >
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      />
    </form>
  </div>
</template>

<script>
  import VueFormGenerator from 'vue-form-generator';
  // import 'vue-form-generator/dist/vfg.css';

  export default {
    name: 'customForm',
    components: {
      'vue-form-generator': VueFormGenerator.component,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        spaceTop: 0,
        spaceBottom: 0,
        model: {},
        schema: { fields: [] },
        formOptions: {
          validateAfterLoad: false,
          validateAfterChanged: true,
          validateAsync: true,
        },
        requiredFields: [],
        message: null,
        messageType: null,
      }
    },
    mounted() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
      this.createForm();
    },
    methods: {
      createForm() {
        const submitForm = this.submitForm;
        const mapValidator = {
          text: 'string',
          email: 'email',
          password: 'string',
          number: 'number',
        };
        let field = {};

        this.$props.data.formItems.map(formItem => {
          switch (formItem.type) {
            case 'input':

              field = {
                type: formItem.type,
                inputType: formItem.inputtype,
                label: formItem.label,
                model: formItem.id,
                inputName: formItem.id,
                placeholder: formItem.placeholder,
                required: formItem.required === true,
                validator: VueFormGenerator.validators[mapValidator[formItem.inputtype]],
              };

              if (formItem.required === 'yes') {
                this.requiredFields.push(formItem.id);
              }

              this.schema.fields.push(field);

              break;

            case 'textArea':

              field = {
                type: 'textArea',
                label: formItem.label,
                model: formItem.id,
                inputName: formItem.id,
                placeholder: formItem.placeholder,
                rows: 4,
                max: 500,
                required: formItem.required === 'yes',
                validator: VueFormGenerator.validators.string,
              };

              if (formItem.required === 'yes') {
                this.requiredFields.push(formItem.id);
              }

              this.schema.fields.push(field);

              break;

            case 'checkbox':

              field = {
                type: "checkbox",
                label: formItem.label,
                model: formItem.id,
                inputName: formItem.id,
                default: formItem.value === "false" ? false : true,
              };

              if (formItem.required === 'yes') {
                this.requiredFields.push(formItem.id);
              }

              this.schema.fields.push(field);

              break;

            case 'select':

              field = {
                type: formItem.type,
                label: formItem.label,
                model: formItem.id,
                inputName: formItem.id,
                values: function() {
                  const vals = formItem.values.split(',');
                  return vals.map((val,i) => {
                    return { id: i, name: val }
                  })
                },
                selectOptions: {
                  noneSelectedText: "please select",
                  hideNoneSelectedText: false,
                },
                validator: VueFormGenerator.validators.required
              };

              if (formItem.required === 'yes') {
                this.requiredFields.push(formItem.id);
              }

              this.schema.fields.push(field);

              break;

            case 'submit':

              field = {
                type: 'submit',
                buttonText: formItem.label,
                // onSubmit: function(formData) {
                //   // event.preventDefault();
                //   submitForm();
                // },
                validateBeforeSubmit: true,
                buttonText: formItem.value,
              };

              this.schema.fields.push(field);

              break;

            default:
              //

          }

        });

      },
      submitForm() {
        // console.log('submit');
      },
      handleResize() {
        const spaceTop = this.$props.data.spaceTop === null ? 0 : this.$props.data.spaceTop;
        const spaceBottom = this.$props.data.spaceBottom === null ? 0 : this.$props.data.spaceBottom;

        this.spaceTop = window.innerWidth > 1300 ? spaceTop : 0;
        this.spaceBottom = window.innerWidth > 1300 ? spaceBottom : 0;
      },
    },
  };
</script>

<style lang="scss">
  @import '~assets/scss/main.scss';

  .custom-from {
    margin: 0 auto;
    max-width: 1000px;
    width: calc(100% - 20px);
    margin-bottom: 100px;
  }

  .vue-form-generator fieldset {
    border: 0px solid black;
  }

  .vue-form-generator {

    fieldset {
      padding: 0 5px;
    }

    .field-input {

      margin: 10px 0;

      label {
        display: none;
      }

      input {
        background-color: lightgrey;
        border: 0;
        color: black;
        font-family: 'Courier Prime', monospace;
        font-size: 20px;
        padding: 5px;
        text-transform: lowercase;
        width: 700px;

        &::placeholder {
          color: grey;
        }
      }
    }

    .field-textArea {

      margin: 10px 0;

      label {
        display: none;
      }

      textarea {
        background-color: lightgrey;
        border: 0;
        color: black;
        font-family: 'Courier Prime', monospace;
        font-size: 20px;
        height: 400px;
        max-width: 700px;
        min-width: 700px;
        padding: 5px;
        text-transform: lowercase;
        width: 700px;
      }

    }

    .field-checkbox {
      width: 700px;

      label {
        font-family: 'Courier Prime', monospace;
        font-size: 16px;
        a {
          color: red;
          text-decoration: none;
          &:hover {
            background-color: red;
            color: white;
          }
        }
      }

      input {
        display: none;
      }

    }

    .field-select {

      margin: 10px 0;

      select {
        border: 0;
        color: black;
        font-family: 'Courier Prime', monospace;
        font-size: 20px;
        height: 40px;
        padding: 5px;
        width: 700px;
        background-color: lightgrey;
        option {
          color: black;
          background-color: white;
          border: 0;
        }
      }
    }

    .field-submit {
      width: 700px;
      height: 30px;
      input {
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

    }

  }


  @media only screen and (max-width: 1300px) {

    .vue-form-generator {

      fieldset {
        padding: 0 5px;
      }

      .field-input {
        margin: 5px 0;
        input {
          font-size: 16px;
          padding: 5px;
          width: 100%;
        }
      }

      .field-textArea {

        margin: 5px 0;

        textarea {
          font-size: 16px;
          width: 100%;
          max-width: 100%;
          min-width: 100%;
        }

      }

      .field-checkbox {
        width: 100%;
        padding: 0 5px;
        label {
          font-size: 14px;
        }
      }

      .field-submit {
        width: 100%;
        input {
          width: 100%;
          font-size: 16px;
          padding: 15px;
        }

      }

    }

  }

</style>
