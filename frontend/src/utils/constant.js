
// const apiBase =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5000'
//     : 'https://jobportal-ahoq.onrender.com';
const apiBase = 'http://localhost:5000';

export const USER_API_END_POINT=`${apiBase}/api/v1/user`;
export const JOB_API_END_POINT=`${apiBase}/api/v1/job` ;
export const APPLICATION_API_END_POINT=`${apiBase}/api/v1/applications` ;
export const COMPANY_API_END_POINT=`${apiBase}/api/v1/company` ;
export const NOTIFICATION_API_END_POINT=`${apiBase}/api/v1/notifications` ;
