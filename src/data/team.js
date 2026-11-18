import { cdn } from '@lib/cdn'

export const teamGalleryMeta = {
  title: 'The People Behind the Platform',
  intro:
    "A small team with a big mission — building intelligent software that transforms how automotive businesses operate. Here's a glimpse into who we are and how we work.",
}

export const teamTabs = [
  { id: 'culture',   label: 'Team & Culture' },
  { id: 'team',      label: 'Management'     },
  { id: 'workspace', label: 'Workspace'      },
]

/** Team tab — leadership photos only */
export const teamItems = [
  { id: 't1', src: cdn('/Pictures/team-hq.webp'),      aspect: 'square', caption: 'George K Saju', name: 'George K Saju', role: 'Director',           objectPosition: 'center top', linkedin: 'https://www.linkedin.com/in/george-saju-kuttukaran-33b949111/' },
  { id: 't2', src: cdn('/Pictures/team-product.webp'), aspect: 'square', caption: 'K.I Jojo',      name: 'K.I Jojo',      role: 'Executive Director', linkedin: 'https://www.linkedin.com/in/jojo-k-i-1a6502134/' },
  { id: 't3', src: cdn('/Pictures/Shankar_pic.webp'),  aspect: 'square', caption: 'Shankar',       name: 'Shankar',       role: 'CEO',                linkedin: 'https://www.linkedin.com/in/shankarkrishnamurthy1/' },
]

/** Culture tab — all candid & event photos */
export const cultureItems = [
  { id: 'c1',  src: cdn('/Pictures/team-photo-1.webp'),     aspect: 'wide',   caption: 'Our Team'              },
  { id: 'c2',  src: cdn('/Pictures/team-photo-2.webp'),     aspect: 'wide',   caption: 'Leadership'            },
  { id: 'c3',  src: cdn('/Pictures/culture-photo-1.webp'),  aspect: 'wide',   caption: 'Company Culture'       },
  { id: 'c4',  src: cdn('/Pictures/culture-photo-2.webp'),  aspect: 'tall',   caption: 'Team Moments'          },
  { id: 'c5',  src: cdn('/Pictures/culture-photo-3.webp'),  aspect: 'square', caption: 'Collaboration Session' },
  { id: 'c6',  src: cdn('/Pictures/culture-photo-8.webp'),  aspect: 'wide',   caption: 'Behind the Scenes'     },
  { id: 'c7',  src: cdn('/Pictures/culture-photo-9.webp'),  aspect: 'square', caption: 'Team Hangout'          },
  { id: 'c8',  src: cdn('/Pictures/culture-photo-10.webp'), aspect: 'wide',   caption: 'Building Together'     },
  { id: 'c9',  src: cdn('/Pictures/culture-photo-11.webp'), aspect: 'square', caption: 'Team Spirit'           },
]

/** Workspace tab — office space photos only */
export const workspaceItems = [
  { id: 'w1', src: cdn('/Pictures/culture-photo-4.webp'), aspect: 'wide',   caption: 'Office Life'    },
  { id: 'w2', src: cdn('/Pictures/culture-photo-5.webp'), aspect: 'square', caption: 'Our Space'      },
  { id: 'w3', src: cdn('/Pictures/culture-photo-6.webp'), aspect: 'square', caption: 'Work in Motion' },
  { id: 'w4', src: cdn('/Pictures/culture-photo-7.webp'), aspect: 'wide',   caption: 'The Studio'     },
]
