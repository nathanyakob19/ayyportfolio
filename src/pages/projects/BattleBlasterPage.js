import ProjectDetailLayout from './ProjectDetailLayout';

const project = {
  slug: 'battle-blaster',
  title: 'Battle Blaster',
  discipline: 'Level Design',
  engine: 'Unreal Engine',
  description: 'A collaborative 3D tank action game centered on challenging, frustration-driven level design.',
  overview: 'Battle Blaster is a 3D tank-based action game developed collaboratively with a friend. My teammate created the base mechanics and coding, while I focused on level design, map creation, and enemy placement.',
  overviewContinuation: 'The game was designed to deliberately frustrate and challenge players through unique mechanics. The original plan consisted of three levels, each with its own annoying factor: overwhelming numbers of enemies in Level 1, horizontally moving enemies in Level 2, and fully moving enemies in Level 3. As levels progress, enemy firing cooldowns decrease, making combat more intense. The first level was designed as a lava pit map where players learn basic movement and shooting while being overwhelmed by sheer enemy volume.',
  challenge: 'While I completed the design side, several features were not implemented due to coding limitations — such as lava damaging the player, statue-triggered audio cues, revolving door enemy spawns, and the tower gate ending. I also realized that the quarter-view camera restricted visibility, meaning elements like the tower and statue were not visible to the player as intended. These constraints highlighted the difficulty of aligning design vision with technical feasibility.',
  takeaway: 'This project taught me how level design directly impacts player psychology, especially when the goal is to evoke frustration. It also reinforced the importance of collaboration — balancing creative ideas with what can realistically be implemented.',
  outcome: 'Although the game remains incomplete, my contributions demonstrate strong level design skills, creative mechanics, and the ability to adapt within project constraints. I created maps, materials including a custom lava texture, and gameplay flow that showcased the intended frustration-based experience.',
  status: 'Incomplete',
  role: 'Level Designer',
  tools: ['Unreal Engine'],
  coverImage: '/Battle Blaster/THUMBNAIL.png',
  mediaPath: '/Battle Blaster',
  images: [
    '1.png', '2.png', '6.png', '7.png', 'ABOUT PARA1 2 G6.png', 'ABOUT PARA1 3.png',
    'ABOUT PARA1 G5.png', 'CHALLENGES.png', 'G7.png', 'HighresScreenshot00001.png',
    'HighresScreenshot00005 (1).png', 'HighresScreenshot00006 (1).png', 'HighresScreenshot00007.png',
    'HighresScreenshot00008 (1).png', 'HighresScreenshot00009.png', 'HighresScreenshot00010.png',
    'HighresScreenshot00012.png', 'HighresScreenshot00013 (1).png', 'HighresScreenshot00014.png',
    'HighresScreenshot00015 (1).png', 'OUTCOME.png', 'para3.png', 'TAKAWAY.png',
  ],
  sectionImages: {
    overview: ['ABOUT PARA1 G5.png', 'ABOUT PARA1 2 G6.png', 'ABOUT PARA1 3.png'],
    challenge: 'CHALLENGES.png',
    takeaway: 'TAKAWAY.png',
    outcome: 'OUTCOME.png',
  },
  videos: ['Recording 2026-09-07 213124.mp4'],
  video: '/Battle Blaster/Recording 2026-09-07 213124.mp4',
  videoType: 'video/mp4',
  accent: 'gold',
};

export default function BattleBlasterPage() {
  return <ProjectDetailLayout project={project} />;
}
