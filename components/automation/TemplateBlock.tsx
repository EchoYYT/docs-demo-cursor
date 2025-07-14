import React from 'react';
import { Clock, Users, Zap, ChevronRight, Sparkles } from 'lucide-react';

const templates = [
  { 
    id: 'remind', 
    name: '状态改动时提醒负责人', 
    desc: '当任务状态变更时自动通知负责人',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    category: '通知提醒',
    popular: true
  },
  { 
    id: 'create-subtask', 
    name: '任务完成时自动创建子任务', 
    desc: '任务完成后自动生成相关子任务',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    category: '任务管理',
    popular: false
  },
];

export function TemplateBlock({ onImport }: { onImport: (id: string) => void }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-800">智能模板</h3>
        </div>
        <p className="text-sm text-gray-600">选择预设模板，快速创建自动化流程</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <div 
            key={template.id} 
            className={`
              relative group bg-gradient-to-br ${template.bgColor} border border-gray-200 
              rounded-2xl p-6 cursor-pointer transition-all duration-300 
              hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300
              hover:scale-[1.02] transform
            `}
            onClick={() => onImport(template.id)}
          >
            {/* 热门标签 */}
            {template.popular && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                热门
              </div>
            )}
            
            {/* 头部 */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`
                flex h-12 w-12 items-center justify-center rounded-xl 
                bg-gradient-to-br ${template.color} shadow-lg
              `}>
                <template.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 truncate">{template.name}</h4>
                </div>
                <span className="inline-block px-2 py-1 text-xs bg-white/60 text-gray-700 rounded-full">
                  {template.category}
                </span>
              </div>
            </div>
            
            {/* 描述 */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {template.desc}
            </p>
            
            {/* 底部操作 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>2分钟配置</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                <span>立即使用</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* 悬停效果 */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
      
      {/* 更多模板提示 */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          更多模板正在路上... 
          <span className="inline-block ml-1 animate-pulse">✨</span>
        </p>
      </div>
    </div>
  );
} 