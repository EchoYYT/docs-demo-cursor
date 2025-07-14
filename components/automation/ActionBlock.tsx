import React from 'react';
import { Action } from './AutomationContext';
import { ChevronRight, Bot, Check } from 'lucide-react';

export function ActionBlock({ onEdit, actions }: { onEdit: () => void; actions: Action[] }) {
  const isSet = actions.length > 0;
  
  return (
    <div 
      className={`
        group w-full max-w-2xl bg-white rounded-2xl shadow-lg border-2 px-8 py-6 
        cursor-pointer transition-all duration-300 hover:shadow-xl
        ${isSet 
          ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50' 
          : 'border-gray-200 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
        }
      `}
      onClick={onEdit}
    >
      <div className="flex items-center gap-4">
        {/* 图标区域 */}
        <div className="relative">
          <div className={`
            flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all duration-300
            ${isSet 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-purple-500 to-pink-600 group-hover:from-purple-600 group-hover:to-pink-700'
            }
          `}>
            <Bot className="h-7 w-7 text-white" />
          </div>
          
          {/* 完成状态指示 */}
          {isSet && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg text-gray-900">执行动作</h3>
            <span className={`
              px-3 py-1 text-xs font-medium rounded-full
              ${isSet 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
              }
            `}>
              {isSet ? '已配置' : '必需'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {isSet ? '当前执行动作' : '定义要执行的操作'}
              </p>
              {isSet && (
                <p className="text-sm font-medium text-gray-900">
                  {actions.length} 个动作已配置
                </p>
              )}
            </div>
            
            <ChevronRight className={`
              h-5 w-5 transition-all duration-200 group-hover:translate-x-1
              ${isSet ? 'text-green-500' : 'text-purple-500'}
            `} />
          </div>
        </div>
      </div>
      
      {/* 悬停效果 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
} 