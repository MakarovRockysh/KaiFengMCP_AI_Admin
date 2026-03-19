import {
  ShoppingCart,
  MessageSquare,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "今日订单", value: "128", change: "+12.5%", up: true, icon: ShoppingCart, color: "bg-blue-500" },
  { label: "意见建议", value: "36", change: "+8.2%", up: true, icon: MessageSquare, color: "bg-amber-500" },
  { label: "活跃用户", value: "2,847", change: "-3.1%", up: false, icon: Users, color: "bg-green-500" },
  { label: "营收(元)", value: "¥58,420", change: "+18.7%", up: true, icon: TrendingUp, color: "bg-purple-500" },
];

const areaData = [
  { date: "03/12", 订单: 86, 收入: 32000 },
  { date: "03/13", 订单: 105, 收入: 41000 },
  { date: "03/14", 订单: 92, 收入: 36000 },
  { date: "03/15", 订单: 118, 收入: 48000 },
  { date: "03/16", 订单: 134, 收入: 52000 },
  { date: "03/17", 订单: 110, 收入: 45000 },
  { date: "03/18", 订单: 128, 收入: 58420 },
];

const pieData = [
  { name: "门票预订", value: 45 },
  { name: "导览服务", value: 25 },
  { name: "文创商品", value: 18 },
  { name: "餐饮消费", value: 12 },
];
const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"];

const recentOrders = [
  { id: "ORD-20260318001", user: "张三", type: "门票预订", amount: "¥120", status: "已完成", time: "10:32" },
  { id: "ORD-20260318002", user: "李四", type: "导览服务", amount: "¥80", status: "处理中", time: "10:28" },
  { id: "ORD-20260318003", user: "王五", type: "文创商品", amount: "¥256", status: "已完成", time: "10:15" },
  { id: "ORD-20260318004", user: "赵六", type: "门票预订", amount: "¥240", status: "待支付", time: "10:08" },
  { id: "ORD-20260318005", user: "孙七", type: "餐饮消费", amount: "¥68", status: "已完成", time: "09:55" },
];

const statusColor: Record<string, string> = {
  已完成: "bg-green-100 text-green-700",
  处理中: "bg-blue-100 text-blue-700",
  待支付: "bg-amber-100 text-amber-700",
};

export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs ${s.up ? "text-green-600" : "text-red-500"}`}>
                {s.change}
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </span>
            </div>
            <div className="text-2xl text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-800 mb-4">近7天订单与收入趋势</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="订单" stroke="#3b82f6" fill="url(#colorOrders)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-800 mb-4">订单类型分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name} {d.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm text-gray-800">最近订单</h3>
          <a href="/orders" className="text-xs text-blue-600 hover:underline">查看全部</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3">订单号</th>
                <th className="text-left px-3 py-3">用户</th>
                <th className="text-left px-3 py-3">类型</th>
                <th className="text-left px-3 py-3">金额</th>
                <th className="text-left px-3 py-3">状态</th>
                <th className="text-left px-3 py-3">时间</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-gray-700">{o.id}</td>
                  <td className="px-3 py-3 text-gray-700">{o.user}</td>
                  <td className="px-3 py-3 text-gray-500">{o.type}</td>
                  <td className="px-3 py-3 text-gray-700">{o.amount}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-400">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
