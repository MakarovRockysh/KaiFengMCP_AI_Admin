import { useState } from "react";
import { Search, Filter, Download, RotateCcw, Eye, MapPin } from "lucide-react";

const orders = [
  { id: "ORD-20260318001", user: "张三", phone: "138****1234", type: "门票预订", product: "成人票x2", amount: "¥240", payment: "微信支付", status: "已完成", time: "2026-03-18 10:32" },
  { id: "ORD-20260318002", user: "李四", phone: "139****5678", type: "导览服务", product: "智能导览2小时", amount: "¥80", payment: "支付宝", status: "处理中", time: "2026-03-18 10:28" },
  { id: "ORD-20260318003", user: "王五", phone: "137****9012", type: "文创商品", product: "清园纪念册x1", amount: "¥256", payment: "微信支付", status: "已完成", time: "2026-03-18 10:15" },
  { id: "ORD-20260318004", user: "赵六", phone: "136****3456", type: "门票预订", product: "家庭套票", amount: "¥480", payment: "待支付", status: "待支付", time: "2026-03-18 10:08" },
  { id: "ORD-20260318005", user: "孙七", phone: "135****7890", type: "餐饮消费", product: "套餐A", amount: "¥68", payment: "微信支付", status: "已完成", time: "2026-03-18 09:55" },
  { id: "ORD-20260317006", user: "周八", phone: "134****2345", type: "门票预订", product: "学生票x3", amount: "¥180", payment: "支付宝", status: "已退款", time: "2026-03-17 16:42" },
  { id: "ORD-20260317007", user: "吴九", phone: "133****6789", type: "导览服务", product: "VIP私人导览", amount: "¥320", payment: "微信支付", status: "投诉中", time: "2026-03-17 14:20" },
];

const statusColor: Record<string, string> = {
  已完成: "bg-green-100 text-green-700",
  处理中: "bg-blue-100 text-blue-700",
  待支付: "bg-amber-100 text-amber-700",
  已退款: "bg-gray-100 text-gray-600",
  投诉中: "bg-red-100 text-red-700",
};

const tabs = ["全部", "待支付", "处理中", "已完成", "已退款", "投诉中"];

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState("全部");
  const filtered = activeTab === "全部" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
              activeTab === t ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-gray-400" />
            <input placeholder="搜索订单号/用户名" className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" /> 筛选
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-4 py-3">订单号</th>
                <th className="text-left px-3 py-3">用户</th>
                <th className="text-left px-3 py-3">类型</th>
                <th className="text-left px-3 py-3">商品</th>
                <th className="text-left px-3 py-3">金额</th>
                <th className="text-left px-3 py-3">支付方式</th>
                <th className="text-left px-3 py-3">状态</th>
                <th className="text-left px-3 py-3">时间</th>
                <th className="text-left px-3 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-blue-600">{o.id}</td>
                  <td className="px-3 py-3">
                    <div className="text-gray-700">{o.user}</div>
                    <div className="text-xs text-gray-400">{o.phone}</div>
                  </td>
                  <td className="px-3 py-3 text-gray-500">{o.type}</td>
                  <td className="px-3 py-3 text-gray-700">{o.product}</td>
                  <td className="px-3 py-3 text-gray-700">{o.amount}</td>
                  <td className="px-3 py-3 text-gray-500">{o.payment}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-400 text-xs">{o.time}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      <button className="p-1 rounded hover:bg-blue-50 text-blue-600" title="查看详情">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded hover:bg-green-50 text-green-600" title="转攻略">
                        <MapPin className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-500" title="退款">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>共 {filtered.length} 条记录</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">上一页</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
