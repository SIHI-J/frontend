const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://port-0-backend-server-mkulo9cb3bc6cf69.sel3.cloudtype.app"
    : "http://localhost:9070";

export default BASE_URL;