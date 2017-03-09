module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    slide_id: Math.round(Math.random() * 1000000),
    body: "Hey there, my name’s Pingal! What’s your name?",
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
    slide_id: Math.round(Math.random() * 1000000),
    body: "Hey, I'm Sam",
    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Sam',
      hash: 'Sam',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    slide_id: Math.round(Math.random() * 1000000),
    body: "Pleasure to meet you Sam. In case you didn’t know I’m an AI superconnector. That means I know a lot of people–37,415 in fact– and I’d love to connect you with some that I think you’d like! So I can connect you more thoughtfully, can you tell me what you’re interested in?",
    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 20, 1)),
    user: {
      _id: 1,
      name: 'Pingal',
      hash: 'Pingal',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    slide_id: Math.round(Math.random() * 1000000),
    body: "Sure... but I'm interested in a ton of different things.",
    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 20, 2)),
    user: {
      _id: 2,
      name: 'Sam',
      hash: 'Sam',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    slide_id: Math.round(Math.random() * 1000000),
    body: "In case you need some ideas, here's some things other people are interested in right now.",
    channels: [{'topic': 'startups', 'topic_id': 'room:1:15'},{'topic': 'tech', 'topic_id': 'room:1:16'}, {'topic': 'science', 'topic_id': 'room:1:17'}, {'topic': 'superbowl', 'topic_id': 'room:1:19'}, {'topic': 'frisbee', 'topic_id': 'room:1:18'},],

    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 21, 0)),
    user: {
      _id: 1,
      name: 'Pingal',
      hash: 'Pingal',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    slide_id: Math.round(Math.random() * 1000000),
    body: "Oh, great that looks cool! Thanks :)",
    timestamp: new Date(Date.UTC(2017, 1, 30, 17, 22, 0)),
    user: {
      _id: 2,
      name: 'Bob',
      hash: 'Bob',
    },
  },
];
