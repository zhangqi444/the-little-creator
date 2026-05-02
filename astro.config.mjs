// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://zhangqi444.github.io',
  base: '/the-little-creator',

  integrations: [
    starlight({
      title: 'The Little Creator',
      description: 'A community for kids and parents exploring robotics together — FLL, VEX, and beyond.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/zhangqi444/the-little-creator' },
      ],
      editLink: {
        baseUrl: 'https://github.com/zhangqi444/the-little-creator/edit/main/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', link: '/getting-started/' },
            { label: 'What is FLL?', link: '/getting-started/what-is-fll/' },
            { label: 'What is VEX?', link: '/getting-started/what-is-vex/' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Overview', link: '/resources/' },
            { label: 'FLL Resource Map', link: '/resources/fll-resource-map/' },
            { label: 'Software & Tools', link: '/resources/software-tools/' },
            { label: 'Learning Materials', link: '/resources/learning-materials/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Overview', link: '/guides/' },
            { label: 'Forming a Team', link: '/guides/forming-a-team/' },
            { label: 'Planning Your Season', link: '/guides/season-planning/' },
          ],
        },
        {
          label: 'For Educators',
          items: [
            { label: 'Overview', link: '/for-educators/' },
            { label: 'Curriculum Starter', link: '/for-educators/curriculum-starter/' },
            { label: 'Lesson Plan Template', link: '/for-educators/lesson-plan-template/' },
            { label: 'Core Values Rubric', link: '/for-educators/core-values-rubric/' },
          ],
        },
        {
          label: 'Showcase',
          link: '/showcase/',
        },
        {
          label: 'Community',
          items: [
            { label: 'Overview', link: '/community/' },
            { label: 'Find a Team', link: '/community/find-a-team/' },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});
