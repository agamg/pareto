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
 

        {/* Recent Sales List */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold">Recent Sales</h2>
          <p className="text-base text-gray-500 mb-6">You made 265 sales this month.</p>
          <ul className="space-y-6">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Olivia Martin</p>
                <p className="text-sm text-gray-400">olivia.martin@email.com</p>
              </div>
              <p className="font-semibold">+$1,999.00</p>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Jackson Lee</p>
                <p className="text-sm text-gray-400">jackson.lee@email.com</p>
              </div>
              <p className="font-semibold">+$39.00</p>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Isabella Nguyen</p>
                <p className="text-sm text-gray-400">nguyen.isa@email.com</p>
              </div>
              <p className="font-semibold">+$299.00</p>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">William Kim</p>
                <p className="text-sm text-gray-400">will@email.com</p>
              </div>
              <p className="font-semibold">+$99.00</p>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Sofia Davis</p>
                <p className="text-sm text-gray-400">sofia.davis@email.com</p>
              </div>
              <p className="font-semibold">+$39.00</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
