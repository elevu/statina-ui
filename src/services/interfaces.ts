export interface GetAnalysesResponse {
  analyses: Array<any>;
}

export interface GetFailedJobsResponse {
  jobs: Array<FailedJob>;
}

export interface FailedJob {
  name: string;
  count: number;
}

export interface ErrorNotification {
  type: 'error';
  message: string;
  description: string;
}

export interface AuthTokenContext {
  authToken: any;
}
