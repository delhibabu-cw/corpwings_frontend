import apiFunctions from "./ApiService.tsx";
import siteUrls from "./SiteUrls.tsx";

export const getAuthCarrersApi = async (query) => {
  return apiFunctions.get(`${siteUrls.auth.authCarrers}${query}`);
}

export const postSigninApi = async (payload) => {
    return apiFunctions.post(siteUrls.auth.signin, payload);
  };

  export const getRoleApi = async (query) => {
    return apiFunctions.get(`${siteUrls.auth.role}${query}`);
  }

  export const getProfileApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.profile}`);
  }

  export const postJobApplicationApi = async (payload) => {
    return apiFunctions.post(`${siteUrls.auth.jobApplication}`,payload);
  }; 

  export const postUserApi = async (payload) => {
    return apiFunctions.post(`${siteUrls.auth.user}`,payload);
  }; 

  export const authSingleUploadApi = async (payload) => {
    return apiFunctions.post(`${siteUrls.auth.authSingleUpload}`,payload);
  };

  export const getAuthProfileApi = async (query) => {
    return apiFunctions.get(`${siteUrls.auth.authProfile}${query}`);
  }

  export const getEmployeeDropdownApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.employeeDropdown}`);
  }

  export const getEmployeeLevelDropdownApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.employeeLevelDropdown}`);
  }

// mobile otp send post api 
export const postMobileOtpSendApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.mobileSignup}`,payload);
};

// mobile otp verify post api 
export const postMobileOtpVerifyApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.mobileSignupVerify}`,payload);
};

// mobile otp verify post api 
export const postSignUpApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.signUp}`,payload);
};

// signup form put api
export const putSignUpFormApi = async (query,payload) => {
  return apiFunctions.put(`${siteUrls.auth.signUp}/${query}`,payload);
};

// mobile validation post api 
export const postMobileValidationApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.mobileValidation}`,payload);
};

// email validation post api 
export const postEmailValidationApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.emailValidation}`,payload);
};

// change password post api 
export const postChangePasswordApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.changePassword}`,payload);
};

// forgot password post api 
export const postForgotPasswordApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.forgotPassword}`,payload);
};

// Reset password post api 
export const postRestPasswordApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.resetPassword}`,payload);
};

// upload post api 
export const uploadSingleApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.upload}`,payload);
};

// resume upload post api 
export const uploadResumeApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.uploadResume}`,payload);
};

 // multi upload post api 
 export const multiUploadApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.uploadMulti}`,payload);
};

 // auth multi upload post api 
 export const authMultiUploadApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.uploadAuthMulti}`,payload);
};

// get projectType
export const getProjectTypeApi = async () => {
  return apiFunctions.get(`${siteUrls.auth.projectType}`)
}

// get phase
export const getPhaseDropdownApi = async (query) => {
  return apiFunctions.get(`${siteUrls.auth.phaseDropdown}${query}`)
}

// get category
export const getCategoryApi = async () => {
  return apiFunctions.get(`${siteUrls.auth.category}`)
}

// get ticket
export const getTicketApi = async (query) => {
  return apiFunctions.get(`${siteUrls.auth.ticket}${query}`)
}

// user Invite accept api 
export const postUserAcceptApi = async (token,payload) => {
  return apiFunctions.post(`${siteUrls.auth.userInviteAccept}?token=${token}`,payload);
};

// get job 
// export const getJobApi = async (query :) => {
//   return apiFunctions.get(`${siteUrls.auth.job}${query}`)
// }
