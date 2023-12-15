export const registrationTemplate = `
<html>
  <body>
    <p>Hello {{FIRST_NAME}} {{LASTNAME}},</p>
    <p>Thank you for registering with Unlyme AI OS.</p>
    <p>We have created your personalized workspace: {{PROJECT_NAME}}</p>

    <p>You can access it at: <a href='{{FE_URL}}/signin'>{{FE_HOST}}/signin</a></p>
    <p>For access please use:</p>
    <p>E-mail: {{EMAIL}}</p>
    <p>Password: {{PASSWORD}}</p>

    <br/>

    <p style="margin: 8px;">Best regards,</p>
    <p style="margin: 8px;">Unlyme SA</p>
    <p style="margin: 8px;">Rue Saint-Martin 7</p>
    <p style="margin: 8px;">1003 Lausanne</p>
    <p style="margin: 8px;"><a href="https://unlyme.com">https://unlyme.com</a></p>
  </body>
</html>

`;
