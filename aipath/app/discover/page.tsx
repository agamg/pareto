"use client"
import Header from "@/components/Header";
import SearchCard from "@/components/SearchCard";
import StatCard from "@/components/StatCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // For styling the stat cards
import { Input } from "@/components/ui/input"; // For search-like input
import { Textarea } from "@/components/ui/textarea"; // Textarea styled for search
import { Terminal } from "lucide-react";

const workflows = [
  { name: "Lead Management", date: "2023-10-01", status: "Success" },
  { name: "Opportunity Tracking", date: "2023-10-02", status: "Success" },
  { name: "Email Campaigns", date: "2023-10-03", status: "Fail" },
  { name: "Sales Forecasting", date: "2023-10-04", status: "Success" },
  { name: "Case Management", date: "2023-10-05", status: "Success" },
  { name: "Customer Feedback", date: "2023-10-06", status: "Success" },
  { name: "Inventory Update", date: "2023-10-07", status: "Success" },
  { name: "User Registration", date: "2023-10-08", status: "Fail" },
  { name: "Payment Processing", date: "2023-10-09", status: "Success" },
  { name: "Data Backup", date: "2023-10-10", status: "Success" },
  { name: "Report Generation", date: "2023-10-11", status: "Success" },
  { name: "Email Notifications", date: "2023-10-12", status: "Success" },
  { name: "User Login", date: "2023-10-13", status: "Success" },
  { name: "Password Reset", date: "2023-10-14", status: "Fail" },
  { name: "Profile Update", date: "2023-10-15", status: "Success" },
  { name: "Subscription Renewal", date: "2023-10-16", status: "Success" },
  { name: "Feedback Submission", date: "2023-10-17", status: "Success" },
  { name: "Data Import", date: "2023-10-18", status: "Success" },
  { name: "Data Export", date: "2023-10-19", status: "Success" },
  { name: "System Update", date: "2023-10-20", status: "Success" },
];

export default function Dashboard() {
  return (
    <div className="p-12">
      {/* Top Bar */}
    <Header/>




      {/* Stats Cards */}
      
      <div>
  {/* Header */}
  <h2 className="text-xl font-bold mb-6 text-gray-800">Your Top Automated Platforms</h2>

  {/* StatCard Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
    <StatCard
      title="Salesforce"
      description="CRM and Sales Automation"
      workflows={[
        { name: "Lead Management", runs: 4200 },
        { name: "Opportunity Tracking", runs: 3800 },
        { name: "Email Campaigns", runs: 2500 },
        { name: "Sales Forecasting", runs: 1900 },
        { name: "Case Management", runs: 1500 },
      ]}
    />
    <StatCard
      title="AWS"
      description="Cloud Computing and Infrastructure"
      workflows={[
        { name: "EC2 Instances", runs: 3000 },
        { name: "S3 Storage", runs: 2700 },
        { name: "Lambda Functions", runs: 2200 },
        { name: "VPC Setup", runs: 1800 },
        { name: "CloudFront Distribution", runs: 1400 },
      ]}
    />
    <StatCard
      title="Slack"
      description="Team Collaboration and Communication"
      workflows={[
        { name: "Channel Management", runs: 2300 },
        { name: "Direct Messaging", runs: 2000 },
        { name: "App Integrations", runs: 1700 },
        { name: "File Sharing", runs: 1500 },
        { name: "Notifications Setup", runs: 1200 },
      ]}
    />
    <StatCard
      title="Stripe"
      description="Payment Processing Platform"
      workflows={[
        { name: "Payment Processing", runs: 4200 },
        { name: "Subscription Billing", runs: 3000 },
        { name: "Fraud Detection", runs: 2600 },
        { name: "Payouts Management", runs: 2300 },
        { name: "Refund Handling", runs: 1800 },
      ]}
    />
  </div>
</div>



      {/* Search Area (Replaces the graph) */}
      <div className="grid grid-cols-2 gap-2">
        <SearchCard/>
 

        {/* Recent Executions of Workflows */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold">Recent Executions of Workflows</h2>
          <p className="text-base text-gray-500 mb-6">You executed 5 workflows this month.</p>
          <div className="overflow-y-auto max-h-60"> {/* Scrollable container */}
            <ul className="space-y-2">
              {workflows.map((workflow, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                  <div>
                    <p className="font-semibold">{workflow.name}</p>
                    <p className="text-sm text-gray-400">{workflow.date}</p> {/* Random date */}
                  </div>
                  <p className="text-sm text-gray-500">{workflow.status}
                    <span className={`rounded-full w-2 h-2 inline-block ml-1 ${workflow.status === "Success" ? "bg-green-500" : "bg-red-500"}`}></span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}