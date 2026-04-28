// STAGING - Google Auth Bypass
function handleClientLoad() {
  // Skip Google auth initialization
  var authorizeButton = $$('button#authorize-button')[0];
  var continueButton = $$('button#continue-button')[0];
  var signoutButton = $$('a#signout-button')[0];
  var loginheading = $$('#login-heading')[0];

  loginheading.textContent = 'MOOE Login';
  authorizeButton.style.display = 'block';
  continueButton.style.display = 'none';
  signoutButton.style.display = 'none';

  authorizeButton.onclick = function() {
    app.data.googleprofile = {
      getEmail: function() { return 'lance.depasion@deped.gov.ph'; },
      getId: function() { return '000000000000000000000'; },
      getFamilyName: function() { return 'Depasion'; },
      getGivenName: function() { return 'Lance'; },
      getImageUrl: function() { return ''; }
    };
    app.data.googletoken = 'staging-bypass-token';
    app.methods.signin();
  };
}