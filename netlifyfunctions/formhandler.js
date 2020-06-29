const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

exports.handler = async (event, context) => {

  try {
    const mg = mailgun({ apiKey, domain });
    const data = JSON.parse(event.body);


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


