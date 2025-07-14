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
    <div className="bg-white shadow-2xl border-l h-full w-full flex flex-col">
      <div className="p-6 border-b flex items-center justify-between">
        <span className="font-bold text-lg">设置条件判断</span>
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {/* 逻辑选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">条件逻辑</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={logic}
            onChange={e => setLogic(e.target.value as 'AND' | 'OR')}
          >
            <option value="AND">全部满足（AND）</option>
            <option value="OR">任一满足（OR）</option>
          </select>
        </div>
        {/* 条件列表 */}
        <div className="space-y-2">
          {conditions.map((c, idx) => (
            <div key={c.id} className="flex items-center gap-2 border rounded px-3 py-2">
              <input
                className="border rounded px-2 py-1 text-sm"
                value={c.field}
                onChange={e => handleChange(idx, 'field', e.target.value)}
                placeholder="字段"
              />
              <select
                className="border rounded px-2 py-1 text-sm"
                value={c.operator}
                onChange={e => handleChange(idx, 'operator', e.target.value)}
              >
                <option value="=">=</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
                <option value="!=">!=</option>
              </select>
              <input
                className="border rounded px-2 py-1 text-sm"
                value={c.value}
                onChange={e => handleChange(idx, 'value', e.target.value)}
                placeholder="值"
              />
              <button className="text-xs text-red-500" onClick={() => handleDelete(idx)}>删除</button>
            </div>
          ))}
        </div>
        <button className="mt-2 px-3 py-1 rounded border text-blue-600" onClick={handleAdd}>+ 添加条件</button>
      </div>
      <div className="p-6 border-t flex gap-2 justify-end bg-gray-50">
        <button className="px-4 py-2 rounded border" onClick={onClose}>取消</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold" onClick={handleSave}>保存</button>
      </div>
    </div>
  );
} 