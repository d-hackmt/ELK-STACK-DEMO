import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Filter, Codesandbox, Search, ArrowDown } from 'lucide-react';

const RAW_LOG = '2026-02-20 18:45:12 INFO [auth-service] User login successful ip=192.168.1.1 duration=45ms';

const Logstash = () => {
    const [isParsing, setIsParsing] = useState(false);
    const [showStructured, setShowStructured] = useState(false);

    const startDemo = () => {
        setIsParsing(true);
        setTimeout(() => {
            setIsParsing(false);
            setShowStructured(true);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
        >
            <h1 className="neon-text">Logstash: The Data Refinery</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Normalizing diverse log formats into a unified JSON structure.</p>

            <div className="grid-layout" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* Grok Simulator */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <h3>Grok Filter Simulation</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '10px 0 20px' }}>
                        Transforming unstructured strings into searchable fields.
                    </p>

                    <div style={{ background: '#000', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '5px' }}>RAW INPUT:</div>
                        <code style={{ fontSize: '0.85rem' }}>{RAW_LOG}</code>
                    </div>

                    <button
                        onClick={startDemo}
                        disabled={isParsing}
                        className="cyber-button"
                        style={{ width: '100%', opacity: isParsing ? 0.5 : 1 }}
                    >
                        {isParsing ? 'Processing...' : 'Run Filter Pipeline'}
                    </button>

                    <AnimatePresence>
                        {showStructured && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ marginTop: '20px', background: 'rgba(0, 242, 255, 0.05)', padding: '15px', borderRadius: '8px', border: '1px solid var(--primary)' }}
                            >
                                <div style={{ color: 'var(--primary)', fontSize: '0.7rem', marginBottom: '5px' }}>STRUCTURED JSON:</div>
                                <pre style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                    {`{
  "@timestamp": "2026-02-20T18:45:12Z",
  "level": "INFO",
  "service": "auth-service",
  "message": "User login successful",
  "client_ip": "192.168.1.1",
  "duration_ms": 45,
  "env": "production"
}`}
                                </pre>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pipeline Visual */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '10px', background: 'var(--surface-color)', borderRadius: '12px' }}><Filter color="var(--primary)" /></div>
                        <div>
                            <h4 style={{ color: 'var(--primary)' }}>Filters</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mutation, GeoIP enrichment, and JSON parsing.</p>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '10px', background: 'var(--surface-color)', borderRadius: '12px' }}><Codesandbox color="var(--secondary)" /></div>
                        <div>
                            <h4 style={{ color: 'var(--secondary)' }}>Inputs/Outputs</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Connecting Beats, Kafka, S3, and Elasticsearch.</p>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '20px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
                        <Search size={32} color="var(--text-muted)" style={{ marginBottom: '10px' }} />
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            "Logstash makes data searchable before it even hits the database."
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ marginTop: '40px', padding: '30px' }}>
                <h2>The Logstash Pipeline</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>INPUT</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JDBC, Beats, HTTP</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>FILTER</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Grok, Mutate, Drop</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>OUTPUT</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ES, S3, PagerDuty</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Logstash;
