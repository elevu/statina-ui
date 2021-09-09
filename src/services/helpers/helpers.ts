import { ErrorNotification } from '../interfaces';
import { notification } from 'antd';
import moment from 'moment';
import { AxiosError } from 'axios';

export const OpenNotification = ({
  type,
  message,
  description,
}: ErrorNotification) => {
  const key = `open${Date.now()}`;
  notification[type]({
    message,
    description,
    btn: null,
    key,
    closeIcon: null,
    duration: 0,
  });
};

export const createErrorNotification = (error: AxiosError) => {
  const { errorMessage, errorDescription } = createErrorMessage(error);
  OpenNotification({
    type: 'error',
    message: errorMessage,
    description: errorDescription,
  });
};

export const createErrorMessage = (error: AxiosError) => {
  switch (error?.response?.status) {
    case 403:
      return {
        errorMessage: `${error?.message}`,
        errorDescription: `You don't have permissions to access the data from ${error?.config?.url}`,
      };
    case 500:
      return {
        errorMessage: 'Something went wrong in the backend',
        errorDescription: `${error?.message} ${error?.config?.url}`,
      };
    default:
      return {
        errorMessage: `Could not fetch data from backend, make sure you are connected to the VPN`,
        errorDescription: `${error?.message} ${error?.config?.url}`,
      };
  }
};

export const formatDate = (date: string) =>
  date ? moment(date).format('YYYY-MM-DD') : null;

export const sortDate = (dateA: string, dateB: string) => {
  return new Date(dateA).getTime() - new Date(dateB).getTime();
};

export const formatReads = (reads: string, targetReads: string) => {
  return Math.floor((parseInt(reads, 10) * 100) / parseInt(targetReads, 10));
};

export const sortIssuesByLevel = (issueA, issueB): number => {
  let labelA = '';
  let labelB = '';

  issueA.labels.forEach((label) => {
    if (label.name.length === 1) labelA = label.name;
  });
  issueB.labels.forEach((label) => {
    if (label.name.length === 1) labelB = label.name;
  });
  return labelA.localeCompare(labelB);
};

export const windowMatchMedia = () => {
  return (
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: () => null,
        removeListener: () => null,
      };
    }
  );
};
