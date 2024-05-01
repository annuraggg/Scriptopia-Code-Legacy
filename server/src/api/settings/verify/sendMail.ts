import emailjs from "@emailjs/nodejs";

const sendMail = async (to: string) => {
  if (
    !process.env.EMAILJS_SERVICE_ID ||
    !process.env.EMAILJS_TEMPLATE_ID ||
    !process.env.EMAILJS_PUBLIC_KEY ||
    !process.env.EMAILJS_PRIVATE_KEY
  ) {
    throw new Error("EmailJS environment variables not set");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const templateParams = {
    otp: otp,
    to_name: to,
  };

  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  });

  const response = await emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    templateParams
  );

  if (response.status === 200) {
    return {
      success: true,
      message: "Email sent successfully",
      otp: otp,
      error: null,
    };
  }

  return {
    success: false,
    message: "Failed to send email",
    otp: 0,
    error: response,
  };
};

export default sendMail;
