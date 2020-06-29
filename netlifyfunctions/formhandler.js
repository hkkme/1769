const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const url = process.env.MAILGUN_URL;

exports.handler = async (event, context) => {

  try {
    const mg = mailgun({ apiKey, domain, url });
    const payload = JSON.parse(event.body);

    const data = {
      from: 'Name <mailgun@mail.1769.eu>',
      to: 'zehnter.david@gmail.com',
      subject: '1769 form submit',
      text: 'testing payload',
      html: 'HTML'
    };

    console.log('data 1', data);


    mg.messages().send(data, (error, body) => {

        console.log('data 2', data);
        console.log('body', body);

        if (error) {
            console.log('error:', error)



        }

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


