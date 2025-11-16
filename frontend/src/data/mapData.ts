export interface MapNode {
  id: string;
  title: string;
  icon: string;
  asset: string;
  candyType: 'donut' | 'cupcake' | 'icecream' | 'lollipop' | 'marshmallow';
  x: number;
  y: number;
  unlocked: boolean;
  completed: boolean;
  next?: string;
}

export interface World {
  id: string;
  name: string;
  color: string;
  nodes: MapNode[];
}

export const mapData: World[] = [
  {
    id: 'dsa',
    name: 'DSA Donut Hills',
    color: '#FFC7D1',
    nodes: [
      {
        id: 'arrays',
        title: 'Arrays Hill',
        icon: '📊',
        asset: 'arrays_hill',
        candyType: 'donut',
        x: 10,
        y: 30,
        unlocked: true,
        completed: false,
        next: 'linkedlist'
      },
      {
        id: 'linkedlist',
        title: 'Linked List Lake',
        icon: '🔗',
        asset: 'linkedlist_lake',
        candyType: 'marshmallow',
        x: 25,
        y: 25,
        unlocked: true,
        completed: false,
        next: 'stack'
      },
      {
        id: 'stack',
        title: 'Stack Cupcake Cliff',
        icon: '📚',
        asset: 'stack_cliff',
        candyType: 'cupcake',
        x: 40,
        y: 20,
        unlocked: true,
        completed: false,
        next: 'queue'
      },
      {
        id: 'queue',
        title: 'Queue Candy Road',
        icon: '🚗',
        asset: 'queue_road',
        candyType: 'lollipop',
        x: 55,
        y: 30,
        unlocked: true,
        completed: false,
        next: 'recursion'
      },
      {
        id: 'recursion',
        title: 'Recursion Loop Swirl',
        icon: '🌀',
        asset: 'recursion_swirl',
        candyType: 'donut',
        x: 70,
        y: 25,
        unlocked: true,
        completed: false,
        next: 'dp'
      },
      {
        id: 'dp',
        title: 'DP Mountain',
        icon: '⛰️',
        asset: 'dp_mountain',
        candyType: 'cupcake',
        x: 85,
        y: 35,
        unlocked: true,
        completed: false
      }
    ]
  },
  {
    id: 'os',
    name: 'OS Ice Cream Glacier',
    color: '#DDEBFF',
    nodes: [
      {
        id: 'cpu',
        title: 'CPU Scheduling Slopes',
        icon: '⏰',
        asset: 'cpu_slope',
        candyType: 'icecream',
        x: 15,
        y: 50,
        unlocked: true,
        completed: false,
        next: 'memory'
      },
      {
        id: 'memory',
        title: 'Memory Management Cave',
        icon: '🧠',
        asset: 'memory_cave',
        candyType: 'icecream',
        x: 30,
        y: 55,
        unlocked: true,
        completed: false,
        next: 'process'
      },
      {
        id: 'process',
        title: 'Process Ice Field',
        icon: '🐧',
        asset: 'process_field',
        candyType: 'icecream',
        x: 45,
        y: 50,
        unlocked: true,
        completed: false,
        next: 'deadlock'
      },
      {
        id: 'deadlock',
        title: 'Deadlock Frozen Zone',
        icon: '🔒',
        asset: 'deadlock_zone',
        candyType: 'icecream',
        x: 60,
        y: 55,
        unlocked: true,
        completed: false,
        next: 'paging'
      },
      {
        id: 'paging',
        title: 'Paging Popsicle Forest',
        icon: '🌲',
        asset: 'paging_forest',
        candyType: 'icecream',
        x: 75,
        y: 50,
        unlocked: false,
        completed: false
      }
    ]
  },
  {
    id: 'dbms',
    name: 'DBMS Candy Castle',
    color: '#EBD8FF',
    nodes: [
      {
        id: 'er',
        title: 'ER Bakery',
        icon: '🏰',
        asset: 'er_bakery',
        candyType: 'cupcake',
        x: 20,
        y: 70,
        unlocked: true,
        completed: false,
        next: 'sql'
      },
      {
        id: 'sql',
        title: 'SQL Sugar River',
        icon: '🚢',
        asset: 'sql_river',
        candyType: 'lollipop',
        x: 40,
        y: 75,
        unlocked: true,
        completed: false,
        next: 'normalization'
      },
      {
        id: 'normalization',
        title: 'Normalization Tower',
        icon: '🎂',
        asset: 'normal_tower',
        candyType: 'cupcake',
        x: 60,
        y: 70,
        unlocked: true,
        completed: false,
        next: 'transactions'
      },
      {
        id: 'transactions',
        title: 'Transactions Cupcake Lab',
        icon: '🧪',
        asset: 'txn_lab',
        candyType: 'cupcake',
        x: 80,
        y: 75,
        unlocked: false,
        completed: false
      }
    ]
  },
  {
    id: 'network',
    name: 'Networks Marshmallow Clouds',
    color: '#FFEADF',
    nodes: [
      {
        id: 'tcp',
        title: 'TCP/UDP Cloudland',
        icon: '☁️',
        asset: 'tcp_udp_cloud',
        candyType: 'marshmallow',
        x: 25,
        y: 85,
        unlocked: true,
        completed: false,
        next: 'routing'
      },
      {
        id: 'routing',
        title: 'Routing Rainbow Bridge',
        icon: '🌈',
        asset: 'routing_rainbow',
        candyType: 'lollipop',
        x: 50,
        y: 80,
        unlocked: true,
        completed: false,
        next: 'http'
      },
      {
        id: 'http',
        title: 'HTTP Lollipop Land',
        icon: '🎡',
        asset: 'http_lollipop',
        candyType: 'lollipop',
        x: 75,
        y: 85,
        unlocked: false,
        completed: false
      }
    ]
  }
];

