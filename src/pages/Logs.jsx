import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Box, Play, Pause, RefreshCcw } from 'lucide-react';

const SERVICES = [
    { id: 'auth-svc', name: 'auth-service', color: '#00f2ff' },
    { id: 'payment-svc', name: 'payment-service', color: '#7000ff' },
    { id: 'orders-svc', name: 'orders-service', color: '#ff007a' }
];

const LOG_MESSAGES = [
    { level: 'INFO', msg: 'User login successful', service: 'auth-service' },
    { level: 'INFO', msg: 'GET /api/v1/orders - 200 OK', service: 'orders-service' },
    { level: 'ERROR', msg: 'Database connection timeout', service: 'payment-service' },
    { level: 'INFO', msg: 'Transaction completed #TR-9902', service: 'payment-service' },
    { level: 'WARN', msg: 'Slow response time detected from upstream', service: 'orders-service' },
    { level: 'INFO', msg: 'New order created #ORD-122', service: 'orders-service' },
    { level: 'ERROR', msg: 'Invalid JWT signature detected', service: 'auth-service' },
    { level: 'INFO', msg: 'Session refreshed', service: 'auth-service' },
];

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            const newLog = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...randomMsg
            };
            setLogs(prev => [...prev.slice(-49), newLog]);
        }, 800);

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 className="neon-text">Cloud Log Generator</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Simulating Kubernetes Cluster [3 Replicas]</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setIsPaused(!isPaused)} className="cyber-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isPaused ? <Play size={16} /> : <Pause size={16} />}
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button onClick={() => setLogs([])} className="cyber-button" style={{ background: 'var(--surface-color)', color: 'var(--text-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCcw size={16} /> Clear
                    </button>
                </div>
            </div>

            <div className="grid-layout" style={{ gridTemplateColumns: '1fr 3fr' }}>
                {/* Pod Status */}
                <div className="glass-panel" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Service Health</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {SERVICES.map(svc => (
                            <div key={svc.id} style={{ padding: '12px', background: 'var(--surface-color)', borderRadius: '8px', border: `1px solid ${svc.color}44` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{svc.name}</span>
                                    <div className="status-badge status-running">Stable</div>
                                </div>
                                <div style={{ height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                                    <motion.div
                                        animate={{ width: ['80%', '100%', '90%', '95%'] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        style={{ height: '100%', background: svc.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Console */}
                <div className="glass-panel" style={{ background: '#000', padding: '0', overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '10px 15px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface-color)' }}>
                        <Terminal size={14} color="var(--primary)" />
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>stdout / stderr stream</span>
                    </div>
                    <div
                        ref={logContainerRef}
                        style={{ flex: 1, overflowY: 'auto', padding: '10px', scrollBehavior: 'smooth' }}
                    >
                        {logs.map(log => (
                            <div key={log.id} className="log-line">
                                <span className="log-timestamp">{log.timestamp.split('T')[1].split('.')[0]}</span>
                                <span className={`log-level-${log.level}`} style={{ marginRight: '10px', display: 'inline-block', minWidth: '50px' }}>
                                    [{log.level}]
                                </span>
                                <span style={{ color: 'var(--text-muted)', marginRight: '10px' }}>[{log.service}]</span>
                                <span>{log.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ marginTop: '30px', padding: '20px' }}>
                <h3>What is happening here?</h3>
                <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>
                    In a Kubernetes environment, applications run in <strong>Pods</strong> across multiple <strong>Replicas</strong>.
                    Each pod outputs logs to <code>stdout</code>. These logs are stored as files on the node's disk, where Filebeat will eventually pick them up.
                </p>
            </div>
        </motion.div>
    );
};

export default Logs;
