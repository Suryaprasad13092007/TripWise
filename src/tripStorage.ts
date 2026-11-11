import type {CreatedTrip,TripDay,TripStore} from './types';

export const TRIP_STORE_KEY='tripwise-trip-store';
const LEGACY_TRIPS_KEY='tripwise-trips';
const LEGACY_ACTIVE_TRIP_KEY='tripwise-active-trip';

const isRecord=(value:unknown):value is Record<string,unknown>=>Boolean(value&&typeof value==='object'&&!Array.isArray(value));
const asText=(value:unknown,fallback='')=>typeof value==='string'?value:fallback;
const asNumber=(value:unknown,fallback:number)=>typeof value==='number'&&Number.isFinite(value)?value:fallback;
const parseStored=(key:string):unknown=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null}catch{return null}};

function stableLegacyId(value:Record<string,unknown>,index:number){
  const source=[value.from,value.destination,value.departure,value.returning,value.createdAt,index].join('|');
  let hash=2166136261;
  for(let position=0;position<source.length;position++)hash=Math.imul(hash^source.charCodeAt(position),16777619);
  return `legacy-${(hash>>>0).toString(36)}`;
}

function normalizeItinerary(value:unknown,tripId:string):TripDay[]|undefined{
  if(!Array.isArray(value))return undefined;
  return value.filter(isRecord).map((day,index)=>({
    day:Math.max(1,asNumber(day.day,index+1)),
    date:asText(day.date,`Day ${index+1}`),
    activities:(Array.isArray(day.activities)?day.activities:[]).filter(isRecord).map((activity,activityIndex)=>({
      id:asText(activity.id,`${tripId}-activity-${index}-${activityIndex}`),
      time:asText(activity.time,'Flexible'),
      title:asText(activity.title,'Trip activity'),
      detail:asText(activity.detail,''),
      cost:Math.max(0,asNumber(activity.cost,0))
    }))
  }));
}

function normalizeTrip(value:unknown,index:number):CreatedTrip|null{
  if(!isRecord(value)||typeof value.destination!=='string'||!value.destination.trim())return null;
  const interests=Array.isArray(value.interests)?value.interests.filter((item):item is string=>typeof item==='string'):[];
  const trip:CreatedTrip={
    id:asText(value.id)||stableLegacyId(value,index),
    from:asText(value.from,'Not specified'),
    destination:value.destination.trim(),
    departure:asText(value.departure),
    returning:asText(value.returning),
    travellers:Math.max(1,asNumber(value.travellers,2)),
    budget:Math.max(0,asNumber(value.budget,0)),
    transport:asText(value.transport,'Any'),
    accommodation:asText(value.accommodation,'Any'),
    food:asText(value.food,'No preference'),
    interests,
    createdAt:asText(value.createdAt),
    status:asText(value.status,'Planning')
  };
  const itinerary=normalizeItinerary(value.itinerary,trip.id);
  if(itinerary)trip.itinerary=itinerary;
  return trip;
}

function normalizeStore(value:unknown):TripStore|null{
  if(!isRecord(value)||value.version!==1||!Array.isArray(value.trips))return null;
  const trips=value.trips.map(normalizeTrip).filter((trip):trip is CreatedTrip=>trip!==null);
  const uniqueTrips:CreatedTrip[]=[];
  const usedIds=new Set<string>();
  trips.forEach((trip,index)=>{
    const id=usedIds.has(trip.id)?`${trip.id}-${index+1}`:trip.id;
    usedIds.add(id);
    uniqueTrips.push(id===trip.id?trip:{...trip,id});
  });
  const tripIds=new Set(uniqueTrips.map(trip=>trip.id));
  const savedTripIds=Array.isArray(value.savedTripIds)?[...new Set(value.savedTripIds.filter((id):id is string=>typeof id==='string'&&tripIds.has(id)))]:[];
  const activeTripId=typeof value.activeTripId==='string'&&tripIds.has(value.activeTripId)?value.activeTripId:null;
  return{version:1,trips:uniqueTrips,savedTripIds,activeTripId};
}

export function createTripId(){
  return typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function'?crypto.randomUUID():`trip-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function writeTripStore(store:TripStore){
  try{localStorage.setItem(TRIP_STORE_KEY,JSON.stringify(store));return true}catch{return false}
}

export function readTripStore():TripStore{
  const current=normalizeStore(parseStored(TRIP_STORE_KEY));
  if(current)return current;

  const legacyTripsValue=parseStored(LEGACY_TRIPS_KEY);
  const legacyTrips=Array.isArray(legacyTripsValue)?legacyTripsValue:isRecord(legacyTripsValue)&&Array.isArray(legacyTripsValue.trips)?legacyTripsValue.trips:[];
  const legacyActive=normalizeTrip(parseStored(LEGACY_ACTIVE_TRIP_KEY),legacyTrips.length);
  const trips=legacyTrips.map(normalizeTrip).filter((trip):trip is CreatedTrip=>trip!==null);
  if(legacyActive&&!trips.some(trip=>trip.id===legacyActive.id))trips.push(legacyActive);

  const uniqueTrips:CreatedTrip[]=[];
  const usedIds=new Set<string>();
  trips.forEach((trip,index)=>{
    const id=usedIds.has(trip.id)?`${trip.id}-${index+1}`:trip.id;
    usedIds.add(id);
    uniqueTrips.push(id===trip.id?trip:{...trip,id});
  });
  const activeTripId=legacyActive?uniqueTrips.find(trip=>trip.id===legacyActive.id)?.id||null:null;
  const savedTripIds=uniqueTrips.filter(trip=>legacyTrips.some(item=>isRecord(item)&&(item.id===trip.id)&&(item.saved===true||item.isSaved===true))).map(trip=>trip.id);
  const migrated:TripStore={version:1,trips:uniqueTrips,savedTripIds,activeTripId};
  if(trips.length)writeTripStore(migrated);
  return migrated;
}
