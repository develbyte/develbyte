import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Develbyte',
  tagline: 'Engineering, Process, and Career Notes',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://develbyte.in',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain, use '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'im-naren', // Usually your GitHub org/user name.
  projectName: 'develbyte', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Security headers for enhanced HTTPS security
  // GitHub Pages automatically handles HTTPS enforcement and security headers

  presets: [
    [
      'classic',
      {
        docs: false, // Docs disabled - using blog only
        blog: {
          routeBasePath: '/', // Blog at root
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          authorsMapPath: 'authors.yml',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          // Disable blog sidebar (Recent Posts on left)
          blogSidebarCount: 0,
          // Add custom admonition for TLDR
          admonitions: {
            keywords: ['tldr'],
            extendDefaults: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'static/img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    markdown: {
      mermaid: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Develbyte Logo',
        src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iI0ZGRkY2NiIvPgo8dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iIzFBMUExQSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REVWRUxCWVRFPC90ZXh0Pgo8L3N2Zz4=',
        href: '/',
      },
      hideOnScroll: false,
      items: [
        {to: '/about', label: 'About', position: 'left'},
        {to: '/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/im-naren',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://linkedin.com/in/im-naren',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Navigation',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'Blog',
              to: '/',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/im-naren',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/im-naren',
            },
            {
              label: 'Email',
              href: 'mailto:naren.dubey@zoho.com',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'RSS Feed',
              to: '/rss.xml',
            },
            {
              label: 'Atom Feed',
              to: '/atom.xml',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Narendra Dubey. Built with Docusaurus. Styling inspired by ClickHouse.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'python', 'bash', 'json', 'sql'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
