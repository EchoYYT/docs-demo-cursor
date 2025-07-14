import React, { useState } from 'react';
import { Trigger } from './AutomationContext';

const triggerTypes = [
  { value: 'field-modified', label: '当某个字段被修改' },
  { value: 'record-created', label: '当某条记录被创建' },
  { value: 'time-reached', label: '当某个时间点到达' },
  { value: 'meeting-upcoming', label: '当会议即将开始' },
  { value: 'meeting-summary', label: '当 meeting summary 创建完成' },
];

export function TriggerEditor({ open, initial, onClose, onSave }: {
  open: boolean;
  initial?: Trigger | null;
  onClose: () => void;
  onSave: (trigger: Trigger) => void;
}) {
  const [type, setType] = useState(initial?.type || '');
  const [config, setConfig] = useState<any>(initial?.config || {});

  const handleSave = () => {
    if (!type) return;
    onSave({ type, config });
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-[360px] bg-white shadow-2xl border-l z-50 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 border-b flex items-center justify-between">
        <span className="font-bold text-lg">设置触发器</span>
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">选择触发类型</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="">请选择</option>
            {triggerTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        {/* 可根据 type 展示更多参数设置 */}
        {type === 'field-modified' && (
          <div>
            <label className="block text-sm font-medium mb-2">字段名</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={config.field || ''}
              onChange={e => setConfig({ ...config, field: e.target.value })}
              placeholder="请输入字段名"
            />
          </div>
        )}
        {type === 'time-reached' && (
          <div>
            <label className="block text-sm font-medium mb-2">时间点</label>
            <input
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              value={config.time || ''}
              onChange={e => setConfig({ ...config, time: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="p-6 border-t flex gap-2 justify-end bg-gray-50">
        <button className="px-4 py-2 rounded border" onClick={onClose}>取消</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold" onClick={handleSave} disabled={!type}>保存</button>
      </div>
    </div>
  );
} 