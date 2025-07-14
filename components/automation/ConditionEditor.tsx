import React, { useState } from 'react';
import { Condition } from './AutomationContext';

const operators = [
  { value: '=', label: '等于' },
  { value: '!=', label: '不等于' },
  { value: '>', label: '大于' },
  { value: '<', label: '小于' },
  { value: 'contains', label: '包含' },
];

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ConditionEditor({ open, initial, onClose, onSave }: {
  open: boolean;
  initial?: Condition[];
  onClose: () => void;
  onSave: (conditions: Condition[]) => void;
}) {
  const [conditions, setConditions] = useState<Condition[]>(initial || []);
  const [logic, setLogic] = useState<'AND' | 'OR'>('AND');

  const handleAdd = () => {
    setConditions([...conditions, { id: genId(), field: '', operator: '=', value: '' }]);
  };
  const handleChange = (idx: number, key: keyof Condition, value: any) => {
    setConditions(conditions.map((c, i) => i === idx ? { ...c, [key]: value } : c));
  };
  const handleDelete = (idx: number) => {
    setConditions(conditions.filter((_, i) => i !== idx));
  };
  const handleSave = () => {
    onSave(conditions);
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-[360px] bg-white shadow-2xl border-l z-50 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 border-b flex items-center justify-between">
        <span className="font-bold text-lg">设置条件判断</span>
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">条件逻辑</label>
          <select className="w-full border rounded px-3 py-2" value={logic} onChange={e => setLogic(e.target.value as any)}>
            <option value="AND">全部满足（AND）</option>
            <option value="OR">任一满足（OR）</option>
          </select>
        </div>
        <div className="space-y-4">
          {conditions.map((c, idx) => (
            <div key={c.id} className="flex items-center gap-2 border rounded p-2">
              <input
                className="w-1/3 border rounded px-2 py-1"
                placeholder="字段名"
                value={c.field}
                onChange={e => handleChange(idx, 'field', e.target.value)}
              />
              <select
                className="w-1/4 border rounded px-2 py-1"
                value={c.operator}
                onChange={e => handleChange(idx, 'operator', e.target.value)}
              >
                {operators.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
              <input
                className="w-1/3 border rounded px-2 py-1"
                placeholder="值"
                value={c.value}
                onChange={e => handleChange(idx, 'value', e.target.value)}
              />
              <button className="text-gray-400 hover:text-red-500" onClick={() => handleDelete(idx)}>✕</button>
            </div>
          ))}
        </div>
        <button className="w-full py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium" onClick={handleAdd}>+ 添加条件</button>
      </div>
      <div className="p-6 border-t flex gap-2 justify-end bg-gray-50">
        <button className="px-4 py-2 rounded border" onClick={onClose}>取消</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold" onClick={handleSave}>保存</button>
      </div>
    </div>
  );
} 