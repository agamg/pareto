"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronRight, Calendar, Play } from "lucide-react"; // Assuming icons from Lucide
import { Textarea } from "@/components/ui/textarea"; // Search input styled for input
import Fuse from "fuse.js"; // Import Fuse.js for fuzzy searching

const workflowData = [
    {
      id: 1,
      name: "Data Processing Workflow",
      created: "January 12, 2024",
      runs: 32,
      description: "This workflow processes data and generates insights. It helps to clean, transform, and analyze data for better decision-making and reporting."
    },
    {
      id: 2,
      name: "Email Automation",
      created: "February 20, 2024",
      runs: 45,
      description: "Automate sending emails based on triggers. This workflow is ideal for marketing campaigns, transactional emails, and customer follow-ups."
    },
    {
      id: 3,
      name: "File Backup",
      created: "March 5, 2024",
      runs: 20,
      description: "Back up files to the cloud automatically. Ensures data safety and quick recovery in case of system failures or data loss."
    },
    {
      id: 4,
      name: "Image Processing",
      created: "April 10, 2024",
      runs: 15,
      description: "Process and optimize images in bulk. Includes resizing, format conversion, and quality enhancement for efficient image management."
    },
    {
      id: 5,
      name: "Customer Feedback Analysis",
      created: "May 15, 2024",
      runs: 25,
      description: "Analyze customer feedback from various sources. Helps to identify trends, sentiments, and areas of improvement in customer service."
    },
    {
      id: 6,
      name: "Social Media Monitoring",
      created: "June 8, 2024",
      runs: 18,
      description: "Monitor social media mentions and trends. Provides insights into brand perception and competitor analysis."
    },
    {
      id: 7,
      name: "Sales Data Integration",
      created: "July 22, 2024",
      runs: 40,
      description: "Integrate sales data from multiple channels. This workflow helps in creating a unified view of sales performance and forecasting."
    },
    {
      id: 8,
      name: "Inventory Management",
      created: "August 3, 2024",
      runs: 28,
      description: "Track and manage inventory levels in real-time. Helps to avoid stockouts and overstocking by providing accurate inventory insights."
    },
  ];

// Configure Fuse.js options
const fuseOptions = {
  keys: ["name", "description"],
  threshold: 0.3, // Adjust this value for more/less fuzzy matching
};
const fuse = new Fuse(workflowData, fuseOptions);

const exampleQueries = [
  "Data Processing Workflow",
  "Email Automation",
  "Customer Feedback Analysis",
  "Sales Data Integration",
  "Inventory Management"
];

export default function SearchCard() {
  const [query, setQuery] = useState(""); // State to hold the search query
  const [placeholder, setPlaceholder] = useState(""); // State to hold the placeholder text
  const router = useRouter();
  useEffect(() => {
    let currentIndex = 0;
    let currentCharIndex = 0;
    let typingForward = true;
  
    const typeEffect = () => {
      if (typingForward) {
        if (currentCharIndex < exampleQueries[currentIndex].length) {
          setPlaceholder(exampleQueries[currentIndex].slice(0, currentCharIndex + 1));
          currentCharIndex++;
        } else {
          typingForward = false;
          setTimeout(() => {
            typeEffect(); // Start deleting after a longer pause
          }, 1500); // Pause for 1.5 seconds before starting to delete
          return;
        }
      } else {
        if (currentCharIndex > 0) {
          setPlaceholder(exampleQueries[currentIndex].slice(0, currentCharIndex - 1));
          currentCharIndex--;
        } else {
          typingForward = true;
          currentIndex = (currentIndex + 1) % exampleQueries.length;
        }
      }
      setTimeout(typeEffect, typingForward ? 20 : 10); // Typing and deleting speeds remain fast
    };
  
    const typingTimeout = setTimeout(typeEffect, 300); // Initial start delay
  
    return () => clearTimeout(typingTimeout);
  }, []);
  
  

  // Filter the workflow objects based on the query
  const filteredWorkflows = query ? fuse.search(query).map(result => result.item) : workflowData;

  // Handle card click to navigate to workflow details page
  const handleCardClick = (id) => {
    const encodedQuery = encodeURIComponent(query);
    router.push(`/workflows/${id}?previousQuery=${encodedQuery}`); // Navigate to the workflow details page with the query as part of the URL
  };

  return (
    <div className="transition-all duration-300 ease-in-out ">
      {/* Search Card */}
      <Card className="p-6 w-full max-w-4xl transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold mb-2">Search Workflows</h2>
        <p className="text-sm text-gray-500 mb-6">
          Find or create workflows based on your needs. Type a query below to start searching.
        </p>
        {/* Text Area - Capture input and update state */}
        <Textarea
          className="w-full h-24 bg-gray-100 p-3 text-md resize-none focus:outline-none border-none mb-4 italic text-indigo-600"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query on input change
        />

        {/* Conditional display of the search results */}
        {query && (
          <div className="border border-gray-300 bg-gray-50 rounded-md p-3 transition-all duration-300 ease-in-out space-y-3">
            {filteredWorkflows.length > 0 ? (
              <>
                {filteredWorkflows.map((workflow) => (
                  <Card
                    key={workflow.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleCardClick(workflow.id)}
                  >
                    <CardHeader className="p-3">
                      <h2 className="text-md font-semibold">{workflow.name}</h2>
                      <div className="text-xs text-black-200 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Created on {workflow.created}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2 pb-1">
                      <p className="text-sm text-black-600 m-0">{workflow.description}</p> {/* Removed margin */}
                    </CardContent>

                    <CardFooter className="bg-gray-50 flex justify-between items-center text-sm p-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Play className="h-4 w-4 mr-1" />
                        {workflow.runs} runs
                      </div>
                      {/* Right Arrow Icon as the button */}
                      <ChevronRight className="w-5 h-5 text-indigo-600 hover:text-indigo-700 transition-colors duration-300 cursor-pointer" />
                    </CardFooter>
                  </Card>
                ))}
                {/* Divider for OR option */}
                <div className="text-center text-gray-500 my-4">OR</div>
              </>
            ) : null}
            {/* Display New Workflow creation card always */}
            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3">
              <h2 className="text-md font-semibold">New Workflow</h2>
                <div className="text-xs text-gray-200 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Create workflow for "{query}"
                </div>
              </CardHeader>

              <CardContent className="pt-2 pb-1">
                <p className="text-sm text-black-600 m-0">
                  You can create a new workflow with this name.
                </p>
              </CardContent>

              <CardFooter className="bg-gray-50 flex justify-between items-center text-sm p-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Play className="h-4 w-4 mr-1" />
                  Start building now
                </div>
                <ChevronRight className="w-5 h-5 text-black hover:text-indigo-700 transition-colors duration-300 cursor-pointer" />
              </CardFooter>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}