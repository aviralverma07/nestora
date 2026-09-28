const cityImg = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`

export const featuredCities = [
  { id: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', count: 3, image: cityImg('photo-1600585154340-be6161a56a0c') },
  { id: 'delhi', name: 'Delhi', state: 'NCR', count: 3, image: cityImg('photo-1587474260584-136574528ed5') },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', count: 3, image: cityImg('photo-1596176530529-78163a4f7af2') },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', count: 3, image: cityImg('photo-1572445271230-a78b5944a659') },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', count: 3, image: cityImg('photo-1560184897-ae75f418493e') },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', count: 2, image: cityImg('photo-1477587458883-47145ed94245') },
]

export const popularSearches = [
  { label: 'Near IIT Roorkee', city: 'Roorkee', landmark: 'IIT Roorkee', lat: 29.8650, lng: 77.8964 },
  { label: 'Near Delhi University', city: 'Delhi', landmark: 'Delhi University North Campus', lat: 28.6889, lng: 77.2090 },
  { label: 'Near Bangalore Tech Park', city: 'Bangalore', landmark: 'Bangalore Tech Park', lat: 12.9698, lng: 77.7500 },
  { label: 'Near Manipal University', city: 'Jaipur', landmark: 'MNIT Jaipur', lat: 26.8620, lng: 75.8100 },
  { label: 'Near Pune University', city: 'Pune', landmark: 'Pune University', lat: 18.5089, lng: 73.8078 },
]

export const landmarks = [
  { name: 'IIT Roorkee', city: 'Roorkee', lat: 29.8650, lng: 77.8964 },
  { name: 'Graphic Era University', city: 'Dehradun', lat: 30.2686, lng: 78.0080 },
  { name: 'Delhi University North Campus', city: 'Delhi', lat: 28.6889, lng: 77.2090 },
  { name: 'Delhi University South Campus', city: 'Delhi', lat: 28.5895, lng: 77.1680 },
  { name: 'Bangalore Tech Park', city: 'Bangalore', lat: 12.9698, lng: 77.7500 },
  { name: 'Pune University', city: 'Pune', lat: 18.5089, lng: 73.8078 },
  { name: 'Symbiosis Pune', city: 'Pune', lat: 18.5590, lng: 73.7860 },
  { name: 'Hyderabad Financial District', city: 'Hyderabad', lat: 17.4160, lng: 78.3410 },
  { name: 'JNTU Hyderabad', city: 'Hyderabad', lat: 17.4930, lng: 78.3910 },
  { name: 'MNIT Jaipur', city: 'Jaipur', lat: 26.8620, lng: 75.8100 },
]