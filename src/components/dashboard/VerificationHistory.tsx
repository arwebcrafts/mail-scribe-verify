
import React from "react";
import { useVerification } from "@/contexts/VerificationContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { EmailVerificationResult, VerificationBatch } from "@/types";
import VerificationStatusBadge from "../ui-components/VerificationStatusBadge";

const VerificationHistory: React.FC = () => {
  const { recentBatches } = useVerification();
  const [expandedBatch, setExpandedBatch] = React.useState<string | null>(null);
  
  const toggleExpand = (batchId: string) => {
    if (expandedBatch === batchId) {
      setExpandedBatch(null);
    } else {
      setExpandedBatch(batchId);
    }
  };
  
  const downloadCsv = (results: EmailVerificationResult[], batchName: string) => {
    if (!results.length) return;

    // Create CSV string
    const headers = ["Email", "Status", "Type", "Suggestion", "Score", "Timestamp"];
    const csvRows = [headers];

    results.forEach((result) => {
      csvRows.push([
        result.email,
        result.status,
        result.type || "",
        result.suggestion || "",
        result.score?.toString() || "",
        result.timestamp
      ]);
    });

    const csvString = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${batchName.replace(/[^a-zA-Z0-9]/g, "-")}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  if (recentBatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">
          No verification history yet. Verify some emails first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Verification History</h3>
      
      {recentBatches.map((batch) => (
        <Card key={batch.id} className="overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="font-medium">{batch.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(batch.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(batch.id)}
                >
                  {expandedBatch === batch.id ? (
                    <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
                  ) : (
                    <>Show Details <ChevronDown className="ml-1 h-4 w-4" /></>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadCsv(batch.results, batch.name)}
                >
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mt-4">
              <div>
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="font-semibold">{batch.total}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Valid</div>
                <div className="font-semibold text-green-500">{batch.valid} ({Math.round((batch.valid / batch.total) * 100)}%)</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Invalid</div>
                <div className="font-semibold text-red-500">{batch.invalid} ({Math.round((batch.invalid / batch.total) * 100)}%)</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Disposable</div>
                <div className="font-semibold text-purple-500">{batch.disposable} ({Math.round((batch.disposable / batch.total) * 100)}%)</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Risky</div>
                <div className="font-semibold text-yellow-500">{batch.risky} ({Math.round((batch.risky / batch.total) * 100)}%)</div>
              </div>
            </div>
          </div>
          
          {expandedBatch === batch.id && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Suggestion</TableHead>
                    <TableHead className="hidden md:table-cell">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batch.results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.email}</TableCell>
                      <TableCell>
                        <VerificationStatusBadge status={result.status} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{result.type || "-"}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {result.suggestion ? (
                          <span className="text-primary">{result.suggestion}</span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {result.score !== undefined ? (
                          <span>{(result.score * 100).toFixed(0)}%</span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default VerificationHistory;
