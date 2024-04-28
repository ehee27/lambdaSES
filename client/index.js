// Our Lambda handler will first parse the req.body, then destructure our data
// We'll define our subject line with users's name
// Call 'sendMail' with our data
// 'sendMail' sets a params Object
// main 3 elements 1. Destination, 2. Message Body, 3. Reply Address
import aws from 'aws-sdk'
const ses = new aws.SES({ region: 'us-west-2' })

// LAMBDA HANDLER
export const handler = (event, context, callback) => {
  const body = JSON.parse(event.body)

  const { name, email, vacation, flight, hotel } = body

  if (name == null || email == null || vacation == null) {
    callback(null, JSON.stringify(event))
  }

  const subject = `Order from: ${name}`

  sendMail(name, email, subject, vacation, flight, hotel, callback)
}
async function sendMail(
  name,
  email,
  subject,
  vacation,
  flight,
  hotel,
  callback
) {
  const emailParams = {
    Destination: {
      ToAddresses: [
        'scott@skywax.com',
        'ehee27@gmail.com',
        'dpericich@gmail.com',
      ],
    },
    Message: {
      Body: {
        Text: {
          Data: JSON.stringify({
            name: name,
            email: email,
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
