const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

exports.handler = async (event, context) => {

  try {

    // const mg = mailgun({ apiKey, domain });
    // const payload = JSON.parse(event.body);


    var mg = mailgun.client({username: 'api', key: apiKey, url: 'https://api.eu.mailgun.net'});

    const data = {
      from: 'Name <mailgun@mail.1769.eu>',
      to: 'zehnter.david@gmail.com',
      subject: '1769 form submit',
      text: 'testing text',
      html: 'HTML'
    };

    console.log('data', data);

    mg.messages().send(data, (error, body) => {

        if (error) {
          console.log(error)
        }

        console.log('body', body);

    })


    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }

  } catch (error) {
    console.log('error', error);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: false })
    }
  }

}
