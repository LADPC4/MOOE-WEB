// STAGING BYPASS - Skip Google Auth
function handleClientLoad() {
  // Do nothing - bypass Google auth
}

function bypassLogin() {
  // Create fake Google profile object
  app.data.googleprofile = {
    getEmail: function() { return 'lance.depasion@deped.gov.ph'; },
    getId: function() { return '000000000000000000000'; },
    getFamilyName: function() { return 'Depasion'; },
    getGivenName: function() { return 'Lance'; },
    getImageUrl: function() { return ''; }
  };
  app.data.googletoken = 'staging-bypass-token';
  app.methods.signin();
}