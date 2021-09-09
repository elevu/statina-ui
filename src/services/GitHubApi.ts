import { OpenNotification } from './helpers/helpers';

const gitHubURL = 'https://api.github.com/';

import { store } from '../domain/store';

const getToken = () => {
  const token = store?.getState()?.settings?.gitHubToken;
  return token ? token : '';
};

export const getRepos = async (): Promise<any> => {
  let response = [];
  try {
    const request = await fetch(`${gitHubURL}orgs/Clinical-Genomics/repos`, {
      mode: 'cors',
    });
    response = await request.json();
  } catch (error) {
    OpenNotification({
      type: 'error',
      message: 'Unable to fetch',
      description: 'Could not fetch GitHub repos',
    });
  }
  return response;
};

export const getIssues = async (
  token = getToken(),
  repo,
  label
): Promise<any> => {
  let response = [];
  try {
    const request = await fetch(
      `${gitHubURL}repos/Clinical-Genomics/${repo}/issues?labels=${label}`,
      {
        mode: 'cors',
        headers: { Authorization: `token ${token}` },
      }
    );
    response = await request.json();
  } catch (error) {
    OpenNotification({
      type: 'error',
      message: 'Unable to fetch',
      description: 'Could not fetch GitHub issues',
    });
  }
  return response;
};
