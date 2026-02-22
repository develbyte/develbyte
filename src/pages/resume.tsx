import React from 'react';
import Layout from '@theme/Layout';
import styles from './resume.module.css';

export default function Resume(): React.JSX.Element {
  return (
    <Layout
      title="Narendra Kumar - Resume"
      description="Resume of Narendra Kumar - Sr. Engineering Manager with 14+ years of experience in data platforms and AI-driven products"
    >
      <div className={styles.resumeContainer}>
        <div className={styles.resumeContent}>
          {/* Header Section */}
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.avatarSection}>
                <img src="/img/profile.png" alt="Narendra Kumar" className={styles.avatar} />
              </div>
              <div className={styles.headerInfo}>
                <h1 className={styles.name}>Narendra Kumar</h1>
                <p className={styles.title}>
                  Sr. Engineering Manager - Platform Data & AIML @Razorpay | xCurefit | xMeesho
                </p>
                <p className={styles.summary}>
                  14+ years of experience building & leading cross-functional teams to build
                  and scale architectures, data platforms & AI-driven products.
                </p>
                <div className={styles.contactInfo}>
                  <span>Gorakhpur, UP, India</span>
                  <span>•</span>
                  <a href="mailto:im_naren@outlook.in">im_naren@outlook.in</a>
                  <span>•</span>
                  <a href="tel:+919741678904">+91-9741678904</a>
                </div>
                <div className={styles.links}>
                  <a href="https://develbyte.in" target="_blank" rel="noopener noreferrer">
                    DevelByte.in
                  </a>
                  <a href="https://github.com/im-naren" target="_blank" rel="noopener noreferrer">
                    GitHub: im-naren
                  </a>
                </div>
              </div>
              <div className={styles.downloadSection}>
                <a href="/resume.pdf" download className={styles.downloadBtn}>
                  Download PDF
                </a>
              </div>
            </div>
          </header>

          {/* Key Achievements Section */}
          <section className={styles.achievements}>
            <div className={styles.achievement}>
              <span className={styles.checkmark}>✓</span>
              <div>
                <strong>AI-Driven Revenue Growth:</strong> Launched AI-powered data products that not just increased company revenue but made the whole org profitable at Razorpay.
              </div>
            </div>
            <div className={styles.achievement}>
              <span className={styles.checkmark}>✓</span>
              <div>
                <strong>Cost Optimization:</strong> Led the re-architecture of the Merchant Reporting Platform, reducing costs by 74% while maintaining 99.99% availability.
              </div>
            </div>
            <div className={styles.achievement}>
              <span className={styles.checkmark}>✓</span>
              <div>
                <strong>Real-time Scalability:</strong> Developed a real-time streaming platform capable of handling a 500x traffic surge during IPL, ensuring zero downtime for customer-facing applications.
              </div>
            </div>
            <div className={styles.achievement}>
              <span className={styles.checkmark}>✓</span>
              <div>
                <strong>Strategic Data Initiatives:</strong> Spearheaded the design and execution of a data strategy for one of the largest fintech platforms in India, handling 1.6 PB of data and 56B+ events daily.
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>
                    Sr. Engineering Manager - Platform Data & AIML @Razorpay
                  </h3>
                  <p className={styles.jobLocation}>Hybrid | Apr 2022 - Present</p>
                </div>
              </div>

              <div className={styles.jobSection}>
                <h4>Leadership & Strategy:</h4>
                <ul>
                  <li>43 member engineering team across Data, AI, and infrastructure.</li>
                  <li>Defined and executed the data strategy, launching AI-driven financial reporting tools utilized by millions of customers each month.</li>
                  <li>Managed cross-functional projects including developer productivity, cost optimization, and data availability initiatives.</li>
                  <li>Designed and implemented organization-wide mentoring programs, benefiting 128 individual contributors across all levels.</li>
                </ul>
              </div>

              <div className={styles.jobSection}>
                <h4>Major Projects:</h4>
                <ul>
                  <li>
                    <strong>Data platform re-architecture</strong>
                    <ul>
                      <li><a href='https://engineering.razorpay.com/reducing-data-platform-cost-by-2m-d8f82285c4ae'>Reducing Data Platform Cost by $2M</a>, while improving the availability to 99% and data quality issues by 97%.</li>
                      <li>10+ thousand dashboards and, supporting key business decisions.</li>
                      <li>3.6 Petabytes Storage, 56B+ event ingestion per day, 10min+ latency</li>
                      <li>Scaled Trino to support 189+ million queries per month.</li>
                    </ul>
                  </li>
                  <li>
                    <strong><a href='https://razorpay.com/docs/payments/dashboard/reports/'>Merchant Reporting Platform:</a></strong> reducing operational costs by 74% while maintaining an SLA of 99.99%. 523+ thousand financial reports per month
                    
                  </li>
                  <li>
                    <strong><a href='https://engineering.razorpay.com/real-time-denormalized-data-streaming-platform-part-1-9f3c730dd9c6'>Real-time streaming platform</a></strong> capable of handling a 500x traffic surge during high-traffic events (e.g, IPL), ensuring zero downtime
                  </li>
                  <li>
                    Envisioned, designed & launched two new products [Data Sync & Insights]
                    <ul>
                      <li><a href='https://razorpay.com/newsroom/razorpay-becomes-first-pa-to-launch-datasync-a-real-time-data-integration-platform-with-aws-and-snowflake-saves-up-to-50-on-operational-costs-for-indian-businesses/'>Razorpay Becomes First PA to Launch 'DataSync': No code data integrations solution</a></li>
                      <li><a href='https://razorpay.com/newsroom/razorpay-launches-razorpay-insightx-a-real-time-ai-powered-insights-platform-for-merchants/'>Razorpay InsightX is AI-driven insights platform for merchants</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Engineering Manager - Plaftorm Data & DevOps @OkCredit</h3>
                  <p className={styles.jobLocation}>Remote | May 2021 - Mar 2022</p>
                </div>
              </div>
              <ul>
                <li>Built and managed 36 members for Data & DevOps.</li>
                <li>Built and led 3 teams, overseeing the design and development of a self-serve data ingestion layer capable of ingesting over 12B events.</li>
                <li>Migrated the entire data infrastructure from AWS to GCP, reducing operational costs and improving performance for mission-critical data pipelines.</li>
                <li>Managed infra security setup including firewalls, WAF, and adherence to OWASP standards, ensuring data compliance and security across all layers.</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Leading Data and Analytics @Cure.fit</h3>
                  <p className={styles.jobLocation}>Remote | Mar 2020 - Dec 2020</p>
                </div>
              </div>
              <ul>
                <li>Directed a team of 9 engineers to optimize the data ingestion layer, reducing costs by 60% month-over-month.</li>
                <li>Scaled analytics platforms to support 80+ analysts, delivering 50K+ ad hoc and scheduled queries daily.</li>
                <li>Optimized Redshift performance, reducing query times from 22 minutes (p90) to under 10 minutes.</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Sr. Engineer - Platform Data Infrastructure @Meesho</h3>
                  <p className={styles.jobLocation}>Bangalore | Mar 2019 - Mar 2020</p>
                </div>
              </div>
              <ul>
                <li>Designed and developed a high-scale data ingestion platform processing 48B+ events daily, with a p75 TAT under 10 minutes.</li>
                <li>Implemented self-serve capabilities for over 50 users, supporting 3000+ data pipelines and 10,000+ models.</li>
                <li>Deployed and optimized Presto, Hive Metastore, and Metabase for 200+ analysts, enabling efficient querying and reporting.</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Architect @Saturem</h3>
                  <p className={styles.jobLocation}>Bangalore + Dubai | Aug 2015 - March 2019</p>
                </div>
              </div>
              <ul>
                <li>Designed and developed <a href='https://www.piperr.io/'>Piparr™ - AI for Enterprise DataOps</a> from scratch</li>
                <li>Real-time streaming apps for fraud detection and data enrichment</li>
                <li>Implemented Cross Category Recommendation Engine, with four algorithms delivering 500K+ recommendations/day.</li>
                <li>Built and trained chatbot for booking flight and hotel tickets, with NER for destinations, dates, names and different domain-related keywords</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Software Engineer @IMS Health</h3>
                  <p className={styles.jobLocation}>Bangalore | Apr 2013 - Aug 2015</p>
                </div>
              </div>
              <ul>
                <li>Estimate, design and develop ETL systems independently.</li>
                <li>
                  <strong>Achievements:</strong>
                  <ul>
                    <li>Client delight award 2015</li>
                    <li>Aryabhatta innovation award 2014</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          {/* Education & Certifications Section */}
          <div className={styles.twoColumn}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.education}>
                <h3>BE in Computer Science and Engineering</h3>
                <p>REC Bhalki</p>
                <p>Class of 2012</p>
                <p>Bidar, KA, IN</p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Certifications</h2>
              <div className={styles.certification}>
                <div className={styles.certBadge}>CSM</div>
                <div>
                  <p><strong><a href='https://www.scrumalliance.org/certifications/certified-scrummaster-csm'>Scrum Alliance - Certified Scrum Master</a></strong></p>
                </div>
              </div>
            </section>
          </div>

          {/* Skills Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillTags}>
                <span>Distributed System</span>
                <span>Problem Solving</span>
                <span>Hiring Rockstar Engineer</span>
                <span>Strategic Planning</span>
                <span>Agile Methodology</span>
                <span>Product Development</span>
                <span>Root Cause Analysis</span>
                <span>Continuous Improvement</span>
                <span>Delegation</span>
                
              </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

