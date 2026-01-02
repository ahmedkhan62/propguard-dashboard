import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface Trade {
    ticket: number;
    symbol: string;
    type: string;
    volume: number;
    open_price: number;
    close_price: number;
    profit: number;
    open_time: string;
    status: string;
}

interface TradesTableProps {
    trades: Trade[];
}

export function TradesTable({ trades }: TradesTableProps) {
    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>Trade History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Volume</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Profit</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trades.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No trades found
                                </TableCell>
                            </TableRow>
                        ) : (
                            trades.map((trade) => (
                                <TableRow key={trade.ticket}>
                                    <TableCell className="font-mono text-xs">{trade.ticket}</TableCell>
                                    <TableCell className="font-bold">{trade.symbol}</TableCell>
                                    <TableCell>
                                        <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'} className="uppercase text-[10px]">
                                            {trade.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{trade.volume.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-xs">
                                            <span className="text-muted-foreground">O: {trade.open_price}</span>
                                            {trade.close_price > 0 && <span>C: {trade.close_price}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className={trade.profit >= 0 ? "text-status-safe" : "text-status-danger"}>
                                        <div className="flex items-center gap-1 font-semibold">
                                            {trade.profit >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            ${trade.profit.toFixed(2)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                trade.status === 'open'
                                                    ? 'border-primary text-primary'
                                                    : 'border-muted text-muted-foreground'
                                            }
                                        >
                                            {trade.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
