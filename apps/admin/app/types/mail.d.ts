export interface MailHeader {
  name: string;
  value: string;
}

export interface MailBody {
  size: number;
  data: string; //BASE64 ENCODED
}

export interface MailParts {
  partId: string;
  body: MailBody;
}

export interface Mail {
  headers: MailHeader[];
  parts: MailParts[];
}

export interface MailListProps {
  mails: Mail[];
}
