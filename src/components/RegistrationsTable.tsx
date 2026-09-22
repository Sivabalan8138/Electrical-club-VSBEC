'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'

interface Participant {
  id: string
  name: string
  register_number: string
  department: string
  year: string
  mobile_number: string
  email: string | null
  registration: {
    event: { id: string; event_name: string }
    team_name: string | null
    registered_at: Date
  }
}

export default function RegistrationsTable({ data, events }: { data: Participant[], events: {id: string, name: string}[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEvent, setFilterEvent] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [filterYear, setFilterYear] = useState('')
  
  // Filter logic
  const filteredData = data.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.register_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEvent = filterEvent ? p.registration.event.id === filterEvent : true
    const matchesDept = filterDept ? p.department === filterDept : true
    const matchesYear = filterYear ? p.year === filterYear : true
    
    return matchesSearch && matchesEvent && matchesDept && matchesYear
  })

  const handleExport = () => {
    const exportData = filteredData.map((p, idx) => ({
      'No.': idx + 1,
      'Participant Name': p.name,
      'Register Number': p.register_number,
      'Department': p.department,
      'Year': p.year,
      'Mobile Number': p.mobile_number,
      'Email': p.email || '-',
      'Event Name': p.registration.event.event_name,
      'Team Name': p.registration.team_name || 'Individual',
      'Registered Date': new Date(p.registration.registered_at).toLocaleString()
    }))
    
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations")
    XLSX.writeFile(workbook, "Event_Registrations.xlsx")
  }

  // Get unique departments and years for filter dropdowns
  const departments = Array.from(new Set(data.map(p => p.department)))
  const years = Array.from(new Set(data.map(p => p.year)))

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search Name or Reg No..." 
          className="form-input" 
          style={{ width: '250px', background: 'var(--surface-color)' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className="form-input" 
          style={{ width: 'auto', background: 'var(--surface-color)' }}
          value={filterEvent}
          onChange={(e) => setFilterEvent(e.target.value)}
        >
          <option value="">All Events</option>
          {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
        </select>
        
        <select 
          className="form-input" 
          style={{ width: 'auto', background: 'var(--surface-color)' }}
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        
        <select 
          className="form-input" 
          style={{ width: 'auto', background: 'var(--surface-color)' }}
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>
        
        <button onClick={handleExport} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
          DOWNLOAD EXCEL
        </button>
      </div>
      
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem' }}>No.</th>
              <th style={{ padding: '1rem' }}>Participant</th>
              <th style={{ padding: '1rem' }}>Register No.</th>
              <th style={{ padding: '1rem' }}>Department / Year</th>
              <th style={{ padding: '1rem' }}>Event / Team</th>
              <th style={{ padding: '1rem' }}>Contact</th>
              <th style={{ padding: '1rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>{idx + 1}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{p.name}</td>
                  <td style={{ padding: '1rem' }}>{p.register_number}</td>
                  <td style={{ padding: '1rem' }}>{p.department} - Y{p.year}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: 'var(--primary)' }}>{p.registration.event.event_name}</span>
                    <br/>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {p.registration.team_name ? `Team: ${p.registration.team_name}` : 'Individual'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {p.mobile_number}
                    {p.email && <><br/><span style={{ fontSize: '0.85rem' }}>{p.email}</span></>}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                    {new Date(p.registration.registered_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ padding: '2rem', textAlign: 'center' }}>No registrations match the filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
