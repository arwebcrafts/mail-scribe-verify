
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
import { Download } from "lucide-react";
import VerificationStatusBadge from "../ui-components/VerificationStatusBadge";
import { EmailVerificationResult } from "@/types";

const VerificationResults: React.FC = () => {
  const { currentResults, clearCurrentResults } = useVerification();

  const downloadCsv = () => {
    if (currentResults.length === 0) return;

    // Create CSV string
    const headers = ["Email", "Status", "Type", "Suggestion", "Score", "Timestamp"];
    const csvRows = [headers];

    currentResults.forEach((result) => {
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
    a.download = `email-verification-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Calculate statistics
  const stats = React.useMemo(() => {
    if (!currentResults.length) return null;
    
    const totalCount = currentResults.length;
    const validCount = currentResults.filter(r => r.status === "valid").length;
    const invalidCount = currentResults.filter(r => r.status === "invalid").length;
    const disposableCount = currentResults.filter(r => r.status === "disposable").length;
    const riskyCount = currentResults.filter(r => r.status === "risky").length;
    
    return {
      total: totalCount,
      valid: validCount,
      validPercent: Math.round((validCount / totalCount) * 100),
      invalid: invalidCount,
      invalidPercent: Math.round((invalidCount / totalCount) * 100),
      disposable: disposableCount,
      disposablePercent: Math.round((disposableCount / totalCount) * 100),
      risky: riskyCount,
      riskyPercent: Math.round((riskyCount / totalCount) * 100),
    };
  }, [currentResults]);
  
  if (currentResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">
          No verification results yet. Verify some emails first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats section */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Valid</span>
            <span className="text-2xl font-bold text-green-500">{stats.validPercent}%</span>
            <span className="text-xs text-muted-foreground">{stats.valid} emails</span>
          </Card>
          <Card className="p-4 flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Invalid</span>
            <span className="text-2xl font-bold text-red-500">{stats.invalidPercent}%</span>
            <span className="text-xs text-muted-foreground">{stats.invalid} emails</span>
          </Card>
          <Card className="p-4 flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Disposable</span>
            <span className="text-2xl font-bold text-purple-500">{stats.disposablePercent}%</span>
            <span className="text-xs text-muted-foreground">{stats.disposable} emails</span>
          </Card>
          <Card className="p-4 flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Risky</span>
            <span className="text-2xl font-bold text-yellow-500">{stats.riskyPercent}%</span>
            <span className="text-xs text-muted-foreground">{stats.risky} emails</span>
          </Card>
        </div>
      )}

      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Verification Results</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadCsv}
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCurrentResults}
          >
            Clear Results
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
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
            {currentResults.map((result, index) => (
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
    </div>
  );
};

export default VerificationResults;
