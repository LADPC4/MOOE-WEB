// File Location: MOOE-WEB/js/google.js
// Google Identity Services (GIS) - New Implementation

var clientId = '346900031154-3quutp1o887iu7866db1qr9d0hnrqkhs.apps.googleusercontent.com';
var profile = null;

function handleClientLoad() {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
    auto_select: false
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
    google.accounts.id.prompt();
  };

  signoutButton.onclick = function() {
    google.accounts.id.disableAutoSelect();
    location.reload();
  };
}

function handleCredentialResponse(response) {
  var id_token = response.credential;
  var payload = JSON.parse(atob(id_token.split('.')[1]));

  var email = payload.email;

  if (validateDepedEmail(email) == false) {
    app.preloader.hide();
    app.dialog.alert("Only DepEd Employees are Allowed", "Invalid Credentials", function() { location.reload(); });
    return;
  }

  app.data.googleprofile = {
    getEmail: function() { return payload.email; },
    getId: function() { return payload.sub; },
    getFamilyName: function() { return payload.family_name || ''; },
    getGivenName: function() { return payload.given_name || ''; },
    getImageUrl: function() { return payload.picture || ''; }
  };
  app.data.googletoken = id_token;

  var loginheading = $$('#login-heading')[0];
  var loginemail = $$('#login-email')[0];
  var loginimage = $$('#login-image')[0];
  var authorizeButton = $$('button#authorize-button')[0];
  var continueButton = $$('button#continue-button')[0];
  var signoutButton = $$('a#signout-button')[0];

  loginheading.textContent = 'You are signed in as ' + payload.name;
  loginemail.textContent = payload.email;
  loginimage.src = payload.picture || '';
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