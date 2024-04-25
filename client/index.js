import aws from 'aws-sdk'
const ses = new aws.SES({ region: 'us-west-2' })

// LAMBDA HANDLER
// 1. parse and destructures the 'event' (form req.body)
// 2. inits 'sendMail' and builds params object with data
// 3. tryCatch handles results

export const handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const { email, subject, vacation, flight, hotel } = body

  if (subject == null || vacation == null || email == null) {
    callback(null, JSON.stringify(event))
  }

  sendMail(email, subject, vacation, flight, hotel, callback)
}
async function sendMail(email, subject, vacation, flight, hotel, callback) {
  const emailParams = {
    Destination: {
      ToAddresses: ['scott@skywax.com'],
    },
    Message: {
      Body: {
        Text: {
          Data: JSON.stringify({
            vacation: vacation,
            flight: flight,
            hotel: hotel,
          }),
        },
      },
      Subject: { Data: subject },
    },
    ReplyToAddresses: [email],
    Source: 'ehee27@gmail.com',
  }

  try {
    let key = await ses.sendEmail(emailParams).promise()
    callback(null, { result: 'Success' })
  } catch (e) {
    callback(null, { result: `Failure: ${e}` })
  }
  return
}
