"use client";

import {
  Briefcase,
  Car,
  Home,
  PlusCircle,
  Repeat,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const expenses = [
  {
    icon: UtensilsCrossed,
    category: "Food",
    description: "Groceries from SuperMart",
    amount: -78.54,
    date: "2024-07-29",
  },
  {
    icon: Car,
    category: "Transport",
    description: "Monthly train pass",
    amount: -120.0,
    date: "2024-07-28",
  },
  {
    icon: ShoppingBag,
    category: "Shopping",
    description: "New shoes from Zappos",
    amount: -149.99,
    date: "2024-07-25",
  },
  {
    icon: Home,
    category: "Housing",
    description: "Rent for August",
    amount: -1500.0,
    date: "2024-07-25",
  },
];

const income = [
  {
    icon: Briefcase,
    category: "Salary",
    description: "Monthly paycheck",
    amount: 5329.0,
    date: "2024-07-25",
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
           <div className="flex items-center gap-2">
              <Repeat className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">Recent Transactions</CardTitle>
           </div>
          <CardDescription>
            A list of your recent income and expenses.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Add a new income or expense to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="type" className="text-right">Type</Label>
                 {/* This would be a select in a real app */}
                 <Input id="type" defaultValue="Expense" className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="description" className="text-right">Description</Label>
                 <Input id="description" placeholder="e.g. Groceries" className="col-span-3" />
               </div>
                <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="amount" className="text-right">Amount</Label>
                 <Input id="amount" type="number" placeholder="e.g. 78.54" className="col-span-3" />
               </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            <TransactionTable transactions={expenses} />
          </TabsContent>
          <TabsContent value="income">
            <TransactionTable transactions={income} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function TransactionTable({
  transactions,
}: {
  transactions: {
    icon: React.ElementType;
    category: string;
    description: string;
    amount: number;
    date: string;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-md">
                  <transaction.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.date}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell
              className={`text-right font-semibold ${
                transaction.amount > 0 ? "text-accent-600" : ""
              }`}
            >
              {transaction.amount < 0
                ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                : `$${transaction.amount.toFixed(2)}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
