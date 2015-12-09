//Much of this is written with the help of googles documentation. https://developers.google.com/gmail/api/quickstart/js
var authorize = {
    
  CLIENT_ID:'595555494787-6fgu71dnnbf01o0t3rk9kjgothlkaj1r.apps.googleusercontent.com',

  SCOPES:['https://mail.google.com/'],
  
   checkAuth:function() {
    gapi.auth.authorize(
      {
        client_id: authorize.CLIENT_ID,
        scope: authorize.SCOPES.join(' '),
        immediate: true
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
      authorizeDiv.style.display = 'none';
      mail.loadGmailApi();
    } else {
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