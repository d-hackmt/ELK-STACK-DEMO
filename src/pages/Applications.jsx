import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Cloud, Bug, HeartPulse, Search } from 'lucide-react';

const APP_CASES = [
    {
        title: 'Security Information (SIEM)',
        desc: 'Detecting cross-site scripting (XSS), brute force attacks, and unauthorized access in real-time.',
        icon: <Shield color="var(--accent)" />,
        tags: ['Security', 'Threat Hunting']
    },
    {
        title: 'Application Performance (APM)',
        desc: 'Tracking request latencies across microservices to identify bottlenecks in the user journey.',
        icon: <BarChart3 color="var(--primary)" />,
        tags: ['Performance', 'Bottlenecks']
    },
    {
        title: 'Infrastructure Monitoring',
        desc: 'Aggregating system metrics (CPU, Memory, Disk) alongside application logs for full-stack visibility.',
        icon: <Cloud color="var(--secondary)" />,
        tags: ['DevOps', 'Cloud Native']
    },
    {
        title: 'Debugging & Troubleshooting',
        desc: 'Searching through millions of logs to find the "needle in the haystack" during production outages.',
        icon: <Bug color="var(--error)" />,
        tags: ['SRE', 'Incident Response']
    },
    {
        title: 'Business Analytics',
        desc: 'Gaining insights into user behavior, feature adoption, and geographical trends from access logs.',
        icon: <HeartPulse color="var(--success)" />,
        tags: ['Marketing', 'Product']
    },
    {
        title: 'Centralized Search',
        desc: 'Providing powerful search capabilities for e-commerce catalogs or internal documentation.',
        icon: <Search color="var(--primary)" />,
        tags: ['UX', 'eCommerce']
    }
];

const Applications = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
        >
            <h1 className="neon-text">Applications of the ELK Stack</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '700px' }}>
                Beyond simple log collection, the ELK stack is a powerhouse for modern digital operations, empowering teams across various domains.
            </p>

            <div className="grid-layout">
                {APP_CASES.map((app, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="glass-panel"
                        style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ padding: '10px', background: 'var(--surface-color)', borderRadius: '12px' }}>
                                {app.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem' }}>{app.title}</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                            {app.desc}
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {app.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px' }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-panel" style={{ marginTop: '50px', padding: '40px', textAlign: 'center', background: 'linear-gradient(to right, rgba(0, 242, 255, 0.05), rgba(112, 0, 255, 0.05))' }}>
                <h2 style={{ marginBottom: '15px' }}>Why Choose ELK?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '30px' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>100%</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Open Source Core</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>Exabyte</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Horizontal Scalability</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>ms</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Search Latency</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Applications;
