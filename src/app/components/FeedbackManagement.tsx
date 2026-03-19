import { useState } from "react";
import { Search, Filter, MessageSquare, ThumbsUp, ThumbsDown, Clock, CheckCircle2 } from "lucide-react";

const feedbacks = [
  { id: 1, user: "张三", type: "建议", content: "建议增加语音导览的多语言支持，尤其是英文和日文。", source: "小程序", status: "待处理", priority: "高", time: "2026-03-18 09:30", reply: "" },
  { id: 2, user: "李四", type: "意见", content: "景区内卫生间指引不够明确，希望AI助手能提供更精准的导航。", source: "智能客服", status: "处理中", priority: "中", time: "2026-03-18 08:45", reply: "已反馈给运营团队..." },
  { id: 3, user: "王五", type: "投诉", content: "购买的纪念品有质量问题，AI客服未能及时处理退换货请求。", source: "小程序", status: "已回复", priority: "高", time: "2026-03-17 16:20", reply: "非常抱歉给您带来不便，已安排退换货..." },
  { id: 4, user: "赵六", type: "建议", content: "希望能增加AR实景导览功能，让游览更有趣味性。", source: "智能客服", status: "已归档", priority: "低", time: "2026-03-17 14:10", reply: "感谢您的建议，已纳入产品规划。" },
  { id: 5, user: "孙七", type: "表扬", content: "AI客服响应很快，帮我规划了很好的游览路线，体验非常好！", source: "小程序", status: "已归档", priority: "低", time: "2026-03-16 11:25", reply: "感谢您的肯定！" },
];

const statusColor: Record<string, string> = {
  待处理: "bg-amber-100 text-amber-700",
  处理中: "bg-blue-100 text-blue-700",
  已回复: "bg-green-100 text-green-700",
  已归档: "bg-gray-100 text-gray-600",
};

const priorityColor: Record<string, string> = {
  高: "text-red-600",
  中: "text-amber-600",
  低: "text-gray-500",
};

const tabs = ["全部", "待处理", "处理中", "已回复", "已归档"];

export default function FeedbackManagement() {
  const [activeTab, setActiveTab] = useState("全部");
  const filtered = activeTab === "全部" ? feedbacks : feedbacks.filter((f) => f.status === activeTab);

  const stats = [
    { label: "总建议数", value: feedbacks.length, icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
    { label: "待处理", value: feedbacks.filter((f) => f.status === "待处理").length, icon: Clock, color: "text-amber-600 bg-amber-50" },
    { label: "好评", value: feedbacks.filter((f) => f.type === "表扬").length, icon: ThumbsUp, color: "text-green-600 bg-green-50" },
    { label: "投诉", value: feedbacks.filter((f) => f.type === "投诉").length, icon: ThumbsDown, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === t ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((f) => (
          <div key={f.id} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">{f.user[0]}</div>
                <div>
                  <span className="text-sm text-gray-800">{f.user}</span>
                  <span className="text-xs text-gray-400 ml-2">{f.source}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${priorityColor[f.priority]}`}>{f.priority}优先</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[f.status]}`}>{f.status}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded mr-2">{f.type}</span>
              <span className="text-sm text-gray-700">{f.content}</span>
            </div>
            {f.reply && (
              <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{f.reply}</span>
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">{f.time}</span>
              {f.status === "待处理" && (
                <button className="text-xs text-blue-600 hover:underline">处理</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
