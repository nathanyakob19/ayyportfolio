import ProjectDetailLayout from './ProjectDetailLayout';

const project = {
  slug: 'moroccan-riad',
  title: 'Moroccan Riad',
  discipline: 'Environment Design',
  engine: 'Unreal Engine',
  description: 'A realistic Moroccan riad interior study focused on intricate architecture and atmospheric lighting.',
  overview: 'This project focuses on building a realistic Moroccan riad interior, with the goal of capturing the intricate geometry, decorative details, and atmospheric lighting that define traditional riad architecture. I modeled the structural elements in Blender, textured them in Substance Painter, and attempted to bring the assets into Unreal Engine for assembly.',
  challenge: 'The project has been difficult to stabilize. Face orientation errors in Blender created shading problems that were not fully resolved, and mesh exports often failed to transfer correctly into Unreal Engine. UV editing has been a major obstacle — textures appeared correct in Substance Painter but did not display properly once imported into Unreal, suggesting underlying UV issues. Unreal Engine also crashed multiple times during asset imports, preventing successful scene assembly despite repeated attempts.',
  takeaway: 'This ongoing work has emphasized the importance of clean mesh preparation and reliable UV workflows before moving assets between software. It has shown how even small orientation or UV errors can cascade into major problems across the pipeline. The repeated failures have reinforced the need for systematic troubleshooting, optimization, and patience when handling complex architectural environments.',
  outcome: 'Although the riad has not yet been successfully assembled in Unreal Engine, the project has already deepened my understanding of cross-software asset pipelines and highlighted critical areas for improvement in UV editing and export reliability. It remains a work in progress, with the next steps focused on stabilizing imports and achieving consistent texture display.',
  status: 'Ongoing',
  progressNote: 'Work in progress',
  role: 'Environment Artist',
  tools: ['Blender', 'Substance Painter', 'Unreal Engine'],
  coverImage: '/Moroccan Riad/thumbnail.png',
  mediaPath: '/Moroccan Riad',
  images: [
    '1.png', '3.png', '4.png', 'para1.png', 'para4.png',
    'Screenshot 2026-04-16 193341.png', 'Screenshot 2026-04-16 193402.png',
    'Screenshot 2026-06-08 100524.png', 'Screenshot 2026-09-01 172647.png',
    'Screenshot 2026-09-01 172738.png', 'Screenshot 2026-09-01 172802.png',
    'Screenshot 2026-09-01 172829.png', 'about.png', 'challenges.png', 'end.png', 'outcome.png', 'takeaway.png',
  ],
  sectionImages: { overview: 'about.png', challenge: 'challenges.png', takeaway: 'takeaway.png', outcome: 'outcome.png' },
  accent: 'coral',
};

export default function MoroccanRiadPage() {
  return <ProjectDetailLayout project={project} />;
}
