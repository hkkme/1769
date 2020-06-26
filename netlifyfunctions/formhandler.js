




const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

exports.handler = function(event, context, callback)
{

  //   console.log('formhanderl');

  //   const mg = mailgun({ apiKey, domain });

  //   const data = {
  //     from: 'Name <mailgun@mail.1769.eu>',
  //     to: 'zehnter.david@gmail.com',
  //     subject: 'test1',
  //     text: 'testung...',
  //     html: 'HTML'
  //   };

  //  mg.messages().send(data, (error, body) => {

  //       console.log('data:', data);
  //       console.log('body:', body);

  //       if (error)
  //       {
  //           console.log('error:', error)
  //           return console.log(error);
  //       }

  //       callback(null, {
  //           statusCode: 200,
  //           body: "Mail sent"
  //       });
  //  });

  console.log('event.body', event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({ test: 'testing..', success: true })
  }


}
