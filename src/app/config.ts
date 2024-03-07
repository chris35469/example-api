// use NODE_ENV to not have to change config based on where it's deployed https://zizzamia.xyz
export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'http://localhost:3000' : 'https://w3bbie.xyz/frame1';
export const API_URL = "https://testapi35.netlify.app"