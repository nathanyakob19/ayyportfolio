import ProjectDetailLayout from './ProjectDetailLayout';

const project = {
  slug: 'japanese-shrine',
  title: 'Japanese Shrine',
  discipline: 'Environment Design',
  engine: 'Unreal Engine',
  description: 'A traditional Japanese shrine set deep within a forest.',
  overview: 'This environment depicts a traditional Japanese shrine set deep within a forest. I modeled the shrine in Blender, textured it in Substance Painter, and assembled the full scene in Unreal Engine. To enrich the atmosphere, I incorporated Megascans assets for foliage and terrain, sculpting the ground to create natural variation and a sense of immersion. The aim was to balance technical precision with atmospheric storytelling, while managing the complexity of large-scale foliage and terrain interaction.',
  challenge: 'Managing Megascans density proved difficult, as assets sometimes appeared overly sparse or excessively concentrated. Applying wind to trees introduced further issues, with trunks clipping into the ground or overlapping other foliage unnaturally. Terrain sculpting also created placement inconsistencies, where parts of the shrine or trees floated above or sank into the ground, making alignment across uneven terrain a challenge.',
  takeaway: 'This project highlighted the importance of asset distribution control and collision handling when working with Megascans. It reinforced how terrain sculpting directly affects placement accuracy and environmental realism, and emphasized the need for refined workflows to anchor structures consistently within complex landscapes.',
  outcome: 'The final scene strengthened my ability to integrate custom models with Megascans assets into cohesive environments. It demonstrates skill in terrain sculpting, foliage placement, and environmental storytelling, resulting in a shrine-in-forest composition that balances technical execution with atmospheric design.',
  status: 'Completed',
  role: 'Environment Artist',
  tools: ['Blender', 'Substance Painter', 'Unreal Engine'],
  mediaPath: '/japanese-shrine',
  coverImage: '/japanese-shrine/thumbna.png',
  coverImages: ['/japanese-shrine/thumbna.png', '/japanese-shrine/thambna.png', '/japanese-shrine/thumna2.png'],
  images: [
    // Thumbnail variants — all three shown in gallery
    'thumbna.png', 'thambna.png', 'thumna2.png',
    // Section / story images
    'main about.png', 'challenge1.png', 'challenge 2.png',
    'takeaway.png', 'outcome.png', 'hh.png', 'hh1 .png', 'tt.png',
    // Gallery screenshots (only files confirmed present in folder)
    'HighresScreenshot00002.png', 'HighresScreenshot00003.png',
    'HighresScreenshot00006 (2).png', 'HighresScreenshot00008 (2).png',
    'HighresScreenshot00009 (1).png', 'HighresScreenshot00010 (1).png',
    'HighresScreenshot00011 (2).png', 'HighresScreenshot00012 (1).png',
    'HighresScreenshot00014 (1).png', 'HighresScreenshot00016 (1).png',
    'HighresScreenshot00017 (2).png', 'HighresScreenshot00018 (1).png',
    'HighresScreenshot00019 (1).png', 'HighresScreenshot00020 (1).png',
    'HighresScreenshot00021 (1).png', 'HighresScreenshot00022 (1).png',
    'HighresScreenshot00023 (1).png', 'HighresScreenshot00024 (1).png',
    'HighresScreenshot00025 (1).png', 'HighresScreenshot00026 (1).png',
    'HighresScreenshot00028.png', 'HighresScreenshot00030.png',
    'HighresScreenshot00032.png', 'HighresScreenshot00035.png',
    'HighresScreenshot00036.png', 'HighresScreenshot00037.png',
    'HighresScreenshot00038.png', 'HighresScreenshot00039.png',
    'HighresScreenshot00040.png', 'HighresScreenshot00042.png',
  ],
  sectionImages: {
    overview: 'main about.png',
    challenge: ['challenge1.png', 'challenge 2.png'],
    takeaway: 'takeaway.png',
    outcome: 'outcome.png',
  },
  accent: 'gold',
};

export default function JapaneseShinePage() {
  return <ProjectDetailLayout project={project} />;
}
