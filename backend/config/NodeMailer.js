import emailjs from '@emailjs/nodejs';

export const sendEmailJS = async (templateParams) => {
  try {
    const response = await emailjs.send(
      process.env.EmailJS_ServiceId,
      process.env.EmailJS_TemplateId,
      templateParams,
      {
        publicKey: process.env.EmailJS_APIKey,
        privateKey: process.env.EmailJS_APISecret
      }
    );
    return response;
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
};

export default sendEmailJS;