import readline from 'readline';
import axios from "axios";
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

interface PlaceResult {
    name: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
  }
  
  async function getPlaceDetails(placeId: string, apiKey: string): Promise<string | null> {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
      const response = await axios.get(url);
      const result = response.data.result;
  
      // Get phone number
      const phoneNumber = result.formatted_phone_number;
  
      return phoneNumber;
    } 
    catch (er) 
    {
      console.error('Error:', er);
      return null;
    }
  }
  
  async function searchPlaces(query: string): Promise<any[]> {
    try 
    {
      const apiKey = process.env.GOOGLE_MAP_API!; // Google Maps API
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${apiKey}`;
  
      let response = await axios.get(url);
      let results: PlaceResult[] = response.data.results;
  
      let count = 0;
      const places: any[] = [];
      while (count < 100 && response.data.next_page_token) {
        for (const place of results) {
          if (count >= 100) break;
  
          const name = place.name;
          const address = place.formatted_address;
          const coordinates = place.geometry.location;
  
          const phoneNumber = await getPlaceDetails(place.place_id, apiKey);
  
          const placeData = {
            index: count + 1,
            name,
            address,
            coordinates,
            phoneNumber: phoneNumber || 'Phone number not found',
          };
  
          places.push(placeData);
          count++;
        }
  
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        const nextPageToken = response.data.next_page_token;
        const nextPageUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${apiKey}`;
  
        response = await axios.get(nextPageUrl);
        results = response.data.results;
      }
  

      return places;
    } 
    catch (error) 
    {
      console.error('Error:', error);
      return [];
    }
  }

  rl.question('Please enter an query: ', async (answer) => {
    try 
    {
      const places = await searchPlaces(answer);
      console.log('Results:');
      console.log(places);
    } 
    catch (error) 
    {
      console.error('Error:', error);
    } 
    finally 
    {
      rl.close();
    }
  });