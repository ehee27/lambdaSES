import aws from 'aws-sdk'
const ses = new aws.SES({ region: 'us-west-2' })
export const handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const { email, subject, vacation, flight, hotel } = body
  // const email = body.email
  // const subject = body.subject
  // const vacation = body.vacation
  // const flight = body.flight
  // const hotel = body.hotel

  if (subject == null || vacation == null || email == null) {
    callback(null, JSON.stringify(event))
  }

  sendMail(email, subject, vacation, flight, hotel, callback)
}
async function sendMail(email, subject, vacation, flight, hotel, callback) {
  const emailParams = {
    Destination: {
      ToAddresses: ['ehee27@gmail.com', 'scott@skywax.com'],
    },
    Message: {
      Body: {
        // Text: { Data: vacation, flight, hotel },
        Text: { Data: vacation, flight, hotel },
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
