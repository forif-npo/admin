"use server";

import { User } from "@repo/types/src/user";

export async function getUser(accessToken: string | undefined) {
  if (!accessToken) {
    return null;
  }
  try {
    const res = await fetch(
      "http://ec2-43-201-12-224.ap-northeast-2.compute.amazonaws.com:8080/user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkODA2ZjE4NDJiNTg4MDU0YjE4YjY2OWRkMWEwOWE0ZjM2N2FmYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDA2MjA4Mjg5MDAxLTdsZWd2MGdjcjluajFzY25wM2cwMmV2aTY5YzZ0ZXBpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAwNjIwODI4OTAwMS03bGVndjBnY3I5bmoxc2NucDNnMDJldmk2OWM2dGVwaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMzQ1MDcyMzA2MTkzODA4ODA1MSIsImhkIjoiaGFueWFuZy5hYy5rciIsImVtYWlsIjoic3RhbmRhcmRzdGFyQGhhbnlhbmcuYWMua3IiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjRUR09fRFJlZ3hDS0FBeGlsYjZFRmciLCJuYW1lIjoiwq3tkZzspIDshLEgfCDsoJXrs7Tsi5zsiqTthZztlZnqs7wgfCDtlZzslpHrjIAo7ISc7Jq4KSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMMDcxU3oxRUpBRVFGN3A3M21zYkpEV3BUWUgwTkdld3hxa1BhNWNpOWdPZz1zOTYtYyIsImdpdmVuX25hbWUiOiLtkZzspIDshLEgfCDsoJXrs7Tsi5zsiqTthZztlZnqs7wgfCDtlZzslpHrjIAo7ISc7Jq4KSIsImZhbWlseV9uYW1lIjoiwq0iLCJsb2NhbGUiOiJrbyIsImlhdCI6MTcwODE5MTMyMSwiZXhwIjoxNzA4MTk0OTIxfQ.R7ICNzhQnWLEMn1Mmod2spcaDRFrlSXkKKqT4FCqLbkkpeRptI3YFPaZJJac0pSoEeX_Dm8dZ10GwzV8oH-KyeiOFq4DK-5JGutw-0uIh9kAJKioKIR8mXN1TUi1IIExzCBxuWDN-IcgGWxyP_F4x0QIvRS5CpMnSFOdov6XLUHL2zhOtwwML1fooawDVkVaG6m0oV5QgG-soYCYPL-Sq9P7Jj-WYi772C1TGaOd_xd4Cy6jEVtPFSfc7wVdKnbO08loRq2OzBHRo7GvHNuV4nIAxQUrQg5ZpealqSDmw_KknztTSHKUIPbfO9Aj9vuj1SRncK55Ye7HWS1vKEyNtw`,
        },
      },
    );
    if (res.ok) {
      const userData: User = await res.json();
      return userData;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
