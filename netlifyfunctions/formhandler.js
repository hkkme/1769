exports.handler = async (event, context) => {

  try {
    const payload = JSON.parse(event.body);

    console.log('payload', payload);

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


