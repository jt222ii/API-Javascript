var mail = {
  LABELS: [],

  MESSAGEIDS: [],//test
  
  MESSAGES:[],
  
  getMails:function() {
    for (var i = 0; i < mail.LABELS.length; i++) {
      var request = gapi.client.gmail.users.messages.list({
        'userId': 'me', 'labelIds': mail.LABELS[i].id
      });
      request.execute(function(resp) {
        mail.MESSAGEIDS.push(resp);
        if(mail.MESSAGEIDS.length>=mail.LABELS.length){
          mail.mailTest();
        }
      });
    }
  },
  
  mailTest:function(){
    for (var i = 0; i < mail.MESSAGEIDS.length; i++) {
      //console.log(mail.MESSAGEIDS[i]);
      var messageID = mail.MESSAGEIDS[i].messages[0].id;
      //console.log(messageID);
      var request = gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': messageID
      });
      request.execute(function(resp){
        console.log(resp);
        var labelID;
        for (var i = 0; i < resp.labelIds.length; i++) {
          if(resp.labelIds[i].indexOf("Label_") > -1)
          {
            labelID = resp.labelIds[i];
          }
        }
        var item = {
          subject:resp.payload.headers[16].value,
          snippet:resp.snippet,
          labelID:labelID,
        };
        mail.MESSAGES.push(item);
        console.log(mail.MESSAGES);
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
            if(resp.labels[i].name.indexOf("location/") > -1)//sort out any label that isnt nested in the "Location"-label
            {
              mail.LABELS.push(resp.labels[i]);
            }
        }
      }
      mail.getMails();
      gmaps.setMarkersOnMap(mail.LABELS);
    });
  },
  

}