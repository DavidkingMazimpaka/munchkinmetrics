
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

const MeasurementForm = () => {
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
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
    toast.success("Data analyzed successfully!", {
      description: "Child measurement has been recorded and analyzed."
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register New child for prediction</CardTitle>
        <CardDescription>
          Enter child's details to track nutrition status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="childName">Child's Name</Label>
            <Input id="childName" placeholder="Full name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="Enter height" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="Enter weight" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="muac">Mid-Upper Arm Circumference (cm)</Label>
            <Input id="muac" type="number" placeholder="Enter MUAC" />
          </div>
          
          <div className="space-y-2">
            <Label>Child's Photo</Label>
            <div className="flex flex-col items-center gap-4">
              <input 
                type="file" 
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
                  >
                    <Camera className="h-4 w-4 mr-1" /> Change
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-40 flex flex-col items-center justify-center gap-2"
                  onClick={handleUploadClick}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span>Upload Photo</span>
                </Button>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-[#7fcf5f] hover:bg-[#6cbf4f]">
            Analyze Data
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
