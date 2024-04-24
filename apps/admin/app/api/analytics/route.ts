import { google } from "googleapis";
import credentails from "../googleapis-key.json";
export async function GET() {
  const JWT = google.auth.JWT;
  const authClient = new JWT({
    email: credentails.client_email,
    key: credentails.private_key,
    keyId: credentails.private_key_id,
    scopes: [
      "https://www.googleapis.com/auth/analytics",
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  });

  await authClient.authorize();

  const analytics = google.analytics({
    auth: authClient,
    version: "v3",
  });
  const data = await analytics.management.profiles.list({
    accountId: "311069641",
    webPropertyId: "~all",
  });
  console.log(data.data);

  try {
    // const res = await analytics.data.ga.get({
    //   ids: "ga:311069641",
    //   dimensions: "ga:totalUsers",
    //   metrics: "ga:totalUsers",
    //   "start-date": "yesterday",
    //   "end-date": "today",
    // });
    return Response.json(data.data);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
