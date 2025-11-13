// const apiBase = 'http://localhost:5000';
const apiBase =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_URL;

export const USER_API_END_POINT=`${apiBase}/api/v1/user`;
export const BUYER_API_END_POINT=`${apiBase}/api/v1/buyer` ;
// NOTIFICATION_API_END_POINT=`${apiBase}/api/v1/notifications` ;
