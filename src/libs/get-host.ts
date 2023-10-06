import { headers } from "next/headers";

const getHost = (path: string) => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}${path}`;
};

export default getHost;
