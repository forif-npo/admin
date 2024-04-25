import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextRequest } from "next/server";
import credentials from "../googleapis-key.json";
/**
 *
 * @param {string} startDate The inclusive start date for the query in the format YYYY-MM-DD. Cannot be after endDate. The format N daysAgo, yesterday, or today is also accepted, and in that case, the date is inferred based on the property's reporting time zone.
 * @param {string | Date} endDate The inclusive end date for the query in the format YYYY-MM-DD. Cannot be before startDate. The format N daysAgo, yesterday, or today is also accepted, and in that case, the date is inferred based on the property's reporting time zone.
 * @param {string} [metrics="browser"] Quantitative measurements. The metric Sessions is the total number of sessions. The metric Pages/Session is the average number of pages viewed per session. Default value is "browser".
 * @param {string} dimensions Attributes of your data. For example, the dimension City indicates the city, for example, "Paris" or "New York", from which a session originates. The dimension Page indicates the URL of a page that is viewed.
 * @returns
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const metrics = searchParams.get("metrics");
  const dimensions = searchParams.get("dimensions") || "Browser";

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_id: credentials.client_id,
      client_email: credentials.client_email,
      private_key: credentials.private_key,
      private_key_id: credentials.private_key_id,
    },
  });
  try {
    const res = await analyticsDataClient.runReport({
      property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: [
        {
          name: dimensions,
        },
      ],
      metrics: [
        {
          name: metrics,
        },
      ],
    });
    return Response.json(res);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
