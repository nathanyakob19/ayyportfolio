import ProjectDetailLayout from './ProjectDetailLayout';

const project = {
  slug: 'kitchen-scene',
  title: 'Kitchen Scene',
  discipline: 'Environment Design',
  engine: 'Unreal Engine',
  description: 'A realistic kitchen interior balancing technical precision with visual storytelling.',
  overview: 'This project depicts a realistic kitchen interior designed to showcase asset creation and scene assembly workflows. I modeled the furniture and appliances in Blender, textured them in Substance Painter, and assembled the full scene in Unreal Engine. The focus was on achieving a believable lived-in atmosphere, balancing technical precision with visual storytelling through lighting, material choices, and prop placement.',
  challenge: 'During development, shading inconsistencies appeared on several assets, particularly where edges and surfaces met. These artifacts disrupted the realism of the scene and made certain props look unnaturally sharp or uneven.',
  takeaway: 'Through this project, I learned how shading issues can be resolved by applying weighted normals, which helped smooth out the geometry and produce more consistent lighting across surfaces. This emphasized the importance of proper normal handling in interior environments, especially when working with reflective materials like metal and glass.',
  outcome: 'The final kitchen scene strengthened my understanding of realistic interior workflows and shading techniques. It demonstrates my ability to combine modeling, texturing, and scene assembly into a cohesive composition, resulting in a kitchen environment that balances technical execution with atmospheric design.',
  status: 'Completed',
  role: 'Environment Artist',
  tools: ['Blender', 'Substance Painter', 'Unreal Engine'],
  coverImage: '/kitchen-scene/thumbnail.png',
  mediaPath: '/kitchen-scene',
  images: [
    'thumbnail.png', 'Para1.png', 'para2.png', 'para3.png', 'Para4.png', 'para6.png',
    'HighresScreenshot00007.png', 'HighresScreenshot00008.png', 'HighresScreenshot00011 (1).png',
    'HighresScreenshot00013 (1).png', 'HighresScreenshot00015 (1).png', 'HighresScreenshot00016.png',
    'HighresScreenshot00018 (2).png', 'HighresScreenshot00022 (1).png', 'HighresScreenshot00023 (1).png',
    'HighresScreenshot00024 (1).png', 'HighresScreenshot00025 (1).png', 'HighresScreenshot00029 (1).png',
    'HighresScreenshot00031.png', 'about.png', 'challenges.png', 'outcome.png', 'takeaway.png',
  ],
  sectionImages: { overview: 'about.png', challenge: 'challenges.png', takeaway: 'takeaway.png', outcome: 'outcome.png' },
  video: '/kitchen-scene/KitchenSceneSq.mp4',
  videoType: 'video/mp4',
  accent: 'cyan',
};

export default function KitchenScenePage() {
  return <ProjectDetailLayout project={project} />;
}
