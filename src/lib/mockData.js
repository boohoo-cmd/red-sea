export const PLAYERS = [
  { id:'p-001', firstName:'Eli',      lastName:'Nakato',     dob:'2012-03-14', ageGroup:'U14', team:'Lions',    position:'Midfielder', attendance:92,  badges:7,  status:'active' },
  { id:'p-002', firstName:'Amara',    lastName:'Diallo',     dob:'2015-07-22', ageGroup:'U10', team:'Falcons',  position:'Forward',    attendance:88,  badges:4,  status:'active' },
  { id:'p-003', firstName:'Kofi',     lastName:'Nakato',     dob:'2017-11-05', ageGroup:'U8',  team:'Cubs',     position:'Defender',   attendance:95,  badges:2,  status:'active' },
  { id:'p-004', firstName:'Yasmin',   lastName:'Ibrahim',    dob:'2008-01-30', ageGroup:'U18', team:'Eagles',   position:'Goalkeeper', attendance:85,  badges:11, status:'active' },
  { id:'p-005', firstName:'Tobias',   lastName:'Kwame',      dob:'2013-09-18', ageGroup:'U14', team:'Lions',    position:'Forward',    attendance:78,  badges:5,  status:'active' },
  { id:'p-006', firstName:'Imani',    lastName:'Osei',       dob:'2019-04-02', ageGroup:'U6',  team:'Starters', position:'—',          attendance:100, badges:1,  status:'active' },
  { id:'p-007', firstName:'David',    lastName:'Muteba',     dob:'2011-06-11', ageGroup:'U14', team:'Lions',    position:'Defender',   attendance:90,  badges:6,  status:'active' },
  { id:'p-008', firstName:'Fatima',   lastName:'Al-Rashid',  dob:'2007-12-25', ageGroup:'U18', team:'Eagles',   position:'Midfielder', attendance:97,  badges:13, status:'active' },
  { id:'p-009', firstName:'Luca',     lastName:'Bernal',     dob:'2016-08-09', ageGroup:'U10', team:'Falcons',  position:'Forward',    attendance:82,  badges:3,  status:'active' },
  { id:'p-010', firstName:'Aisha',    lastName:'Traoré',     dob:'2014-02-17', ageGroup:'U12', team:'Jaguars',  position:'Midfielder', attendance:94,  badges:8,  status:'active' },
  { id:'p-011', firstName:'Nico',     lastName:'Mensah',     dob:'2010-05-03', ageGroup:'U16', team:'Wolves',   position:'Forward',    attendance:87,  badges:9,  status:'active' },
  { id:'p-012', firstName:'Priya',    lastName:'Sharma',     dob:'2009-10-20', ageGroup:'U16', team:'Wolves',   position:'Defender',   attendance:93,  badges:10, status:'active' },
  { id:'p-013', firstName:'Moses',    lastName:'Okello',     dob:'2013-04-08', ageGroup:'U14', team:'Lions',    position:'Midfielder', attendance:76,  badges:4,  status:'active' },
  { id:'p-014', firstName:'Akira',    lastName:'Banda',      dob:'2018-02-14', ageGroup:'U8',  team:'Cubs',     position:'Forward',    attendance:89,  badges:2,  status:'active' },
  { id:'p-015', firstName:'Zawadi',   lastName:'Mwangi',     dob:'2006-08-30', ageGroup:'U18', team:'Eagles',   position:'Forward',    attendance:91,  badges:15, status:'active' },
]

export const BADGES = [
  { id:'b-01', name:'First Touch',    emoji:'⚽', desc:'Attended first session',        color:'#16a34a', bgColor:'#dcfce7' },
  { id:'b-02', name:'10 Sessions',    emoji:'📅', desc:'10 sessions completed',         color:'#2563c8', bgColor:'#dbeafe' },
  { id:'b-03', name:'50 Sessions',    emoji:'🏆', desc:'50 sessions milestone',         color:'#d97706', bgColor:'#fef3c7' },
  { id:'b-04', name:'Team Spirit',    emoji:'🤝', desc:'Nominated by coach',            color:'#7c3aed', bgColor:'#ede9fe' },
  { id:'b-05', name:'Top Scorer',     emoji:'🎯', desc:'Most goals in a season',        color:'#dc2626', bgColor:'#fee2e2' },
  { id:'b-06', name:'Iron Boots',     emoji:'🦾', desc:'100% attendance in a month',   color:'#0891b2', bgColor:'#cffafe' },
  { id:'b-07', name:'Clean Sheet',    emoji:'🧤', desc:'Goalkeeper of the season',      color:'#be185d', bgColor:'#fce7f3' },
  { id:'b-08', name:'Rising Star',    emoji:'⭐', desc:'Player of the season',          color:'#b45309', bgColor:'#fef3c7' },
]

export const EVENTS = [
  { id:'e-01', title:'U14 Lions Training',       date:'2026-05-14', time:'15:00', venue:'Pitch A — Kasanga', type:'training', ageGroup:'U14', rsvps:12 },
  { id:'e-02', title:'U18 Eagles vs Challengers',date:'2026-05-17', time:'10:00', venue:'Main Pitch',        type:'match',    ageGroup:'U18', rsvps:18 },
  { id:'e-03', title:'U10 Skills Day',           date:'2026-05-19', time:'09:00', venue:'Hall B',            type:'event',    ageGroup:'U10', rsvps:9  },
  { id:'e-04', title:'End of Season Gala',       date:'2026-05-25', time:'17:00', venue:'Club House',        type:'event',    ageGroup:'All', rsvps:44 },
  { id:'e-05', title:'U6 Fun Session',           date:'2026-05-28', time:'10:30', venue:'Pitch C',           type:'training', ageGroup:'U6',  rsvps:6  },
]

export const ANNOUNCEMENTS = [
  { id:'a-01', title:'New kit collection — this Saturday', body:'Kits available 9am–12pm at the academy store, Gaba Road.', date:'2026-05-10', pinned:true  },
  { id:'a-02', title:'U16 regional tournament — register now', body:'Deadline for U16 registration is Friday. Contact admin.', date:'2026-05-09', pinned:false },
  { id:'a-03', title:'Pitch A maintenance closure', body:'Pitch A unavailable May 13–15. All sessions move to Pitch B.', date:'2026-05-08', pinned:false },
]

export const STATS = {
  totalPlayers: 512, activePlayers: 487,
  totalCoaches: 18,  totalTeams: 12,
  sessionsThisMonth: 64, avgAttendance: 89,
  badgesThisMonth: 34,   upcomingEvents: 5,
}

export const AGE_GROUPS = ['U6','U8','U10','U12','U14','U16','U18']
export const TEAMS      = ['Starters','Cubs','Falcons','Jaguars','Lions','Wolves','Eagles']
