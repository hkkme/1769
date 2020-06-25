<script>
  import ValidationService from '~/services/validationService';

  export default {
    methods: {
      mapSlice (slice) {

        let mapped = {};

        switch (slice.slice_type) {

          case 'headtags':

            mapped.data = {
              title: slice.primary.title,
              items: slice.items,
            };

            break;

          case 'navmap':

            // console.log('navmap');

            break;

          case 'navmob':

            // console.log('navmob');

            break;

          case 'simplerawhtml':

            mapped = {
              type: slice.slice_type,
              data: {
                title: slice.primary.title,
                titleSize: slice.primary.titlesize,
                paragraphs: [],
                spaceTop: slice.primary.spacetop,
                spaceBottom: slice.primary.spacebottom,
              },
            };

            slice.items.map(item => {
              mapped.data.paragraphs.push(item.paragraph);
            });

            break;

          case 'simplecarousel':

            mapped = {
              type: slice.slice_type,
              data: {
                title: slice.primary.title,
                images: [],
                spaceTop: slice.primary.spacetop,
                spaceBottom: slice.primary.spacebottom,
              },
            };

            slice.items.map(item => {
              mapped.data.images.push(item);
            });

            break;

          case 'simplesignup':

            mapped = {
              type: slice.slice_type,
              data: {
                text: slice.primary.text,
                placeholder: slice.primary.placeholder,
                button: slice.primary.button,
                confirmation: slice.primary.confirmation,
              },
            };

            break;

          case 'customform':

            mapped = {
              type: slice.slice_type,
              data: {
                formName: slice.primary.formname,
                formItems: [],
              },
            }

            slice.items.map(item => {
              mapped.data.formItems.push(item);
            });

          break;

          case 'formgenerator':

            mapped = {
              type: slice.slice_type,
              data: {
                formName: slice.primary.formname,
                formItems: [],
              },
            }

            slice.items.map(item => {
              mapped.data.formItems.push(item);
            });

          break;

          default:
            console.log('error: unknown slice_type');
        }

        return mapped;
      },
    },
  };
</script>
