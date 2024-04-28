1. Our form collects the data and triggers 'sendData', which will fetch our Lambda URL and stringify the data.

2. Our Lambda handler will
   A. parse the req.body
   B. destruct our data
   C. define our subject line with users's name

Call 'sendMail' with our data. 'sendMail' sets a params Object.
\*\*\* main 3 elements 1. Destination, 2. Message Body, 3. Reply Address
