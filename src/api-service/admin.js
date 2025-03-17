import apiFunctions from "./ApiService.tsx";
import siteUrls from "./SiteUrls.tsx";

export const getCarrersApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.carrers}${query}`);
}

export const getJobApplicationApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.jobApplication}${query}`);
}

export const getEnrollDownloadApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.enrollDownloadData}${query}`);
}

export const singleUploadApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.admin.singleUpload}`,payload);
};

export const postCareersApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.admin.carrers}`,payload);
};

export const putCareersApi = async (payload, query) => {
  return apiFunctions.put(`${siteUrls.admin.carrers}/${query}`,payload);
};

export const deleteCareersApi = async (query) => {
  return apiFunctions.delete(`${siteUrls.admin.carrers}/${query}`);
};

export const getUserApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.user}${query}`);
}
export const getUserDropdownApi = async (query) => {
  return apiFunctions.get(`${siteUrls.auth.userDropdown}${query}`);
}

// post client approve api
export const postClientApproveApi = async (query, payload) => {
  return apiFunctions.post(`${siteUrls.admin.client}/${query}`, payload);
};

// post role api
export const postRoleApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.auth.role}`, payload);
};

// put role api
export const putRoleApi = async (query, payload) => {
  return apiFunctions.put(`${siteUrls.auth.role}/${query}`, payload);
};

// post user add api
export const postAddUserApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.admin.addMember}`, payload);
};

// put ticket status change api
export const putTicketStatusChangeApi = async (query, payload) => {
  return apiFunctions.put(`${siteUrls.admin.ticket.ticketsStatusChange}/${query}`, payload);
};

export const getTicketsStatsApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.ticket.ticketStats}${query}`);
}

export const getUserManagementStatsApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.userManagement.stats}${query}`);
}

export const getTeamApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.team.team}${query}`);
}

export const putTeamCreateApi = async (payload ) => {
  return apiFunctions.put(`${siteUrls.admin.team.teamCreate}`,payload);
}

export const getProjectOverviewStatsApi = async () => {
  return apiFunctions.get(`${siteUrls.admin.projectOverview.stats}`);
}

export const getProjectPhaseApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.projectOverview.projectPhase}${query}`);
}

export const getPhaseBasedTicketStatusApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.projectOverview.ticketProgress}${query}`);
}

export const postProjectPhaseCreateApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.admin.projectOverview.projectPhase}`,payload);
}

export const getUserStoryApi = async (query) => {
  return apiFunctions.get(`${siteUrls.admin.projectOverview.userStory}${query}`);
}

export const postUserStoryCreateApi = async (payload) => {
  return apiFunctions.post(`${siteUrls.admin.projectOverview.userStory}`,payload);
}

export const getSprintDropdownApi = async (query) => {
  return apiFunctions.get(`${siteUrls.auth.sprintDropdown}${query}`);
}

