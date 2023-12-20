export const registrationTemplate = (
  {
    firstName,
    lastName,
    projectName,
    feHost,
    email,
    password
  }: {
    firstName: string,
    lastName?: string,
    projectName: string,
    feHost: string,
    email: string,
    password: string
  }
) => `
<html>
  <body>
    <p>Hello ${firstName}${lastName ? ` ${lastName},` : ','}</p>
    <p>Thank you for registering with Unlyme AI OS.</p>
    <p>We have created your personalized workspace: ${projectName}</p>

    <p>You can access it at: <a href='${feHost}/signin'>${feHost}/signin</a></p>
    <p>For access please use:</p>
    <p>E-mail: ${email}</p>
    <p>Password: ${password}</p>

    <br/>

    <p style="margin: 8px;">Best regards,</p>
    <p style="margin: 8px;">Unlyme SA</p>
    <p style="margin: 8px;">Rue Saint-Martin 7</p>
    <p style="margin: 8px;">1003 Lausanne</p>
    <p style="margin: 8px;"><a href="https://unlyme.com">https://unlyme.com</a></p>
  </body>
</html>

`;
