import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userBehavior = [
  { hour: "08:00", 访问量: 120, 咨询量: 45 },
  { hour: "09:00", 访问量: 280, 咨询量: 98 },
  { hour: "10:00", 访问量: 450, 咨询量: 156 },
  { hour: "11:00", 访问量: 380, 咨询量: 132 },
  { hour: "12:00", 访问量: 220, 咨询量: 76 },
  { hour: "13:00", 访问量: 310, 咨询量: 108 },
  { hour: "14:00", 访问量: 420, 咨询量: 145 },
  { hour: "15:00", 访问量: 360, 咨询量: 120 },
  { hour: "16:00", 访问量: 290, 咨询量: 95 },
  { hour: "17:00", 访问量: 180, 咨询量: 62 },
];

const satisfactionData = [
  { name: "非常满意", value: 42 },
  { name: "满意", value: 35 },
  { name: "一般", value: 15 },
  { name: "不满意", value: 8 },
];
const SAT_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const weeklyData = [
  { day: "周一", 新用户: 85, 回访用户: 210 },
  { day: "周二", 新用户: 92, 回访用户: 230 },
  { day: "周三", 新用户: 78, 回访用户: 195 },
  { day: "周四", 新用户: 110, 回访用户: 260 },
  { day: "周五", 新用户: 145, 回访用户: 310 },
  { day: "周六", 新用户: 220, 回访用户: 420 },
  { day: "周日", 新用户: 198, 回访用户: 380 },
];

const hotQueries = [
  { query: "景区开放时间", count: 856, trend: "+12%" },
  { query: "门票价格", count: 742, trend: "+8%" },
  { query: "停车场位置", count: 635, trend: "+5%" },
  { query: "推荐游览路线", count: 528, trend: "+22%" },
  { query: "餐饮推荐", count: 413, trend: "+15%" },
  { query: "卫生间位置", count: 367, trend: "-3%" },
];

export default function DataAnalytics() {
  return (
    <div className="space-y-5">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "日均访问量", value: "3,210", sub: "较上周 +15%" },
          { label: "AI客服解决率", value: "87.3%", sub: "较上周 +2.1%" },
          { label: "平均响应时间", value: "1.2s", sub: "较上周 -0.3s" },
          { label: "用户满意度", value: "92%", sub: "较上周 +1.5%" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{m.label}</div>
            <div className="text-2xl text-gray-900">{m.value}</div>
            <div className="text-xs text-green-600 mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Behavior */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-800 mb-4">今日用户行为分布（按小时）</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userBehavior}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="访问量" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="咨询量" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-800 mb-4">用户满意度分布</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={satisfactionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {satisfactionData.map((_, i) => (
                    <Cell key={i} fill={SAT_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {satisfactionData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: SAT_COLORS[i] }} />
                  <span className="text-gray-600">{d.name}</span>
                  <span className="text-gray-800 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Users */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-800 mb-4">本周用户趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="新用户" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="回访用户" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hot Queries */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm text-gray-800 mb-4">AI客服热门问题 TOP6</h3>
          <div className="space-y-3">
            {hotQueries.map((q, i) => (
              <div key={q.query} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${i < 3 ? "bg-blue-600" : "bg-gray-400"}`}>
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 flex-1">{q.query}</span>
                <span className="text-sm text-gray-500">{q.count}次</span>
                <span className={`text-xs ${q.trend.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{q.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
