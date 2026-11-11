import type {DemoProvider,Member,Message,TripState} from './types';
export const destinations=[
{name:'Goa',state:'Goa, India',tag:'Coast & culture',desc:'Sunlit beaches, Portuguese heritage, lively markets and laid-back coastal days.',budget:6500,styles:['Beaches','Relaxation','Food'],activities:['Beach hopping','Fort Aguada','Local markets'],image:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900',distance:4},
{name:'Pondicherry',state:'Puducherry, India',tag:'Slow living',desc:'French-quarter lanes, cafés, quiet shores and a calm creative energy.',budget:4800,styles:['Beaches','Culture','Relaxation'],activities:['White Town walk','Promenade','Auroville'],image:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900',distance:2},
{name:'Manali',state:'Himachal Pradesh, India',tag:'Mountain escape',desc:'Pine forests, mountain views, cafés and trails in the Himalayas.',budget:8500,styles:['Mountains','Adventure'],activities:['Solang Valley','Old Manali','Nature trails'],image:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900',distance:9},
{name:'Jaipur',state:'Rajasthan, India',tag:'Royal heritage',desc:'Pink-hued architecture, vibrant bazaars, forts and memorable food.',budget:5200,styles:['Culture','Food'],activities:['Amber Fort','Hawa Mahal','City Palace'],image:'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900',distance:5},
{name:'Munnar',state:'Kerala, India',tag:'Green retreat',desc:'Rolling tea gardens, cool air, waterfalls and scenic winding roads.',budget:7200,styles:['Mountains','Relaxation','Nature'],activities:['Tea museum','Eravikulam','Waterfalls'],image:'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900',distance:7},
{name:'Rishikesh',state:'Uttarakhand, India',tag:'River & adventure',desc:'Ganga-side cafés, yoga, river views and outdoor adventure.',budget:5600,styles:['Adventure','Nature','Relaxation'],activities:['River rafting','Ganga aarti','Riverside cafés'],image:'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=900',distance:6}
];
export const members:Member[]=[
{id:'m1',name:'Aarav',role:'Admin',interest:'Adventure, trekking',budget:8000,food:'Any',style:'Adventure',essential:''},
{id:'m2',name:'Diya',role:'Member',interest:'Beaches, relaxation',budget:7000,food:'Any',style:'Relaxation',essential:''},
{id:'m3',name:'Kabir',role:'Member',interest:'Budget-friendly experiences',budget:5000,food:'Any',style:'Budget',essential:'Budget under ₹5,000'},
{id:'m4',name:'Meera',role:'Member',interest:'Food and local culture',budget:6500,food:'Vegetarian',style:'Culture',essential:'Vegetarian food options'},
{id:'m5',name:'Ishaan',role:'Member',interest:'Comfort, short journeys',budget:6000,food:'Any',style:'Comfort',essential:'Comfortable stay'}
];
export const seedMessages:Message[]=[
{id:'1',author:'Aarav',text:'I would love a place with trekking or at least one adventure activity!',time:'10:02 AM'},
{id:'2',author:'Diya',text:'Can we balance that with a beach or somewhere peaceful? 🌊',time:'10:04 AM'},
{id:'3',author:'Kabir',text:'Let’s keep the budget around ₹5,000 per person if possible.',time:'10:06 AM'},
{id:'4',author:'Meera',text:'Vegetarian food options are important for me.',time:'10:08 AM'},
{id:'5',author:'Ishaan',text:'Please avoid very long travel. A comfortable stay matters too.',time:'10:11 AM'}
];
export const initialState:TripState={groupName:'Weekend Warriors',members,messages:seedMessages,votes:{Aarav:'Pondicherry',Diya:'Goa',Kabir:'Pondicherry',Meera:'Pondicherry'},expenses:[{id:'e1',title:'Advance stay estimate',category:'Accommodation',amount:8000,paidBy:'Aarav'},{id:'e2',title:'Group transport estimate',category:'Transportation',amount:4500,paidBy:'Diya'},{id:'e3',title:'Food allowance',category:'Food',amount:3500,paidBy:'Meera'},{id:'e4',title:'Activities',category:'Activities',amount:2000,paidBy:'Kabir'}],itinerary:[],destination:'Pondicherry',approved:false};
export const demoProviders:DemoProvider[]=[
{id:'demo-hotel-goa',name:'Coastal Stay Sample',category:'Hotels',destination:'Goa',description:'Example group-stay listing for planning discussions.'},
{id:'demo-hotel-pondicherry',name:'White Town Rooms Sample',category:'Hotels',destination:'Pondicherry',description:'Example accommodation listing near the heritage district.'},
{id:'demo-transport-goa',name:'Goa Local Ride Sample',category:'Transport',destination:'Goa',description:'Example local transport option; routes and terms are not verified.'},
{id:'demo-transport-jaipur',name:'Pink City Transit Sample',category:'Transport',destination:'Jaipur',description:'Example city transport option for a group itinerary.'},
{id:'demo-restaurant-pondicherry',name:'Garden Table Sample',category:'Restaurants',destination:'Pondicherry',description:'Example dining listing; check menus and dietary options directly.'},
{id:'demo-restaurant-jaipur',name:'Bazaar Kitchen Sample',category:'Restaurants',destination:'Jaipur',description:'Example restaurant listing for local-food planning.'},
{id:'demo-activity-manali',name:'Mountain Day Sample',category:'Activities',destination:'Manali',description:'Example outdoor activity; suitability and conditions are unverified.'},
{id:'demo-activity-rishikesh',name:'River Experience Sample',category:'Activities',destination:'Rishikesh',description:'Example activity listing; confirm safety, operators and availability directly.'}
];
