import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Terminal,
    Share2,
    Activity,
    Database,
    LayoutDashboard,
    Cpu,
    ChevronDown,
    Search
} from 'lucide-react';

const STEPS = [
    { id: 'pod', label: '1. App Pod', icon: <Cpu />, color: 'var(--primary)', desc: 'Raw application output in stdout.' },
    { id: 'filebeat', label: '2. Filebeat', icon: <Share2 />, color: 'var(--secondary)', desc: 'Harvesting logs from disk.' },
    { id: 'logstash', label: '3. Logstash', icon: <Activity />, color: 'var(--accent)', desc: 'Filtering and enrichment.' },
    { id: 'elastic', label: '4. Elasticsearch', icon: <Database />, color: 'var(--primary)', desc: 'Indexing for fast search.' },
    { id: 'kibana', label: '5. Kibana', icon: <LayoutDashboard />, color: 'gold', desc: 'Visualizing actionable data.' },
];

const Pipeline = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [logState, setLogState] = useState('raw'); // 'raw', 'harvested', 'parsed', 'indexed', 'visualized'

    const nextStep = () => {
        if (activeStep < STEPS.length - 1) {
            setActiveStep(prev => prev + 1);
        } else {
            setActiveStep(0);
        }
    };

    const getLogContent = () => {
        switch (activeStep) {
            case 0: return '2026-02-20 18:55:01 INFO [payment-svc] Transaction success uid=u123 status=200';
            case 1: return '[Filebeat] Reading: /var/log/containers/payment-svc.log\n>>> 2026-02-20 18:55:01 INFO [payment-svc] Transaction success uid=u123 status=200';
            case 2: return `{
  "@timestamp": "2026-02-20T18:55:01Z",
  "service": "payment-svc",
  "level": "INFO",
  "message": "Transaction success",
  "user_id": "u123",
  "status_code": 200,
  "action": "payment_completed"
}`;
            case 3: return 'Indexing [logs-2026-02-20] Shard #3\nDocument ID: _Xh92jK... [Stored in Inverted Index]';
            case 4: return 'Dashboard: Payment Success Rate [98.5%]\nVisual: Bar Chart updated for payment-svc';
            default: return '';
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
            <h1 className="neon-text">End-to-End Pipeline Execution</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Follow a single log entry as it traverses the entire ELK stack.</p>

            {/* Pipeline Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border-color)', zIndex: 0 }} />
                {STEPS.map((step, i) => (
                    <div
                        key={step.id}
                        onClick={() => setActiveStep(i)}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: activeStep === i ? 1.2 : 1,
                                borderColor: activeStep === i ? step.color : 'var(--border-color)',
                                boxShadow: activeStep === i ? `0 0 20px ${step.color}` : 'none'
                            }}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'var(--bg-color)',
                                border: '2px solid',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: activeStep === i ? step.color : 'var(--text-muted)'
                            }}
                        >
                            {step.icon}
                        </motion.div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: activeStep === i ? step.color : 'var(--text-muted)' }}>
                            {step.label.split(' ')[1]}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid-layout" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
                {/* Step Details */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <h2 style={{ color: STEPS[activeStep].color, marginBottom: '15px' }}>{STEPS[activeStep].label}</h2>
                    <p style={{ lineHeight: '1.6', marginBottom: '25px' }}>{STEPS[activeStep].desc}</p>

                    <div style={{ padding: '15px', background: 'var(--surface-color)', borderRadius: '8px', borderLeft: `4px solid ${STEPS[activeStep].color}` }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Current Operation</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                            <li>• Data isolation level: High</li>
                            <li>• Latency addition: ~{Math.floor(Math.random() * 5) + 2}ms</li>
                            <li>• Status: <span style={{ color: 'var(--success)' }}>Operational</span></li>
                        </ul>
                    </div>

                    <button
                        onClick={nextStep}
                        className="cyber-button"
                        style={{ marginTop: '30px', width: '100%', background: STEPS[activeStep].color, color: '#000' }}
                    >
                        Next Phase <ArrowRight size={18} />
                    </button>
                </div>

                {/* Live Transformation View */}
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '15px 20px', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                        <span style={{ fontSize: '0.8rem', opacity: 0.5, marginLeft: '10px' }}>data_stream_transformer.sh</span>
                    </div>
                    <div style={{ flex: 1, padding: '30px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%' }}
                            >
                                <div style={{ border: `1px solid ${STEPS[activeStep].color}44`, padding: '20px', borderRadius: '12px', background: `${STEPS[activeStep].color}08` }}>
                                    <pre style={{
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '1rem',
                                        color: activeStep === 2 ? '#00f2ff' : 'var(--text-main)',
                                        lineHeight: '1.5',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {getLogContent()}
                                    </pre>
                                </div>
                                {activeStep === 2 && (
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        style={{ marginTop: '20px', textAlign: 'center', color: 'var(--primary)', fontSize: '0.8rem' }}
                                    >
                                        <ChevronDown size={20} style={{ display: 'block', margin: '0 auto' }} />
                                        Logstash Filters Applied: [grok, mutate, date]
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ marginTop: '40px', padding: '30px' }}>
                <h2>The Life of a Log Line</h2>
                <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>
                    Each stage of the ELK stack adds value to your data. Filebeat ensures reliable delivery, Logstash creates structure and context,
                    Elasticsearch provides the storage and search foundation, and Kibana brings it all to life with powerful analytics.
                </p>
            </div>
        </motion.div>
    );
};

export default Pipeline;
