var mail = {
  getMailFromLabel:function(label){
      var request = gapi.client.gmail.users.messages.list({
        'userId': 'me', 'labelIds': label.id,
      });
      
      request.execute(function(resp) {
        for (var i = 0; i < resp.messages.length; i++) {
          var message = resp.messages[i];
          var request = gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': message.id
            });
          request.execute(function(response){
            //console.log(response);
            var message = response.payload.parts[1].body.data;
            if(message === undefined)
            {
              message = response.payload.parts[0].parts[1].body.data;
            }
            message = window.atob(message.replace(/-/g, '+').replace(/_/g, '/')); //have to replace - with + and _ with / as gmail does this wrong
            var labelname;
            var item = {
              subject:response.payload.headers[16].value,
              snippet:response.snippet,
              messageText: message,
            };
            gmaps.setMarker(label, item);
        });
      }
    })
  },
  
  loadGmailApi:function() {
    gapi.client.load('gmail', 'v1', mail.getLabels);
  },

  //gets labels then calls getMails to get the mails from that label
  getLabels:function() {
    var request = gapi.client.gmail.users.labels.list({
      'userId': 'me'
    });

    request.execute(function(resp) {
      if (resp.labels && resp.labels.length > 0) {
        for (var i = 0; i < resp.labels.length; i++) {
            if(resp.labels[i].name.indexOf("location/") > -1)//sort out any label that isnt nested in the "Location"-label
            {
              mail.getMailFromLabel(resp.labels[i]);
            }
        }
      }
    });
  },
  

}