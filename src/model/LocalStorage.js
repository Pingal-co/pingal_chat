import Store from 'react-native-store';

export const DB = {
    slide: Store.model('slide'),
    user: Store.model('user'),
    thought: Store.model('thought'),
    device: Store.model('device'),
    hash : Store.model('hash')
}

/*
import Realm from 'realm';

const UserSchema = {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id:  {type: 'int', indexed: true},
    name: 'string',
    avatar: {type: 'string', optional: true},
    updatedAt: 'date'
  }
};

const ThoughtSchema = {
  name: 'Thought',
  primaryKey: '_id',
  properties: {
    _id:  {type: 'int', indexed: true},
    name: 'string',
    category: 'string',
    updatedAt: 'date'
  }
};

const LocationSchema = {
  name: 'Location',
  properties: {
    latitude: 'float',
    longitude: 'float',
  }
};

const ActionSchema = {
  name: 'Action',
  properties: {
    _id: 'int',
    type: 'string', 
    name: 'string'
  }
};



const SlideSchema = {
  name: 'Slide',
  primaryKey: '_id',
  properties: {
	    _id: {type: 'int', indexed: true},
	    body: 'string',
      topic: {type: 'string', optional: true},
      // object properties are always optional
      lists: {type: 'list', objectType: 'Action'},
      actions: {type: 'list', objectType: 'Action'},
      user: {type: 'User'},
      image: {type: 'string', optional: true},
      public: {type: 'string', optional: true},
      sponsored: {type: 'string', optional: true},
      location: {type: 'Location'},
      timestamp: 'date',
      updatedAt: 'date',
	}
};


let Repo = new Realm({
  schema: [UserSchema, LocationSchema, ThoughtSchema, ActionSchema, SlideSchema],
   schemaVersion: 5,
});


let SlideRepo = {
  findAll: (sortBy) => {
    if (!sortBy) sortBy = [['updatedAt', true]];
    return Repo.objects('Slide').sorted(sortBy);
  },

  save: (slide) => { 
    // required attribute: body should not be empty
    if (Repo.objects('Slide').filtered("body = '" + slide.body + "'").length) return;
    
    // nested objects are created recursively : User and Location
    // update the slide automatically if the id exists

    Repo.write(() => {
      slide.updatedAt = new Date()
      Repo.create('Slide', slide);
      //let lists = obj.lists
      //slide.lists.forEach((channel) => {lists.push(channel)})
    })
  },

  update: (slide, callback) => {
    if (!callback) return;
    Repo.write(() => {
      callback();
      slide.updatedAt = new Date();
    });
  }
};


let UserRepo = {
  findAll: (sortBy) => {
    if (!sortBy) sortBy = [['updatedAt', true]];
    return Repo.objects('User').sorted(sortBy);
  },

  save: (user) => {
    // required attribute: name
    if (Repo.objects('User').filtered("name = '" + user.name + "'").length) return;

    Repo.write(() => {
      user.updatedAt = new Date();
      Repo.create('User', user, true);
    })
  },

  update: (user, callback) => {
    if (!callback) return;
    Repo.write(() => {
      callback();
      user.updatedAt = new Date();
    });
  }
};

let ThoughtRepo = {
  findAll: (sortBy) => {
    if (!sortBy) sortBy = [['updatedAt', true]];
    return Repo.objects('Thought').sorted(sortBy);
  },

  save: (thought) => {
    // required attribute: name
    if (Repo.objects('Thought').filtered("name = '" + thought.name + "'").length) return;

    Repo.write(() => {
      thought.updatedAt = new Date();
      Repo.create('Thought', thought, true);
    })
  },

};

let ActionRepo = {

  save: (obj) => {
   let actions = obj.actions
   console.log(actions)
   actions.forEach((action) => {
    Repo.write(() => {
        Repo.create('Action', action);
    })
   })
  },

};



SlideRepo.save({
    _id: Math.round(Math.random() * 1000000),
    body: 'Local1',
    topic: 'local',
    timestamp: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    lists: [
      {_id: 2,  type: 'channel', name: 'User1'}, 
      {_id: 3,  type: 'channel', name: 'User2'}
      ],
    user: {
      _id: 1,
      name: 'Developer',
    },
    location: {
       latitude: 48.864601,
       longitude: 2.398704
    },
  });
// 
SlideRepo.save({
    _id: Math.round(Math.random() * 1000000),
    body: 'More',
    topic: 'pingal',
   lists: [
     {_id: 1,  type: 'action', name: 'Pingal'}, 
     {_id: 4,  type: 'action', name: 'Arts'}, 
     {_id: 5,  type: 'action', name: 'Jokes'}, 
     {_id: 6, type: 'action', name: 'react-native'},
     ],
    timestamp: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Pingal',
    },
  });
// 


UserRepo.save({
      _id: 1,
      name: 'Developer',
    })

UserRepo.save({
      _id: 2,
      name: 'Pingal',
    })

ActionRepo.save({ actions: [
     {_id: 1,  type: 'action', name: 'Pingal'}, 
     {_id: 4,  type: 'action', name: 'Arts'}, 
]
    })

module.exports = {
    SlideRepo,
    UserRepo,
    Repo,
};

*/