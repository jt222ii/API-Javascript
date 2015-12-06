var authorize = {
    
  CLIENT_ID:'595555494787-6fgu71dnnbf01o0t3rk9kjgothlkaj1r.apps.googleusercontent.com',

  SCOPES:['https://mail.google.com/'],
  
  SORTLABEL:"Location/",

   checkAuth:function() {
    gapi.auth.authorize(
      {
        'client_id': authorize.CLIENT_ID,
        'scope': authorize.SCOPES.join(' '),
        'immediate': true
      }, authorize.handleAuthResult);
  },

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  handleAuthResult:function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      mail.loadGmailApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  },

  handleAuthLogin:function(event) {
    gapi.auth.authorize(
      {client_id: authorize.CLIENT_ID, scope: authorize.SCOPES, immediate: false, authuser:""},
      authorize.handleAuthResult);
    return false;
  }


}