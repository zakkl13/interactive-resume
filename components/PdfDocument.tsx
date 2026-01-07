import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { ResumeData, resumeData } from '@/data/resumeData';

// Register a standard font if needed, or rely on default Helvetica
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#444',
    marginBottom: 2,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    paddingBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    marginBottom: 5,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 6,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  roleCompany: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  duration: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#555',
  },
  roleSummary: {
    marginBottom: 3,
    fontStyle: 'italic',
    color: '#444',
  },
  project: {
    marginLeft: 0,
    marginBottom: 3,
    marginTop: 2,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 9,
  },
  bullet: {
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 1,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
  },
  link: {
    color: '#2563EB',
    textDecoration: 'none',
  },
  bold: {
    fontWeight: 'bold', // Helvetica supports bold out of box usually
    fontFamily: 'Helvetica-Bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  skillColumn: {
    width: '33%',
    paddingRight: 10,
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    marginBottom: 2,
  },
  skillItem: {
    fontSize: 9,
    color: '#444',
  }
});

// Helper to parse the custom format string into PDF components
const parsePdfText = (input: string, preferContext: boolean = false) => {
  const regex = /{{(hover|bold|link) text='(.*?)'( context='(.*?)')?( out='(.*?)')?}}/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const [fullMatch, type, text, , context, , out] = match;
    const index = match.index;

    // Add preceding text
    if (index > lastIndex) {
      parts.push(<Text key={lastIndex}>{input.slice(lastIndex, index)}</Text>);
    }

    // Add formatted part
    const key = `${type}-${index}`;
    switch (type) {
      case 'hover':
        // If preferContext is true and context exists, use it. Otherwise use text.
        parts.push(<Text key={key}>{ (preferContext && context) ? context : text }</Text>);
        break;
      case 'bold':
        parts.push(<Text key={key} style={styles.bold}>{text}</Text>);
        break;
      case 'link':
        parts.push(
          <Link key={key} src={out || '#'} style={styles.link}>
            {text}
          </Link>
        );
        break;
      default:
        parts.push(<Text key={key}>{text}</Text>);
        break;
    }

    lastIndex = index + fullMatch.length;
  }

  // Add remaining text
  if (lastIndex < input.length) {
    parts.push(<Text key={lastIndex}>{input.slice(lastIndex)}</Text>);
  }

  return parts;
};

// Component for a bullet point
const BulletPoint = ({ text }: { text: string }) => (
  <View style={styles.bullet}>
    <Text style={styles.bulletPoint}>•</Text>
    <View style={styles.bulletText}>
      <Text>{parsePdfText(text)}</Text>
    </View>
  </View>
);

export const ResumePdf = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.contactRow}>
            <Text>{parsePdfText(data.location, true)}</Text>
            <Link src={`mailto:${data.email}`} style={styles.link}>{data.email}</Link>
            <Link src={data.linkedin} style={styles.link}>LinkedIn</Link>
            <Link src={data.github} style={styles.link}>GitHub</Link>
            <Link src={data.website} style={styles.link}>zakk.io/resume</Link>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.summary}>{parsePdfText(data.summary)}</Text>
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, i) => (
              <View key={i} style={styles.skillColumn}>
                <Text style={styles.skillCategoryTitle}>{skill.category}</Text>
                <Text style={styles.skillItem}>
                  {skill.items.join(', ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.expHeader}>
              <Text style={styles.roleCompany}>
                {parsePdfText(exp.company)} - {exp.title}
              </Text>
              <Text style={styles.duration}>{exp.duration}</Text>
            </View>
            
            {exp.roleSummary && (
              <Text style={styles.roleSummary}>{parsePdfText(exp.roleSummary)}</Text>
            )}

            {exp.projects.map((proj, j) => (
              <View key={j} style={styles.project}>
                 {/* Only show project title if it's substantial, 
                     sometimes it's just a grouping wrapper. 
                     Here existing data seems to have titles. */}
                 {proj.title && proj.title !== "Team Leadership & Responsibilities" && (
                    <Text style={styles.projectTitle}>{parsePdfText(proj.title)}</Text>
                 )}
                 {/* Special case for leadership section to look like a title? Or just bold text? */}
                 {proj.title === "Team Leadership & Responsibilities" && (
                    <Text style={styles.projectTitle}>{parsePdfText(proj.title)}</Text>
                 )}

                 {proj.intro && (
                    <Text style={{ fontStyle: 'italic', marginBottom: 2 }}>{parsePdfText(proj.intro)}</Text>
                 )}
                 
                 {proj.bullets.map((bullet, k) => (
                   <BulletPoint key={k} text={bullet} />
                 ))}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
             <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{edu.school}</Text>
             <Text>{edu.degree}</Text>
          </View>
        ))}
      </View>

    </Page>
  </Document>
);
