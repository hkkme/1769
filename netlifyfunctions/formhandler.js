var mailgun = require('mailgun.js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

exports.handler = async (event, context) => {

  try {

    // const formData = JSON.parse(event.body);
    const formData = event.body;

    var mg = mailgun.client({
      username: 'api',
      key: apiKey,
      url: 'https://api.eu.mailgun.net'
    });

    const data = {
      from: 'Name <mailgun@mail.1769.eu>',
      to: ['zehnter.david@gmail.com'],
      subject: '1769 form submit',
      text: formData,
      html: `<p>${formData}</p>`
    };

    console.log('data', data);

    return mg.messages.create(domain, data)
    .then(msg => {
      console.log(msg);

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      }
    })
    .catch(err => {
      console.log(err);

      return {
        statusCode: 200,
        body: JSON.stringify({ success: false })
      }
    });

  } catch (error) {
    console.log('error', error);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: false })
    }
  }

}
