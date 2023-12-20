export const sendCodeTemplate = ({
  feHost,
  code
}: {
  feHost: string,
  code: string
}) => `
  <html>
    <body>
      <p>Hello,</p>
      <p>Thank you for requesting access to Unlyme AI OS.</p>
      <p>You register at: <a href='${feHost}/register'>${feHost}/register</a></p>
      <p>Your code is: ${code}</p>


      <br/>

      <p style="margin: 8px;">Best regards,</p>
      <p style="margin: 8px;">Unlyme SA</p>
      <p style="margin: 8px;">Rue Saint-Martin 7</p>
      <p style="margin: 8px;">1003 Lausanne</p>
      <p style="margin: 8px;"><a href="https://unlyme.com">https://unlyme.com</a></p>
    </body>
  </html>
`

