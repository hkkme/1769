const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

exports.handler = (event, context, callback) => {

    console.log('formhandler');
    console.log('event.body', event.body);

    const mg = mailgun({ apiKey, domain });

    const text = JSON.stringify(event.body);

    const data = {
      from: 'Name <mailgun@mail.1769.eu>',
      to: 'zehnter.david@gmail.com',
      subject: '1769 form submit',
      text,
      html: 'HTML'
    };

    // mg.messages().send(data, (error, body) => {

    //     console.log('data:', data);
    //     console.log('body:', body);

    //     if (error) {
    //         console.log('error:', error)
    //         return console.log(error);
    //     }

    // })

    return {
      statusCode: 200,
      body: JSON.stringify({ test: 'testing..', success: true })
    }

}
