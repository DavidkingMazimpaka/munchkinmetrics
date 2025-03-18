
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, ChevronRight, Ruler, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChildCardProps {
  id: string;
  name: string;
  age: string;
  gender: "male" | "female";
  weight: number;
  height: number;
  lastMeasurement: string;
  status: "normal" | "warning" | "danger";
  image?: string;
  listView?: boolean;
}

const ChildCard = ({
  id,
  name,
  age,
  gender,
  weight,
  height,
  lastMeasurement,
  status,
  image,
  listView = false
}: ChildCardProps) => {
  return listView ? (
    <Card className="overflow-hidden animate-fadeIn card-hover">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-24 h-24 bg-gradient-to-r from-accent to-primary/20">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
          <div className="absolute bottom-2 right-2">
            <div className={`w-3 h-3 rounded-full ${
              gender === "male" ? "bg-blue-500" : "bg-pink-500"
            }`}></div>
          </div>
        </div>
        <div className="p-4 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Badge 
                className={`${
                  status === "normal" ? "bg-secondary text-secondary-foreground" : 
                  status === "warning" ? "bg-warning text-warning-foreground" : 
                  "bg-destructive text-destructive-foreground"
                }`}
              >
                {status === "normal" ? "Normal" : 
                 status === "warning" ? "Warning" : 
                 "Critical"}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              Last measured: {lastMeasurement}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Age</div>
              <div className="font-medium">{age}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Weight</div>
              <div className="font-medium">{weight} kg</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Height</div>
              <div className="font-medium">{height} cm</div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button asChild variant="ghost" className="gap-1">
              <Link to={`/child/${id}`}>
                View Profile
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  ) : (
    <Card className="overflow-hidden animate-fadeIn card-hover">
      <CardHeader className="p-0">
        <div className="relative h-36 bg-gradient-to-r from-accent to-primary/20">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-background flex items-center justify-center text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
          <Badge 
            className={`absolute top-4 right-4 ${
              status === "normal" ? "bg-secondary text-secondary-foreground" : 
              status === "warning" ? "bg-warning text-warning-foreground" : 
              "bg-destructive text-destructive-foreground"
            }`}
          >
            {status === "normal" ? "Normal Growth" : 
             status === "warning" ? "Needs Attention" : 
             "Urgent Action Needed"}
          </Badge>
          {!image && (
            <div className="absolute bottom-4 right-4">
              <div className={`w-3 h-3 rounded-full ${
                gender === "male" ? "bg-blue-500" : "bg-pink-500"
              }`}></div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{age}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{lastMeasurement}</span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span>{weight} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span>{height} cm</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button asChild variant="ghost" className="gap-1">
          <Link to={`/child/${id}`}>
            View Profile
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChildCard;
