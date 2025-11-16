export interface Level {
  id: string;
  title: string;
  icon: string;
  progress: number; // 0-1
  locked: boolean;
}

export interface Sidekick {
  name: string;
  sprite: string;
  idleAnimation: 'float' | 'slow_walk' | 'bounce' | 'teleport';
}

export interface Island {
  id: string;
  name: string;
  themeColors: string[];
  sidekick: Sidekick;
  levels: Level[];
  x: number;
  y: number;
}

export const islandData: Island[] = [
  {
    id: 'dsa_island',
    name: 'Data Structures & Algorithms',
    themeColors: ['#39C5BB', '#A3FFE0', '#7AE0FF'],
    sidekick: {
      name: 'Algo Fox',
      sprite: '🦊',
      idleAnimation: 'float'
    },
    levels: [
      {
        id: 'dsa_lvl1',
        title: 'Arrays & Basic Ops',
        icon: '📊',
        progress: 0.25,
        locked: false
      },
      {
        id: 'dsa_lvl2',
        title: 'Recursion',
        icon: '🌀',
        progress: 0,
        locked: false
      },
      {
        id: 'dsa_lvl3',
        title: 'Sorting',
        icon: '🔀',
        progress: 0,
        locked: true
      },
      {
        id: 'dsa_lvl4',
        title: 'Trees & Graphs',
        icon: '🌳',
        progress: 0,
        locked: true
      },
      {
        id: 'dsa_lvl5',
        title: 'Dynamic Programming',
        icon: '⚡',
        progress: 0,
        locked: true
      }
    ],
    x: 50,
    y: 15
  },
  {
    id: 'os_island',
    name: 'Operating Systems',
    themeColors: ['#DC6A1C', '#6B6F76', '#F7BC7F'],
    sidekick: {
      name: 'Thread Turtle',
      sprite: '🐢',
      idleAnimation: 'slow_walk'
    },
    levels: [
      {
        id: 'os_lvl1',
        title: 'Processes & Threads',
        icon: '⚙️',
        progress: 0.75,
        locked: false
      },
      {
        id: 'os_lvl2',
        title: 'Scheduling',
        icon: '⏰',
        progress: 0.1,
        locked: false
      },
      {
        id: 'os_lvl3',
        title: 'Memory Management',
        icon: '🧠',
        progress: 0,
        locked: true
      },
      {
        id: 'os_lvl4',
        title: 'Deadlocks',
        icon: '🔒',
        progress: 0,
        locked: true
      }
    ],
    x: 50,
    y: 35
  },
  {
    id: 'dbms_island',
    name: 'Database Management',
    themeColors: ['#22C55E', '#8DFCCF', '#59D9A3'],
    sidekick: {
      name: 'Query Quokka',
      sprite: '🦘',
      idleAnimation: 'bounce'
    },
    levels: [
      {
        id: 'dbms_lvl1',
        title: 'ER Models',
        icon: '🏗️',
        progress: 0.4,
        locked: false
      },
      {
        id: 'dbms_lvl2',
        title: 'SQL Basics',
        icon: '💾',
        progress: 0,
        locked: false
      },
      {
        id: 'dbms_lvl3',
        title: 'Normalization',
        icon: '📐',
        progress: 0,
        locked: true
      },
      {
        id: 'dbms_lvl4',
        title: 'Transactions',
        icon: '🔄',
        progress: 0,
        locked: true
      }
    ],
    x: 50,
    y: 55
  },
  {
    id: 'cn_island',
    name: 'Computer Networks',
    themeColors: ['#A855F7', '#7DD3FC', '#E879F9'],
    sidekick: {
      name: 'Ping Penguin',
      sprite: '🐧',
      idleAnimation: 'teleport'
    },
    levels: [
      {
        id: 'cn_lvl1',
        title: 'OSI Model',
        icon: '🌐',
        progress: 1,
        locked: false
      },
      {
        id: 'cn_lvl2',
        title: 'Routing',
        icon: '🛣️',
        progress: 0,
        locked: true
      },
      {
        id: 'cn_lvl3',
        title: 'TCP/IP',
        icon: '📡',
        progress: 0,
        locked: true
      },
      {
        id: 'cn_lvl4',
        title: 'HTTP & HTTPS',
        icon: '🔐',
        progress: 0,
        locked: true
      }
    ],
    x: 50,
    y: 75
  }
];

