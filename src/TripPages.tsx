import {useMemo,useState} from 'react';
import {ArrowRight,Bookmark,CalendarDays,CheckCircle2,MapPin,Trash2,Users,Wallet} from 'lucide-react';
import {demoProviders} from './data';
import type {CreatedTrip,DemoProvider,ProviderCategory,SubmittedEnquiry} from './types';

const categories:('All'|ProviderCategory)[]=['All','Hotels','Transport','Restaurants','Activities'];
const money=(amount:number)=>'₹'+amount.toLocaleString('en-IN');
const displayDate=(value:string)=>new Date(`${value}T00:00:00`).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});

type MyTripsPageProps={trips:CreatedTrip[];savedTripIds:string[];onOpenTrip:(trip:CreatedTrip)=>void;onOpenGuide:(trip:CreatedTrip)=>void;onToggleSave:(trip:CreatedTrip)=>void;savedOnly?:boolean;title?:string;description?:string;onBrowseTrips?:()=>void};
export function MyTripsPage({trips,savedTripIds,onOpenTrip,onOpenGuide,onToggleSave,savedOnly=false,title='My Trips',description='Review saved plans and continue planning with your group.',onBrowseTrips}:MyTripsPageProps){
  const visibleTrips=savedOnly?trips.filter(trip=>savedTripIds.includes(trip.id)):trips;
  return <>
    <div className="page-intro"><div><span className="eyebrow">YOUR TRIP LIBRARY</span><h1>{title}</h1><p>{description}</p></div></div>
    {visibleTrips.length===0?<div className="empty-state"><CalendarDays size={35}/><h3>{savedOnly?'No saved trips yet':'No trips created yet'}</h3><p>{savedOnly?'Save a trip from My Trips to keep it here.':'Create a trip to save its details in this browser.'}</p>{savedOnly&&onBrowseTrips&&<button className="btn primary" onClick={onBrowseTrips}>Browse My Trips <ArrowRight size={15}/></button>}</div>:<div className="created-trips-list">{visibleTrips.map(trip=><article className="panel created-trip" key={trip.id}>
      <div className="created-trip-heading"><div><span className="eyebrow">{trip.status.toUpperCase()} · SAVED LOCALLY</span><h3>{trip.destination}</h3></div><div className="created-trip-actions"><button className="btn outline" onClick={()=>onToggleSave(trip)}><Bookmark size={15}/>{savedTripIds.includes(trip.id)?'Remove saved':'Save trip'}</button><button className="btn outline" onClick={()=>onOpenTrip(trip)}>Use for planning <ArrowRight size={15}/></button><button className="btn primary" onClick={()=>onOpenGuide(trip)}>View Complete Trip Guide <ArrowRight size={15}/></button></div></div>
      <div className="created-trip-meta"><span><MapPin size={15}/>{trip.from} to {trip.destination}</span><span><CalendarDays size={15}/>{displayDate(trip.departure)} – {displayDate(trip.returning)}</span><span><Users size={15}/>{trip.travellers} travellers</span><span><Wallet size={15}/>{money(trip.budget)} per person</span></div>
      <details className="trip-details"><summary>Review trip details and preferences</summary><div className="trip-detail-grid"><p><b>Starting location</b><span>{trip.from}</span></p><p><b>Transportation</b><span>{trip.transport}</span></p><p><b>Accommodation</b><span>{trip.accommodation}</span></p><p><b>Food</b><span>{trip.food}</span></p><p className="trip-interests"><b>Interests</b><span>{trip.interests.length?trip.interests.join(', '):'None selected'}</span></p></div></details>
    </article>)}</div>}
  </>;
}

type ProviderMarketplaceProps={destination:string;onEnquiry:(provider:DemoProvider)=>void};
export function ProviderMarketplace({destination,onEnquiry}:ProviderMarketplaceProps){
  const [search,setSearch]=useState(destination);
  const [category,setCategory]=useState<(typeof categories)[number]>('All');
  const providers=useMemo(()=>demoProviders.filter(provider=>(category==='All'||provider.category===category)&&(!search.trim()||provider.destination.toLowerCase().includes(search.trim().toLowerCase()))),[category,search]);
  return <>
    <div className="page-intro"><div><span className="eyebrow">SAMPLE LISTINGS · DEMO ONLY</span><h1>Explore Providers</h1><p>Browse fictional planning examples by destination. No booking or availability is represented.</p></div></div>
    <div className="filterbar provider-filters"><label className="searchbox"><MapPin size={17}/><input aria-label="Search providers by destination" placeholder="Search destination…" value={search} onChange={event=>setSearch(event.target.value)}/></label><div className="filter-select"><label htmlFor="provider-category">Category</label><select id="provider-category" value={category} onChange={event=>setCategory(event.target.value as (typeof categories)[number])}>{categories.map(item=><option key={item}>{item}</option>)}</select></div></div>
    <div className="provider-grid">{providers.length?providers.map(provider=><article className="panel provider-card" key={provider.id}><div className="provider-card-top"><span className="soft-tag">{provider.category}</span><span className="data-label">DEMO SAMPLE</span></div><h3>{provider.name}</h3><p className="provider-destination"><MapPin size={14}/>{provider.destination}</p><p>{provider.description}</p><button className="btn outline" onClick={()=>onEnquiry(provider)}>Send demo enquiry <ArrowRight size={15}/></button></article>):<div className="empty-state"><MapPin size={32}/><h3>No sample listings found</h3><p>Try another destination or category.</p></div>}</div>
    <div className="callout provider-disclaimer"><p>All provider names and listings are fictional samples. Enquiries are demo-only; no booking is made or confirmed. Verify providers, details, prices, safety and availability independently.</p></div>
  </>;
}

type MyEnquiriesPageProps={enquiries:SubmittedEnquiry[];onDelete:(id:string)=>void};
export function MyEnquiriesPage({enquiries,onDelete}:MyEnquiriesPageProps){
  return <>
    <div className="page-intro"><div><span className="eyebrow">YOUR DEMO REQUESTS</span><h1>My Enquiries</h1><p>Review demo enquiry records saved in this browser.</p></div></div>
    {enquiries.length===0?<div className="empty-state"><CheckCircle2 size={35}/><h3>No enquiries yet</h3><p>Use “Send demo enquiry” on a sample provider to add one here.</p></div>:<div className="created-trips-list">{enquiries.map(enquiry=><article className="panel enquiry-card" key={enquiry.id}>
      <div className="enquiry-card-heading"><div><span className="eyebrow">{enquiry.category.toUpperCase()}</span><h3>{enquiry.providerName}</h3></div><span className="enquiry-status"><CheckCircle2 size={15}/>{enquiry.status}</span></div>
      <div className="enquiry-card-meta"><span><MapPin size={15}/>{enquiry.destination}</span><span><CalendarDays size={15}/>{new Date(enquiry.submittedAt).toLocaleString()}</span></div>
      <div className="enquiry-card-actions"><small>Demo record only · No booking was made or confirmed</small><button className="icon-btn danger" aria-label={`Delete enquiry for ${enquiry.providerName}`} title="Delete enquiry" onClick={()=>onDelete(enquiry.id)}><Trash2 size={16}/></button></div>
    </article>)}</div>}
  </>;
}
