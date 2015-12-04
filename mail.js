var mail = {
    
  CLIENT_ID:'595555494787-6fgu71dnnbf01o0t3rk9kjgothlkaj1r.apps.googleusercontent.com',

  SCOPES:['https://www.googleapis.com/auth/gmail.readonly'],

   checkAuth:function() {
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
      }, handleAuthResult);
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

  handleAuthClick:function(event) {
    gapi.auth.authorize(
      {client_id: mail.CLIENT_ID, scope: mail.SCOPES, immediate: false, authuser:""},
      mail.handleAuthResult);
    return false;
  },

  loadGmailApi:function() {
    gapi.client.load('gmail', 'v1', mail.listLabels);
  },

  listLabels:function() {
    var request = gapi.client.gmail.users.labels.list({
      'userId': 'me'
    });

    request.execute(function(resp) {
      var labels = resp.labels;
      mail.appendPre('Labels:');

      if (labels && labels.length > 0) {
        for (var i = 0; i < labels.length; i++) {
          var label = labels[i];
          mail.appendPre(label.name)
        }
      } else {
        mail.appendPre('No Labels found.');
      }
    });
  },
  appendPre:function(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
}