Resolutions = new Mongo.Collection("resolutions");
if (Meteor.isClient) {

  Template.hello.helpers({

  });

  Template.hello.events({

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
