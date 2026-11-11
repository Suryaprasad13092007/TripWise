
import React, { useState } from 'react';
import type {CreatedTrip} from './types';

type TripCreateProps = {
  onCreateTrip: (trip: Omit<CreatedTrip, 'id'>) => void;
  onCancel?: () => void;
};

export default function TripCreate({
  onCreateTrip,
  onCancel
}: TripCreateProps) {

  const [form, setForm] = useState({
    from: '',
    destination: '',
    departure: '',
    returning: '',
    travellers: '2',
    budget: '',
    transport: 'Any',
    accommodation: 'Any',
    food: 'No preference',
    interests: [] as string[]
  });

  const [error, setError] = useState('');

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest]
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.from || !form.destination ||
        !form.departure || !form.returning ||
        !form.budget) {
      setError('Please complete all required fields.');
      return;
    }

    if (new Date(form.returning) < new Date(form.departure)) {
      setError('Return date must be after departure date.');
      return;
    }

    if (Number(form.budget) <= 0 ||
        Number(form.travellers) < 1) {
      setError('Enter a valid budget and traveller count.');
      return;
    }

    setError('');

    onCreateTrip({
      ...form,
      travellers: Number(form.travellers),
      budget: Number(form.budget),
      createdAt: new Date().toISOString(),
      status: 'Planning'
    });
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #dce3e9',
    borderRadius: 10,
    fontSize: 14,
    background: '#fff',
    color: '#17263b',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#26374d',
    marginBottom: 7
  };

  const interests = [
    'Adventure', 'Nature', 'Beaches',
    'Culture', 'Shopping', 'Food',
    'Relaxation', 'Photography'
  ];

  return (
    <div style={{
      minHeight: 'auto',
      background: 'transparent',
      padding: '0 0 24px',
      color: '#17263b'
    }}>

      <div style={{ maxWidth: 850, margin: 'auto' }}>

        <button
          type="button"
          onClick={onCancel}
          style={{
            border: 0,
            background: 'transparent',
            cursor: 'pointer',
            color: '#16856b',
            fontWeight: 600,
            marginBottom: 20
          }}>
          ← Back to dashboard
        </button>

        <div style={{
          background: '#102b35',
          color: 'white',
          padding: '30px',
          borderRadius: 18,
          marginBottom: 24
        }}>
          <div style={{
            color: '#8fe0c3',
            fontSize: 12,
            letterSpacing: 2
          }}>
            TRIPWISE TRAVEL PLANNER
          </div>

          <h1 style={{ fontSize: 30, margin: '12px 0' }}>
            Create Your Trip
          </h1>

          <p style={{ color: '#d1e1df', margin: 0 }}>
            Tell us what you're planning. We'll help
            you organize your perfect group journey.
          </p>
        </div>

        <form onSubmit={submit}>

          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 16,
            marginBottom: 20
          }}>
            <h2>01. Where are you going?</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 18
            }}>
              <div>
                <label style={labelStyle}>Starting location *</label>
                <input
                  style={fieldStyle}
                  placeholder="e.g. Guntur"
                  value={form.from}
                  onChange={e => update('from', e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Destination *</label>
                <input
                  style={fieldStyle}
                  placeholder="e.g. Goa"
                  value={form.destination}
                  onChange={e => update('destination', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 16,
            marginBottom: 20
          }}>
            <h2>02. When are you travelling?</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: 18
            }}>
              <div>
                <label style={labelStyle}>Departure date *</label>
                <input
                  type="date"
                  style={fieldStyle}
                  value={form.departure}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => update('departure', e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Return date *</label>
                <input
                  type="date"
                  style={fieldStyle}
                  value={form.returning}
                  min={form.departure || new Date().toISOString().split('T')[0]}
                  onChange={e => update('returning', e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Number of travellers *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  style={fieldStyle}
                  value={form.travellers}
                  onChange={e => update('travellers', e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Budget per person (₹) *</label>
                <input
                  type="number"
                  min="1"
                  style={fieldStyle}
                  placeholder="e.g. 10000"
                  value={form.budget}
                  onChange={e => update('budget', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 16,
            marginBottom: 20
          }}>
            <h2>03. Your travel preferences</h2>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Transportation</label>
              <select
                style={fieldStyle}
                value={form.transport}
                onChange={e => update('transport', e.target.value)}>
                <option>Any</option>
                <option>Train</option>
                <option>Bus</option>
                <option>Flight</option>
                <option>Car</option>
                <option>Self drive</option>
              </select>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Accommodation</label>
              <select
                style={fieldStyle}
                value={form.accommodation}
                onChange={e => update('accommodation', e.target.value)}>
                <option>Any</option>
                <option>Budget hotel</option>
                <option>Luxury hotel</option>
                <option>Resort</option>
                <option>Hostel</option>
                <option>Homestay</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Food preference</label>
              <select
                style={fieldStyle}
                value={form.food}
                onChange={e => update('food', e.target.value)}>
                <option>No preference</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Jain</option>
                <option>Non-vegetarian</option>
              </select>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 16,
            marginBottom: 20
          }}>
            <h2>04. What do you enjoy?</h2>
            <p style={{ color: '#687887', fontSize: 13 }}>
              Select all the activities your group likes.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10
            }}>
              {interests.map(item => (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleInterest(item)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 25,
                    border: form.interests.includes(item)
                      ? '1px solid #16856b'
                      : '1px solid #dce3e9',
                    background: form.interests.includes(item)
                      ? '#e1f5ed'
                      : 'white',
                    color: form.interests.includes(item)
                      ? '#087454'
                      : '#455468',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}>
                  {form.interests.includes(item) ? '✓ ' : '+ '}
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p style={{ color: '#c0392b', fontWeight: 600 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 16,
              border: 0,
              borderRadius: 12,
              background: '#16856b',
              color: 'white',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer'
            }}>
            Create My Trip →
          </button>

          <p style={{
            textAlign: 'center',
            color: '#77838d',
            fontSize: 12,
            marginTop: 14
          }}>
            Your trip details will be passed to the TripWise
            application for planning.
          </p>

        </form>
      </div>
    </div>
  );
}
