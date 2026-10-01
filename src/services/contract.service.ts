import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface ContactMessageData {
  nom: string;
  email: string;
  telephone?: string;
  message: string;
}

export const contactService = {
  async send(data: ContactMessageData) {
    const destination = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;

    // E-mail principal : vers la Résidence, avec les coordonnées du visiteur
    // en reply-to pour pouvoir répondre directement depuis la boîte mail.
    await transporter.sendMail({
      from: `"Site web - Résidence Émeraude" <${process.env.EMAIL_USER}>`,
      replyTo: data.email,
      to: destination,
      subject: `Nouveau message de contact de ${data.nom}`,
      text: `Nom : ${data.nom}\nEmail : ${data.email}\nTéléphone : ${data.telephone || 'Non renseigné'}\n\nMessage :\n${data.message}`,
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.telephone || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Accusé de réception automatique au visiteur. Best-effort : si ça
    // échoue, le message principal a déjà été envoyé avec succès, donc on
    // logue simplement sans faire échouer toute la requête.
    try {
      await transporter.sendMail({
        from: `"Résidence Émeraude" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: 'Nous avons bien reçu votre message',
        text: `Bonjour ${data.nom},\n\nMerci de nous avoir contactés. Notre équipe vous répondra sous peu (généralement sous 2 heures ouvrées).\n\nVotre message :\n${data.message}\n\nL'équipe Résidence Émeraude`,
        html: `
          <p>Bonjour ${data.nom},</p>
          <p>Merci de nous avoir contactés. Notre équipe vous répondra sous peu (généralement sous 2 heures ouvrées).</p>
          <p><strong>Votre message :</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <p>L'équipe Résidence Émeraude</p>
        `,
      });
    } catch (err) {
      console.error("Erreur envoi accusé de réception au visiteur :", err);
    }
  },
};