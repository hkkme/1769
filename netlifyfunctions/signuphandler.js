const axios = require('axios');
const mailChimpApiKey = process.env.MAILCHIMP_API_KEY;
const mailChimpListId = process.env.MAILCHIMP_LIST_ID;

exports.handler = async (event, context) => {

  try {
    const payload = JSON.parse(event.body);
    const url = `https://us8.api.mailchimp.com/3.0/lists/${mailChimpListId}/members/`

    // status: subscribed, pending, unsubscribed

    return axios
      .post(
        url,
        {
          status: 'subscribed',
          email_address: payload.signupEmail,
        },
        {
          headers: {
            Authorization: `apikey ${mailChimpApiKey}`,
          },
        }
      )
      .then(res => {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true })
        }
      })
      .catch(error => {
        console.log('error', error);

        return {
          statusCode: 200,
          body: JSON.stringify({ success: false })
        }
      }
    );

  } catch (error) {
    console.log('error', error);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: false })
    }
  }

}




