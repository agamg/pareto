import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; // Importing up/down chevrons

interface StatCardProps {
  title: string;
  description: string;
  workflows: { name: string; runs: number }[]; // Workflows with name and run count
}
export default function StatCard({ title, description, workflows }: StatCardProps) {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => setExpanded(!expanded);
  
    const totalRuns = workflows.reduce((acc, workflow) => acc + workflow.runs, 0);
  
    return (
      <div className="bg-white shadow-2xl rounded-xl p-6 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
  
        {/* Show total runs and smaller "workflows automated" on the same line */}
        <div className="flex items-baseline mb-4">
          <span className="text-xl font-bold text-indigo-600">{totalRuns}</span>
          <span className="ml-2 text-sm text-gray-500">workflows automated</span>
        </div>
  
        {/* Click-to-Dropdown for Workflows with chevron */}
        <div
          onClick={toggleExpand}
          className="cursor-pointer flex justify-between items-center text-gray-500 text-sm hover:text-indigo-600 transition-colors duration-300"
        >
          <span>{expanded ? "Hide workflows automated" : "View workflows automated"}</span>
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
  
        {/* Only expand the height of this specific box when expanded is true */}
        {expanded && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4 max-h-32 overflow-y-auto transition-all duration-300 ease-in-out">
            {workflows.map((workflow, index) => (
              <div key={index} className="border-b py-2 flex justify-between items-center last:border-b-0 text-xs">
                <span>{workflow.name}</span>
                <span className="text-gray-500">{workflow.runs} runs</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  