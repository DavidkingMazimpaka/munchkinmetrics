
/**
 * API Service for NutriGuard
 * Handles all backend communication
 */

// Base URL for API requests - would be configured based on environment in production
const API_BASE_URL = 'https://api.nutriguard.example/v1';

// Types for API requests and responses
export interface MeasurementData {
  childName: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  height_for_age_z: number;
  weight_for_height_z: number;
  weight_for_age_z: number;
  Height_m: number;
  BMI: number;
  WHR: number;
  photoUrl?: string;
}

export interface ChildProfileData {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  lastMeasurement: string;
  status: "normal" | "warning" | "danger";
  image?: string;
  measurements: MeasurementHistory[];
}

export interface MeasurementHistory {
  date: string;
  age: number;
  weight: number;
  height: number;
  weightForAge: number;
  heightForAge: number;
  weightForHeight: number;
}

// Error handling helper
const handleApiError = (error: unknown): never => {
  console.error('API Error:', error);
  
  if (error instanceof Response) {
    throw new Error(`API error: ${error.status} ${error.statusText}`);
  }
  
  throw new Error('Network error or unexpected API failure');
};

/**
 * API Service for NutriGuard
 */
export const api = {
  /**
   * Submit new child measurement data
   */
  submitMeasurement: async (data: MeasurementData): Promise<{ id: string; status: string }> => {
    try {
      // In a real app, this would be a fetch call to the backend
      console.log('Submitting measurement data:', data);
      
      // Mock successful response for demo purposes
      return {
        id: `child_${Date.now()}`,
        status: 'success'
      };
      
      // Real implementation would be:
      // const response = await fetch(`${API_BASE_URL}/measurements`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (!response.ok) {
      //   throw response;
      // }
      // 
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  /**
   * Get all children profiles for dashboard
   */
  getAllChildren: async (): Promise<ChildProfileData[]> => {
    try {
      // In a real app, this would fetch from the backend
      console.log('Fetching all children');
      
      // Mock data for demo purposes
      return [
        {
          id: 'child_1',
          name: 'Sarah Johnson',
          age: 28,
          gender: 'female',
          weight: 11.5,
          height: 86.4,
          lastMeasurement: '2023-08-15',
          status: 'normal',
          measurements: [
            {
              date: '2023-08-15',
              age: 28,
              weight: 11.5,
              height: 86.4,
              weightForAge: 0.2,
              heightForAge: 0.5,
              weightForHeight: 0.1,
            }
          ]
        },
        {
          id: 'child_2',
          name: 'Michael Osei',
          age: 18,
          gender: 'male',
          weight: 8.1,
          height: 76.2,
          lastMeasurement: '2023-09-05',
          status: 'warning',
          measurements: [
            {
              date: '2023-09-05',
              age: 18,
              weight: 8.1,
              height: 76.2,
              weightForAge: -1.8,
              heightForAge: -0.9,
              weightForHeight: -1.6,
            }
          ]
        },
        {
          id: 'child_3',
          name: 'Ama Mensah',
          age: 12,
          gender: 'female',
          weight: 5.8,
          height: 65.1,
          lastMeasurement: '2023-09-20',
          status: 'danger',
          measurements: [
            {
              date: '2023-09-20',
              age: 12,
              weight: 5.8,
              height: 65.1,
              weightForAge: -2.7,
              heightForAge: -1.1,
              weightForHeight: -2.5,
            }
          ]
        }
      ];
      
      // Real implementation would be:
      // const response = await fetch(`${API_BASE_URL}/children`);
      // 
      // if (!response.ok) {
      //   throw response;
      // }
      // 
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  /**
   * Get single child profile by ID
   */
  getChildById: async (childId: string): Promise<ChildProfileData> => {
    try {
      // In a real app, this would fetch from the backend
      console.log(`Fetching child with ID: ${childId}`);
      
      // Mock data for demo purposes - in real app would fetch specific child
      return {
        id: childId,
        name: 'Sarah Johnson',
        age: 28,
        gender: 'female',
        weight: 11.5,
        height: 86.4,
        lastMeasurement: '2023-08-15',
        status: 'normal',
        measurements: [
          {
            date: '2023-08-15',
            age: 28,
            weight: 11.5,
            height: 86.4,
            weightForAge: 0.2,
            heightForAge: 0.5,
            weightForHeight: 0.1,
          },
          {
            date: '2023-07-15',
            age: 27,
            weight: 11.2,
            height: 85.9,
            weightForAge: 0.1,
            heightForAge: 0.4,
            weightForHeight: 0.1,
          },
          {
            date: '2023-06-15',
            age: 26,
            weight: 10.9,
            height: 85.1,
            weightForAge: 0.0,
            heightForAge: 0.3,
            weightForHeight: 0.0,
          }
        ]
      };
      
      // Real implementation would be:
      // const response = await fetch(`${API_BASE_URL}/children/${childId}`);
      // 
      // if (!response.ok) {
      //   throw response;
      // }
      // 
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  /**
   * Add new measurement for existing child
   */
  addMeasurementForChild: async (childId: string, data: MeasurementData): Promise<{ status: string }> => {
    try {
      // In a real app, this would be a fetch call to the backend
      console.log(`Adding measurement for child ${childId}:`, data);
      
      // Mock successful response for demo purposes
      return {
        status: 'success'
      };
      
      // Real implementation would be:
      // const response = await fetch(`${API_BASE_URL}/children/${childId}/measurements`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (!response.ok) {
      //   throw response;
      // }
      // 
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  /**
   * Analyze child measurement data for malnutrition prediction
   */
  analyzeMeasurements: async (data: MeasurementData): Promise<{
    classification: "low" | "moderate" | "high" | "critical";
    probability: number;
    zScores: {
      heightForAge: number;
      weightForHeight: number;
      weightForAge: number;
    };
  }> => {
    try {
      // In a real app, this would call an ML backend
      console.log('Analyzing measurement data:', data);
      
      // Mock data for demo - in real app would be result of ML model
      // Here we're using the z-scores to determine classification
      const avgZScore = (
        data.height_for_age_z + 
        data.weight_for_height_z + 
        data.weight_for_age_z
      ) / 3;
      
      let classification: "low" | "moderate" | "high" | "critical" = "low";
      let probability = 0.1;
      
      if (avgZScore < -2) {
        classification = "critical";
        probability = 0.9;
      } else if (avgZScore < -1.5) {
        classification = "high";
        probability = 0.7;
      } else if (avgZScore < -1) {
        classification = "moderate";
        probability = 0.4;
      }
      
      return {
        classification,
        probability,
        zScores: {
          heightForAge: data.height_for_age_z,
          weightForHeight: data.weight_for_height_z,
          weightForAge: data.weight_for_age_z
        }
      };
      
      // Real implementation would be:
      // const response = await fetch(`${API_BASE_URL}/analyze`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (!response.ok) {
      //   throw response;
      // }
      // 
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export default api;
