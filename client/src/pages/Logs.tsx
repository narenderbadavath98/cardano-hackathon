import Layout from "@/components/layout/Layout";
import { mockLogs } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Logs() {
  return (
    <Layout>
       <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-1">On-Chain Activity Log</h1>
          <p className="text-muted-foreground">Immutable record of all agent actions and workflow steps</p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-primary">Transaction Hash</TableHead>
                  <TableHead className="text-primary">Task Hash</TableHead>
                  <TableHead className="text-primary">Timestamp</TableHead>
                  <TableHead className="text-primary">Status</TableHead>
                  <TableHead className="text-right text-primary">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogs.map((log) => (
                  <TableRow key={log.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {log.txHash}
                        <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{log.taskHash}</TableCell>
                    <TableCell className="text-white">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
