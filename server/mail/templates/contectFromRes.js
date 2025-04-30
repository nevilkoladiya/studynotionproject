export const contactUsEmail = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
  ) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Contact Form Confirmation</div>
            <div class="body">
                <p>Dear ${firstname} ${lastname},</p>
                <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.
                </p>
                <p>Here are the details you provided:</p>
                <p>Name: ${firstname} ${lastname}</p>
                <p>Email: ${email}</p>
                <p>Country Code: ${countrycode}</p>
                <p>Phone Number: ${phoneNo}</p>
                <p>Message: ${message}</p>
                <p>We appreciate your interest and will get back to you shortly. </p>
            </div>
            <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
                out to us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`
  }

  export const adminRespondTo = (
    firstname,
    lastname,
    userMessage,
    adminResponse
  ) => {
    return `<!DOCTYPE html>
    <html>
  
    <head>
        <meta charset="UTF-8">
        <title>Response to Your Inquiry</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
  
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
  
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
  
            .message {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #000000;
            }
  
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left;
            }
  
            .highlight {
                font-weight: bold;
                color: #000000;
            }
  
            .section-title {
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 10px;
                color: #333333;
            }
  
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
                text-align: center;
            }
        </style>
  
    </head>
  
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app">
                <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
            </a>
            <div class="message">We've Responded to Your Inquiry</div>
            <div class="body">
                <p>Dear <span class="highlight">${firstname} ${lastname}</span>,</p>
  
                <p>Thank you for reaching out to us. We appreciate your patience and have responded to your message.</p>
  
                <div class="section-title">Your Question:</div>
                <p>${userMessage}</p>
  
                <div class="section-title">Admin's Response:</div>
                <p>${adminResponse}</p>
  
                <p>If you have any more questions or need further assistance, feel free to reply to this email.</p>
  
                <p>Best regards,<br>StudyNotion Team</p>
            </div>
  
            <div class="support">
                Need immediate help? Contact us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.
            </div>
        </div>
    </body>
  
    </html>`;
  };
  