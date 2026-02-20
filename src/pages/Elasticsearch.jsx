import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, Layers, Server, Search, Filter } from 'lucide-react';

const SAMPLE_DOCS = [
    { id: '1', service: 'auth-service', status: 200, message: 'User login success', ip: '192.168.1.1' },
    { id: '2', service: 'payment-service', status: 500, message: 'Gateway timeout', ip: '172.16.0.4' },
    { id: '3', service: 'orders-service', status: 200, message: 'Order created #991', ip: '10.0.0.12' },
    { id: '4', service: 'auth-service', status: 403, message: 'Access denied: invalid token', ip: '192.168.1.55' },
    { id: '5', service: 'payment-service', status: 200, message: 'Refund processed', ip: '172.16.0.4' },
    { id: '6', service: 'orders-service', status: 404, message: 'Product not found', ip: '10.0.0.15' },
    { id: '7', service: 'billing-svc', status: 200, message: 'Invoice sent to user', ip: '10.0.0.40' },
    { id: '8', service: 'shipping-svc', status: 200, message: 'Package dispatched', ip: '10.0.0.100' },
];

const Elasticsearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const filteredDocs = SAMPLE_DOCS.filter(doc =>
        doc.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
        >
            <h1 className="neon-text">Elasticsearch: The Search Core</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Distributed, RESTful search and analytics engine for lightning-fast lookups.</p>

            {/* Cluster Status */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px', background: 'rgba(35, 134, 54, 0.05)', borderColor: 'var(--success)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="status-badge status-running" style={{ padding: '8px 15px' }}>Cluster Health: Green</div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nodes: 5 | Indices: 124 | Shards: 248 | Documents: 1.2B</span>
                </div>
            </div>

            {/* Searchable Index Demo */}
            <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Searchable Index Demo</h3>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by service or message..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                background: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                color: 'var(--text-main)',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>
                </div>

                <div style={{ background: '#000', borderRadius: '8px', border: '1px solid var(--border-color)', minHeight: '300px', overflow: 'hidden' }}>
                    <div style={{ padding: '10px 20px', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>Inverted Index Query Results</span>
                        <span>{filteredDocs.length} hits in {isSearching ? '...' : Math.floor(Math.random() * 10) + 2}ms</span>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <AnimatePresence>
                            {filteredDocs.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                                    {filteredDocs.map(doc => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            style={{
                                                padding: '15px',
                                                background: 'var(--surface-color)',
                                                borderRadius: '8px',
                                                border: '1px solid var(--border-color)',
                                                borderLeft: `4px solid ${doc.status >= 400 ? 'var(--error)' : 'var(--primary)'}`
                                            }}
                                        >
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '5px' }}>DOC ID: {doc.id}</div>
                                            <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '8px' }}>{doc.service}</div>
                                            <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{doc.message}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                <span>Status: {doc.status}</span>
                                                <span>IP: {doc.ip}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
                                    No documents found for "{searchTerm}"
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="grid-layout" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* Shard Visualization */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Layers color="var(--primary)" />
                        <h3>Sharding & High Availability</h3>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Data is redundant across multiple nodes. If one node fails, replicas are promoted to primaries instantly.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    height: '50px',
                                    background: 'var(--surface-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: i <= 4 ? 'var(--primary)' : 'var(--text-muted)',
                                    borderColor: i <= 4 ? 'var(--primary)' : 'var(--border-color)'
                                }}
                            >
                                P{i <= 4 ? i : i - 4} {i <= 4 ? '(P)' : '(R)'}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Speed Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '12px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '12px' }}><Zap color="var(--primary)" /></div>
                        <div>
                            <h4 style={{ color: 'var(--primary)' }}>Aggregations</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Calculating sums, averages, and group-bys on trillions of data points instantly.</p>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '12px', background: 'rgba(112, 0, 255, 0.1)', borderRadius: '12px' }}><Server color="var(--secondary)" /></div>
                        <div>
                            <h4 style={{ color: 'var(--secondary)' }}>Cluster Scaling</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add more capacity without downtime. Rebalancing happens in the background.</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Elasticsearch;
