const appName = process.env.VUE_APP_NAME;
const appUrl = process.env.VUE_APP_URL;
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
const socketBaseUrl = process.env.VUE_APP_SOCKET_URL;
const useCryptor = process.env.VUE_APP_USE_CRYPTOR;
const cryptorEndpoint = process.env.VUE_APP_CRYPTOR_ENDPOINT;

export {
  appName,
  appUrl,
  socketBaseUrl,
  apiBaseUrl,
  useCryptor,
  cryptorEndpoint,
};
