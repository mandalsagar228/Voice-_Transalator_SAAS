import nodemailer from "nodemailer";

export const sendOTP = (email, OTP) => {
  // Generating OTP
  //   const generatedOTP = generateOTP();
  //   const { OTP } = generatedOTP;
  // Sending Email to verify email
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mandalsagar228@gmail.com",
      pass: "szspoochinkiocpk",
    },
  });

  const mailOptions = {
    from: "mandalsagar228@gmail.com",
    to: email,
    subject: "Email Verification",

    html: `<h1>Hello,</h1><p>This is an <strong>HTML</strong> email sent using Nodemailer. Your OTP is here:${OTP} </p>`,
  };

  Transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error while sending mail", error);
    } else {
      console.log(`email sent:${info.response}`);
    }
  });
};

//Generating OTP:

export const generateOTP = () => {
  const otpLength = 6;
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const expirationTime = Date.now() + 20 * 60 * 1000;
  console.log("This is a  generated OTP", OTP);
  return {
    OTP: OTP.toString().substring(0, otpLength),
    expireAt: expirationTime,
  };
};
