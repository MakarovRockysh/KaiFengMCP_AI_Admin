import { useState } from "react";
import { Search, Filter, Download, Monitor, User, AlertTriangle } from "lucide-react";

const logs = [
  { id: 1, type: "操作", user: "admin", action: "登录系统", ip: "192.168.1.100", detail: "管理员登录后台管理系统", time: "2026-03-18 10:30:15", level: "info" },
  { id: 2, type: "操作", user: "运营小王", action: "处理订单", ip: "192.168.1.102", detail: "处理退款订单 ORD-20260317006", time: "2026-03-18 10:25:42", level: "info" },
  { id: 3, type: "系统", user: "system", action: "定时任务", ip: "-", detail: "执行每日数据统计任务完成", time: "2026-03-18 08:00:01", level: "info" },
  { id: 4, type: "操作", user: "客服小李", action: "回复建议", ip: "192.168.1.105", detail: "回复用户王五的投诉建议", time: "2026-03-18 09:45:33", level: "info" },
  { id: 5, type: "系统", user: "system", action: "告警", ip: "-", detail: "AI客服响应时间超过阈值(>3s)", time: "2026-03-18 09:12:08", level: "warning" },
  { id: 6, type: "操作", user: "admin", action: "修改权限", ip: "192.168.1.100", detail: "修改运营管理员角色权限配置", time: "2026-03-17 17:30:20", level: "info" },
  { id: 7, type: "系统", user: "system", action: "错误", ip: "-", detail: "支付回调接口异常，已自动重试", time: "2026-03-17 15:42:18", level: "error" },
  { id: 8, type: "操作", user: "admin", action: "新建账号", ip: "192.168.1.100", detail: "创建客服管理员账号：客服小李", time: "2026-03-17 14:10:05", level: "info" },
];

const levelStyle: Record<string, string> = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
};

const levelIcon: Record<string, typeof Monitor> = {
  info: Monitor,
  warning: AlertTriangle,
  error: AlertTriangle,
};

const tabs = ["全部", "操作日志", "系统日志"];

export default function LogManagement() {
  const [activeTab, setActiveTab] = useState("全部");
  const filtered = activeTab === "全部" ? logs : logs.filter((l) => (activeTab === "操作日志" ? l.type === "操作" : l.type === "系统"));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === t ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" /> 导出日志
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-gray-400" />
            <input placeholder="搜索操作内容/用户" className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" /> 筛选
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map((l) => {
            const Icon = levelIcon[l.level];
            return (
              <div key={l.id} className="px-5 py-3 hover:bg-gray-50/50 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${l.type === "操作" ? "bg-blue-50" : "bg-purple-50"}`}>
                  {l.type === "操作" ? <User className="w-4 h-4 text-blue-600" /> : <Monitor className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-800">{l.action}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${levelStyle[l.level]}`}>{l.level}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{l.detail}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>{l.user}</span>
                    <span>{l.ip}</span>
                    <span>{l.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>共 {filtered.length} 条记录</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">上一页</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
