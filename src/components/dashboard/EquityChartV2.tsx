import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

// Mock data generator for MVP visualization if no history
const generateMockData = (baseEquity: number) => {
    const data = [];
    let current = baseEquity;
    for (let i = 0; i < 20; i++) {
        current += (Math.random() - 0.45) * 500; // Random walk
        data.push({
            time: format(new Date().setHours(8 + i), "HH:mm"),
            value: current,
        });
    }
    return data;
};

export function EquityChartV2() {
    const data = generateMockData(100000);

    return (
        <Card className="glass-card h-full min-h-[350px]">
            <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value / 1000}k`}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                            }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, "Equity"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
