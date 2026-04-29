// File Location: MOOE-WEB/js/google.js
// Google Identity Services (GIS) - New Implementation

var clientId = '346900031154-3quutp1o887iu7866db1qr9d0hnrqkhs.apps.googleusercontent.com';
var profile = null;
var tokenClient = null;

function handleClientLoad() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'profile email',
    callback: function(tokenResponse) {
      if (tokenResponse.error) return;
      // fetch user info using access token
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: 'Bearer ' + tokenResponse.access_token }
      })
      .then(function(res) { return res.json(); })
      .then(function(userInfo) {
        handleUserInfo(userInfo, tokenResponse.access_token);
      });
    }
  });

  var authorizeButton = $$('button#authorize-button')[0];
  var continueButton = $$('button#continue-button')[0];
  var signoutButton = $$('a#signout-button')[0];
  var loginheading = $$('#login-heading')[0];

  if (!authorizeButton) return;

  loginheading.textContent = 'MOOE Login';
  authorizeButton.style.display = 'block';
  continueButton.style.display = 'none';
  signoutButton.style.display = 'none';

  authorizeButton.onclick = function() {
    tokenClient.requestAccessToken({ prompt: 'select_account' });
  };

  signoutButton.onclick = function() {
    google.accounts.oauth2.revoke(profile ? profile.getEmail() : '');
    location.reload();
  };
}

function handleUserInfo(userInfo, accessToken) {
  var email = userInfo.email;

  if (validateDepedEmail(email) == false) {
    app.preloader.hide();
    app.dialog.alert("Only DepEd Employees are Allowed", "Invalid Credentials", function() { location.reload(); });
    return;
  }

  app.data.googleprofile = {
    getEmail: function() { return userInfo.email; },
    getId: function() { return userInfo.sub; },
    getFamilyName: function() { return userInfo.family_name || ''; },
    getGivenName: function() { return userInfo.given_name || ''; },
    getImageUrl: function() { return userInfo.picture || ''; }
  };
  app.data.googletoken = accessToken;
  profile = app.data.googleprofile;

  var loginheading = $$('#login-heading')[0];
  var loginemail = $$('#login-email')[0];
  var loginimage = $$('#login-image')[0];
  var authorizeButton = $$('button#authorize-button')[0];
  var continueButton = $$('button#continue-button')[0];
  var signoutButton = $$('a#signout-button')[0];

  loginheading.textContent = 'You are signed in as ' + userInfo.name;
  loginemail.textContent = userInfo.email;
  loginimage.src = userInfo.picture || '';
  authorizeButton.style.display = 'none';
  continueButton.style.display = 'block';
  signoutButton.style.display = 'block';

  continueButton.onclick = function() {
    app.methods.signin();
  };
}

function validateDepedEmail(emailField) {
  var validemail = emailField.substring(emailField.length - 13, emailField.length);
  if (validemail != '@deped.gov.ph') {
    return false;
  }
  return true;
}