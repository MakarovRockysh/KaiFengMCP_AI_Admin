import { useState } from "react";
import { Search, Plus, Edit, Trash2, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";

const accounts = [
  { id: 1, name: "张三", phone: "138****1234", role: "普通用户", source: "小程序注册", status: "正常", regTime: "2026-01-15", lastLogin: "2026-03-18 10:30" },
  { id: 2, name: "李四", phone: "139****5678", role: "普通用户", source: "小程序注册", status: "正常", regTime: "2026-02-03", lastLogin: "2026-03-18 09:15" },
  { id: 3, name: "王五", phone: "137****9012", role: "VIP用户", source: "后台创建", status: "正常", regTime: "2025-12-20", lastLogin: "2026-03-17 16:40" },
  { id: 4, name: "赵六", phone: "136****3456", role: "普通用户", source: "小程序注册", status: "已禁用", regTime: "2026-01-28", lastLogin: "2026-02-15 08:20" },
  { id: 5, name: "admin", phone: "-", role: "超级管理员", source: "系统内置", status: "正常", regTime: "2025-01-01", lastLogin: "2026-03-18 08:00" },
  { id: 6, name: "运营小王", phone: "135****7890", role: "运营管理员", source: "后台创建", status: "正常", regTime: "2025-06-10", lastLogin: "2026-03-18 09:50" },
  { id: 7, name: "客服小李", phone: "134****2345", role: "客服管理员", source: "后台创建", status: "待审核", regTime: "2026-03-17", lastLogin: "-" },
];

const statusStyle: Record<string, string> = {
  正常: "bg-green-100 text-green-700",
  已禁用: "bg-red-100 text-red-700",
  待审核: "bg-amber-100 text-amber-700",
};

const tabs = ["全部", "普通用户", "管理员", "待审核"];

export default function AccountManagement() {
  const [activeTab, setActiveTab] = useState("全部");

  const filtered = accounts.filter((a) => {
    if (activeTab === "全部") return true;
    if (activeTab === "普通用户") return a.role.includes("用户");
    if (activeTab === "管理员") return a.role.includes("管理员");
    if (activeTab === "待审核") return a.status === "待审核";
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === t ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> 新建账号
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2 max-w-xs">
            <Search className="w-4 h-4 text-gray-400" />
            <input placeholder="搜索用户名/手机号" className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-4 py-3">用户名</th>
                <th className="text-left px-3 py-3">手机号</th>
                <th className="text-left px-3 py-3">角色</th>
                <th className="text-left px-3 py-3">注册来源</th>
                <th className="text-left px-3 py-3">状态</th>
                <th className="text-left px-3 py-3">注册时间</th>
                <th className="text-left px-3 py-3">最后登录</th>
                <th className="text-left px-3 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-800">{a.name}</td>
                  <td className="px-3 py-3 text-gray-500">{a.phone}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${a.role.includes("管理员") ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                      {a.role}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-xs">{a.source}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyle[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-400 text-xs">{a.regTime}</td>
                  <td className="px-3 py-3 text-gray-400 text-xs">{a.lastLogin}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      {a.status === "待审核" && (
                        <>
                          <button className="p-1 rounded hover:bg-green-50 text-green-600" title="审核通过"><CheckCircle2 className="w-4 h-4" /></button>
                          <button className="p-1 rounded hover:bg-red-50 text-red-500" title="拒绝"><XCircle className="w-4 h-4" /></button>
                        </>
                      )}
                      <button className="p-1 rounded hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 rounded hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
