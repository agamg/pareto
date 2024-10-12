"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { workflowData2 } from "@/components/SupabaseCRUD";

// Define the Workflow type
type Workflow = {
  id: number;
  name: string;
  created_at: any;
  runs: number;
  description: string;
};



const runs = [
  { id: 1, status: "success", date: "2023-09-20", metadata: "Run details A" },
  { id: 2, status: "failed", date: "2023-09-21", metadata: "Run details B" },
  { id: 3, status: "processing", date: "2023-09-22", metadata: "Run details C" }
];

export default function WorkflowPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const previousQuery = searchParams.get("previousQuery") || "";

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [executeText, setExecuteText] = useState(previousQuery);
  const [highlightCard, setHighlightCard] = useState(false);





  useEffect(() => {
    const fetchWorkflow = async () => { // Make the function async
      if (id) {
        const workflows = await workflowData2();
        console.log("banana", workflows)

        const foundWorkflow = workflows.find((workflow) => workflow.id === parseInt(id));
        setWorkflow(foundWorkflow || null);
      }
      if (previousQuery) {
        setHighlightCard(true);
        setTimeout(() => setHighlightCard(false), 3000); // Highlight for 3 seconds
      }
    };

    fetchWorkflow(); // Call the async function
  }, [id, previousQuery]);

  if (!workflow) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-12">
      {/* Top Bar */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header Row */}


        <div className="flex">
          <div className="w-1/2 pr-4">
            <Card className="mb-6">
              <CardHeader>
              <div className="flex items-center"> 
              <CardTitle className="text-lg font-semibold">Workflow Name: {workflow.name}</CardTitle> {/* Workflow name */}
              {!workflow.done && (
                    <span className="text-red-500 text-sm ml-2">Processing</span> 
                  )}
              </div>

              
                <CardTitle className="text-xl font-semibold"></CardTitle>
                <CardDescription>Created on {workflow.created_at}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Number of runs: {workflow.runs}</p>
              </CardContent>
            </Card>
            {/* Execute Workflow Section */}
            <div className="rounded-md border p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Execute the Workflow</h2>
              <Textarea
                placeholder="Enter workflow execution details..."
                className="w-full h-32 mb-4"
                value={executeText}
                onChange={(e) => setExecuteText(e.target.value)}
              />
              <Button
                className={clsx(
                  "bg-green-600 text-white transition-all duration-500 ease-in-out border-2",
                  {
                    "animate-pulse border-indigo-500": highlightCard
                  }
                )}
              >
                Execute This Workflow
              </Button>
            </div>
          </div>
          
          {/* Right Split Screen */}
          <div className="w-1/2 pl-4">
            <div className="rounded-md border mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Metadata</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {runs.length ? (
                    runs.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell>{run.id}</TableCell>
                        <TableCell>{run.status}</TableCell>
                        <TableCell>{run.date}</TableCell>
                        <TableCell>{run.metadata}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="w-full h-80 bg-gray-100 flex items-start justify-center overflow-auto rounded-lg shadow-md"> {/* Subtle background and rounded corners */}
              <div className="flex flex-col space-y-4 p-6"> {/* Increased padding and spacing */}
                <h2 className="text-xl font-bold text-gray-800">Learned Actions</h2> {/* Enhanced title styling */}
                {workflow.actions && workflow.actions.length > 0 ? (
                  workflow.actions.map((action, index) => {
                    console.log(action); // Log each action to the console
                    return (
                      <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"> {/* Card style with hover effect */}
                        <p className="text-gray-700 text-base">{action.step}</p> {/* Enhanced text styling */}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No learned actions available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
