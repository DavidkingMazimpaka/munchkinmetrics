
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Camera, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface MeasurementFormProps {
  onSubmit?: (data: any) => void;
  childId?: string;
}

const MeasurementForm = ({ onSubmit, childId }: MeasurementFormProps) => {
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sex, setSex] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };
  
  const handleUploadClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    // Example calculation of derived fields (these would be properly calculated in a real app)
    const height = parseFloat(data.height as string) || 0;
    const weight = parseFloat(data.weight as string) || 0;
    const heightInMeters = height / 100;
    
    // In a real application, these Z-scores would be calculated using reference data
    // For this example, we're using placeholder calculations
    const calculatedData = {
      ...data,
      Height_m: heightInMeters,
      BMI: weight / (heightInMeters * heightInMeters),
      WHR: weight / height,
      height_for_age_z: Math.random() * 2 - 1, // Mock z-score between -1 and 1
      weight_for_height_z: Math.random() * 2 - 1, // Mock z-score between -1 and 1
      weight_for_age_z: Math.random() * 2 - 1, // Mock z-score between -1 and 1
    };
    
    if (onSubmit) {
      onSubmit(calculatedData);
    } else {
      toast.success("Data analyzed successfully!", {
        description: "Child measurement has been recorded and analyzed."
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{childId ? "Add New Measurement" : "Register New Child for Prediction"}</CardTitle>
        <CardDescription>
          Enter child's details to track nutrition status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="childName">Child's Name</Label>
            <Input id="childName" name="childName" placeholder="Full name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select name="sex" value={sex} onValueChange={setSex}>
              <SelectTrigger>
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Female (0)</SelectItem>
                <SelectItem value="1">Male (1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age (months)</Label>
            <Input id="age" name="age" type="number" step="0.1" placeholder="Enter age in months" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" name="height" type="number" step="0.1" placeholder="Enter height" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" step="0.1" placeholder="Enter weight" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height_for_age_z">Height-for-age Z-score</Label>
            <Input id="height_for_age_z" name="height_for_age_z" type="number" step="0.01" placeholder="Enter Z-score or leave for calculation" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight_for_height_z">Weight-for-height Z-score</Label>
            <Input id="weight_for_height_z" name="weight_for_height_z" type="number" step="0.01" placeholder="Enter Z-score or leave for calculation" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight_for_age_z">Weight-for-age Z-score</Label>
            <Input id="weight_for_age_z" name="weight_for_age_z" type="number" step="0.01" placeholder="Enter Z-score or leave for calculation" />
          </div>
          
          <div className="space-y-2">
            <Label>Child's Photo</Label>
            <div className="flex flex-col items-center gap-4">
              <input 
                type="file" 
                name="photo"
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              
              {photoPreview ? (
                <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
                  <img 
                    src={photoPreview} 
                    alt="Child's photo preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2"
                    onClick={handleUploadClick}
                    type="button"
                  >
                    <Camera className="h-4 w-4 mr-1" /> Change
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-40 flex flex-col items-center justify-center gap-2"
                  onClick={handleUploadClick}
                  type="button"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span>Upload Photo</span>
                </Button>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-[#7fcf5f] hover:bg-[#6cbf4f]">
            {childId ? "Save Measurement" : "Analyze Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
