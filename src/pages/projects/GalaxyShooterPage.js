import ProjectDetailLayout from './ProjectDetailLayout';

const project = {
  slug: 'galaxy-shooter',
  title: 'Galaxy Shooter',
  discipline: 'Game Development',
  engine: 'Unity',
  description: 'A solo-developed 2D space shooter built with Unity and C#.',
  overview: 'Galaxy Shooter is a 2D solo-developed space shooter game, where you control a spaceship and your main objective is to shoot or dodge enemy ships heading your way. The player can fire lasers with the spacebar key. If your spaceship comes in contact with the enemy ship, it costs you one life. You have 3 lives when you start the game. I incorporated a powerup system, through which your spaceship can get temporary boosts if it comes in contact with power ups that spawn occasionally. There are three types of power ups: Triple-Shot, Speed, and Shield. The game tracks score based on enemies destroyed, with additional mechanics including screen-wrapping, a restart button, and a start menu UI leading into the gameplay loop. The project was developed to master Unity fundamentals and C# scripting, implementing player movement, collision detection, dynamic spawning, and game state logic.',
  challenge: 'Initially, enemies only spawned from a single fixed position instead of random locations. This limited gameplay variety and made the experience predictable. I solved this by reaching out to the Unity community on Discord, where someone explained that the enemy spawn logic in my script was running after the SpawnManager routine. With their guidance, I corrected the spawn logic to use randomized positions along the x-axis.',
  takeaway: 'This project emphasized the importance of debugging script execution order and reinforced how community support can accelerate problem-solving. It also highlighted the value of randomization in enemy spawning for replayability and challenge.',
  outcome: 'The final game demonstrates my ability to implement core mechanics in Unity, design functional UI systems, and troubleshoot scripting issues. It reflects both technical execution and gameplay design, resulting in a cohesive and engaging 2D space shooter experience.',
  status: 'Completed',
  role: 'Game Developer',
  tools: ['Unity', 'C#'],
  coverImage: '/Galaxy Shooter/THUMNAIL.png',
  mediaPath: '/Galaxy Shooter',
  images: [
    'Screenshot 2026-10-24 192812.png', 'Screenshot 2026-10-24 192838.png',
    'challenges 1 (1).png', 'aboutm].png', 'about 1.png', 'outcome.png', 'takeaway.png',
    'THUMNAIL.png',
  ],
  videos: ['GalaxyShooter.mp4'],
  sectionImages: {
    overview: ['aboutm].png', 'about 1.png'],
    challenge: 'challenges 1 (1).png',
    takeaway: 'takeaway.png',
    outcome: 'outcome.png',
  },
  sectionVideos: { challenge: 'CHALLENGES.mp4' },
  video: '/Galaxy Shooter/THUMBNAILVID.mp4',
  videoType: 'video/mp4',
  accent: 'cyan',
};

export default function GalaxyShooterPage() {
  return <ProjectDetailLayout project={project} />;
}
