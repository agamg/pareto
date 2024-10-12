"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Terminal, Calendar as CalendarIcon, Play, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { format } from "date-fns";
import { workflowData2 } from "@/components/SupabaseCRUD";


// Helper function to check date range
// Helper function to check date range
const isWithinDateRange = (workflowDate: string, filterDate: string) => {
  return new Date(workflowDate) >= new Date(filterDate);
};

export default function MakePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minRuns, setMinRuns] = useState(""); // Minimum number of runs
  const [minDate, setMinDate] = useState<Date | null>(null); // Updated type to Date | null

  const [workflows, setWorkflowData] = useState([]); // State to hold workflow data

    useEffect(() => {
        const initializeData = async () => {
            const data = await workflowData2();
            console.log(data)
            setWorkflowData(data); // Set the fetched data to state
        };
        initializeData();
    }, []);



  // Filtered workflows based on the search query, date, and runs
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = minDate ? isWithinDateRange(workflow.created_at, minDate) : true;
    const matchesRuns = minRuns ? workflow.runs >= Number(minRuns) : true;
    return matchesSearch && matchesDate && matchesRuns;
  });

  return (
    <div className="p-12">
      <Header />

      <div>
        <Alert className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>
            <strong>Workflow Management</strong>
          </AlertTitle>
          <AlertDescription>
            Create, manage, and monitor your workflows efficiently. Click on a workflow to view details or create a new
            one.
          </AlertDescription>
        </Alert>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <Input
              placeholder="Search workflows..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ShadCN Date Picker Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48 justify-between">
                {minDate ? format(minDate, "PPP") : "Filter by date"}
                <CalendarIcon className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={minDate}
                onSelect={(date) => setMinDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Filter by Number of Runs */}
          <div className="w-48">
            <Input
              type="number"
              placeholder="Minimum runs"
              className="w-full"
              value={minRuns}
              onChange={(e) => setMinRuns(e.target.value)}
            />
          </div>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* "Add New Workflow" Card */}
          <Link href="/buildworkflows" passHref>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer bg-white text-black h-[200px]">
              <CardContent className="flex flex-col items-center py-4"> {/* Reduced padding */}
                <Plus className="h-8 w-8 mb-2" /> {/* Reduced icon size */}
                <h3 className="text-lg font-semibold">Build a New Workflow</h3> {/* Reduced font size */}
              </CardContent>
            </Card>
          </Link>

          {/* Displaying Filtered Workflows */}
          {filteredWorkflows.length > 0 ? (
            filteredWorkflows.map((workflow) => (
              <Link key={workflow.id} href={`/workflows/${workflow.id}`} passHref>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-[200px]"> {/* Set consistent height */}
                  <CardHeader >

                  <div className="flex items-center"> 
              <CardTitle className="text-lg font-semibold">{workflow.name}</CardTitle> {/* Workflow name */}
              {!workflow.done && (
                    <span className="text-red-500 text-sm ml-2">Processing</span> 
                  )}
              </div>
 

                   
                      <CardDescription className=" flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Created on {workflow.created_at}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2"> {/* Reduced padding */}
                    <p className="text-gray-600 text-sm">This workflow processes data and generates insights.</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50 flex justify-between items-center p-2"> {/* Reduced padding */}
                    <div className="flex items-center text-xs text-gray-500">
                      <Play className="h-4 w-4 mr-1" />
                      {workflow.runs} runs
                    </div>
                    <button className="px-2 py-1 text-white rounded-full text-xs hover:bg-gray-700 transition-colors duration-300">
                      <ChevronRight className="text-black w-4 h-4" /> {/* Updated class */}
                    </button>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No workflows found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

