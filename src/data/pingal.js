module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    body: 'If you need help about *Pingal*, just message me in this channel',
    channels: ['Yes, and I use Pingal'],
    timestamp: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
    //channels: ['ai', 'erlang'],
    location: {
       latitude: 48.864601,
       longitude: 2.398704
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    body: 'Pingal: AI for connecting beyond your social network. Check #Pingal , #Arts, #Jokes ...',
    channels: ['Pingal', 'Arts', 'Jokes', 'react-native'],

    timestamp: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Pingal',
    },
    //channels: ['pingal', 'ai', 'react-native'],
  },
  {
    _id: Math.round(Math.random() * 1000000),
    body: 'We are Launching. See the https://facebook.github.io/react-native/ for more details if you need help ',
    channels: ['Pingal', 'Arts', 'Jokes', 'react-native'],

    timestamp: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Pingal',
    },
    //channels: ['pingal', 'ai', 'react-native'],
  },
];