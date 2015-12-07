var mail = {
  SORTLABEL:"Location/",
  
  LABELS: [],

  MESSAGES: [],//test
  getMails:function() {
    for (var i = 0; i < mail.LABELS.length; i++) {
      var request = gapi.client.gmail.users.messages.list({
        'userId': 'me', 'labelIds': mail.LABELS[i].id
      });
      request.execute(function(resp) {
        mail.MESSAGES.push(resp);
      });
    }
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
            if(resp.labels[i].name.indexOf(mail.SORTLABEL) > -1)//sort out any label that isnt nested in the "Location"-label
            {
              mail.LABELS.push(resp.labels[i]);
            }
        }
      }
      gmaps.setMarkersOnMap(mail.LABELS);
    });
  },
  

}