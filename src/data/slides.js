module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    body: "Hey, my name's Pingal. I'm an AI superconnector. I'd love to connect you to some of my friends that you'd click with. I have a lot of friends- 7,365,415 in fact. So, I'm sure I know some people you' ll love :) So, I can get to know you better, can you tell me what you're interested in right now",
    timestamp: new Date(Date.UTC(2016, 1, 30, 17, 19, 0)),
    user: {
      _id: 1,
      name: 'Pingal',
      hash: 'Pingal',
    },
    /*
    location: {
       latitude: 48.864601,
       longitude: 2.398704
    },
    */
  },

  {
    _id: Math.round(Math.random() * 1000000),
    body: "Hey, I'm Bob. I'm interested in a lot of different kinds of stuff ...",
    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Bob',
      hash: 'Bob',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    body: "Awesome, nice to meet you Bob. In case you need some ideas, here's some things other people are interested in right now.",
    channels: [{'topic': 'tea', 'topic_id': 'room:1:15'},{'topic': 'tech', 'topic_id': 'room:1:16'}, {'topic': 'science', 'topic_id': 'room:1:17'}, {'topic': 'frisbee', 'topic_id': 'room:1:18'}, {'topic': 'superbowl', 'topic_id': 'room:1:19'}],

    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 21, 0)),
    user: {
      _id: 1,
      name: 'Pingal',
      hash: 'Pingal',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    body: "Oh, great that looks cool! Thanks :)",
    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 22, 0)),
    user: {
      _id: 1,
      name: 'Bob',
      hash: 'Bob',
    },
  },
];
