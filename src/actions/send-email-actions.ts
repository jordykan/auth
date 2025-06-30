"use server";

import transport from "@/lib/nodemailer";

const styles = {
  container:
    "max-width:500; margin:20px auto; border:1px solid #000; border-radius:6px",
  heading: "font-size:20px; color:#333",
  paragraph: "font-size:16px",
  link: "display:inline-block; margin-top:15px; padding:10px 15px; background:#00FBFF; color:#FFF: text-decoration:none; border-radius:4px",
};
export const sendEmailActions = async ({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: { description: string; link: string };
}) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Auth - ${subject}`,
    html: `
            <div style=${styles.container}>
                <h1 style=${styles.heading}>${subject}</h1>
                <p style=${styles.paragraph}>${meta.description}</p>
                <a href=${meta.link} style=${styles.link}>Click here </a>
            </div>
        `,
  };

  try {
    await transport.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.log("sendMailActions", error);
    return { success: false };
  }
};
