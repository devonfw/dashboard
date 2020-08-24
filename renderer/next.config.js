module.exports = {
  exportPathMap() {
    // Let Next.js know where to find the entry page
    // when it's exporting the static bundle for the use
    // in the production version of your app
    return {
      '/project-creation': { page: '/project-creation' },
      '/home': { page: '/home' },
      '/ides': { page: '/ides' },
      '/settings/installed-versions': { page: '/settings/installed-versions' },
      '/projects': { page: '/projects' },
      '/repositories': { page: '/repositories' },
      '/wiki': { page: '/wiki' },
    };
  },
};
