import configJson from "../config/index";


const siteUrlsJson = {
  ourSiteUrls: {
    auth: {
      signin: 'signin',
      role: "role",
      user: 'auth/user',
      profile: 'profile',
      authProfile: 'auth/profile',
      upload: 'upload/single',
      uploadMulti: 'upload/multi',
      uploadAuthMulti: 'auth/upload/document',
      uploadResume: 'upload/resume',
      roleDropDown: 'roleDropDown',
      mobileSignup: 'otp/send',
      mobileSignupVerify: 'otp/verify',
      mobileValidation: 'mobileValidation',
      updateMobileValidataion: 'mobileValid/update',
      emailValidation: 'emailValidation',
      updateEmailValidation: 'emailValid/update',
      changePassword: "change/password",
      forgotPassword: 'forgot/password',
      resetPassword: 'reset/password',
      signUp: 'signup',
      projectType: 'auth/project/type',
      userDropdown: 'dropdown/user',
      category: 'dropdown/ticket/category',
      ticket: 'ticket',
      userInviteAccept: 'auth/accept/invite',
      employeeDropdown: 'dropdown/employee/type',
      employeeLevelDropdown: 'dropdown/employee/work/level',
      phaseDropdown: 'dropdown/project-phase',
      projectDropdown: 'dropdown/project',
      sprintDropdown: 'dropdown/sprint',
      authCarrers: 'auth/carrers',
      jobApplication: 'auth/jobApply',
      authSingleUpload: 'auth/single-upload'
    },
    profile: {
      get: 'profile',
    },
    admin: {
      carrers : 'carrers',
      jobApplication: 'jobApply',
      enrollDownloadData : 'download-user',
      user : 'user',
      singleUpload: 'single-upload',
      dashboard: {
        stats : 'dashboard/admin/stats'
      },
      client: 'client/approve/',
      addMember: 'user/invite',
      ticket : {
        ticketStats: 'ticket-stats',
        ticketsStatusChange: 'ticket/status',
      },
      userManagement : {
        stats : 'user-stats'
      },
      team : {
        team : 'get/team',
        teamCreate : 'add-employee/project'
      },
      projectOverview : {
        stats : 'project-overview',
        projectPhase: 'project-phase',
        ticketProgress: 'ticket-progress',
        userStory : 'user-story',
        sprint : 'sprint'
      }
    },
    scrumMaster : {
      dashboard : {
        stats : 'dashboard/technical-support/stats'
      }
    },
    client: {
      dashboard: {
        stats : 'dashboard/client'
      },
      project: 'project',
      projectStats: 'dashboard/client/project',
      documentType: 'document/type',
      documentUpload: 'upload/document',
      document: 'document'
    },
    employee: {
      dashboard : {
        stats : 'employee/stats'
      },
      task : {
        task : 'main/task',
        taskStatusChange : 'main/task/status'
      }
      
    },
    location: {
      pincode: "pincode",
      state: 'state',
      district: 'district',
      city: 'city',
      pincodeIndia: "pincodeIndia"
    },
  },
  outerDomainUrls: {},
};

function checkInnerJson(jsonData: any) {
  if (jsonData) {
    for (const key in jsonData) {
      if (typeof jsonData[key] === 'string') {
        jsonData[key] = `${configJson.backendDomain}${jsonData[key]}`;
      } else {
        jsonData[key] = checkInnerJson(jsonData[key]);
      }
    }
  }
  return jsonData as typeof siteUrlsJson.ourSiteUrls;
}
const siteUrls = {
  ...checkInnerJson(siteUrlsJson.ourSiteUrls),
  outerDomainUrls: siteUrlsJson.outerDomainUrls,
};
export default siteUrls;
