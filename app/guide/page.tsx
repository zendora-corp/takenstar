'use client';

import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
  Divider,
  Link as MUILink,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from '@mui/material';
import NavigationBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

// -----------------------------
// Content (from your plain text)
// -----------------------------

const meta = {
  title: 'Takenstar Talent Search — Complete Guide',
  subtitle: 'Syllabus, Sample Questions & Preparation',
  examDate: '2 November 2025',
  categories: ['Junior 6–8', 'Senior 9–12'],
  duration: '60 minutes • MCQs',
  rewards: '1st ₹12,000 • 2nd ₹8,400 • 3rd ₹6,000 • Top 100 Merit',
  lastUpdated: 'Oct 21, 2025',
  languages: 'Assamese / English',
  venueMode: 'Offline',
  pattern: 'MCQ-based, 60 questions, 60 minutes',
  fee: '₹200 per student (online/offline options)',
};

const about = {
  blurb:
    'The Takenstar Talent Search is organized by Takenstar Education & Technology to identify academic and logical talent across Assam. The test is objective (MCQ) and tests school syllabus, reasoning, and general awareness.',
  table: [
    { category: 'Junior Scholar', classes: '6–8', mode: 'Offline', duration: '60 mins' },
    { category: 'Senior Scholar', classes: '9–12', mode: 'Offline', duration: '60 mins' },
  ],
};

const syllabus = {
  junior: [
    { h: 'General Knowledge', t: 'Assam, India, Current Affairs basics' },
    { h: 'Mathematics', t: 'Arithmetic, Fractions, Basic Geometry, Number System' },
    { h: 'Science', t: 'Fundamental Physics, Chemistry, Biology topics from class curriculum' },
    { h: 'Reasoning', t: 'Series, Analogy, Odd-one-out, Basic puzzles' },
    { h: 'English / Assamese', t: 'Grammar, Short Comprehension' },
    { h: 'Computer Awareness', t: 'Basic parts of a computer, MS Office, Internet basics' },
  ],
  senior: [
    { h: 'General Knowledge', t: 'National & regional current affairs, important facts' },
    { h: 'Reasoning', t: 'Advanced series, coding-decoding, logical puzzles' },
    { h: 'Quantitative Aptitude', t: 'Algebra basics, Percentage, Ratio, Simple equations' },
    { h: 'Science', t: 'Conceptual questions from Physics, Chemistry, Biology' },
    { h: 'Computer Awareness', t: 'Hardware vs Software, Cyber Safety, Basic AI concepts' },
    { h: 'English', t: 'Grammar, Para-jumble, Comprehension' },
  ],
};

const downloads = [
  { label: 'Full Syllabus (PDF)', href: '#' },
  { label: 'Sample Questions (PDF)', href: '#samples' },
  { label: 'Exam Schedule', href: '#' },
  { label: 'Registration Form', href: '#register' },
];

const sampleQuestions = [
  {
    tag: 'Reasoning — Q1',
    question: 'Find the missing number: 3, 6, 12, 24, ?',
    options: ['36', '40', '48', '50'],
    answer: '48',
    explanation: 'Pattern: each term ×2.',
  },
  {
    tag: 'Math — Q2',
    question: 'What is 35% of 240?',
    options: ['70', '84', '96', '102'],
    answer: '84',
    explanation: 'Calculation: 240 × 0.35 = 84.',
  },
  {
    tag: 'Computer — Q3',
    question: 'What does CPU stand for?',
    options: undefined,
    answer: 'Central Processing Unit',
    explanation: '',
  },
  {
    tag: 'GK — Q4',
    question: 'Kaziranga National Park is famous for — ?',
    options: undefined,
    answer: 'One-horned rhinoceros',
    explanation: '',
  },
];

const reasoningSnippets = [
  { h: 'Number Series', t: '2, 6, 12, 20, ?  → Pattern: +4, +6, +8 → Next +10 → 30' },
  { h: 'Analogy', t: 'Eye : See :: Ear : Hear' },
  { h: 'Odd One Out', t: 'Apple, Mango, Banana, Potato → Potato (vegetable)' },
  { h: 'Coding-Decoding', t: 'CAT = 24, DOG = 26 → Sum of letter positions (A=1)' },
];

const prepTips = [
  'Study NCERT basics for your class level.',
  'Spend 20–30 minutes daily on reasoning puzzles.',
  'Read short GK updates (local + national).',
  'Revise computer fundamentals and shortcuts.',
  'Attempt weekly mock papers and time yourself.',
];

const weeklyPlan = [
  { day: 'Mon', focus: 'GK & Current Affairs' },
  { day: 'Tue', focus: 'Reasoning' },
  { day: 'Wed', focus: 'Mathematics' },
  { day: 'Thu', focus: 'Science' },
  { day: 'Fri', focus: 'English' },
  { day: 'Sat', focus: 'Computer Awareness' },
  { day: 'Sun', focus: 'Full Mock Test' },
];

const faqs = [
  { q: 'Who can participate?', a: 'Students in classes 6 to 12 (any board) may register.' },
  { q: 'How to register?', a: 'Use the Register button on this page or contact your school to register collectively.' },
  { q: 'Exam pattern?', a: meta.pattern },
  { q: 'Registration fee?', a: meta.fee },
];

const teacher = {
  note:
    'Schools can register as a group to receive school partner benefits and early result access.',
  mailSchool:
    'mailto:info@takenstartalentsearch.com?subject=School%20Registration',
  mailStudent:
    '/registration',
  contactAnchor: '/contact',
  examNote:
    'Carry Admit Card and School ID on exam day. Admit cards will be sent to registered emails and available for download one week before the exam.',
};

const contacts = {
  org: 'Takenstar Education & Technology',
  address: 'Gelakey, Sivasagar, Assam',
  phonePrimary: '6002071575',
  phoneAlt: '7002742502',
  email: 'info@takenstartalentsearch.com',
  website: 'www.takenstartalentsearch.com',
};

// -----------------------------
// Page
// -----------------------------

export default function GuidePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavigationBar />
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography
              variant="h2"
              align="center"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, mb: 1 }}
            >
              {meta.title}
            </Typography>
            <Typography
              align="center"
              sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: 'text.secondary', mb: 3 }}
            >
              {meta.subtitle}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
              <Grid>
                <Chip label={`Exam Date: ${meta.examDate}`} />
              </Grid>
              <Grid>
                <Chip label={meta.duration} />
              </Grid>
              <Grid>
                <Chip label={`Mode: ${meta.venueMode}`} />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={1} justifyContent="center" sx={{ flexWrap: 'wrap', mb: 2 }}>
              {meta.categories.map((c) => (
                <Chip key={c} label={c} variant="outlined" />
              ))}
            </Stack>

            <Typography align="center" sx={{ color: 'text.secondary', mb: 4 }}>
              <strong>Rewards:</strong> {meta.rewards}
            </Typography>
          </motion.div>

          {/* About */}
          <Section title="About the Exam">
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              {about.blurb}
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  {about.table.map((row) => (
                    <Grid key={row.category} size={{ xs: 12, md: 6 }}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'background.paper' }}>
                        <Typography variant="subtitle1" fontWeight={700}>{row.category}</Typography>
                        <Typography variant="body2" color="text.secondary">Classes: {row.classes}</Typography>
                        <Typography variant="body2" color="text.secondary">Mode: {row.mode}</Typography>
                        <Typography variant="body2" color="text.secondary">Duration: {row.duration}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Section>

          {/* Syllabus */}
          <Section title="📚 Detailed Syllabus" subtitle={`Last updated: ${meta.lastUpdated} • Language: ${meta.languages}`}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 7 }}>
                <AccordionBlock title="Junior Scholar (Class 6–8)">
                  <ListBullets items={syllabus.junior.map((x) => `• ${x.h}: ${x.t}`)} />
                </AccordionBlock>

                <AccordionBlock title="Senior Scholar (Class 9–12)">
                  <ListBullets items={syllabus.senior.map((x) => `• ${x.h}: ${x.t}`)} />
                </AccordionBlock>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                      Downloads & Quick Links
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {downloads.map((d) => (
                        <MUILink key={d.label} href={d.href} underline="hover">
                          {d.label}
                        </MUILink>
                      ))}
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Files will be updated regularly. Check back often.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Section>

          {/* Sample Questions */}
          <Section id="samples" title="🧩 Sample Questions" subtitle="Model questions to understand style & difficulty.">
            <Stack spacing={2}>
              {sampleQuestions.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Accordion sx={{ borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ mr: 1 }}>
                        {q.tag}.
                      </Typography>
                      <Typography variant="subtitle1">{q.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {q.options && (
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
                          {q.options.map((opt) => (
                            <Chip key={opt} label={opt} variant="outlined" />
                          ))}
                        </Stack>
                      )}
                      <Typography variant="body1" sx={{ mb: q.explanation ? 0.5 : 0 }}>
                        <strong>Answer:</strong> {q.answer}
                      </Typography>
                      {q.explanation && (
                        <Typography variant="body2" color="text.secondary">
                          {q.explanation}
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              ))}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3, gap:2, flexWrap: 'wrap' }}>
              <Button variant="contained" href="/registration">📝 Register Now</Button>
              <Button variant="outlined" href="#">📥 Download All Sample Questions (PDF)</Button>
            </Stack>
          </Section>

          {/* Reasoning — Explained */}
          <Section title="🧩 Logical Reasoning — Explained" subtitle="Short examples and quick tricks to practice daily.">
            <Grid container spacing={2}>
              {reasoningSnippets.map((r) => (
                <Grid key={r.h} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                        {r.h}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">{r.t}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>

          {/* Preparation Tips & Plan */}
          <Section title="📘 Preparation Tips & 7-Day Plan" subtitle="Follow fundamentals. Avoid last-minute cramming. Practice consistently.">
            <ListBullets items={prepTips} />
            <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Suggested Weekly Focus</Typography>
            <Card variant="outlined">
              <Table size="small" aria-label="weekly plan">
                <TableBody>
                  {weeklyPlan.map((r) => (
                    <TableRow key={r.day}>
                      <TableCell sx={{ width: 120, fontWeight: 700 }}>{r.day}</TableCell>
                      <TableCell>{r.focus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Section>

          {/* Downloads */}
          <Section title="📥 Downloads">
            <Stack spacing={1} sx={{ mb: 1 }}>
              <MUILink href="#">Full Syllabus (PDF)</MUILink>
              <MUILink href="#">Sample Paper (PDF)</MUILink>
              <MUILink href="#">Preparation Guide (PDF)</MUILink>
            </Stack>
            <Typography variant="body2" color="text.secondary">Files will be updated regularly. Check back often.</Typography>
          </Section>

          {/* FAQs */}
          <Section title="❓ Frequently Asked Questions">
            {faqs.map((f, i) => (
              <Accordion
                key={i}
                sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {f.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }} color="text.secondary">
                    {f.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Section>

          {/* Teacher Corner & Registration */}
          <Section id="register" title="🏫 Teacher's Corner & Registration">
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {teacher.note}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2 }}>
              <Button variant="contained" href={teacher.mailSchool}>Register School</Button>
              <Button variant="outlined" href={teacher.mailStudent}>Register Student</Button>
              <Button variant="text" href={teacher.contactAnchor}>Contact Us</Button>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              <strong>Note:</strong> {teacher.examNote}
            </Typography>
          </Section>

          {/* Contact & Support */}
          <Section id="contact" title="Contact & Support">
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>{contacts.org}</strong> — {contacts.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Phone: <strong>{contacts.phonePrimary}</strong> • Alternate: <strong>{contacts.phoneAlt}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Email:{' '}
              <MUILink href={`mailto:${contacts.email}`} underline="hover">
                {contacts.email}
              </MUILink>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Website:{' '}
              <MUILink href="#" underline="hover">
                {contacts.website}
              </MUILink>
            </Typography>
          </Section>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

// -----------------------------
// Small helpers
// -----------------------------

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Box id={id} sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </motion.div>
    </Box>
  );
}

function AccordionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

function ListBullets({ items }: { items: string[] }) {
  return (
    <Stack spacing={1}>
      {items.map((txt, i) => (
        <Typography key={i} variant="body1" color="text.secondary">
          {txt}
        </Typography>
      ))}
    </Stack>
  );
}
