import { useState } from "react";
import { Shield, Edit, Plus, Check, X } from "lucide-react";

const roles = [
  {
    id: 1, name: "超级管理员", desc: "拥有系统全部权限", users: 1, color: "bg-red-500",
    permissions: { 订单管理: true, 支付管理: true, 意见建议: true, 数据统计: true, 账号管理: true, 权限管理: true, 日志管理: true },
  },
  {
    id: 2, name: "运营管理员", desc: "管理日常运营相关功能", users: 3, color: "bg-blue-500",
    permissions: { 订单管理: true, 支付管理: false, 意见建议: true, 数据统计: true, 账号管理: false, 权限管理: false, 日志管理: true },
  },
  {
    id: 3, name: "客服管理员", desc: "处理用户意见建议和投诉", users: 5, color: "bg-green-500",
    permissions: { 订单管理: true, 支付管理: false, 意见建议: true, 数据统计: false, 账号管理: false, 权限管理: false, 日志管理: false },
  },
  {
    id: 4, name: "财务管理员", desc: "管理支付和财务相关", users: 2, color: "bg-amber-500",
    permissions: { 订单管理: true, 支付管理: true, 意见建议: false, 数据统计: true, 账号管理: false, 权限管理: false, 日志管理: true },
  },
];

const allPermissions = ["订单管理", "支付管理", "意见建议", "数据统计", "账号管理", "权限管理", "日志管理"];

export default function PermissionManagement() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600">角色与权限配置</h3>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> 新建角色
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Role List */}
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r)}
              className={`w-full text-left bg-white rounded-xl p-4 shadow-sm transition-all ${selectedRole.id === r.id ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${r.color} flex items-center justify-center`}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.desc}</div>
                </div>
                <span className="text-xs text-gray-400">{r.users}人</span>
              </div>
            </button>
          ))}
        </div>

        {/* Permission Matrix */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm text-gray-800">{selectedRole.name} - 权限配置</h3>
              <p className="text-xs text-gray-400 mt-0.5">{selectedRole.desc}</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
              <Edit className="w-3.5 h-3.5" /> 编辑
            </button>
          </div>

          <div className="space-y-2">
            {allPermissions.map((p) => (
              <div key={p} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50">
                <span className="text-sm text-gray-700">{p}</span>
                {selectedRole.permissions[p as keyof typeof selectedRole.permissions] ? (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <Check className="w-4 h-4" /> 已授权
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <X className="w-4 h-4" /> 未授权
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
