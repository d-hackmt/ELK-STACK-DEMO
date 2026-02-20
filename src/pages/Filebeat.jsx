import React from 'react';
import { motion } from 'framer-motion';
import { Share2, FileSearch, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Filebeat = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
        >
            <h1 className="neon-text">Filebeat: The Logistics Layer</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Efficiently harvesting logs and shipping them to the processing pipeline.</p>

            <div className="grid-layout">
                {/* Harvest Visualization */}
                <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                    <FileSearch size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                    <h3>Log Harvesting</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                        Monitoring <code>/var/log/containers/*.log</code> for new lines. Filebeat keeps track of the "last line read" for every single file.
                    </p>
                    <div style={{ marginTop: '20px', padding: '15px', background: 'var(--surface-color)', borderRadius: '8px', textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '5px' }}>harvester.log</div>
                        <code style={{ fontSize: '0.75rem' }}>Deteched new log file: auth-service-123a.log</code><br />
                        <code style={{ fontSize: '0.75rem' }}>Backpressure detected! slowing down...</code>
                    </div>
                </div>

                {/* Transfer Visualization */}
                <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', border: '1px solid var(--secondary)' }}>
                    <Zap size={48} color="var(--secondary)" style={{ marginBottom: '20px' }} />
                    <h3>Lightweight Shipping</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                        Using the <strong>Lumberjack</strong> protocol to ship logs with minimal CPU/Memory footprint.
                    </p>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                        <motion.div
                            animate={{ x: [0, 50, 0], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{ padding: '4px 8px', background: 'var(--secondary)', borderRadius: '4px', fontSize: '0.7rem' }}
                        >
                            Log Bulk
                        </motion.div>
                        <ArrowRight color="var(--secondary)" />
                    </div>
                </div>

                {/* Security */}
                <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                    <ShieldCheck size={48} color="var(--success)" style={{ marginBottom: '20px' }} />
                    <h3>Encrypted Transit</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                        TLS/SSL certificates ensure that sensitive production logs remain private during transport to Logstash.
                    </p>
                </div>
            </div>

            <div className="glass-panel" style={{ marginTop: '40px', padding: '30px' }}>
                <h2 style={{ marginBottom: '20px' }}>filebeat.yml Configuration</h2>
                <div style={{ background: '#000', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <pre style={{ fontSize: '0.9rem', color: '#888' }}>
                        {`filebeat.inputs:
- type: container
  paths:
    - /var/log/containers/*.log

output.logstash:
  hosts: ["logstash:5044"]
  ssl.certificate_authorities: ["/etc/ca.crt"]`}
                    </pre>
                </div>
            </div>
        </motion.div>
    );
};

export default Filebeat;
