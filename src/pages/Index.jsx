
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ChildCard from "@/components/ChildCard";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Info, LayoutGrid, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import AlertBanner from "@/components/AlertBanner";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  
  // Fetch children data using React Query
  const { data: children = [], isLoading, error } = useQuery({
    queryKey: ['children'],
    queryFn: api.getAllChildren
  });
  
  useEffect(() => {
    if (error) {
      toast.error("Failed to load children data", {
        description: "Please check your connection and try again."
      });
    }
  }, [error]);
  
  const filteredChildren = children.filter(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const urgentCases = filteredChildren.filter(child => child.status === "danger").length;
  const warningCases = filteredChildren.filter(child => child.status === "warning").length;
  
  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Child Growth Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and track children's growth metrics for better health outcomes
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search children..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild className="whitespace-nowrap">
              <Link to="/add-measurement">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Child
              </Link>
            </Button>
          </div>
        </div>
        
        {(urgentCases > 0 || warningCases > 0) && (
          <div className="mb-6 space-y-3">
            {urgentCases > 0 && (
              <AlertBanner
                status="danger"
                title={`${urgentCases} ${urgentCases === 1 ? "child requires" : "children require"} urgent attention`}
                description="These children have critical growth metrics and need immediate intervention."
              />
            )}
            {warningCases > 0 && (
              <AlertBanner
                status="warning"
                title={`${warningCases} ${warningCases === 1 ? "child needs" : "children need"} monitoring`}
                description="These children have concerning growth patterns and should be closely monitored."
              />
            )}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
            Showing {filteredChildren.length} {filteredChildren.length === 1 ? "child" : "children"}
          </div>
          
          <Tabs defaultValue="grid" value={viewMode} onValueChange={(v) => setViewMode(v)}>
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Grid</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-1">
                <LayoutList className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">List</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : filteredChildren.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredChildren.map((child) => (
                <ChildCard key={child.id} {...child} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredChildren.map((child) => (
                <ChildCard key={child.id} {...child} listView />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border border-dashed">
            <div className="bg-muted/30 p-4 rounded-full mb-4">
              <Info className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No children found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchTerm 
                ? `No results matching "${searchTerm}"`
                : "Start by adding a child to monitor their growth"}
            </p>
            <Button asChild>
              <Link to="/add-measurement">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add First Child
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
