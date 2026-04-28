// Enter an API key from the Google API Console:
      //   https://console.developers.google.com/apis/credentials
      var apiKey = 'AIzaSyDoKPHQ28RLiWSk5zylwlWfEv59-Ho_4Sg';

      // Enter the API Discovery Docs that describes the APIs you want to
      // access. In this example, we are accessing the People API, so we load
      // Discovery Doc found here: https://developers.google.com/people/api/rest/
      var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];

      // Enter a client ID for a web application from the Google API Console:
      //   https://console.developers.google.com/apis/credentials?project=_
      // In your API Console project, add a JavaScript origin that corresponds
      //   to the domain where you will be running the script.
      var clientId = '1071367696181-41hguqf1j44kmgv2opo3esu2ip4dfr05.apps.googleusercontent.com';

      // Enter one or more authorization scopes. Refer to the documentation for
      // the API or https://developers.google.com/people/v1/how-tos/authorizing
      // for details.
      var scopes = 'profile email';

      var authorizeButton = null;
      var signoutButton = null;
      var continueButton = null;
      var loginheading=null
      var loginemail=null
      var loginhimage=null
      var profile = null;

    //   console.log(authorizeButton);
    //   console.log(signoutButton);
      

      function handleClientLoad() {
        // Load the API client and auth2 library
        gapi.load('client:auth2', initClient);

        
      }

      function initClient() {
        // options = new gapi.auth2.SigninOptionsBuilder();
        // options.setAppPackageName('com.example.app');
        // options.setFetchBasicProfile(True);
        // options.setPrompt('select_account');
        // options.setScope('profile').setScope('email');
        app.preloader.show();
        gapi.client.init({
            apiKey: apiKey,
            discoveryDocs: discoveryDocs,
            clientId: clientId,
            scope: scopes
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

           authorizeButton = $$('button#authorize-button')[0];
           continueButton= $$('button#continue-button')[0];
           signoutButton = $$('a#signout-button')[0];


          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
          app.preloader.hide();
          
          // console.log(signoutButton);
        });
        //render button 
        // var options = {
        //   scope: 'email',
        //   width: 200,
        //   height: 50,
        //   longtitle: true,
        //   theme: 'dark',
        //   onsuccess: handleSuccess,
        //   onfailure: handleFailure
        // }
        // var el ='googleLogin'
        // gapi.signin2.render(el, options)
        

      }
      function handleSuccess (){
        console.log('success');
      }
      function handleFailure (){
        console.log('Failure');
      }
      function updateSigninStatus(isSignedIn) {

        authorizeButton = $$('button#authorize-button')[0];
        continueButton= $$('button#continue-button')[0];
        signoutButton = $$('a#signout-button')[0];
        loginheading = $$('#login-heading')[0];
        loginemail = $$('#login-email')[0];
        loginimage = $$('#login-image')[0];
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        // console.log('status changed : ' + isSignedIn )
        if (isSignedIn) {
          
          
          // console.log(authorizeButton);
          // console.log('get user profile');
          profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          app.data.googleprofile=profile;
          // console.log(profile.getId());
          // console.log(profile.getName());
          // console.log(profile.getGivenName());
          // console.log(profile.getFamilyName());
          // console.log(profile.getImageUrl());
          
          var id_token =  gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
          app.data.googletoken=id_token;
          //  console.log('Google Token ID: ' + id_token);
          var thisemail=profile.getEmail();
          // console.log('Validating email: ' + thisemail);

          if (validateDepedEmail(thisemail)==false) {
            app.preloader.hide();
            app.dialog.alert("Only DepEd Employees are Allowed","Invalid Credentials",function(){location.reload();});
            return ;
          } else {
            // console.log(loginheading);
            loginheading.textContent='You are signed in as ' + profile.getName();
            loginemail.textContent= profile.getEmail();
            loginimage.src= profile.getImageUrl();
            authorizeButton.style.display = 'none';
            continueButton.style.display = 'block';
            signoutButton.style.display = 'block';
          }

          //validate email 

          
        } else {
          authorizeButton.style.display = 'block';
          continueButton.style.display = 'none';
          signoutButton.style.display = 'none';
          loginheading.textContent='MOOE Login';
        }
        app.preloader.hide();
        // console.log(isSignedIn);
      }

      function handleAuthClick(event) {
        // console.log('no login here');
        // return;
        // initClient();
        app.preloader.show();

        
        // mainview.router.refreshPage();
        gapi.auth2.getAuthInstance().signIn();//.then(function(resp){console.log(resp)});
        
      }

      function handleSignoutClick(event) {

        console.log('Signing out');
        // authorizeButton.style.display = 'block';
        // continueButton.style.display = 'none';
        // signoutButton.style.display = 'none';
        // loginheading.textContent='Login';
        // profile = null;
        // gapi.auth2.getAuthInstance().signOut();
        // gapi.auth2.getAuthInstance().disconnect();
        //sign as a different user 
        // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        app.preloader.show();
        // gapi.auth2.getAuthInstance().currentUser.get().disconnect();
        // gapi.auth2.getAuthInstance().signOut();
        // gapi.auth2.getAuthInstance().disconnect();
        // console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
        handleClientLoad()
        initClient() ;
        // gapi.auth2.getAuthInstance().signIn();
        location.reload();
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        // gapi.client.people.people.get({
        //   'resourceName': 'people/me',
        //   'requestMask.includeField': 'person.names'
        // }).then(function(resp) {
        // //   var p = document.createElement('p');
        //   var name = resp.result.names[0].givenName;
        // //   p.appendChild(document.createTextNode('Hello, '+name+'!'));
        // //   document.getElementById('content').appendChild(p);\
        // //   console.log(resp);
          
          
        // });
      }
      function validateDepedEmail(emailField){
        var reg = /^([A-Za-z0-9_\-\.])+\@deped.gov.ph/;
        var validemail= ( emailField.substring(emailField.length - 13, emailField.length))
        // if (reg.test(emailField.value) == false) 
        // {
        //     // alert('Invalid Email Address');
        //     return false;
        // }
        if (validemail!='@deped.gov.ph'){
          return false 
        }

        return true;
      }