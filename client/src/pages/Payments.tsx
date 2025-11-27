import Layout from "@/components/layout/Layout";
import { mockPayments, mockAgents } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

export default function Payments() {
  const totalPaid = mockPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Layout>
       <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-1">Payment Status</h1>
          <p className="text-muted-foreground">Automated settlement history on the Cardano blockchain</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card bg-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalPaid} ADA</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Settlement History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-primary">Agent</TableHead>
                  <TableHead className="text-primary">Amount</TableHead>
                  <TableHead className="text-primary">Date</TableHead>
                  <TableHead className="text-primary">Status</TableHead>
                  <TableHead className="text-right text-primary">Tx Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map((payment) => {
                  const agent = mockAgents.find(a => a.id === payment.agentId);
                  return (
                    <TableRow key={payment.id} className="border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center gap-2">
                          {agent && <img src={agent.avatar} className="w-6 h-6 rounded-full" />}
                          {agent?.name || payment.agentId}
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-bold">{payment.amount} ADA</TableCell>
                      <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-muted-foreground">
                        {payment.txHash}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
