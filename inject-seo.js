const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend/src/pages');

const pages = [
  { file: 'HomePage.jsx', title: 'Home' },
  { file: 'AboutPage.jsx', title: 'About Us' },
  { file: 'EventsPage.jsx', title: 'Events' },
  { file: 'StaffPage.jsx', title: 'Staff' },
  { file: 'FacilitiesPage.jsx', title: 'Facilities' },
  { file: 'GalleryPage.jsx', title: 'Gallery' },
  { file: 'ContactPage.jsx', title: 'Contact Us' },
  { file: 'AdmissionPage.jsx', title: 'Admissions' }
];

pages.forEach(({ file, title }) => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import if not present
    if (!content.includes('import SEO from')) {
      content = `import SEO from '../components/SEO';\n` + content;
    }

    // Inject SEO component after the main return
    // Simple regex to find return ( <...
    const returnRegex = /return\s*\(\s*(<[a-zA-Z0-9_]+[^>]*>|<Fragment>|<>)/;
    const match = content.match(returnRegex);

    if (match && !content.includes('<SEO title=')) {
      const tagEndIndex = match.index + match[0].length;
      content = content.slice(0, tagEndIndex) + `\n      <SEO title="${title}" />` + content.slice(tagEndIndex);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Injected SEO into ${file}`);
    } else {
      console.log(`Could not find proper insertion point in ${file} or already injected`);
    }
  } else {
    console.log(`${file} not found`);
  }
});
