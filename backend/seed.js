const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Admin = require('./models/Admin');
const Announcement = require('./models/Announcement');
const Event = require('./models/Event');
const Staff = require('./models/Staff');
const Gallery = require('./models/Gallery');
const Facility = require('./models/Facility');
const Club = require('./models/Club');
const img = (n) => `/events/${n}`;

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Announcement.deleteMany({});
    await Event.deleteMany({});
    await Staff.deleteMany({});
    await Gallery.deleteMany({});
    await Facility.deleteMany({});
    await Club.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await Admin.create({ username: 'admin', password: hashedPassword });
    console.log('👤 Admin created — username: admin | password: admin123');

    // Seed Announcements
    await Announcement.insertMany([
      {
        title: 'School Reopening — Academic Year 2024-25',
        content: 'We are pleased to announce that school will reopen on June 10th, 2024. All students are expected to report by 8:30 AM in full uniform.',
        date: new Date('2024-06-01'),
      },
      {
        title: 'Annual Day Celebrations',
        content: 'Our Annual Day celebration will be held on July 20th, 2024. Parents and guardians are cordially invited to attend.',
        date: new Date('2024-06-15'),
      },
      {
        title: 'Fee Submission Deadline',
        content: 'The last date for first-term fee submission is July 5th, 2024. Please ensure timely payment to avoid late fees.',
        date: new Date('2024-06-20'),
      },
    ]);
    console.log('📢 Announcements seeded');

    // Seed Events
    // Seed Events
await Event.insertMany([
  // ---- Dated events ----
  {
    title: 'Flagpole (Kodimaram) Inauguration',
    date: new Date('2022-10-11'),
    imageUrl: img('ev01.jpeg'),
  },
  {
    title: 'Kalotsavam — Sanskrit UP Overall First (Trophy)',
    date: new Date('2022-11-20'),
    imageUrl: img('ev37.jpeg'),
  },
  {
    title: 'Vegetable Harvest',
    date: new Date('2022-12-22'),
    imageUrl: img('ev33.jpeg'),
  },
  {
    title: 'Chicks Distribution to Students',
    date: new Date('2023-03-06'),
    imageUrl: img('ev36.jpeg'),
  },
  {
    title: 'Environment Day — Tree Planting',
    date: new Date('2023-06-07'),
    imageUrl: img('ev25.jpeg'),
  },
  {
    title: 'Vegetable Cultivation Begins',
    date: new Date('2023-07-26'),
    imageUrl: img('ev26.jpeg'),
  },
  {
    title: 'Two Recognitions — Best Student & Teacher Farmer Awards',
    date: new Date('2023-08-18'),
    imageUrl: img('ev22.jpeg'),
  },
  {
    title: 'Students Install Safety Net on Koovakkudi Bridge',
    date: new Date('2023-09-20'),
    imageUrl: img('ev29.jpeg'),
  },
  {
    title: 'Millet Cultivation Inauguration',
    date: new Date('2023-10-07'),
    imageUrl: img('ev27.jpeg'),
  },
  {
    title: 'Paddy (Karanel) Cultivation',
    date: new Date('2023-10-28'),
    imageUrl: img('ev20.jpeg'),
  },
  {
    title: 'Love Plastic Project Launched',
    date: new Date('2023-11-04'),
    imageUrl: img('ev23.jpeg'),
  },
  {
    title: 'Seed Students Clean Water Sources',
    date: new Date('2024-02-08'),
    imageUrl: img('ev16.jpeg'),
  },
  {
    title: 'Seed Club Inaugurated',
    date: new Date('2024-06-19'),
    imageUrl: img('ev18.jpeg'),
  },
  {
    title: "'Oru Vallam Poovu' Onam Flower Project",
    date: new Date('2024-07-23'),
    imageUrl: img('ev17.jpeg'),
  },
  {
    title: 'Gandhi Jayanti Road Cleaning',
    date: new Date('2024-10-03'),
    imageUrl: img('ev15.jpeg'),
  },
  {
    title: "Nallapaadam Friends Build 'Gopalavanam' Garden",
    date: new Date('2024-12-19'),
    imageUrl: img('ev39.jpeg'),
  },
  {
    title: 'Cloth Bags Against Plastic — Seed Club',
    date: new Date('2024-12-20'),
    imageUrl: img('ev12.jpeg'),
  },
  {
    title: "'PSNM@50' CD Release",
    date: new Date('2025-07-13'),
    imageUrl: img('ev06.jpeg'),
  },
  {
    title: 'Banana Cultivation Harvest',
    date: new Date('2025-08-20'),
    imageUrl: img('ev05.jpeg'),
  },
  {
    title: 'Seed Club Members Visit Post Office',
    date: new Date('2025-10-10'),
    imageUrl: img('ev02.jpeg'),
  },
  {
    title: 'Environmental Protection Rally',
    date: new Date('2025-11-16'),
    imageUrl: img('ev07.jpeg'),
  },
  {
    title: 'Mathrubhumi Love Plastic Project',
    date: new Date('2026-02-23'),
    imageUrl: img('ev11.jpeg'),
  },
  {
    title: "Golden Jubilee — 'Dalamarmaram 2026'",
    date: new Date('2026-03-13'),
    imageUrl: img('ev08.jpeg'),
  },
  {
    title: 'Headmistress G.R. Sreelekha Retires',
    date: new Date('2026-06-04'),
    imageUrl: img('ev14.jpeg'),
  },
  {
    title: 'Manorama Nallapaadam Club Inaugurated',
    date: new Date('2026-06-12'),
    imageUrl: img('ev09.jpeg'),
  },
  {
    title: 'Seed Club Activities Begin',
    date: new Date('2026-06-16'),
    imageUrl: img('ev03.jpeg'),
  },
  {
    title: 'Reading Month (Vayana Masam) Begins',
    date: new Date('2026-06-23'),
    imageUrl: img('ev41.jpeg'),
  },

  // ---- Undated events ----
  {
    title: 'Yoga Day Observance',
    date: null,
    imageUrl: img('ev04.jpeg'),
  },
  {
    title: 'General Arabic Sanskritotsavam',
    date: null,
    imageUrl: img('ev10.jpeg'),
  },
  {
    title: 'Kalotsavam — Sanskrit Overall First',
    date: null,
    imageUrl: img('ev19.jpeg'),
  },
  {
    title: 'Net Tied on Koovakkudi Bridge (Nallapaadam)',
    date: null,
    imageUrl: img('ev21.jpeg'),
  },
  {
    title: 'Sanskrit Day Celebration',
    date: null,
    imageUrl: img('ev24.jpeg'),
  },
  {
    title: 'Panchayat-level Yoga Day',
    date: null,
    imageUrl: img('ev28.jpeg'),
  },
  {
    title: "Short Film — Teacher's 4th State Award",
    date: null,
    imageUrl: img('ev30.jpeg'),
  },
  {
    title: 'Sanskrit School Short Film — State First Prize',
    date: null,
    imageUrl: img('ev31.jpeg'),
  },
  {
    title: "'Mamasoubhagyam' Bags Best Short Film Award",
    date: null,
    imageUrl: img('ev34.jpeg'),
  },
  {
    title: "'Shivoham' Sanskrit Film — Award Winner",
    date: null,
    imageUrl: img('ev35.jpeg'),
  },
  {
    title: 'Environment Day at Malayoram — Tree Planting',
    date: null,
    imageUrl: img('ev38.jpeg'),
  },
  {
    title: 'Sravana Purnima Sanskrit Day',
    date: null,
    imageUrl: img('ev40.jpeg'),
  },
]);

console.log('📅 Events seeded');

    // Seed Staff
    await Staff.insertMany([
      {
        name: 'Dr. Priya Nair',
        role: 'Principal',
        department: 'Administration',
        bio: 'Dr. Priya Nair has over 25 years of experience in education and holds a PhD in Educational Leadership from the University of Kerala.',
        imageUrl: 'https://placehold.co/300x300?text=Dr.+Priya+Nair',
      },
      {
        name: 'Mr. Rajesh Menon',
        role: 'Vice Principal',
        department: 'Administration',
        bio: 'Mr. Rajesh Menon is a seasoned educator with 18 years of teaching experience in Mathematics and Science.',
        imageUrl: 'https://placehold.co/300x300?text=Mr.+Rajesh+Menon',
      },
      {
        name: 'Mrs. Anitha Kumar',
        role: 'Head of Department',
        department: 'English & Languages',
        bio: 'Mrs. Anitha Kumar leads the English Department and has authored two textbooks on communicative English for secondary school students.',
        imageUrl: 'https://placehold.co/300x300?text=Mrs.+Anitha+Kumar',
      },
      {
        name: 'Mr. Suresh Pillai',
        role: 'Senior Teacher',
        department: 'Mathematics',
        bio: 'Mr. Suresh Pillai specializes in competitive exam coaching and has guided over 200 students to top ranks in national olympiads.',
        imageUrl: 'https://placehold.co/300x300?text=Mr.+Suresh+Pillai',
      },
      {
        name: 'Ms. Divya Krishnan',
        role: 'Physical Education Teacher',
        department: 'Sports & Physical Education',
        bio: 'Ms. Divya Krishnan is a national-level athlete who now dedicates herself to nurturing young sporting talent at the school.',
        imageUrl: 'https://placehold.co/300x300?text=Ms.+Divya',
      },
      {
        name: 'Mr. Arun Varma',
        role: 'Lab Coordinator',
        department: 'Science',
        bio: 'Mr. Arun Varma oversees all laboratory activities and has introduced project-based learning in the science curriculum.',
        imageUrl: 'https://placehold.co/300x300?text=Mr.+Arun+Varma',
      },
    ]);
    console.log('👩‍🏫 Staff seeded');

    // Seed Gallery (Fixed with new fileType and driveFileId properties)
    await Gallery.insertMany([
      { title: 'Annual Sports Day 2023', category: 'Sports', imageUrl: 'https://placehold.co/600x400?text=Sports+Day', fileType: 'image', driveFileId: 'seeded_dummy_id_1' },
      { title: 'Science Fair Winners', category: 'Academics', imageUrl: 'https://placehold.co/600x400?text=Science+Fair', fileType: 'image', driveFileId: 'seeded_dummy_id_2' },
      { title: 'Cultural Fest Performances', category: 'Cultural', imageUrl: 'https://placehold.co/600x400?text=Cultural+Fest', fileType: 'image', driveFileId: 'seeded_dummy_id_3' },
      { title: 'Graduation Ceremony 2023', category: 'Events', imageUrl: 'https://placehold.co/600x400?text=Graduation', fileType: 'image', driveFileId: 'seeded_dummy_id_4' },
      { title: 'Library Reading Week', category: 'Academics', imageUrl: 'https://placehold.co/600x400?text=Library+Week', fileType: 'image', driveFileId: 'seeded_dummy_id_5' },
    ]);
    console.log('🖼️  Gallery seeded');

    // Seed Facilities
    await Facility.insertMany([
      {
        order: 1,
        name: 'School Bus Services',
        icon: '🚌',
        tag: 'Transport',
        description: 'Safe and reliable school bus transport connecting students across the region to campus every day.',
        shortDescription: 'Safe and reliable school bus transport connecting students across the region to campus every day.',
        longDescription: 'PSNM UP School operates two dedicated school buses (KL 01 BC 489 & KL 21 Y 5430) serving students across multiple routes. The buses are well-maintained, follow strict safety guidelines, and ensure every child reaches school and returns home safely. Supervised by responsible staff on board.',
        bullets: [
          'Two dedicated school buses in operation',
          'Multiple routes covering the local region',
          'Staff supervision on all bus routes',
          'Strict safety and punctuality standards',
          'Reliable morning and afternoon services',
        ],
        imageUrl: '/images/facilities/school-bus.jpg',
        accent: 'linear-gradient(90deg,#F59E0B,#FBBF24)',
        glow: 'rgba(245,158,11,0.12)',
        iconBg: 'rgba(245,158,11,0.10)',
        tagColor: '#D97706',
      },
      {
        order: 2,
        name: 'Library',
        icon: '📚',
        tag: 'Academics',
        description: 'A vibrant reading space with a rich collection of books across subjects — nurturing a lifelong love of learning.',
        shortDescription: 'A vibrant reading space with a rich collection of books across subjects — nurturing a lifelong love of learning.',
        longDescription: 'Our school library is an active knowledge hub. Books are categorized by subject — Hindi, Malayalam, Social Science, and more — making it easy for students to explore topics both inside and beyond their curriculum. Inspiring quotes on the walls remind every student that "Libraries are the gateway to knowledge."',
        bullets: [
          'Extensive collection spanning all subjects',
          'Subject-wise organized shelving — Hindi, Malayalam, Social Science & more',
          'Quiet reading corners and study zones',
          'Reading campaigns and book review sessions',
          'Dedicated library periods for all grades',
        ],
        imageUrl: '/images/facilities/library.jpg',
        accent: 'linear-gradient(90deg,#2563EB,#3B82F6)',
        glow: 'rgba(37,99,235,0.12)',
        iconBg: 'rgba(37,99,235,0.10)',
        tagColor: '#2563EB',
      },
      {
        order: 3,
        name: 'IT Lab',
        icon: '💻',
        tag: 'Technology',
        description: 'A fully equipped computer lab where students develop digital literacy and explore technology-integrated learning.',
        shortDescription: 'A fully equipped computer lab where students develop digital literacy and explore technology-integrated learning.',
        longDescription: 'The IT Lab at PSNM UP School bridges traditional education with the digital world. Students use computers for curriculum-aligned activities, practice typing, access e-learning resources, and develop foundational coding and digital literacy skills under guided supervision.',
        bullets: [
          'Computers available for every student',
          'Curriculum-aligned digital learning activities',
          'e-Learning and ICT resource access',
          'Digital literacy and basic coding sessions',
          'Safe, supervised internet environment',
        ],
        imageUrl: '/images/facilities/it-lab.jpg',
        accent: 'linear-gradient(90deg,#7C3AED,#A78BFA)',
        glow: 'rgba(124,58,237,0.12)',
        iconBg: 'rgba(124,58,237,0.10)',
        tagColor: '#7C3AED',
      },
      {
        order: 4,
        name: 'Science Lab',
        icon: '🔬',
        tag: 'Science',
        description: 'Hands-on science experiments and practical activities that bring classroom concepts to life.',
        shortDescription: 'Hands-on science experiments and practical activities that bring classroom concepts to life.',
        longDescription: 'The Science Lab gives students direct, hands-on experience with scientific concepts. Equipped with basic lab apparatus and materials, students conduct experiments in physics, chemistry, and biology — moving beyond textbooks to discover science through observation and inquiry.',
        bullets: [
          'Physics, chemistry, and biology experiments',
          'Hands-on practical sessions every week',
          'Lab apparatus and specimen collections',
          'Project-based and inquiry-driven learning',
          'Supervised by dedicated lab staff',
        ],
        imageUrl: '/images/facilities/science-lab.jpg',
        accent: 'linear-gradient(90deg,#10B981,#34D399)',
        glow: 'rgba(16,185,129,0.12)',
        iconBg: 'rgba(16,185,129,0.10)',
        tagColor: '#059669',
      },
    ]);
    console.log('🏫 Facilities seeded (4 real facilities)');

    // Seed Clubs
    await Club.insertMany([
      // Main / Active Clubs
      { order: 1, category: 'main', name: 'Seed Club', icon: '🌱', description: 'Promotes agricultural awareness and sustainable practices through hands-on gardening, vegetable cultivation, and seed conservation activities. Students learn the full cycle of growing food and the value of environmental stewardship.' },
      { order: 2, category: 'main', name: 'Nalla Paadam', icon: '📰', description: 'A Manorama-initiated reading and media literacy programme that encourages students to engage with current news, develop critical reading habits, and participate in journalism activities — building informed and thoughtful young citizens.' },
      { order: 3, category: 'main', name: 'Eco Club', icon: '♻️', description: 'Also known as the Paristhiti Club, this group leads environmental conservation through tree planting, waste management, and eco-awareness campaigns — inspiring students to take active responsibility for the planet.' },
      { order: 4, category: 'main', name: 'Health Club', icon: '🏥', description: 'Promotes physical and mental wellness through health check-up camps, hygiene drives, yoga sessions, and awareness programmes on nutrition and first aid — empowering students to lead healthy, active lives.' },
      { order: 5, category: 'main', name: 'Vidhyarangam', icon: '🎨', description: 'A cultural and creative arts club that nurtures student talents in performing arts, fine arts, and literary activities — organising intra-school competitions and cultural events that celebrate every student\'s creativity.' },
      { order: 6, category: 'main', name: 'Sanskrit Club', icon: '📜', description: 'Dedicated to preserving and promoting the Sanskrit language through spoken sessions, shloka recitations, cultural performances, and Kalotsavam competitions — keeping this ancient language alive and vibrant.' },
      // Sub Clubs
      { order: 7, category: 'sub', name: 'Manjadi Club', icon: '🔴', description: 'Named after the vibrant Manjadi seed, this club focuses on biodiversity awareness and nature-based learning activities — connecting students with the rich natural heritage of Kerala.' },
      { order: 8, category: 'sub', name: 'Arabic Club', icon: '🌙', description: 'Promotes the Arabic language and culture through interactive lessons, calligraphy sessions, and participation in cultural competitions — celebrating linguistic diversity.' },
      { order: 9, category: 'sub', name: 'Sports Club', icon: '⚽', description: 'Coordinates all sports activities — from daily physical education to inter-school competitions in football, kabaddi, athletics, and more — building teamwork, discipline, and sporting spirit.' },
      { order: 10, category: 'sub', name: 'Suchitwa Club', icon: '🧹', description: 'Leads cleanliness and hygiene initiatives across campus, organising Suchitwa Missions and maintaining a clean, green school environment that everyone can be proud of.' },
      { order: 11, category: 'sub', name: 'PSNM Radio FM', icon: '📻', description: 'The school\'s own radio programme where students anchor, produce, and broadcast daily content — building communication skills, confidence, and a real sense of media production.' },
      { order: 12, category: 'sub', name: 'English Club', icon: '🗣️', description: 'Enhances English language proficiency through debates, story-telling, elocution, and interactive communication activities — preparing students to express themselves confidently in English.' },
      { order: 13, category: 'sub', name: 'Maths Club', icon: '📐', description: 'Makes mathematics engaging through puzzles, Olympiad preparation, maths fairs, and problem-solving challenges — helping students discover the joy and beauty of numbers.' },
      { order: 14, category: 'sub', name: 'Hindi Club', icon: '🪔', description: 'Promotes Hindi language learning and appreciation through creative writing, recitation, and participation in national Hindi events — strengthening students\' command of the national language.' },
      { order: 15, category: 'sub', name: 'Arts Club', icon: '🎭', description: 'A creative space for drawing, painting, craft, and visual arts — fostering imagination and artistic expression that enriches the cultural life of the school.' },
      { order: 16, category: 'sub', name: 'Work Experience Club', icon: '🔧', description: 'Develops practical life skills through hands-on vocational activities and real-world work simulations — preparing students for everyday challenges with competence and confidence.' },
      { order: 17, category: 'sub', name: 'Jala Samrudhi Club', icon: '💧', description: 'Focuses on water conservation awareness, rainwater harvesting, and responsible water use through campaigns and community outreach — instilling a deep respect for this precious resource.' },
      { order: 18, category: 'sub', name: 'Suraksha Club', icon: '🛡️', description: 'Promotes safety awareness — road safety, disaster preparedness, and personal security — empowering students to be responsible, alert, and safety-conscious citizens.' },
      { order: 19, category: 'sub', name: 'Yodhav Club', icon: '🏋️', description: 'A fitness and physical empowerment club that builds strength, resilience, and team spirit through structured physical training and fitness challenges.' },
      { order: 20, category: 'sub', name: 'e@Vidhya ID', icon: '🖥️', description: 'A digital identity and e-learning initiative helping students build their online learning profiles, access digital resources, and participate in e-governance programmes — preparing them for a digital future.' },
      { order: 21, category: 'sub', name: 'Social Science Club', icon: '🌍', description: 'Brings social science to life through field visits, map activities, debates on current affairs, and community projects — connecting classroom learning to the real world.' },
      { order: 22, category: 'sub', name: 'Energy Club', icon: '⚡', description: 'Raises awareness about energy conservation, renewable energy sources, and sustainable living through projects, science fairs, and awareness campaigns — inspiring the next generation of green thinkers.' },
    ]);
    console.log('🎭 Clubs seeded (22 clubs)');

    console.log('\n✅ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seed();