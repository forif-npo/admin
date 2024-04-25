import { google } from "googleapis";
import credentials from "../googleapis-key.json";
export async function GET() {
  const JWT = google.auth.JWT;
  const authClient = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    keyId: credentials.private_key_id,
    subject: "contact@forif.org",
    scopes: ["https://mail.google.com/"],
  });

  await authClient.authorize();

  const gmail = google.gmail({
    auth: authClient,
    version: "v1",
  });

  try {
    const res = await gmail.users.messages.list({
      includeSpamTrash: false,
      maxResults: 10,
      userId: "me",
    });
    const mails = [];
    if (res.data.messages) {
      const promises = res.data.messages.slice(0, 5).map(async (message) => {
        const res = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });
        return res.data.payload;
      });
      const snippets = await Promise.all(promises);
      mails.push(...snippets);
    }
    return Response.json(mails);
  } catch (error) {
    console.log(error);
    return Response.json(null);
  }
}
