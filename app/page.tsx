'use client'

import { useState } from 'react'

interface Target {
  id: string
  name: string
  x: number
  y: number
  mapped: boolean
  status: 'active' | 'inactive' | 'pending'
}

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([
    { id: '1', name: 'Target Alpha', x: 120, y: 80, mapped: true, status: 'active' },
    { id: '2', name: 'Target Beta', x: 280, y: 150, mapped: true, status: 'active' },
    { id: '3', name: 'Target Gamma', x: 180, y: 220, mapped: false, status: 'pending' },
    { id: '4', name: 'Target Delta', x: 350, y: 180, mapped: true, status: 'inactive' },
    { id: '5', name: 'Target Epsilon', x: 240, y: 300, mapped: false, status: 'pending' },
  ])

  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'mapped' | 'unmapped'>('all')

  const toggleTargetMapping = (id: string) => {
    setTargets(targets.map(t =>
      t.id === id ? { ...t, mapped: !t.mapped, status: !t.mapped ? 'active' : 'pending' as 'active' | 'pending' } : t
    ))
  }

  const filteredTargets = targets.filter(t => {
    if (filter === 'mapped') return t.mapped
    if (filter === 'unmapped') return !t.mapped
    return true
  })

  const stats = {
    total: targets.length,
    mapped: targets.filter(t => t.mapped).length,
    unmapped: targets.filter(t => !t.mapped).length,
    active: targets.filter(t => t.status === 'active').length,
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          padding: '30px',
          color: 'white'
        }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: 'bold' }}>
            🎯 Mobile Arena Target Mapper
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Real-time target mapping and status monitoring system
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          padding: '30px',
          background: '#f8fafc',
          borderBottom: '2px solid #e2e8f0'
        }}>
          {[
            { label: 'Total Targets', value: stats.total, color: '#3b82f6', icon: '🎯' },
            { label: 'Mapped', value: stats.mapped, color: '#10b981', icon: '✓' },
            { label: 'Unmapped', value: stats.unmapped, color: '#f59e0b', icon: '⚠' },
            { label: 'Active', value: stats.active, color: '#8b5cf6', icon: '⚡' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: `2px solid ${stat.color}20`
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', height: 'calc(100vh - 300px)', minHeight: '500px' }}>
          {/* Arena Map */}
          <div style={{ flex: '1', padding: '30px', borderRight: '2px solid #e2e8f0' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#1e293b' }}>Arena Map</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['all', 'mapped', 'unmapped'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '8px',
                      background: filter === f ? '#3b82f6' : '#e2e8f0',
                      color: filter === f ? 'white' : '#64748b',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      transition: 'all 0.2s'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, #dbeafe, #eff6ff)',
              borderRadius: '12px',
              border: '2px solid #cbd5e1',
              backgroundImage: `
                linear-gradient(#cbd5e140 1px, transparent 1px),
                linear-gradient(90deg, #cbd5e140 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              overflow: 'hidden'
            }}>
              {filteredTargets.map(target => (
                <div
                  key={target.id}
                  onClick={() => setSelectedTarget(target.id)}
                  style={{
                    position: 'absolute',
                    left: `${target.x}px`,
                    top: `${target.y}px`,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: target.mapped
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #f59e0b, #d97706)',
                    border: selectedTarget === target.id ? '4px solid #1e293b' : '3px solid white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: selectedTarget === target.id
                      ? '0 8px 24px rgba(0,0,0,0.3)'
                      : '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s',
                    transform: selectedTarget === target.id ? 'scale(1.2)' : 'scale(1)',
                  }}
                  title={target.name}
                >
                  {target.mapped ? '✓' : '?'}
                  {target.status === 'active' && target.mapped && (
                    <div style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      width: '16px',
                      height: '16px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite'
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Target List */}
          <div style={{ width: '400px', padding: '30px', background: '#f8fafc' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#1e293b' }}>
              Target List
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: 'calc(100% - 40px)' }}>
              {filteredTargets.map(target => (
                <div
                  key={target.id}
                  onClick={() => setSelectedTarget(target.id)}
                  style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '12px',
                    border: selectedTarget === target.id ? '3px solid #3b82f6' : '2px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedTarget === target.id ? '0 4px 12px rgba(59,130,246,0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        {target.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Position: ({target.x}, {target.y})
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      background: target.status === 'active' ? '#10b98120' : target.status === 'pending' ? '#f59e0b20' : '#64748b20',
                      color: target.status === 'active' ? '#059669' : target.status === 'pending' ? '#d97706' : '#475569'
                    }}>
                      {target.status}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: target.mapped ? '#10b981' : '#f59e0b'
                    }}>
                      <span style={{ fontSize: '18px' }}>{target.mapped ? '✓' : '⚠'}</span>
                      {target.mapped ? 'Mapped' : 'Unmapped'}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTargetMapping(target.id)
                      }}
                      style={{
                        padding: '6px 14px',
                        border: 'none',
                        borderRadius: '6px',
                        background: target.mapped ? '#f59e0b' : '#10b981',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                      }}
                    >
                      {target.mapped ? 'Unmap' : 'Map'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
