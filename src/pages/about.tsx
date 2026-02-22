import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function About(): React.JSX.Element {
  return (
    <Layout title="About Me" description="Learn more about Narendra Kumar">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div style={{ maxWidth: '750px', margin: '0 auto', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <img 
                  src="https://github.com/im-naren.png" 
                  alt="Narendra Dubey"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid rgba(255, 255, 102, 0.3)'
                  }}
                />
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h2 style={{ marginTop: '0', marginBottom: '0.5rem', fontSize: '2rem', color: '#FFFF66' }}>
                    Narendra Dubey
                  </h2>
                  <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#B8B8B8', marginBottom: '1rem' }}>
                    Systems builder. Platform tinkerer. Distributed architecture troublemaker.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a 
                      href="https://github.com/im-naren" 
                      style={{ 
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 255, 102, 0.1)',
                        border: '1px solid rgba(255, 255, 102, 0.3)',
                        borderRadius: '4px',
                        color: '#FFFF66',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 102, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 102, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 102, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 102, 0.3)';
                      }}
                    >
                      GitHub
                    </a>
                    <a 
                      href="https://linkedin.com/in/im-naren" 
                      style={{ 
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 255, 102, 0.1)',
                        border: '1px solid rgba(255, 255, 102, 0.3)',
                        borderRadius: '4px',
                        color: '#FFFF66',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 102, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 102, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 102, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 102, 0.3)';
                      }}
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="mailto:naren.dubey@zoho.com" 
                      style={{ 
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 255, 102, 0.1)',
                        border: '1px solid rgba(255, 255, 102, 0.3)',
                        borderRadius: '4px',
                        color: '#FFFF66',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 102, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 102, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 102, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 102, 0.3)';
                      }}
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
              
              <p>
                I specialize in building and scaling distributed systems and cloud platforms—the kind you can trust to survive odd failures, Monday morning releases, and the inevitable 2am monitoring surprise. My engineering playground is all about making complex systems robust, observable, and just a little bit elegant.
              </p>

              <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>What gets me out of bed (and sometimes keeps me up):</h3>
              <ul>
                <li>Designing fault-tolerant platforms and distributed architectures for the real world</li>
                <li>Untangling tricky technical problems—think consensus, network partitions, state machines, and weird cloud bugs</li>
                <li>Automating infrastructure (especially when it helps my teammates sleep at night)</li>
                <li>Turning deep lessons from production into practical guides, docs, and diagrams</li>
              </ul>

              <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Nerdy passions:</h3>
              <ul>
                <li>Large-scale systems, cloud primitives, Kubernetes mysteries, and service mesh antics</li>
                <li>Improving reliability, scalability, observability, and those subtle edge cases nobody else wants to touch</li>
                <li>Debating CAP and PACELC tradeoffs, swapping real-world examples, and exploring open-source tools</li>
                <li>Occasional spontaneous architecture sketches—extra points if the topology looks cool</li>
              </ul>

              <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Outside work:</h3>
              <p>
                I'm raising two kids, playing games with them, and sometimes pondering the existence of being itself. 
                I love philosophy, physics, history, and anything that entertains a good "why."
              </p>
              <hr/>
              <p>
              Thanks for stopping by Develbyte!
              <br /><br />
              If you want to swap platform stories, sketch distributed topologies, or share battle scars from production, I’m always game. Drop me a message, ping me anytime, or just shoot me a DM—and let’s nerd out together!
              </p>
              

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

