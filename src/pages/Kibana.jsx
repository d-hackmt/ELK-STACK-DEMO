import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { LayoutDashboard, Search, Calendar, Filter, Share2, Activity } from 'lucide-react';

const DATA_ERRORS = [
    { name: '404', value: 400, color: '#00f2ff' },
    { name: '500', value: 120, color: '#ff007a' },
    { name: '403', value: 80, color: '#7000ff' },
    { name: '200', value: 2500, color: '#238636' },
];

const TIME_SERIES = [
    { time: '18:00', requests: 450, latency: 120 },
    { time: '18:10', requests: 520, latency: 150 },
    { time: '18:20', requests: 480, latency: 130 },
    { time: '18:30', requests: 610, latency: 180 },
    { time: '18:40', requests: 800, latency: 250 },
    { time: '18:50', requests: 750, latency: 210 },
];

const Kibana = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-container"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 className="neon-text">Kibana: Operational Intelligence</h1>
                    <p style={{ color: 'var(--text-muted)' }}>The window into your elastic cluster.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="glass-panel" style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                        <Calendar size={14} /> Last 15 Minutes
                    </div>
                    <button className="cyber-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Share2 size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '30px' }}>
                {[
                    { label: 'Total Hits', value: '45.2K', color: 'var(--primary)' },
                    { label: 'Error Rate', value: '1.2%', color: 'var(--error)' },
                    { label: 'Avg Latency', value: '142ms', color: 'var(--warning)' },
                    { label: 'Indices', value: '12', color: 'var(--secondary)' },
                ].map(stat => (
                    <div key={stat.label} className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '10px', textTransform: 'uppercase' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid-layout" style={{ gridTemplateColumns: '2fr 1fr' }}>
                {/* Main Chart */}
                <div className="glass-panel" style={{ padding: '20px', height: '400px' }}>
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity size={18} color="var(--primary)" /> Traffic Volume vs Latency
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={TIME_SERIES}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                            <YAxis stroke="var(--text-muted)" fontSize={12} />
                            <Tooltip
                                contentStyle={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}
                                itemStyle={{ fontSize: '0.8rem' }}
                            />
                            <Line type="monotone" dataKey="requests" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)' }} />
                            <Line type="monotone" dataKey="latency" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Breakdown */}
                <div className="glass-panel" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>HTTP Status Codes</h3>
                    <ResponsiveContainer width="100%" height="250px">
                        <PieChart>
                            <Pie
                                data={DATA_ERRORS}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {DATA_ERRORS.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '20px' }}>
                        {DATA_ERRORS.map(err => (
                            <div key={err.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', background: err.color, borderRadius: '2px' }} />
                                    {err.name} Status
                                </span>
                                <span>{err.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Discovery Table Simulation */}
            <div className="glass-panel" style={{ marginTop: '30px', padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Search size={18} /> Discover</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span className="glass-panel" style={{ padding: '5px 12px', fontSize: '0.75rem' }}>@timestamp: desc</span>
                    </div>
                </div>
                <div style={{ padding: '10px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ padding: '10px' }}>Time</th>
                                <th>Service</th>
                                <th>Level</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { time: '18:52:10', svc: 'auth-service', lvl: 'INFO', msg: 'User session started' },
                                { time: '18:51:55', svc: 'payment-service', lvl: 'ERROR', msg: 'Provider timeout (Stripe)' },
                                { time: '18:51:42', svc: 'orders-service', lvl: 'INFO', msg: 'Invoice generated PDF-99' },
                                { time: '18:51:30', svc: 'auth-service', lvl: 'WARN', msg: 'Multiple failed login attempts' },
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '12px' }}>{row.time}</td>
                                    <td style={{ color: 'var(--primary)' }}>{row.svc}</td>
                                    <td>
                                        <span className={`status-badge ${row.lvl === 'ERROR' ? 'status-error' : 'status-running'}`} style={{ fontSize: '0.65rem' }}>
                                            {row.lvl}
                                        </span>
                                    </td>
                                    <td>{row.msg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default Kibana;
