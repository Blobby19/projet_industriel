var cta = {
  name:       'CTA Test',
  deviceName: 'SCC-410M',
  scanPeriod: '100',
  sensors:[
    {type:'temp', location:['return', 'fresh', 'room']},
    {type:'hygro', location:['return', 'fresh', 'room']},
    {type:'press', location:['return', 'fresh', 'room']}
  ],
  actuators:[
    {type:'fan', location:['return', 'fresh', 'room']},
    {type:'register', location:['return', 'mixed', 'fresh']},
    {type:'valves', flow:['heat', 'cold']},
    {type:'battery'}
  ],
  regulation:[
    {type:'temp', sensor:{type:'temp', location:'return'}, actuator:{type:'register', location:'return'}}
  ],
  modes:[
    'summer',
    'freecool',
    'winter'
  ]
}
