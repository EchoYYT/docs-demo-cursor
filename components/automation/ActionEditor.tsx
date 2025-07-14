import React, { useState } from 'react';
import { Action } from './AutomationContext';

const actionTypes = [
  { value: 'update-field', label: '修改字段值' },
  { value: 'send-notification', label: '发送通知' },
  { value: 'create-record', label: '创建新记录' },
  { value: 'call-ai', label: '调用 AI 能力' },
];

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ActionEditor({ open, initial, onClose, onSave }: {
  open: boolean;
  initial?: Action[];
  onClose: () => void;
  onSave: (actions: Action[]) => void;
}) {
  const [actions, setActions] = useState<Action[]>(initial || []);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editType, setEditType] = useState('');
  const [editConfig, setEditConfig] = useState<any>({});

  // 新增或编辑 action
  const handleEdit = (idx?: number) => {
    if (typeof idx === 'number') {
      setEditingIdx(idx);
      setEditType(actions[idx].type);
      setEditConfig(actions[idx].config);
    } else {
      setEditingIdx(null);
      setEditType('');
      setEditConfig({});
    }
  };
  const handleSaveEdit = () => {
    if (!editType) return;
    const newAction: Action = { id: editingIdx != null ? actions[editingIdx].id : genId(), type: editType, config: editConfig };
    if (editingIdx != null) {
      setActions(actions.map((a, i) => i === editingIdx ? newAction : a));
    } else {
      setActions([...actions, newAction]);
    }
    setEditingIdx(null);
    setEditType('');
    setEditConfig({});
  };
  const handleDelete = (idx: number) => {
    setActions(actions.filter((_, i) => i !== idx));
  };
  const handleSave = () => {
    onSave(actions);
  };

  // Action 配置表单（可根据类型扩展）
  const renderConfig = () => {
    switch (editType) {
      case 'update-field':
        return (
          <>
            <label className="block text-sm font-medium mb-2">字段名</label>
            <input className="w-full border rounded px-3 py-2 mb-2" value={editConfig.field || ''} onChange={e => setEditConfig({ ...editConfig, field: e.target.value })} placeholder="请输入字段名" />
            <label className="block text-sm font-medium mb-2">新值</label>
            <input className="w-full border rounded px-3 py-2" value={editConfig.value || ''} onChange={e => setEditConfig({ ...editConfig, value: e.target.value })} placeholder="请输入新值" />
          </>
        );
      case 'send-notification':
        return (
          <>
            <label className="block text-sm font-medium mb-2">通知对象</label>
            <input className="w-full border rounded px-3 py-2 mb-2" value={editConfig.to || ''} onChange={e => setEditConfig({ ...editConfig, to: e.target.value })} placeholder="请输入通知对象" />
            <label className="block text-sm font-medium mb-2">消息内容</label>
            <input className="w-full border rounded px-3 py-2" value={editConfig.message || ''} onChange={e => setEditConfig({ ...editConfig, message: e.target.value })} placeholder="请输入消息内容" />
          </>
        );
      case 'create-record':
        return (
          <>
            <label className="block text-sm font-medium mb-2">记录内容</label>
            <input className="w-full border rounded px-3 py-2" value={editConfig.content || ''} onChange={e => setEditConfig({ ...editConfig, content: e.target.value })} placeholder="请输入内容" />
          </>
        );
      case 'call-ai':
        return (
          <>
            <label className="block text-sm font-medium mb-2">AI 指令</label>
            <input className="w-full border rounded px-3 py-2" value={editConfig.prompt || ''} onChange={e => setEditConfig({ ...editConfig, prompt: e.target.value })} placeholder="请输入 AI 指令" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl border-l z-50 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 border-b flex items-center justify-between">
        <span className="font-bold text-lg">设置执行动作</span>
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
      </div>
      <div className="p-6 space-y-4">
        {/* Action 列表 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">已添加动作</span>
            <button className="text-blue-600 text-sm" onClick={() => handleEdit()}>+ 添加动作</button>
          </div>
          <div className="space-y-2">
            {actions.map((a, idx) => (
              <div key={a.id} className="flex items-center gap-2 border rounded px-3 py-2">
                <span className="flex-1 text-sm">{actionTypes.find(t => t.value === a.type)?.label || a.type}</span>
                <button className="text-xs text-blue-600" onClick={() => handleEdit(idx)}>编辑</button>
                <button className="text-xs text-red-500" onClick={() => handleDelete(idx)}>删除</button>
              </div>
            ))}
          </div>
        </div>
        {/* Action 编辑表单 */}
        {(editingIdx !== null || editType) && (
          <div className="border rounded p-4 bg-gray-50">
            <label className="block text-sm font-medium mb-2">动作类型</label>
            <select className="w-full border rounded px-3 py-2 mb-4" value={editType} onChange={e => setEditType(e.target.value)}>
              <option value="">请选择</option>
              {actionTypes.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {renderConfig()}
            <div className="flex gap-2 mt-4 justify-end">
              <button className="px-3 py-1 rounded border" onClick={() => { setEditingIdx(null); setEditType(''); setEditConfig({}); }}>取消</button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white font-semibold" onClick={handleSaveEdit} disabled={!editType}>保存</button>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t flex gap-2 justify-end bg-gray-50">
        <button className="px-4 py-2 rounded border" onClick={onClose}>取消</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold" onClick={handleSave}>保存</button>
      </div>
    </div>
  );
} 