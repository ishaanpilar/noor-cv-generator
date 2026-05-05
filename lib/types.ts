export type TailorRequest = {
  passcode: string;
  jdText: string;
  companyName?: string;
  roleTitle?: string;
};

export type TailorResponse = {
  matchScore: number;
  keywordsCovered: string[];
  keywordsMissing: string[];
  tailoredCvMarkdown: string;
  coverLetter: string;
  angleUsed: "customer-success" | "compliance" | "product-ops" | "story";
  notes?: string;
};
