// let backendDomain = "https://corpwings-backend-2.onrender.com";
// let backendDomain = "https://corpwings-backend-2.onrender.com";
// let backendDomain = "https://rdm-backend-ielb.onrender.com";
// let backendDomain = "http://localhost:4011";
let backendDomain = "https://corpwings-backend.vercel.app";

console.log(import.meta.BACKEND_URL);


backendDomain = backendDomain
  ? backendDomain.endsWith('/')
    ? backendDomain
    : `${backendDomain}/`
  : '';

const configJson = {
  backendDomain,
};

export default configJson;