import { CreditCard, Smartphone, QrCode, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const channels = [
  { name: "微信支付", icon: Smartphone, enabled: true, rate: "0.6%", todayAmount: "¥32,580", todayCount: 86 },
  { name: "支付宝", icon: QrCode, enabled: true, rate: "0.6%", todayAmount: "¥18,240", todayCount: 34 },
  { name: "银联支付", icon: CreditCard, enabled: false, rate: "0.5%", todayAmount: "¥0", todayCount: 0 },
];

const transactions = [
  { id: "PAY-001", order: "ORD-20260318001", user: "张三", channel: "微信支付", amount: "¥240", status: "成功", time: "2026-03-18 10:32:15" },
  { id: "PAY-002", order: "ORD-20260318002", user: "李四", channel: "支付宝", amount: "¥80", status: "成功", time: "2026-03-18 10:28:42" },
  { id: "PAY-003", order: "ORD-20260318003", user: "王五", channel: "微信支付", amount: "¥256", status: "成功", time: "2026-03-18 10:15:08" },
  { id: "PAY-004", order: "ORD-20260317006", user: "周八", channel: "支付宝", amount: "-¥180", status: "已退款", time: "2026-03-17 17:05:33" },
];

export default function PaymentManagement() {
  const [channelState, setChannelState] = useState(channels.map((c) => c.enabled));

  return (
    <div className="space-y-5">
      {/* Payment Channels */}
      <div>
        <h3 className="text-sm text-gray-600 mb-3">支付渠道管理</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((c, i) => (
            <div key={c.name} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-800">{c.name}</div>
                    <div className="text-xs text-gray-400">费率: {c.rate}</div>
                  </div>
                </div>
                <button onClick={() => setChannelState((s) => s.map((v, j) => (j === i ? !v : v)))}>
                  {channelState[i] ? (
                    <ToggleRight className="w-7 h-7 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-gray-300" />
                  )}
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>今日交易额</span>
                <span className="text-gray-800">{c.todayAmount}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>今日笔数</span>
                <span className="text-gray-800">{c.todayCount}</span>
              </div>
              <button className="mt-3 w-full py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-1">
                <Settings className="w-3 h-3" /> 配置
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm text-gray-800">交易记录</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3">交易号</th>
                <th className="text-left px-3 py-3">关联订单</th>
                <th className="text-left px-3 py-3">用户</th>
                <th className="text-left px-3 py-3">支付渠道</th>
                <th className="text-left px-3 py-3">金额</th>
                <th className="text-left px-3 py-3">状态</th>
                <th className="text-left px-3 py-3">时间</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-gray-700">{t.id}</td>
                  <td className="px-3 py-3 text-blue-600">{t.order}</td>
                  <td className="px-3 py-3 text-gray-700">{t.user}</td>
                  <td className="px-3 py-3 text-gray-500">{t.channel}</td>
                  <td className={`px-3 py-3 ${t.amount.startsWith("-") ? "text-red-500" : "text-gray-700"}`}>{t.amount}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${t.status === "成功" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-400 text-xs">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
