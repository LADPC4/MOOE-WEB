// STAGING - Google Auth Bypass
function handleClientLoad() {
  setTimeout(function() {
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
      app.data.googleprofile = {
        getEmail: function() { return 'lance.depasion@deped.gov.ph'; },
        getId: function() { return '000000000000000000000'; },
        getFamilyName: function() { return 'De Pasion'; },
        getGivenName: function() { return 'Lance Adrian'; },
        getImageUrl: function() { return ''; }
      };
      app.data.googletoken = 'staging-bypass-token';
      app.methods.signin();
    };
  }, 1000);
}