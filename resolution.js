Resolutions = new Mongo.Collection("resolutions");
if (Meteor.isClient) {

  Template.body.helpers({
    resolutions: function() {
      if (Session.get('hideFinished')){
        return Resolutions.find({checked: {$ne: true}});
      }
      else {
        return Resolutions.find();  
      }
    }
  });

  Template.body.events({
    'submit .new-resolution': function(event){
      event.preventDefault();
      var title = event.target.title.value;
      Meteor.call('addResolution', title);
      event.target.title.value = "";
    },

    'change .hide-finished': function(event){
      Session.set('hideFinished', event.target.checked);
    }
  });

  Template.resolution.events({
    "click .delete": function() {
      Meteor.call('deleteResolution', this._id)
    },

    "click .toggle-checked": function() {
      Meteor.call('updateResolution', this._id, !this.checked);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addResolution : function(title) {
    Resolutions.insert({
      title: title,
      createdAt: new Date()
    });
  },

  updateResolution : function(id, checked) {
    Resolutions.update(id, {$set: {checked: checked}});
  },
  deleteResolution : function(id) {
    Resolutions.remove(id);
  }
});