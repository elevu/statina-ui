import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { OpenNotification } from './helpers/helpers';

export const signIn = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('repo');

  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        resolve(result);
      })
      .catch(function (error) {
        OpenNotification({
          type: 'error',
          message: 'Something went wrong',
          description: 'Could not login with GitHub',
        });
        reject(error);
      });
  });
};
